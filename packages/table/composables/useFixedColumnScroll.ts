/**
 * 固定列滚动优化模块
 * 解决左右滑动时的卡顿问题
 * 
 * 性能优化：
 * 1. 使用 RAF 节流所有滚动相关更新
 * 2. 分离读写操作避免布局抖动
 * 3. 高速滚动时降低更新频率
 * 4. 使用 CSS 变量控制阴影，避免 Vue 响应式更新
 */

import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue';
import type { TableProps } from '../types';

export interface FixedColumnScrollConfig {
  /** 渲染延迟时间（ms） */
  renderDelay?: number;
  /** 启用惯性滚动检测 */
  enableInertialScroll?: boolean;
  /** 阴影更新节流间隔（ms） */
  shadowThrottleMs?: number;
  /** 表头同步节流间隔（ms） */
  headerSyncThrottleMs?: number;
}

export function useFixedColumnScroll(
  props: TableProps,
  bodyRef: Ref<HTMLElement | undefined>,
  headerRef: Ref<HTMLElement | undefined>,
  config: FixedColumnScrollConfig = {}
) {
  const {
    renderDelay = 100,
    enableInertialScroll = true,
    shadowThrottleMs = 80,
    headerSyncThrottleMs = 16
  } = config;

  // ==================== 滚动状态 ====================

  /** 是否正在滚动 */
  const isScrolling = ref(false);
  /** 是否正在惯性滚动 */
  const isInertialScrolling = ref(false);
  /** 滚动速度 */
  const scrollVelocity = ref(0);
  
  // 缓存变量，避免频繁创建
  let lastScrollLeft = 0;
  let lastScrollTop = 0;
  let lastScrollTime = 0;
  let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
  let inertialTimer: ReturnType<typeof setTimeout> | null = null;
  let isProcessingScroll = false;

  // ==================== 阴影状态 ====================
  // 使用 ref 供外部读取，但通过 CSS 变量更新，避免触发 Vue 响应式
  const showLeftShadow = ref(false);
  const showRightShadow = ref(false);
  
  // 阴影状态缓存
  let lastShowLeftShadow = false;
  let lastShowRightShadow = false;
  
  let shadowRAF: number | null = null;
  let lastShadowUpdate = 0;
  
  // 表格容器引用，用于设置 CSS 变量
  let tableWrapperEl: HTMLElement | null = null;

  // ==================== 表头同步 ====================

  let headerSyncRAF: number | null = null;
  let lastHeaderSync = 0;

  // ==================== 滚动控制 ====================

  /**
   * 检测是否为惯性滚动
   */
  function detectInertialScroll(currentLeft: number, currentTime: number) {
    if (!enableInertialScroll) return false;

    const deltaX = currentLeft - lastScrollLeft;
    const deltaTime = currentTime - lastScrollTime;

    if (deltaTime > 0) {
      const velocity = Math.abs(deltaX / deltaTime);
      scrollVelocity.value = velocity;
      return velocity > 0.5;
    }

    return false;
  }

  /**
   * 通过 CSS 变量更新阴影状态（不触发 Vue 响应式）
   */
  function updateShadowViaCSS(showLeft: boolean, showRight: boolean) {
    if (!tableWrapperEl) {
      // 尝试获取表格容器
      tableWrapperEl = bodyRef.value?.closest('.ale-table__wrapper') || null;
    }
    
    if (tableWrapperEl) {
      // 使用 CSS 变量控制阴影，不触发 Vue 重新渲染
      tableWrapperEl.style.setProperty('--table-show-left-shadow', showLeft ? '1' : '0');
      tableWrapperEl.style.setProperty('--table-show-right-shadow', showRight ? '1' : '0');
    }
  }

  /**
   * 同步阴影状态
   */
  function syncShadowStateImmediate() {
    if (!bodyRef.value) return;

    const { scrollLeft, scrollWidth, clientWidth } = bodyRef.value;

    const newShowLeftShadow = scrollLeft > 0;
    const newShowRightShadow = scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 2;

    // 只有状态变化时才更新
    if (newShowLeftShadow !== lastShowLeftShadow || newShowRightShadow !== lastShowRightShadow) {
      lastShowLeftShadow = newShowLeftShadow;
      lastShowRightShadow = newShowRightShadow;
      
      // 更新 ref（供外部读取）
      showLeftShadow.value = newShowLeftShadow;
      showRightShadow.value = newShowRightShadow;
      
      // 通过 CSS 变量更新，避免触发 Vue 组件重渲染
      updateShadowViaCSS(newShowLeftShadow, newShowRightShadow);
    }
  }

  /**
   * 立即同步表头
   */
  function syncHeaderImmediate() {
    if (!headerRef.value || !bodyRef.value) return;
    headerRef.value.scrollLeft = bodyRef.value.scrollLeft;
  }

  /**
   * 主滚动处理器（RAF 节流）
   */
  function handleScroll() {
    // 如果已经在处理中，跳过
    if (isProcessingScroll) return;
    
    isProcessingScroll = true;
    
    // 使用 RAF 确保在下一帧处理
    if (shadowRAF !== null || headerSyncRAF !== null) {
      isProcessingScroll = false;
      return;
    }

    shadowRAF = requestAnimationFrame(() => {
      shadowRAF = null;
      
      if (!bodyRef.value) {
        isProcessingScroll = false;
        return;
      }

      const currentTime = performance.now();
      const currentLeft = bodyRef.value.scrollLeft;
      const currentTop = bodyRef.value.scrollTop;

      // 检测惯性滚动
      const isInertial = detectInertialScroll(currentLeft, currentTime);
      if (isInertial) {
        isInertialScrolling.value = true;
      }
      isScrolling.value = true;

      // 更新缓存
      lastScrollLeft = currentLeft;
      lastScrollTop = currentTop;
      lastScrollTime = currentTime;

      // 表头同步（高频更新）
      const now = performance.now();
      if (now - lastHeaderSync >= headerSyncThrottleMs) {
        lastHeaderSync = now;
        syncHeaderImmediate();
      }

      // 阴影更新（低频更新，减少重绘）
      if (now - lastShadowUpdate >= shadowThrottleMs) {
        lastShadowUpdate = now;
        syncShadowStateImmediate();
      }

      // 设置滚动结束定时器
      if (scrollStopTimer) {
        clearTimeout(scrollStopTimer);
      }
      
      scrollStopTimer = setTimeout(() => {
        isScrolling.value = false;
        isInertialScrolling.value = false;
        scrollVelocity.value = 0;
        // 滚动结束后强制同步最终状态
        syncShadowStateImmediate();
        syncHeaderImmediate();
      }, renderDelay);

      isProcessingScroll = false;
    });
  }

  /**
   * 滚动到指定位置
   */
  function scrollTo(options: { top?: number; left?: number; behavior?: ScrollBehavior }) {
    if (!bodyRef.value) return;

    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
    }

    isScrolling.value = true;

    bodyRef.value.scrollTo({
      top: options.top,
      left: options.left,
      behavior: options.behavior || 'smooth'
    });

    nextTick(() => {
      syncHeaderImmediate();
      syncShadowStateImmediate();

      scrollStopTimer = setTimeout(() => {
        isScrolling.value = false;
      }, renderDelay);
    });
  }

  /**
   * 重新计算布局
   */
  function doLayout() {
    // 重置容器引用
    tableWrapperEl = null;
    nextTick(() => {
      syncShadowStateImmediate();
      syncHeaderImmediate();
    });
  }

  // ==================== 生命周期 ====================

  onMounted(() => {
    if (bodyRef.value) {
      bodyRef.value.addEventListener('scroll', handleScroll, { passive: true });
      nextTick(() => {
        // 初始化 CSS 变量
        syncShadowStateImmediate();
      });
    }

    window.addEventListener('resize', doLayout, { passive: true });
  });

  onUnmounted(() => {
    if (bodyRef.value) {
      bodyRef.value.removeEventListener('scroll', handleScroll);
    }

    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
    }

    if (inertialTimer) {
      clearTimeout(inertialTimer);
    }

    if (shadowRAF !== null) {
      cancelAnimationFrame(shadowRAF);
    }

    if (headerSyncRAF !== null) {
      cancelAnimationFrame(headerSyncRAF);
    }
    
    window.removeEventListener('resize', doLayout);
    
    // 清理 CSS 变量
    if (tableWrapperEl) {
      tableWrapperEl.style.removeProperty('--table-show-left-shadow');
      tableWrapperEl.style.removeProperty('--table-show-right-shadow');
    }
  });

  return {
    // 状态
    isScrolling,
    isInertialScrolling,
    scrollVelocity,
    showLeftShadow,
    showRightShadow,

    // 方法
    handleScroll,
    scrollTo,
    doLayout,
    syncShadowStateImmediate,
    syncHeaderImmediate
  };
}

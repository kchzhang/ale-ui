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
  _props: TableProps,
  bodyRef: Ref<HTMLElement | undefined>,
  headerRef: Ref<HTMLElement | undefined>,
  config: FixedColumnScrollConfig = {}
) {
  const {
    renderDelay = 100,
    enableInertialScroll = true,
    shadowThrottleMs: _shadowThrottleMs = 0, // 改为 0，确保即时更新
    headerSyncThrottleMs: _headerSyncThrottleMs = 0 // 改为 0，确保即时同步
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
  let lastScrollTime = 0;
  let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;

  // ==================== 阴影状态 ====================
  // 使用 ref 供外部读取，但通过 CSS 变量更新，避免触发 Vue 响应式
  const showLeftShadow = ref(false);
  const showRightShadow = ref(false);
  
  // 阴影状态缓存
  let lastShowLeftShadow = false;
  let lastShowRightShadow = false;
  
  let shadowRAF: number | null = null;
  
  // 表格容器引用，用于设置 CSS 变量
  let tableWrapperEl: HTMLElement | null = null;

  // ==================== 表头同步 ====================

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
   * 同步阴影状态（即时更新，零延迟）
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
   * 立即同步表头（零延迟）
   */
  function syncHeaderImmediate() {
    if (!headerRef.value || !bodyRef.value) return;
    // 直接同步，零延迟
    headerRef.value.scrollLeft = bodyRef.value.scrollLeft;
  }

  /**
   * 主滚动处理器（零延迟优化版）
   */
  function handleScroll() {
    // 使用 RAF 确保流畅的动画，但保持即时响应
    if (shadowRAF !== null) {
      cancelAnimationFrame(shadowRAF);
    }

    shadowRAF = requestAnimationFrame(() => {
      shadowRAF = null;
      
      if (!bodyRef.value) {
        return;
      }

      const currentTime = performance.now();
      const currentLeft = bodyRef.value.scrollLeft;

      // 检测惯性滚动
      const isInertial = detectInertialScroll(currentLeft, currentTime);
      if (isInertial) {
        isInertialScrolling.value = true;
      }
      isScrolling.value = true;

      // 更新缓存
      lastScrollLeft = currentLeft;
      lastScrollTime = currentTime;

      // 表头同步（即时更新，零延迟）
      syncHeaderImmediate();

      // 阴影更新（即时更新，零延迟）
      syncShadowStateImmediate();

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
        
        // 移除拖动状态类
        if (tableWrapperEl) {
          tableWrapperEl.classList.remove('is-dragging');
        }
      }, renderDelay);

      // 添加拖动状态类（用于禁用过渡效果）
      if (tableWrapperEl) {
        tableWrapperEl.classList.add('is-dragging');
      }
    });
  }

  /**
   * 滚动到指定位置（优化版）
   */
  function scrollTo(options: { top?: number; left?: number; behavior?: ScrollBehavior }) {
    if (!bodyRef.value) return;

    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
    }

    isScrolling.value = true;

    // 添加拖动状态类
    if (tableWrapperEl) {
      tableWrapperEl.classList.add('is-dragging');
    }

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
        
        // 移除拖动状态类
        if (tableWrapperEl) {
          tableWrapperEl.classList.remove('is-dragging');
        }
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

    if (shadowRAF !== null) {
      cancelAnimationFrame(shadowRAF);
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

/**
 * Table 性能优化模块
 * 处理滚动性能优化、渲染控制和虚拟滚动
 */

import { ref, computed, onMounted, onUnmounted, nextTick, watch, type Ref } from 'vue';
import type { TableProps } from '../types';

export interface PerformanceConfig {
  /** 渲染延迟时间（ms） */
  renderDelay?: number;
  /** 启用滚动优化 */
  enableScrollOptimization?: boolean;
  /** 虚拟滚动阈值 */
  virtualThreshold?: number;
  /** 缓冲区大小 */
  bufferSize?: number;
}

export function useTablePerformance(
  props: TableProps,
  bodyRef: Ref<HTMLElement | undefined>,
  config: PerformanceConfig = {}
) {
  const {
    renderDelay = 150,
    enableScrollOptimization = true,
    virtualThreshold = 100,
    bufferSize = 5
  } = config;

  // ==================== 渲染控制状态 ====================

  /** 是否正在滚动 */
  const isScrolling = ref(false);
  /** 滚动停止计时器 */
  let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
  /** 渲染请求ID */
  let renderRAF: number | null = null;
  /** 待处理的渲染任务 */
  const pendingRender = ref(false);

  // ==================== 虚拟滚动状态 ====================

  /** 是否启用虚拟滚动 */
  const isVirtualEnabled = computed(() => {
    return props.virtualScroll || props.data.length > virtualThreshold;
  });

  /** 可见行范围 */
  const visibleRange = ref({ start: 0, end: 0 });
  /** 滚动位置 */
  const scrollTop = ref(0);

  // ==================== 性能指标 ====================

  /** 帧率监控 */
  const fps = ref(60);
  let frameCount = 0;
  let lastTime = performance.now();
  let fpsRafId: number | null = null;

  /** 是否处于高性能模式（帧率低时启用） */
  const isHighPerformanceMode = computed(() => fps.value < 30);

  // ==================== 渲染控制 ====================

  /**
   * 暂停渲染
   */
  function pauseRender() {
    isScrolling.value = true;
    pendingRender.value = false;

    // 清除之前的渲染任务
    if (renderRAF !== null) {
      cancelAnimationFrame(renderRAF);
      renderRAF = null;
    }
  }

  /**
   * 恢复渲染
   */
  function resumeRender() {
    if (!pendingRender.value) {
      pendingRender.value = true;

      renderRAF = requestAnimationFrame(() => {
        isScrolling.value = false;
        pendingRender.value = false;
        renderRAF = null;
      });
    }
  }

  /**
   * 延迟恢复渲染
   */
  function delayResumeRender() {
    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
    }

    scrollStopTimer = setTimeout(() => {
      resumeRender();
    }, renderDelay);
  }

  // ==================== 滚动优化 ====================

  /**
   * 处理滚动开始
   */
  function handleScrollStart() {
    if (!enableScrollOptimization) return;

    pauseRender();

    // 清除之前的停止计时器
    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
      scrollStopTimer = null;
    }
  }

  /**
   * 处理滚动结束
   */
  function handleScrollEnd() {
    if (!enableScrollOptimization) return;

    delayResumeRender();
  }

  /**
   * 处理滚动事件（节流）
   */
  let lastScrollTime = 0;
  const scrollThrottleMs = 16; // ~60fps

  function handleScroll() {
    const now = performance.now();

    // 节流处理
    if (now - lastScrollTime < scrollThrottleMs) {
      return;
    }
    lastScrollTime = now;

    handleScrollStart();

    // 更新虚拟滚动范围
    if (isVirtualEnabled.value && bodyRef.value) {
      updateVisibleRange();
    }

    handleScrollEnd();
  }

  // ==================== 虚拟滚动 ====================

  /**
   * 更新可见行范围
   */
  function updateVisibleRange() {
    if (!bodyRef.value) return;

    const { scrollTop: st, clientHeight } = bodyRef.value;
    const rowHeight = props.virtualRowHeight || 48;

    const startIndex = Math.max(0, Math.floor(st / rowHeight) - bufferSize);
    const visibleCount = Math.ceil(clientHeight / rowHeight) + bufferSize * 2;
    const endIndex = Math.min(props.data.length, startIndex + visibleCount);

    visibleRange.value = { start: startIndex, end: endIndex };
    scrollTop.value = st;
  }

  /**
   * 获取虚拟滚动后的数据
   */
  const virtualData = computed(() => {
    if (!isVirtualEnabled.value) {
      return props.data;
    }

    return props.data.slice(visibleRange.value.start, visibleRange.value.end);
  });

  /**
   * 虚拟滚动总高度
   */
  const virtualTotalHeight = computed(() => {
    if (!isVirtualEnabled.value) return 'auto';

    const rowHeight = props.virtualRowHeight || 48;
    return `${props.data.length * rowHeight}px`;
  });

  /**
   * 虚拟滚动偏移量
   */
  const virtualOffset = computed(() => {
    if (!isVirtualEnabled.value) return 0;

    const rowHeight = props.virtualRowHeight || 48;
    return visibleRange.value.start * rowHeight;
  });

  /**
   * 虚拟滚动样式
   */
  const virtualStyle = computed(() => {
    if (!isVirtualEnabled.value) return {};

    return {
      height: virtualTotalHeight.value,
      paddingTop: `${virtualOffset.value}px`
    };
  });

  // ==================== FPS 监控 ====================

  /**
   * 开始 FPS 监控
   */
  function startFpsMonitoring() {
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        fps.value = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;

        // 根据 FPS 自动调整性能模式
        if (fps.value < 30 && !isHighPerformanceMode.value) {
          // 帧率低，启用高性能模式
          console.warn('[Table] Low FPS detected, enabling high performance mode');
        }
      }

      fpsRafId = requestAnimationFrame(measureFPS);
    };

    fpsRafId = requestAnimationFrame(measureFPS);
  }

  /**
   * 停止 FPS 监控
   */
  function stopFpsMonitoring() {
    if (fpsRafId !== null) {
      cancelAnimationFrame(fpsRafId);
      fpsRafId = null;
    }
  }

  // ==================== CSS 优化 ====================

  /**
   * 获取性能优化后的行样式
   */
  function getOptimizedRowStyle(_rowIndex: number) {
    void _rowIndex; // 标记为已使用
    const style: Record<string, string> = {};

    if (isVirtualEnabled.value) {
      const rowHeight = props.virtualRowHeight || 48;
      style.height = `${rowHeight}px`;
    }

    // 滚动时简化样式
    if (isScrolling.value) {
      style.willChange = 'transform';
    }

    return style;
  }

  /**
   * 获取性能优化后的单元格类名
   */
  function getOptimizedCellClass() {
    return {
      'is-scrolling': isScrolling.value,
      'is-virtual': isVirtualEnabled.value
    };
  }

  // ==================== 生命周期 ====================

  onMounted(() => {
    if (bodyRef.value) {
      bodyRef.value.addEventListener('scroll', handleScroll, { passive: true });

      // 初始化虚拟滚动范围
      if (isVirtualEnabled.value) {
        updateVisibleRange();
      }
    }

    // 启动 FPS 监控（开发模式）
    if (import.meta.env.DEV) {
      startFpsMonitoring();
    }
  });

  onUnmounted(() => {
    if (bodyRef.value) {
      bodyRef.value.removeEventListener('scroll', handleScroll);
    }

    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
    }

    if (renderRAF !== null) {
      cancelAnimationFrame(renderRAF);
    }

    stopFpsMonitoring();
  });

  // 监听数据变化，更新虚拟滚动范围
  watch(() => props.data.length, () => {
    if (isVirtualEnabled.value) {
      nextTick(updateVisibleRange);
    }
  });

  return {
    // 状态
    isScrolling,
    isVirtualEnabled,
    isHighPerformanceMode,
    fps,
    visibleRange,
    virtualData,
    virtualTotalHeight,
    virtualOffset,
    virtualStyle,

    // 方法
    handleScrollStart,
    handleScrollEnd,
    pauseRender,
    resumeRender,
    updateVisibleRange,
    getOptimizedRowStyle,
    getOptimizedCellClass
  };
}

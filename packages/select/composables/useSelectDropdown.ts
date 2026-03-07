import { ref, computed, onUnmounted, type Ref } from 'vue';

/**
 * Select 下拉菜单位置管理
 */
export function useSelectDropdown(
  isOpen: Ref<boolean>,
  triggerRef: Ref<HTMLElement | undefined>
) {
  // 下拉菜单位置
  const dropdownPosition = ref({ top: 0, left: 0, width: 0 });
  const dropdownRef = ref<HTMLElement>();

  // ResizeObserver
  let triggerResizeObserver: ResizeObserver | null = null;
  let positionUpdateFrame: number | null = null;

  // 计算下拉菜单位置
  const calculatePosition = async () => {
    if (!triggerRef.value) return;

    const rect = triggerRef.value.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    dropdownPosition.value = {
      top: rect.bottom + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width
    };
  };

  // 更新位置
  const updatePosition = async () => {
    if (!isOpen.value) return;

    await calculatePosition();

    if (positionUpdateFrame) {
      cancelAnimationFrame(positionUpdateFrame);
    }
    positionUpdateFrame = requestAnimationFrame(updatePosition);
  };

  // 开始位置跟踪
  const startPositionTracking = () => {
    updatePosition();

    // 监听触发器大小变化
    if (triggerRef.value && !triggerResizeObserver) {
      triggerResizeObserver = new ResizeObserver(() => {
        calculatePosition();
      });
      triggerResizeObserver.observe(triggerRef.value);
    }
  };

  // 停止位置跟踪
  const stopPositionTracking = () => {
    if (positionUpdateFrame) {
      cancelAnimationFrame(positionUpdateFrame);
      positionUpdateFrame = null;
    }
    if (triggerResizeObserver) {
      triggerResizeObserver.disconnect();
      triggerResizeObserver = null;
    }
  };

  // 下拉菜单样式
  const dropdownStyle = computed(() => ({
    position: 'absolute' as const,
    top: `${dropdownPosition.value.top}px`,
    left: `${dropdownPosition.value.left}px`,
    width: `${dropdownPosition.value.width}px`,
    zIndex: 9999
  }));

  // 清理
  onUnmounted(() => {
    stopPositionTracking();
  });

  return {
    dropdownRef,
    dropdownPosition,
    dropdownStyle,
    calculatePosition,
    startPositionTracking,
    stopPositionTracking
  };
}

/**
 * Select 下拉位置计算逻辑
 */
import { ref, computed, type Ref } from 'vue';

export function useDropdownPosition(
  triggerRef: Ref<HTMLDivElement | undefined>,
  isOpen: Ref<boolean>
) {
  const dropdownRect = ref<DOMRect | null>(null);
  
  // ResizeObserver for tracking trigger position changes
  let triggerResizeObserver: ResizeObserver | null = null;
  // Animation frame for position updates
  let positionUpdateFrame: number | null = null;
  
  /**
   * Update dropdown position based on trigger element
   */
  const updateDropdownRect = () => {
    if (!triggerRef.value || !isOpen.value) return;
    
    const rect = triggerRef.value.getBoundingClientRect();
    
    // Check if position has actually changed
    if (dropdownRect.value) {
      const prev = dropdownRect.value;
      const threshold = 1;
      if (
        Math.abs(rect.top - prev.top) < threshold &&
        Math.abs(rect.left - prev.left) < threshold &&
        Math.abs(rect.width - prev.width) < threshold &&
        Math.abs(rect.height - prev.height) < threshold
      ) {
        return;
      }
    }
    
    dropdownRect.value = rect;
  };
  
  /**
   * Schedule a position update on next animation frame
   */
  const schedulePositionUpdate = () => {
    if (positionUpdateFrame) {
      cancelAnimationFrame(positionUpdateFrame);
    }
    
    positionUpdateFrame = requestAnimationFrame(() => {
      updateDropdownRect();
      positionUpdateFrame = null;
    });
  };
  
  /**
   * Initialize ResizeObserver to track trigger element size changes
   */
  const initTriggerResizeObserver = () => {
    if (!triggerRef.value || typeof ResizeObserver === 'undefined') return;
    
    if (triggerResizeObserver) {
      triggerResizeObserver.disconnect();
    }
    
    triggerResizeObserver = new ResizeObserver(() => {
      if (isOpen.value) {
        schedulePositionUpdate();
      }
    });
    
    triggerResizeObserver.observe(triggerRef.value);
  };
  
  /**
   * Clean up trigger ResizeObserver
   */
  const cleanupTriggerResizeObserver = () => {
    if (triggerResizeObserver) {
      triggerResizeObserver.disconnect();
      triggerResizeObserver = null;
    }
    
    if (positionUpdateFrame) {
      cancelAnimationFrame(positionUpdateFrame);
      positionUpdateFrame = null;
    }
  };
  
  // 下拉菜单样式
  const dropdownStyle = computed(() => {
    if (!dropdownRect.value) return {} as Record<string, string>;
    const rect = dropdownRect.value;
    return {
      position: 'fixed',
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      zIndex: '9999'
    } as Record<string, string>;
  });
  
  return {
    dropdownRect,
    dropdownStyle,
    updateDropdownRect,
    initTriggerResizeObserver,
    cleanupTriggerResizeObserver
  };
}

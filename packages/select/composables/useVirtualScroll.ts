/**
 * Select 虚拟滚动逻辑
 */
import { ref, computed, type Ref } from 'vue';

interface VirtualScrollOptions {
  itemHeight: number;
  visibleCount: number;
  filteredOptions: Ref<any[]>;
}

export function useVirtualScroll(options: VirtualScrollOptions) {
  const { itemHeight, visibleCount, filteredOptions } = options;
  
  const virtualListRef = ref<HTMLElement>();
  const scrollTop = ref(0);
  
  // 虚拟滚动容器高度
  const virtualHeight = computed(() => {
    return visibleCount * itemHeight;
  });
  
  // 内容总高度
  const phantomHeight = computed(() => {
    return filteredOptions.value.length * itemHeight;
  });
  
  // 起始索引
  const startIndex = computed(() => {
    return Math.floor(scrollTop.value / itemHeight);
  });
  
  // 偏移量
  const offsetY = computed(() => {
    return startIndex.value * itemHeight;
  });
  
  // 可见的选项
  const virtualOptions = computed(() => {
    const endIndex = Math.min(
      startIndex.value + visibleCount + 2,
      filteredOptions.value.length
    );
    return filteredOptions.value
      .slice(startIndex.value, endIndex)
      .map((opt, idx) => ({ ...opt, index: startIndex.value + idx }));
  });
  
  // 滚动处理
  const handleVirtualScroll = () => {
    scrollTop.value = virtualListRef.value?.scrollTop || 0;
  };
  
  // 滚动到高亮项
  const scrollToHighlighted = (highlightedIndex: number) => {
    if (!virtualListRef.value) return;
    
    const itemTop = highlightedIndex * itemHeight;
    const itemBottom = itemTop + itemHeight;
    const containerTop = virtualListRef.value.scrollTop;
    const containerBottom = containerTop + virtualListRef.value.clientHeight;
    
    if (itemTop < containerTop) {
      virtualListRef.value.scrollTop = itemTop;
    } else if (itemBottom > containerBottom) {
      virtualListRef.value.scrollTop = itemBottom - virtualListRef.value.clientHeight;
    }
  };
  
  return {
    virtualListRef,
    virtualHeight,
    phantomHeight,
    startIndex,
    offsetY,
    virtualOptions,
    handleVirtualScroll,
    scrollToHighlighted
  };
}

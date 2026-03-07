import { computed, type Ref } from 'vue';
import type { SelectProps, SelectOption } from '../types';

/**
 * Select 虚拟滚动管理
 */
export function useSelectVirtualScroll(
  props: SelectProps,
  filteredOptions: Ref<SelectOption[]>,
  scrollTop: Ref<number>
) {
  // 使用默认值处理可能的 undefined
  const itemHeight = props.itemHeight ?? 34;
  const visibleCount = props.visibleCount ?? 10;

  // 虚拟高度
  const virtualHeight = computed(() => {
    return visibleCount * itemHeight;
  });

  // 幻影高度（总高度）
  const phantomHeight = computed(() => {
    return filteredOptions.value.length * itemHeight;
  });

  // 起始索引
  const startIndex = computed(() => {
    return Math.floor(scrollTop.value / itemHeight);
  });

  // Y轴偏移
  const offsetY = computed(() => {
    return startIndex.value * itemHeight;
  });

  // 虚拟选项
  const virtualOptions = computed(() => {
    const endIndex = Math.min(
      startIndex.value + visibleCount + 2,
      filteredOptions.value.length
    );
    return filteredOptions.value
      .slice(startIndex.value, endIndex)
      .map((opt, idx) => ({ ...opt, index: startIndex.value + idx }));
  });

  // 处理虚拟滚动
  const handleVirtualScroll = (event: Event) => {
    scrollTop.value = (event.target as HTMLElement).scrollTop;
  };

  return {
    virtualHeight,
    phantomHeight,
    startIndex,
    offsetY,
    virtualOptions,
    handleVirtualScroll
  };
}

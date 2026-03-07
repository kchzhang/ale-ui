import { ref, computed } from 'vue';
import type { SelectProps } from '../types';

/**
 * Select 组件状态管理
 */
export function useSelectState(props: SelectProps) {
  // 内部状态
  const isOpen = ref(false);
  const isFocused = ref(false);
  const isHovered = ref(false);
  const searchQuery = ref('');
  const highlightedIndex = ref(-1);
  const searchError = ref<Error | null>(null);
  const isSearching = ref(false);

  // 防止打开后立即关闭的标志
  let isOpening = false;

  // 计算选中的值数组
  const selectedValues = computed(() => {
    if (props.modelValue === undefined || props.modelValue === null) {
      return [];
    }
    return Array.isArray(props.modelValue)
      ? props.modelValue
      : [props.modelValue];
  });

  // 是否已选择
  const isSelected = (value: string | number): boolean => {
    return selectedValues.value.includes(value);
  };

  // 打开下拉
  const openDropdown = () => {
    if (props.disabled || isOpen.value) return;
    isOpening = true;
    isOpen.value = true;
    setTimeout(() => {
      isOpening = false;
    }, 0);
  };

  // 关闭下拉
  const closeDropdown = () => {
    if (isOpening) return;
    isOpen.value = false;
    searchQuery.value = '';
    highlightedIndex.value = -1;
  };

  // 切换下拉
  const toggleDropdown = () => {
    if (isOpen.value) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  return {
    isOpen,
    isFocused,
    isHovered,
    searchQuery,
    highlightedIndex,
    searchError,
    isSearching,
    selectedValues,
    isSelected,
    openDropdown,
    closeDropdown,
    toggleDropdown
  };
}

import type { Ref } from 'vue';
import type { SelectOption } from '../types';

/**
 * Select 键盘导航管理
 */
export function useSelectKeyboard(
  isOpen: Ref<boolean>,
  highlightedIndex: Ref<number>,
  displayOptions: Ref<SelectOption[]>,
  _selectedValues: Ref<(string | number)[]>,
  _multiple: Ref<boolean>,
  _filterable: Ref<boolean>,
  isSearching: Ref<boolean>,
  openDropdown: () => void,
  closeDropdown: () => void,
  handleSelect: (option: SelectOption) => void
) {
  // 处理键盘事件
  const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) {
      // 下拉关闭时的键盘处理
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        openDropdown();
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeDropdown();
        break;

      case 'Enter':
      case ' ': // 空格键
        event.preventDefault();
        if (!isSearching.value && highlightedIndex.value >= 0) {
          const option = displayOptions.value[highlightedIndex.value];
          if (option && !option.disabled) {
            handleSelect(option);
          }
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        navigateNext();
        break;

      case 'ArrowUp':
        event.preventDefault();
        navigatePrev();
        break;

      case 'Home':
        event.preventDefault();
        highlightedIndex.value = 0;
        break;

      case 'End':
        event.preventDefault();
        highlightedIndex.value = Math.max(0, displayOptions.value.length - 1);
        break;
    }
  };

  // 导航到下一个
  const navigateNext = () => {
    if (displayOptions.value.length === 0) return;

    let nextIndex = highlightedIndex.value + 1;
    // 跳过禁用的选项
    while (nextIndex < displayOptions.value.length && displayOptions.value[nextIndex]?.disabled) {
      nextIndex++;
    }

    if (nextIndex < displayOptions.value.length) {
      highlightedIndex.value = nextIndex;
    }
  };

  // 导航到上一个
  const navigatePrev = () => {
    if (displayOptions.value.length === 0) return;

    let prevIndex = highlightedIndex.value - 1;
    if (prevIndex < 0) prevIndex = displayOptions.value.length - 1;

    // 跳过禁用的选项
    while (prevIndex >= 0 && displayOptions.value[prevIndex]?.disabled) {
      prevIndex--;
    }

    if (prevIndex >= 0) {
      highlightedIndex.value = prevIndex;
    }
  };

  // 处理鼠标进入选项
  const handleMouseEnter = (index: number) => {
    highlightedIndex.value = index;
  };

  return {
    handleKeydown,
    navigateNext,
    navigatePrev,
    handleMouseEnter
  };
}

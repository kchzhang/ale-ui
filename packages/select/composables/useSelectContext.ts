import { computed, provide, ref, type Ref } from 'vue';
import type { SelectProps, SelectOption, SelectContext } from '../types';
import { SELECT_CONTEXT_KEY } from '../constants';

/**
 * Select 上下文管理（provide/inject）
 */
export function useSelectContext(
  props: SelectProps,
  selectedValues: Ref<(string | number)[]>,
  highlightedIndex: Ref<number>,
  displayOptions: Ref<SelectOption[]>,
  handleSelect: (option: SelectOption) => void
) {
  // 高亮的选项值
  const highlightedValue = computed(() => {
    if (highlightedIndex.value < 0 || highlightedIndex.value >= displayOptions.value.length) {
      return undefined;
    }
    return displayOptions.value[highlightedIndex.value]?.value;
  });

  // 设置高亮值
  const setHighlightedValue = (value: string | number | undefined) => {
    if (value === undefined) {
      highlightedIndex.value = -1;
      return;
    }
    const index = displayOptions.value.findIndex(opt => opt.value === value);
    highlightedIndex.value = index;
  };

  // 选择选项（给 Option 组件使用）
  const selectOption = (_value: string | number, option: SelectOption) => {
    if (props.disabled) return;
    handleSelect(option);
  };

  // 是否选中
  const isSelected = (value: string | number): boolean => {
    return selectedValues.value.includes(value);
  };

  // multiple 转换为 Ref<boolean>
  const multipleRef = ref(props.multiple ?? false);

  // Provide context 给 Option 组件
  const selectContext: SelectContext = {
    isSelected,
    selectedValues,
    highlightedValue,
    setHighlightedValue,
    selectOption,
    multiple: multipleRef
  };

  provide(SELECT_CONTEXT_KEY, selectContext);

  return {
    highlightedValue,
    setHighlightedValue,
    selectOption,
    isSelected
  };
}

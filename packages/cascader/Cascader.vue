<template>
  <div
    :class="cascaderClass"
    :style="customStyle"
    v-click-outside="handleClickOutside"
  >
    <!-- 选择器触发区域 -->
    <CascaderTrigger
      ref="triggerRef"
      :is-open="isOpen"
      :is-focused="isFocused"
      :disabled="disabled"
      :filterable="filterable"
      :placeholder="placeholder"
      :selected-label="selectedLabel"
      :show-clear="showClear"
      @click="handleTriggerClick"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @search-input="handleSearchInput"
      @keydown="handleKeydown"
      @mouseenter="handleMouseEnterTrigger"
      @mouseleave="handleMouseLeaveTrigger"
    />

    <!-- 下拉菜单 -->
    <CascaderDropdown
      ref="dropdownRef"
      :visible="isOpen"
      :loading="loading"
      :loading-text="loadingText"
      :no-data-text="noDataText"
      :filterable="filterable"
      :search-query="searchQuery"
      :filtered-options="filteredOptions"
      :options="options"
      :active-path="activePath"
      :selected-path="selectedPath"
      :selected-paths="selectedPaths"
      :check-strictly="checkStrictly"
      :is-check-strictly-mode="isCheckStrictlyMode"
      :is-multiple-mode="isMultipleMode"
      :separator="separator"
      :trigger-rect="dropdownRect"
      @search-select="handleSearchSelect"
      @option-click="handleOptionClick"
      @radio-change="handleRadioChange"
      @checkbox-change="handleCheckboxChange"
      @option-mouseenter="handleOptionMouseEnter"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onUnmounted
} from 'vue';
import type { CascaderProps, CascaderEmits, CascaderOption } from './types';
import CascaderTrigger from './components/CascaderTrigger.vue';
import CascaderDropdown from './components/CascaderDropdown.vue';
import './Cascader.css';

// Props 定义
const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: () => [],
  options: () => [],
  size: 'medium',
  disabled: false,
  clearable: false,
  filterable: false,
  placeholder: '请选择',
  showAllLevels: true,
  separator: ' / ',
  readonly: false,
  expandTrigger: 'click',
  closeOnSelect: true,
  checkStrictly: false
});

const emit = defineEmits<CascaderEmits>();

// 组件引用
const triggerRef = ref<InstanceType<typeof CascaderTrigger>>();
const dropdownRef = ref<InstanceType<typeof CascaderDropdown>>();

// 内部状态
const isOpen = ref(false);
const isFocused = ref(false);
const isHovered = ref(false);
const searchQuery = ref('');
const activePath = ref<CascaderOption[]>([]);
const highlightedSearchIndex = ref(-1);

// 防止打开后立即关闭的标志
let isOpening = false;

// 下拉菜单位置
const dropdownRect = ref<DOMRect | null>(null);

// 点击外部指令
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: (event: MouseEvent) => void }) {
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) {
        binding.value(e);
      }
    };
    document.addEventListener('click', handler);
    (el as any).__clickOutsideHandler = handler;
  },
  unmounted(el: HTMLElement) {
    const handler = (el as any).__clickOutsideHandler;
    if (handler) {
      document.removeEventListener('click', handler);
      delete (el as any).__clickOutsideHandler;
    }
  }
};

// 根据值路径查找选项路径
const findOptionPath = (
  values: (string | number)[],
  options: CascaderOption[],
  path: CascaderOption[] = []
): CascaderOption[] | null => {
  if (values.length === 0) return path;

  const currentValue = values[0];
  const option = options.find(opt => opt.value === currentValue);

  if (!option) return null;

  const newPath = [...path, option];

  if (values.length === 1) {
    return newPath;
  }

  if (option.children && option.children.length > 0) {
    return findOptionPath(values.slice(1), option.children, newPath);
  }

  return null;
};

// 判断是否为多选模式
const isMultipleMode = computed(() => props.checkStrictly === 'multiple');

// 判断是否为任意选模式（单选或多选）
const isCheckStrictlyMode = computed(() => props.checkStrictly !== false);

// 获取选中的选项路径（单选模式）
const selectedPath = computed(() => {
  if (isMultipleMode.value) return [];
  if (!props.modelValue || props.modelValue.length === 0) {
    return [];
  }
  const value = props.modelValue as (string | number)[];
  return findOptionPath(value, props.options) || [];
});

// 获取多选模式下的选中路径数组
const selectedPaths = computed(() => {
  if (!isMultipleMode.value) return [];
  if (!props.modelValue || props.modelValue.length === 0) {
    return [];
  }
  const values = props.modelValue as (string | number)[][];
  return values
    .map(v => findOptionPath(v, props.options))
    .filter((path): path is CascaderOption[] => path !== null);
});

// 选中的标签文本
const selectedLabel = computed(() => {
  if (isMultipleMode.value) {
    if (selectedPaths.value.length === 0) {
      return '';
    }
    const labels = selectedPaths.value.map(path => {
      if (props.showAllLevels) {
        return path.map(opt => opt.label).join(props.separator);
      }
      return path[path.length - 1]?.label || '';
    });
    return labels.join(', ');
  }

  if (selectedPath.value.length === 0) {
    return '';
  }

  if (props.showAllLevels) {
    return selectedPath.value.map(opt => opt.label).join(props.separator);
  }

  return selectedPath.value[selectedPath.value.length - 1]?.label || '';
});

// 是否显示清空按钮
const showClear = computed(() => {
  const hasSelection = isMultipleMode.value
    ? selectedPaths.value.length > 0
    : selectedPath.value.length > 0;
  return props.clearable
    && !props.disabled
    && hasSelection
    && isHovered.value;
});

// 组件类名
const cascaderClass = computed(() => {
  const hasSelection = isMultipleMode.value
    ? selectedPaths.value.length > 0
    : selectedPath.value.length > 0;
  return [
    'ale-cascader',
    `ale-cascader--${props.size}`,
    {
      'is-disabled': props.disabled,
      'is-clearable': props.clearable && hasSelection,
      'is-multiple': isMultipleMode.value,
      'is-strictly': isCheckStrictlyMode.value
    },
    props.customClass
  ];
});

// 过滤后的搜索选项
const filteredOptions = computed(() => {
  if (!props.filterable || !searchQuery.value.trim()) {
    return [];
  }

  const query = searchQuery.value.trim().toLowerCase();
  const results: Array<{ path: CascaderOption[]; matchIndex: number }> = [];

  const traverse = (options: CascaderOption[], path: CascaderOption[] = []) => {
    for (const option of options) {
      const currentPath = [...path, option];
      const labelMatchIndex = option.label.toLowerCase().includes(query) ? path.length : -1;

      if (labelMatchIndex >= 0) {
        results.push({
          path: currentPath,
          matchIndex: labelMatchIndex
        });
      }

      if (option.children && option.children.length > 0) {
        traverse(option.children, currentPath);
      }
    }
  };

  traverse(props.options);

  return results;
});

// 更新下拉菜单位置
const updateDropdownRect = () => {
  if (!isOpen.value) return;
  dropdownRect.value = triggerRef.value?.getTriggerRect() || null;
};

// 处理触发器点击
const handleTriggerClick = () => {
  if (props.disabled || props.readonly) return;
  toggleDropdown();
};

// 切换下拉菜单
const toggleDropdown = () => {
  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

// 打开下拉菜单
const openDropdown = () => {
  if (props.disabled || props.readonly) return;
  if (isOpen.value) return;

  isOpening = true;
  setTimeout(() => {
    isOpening = false;
  }, 100);

  dropdownRect.value = triggerRef.value?.getTriggerRect() || null;
  isOpen.value = true;

  // 初始化激活路径为选中路径
  if (selectedPath.value.length > 0) {
    activePath.value = selectedPath.value.slice(0, -1);
  } else {
    activePath.value = [];
  }

  emit('visible-change', true);

  window.addEventListener('resize', updateDropdownRect);
  window.addEventListener('scroll', updateDropdownRect, true);

  nextTick(() => {
    triggerRef.value?.focus();
  });
};

// 关闭下拉菜单
const closeDropdown = () => {
  if (!isOpen.value) return;
  if (isOpening) return;

  isOpen.value = false;
  window.removeEventListener('resize', updateDropdownRect);
  window.removeEventListener('scroll', updateDropdownRect, true);
  emit('visible-change', false);
  searchQuery.value = '';
  highlightedSearchIndex.value = -1;
  triggerRef.value?.clearSearch();
};

// 处理点击外部
const handleClickOutside = (event: MouseEvent) => {
  if (isOpening) return;
  if (dropdownRef.value?.contains(event.target as Node)) {
    return;
  }
  if (isOpen.value) {
    closeDropdown();
  }
};

// 处理选项点击
const handleOptionClick = (option: CascaderOption, menuIndex: number) => {
  if (option.disabled) return;

  const newActivePath = activePath.value.slice(0, menuIndex);
  newActivePath.push(option);
  activePath.value = newActivePath;

  if (isCheckStrictlyMode.value) {
    if (option.children && option.children.length > 0) {
      emit('expand-change', newActivePath.map(opt => opt.value));
    }
    return;
  }

  if (option.children && option.children.length > 0) {
    emit('expand-change', newActivePath.map(opt => opt.value));
    return;
  }

  const selectedValues = newActivePath.map(opt => opt.value);
  emit('update:modelValue', selectedValues);
  emit('change', selectedValues);

  if (props.closeOnSelect) {
    closeDropdown();
  }
};

// 处理单选变化
const handleRadioChange = (option: CascaderOption, menuIndex: number) => {
  if (option.disabled) return;

  const newActivePath = activePath.value.slice(0, menuIndex);
  newActivePath.push(option);
  activePath.value = newActivePath;

  const selectedValues = newActivePath.map(opt => opt.value);
  emit('update:modelValue', selectedValues);
  emit('change', selectedValues);

  if (option.children && option.children.length > 0) {
    emit('expand-change', selectedValues);
  }
};

// 处理多选变化
const handleCheckboxChange = (option: CascaderOption, menuIndex: number) => {
  if (option.disabled) return;

  const currentPath = [...activePath.value.slice(0, menuIndex), option];
  const currentValues = currentPath.map(opt => opt.value);
  const currentSelectedValues = (props.modelValue as (string | number)[][]) || [];

  const existingIndex = currentSelectedValues.findIndex(v => {
    if (v.length !== currentValues.length) return false;
    return v.every((val, index) => val === currentValues[index]);
  });

  let newSelectedValues: (string | number)[][];

  if (existingIndex >= 0) {
    newSelectedValues = currentSelectedValues.filter((_, index) => index !== existingIndex);
  } else {
    newSelectedValues = [...currentSelectedValues, currentValues];
  }

  emit('update:modelValue', newSelectedValues);
  emit('change', newSelectedValues);
};

// 处理选项鼠标进入
const handleOptionMouseEnter = (option: CascaderOption, menuIndex: number) => {
  if (props.expandTrigger !== 'hover') return;
  if (option.disabled) return;

  const newActivePath = activePath.value.slice(0, menuIndex);
  newActivePath.push(option);
  activePath.value = newActivePath;
};

// 处理搜索选择
const handleSearchSelect = (path: CascaderOption[]) => {
  const values = path.map(opt => opt.value);
  emit('update:modelValue', values);
  emit('change', values);

  if (props.closeOnSelect) {
    closeDropdown();
  }
};

// 处理搜索输入
const handleSearchInput = (value: string) => {
  searchQuery.value = value;
  highlightedSearchIndex.value = -1;
};

// 处理清空
const handleClear = () => {
  const emptyValue: (string | number)[] | (string | number)[][] = isMultipleMode.value ? [] : [];
  emit('update:modelValue', emptyValue);
  emit('change', emptyValue);
  emit('clear');
  activePath.value = [];
  searchQuery.value = '';
};

// 处理焦点
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

// 处理鼠标进入触发器
const handleMouseEnterTrigger = () => {
  isHovered.value = true;
};

// 处理鼠标离开触发器
const handleMouseLeaveTrigger = () => {
  isHovered.value = false;
};

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
      } else if (props.filterable && searchQuery.value && filteredOptions.value.length > 0) {
        highlightedSearchIndex.value = Math.min(
          highlightedSearchIndex.value + 1,
          filteredOptions.value.length - 1
        );
      }
      break;

    case 'ArrowUp':
      event.preventDefault();
      if (props.filterable && searchQuery.value && filteredOptions.value.length > 0) {
        highlightedSearchIndex.value = Math.max(highlightedSearchIndex.value - 1, -1);
      }
      break;

    case 'Enter':
      event.preventDefault();
      if (props.filterable && searchQuery.value && highlightedSearchIndex.value >= 0) {
        const selectedItem = filteredOptions.value[highlightedSearchIndex.value];
        if (selectedItem) {
          handleSearchSelect(selectedItem.path);
        }
      }
      break;

    case 'Escape':
      event.preventDefault();
      closeDropdown();
      break;

    case 'Tab':
      closeDropdown();
      break;
  }
};

// 暴露方法
const focus = () => {
  if (props.disabled || props.readonly) return;
  triggerRef.value?.focus();
  openDropdown();
};

const blur = () => {
  triggerRef.value?.blur();
  closeDropdown();
};

const isFocusedFn = () => isFocused.value;

const clear = () => {
  handleClear();
};

defineExpose({
  focus,
  blur,
  isFocused: isFocusedFn,
  clear,
  openDropdown,
  closeDropdown
});

// 监听选项变化
watch(() => props.options, () => {
  activePath.value = [];
}, { flush: 'post' });

// 监听窗口大小变化
watch(() => isOpen.value, (open) => {
  if (!open) {
    window.removeEventListener('resize', updateDropdownRect);
    window.removeEventListener('scroll', updateDropdownRect, true);
  }
});

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownRect);
  window.removeEventListener('scroll', updateDropdownRect, true);
});
</script>

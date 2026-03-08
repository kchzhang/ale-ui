<template>
  <div
    :class="groupClass"
    role="group"
    :aria-label="ariaLabel || '复选框组'"
    @keydown="handleKeydown"
  >
    <slot>
      <AleCheckbox
        v-for="item in checkboxItems"
        :key="item.key"
        :model-value="item.modelValue"
        :value="item.value"
        :disabled="item.disabled"
        :size="item.size"
        :theme="item.theme"
        :indeterminate="item.indeterminate"
        @change="item.onChange"
        @click="item.onClick"
      >
        <slot name="option" :option="item.option" :index="item.index">
          {{ item.label }}
        </slot>
      </AleCheckbox>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import AleCheckbox from './Checkbox.vue';
import type { 
  CheckboxGroupProps, 
  CheckboxGroupEmits, 
  CheckboxOption, 
  CheckboxValue,
  CheckboxSize,
  CheckboxTheme
} from './types';

/**
 * CheckboxGroup 注入的上下文接口
 */
interface CheckboxGroupContext {
  modelValue: CheckboxValue[];
  disabled: boolean;
  size: CheckboxSize;
  theme: CheckboxTheme;
  toggleOption: (value: CheckboxValue) => void;
}

/**
 * Checkbox 渲染项接口
 */
interface CheckboxItem {
  key: string;
  option: CheckboxOption;
  index: number;
  label: string;
  value: CheckboxValue;
  modelValue: boolean;
  disabled: boolean;
  size: CheckboxSize;
  theme: CheckboxTheme;
  indeterminate: boolean;
  onChange: (val: boolean) => void;
  onClick: (e: MouseEvent) => void;
}

/**
 * CheckboxGroup 组件
 * @description 复选框组组件，用于管理一组复选框的选择状态
 */
const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  defaultValue: () => [],
  options: () => [],
  disabled: false,
  size: 'medium' as CheckboxSize,
  theme: 'primary' as CheckboxTheme,
  direction: 'horizontal',
  min: undefined,
  max: undefined
});

const emit = defineEmits<CheckboxGroupEmits>();

/**
 * 规范化选项数据
 */
const normalizedOptions = computed((): CheckboxOption[] => {
  return props.options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return { label: String(option), value: option };
    }
    return option;
  });
});

/**
 * 当前选中的值数组
 */
const currentValue = computed({
  get(): CheckboxValue[] {
    return props.modelValue.length > 0 ? props.modelValue : props.defaultValue;
  },
  set(value: CheckboxValue[]) {
    emit('update:modelValue', value);
    emit('change', value);
  }
});

/**
 * 计算复选框组样式类
 */
const groupClass = computed(() => {
  return [
    'ale-checkbox-group',
    `ale-checkbox-group--${props.direction}`,
    `ale-checkbox-group--${props.size}`,
    {
      'is-disabled': props.disabled
    }
  ];
});

/**
 * ARIA 标签
 */
const ariaLabel = computed(() => {
  return props.options.length > 0 ? '复选框组' : undefined;
});

/**
 * 检查值是否被选中
 */
const isChecked = (value: CheckboxValue): boolean => {
  return currentValue.value.includes(value);
};

/**
 * 检查选项是否禁用
 */
const isOptionDisabled = (option: CheckboxOption): boolean => {
  if (props.disabled || option.disabled) {
    return true;
  }

  const value = option.value;
  const isSelected = isChecked(value);

  // 如果已选中，检查是否低于最小选中数
  if (isSelected && props.min !== undefined) {
    const selectedCount = currentValue.value.length;
    if (selectedCount <= props.min) {
      return true;
    }
  }

  // 如果未选中，检查是否超过最大选中数
  if (!isSelected && props.max !== undefined) {
    const selectedCount = currentValue.value.length;
    if (selectedCount >= props.max) {
      return true;
    }
  }

  return false;
};

/**
 * 处理选项变化
 */
const handleOptionChange = (value: CheckboxValue, checked: boolean) => {
  if (props.disabled) return;

  const currentValues = [...currentValue.value];
  const index = currentValues.indexOf(value);

  if (checked && index === -1) {
    // 检查是否超过最大选中数
    if (props.max !== undefined && currentValues.length >= props.max) {
      return;
    }
    currentValues.push(value);
  } else if (!checked && index > -1) {
    // 检查是否低于最小选中数
    if (props.min !== undefined && currentValues.length <= props.min) {
      return;
    }
    currentValues.splice(index, 1);
  }

  currentValue.value = currentValues;
};

/**
 * Checkbox 渲染项列表
 * 将模板中的复杂逻辑提取到 computed 中
 */
const checkboxItems = computed((): CheckboxItem[] => {
  return normalizedOptions.value.map((option, index) => ({
    key: String(option.value),
    option,
    index,
    label: option.label,
    value: option.value,
    modelValue: isChecked(option.value),
    disabled: isOptionDisabled(option),
    size: props.size,
    theme: props.theme,
    indeterminate: option.indeterminate || false,
    onChange: (val: boolean) => handleOptionChange(option.value, val),
    onClick: (e: MouseEvent) => emit('click', option.value, e)
  }));
});

/**
 * 切换选项选中状态
 */
const toggleOption = (value: CheckboxValue) => {
  const isSelected = isChecked(value);
  handleOptionChange(value, !isSelected);
};

/**
 * 全选
 */
const selectAll = () => {
  if (props.disabled) return;

  const allValues = normalizedOptions.value
    .filter(option => !option.disabled)
    .map(option => option.value);

  if (props.max !== undefined) {
    // 如果设置了最大选中数，只选择前 max 个
    currentValue.value = allValues.slice(0, props.max);
  } else {
    currentValue.value = allValues;
  }
};

/**
 * 取消全选
 */
const unselectAll = () => {
  if (props.disabled) return;

  if (props.min !== undefined && props.min > 0) {
    // 如果设置了最小选中数，保留最小的几个
    const currentValues = currentValue.value;
    currentValue.value = currentValues.slice(0, props.min);
  } else {
    currentValue.value = [];
  }
};

/**
 * 反选
 */
const toggleAll = () => {
  if (props.disabled) return;

  const allValues = normalizedOptions.value
    .filter(option => !option.disabled)
    .map(option => option.value);

  const currentValues = currentValue.value;
  const unselectedValues = allValues.filter(v => !currentValues.includes(v));

  if (props.max !== undefined) {
    // 如果设置了最大选中数，只选择部分
    currentValue.value = unselectedValues.slice(0, props.max);
  } else {
    currentValue.value = unselectedValues;
  }
};

/**
 * 键盘导航处理
 */
const handleKeydown = (event: KeyboardEvent) => {
  const checkboxes = Array.from(
    (event.currentTarget as HTMLElement).querySelectorAll('.ale-checkbox__original:not(:disabled)')
  ) as HTMLInputElement[];

  const currentIndex = checkboxes.findIndex(cb => cb === document.activeElement);

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault();
      if (props.direction === 'horizontal' || event.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % checkboxes.length;
        checkboxes[nextIndex]?.focus();
      }
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault();
      if (props.direction === 'horizontal' || event.key === 'ArrowUp') {
        const prevIndex = currentIndex <= 0 ? checkboxes.length - 1 : currentIndex - 1;
        checkboxes[prevIndex]?.focus();
      }
      break;
    case 'Home':
      event.preventDefault();
      checkboxes[0]?.focus();
      break;
    case 'End':
      event.preventDefault();
      checkboxes[checkboxes.length - 1]?.focus();
      break;
  }
};

/**
 * 提供给子组件的响应式上下文
 */
provide<CheckboxGroupContext>('checkboxGroup', {
  get modelValue() { return currentValue.value; },
  get disabled() { return props.disabled; },
  get size() { return props.size; },
  get theme() { return props.theme; },
  toggleOption
});

/**
 * 暴露方法给父组件
 */
defineExpose({
  selectAll,
  unselectAll,
  toggleAll,
  toggleOption,
  isChecked
});
</script>

<style scoped>
/* 仅保留 scoped 样式，主要样式在 CheckboxGroup.css */
</style>

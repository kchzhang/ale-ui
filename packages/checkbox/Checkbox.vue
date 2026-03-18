<template>
  <label
    :class="checkboxClass"
    :aria-checked="ariaCheckedState"
    :aria-disabled="ariaDisabledState"
    role="checkbox"
  >
    <span class="ale-checkbox__input" @click="handleInputClick">
      <input
        ref="inputRef"
        :checked="isChecked"
        type="checkbox"
        :value="value"
        :disabled="actualDisabled"
        :readonly="readonly"
        :name="name"
        class="ale-checkbox__original"
        @change="handleChange"
      />
      <span class="ale-checkbox__inner">
        <svg
          v-if="isChecked && !indeterminate"
          class="ale-checkbox__icon ale-checkbox__icon--check"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <svg
          v-if="indeterminate"
          class="ale-checkbox__icon ale-checkbox__icon--indeterminate"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </span>
    </span>
    <span v-if="hasLabel" class="ale-checkbox__label" @click="handleLabelClick">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useSlots, ref, inject } from 'vue';
import type { CheckboxProps, CheckboxEmits, CheckboxSize, CheckboxTheme, CheckboxValue } from './types';
import './Checkbox.css';

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
 * 注入的 CheckboxGroup 上下文
 */
const checkboxGroup = inject<CheckboxGroupContext | undefined>('checkboxGroup', undefined);

/**
 * 是否作为 CheckboxGroup 的子组件使用
 */
const isInGroup = computed(() => !!checkboxGroup);

/**
 * 复选框组件
 * @description 支持选中/未选中状态切换、禁用状态、自定义尺寸和主题
 */
const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  value: true,
  disabled: false,
  readonly: false,
  indeterminate: false,
  size: undefined,
  theme: undefined,
  label: '',
  customClass: '',
  name: ''
});

const emit = defineEmits<CheckboxEmits>();
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);
void inputRef; // 用于模板引用，避免 TS6133 错误

/**
 * 实际尺寸（Checkbox 自身属性优先，其次使用 Group 的，最后使用默认值）
 */
const actualSize = computed<CheckboxSize>(() => {
  return props.size ?? checkboxGroup?.size ?? 'medium';
});

/**
 * 实际主题（Checkbox 自身属性优先，其次使用 Group 的，最后使用默认值）
 */
const actualTheme = computed<CheckboxTheme>(() => {
  return props.theme ?? checkboxGroup?.theme ?? 'primary';
});

/**
 * 实际禁用状态（任一禁用即禁用）
 */
const actualDisabled = computed(() => {
  return checkboxGroup?.disabled || props.disabled;
});

/**
 * 在 Group 中的选中状态
 */
const isGroupChecked = computed(() => {
  if (!checkboxGroup || props.value === undefined) return false;
  return checkboxGroup.modelValue.includes(props.value);
});

/**
 * 是否有标签内容
 */
const hasLabel = computed(() => {
  return !!(props.label || slots.default);
});

/**
 * 是否受控模式
 */
const isControlled = computed(() => {
  return props.modelValue !== undefined;
});

/**
 * 内部选中状态（用于非受控模式）
 */
let internalChecked = props.defaultChecked;

/**
 * 当前选中状态
 * 如果在 Group 中，使用 Group 的选中状态
 */
const isChecked = computed({
  get() {
    if (isInGroup.value && checkboxGroup) {
      return isGroupChecked.value;
    }
    return isControlled.value ? props.modelValue! : internalChecked;
  },
  set(value: boolean) {
    if (isInGroup.value && checkboxGroup && props.value !== undefined) {
      // 在 Group 中时，通过 Group 的方法切换
      checkboxGroup.toggleOption(props.value);
    } else if (isControlled.value) {
      emit('update:modelValue', value);
    } else {
      internalChecked = value;
    }
  }
});

/**
 * ARIA 状态值
 */
const ariaCheckedState = computed(() => {
  if (props.indeterminate) {
    return 'mixed';
  }
  return isChecked.value ? 'true' : 'false';
});

/**
 * ARIA 禁用状态
 */
const ariaDisabledState = computed(() => {
  return actualDisabled.value ? 'true' : undefined;
});

/**
 * 复选框样式类
 */
const checkboxClass = computed(() => {
  return [
    'ale-checkbox',
    `ale-checkbox--${actualSize.value}`,
    `ale-checkbox--${actualTheme.value}`,
    {
      'is-checked': isChecked.value,
      'is-disabled': actualDisabled.value,
      'is-readonly': props.readonly,
      'is-indeterminate': props.indeterminate,
      'has-label': hasLabel.value
    },
    props.customClass
  ];
});

/**
 * 处理输入框点击
 */
const handleInputClick = (event: MouseEvent) => {
  if (actualDisabled.value) return;
  emit('click', event);
};

/**
 * 处理标签点击
 */
const handleLabelClick = (event: MouseEvent) => {
  if (actualDisabled.value) return;
  emit('click', event);
};

/**
 * 处理状态变化
 */
const handleChange = (event: Event) => {
  if (actualDisabled.value) return;

  const target = event.target as HTMLInputElement;
  const newValue = target.checked;

  if (isInGroup.value && checkboxGroup && props.value !== undefined) {
    // 在 Group 中时，通过 Group 的方法切换
    checkboxGroup.toggleOption(props.value);
    // 触发 change 事件，通知父组件
    emit('change', newValue);
  } else if (isControlled.value) {
    emit('update:modelValue', newValue);
    emit('change', newValue);
  } else {
    internalChecked = newValue;
    emit('change', newValue);
  }
};
</script>

<style scoped>
/* 仅保留 scoped 样式，主要样式在 Checkbox.css */
</style>

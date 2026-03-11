<template>
  <div
    :class="inputWrapperClass"
    @click="handleClick"
  >
    <Input
      ref="inputRef"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="true"
      :clearable="clearable"
      :size="size"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    />
    <span class="ale-date-picker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Input from '../../input/Input.vue';
import type { DateInputProps, DateInputEmits } from '../types';

const props = withDefaults(defineProps<DateInputProps>(), {
  modelValue: '',
  placeholder: '请选择日期',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'medium',
  theme: 'primary',
  focused: false,
  active: false
});

const emit = defineEmits<DateInputEmits>();

const inputRef = ref();

// 输入框容器样式
const inputWrapperClass = computed(() => [
  'ale-date-picker__input-wrapper',
  {
    'is-disabled': props.disabled,
    'is-focused': props.focused,
    'is-active': props.active
  }
]);

// 点击事件
const handleClick = () => {
  if (props.disabled) return;
  emit('click');
};

// 聚焦事件
const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

// 失焦事件
const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// 清空事件
const handleClear = () => {
  emit('clear');
  emit('update:modelValue', '');
};

// 暴露方法
const focus = () => {
  inputRef.value?.focus();
};

const blur = () => {
  inputRef.value?.blur();
};

defineExpose({
  focus,
  blur
});
</script>

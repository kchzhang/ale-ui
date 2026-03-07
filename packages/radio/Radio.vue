<template>
  <label
    :class="radioClass"
    :aria-checked="isChecked ? 'true' : 'false'"
    :aria-disabled="disabled || undefined"
    role="radio"
  >
    <span class="ale-radio__input" @click="handleInputClick">
      <input
        ref="inputRef"
        :checked="isChecked"
        type="radio"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :name="radioName"
        class="ale-radio__original"
        @change="handleChange"
      />
      <span class="ale-radio__inner">
        <span class="ale-radio__dot" />
      </span>
    </span>
    <span v-if="hasLabel" class="ale-radio__label" @click="handleLabelClick">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useSlots, ref, inject } from 'vue';
import type { RadioProps, RadioEmits, RadioSize, RadioTheme, RadioValue } from './types';
import { radioGroupContextKey } from './index';

/**
 * 单选框组件
 * @description 支持单选状态切换、禁用状态、自定义尺寸和主题
 */
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  value: true,
  disabled: false,
  readonly: false,
  size: 'medium' as RadioSize,
  theme: 'primary' as RadioTheme,
  label: '',
  customClass: '',
  name: ''
});

const emit = defineEmits<RadioEmits>();
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);

/**
 * 注入 RadioGroup 上下文
 */
const radioGroup = inject(radioGroupContextKey, undefined);

/**
 * 是否有标签内容
 */
const hasLabel = computed(() => {
  return !!(props.label || slots.default);
});

/**
 * 是否受控模式（基于自身或 RadioGroup）
 */
const isControlled = computed(() => {
  if (radioGroup) {
    // radioGroup.currentValue 是 computed ref，通过 .value 访问
    return radioGroup.currentValue.value !== undefined;
  }
  return props.modelValue !== undefined;
});

/**
 * 获取最终的 name
 */
const radioName = computed(() => {
  return radioGroup?.name || props.name;
});

/**
 * 获取最终的禁用状态
 */
const isDisabled = computed(() => {
  return radioGroup?.disabled || props.disabled;
});

/**
 * 获取最终的尺寸
 */
const radioSize = computed(() => {
  return radioGroup?.size || props.size;
});

/**
 * 获取最终的主题
 */
const radioTheme = computed(() => {
  return radioGroup?.theme || props.theme;
});

/**
 * 内部选中状态（用于非受控模式）
 */
let internalChecked = props.defaultChecked;

/**
 * 当前选中状态
 */
const isChecked = computed({
  get() {
    if (radioGroup) {
      // radioGroup.currentValue 是 computed ref，需要通过 .value 访问
      return radioGroup.currentValue.value === props.value;
    }
    return isControlled.value ? props.modelValue === props.value : internalChecked;
  },
  set(value: boolean) {
    if (radioGroup) {
      // 在 RadioGroup 中，由 RadioGroup 处理值的变化
      return;
    }
    if (isControlled.value) {
      emit('update:modelValue', props.value);
    } else {
      internalChecked = value;
    }
  }
});

/**
 * 单选框样式类
 */
const radioClass = computed(() => {
  return [
    'ale-radio',
    `ale-radio--${radioSize.value}`,
    `ale-radio--${radioTheme.value}`,
    {
      'is-checked': isChecked.value,
      'is-disabled': isDisabled.value,
      'is-readonly': props.readonly,
      'has-label': hasLabel.value
    },
    props.customClass
  ];
});

/**
 * 处理输入框点击
 */
const handleInputClick = (event: MouseEvent) => {
  emit('click', event);
};

/**
 * 处理标签点击
 */
const handleLabelClick = (event: MouseEvent) => {
  emit('click', event);
};

/**
 * 处理状态变化
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  
  if (isDisabled.value || props.readonly) {
    return;
  }
  
  if (radioGroup) {
    // 在 RadioGroup 中，调用 RadioGroup 的 changeValue 方法
    radioGroup.changeValue(props.value);
    emit('change', props.value);
  } else {
    // 独立使用时
    const newValue = target.checked ? props.value : undefined;
    
    if (isControlled.value) {
      emit('update:modelValue', props.value);
    } else {
      internalChecked = target.checked;
    }
    
    emit('change', props.value);
  }
};
</script>

<style scoped>
/* 仅保留 scoped 样式，主要样式在 Radio.css */
</style>

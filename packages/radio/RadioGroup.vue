<template>
  <div
    :class="groupClass"
    role="radiogroup"
    :aria-disabled="disabled"
  >
    <!-- 使用 options 渲染 -->
    <template v-if="options && options.length > 0">
      <Radio
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
        :label="option.label"
        :disabled="disabled || option.disabled"
        :size="size"
        :theme="theme"
        :name="name"
        @click="(event) => handleOptionClick(option.value, event)"
      >
        <template v-if="option.render">
          <component :is="option.render" />
        </template>
      </Radio>
    </template>
    
    <!-- 使用 slot 渲染 -->
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import Radio from './Radio.vue';
import type { RadioGroupProps, RadioGroupEmits, RadioValue } from './types';
import { radioGroupContextKey } from './index';
import './RadioGroup.css';

/**
 * 单选框组组件
 * @description 用于管理一组单选框，支持受控/非受控模式
 */
const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  options: () => [],
  disabled: false,
  size: 'medium',
  theme: 'primary',
  direction: 'horizontal',
  name: ''
});

const emit = defineEmits<RadioGroupEmits>();

/**
 * 是否受控模式
 */
const isControlled = computed(() => {
  return props.modelValue !== undefined;
});

/**
 * 内部值（非受控模式使用）
 */
const internalValue = ref<RadioValue | undefined>(props.defaultValue);

/**
 * 当前选中的值（使用 ref 存储实际值，确保响应式）
 */
const currentValue = ref<RadioValue | undefined>(
  isControlled.value ? props.modelValue : props.defaultValue
);

/**
 * 监听 props.modelValue 变化（受控模式）
 */
watch(() => props.modelValue, (newValue) => {
  if (isControlled.value) {
    currentValue.value = newValue;
  }
});

/**
 * 生成唯一的 name
 */
const groupName = props.name || `radio-group-${Math.random().toString(36).slice(2, 9)}`;

/**
 * 提供给子组件的上下文
 * 使用 ref 直接存储值，确保响应式能够正确工作
 */
provide(radioGroupContextKey, {
  currentValue,
  name: groupName,
  disabled: props.disabled,
  size: props.size,
  theme: props.theme,
  changeValue: (value: RadioValue) => {
    if (props.disabled) return;

    currentValue.value = value;
    if (!isControlled.value) {
      internalValue.value = value;
    }
    emit('change', value);
    emit('update:modelValue', value);
  }
});

/**
 * 组样式类
 */
const groupClass = computed(() => [
  'ale-radio-group',
  `ale-radio-group--${props.direction}`,
  `ale-radio-group--${props.size}`,
  {
    'is-disabled': props.disabled
  }
]);

/**
 * 处理选项点击
 */
const handleOptionClick = (value: RadioValue, event: MouseEvent) => {
  emit('click', value, event);
};

/**
 * 选择指定值
 */
const select = (value: RadioValue) => {
  if (props.disabled) return;
  
  const option = props.options?.find(opt => opt.value === value);
  if (option?.disabled) return;
  
  currentValue.value = value;
  emit('change', value);
  emit('update:modelValue', value);
};

/**
 * 清空选择
 */
const clear = () => {
  if (props.disabled) return;
  
  currentValue.value = undefined;
  emit('change', undefined as unknown as RadioValue);
  emit('update:modelValue', undefined as unknown as RadioValue);
};

/**
 * 选择第一个可用选项
 */
const selectFirst = () => {
  if (props.disabled || !props.options || props.options.length === 0) return;
  
  const firstAvailable = props.options.find(opt => !opt.disabled);
  if (firstAvailable) {
    select(firstAvailable.value);
  }
};

/**
 * 选择最后一个可用选项
 */
const selectLast = () => {
  if (props.disabled || !props.options || props.options.length === 0) return;
  
  const lastAvailable = [...props.options].reverse().find(opt => !opt.disabled);
  if (lastAvailable) {
    select(lastAvailable.value);
  }
};

// 暴露方法
defineExpose({
  select,
  clear,
  selectFirst,
  selectLast
});
</script>

<style scoped>
/* 仅保留 scoped 样式，主要样式在 RadioGroup.css */
</style>

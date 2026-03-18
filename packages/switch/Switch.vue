<template>
  <div
    :class="switchClass"
    :aria-checked="isChecked"
    :aria-disabled="disabled || undefined"
    role="switch"
    @click="handleClick"
  >
    <input
      ref="inputRef"
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled || loading"
      class="ale-switch__input"
      @change="handleChange"
    />
    <span class="ale-switch__core" :style="coreStyle">
      <span class="ale-switch__thumb">
        <span v-if="loading" class="ale-switch__loading-icon" />
      </span>
    </span>
    <span v-if="displayText" class="ale-switch__label">
      {{ displayText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SwitchProps, SwitchEmits, SwitchSize, SwitchTheme } from './types';
import './Switch.css';

/**
 * 开关组件
 * @description 支持开关状态切换、禁用状态、加载状态、自定义尺寸和主题
 */
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  loading: false,
  size: 'medium' as SwitchSize,
  theme: 'primary' as SwitchTheme,
  activeText: '',
  inactiveText: '',
  customClass: '',
  activeValue: true,
  inactiveValue: false,
  activeColor: '',
  inactiveColor: ''
});

const emit = defineEmits<SwitchEmits>();
const inputRef = ref<HTMLInputElement | null>(null);

/**
 * 是否受控模式
 */
const isControlled = computed(() => {
  return props.modelValue !== undefined;
});

/**
 * 内部状态（非受控模式）
 */
const innerChecked = ref(props.defaultChecked);

/**
 * 当前选中状态
 */
const isChecked = computed({
  get() {
    return isControlled.value ? props.modelValue : innerChecked.value;
  },
  set(value: boolean) {
    if (isControlled.value) {
      emit('update:modelValue', value);
    } else {
      innerChecked.value = value;
    }
  }
});

/**
 * 显示的文本
 */
const displayText = computed(() => {
  return isChecked.value ? props.activeText : props.inactiveText;
});

/**
 * 开关样式类
 */
const switchClass = computed(() => {
  return [
    'ale-switch',
    `ale-switch--${props.size}`,
    `ale-switch--${props.theme}`,
    {
      'is-checked': isChecked.value,
      'is-disabled': props.disabled,
      'is-loading': props.loading
    },
    props.customClass
  ];
});

/**
 * 核心区域样式
 */
const coreStyle = computed(() => {
  const style: Record<string, string> = {};
  
  if (props.activeColor && isChecked.value) {
    style.backgroundColor = props.activeColor;
    style.borderColor = props.activeColor;
  }
  
  if (props.inactiveColor && !isChecked.value) {
    style.backgroundColor = props.inactiveColor;
    style.borderColor = props.inactiveColor;
  }
  
  return style;
});

/**
 * 切换开关状态
 */
const toggle = () => {
  if (props.disabled || props.loading) return;
  
  const newValue = !isChecked.value;
  isChecked.value = newValue;
  emit('change', newValue);
};

/**
 * 点击处理
 */
const handleClick = (event: MouseEvent) => {
  emit('click', event);
  toggle();
};

/**
 * 状态变化处理
 */
const handleChange = (event: Event) => {
  event.stopPropagation();
  toggle();
};

/**
 * 聚焦方法
 */
const focus = () => {
  inputRef.value?.focus();
};

/**
 * 失焦方法
 */
const blur = () => {
  inputRef.value?.blur();
};

defineExpose({
  focus,
  blur
});
</script>

<style scoped>
/* 仅保留 scoped 样式，主要样式在 Switch.css */
</style>

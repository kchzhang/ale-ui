<template>
  <div
    :class="tagClass"
    :style="tagStyle"
    @click="handleClick"
  >
    <span v-if="icon" class="ale-tag__icon">
      <i :class="icon"></i>
    </span>
    <span class="ale-tag__content">
      <slot></slot>
    </span>
    <span
      v-if="closable && !disabled"
      class="ale-tag__close"
      @click.stop="handleClose"
    >
      <svg class="ale-tag__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TagProps, TagEmits } from './types';
import './Tag.css';

const props = withDefaults(defineProps<TagProps>(), {
  type: 'primary',
  size: 'medium',
  closable: false,
  disabled: false,
  bordered: false,
  round: false,
  color: '',
  bgColor: '',
  icon: ''
});

const emit = defineEmits<TagEmits>();

// 标签样式类
const tagClass = computed(() => {
  return [
    'ale-tag',
    `ale-tag--${props.type}`,
    `ale-tag--${props.size}`,
    {
      'is-closable': props.closable && !props.disabled,
      'is-disabled': props.disabled,
      'is-bordered': props.bordered,
      'is-round': props.round,
      'has-icon': !!props.icon
    }
  ];
});

// 标签自定义样式
const tagStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.color) {
    style.color = props.color;
    style.borderColor = props.color;
  }

  if (props.bgColor) {
    style.backgroundColor = props.bgColor;
  } else if (props.color) {
    style.backgroundColor = `${props.color}20`;
  }

  return Object.keys(style).length > 0 ? style : {};
});

// 处理关闭事件
const handleClose = (event: MouseEvent) => {
  if (props.disabled) return;
  emit('close', event);
};

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return;
  emit('click', event);
};
</script>

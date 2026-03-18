<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="ale-button__loading">
      <svg class="ale-button__loading-icon" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="60"
          stroke-dashoffset="30"
        />
      </svg>
    </span>
    <span class="ale-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps, ButtonEmits } from './types';
import './Button.css';

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  plain: false,
  round: false,
  circle: false,
  nativeType: 'button'
});

const emit = defineEmits<ButtonEmits>();

const buttonClass = computed(() => {
  return [
    'ale-button',
    `ale-button--${props.type}`,
    `ale-button--${props.size}`,
    {
      'is-disabled': props.disabled || props.loading,
      'is-loading': props.loading,
      'is-block': props.block,
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle
    }
  ];
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>


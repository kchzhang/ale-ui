<template>
  <div class="ale-badge" :class="badgeClass">
    <div v-if="$slots.default" class="ale-badge__content">
      <slot></slot>
    </div>
    <span
      v-if="!hidden && (content || isDot)"
      class="ale-badge__tag"
      :style="tagStyle"
    >
      <span v-if="isDot" class="ale-badge__dot"></span>
      <span v-else>{{ content }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BadgeProps } from './types';
import './Badge.css';

const props = withDefaults(defineProps<BadgeProps>(), {
  value: 0,
  max: 99,
  isDot: false,
  type: 'danger',
  size: 'medium',
  hidden: false
});

// 计算显示内容
const content = computed(() => {
  if (props.isDot) {
    return '';
  }

  if (typeof props.value === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value;
  }

  return props.value;
});

// 计算徽标样式类
const badgeClass = computed(() => {
  return [
    `ale-badge--${props.type}`,
    `ale-badge--${props.size}`,
    {
      'is-dot': props.isDot,
      'is-custom-color': !!props.color
    }
  ];
});

// 自定义颜色样式
const tagStyle = computed(() => {
  if (props.color) {
    return {
      backgroundColor: props.color
    };
  }
  return {};
});
</script>

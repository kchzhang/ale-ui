<template>
  <div
    :class="cardClass"
    @click="handleClick"
  >
    <div v-if="$slots.header || title" class="ale-card__header" :style="headerStyle">
      <slot name="header">
        <span class="ale-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="ale-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="ale-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CardProps, CardEmits } from './types';
import './Card.css';

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  shadow: 'hover',
  bordered: true,
  hoverable: false,
  size: 'medium'
});

const emit = defineEmits<CardEmits>();

const cardClass = computed(() => {
  return [
    'ale-card',
    `ale-card--${props.shadow}`,
    `ale-card--${props.size}`,
    {
      'is-bordered': props.bordered,
      'is-hoverable': props.hoverable
    }
  ];
});

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

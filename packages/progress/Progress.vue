<template>
  <div :class="progressClass">
    <!-- 线性进度条 -->
    <template v-if="type === 'line'">
      <div class="ale-progress-bar">
        <div
          class="ale-progress-bar__outer"
          :style="barOuterStyle"
        >
          <div
            class="ale-progress-bar__inner"
            :class="barInnerClass"
            :style="barInnerStyle"
          ></div>
        </div>
      </div>
      <span v-if="showText" class="ale-progress__text">
        <span v-if="!status">{{ displayText }}</span>
        <svg v-else-if="status === 'success'" class="ale-progress__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 12 9 17 20 6" />
        </svg>
        <svg v-else-if="status === 'warning'" class="ale-progress__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <svg v-else-if="status === 'danger'" class="ale-progress__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </span>
    </template>

    <!-- 环形进度条 -->
    <template v-else>
      <div
        class="ale-progress-circle"
        :style="{ width: `${width}px`, height: `${width}px` }"
      >
        <svg viewBox="0 0 100 100">
          <!-- 背景圆环 -->
          <circle
            class="ale-progress-circle__track"
            cx="50"
            cy="50"
            :r="radius"
            fill="none"
            :stroke-width="relativeStrokeWidth"
          />
          <!-- 进度圆环 -->
          <circle
            class="ale-progress-circle__path"
            :class="circlePathClass"
            cx="50"
            cy="50"
            :r="radius"
            fill="none"
            :stroke-width="relativeStrokeWidth"
            :stroke="computedColor"
            :stroke-linecap="strokeLinecap"
            :stroke-dasharray="dashArray"
            :stroke-dashoffset="dashOffset"
            :style="circlePathStyle"
          />
        </svg>
        <div class="ale-progress-circle__text" v-if="showText">
          <span v-if="!status">{{ displayText }}</span>
          <svg v-else-if="status === 'success'" class="ale-progress__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 12 9 17 20 6" />
          </svg>
          <svg v-else-if="status === 'warning'" class="ale-progress__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <svg v-else-if="status === 'danger'" class="ale-progress__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ProgressProps, ProgressExpose } from './types';
import './Progress.css';

const props = withDefaults(defineProps<ProgressProps>(), {
  percentage: 0,
  type: 'line',
  strokeWidth: 6,
  showText: true,
  width: 126,
  status: '',
  striped: false,
  stripedFlow: false
});

// 组件样式类
const progressClass = computed(() => [
  'ale-progress',
  `ale-progress--${props.type}`,
  {
    [`is-${props.status}`]: props.status
  }
]);

// 条纹样式类
const barInnerClass = computed(() => ({
  'is-striped': props.striped && !props.stripedFlow,
  'is-striped-flow': props.stripedFlow
}));

// 圆环路径类
const circlePathClass = computed(() => ({}));

// 显示的文本
const displayText = computed(() => `${Math.round(props.percentage)}%`);

// 进度条外层样式
const barOuterStyle = computed(() => ({
  height: `${props.strokeWidth}px`,
  borderRadius: `${props.strokeWidth / 2}px`
}));

// 进度条内层样式
const barInnerStyle = computed(() => ({
  width: `${props.percentage}%`,
  backgroundColor: computedColor.value,
  borderRadius: `${props.strokeWidth / 2}px`
}));

// 圆环路径样式
const circlePathStyle = computed(() => ({
  transition: 'stroke-dashoffset 0.3s ease'
}));

// 计算颜色
const computedColor = computed(() => {
  if (typeof props.color === 'function') {
    return props.color(props.percentage);
  }
  if (props.color) {
    return props.color;
  }
  // 默认颜色根据状态
  if (props.status === 'success') {
    return 'var(--color-success)';
  }
  if (props.status === 'warning') {
    return 'var(--color-warning)';
  }
  if (props.status === 'danger') {
    return 'var(--color-danger)';
  }
  return 'var(--color-primary)';
});

// 圆环相对宽度
const relativeStrokeWidth = computed(() => {
  return (props.strokeWidth / props.width) * 100;
});

// 圆环半径
const radius = computed(() => {
  return 50 - relativeStrokeWidth.value / 2;
});

// 圆环周长
const perimeter = computed(() => 2 * Math.PI * radius.value);

// 虚线数组
const dashArray = computed(() => {
  return perimeter.value.toString();
});

// 虚线偏移
const dashOffset = computed(() => {
  return perimeter.value * ((100 - props.percentage) / 100) * -1;
});

// 线帽样式
const strokeLinecap = computed((): 'round' => {
  return 'round';
});

// 获取当前进度
const getPercentage = () => props.percentage;

defineExpose<ProgressExpose>({
  getPercentage
});
</script>

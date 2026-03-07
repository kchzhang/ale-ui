<template>
  <div
    v-if="visible"
    :class="loadingClass"
    :style="loadingStyle"
    @click="handleClick"
  >
    <!-- 遮罩层 -->
    <div
      v-if="overlay || fullscreen"
      class="ale-loading__overlay"
      :style="overlayStyle"
    />

    <!-- 加载内容 -->
    <div class="ale-loading__content">
      <!-- Circular 类型 -->
      <template v-if="type === 'circular'">
        <svg
          class="ale-loading__spinner ale-loading__spinner--circular"
          viewBox="0 0 50 50"
        >
          <circle
            class="ale-loading__circular"
            cx="25"
            cy="25"
            r="20"
            fill="none"
          />
        </svg>
      </template>

      <!-- Spinner 类型 -->
      <template v-else-if="type === 'spinner'">
        <div class="ale-loading__spinner ale-loading__spinner--spinner">
          <div
            v-for="i in 12"
            :key="i"
            class="ale-loading__spinner-item"
          />
        </div>
      </template>

      <!-- Dots 类型 -->
      <template v-else-if="type === 'dots'">
        <div class="ale-loading__spinner ale-loading__spinner--dots">
          <div class="ale-loading__dot" />
          <div class="ale-loading__dot" />
          <div class="ale-loading__dot" />
        </div>
      </template>

      <!-- 加载文本 -->
      <span v-if="text" class="ale-loading__text">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { LoadingProps, LoadingEmits } from './types';
import './Loading.css';

const props = withDefaults(defineProps<LoadingProps>(), {
  type: 'circular',
  size: 'medium',
  theme: 'primary',
  overlay: false,
  fullscreen: false,
  vertical: false,
  delay: 0
});

const emit = defineEmits<LoadingEmits>();

const visible = ref(false);
let delayTimer: ReturnType<typeof setTimeout> | null = null;

const loadingClass = computed(() => {
  return [
    'ale-loading',
    `ale-loading--${props.type}`,
    `ale-loading--${props.size}`,
    `ale-loading--${props.theme}`,
    {
      'is-overlay': props.overlay || props.fullscreen,
      'is-fullscreen': props.fullscreen,
      'is-vertical': props.vertical
    },
    props.customClass
  ];
});

const loadingStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.color) {
    style['--loading-color'] = props.color;
  }

  return style;
});

const overlayStyle = computed(() => {
  const style: Record<string, string> = {};

  // 兼容旧的 overlayColor 属性
  if (props.overlayColor) {
    style.backgroundColor = props.overlayColor;
  } else if (props.overlayBackground) {
    // 使用新的 overlayBackground 属性
    style.backgroundColor = props.overlayBackground;
  } else {
    // 根据透明度计算默认背景色
    const opacity = props.overlayOpacity ?? 0.9;
    style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
  }

  return style;
});

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

const show = () => {
  if (delayTimer) {
    clearTimeout(delayTimer);
  }

  if (props.delay > 0) {
    delayTimer = setTimeout(() => {
      visible.value = true;
    }, props.delay);
  } else {
    visible.value = true;
  }
};

const hide = () => {
  if (delayTimer) {
    clearTimeout(delayTimer);
    delayTimer = null;
  }
  visible.value = false;
};

onMounted(() => {
  show();
});

onUnmounted(() => {
  if (delayTimer) {
    clearTimeout(delayTimer);
  }
});

defineExpose({
  show,
  hide
});
</script>

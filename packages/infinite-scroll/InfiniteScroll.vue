<template>
  <div
    ref="containerRef"
    :class="containerClass"
    @scroll="handleScroll"
  >
    <!-- 内容区域 -->
    <div class="ale-infinite-scroll__content">
      <slot />
    </div>

    <!-- 加载状态 -->
    <div
      v-if="showStatus"
      class="ale-infinite-scroll__status"
      @click="handleStatusClick"
    >
      <!-- 加载中 -->
      <template v-if="currentStatus === 'loading'">
        <span class="ale-infinite-scroll__spinner">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke-dasharray="60"
              stroke-dashoffset="20"
            />
          </svg>
        </span>
        <span class="ale-infinite-scroll__loading-text">
          {{ loadingText }}
        </span>
      </template>

      <!-- 加载完成 -->
      <template v-else-if="currentStatus === 'finished'">
        <div class="ale-infinite-scroll__divider">
          <span>{{ finishedText }}</span>
        </div>
      </template>

      <!-- 加载失败 -->
      <template v-else-if="currentStatus === 'error'">
        <span>{{ errorText }}</span>
        <span class="ale-infinite-scroll__retry">{{ retryText }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onUnmounted,
  watch,
  nextTick
} from 'vue';
import type {
  InfiniteScrollProps,
  InfiniteScrollEvents,
  InfiniteScrollStatus,
  InfiniteScrollExpose
} from './types';
import './InfiniteScroll.css';

const props = withDefaults(defineProps<InfiniteScrollProps>(), {
  defaultStatus: 'idle',
  disabled: false,
  direction: 'vertical',
  offset: 100,
  immediate: true,
  loadingText: '加载中...',
  finishedText: '没有更多了',
  errorText: '加载失败',
  retryText: '点击重试',
  customClass: ''
});

const emit = defineEmits<InfiniteScrollEvents>();

// 容器引用
const containerRef = ref<HTMLElement | null>(null);

// 内部状态（非受控模式）
const innerStatus = ref<InfiniteScrollStatus>(props.defaultStatus);

// 重试次数
const retryCount = ref(0);

// 当前状态
const currentStatus = computed<InfiniteScrollStatus>({
  get() {
    return props.status !== undefined ? props.status : innerStatus.value;
  },
  set(value) {
    if (props.status === undefined) {
      innerStatus.value = value;
    }
    emit('update:status', value);
  }
});

// 是否显示状态区域
const showStatus = computed(() => {
  return ['loading', 'finished', 'error'].includes(currentStatus.value);
});

// 容器样式类
const containerClass = computed(() => {
  return [
    'ale-infinite-scroll',
    `ale-infinite-scroll--${props.direction}`,
    {
      'ale-infinite-scroll--loading': currentStatus.value === 'loading',
      'ale-infinite-scroll--finished': currentStatus.value === 'finished',
      'ale-infinite-scroll--error': currentStatus.value === 'error',
      'ale-infinite-scroll--disabled': props.disabled
    },
    props.customClass
  ];
});

/**
 * 检查元素是否是滚动容器
 */
const isScrollContainer = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  const overflow = style.overflow + style.overflowX + style.overflowY;
  return overflow.includes('auto') || overflow.includes('scroll');
};

/**
 * 查找最近的滚动容器（包括自身和父级）
 */
const findScrollContainer = (element: HTMLElement): HTMLElement | null => {
  let current: HTMLElement | null = element;

  while (current && current !== document.body) {
    if (isScrollContainer(current)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
};

/**
 * 获取滚动容器
 */
const getScrollContainer = (): HTMLElement | Window => {
  if (!containerRef.value) return window;

  const { direction } = props;
  const element = containerRef.value;

  // 查找最近的滚动容器（包括自身和父级）
  const scrollContainer = findScrollContainer(element);
  if (scrollContainer) {
    return scrollContainer;
  }

  // 检查组件自身是否有滚动条
  if (direction === 'vertical') {
    const hasVerticalScroll = element.scrollHeight > element.clientHeight;
    if (hasVerticalScroll) return element;
  } else {
    const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
    if (hasHorizontalScroll) return element;
  }

  return window;
};

/**
 * 检查是否需要加载更多
 */
const check = () => {
  // 如果已禁用、正在加载、已完成或出错，则不执行
  if (
    props.disabled ||
    currentStatus.value === 'loading' ||
    currentStatus.value === 'finished' ||
    currentStatus.value === 'error'
  ) {
    return;
  }

  const container = getScrollContainer();
  const element = containerRef.value;

  if (!element) return;

  const { direction, offset } = props;

  let shouldLoad = false;

  if (container === window) {
    // 使用 window 作为滚动容器
    const rect = element.getBoundingClientRect();

    if (direction === 'vertical') {
      // 垂直方向：检查是否滚动到底部
      const windowHeight = window.innerHeight;
      shouldLoad = rect.bottom <= windowHeight + offset;
    } else {
      // 水平方向：检查是否滚动到右侧
      const windowWidth = window.innerWidth;
      shouldLoad = rect.right <= windowWidth + offset;
    }
  } else {
    // 使用元素作为滚动容器
    const containerElement = container as HTMLElement;

    if (direction === 'vertical') {
      // 垂直方向
      const scrollTop = containerElement.scrollTop;
      const clientHeight = containerElement.clientHeight;
      const scrollHeight = containerElement.scrollHeight;
      shouldLoad = scrollTop + clientHeight >= scrollHeight - offset;
    } else {
      // 水平方向
      const scrollLeft = containerElement.scrollLeft;
      const clientWidth = containerElement.clientWidth;
      const scrollWidth = containerElement.scrollWidth;
      shouldLoad = scrollLeft + clientWidth >= scrollWidth - offset;
    }
  }

  if (shouldLoad) {
    load();
  }
};

/**
 * 触发加载
 */
const load = () => {
  currentStatus.value = 'loading';
  emit('load');
};

/**
 * 处理滚动事件
 */
const handleScroll = () => {
  if (props.disabled) return;
  check();
};

/**
 * 处理状态区域点击
 */
const handleStatusClick = () => {
  if (currentStatus.value === 'error') {
    retryCount.value++;
    load();
  }
};

/**
 * 设置状态为加载中
 */
const setLoading = () => {
  currentStatus.value = 'loading';
};

/**
 * 设置状态为完成
 */
const setFinished = () => {
  currentStatus.value = 'finished';
};

/**
 * 设置状态为错误
 */
const setError = () => {
  currentStatus.value = 'error';
};

/**
 * 重置状态
 */
const reset = () => {
  retryCount.value = 0;
  currentStatus.value = 'idle';
  nextTick(() => {
    check();
  });
};

// 监听滚动容器变化
let scrollContainer: HTMLElement | Window | null = null;

const bindScrollEvent = () => {
  unbindScrollEvent();
  scrollContainer = getScrollContainer();
  if (scrollContainer !== window) {
    (scrollContainer as HTMLElement).addEventListener('scroll', handleScroll);
  } else {
    window.addEventListener('scroll', handleScroll);
  }
};

const unbindScrollEvent = () => {
  if (scrollContainer && scrollContainer !== window) {
    (scrollContainer as HTMLElement).removeEventListener('scroll', handleScroll);
  } else {
    window.removeEventListener('scroll', handleScroll);
  }
  scrollContainer = null;
};

// 监听 props 变化
watch(() => props.disabled, (newVal) => {
  if (!newVal) {
    nextTick(() => check());
  }
});

watch(() => props.direction, () => {
  nextTick(() => {
    bindScrollEvent();
    check();
  });
});

// 监听状态变化：当从 loading 变为 idle 时，重新检查是否需要加载
// 这解决了无限加载场景中，加载完成后如果仍满足条件应继续加载的问题
watch(currentStatus, (newVal, oldVal) => {
  if (oldVal === 'loading' && newVal === 'idle') {
    nextTick(() => check());
  }
});

// 组件挂载
onMounted(() => {
  bindScrollEvent();
  if (props.immediate) {
    nextTick(() => check());
  }
});

// 组件卸载
onUnmounted(() => {
  unbindScrollEvent();
});

// 暴露方法
defineExpose<InfiniteScrollExpose>({
  check,
  setLoading,
  setFinished,
  setError,
  reset
});
</script>

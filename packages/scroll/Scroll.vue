<template>
  <div
    ref="containerRef"
    :class="containerClass"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 内容区域 -->
    <div
      ref="contentRef"
      :class="contentClass"
      @scroll="handleScroll"
    >
      <slot />
    </div>

    <!-- 垂直滚动条 -->
    <div
      v-if="canShowVerticalBar"
      ref="verticalBarRef"
      :class="verticalBarClass"
      @mousedown="handleVerticalBarClick"
    >
      <div
        ref="verticalThumbRef"
        :class="verticalThumbClass"
        :style="verticalThumbStyle"
        @mousedown="handleVerticalThumbDrag"
      />
    </div>

    <!-- 水平滚动条 -->
    <div
      v-if="canShowHorizontalBar"
      ref="horizontalBarRef"
      :class="horizontalBarClass"
      @mousedown="handleHorizontalBarClick"
    >
      <div
        ref="horizontalThumbRef"
        :class="horizontalThumbClass"
        :style="horizontalThumbStyle"
        @mousedown="handleHorizontalThumbDrag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  watch
} from 'vue';
import type {
  ScrollProps,
  ScrollEmits,
  ScrollExpose,
  ScrollBehavior,
  ScrollPosition,
  ScrollSizeInfo
} from './types';
import './Scroll.css';

const props = withDefaults(defineProps<ScrollProps>(), {
  native: false,
  always: false,
  minSize: 20,
  theme: 'default',
  size: 'medium',
  direction: 'vertical',
  smooth: true,
  customClass: '',
  disabled: false,
  loadOffset: 0,
  virtual: false,
  itemHeight: 40,
  total: 0
});

const emit = defineEmits<ScrollEmits>();

// DOM 引用
const containerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const verticalBarRef = ref<HTMLElement | null>(null);
const verticalThumbRef = ref<HTMLElement | null>(null);
const horizontalBarRef = ref<HTMLElement | null>(null);
const horizontalThumbRef = ref<HTMLElement | null>(null);
void verticalThumbRef; // 用于模板引用，避免 TS6133 错误
void horizontalThumbRef; // 用于模板引用，避免 TS6133 错误

// 状态
const isDraggingVertical = ref(false);
const isDraggingHorizontal = ref(false);
const isHovering = ref(false);
const verticalVisible = ref(false);
const horizontalVisible = ref(false);
const verticalThumbHeight = ref(0);
const horizontalThumbWidth = ref(0);
const verticalThumbTop = ref(0);
const horizontalThumbLeft = ref(0);

// 拖动相关
let dragStartY = 0;
let dragStartX = 0;
let dragStartScrollTop = 0;
let dragStartScrollLeft = 0;
let resizeObserver: ResizeObserver | null = null;

// 计算属性
const containerClass = computed(() => [
  'ale-scroll',
  `ale-scroll--${props.theme}`,
  `ale-scroll--${props.size}`,
  `ale-scroll--${props.direction}`,
  {
    'is-native': props.native,
    'is-always': props.always,
    'is-disabled': props.disabled,
    'is-dragging-vertical': isDraggingVertical.value,
    'is-dragging-horizontal': isDraggingHorizontal.value,
    'is-hovering': isHovering.value
  },
  props.customClass
]);

const containerStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.height !== undefined) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  if (props.maxHeight !== undefined) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight;
  }
  if (props.width !== undefined) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  if (props.maxWidth !== undefined) {
    style.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth;
  }
  return style;
});

const contentClass = computed(() => [
  'ale-scroll__content',
  {
    'is-native': props.native,
    'is-smooth': props.smooth
  }
]);

// 是否可以显示垂直滚动条（内容溢出时）
const canShowVerticalBar = computed(() => {
  if (props.native) return false;
  if (props.direction === 'horizontal') return false;
  return verticalVisible.value;
});

// 是否可以显示水平滚动条（内容溢出时）
const canShowHorizontalBar = computed(() => {
  if (props.native) return false;
  if (props.direction === 'vertical') return false;
  return horizontalVisible.value;
});

// 垂直滚动条是否可见（用于样式控制）
const showVerticalBar = computed(() => {
  return props.always || isHovering.value || isDraggingVertical.value;
});

// 水平滚动条是否可见（用于样式控制）
const showHorizontalBar = computed(() => {
  return props.always || isHovering.value || isDraggingHorizontal.value;
});

const verticalBarClass = computed(() => [
  'ale-scroll__bar',
  'ale-scroll__bar--vertical',
  {
    'is-visible': showVerticalBar.value && canShowVerticalBar.value
  }
]);

const horizontalBarClass = computed(() => [
  'ale-scroll__bar',
  'ale-scroll__bar--horizontal',
  {
    'is-visible': showHorizontalBar.value && canShowHorizontalBar.value
  }
]);

const verticalThumbClass = computed(() => [
  'ale-scroll__thumb',
  'ale-scroll__thumb--vertical'
]);

const horizontalThumbClass = computed(() => [
  'ale-scroll__thumb',
  'ale-scroll__thumb--horizontal'
]);

const verticalThumbStyle = computed(() => ({
  height: `${verticalThumbHeight.value}%`,
  top: `${verticalThumbTop.value}%`
}));

const horizontalThumbStyle = computed(() => ({
  width: `${horizontalThumbWidth.value}%`,
  left: `${horizontalThumbLeft.value}%`
}));

// 更新滚动条状态
const updateScrollBar = () => {
  if (!contentRef.value || props.native) return;

  const {
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
    scrollTop,
    scrollLeft
  } = contentRef.value;

  // 垂直滚动条
  if (props.direction !== 'horizontal' && scrollHeight > clientHeight) {
    const thumbHeight = Math.max(
      (clientHeight / scrollHeight) * 100,
      (props.minSize / clientHeight) * 100
    );
    verticalThumbHeight.value = thumbHeight;
    verticalThumbTop.value = (scrollTop / (scrollHeight - clientHeight)) * (100 - thumbHeight);
    verticalVisible.value = true;
  } else {
    verticalVisible.value = false;
  }

  // 水平滚动条
  if (props.direction !== 'vertical' && scrollWidth > clientWidth) {
    const thumbWidth = Math.max(
      (clientWidth / scrollWidth) * 100,
      (props.minSize / clientWidth) * 100
    );
    horizontalThumbWidth.value = thumbWidth;
    horizontalThumbLeft.value = (scrollLeft / (scrollWidth - clientWidth)) * (100 - thumbWidth);
    horizontalVisible.value = true;
  } else {
    horizontalVisible.value = false;
  }
};

// 处理滚动事件 - 零延迟同步更新
const handleScroll = () => {
  if (!contentRef.value || props.disabled) return;

  const {
    scrollTop,
    scrollLeft,
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight
  } = contentRef.value;

  // 拖动时跳过更新，由拖动处理函数同步更新
  // 非拖动时立即同步更新，实现零延迟体验
  if (!isDraggingVertical.value && !isDraggingHorizontal.value) {
    // 使用 requestAnimationFrame 确保流畅更新，但保持即时响应
    requestAnimationFrame(() => {
      updateScrollBar();
    });
  }

  const position: ScrollPosition = { scrollTop, scrollLeft };
  const sizeInfo: ScrollSizeInfo = {
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight
  };

  emit('scroll', position, sizeInfo);

  // 检测滚动边界
  if (scrollTop + clientHeight >= scrollHeight - props.loadOffset) {
    emit('scroll-to-bottom');
    emit('load-more');
  }
  if (scrollTop <= 0) {
    emit('scroll-to-top');
  }
  if (scrollLeft + clientWidth >= scrollWidth - props.loadOffset) {
    emit('scroll-to-right');
  }
  if (scrollLeft <= 0) {
    emit('scroll-to-left');
  }
};

// 鼠标进入
const handleMouseEnter = () => {
  isHovering.value = true;
  // 即时更新滚动条状态
  requestAnimationFrame(() => {
    updateScrollBar();
  });
};

// 鼠标离开
const handleMouseLeave = () => {
  isHovering.value = false;
};

// 垂直滚动条点击
const handleVerticalBarClick = (e: MouseEvent) => {
  const bar = verticalBarRef.value;
  if (!bar || e.target !== bar || !contentRef.value) return;

  const rect = bar.getBoundingClientRect();
  const clickPosition = (e.clientY - rect.top) / rect.height;
  const { scrollHeight, clientHeight } = contentRef.value;

  const maxScrollTop = Math.max(0, scrollHeight - clientHeight);
  const newScrollTop = Math.max(0, Math.min(clickPosition * maxScrollTop, maxScrollTop));
  contentRef.value.scrollTop = newScrollTop;
};

// 水平滚动条点击
const handleHorizontalBarClick = (e: MouseEvent) => {
  const bar = horizontalBarRef.value;
  if (!bar || e.target !== bar || !contentRef.value) return;

  const rect = bar.getBoundingClientRect();
  const clickPosition = (e.clientX - rect.left) / rect.width;
  const { scrollWidth, clientWidth } = contentRef.value;

  const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
  const newScrollLeft = Math.max(0, Math.min(clickPosition * maxScrollLeft, maxScrollLeft));
  contentRef.value.scrollLeft = newScrollLeft;
};

// 垂直滚动条拖动
const handleVerticalThumbDrag = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (!contentRef.value) return;

  isDraggingVertical.value = true;
  dragStartY = e.clientY;
  dragStartScrollTop = contentRef.value.scrollTop;

  document.addEventListener('mousemove', handleVerticalDragMove);
  document.addEventListener('mouseup', handleVerticalDragEnd);
};

const handleVerticalDragMove = (e: MouseEvent) => {
  if (!isDraggingVertical.value || !contentRef.value) return;

  const bar = verticalBarRef.value;
  if (!bar) return;

  // 使用 requestAnimationFrame 确保流畅的动画
  requestAnimationFrame(() => {
    if (!contentRef.value) return;

    const deltaY = e.clientY - dragStartY;
    const barHeight = bar.clientHeight;
    const { scrollHeight, clientHeight } = contentRef.value;

    const scrollRatio = deltaY / barHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    let newScrollTop = dragStartScrollTop + scrollRatio * scrollHeight;

    // 限制滚动范围在有效边界内
    newScrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));
    contentRef.value.scrollTop = newScrollTop;

    // 拖动时直接同步更新滑块位置，实现零延迟跟随
    const thumbHeight = Math.max(
      (clientHeight / scrollHeight) * 100,
      (props.minSize / clientHeight) * 100
    );
    verticalThumbHeight.value = thumbHeight;
    verticalThumbTop.value = (newScrollTop / maxScrollTop) * (100 - thumbHeight);
    verticalVisible.value = true;
  });
};

const handleVerticalDragEnd = () => {
  isDraggingVertical.value = false;
  document.removeEventListener('mousemove', handleVerticalDragMove);
  document.removeEventListener('mouseup', handleVerticalDragEnd);
};

// 水平滚动条拖动
const handleHorizontalThumbDrag = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (!contentRef.value) return;

  isDraggingHorizontal.value = true;
  dragStartX = e.clientX;
  dragStartScrollLeft = contentRef.value.scrollLeft;

  document.addEventListener('mousemove', handleHorizontalDragMove);
  document.addEventListener('mouseup', handleHorizontalDragEnd);
};

const handleHorizontalDragMove = (e: MouseEvent) => {
  if (!isDraggingHorizontal.value || !contentRef.value) return;

  const bar = horizontalBarRef.value;
  if (!bar) return;

  // 使用 requestAnimationFrame 确保流畅的动画
  requestAnimationFrame(() => {
    if (!contentRef.value) return;

    const deltaX = e.clientX - dragStartX;
    const barWidth = bar.clientWidth;
    const { scrollWidth, clientWidth } = contentRef.value;

    const scrollRatio = deltaX / barWidth;
    const maxScrollLeft = scrollWidth - clientWidth;
    let newScrollLeft = dragStartScrollLeft + scrollRatio * scrollWidth;

    // 限制滚动范围在有效边界内
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
    contentRef.value.scrollLeft = newScrollLeft;

    // 拖动时直接同步更新滑块位置，实现零延迟跟随
    const thumbWidth = Math.max(
      (clientWidth / scrollWidth) * 100,
      (props.minSize / clientWidth) * 100
    );
    horizontalThumbWidth.value = thumbWidth;
    horizontalThumbLeft.value = (newScrollLeft / maxScrollLeft) * (100 - thumbWidth);
    horizontalVisible.value = true;
  });
};

const handleHorizontalDragEnd = () => {
  isDraggingHorizontal.value = false;
  document.removeEventListener('mousemove', handleHorizontalDragMove);
  document.removeEventListener('mouseup', handleHorizontalDragEnd);
};

// 暴露方法
const scrollTo = (options: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
  if (!contentRef.value) return;

  const behavior = options.behavior || (props.smooth ? 'smooth' : 'auto');

  // 降级处理：jsdom 环境中 scrollTo 可能不存在
  const hasScrollTo = typeof contentRef.value.scrollTo === 'function';

  if (options.top !== undefined) {
    if (hasScrollTo) {
      contentRef.value.scrollTo({ top: options.top, behavior });
    } else {
      contentRef.value.scrollTop = options.top;
    }
  }
  if (options.left !== undefined) {
    if (hasScrollTo) {
      contentRef.value.scrollTo({ left: options.left, behavior });
    } else {
      contentRef.value.scrollLeft = options.left;
    }
  }
};

const scrollToTop = (behavior?: ScrollBehavior) => {
  scrollTo({ top: 0, behavior: behavior || (props.smooth ? 'smooth' : 'auto') });
};

const scrollToBottom = (behavior?: ScrollBehavior) => {
  if (!contentRef.value) return;
  scrollTo({
    top: contentRef.value.scrollHeight,
    behavior: behavior || (props.smooth ? 'smooth' : 'auto')
  });
};

const getScrollPosition = (): ScrollPosition => {
  if (!contentRef.value) return { scrollTop: 0, scrollLeft: 0 };
  return {
    scrollTop: contentRef.value.scrollTop,
    scrollLeft: contentRef.value.scrollLeft
  };
};

const getScrollSize = (): ScrollSizeInfo => {
  if (!contentRef.value) {
    return { scrollWidth: 0, scrollHeight: 0, clientWidth: 0, clientHeight: 0 };
  }
  return {
    scrollWidth: contentRef.value.scrollWidth,
    scrollHeight: contentRef.value.scrollHeight,
    clientWidth: contentRef.value.clientWidth,
    clientHeight: contentRef.value.clientHeight
  };
};

const update = () => {
  nextTick(() => {
    updateScrollBar();
  });
};

// 监听内容变化
watch(() => props.height, update);
watch(() => props.maxHeight, update);
watch(() => props.width, update);
watch(() => props.maxWidth, update);

// 组件挂载
onMounted(() => {
  updateScrollBar();

  // 使用 ResizeObserver 监听内容变化
  if (typeof ResizeObserver !== 'undefined' && contentRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateScrollBar();
    });
    resizeObserver.observe(contentRef.value);
  }
});

// 组件卸载
onUnmounted(() => {
  // 清理 ResizeObserver
  if (resizeObserver) {
    if (contentRef.value) {
      resizeObserver.unobserve(contentRef.value);
    }
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  // 清理所有事件监听器
  document.removeEventListener('mousemove', handleVerticalDragMove);
  document.removeEventListener('mouseup', handleVerticalDragEnd);
  document.removeEventListener('mousemove', handleHorizontalDragMove);
  document.removeEventListener('mouseup', handleHorizontalDragEnd);
});

// 暴露方法
defineExpose<ScrollExpose>({
  get containerRef() { return containerRef.value; },
  scrollTo,
  scrollToTop,
  scrollToBottom,
  getScrollPosition,
  getScrollSize,
  update
});
</script>

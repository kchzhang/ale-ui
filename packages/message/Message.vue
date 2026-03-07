<template>
  <Teleport to="body">
    <Transition
      name="ale-message-fade"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="isVisible"
        :class="messageClass"
        :style="messageStyle"
        role="alert"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- 图标 -->
        <span v-if="showIcon" class="ale-message__icon">
          <template v-if="icon">{{ icon }}</template>
          <template v-else>
            <svg v-if="type === 'success'" class="ale-message__svg" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
            </svg>
            <svg v-else-if="type === 'warning'" class="ale-message__svg" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M464 720a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-418.7-726.6c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-418.7 726.6c-12.1 21 3.2 46.7 27.7 46.7h837.4c24.5 0 39.8-25.7 27.7-46.7zM480 80c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32z"/>
            </svg>
            <svg v-else-if="type === 'error'" class="ale-message__svg" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
            </svg>
            <svg v-else class="ale-message__svg" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/>
            </svg>
          </template>
        </span>
        
        <!-- 内容 -->
        <div class="ale-message__content">
          <span v-if="dangerouslyUseHTMLString" v-html="message"></span>
          <span v-else>{{ message }}</span>
        </div>
        
        <!-- 关闭按钮 -->
        <button
          v-if="closable"
          class="ale-message__close"
          type="button"
          aria-label="关闭"
          @click="handleClose"
        >
          <svg class="ale-message__close-icon" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/>
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  onMounted,
  onUnmounted,
} from 'vue';
import type {
  MessageProps,
  MessageType,
  MessagePosition
} from './types';

/**
 * 消息组件
 * @description 用于显示全局消息提示
 */
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info' as MessageType,
  message: '',
  duration: 3000,
  closable: false,
  showIcon: true,
  position: 'top' as MessagePosition,
  customClass: '',
  visible: true,
  offset: 20,
  dangerouslyUseHTMLString: false
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'destroy'): void;
}>();

// 内部显示状态
const isVisible = ref(props.visible);
// 定时器
let timer: ReturnType<typeof setTimeout> | null = null;

/**
 * 消息样式类
 */
const messageClass = computed(() => {
  return [
    'ale-message',
    `ale-message--${props.type}`,
    `is-${props.position}`,
    {
      'is-closable': props.closable
    },
    props.customClass
  ];
});

/**
 * 消息样式
 */
const messageStyle = computed(() => {
  return {
    top: isTopPosition.value ? `${props.offset}px` : 'auto',
    bottom: isBottomPosition.value ? `${props.offset}px` : 'auto'
  };
});

/**
 * 是否顶部位置
 */
const isTopPosition = computed(() => {
  return props.position.startsWith('top');
});

/**
 * 是否底部位置
 */
const isBottomPosition = computed(() => {
  return props.position.startsWith('bottom');
});

/**
 * 开始定时器
 */
const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};

/**
 * 清除定时器
 */
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

/**
 * 关闭消息
 */
const close = () => {
  isVisible.value = false;
  emit('close');
};

/**
 * 处理关闭按钮点击
 */
const handleClose = () => {
  close();
};

/**
 * 处理鼠标进入
 */
const handleMouseEnter = () => {
  clearTimer();
};

/**
 * 处理鼠标离开
 */
const handleMouseLeave = () => {
  startTimer();
};

/**
 * 动画结束后销毁
 */
const handleAfterLeave = () => {
  emit('destroy');
};

// 监听 visible 变化
watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      startTimer();
    } else {
      clearTimer();
    }
  }
);

// 组件挂载
onMounted(() => {
  startTimer();
});

// 组件卸载
onUnmounted(() => {
  clearTimer();
});

// 暴露方法
defineExpose({
  close
});
</script>

<style scoped>
/* 仅保留 scoped 样式，主要样式在 Message.css */
</style>

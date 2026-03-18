<template>
  <Teleport to="body">
    <Transition
      name="ale-dialog-fade"
      @after-enter="handleOpened"
      @after-leave="handleClosed"
    >
      <div
        v-show="isVisible"
        :class="dialogWrapperClass"
        :style="wrapperStyle"
        role="dialog"
        aria-modal="true"
        @click.self="handleMaskClick"
      >
        <div :class="dialogClass" :style="dialogStyle">
          <!-- 头部区域 -->
          <div v-if="showHeader" class="ale-dialog__header">
            <slot name="title">
              <h3 class="ale-dialog__title">{{ title }}</h3>
            </slot>
            <button
              v-if="showClose"
              type="button"
              class="ale-dialog__close"
              aria-label="关闭"
              @click="handleClose"
            >
              <span class="ale-dialog__close-icon">×</span>
            </button>
          </div>

          <!-- 内容区域 -->
          <div class="ale-dialog__body">
            <slot />
          </div>

          <!-- 底部区域 -->
          <div v-if="showFooter" class="ale-dialog__footer">
            <slot name="footer">
              <AleButton
                v-if="showCancel"
                :disabled="cancelDisabled"
                @click="handleCancel"
              >
                {{ cancelText }}
              </AleButton>
              <AleButton
                v-if="showConfirm"
                type="primary"
                :loading="confirmLoading"
                :disabled="confirmDisabled"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </AleButton>
            </slot>
          </div>
        </div>
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
import { AleButton } from '../button';
import type {
  DialogProps,
  DialogEmits,
  DialogSize,
  DialogPosition
} from './types';
import './Dialog.css';

/**
 * 对话框组件
 * @description 支持自定义内容、尺寸、位置、动画效果
 */
const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  title: '提示',
  width: '',
  size: 'medium' as DialogSize,
  position: 'center' as DialogPosition,
  showMask: true,
  maskClosable: true,
  showClose: true,
  showFooter: true,
  confirmText: '确定',
  cancelText: '取消',
  showConfirm: true,
  showCancel: true,
  confirmLoading: false,
  confirmDisabled: false,
  cancelDisabled: false,
  keyboard: true,
  zIndex: 2000,
  customClass: '',
  lockScroll: true,
  destroyOnClose: false
});

const emit = defineEmits<DialogEmits>();

// 内部显示状态
const isVisible = ref(props.modelValue);
// 是否已挂载
const isMounted = ref(false);

/**
 * 是否显示头部
 */
const showHeader = computed(() => {
  return props.showClose || props.title || true;
});

/**
 * 对话框包装器样式类
 */
const dialogWrapperClass = computed(() => {
  return [
    'ale-dialog-wrapper',
    {
      'is-mask': props.showMask,
      [`is-position-${props.position}`]: props.position
    },
    props.customClass
  ];
});

/**
 * 对话框样式类
 */
const dialogClass = computed(() => {
  return [
    'ale-dialog',
    `ale-dialog--${props.size}`,
    {
      'has-header': showHeader.value,
      'has-footer': props.showFooter
    }
  ];
});

/**
 * 包装器样式
 */
const wrapperStyle = computed(() => {
  return {
    'z-index': props.zIndex
  };
});

/**
 * 对话框样式
 */
const dialogStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  return style;
});

/**
 * 锁定/解锁 body 滚动
 */
const toggleBodyScroll = (lock: boolean) => {
  if (!props.lockScroll) return;

  if (lock) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

/**
 * 处理键盘事件
 */
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.keyboard || !isVisible.value) return;

  if (event.key === 'Escape') {
    handleClose();
  }
};

/**
 * 打开对话框
 */
const open = () => {
  isVisible.value = true;
  toggleBodyScroll(true);
  emit('update:modelValue', true);
  emit('open');
};

/**
 * 关闭对话框
 */
const close = () => {
  isVisible.value = false;
  toggleBodyScroll(false);
  emit('update:modelValue', false);
  emit('close');
};

/**
 * 处理关闭
 */
const handleClose = () => {
  close();
};

/**
 * 处理遮罩层点击
 */
const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose();
  }
};

/**
 * 处理确认
 */
const handleConfirm = () => {
  emit('confirm');
};

/**
 * 处理取消
 */
const handleCancel = () => {
  emit('cancel');
  close();
};

/**
 * 打开动画完成后
 */
const handleOpened = () => {
  emit('opened');
};

/**
 * 关闭动画完成后
 */
const handleClosed = () => {
  emit('closed');
};

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== isVisible.value) {
      if (newVal) {
        isVisible.value = true;
        toggleBodyScroll(true);
        emit('open');
      } else {
        isVisible.value = false;
        toggleBodyScroll(false);
        emit('close');
      }
    }
  }
);

// 组件挂载
onMounted(() => {
  isMounted.value = true;
  document.addEventListener('keydown', handleKeydown);
});

// 组件卸载
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  toggleBodyScroll(false);
});

// 暴露方法
defineExpose({
  open,
  close
});
</script>

<style scoped>
/* 仅保留 scoped 样式，主要样式在 Dialog.css */
</style>

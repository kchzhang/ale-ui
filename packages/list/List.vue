<template>
  <div
    :class="listClass"
    :style="customStyle"
    role="list"
    aria-label="列表"
  >
    <!-- 加载状态 -->
    <div v-if="loading" class="ale-list__loading">
      <slot name="loading">
        <div class="ale-list__loading-spinner"></div>
        <span class="ale-list__loading-text">加载中...</span>
      </slot>
    </div>

    <!-- 空状态 -->
    <div
      v-else-if="!data || data.length === 0"
      class="ale-list__empty"
      role="status"
    >
      <slot name="empty">
        <div class="ale-list__empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="9"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
          </svg>
        </div>
        <span class="ale-list__empty-text">{{ emptyText }}</span>
      </slot>
    </div>

    <!-- 列表内容 -->
    <template v-else>
      <div
        v-for="(item, index) in data"
        :key="item.id ?? index"
        :class="getItemClass(item, index)"
        role="listitem"
        :aria-disabled="item.disabled || false"
        @click="handleItemClick(item, index)"
      >
        <!-- 序号 -->
        <span v-if="showIndex" class="ale-list__index">{{ index + 1 }}</span>

        <!-- 头像/图标 -->
        <div v-if="item.avatar || $slots.avatar" class="ale-list__avatar">
          <slot name="avatar" :item="item" :index="index">
            <img v-if="isImageAvatar(item.avatar)" :src="item.avatar" alt="avatar" />
            <div v-else-if="item.avatar" class="ale-list__avatar-text">{{ item.avatar }}</div>
          </slot>
        </div>

        <!-- 内容区域 -->
        <div class="ale-list__content">
          <!-- 标题 -->
          <div v-if="item.title || $slots.title" class="ale-list__title">
            <slot name="title" :item="item" :index="index">
              {{ item.title }}
            </slot>
          </div>

          <!-- 描述 -->
          <div v-if="item.description || $slots.description" class="ale-list__description">
            <slot name="description" :item="item" :index="index">
              {{ item.description }}
            </slot>
          </div>

          <!-- 自定义内容 -->
          <slot :item="item" :index="index" />
        </div>

        <!-- 额外内容 -->
        <div v-if="item.extra || $slots.extra" class="ale-list__extra">
          <slot name="extra" :item="item" :index="index">
            {{ item.extra }}
          </slot>
        </div>

        <!-- 操作区域 -->
        <div v-if="$slots.actions" class="ale-list__actions">
          <slot name="actions" :item="item" :index="index" :onAction="(action: string) => handleAction(item, index, action)" />
        </div>
      </div>
    </template>

    <!-- 底部 -->
    <div v-if="$slots.footer" class="ale-list__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ListProps, ListEmits, ListItemData } from './types';
import './List.css';

const props = withDefaults(defineProps<ListProps>(), {
  data: () => [],
  size: 'medium',
  layout: 'vertical',
  bordered: true,
  borderStyle: 'solid',
  split: true,
  showIndex: false,
  clickable: false,
  loading: false,
  emptyText: '暂无数据'
});

const emit = defineEmits<ListEmits>();

/**
 * 列表容器类名
 */
const listClass = computed(() => ({
  'ale-list': true,
  [`ale-list--${props.size}`]: props.size,
  [`ale-list--${props.layout}`]: props.layout,
  'is-bordered': props.bordered,
  [`is-bordered-${props.borderStyle}`]: props.bordered && props.borderStyle,
  'is-split': props.split,
  'is-loading': props.loading,
  [props.customClass || '']: props.customClass
}));

/**
 * 获取列表项类名
 */
const getItemClass = (item: ListItemData, index: number) => ({
  'ale-list__item': true,
  'is-disabled': item.disabled,
  'is-clickable': props.clickable && !item.disabled,
  'is-active': false
});

/**
 * 判断头像是否为图片
 */
const isImageAvatar = (avatar?: string): boolean => {
  if (!avatar) return false;
  return avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:');
};

/**
 * 处理列表项点击
 */
const handleItemClick = (item: ListItemData, index: number) => {
  if (item.disabled || !props.clickable) return;
  emit('click', item, index);
};

/**
 * 处理操作按钮点击
 */
const handleAction = (item: ListItemData, index: number, action: string) => {
  if (item.disabled) return;
  emit('action', item, index, action);
};
</script>

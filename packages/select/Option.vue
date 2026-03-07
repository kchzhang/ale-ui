<template>
  <li
    :class="optionClass"
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click.stop="handleClick"
    @mouseenter="handleMouseEnter"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <span class="ale-option__label">
      <slot>{{ displayLabel }}</slot>
    </span>
    <span v-if="isSelected" class="ale-option__check-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
    <span class="ale-option__sr-only">
      {{ isSelected ? '已选择' : '未选择' }}
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, useSlots, onMounted } from 'vue';
import type { OptionProps, OptionEmits, SelectContext } from './types';
import { SELECT_CONTEXT_KEY } from './constants';
import './Option.css';

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false
});

const emit = defineEmits<OptionEmits>();
const slots = useSlots();

/**
 * 注入 Select 上下文
 */
const selectContext = inject<SelectContext>(SELECT_CONTEXT_KEY);

/**
 * 显示的标签文本
 */
const displayLabel = computed(() => {
  // 如果有 slot，返回空字符串（slot 会渲染）
  if (slots.default) {
    return '';
  }
  // 否则返回 label prop 或 value 的字符串形式
  return props.label ?? String(props.value);
});

/**
 * 获取选项标签（用于 select 回调）
 */
const getOptionLabel = (): string => {
  if (slots.default) {
    // 如果有 slot，从 slot 内容获取文本
    const slotContent = slots.default();
    if (slotContent && slotContent.length > 0) {
      const firstChild = slotContent[0];
      if (firstChild && typeof firstChild.children === 'string') {
        return firstChild.children;
      }
    }
    return String(props.value);
  }
  return props.label ?? String(props.value);
};

/**
 * 是否被选中
 */
const isSelected = computed(() => {
  return selectContext?.isSelected(props.value) ?? false;
});

/**
 * 是否高亮
 */
const isHighlighted = computed(() => {
  return selectContext?.highlightedValue.value === props.value;
});

/**
 * 选项类名
 */
const optionClass = computed(() => ({
  'ale-option': true,
  'is-selected': isSelected.value,
  'is-disabled': props.disabled,
  'is-highlighted': isHighlighted.value
}));

/**
 * 处理点击
 */
const handleClick = () => {
  if (props.disabled) return;
  selectContext?.selectOption(props.value, {
    label: getOptionLabel(),
    value: props.value,
    disabled: props.disabled
  });
  emit('click');
};

/**
 * 处理鼠标进入
 */
const handleMouseEnter = () => {
  if (props.disabled) return;
  selectContext?.setHighlightedValue(props.value);
};

/**
 * 组件挂载时注册 label（用于多选模式下正确显示标签）
 */
onMounted(() => {
  if (selectContext?.registerOptionLabel) {
    selectContext.registerOptionLabel(props.value, getOptionLabel());
  }
});
</script>

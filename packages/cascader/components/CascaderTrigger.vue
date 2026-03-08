<template>
  <div
    ref="triggerRef"
    class="ale-cascader__trigger"
    :class="{ 'is-open': isOpen, 'is-focused': isFocused }"
    tabindex="0"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- 搜索输入框 -->
    <input
      v-if="filterable && isOpen"
      ref="inputRef"
      v-model="searchQuery"
      type="text"
      class="ale-cascader__input"
      :placeholder="inputPlaceholder"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @input="handleSearchInput"
    />

    <!-- 显示文本 -->
    <span
      v-else
      class="ale-cascader__selected-text"
      :class="{ 'is-placeholder': !selectedLabel }"
    >
      {{ selectedLabel || placeholder }}
    </span>

    <!-- 右侧图标区域 -->
    <span class="ale-cascader__suffix">
      <!-- 清空按钮 -->
      <span
        v-if="showClear"
        class="ale-cascader__clear"
        @click.stop="handleClear"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </span>
      <!-- 下拉箭头 -->
      <span
        class="ale-cascader__arrow"
        :class="{ 'is-open': isOpen }"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

export interface CascaderTriggerProps {
  isOpen: boolean;
  isFocused: boolean;
  disabled: boolean;
  filterable: boolean;
  placeholder: string;
  selectedLabel: string;
  showClear: boolean;
}

const props = defineProps<CascaderTriggerProps>();

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
  (e: 'search-input', value: string): void;
  (e: 'keydown', event: KeyboardEvent): void;
  (e: 'mouseenter'): void;
  (e: 'mouseleave'): void;
}>();

const triggerRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement>();
const searchQuery = ref('');

const inputPlaceholder = computed(() => {
  if (props.selectedLabel && !props.isOpen) {
    return props.selectedLabel;
  }
  return props.placeholder || '请选择';
});

const handleClick = () => {
  emit('click');
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const handleClear = () => {
  searchQuery.value = '';
  emit('clear');
};

const handleSearchInput = () => {
  emit('search-input', searchQuery.value);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);
};

const handleMouseEnter = () => {
  emit('mouseenter');
};

const handleMouseLeave = () => {
  emit('mouseleave');
};

// 暴露方法
const focus = () => {
  if (props.filterable) {
    inputRef.value?.focus();
  } else {
    triggerRef.value?.focus();
  }
};

const blur = () => {
  if (props.filterable) {
    inputRef.value?.blur();
  } else {
    triggerRef.value?.blur();
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

const getTriggerRect = () => {
  return triggerRef.value?.getBoundingClientRect() || null;
};

defineExpose({
  focus,
  blur,
  clearSearch,
  getTriggerRect
});
</script>

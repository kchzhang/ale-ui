<template>
  <div
    :class="selectClass"
    :style="customStyle"
    v-click-outside="handleClickOutside"
  >
    <!-- 选择器触发区域 -->
    <div
      ref="triggerRef"
      class="ale-select__trigger"
      :class="{ 'is-open': isOpen, 'is-focused': isFocused }"
      tabindex="0"
      @click="handleTriggerClick"
      @mouseenter="handleMouseEnterTrigger"
      @mouseleave="handleMouseLeaveTrigger"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <!-- 多选标签 -->
      <div v-if="multiple && selectedOptions.length > 0" class="ale-select__tags">
        <span
          v-for="(option) in displayedTags"
          :key="option.value"
          class="ale-select__tag"
          :class="{ 'is-disabled': disabled }"
        >
          <span class="ale-select__tag-text">{{ option.label }}</span>
          <span
            v-if="!disabled"
            class="ale-select__tag-close"
            @click.stop="handleRemoveTag(option.value)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
        </span>
        <span v-if="collapseTagCount > 0" class="ale-select__tag ale-select__tag--collapse">
          +{{ collapseTagCount }}
        </span>
      </div>

      <!-- 搜索输入框 / 显示文本 -->
      <input
        v-if="filterable"
        ref="inputRef"
        v-model="inputModelValue"
        type="text"
        class="ale-select__input"
        :class="{ 'is-multiple': multiple }"
        :placeholder="inputPlaceholder"
        :disabled="disabled"
        :readonly="readonly || !filterable"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @input="handleSearchInput"
      />
      <span
        v-else-if="!multiple || selectedOptions.length === 0"
        class="ale-select__selected-text"
        :class="{ 'is-placeholder': !selectedLabel }"
      >
        {{ selectedLabel || placeholder }}
      </span>

      <!-- 右侧图标区域 -->
      <span class="ale-select__suffix">
        <!-- 清空按钮 -->
        <span
          v-if="showClear"
          class="ale-select__clear"
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
          class="ale-select__arrow"
          :class="{ 'is-open': isOpen }"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </span>
    </div>

    <!-- 下拉菜单 -->
    <teleport to="body">
      <transition name="ale-select-dropdown">
        <div v-show="isOpen"
          ref="dropdownRef"
          class="ale-select__dropdown"
          :style="dropdownStyle"
        >
          <!-- 错误状态 -->
          <div v-if="searchError" class="ale-select__error">
            <span class="ale-select__error-icon">⚠️</span>
            <span class="ale-select__error-text">搜索失败，请重试</span>
          </div>

          <!-- 加载中状态 -->
          <div v-else-if="loading || isSearching" class="ale-select__loading">
            <span class="ale-select__loading-spinner"></span>
            <span class="ale-select__loading-text">{{ loadingText || t('ale.status.loading') }}</span>
          </div>

          <!-- 空数据状态（仅当使用 options prop 时显示） -->
          <div v-else-if="!$slots.default && displayOptions.length === 0" class="ale-select__empty">
            {{ noDataText || t('select.emptyText') }}
          </div>

          <!-- 虚拟滚动列表 -->
          <div
            v-else-if="virtualScroll"
            ref="virtualListRef"
            class="ale-select__virtual-list"
            :style="{ height: `${virtualHeight}px` }"
            @scroll="handleVirtualScroll"
          >
            <div
              class="ale-select__virtual-list-phantom"
              :style="{ height: `${phantomHeight}px` }"
            ></div>
            <div
              class="ale-select__virtual-list-content"
              :style="{ transform: `translateY(${offsetY}px)` }"
            >
              <div
                v-for="option in virtualOptions"
                :key="option.value"
                class="ale-select__option"
                :class="{
                  'is-selected': isSelected(option.value),
                  'is-highlighted': option.index === highlightedIndex,
                  'is-disabled': option.disabled
                }"
                :style="{ height: `${itemHeight}px` }"
                @click.stop="handleSelect(option)"
                @mouseenter="handleMouseEnter(option.index)"
              >
                <span class="ale-select__option-label">{{ option.label }}</span>
                <span v-if="isSelected(option.value)" class="ale-select__check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <!-- 普通列表 -->
          <div
            v-else
            ref="listRef"
            class="ale-select__list"
            :style="listDynamicStyle"
            role="listbox"
            :aria-multiselectable="multiple || undefined"
            :aria-busy="(loading || isSearching) || undefined"
            aria-label="选项列表"
          >
            <!-- Slot 渲染 AleOption 子组件 -->
            <template v-if="$slots.default">
              <slot></slot>
            </template>
            <!-- 使用 options prop 渲染 -->
            <template v-else>
              <div
                v-for="(option, index) in displayOptions"
                :key="option.value"
                class="ale-select__option"
                :class="{
                  'is-selected': isSelected(option.value),
                  'is-highlighted': index === highlightedIndex,
                  'is-disabled': option.disabled
                }"
                role="option"
                :aria-selected="isSelected(option.value)"
                :aria-disabled="option.disabled || undefined"
                :tabindex="option.disabled ? -1 : 0"
                @click.stop="handleSelect(option)"
                @mouseenter="highlightedIndex = index"
                @keydown.enter.prevent="handleSelect(option)"
                @keydown.space.prevent="handleSelect(option)"
              >
                <span class="ale-select__option-label">{{ option.label }}</span>
                <span v-if="isSelected(option.value)" class="ale-select__check-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <!-- 屏幕阅读器文本 -->
                <span class="ale-select__sr-only">
                  {{ isSelected(option.value) ? '已选择' : '未选择' }}
                </span>
              </div>
            </template>
          </div>

          <!-- 创建新条目 -->
          <div
            v-if="showCreateOption"
            class="ale-select__option ale-select__create-option"
            :class="{ 'is-highlighted': highlightedIndex === displayOptions.length }"
            @click.stop="handleCreate"
            @mouseenter="highlightedIndex = displayOptions.length"
          >
            <span>创建 "{{ searchQuery }}"</span>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onUnmounted,
  provide
} from 'vue';
import type { SelectProps, SelectEmits, SelectOption, SelectContext } from './types';
import { SELECT_CONTEXT_KEY } from './constants';
import { useLocale } from '../locale';
import './Select.css';

// Props 定义
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  size: 'medium',
  disabled: false,
  clearable: false,
  filterable: false,
  multiple: false,
  readonly: false,
  loading: false,
  virtualScroll: false,
  itemHeight: 34,
  visibleCount: 10,
  allowCreate: false,
  maxCollapseTags: 0
});

const emit = defineEmits<SelectEmits & {
  (e: 'search-error', error: Error): void;
}>();

// 国际化
const { t } = useLocale();

// 内部状态
const isOpen = ref(false);
const isFocused = ref(false);
const isHovered = ref(false);
const searchQuery = ref('');
const highlightedIndex = ref(-1);
const triggerRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement>();
const virtualListRef = ref<HTMLElement>();
const scrollTop = ref(0);
const searchError = ref<Error | null>(null);
const isSearching = ref(false);
// 防止打开后立即关闭的标志
let isOpening = false;

// 存储从 slot Option 中选中的选项标签（用于非 options prop 模式）
const selectedOptionLabels = ref<Map<string | number, string>>(new Map());


// ResizeObserver for tracking trigger position changes
let triggerResizeObserver: ResizeObserver | null = null;
// Animation frame for position updates
let positionUpdateFrame: number | null = null;

// 防抖计时器
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
// 远程搜索控制器
let remoteAbortController: AbortController | null = null;

// 下拉菜单配置
const DROPDOWN_CONFIG = {
  maxItems: 8,           // 最大显示项数（超过则滚动）
  itemHeight: 34         // 每项默认高度
} as const;

// 点击外部指令
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) {
        binding.value();
      }
    };
    document.addEventListener('click', handler);
    (el as any).__clickOutsideHandler = handler;
  },
  unmounted(el: HTMLElement) {
    const handler = (el as any).__clickOutsideHandler;
    if (handler) {
      document.removeEventListener('click', handler);
      delete (el as any).__clickOutsideHandler;
    }
  }
};

// 计算选中的值数组
const selectedValues = computed(() => {
  if (props.modelValue === undefined || props.modelValue === null) {
    return [];
  }
  return Array.isArray(props.modelValue)
    ? props.modelValue
    : [props.modelValue];
});

// 选中的选项
const selectedOptions = computed(() => {
  // 从 props.options 获取选中的选项
  const fromOptions = props.options.filter(opt => selectedValues.value.includes(opt.value));

  // 如果使用 slot 方式（AleOption 组件），从 selectedOptionLabels 获取
  const fromSlots = selectedValues.value
    .filter(value => !props.options.some(opt => opt.value === value))
    .map(value => {
      const label = selectedOptionLabels.value.get(value);
      return { value, label: label || String(value) };
    });

  return [...fromOptions, ...fromSlots];
});

// 显示的选中标签（多选时考虑折叠）
const displayedTags = computed(() => {
  if (props.maxCollapseTags && props.maxCollapseTags > 0) {
    return selectedOptions.value.slice(0, props.maxCollapseTags);
  }
  return selectedOptions.value;
});

// 折叠的标签数量
const collapseTagCount = computed(() => {
  if (props.maxCollapseTags && props.maxCollapseTags > 0) {
    return selectedOptions.value.length - props.maxCollapseTags;
  }
  return 0;
});

// 过滤后的选项 - 带缓存机制
const filteredOptions = computed(() => {
  // 如果有搜索错误，返回空数组
  if (searchError.value) {
    return [];
  }

  // 远程搜索模式下，不过滤本地选项
  if (props.remoteMethod) {
    return props.options;
  }

  // 非搜索模式或空搜索词，返回全部选项
  if (!props.filterable || !searchQuery.value.trim()) {
    return props.options;
  }

  try {
    // 自定义过滤方法
    if (props.filterMethod) {
      return props.options.filter(opt =>
        props.filterMethod!(searchQuery.value.trim(), opt)
      );
    }

    // 默认过滤方法 - 支持拼音和大小写不敏感
    const query = searchQuery.value.trim().toLowerCase();
    return props.options.filter(opt => {
      const label = String(opt.label).toLowerCase();
      const value = String(opt.value).toLowerCase();
      return label.includes(query) || value.includes(query);
    });
  } catch (error) {
    console.error('[Select] 过滤选项时出错:', error);
    searchError.value = error instanceof Error ? error : new Error('过滤失败');
    return props.options;
  }
});

// 显示的选项（非虚拟滚动）
const displayOptions = computed(() => {
  return filteredOptions.value;
});

// 高亮的选项值
const highlightedValue = computed(() => {
  if (highlightedIndex.value < 0 || highlightedIndex.value >= displayOptions.value.length) {
    return undefined;
  }
  return displayOptions.value[highlightedIndex.value]?.value;
});

// 设置高亮值
const setHighlightedValue = (value: string | number | undefined) => {
  if (value === undefined) {
    highlightedIndex.value = -1;
    return;
  }
  const index = displayOptions.value.findIndex(opt => opt.value === value);
  highlightedIndex.value = index;
};

// 选择选项（给 Option 组件使用）
const selectOption = (_value: string | number, option: SelectOption) => {
  if (props.disabled) return;
  handleSelect(option);
};

// 注册选项标签（用于 slot 模式）
const registerOptionLabel = (value: string | number, label: string) => {
  selectedOptionLabels.value.set(value, label);
};

// Provide context 给 Option 组件
const selectContext: SelectContext = {
  isSelected: (value: string | number) => selectedValues.value.includes(value),
  selectedValues,
  highlightedValue,
  setHighlightedValue,
  selectOption,
  multiple: computed(() => props.multiple),
  registerOptionLabel
};
provide(SELECT_CONTEXT_KEY, selectContext);

// 虚拟滚动的计算
const virtualHeight = computed(() => {
  return props.visibleCount * props.itemHeight;
});

const phantomHeight = computed(() => {
  return filteredOptions.value.length * props.itemHeight;
});

// 列表动态样式 - 高度根据内容自适应，不固定
const listDynamicStyle = computed(() => {
  // 虚拟滚动模式下使用固定高度
  if (props.virtualScroll) {
    return {};
  }

  // 高度根据内容自适应，仅设置最大高度限制防止过长
  return {
    maxHeight: `${DROPDOWN_CONFIG.maxItems * DROPDOWN_CONFIG.itemHeight}px`,
    overflow: 'auto'
  };
});

const startIndex = computed(() => {
  return Math.floor(scrollTop.value / props.itemHeight);
});

const offsetY = computed(() => {
  return startIndex.value * props.itemHeight;
});

const virtualOptions = computed(() => {
  const endIndex = Math.min(
    startIndex.value + props.visibleCount + 2,
    filteredOptions.value.length
  );
  return filteredOptions.value
    .slice(startIndex.value, endIndex)
    .map((opt, idx) => ({ ...opt, index: startIndex.value + idx }));
});

// 输入框占位符
const inputPlaceholder = computed(() => {
  // 多选且有值时，placeholder 为空
  if (props.multiple && selectedOptions.value.length > 0) {
    return '';
  }
  // 单选且有值时，显示选中的标签作为 placeholder
  if (!props.multiple && selectedLabel.value && !isOpen.value) {
    return selectedLabel.value;
  }
  return props.placeholder || '请选择';
});

// 输入框的 modelValue - 用于显示搜索词或选中值
const inputModelValue = computed({
  get() {
    // 下拉打开时显示搜索词
    if (isOpen.value) {
      return searchQuery.value;
    }
    // 单选模式下显示选中标签
    if (!props.multiple && selectedLabel.value) {
      return selectedLabel.value;
    }
    return searchQuery.value;
  },
  set(val: string) {
    searchQuery.value = val;
  }
});

// 选中的标签文本（单选时）
const selectedLabel = computed(() => {
  if (props.multiple) return '';
  // 单选模式下 modelValue 是单个值
  const modelValue = props.modelValue as string | number | undefined;
  if (modelValue === undefined || modelValue === null) return '';

  // 优先从 props.options 查找
  const selected = props.options.find(opt => opt.value === modelValue);
  if (selected) {
    return selected.label;
  }
  // 如果使用 slot 方式，从 selectedOptionLabels 中查找
  const label = selectedOptionLabels.value.get(modelValue);
  if (label) {
    return label;
  }
  return String(modelValue);
});



// 是否显示清空按钮 - 悬停且有值时显示
const showClear = computed(() => {
  return props.clearable
    && !props.disabled
    && selectedValues.value.length > 0
    && isHovered.value;
});

// 是否显示创建新条目选项
const showCreateOption = computed(() => {
  return props.allowCreate
    && props.filterable
    && searchQuery.value
    && !props.options.some(opt => opt.label === searchQuery.value);
});

// 组件类名
const selectClass = computed(() => {
  return [
    'ale-select',
    `ale-select--${props.size}`,
    {
      'is-disabled': props.disabled,
      'is-multiple': props.multiple,
      'is-filterable': props.filterable,
      'is-clearable': props.clearable && selectedValues.value.length > 0
    },
    props.customClass
  ];
});

// 下拉菜单位置样式 - 使用缓存避免频繁重算
const dropdownRect = ref<DOMRect | null>(null);

/**
 * Update dropdown position based on trigger element
 * Uses requestAnimationFrame for smooth updates
 */
const updateDropdownRect = () => {
  if (!triggerRef.value || !isOpen.value) return;

  const rect = triggerRef.value.getBoundingClientRect();

  // Check if position has actually changed
  if (dropdownRect.value) {
    const prev = dropdownRect.value;
    const threshold = 1; // 1px threshold to avoid unnecessary updates
    if (
      Math.abs(rect.top - prev.top) < threshold &&
      Math.abs(rect.left - prev.left) < threshold &&
      Math.abs(rect.width - prev.width) < threshold &&
      Math.abs(rect.height - prev.height) < threshold
    ) {
      return;
    }
  }

  dropdownRect.value = rect;
};

/**
 * Schedule a position update on next animation frame
 * This ensures smooth updates without blocking the main thread
 */
const schedulePositionUpdate = () => {
  if (positionUpdateFrame) {
    cancelAnimationFrame(positionUpdateFrame);
  }

  positionUpdateFrame = requestAnimationFrame(() => {
    updateDropdownRect();
    positionUpdateFrame = null;
  });
};

/**
 * Initialize ResizeObserver to track trigger element size changes
 * This handles cases where select height changes due to content
 */
const initTriggerResizeObserver = () => {
  if (!triggerRef.value || typeof ResizeObserver === 'undefined') return;

  // Clean up existing observer
  if (triggerResizeObserver) {
    triggerResizeObserver.disconnect();
  }

  triggerResizeObserver = new ResizeObserver(() => {
    // Schedule position update on size change
    if (isOpen.value) {
      schedulePositionUpdate();
    }
  });

  triggerResizeObserver.observe(triggerRef.value);
};

/**
 * Clean up trigger ResizeObserver
 */
const cleanupTriggerResizeObserver = () => {
  if (triggerResizeObserver) {
    triggerResizeObserver.disconnect();
    triggerResizeObserver = null;
  }

  if (positionUpdateFrame) {
    cancelAnimationFrame(positionUpdateFrame);
    positionUpdateFrame = null;
  }
};

const dropdownStyle = computed(() => {
  if (!dropdownRect.value) return {} as Record<string, string>;
  const rect = dropdownRect.value;
  return {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: '9999'
  } as Record<string, string>;
});

// 监听窗口变化更新位置
const handleResize = () => {
  if (isOpen.value) {
    updateDropdownRect();
  }
};

// 是否选中
const isSelected = (value: string | number) => {
  return selectedValues.value.includes(value);
};

// 处理触发器点击
const handleTriggerClick = () => {
  if (props.disabled || props.readonly) return;
  toggleDropdown();
};

// 切换下拉菜单
const toggleDropdown = () => {
  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

// 打开下拉菜单
const openDropdown = () => {
  if (props.disabled || props.readonly) return;
  if (isOpen.value) return;

  try {
    // 设置打开中标志，防止立即关闭
    isOpening = true;
    setTimeout(() => {
      isOpening = false;
    }, 100);

    // 先计算位置，确保 dropdownRect 有值，这样 dropdownStyle 才能正确计算
    if (triggerRef.value) {
      dropdownRect.value = triggerRef.value.getBoundingClientRect();
    }

    isOpen.value = true;
    highlightedIndex.value = -1;
    searchError.value = null;
    emit('visible-change', true);

    // 绑定窗口事件
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    // 初始化 resize observer
    initTriggerResizeObserver();

    // DOM 更新后设置高亮索引和聚焦
    nextTick(() => {
      // 设置高亮索引为当前选中项
      if (props.modelValue !== undefined && props.modelValue !== null) {
        const index = displayOptions.value.findIndex(
          opt => opt.value === props.modelValue
        );
        if (index !== -1) {
          highlightedIndex.value = index;
        }
      }

      // 自动聚焦：filterable 模式聚焦输入框，普通模式聚焦 trigger
      if (props.filterable) {
        inputRef.value?.focus();
        // 单选模式下，如果有选中值，自动填充搜索词以便快速搜索
        if (!props.multiple && selectedLabel.value) {
          inputRef.value?.select();
        }
      } else {
        triggerRef.value?.focus();
      }
    });
  } catch (error) {
    console.error('[Select] 打开下拉菜单时出错:', error);
    searchError.value = error instanceof Error ? error : new Error('打开失败');
  }
};

// 关闭下拉菜单
const closeDropdown = () => {
  if (!isOpen.value) return;
  // 如果正在打开过程中，禁止关闭
  if (isOpening) return;
  isOpen.value = false;
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleResize, true);
  emit('visible-change', false);
  searchQuery.value = '';
  searchError.value = null;
  highlightedIndex.value = -1;

  // 清除防抖计时器
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = null;
  }

  // 取消远程搜索请求
  if (remoteAbortController) {
    remoteAbortController.abort();
    remoteAbortController = null;
  }

  // 清理 trigger resize observer
  cleanupTriggerResizeObserver();
};

// 处理点击外部
const handleClickOutside = () => {
  // 如果正在打开过程中，忽略外部点击
  if (isOpening) return;
  if (isOpen.value) {
    closeDropdown();
  }
};

// 处理选择
const handleSelect = (option: SelectOption) => {
  if (option.disabled) return;

  try {
    // 存储选项标签（用于 slot 模式）
    selectedOptionLabels.value.set(option.value, option.label);

    if (props.multiple) {
      const values = [...selectedValues.value];
      const index = values.indexOf(option.value);
      if (index === -1) {
        values.push(option.value);
      } else {
        values.splice(index, 1);
        emit('remove-tag', option.value);
      }
      emit('update:modelValue', values);
      emit('change', values);
      // 多选模式下保持搜索词，方便连续选择
      nextTick(() => {
        inputRef.value?.focus();
      });
    } else {
      emit('update:modelValue', option.value);
      emit('change', option.value);
      // 单选模式下清空搜索词
      searchQuery.value = '';
      closeDropdown();
    }
  } catch (error) {
    console.error('[Select] 选择选项时出错:', error);
    searchError.value = error instanceof Error ? error : new Error('选择失败');
  }
};

// 处理移除标签
const handleRemoveTag = (value: string | number) => {
  try {
    if (props.disabled) return;
    const values = selectedValues.value.filter(v => v !== value);
    emit('update:modelValue', values);
    emit('change', values);
    emit('remove-tag', value);

    // 移除标签后保持焦点
    nextTick(() => {
      if (props.filterable) {
        inputRef.value?.focus();
      }
    });
  } catch (error) {
    console.error('[Select] 移除标签时出错:', error);
  }
};

// 处理清空
const handleClear = () => {
  try {
    const emptyValue = props.multiple ? [] : '';
    emit('update:modelValue', emptyValue);
    emit('change', emptyValue);
    emit('clear');
    searchQuery.value = '';
    searchError.value = null;

    // 清空后聚焦输入框
    nextTick(() => {
      if (props.filterable) {
        inputRef.value?.focus();
      }
    });
  } catch (error) {
    console.error('[Select] 清空选择时出错:', error);
    searchError.value = error instanceof Error ? error : new Error('清空失败');
  }
};

// 处理搜索输入 - 带防抖
const handleSearchInput = () => {
  const query = searchQuery.value.trim();

  // 清除之前的错误
  searchError.value = null;

  // 立即触发 search 事件
  emit('search', query);

  // 清除之前的防抖计时器
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  // 远程搜索 - 300ms 防抖
  if (props.remoteMethod) {
    isSearching.value = true;
    searchDebounceTimer = setTimeout(async () => {
      try {
        // 取消之前的请求
        if (remoteAbortController) {
          remoteAbortController.abort();
        }
        remoteAbortController = new AbortController();

        await props.remoteMethod!(query);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // 请求被取消，忽略错误
          return;
        }
        console.error('[Select] 远程搜索失败:', error);
        searchError.value = error instanceof Error ? error : new Error('搜索失败');
        emit('search-error', searchError.value);
      } finally {
        isSearching.value = false;
      }
    }, 300);
  }

  highlightedIndex.value = -1;
};

// 处理创建新条目
const handleCreate = () => {
  try {
    const query = searchQuery.value.trim();
    if (!query) return;

    emit('create', query);
    searchQuery.value = '';
    closeDropdown();
  } catch (error) {
    console.error('[Select] 创建新条目时出错:', error);
    searchError.value = error instanceof Error ? error : new Error('创建失败');
  }
};

// 处理焦点
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  try {
    const options = displayOptions.value;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen.value) {
          openDropdown();
        } else {
          const maxIndex = options.length - 1 + (showCreateOption.value ? 1 : 0);
          highlightedIndex.value = Math.min(highlightedIndex.value + 1, maxIndex);
          if (highlightedIndex.value < 0) highlightedIndex.value = 0;
          scrollToHighlighted();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1);
        scrollToHighlighted();
        break;

      case 'Enter':
        event.preventDefault();
        if (isOpen.value && highlightedIndex.value >= 0) {
          if (highlightedIndex.value < options.length) {
            const selectedOption = options[highlightedIndex.value];
            if (selectedOption) {
              handleSelect(selectedOption);
            }
          } else if (showCreateOption.value) {
            handleCreate();
          }
        } else if (!isOpen.value) {
          openDropdown();
        }
        break;

      case 'Escape':
        event.preventDefault();
        closeDropdown();
        break;

      case 'Backspace':
        if (props.multiple
          && !searchQuery.value
          && selectedValues.value.length > 0) {
          const lastValue = selectedValues.value[selectedValues.value.length - 1];
          if (lastValue !== undefined) {
            handleRemoveTag(lastValue);
          }
        }
        break;

      case 'Tab':
        closeDropdown();
        break;

      case 'Home':
        if (isOpen.value) {
          event.preventDefault();
          highlightedIndex.value = 0;
          scrollToHighlighted();
        }
        break;

      case 'End':
        if (isOpen.value) {
          event.preventDefault();
          highlightedIndex.value = options.length - 1;
          scrollToHighlighted();
        }
        break;
    }
  } catch (error) {
    console.error('[Select] 键盘事件处理出错:', error);
  }
};

// 滚动到高亮项
const scrollToHighlighted = () => {
  if (props.virtualScroll) {
    nextTick(() => {
      const container = virtualListRef.value;
      if (!container) return;

      const itemTop = highlightedIndex.value * props.itemHeight;
      const itemBottom = itemTop + props.itemHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      if (itemTop < containerTop) {
        container.scrollTop = itemTop;
      } else if (itemBottom > containerBottom) {
        container.scrollTop = itemBottom - container.clientHeight;
      }
    });
  }
};

// 处理虚拟滚动
const handleVirtualScroll = () => {
  scrollTop.value = virtualListRef.value?.scrollTop || 0;
};

// 处理鼠标进入选项
const handleMouseEnter = (index: number) => {
  highlightedIndex.value = index;
};

// 处理鼠标进入触发器
const handleMouseEnterTrigger = () => {
  isHovered.value = true;
};

// 处理鼠标离开触发器
const handleMouseLeaveTrigger = () => {
  isHovered.value = false;
};

// 暴露方法
/**
 * 聚焦选择器
 * @description 将焦点设置到输入框或触发区域，并打开下拉菜单
 */
const focus = () => {
  if (props.disabled || props.readonly) return;
  if (props.filterable) {
    inputRef.value?.focus();
    openDropdown();
  } else {
    triggerRef.value?.focus();
    openDropdown();
  }
};

/**
 * 移除选择器焦点
 * @description 从输入框或触发区域移除焦点，并关闭下拉菜单
 */
const blur = () => {
  if (props.filterable) {
    inputRef.value?.blur();
  } else {
    triggerRef.value?.blur();
  }
  closeDropdown();
};

/**
 * 检查是否已聚焦
 * @returns {boolean} 当前是否处于聚焦状态
 */
const isFocusedFn = () => isFocused.value;

/**
 * 清空选择内容
 * @description 清空当前选中的值，触发 change 和 clear 事件
 */
const clear = () => {
  handleClear();
};

// 暴露给父组件的方法
defineExpose({
  /** 聚焦输入框 */
  focus,
  /** 移除焦点并关闭下拉菜单 */
  blur,
  /** 获取当前聚焦状态 */
  isFocused: isFocusedFn,
  /** 清空选择内容 */
  clear,
  /** 打开下拉菜单 */
  openDropdown,
  /** 关闭下拉菜单 */
  closeDropdown
});

// 监听选项变化 - 重置状态
watch(() => props.options, () => {
  highlightedIndex.value = -1;
  searchError.value = null;
}, { flush: 'post' });

// 监听窗口大小变化 - 响应式调整
watch(() => isOpen.value, (open) => {
  if (!open) {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleResize, true);
  }
});

// 组件卸载时清理
onUnmounted(() => {
  // 清除防抖计时器
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  // 取消远程搜索请求
  if (remoteAbortController) {
    remoteAbortController.abort();
  }

  // 移除事件监听
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleResize, true);

  // 清理 trigger resize observer
  cleanupTriggerResizeObserver();
});
</script>

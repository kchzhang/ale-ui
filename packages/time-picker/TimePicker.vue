<template>
  <div :class="timePickerClass" @click="handleClick">
    <input
      ref="inputRef"
      type="text"
      :class="inputClass"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="true"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="ale-time-picker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </span>
    <span
      v-if="clearable && modelValue && !disabled"
      class="ale-time-picker__clear"
      @click.stop="handleClear"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    </span>
    <Teleport to="body">
      <Transition name="ale-time-picker-fade">
        <div
          v-if="visible"
          ref="dropdownRef"
          :class="['ale-time-picker__dropdown', dropdownClass]"
          :style="dropdownStyle"
        >
          <div class="ale-time-picker__panel">
            <!-- 头部时间预览 -->
            <div class="ale-time-picker__header">
              <!-- AM/PM 切换器 - 右上角 -->
              <div v-if="use12Hours" class="ale-time-picker__period-switcher">
                <button
                  :class="['ale-time-picker__period-btn', { 'is-active': isAm }]"
                  @click.stop="selectPeriod('am')"
                >
                  AM
                </button>
                <button
                  :class="['ale-time-picker__period-btn', { 'is-active': !isAm }]"
                  @click.stop="selectPeriod('pm')"
                >
                  PM
                </button>
              </div>
              <div class="ale-time-picker__preview">
                <span
                  class="ale-time-picker__preview-item"
                  :class="{ 'is-active': activeColumn === 'hour' }"
                >
                  {{ formatNumber(displayHour) }}
                </span>
                <span class="ale-time-picker__preview-separator">:</span>
                <span
                  class="ale-time-picker__preview-item"
                  :class="{ 'is-active': activeColumn === 'minute' }"
                >
                  {{ formatNumber(selectedMinute) }}
                </span>
                <template v-if="showSeconds">
                  <span class="ale-time-picker__preview-separator">:</span>
                  <span
                    class="ale-time-picker__preview-item"
                    :class="{ 'is-active': activeColumn === 'second' }"
                  >
                    {{ formatNumber(selectedSecond) }}
                  </span>
                </template>
              </div>
            </div>
            
            <!-- 时间选择区域 -->
            <div class="ale-time-picker__body">
              <div class="ale-time-picker__columns">
                <!-- 小时列 -->
                <div
                  ref="hourColumnRef"
                  class="ale-time-picker__column"
                  @scroll.passive="handleScroll('hour')"
                  @mouseenter="activeColumn = 'hour'"
                  @touchstart.passive="handleTouchStart('hour')"
                  @touchend.passive="handleTouchEnd('hour')"
                >
                  <div class="ale-time-picker__column-padding"></div>
                  <div
                    v-for="hour in hours"
                    :key="hour"
                    :class="getItemClass('hour', hour)"
                    @click.stop="selectHour(hour)"
                  >
                    {{ formatNumber(hour) }}
                  </div>
                  <div class="ale-time-picker__column-padding"></div>
                </div>
                
                <!-- 分钟列 -->
                <div
                  ref="minuteColumnRef"
                  class="ale-time-picker__column"
                  @scroll.passive="handleScroll('minute')"
                  @mouseenter="activeColumn = 'minute'"
                  @touchstart.passive="handleTouchStart('minute')"
                  @touchend.passive="handleTouchEnd('minute')"
                >
                  <div class="ale-time-picker__column-padding"></div>
                  <div
                    v-for="minute in minutes"
                    :key="minute"
                    :class="getItemClass('minute', minute)"
                    @click.stop="selectMinute(minute)"
                  >
                    {{ formatNumber(minute) }}
                  </div>
                  <div class="ale-time-picker__column-padding"></div>
                </div>
                
                <!-- 秒列 -->
                <template v-if="showSeconds">
                  <div
                    ref="secondColumnRef"
                    class="ale-time-picker__column"
                    @scroll.passive="handleScroll('second')"
                    @mouseenter="activeColumn = 'second'"
                    @touchstart.passive="handleTouchStart('second')"
                    @touchend.passive="handleTouchEnd('second')"
                  >
                    <div class="ale-time-picker__column-padding"></div>
                    <div
                      v-for="second in seconds"
                      :key="second"
                      :class="getItemClass('second', second)"
                      @click.stop="selectSecond(second)"
                    >
                      {{ formatNumber(second) }}
                    </div>
                    <div class="ale-time-picker__column-padding"></div>
                  </div>
                </template>
                
                <!-- 选中行指示器 -->
                <div class="ale-time-picker__indicator"></div>
              </div>
            </div>
            
            <!-- 底部操作区 -->
            <div class="ale-time-picker__footer">
              <button class="ale-time-picker__btn ale-time-picker__btn--text" @click.stop="handleNow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ale-time-picker__btn-icon">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                此刻
              </button>
              <button class="ale-time-picker__btn ale-time-picker__btn--primary" @click.stop="handleConfirm">
                确定
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import type { TimePickerProps, TimePickerEmits, TimePickerExpose } from './types';
import './TimePicker.css';

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择时间',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'medium',
  theme: 'primary',
  showSeconds: false,
  use12Hours: false,
  minTime: '',
  maxTime: '',
  customClass: ''
});

const emit = defineEmits<TimePickerEmits>();

// DOM 引用
const inputRef = ref<HTMLInputElement>();
const dropdownRef = ref<HTMLDivElement>();
const hourColumnRef = ref<HTMLDivElement>();
const minuteColumnRef = ref<HTMLDivElement>();
const secondColumnRef = ref<HTMLDivElement>();

// 状态
const visible = ref(false);
const isFocused = ref(false);
const activeColumn = ref<'hour' | 'minute' | 'second'>('hour');
const selectedHour = ref(0);
const selectedMinute = ref(0);
const selectedSecond = ref(0);
const isAm = ref(true);
const dropdownPosition = ref({ top: 0, left: 0 });

// 滚动吸附相关
const ITEM_HEIGHT = 36;
const scrollTimeouts = ref<Record<string, number>>({
  hour: 0,
  minute: 0,
  second: 0
});
const isScrolling = ref<Record<string, boolean>>({
  hour: false,
  minute: false,
  second: false
});
const isTouching = ref<Record<string, boolean>>({
  hour: false,
  minute: false,
  second: false
});

// 计算属性
const timePickerClass = computed(() => [
  'ale-time-picker',
  `ale-time-picker--${props.size}`,
  `ale-time-picker--${props.theme}`,
  {
    'is-disabled': props.disabled,
    'is-focused': isFocused.value,
    'is-active': visible.value,
    [props.customClass]: props.customClass
  }
]);

const inputClass = computed(() => [
  'ale-time-picker__input',
  {
    'is-disabled': props.disabled,
    'is-readonly': props.readonly
  }
]);

const dropdownClass = computed(() => ({
  'is-visible': visible.value
}));

const dropdownStyle = computed(() => ({
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`
}));

const hours = computed(() => {
  if (props.use12Hours) {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
  return Array.from({ length: 24 }, (_, i) => i);
});

const minutes = computed(() => Array.from({ length: 60 }, (_, i) => i));
const seconds = computed(() => Array.from({ length: 60 }, (_, i) => i));

const displayValue = computed(() => {
  if (!props.modelValue) return '';
  return props.modelValue;
});

const displayHour = computed(() => {
  return selectedHour.value;
});

// 工具函数
const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};

const parseTime = (time: string) => {
  if (!time) return { hour: 0, minute: 0, second: 0 };
  const parts = time.split(':').map(Number);
  return {
    hour: parts[0] || 0,
    minute: parts[1] || 0,
    second: parts[2] || 0
  };
};

const formatTime = (): string => {
  let hour = selectedHour.value;
  if (props.use12Hours) {
    if (isAm.value && hour === 12) hour = 0;
    if (!isAm.value && hour !== 12) hour = hour + 12;
  }
  const parts = [formatNumber(hour), formatNumber(selectedMinute.value)];
  if (props.showSeconds) {
    parts.push(formatNumber(selectedSecond.value));
  }
  return parts.join(':');
};

const getItemClass = (type: 'hour' | 'minute' | 'second', value: number) => {
  const selected = type === 'hour' 
    ? selectedHour.value 
    : type === 'minute' 
      ? selectedMinute.value 
      : selectedSecond.value;
  return [
    'ale-time-picker__item',
    { 'is-selected': selected === value }
  ];
};

// 获取列元素
const getColumnRef = (type: 'hour' | 'minute' | 'second') => {
  return type === 'hour' 
    ? hourColumnRef.value 
    : type === 'minute' 
      ? minuteColumnRef.value 
      : secondColumnRef.value;
};

// 滚动到指定位置
const scrollToIndex = (type: 'hour' | 'minute' | 'second', index: number, smooth = true) => {
  const column = getColumnRef(type);
  if (!column) return;
  
  const targetScrollTop = index * ITEM_HEIGHT;
  
  if (smooth) {
    column.style.scrollBehavior = 'smooth';
  } else {
    column.style.scrollBehavior = 'auto';
  }
  
  column.scrollTop = targetScrollTop;
  
  // 恢复平滑滚动
  if (!smooth) {
    requestAnimationFrame(() => {
      column.style.scrollBehavior = 'smooth';
    });
  }
};

// 吸附到最近的选项
const snapToNearest = (type: 'hour' | 'minute' | 'second') => {
  const column = getColumnRef(type);
  if (!column) return;
  
  const scrollTop = column.scrollTop;
  const maxScrollTop = column.scrollHeight - column.clientHeight;
  
  // 计算最近的索引
  let nearestIndex = Math.round(scrollTop / ITEM_HEIGHT);
  
  // 边界处理
  if (scrollTop <= 0) {
    nearestIndex = 0;
  } else if (scrollTop >= maxScrollTop) {
    const maxIndex = type === 'hour' 
      ? (props.use12Hours ? 11 : 23) 
      : 59;
    nearestIndex = maxIndex;
  } else {
    // 确保索引在有效范围内
    const maxIndex = type === 'hour' 
      ? (props.use12Hours ? 11 : 23) 
      : 59;
    nearestIndex = Math.max(0, Math.min(maxIndex, nearestIndex));
  }
  
  // 更新选中值
  if (type === 'hour') {
    const hour = props.use12Hours ? nearestIndex + 1 : nearestIndex;
    selectedHour.value = hour;
  } else if (type === 'minute') {
    selectedMinute.value = nearestIndex;
  } else {
    selectedSecond.value = nearestIndex;
  }
  
  // 滚动到最近的选项
  scrollToIndex(type, nearestIndex, true);
};

// 滚动事件处理
const handleScroll = (type: 'hour' | 'minute' | 'second') => {
  activeColumn.value = type;
  
  // 清除之前的定时器
  if (scrollTimeouts.value[type]) {
    clearTimeout(scrollTimeouts.value[type]);
  }
  
  isScrolling.value[type] = true;
  
  // 设置新的定时器，用于检测滚动停止
  scrollTimeouts.value[type] = window.setTimeout(() => {
    isScrolling.value[type] = false;
    // 只有在没有触摸时才进行吸附
    if (!isTouching.value[type]) {
      snapToNearest(type);
    }
  }, 150);
  
  // 实时更新选中值
  const column = getColumnRef(type);
  if (!column) return;
  
  const scrollTop = column.scrollTop;
  const index = Math.round(scrollTop / ITEM_HEIGHT);
  
  if (type === 'hour') {
    const hour = props.use12Hours ? Math.max(1, Math.min(12, index + 1)) : Math.max(0, Math.min(23, index));
    selectedHour.value = hour;
  } else if (type === 'minute') {
    selectedMinute.value = Math.max(0, Math.min(59, index));
  } else {
    selectedSecond.value = Math.max(0, Math.min(59, index));
  }
};

// 触摸事件处理
const handleTouchStart = (type: 'hour' | 'minute' | 'second') => {
  isTouching.value[type] = true;
  // 清除吸附定时器
  if (scrollTimeouts.value[type]) {
    clearTimeout(scrollTimeouts.value[type]);
  }
};

const handleTouchEnd = (type: 'hour' | 'minute' | 'second') => {
  isTouching.value[type] = false;
  
  // 延迟执行吸附，等待惯性滚动完成
  setTimeout(() => {
    if (!isScrolling.value[type] && !isTouching.value[type]) {
      snapToNearest(type);
    }
  }, 100);
};

// 选择操作
const selectHour = (hour: number) => {
  selectedHour.value = hour;
  const index = props.use12Hours ? hour - 1 : hour;
  scrollToIndex('hour', index, true);
  emitChange();
};

const selectMinute = (minute: number) => {
  selectedMinute.value = minute;
  scrollToIndex('minute', minute, true);
  emitChange();
};

const selectSecond = (second: number) => {
  selectedSecond.value = second;
  scrollToIndex('second', second, true);
  emitChange();
};

const selectPeriod = (period: 'am' | 'pm') => {
  isAm.value = period === 'am';
  emitChange();
};

const emitChange = () => {
  const time = formatTime();
  emit('update:modelValue', time);
  emit('change', time);
};

// 滚动到选中位置
const scrollToSelected = () => {
  nextTick(() => {
    const hourIndex = props.use12Hours ? selectedHour.value - 1 : selectedHour.value;
    scrollToIndex('hour', hourIndex, false);
    scrollToIndex('minute', selectedMinute.value, false);
    
    if (props.showSeconds) {
      scrollToIndex('second', selectedSecond.value, false);
    }
    
    // 稍后启用平滑滚动
    requestAnimationFrame(() => {
      const columns = [hourColumnRef.value, minuteColumnRef.value];
      if (props.showSeconds) {
        columns.push(secondColumnRef.value);
      }
      columns.forEach(col => {
        if (col) {
          col.style.scrollBehavior = 'smooth';
        }
      });
    });
  });
};

// 更新下拉位置
const updateDropdownPosition = () => {
  if (!inputRef.value) return;
  const rect = inputRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const dropdownHeight = 320;
  const dropdownWidth = 280;
  
  let top = rect.bottom + 8;
  let left = rect.left;
  
  // 上下位置调整
  if (top + dropdownHeight > viewportHeight) {
    top = rect.top - dropdownHeight - 8;
  }
  
  // 左右位置调整
  if (left + dropdownWidth > viewportWidth) {
    left = viewportWidth - dropdownWidth - 8;
  }
  if (left < 8) {
    left = 8;
  }
  
  dropdownPosition.value = { top, left };
};

// 滚动跟随相关
const scrollableParents = ref<Element[]>([]);
let updatePositionRaf: number | null = null;

// 节流更新位置
const throttledUpdatePosition = () => {
  if (updatePositionRaf) return;
  updatePositionRaf = requestAnimationFrame(() => {
    updateDropdownPosition();
    updatePositionRaf = null;
  });
};

// 获取所有可滚动的祖先元素
const getScrollableParents = (element: HTMLElement): Element[] => {
  const parents: Element[] = [];
  let parent = element.parentElement;
  
  while (parent) {
    const style = getComputedStyle(parent);
    const overflow = style.overflow + style.overflowY + style.overflowX;
    
    if (/(auto|scroll)/.test(overflow)) {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  
  // 添加 window
  parents.push(window as any);
  
  return parents;
};

// 添加滚动监听
const addScrollListeners = () => {
  if (!inputRef.value) return;
  
  scrollableParents.value = getScrollableParents(inputRef.value);
  
  scrollableParents.value.forEach(parent => {
    parent.addEventListener('scroll', throttledUpdatePosition, { passive: true });
  });
};

// 移除滚动监听
const removeScrollListeners = () => {
  scrollableParents.value.forEach(parent => {
    parent.removeEventListener('scroll', throttledUpdatePosition);
  });
  scrollableParents.value = [];
  
  // 清理 RAF
  if (updatePositionRaf) {
    cancelAnimationFrame(updatePositionRaf);
    updatePositionRaf = null;
  }
};

// 初始化默认时间（当没有 modelValue 时）
const initializeDefaultTime = () => {
  if (props.modelValue) {
    // 如果有 modelValue，解析并设置
    const { hour, minute, second } = parseTime(props.modelValue);
    if (props.use12Hours) {
      isAm.value = hour < 12;
      selectedHour.value = hour % 12 || 12;
    } else {
      selectedHour.value = hour;
    }
    selectedMinute.value = minute;
    selectedSecond.value = second;
  } else {
    // 如果没有 modelValue，使用当前时间作为默认值
    const now = new Date();
    let hour = now.getHours();
    
    if (props.use12Hours) {
      isAm.value = hour < 12;
      hour = hour % 12 || 12;
    }
    
    selectedHour.value = hour;
    selectedMinute.value = now.getMinutes();
    selectedSecond.value = now.getSeconds();
  }
};

// 事件处理
const handleClick = () => {
  if (props.disabled || props.readonly) return;
  visible.value = !visible.value;
  if (visible.value) {
    // 初始化时间（确保有默认值）
    initializeDefaultTime();
    updateDropdownPosition();
    nextTick(() => {
      scrollToSelected();
    });
  }
};

const handleNow = () => {
  const now = new Date();
  let hour = now.getHours();
  
  if (props.use12Hours) {
    isAm.value = hour < 12;
    hour = hour % 12 || 12;
  }
  
  selectedHour.value = hour;
  selectedMinute.value = now.getMinutes();
  selectedSecond.value = now.getSeconds();
  
  scrollToSelected();
  emitChange();
};

const handleConfirm = () => {
  // 确保吸附到最近选项
  snapToNearest('hour');
  snapToNearest('minute');
  if (props.showSeconds) {
    snapToNearest('second');
  }
  
  // 触发值更新，确保数据同步
  emitChange();
  
  visible.value = false;
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    !inputRef.value?.contains(target) &&
    !dropdownRef.value?.contains(target)
  ) {
    // 关闭前进行吸附校准
    if (visible.value) {
      snapToNearest('hour');
      snapToNearest('minute');
      if (props.showSeconds) {
        snapToNearest('second');
      }
    }
    visible.value = false;
  }
};

// 监听器
watch(() => props.modelValue, (val) => {
  if (val) {
    const { hour, minute, second } = parseTime(val);
    if (props.use12Hours) {
      isAm.value = hour < 12;
      selectedHour.value = hour % 12 || 12;
    } else {
      selectedHour.value = hour;
    }
    selectedMinute.value = minute;
    selectedSecond.value = second;
  }
}, { immediate: true });

watch(visible, (val) => {
  if (val) {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', updateDropdownPosition);
    // 添加滚动监听
    addScrollListeners();
  } else {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', updateDropdownPosition);
    // 移除滚动监听
    removeScrollListeners();
  }
});

// 生命周期
onMounted(() => {
  if (props.modelValue) {
    const { hour, minute, second } = parseTime(props.modelValue);
    if (props.use12Hours) {
      isAm.value = hour < 12;
      selectedHour.value = hour % 12 || 12;
    } else {
      selectedHour.value = hour;
    }
    selectedMinute.value = minute;
    selectedSecond.value = second;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  removeScrollListeners();
  // 确保清理定时器
  Object.values(scrollTimeouts.value).forEach(timeout => {
    if (timeout) clearTimeout(timeout);
  });
});

// 暴露方法
const focus = () => {
  inputRef.value?.focus();
};

const blur = () => {
  inputRef.value?.blur();
};

const clear = () => {
  handleClear();
};

defineExpose<TimePickerExpose>({
  focus,
  blur,
  clear
});
</script>

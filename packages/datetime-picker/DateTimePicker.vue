<template>
  <div :class="containerClass" ref="containerRef">
    <!-- 输入框区域 -->
    <div class="ale-datetime-picker__inputs">
      <div 
        :class="dateInputWrapperClass"
        @click="handleDateInputClick"
      >
        <input
          ref="dateInputRef"
          type="text"
          :class="dateInputClass"
          :value="dateDisplayValue"
          :placeholder="datePlaceholder"
          :disabled="disabled"
          @input="handleDateInput"
          @focus="handleDateFocus"
          @blur="handleDateBlur"
          @keydown.enter="handleDateEnter"
        />
        <span class="ale-datetime-picker__input-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
      </div>
      
      <div 
        :class="timeInputWrapperClass"
        @click="handleTimeInputClick"
      >
        <input
          ref="timeInputRef"
          type="text"
          :class="timeInputClass"
          :value="timeDisplayValue"
          :placeholder="timePlaceholder"
          :disabled="disabled"
          @input="handleTimeInput"
          @focus="handleTimeFocus"
          @blur="handleTimeBlur"
          @keydown.enter="handleTimeEnter"
        />
        <span class="ale-datetime-picker__input-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
      </div>
      
      <!-- 清空按钮 -->
      <span
        v-if="clearable && selectedDate && !disabled"
        class="ale-datetime-picker__clear"
        @click.stop="handleClear"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      </span>
    </div>

    <!-- 下拉面板 -->
    <Teleport to="body">
      <Transition name="ale-datetime-picker-fade">
        <div
          v-if="visible"
          ref="dropdownRef"
          :class="dropdownClass"
          :style="dropdownStyle"
        >
          <!-- 面板主体 -->
          <div class="ale-datetime-picker__panel">
            <!-- 日历面板 -->
            <div class="ale-datetime-picker__calendar">
              <!-- 头部导航 -->
              <div class="ale-datetime-picker__calendar-header">
                <button class="ale-datetime-picker__nav-btn" @click="handlePrevYear" aria-label="上一年">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="11 17 6 12 11 7" />
                    <polyline points="18 17 13 12 18 7" />
                  </svg>
                </button>
                <button class="ale-datetime-picker__nav-btn" @click="handlePrevMonth" aria-label="上个月">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span class="ale-datetime-picker__calendar-title">
                  {{ currentYear }}年{{ currentMonth + 1 }}月
                </span>
                <button class="ale-datetime-picker__nav-btn" @click="handleNextMonth" aria-label="下个月">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
                <button class="ale-datetime-picker__nav-btn" @click="handleNextYear" aria-label="下一年">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                  </svg>
                </button>
              </div>

              <!-- 星期标题 -->
              <div class="ale-datetime-picker__weekdays">
                <span v-for="day in weekDays" :key="day" class="ale-datetime-picker__weekday">{{ day }}</span>
              </div>

              <!-- 日期网格 -->
              <div class="ale-datetime-picker__dates">
                <button
                  v-for="(dateInfo, index) in dateGrid"
                  :key="index"
                  :class="getDateClass(dateInfo)"
                  :disabled="dateInfo.disabled"
                  @click="handleDateSelect(dateInfo)"
                >
                  {{ dateInfo.day }}
                </button>
              </div>
            </div>

            <!-- 时间滚轮面板 -->
            <div v-if="showTime" class="ale-datetime-picker__time">
              <div class="ale-datetime-picker__time-columns">
                <!-- 小时列 -->
                <div
                  ref="hourColumnRef"
                  class="ale-datetime-picker__time-column"
                  @scroll.passive="handleTimeScroll('hour')"
                >
                  <div class="ale-datetime-picker__time-padding"></div>
                  <button
                    v-for="hour in hourList"
                    :key="hour"
                    :class="getTimeItemClass('hour', hour)"
                    @click.stop="selectHour(hour)"
                  >
                    {{ formatNumber(hour) }}
                  </button>
                  <div class="ale-datetime-picker__time-padding"></div>
                </div>

                <!-- 冒号分隔符 -->
                <div class="ale-datetime-picker__time-separator">:</div>

                <!-- 分钟列 -->
                <div
                  ref="minuteColumnRef"
                  class="ale-datetime-picker__time-column"
                  @scroll.passive="handleTimeScroll('minute')"
                >
                  <div class="ale-datetime-picker__time-padding"></div>
                  <button
                    v-for="minute in minuteList"
                    :key="minute"
                    :class="getTimeItemClass('minute', minute)"
                    @click.stop="selectMinute(minute)"
                  >
                    {{ formatNumber(minute) }}
                  </button>
                  <div class="ale-datetime-picker__time-padding"></div>
                </div>

                <!-- 冒号分隔符（当显示秒时） -->
                <div v-if="showSeconds" class="ale-datetime-picker__time-separator">:</div>

                <!-- 秒列 -->
                <div
                  v-if="showSeconds"
                  ref="secondColumnRef"
                  class="ale-datetime-picker__time-column"
                  @scroll.passive="handleTimeScroll('second')"
                >
                  <div class="ale-datetime-picker__time-padding"></div>
                  <button
                    v-for="second in secondList"
                    :key="second"
                    :class="getTimeItemClass('second', second)"
                    @click.stop="selectSecond(second)"
                  >
                    {{ formatNumber(second) }}
                  </button>
                  <div class="ale-datetime-picker__time-padding"></div>
                </div>

                <!-- 选中行指示器 -->
                <div class="ale-datetime-picker__time-indicator"></div>
              </div>
            </div>
          </div>

          <!-- 底部操作区 -->
          <div class="ale-datetime-picker__footer">
            <button class="ale-datetime-picker__btn ale-datetime-picker__btn--text" @click="handleNow">
              此刻
            </button>
            <div class="ale-datetime-picker__footer-actions">
              <button class="ale-datetime-picker__btn ale-datetime-picker__btn--default" @click="handleCancel">
                取消
              </button>
              <button class="ale-datetime-picker__btn ale-datetime-picker__btn--primary" @click="handleOk">
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
import dayjs from 'dayjs';
import type { DateTimePickerProps, DateTimePickerEmits, DateTimePickerExpose } from './types';
import './DateTimePicker.css';

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择日期时间',
  datePlaceholder: 'YYYY/MM/DD',
  timePlaceholder: 'HH:MM:SS',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'medium',
  theme: 'primary',
  format: 'YYYY/MM/DD HH:mm:ss',
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  showTime: true,
  showSeconds: true,
  use12Hours: false
});

const emit = defineEmits<DateTimePickerEmits>();

// DOM 引用
const containerRef = ref<HTMLDivElement>();
const dateInputRef = ref<HTMLInputElement>();
const timeInputRef = ref<HTMLInputElement>();
const dropdownRef = ref<HTMLDivElement>();
const hourColumnRef = ref<HTMLDivElement>();
const minuteColumnRef = ref<HTMLDivElement>();
const secondColumnRef = ref<HTMLDivElement>();

// 状态
const visible = ref(false);
const isDateFocused = ref(false);
const isTimeFocused = ref(false);
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());
const selectedDate = ref<Date | null>(null);
const selectedHour = ref(0);
const selectedMinute = ref(0);
const selectedSecond = ref(0);
const dropdownPosition = ref({ top: 0, left: 0 });

// 临时选中值（弹窗内操作使用，确定后才同步到正式值）
const tempSelectedDate = ref<Date | null>(null);
const tempSelectedHour = ref(0);
const tempSelectedMinute = ref(0);
const tempSelectedSecond = ref(0);

// 时间滚轮配置
const ITEM_HEIGHT = 36;
const scrollTimeouts = ref<Record<string, number>>({ hour: 0, minute: 0, second: 0 });

// 缓存初始值（用于取消时恢复）
const initialDate = ref<Date | null>(null);
const initialHour = ref(0);
const initialMinute = ref(0);
const initialSecond = ref(0);

// 星期标题
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

// 时间列表
const hourList = computed(() => 
  props.use12Hours ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i)
);
const minuteList = computed(() => Array.from({ length: 60 }, (_, i) => i));
const secondList = computed(() => Array.from({ length: 60 }, (_, i) => i));

// 样式计算
const containerClass = computed(() => [
  'ale-datetime-picker',
  `ale-datetime-picker--${props.size}`,
  `ale-datetime-picker--${props.theme}`,
  { 'is-disabled': props.disabled }
]);

const dateInputWrapperClass = computed(() => [
  'ale-datetime-picker__input-wrapper',
  { 'is-focused': isDateFocused.value, 'is-active': visible.value }
]);

const timeInputWrapperClass = computed(() => [
  'ale-datetime-picker__input-wrapper',
  { 'is-focused': isTimeFocused.value, 'is-active': visible.value }
]);

const dateInputClass = computed(() => ['ale-datetime-picker__input']);
const timeInputClass = computed(() => ['ale-datetime-picker__input']);

const dropdownClass = computed(() => ['ale-datetime-picker__dropdown', { 'is-visible': visible.value }]);

const dropdownStyle = computed(() => ({
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`
}));

// 日期显示值
const dateDisplayValue = computed(() => {
  if (!selectedDate.value) return '';
  return dayjs(selectedDate.value).format('YYYY/MM/DD');
});

// 时间显示值
const timeDisplayValue = computed(() => {
  const parts = [formatNumber(selectedHour.value), formatNumber(selectedMinute.value)];
  if (props.showSeconds) {
    parts.push(formatNumber(selectedSecond.value));
  }
  return parts.join(':');
});

// 日期网格计算
const dateGrid = computed(() => {
  const grid: Array<{
    day: number;
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    disabled: boolean;
  }> = [];

  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  // 上个月的日期
  const prevMonth = new Date(currentYear.value, currentMonth.value, 0);
  const prevMonthDays = prevMonth.getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - 1, prevMonthDays - i);
    grid.push({
      day: prevMonthDays - i,
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: isSelected(date),
      disabled: isDateDisabled(date)
    });
  }

  // 当前月份的日期
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    grid.push({
      day: i,
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: isSelected(date),
      disabled: isDateDisabled(date)
    });
  }

  // 下个月的日期
  const remainingDays = 42 - grid.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i);
    grid.push({
      day: i,
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: isSelected(date),
      disabled: isDateDisabled(date)
    });
  }

  return grid;
});

// 工具函数
const formatNumber = (num: number): string => num.toString().padStart(2, '0');

const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
};

const isSelected = (date: Date): boolean => {
  if (!tempSelectedDate.value) return false;
  return date.getFullYear() === tempSelectedDate.value.getFullYear() &&
    date.getMonth() === tempSelectedDate.value.getMonth() &&
    date.getDate() === tempSelectedDate.value.getDate();
};

const isDateDisabled = (date: Date): boolean => {
  if (props.disabledDate && props.disabledDate(date)) return true;
  if (props.minDate) {
    const min = typeof props.minDate === 'string' ? new Date(props.minDate) : props.minDate;
    if (date < min) return true;
  }
  if (props.maxDate) {
    const max = typeof props.maxDate === 'string' ? new Date(props.maxDate) : props.maxDate;
    if (date > max) return true;
  }
  return false;
};

const getDateClass = (dateInfo: { isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; disabled: boolean }) => [
  'ale-datetime-picker__date',
  {
    'is-other-month': !dateInfo.isCurrentMonth,
    'is-today': dateInfo.isToday,
    'is-selected': dateInfo.isSelected,
    'is-disabled': dateInfo.disabled
  }
];

const getTimeItemClass = (type: 'hour' | 'minute' | 'second', value: number) => {
  const selected = type === 'hour' ? tempSelectedHour.value : type === 'minute' ? tempSelectedMinute.value : tempSelectedSecond.value;
  return ['ale-datetime-picker__time-item', { 'is-selected': selected === value }];
};

// 更新下拉位置
const updateDropdownPosition = () => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const timeWidth = props.showSeconds ? 180 : 140;
  const dropdownWidth = props.showTime ? 320 + timeWidth : 280;
  const dropdownHeight = props.showTime ? 360 : 320;

  let top = rect.bottom + 8;
  let left = rect.left;

  if (top + dropdownHeight > viewportHeight) {
    top = rect.top - dropdownHeight - 8;
  }
  if (left + dropdownWidth > viewportWidth) {
    left = viewportWidth - dropdownWidth - 8;
  }
  if (left < 8) left = 8;

  dropdownPosition.value = { top, left };
};

// 初始化选中日期
const initializeDate = () => {
  if (props.modelValue) {
    const date = typeof props.modelValue === 'string' ? new Date(props.modelValue) : props.modelValue;
    if (!isNaN(date.getTime())) {
      selectedDate.value = date;
      currentYear.value = date.getFullYear();
      currentMonth.value = date.getMonth();
      selectedHour.value = date.getHours();
      selectedMinute.value = date.getMinutes();
      selectedSecond.value = date.getSeconds();
    }
  } else if (props.defaultValue) {
    selectedDate.value = props.defaultValue;
    currentYear.value = props.defaultValue.getFullYear();
    currentMonth.value = props.defaultValue.getMonth();
    selectedHour.value = props.defaultValue.getHours();
    selectedMinute.value = props.defaultValue.getMinutes();
    selectedSecond.value = props.defaultValue.getSeconds();
  } else {
    // 没有值时，默认使用当前时间
    const now = new Date();
    selectedHour.value = now.getHours();
    selectedMinute.value = now.getMinutes();
    selectedSecond.value = now.getSeconds();
  }
};

// 缓存当前值
const cacheCurrentValue = () => {
  initialDate.value = selectedDate.value ? new Date(selectedDate.value) : null;
  initialHour.value = selectedHour.value;
  initialMinute.value = selectedMinute.value;
  initialSecond.value = selectedSecond.value;
};

// 恢复缓存值
const restoreCachedValue = () => {
  selectedDate.value = initialDate.value;
  selectedHour.value = initialHour.value;
  selectedMinute.value = initialMinute.value;
  selectedSecond.value = initialSecond.value;
  if (initialDate.value) {
    currentYear.value = initialDate.value.getFullYear();
    currentMonth.value = initialDate.value.getMonth();
  }
};

// 滚动到选中位置
const scrollToSelected = () => {
  nextTick(() => {
    const hourIndex = props.use12Hours ? Math.max(0, tempSelectedHour.value - 1) : tempSelectedHour.value;
    scrollToIndex('hour', hourIndex, false);
    scrollToIndex('minute', tempSelectedMinute.value, false);
    if (props.showSeconds) {
      scrollToIndex('second', tempSelectedSecond.value, false);
    }
  });
};

const scrollToIndex = (type: 'hour' | 'minute' | 'second', index: number, smooth: boolean) => {
  const column = type === 'hour' ? hourColumnRef.value : type === 'minute' ? minuteColumnRef.value : secondColumnRef.value;
  if (!column) return;
  
  column.style.scrollBehavior = smooth ? 'smooth' : 'auto';
  column.scrollTop = index * ITEM_HEIGHT;
};

// 时间滚轮吸附
const snapToNearest = (type: 'hour' | 'minute' | 'second') => {
  const column = type === 'hour' ? hourColumnRef.value : type === 'minute' ? minuteColumnRef.value : secondColumnRef.value;
  if (!column) return;

  const scrollTop = column.scrollTop;
  const nearestIndex = Math.round(scrollTop / ITEM_HEIGHT);
  const maxIndex = type === 'hour' ? (props.use12Hours ? 11 : 23) : 59;
  const clampedIndex = Math.max(0, Math.min(maxIndex, nearestIndex));

  if (type === 'hour') {
    tempSelectedHour.value = props.use12Hours ? clampedIndex + 1 : clampedIndex;
  } else if (type === 'minute') {
    tempSelectedMinute.value = clampedIndex;
  } else {
    tempSelectedSecond.value = clampedIndex;
  }

  scrollToIndex(type, clampedIndex, true);
};

// 事件处理
const handleDateInputClick = () => {
  if (props.disabled || props.readonly) return;
  visible.value = true;
  initializeDate();
  // 初始化临时值
  tempSelectedDate.value = selectedDate.value ? new Date(selectedDate.value) : null;
  tempSelectedHour.value = selectedHour.value;
  tempSelectedMinute.value = selectedMinute.value;
  tempSelectedSecond.value = selectedSecond.value;
  cacheCurrentValue();
  nextTick(updateDropdownPosition);
};

const handleTimeInputClick = () => {
  if (props.disabled || props.readonly) return;
  visible.value = true;
  initializeDate();
  // 初始化临时值
  tempSelectedDate.value = selectedDate.value ? new Date(selectedDate.value) : null;
  tempSelectedHour.value = selectedHour.value;
  tempSelectedMinute.value = selectedMinute.value;
  tempSelectedSecond.value = selectedSecond.value;
  cacheCurrentValue();
  nextTick(updateDropdownPosition);
};

const handleDateInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  
  if (value.length >= 8) {
    value = value.slice(0, 8);
    const year = parseInt(value.slice(0, 4));
    const month = parseInt(value.slice(4, 6)) - 1;
    const day = parseInt(value.slice(6, 8));
    
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      selectedDate.value = date;
      currentYear.value = year;
      currentMonth.value = month;
    }
  }
};

const handleTimeInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const value = input.value.replace(/\D/g, '');
  
  if (value.length >= 2) selectedHour.value = Math.min(23, parseInt(value.slice(0, 2)));
  if (value.length >= 4) selectedMinute.value = Math.min(59, parseInt(value.slice(2, 4)));
  if (props.showSeconds && value.length >= 6) selectedSecond.value = Math.min(59, parseInt(value.slice(4, 6)));
};

const handleDateFocus = (e: FocusEvent) => {
  isDateFocused.value = true;
  emit('focus', e);
};

const handleDateBlur = (e: FocusEvent) => {
  isDateFocused.value = false;
  emit('blur', e);
};

const handleTimeFocus = (e: FocusEvent) => {
  isTimeFocused.value = true;
  emit('focus', e);
};

const handleTimeBlur = (e: FocusEvent) => {
  isTimeFocused.value = false;
  emit('blur', e);
};

const handleDateEnter = () => {
  visible.value = false;
};

const handleTimeEnter = () => {
  visible.value = false;
};

const handlePrevYear = () => currentYear.value--;
const handleNextYear = () => currentYear.value++;

const handlePrevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const handleNextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const handleDateSelect = (dateInfo: { date: Date; disabled: boolean }) => {
  if (dateInfo.disabled) return;
  tempSelectedDate.value = dateInfo.date;
  currentYear.value = dateInfo.date.getFullYear();
  currentMonth.value = dateInfo.date.getMonth();
};

const handleTimeScroll = (type: 'hour' | 'minute' | 'second') => {
  if (scrollTimeouts.value[type]) clearTimeout(scrollTimeouts.value[type]);
  scrollTimeouts.value[type] = window.setTimeout(() => snapToNearest(type), 150);
};

const selectHour = (hour: number) => {
  tempSelectedHour.value = hour;
  scrollToIndex('hour', props.use12Hours ? hour - 1 : hour, true);
};

const selectMinute = (minute: number) => {
  tempSelectedMinute.value = minute;
  scrollToIndex('minute', minute, true);
};

const selectSecond = (second: number) => {
  tempSelectedSecond.value = second;
  scrollToIndex('second', second, true);
};

const handleNow = () => {
  const now = new Date();
  tempSelectedDate.value = now;
  currentYear.value = now.getFullYear();
  currentMonth.value = now.getMonth();
  tempSelectedHour.value = now.getHours();
  tempSelectedMinute.value = now.getMinutes();
  tempSelectedSecond.value = now.getSeconds();
  scrollToSelected();
};

const handleOk = () => {
  if (!tempSelectedDate.value) {
    tempSelectedDate.value = new Date();
  }

  // 同步临时值到正式值
  selectedDate.value = tempSelectedDate.value ? new Date(tempSelectedDate.value) : null;
  selectedHour.value = tempSelectedHour.value;
  selectedMinute.value = tempSelectedMinute.value;
  selectedSecond.value = tempSelectedSecond.value;

  const finalDate = new Date(
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth(),
    selectedDate.value.getDate(),
    selectedHour.value,
    selectedMinute.value,
    selectedSecond.value
  );

  const value = dayjs(finalDate).format(props.valueFormat);
  emit('update:modelValue', value);
  emit('change', finalDate);
  emit('ok', finalDate);
  visible.value = false;
};

const handleCancel = () => {
  restoreCachedValue();
  emit('cancel');
  visible.value = false;
};

const handleClear = () => {
  selectedDate.value = null;
  selectedHour.value = 0;
  selectedMinute.value = 0;
  selectedSecond.value = 0;
  emit('update:modelValue', '');
  emit('clear');
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!containerRef.value?.contains(target) && !dropdownRef.value?.contains(target)) {
    visible.value = false;
  }
};

// 监听器
watch(() => props.modelValue, () => initializeDate(), { immediate: true });

watch(visible, (val) => {
  if (val) {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition, true);
    scrollToSelected();
  } else {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', updateDropdownPosition);
    window.removeEventListener('scroll', updateDropdownPosition, true);
  }
});

// 生命周期
onMounted(() => initializeDate());

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  window.removeEventListener('scroll', updateDropdownPosition, true);
  Object.values(scrollTimeouts.value).forEach(t => t && clearTimeout(t));
});

// 暴露方法
const focus = () => {
  if (dateInputRef.value) {
    dateInputRef.value.focus();
  } else if (timeInputRef.value) {
    timeInputRef.value.focus();
  }
};
const blur = () => {
  dateInputRef.value?.blur();
  timeInputRef.value?.blur();
};
const clear = () => handleClear();
const open = () => {
  if (props.disabled || props.readonly) return;
  visible.value = true;
  // 初始化临时值
  tempSelectedDate.value = selectedDate.value ? new Date(selectedDate.value) : null;
  tempSelectedHour.value = selectedHour.value;
  tempSelectedMinute.value = selectedMinute.value;
  tempSelectedSecond.value = selectedSecond.value;
  cacheCurrentValue();
  nextTick(updateDropdownPosition);
};
const close = () => visible.value = false;

defineExpose<DateTimePickerExpose>({ focus, blur, clear, open, close });
</script>
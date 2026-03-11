<template>
  <div :class="datePickerClass">
    <!-- 范围模式：双输入框 -->
    <template v-if="isRangeMode">
      <div class="ale-date-picker__range-inputs">
        <DateInput
          ref="startInputRef"
          :model-value="startDisplayValue"
          :placeholder="startPlaceholder"
          :disabled="disabled"
          :readonly="readonly"
          :clearable="false"
          :size="size"
          :theme="theme"
          :focused="isStartFocused"
          :active="visible"
          @click="handleInputClick"
          @focus="handleStartFocus"
          @blur="handleStartBlur"
        />
        <span class="ale-date-picker__separator">{{ rangeSeparator }}</span>
        <DateInput
          ref="endInputRef"
          :model-value="endDisplayValue"
          :placeholder="endPlaceholder"
          :disabled="disabled"
          :readonly="readonly"
          :clearable="false"
          :size="size"
          :theme="theme"
          :focused="isEndFocused"
          :active="visible"
          @click="handleInputClick"
          @focus="handleEndFocus"
          @blur="handleEndBlur"
        />
        <!-- 清空按钮 -->
        <span
          v-if="clearable && (startDate || endDate) && !disabled"
          class="ale-date-picker__range-clear"
          @click.stop="handleClear"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </span>
      </div>
    </template>

    <!-- 单日期模式 -->
    <template v-else>
      <DateInput
        ref="inputRef"
        :model-value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :size="size"
        :theme="theme"
        :focused="isFocused"
        :active="visible"
        @click="handleInputClick"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
      />
    </template>

    <Teleport to="body">
      <Transition name="ale-date-picker-fade">
        <div
          v-if="visible"
          ref="dropdownRef"
          :class="dropdownClass"
          :style="dropdownStyle"
        >
          <!-- 范围选择面板 -->
          <DateRangePanel
            v-if="isRangeMode"
            :start-date="startDate"
            :end-date="endDate"
            :min-date="minDateObj"
            :max-date="maxDateObj"
            :disabled-date="disabledDate"
            :show-time="showTimePicker"
            :start-hour="startHour"
            :start-minute="startMinute"
            :start-second="startSecond"
            :end-hour="endHour"
            :end-minute="endMinute"
            :end-second="endSecond"
            @update:start-date="handleStartDateUpdate"
            @update:end-date="handleEndDateUpdate"
            @update:start-hour="(v) => startHour = v"
            @update:start-minute="(v) => startMinute = v"
            @update:start-second="(v) => startSecond = v"
            @update:end-hour="(v) => endHour = v"
            @update:end-minute="(v) => endMinute = v"
            @update:end-second="(v) => endSecond = v"
            @confirm="handleRangeConfirm"
            @cancel="handleRangeCancel"
          />

          <!-- 单日期选择面板 -->
          <template v-else>
            <!-- 快捷选项 -->
            <div v-if="shortcuts && shortcuts.length > 0" class="ale-date-picker__shortcuts">
              <button
                v-for="(shortcut, index) in shortcuts"
                :key="index"
                class="ale-date-picker__shortcut"
                @click="handleShortcutClick(shortcut)"
              >
                {{ shortcut.text }}
              </button>
            </div>

            <!-- 面板头部 -->
            <div class="ale-date-picker__header">
              <button
                v-if="currentView === 'date'"
                class="ale-date-picker__header-btn"
                @click="handlePrevYear"
                aria-label="上一年"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="11 17 6 12 11 7" />
                  <polyline points="18 17 13 12 18 7" />
                </svg>
              </button>
              <button
                v-if="currentView === 'date'"
                class="ale-date-picker__header-btn"
                @click="handlePrevMonth"
                aria-label="上个月"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div class="ale-date-picker__header-title">
                <span v-if="currentView === 'year'" @click="currentView = 'year'">
                  {{ yearRange }}
                </span>
                <template v-else>
                  <span @click="handleYearClick">{{ currentYear }}年</span>
                  <span v-if="currentView === 'date'" @click="handleMonthClick">{{ currentMonth + 1 }}月</span>
                </template>
              </div>
              <button
                v-if="currentView === 'date'"
                class="ale-date-picker__header-btn"
                @click="handleNextMonth"
                aria-label="下个月"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <button
                v-if="currentView === 'date'"
                class="ale-date-picker__header-btn"
                @click="handleNextYear"
                aria-label="下一年"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </button>
            </div>

            <!-- 面板内容 -->
            <div class="ale-date-picker__body">
              <DatePanel
                v-if="currentView === 'date'"
                :current-year="currentYear"
                :current-month="currentMonth"
                :selected-date="selectedDate"
                :min-date="minDateObj"
                :max-date="maxDateObj"
                :disabled-date="disabledDate"
                @select="handleDateSelect"
              />
              <MonthPanel
                v-else-if="currentView === 'month'"
                :current-year="currentYear"
                :selected-month="currentMonth"
                :min-date="minDateObj"
                :max-date="maxDateObj"
                @select="handleMonthSelect"
              />
              <YearPanel
                v-else
                :current-year="currentYear"
                :selected-year="currentYear"
                :min-date="minDateObj"
                :max-date="maxDateObj"
                @select="handleYearSelect"
              />
            </div>

            <!-- 时间选择（datetime 模式） -->
            <div v-if="showTimePicker && currentView === 'date'" class="ale-date-picker__time-panel">
              <TimePanel
                :model-hour="selectedHour"
                :model-minute="selectedMinute"
                :model-second="selectedSecond"
                @update:model-hour="(v) => selectedHour = v"
                @update:model-minute="(v) => selectedMinute = v"
                @update:model-second="(v) => selectedSecond = v"
              />
            </div>

            <!-- 底部操作 -->
            <div class="ale-date-picker__footer">
              <button
                class="ale-date-picker__btn ale-date-picker__btn--text"
                @click="handleToday"
              >
                今天
              </button>
              <button
                v-if="showTimePicker"
                class="ale-date-picker__btn ale-date-picker__btn--primary"
                @click="handleDateTimeConfirm"
              >
                确定
              </button>
            </div>
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import dayjs from 'dayjs';
import type { DatePickerProps, DatePickerEmits, DatePickerExpose, DatePickerView, DateRangeValue } from './types';
import DateInput from './components/DateInput.vue';
import DatePanel from './components/DatePanel.vue';
import DateRangePanel from './components/DateRangePanel.vue';
import TimePanel from './components/TimePanel.vue';
import MonthPanel from './components/MonthPanel.vue';
import YearPanel from './components/YearPanel.vue';
import './DatePicker.css';

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  placeholder: '请选择日期',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'medium',
  theme: 'primary',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  minDate: undefined,
  maxDate: undefined,
  disabledDate: undefined,
  shortcuts: undefined,
  customClass: '',
  type: 'date',
  rangeSeparator: '至',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  defaultTime: null
});

const emit = defineEmits<DatePickerEmits>();

// DOM 引用
const inputRef = ref();
const startInputRef = ref();
const endInputRef = ref();
const dropdownRef = ref<HTMLDivElement>();

// 状态
const visible = ref(false);
const isFocused = ref(false);
const isStartFocused = ref(false);
const isEndFocused = ref(false);
const currentView = ref<DatePickerView>('date');
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());
const selectedDate = ref<Date | null>(null);

// 范围选择状态
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const startHour = ref(0);
const startMinute = ref(0);
const startSecond = ref(0);
const endHour = ref(0);
const endMinute = ref(0);
const endSecond = ref(0);

// 单日期时间选择
const selectedHour = ref(0);
const selectedMinute = ref(0);
const selectedSecond = ref(0);

// 下拉位置
const dropdownPosition = ref({ top: 0, left: 0 });

// 计算属性
const isRangeMode = computed(() => 
  ['daterange', 'datetimerange'].includes(props.type)
);

const showTimePicker = computed(() => 
  ['datetime', 'datetimerange'].includes(props.type)
);

const datePickerClass = computed(() => [
  'ale-date-picker',
  `ale-date-picker--${props.size}`,
  `ale-date-picker--${props.theme}`,
  {
    'is-disabled': props.disabled,
    'is-focused': isFocused.value || isStartFocused.value || isEndFocused.value,
    'is-active': visible.value,
    'is-range': isRangeMode.value,
    [props.customClass]: props.customClass
  }
]);

const dropdownClass = computed(() => [
  'ale-date-picker__dropdown',
  {
    'is-visible': visible.value,
    'is-range': isRangeMode.value,
    'has-time': showTimePicker.value
  }
]);

const dropdownStyle = computed(() => ({
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`
}));

// 单日期显示值
const displayValue = computed(() => {
  if (!selectedDate.value) return '';
  
  if (showTimePicker.value) {
    return dayjs(selectedDate.value)
      .hour(selectedHour.value)
      .minute(selectedMinute.value)
      .second(selectedSecond.value)
      .format(props.format);
  }
  
  return dayjs(selectedDate.value).format(props.format);
});

// 范围开始日期显示值
const startDisplayValue = computed(() => {
  if (!startDate.value) return '';
  
  if (showTimePicker.value) {
    return dayjs(startDate.value)
      .hour(startHour.value)
      .minute(startMinute.value)
      .second(startSecond.value)
      .format(props.format);
  }
  
  return dayjs(startDate.value).format(props.format);
});

// 范围结束日期显示值
const endDisplayValue = computed(() => {
  if (!endDate.value) return '';
  
  if (showTimePicker.value) {
    return dayjs(endDate.value)
      .hour(endHour.value)
      .minute(endMinute.value)
      .second(endSecond.value)
      .format(props.format);
  }
  
  return dayjs(endDate.value).format(props.format);
});

const yearRange = computed(() => {
  const start = Math.floor(currentYear.value / 10) * 10;
  return `${start}年 - ${start + 9}年`;
});

const minDateObj = computed(() => {
  if (!props.minDate) return undefined;
  return typeof props.minDate === 'string' ? new Date(props.minDate) : props.minDate;
});

const maxDateObj = computed(() => {
  if (!props.maxDate) return undefined;
  return typeof props.maxDate === 'string' ? new Date(props.maxDate) : props.maxDate;
});

// 更新下拉位置
const updateDropdownPosition = () => {
  const inputEl = isRangeMode.value 
    ? (startInputRef.value?.$el || startInputRef.value)
    : (inputRef.value?.$el || inputRef.value);
  
  if (!inputEl) return;
  
  const rect = inputEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  // 根据类型计算下拉面板宽度
  const dropdownWidth = isRangeMode.value 
    ? (showTimePicker.value ? 620 : 560) 
    : 280;
  const dropdownHeight = isRangeMode.value 
    ? (showTimePicker.value ? 420 : 320) 
    : (showTimePicker.value ? 380 : 320);

  let top = rect.bottom + 8;
  let left = rect.left;

  if (top + dropdownHeight > viewportHeight) {
    top = rect.top - dropdownHeight - 8;
  }

  if (left + dropdownWidth > viewportWidth) {
    left = viewportWidth - dropdownWidth - 8;
  }

  if (left < 8) {
    left = 8;
  }

  dropdownPosition.value = { top, left };
};

// 初始化选中日期
const initializeDate = () => {
  const modelVal = props.modelValue;
  
  if (isRangeMode.value) {
    // 范围模式初始化
    const rangeValue = modelVal as DateRangeValue;
    if (rangeValue && Array.isArray(rangeValue)) {
      const [start, end] = rangeValue;
      if (start) {
        const startDt = typeof start === 'string' ? new Date(start) : start;
        if (!isNaN(startDt.getTime())) {
          startDate.value = startDt;
          startHour.value = startDt.getHours();
          startMinute.value = startDt.getMinutes();
          startSecond.value = startDt.getSeconds();
        }
      }
      if (end) {
        const endDt = typeof end === 'string' ? new Date(end) : end;
        if (!isNaN(endDt.getTime())) {
          endDate.value = endDt;
          endHour.value = endDt.getHours();
          endMinute.value = endDt.getMinutes();
          endSecond.value = endDt.getSeconds();
        }
      }
    }
  } else {
    // 单日期模式初始化
    if (modelVal) {
      const date = typeof modelVal === 'string' ? new Date(modelVal as string) : (modelVal as Date);
      if (!isNaN(date.getTime())) {
        selectedDate.value = date;
        currentYear.value = date.getFullYear();
        currentMonth.value = date.getMonth();
        selectedHour.value = date.getHours();
        selectedMinute.value = date.getMinutes();
        selectedSecond.value = date.getSeconds();
      }
    }
  }
};

// 事件处理
const handleInputClick = () => {
  if (props.disabled || props.readonly) return;

  if (visible.value) {
    visible.value = false;
  } else {
    visible.value = true;
    initializeDate();
    nextTick(() => {
      updateDropdownPosition();
    });
  }
};

const handleDateSelect = (date: Date) => {
  selectedDate.value = date;
  currentYear.value = date.getFullYear();
  currentMonth.value = date.getMonth();
  
  // datetime 模式不立即关闭
  if (!showTimePicker.value) {
    emitValue(date);
    visible.value = false;
  }
};

const handleMonthSelect = (month: number) => {
  currentMonth.value = month;
  currentView.value = 'date';
  emit('month-change', month);
};

const handleYearSelect = (year: number) => {
  currentYear.value = year;
  currentView.value = 'month';
  emit('year-change', year);
};

const handleYearClick = () => {
  currentView.value = 'year';
  emit('panel-change', 'year');
};

const handleMonthClick = () => {
  currentView.value = 'month';
  emit('panel-change', 'month');
};

const handlePrevYear = () => {
  currentYear.value -= 1;
};

const handleNextYear = () => {
  currentYear.value += 1;
};

const handlePrevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

const handleNextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};

const handleToday = () => {
  const today = new Date();
  selectedDate.value = today;
  currentYear.value = today.getFullYear();
  currentMonth.value = today.getMonth();
  selectedHour.value = today.getHours();
  selectedMinute.value = today.getMinutes();
  selectedSecond.value = today.getSeconds();
  
  if (showTimePicker.value) {
    // datetime 模式不关闭，让用户确认
  } else {
    emitValue(today);
    visible.value = false;
  }
};

const handleShortcutClick = (shortcut: { text: string; value: Date | (() => Date) }) => {
  const date = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value;
  selectedDate.value = date;
  currentYear.value = date.getFullYear();
  currentMonth.value = date.getMonth();
  
  emitValue(date);
  visible.value = false;
};

// 范围选择事件
const handleStartDateUpdate = (date: Date | null) => {
  startDate.value = date;
};

const handleEndDateUpdate = (date: Date | null) => {
  endDate.value = date;
};

const handleRangeConfirm = () => {
  if (!startDate.value || !endDate.value) return;
  
  emitRangeValue();
  visible.value = false;
};

const handleRangeCancel = () => {
  visible.value = false;
};

// datetime 确认
const handleDateTimeConfirm = () => {
  if (!selectedDate.value) {
    selectedDate.value = new Date();
  }
  
  const date = new Date(
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth(),
    selectedDate.value.getDate(),
    selectedHour.value,
    selectedMinute.value,
    selectedSecond.value
  );
  
  emitValue(date);
  visible.value = false;
};

const handleClear = () => {
  if (isRangeMode.value) {
    startDate.value = null;
    endDate.value = null;
    startHour.value = 0;
    startMinute.value = 0;
    startSecond.value = 0;
    endHour.value = 0;
    endMinute.value = 0;
    endSecond.value = 0;
    emit('update:modelValue', null);
  } else {
    selectedDate.value = null;
    emit('update:modelValue', '');
  }
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

const handleStartFocus = (event: FocusEvent) => {
  isStartFocused.value = true;
  emit('focus', event);
};

const handleStartBlur = (event: FocusEvent) => {
  isStartFocused.value = false;
  emit('blur', event);
};

const handleEndFocus = (event: FocusEvent) => {
  isEndFocused.value = true;
  emit('focus', event);
};

const handleEndBlur = (event: FocusEvent) => {
  isEndFocused.value = false;
  emit('blur', event);
};

const emitValue = (date: Date) => {
  let finalDate = date;
  
  if (showTimePicker.value) {
    finalDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      selectedHour.value,
      selectedMinute.value,
      selectedSecond.value
    );
  }
  
  const value = dayjs(finalDate).format(props.valueFormat);
  emit('update:modelValue', value);
  emit('change', finalDate);
};

const emitRangeValue = () => {
  if (!startDate.value || !endDate.value) return;
  
  const finalStartDate = new Date(
    startDate.value.getFullYear(),
    startDate.value.getMonth(),
    startDate.value.getDate(),
    startHour.value,
    startMinute.value,
    startSecond.value
  );
  
  const finalEndDate = new Date(
    endDate.value.getFullYear(),
    endDate.value.getMonth(),
    endDate.value.getDate(),
    endHour.value,
    endMinute.value,
    endSecond.value
  );
  
  const startStr = dayjs(finalStartDate).format(props.valueFormat);
  const endStr = dayjs(finalEndDate).format(props.valueFormat);
  
  emit('update:modelValue', [startStr, endStr]);
  emit('change', [finalStartDate, finalEndDate]);
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  
  if (isRangeMode.value) {
    const startInputEl = startInputRef.value?.$el || startInputRef.value;
    const endInputEl = endInputRef.value?.$el || endInputRef.value;
    const dropdownEl = dropdownRef.value;

    if (
      startInputEl && !startInputEl.contains(target) &&
      endInputEl && !endInputEl.contains(target) &&
      dropdownEl && !dropdownEl.contains(target)
    ) {
      visible.value = false;
    }
  } else {
    const inputEl = inputRef.value?.$el || inputRef.value;
    const dropdownEl = dropdownRef.value;

    if (
      inputEl && !inputEl.contains(target) &&
      dropdownEl && !dropdownEl.contains(target)
    ) {
      visible.value = false;
    }
  }
};

// 监听器
watch(() => props.modelValue, () => {
  initializeDate();
}, { immediate: true });

watch(visible, (val) => {
  if (val) {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition, true);
  } else {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', updateDropdownPosition);
    window.removeEventListener('scroll', updateDropdownPosition, true);
    currentView.value = 'date';
  }
});

// 生命周期
onMounted(() => {
  initializeDate();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  window.removeEventListener('scroll', updateDropdownPosition, true);
});

// 暴露方法
const focus = () => {
  if (isRangeMode.value) {
    startInputRef.value?.focus();
  } else {
    inputRef.value?.focus();
  }
};

const blur = () => {
  if (isRangeMode.value) {
    startInputRef.value?.blur();
    endInputRef.value?.blur();
  } else {
    inputRef.value?.blur();
  }
};

const clear = () => {
  handleClear();
};

const open = () => {
  if (props.disabled || props.readonly) return;
  visible.value = true;
  nextTick(() => {
    updateDropdownPosition();
  });
};

const close = () => {
  visible.value = false;
};

defineExpose<DatePickerExpose>({
  focus,
  blur,
  clear,
  open,
  close
});
</script>

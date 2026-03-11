<template>
  <div class="ale-date-picker__panel">
    <!-- 星期头部 -->
    <div class="ale-date-picker__week-header">
      <div
        v-for="day in weekDays"
        :key="day"
        class="ale-date-picker__week-day"
      >
        {{ day }}
      </div>
    </div>

    <!-- 日期网格 -->
    <div class="ale-date-picker__grid">
      <div
        v-for="(cell, index) in calendarDays"
        :key="index"
        :class="getCellClass(cell)"
        @click="handleCellClick(cell)"
        @mouseenter="handleCellHover(cell)"
        @mouseleave="handleCellLeave"
        @keydown.enter="handleCellClick(cell)"
      >
        {{ cell.day }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DatePanelProps, DatePanelEmits } from '../types';

const props = withDefaults(defineProps<DatePanelProps>(), {
  selectedDate: null,
  minDate: undefined,
  maxDate: undefined,
  disabledDate: undefined,
  rangeStart: null,
  rangeEnd: null,
  hoverDate: null,
  isRangeMode: false,
  selectingType: 'start'
});

const emit = defineEmits<DatePanelEmits>();

// 星期头部
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

// 计算日历数据
const calendarDays = computed(() => {
  const year = props.currentYear;
  const month = props.currentMonth;
  const days: Array<{
    day: number;
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isInRange: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isRangeHover: boolean;
    isHoverStart: boolean;
    isHoverEnd: boolean;
  }> = [];

  // 当月第一天
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  // 当月最后一天
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // 上月最后几天
  const prevMonth = new Date(year, month, 0);
  const daysInPrevMonth = prevMonth.getDate();

  // 上月日期
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    days.push({
      day,
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: isDateDisabled(date),
      isInRange: isInDateRange(date),
      isRangeStart: isRangeStartDate(date),
      isRangeEnd: isRangeEndDate(date),
      isRangeHover: isHoverRange(date),
      isHoverStart: isHoverStartDate(date),
      isHoverEnd: isHoverEndDate(date)
    });
  }

  // 当月日期
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = isSameDay(date, today);
    const isSelected = props.selectedDate && isSameDay(date, props.selectedDate);
    
    days.push({
      day,
      date,
      isCurrentMonth: true,
      isToday,
      isSelected: isSelected || false,
      isDisabled: isDateDisabled(date),
      isInRange: isInDateRange(date),
      isRangeStart: isRangeStartDate(date),
      isRangeEnd: isRangeEndDate(date),
      isRangeHover: isHoverRange(date),
      isHoverStart: isHoverStartDate(date),
      isHoverEnd: isHoverEndDate(date)
    });
  }

  // 下月日期（补全6行）
  const totalCells = 42;
  const remaining = totalCells - days.length;
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      day,
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: isDateDisabled(date),
      isInRange: isInDateRange(date),
      isRangeStart: isRangeStartDate(date),
      isRangeEnd: isRangeEndDate(date),
      isRangeHover: isHoverRange(date),
      isHoverStart: isHoverStartDate(date),
      isHoverEnd: isHoverEndDate(date)
    });
  }

  return days;
});

// 判断是否同一天
const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// 比较日期（不含时间）
const compareDates = (d1: Date, d2: Date): number => {
  const time1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const time2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return time1 - time2;
};

// 判断日期是否禁用
const isDateDisabled = (date: Date): boolean => {
  if (props.disabledDate && props.disabledDate(date)) {
    return true;
  }

  if (props.minDate && compareDates(date, props.minDate) < 0) {
    return true;
  }

  if (props.maxDate && compareDates(date, props.maxDate) > 0) {
    return true;
  }

  return false;
};

// 判断日期是否在范围内
const isInDateRange = (date: Date): boolean => {
  if (!props.isRangeMode) return false;
  if (!props.rangeStart || !props.rangeEnd) return false;
  
  const cmp = compareDates(date, props.rangeStart);
  const cmp2 = compareDates(date, props.rangeEnd);
  
  return cmp > 0 && cmp2 < 0;
};

// 判断是否为范围开始日期
const isRangeStartDate = (date: Date): boolean => {
  if (!props.isRangeMode) return false;
  if (!props.rangeStart) return false;
  return isSameDay(date, props.rangeStart);
};

// 判断是否为范围结束日期
const isRangeEndDate = (date: Date): boolean => {
  if (!props.isRangeMode) return false;
  if (!props.rangeEnd) return false;
  return isSameDay(date, props.rangeEnd);
};

// 判断是否在悬浮范围内（预览效果）
const isHoverRange = (date: Date): boolean => {
  if (!props.isRangeMode) return false;
  if (!props.hoverDate || !props.rangeStart) return false;
  if (props.rangeEnd) return false; // 已选择结束日期则不显示悬浮范围
  
  // 只有在选择结束日期阶段才显示悬浮预览
  if (props.selectingType !== 'end') return false;
  
  // 判断日期是否在开始和悬浮日期之间
  const minDate = compareDates(props.rangeStart, props.hoverDate) < 0 ? props.rangeStart : props.hoverDate;
  const maxDate = compareDates(props.rangeStart, props.hoverDate) > 0 ? props.rangeStart : props.hoverDate;
  
  const cmpMin = compareDates(date, minDate);
  const cmpMax = compareDates(date, maxDate);
  
  return cmpMin > 0 && cmpMax < 0;
};

// 判断是否为悬浮范围的开始日期（预览效果）
const isHoverStartDate = (date: Date): boolean => {
  if (!props.isRangeMode) return false;
  if (!props.hoverDate || !props.rangeStart) return false;
  if (props.rangeEnd) return false;
  if (props.selectingType !== 'end') return false;
  
  // 如果悬浮日期早于开始日期，悬浮日期就是预览的开始
  if (compareDates(props.hoverDate, props.rangeStart) < 0) {
    return isSameDay(date, props.hoverDate);
  }
  return false;
};

// 判断是否为悬浮范围的结束日期（预览效果）
const isHoverEndDate = (date: Date): boolean => {
  if (!props.isRangeMode) return false;
  if (!props.hoverDate || !props.rangeStart) return false;
  if (props.rangeEnd) return false;
  if (props.selectingType !== 'end') return false;
  
  // 如果悬浮日期晚于开始日期，悬浮日期就是预览的结束
  if (compareDates(props.hoverDate, props.rangeStart) > 0) {
    return isSameDay(date, props.hoverDate);
  }
  return false;
};

// 获取单元格样式类
const getCellClass = (cell: {
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isRangeHover: boolean;
  isHoverStart: boolean;
  isHoverEnd: boolean;
}) => {
  return [
    'ale-date-picker__cell',
    {
      'is-other-month': !cell.isCurrentMonth,
      'is-today': cell.isToday && !cell.isRangeStart && !cell.isRangeEnd && !cell.isHoverStart && !cell.isHoverEnd,
      'is-selected': cell.isSelected || cell.isRangeStart || cell.isRangeEnd,
      'is-disabled': cell.isDisabled,
      'is-in-range': cell.isInRange,
      'is-range-start': cell.isRangeStart,
      'is-range-end': cell.isRangeEnd,
      'is-range-hover': cell.isRangeHover,
      'is-hover-start': cell.isHoverStart,
      'is-hover-end': cell.isHoverEnd
    }
  ];
};

// 点击日期单元格
const handleCellClick = (cell: { date: Date; isDisabled: boolean }) => {
  if (cell.isDisabled) return;
  emit('select', cell.date);
};

// 鼠标悬浮
const handleCellHover = (cell: { date: Date }) => {
  if (props.isRangeMode) {
    emit('hover', cell.date);
  }
};

// 鼠标离开
const handleCellLeave = () => {
  if (props.isRangeMode) {
    emit('hover', null);
  }
};
</script>

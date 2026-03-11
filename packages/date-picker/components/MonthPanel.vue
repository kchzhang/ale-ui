<template>
  <div class="ale-date-picker__month-panel">
    <div class="ale-date-picker__month-grid">
      <div
        v-for="(month, index) in months"
        :key="index"
        :class="getMonthClass(index)"
        @click="handleMonthClick(index)"
        @keydown.enter="handleMonthClick(index)"
      >
        {{ month }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MonthPanelProps, MonthPanelEmits } from '../types';

const props = defineProps<MonthPanelProps>();
const emit = defineEmits<MonthPanelEmits>();

// 月份名称
const months = [
  '一月', '二月', '三月', '四月',
  '五月', '六月', '七月', '八月',
  '九月', '十月', '十一月', '十二月'
];

// 当前月份
const currentMonth = new Date().getMonth();

// 判断月份是否禁用
const isMonthDisabled = (month: number): boolean => {
  if (props.minDate || props.maxDate) {
    const minYear = props.minDate ? props.minDate.getFullYear() : 0;
    const maxYear = props.maxDate ? props.maxDate.getFullYear() : 9999;
    const minMonth = props.minDate ? props.minDate.getMonth() : 0;
    const maxMonth = props.maxDate ? props.maxDate.getMonth() : 11;

    if (props.currentYear < minYear || props.currentYear > maxYear) {
      return true;
    }

    if (props.currentYear === minYear && month < minMonth) {
      return true;
    }

    if (props.currentYear === maxYear && month > maxMonth) {
      return true;
    }
  }

  return false;
};

// 获取月份样式类
const getMonthClass = (month: number) => {
  const isCurrent = props.currentYear === new Date().getFullYear() && month === currentMonth;
  const isSelected = month === props.selectedMonth;
  const isDisabled = isMonthDisabled(month);

  return [
    'ale-date-picker__month-cell',
    {
      'is-current': isCurrent,
      'is-selected': isSelected,
      'is-disabled': isDisabled
    }
  ];
};

// 点击月份
const handleMonthClick = (month: number) => {
  if (isMonthDisabled(month)) return;
  emit('select', month);
};
</script>

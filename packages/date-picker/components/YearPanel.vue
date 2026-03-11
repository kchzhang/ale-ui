<template>
  <div class="ale-date-picker__year-panel">
    <div class="ale-date-picker__year-grid">
      <div
        v-for="year in years"
        :key="year"
        :class="getYearClass(year)"
        @click="handleYearClick(year)"
        @keydown.enter="handleYearClick(year)"
      >
        {{ year }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { YearPanelProps, YearPanelEmits } from '../types';

const props = defineProps<YearPanelProps>();
const emit = defineEmits<YearPanelEmits>();

// 当前年份
const currentYear = new Date().getFullYear();

// 计算年份列表（当前年份前后各10年）
const years = computed(() => {
  const start = Math.floor(props.currentYear / 10) * 10 - 1;
  const end = start + 11;
  const yearList: number[] = [];

  for (let year = start; year <= end; year++) {
    yearList.push(year);
  }

  return yearList;
});

// 判断年份是否禁用
const isYearDisabled = (year: number): boolean => {
  if (props.minDate && year < props.minDate.getFullYear()) {
    return true;
  }

  if (props.maxDate && year > props.maxDate.getFullYear()) {
    return true;
  }

  return false;
};

// 获取年份样式类
const getYearClass = (year: number) => {
  const isCurrent = year === currentYear;
  const isSelected = year === props.selectedYear;
  const isDisabled = isYearDisabled(year);

  return [
    'ale-date-picker__year-cell',
    {
      'is-current': isCurrent,
      'is-selected': isSelected,
      'is-disabled': isDisabled
    }
  ];
};

// 点击年份
const handleYearClick = (year: number) => {
  if (isYearDisabled(year)) return;
  emit('select', year);
};
</script>

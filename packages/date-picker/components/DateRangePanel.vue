<template>
  <div class="ale-date-picker__range-panel">
    <!-- 快捷选项侧边栏 -->
    <div class="ale-date-picker__sidebar">
      <button
        v-for="(shortcut, index) in rangeShortcuts"
        :key="index"
        :class="['ale-date-picker__sidebar-item', { 'is-active': isShortcutActive(shortcut) }]"
        @click="handleShortcutClick(shortcut)"
      >
        {{ shortcut.text }}
      </button>
    </div>

    <!-- 双日历面板区域 -->
    <div class="ale-date-picker__panels-wrapper">
      <!-- 选择提示 -->
      <div class="ale-date-picker__range-hint">
        {{ rangeHint }}
      </div>

      <!-- 双日历面板 -->
      <div class="ale-date-picker__panels">
        <!-- 左侧面板（开始日期） -->
        <div class="ale-date-picker__panel-group">
          <div class="ale-date-picker__header">
            <button
              class="ale-date-picker__header-btn"
              @click="handleStartPrevYear"
              aria-label="上一年"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            </button>
            <button
              class="ale-date-picker__header-btn"
              @click="handleStartPrevMonth"
              aria-label="上个月"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div class="ale-date-picker__header-title">
              <span @click="handleStartYearClick">{{ startYear }}年</span>
              <span>{{ startMonth + 1 }}月</span>
            </div>
            <button
              class="ale-date-picker__header-btn"
              :disabled="isRightPanelAdjacent"
              @click="handleStartNextMonth"
              aria-label="下个月"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button
              class="ale-date-picker__header-btn"
              :disabled="isRightPanelAdjacent"
              @click="handleStartNextYear"
              aria-label="下一年"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>
          </div>
          <DatePanel
            :current-year="startYear"
            :current-month="startMonth"
            :selected-date="null"
            :min-date="minDate"
            :max-date="maxDate"
            :disabled-date="disabledDate"
            :range-start="startDate"
            :range-end="endDate"
            :hover-date="hoverDate"
            :is-range-mode="true"
            :selecting-type="selecting"
            @select="handleDateSelect"
            @hover="handleHover"
          />
        </div>

        <!-- 右侧面板（结束日期） -->
        <div class="ale-date-picker__panel-group">
          <div class="ale-date-picker__header">
            <button
              class="ale-date-picker__header-btn"
              :disabled="isLeftPanelAdjacent"
              @click="handleEndPrevYear"
              aria-label="上一年"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            </button>
            <button
              class="ale-date-picker__header-btn"
              :disabled="isLeftPanelAdjacent"
              @click="handleEndPrevMonth"
              aria-label="上个月"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div class="ale-date-picker__header-title">
              <span @click="handleEndYearClick">{{ endYear }}年</span>
              <span>{{ endMonth + 1 }}月</span>
            </div>
            <button
              class="ale-date-picker__header-btn"
              @click="handleEndNextMonth"
              aria-label="下个月"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button
              class="ale-date-picker__header-btn"
              @click="handleEndNextYear"
              aria-label="下一年"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>
          </div>
          <DatePanel
            :current-year="endYear"
            :current-month="endMonth"
            :selected-date="null"
            :min-date="minDate"
            :max-date="maxDate"
            :disabled-date="disabledDate"
            :range-start="startDate"
            :range-end="endDate"
            :hover-date="hoverDate"
            :is-range-mode="true"
            :selecting-type="selecting"
            @select="handleDateSelect"
            @hover="handleHover"
          />
        </div>
      </div>

      <!-- 时间选择（datetimerange 模式） -->
      <div v-if="showTime" class="ale-date-picker__time-range">
        <div class="ale-date-picker__time-group">
          <span class="ale-date-picker__time-label">开始时间</span>
          <TimePanel
            :model-hour="startHour"
            :model-minute="startMinute"
            :model-second="startSecond"
            @update:model-hour="(v) => emit('update:startHour', v)"
            @update:model-minute="(v) => emit('update:startMinute', v)"
            @update:model-second="(v) => emit('update:startSecond', v)"
          />
        </div>
        <div class="ale-date-picker__time-group">
          <span class="ale-date-picker__time-label">结束时间</span>
          <TimePanel
            :model-hour="endHour"
            :model-minute="endMinute"
            :model-second="endSecond"
            @update:model-hour="(v) => emit('update:endHour', v)"
            @update:model-minute="(v) => emit('update:endMinute', v)"
            @update:model-second="(v) => emit('update:endSecond', v)"
          />
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="ale-date-picker__range-panel-footer">
        <button
          class="ale-date-picker__btn ale-date-picker__btn--text"
          @click="handleClear"
        >
          清空
        </button>
        <button
          class="ale-date-picker__btn ale-date-picker__btn--primary"
          :disabled="!canConfirm"
          @click="handleConfirm"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { DateRangePanelProps, DateRangePanelEmits, RangeShortcutItem } from '../types';
import DatePanel from './DatePanel.vue';
import TimePanel from './TimePanel.vue';

const props = withDefaults(defineProps<DateRangePanelProps>(), {
  startDate: null,
  endDate: null,
  minDate: undefined,
  maxDate: undefined,
  disabledDate: undefined,
  showTime: false,
  startHour: 0,
  startMinute: 0,
  startSecond: 0,
  endHour: 0,
  endMinute: 0,
  endSecond: 0
});

const emit = defineEmits<DateRangePanelEmits>();

// 范围快捷选项
const rangeShortcuts = ref<RangeShortcutItem[]>([
  {
    text: '最近一周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      return [start, end];
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      return [start, end];
    }
  },
  {
    text: '最近一年',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setFullYear(start.getFullYear() - 1);
      return [start, end];
    }
  }
]);

// 状态
const selecting = ref<'start' | 'end'>('start');
const hoverDate = ref<Date | null>(null);

// 左侧日历年月
const startYear = ref(new Date().getFullYear());
const startMonth = ref(new Date().getMonth());

// 右侧日历年月
const endYear = ref(new Date().getFullYear());
const endMonth = ref(new Date().getMonth() + 1);

// 计算右侧是否紧跟左侧（相差1个月或跨年）
const isRightPanelAdjacent = computed(() => {
  // 如果右侧刚好是左侧的下一个月，则禁止左侧继续前进
  const nextMonthOfLeft = new Date(startYear.value, startMonth.value + 1);
  const rightTime = new Date(endYear.value, endMonth.value).getTime();
  return rightTime === nextMonthOfLeft.getTime();
});

const isLeftPanelAdjacent = computed(() => {
  // 如果左侧刚好是右侧的上一个月，则禁止右侧继续后退
  const prevMonthOfRight = new Date(endYear.value, endMonth.value - 1);
  const leftTime = new Date(startYear.value, startMonth.value).getTime();
  return leftTime === prevMonthOfRight.getTime();
});

// 选择提示文本
const rangeHint = computed(() => {
  if (!props.startDate && !props.endDate) {
    return '请选择开始日期';
  }
  if (props.startDate && !props.endDate) {
    return '请选择结束日期';
  }
  return `已选择: ${formatDate(props.startDate)} 至 ${formatDate(props.endDate)}`;
});

// 是否可以确认
const canConfirm = computed(() => {
  return props.startDate && props.endDate;
});

// 格式化日期
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 判断快捷选项是否激活
const isShortcutActive = (shortcut: RangeShortcutItem): boolean => {
  if (!props.startDate || !props.endDate) return false;
  
  const value = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value;
  const [start, end] = value;
  
  return isSameDay(props.startDate, start) && isSameDay(props.endDate, end);
};

const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

// 初始化日历
const initializeCalendars = () => {
  if (props.startDate) {
    startYear.value = props.startDate.getFullYear();
    startMonth.value = props.startDate.getMonth();
  } else {
    startYear.value = new Date().getFullYear();
    startMonth.value = new Date().getMonth();
  }

  if (props.endDate) {
    endYear.value = props.endDate.getFullYear();
    endMonth.value = props.endDate.getMonth();
  } else {
    // 默认右侧日历显示下个月
    endYear.value = startYear.value;
    endMonth.value = startMonth.value + 1;
    if (endMonth.value > 11) {
      endMonth.value = 0;
      endYear.value += 1;
    }
  }

  // 确保右侧 >= 左侧
  ensureRightAfterLeft();
};

// 确保右侧面板不早于左侧
const ensureRightAfterLeft = () => {
  const leftTime = new Date(startYear.value, startMonth.value).getTime();
  const rightTime = new Date(endYear.value, endMonth.value).getTime();
  
  if (rightTime < leftTime) {
    // 右侧自动调整到左侧的下个月
    endMonth.value = startMonth.value + 1;
    endYear.value = startYear.value;
    if (endMonth.value > 11) {
      endMonth.value = 0;
      endYear.value += 1;
    }
  }
};

// 日期选择
const handleDateSelect = (date: Date) => {
  if (selecting.value === 'start') {
    emit('update:startDate', date);
    // 清空结束日期，重新选择
    emit('update:endDate', null);
    selecting.value = 'end';
    hoverDate.value = null;
  } else {
    // 选择结束日期
    if (props.startDate && date < props.startDate) {
      // 如果选择的结束日期早于开始日期，自动交换
      emit('update:endDate', props.startDate);
      emit('update:startDate', date);
    } else {
      emit('update:endDate', date);
    }
    selecting.value = 'start';
    hoverDate.value = null;
  }
};

// 悬浮事件
const handleHover = (date: Date | null) => {
  if (selecting.value === 'end') {
    hoverDate.value = date;
  }
};

// 左侧日历导航
const handleStartPrevYear = () => {
  startYear.value -= 1;
  ensureRightAfterLeft();
};

const handleStartPrevMonth = () => {
  if (startMonth.value === 0) {
    startMonth.value = 11;
    startYear.value -= 1;
  } else {
    startMonth.value -= 1;
  }
  ensureRightAfterLeft();
};

const handleStartNextMonth = () => {
  if (isRightPanelAdjacent.value) return;
  
  if (startMonth.value === 11) {
    startMonth.value = 0;
    startYear.value += 1;
  } else {
    startMonth.value += 1;
  }
};

const handleStartNextYear = () => {
  if (isRightPanelAdjacent.value) return;
  startYear.value += 1;
};

// 右侧日历导航
const handleEndPrevYear = () => {
  if (isLeftPanelAdjacent.value) return;
  endYear.value -= 1;
};

const handleEndPrevMonth = () => {
  if (isLeftPanelAdjacent.value) return;
  
  if (endMonth.value === 0) {
    endMonth.value = 11;
    endYear.value -= 1;
  } else {
    endMonth.value -= 1;
  }
};

const handleEndNextMonth = () => {
  if (endMonth.value === 11) {
    endMonth.value = 0;
    endYear.value += 1;
  } else {
    endMonth.value += 1;
  }
};

const handleEndNextYear = () => {
  endYear.value += 1;
};

// 年份点击（可扩展为年份选择面板）
const handleStartYearClick = () => {
  // 可以扩展为打开年份选择面板
};

const handleEndYearClick = () => {
  // 可以扩展为打开年份选择面板
};

// 快捷选项点击
const handleShortcutClick = (shortcut: RangeShortcutItem) => {
  const value = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value;
  const [start, end] = value;
  
  emit('update:startDate', start);
  emit('update:endDate', end);
  selecting.value = 'start';
  hoverDate.value = null;
  
  // 更新日历视图
  startYear.value = start.getFullYear();
  startMonth.value = start.getMonth();
  endYear.value = end.getFullYear();
  endMonth.value = end.getMonth();
  
  // 确保右侧在左侧之后
  ensureRightAfterLeft();
};

// 确认
const handleConfirm = () => {
  if (!canConfirm.value) return;
  emit('confirm');
};

// 清空
const handleClear = () => {
  emit('update:startDate', null);
  emit('update:endDate', null);
  selecting.value = 'start';
  hoverDate.value = null;
};

// 监听初始值
watch(() => [props.startDate, props.endDate], () => {
  initializeCalendars();
}, { immediate: true });
</script>

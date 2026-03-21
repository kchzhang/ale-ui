<template>
  <div :class="timePanelClass">
    <!-- 小时选择 -->
    <div class="ale-time-picker__column">
      <div ref="hourRef" class="ale-time-picker__list">
        <div
          v-for="h in 24"
          :key="h"
          :class="getTimeItemClass(h - 1, modelHour)"
          @click="handleHourClick(h - 1)"
        >
          {{ String(h - 1).padStart(2, '0') }}
        </div>
      </div>
    </div>

    <!-- 冒号分隔符 -->
    <div class="ale-time-picker__separator">:</div>

    <!-- 分钟选择 -->
    <div class="ale-time-picker__column">
      <div ref="minuteRef" class="ale-time-picker__list">
        <div
          v-for="m in 60"
          :key="m"
          :class="getTimeItemClass(m - 1, modelMinute)"
          @click="handleMinuteClick(m - 1)"
        >
          {{ String(m - 1).padStart(2, '0') }}
        </div>
      </div>
    </div>

    <!-- 冒号分隔符 -->
    <div class="ale-time-picker__separator">:</div>

    <!-- 秒选择 -->
    <div class="ale-time-picker__column">
      <div ref="secondRef" class="ale-time-picker__list">
        <div
          v-for="s in 60"
          :key="s"
          :class="getTimeItemClass(s - 1, modelSecond)"
          @click="handleSecondClick(s - 1)"
        >
          {{ String(s - 1).padStart(2, '0') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import type { TimePanelProps, TimePanelEmits } from '../types';

const props = withDefaults(defineProps<TimePanelProps>(), {
  modelHour: 0,
  modelMinute: 0,
  modelSecond: 0,
  disabled: false
});

const emit = defineEmits<TimePanelEmits>();

// DOM 引用
const hourRef = ref<HTMLDivElement>();
const minuteRef = ref<HTMLDivElement>();
const secondRef = ref<HTMLDivElement>();

// 样式类
const timePanelClass = computed(() => [
  'ale-time-picker',
  {
    'is-disabled': props.disabled
  }
]);

const getTimeItemClass = (value: number, selectedValue?: number) => [
  'ale-time-picker__item',
  {
    'is-selected': value === selectedValue
  }
];

// 点击事件
const handleHourClick = (hour: number) => {
  if (props.disabled) return;
  emit('update:modelHour', hour);
};

const handleMinuteClick = (minute: number) => {
  if (props.disabled) return;
  emit('update:modelMinute', minute);
};

const handleSecondClick = (second: number) => {
  if (props.disabled) return;
  emit('update:modelSecond', second);
};

// 滚动到选中位置
const scrollToSelected = () => {
  const scrollToItem = (container: HTMLDivElement | undefined, value: number) => {
    if (!container) return;
    const items = container.querySelectorAll('.ale-time-picker__item');
    if (items[value]) {
      // 使用 instant 行为避免滚动动画影响体验
      items[value].scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  };

  nextTick(() => {
    scrollToItem(hourRef.value, props.modelHour);
    scrollToItem(minuteRef.value, props.modelMinute);
    scrollToItem(secondRef.value, props.modelSecond);
  });
};

// 监听 props 变化，更新滚动位置
watch(() => [props.modelHour, props.modelMinute, props.modelSecond], () => {
  scrollToSelected();
});

// 初始化滚动位置
onMounted(() => {
  scrollToSelected();
});
</script>

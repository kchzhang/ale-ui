<template>
  <div :class="splitClass" ref="splitRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  provide,
  ref,
  reactive,
  onUnmounted
} from 'vue';
import type { SplitProps, SplitEmits, SplitPanelState, SplitContext } from './types';
import './Split.css';

const props = withDefaults(defineProps<SplitProps>(), {
  direction: 'horizontal',
  splitterSize: 8,
  initialSplit: 50,
  minSplit: 10,
  maxSplit: 90,
  disabled: false
});

const emit = defineEmits<SplitEmits>();

const splitRef = ref<HTMLElement>();
const panels = reactive<SplitPanelState[]>([]);
const isDragging = ref(false);
const draggingIndex = ref(-1);
const startX = ref(0);
const startY = ref(0);
const startSizes = ref<number[]>([]);

let panelIdCounter = 0;
const generateId = () => `split-panel-${panelIdCounter++}`;

const splitClass = computed(() => [
  'ale-split',
  `ale-split--${props.direction}`,
  {
    'is-dragging': isDragging.value,
    'is-disabled': props.disabled
  }
]);

// 注册面板
const registerPanel = (panel: SplitPanelState) => {
  const index = panels.length;
  panels.push({
    ...panel,
    id: panel.id || generateId(),
    size: panel.size ?? (index === 0 ? props.initialSplit : 100 - props.initialSplit)
  });
};

// 注销面板
const unregisterPanel = (id: string) => {
  const index = panels.findIndex(p => p.id === id);
  if (index > -1) {
    panels.splice(index, 1);
  }
};

// 更新面板尺寸
const updatePanelSize = (id: string, size: number) => {
  const panel = panels.find(p => p.id === id);
  if (panel) {
    panel.size = size;
  }
};

// 切换面板折叠
const togglePanelCollapse = (id: string) => {
  const panel = panels.find(p => p.id === id);
  if (panel && panel.collapsible) {
    panel.collapsed = !panel.collapsed;
    const index = panels.findIndex(p => p.id === id);
    emit('collapse', index, panel.collapsed);
  }
};

// 获取面板索引
const getPanelIndex = (id: string) => {
  return panels.findIndex(p => p.id === id);
};

// 拖动相关函数定义
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !splitRef.value) return;

  const rect = splitRef.value.getBoundingClientRect();
  const totalSize = props.direction === 'horizontal' ? rect.width : rect.height;

  const delta = props.direction === 'horizontal'
    ? e.clientX - startX.value
    : e.clientY - startY.value;

  const deltaPercent = (delta / totalSize) * 100;

  const leftPanel = panels[draggingIndex.value];
  const rightPanel = panels[draggingIndex.value + 1];

  if (!leftPanel || !rightPanel) return;

  const leftStartSize = startSizes.value[draggingIndex.value] ?? 0;
  const rightStartSize = startSizes.value[draggingIndex.value + 1] ?? 0;

  let newLeftSize = leftStartSize + deltaPercent;
  let newRightSize = rightStartSize - deltaPercent;

  // 应用最小/最大限制
  const minLeft = leftPanel.min ? (leftPanel.min / totalSize) * 100 : props.minSplit;
  const maxLeft = leftPanel.max ? (leftPanel.max / totalSize) * 100 : props.maxSplit;
  const minRight = rightPanel.min ? (rightPanel.min / totalSize) * 100 : props.minSplit;
  const maxRight = rightPanel.max ? (rightPanel.max / totalSize) * 100 : props.maxSplit;

  if (newLeftSize < minLeft) {
    newLeftSize = minLeft;
    newRightSize = leftStartSize + rightStartSize - minLeft;
  }
  if (newLeftSize > maxLeft) {
    newLeftSize = maxLeft;
    newRightSize = leftStartSize + rightStartSize - maxLeft;
  }
  if (newRightSize < minRight) {
    newRightSize = minRight;
    newLeftSize = leftStartSize + rightStartSize - minRight;
  }
  if (newRightSize > maxRight) {
    newRightSize = maxRight;
    newLeftSize = leftStartSize + rightStartSize - maxRight;
  }

  leftPanel.size = newLeftSize;
  rightPanel.size = newRightSize;

  emit('resize', panels.map(p => p.size));
};

const handleMouseUp = () => {
  isDragging.value = false;
  draggingIndex.value = -1;

  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
};

const handleSplitterMouseDown = (e: MouseEvent, index: number) => {
  if (props.disabled) return;

  e.preventDefault();
  isDragging.value = true;
  draggingIndex.value = index;
  startX.value = e.clientX;
  startY.value = e.clientY;
  startSizes.value = panels.map(p => p.size);

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.body.style.cursor = props.direction === 'horizontal' ? 'col-resize' : 'row-resize';
  document.body.style.userSelect = 'none';
};

// 提供上下文
provide<SplitContext>('splitContext', {
  direction: props.direction,
  registerPanel,
  unregisterPanel,
  updatePanelSize,
  togglePanelCollapse,
  getPanelIndex,
  panels,
  isDragging,
  draggingSplitterIndex: draggingIndex,
  handleSplitterMouseDown
});

// 暴露方法
defineExpose({
  handleSplitterMouseDown,
  panels
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
});
</script>

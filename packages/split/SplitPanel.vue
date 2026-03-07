<template>
  <div :class="panelClass" :style="panelStyle">
    <div class="ale-split-panel__content">
      <slot />
    </div>
    <div
      v-if="showSplitter"
      :class="splitterClass"
      @mousedown="handleSplitterMouseDown"
      @dblclick="handleSplitterDblClick"
    >
      <div class="ale-split-panel__splitter-line" />
      <button
        v-if="collapsible"
        class="ale-split-panel__collapse-btn"
        @click.stop="handleCollapse"
      >
        <svg viewBox="0 0 16 16" class="ale-split-panel__collapse-icon">
          <path :d="collapseIconPath" fill="currentColor" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue';
import type { SplitPanelProps, SplitPanelEmits, SplitPanelState, SplitContext } from './types';

const props = withDefaults(defineProps<SplitPanelProps>(), {
  size: undefined,
  min: 0,
  max: Infinity,
  collapsible: false,
  collapsed: false,
  collapsedSize: 40
});

const emit = defineEmits<SplitPanelEmits>();

const context = inject<SplitContext>('splitContext');

if (!context) {
  throw new Error('SplitPanel must be used within a Split component');
}

const panelId = ref(`split-panel-${Math.random().toString(36).slice(2, 9)}`);
const isCollapsed = ref(props.collapsed);

const panelClass = computed(() => [
  'ale-split-panel',
  {
    'is-collapsed': isCollapsed.value
  }
]);

const panelStyle = computed(() => {
  const panel = context.panels.find(p => p.id === panelId.value);
  const size = isCollapsed.value
    ? props.collapsedSize
    : panel?.size ?? props.size;

  return {
    [context.direction === 'horizontal' ? 'width' : 'height']: isCollapsed.value
      ? `${props.collapsedSize}px`
      : `${size}%`,
    flexShrink: 0
  };
});

const showSplitter = computed(() => {
  const index = context.getPanelIndex(panelId.value);
  return index > -1 && index < context.panels.length - 1;
});

const splitterClass = computed(() => {
  const index = context.getPanelIndex(panelId.value);
  const isThisDragging = context.isDragging.value && context.draggingSplitterIndex.value === index;

  return [
    'ale-split-panel__splitter',
    `ale-split-panel__splitter--${context.direction}`,
    {
      'is-collapsed': isCollapsed.value,
      'is-dragging': isThisDragging
    }
  ];
});

const collapseIconPath = computed(() => {
  if (context.direction === 'horizontal') {
    return isCollapsed.value
      ? 'M6 4l4 4-4 4V4z'
      : 'M10 4l-4 4 4 4V4z';
  }
  return isCollapsed.value
    ? 'M4 6l4 4 4-4H4z'
    : 'M4 10l4-4 4 4H4z';
});

const handleSplitterMouseDown = (e: MouseEvent) => {
  const index = context.getPanelIndex(panelId.value);
  if (index > -1 && context.handleSplitterMouseDown) {
    context.handleSplitterMouseDown(e, index);
  }
};

const handleSplitterDblClick = () => {
  if (props.collapsible) {
    handleCollapse();
  }
};

const handleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  context.togglePanelCollapse(panelId.value);
  emit('collapse', isCollapsed.value);
};

// 注册面板
onMounted(() => {
  const state: SplitPanelState = {
    id: panelId.value,
    size: typeof props.size === 'string'
      ? parseFloat(props.size)
      : props.size ?? 50,
    min: props.min,
    max: props.max,
    collapsible: props.collapsible,
    collapsed: isCollapsed.value,
    collapsedSize: props.collapsedSize
  };

  context.registerPanel(state);
});

// 注销面板
onUnmounted(() => {
  context.unregisterPanel(panelId.value);
});

// 监听折叠状态变化
watch(() => props.collapsed, (val) => {
  isCollapsed.value = val;
});
</script>

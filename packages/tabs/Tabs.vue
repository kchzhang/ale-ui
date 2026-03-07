<template>
  <div ref="tabsRef" :class="tabsClass">
    <!-- 标签页头部 -->
    <div class="ale-tabs__header">
      <!-- 添加按钮 - 前置 -->
      <span
        v-if="showAddBtnPre"
        class="ale-tabs__new-tab"
        @click="handleTabAdd"
      >
        <slot name="addIcon">
          <i class="ale-icon-plus"></i>
        </slot>
      </span>

      <!-- 导航包裹层 -->
      <div class="ale-tabs__nav-wrap" :class="{ 'is-scrollable': scrollable }">
        <!-- 滚动按钮 - 左/上 -->
        <span
          v-if="scrollable"
          class="ale-tabs__nav-prev"
          @click="scrollPrev"
        >
          <i :class="prevIconClass"></i>
        </span>

        <!-- 导航容器 -->
        <div ref="navScrollRef" class="ale-tabs__nav-scroll">
          <div
            ref="navRef"
            class="ale-tabs__nav"
            :class="{ 'is-stretch': isStretch }"
            :style="navStyle"
            role="tablist"
          >
            <div
              v-for="(pane, index) in panes"
              :key="pane.uid"
              :ref="(el) => setTabRef(el, index)"
              :class="getTabClass(pane)"
              :style="getTabStyle()"
              :id="`tab-${pane.paneName}`"
              :aria-selected="pane.active"
              :aria-controls="`pane-${pane.paneName}`"
              role="tab"
              tabindex="-1"
              @click="(e) => handleTabClick(pane, e)"
              @keydown="(e) => handleKeydown(e, index)"
            >
              <!-- 标签内容 -->
              <span class="ale-tabs__item__content">
                <component v-if="pane.slots?.label" :is="pane.slots.label" />
                <template v-else>{{ pane.props.label }}</template>
              </span>

              <!-- 关闭按钮 -->
              <span
                v-if="showCloseBtn(pane)"
                class="ale-tabs__item__close"
                @click.stop="handleTabRemove(pane, index)"
              >
                <i class="ale-icon-close"></i>
              </span>
            </div>

            <!-- 激活条 -->
            <div v-if="showActiveBar" class="ale-tabs__active-bar" :style="barStyle" />
          </div>
        </div>

        <!-- 滚动按钮 - 右/下 -->
        <span
          v-if="scrollable"
          class="ale-tabs__nav-next"
          @click="scrollNext"
        >
          <i :class="nextIconClass"></i>
        </span>
      </div>

      <!-- 添加按钮 - 后置 -->
      <span
        v-if="showAddBtnPost"
        class="ale-tabs__new-tab"
        @click="handleTabAdd"
      >
        <slot name="addIcon">
          <i class="ale-icon-plus"></i>
        </slot>
      </span>
    </div>

    <!-- 内容区域 -->
    <div class="ale-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  watch,
  nextTick,
  onMounted,
  onUpdated
} from 'vue';
import type { TabsProps, TabsEmits, TabsExpose } from './types';

const props = withDefaults(defineProps<TabsProps>(), {
  type: '',
  tabPosition: 'top',
  addable: false,
  closable: false,
  editable: false,
  stretch: false
});

const emit = defineEmits<TabsEmits>();

// 注册的 pane 列表
const panes = ref<any[]>([]);

// 当前激活的 name
const currentName = computed({
  get() {
    return props.modelValue ?? '';
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

// DOM 引用
const tabsRef = ref<HTMLElement>();
const navScrollRef = ref<HTMLElement>();
const navRef = ref<HTMLElement>();
const tabRefs = ref<HTMLElement[]>([]);

// 滚动相关
const scrollable = ref(false);
const navOffset = ref(0);
const focusIndex = ref(-1);

// 计算导航样式
const navStyle = computed(() => {
  if (tabPosition.value === 'top' || tabPosition.value === 'bottom') {
    return {
      transform: `translateX(-${navOffset.value}px)`
    };
  } else {
    return {
      transform: `translateY(-${navOffset.value}px)`
    };
  }
});

// 计算激活条样式
const barStyle = computed(() => {
  const activeIndex = panes.value.findIndex(p => p.active);
  if (activeIndex === -1) return {};

  const activeTab = tabRefs.value[activeIndex];
  if (!activeTab) return {};

  const isHorizontal = tabPosition.value === 'top' || tabPosition.value === 'bottom';

  if (isHorizontal) {
    return {
      width: `${activeTab.offsetWidth}px`,
      transform: `translateX(${activeTab.offsetLeft}px)`
    };
  } else {
    return {
      height: `${activeTab.offsetHeight}px`,
      transform: `translateY(${activeTab.offsetTop}px)`
    };
  }
});

// 标签位置
const tabPosition = computed(() => props.tabPosition);

// Tabs 组件类名
const tabsClass = computed(() => [
  'ale-tabs',
  `ale-tabs--${tabPosition.value}`,
  {
    [`ale-tabs--${props.type}`]: props.type,
    'ale-tabs--stretch': props.stretch && !props.type
  }
]);

// 是否显示前置添加按钮
const showAddBtnPre = computed(() => {
  return (props.addable || props.editable) && tabPosition.value === 'bottom';
});

// 是否显示后置添加按钮
const showAddBtnPost = computed(() => {
  return (props.addable || props.editable) && tabPosition.value !== 'bottom';
});

// 上一个按钮图标类名
const prevIconClass = computed(() => {
  return tabPosition.value === 'top' || tabPosition.value === 'bottom'
    ? 'ale-icon-arrow-left'
    : 'ale-icon-arrow-up';
});

// 下一个按钮图标类名
const nextIconClass = computed(() => {
  return tabPosition.value === 'top' || tabPosition.value === 'bottom'
    ? 'ale-icon-arrow-right'
    : 'ale-icon-arrow-down';
});

// 是否拉伸
const isStretch = computed(() => {
  return props.stretch && !props.type;
});

// 是否显示激活条
const showActiveBar = computed(() => {
  return props.type === '';
});

// 获取 tab 类名
const getTabClass = (pane: any) => ({
  'ale-tabs__item': true,
  'is-active': pane.active,
  'is-disabled': pane.props.disabled,
  'is-closable': props.closable || pane.props.closable || props.editable
});

// 是否显示关闭按钮
const showCloseBtn = (pane: any) => {
  return (props.closable || pane.props.closable || props.editable) && !pane.props.disabled;
};

// 设置 tab 引用
const setTabRef = (el: any, index: number) => {
  if (el) {
    tabRefs.value[index] = el;
  }
};

// 获取 tab 样式
const getTabStyle = () => {
  if (props.stretch && !props.type) {
    return {
      flex: 1
    };
  }
  return {};
};

// 注册 pane
const registerPane = (pane: any) => {
  const index = panes.value.findIndex(p => p.uid === pane.uid);
  if (index === -1) {
    panes.value.push(pane);
  } else {
    panes.value[index] = pane;
  }
  sortPanes();
};

// 注销 pane
const unregisterPane = (uid: number) => {
  const index = panes.value.findIndex(p => p.uid === uid);
  if (index > -1) {
    panes.value.splice(index, 1);
  }
};

// 排序 panes
const sortPanes = () => {
  // 按照 DOM 顺序排序
  const slot = tabsRef.value?.querySelector('.ale-tabs__content');
  if (slot) {
    const children = Array.from(slot.children);
    panes.value.sort((a, b) => {
      const indexA = children.findIndex(c => {
        const pane = panes.value.find(p => p.uid === a.uid);
        return c === tabsRef.value?.querySelector(`[name="${pane?.props.name}"]`);
      });
      const indexB = children.findIndex(c => {
        const pane = panes.value.find(p => p.uid === b.uid);
        return c === tabsRef.value?.querySelector(`[name="${pane?.props.name}"]`);
      });
      return indexA - indexB;
    });
  }
};

// 检查是否需要滚动
const calcScrollable = () => {
  nextTick(() => {
    if (!navScrollRef.value || !navRef.value) return;

    const nav = navRef.value;
    const scroll = navScrollRef.value;

    if (tabPosition.value === 'top' || tabPosition.value === 'bottom') {
      scrollable.value = nav.offsetWidth > scroll.offsetWidth;
    } else {
      scrollable.value = nav.offsetHeight > scroll.offsetHeight;
    }
  });
};

// 滚动到上一个
const scrollPrev = () => {
  const containerSize = tabPosition.value === 'top' || tabPosition.value === 'bottom'
    ? navScrollRef.value?.offsetWidth || 0
    : navScrollRef.value?.offsetHeight || 0;
  navOffset.value = Math.max(0, navOffset.value - containerSize);
};

// 滚动到下一个
const scrollNext = () => {
  const containerSize = tabPosition.value === 'top' || tabPosition.value === 'bottom'
    ? navScrollRef.value?.offsetWidth || 0
    : navScrollRef.value?.offsetHeight || 0;
  const navSize = tabPosition.value === 'top' || tabPosition.value === 'bottom'
    ? navRef.value?.offsetWidth || 0
    : navRef.value?.offsetHeight || 0;
  navOffset.value = Math.min(navOffset.value + containerSize, navSize - containerSize);
};

// 滚动到激活的 tab
const scrollToActiveTab = () => {
  nextTick(() => {
    const activeIndex = panes.value.findIndex(p => p.active);
    if (activeIndex === -1 || !scrollable.value) return;

    const activeTab = tabRefs.value[activeIndex];
    if (!activeTab || !navScrollRef.value) return;

    const containerSize = tabPosition.value === 'top' || tabPosition.value === 'bottom'
      ? navScrollRef.value.offsetWidth
      : navScrollRef.value.offsetHeight;

    const activeOffset = tabPosition.value === 'top' || tabPosition.value === 'bottom'
      ? activeTab.offsetLeft
      : activeTab.offsetTop;

    const activeSize = tabPosition.value === 'top' || tabPosition.value === 'bottom'
      ? activeTab.offsetWidth
      : activeTab.offsetHeight;

    if (activeOffset < navOffset.value) {
      navOffset.value = activeOffset;
    } else if (activeOffset + activeSize > navOffset.value + containerSize) {
      navOffset.value = activeOffset + activeSize - containerSize;
    }
  });
};

// 处理 tab 点击
const handleTabClick = async (pane: any, event: Event) => {
  if (pane.props.disabled) return;

  emit('tab-click', { name: pane.props.name, label: pane.props.label }, event);

  const oldName = currentName.value;
  const newName = pane.props.name;

  if (oldName === newName) return;

  // beforeLeave 钩子
  if (props.beforeLeave) {
    try {
      const result = await props.beforeLeave(newName, oldName);
      if (result === false) return;
    } catch (e) {
      return;
    }
  }

  currentName.value = newName;
  emit('change', newName);
  scrollToActiveTab();
};

// 处理 tab 移除
const handleTabRemove = (pane: any, index: number) => {
  if (pane.props.disabled) return;

  emit('tab-remove', pane.props.name);

  // 如果移除的是当前激活的 tab，切换到其他 tab
  if (pane.active && panes.value.length > 1) {
    const nextIndex = index < panes.value.length - 1 ? index : index - 1;
    const nextPane = panes.value[nextIndex];
    if (nextPane && !nextPane.props.disabled) {
      currentName.value = nextPane.props.name;
      emit('change', nextPane.props.name);
    }
  }
};

// 处理添加 tab
const handleTabAdd = () => {
  emit('tab-add');
};

// 处理键盘导航
const handleKeydown = (e: KeyboardEvent, index: number) => {
  const keyCode = e.keyCode || e.which;
  const isHorizontal = tabPosition.value === 'top' || tabPosition.value === 'bottom';

  let nextIndex = -1;

  if (isHorizontal) {
    if (keyCode === 37) { // Left
      nextIndex = index - 1;
    } else if (keyCode === 39) { // Right
      nextIndex = index + 1;
    }
  } else {
    if (keyCode === 38) { // Up
      nextIndex = index - 1;
    } else if (keyCode === 40) { // Down
      nextIndex = index + 1;
    }
  }

  if (nextIndex >= 0 && nextIndex < panes.value.length) {
    e.preventDefault();
    const nextPane = panes.value[nextIndex];
    if (!nextPane.props.disabled) {
      focusIndex.value = nextIndex;
      handleTabClick(nextPane, e);
    }
  }
};

// 初始化
onMounted(() => {
  calcScrollable();
  window.addEventListener('resize', calcScrollable);
});

onUpdated(() => {
  calcScrollable();
});

// 监听 modelValue 变化
watch(() => props.modelValue, () => {
  scrollToActiveTab();
});

// 监听 panes 变化
watch(panes, () => {
  calcScrollable();
  // 如果没有激活的 pane，激活第一个可用的
  if (panes.value.length > 0 && !panes.value.some(p => p.active)) {
    const firstEnabled = panes.value.find(p => !p.props.disabled);
    if (firstEnabled) {
      currentName.value = firstEnabled.props.name;
    }
  }
}, { deep: true });

// 提供上下文
provide('tabsContext', {
  props,
  registerPane,
  unregisterPane
});

defineExpose({
  currentName
} as TabsExpose);
</script>

<style scoped>
/* 仅保留必要的 scoped 样式，主要样式在 Tabs.css */
</style>

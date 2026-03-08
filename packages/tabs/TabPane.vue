<template>
  <div
    v-show="active"
    :class="['ale-tab-pane', customClass]"
    role="tabpanel"
    :aria-hidden="!active"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  watch,
  ref
} from 'vue';
import type { TabPaneProps, TabPaneEmits, TabPaneExpose } from './types';

const props = withDefaults(defineProps<TabPaneProps>(), {
  label: '',
  disabled: false,
  closable: false,
  lazy: false
});

const emit = defineEmits<TabPaneEmits>();

// 获取 Tabs 上下文
const tabsContext = inject<{
  props: {
    modelValue?: string | number;
    closable?: boolean;
  };
  registerPane: (pane: any) => void;
  unregisterPane: (uid: number) => void;
} | null>('tabsContext', null);

const instance = getCurrentInstance();
const uid = instance?.uid ?? 0;

// 是否已加载过
const loaded = ref(false);

// 是否激活
const active = computed(() => {
  const currentName = tabsContext?.props.modelValue;
  const paneName = props.name;
  return currentName === paneName;
});

// 监听激活状态，延迟加载时标记已加载
watch(active, (val) => {
  if (val) {
    loaded.value = true;
  }
}, { immediate: true });

// 自定义类名
const customClass = computed(() => {
  return '';
});

// 是否可关闭
const isClosable = computed(() => {
  return props.closable || tabsContext?.props.closable || false;
});

// 注册 pane
onMounted(() => {
  if (tabsContext) {
    tabsContext.registerPane({
      uid,
      props,
      slots: instance?.slots,
      paneName: computed(() => props.name),
      active,
      index: ref(undefined),
      isClosable
    });
  }
});

// 卸载时注销 pane
onUnmounted(() => {
  if (tabsContext) {
    tabsContext.unregisterPane(uid);
  }
});

// 更新 pane
watch(() => props, () => {
  if (tabsContext) {
    tabsContext.registerPane({
      uid,
      props,
      slots: instance?.slots,
      paneName: computed(() => props.name),
      active,
      index: ref(undefined),
      isClosable
    });
  }
}, { deep: true });

defineExpose({
  name: computed(() => props.name),
  active
} as TabPaneExpose);
</script>

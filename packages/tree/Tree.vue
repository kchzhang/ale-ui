<template>
  <div
    :class="treeClass"
    role="tree"
    @keydown="handleKeydown"
  >
    <TreeNodeComponent
      v-for="node in rootNodes"
      :key="String(node.key)"
      :node="node"
      :props="treeProps"
      :render-content="renderContent"
      :show-checkbox="isCheckable"
      :check-strictly="checkStrictly"
      :expand-on-click-node="expandOnClickNode"
      :check-on-click-node="checkOnClickNode"
      :highlight-current="highlightCurrent"
      :indent="indent"
      :draggable="draggable"
      :allow-drag="allowDrag"
      :allow-drop="allowDrop"
      @node-click="handleNodeClick"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
      @node-check="handleNodeCheck"
      @node-drag-start="handleNodeDragStart"
      @node-drag-enter="handleNodeDragEnter"
      @node-drag-leave="handleNodeDragLeave"
      @node-drag-over="handleNodeDragOver"
      @node-drag-end="handleNodeDragEnd"
      @node-drop="handleNodeDrop"
    />
    <div v-if="isEmpty" class="ale-tree__empty-block">
      <span class="ale-tree__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  getCurrentInstance,
} from 'vue';
import type { TreeProps, TreeEmits, TreeExpose, TreeData, TreeNode } from './tree.type';
import type { Node as NodeType } from './model/node';
import { TreeStore } from './model/tree-store';
import TreeNodeComponent from './TreeNode.vue';
import './Tree.css';

// 组件名
defineOptions({
  name: 'AleTree',
});

// Props 定义 - Element Plus 规范
const props = withDefaults(defineProps<TreeProps>(), {
  data: () => [],
  nodeKey: 'id',
  props: () => ({
    label: 'label',
    children: 'children',
    disabled: 'disabled',
  }),
  defaultExpandAll: false,
  expandOnClickNode: true,
  checkOnClickNode: false,
  showCheckbox: false,
  checkable: false,
  checkStrictly: false,
  accordion: false,
  indent: 18,
  draggable: false,
  lazy: false,
  highlightCurrent: false,
});

// 计算是否显示复选框（checkable 或 showCheckbox）
const isCheckable = computed(() => props.checkable || props.showCheckbox);

const emit = defineEmits<TreeEmits>();

// 组件实例
const instance = getCurrentInstance();

// 创建 TreeStore
const store = ref<TreeStore | null>(null);

// 初始化 store
const initStore = () => {
  store.value = new TreeStore({
    key: props.nodeKey,
    data: props.data,
    props: props.props,
    load: props.lazy ? props.load : undefined,
    accordion: props.accordion,
    checkStrictly: props.checkStrictly,
    defaultExpandAll: props.defaultExpandAll,
    filterNodeMethod: props.filterNodeMethod,
    defaultExpandedKeys: props.defaultExpandedKeys,
    defaultCheckedKeys: props.defaultCheckedKeys,
    currentNodeKey: props.currentNodeKey,
  });

  // 绑定事件
  store.value.on('node-expand', (data: TreeData, node: NodeType) => {
    emit('node-expand', data, node as unknown as TreeNode, instance);
  });

  store.value.on('node-collapse', (data: TreeData, node: NodeType) => {
    emit('node-collapse', data, node as unknown as TreeNode, instance);
  });
};

// 计算属性
const rootNodes = computed(() => store.value?.root?.childNodes || []);

const isEmpty = computed(() => {
  return !props.data || props.data.length === 0;
});

const emptyText = computed(() => '暂无数据');

const treeClass = computed(() => ({
  'ale-tree': true,
  'ale-tree--highlight-current': props.highlightCurrent,
}));

// 解构 props 供模板使用
const {
  props: treeProps,
  renderContent,
  checkStrictly,
  expandOnClickNode,
  checkOnClickNode,
  highlightCurrent,
  indent,
  draggable,
  allowDrag,
  allowDrop,
} = props;

// 方法
const handleNodeClick = (node: NodeType) => {
  const data = node.data;
  if (store.value) {
    const prevCurrent = store.value.getCurrentNode();
    store.value.setCurrentNodeKey(node.key);
    const current = store.value.getCurrentNode();

    if (prevCurrent !== current) {
      emit('current-change', data, node as unknown as TreeNode);
    }
  }

  emit('node-click', data, node as unknown as TreeNode, instance);

  if (props.expandOnClickNode) {
    if (node.expanded) {
      node.collapse();
    } else {
      node.expand();
    }
  }

  if (isCheckable.value && props.checkOnClickNode) {
    node.setChecked(!node.checked, true);
    handleCheckChange(node);
  }
};

const handleNodeExpand = (node: NodeType) => {
  emit('node-expand', node.data, node as unknown as TreeNode, instance);
};

const handleNodeCollapse = (node: NodeType) => {
  emit('node-collapse', node.data, node as unknown as TreeNode, instance);
};

const handleNodeCheck = (node: NodeType, checked: boolean) => {
  node.setChecked(checked, true);
  handleCheckChange(node);
};

// ==================== 拖拽事件处理 ====================

const handleNodeDragStart = (node: NodeType, ev: DragEvent) => {
  emit('node-drag-start', node as unknown as TreeNode, ev);
};

const handleNodeDragEnter = (draggingNode: NodeType, dropNode: NodeType, ev: DragEvent) => {
  emit('node-drag-enter', draggingNode as unknown as TreeNode, dropNode as unknown as TreeNode, ev);
};

const handleNodeDragLeave = (draggingNode: NodeType, dropNode: NodeType, ev: DragEvent) => {
  emit('node-drag-leave', draggingNode as unknown as TreeNode, dropNode as unknown as TreeNode, ev);
};

const handleNodeDragOver = (draggingNode: NodeType, dropNode: NodeType, ev: DragEvent) => {
  emit('node-drag-over', draggingNode as unknown as TreeNode, dropNode as unknown as TreeNode, ev);
};

const handleNodeDragEnd = (draggingNode: NodeType, dropNode: NodeType | null, dropType: 'before' | 'after' | 'inner' | undefined, ev: DragEvent) => {
  emit('node-drag-end', draggingNode as unknown as TreeNode, dropNode as unknown as TreeNode, dropType, ev);
};

const handleNodeDrop = (draggingNode: NodeType, dropNode: NodeType, dropType: 'before' | 'after' | 'inner', ev: DragEvent) => {
  emit('node-drop', draggingNode as unknown as TreeNode, dropNode as unknown as TreeNode, dropType, ev);
};

const handleCheckChange = (node: NodeType) => {
  emit('check-change', node.data, node.checked, node.indeterminate);

  if (store.value) {
    emit('check', node.data, {
      checkedKeys: store.value.getCheckedKeys(),
      checkedNodes: store.value.getCheckedNodes(),
      halfCheckedKeys: store.value.getHalfCheckedKeys(),
      halfCheckedNodes: store.value.getHalfCheckedNodes(),
    });
  }
};

const handleKeydown = (_event: KeyboardEvent) => {
  void _event; // 键盘导航处理 - 预留扩展
};

// 暴露方法
const filter = (value: string) => {
  store.value?.filter(value);
};

const getNode = (key: string | number | TreeData): TreeNode | null => {
  if (typeof key === 'object' && key !== null) {
    const nodeKey = props.nodeKey || 'id';
    const keyValue = key[nodeKey];
    return store.value?.getNode(keyValue) as unknown as TreeNode | null;
  }
  return store.value?.getNode(key as string | number) as unknown as TreeNode | null;
};

const getCheckedNodes = (leafOnly = false): TreeData[] => {
  return store.value?.getCheckedNodes(leafOnly) || [];
};

const getCheckedKeys = (leafOnly = false): (string | number)[] => {
  return store.value?.getCheckedKeys(leafOnly) || [];
};

const getHalfCheckedNodes = (): TreeData[] => {
  return store.value?.getHalfCheckedNodes() || [];
};

const getHalfCheckedKeys = (): (string | number)[] => {
  return store.value?.getHalfCheckedKeys() || [];
};

const getCurrentNode = (): TreeData | null => {
  return store.value?.getCurrentNode()?.data || null;
};

const getCurrentKey = (): string | number | null => {
  return store.value?.currentNodeKey || null;
};

const setCurrentKey = (key: string | number | null) => {
  store.value?.setCurrentNodeKey(key);
};

const setCurrentNode = (node: TreeNode) => {
  store.value?.setCurrentNodeKey((node as unknown as NodeType).key);
};

const remove = (data: TreeData | TreeNode) => {
  const node = typeof data === 'object' && 'data' in data
    ? data as unknown as NodeType
    : getNode(data as TreeData) as unknown as NodeType;
  if (node && store.value) {
    store.value.remove(node);
  }
};

const append = (data: TreeData, parentData: TreeData | TreeNode | string | number) => {
  let parentNode: NodeType | null = null;

  if (typeof parentData === 'object' && parentData !== null && 'data' in parentData) {
    parentNode = parentData as unknown as NodeType;
  } else if (typeof parentData === 'object' && parentData !== null) {
    parentNode = getNode(parentData) as unknown as NodeType;
  } else {
    parentNode = getNode(parentData as string | number) as unknown as NodeType;
  }

  store.value?.append(data, parentNode || undefined);
};

const insertBefore = (data: TreeData, refData: TreeData | TreeNode | string | number) => {
  const refNode = typeof refData === 'object' && refData !== null && 'data' in refData
    ? refData as unknown as NodeType
    : getNode(refData as TreeData) as unknown as NodeType;
  if (refNode && store.value) {
    store.value.insertBefore(data, refNode);
  }
};

const insertAfter = (data: TreeData, refData: TreeData | TreeNode | string | number) => {
  const refNode = typeof refData === 'object' && refData !== null && 'data' in refData
    ? refData as unknown as NodeType
    : getNode(refData as TreeData) as unknown as NodeType;
  if (refNode && store.value) {
    store.value.insertAfter(data, refNode);
  }
};

const expandAll = () => {
  store.value?.expandAll();
};

const collapseAll = () => {
  store.value?.collapseAll();
};

// 监听数据变化
watch(
  () => props.data,
  () => {
    initStore();
  },
  { immediate: true, deep: true }
);

// 暴露方法
defineExpose<TreeExpose>({
  filter,
  updateKeyChildren: (key, data) => {
    const node = getNode(key);
    if (node) {
      (node as unknown as NodeType).setData({ ...(node as unknown as NodeType).data, children: data });
    }
  },
  getCheckedNodes,
  getCheckedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  getCurrentNode,
  getCurrentKey,
  setCurrentKey,
  setCurrentNode,
  getNode,
  remove,
  append,
  insertBefore,
  insertAfter,
  expandAll,
  collapseAll,
});

onMounted(() => {
  if (!store.value) {
    initStore();
  }
});
</script>

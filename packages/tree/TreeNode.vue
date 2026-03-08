<template>
  <div
    v-show="nodeVisible"
    :class="nodeClass"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="nodeExpanded"
    :aria-disabled="nodeDisabled"
    :draggable="draggable && !nodeDisabled && !nodeDataDisabled"
    @dragstart.stop="handleDragStart"
    @dragenter.stop="handleDragEnter"
    @dragover.stop="handleDragOver"
    @dragleave.stop="handleDragLeave"
    @drop.stop="handleDrop"
    @dragend.stop="handleDragEnd"
  >
    <!-- 节点内容行 -->
    <div
      class="ale-tree-node__content"
      :style="contentStyle"
      @click.stop="handleClick"
    >
      <!-- 展开图标 - 只有非叶子节点才显示 -->
      <span
        v-if="!nodeIsLeaf"
        :class="expandIconClass"
        @click.stop="handleExpandIconClick"
      >
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M384 192v640l384-320.064z" />
        </svg>
      </span>
      <!-- 叶子节点占位符，保持对齐 -->
      <span v-else class="ale-tree-node__expand-icon is-leaf"></span>

      <!-- 复选框 - 使用标准 AleCheckbox 组件 -->
      <AleCheckbox
        v-if="isCheckable"
        v-model="nodeCheckedProxy"
        :indeterminate="nodeIndeterminate"
        :disabled="nodeDisabled"
        @click.stop
      />

      <!-- 节点内容 -->
      <span class="ale-tree-node__label" :class="{ 'is-disabled': nodeDataDisabled }">
        <component
          :is="renderContent"
          v-if="renderContent"
          :node="typedNode"
          :data="nodeData"
        />
        <span v-else>{{ nodeLabel }}</span>
      </span>
    </div>

    <!-- 子节点容器 -->
    <div
      v-show="nodeExpanded"
      class="ale-tree-node__children"
      role="group"
    >
      <TreeNode
        v-for="child in nodeChildren"
        :key="childKey(child)"
        :node="child"
        :props="nodeProps"
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
        @node-click="(n: NodeType) => $emit('node-click', n)"
        @node-expand="(n: NodeType) => $emit('node-expand', n)"
        @node-collapse="(n: NodeType) => $emit('node-collapse', n)"
        @node-check="(n: NodeType, c: boolean) => $emit('node-check', n, c)"
        @node-drag-start="(n: NodeType, ev: DragEvent) => $emit('node-drag-start', n, ev)"
        @node-drag-enter="(d: NodeType, n: NodeType, ev: DragEvent) => $emit('node-drag-enter', d, n, ev)"
        @node-drag-leave="(d: NodeType, n: NodeType, ev: DragEvent) => $emit('node-drag-leave', d, n, ev)"
        @node-drag-over="(d: NodeType, n: NodeType, ev: DragEvent) => $emit('node-drag-over', d, n, ev)"
        @node-drag-end="(d: NodeType, n: NodeType | null, t: any, ev: DragEvent) => $emit('node-drag-end', d, n, t, ev)"
        @node-drop="(d: NodeType, n: NodeType, t: any, ev: DragEvent) => $emit('node-drop', d, n, t, ev)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import type { TreeNodeProps, TreeNode, TreeData } from './tree.type';
import type { Node as NodeType } from './model/node';
import { Node } from './model/node';
import AleCheckbox from '../checkbox/Checkbox.vue';

// 扩展 TreeNodeProps 类型以包含拖拽相关属性
interface ExtendedTreeNodeProps extends TreeNodeProps {
  draggable?: boolean;
  allowDrag?: (node: TreeNode) => boolean;
  allowDrop?: (draggingNode: TreeNode, dropNode: TreeNode, type: 'before' | 'after' | 'inner') => boolean;
}

const props = withDefaults(defineProps<ExtendedTreeNodeProps>(), {
  indent: 18,
  showCheckbox: false,
  checkable: false,
  draggable: false,
});

// 计算是否显示复选框
const isCheckable = computed(() => props.checkable || props.showCheckbox);

const emit = defineEmits<{
  'node-click': [node: NodeType];
  'node-expand': [node: NodeType];
  'node-collapse': [node: NodeType];
  'node-check': [node: NodeType, checked: boolean];
  'node-drag-start': [node: NodeType, ev: DragEvent];
  'node-drag-enter': [draggingNode: NodeType, dropNode: NodeType, ev: DragEvent];
  'node-drag-leave': [draggingNode: NodeType, dropNode: NodeType, ev: DragEvent];
  'node-drag-over': [draggingNode: NodeType, dropNode: NodeType, ev: DragEvent];
  'node-drag-end': [draggingNode: NodeType, dropNode: NodeType | null, dropType: 'before' | 'after' | 'inner' | undefined, ev: DragEvent];
  'node-drop': [draggingNode: NodeType, dropNode: NodeType, dropType: 'before' | 'after' | 'inner', ev: DragEvent];
}>();

// 类型转换后的节点
const typedNode = computed(() => props.node as unknown as NodeType);

// 解构节点属性
const nodeVisible = computed(() => typedNode.value.visible);
const nodeExpanded = computed(() => typedNode.value.expanded);
const nodeDisabled = computed(() => typedNode.value.disabled);
// 强制刷新计数器，用于触发 isLeaf 重新计算
const forceUpdateCounter = ref(0);

// 子节点数量引用 - 用于强制响应式更新
const childNodesCount = ref(0);

// 更新子节点数量的函数
const updateChildNodesCount = () => {
  childNodesCount.value = typedNode.value.childNodes?.length ?? 0;
};

// 初始化
updateChildNodesCount();

// 监听子节点数量变化 - 使用 getter 函数确保响应式
watch(
  () => ({
    length: typedNode.value.childNodes?.length ?? 0,
    counter: forceUpdateCounter.value
  }),
  (newVal, oldVal) => {
    if (newVal.length !== oldVal?.length || newVal.counter !== oldVal?.counter) {
      childNodesCount.value = newVal.length;
    }
  },
  { immediate: true, flush: 'sync' }
);

// 关键修复：直接监听 childNodes 数组本身，以捕获通过 props 修改数据的情况
watch(
  () => typedNode.value.childNodes,
  (newChildNodes, oldChildNodes) => {
    const newLength = newChildNodes?.length ?? 0;
    const oldLength = oldChildNodes?.length ?? 0;

    if (newLength !== oldLength) {
      childNodesCount.value = newLength;

      // 同步更新 node.isLeaf 状态
      const node = typedNode.value;
      const isLeafKey = node.store?.props?.isLeaf || 'isLeaf';
      const isUserDefined = node.data && node.data[isLeafKey] !== undefined;

      if (!isUserDefined) {
        node.isLeaf = newLength === 0;
      }

      forceUpdateCounter.value++;
    }
  },
  { flush: 'sync' }
);

// 添加一个防抖刷新函数，确保拖拽后状态正确更新
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
const debouncedRefresh = () => {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    updateChildNodesCount();
    forceUpdateCounter.value++;
  }, 50);
};

// 将防抖刷新函数暴露给外部
if (!typedNode.value._debouncedRefresh) {
  typedNode.value._debouncedRefresh = debouncedRefresh;
}

const nodeIsLeaf = computed(() => {
  const node = typedNode.value;
  // 安全检查
  if (!node) return true;

  // 访问 forceUpdateCounter 和 childNodesCount 以确保响应式追踪
  void forceUpdateCounter.value;
  void childNodesCount.value;

  // 首先检查用户是否在 data 中显式设置了 isLeaf
  // 用户显式设置具有最高优先级
  const isLeafKey = node.store?.props?.isLeaf || 'isLeaf';
  if (node.data && node.data[isLeafKey] !== undefined) {
    return !!node.data[isLeafKey];
  }

  // 其次，根据实际的子节点数量计算
  return childNodesCount.value === 0;
});

// 将刷新方法挂载到节点上，供外部调用
if (!typedNode.value._refreshLeafState) {
  typedNode.value._refreshLeafState = () => {
    forceUpdateCounter.value++;
  };
}

// 监听子节点变化事件，强制刷新叶子状态
const handleChildrenChange = (changedNode: NodeType) => {
  // 如果变化的是当前节点
  if (changedNode === typedNode.value) {
    // 同步更新子节点数量
    const newCount = changedNode.childNodes?.length ?? 0;
    childNodesCount.value = newCount;

    // 关键修复：始终更新节点的 isLeaf 属性（只要不是用户显式设置的）
    // 检查 data.isLeaf 是否被用户显式设置，如果没有，则根据实际子节点数量更新
    const isLeafKey = changedNode.store?.props?.isLeaf || 'isLeaf';
    const isUserDefined = changedNode.data && changedNode.data[isLeafKey] !== undefined;

    if (!isUserDefined) {
      // 用户没有显式设置 isLeaf，根据实际子节点数量更新
      changedNode.isLeaf = newCount === 0;
    }

    // 触发响应式更新
    forceUpdateCounter.value++;
  }
  // 如果变化的是当前节点的父节点（影响当前节点的显示）
  else if (changedNode === typedNode.value.parent) {
    // 父节点变化可能影响当前节点，也需要刷新
    updateChildNodesCount();
    forceUpdateCounter.value++;
  }
};

onMounted(() => {
  if (typedNode.value.store && typeof typedNode.value.store.on === 'function') {
    typedNode.value.store.on('node-children-change', handleChildrenChange);
  }
});

onUnmounted(() => {
  // 清理事件监听（如果 store 支持 off 方法）
  if (typedNode.value.store && typeof (typedNode.value.store as any).off === 'function') {
    (typedNode.value.store as any).off('node-children-change', handleChildrenChange);
  }
});
const nodeLabel = computed(() => typedNode.value.label);
const nodeData = computed(() => typedNode.value.data);
const nodeDataDisabled = computed(() => typedNode.value.data?.disabled);
const nodeChildren = computed(() => typedNode.value.childNodes);
const nodeLevel = computed(() => typedNode.value.level);
const nodeChecked = computed(() => typedNode.value.checked);
const nodeIndeterminate = computed(() => typedNode.value.indeterminate);
const nodeStore = computed(() => typedNode.value.store);

// Checkbox v-model 代理
const nodeCheckedProxy = computed({
  get: () => nodeChecked.value,
  set: (val: boolean) => {
    if (nodeDisabled.value) return;
    typedNode.value.setChecked(val, true);
    emit('node-check', typedNode.value, val);
  }
});

// 解构 props
const {
  renderContent,
  checkStrictly,
  expandOnClickNode,
  checkOnClickNode,
  highlightCurrent,
  indent,
  props: nodeProps,
} = props;

// 计算属性
const nodeClass = computed(() => ({
  'ale-tree-node': true,
  'is-expanded': nodeExpanded.value,
  'is-current': typedNode.value === nodeStore.value?.getCurrentNode(),
  'is-hidden': !nodeVisible.value,
  'is-focusable': !nodeDisabled.value,
  'is-checked': nodeChecked.value,
}));

// 关键修复：缩进基于节点层级
const contentStyle = computed(() => ({
  paddingLeft: `${(nodeLevel.value - 1) * indent}px`,
}));

const expandIconClass = computed(() => ({
  'ale-tree-node__expand-icon': true,
  'is-leaf': nodeIsLeaf.value,
  'is-expanded': nodeExpanded.value && !nodeIsLeaf.value,
}));

// 辅助函数
const childKey = (child: TreeNode): string | number => (child as unknown as NodeType).key;

// 方法
const handleClick = () => {
  if (nodeDisabled.value) return;
  emit('node-click', typedNode.value);
};

const handleExpandIconClick = () => {
  if (nodeIsLeaf.value) return;

  if (nodeExpanded.value) {
    typedNode.value.collapse();
    emit('node-collapse', typedNode.value);
  } else {
    typedNode.value.expand();
    emit('node-expand', typedNode.value);
  }
};

// ==================== 拖拽功能 ====================

// 当前拖拽状态 - 模块级变量，所有节点共享
let currentDropType: 'before' | 'after' | 'inner' | undefined = undefined;
let currentDragOverNode: NodeType | null = null;

/**
 * 判断是否允许拖拽当前节点
 */
const canDrag = (): boolean => {
  if (!props.draggable) return false;
  if (nodeDisabled.value || nodeDataDisabled.value) return false;
  if (props.allowDrag) {
    return props.allowDrag(props.node as unknown as TreeNode);
  }
  return true;
};

/**
 * 处理拖拽开始
 */
const handleDragStart = (event: DragEvent) => {
  if (!canDrag()) {
    event.preventDefault();
    return;
  }

  // 设置拖拽数据
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(typedNode.value.key));
  }

  // 添加拖拽中样式
  const target = event.target as HTMLElement;
  target.classList.add('is-dragging');

  emit('node-drag-start', typedNode.value, event);
};

/**
 * 计算放置位置类型
 */
const getDropType = (event: DragEvent): 'before' | 'after' | 'inner' => {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const offsetY = event.clientY - rect.top;
  const height = rect.height;

  // 计算相对于目标节点的位置
  const beforeThreshold = height * 0.25;
  const afterThreshold = height * 0.75;

  if (offsetY < beforeThreshold) {
    return 'before';
  } else if (offsetY > afterThreshold) {
    return 'after';
  } else {
    // 中间区域 - 总是允许放置为子节点
    return 'inner';
  }
};

/**
 * 判断是否允许放置
 */
const canDrop = (draggingNode: NodeType, type: 'before' | 'after' | 'inner'): boolean => {
  if (!props.allowDrop) return true;
  return props.allowDrop(
    draggingNode as unknown as TreeNode,
    props.node as unknown as TreeNode,
    type
  );
};

/**
 * 处理拖拽进入
 */
const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();

  const target = event.currentTarget as HTMLElement;
  target.classList.add('is-drop-target');

  // 获取拖拽的节点
  const draggingKey = event.dataTransfer?.getData('text/plain');
  if (!draggingKey) return;

  emit('node-drag-enter', typedNode.value, typedNode.value, event);
};

/**
 * 处理拖拽悬停
 */
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  if (!props.draggable) return;

  // 计算放置类型
  const newDropType = getDropType(event);

  // 如果放置类型变化，更新视觉反馈
  if (newDropType !== currentDropType) {
    // 清除之前的视觉标记
    clearDropIndicators();

    currentDropType = newDropType;
    currentDragOverNode = typedNode.value;

    if (currentDropType) {
      const target = event.currentTarget as HTMLElement;
      const content = target.querySelector('.ale-tree-node__content') as HTMLElement;

      if (content) {
        content.classList.add(`drop-${currentDropType}`);
      }
    }
  }

  emit('node-drag-over', typedNode.value, typedNode.value, event);
};

/**
 * 处理拖拽离开
 */
const handleDragLeave = (event: DragEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.classList.remove('is-drop-target');

  // 清除放置指示器
  clearDropIndicators();

  emit('node-drag-leave', typedNode.value, typedNode.value, event);
};

/**
 * 清除放置指示器
 */
const clearDropIndicators = () => {
  const indicators = document.querySelectorAll('.ale-tree-node__content');
  indicators.forEach((el) => {
    el.classList.remove('drop-before', 'drop-after', 'drop-inner');
  });
};

/**
 * 处理放置
 */
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  // 清除拖拽样式
  const target = event.currentTarget as HTMLElement;
  target.classList.remove('is-drop-target');

  // 获取拖拽节点的 key
  const draggingKey = event.dataTransfer?.getData('text/plain');
  if (!draggingKey) {
    clearDropIndicators();
    return;
  }

  // 获取拖拽节点
  const draggingNode = typedNode.value.store?.getNode(draggingKey);
  if (!draggingNode || draggingNode === typedNode.value) {
    clearDropIndicators();
    return;
  }

  // 从 DOM 类名获取 dropType（优先，因为 currentDropType 可能不准确）
  const content = target.querySelector('.ale-tree-node__content') as HTMLElement;
  let dropType: 'before' | 'after' | 'inner' | undefined;

  if (content) {
    if (content.classList.contains('drop-before')) {
      dropType = 'before';
    } else if (content.classList.contains('drop-after')) {
      dropType = 'after';
    } else if (content.classList.contains('drop-inner')) {
      dropType = 'inner';
    }
  }

  // 如果 DOM 类名没有 dropType，使用 currentDropType
  // 注意：只在有 currentDropType 且当前节点是 dragover 的目标节点时才使用
  if (!dropType && currentDropType && currentDragOverNode === typedNode.value) {
    dropType = currentDropType;
  }

  clearDropIndicators();

  // 检查是否可以放置
  if (dropType && !canDrop(draggingNode, dropType)) {
    emit('node-drag-end', draggingNode, null, undefined, event);
    currentDropType = undefined;
    currentDragOverNode = null;
    return;
  }

  // 执行放置操作
  if (dropType) {
    performDrop(draggingNode, typedNode.value, dropType);
    emit('node-drop', draggingNode, typedNode.value, dropType, event);
  }

  currentDropType = undefined;
  currentDragOverNode = null;
};

/**
 * 执行放置操作
 */
const performDrop = (draggingNode: NodeType, dropNode: NodeType, type: 'before' | 'after' | 'inner') => {
  const store = draggingNode.store;
  if (!store) return;

  // 检查是否拖拽到自身或子节点中
  let parent = dropNode.parent;
  while (parent) {
    if (parent === draggingNode) {
      console.warn('[Tree] Cannot drop a node into itself or its descendants');
      return;
    }
    parent = parent.parent;
  }

  // 保存完整的节点数据（包括子节点）
  // 注意：需要深拷贝，避免引用问题
  const nodeData = JSON.parse(JSON.stringify(draggingNode.data));
  const childrenKey = store.props.children || 'children';

  // 获取子节点数据
  const childNodesData = draggingNode.childNodes.map((child: NodeType) =>
    JSON.parse(JSON.stringify(child.data))
  );

  // 构建完整的数据对象，包含子节点
  const fullData = {
    ...nodeData,
    [childrenKey]: childNodesData.length > 0 ? childNodesData : (nodeData[childrenKey] || [])
  };

  // 从原位置移除节点
  const parentNode = draggingNode.parent;
  if (parentNode) {
    // 从 childNodes 中移除
    const index = parentNode.childNodes.indexOf(draggingNode);
    if (index > -1) {
      parentNode.childNodes.splice(index, 1);
    }
    // 同步从 data.children 中移除
    const parentChildren = parentNode.data[childrenKey] as TreeData[];
    if (parentChildren && Array.isArray(parentChildren)) {
      const dataIndex = parentChildren.findIndex(
        (item) => item[store.key || 'id'] === draggingNode.data[store.key || 'id']
      );
      if (dataIndex > -1) {
        parentChildren.splice(dataIndex, 1);
      }
    }
    parentNode.updateLeafState();
  }

  // 根据放置类型插入到新位置
  switch (type) {
    case 'before':
      if (dropNode.parent) {
        const dropParent = dropNode.parent;
        const index = dropParent.childNodes.indexOf(dropNode);
        // 插入到 childNodes
        const newNode = new Node({
          data: fullData,
          parent: dropParent,
          store: store,
        });
        dropParent.childNodes.splice(index, 0, newNode);
        // 同步到 data.children
        const dropParentChildren = dropParent.data[childrenKey] as TreeData[];
        if (dropParentChildren && Array.isArray(dropParentChildren)) {
          dropParentChildren.splice(index, 0, fullData);
        }
        dropParent.updateLeafState();
      }
      break;
    case 'after':
      if (dropNode.parent) {
        const dropParent = dropNode.parent;
        const index = dropNode.parent.childNodes.indexOf(dropNode);
        // 插入到 childNodes
        const newNode = new Node({
          data: fullData,
          parent: dropParent,
          store: store,
        });
        dropParent.childNodes.splice(index + 1, 0, newNode);
        // 同步到 data.children
        const dropParentChildren = dropParent.data[childrenKey] as TreeData[];
        if (dropParentChildren && Array.isArray(dropParentChildren)) {
          dropParentChildren.splice(index + 1, 0, fullData);
        }
        dropParent.updateLeafState();
      }
      break;
    case 'inner':
      // 如果目标节点是叶子节点，更新其状态
      // 关键修复：清除 data.isLeaf，让 updateLeafState 根据实际子节点数量自动管理
      // 这样可以避免 data.isLeaf 与实际子节点数量不一致的问题
      const isLeafKey = store.props.isLeaf || 'isLeaf';
      if (dropNode.data[isLeafKey] !== undefined) {
        dropNode.data[isLeafKey] = undefined;
      }
      dropNode.isLeaf = false;
      // 确保目标节点有 children 数组
      if (!dropNode.data[childrenKey]) {
        dropNode.data[childrenKey] = [];
      }
      // 插入到 childNodes
      const newNode = new Node({
        data: fullData,
        parent: dropNode,
        store: store,
      });
      dropNode.childNodes.push(newNode);
      // 同步到 data.children
      const dropNodeChildren = dropNode.data[childrenKey] as TreeData[];
      if (dropNodeChildren && Array.isArray(dropNodeChildren)) {
        dropNodeChildren.push(fullData);
      }
      dropNode.updateLeafState();
      // 展开目标节点以显示新添加的子节点
      if (!dropNode.expanded) {
        dropNode.expand();
      }
      break;
  }

  // 强制刷新所有相关节点的叶子状态
  nextTick(() => {
    // 刷新原父节点
    if (parentNode && parentNode._debouncedRefresh) {
      parentNode._debouncedRefresh();
    }
    // 刷新目标节点
    if (dropNode._debouncedRefresh) {
      dropNode._debouncedRefresh();
    }
    // 刷新拖拽节点本身
    if (draggingNode._debouncedRefresh) {
      draggingNode._debouncedRefresh();
    }
  });
};

/**
 * 处理拖拽结束
 */
const handleDragEnd = (event: DragEvent) => {
  // 清除所有拖拽相关样式
  document.querySelectorAll('.ale-tree-node').forEach((el) => {
    el.classList.remove('is-dragging', 'is-drop-target');
  });
  clearDropIndicators();

  // 获取拖拽节点的 key
  const draggingKey = event.dataTransfer?.getData('text/plain');
  const draggingNode = draggingKey ? typedNode.value.store?.getNode(draggingKey) : typedNode.value;

  emit('node-drag-end', draggingNode || typedNode.value, null, currentDropType, event);

  currentDropType = undefined;
  currentDragOverNode = null;
};
</script>

<template>
  <div class="component-demo-view">
    <!-- 头部区域 -->
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Tree 树形控件</h1>
      <p class="component-demo-view__description">
        用于展示层级结构的数据，支持展开/收起、选择、勾选、搜索、懒加载等功能。
      </p>
    </div>

    <!-- 基础用法 -->
    <DemoSection
      title="基础用法"
      description="基本的树形结构展示，点击节点可展开/收起子节点。"
    >
      <AleTree :data="basicData" style="width: 300px;" />
      <template #code>
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 复选框 -->
    <DemoSection
      title="复选框"
      description="使用 checkable 属性启用复选框，支持级联选择。"
    >
      <AleTree
        :data="basicData"
        checkable
        :default-checked-keys="['1-1']"
        style="width: 300px;"
        @check="handleCheck"
      />
      <template #code>
        <CodeBlock :code="checkableCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 默认展开 -->
    <DemoSection
      title="默认展开"
      description="使用 default-expand-all 或 default-expanded-keys 设置默认展开状态。"
    >
      <AleTree :data="basicData" default-expand-all show-line style="width: 300px;" />
      <template #code>
        <CodeBlock :code="expandCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 搜索功能 -->
    <DemoSection
      title="搜索功能"
      description="使用 searchable 属性启用搜索，支持高亮匹配内容。"
    >
      <AleTree
        :data="basicData"
        searchable
        highlight-current
        :default-expand-all="true"
        style="width: 300px;"
      />
      <template #code>
        <CodeBlock :code="searchableCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 图标显示 -->
    <DemoSection
      title="显示图标"
      description="使用 show-icon 属性显示文件夹和文件图标。"
    >
      <AleTree :data="fileData" show-icon show-line style="width: 300px;" />
      <template #code>
        <CodeBlock :code="showIconCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 多选模式 -->
    <DemoSection
      title="多选模式"
      description="使用 multiple 属性启用多选，可配合 checkable 使用。"
    >
      <AleTree :data="basicData" multiple checkable default-expand-all style="width: 300px;" />
      <template #code>
        <CodeBlock :code="multipleCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 禁用节点 -->
    <DemoSection
      title="禁用节点"
      description="通过设置节点的 disabled 或 disableCheckbox 属性禁用。"
    >
      <AleTree :data="disabledData" checkable default-expand-all style="width: 300px;" />
      <template #code>
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 动态操作 -->
    <DemoSection
      title="动态操作"
      description="通过 ref 获取组件实例，调用方法动态操作树。"
    >
      <div class="demo-actions">
        <AleButton size="small" @click="expandAll">全部展开</AleButton>
        <AleButton size="small" @click="collapseAll">全部收起</AleButton>
        <AleButton size="small" @click="getSelected">获取选中</AleButton>
        <AleButton size="small" @click="addNode">添加节点</AleButton>
        <AleButton size="small" type="danger" @click="removeNode">删除节点</AleButton>
      </div>
      <AleTree
        ref="treeRef"
        :data="dynamicData"
        checkable
        show-line
        style="width: 300px; margin-top: 16px;"
      />
      <div v-if="operationResult" class="operation-result">
        <strong>操作结果：</strong>{{ operationResult }}
      </div>
      <template #code>
        <CodeBlock :code="dynamicCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 手风琴模式 -->
    <DemoSection
      title="手风琴模式"
      description="使用 accordion 属性，每次只能展开一个同级节点。"
    >
      <AleTree :data="basicData" accordion show-line style="width: 300px;" />
      <template #code>
        <CodeBlock :code="accordionCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 可拖拽 -->
    <DemoSection
      title="可拖拽"
      description="使用 draggable 属性启用拖拽功能，支持节点拖拽排序、跨层级拖拽。可通过 allowDrag 和 allowDrop 自定义拖拽限制。"
    >
      <AleTree
        :data="dragData"
        draggable
        default-expand-all
        show-line
        style="width: 300px;"
        @node-drag-start="handleDragStart"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
      />
      <template #code>
        <CodeBlock :code="draggableCode" language="vue" title="示例代码" />
      </template>
    </DemoSection>

    <!-- 属性说明 -->
    <PropsSection />

    <!-- 事件说明 -->
    <EventsSection />

    <!-- 方法说明 -->
    <MethodsSection />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTree, AleButton } from 'ale-ui';
import type { TreeData, TreeNode } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';
import DemoSection from './tree-examples/components/DemoSection.vue';
import PropsSection from './tree-examples/components/PropsSection.vue';
import EventsSection from './tree-examples/components/EventsSection.vue';
import MethodsSection from './tree-examples/components/MethodsSection.vue';

// 基础数据
const basicData: TreeData[] = [
  {
    id: '1',
    label: '部门 A',
    children: [
      { id: '1-1', label: '小组 A1', children: [{ id: '1-1-1', label: '员工 A11' }, { id: '1-1-2', label: '员工 A12' }] },
      { id: '1-2', label: '小组 A2' }
    ]
  },
  { id: '2', label: '部门 B', children: [{ id: '2-1', label: '小组 B1' }, { id: '2-2', label: '小组 B2' }] },
  { id: '3', label: '部门 C', isLeaf: true }
];

// 文件数据（用于图标示例）
const fileData: TreeData[] = [
  { id: '1', label: '文件夹 A', children: [{ id: '1-1', label: '文件 1-1.txt' }, { id: '1-2', label: '文件 1-2.txt' }] },
  { id: '2', label: '文件 2.txt', isLeaf: true }
];

// 禁用数据
const disabledData: TreeData[] = [
  { id: '1', label: '可选项 1', children: [{ id: '1-1', label: '子项 1-1' }, { id: '1-2', label: '禁用子项', disabled: true }, { id: '1-3', label: '禁用复选框', disableCheckbox: true }] },
  { id: '2', label: '禁用项', disabled: true }
];

// 动态数据
const dynamicData = ref<TreeData[]>([
  { id: '1', label: '可编辑节点', children: [{ id: '1-1', label: '子节点 1' }, { id: '1-2', label: '子节点 2' }] },
  { id: '2', label: '另一个节点' }
]);

// 拖拽数据
const dragData = ref<TreeData[]>([
  {
    id: '1',
    label: '文件夹 A',
    children: [
      { id: '1-1', label: '文件 A1' },
      { id: '1-2', label: '文件 A2' }
    ]
  },
  {
    id: '2',
    label: '文件夹 B',
    children: [
      { id: '2-1', label: '文件 B1' }
    ]
  },
  { id: '3', label: '文件夹 C', isLeaf: true }
]);

// refs
const treeRef = ref<InstanceType<typeof AleTree>>();
const operationResult = ref('');

// 方法
const expandAll = () => { treeRef.value?.expandAll(); operationResult.value = '已展开所有节点'; };
const collapseAll = () => { treeRef.value?.collapseAll(); operationResult.value = '已收起所有节点'; };
const getSelected = () => { const checked = treeRef.value?.getCheckedNodes(); operationResult.value = `已勾选: ${checked?.map((n: TreeData) => n.label).join(', ') || '无'}`; };

let nodeCount = 0;
const addNode = () => {
  nodeCount++;
  const parentNode = treeRef.value?.getNode('1');
  if (parentNode) {
    treeRef.value?.append({ id: `new-${nodeCount}`, label: `新节点 ${nodeCount}` }, parentNode);
  }
  operationResult.value = `已添加: 新节点 ${nodeCount}`;
};
const removeNode = () => {
  const node = treeRef.value?.getNode('1-1');
  if (node) {
    treeRef.value?.remove(node);
  }
  operationResult.value = '已删除节点: 子节点 1';
};
const handleCheck = (data: TreeData, checkedInfo: { checkedKeys: (string | number)[]; checkedNodes: TreeData[]; halfCheckedKeys: (string | number)[]; halfCheckedNodes: TreeData[] }) => {
  console.log('Checked:', data, checkedInfo);
};

// 拖拽事件处理
const handleDragStart = (node: TreeNode) => {
  console.log('开始拖拽:', node.data.label);
};
const handleDragEnd = (draggingNode: TreeNode, dropNode: TreeNode | null, dropType: 'before' | 'after' | 'inner' | undefined) => {
  console.log('拖拽结束:', draggingNode.data.label, dropType, dropNode?.data.label);
};
const handleDrop = (draggingNode: TreeNode, dropNode: TreeNode | null, dropType: 'before' | 'after' | 'inner' | undefined) => {
  console.log('放置成功:', draggingNode.data.label, dropType, dropNode?.data.label);
};

// 代码示例字符串
const basicCode = `<template>
  <AleTree :data="data" />
</template>`;

const checkableCode = `<template>
  <AleTree
    :data="data"
    checkable
    :default-checked-keys="['1-1']"
    @check="handleCheck"
  />
</template>`;

const expandCode = `<template>
  <!-- 全部展开 -->
  <AleTree :data="data" default-expand-all />
  
  <!-- 指定展开 -->
  <AleTree :data="data" :default-expanded-keys="['1']" />
</template>`;

const searchableCode = `<template>
  <AleTree
    :data="data"
    searchable
    highlight-current
    :default-expand-all="true"
  />
</template>`;

const showIconCode = `<template>
  <AleTree :data="data" show-icon show-line />
</template>`;

const multipleCode = `<template>
  <AleTree :data="data" multiple checkable default-expand-all />
</template>`;

const disabledCode = `<template>
  <AleTree :data="disabledData" checkable default-expand-all />
</template>

<script setup>
const disabledData = [
  {
    id: '1',
    label: '可选项 1',
    children: [
      { id: '1-1', label: '子项 1-1' },
      { id: '1-2', label: '禁用子项', disabled: true },
      { id: '1-3', label: '禁用复选框', disableCheckbox: true }
    ]
  },
  { id: '2', label: '禁用项', disabled: true }
];
<\/script>`;

const dynamicCode = `<template>
  <div>
    <AleButton @click="expandAll">全部展开</AleButton>
    <AleButton @click="collapseAll">全部收起</AleButton>
    <AleButton @click="getSelected">获取选中</AleButton>
    <AleButton @click="addNode">添加节点</AleButton>
    <AleButton @click="removeNode">删除节点</AleButton>
  </div>
  <AleTree ref="treeRef" :data="data" checkable show-line />
</template>

<script setup>
import { ref } from 'vue';

const treeRef = ref();

const expandAll = () => treeRef.value?.expandAll();
const collapseAll = () => treeRef.value?.collapseAll();
const getSelected = () => {
  const nodes = treeRef.value?.getCheckedNodes();
  console.log(nodes);
};
const addNode = () => {
  treeRef.value?.append({ id: 'new', label: '新节点' }, '1');
};
const removeNode = () => {
  treeRef.value?.remove('1-1');
};
<\/script>`;

const accordionCode = `<template>
  <AleTree :data="data" accordion show-line />
</template>`;

const draggableCode = `<template>
  <AleTree
    :data="data"
    draggable
    default-expand-all
    show-line
    @node-drag-start="handleDragStart"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    id: '1',
    label: '文件夹 A',
    children: [
      { id: '1-1', label: '文件 A1' },
      { id: '1-2', label: '文件 A2' }
    ]
  },
  {
    id: '2',
    label: '文件夹 B',
    children: [{ id: '2-1', label: '文件 B1' }]
  },
  { id: '3', label: '文件夹 C', isLeaf: true }
]);

const handleDragStart = (node) => {
  console.log('开始拖拽:', node.label);
};

const handleDragEnd = (draggingNode, dropNode, dropType) => {
  console.log('拖拽结束:', draggingNode.label, dropType, dropNode?.label);
};

const handleDrop = (draggingNode, dropNode, dropType) => {
  console.log('放置成功:', draggingNode.label, dropType, dropNode.label);
};
<\/script>

<!-- 自定义拖拽限制示例 -->
<template>
  <AleTree
    :data="data"
    draggable
    :allow-drag="allowDrag"
    :allow-drop="allowDrop"
    default-expand-all
  />
</template>

<script setup>
// 只有非禁用节点可以拖拽
const allowDrag = (node) => !node.data?.disabled;

// 只能放置到文件夹内，不能放置到文件上
const allowDrop = (draggingNode, dropNode, type) => {
  return !dropNode.data?.isLeaf || type !== 'inner';
};
<\/script>`;
</script>

<style scoped>
.component-demo-view {
  max-width: 1000px;
  margin: 0 auto;
}

.component-demo-view__header {
  margin-bottom: 48px;
}

.component-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.component-demo-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.operation-result {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: var(--color-primary-50);
  border-radius: var(--radius-base);
  font-size: 14px;
  color: var(--color-text-primary);
}
</style>

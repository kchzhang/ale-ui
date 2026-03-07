<template>
  <div>
    <AleButton @click="expandAll">全部展开</AleButton>
    <AleButton @click="collapseAll">全部收起</AleButton>
    <AleButton @click="getSelected">获取选中</AleButton>
    <AleButton @click="addNode">添加节点</AleButton>
    <AleButton @click="removeNode">删除节点</AleButton>
  </div>
  <AleTree ref="treeRef" :data="data" checkable show-line />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTree, AleButton } from 'ale-ui';
import type { TreeData } from 'ale-ui';

const treeRef = ref<InstanceType<typeof AleTree>>();

const data = ref<TreeData[]>([
  {
    id: '1',
    label: '可编辑节点',
    children: [
      { id: '1-1', label: '子节点 1' },
      { id: '1-2', label: '子节点 2' }
    ]
  },
  { id: '2', label: '另一个节点' }
]);

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
  const node = treeRef.value?.getNode('1-1');
  if (node) {
    treeRef.value?.remove(node);
  }
};
</script>

<template>
  <AleTree
    :data="data"
    checkable
    :default-checked-keys="['1-1']"
    @check="handleCheck"
  />
</template>

<script setup lang="ts">
import { AleTree } from 'ale-ui';
import type { TreeData } from 'ale-ui';

const data: TreeData[] = [
  {
    id: '1',
    label: '部门 A',
    children: [
      { id: '1-1', label: '小组 A1' },
      { id: '1-2', label: '小组 A2' }
    ]
  },
  {
    id: '2',
    label: '部门 B',
    children: [
      { id: '2-1', label: '小组 B1' }
    ]
  }
];

const handleCheck = (data: TreeData, checkedInfo: { checkedKeys: (string | number)[]; checkedNodes: TreeData[]; halfCheckedKeys: (string | number)[]; halfCheckedNodes: TreeData[] }) => {
  console.log('Checked data:', data);
  console.log('Checked keys:', checkedInfo.checkedKeys);
  console.log('Checked nodes:', checkedInfo.checkedNodes);
};
</script>

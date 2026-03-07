<template>
  <AleTree :data="data" />
</template>

<script setup lang="ts">
import { AleTree } from 'ale-ui';
import type { TreeData } from 'ale-ui';

const data: TreeData[] = [
  {
    id: '1',
    label: '部门 A',
    children: [
      {
        id: '1-1',
        label: '小组 A1',
        children: [
          { id: '1-1-1', label: '员工 A11' },
          { id: '1-1-2', label: '员工 A12' }
        ]
      },
      { id: '1-2', label: '小组 A2' }
    ]
  },
  {
    id: '2',
    label: '部门 B',
    children: [
      { id: '2-1', label: '小组 B1' },
      { id: '2-2', label: '小组 B2' }
    ]
  }
];
</script>

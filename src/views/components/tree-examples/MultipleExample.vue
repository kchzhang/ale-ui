<template>
  <AleTree :data="data" multiple checkable default-expand-all />
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
</script>

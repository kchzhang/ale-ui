<template>
  <AleTree :data="data" show-icon show-line />
</template>

<script setup lang="ts">
import { AleTree } from 'ale-ui';
import type { TreeData } from 'ale-ui';

const data: TreeData[] = [
  {
    id: '1',
    label: '文件夹 A',
    children: [
      { id: '1-1', label: '文件 1-1.txt' },
      { id: '1-2', label: '文件 1-2.txt' }
    ]
  },
  {
    id: '2',
    label: '文件 2.txt',
    isLeaf: true
  }
];
</script>

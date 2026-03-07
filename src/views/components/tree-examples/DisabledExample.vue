<template>
  <AleTree :data="disabledData" checkable default-expand-all />
</template>

<script setup lang="ts">
import { AleTree } from 'ale-ui';
import type { TreeData } from 'ale-ui';

const disabledData: TreeData[] = [
  {
    id: '1',
    label: '可选项 1',
    children: [
      { id: '1-1', label: '子项 1-1' },
      { id: '1-2', label: '禁用子项', disabled: true },
      { id: '1-3', label: '禁用复选框', disableCheckbox: true }
    ]
  },
  {
    id: '2',
    label: '禁用项',
    disabled: true
  }
];
</script>

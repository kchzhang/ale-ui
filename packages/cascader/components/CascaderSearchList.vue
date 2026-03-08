<template>
  <div class="ale-cascader__search-list">
    <div
      v-for="item in filteredOptions"
      :key="item.path.map(n => n.value).join('-')"
      class="ale-cascader__search-item"
      :class="{ 'is-selected': isItemSelected(item.path) }"
      @click="handleSelect(item.path)"
    >
      <div class="ale-cascader__search-item-label">
        <span
          v-for="(node, index) in item.path"
          :key="node.value"
        >
          <span :class="{ 'ale-cascader__search-item-highlight': index === item.matchIndex }">
            {{ node.label }}
          </span>
          <span v-if="index < item.path.length - 1">{{ separator }}</span>
        </span>
      </div>
      <div class="ale-cascader__search-item-path">
        {{ item.path.map(n => n.label).join(` ${separator} `) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CascaderOption } from '../types';

interface SearchItem {
  path: CascaderOption[];
  matchIndex: number;
}

interface CascaderSearchListProps {
  filteredOptions: SearchItem[];
  selectedPath: CascaderOption[];
  separator: string;
}

const props = defineProps<CascaderSearchListProps>();

const emit = defineEmits<{
  (e: 'select', path: CascaderOption[]): void;
}>();

const isItemSelected = (path: CascaderOption[]) => {
  if (props.selectedPath.length !== path.length) return false;
  return path.every((node, index) => node.value === props.selectedPath[index]?.value);
};

const handleSelect = (path: CascaderOption[]) => {
  emit('select', path);
};
</script>

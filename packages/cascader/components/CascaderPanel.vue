<template>
  <div class="ale-cascader__panel">
    <CascaderMenu
      v-for="(menu, menuIndex) in displayMenus"
      :key="menuIndex"
      :options="menu"
      :menu-index="menuIndex"
      :active-path="activePath"
      :selected-path="selectedPath"
      :selected-paths="selectedPaths"
      :check-strictly="checkStrictly"
      :is-check-strictly-mode="isCheckStrictlyMode"
      :is-multiple-mode="isMultipleMode"
      @option-click="handleOptionClick"
      @radio-change="handleRadioChange"
      @checkbox-change="handleCheckboxChange"
      @option-mouseenter="handleOptionMouseEnter"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CascaderOption, CascaderCheckStrictly } from '../types';
import CascaderMenu from './CascaderMenu.vue';

interface Props {
  options: CascaderOption[];
  activePath: CascaderOption[];
  selectedPath: CascaderOption[];
  selectedPaths: CascaderOption[][];
  checkStrictly: CascaderCheckStrictly;
  isCheckStrictlyMode: boolean;
  isMultipleMode: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'option-click', option: CascaderOption, menuIndex: number): void;
  (e: 'radio-change', option: CascaderOption, menuIndex: number): void;
  (e: 'checkbox-change', option: CascaderOption, menuIndex: number): void;
  (e: 'option-mouseenter', option: CascaderOption, menuIndex: number): void;
}>();

// 计算显示的菜单列表
const displayMenus = computed(() => {
  const menus: CascaderOption[][] = [props.options];

  for (const option of props.activePath) {
    if (option.children && option.children.length > 0) {
      menus.push(option.children);
    }
  }

  return menus;
});

const handleOptionClick = (option: CascaderOption, menuIndex: number) => {
  emit('option-click', option, menuIndex);
};

const handleRadioChange = (option: CascaderOption, menuIndex: number) => {
  emit('radio-change', option, menuIndex);
};

const handleCheckboxChange = (option: CascaderOption, menuIndex: number) => {
  emit('checkbox-change', option, menuIndex);
};

const handleOptionMouseEnter = (option: CascaderOption, menuIndex: number) => {
  emit('option-mouseenter', option, menuIndex);
};
</script>

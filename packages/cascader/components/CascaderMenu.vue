<template>
  <AleScroll
    class="ale-cascader__menu"
    direction="vertical"
    :max-height="300"
    size="small"
    theme="default"
  >
    <ul class="ale-cascader__list" role="menu">
      <OptionItem
        v-for="option in options"
        :key="option.value"
        :option="option"
        :menu-index="menuIndex"
        :is-active="isOptionActive(option)"
        :is-selected="isOptionSelected(option)"
        :is-checked="isOptionChecked(option)"
        :is-in-path="isOptionInPath(option)"
        :check-strictly="checkStrictly"
        :is-check-strictly-mode="isCheckStrictlyMode"
        @click="handleOptionClick"
        @radio-change="handleRadioChange"
        @checkbox-change="handleCheckboxChange"
        @mouseenter="handleOptionMouseEnter"
      />
    </ul>
  </AleScroll>
</template>

<script setup lang="ts">
import type { CascaderOption, CascaderCheckStrictly } from '../types';
import { AleScroll } from '../../scroll';
import OptionItem from './CascaderOption.vue';

interface CascaderMenuProps {
  options: CascaderOption[];
  menuIndex: number;
  activePath: CascaderOption[];
  selectedPath: CascaderOption[];
  selectedPaths: CascaderOption[][];
  checkStrictly: CascaderCheckStrictly;
  isCheckStrictlyMode: boolean;
  isMultipleMode: boolean;
}

const props = defineProps<CascaderMenuProps>();

const emit = defineEmits<{
  (e: 'option-click', option: CascaderOption, menuIndex: number): void;
  (e: 'radio-change', option: CascaderOption, menuIndex: number): void;
  (e: 'checkbox-change', option: CascaderOption, menuIndex: number): void;
  (e: 'option-mouseenter', option: CascaderOption, menuIndex: number): void;
}>();

// 检查选项是否激活
const isOptionActive = (option: CascaderOption) => {
  return props.activePath[props.menuIndex]?.value === option.value;
};

// 检查选项是否选中（单选模式）
const isOptionSelected = (option: CascaderOption) => {
  if (props.isMultipleMode) return false;
  if (props.selectedPath.length === 0) return false;

  // 在 checkStrictly="single" 模式下，只有最后一个节点应该显示为选中
  if (props.checkStrictly === 'single') {
    const lastSelectedNode = props.selectedPath[props.selectedPath.length - 1];
    return lastSelectedNode?.value === option.value;
  }

  return props.selectedPath[props.menuIndex]?.value === option.value;
};

// 检查选项是否在选中路径上
const isOptionInPath = (option: CascaderOption) => {
  if (props.isMultipleMode) return false;
  if (props.selectedPath.length === 0) return false;
  return props.selectedPath[props.menuIndex]?.value === option.value;
};

// 检查选项是否被选中（多选模式）
const isOptionChecked = (option: CascaderOption) => {
  if (!props.isMultipleMode) return false;

  const currentPath = [...props.activePath.slice(0, props.menuIndex), option];
  const currentValues = currentPath.map(opt => opt.value);

  return props.selectedPaths.some(path => {
    if (path.length !== currentPath.length) return false;
    return path.every((node, index) => node.value === currentValues[index]);
  });
};

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

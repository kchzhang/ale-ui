<template>
  <li
    class="ale-cascader__option"
    :class="optionClass"
    role="menuitem"
    :tabindex="option.disabled ? -1 : 0"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @keydown.enter="handleClick"
  >
    <!-- 单选模式：显示 Radio -->
    <AleRadio
      v-if="checkStrictly === 'single'"
      :model-value="isSelected"
      :disabled="option.disabled"
      size="small"
      @click.stop
      @change="handleRadioChange"
    />
    <!-- 多选模式：显示 Checkbox -->
    <AleCheckbox
      v-else-if="checkStrictly === 'multiple'"
      :model-value="isChecked"
      :disabled="option.disabled"
      size="small"
      @click.stop
      @change="handleCheckboxChange"
    />
    <!-- 选项文本 -->
    <span class="ale-cascader__option-label">{{ option.label }}</span>
    <!-- 选中图标（非任意选模式且为叶子节点） -->
    <span
      v-if="!isCheckStrictlyMode && isSelected && !hasChildren"
      class="ale-cascader__check-icon"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
    <!-- 箭头图标（有子节点时显示） -->
    <span v-if="hasChildren" class="ale-cascader__option-arrow">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CascaderOption } from '../types';
import { Radio as AleRadio } from '../../radio';
import { AleCheckbox } from '../../checkbox';

interface Props {
  option: CascaderOption;
  menuIndex: number;
  isActive: boolean;
  isSelected: boolean;
  isChecked: boolean;
  isInPath: boolean;
  checkStrictly: 'single' | 'multiple' | false;
  isCheckStrictlyMode: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', option: CascaderOption, menuIndex: number): void;
  (e: 'radio-change', option: CascaderOption, menuIndex: number): void;
  (e: 'checkbox-change', option: CascaderOption, menuIndex: number): void;
  (e: 'mouseenter', option: CascaderOption, menuIndex: number): void;
}>();

const hasChildren = computed(() => {
  return props.option.children && props.option.children.length > 0;
});

const optionClass = computed(() => ({
  'is-active': props.isActive,
  'is-selected': props.isSelected,
  'is-in-path': props.isInPath,
  'is-disabled': props.option.disabled,
  'is-checked': props.isChecked,
  'is-selectable': props.isCheckStrictlyMode && hasChildren.value
}));

const handleClick = () => {
  emit('click', props.option, props.menuIndex);
};

const handleRadioChange = () => {
  emit('radio-change', props.option, props.menuIndex);
};

const handleCheckboxChange = () => {
  emit('checkbox-change', props.option, props.menuIndex);
};

const handleMouseEnter = () => {
  emit('mouseenter', props.option, props.menuIndex);
};
</script>

<template>
  <teleport to="body">
    <transition name="ale-cascader-dropdown">
      <div
        v-show="visible"
        ref="dropdownRef"
        class="ale-cascader__dropdown"
        :style="dropdownStyle"
        @click.stop
      >
        <!-- 加载中状态 -->
        <div v-if="loading" class="ale-cascader__loading">
          <span class="ale-cascader__loading-spinner"></span>
          <span class="ale-cascader__loading-text">{{ loadingText || t('ale.status.loading') }}</span>
        </div>

        <!-- 搜索结果列表 -->
        <CascaderSearchList
          v-else-if="showSearchResults"
          :filtered-options="filteredOptions"
          :selected-path="selectedPath"
          :separator="separator"
          @select="handleSearchSelect"
        />

        <!-- 空数据状态（搜索无结果） -->
        <div v-else-if="showSearchEmpty" class="ale-cascader__empty">
          {{ noDataText || t('select.emptyText') }}
        </div>

        <!-- 空数据状态 -->
        <div v-else-if="showEmpty" class="ale-cascader__empty">
          {{ noDataText || t('select.emptyText') }}
        </div>

        <!-- 级联面板 -->
        <CascaderPanel
          v-else
          :options="options"
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
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CascaderOption, CascaderCheckStrictly } from '../types';
import CascaderPanel from './CascaderPanel.vue';
import CascaderSearchList from './CascaderSearchList.vue';
import { useLocale } from '../../locale';

interface SearchItem {
  path: CascaderOption[];
  matchIndex: number;
}

// 国际化
const { t } = useLocale();

export interface CascaderDropdownProps {
  visible: boolean;
  loading?: boolean;
  loadingText?: string;
  noDataText?: string;
  filterable: boolean;
  searchQuery: string;
  filteredOptions: SearchItem[];
  options: CascaderOption[];
  activePath: CascaderOption[];
  selectedPath: CascaderOption[];
  selectedPaths: CascaderOption[][];
  checkStrictly: CascaderCheckStrictly;
  isCheckStrictlyMode: boolean;
  isMultipleMode: boolean;
  separator: string;
  triggerRect: DOMRect | null;
}

const props = withDefaults(defineProps<CascaderDropdownProps>(), {
  loading: false
});

const emit = defineEmits<{
  (e: 'search-select', path: CascaderOption[]): void;
  (e: 'option-click', option: CascaderOption, menuIndex: number): void;
  (e: 'radio-change', option: CascaderOption, menuIndex: number): void;
  (e: 'checkbox-change', option: CascaderOption, menuIndex: number): void;
  (e: 'option-mouseenter', option: CascaderOption, menuIndex: number): void;
}>();

const dropdownRef = ref<HTMLDivElement>();

// 下拉菜单样式
const dropdownStyle = computed(() => {
  if (!props.triggerRect) return {} as Record<string, string>;
  const rect = props.triggerRect;
  return {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    zIndex: '9999'
  } as Record<string, string>;
});

// 是否显示搜索结果
const showSearchResults = computed(() => {
  return props.filterable && props.searchQuery && props.filteredOptions.length > 0;
});

// 是否显示搜索空状态
const showSearchEmpty = computed(() => {
  return props.filterable && props.searchQuery && props.filteredOptions.length === 0;
});

// 是否显示空状态
const showEmpty = computed(() => {
  return !props.loading && props.options.length === 0;
});

const handleSearchSelect = (path: CascaderOption[]) => {
  emit('search-select', path);
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

// 检查点击是否在 dropdown 内
const contains = (target: Node) => {
  return dropdownRef.value?.contains(target) || false;
};

defineExpose({
  contains
});
</script>

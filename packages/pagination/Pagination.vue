<template>
  <div :class="paginationClass">
    <!-- 总条数 -->
    <span v-if="showTotal" class="ale-pagination__total">
      <template v-if="totalRender && typeof totalRender === 'function'">
        {{ totalRender(total, [startItem, endItem]) }}
      </template>
      <template v-else>
        共 {{ total }} 条
      </template>
    </span>

    <!-- 每页条数选择器 -->
    <AleSelect
      v-if="showSizeChanger"
      :model-value="pageSize"
      :disabled="disabled"
      class="ale-pagination__size-changer"
      :size="selectSize"
      @update:model-value="handleSizeChange"
    >
      <AleOption
        v-for="opt in pageSizeOptions"
        :key="opt"
        :label="`${opt} 条/页`"
        :value="opt"
      />
    </AleSelect>

    <!-- 上一页 -->
    <button
      type="button"
      :disabled="currentPage <= 1 || disabled"
      :class="['ale-pagination__btn', 'ale-pagination__prev']"
      @click="handlePrev"
    >
      <slot name="prev">
        <span class="ale-pagination__btn-icon">‹</span>
        <span v-if="prevText" class="ale-pagination__btn-text">{{ prevText }}</span>
      </slot>
    </button>

    <!-- 页码 -->
    <ul v-if="!simple" class="ale-pagination__pager">
      <!-- 第一页 -->
      <li
        v-if="showFirstPage"
        :class="['ale-pagination__item', { 'is-active': currentPage === 1 }]"
        @click="handlePageChange(1)"
      >
        1
      </li>

      <!-- 向前更多 -->
      <li
        v-if="showPrevMore"
        :class="['ale-pagination__item', 'ale-pagination__more', { 'is-active': isPrevMoreActive }]"
        @mouseenter="isPrevMoreActive = true"
        @mouseleave="isPrevMoreActive = false"
        @click="handlePrevMore"
      >
        <span class="ale-pagination__more-icon">{{ isPrevMoreActive ? '«' : '...' }}</span>
      </li>

      <!-- 页码列表 -->
      <li
        v-for="page in pageList"
        :key="page"
        :class="['ale-pagination__item', { 'is-active': currentPage === page }]"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </li>

      <!-- 向后更多 -->
      <li
        v-if="showNextMore"
        :class="['ale-pagination__item', 'ale-pagination__more', { 'is-active': isNextMoreActive }]"
        @mouseenter="isNextMoreActive = true"
        @mouseleave="isNextMoreActive = false"
        @click="handleNextMore"
      >
        <span class="ale-pagination__more-icon">{{ isNextMoreActive ? '»' : '...' }}</span>
      </li>

      <!-- 最后一页 -->
      <li
        v-if="showLastPage"
        :class="['ale-pagination__item', { 'is-active': currentPage === totalPages }]"
        @click="handlePageChange(totalPages)"
      >
        {{ totalPages }}
      </li>
    </ul>

    <!-- 简洁模式 -->
    <div v-else class="ale-pagination__simple">
      <input
        :value="currentPage"
        type="number"
        min="1"
        :max="totalPages"
        :disabled="disabled"
        class="ale-pagination__simple-input"
        @keyup.enter="handleSimpleChange"
      >
      <span class="ale-pagination__simple-separator">/</span>
      <span class="ale-pagination__simple-total">{{ totalPages }}</span>
    </div>

    <!-- 下一页 -->
    <button
      type="button"
      :disabled="currentPage >= totalPages || disabled"
      :class="['ale-pagination__btn', 'ale-pagination__next']"
      @click="handleNext"
    >
      <slot name="next">
        <span v-if="nextText" class="ale-pagination__btn-text">{{ nextText }}</span>
        <span class="ale-pagination__btn-icon">›</span>
      </slot>
    </button>

    <!-- 快速跳转 -->
    <div v-if="showJumper && !simple" class="ale-pagination__jumper">
      <span class="ale-pagination__jumper-text">跳至</span>
      <input
        v-model.number="jumpPage"
        type="number"
        min="1"
        :max="totalPages"
        :disabled="disabled"
        class="ale-pagination__jumper-input"
        @keyup.enter="handleJump"
      >
      <span class="ale-pagination__jumper-text">页</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import './Pagination.css';
import { ref, computed, watch } from 'vue';
import { AleSelect, AleOption } from '../select';
import type { PaginationProps, PaginationEmits, PaginationExpose } from './types';

const props = withDefaults(defineProps<PaginationProps>(), {
  current: 1,
  pageSize: 10,
  pageSizeOptions: () => [10, 20, 50, 100],
  showTotal: true,
  showJumper: false,
  showSizeChanger: false,
  size: 'medium',
  simple: false,
  disabled: false,
  layout: 'total, prev, pager, next',
  prevText: '',
  nextText: ''
});

const emit = defineEmits<PaginationEmits>();

// ==================== State ====================
const currentPage = ref(props.current);
const pageSize = ref(props.pageSize);
const jumpPage = ref(props.current);
const isPrevMoreActive = ref(false);
const isNextMoreActive = ref(false);

// ==================== Computed ====================

/** 类名 */
const paginationClass = computed(() => [
  'ale-pagination',
  `ale-pagination--${props.size}`,
  {
    'ale-pagination--simple': props.simple,
    'ale-pagination--disabled': props.disabled
  }
]);

/** Select 组件尺寸 */
const selectSize = computed(() => {
  const sizeMap: Record<string, 'small' | 'medium' | 'large'> = {
    small: 'small',
    medium: 'medium',
    large: 'large'
  };
  return sizeMap[props.size] || 'medium';
});

/** 总页数 */
const totalPages = computed(() => {
  if (props.total <= 0) return 1;
  return Math.ceil(props.total / pageSize.value);
});

/** 当前页起始条目 */
const startItem = computed(() => {
  if (props.total === 0) return 0;
  return (currentPage.value - 1) * pageSize.value + 1;
});

/** 当前页结束条目 */
const endItem = computed(() => {
  return Math.min(currentPage.value * pageSize.value, props.total);
});

/** 显示的页码列表 */
const pageList = computed(() => {
  const pages: number[] = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const pageCount = 7; // 最多显示7个页码

  if (total <= pageCount) {
    // 总页数少，全部显示
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // 需要折叠
    let start = Math.max(1, current - 3);
    let end = Math.min(total, current + 3);

    // 调整边界
    if (current - 1 < 3) {
      end = pageCount - 1;
    }
    if (total - current < 3) {
      start = total - pageCount + 2;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
});

/** 是否显示第一页 */
const showFirstPage = computed(() => {
  return totalPages.value > 7 && pageList.value[0]! > 1;
});

/** 是否显示最后一页 */
const showLastPage = computed(() => {
  return totalPages.value > 7 && pageList.value[pageList.value.length - 1]! < totalPages.value;
});

/** 是否显示向前更多 */
const showPrevMore = computed(() => {
  return totalPages.value > 7 && pageList.value[0]! > 2;
});

/** 是否显示向后更多 */
const showNextMore = computed(() => {
  return totalPages.value > 7 && pageList.value[pageList.value.length - 1]! < totalPages.value - 1;
});

/** 布局解析 */
const showTotal = computed(() => props.layout.includes('total') && props.showTotal);
const showSizeChanger = computed(() => props.layout.includes('sizes') && props.showSizeChanger);
const showJumper = computed(() => props.layout.includes('jumper') && props.showJumper);

// ==================== Methods ====================

/** 处理页码变化 */
const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  
  currentPage.value = page;
  jumpPage.value = page;
  emit('update:current', page);
  emit('change', page, pageSize.value);
  if (props.onChange) {
    props.onChange(page, pageSize.value);
  }
};

/** 上一页 */
const handlePrev = () => {
  handlePageChange(currentPage.value - 1);
};

/** 下一页 */
const handleNext = () => {
  handlePageChange(currentPage.value + 1);
};

/** 向前更多 */
const handlePrevMore = () => {
  const page = Math.max(1, currentPage.value - 5);
  handlePageChange(page);
};

/** 向后更多 */
const handleNextMore = () => {
  const page = Math.min(totalPages.value, currentPage.value + 5);
  handlePageChange(page);
};

/** 每页条数变化 */
const handleSizeChange = (newPageSize: string | number | (string | number)[]) => {
  // 处理数组情况（多选），这里应该是单选，取第一个值或直接使用
  const rawValue = Array.isArray(newPageSize) ? newPageSize[0] : newPageSize;
  
  // 边界处理：如果 rawValue 为 undefined，使用默认值
  if (rawValue === undefined) {
    console.warn('[Pagination] handleSizeChange received undefined value');
    return;
  }
  
  const size = typeof rawValue === 'string' ? parseInt(rawValue, 10) : rawValue;
  const newTotalPages = Math.ceil(props.total / size);

  // 调整当前页码
  let newPage: number = currentPage.value || 1;
  if (newPage > newTotalPages) {
    newPage = newTotalPages;
  }

  pageSize.value = size;
  currentPage.value = newPage;
  jumpPage.value = newPage;

  emit('update:pageSize', size);
  emit('update:current', newPage);
  emit('pageSizeChange', newPage, size);
  if (props.onPageSizeChange) {
    props.onPageSizeChange(newPage, size);
  }
};

/** 简洁模式跳转 */
const handleSimpleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const page = parseInt(target.value, 10);
  if (page >= 1 && page <= totalPages.value) {
    handlePageChange(page);
  }
};

/** 快速跳转 */
const handleJump = () => {
  let page = jumpPage.value;
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  handlePageChange(page);
};

// ==================== Watch ====================

watch(() => props.current, (val) => {
  if (val !== currentPage.value) {
    currentPage.value = val;
    jumpPage.value = val;
  }
});

watch(() => props.pageSize, (val) => {
  if (val !== pageSize.value) {
    pageSize.value = val;
  }
});

// ==================== Expose ====================

defineExpose<PaginationExpose>({
  goTo: handlePageChange,
  prev: handlePrev,
  next: handleNext,
  getCurrent: () => currentPage.value,
  getTotalPages: () => totalPages.value
});
</script>

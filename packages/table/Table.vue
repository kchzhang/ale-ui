<template>
  <div ref="tableRef" :class="tableClass" :style="tableStyle">
    <!-- 加载遮罩 -->
    <Loading v-if="loading" :visible="loading" overlay text="加载中..." size="medium" theme="primary" type="circular" />

    <!-- 表格容器 -->
    <div
      ref="tableWrapperRef"
      class="ale-table__wrapper"
      :class="{ 'ale-table__wrapper--scrollable': isScrollable }"
      :style="[wrapperStyle, isScrollable ? scrollHeightStyle : {}]"
    >
      <!-- 表头 -->
      <div
        v-if="showHeader"
        ref="headerRef"
        class="ale-table__header-wrapper"
        :class="{ 'ale-table__header-wrapper--fixed': isScrollable }"
        :style="headerWrapperStyle"
        @scroll="handleHeaderScroll"
      >
        <table class="ale-table__header" :style="headerTableStyle">
          <colgroup>
            <col v-for="column in visibleColumns" :key="getColumnKey(column)" :style="getColStyle(column)" />
          </colgroup>
          <thead>
            <tr :class="headerRowClass">
              <th v-for="(column, index) in visibleColumns" :key="getColumnKey(column)" :class="getHeaderCellClass(column, index, hasFilter)" :style="getHeaderCellStyle(column, index)" @click="handleHeaderClick(column, $event)">
                <!-- 选择列 -->
                <template v-if="column.type === 'selection'">
                  <Checkbox
                    :modelValue="isAllSelected"
                    :indeterminate="isIndeterminate"
                    :disabled="data.length === 0"
                    @change="handleSelectAll"
                  />
                </template>
                <!-- 索引列 -->
                <template v-else-if="column.type === 'index'">
                  {{ column.label || '#' }}
                </template>
                <!-- 展开列 -->
                <template v-else-if="column.type === 'expand'">
                  {{ column.label || '' }}
                </template>
                <!-- 普通列 -->
                <template v-else>
                  <div class="ale-table__cell-content">
                    <slot :name="column.headerSlot || `header-${column.prop || index}`" :column="column" :index="index">
                      {{ column.label }}
                    </slot>
                    <!-- 排序图标 -->
                    <span
                      v-if="column.sortable"
                      class="ale-table__sort-icons"
                      :class="{ 'is-active': !!getSortOrder(column) }"
                      @click.stop="handleSort(column)"
                    >
                      <!-- 升序图标 - 实心 -->
                      <svg
                        class="ale-table__sort-icon ale-table__sort-icon--asc"
                        :class="{ 'is-active': getSortOrder(column) === 'ascending' }"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 6l-8 8h16L12 6z" />
                      </svg>
                      <!-- 降序图标 - 实心 -->
                      <svg
                        class="ale-table__sort-icon ale-table__sort-icon--desc"
                        :class="{ 'is-active': getSortOrder(column) === 'descending' }"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 18l8-8H4l8 8z" />
                      </svg>
                    </span>
                    <!-- 筛选图标 -->
                    <span v-if="column.filterable" class="ale-table__filter-icon" :class="{ 'is-active': hasFilter(column) }" @click.stop="handleFilterClick(column)">
                      ▼
                    </span>
                  </div>
                </template>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 表格体 - 使用 Scroll 组件 -->
      <AleScroll
        v-if="isScrollable"
        ref="scrollRef"
        class="ale-table__body-wrapper ale-table__body-wrapper--scrollable"
        height="100%"
        :direction="scrollDirection"
        @scroll="handleScrollChange"
      >
        <table class="ale-table__body" :style="bodyTableStyle">
          <colgroup>
            <col v-for="column in visibleColumns" :key="getColumnKey(column)" :style="getColStyle(column)" />
          </colgroup>
          <tbody>
            <!-- 空状态 -->
            <tr v-if="displayData.length === 0">
              <td :colspan="visibleColumns.length" class="ale-table__empty">
                <slot name="empty">
                  <div class="ale-table__empty-content">
                    <span class="ale-table__empty-icon">📋</span>
                    <span class="ale-table__empty-text">{{ emptyText || '暂无数据' }}</span>
                  </div>
                </slot>
              </td>
            </tr>

            <!-- 数据行 -->
            <template v-else>
              <template v-for="(row, rowIndex) in displayData" :key="getRowKeyValue(row)">
                <!-- 数据行 -->
                <tr :class="[
                  'ale-table__row',
                  {
                    'ale-table__row--selected': isRowSelected(row),
                    'ale-table__row--current': currentRow === row && props.highlightCurrentRow,
                    'ale-table__row--tree': isTreeData,
                    'ale-table__row--tree-expanded': isTreeData && isTreeRowExpanded(row)
                  },
                  typeof props.rowClassName === 'function' ? props.rowClassName(row, rowIndex) : props.rowClassName
                ]" :style="getRowStyle(row, rowIndex)" @click="handleRowClick(row, rowIndex, $event)" @dblclick="handleRowDblclick(row, rowIndex, $event)" @contextmenu="handleRowContextmenu(row, rowIndex, $event)">
                  <td v-for="(column, colIndex) in visibleColumns" :key="getColumnKey(column)" :class="getCellClass(row, column, rowIndex, colIndex)" :style="getCellStyle(row, column, rowIndex, colIndex)" @click="handleCellClick(row, column, rowIndex, colIndex, $event)">
                    <!-- 选择列 -->
                    <template v-if="column.type === 'selection'">
                      <Checkbox
                        :modelValue="isRowSelected(row)"
                        :disabled="isRowDisabled(row)"
                        @change="(checked) => handleRowSelect(row, checked)"
                        @click.stop
                      />
                    </template>
                    <!-- 索引列 -->
                    <template v-else-if="column.type === 'index'">
                      {{ getIndex(rowIndex) }}
                    </template>
                    <!-- 展开列 -->
                    <template v-else-if="column.type === 'expand'">
                      <span class="ale-table__expand-icon" :class="{ 'is-expanded': isRowExpanded(row) }" @click.stop="handleRowExpand(row)"> ▶ </span>
                    </template>
                    <!-- 普通列 -->
                    <template v-else>
                      <div class="ale-table__cell-content" :class="{ 'is-ellipsis': column.showOverflowTooltip }" :title="column.showOverflowTooltip ? getCellValue(row, column) : undefined">
                        <!-- 树形展开图标（第一列且是树形数据时显示） -->
                        <template v-if="isTreeData && colIndex === 0">
                          <span
                            class="ale-table__tree-icon"
                            :class="{
                              'is-expanded': isTreeRowExpanded(row),
                              'is-leaf': !rowHasChildren(row)
                            }"
                            :style="{ marginLeft: `${getNodeLevel(row) * 20}px` }"
                            @click.stop="toggleTreeRowExpansion(row)"
                          >
                            <svg v-if="rowHasChildren(row)" viewBox="0 0 24 24" fill="currentColor" class="ale-table__tree-arrow">
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                            <span v-else class="ale-table__tree-placeholder"></span>
                          </span>
                        </template>
                        <slot :name="column.slot || column.prop || `col-${colIndex}`" :row="row" :column="column" :value="getCellValue(row, column)" :index="rowIndex">
                          {{ formatCellValue(row, column, rowIndex) }}
                        </slot>
                      </div>
                    </template>
                  </td>
                </tr>

                <!-- 展开行 -->
                <tr v-if="isRowExpanded(row) && expandable" :key="`${getRowKeyValue(row)}-expand`" class="ale-table__expanded-row">
                  <td :colspan="visibleColumns.length" class="ale-table__expanded-cell">
                    <slot name="expand" :row="row" :index="rowIndex">
                      {{ row }}
                    </slot>
                  </td>
                </tr>
              </template>
            </template>

          </tbody>
        </table>
      </AleScroll>

      <!-- 非滚动模式下的表格体 -->
      <div
        v-else
        ref="bodyRef"
        class="ale-table__body-wrapper"
      >
        <table class="ale-table__body" :style="bodyTableStyle">
          <colgroup>
            <col v-for="column in visibleColumns" :key="getColumnKey(column)" :style="getColStyle(column)" />
          </colgroup>
          <tbody>
            <!-- 空状态 -->
            <tr v-if="displayData.length === 0">
              <td :colspan="visibleColumns.length" class="ale-table__empty">
                <slot name="empty">
                  <div class="ale-table__empty-content">
                    <span class="ale-table__empty-icon">📋</span>
                    <span class="ale-table__empty-text">{{ emptyText || '暂无数据' }}</span>
                  </div>
                </slot>
              </td>
            </tr>

            <!-- 数据行 -->
            <template v-else>
              <template v-for="(row, rowIndex) in displayData" :key="getRowKeyValue(row)">
                <!-- 数据行 -->
                <tr :class="[
                  'ale-table__row',
                  {
                    'ale-table__row--selected': isRowSelected(row),
                    'ale-table__row--current': currentRow === row && props.highlightCurrentRow,
                    'ale-table__row--tree': isTreeData,
                    'ale-table__row--tree-expanded': isTreeData && isTreeRowExpanded(row)
                  },
                  typeof props.rowClassName === 'function' ? props.rowClassName(row, rowIndex) : props.rowClassName
                ]" :style="getRowStyle(row, rowIndex)" @click="handleRowClick(row, rowIndex, $event)" @dblclick="handleRowDblclick(row, rowIndex, $event)" @contextmenu="handleRowContextmenu(row, rowIndex, $event)">
                  <td v-for="(column, colIndex) in visibleColumns" :key="getColumnKey(column)" :class="getCellClass(row, column, rowIndex, colIndex)" :style="getCellStyle(row, column, rowIndex, colIndex)" @click="handleCellClick(row, column, rowIndex, colIndex, $event)">
                    <!-- 选择列 -->
                    <template v-if="column.type === 'selection'">
                      <Checkbox
                        :modelValue="isRowSelected(row)"
                        :disabled="isRowDisabled(row)"
                        @change="(checked) => handleRowSelect(row, checked)"
                        @click.stop
                      />
                    </template>
                    <!-- 索引列 -->
                    <template v-else-if="column.type === 'index'">
                      {{ getIndex(rowIndex) }}
                    </template>
                    <!-- 展开列 -->
                    <template v-else-if="column.type === 'expand'">
                      <span class="ale-table__expand-icon" :class="{ 'is-expanded': isRowExpanded(row) }" @click.stop="handleRowExpand(row)"> ▶ </span>
                    </template>
                    <!-- 普通列 -->
                    <template v-else>
                      <div class="ale-table__cell-content" :class="{ 'is-ellipsis': column.showOverflowTooltip }" :title="column.showOverflowTooltip ? getCellValue(row, column) : undefined">
                        <!-- 树形展开图标（第一列且是树形数据时显示） -->
                        <template v-if="isTreeData && colIndex === 0">
                          <span
                            class="ale-table__tree-icon"
                            :class="{
                              'is-expanded': isTreeRowExpanded(row),
                              'is-leaf': !rowHasChildren(row)
                            }"
                            :style="{ marginLeft: `${getNodeLevel(row) * 20}px` }"
                            @click.stop="toggleTreeRowExpansion(row)"
                          >
                            <svg v-if="rowHasChildren(row)" viewBox="0 0 24 24" fill="currentColor" class="ale-table__tree-arrow">
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                            <span v-else class="ale-table__tree-placeholder"></span>
                          </span>
                        </template>
                        <slot :name="column.slot || column.prop || `col-${colIndex}`" :row="row" :column="column" :value="getCellValue(row, column)" :index="rowIndex">
                          {{ formatCellValue(row, column, rowIndex) }}
                        </slot>
                      </div>
                    </template>
                  </td>
                </tr>

                <!-- 展开行 -->
                <tr v-if="isRowExpanded(row) && expandable" :key="`${getRowKeyValue(row)}-expand`" class="ale-table__expanded-row">
                  <td :colspan="visibleColumns.length" class="ale-table__expanded-cell">
                    <slot name="expand" :row="row" :index="rowIndex">
                      {{ row }}
                    </slot>
                  </td>
                </tr>
              </template>
            </template>

          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import './Table.css';
import { ref, computed, onMounted } from 'vue';
import Loading from '../loading/Loading.vue';
import Checkbox from '../checkbox/Checkbox.vue';
import AleScroll from '../scroll/Scroll.vue';
import type { TableProps, TableEmits } from './types';
import {
  useTableState,
  useTableData,
  useTableLayout,
  useTableSelection,
  useTableExpand,
  useTableSortFilter,
  useTableEvents,
  useTableContext,
  useFixedColumns,
  useTreeData,
  useTableScroll
} from './composables';

const props = withDefaults(defineProps<TableProps>(), {
  size: 'medium',
  border: false,
  stripe: false,
  loading: false,
  showEmpty: true,
  emptyText: '暂无数据',
  showHeader: true,
  layout: 'fixed',
  highlightCurrentRow: false,
  highlightSelectedRow: true,
  rowClickSelect: false,
  expandable: false,
  expandRowByClick: false,
  virtualScroll: false,
  virtualRowHeight: 48,
  columnDraggable: false,
  columnResizable: false
});

const emit = defineEmits<TableEmits>();

// ==================== Refs ====================
const tableRef = ref<HTMLElement>();
const tableWrapperRef = ref<HTMLElement>();
const headerRef = ref<HTMLElement>();
const bodyRef = ref<HTMLElement>();
const scrollRef = ref<InstanceType<typeof AleScroll>>();

// ==================== Composables ====================

// 0. 树形数据处理（需要在其他处理之前）
const treeData = useTreeData(props);
const {
  flattenedTreeData,
  isTreeData,
  hasChildren: rowHasChildren,
  getNodeLevel,
  isRowExpanded: isTreeRowExpanded,
  toggleRowExpansion: toggleTreeRowExpansion
} = treeData;

// 1. 固定列功能（需要在其他 composables 之前初始化）
const fixedColumns = useFixedColumns(props, bodyRef, headerRef, tableRef);
const { doLayout } = fixedColumns;

// 2. 状态管理
const tableState = useTableState(props);
const { selectedRows, expandedRows, currentRow,
  sortColumn, sortOrder, filterState, columnWidths,
  isIndeterminate, isAllSelected,
  updateSelectAllState, isRowSelected, isRowDisabled
} = tableState;

// 2. 数据处理（使用树形数据）
const tableData = useTableData(
  props, filterState, sortColumn, sortOrder
);

// 使用树形数据或普通数据
const displayData = computed(() => {
  if (isTreeData.value) {
    return flattenedTreeData.value.map(node => node.data);
  }
  return tableData.displayData.value;
});

const { getCellValue, formatCellValue, getIndex, getSortOrder, hasFilter } = tableData;

// 3. 布局样式
const {
  tableClass, tableStyle, wrapperStyle, headerWrapperStyle, headerTableStyle, headerRowClass,
  bodyTableStyle, getColumnKey, getColStyle, getHeaderCellClass, getHeaderCellStyle,
  getCellClass, getCellStyle
} = useTableLayout(props, columnWidths.value, {
  getFixedLeftPosition: fixedColumns.getFixedLeftPosition,
  getFixedRightPosition: fixedColumns.getFixedRightPosition,
  hasFixedLeft: fixedColumns.hasFixedLeft,
  hasFixedRight: fixedColumns.hasFixedRight,
  showLeftShadow: fixedColumns.showLeftShadow,
  showRightShadow: fixedColumns.showRightShadow,
  fixedLeftColumns: fixedColumns.fixedLeftColumns,
  fixedRightColumns: fixedColumns.fixedRightColumns
});

// 4. 选择功能
const { getRowKeyValue, handleSelectAll, handleRowSelect, toggleRowSelection, toggleAllSelection, clearSelection, getSelectionRows } = useTableSelection(
  props, emit, selectedRows, isAllSelected, updateSelectAllState
);

// 5. 表格滚动同步功能
const hasFixedColumnsFlag = computed(() => 
  props.columns.some(col => col.fixed === 'left' || col.fixed === 'right' || col.fixed === true)
);
const tableScroll = useTableScroll(props, tableWrapperRef, headerRef, bodyRef, hasFixedColumnsFlag);
const { scrollState, isScrollable, scrollHeightStyle, setScrollPosition, scrollToRow, scrollToTop, scrollToBottom, syncHeaderScroll } = tableScroll;

// 滚动方向
const scrollDirection = computed(() => {
  const { scroll } = props;
  const hasX = scroll?.x;
  const hasY = scroll?.y || props.height || props.maxHeight;
  
  if (hasX && hasY) return 'both';
  if (hasX) return 'horizontal';
  return 'vertical';
});

// 处理 Scroll 组件的滚动事件
const handleScrollChange = (position: { scrollTop: number; scrollLeft: number }) => {
  // 更新滚动状态
  scrollState.value = {
    scrollLeft: position.scrollLeft,
    scrollTop: position.scrollTop,
    isScrolling: true
  };

  // 同步表头横向滚动
  if (!hasFixedColumnsFlag.value) {
    syncHeaderScroll(position.scrollLeft);
  }

  // 更新固定列阴影
  updateFixedColumnShadow(position.scrollLeft);

  // 重置滚动状态
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    scrollState.value.isScrolling = false;
  }, 150);
};

// 更新固定列阴影
const updateFixedColumnShadow = (scrollLeft: number) => {
  if (!tableWrapperRef.value) return;
  
  const showLeft = scrollLeft > 0;
  const showRight = scrollRef.value ? (() => {
    const sizeInfo = scrollRef.value!.getScrollSize();
    return sizeInfo.scrollWidth > sizeInfo.clientWidth && 
           scrollLeft < sizeInfo.scrollWidth - sizeInfo.clientWidth - 2;
  })() : false;

  // 通过 CSS 变量更新
  tableWrapperRef.value.style.setProperty('--table-show-left-shadow', showLeft ? '1' : '0');
  tableWrapperRef.value.style.setProperty('--table-show-right-shadow', showRight ? '1' : '0');
};

let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

// 处理表头滚动事件（用户手动滚动表头时）
const handleHeaderScroll = () => {
  if (!headerRef.value || !scrollRef.value || hasFixedColumnsFlag.value) return;
  
  const { scrollLeft } = headerRef.value;
  
  // 同步 Scroll 组件的横向滚动
  scrollRef.value.scrollTo({ left: scrollLeft });
};

// 6. 展开功能
const { isRowExpanded, handleRowExpand, toggleRowExpansion } = useTableExpand(props, emit, expandedRows);

// 7. 排序和筛选
const { handleSort, handleFilterClick, clearSort, clearFilter } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

// 8. 事件处理
const { handleHeaderClick, handleRowClick, handleRowDblclick, handleRowContextmenu, handleCellClick } = useTableEvents(
  props, emit, currentRow, handleRowSelect, isRowSelected
);

// 9. 可见列
const visibleColumns = computed(() => props.columns.filter(col => !col.hidden));

// 10. 行样式（带类型处理）
function getRowStyle(row: any, index: number) {
  if (typeof props.rowStyle === 'function') {
    return props.rowStyle(row, index);
  }
  return props.rowStyle;
}

// ==================== Provide Context ====================
useTableContext(
  props,
  selectedRows.value,
  expandedRows.value,
  sortColumn,
  sortOrder,
  filterState.value,
  currentRow.value,
  handleRowSelect,
  handleRowExpand,
  handleSort,
  (row) => { currentRow.value = row; }
);

// ==================== Lifecycle ====================
onMounted(() => {
  updateSelectAllState();
});

// ==================== 滚动控制器 ====================
const getScrollController = () => {
  if (!scrollRef.value) return undefined;
  return {
    scrollTo: (options: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
      scrollRef.value!.scrollTo(options);
    },
    scrollToTop: (behavior?: ScrollBehavior) => {
      scrollRef.value!.scrollToTop(behavior);
    },
    scrollToBottom: (behavior?: ScrollBehavior) => {
      scrollRef.value!.scrollToBottom(behavior);
    },
    getScrollPosition: () => scrollRef.value!.getScrollPosition(),
    getScrollSize: () => scrollRef.value!.getScrollSize()
  };
};

// ==================== Expose ====================
defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  getSelectionRows,
  toggleRowExpansion,
  clearSort,
  clearFilter,
  doLayout,
  scrollToRow: (row: any) => {
    const rowKey = getRowKeyValue(row);
    const rowElement = tableRef.value?.querySelector(`[data-row-key="${rowKey}"]`);
    rowElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
  scrollTo: (options: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
    if (scrollRef.value) {
      scrollRef.value.scrollTo(options);
    }
  },
  setCurrentRow: (row: any) => {
    const oldRow = currentRow.value;
    currentRow.value = row;
    // 触发 current-change 事件
    if (oldRow !== row) {
      emit('current-change', row, oldRow);
      props.onCurrentChange?.(row, oldRow);
    }
  },
  getCurrentRow: () => currentRow.value,
  // 树形数据相关方法
  expandRow: treeData.expandRow,
  collapseRow: treeData.collapseRow,
  expandAll: treeData.expandAll,
  collapseAll: treeData.collapseAll,
  toggleTreeRowExpansion: treeData.toggleRowExpansion,
  isTreeRowExpanded: treeData.isRowExpanded,
  // 表格滚动相关方法和状态
  scrollState,
  setScrollPosition: (options: { top?: number; left?: number }) => {
    setScrollPosition(options, getScrollController());
  },
  scrollToRowIndex: (index: number) => {
    scrollToRow(index, getScrollController());
  },
  scrollTableToTop: () => {
    scrollToTop(getScrollController());
  },
  scrollTableToBottom: () => {
    scrollToBottom(getScrollController());
  },
  getScrollPosition: () => {
    if (scrollRef.value) {
      return scrollRef.value.getScrollPosition();
    }
    return { scrollTop: 0, scrollLeft: 0 };
  }
});
</script>

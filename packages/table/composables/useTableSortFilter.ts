/**
 * Table 排序和筛选功能模块
 * 处理列排序和筛选功能
 */

import { toRaw } from 'vue';
import type { TableProps, TableEmits, TableColumn, SortOrder } from '../types';

export function useTableSortFilter(
  props: TableProps,
  emit: TableEmits,
  sortColumn: { value: TableColumn | null },
  sortOrder: { value: SortOrder },
  filterState: { value: Record<string, any[]> }
) {
  /** 处理排序 */
  function handleSort(column: TableColumn) {
    if (!column.sortable) return;

    // 使用 toRaw 获取原始对象进行比较，避免 Vue 代理导致的比较失败
    const currentColumn = sortColumn.value ? toRaw(sortColumn.value) : null;
    const newColumn = toRaw(column);

    if (currentColumn === newColumn) {
      // 循环切换: ascending -> descending -> null -> ascending
      if (sortOrder.value === 'ascending') {
        sortOrder.value = 'descending';
      } else if (sortOrder.value === 'descending') {
        sortOrder.value = null;
      } else {
        sortOrder.value = 'ascending';
      }
    } else {
      sortColumn.value = column;
      sortOrder.value = 'ascending';
    }

    emit('sort-change', column, column.prop || '', sortOrder.value);
    props.onSortChange?.(column, column.prop || '', sortOrder.value);
  }

  /** 处理筛选点击 */
  function handleFilterClick(column: TableColumn) {
    if (column.filters && column.filters.length > 0) {
      const currentValues = filterState.value[column.prop!] || [];
      const allValues = column.filters.map(f => f.value);

      if (currentValues.length === 0) {
        filterState.value[column.prop!] = allValues;
      } else {
        filterState.value[column.prop!] = [];
      }

      emit('filter-change', filterState.value);
      props.onFilterChange?.(filterState.value);
    }
  }

  /** 清空排序 */
  function clearSort() {
    sortColumn.value = null;
    sortOrder.value = null;
  }

  /** 清空筛选 */
  function clearFilter(columnKey?: string) {
    if (columnKey) {
      delete filterState.value[columnKey];
    } else {
      filterState.value = {};
    }
  }

  return {
    handleSort,
    handleFilterClick,
    clearSort,
    clearFilter
  };
}

/**
 * Table 数据处理模块
 * 处理筛选、排序等数据逻辑
 */

import { computed } from 'vue';
import type { TableProps, TableColumn, SortOrder } from '../types';

export function useTableData(
  props: TableProps,
  filterState: { value: Record<string, any[]> },
  sortColumn: { value: TableColumn | null },
  sortOrder: { value: SortOrder }
) {
  /** 筛选后的数据 */
  const filteredData = computed(() => {
    let data = [...props.data];

    // 应用筛选
    Object.keys(filterState.value).forEach(key => {
      const values = filterState.value[key];
      if (values && values.length > 0) {
        const column = props.columns.find(col => col.prop === key);
        if (column && column.filterMethod) {
          data = data.filter(row => values.some(value => column.filterMethod!(value, row, column)));
        } else {
          data = data.filter(row => values.includes(row[key]));
        }
      }
    });

    return data;
  });

  /** 排序后的数据 */
  const sortedData = computed(() => {
    let data = [...filteredData.value];

    if (sortColumn.value && sortOrder.value && sortColumn.value.sortable) {
      const column = sortColumn.value;
      data.sort((a, b) => {
        const aVal = a[column.prop!];
        const bVal = b[column.prop!];

        if (column.sortMethod) {
          return sortOrder.value === 'ascending' ? column.sortMethod(aVal, bVal) : column.sortMethod(bVal, aVal);
        }

        if (aVal === bVal) return 0;
        const result = aVal < bVal ? -1 : 1;
        return sortOrder.value === 'ascending' ? result : -result;
      });
    }

    return data;
  });

  /** 显示的数据 */
  const displayData = computed(() => {
    return sortedData.value;
  });

  /** 获取单元格值 */
  function getCellValue(row: any, column: TableColumn): any {
    if (!column.prop) return '';

    const keys = column.prop.split('.');
    let value = row;
    for (const key of keys) {
      value = value?.[key];
    }
    return value;
  }

  /** 格式化单元格值 */
  function formatCellValue(row: any, column: TableColumn, index: number): string {
    const value = getCellValue(row, column);

    if (column.formatter) {
      const result = column.formatter(row, column, value, index);
      return typeof result === 'string' ? result : String(value);
    }

    return value !== undefined && value !== null ? String(value) : '';
  }

  /** 获取索引 */
  function getIndex(index: number): number {
    return index + 1;
  }

  /** 获取排序状态 */
  function getSortOrder(column: TableColumn): SortOrder {
    if (sortColumn.value === column) {
      return sortOrder.value;
    }
    return null;
  }

  /** 是否有筛选 */
  function hasFilter(column: TableColumn): boolean {
    if (!column.prop) return false;
    const values = filterState.value[column.prop];
    return Array.isArray(values) && values.length > 0;
  }

  return {
    filteredData,
    sortedData,
    displayData,
    getCellValue,
    formatCellValue,
    getIndex,
    getSortOrder,
    hasFilter
  };
}

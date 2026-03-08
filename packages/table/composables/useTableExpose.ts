/**
 * Table 暴露方法模块
 * 定义组件暴露的方法供外部调用
 */

import { nextTick } from 'vue';
import type { TableExpose } from '../types';

export function useTableExpose(
  clearSelection: () => void,
  toggleRowSelection: (row: any, selected?: boolean) => void,
  toggleAllSelection: () => void,
  getSelectionRows: () => any[],
  toggleRowExpansion: (row: any, expanded?: boolean) => void,
  clearSort: () => void,
  clearFilter: (columnKey?: string) => void,
  currentRow: { value: any },
  getRowKeyValue: (row: any) => string | number,
  tableRef: { value?: HTMLElement },
  bodyRef: { value?: HTMLElement }
): TableExpose {
  return {
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
    getSelectionRows,
    toggleRowExpansion,
    clearSort,
    clearFilter,
    doLayout: () => {
      nextTick(() => {
        // 重新计算布局
      });
    },
    scrollToRow: (row: any) => {
      const rowKey = getRowKeyValue(row);
      const rowElement = tableRef.value?.querySelector(`[data-row-key="${rowKey}"]`);
      rowElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    scrollTo: (options: { top?: number; left?: number }) => {
      bodyRef.value?.scrollTo({
        top: options.top,
        left: options.left,
        behavior: 'smooth'
      });
    },
    setCurrentRow: (row: any) => {
      currentRow.value = row;
    },
    getCurrentRow: () => currentRow.value
  };
}

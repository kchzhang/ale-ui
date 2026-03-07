/**
 * Table 上下文提供模块
 * 提供表格上下文供子组件（如 Column）使用
 */

import { provide, computed } from 'vue';
import type { TableProps, TableContext, TableColumn } from '../types';

export function useTableContext(
  props: TableProps,
  selectedRows: Set<any>,
  expandedRows: Set<any>,
  sortColumn: { value: TableColumn | null },
  sortOrder: { value: string | null },
  filterState: Record<string, any[]>,
  currentRow: any,
  handleRowSelect: (row: any, selected: boolean) => void,
  handleRowExpand: (row: any) => void,
  toggleSort: (column: TableColumn) => void,
  setCurrentRow: (row: any) => void
) {
  const tableContext = computed<TableContext>(() => ({
    size: props.size,
    data: props.data,
    selectedRows,
    expandedRows,
    sortState: sortColumn.value ? { column: sortColumn.value, prop: sortColumn.value.prop || '', order: sortOrder.value } : null,
    filterState,
    currentRow,
    highlightCurrentRow: props.highlightCurrentRow,
    getRowKey: (row: any) => {
      if (typeof props.rowKey === 'function') {
        return props.rowKey(row);
      }
      return row[props.rowKey || 'id'];
    },
    selectRow: handleRowSelect,
    expandRow: (row: any, expanded: boolean) => {
      if (expanded) {
        expandedRows.add(row);
      } else {
        expandedRows.delete(row);
      }
    },
    setCurrentRow,
    toggleSort,
    setFilter: (column: TableColumn, values: any[]) => {
      if (column.prop) {
        filterState[column.prop] = values;
      }
    },
    registerColumn: () => {
      // FIXME: Column registration not implemented yet
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Table] registerColumn is not implemented yet');
      }
    },
    unregisterColumn: () => {
      // FIXME: Column unregistration not implemented yet
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Table] unregisterColumn is not implemented yet');
      }
    }
  }));

  provide('tableContext', tableContext.value);

  return { tableContext };
}

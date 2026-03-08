/**
 * Table 上下文提供模块
 * 提供表格上下文供子组件（如 Column）使用
 */

import { provide, computed, type ComputedRef } from 'vue';
import type { TableProps, TableContext, TableColumn, SortOrder } from '../types';

export function useTableContext(
  props: TableProps,
  selectedRows: Set<any>,
  expandedRows: Set<any>,
  sortColumn: { value: TableColumn | null },
  sortOrder: { value: string | null },
  filterState: Record<string, any[]>,
  currentRow: any,
  handleRowSelect: (row: any, selected: boolean) => void,
  _handleRowExpand: (row: any) => void,
  toggleSort: (column: TableColumn) => void,
  setCurrentRow: (row: any) => void
) {
  const tableContext: ComputedRef<TableContext> = computed(() => ({
    size: props.size ?? 'medium',
    data: props.data,
    selectedRows,
    expandedRows,
    sortState: sortColumn.value ? { column: sortColumn.value, prop: sortColumn.value.prop || '', order: (sortOrder.value ?? null) as SortOrder } : null,
    filterState,
    currentRow,
    highlightCurrentRow: props.highlightCurrentRow ?? false,
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
    registerColumn: (_column: TableColumn) => {
      // FIXME: Column registration not implemented yet
      if (import.meta.env.DEV) {
        console.warn('[Table] registerColumn is not implemented yet');
      }
    },
    unregisterColumn: (_column: TableColumn) => {
      // FIXME: Column unregistration not implemented yet
      if (import.meta.env.DEV) {
        console.warn('[Table] unregisterColumn is not implemented yet');
      }
    }
  }));

  provide('tableContext', tableContext.value);

  return { tableContext };
}

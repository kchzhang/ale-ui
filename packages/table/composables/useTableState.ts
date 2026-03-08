/**
 * Table 状态管理模块
 * 管理表格的核心状态：选择、展开、排序、筛选等
 */

import { ref, watch } from 'vue';
import type { TableProps, TableColumn, SortOrder } from '../types';

export function useTableState(props: TableProps) {
  // ==================== Refs ====================
  const selectedRows = ref<Set<any>>(new Set());
  const expandedRows = ref<Set<any>>(new Set());
  const currentRow = ref<any>(null);
  const sortColumn = ref<TableColumn | null>(null);
  const sortOrder = ref<SortOrder>(null);
  const filterState = ref<Record<string, any[]>>({});
  const columnWidths = ref<Record<string, number>>({});
  const isIndeterminate = ref(false);
  const isAllSelected = ref(false);

  // ==================== Watch ====================

  watch(() => props.data, () => {
    if (!props.selection?.reserveSelection) {
      selectedRows.value.clear();
      updateSelectAllState();
    }
  }, { deep: true });

  watch(() => props.selection?.selectedRowKeys, (newKeys) => {
    if (newKeys) {
      selectedRows.value.clear();
      newKeys.forEach(key => {
        const row = props.data.find(r => {
          if (typeof props.rowKey === 'function') {
            return props.rowKey(r) === key;
          }
          return r[props.rowKey || 'id'] === key;
        });
        if (row) {
          selectedRows.value.add(row);
        }
      });
      updateSelectAllState();
    }
  }, { immediate: true });

  // ==================== Methods ====================

  /** 更新全选状态 */
  function updateSelectAllState() {
    const selectableData = props.data.filter((row, index) => {
      if (props.selection?.selectable) {
        return props.selection.selectable(row, index);
      }
      return true;
    });

    if (selectableData.length === 0) {
      isAllSelected.value = false;
      isIndeterminate.value = false;
      return;
    }

    const selectedCount = selectableData.filter(row => selectedRows.value.has(row)).length;
    isAllSelected.value = selectedCount === selectableData.length;
    isIndeterminate.value = selectedCount > 0 && selectedCount < selectableData.length;
  }

  /** 检查行是否被选中 */
  function isRowSelected(row: any): boolean {
    return selectedRows.value.has(row);
  }

  /** 检查行是否被禁用 */
  function isRowDisabled(row: any): boolean {
    if (props.selection?.selectable) {
      const index = props.data.indexOf(row);
      return !props.selection.selectable(row, index);
    }
    return false;
  }

  /** 检查行是否展开 */
  function isRowExpanded(row: any): boolean {
    return expandedRows.value.has(row);
  }

  return {
    // State
    selectedRows,
    expandedRows,
    currentRow,
    sortColumn,
    sortOrder,
    filterState,
    columnWidths,
    isIndeterminate,
    isAllSelected,
    // Methods
    updateSelectAllState,
    isRowSelected,
    isRowDisabled,
    isRowExpanded
  };
}

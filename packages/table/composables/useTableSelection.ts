/**
 * Table 选择功能模块
 * 处理行选择、全选、反选等功能
 */

import type { TableProps, TableEmits } from '../types';

export function useTableSelection(
  props: TableProps,
  emit: TableEmits,
  selectedRows: { value: Set<any> },
  isAllSelected: { value: boolean },
  updateSelectAllState: () => void
) {
  /** 获取行 key 值 */
  function getRowKeyValue(row: any): string | number {
    if (typeof props.rowKey === 'function') {
      return props.rowKey(row);
    }
    return row[props.rowKey || 'id'];
  }

  /** 处理全选 */
  function handleSelectAll(checked?: boolean) {
    const selectableData = props.data.filter((row, index) => {
      if (props.selection?.selectable) {
        return props.selection.selectable(row, index);
      }
      return true;
    });

    // 如果传入了 checked 参数，使用它；否则取反当前状态
    const shouldSelectAll = checked !== undefined ? checked : !isAllSelected.value;

    if (shouldSelectAll) {
      selectableData.forEach(row => selectedRows.value.add(row));
    } else {
      selectableData.forEach(row => selectedRows.value.delete(row));
    }

    const selection = Array.from(selectedRows.value);
    emit('selection-change', selection);
    props.onSelectionChange?.(selection);
    props.selection?.onChange?.(
      selection.map(getRowKeyValue),
      selection
    );

    updateSelectAllState();
  }

  /** 处理行选择 */
  function handleRowSelect(row: any, selected: boolean) {
    if (selected) {
      selectedRows.value.add(row);
    } else {
      selectedRows.value.delete(row);
    }

    const selection = Array.from(selectedRows.value);
    emit('selection-change', selection);
    props.onSelectionChange?.(selection);
    props.selection?.onChange?.(
      selection.map(getRowKeyValue),
      selection
    );

    updateSelectAllState();
  }

  /** 切换行选择 */
  function toggleRowSelection(row: any, selected?: boolean) {
    const isSelected = selected ?? !selectedRows.value.has(row);
    handleRowSelect(row, isSelected);
  }

  /** 切换全选 */
  function toggleAllSelection() {
    handleSelectAll();
  }

  /** 清空选择 */
  function clearSelection() {
    selectedRows.value.clear();
    updateSelectAllState();
    emit('selection-change', []);
  }

  /** 获取选中的行 */
  function getSelectionRows(): any[] {
    return Array.from(selectedRows.value);
  }

  return {
    getRowKeyValue,
    handleSelectAll,
    handleRowSelect,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    getSelectionRows
  };
}

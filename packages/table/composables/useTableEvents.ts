/**
 * Table 事件处理模块
 * 处理各种用户交互事件
 */

import type { TableProps, TableEmits, TableColumn } from '../types';

export function useTableEvents(
  props: TableProps,
  emit: TableEmits,
  currentRow: { value: any },
  handleRowSelect: (row: any, selected: boolean) => void,
  isRowSelected: (row: any) => boolean
) {
  /** 处理表头点击 */
  function handleHeaderClick(column: TableColumn, event: MouseEvent) {
    props.onHeaderClick?.(column, event);
  }

  /** 处理行点击 */
  function handleRowClick(row: any, index: number, event: MouseEvent) {
    if (props.highlightCurrentRow) {
      const oldRow = currentRow.value;
      currentRow.value = row;
      // 触发 current-change 事件
      if (oldRow !== row) {
        emit('current-change', row, oldRow);
        props.onCurrentChange?.(row, oldRow);
      }
    }

    if (props.rowClickSelect) {
      handleRowSelect(row, !isRowSelected(row));
    }

    emit('row-click', row, index, event);
    props.onRowClick?.(row, index, event);
  }

  /** 处理行双击 */
  function handleRowDblclick(row: any, index: number, event: MouseEvent) {
    emit('row-dblclick', row, index, event);
    props.onRowDblclick?.(row, index, event);
  }

  /** 处理行右键 */
  function handleRowContextmenu(row: any, index: number, event: MouseEvent) {
    props.onRowContextmenu?.(row, index, event);
  }

  /** 处理单元格点击 */
  function handleCellClick(row: any, column: TableColumn, rowIndex: number, colIndex: number, event: MouseEvent) {
    emit('cell-click', row, column, null, rowIndex, event);
    props.onCellClick?.(row, column, null, rowIndex, event);
  }

  return {
    handleHeaderClick,
    handleRowClick,
    handleRowDblclick,
    handleRowContextmenu,
    handleCellClick
  };
}

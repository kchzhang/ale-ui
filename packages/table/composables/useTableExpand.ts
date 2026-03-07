/**
 * Table 展开功能模块
 * 处理行展开/收起功能
 */

import type { TableProps, TableEmits } from '../types';

export function useTableExpand(
  props: TableProps,
  emit: TableEmits,
  expandedRows: { value: Set<any> }
) {
  /** 检查行是否展开 */
  function isRowExpanded(row: any): boolean {
    return expandedRows.value.has(row);
  }

  /** 处理行展开 */
  function handleRowExpand(row: any) {
    const expanded = expandedRows.value.has(row);

    if (expanded) {
      expandedRows.value.delete(row);
    } else {
      expandedRows.value.add(row);
    }

    emit('expand-change', Array.from(expandedRows.value));
    props.onExpandChange?.(Array.from(expandedRows.value));
    props.onRowExpand?.(!expanded, row);
  }

  /** 切换行展开状态 */
  function toggleRowExpansion(row: any, expanded?: boolean) {
    const isExpanded = expanded ?? !expandedRows.value.has(row);
    if (isExpanded) {
      expandedRows.value.add(row);
    } else {
      expandedRows.value.delete(row);
    }
    emit('expand-change', Array.from(expandedRows.value));
  }

  return {
    isRowExpanded,
    handleRowExpand,
    toggleRowExpansion
  };
}

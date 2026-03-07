/**
 * Table 布局样式模块
 * 处理表格、表头、表格体、单元格的样式计算
 * 
 * 性能优化：
 * 1. 缓存 findIndex 结果避免重复计算
 * 2. 减少 computed 依赖链
 * 3. 优化固定列样式计算
 */

import { computed, type Ref, type ComputedRef } from 'vue';
import type { TableProps, TableColumn } from '../types';

export interface FixedColumnInfo {
  column: TableColumn;
  index: number;
  position: number;
  isLastLeft?: boolean;
  isFirstRight?: boolean;
}

// 缓存列索引，避免重复 findIndex
const columnIndexCache = new WeakMap<TableColumn, number>();

export function useTableLayout(
  props: TableProps,
  columnWidths: Record<string, number>,
  fixedColumnsInfo?: {
    getFixedLeftPosition: (index: number) => number;
    getFixedRightPosition: (index: number) => number;
    hasFixedLeft: Ref<boolean> | ComputedRef<boolean>;
    hasFixedRight: Ref<boolean> | ComputedRef<boolean>;
    showLeftShadow: Ref<boolean> | ComputedRef<boolean>;
    showRightShadow: Ref<boolean> | ComputedRef<boolean>;
    fixedLeftColumns: Ref<FixedColumnInfo[]> | ComputedRef<FixedColumnInfo[]>;
    fixedRightColumns: Ref<FixedColumnInfo[]> | ComputedRef<FixedColumnInfo[]>;
  }
) {
  // ==================== 表格整体样式 ====================

  /** 表格类名 */
  const tableClass = computed(() => [
    'ale-table',
    `ale-table--${props.size ?? 'medium'}`,
    {
      'ale-table--border': props.border,
      'ale-table--loading': props.loading,
      'ale-table--highlight-current': props.highlightCurrentRow,
      'ale-table--virtual': props.virtualScroll,
      'ale-table--fixed-left': fixedColumnsInfo?.hasFixedLeft.value,
      'ale-table--fixed-right': fixedColumnsInfo?.hasFixedRight.value
      // 阴影状态通过 CSS 变量控制，不放在 class 中避免重渲染
    }
  ]);

  /** 表格样式 */
  const tableStyle = computed(() => {
    const style: Record<string, string> = {};
    if (props.height) {
      style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
    }
    return style;
  });

  /** 包装器样式 */
  const wrapperStyle = computed(() => {
    const style: Record<string, string> = {};
    if (props.maxHeight) {
      style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight;
    }
    return style;
  });

  // ==================== 表头样式 ====================

  /** 根据尺寸获取默认表头高度 */
  const getDefaultHeaderHeight = (size: string): number => {
    const heights: Record<string, number> = {
      small: 36,
      medium: 44,
      large: 52
    };
    return heights[size] || 44;
  };

  /** 表头包装器样式 */
  const headerWrapperStyle = computed(() => {
    const style: Record<string, string> = {};
    const height = props.headerHeight ?? getDefaultHeaderHeight(props.size ?? 'medium');
    style.height = `${height}px`;

    // 当有横向滚动时，表头也需要滚动（但不显示滚动条）
    if (props.scroll?.x || fixedColumnsInfo?.hasFixedLeft.value || fixedColumnsInfo?.hasFixedRight.value) {
      style.overflowX = 'auto';
      style.overflowY = 'hidden';
      // 隐藏滚动条但保持滚动功能
      style.scrollbarWidth = 'none';
      style.msOverflowStyle = 'none';
    }

    return style;
  });

  /** 表头表格样式 */
  const headerTableStyle = computed(() => {
    const style: Record<string, string> = {
      tableLayout: props.layout ?? 'fixed'
    };

    // 确保表头宽度和表体一致，以支持横向滚动同步
    const scrollX = props.scroll?.x;
    if (scrollX) {
      if (typeof scrollX === 'number') {
        style.width = `${scrollX}px`;
      } else if (typeof scrollX === 'string') {
        style.width = scrollX;
      }
    }

    return style;
  });

  /** 表头行类名 */
  const headerRowClass = computed(() => [
    'ale-table__header-row',
    typeof props.headerRowClassName === 'function'
      ? props.headerRowClassName({}, 0)
      : props.headerRowClassName
  ]);

  // ==================== 表格体样式 ====================

  /** 表格体包装器样式 */
  const bodyWrapperStyle = computed(() => {
    const style: Record<string, string> = {};
    if (props.height) {
      const headerHeight = props.showHeader ? (props.headerHeight ?? getDefaultHeaderHeight(props.size ?? 'medium')) : 0;
      style.height = `calc(100% - ${headerHeight}px)`;
    }
    const scroll = props.scroll;
    if (scroll?.y) {
      style.maxHeight = typeof scroll.y === 'number' ? `${scroll.y}px` : scroll.y;
      style.overflowY = 'auto';
    }
    if (scroll?.x) {
      style.overflowX = 'auto';
    }
    return style;
  });

  /** 表格体样式 */
  const bodyTableStyle = computed(() => {
    const style: Record<string, string> = {
      tableLayout: props.layout ?? 'fixed'
    };

    const scrollX = props.scroll?.x;
    if (scrollX) {
      if (typeof scrollX === 'number') {
        style.width = `${scrollX}px`;
      } else if (typeof scrollX === 'string') {
        style.width = scrollX;
      }
    }

    return style;
  });

  // ==================== 列和单元格样式 ====================

  /** 获取列 key */
  function getColumnKey(column: TableColumn): string {
    return column.prop || `column-${column.label}`;
  }

  /** 获取列样式 */
  function getColStyle(column: TableColumn) {
    const style: Record<string, string> = {};
    const key = getColumnKey(column);

    if (columnWidths[key]) {
      style.width = `${columnWidths[key]}px`;
    } else if (column.width) {
      style.width = typeof column.width === 'number' ? `${column.width}px` : column.width;
    }

    if (column.minWidth) {
      style.minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth;
    }

    return style;
  }

  /**
   * 获取列索引（带缓存）
   * 性能优化：避免每次渲染都执行 findIndex
   */
  function getColumnIndex(column: TableColumn): number {
    // 先从缓存获取
    let index = columnIndexCache.get(column);
    if (index !== undefined) {
      return index;
    }
    
    // 缓存未命中，执行查找并缓存结果
    index = props.columns.findIndex(col => col === column);
    if (index !== -1) {
      columnIndexCache.set(column, index);
    }
    return index;
  }

  /** 获取表头单元格类名 */
  function getHeaderCellClass(column: TableColumn, _index: number, hasFilter?: (column: TableColumn) => boolean) {
    // 使用缓存的索引
    const originalIndex = getColumnIndex(column);

    // 判断是否是最后一个左侧固定列
    const isLastLeftFixed = (fixedColumnsInfo?.hasFixedLeft.value && (column.fixed === 'left' || column.fixed === true));
    const fixedLeftCols = fixedColumnsInfo?.fixedLeftColumns.value;
    const isLastLeftColumn = isLastLeftFixed && fixedLeftCols && fixedLeftCols.length > 0 &&
      originalIndex === fixedLeftCols[fixedLeftCols.length - 1]?.index;

    // 判断是否是第一个右侧固定列
    const isFirstRightFixed = fixedColumnsInfo?.hasFixedRight.value && column.fixed === 'right';
    const fixedRightCols = fixedColumnsInfo?.fixedRightColumns.value;
    const isFirstRightColumn = isFirstRightFixed && fixedRightCols && fixedRightCols.length > 0 &&
      originalIndex === fixedRightCols[0]?.index;

    return [
      'ale-table__header-cell',
      `ale-table__header-cell--${column.align || 'left'}`,
      {
        'ale-table__header-cell--fixed-left': column.fixed === 'left' || column.fixed === true,
        'ale-table__header-cell--fixed-right': column.fixed === 'right',
        'ale-table__header-cell--fixed-left-last': isLastLeftColumn,
        'ale-table__header-cell--fixed-right-first': isFirstRightColumn,
        'ale-table__header-cell--sortable': column.sortable,
        'ale-table__header-cell--filtered': hasFilter ? hasFilter(column) : false
      },
      typeof props.headerCellClassName === 'function'
        ? props.headerCellClassName({}, column, 0, originalIndex)
        : props.headerCellClassName,
      column.className
    ];
  }

  /** 获取表头单元格样式 */
  function getHeaderCellStyle(column: TableColumn, _colIndex: number) {
    const style: Record<string, string> = {};

    if (column.headerAlign || column.align) {
      style.textAlign = column.headerAlign || column.align || 'left';
    }

    // 使用缓存的索引
    const originalIndex = getColumnIndex(column);

    if (column.fixed === 'left' || column.fixed === true) {
      style.position = 'sticky';
      style.left = `${fixedColumnsInfo?.getFixedLeftPosition(originalIndex) || 0}px`;
      style.zIndex = '20';
    } else if (column.fixed === 'right') {
      style.position = 'sticky';
      style.right = `${fixedColumnsInfo?.getFixedRightPosition(originalIndex) || 0}px`;
      style.zIndex = '20';
    }

    return style;
  }

  /** 获取行类名 */
  function getRowClass(row: any, index: number, isRowSelected: (row: any) => boolean, currentRow: { value: any }) {
    // 使用宽松比较，支持对象引用或 key 比较
    let isCurrent = false;
    if (currentRow?.value && row) {
      if (currentRow.value === row) {
        isCurrent = true;
      } else if (typeof props.rowKey === 'string' && props.rowKey in currentRow.value && props.rowKey in row) {
        isCurrent = currentRow.value[props.rowKey] === row[props.rowKey];
      } else if (typeof props.rowKey === 'function') {
        isCurrent = props.rowKey(currentRow.value) === props.rowKey(row);
      } else if ('id' in currentRow.value && 'id' in row) {
        isCurrent = currentRow.value.id === row.id;
      }
    }

    return [
      'ale-table__row',
      {
        'ale-table__row--selected': isRowSelected(row),
        'ale-table__row--current': isCurrent && props.highlightCurrentRow
      },
      typeof props.rowClassName === 'function'
        ? props.rowClassName(row, index)
        : props.rowClassName
    ];
  }

  /** 获取单元格类名 */
  function getCellClass(row: any, column: TableColumn, rowIndex: number, colIndex: number) {
    // 使用缓存的索引
    const originalIndex = getColumnIndex(column);

    // 判断是否是最后一个左侧固定列
    const isLastLeftFixed = (fixedColumnsInfo?.hasFixedLeft.value && (column.fixed === 'left' || column.fixed === true));
    const fixedLeftCols = fixedColumnsInfo?.fixedLeftColumns.value;
    const isLastLeftColumn = isLastLeftFixed && fixedLeftCols && fixedLeftCols.length > 0 &&
      originalIndex === fixedLeftCols[fixedLeftCols.length - 1]?.index;

    // 判断是否是第一个右侧固定列
    const isFirstRightFixed = fixedColumnsInfo?.hasFixedRight.value && column.fixed === 'right';
    const fixedRightCols = fixedColumnsInfo?.fixedRightColumns.value;
    const isFirstRightColumn = isFirstRightFixed && fixedRightCols && fixedRightCols.length > 0 &&
      originalIndex === fixedRightCols[0]?.index;

    return [
      'ale-table__cell',
      `ale-table__cell--${column.align || 'left'}`,
      {
        'ale-table__cell--fixed-left': column.fixed === 'left' || column.fixed === true,
        'ale-table__cell--fixed-right': column.fixed === 'right',
        'ale-table__cell--fixed-left-last': isLastLeftColumn,
        'ale-table__cell--fixed-right-first': isFirstRightColumn
      },
      typeof props.cellClassName === 'function'
        ? props.cellClassName(row, column, rowIndex, colIndex)
        : props.cellClassName,
      typeof column.cellClassName === 'function'
        ? column.cellClassName(row, column, rowIndex)
        : column.cellClassName
    ];
  }

  /** 获取单元格样式 */
  function getCellStyle(row: any, column: TableColumn, rowIndex: number, _colIndex: number) {
    const style: Record<string, string> = {};

    if (column.align) {
      style.textAlign = column.align;
    }

    // 使用缓存的索引
    const originalIndex = getColumnIndex(column);

    if (column.fixed === 'left' || column.fixed === true) {
      style.position = 'sticky';
      style.left = `${fixedColumnsInfo?.getFixedLeftPosition(originalIndex) || 0}px`;
      style.zIndex = '10';
    } else if (column.fixed === 'right') {
      style.position = 'sticky';
      style.right = `${fixedColumnsInfo?.getFixedRightPosition(originalIndex) || 0}px`;
      style.zIndex = '10';
    }

    if (typeof props.cellStyle === 'function') {
      Object.assign(style, props.cellStyle(row, column, rowIndex, _colIndex));
    } else if (props.cellStyle) {
      Object.assign(style, props.cellStyle);
    }

    return style;
  }

  return {
    tableClass,
    tableStyle,
    wrapperStyle,
    headerWrapperStyle,
    headerTableStyle,
    headerRowClass,
    bodyWrapperStyle,
    bodyTableStyle,
    getDefaultHeaderHeight,
    getColumnKey,
    getColStyle,
    getHeaderCellClass,
    getHeaderCellStyle,
    getRowClass,
    getCellClass,
    getCellStyle
  };
}

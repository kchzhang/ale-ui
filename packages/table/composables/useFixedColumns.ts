/**
 * 固定列功能模块
 * 处理固定列的位置计算、阴影效果和滚动同步
 */

import { ref, computed, type Ref } from 'vue';
import type { TableProps, TableColumn } from '../types';
import { useFixedColumnScroll, type FixedColumnScrollConfig } from './useFixedColumnScroll';

export interface FixedColumnInfo {
  column: TableColumn;
  index: number;
  position: number;
  isLastLeft?: boolean;
  isFirstRight?: boolean;
}

export interface FixedColumnsConfig {
  /** 滚动优化配置 */
  scrollConfig?: FixedColumnScrollConfig;
  /** 是否启用滚动优化 */
  enableScrollOptimization?: boolean;
}

export function useFixedColumns(
  props: TableProps,
  bodyRef: Ref<HTMLElement | undefined>,
  headerRef: Ref<HTMLElement | undefined>,
  _tableRef: Ref<HTMLElement | undefined>,
  config: FixedColumnsConfig = {}
) {
  const { scrollConfig, enableScrollOptimization = true } = config;

  // 使用滚动优化模块（包含阴影状态和表头同步优化）
  const scrollOptimization = enableScrollOptimization
    ? useFixedColumnScroll(props, bodyRef, headerRef, scrollConfig)
    : null;

  // 固定列信息缓存
  const fixedLeftColumns = computed<FixedColumnInfo[]>(() => {
    const columns: FixedColumnInfo[] = [];
    let position = 0;

    props.columns.forEach((column, index) => {
      if (column.fixed === 'left' || column.fixed === true) {
        columns.push({
          column,
          index,
          position,
          isLastLeft: false
        });
        position += getColumnWidth(column);
      }
    });

    // 标记最后一个左侧固定列
    const lastLeftColumn = columns[columns.length - 1];
    if (lastLeftColumn) {
      lastLeftColumn.isLastLeft = true;
    }

    return columns;
  });

  const fixedRightColumns = computed<FixedColumnInfo[]>(() => {
    const columns: FixedColumnInfo[] = [];

    // 收集右侧固定列
    for (let i = props.columns.length - 1; i >= 0; i--) {
      const column = props.columns[i];
      if (column?.fixed === 'right') {
        columns.unshift({
          column: column as TableColumn,
          index: i,
          position: 0, // 稍后计算
          isFirstRight: false
        });
      }
    }

    // 标记第一个右侧固定列并计算位置
    const firstRightColumn = columns[0];
    if (firstRightColumn) {
      firstRightColumn.isFirstRight = true;
      let pos = 0;
      for (let i = columns.length - 1; i >= 0; i--) {
        const col = columns[i]!;
        col.position = pos;
        pos += getColumnWidth(col.column);
      }
    }

    return columns;
  });

  // 是否有固定列
  const hasFixedLeft = computed(() => fixedLeftColumns.value.length > 0);
  const hasFixedRight = computed(() => fixedRightColumns.value.length > 0);
  const hasFixedColumns = computed(() => hasFixedLeft.value || hasFixedRight.value);

  // 滚动位置
  const scrollLeft = ref(0);
  const scrollTop = ref(0);

  // 使用优化模块的状态或本地状态
  const isScrolling = scrollOptimization?.isScrolling ?? ref(false);
  const isInertialScrolling = scrollOptimization?.isInertialScrolling ?? ref(false);
  const scrollVelocity = scrollOptimization?.scrollVelocity ?? ref(0);
  const showLeftShadow = scrollOptimization?.showLeftShadow ?? ref(false);
  const showRightShadow = scrollOptimization?.showRightShadow ?? ref(false);

  /**
   * 获取列宽度
   */
  function getColumnWidth(column: TableColumn): number {
    if (typeof column.width === 'number') {
      return column.width;
    }
    if (typeof column.width === 'string') {
      return parseInt(column.width, 10) || 100;
    }
    return 100; // 默认宽度
  }

  /**
   * 获取固定列的 left 位置
   */
  function getFixedLeftPosition(columnIndex: number): number {
    const info = fixedLeftColumns.value.find(c => c.index === columnIndex);
    return info?.position || 0;
  }

  /**
   * 获取固定列的 right 位置
   */
  function getFixedRightPosition(columnIndex: number): number {
    const info = fixedRightColumns.value.find(c => c.index === columnIndex);
    return info?.position || 0;
  }

  /**
   * 滚动到指定位置
   */
  function scrollTo(options: { top?: number; left?: number }) {
    if (scrollOptimization) {
      scrollOptimization.scrollTo(options);
    } else if (bodyRef.value) {
      bodyRef.value.scrollTo({
        top: options.top,
        left: options.left,
        behavior: 'smooth'
      });
    }
  }

  /**
   * 重新计算布局
   */
  function doLayout() {
    if (scrollOptimization) {
      scrollOptimization.doLayout();
    }
  }

  /**
   * 更新阴影显示状态（供外部调用）
   */
  function updateShadowState() {
    if (scrollOptimization) {
      scrollOptimization.syncShadowStateImmediate();
    } else if (bodyRef.value) {
      const { scrollLeft: sl, scrollWidth, clientWidth } = bodyRef.value;
      showLeftShadow.value = sl > 0;
      showRightShadow.value = scrollWidth > clientWidth && sl < scrollWidth - clientWidth - 2;
    }
  }

  return {
    // 状态
    scrollLeft,
    scrollTop,
    isScrolling,
    isInertialScrolling,
    scrollVelocity,
    showLeftShadow,
    showRightShadow,
    hasFixedLeft,
    hasFixedRight,
    hasFixedColumns,
    fixedLeftColumns,
    fixedRightColumns,

    // 方法
    getFixedLeftPosition,
    getFixedRightPosition,
    scrollTo,
    doLayout,
    updateShadowState
  };
}

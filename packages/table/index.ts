/**
 * Table 组件入口
 */

import Table from './Table.vue';

export { Table };
export { Table as AleTable };

// 类型导出
export type {
  TableProps,
  TableEmits,
  TableExpose,
  TableColumn,
  TableData,
  TableSize,
  TableLayout,
  TableAlign,
  SortOrder,
  FilterOption,
  RowState,
  TableSelectionConfig,
  TableScrollConfig,
  SortState,
  FilterState,
  TableContext,
  TreeConfig,
  TableScrollState
} from './types';

// 默认导出
export default Table;

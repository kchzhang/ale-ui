/**
 * Table 组件类型定义
 * 参考 Element Plus Table 组件设计
 */

import type { VNode, Slot } from 'vue';

/** 表格尺寸 */
export type TableSize = 'small' | 'medium' | 'large';

/** 表格布局方式 */
export type TableLayout = 'fixed' | 'auto';

/** 对齐方式 */
export type TableAlign = 'left' | 'center' | 'right';

/** 排序方式 */
export type SortOrder = 'ascending' | 'descending' | null;

/** 筛选条件 */
export interface FilterOption {
  text: string;
  value: any;
}

/** 表格列配置 */
export interface TableColumn {
  /** 列唯一标识 */
  prop?: string;
  /** 列标题 */
  label?: string;
  /** 列宽度 */
  width?: number | string;
  /** 列最小宽度 */
  minWidth?: number | string;
  /** 对齐方式 */
  align?: TableAlign;
  /** 表头对齐方式 */
  headerAlign?: TableAlign;
  /** 是否固定列 */
  fixed?: 'left' | 'right' | boolean;
  /** 是否可排序 */
  sortable?: boolean | 'custom';
  /** 是否可筛选 */
  filterable?: boolean;
  /** 筛选选项 */
  filters?: FilterOption[];
  /** 筛选方法 */
  filterMethod?: (value: any, row: any, column: TableColumn) => boolean;
  /** 自定义渲染函数 */
  formatter?: (row: any, column: TableColumn, cellValue: any, index: number) => string | VNode;
  /** 是否显示溢出省略号 */
  showOverflowTooltip?: boolean;
  /** 列类型 */
  type?: 'selection' | 'index' | 'expand' | 'default';
  /** 自定义列类名 */
  className?: string;
  /** 自定义单元格类名 */
  cellClassName?: string | ((row: any, column: TableColumn, rowIndex: number) => string);
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否禁用该列 */
  disabled?: boolean;
  /** 自定义排序方法 */
  sortMethod?: (a: any, b: any) => number;
  /** 是否默认排序 */
  defaultSort?: SortOrder;
  /** 列顺序 */
  order?: number;
  /** 是否必填（用于可编辑表格） */
  required?: boolean;
  /** 编辑类型（用于可编辑表格） */
  editType?: 'input' | 'select' | 'date' | 'number';
  /** 编辑选项（用于 select 类型） */
  editOptions?: { label: string; value: any }[];
  /** 自定义插槽名称 */
  slot?: string;
  /** 自定义表头插槽名称 */
  headerSlot?: string;
}

/** 表格数据源 */
export interface TableData {
  [key: string]: any;
}

/** 表格行状态 */
export interface RowState {
  /** 是否选中 */
  selected?: boolean;
  /** 是否展开 */
  expanded?: boolean;
  /** 是否禁用选择 */
  disabled?: boolean;
  /** 是否高亮 */
  highlighted?: boolean;
  /** 是否编辑中 */
  editing?: boolean;
  /** 自定义类名 */
  className?: string;
}

/** 表格选择配置 */
export interface TableSelectionConfig {
  /** 是否多选 */
  multiple?: boolean;
  /** 是否显示全选框 */
  showSelectAll?: boolean;
  /** 选中行的 key */
  selectedRowKeys?: (string | number)[];
  /** 是否保留跨页选择 */
  reserveSelection?: boolean;
  /** 选择变化回调 */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: any[]) => void;
  /** 行是否可选 */
  selectable?: (row: any, index: number) => boolean;
}

/** 表格滚动配置 */
export interface TableScrollConfig {
  /** 横向滚动宽度 */
  x?: number | string | true;
  /** 纵向滚动高度 */
  y?: number | string;
  /** 滚动条宽度 */
  scrollBarSize?: number;
  /** 是否显示滚动条 */
  showScrollBar?: boolean;
}

/** 树形数据配置 */
export interface TreeConfig {
  /** 子节点字段名 */
  childrenKey?: string;
  /** 是否默认展开所有 */
  defaultExpandAll?: boolean;
  /** 是否支持勾选 */
  checkable?: boolean;
  /** 是否支持拖拽 */
  draggable?: boolean;
}

/** 表格滚动状态 */
export interface TableScrollState {
  /** 横向滚动位置 */
  scrollLeft: number;
  /** 纵向滚动位置 */
  scrollTop: number;
  /** 是否正在滚动 */
  isScrolling: boolean;
}

/** 表格 Props */
export interface TableProps {
  /** 数据源 */
  data: TableData[];
  /** 列配置 */
  columns: TableColumn[];
  /** 表格尺寸 */
  size?: TableSize;
  /** 表格高度 */
  height?: number | string;
  /** 表格最大高度 */
  maxHeight?: number | string;
  /** 是否显示边框 */
  border?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 是否显示空状态 */
  showEmpty?: boolean;
  /** 空状态文本 */
  emptyText?: string;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 表头高度 */
  headerHeight?: number;
  /** 行高 */
  rowHeight?: number | ((row: any, index: number) => number);
  /** 行 key */
  rowKey?: string | ((row: any) => string | number);
  /** 当前选中行 */
  currentRow?: any;
  /** 选择配置 */
  selection?: TableSelectionConfig;
  /** 滚动配置 */
  scroll?: TableScrollConfig;
  /** 表格布局 */
  layout?: TableLayout;
  /** 是否启用虚拟滚动 */
  virtualScroll?: boolean;
  /** 虚拟滚动行高 */
  virtualRowHeight?: number;
  /** 是否可展开行 */
  expandable?: boolean;
  /** 默认展开的行 */
  defaultExpandedRowKeys?: (string | number)[];
  /** 展开行是否互斥 */
  expandRowByClick?: boolean;
  /** 是否显示展开图标 */
  expandIcon?: boolean | ((expanded: boolean, record: any) => VNode);
  /** 树形数据配置 */
  treeConfig?: TreeConfig;
  /** 行类名 */
  rowClassName?: string | ((row: any, index: number) => string);
  /** 单元格类名 */
  cellClassName?: string | ((row: any, column: TableColumn, rowIndex: number, columnIndex: number) => string);
  /** 表头行类名 */
  headerRowClassName?: string | ((row: any, index: number) => string);
  /** 表头单元格类名 */
  headerCellClassName?: string | ((row: any, column: TableColumn, rowIndex: number, columnIndex: number) => string);
  /** 行样式 */
  rowStyle?: Record<string, any> | ((row: any, index: number) => Record<string, any>);
  /** 单元格样式 */
  cellStyle?: Record<string, any> | ((row: any, column: TableColumn, rowIndex: number, columnIndex: number) => Record<string, any>);
  /** 是否高亮当前行 */
  highlightCurrentRow?: boolean;
  /** 是否高亮选中行 */
  highlightSelectedRow?: boolean;
  /** 行点击是否选中 */
  rowClickSelect?: boolean;
  /** 自定义空状态插槽 */
  emptySlot?: string;
  /** 是否支持列拖拽 */
  columnDraggable?: boolean;
  /** 是否支持列调整宽度 */
  columnResizable?: boolean;
  /** 列宽度变化回调 */
  onColumnResize?: (column: TableColumn, width: number) => void;
  /** 排序变化回调 */
  onSortChange?: (column: TableColumn, prop: string, order: SortOrder) => void;
  /** 筛选变化回调 */
  onFilterChange?: (filters: Record<string, any[]>) => void;
  /** 行点击回调 */
  onRowClick?: (row: any, index: number, event: MouseEvent) => void;
  /** 行双击回调 */
  onRowDblclick?: (row: any, index: number, event: MouseEvent) => void;
  /** 行右键回调 */
  onRowContextmenu?: (row: any, index: number, event: MouseEvent) => void;
  /** 单元格点击回调 */
  onCellClick?: (row: any, column: TableColumn, cell: any, index: number, event: MouseEvent) => void;
  /** 单元格双击回调 */
  onCellDblclick?: (row: any, column: TableColumn, cell: any, index: number, event: MouseEvent) => void;
  /** 选择变化回调 */
  onSelectionChange?: (selection: any[]) => void;
  /** 全选变化回调 */
  onSelectAll?: (selection: any[]) => void;
  /** 展开行变化回调 */
  onExpandChange?: (expandedRows: any[]) => void;
  /** 行展开/收起回调 */
  onRowExpand?: (expanded: boolean, row: any) => void;
  /** 当前行变化回调 */
  onCurrentChange?: (currentRow: any, oldCurrentRow: any) => void;
  /** 表头点击回调 */
  onHeaderClick?: (column: TableColumn, event: MouseEvent) => void;
}

/** 表格 Emits */
export interface TableEmits {
  /** 行点击事件 */
  (e: 'row-click', row: any, index: number, event: MouseEvent): void;
  /** 行双击事件 */
  (e: 'row-dblclick', row: any, index: number, event: MouseEvent): void;
  /** 选择变化事件 */
  (e: 'selection-change', selection: any[]): void;
  /** 排序变化事件 */
  (e: 'sort-change', column: TableColumn, prop: string, order: SortOrder): void;
  /** 筛选变化事件 */
  (e: 'filter-change', filters: Record<string, any[]>): void;
  /** 展开行变化事件 */
  (e: 'expand-change', expandedRows: any[]): void;
  /** 当前行变化事件 */
  (e: 'current-change', currentRow: any, oldCurrentRow: any): void;
  /** 单元格点击事件 */
  (e: 'cell-click', row: any, column: TableColumn, cell: any, index: number, event: MouseEvent): void;
}

/** 表格 Expose */
export interface TableExpose {
  /** 清除选择 */
  clearSelection: () => void;
  /** 切换行选择 */
  toggleRowSelection: (row: any, selected?: boolean) => void;
  /** 切换全选 */
  toggleAllSelection: () => void;
  /** 获取选中行 */
  getSelectionRows: () => any[];
  /** 滚动到指定行 */
  scrollToRow: (row: any) => void;
  /** 滚动到指定位置 */
  scrollTo: (options: { top?: number; left?: number }) => void;
  /** 清空排序 */
  clearSort: () => void;
  /** 清空筛选 */
  clearFilter: (columnKey?: string) => void;
  /** 重新布局 */
  doLayout: () => void;
  /** 切换行展开 */
  toggleRowExpansion: (row: any, expanded?: boolean) => void;
  /** 设置当前行 */
  setCurrentRow: (row: any) => void;
  /** 获取当前行 */
  getCurrentRow: () => any;
}

/** 表格列 Expose */
export interface TableColumnExpose {
  /** 列配置 */
  column: TableColumn;
}

/** 排序状态 */
export interface SortState {
  column: TableColumn;
  prop: string;
  order: SortOrder;
}

/** 筛选状态 */
export interface FilterState {
  [key: string]: any[];
}

/** 表格上下文 */
export interface TableContext {
  /** 表格尺寸 */
  size: TableSize;
  /** 表格数据 */
  data: TableData[];
  /** 选中行 */
  selectedRows: Set<any>;
  /** 展开行 */
  expandedRows: Set<any>;
  /** 排序状态 */
  sortState: SortState | null;
  /** 筛选状态 */
  filterState: FilterState;
  /** 当前行 */
  currentRow: any;
  /** 是否高亮当前行 */
  highlightCurrentRow: boolean;
  /** 行 key 生成函数 */
  getRowKey: (row: any) => string | number;
  /** 选择行 */
  selectRow: (row: any, selected: boolean) => void;
  /** 展开行 */
  expandRow: (row: any, expanded: boolean) => void;
  /** 设置当前行 */
  setCurrentRow: (row: any) => void;
  /** 切换排序 */
  toggleSort: (column: TableColumn) => void;
  /** 设置筛选 */
  setFilter: (column: TableColumn, values: any[]) => void;
  /** 注册列 */
  registerColumn: (column: TableColumn) => void;
  /** 注销列 */
  unregisterColumn: (column: TableColumn) => void;
}

/**
 * Pagination 组件类型定义
 */

/** 分页器尺寸 */
export type PaginationSize = 'small' | 'medium' | 'large';

/** 分页器布局 */
export type PaginationLayout = 'prev, pager, next' | 'total, prev, pager, next' | 'prev, pager, next, jumper' | 'total, prev, pager, next, jumper' | 'sizes, prev, pager, next' | 'total, sizes, prev, pager, next, jumper';

/** 分页器 Props */
export interface PaginationProps {
  /** 当前页码 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 总条数 */
  total: number;
  /** 每页条数选项 */
  pageSizeOptions?: number[];
  /** 是否显示总条数 */
  showTotal?: boolean;
  /** 是否显示快速跳转 */
  showJumper?: boolean;
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean;
  /** 组件尺寸 */
  size?: PaginationSize;
  /** 是否简洁模式 */
  simple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 布局配置 */
  layout?: PaginationLayout;
  /** 总条数渲染函数 */
  totalRender?: (total: number, range: [number, number]) => string;
  /** 上一页按钮文本 */
  prevText?: string;
  /** 下一页按钮文本 */
  nextText?: string;
  /** 页码变化回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 每页条数变化回调 */
  onPageSizeChange?: (page: number, pageSize: number) => void;
}

/** 分页器 Emits */
export interface PaginationEmits {
  /** 页码变化事件 */
  (e: 'update:current', page: number): void;
  /** 每页条数变化事件 */
  (e: 'update:pageSize', pageSize: number): void;
  /** 页码变化事件 */
  (e: 'change', page: number, pageSize: number): void;
  /** 每页条数变化事件 */
  (e: 'pageSizeChange', page: number, pageSize: number): void;
}

/** 分页器 Expose */
export interface PaginationExpose {
  /** 跳转到指定页 */
  goTo: (page: number) => void;
  /** 上一页 */
  prev: () => void;
  /** 下一页 */
  next: () => void;
  /** 获取当前页码 */
  getCurrent: () => number;
  /** 获取总页数 */
  getTotalPages: () => number;
}

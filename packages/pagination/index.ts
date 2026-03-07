/**
 * Pagination 分页器组件入口
 */

import Pagination from './Pagination.vue';

export { Pagination };
export { Pagination as AlePagination };

// 类型导出
export type {
  PaginationProps,
  PaginationEmits,
  PaginationExpose,
  PaginationSize,
  PaginationLayout
} from './types';

// 默认导出
export default Pagination;

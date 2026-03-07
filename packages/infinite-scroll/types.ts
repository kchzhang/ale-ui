/**
 * InfiniteScroll 组件类型定义
 */

/**
 * 滚动加载状态
 */
export type InfiniteScrollStatus = 'idle' | 'loading' | 'finished' | 'error';

/**
 * 滚动加载方向
 */
export type InfiniteScrollDirection = 'vertical' | 'horizontal';

/**
 * 滚动加载事件回调
 */
export interface InfiniteScrollEvents {
  (e: 'load'): void;
  (e: 'update:status', status: InfiniteScrollStatus): void;
}

/**
 * InfiniteScroll 组件 Props
 */
export interface InfiniteScrollProps {
  /**
   * 当前加载状态（受控模式）
   */
  status?: InfiniteScrollStatus;
  /**
   * 默认状态（非受控模式）
   */
  defaultStatus?: InfiniteScrollStatus;
  /**
   * 是否禁用滚动加载
   */
  disabled?: boolean;
  /**
   * 滚动方向
   */
  direction?: InfiniteScrollDirection;
  /**
   * 触发加载的距离阈值（像素）
   */
  offset?: number;
  /**
   * 是否立即执行一次加载
   */
  immediate?: boolean;
  /**
   * 加载中的提示文本
   */
  loadingText?: string;
  /**
   * 加载完成的提示文本
   */
  finishedText?: string;
  /**
   * 加载失败的提示文本
   */
  errorText?: string;
  /**
   * 重试按钮的提示文本
   */
  retryText?: string;
  /**
   * 自定义类名
   */
  customClass?: string;
}

/**
 * InfiniteScroll 组件暴露的方法
 */
export interface InfiniteScrollExpose {
  /**
   * 检查是否需要加载
   */
  check: () => void;
  /**
   * 设置状态为加载中
   */
  setLoading: () => void;
  /**
   * 设置状态为完成
   */
  setFinished: () => void;
  /**
   * 设置状态为错误
   */
  setError: () => void;
  /**
   * 重置状态
   */
  reset: () => void;
}

/**
 * InfiniteScroll 组件状态
 */
export interface InfiniteScrollState {
  /**
   * 当前状态
   */
  status: InfiniteScrollStatus;
  /**
   * 是否正在加载
   */
  isLoading: boolean;
  /**
   * 是否已结束
   */
  isFinished: boolean;
  /**
   * 是否出错
   */
  isError: boolean;
}

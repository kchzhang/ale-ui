/**
 * Scroll 组件类型定义
 * 提供自定义滚动条功能的组件
 */

/**
 * 滚动条主题
 */
export type ScrollTheme = 'default' | 'primary' | 'dark' | 'gray';

/**
 * 滚动条大小
 */
export type ScrollSize = 'small' | 'medium' | 'large';

/**
 * 滚动方向
 */
export type ScrollDirection = 'vertical' | 'horizontal' | 'both';

/**
 * 滚动行为（与浏览器原生 ScrollBehavior 类型兼容）
 */
export type ScrollBehavior = 'auto' | 'smooth' | 'instant';

/**
 * 滚动条位置
 */
export interface ScrollPosition {
  scrollTop: number;
  scrollLeft: number;
}

/**
 * 滚动条尺寸信息
 */
export interface ScrollSizeInfo {
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

/**
 * Scroll 组件 Props
 */
export interface ScrollProps {
  /**
   * 滚动区域高度
   */
  height?: string | number;
  /**
   * 滚动区域最大高度
   */
  maxHeight?: string | number;
  /**
   * 滚动区域宽度（水平滚动时需要）
   */
  width?: string | number;
  /**
   * 滚动区域最大宽度
   */
  maxWidth?: string | number;
  /**
   * 是否显示原生滚动条
   * @default false
   */
  native?: boolean;
  /**
   * 是否始终显示滚动条
   * @default false
   */
  always?: boolean;
  /**
   * 滚动条最小尺寸
   * @default 20
   */
  minSize?: number;
  /**
   * 滚动条主题
   * @default 'default'
   */
  theme?: ScrollTheme;
  /**
   * 滚动条大小
   * @default 'medium'
   */
  size?: ScrollSize;
  /**
   * 滚动方向
   * @default 'vertical'
   */
  direction?: ScrollDirection;
  /**
   * 是否启用平滑滚动
   * @default true
   */
  smooth?: boolean;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 是否禁用滚动
   * @default false
   */
  disabled?: boolean;
  /**
   * 滚动时触发加载的阈值
   * @default 0
   */
  loadOffset?: number;
  /**
   * 是否启用虚拟滚动
   * @default false
   */
  virtual?: boolean;
  /**
   * 虚拟滚动每项高度
   */
  itemHeight?: number;
  /**
   * 虚拟滚动数据总数
   */
  total?: number;
}

/**
 * Scroll 组件事件
 */
export interface ScrollEmits {
  /**
   * 滚动事件
   */
  (e: 'scroll', position: ScrollPosition, sizeInfo: ScrollSizeInfo): void;
  /**
   * 滚动到底部事件
   */
  (e: 'scroll-to-bottom'): void;
  /**
   * 滚动到顶部事件
   */
  (e: 'scroll-to-top'): void;
  /**
   * 滚动到最左事件
   */
  (e: 'scroll-to-left'): void;
  /**
   * 滚动到最右事件
   */
  (e: 'scroll-to-right'): void;
  /**
   * 加载更多事件
   */
  (e: 'load-more'): void;
}

/**
 * Scroll 组件暴露的方法
 */
export interface ScrollExpose {
  /**
   * 滚动到指定位置
   */
  scrollTo: (options: { top?: number; left?: number; behavior?: ScrollBehavior }) => void;
  /**
   * 滚动到顶部
   */
  scrollToTop: (behavior?: ScrollBehavior) => void;
  /**
   * 滚动到底部
   */
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  /**
   * 获取滚动位置
   */
  getScrollPosition: () => ScrollPosition;
  /**
   * 获取滚动尺寸信息
   */
  getScrollSize: () => ScrollSizeInfo;
  /**
   * 更新滚动条
   */
  update: () => void;
}

/**
 * 滚动条状态
 */
export interface ScrollState {
  /**
   * 是否正在拖动垂直滚动条
   */
  isDraggingVertical: boolean;
  /**
   * 是否正在拖动水平滚动条
   */
  isDraggingHorizontal: boolean;
  /**
   * 垂直滚动条是否可见
   */
  verticalVisible: boolean;
  /**
   * 水平滚动条是否可见
   */
  horizontalVisible: boolean;
  /**
   * 垂直滚动条高度百分比
   */
  verticalThumbHeight: number;
  /**
   * 水平滚动条宽度百分比
   */
  horizontalThumbWidth: number;
  /**
   * 垂直滚动条位置百分比
   */
  verticalThumbTop: number;
  /**
   * 水平滚动条位置百分比
   */
  horizontalThumbLeft: number;
}

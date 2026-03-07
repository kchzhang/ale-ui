/**
 * Loading 组件类型定义
 */

export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingType = 'circular' | 'spinner' | 'dots';
export type LoadingTheme = 'primary' | 'success' | 'warning' | 'danger';

export interface LoadingProps {
  /** 加载类型 */
  type?: LoadingType;
  /** 尺寸 */
  size?: LoadingSize;
  /** 主题色 */
  theme?: LoadingTheme;
  /** 自定义颜色 */
  color?: string;
  /** 是否显示遮罩层 */
  overlay?: boolean;
  /** 遮罩层背景色（已废弃，请使用 overlayBackground） */
  overlayColor?: string;
  /** 遮罩层背景色，默认 rgba(255, 255, 255, 0.9) */
  overlayBackground?: string;
  /** 遮罩层透明度，默认 0.9（0-1之间） */
  overlayOpacity?: number;
  /** 加载文本 */
  text?: string;
  /** 是否垂直排列（图标在上，文字在下） */
  vertical?: boolean;
  /** 是否全屏显示 */
  fullscreen?: boolean;
  /** 自定义类名 */
  customClass?: string;
  /** 延迟显示时间（毫秒） */
  delay?: number;
}

export interface LoadingEmits {
  (e: 'click', event: MouseEvent): void;
}

export interface LoadingInstance {
  /** 关闭加载 */
  close: () => void;
}

export interface LoadingServiceOptions extends Omit<LoadingProps, 'fullscreen'> {
  /** 挂载目标元素 */
  target?: HTMLElement | string;
  /** 是否锁定背景滚动 */
  lock?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
}

export type LoadingGlobalMethod = {
  (options?: LoadingServiceOptions): LoadingInstance;
  service: (options?: LoadingServiceOptions) => LoadingInstance;
};

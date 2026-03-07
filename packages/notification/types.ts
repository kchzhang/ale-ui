/**
 * Notification 组件类型定义
 * @description 通知提醒组件的类型定义文件
 */

/**
 * 通知类型
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * 通知位置
 */
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * Notification Props 接口
 */
export interface NotificationProps {
  /**
   * 通知类型
   */
  type?: NotificationType;
  /**
   * 通知标题
   */
  title?: string;
  /**
   * 通知内容
   */
  message?: string;
  /**
   * 显示时长（毫秒），0 表示不自动关闭
   */
  duration?: number;
  /**
   * 是否显示关闭按钮
   */
  closable?: boolean;
  /**
   * 自定义图标
   */
  icon?: string;
  /**
   * 是否显示图标
   */
  showIcon?: boolean;
  /**
   * 通知位置
   */
  position?: NotificationPosition;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 通知 ID（内部使用）
   */
  id?: string;
  /**
   * 偏移距离
   */
  offset?: number;
  /**
   * 是否支持 HTML 内容
   */
  dangerouslyUseHTMLString?: boolean;
  /**
   * 是否显示进度条
   */
  showProgress?: boolean;
}

/**
 * Notification 配置选项（用于全局方法）
 */
export interface NotificationOptions extends Omit<NotificationProps, 'visible' | 'id'> {
  /**
   * 关闭时的回调
   */
  onClose?: () => void;
  /**
   * 点击时的回调
   */
  onClick?: () => void;
}

/**
 * Notification 实例方法
 */
export interface NotificationInstance {
  /**
   * 关闭通知
   */
  close: () => void;
}

/**
 * Notification 全局方法类型
 */
export interface NotificationGlobalMethod {
  /**
   * 显示普通通知
   */
  (options: NotificationOptions | string): NotificationInstance;
  /**
   * 显示成功通知
   */
  success: (options: NotificationOptions | string) => NotificationInstance;
  /**
   * 显示警告通知
   */
  warning: (options: NotificationOptions | string) => NotificationInstance;
  /**
   * 显示错误通知
   */
  error: (options: NotificationOptions | string) => NotificationInstance;
  /**
   * 显示信息通知
   */
  info: (options: NotificationOptions | string) => NotificationInstance;
  /**
   * 关闭所有通知
   */
  closeAll: () => void;
}

/**
 * Notification 内部状态
 */
export interface NotificationState {
  notifications: Array<NotificationProps & { id: string }>;
}

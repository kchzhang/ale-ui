/**
 * Message 组件类型定义
 * @description 消息提示组件的类型定义文件
 */

/**
 * 消息类型
 */
export type MessageType = 'info' | 'success' | 'warning' | 'error';

/**
 * 消息位置
 */
export type MessagePosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';

/**
 * Message Props 接口
 */
export interface MessageProps {
  /**
   * 消息类型
   */
  type?: MessageType;
  /**
   * 消息内容
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
   * 消息位置
   */
  position?: MessagePosition;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 消息 ID（内部使用）
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
}

/**
 * Message 配置选项（用于全局方法）
 */
export interface MessageOptions extends Omit<MessageProps, 'visible' | 'id'> {
  /**
   * 关闭时的回调
   */
  onClose?: () => void;
}

/**
 * Message 实例方法
 */
export interface MessageInstance {
  /**
   * 关闭消息
   */
  close: () => void;
}

/**
 * Message 全局方法类型
 */
export interface MessageGlobalMethod {
  /**
   * 显示普通消息
   */
  (options: MessageOptions | string): MessageInstance;
  /**
   * 显示成功消息
   */
  success: (options: MessageOptions | string) => MessageInstance;
  /**
   * 显示警告消息
   */
  warning: (options: MessageOptions | string) => MessageInstance;
  /**
   * 显示错误消息
   */
  error: (options: MessageOptions | string) => MessageInstance;
  /**
   * 显示信息消息
   */
  info: (options: MessageOptions | string) => MessageInstance;
  /**
   * 关闭所有消息
   */
  closeAll: () => void;
}

/**
 * Message 内部状态
 */
export interface MessageState {
  messages: Array<MessageProps & { id: string }>;
}

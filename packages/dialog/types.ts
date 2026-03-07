/**
 * Dialog 组件类型定义
 * @description 对话框组件的类型定义文件
 */

/**
 * 对话框尺寸类型
 */
export type DialogSize = 'small' | 'medium' | 'large' | 'fullscreen';

/**
 * 对话框位置类型
 */
export type DialogPosition = 'center' | 'top';

/**
 * Dialog Props 接口
 */
export interface DialogProps {
  /**
   * 是否显示对话框（受控模式）
   */
  modelValue?: boolean;
  /**
   * 对话框标题
   */
  title?: string;
  /**
   * 对话框宽度
   */
  width?: string | number;
  /**
   * 对话框尺寸
   */
  size?: DialogSize;
  /**
   * 对话框位置
   */
  position?: DialogPosition;
  /**
   * 是否显示遮罩层
   */
  showMask?: boolean;
  /**
   * 点击遮罩层是否关闭对话框
   */
  maskClosable?: boolean;
  /**
   * 是否显示关闭按钮
   */
  showClose?: boolean;
  /**
   * 是否显示底部操作栏
   */
  showFooter?: boolean;
  /**
   * 确认按钮文本
   */
  confirmText?: string;
  /**
   * 取消按钮文本
   */
  cancelText?: string;
  /**
   * 是否显示确认按钮
   */
  showConfirm?: boolean;
  /**
   * 是否显示取消按钮
   */
  showCancel?: boolean;
  /**
   * 确认按钮是否加载中
   */
  confirmLoading?: boolean;
  /**
   * 是否禁用确认按钮
   */
  confirmDisabled?: boolean;
  /**
   * 是否禁用取消按钮
   */
  cancelDisabled?: boolean;
  /**
   * 是否按ESC键关闭
   */
  keyboard?: boolean;
  /**
   * 对话框层级
   */
  zIndex?: number;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 是否锁定body滚动
   */
  lockScroll?: boolean;
  /**
   * 关闭时是否销毁内容
   */
  destroyOnClose?: boolean;
}

/**
 * Dialog Emits 类型定义
 */
export interface DialogEmits {
  /**
   * 对话框显示状态变化时触发（受控模式）
   * @param e - 事件名
   * @param value - 新的显示状态
   */
  (e: 'update:modelValue', value: boolean): void;
  /**
   * 确认按钮点击时触发
   * @param e - 事件名
   */
  (e: 'confirm'): void;
  /**
   * 取消按钮点击时触发
   * @param e - 事件名
   */
  (e: 'cancel'): void;
  /**
   * 对话框关闭时触发
   * @param e - 事件名
   */
  (e: 'close'): void;
  /**
   * 对话框打开时触发
   * @param e - 事件名
   */
  (e: 'open'): void;
  /**
   * 对话框打开动画完成后触发
   * @param e - 事件名
   */
  (e: 'opened'): void;
  /**
   * 对话框关闭动画完成后触发
   * @param e - 事件名
   */
  (e: 'closed'): void;
}

/**
 * Dialog 插槽类型定义
 */
export interface DialogSlots {
  /**
   * 默认插槽 - 对话框内容
   */
  default?: () => any;
  /**
   * 标题插槽 - 自定义标题内容
   */
  title?: () => any;
  /**
   * 底部插槽 - 自定义底部内容
   */
  footer?: () => any;
}

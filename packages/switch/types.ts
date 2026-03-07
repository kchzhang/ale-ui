/**
 * Switch 组件类型定义
 * @description 开关组件的类型定义文件
 */

/**
 * 开关尺寸类型
 */
export type SwitchSize = 'small' | 'medium' | 'large';

/**
 * 开关主题类型
 */
export type SwitchTheme = 'primary' | 'success' | 'warning' | 'danger';

/**
 * Switch Props 接口
 */
export interface SwitchProps {
  /**
   * 是否选中（受控模式）
   */
  modelValue?: boolean;
  /**
   * 默认选中状态（非受控模式）
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 尺寸
   */
  size?: SwitchSize;
  /**
   * 主题色
   */
  theme?: SwitchTheme;
  /**
   * 打开时的文本
   */
  activeText?: string;
  /**
   * 关闭时的文本
   */
  inactiveText?: string;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 打开时的值（用于非布尔值场景）
   */
  activeValue?: boolean | string | number;
  /**
   * 关闭时的值（用于非布尔值场景）
   */
  inactiveValue?: boolean | string | number;
  /**
   * 打开时的背景色（自定义样式）
   */
  activeColor?: string;
  /**
   * 关闭时的背景色（自定义样式）
   */
  inactiveColor?: string;
}

/**
 * Switch Emits 类型定义
 */
export interface SwitchEmits {
  /**
   * 开关状态变化时触发（受控模式）
   * @param e - 事件名
   * @param value - 新的开关值
   */
  (e: 'update:modelValue', value: boolean): void;
  /**
   * 开关状态变化时触发
   * @param e - 事件名
   * @param value - 新的开关值
   */
  (e: 'change', value: boolean): void;
  /**
   * 点击时触发
   * @param e - 事件名
   * @param event - 鼠标事件对象
   */
  (e: 'click', event: MouseEvent): void;
}

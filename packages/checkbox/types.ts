/**
 * Checkbox 组件类型定义
 * @description 复选框组件的类型定义文件
 */

/**
 * 复选框尺寸类型
 */
export type CheckboxSize = 'small' | 'medium' | 'large';

/**
 * 复选框主题类型
 */
export type CheckboxTheme = 'primary' | 'success' | 'warning' | 'danger';

/**
 * 复选框值类型
 */
export type CheckboxValue = string | number | boolean;

/**
 * Checkbox Props 接口
 */
export interface CheckboxProps {
  /**
   * 是否选中（受控模式）
   */
  modelValue?: boolean;
  /**
   * 是否默认选中（非受控模式）
   */
  defaultChecked?: boolean;
  /**
   * 复选框的值
   */
  value?: CheckboxValue;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 是否半选中状态（用于全选/部分选中场景）
   */
  indeterminate?: boolean;
  /**
   * 尺寸
   */
  size?: CheckboxSize | undefined;
  /**
   * 主题色
   */
  theme?: CheckboxTheme | undefined;
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 复选框名称（用于表单提交）
   */
  name?: string;
}

/**
 * Checkbox Emits 类型定义
 */
export interface CheckboxEmits {
  /**
   * 选中状态变化时触发
   * @param e - 事件名
   * @param value - 新的选中状态
   */
  (e: 'update:modelValue', value: boolean): void;
  /**
   * 选中状态变化时触发
   * @param e - 事件名
   * @param value - 新的选中状态
   */
  (e: 'change', value: boolean): void;
  /**
   * 点击时触发
   * @param e - 事件名
   * @param event - 鼠标事件对象
   */
  (e: 'click', event: MouseEvent): void;
}

/**
 * Checkbox 组选项类型
 */
export interface CheckboxOption {
  /**
   * 选项标签
   */
  label: string;
  /**
   * 选项值
   */
  value: CheckboxValue;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否半选中状态
   */
  indeterminate?: boolean;
  /**
   * 自定义渲染内容
   */
  render?: () => any;
}

/**
 * CheckboxGroup Props 接口
 */
export interface CheckboxGroupProps {
  /**
   * 选中的值数组
   */
  modelValue?: CheckboxValue[];
  /**
   * 默认选中的值数组
   */
  defaultValue?: CheckboxValue[];
  /**
   * 选项数组
   */
  options?: CheckboxOption[];
  /**
   * 是否禁用整个组
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: CheckboxSize | undefined;
  /**
   * 主题色
   */
  theme?: CheckboxTheme | undefined;
  /**
   * 排列方向
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 最小选中数量
   */
  min?: number;
  /**
   * 最大选中数量
   */
  max?: number;
}

/**
 * CheckboxGroup Emits 类型定义
 */
export interface CheckboxGroupEmits {
  /**
   * 选中值变化时触发
   * @param e - 事件名
   * @param value - 新的选中值数组
   */
  (e: 'update:modelValue', value: CheckboxValue[]): void;
  /**
   * 选中值变化时触发
   * @param e - 事件名
   * @param value - 新的选中值数组
   */
  (e: 'change', value: CheckboxValue[]): void;
  /**
   * 点击选项时触发
   * @param e - 事件名
   * @param value - 被点击的选项值
   * @param event - 鼠标事件对象
   */
  (e: 'click', value: CheckboxValue, event: MouseEvent): void;
}

/**
 * Radio 组件类型定义
 * @description 单选框组件的类型定义文件
 */

/**
 * 单选框尺寸类型
 */
export type RadioSize = 'small' | 'medium' | 'large';

/**
 * 单选框主题类型
 */
export type RadioTheme = 'primary' | 'success' | 'warning' | 'danger';

/**
 * 单选框值类型
 */
export type RadioValue = string | number | boolean;

/**
 * Radio Props 接口
 */
export interface RadioProps {
  /**
   * 选中的值（受控模式）
   */
  modelValue?: RadioValue;
  /**
   * 当前单选框的值
   */
  value?: RadioValue;
  /**
   * 是否默认选中（非受控模式）
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 尺寸
   */
  size?: RadioSize;
  /**
   * 主题色
   */
  theme?: RadioTheme;
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 单选框名称（用于表单提交）
   */
  name?: string;
}

/**
 * Radio Emits 类型定义
 */
export interface RadioEmits {
  /**
   * 选中状态变化时触发
   * @param e - 事件名
   * @param value - 新的选中值
   */
  (e: 'update:modelValue', value: RadioValue): void;
  /**
   * 选中状态变化时触发
   * @param e - 事件名
   * @param value - 新的选中值
   */
  (e: 'change', value: RadioValue): void;
  /**
   * 点击时触发
   * @param e - 事件名
   * @param event - 鼠标事件对象
   */
  (e: 'click', event: MouseEvent): void;
}

/**
 * Radio 组选项类型
 */
export interface RadioOption {
  /**
   * 选项标签
   */
  label: string;
  /**
   * 选项值
   */
  value: RadioValue;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义渲染内容
   */
  render?: () => any;
}

/**
 * RadioGroup Props 接口
 */
export interface RadioGroupProps {
  /**
   * 选中的值
   */
  modelValue?: RadioValue;
  /**
   * 默认选中的值
   */
  defaultValue?: RadioValue;
  /**
   * 选项数组
   */
  options?: RadioOption[];
  /**
   * 是否禁用整个组
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: RadioSize;
  /**
   * 主题色
   */
  theme?: RadioTheme;
  /**
   * 排列方向
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 单选框名称（用于表单提交）
   */
  name?: string;
}

/**
 * RadioGroup Emits 类型定义
 */
export interface RadioGroupEmits {
  /**
   * 选中值变化时触发
   * @param e - 事件名
   * @param value - 新的选中值
   */
  (e: 'update:modelValue', value: RadioValue): void;
  /**
   * 选中值变化时触发
   * @param e - 事件名
   * @param value - 新的选中值
   */
  (e: 'change', value: RadioValue): void;
  /**
   * 点击选项时触发
   * @param e - 事件名
   * @param value - 被点击的选项值
   * @param event - 鼠标事件对象
   */
  (e: 'click', value: RadioValue, event: MouseEvent): void;
}

import type { Ref } from 'vue';

/**
 * Radio 组上下文类型
 */
export interface RadioGroupContext {
  /**
   * 当前选中的值（ref）
   */
  currentValue: Ref<RadioValue | undefined>;
  /**
   * 单选框名称
   */
  name: string;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 尺寸
   */
  size: RadioSize;
  /**
   * 主题色
   */
  theme: RadioTheme;
  /**
   * 选中值变化时的回调
   * @param value - 新的选中值
   */
  changeValue: (value: RadioValue) => void;
}

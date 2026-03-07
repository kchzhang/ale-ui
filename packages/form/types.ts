/**
 * Form 组件类型定义
 * @description 表单组件的类型定义文件
 */

import type { ComputedRef } from 'vue';

/**
 * 表单布局类型
 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline';

/**
 * 表单标签位置
 */
export type LabelPosition = 'left' | 'right' | 'top';

/**
 * 表单尺寸
 */
export type FormSize = 'large' | 'medium' | 'small';

/**
 * 验证规则触发时机
 */
export type ValidateTrigger = 'change' | 'blur' | 'focus' | 'submit';

/**
 * 验证规则
 */
export interface FormRule {
  /** 是否必填 */
  required?: boolean;
  /** 必填提示信息 */
  requiredMessage?: string;
  /** 最小长度（字符串或数组） */
  minLength?: number;
  /** 最大长度（字符串或数组） */
  maxLength?: number;
  /** 最小值（数字） */
  min?: number;
  /** 最大值（数字） */
  max?: number;
  /** 正则表达式验证 */
  pattern?: RegExp;
  /** 验证失败提示信息 */
  message?: string;
  /** 自定义验证函数 */
  validator?: (value: any, formData: Record<string, any>) => boolean | string | Promise<boolean | string>;
  /** 触发验证的时机 */
  trigger?: ValidateTrigger | ValidateTrigger[];
}

/**
 * 表单字段配置
 */
export interface FormField {
  /** 字段名称 */
  name: string;
  /** 字段标签 */
  label?: string;
  /** 验证规则 */
  rules?: FormRule[];
  /** 字段默认值 */
  defaultValue?: any;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 占位提示文本 */
  placeholder?: string;
}

/**
 * 验证结果
 */
export interface ValidationResult {
  /** 是否验证通过 */
  valid: boolean;
  /** 错误信息 */
  errors: Record<string, string[]>;
}

/**
 * Form Props 接口
 */
export interface FormProps {
  /** 表单数据对象 */
  model: Record<string, any>;
  /** 表单布局 */
  layout?: FormLayout;
  /** 标签位置 */
  labelPosition?: LabelPosition;
  /** 标签宽度（仅 horizontal 布局有效） */
  labelWidth?: string | number;
  /** 表单尺寸 */
  size?: FormSize;
  /** 是否禁用整个表单 */
  disabled?: boolean;
  /** 是否显示必填标记 */
  showRequiredMark?: boolean;
  /** 标签与表单控件的间距 */
  labelGap?: string | number;
}

/**
 * Form Emits 类型定义
 */
export interface FormEmits {
  /**
   * 表单提交事件
   * @param e - 事件名
   * @param formData - 表单数据
   */
  (e: 'submit', formData: Record<string, any>): void;
  /**
   * 表单验证失败事件
   * @param e - 事件名
   * @param errors - 验证错误信息
   */
  (e: 'validate-fail', errors: Record<string, string[]>): void;
  /**
   * 字段值变化事件
   * @param e - 事件名
   * @param field - 字段名
   * @param value - 新值
   * @param formData - 完整表单数据
   */
  (e: 'field-change', field: string, value: any, formData: Record<string, any>): void;
}

/**
 * Label 高度模式
 */
export type LabelHeightMode = 'auto' | 'fixed' | 'adaptive';

/**
 * Form Item Props 接口
 */
export interface FormItemProps {
  /** 字段名称 */
  name?: string;
  /** 标签文本 */
  label?: string;
  /** 验证规则 */
  rules?: FormRule[];
  /** 标签宽度 */
  labelWidth?: string | number;
  /** 是否必填 */
  required?: boolean;
  /** 自定义错误信息 */
  error?: string;
  /** 是否显示错误信息 */
  showError?: boolean;
  /** 额外的提示信息 */
  extra?: string;
  /** 
   * Label 高度模式
   * @default 'adaptive'
   * @description 'auto' - 完全自适应内容高度；'fixed' - 固定高度，超出隐藏；'adaptive' - 最小高度+自适应
   */
  labelHeightMode?: LabelHeightMode;
  /** 是否支持多行标签文本 */
  multiline?: boolean;
}

/**
 * Form Item Emits 类型定义
 */
export interface FormItemEmits {
  /**
   * 字段验证状态变化
   * @param e - 事件名
   * @param name - 字段名
   * @param valid - 是否验证通过
   * @param errors - 错误信息数组
   */
  (e: 'validate', name: string, valid: boolean, errors: string[]): void;
}

/**
 * Form 实例方法接口
 */
export interface FormInstance {
  /** 验证整个表单 */
  validate: () => Promise<ValidationResult>;
  /** 验证指定字段 */
  validateField: (field: string | string[]) => Promise<ValidationResult>;
  /** 重置表单 */
  resetFields: () => void;
  /** 清除验证状态 */
  clearValidate: (field?: string | string[]) => void;
  /** 获取表单数据 */
  getFormData: () => Record<string, any>;
  /** 设置表单数据 */
  setFormData: (data: Record<string, any>) => void;
}

/**
 * Form Item 实例方法接口
 */
export interface FormItemInstance {
  /** 验证当前字段 */
  validate: () => Promise<{ valid: boolean; errors: string[] }>;
  /** 清除验证状态 */
  clearValidate: () => void;
  /** 重置字段值 */
  resetField: () => void;
}

/**
 * Form 注入的上下文类型
 */
export interface FormContext {
  /** 表单数据 */
  model: Record<string, any>;
  /** 表单布局 */
  layout: FormLayout | ComputedRef<FormLayout>;
  /** 标签位置 */
  labelPosition: LabelPosition | ComputedRef<LabelPosition>;
  /** 标签宽度 */
  labelWidth: string | number | undefined | ComputedRef<string | number | undefined>;
  /** 表单尺寸 */
  size: FormSize | ComputedRef<FormSize>;
  /** 是否禁用 */
  disabled: boolean | ComputedRef<boolean>;
  /** 是否显示必填标记 */
  showRequiredMark: boolean | ComputedRef<boolean>;
  /** 标签与表单控件的间距 */
  labelGap: string | number | ComputedRef<string | number>;
  /** 注册表单项 */
  registerField: (name: string, instance: FormItemInstance, fieldConfig?: FormField) => void;
  /** 注销表单项 */
  unregisterField: (name: string) => void;
  /** 字段值变化 */
  onFieldChange: (name: string, value: any) => void;
  /** 字段验证 */
  onFieldValidate: (name: string, valid: boolean, errors: string[]) => void;
  /** 更新字段配置 */
  updateFieldConfig?: (name: string, config: Partial<FormField>) => void;
  /** 字段获得焦点 */
  onFieldFocus?: (name: string) => void;
  /** 字段失去焦点 */
  onFieldBlur?: (name: string) => void;
}

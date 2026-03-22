/**
 * DateTimePicker 组件类型定义
 */

export type DateTimePickerSize = 'small' | 'medium' | 'large';

export type DateTimePickerTheme = 'primary' | 'success' | 'warning' | 'danger';

export interface DateTimePickerProps {
  /** 绑定值 */
  modelValue?: string | Date;
  /** 默认值 */
  defaultValue?: Date;
  /** 占位符 */
  placeholder?: string;
  /** 日期占位符 */
  datePlaceholder?: string;
  /** 时间占位符 */
  timePlaceholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 尺寸 */
  size?: DateTimePickerSize;
  /** 主题 */
  theme?: DateTimePickerTheme;
  /** 显示格式 */
  format?: string;
  /** 绑定值格式 */
  valueFormat?: string;
  /** 是否显示时间选择 */
  showTime?: boolean;
  /** 是否显示秒 */
  showSeconds?: boolean;
  /** 最小日期 */
  minDate?: string | Date;
  /** 最大日期 */
  maxDate?: string | Date;
  /** 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** 自定义类名 */
  customClass?: string;
  /** 是否使用12小时制 */
  use12Hours?: boolean;
}

export interface DateTimePickerEmits {
  (e: 'update:modelValue', value: string | Date): void;
  (e: 'change', value: Date): void;
  (e: 'ok', value: Date): void;
  (e: 'cancel'): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
}

export interface DateTimePickerExpose {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

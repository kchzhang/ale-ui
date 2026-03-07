export type TimePickerSize = 'large' | 'medium' | 'small';

export type TimePickerTheme = 'primary' | 'success' | 'warning' | 'danger';

export interface TimePickerProps {
  /** 绑定值，格式为 HH:mm:ss */
  modelValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 尺寸 */
  size?: TimePickerSize;
  /** 主题 */
  theme?: TimePickerTheme;
  /** 是否显示秒 */
  showSeconds?: boolean;
  /** 是否使用12小时制 */
  use12Hours?: boolean;
  /** 最小时间 */
  minTime?: string;
  /** 最大时间 */
  maxTime?: string;
  /** 自定义类名 */
  customClass?: string;
}

export interface TimePickerEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
}

export interface TimePickerExpose {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

/**
 * DatePicker 组件类型定义
 */

export type DatePickerSize = 'small' | 'medium' | 'large';

export type DatePickerTheme = 'primary' | 'success' | 'warning' | 'danger';

export type DatePickerView = 'date' | 'month' | 'year';

/** 日期选择器类型 */
export type DatePickerType = 'date' | 'datetime' | 'daterange' | 'datetimerange';

/** 范围值类型 */
export type DateRangeValue = [string, string] | [Date, Date] | null;

export interface ShortcutItem {
  text: string;
  value: Date | (() => Date);
}

/** 范围快捷选项 */
export interface RangeShortcutItem {
  text: string;
  value: [Date, Date] | (() => [Date, Date]);
}

export interface DatePickerProps {
  /** 绑定值 */
  modelValue?: string | Date | DateRangeValue;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 尺寸 */
  size?: DatePickerSize;
  /** 主题 */
  theme?: DatePickerTheme;
  /** 显示格式 */
  format?: string;
  /** 绑定值格式 */
  valueFormat?: string;
  /** 最小日期 */
  minDate?: string | Date;
  /** 最大日期 */
  maxDate?: string | Date;
  /** 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** 快捷选项 */
  shortcuts?: ShortcutItem[];
  /** 自定义类名 */
  customClass?: string;
  /** 选择器类型 */
  type?: DatePickerType;
  /** 范围分隔符 */
  rangeSeparator?: string;
  /** 开始日期占位符 */
  startPlaceholder?: string;
  /** 结束日期占位符 */
  endPlaceholder?: string;
  /** 默认时间（范围选择时） */
  defaultTime?: [Date, Date] | null;
  /** 范围快捷选项 */
  rangeShortcuts?: RangeShortcutItem[];
}

export interface DatePickerEmits {
  (e: 'update:modelValue', value: string | Date | DateRangeValue): void;
  (e: 'change', value: Date | [Date, Date] | null): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
  (e: 'panel-change', view: DatePickerView): void;
  (e: 'month-change', month: number): void;
  (e: 'year-change', year: number): void;
}

export interface DatePickerExpose {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

export interface DatePanelProps {
  /** 当前显示的年份 */
  currentYear: number;
  /** 当前显示的月份 */
  currentMonth: number;
  /** 选中的日期 */
  selectedDate: Date | null;
  /** 最小日期 */
  minDate?: Date;
  /** 最大日期 */
  maxDate?: Date;
  /** 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** 范围开始日期 */
  rangeStart?: Date | null;
  /** 范围结束日期 */
  rangeEnd?: Date | null;
  /** 悬浮日期（用于范围预览） */
  hoverDate?: Date | null;
  /** 是否为范围选择模式 */
  isRangeMode?: boolean;
  /** 选择阶段 'start' | 'end' */
  selectingType?: 'start' | 'end';
}

export interface DatePanelEmits {
  (e: 'select', date: Date): void;
  (e: 'prev-month'): void;
  (e: 'next-month'): void;
  (e: 'prev-year'): void;
  (e: 'next-year'): void;
  (e: 'change-view', view: 'month' | 'year'): void;
  (e: 'hover', date: Date | null): void;
}

export interface MonthPanelProps {
  /** 当前年份 */
  currentYear: number;
  /** 选中的月份 */
  selectedMonth: number;
  /** 最小日期 */
  minDate?: Date;
  /** 最大日期 */
  maxDate?: Date;
}

export interface MonthPanelEmits {
  (e: 'select', month: number): void;
  (e: 'prev-year'): void;
  (e: 'next-year'): void;
  (e: 'change-view'): void;
}

export interface YearPanelProps {
  /** 当前年份 */
  currentYear: number;
  /** 选中的年份 */
  selectedYear: number;
  /** 最小日期 */
  minDate?: Date;
  /** 最大日期 */
  maxDate?: Date;
}

export interface YearPanelEmits {
  (e: 'select', year: number): void;
}

export interface DateInputProps {
  /** 输入值 */
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
  size?: DatePickerSize;
  /** 主题 */
  theme?: DatePickerTheme;
  /** 是否聚焦 */
  focused?: boolean;
  /** 是否激活 */
  active?: boolean;
}

export interface DateInputEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'click'): void;
  (e: 'clear'): void;
}

/** 时间面板 Props */
export interface TimePanelProps {
  /** 选中的小时 */
  modelHour?: number;
  /** 选中的分钟 */
  modelMinute?: number;
  /** 选中的秒 */
  modelSecond?: number;
  /** 是否禁用 */
  disabled?: boolean;
}

/** 时间面板 Emits */
export interface TimePanelEmits {
  (e: 'update:modelHour', value: number): void;
  (e: 'update:modelMinute', value: number): void;
  (e: 'update:modelSecond', value: number): void;
}

/** 日期范围面板 Props */
export interface DateRangePanelProps {
  /** 开始日期 */
  startDate?: Date | null;
  /** 结束日期 */
  endDate?: Date | null;
  /** 最小日期 */
  minDate?: Date;
  /** 最大日期 */
  maxDate?: Date;
  /** 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** 是否显示时间选择 */
  showTime?: boolean;
  /** 开始时间 - 小时 */
  startHour?: number;
  /** 开始时间 - 分钟 */
  startMinute?: number;
  /** 开始时间 - 秒 */
  startSecond?: number;
  /** 结束时间 - 小时 */
  endHour?: number;
  /** 结束时间 - 分钟 */
  endMinute?: number;
  /** 结束时间 - 秒 */
  endSecond?: number;
}

/** 日期范围面板 Emits */
export interface DateRangePanelEmits {
  (e: 'update:startDate', value: Date | null): void;
  (e: 'update:endDate', value: Date | null): void;
  (e: 'update:startHour', value: number): void;
  (e: 'update:startMinute', value: number): void;
  (e: 'update:startSecond', value: number): void;
  (e: 'update:endHour', value: number): void;
  (e: 'update:endMinute', value: number): void;
  (e: 'update:endSecond', value: number): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}

import type { Ref } from 'vue';

/**
 * Select 选项数据类型
 */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Select 尺寸类型
 */
export type SelectSize = 'large' | 'medium' | 'small';

/**
 * Select 组件 Props
 */
export interface SelectProps {
  /** 绑定值 */
  modelValue?: string | number | (string | number)[];
  /** 选项数据 */
  options?: SelectOption[];
  /** 尺寸 */
  size?: SelectSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 是否可搜索 */
  filterable?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** 占位提示文本 */
  placeholder?: string;
  /** 是否只读 */
  readonly?: boolean;
  /** 远程搜索方法 */
  remoteMethod?: (query: string) => Promise<SelectOption[]> | SelectOption[];
  /** 是否正在加载 */
  loading?: boolean;
  /** 无数据时的提示文本 */
  noDataText?: string;
  /** 远程搜索时的提示文本 */
  loadingText?: string;
  /** 自定义搜索过滤方法 */
  filterMethod?: (query: string, option: SelectOption) => boolean;
  /** 是否虚拟滚动（大数据优化） */
  virtualScroll?: boolean;
  /** 虚拟滚动时每项高度 */
  itemHeight?: number;
  /** 虚拟滚动时可视区域显示数量 */
  visibleCount?: number;
  /** 是否允许创建新条目（配合 filterable 使用） */
  allowCreate?: boolean;
  /** 自定义类名 */
  customClass?: string;
  /** 自定义样式 */
  customStyle?: Record<string, string>;
  /** 最大显示标签数（多选时） */
  maxCollapseTags?: number;
  /** 自定义选项渲染 */
  optionRender?: (option: SelectOption, selected: boolean) => unknown;
}

/**
 * Select 组件 Emits
 */
export interface SelectEmits {
  (e: 'update:modelValue', value: string | number | (string | number)[]): void;
  (e: 'change', value: string | number | (string | number)[]): void;
  (e: 'visible-change', visible: boolean): void;
  (e: 'remove-tag', value: string | number): void;
  (e: 'clear'): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'search', query: string): void;
  (e: 'create', value: string): void;
  (e: 'search-error', error: Error): void;
}

/**
 * Select 组件暴露的方法
 */
export interface SelectExpose {
  /** 聚焦选择器 */
  focus: () => void;
  /** 失焦选择器 */
  blur: () => void;
  /** 获取焦点状态 */
  isFocused: () => boolean;
  /** 清空选择 */
  clear: () => void;
  /** 打开下拉菜单 */
  openDropdown: () => void;
  /** 关闭下拉菜单 */
  closeDropdown: () => void;
}

/**
 * Select 状态类型
 */
export interface SelectState {
  isOpen: boolean;
  isFocused: boolean;
  searchQuery: string;
  highlightedIndex: number;
  filteredOptions: SelectOption[];
  selectedValues: (string | number)[];
}

/**
 * Option 组件 Props
 */
export interface OptionProps {
  /** 选项标签 */
  label?: string;
  /** 选项值 */
  value: string | number;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * Option 组件 Emits
 */
export interface OptionEmits {
  (e: 'click'): void;
}

/**
 * Select 上下文（用于 provide/inject）
 */
export interface SelectContext {
  /** 是否选中 */
  isSelected: (value: string | number) => boolean;
  /** 选中的值 */
  selectedValues: Ref<(string | number)[]>;
  /** 高亮的值 */
  highlightedValue: Ref<string | number | undefined>;
  /** 设置高亮值 */
  setHighlightedValue: (value: string | number) => void;
  /** 选择选项 */
  selectOption: (value: string | number, option: SelectOption) => void;
  /** 是否多选 */
  multiple: Ref<boolean>;
  /** 注册选项标签（用于 slot 模式） */
  registerOptionLabel?: (value: string | number, label: string) => void;
}

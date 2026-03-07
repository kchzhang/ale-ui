/**
 * Cascader 级联选择器类型定义
 */

/**
 * 级联选项数据类型
 */
export interface CascaderOption {
  /** 选项值 */
  value: string | number;
  /** 选项标签 */
  label: string;
  /** 子选项 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义数据 */
  [key: string]: unknown;
}

/**
 * 级联选择器尺寸
 */
export type CascaderSize = 'large' | 'medium' | 'small';

/**
 * 任意选择模式
 */
export type CascaderCheckStrictly = 'single' | 'multiple' | false;

/**
 * 级联选择器 Props
 */
export interface CascaderProps {
  /** 绑定值（选中的值数组，单选时为数组，多选时为二维数组） */
  modelValue?: (string | number)[] | (string | number)[][];
  /** 选项数据 */
  options?: CascaderOption[];
  /** 尺寸 */
  size?: CascaderSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 是否可搜索 */
  filterable?: boolean;
  /** 占位提示文本 */
  placeholder?: string;
  /** 是否显示完整路径 */
  showAllLevels?: boolean;
  /** 自定义分隔符 */
  separator?: string;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否在输入框中显示选中路径 */
  collapseTags?: boolean;
  /** 最大折叠标签数 */
  collapseTagsTooltip?: number;
  /** 自定义类名 */
  customClass?: string;
  /** 自定义样式 */
  customStyle?: Record<string, string>;
  /** 是否在一级节点前展开子菜单 */
  expandTrigger?: 'click' | 'hover';
  /** 自定义筛选方法 */
  filterMethod?: (node: CascaderOption, keyword: string) => boolean;
  /** 是否在选中后关闭下拉菜单 */
  closeOnSelect?: boolean;
  /** 选择模式：false-仅叶子节点，single-单选任意节点，multiple-多选任意节点 */
  checkStrictly?: CascaderCheckStrictly;
  /** 空数据提示 */
  noDataText?: string;
  /** 加载中提示 */
  loadingText?: string;
  /** 是否加载中 */
  loading?: boolean;
  /** 动态加载子节点方法 */
  lazyLoad?: (node: CascaderOption, resolve: (children: CascaderOption[]) => void) => void;
  /** 是否懒加载 */
  lazy?: boolean;
  /** 懒加载时的节点数据 */
  lazyLoadNode?: CascaderOption;
}

/**
 * 级联选择器 Emits
 */
export interface CascaderEmits {
  (e: 'update:modelValue', value: (string | number)[] | (string | number)[][]): void;
  (e: 'change', value: (string | number)[] | (string | number)[][]): void;
  (e: 'visible-change', visible: boolean): void;
  (e: 'expand-change', value: (string | number)[]): void;
  (e: 'clear'): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}

/**
 * 级联选择器暴露的方法
 */
export interface CascaderExpose {
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
 * 级联选择器状态
 */
export interface CascaderState {
  isOpen: boolean;
  isFocused: boolean;
  searchQuery: string;
  selectedPath: CascaderOption[];
  activePath: CascaderOption[];
}

/**
 * 级联节点上下文（用于 provide/inject）
 */
export interface CascaderNodeContext {
  /** 节点是否选中 */
  isSelected: (value: string | number) => boolean;
  /** 节点是否激活 */
  isActive: (value: string | number) => boolean;
  /** 当前激活路径 */
  activePath: CascaderOption[];
  /** 选中的路径 */
  selectedPath: CascaderOption[];
  /** 选择节点 */
  selectNode: (node: CascaderOption) => void;
  /** 激活节点 */
  activateNode: (node: CascaderOption) => void;
  /** 是否禁用 */
  disabled: boolean;
}

/**
 * List 组件类型定义
 */

/** 列表尺寸 */
export type ListSize = 'small' | 'medium' | 'large';

/** 列表布局 */
export type ListLayout = 'vertical' | 'horizontal';

/** 列表边框样式 */
export type ListBorderStyle = 'solid' | 'dashed' | 'none';

/**
 * List 组件 Props
 */
export interface ListProps {
  /** 列表数据 */
  data?: ListItemData[];
  /** 尺寸 */
  size?: ListSize;
  /** 布局方向 */
  layout?: ListLayout;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 边框样式 */
  borderStyle?: ListBorderStyle;
  /** 是否显示分隔线 */
  split?: boolean;
  /** 是否显示序号 */
  showIndex?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 空状态文本 */
  emptyText?: string;
  /** 自定义类名 */
  customClass?: string;
  /** 自定义样式 */
  customStyle?: Record<string, string>;
}

/**
 * List 组件 Emits
 */
export interface ListEmits {
  /** 点击列表项 */
  (e: 'click', item: ListItemData, index: number): void;
  /** 点击列表项操作按钮 */
  (e: 'action', item: ListItemData, index: number, action: string): void;
}

/**
 * 列表项数据
 */
export interface ListItemData {
  /** 唯一标识 */
  id: string | number;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 头像/图标 */
  avatar?: string;
  /** 额外内容 */
  extra?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义数据 */
  [key: string]: unknown;
}

/**
 * ListItem 组件 Props
 */
export interface ListItemProps {
  /** 列表项数据 */
  item: ListItemData;
  /** 索引 */
  index?: number;
  /** 尺寸 */
  size?: ListSize;
  /** 布局方向 */
  layout?: ListLayout;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示分隔线 */
  split?: boolean;
  /** 是否显示序号 */
  showIndex?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否激活 */
  active?: boolean;
}

/**
 * ListItem 组件 Emits
 */
export interface ListItemEmits {
  /** 点击列表项 */
  (e: 'click', item: ListItemData, index: number): void;
  /** 点击操作 */
  (e: 'action', item: ListItemData, index: number, action: string): void;
}

/**
 * List 组件暴露的方法
 */
export interface ListExpose {
  /** 滚动到指定项 */
  scrollTo: (index: number) => void;
  /** 获取列表项元素 */
  getItemElement: (index: number) => HTMLElement | null;
}

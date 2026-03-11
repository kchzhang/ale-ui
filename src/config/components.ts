/**
 * 组件配置文件
 * 定义所有可用组件及其路由信息
 */

/**
 * 组件分类
 */
export type ComponentCategory = 'basic' | 'composite';

export interface ComponentConfig {
  /**
   * 组件标识符
   */
  id: string;
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件路由路径
   */
  path: string;
  /**
   * 组件描述
   */
  description?: string;
  /**
   * 组件图标
   */
  icon?: string;
  /**
   * 组件分类
   * - basic: 基础组件
   * - composite: 组合组件
   */
  category: ComponentCategory;
}

/**
 * 基础组件列表
 */
export const basicComponents: ComponentConfig[] = [
  {
    id: 'button',
    name: 'Button 按钮',
    path: '/components/button',
    description: '按钮用于开始一个即时操作',
    icon: '🔘',
    category: 'basic'
  },
  {
    id: 'badge',
    name: 'Badge 徽标',
    path: '/components/badge',
    description: '用于显示数量、状态或标记信息的徽标组件',
    icon: '🏷️',
    category: 'basic'
  },
  {
    id: 'card',
    name: 'Card 卡片',
    path: '/components/card',
    description: '用于组织信息，使其结构化',
    icon: '📇',
    category: 'basic'
  },
  {
    id: 'input',
    name: 'Input 输入框',
    path: '/components/input',
    description: '通过鼠标或键盘输入字符',
    icon: '📝',
    category: 'basic'
  },
  {
    id: 'select',
    name: 'Select 选择器',
    path: '/components/select',
    description: '下拉选择器，供用户选择多个选项',
    icon: '📋',
    category: 'basic'
  },
  {
    id: 'checkbox',
    name: 'Checkbox 复选框',
    path: '/components/checkbox',
    description: '在一组选项中进行多选',
    icon: '☑️',
    category: 'basic'
  },
  {
    id: 'radio',
    name: 'Radio 单选框',
    path: '/components/radio',
    description: '在一组选项中进行单选',
    icon: '🔘',
    category: 'basic'
  },
  {
    id: 'switch',
    name: 'Switch 开关',
    path: '/components/switch',
    description: '开关选择器',
    icon: '🔀',
    category: 'basic'
  },
  {
    id: 'tag',
    name: 'Tag 标签',
    path: '/components/tag',
    description: '用于标记和选择',
    icon: '🏷️',
    category: 'basic'
  },
  {
    id: 'icon',
    name: 'Icon 图标',
    path: '/components/icon',
    description: '提供了一套常用的图标集',
    icon: '🎨',
    category: 'basic'
  },
  {
    id: 'scroll',
    name: 'Scroll 滚动条',
    path: '/components/scroll',
    description: '自定义滚动条组件，支持多种主题和交互效果',
    icon: '📜',
    category: 'basic'
  },
  {
    id: 'code-block',
    name: 'CodeBlock 代码展示',
    path: '/components/code-block',
    description: '精美的代码展示组件，支持语法高亮、代码复制',
    icon: '💻',
    category: 'basic'
  },
  {
    id: 'dialog',
    name: 'Dialog 对话框',
    path: '/components/dialog',
    description: '在保留当前页面状态的情况下，提示用户进行某些操作',
    icon: '💬',
    category: 'basic'
  },
  {
    id: 'message',
    name: 'Message 消息提示',
    path: '/components/message',
    description: '消息提示组件，服务式调用',
    icon: '💭',
    category: 'basic'
  },
  {
    id: 'notification',
    name: 'Notification 通知',
    path: '/components/notification',
    description: '悬浮出现在页面角落，显示全局的通知提醒消息',
    icon: '🔔',
    category: 'basic'
  },
  {
    id: 'loading',
    name: 'Loading 加载',
    path: '/components/loading',
    description: '加载数据时显示动效，支持指令和服务式调用',
    icon: '⏳',
    category: 'basic'
  },
  {
    id: 'table',
    name: 'Table 表格',
    path: '/components/table',
    description: '展示大量结构化数据，支持排序、筛选、分页等',
    icon: '📊',
    category: 'basic'
  },
  {
    id: 'pagination',
    name: 'Pagination 分页',
    path: '/components/pagination',
    description: '用于分隔长列表的分页组件',
    icon: '📄',
    category: 'basic'
  },
  {
    id: 'tabs',
    name: 'Tabs 标签页',
    path: '/components/tabs',
    description: '选项卡切换组件，组织多块内容',
    icon: '📑',
    category: 'basic'
  },
  {
    id: 'tree',
    name: 'Tree 树形控件',
    path: '/components/tree',
    description: '用于展示树形结构数据',
    icon: '🌲',
    category: 'basic'
  },
  {
    id: 'dropdown',
    name: 'Dropdown 下拉菜单',
    path: '/components/dropdown',
    description: '将动作或菜单折叠到下拉菜单中',
    icon: '⬇️',
    category: 'basic'
  },
  {
    id: 'carousel',
    name: 'Carousel 走马灯',
    path: '/components/carousel',
    description: '在有限空间内，循环播放同一类型的图片、文字等内容',
    icon: '🎠',
    category: 'basic'
  },
  {
    id: 'form',
    name: 'Form 表单',
    path: '/components/form',
    description: '用于数据录入、校验的表单组件，组合多种输入控件',
    icon: '📋',
    category: 'basic'
  },
  {
    id: 'list',
    name: 'List 列表',
    path: '/components/list',
    description: '展示一系列简单的列表信息',
    icon: '📄',
    category: 'basic'
  },
  {
    id: 'infinite-scroll',
    name: 'InfiniteScroll 滚动加载',
    path: '/components/infinite-scroll',
    description: '滚动到底部自动加载更多数据',
    icon: '⬇️',
    category: 'basic'
  },
  {
    id: 'cascader',
    name: 'Cascader 级联选择器',
    path: '/components/cascader',
    description: '级联选择器用于多层级数据的逐级选择',
    icon: '📑',
    category: 'basic'
  },
  {
    id: 'upload',
    name: 'Upload 上传',
    path: '/components/upload',
    description: '通过点击或者拖拽上传文件',
    icon: '📤',
    category: 'basic'
  },
  {
    id: 'progress',
    name: 'Progress 进度条',
    path: '/components/progress',
    description: '用于展示操作进度或数据占比',
    icon: '📊',
    category: 'basic'
  },
  {
    id: 'time-picker',
    name: 'TimePicker 时间选择器',
    path: '/components/time-picker',
    description: '用于选择或输入时间，支持12/24小时制',
    icon: '🕐',
    category: 'basic'
  },
  {
    id: 'date-picker',
    name: 'DatePicker 日期选择器',
    path: '/components/date-picker',
    description: '用于选择或输入日期，支持日期格式化、快捷选择、禁用日期等功能',
    icon: '📅',
    category: 'basic'
  },
  {
    id: 'split',
    name: 'Split 分割面板',
    path: '/components/split',
    description: '用于将容器分割为多个可调整大小的面板',
    icon: '⊞',
    category: 'basic'
  }
];

/**
 * 组合组件列表（暂无）
 */
export const compositeComponents: ComponentConfig[] = [];

/**
 * 分类信息
 */
export const categoryInfo = {
  basic: {
    title: '基础组件',
    description: '原子级组件，不可再分的最小单元'
  },
  composite: {
    title: '组合组件',
    description: '功能复杂或由多个基础组件组合'
  }
};

/**
 * 所有组件列表（向后兼容）
 */
export const componentList: ComponentConfig[] = [
  ...basicComponents,
  ...compositeComponents
];

/**
 * 根据路径获取组件配置
 */
export const getComponentByPath = (path: string): ComponentConfig | undefined => {
  return componentList.find(component => component.path === path);
};

/**
 * 根据ID获取组件配置
 */
export const getComponentById = (id: string): ComponentConfig | undefined => {
  return componentList.find(component => component.id === id);
};

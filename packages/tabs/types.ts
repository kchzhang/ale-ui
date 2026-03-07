import type { WritableComputedRef, ComputedRef } from 'vue';

/**
 * Tabs 组件类型定义
 * @description 标签页组件的类型定义文件
 */

/**
 * 标签页位置类型
 */
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * 标签页类型
 */
export type TabsType = '' | 'card' | 'border-card';

/**
 * TabPane 组件 Props
 */
export interface TabPaneProps {
  /**
   * 选项卡标题，可通过 #label 插槽自定义
   */
  label?: string;
  /**
   * 与选项卡绑定值 value 对应的标识符，表示选项卡别名
   */
  name: string | number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否可关闭
   */
  closable?: boolean;
  /**
   * 是否延迟渲染
   */
  lazy?: boolean;
}

/**
 * Tabs 组件 Props
 */
export interface TabsProps {
  /**
   * 绑定值，选中选项卡的 name
   */
  modelValue?: string | number;
  /**
   * 类型风格
   */
  type?: TabsType;
  /**
   * 选项卡位置
   */
  tabPosition?: TabsPosition;
  /**
   * 是否可以增加标签页
   */
  addable?: boolean;
  /**
   * 标签是否可关闭
   */
  closable?: boolean;
  /**
   * 标签是否同时可增加和关闭
   */
  editable?: boolean;
  /**
   * 选项卡标题是否拉伸填充
   */
  stretch?: boolean;
  /**
   * 切换标签之前的钩子函数，返回 false 可阻止切换
   */
  beforeLeave?: (activeName: string | number, oldActiveName: string | number) => boolean | Promise<boolean>;
}

/**
 * Tabs 组件 Emits
 */
export interface TabsEmits {
  /**
   * 绑定值改变时触发
   */
  (e: 'update:modelValue', value: string | number): void;
  /**
   * tab 被选中时触发
   */
  (e: 'tab-click', pane: { name: string | number; label: string }, event: Event): void;
  /**
   * 点击 tab 移除按钮时触发
   */
  (e: 'tab-remove', name: string | number): void;
  /**
   * 点击 tabs 的新增按钮时触发
   */
  (e: 'tab-add'): void;
  /**
   * 标签页改变时触发
   */
  (e: 'change', name: string | number): void;
}

/**
 * TabPane 组件 Emits
 */
export interface TabPaneEmits {
  /**
   * 选项卡被选中时触发
   */
  (e: 'tab-click', event: Event): void;
}

/**
 * Tabs 实例方法
 */
export interface TabsExpose {
  /**
   * 当前激活的 pane
   */
  currentName: WritableComputedRef<string | number>;
}

/**
 * TabPane 实例方法
 */
export interface TabPaneExpose {
  /**
   * 选项卡标识符
   */
  name: ComputedRef<string | number>;
  /**
   * 是否激活
   */
  active: ComputedRef<boolean>;
}

/**
 * Tab Pane 数据（内部使用）
 */
export interface TabPaneState {
  uid: number;
  props: TabPaneProps;
  slots: {
    default?: () => unknown;
    label?: () => unknown;
  };
  paneName: string | number | undefined;
  active: boolean;
  index: string | undefined;
  isClosable: boolean;
}

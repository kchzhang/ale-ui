/**
 * Tree 组件类型定义 - Element Plus 规范
 */

import type { VNode, RenderFunction } from 'vue';

/**
 * 树节点数据
 */
export interface TreeData {
  id?: string | number;
  label?: string;
  children?: TreeData[];
  disabled?: boolean;
  isLeaf?: boolean;
  [key: string]: any;
}

/**
 * 树节点配置选项
 */
export interface TreeOptionProps {
  label?: string;
  children?: string;
  disabled?: string;
  isLeaf?: string;
  class?: string;
}

/**
 * 树节点
 */
export interface TreeNode {
  id: string | number;
  level: number;
  loaded: boolean;
  loading: boolean;
  checked: boolean;
  expanded: boolean;
  parent: TreeNode | null;
  visible: boolean;
  data: TreeData;
  childNodes: TreeNode[];
  isLeaf: boolean;
  indeterminate: boolean;
  canFocus: boolean;
}

/**
 * Tree 组件 Props
 */
export interface TreeProps {
  /** 展示数据 */
  data?: TreeData[];
  /** 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 */
  nodeKey?: string;
  /** 配置选项 */
  props?: TreeOptionProps;
  /** 是否默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 是否在点击节点的时候展开或者收缩节点 */
  expandOnClickNode?: boolean;
  /** 是否在点击节点的时候选中节点 */
  checkOnClickNode?: boolean;
  /** 默认展开的节点的 key 的数组 */
  defaultExpandedKeys?: (string | number)[];
  /** 默认勾选的节点的 key 的数组 */
  defaultCheckedKeys?: (string | number)[];
  /** 默认选中的节点的 key */
  currentNodeKey?: string | number;
  /** 节点是否可被选择 */
  showCheckbox?: boolean;
  /** 是否启用复选框（showCheckbox 的别名） */
  checkable?: boolean;
  /** 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 */
  checkStrictly?: boolean;
  /** 对树节点进行筛选时执行的方法，返回 true 表示可以显示，返回 false 则表示隐藏 */
  filterNodeMethod?: FilterNodeMethodFunction;
  /** 是否每次只打开一个同级树节点展开 */
  accordion?: boolean;
  /** 相邻级节点间的水平缩进，单位为像素 */
  indent?: number;
  /** 是否开启拖拽节点功能 */
  draggable?: boolean;
  /** 判断节点能否被拖拽 */
  allowDrag?: AllowDragFunction;
  /** 拖拽时判定目标节点能否被放置 */
  allowDrop?: AllowDropFunction;
  /** 是否懒加载子节点，需与 load 方法结合使用 */
  lazy?: boolean;
  /** 加载子树数据的方法，仅当 lazy 属性为 true 时有效 */
  load?: LoadFunction;
  /** 渲染节点的内容 */
  renderContent?: RenderContentFunction;
  /** 是否高亮当前选中节点 */
  highlightCurrent?: boolean;
}

/**
 * 过滤节点方法
 */
export type FilterNodeMethodFunction = (value: string, data: TreeData, node: TreeNode) => boolean;

/**
 * 允许拖拽方法
 */
export type AllowDragFunction = (node: TreeNode) => boolean;

/**
 * 允许放置方法
 */
export type AllowDropFunction = (draggingNode: TreeNode, dropNode: TreeNode, type: 'before' | 'after' | 'inner') => boolean;

/**
 * 加载数据方法
 */
export type LoadFunction = (data: TreeData, resolve: (data: TreeData[]) => void) => void;

/**
 * 渲染内容方法
 */
export type RenderContentFunction = (
  h: typeof import('vue').h,
  context: { node: TreeNode; data: TreeData; store: any }
) => VNode | VNode[] | string;

/**
 * Tree 组件 Emits
 */
export interface TreeEmits {
  /** 节点被点击时触发 */
  (e: 'node-click', data: TreeData, node: TreeNode, component: any): void;
  /** 节点被双击时触发 */
  (e: 'node-dblclick', data: TreeData, node: TreeNode, component: any): void;
  /** 节点被右键点击时触发 */
  (e: 'node-contextmenu', event: Event, data: TreeData, node: TreeNode, component: any): void;
  /** 节点被展开时触发 */
  (e: 'node-expand', data: TreeData, node: TreeNode, component: any): void;
  /** 节点被收起时触发 */
  (e: 'node-collapse', data: TreeData, node: TreeNode, component: any): void;
  /** 节点选中状态发生变化时的回调 */
  (e: 'check-change', data: TreeData, checked: boolean, indeterminate: boolean): void;
  /** 当复选框被点击的时候触发 */
  (e: 'check', data: TreeData, checkedInfo: { checkedKeys: (string | number)[]; checkedNodes: TreeData[]; halfCheckedKeys: (string | number)[]; halfCheckedNodes: TreeData[] }): void;
  /** 当前选中节点变化时触发 */
  (e: 'current-change', data: TreeData, node: TreeNode): void;
  /** 节点开始拖拽时触发 */
  (e: 'node-drag-start', node: TreeNode, ev: DragEvent): void;
  /** 拖拽进入节点时触发 */
  (e: 'node-drag-enter', draggingNode: TreeNode, dropNode: TreeNode, ev: DragEvent): void;
  /** 拖拽离开节点时触发 */
  (e: 'node-drag-leave', draggingNode: TreeNode, dropNode: TreeNode, ev: DragEvent): void;
  /** 在拖拽节点时触发 */
  (e: 'node-drag-over', draggingNode: TreeNode, dropNode: TreeNode, ev: DragEvent): void;
  /** 拖拽结束时触发 */
  (e: 'node-drag-end', draggingNode: TreeNode, dropNode: TreeNode | null, dropType: 'before' | 'after' | 'inner' | undefined, ev: DragEvent): void;
  /** 拖拽成功完成时触发 */
  (e: 'node-drop', draggingNode: TreeNode, dropNode: TreeNode, dropType: 'before' | 'after' | 'inner', ev: DragEvent): void;
}

/**
 * Tree 组件暴露的方法
 */
export interface TreeExpose {
  /** 对树节点进行筛选操作 */
  filter: (value: string) => void;
  /** 更新已展开的节点 */
  updateKeyChildren: (key: string | number, data: TreeData[]) => void;
  /** 若节点可被选择，则返回目前被选中的节点所组成的数组 */
  getCheckedNodes: (leafOnly?: boolean) => TreeData[];
  /** 若节点可被选择，则返回目前被选中的节点的 key 所组成的数组 */
  getCheckedKeys: (leafOnly?: boolean) => (string | number)[];
  /** 若节点可被选择，则返回目前半选中的节点所组成的数组 */
  getHalfCheckedNodes: () => TreeData[];
  /** 若节点可被选择，则返回目前半选中的节点的 key 所组成的数组 */
  getHalfCheckedKeys: () => (string | number)[];
  /** 获取当前被选中节点的 data */
  getCurrentNode: () => TreeData | null;
  /** 获取当前被选中节点的 key */
  getCurrentKey: () => string | number | null;
  /** 设置指定节点为选中状态 */
  setCurrentKey: (key: string | number | null) => void;
  /** 设置指定节点为选中状态 */
  setCurrentNode: (node: TreeNode) => void;
  /** 根据 key 或者 data 获取节点 */
  getNode: (key: string | number | TreeData) => TreeNode | null;
  /** 移除指定节点 */
  remove: (data: TreeData | TreeNode) => void;
  /** 为 Tree 中的一个节点追加一个子节点 */
  append: (data: TreeData, parentNode: TreeData | TreeNode | string | number) => void;
  /** 在指定节点前插入一个节点 */
  insertBefore: (data: TreeData, refNode: TreeData | TreeNode | string | number) => void;
  /** 在指定节点后插入一个节点 */
  insertAfter: (data: TreeData, refNode: TreeData | TreeNode | string | number) => void;
  /** 展开所有节点 */
  expandAll: () => void;
  /** 收起所有节点 */
  collapseAll: () => void;
}

/**
 * TreeNode 组件 Props
 */
export interface TreeNodeProps {
  node: TreeNode;
  props: TreeOptionProps;
  renderContent?: RenderContentFunction;
  showCheckbox?: boolean;
  checkable?: boolean;
  checkStrictly?: boolean;
  expandOnClickNode?: boolean;
  checkOnClickNode?: boolean;
  highlightCurrent?: boolean;
  indent?: number;
  icon?: string | RenderFunction;
}

/**
 * 拖拽类型
 */
export type DropType = 'before' | 'after' | 'inner' | undefined;

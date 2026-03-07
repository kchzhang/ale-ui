/**
 * Tree 组件类型定义
 */

/**
 * 树节点数据类型
 */
export interface TreeNodeData {
  /** 节点唯一标识 */
  id: string | number;
  /** 节点显示标签 */
  label: string;
  /** 子节点数组 */
  children?: TreeNodeData[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用复选框 */
  disableCheckbox?: boolean;
  /** 是否是叶子节点 */
  isLeaf?: boolean;
  /** 自定义图标 */
  icon?: string;
  /** 自定义数据 */
  [key: string]: unknown;
}

/**
 * Tree 组件 Props
 */
export interface TreeProps {
  /** 树形数据 */
  data: TreeNodeData[];
  /** 是否展示连接线 */
  showLine?: boolean;
  /** 是否显示复选框 */
  checkable?: boolean;
  /** 是否可以多选 */
  multiple?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 是否默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 默认展开的节点 key 数组 */
  defaultExpandedKeys?: (string | number)[];
  /** 展开的节点 key 数组（受控） */
  expandedKeys?: (string | number)[];
  /** 默认选中的节点 key 数组 */
  defaultSelectedKeys?: (string | number)[];
  /** 选中的节点 key 数组（受控） */
  selectedKeys?: (string | number)[];
  /** 默认勾选的节点 key 数组 */
  defaultCheckedKeys?: (string | number)[];
  /** 勾选的节点 key 数组（受控） */
  checkedKeys?: (string | number)[];
  /** 是否选中时自动展开父节点 */
  autoExpandParent?: boolean;
  /** 是否显示节点图标 */
  showIcon?: boolean;
  /** 是否可搜索 */
  searchable?: boolean;
  /** 搜索关键词 */
  searchValue?: string;
  /** 是否开启虚拟滚动 */
  virtualScroll?: boolean;
  /** 虚拟滚动高度 */
  height?: number;
  /** 虚拟滚动每项高度 */
  itemHeight?: number;
  /** 是否懒加载子节点 */
  loadData?: (node: TreeNodeData) => Promise<void>;
  /** 自定义渲染节点内容 */
  renderNode?: (node: TreeNodeData) => unknown;
  /** 自定义节点 class */
  nodeClass?: string | ((node: TreeNodeData) => string);
  /** 自定义节点 style */
  nodeStyle?: Record<string, string> | ((node: TreeNodeData) => Record<string, string>);
  /** 过滤节点方法 */
  filterNodeMethod?: (value: string, data: TreeNodeData, node: TreeNode) => boolean;
  /** 是否高亮已搜索的内容 */
  highlightCurrent?: boolean;
  /** 当前选中节点的 key */
  currentNodeKey?: string | number;
  /** 是否每次只展开一个同级节点 */
  accordion?: boolean;
  /** 是否手风琴模式 */
  indent?: number;
  /** 自定义子节点键名 */
  props?: {
    label?: string;
    children?: string;
    disabled?: string;
    isLeaf?: string;
  };
}

/**
 * Tree 组件 Emits
 */
export interface TreeEmits {
  (e: 'update:expandedKeys', keys: (string | number)[]): void;
  (e: 'update:selectedKeys', keys: (string | number)[]): void;
  (e: 'update:checkedKeys', keys: (string | number)[]): void;
  (e: 'expand', expandedKeys: (string | number)[], info: { expanded: boolean; node: TreeNodeData }): void;
  (e: 'select', selectedKeys: (string | number)[], info: { selected: boolean; selectedNodes: TreeNodeData[]; node: TreeNodeData; event: Event }): void;
  (e: 'check', checkedKeys: (string | number)[], info: { checked: boolean; checkedNodes: TreeNodeData[]; node: TreeNodeData; event: Event }): void;
  (e: 'click', node: TreeNodeData, event: Event): void;
  (e: 'dblclick', node: TreeNodeData, event: Event): void;
  (e: 'rightClick', node: TreeNodeData, event: MouseEvent): void;
  (e: 'dragstart', node: TreeNodeData, event: DragEvent): void;
  (e: 'dragenter', node: TreeNodeData, event: DragEvent): void;
  (e: 'dragleave', node: TreeNodeData, event: DragEvent): void;
  (e: 'dragover', node: TreeNodeData, event: DragEvent): void;
  (e: 'drop', node: TreeNodeData, dragNode: TreeNodeData, event: DragEvent): void;
  (e: 'dragend', node: TreeNodeData, event: DragEvent): void;
  (e: 'node-expand', node: TreeNodeData): void;
  (e: 'node-collapse', node: TreeNodeData): void;
  (e: 'load', node: TreeNodeData, children: TreeNodeData[]): void;
}

/**
 * 树节点状态
 */
export interface TreeNodeState {
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  indeterminate: boolean;
  loading: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
  visible: boolean;
  level: number;
  parent: TreeNode | null;
  children: TreeNode[];
  data: TreeNodeData;
}

/**
 * TreeNode 组件 Props
 */
export interface TreeNodeProps {
  /** 节点数据 */
  node: TreeNode;
  /** 是否展示连接线 */
  showLine?: boolean;
  /** 是否显示复选框 */
  checkable?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 是否显示节点图标 */
  showIcon?: boolean;
  /** 缩进大小 */
  indent?: number;
  /** 自定义渲染节点内容 */
  renderNode?: (node: TreeNodeData) => unknown;
  /** 搜索关键词 */
  searchValue?: string;
  /** 是否高亮已搜索的内容 */
  highlightCurrent?: boolean;
}

/**
 * Tree 组件暴露的方法
 */
export interface TreeExpose {
  /** 获取当前选中节点 */
  getSelectedNodes: () => TreeNodeData[];
  /** 获取当前勾选节点 */
  getCheckedNodes: () => TreeNodeData[];
  /** 获取当前半勾选节点 */
  getHalfCheckedNodes: () => TreeNodeData[];
  /** 获取当前展开节点 */
  getExpandedKeys: () => (string | number)[];
  /** 设置选中节点 */
  setSelectedKeys: (keys: (string | number)[]) => void;
  /** 设置勾选节点 */
  setCheckedKeys: (keys: (string | number)[]) => void;
  /** 设置展开节点 */
  setExpandedKeys: (keys: (string | number)[]) => void;
  /** 展开所有节点 */
  expandAll: () => void;
  /** 收起所有节点 */
  collapseAll: () => void;
  /** 获取节点 */
  getNode: (key: string | number) => TreeNode | null;
  /** 添加节点 */
  append: (data: TreeNodeData, parentKey?: string | number) => void;
  /** 移除节点 */
  remove: (key: string | number) => void;
  /** 插入节点前 */
  insertBefore: (data: TreeNodeData, refKey: string | number) => void;
  /** 插入节点后 */
  insertAfter: (data: TreeNodeData, refKey: string | number) => void;
  /** 过滤节点 */
  filter: (value: string) => void;
}

/**
 * Tree 上下文
 */
export interface TreeContext {
  /** 是否多选 */
  multiple: boolean;
  /** 是否显示复选框 */
  checkable: boolean;
  /** 是否可拖拽 */
  draggable: boolean;
  /** 缩进大小 */
  indent: number;
  /** 获取节点 key */
  getNodeKey: (node: TreeNodeData) => string | number;
  /** 注册节点 */
  registerNode: (node: any) => void;
  /** 注销节点 */
  unregisterNode: (key: string | number) => void;
  /** 展开/收起节点 */
  toggleExpand: (node: any) => void;
  /** 选中节点 */
  handleSelect: (node: any, event: Event) => void;
  /** 勾选节点 */
  handleCheck: (node: any, event: Event) => void;
  /** 节点点击 */
  handleNodeClick: (node: any, event: Event) => void;
  /** 节点双击 */
  handleNodeDblClick: (node: any, event: Event) => void;
  /** 展开节点 */
  expandNode: (node: any) => void;
  /** 收起节点 */
  collapseNode: (node: any) => void;
  /** 拖拽相关 */
  handleDragStart: (node: any, event: DragEvent) => void;
  handleDragEnter: (node: any, event: DragEvent) => void;
  handleDragLeave: (node: any, event: DragEvent) => void;
  handleDragOver: (node: any, event: DragEvent) => void;
  handleDrop: (node: any, event: DragEvent) => void;
  handleDragEnd: (node: any, event: DragEvent) => void;
}

/**
 * 树节点内部类
 */
export declare class TreeNode {
  id: string | number;
  label: string;
  level: number;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  indeterminate: boolean;
  loading: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
  visible: boolean;
  data: TreeNodeData;
  parent: TreeNode | null;
  children: TreeNode[];
  isLeaf: boolean;
}

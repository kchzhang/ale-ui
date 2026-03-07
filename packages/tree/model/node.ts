/**
 * Tree Node 模型 - Element Plus 规范
 */

import type { TreeData } from '../tree.type';

let nodeIdSeed = 0;

export class Node {
  id: number;
  data: TreeData;
  expanded: boolean;
  parent: Node | null;
  visible: boolean;
  isLeaf: boolean;
  level: number;
  loaded: boolean;
  loading: boolean;
  childNodes: Node[];
  checked: boolean;
  indeterminate: boolean;
  canFocus: boolean;
  _refreshLeafState?: () => void;
  _debouncedRefresh?: () => void;

  constructor(options: {
    data: TreeData;
    parent?: Node | null;
    store: TreeStore;
  }) {
    this.id = nodeIdSeed++;
    this.data = options.data;
    this.parent = options.parent || null;
    this.store = options.store;
    this.level = 0;
    this.loaded = false;
    this.loading = false;
    this.childNodes = [];
    this.checked = false;
    this.indeterminate = false;
    this.expanded = false;
    this.visible = true;
    this.canFocus = false;
    this.isLeaf = false;

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    this.setData(this.data);
  }

  store: TreeStore;

  get label(): string {
    const labelKey = this.store.props.label || 'label';
    return this.data[labelKey] as string;
  }

  get key(): string | number {
    const nodeKey = this.store.key;
    if (nodeKey) {
      return this.data[nodeKey];
    }
    return this.id;
  }

  get disabled(): boolean {
    const disabledKey = this.store.props.disabled || 'disabled';
    return !!this.data[disabledKey];
  }

  get nextSibling(): Node | null {
    const parent = this.parent;
    if (parent) {
      const index = parent.childNodes.indexOf(this);
      if (index > -1 && index < parent.childNodes.length - 1) {
        return parent.childNodes[index + 1] ?? null;
      }
    }
    return null;
  }

  get previousSibling(): Node | null {
    const parent = this.parent;
    if (parent) {
      const index = parent.childNodes.indexOf(this);
      if (index > -1 && index > 0) {
        return parent.childNodes[index - 1] ?? null;
      }
    }
    return null;
  }

  setData(data: TreeData): void {
    this.data = data;
    this.store.setData(this);

    const childrenKey = this.store.props.children || 'children';
    const children = this.data[childrenKey] as TreeData[];

    if (children && Array.isArray(children)) {
      this.childNodes = children.map((child) => {
        return new Node({
          data: child,
          parent: this,
          store: this.store,
        });
      });
    }

    this.updateLeafState();
  }

  updateLeafState(): void {
    const isLeafKey = this.store.props.isLeaf || 'isLeaf';
    // 根据实际子节点数量计算 isLeaf 状态
    const actualIsLeaf = this.childNodes.length === 0;

    // 只有当 data 中没有显式设置 isLeaf 时，才根据子节点数量更新
    // 这样可以保留用户显式设置的值，同时确保自动计算的准确性
    if (this.data[isLeafKey] === undefined) {
      this.isLeaf = actualIsLeaf;
    } else {
      // 如果用户显式设置了 isLeaf，使用用户设置的值
      this.isLeaf = !!this.data[isLeafKey];
    }
  }

  expand(callback?: () => void, expandParent?: boolean): void {
    if (this.expanded) return;

    if (this.store.accordion) {
      // 手风琴模式：收起同级其他节点
      const parent = this.parent;
      if (parent) {
        parent.childNodes.forEach((node) => {
          if (node !== this) {
            node.collapse();
          }
        });
      }
    }

    this.expanded = true;
    this.store.emit('node-expand', this.data, this);

    if (expandParent && this.parent) {
      this.parent.expand(undefined, true);
    }

    if (callback) {
      callback();
    }
  }

  collapse(): void {
    if (!this.expanded) return;
    this.expanded = false;
    this.store.emit('node-collapse', this.data, this);
  }

  shouldLoadData(): boolean {
    return !!this.store.load && !this.loaded && !this.isLeaf;
  }

  loadData(callback: (node: Node) => void): void {
    if (this.loading) return;

    this.loading = true;
    const resolve = (children: TreeData[]) => {
      this.loaded = true;
      this.loading = false;
      this.childNodes = [];

      if (children && Array.isArray(children)) {
        children.forEach((child) => {
          this.insertChild({ data: child });
        });
      }

      this.updateLeafState();
      if (callback) {
        callback(this);
      }
    };

    if (this.store.load) {
      this.store.load(this.data, resolve);
    }
  }

  insertChild(child: { data: TreeData }, index?: number): Node {
    const node = new Node({
      data: child.data,
      parent: this,
      store: this.store,
    });

    if (index !== undefined) {
      this.childNodes.splice(index, 0, node);
    } else {
      this.childNodes.push(node);
    }

    this.updateLeafState();
    // 触发叶子状态刷新事件
    this.store.emit('node-children-change', this);
    return node;
  }

  removeChild(child: Node): void {
    const index = this.childNodes.indexOf(child);
    if (index > -1) {
      this.childNodes.splice(index, 1);
    }
    this.updateLeafState();
    // 触发叶子状态刷新事件
    this.store.emit('node-children-change', this);
  }

  remove(): void {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  // 复选框相关
  setChecked(value: boolean, deep?: boolean): void {
    this.indeterminate = false;
    this.checked = value;

    if (this.store.checkStrictly) {
      // 严格模式：不关联父子
      return;
    }

    if (deep) {
      const setChildChecked = (node: Node, checked: boolean) => {
        node.childNodes.forEach((child) => {
          child.setChecked(checked, true);
        });
      };

      if (this.checked) {
        setChildChecked(this, true);
      } else {
        setChildChecked(this, false);
      }
    }

    // 更新父节点状态（无论当前节点是否有子节点，都需要更新父节点）
    if (this.parent) {
      this.parent.updateParentCheckedState();
    }
  }

  updateParentCheckedState(): void {
    if (this.childNodes.length === 0) return;

    let allChecked = true;
    let noneChecked = true;

    for (const child of this.childNodes) {
      if (child.indeterminate) {
        allChecked = false;
        noneChecked = false;
        break;
      }
      if (child.checked) {
        noneChecked = false;
      } else {
        allChecked = false;
      }
    }

    if (allChecked) {
      this.checked = true;
      this.indeterminate = false;
    } else if (noneChecked) {
      this.checked = false;
      this.indeterminate = false;
    } else {
      this.checked = false;
      this.indeterminate = true;
    }

    if (this.parent) {
      this.parent.updateParentCheckedState();
    }
  }

  getCheckedNodes(leafOnly = false): TreeData[] {
    const nodes: TreeData[] = [];

    const traverse = (node: Node) => {
      if (node.checked && (!leafOnly || node.isLeaf)) {
        nodes.push(node.data);
      }
      node.childNodes.forEach(traverse);
    };

    traverse(this);
    return nodes;
  }

  getHalfCheckedNodes(): TreeData[] {
    const nodes: TreeData[] = [];

    const traverse = (node: Node) => {
      if (node.indeterminate) {
        nodes.push(node.data);
      }
      node.childNodes.forEach(traverse);
    };

    traverse(this);
    return nodes;
  }
}

// 引入 TreeStore 类型
import type { TreeStore } from './tree-store';

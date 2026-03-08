/**
 * Tree Store - 管理树的状态
 */

import { Node } from './node';
import type { TreeData, TreeOptionProps } from '../tree.type';

export class TreeStore {
  currentNode: Node | null = null;
  currentNodeKey: string | number | null = null;
  nodesMap: Map<string | number, Node> = new Map();
  root: Node;
  key: string | undefined;
  props: TreeOptionProps;
  load: ((data: TreeData, resolve: (data: TreeData[]) => void) => void) | undefined;
  accordion: boolean;
  checkStrictly: boolean;
  defaultExpandAll: boolean;
  filterNodeMethod: ((value: string, data: TreeData, node: Node) => boolean) | undefined;
  private callbacks: { [key: string]: Function[] } = {};

  constructor(options: {
    key?: string;
    data: TreeData[];
    props: TreeOptionProps;
    load?: (data: TreeData, resolve: (data: TreeData[]) => void) => void;
    accordion?: boolean;
    checkStrictly?: boolean;
    defaultExpandAll?: boolean;
    filterNodeMethod?: (value: string, data: TreeData, node: Node) => boolean;
    defaultExpandedKeys?: (string | number)[];
    defaultCheckedKeys?: (string | number)[];
    currentNodeKey?: string | number;
  }) {
    this.key = options.key;
    this.props = options.props || {};
    this.load = options.load;
    this.accordion = options.accordion || false;
    this.checkStrictly = options.checkStrictly || false;
    this.defaultExpandAll = options.defaultExpandAll || false;
    this.filterNodeMethod = options.filterNodeMethod;

    // 创建根节点
    this.root = new Node({
      data: { id: '__ROOT__', label: '', children: options.data },
      store: this,
    });

    // 初始化状态
    this.initState({
      defaultExpandedKeys: options.defaultExpandedKeys,
      defaultCheckedKeys: options.defaultCheckedKeys,
      currentNodeKey: options.currentNodeKey,
    });
  }

  private initState(options: {
    defaultExpandedKeys?: (string | number)[];
    defaultCheckedKeys?: (string | number)[];
    currentNodeKey?: string | number;
  }): void {
    // 默认展开
    if (this.defaultExpandAll) {
      this.expandAll();
    } else if (options.defaultExpandedKeys) {
      options.defaultExpandedKeys.forEach((key) => {
        const node = this.getNode(key);
        if (node) {
          node.expand();
        }
      });
    }

    // 默认勾选
    if (options.defaultCheckedKeys) {
      options.defaultCheckedKeys.forEach((key) => {
        const node = this.getNode(key);
        if (node) {
          node.setChecked(true, true);
        }
      });
    }

    // 当前选中节点
    if (options.currentNodeKey !== undefined) {
      this.setCurrentNodeKey(options.currentNodeKey);
    }
  }

  setData(node: Node): void {
    const key = node.key;
    if (key !== undefined) {
      this.nodesMap.set(key, node);
    }
  }

  getNode(key: string | number): Node | null {
    return this.nodesMap.get(key) || null;
  }

  setCurrentNodeKey(key: string | number | null): void {
    if (key === null) {
      this.currentNode = null;
      this.currentNodeKey = null;
      return;
    }

    const node = this.getNode(key);
    if (node) {
      this.currentNode = node;
      this.currentNodeKey = key;
    }
  }

  getCurrentNode(): Node | null {
    return this.currentNode;
  }

  expandAll(): void {
    const expandNode = (node: Node) => {
      node.childNodes.forEach((child) => {
        child.expand();
        expandNode(child);
      });
    };
    expandNode(this.root);
  }

  collapseAll(): void {
    const collapseNode = (node: Node) => {
      node.childNodes.forEach((child) => {
        child.collapse();
        collapseNode(child);
      });
    };
    collapseNode(this.root);
  }

  getCheckedNodes(leafOnly = false): TreeData[] {
    const nodes: TreeData[] = [];
    const traverse = (node: Node) => {
      if (node.checked && (!leafOnly || node.isLeaf)) {
        nodes.push(node.data);
      }
      node.childNodes.forEach(traverse);
    };
    traverse(this.root);
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
    traverse(this.root);
    return nodes;
  }

  getCheckedKeys(leafOnly = false): (string | number)[] {
    return this.getCheckedNodes(leafOnly)
      .map((data) => data[this.key || 'id'])
      .filter((key): key is string | number => key !== undefined);
  }

  getHalfCheckedKeys(): (string | number)[] {
    return this.getHalfCheckedNodes()
      .map((data) => data[this.key || 'id'])
      .filter((key): key is string | number => key !== undefined);
  }

  filter(value: string): void {
    if (!this.filterNodeMethod) {
      // 默认过滤方法
      this.filterNodeMethod = (val, data) => {
        const label = data[this.props.label || 'label'];
        return String(label).toLowerCase().includes(val.toLowerCase());
      };
    }

    const filterNode = (node: Node) => {
      const match = this.filterNodeMethod!(value, node.data, node);
      let childVisible = false;

      node.childNodes.forEach((child) => {
        if (filterNode(child)) {
          childVisible = true;
        }
      });

      node.visible = match || childVisible;

      // 如果子节点匹配，展开父节点
      if (childVisible && !node.expanded) {
        node.expand();
      }

      return node.visible;
    };

    this.root.childNodes.forEach(filterNode);
  }

  append(data: TreeData, parentNode?: Node): Node {
    const parent = parentNode || this.root;
    return parent.insertChild({ data });
  }

  remove(node: Node): void {
    node.remove();
    if (this.key !== undefined) {
      this.nodesMap.delete(node.key);
    }
  }

  insertBefore(data: TreeData, refNode: Node): Node {
    const parent = refNode.parent;
    if (!parent) {
      throw new Error('Reference node has no parent');
    }
    const index = parent.childNodes.indexOf(refNode);
    return parent.insertChild({ data }, index);
  }

  insertAfter(data: TreeData, refNode: Node): Node {
    const parent = refNode.parent;
    if (!parent) {
      throw new Error('Reference node has no parent');
    }
    const index = parent.childNodes.indexOf(refNode);
    return parent.insertChild({ data }, index + 1);
  }

  // 事件系统
  on(event: string, callback: Function): void {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  emit(event: string, ...args: any[]): void {
    const callbacks = this.callbacks[event];
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }

  off(event: string, callback?: Function): void {
    if (!callback) {
      delete this.callbacks[event];
      return;
    }
    const callbacks = this.callbacks[event];
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

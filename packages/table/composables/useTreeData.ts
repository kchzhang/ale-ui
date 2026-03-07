/**
 * Table 树形数据处理模块
 * 处理树形数据的展开/折叠、层级缩进、扁平化等逻辑
 */

import { ref, computed, watch } from 'vue';
import type { TableProps } from '../types';

export interface TreeNode {
  /** 原始数据 */
  data: any;
  /** 层级深度 */
  level: number;
  /** 是否展开 */
  expanded: boolean;
  /** 是否有子节点 */
  hasChildren: boolean;
  /** 子节点 */
  children?: TreeNode[];
  /** 父节点 */
  parent?: TreeNode;
  /** 节点唯一标识 */
  key: string | number;
}

export function useTreeData(props: TableProps) {
  // 展开的行 keys
  const expandedRowKeys = ref<Set<string | number>>(new Set());

  // 子节点字段名
  const childrenKey = computed(() => props.treeConfig?.childrenKey || 'children');

  // 是否默认展开所有
  const defaultExpandAll = computed(() => props.treeConfig?.defaultExpandAll || false);

  // 初始化展开状态
  const initExpandedState = () => {
    expandedRowKeys.value.clear();
    if (defaultExpandAll.value) {
      flattenTree(props.data, 0, undefined, true);
    }
  };

  // 获取行 key
  const getRowKey = (row: any): string | number => {
    if (typeof props.rowKey === 'function') {
      return props.rowKey(row);
    }
    return row[props.rowKey || 'id'];
  };

  // 检查是否有子节点
  const hasChildren = (row: any): boolean => {
    const children = row[childrenKey.value];
    return Array.isArray(children) && children.length > 0;
  };

  // 获取子节点
  const getChildren = (row: any): any[] => {
    return row[childrenKey.value] || [];
  };

  // 递归扁平化树形数据
  const flattenTree = (
    data: any[],
    level: number = 0,
    parent?: TreeNode,
    onlyInitExpanded: boolean = false
  ): TreeNode[] => {
    const result: TreeNode[] = [];

    for (const item of data) {
      const key = getRowKey(item);
      const nodeChildren = getChildren(item);
      const hasChild = nodeChildren.length > 0;

      const node: TreeNode = {
        data: item,
        level,
        expanded: expandedRowKeys.value.has(key),
        hasChildren: hasChild,
        parent,
        key
      };

      result.push(node);

      // 如果是初始化阶段且需要展开所有，或者当前节点已展开，则递归处理子节点
      if ((onlyInitExpanded && defaultExpandAll.value) || expandedRowKeys.value.has(key)) {
        if (hasChild) {
          node.children = flattenTree(nodeChildren, level + 1, node);
          result.push(...node.children);
        }
      }
    }

    return result;
  };

  // 扁平化后的树形数据（用于显示）
  const flattenedTreeData = computed(() => {
    if (!props.treeConfig) {
      return props.data.map(item => ({
        data: item,
        level: 0,
        expanded: false,
        hasChildren: hasChildren(item),
        key: getRowKey(item)
      }));
    }
    return flattenTree(props.data);
  });

  // 获取显示数据（用于表格渲染）
  const displayTreeData = computed(() => {
    return flattenedTreeData.value.map(node => node.data);
  });

  // 获取节点的层级
  const getNodeLevel = (row: any): number => {
    if (!props.treeConfig) return 0;
    
    const key = getRowKey(row);
    // 先在扁平化数据中查找
    const node = flattenedTreeData.value.find(n => n.key === key);
    if (node) {
      return node.level;
    }
    
    // 如果在扁平化数据中没找到，尝试递归计算层级
    const findLevel = (data: any[], targetKey: string | number, currentLevel: number): number => {
      for (const item of data) {
        const itemKey = getRowKey(item);
        if (itemKey === targetKey) {
          return currentLevel;
        }
        const children = getChildren(item);
        if (children.length > 0) {
          const foundLevel = findLevel(children, targetKey, currentLevel + 1);
          if (foundLevel !== -1) {
            return foundLevel;
          }
        }
      }
      return -1;
    };
    
    return findLevel(props.data, key, 0);
  };

  // 检查节点是否展开
  const isRowExpanded = (row: any): boolean => {
    const key = getRowKey(row);
    return expandedRowKeys.value.has(key);
  };

  // 切换节点的展开/折叠状态
  const toggleRowExpansion = (row: any, expanded?: boolean) => {
    const key = getRowKey(row);
    const isExpanded = expandedRowKeys.value.has(key);
    const newExpanded = expanded !== undefined ? expanded : !isExpanded;

    if (newExpanded) {
      expandedRowKeys.value.add(key);
    } else {
      expandedRowKeys.value.delete(key);
    }

    return newExpanded;
  };

  // 展开指定节点
  const expandRow = (row: any) => {
    if (hasChildren(row)) {
      toggleRowExpansion(row, true);
    }
  };

  // 折叠指定节点
  const collapseRow = (row: any) => {
    toggleRowExpansion(row, false);
  };

  // 展开所有节点
  const expandAll = () => {
    const addAllKeys = (data: any[]) => {
      for (const item of data) {
        if (hasChildren(item)) {
          const key = getRowKey(item);
          expandedRowKeys.value.add(key);
          addAllKeys(getChildren(item));
        }
      }
    };
    addAllKeys(props.data);
  };

  // 折叠所有节点
  const collapseAll = () => {
    expandedRowKeys.value.clear();
  };

  // 检查是否为树形数据
  const isTreeData = computed(() => {
    return !!props.treeConfig;
  });

  // 监听数据变化，重新初始化
  watch(() => props.data, () => {
    if (defaultExpandAll.value) {
      expandAll();
    }
  }, { immediate: true });

  return {
    expandedRowKeys,
    flattenedTreeData,
    displayTreeData,
    isTreeData,
    hasChildren,
    getChildren,
    getNodeLevel,
    isRowExpanded,
    toggleRowExpansion,
    expandRow,
    collapseRow,
    expandAll,
    collapseAll,
    getRowKey
  };
}

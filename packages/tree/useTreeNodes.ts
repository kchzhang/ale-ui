/**
 * Tree 节点管理组合式函数
 */

import { ref, computed, watch } from 'vue';
import type { TreeProps, TreeEmits, TreeNodeData } from './types';

// 内部节点类
class TreeNode {
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
  isLeaf: boolean;
  data: TreeNodeData;
  parent: TreeNode | null;
  children: TreeNode[];

  constructor(data: TreeNodeData, level: number = 0, parent: TreeNode | null = null) {
    this.id = data.id;
    this.label = data.label;
    this.level = level;
    this.parent = parent;
    this.children = [];
    this.data = data;
    this.expanded = false;
    this.selected = false;
    this.checked = false;
    this.indeterminate = false;
    this.loading = false;
    this.disabled = data.disabled ?? false;
    this.disableCheckbox = data.disableCheckbox ?? false;
    this.visible = true;
    this.isLeaf = data.isLeaf ?? !(data.children && data.children.length > 0);

    // 递归创建子节点
    if (data.children && data.children.length > 0) {
      this.children = data.children.map(child => new TreeNode(child, level + 1, this));
    }
  }
}

export function useTreeNodes(props: TreeProps, emit: TreeEmits) {
  // 内部状态
  const nodes = ref<TreeNode[]>([]);
  const expandedKeys = ref<(string | number)[]>([]);
  const selectedKeys = ref<(string | number)[]>([]);
  const checkedKeys = ref<(string | number)[]>([]);

  // 将数据转换为节点
  const buildNodes = (data: TreeNodeData[]) => {
    return data.map(item => new TreeNode(item));
  };

  // 根据 key 查找节点
  const findNodeByKey = (key: string | number, nodeList: TreeNode[] = nodes.value): TreeNode | null => {
    for (const node of nodeList) {
      if (node.id === key) return node;
      if (node.children.length > 0) {
        const found = findNodeByKey(key, node.children);
        if (found) return found;
      }
    }
    return null;
  };

  // 获取所有节点（扁平化）
  const getAllNodes = (nodeList: TreeNode[] = nodes.value): TreeNode[] => {
    const result: TreeNode[] = [];
    for (const node of nodeList) {
      result.push(node);
      if (node.children.length > 0) {
        result.push(...getAllNodes(node.children));
      }
    }
    return result;
  };

  // 展开所有
  const expandAll = () => {
    const allKeys: (string | number)[] = [];
    const expandNodeRecursive = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        if (!node.disabled && !node.isLeaf) {
          node.expanded = true;
          allKeys.push(node.id);
          if (node.children.length > 0) {
            expandNodeRecursive(node.children);
          }
        }
      });
    };
    expandNodeRecursive(nodes.value);
    expandedKeys.value = allKeys;
    emit('update:expandedKeys', [...expandedKeys.value]);
  };

  // 收起所有
  const collapseAll = () => {
    const collapseNodeRecursive = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        node.expanded = false;
        if (node.children.length > 0) {
          collapseNodeRecursive(node.children);
        }
      });
    };
    collapseNodeRecursive(nodes.value);
    expandedKeys.value = [];
    emit('update:expandedKeys', [...expandedKeys.value]);
  };

  // 设置展开 keys
  const setExpandedKeys = (keys: (string | number)[]) => {
    expandedKeys.value = [...keys];
    const setNodeExpand = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        node.expanded = keys.includes(node.id);
        if (node.children.length > 0) {
          setNodeExpand(node.children);
        }
      });
    };
    setNodeExpand(nodes.value);
  };

  // 设置选中 keys
  const setSelectedKeys = (keys: (string | number)[]) => {
    selectedKeys.value = [...keys];
    const allNodes = getAllNodes();
    allNodes.forEach(node => {
      node.selected = keys.includes(node.id);
    });
  };

  // 设置勾选 keys
  const setCheckedKeys = (keys: (string | number)[]) => {
    checkedKeys.value = [];
    const allNodes = getAllNodes();
    allNodes.forEach(node => {
      node.checked = false;
      node.indeterminate = false;
    });

    keys.forEach(key => {
      const node = findNodeByKey(key);
      if (node) {
        setNodeChecked(node, true);
      }
    });
  };

  // 更新父节点勾选状态
  const updateParentCheckedState = (parent: TreeNode | null) => {
    if (!parent) return;

    const children = parent.children;
    const checkedCount = children.filter(child => child.checked).length;
    const indeterminateCount = children.filter(child => child.indeterminate).length;
    const totalEnabled = children.filter(child => !child.disabled && !child.disableCheckbox).length;

    if (checkedCount === totalEnabled && totalEnabled > 0) {
      parent.checked = true;
      parent.indeterminate = false;
      if (!checkedKeys.value.includes(parent.id)) {
        checkedKeys.value.push(parent.id);
      }
    } else if (checkedCount > 0 || indeterminateCount > 0) {
      parent.checked = false;
      parent.indeterminate = true;
      const idx = checkedKeys.value.indexOf(parent.id);
      if (idx > -1) {
        checkedKeys.value.splice(idx, 1);
      }
    } else {
      parent.checked = false;
      parent.indeterminate = false;
      const idx = checkedKeys.value.indexOf(parent.id);
      if (idx > -1) {
        checkedKeys.value.splice(idx, 1);
      }
    }

    // 递归向上更新
    updateParentCheckedState(parent.parent);
  };

  // 设置节点勾选状态（包括子节点和父节点）
  const setNodeChecked = (node: TreeNode, checked: boolean) => {
    // 设置当前节点
    node.checked = checked;
    node.indeterminate = false;

    // 更新 checkedKeys
    const index = checkedKeys.value.indexOf(node.id);
    if (checked && index === -1) {
      checkedKeys.value.push(node.id);
    } else if (!checked && index > -1) {
      checkedKeys.value.splice(index, 1);
    }

    // 递归设置子节点
    const setChildrenChecked = (children: TreeNode[], checked: boolean) => {
      children.forEach(child => {
        if (!child.disabled && !child.disableCheckbox) {
          child.checked = checked;
          child.indeterminate = false;

          const idx = checkedKeys.value.indexOf(child.id);
          if (checked && idx === -1) {
            checkedKeys.value.push(child.id);
          } else if (!checked && idx > -1) {
            checkedKeys.value.splice(idx, 1);
          }

          if (child.children.length > 0) {
            setChildrenChecked(child.children, checked);
          }
        }
      });
    };

    if (node.children.length > 0) {
      setChildrenChecked(node.children, checked);
    }

    // 更新父节点状态
    updateParentCheckedState(node.parent);
  };

  // 初始化节点
  const initNodes = () => {
    nodes.value = buildNodes(props.data);

    // 应用默认展开
    if (props.defaultExpandAll) {
      const allKeys: (string | number)[] = [];
      const expandAllRecursive = (nodeList: TreeNode[]) => {
        nodeList.forEach(node => {
          if (!node.disabled && !node.isLeaf) {
            node.expanded = true;
            allKeys.push(node.id);
            if (node.children.length > 0) {
              expandAllRecursive(node.children);
            }
          }
        });
      };
      expandAllRecursive(nodes.value);
      expandedKeys.value = allKeys;
    } else if (props.defaultExpandedKeys?.length) {
      setExpandedKeys(props.defaultExpandedKeys);
    }

    // 应用默认选中
    if (props.defaultSelectedKeys?.length) {
      setSelectedKeys(props.defaultSelectedKeys);
    }

    // 应用默认勾选
    if (props.defaultCheckedKeys?.length) {
      setCheckedKeys(props.defaultCheckedKeys);
    }
  };

  // 监听数据变化
  watch(() => props.data, () => {
    initNodes();
  }, { immediate: true, deep: true });

  // 获取所有可见节点（平铺结构用于虚拟滚动）
  const visibleNodes = computed(() => {
    const result: TreeNode[] = [];

    const traverse = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        if (!node.visible) continue;
        result.push(node);
        if (node.expanded && node.children.length > 0) {
          traverse(node.children);
        }
      }
    };

    traverse(nodes.value);
    return result;
  });

  // 展开/收起节点
  const toggleExpand = (node: TreeNode) => {
    if (node.disabled) return;

    const isExpanding = !node.expanded;

    // 手风琴模式：收起同级其他节点
    if (props.accordion && isExpanding && node.parent) {
      node.parent.children.forEach(sibling => {
        if (sibling !== node && sibling.expanded) {
          sibling.expanded = false;
          const index = expandedKeys.value.indexOf(sibling.id);
          if (index > -1) {
            expandedKeys.value.splice(index, 1);
          }
        }
      });
    }

    node.expanded = isExpanding;

    if (isExpanding) {
      if (!expandedKeys.value.includes(node.id)) {
        expandedKeys.value.push(node.id);
      }
      emit('node-expand', node.data);
    } else {
      const index = expandedKeys.value.indexOf(node.id);
      if (index > -1) {
        expandedKeys.value.splice(index, 1);
      }
      emit('node-collapse', node.data);
    }

    emit('update:expandedKeys', [...expandedKeys.value]);
    emit('expand', [...expandedKeys.value], {
      expanded: isExpanding,
      node: node.data
    });
  };

  // 选中节点
  const handleSelect = (node: TreeNode, event: Event) => {
    if (node.disabled) return;

    if (props.multiple) {
      // 多选模式
      const index = selectedKeys.value.indexOf(node.id);
      if (index > -1) {
        selectedKeys.value.splice(index, 1);
        node.selected = false;
      } else {
        selectedKeys.value.push(node.id);
        node.selected = true;
      }
    } else {
      // 单选模式
      // 清除之前的选中
      nodes.value.forEach(n => {
        n.selected = false;
      });
      selectedKeys.value = [node.id];
      node.selected = true;
    }

    const selectedNodes = getAllNodes().filter(n => selectedKeys.value.includes(n.id));

    emit('update:selectedKeys', [...selectedKeys.value]);
    emit('select', [...selectedKeys.value], {
      selected: node.selected,
      selectedNodes: selectedNodes.map(n => n.data),
      node: node.data,
      event
    });
  };

  // 勾选节点
  const handleCheck = (node: TreeNode, event: Event) => {
    if (node.disabled || node.disableCheckbox) return;

    const newChecked = !node.checked;
    setNodeChecked(node, newChecked);

    const checkedNodes = getAllNodes().filter(n => checkedKeys.value.includes(n.id));

    emit('update:checkedKeys', [...checkedKeys.value]);
    emit('check', [...checkedKeys.value], {
      checked: newChecked,
      checkedNodes: checkedNodes.map(n => n.data),
      node: node.data,
      event
    });
  };

  // 获取节点
  const getNode = (key: string | number): TreeNode | null => {
    return findNodeByKey(key);
  };

  // 添加节点
  const append = (data: TreeNodeData, parentKey?: string | number) => {
    const newNode = new TreeNode(data);

    if (parentKey === undefined) {
      // 添加到根节点
      nodes.value.push(newNode);
    } else {
      const parent = findNodeByKey(parentKey);
      if (parent) {
        newNode.parent = parent;
        newNode.level = parent.level + 1;
        parent.children.push(newNode);
        parent.isLeaf = false;
      }
    }
  };

  // 移除节点
  const remove = (key: string | number) => {
    const node = findNodeByKey(key);
    if (!node) return;

    if (node.parent) {
      const index = node.parent.children.indexOf(node);
      if (index > -1) {
        node.parent.children.splice(index, 1);
        if (node.parent.children.length === 0) {
          node.parent.isLeaf = true;
        }
      }
    } else {
      const index = nodes.value.indexOf(node);
      if (index > -1) {
        nodes.value.splice(index, 1);
      }
    }

    // 从 keys 中移除
    const removeKey = (keys: (string | number)[]) => {
      const idx = keys.indexOf(key);
      if (idx > -1) keys.splice(idx, 1);
    };
    removeKey(expandedKeys.value);
    removeKey(selectedKeys.value);
    removeKey(checkedKeys.value);
  };

  // 在参考节点前插入
  const insertBefore = (data: TreeNodeData, refKey: string | number) => {
    const refNode = findNodeByKey(refKey);
    if (!refNode) return;

    const newNode = new TreeNode(data);
    newNode.level = refNode.level;
    newNode.parent = refNode.parent;

    if (refNode.parent) {
      const index = refNode.parent.children.indexOf(refNode);
      refNode.parent.children.splice(index, 0, newNode);
    } else {
      const index = nodes.value.indexOf(refNode);
      nodes.value.splice(index, 0, newNode);
    }
  };

  // 在参考节点后插入
  const insertAfter = (data: TreeNodeData, refKey: string | number) => {
    const refNode = findNodeByKey(refKey);
    if (!refNode) return;

    const newNode = new TreeNode(data);
    newNode.level = refNode.level;
    newNode.parent = refNode.parent;

    if (refNode.parent) {
      const index = refNode.parent.children.indexOf(refNode);
      refNode.parent.children.splice(index + 1, 0, newNode);
    } else {
      const index = nodes.value.indexOf(refNode);
      nodes.value.splice(index + 1, 0, newNode);
    }
  };

  // 过滤节点
  const filter = (value: string) => {
    if (!value) {
      // 清空过滤，显示所有节点
      const showAll = (nodeList: TreeNode[]) => {
        nodeList.forEach(node => {
          node.visible = true;
          if (node.children.length > 0) {
            showAll(node.children);
          }
        });
      };
      showAll(nodes.value);
      return;
    }

    // 过滤节点
    const doFilter = (nodeList: TreeNode[]): boolean => {
      let hasVisibleChild = false;

      nodeList.forEach(node => {
        let childVisible = false;
        if (node.children.length > 0) {
          childVisible = doFilter(node.children);
        }

        const match = props.filterNodeMethod
          ? props.filterNodeMethod(value, node.data, node as any)
          : node.label.toLowerCase().includes(value.toLowerCase());

        node.visible = match || childVisible;

        // 如果子节点匹配，展开父节点
        if (childVisible && props.autoExpandParent) {
          node.expanded = true;
          if (!expandedKeys.value.includes(node.id)) {
            expandedKeys.value.push(node.id);
          }
        }

        if (node.visible) {
          hasVisibleChild = true;
        }
      });

      return hasVisibleChild;
    };

    doFilter(nodes.value);
  };

  return {
    nodes,
    visibleNodes,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    getNode,
    setExpandedKeys,
    setSelectedKeys,
    setCheckedKeys,
    expandAll,
    collapseAll,
    append,
    remove,
    insertBefore,
    insertAfter,
    filter,
    toggleExpand,
    handleSelect,
    handleCheck
  };
}

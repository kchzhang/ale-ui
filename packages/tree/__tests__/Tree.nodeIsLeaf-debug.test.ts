/**
 * TreeNode nodeIsLeaf 调试测试
 * 用于验证 nodeIsLeaf 是否正确更新
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';
import type { Node as NodeType } from '../model/node';

const createWrapper = (props: Partial<TreeProps> = {}) => {
  return mount(Tree, {
    props: { data: [], ...props },
    global: { components: { TreeNode } },
  });
};

describe('TreeNode nodeIsLeaf 调试测试', () => {
  it('实时验证 nodeIsLeaf 更新', async () => {
    const wrapper = createWrapper({
      data: [{ id: '1', label: '测试节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;
    let node = instance.getNode('1') as NodeType;

    console.log('初始状态:', { isLeaf: node.isLeaf, childNodesLength: node.childNodes.length });
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 添加子节点
    instance.append({ id: '1-1', label: '子节点1' }, '1');
    await nextTick();

    node = instance.getNode('1') as NodeType;
    console.log('添加子节点后:', { isLeaf: node.isLeaf, childNodesLength: node.childNodes.length });

    // 检查 UI
    const hasExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists();
    console.log('UI 显示展开图标:', hasExpandIcon);
    expect(hasExpandIcon).toBe(true);

    // 移除子节点
    instance.remove({ id: '1-1' });
    await nextTick();

    node = instance.getNode('1') as NodeType;
    console.log('移除子节点后:', { isLeaf: node.isLeaf, childNodesLength: node.childNodes.length });

    // 再次检查 UI - 这是关键验证点
    const hasExpandIconAfterRemove = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists();
    console.log('UI 显示展开图标:', hasExpandIconAfterRemove);

    // 这里应该返回 false，如果 bug 存在会返回 true
    expect(hasExpandIconAfterRemove).toBe(false);

    wrapper.unmount();
  });

  it('多次状态转换验证', async () => {
    const wrapper = createWrapper({
      data: [{ id: '1', label: '测试节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;

    // 进行 3 次完整的状态转换循环
    for (let i = 0; i < 3; i++) {
      console.log(`\n=== 第 ${i + 1} 次循环 ===`);

      // 添加子节点
      instance.append({ id: `1-${i}`, label: `子节点${i}` }, '1');
      await nextTick();

      let node = instance.getNode('1') as NodeType;
      console.log('添加后:', { isLeaf: node.isLeaf, childNodesLength: node.childNodes.length });

      let hasExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists();
      console.log('UI 展开图标:', hasExpandIcon);
      expect(hasExpandIcon).toBe(true);

      // 移除子节点
      instance.remove({ id: `1-${i}` });
      await nextTick();

      node = instance.getNode('1') as NodeType;
      console.log('移除后:', { isLeaf: node.isLeaf, childNodesLength: node.childNodes.length });

      hasExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists();
      console.log('UI 展开图标:', hasExpandIcon);
      expect(hasExpandIcon).toBe(false);
    }

    wrapper.unmount();
  });
});

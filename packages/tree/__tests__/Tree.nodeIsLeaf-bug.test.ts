/**
 * TreeNode nodeIsLeaf Bug 修复验证测试
 * Bug: 当 nodeIsLeaf 变为叶子节点后，该字段仍然返回 false，导致 UI 显示异常
 * 原因:
 *   1. handleChildrenChange 中仅在 data.isLeaf === undefined 时才更新 node.isLeaf
 *   2. nodeIsLeaf computed 优先使用 node.isLeaf，但该值不会随子节点变化更新
 * 修复:
 *   1. handleChildrenChange 中检查用户是否显式设置了 isLeaf，如未设置则更新 node.isLeaf
 *   2. nodeIsLeaf computed 移除对 node.isLeaf 的依赖，直接使用响应式的 childNodesCount
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

describe('TreeNode nodeIsLeaf Bug 修复验证', () => {
  /**
   * 核心测试: 验证 nodeIsLeaf 在状态转换后返回正确值
   */
  it('nodeIsLeaf 应在变为叶子节点后返回 true', async () => {
    const wrapper = createWrapper({
      data: [{ id: '1', label: '测试节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;

    // 第 1 次: 添加子节点
    instance.append({ id: '1-1', label: '子节点1' }, '1');
    await nextTick();

    // 验证: 非叶子节点
    let node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(false);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第 1 次: 移除子节点
    instance.remove({ id: '1-1' });
    await nextTick();

    // 验证: 变为叶子节点
    node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 第 2 次: 再次添加子节点
    instance.append({ id: '1-2', label: '子节点2' }, '1');
    await nextTick();

    // 验证: 再次变为非叶子节点
    node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(false);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第 2 次: 再次移除子节点（关键测试点）
    instance.remove({ id: '1-2' });
    await nextTick();

    // 关键验证: nodeIsLeaf 应正确返回 true，UI 应显示占位符
    node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
    expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);

    wrapper.unmount();
  });

  /**
   * 测试: 用户显式设置 isLeaf 时应优先使用用户设置
   */
  it('用户显式设置 isLeaf 时应优先使用用户设置', async () => {
    const wrapper = createWrapper({
      data: [
        {
          id: '1',
          label: '强制叶子节点',
          isLeaf: true,
          children: [{ id: '1-1', label: '被忽略的子节点' }],
        },
      ],
    });
    await nextTick();

    // 即使用户设置了 isLeaf: true，即使有 children，也应显示为叶子节点
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
    expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);

    wrapper.unmount();
  });

  /**
   * 测试: 通过数据修改触发状态转换
   */
  it('通过数据修改触发 nodeIsLeaf 更新', async () => {
    const data = ref<TreeData[]>([{ id: '1', label: '测试节点' }]);

    const wrapper = createWrapper({ data: data.value });
    await nextTick();

    const instance = wrapper.vm as any;

    // 添加子节点
    data.value[0].children = [{ id: '1-1', label: '子节点1' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    let node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(false);

    // 清空子节点
    data.value[0].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 关键验证
    node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 再次添加
    data.value[0].children = [{ id: '1-2', label: '子节点2' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(false);

    // 再次清空（第二次）
    data.value[0].children = undefined;
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 关键验证: 第二次清空后也应正确
    node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    wrapper.unmount();
  });
});

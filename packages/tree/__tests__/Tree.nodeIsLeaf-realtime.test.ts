/**
 * TreeNode nodeIsLeaf 实时更新测试
 * 验证 nodeIsLeaf 在子节点变化时实时更新
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

describe('TreeNode nodeIsLeaf 实时更新验证', () => {
  it('append/remove 后 nodeIsLeaf 应实时更新', async () => {
    const wrapper = createWrapper({
      data: [{ id: '1', label: '节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;
    const node = instance.getNode('1') as NodeType;

    // 初始：叶子节点
    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // append 子节点
    instance.append({ id: '1-1', label: '子节点' }, '1');
    await nextTick();

    // 实时更新：非叶子节点
    expect(node.isLeaf).toBe(false);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // remove 子节点
    instance.remove({ id: '1-1' });
    await nextTick();

    // 实时更新：叶子节点
    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
  });

  it('updateKeyChildren 后 nodeIsLeaf 应实时更新', async () => {
    const wrapper = createWrapper({
      data: [{ id: '1', label: '节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;
    const node = instance.getNode('1') as NodeType;

    // updateKeyChildren 添加子节点
    instance.updateKeyChildren('1', [{ id: '1-1', label: '子节点' }]);
    await nextTick();

    expect(node.isLeaf).toBe(false);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // updateKeyChildren 清空子节点
    instance.updateKeyChildren('1', []);
    await nextTick();

    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
  });

  it('数据绑定修改后 nodeIsLeaf 应实时更新', async () => {
    const data = ref<TreeData[]>([{ id: '1', label: '节点' }]);
    const wrapper = createWrapper({ data: data.value });
    await nextTick();

    const instance = wrapper.vm as any;

    // 修改数据添加子节点
    data.value[0].children = [{ id: '1-1', label: '子节点' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 重新获取节点（因为 store 被重建）
    let node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(false);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 修改数据清空子节点
    data.value[0].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 重新获取节点
    node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(true);
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
  });

  it('多次状态转换后 nodeIsLeaf 仍能实时更新', async () => {
    const wrapper = createWrapper({
      data: [{ id: '1', label: '节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;
    const node = instance.getNode('1') as NodeType;

    // 进行 5 次状态转换
    for (let i = 0; i < 5; i++) {
      // 添加
      instance.append({ id: `1-${i}`, label: `子${i}` }, '1');
      await nextTick();
      expect(node.isLeaf).toBe(false);

      // 移除
      instance.remove({ id: `1-${i}` });
      await nextTick();
      expect(node.isLeaf).toBe(true);
    }
  });

  it('嵌套节点 nodeIsLeaf 应实时更新', async () => {
    const wrapper = createWrapper({
      data: [
        {
          id: '1',
          label: '父节点',
          children: [{ id: '1-1', label: '子节点' }],
        },
      ],
    });
    await nextTick();

    const instance = wrapper.vm as any;
    const parentNode = instance.getNode('1') as NodeType;
    const childNode = instance.getNode('1-1') as NodeType;

    // 父节点有子节点，不是叶子
    expect(parentNode.isLeaf).toBe(false);
    // 子节点没有子节点，是叶子
    expect(childNode.isLeaf).toBe(true);

    // 给子节点添加子节点
    instance.append({ id: '1-1-1', label: '孙节点' }, '1-1');
    await nextTick();

    // 子节点现在有子节点，不是叶子了
    expect(childNode.isLeaf).toBe(false);

    // 移除孙节点
    instance.remove({ id: '1-1-1' });
    await nextTick();

    // 子节点又变回叶子
    expect(childNode.isLeaf).toBe(true);
  });
});

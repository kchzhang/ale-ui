/**
 * Tree 组件叶子节点图标 Bug 修复验证测试
 * Bug 描述: 当子节点经过两次转换变成叶子节点后，展开图标仍然显示不会自动隐藏
 * 修复内容:
 *   1. TreeNode.vue: nodeIsLeaf computed 优先使用 node.isLeaf 属性
 *   2. node.ts: updateLeafState 确保正确更新 isLeaf 状态
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

describe('Tree 叶子节点图标 Bug 修复验证', () => {
  /**
   * 核心测试: 两次转换后展开图标应正确隐藏
   * 这是用户报告的问题场景
   */
  it('两次添加并移除子节点后展开图标应正确隐藏', async () => {
    wrapper = createWrapper({
      data: [{ id: 'parent', label: '父节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;

    // 循环进行两次完整的状态转换
    for (let i = 0; i < 2; i++) {
      // 添加子节点 -> 非叶子节点
      instance.append({ id: `child${i}`, label: `子节点${i}` }, 'parent');
      await nextTick();

      // 验证: 应显示展开图标
      expect(
        wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists(),
        `第${i + 1}次添加后应显示展开图标`
      ).toBe(true);

      // 获取节点并验证 isLeaf 状态
      let node = instance.getNode('parent') as NodeType;
      expect(node.isLeaf).toBe(false);

      // 移除子节点 -> 叶子节点
      instance.remove({ id: `child${i}` });
      await nextTick();

      // 验证: 应隐藏展开图标（这是 bug 修复的关键点）
      expect(
        wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists(),
        `第${i + 1}次移除后应隐藏展开图标`
      ).toBe(false);

      // 验证节点状态
      node = instance.getNode('parent') as NodeType;
      expect(node.isLeaf).toBe(true);
    }
  });

  /**
   * 测试: 通过数据修改触发状态转换
   */
  it('通过数据修改两次转换后展开图标应正确隐藏', async () => {
    const data = ref<TreeData[]>([{ id: '1', label: '测试节点' }]);

    wrapper = createWrapper({ data: data.value });
    await nextTick();

    const instance = wrapper.vm as any;

    // 第 1 次转换: 添加 -> 移除
    data.value[0].children = [{ id: '1-1', label: '子节点1' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    data.value[0].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 第 2 次转换: 添加 -> 移除（关键测试点）
    data.value[0].children = [{ id: '1-2', label: '子节点2' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    data.value[0].children = undefined;
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // Bug 修复验证: 第二次移除后图标应正确隐藏
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    const node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(true);
  });

  /**
   * 测试: 深层嵌套节点多次状态转换
   */
  it('深层嵌套节点多次状态转换后展开图标应正确更新', async () => {
    const data = ref<TreeData[]>([
      {
        id: '1',
        label: '根节点',
        children: [
          {
            id: '1-1',
            label: '二级节点',
            children: [{ id: '1-1-1', label: '三级节点' }],
          },
        ],
      },
    ]);

    wrapper = createWrapper({ data: data.value });
    await nextTick();

    const instance = wrapper.vm as any;

    // 进行三次状态转换
    for (let i = 0; i < 3; i++) {
      // 移除三级节点
      data.value[0].children![0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 二级节点应变为叶子节点
      let expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(1);

      let node = instance.getNode('1-1') as NodeType;
      expect(node.isLeaf).toBe(true);

      // 重新添加三级节点
      data.value[0].children![0].children = [{ id: `1-1-${i + 2}`, label: `新三级节点${i}` }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 二级节点应再次变为非叶子节点
      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(2);

      node = instance.getNode('1-1') as NodeType;
      expect(node.isLeaf).toBe(false);
    }
  });

  let wrapper: ReturnType<typeof createWrapper>;
});

/**
 * TreeNode 组件叶子状态转换详细测试
 * 专门针对子节点经过两次转换后展开图标不自动隐藏的问题
 * 测试方法: 控制变量法 - 逐步跟踪节点状态和 UI 更新
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick, ref, h } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';
import type { Node as NodeType } from '../model/node';

/**
 * 创建 Tree 组件包装器
 */
const createWrapper = (props: Partial<TreeProps> = {}) => {
  return mount(Tree, {
    props: {
      data: [],
      ...props,
    },
    global: {
      components: { TreeNode },
    },
  });
};

describe('TreeNode 叶子状态转换详细测试', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  /**
   * 核心测试: 两次转换后展开图标应正确隐藏
   * 问题描述: 当子节点经过两次转换变成叶子节点后，展开图标仍然显示不会自动隐藏
   */
  describe('两次状态转换核心测试', () => {
    it('问题复现: 两次添加后移除所有子节点，展开图标应隐藏', async () => {
      // 初始状态: 叶子节点
      const data = ref<TreeData[]>([
        {
          id: 'parent',
          label: '父节点',
        },
      ]);

      wrapper = createWrapper({ data: data.value });
      await nextTick();

      const instance = wrapper.vm as any;

      // 验证初始状态: 叶子节点，应显示占位符而非展开图标
      let realExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      let leafPlaceholder = wrapper.find('.ale-tree-node__expand-icon.is-leaf');
      expect(realExpandIcon.exists()).toBe(false);
      expect(leafPlaceholder.exists()).toBe(true);

      // 第 1 次转换: 添加子节点 -> 非叶子节点
      instance.append({ id: 'child1', label: '子节点1' }, 'parent');
      await nextTick();

      // 验证: 应显示真实展开图标
      realExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      leafPlaceholder = wrapper.find('.ale-tree-node__expand-icon.is-leaf');
      expect(realExpandIcon.exists()).toBe(true);

      // 第 2 次转换: 移除子节点 -> 叶子节点
      instance.remove({ id: 'child1' });
      await nextTick();

      // 关键验证点 1: 应隐藏展开图标，显示占位符
      realExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      leafPlaceholder = wrapper.find('.ale-tree-node__expand-icon.is-leaf');
      expect(realExpandIcon.exists()).toBe(false);
      expect(leafPlaceholder.exists()).toBe(true);

      // 第 3 次转换: 再次添加子节点 -> 非叶子节点
      instance.append({ id: 'child2', label: '子节点2' }, 'parent');
      await nextTick();

      // 验证: 应显示真实展开图标
      realExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(realExpandIcon.exists()).toBe(true);

      // 第 4 次转换: 再次移除子节点 -> 叶子节点（第二次变为叶子）
      instance.remove({ id: 'child2' });
      await nextTick();

      // 关键验证点 2（问题复现点）: 经过两次转换后，图标应正确隐藏
      realExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      leafPlaceholder = wrapper.find('.ale-tree-node__expand-icon.is-leaf');
      expect(realExpandIcon.exists()).toBe(false);
      expect(leafPlaceholder.exists()).toBe(true);
    });

    it('通过数据属性直接修改子节点数组测试', async () => {
      // 使用响应式数据直接修改
      const data = ref<TreeData[]>([
        {
          id: '1',
          label: '测试节点',
          children: [],
        },
      ]);

      wrapper = createWrapper({ data: data.value });
      await nextTick();

      // 初始状态: 空 children 数组，视为叶子节点
      let expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);

      // 第 1 次: 添加子节点
      data.value[0].children = [{ id: '1-1', label: '子节点1' }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(true);

      // 第 2 次: 清空子节点
      data.value[0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);

      // 第 3 次: 再次添加子节点
      data.value[0].children = [{ id: '1-2', label: '子节点2' }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(true);

      // 第 4 次: 再次清空（第二次变为空）
      data.value[0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 关键验证: 应隐藏展开图标
      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);
    });

    it('使用 updateKeyChildren API 进行两次转换', async () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '测试节点' }],
      });
      await nextTick();

      const instance = wrapper.vm as any;

      // 第 1 次更新: 添加子节点
      instance.updateKeyChildren('1', [{ id: '1-1', label: '子节点1' }]);
      await nextTick();

      let expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(true);

      // 第 2 次更新: 清空子节点
      instance.updateKeyChildren('1', []);
      await nextTick();

      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);

      // 第 3 次更新: 再次添加
      instance.updateKeyChildren('1', [{ id: '1-2', label: '子节点2' }]);
      await nextTick();

      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(true);

      // 第 4 次更新: 再次清空
      instance.updateKeyChildren('1', []);
      await nextTick();

      // 关键验证
      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);
    });
  });

  /**
   * 节点内部状态验证
   */
  describe('节点内部状态验证', () => {
    it('isLeaf 属性应在状态转换时正确更新', async () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '测试节点' }],
      });
      await nextTick();

      const instance = wrapper.vm as any;
      let node = instance.getNode('1') as NodeType;

      // 初始状态: isLeaf 应为 true
      expect(node.isLeaf).toBe(true);

      // 添加子节点
      instance.append({ id: '1-1', label: '子节点' }, '1');
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.isLeaf).toBe(false);

      // 移除子节点
      instance.remove({ id: '1-1' });
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.isLeaf).toBe(true);

      // 再次添加
      instance.append({ id: '1-2', label: '子节点2' }, '1');
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.isLeaf).toBe(false);

      // 再次移除（第二次）
      instance.remove({ id: '1-2' });
      await nextTick();

      node = instance.getNode('1') as NodeType;
      // 关键验证: 第二次移除后 isLeaf 应正确更新
      expect(node.isLeaf).toBe(true);
    });

    it('childNodes 数组长度应在状态转换时正确更新', async () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '测试节点' }],
      });
      await nextTick();

      const instance = wrapper.vm as any;

      // 初始状态
      let node = instance.getNode('1') as NodeType;
      expect(node.childNodes.length).toBe(0);

      // 添加子节点
      instance.append({ id: '1-1', label: '子节点1' }, '1');
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.childNodes.length).toBe(1);

      // 添加更多子节点
      instance.append({ id: '1-2', label: '子节点2' }, '1');
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.childNodes.length).toBe(2);

      // 移除一个子节点
      instance.remove({ id: '1-1' });
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.childNodes.length).toBe(1);

      // 移除最后一个子节点
      instance.remove({ id: '1-2' });
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.childNodes.length).toBe(0);

      // 再次添加
      instance.append({ id: '1-3', label: '子节点3' }, '1');
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.childNodes.length).toBe(1);

      // 再次移除
      instance.remove({ id: '1-3' });
      await nextTick();

      node = instance.getNode('1') as NodeType;
      expect(node.childNodes.length).toBe(0);
    });
  });

  /**
   * 复杂场景测试
   */
  describe('复杂场景测试', () => {
    it('多级嵌套节点状态转换', async () => {
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

      // 初始状态: 两个节点都有展开图标
      let expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(2);

      // 移除三级节点
      data.value[0].children![0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 二级节点应变为叶子节点
      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(1);

      // 再次添加三级节点
      data.value[0].children![0].children = [{ id: '1-1-2', label: '新三级节点' }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(2);

      // 再次移除三级节点（第二次）
      data.value[0].children![0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 关键验证: 第二次移除后图标应正确更新
      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(1);
    });

    it('多个同级节点同时状态转换', async () => {
      wrapper = createWrapper({
        data: [
          { id: '1', label: '节点1' },
          { id: '2', label: '节点2' },
          { id: '3', label: '节点3' },
        ],
      });
      await nextTick();

      const instance = wrapper.vm as any;

      // 初始状态: 都是叶子节点
      let expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(0);

      // 给所有节点添加子节点
      instance.append({ id: '1-1', label: '子节点1' }, '1');
      instance.append({ id: '2-1', label: '子节点2' }, '2');
      instance.append({ id: '3-1', label: '子节点3' }, '3');
      await nextTick();

      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(3);

      // 移除所有子节点
      instance.remove({ id: '1-1' });
      instance.remove({ id: '2-1' });
      instance.remove({ id: '3-1' });
      await nextTick();

      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(0);

      // 再次添加子节点
      instance.append({ id: '1-2', label: '子节点1-2' }, '1');
      instance.append({ id: '2-2', label: '子节点2-2' }, '2');
      await nextTick();

      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(2);

      // 再次移除（第二次）
      instance.remove({ id: '1-2' });
      instance.remove({ id: '2-2' });
      await nextTick();

      // 关键验证
      expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(0);
    });

    it('快速连续状态转换', async () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '测试节点' }],
      });
      await nextTick();

      const instance = wrapper.vm as any;

      // 快速进行 10 次状态转换
      for (let i = 0; i < 5; i++) {
        // 添加
        instance.append({ id: `child-${i}`, label: `子节点${i}` }, '1');
        await nextTick();

        let expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
        expect(expandIcon.exists()).toBe(true);

        // 移除
        instance.remove({ id: `child-${i}` });
        await nextTick();

        expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
        expect(expandIcon.exists()).toBe(false);
      }
    });
  });

  /**
   * 边界情况测试
   */
  describe('边界情况测试', () => {
    it('children 为 undefined 和空数组应视为相同', async () => {
      const data = ref<TreeData[]>([{ id: '1', label: '测试节点' }]);

      wrapper = createWrapper({ data: data.value });
      await nextTick();

      const instance = wrapper.vm as any;

      // undefined -> 空数组
      instance.append({ id: '1-1', label: '子节点' }, '1');
      await nextTick();

      instance.remove({ id: '1-1' });
      await nextTick();

      let expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);

      // 再次添加
      instance.append({ id: '1-2', label: '子节点2' }, '1');
      await nextTick();

      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(true);

      // 使用数据修改清空
      data.value[0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);
    });

    it('isLeaf 标记优先级高于 children 数组', async () => {
      wrapper = createWrapper({
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

      // 即使 data 中有 children，isLeaf=true 时不应显示展开图标
      let expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);

      const instance = wrapper.vm as any;
      const node = instance.getNode('1') as NodeType;

      // isLeaf 属性应为 true
      expect(node.isLeaf).toBe(true);
    });
  });
});

/**
 * Tree 组件节点选择功能单元测试
 * 测试范围: 节点点击、当前节点、事件触发
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';

const createTreeData = (): TreeData[] => [
  {
    id: '1',
    label: '节点 1',
    children: [
      { id: '1-1', label: '子节点 1-1' },
      { id: '1-2', label: '子节点 1-2' },
    ],
  },
  { id: '2', label: '节点 2' },
];

const createWrapper = (props: Partial<TreeProps> = {}) => {
  return mount(Tree, {
    props: {
      data: createTreeData(),
      ...props,
    },
    global: {
      components: { TreeNode },
    },
  });
};

describe('Tree 节点选择功能', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  describe('节点点击', () => {
    it('点击节点应该触发 node-click 事件', async () => {
      wrapper = createWrapper();
      const nodeContent = wrapper.find('.ale-tree-node__content');
      await nodeContent.trigger('click');

      expect(wrapper.emitted('node-click')).toBeTruthy();
    });

    it('点击节点应该触发 current-change 事件', async () => {
      wrapper = createWrapper();
      const nodeContent = wrapper.find('.ale-tree-node__content');
      await nodeContent.trigger('click');

      expect(wrapper.emitted('current-change')).toBeTruthy();
    });

    it('重复点击同一节点不应该重复触发 current-change', async () => {
      wrapper = createWrapper();
      const nodeContent = wrapper.find('.ale-tree-node__content');

      await nodeContent.trigger('click');
      const firstCount = wrapper.emitted('current-change')?.length || 0;

      await nodeContent.trigger('click');
      const secondCount = wrapper.emitted('current-change')?.length || 0;

      expect(secondCount).toBe(firstCount);
    });
  });

  describe('当前节点', () => {
    it('应该支持 currentNodeKey 属性', async () => {
      wrapper = createWrapper({
        currentNodeKey: '1',
        highlightCurrent: true,
      });
      await nextTick();

      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('setCurrentKey 应该设置当前节点', () => {
      wrapper = createWrapper({ highlightCurrent: true });
      const instance = wrapper.vm as any;

      instance.setCurrentKey('1');
      expect(instance.getCurrentKey()).toBe('1');
    });

    it('getCurrentNode 应该返回当前节点数据', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      instance.setCurrentKey('1');
      const currentNode = instance.getCurrentNode();
      expect(currentNode?.id).toBe('1');
    });

    it('setCurrentNode 应该设置当前节点', () => {
      wrapper = createWrapper({ highlightCurrent: true });
      const instance = wrapper.vm as any;

      const node = instance.getNode('1');
      instance.setCurrentNode(node);
      expect(instance.getCurrentKey()).toBe('1');
    });

    it('setCurrentKey(null) 应该清除当前节点', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      instance.setCurrentKey('1');
      expect(instance.getCurrentKey()).toBe('1');

      instance.setCurrentKey(null);
      expect(instance.getCurrentKey()).toBeNull();
    });
  });

  describe('高亮当前节点', () => {
    it('应该支持 highlightCurrent 属性', () => {
      wrapper = createWrapper({ highlightCurrent: true });
      expect(wrapper.find('.ale-tree--highlight-current').exists()).toBe(true);
    });

    it('高亮节点应该有 is-current 类', async () => {
      wrapper = createWrapper({ highlightCurrent: true });
      const instance = wrapper.vm as any;

      instance.setCurrentKey('1');
      await nextTick();

      const currentNode = wrapper.find('.ale-tree-node.is-current');
      expect(currentNode.exists()).toBe(true);
    });
  });

  describe('禁用节点', () => {
    it('禁用节点不应该响应点击', async () => {
      wrapper = createWrapper({
        data: [
          { id: '1', label: '禁用节点', disabled: true },
          { id: '2', label: '正常节点' },
        ],
      });

      const nodes = wrapper.findAll('.ale-tree-node__content');
      await nodes[0].trigger('click');

      // 禁用节点不应该触发 current-change
      const currentChangeEvents = wrapper.emitted('current-change');
      expect(currentChangeEvents?.length || 0).toBe(0);
    });
  });
});

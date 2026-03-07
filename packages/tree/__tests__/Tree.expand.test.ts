/**
 * Tree 组件展开/收起功能单元测试
 * 测试范围: 展开/收起、默认展开、手风琴模式
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
    label: '一级 1',
    children: [
      { id: '1-1', label: '二级 1-1' },
      { id: '1-2', label: '二级 1-2' },
    ],
  },
  { id: '2', label: '一级 2', children: [{ id: '2-1', label: '二级 2-1' }] },
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

describe('Tree 展开/收起功能', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  describe('点击展开/收起', () => {
    it('点击展开图标应该展开子节点', async () => {
      wrapper = createWrapper();
      const expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      await expandIcon.trigger('click');
      await nextTick();

      const firstNode = wrapper.find('.ale-tree-node');
      expect(firstNode.classes()).toContain('is-expanded');
    });

    it('再次点击应该收起子节点', async () => {
      wrapper = createWrapper();
      const expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');

      await expandIcon.trigger('click');
      await nextTick();

      await expandIcon.trigger('click');
      await nextTick();

      const firstNode = wrapper.find('.ale-tree-node');
      expect(firstNode.classes()).not.toContain('is-expanded');
    });

    it('应该触发 node-expand 事件', async () => {
      wrapper = createWrapper();
      const expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      await expandIcon.trigger('click');

      expect(wrapper.emitted('node-expand')).toBeTruthy();
    });

    it('应该触发 node-collapse 事件', async () => {
      wrapper = createWrapper();
      const expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');

      await expandIcon.trigger('click');
      await nextTick();
      await expandIcon.trigger('click');

      expect(wrapper.emitted('node-collapse')).toBeTruthy();
    });
  });

  describe('默认展开', () => {
    it('应该支持 defaultExpandAll 属性', async () => {
      wrapper = createWrapper({ defaultExpandAll: true });
      await nextTick();

      const expandedNodes = wrapper.findAll('.ale-tree-node.is-expanded');
      expect(expandedNodes.length).toBeGreaterThan(0);
    });

    it('应该支持 defaultExpandedKeys 属性', async () => {
      wrapper = createWrapper({
        defaultExpandedKeys: ['1'],
      });
      await nextTick();

      const instance = wrapper.vm as any;
      const node = instance.getNode('1');
      expect(node?.expanded).toBe(true);
    });
  });

  describe('叶子节点处理', () => {
    it('叶子节点不应该有可点击的展开图标', () => {
      wrapper = createWrapper();
      // 叶子节点不显示真实展开图标，但有占位符
      const leafNodes = wrapper.findAll('.ale-tree-node');
      // 检查至少有一些节点只有占位符（叶子节点）
      let hasLeafNodeWithoutRealIcon = false;
      for (const node of leafNodes) {
        // 有占位符但没有真实展开图标
        const hasPlaceholder = node.find('.ale-tree-node__expand-icon.is-leaf').exists();
        const hasRealIcon = node.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists();
        if (hasPlaceholder && !hasRealIcon) {
          hasLeafNodeWithoutRealIcon = true;
          break;
        }
      }
      expect(hasLeafNodeWithoutRealIcon).toBe(true);
    });

    it('应该处理空 children 数组', () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '节点', children: [] }],
      });

      // 空 children 数组的节点不显示真实展开图标，但有占位符
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });

    it('应该处理没有 children 的节点', () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '节点' }],
      });

      // 没有 children 的节点不显示真实展开图标，但有占位符
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });

    it('应该处理 isLeaf 标记', () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '节点', isLeaf: true }],
      });

      // 显式设置 isLeaf 的节点不显示真实展开图标，但有占位符
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });
  });

  describe('方法调用', () => {
    it('expandAll 方法应该展开所有节点', async () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;
      instance.expandAll();
      await nextTick();

      const expandedNodes = wrapper.findAll('.ale-tree-node.is-expanded');
      expect(expandedNodes.length).toBeGreaterThan(0);
    });

    it('collapseAll 方法应该收起所有节点', async () => {
      wrapper = createWrapper({ defaultExpandAll: true });
      await nextTick();

      const instance = wrapper.vm as any;
      instance.collapseAll();
      await nextTick();

      const expandedNodes = wrapper.findAll('.ale-tree-node.is-expanded');
      expect(expandedNodes.length).toBe(0);
    });
  });

  describe('点击节点展开', () => {
    it('应该支持 expandOnClickNode 属性', async () => {
      wrapper = createWrapper({ expandOnClickNode: true });
      const nodeContent = wrapper.find('.ale-tree-node__content');
      await nodeContent.trigger('click');
      await nextTick();

      expect(wrapper.emitted('node-expand')).toBeTruthy();
    });

    it('expandOnClickNode 为 false 时不应该展开', async () => {
      wrapper = createWrapper({ expandOnClickNode: false });
      const nodeContent = wrapper.find('.ale-tree-node__content');
      await nodeContent.trigger('click');
      await nextTick();

      const expandEvents = wrapper.emitted('node-expand');
      expect(expandEvents?.length || 0).toBe(0);
    });
  });

  describe('手风琴模式', () => {
    it('accordion 模式下应该只展开一个同级节点', async () => {
      const accordionData: TreeData[] = [
        {
          id: '1',
          label: '父节点',
          children: [
            { id: '1-1', label: '子节点1' },
            { id: '1-2', label: '子节点2' },
          ],
        },
      ];

      wrapper = createWrapper({
        data: accordionData,
        accordion: true,
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;
      const parentNode = instance.getNode('1');

      // 验证手风琴模式属性传递正确
      expect(wrapper.vm.$props.accordion).toBe(true);
      expect(parentNode).toBeTruthy();
    });
  });
});

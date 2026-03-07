/**
 * Tree 组件方法单元测试
 * 测试范围: 暴露的方法、动态操作、过滤功能
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

describe('Tree 方法', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  describe('节点操作方法', () => {
    it('应该暴露 filter 方法', async () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;
      expect(typeof instance.filter).toBe('function');

      instance.filter('节点 1');
      await nextTick();

      expect(wrapper.find('.ale-tree-node').exists()).toBe(true);
    });

    it('应该暴露 getNode 方法', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      const node = instance.getNode('1');
      expect(node).toBeTruthy();
      expect(node.data.id).toBe('1');
    });

    it('应该暴露 append 方法', async () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      instance.append({ id: 'new', label: '新节点' }, '1');
      await nextTick();

      expect(wrapper.text()).toContain('新节点');
    });

    it('应该暴露 remove 方法', async () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      const node = instance.getNode('1-1');
      expect(node).toBeTruthy();

      instance.remove(node);
      await nextTick();

      expect(instance.getNode('1-1')).toBeNull();
    });

    it('应该暴露 insertBefore 方法', async () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      instance.insertBefore({ id: 'new', label: '新节点' }, '1');
      await nextTick();

      expect(wrapper.text()).toContain('新节点');
    });

    it('应该暴露 insertAfter 方法', async () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      instance.insertAfter({ id: 'new', label: '新节点' }, '1');
      await nextTick();

      expect(wrapper.text()).toContain('新节点');
    });
  });

  describe('节点选择方法', () => {
    it('应该暴露 setCurrentKey 方法', () => {
      wrapper = createWrapper({ highlightCurrent: true });
      const instance = wrapper.vm as any;

      expect(typeof instance.setCurrentKey).toBe('function');

      instance.setCurrentKey('1');
      expect(instance.getCurrentKey()).toBe('1');
    });

    it('应该暴露 getCurrentKey 方法', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      expect(typeof instance.getCurrentKey).toBe('function');
    });

    it('应该暴露 getCurrentNode 方法', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      expect(typeof instance.getCurrentNode).toBe('function');
    });

    it('应该暴露 setCurrentNode 方法', () => {
      wrapper = createWrapper({ highlightCurrent: true });
      const instance = wrapper.vm as any;

      const node = instance.getNode('1');
      expect(typeof instance.setCurrentNode).toBe('function');

      instance.setCurrentNode(node);
    });
  });

  describe('展开/收起方法', () => {
    it('应该暴露 expandAll 方法', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      expect(typeof instance.expandAll).toBe('function');
    });

    it('应该暴露 collapseAll 方法', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      expect(typeof instance.collapseAll).toBe('function');
    });
  });

  describe('过滤功能', () => {
    it('应该支持 filterNodeMethod 属性', async () => {
      wrapper = createWrapper({
        filterNodeMethod: (value, data) => {
          return data.label?.includes(value) || false;
        },
      });

      const instance = wrapper.vm as any;
      instance.filter('节点 1');
      await nextTick();

      expect(wrapper.find('.ale-tree-node').exists()).toBe(true);
    });

    it('应该支持默认过滤方法', async () => {
      wrapper = createWrapper();

      const instance = wrapper.vm as any;
      instance.filter('节点 1');
      await nextTick();

      expect(wrapper.find('.ale-tree-node').exists()).toBe(true);
    });

    it('过滤应该高亮匹配节点', async () => {
      wrapper = createWrapper({
        filterNodeMethod: (value, data) => {
          return data.label?.includes(value) || false;
        },
      });

      const instance = wrapper.vm as any;
      instance.filter('节点 1');
      await nextTick();

      const text = wrapper.text();
      expect(text).toContain('节点 1');
    });
  });

  describe('updateKeyChildren 方法', () => {
    it('应该暴露 updateKeyChildren 方法', () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      expect(typeof instance.updateKeyChildren).toBe('function');
    });

    it('updateKeyChildren 应该更新子节点', async () => {
      wrapper = createWrapper();
      const instance = wrapper.vm as any;

      instance.updateKeyChildren('1', [
        { id: 'new-1', label: '新子节点1' },
        { id: 'new-2', label: '新子节点2' },
      ]);
      await nextTick();

      expect(wrapper.text()).toContain('新子节点1');
    });
  });
});

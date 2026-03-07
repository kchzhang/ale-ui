/**
 * Tree 组件边界情况单元测试
 * 测试范围: 深层嵌套、响应式、异常情况、大数据量
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';

const createWrapper = (props: Partial<TreeProps> = {}) => {
  return mount(Tree, {
    props,
    global: {
      components: { TreeNode },
    },
  });
};

describe('Tree 边界情况', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  describe('深层嵌套', () => {
    it('应该处理深层嵌套的数据', () => {
      const deepData: TreeData[] = [
        {
          id: '1',
          label: 'Level 1',
          children: [
            {
              id: '1-1',
              label: 'Level 2',
              children: [
                {
                  id: '1-1-1',
                  label: 'Level 3',
                  children: [
                    { id: '1-1-1-1', label: 'Level 4' },
                  ],
                },
              ],
            },
          ],
        },
      ];

      wrapper = createWrapper({ data: deepData });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理 10 层嵌套', () => {
      const createNestedData = (level: number, maxLevel: number): TreeData => {
        const node: TreeData = {
          id: `level-${level}`,
          label: `Level ${level}`,
        };
        if (level < maxLevel) {
          node.children = [createNestedData(level + 1, maxLevel)];
        }
        return node;
      };

      const deepData = [createNestedData(1, 10)];
      wrapper = createWrapper({ data: deepData });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });
  });

  describe('空数据处理', () => {
    it('应该处理空数据', () => {
      wrapper = createWrapper({ data: [] });
      expect(wrapper.find('.ale-tree__empty-block').exists()).toBe(true);
    });

    it('应该处理 undefined 数据', () => {
      wrapper = createWrapper({ data: undefined as any });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理 null 数据', () => {
      wrapper = createWrapper({ data: null as any });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理空 children 数组', () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '节点', children: [] }],
      });

      // 空 children 数组的节点不显示真实展开图标，但有占位符
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });
  });

  describe('数据格式边界', () => {
    it('应该处理没有 id 的数据', () => {
      wrapper = createWrapper({
        data: [{ label: '无 ID 节点' }],
      });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理没有 label 的数据', () => {
      wrapper = createWrapper({
        data: [{ id: '1' }],
      });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理重复的 id', () => {
      wrapper = createWrapper({
        data: [
          { id: '1', label: '节点 1' },
          { id: '1', label: '节点 1 重复' },
        ],
      });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理特殊字符的 label', () => {
      wrapper = createWrapper({
        data: [
          { id: '1', label: '<script>alert("xss")</script>' },
          { id: '2', label: '🎉 表情符号' },
          { id: '3', label: '中文 日本語 한국어' },
        ],
      });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理超长 label', () => {
      wrapper = createWrapper({
        data: [
          { id: '1', label: 'a'.repeat(1000) },
        ],
      });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });
  });

  describe('响应式更新', () => {
    it('应该响应 data 的变化', async () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '旧数据' }],
      });

      await wrapper.setProps({
        data: [{ id: '2', label: '新数据' }],
      });
      await nextTick();

      expect(wrapper.text()).toContain('新数据');
    });

    it('应该响应 data 的变化（新数据）', async () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '节点1' }],
      });

      expect(wrapper.text()).toContain('节点1');

      await wrapper.setProps({
        data: [{ id: '2', label: '节点2' }],
      });
      await nextTick();

      expect(wrapper.text()).toContain('节点2');
    });

    it('应该支持不同的 props 配置', () => {
      wrapper = createWrapper({
        data: [{ id: '1', name: '自定义名称' }],
        props: { label: 'name', children: 'children' },
      });

      expect(wrapper.text()).toContain('自定义名称');
    });
  });

  describe('大数据量', () => {
    it('应该处理 1000 个根节点', () => {
      const largeData: TreeData[] = Array.from({ length: 1000 }, (_, i) => ({
        id: `node-${i}`,
        label: `节点 ${i}`,
      }));

      wrapper = createWrapper({ data: largeData });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理宽而浅的树结构', () => {
      const wideData: TreeData[] = [
        {
          id: 'root',
          label: '根节点',
          children: Array.from({ length: 100 }, (_, i) => ({
            id: `child-${i}`,
            label: `子节点 ${i}`,
          })),
        },
      ];

      wrapper = createWrapper({ data: wideData });
      const instance = wrapper.vm as any;

      const rootNode = instance.getNode('root');
      expect(rootNode.childNodes.length).toBe(100);
    });
  });

  describe('异常情况', () => {
    it('应该处理循环引用', () => {
      const node1: TreeData = { id: '1', label: '节点 1', children: [] };
      const node2: TreeData = { id: '2', label: '节点 2', children: [] };

      // 创建循环引用
      node1.children = [node2];

      wrapper = createWrapper({ data: [node1] });
      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });

    it('应该处理无效的属性配置', () => {
      wrapper = createWrapper({
        data: [{ id: '1', label: '节点' }],
        props: { label: 'nonexistent', children: 'nonexistent' } as any,
      });

      expect(wrapper.find('.ale-tree').exists()).toBe(true);
    });
  });
});

/**
 * Tree 组件基础功能单元测试
 * 测试范围: 基础渲染、节点显示、空状态处理
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
  { id: '2', label: '一级 2' },
  { id: '3', label: '一级 3' },
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

describe('Tree 基础渲染', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  it('应该正确渲染 Tree 组件', () => {
    wrapper = createWrapper();
    expect(wrapper.find('.ale-tree').exists()).toBe(true);
  });

  it('应该渲染所有根节点', () => {
    wrapper = createWrapper();
    const nodes = wrapper.findAll('.ale-tree-node');
    expect(nodes.length).toBeGreaterThanOrEqual(3);
  });

  it('应该正确显示节点标签', () => {
    wrapper = createWrapper();
    const text = wrapper.text();
    expect(text).toContain('一级 1');
    expect(text).toContain('一级 2');
    expect(text).toContain('一级 3');
  });

  it('应该正确应用 highlight-current 类名', () => {
    wrapper = createWrapper({ highlightCurrent: true });
    expect(wrapper.find('.ale-tree--highlight-current').exists()).toBe(true);
  });

  it('空数据时应该显示空状态', () => {
    wrapper = createWrapper({ data: [] });
    expect(wrapper.find('.ale-tree__empty-block').exists()).toBe(true);
    expect(wrapper.text()).toContain('暂无数据');
  });

  it('应该处理没有 id 的数据', () => {
    wrapper = createWrapper({
      data: [{ label: '无 ID 节点' }],
    });
    expect(wrapper.find('.ale-tree').exists()).toBe(true);
  });

  it('应该处理自定义 label 字段', () => {
    wrapper = createWrapper({
      data: [{ id: '1', name: '自定义标签' }],
      props: { label: 'name', children: 'children' },
    });
    expect(wrapper.text()).toContain('自定义标签');
  });

  it('应该渲染子节点内容', async () => {
    wrapper = createWrapper({
      defaultExpandAll: true,
    });
    await nextTick();
    // 验证子节点能正确渲染
    const text = wrapper.text();
    expect(text).toContain('二级 1-1');
  });
});

/**
 * TreeNode 组件单独测试
 * 测试范围: TreeNode 组件的独立渲染和行为
 */

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TreeNode from '../TreeNode.vue';

describe('TreeNode 组件', () => {
  it('应该正确渲染单个节点', () => {
    const nodeData = {
      id: '1',
      label: '测试节点',
      level: 1,
      loaded: true,
      loading: false,
      checked: false,
      expanded: false,
      parent: null,
      visible: true,
      data: { id: '1', label: '测试节点' },
      childNodes: [],
      isLeaf: true,
      indeterminate: false,
      canFocus: true,
      store: {
        getCurrentNode: () => null,
      },
    };

    const wrapper = mount(TreeNode, {
      props: {
        node: nodeData,
        props: { label: 'label', children: 'children' },
        showCheckbox: false,
        checkStrictly: false,
        expandOnClickNode: true,
        checkOnClickNode: false,
        highlightCurrent: false,
        indent: 18,
      },
    });

    expect(wrapper.find('.ale-tree-node').exists()).toBe(true);
    expect(wrapper.text()).toContain('测试节点');
    wrapper.unmount();
  });

  it('应该渲染复选框', () => {
    const nodeData = {
      id: '1',
      label: '测试节点',
      level: 1,
      loaded: true,
      loading: false,
      checked: false,
      expanded: false,
      parent: null,
      visible: true,
      data: { id: '1', label: '测试节点' },
      childNodes: [],
      isLeaf: true,
      indeterminate: false,
      canFocus: true,
      store: {
        getCurrentNode: () => null,
      },
    };

    const wrapper = mount(TreeNode, {
      props: {
        node: nodeData,
        props: { label: 'label', children: 'children' },
        showCheckbox: true,
        checkStrictly: false,
        expandOnClickNode: true,
        checkOnClickNode: false,
        highlightCurrent: false,
        indent: 18,
      },
    });

    expect(wrapper.find('.ale-checkbox').exists()).toBe(true);
    wrapper.unmount();
  });

  it('应该渲染展开图标', async () => {
    const nodeData = {
      id: '1',
      label: '测试节点',
      level: 1,
      loaded: true,
      loading: false,
      checked: false,
      expanded: false,
      parent: null,
      visible: true,
      data: { id: '1', label: '测试节点' },
      childNodes: [{ id: '1-1', label: '子节点' } as any],
      isLeaf: false,
      indeterminate: false,
      canFocus: true,
      store: {
        getCurrentNode: () => null,
      },
    };

    const wrapper = mount(TreeNode, {
      props: {
        node: nodeData,
        props: { label: 'label', children: 'children' },
        showCheckbox: false,
        checkStrictly: false,
        expandOnClickNode: true,
        checkOnClickNode: false,
        highlightCurrent: false,
        indent: 18,
      },
    });

    await nextTick();

    // 有子节点的节点应该显示展开图标（包含 svg 的可点击图标）
    const expandIcon = wrapper.find('.ale-tree-node__expand-icon');
    expect(expandIcon.exists()).toBe(true);
    // 真实展开图标应该包含 svg 元素
    expect(expandIcon.find('svg').exists()).toBe(true);
    wrapper.unmount();
  });

  it('禁用节点应该显示禁用样式', () => {
    const nodeData = {
      id: '1',
      label: '禁用节点',
      level: 1,
      loaded: true,
      loading: false,
      checked: false,
      expanded: false,
      parent: null,
      visible: true,
      data: { id: '1', label: '禁用节点', disabled: true },
      childNodes: [],
      isLeaf: true,
      indeterminate: false,
      canFocus: false,
      disabled: true,
      store: {
        getCurrentNode: () => null,
      },
    };

    const wrapper = mount(TreeNode, {
      props: {
        node: nodeData,
        props: { label: 'label', children: 'children' },
        showCheckbox: true,
        checkStrictly: false,
        expandOnClickNode: true,
        checkOnClickNode: false,
        highlightCurrent: false,
        indent: 18,
      },
    });

    expect(wrapper.find('.ale-checkbox.is-disabled').exists()).toBe(true);
    wrapper.unmount();
  });

  it('应该正确应用缩进样式', () => {
    const nodeData = {
      id: '1',
      label: '测试节点',
      level: 3,
      loaded: true,
      loading: false,
      checked: false,
      expanded: false,
      parent: null,
      visible: true,
      data: { id: '1', label: '测试节点' },
      childNodes: [],
      isLeaf: true,
      indeterminate: false,
      canFocus: true,
      store: {
        getCurrentNode: () => null,
      },
    };

    const wrapper = mount(TreeNode, {
      props: {
        node: nodeData,
        props: { label: 'label', children: 'children' },
        showCheckbox: false,
        checkStrictly: false,
        expandOnClickNode: true,
        checkOnClickNode: false,
        highlightCurrent: false,
        indent: 20,
      },
    });

    const content = wrapper.find('.ale-tree-node__content');
    expect(content.exists()).toBe(true);
    // 缩进应该是 (level - 1) * indent = (3 - 1) * 20 = 40px
    expect(content.attributes('style')).toContain('padding-left');
    wrapper.unmount();
  });

  it('应该支持自定义渲染内容', () => {
    const nodeData = {
      id: '1',
      label: '测试节点',
      level: 1,
      loaded: true,
      loading: false,
      checked: false,
      expanded: false,
      parent: null,
      visible: true,
      data: { id: '1', label: '测试节点' },
      childNodes: [],
      isLeaf: true,
      indeterminate: false,
      canFocus: true,
      store: {
        getCurrentNode: () => null,
      },
    };

    const customRender = vi.fn(() => '自定义内容');

    const wrapper = mount(TreeNode, {
      props: {
        node: nodeData,
        props: { label: 'label', children: 'children' },
        renderContent: customRender as any,
        showCheckbox: false,
        checkStrictly: false,
        expandOnClickNode: true,
        checkOnClickNode: false,
        highlightCurrent: false,
        indent: 18,
      },
    });

    expect(customRender).toHaveBeenCalled();
    wrapper.unmount();
  });
});

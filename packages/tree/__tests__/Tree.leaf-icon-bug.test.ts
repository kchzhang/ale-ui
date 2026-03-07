/**
 * Tree 组件叶子节点图标 Bug 复现测试
 * Bug 描述: 当子节点经过两次转换变成叶子节点后，展开图标仍然显示不会自动隐藏
 * 问题根源: nodeIsLeaf computed 属性没有正确追踪 childNodesCount 的变化
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';

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

describe('Tree 叶子节点图标 Bug 复现', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  /**
   * Bug 复现测试: 两次转换后展开图标应正确隐藏
   * 这个测试会失败，直到 bug 被修复
   */
  it('Bug 复现: 两次添加并移除子节点后展开图标应隐藏', async () => {
    // 初始状态: 叶子节点
    wrapper = createWrapper({
      data: [{ id: 'parent', label: '父节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;

    // 第 1 次转换: 添加子节点 -> 非叶子节点
    instance.append({ id: 'child1', label: '子节点1' }, 'parent');
    await nextTick();

    // 验证: 应显示真实展开图标
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第 2 次转换: 移除子节点 -> 叶子节点
    instance.remove({ id: 'child1' });
    await nextTick();

    // 验证: 应隐藏展开图标
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 第 3 次转换: 再次添加子节点 -> 非叶子节点
    instance.append({ id: 'child2', label: '子节点2' }, 'parent');
    await nextTick();

    // 验证: 应显示真实展开图标
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第 4 次转换: 再次移除子节点 -> 叶子节点（第二次变为叶子）
    instance.remove({ id: 'child2' });
    await nextTick();

    // Bug 复现点: 经过两次转换后，图标应正确隐藏
    // 如果测试失败，说明 bug 存在
    const realExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
    const leafPlaceholder = wrapper.find('.ale-tree-node__expand-icon.is-leaf');

    expect(realExpandIcon.exists()).toBe(false);
    expect(leafPlaceholder.exists()).toBe(true);
  });

  /**
   * 通过数据修改触发问题
   */
  it('Bug 复现: 通过数据修改两次转换后展开图标应隐藏', async () => {
    const data = ref<TreeData[]>([
      { id: '1', label: '测试节点' },
    ]);

    wrapper = createWrapper({ data: data.value });
    await nextTick();

    // 第 1 次: 添加子节点
    data.value[0].children = [{ id: '1-1', label: '子节点1' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第 2 次: 清空子节点
    data.value[0].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 第 3 次: 再次添加子节点
    data.value[0].children = [{ id: '1-2', label: '子节点2' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第 4 次: 再次清空（第二次变为空）
    data.value[0].children = undefined;
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // Bug 复现点
    const realExpandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(realExpandIcon.exists()).toBe(false);
  });
});

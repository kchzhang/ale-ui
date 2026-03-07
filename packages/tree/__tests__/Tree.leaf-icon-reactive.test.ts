/**
 * Tree 组件叶子节点图标响应式测试
 * 测试 nodeIsLeaf computed 属性的响应式追踪
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';
import type { Node as NodeType } from '../model/node';

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

describe('Tree 叶子节点图标响应式测试', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  /**
   * 测试: 验证 nodeIsLeaf 在多次状态转换后的响应式行为
   */
  it('多次状态转换后 nodeIsLeaf 应正确响应', async () => {
    const data = ref<TreeData[]>([
      { id: '1', label: '节点' },
    ]);

    wrapper = createWrapper({ data: data.value });
    await nextTick();

    const instance = wrapper.vm as any;

    // 循环进行多次状态转换
    for (let i = 0; i < 3; i++) {
      // 添加子节点
      const newChild = { id: `1-${i}`, label: `子节点${i}` };
      data.value[0].children = data.value[0].children
        ? [...data.value[0].children, newChild]
        : [newChild];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证展开图标显示
      let expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(true);

      // 获取节点并验证 isLeaf 状态
      let node = instance.getNode('1') as NodeType;
      expect(node.isLeaf).toBe(false);

      // 移除子节点
      data.value[0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证展开图标隐藏
      expandIcon = wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcon.exists()).toBe(false);

      // 获取节点并验证 isLeaf 状态
      node = instance.getNode('1') as NodeType;
      expect(node.isLeaf).toBe(true);
    }
  });

  /**
   * 测试: 同时修改多个节点的子节点
   */
  it('同时修改多个节点的子节点状态', async () => {
    const data = ref<TreeData[]>([
      { id: '1', label: '节点1' },
      { id: '2', label: '节点2' },
    ]);

    wrapper = createWrapper({ data: data.value });
    await nextTick();

    const instance = wrapper.vm as any;

    // 同时给两个节点添加子节点
    data.value[0].children = [{ id: '1-1', label: '子节点1' }];
    data.value[1].children = [{ id: '2-1', label: '子节点2' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 验证两个节点都显示展开图标
    let expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(2);

    // 同时清空两个节点的子节点
    data.value[0].children = [];
    data.value[1].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 验证两个节点的展开图标都隐藏
    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(0);

    // 再次同时添加子节点
    data.value[0].children = [{ id: '1-2', label: '子节点1-2' }];
    data.value[1].children = [{ id: '2-2', label: '子节点2-2' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(2);

    // 再次同时清空（第二次）
    data.value[0].children = [];
    data.value[1].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 关键验证: 第二次清空后图标应正确隐藏
    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(0);

    // 验证节点状态
    const node1 = instance.getNode('1') as NodeType;
    const node2 = instance.getNode('2') as NodeType;
    expect(node1.isLeaf).toBe(true);
    expect(node2.isLeaf).toBe(true);
  });

  /**
   * 测试: 深层嵌套节点的状态转换
   */
  it('深层嵌套节点多次状态转换', async () => {
    const data = ref<TreeData[]>([
      {
        id: '1',
        label: '根节点',
        children: [
          {
            id: '1-1',
            label: '二级节点',
            children: [
              {
                id: '1-1-1',
                label: '三级节点',
              },
            ],
          },
        ],
      },
    ]);

    wrapper = createWrapper({ data: data.value });
    await nextTick();

    const instance = wrapper.vm as any;

    // 初始状态: 根节点和二级节点都有展开图标
    let expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(2);

    // 第一次移除三级节点
    data.value[0].children![0].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 二级节点应变为叶子节点
    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(1);

    let node2 = instance.getNode('1-1') as NodeType;
    expect(node2.isLeaf).toBe(true);

    // 第一次重新添加三级节点
    data.value[0].children![0].children = [{ id: '1-1-2', label: '新三级节点' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(2);

    node2 = instance.getNode('1-1') as NodeType;
    expect(node2.isLeaf).toBe(false);

    // 第二次移除三级节点
    data.value[0].children![0].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 关键验证: 第二次移除后二级节点应再次变为叶子节点
    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(1);

    node2 = instance.getNode('1-1') as NodeType;
    expect(node2.isLeaf).toBe(true);

    // 第二次重新添加三级节点
    data.value[0].children![0].children = [{ id: '1-1-3', label: '再三级节点' }];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(2);

    // 第三次移除三级节点
    data.value[0].children![0].children = [];
    await wrapper.setProps({ data: [...data.value] });
    await nextTick();

    // 关键验证: 第三次移除后也应正确
    expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
    expect(expandIcons.length).toBe(1);

    node2 = instance.getNode('1-1') as NodeType;
    expect(node2.isLeaf).toBe(true);
  });

  /**
   * 测试: 使用 updateKeyChildren API 多次更新
   */
  it('使用 updateKeyChildren 多次更新子节点', async () => {
    wrapper = createWrapper({
      data: [{ id: '1', label: '节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;

    // 第一次更新: 添加子节点
    instance.updateKeyChildren('1', [{ id: '1-1', label: '子节点1' }]);
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第二次更新: 清空
    instance.updateKeyChildren('1', []);
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 第三次更新: 再次添加
    instance.updateKeyChildren('1', [{ id: '1-2', label: '子节点2' }]);
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 第四次更新: 再次清空（第二次清空）
    instance.updateKeyChildren('1', []);
    await nextTick();

    // 关键验证
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 验证节点状态
    const node = instance.getNode('1') as NodeType;
    expect(node.isLeaf).toBe(true);
  });

  /**
   * 测试: 交替使用不同 API 方法
   */
  it('交替使用 append 和 updateKeyChildren', async () => {
    wrapper = createWrapper({
      data: [{ id: '1', label: '节点' }],
    });
    await nextTick();

    const instance = wrapper.vm as any;

    // 第一次: 使用 append 添加
    instance.append({ id: '1-1', label: '子节点1' }, '1');
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 使用 remove 移除
    instance.remove({ id: '1-1' });
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 第二次: 使用 updateKeyChildren 添加
    instance.updateKeyChildren('1', [{ id: '1-2', label: '子节点2' }]);
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 再次使用 updateKeyChildren 清空
    instance.updateKeyChildren('1', []);
    await nextTick();

    // 关键验证
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

    // 第三次: 使用 append 再次添加
    instance.append({ id: '1-3', label: '子节点3' }, '1');
    await nextTick();

    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

    // 使用 remove 再次移除
    instance.remove({ id: '1-3' });
    await nextTick();

    // 关键验证
    expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
  });
});

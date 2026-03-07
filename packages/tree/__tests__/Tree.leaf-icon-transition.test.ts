/**
 * Tree 组件叶子节点图标状态转换单元测试
 * 测试范围: 节点从有子节点变为叶子节点时，展开图标的显示/隐藏逻辑
 * 测试方法: 控制变量法 - 逐步验证每次状态变化时图标的更新机制
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';

/**
 * 创建测试数据工厂函数
 * 控制变量: 节点是否有子节点
 */
const createTestData = (hasChildren: boolean): TreeData[] => [
  {
    id: '1',
    label: '测试节点',
    children: hasChildren ? [{ id: '1-1', label: '子节点' }] : undefined,
  },
];

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

describe('Tree 叶子节点图标状态转换测试', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  /**
   * 测试场景 1: 单次状态转换
   * 叶子节点 -> 非叶子节点 -> 叶子节点
   */
  describe('单次状态转换', () => {
    it('初始为叶子节点时不应显示展开图标', async () => {
      // 控制变量: 初始无子节点
      wrapper = createWrapper({
        data: [{ id: '1', label: '叶子节点' }],
      });
      await nextTick();

      // 验证: 只有占位符，没有真实展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });

    it('添加子节点后应显示展开图标', async () => {
      // 控制变量: 初始无子节点，然后添加子节点
      const data = ref<TreeData[]>([{ id: '1', label: '父节点' }]);
      wrapper = createWrapper({
        data: data.value,
      });
      await nextTick();

      // 初始状态: 叶子节点
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

      // 操作: 添加子节点
      data.value[0].children = [{ id: '1-1', label: '子节点' }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 应显示展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);
    });

    it('移除子节点后应隐藏展开图标', async () => {
      // 控制变量: 初始有子节点，然后移除
      const data = ref<TreeData[]>([
        {
          id: '1',
          label: '父节点',
          children: [{ id: '1-1', label: '子节点' }],
        },
      ]);
      wrapper = createWrapper({
        data: data.value,
      });
      await nextTick();

      // 初始状态: 有展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 操作: 移除子节点
      data.value[0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 应隐藏展开图标（显示叶子占位符）
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });
  });

  /**
   * 测试场景 2: 两次状态转换（问题复现场景）
   * 叶子节点 -> 非叶子节点 -> 叶子节点 -> 非叶子节点 -> 叶子节点
   */
  describe('两次状态转换 - 问题复现', () => {
    it('经过两次转换后应正确隐藏展开图标', async () => {
      // 控制变量: 多次状态转换
      const data = ref<TreeData[]>([{ id: '1', label: '测试节点' }]);
      wrapper = createWrapper({
        data: data.value,
      });
      await nextTick();

      // 第 1 次转换: 叶子节点 -> 非叶子节点
      data.value[0].children = [{ id: '1-1', label: '子节点 1' }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 应显示展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 第 2 次转换: 非叶子节点 -> 叶子节点
      data.value[0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 应隐藏展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);

      // 第 3 次转换: 叶子节点 -> 非叶子节点
      data.value[0].children = [{ id: '1-2', label: '子节点 2' }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 应显示展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 第 4 次转换: 非叶子节点 -> 叶子节点（第二次变为叶子）
      data.value[0].children = undefined;
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 关键验证: 经过两次转换后，图标应正确隐藏
      // 这是问题复现的关键点
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });

    it('使用 remove 方法移除所有子节点后应隐藏展开图标', async () => {
      // 控制变量: 使用 remove API 移除子节点
      const data = ref<TreeData[]>([
        {
          id: '1',
          label: '父节点',
          children: [
            { id: '1-1', label: '子节点 1' },
            { id: '1-2', label: '子节点 2' },
          ],
        },
      ]);
      wrapper = createWrapper({
        data: data.value,
      });
      await nextTick();

      // 初始状态: 有展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 第 1 次移除子节点
      const instance = wrapper.vm as any;
      instance.remove({ id: '1-1' });
      await nextTick();

      // 还有子节点，仍应显示展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 第 2 次移除子节点（移除最后一个子节点）
      instance.remove({ id: '1-2' });
      await nextTick();

      // 关键验证: 移除所有子节点后，应隐藏展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });
  });

  /**
   * 测试场景 3: 使用 API 方法进行状态转换
   */
  describe('使用 API 方法进行状态转换', () => {
    it('使用 append 方法添加子节点后应显示展开图标', async () => {
      // 控制变量: 使用 append API
      wrapper = createWrapper({
        data: [{ id: '1', label: '父节点' }],
      });
      await nextTick();

      // 初始状态: 叶子节点
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

      // 操作: 使用 append 添加子节点
      const instance = wrapper.vm as any;
      instance.append({ id: '1-1', label: '新子节点' }, '1');
      await nextTick();

      // 验证: 应显示展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);
    });

    it('多次 append 后 remove 所有子节点应隐藏展开图标', async () => {
      // 控制变量: 多次添加后全部移除
      wrapper = createWrapper({
        data: [{ id: '1', label: '父节点' }],
      });
      await nextTick();

      const instance = wrapper.vm as any;

      // 第 1 次添加
      instance.append({ id: '1-1', label: '子节点 1' }, '1');
      await nextTick();
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 第 2 次添加
      instance.append({ id: '1-2', label: '子节点 2' }, '1');
      await nextTick();
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 移除所有子节点
      instance.remove({ id: '1-1' });
      await nextTick();
      instance.remove({ id: '1-2' });
      await nextTick();

      // 关键验证: 移除所有子节点后应隐藏展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });
  });

  /**
   * 测试场景 4: 边界情况
   */
  describe('边界情况', () => {
    it('空 children 数组应视为叶子节点', async () => {
      // 控制变量: 空数组 vs undefined
      const data = ref<TreeData[]>([
        {
          id: '1',
          label: '测试节点',
          children: [],
        },
      ]);
      wrapper = createWrapper({
        data: data.value,
      });
      await nextTick();

      // 验证: 空数组应视为叶子节点
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);

      // 操作: 添加子节点
      data.value[0].children = [{ id: '1-1', label: '子节点' }];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 应显示展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 操作: 清空数组
      data.value[0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 应再次隐藏展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });

    it('显式设置 isLeaf 为 true 时应隐藏展开图标', async () => {
      // 控制变量: isLeaf 标记
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

      // 验证: 即使有 children，isLeaf=true 也应隐藏展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });

    it('深层嵌套节点状态转换应正确传播', async () => {
      // 控制变量: 深层嵌套节点
      const data = ref<TreeData[]>([
        {
          id: '1',
          label: '根节点',
          children: [
            {
              id: '1-1',
              label: '第二层',
              children: [{ id: '1-1-1', label: '第三层' }],
            },
          ],
        },
      ]);
      wrapper = createWrapper({
        data: data.value,
      });
      await nextTick();

      // 初始状态: 两层都有展开图标
      const expandIcons = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIcons.length).toBe(2);

      // 操作: 移除第三层节点
      data.value[0].children![0].children = [];
      await wrapper.setProps({ data: [...data.value] });
      await nextTick();

      // 验证: 第二层应变为叶子节点
      const expandIconsAfter = wrapper.findAll('.ale-tree-node__expand-icon:not(.is-leaf)');
      expect(expandIconsAfter.length).toBe(1); // 只有根节点还有展开图标
    });
  });

  /**
   * 测试场景 5: 响应式更新机制验证
   */
  describe('响应式更新机制', () => {
    it('多次快速状态转换应正确更新图标', async () => {
      // 控制变量: 快速连续状态转换
      const data = ref<TreeData[]>([{ id: '1', label: '测试节点' }]);
      wrapper = createWrapper({
        data: data.value,
      });
      await nextTick();

      // 快速连续转换 5 次
      for (let i = 0; i < 5; i++) {
        // 添加子节点
        data.value[0].children = [{ id: `1-${i}`, label: `子节点 ${i}` }];
        await wrapper.setProps({ data: [...data.value] });
        await nextTick();

        // 验证: 应显示展开图标
        expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

        // 移除子节点
        data.value[0].children = undefined;
        await wrapper.setProps({ data: [...data.value] });
        await nextTick();

        // 验证: 应隐藏展开图标
        expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
        expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
      }
    });

    it('使用 updateKeyChildren 方法应正确更新图标', async () => {
      // 控制变量: 使用 updateKeyChildren API
      wrapper = createWrapper({
        data: [{ id: '1', label: '父节点' }],
      });
      await nextTick();

      const instance = wrapper.vm as any;

      // 初始状态: 叶子节点
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);

      // 第 1 次更新子节点
      instance.updateKeyChildren('1', [{ id: '1-1', label: '子节点 1' }]);
      await nextTick();
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 第 2 次更新子节点（清空）
      instance.updateKeyChildren('1', []);
      await nextTick();

      // 关键验证: 清空子节点后应隐藏展开图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);

      // 第 3 次更新子节点（再次添加）
      instance.updateKeyChildren('1', [{ id: '1-2', label: '子节点 2' }]);
      await nextTick();
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(true);

      // 第 4 次更新子节点（再次清空）
      instance.updateKeyChildren('1', []);
      await nextTick();

      // 关键验证: 第二次清空后也应正确隐藏图标
      expect(wrapper.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists()).toBe(false);
      expect(wrapper.find('.ale-tree-node__expand-icon.is-leaf').exists()).toBe(true);
    });
  });
});

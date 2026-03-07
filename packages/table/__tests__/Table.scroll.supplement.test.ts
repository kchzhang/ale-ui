import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Table from '../Table.vue';
import type { TableColumn } from '../types';

describe('Table 滚动功能补充测试', () => {
  const testData = Array(50).fill(null).map((_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: 20 + (i % 30),
    address: `北京市朝阳区${i + 1}号街道${i + 1}号楼`,
    department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
    status: i % 2 === 0 ? 'active' : 'inactive'
  }));

  const testColumns: TableColumn[] = [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', width: 100 },
    { prop: 'department', label: '部门', width: 120 },
    { prop: 'address', label: '地址', minWidth: 300 },
    { prop: 'status', label: '状态', width: 100 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * 辅助函数：获取 Scroll 组件内部滚动内容元素
   * 使用 Scroll 组件后，实际滚动的是内部的 .ale-scroll__content 元素
   */
  const getScrollContent = (wrapper: ReturnType<typeof mount>) => {
    const scrollContent = wrapper.find('.ale-scroll__content');
    return scrollContent.exists() ? scrollContent : null;
  };

  describe('横向滚动同步', () => {
    it('表身横向滚动时应该同步表头滚动位置', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const bodyWrapper = wrapper.find('.ale-table__body-wrapper--scrollable');
      const headerWrapper = wrapper.find('.ale-table__header-wrapper--fixed');

      expect(bodyWrapper.exists()).toBe(true);
      expect(headerWrapper.exists()).toBe(true);

      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();

      // 模拟横向滚动 - 设置内部滚动元素的 scrollLeft
      const scrollEl = scrollContent!.element as HTMLElement;
      scrollEl.scrollLeft = 100;
      await scrollContent!.trigger('scroll');

      // 等待事件处理
      await new Promise(resolve => requestAnimationFrame(resolve));
      await nextTick();

      // 表头应该同步滚动
      const headerEl = headerWrapper.element as HTMLElement;
      expect(headerEl.scrollLeft).toBe(100);
    });

    it('表头横向滚动时应该同步表身滚动位置', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const bodyWrapper = wrapper.find('.ale-table__body-wrapper--scrollable');
      const headerWrapper = wrapper.find('.ale-table__header-wrapper--fixed');

      // 模拟表头横向滚动
      const headerEl = headerWrapper.element as HTMLElement;
      headerEl.scrollLeft = 150;
      await headerWrapper.trigger('scroll');

      // 等待 RAF 执行
      await new Promise(resolve => requestAnimationFrame(resolve));
      await nextTick();

      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();

      // 表身应该同步滚动
      const scrollEl = scrollContent!.element as HTMLElement;
      expect(scrollEl.scrollLeft).toBe(150);
    });

    it('双向滚动同步应该保持一致性', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();
      
      const headerWrapper = wrapper.find('.ale-table__header-wrapper--fixed');
      const scrollEl = scrollContent!.element as HTMLElement;
      const headerEl = headerWrapper.element as HTMLElement;

      // 第一次滚动
      scrollEl.scrollLeft = 50;
      await scrollContent!.trigger('scroll');
      await new Promise(resolve => requestAnimationFrame(resolve));
      await nextTick();
      expect(headerEl.scrollLeft).toBe(50);

      // 第二次滚动
      scrollEl.scrollLeft = 100;
      await scrollContent!.trigger('scroll');
      await new Promise(resolve => requestAnimationFrame(resolve));
      await nextTick();
      expect(headerEl.scrollLeft).toBe(100);

      // 第三次滚动（回滚）
      scrollEl.scrollLeft = 0;
      await scrollContent!.trigger('scroll');
      await new Promise(resolve => requestAnimationFrame(resolve));
      await nextTick();
      expect(headerEl.scrollLeft).toBe(0);
    });
  });

  describe('滚动状态', () => {
    it('应该正确追踪滚动状态', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const vm = wrapper.vm as unknown as { scrollState: { isScrolling: boolean; scrollTop: number; scrollLeft: number } };

      // 初始状态
      expect(vm.scrollState.isScrolling).toBe(false);
      expect(vm.scrollState.scrollTop).toBe(0);
      expect(vm.scrollState.scrollLeft).toBe(0);

      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();

      // 触发滚动
      const scrollEl = scrollContent!.element as HTMLElement;
      scrollEl.scrollTop = 100;
      await scrollContent!.trigger('scroll');

      // 等待事件处理
      await new Promise(resolve => requestAnimationFrame(resolve));
      await nextTick();

      // 滚动状态应该更新
      expect(vm.scrollState.isScrolling).toBe(true);
      expect(vm.scrollState.scrollTop).toBe(100);
    });

    it('滚动停止后应该重置 isScrolling 状态', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const vm = wrapper.vm as unknown as { scrollState: { isScrolling: boolean } };

      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();

      // 触发滚动
      const scrollEl = scrollContent!.element as HTMLElement;
      scrollEl.scrollTop = 100;
      await scrollContent!.trigger('scroll');

      // 等待 RAF 执行
      await new Promise(resolve => requestAnimationFrame(resolve));
      await nextTick();

      expect(vm.scrollState.isScrolling).toBe(true);

      // 等待滚动停止超时（150ms）
      await new Promise(resolve => setTimeout(resolve, 200));

      expect(vm.scrollState.isScrolling).toBe(false);
    });
  });

  describe('滚动方法实际效果', () => {
    it('setScrollPosition 应该正确设置滚动位置', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const vm = wrapper.vm as unknown as { setScrollPosition: (options: { top?: number; left?: number }) => void };
      
      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();
      const scrollEl = scrollContent!.element as HTMLElement;

      // 设置纵向滚动
      vm.setScrollPosition({ top: 200 });
      await nextTick();
      expect(scrollEl.scrollTop).toBe(200);

      // 设置横向滚动
      vm.setScrollPosition({ left: 50 });
      await nextTick();
      expect(scrollEl.scrollLeft).toBe(50);

      // 同时设置
      vm.setScrollPosition({ top: 300, left: 100 });
      await nextTick();
      expect(scrollEl.scrollTop).toBe(300);
      expect(scrollEl.scrollLeft).toBe(100);
    });

    it('scrollToRowIndex 应该滚动到指定行', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400,
          rowHeight: 48
        }
      });

      await nextTick();

      const vm = wrapper.vm as unknown as { scrollToRowIndex: (index: number) => void };
      
      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();
      const scrollEl = scrollContent!.element as HTMLElement;

      // 模拟 scrollTo 方法（jsdom 中不可用）
      const scrollToMock = vi.fn(function(this: HTMLElement, options: { top?: number }) {
        if (options.top !== undefined) {
          this.scrollTop = options.top;
        }
      }) as unknown as HTMLElement['scrollTo'];
      scrollEl.scrollTo = scrollToMock;

      // 滚动到第 10 行（索引 9）
      vm.scrollToRowIndex(9);
      await nextTick();

      // 验证 scrollTo 被调用，且参数正确（9 * 48 = 432）
      expect(scrollToMock).toHaveBeenCalled();
      expect(scrollEl.scrollTop).toBe(432);
    });

    it('scrollTableToTop 应该滚动到顶部', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const vm = wrapper.vm as unknown as { scrollTableToTop: () => void };
      
      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();
      const scrollEl = scrollContent!.element as HTMLElement;

      // 先滚动到底部
      scrollEl.scrollTop = 1000;
      expect(scrollEl.scrollTop).toBeGreaterThan(0);

      // 调用滚动到顶部
      vm.scrollTableToTop();
      await nextTick();

      expect(scrollEl.scrollTop).toBe(0);
    });

    it('scrollTableToBottom 应该滚动到底部', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      const vm = wrapper.vm as unknown as { scrollTableToBottom: () => void };
      
      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();
      const scrollEl = scrollContent!.element as HTMLElement;

      // 模拟 scrollTo 方法（jsdom 中不可用）
      const scrollToMock = vi.fn();
      scrollEl.scrollTo = scrollToMock;

      // 设置 scrollHeight
      Object.defineProperty(scrollEl, 'scrollHeight', { value: 2000, writable: true });

      // 调用滚动到底部
      vm.scrollTableToBottom();
      await nextTick();

      // 验证 scrollTo 被调用
      expect(scrollToMock).toHaveBeenCalled();
    });
  });

  describe('边界条件', () => {
    it('height 为 0 时不应启用滚动', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 0
        }
      });

      // height 为 0 时不应启用可滚动类
      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(false);
    });

    it('数据为空但启用滚动时应该正常工作', () => {
      const wrapper = mount(Table, {
        props: {
          data: [],
          columns: testColumns,
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__header-wrapper--fixed').exists()).toBe(true);
      expect(wrapper.find('.ale-table__body-wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__empty').exists()).toBe(true);
    });

    it('只有一列数据时应该正常工作', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [{ prop: 'id', label: 'ID' }],
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(testData.length);
    });

    it('超多列数据时应该支持横向滚动', () => {
      const manyColumns: TableColumn[] = Array(20).fill(null).map((_, i) => ({
        prop: `col${i}`,
        label: `列${i}`,
        width: 150
      }));

      const dataWithManyCols = testData.slice(0, 5).map((item, idx) => {
        const newItem: Record<string, any> = { id: item.id };
        manyColumns.forEach((_, i) => {
          newItem[`col${i}`] = `数据${idx}-${i}`;
        });
        return newItem;
      });

      const wrapper = mount(Table, {
        props: {
          data: dataWithManyCols,
          columns: manyColumns,
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__body-wrapper--scrollable').exists()).toBe(true);
    });
  });

  describe('响应式变化', () => {
    it('从非滚动切换到滚动模式应该正常工作', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      // 初始非滚动模式
      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(false);

      // 切换到滚动模式
      await wrapper.setProps({ height: 400 });
      await nextTick();

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__header-wrapper--fixed').exists()).toBe(true);
    });

    it('从滚动切换到非滚动模式应该正常工作', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      // 初始滚动模式
      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);

      // 切换到非滚动模式
      await wrapper.setProps({ height: undefined });
      await nextTick();

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(false);
    });

    it('height 和 maxHeight 切换应该正常工作', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);

      // 从 height 切换到 maxHeight
      await wrapper.setProps({ height: undefined, maxHeight: 500 });
      await nextTick();

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
    });
  });

  describe('性能测试', () => {
    it('大量数据渲染时滚动应该流畅', () => {
      const largeData = Array(500).fill(null).map((_, i) => ({
        id: i + 1,
        name: `用户${i + 1}`,
        age: 20 + (i % 50),
        address: `地址${i + 1}`,
        department: `部门${(i % 10) + 1}`
      }));

      const wrapper = mount(Table, {
        props: {
          data: largeData,
          columns: testColumns.slice(0, 4),
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.findAll('.ale-table__row').length).toBeGreaterThan(0);
    });

    it('频繁滚动事件应该被正确处理', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      await nextTick();

      // 找到 Scroll 组件内部的滚动内容元素
      const scrollContent = getScrollContent(wrapper);
      expect(scrollContent).not.toBeNull();
      const scrollEl = scrollContent!.element as HTMLElement;

      // 快速触发多次滚动事件
      for (let i = 0; i < 10; i++) {
        scrollEl.scrollTop = i * 10;
        await scrollContent!.trigger('scroll');
      }

      // 等待 RAF 处理
      await new Promise(resolve => requestAnimationFrame(resolve));

      // 不应该抛出错误
      expect(true).toBe(true);
    });
  });

  describe('兼容性测试', () => {
    it('同时启用固定表头和表身滚动时应该正常工作', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400,
          stickyHeader: true
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__header-wrapper--fixed').exists()).toBe(true);
    });

    it('同时启用树形数据和表身滚动时应该正常工作', () => {
      const wrapper = mount(Table, {
        props: {
          data: [
            {
              id: 1,
              name: '父节点',
              children: Array(10).fill(null).map((_, i) => ({
                id: 10 + i,
                name: `子节点${i}`
              }))
            }
          ],
          columns: [{ prop: 'name', label: '名称' }],
          height: 300,
          treeConfig: { childrenKey: 'children' }
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__tree-icon').exists()).toBe(true);
    });
  });
});

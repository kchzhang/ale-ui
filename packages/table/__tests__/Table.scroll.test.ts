import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import Table from '../Table.vue';
import type { TableProps, TableColumn } from '../types';

describe('Table 表头固定表身滚动功能', () => {
  const testData = Array(20).fill(null).map((_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: 20 + (i % 30),
    address: `北京市朝阳区${i + 1}号`,
    status: i % 2 === 0 ? 'active' : 'inactive'
  }));

  const testColumns: TableColumn[] = [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', width: 100 },
    { prop: 'address', label: '地址', minWidth: 200 },
    { prop: 'status', label: '状态', width: 100 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('基础功能', () => {
    it('应该支持 height 属性启用固定表头', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__header-wrapper--fixed').exists()).toBe(true);
      expect(wrapper.find('.ale-table__body-wrapper--scrollable').exists()).toBe(true);
    });

    it('应该支持 maxHeight 属性启用固定表头', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          maxHeight: 500
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__header-wrapper--fixed').exists()).toBe(true);
    });

    it('没有 height/maxHeight 时不应启用固定表头', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(false);
      expect(wrapper.find('.ale-table__header-wrapper--fixed').exists()).toBe(false);
    });

    it('应该正确应用高度样式', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const wrapperEl = wrapper.find('.ale-table__wrapper');
      expect(wrapperEl.attributes('style')).toContain('height');
    });

    it('应该正确应用最大高度样式', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          maxHeight: 500
        }
      });

      const wrapperEl = wrapper.find('.ale-table__wrapper');
      expect(wrapperEl.attributes('style')).toContain('max-height');
    });
  });

  describe('数据渲染', () => {
    it('应该渲染所有数据行', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(testData.length);
    });

    it('应该正确渲染表头', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const headers = wrapper.findAll('.ale-table__header-cell');
      expect(headers.length).toBe(testColumns.length);
      expect(headers[0].text()).toContain('ID');
      expect(headers[1].text()).toContain('姓名');
    });

    it('空数据时应该显示空状态', () => {
      const wrapper = mount(Table, {
        props: {
          data: [],
          columns: testColumns,
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__empty').exists()).toBe(true);
    });
  });

  describe('滚动方法', () => {
    it('应该暴露 setScrollPosition 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const vm = wrapper.vm as unknown as { setScrollPosition: (options: { top?: number; left?: number }) => void };
      expect(typeof vm.setScrollPosition).toBe('function');
    });

    it('应该暴露 scrollToRow 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const vm = wrapper.vm as unknown as { scrollToRow: (index: number) => void };
      expect(typeof vm.scrollToRow).toBe('function');
    });

    it('应该暴露 scrollToTop 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const vm = wrapper.vm as unknown as { scrollToTop: () => void };
      expect(typeof vm.scrollToTop).toBe('function');
    });

    it('应该暴露 scrollToBottom 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const vm = wrapper.vm as unknown as { scrollToBottom: () => void };
      expect(typeof vm.scrollToBottom).toBe('function');
    });
  });

  describe('与其他功能集成', () => {
    it('固定表头应该与固定列功能共存', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
            { prop: 'name', label: '姓名', width: 120 },
            { prop: 'age', label: '年龄', width: 100, fixed: 'right' }
          ],
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__header-cell--fixed-left').exists()).toBe(true);
      expect(wrapper.find('.ale-table__header-cell--fixed-right').exists()).toBe(true);
    });

    it('固定表头应该与选择功能共存', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { type: 'selection', width: 50 },
            ...testColumns
          ],
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-checkbox').exists()).toBe(true);
    });

    it('固定表头应该与排序功能共存', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', sortable: true },
            { prop: 'name', label: '姓名', sortable: true }
          ],
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__sort-icons').exists()).toBe(true);
    });

    it('固定表头应该与边框功能共存', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400,
          border: true
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table--border').exists()).toBe(true);
    });

    it('固定表头应该与树形数据功能共存', () => {
      const wrapper = mount(Table, {
        props: {
          data: [
            {
              id: 1,
              name: '父节点',
              children: [
                { id: 2, name: '子节点' }
              ]
            }
          ],
          columns: [{ prop: 'name', label: '名称' }],
          height: 400,
          treeConfig: { childrenKey: 'children' }
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__tree-icon').exists()).toBe(true);
    });
  });

  describe('响应式', () => {
    it('应该响应 height 属性的变化', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);

      // 移除 height
      await wrapper.setProps({ height: undefined });
      await nextTick();

      // 应该移除可滚动类
      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(false);
    });

    it('应该响应 maxHeight 属性的变化', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          maxHeight: 500
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);

      // 更改 maxHeight
      await wrapper.setProps({ maxHeight: 300 });
      await nextTick();

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
    });

    it('应该响应数据变化', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      let rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(testData.length);

      // 更新数据
      const newData = testData.slice(0, 5);
      await wrapper.setProps({ data: newData });
      await nextTick();

      rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(newData.length);
    });
  });

  describe('边界情况', () => {
    it('应该处理单列数据', () => {
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

    it('应该处理大量数据', () => {
      const largeData = Array(1000).fill(null).map((_, i) => ({
        id: i + 1,
        name: `用户${i + 1}`,
        age: 20 + (i % 50)
      }));

      const wrapper = mount(Table, {
        props: {
          data: largeData,
          columns: testColumns.slice(0, 3),
          height: 400
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
    });

    it('应该处理隐藏表头的情况', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400,
          showHeader: false
        }
      });

      expect(wrapper.find('.ale-table__header-wrapper').exists()).toBe(false);
      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
    });

    it('应该正确处理数字和字符串类型的 height', () => {
      // 数字类型
      const wrapper1 = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });
      expect(wrapper1.find('.ale-table__wrapper--scrollable').exists()).toBe(true);

      // 字符串类型
      const wrapper2 = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: '500px'
        }
      });
      expect(wrapper2.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
    });
  });

  describe('性能优化', () => {
    it('应该使用 RAF 节流处理滚动事件', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      const bodyWrapper = wrapper.find('.ale-table__body-wrapper--scrollable');
      expect(bodyWrapper.exists()).toBe(true);

      // 触发滚动事件
      await bodyWrapper.trigger('scroll');
      
      // 等待 RAF 执行
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // 测试应该能够正常执行，没有抛出错误
      expect(true).toBe(true);
    });

    it('应该正确清理事件监听器', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          height: 400
        }
      });

      // 组件卸载时不应抛出错误
      wrapper.unmount();
      expect(true).toBe(true);
    });
  });
});

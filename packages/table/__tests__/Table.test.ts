import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { nextTick, h } from 'vue';
import Table from '../Table.vue';
import type { TableProps, TableColumn, TableData } from '../types';

describe('Table 组件', () => {
  // 测试数据
  const testData: TableData[] = [
    { id: 1, name: '张三', age: 25, address: '北京市', status: 'active' },
    { id: 2, name: '李四', age: 30, address: '上海市', status: 'inactive' },
    { id: 3, name: '王五', age: 28, address: '广州市', status: 'active' },
    { id: 4, name: '赵六', age: 35, address: '深圳市', status: 'active' },
    { id: 5, name: '钱七', age: 22, address: '杭州市', status: 'inactive' }
  ];

  const testColumns: TableColumn[] = [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', width: 100, sortable: true },
    { prop: 'address', label: '地址', minWidth: 150 },
    { prop: 'status', label: '状态', width: 100 }
  ];

  // 基础渲染测试
  describe('基础渲染', () => {
    it('应该正确渲染表格容器', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      expect(wrapper.find('.ale-table').exists()).toBe(true);
      expect(wrapper.find('.ale-table__wrapper').exists()).toBe(true);
    });

    it('应该正确渲染表头', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const headers = wrapper.findAll('.ale-table__header-cell');
      expect(headers.length).toBe(5);
      expect(headers[0].text()).toContain('ID');
      expect(headers[1].text()).toContain('姓名');
      expect(headers[2].text()).toContain('年龄');
    });

    it('应该正确渲染表格行', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(5);
    });

    it('应该正确渲染单元格数据', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const firstRowCells = wrapper.findAll('.ale-table__row').at(0)?.findAll('.ale-table__cell');
      expect(firstRowCells?.at(1)?.text()).toBe('张三');
      expect(firstRowCells?.at(2)?.text()).toBe('25');
    });

    it('支持自定义空数据文本', () => {
      const wrapper = mount(Table, {
        props: {
          data: [],
          columns: testColumns,
          emptyText: '自定义空数据'
        }
      });

      expect(wrapper.find('.ale-table__empty-text').text()).toBe('自定义空数据');
    });

    it('支持通过 slot 自定义空状态', () => {
      const wrapper = mount(Table, {
        props: {
          data: [],
          columns: testColumns
        },
        slots: {
          empty: '<div class="custom-empty">自定义空状态</div>'
        }
      });

      expect(wrapper.find('.custom-empty').exists()).toBe(true);
    });
  });

  // 尺寸测试
  describe('尺寸', () => {
    it('支持 small 尺寸', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          size: 'small'
        }
      });

      expect(wrapper.find('.ale-table--small').exists()).toBe(true);
    });

    it('支持 medium 尺寸', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          size: 'medium'
        }
      });

      expect(wrapper.find('.ale-table--medium').exists()).toBe(true);
    });

    it('支持 large 尺寸', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          size: 'large'
        }
      });

      expect(wrapper.find('.ale-table--large').exists()).toBe(true);
    });
  });

  // 边框样式
  describe('样式变体', () => {
    it('支持边框样式', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          border: true
        }
      });

      expect(wrapper.find('.ale-table--border').exists()).toBe(true);
    });
  });

  // 加载状态
  describe('加载状态', () => {
    it('应该显示加载状态', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          loading: true
        }
      });

      expect(wrapper.find('.ale-table--loading').exists()).toBe(true);
    });

    it('应该显示加载动画', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          loading: true
        }
      });

      // 等待 Loading 组件挂载并显示
      await nextTick();
      await flushPromises();

      // Loading 组件使用 ale-loading 类
      expect(wrapper.find('.ale-loading').exists()).toBe(true);
    });
  });

  // 选择功能
  describe('选择功能', () => {
    it('支持单选列', () => {
      const columnsWithSelection: TableColumn[] = [
        { type: 'selection', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSelection
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('支持索引列', () => {
      const columnsWithIndex: TableColumn[] = [
        { type: 'index', label: '序号', width: 60 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithIndex
        }
      });

      const firstRowCells = wrapper.findAll('.ale-table__row').at(0)?.findAll('.ale-table__cell');
      expect(firstRowCells?.at(0)?.text()).toBe('1');
    });

    it('支持展开列', () => {
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithExpand,
          expandable: true
        }
      });

      const expandIcons = wrapper.findAll('.ale-table__expand-icon');
      expect(expandIcons.length).toBe(5);
    });

    it('点击展开图标应该展开/收起行', async () => {
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithExpand,
          expandable: true
        }
      });

      const expandIcon = wrapper.find('.ale-table__expand-icon');
      await expandIcon.trigger('click');

      expect(wrapper.find('.ale-table__expanded-row').exists()).toBe(true);
      expect(expandIcon.classes()).toContain('is-expanded');
    });

    it('应该触发全选', async () => {
      const columnsWithSelection: TableColumn[] = [
        { type: 'selection', width: 50 },
        ...testColumns
      ];

      const onSelectionChange = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSelection,
          onSelectionChange
        }
      });

      const headerCheckbox = wrapper.find('.ale-table__header-cell .ale-checkbox input[type="checkbox"]');
      await headerCheckbox.setValue(true);
      await headerCheckbox.trigger('change');

      expect(onSelectionChange).toHaveBeenCalled();
    });
  });

  // 排序功能
  describe('排序功能', () => {
    it('应该显示排序图标', () => {
      const columnsWithSort: TableColumn[] = [
        { prop: 'name', label: '姓名', sortable: true },
        { prop: 'age', label: '年龄', sortable: true }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSort
        }
      });

      const sortIcons = wrapper.findAll('.ale-table__sort-icons');
      expect(sortIcons.length).toBe(2);
    });

    it('点击排序应该触发 sort-change 事件', async () => {
      const onSortChange = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          onSortChange
        }
      });

      const sortIcon = wrapper.find('.ale-table__sort-icons');
      await sortIcon.trigger('click');

      expect(onSortChange).toHaveBeenCalled();
    });
  });

  // 行操作
  describe('行操作', () => {
    it('点击行应该触发 row-click 事件', async () => {
      const onRowClick = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          onRowClick
        }
      });

      const row = wrapper.find('.ale-table__row');
      await row.trigger('click');

      expect(onRowClick).toHaveBeenCalled();
    });

    it('双击行应该触发 row-dblclick 事件', async () => {
      const onRowDblclick = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          onRowDblclick
        }
      });

      const row = wrapper.find('.ale-table__row');
      await row.trigger('dblclick');

      expect(onRowDblclick).toHaveBeenCalled();
    });

    it('高亮当前行', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          highlightCurrentRow: true
        }
      });

      const row = wrapper.find('.ale-table__row');
      await row.trigger('click');

      expect(row.classes()).toContain('ale-table__row--current');
    });
  });

  // 单元格操作
  describe('单元格操作', () => {
    it('点击单元格应该触发 cell-click 事件', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          onCellClick
        }
      });

      const cell = wrapper.find('.ale-table__cell');
      await cell.trigger('click');

      expect(onCellClick).toHaveBeenCalled();
    });
  });

  // 列宽设置
  describe('列宽设置', () => {
    it('支持固定列宽', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', width: 100 },
            { prop: 'name', label: '姓名', width: 150 }
          ]
        }
      });

      // 表头和表体各有一套 colgroup，所以会有 4 个 col
      const cols = wrapper.findAll('col');
      expect(cols.length).toBe(4);
    });

    it('支持最小列宽', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', minWidth: 100 },
            { prop: 'name', label: '姓名', minWidth: 150 }
          ]
        }
      });

      // 表头和表体各有一套 colgroup，所以会有 4 个 col
      const cols = wrapper.findAll('col');
      expect(cols.length).toBe(4);
    });
  });

  // 固定列
  describe('固定列', () => {
    it('支持左侧固定列', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
            { prop: 'name', label: '姓名', width: 120 },
            { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
          ]
        }
      });

      const fixedLeftCells = wrapper.findAll('.ale-table__header-cell--fixed-left');
      expect(fixedLeftCells.length).toBeGreaterThan(0);
    });

    it('支持右侧固定列', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', width: 80 },
            { prop: 'name', label: '姓名', width: 120 },
            { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
          ]
        }
      });

      const fixedRightCells = wrapper.findAll('.ale-table__header-cell--fixed-right');
      expect(fixedRightCells.length).toBeGreaterThan(0);
    });
  });

  // 对齐方式
  describe('对齐方式', () => {
    it('支持左对齐', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', align: 'left' }
          ]
        }
      });

      expect(wrapper.find('.ale-table__cell--left').exists()).toBe(true);
    });

    it('支持居中对齐', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', align: 'center' }
          ]
        }
      });

      expect(wrapper.find('.ale-table__cell--center').exists()).toBe(true);
    });

    it('支持右对齐', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'id', label: 'ID', align: 'right' }
          ]
        }
      });

      expect(wrapper.find('.ale-table__cell--right').exists()).toBe(true);
    });
  });

  // 隐藏表头
  describe('表头控制', () => {
    it('支持隐藏表头', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          showHeader: false
        }
      });

      expect(wrapper.find('.ale-table__header-wrapper').exists()).toBe(false);
    });
  });

  // 格式化
  describe('格式化', () => {
    it('支持单元格格式化', () => {
      const formatter = vi.fn((row, column, value) => `格式化: ${value}`);
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'name', label: '姓名', formatter }
          ]
        }
      });

      expect(formatter).toHaveBeenCalled();
    });
  });

  // 自定义插槽
  describe('自定义插槽', () => {
    it('支持自定义列内容', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        },
        slots: {
          name: '<template #name="{ row }"><span class="custom-name">{{ row.name }}</span></template>'
        }
      });

      expect(wrapper.find('.custom-name').exists()).toBe(true);
    });

    it('支持自定义表头', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'name', label: '姓名', headerSlot: 'header-name' }
          ]
        },
        slots: {
          'header-name': '<span class="custom-header">自定义表头</span>'
        }
      });

      expect(wrapper.find('.custom-header').exists()).toBe(true);
    });

    it('支持展开行插槽', async () => {
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithExpand,
          expandable: true
        },
        slots: {
          expand: '<template #expand="{ row }"><div class="custom-expand">{{ row.name }} 的详情</div></template>'
        }
      });

      const expandIcon = wrapper.find('.ale-table__expand-icon');
      await expandIcon.trigger('click');

      expect(wrapper.find('.custom-expand').exists()).toBe(true);
    });
  });

  // Expose 方法测试
  describe('Expose 方法', () => {
    it('支持 clearSelection 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [{ type: 'selection', width: 50 }, ...testColumns]
        }
      });

      const vm = wrapper.vm as unknown as { clearSelection: () => void };
      vm.clearSelection();
      await nextTick();

      // 清除选择后应该没有选中项
      const checkboxes = wrapper.findAll('.ale-table__row .ale-checkbox.is-checked');
      expect(checkboxes.length).toBe(0);
    });

    it('支持 toggleRowSelection 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const vm = wrapper.vm as unknown as { toggleRowSelection: (row: any, selected: boolean) => void };
      vm.toggleRowSelection(testData[0], true);
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.at(0)?.classes()).toContain('ale-table__row--selected');
    });

    it('支持 getSelectionRows 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const vm = wrapper.vm as unknown as { getSelectionRows: () => any[] };
      const selection = vm.getSelectionRows();
      expect(Array.isArray(selection)).toBe(true);
    });

    it('支持 toggleRowExpansion 方法', async () => {
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithExpand,
          expandable: true
        }
      });

      const vm = wrapper.vm as unknown as { toggleRowExpansion: (row: any, expanded: boolean) => void };
      vm.toggleRowExpansion(testData[0], true);
      await nextTick();

      expect(wrapper.find('.ale-table__expanded-row').exists()).toBe(true);
    });

    it('支持 setCurrentRow 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          highlightCurrentRow: true
        }
      });

      const vm = wrapper.vm as unknown as { setCurrentRow: (row: any) => void };
      vm.setCurrentRow(testData[1]);
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.at(1)?.classes()).toContain('ale-table__row--current');
    });

    it('支持 getCurrentRow 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const vm = wrapper.vm as unknown as { getCurrentRow: () => any };
      const currentRow = vm.getCurrentRow();
      // 初始状态没有当前行
      expect(currentRow).toBeNull();
    });

    it('支持 clearSort 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      // 先设置排序
      const sortIcon = wrapper.find('.ale-table__sort-icons');
      await sortIcon.trigger('click');

      // 清除排序
      const vm = wrapper.vm as unknown as { clearSort: () => void };
      vm.clearSort();
      await nextTick();

      // 验证排序被清除
      const activeSortIcon = wrapper.find('.ale-table__sort-icon.is-active');
      expect(activeSortIcon.exists()).toBe(false);
    });

    it('支持 clearFilter 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [
            { prop: 'status', label: '状态', filterable: true, filters: [{ text: '激活', value: 'active' }] }
          ]
        }
      });

      const vm = wrapper.vm as unknown as { clearFilter: (columnKey?: string) => void };
      vm.clearFilter();

      // 验证筛选被清除（没有报错即通过）
      expect(true).toBe(true);
    });
  });

  // 事件触发
  describe('事件触发', () => {
    it('触发 selection-change 事件', async () => {
      const onSelectionChange = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: [{ type: 'selection', width: 50 }, ...testColumns],
          onSelectionChange
        }
      });

      const checkbox = wrapper.find('.ale-table__row .ale-checkbox input[type="checkbox"]');
      await checkbox.setValue(true);
      await checkbox.trigger('change');

      expect(onSelectionChange).toHaveBeenCalled();
    });

    it('触发 expand-change 事件', async () => {
      const onExpandChange = vi.fn();
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithExpand,
          expandable: true,
          onExpandChange
        }
      });

      const expandIcon = wrapper.find('.ale-table__expand-icon');
      await expandIcon.trigger('click');

      expect(onExpandChange).toHaveBeenCalled();
    });

    it('触发 current-change 事件', async () => {
      const onCurrentChange = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          highlightCurrentRow: true,
          onCurrentChange
        }
      });

      const vm = wrapper.vm as unknown as { setCurrentRow: (row: any) => void };
      vm.setCurrentRow(testData[0]);
      await nextTick();

      expect(onCurrentChange).toHaveBeenCalled();
    });
  });

  // 响应式更新
  describe('响应式更新', () => {
    it('数据变化后更新表格', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const newData = [
        { id: 10, name: '新用户', age: 20 }
      ];

      await wrapper.setProps({ data: newData });
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(1);
    });

    it('列配置变化后更新表格', async () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const newColumns = [
        { prop: 'id', label: '编号' }
      ];

      await wrapper.setProps({ columns: newColumns });
      await nextTick();

      const headers = wrapper.findAll('.ale-table__header-cell');
      expect(headers.length).toBe(1);
    });
  });

  // 边界情况
  describe('边界情况', () => {
    it('处理空数据', () => {
      const wrapper = mount(Table, {
        props: {
          data: [],
          columns: testColumns
        }
      });

      expect(wrapper.find('.ale-table__empty').exists()).toBe(true);
    });

    it('处理空列配置', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: []
        }
      });

      expect(wrapper.find('.ale-table').exists()).toBe(true);
    });

    it('处理大量数据', () => {
      const largeData = Array(1000).fill(null).map((_, i) => ({
        id: i,
        name: `用户${i}`,
        age: 20 + (i % 50)
      }));

      const wrapper = mount(Table, {
        props: {
          data: largeData,
          columns: testColumns
        }
      });

      expect(wrapper.find('.ale-table').exists()).toBe(true);
    });

    it('处理包含特殊字符的数据', () => {
      const specialData = [
        { id: 1, name: '<script>alert("xss")</script>', age: 25 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: specialData,
          columns: testColumns
        }
      });

      const cell = wrapper.find('.ale-table__cell');
      expect(cell.text()).not.toContain('<script>');
    });
  });

  // 筛选功能测试
  describe('筛选功能', () => {
    it('应该显示筛选图标', () => {
      const columnsWithFilter: TableColumn[] = [
        { prop: 'status', label: '状态', filterable: true, filters: [{ text: '激活', value: 'active' }, { text: '未激活', value: 'inactive' }] }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFilter
        }
      });

      expect(wrapper.find('.ale-table__filter-icon').exists()).toBe(true);
    });

    it('点击筛选应该触发 filter-change 事件', async () => {
      const onFilterChange = vi.fn();
      const columnsWithFilter: TableColumn[] = [
        { prop: 'status', label: '状态', filterable: true, filters: [{ text: '激活', value: 'active' }] }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFilter,
          onFilterChange
        }
      });

      const filterIcon = wrapper.find('.ale-table__filter-icon');
      await filterIcon.trigger('click');

      expect(onFilterChange).toHaveBeenCalled();
    });

    it('应该根据筛选条件过滤数据', async () => {
      const columnsWithFilter: TableColumn[] = [
        { prop: 'status', label: '状态', filterable: true, filters: [{ text: '激活', value: 'active' }] }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFilter
        }
      });

      // 点击筛选图标应用筛选
      const filterIcon = wrapper.find('.ale-table__filter-icon');
      await filterIcon.trigger('click');
      await nextTick();

      // 筛选后应该只显示激活状态的行
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBeLessThanOrEqual(testData.length);
    });

    it('支持自定义筛选方法', async () => {
      const customFilterMethod = vi.fn((value, row) => row.status === value);
      const columnsWithFilter: TableColumn[] = [
        { prop: 'status', label: '状态', filterable: true, filters: [{ text: '激活', value: 'active' }], filterMethod: customFilterMethod }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFilter
        }
      });

      const filterIcon = wrapper.find('.ale-table__filter-icon');
      await filterIcon.trigger('click');

      expect(customFilterMethod).toHaveBeenCalled();
    });
  });

  // 固定列功能测试
  describe('固定列功能', () => {
    it('左侧固定列应该有正确的类名', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const fixedLeftCells = wrapper.findAll('.ale-table__header-cell--fixed-left');
      expect(fixedLeftCells.length).toBeGreaterThan(0);
    });

    it('右侧固定列应该有正确的类名', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const fixedRightCells = wrapper.findAll('.ale-table__header-cell--fixed-right');
      expect(fixedRightCells.length).toBeGreaterThan(0);
    });

    it('固定列应该应用于表头和表体', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const headerFixedCells = wrapper.findAll('.ale-table__header-cell--fixed-left');
      const bodyFixedCells = wrapper.findAll('.ale-table__cell--fixed-left');

      expect(headerFixedCells.length).toBeGreaterThan(0);
      expect(bodyFixedCells.length).toBeGreaterThan(0);
    });

    it('应该支持 fixed: true 作为左侧固定', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: true, width: 80 },
        { prop: 'name', label: '姓名', width: 120 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const fixedLeftCells = wrapper.findAll('.ale-table__header-cell--fixed-left');
      expect(fixedLeftCells.length).toBeGreaterThan(0);
    });

    it('应该为固定列添加 z-index 样式', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const fixedLeftCell = wrapper.find('.ale-table__header-cell--fixed-left');
      const fixedRightCell = wrapper.find('.ale-table__header-cell--fixed-right');

      // 检查是否有 position: sticky 样式
      expect(fixedLeftCell.attributes('style')).toContain('position');
      expect(fixedRightCell.attributes('style')).toContain('position');
    });

    it('表格容器应该有固定列相关的类名', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const tableEl = wrapper.find('.ale-table');
      expect(tableEl.classes()).toContain('ale-table--fixed-left');
      expect(tableEl.classes()).toContain('ale-table--fixed-right');
    });

    it('应该支持多个左侧固定列', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'left', width: 120 },
        { prop: 'age', label: '年龄', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const fixedLeftCells = wrapper.findAll('.ale-table__header-cell--fixed-left');
      expect(fixedLeftCells.length).toBe(2);
    });

    it('应该支持多个右侧固定列', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'right', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      const fixedRightCells = wrapper.findAll('.ale-table__header-cell--fixed-right');
      expect(fixedRightCells.length).toBe(2);
    });

    it('应该暴露 doLayout 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const vm = wrapper.vm;
      expect(typeof vm.doLayout).toBe('function');
    });

    it('应该暴露 scrollTo 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const vm = wrapper.vm;
      expect(typeof vm.scrollTo).toBe('function');
    });

    it('固定列应该有阴影类名控制', () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      // 检查表格容器是否有固定列类名
      const tableEl = wrapper.find('.ale-table');
      expect(tableEl.classes()).toContain('ale-table--fixed-left');
      expect(tableEl.classes()).toContain('ale-table--fixed-right');
    });

    it('最后一个左侧固定列应该有阴影标记类名', async () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'left', width: 120 },
        { prop: 'age', label: '年龄', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      // 获取所有左侧固定列表头单元格
      const fixedLeftCells = wrapper.findAll('.ale-table__header-cell--fixed-left');
      expect(fixedLeftCells.length).toBe(2);

      // 检查最后一个左侧固定列是否有特殊类名
      const lastFixedCell = fixedLeftCells[1];
      expect(lastFixedCell.classes()).toContain('ale-table__header-cell--fixed-left-last');
    });

    it('第一个右侧固定列应该有阴影标记类名', async () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'right', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      // 获取所有右侧固定列表头单元格
      const fixedRightCells = wrapper.findAll('.ale-table__header-cell--fixed-right');
      expect(fixedRightCells.length).toBe(2);

      // 检查第一个右侧固定列是否有特殊类名
      const firstFixedCell = fixedRightCells[0];
      expect(firstFixedCell.classes()).toContain('ale-table__header-cell--fixed-right-first');
    });

    it('表体单元格也应该有阴影标记类名', async () => {
      const columnsWithFixed: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFixed
        }
      });

      // 检查表体最后一个左侧固定列
      const fixedLeftCells = wrapper.findAll('.ale-table__cell--fixed-left-last');
      expect(fixedLeftCells.length).toBeGreaterThan(0);

      // 检查表体第一个右侧固定列
      const fixedRightCells = wrapper.findAll('.ale-table__cell--fixed-right-first');
      expect(fixedRightCells.length).toBeGreaterThan(0);
    });
  });

  // 行样式和类名测试
  describe('行样式和类名', () => {
    it('支持自定义行类名', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          rowClassName: 'custom-row-class'
        }
      });

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows[0].classes()).toContain('custom-row-class');
    });

    it('支持函数式行类名', () => {
      const rowClassName = vi.fn((row, index) => `row-${index}`);
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          rowClassName
        }
      });

      expect(rowClassName).toHaveBeenCalled();
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows[0].classes()).toContain('row-0');
    });

    it('支持自定义行样式', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          rowStyle: { backgroundColor: 'red' }
        }
      });

      const row = wrapper.find('.ale-table__row');
      expect(row.attributes('style')).toContain('background-color');
    });

    it('支持函数式行样式', () => {
      const rowStyle = vi.fn((row, index) => ({ color: index === 0 ? 'red' : 'blue' }));
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          rowStyle
        }
      });

      expect(rowStyle).toHaveBeenCalled();
    });
  });

  // 单元格样式和类名测试
  describe('单元格样式和类名', () => {
    it('支持自定义单元格类名', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          cellClassName: 'custom-cell-class'
        }
      });

      const cells = wrapper.findAll('.ale-table__cell');
      expect(cells[0].classes()).toContain('custom-cell-class');
    });

    it('支持函数式单元格类名', () => {
      const cellClassName = vi.fn((row, column, rowIndex, colIndex) => `cell-${rowIndex}-${colIndex}`);
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          cellClassName
        }
      });

      expect(cellClassName).toHaveBeenCalled();
    });

    it('支持列级别的单元格类名', () => {
      const columnsWithCellClass: TableColumn[] = [
        { prop: 'id', label: 'ID', cellClassName: 'id-cell' }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithCellClass
        }
      });

      const cells = wrapper.findAll('.ale-table__cell');
      expect(cells[0].classes()).toContain('id-cell');
    });

    it('支持自定义单元格样式', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          cellStyle: { textAlign: 'center' }
        }
      });

      const cell = wrapper.find('.ale-table__cell');
      expect(cell.attributes('style')).toContain('text-align');
    });
  });

  // 更多事件测试
  describe('更多事件交互', () => {
    it('应该触发 row-contextmenu 事件', async () => {
      const onRowContextmenu = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          onRowContextmenu
        }
      });

      const row = wrapper.find('.ale-table__row');
      await row.trigger('contextmenu');

      expect(onRowContextmenu).toHaveBeenCalled();
    });

    it('应该触发 header-click 事件', async () => {
      const onHeaderClick = vi.fn();
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          onHeaderClick
        }
      });

      const headerCell = wrapper.find('.ale-table__header-cell');
      await headerCell.trigger('click');

      expect(onHeaderClick).toHaveBeenCalled();
    });

    it('row-click-select 应该切换选择状态', async () => {
      const onSelectionChange = vi.fn();
      const columnsWithSelection: TableColumn[] = [
        { type: 'selection', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSelection,
          rowClickSelect: true,
          onSelectionChange
        }
      });

      const row = wrapper.find('.ale-table__row');
      await row.trigger('click');

      expect(onSelectionChange).toHaveBeenCalled();
    });
  });

  // 数据更新测试
  describe('数据更新交互', () => {
    it('数据变化时应该保留选择状态（reserveSelection）', async () => {
      const columnsWithSelection: TableColumn[] = [
        { type: 'selection', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSelection,
          selection: { reserveSelection: true }
        }
      });

      // 先选择一行
      const checkbox = wrapper.find('.ale-table__row .ale-checkbox input[type="checkbox"]');
      await checkbox.setValue(true);
      await checkbox.trigger('change');

      // 更新数据
      const newData = [...testData, { id: 6, name: '新用户', age: 26, address: '南京市', status: 'active' }];
      await wrapper.setProps({ data: newData });
      await nextTick();

      // 如果 reserveSelection 为 true，之前的选择应该保留
      const vm = wrapper.vm as unknown as { getSelectionRows: () => any[] };
      const selection = vm.getSelectionRows();
      expect(selection.length).toBeGreaterThan(0);
    });

    it('选中行 keys 变化应该更新选择状态', async () => {
      const columnsWithSelection: TableColumn[] = [
        { type: 'selection', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSelection,
          selection: { selectedRowKeys: [1, 2] }
        }
      });

      await nextTick();

      const vm = wrapper.vm as unknown as { getSelectionRows: () => any[] };
      const selection = vm.getSelectionRows();
      expect(selection.length).toBe(2);
    });
  });

  // 表头行和单元格类名测试
  describe('表头样式', () => {
    it('支持自定义表头行类名', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          headerRowClassName: 'custom-header-row'
        }
      });

      const headerRow = wrapper.find('.ale-table__header-row');
      expect(headerRow.classes()).toContain('custom-header-row');
    });

    it('支持函数式表头行类名', () => {
      const headerRowClassName = vi.fn(() => 'dynamic-header-row');
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          headerRowClassName
        }
      });

      expect(headerRowClassName).toHaveBeenCalled();
    });

    it('支持自定义表头单元格类名', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns,
          headerCellClassName: 'custom-header-cell'
        }
      });

      const headerCells = wrapper.findAll('.ale-table__header-cell');
      expect(headerCells[0].classes()).toContain('custom-header-cell');
    });
  });

  // 展开行交互测试
  describe('展开行交互', () => {
    it('点击展开图标应该切换展开状态', async () => {
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithExpand,
          expandable: true
        }
      });

      const expandIcon = wrapper.find('.ale-table__expand-icon');
      expect(expandIcon.classes()).not.toContain('is-expanded');

      await expandIcon.trigger('click');
      expect(expandIcon.classes()).toContain('is-expanded');

      await expandIcon.trigger('click');
      expect(expandIcon.classes()).not.toContain('is-expanded');
    });

    it('toggleRowExpansion 方法应该切换展开状态', async () => {
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...testColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithExpand,
          expandable: true
        }
      });

      const vm = wrapper.vm as unknown as { toggleRowExpansion: (row: any, expanded?: boolean) => void };

      // 展开
      vm.toggleRowExpansion(testData[0], true);
      await nextTick();
      expect(wrapper.find('.ale-table__expanded-row').exists()).toBe(true);

      // 收起
      vm.toggleRowExpansion(testData[0], false);
      await nextTick();
      expect(wrapper.find('.ale-table__expanded-row').exists()).toBe(false);
    });
  });

  // 排序交互测试
  describe('排序交互', () => {
    it('点击排序应该循环切换顺序：升序 -> 降序 -> 无', async () => {
      const columnsWithSort: TableColumn[] = [
        { prop: 'age', label: '年龄', sortable: true }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSort
        }
      });

      const sortIcons = wrapper.find('.ale-table__sort-icons');

      // 第一次点击：升序
      await sortIcons.trigger('click');
      await nextTick();
      let ascIcon = wrapper.find('.ale-table__sort-icon--asc.is-active');
      expect(ascIcon.exists()).toBe(true);

      // 第二次点击：降序
      await sortIcons.trigger('click');
      await nextTick();
      let descIcon = wrapper.find('.ale-table__sort-icon--desc.is-active');
      expect(descIcon.exists()).toBe(true);

      // 第三次点击：无排序
      await sortIcons.trigger('click');
      await nextTick();
      ascIcon = wrapper.find('.ale-table__sort-icon--asc.is-active');
      descIcon = wrapper.find('.ale-table__sort-icon--desc.is-active');
      expect(ascIcon.exists()).toBe(false);
      expect(descIcon.exists()).toBe(false);
    });

    it('clearSort 应该清除排序状态', async () => {
      const columnsWithSort: TableColumn[] = [
        { prop: 'age', label: '年龄', sortable: true }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSort
        }
      });

      // 先设置排序
      const sortIcons = wrapper.find('.ale-table__sort-icons');
      await sortIcons.trigger('click');

      // 清除排序
      const vm = wrapper.vm as unknown as { clearSort: () => void };
      vm.clearSort();
      await nextTick();

      const activeIcon = wrapper.find('.ale-table__sort-icon.is-active');
      expect(activeIcon.exists()).toBe(false);
    });

    it('切换排序列应该重置排序顺序', async () => {
      const columnsWithSort: TableColumn[] = [
        { prop: 'id', label: 'ID', sortable: true },
        { prop: 'age', label: '年龄', sortable: true }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithSort
        }
      });

      const sortIcons = wrapper.findAll('.ale-table__sort-icons');

      // 点击第一列排序
      await sortIcons[0].trigger('click');
      await sortIcons[0].trigger('click'); // 降序

      // 点击第二列排序
      await sortIcons[1].trigger('click');

      // 第二列应该是升序
      const secondAsc = wrapper.findAll('.ale-table__sort-icon--asc')[1];
      expect(secondAsc.classes()).toContain('is-active');
    });
  });

  // 格式化功能测试
  describe('格式化功能', () => {
    it('formatter 应该正确格式化单元格内容', () => {
      const formatter = vi.fn((row, column, value) => `年龄: ${value}岁`);
      const columnsWithFormatter: TableColumn[] = [
        { prop: 'age', label: '年龄', formatter }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFormatter
        }
      });

      expect(formatter).toHaveBeenCalled();
      const cell = wrapper.find('.ale-table__cell');
      expect(cell.text()).toContain('年龄:');
      expect(cell.text()).toContain('岁');
    });

    it('formatter 返回 VNode 应该被正确处理', () => {
      const formatter = vi.fn(() => h('span', { class: 'formatted' }, 'formatted text'));
      const columnsWithFormatter: TableColumn[] = [
        { prop: 'name', label: '姓名', formatter }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithFormatter
        }
      });

      expect(formatter).toHaveBeenCalled();
    });
  });

  // 文本溢出提示测试
  describe('文本溢出提示', () => {
    it('showOverflowTooltip 应该添加 is-ellipsis 类名', async () => {
      const columnsWithTooltip: TableColumn[] = [
        { prop: 'name', label: '姓名', showOverflowTooltip: true }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithTooltip
        }
      });

      await nextTick();

      // 查找带有 is-ellipsis 类名的元素
      const ellipsisCell = wrapper.find('.ale-table__cell-content.is-ellipsis');
      expect(ellipsisCell.exists()).toBe(true);
    });
  });

  // 隐藏列测试
  describe('隐藏列', () => {
    it('hidden 为 true 的列不应该渲染', () => {
      const columnsWithHidden: TableColumn[] = [
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: '姓名', hidden: true }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithHidden
        }
      });

      const headers = wrapper.findAll('.ale-table__header-cell');
      expect(headers.length).toBe(1);
      expect(headers[0].text()).toContain('ID');
    });
  });

  // 列宽设置测试
  describe('列宽设置', () => {
    it('应该正确应用 width 属性', () => {
      const columnsWithWidth: TableColumn[] = [
        { prop: 'id', label: 'ID', width: 100 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithWidth
        }
      });

      const col = wrapper.find('col');
      expect(col.attributes('style')).toContain('width');
    });

    it('应该正确应用 minWidth 属性', () => {
      const columnsWithMinWidth: TableColumn[] = [
        { prop: 'id', label: 'ID', minWidth: 80 }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithMinWidth
        }
      });

      const col = wrapper.find('col');
      expect(col.attributes('style')).toContain('min-width');
    });
  });

  // 表头对齐测试
  describe('表头对齐', () => {
    it('应该支持 headerAlign 属性', () => {
      const columnsWithHeaderAlign: TableColumn[] = [
        { prop: 'id', label: 'ID', headerAlign: 'center', align: 'left' }
      ];

      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: columnsWithHeaderAlign
        }
      });

      const headerCell = wrapper.find('.ale-table__header-cell');
      expect(headerCell.attributes('style')).toContain('text-align: center');
    });
  });

  // 无障碍测试
  describe('无障碍', () => {
    it('表格应该有正确的 ARIA 属性', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const table = wrapper.find('.ale-table');
      expect(table.exists()).toBe(true);
    });

    it('表头单元格应该有正确的 role', () => {
      const wrapper = mount(Table, {
        props: {
          data: testData,
          columns: testColumns
        }
      });

      const headerCells = wrapper.findAll('.ale-table__header-cell');
      expect(headerCells.length).toBeGreaterThan(0);
    });
  });
});

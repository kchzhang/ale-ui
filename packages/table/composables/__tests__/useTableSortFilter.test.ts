/**
 * useTableSortFilter 单元测试
 * 测试排序和筛选功能模块
 */

import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useTableSortFilter } from '../useTableSortFilter';
import type { TableColumn, TableProps, TableEmits, SortOrder } from '../../types';

describe('useTableSortFilter', () => {
  // 创建测试用的列定义
  const createColumn = (prop: string, sortable: boolean = true): TableColumn => ({
    prop,
    label: prop.toUpperCase(),
    sortable,
    filters: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' }
    ]
  });

  // 创建模拟的 props
  const createMockProps = (overrides = {}): TableProps => ({
    data: [],
    columns: [],
    ...overrides
  });

  // 创建模拟的 emit 函数
  const createMockEmit = (): TableEmits => {
    return vi.fn() as unknown as TableEmits;
  };

  describe('handleSort - 排序功能', () => {
    it('首次点击可排序列应设置为升序', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);
      const column = createColumn('name');

      handleSort(column);

      expect(sortColumn.value).toStrictEqual(column);
      expect(sortOrder.value).toBe('ascending');
      expect(emit).toHaveBeenCalledWith('sort-change', column, 'name', 'ascending');
    });

    it('再次点击同一列应从升序切换到降序', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const column = createColumn('name');
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      // 先设置为升序
      handleSort(column);
      expect(sortOrder.value).toBe('ascending');

      // 再次点击，应切换到降序
      handleSort(column);

      expect(sortColumn.value).toStrictEqual(column);
      expect(sortOrder.value).toBe('descending');
      expect(emit).toHaveBeenLastCalledWith('sort-change', column, 'name', 'descending');
    });

    it('第三次点击同一列应从降序切换到无排序', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const column = createColumn('name');
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      // 第1次：升序
      handleSort(column);
      expect(sortOrder.value).toBe('ascending');

      // 第2次：降序
      handleSort(column);
      expect(sortOrder.value).toBe('descending');

      // 第3次：无排序
      handleSort(column);

      // 关键：列应保持选中，但排序为 null
      expect(sortColumn.value).toStrictEqual(column);
      expect(sortOrder.value).toBe(null);
      expect(emit).toHaveBeenLastCalledWith('sort-change', column, 'name', null);
    });

    it('第四次点击同一列应从无排序回到升序', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const column = createColumn('name');
      const sortColumn = ref<TableColumn | null>(column);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      handleSort(column);

      expect(sortColumn.value).toStrictEqual(column);
      expect(sortOrder.value).toBe('ascending');
      expect(emit).toHaveBeenCalledWith('sort-change', column, 'name', 'ascending');
    });

    it('点击不同列应重置为新列的升序', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const columnA = createColumn('name');
      const columnB = createColumn('age');
      const sortColumn = ref<TableColumn | null>(columnA);
      const sortOrder = ref<SortOrder>('descending');
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      handleSort(columnB);

      expect(sortColumn.value).toStrictEqual(columnB);
      expect(sortOrder.value).toBe('ascending');
      expect(emit).toHaveBeenCalledWith('sort-change', columnB, 'age', 'ascending');
    });

    it('点击不可排序的列不应执行任何操作', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);
      const unsortableColumn = createColumn('id', false);

      handleSort(unsortableColumn);

      expect(sortColumn.value).toBe(null);
      expect(sortOrder.value).toBe(null);
      expect(emit).not.toHaveBeenCalled();
    });

    it('应触发 onSortChange 回调', () => {
      const onSortChange = vi.fn();
      const props = createMockProps({ onSortChange });
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);
      const column = createColumn('name');

      handleSort(column);

      expect(onSortChange).toHaveBeenCalledWith(column, 'name', 'ascending');
    });

    it('完整的排序循环：升序 -> 降序 -> 无排序 -> 升序', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      // 使用同一个 column 引用
      const column = createColumn('name');

      // 第1次：升序
      handleSort(column);
      expect(sortOrder.value).toBe('ascending');
      expect(sortColumn.value).toStrictEqual(column);

      // 第2次：降序（此时 sortColumn.value 应该等于 column）
      handleSort(column);
      expect(sortOrder.value).toBe('descending');

      // 第3次：无排序（列保持选中）
      handleSort(column);
      expect(sortOrder.value).toBe(null);
      expect(sortColumn.value).toStrictEqual(column);

      // 第4次：回到升序
      handleSort(column);
      expect(sortOrder.value).toBe('ascending');
      expect(sortColumn.value).toStrictEqual(column);
    });
  });

  describe('clearSort - 清空排序', () => {
    it('应清空排序列和排序顺序', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const column = createColumn('name');
      const sortColumn = ref<TableColumn | null>(column);
      const sortOrder = ref<SortOrder>('ascending');
      const filterState = ref<Record<string, any[]>>({});

      const { clearSort } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      clearSort();

      expect(sortColumn.value).toBe(null);
      expect(sortOrder.value).toBe(null);
    });
  });

  describe('handleFilterClick - 筛选功能', () => {
    it('首次点击应全选筛选项', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleFilterClick } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);
      const column = createColumn('status');

      handleFilterClick(column);

      expect(filterState.value['status']).toEqual(['1', '2']);
      expect(emit).toHaveBeenCalledWith('filter-change', { status: ['1', '2'] });
    });

    it('再次点击应清空筛选项', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({ status: ['1', '2'] });

      const { handleFilterClick } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);
      const column = createColumn('status');

      handleFilterClick(column);

      expect(filterState.value['status']).toEqual([]);
      expect(emit).toHaveBeenCalledWith('filter-change', { status: [] });
    });

    it('应触发 onFilterChange 回调', () => {
      const onFilterChange = vi.fn();
      const props = createMockProps({ onFilterChange });
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({});

      const { handleFilterClick } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);
      const column = createColumn('status');

      handleFilterClick(column);

      expect(onFilterChange).toHaveBeenCalledWith({ status: ['1', '2'] });
    });
  });

  describe('clearFilter - 清空筛选', () => {
    it('清空所有筛选应清空 filterState', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({ status: ['1'], type: ['a'] });

      const { clearFilter } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      clearFilter();

      expect(filterState.value).toEqual({});
    });

    it('清空指定列筛选应只删除该列', () => {
      const props = createMockProps();
      const emit = createMockEmit();
      const sortColumn = ref<TableColumn | null>(null);
      const sortOrder = ref<SortOrder>(null);
      const filterState = ref<Record<string, any[]>>({ status: ['1'], type: ['a'] });

      const { clearFilter } = useTableSortFilter(props, emit, sortColumn, sortOrder, filterState);

      clearFilter('status');

      expect(filterState.value).toEqual({ type: ['a'] });
    });
  });
});

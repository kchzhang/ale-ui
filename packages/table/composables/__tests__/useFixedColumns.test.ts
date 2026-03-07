import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { useFixedColumns } from '../useFixedColumns';
import type { TableProps, TableColumn } from '../../types';

describe('useFixedColumns', () => {
  const mockColumns: TableColumn[] = [
    { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', width: 100 },
    { prop: 'address', label: '地址', fixed: 'right', width: 150 }
  ];

  const createMockProps = (overrides = {}): TableProps => ({
    data: [],
    columns: mockColumns,
    ...overrides
  });

  describe('基础功能', () => {
    it('应该正确识别左侧固定列', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.hasFixedLeft.value).toBe(true);
      expect(result.fixedLeftColumns.value.length).toBe(1);
      expect(result.fixedLeftColumns.value[0].column.prop).toBe('id');
    });

    it('应该正确识别右侧固定列', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.hasFixedRight.value).toBe(true);
      expect(result.fixedRightColumns.value.length).toBe(1);
      expect(result.fixedRightColumns.value[0].column.prop).toBe('address');
    });

    it('应该正确计算左侧固定列位置', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.getFixedLeftPosition(0)).toBe(0);
    });

    it('应该正确计算右侧固定列位置', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.getFixedRightPosition(3)).toBe(0);
    });

    it('应该正确标记最后一个左侧固定列', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'left', width: 120 },
        { prop: 'age', label: '年龄', width: 100 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.fixedLeftColumns.value[0].isLastLeft).toBe(false);
      expect(result.fixedLeftColumns.value[1].isLastLeft).toBe(true);
    });

    it('应该正确标记第一个右侧固定列', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'right', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.fixedRightColumns.value[0].isFirstRight).toBe(true);
      expect(result.fixedRightColumns.value[1].isFirstRight).toBe(false);
    });
  });

  describe('多个固定列位置计算', () => {
    it('应该正确计算多个左侧固定列的位置', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'left', width: 120 },
        { prop: 'age', label: '年龄', width: 100 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.fixedLeftColumns.value[0].position).toBe(0);
      expect(result.fixedLeftColumns.value[1].position).toBe(80);
    });

    it('应该正确计算多个右侧固定列的位置', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'right', width: 120 },
        { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      // 右侧列位置从右向左计算
      // age 列在最右边，位置为 0
      // name 列在 age 列左边，位置为 100 (age 的宽度)
      expect(result.fixedRightColumns.value[0].position).toBe(100);
      expect(result.fixedRightColumns.value[1].position).toBe(0);
    });
  });

  describe('阴影显示逻辑', () => {
    it('初始状态应该不显示阴影', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.showLeftShadow.value).toBe(false);
      expect(result.showRightShadow.value).toBe(false);
    });

    it('应该在滚动时显示左侧阴影', async () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      Object.defineProperty(bodyEl, 'scrollLeft', { value: 50, writable: true });
      Object.defineProperty(bodyEl, 'scrollWidth', { value: 1000 });
      Object.defineProperty(bodyEl, 'clientWidth', { value: 500 });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      // 模拟滚动
      result.updateShadowState();

      expect(result.showLeftShadow.value).toBe(true);
    });

    it('应该在有滚动空间时显示右侧阴影', async () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      Object.defineProperty(bodyEl, 'scrollLeft', { value: 0, writable: true });
      Object.defineProperty(bodyEl, 'scrollWidth', { value: 1000 });
      Object.defineProperty(bodyEl, 'clientWidth', { value: 500 });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      // 模拟滚动
      result.updateShadowState();

      expect(result.showRightShadow.value).toBe(true);
    });

    it('应该在滚动到末尾时隐藏右侧阴影', async () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      Object.defineProperty(bodyEl, 'scrollLeft', { value: 498, writable: true }); // 接近末尾
      Object.defineProperty(bodyEl, 'scrollWidth', { value: 1000 });
      Object.defineProperty(bodyEl, 'clientWidth', { value: 500 });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      result.updateShadowState();

      expect(result.showRightShadow.value).toBe(false);
    });
  });

  describe('滚动同步', () => {
    it('应该提供 scrollTo 方法', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(typeof result.scrollTo).toBe('function');
    });

    it('应该提供 doLayout 方法', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(typeof result.doLayout).toBe('function');
    });

    it('应该提供 updateShadowState 方法', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(typeof result.updateShadowState).toBe('function');
    });
  });

  describe('布尔值 fixed 属性', () => {
    it('应该处理 fixed: true 作为左固定', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: true, width: 80 },
        { prop: 'name', label: '姓名', width: 120 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.hasFixedLeft.value).toBe(true);
      expect(result.fixedLeftColumns.value.length).toBe(1);
    });
  });

  describe('列宽计算', () => {
    it('应该正确处理数字类型的列宽', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 100 },
        { prop: 'name', label: '姓名', fixed: 'left', width: 150 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.fixedLeftColumns.value[1].position).toBe(100);
    });

    it('应该正确处理字符串类型的列宽', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: '100' },
        { prop: 'name', label: '姓名', fixed: 'left', width: '150px' }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.fixedLeftColumns.value[1].position).toBe(100);
    });

    it('应该对无效列宽使用默认值', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left' },
        { prop: 'name', label: '姓名', fixed: 'left', width: 'invalid' }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.fixedLeftColumns.value[1].position).toBe(100); // 默认值
    });
  });

  describe('边界情况', () => {
    it('应该处理没有固定列的情况', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', width: 80 },
        { prop: 'name', label: '姓名', width: 120 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.hasFixedColumns.value).toBe(false);
      expect(result.hasFixedLeft.value).toBe(false);
      expect(result.hasFixedRight.value).toBe(false);
    });

    it('应该处理所有列都是固定列的情况', () => {
      const columns: TableColumn[] = [
        { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
        { prop: 'name', label: '姓名', fixed: 'right', width: 120 }
      ];
      const props = createMockProps({ columns });
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.hasFixedLeft.value).toBe(true);
      expect(result.hasFixedRight.value).toBe(true);
    });

    it('应该对非固定列返回 0 位置', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));
      const tableRef = ref(document.createElement('div'));

      const result = useFixedColumns(props, bodyRef, headerRef, tableRef);

      expect(result.getFixedLeftPosition(1)).toBe(0); // 非固定列
      expect(result.getFixedRightPosition(0)).toBe(0); // 非固定列
    });
  });
});

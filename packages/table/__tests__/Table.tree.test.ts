import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import Table from '../Table.vue';
import type { TableProps, TableColumn } from '../types';

describe('Table 树形数据功能', () => {
  // 树形测试数据
  const treeData = [
    {
      id: 1,
      name: '总部',
      manager: '张总',
      children: [
        {
          id: 11,
          name: '技术部',
          manager: '李经理',
          children: [
            { id: 111, name: '前端组', manager: '王组长' },
            { id: 112, name: '后端组', manager: '刘组长' }
          ]
        },
        {
          id: 12,
          name: '市场部',
          manager: '赵经理',
          children: [
            { id: 121, name: '销售组', manager: '陈组长' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: '分公司',
      manager: '孙总',
      children: [
        { id: 21, name: '人事部', manager: '周经理' }
      ]
    }
  ];

  const treeColumns: TableColumn[] = [
    { prop: 'name', label: '部门名称', width: 200 },
    { prop: 'manager', label: '负责人', width: 150 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基础树形渲染', () => {
    it('应该正确渲染树形数据结构', () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children'
          }
        }
      });

      // 检查表格是否渲染
      expect(wrapper.find('.ale-table').exists()).toBe(true);

      // 检查树形图标是否存在
      const treeIcons = wrapper.findAll('.ale-table__tree-icon');
      expect(treeIcons.length).toBeGreaterThan(0);
    });

    it('有子节点的行应该显示展开图标', () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children'
          }
        }
      });

      // 检查是否有展开图标
      const treeIcons = wrapper.findAll('.ale-table__tree-icon');
      const firstIcon = treeIcons[0];

      // 应该有子节点（不是叶子节点）
      expect(firstIcon.classes()).not.toContain('is-leaf');
      expect(firstIcon.find('.ale-table__tree-arrow').exists()).toBe(true);
    });

    it('叶子节点应该显示占位符', async () => {
      const wrapper = mount(Table, {
        props: {
          data: [
            { id: 1, name: '父节点', children: [{ id: 2, name: '子节点' }] }
          ],
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      // 初始状态下，父节点不是叶子节点
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      expect(treeIcon.classes()).not.toContain('is-leaf');

      // 展开父节点
      await treeIcon.trigger('click');
      await nextTick();

      // 检查子节点是否是叶子节点
      const allIcons = wrapper.findAll('.ale-table__tree-icon');
      expect(allIcons.length).toBe(2);
      
      const leafIcon = allIcons[1]; // 第二个图标是子节点的
      expect(leafIcon.classes()).toContain('is-leaf');
    });
  });

  describe('展开/折叠功能', () => {
    it('点击展开图标应该展开子节点', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children'
          }
        }
      });

      // 初始状态应该有2行（顶级节点）
      let rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(2);

      // 点击展开第一个节点
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      await treeIcon.trigger('click');
      await nextTick();

      // 展开后应该有更多行
      rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBeGreaterThan(2);

      // 检查展开图标状态
      expect(treeIcon.classes()).toContain('is-expanded');
    });

    it('点击展开图标应该折叠已展开的节点', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children'
          }
        }
      });

      // 先展开
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      await treeIcon.trigger('click');
      await nextTick();

      // 再折叠
      await treeIcon.trigger('click');
      await nextTick();

      // 检查折叠后的行数
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(2);

      // 检查图标状态
      expect(treeIcon.classes()).not.toContain('is-expanded');
    });

    it('应该支持多层级的展开', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children'
          }
        }
      });

      // 展开第一级
      const firstIcon = wrapper.find('.ale-table__tree-icon');
      await firstIcon.trigger('click');
      await nextTick();

      // 获取第二级的展开图标（技术部）
      const allIcons = wrapper.findAll('.ale-table__tree-icon');
      const secondLevelIcon = allIcons[1]; // 技术部的展开图标

      if (secondLevelIcon && !secondLevelIcon.classes().includes('is-leaf')) {
        await secondLevelIcon.trigger('click');
        await nextTick();

        // 应该有更多行（包含第三级）
        const rows = wrapper.findAll('.ale-table__row');
        expect(rows.length).toBeGreaterThan(4);
      }
    });
  });

  describe('层级缩进', () => {
    it('应该有正确的层级缩进', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children'
          }
        }
      });

      // 展开第一级
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      await treeIcon.trigger('click');
      await nextTick();

      // 检查缩进样式
      const treeIcons = wrapper.findAll('.ale-table__tree-icon');
      const firstLevelIcon = treeIcons[0];
      const secondLevelIcon = treeIcons[1];

      // 第一级应该是0缩进
      expect(firstLevelIcon.attributes('style')).toContain('margin-left: 0px');

      // 第二级应该有缩进
      expect(secondLevelIcon.attributes('style')).toContain('margin-left: 20px');
    });
  });

  describe('默认展开配置', () => {
    it('支持 defaultExpandAll 配置', () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children',
            defaultExpandAll: true
          }
        }
      });

      // 应该显示所有节点
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBeGreaterThan(2);
    });

    it('支持自定义 childrenKey', async () => {
      const customTreeData = [
        {
          id: 1,
          name: '父节点',
          subItems: [{ id: 2, name: '子节点' }]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: customTreeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'subItems'
          }
        }
      });

      // 检查是否能正确识别子节点
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      expect(treeIcon.classes()).not.toContain('is-leaf');
    });
  });

  describe('树形数据与普通数据共存', () => {
    it('没有 treeConfig 时应该按普通表格处理', () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id'
          // 没有 treeConfig
        }
      });

      // 不应该显示树形图标
      const treeIcons = wrapper.findAll('.ale-table__tree-icon');
      expect(treeIcons.length).toBe(0);
    });

    it('没有 children 的行应该正常显示', () => {
      const simpleData = [
        { id: 1, name: '行1' },
        { id: 2, name: '行2' }
      ];

      const wrapper = mount(Table, {
        props: {
          data: simpleData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      // 应该显示所有行
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(2);
    });
  });

  describe('树形数据交互方法', () => {
    it('支持 expandRow 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as { expandRow: (row: any) => void };
      vm.expandRow(treeData[0]);
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBeGreaterThan(2);
    });

    it('支持 collapseRow 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as {
        expandRow: (row: any) => void;
        collapseRow: (row: any) => void;
      };

      // 先展开
      vm.expandRow(treeData[0]);
      await nextTick();

      // 再折叠
      vm.collapseRow(treeData[0]);
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(2);
    });

    it('支持 expandAll 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as { expandAll: () => void };
      vm.expandAll();
      await nextTick();

      // 应该显示所有节点
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBeGreaterThan(5);
    });

    it('支持 collapseAll 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children', defaultExpandAll: true }
        }
      });

      const vm = wrapper.vm as unknown as { collapseAll: () => void };
      vm.collapseAll();
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(2);
    });

    it('支持 toggleTreeRowExpansion 方法', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as {
        toggleTreeRowExpansion: (row: any, expanded?: boolean) => boolean;
      };

      // 切换展开状态
      const result = vm.toggleTreeRowExpansion(treeData[0]);
      expect(result).toBe(true);

      await nextTick();
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBeGreaterThan(2);
    });

    it('支持 isTreeRowExpanded 方法', () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as {
        isTreeRowExpanded: (row: any) => boolean;
        expandRow: (row: any) => void;
      };

      // 初始状态未展开
      expect(vm.isTreeRowExpanded(treeData[0])).toBe(false);

      // 展开后
      vm.expandRow(treeData[0]);
      expect(vm.isTreeRowExpanded(treeData[0])).toBe(true);
    });
  });

  describe('树形数据与其他功能集成', () => {
    it('树形数据支持选择功能', async () => {
      const columnsWithSelection: TableColumn[] = [
        { type: 'selection', width: 50 },
        ...treeColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: columnsWithSelection,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      // 检查选择框是否存在
      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('树形数据支持展开行功能', async () => {
      const columnsWithExpand: TableColumn[] = [
        { type: 'expand', width: 50 },
        ...treeColumns
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: columnsWithExpand,
          rowKey: 'id',
          expandable: true,
          treeConfig: { childrenKey: 'children' }
        }
      });

      // 应该同时有树形图标和展开图标
      const expandIcons = wrapper.findAll('.ale-table__expand-icon');
      expect(expandIcons.length).toBeGreaterThan(0);
    });
  });

  describe('响应式更新', () => {
    it('数据变化后应该重新渲染树形结构', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: treeColumns,
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      // 更新数据
      const newData = [
        {
          id: 1,
          name: '新总部',
          children: [{ id: 2, name: '新部门' }]
        }
      ];

      await wrapper.setProps({ data: newData });
      await nextTick();

      // 应该显示新的数据
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(1);
    });
  });
});

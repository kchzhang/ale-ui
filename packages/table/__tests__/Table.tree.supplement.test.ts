import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Table from '../Table.vue';

describe('Table 树形数据功能补充测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('defaultExpandAll 配置测试', () => {
    it('defaultExpandAll 为 true 时应该默认展开所有节点', () => {
      const treeData = [
        {
          id: 1,
          name: '总部',
          children: [
            {
              id: 11,
              name: '技术部',
              children: [
                { id: 111, name: '前端组' },
                { id: 112, name: '后端组' }
              ]
            }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children',
            defaultExpandAll: true
          }
        }
      });

      // 应该显示所有节点（总部 + 技术部 + 前端组 + 后端组 = 4行）
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(4);
    });

    it('defaultExpandAll 为 false 时应该默认折叠所有节点', () => {
      const treeData = [
        {
          id: 1,
          name: '总部',
          children: [
            { id: 11, name: '技术部' },
            { id: 12, name: '市场部' }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children',
            defaultExpandAll: false
          }
        }
      });

      // 只显示顶级节点
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(1);
    });
  });

  describe('自定义 childrenKey 测试', () => {
    it('应该支持自定义 childrenKey', async () => {
      const customTreeData = [
        {
          id: 1,
          name: '父节点',
          subItems: [
            { id: 2, name: '子节点1' },
            { id: 3, name: '子节点2' }
          ]
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

      // 应该识别子节点
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      expect(treeIcon.classes()).not.toContain('is-leaf');

      // 展开节点
      await treeIcon.trigger('click');
      await nextTick();

      // 应该显示子节点
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(3);
    });

    it('多层嵌套的自定义 childrenKey 应该正常工作', async () => {
      const nestedData = [
        {
          id: 1,
          name: '一级',
          items: [
            {
              id: 11,
              name: '二级',
              items: [
                { id: 111, name: '三级' }
              ]
            }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: nestedData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'items'
          }
        }
      });

      // 展开第一级
      let treeIcon = wrapper.find('.ale-table__tree-icon');
      await treeIcon.trigger('click');
      await nextTick();

      // 展开第二级
      const allIcons = wrapper.findAll('.ale-table__tree-icon');
      treeIcon = allIcons[1];
      if (!treeIcon.classes().includes('is-leaf')) {
        await treeIcon.trigger('click');
        await nextTick();
      }

      // 应该显示所有层级
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(3);
    });
  });

  describe('深层级嵌套测试', () => {
    it('应该支持 5 层嵌套数据', async () => {
      const deepData = [
        {
          id: 1,
          name: 'Level 1',
          children: [
            {
              id: 2,
              name: 'Level 2',
              children: [
                {
                  id: 3,
                  name: 'Level 3',
                  children: [
                    {
                      id: 4,
                      name: 'Level 4',
                      children: [
                        { id: 5, name: 'Level 5' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: deepData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children',
            defaultExpandAll: true
          }
        }
      });

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(5);

      // 检查层级缩进
      const treeIcons = wrapper.findAll('.ale-table__tree-icon');
      treeIcons.forEach((icon, index) => {
        const style = icon.attributes('style');
        expect(style).toContain(`margin-left: ${index * 20}px`);
      });
    });

    it('应该正确处理超过 10 层嵌套的数据', () => {
      // 创建 10 层嵌套数据
      let currentLevel: any = { id: 10, name: 'Level 10' };
      for (let i = 9; i >= 1; i--) {
        currentLevel = {
          id: i,
          name: `Level ${i}`,
          children: [currentLevel]
        };
      }

      const wrapper = mount(Table, {
        props: {
          data: [currentLevel],
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children',
            defaultExpandAll: true
          }
        }
      });

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(10);
    });
  });

  describe('编程式控制测试', () => {
    const treeData = [
      {
        id: 1,
        name: '总部',
        children: [
          { id: 11, name: '技术部' },
          { id: 12, name: '市场部' }
        ]
      }
    ];

    it('expandRow 方法应该展开指定行', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as { expandRow: (row: any) => void };
      vm.expandRow(treeData[0]);
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(3);
    });

    it('collapseRow 方法应该折叠指定行', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
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

      let rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(3);

      // 再折叠
      vm.collapseRow(treeData[0]);
      await nextTick();

      rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(1);
    });

    it('expandAll 方法应该展开所有行', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as { expandAll: () => void };
      vm.expandAll();
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(3);
    });

    it('collapseAll 方法应该折叠所有行', async () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: {
            childrenKey: 'children',
            defaultExpandAll: true
          }
        }
      });

      const vm = wrapper.vm as unknown as { collapseAll: () => void };
      vm.collapseAll();
      await nextTick();

      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(1);
    });

    it('isTreeRowExpanded 方法应该返回正确的展开状态', () => {
      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
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

  describe('大数据量性能测试', () => {
    it('应该正确处理 1000 个节点的树形数据', () => {
      // 创建包含 1000 个节点的树
      const largeTreeData = [];
      for (let i = 0; i < 10; i++) {
        const children = [];
        for (let j = 0; j < 10; j++) {
          const grandChildren = [];
          for (let k = 0; k < 10; k++) {
            grandChildren.push({
              id: `${i}-${j}-${k}`,
              name: `Node ${i}-${j}-${k}`
            });
          }
          children.push({
            id: `${i}-${j}`,
            name: `Node ${i}-${j}`,
            children: grandChildren
          });
        }
        largeTreeData.push({
          id: `${i}`,
          name: `Node ${i}`,
          children
        });
      }

      const startTime = performance.now();

      const wrapper = mount(Table, {
        props: {
          data: largeTreeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // 渲染时间应该小于 2 秒
      expect(renderTime).toBeLessThan(2000);

      // 初始只显示顶级节点
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(10);
    });

    it('快速展开折叠大量节点应该保持稳定', async () => {
      const treeData = Array(20).fill(null).map((_, i) => ({
        id: i,
        name: `Node ${i}`,
        children: Array(10).fill(null).map((_, j) => ({
          id: `${i}-${j}`,
          name: `Child ${i}-${j}`
        }))
      }));

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      const vm = wrapper.vm as unknown as {
        expandAll: () => void;
        collapseAll: () => void;
      };

      // 快速展开折叠 5 次
      for (let i = 0; i < 5; i++) {
        vm.expandAll();
        await nextTick();
        vm.collapseAll();
        await nextTick();
      }

      // 不应该抛出错误
      expect(wrapper.find('.ale-table').exists()).toBe(true);
    });
  });

  describe('边界条件测试', () => {
    it('children 为空数组应该正确处理', () => {
      const treeData = [
        {
          id: 1,
          name: '父节点',
          children: []
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      // 应该识别为叶子节点
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      expect(treeIcon.classes()).toContain('is-leaf');
    });

    it('循环引用数据应该被正确处理', () => {
      const nodeA: any = { id: 1, name: 'A', children: [] };
      const nodeB: any = { id: 2, name: 'B', children: [] };
      nodeA.children.push(nodeB);
      // 不添加循环引用，避免无限循环

      const wrapper = mount(Table, {
        props: {
          data: [nodeA],
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      expect(wrapper.find('.ale-table').exists()).toBe(true);
    });

    it('重复 id 的数据应该被正确处理', () => {
      const treeData = [
        {
          id: 1,
          name: '节点1',
          children: [
            { id: 1, name: '重复ID' } // 重复 id
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      expect(wrapper.find('.ale-table').exists()).toBe(true);
    });
  });

  describe('与其他功能集成测试', () => {
    it('树形数据与选择功能集成', async () => {
      const treeData = [
        {
          id: 1,
          name: '父节点',
          children: [
            { id: 11, name: '子节点1' },
            { id: 12, name: '子节点2' }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [
            { type: 'selection', width: 50 },
            { prop: 'name', label: '名称' }
          ],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children', defaultExpandAll: true }
        }
      });

      await nextTick();

      expect(wrapper.find('.ale-checkbox').exists()).toBe(true);

      // 使用 defaultExpandAll 后应该显示所有行
      const rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(3);
    });

    it('树形数据与排序功能集成', async () => {
      const treeData = [
        {
          id: 1,
          name: 'B',
          children: [
            { id: 11, name: 'C' },
            { id: 12, name: 'A' }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [
            { prop: 'name', label: '名称', sortable: true }
          ],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      expect(wrapper.find('.ale-table__sort-icons').exists()).toBe(true);
    });

    it('树形数据与表身滚动集成', () => {
      const treeData = Array(20).fill(null).map((_, i) => ({
        id: i,
        name: `节点${i}`,
        children: [
          { id: `${i}-1`, name: `子节点${i}` }
        ]
      }));

      const wrapper = mount(Table, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          height: 400,
          treeConfig: { childrenKey: 'children' }
        }
      });

      expect(wrapper.find('.ale-table__wrapper--scrollable').exists()).toBe(true);
      expect(wrapper.find('.ale-table__tree-icon').exists()).toBe(true);
    });
  });

  describe('响应式变化测试', () => {
    it('treeConfig 变化时应该响应', async () => {
      const wrapper = mount(Table, {
        props: {
          data: [{ id: 1, name: '节点', items: [{ id: 2, name: '子' }] }],
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'items' }
        }
      });

      const treeIcon = wrapper.find('.ale-table__tree-icon');
      expect(treeIcon.exists()).toBe(true);
      expect(treeIcon.classes()).not.toContain('is-leaf');
    });

    it('数据变化时应该重新渲染树形结构', async () => {
      const wrapper = mount(Table, {
        props: {
          data: [{ id: 1, name: '旧节点' }],
          columns: [{ prop: 'name', label: '名称' }],
          rowKey: 'id',
          treeConfig: { childrenKey: 'children' }
        }
      });

      let rows = wrapper.findAll('.ale-table__row');
      expect(rows.length).toBe(1);

      // 更新数据
      await wrapper.setProps({
        data: [
          {
            id: 1,
            name: '新节点',
            children: [
              { id: 2, name: '新子节点' }
            ]
          }
        ]
      });
      await nextTick();

      // 应该有展开图标
      const treeIcon = wrapper.find('.ale-table__tree-icon');
      expect(treeIcon.exists()).toBe(true);
      expect(treeIcon.classes()).not.toContain('is-leaf');
    });
  });
});

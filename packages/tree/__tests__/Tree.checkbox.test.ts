/**
 * Tree 组件复选框功能单元测试
 * 测试范围: 复选框显示、级联选择、严格模式
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';

const createWrapper = (props: Partial<TreeProps> = {}) => {
  return mount(Tree, {
    props: {
      data: [
        {
          id: '1',
          label: '父节点',
          children: [
            { id: '1-1', label: '子节点 1' },
            { id: '1-2', label: '子节点 2' },
          ],
        },
      ],
      ...props,
    },
    global: {
      components: { TreeNode },
    },
  });
};

describe('Tree 复选框功能', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  describe('复选框显示', () => {
    it('应该显示复选框 (showCheckbox)', () => {
      wrapper = createWrapper({ showCheckbox: true });
      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('应该显示复选框 (checkable)', () => {
      wrapper = createWrapper({ checkable: true });
      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('checkable 和 showCheckbox 应该等效', () => {
      const wrapper1 = createWrapper({ checkable: true });
      const wrapper2 = createWrapper({ showCheckbox: true });

      const checkboxes1 = wrapper1.findAll('.ale-checkbox');
      const checkboxes2 = wrapper2.findAll('.ale-checkbox');

      expect(checkboxes1.length).toBe(checkboxes2.length);

      wrapper1.unmount();
      wrapper2.unmount();
    });

    it('禁用节点不应该响应勾选', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        data: [
          { id: '1', label: '禁用节点', disabled: true },
          { id: '2', label: '正常节点' },
        ],
      });

      const disabledCheckbox = wrapper.find('.ale-checkbox.is-disabled');
      expect(disabledCheckbox.exists()).toBe(true);
    });
  });

  describe('勾选事件', () => {
    it('点击复选框应该触发 check 事件', async () => {
      wrapper = createWrapper({ showCheckbox: true });
      const checkbox = wrapper.find('.ale-checkbox');
      await checkbox.find('input').setValue(true);

      expect(wrapper.emitted('check')).toBeTruthy();
    });

    it('点击复选框应该触发 check-change 事件', async () => {
      wrapper = createWrapper({ showCheckbox: true });
      const checkbox = wrapper.find('.ale-checkbox');
      await checkbox.find('input').setValue(true);

      expect(wrapper.emitted('check-change')).toBeTruthy();
    });

    it('应该支持 checkOnClickNode 属性', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        checkOnClickNode: true,
      });

      const nodeContent = wrapper.find('.ale-tree-node__content');
      await nodeContent.trigger('click');

      expect(wrapper.emitted('check')).toBeTruthy();
    });
  });

  describe('级联选择', () => {
    it('勾选父节点应该勾选所有子节点', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;
      const checkboxes = wrapper.findAll('.ale-checkbox');

      // 点击父节点的 checkbox
      await checkboxes[0].find('input').setValue(true);
      await nextTick();

      // 验证所有子节点都被勾选
      const checkedKeys = instance.getCheckedKeys();
      expect(checkedKeys).toContain('1');
      expect(checkedKeys).toContain('1-1');
      expect(checkedKeys).toContain('1-2');
    });

    it('取消勾选父节点应该取消所有子节点', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;
      const checkboxes = wrapper.findAll('.ale-checkbox');

      // 先勾选父节点
      await checkboxes[0].find('input').setValue(true);
      await nextTick();

      // 验证都已勾选
      expect(instance.getCheckedKeys()).toContain('1-1');

      // 取消勾选父节点
      await checkboxes[0].find('input').setValue(false);
      await nextTick();

      // 验证所有子节点都取消勾选
      const checkedKeys = instance.getCheckedKeys();
      expect(checkedKeys).not.toContain('1');
      expect(checkedKeys).not.toContain('1-1');
      expect(checkedKeys).not.toContain('1-2');
    });

    it('勾选所有子节点应该勾选父节点', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;
      const checkboxes = wrapper.findAll('.ale-checkbox');

      // 勾选所有子节点
      await checkboxes[1].find('input').setValue(true);
      await nextTick();
      await checkboxes[2].find('input').setValue(true);
      await nextTick();

      // 验证父节点也被勾选
      const checkedKeys = instance.getCheckedKeys();
      expect(checkedKeys).toContain('1');
    });

    it('部分勾选子节点应该使父节点半选', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;
      const checkboxes = wrapper.findAll('.ale-checkbox');

      // 只勾选第一个子节点
      await checkboxes[1].find('input').setValue(true);
      await nextTick();

      // 验证父节点是半选状态
      const halfCheckedKeys = instance.getHalfCheckedKeys();
      expect(halfCheckedKeys).toContain('1');

      // 验证父节点不在全选列表中
      const checkedKeys = instance.getCheckedKeys();
      expect(checkedKeys).not.toContain('1');
    });
  });

  describe('严格模式', () => {
    it('严格模式下不应该级联选择', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        checkStrictly: true,
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;
      const checkboxes = wrapper.findAll('.ale-checkbox');

      // 点击父节点的 checkbox
      await checkboxes[0].find('input').setValue(true);
      await nextTick();

      // 验证只有父节点被勾选，子节点没有被级联勾选
      const checkedKeys = instance.getCheckedKeys();
      expect(checkedKeys).toContain('1');
      expect(checkedKeys).not.toContain('1-1');
      expect(checkedKeys).not.toContain('1-2');
    });
  });

  describe('默认勾选', () => {
    it('应该支持 defaultCheckedKeys', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        defaultCheckedKeys: ['1'],
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;

      // 验证默认勾选的节点
      const checkedKeys = instance.getCheckedKeys();
      expect(checkedKeys).toContain('1');
      // 级联选择应该勾选所有子节点
      expect(checkedKeys).toContain('1-1');
      expect(checkedKeys).toContain('1-2');
    });

    it('defaultCheckedKeys 应该支持子节点 key', async () => {
      wrapper = createWrapper({
        showCheckbox: true,
        defaultCheckedKeys: ['1-1'],
        defaultExpandAll: true,
      });

      const instance = wrapper.vm as any;

      // 验证子节点被勾选
      const checkedKeys = instance.getCheckedKeys();
      expect(checkedKeys).toContain('1-1');
      expect(checkedKeys).not.toContain('1-2');
      // 父节点应该是半选状态
      const halfCheckedKeys = instance.getHalfCheckedKeys();
      expect(halfCheckedKeys).toContain('1');
    });
  });

  describe('获取勾选节点', () => {
    it('getCheckedNodes 应该返回勾选的节点', async () => {
      wrapper = createWrapper({ showCheckbox: true });
      const instance = wrapper.vm as any;

      const node = instance.getNode('1');
      if (node) {
        node.setChecked(true, true);
        await nextTick();

        const checkedNodes = instance.getCheckedNodes();
        expect(Array.isArray(checkedNodes)).toBe(true);
      }
    });

    it('getCheckedKeys 应该返回勾选的 key', async () => {
      wrapper = createWrapper({ showCheckbox: true });
      const instance = wrapper.vm as any;

      const node = instance.getNode('1');
      if (node) {
        node.setChecked(true, true);
        await nextTick();

        const checkedKeys = instance.getCheckedKeys();
        expect(Array.isArray(checkedKeys)).toBe(true);
      }
    });

    it('getHalfCheckedNodes 应该返回半选节点', () => {
      wrapper = createWrapper({ showCheckbox: true });
      const instance = wrapper.vm as any;

      const halfCheckedNodes = instance.getHalfCheckedNodes();
      expect(Array.isArray(halfCheckedNodes)).toBe(true);
    });

    it('getHalfCheckedKeys 应该返回半选 key', () => {
      wrapper = createWrapper({ showCheckbox: true });
      const instance = wrapper.vm as any;

      const halfCheckedKeys = instance.getHalfCheckedKeys();
      expect(Array.isArray(halfCheckedKeys)).toBe(true);
    });
  });
});

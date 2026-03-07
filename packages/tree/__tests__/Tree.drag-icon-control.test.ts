/**
 * Tree 组件拖拽图标控制变量法测试
 * 目的: 精确定位"节点获得子节点后再失去，展开图标不隐藏"的问题
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData, TreeProps } from '../tree.type';

const createWrapper = (data: TreeData[], props: Partial<TreeProps> = {}) => {
  return mount(Tree, {
    props: {
      data,
      draggable: true,
      defaultExpandAll: true,
      ...props,
    },
    global: {
      components: { TreeNode },
    },
  });
};

describe('Tree 拖拽图标控制变量法测试', () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    wrapper?.unmount();
  });

  describe('控制变量1: 数据层状态变化', () => {
    it('拖拽后父节点childNodes.length应该从1变为0', async () => {
      const data: TreeData[] = [
        {
          id: 'folder',
          label: '文件夹',
          children: [{ id: 'file', label: '文件' }],
        },
        { id: 'target', label: '目标', children: [] },
      ];

      wrapper = createWrapper(data);
      const instance = wrapper.vm as any;

      const folder = instance.getNode('folder');
      const file = instance.getNode('file');
      const target = instance.getNode('target');

      // 控制点1: 初始状态验证
      expect(folder.childNodes.length).toBe(1);
      expect(target.childNodes.length).toBe(0);
      expect(folder.isLeaf).toBe(false);
      expect(target.isLeaf).toBe(true);

      // 模拟拖拽: file从folder移动到target
      folder.removeChild(file);
      target.insertChild({ data: file.data });

      // 控制点2: 数据层状态变化验证
      expect(folder.childNodes.length).toBe(0); // 应该变为0
      expect(target.childNodes.length).toBe(1); // 应该变为1
      expect(folder.isLeaf).toBe(true); // folder应该变成叶子
      expect(target.isLeaf).toBe(false); // target应该变成非叶子
    });
  });

  describe('控制变量2: DOM层状态变化', () => {
    it('拖拽后folder的展开图标应该在DOM中移除', async () => {
      const data: TreeData[] = [
        {
          id: 'folder',
          label: '文件夹',
          children: [{ id: 'file', label: '文件' }],
        },
        { id: 'target', label: '目标', children: [] },
      ];

      wrapper = createWrapper(data);
      const instance = wrapper.vm as any;

      // 获取folder的DOM元素
      const allNodes = wrapper.findAll('.ale-tree-node');
      let folderElement: any = null;
      let folderComponent: any = null;

      for (const node of allNodes) {
        const nodeComponent = node.findComponent(TreeNode);
        if (nodeComponent.exists()) {
          const nodeData = nodeComponent.vm.node;
          if (nodeData?.data?.id === 'folder') {
            folderElement = node;
            folderComponent = nodeComponent;
            break;
          }
        }
      }

      // 控制点1: 初始DOM状态 - 只检查当前节点的content中的expand-icon（不包括子节点）
      const contentBefore = folderElement.find('.ale-tree-node__content');
      const expandIconBefore = contentBefore.find('.ale-tree-node__expand-icon');
      const hasIconBefore = expandIconBefore.exists() && !expandIconBefore.classes().includes('is-leaf');
      const hasPlaceholderBefore = expandIconBefore.exists() && expandIconBefore.classes().includes('is-leaf');

      expect(hasIconBefore).toBe(true);
      expect(hasPlaceholderBefore).toBe(false);

      // 执行拖拽操作
      const folder = instance.getNode('folder');
      const file = instance.getNode('file');
      const target = instance.getNode('target');

      folder.removeChild(file);
      target.insertChild({ data: file.data });

      // 等待DOM更新
      await new Promise(resolve => setTimeout(resolve, 200));
      await nextTick();
      await nextTick();

      // 控制点2: 重新获取folder的DOM元素（因为可能重新渲染）
      const updatedNodes = wrapper.findAll('.ale-tree-node');
      let updatedFolderElement: any = null;

      for (const node of updatedNodes) {
        const nodeComponent = node.findComponent(TreeNode);
        if (nodeComponent.exists()) {
          const nodeData = nodeComponent.vm.node;
          if (nodeData?.data?.id === 'folder') {
            updatedFolderElement = node;
            break;
          }
        }
      }

      // 控制点3: DOM状态验证 - 只检查当前节点的content中的expand-icon（不包括子节点）
      const contentAfter = updatedFolderElement.find('.ale-tree-node__content');
      const expandIconAfter = contentAfter.find('.ale-tree-node__expand-icon');
      const hasIconAfter = expandIconAfter.exists() && !expandIconAfter.classes().includes('is-leaf');
      const hasPlaceholderAfter = expandIconAfter.exists() && expandIconAfter.classes().includes('is-leaf');

      expect(hasIconAfter).toBe(false); // 关键断言：不应该有展开图标
      expect(hasPlaceholderAfter).toBe(true); // 应该有占位符
    });
  });

  describe('控制变量3: 双向拖拽（拖入再拖出）', () => {
    it('节点获得子节点后再失去，图标状态应该正确更新', async () => {
      const data: TreeData[] = [
        { id: 'folderA', label: '文件夹A', children: [{ id: 'file', label: '文件' }] },
        { id: 'folderB', label: '文件夹B', children: [] },
      ];

      wrapper = createWrapper(data);
      const instance = wrapper.vm as any;

      const folderA = instance.getNode('folderA');
      const folderB = instance.getNode('folderB');
      const file = instance.getNode('file');

      // ========== 阶段1: 初始状态 ==========
      expect(folderA.childNodes.length).toBe(1);
      expect(folderB.childNodes.length).toBe(0);

      // ========== 阶段2: 拖入folderB ==========
      folderA.removeChild(file);
      folderB.insertChild({ data: file.data });

      expect(folderA.childNodes.length).toBe(0);
      expect(folderB.childNodes.length).toBe(1);
      expect(folderA.isLeaf).toBe(true);
      expect(folderB.isLeaf).toBe(false);

      // 等待DOM更新
      await new Promise(resolve => setTimeout(resolve, 100));
      await nextTick();

      // ========== 阶段3: 从folderB拖出 ==========
      const fileInB = folderB.childNodes[0];
      folderB.removeChild(fileInB);
      folderA.insertChild({ data: fileInB.data });

      // 控制点: 验证数据层状态
      expect(folderB.childNodes.length).toBe(0);
      expect(folderA.childNodes.length).toBe(1);
      expect(folderB.isLeaf).toBe(true); // folderB应该变回叶子
      expect(folderA.isLeaf).toBe(false);

      // 等待DOM更新
      await new Promise(resolve => setTimeout(resolve, 200));
      await nextTick();
      await nextTick();

      // ========== 阶段4: 验证DOM状态 ==========
      const updatedNodes = wrapper.findAll('.ale-tree-node');
      let folderBElement: any = null;

      for (const node of updatedNodes) {
        const nodeComponent = node.findComponent(TreeNode);
        if (nodeComponent.exists()) {
          const nodeData = nodeComponent.vm.node;
          if (nodeData?.data?.id === 'folderB') {
            folderBElement = node;
            break;
          }
        }
      }

      // 关键验证: folderB现在没有子节点，应该隐藏展开图标（只检查当前节点content）
      const folderBContent = folderBElement.find('.ale-tree-node__content');
      const folderBIcon = folderBContent.find('.ale-tree-node__expand-icon');
      const hasIcon = folderBIcon.exists() && !folderBIcon.classes().includes('is-leaf');
      const hasPlaceholder = folderBIcon.exists() && folderBIcon.classes().includes('is-leaf');

      expect(hasIcon).toBe(false); // 不应该有展开图标
      expect(hasPlaceholder).toBe(true); // 应该有占位符
    });
  });

  describe('控制变量4: 响应式更新机制', () => {
    it('直接修改childNodes应该触发UI更新', async () => {
      const data: TreeData[] = [
        {
          id: 'folder',
          label: '文件夹',
          children: [{ id: 'file', label: '文件' }],
        },
      ];

      wrapper = createWrapper(data);
      const instance = wrapper.vm as any;

      const folder = instance.getNode('folder');
      const file = instance.getNode('file');

      // 获取初始DOM状态
      const getFolderElement = () => {
        const nodes = wrapper.findAll('.ale-tree-node');
        for (const node of nodes) {
          const comp = node.findComponent(TreeNode);
          if (comp.exists() && comp.vm.node?.data?.id === 'folder') {
            return node;
          }
        }
        return null;
      };

      const folderEl = getFolderElement();
      const hasIconBefore = folderEl?.find('.ale-tree-node__expand-icon:not(.is-leaf)').exists();
      expect(hasIconBefore).toBe(true);

      // 直接移除子节点（模拟拖拽移除）
      folder.removeChild(file);

      // 验证数据层
      expect(folder.childNodes.length).toBe(0);
      expect(folder.isLeaf).toBe(true);

      // 多次等待确保Vue更新完成
      await new Promise(resolve => setTimeout(resolve, 300));
      await nextTick();
      await nextTick();

      // 重新获取DOM元素（只检查当前节点content）
      const folderElAfter = getFolderElement();
      const contentAfter = folderElAfter?.find('.ale-tree-node__content');
      const iconAfter = contentAfter?.find('.ale-tree-node__expand-icon');
      const hasIconAfter = iconAfter?.exists() && !iconAfter.classes().includes('is-leaf');
      const hasPlaceholderAfter = iconAfter?.exists() && iconAfter.classes().includes('is-leaf');

      // 如果这里失败，说明响应式机制有问题
      expect(hasIconAfter).toBe(false);
      expect(hasPlaceholderAfter).toBe(true);
    });
  });

  describe('控制变量5: 事件触发机制', () => {
    it('node-children-change事件应该被正确触发', async () => {
      const data: TreeData[] = [
        {
          id: 'folder',
          label: '文件夹',
          children: [{ id: 'file', label: '文件' }],
        },
      ];

      wrapper = createWrapper(data);
      const instance = wrapper.vm as any;

      const folder = instance.getNode('folder');
      const file = instance.getNode('file');

      // 监听事件
      const eventSpy = vi.fn();
      folder.store.on('node-children-change', eventSpy);

      // 执行移除操作
      folder.removeChild(file);

      // 验证事件被触发
      expect(eventSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledWith(folder);
    });
  });

  describe('控制变量6: 实际拖拽操作模拟', () => {
    it('使用真实拖拽事件模拟拖入拖出流程', async () => {
      const data: TreeData[] = [
        { id: 'folderA', label: '文件夹A', children: [{ id: 'file', label: '文件' }] },
        { id: 'folderB', label: '文件夹B', children: [] },
      ];

      wrapper = createWrapper(data);
      const instance = wrapper.vm as any;

      // 获取DOM元素
      const getNodeElement = (id: string) => {
        const nodes = wrapper.findAll('.ale-tree-node');
        for (const node of nodes) {
          const comp = node.findComponent(TreeNode);
          if (comp.exists() && comp.vm.node?.data?.id === id) {
            return node;
          }
        }
        return null;
      };

      const folderAEl = getNodeElement('folderA');
      const folderBEl = getNodeElement('folderB');
      const fileEl = getNodeElement('file');

      // 辅助函数：检查节点是否有展开图标（只检查当前节点content）
      const hasExpandIcon = (el: any) => {
        const content = el?.find('.ale-tree-node__content');
        const icon = content?.find('.ale-tree-node__expand-icon');
        return icon?.exists() && !icon.classes().includes('is-leaf');
      };

      // 初始状态验证
      expect(hasExpandIcon(folderAEl)).toBe(true);
      expect(hasExpandIcon(folderBEl)).toBe(false);

      // ===== 第1次拖拽: file -> folderB =====
      // 触发file的dragstart
      await fileEl?.trigger('dragstart', {
        dataTransfer: { setData: vi.fn(), getData: vi.fn(() => 'file'), effectAllowed: 'move' },
      });

      // 触发folderB的dragenter和dragover
      await folderBEl?.trigger('dragenter', {
        dataTransfer: { getData: vi.fn(() => 'file') },
      });
      await folderBEl?.trigger('dragover', {
        dataTransfer: { getData: vi.fn(() => 'file') },
        clientY: 16,
      });

      // 添加drop-inner类模拟inner drop
      const folderBContent = folderBEl?.find('.ale-tree-node__content');
      folderBContent?.element.classList.add('drop-inner');

      // 触发drop
      await folderBEl?.trigger('drop', {
        dataTransfer: { getData: vi.fn(() => 'file') },
      });

      // 等待处理
      await new Promise(resolve => setTimeout(resolve, 200));
      await nextTick();

      // 验证folderA失去子节点
      const folderA = instance.getNode('folderA');
      expect(folderA.childNodes.length).toBe(0);

      // 重新获取DOM元素（可能已重新渲染）
      const folderAElAfter = getNodeElement('folderA');
      const folderBElAfter = getNodeElement('folderB');

      // 验证DOM状态
      expect(hasExpandIcon(folderAElAfter)).toBe(false);
    });
  });
});

/**
 * Tree 拖拽调试测试
 */

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tree from '../Tree.vue';
import TreeNode from '../TreeNode.vue';
import type { TreeData } from '../tree.type';
import type { Node as NodeType } from '../model/node';

const createWrapper = (props: any = {}) => {
  return mount(Tree, {
    props: { data: [], ...props },
    global: { components: { TreeNode } },
  });
};

describe('Tree 拖拽调试', () => {
  it('拖拽后 isLeaf 状态调试', async () => {
    const data: TreeData[] = [
      { id: 'folder1', label: '文件夹1', children: [] },
      { id: 'file1', label: '文件1' },
    ];

    const wrapper = createWrapper({ data, defaultExpandAll: true });
    const instance = wrapper.vm as any;

    const folder1 = instance.getNode('folder1') as NodeType;
    const file1 = instance.getNode('file1') as NodeType;

    console.log('初始状态:');
    console.log('  folder1.isLeaf:', folder1.isLeaf);
    console.log('  folder1.childNodes.length:', folder1.childNodes.length);
    console.log('  folder1.data.isLeaf:', folder1.data.isLeaf);

    // 使用 API 方法模拟拖拽效果
    // 先从原位置移除
    const file1Data = { ...file1.data };
    instance.remove({ id: 'file1' });
    await nextTick();

    console.log('\n移除 file1 后:');
    console.log('  root childNodes:', instance.store.root.childNodes.map((n: NodeType) => n.data.id));

    // 然后添加到 folder1
    instance.append(file1Data, 'folder1');
    await nextTick();

    console.log('\n添加到 folder1 后:');
    console.log('  folder1.isLeaf:', folder1.isLeaf);
    console.log('  folder1.childNodes.length:', folder1.childNodes.length);
    console.log('  folder1.childNodes[0]?.data.id:', folder1.childNodes[0]?.data.id);

    // 关键验证
    expect(folder1.childNodes.length).toBe(1);
    expect(folder1.isLeaf).toBe(false);

    wrapper.unmount();
  });
});

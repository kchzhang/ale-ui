import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, ref } from 'vue';
import List from '../List.vue';
import type { ListItemData } from '../types';

describe('List 组件', () => {
  // 测试数据
  const testData: ListItemData[] = [
    { id: 1, title: '标题1', description: '描述1', extra: '额外1' },
    { id: 2, title: '标题2', description: '描述2', extra: '额外2' },
    { id: 3, title: '标题3', description: '描述3', extra: '额外3' }
  ];

  const avatarData: ListItemData[] = [
    { id: 1, title: '用户1', description: '描述1', avatar: 'https://example.com/avatar1.jpg' },
    { id: 2, title: '用户2', description: '描述2', avatar: '张' },
    { id: 3, title: '用户3', description: '描述3' }
  ];

  describe('基础渲染', () => {
    it('应该正确渲染列表', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      expect(wrapper.find('.ale-list').exists()).toBe(true);
      expect(wrapper.findAll('.ale-list__item').length).toBe(3);
    });

    it('应该显示列表项标题', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      const titles = wrapper.findAll('.ale-list__title');
      expect(titles[0].text()).toBe('标题1');
      expect(titles[1].text()).toBe('标题2');
      expect(titles[2].text()).toBe('标题3');
    });

    it('应该显示列表项描述', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      const descriptions = wrapper.findAll('.ale-list__description');
      expect(descriptions[0].text()).toBe('描述1');
      expect(descriptions[1].text()).toBe('描述2');
    });

    it('应该显示额外内容', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      const extras = wrapper.findAll('.ale-list__extra');
      expect(extras[0].text()).toBe('额外1');
      expect(extras[1].text()).toBe('额外2');
    });
  });

  describe('空状态', () => {
    it('空数据时应该显示空状态', () => {
      const wrapper = mount(List, {
        props: {
          data: []
        }
      });

      expect(wrapper.find('.ale-list__empty').exists()).toBe(true);
      expect(wrapper.text()).toContain('暂无数据');
    });

    it('应该支持自定义空状态文本', () => {
      const customText = '自定义空状态';
      const wrapper = mount(List, {
        props: {
          data: [],
          emptyText: customText
        }
      });

      expect(wrapper.text()).toContain(customText);
    });

    it('未传入数据时应该显示空状态', () => {
      const wrapper = mount(List);

      expect(wrapper.find('.ale-list__empty').exists()).toBe(true);
    });
  });

  describe('加载状态', () => {
    it('加载中应该显示加载状态', () => {
      const wrapper = mount(List, {
        props: {
          data: [],
          loading: true
        }
      });

      expect(wrapper.find('.ale-list__loading').exists()).toBe(true);
      expect(wrapper.find('.ale-list__loading-spinner').exists()).toBe(true);
    });

    it('加载中不应该显示空状态', () => {
      const wrapper = mount(List, {
        props: {
          data: [],
          loading: true
        }
      });

      expect(wrapper.find('.ale-list__empty').exists()).toBe(false);
      expect(wrapper.find('.ale-list__loading').exists()).toBe(true);
    });
  });

  describe('尺寸', () => {
    it('应该支持 small 尺寸', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          size: 'small'
        }
      });

      expect(wrapper.find('.ale-list--small').exists()).toBe(true);
    });

    it('应该支持 medium 尺寸', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          size: 'medium'
        }
      });

      expect(wrapper.find('.ale-list--medium').exists()).toBe(true);
    });

    it('应该支持 large 尺寸', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          size: 'large'
        }
      });

      expect(wrapper.find('.ale-list--large').exists()).toBe(true);
    });
  });

  describe('布局', () => {
    it('应该支持 vertical 布局', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          layout: 'vertical'
        }
      });

      expect(wrapper.find('.ale-list--vertical').exists()).toBe(true);
    });

    it('应该支持 horizontal 布局', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          layout: 'horizontal'
        }
      });

      expect(wrapper.find('.ale-list--horizontal').exists()).toBe(true);
    });
  });

  describe('边框', () => {
    it('应该显示边框', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          bordered: true
        }
      });

      expect(wrapper.find('.is-bordered').exists()).toBe(true);
    });

    it('应该支持 solid 边框样式', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          bordered: true,
          borderStyle: 'solid'
        }
      });

      expect(wrapper.find('.is-bordered-solid').exists()).toBe(true);
    });

    it('应该支持 dashed 边框样式', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          bordered: true,
          borderStyle: 'dashed'
        }
      });

      expect(wrapper.find('.is-bordered-dashed').exists()).toBe(true);
    });
  });

  describe('分隔线', () => {
    it('应该显示分隔线', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          split: true
        }
      });

      expect(wrapper.find('.is-split').exists()).toBe(true);
    });
  });

  describe('序号', () => {
    it('应该显示序号', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          showIndex: true
        }
      });

      const indexes = wrapper.findAll('.ale-list__index');
      expect(indexes.length).toBe(3);
      expect(indexes[0].text()).toBe('1');
      expect(indexes[1].text()).toBe('2');
      expect(indexes[2].text()).toBe('3');
    });
  });

  describe('头像', () => {
    it('应该显示图片头像', () => {
      const wrapper = mount(List, {
        props: {
          data: avatarData
        }
      });

      const avatars = wrapper.findAll('.ale-list__avatar');
      // avatarData 中只有 2 个数据项有 avatar 字段
      expect(avatars.length).toBe(2);
    });

    it('图片头像应该正确渲染 img 标签', () => {
      const wrapper = mount(List, {
        props: {
          data: [{ id: 1, title: '测试', avatar: 'https://example.com/avatar.jpg' }]
        }
      });

      const img = wrapper.find('.ale-list__avatar img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('https://example.com/avatar.jpg');
    });

    it('文字头像应该显示文字', () => {
      const wrapper = mount(List, {
        props: {
          data: [{ id: 1, title: '测试', avatar: '张' }]
        }
      });

      expect(wrapper.find('.ale-list__avatar-text').exists()).toBe(true);
      expect(wrapper.find('.ale-list__avatar-text').text()).toBe('张');
    });
  });

  describe('点击事件', () => {
    it('可点击时点击列表项应该触发事件', async () => {
      const onClick = vi.fn();
      const wrapper = mount(List, {
        props: {
          data: testData,
          clickable: true,
          onClick: onClick
        }
      });

      await wrapper.find('.ale-list__item').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(testData[0], 0);
    });

    it('不可点击时点击不应该触发事件', async () => {
      const onClick = vi.fn();
      const wrapper = mount(List, {
        props: {
          data: testData,
          clickable: false,
          onClick: onClick
        }
      });

      await wrapper.find('.ale-list__item').trigger('click');

      expect(onClick).not.toHaveBeenCalled();
    });

    it('禁用的列表项点击不应该触发事件', async () => {
      const onClick = vi.fn();
      const disabledData = [{ id: 1, title: '禁用项', disabled: true }];
      const wrapper = mount(List, {
        props: {
          data: disabledData,
          clickable: true,
          onClick: onClick
        }
      });

      await wrapper.find('.ale-list__item').trigger('click');

      expect(onClick).not.toHaveBeenCalled();
    });

    it('禁用的列表项应该有禁用样式', () => {
      const disabledData = [
        { id: 1, title: '禁用项', disabled: true },
        { id: 2, title: '正常项' }
      ];
      const wrapper = mount(List, {
        props: {
          data: disabledData
        }
      });

      const items = wrapper.findAll('.ale-list__item');
      expect(items[0].classes()).toContain('is-disabled');
      expect(items[1].classes()).not.toContain('is-disabled');
    });
  });

  describe('操作事件', () => {
    it('应该触发 action 事件', async () => {
      const onAction = vi.fn();
      const wrapper = mount(List, {
        props: {
          data: testData,
          onAction: onAction
        },
        slots: {
          actions: ({ onAction }: { onAction: (action: string) => void }) => {
            return h('button', {
              class: 'action-btn',
              onClick: () => onAction('delete')
            }, '删除');
          }
        }
      });

      await wrapper.find('.action-btn').trigger('click');

      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onAction).toHaveBeenCalledWith(testData[0], 0, 'delete');
    });
  });

  describe('自定义类名和样式', () => {
    it('应该支持自定义类名', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          customClass: 'my-custom-class'
        }
      });

      expect(wrapper.find('.my-custom-class').exists()).toBe(true);
    });

    it('应该支持自定义样式', () => {
      const wrapper = mount(List, {
        props: {
          data: testData,
          customStyle: { backgroundColor: 'red' }
        }
      });

      expect(wrapper.attributes('style')).toContain('background-color: red');
    });
  });

  describe('插槽', () => {
    it('应该支持 title 插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        },
        slots: {
          title: ({ item, index }: { item: ListItemData; index: number }) => {
            return h('span', { class: 'custom-title' }, `自定义-${item.title}-${index}`);
          }
        }
      });

      expect(wrapper.find('.custom-title').exists()).toBe(true);
      expect(wrapper.text()).toContain('自定义-标题1-0');
    });

    it('应该支持 description 插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        },
        slots: {
          description: ({ item }: { item: ListItemData }) => {
            return h('span', { class: 'custom-desc' }, `自定义-${item.description}`);
          }
        }
      });

      expect(wrapper.find('.custom-desc').exists()).toBe(true);
      expect(wrapper.text()).toContain('自定义-描述1');
    });

    it('应该支持 extra 插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        },
        slots: {
          extra: ({ item }: { item: ListItemData }) => {
            return h('span', { class: 'custom-extra' }, `自定义-${item.extra}`);
          }
        }
      });

      expect(wrapper.find('.custom-extra').exists()).toBe(true);
      expect(wrapper.text()).toContain('自定义-额外1');
    });

    it('应该支持 avatar 插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        },
        slots: {
          avatar: ({ index }: { index: number }) => {
            return h('div', { class: 'custom-avatar' }, `头像-${index}`);
          }
        }
      });

      expect(wrapper.find('.custom-avatar').exists()).toBe(true);
      expect(wrapper.text()).toContain('头像-0');
    });

    it('应该支持默认插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        },
        slots: {
          default: ({ item, index }: { item: ListItemData; index: number }) => {
            return h('div', { class: 'custom-content' }, `${item.title}-${index}`);
          }
        }
      });

      expect(wrapper.find('.custom-content').exists()).toBe(true);
    });

    it('应该支持 footer 插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        },
        slots: {
          footer: () => {
            return h('div', { class: 'custom-footer' }, '自定义底部');
          }
        }
      });

      expect(wrapper.find('.custom-footer').exists()).toBe(true);
      expect(wrapper.text()).toContain('自定义底部');
    });

    it('应该支持 empty 插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: []
        },
        slots: {
          empty: () => {
            return h('div', { class: 'custom-empty' }, '自定义空状态');
          }
        }
      });

      expect(wrapper.find('.custom-empty').exists()).toBe(true);
      expect(wrapper.text()).toContain('自定义空状态');
    });

    it('应该支持 loading 插槽', () => {
      const wrapper = mount(List, {
        props: {
          data: [],
          loading: true
        },
        slots: {
          loading: () => {
            return h('div', { class: 'custom-loading' }, '自定义加载');
          }
        }
      });

      expect(wrapper.find('.custom-loading').exists()).toBe(true);
      expect(wrapper.text()).toContain('自定义加载');
    });
  });

  describe('动态数据', () => {
    it('应该响应数据变化', async () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      expect(wrapper.findAll('.ale-list__item').length).toBe(3);

      // 更新数据
      await wrapper.setProps({
        data: [...testData, { id: 4, title: '标题4', description: '描述4' }]
      });

      expect(wrapper.findAll('.ale-list__item').length).toBe(4);
    });

    it('数据变为空应该显示空状态', async () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      expect(wrapper.findAll('.ale-list__item').length).toBe(3);
      expect(wrapper.find('.ale-list__empty').exists()).toBe(false);

      // 清空数据
      await wrapper.setProps({
        data: []
      });

      expect(wrapper.find('.ale-list__empty').exists()).toBe(true);
    });
  });

  describe('ARIA 属性', () => {
    it('应该有正确的 ARIA 属性', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      expect(wrapper.find('[role="list"]').exists()).toBe(true);
      expect(wrapper.findAll('[role="listitem"]').length).toBe(3);
    });

    it('禁用的项应该有 aria-disabled', () => {
      const disabledData = [{ id: 1, title: '禁用项', disabled: true }];
      const wrapper = mount(List, {
        props: {
          data: disabledData
        }
      });

      const item = wrapper.find('[role="listitem"]');
      expect(item.attributes('aria-disabled')).toBe('true');
    });

    it('正常的项应该有 aria-disabled="false"', () => {
      const wrapper = mount(List, {
        props: {
          data: testData
        }
      });

      const item = wrapper.find('[role="listitem"]');
      expect(item.attributes('aria-disabled')).toBe('false');
    });
  });
});

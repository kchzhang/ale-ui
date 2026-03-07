import { describe, it, expect, vi } from 'vitest';
import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import Pagination from '../Pagination.vue';

describe('Pagination 组件', () => {
  // 基础渲染测试
  describe('基础渲染', () => {
    it('应该正确渲染分页器容器', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100
        }
      });

      expect(wrapper.find('.ale-pagination').exists()).toBe(true);
    });

    it('应该渲染总条数', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          showTotal: true
        }
      });

      expect(wrapper.find('.ale-pagination__total').exists()).toBe(true);
      expect(wrapper.find('.ale-pagination__total').text()).toContain('100');
    });

    it('应该渲染上一页按钮', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100
        }
      });

      expect(wrapper.find('.ale-pagination__prev').exists()).toBe(true);
    });

    it('应该渲染下一页按钮', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100
        }
      });

      expect(wrapper.find('.ale-pagination__next').exists()).toBe(true);
    });

    it('应该渲染页码列表', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100
        }
      });

      expect(wrapper.find('.ale-pagination__pager').exists()).toBe(true);
      expect(wrapper.findAll('.ale-pagination__item').length).toBeGreaterThan(0);
    });
  });

  // 页码计算测试
  describe('页码计算', () => {
    it('应该正确计算总页数', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 95,
          pageSize: 10
        }
      });

      const vm = wrapper.vm as unknown as { getTotalPages: () => number };
      expect(vm.getTotalPages()).toBe(10);
    });

    it('应该显示第一页为激活状态', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1
        }
      });

      const firstItem = wrapper.find('.ale-pagination__item.is-active');
      expect(firstItem.exists()).toBe(true);
      expect(firstItem.text()).toBe('1');
    });

    it('应该正确显示当前页码', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 5
        }
      });

      const vm = wrapper.vm as unknown as { getCurrent: () => number };
      expect(vm.getCurrent()).toBe(5);
    });
  });

  // 页码切换测试
  describe('页码切换', () => {
    it('点击页码应该切换到对应页', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          onChange
        }
      });

      const pageItems = wrapper.findAll('.ale-pagination__item');
      await pageItems[2].trigger('click');

      expect(onChange).toHaveBeenCalled();
    });

    it('点击上一页应该切换到上一页', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 2,
          onChange
        }
      });

      await wrapper.find('.ale-pagination__prev').trigger('click');

      expect(onChange).toHaveBeenCalledWith(1, 10);
    });

    it('点击下一页应该切换到下一页', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          onChange
        }
      });

      await wrapper.find('.ale-pagination__next').trigger('click');

      expect(onChange).toHaveBeenCalledWith(2, 10);
    });

    it('第一页时上一页按钮应该禁用', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1
        }
      });

      const prevBtn = wrapper.find('.ale-pagination__prev');
      expect(prevBtn.attributes('disabled')).toBeDefined();
    });

    it('最后一页时下一页按钮应该禁用', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 30,
          current: 3,
          pageSize: 10
        }
      });

      const nextBtn = wrapper.find('.ale-pagination__next');
      expect(nextBtn.attributes('disabled')).toBeDefined();
    });
  });

  // 快速跳转测试
  describe('快速跳转', () => {
    it('应该显示快速跳转输入框', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'prev, pager, next, jumper',
          showJumper: true
        }
      });

      expect(wrapper.find('.ale-pagination__jumper').exists()).toBe(true);
      expect(wrapper.find('.ale-pagination__jumper-input').exists()).toBe(true);
    });

    it('输入页码并按回车应该跳转', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          layout: 'prev, pager, next, jumper',
          showJumper: true,
          onChange
        }
      });

      const input = wrapper.find('.ale-pagination__jumper-input');
      await input.setValue(5);
      await input.trigger('keyup.enter');

      expect(onChange).toHaveBeenCalledWith(5, 10);
    });
  });

  // 每页条数测试 (page-sizes)
  describe('每页条数 (page-sizes)', () => {
    it('应该显示每页条数选择器', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true
        }
      });

      expect(wrapper.find('.ale-pagination__size-changer').exists()).toBe(true);
    });

    it('应该渲染正确的 page-size-options 选项', async () => {
      const pageSizeOptions = [10, 20, 50, 100];
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true,
          pageSizeOptions
        }
      });

      // 验证 Select 组件存在且传递了正确的选项
      const select = wrapper.findComponent({ name: 'Select' });
      expect(select.exists()).toBe(true);
      
      // 验证 AleOption 组件数量与 pageSizeOptions 一致
      const options = wrapper.findAllComponents({ name: 'Option' });
      expect(options.length).toBe(pageSizeOptions.length);
    });

    it('应该正确渲染 Select 组件并传递所有必要 props', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          pageSize: 20,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          size: 'small'
        }
      });

      const select = wrapper.findComponent({ name: 'Select' });
      
      // 验证 Select 组件存在
      expect(select.exists()).toBe(true);
      
      // 验证 modelValue 正确传递
      expect(select.props('modelValue')).toBe(20);
      
      // 验证 size 正确传递（分页器 small -> Select small）
      expect(select.props('size')).toBe('small');
      
      // 验证 disabled 默认为 false
      expect(select.props('disabled')).toBe(false);
      
      // 验证所有选项都被渲染
      const options = wrapper.findAllComponents({ name: 'Option' });
      expect(options.length).toBe(3);
      
      // 验证每个 Option 的 label 和 value
      expect(options[0].props('label')).toBe('10 条/页');
      expect(options[0].props('value')).toBe(10);
      expect(options[1].props('label')).toBe('20 条/页');
      expect(options[1].props('value')).toBe(20);
      expect(options[2].props('label')).toBe('50 条/页');
      expect(options[2].props('value')).toBe(50);
    });

    it('改变每页条数应该触发 pageSizeChange 事件', async () => {
      const onPageSizeChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          pageSize: 10,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true,
          onPageSizeChange
        }
      });

      // 直接触发 update:model-value 事件
      const select = wrapper.findComponent({ name: 'Select' });
      await select.vm.$emit('update:model-value', 20);

      expect(onPageSizeChange).toHaveBeenCalledWith(1, 20);
    });

    it('改变每页条数应该触发 update:pageSize 和 update:current 事件', async () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          pageSize: 10,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true
        }
      });

      // 直接触发 update:model-value 事件
      const select = wrapper.findComponent({ name: 'Select' });
      await select.vm.$emit('update:model-value', 20);

      expect(wrapper.emitted()).toHaveProperty('update:pageSize');
      // 验证 update:pageSize 事件被触发且值为 20
      const pageSizeEvents = wrapper.emitted('update:pageSize');
      expect(pageSizeEvents).toBeTruthy();
      expect(pageSizeEvents![pageSizeEvents!.length - 1]).toEqual([20]);
      expect(wrapper.emitted()).toHaveProperty('update:current');
    });

    it('改变每页条数后当前页应该保持在有效范围内', async () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 10, // 第10页，每页10条 = 总共10页
          pageSize: 10,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true
        }
      });

      // 直接触发 update:model-value 事件切换到每页50条
      const select = wrapper.findComponent({ name: 'Select' });
      await select.vm.$emit('update:model-value', 50);

      const vm = wrapper.vm as unknown as { getCurrent: () => number; getTotalPages: () => number };
      expect(vm.getTotalPages()).toBe(2);
      expect(vm.getCurrent()).toBeLessThanOrEqual(2);
    });

    it('改变每页条数后总页数应该重新计算', async () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          pageSize: 10,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true
        }
      });

      const vm = wrapper.vm as unknown as { getTotalPages: () => number };
      expect(vm.getTotalPages()).toBe(10);

      // 直接触发 update:model-value 事件
      const select = wrapper.findComponent({ name: 'Select' });
      await select.vm.$emit('update:model-value', 20);

      expect(vm.getTotalPages()).toBe(5);
    });

    it('禁用状态下 page-sizes 选择器应该被禁用', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true,
          disabled: true
        }
      });

      const select = wrapper.findComponent({ name: 'Select' });
      expect(select.props('disabled')).toBe(true);
    });

    it('支持自定义 page-size-options', async () => {
      const customOptions = [5, 15, 30, 60];
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true,
          pageSizeOptions: customOptions
        }
      });

      // 验证 Select 组件存在
      const select = wrapper.findComponent({ name: 'Select' });
      expect(select.exists()).toBe(true);
    });

    it('page-size-options 为空数组时不应该报错', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true,
          pageSizeOptions: []
        }
      });

      expect(wrapper.find('.ale-pagination').exists()).toBe(true);
      expect(wrapper.find('.ale-pagination__size-changer').exists()).toBe(true);
    });

    it('当 layout 不包含 sizes 时不应该显示选择器', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'prev, pager, next',
          showSizeChanger: true
        }
      });

      expect(wrapper.find('.ale-pagination__size-changer').exists()).toBe(false);
    });

    it('当 showSizeChanger 为 false 时不应该显示选择器', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: false
        }
      });

      expect(wrapper.find('.ale-pagination__size-changer').exists()).toBe(false);
    });

    it('page-size 应该与选择器的值同步', async () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          pageSize: 20,
          layout: 'sizes, prev, pager, next',
          showSizeChanger: true
        }
      });

      const select = wrapper.findComponent({ name: 'Select' });
      expect(select.props('modelValue')).toBe(20);
    });
  });

  // 尺寸测试
  describe('尺寸', () => {
    it('支持 small 尺寸', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          size: 'small'
        }
      });

      expect(wrapper.find('.ale-pagination--small').exists()).toBe(true);
    });

    it('支持 medium 尺寸', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          size: 'medium'
        }
      });

      expect(wrapper.find('.ale-pagination--medium').exists()).toBe(true);
    });

    it('支持 large 尺寸', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          size: 'large'
        }
      });

      expect(wrapper.find('.ale-pagination--large').exists()).toBe(true);
    });
  });

  // 简洁模式测试
  describe('简洁模式', () => {
    it('应该渲染简洁模式', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          simple: true
        }
      });

      expect(wrapper.find('.ale-pagination--simple').exists()).toBe(true);
      expect(wrapper.find('.ale-pagination__simple').exists()).toBe(true);
    });

    it('简洁模式应该有输入框', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          simple: true
        }
      });

      expect(wrapper.find('.ale-pagination__simple-input').exists()).toBe(true);
    });
  });

  // 禁用状态测试
  describe('禁用状态', () => {
    it('禁用状态下应该添加禁用类名', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          disabled: true
        }
      });

      expect(wrapper.find('.ale-pagination--disabled').exists()).toBe(true);
    });
  });

  // 自定义渲染测试
  describe('自定义渲染', () => {
    it('支持自定义总条数渲染', () => {
      const totalRender = vi.fn((total, range) => `${range[0]}-${range[1]} / ${total}`);
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          showTotal: true,
          totalRender
        }
      });

      expect(totalRender).toHaveBeenCalled();
      expect(wrapper.find('.ale-pagination__total').text()).toContain('1-10');
    });

    it('支持自定义上一页文本', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          prevText: '上一页'
        }
      });

      expect(wrapper.find('.ale-pagination__prev').text()).toContain('上一页');
    });

    it('支持自定义下一页文本', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          nextText: '下一页'
        }
      });

      expect(wrapper.find('.ale-pagination__next').text()).toContain('下一页');
    });
  });

  // 更多按钮测试
  describe('更多按钮', () => {
    it('页码较多时应该显示更多按钮', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 200,
          current: 5
        }
      });

      expect(wrapper.find('.ale-pagination__more').exists()).toBe(true);
    });

    it('点击更多按钮应该快速跳转', async () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 200,
          current: 10
        }
      });

      const moreBtn = wrapper.find('.ale-pagination__more');
      if (moreBtn.exists()) {
        await moreBtn.trigger('click');
        // 应该跳转到当前页 +/- 5
      }
    });
  });

  // Expose 方法测试
  describe('Expose 方法', () => {
    it('goTo 方法应该跳转到指定页', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1,
          onChange
        }
      });

      const vm = wrapper.vm as unknown as { goTo: (page: number) => void };
      vm.goTo(5);
      await nextTick();

      expect(onChange).toHaveBeenCalledWith(5, 10);
    });

    it('prev 方法应该跳转到上一页', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 5,
          onChange
        }
      });

      const vm = wrapper.vm as unknown as { prev: () => void };
      vm.prev();
      await nextTick();

      expect(onChange).toHaveBeenCalledWith(4, 10);
    });

    it('next 方法应该跳转到下一页', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 5,
          onChange
        }
      });

      const vm = wrapper.vm as unknown as { next: () => void };
      vm.next();
      await nextTick();

      expect(onChange).toHaveBeenCalledWith(6, 10);
    });

    it('getCurrent 应该返回当前页码', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 5
        }
      });

      const vm = wrapper.vm as unknown as { getCurrent: () => number };
      expect(vm.getCurrent()).toBe(5);
    });

    it('getTotalPages 应该返回总页数', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 95,
          pageSize: 10
        }
      });

      const vm = wrapper.vm as unknown as { getTotalPages: () => number };
      expect(vm.getTotalPages()).toBe(10);
    });
  });

  // 响应式更新测试
  describe('响应式更新', () => {
    it('current 变化应该更新组件', async () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          current: 1
        }
      });

      await wrapper.setProps({ current: 5 });
      await nextTick();

      const vm = wrapper.vm as unknown as { getCurrent: () => number };
      expect(vm.getCurrent()).toBe(5);
    });

    it('pageSize 变化应该更新组件', async () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 100,
          pageSize: 10
        }
      });

      await wrapper.setProps({ pageSize: 20 });
      await nextTick();

      const vm = wrapper.vm as unknown as { getTotalPages: () => number };
      expect(vm.getTotalPages()).toBe(5);
    });
  });

  // 边界情况测试
  describe('边界情况', () => {
    it('总条数为 0 时应该正确显示', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 0
        }
      });

      expect(wrapper.find('.ale-pagination').exists()).toBe(true);
    });

    it('只有一页时不应该显示页码', () => {
      const wrapper = mount(Pagination, {
        props: {
          total: 5,
          pageSize: 10
        }
      });

      expect(wrapper.findAll('.ale-pagination__item').length).toBeLessThanOrEqual(1);
    });

    it('当前页超出总页数应该正确处理', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Pagination, {
        props: {
          total: 30,
          current: 5,
          pageSize: 10,
          onChange
        }
      });

      // 验证总页数计算正确（30条，每页10条 = 3页）
      const vm = wrapper.vm as unknown as { getTotalPages: () => number };
      expect(vm.getTotalPages()).toBe(3);
      
      // 点击下一页应该不触发事件（因为已经在最大页）
      await wrapper.find('.ale-pagination__next').trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RadioGroup from '../RadioGroup.vue';
import Radio from '../Radio.vue';

describe('RadioGroup', () => {
  // 基础渲染测试
  it('renders with options', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    });
    expect(wrapper.find('.ale-radio-group').exists()).toBe(true);
    expect(wrapper.findAll('.ale-radio').length).toBe(2);
  });

  // 选中值测试
  it('sets correct value', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: '1',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    });
    const radios = wrapper.findAll('.ale-radio');
    expect(radios[0].classes()).toContain('is-checked');
    expect(radios[1].classes()).not.toContain('is-checked');
  });

  // 方向测试
  it('applies correct direction class', () => {
    const directions = ['horizontal', 'vertical'] as const;
    directions.forEach(direction => {
      const wrapper = mount(RadioGroup, {
        props: {
          direction,
          options: [{ label: 'Test', value: 'test' }]
        }
      });
      expect(wrapper.find('.ale-radio-group').classes()).toContain(`ale-radio-group--${direction}`);
    });
  });

  // 禁用状态测试
  it('disables all radios when disabled', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        disabled: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    });
    expect(wrapper.find('.ale-radio-group').classes()).toContain('is-disabled');
    const radios = wrapper.findAll('.ale-radio');
    radios.forEach(radio => {
      expect(radio.classes()).toContain('is-disabled');
    });
  });

  // change 事件测试
  it('emits change event when radio is selected', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    });
    const inputs = wrapper.findAll('input');
    await inputs[1].trigger('change');
    expect(wrapper.emitted()).toHaveProperty('change');
    expect(wrapper.emitted('change')?.[0]).toEqual(['2']);
  });

  // expose 方法测试
  it('exposes select, clear, selectFirst, selectLast methods', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: '',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' }
        ]
      }
    });

    // 测试 selectFirst
    await wrapper.vm.selectFirst();
    expect(wrapper.emitted('change')?.[0]).toEqual(['1']);

    // 测试 selectLast
    await wrapper.vm.selectLast();
    expect(wrapper.emitted('change')?.slice(-1)[0]).toEqual(['3']);

    // 测试 select
    await wrapper.vm.select('2');
    expect(wrapper.emitted('change')?.slice(-1)[0]).toEqual(['2']);

    // 测试 clear
    await wrapper.vm.clear();
    expect(wrapper.emitted('change')?.slice(-1)[0]).toEqual([undefined]);
  });

  // clear 方法应该移除所有选中样式
  it('clear method should remove is-checked class from all radios', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        modelValue: '1',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' }
        ]
      }
    });

    // 初始状态：第一个 radio 应该被选中
    let radios = wrapper.findAll('.ale-radio');
    expect(radios[0].classes()).toContain('is-checked');
    expect(radios[1].classes()).not.toContain('is-checked');
    expect(radios[2].classes()).not.toContain('is-checked');

    // 调用 clear 方法
    await wrapper.vm.clear();
    await wrapper.vm.$nextTick();

    // 所有 radio 应该都没有 is-checked 类
    radios = wrapper.findAll('.ale-radio');
    expect(radios[0].classes()).not.toContain('is-checked');
    expect(radios[1].classes()).not.toContain('is-checked');
    expect(radios[2].classes()).not.toContain('is-checked');
  });

  // slot 渲染测试
  it('renders slot content when no options provided', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: '<div class="custom-content">Custom Content</div>'
      }
    });
    expect(wrapper.find('.custom-content').exists()).toBe(true);
  });

  // aria 属性测试
  it('has correct aria attributes', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        disabled: true,
        options: [{ label: 'Test', value: 'test' }]
      }
    });
    expect(wrapper.attributes('role')).toBe('radiogroup');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  // 尺寸传递测试
  it('passes size to child radios', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        size: 'large',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    });
    const radios = wrapper.findAll('.ale-radio');
    radios.forEach(radio => {
      expect(radio.classes()).toContain('ale-radio--large');
    });
  });

  // 主题传递测试
  it('passes theme to child radios', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        theme: 'success',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    });
    const radios = wrapper.findAll('.ale-radio');
    radios.forEach(radio => {
      expect(radio.classes()).toContain('ale-radio--success');
    });
  });
});

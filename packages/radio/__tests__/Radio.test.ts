import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Radio from '../Radio.vue';

describe('Radio', () => {
  // 基础渲染测试
  it('renders correctly', () => {
    const wrapper = mount(Radio, {
      props: {
        value: 'test',
        label: 'Test Label'
      }
    });
    expect(wrapper.find('.ale-radio').exists()).toBe(true);
    expect(wrapper.find('.ale-radio__label').text()).toBe('Test Label');
  });

  // 选中状态测试
  it('shows checked state when modelValue equals value', () => {
    const wrapper = mount(Radio, {
      props: {
        modelValue: 'test',
        value: 'test'
      }
    });
    expect(wrapper.find('.ale-radio').classes()).toContain('is-checked');
  });

  // 未选中状态测试
  it('shows unchecked state when modelValue does not equal value', () => {
    const wrapper = mount(Radio, {
      props: {
        modelValue: 'other',
        value: 'test'
      }
    });
    expect(wrapper.find('.ale-radio').classes()).not.toContain('is-checked');
  });

  // 禁用状态测试
  it('disables the radio when disabled prop is true', () => {
    const wrapper = mount(Radio, {
      props: {
        value: 'test',
        disabled: true
      }
    });
    expect(wrapper.find('.ale-radio').classes()).toContain('is-disabled');
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  // 不同尺寸测试
  it('applies correct size class', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    sizes.forEach(size => {
      const wrapper = mount(Radio, {
        props: {
          value: 'test',
          size
        }
      });
      expect(wrapper.find('.ale-radio').classes()).toContain(`ale-radio--${size}`);
    });
  });

  // 不同主题测试
  it('applies correct theme class', () => {
    const themes = ['primary', 'success', 'warning', 'danger'] as const;
    themes.forEach(theme => {
      const wrapper = mount(Radio, {
        props: {
          value: 'test',
          theme
        }
      });
      expect(wrapper.find('.ale-radio').classes()).toContain(`ale-radio--${theme}`);
    });
  });

  // 点击事件测试
  it('emits change event when clicked', async () => {
    const wrapper = mount(Radio, {
      props: {
        value: 'test'
      }
    });
    await wrapper.find('input').trigger('change');
    expect(wrapper.emitted()).toHaveProperty('change');
    expect(wrapper.emitted('change')?.[0]).toEqual(['test']);
  });

  // 受控模式测试
  it('works in controlled mode', async () => {
    const wrapper = mount(Radio, {
      props: {
        modelValue: 'other',
        value: 'test'
      }
    });
    await wrapper.find('input').trigger('change');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test']);
  });

  // slot 内容测试
  it('renders slot content', () => {
    const wrapper = mount(Radio, {
      props: {
        value: 'test'
      },
      slots: {
        default: 'Slot Content'
      }
    });
    expect(wrapper.find('.ale-radio__label').text()).toBe('Slot Content');
  });

  // aria 属性测试
  it('has correct aria attributes', () => {
    const wrapper = mount(Radio, {
      props: {
        modelValue: 'test',
        value: 'test',
        disabled: true
      }
    });
    expect(wrapper.attributes('aria-checked')).toBe('true');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.attributes('role')).toBe('radio');
  });
});

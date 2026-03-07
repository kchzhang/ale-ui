import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Switch from '../Switch.vue';

describe('Switch', () => {
  // 基础渲染测试
  it('renders correctly', () => {
    const wrapper = mount(Switch);
    expect(wrapper.find('.ale-switch').exists()).toBe(true);
    expect(wrapper.find('.ale-switch__core').exists()).toBe(true);
    expect(wrapper.find('.ale-switch__thumb').exists()).toBe(true);
  });

  // 选中状态测试
  it('shows checked state when modelValue is true', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true
      }
    });
    expect(wrapper.find('.ale-switch').classes()).toContain('is-checked');
    expect(wrapper.find('input').element.checked).toBe(true);
  });

  // 未选中状态测试
  it('shows unchecked state when modelValue is false', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    });
    expect(wrapper.find('.ale-switch').classes()).not.toContain('is-checked');
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  // 禁用状态测试
  it('disables the switch when disabled prop is true', () => {
    const wrapper = mount(Switch, {
      props: {
        disabled: true
      }
    });
    expect(wrapper.find('.ale-switch').classes()).toContain('is-disabled');
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  // 加载状态测试
  it('shows loading state when loading prop is true', () => {
    const wrapper = mount(Switch, {
      props: {
        loading: true
      }
    });
    expect(wrapper.find('.ale-switch').classes()).toContain('is-loading');
    expect(wrapper.find('.ale-switch__loading-icon').exists()).toBe(true);
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  // 不同尺寸测试
  it('applies correct size class', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    sizes.forEach(size => {
      const wrapper = mount(Switch, {
        props: { size }
      });
      expect(wrapper.find('.ale-switch').classes()).toContain(`ale-switch--${size}`);
    });
  });

  // 不同主题测试
  it('applies correct theme class', () => {
    const themes = ['primary', 'success', 'warning', 'danger'] as const;
    themes.forEach(theme => {
      const wrapper = mount(Switch, {
        props: { theme }
      });
      expect(wrapper.find('.ale-switch').classes()).toContain(`ale-switch--${theme}`);
    });
  });

  // 点击切换测试
  it('toggles state when clicked', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    });
    
    await wrapper.find('.ale-switch').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    expect(wrapper.emitted()).toHaveProperty('change');
    expect(wrapper.emitted('change')?.[0]).toEqual([true]);
  });

  // 禁用状态下点击测试
  it('does not toggle when disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true
      }
    });
    
    await wrapper.find('.ale-switch').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  // 加载状态下点击测试
  it('does not toggle when loading', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        loading: true
      }
    });
    
    await wrapper.find('.ale-switch').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  // 文本显示测试 - 打开状态
  it('displays active text when checked', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeText: '开启',
        inactiveText: '关闭'
      }
    });
    expect(wrapper.find('.ale-switch__label').text()).toBe('开启');
  });

  // 文本显示测试 - 关闭状态
  it('displays inactive text when unchecked', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeText: '开启',
        inactiveText: '关闭'
      }
    });
    expect(wrapper.find('.ale-switch__label').text()).toBe('关闭');
  });

  // 无文本时不显示标签
  it('does not render label when no text provided', () => {
    const wrapper = mount(Switch);
    expect(wrapper.find('.ale-switch__label').exists()).toBe(false);
  });

  // 点击事件测试
  it('emits click event when clicked', async () => {
    const wrapper = mount(Switch);
    await wrapper.find('.ale-switch').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  // 非受控模式测试
  it('works in uncontrolled mode', async () => {
    const wrapper = mount(Switch, {
      props: {
        defaultChecked: false
      }
    });
    
    expect(wrapper.find('.ale-switch').classes()).not.toContain('is-checked');
    
    await wrapper.find('.ale-switch').trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([true]);
    // 非受控模式下，不触发 update:modelValue
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  // 自定义类名测试
  it('applies custom class', () => {
    const wrapper = mount(Switch, {
      props: {
        customClass: 'my-custom-class'
      }
    });
    expect(wrapper.find('.ale-switch').classes()).toContain('my-custom-class');
  });

  // aria 属性测试
  it('has correct aria attributes', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        disabled: true
      }
    });
    expect(wrapper.attributes('aria-checked')).toBe('true');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.attributes('role')).toBe('switch');
  });

  // 焦点方法测试
  it('exposes focus and blur methods', async () => {
    const wrapper = mount(Switch);
    const input = wrapper.find('input').element;
    
    // 模拟 focus 方法
    const focusSpy = vi.spyOn(input, 'focus');
    (wrapper.vm as any).focus();
    expect(focusSpy).toHaveBeenCalled();
    
    // 模拟 blur 方法
    const blurSpy = vi.spyOn(input, 'blur');
    (wrapper.vm as any).blur();
    expect(blurSpy).toHaveBeenCalled();
  });

  // 自定义颜色测试 - 打开状态
  it('applies active color when checked', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeColor: '#ff0000'
      }
    });
    const core = wrapper.find('.ale-switch__core');
    expect(core.attributes('style')).toContain('background-color: rgb(255, 0, 0)');
  });

  // 自定义颜色测试 - 关闭状态
  it('applies inactive color when unchecked', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        inactiveColor: '#cccccc'
      }
    });
    const core = wrapper.find('.ale-switch__core');
    expect(core.attributes('style')).toContain('background-color: rgb(204, 204, 204)');
  });

  // 状态变化时的行为测试
  it('maintains correct state through multiple toggles', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    });
    
    // 第一次点击 - 打开
    await wrapper.find('.ale-switch').trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([true]);
    
    // 更新 props 模拟外部状态变化
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find('.ale-switch').classes()).toContain('is-checked');
    
    // 第二次点击 - 关闭
    await wrapper.find('.ale-switch').trigger('click');
    expect(wrapper.emitted('change')?.[1]).toEqual([false]);
  });

  // 输入框 change 事件处理
  it('handles input change event', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false
      }
    });
    
    const input = wrapper.find('input');
    await input.trigger('change');
    
    expect(wrapper.emitted()).toHaveProperty('change');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });
});

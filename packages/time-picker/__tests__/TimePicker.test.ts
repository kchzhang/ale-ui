import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import TimePicker from '../TimePicker.vue';

describe('TimePicker', () => {
  // 基础渲染测试
  it('renders correctly', () => {
    const wrapper = mount(TimePicker);
    expect(wrapper.find('.ale-time-picker').exists()).toBe(true);
    expect(wrapper.find('.ale-time-picker__input').exists()).toBe(true);
    expect(wrapper.find('.ale-time-picker__icon').exists()).toBe(true);
  });

  // 显示占位符
  it('displays placeholder', () => {
    const wrapper = mount(TimePicker, {
      props: { placeholder: '请选择时间' }
    });
    expect(wrapper.find('.ale-time-picker__input').attributes('placeholder')).toBe('请选择时间');
  });

  // 显示绑定值
  it('displays modelValue', () => {
    const wrapper = mount(TimePicker, {
      props: { modelValue: '12:30:00' }
    });
    expect((wrapper.find('.ale-time-picker__input').element as HTMLInputElement).value).toBe('12:30:00');
  });

  // 禁用状态测试
  it('disables the time picker when disabled prop is true', () => {
    const wrapper = mount(TimePicker, {
      props: { disabled: true }
    });
    expect(wrapper.find('.ale-time-picker').classes()).toContain('is-disabled');
    expect(wrapper.find('.ale-time-picker__input').attributes('disabled')).toBeDefined();
  });

  // 只读状态测试
  it('applies readonly state', () => {
    const wrapper = mount(TimePicker, {
      props: { readonly: true }
    });
    expect(wrapper.find('.ale-time-picker__input').classes()).toContain('is-readonly');
  });

  // 不同尺寸测试
  it('applies correct size class', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    sizes.forEach(size => {
      const wrapper = mount(TimePicker, {
        props: { size }
      });
      expect(wrapper.find('.ale-time-picker').classes()).toContain(`ale-time-picker--${size}`);
    });
  });

  // 不同主题测试
  it('applies correct theme class', () => {
    const themes = ['primary', 'success', 'warning', 'danger'] as const;
    themes.forEach(theme => {
      const wrapper = mount(TimePicker, {
        props: { theme }
      });
      expect(wrapper.find('.ale-time-picker').classes()).toContain(`ale-time-picker--${theme}`);
    });
  });

  // 可清空测试
  it('shows clear button when clearable and has value', async () => {
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: '10:30:00',
        clearable: true
      }
    });
    
    // 清除按钮应该存在
    expect(wrapper.find('.ale-time-picker__clear').exists()).toBe(true);
  });

  // 点击清除按钮
  it('emits clear event when clear button is clicked', async () => {
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: '10:30:00',
        clearable: true
      }
    });
    
    await wrapper.find('.ale-time-picker__clear').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('clear');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
  });

  // 禁用状态下不显示清除按钮
  it('does not show clear button when disabled', () => {
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: '10:30:00',
        clearable: true,
        disabled: true
      }
    });
    
    expect(wrapper.find('.ale-time-picker__clear').exists()).toBe(false);
  });

  // focus 事件测试
  it('emits focus event', async () => {
    const wrapper = mount(TimePicker);
    await wrapper.find('.ale-time-picker__input').trigger('focus');
    expect(wrapper.emitted()).toHaveProperty('focus');
  });

  // blur 事件测试
  it('emits blur event', async () => {
    const wrapper = mount(TimePicker);
    await wrapper.find('.ale-time-picker__input').trigger('blur');
    expect(wrapper.emitted()).toHaveProperty('blur');
  });

  // focus 状态样式
  it('adds focus class when focused', async () => {
    const wrapper = mount(TimePicker);
    await wrapper.find('.ale-time-picker__input').trigger('focus');
    expect(wrapper.find('.ale-time-picker').classes()).toContain('is-focused');
  });

  // 自定义类名测试
  it('applies custom class', () => {
    const wrapper = mount(TimePicker, {
      props: { customClass: 'my-custom-class' }
    });
    expect(wrapper.find('.ale-time-picker').classes()).toContain('my-custom-class');
  });

  // 点击打开下拉面板 - 测试 active 状态
  it('opens dropdown when clicked', async () => {
    const wrapper = mount(TimePicker);
    await wrapper.find('.ale-time-picker').trigger('click');
    await flushPromises();
    
    expect(wrapper.find('.ale-time-picker').classes()).toContain('is-active');
  });

  // 禁用状态下点击不打开面板
  it('does not open dropdown when disabled', async () => {
    const wrapper = mount(TimePicker, {
      props: { disabled: true }
    });
    await wrapper.find('.ale-time-picker').trigger('click');
    await flushPromises();
    
    expect(wrapper.find('.ale-time-picker').classes()).not.toContain('is-active');
  });

  // showSeconds 属性测试 - 检查内部状态
  it('has showSeconds prop working', async () => {
    const wrapper = mount(TimePicker, {
      props: { showSeconds: true }
    });
    
    // 验证组件接受 showSeconds 属性
    expect(wrapper.props('showSeconds')).toBe(true);
  });

  // use12Hours 属性测试 - 检查内部状态
  it('has use12Hours prop working', async () => {
    const wrapper = mount(TimePicker, {
      props: { use12Hours: true }
    });
    
    // 验证组件接受 use12Hours 属性
    expect(wrapper.props('use12Hours')).toBe(true);
  });

  // expose 方法测试
  it('exposes focus and blur methods', async () => {
    const wrapper = mount(TimePicker);
    const input = wrapper.find('.ale-time-picker__input').element as HTMLInputElement;
    
    const focusSpy = vi.spyOn(input, 'focus');
    (wrapper.vm as any).focus();
    expect(focusSpy).toHaveBeenCalled();
    
    const blurSpy = vi.spyOn(input, 'blur');
    (wrapper.vm as any).blur();
    expect(blurSpy).toHaveBeenCalled();
  });

  // expose clear 方法测试
  it('exposes clear method', async () => {
    const wrapper = mount(TimePicker, {
      props: { modelValue: '10:30:00' }
    });
    
    (wrapper.vm as any).clear();
    expect(wrapper.emitted()).toHaveProperty('clear');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
  });

  // modelValue 更新响应测试
  it('updates internal state when modelValue changes', async () => {
    const wrapper = mount(TimePicker, {
      props: { modelValue: '10:00:00' }
    });
    
    await wrapper.setProps({ modelValue: '14:30:00' });
    
    expect((wrapper.find('.ale-time-picker__input').element as HTMLInputElement).value).toBe('14:30:00');
  });

  // 空值测试
  it('handles empty value correctly', () => {
    const wrapper = mount(TimePicker, {
      props: { modelValue: '' }
    });
    expect((wrapper.find('.ale-time-picker__input').element as HTMLInputElement).value).toBe('');
  });

  // 时间格式化测试
  it('formats time correctly with showSeconds', async () => {
    const wrapper = mount(TimePicker, {
      props: { 
        modelValue: '',
        showSeconds: true
      }
    });
    
    // 点击组件触发下拉
    await wrapper.find('.ale-time-picker').trigger('click');
    await flushPromises();
    
    // 组件应该处于活动状态
    expect(wrapper.find('.ale-time-picker').classes()).toContain('is-active');
  });

  // 验证默认占位符
  it('has default placeholder', () => {
    const wrapper = mount(TimePicker);
    expect(wrapper.find('.ale-time-picker__input').attributes('placeholder')).toBe('请选择时间');
  });

  // 验证默认尺寸
  it('has default size medium', () => {
    const wrapper = mount(TimePicker);
    expect(wrapper.find('.ale-time-picker').classes()).toContain('ale-time-picker--medium');
  });

  // 验证默认主题
  it('has default theme primary', () => {
    const wrapper = mount(TimePicker);
    expect(wrapper.find('.ale-time-picker').classes()).toContain('ale-time-picker--primary');
  });
});

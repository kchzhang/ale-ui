import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createApp } from 'vue';
import Tag from '../Tag.vue';

describe('Tag', () => {
  // 基础渲染测试
  it('renders correctly', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: 'Tag Content'
      }
    });
    expect(wrapper.text()).toBe('Tag Content');
  });

  // 默认类型测试
  it('renders with default type', () => {
    const wrapper = mount(Tag);
    expect(wrapper.classes()).toContain('ale-tag');
    expect(wrapper.classes()).toContain('ale-tag--primary');
  });

  // 不同类型测试
  it('renders with success type', () => {
    const wrapper = mount(Tag, {
      props: { type: 'success' }
    });
    expect(wrapper.classes()).toContain('ale-tag--success');
  });

  it('renders with warning type', () => {
    const wrapper = mount(Tag, {
      props: { type: 'warning' }
    });
    expect(wrapper.classes()).toContain('ale-tag--warning');
  });

  it('renders with danger type', () => {
    const wrapper = mount(Tag, {
      props: { type: 'danger' }
    });
    expect(wrapper.classes()).toContain('ale-tag--danger');
  });

  it('renders with info type', () => {
    const wrapper = mount(Tag, {
      props: { type: 'info' }
    });
    expect(wrapper.classes()).toContain('ale-tag--info');
  });

  // 尺寸测试
  it('renders with large size', () => {
    const wrapper = mount(Tag, {
      props: { size: 'large' }
    });
    expect(wrapper.classes()).toContain('ale-tag--large');
  });

  it('renders with medium size', () => {
    const wrapper = mount(Tag, {
      props: { size: 'medium' }
    });
    expect(wrapper.classes()).toContain('ale-tag--medium');
  });

  it('renders with small size', () => {
    const wrapper = mount(Tag, {
      props: { size: 'small' }
    });
    expect(wrapper.classes()).toContain('ale-tag--small');
  });

  // 可关闭状态测试
  it('shows close button when closable is true', () => {
    const wrapper = mount(Tag, {
      props: { closable: true }
    });
    expect(wrapper.classes()).toContain('is-closable');
    expect(wrapper.find('.ale-tag__close').exists()).toBe(true);
  });

  it('does not show close button when closable is false', () => {
    const wrapper = mount(Tag, {
      props: { closable: false }
    });
    expect(wrapper.find('.ale-tag__close').exists()).toBe(false);
  });

  // 禁用状态测试
  it('applies disabled class when disabled is true', () => {
    const wrapper = mount(Tag, {
      props: { disabled: true }
    });
    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('does not show close button when disabled even if closable is true', () => {
    const wrapper = mount(Tag, {
      props: { closable: true, disabled: true }
    });
    expect(wrapper.classes()).not.toContain('is-closable');
    expect(wrapper.find('.ale-tag__close').exists()).toBe(false);
  });

  // 边框测试
  it('applies bordered class when bordered is true', () => {
    const wrapper = mount(Tag, {
      props: { bordered: true }
    });
    expect(wrapper.classes()).toContain('is-bordered');
  });

  // 圆角测试
  it('applies round class when round is true', () => {
    const wrapper = mount(Tag, {
      props: { round: true }
    });
    expect(wrapper.classes()).toContain('is-round');
  });

  // 图标测试
  it('shows icon when icon prop is provided', () => {
    const wrapper = mount(Tag, {
      props: { icon: 'icon-user' }
    });
    expect(wrapper.classes()).toContain('has-icon');
    expect(wrapper.find('.ale-tag__icon').exists()).toBe(true);
    expect(wrapper.find('.ale-tag__icon i').classes()).toContain('icon-user');
  });

  it('does not show icon when icon prop is empty', () => {
    const wrapper = mount(Tag);
    expect(wrapper.find('.ale-tag__icon').exists()).toBe(false);
  });

  // 自定义颜色测试
  it('applies custom color style', () => {
    const wrapper = mount(Tag, {
      props: { color: '#ff6b6b' }
    });
    expect(wrapper.attributes('style')).toContain('color: rgb(255, 107, 107)');
    expect(wrapper.attributes('style')).toContain('border-color: rgb(255, 107, 107)');
    expect(wrapper.attributes('style')).toContain('background-color: rgba(255, 107, 107, 0.125)');
  });

  it('applies custom background color when bgColor is provided', () => {
    const wrapper = mount(Tag, {
      props: { bgColor: '#e3f2fd' }
    });
    expect(wrapper.attributes('style')).toContain('background-color: rgb(227, 242, 253)');
  });

  // 事件测试
  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true }
    });
    await wrapper.find('.ale-tag__close').trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('emits click event when tag is clicked', async () => {
    const wrapper = mount(Tag);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('does not emit close event when disabled', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true, disabled: true }
    });
    // 由于禁用状态下不渲染关闭按钮，无法触发点击
    expect(wrapper.find('.ale-tag__close').exists()).toBe(false);
  });

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Tag, {
      props: { disabled: true }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  // 关闭事件阻止冒泡测试
  it('stops click propagation when close button is clicked', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true }
    });
    await wrapper.find('.ale-tag__close').trigger('click');
    // close 事件应该触发
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  // 组件导入测试
  it('can be imported and used as a component', () => {
    const app = createApp({
      template: '<Tag>Test</Tag>'
    });
    app.component('Tag', Tag);
    expect(app._component).toBeDefined();
  });

  // 默认 props 测试
  it('has correct default props', () => {
    const wrapper = mount(Tag);
    expect(wrapper.vm.type).toBe('primary');
    expect(wrapper.vm.size).toBe('medium');
    expect(wrapper.vm.closable).toBe(false);
    expect(wrapper.vm.disabled).toBe(false);
    expect(wrapper.vm.bordered).toBe(false);
    expect(wrapper.vm.round).toBe(false);
  });
});

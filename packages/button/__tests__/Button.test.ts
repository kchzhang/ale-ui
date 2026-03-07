import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createApp } from 'vue';
import Button from '../Button.vue';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    });
    expect(wrapper.text()).toBe('Click me');
  });

  it('renders with default type', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('ale-button--default');
  });

  it('renders with primary type', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' }
    });
    expect(wrapper.classes()).toContain('ale-button--primary');
  });

  it('renders with danger type', () => {
    const wrapper = mount(Button, {
      props: { type: 'danger' }
    });
    expect(wrapper.classes()).toContain('ale-button--danger');
  });

  it('renders with success type', () => {
    const wrapper = mount(Button, {
      props: { type: 'success' }
    });
    expect(wrapper.classes()).toContain('ale-button--success');
  });

  it('renders with warning type', () => {
    const wrapper = mount(Button, {
      props: { type: 'warning' }
    });
    expect(wrapper.classes()).toContain('ale-button--warning');
  });

  it('renders with large size', () => {
    const wrapper = mount(Button, {
      props: { size: 'large' }
    });
    expect(wrapper.classes()).toContain('ale-button--large');
  });

  it('renders with medium size', () => {
    const wrapper = mount(Button, {
      props: { size: 'medium' }
    });
    expect(wrapper.classes()).toContain('ale-button--medium');
  });

  it('renders with small size', () => {
    const wrapper = mount(Button, {
      props: { size: 'small' }
    });
    expect(wrapper.classes()).toContain('ale-button--small');
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    });
    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('shows loading state', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    });
    expect(wrapper.classes()).toContain('is-loading');
    expect(wrapper.find('.ale-button__loading').exists()).toBe(true);
  });

  it('renders block button', () => {
    const wrapper = mount(Button, {
      props: { block: true }
    });
    expect(wrapper.classes()).toContain('is-block');
  });

  it('renders plain button', () => {
    const wrapper = mount(Button, {
      props: { plain: true }
    });
    expect(wrapper.classes()).toContain('is-plain');
  });

  it('renders round button', () => {
    const wrapper = mount(Button, {
      props: { round: true }
    });
    expect(wrapper.classes()).toContain('is-round');
  });

  it('renders circle button', () => {
    const wrapper = mount(Button, {
      props: { circle: true }
    });
    expect(wrapper.classes()).toContain('is-circle');
  });

  it('emits click event', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('sets native type attribute', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' }
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('renders with default native type', () => {
    const wrapper = mount(Button);
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('can be imported and used as a component', () => {
    const app = createApp({
      template: '<Button>Test</Button>'
    });
    app.component('Button', Button);
    expect(app._component).toBeDefined();
  });
});

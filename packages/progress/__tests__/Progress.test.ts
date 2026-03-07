import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Progress from '../Progress.vue';

describe('Progress', () => {
  // ==================== 基础渲染测试 ====================

  it('renders correctly', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    });
    expect(wrapper.find('.ale-progress').exists()).toBe(true);
  });

  it('renders line progress by default', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    });
    expect(wrapper.classes()).toContain('ale-progress--line');
    expect(wrapper.find('.ale-progress-bar').exists()).toBe(true);
  });

  it('renders with default props', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 0 }
    });
    expect(wrapper.find('.ale-progress-bar__outer').exists()).toBe(true);
    expect(wrapper.find('.ale-progress__text').exists()).toBe(true);
  });

  // ==================== Props 测试 ====================

  it('applies correct percentage', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 75 }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('width: 75%');
  });

  it('displays correct percentage text', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 42 }
    });
    expect(wrapper.find('.ale-progress__text').text()).toBe('42%');
  });

  it('applies correct type class', () => {
    const types = ['line', 'circle'] as const;

    types.forEach((type) => {
      const wrapper = mount(Progress, {
        props: { percentage: 50, type }
      });
      expect(wrapper.classes()).toContain(`ale-progress--${type}`);
      wrapper.unmount();
    });
  });

  it('applies correct status class', () => {
    const statuses = ['success', 'warning', 'danger'] as const;

    statuses.forEach((status) => {
      const wrapper = mount(Progress, {
        props: { percentage: 100, status }
      });
      expect(wrapper.classes()).toContain(`is-${status}`);
      wrapper.unmount();
    });
  });

  it('applies custom stroke width for line progress', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, strokeWidth: 10 }
    });
    expect(wrapper.find('.ale-progress-bar__outer').attributes('style')).toContain('height: 10px');
  });

  it('hides text when showText is false', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, showText: false }
    });
    expect(wrapper.find('.ale-progress__text').exists()).toBe(false);
  });

  // ==================== 颜色测试 ====================

  it('applies custom color', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, color: '#ff0000' }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('background-color');
  });

  it('applies color function', () => {
    const colorFn = (percentage: number) => {
      if (percentage < 30) return '#ff0000';
      if (percentage < 70) return '#ffff00';
      return '#00ff00';
    };

    const wrapper = mount(Progress, {
      props: { percentage: 50, color: colorFn }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('background-color');
  });

  it('applies success color when status is success', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, status: 'success' }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('var(--color-success)');
  });

  it('applies warning color when status is warning', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, status: 'warning' }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('var(--color-warning)');
  });

  it('applies danger color when status is danger', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, status: 'danger' }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('var(--color-danger)');
  });

  // ==================== 条纹效果测试 ====================

  it('applies striped class when striped is true', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, striped: true }
    });
    expect(wrapper.find('.ale-progress-bar__inner').classes()).toContain('is-striped');
  });

  it('applies striped-flow class when stripedFlow is true', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, stripedFlow: true }
    });
    expect(wrapper.find('.ale-progress-bar__inner').classes()).toContain('is-striped-flow');
  });

  // ==================== 状态图标测试 ====================

  it('displays success icon when status is success', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, status: 'success' }
    });
    const icon = wrapper.find('.ale-progress__text .ale-progress__icon');
    expect(icon.exists()).toBe(true);
  });

  it('displays warning icon when status is warning', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, status: 'warning' }
    });
    const icon = wrapper.find('.ale-progress__text .ale-progress__icon');
    expect(icon.exists()).toBe(true);
  });

  it('displays danger icon when status is danger', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, status: 'danger' }
    });
    const icon = wrapper.find('.ale-progress__text .ale-progress__icon');
    expect(icon.exists()).toBe(true);
  });

  // ==================== 环形进度条测试 ====================

  it('renders circle progress correctly', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, type: 'circle' }
    });
    expect(wrapper.find('.ale-progress-circle').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.find('.ale-progress-circle__track').exists()).toBe(true);
    expect(wrapper.find('.ale-progress-circle__path').exists()).toBe(true);
  });

  it('renders circle progress with custom width', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, type: 'circle', width: 200 }
    });
    const circle = wrapper.find('.ale-progress-circle');
    expect(circle.attributes('style')).toContain('width: 200px');
    expect(circle.attributes('style')).toContain('height: 200px');
  });

  it('renders circle progress with text', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, type: 'circle' }
    });
    expect(wrapper.find('.ale-progress-circle__text').exists()).toBe(true);
    expect(wrapper.find('.ale-progress-circle__text').text()).toBe('50%');
  });

  it('renders circle progress with status icon', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100, type: 'circle', status: 'success' }
    });
    expect(wrapper.find('.ale-progress-circle__text .ale-progress__icon').exists()).toBe(true);
  });

  // ==================== 暴露方法测试 ====================

  it('exposes getPercentage method', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 75 }
    });
    expect((wrapper.vm as any).getPercentage()).toBe(75);
  });

  // ==================== 边界条件测试 ====================

  it('handles 0 percentage', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 0 }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('width: 0%');
  });

  it('handles 100 percentage', () => {
    const wrapper = mount(Progress, {
      props: { percentage: 100 }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('width: 100%');
  });

  // ==================== 响应式测试 ====================

  it('updates percentage reactively', async () => {
    const wrapper = mount(Progress, {
      props: { percentage: 30 }
    });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('width: 30%');

    await wrapper.setProps({ percentage: 60 });
    expect(wrapper.find('.ale-progress-bar__inner').attributes('style')).toContain('width: 60%');
  });

  it('updates status reactively', async () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50 }
    });
    expect(wrapper.classes()).not.toContain('is-success');

    await wrapper.setProps({ status: 'success' });
    expect(wrapper.classes()).toContain('is-success');
  });

  it('updates type reactively', async () => {
    const wrapper = mount(Progress, {
      props: { percentage: 50, type: 'line' }
    });
    expect(wrapper.find('.ale-progress-bar').exists()).toBe(true);

    await wrapper.setProps({ type: 'circle' });
    expect(wrapper.find('.ale-progress-circle').exists()).toBe(true);
  });
});

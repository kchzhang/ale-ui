import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Loading from '../Loading.vue';

describe('Loading', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // 基础渲染测试
  it('renders correctly', async () => {
    const wrapper = mount(Loading);
    await flushPromises();
    expect(wrapper.find('.ale-loading').exists()).toBe(true);
    expect(wrapper.find('.ale-loading__content').exists()).toBe(true);
  });

  // 默认类型测试 - circular
  it('renders circular type by default', async () => {
    const wrapper = mount(Loading);
    await flushPromises();
    expect(wrapper.find('.ale-loading--circular').exists()).toBe(true);
    expect(wrapper.find('.ale-loading__spinner--circular').exists()).toBe(true);
    expect(wrapper.find('.ale-loading__circular').exists()).toBe(true);
  });

  // spinner 类型测试
  it('renders spinner type correctly', async () => {
    const wrapper = mount(Loading, {
      props: { type: 'spinner' }
    });
    await flushPromises();
    expect(wrapper.find('.ale-loading--spinner').exists()).toBe(true);
    expect(wrapper.find('.ale-loading__spinner--spinner').exists()).toBe(true);
    expect(wrapper.findAll('.ale-loading__spinner-item').length).toBe(12);
  });

  // dots 类型测试
  it('renders dots type correctly', async () => {
    const wrapper = mount(Loading, {
      props: { type: 'dots' }
    });
    await flushPromises();
    expect(wrapper.find('.ale-loading--dots').exists()).toBe(true);
    expect(wrapper.find('.ale-loading__spinner--dots').exists()).toBe(true);
    expect(wrapper.findAll('.ale-loading__dot').length).toBe(3);
  });

  // 尺寸测试
  it('applies correct size classes', async () => {
    const sizes = ['small', 'medium', 'large'] as const;
    for (const size of sizes) {
      const wrapper = mount(Loading, {
        props: { size }
      });
      await flushPromises();
      expect(wrapper.find('.ale-loading').classes()).toContain(`ale-loading--${size}`);
    }
  });

  // 主题测试
  it('applies correct theme classes', async () => {
    const themes = ['primary', 'success', 'warning', 'danger'] as const;
    for (const theme of themes) {
      const wrapper = mount(Loading, {
        props: { theme }
      });
      await flushPromises();
      expect(wrapper.find('.ale-loading').classes()).toContain(`ale-loading--${theme}`);
    }
  });

  // 文本显示测试
  it('displays text when provided', async () => {
    const wrapper = mount(Loading, {
      props: { text: '加载中...' }
    });
    await flushPromises();
    expect(wrapper.find('.ale-loading__text').exists()).toBe(true);
    expect(wrapper.find('.ale-loading__text').text()).toBe('加载中...');
  });

  // 无文本时不渲染文本元素
  it('does not render text element when no text provided', async () => {
    const wrapper = mount(Loading);
    await flushPromises();
    expect(wrapper.find('.ale-loading__text').exists()).toBe(false);
  });

  // 垂直排列测试
  it('applies vertical class when vertical prop is true', async () => {
    const wrapper = mount(Loading, {
      props: { vertical: true, text: '加载中' }
    });
    await flushPromises();
    expect(wrapper.find('.ale-loading').classes()).toContain('is-vertical');
  });

  // 遮罩层测试
  it('shows overlay when overlay prop is true', async () => {
    const wrapper = mount(Loading, {
      props: { overlay: true }
    });
    await flushPromises();
    expect(wrapper.find('.ale-loading').classes()).toContain('is-overlay');
    expect(wrapper.find('.ale-loading__overlay').exists()).toBe(true);
  });

  // 全屏模式测试
  it('shows fullscreen mode when fullscreen prop is true', async () => {
    const wrapper = mount(Loading, {
      props: { fullscreen: true }
    });
    await flushPromises();
    expect(wrapper.find('.ale-loading').classes()).toContain('is-fullscreen');
    expect(wrapper.find('.ale-loading__overlay').exists()).toBe(true);
  });

  // 自定义颜色测试
  it('applies custom color when color prop is provided', async () => {
    const wrapper = mount(Loading, {
      props: { color: '#ff0000' }
    });
    await flushPromises();
    expect(wrapper.attributes('style')).toContain('--loading-color: #ff0000');
  });

  // 遮罩层自定义颜色测试 - 旧属性 overlayColor
  it('applies custom overlay color when overlayColor prop is provided', async () => {
    const wrapper = mount(Loading, {
      props: { overlay: true, overlayColor: 'rgba(0, 0, 0, 0.5)' }
    });
    await flushPromises();
    const overlay = wrapper.find('.ale-loading__overlay');
    expect(overlay.attributes('style')).toContain('background-color: rgba(0, 0, 0, 0.5)');
  });

  // 遮罩层自定义背景色测试 - 新属性 overlayBackground
  it('applies custom overlay background when overlayBackground prop is provided', async () => {
    const wrapper = mount(Loading, {
      props: { overlay: true, overlayBackground: 'rgba(0, 0, 0, 0.7)' }
    });
    await flushPromises();
    const overlay = wrapper.find('.ale-loading__overlay');
    expect(overlay.attributes('style')).toContain('background-color: rgba(0, 0, 0, 0.7)');
  });

  // 遮罩层透明度测试 - overlayOpacity
  it('applies custom overlay opacity when overlayOpacity prop is provided', async () => {
    const wrapper = mount(Loading, {
      props: { overlay: true, overlayOpacity: 0.5 }
    });
    await flushPromises();
    const overlay = wrapper.find('.ale-loading__overlay');
    expect(overlay.attributes('style')).toContain('background-color: rgba(255, 255, 255, 0.5)');
  });

  // 遮罩层透明度默认值测试
  it('uses default overlay opacity of 0.9 when not specified', async () => {
    const wrapper = mount(Loading, {
      props: { overlay: true }
    });
    await flushPromises();
    const overlay = wrapper.find('.ale-loading__overlay');
    expect(overlay.attributes('style')).toContain('background-color: rgba(255, 255, 255, 0.9)');
  });

  // 优先级测试：overlayColor 优先于 overlayBackground
  it('gives priority to overlayColor over overlayBackground', async () => {
    const wrapper = mount(Loading, {
      props: {
        overlay: true,
        overlayColor: 'rgba(255, 0, 0, 0.8)',
        overlayBackground: 'rgba(0, 0, 255, 0.8)'
      }
    });
    await flushPromises();
    const overlay = wrapper.find('.ale-loading__overlay');
    expect(overlay.attributes('style')).toContain('background-color: rgba(255, 0, 0, 0.8)');
  });

  // 优先级测试：overlayBackground 优先于 overlayOpacity
  it('gives priority to overlayBackground over overlayOpacity', async () => {
    const wrapper = mount(Loading, {
      props: {
        overlay: true,
        overlayBackground: 'rgba(0, 0, 0, 0.3)',
        overlayOpacity: 0.5
      }
    });
    await flushPromises();
    const overlay = wrapper.find('.ale-loading__overlay');
    expect(overlay.attributes('style')).toContain('background-color: rgba(0, 0, 0, 0.3)');
  });

  // 自定义类名测试
  it('applies custom class when customClass prop is provided', async () => {
    const wrapper = mount(Loading, {
      props: { customClass: 'my-custom-loading' }
    });
    await flushPromises();
    expect(wrapper.find('.ale-loading').classes()).toContain('my-custom-loading');
  });

  // 延迟显示测试
  it('delays showing when delay prop is provided', async () => {
    const wrapper = mount(Loading, {
      props: { delay: 200 }
    });
    await flushPromises();

    // 初始状态不可见
    expect(wrapper.isVisible()).toBe(false);

    // 延迟时间未到
    vi.advanceTimersByTime(100);
    await flushPromises();
    expect(wrapper.isVisible()).toBe(false);

    // 超过延迟时间
    vi.advanceTimersByTime(150);
    await flushPromises();
    expect(wrapper.isVisible()).toBe(true);
  });

  // 延迟显示 - 立即隐藏测试
  it('does not show if hide is called before delay ends', async () => {
    const wrapper = mount(Loading, {
      props: { delay: 200 }
    });
    await flushPromises();

    expect(wrapper.isVisible()).toBe(false);

    // 在延迟结束前调用 hide
    vi.advanceTimersByTime(100);
    (wrapper.vm as any).hide();
    await flushPromises();

    // 超过原定延迟时间
    vi.advanceTimersByTime(200);
    await flushPromises();
    expect(wrapper.isVisible()).toBe(false);
  });

  // 点击事件测试
  it('emits click event when clicked', async () => {
    const wrapper = mount(Loading);
    await flushPromises();
    await wrapper.find('.ale-loading').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  // expose 方法测试 - show
  it('exposes show method', async () => {
    const wrapper = mount(Loading, {
      props: { delay: 0 }
    });
    await flushPromises();

    // 先隐藏
    (wrapper.vm as any).hide();
    await flushPromises();

    // 调用 show 方法
    (wrapper.vm as any).show();
    await flushPromises();

    expect(wrapper.isVisible()).toBe(true);
  });

  // expose 方法测试 - hide
  it('exposes hide method', async () => {
    const wrapper = mount(Loading);
    await flushPromises();

    expect(wrapper.isVisible()).toBe(true);

    (wrapper.vm as any).hide();
    await flushPromises();

    expect(wrapper.isVisible()).toBe(false);
  });

  // 组件卸载时清除定时器
  it('clears timer when unmounted', async () => {
    const wrapper = mount(Loading, {
      props: { delay: 500 }
    });
    await flushPromises();

    // 触发延迟
    vi.advanceTimersByTime(100);

    // 卸载组件
    wrapper.unmount();

    // 不应该报错，且不应该显示
    vi.advanceTimersByTime(600);
    // 如果定时器未清除，这里可能会出错
  });

  // 组合属性测试 - 带遮罩和文本
  it('renders correctly with overlay and text', async () => {
    const wrapper = mount(Loading, {
      props: {
        overlay: true,
        text: '正在加载数据...',
        type: 'spinner',
        size: 'large',
        theme: 'success'
      }
    });
    await flushPromises();

    expect(wrapper.find('.ale-loading').classes()).toContain('is-overlay');
    expect(wrapper.find('.ale-loading--spinner').exists()).toBe(true);
    expect(wrapper.find('.ale-loading--large').exists()).toBe(true);
    expect(wrapper.find('.ale-loading--success').exists()).toBe(true);
    expect(wrapper.find('.ale-loading__text').text()).toBe('正在加载数据...');
  });

  // 默认尺寸测试
  it('applies medium size by default', async () => {
    const wrapper = mount(Loading);
    await flushPromises();
    expect(wrapper.find('.ale-loading').classes()).toContain('ale-loading--medium');
  });

  // 默认主题测试
  it('applies primary theme by default', async () => {
    const wrapper = mount(Loading);
    await flushPromises();
    expect(wrapper.find('.ale-loading').classes()).toContain('ale-loading--primary');
  });

  // SVG 属性测试
  it('circular type has correct SVG attributes', async () => {
    const wrapper = mount(Loading, {
      props: { type: 'circular' }
    });
    await flushPromises();

    const svg = wrapper.find('.ale-loading__spinner--circular');
    expect(svg.attributes('viewBox')).toBe('0 0 50 50');

    const circle = wrapper.find('.ale-loading__circular');
    expect(circle.attributes('cx')).toBe('25');
    expect(circle.attributes('cy')).toBe('25');
    expect(circle.attributes('r')).toBe('20');
  });
});

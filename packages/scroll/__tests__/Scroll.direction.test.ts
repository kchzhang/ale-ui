import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Scroll from '../Scroll.vue';

describe('Scroll 方向和滚动测试', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    global.ResizeObserver = class ResizeObserver {
      constructor(callback: ResizeObserverCallback) {}
      observe(target: Element) {}
      unobserve(target: Element) {}
      disconnect() {}
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // 水平滚动功能测试
  it('horizontal direction allows horizontal scrolling', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal', height: '100px' },
      slots: {
        default: '<div style="width: 2000px; height: 50px;">Wide Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    
    // 模拟内容溢出
    Object.defineProperty(content, 'scrollWidth', { value: 2000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollHeight', { value: 50, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 100, configurable: true });

    // 触发更新
    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 水平滚动条应该可见
    const horizontalBar = wrapper.find('.ale-scroll__bar--horizontal');
    expect(horizontalBar.exists()).toBe(true);
    expect(horizontalBar.classes()).toContain('is-visible');

    // 内容区域应该有水平滚动能力
    expect(content.scrollWidth).toBeGreaterThan(content.clientWidth);
  });

  // 双向滚动功能测试
  it('both direction allows both vertical and horizontal scrolling', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'both', height: '150px' },
      slots: {
        default: '<div style="width: 2000px; height: 2000px;">Large Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    
    // 模拟内容溢出
    Object.defineProperty(content, 'scrollWidth', { value: 2000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollHeight', { value: 2000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 150, configurable: true });

    // 触发更新
    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 两个滚动条都应该可见
    const verticalBar = wrapper.find('.ale-scroll__bar--vertical');
    const horizontalBar = wrapper.find('.ale-scroll__bar--horizontal');
    
    expect(verticalBar.exists()).toBe(true);
    expect(horizontalBar.exists()).toBe(true);
    expect(verticalBar.classes()).toContain('is-visible');
    expect(horizontalBar.classes()).toContain('is-visible');

    // 内容区域应该有两个方向的滚动能力
    expect(content.scrollWidth).toBeGreaterThan(content.clientWidth);
    expect(content.scrollHeight).toBeGreaterThan(content.clientHeight);
  });

  // 水平滚动 emit 事件测试
  it('emits scroll-to-right when scrolling horizontally to right', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal', loadOffset: 0 },
      slots: {
        default: '<div style="width: 1000px; height: 50px;">Wide Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollLeft = 1000;
    
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('scroll-to-right');
  });

  // 水平滚动 emit scroll-to-left 事件测试
  it('emits scroll-to-left when scrolling horizontally to left', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal' },
      slots: {
        default: '<div style="width: 1000px; height: 50px;">Wide Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollLeft = 0;
    
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('scroll-to-left');
  });

  // 测试水平滚动时垂直滚动条不显示
  it('does not show vertical scrollbar in horizontal mode even with overflow', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal' },
      slots: {
        default: '<div style="width: 1000px; height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟两个方向都有溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 100, configurable: true });

    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 在水平模式下垂直滚动条不应该渲染 (v-if)
    expect(wrapper.find('.ale-scroll__bar--vertical').exists()).toBe(false);

    // 水平滚动条应该渲染且可见
    const horizontalBar = wrapper.find('.ale-scroll__bar--horizontal');
    expect(horizontalBar.exists()).toBe(true);
    expect(horizontalBar.classes()).toContain('is-visible');
  });

  // 测试垂直滚动时水平滚动条不显示
  it('does not show horizontal scrollbar in vertical mode even with overflow', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'vertical' },
      slots: {
        default: '<div style="width: 1000px; height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟两个方向都有溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 100, configurable: true });

    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 在垂直模式下水平滚动条不应该渲染 (v-if)
    expect(wrapper.find('.ale-scroll__bar--horizontal').exists()).toBe(false);

    // 垂直滚动条应该渲染且可见
    const verticalBar = wrapper.find('.ale-scroll__bar--vertical');
    expect(verticalBar.exists()).toBe(true);
    expect(verticalBar.classes()).toContain('is-visible');
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Scroll from '../Scroll.vue';

describe('Scroll', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock ResizeObserver as a proper class
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

  // 1. 基础渲染测试
  it('renders correctly', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();
    expect(wrapper.find('.ale-scroll').exists()).toBe(true);
    expect(wrapper.find('.ale-scroll__content').exists()).toBe(true);
  });

  // 2. 主题测试
  it('applies correct theme classes', async () => {
    const themes = ['default', 'primary', 'dark'] as const;
    for (const theme of themes) {
      const wrapper = mount(Scroll, {
        props: { theme }
      });
      await flushPromises();
      expect(wrapper.find('.ale-scroll').classes()).toContain(`ale-scroll--${theme}`);
    }
  });

  // 3. 尺寸测试
  it('applies correct size classes', async () => {
    const sizes = ['small', 'medium', 'large'] as const;
    for (const size of sizes) {
      const wrapper = mount(Scroll, {
        props: { size }
      });
      await flushPromises();
      expect(wrapper.find('.ale-scroll').classes()).toContain(`ale-scroll--${size}`);
    }
  });

  // 4. 方向测试
  it('applies correct direction classes', async () => {
    const directions = ['vertical', 'horizontal', 'both'] as const;
    for (const direction of directions) {
      const wrapper = mount(Scroll, {
        props: { direction }
      });
      await flushPromises();
      expect(wrapper.find('.ale-scroll').classes()).toContain(`ale-scroll--${direction}`);
    }
  });

  // 5. 高度设置测试
  it('applies correct height style', async () => {
    const wrapper = mount(Scroll, {
      props: { height: 300 }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').attributes('style')).toContain('height: 300px');
  });

  // 6. 高度字符串测试
  it('applies correct height style with string value', async () => {
    const wrapper = mount(Scroll, {
      props: { height: '50vh' }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').attributes('style')).toContain('height: 50vh');
  });

  // 7. 最大高度测试
  it('applies correct max-height style', async () => {
    const wrapper = mount(Scroll, {
      props: { maxHeight: 400 }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').attributes('style')).toContain('max-height: 400px');
  });

  // 8. 原生滚动条模式测试
  it('applies native class when native prop is true', async () => {
    const wrapper = mount(Scroll, {
      props: { native: true }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-native');
    expect(wrapper.find('.ale-scroll__content').classes()).toContain('is-native');
  });

  // 9. 始终显示滚动条测试
  it('applies always class when always prop is true', async () => {
    const wrapper = mount(Scroll, {
      props: { always: true }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-always');
  });

  // 10. 禁用状态测试
  it('applies disabled class when disabled prop is true', async () => {
    const wrapper = mount(Scroll, {
      props: { disabled: true }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-disabled');
  });

  // 11. 自定义类名测试
  it('applies custom class when customClass prop is provided', async () => {
    const wrapper = mount(Scroll, {
      props: { customClass: 'my-custom-scroll' }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('my-custom-scroll');
  });

  // 12. 平滑滚动测试
  it('applies smooth class when smooth prop is true', async () => {
    const wrapper = mount(Scroll, {
      props: { smooth: true }
    });
    await flushPromises();
    expect(wrapper.find('.ale-scroll__content').classes()).toContain('is-smooth');
  });

  // 13. 滚动事件测试
  it('emits scroll event when scrolling', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollTop = 100;
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('scroll');
    const scrollEvent = wrapper.emitted('scroll')![0];
    expect(scrollEvent[0]).toHaveProperty('scrollTop');
    expect(scrollEvent[0]).toHaveProperty('scrollLeft');
    expect(scrollEvent[1]).toHaveProperty('scrollWidth');
    expect(scrollEvent[1]).toHaveProperty('scrollHeight');
  });

  // 14. 滚动到底部事件测试
  it('emits scroll-to-bottom when scrolled to bottom', async () => {
    const wrapper = mount(Scroll, {
      props: { loadOffset: 0 },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollTop = 1000;
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('scroll-to-bottom');
  });

  // 15. 滚动到顶部事件测试
  it('emits scroll-to-top when scrolled to top', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollTop = 0;
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('scroll-to-top');
  });

  // 16. 加载更多事件测试
  it('emits load-more when scrolled to bottom', async () => {
    const wrapper = mount(Scroll, {
      props: { loadOffset: 0 },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollTop = 1000;
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('load-more');
  });

  // 17. 鼠标进入事件测试
  it('applies hovering class on mouse enter', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();

    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    expect(wrapper.find('.ale-scroll').classes()).toContain('is-hovering');
  });

  // 18. 鼠标离开事件测试
  it('removes hovering class on mouse leave', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();

    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-hovering');

    await wrapper.find('.ale-scroll').trigger('mouseleave');
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).not.toContain('is-hovering');
  });

  // 19. 垂直滚动条渲染测试 - 悬停时显示
  it('renders vertical scrollbar when content overflows on hover', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'vertical' },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 300, configurable: true });

    // 触发更新
    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 滚动条应该渲染且可见
    const verticalBar = wrapper.find('.ale-scroll__bar--vertical');
    expect(verticalBar.exists()).toBe(true);
    expect(verticalBar.classes()).toContain('is-visible');
  });

  // 20. 水平滚动条渲染测试 - 悬停时显示
  it('renders horizontal scrollbar when content overflows on hover', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal' },
      slots: {
        default: '<div style="width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });

    // 触发更新
    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 滚动条应该渲染且可见
    const horizontalBar = wrapper.find('.ale-scroll__bar--horizontal');
    expect(horizontalBar.exists()).toBe(true);
    expect(horizontalBar.classes()).toContain('is-visible');
  });

  // 21. expose 方法测试 - scrollTo
  it('exposes scrollTo method', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const scrollToMock = vi.fn();
    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollTo = scrollToMock;

    (wrapper.vm as any).scrollTo({ top: 100, behavior: 'smooth' });
    await flushPromises();

    expect(scrollToMock).toHaveBeenCalledWith({ top: 100, behavior: 'smooth' });
  });

  // 22. expose 方法测试 - scrollToTop
  it('exposes scrollToTop method', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const scrollToMock = vi.fn();
    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollTo = scrollToMock;

    (wrapper.vm as any).scrollToTop();
    await flushPromises();

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  // 23. expose 方法测试 - scrollToBottom
  it('exposes scrollToBottom method', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });

    const scrollToMock = vi.fn();
    content.scrollTo = scrollToMock;

    (wrapper.vm as any).scrollToBottom();
    await flushPromises();

    expect(scrollToMock).toHaveBeenCalledWith({ top: 1000, behavior: 'smooth' });
  });

  // 24. expose 方法测试 - getScrollPosition
  it('exposes getScrollPosition method', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollTop = 150;
    content.scrollLeft = 50;

    const position = (wrapper.vm as any).getScrollPosition();

    expect(position).toEqual({ scrollTop: 150, scrollLeft: 50 });
  });

  // 25. expose 方法测试 - getScrollSize
  it('exposes getScrollSize method', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div style="height: 1000px; width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'scrollHeight', { value: 2000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 400, configurable: true });

    const size = (wrapper.vm as any).getScrollSize();

    expect(size).toEqual({
      scrollWidth: 1000,
      scrollHeight: 2000,
      clientWidth: 300,
      clientHeight: 400
    });
  });

  // 26. expose 方法测试 - update
  it('exposes update method', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();

    // update 方法应该可以正常调用
    expect(() => {
      (wrapper.vm as any).update();
    }).not.toThrow();
  });

  // 27. 默认主题测试
  it('applies default theme by default', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('ale-scroll--default');
  });

  // 28. 默认尺寸测试
  it('applies medium size by default', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('ale-scroll--medium');
  });

  // 29. 默认方向测试
  it('applies vertical direction by default', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('ale-scroll--vertical');
  });

  // 30. 禁用时不触发滚动事件
  it('does not emit scroll events when disabled', async () => {
    const wrapper = mount(Scroll, {
      props: { disabled: true },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    // 禁用状态下不应该触发事件
    expect(wrapper.emitted('scroll')).toBeFalsy();
  });

  // 31. 插槽内容渲染测试
  it('renders slot content correctly', async () => {
    const wrapper = mount(Scroll, {
      slots: {
        default: '<div class="test-content">Test Content</div>'
      }
    });
    await flushPromises();

    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.find('.test-content').text()).toBe('Test Content');
  });

  // 32. 双向滚动模式测试
  it('renders both scrollbars in both direction mode', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'both' },
      slots: {
        default: '<div style="height: 1000px; width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });

    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    expect(wrapper.find('.ale-scroll__bar--vertical').exists()).toBe(true);
    expect(wrapper.find('.ale-scroll__bar--horizontal').exists()).toBe(true);
  });

  // 33. 最小滚动条尺寸测试
  it('respects minSize prop for scrollbar thumb', async () => {
    const wrapper = mount(Scroll, {
      props: { minSize: 30 },
      slots: {
        default: '<div style="height: 10000px;">Content</div>'
      }
    });
    await flushPromises();

    expect(wrapper.vm.$props.minSize).toBe(30);
  });

  // 34. 加载偏移量测试
  it('respects loadOffset prop', async () => {
    const wrapper = mount(Scroll, {
      props: { loadOffset: 50 },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    expect(wrapper.vm.$props.loadOffset).toBe(50);
  });

  // 35. 组件卸载清理测试
  it('cleans up event listeners on unmount', async () => {
    const wrapper = mount(Scroll);
    await flushPromises();

    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    wrapper.unmount();

    // 验证清理函数被调用
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  // 36. 虚拟滚动属性测试
  it('accepts virtual scroll props', async () => {
    const wrapper = mount(Scroll, {
      props: {
        virtual: true,
        itemHeight: 50,
        total: 1000
      }
    });
    await flushPromises();

    expect(wrapper.vm.$props.virtual).toBe(true);
    expect(wrapper.vm.$props.itemHeight).toBe(50);
    expect(wrapper.vm.$props.total).toBe(1000);
  });

  // 37. 滚动到最右事件测试
  it('emits scroll-to-right when scrolled to right', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal', loadOffset: 0 },
      slots: {
        default: '<div style="width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollLeft = 1000;
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('scroll-to-right');
  });

  // 38. 滚动到最左事件测试
  it('emits scroll-to-left when scrolled to left', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal' },
      slots: {
        default: '<div style="width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    const content = wrapper.find('.ale-scroll__content').element;
    content.scrollLeft = 0;
    await wrapper.find('.ale-scroll__content').trigger('scroll');
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('scroll-to-left');
  });

  // 39. 垂直方向不显示水平滚动条
  it('does not show horizontal scrollbar in vertical mode', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'vertical' },
      slots: {
        default: '<div style="height: 1000px; width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 300, configurable: true });

    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 在垂直模式下水平滚动条不应该渲染 (v-if)
    expect(wrapper.find('.ale-scroll__bar--horizontal').exists()).toBe(false);
  });

  // 40. 水平方向不显示垂直滚动条
  it('does not show vertical scrollbar in horizontal mode', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal' },
      slots: {
        default: '<div style="height: 1000px; width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });

    await wrapper.find('.ale-scroll').trigger('mouseenter');
    await flushPromises();

    // 在水平模式下垂直滚动条不应该渲染 (v-if)
    expect(wrapper.find('.ale-scroll__bar--vertical').exists()).toBe(false);
  });

  // 41. 垂直滚动条拖动时添加拖动状态类名
  it('applies dragging class when vertical thumb is dragged', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'vertical', always: true },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 300, configurable: true });

    // 调用 update 方法触发滚动条更新
    (wrapper.vm as any).update();
    await flushPromises();
    vi.advanceTimersByTime(100);
    await flushPromises();

    const thumb = wrapper.find('.ale-scroll__thumb--vertical');
    expect(thumb.exists()).toBe(true);

    // 开始拖动
    await thumb.trigger('mousedown', { clientY: 100 });
    await flushPromises();

    // 验证拖动状态类名
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-dragging-vertical');

    // 结束拖动
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();

    // 验证拖动状态类名已移除
    expect(wrapper.find('.ale-scroll').classes()).not.toContain('is-dragging-vertical');
  });

  // 42. 水平滚动条拖动时添加拖动状态类名
  it('applies dragging class when horizontal thumb is dragged', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal', always: true },
      slots: {
        default: '<div style="width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });

    // 调用 update 方法触发滚动条更新
    (wrapper.vm as any).update();
    await flushPromises();
    vi.advanceTimersByTime(100);
    await flushPromises();

    const thumb = wrapper.find('.ale-scroll__thumb--horizontal');
    expect(thumb.exists()).toBe(true);

    // 开始拖动
    await thumb.trigger('mousedown', { clientX: 100 });
    await flushPromises();

    // 验证拖动状态类名
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-dragging-horizontal');

    // 结束拖动
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();

    // 验证拖动状态类名已移除
    expect(wrapper.find('.ale-scroll').classes()).not.toContain('is-dragging-horizontal');
  });

  // 43. 垂直滚动条拖动时同步更新滚动位置
  it('updates scroll position synchronously when dragging vertical thumb', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'vertical', always: true },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true
    });

    // 调用 update 方法触发滚动条更新
    (wrapper.vm as any).update();
    await flushPromises();
    vi.advanceTimersByTime(100);
    await flushPromises();

    const thumb = wrapper.find('.ale-scroll__thumb--vertical');
    const bar = wrapper.find('.ale-scroll__bar--vertical');

    expect(thumb.exists()).toBe(true);
    expect(bar.exists()).toBe(true);

    // 模拟滚动条尺寸
    Object.defineProperty(bar.element, 'clientHeight', { value: 200, configurable: true });

    // 开始拖动
    await thumb.trigger('mousedown', { clientY: 50 });
    await flushPromises();

    // 模拟拖动移动
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: 100 }));
    await flushPromises();

    // 验证滚动位置已更新（content.scrollTop 应该被设置）
    // 拖动距离 50px，滚动比例 = 50/200 = 0.25
    // 滚动位置 = 0 + 0.25 * 1000 = 250
    expect(content.scrollTop).toBeGreaterThan(0);

    // 结束拖动
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();
  });

  // 44. 水平滚动条拖动时同步更新滚动位置
  it('updates scroll position synchronously when dragging horizontal thumb', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal', always: true },
      slots: {
        default: '<div style="width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollLeft', {
      value: 0,
      writable: true,
      configurable: true
    });

    // 调用 update 方法触发滚动条更新
    (wrapper.vm as any).update();
    await flushPromises();
    vi.advanceTimersByTime(100);
    await flushPromises();

    const thumb = wrapper.find('.ale-scroll__thumb--horizontal');
    const bar = wrapper.find('.ale-scroll__bar--horizontal');

    expect(thumb.exists()).toBe(true);
    expect(bar.exists()).toBe(true);

    // 模拟滚动条尺寸
    Object.defineProperty(bar.element, 'clientWidth', { value: 200, configurable: true });

    // 开始拖动
    await thumb.trigger('mousedown', { clientX: 50 });
    await flushPromises();

    // 模拟拖动移动
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    await flushPromises();

    // 验证滚动位置已更新（content.scrollLeft 应该被设置）
    expect(content.scrollLeft).toBeGreaterThan(0);

    // 结束拖动
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();
  });

  // 45. 垂直滚动条拖动边界限制
  it('respects scroll boundaries when dragging vertical thumb', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'vertical', always: true },
      slots: {
        default: '<div style="height: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollTop', {
      value: 500,
      writable: true,
      configurable: true
    });

    // 调用 update 方法触发滚动条更新
    (wrapper.vm as any).update();
    await flushPromises();
    vi.advanceTimersByTime(100);
    await flushPromises();

    const thumb = wrapper.find('.ale-scroll__thumb--vertical');
    const bar = wrapper.find('.ale-scroll__bar--vertical');

    expect(thumb.exists()).toBe(true);
    expect(bar.exists()).toBe(true);

    // 模拟滚动条尺寸
    Object.defineProperty(bar.element, 'clientHeight', { value: 200, configurable: true });

    // 开始拖动
    await thumb.trigger('mousedown', { clientY: 100 });
    await flushPromises();

    // 模拟大幅度向上拖动（超出边界）
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: -1000 }));
    await flushPromises();

    // 滚动位置应该被限制在 0
    expect(content.scrollTop).toBe(0);

    // 结束拖动
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();
  });

  // 46. 水平滚动条拖动边界限制
  it('respects scroll boundaries when dragging horizontal thumb', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'horizontal', always: true },
      slots: {
        default: '<div style="width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollLeft', {
      value: 500,
      writable: true,
      configurable: true
    });

    // 调用 update 方法触发滚动条更新
    (wrapper.vm as any).update();
    await flushPromises();
    vi.advanceTimersByTime(100);
    await flushPromises();

    const thumb = wrapper.find('.ale-scroll__thumb--horizontal');
    const bar = wrapper.find('.ale-scroll__bar--horizontal');

    expect(thumb.exists()).toBe(true);
    expect(bar.exists()).toBe(true);

    // 模拟滚动条尺寸
    Object.defineProperty(bar.element, 'clientWidth', { value: 200, configurable: true });

    // 开始拖动
    await thumb.trigger('mousedown', { clientX: 100 });
    await flushPromises();

    // 模拟大幅度向左拖动（超出边界）
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: -1000 }));
    await flushPromises();

    // 滚动位置应该被限制在 0
    expect(content.scrollLeft).toBe(0);

    // 结束拖动
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();
  });

  // 47. 双向滚动模式下两个滚动条都可以拖动
  it('allows dragging both scrollbars in both direction mode', async () => {
    const wrapper = mount(Scroll, {
      props: { direction: 'both', always: true },
      slots: {
        default: '<div style="height: 1000px; width: 1000px;">Content</div>'
      }
    });
    await flushPromises();

    // 模拟内容溢出
    const content = wrapper.find('.ale-scroll__content').element;
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollWidth', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(content, 'scrollTop', { value: 0, writable: true, configurable: true });
    Object.defineProperty(content, 'scrollLeft', { value: 0, writable: true, configurable: true });

    // 调用 update 方法触发滚动条更新
    (wrapper.vm as any).update();
    await flushPromises();
    vi.advanceTimersByTime(100);
    await flushPromises();

    const verticalThumb = wrapper.find('.ale-scroll__thumb--vertical');
    const horizontalThumb = wrapper.find('.ale-scroll__thumb--horizontal');

    expect(verticalThumb.exists()).toBe(true);
    expect(horizontalThumb.exists()).toBe(true);

    // 测试垂直拖动
    await verticalThumb.trigger('mousedown', { clientY: 50 });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-dragging-vertical');
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();

    // 测试水平拖动
    await horizontalThumb.trigger('mousedown', { clientX: 50 });
    await flushPromises();
    expect(wrapper.find('.ale-scroll').classes()).toContain('is-dragging-horizontal');
    document.dispatchEvent(new MouseEvent('mouseup'));
    await flushPromises();
  });
});

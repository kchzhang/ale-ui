import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Message from '../Message.vue';

describe('Message', () => {
  beforeEach(() => {
    // 清理 body
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // 基础渲染测试
  it('renders correctly with default props', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const messageEl = document.querySelector('.ale-message');
    expect(messageEl).toBeTruthy();
    expect(messageEl?.textContent).toContain('测试消息');
    wrapper.unmount();
  });

  // 隐藏测试
  it('is hidden when visible is false', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        visible: false
      },
      attachTo: document.body
    });
    await flushPromises();

    const messageEl = document.querySelector('.ale-message');
    expect(messageEl).toBeTruthy();
    // v-show 会设置 display: none
    const display = window.getComputedStyle(messageEl as Element).display;
    expect(display).toBe('none');
    wrapper.unmount();
  });

  // 不同类型测试
  it('applies correct type class', async () => {
    const types = ['info', 'success', 'warning', 'error'] as const;

    for (const type of types) {
      const wrapper = mount(Message, {
        props: {
          message: '测试消息',
          type,
          visible: true
        },
        attachTo: document.body
      });
      await flushPromises();

      const messageEl = document.querySelector('.ale-message');
      expect(messageEl?.classList.contains(`ale-message--${type}`)).toBe(true);
      wrapper.unmount();
    }
  });

  // 不同位置测试
  it('applies correct position class', async () => {
    const positions = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'] as const;

    for (const position of positions) {
      const wrapper = mount(Message, {
        props: {
          message: '测试消息',
          position,
          visible: true
        },
        attachTo: document.body
      });
      await flushPromises();

      const messageEl = document.querySelector('.ale-message');
      expect(messageEl?.classList.contains(`is-${position}`)).toBe(true);
      wrapper.unmount();
    }
  });

  // 图标显示测试
  it('shows icon by default', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const iconEl = document.querySelector('.ale-message__icon');
    expect(iconEl).toBeTruthy();
    wrapper.unmount();
  });

  // 隐藏图标测试
  it('hides icon when showIcon is false', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        showIcon: false,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const iconEl = document.querySelector('.ale-message__icon');
    expect(iconEl).toBeFalsy();
    wrapper.unmount();
  });

  // 关闭按钮测试
  it('shows close button when closable is true', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        closable: true,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-message__close');
    expect(closeBtn).toBeTruthy();
    wrapper.unmount();
  });

  // 默认不显示关闭按钮测试
  it('hides close button by default', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-message__close');
    expect(closeBtn).toBeFalsy();
    wrapper.unmount();
  });

  // 关闭按钮点击测试
  it('closes message when close button is clicked', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        closable: true,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-message__close');
    await (closeBtn as HTMLElement)?.click();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('close');
    wrapper.unmount();
  });

  // 自动关闭测试
  it('auto closes after duration', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        duration: 1000,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    expect(wrapper.emitted('close')).toBeFalsy();
    
    vi.advanceTimersByTime(1000);
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('close');
    
    vi.useRealTimers();
    wrapper.unmount();
  });

  // 不自动关闭测试
  it('does not auto close when duration is 0', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        duration: 0,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    vi.advanceTimersByTime(10000);
    await flushPromises();

    expect(wrapper.emitted('close')).toBeFalsy();
    
    vi.useRealTimers();
    wrapper.unmount();
  });

  // 鼠标悬停暂停测试
  it('pauses timer on mouse enter', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        duration: 1000,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const messageEl = document.querySelector('.ale-message');
    
    // 触发鼠标进入
    await (messageEl as HTMLElement)?.dispatchEvent(new MouseEvent('mouseenter'));
    await flushPromises();

    // 前进时间
    vi.advanceTimersByTime(2000);
    await flushPromises();

    // 不应该关闭
    expect(wrapper.emitted('close')).toBeFalsy();

    // 触发鼠标离开
    await (messageEl as HTMLElement)?.dispatchEvent(new MouseEvent('mouseleave'));
    await flushPromises();

    // 再前进时间
    vi.advanceTimersByTime(1000);
    await flushPromises();

    // 应该关闭了
    expect(wrapper.emitted()).toHaveProperty('close');

    vi.useRealTimers();
    wrapper.unmount();
  });

  // 自定义类名测试
  it('applies custom class', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        customClass: 'my-custom-message',
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const messageEl = document.querySelector('.ale-message');
    const classAttr = messageEl?.getAttribute('class') || '';
    expect(classAttr.includes('my-custom-message')).toBe(true);
    wrapper.unmount();
  });

  // HTML 内容测试
  it('renders HTML content when dangerouslyUseHTMLString is true', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '<strong>粗体文本</strong>',
        dangerouslyUseHTMLString: true,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const contentEl = document.querySelector('.ale-message__content');
    expect(contentEl?.innerHTML).toContain('<strong>粗体文本</strong>');
    wrapper.unmount();
  });

  // 纯文本内容测试
  it('escapes HTML when dangerouslyUseHTMLString is false', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '<strong>粗体文本</strong>',
        dangerouslyUseHTMLString: false,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const contentEl = document.querySelector('.ale-message__content');
    expect(contentEl?.textContent).toBe('<strong>粗体文本</strong>');
    wrapper.unmount();
  });

  // 关闭按钮 aria-label 测试
  it('has correct aria-label on close button', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        closable: true,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-message__close');
    expect(closeBtn?.getAttribute('aria-label')).toBe('关闭');
    wrapper.unmount();
  });

  // role 属性测试
  it('has correct role attribute', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const messageEl = document.querySelector('.ale-message');
    expect(messageEl?.getAttribute('role')).toBe('alert');
    wrapper.unmount();
  });

  // 暴露方法测试 - close
  it('exposes close method', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        visible: true
      },
      attachTo: document.body
    });

    (wrapper.vm as any).close();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('close');
    wrapper.unmount();
  });

  // 偏移量样式测试
  it('applies correct offset style', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        offset: 50,
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const messageEl = document.querySelector('.ale-message') as HTMLElement;
    const style = messageEl?.getAttribute('style') || '';
    expect(style).toContain('50px');
    wrapper.unmount();
  });

  // 自定义图标测试
  it('renders custom icon', async () => {
    const wrapper = mount(Message, {
      props: {
        message: '测试消息',
        icon: '⭐',
        visible: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const iconEl = document.querySelector('.ale-message__icon');
    expect(iconEl?.textContent).toBe('⭐');
    wrapper.unmount();
  });
});

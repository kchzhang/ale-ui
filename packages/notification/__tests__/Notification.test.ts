import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import Notification from '../Notification.vue';
import { Notification as NotificationMethod } from '../index';

describe('Notification Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    NotificationMethod.closeAll();
    vi.clearAllTimers();
    document.body.innerHTML = '';
  });

  describe('基础渲染', () => {
    it('renders with default props', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test message'
        },
        attachTo: document.body
      });

      await flushPromises();
      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      expect(notification?.textContent).toContain('Test message');
      wrapper.unmount();
    });

    it('renders with title', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          title: 'Test Title',
          message: 'Test message'
        },
        attachTo: document.body
      });

      await flushPromises();
      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      expect(notification?.textContent).toContain('Test Title');
      wrapper.unmount();
    });

    it('has correct type classes', async () => {
      const types = ['info', 'success', 'warning', 'error'] as const;

      for (const type of types) {
        document.body.innerHTML = '';
        const wrapper = mount(Notification, {
          props: {
            visible: true,
            type,
            message: 'Test'
          },
          attachTo: document.body
        });

        await flushPromises();
        const notification = document.querySelector('.ale-notification');
        expect(notification?.classList.contains(`ale-notification--${type}`)).toBe(true);
        wrapper.unmount();
      }
    });

    it('has correct position classes', async () => {
      const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;

      for (const position of positions) {
        document.body.innerHTML = '';
        const wrapper = mount(Notification, {
          props: {
            visible: true,
            position,
            message: 'Test'
          },
          attachTo: document.body
        });

        await flushPromises();
        const notification = document.querySelector('.ale-notification');
        expect(notification?.classList.contains(`is-${position}`)).toBe(true);
        wrapper.unmount();
      }
    });

    it('renders with custom class', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          customClass: 'my-custom-class'
        },
        attachTo: document.body
      });

      await flushPromises();
      const notification = document.querySelector('.ale-notification');
      expect(notification?.classList.contains('my-custom-class')).toBe(true);
      wrapper.unmount();
    });
  });

  describe('图标显示', () => {
    it('shows icon by default', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test'
        },
        attachTo: document.body
      });

      await flushPromises();
      const icon = document.querySelector('.ale-notification__icon');
      expect(icon).toBeTruthy();
      wrapper.unmount();
    });

    it('hides icon when showIcon is false', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          showIcon: false
        },
        attachTo: document.body
      });

      await flushPromises();
      const icon = document.querySelector('.ale-notification__icon');
      expect(icon).toBeFalsy();
      wrapper.unmount();
    });

    it('renders custom icon', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          icon: '🎉'
        },
        attachTo: document.body
      });

      await flushPromises();
      const icon = document.querySelector('.ale-notification__icon');
      expect(icon).toBeTruthy();
      expect(icon?.textContent).toBe('🎉');
      wrapper.unmount();
    });
  });

  describe('关闭按钮', () => {
    it('shows close button by default', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test'
        },
        attachTo: document.body
      });

      await flushPromises();
      const closeBtn = document.querySelector('.ale-notification__close');
      expect(closeBtn).toBeTruthy();
      wrapper.unmount();
    });

    it('hides close button when closable is false', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          closable: false
        },
        attachTo: document.body
      });

      await flushPromises();
      const closeBtn = document.querySelector('.ale-notification__close');
      expect(closeBtn).toBeFalsy();
      wrapper.unmount();
    });

    it('emits close event when close button clicked', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test'
        },
        attachTo: document.body
      });

      await flushPromises();
      const closeBtn = document.querySelector('.ale-notification__close');
      expect(closeBtn).toBeTruthy();
      (closeBtn as HTMLElement).click();
      expect(wrapper.emitted('close')).toHaveLength(1);
      wrapper.unmount();
    });
  });

  describe('点击事件', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test'
        },
        attachTo: document.body
      });

      await flushPromises();
      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      (notification as HTMLElement).click();
      expect(wrapper.emitted('click')).toHaveLength(1);
      wrapper.unmount();
    });
  });

  describe('HTML 内容', () => {
    it('renders plain text by default', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: '<strong>Test</strong>'
        },
        attachTo: document.body
      });

      await flushPromises();
      const message = document.querySelector('.ale-notification__message');
      expect(message).toBeTruthy();
      expect(message?.innerHTML).toContain('&lt;strong&gt;Test&lt;/strong&gt;');
      wrapper.unmount();
    });

    it('renders HTML when dangerouslyUseHTMLString is true', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: '<strong>Test</strong>',
          dangerouslyUseHTMLString: true
        },
        attachTo: document.body
      });

      await flushPromises();
      const message = document.querySelector('.ale-notification__message');
      expect(message).toBeTruthy();
      expect(message?.querySelector('strong')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('进度条', () => {
    it('shows progress bar when showProgress is true', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          showProgress: true,
          duration: 5000
        },
        attachTo: document.body
      });

      await flushPromises();
      const progress = document.querySelector('.ale-notification__progress');
      expect(progress).toBeTruthy();
      wrapper.unmount();
    });

    it('hides progress bar when showProgress is false', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          showProgress: false
        },
        attachTo: document.body
      });

      await flushPromises();
      const progress = document.querySelector('.ale-notification__progress');
      expect(progress).toBeFalsy();
      wrapper.unmount();
    });

    it('hides progress bar when duration is 0', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          showProgress: true,
          duration: 0
        },
        attachTo: document.body
      });

      await flushPromises();
      const progress = document.querySelector('.ale-notification__progress');
      expect(progress).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('样式计算', () => {
    it('computes correct style for top-right position', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          position: 'top-right',
          offset: 50
        },
        attachTo: document.body
      });

      await flushPromises();
      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      const style = (notification as HTMLElement).style;
      expect(style.top).toBe('50px');
      expect(style.right).toBe('20px');
      wrapper.unmount();
    });

    it('computes correct style for bottom-left position', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test',
          position: 'bottom-left',
          offset: 80
        },
        attachTo: document.body
      });

      await flushPromises();
      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      const style = (notification as HTMLElement).style;
      expect(style.bottom).toBe('80px');
      expect(style.left).toBe('20px');
      wrapper.unmount();
    });
  });

  describe('关闭方法', () => {
    it('exposes close method', () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test'
        }
      });

      expect(typeof wrapper.vm.close).toBe('function');
      wrapper.unmount();
    });

    it('emits close event when exposed close method is called', async () => {
      const wrapper = mount(Notification, {
        props: {
          visible: true,
          message: 'Test'
        }
      });

      wrapper.vm.close();
      await nextTick();

      expect(wrapper.emitted('close')).toHaveLength(1);
      wrapper.unmount();
    });
  });
});

describe('Notification Global Method', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.useFakeTimers();
  });

  afterEach(() => {
    NotificationMethod.closeAll();
    vi.useRealTimers();
  });

  describe('基础调用', () => {
    it('creates notification with string parameter', async () => {
      NotificationMethod('Test message');
      await flushPromises();

      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      expect(notification?.textContent).toContain('Test message');
    });

    it('creates notification with options object', async () => {
      NotificationMethod({
        title: 'Test Title',
        message: 'Test message',
        type: 'success'
      });
      await flushPromises();

      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      expect(notification?.textContent).toContain('Test Title');
      expect(notification?.textContent).toContain('Test message');
    });

    it('returns instance with close method', async () => {
      const instance = NotificationMethod('Test');
      await flushPromises();

      expect(typeof instance.close).toBe('function');
    });
  });

  describe('类型快捷方法', () => {
    const types = ['success', 'warning', 'error', 'info'] as const;

    types.forEach(type => {
      it(`${type} method creates ${type} notification`, async () => {
        NotificationMethod[type]('Test message');
        await flushPromises();

        const notification = document.querySelector('.ale-notification');
        expect(notification?.classList.contains(`ale-notification--${type}`)).toBe(true);
      });
    });

    it('type methods accept object parameter', async () => {
      NotificationMethod.success({
        title: 'Success',
        message: 'Operation completed'
      });
      await flushPromises();

      const notification = document.querySelector('.ale-notification');
      expect(notification?.textContent?.includes('Success')).toBe(true);
      expect(notification?.textContent?.includes('Operation completed')).toBe(true);
    });
  });

  describe('位置设置', () => {
    const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;

    positions.forEach(position => {
      it(`creates notification at ${position}`, async () => {
        NotificationMethod({
          message: 'Test',
          position
        });
        await flushPromises();

        const notification = document.querySelector('.ale-notification');
        expect(notification?.classList.contains(`is-${position}`)).toBe(true);
      });
    });
  });

  describe('回调函数', () => {
    it('calls onClose callback when closed', async () => {
      const onClose = vi.fn();

      NotificationMethod({
        message: 'Test',
        onClose
      });
      await flushPromises();

      const closeBtn = document.querySelector('.ale-notification__close');
      (closeBtn as HTMLElement)?.click();

      vi.advanceTimersByTime(600);
      await flushPromises();

      expect(onClose).toHaveBeenCalled();
    });

    it('calls onClick callback when clicked', async () => {
      const onClick = vi.fn();

      NotificationMethod({
        message: 'Test',
        onClick
      });
      await flushPromises();

      const notification = document.querySelector('.ale-notification');
      (notification as HTMLElement)?.click();

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('closeAll', () => {
    it('closes all notifications', async () => {
      NotificationMethod('Message 1');
      NotificationMethod('Message 2');
      NotificationMethod('Message 3');
      await flushPromises();

      let notifications = document.querySelectorAll('.ale-notification');
      expect(notifications.length).toBe(3);

      NotificationMethod.closeAll();
      vi.advanceTimersByTime(1000);
      await flushPromises();

      // 检查是否都设置了 display: none
      notifications = document.querySelectorAll('.ale-notification');
      const allHidden = Array.from(notifications).every(n => {
        return (n as HTMLElement).style.display === 'none';
      });
      expect(allHidden).toBe(true);
    });
  });

  describe('自动关闭', () => {
    it('auto closes after duration', async () => {
      NotificationMethod({
        message: 'Test',
        duration: 3000
      });
      await flushPromises();

      let notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      expect((notification as HTMLElement).style.display).not.toBe('none');

      vi.advanceTimersByTime(4000);
      await flushPromises();

      // 检查是否设置了 display: none
      notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
      expect((notification as HTMLElement).style.display).toBe('none');
    });

    it('does not auto close when duration is 0', async () => {
      NotificationMethod({
        message: 'Test',
        duration: 0
      });
      await flushPromises();

      vi.advanceTimersByTime(10000);
      await flushPromises();

      const notification = document.querySelector('.ale-notification');
      expect(notification).toBeTruthy();
    });
  });
});

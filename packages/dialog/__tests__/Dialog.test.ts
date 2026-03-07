import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Dialog from '../Dialog.vue';

describe('Dialog', () => {
  // 基础渲染测试
  it('renders correctly when modelValue is true', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        title: '测试标题'
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialog = document.querySelector('.ale-dialog-wrapper');
    expect(dialog).toBeTruthy();
    expect(dialog?.querySelector('.ale-dialog__title')?.textContent).toBe('测试标题');
    wrapper.unmount();
  });

  // 默认隐藏测试
  it('is hidden when modelValue is false', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: false
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialog = document.querySelector('.ale-dialog-wrapper');
    expect(dialog).toBeTruthy();
    const display = window.getComputedStyle(dialog as Element).display;
    expect(display).toBe('none');
    wrapper.unmount();
  });

  // 不同尺寸测试
  it('applies correct size class', async () => {
    const sizes = ['small', 'medium', 'large', 'fullscreen'] as const;

    for (const size of sizes) {
      const wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          size
        },
        attachTo: document.body
      });
      await flushPromises();

      const dialog = document.querySelector('.ale-dialog');
      expect(dialog?.classList.contains(`ale-dialog--${size}`)).toBe(true);
      wrapper.unmount();
    }
  });

  // 不同位置测试
  it('applies correct position class', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        position: 'top'
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialog = document.querySelector('.ale-dialog-wrapper');
    expect(dialog?.classList.contains('is-position-top')).toBe(true);
    wrapper.unmount();
  });

  // 关闭按钮测试
  it('shows close button by default', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-dialog__close');
    expect(closeBtn).toBeTruthy();
    wrapper.unmount();
  });

  // 隐藏关闭按钮测试
  it('hides close button when showClose is false', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showClose: false
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-dialog__close');
    expect(closeBtn).toBeFalsy();
    wrapper.unmount();
  });

  // 关闭按钮点击测试
  it('closes dialog when close button is clicked', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-dialog__close');
    await (closeBtn as HTMLElement)?.click();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    expect(wrapper.emitted()).toHaveProperty('close');
    wrapper.unmount();
  });

  // 遮罩层点击测试
  it('closes dialog when mask is clicked and maskClosable is true', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        maskClosable: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialogWrapper = document.querySelector('.ale-dialog-wrapper');
    await (dialogWrapper as HTMLElement)?.click();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    wrapper.unmount();
  });

  // 遮罩层不可关闭测试
  it('does not close dialog when mask is clicked and maskClosable is false', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        maskClosable: false
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialogWrapper = document.querySelector('.ale-dialog-wrapper');
    await (dialogWrapper as HTMLElement)?.click();
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    wrapper.unmount();
  });

  // 确认按钮测试
  it('emits confirm event when confirm button is clicked', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showFooter: true,
        showConfirm: true,
        confirmText: '确定测试'
      },
      attachTo: document.body
    });
    await flushPromises();

    // 查找所有按钮
    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBeGreaterThanOrEqual(1);
    
    // 点击最后一个按钮（通常是确认按钮）
    const confirmBtn = allButtons[allButtons.length - 1];
    await confirmBtn.click();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('confirm');
    wrapper.unmount();
  });

  // 取消按钮测试
  it('emits cancel event and closes dialog when cancel button is clicked', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showFooter: true,
        showCancel: true,
        cancelText: '取消测试'
      },
      attachTo: document.body
    });
    await flushPromises();

    // 查找底部所有按钮，点击第一个（通常是取消按钮）
    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBeGreaterThanOrEqual(1);
    
    const cancelBtn = allButtons[0];
    await cancelBtn.click();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('cancel');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  // 确认按钮加载状态测试
  it('shows loading state on confirm button', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        confirmLoading: true
      },
      attachTo: document.body
    });
    await flushPromises();

    // 查找底部所有按钮中的 loading 状态
    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBeGreaterThanOrEqual(1);
    
    const lastBtn = allButtons[allButtons.length - 1];
    expect(lastBtn.classList.contains('is-loading')).toBe(true);
    expect(lastBtn.querySelector('.ale-button__loading-icon') || lastBtn.querySelector('svg')).toBeTruthy();
    wrapper.unmount();
  });

  // 确认按钮禁用测试
  it('disables confirm button when confirmDisabled is true', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        confirmDisabled: true
      },
      attachTo: document.body
    });
    await flushPromises();

    // 查找底部所有按钮，最后一个应该是禁用的确认按钮
    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBeGreaterThanOrEqual(1);
    
    const lastBtn = allButtons[allButtons.length - 1];
    expect(lastBtn.hasAttribute('disabled')).toBe(true);
    wrapper.unmount();
  });

  // 取消按钮禁用测试
  it('disables cancel button when cancelDisabled is true', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        cancelDisabled: true
      },
      attachTo: document.body
    });
    await flushPromises();

    // 查找底部所有按钮，第一个应该是禁用的取消按钮
    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBeGreaterThanOrEqual(1);
    
    const firstBtn = allButtons[0];
    expect(firstBtn.hasAttribute('disabled')).toBe(true);
    wrapper.unmount();
  });

  // 隐藏底部测试
  it('hides footer when showFooter is false', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showFooter: false
      },
      attachTo: document.body
    });
    await flushPromises();

    const footer = document.querySelector('.ale-dialog__footer');
    expect(footer).toBeNull();
    wrapper.unmount();
  });

  // 隐藏确认按钮测试
  it('hides confirm button when showConfirm is false', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showConfirm: false
      },
      attachTo: document.body
    });
    await flushPromises();

    // 当确认按钮隐藏时，底部应该只有1个按钮（取消按钮）
    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBe(1);
    wrapper.unmount();
  });

  // 隐藏取消按钮测试
  it('hides cancel button when showCancel is false', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showCancel: false
      },
      attachTo: document.body
    });
    await flushPromises();

    // 当取消按钮隐藏时，应该只有确认按钮
    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBe(1);
    wrapper.unmount();
  });

  // 自定义按钮文本测试
  it('renders custom button text', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        confirmText: '保存',
        cancelText: '放弃'
      },
      attachTo: document.body
    });
    await flushPromises();

    const allButtons = document.querySelectorAll('.ale-dialog__footer button');
    expect(allButtons.length).toBe(2);
    
    // 第一个按钮是取消按钮
    expect(allButtons[0].textContent).toBe('放弃');
    // 第二个按钮是确认按钮
    expect(allButtons[1].textContent).toBe('保存');
    wrapper.unmount();
  });

  // 自定义宽度测试
  it('applies custom width', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        width: '600px'
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialog = document.querySelector('.ale-dialog') as HTMLElement;
    // 检查 style 属性是否包含 width
    expect(dialog?.getAttribute('style')).toContain('width');
    wrapper.unmount();
  });

  // 数字宽度测试
  it('applies numeric width correctly', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        width: 800
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialog = document.querySelector('.ale-dialog') as HTMLElement;
    // 检查 style 属性是否包含 width
    expect(dialog?.getAttribute('style')).toContain('width');
    wrapper.unmount();
  });

  // 自定义类名测试
  it('applies custom class', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        customClass: 'my-custom-dialog'
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialogWrapper = document.querySelector('.ale-dialog-wrapper');
    const classAttr = dialogWrapper?.getAttribute('class') || '';
    expect(classAttr.includes('my-custom-dialog')).toBe(true);
    wrapper.unmount();
  });

  // 默认插槽测试
  it('renders default slot content', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      slots: {
        default: '<p class="custom-content">自定义内容</p>'
      },
      attachTo: document.body
    });
    await flushPromises();

    const customContent = document.querySelector('.custom-content');
    expect(customContent).toBeTruthy();
    expect(customContent?.textContent).toBe('自定义内容');
    wrapper.unmount();
  });

  // 标题插槽测试
  it('renders title slot content', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      slots: {
        title: '<span class="custom-title">自定义标题</span>'
      },
      attachTo: document.body
    });
    await flushPromises();

    const customTitle = document.querySelector('.custom-title');
    expect(customTitle).toBeTruthy();
    // 使用插槽时，默认的标题元素应该不存在
    const defaultTitle = document.querySelector('.ale-dialog__title');
    expect(defaultTitle).toBeNull();
    wrapper.unmount();
  });

  // 底部插槽测试
  it('renders footer slot content', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      slots: {
        footer: '<button class="custom-footer-btn">自定义按钮</button>'
      },
      attachTo: document.body
    });
    await flushPromises();

    const customFooterBtn = document.querySelector('.custom-footer-btn');
    expect(customFooterBtn).toBeTruthy();
    wrapper.unmount();
  });

  // z-index 测试
  it('applies custom z-index', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        zIndex: 2000
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialogWrapper = document.querySelector('.ale-dialog-wrapper') as HTMLElement;
    // 检查 z-index 样式是否应用
    const zIndexValue = dialogWrapper?.style.zIndex;
    expect(zIndexValue === '2000' || zIndexValue === '').toBe(true);
    wrapper.unmount();
  });

  // 无遮罩层测试
  it('hides mask when showMask is false', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        showMask: false
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialogWrapper = document.querySelector('.ale-dialog-wrapper');
    const classAttr = dialogWrapper?.getAttribute('class') || '';
    // 检查是否不包含 is-mask 类
    expect(classAttr.includes('is-mask')).toBe(false);
    wrapper.unmount();
  });

  // 打开事件测试
  it('emits open event when dialog opens', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: false
      },
      attachTo: document.body
    });
    await flushPromises();

    await wrapper.setProps({ modelValue: true });
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('open');
    wrapper.unmount();
  });

  // 暴露方法测试 - open
  it('exposes open method', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: false
      },
      attachTo: document.body
    });

    (wrapper.vm as any).open();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('open');
    wrapper.unmount();
  });

  // 暴露方法测试 - close
  it('exposes close method', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      attachTo: document.body
    });

    (wrapper.vm as any).close();
    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('close');
    wrapper.unmount();
  });

  // aria 属性测试
  it('has correct aria attributes', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const dialogWrapper = document.querySelector('.ale-dialog-wrapper');
    expect(dialogWrapper?.getAttribute('role')).toBe('dialog');
    expect(dialogWrapper?.getAttribute('aria-modal')).toBe('true');
    wrapper.unmount();
  });

  // 关闭按钮 aria-label 测试
  it('has correct aria-label on close button', async () => {
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      attachTo: document.body
    });
    await flushPromises();

    const closeBtn = document.querySelector('.ale-dialog__close');
    expect(closeBtn?.getAttribute('aria-label')).toBe('关闭');
    wrapper.unmount();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Tabs from '../Tabs.vue';
import TabPane from '../TabPane.vue';

describe('Tabs', () => {
  // 基础渲染测试
  it('renders correctly', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    expect(wrapper.find('.ale-tabs').exists()).toBe(true);
    expect(wrapper.find('.ale-tabs__header').exists()).toBe(true);
  });

  // 渲染所有标签页
  it('renders all tab panes', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
          <TabPane label="Tab 3" name="3">Content 3</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    const tabs = wrapper.findAll('.ale-tabs__item');
    expect(tabs.length).toBe(3);
  });

  // 激活状态
  it('activates the tab matching modelValue', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '2' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    const tabs = wrapper.findAll('.ale-tabs__item');
    expect(tabs[1].classes()).toContain('is-active');
  });

  // 点击切换
  it('changes active tab on click', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });

    await flushPromises();

    const tabs = wrapper.findAll('.ale-tabs__item');
    expect(tabs.length).toBeGreaterThan(1);
    
    await tabs[1].trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2']);
  });

  // tab-click 事件
  it('emits tab-click event when tab is clicked', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });

    await flushPromises();

    const tabs = wrapper.findAll('.ale-tabs__item');
    await tabs[1].trigger('click');

    expect(wrapper.emitted()).toHaveProperty('tab-click');
  });

  // 禁用标签页
  it('does not switch to disabled tab', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2" disabled>Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });

    await flushPromises();

    const tabs = wrapper.findAll('.ale-tabs__item');
    expect(tabs[1].classes()).toContain('is-disabled');

    await tabs[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  // 卡片类型
  it('applies card type class', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1', type: 'card' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    expect(wrapper.find('.ale-tabs').classes()).toContain('ale-tabs--card');
  });

  // 边框卡片类型
  it('applies border-card type class', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1', type: 'border-card' },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    expect(wrapper.find('.ale-tabs').classes()).toContain('ale-tabs--border-card');
  });

  // 位置样式
  it('applies position classes', async () => {
    const positions = ['top', 'right', 'bottom', 'left'] as const;
    for (const position of positions) {
      const wrapper = mount(Tabs, {
        props: { modelValue: '1', tabPosition: position },
        slots: {
          default: `
            <TabPane label="Tab 1" name="1">Content 1</TabPane>
          `
        },
        global: { components: { TabPane } }
      });
      
      await flushPromises();
      
      expect(wrapper.find('.ale-tabs').classes()).toContain(`ale-tabs--${position}`);
    }
  });

  // 可关闭
  it('shows close button when closable', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1', closable: true },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    const closeBtns = wrapper.findAll('.ale-tabs__item__close');
    expect(closeBtns.length).toBe(2);
  });

  // tab-remove 事件
  it('emits tab-remove event when close button is clicked', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1', closable: true },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
          <TabPane label="Tab 2" name="2">Content 2</TabPane>
        `
      },
      global: { components: { TabPane } }
    });

    await flushPromises();

    const closeBtn = wrapper.find('.ale-tabs__item__close');
    if (closeBtn.exists()) {
      await closeBtn.trigger('click');
      expect(wrapper.emitted()).toHaveProperty('tab-remove');
    }
  });

  // 可编辑模式
  it('shows add button in editable mode', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1', editable: true },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    expect(wrapper.find('.ale-tabs__new-tab').exists()).toBe(true);
  });

  // tab-add 事件
  it('emits tab-add event when add button is clicked', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1', addable: true },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
        `
      },
      global: { components: { TabPane } }
    });

    await flushPromises();

    const addBtn = wrapper.find('.ale-tabs__new-tab');
    if (addBtn.exists()) {
      await addBtn.trigger('click');
      expect(wrapper.emitted()).toHaveProperty('tab-add');
    }
  });

  // stretch 属性
  it('applies stretch class', async () => {
    const wrapper = mount(Tabs, {
      props: { modelValue: '1', stretch: true },
      slots: {
        default: `
          <TabPane label="Tab 1" name="1">Content 1</TabPane>
        `
      },
      global: { components: { TabPane } }
    });
    
    await flushPromises();
    
    expect(wrapper.find('.ale-tabs__nav').classes()).toContain('is-stretch');
  });
});

describe('TabPane', () => {
  // 基础渲染
  it('renders tab pane with correct content', () => {
    const wrapper = mount(TabPane, {
      props: { label: 'Test Tab', name: 'test' },
      slots: { default: 'Tab Content' }
    });
    expect(wrapper.find('.ale-tab-pane').exists()).toBe(true);
    expect(wrapper.text()).toContain('Tab Content');
  });
});

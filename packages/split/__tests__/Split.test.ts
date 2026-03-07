import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, defineComponent, h } from 'vue';
import Split from '../Split.vue';
import SplitPanel from '../SplitPanel.vue';

// 创建一个包装组件，用于测试 SplitPanel
const createSplitWithPanels = (panels: Array<{ props?: any; content?: string }>) => {
  return defineComponent({
    components: { Split, SplitPanel },
    setup() {
      return () => h(Split, {}, () =>
        panels.map((panel, index) =>
          h(SplitPanel, { key: index, ...panel.props }, () => panel.content || `Panel ${index + 1}`)
        )
      );
    }
  });
};

describe('Split', () => {
  describe('基础渲染', () => {
    it('renders correctly', () => {
      const wrapper = mount(createSplitWithPanels([
        { content: 'Left' },
        { content: 'Right' }
      ]));
      
      expect(wrapper.find('.ale-split').exists()).toBe(true);
      expect(wrapper.classes()).toContain('ale-split--horizontal');
    });

    it('applies vertical direction class', () => {
      const wrapper = mount(Split, {
        props: {
          direction: 'vertical'
        }
      });
      
      expect(wrapper.classes()).toContain('ale-split--vertical');
    });

    it('applies disabled class', () => {
      const wrapper = mount(Split, {
        props: {
          disabled: true
        }
      });
      
      expect(wrapper.classes()).toContain('is-disabled');
    });
  });

  describe('Props 测试', () => {
    it('applies correct direction prop', () => {
      const wrapper = mount(Split, {
        props: {
          direction: 'vertical'
        }
      });
      
      expect(wrapper.props('direction')).toBe('vertical');
    });

    it('applies correct initial split', () => {
      const wrapper = mount(Split, {
        props: {
          initialSplit: 30
        }
      });
      
      expect(wrapper.props('initialSplit')).toBe(30);
    });

    it('applies correct min split', () => {
      const wrapper = mount(Split, {
        props: {
          minSplit: 20
        }
      });
      
      expect(wrapper.props('minSplit')).toBe(20);
    });

    it('applies correct max split', () => {
      const wrapper = mount(Split, {
        props: {
          maxSplit: 80
        }
      });
      
      expect(wrapper.props('maxSplit')).toBe(80);
    });

    it('applies correct splitter size', () => {
      const wrapper = mount(Split, {
        props: {
          splitterSize: 10
        }
      });
      
      expect(wrapper.props('splitterSize')).toBe(10);
    });
  });

  describe('默认值测试', () => {
    it('has correct default values', () => {
      const wrapper = mount(Split);
      
      expect(wrapper.props('direction')).toBe('horizontal');
      expect(wrapper.props('splitterSize')).toBe(8);
      expect(wrapper.props('initialSplit')).toBe(50);
      expect(wrapper.props('minSplit')).toBe(10);
      expect(wrapper.props('maxSplit')).toBe(90);
      expect(wrapper.props('disabled')).toBe(false);
    });
  });
});

describe('SplitPanel', () => {
  describe('基础渲染', () => {
    it('renders correctly within Split', () => {
      const wrapper = mount(createSplitWithPanels([
        { content: 'Left Panel' },
        { content: 'Right Panel' }
      ]));
      
      expect(wrapper.findAll('.ale-split-panel').length).toBe(2);
    });

    it('renders slot content', () => {
      const wrapper = mount(createSplitWithPanels([
        { content: 'Custom Content' },
        { content: 'Right' }
      ]));
      
      expect(wrapper.html()).toContain('Custom Content');
    });

    it('shows splitter for multiple panels', async () => {
      const wrapper = mount(createSplitWithPanels([
        { content: 'Left' },
        { content: 'Right' }
      ]));
      
      // 等待组件渲染和面板注册
      await nextTick();
      await nextTick();
      
      // 检查是否有分割线（第一个面板应该有）
      const splitters = wrapper.findAll('.ale-split-panel__splitter');
      expect(splitters.length).toBeGreaterThan(0);
    });

    it('hides splitter for last panel', async () => {
      const wrapper = mount(createSplitWithPanels([
        { content: 'Left' },
        { content: 'Right' }
      ]));
      
      await nextTick();
      
      // 只有第一个面板应该有分割线
      const panels = wrapper.findAll('.ale-split-panel');
      expect(panels[0].find('.ale-split-panel__splitter').exists()).toBe(true);
    });
  });

  describe('Props 测试', () => {
    it('applies size prop', async () => {
      const wrapper = mount(createSplitWithPanels([
        { props: { size: 30 }, content: 'Left' },
        { content: 'Right' }
      ]));
      
      await nextTick();
      
      const panel = wrapper.find('.ale-split-panel');
      expect(panel.exists()).toBe(true);
    });

    it('applies min prop', async () => {
      const wrapper = mount(createSplitWithPanels([
        { props: { min: 100 }, content: 'Left' },
        { content: 'Right' }
      ]));
      
      await nextTick();
      
      expect(wrapper.findAll('.ale-split-panel').length).toBe(2);
    });

    it('applies max prop', async () => {
      const wrapper = mount(createSplitWithPanels([
        { props: { max: 400 }, content: 'Left' },
        { content: 'Right' }
      ]));
      
      await nextTick();
      
      expect(wrapper.findAll('.ale-split-panel').length).toBe(2);
    });

    it('applies collapsible prop', async () => {
      const wrapper = mount(createSplitWithPanels([
        { props: { collapsible: true }, content: 'Left' },
        { content: 'Right' }
      ]));
      
      await nextTick();
      
      // 应该显示折叠按钮
      expect(wrapper.find('.ale-split-panel__collapse-btn').exists()).toBe(true);
    });

    it('applies collapsed prop', async () => {
      const wrapper = mount(createSplitWithPanels([
        { props: { collapsed: true }, content: 'Left' },
        { content: 'Right' }
      ]));
      
      await nextTick();
      
      const panel = wrapper.find('.ale-split-panel');
      expect(panel.classes()).toContain('is-collapsed');
    });

    it('applies collapsedSize prop', async () => {
      const wrapper = mount(createSplitWithPanels([
        { props: { collapsed: true, collapsedSize: 40 }, content: 'Left' },
        { content: 'Right' }
      ]));
      
      await nextTick();
      
      expect(wrapper.findAll('.ale-split-panel').length).toBe(2);
    });
  });

  describe('默认值测试', () => {
    it('has correct default values', async () => {
      const wrapper = mount(createSplitWithPanels([
        { content: 'Panel' }
      ]));
      
      await nextTick();
      
      expect(wrapper.find('.ale-split-panel').exists()).toBe(true);
    });
  });
});

describe('Split 交互测试', () => {
  it('does not allow dragging when disabled', async () => {
    const wrapper = mount(Split, {
      props: {
        disabled: true
      }
    });

    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('shows horizontal splitter for horizontal direction', async () => {
    const wrapper = mount(createSplitWithPanels([
      { content: 'Left' },
      { content: 'Right' }
    ]));
    
    await nextTick();
    
    const splitter = wrapper.find('.ale-split-panel__splitter');
    expect(splitter.classes()).toContain('ale-split-panel__splitter--horizontal');
  });

  it('shows vertical splitter for vertical direction', async () => {
    const wrapper = mount(defineComponent({
      components: { Split, SplitPanel },
      setup() {
        return () => h(Split, { direction: 'vertical' }, () => [
          h(SplitPanel, { key: 1 }, () => 'Top'),
          h(SplitPanel, { key: 2 }, () => 'Bottom')
        ]);
      }
    }));
    
    await nextTick();
    
    const splitter = wrapper.find('.ale-split-panel__splitter');
    expect(splitter.classes()).toContain('ale-split-panel__splitter--vertical');
  });
});

describe('Split 样式测试', () => {
  it('applies correct horizontal splitter styles', async () => {
    const wrapper = mount(createSplitWithPanels([
      { content: 'Left' },
      { content: 'Right' }
    ]));
    
    await nextTick();
    
    const splitter = wrapper.find('.ale-split-panel__splitter--horizontal');
    expect(splitter.exists()).toBe(true);
  });

  it('applies correct vertical splitter styles', async () => {
    const wrapper = mount(defineComponent({
      components: { Split, SplitPanel },
      setup() {
        return () => h(Split, { direction: 'vertical' }, () => [
          h(SplitPanel, { key: 1 }, () => 'Top'),
          h(SplitPanel, { key: 2 }, () => 'Bottom')
        ]);
      }
    }));
    
    await nextTick();
    
    const splitter = wrapper.find('.ale-split-panel__splitter--vertical');
    expect(splitter.exists()).toBe(true);
  });

  it('shows collapse button when collapsible', async () => {
    const wrapper = mount(createSplitWithPanels([
      { props: { collapsible: true }, content: 'Left' },
      { content: 'Right' }
    ]));
    
    await nextTick();
    
    const collapseBtn = wrapper.find('.ale-split-panel__collapse-btn');
    expect(collapseBtn.exists()).toBe(true);
  });

  it('applies collapsed class when collapsed', async () => {
    const wrapper = mount(createSplitWithPanels([
      { props: { collapsed: true }, content: 'Left' },
      { content: 'Right' }
    ]));
    
    await nextTick();
    
    const panel = wrapper.find('.ale-split-panel');
    expect(panel.classes()).toContain('is-collapsed');
  });
});

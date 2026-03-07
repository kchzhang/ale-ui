import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { ref, provide, h, nextTick } from 'vue';
import Option from '../Option.vue';
import type { SelectContext, SelectOption } from '../types';
import { SELECT_CONTEXT_KEY } from '../constants';

describe('Option', () => {
  // 创建模拟的 Select 上下文
  const createMockContext = (overrides: Partial<SelectContext> = {}): SelectContext => {
    const selectedValues = ref<(string | number)[]>([]);
    const highlightedValue = ref<string | number | undefined>(undefined);
    const multiple = ref(false);

    return {
      isSelected: (value: string | number) => selectedValues.value.includes(value),
      selectedValues,
      highlightedValue,
      setHighlightedValue: (value: string | number) => {
        highlightedValue.value = value;
      },
      selectOption: (_value: string | number, option: SelectOption) => {
        if (multiple.value) {
          const index = selectedValues.value.indexOf(option.value);
          if (index === -1) {
            selectedValues.value.push(option.value);
          } else {
            selectedValues.value.splice(index, 1);
          }
        } else {
          selectedValues.value = [option.value];
        }
      },
      multiple,
      ...overrides
    };
  };

  // 包装组件，提供上下文
  const createWrapper = (props: { label: string; value: string | number; disabled?: boolean }, context?: SelectContext) => {
    const mockContext = context || createMockContext();

    return mount({
      setup() {
        provide(SELECT_CONTEXT_KEY, mockContext);
        return () => h(Option, props);
      }
    });
  };

  describe('基础渲染', () => {
    it('renders correctly with label and value', () => {
      const wrapper = createWrapper({ label: '选项1', value: 'option1' });

      expect(wrapper.find('.ale-option').exists()).toBe(true);
      expect(wrapper.find('.ale-option__label').text()).toBe('选项1');
    });

    it('renders with number value', () => {
      const wrapper = createWrapper({ label: '选项2', value: 123 });

      expect(wrapper.find('.ale-option').exists()).toBe(true);
      expect(wrapper.find('.ale-option__label').text()).toBe('选项2');
    });

    it('applies correct CSS class', () => {
      const wrapper = createWrapper({ label: '测试', value: 'test' });

      expect(wrapper.find('.ale-option').classes()).toContain('ale-option');
    });
  });

  describe('选中状态', () => {
    it('shows selected state when value is selected', async () => {
      const context = createMockContext();
      context.selectedValues.value = ['selected1'];

      const wrapper = createWrapper({ label: '已选中', value: 'selected1' }, context);
      await flushPromises();

      expect(wrapper.find('.ale-option').classes()).toContain('is-selected');
      expect(wrapper.find('.ale-option__check-icon').exists()).toBe(true);
    });

    it('does not show selected state when value is not selected', async () => {
      const context = createMockContext();
      context.selectedValues.value = ['other'];

      const wrapper = createWrapper({ label: '未选中', value: 'not-selected' }, context);
      await flushPromises();

      expect(wrapper.find('.ale-option').classes()).not.toContain('is-selected');
      expect(wrapper.find('.ale-option__check-icon').exists()).toBe(false);
    });

    it('shows check icon when selected', async () => {
      const context = createMockContext();
      context.selectedValues.value = ['checked'];

      const wrapper = createWrapper({ label: '已勾选', value: 'checked' }, context);
      await flushPromises();

      const checkIcon = wrapper.find('.ale-option__check-icon');
      expect(checkIcon.exists()).toBe(true);
      expect(checkIcon.find('svg').exists()).toBe(true);
    });
  });

  describe('高亮状态', () => {
    it('shows highlighted state', async () => {
      const context = createMockContext();
      context.highlightedValue.value = 'highlighted';

      const wrapper = createWrapper({ label: '高亮', value: 'highlighted' }, context);
      await flushPromises();

      expect(wrapper.find('.ale-option').classes()).toContain('is-highlighted');
    });

    it('updates highlighted state on mouseenter', async () => {
      const context = createMockContext();
      const setHighlightedValueSpy = vi.spyOn(context, 'setHighlightedValue');

      const wrapper = createWrapper({ label: '悬停', value: 'hover' }, context);

      await wrapper.find('.ale-option').trigger('mouseenter');

      expect(setHighlightedValueSpy).toHaveBeenCalledWith('hover');
    });
  });

  describe('禁用状态', () => {
    it('applies disabled class when disabled prop is true', () => {
      const wrapper = createWrapper({ label: '禁用', value: 'disabled', disabled: true });

      expect(wrapper.find('.ale-option').classes()).toContain('is-disabled');
    });

    it('does not trigger select when disabled', async () => {
      const context = createMockContext();
      const selectOptionSpy = vi.spyOn(context, 'selectOption');

      const wrapper = createWrapper({ label: '禁用', value: 'disabled', disabled: true }, context);

      await wrapper.find('.ale-option').trigger('click');

      expect(selectOptionSpy).not.toHaveBeenCalled();
    });

    it('does not trigger setHighlightedValue when disabled', async () => {
      const context = createMockContext();
      const setHighlightedValueSpy = vi.spyOn(context, 'setHighlightedValue');

      const wrapper = createWrapper({ label: '禁用', value: 'disabled', disabled: true }, context);

      await wrapper.find('.ale-option').trigger('mouseenter');

      expect(setHighlightedValueSpy).not.toHaveBeenCalled();
    });
  });

  describe('点击交互', () => {
    it('emits click event when clicked', async () => {
      const context = createMockContext();

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '点击', value: 'click' });
        }
      });

      await wrapper.find('.ale-option').trigger('click');

      // 验证 selectOption 被调用
      expect(context.selectedValues.value).toContain('click');
    });

    it('calls selectOption when clicked', async () => {
      const context = createMockContext();
      const selectOptionSpy = vi.spyOn(context, 'selectOption');

      const wrapper = createWrapper({ label: '选择', value: 'select' }, context);

      await wrapper.find('.ale-option').trigger('click');

      expect(selectOptionSpy).toHaveBeenCalledWith('select', {
        label: '选择',
        value: 'select',
        disabled: false
      });
    });

    it('does not emit click when disabled', async () => {
      const context = createMockContext();
      const selectOptionSpy = vi.spyOn(context, 'selectOption');

      const onClick = vi.fn();
      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, {
            label: '禁用',
            value: 'disabled',
            disabled: true,
            onClick
          });
        }
      });

      await wrapper.find('.ale-option').trigger('click');

      expect(selectOptionSpy).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('多选模式', () => {
    it('toggles selection in multiple mode', async () => {
      const context = createMockContext();
      context.multiple.value = true;

      const wrapper = createWrapper({ label: '多选', value: 'multi' }, context);

      // 第一次点击选中
      await wrapper.find('.ale-option').trigger('click');
      expect(context.selectedValues.value).toContain('multi');

      // 第二次点击取消选中
      await wrapper.find('.ale-option').trigger('click');
      expect(context.selectedValues.value).not.toContain('multi');
    });
  });

  describe('无边距样式', () => {
    it('renders without errors when no context provided', () => {
      // 不提供上下文，测试组件是否能优雅处理
      const wrapper = mount(Option, {
        props: {
          label: '无上下文',
          value: 'no-context'
        }
      });

      expect(wrapper.find('.ale-option').exists()).toBe(true);
      expect(wrapper.find('.ale-option__label').text()).toBe('无上下文');
    });

    it('does not crash when clicking without context', async () => {
      const wrapper = mount(Option, {
        props: {
          label: '无上下文',
          value: 'no-context'
        }
      });

      // 不应该抛出错误
      await expect(wrapper.find('.ale-option').trigger('click')).resolves.not.toThrow();
    });
  });
});

/**
 * Checkbox 组件单元测试
 * @description 复选框组件的完整测试用例
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import Checkbox from '../Checkbox.vue';
import type { CheckboxProps } from '../types';

describe('Checkbox 组件', () => {
  let wrapper: VueWrapper<InstanceType<typeof Checkbox>>;

  beforeEach(() => {
    wrapper?.unmount();
  });

  /**
   * 基础渲染测试
   */
  describe('基础渲染', () => {
    it('应该正确渲染基础复选框', () => {
      wrapper = mount(Checkbox);
      expect(wrapper.find('.ale-checkbox').exists()).toBe(true);
      expect(wrapper.find('.ale-checkbox__input').exists()).toBe(true);
      expect(wrapper.find('.ale-checkbox__inner').exists()).toBe(true);
    });

    it('应该渲染标签文本', () => {
      wrapper = mount(Checkbox, {
        props: { label: '测试标签' }
      });
      expect(wrapper.find('.ale-checkbox__label').text()).toBe('测试标签');
    });

    it('应该渲染默认插槽内容', () => {
      wrapper = mount(Checkbox, {
        slots: {
          default: '插槽内容'
        }
      });
      expect(wrapper.find('.ale-checkbox__label').text()).toBe('插槽内容');
    });

    it('插槽内容应该优先于 label 属性', () => {
      wrapper = mount(Checkbox, {
        props: { label: '属性标签' },
        slots: {
          default: '插槽标签'
        }
      });
      expect(wrapper.find('.ale-checkbox__label').text()).toBe('插槽标签');
    });

    it('没有标签时不应该渲染标签元素', () => {
      wrapper = mount(Checkbox);
      expect(wrapper.find('.ale-checkbox__label').exists()).toBe(false);
    });
  });

  /**
   * 状态管理测试
   */
  describe('状态管理', () => {
    it('受控模式: 应该根据 modelValue 渲染状态', async () => {
      wrapper = mount(Checkbox, {
        props: { modelValue: true }
      });
      expect(wrapper.find('.is-checked').exists()).toBe(true);

      await wrapper.setProps({ modelValue: false });
      expect(wrapper.find('.is-checked').exists()).toBe(false);
    });

    it('受控模式: 状态变化应该触发 update:modelValue 事件', async () => {
      wrapper = mount(Checkbox, {
        props: { modelValue: false }
      });

      const input = wrapper.find('.ale-checkbox__original');
      await input.setValue(true);
      await input.trigger('change');
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('非受控模式: 应该根据 defaultChecked 初始化', () => {
      wrapper = mount(Checkbox, {
        props: { defaultChecked: true }
      });
      expect(wrapper.find('.is-checked').exists()).toBe(true);
    });

    it('非受控模式: 点击应该切换内部状态', async () => {
      wrapper = mount(Checkbox, {
        props: { defaultChecked: false }
      });

      expect(wrapper.find('.is-checked').exists()).toBe(false);
      
      const input = wrapper.find('.ale-checkbox__original');
      await input.setValue(true);
      await input.trigger('change');
      
      expect(wrapper.emitted('change')).toBeTruthy();
    });

    it('应该支持 change 事件', async () => {
      const onChange = vi.fn();
      wrapper = mount(Checkbox, {
        props: { 
          modelValue: false,
          onChange
        }
      });

      const input = wrapper.find('.ale-checkbox__original');
      await input.setValue(true);
      await input.trigger('change');

      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')![0]).toEqual([true]);
    });
  });

  /**
   * 禁用状态测试
   */
  describe('禁用状态', () => {
    it('应该渲染禁用样式', () => {
      wrapper = mount(Checkbox, {
        props: { disabled: true }
      });
      expect(wrapper.find('.is-disabled').exists()).toBe(true);
    });

    it('禁用时应该有 aria-disabled 属性', () => {
      wrapper = mount(Checkbox, {
        props: { disabled: true }
      });
      expect(wrapper.find('.ale-checkbox').attributes('aria-disabled')).toBe('true');
    });

    it('禁用时应该禁用 input 元素', () => {
      wrapper = mount(Checkbox, {
        props: { disabled: true }
      });
      const input = wrapper.find('.ale-checkbox__original');
      expect(input.attributes('disabled')).toBeDefined();
    });

    it('禁用时点击不应该触发事件', async () => {
      const onChange = vi.fn();
      wrapper = mount(Checkbox, {
        props: { 
          disabled: true,
          modelValue: false,
          onChange
        }
      });

      await wrapper.find('.ale-checkbox').trigger('click');
      expect(wrapper.emitted('change')).toBeFalsy();
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
  });

  /**
   * 只读状态测试
   */
  describe('只读状态', () => {
    it('应该渲染只读样式', () => {
      wrapper = mount(Checkbox, {
        props: { readonly: true }
      });
      expect(wrapper.find('.is-readonly').exists()).toBe(true);
    });

    it('只读时应该设置 input 的 readonly 属性', () => {
      wrapper = mount(Checkbox, {
        props: { readonly: true }
      });
      const input = wrapper.find('.ale-checkbox__original');
      expect(input.attributes('readonly')).toBeDefined();
    });
  });

  /**
   * 半选状态测试
   */
  describe('半选状态', () => {
    it('应该渲染半选样式', () => {
      wrapper = mount(Checkbox, {
        props: { indeterminate: true }
      });
      expect(wrapper.find('.is-indeterminate').exists()).toBe(true);
    });

    it('半选时应该显示横线图标', () => {
      wrapper = mount(Checkbox, {
        props: { indeterminate: true }
      });
      expect(wrapper.find('.ale-checkbox__icon--indeterminate').exists()).toBe(true);
    });

    it('半选时 aria-checked 应该为 mixed', () => {
      wrapper = mount(Checkbox, {
        props: { indeterminate: true }
      });
      expect(wrapper.find('.ale-checkbox').attributes('aria-checked')).toBe('mixed');
    });

    it('选中且非半选时 aria-checked 应该为 true', () => {
      wrapper = mount(Checkbox, {
        props: { 
          modelValue: true,
          indeterminate: false
        }
      });
      expect(wrapper.find('.ale-checkbox').attributes('aria-checked')).toBe('true');
    });

    it('未选中时 aria-checked 应该为 false', () => {
      wrapper = mount(Checkbox, {
        props: { modelValue: false }
      });
      expect(wrapper.find('.ale-checkbox').attributes('aria-checked')).toBe('false');
    });
  });

  /**
   * 尺寸变体测试
   */
  describe('尺寸变体', () => {
    it('应该支持 small 尺寸', () => {
      wrapper = mount(Checkbox, {
        props: { size: 'small' }
      });
      expect(wrapper.find('.ale-checkbox--small').exists()).toBe(true);
    });

    it('应该支持 medium 尺寸', () => {
      wrapper = mount(Checkbox, {
        props: { size: 'medium' }
      });
      expect(wrapper.find('.ale-checkbox--medium').exists()).toBe(true);
    });

    it('应该支持 large 尺寸', () => {
      wrapper = mount(Checkbox, {
        props: { size: 'large' }
      });
      expect(wrapper.find('.ale-checkbox--large').exists()).toBe(true);
    });
  });

  /**
   * 主题变体测试
   */
  describe('主题变体', () => {
    it('应该支持 primary 主题', () => {
      wrapper = mount(Checkbox, {
        props: { theme: 'primary' }
      });
      expect(wrapper.find('.ale-checkbox--primary').exists()).toBe(true);
    });

    it('应该支持 success 主题', () => {
      wrapper = mount(Checkbox, {
        props: { theme: 'success' }
      });
      expect(wrapper.find('.ale-checkbox--success').exists()).toBe(true);
    });

    it('应该支持 warning 主题', () => {
      wrapper = mount(Checkbox, {
        props: { theme: 'warning' }
      });
      expect(wrapper.find('.ale-checkbox--warning').exists()).toBe(true);
    });

    it('应该支持 danger 主题', () => {
      wrapper = mount(Checkbox, {
        props: { theme: 'danger' }
      });
      expect(wrapper.find('.ale-checkbox--danger').exists()).toBe(true);
    });
  });

  /**
   * ARIA 可访问性测试
   */
  describe('可访问性', () => {
    it('应该有 role="checkbox" 属性', () => {
      wrapper = mount(Checkbox);
      expect(wrapper.find('.ale-checkbox').attributes('role')).toBe('checkbox');
    });

    it('应该有 aria-checked 属性', () => {
      wrapper = mount(Checkbox, {
        props: { modelValue: true }
      });
      expect(wrapper.find('.ale-checkbox').attributes('aria-checked')).toBeDefined();
    });

    it('非禁用时 aria-disabled 应该为 undefined', () => {
      wrapper = mount(Checkbox, {
        props: { disabled: false }
      });
      expect(wrapper.find('.ale-checkbox').attributes('aria-disabled')).toBeUndefined();
    });
  });

  /**
   * 自定义类名测试
   */
  describe('自定义类名', () => {
    it('应该应用自定义类名', () => {
      wrapper = mount(Checkbox, {
        props: { customClass: 'my-custom-class' }
      });
      expect(wrapper.find('.my-custom-class').exists()).toBe(true);
    });

    it('应该保留基础类名', () => {
      wrapper = mount(Checkbox, {
        props: { customClass: 'custom' }
      });
      const classes = wrapper.find('.ale-checkbox').classes();
      expect(classes).toContain('ale-checkbox');
      expect(classes).toContain('custom');
    });
  });

  /**
   * 点击事件测试
   */
  describe('点击事件', () => {
    it('点击应该触发 click 事件', async () => {
      wrapper = mount(Checkbox);
      await wrapper.find('.ale-checkbox').trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('点击应该传递鼠标事件对象', async () => {
      wrapper = mount(Checkbox);
      await wrapper.find('.ale-checkbox').trigger('click');
      const emittedEvent = wrapper.emitted('click');
      expect(emittedEvent).toBeTruthy();
      expect(emittedEvent![0][0]).toBeInstanceOf(MouseEvent);
    });
  });

  /**
   * 表单属性测试
   */
  describe('表单属性', () => {
    it('应该支持 name 属性', () => {
      wrapper = mount(Checkbox, {
        props: { name: 'agreement' }
      });
      const input = wrapper.find('.ale-checkbox__original');
      expect(input.attributes('name')).toBe('agreement');
    });

    it('应该支持 value 属性', () => {
      wrapper = mount(Checkbox, {
        props: { value: 'custom-value' }
      });
      const input = wrapper.find('.ale-checkbox__original');
      expect(input.attributes('value')).toBe('custom-value');
    });
  });

  /**
   * 图标渲染测试
   */
  describe('图标渲染', () => {
    it('选中时应该显示勾选图标', () => {
      wrapper = mount(Checkbox, {
        props: { modelValue: true }
      });
      expect(wrapper.find('.ale-checkbox__icon--check').exists()).toBe(true);
    });

    it('未选中时不应该显示勾选图标', () => {
      wrapper = mount(Checkbox, {
        props: { modelValue: false }
      });
      expect(wrapper.find('.ale-checkbox__icon--check').exists()).toBe(false);
    });

    it('半选状态不应该显示勾选图标', () => {
      wrapper = mount(Checkbox, {
        props: { 
          modelValue: true,
          indeterminate: true
        }
      });
      expect(wrapper.find('.ale-checkbox__icon--check').exists()).toBe(false);
      expect(wrapper.find('.ale-checkbox__icon--indeterminate').exists()).toBe(true);
    });
  });
});

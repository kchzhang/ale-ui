import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { h, ref } from 'vue';
import Select from '../Select.vue';
import Option from '../Option.vue';

describe('SelectOptionIntegration', () => {
  describe('基本功能', () => {
    it('renders options via slot', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b' }),
              h(Option, { label: '选项C', value: 'c' })
            ]
          });
        }
      }, { attachTo: document.body });

      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      const options = document.querySelectorAll('.ale-option');
      expect(options.length).toBe(3);

      wrapper.unmount();
    });

    it('selects option and updates modelValue', async () => {
      const onUpdate = vi.fn();
      const onChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            'onUpdate:modelValue': onUpdate,
            onChange: onChange,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b' })
            ]
          });
        }
      }, { attachTo: document.body });

      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      const options = document.querySelectorAll('.ale-option');
      await options[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();

      expect(onUpdate).toHaveBeenCalledWith('a');
      expect(onChange).toHaveBeenCalledWith('a');

      wrapper.unmount();
    });

    it('shows selected option with check icon', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: 'b',
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b' }),
              h(Option, { label: '选项C', value: 'c' })
            ]
          });
        }
      }, { attachTo: document.body });

      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      const options = document.querySelectorAll('.ale-option');
      expect(options[0].classList.contains('is-selected')).toBe(false);
      expect(options[1].classList.contains('is-selected')).toBe(true);
      expect(options[2].classList.contains('is-selected')).toBe(false);

      wrapper.unmount();
    });

    it('supports disabled option', async () => {
      const onUpdate = vi.fn();

      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b', disabled: true }),
              h(Option, { label: '选项C', value: 'c' })
            ]
          });
        }
      }, { attachTo: document.body });

      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      const options = document.querySelectorAll('.ale-option');
      expect(options[1].classList.contains('is-disabled')).toBe(true);

      // 点击禁用的选项不应触发选择
      await options[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();

      expect(onUpdate).not.toHaveBeenCalled();

      wrapper.unmount();
    });
  });

  describe('多选模式', () => {
    it('supports multiple selection', async () => {
      const onUpdate = vi.fn();

      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: [],
            multiple: true,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b' }),
              h(Option, { label: '选项C', value: 'c' })
            ]
          });
        }
      }, { attachTo: document.body });

      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      const options = document.querySelectorAll('.ale-option');
      
      // 选择第一个
      await options[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      expect(onUpdate).toHaveBeenLastCalledWith(['a']);

      wrapper.unmount();
    });
  });

  describe('可清空', () => {
    it('shows clear button when clearable and has value', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: 'a',
            clearable: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b' })
            ]
          });
        }
      });

      // 鼠标悬停显示清除按钮
      await wrapper.find('.ale-select__trigger').trigger('mouseenter');
      await flushPromises();

      const clearIcon = wrapper.find('.ale-select__clear');
      expect(clearIcon.exists()).toBe(true);
    });
  });

  describe('可搜索', () => {
    it('shows input when filterable', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            filterable: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b' })
            ]
          });
        }
      });

      const input = wrapper.find('.ale-select__input');
      expect(input.exists()).toBe(true);
    });
  });

  describe('禁用状态', () => {
    it('has disabled class when disabled', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            disabled: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' }),
              h(Option, { label: '选项B', value: 'b' })
            ]
          });
        }
      });

      // 验证禁用样式
      expect(wrapper.find('.ale-select').classes()).toContain('is-disabled');
    });
  });

  describe('不同尺寸', () => {
    it('supports large size', () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            size: 'large',
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' })
            ]
          });
        }
      });

      expect(wrapper.find('.ale-select').classes()).toContain('ale-select--large');
    });

    it('supports small size', () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            size: 'small',
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' })
            ]
          });
        }
      });

      expect(wrapper.find('.ale-select').classes()).toContain('ale-select--small');
    });
  });

  describe('事件', () => {
    it('emits focus and blur events', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const wrapper = mount({
        setup() {
          return () => h(Select, {
            placeholder: '请选择',
            onFocus: onFocus,
            onBlur: onBlur
          }, {
            default: () => [
              h(Option, { label: '选项A', value: 'a' })
            ]
          });
        }
      });

      const trigger = wrapper.find('.ale-select__trigger');
      
      await trigger.trigger('focus');
      expect(onFocus).toHaveBeenCalled();

      await trigger.trigger('blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });
});

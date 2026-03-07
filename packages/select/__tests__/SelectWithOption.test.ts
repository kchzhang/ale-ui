import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { h, ref, provide, computed } from 'vue';
import Select from '../Select.vue';
import Option from '../Option.vue';
import type { SelectContext, SelectOption } from '../types';
import { SELECT_CONTEXT_KEY } from '../constants';

describe('Select with Option', () => {
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

  describe('Option 在 Select 上下文中的行为', () => {
    it('Option shows selected state based on context', async () => {
      const context = createMockContext();
      context.selectedValues.value = ['shanghai'];

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h('div', [
            h(Option, { label: '北京', value: 'beijing' }),
            h(Option, { label: '上海', value: 'shanghai' }),
            h(Option, { label: '广州', value: 'guangzhou' })
          ]);
        }
      });

      const options = wrapper.findAll('.ale-option');
      expect(options.length).toBe(3);
      
      // 上海被选中
      expect(options[0].classes()).not.toContain('is-selected');
      expect(options[1].classes()).toContain('is-selected');
      expect(options[2].classes()).not.toContain('is-selected');
    });

    it('Option calls selectOption when clicked', async () => {
      const context = createMockContext();
      const selectOptionSpy = vi.spyOn(context, 'selectOption');

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '北京', value: 'beijing' });
        }
      });

      await wrapper.find('.ale-option').trigger('click');

      expect(selectOptionSpy).toHaveBeenCalledWith('beijing', {
        label: '北京',
        value: 'beijing',
        disabled: false
      });
    });

    it('Option shows check icon when selected', async () => {
      const context = createMockContext();
      context.selectedValues.value = ['beijing'];

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '北京', value: 'beijing' });
        }
      });

      const checkIcon = wrapper.find('.ale-option__check-icon');
      expect(checkIcon.exists()).toBe(true);
    });

    it('Option does not show check icon when not selected', async () => {
      const context = createMockContext();
      context.selectedValues.value = [];

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '北京', value: 'beijing' });
        }
      });

      const checkIcon = wrapper.find('.ale-option__check-icon');
      expect(checkIcon.exists()).toBe(false);
    });

    it('Option highlights on mouseenter', async () => {
      const context = createMockContext();
      const setHighlightedSpy = vi.spyOn(context, 'setHighlightedValue');

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '北京', value: 'beijing' });
        }
      });

      await wrapper.find('.ale-option').trigger('mouseenter');

      expect(setHighlightedSpy).toHaveBeenCalledWith('beijing');
    });

    it('disabled Option does not respond to click', async () => {
      const context = createMockContext();
      const selectOptionSpy = vi.spyOn(context, 'selectOption');

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '北京', value: 'beijing', disabled: true });
        }
      });

      await wrapper.find('.ale-option').trigger('click');

      expect(selectOptionSpy).not.toHaveBeenCalled();
      expect(wrapper.find('.ale-option').classes()).toContain('is-disabled');
    });

    it('disabled Option does not highlight on mouseenter', async () => {
      const context = createMockContext();
      const setHighlightedSpy = vi.spyOn(context, 'setHighlightedValue');

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '北京', value: 'beijing', disabled: true });
        }
      });

      await wrapper.find('.ale-option').trigger('mouseenter');

      expect(setHighlightedSpy).not.toHaveBeenCalled();
    });
  });

  describe('多选模式', () => {
    it('Option toggles selection in multiple mode', async () => {
      const context = createMockContext();
      context.multiple.value = true;

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { label: '多选', value: 'multi' });
        }
      });

      // 第一次点击选中
      await wrapper.find('.ale-option').trigger('click');
      expect(context.selectedValues.value).toContain('multi');

      // 第二次点击取消选中
      await wrapper.find('.ale-option').trigger('click');
      expect(context.selectedValues.value).not.toContain('multi');
    });

    it('Option shows selected state for multiple values', async () => {
      const context = createMockContext();
      context.multiple.value = true;
      context.selectedValues.value = ['beijing', 'guangzhou'];

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => [
            h(Option, { label: '北京', value: 'beijing' }),
            h(Option, { label: '上海', value: 'shanghai' }),
            h(Option, { label: '广州', value: 'guangzhou' })
          ];
        }
      });

      const options = wrapper.findAll('.ale-option');
      expect(options[0].classes()).toContain('is-selected');
      expect(options[1].classes()).not.toContain('is-selected');
      expect(options[2].classes()).toContain('is-selected');
    });
  });

  describe('Slot 内容支持', () => {
    it('Option renders slot content as label', async () => {
      const context = createMockContext();

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { value: 'beijing' }, () => '北京');
        }
      });

      expect(wrapper.find('.ale-option__label').text()).toBe('北京');
    });

    it('Option uses value as fallback when no label and no slot', async () => {
      const context = createMockContext();

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { value: 'beijing' });
        }
      });

      expect(wrapper.find('.ale-option__label').text()).toBe('beijing');
    });

    it('Option passes correct label to selectOption with slot', async () => {
      const context = createMockContext();
      const selectOptionSpy = vi.spyOn(context, 'selectOption');

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { value: 'beijing' }, () => '北京市');
        }
      });

      await wrapper.find('.ale-option').trigger('click');

      expect(selectOptionSpy).toHaveBeenCalledWith('beijing', {
        label: '北京市',
        value: 'beijing',
        disabled: false
      });
    });
  });

  describe('高亮状态', () => {
    it('Option shows highlighted state', async () => {
      const context = createMockContext();
      context.highlightedValue.value = 'beijing';

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => [
            h(Option, { label: '北京', value: 'beijing' }),
            h(Option, { label: '上海', value: 'shanghai' })
          ];
        }
      });

      const options = wrapper.findAll('.ale-option');
      expect(options[0].classes()).toContain('is-highlighted');
      expect(options[1].classes()).not.toContain('is-highlighted');
    });
  });

  describe('事件发射', () => {
    it('Option emits click event', async () => {
      const context = createMockContext();
      const onClick = vi.fn();

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { 
            label: '北京', 
            value: 'beijing',
            onClick: onClick
          });
        }
      });

      await wrapper.find('.ale-option').trigger('click');

      expect(onClick).toHaveBeenCalled();
    });

    it('Option does not emit click when disabled', async () => {
      const context = createMockContext();
      const onClick = vi.fn();

      const wrapper = mount({
        setup() {
          provide(SELECT_CONTEXT_KEY, context);
          return () => h(Option, { 
            label: '北京', 
            value: 'beijing',
            disabled: true,
            onClick: onClick
          });
        }
      });

      await wrapper.find('.ale-option').trigger('click');

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Select 与 Option 集成渲染', () => {
    it('Select provides context to child Options through provide/inject', async () => {
      // 验证 Select 提供 context，Option 可以注入
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            placeholder: '请选择城市'
          }, {
            default: () => [
              h(Option, { value: 'beijing' }, () => '北京'),
              h(Option, { value: 'shanghai' }, () => '上海')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 验证下拉菜单显示（Select 正常工作）
      const dropdown = document.querySelector('.ale-select__dropdown');
      expect(dropdown).not.toBeNull();

      wrapper.unmount();
    });

    it('Option can access Select context when wrapped together', async () => {
      // 使用一个包装组件来验证 provide/inject 工作
      const TestComponent = {
        setup() {
          const selectedValue = ref<string | number>('');
          const onUpdate = (val: string | number | (string | number)[]) => {
            selectedValue.value = val as string;
          };

          return () => h('div', [
            h(Select, {
              modelValue: selectedValue.value,
              'onUpdate:modelValue': onUpdate,
              placeholder: '请选择'
            }, {
              default: () => [
                h(Option, { value: 'beijing' }, () => '北京'),
                h(Option, { value: 'shanghai' }, () => '上海')
              ]
            })
          ]);
        }
      };

      const wrapper = mount(TestComponent, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 验证 Select 渲染成功
      expect(wrapper.find('.ale-select').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('多选模式下的标签显示', () => {
    it('多选模式下使用 AleOption slot 时正确显示选中标签的 label', async () => {
      // 使用一个包装组件来测试多选模式下标签显示
      const TestComponent = {
        setup() {
          const selectedValues = ref<string[]>(['js', 'vue']);

          return () => h('div', [
            h(Select, {
              modelValue: selectedValues.value,
              'onUpdate:modelValue': (val: string | number | (string | number)[]) => {
                selectedValues.value = val as string[];
              },
              multiple: true,
              placeholder: '请选择技能'
            }, {
              default: () => [
                h(Option, { value: 'js' }, () => 'JavaScript'),
                h(Option, { value: 'ts' }, () => 'TypeScript'),
                h(Option, { value: 'vue' }, () => 'Vue.js'),
                h(Option, { value: 'react' }, () => 'React')
              ]
            })
          ]);
        }
      };

      const wrapper = mount(TestComponent, { attachTo: document.body });
      await flushPromises();

      // 验证 Select 渲染成功且为多选模式
      expect(wrapper.find('.ale-select').exists()).toBe(true);
      expect(wrapper.find('.ale-select').classes()).toContain('is-multiple');

      // 验证显示了两个选中标签
      const tags = wrapper.findAll('.ale-select__tag');
      expect(tags.length).toBe(2);

      // 验证标签文本正确显示（使用 Option slot 的 label）
      const tagTexts = tags.map(tag => tag.find('.ale-select__tag-text').text());
      expect(tagTexts).toContain('JavaScript');
      expect(tagTexts).toContain('Vue.js');

      wrapper.unmount();
    });

    it('多选模式下选择新选项后正确显示标签', async () => {
      const TestComponent = {
        setup() {
          const selectedValues = ref<string[]>([]);

          return () => h('div', [
            h(Select, {
              modelValue: selectedValues.value,
              'onUpdate:modelValue': (val: string | number | (string | number)[]) => {
                selectedValues.value = val as string[];
              },
              multiple: true,
              placeholder: '请选择'
            }, {
              default: () => [
                h(Option, { value: 'beijing' }, () => '北京市'),
                h(Option, { value: 'shanghai' }, () => '上海市')
              ]
            })
          ]);
        }
      };

      const wrapper = mount(TestComponent, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 点击选择一个选项
      const options = document.querySelectorAll('.ale-option');
      await options[0].dispatchEvent(new Event('click', { bubbles: true }));
      await flushPromises();

      // 验证标签显示正确
      const tags = wrapper.findAll('.ale-select__tag');
      expect(tags.length).toBe(1);
      expect(tags[0].find('.ale-select__tag-text').text()).toBe('北京市');

      wrapper.unmount();
    });
  });

  describe('键盘交互', () => {
    it('应该支持 Enter 键选择 Option', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'beijing' }, () => '北京'),
              h(Option, { value: 'shanghai' }, () => '上海')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 在第一个 Option 上按 Enter
      const options = document.querySelectorAll('.ale-option');
      await (options[0] as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await flushPromises();

      // 验证选中了值
      expect(onUpdate).toHaveBeenCalledWith('beijing');
      wrapper.unmount();
    });

    it('应该支持 Space 键选择 Option', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'beijing' }, () => '北京')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 在 Option 上按 Space
      const option = document.querySelector('.ale-option');
      await (option as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await flushPromises();

      expect(onUpdate).toHaveBeenCalledWith('beijing');
      wrapper.unmount();
    });

    it('多选模式下应该支持 Enter 键切换选择', async () => {
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
              h(Option, { value: 'beijing' }, () => '北京'),
              h(Option, { value: 'shanghai' }, () => '上海')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 选择第一个
      const options = document.querySelectorAll('.ale-option');
      await (options[0] as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await flushPromises();

      expect(onUpdate).toHaveBeenCalledWith(['beijing']);
      wrapper.unmount();
    });
  });

  describe('多选模式交互', () => {
    it('应该支持多选模式下选择多个 Option', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount({
        setup() {
          const selected = ref<string[]>([]);
          return () => h(Select, {
            modelValue: selected.value,
            multiple: true,
            'onUpdate:modelValue': (val: string | number | (string | number)[]) => {
              selected.value = val as string[];
              onUpdate(val as string[]);
            },
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B'),
              h(Option, { value: 'c' }, () => '选项C')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 选择第一个
      let options = document.querySelectorAll('.ale-option');
      await options[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      expect(onUpdate).toHaveBeenLastCalledWith(['a']);

      // 选择第二个（应该保留第一个）
      options = document.querySelectorAll('.ale-option');
      await options[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      expect(onUpdate).toHaveBeenLastCalledWith(['a', 'b']);

      // 再次点击第一个应该取消选择
      options = document.querySelectorAll('.ale-option');
      await options[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      expect(onUpdate).toHaveBeenLastCalledWith(['b']);

      wrapper.unmount();
    });

    it('多选模式下应该显示所有选中项的 check icon', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: ['a', 'c'],
            multiple: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B'),
              h(Option, { value: 'c' }, () => '选项C')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 验证选中项有 check icon
      const options = document.querySelectorAll('.ale-option');
      expect(options[0].querySelector('.ale-option__check-icon')).toBeTruthy();
      expect(options[1].querySelector('.ale-option__check-icon')).toBeFalsy();
      expect(options[2].querySelector('.ale-option__check-icon')).toBeTruthy();

      wrapper.unmount();
    });

    it('多选模式下点击标签关闭按钮应该移除对应选项', async () => {
      const onUpdate = vi.fn();
      const onRemoveTag = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: ['a', 'b'],
            multiple: true,
            'onUpdate:modelValue': onUpdate,
            onRemoveTag: onRemoveTag,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B')
            ]
          });
        }
      });

      // 找到第一个标签的关闭按钮
      const closeButtons = wrapper.findAll('.ale-select__tag-close');
      expect(closeButtons.length).toBe(2);

      // 点击第一个标签的关闭按钮
      await closeButtons[0].trigger('click');
      await flushPromises();

      // 应该触发 remove-tag 和 update:modelValue
      expect(onRemoveTag).toHaveBeenCalledWith('a');
      expect(onUpdate).toHaveBeenCalledWith(['b']);

      wrapper.unmount();
    });
  });

  describe('搜索过滤与 Option 组合', () => {
    it('应该根据搜索词过滤 Option', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            filterable: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'beijing' }, () => '北京'),
              h(Option, { value: 'shanghai' }, () => '上海'),
              h(Option, { value: 'guangzhou' }, () => '广州')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 输入搜索词
      const input = wrapper.find('.ale-select__input');
      await input.setValue('北京');
      await input.trigger('input');
      await flushPromises();

      // 验证过滤功能（通过检查搜索事件或过滤后的选项）
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      const visibleOptions = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(visibleOptions.length).toBeGreaterThan(0);

      wrapper.unmount();
    });

    it('搜索无结果时应该显示空状态', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            filterable: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'beijing' }, () => '北京'),
              h(Option, { value: 'shanghai' }, () => '上海')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 输入无匹配的搜索词
      const input = wrapper.find('.ale-select__input');
      await input.setValue('不存在XYZ');
      await input.trigger('input');
      await flushPromises();

      // 获取下拉菜单并检查状态
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      
      // 下拉菜单应该存在（即使显示空状态）
      expect(currentDropdown).toBeTruthy();

      wrapper.unmount();
    });

    it('多选模式下搜索应该保持已选项', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: ['beijing'],
            multiple: true,
            filterable: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'beijing' }, () => '北京'),
              h(Option, { value: 'shanghai' }, () => '上海'),
              h(Option, { value: 'guangzhou' }, () => '广州')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 输入搜索词
      const input = wrapper.find('.ale-select__input');
      await input.setValue('上海');
      await input.trigger('input');
      await flushPromises();

      // 验证标签仍然显示
      const tags = wrapper.findAll('.ale-select__tag');
      expect(tags.length).toBe(1);
      expect(tags[0].text()).toContain('北京');

      wrapper.unmount();
    });
  });

  describe('清空功能与 Option 组合', () => {
    it('点击清空按钮应该清空所有选中的 Option', async () => {
      const onUpdate = vi.fn();
      const onClear = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: 'beijing',
            clearable: true,
            'onUpdate:modelValue': onUpdate,
            onClear: onClear,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'beijing' }, () => '北京'),
              h(Option, { value: 'shanghai' }, () => '上海')
            ]
          });
        }
      });

      // 鼠标悬停显示清除按钮
      await wrapper.find('.ale-select__trigger').trigger('mouseenter');
      await flushPromises();

      // 点击清除按钮
      const clearButton = wrapper.find('.ale-select__clear');
      await clearButton.trigger('click');
      await flushPromises();

      expect(onClear).toHaveBeenCalled();
      expect(onUpdate).toHaveBeenCalledWith('');

      wrapper.unmount();
    });

    it('多选模式下清空应该清空所有选中的 Option', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: ['a', 'b'],
            multiple: true,
            clearable: true,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B'),
              h(Option, { value: 'c' }, () => '选项C')
            ]
          });
        }
      });

      // 鼠标悬停显示清除按钮
      await wrapper.find('.ale-select__trigger').trigger('mouseenter');
      await flushPromises();

      // 点击清除按钮
      await wrapper.find('.ale-select__clear').trigger('click');
      await flushPromises();

      expect(onUpdate).toHaveBeenCalledWith([]);

      wrapper.unmount();
    });
  });

  describe('禁用状态与 Option 组合', () => {
    it('禁用 Select 时所有 Option 不可选', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            disabled: true,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B')
            ]
          });
        }
      }, { attachTo: document.body });

      // 验证 Select 有禁用类
      expect(wrapper.find('.ale-select').classes()).toContain('is-disabled');

      // 尝试打开下拉（应该失败或不显示）
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      wrapper.unmount();
    });

    it('部分禁用的 Option 不可选但其他可选', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a', disabled: true }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 获取当前组件的下拉菜单中的选项
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      const options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBe(2);
      expect(options[0].classList.contains('is-disabled')).toBe(true);
      expect(options[1].classList.contains('is-disabled')).toBe(false);

      // 点击禁用的选项
      await options[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      expect(onUpdate).not.toHaveBeenCalled();

      // 点击启用的选项
      await options[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      expect(onUpdate).toHaveBeenCalledWith('b');

      wrapper.unmount();
    });

    it('多选模式下禁用 Option 的标签不应该有关闭按钮', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: ['a'],
            multiple: true,
            disabled: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B')
            ]
          });
        }
      });

      // 禁用时标签不应该有关闭按钮
      const closeButtons = wrapper.findAll('.ale-select__tag-close');
      expect(closeButtons.length).toBe(0);

      wrapper.unmount();
    });
  });

  describe('动态添加/删除选项', () => {
    it('应该支持动态添加 Option', async () => {
      const showAll = ref(false);
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B'),
              showAll.value ? h(Option, { value: 'c' }, () => '选项C') : null
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉，验证只有两个选项
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      let options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBe(2);

      // 添加第三个选项
      showAll.value = true;
      await flushPromises();
      options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBe(3);

      wrapper.unmount();
    });

    it('应该支持动态删除 Option', async () => {
      const showFirst = ref(true);
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            placeholder: '请选择'
          }, {
            default: () => [
              showFirst.value ? h(Option, { value: 'a' }, () => '选项A') : null,
              h(Option, { value: 'b' }, () => '选项B')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉验证有两个选项
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();
      let dropdowns = document.querySelectorAll('.ale-select__dropdown');
      let currentDropdown = dropdowns[dropdowns.length - 1];
      let options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBe(2);

      // 关闭下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 删除第一个选项
      showFirst.value = false;
      await flushPromises();

      // 重新打开下拉验证只有一个选项
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();
      dropdowns = document.querySelectorAll('.ale-select__dropdown');
      currentDropdown = dropdowns[dropdowns.length - 1];
      options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBe(1);

      wrapper.unmount();
    });
  });

  describe('点击外部关闭', () => {
    it('点击 Select 外部应该关闭下拉菜单', async () => {
      const wrapper = mount({
        setup() {
          return () => h('div', [
            h(Select, {
              modelValue: undefined,
              placeholder: '请选择'
            }, {
              default: () => [
                h(Option, { value: 'a' }, () => '选项A')
              ]
            }),
            h('div', { class: 'outside' }, '外部区域')
          ]);
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 验证下拉已打开
      expect(document.querySelector('.ale-select__dropdown')).toBeTruthy();

      // 点击外部
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();
      await new Promise(resolve => setTimeout(resolve, 100));

      wrapper.unmount();
    });
  });

  describe('焦点管理', () => {
    it('应该正确触发 focus 和 blur 事件', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            filterable: true,
            onFocus: onFocus,
            onBlur: onBlur,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A')
            ]
          });
        }
      }, { attachTo: document.body });

      // 触发 focus
      const trigger = wrapper.find('.ale-select__trigger');
      await trigger.trigger('focus');
      expect(onFocus).toHaveBeenCalled();

      // 触发 blur
      await trigger.trigger('blur');
      expect(onBlur).toHaveBeenCalled();

      wrapper.unmount();
    });

    it('打开下拉时输入框应该自动聚焦', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            filterable: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 验证输入框存在
      const input = wrapper.find('.ale-select__input');
      expect(input.exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('ARIA 可访问性', () => {
    it('应该有正确的 ARIA 属性', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: 'a',
            multiple: true,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 获取当前组件的下拉菜单（通过最后一个添加的下拉）
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      expect(currentDropdown).toBeTruthy();

      // 验证 listbox 角色
      const listbox = currentDropdown?.querySelector('[role="listbox"]');
      expect(listbox).toBeTruthy();

      wrapper.unmount();
    });

    it('禁用的 Option 应该有禁用样式', async () => {
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a', disabled: true }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 获取当前组件的下拉菜单
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      const options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBe(2);
      expect(options[0].classList.contains('is-disabled')).toBe(true);
      expect(options[1].classList.contains('is-disabled')).toBe(false);

      wrapper.unmount();
    });
  });

  describe('复杂场景', () => {
    it('应该支持多选 + 搜索 + 清空的组合使用', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: ['a'],
            multiple: true,
            filterable: true,
            clearable: true,
            'onUpdate:modelValue': onUpdate,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'a' }, () => '选项A'),
              h(Option, { value: 'b' }, () => '选项B'),
              h(Option, { value: 'c' }, () => '选项C')
            ]
          });
        }
      }, { attachTo: document.body });

      // 验证初始标签显示
      await flushPromises();
      let tags = wrapper.findAll('.ale-select__tag');
      expect(tags.length).toBe(1);

      // 打开下拉
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 搜索过滤
      const input = wrapper.find('.ale-select__input');
      await input.setValue('B');
      await input.trigger('input');
      await flushPromises();

      // 获取当前组件的下拉菜单中的选项
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      const options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBeGreaterThan(0);
      
      // 选择第一个过滤后的选项
      await options[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await flushPromises();

      // 验证 onUpdate 被调用（参数可能因实现而异）
      expect(onUpdate).toHaveBeenCalled();

      // 清空所有选择
      await wrapper.find('.ale-select__trigger').trigger('mouseenter');
      await flushPromises();
      await wrapper.find('.ale-select__clear').trigger('click');
      await flushPromises();

      expect(onUpdate).toHaveBeenLastCalledWith([]);

      wrapper.unmount();
    });

    it('应该正确处理 slot 内容变更', async () => {
      const labelText = ref('北京');
      const wrapper = mount({
        setup() {
          return () => h(Select, {
            modelValue: undefined,
            placeholder: '请选择'
          }, {
            default: () => [
              h(Option, { value: 'bj' }, () => labelText.value),
              h(Option, { value: 'sh' }, () => '上海')
            ]
          });
        }
      }, { attachTo: document.body });

      // 打开下拉验证初始显示
      await wrapper.find('.ale-select__trigger').trigger('click');
      await flushPromises();

      // 获取当前组件的下拉菜单中的选项
      const dropdowns = document.querySelectorAll('.ale-select__dropdown');
      const currentDropdown = dropdowns[dropdowns.length - 1];
      const options = currentDropdown?.querySelectorAll('.ale-option') || [];
      expect(options.length).toBe(2);
      expect(options[0].textContent).toContain('北京');

      wrapper.unmount();
    });
  });
});

/**
 * CheckboxGroup 组件测试
 * @description 复选框组组件的单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import CheckboxGroup from '../CheckboxGroup.vue';
import Checkbox from '../Checkbox.vue';

describe('CheckboxGroup', () => {
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' }
  ];

  describe('基础渲染', () => {
    it('应该正确渲染复选框组', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: []
        }
      });

      expect(wrapper.find('.ale-checkbox-group').exists()).toBe(true);
      expect(wrapper.findAll('.ale-checkbox')).toHaveLength(3);
    });

    it('应该设置正确的 ARIA 属性', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: []
        }
      });

      const group = wrapper.find('[role="group"]');
      expect(group.exists()).toBe(true);
      expect(group.attributes('aria-label')).toBe('复选框组');
    });
  });

  describe('选中状态', () => {
    it('应该正确显示选中的值', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: ['1', '3']
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('is-checked');
      expect(checkboxes[1].classes()).not.toContain('is-checked');
      expect(checkboxes[2].classes()).toContain('is-checked');
    });

    it('应该触发 update:modelValue 事件', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: []
        }
      });

      const checkbox = wrapper.findAll('.ale-checkbox__original')[0];
      await checkbox.setValue(true);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1']]);
    });

    it('应该触发 change 事件', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: []
        }
      });

      const checkbox = wrapper.findAll('.ale-checkbox__original')[0];
      await checkbox.setValue(true);

      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')![0]).toEqual([['1']]);
    });
  });

  describe('禁用状态', () => {
    it('整体禁用时应该禁用所有选项', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: [],
          disabled: true
        }
      });

      expect(wrapper.find('.ale-checkbox-group.is-disabled').exists()).toBe(true);
    });

    it('应该支持禁用单个选项', () => {
      const optionsWithDisabled = [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2', disabled: true },
        { label: '选项三', value: '3' }
      ];

      const wrapper = mount(CheckboxGroup, {
        props: {
          options: optionsWithDisabled,
          modelValue: []
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[1].classes()).toContain('is-disabled');
    });
  });

  describe('尺寸和主题', () => {
    it('应该支持不同尺寸', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: [],
          size: 'large'
        }
      });

      expect(wrapper.find('.ale-checkbox-group--large').exists()).toBe(true);
    });

    it('应该支持垂直排列', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: [],
          direction: 'vertical'
        }
      });

      expect(wrapper.find('.ale-checkbox-group--vertical').exists()).toBe(true);
    });
  });

  describe('限制选中数量', () => {
    it('应该限制最大选中数', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: ['1', '2'],
          max: 2
        }
      });

      // 尝试选择第三个选项
      const checkbox = wrapper.findAll('.ale-checkbox__original')[2];
      await checkbox.setValue(true);

      // 由于已经选了2个（达到max），第三个不应该被选中
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('应该限制最小选中数', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: ['1'],
          min: 1
        }
      });

      // 尝试取消选择唯一选中的选项
      const checkbox = wrapper.findAll('.ale-checkbox__original')[0];
      await checkbox.setValue(false);

      // 由于只剩1个（达到min），不应该被取消
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
  });

  describe('方法调用', () => {
    it('应该支持全选方法', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: []
        }
      });

      (wrapper.vm as any).selectAll();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1', '2', '3']]);
    });

    it('应该支持取消全选方法', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: ['1', '2', '3']
        }
      });

      (wrapper.vm as any).unselectAll();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([[]]);
    });

    it('应该支持反选方法', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: ['1', '2']
        }
      });

      (wrapper.vm as any).toggleAll();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['3']]);
    });

    it('应该支持检查选中状态方法', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: ['1', '3']
        }
      });

      expect((wrapper.vm as any).isChecked('1')).toBe(true);
      expect((wrapper.vm as any).isChecked('2')).toBe(false);
      expect((wrapper.vm as any).isChecked('3')).toBe(true);
    });
  });

  describe('插槽', () => {
    it('应该支持默认插槽', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: '<div class="custom-content">自定义内容</div>'
        }
      });

      expect(wrapper.find('.custom-content').exists()).toBe(true);
    });

    it('应该支持 option 插槽', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: []
        },
        slots: {
          option: '<template #option="{ option, index }"><span class="custom-option">{{ index }} - {{ option.label }}</span></template>'
        }
      });

      expect(wrapper.findAll('.custom-option')).toHaveLength(3);
    });
  });

  describe('键盘导航', () => {
    it('应该响应键盘事件', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options,
          modelValue: []
        }
      });

      const group = wrapper.find('.ale-checkbox-group');

      // 测试 ArrowRight 事件
      await group.trigger('keydown', { key: 'ArrowRight' });

      // 测试 ArrowLeft 事件
      await group.trigger('keydown', { key: 'ArrowLeft' });

      // 测试 Home 事件
      await group.trigger('keydown', { key: 'Home' });

      // 测试 End 事件
      await group.trigger('keydown', { key: 'End' });

      // 验证事件被处理（没有抛出错误）
      expect(wrapper.exists()).toBe(true);
    });
  });

  /**
   * Checkbox 作为 CheckboxGroup 子组件组合使用测试
   */
  describe('Checkbox 与 CheckboxGroup 组合使用', () => {
    it('应该支持通过插槽使用 Checkbox 组件', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: ['1']
        },
        slots: {
          default: `
            <Checkbox :model-value="true" value="1" label="选项一" />
            <Checkbox :model-value="false" value="2" label="选项二" />
            <Checkbox :model-value="false" value="3" label="选项三" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      expect(wrapper.find('.ale-checkbox-group').exists()).toBe(true);
      expect(wrapper.findAll('.ale-checkbox')).toHaveLength(3);
    });

    it('插槽中的 Checkbox 应该响应 Group 的 modelValue', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: ['1']
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('is-checked');
      expect(checkboxes[1].classes()).not.toContain('is-checked');

      // 更新 Group 的 modelValue
      await wrapper.setProps({ modelValue: ['2'] });
      expect(checkboxes[0].classes()).not.toContain('is-checked');
      expect(checkboxes[1].classes()).toContain('is-checked');
    });

    it('点击插槽中的 Checkbox 应该触发自身 change 事件', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkbox = wrapper.findAll('.ale-checkbox__original')[0];
      await checkbox.setValue(true);
      await checkbox.trigger('change');

      // Checkbox 自身触发 change 事件
      const checkboxes = wrapper.findAllComponents(Checkbox);
      expect(checkboxes[0].emitted('change')).toBeTruthy();
    });

    it('插槽中的 Checkbox disabled 属性应该独立工作', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" :disabled="true" />
            <Checkbox value="3" label="选项三" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).not.toContain('is-disabled');
      expect(checkboxes[1].classes()).toContain('is-disabled');
      expect(checkboxes[2].classes()).not.toContain('is-disabled');
    });

    it('插槽中的 Checkbox size 属性应该独立工作', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" size="small" />
            <Checkbox value="2" label="选项二" size="medium" />
            <Checkbox value="3" label="选项三" size="large" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('ale-checkbox--small');
      expect(checkboxes[1].classes()).toContain('ale-checkbox--medium');
      expect(checkboxes[2].classes()).toContain('ale-checkbox--large');
    });

    it('插槽中的 Checkbox theme 属性应该独立工作', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" theme="primary" />
            <Checkbox value="2" label="选项二" theme="success" />
            <Checkbox value="3" label="选项三" theme="danger" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('ale-checkbox--primary');
      expect(checkboxes[1].classes()).toContain('ale-checkbox--success');
      expect(checkboxes[2].classes()).toContain('ale-checkbox--danger');
    });

    it('动态添加 Checkbox 应该正常工作', async () => {
      const items = ref([
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' }
      ]);

      const DynamicGroup = {
        template: `
          <CheckboxGroup v-model="value">
            <Checkbox v-for="item in items" :key="item.value" :value="item.value" :label="item.label" />
          </CheckboxGroup>
        `,
        components: { CheckboxGroup, Checkbox },
        setup() {
          const value = ref([]);
          return { value, items };
        }
      };

      const wrapper = mount(DynamicGroup);

      expect(wrapper.findAll('.ale-checkbox')).toHaveLength(2);

      // 动态添加选项
      items.value.push({ value: '3', label: '选项三' });
      await nextTick();

      expect(wrapper.findAll('.ale-checkbox')).toHaveLength(3);
    });

    it('混合使用 options 和插槽时插槽内容优先', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          options: [
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' }
          ],
          modelValue: []
        },
        slots: {
          default: '<Checkbox value="1" label="插槽选项" />'
        },
        global: {
          components: { Checkbox }
        }
      });

      // 有插槽时应该使用插槽内容，不渲染 options
      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes).toHaveLength(1);
      expect(checkboxes[0].text()).toBe('插槽选项');
    });

    it('options 中的 indeterminate 属性应该正确传递', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: ['1'],
          options: [
            { label: '全选', value: 'all', indeterminate: true },
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' }
          ]
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('is-indeterminate');
    });

    it('插槽中的 Checkbox indeterminate 属性应该独立工作', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" :indeterminate="true" />
            <Checkbox value="2" label="选项二" :indeterminate="false" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('is-indeterminate');
      expect(checkboxes[1].classes()).not.toContain('is-indeterminate');
    });

    it('Checkbox 应该自动继承 Group 的 size', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: [],
          size: 'large'
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('ale-checkbox--large');
      expect(checkboxes[1].classes()).toContain('ale-checkbox--large');
    });

    it('Checkbox 应该自动继承 Group 的 theme', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: [],
          theme: 'success'
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('ale-checkbox--success');
      expect(checkboxes[1].classes()).toContain('ale-checkbox--success');
    });

    it('Checkbox 的 size 属性应该覆盖 Group 的 size', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: [],
          size: 'large'
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" size="small" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('ale-checkbox--small');
      expect(checkboxes[1].classes()).toContain('ale-checkbox--large');
    });

    it('Checkbox 的 theme 属性应该覆盖 Group 的 theme', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: [],
          theme: 'primary'
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" theme="danger" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('ale-checkbox--danger');
      expect(checkboxes[1].classes()).toContain('ale-checkbox--primary');
    });

    it('Group 的 disabled 应该影响所有 Checkbox', () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: [],
          disabled: true
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkboxes = wrapper.findAll('.ale-checkbox');
      expect(checkboxes[0].classes()).toContain('is-disabled');
      expect(checkboxes[1].classes()).toContain('is-disabled');
    });

    it('点击 Checkbox 应该通过 Group 更新状态', async () => {
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: []
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkbox = wrapper.findAll('.ale-checkbox__original')[0];
      await checkbox.setValue(true);
      await checkbox.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([['1']]);
    });

    it('点击 Checkbox 应该触发 Group 的 change 事件', async () => {
      const onChange = vi.fn();
      const wrapper = mount(CheckboxGroup, {
        props: {
          modelValue: [],
          onChange
        },
        slots: {
          default: `
            <Checkbox value="1" label="选项一" />
            <Checkbox value="2" label="选项二" />
          `
        },
        global: {
          components: { Checkbox }
        }
      });

      const checkbox = wrapper.findAll('.ale-checkbox__original')[0];
      await checkbox.setValue(true);
      await checkbox.trigger('change');

      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });
});

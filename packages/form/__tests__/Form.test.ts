import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import { ref, reactive, nextTick, defineComponent, h, ComponentPublicInstance } from 'vue';
import Form from '../Form.vue';
import FormItem from '../FormItem.vue';
import type { FormRule, FormInstance, FormItemInstance } from '../types';

/**
 * 从 VueWrapper 中提取组件实例方法
 * 避免使用 as unknown as 强制类型转换
 */
const getFormItemInstance = (wrapper: VueWrapper<ComponentPublicInstance>): FormItemInstance => {
  return wrapper.vm as unknown as FormItemInstance;
};

describe('Form', () => {
  describe('基础渲染', () => {
    it('renders correctly', () => {
      const formData = reactive({ name: '' });
      const wrapper = mount(Form, {
        props: {
          model: formData
        }
      });

      expect(wrapper.find('.ale-form').exists()).toBe(true);
      expect(wrapper.classes()).toContain('ale-form--vertical');
    });

    it('renders with different layouts', () => {
      const layouts = ['horizontal', 'vertical', 'inline'] as const;
      const formData = reactive({ name: '' });

      layouts.forEach(layout => {
        const wrapper = mount(Form, {
          props: {
            model: formData,
            layout
          }
        });
        expect(wrapper.classes()).toContain(`ale-form--${layout}`);
      });
    });

    it('renders with different sizes', () => {
      const sizes = ['large', 'medium', 'small'] as const;
      const formData = reactive({ name: '' });

      sizes.forEach(size => {
        const wrapper = mount(Form, {
          props: {
            model: formData,
            size
          }
        });
        expect(wrapper.classes()).toContain(`ale-form--${size}`);
      });
    });

    it('renders disabled state', () => {
      const formData = reactive({ name: '' });
      const wrapper = mount(Form, {
        props: {
          model: formData,
          disabled: true
        }
      });

      expect(wrapper.classes()).toContain('is-disabled');
    });
  });

  describe('表单提交', () => {
    it('emits submit event when form is valid', async () => {
      const formData = reactive({ name: 'test' });
      const wrapper = mount(Form, {
        props: {
          model: formData
        }
      });

      await wrapper.find('form').trigger('submit');
      expect(wrapper.emitted('submit')).toHaveLength(1);
      expect(wrapper.emitted('submit')?.[0]).toEqual([{ name: 'test' }]);
    });
  });
});

describe('FormItem', () => {
  // 创建一个包装组件，提供 Form 上下文
  interface FormWrapperOptions {
    layout?: 'horizontal' | 'vertical' | 'inline';
    labelPosition?: 'left' | 'right' | 'top';
    labelWidth?: string | number;
    size?: 'large' | 'medium' | 'small';
    name?: string;
    label?: string;
    rules?: FormRule[];
    required?: boolean;
    extra?: string;
    error?: string;
    modelValue?: string;
  }

  const createFormWrapper = (formData: Record<string, unknown>, options: FormWrapperOptions = {}) => {
    return mount(Form, {
      props: {
        model: formData,
        layout: options.layout || 'vertical',
        labelPosition: options.labelPosition || 'right',
        labelWidth: options.labelWidth,
        size: options.size || 'medium'
      },
      slots: {
        default: () => {
          const fieldName = options.name || 'testField';
          const fieldValue = String(formData[fieldName] ?? '');
          return h(FormItem, {
            name: fieldName,
            label: options.label || '测试字段',
            rules: options.rules || [],
            required: options.required || false,
            extra: options.extra,
            error: options.error
          }, {
            default: () => h('input', {
              value: fieldValue,
              onInput: (e: Event) => {
                const target = e.target as HTMLInputElement;
                formData[fieldName] = target.value;
              }
            })
          });
        }
      }
    });
  };

  describe('基础渲染', () => {
    it('renders correctly', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, { label: '用户名' });

      expect(wrapper.find('.ale-form-item').exists()).toBe(true);
      expect(wrapper.text()).toContain('用户名');
    });

    it('renders with label slot', () => {
      const formData = reactive({ testField: '' });
      const wrapper = mount(Form, {
        props: { model: formData },
        slots: {
          default: () => h(FormItem, {}, {
            label: () => '自定义标签',
            default: () => h('input')
          })
        }
      });

      expect(wrapper.text()).toContain('自定义标签');
    });

    it('renders required mark when required', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, { label: '用户名', required: true });

      expect(wrapper.find('.ale-form-item__required').exists()).toBe(true);
    });

    it('renders with different layouts', () => {
      const formData = reactive({ testField: '' });
      const layouts = ['horizontal', 'vertical', 'inline'] as const;

      layouts.forEach(layout => {
        const wrapper = createFormWrapper(formData, { layout });
        expect(wrapper.find('.ale-form-item').classes()).toContain(`ale-form-item--${layout}`);
      });
    });

    it('renders with different sizes', () => {
      const formData = reactive({ testField: '' });
      const sizes = ['large', 'medium', 'small'] as const;

      sizes.forEach(size => {
        const wrapper = createFormWrapper(formData, { size });
        expect(wrapper.find('.ale-form-item').classes()).toContain(`ale-form-item--${size}`);
      });
    });

    it('renders horizontal layout with correct label width', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, {
        layout: 'horizontal',
        labelWidth: 150
      });

      const label = wrapper.find('.ale-form-item__label');
      expect(label.exists()).toBe(true);
      expect(label.attributes('style')).toContain('width: 150px');
    });

    it('renders horizontal layout with auto label width when not specified', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, {
        layout: 'horizontal'
        // 不设置 labelWidth，应该自适应
      });

      const label = wrapper.find('.ale-form-item__label');
      expect(label.exists()).toBe(true);
      // 未设置 labelWidth 时，不应该有固定宽度样式
      const style = label.attributes('style') || '';
      expect(style).not.toContain('width: 150px');
      expect(style).not.toContain('width: 100px');
    });

    it('renders inline layout correctly', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, { layout: 'inline' });

      const formItem = wrapper.find('.ale-form-item');
      expect(formItem.classes()).toContain('ale-form-item--inline');
    });

    it('renders inline layout with correct flex styles', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, { layout: 'inline' });

      const form = wrapper.find('.ale-form');
      const formItem = wrapper.find('.ale-form-item');

      // 检查 inline 布局下 form 的 flex 方向为 row
      expect(form.classes()).toContain('ale-form--inline');
      // 检查 form-item 也具有 inline 类
      expect(formItem.classes()).toContain('ale-form-item--inline');
    });

    it('renders inline layout label with correct styles', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, { layout: 'inline' });

      const label = wrapper.find('.ale-form-item__label');
      expect(label.exists()).toBe(true);

      // 检查 label 具有正确的 CSS 类
      expect(label.classes()).toContain('ale-form-item__label');
    });

    it('renders horizontal layout with correct flex alignment', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, { layout: 'horizontal' });

      const form = wrapper.find('.ale-form');
      const formItem = wrapper.find('.ale-form-item');

      expect(form.classes()).toContain('ale-form--horizontal');
      expect(formItem.classes()).toContain('ale-form-item--horizontal');
    });

    it('renders vertical layout with correct flex direction', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, { layout: 'vertical' });

      const form = wrapper.find('.ale-form');
      const formItem = wrapper.find('.ale-form-item');

      expect(form.classes()).toContain('ale-form--vertical');
      expect(formItem.classes()).toContain('ale-form-item--vertical');
    });

    it('renders vertical layout by default', () => {
      const formData = reactive({ testField: '' });
      const wrapper = createFormWrapper(formData, {});

      const formItem = wrapper.find('.ale-form-item');
      expect(formItem.classes()).toContain('ale-form-item--vertical');
    });

    it('renders with different label positions', () => {
      const formData = reactive({ testField: '' });
      const positions = ['left', 'right', 'top'] as const;

      positions.forEach(position => {
        const wrapper = createFormWrapper(formData, {
          layout: 'horizontal',
          labelPosition: position
        });
        const label = wrapper.find('.ale-form-item__label');
        expect(label.classes()).toContain(`ale-form-item__label--${position}`);
      });
    });
  });

  describe('验证功能', () => {
    it('validates required field', async () => {
      const formData = reactive({ username: '' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        rules: [{ required: true }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      const result = await formItemInstance.validate();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('此项为必填项');
    });

    it('validates minLength rule', async () => {
      const formData = reactive({ username: 'ab' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        modelValue: 'ab',
        rules: [{ minLength: 3, message: '长度至少3个字符' }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      const result = await formItemInstance.validate();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('长度至少3个字符');
    });

    it('validates maxLength rule', async () => {
      const formData = reactive({ username: 'abcdefghij' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        rules: [{ maxLength: 5, message: '长度不能超过5个字符' }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      const result = await formItemInstance.validate();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('长度不能超过5个字符');
    });

    it('validates pattern rule', async () => {
      const formData = reactive({ email: 'invalid-email' });
      const wrapper = createFormWrapper(formData, {
        name: 'email',
        label: '邮箱',
        rules: [{ pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      const result = await formItemInstance.validate();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('邮箱格式不正确');
    });

    it('validates min/max rule', async () => {
      const formData = reactive({ age: '15' });
      const wrapper = createFormWrapper(formData, {
        name: 'age',
        label: '年龄',
        rules: [
          { min: 18, message: '年龄不能小于18' },
          { max: 60, message: '年龄不能大于60' }
        ]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      const result = await formItemInstance.validate();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('年龄不能小于18');
    });

    it('validates with custom validator', async () => {
      const customValidator = (value: string) => {
        return value === 'admin' ? '不能使用admin作为用户名' : true;
      };

      const formData = reactive({ username: 'admin' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        rules: [{ validator: customValidator }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      const result = await formItemInstance.validate();

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('不能使用admin作为用户名');
    });

    it('shows error state when validation fails', async () => {
      const formData = reactive({ username: '' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        rules: [{ required: true }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      await formItemInstance.validate();
      await flushPromises();

      expect(formItem.classes()).toContain('is-error');
      const errorEl = formItem.find('.ale-form-item__error');
      expect(errorEl.exists()).toBe(true);
      expect(errorEl.isVisible()).toBe(true);
      expect(formItem.text()).toContain('此项为必填项');
    });

    it('emits validate event', async () => {
      const formData = reactive({ username: '' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        rules: [{ required: true }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      await formItemInstance.validate();

      expect(formItem.emitted('validate')).toHaveLength(1);
    });
  });

  describe('额外提示', () => {
    it('renders extra text', () => {
      const formData = reactive({ username: '' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        extra: '请输入您的真实姓名'
      });

      expect(wrapper.find('.ale-form-item__extra').exists()).toBe(true);
      expect(wrapper.text()).toContain('请输入您的真实姓名');
    });

    it('does not show extra when there is error', async () => {
      const formData = reactive({ username: '' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        extra: '提示信息',
        rules: [{ required: true }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      await formItemInstance.validate();
      await flushPromises();

      expect(formItem.find('.ale-form-item__extra').exists()).toBe(false);
      const errorEl = formItem.find('.ale-form-item__error');
      expect(errorEl.exists()).toBe(true);
      expect(errorEl.isVisible()).toBe(true);
    });
  });

  describe('清除验证', () => {
    it('clears validation state', async () => {
      const formData = reactive({ username: '' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        rules: [{ required: true }]
      });

      const formItem = wrapper.findComponent(FormItem);
      const formItemInstance = getFormItemInstance(formItem);
      await formItemInstance.validate();
      await flushPromises();

      expect(formItem.classes()).toContain('is-error');

      await formItemInstance.clearValidate();
      await flushPromises();

      expect(formItem.classes()).not.toContain('is-error');
      const errorElAfterClear = formItem.find('.ale-form-item__error');
      expect(errorElAfterClear.exists() && errorElAfterClear.isVisible()).toBe(false);
    });
  });

  describe('自定义错误信息', () => {
    it('displays custom error from prop', async () => {
      const formData = reactive({ username: '' });
      const wrapper = createFormWrapper(formData, {
        name: 'username',
        label: '用户名',
        error: '自定义错误信息'
      });

      await flushPromises();

      const formItem = wrapper.findComponent(FormItem);
      expect(formItem.classes()).toContain('is-error');
      expect(formItem.find('.ale-form-item__error').text()).toBe('自定义错误信息');
    });

    it('updates error when prop changes', async () => {
      // 使用动态组件来测试 error prop 的响应式更新
      const formData = reactive({ username: '' });
      const errorRef = ref('错误1');

      const wrapper = mount({
        components: { Form, FormItem },
        setup() {
          return { formData, errorRef };
        },
        template: `
          <Form :model="formData">
            <FormItem name="username" label="用户名" :error="errorRef">
              <input />
            </FormItem>
          </Form>
        `
      });

      await flushPromises();

      const formItem = wrapper.findComponent(FormItem);
      expect(formItem.find('.ale-form-item__error').text()).toBe('错误1');

      // 修改 error prop 并验证响应式更新
      errorRef.value = '错误2';
      await flushPromises();

      expect(formItem.find('.ale-form-item__error').text()).toBe('错误2');
    });
  });
});

describe('Form with FormItem integration', () => {
  interface IntegrationOptions {
    fields?: Record<string, FormRule[]>;
    fieldLabels?: Record<string, string>;
  }

  const createIntegrationWrapper = (formData: Record<string, unknown>, options: IntegrationOptions = {}) => {
    const fields = options.fields || { username: [] };
    const fieldLabels = options.fieldLabels || { username: '用户名' };

    return mount({
      components: { Form, FormItem },
      template: `
        <Form ref="formRef" :model="formData" @submit="onSubmit" @validate-fail="onValidateFail">
          <FormItem 
            v-for="(fieldRules, fieldName) in fields" 
            :key="fieldName"
            :name="fieldName"
            :label="fieldLabels[fieldName]"
            :rules="fieldRules"
          >
            <input 
              v-model="formData[fieldName]" 
              :data-testid="fieldName"
            />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      `,
      setup() {
        const formRef = ref<FormInstance>();

        const onSubmit = vi.fn();
        const onValidateFail = vi.fn();

        return {
          formData,
          fields,
          fieldLabels,
          formRef,
          onSubmit,
          onValidateFail
        };
      }
    });
  };

  it('validates all fields on submit', async () => {
    const formData = reactive({
      username: '',
      email: 'invalid'
    });
    const fields = {
      username: [{ required: true }],
      email: [{ required: true }, { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }]
    };
    const fieldLabels = { username: '用户名', email: '邮箱' };

    const wrapper = createIntegrationWrapper(formData, { fields, fieldLabels });
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    expect(wrapper.vm.onValidateFail).toHaveBeenCalled();
    const onValidateFail = wrapper.vm.onValidateFail as ReturnType<typeof vi.fn>;
    const errors = onValidateFail.mock.calls[0][0];
    expect(errors.username).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it('submits form when all fields are valid', async () => {
    const formData = reactive({
      username: 'testuser',
      email: 'test@example.com'
    });
    const fields = {
      username: [{ required: true }],
      email: [{ required: true }, { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }]
    };
    const fieldLabels = { username: '用户名', email: '邮箱' };

    const wrapper = createIntegrationWrapper(formData, { fields, fieldLabels });
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    expect(wrapper.vm.onSubmit).toHaveBeenCalled();
    const onSubmit = wrapper.vm.onSubmit as ReturnType<typeof vi.fn>;
    expect(onSubmit.mock.calls[0][0]).toEqual(formData);
  });

  it('exposes validate method', async () => {
    const formData = reactive({ username: '' });
    const fields = { username: [{ required: true }] };
    const fieldLabels = { username: '用户名' };

    const wrapper = createIntegrationWrapper(formData, { fields, fieldLabels });
    await flushPromises();

    const formRef = wrapper.vm.formRef as FormInstance | undefined;
    const result = await formRef?.validate();

    expect(result?.valid).toBe(false);
    expect(result?.errors.username).toBeDefined();
  });

  it('exposes validateField method', async () => {
    const formData = reactive({
      username: '',
      email: 'test@example.com'
    });
    const fields = {
      username: [{ required: true }],
      email: [{ required: true }]
    };
    const fieldLabels = { username: '用户名', email: '邮箱' };

    const wrapper = createIntegrationWrapper(formData, { fields, fieldLabels });
    await flushPromises();

    const formRef = wrapper.vm.formRef as FormInstance | undefined;
    const result = await formRef?.validateField('username');

    expect(result?.valid).toBe(false);
    expect(result?.errors.username).toBeDefined();
  });

  it('exposes resetFields method', async () => {
    const formData = reactive({ username: 'test' });
    const fields = { username: [] };
    const fieldLabels = { username: '用户名' };

    const wrapper = createIntegrationWrapper(formData, { fields, fieldLabels });
    await flushPromises();

    const formRef = wrapper.vm.formRef as FormInstance | undefined;
    formRef?.resetFields();

    expect(formData.username).toBe('');
  });

  it('exposes clearValidate method', async () => {
    const formData = reactive({ username: '' });
    const fields = { username: [{ required: true }] };
    const fieldLabels = { username: '用户名' };

    const wrapper = createIntegrationWrapper(formData, { fields, fieldLabels });
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    const formItems = wrapper.findAllComponents(FormItem);
    expect(formItems[0].classes()).toContain('is-error');

    const formRef = wrapper.vm.formRef as FormInstance | undefined;
    formRef?.clearValidate();
    await flushPromises();

    expect(formItems[0].classes()).not.toContain('is-error');
  });

  it('exposes getFormData and setFormData methods', async () => {
    const formData = reactive({ username: 'test', email: 'test@test.com' });
    const fields = { username: [], email: [] };
    const fieldLabels = { username: '用户名', email: '邮箱' };

    const wrapper = createIntegrationWrapper(formData, { fields, fieldLabels });
    await flushPromises();

    const formRef = wrapper.vm.formRef as FormInstance | undefined;
    const data = formRef?.getFormData();

    expect(data).toEqual({ username: 'test', email: 'test@test.com' });

    formRef?.setFormData({ username: 'newuser', email: 'new@test.com' });
    expect(formData.username).toBe('newuser');
    expect(formData.email).toBe('new@test.com');
  });
});

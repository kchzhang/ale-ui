<template>
  <form
    :class="formClass"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, reactive, ref, computed } from 'vue';
import type {
  FormProps,
  FormEmits,
  FormContext,
  FormItemInstance,
  FormInstance,
  ValidationResult,
  FormField
} from './types';
import { FORM_CONTEXT_KEY } from './constants';
import './Form.css';

const props = withDefaults(defineProps<FormProps>(), {
  layout: 'vertical',
  labelPosition: 'left',
  size: 'medium',
  disabled: false,
  showRequiredMark: true,
  labelGap: 8
});

const emit = defineEmits<FormEmits>();

/** 表单字段映射 */
const formFields = ref(new Map<string, FormField>());

/** 注册的表单项实例 */
const fieldInstances = ref(new Map<string, FormItemInstance>());

/** 验证错误信息 */
const errors = reactive<Record<string, string[]>>({});

/**
 * 表单类名
 */
const formClass = computed(() => {
  const classes: Record<string, boolean> = {
    'ale-form': true,
    [`ale-form--${props.layout}`]: true,
    [`ale-form--${props.size}`]: !!props.size
  };
  
  // 只有设置了 disabled 才添加 is-disabled 类
  if (props.disabled) {
    classes['is-disabled'] = true;
  }
  
  return classes;
});

/**
 * 注册表单项
 */
const registerField = (name: string, instance: FormItemInstance, fieldConfig?: FormField) => {
  fieldInstances.value.set(name, instance);
  if (fieldConfig) {
    formFields.value.set(name, fieldConfig);
  }
};

/**
 * 注销表单项
 */
const unregisterField = (name: string) => {
  fieldInstances.value.delete(name);
  formFields.value.delete(name);
};

/**
 * 字段值变化处理
 */
const onFieldChange = (name: string, value: any) => {
  props.model[name] = value;
  emit('field-change', name, value, { ...props.model });
};

/**
 * 字段验证处理
 */
const onFieldValidate = (name: string, valid: boolean, fieldErrors: string[]) => {
  if (!valid) {
    errors[name] = fieldErrors;
  } else {
    delete errors[name];
  }
};

/**
 * 字段获得焦点处理
 */
const onFieldFocus = (name: string) => {
  // 可以在这里添加焦点时的逻辑，如清除错误状态等
  const fieldConfig = formFields.value.get(name);
  if (fieldConfig?.rules) {
    // 检查是否有 focus 触发的验证规则
    const hasFocusRule = fieldConfig.rules.some(rule => {
      const trigger = rule.trigger;
      return trigger === 'focus' || (Array.isArray(trigger) && trigger.includes('focus'));
    });
    if (hasFocusRule) {
      validateSingleField(name);
    }
  }
};

/**
 * 字段失去焦点处理
 */
const onFieldBlur = (name: string) => {
  const fieldConfig = formFields.value.get(name);
  if (fieldConfig?.rules) {
    // 检查是否有 blur 触发的验证规则
    const hasBlurRule = fieldConfig.rules.some(rule => {
      const trigger = rule.trigger;
      return trigger === 'blur' || (Array.isArray(trigger) && trigger.includes('blur'));
    });
    if (hasBlurRule) {
      validateSingleField(name);
    }
  }
};

/**
 * 更新字段配置
 */
const updateFieldConfig = (name: string, config: Partial<FormField>) => {
  const existing = formFields.value.get(name);
  if (existing) {
    formFields.value.set(name, { ...existing, ...config });
  } else {
    formFields.value.set(name, { name, ...config } as FormField);
  }
};

/**
 * 验证单个字段
 */
const validateSingleField = async (fieldName: string): Promise<{ valid: boolean; errors: string[] }> => {
  const instance = fieldInstances.value.get(fieldName);
  if (instance && instance.validate) {
    return instance.validate();
  }
  return { valid: true, errors: [] };
};

/**
 * 验证整个表单
 */
const validateAll = async (): Promise<ValidationResult> => {
  const fieldNames = Array.from(fieldInstances.value.keys());
  const allErrors: Record<string, string[]> = {};
  let allValid = true;

  for (const fieldName of fieldNames) {
    const result = await validateSingleField(fieldName);
    if (!result.valid) {
      allValid = false;
      allErrors[fieldName] = result.errors;
    }
  }

  return { valid: allValid, errors: allErrors };
};

/**
 * 验证指定字段
 */
const validateField = async (field: string | string[]): Promise<ValidationResult> => {
  if (Array.isArray(field)) {
    const allErrors: Record<string, string[]> = {};
    let allValid = true;

    for (const fieldName of field) {
      const result = await validateSingleField(fieldName);
      if (!result.valid) {
        allValid = false;
        allErrors[fieldName] = result.errors;
      }
    }

    return { valid: allValid, errors: allErrors };
  }

  const result = await validateSingleField(field);
  return {
    valid: result.valid,
    errors: result.valid ? {} : { [field]: result.errors }
  };
};

/**
 * 提交表单
 */
const handleSubmit = async () => {
  const result = await validateAll();
  if (result.valid) {
    emit('submit', { ...props.model });
  } else {
    emit('validate-fail', result.errors);
  }
};

/**
 * 清除验证状态
 */
const clearValidate = (field?: string | string[]) => {
  if (field === undefined) {
    Object.keys(errors).forEach(key => {
      delete errors[key];
    });
    // 清除所有 FormItem 的验证状态
    fieldInstances.value.forEach(instance => {
      if (instance.clearValidate) {
        instance.clearValidate();
      }
    });
  } else if (Array.isArray(field)) {
    field.forEach(name => {
      delete errors[name];
      const instance = fieldInstances.value.get(name);
      if (instance && instance.clearValidate) {
        instance.clearValidate();
      }
    });
  } else {
    delete errors[field];
    const instance = fieldInstances.value.get(field);
    if (instance && instance.clearValidate) {
      instance.clearValidate();
    }
  }
};

/**
 * 重置表单
 */
const resetFields = () => {
  Object.keys(props.model).forEach(key => {
    const field = formFields.value.get(key);
    if (field && field.defaultValue !== undefined) {
      props.model[key] = field.defaultValue;
    } else {
      const value = props.model[key];
      if (Array.isArray(value)) {
        props.model[key] = [];
      } else if (typeof value === 'object' && value !== null) {
        props.model[key] = {};
      } else {
        props.model[key] = '';
      }
    }
    // 重置单个字段
    const instance = fieldInstances.value.get(key);
    if (instance && instance.resetField) {
      instance.resetField();
    }
  });
  clearValidate();
};

/**
 * 获取表单数据
 */
const getFormData = (): Record<string, any> => {
  return { ...props.model };
};

/**
 * 设置表单数据
 */
const setFormData = (data: Record<string, any>) => {
  Object.keys(data).forEach(key => {
    if (key in props.model) {
      props.model[key] = data[key];
    }
  });
};

/**
 * 提供表单上下文 - 使用 computed 使属性响应式
 */
provide<FormContext>(FORM_CONTEXT_KEY, {
  model: props.model,
  layout: computed(() => props.layout),
  labelPosition: computed(() => props.labelPosition),
  labelWidth: computed(() => props.labelWidth),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  showRequiredMark: computed(() => props.showRequiredMark),
  labelGap: computed(() => props.labelGap),
  registerField,
  unregisterField,
  onFieldChange,
  onFieldValidate,
  updateFieldConfig,
  onFieldFocus,
  onFieldBlur
});

/**
 * 暴露表单实例方法
 */
defineExpose<FormInstance>({
  validate: validateAll,
  validateField,
  resetFields,
  clearValidate,
  getFormData,
  setFormData
});
</script>

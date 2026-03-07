<template>
  <div
    :class="formItemClass"
    :style="formItemStyle"
  >
    <!-- 标签 -->
    <label
      v-if="label || $slots.label"
      :class="labelClass"
      :style="labelStyle"
    >
      <span v-if="isRequired" class="ale-form-item__required">*</span>
      <slot name="label">
        {{ label }}
      </slot>
    </label>

    <!-- 内容区域 -->
    <div class="ale-form-item__content">
      <slot :size="formSize" :on-focus="handleFocus" :on-blur="handleBlur" />

      <!-- 错误信息 -->
      <div class="ale-form-item__error-wrapper">
        <transition name="ale-form-error">
          <div
            v-show="showErrorMessage && currentError"
            class="ale-form-item__error"
          >
            {{ currentError }}
          </div>
        </transition>
      </div>

      <!-- 额外提示 -->
      <div
        v-if="extra && !currentError"
        class="ale-form-item__extra"
      >
        {{ extra }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue';
import type {
  FormItemProps,
  FormItemEmits,
  FormContext,
  FormItemInstance,
  FormRule
} from './types';
import { FORM_CONTEXT_KEY } from './constants';

const props = withDefaults(defineProps<FormItemProps>(), {
  required: false,
  showError: true,
  labelHeightMode: 'adaptive',
  multiline: false
});

const emit = defineEmits<FormItemEmits>();

/** 注入表单上下文 */
const formContext = inject<FormContext>(FORM_CONTEXT_KEY);

/** 当前错误信息 */
const currentError = ref('');

/** 是否验证失败 */
const isInvalid = ref(false);

/**
 * 是否有必填规则
 */
const isRequired = computed(() => {
  if (props.required) return true;
  if (props.rules && props.rules.some(rule => rule.required)) return true;
  return false;
});

/**
 * 当前字段的完整规则
 */
const currentRules = computed<FormRule[]>(() => {
  const rules: FormRule[] = [];
  if (props.rules) {
    rules.push(...props.rules);
  }
  return rules;
});

/**
 * 是否显示错误信息
 */
const showErrorMessage = computed(() => {
  return props.showError !== false;
});

/**
 * 辅助函数：从可能为 ComputedRef 或普通值的属性中提取值
 */
function getContextValue<T>(value: T | import('vue').ComputedRef<T> | undefined, defaultValue: T): T {
  if (value === undefined) return defaultValue;
  if (typeof value === 'object' && value !== null && 'value' in value) {
    return (value as import('vue').ComputedRef<T>).value;
  }
  return value as T;
}

/**
 * 表单布局
 */
const layout = computed(() => getContextValue(formContext?.layout, 'vertical'));

/**
 * 表单尺寸
 */
const formSize = computed(() => getContextValue(formContext?.size, 'medium'));

/**
 * 标签位置
 */
const labelPosition = computed(() => getContextValue(formContext?.labelPosition, 'left'));

/**
 * 标签宽度 - 未设置时自适应
 */
const labelWidth = computed(() => {
  if (props.labelWidth !== undefined) return props.labelWidth;
  // 如果上下文没有设置 labelWidth，返回 undefined 表示自适应
  const contextValue = getContextValue(formContext?.labelWidth, undefined);
  return contextValue;
});

/**
 * 标签与控件间距
 */
const labelGap = computed(() => getContextValue(formContext?.labelGap, 8));

/**
 * 是否禁用
 */
const isDisabled = computed(() => getContextValue(formContext?.disabled, false) === true);

/**
 * 表单项类名
 */
const formItemClass = computed(() => ({
  'ale-form-item': true,
  [`ale-form-item--${layout.value}`]: true,
  [`ale-form-item--${formSize.value}`]: formSize.value,
  'is-required': isRequired.value,
  'is-error': isInvalid.value,
  'is-disabled': isDisabled.value
}));

/**
 * 表单项样式
 */
const formItemStyle = computed(() => {
  const style: Record<string, string> = {};
  if (layout.value === 'horizontal') {
    style.gap = `${typeof labelGap.value === 'number' ? labelGap.value : parseInt(labelGap.value as string)}px`;
  }
  return style;
});

/**
 * 标签类名
 */
const labelClass = computed(() => ({
  'ale-form-item__label': true,
  [`ale-form-item__label--${labelPosition.value}`]: labelPosition.value,
  [`ale-form-item__label--${formSize.value}`]: formSize.value,
  'is-fixed-height': props.labelHeightMode === 'fixed',
  'is-auto-height': props.labelHeightMode === 'auto',
  'is-multiline': props.multiline
}));

/**
 * 标签样式 - 未设置 labelWidth 时自适应宽度
 */
const labelStyle = computed(() => {
  const style: Record<string, string> = {};
  if (layout.value === 'horizontal' && labelWidth.value !== undefined) {
    const width = typeof labelWidth.value === 'number'
      ? `${labelWidth.value}px`
      : labelWidth.value;
    style.width = width;
    style.flexShrink = '0';
  }
  return style;
});

/**
 * 根据路径获取嵌套对象的值
 * 支持路径如: "name", "items.0.name", "user.profile.email"
 */
const getValueByPath = (obj: any, path: string): any => {
  if (!obj || !path) return undefined;
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
    if (value === undefined || value === null) return undefined;
    value = value[key];
  }
  return value;
};

/**
 * 字段值
 */
const fieldValue = computed(() => {
  if (!props.name || !formContext) return undefined;
  return getValueByPath(formContext.model, props.name);
});

/**
 * 验证单个规则
 */
const validateRule = async (value: any, rule: FormRule): Promise<string> => {
  // 必填验证
  if (rule.required) {
    const isEmpty = value === undefined || value === null || value === '' ||
      (Array.isArray(value) && value.length === 0);
    if (isEmpty) {
      return rule.requiredMessage || rule.message || '此项为必填项';
    }
  }

  // 空值跳过后续验证
  if (value === undefined || value === null || value === '') {
    return '';
  }

  // 最小长度验证
  if (rule.minLength !== undefined) {
    const length = Array.isArray(value) ? value.length : String(value).length;
    if (length < rule.minLength) {
      return rule.message || `长度不能少于 ${rule.minLength} 个字符`;
    }
  }

  // 最大长度验证
  if (rule.maxLength !== undefined) {
    const length = Array.isArray(value) ? value.length : String(value).length;
    if (length > rule.maxLength) {
      return rule.message || `长度不能超过 ${rule.maxLength} 个字符`;
    }
  }

  // 最小值验证
  if (rule.min !== undefined) {
    const num = Number(value);
    if (!isNaN(num) && num < rule.min) {
      return rule.message || `不能小于 ${rule.min}`;
    }
  }

  // 最大值验证
  if (rule.max !== undefined) {
    const num = Number(value);
    if (!isNaN(num) && num > rule.max) {
      return rule.message || `不能大于 ${rule.max}`;
    }
  }

  // 正则验证
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return rule.message || '格式不正确';
  }

  // 自定义验证器
  if (rule.validator) {
    const result = await rule.validator(value, formContext?.model || {});
    if (result === false) {
      return rule.message || '验证失败';
    }
    if (typeof result === 'string') {
      return result;
    }
  }

  return '';
};

/**
 * 验证字段
 */
const validate = async (): Promise<{ valid: boolean; errors: string[] }> => {
  if (!props.name || currentRules.value.length === 0) {
    return { valid: true, errors: [] };
  }

  const value = fieldValue.value;
  const fieldErrors: string[] = [];

  for (const rule of currentRules.value) {
    const error = await validateRule(value, rule);
    if (error) {
      fieldErrors.push(error);
    }
  }

  const valid = fieldErrors.length === 0;
  isInvalid.value = !valid;
  currentError.value = valid ? '' : (fieldErrors[0] || '');

  // 通知表单组件
  if (formContext && props.name) {
    formContext.onFieldValidate(props.name, valid, fieldErrors);
  }

  emit('validate', props.name, valid, fieldErrors);

  return { valid, errors: fieldErrors };
};

/**
 * 清除验证状态
 */
const clearValidate = () => {
  isInvalid.value = false;
  currentError.value = '';
};

/**
 * 重置字段
 */
const resetField = () => {
  clearValidate();
  if (formContext && props.name) {
    formContext.onFieldChange(props.name, '');
  }
};

// 监听字段值变化进行验证（change 触发）
watch(
  () => fieldValue.value,
  (newValue, oldValue) => {
    // 值变化时触发 change 验证
    if (props.name && newValue !== oldValue) {
      const hasChangeTrigger = currentRules.value.some(rule => {
        const trigger = rule.trigger;
        return !trigger || trigger === 'change' || (Array.isArray(trigger) && trigger.includes('change'));
      });
      if (hasChangeTrigger) {
        validate();
      }
    }
    // 如果已经验证失败，继续验证以清除错误
    if (isInvalid.value && props.name) {
      validate();
    }
  }
);

/**
 * 处理字段获得焦点
 */
const handleFocus = () => {
  if (formContext && props.name) {
    formContext.onFieldFocus?.(props.name);
  }
};

/**
 * 处理字段失去焦点
 */
const handleBlur = () => {
  if (formContext && props.name) {
    formContext.onFieldBlur?.(props.name);
  }
};

// 监听外部错误
watch(
  () => props.error,
  (newError) => {
    if (newError) {
      currentError.value = newError;
      isInvalid.value = true;
    } else {
      clearValidate();
    }
  },
  { immediate: true }
);

// 注册到表单上下文
onMounted(() => {
  if (formContext && props.name) {
    const instance: FormItemInstance = {
      validate,
      clearValidate,
      resetField
    };
    formContext.registerField(props.name, instance);
  }
});

// 注销
onUnmounted(() => {
  if (formContext && props.name) {
    formContext.unregisterField(props.name);
  }
});

// 暴露实例方法
defineExpose<FormItemInstance>({
  validate,
  clearValidate,
  resetField
});
</script>

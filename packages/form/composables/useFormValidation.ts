import { reactive } from 'vue';
import type { FormRule, ValidationResult, FormField } from '../types';

/**
 * 表单验证组合式函数
 * @param formData - 表单数据
 * @param fields - 表单字段配置
 */
export function useFormValidation(
  formData: Record<string, any>,
  fields: Map<string, FormField>
) {
  /** 验证错误信息 */
  const errors = reactive<Record<string, string[]>>({});

  /** 字段验证状态 */
  const validState = reactive<Record<string, boolean>>({});

  /**
   * 验证单个规则
   * @param value - 字段值
   * @param rule - 验证规则
   * @returns 错误信息，验证通过返回空字符串
   */
  const validateRule = async (
    value: any,
    rule: FormRule,
    allData: Record<string, any>
  ): Promise<string> => {
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
      const result = await rule.validator(value, allData);
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
   * 验证单个字段
   * @param fieldName - 字段名
   * @returns 验证结果
   */
  const validateField = async (fieldName: string): Promise<{ valid: boolean; errors: string[] }> => {
    const field = fields.get(fieldName);
    if (!field || !field.rules || field.rules.length === 0) {
      return { valid: true, errors: [] };
    }

    const value = formData[fieldName];
    const fieldErrors: string[] = [];

    for (const rule of field.rules) {
      const error = await validateRule(value, rule, formData);
      if (error) {
        fieldErrors.push(error);
      }
    }

    errors[fieldName] = fieldErrors;
    validState[fieldName] = fieldErrors.length === 0;

    return {
      valid: fieldErrors.length === 0,
      errors: fieldErrors
    };
  };

  /**
   * 验证多个字段
   * @param fieldNames - 字段名数组
   * @returns 验证结果
   */
  const validateFields = async (fieldNames: string[]): Promise<ValidationResult> => {
    const allErrors: Record<string, string[]> = {};
    let allValid = true;

    for (const fieldName of fieldNames) {
      const result = await validateField(fieldName);
      if (!result.valid) {
        allValid = false;
        allErrors[fieldName] = result.errors;
      }
    }

    return { valid: allValid, errors: allErrors };
  };

  /**
   * 验证整个表单
   * @returns 验证结果
   */
  const validateAll = async (): Promise<ValidationResult> => {
    const fieldNames = Array.from(fields.keys());
    return validateFields(fieldNames);
  };

  /**
   * 清除验证状态
   * @param fieldName - 指定字段名，不传则清除所有
   */
  const clearValidate = (fieldName?: string | string[]) => {
    if (fieldName === undefined) {
      Object.keys(errors).forEach(key => {
        delete errors[key];
        delete validState[key];
      });
    } else if (Array.isArray(fieldName)) {
      fieldName.forEach(name => {
        delete errors[name];
        delete validState[name];
      });
    } else {
      delete errors[fieldName];
      delete validState[fieldName];
    }
  };

  /**
   * 重置字段验证状态
   * @param fieldName - 字段名
   */
  const resetField = (fieldName: string) => {
    delete errors[fieldName];
    delete validState[fieldName];
  };

  return {
    errors,
    validState,
    validateField,
    validateFields,
    validateAll,
    clearValidate,
    resetField
  };
}

/**
 * Form 组件入口
 * @description 表单组件及其子组件的入口文件
 */

import Form from './Form.vue';
import FormItem from './FormItem.vue';

export { Form, FormItem };

export type {
  FormProps,
  FormEmits,
  FormItemProps,
  FormItemEmits,
  FormLayout,
  LabelPosition,
  FormSize,
  FormRule,
  FormField,
  ValidationResult,
  FormInstance,
  FormItemInstance,
  FormContext,
  ValidateTrigger
} from './types';

export { useFormValidation } from './composables/useFormValidation';

export default Form;

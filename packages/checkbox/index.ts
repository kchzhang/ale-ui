/**
 * Checkbox 组件导出
 * @description 复选框组件的入口文件
 */

import Checkbox from './Checkbox.vue';
import CheckboxGroup from './CheckboxGroup.vue';

export type {
  CheckboxProps,
  CheckboxEmits,
  CheckboxSize,
  CheckboxTheme,
  CheckboxValue,
  CheckboxOption,
  CheckboxGroupProps,
  CheckboxGroupEmits
} from './types';

/**
 * AleCheckbox 组件
 */
export const AleCheckbox = Checkbox;

/**
 * AleCheckboxGroup 组件
 */
export const AleCheckboxGroup = CheckboxGroup;

/**
 * 默认导出
 */
export default Checkbox;

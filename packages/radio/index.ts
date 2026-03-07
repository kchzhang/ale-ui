import type { InjectionKey } from 'vue';
import type { RadioGroupContext } from './types';

/**
 * RadioGroup 上下文注入键
 */
export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupContext');

export { default as Radio } from './Radio.vue';
export { default as RadioGroup } from './RadioGroup.vue';

export type {
  RadioProps,
  RadioEmits,
  RadioSize,
  RadioTheme,
  RadioValue,
  RadioOption,
  RadioGroupProps,
  RadioGroupEmits,
  RadioGroupContext
} from './types';

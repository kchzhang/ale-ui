import type { InjectionKey } from 'vue';
import type { FormContext } from './types';

/**
 * 表单上下文注入键
 */
export const FORM_CONTEXT_KEY: InjectionKey<FormContext> = Symbol('formContext');

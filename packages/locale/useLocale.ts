import { inject, type Ref, ref, provide } from 'vue';
import type { AleUILocale } from './types';
import zhCN from './zh-CN';

const LOCALE_INJECTION_KEY = Symbol('ale-ui-locale');

/**
 * 注入语言配置到组件树
 */
export function provideLocale(locale: Ref<AleUILocale>) {
  provide(LOCALE_INJECTION_KEY, locale);
}

/**
 * 在组件中获取语言配置
 */
export function useLocale() {
  const locale = inject<Ref<AleUILocale>>(LOCALE_INJECTION_KEY);

  if (!locale) {
    // 如果没有注入，返回默认语言
    const defaultLocale = ref<AleUILocale>(zhCN);
    return {
      locale: defaultLocale,
      t: (key: string, params?: Record<string, any>) => {
        return translate(defaultLocale.value, key, params);
      }
    };
  }

  const t = (key: string, params?: Record<string, any>) => {
    return translate(locale.value, key, params);
  };

  return {
    locale,
    t
  };
}

/**
 * 翻译函数
 */
export function translate(
  locale: AleUILocale,
  key: string,
  params?: Record<string, any>
): any {
  const keys = key.split('.');
  let value: any = locale;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`[Ale UI] Missing translation for key: ${key}`);
      return key;
    }
  }

  // 如果是数组，直接返回
  if (Array.isArray(value)) {
    return value as any;
  }

  // 如果是字符串，进行参数替换
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey] !== undefined ? String(params[paramKey]) : `{${paramKey}}`;
    });
  }

  return value;
}

import { computed, inject, type Ref, provide } from 'vue';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import zhHK from './zh-HK';
import enUS from './en-US';

export type PageLocaleCode = 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US';

export interface PageLocale {
  code: PageLocaleCode;
  messages: Record<string, any>;
}

export const pageLocales: Record<PageLocaleCode, PageLocale> = {
  'zh-CN': {
    code: 'zh-CN',
    messages: zhCN
  },
  'zh-TW': {
    code: 'zh-TW',
    messages: zhTW
  },
  'zh-HK': {
    code: 'zh-HK',
    messages: zhHK
  },
  'en-US': {
    code: 'en-US',
    messages: enUS
  }
};

const PAGE_LOCALE_KEY = Symbol('page-locale');

/**
 * 提供页面多语言上下文
 */
export function providePageLocale(locale: Ref<PageLocale>) {
  provide(PAGE_LOCALE_KEY, locale);
}

/**
 * 使用页面多语言
 */
export function usePageLocale() {
  const locale = inject<Ref<PageLocale>>(PAGE_LOCALE_KEY);

  if (!locale) {
    throw new Error('usePageLocale must be used after providePageLocale');
  }

  /**
   * 翻译函数
   * @param key 翻译key，支持点语法，如 'nav.home'
   * @param params 替换参数，如 { count: 10 }
   */
  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = locale.value.messages;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }

    if (typeof value === 'string' && params) {
      // 替换参数，支持 {param} 格式
      return value.replace(/\{(\w+)\}/g, (match: string, param: string) => {
        return params[param] !== undefined ? String(params[param]) : match;
      });
    }

    return String(value);
  };

  return {
    t,
    locale: computed(() => locale.value),
    localeCode: computed(() => locale.value.code)
  };
}
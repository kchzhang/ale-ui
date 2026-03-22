import zhCN from './zh-CN';
import zhTW from './zh-TW';
import zhHK from './zh-HK';
import enUS from './en-US';
import { useLocale, provideLocale } from './useLocale';

export type { AleUILocale, LocaleCode } from './types';

// 导出所有语言包
export const locales = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'zh-HK': zhHK,
  'en-US': enUS
};

// 导出 Hook
export { useLocale, provideLocale };

// 导出单独的语言包
export { zhCN, zhTW, zhHK, enUS };

// 默认语言包
export default zhCN;

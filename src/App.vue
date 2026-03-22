<script setup lang="ts">
import { ref, watch } from 'vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { AleSelect, AleOption, provideLocale, zhCN, zhTW, zhHK, enUS } from '../packages';
import type { AleUILocale } from '../packages';
import { providePageLocale, pageLocales, type PageLocaleCode } from './locales/usePageLocale';

// 语言配置
const languageOptions = [
  { label: '简体中文', value: 'zh-CN', aleLocale: zhCN },
  { label: '繁体中文(台湾)', value: 'zh-TW', aleLocale: zhTW },
  { label: '繁体中文(香港)', value: 'zh-HK', aleLocale: zhHK },
  { label: 'English', value: 'en-US', aleLocale: enUS }
];

// 从localStorage读取保存的语言，默认中文
const savedLocaleCode = localStorage.getItem('ale-ui-locale') || 'zh-CN';
const currentLocaleCode = ref<PageLocaleCode>(savedLocaleCode as PageLocaleCode);

// 组件库语言
const aleLocale = ref<AleUILocale>(
  languageOptions.find(opt => opt.value === savedLocaleCode)?.aleLocale || zhCN
);
provideLocale(aleLocale);

// 页面语言
const pageLocale = ref(pageLocales[savedLocaleCode as PageLocaleCode] || pageLocales['zh-CN']);
providePageLocale(pageLocale);

// 简单翻译函数给当前组件使用（不需要usePageLocale，因为当前组件是provider）
const t = (key: string, params?: Record<string, any>): string => {
  const keys = key.split('.');
  let value: any = pageLocale.value.messages;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key;
  }

  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (_, param) => {
      return params[param] !== undefined ? String(params[param]) : `{${param}}`;
    });
  }

  return String(value);
};

// 监听语言变化
watch(currentLocaleCode, (newCode) => {
  const selected = languageOptions.find(opt => opt.value === newCode);
  if (selected) {
    // 更新组件库语言
    aleLocale.value = selected.aleLocale;
    // 更新页面语言
    pageLocale.value = pageLocales[newCode];
    // 持久化保存到localStorage
    localStorage.setItem('ale-ui-locale', newCode);
  }
});
</script>

<template>
  <div id="app">
    <nav class="app-nav">
      <div class="app-nav__brand">
        <span class="app-nav__logo">Ale UI</span>
      </div>
      <div class="app-nav__menu">
        <router-link to="/" class="app-nav__link" active-class="app-nav__link--active">
          {{ t('nav.home') }}
        </router-link>
        <router-link to="/components" class="app-nav__link" active-class="app-nav__link--active">
          {{ t('nav.components') }}
        </router-link>
        <router-link to="/variables-demo" class="app-nav__link" active-class="app-nav__link--active">
          {{ t('nav.variablesDemo') }}
        </router-link>
        <AleSelect
          v-model="currentLocaleCode"
          placeholder="选择语言"
          size="small"
          style="width: 160px"
        >
          <AleOption
            v-for="opt in languageOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </AleSelect>
        <ThemeToggle />
      </div>
    </nav>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style>
/* 全局样式：禁用 body 滚动，使用组件内滚动 */
html, body {
  overflow: hidden;
  height: 100%;
}

#app {
  height: 100vh;
  overflow: hidden;
}
</style>

<style scoped>
.app-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-8);
  background: var(--color-bg-base);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
}

.app-nav__brand {
  display: flex;
  align-items: center;
}

.app-nav__logo {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-nav__menu {
  display: flex;
  gap: var(--spacing-6);
  align-items: center;
}

.app-nav__link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-base);
  transition: color var(--transition-base);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-base);
}

.app-nav__link:hover {
  color: var(--color-primary);
  background: var(--color-bg-page);
}

.app-nav__link--active {
  color: var(--color-primary);
  background: var(--color-primary-50);
  font-weight: var(--font-weight-medium);
}

.app-main {
  height: calc(100vh - 64px);
  overflow: hidden;
}
</style>

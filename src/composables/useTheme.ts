/**
 * 主题切换 Composable
 * 提供主题切换功能，支持亮色/暗黑模式
 */

import { ref, watch, onMounted } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'ale-ui-theme';
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = ref<ThemeMode>(
  (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'auto'
);

/**
 * 获取实际应用的主题
 */
const getEffectiveTheme = (): 'light' | 'dark' => {
  if (currentTheme.value === 'auto') {
    return mediaQuery.matches ? 'dark' : 'light';
  }
  return currentTheme.value;
};

/**
 * 应用主题到 DOM
 */
const applyTheme = () => {
  const effectiveTheme = getEffectiveTheme();
  if (effectiveTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * 监听系统主题变化
 */
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  if (currentTheme.value === 'auto') {
    applyTheme();
  }
};

/**
 * 主题切换 Hook
 */
export const useTheme = () => {
  /**
   * 切换主题
   */
  const toggleTheme = (theme?: ThemeMode) => {
    if (theme) {
      currentTheme.value = theme;
    } else {
      currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
    }
    localStorage.setItem(STORAGE_KEY, currentTheme.value);
    applyTheme();
  };

  /**
   * 设置主题为跟随系统
   */
  const setAutoTheme = () => {
    currentTheme.value = 'auto';
    localStorage.setItem(STORAGE_KEY, 'auto');
    applyTheme();
  };

  /**
   * 获取当前主题模式
   */
  const getTheme = (): ThemeMode => currentTheme.value;

  /**
   * 获取实际应用的主题
   */
  const getActualTheme = (): 'light' | 'dark' => getEffectiveTheme();

  /**
   * 检查当前是否为暗黑模式
   */
  const isDark = (): boolean => getEffectiveTheme() === 'dark';

  // 初始化时应用主题
  onMounted(() => {
    applyTheme();
    mediaQuery.addEventListener('change', handleSystemThemeChange);
  });

  // 监听主题变化
  watch(currentTheme, () => {
    applyTheme();
  });

  return {
    theme: currentTheme,
    toggleTheme,
    setAutoTheme,
    getTheme,
    getActualTheme,
    isDark
  };
};

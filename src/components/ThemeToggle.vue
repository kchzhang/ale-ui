<template>
  <div class="theme-toggle">
    <button
      ref="buttonRef"
      class="theme-toggle__button"
      @click="toggleDropdown"
      :title="currentThemeLabel"
    >
      <svg v-if="isDark()" class="theme-toggle__icon" viewBox="0 0 24 24">
        <path
          d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
          fill="currentColor"
        />
      </svg>
      <svg v-else class="theme-toggle__icon" viewBox="0 0 24 24">
        <path
          d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.93a1 1 0 0 0-1.41 0 1 1 0 0 0 0 1.41l1.06 1.06a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41L5.99 4.93zm12.37 12.37a1 1 0 0 0-1.41 0 1 1 0 0 0 0 1.41l1.06 1.06a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a1 1 0 0 0 0-1.41 1 1 0 0 0-1.41 0l-1.06 1.06a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l1.06-1.06zM7.05 18.36a1 1 0 0 0 0-1.41 1 1 0 0 0-1.41 0l-1.06 1.06a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l1.06-1.06z"
          fill="currentColor"
        />
      </svg>
    </button>
    <div ref="dropdownRef" class="theme-toggle__dropdown" v-if="showDropdown">
      <div class="theme-toggle__item" @click="setTheme('light')" :class="{ 'is-active': theme === 'light' }">
        <span class="theme-toggle__icon-small">☀️</span>
        <span>亮色模式</span>
      </div>
      <div class="theme-toggle__item" @click="setTheme('dark')" :class="{ 'is-active': theme === 'dark' }">
        <span class="theme-toggle__icon-small">🌙</span>
        <span>暗黑模式</span>
      </div>
      <div class="theme-toggle__item" @click="setTheme('auto')" :class="{ 'is-active': theme === 'auto' }">
        <span class="theme-toggle__icon-small">🔄</span>
        <span>跟随系统</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useTheme, type ThemeMode } from '@/composables/useTheme';

const { theme, toggleTheme, setAutoTheme, isDark } = useTheme();

const showDropdown = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);

// 计算当前主题标签，优化性能
const currentThemeLabel = computed(() => {
  const isDarkMode = isDark();
  switch (theme.value) {
    case 'light':
      return '当前：亮色模式';
    case 'dark':
      return '当前：暗黑模式';
    case 'auto':
      return `当前：跟随系统 (${isDarkMode ? '暗黑' : '亮色'})`;
    default:
      return '切换主题';
  }
});

// 设置主题，包含错误处理
const setTheme = async (mode: ThemeMode) => {
  try {
    if (mode === 'auto') {
      setAutoTheme();
    } else {
      toggleTheme(mode);
    }
  } catch (error) {
    console.error('切换主题失败:', error);
  } finally {
    // 无论成功与否，都关闭下拉菜单
    showDropdown.value = false;
  }
};

// 切换下拉菜单显示状态
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 处理点击外部区域，关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  if (
    showDropdown.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node) &&
    buttonRef.value &&
    !buttonRef.value.contains(event.target as Node)
  ) {
    showDropdown.value = false;
  }
};

// 组件挂载时添加全局点击事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 组件卸载时清理事件监听器，避免内存泄漏
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.theme-toggle__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--size-md);
  height: var(--size-md);
  border-radius: var(--radius-base);
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: var(--transition-base);
  padding: var(--spacing-0);
}

.theme-toggle__button:hover {
  background-color: var(--color-bg-page);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.theme-toggle__icon {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
}

.theme-toggle__dropdown {
  position: absolute;
  top: calc(100% + var(--spacing-2));
  right: 0;
  min-width: 120px;
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-index-dropdown);
  padding: var(--spacing-2) var(--spacing-0);
}

.theme-toggle__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: var(--transition-fast);
  font-size: var(--font-size-sm);
  color: var(--color-text-regular);
}

.theme-toggle__item:hover {
  background-color: var(--color-bg-page);
  color: var(--color-primary);
}

.theme-toggle__item.is-active {
  background-color: var(--color-primary-50);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.theme-toggle__icon-small {
  font-size: var(--font-size-md);
}
</style>

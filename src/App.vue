<script setup lang="ts">
import ThemeToggle from './components/ThemeToggle.vue';
</script>

<template>
  <div id="app">
    <nav class="app-nav">
      <div class="app-nav__brand">
        <span class="app-nav__logo">Ale UI</span>
      </div>
      <div class="app-nav__menu">
        <router-link to="/" class="app-nav__link" active-class="app-nav__link--active">
          首页
        </router-link>
        <router-link to="/components" class="app-nav__link" active-class="app-nav__link--active">
          浏览组件
        </router-link>
        <router-link to="/variables-demo" class="app-nav__link" active-class="app-nav__link--active">
          变量演示
        </router-link>
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

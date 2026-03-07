<template>
  <div class="components-view">
    <!-- 左侧菜单栏 -->
    <aside class="components-view__sidebar">
      <div class="components-view__sidebar-header">
        <h2 class="components-view__sidebar-title">组件列表</h2>
        <p class="components-view__sidebar-subtitle">共 {{ totalCount }} 个组件</p>
      </div>

      <!-- 组件菜单 -->
      <ComponentMenu />
    </aside>

    <!-- 右侧内容区域 - 使用 AleScroll 自定义滚动条 -->
    <AleScroll
      class="components-view__content-scroll"
      direction="vertical"
      height="100%"
      :smooth="true"
    >
      <main class="components-view__content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path" />
          </transition>
        </router-view>
      </main>
    </AleScroll>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { AleScroll } from 'ale-ui';
import { basicComponents, compositeComponents } from '@/config/components';
import ComponentMenu from './components/ComponentMenu.vue';

const route = useRoute();

// 组件总数
const totalCount = computed(() => basicComponents.length + compositeComponents.length);

// 监听路由变化，滚动到顶部
watch(() => route.path, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<style scoped>
.components-view {
  display: flex;
  height: 100%;
  overflow: hidden;
  background: var(--color-bg-page);
}

/* 侧边栏样式 */
.components-view__sidebar {
  width: 280px;
  background: var(--color-bg-base);
  border-right: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
}

.components-view__sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.components-view__sidebar-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.components-view__sidebar-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
}

/* 内容区域滚动容器样式 */
.components-view__content-scroll {
  flex: 1;
  min-width: 0;
  height: 100%;
}

/* 内容区域样式 */
.components-view__content {
  padding: 32px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .components-view {
    flex-direction: column;
  }

  .components-view__sidebar {
    width: 100%;
    height: auto;
    position: relative;
    max-height: 300px;
    border-right: none;
    border-bottom: 1px solid var(--color-border-light);
  }

  .components-view__content {
    padding: 20px 16px;
  }
}

@media (max-width: 480px) {
  .components-view__sidebar-header {
    padding: 16px 12px;
  }
}
</style>

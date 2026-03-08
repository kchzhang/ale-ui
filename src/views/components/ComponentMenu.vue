<template>
  <nav class="component-menu">
    <!-- 搜索框 -->
    <div class="component-menu__search">
      <AleInput
        v-model="searchQuery"
        placeholder="搜索组件..."
        clearable
        @input="handleSearch"
      />
    </div>

    <!-- 组件菜单滚动区域 -->
    <AleScroll
      class="component-menu__scroll"
      direction="vertical"
      :smooth="true"
    >
      <div class="component-menu__content">
        <!-- 基础组件 -->
        <div v-if="filteredBasicComponents.length > 0" class="component-menu__group">
          <div class="component-menu__group-header">
            <h3 class="component-menu__group-title">
              <span class="component-menu__group-icon">🧩</span>
              {{ categoryInfo.basic.title }}
            </h3>
            <span class="component-menu__group-count">{{ filteredBasicComponents.length }}</span>
          </div>
          <div class="component-menu__items">
            <router-link
              v-for="component in filteredBasicComponents"
              :key="component.id"
              :to="component.path"
              class="component-menu__item"
              :class="{ 'is-active': isActive(component.path) }"
            >
              <span class="component-menu__item-icon">{{ component.icon }}</span>
              <div class="component-menu__item-content">
                <span class="component-menu__item-name">{{ component.name }}</span>
                <span v-if="component.description" class="component-menu__item-desc">
                  {{ component.description }}
                </span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- 组合组件 -->
        <div v-if="filteredCompositeComponents.length > 0" class="component-menu__group">
          <div class="component-menu__group-header">
            <h3 class="component-menu__group-title">
              <span class="component-menu__group-icon">📦</span>
              {{ categoryInfo.composite.title }}
            </h3>
            <span class="component-menu__group-count">{{ filteredCompositeComponents.length }}</span>
          </div>
          <div class="component-menu__items">
            <router-link
              v-for="component in filteredCompositeComponents"
              :key="component.id"
              :to="component.path"
              class="component-menu__item"
              :class="{ 'is-active': isActive(component.path) }"
            >
              <span class="component-menu__item-icon">{{ component.icon }}</span>
              <div class="component-menu__item-content">
                <span class="component-menu__item-name">{{ component.name }}</span>
                <span v-if="component.description" class="component-menu__item-desc">
                  {{ component.description }}
                </span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- 无搜索结果 -->
        <div v-if="searchQuery && filteredBasicComponents.length === 0 && filteredCompositeComponents.length === 0" class="component-menu__empty">
          <span class="component-menu__empty-icon">🔍</span>
          <span class="component-menu__empty-text">未找到匹配的组件</span>
        </div>
      </div>
    </AleScroll>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { AleScroll, AleInput } from 'ale-ui';
import {
  basicComponents,
  compositeComponents,
  categoryInfo
} from '@/config/components';

const route = useRoute();

// 搜索查询
const searchQuery = ref('');

// 过滤基础组件
const filteredBasicComponents = computed(() => {
  if (!searchQuery.value) {
    return basicComponents;
  }

  const query = searchQuery.value.toLowerCase();
  return basicComponents.filter(component =>
    component.name.toLowerCase().includes(query) ||
    component.description?.toLowerCase().includes(query) ||
    component.id.toLowerCase().includes(query)
  );
});

// 过滤组合组件
const filteredCompositeComponents = computed(() => {
  if (!searchQuery.value) {
    return compositeComponents;
  }

  const query = searchQuery.value.toLowerCase();
  return compositeComponents.filter(component =>
    component.name.toLowerCase().includes(query) ||
    component.description?.toLowerCase().includes(query) ||
    component.id.toLowerCase().includes(query)
  );
});

// 检查路由是否激活
const isActive = (path: string): boolean => {
  return route.path === path;
};

// 搜索处理
const handleSearch = () => {
  // 搜索逻辑已通过 computed 处理
};
</script>

<style scoped>
.component-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* 搜索框 */
.component-menu__search {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

/* 滚动区域 */
.component-menu__scroll {
  flex: 1;
  min-height: 0;
}

.component-menu__content {
  padding: 12px 8px;
}

/* 分组 */
.component-menu__group {
  margin-bottom: 16px;
}

.component-menu__group:last-child {
  margin-bottom: 0;
}

.component-menu__group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 4px;
}

.component-menu__group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.component-menu__group-icon {
  font-size: 14px;
}

.component-menu__group-count {
  font-size: 12px;
  color: var(--color-text-placeholder);
  background: var(--color-gray-100);
  padding: 2px 8px;
  border-radius: 10px;
}

/* 菜单项容器 */
.component-menu__items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 菜单项 */
.component-menu__item {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-radius: var(--radius-base);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: var(--transition-base);
  cursor: pointer;
}

.component-menu__item:hover {
  background: var(--color-bg-page);
}

.component-menu__item.is-active {
  background: var(--color-primary-50);
  color: var(--color-primary);
  font-weight: 500;
}

.component-menu__item-icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.component-menu__item-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.component-menu__item-name {
  font-size: 14px;
  font-weight: 500;
}

.component-menu__item-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 空状态 */
.component-menu__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  color: var(--color-text-secondary);
}

.component-menu__empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0.5;
}

.component-menu__empty-text {
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 480px) {
  .component-menu__search {
    padding: 12px;
  }

  .component-menu__content {
    padding: 8px 4px;
  }

  .component-menu__item {
    padding: 10px 12px;
  }

  .component-menu__item-icon {
    font-size: 18px;
    margin-right: 10px;
  }
}
</style>

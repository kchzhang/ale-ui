<script setup lang="ts">
import { ref } from 'vue';

const features = ref([
  {
    title: '基于 CSS 变量',
    description: '使用 CSS 变量构建完整的设计系统，支持主题切换和样式定制',
    icon: '🎨'
  },
  {
    title: '暗黑模式支持',
    description: '内置暗黑模式支持，可自动跟随系统或手动切换',
    icon: '🌙'
  },
  {
    title: '组件化设计',
    description: '提供丰富的组件库，开箱即用，易于定制和扩展',
    icon: '🧩'
  },
  {
    title: 'TypeScript 支持',
    description: '完整的 TypeScript 类型定义，提供优秀的开发体验',
    icon: '📝'
  },
  {
    title: '易于使用',
    description: '简洁的 API 设计，直观的使用方式，快速上手',
    icon: '⚡'
  },
  {
    title: '可定制',
    description: '灵活的主题定制能力，满足不同品牌风格需求',
    icon: '🎯'
  }
]);
</script>

<template>
  <div class="home">
    <div class="home__hero">
      <h1 class="home__title">Ale UI</h1>
      <p class="home__subtitle">简洁、优雅、基于 CSS 变量的 Vue 3 组件库</p>
      <div class="home__actions">
        <router-link to="/components" class="home__button home__button--primary">
          浏览组件
        </router-link>
        <router-link to="/variables-demo" class="home__button home__button--default">
          变量演示
        </router-link>
      </div>
    </div>

    <div class="home__features">
      <h2 class="home__features-title">核心特性</h2>
      <div class="home__features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="home__feature-card"
        >
          <div class="home__feature-icon">{{ feature.icon }}</div>
          <h3 class="home__feature-title">{{ feature.title }}</h3>
          <p class="home__feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <div class="home__highlight">
      <div class="home__highlight-content">
        <h2 class="home__highlight-title">为什么选择 Ale UI？</h2>
        <p class="home__highlight-text">
          Ale UI 基于现代 CSS 变量技术构建，提供完整的设计系统和主题切换能力。
          所有组件都遵循统一的设计规范，使用语义化的 CSS 变量，确保设计一致性和可维护性。
        </p>
        <ul class="home__highlight-list">
          <li>✅ 统一的设计语言和视觉规范</li>
          <li>✅ 开箱即用的暗黑模式支持</li>
          <li>✅ 完善的 TypeScript 类型定义</li>
          <li>✅ 灵活的主题定制能力</li>
          <li>✅ 详细的文档和示例</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.home__hero {
  text-align: center;
  padding: var(--spacing-20) var(--spacing-4);
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%);
}

.home__title {
  font-size: 64px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home__subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: var(--line-height-lg);
}

.home__actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  align-items: center;
}

.home__button {
  display: inline-block;
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition: var(--transition-base);
}

.home__button--primary {
  background-color: var(--color-primary);
  color: #ffffff;
  border: var(--border-width-base) var(--border-style-solid) var(--color-primary);
}

.home__button--primary:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.home__button--default {
  background-color: var(--color-bg-base);
  color: var(--color-primary);
  border: var(--border-width-base) var(--border-style-solid) var(--color-primary);
}

.home__button--default:hover {
  background-color: var(--color-primary-50);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.home__features {
  padding: var(--spacing-16) var(--spacing-4);
  max-width: 1200px;
  margin: var(--spacing-0) auto;
}

.home__features-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.home__features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-6);
}

.home__feature-card {
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  text-align: left;
  transition: var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.home__feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-200);
}

.home__feature-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-4);
}

.home__feature-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
}

.home__feature-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-base);
}

.home__highlight {
  background-color: var(--color-bg-base);
  padding: var(--spacing-16) var(--spacing-4);
  border-top: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
}

.home__highlight-content {
  max-width: 800px;
  margin: var(--spacing-0) auto;
}

.home__highlight-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--spacing-6);
}

.home__highlight-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-regular);
  line-height: var(--line-height-lg);
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.home__highlight-list {
  list-style: none;
  display: grid;
  gap: var(--spacing-4);
  max-width: 500px;
  margin: var(--spacing-0) auto;
}

.home__highlight-list li {
  font-size: var(--font-size-base);
  color: var(--color-text-regular);
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-bg-page);
  border-radius: var(--radius-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-lighter);
}

@media (max-width: 768px) {
  .home__title {
    font-size: 48px;
  }

  .home__subtitle {
    font-size: var(--font-size-lg);
  }

  .home__actions {
    flex-direction: column;
  }

  .home__button {
    width: 100%;
    text-align: center;
  }

  .home__features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
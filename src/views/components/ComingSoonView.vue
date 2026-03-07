<template>
  <div class="coming-soon-view">
    <div class="coming-soon-view__content">
      <div class="coming-soon-view__icon">🚧</div>
      <h1 class="coming-soon-view__title">开发中</h1>
      <p class="coming-soon-view__description">
        该组件正在开发中，敬请期待
      </p>
      <AleButton type="primary" @click="goBack">
        返回首页
      </AleButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AleButton } from 'ale-ui';

const router = useRouter();

const goBack = () => {
  router.push('/components');
};
</script>

<style scoped>
.coming-soon-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-bg-page);
}

.coming-soon-view__content {
  text-align: center;
  padding: 48px;
}

.coming-soon-view__icon {
  font-size: 80px;
  margin-bottom: 24px;
}

.coming-soon-view__title {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.coming-soon-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0 0 32px 0;
}
</style>

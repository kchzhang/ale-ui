<template>
  <section class="demo-section">
    <h2 class="demo-section__title">{{ title }}</h2>
    <p class="demo-section__desc">{{ description }}</p>
    <div class="demo-section__content">
      <slot />
    </div>
    <div class="demo-section__code">
      <slot name="code" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped>
.demo-section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.demo-section__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.demo-section__desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
}

.demo-section__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-section__code {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .demo-section {
    padding: 20px;
  }
}
</style>

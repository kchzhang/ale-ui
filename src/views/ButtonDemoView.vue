<template>
  <div class="button-demo-view">
    <div class="button-demo-view__header">
      <h1 class="button-demo-view__title">按钮组件示例</h1>
      <p class="button-demo-view__subtitle">参考 Element UI 的导入方式集成 Ale UI 按钮组件</p>
    </div>

    <!-- 基础按钮 -->
    <section class="button-demo-view__section">
      <h2 class="button-demo-view__section-title">基础按钮</h2>
      <div class="button-demo-view__demo">
        <AleButton>默认按钮</AleButton>
        <AleButton type="primary">主要按钮</AleButton>
        <AleButton type="success">成功按钮</AleButton>
        <AleButton type="warning">警告按钮</AleButton>
        <AleButton type="danger">危险按钮</AleButton>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="button-demo-view__section">
      <h2 class="button-demo-view__section-title">不同尺寸</h2>
      <div class="button-demo-view__demo">
        <AleButton size="small">小型按钮</AleButton>
        <AleButton size="medium">中型按钮</AleButton>
        <AleButton size="large">大型按钮</AleButton>
      </div>
    </section>

    <!-- 不同状态 -->
    <section class="button-demo-view__section">
      <h2 class="button-demo-view__section-title">不同状态</h2>
      <div class="button-demo-view__demo">
        <AleButton disabled>禁用按钮</AleButton>
        <AleButton type="primary" :loading="loading" @click="handleLoading">
          加载按钮
        </AleButton>
        <AleButton type="danger" plain>朴素按钮</AleButton>
        <AleButton type="primary" round>圆角按钮</AleButton>
      </div>
    </section>

    <!-- 不同风格 -->
    <section class="button-demo-view__section">
      <h2 class="button-demo-view__section-title">不同风格</h2>
      <div class="button-demo-view__demo">
        <AleButton type="primary" block>块级按钮</AleButton>
        <div class="button-demo-view__circle-demo">
          <AleButton type="primary" circle>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </AleButton>
          <AleButton type="success" circle>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </AleButton>
        </div>
      </div>
    </section>

    <!-- 交互示例 -->
    <section class="button-demo-view__section">
      <h2 class="button-demo-view__section-title">交互示例</h2>
      <div class="button-demo-view__demo">
        <AleButton type="primary" @click="handleClick">
          点击次数: {{ clickCount }}
        </AleButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 采用 Element UI 风格的导入方式：从组件库统一入口导入
import { AleButton } from 'ale-ui';

// 响应式状态
const loading = ref(false);
const clickCount = ref(0);

// 加载按钮点击处理
const handleLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

// 普通按钮点击处理
const handleClick = () => {
  clickCount.value++;
};
</script>

<style scoped>
.button-demo-view {
  min-height: 100vh;
  padding: 48px 32px;
  background: #f5f7fa;
}

.button-demo-view__header {
  text-align: center;
  margin-bottom: 48px;
}

.button-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.button-demo-view__subtitle {
  font-size: 16px;
  color: #606266;
}

.button-demo-view__section {
  background: white;
  border-radius: 8px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.button-demo-view__section-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.button-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.button-demo-view__circle-demo {
  display: flex;
  gap: 16px;
}
</style>

<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Button 按钮</h1>
      <p class="component-demo-view__description">
        按钮用于开始一个即时操作
      </p>
    </div>

    <!-- 基础按钮 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础按钮</h2>
      <div class="component-demo-view__demo">
        <AleButton>默认按钮</AleButton>
        <AleButton type="primary">主要按钮</AleButton>
        <AleButton type="success">成功按钮</AleButton>
        <AleButton type="warning">警告按钮</AleButton>
        <AleButton type="danger">危险按钮</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleButton size="small">小型按钮</AleButton>
        <AleButton size="medium">中型按钮</AleButton>
        <AleButton size="large">大型按钮</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同状态</h2>
      <div class="component-demo-view__demo">
        <AleButton disabled>禁用按钮</AleButton>
        <AleButton type="primary" :loading="loading" @click="handleLoading">
          加载按钮
        </AleButton>
        <AleButton type="danger" plain>朴素按钮</AleButton>
        <AleButton type="primary" round>圆角按钮</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="stateCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同风格 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同风格</h2>
      <div class="component-demo-view__demo">
        <AleButton type="primary" block>块级按钮</AleButton>
      </div>
      <div class="component-demo-view__demo">
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
      <div class="component-demo-view__code">
        <CodeBlock :code="styleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 交互示例 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">交互示例</h2>
      <div class="component-demo-view__demo">
        <AleButton type="primary" @click="handleClick">
          点击次数: {{ clickCount }}
        </AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="interactiveCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const loading = ref(false);
const clickCount = ref(0);

const handleLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

const handleClick = () => {
  clickCount.value++;
};

// 代码示例
const basicCode = `<template>
  <AleButton>默认按钮</AleButton>
  <AleButton type="primary">主要按钮</AleButton>
  <AleButton type="success">成功按钮</AleButton>
  <AleButton type="warning">警告按钮</AleButton>
  <AleButton type="danger">危险按钮</AleButton>
</template>

<script setup lang="ts">
import { AleButton } from 'ale-ui';
<\/script>`;

const sizeCode = `<template>
  <AleButton size="small">小型按钮</AleButton>
  <AleButton size="medium">中型按钮</AleButton>
  <AleButton size="large">大型按钮</AleButton>
</template>

<script setup lang="ts">
import { AleButton } from 'ale-ui';
<\/script>`;

const stateCode = `<template>
  <AleButton disabled>禁用按钮</AleButton>
  <AleButton type="primary" :loading="loading" @click="handleLoading">
    加载按钮
  </AleButton>
  <AleButton type="danger" plain>朴素按钮</AleButton>
  <AleButton type="primary" round>圆角按钮</AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton } from 'ale-ui';

const loading = ref(false);

const handleLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
<\/script>`;

const styleCode = `<template>
  <!-- 块级按钮 -->
  <AleButton type="primary" block>块级按钮</AleButton>

  <!-- 圆形按钮 -->
  <AleButton type="primary" circle>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" stroke-width="2"/>
      <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </AleButton>
</template>

<script setup lang="ts">
import { AleButton } from 'ale-ui';
<\/script>`;

const interactiveCode = `<template>
  <AleButton type="primary" @click="handleClick">
    点击次数: {{ clickCount }}
  </AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton } from 'ale-ui';

const clickCount = ref(0);

const handleClick = () => {
  clickCount.value++;
};
<\/script>`;
</script>

<style scoped>
.component-demo-view {
  max-width: 1000px;
  margin: 0 auto;
}

.component-demo-view__header {
  margin-bottom: 48px;
}

.component-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.component-demo-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.component-demo-view__section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.component-demo-view__section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.component-demo-view__code {
  margin-top: 24px;
}
</style>

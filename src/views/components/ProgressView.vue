<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Progress 进度条</h1>
      <p class="component-demo-view__description">
        用于展示操作进度或数据占比的进度条组件
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo progress-demo">
        <AleProgress :percentage="50" />
        <AleProgress :percentage="75" />
        <AleProgress :percentage="100" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同状态</h2>
      <div class="component-demo-view__demo progress-demo">
        <AleProgress :percentage="70" />
        <AleProgress :percentage="100" status="success" />
        <AleProgress :percentage="70" status="warning" />
        <AleProgress :percentage="50" status="danger" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="statusCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义颜色</h2>
      <div class="component-demo-view__demo progress-demo">
        <AleProgress :percentage="percentage" :color="customColor" />
        <AleProgress :percentage="percentage" :color="colorFunction" />
      </div>
      <div class="component-demo-view__demo" style="margin-top: 16px;">
        <AleButton size="small" @click="decrease">减少</AleButton>
        <AleButton size="small" @click="increase" style="margin-left: 8px;">增加</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="colorCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 条纹效果 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">条纹效果</h2>
      <div class="component-demo-view__demo progress-demo">
        <AleProgress :percentage="70" striped />
        <AleProgress :percentage="70" striped-flow />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="stripedCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义高度 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义高度</h2>
      <div class="component-demo-view__demo progress-demo">
        <AleProgress :percentage="50" :stroke-width="8" />
        <AleProgress :percentage="50" :stroke-width="12" />
        <AleProgress :percentage="50" :stroke-width="20" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="heightCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 隐藏文字 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">隐藏文字</h2>
      <div class="component-demo-view__demo progress-demo">
        <AleProgress :percentage="50" :show-text="false" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="hideTextCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 环形进度条 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">环形进度条</h2>
      <div class="component-demo-view__demo" style="gap: 32px;">
        <AleProgress type="circle" :percentage="25" />
        <AleProgress type="circle" :percentage="50" />
        <AleProgress type="circle" :percentage="75" />
        <AleProgress type="circle" :percentage="100" status="success" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="circleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 环形进度条尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">环形进度条尺寸</h2>
      <div class="component-demo-view__demo" style="gap: 32px;">
        <AleProgress type="circle" :percentage="50" :width="80" />
        <AleProgress type="circle" :percentage="50" :width="120" />
        <AleProgress type="circle" :percentage="50" :width="160" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="circleSizeCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleProgress, AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const percentage = ref(30);

const customColor = '#ff6b6b';

const colorFunction = (percentage: number) => {
  if (percentage < 30) return '#ff6b6b';
  if (percentage < 70) return '#ffd93d';
  return '#6bcb77';
};

const decrease = () => {
  percentage.value = Math.max(0, percentage.value - 10);
};

const increase = () => {
  percentage.value = Math.min(100, percentage.value + 10);
};

const basicCode = `<template>
  <AleProgress :percentage="50" />
  <AleProgress :percentage="75" />
  <AleProgress :percentage="100" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`;

const statusCode = `<template>
  <AleProgress :percentage="70" />
  <AleProgress :percentage="100" status="success" />
  <AleProgress :percentage="70" status="warning" />
  <AleProgress :percentage="50" status="danger" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`;

const colorCode = `<template>
  <AleProgress :percentage="percentage" :color="customColor" />
  <AleProgress :percentage="percentage" :color="colorFunction" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleProgress } from 'ale-ui';

const percentage = ref(30);

const customColor = '#ff6b6b';

const colorFunction = (percentage: number) => {
  if (percentage < 30) return '#ff6b6b';
  if (percentage < 70) return '#ffd93d';
  return '#6bcb77';
};
<\/script>`;

const stripedCode = `<template>
  <AleProgress :percentage="70" striped />
  <AleProgress :percentage="70" striped-flow />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`;

const heightCode = `<template>
  <AleProgress :percentage="50" :stroke-width="8" />
  <AleProgress :percentage="50" :stroke-width="12" />
  <AleProgress :percentage="50" :stroke-width="20" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`;

const hideTextCode = `<template>
  <AleProgress :percentage="50" :show-text="false" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`;

const circleCode = `<template>
  <AleProgress type="circle" :percentage="25" />
  <AleProgress type="circle" :percentage="50" />
  <AleProgress type="circle" :percentage="75" />
  <AleProgress type="circle" :percentage="100" status="success" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`;

const circleSizeCode = `<template>
  <AleProgress type="circle" :percentage="50" :width="80" />
  <AleProgress type="circle" :percentage="50" :width="120" />
  <AleProgress type="circle" :percentage="50" :width="160" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
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

.progress-demo {
  flex-direction: column;
  align-items: stretch;
}

.component-demo-view__code {
  margin-top: 24px;
}
</style>

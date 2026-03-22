<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">DateTimePicker 日期时间选择器</h1>
      <p class="component-demo-view__description">
        组合式日期时间选择器，支持日期和时间的可视化选择，通过输入框进行精确编辑。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleDateTimePicker v-model="value1" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleDateTimePicker v-model="value2" disabled />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可清空</h2>
      <div class="component-demo-view__demo">
        <AleDateTimePicker v-model="value3" clearable />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="clearableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不显示秒 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不显示秒</h2>
      <div class="component-demo-view__demo">
        <AleDateTimePicker v-model="value4" :show-seconds="false" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="noSecondsCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 只选择日期 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">只选择日期</h2>
      <div class="component-demo-view__demo">
        <AleDateTimePicker v-model="value5" :show-time="false" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dateOnlyCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleDateTimePicker v-model="value6" size="small" />
        <AleDateTimePicker v-model="value6" size="medium" />
        <AleDateTimePicker v-model="value6" size="large" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同主题</h2>
      <div class="component-demo-view__demo">
        <AleDateTimePicker v-model="value7" theme="primary" />
        <AleDateTimePicker v-model="value7" theme="success" />
        <AleDateTimePicker v-model="value7" theme="warning" />
        <AleDateTimePicker v-model="value7" theme="danger" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const value1 = ref('');
const value2 = ref('2026-03-21 10:30:00');
const value3 = ref('2026-03-21 14:30:00');
const value4 = ref('');
const value5 = ref('');
const value6 = ref('');
const value7 = ref('');

const basicCode = `<template>
  <AleDateTimePicker v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';

const value = ref('');
<\/script>`;

const disabledCode = `<template>
  <AleDateTimePicker v-model="value" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';

const value = ref('2026-03-21 10:30:00');
<\/script>`;

const clearableCode = `<template>
  <AleDateTimePicker v-model="value" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';

const value = ref('2026-03-21 14:30:00');
<\/script>`;

const noSecondsCode = `<template>
  <AleDateTimePicker v-model="value" :show-seconds="false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';

const value = ref('');
<\/script>`;

const dateOnlyCode = `<template>
  <AleDateTimePicker v-model="value" :show-time="false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';

const value = ref('');
<\/script>`;

const sizeCode = `<template>
  <AleDateTimePicker v-model="value" size="small" />
  <AleDateTimePicker v-model="value" size="medium" />
  <AleDateTimePicker v-model="value" size="large" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';

const value = ref('');
<\/script>`;

const themeCode = `<template>
  <AleDateTimePicker v-model="value" theme="primary" />
  <AleDateTimePicker v-model="value" theme="success" />
  <AleDateTimePicker v-model="value" theme="warning" />
  <AleDateTimePicker v-model="value" theme="danger" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleDateTimePicker } from 'ale-ui';

const value = ref('');
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

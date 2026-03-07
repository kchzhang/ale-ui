<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Badge 徽标</h1>
      <p class="component-demo-view__description">
        用于显示数量、状态或标记信息的徽标组件
      </p>
    </div>

    <!-- 基本用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基本用法</h2>
      <div class="component-demo-view__demo">
        <AleBadge :value="12">
          <div class="demo-box">消息</div>
        </AleBadge>
        <AleBadge :value="5">
          <div class="demo-box">通知</div>
        </AleBadge>
        <AleBadge :value="3">
          <div class="demo-box">任务</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 最大值 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">最大值</h2>
      <div class="component-demo-view__demo">
        <AleBadge :value="99" :max="99">
          <div class="demo-box">正常</div>
        </AleBadge>
        <AleBadge :value="200" :max="99">
          <div class="demo-box">超出</div>
        </AleBadge>
        <AleBadge :value="1000" :max="999">
          <div class="demo-box">大数</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="maxCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 圆点 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">圆点样式</h2>
      <div class="component-demo-view__demo">
        <AleBadge isDot>
          <div class="demo-box">消息</div>
        </AleBadge>
        <AleBadge isDot>
          <div class="demo-box">通知</div>
        </AleBadge>
        <AleBadge isDot>
          <div class="demo-box">状态</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dotCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同类型 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同类型</h2>
      <div class="component-demo-view__demo">
        <AleBadge :value="12" type="primary">
          <div class="demo-box">主要</div>
        </AleBadge>
        <AleBadge :value="3" type="success">
          <div class="demo-box">成功</div>
        </AleBadge>
        <AleBadge :value="5" type="warning">
          <div class="demo-box">警告</div>
        </AleBadge>
        <AleBadge :value="8" type="danger">
          <div class="demo-box">危险</div>
        </AleBadge>
        <AleBadge :value="1" type="info">
          <div class="demo-box">信息</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="typeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义颜色</h2>
      <div class="component-demo-view__demo">
        <AleBadge :value="12" color="#67c23a">
          <div class="demo-box">绿色</div>
        </AleBadge>
        <AleBadge :value="5" color="#e6a23c">
          <div class="demo-box">橙色</div>
        </AleBadge>
        <AleBadge :value="8" color="#f56c6c">
          <div class="demo-box">红色</div>
        </AleBadge>
        <AleBadge :value="3" color="#909399">
          <div class="demo-box">灰色</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="colorCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleBadge :value="12" size="small">
          <div class="demo-box">小</div>
        </AleBadge>
        <AleBadge :value="12" size="medium">
          <div class="demo-box">中</div>
        </AleBadge>
        <AleBadge :value="12" size="large">
          <div class="demo-box">大</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 动态示例 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">动态数值</h2>
      <div class="component-demo-view__demo">
        <AleBadge :value="count">
          <div class="demo-box">计数器</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__controls">
        <AleButton @click="count--">减少</AleButton>
        <AleButton type="primary" @click="count++">增加</AleButton>
        <AleButton type="danger" @click="count = 0">重置</AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dynamicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 隐藏徽标 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">隐藏徽标</h2>
      <div class="component-demo-view__demo">
        <AleBadge :value="12" :hidden="isHidden">
          <div class="demo-box">消息</div>
        </AleBadge>
      </div>
      <div class="component-demo-view__controls">
        <AleButton @click="isHidden = !isHidden">
          {{ isHidden ? '显示徽标' : '隐藏徽标' }}
        </AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="hiddenCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleBadge, AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const count = ref(12);
const isHidden = ref(false);

// 代码示例
const basicCode = `<template>
  <AleBadge :value="12">
    <div class="demo-box">消息</div>
  </AleBadge>
  <AleBadge :value="5">
    <div class="demo-box">通知</div>
  </AleBadge>
  <AleBadge :value="3">
    <div class="demo-box">任务</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`;

const maxCode = `<template>
  <AleBadge :value="99" :max="99">
    <div class="demo-box">正常</div>
  </AleBadge>
  <AleBadge :value="200" :max="99">
    <div class="demo-box">超出（显示 99+）</div>
  </AleBadge>
  <AleBadge :value="1000" :max="999">
    <div class="demo-box">大数（显示 999+）</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`;

const dotCode = `<template>
  <AleBadge isDot>
    <div class="demo-box">消息</div>
  </AleBadge>
  <AleBadge isDot>
    <div class="demo-box">通知</div>
  </AleBadge>
  <AleBadge isDot>
    <div class="demo-box">状态</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`;

const typeCode = `<template>
  <AleBadge :value="12" type="primary">
    <div class="demo-box">主要</div>
  </AleBadge>
  <AleBadge :value="3" type="success">
    <div class="demo-box">成功</div>
  </AleBadge>
  <AleBadge :value="5" type="warning">
    <div class="demo-box">警告</div>
  </AleBadge>
  <AleBadge :value="8" type="danger">
    <div class="demo-box">危险</div>
  </AleBadge>
  <AleBadge :value="1" type="info">
    <div class="demo-box">信息</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`;

const colorCode = `<template>
  <AleBadge :value="12" color="#67c23a">
    <div class="demo-box">绿色</div>
  </AleBadge>
  <AleBadge :value="5" color="#e6a23c">
    <div class="demo-box">橙色</div>
  </AleBadge>
  <AleBadge :value="8" color="#f56c6c">
    <div class="demo-box">红色</div>
  </AleBadge>
  <AleBadge :value="3" color="#909399">
    <div class="demo-box">灰色</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`;

const sizeCode = `<template>
  <AleBadge :value="12" size="small">
    <div class="demo-box">小</div>
  </AleBadge>
  <AleBadge :value="12" size="medium">
    <div class="demo-box">中</div>
  </AleBadge>
  <AleBadge :value="12" size="large">
    <div class="demo-box">大</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`;

const dynamicCode = `<template>
  <AleBadge :value="count">
    <div class="demo-box">计数器</div>
  </AleBadge>
  <AleButton @click="count--">减少</AleButton>
  <AleButton type="primary" @click="count++">增加</AleButton>
  <AleButton type="danger" @click="count = 0">重置</AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleBadge, AleButton } from 'ale-ui';

const count = ref(12);
<\/script>`;

const hiddenCode = `<template>
  <AleBadge :value="12" :hidden="isHidden">
    <div class="demo-box">消息</div>
  </AleBadge>
  <AleButton @click="isHidden = !isHidden">
    {{ isHidden ? '显示徽标' : '隐藏徽标' }}
  </AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleBadge, AleButton } from 'ale-ui';

const isHidden = ref(false);
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
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
}

.component-demo-view__controls {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-border-light);
  margin-bottom: 24px;
}

.component-demo-view__code {
  margin-top: 24px;
}

.demo-box {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-page);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-base);
  font-size: 14px;
  color: var(--color-text-primary);
  transition: var(--transition-base);
}

.demo-box:hover {
  border-color: var(--color-primary);
}
</style>

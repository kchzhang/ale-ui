<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Card 卡片</h1>
      <p class="component-demo-view__description">
        将信息聚合在卡片容器中展示，支持多种样式和布局
      </p>
    </div>

    <!-- 基本用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基本用法</h2>
      <div class="component-demo-view__demo">
        <AleCard title="卡片标题">
          <p>这是卡片的基本内容区域。可以包含任意内容。</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不带标题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">无标题卡片</h2>
      <div class="component-demo-view__demo">
        <AleCard>
          <p>这是一个没有标题的卡片示例。</p>
          <p>只包含内容区域，更加简洁。</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="noTitleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义头部 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义头部</h2>
      <div class="component-demo-view__demo">
        <AleCard>
          <template #header>
            <div class="card-header-custom">
              <span>自定义头部</span>
              <span class="card-header-custom__badge">新</span>
            </div>
          </template>
          <p>使用 header 插槽自定义头部内容。</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customHeaderCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 带底部 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">带底部</h2>
      <div class="component-demo-view__demo">
        <AleCard title="确认信息">
          <p>您确定要执行此操作吗？此操作不可撤销。</p>
          <template #footer>
            <div class="card-footer-actions">
              <AleButton type="default">取消</AleButton>
              <AleButton type="primary">确定</AleButton>
            </div>
          </template>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="footerCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 阴影样式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">阴影样式</h2>
      <div class="component-demo-view__demo">
        <AleCard title="从不" shadow="never">
          <p>shadow="never"，从不显示阴影</p>
        </AleCard>
        <AleCard title="悬停" shadow="hover">
          <p>shadow="hover"，悬停时显示阴影（默认）</p>
        </AleCard>
        <AleCard title="始终" shadow="always">
          <p>shadow="always"，始终显示阴影</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="shadowCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">尺寸</h2>
      <div class="component-demo-view__demo">
        <AleCard title="小尺寸" size="small">
          <p>size="small"</p>
        </AleCard>
        <AleCard title="中等尺寸" size="medium">
          <p>size="medium"（默认）</p>
        </AleCard>
        <AleCard title="大尺寸" size="large">
          <p>size="large"</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可悬停 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可悬停</h2>
      <div class="component-demo-view__demo">
        <AleCard title="悬停效果" hoverable>
          <p>将鼠标悬停在此卡片上，可以看到上浮效果。</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="hoverableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 无边框 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">无边框</h2>
      <div class="component-demo-view__demo">
        <AleCard title="无边框" :bordered="false" shadow="hover">
          <p>这是一个无边框的卡片，配合阴影效果看起来更加清爽。</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="noBorderCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义样式</h2>
      <div class="component-demo-view__demo">
        <AleCard
          title="自定义样式"
          :bodyStyle="{ backgroundColor: 'var(--color-primary-light)' }"
        >
          <p>这个卡片的内容区域使用了自定义背景色。</p>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customStyleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 完整示例 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">完整示例</h2>
      <div class="component-demo-view__demo">
        <AleCard
          title="产品信息"
          shadow="hover"
          hoverable
          size="large"
        >
          <template #header>
            <div class="card-complete-header">
              <span>产品信息</span>
              <AleBadge :value="99" type="danger">
                <span>热销</span>
              </AleBadge>
            </div>
          </template>
          <div class="card-complete-content">
            <p><strong>产品名称：</strong>Ale UI 组件库</p>
            <p><strong>版本：</strong>v1.0.0</p>
            <p><strong>描述：</strong>一款简洁、美观、易用的 Vue 3 组件库</p>
            <p><strong>特性：</strong>支持 TypeScript、CSS 变量、暗黑模式</p>
          </div>
          <template #footer>
            <div class="card-footer-actions">
              <AleButton type="default">查看详情</AleButton>
              <AleButton type="primary">立即购买</AleButton>
            </div>
          </template>
        </AleCard>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="completeCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { AleCard, AleBadge, AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 代码示例
const basicCode = `<template>
  <AleCard title="卡片标题">
    <p>这是卡片的基本内容区域。可以包含任意内容。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`;

const noTitleCode = `<template>
  <AleCard>
    <p>这是一个没有标题的卡片示例。</p>
    <p>只包含内容区域，更加简洁。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`;

const customHeaderCode = `<template>
  <AleCard>
    <template #header>
      <div class="card-header-custom">
        <span>自定义头部</span>
        <span class="badge">新</span>
      </div>
    </template>
    <p>使用 header 插槽自定义头部内容。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>

<style scoped>
.card-header-custom {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background-color: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
<\/style>`;

const footerCode = `<template>
  <AleCard title="确认信息">
    <p>您确定要执行此操作吗？此操作不可撤销。</p>
    <template #footer>
      <div class="card-footer-actions">
        <AleButton type="default">取消</AleButton>
        <AleButton type="primary">确定</AleButton>
      </div>
    </template>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard, AleButton } from 'ale-ui';
<\/script>

<style scoped>
.card-footer-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
<\/style>`;

const shadowCode = `<template>
  <AleCard title="从不" shadow="never">
    <p>shadow="never"，从不显示阴影</p>
  </AleCard>
  <AleCard title="悬停" shadow="hover">
    <p>shadow="hover"，悬停时显示阴影（默认）</p>
  </AleCard>
  <AleCard title="始终" shadow="always">
    <p>shadow="always"，始终显示阴影</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`;

const sizeCode = `<template>
  <AleCard title="小尺寸" size="small">
    <p>size="small"</p>
  </AleCard>
  <AleCard title="中等尺寸" size="medium">
    <p>size="medium"（默认）</p>
  </AleCard>
  <AleCard title="大尺寸" size="large">
    <p>size="large"</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`;

const hoverableCode = `<template>
  <AleCard title="悬停效果" hoverable>
    <p>将鼠标悬停在此卡片上，可以看到上浮效果。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`;

const noBorderCode = `<template>
  <AleCard title="无边框" :bordered="false" shadow="hover">
    <p>这是一个无边框的卡片，配合阴影效果看起来更加清爽。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`;

const customStyleCode = `<template>
  <AleCard
    title="自定义样式"
    :bodyStyle="{ backgroundColor: 'var(--color-primary-light)' }"
  >
    <p>这个卡片的内容区域使用了自定义背景色。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`;

const completeCode = `<template>
  <AleCard
    title="产品信息"
    shadow="hover"
    hoverable
    size="large"
  >
    <template #header>
      <div class="card-header">
        <span>产品信息</span>
        <AleBadge :value="99" type="danger">
          <span>热销</span>
        </AleBadge>
      </div>
    </template>
    <div class="card-content">
      <p><strong>产品名称：</strong>Ale UI 组件库</p>
      <p><strong>版本：</strong>v1.0.0</p>
      <p><strong>描述：</strong>一款简洁、美观、易用的 Vue 3 组件库</p>
      <p><strong>特性：</strong>支持 TypeScript、CSS 变量、暗黑模式</p>
    </div>
    <template #footer>
      <div class="card-footer">
        <AleButton type="default">查看详情</AleButton>
        <AleButton type="primary">立即购买</AleButton>
      </div>
    </template>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard, AleBadge, AleButton } from 'ale-ui';
<\/script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
<\/style>`;
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

.card-header-custom {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.card-header-custom__badge {
  background-color: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.card-footer-actions {
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
}

.card-complete-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-complete-content p {
  margin-bottom: var(--spacing-2);
}

.card-complete-content p:last-child {
  margin-bottom: 0;
}

.component-demo-view__demo .ale-card {
  max-width: 400px;
}
</style>

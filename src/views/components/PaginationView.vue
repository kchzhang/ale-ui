<template>
  <div class="component-demo-view">
    <!-- 头部区域 -->
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Pagination 分页</h1>
      <p class="component-demo-view__description">
        用于分隔长列表的分页组件，支持多种布局配置、尺寸选择和快捷跳转。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <p class="component-demo-view__section-desc">基础分页用法，支持页码切换。</p>
      <div class="component-demo-view__demo">
        <AlePagination
          v-model:current="current1"
          :total="100"
          :page-size="10"
          @change="handleChange"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 显示总数 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">显示总数</h2>
      <p class="component-demo-view__section-desc">通过 layout 配置显示数据总数。</p>
      <div class="component-demo-view__demo">
        <AlePagination
          v-model:current="current2"
          :total="100"
          :page-size="10"
          layout="total, prev, pager, next"
          @change="handleChange"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="totalCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 每页数量选择 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">每页数量选择</h2>
      <p class="component-demo-view__section-desc">支持切换每页显示的数据条数。</p>
      <div class="component-demo-view__demo demo-stack">
        <AlePagination
          v-model:current="current3"
          v-model:page-size="pageSize1"
          :total="200"
          :page-size-options="[10, 20, 50, 100]"
          layout="sizes, prev, pager, next"
          :showSizeChanger="true"
          @change="handleChange"
          @size-change="handleSizeChange"
        />
        <div class="demo-info">
          <span class="demo-info-label">当前选中：</span>
          <span class="demo-info-value">{{ pageSize1 }} 条/页</span>
          <span class="demo-info-divider">|</span>
          <span class="demo-info-label">当前页码：</span>
          <span class="demo-info-value">第 {{ current3 }} 页</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeChangerCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 快捷跳转 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">快捷跳转</h2>
      <p class="component-demo-view__section-desc">支持直接跳转到指定页码。</p>
      <div class="component-demo-view__demo">
        <AlePagination
          v-model:current="current4"
          :total="500"
          :page-size="10"
          layout="prev, pager, next, jumper"
          @change="handleChange"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="jumperCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 完整功能 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">完整功能</h2>
      <p class="component-demo-view__section-desc">包含所有功能的分页组件。</p>
      <div class="component-demo-view__demo">
        <AlePagination
          v-model:current="current5"
          v-model:page-size="pageSize2"
          :total="1000"
          :page-size-options="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :showSizeChanger="true"
          @change="handleChange"
          @size-change="handleSizeChange"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="fullCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <p class="component-demo-view__section-desc">提供了三种尺寸：small、medium（默认）、large。</p>
      <div class="component-demo-view__demo demo-stack">
        <div class="demo-item">
          <span class="demo-label">Small</span>
          <AlePagination
            v-model:current="current6"
            :total="100"
            :page-size="10"
            size="small"
            @change="handleChange"
          />
        </div>
        <div class="demo-item">
          <span class="demo-label">Medium (默认)</span>
          <AlePagination
            v-model:current="current7"
            :total="100"
            :page-size="10"
            size="medium"
            @change="handleChange"
          />
        </div>
        <div class="demo-item">
          <span class="demo-label">Large</span>
          <AlePagination
            v-model:current="current8"
            :total="100"
            :page-size="10"
            size="large"
            @change="handleChange"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <p class="component-demo-view__section-desc">分页组件可以被禁用。</p>
      <div class="component-demo-view__demo">
        <AlePagination
          v-model:current="current9"
          :total="100"
          :page-size="10"
          disabled
          @change="handleChange"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 简洁模式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">简洁模式</h2>
      <p class="component-demo-view__section-desc">简洁的分页模式，适合空间有限的场景。</p>
      <div class="component-demo-view__demo">
        <AlePagination
          v-model:current="current10"
          :total="100"
          :page-size="10"
          simple
          @change="handleChange"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="simpleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 受控模式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">受控模式</h2>
      <p class="component-demo-view__section-desc">通过 v-model 控制当前页码。</p>
      <div class="component-demo-view__demo">
        <AlePagination
          v-model:current="controlledCurrent"
          :total="100"
          :page-size="10"
          @change="handleChange"
        />
        <div class="demo-controls">
          <AleButton @click="controlledCurrent = 1">首页</AleButton>
          <AleButton @click="controlledCurrent = 5">第 5 页</AleButton>
          <AleButton @click="controlledCurrent = 10">末页</AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="controlledCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AlePagination, AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 响应式数据
const current1 = ref(1);
const current2 = ref(1);
const current3 = ref(1);
const current4 = ref(1);
const current5 = ref(1);
const current6 = ref(1);
const current7 = ref(1);
const current8 = ref(1);
const current9 = ref(1);
const current10 = ref(1);
const controlledCurrent = ref(1);

const pageSize1 = ref(10);
const pageSize2 = ref(10);

// 事件处理
const handleChange = (page: number) => {
  console.log('当前页码:', page);
};

const handleSizeChange = (page: number, size: number) => {
  console.log('当前页码:', page, '每页条数:', size);
};

// 代码示例
const basicCode = `<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AlePagination } from 'ale-ui';

const current = ref(1);

const handleChange = (page: number) => {
  console.log('当前页码:', page);
};
<\/script>`;

const totalCode = `<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    layout="total, prev, pager, next"
  />
</template>`;

const sizeChangerCode = `<template>
  <AlePagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="200"
    :page-size-options="[10, 20, 50, 100]"
    layout="sizes, prev, pager, next"
    :showSizeChanger="true"
    @size-change="handleSizeChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);

const handleSizeChange = (page: number, size: number) => {
  console.log('当前页码:', page, '每页条数:', size);
};
<\/script>`;

const jumperCode = `<template>
  <AlePagination
    v-model:current="current"
    :total="500"
    :page-size="10"
    layout="prev, pager, next, jumper"
  />
</template>`;

const fullCode = `<template>
  <AlePagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="1000"
    :page-size-options="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);
<\/script>`;

const sizeCode = `<template>
  <!-- Small -->
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    size="small"
  />
  
  <!-- Medium (默认) -->
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    size="medium"
  />
  
  <!-- Large -->
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    size="large"
  />
</template>`;

const disabledCode = `<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    disabled
  />
</template>`;

const simpleCode = `<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    simple
  />
</template>`;

const controlledCode = `<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
  />
  <div class="controls">
    <AleButton @click="current = 1">首页</AleButton>
    <AleButton @click="current = 5">第 5 页</AleButton>
    <AleButton @click="current = 10">末页</AleButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AlePagination, AleButton } from 'ale-ui';

const current = ref(1);
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
  margin: 0 0 8px 0;
}

.component-demo-view__section-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
}

.component-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.component-demo-view__demo.demo-stack {
  flex-direction: column;
  align-items: flex-start;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.demo-controls {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.demo-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-bg-page);
  border-radius: var(--radius-base);
  font-size: 14px;
  margin-top: 8px;
}

.demo-info-label {
  color: var(--color-text-secondary);
}

.demo-info-value {
  color: var(--color-primary);
  font-weight: 600;
}

.demo-info-divider {
  color: var(--color-border-base);
  margin: 0 8px;
}

.component-demo-view__code {
  margin-top: 24px;
}
</style>

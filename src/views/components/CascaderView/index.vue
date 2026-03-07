<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Cascader 级联选择器</h1>
      <p class="component-demo-view__description">
        级联选择器用于多层级数据的逐级选择，适用于省市区、分类选择等场景。
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <p class="component-demo-view__section-desc">
        级联选择器通过多级菜单展示数据，点击选项展开下一级。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="basicValue"
          :options="options"
          placeholder="请选择地区"
          style="width: 300px"
        />
        <span class="demo-value">当前值: {{ basicValue }}</span>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.basicCode" language="vue" title="基础用法" />
      </div>
    </section>

    <!-- 显示完整路径 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">显示完整路径</h2>
      <p class="component-demo-view__section-desc">
        设置 showAllLevels 控制是否显示完整路径，默认显示。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center;">
          <AleCascader
            v-model="allLevelsValue"
            :options="options"
            :show-all-levels="true"
            placeholder="显示完整路径"
            style="width: 300px"
          />
          <AleCascader
            v-model="allLevelsValue"
            :options="options"
            :show-all-levels="false"
            placeholder="只显示最后一级"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.allLevelsCode" language="vue" title="显示完整路径" />
      </div>
    </section>

    <!-- 自定义分隔符 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义分隔符</h2>
      <p class="component-demo-view__section-desc">
        通过 separator 属性自定义路径分隔符。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="separatorValue"
          :options="options"
          separator=" > "
          placeholder="自定义分隔符"
          style="width: 300px"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.separatorCode" language="vue" title="自定义分隔符" />
      </div>
    </section>

    <!-- 可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可清空</h2>
      <p class="component-demo-view__section-desc">
        设置 clearable 属性显示清空按钮，悬停时显示。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="clearableValue"
          :options="options"
          clearable
          placeholder="可清空的选择器"
          style="width: 300px"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.clearableCode" language="vue" title="可清空" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <p class="component-demo-view__section-desc">
        设置 disabled 属性禁用选择器。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center;">
          <AleCascader
            v-model="disabledValue"
            :options="options"
            disabled
            placeholder="禁用状态"
            style="width: 300px"
          />
          <AleCascader
            v-model="disabledValue"
            :options="options"
            placeholder="正常状态"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.disabledCode" language="vue" title="禁用状态" />
      </div>
    </section>

    <!-- 尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">尺寸</h2>
      <p class="component-demo-view__section-desc">
        提供 large、medium、small 三种尺寸。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center; flex-direction: column; align-items: flex-start;">
          <AleCascader
            v-model="sizeValue"
            :options="options"
            size="large"
            placeholder="大尺寸"
            style="width: 300px"
          />
          <AleCascader
            v-model="sizeValue"
            :options="options"
            size="medium"
            placeholder="中等尺寸（默认）"
            style="width: 300px"
          />
          <AleCascader
            v-model="sizeValue"
            :options="options"
            size="small"
            placeholder="小尺寸"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.sizeCode" language="vue" title="尺寸" />
      </div>
    </section>

    <!-- 可搜索 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可搜索</h2>
      <p class="component-demo-view__section-desc">
        设置 filterable 属性启用搜索功能，支持搜索任意级别的选项。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="filterableValue"
          :options="options"
          filterable
          placeholder="可搜索的选择器"
          style="width: 300px"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.filterableCode" language="vue" title="可搜索" />
      </div>
    </section>

    <!-- 展开方式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">展开方式</h2>
      <p class="component-demo-view__section-desc">
        支持 click（点击展开）和 hover（悬停展开）两种方式。
      </p>
      <div class="component-demo-view__demo">
        <div style="display: flex; gap: 16px; align-items: center;">
          <AleCascader
            v-model="expandValue"
            :options="options"
            expand-trigger="click"
            placeholder="点击展开"
            style="width: 300px"
          />
          <AleCascader
            v-model="expandValue"
            :options="options"
            expand-trigger="hover"
            placeholder="悬停展开"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.expandCode" language="vue" title="展开方式" />
      </div>
    </section>

    <!-- 选择任意节点 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">选择任意节点</h2>
      <p class="component-demo-view__section-desc">
        设置 check-strictly 属性可以选择任意一级节点，支持 single（单选）和 multiple（多选）两种模式。
      </p>
      <div class="component-demo-view__demo" style="flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <span style="width: 80px; color: var(--color-text-secondary);">单选模式:</span>
          <AleCascader
            v-model="singleValue"
            :options="options"
            check-strictly="single"
            placeholder="单选任意节点"
            style="width: 300px"
          />
          <span class="demo-value">当前值: {{ singleValue }}</span>
        </div>
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <span style="width: 80px; color: var(--color-text-secondary);">多选模式:</span>
          <AleCascader
            v-model="multipleValue"
            :options="options"
            check-strictly="multiple"
            placeholder="多选任意节点"
            style="width: 300px"
          />
          <span class="demo-value">当前值: {{ JSON.stringify(multipleValue) }}</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.strictCode" language="vue" title="选择任意节点" />
      </div>
    </section>

    <!-- 事件 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">事件</h2>
      <p class="component-demo-view__section-desc">
        监听 change、expand-change、visible-change 等事件。
      </p>
      <div class="component-demo-view__demo">
        <AleCascader
          v-model="eventValue"
          :options="options"
          placeholder="监听事件"
          style="width: 300px"
          @change="handleChange"
          @expand-change="handleExpandChange"
          @visible-change="handleVisibleChange"
          @clear="handleClear"
        />
        <div class="event-log">
          <p v-for="(log, index) in eventLogs" :key="index">{{ log }}</p>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="codes.eventCode" language="vue" title="事件" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { AleCascader } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 导入代码示例
import * as codes from './codes';

// 导入数据和事件处理
import {
  options,
  basicValue,
  allLevelsValue,
  separatorValue,
  clearableValue,
  disabledValue,
  sizeValue,
  filterableValue,
  expandValue,
  singleValue,
  multipleValue,
  eventValue,
  eventLogs,
  handleChange,
  handleExpandChange,
  handleVisibleChange,
  handleClear
} from './data';
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
  margin: 0 0 12px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
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

.component-demo-view__code {
  margin-top: 24px;
}

.demo-value {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-left: 16px;
}

.event-log {
  flex: 1;
  margin-left: 16px;
  padding: 12px;
  background: var(--color-gray-50);
  border-radius: var(--radius-base);
  font-size: 13px;
  color: var(--color-text-secondary);
  max-height: 120px;
  overflow-y: auto;
}

.event-log p {
  margin: 4px 0;
}

.event-log p:first-child {
  color: var(--color-primary);
  font-weight: 500;
}
</style>

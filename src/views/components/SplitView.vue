<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Split 分割面板</h1>
      <p class="component-demo-view__description">
        用于将容器分割为多个可调整大小的面板，支持水平和垂直方向，分割线悬停时显示
      </p>
    </div>

    <!-- 水平分割 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">水平分割</h2>
      <p class="component-demo-view__section-desc">
        默认方向，将容器分为左右两个面板，悬停分割线可拖动调整比例
      </p>
      <div class="component-demo-view__demo split-demo">
        <AleSplit style="height: 300px; border: 1px solid var(--color-border-light); border-radius: var(--radius-base);">
          <AleSplitPanel :size="30">
            <div class="split-panel-content split-panel-content--left">
              左侧面板 (30%)
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="70">
            <div class="split-panel-content split-panel-content--right">
              右侧面板 (70%)
            </div>
          </AleSplitPanel>
        </AleSplit>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="horizontalCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 垂直分割 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">垂直分割</h2>
      <p class="component-demo-view__section-desc">
        通过设置 direction="vertical"，将容器分为上下两个面板
      </p>
      <div class="component-demo-view__demo split-demo">
        <AleSplit direction="vertical" style="height: 400px; border: 1px solid var(--color-border-light); border-radius: var(--radius-base);">
          <AleSplitPanel :size="40">
            <div class="split-panel-content split-panel-content--top">
              顶部面板 (40%)
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="60">
            <div class="split-panel-content split-panel-content--bottom">
              底部面板 (60%)
            </div>
          </AleSplitPanel>
        </AleSplit>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="verticalCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 嵌套使用 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">嵌套使用</h2>
      <p class="component-demo-view__section-desc">
        可以嵌套使用 Split 组件，实现复杂的布局结构
      </p>
      <div class="component-demo-view__demo split-demo">
        <AleSplit style="height: 400px; border: 1px solid var(--color-border-light); border-radius: var(--radius-base);">
          <AleSplitPanel :size="20">
            <div class="split-panel-content split-panel-content--nav">
              导航栏 (20%)
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="80">
            <AleSplit direction="vertical" style="height: 100%;">
              <AleSplitPanel :size="70">
                <div class="split-panel-content split-panel-content--main">
                  主内容区 (70%)
                </div>
              </AleSplitPanel>
              <AleSplitPanel :size="30">
                <div class="split-panel-content split-panel-content--footer">
                  底部区域 (30%)
                </div>
              </AleSplitPanel>
            </AleSplit>
          </AleSplitPanel>
        </AleSplit>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="nestedCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 限制尺寸范围 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">限制尺寸范围</h2>
      <p class="component-demo-view__section-desc">
        通过 min 和 max 属性限制面板的最小和最大尺寸（像素）
      </p>
      <div class="component-demo-view__demo split-demo">
        <AleSplit style="height: 300px; border: 1px solid var(--color-border-light); border-radius: var(--radius-base);">
          <AleSplitPanel :size="30" :min="100" :max="400">
            <div class="split-panel-content split-panel-content--left">
              左侧面板<br/>
              最小: 100px<br/>
              最大: 400px
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="70">
            <div class="split-panel-content split-panel-content--right">
              右侧面板
            </div>
          </AleSplitPanel>
        </AleSplit>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="limitCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可折叠面板 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可折叠面板</h2>
      <p class="component-demo-view__section-desc">
        设置 collapsible 属性使面板可折叠，双击分割线或点击折叠按钮可切换折叠状态
      </p>
      <div class="component-demo-view__demo split-demo">
        <AleSplit style="height: 300px; border: 1px solid var(--color-border-light); border-radius: var(--radius-base);">
          <AleSplitPanel :size="25" collapsible>
            <div class="split-panel-content split-panel-content--left">
              可折叠面板<br/>
              双击分割线或<br/>
              悬停点击按钮折叠
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="75">
            <div class="split-panel-content split-panel-content--right">
              右侧面板
            </div>
          </AleSplitPanel>
        </AleSplit>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="collapsibleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 三栏布局 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">三栏布局</h2>
      <p class="component-demo-view__section-desc">
        使用多个面板实现三栏或多栏布局
      </p>
      <div class="component-demo-view__demo split-demo">
        <AleSplit style="height: 300px; border: 1px solid var(--color-border-light); border-radius: var(--radius-base);">
          <AleSplitPanel :size="20" :min="150">
            <div class="split-panel-content split-panel-content--nav">
              左侧栏 (20%)
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="60" :min="300">
            <div class="split-panel-content split-panel-content--main">
              中间内容区 (60%)
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="20" :min="150" collapsible>
            <div class="split-panel-content split-panel-content--aside">
              右侧栏 (20%)<br/>
              可折叠
            </div>
          </AleSplitPanel>
        </AleSplit>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="threeColumnCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <p class="component-demo-view__section-desc">
        设置 disabled 属性禁用拖动功能
      </p>
      <div class="component-demo-view__demo split-demo">
        <AleSplit disabled style="height: 300px; border: 1px solid var(--color-border-light); border-radius: var(--radius-base);">
          <AleSplitPanel :size="40">
            <div class="split-panel-content split-panel-content--left">
              左侧面板 (40%)<br/>
              拖动已禁用
            </div>
          </AleSplitPanel>
          <AleSplitPanel :size="60">
            <div class="split-panel-content split-panel-content--right">
              右侧面板 (60%)
            </div>
          </AleSplitPanel>
        </AleSplit>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { AleSplit, AleSplitPanel } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const horizontalCode = `<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="30">
      <div>左侧面板 (30%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="70">
      <div>右侧面板 (70%)</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`;

const verticalCode = `<template>
  <AleSplit direction="vertical" style="height: 400px;">
    <AleSplitPanel :size="40">
      <div>顶部面板 (40%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="60">
      <div>底部面板 (60%)</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`;

const nestedCode = `<template>
  <AleSplit style="height: 400px;">
    <AleSplitPanel :size="20">
      <div>导航栏 (20%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="80">
      <AleSplit direction="vertical" style="height: 100%;">
        <AleSplitPanel :size="70">
          <div>主内容区 (70%)</div>
        </AleSplitPanel>
        <AleSplitPanel :size="30">
          <div>底部区域 (30%)</div>
        </AleSplitPanel>
      </AleSplit>
    </AleSplitPanel>
  </AleSplit>
<\/script>`;

const limitCode = `<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="30" :min="100" :max="400">
      <div>左侧面板 - 最小: 100px，最大: 400px</div>
    </AleSplitPanel>
    <AleSplitPanel :size="70">
      <div>右侧面板</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`;

const collapsibleCode = `<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="25" collapsible>
      <div>可折叠面板</div>
    </AleSplitPanel>
    <AleSplitPanel :size="75">
      <div>右侧面板</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`;

const threeColumnCode = `<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="20" :min="150">
      <div>左侧栏 (20%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="60" :min="300">
      <div>中间内容区 (60%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="20" :min="150" collapsible>
      <div>右侧栏 (20%) - 可折叠</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`;

const disabledCode = `<template>
  <AleSplit disabled style="height: 300px;">
    <AleSplitPanel :size="40">
      <div>左侧面板 (40%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="60">
      <div>右侧面板 (60%)</div>
    </AleSplitPanel>
  </AleSplit>
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

.split-demo {
  display: block;
}

.component-demo-view__code {
  margin-top: 24px;
}

.split-panel-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
}

.split-panel-content--left,
.split-panel-content--nav {
  background: var(--color-primary-50);
  color: var(--color-primary-700);
}

.split-panel-content--right,
.split-panel-content--main {
  background: var(--color-success-50);
  color: var(--color-success-700);
}

.split-panel-content--top {
  background: var(--color-warning-50);
  color: var(--color-warning-700);
}

.split-panel-content--bottom,
.split-panel-content--footer {
  background: var(--color-danger-50);
  color: var(--color-danger-700);
}

.split-panel-content--aside {
  background: var(--color-info-50);
  color: var(--color-info-700);
}
</style>

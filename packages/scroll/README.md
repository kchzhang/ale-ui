# Scroll 滚动条组件

自定义滚动条组件，提供美观的滚动条样式和丰富的交互功能。

## 特性

- 🎨 多种主题样式（default、primary、dark）
- 📏 多种尺寸（small、medium、large）
- ⬆️➡️ 支持垂直、水平和双向滚动
- 🖱️ **悬停显示**：默认鼠标悬停时才显示滚动条，保持界面整洁
- ✨ **平滑过渡**：滚动条出现/消失带有流畅的动画效果
- 📐 **布局稳定**：滚动条显示/隐藏不会影响内容布局
- 🖱️ 支持鼠标拖拽滚动
- 📱 触摸设备友好
- ⚡ 高性能，支持大量数据
- 🔧 丰富的 API 控制

## 基础用法

```vue
<template>
  <AleScroll height="300px">
    <div class="content">
      <p v-for="i in 50" :key="i">这是第 {{ i }} 行内容</p>
    </div>
  </AleScroll>
</template>

<script setup lang="ts">
import { AleScroll } from 'ale-ui';
</script>
```

> **提示**：默认情况下滚动条不会显示，只有当鼠标悬停在滚动区域时才会平滑出现。这种设计保持了界面的整洁，同时提供了良好的用户体验。

## Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | 滚动区域高度 | `string \| number` | - |
| maxHeight | 滚动区域最大高度 | `string \| number` | - |
| width | 滚动区域宽度（水平滚动时建议设置） | `string \| number` | - |
| maxWidth | 滚动区域最大宽度 | `string \| number` | - |
| native | 是否使用原生滚动条 | `boolean` | `false` |
| always | 是否始终显示滚动条（默认悬停才显示） | `boolean` | `false` |
| minSize | 滚动条最小尺寸 | `number` | `20` |
| theme | 主题样式 | `'default' \| 'primary' \| 'dark'` | `'default'` |
| size | 滚动条尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| direction | 滚动方向 | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` |
| smooth | 是否启用平滑滚动 | `boolean` | `true` |
| disabled | 是否禁用滚动 | `boolean` | `false` |
| loadOffset | 触发加载的阈值 | `number` | `0` |
| customClass | 自定义类名 | `string` | - |

### 关于 `always` 属性

- 当 `always` 为 `false`（默认）时，滚动条只在鼠标悬停或触摸时显示
- 当 `always` 为 `true` 时，滚动条始终可见
- 无论哪种模式，滚动条的出现和消失都不会影响内容布局

## 水平滚动示例

水平滚动时需要设置 `width` 属性来限制容器宽度：

```vue
<template>
  <AleScroll direction="horizontal" width="500px">
    <div class="horizontal-content">
      <div v-for="i in 20" :key="i" class="item">
        卡片 {{ i }}
      </div>
    </div>
  </AleScroll>
</template>

<style>
.horizontal-content {
  display: flex;
  gap: 16px;
  width: max-content; /* 确保内容宽度超过容器 */
}
.item {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
}
</style>
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| scroll | 滚动时触发 | `(position: ScrollPosition, sizeInfo: ScrollSizeInfo)` |
| scroll-to-bottom | 滚动到底部时触发 | - |
| scroll-to-top | 滚动到顶部时触发 | - |
| scroll-to-left | 滚动到最左时触发 | - |
| scroll-to-right | 滚动到最右时触发 | - |
| load-more | 滚动到底部时触发（用于加载更多） | - |

## Methods

通过 `ref` 可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| scrollTo | 滚动到指定位置 | `{ top?: number; left?: number; behavior?: 'auto' \| 'smooth' }` |
| scrollToTop | 滚动到顶部 | `behavior?: 'auto' \| 'smooth'` |
| scrollToBottom | 滚动到底部 | `behavior?: 'auto' \| 'smooth'` |
| getScrollPosition | 获取当前滚动位置 | - |
| getScrollSize | 获取滚动尺寸信息 | - |
| update | 更新滚动条状态 | - |

## 示例

### 不同主题

```vue
<template>
  <AleScroll height="200px" theme="primary">
    <div class="content">...</div>
  </AleScroll>
</template>
```

### 滚动控制

```vue
<template>
  <AleButton @click="scrollToTop">滚动到顶部</AleButton>
  <AleScroll ref="scrollRef" height="300px">
    <div class="content">...</div>
  </AleScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ScrollExpose } from 'ale-ui';

const scrollRef = ref<ScrollExpose | null>(null);

const scrollToTop = () => {
  scrollRef.value?.scrollToTop();
};
</script>
```

### 加载更多

```vue
<template>
  <AleScroll
    height="400px"
    :load-offset="50"
    @load-more="handleLoadMore"
  >
    <div class="content">
      <div v-for="item in list" :key="item.id">{{ item.name }}</div>
      <div v-if="loading">加载中...</div>
    </div>
  </AleScroll>
</template>

<script setup lang="ts">
const handleLoadMore = () => {
  // 加载更多数据
};
</script>
```

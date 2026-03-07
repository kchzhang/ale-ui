# Table 表头固定表身滚动功能

Table 组件支持表头固定、表身滚动的布局方式，适用于大量数据展示场景。

## 基础用法

通过设置 `height` 或 `maxHeight` 属性启用表头固定、表身滚动功能：

```vue
<template>
  <AleTable
    :data="tableData"
    :columns="columns"
    :height="400"
  />
</template>

<script setup lang="ts">
const tableData = Array(20).fill(null).map((_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  address: `北京市朝阳区${i + 1}号`
}));

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', minWidth: 200 }
];
</script>
```

## 属性配置

### height

设置表格固定高度，启用表身滚动：

```vue
<template>
  <!-- 数字类型 -->
  <AleTable :data="data" :columns="columns" :height="400" />
  
  <!-- 字符串类型 -->
  <AleTable :data="data" :columns="columns" height="500px" />
</template>
```

### maxHeight

设置表格最大高度，当内容超过最大高度时启用滚动：

```vue
<template>
  <AleTable :data="data" :columns="columns" :maxHeight="600" />
</template>
```

## 编程式控制

通过 ref 引用 Table 组件，可以调用以下方法控制滚动：

```vue
<template>
  <AleTable
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :height="400"
  />
  <button @click="scrollToTop">滚动到顶部</button>
  <button @click="scrollToBottom">滚动到底部</button>
  <button @click="scrollToRow">滚动到第 10 行</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableRef = ref();

// 滚动到顶部
const scrollToTop = () => {
  tableRef.value?.scrollTableToTop();
};

// 滚动到底部
const scrollToBottom = () => {
  tableRef.value?.scrollTableToBottom();
};

// 滚动到指定行（按行索引）
const scrollToRow = () => {
  tableRef.value?.scrollToRowIndex(9); // 滚动到第 10 行
};

// 设置滚动位置
const setScrollPosition = () => {
  tableRef.value?.setScrollPosition({ top: 200, left: 0 });
};
</script>
```

## 滚动状态

可以通过 `scrollState` 获取当前滚动状态：

```vue
<template>
  <AleTable
    ref="tableRef"
    :data="tableData"
    :columns="columns"
    :height="400"
  />
  <p>横向滚动: {{ scrollState?.scrollLeft }}px</p>
  <p>纵向滚动: {{ scrollState?.scrollTop }}px</p>
  <p>是否滚动中: {{ scrollState?.isScrolling }}</p>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const tableRef = ref();

const scrollState = computed(() => tableRef.value?.scrollState);
</script>
```

## 与其他功能集成

### 与固定列功能共存

```vue
<template>
  <AleTable
    :data="tableData"
    :columns="columns"
    :height="400"
  >
    <AleTableColumn prop="id" label="ID" fixed="left" width="80" />
    <AleTableColumn prop="name" label="姓名" />
    <AleTableColumn prop="age" label="年龄" />
    <AleTableColumn prop="action" label="操作" fixed="right" />
  </AleTable>
</template>
```

### 与选择功能共存

```vue
<template>
  <AleTable
    :data="tableData"
    :columns="columns"
    :height="400"
  >
    <AleTableColumn type="selection" width="50" />
    <AleTableColumn prop="name" label="姓名" />
  </AleTable>
</template>
```

### 与排序功能共存

```vue
<template>
  <AleTable
    :data="tableData"
    :columns="columns"
    :height="400"
  >
    <AleTableColumn prop="id" label="ID" sortable />
    <AleTableColumn prop="name" label="姓名" sortable />
  </AleTable>
</template>
```

### 与斑马纹、边框功能共存

```vue
<template>
  <AleTable
    :data="tableData"
    :columns="columns"
    :height="400"
    stripe
    border
  />
</template>
```

## 性能优化

表头固定、表身滚动功能采用了以下性能优化策略：

1. **RAF 节流**：使用 `requestAnimationFrame` 对滚动事件进行节流
2. **被动事件监听**：使用 `{ passive: true }` 提升滚动性能
3. **CSS 优化**：使用 `will-change` 提示浏览器优化渲染
4. **横向滚动同步**：表头和表身横向滚动自动同步

## 响应式设计

表格滚动功能支持响应式布局：

- 自适应不同屏幕尺寸
- 自定义滚动条样式
- 支持暗黑模式

## 样式定制

相关 CSS 类名：

| 类名 | 说明 |
|------|------|
| `.ale-table__wrapper--scrollable` | 可滚动的表格容器 |
| `.ale-table__header-wrapper--fixed` | 固定表头 |
| `.ale-table__body-wrapper--scrollable` | 可滚动的表身 |

### 自定义滚动条样式

```css
/* 自定义滚动条宽度 */
.ale-table__body-wrapper--scrollable::-webkit-scrollbar {
  width: 10px;
}

/* 自定义滚动条轨道 */
.ale-table__body-wrapper--scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 自定义滚动条滑块 */
.ale-table__body-wrapper--scrollable::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
```

## 注意事项

1. **必须设置 height 或 maxHeight**：只有设置了高度属性，才会启用表头固定、表身滚动功能
2. **横向滚动同步**：表头和表身的横向滚动会自动同步
3. **数据量大时性能**：建议配合虚拟滚动使用（如需要）
4. **固定列兼容性**：与固定列功能完全兼容

## 浏览器兼容性

支持所有现代浏览器：

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

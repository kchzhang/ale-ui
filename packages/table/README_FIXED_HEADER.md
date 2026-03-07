# Table 固定表头功能说明

## 使用方式

只需设置 `height` 或 `maxHeight` 属性即可启用固定表头：

```vue
<template>
  <!-- 方式1：固定高度 -->
  <AleTable :data="data" :columns="columns" :height="400" />
  
  <!-- 方式2：最大高度 -->
  <AleTable :data="data" :columns="columns" :maxHeight="500" />
</template>
```

## 特点

- 滚动仅限于表格容器内部
- 不影响页面其他内容的滚动
- 适用于表格数据量大、需要独立滚动的场景
- 横向滚动时表头自动同步滚动

## 实现原理

### CSS 布局

```css
/* 可滚动的表格容器 - Flexbox 布局 */
.ale-table__wrapper--scrollable {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 固定表头 */
.ale-table__header-wrapper--fixed {
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;  /* 保持固定高度 */
  background-color: var(--tb-bg-secondary);
}

/* 可滚动的表体 */
.ale-table__body-wrapper--scrollable {
  flex: 1;  /* 占据剩余空间 */
  overflow-y: auto;
  overflow-x: auto;
}
```

### 横向滚动同步

使用 `requestAnimationFrame` 节流优化性能：

```typescript
const handleBodyScroll = () => {
  if (!bodyRef.value) return;
  const { scrollLeft } = bodyRef.value;

  // RAF 节流
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
  rafId = requestAnimationFrame(() => {
    if (headerRef.value) {
      headerRef.value.scrollLeft = scrollLeft;
    }
  });
};
```

## 代码示例

### 基础用法

```vue
<template>
  <div class="page-content">
    <h1>用户列表</h1>
    <p>页面其他内容...</p>
    
    <!-- 表格在容器内独立滚动，不影响页面 -->
    <AleTable
      :data="tableData"
      :columns="columns"
      :height="400"
      stripe
      border
    />
    
    <p>页面底部内容...</p>
  </div>
</template>

<script setup>
import { AleTable } from 'ale-ui';

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', width: 300 }
];

const tableData = Array(50).fill(null).map((_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  address: `地址${i + 1}`
}));
</script>
```

### 配合固定列使用

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

<script setup>
const columns = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址', width: 300 },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'email', label: '邮箱', width: 200 },
  { label: '操作', width: 120, fixed: 'right', slot: 'action' }
];
</script>
```

## API

| 属性 | 类型 | 说明 |
|------|------|------|
| height | `number \| string` | 表格固定高度，超出后表体滚动 |
| maxHeight | `number \| string` | 表格最大高度，内容超出后表体滚动 |

## 程序化滚动方法

通过 ref 可以调用以下方法：

```vue
<template>
  <AleTable ref="tableRef" :data="data" :columns="columns" :height="400" />
  <button @click="scrollToRow(10)">滚动到第10行</button>
  <button @click="scrollToTop">滚动到顶部</button>
  <button @click="scrollToBottom">滚动到底部</button>
</template>

<script setup>
import { ref } from 'vue';

const tableRef = ref();

const scrollToRow = (index) => {
  tableRef.value?.scrollToRowIndex(index);
};

const scrollToTop = () => {
  tableRef.value?.scrollTableToTop();
};

const scrollToBottom = () => {
  tableRef.value?.scrollTableToBottom();
};
</script>
```

## 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| Flexbox | ✅ | ✅ | ✅ | ✅ |
| Sticky Position | ✅ | ✅ | ✅ | ✅ |
| Custom Scrollbar | ✅ | ✅ (部分) | ✅ | ✅ |

## 性能优化

1. **RAF 节流**：使用 `requestAnimationFrame` 节流滚动事件，避免频繁重绘
2. **被动事件监听**：`{ passive: true }` 提升滚动性能
3. **隐藏表头滚动条**：保持表头与表体视觉一致
4. **Will-Change 属性**：提示浏览器优化滚动动画

## 注意事项

1. **高度单位**：`height` 和 `maxHeight` 支持数字（px）或带单位的字符串（如 `'50vh'`）
2. **横向滚动**：表头会随表体一起横向滚动，保持列对齐
3. **浏览器兼容**：支持所有现代浏览器，IE11 需要 polyfill
4. **与其他功能配合**：可以与固定列、排序、筛选等功能同时使用

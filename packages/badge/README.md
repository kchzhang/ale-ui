# AleBadge 徽标组件

用于显示数量、状态或标记信息的徽标组件。

## 基础用法

### 基本徽标

```vue
<template>
  <AleBadge :value="12">
    <div class="box">消息</div>
  </AleBadge>
</template>

<style scoped>
.box {
  width: 40px;
  height: 40px;
  background: var(--color-bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

### 最大值

当数值超过最大值时，会显示 `max+`。

```vue
<template>
  <AleBadge :value="200" :max="99">
    <div class="box">消息</div>
  </AleBadge>
</template>
```

### 自定义内容

可以使用 `value` 属性传入自定义内容。

```vue
<template>
  <AleBadge value="new">
    <div class="box">消息</div>
  </AleBadge>
</template>
```

### 圆点

使用 `isDot` 属性显示小圆点徽标。

```vue
<template>
  <AleBadge isDot>
    <div class="box">消息</div>
  </AleBadge>
</template>
```

## 类型

### 颜色类型

通过 `type` 属性设置徽标类型。

```vue
<template>
  <AleBadge :value="12" type="primary">主要</AleBadge>
  <AleBadge :value="3" type="success">成功</AleBadge>
  <AleBadge :value="5" type="warning">警告</AleBadge>
  <AleBadge :value="8" type="danger">危险</AleBadge>
  <AleBadge :value="1" type="info">信息</AleBadge>
</template>
```

### 自定义颜色

使用 `color` 属性设置自定义背景颜色。

```vue
<template>
  <AleBadge :value="12" color="#f56c6c">
    <div class="box">消息</div>
  </AleBadge>
</template>
```

## 尺寸

通过 `size` 属性设置徽标尺寸。

```vue
<template>
  <AleBadge :value="12" size="small">小</AleBadge>
  <AleBadge :value="12" size="medium">中</AleBadge>
  <AleBadge :value="12" size="large">大</AleBadge>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|---------|--------|
| value | 显示值 | number / string | — | 0 |
| max | 最大值，超过显示 max+ | number | — | 99 |
| isDot | 是否显示小圆点 | boolean | — | false |
| type | 徽标类型 | BadgeType | primary / success / warning / danger / info | danger |
| size | 徽标尺寸 | BadgeSize | large / medium / small | medium |
| hidden | 是否隐藏徽标 | boolean | — | false |
| color | 自定义颜色 | string | — | — |

### Slots

| 插槽名 | 说明 |
|---------|------|
| default | 包裹的内容 |

### Type Definitions

```typescript
export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'large' | 'medium' | 'small';

export interface BadgeProps {
  value?: number | string;
  max?: number;
  isDot?: boolean;
  type?: BadgeType;
  size?: BadgeSize;
  hidden?: boolean;
  color?: string;
}
```

## 示例

### 无内容徽标

```vue
<template>
  <AleBadge value="hot"></AleBadge>
</template>
```

### 动态数值

```vue
<template>
  <AleBadge :value="count">
    <div class="box">消息</div>
  </AleBadge>
  
  <button @click="count++">增加</button>
  <button @click="count--">减少</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>
```

### 隐藏徽标

```vue
<template>
  <AleBadge :value="12" :hidden="isHidden">
    <div class="box">消息</div>
  </AleBadge>
  
  <button @click="isHidden = !isHidden">切换显示</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isHidden = ref(false);
</script>
```

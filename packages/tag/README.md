# Tag 标签组件

用于标记和选择的标签组件。

## 基础用法

```vue
<template>
  <AleTag>默认标签</AleTag>
  <AleTag type="primary">主要标签</AleTag>
  <AleTag type="success">成功标签</AleTag>
  <AleTag type="warning">警告标签</AleTag>
  <AleTag type="danger">危险标签</AleTag>
  <AleTag type="info">信息标签</AleTag>
</template>
```

## 可关闭标签

```vue
<template>
  <AleTag closable @close="handleClose">可关闭</AleTag>
</template>
```

## 不同尺寸

```vue
<template>
  <AleTag size="small">小型</AleTag>
  <AleTag size="medium">中型</AleTag>
  <AleTag size="large">大型</AleTag>
</template>
```

## 禁用状态

```vue
<template>
  <AleTag disabled>禁用标签</AleTag>
</template>
```

## 自定义颜色

```vue
<template>
  <AleTag color="#ff6b6b" bgColor="#fff5f5">自定义颜色</AleTag>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 类型 | string | primary / success / warning / danger / info | primary |
| size | 尺寸 | string | large / medium / small | medium |
| closable | 是否可关闭 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| bordered | 是否显示边框 | boolean | — | false |
| round | 是否为圆角标签 | boolean | — | false |
| color | 自定义颜色 | string | — | — |
| bgColor | 自定义背景色 | string | — | — |
| icon | 图标类名 | string | — | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭标签时触发 | (event: MouseEvent) |
| click | 点击标签时触发 | (event: MouseEvent) |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签内容 |

# Button 按钮

基础按钮组件，支持多种样式、尺寸和状态。

## 基础用法

使用 `type`、`size` 等属性来定义按钮的样式。

```vue
<template>
  <Button>默认按钮</Button>
  <Button type="primary">主要按钮</Button>
  <Button type="danger">危险按钮</Button>
  <Button type="success">成功按钮</Button>
  <Button type="warning">警告按钮</Button>
</template>
```

## 不同尺寸

提供 `large`、`medium`、`small` 三种尺寸。

```vue
<template>
  <Button size="large">大号按钮</Button>
  <Button size="medium">中号按钮</Button>
  <Button size="small">小号按钮</Button>
</template>
```

## 幽灵按钮

设置 `plain` 属性可以设置为幽灵按钮。

```vue
<template>
  <Button plain>默认按钮</Button>
  <Button type="primary" plain>主要按钮</Button>
  <Button type="danger" plain>危险按钮</Button>
</template>
```

## 加载状态

设置 `loading` 属性可以让按钮处于加载状态。

```vue
<template>
  <Button loading>加载中</Button>
  <Button type="primary" loading>加载中</Button>
</template>
```

## 禁用状态

设置 `disabled` 属性可以让按钮处于禁用状态。

```vue
<template>
  <Button disabled>禁用按钮</Button>
  <Button type="primary" disabled>禁用按钮</Button>
</template>
```

## 圆角按钮

设置 `round` 属性可以让按钮变为圆角按钮。

```vue
<template>
  <Button round>圆角按钮</Button>
  <Button type="primary" round>圆角按钮</Button>
</template>
```

## 圆形按钮

设置 `circle` 属性可以让按钮变为圆形按钮。

```vue
<template>
  <Button circle>
    <Icon />
  </Button>
</template>
```

## 块级按钮

设置 `block` 属性可以让按钮变为块级按钮，宽度撑满父容器。

```vue
<template>
  <Button block>块级按钮</Button>
  <Button type="primary" block>块级按钮</Button>
</template>
```

## 事件

支持原生 `click` 事件。

```vue
<template>
  <Button @click="handleClick">点击我</Button>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击');
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 按钮类型 | string | primary / default / danger / success / warning | default |
| size | 按钮尺寸 | string | large / medium / small | medium |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否加载中 | boolean | — | false |
| block | 是否块级按钮 | boolean | — | false |
| plain | 是否幽灵按钮 | boolean | — | false |
| round | 是否圆角按钮 | boolean | — | false |
| circle | 是否圆形按钮 | boolean | — | false |
| nativeType | 原生 type 属性 | string | button / submit / reset | button |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | event: MouseEvent |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

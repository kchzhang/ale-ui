# Radio 单选框

单选框组件，用于在一组互斥的选项中选择一项。

## 基础用法

```vue
<template>
  <AleRadio v-model="value" value="option1">选项一</AleRadio>
  <AleRadio v-model="value" value="option2">选项二</AleRadio>
</template>

<script setup>
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('option1');
</script>
```

## Radio 组件

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 选中的值（受控模式） | string / number / boolean | — | undefined |
| value | 当前单选框的值 | string / number / boolean | — | true |
| defaultChecked | 是否默认选中（非受控模式） | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| readonly | 是否只读 | boolean | — | false |
| size | 尺寸 | string | small / medium / large | medium |
| theme | 主题色 | string | primary / success / warning / danger | primary |
| label | 标签文本 | string | — | '' |
| customClass | 自定义类名 | string | — | '' |
| name | 单选框名称（用于表单提交） | string | — | '' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中值变化时触发 | value: 新的选中值 |
| change | 选中值变化时触发 | value: 新的选中值 |
| click | 点击时触发 | event: MouseEvent |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义标签内容，会覆盖 label 属性 |

## RadioGroup 组件

用于管理一组单选框。

### 基础用法

```vue
<template>
  <AleRadioGroup v-model="value" :options="options" />
</template>

<script setup>
import { ref } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const value = ref('apple');
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' }
];
</script>
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 选中的值 | string / number / boolean | — | undefined |
| defaultValue | 默认选中的值 | string / number / boolean | — | undefined |
| options | 选项数组 | RadioOption[] | — | [] |
| disabled | 是否禁用整个组 | boolean | — | false |
| size | 尺寸 | string | small / medium / large | medium |
| theme | 主题色 | string | primary / success / warning / danger | primary |
| direction | 排列方向 | string | horizontal / vertical | horizontal |
| name | 单选框名称（用于表单提交） | string | — | '' |

### RadioOption 类型

```typescript
interface RadioOption {
  label: string;           // 选项标签
  value: string | number | boolean;  // 选项值
  disabled?: boolean;      // 是否禁用
  render?: () => any;      // 自定义渲染内容
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中值变化时触发 | value: 新的选中值 |
| change | 选中值变化时触发 | value: 新的选中值 |
| click | 点击选项时触发 | (value: 被点击的值, event: MouseEvent) |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| select | 选择指定值 | (value: RadioValue) |
| clear | 清空选择 | — |
| selectFirst | 选择第一个可用选项 | — |
| selectLast | 选择最后一个可用选项 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义内容，当不传入 options 时使用 |

## 代码示例

### 不同尺寸

```vue
<template>
  <AleRadio v-model="value" value="small" size="small">小型</AleRadio>
  <AleRadio v-model="value" value="medium" size="medium">中型</AleRadio>
  <AleRadio v-model="value" value="large" size="large">大型</AleRadio>
</template>
```

### 不同主题

```vue
<template>
  <AleRadio v-model="value" value="primary" theme="primary">主要</AleRadio>
  <AleRadio v-model="value" value="success" theme="success">成功</AleRadio>
  <AleRadio v-model="value" value="warning" theme="warning">警告</AleRadio>
  <AleRadio v-model="value" value="danger" theme="danger">危险</AleRadio>
</template>
```

### 禁用状态

```vue
<template>
  <AleRadio v-model="value" value="1" disabled>禁用</AleRadio>
  <AleRadio v-model="value" value="2" readonly>只读</AleRadio>
</template>
```

### 垂直排列

```vue
<template>
  <AleRadioGroup v-model="value" direction="vertical" :options="options" />
</template>
```

### 组合使用

```vue
<template>
  <AleRadioGroup v-model="value" theme="success" size="large">
    <AleRadio value="beijing">北京</AleRadio>
    <AleRadio value="shanghai">上海</AleRadio>
    <AleRadio value="guangzhou" disabled>广州（禁用）</AleRadio>
    <AleRadio value="shenzhen">深圳</AleRadio>
  </AleRadioGroup>
</template>
```

### 程序化控制

```vue
<template>
  <div>
    <AleButton @click="selectFirst">选择第一个</AleButton>
    <AleButton @click="clear">清空</AleButton>
  </div>
  <AleRadioGroup ref="groupRef" v-model="value" :options="options" />
</template>

<script setup>
import { ref } from 'vue';

const groupRef = ref();
const value = ref('');
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' }
];

const selectFirst = () => {
  groupRef.value?.selectFirst();
};

const clear = () => {
  groupRef.value?.clear();
};
</script>
```

### 表单应用

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-item">
      <label>性别：</label>
      <AleRadioGroup v-model="form.gender" :options="genderOptions" />
    </div>
    <button type="submit">提交</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  gender: 'male'
});

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
];

const handleSubmit = () => {
  console.log('表单数据:', form);
};
</script>
```

## 注意事项

1. **受控与非受控模式**
   - 当传入 `modelValue` 时为受控模式，需要通过 `update:modelValue` 事件同步状态
   - 未传入 `modelValue` 时为非受控模式，可以使用 `defaultChecked` 设置初始值

2. **RadioGroup 优先级**
   - 当 Radio 在 RadioGroup 内部时，RadioGroup 的 `size`、`theme`、`disabled`、`name` 会覆盖 Radio 的相应属性

3. **事件处理**
   - 独立使用 Radio 时，`change` 事件返回的是当前 Radio 的 value
   - 在 RadioGroup 中使用 Radio 时，`change` 事件通过 RadioGroup 触发

4. **可访问性**
   - 组件支持键盘导航（Tab 切换，Space 选择）
   - 提供正确的 ARIA 属性（role="radio"、aria-checked、aria-disabled 等）

## 浏览器支持

- Chrome >= 88
- Firefox >= 78
- Safari >= 14
- Edge >= 88

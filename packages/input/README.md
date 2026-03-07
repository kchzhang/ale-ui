# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

基础的输入框用法。

```vue
<template>
  <AleInput v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

## 不同类型

支持多种输入类型：text、password、email、number、tel、url、textarea。

```vue
<template>
  <AleInput v-model="text" type="text" placeholder="文本输入" />
  <AleInput v-model="password" type="password" placeholder="密码输入" />
  <AleInput v-model="email" type="email" placeholder="邮箱输入" />
  <AleInput v-model="number" type="number" placeholder="数字输入" />
  <AleInput v-model="textareaContent" type="textarea" placeholder="文本域输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
const password = ref('');
const email = ref('');
const number = ref('');
const textareaContent = ref('');
</script>
```

## 不同尺寸

输入框提供三种尺寸：large、medium、small。

```vue
<template>
  <AleInput v-model="value1" size="large" placeholder="大型输入框" />
  <AleInput v-model="value2" size="medium" placeholder="中型输入框" />
  <AleInput v-model="value3" size="small" placeholder="小型输入框" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
</script>
```

## 可清空

通过 `clearable` 属性可以得到一个可清空的输入框。

```vue
<template>
  <AleInput v-model="value" clearable placeholder="输入内容后可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

## 禁用状态

通过 `disabled` 属性禁用输入框，通过 `readonly` 属性设置为只读。

```vue
<template>
  <AleInput v-model="value1" disabled placeholder="禁用状态" />
  <AleInput v-model="value2" readonly placeholder="只读状态" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('禁用内容');
const value2 = ref('只读内容');
</script>
```

## 密码框

通过 `show-password` 属性可以显示切换密码图标。

```vue
<template>
  <AleInput
    v-model="value"
    type="password"
    placeholder="请输入密码"
    show-password
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

## 字数限制

通过 `maxlength` 和 `minlength` 属性限制输入字符长度。

```vue
<template>
  <AleInput
    v-model="value"
    maxlength="10"
    placeholder="最多输入10个字符"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

## 文本域

通过 `type="textarea"` 使用文本域组件。

```vue
<template>
  <AleInput
    v-model="value"
    type="textarea"
    placeholder="请输入内容"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

### 自定义行数

通过 `rows` 属性设置文本域的行数。

```vue
<template>
  <AleInput
    v-model="value"
    type="textarea"
    :rows="5"
    placeholder="请输入内容"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

### 调整大小

通过 `resize` 属性控制文本域是否可调整大小。

```vue
<template>
  <AleInput
    v-model="value"
    type="textarea"
    resize="none"
    placeholder="禁止调整大小"
  />
  <AleInput
    v-model="value"
    type="textarea"
    resize="vertical"
    placeholder="垂直调整"
  />
  <AleInput
    v-model="value"
    type="textarea"
    resize="horizontal"
    placeholder="水平调整"
  />
  <AleInput
    v-model="value"
    type="textarea"
    resize="both"
    placeholder="双向调整"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

### 高度自适应

通过 `autoResize` 属性启用文本域高度自适应，根据输入内容自动调整高度。

```vue
<template>
  <AleInput
    v-model="value"
    type="textarea"
    :autoResize="true"
    placeholder="请输入内容，高度会自动调整"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

### 高度限制

配合 `autoResize` 使用 `minHeight` 和 `maxHeight` 限制文本域的最小和最大高度。

```vue
<template>
  <AleInput
    v-model="value"
    type="textarea"
    :autoResize="true"
    :minHeight="60"
    :maxHeight="200"
    placeholder="高度在 60px 到 200px 之间自适应"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>
```

## 事件

输入框支持以下事件：

```vue
<template>
  <AleInput
    v-model="value"
    placeholder="输入内容触发事件"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @keyup="handleKeyup"
    @keydown="handleKeydown"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');

const handleChange = (val: string) => {
  console.log('change', val);
};

const handleFocus = (event: FocusEvent) => {
  console.log('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  console.log('blur', event);
};

const handleKeyup = (event: KeyboardEvent) => {
  console.log('keyup', event);
};

const handleKeydown = (event: KeyboardEvent) => {
  console.log('keydown', event);
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 绑定值 | string / number | — | '' |
| type | 类型 | InputType | text / password / email / number / tel / url / textarea | 'text' |
| size | 尺寸 | InputSize | large / medium / small | 'medium' |
| disabled | 是否禁用 | boolean | — | false |
| readonly | 是否只读 | boolean | — | false |
| placeholder | 占位文本 | string | — | '' |
| clearable | 是否可清空 | boolean | — | false |
| maxlength | 最大输入长度 | number | — | — |
| minlength | 最小输入长度 | number | — | — |
| show-password | 是否显示切换密码图标 | boolean | — | false |
| rows | 文本域行数 | number | — | 3 |
| cols | 文本域列数 | number | — | — |
| resize | 文本域是否可调整大小 | string | none / both / horizontal / vertical | 'vertical' |
| autoResize | 是否启用高度自适应 | boolean | — | false |
| minHeight | 文本域最小高度（像素） | number | — | — |
| maxHeight | 文本域最大高度（像素） | number | — | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | (value: string \| number) |
| change | 输入框失去焦点或按下回车时触发 | (value: string \| number) |
| focus | 获得焦点时触发 | (event: FocusEvent) |
| blur | 失去焦点时触发 | (event: FocusEvent) |
| clear | 点击清空按钮时触发 | — |
| keyup | 键盘抬起时触发 | (event: KeyboardEvent) |
| keydown | 键盘按下时触发 | (event: KeyboardEvent) |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 使输入框获得焦点 | — |
| blur | 使输入框失去焦点 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| — | 自定义内容 |

## 样式定制

Input 组件使用 CSS 变量进行样式定制，可以通过覆盖以下变量来自定义样式：

```css
.ale-input__inner {
  /* 修改输入框高度 */
  height: var(--custom-height);
  
  /* 修改边框颜色 */
  border-color: var(--custom-border-color);
  
  /* 修改背景色 */
  background-color: var(--custom-bg-color);
}
```

## 注意事项

1. `modelValue` 绑定值支持 `v-model` 双向绑定
2. `show-password` 属性仅在 `type="password"` 时有效
3. `clearable` 属性在输入值为空、禁用或只读时不显示清除按钮
4. 输入框会自动适配暗黑模式
5. `autoResize`、`minHeight`、`maxHeight` 属性仅在 `type="textarea"` 时有效
6. 当 `resize="none"` 时，自动调整高度功能会失效
7. 高度自适应会监听输入内容和程序性修改，实时调整文本域高度

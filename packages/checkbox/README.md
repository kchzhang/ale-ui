# Checkbox & CheckboxGroup 复选框组件

Ale UI 的复选框组件，用于在一组选项中进行多选。

## Checkbox 单复选框

### 基础用法

```vue
<template>
  <AleCheckbox v-model="checked">选项一</AleCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked = ref(true);
</script>
```

### Checkbox Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 是否选中（受控模式） | boolean | — | undefined |
| defaultChecked | 是否默认选中（非受控模式） | boolean | — | false |
| value | 复选框的值 | string / number / boolean | — | true |
| disabled | 是否禁用 | boolean | — | false |
| readonly | 是否只读 | boolean | — | false |
| indeterminate | 是否半选中状态 | boolean | — | false |
| size | 尺寸 | string | small / medium / large | medium |
| theme | 主题色 | string | primary / success / warning / danger | primary |
| label | 标签文本 | string | — | '' |
| customClass | 自定义类名 | string | — | '' |
| name | 复选框名称（用于表单） | string | — | '' |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中状态变化时触发 | (value: boolean) |
| change | 选中状态变化时触发 | (value: boolean) |
| click | 点击时触发 | (event: MouseEvent) |

---

## CheckboxGroup 复选框组

### 基础用法

```vue
<template>
  <AleCheckboxGroup v-model="checkedValues" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup } from 'ale-ui';

const checkedValues = ref(['apple', 'banana']);
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];
</script>
```

### 全选/反选功能

```vue
<template>
  <div>
    <AleCheckbox 
      :model-value="isAllSelected" 
      :indeterminate="isIndeterminate"
      @change="handleSelectAll"
    >
      全选
    </AleCheckbox>
    <AleCheckboxGroup 
      ref="groupRef"
      v-model="selectedValues" 
      :options="options" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleCheckbox, AleCheckboxGroup } from 'ale-ui';

const groupRef = ref<InstanceType<typeof AleCheckboxGroup>>();
const selectedValues = ref<string[]>([]);
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
];

const isAllSelected = computed(() => {
  return selectedValues.value.length === options.length;
});

const isIndeterminate = computed(() => {
  return selectedValues.value.length > 0 && selectedValues.value.length < options.length;
});

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    groupRef.value?.selectAll();
  } else {
    groupRef.value?.unselectAll();
  }
};
</script>
```

### 垂直排列

```vue
<template>
  <AleCheckboxGroup 
    v-model="selectedValues" 
    direction="vertical"
    :options="options" 
  />
</template>
```

### 限制选中数量

```vue
<template>
  <AleCheckboxGroup 
    v-model="selectedValues" 
    :options="options"
    :min="1"
    :max="3"
  />
</template>
```

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 选中的值数组 | CheckboxValue[] | — | [] |
| defaultValue | 默认选中的值数组 | CheckboxValue[] | — | [] |
| options | 选项数组 | CheckboxOption[] | — | [] |
| disabled | 是否禁用整个组 | boolean | — | false |
| size | 尺寸 | string | small / medium / large | medium |
| theme | 主题色 | string | primary / success / warning / danger | primary |
| direction | 排列方向 | string | horizontal / vertical | horizontal |
| min | 最小选中数量 | number | — | undefined |
| max | 最大选中数量 | number | — | undefined |

### CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中值变化时触发 | (value: CheckboxValue[]) |
| change | 选中值变化时触发 | (value: CheckboxValue[]) |
| click | 点击选项时触发 | (value: CheckboxValue, event: MouseEvent) |

### CheckboxGroup Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| selectAll | 全选 | — |
| unselectAll | 取消全选 | — |
| toggleAll | 反选 | — |
| toggleOption | 切换指定选项 | (value: CheckboxValue) |
| isChecked | 检查选项是否选中 | (value: CheckboxValue) => boolean |

### CheckboxGroup Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 自定义复选框内容 | — |
| option | 自定义选项渲染 | { option: CheckboxOption, index: number } |

---

## 类型定义

```typescript
// 复选框尺寸
type CheckboxSize = 'small' | 'medium' | 'large';

// 复选框主题
type CheckboxTheme = 'primary' | 'success' | 'warning' | 'danger';

// 复选框值类型
type CheckboxValue = string | number | boolean;

// 复选框选项
interface CheckboxOption {
  label: string;
  value: CheckboxValue;
  disabled?: boolean;
  render?: () => any;
}

// Checkbox Props
interface CheckboxProps {
  modelValue?: boolean;
  defaultChecked?: boolean;
  value?: CheckboxValue;
  disabled?: boolean;
  readonly?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
  theme?: CheckboxTheme;
  label?: string;
  customClass?: string;
  name?: string;
}

// CheckboxGroup Props
interface CheckboxGroupProps {
  modelValue?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  options?: CheckboxOption[];
  disabled?: boolean;
  size?: CheckboxSize;
  theme?: CheckboxTheme;
  direction?: 'horizontal' | 'vertical';
  min?: number;
  max?: number;
}
```

---

## 可访问性 (A11y)

- 支持键盘导航（方向键、Home/End）
- 完整的 ARIA 属性支持
- role="group" 标识复选框组
- aria-label 提供标签说明
- 焦点状态清晰可见

## 样式变量

组件使用 CSS 变量进行主题定制：

```css
/* 主要颜色 */
--color-primary
--color-primary-hover
--color-success
--color-success-hover
--color-warning
--color-warning-hover
--color-danger
--color-danger-hover

/* 间距 */
--spacing-2
--spacing-3
--spacing-4
--spacing-6

/* 字体 */
--font-family-base
--font-size-xs
--font-size-sm
--font-size-base
--font-size-md

/* 边框 */
--border-width-base
--border-style-solid
--border-width-thick
--color-border-base
--color-border-light

/* 圆角 */
--radius-sm
--radius-lg

/* 过渡 */
--transition-base
--transition-fast

/* 透明度 */
--opacity-disabled
```

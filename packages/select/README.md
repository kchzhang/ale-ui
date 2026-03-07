# AleSelect 选择器组件

AleSelect 是一个功能完善的选择器组件，支持单选/多选、搜索过滤、键盘导航、虚拟滚动等高级特性。

## 功能特性

- **单选/多选模式**: 支持灵活的选项选择方式
- **可搜索过滤**: 支持本地过滤和远程搜索
- **键盘导航**: 完整的键盘操作支持，提升无障碍体验
- **虚拟滚动**: 大数据量场景下的性能优化
- **自定义样式**: 支持通过 CSS 变量自定义外观
- **创建新条目**: 允许用户创建不存在的选项
- **响应式设计**: 适配不同屏幕尺寸
- **暗黑模式**: 内置暗黑主题支持

## 基础用法

### 单选模式

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="options"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
];
</script>
```

### 多选模式

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="options"
    multiple
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref([]);
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
];
</script>
```

### 可搜索

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="options"
    filterable
    placeholder="请选择或搜索"
  />
</template>
```

### 远程搜索

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="filteredOptions"
    filterable
    :remote-method="handleRemoteSearch"
    @search-error="handleSearchError"
    placeholder="请输入关键词搜索"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
const filteredOptions = ref([]);

const handleRemoteSearch = async (query) => {
  // 调用远程搜索 API
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  filteredOptions.value = data.map(item => ({
    label: item.name,
    value: item.id
  }));
};

const handleSearchError = (error) => {
  console.error('搜索失败:', error);
};
</script>
```

### 自定义过滤方法

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="options"
    filterable
    :filter-method="customFilter"
    placeholder="请选择"
  />
</template>

<script setup>
const customFilter = (query, option) => {
  // 自定义过滤逻辑
  return option.label.includes(query) || option.value.includes(query);
};
</script>
```

### 动态高度调整

组件默认支持动态高度调整，下拉菜单会根据选项数量自动计算合适的高度：

```vue
<template>
  <!-- 基础用法 - 自动调整高度 -->
  <AleSelect
    v-model="selected"
    :options="options"
    placeholder="请选择"
  />

  <!-- 大量数据 - 使用虚拟滚动 -->
  <AleSelect
    v-model="selected"
    :options="largeOptions"
    virtual-scroll
    :visible-count="10"
    placeholder="请选择"
  />
</template>
```

**动态高度特性：**
- 实时监测选项数量变化
- 平滑的高度过渡动画（200ms easeOutCubic）
- 最大显示 8 个选项，超出显示滚动条
- 响应式布局适配不同屏幕尺寸
- 支持 `prefers-reduced-motion` 媒体查询

## Props 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | `string \| number \| (string \| number)[]` | - | 绑定值 |
| options | `SelectOption[]` | `[]` | 选项数据 |
| size | `'large' \| 'medium' \| 'small'` | `'medium'` | 尺寸大小 |
| disabled | `boolean` | `false` | 是否禁用 |
| clearable | `boolean` | `false` | 是否可清空 |
| filterable | `boolean` | `false` | 是否可搜索 |
| multiple | `boolean` | `false` | 是否多选 |
| placeholder | `string` | `'请选择'` | 占位提示文本 |
| readonly | `boolean` | `false` | 是否只读 |
| loading | `boolean` | `false` | 是否正在加载 |
| noDataText | `string` | `'暂无数据'` | 无数据时的提示文本 |
| loadingText | `string` | `'加载中...'` | 加载时的提示文本 |
| filterMethod | `(query: string, option: SelectOption) => boolean` | - | 自定义过滤方法 |
| remoteMethod | `(query: string) => Promise<void>` | - | 远程搜索方法 |
| allowCreate | `boolean` | `false` | 是否允许创建新条目 |
| virtualScroll | `boolean` | `false` | 是否开启虚拟滚动 |
| itemHeight | `number` | `34` | 虚拟滚动时每项高度(px) |
| visibleCount | `number` | `10` | 虚拟滚动时可视区域显示数量 |
| maxCollapseTags | `number` | `0` | 最大显示标签数，0表示不折叠 |
| customClass | `string` | - | 自定义类名 |
| customStyle | `object` | - | 自定义样式 |

### SelectOption 类型

```typescript
interface SelectOption {
  label: string;           // 显示文本
  value: string | number;  // 选项值
  disabled?: boolean;      // 是否禁用
  [key: string]: unknown;  // 其他自定义属性
}
```

## Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `value` | 值更新事件 |
| change | `value` | 值改变事件 |
| visible-change | `visible: boolean` | 下拉菜单显示状态改变 |
| remove-tag | `value` | 移除标签时触发（多选） |
| clear | - | 清空选择时触发 |
| focus | `event: FocusEvent` | 获得焦点时触发 |
| blur | `event: FocusEvent` | 失去焦点时触发 |
| search | `query: string` | 搜索输入时触发 |
| create | `value: string` | 创建新条目时触发 |
| search-error | `error: Error` | 搜索失败时触发 |

## Methods 方法

通过 ref 可以调用组件暴露的方法：

```vue
<template>
  <AleSelect ref="selectRef" v-model="value" :options="options" />
  <button @click="handleFocus">聚焦</button>
  <button @click="handleClear">清空</button>
</template>

<script setup>
import { ref } from 'vue';

const selectRef = ref();

const handleFocus = () => {
  selectRef.value?.focus();
};

const handleClear = () => {
  selectRef.value?.clear();
};
</script>
```

| 方法名 | 说明 |
|--------|------|
| focus | 聚焦选择器 |
| blur | 失焦选择器 |
| isFocused | 获取焦点状态 |
| clear | 清空选择 |
| openDropdown | 打开下拉菜单 |
| closeDropdown | 关闭下拉菜单 |

## 可访问性

AleSelect 组件遵循 WAI-ARIA 标准，提供完整的无障碍支持：

### ARIA 属性

- `role="listbox"` - 标识下拉列表
- `role="option"` - 标识每个选项
- `aria-multiselectable` - 指示是否支持多选
- `aria-selected` - 指示选项的选中状态
- `aria-disabled` - 指示选项是否禁用
- `aria-busy` - 指示加载状态
- `aria-label` - 提供列表描述

### 键盘导航

| 按键 | 功能 |
|------|------|
| `ArrowDown` | 向下导航/打开下拉菜单 |
| `ArrowUp` | 向上导航 |
| `Home` | 跳转到第一项 |
| `End` | 跳转到最后一项 |
| `Enter` | 选中当前项 |
| `Space` | 选中当前项 |
| `Escape` | 关闭下拉菜单 |
| `Tab` | 关闭下拉菜单并移出焦点 |
| `Backspace` | 多选模式下删除最后一个标签 |

### 屏幕阅读器支持

- 选项状态语音提示（已选择/未选择）
- 加载状态提示
- 空数据状态提示
- 搜索结果数量提示

## 高级用法

### 远程搜索

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="filteredOptions"
    filterable
    remote
    :loading="loading"
    :remote-method="remoteMethod"
    placeholder="请输入关键词搜索"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
const filteredOptions = ref([]);
const loading = ref(false);

const remoteMethod = async (query) => {
  if (query) {
    loading.value = true;
    // 模拟 API 调用
    const response = await fetch(`/api/search?q=${query}`);
    filteredOptions.value = await response.json();
    loading.value = false;
  } else {
    filteredOptions.value = [];
  }
};
</script>
```

### 虚拟滚动（大数据优化）

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="largeOptions"
    virtual-scroll
    :visible-count="10"
    :item-height="34"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
// 生成大量数据
const largeOptions = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    label: `选项 ${i + 1}`,
    value: String(i + 1)
  }))
);
</script>
```

### 创建新条目

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="options"
    filterable
    allow-create
    @create="handleCreate"
    placeholder="请选择或输入"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);

const handleCreate = (value) => {
  const newOption = { label: value, value };
  options.value.push(newOption);
  selected.value = value;
};
</script>
```

### 自定义过滤方法

```vue
<template>
  <AleSelect
    v-model="selected"
    :options="options"
    filterable
    :filter-method="customFilter"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('');
const options = ref([/* ... */]);

// 自定义过滤逻辑
const customFilter = (query, option) => {
  // 支持拼音搜索
  return option.label.includes(query) ||
         option.pinyin?.includes(query.toLowerCase());
};
</script>
```

## 键盘操作

| 按键 | 功能 |
|------|------|
| `ArrowDown` | 打开下拉菜单或向下移动高亮 |
| `ArrowUp` | 向上移动高亮 |
| `Enter` | 选中高亮的选项 |
| `Escape` | 关闭下拉菜单 |
| `Backspace` | 多选模式下删除最后一个标签 |
| `Tab` | 关闭下拉菜单并切换焦点 |

## CSS 变量

组件使用以下 CSS 变量，可以通过覆盖这些变量来自定义样式：

```css
/* 自定义选择器样式 */
.my-custom-select {
  --color-primary: #3b82f6;
  --color-primary-50: rgba(59, 130, 246, 0.1);
  --color-primary-100: rgba(59, 130, 246, 0.2);
  --input-height-large: 48px;
  --input-height-medium: 40px;
  --input-height-small: 32px;
}
```

### 可覆盖的 CSS 变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--color-primary` | `#3b82f6` | 主色调 |
| `--color-primary-50` | 主色透明 | 选中背景色 |
| `--input-height-large` | `48px` | 大尺寸高度 |
| `--input-height-medium` | `40px` | 中尺寸高度 |
| `--input-height-small` | `32px` | 小尺寸高度 |
| `--font-size-base` | `14px` | 基础字号 |
| `--spacing-*` | - | 间距系统 |
| `--radius-*` | - | 圆角系统 |
| `--shadow-*` | - | 阴影系统 |

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 注意事项

1. **虚拟滚动**: 开启虚拟滚动后，需要指定固定的 `itemHeight`，且所有选项高度必须一致
2. **远程搜索**: 使用 `remoteMethod` 时，建议配合 `loading` 属性显示加载状态
3. **多选折叠**: 设置 `maxCollapseTags` 可以限制显示的标签数量，超出部分会显示为 `+n`
4. **无障碍**: 组件支持键盘操作和屏幕阅读器，确保良好的可访问性

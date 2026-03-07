# Ale UI CSS 变量系统 - 使用说明

## 📚 已完成的工作

### 1. CSS 变量定义文件
- **文件位置**: `src/styles/variables.css`
- **内容**: 包含所有基础设计系统变量
  - 颜色系统（主色、功能色、中性色、语义化颜色）
  - 字体系统（字体家族、字号、字重、行高）
  - 间距系统（基于 4px 基础单位）
  - 尺寸系统（组件尺寸、按钮尺寸、输入框尺寸、图标尺寸）
  - 圆角系统
  - 阴影系统
  - 过渡动画系统
  - 层级系统
  - 边框系统
  - 暗黑模式支持

### 2. 全局样式文件
- **文件位置**: `src/styles/index.css`
- **内容**: 
  - 全局样式重置
  - 基础排版样式
  - 表单元素样式
  - 丰富的工具类

### 3. 主题切换功能
- **文件位置**: `src/composables/useTheme.ts`
- **功能**:
  - 支持亮色/暗黑/自动三种模式
  - 自动跟随系统主题
  - 手动切换主题
  - 持久化主题设置

### 4. 主题切换组件
- **文件位置**: `src/components/ThemeToggle.vue`
- **功能**: 可视化主题切换器，支持下拉菜单选择主题模式

### 5. 变量演示页面
- **文件位置**: `src/views/VariablesDemoView.vue`
- **功能**: 直观展示所有 CSS 变量的效果

### 6. 组件更新
- **Button.vue**: 已更新为使用 CSS 变量
- **App.vue**: 已更新为使用 CSS 变量
- **HomeView.vue**: 已更新为使用 CSS 变量并重新设计

### 7. 路由配置
- 已添加变量演示页面路由

### 8. 详细文档
- **文件位置**: `CSS_VARIABLES_GUIDE.md`
- **内容**: 完整的 CSS 变量使用指南，包含变量分类、最佳实践和示例代码

## 🚀 快速开始

### 安装和运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 在项目中使用 CSS 变量

#### 1. 导入样式文件

在 `main.ts` 中导入：

```typescript
import './styles/index.css';
```

#### 2. 在组件中使用变量

```vue
<template>
  <div class="my-component">
    <h1>标题</h1>
    <p>内容文本</p>
  </div>
</template>

<style scoped>
.my-component {
  padding: var(--spacing-6);
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
  border-radius: var(--radius-lg);
}

.my-component h1 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
}

.my-component p {
  font-size: var(--font-size-base);
  color: var(--color-text-regular);
  line-height: var(--line-height-base);
}
</style>
```

### 使用主题切换功能

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { theme, toggleTheme, setAutoTheme, isDark } = useTheme();

const toggle = () => {
  toggleTheme();
};

const setAuto = () => {
  setAutoTheme();
};
</script>

<template>
  <div>
    <button @click="toggle">切换主题</button>
    <button @click="setAuto">跟随系统</button>
    <p>当前主题: {{ theme }}</p>
    <p v-if="isDark()">暗黑模式已启用</p>
  </div>
</template>
```

### 使用主题切换组件

```vue
<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>

<template>
  <div>
    <ThemeToggle />
  </div>
</template>
```

## 📖 变量分类速查

### 颜色变量

```css
/* 语义化颜色 */
var(--color-primary)           /* 主色 */
var(--color-primary-hover)      /* 主色悬停 */
var(--color-primary-active)     /* 主色激活 */
var(--color-primary-light)      /* 主色浅色 */
var(--color-success)           /* 成功色 */
var(--color-warning)           /* 警告色 */
var(--color-danger)            /* 危险色 */

/* 文字颜色 */
var(--color-text-primary)      /* 主要文字 */
var(--color-text-regular)      /* 常规文字 */
var(--color-text-secondary)    /* 次要文字 */
var(--color-text-placeholder)  /* 占位符文字 */

/* 背景颜色 */
var(--color-bg-base)           /* 组件背景 */
var(--color-bg-page)           /* 页面背景 */

/* 边框颜色 */
var(--color-border-base)       /* 基础边框 */
var(--color-border-light)      /* 浅色边框 */
```

### 字体变量

```css
/* 字号 */
var(--font-size-xs)    /* 12px */
var(--font-size-sm)    /* 13px */
var(--font-size-base)  /* 14px */
var(--font-size-md)    /* 16px */
var(--font-size-lg)    /* 18px */
var(--font-size-xl)    /* 20px */
var(--font-size-2xl)   /* 24px */

/* 字重 */
var(--font-weight-normal)    /* 400 */
var(--font-weight-medium)    /* 500 */
var(--font-weight-semibold)  /* 600 */
var(--font-weight-bold)      /* 700 */
```

### 间距变量

```css
var(--spacing-1)  /* 4px */
var(--spacing-2)  /* 8px */
var(--spacing-3)  /* 12px */
var(--spacing-4)  /* 16px */
var(--spacing-6)  /* 24px */
var(--spacing-8)  /* 32px */
```

### 圆角变量

```css
var(--radius-sm)    /* 2px */
var(--radius-base)  /* 4px */
var(--radius-md)    /* 6px */
var(--radius-lg)    /* 8px */
var(--radius-xl)    /* 12px */
var(--radius-full)  /* 9999px */
```

### 阴影变量

```css
var(--shadow-sm)     /* 小阴影 */
var(--shadow-base)   /* 基础阴影 */
var(--shadow-md)     /* 中等阴影 */
var(--shadow-lg)     /* 大阴影 */
var(--shadow-xl)     /* 超大阴影 */
```

## 🎨 工具类使用

### 文本工具类

```html
<p class="text-primary">主要文本</p>
<p class="text-success">成功文本</p>
<p class="text-warning">警告文本</p>
<p class="text-danger">危险文本</p>
<p class="text-secondary">次要文本</p>
```

### 背景工具类

```html
<div class="bg-white">白色背景</div>
<div class="bg-primary">主色背景</div>
<div class="bg-success">成功背景</div>
```

### 字体工具类

```html
<p class="text-xs">超小字体</p>
<p class="text-sm">小字体</p>
<p class="text-base">基础字体</p>
<p class="text-lg">大字体</p>
<p class="text-2xl">超大字体</p>
```

### 字重工具类

```html
<p class="font-light">细体</p>
<p class="font-normal">常规</p>
<p class="font-medium">中等</p>
<p class="font-semibold">半粗</p>
<p class="font-bold">粗体</p>
```

### 间距工具类

```html
<div class="p-4">内边距 16px</div>
<div class="m-4">外边距 16px</div>
<div class="mt-4 mb-4">上下外边距 16px</div>
<div class="pl-4 pr-4">左右内边距 16px</div>
```

### 显示工具类

```html
<div class="flex">Flex 布局</div>
<div class="hidden">隐藏</div>
<div class="block">块级元素</div>
<div class="inline-block">行内块元素</div>
```

### Flex 工具类

```html
<div class="flex items-center justify-center">
  居中对齐
</div>
<div class="flex items-start justify-between">
  两端对齐
</div>
<div class="flex-col">
  垂直布局
</div>
```

### 圆角工具类

```html
<div class="rounded-none">无圆角</div>
<div class="rounded-base">基础圆角</div>
<div class="rounded-lg">大圆角</div>
<div class="rounded-full">完全圆角</div>
```

### 阴影工具类

```html
<div class="shadow-sm">小阴影</div>
<div class="shadow-md">中等阴影</div>
<div class="shadow-lg">大阴影</div>
<div class="shadow-xl">超大阴影</div>
```

## 🌙 暗黑模式

### 自动切换

系统会自动根据用户的系统设置切换暗黑模式。

### 手动切换

使用 `useTheme` composable：

```typescript
import { useTheme } from '@/composables/useTheme';

const { toggleTheme, setAutoTheme } = useTheme();

// 切换到指定主题
toggleTheme('dark');   // 暗黑模式
toggleTheme('light');  // 亮色模式

// 跟随系统
setAutoTheme();
```

### 自定义暗黑主题

在 CSS 中覆盖暗黑模式变量：

```css
.dark {
  --color-bg-base: #0f172a;
  --color-primary: #60a5fa;
  /* 自定义其他变量... */
}
```

## ✨ 最佳实践

### 1. 优先使用语义化变量

```css
/* ✅ 推荐 */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-4);
}

/* ❌ 不推荐 */
.button {
  background-color: #3b82f6;
  padding: 16px;
}
```

### 2. 遵循间距系统

```css
/* ✅ 推荐 */
.card {
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-4);
}

/* ❌ 不推荐 */
.card {
  padding: 18px;
  margin-bottom: 15px;
}
```

### 3. 使用正确的过渡时长

```css
/* ✅ 推荐 */
.button {
  transition: var(--transition-base);
}

/* ❌ 不推荐 */
.button {
  transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 📂 文件结构

```
src/
├── styles/
│   ├── variables.css      # CSS 变量定义
│   └── index.css         # 全局样式和工具类
├── composables/
│   └── useTheme.ts       # 主题切换 hook
├── components/
│   └── ThemeToggle.vue   # 主题切换组件
└── views/
    └── VariablesDemoView.vue  # 变量演示页面
```

## 🔧 自定义主题

### 修改主色调

```css
:root {
  --color-primary-500: #your-color;
  /* 其他主色系会自动调整 */
}
```

### 修改字体

```css
:root {
  --font-family-base: 'Your Font', sans-serif;
}
```

### 修改间距比例

```css
:root {
  --spacing-unit: 6px;  /* 改为 6px 基础单位 */
}
```

## 📝 注意事项

1. **所有新组件必须使用 CSS 变量**，禁止硬编码颜色、尺寸等值
2. **保持变量命名的一致性**，遵循现有的命名规范
3. **优先使用语义化变量**而非直接引用色值
4. **确保暗黑模式兼容性**，所有颜色变量都应有暗黑模式定义
5. **使用工具类时注意作用域**，避免样式冲突

## 🚧 后续工作建议

1. 为更多组件添加 CSS 变量支持
2. 扩展工具类，添加更多实用类
3. 创建更多主题预设（如蓝色主题、绿色主题等）
4. 添加 RTL（从右到左）语言支持
5. 优化暗黑模式的对比度和可访问性
6. 添加主题编辑器工具

## 📚 相关文档

- [CSS 变量详细指南](./CSS_VARIABLES_GUIDE.md)
- [组件开发规范](./项目设计规范.md)

## 💡 常见问题

### Q: 如何在现有项目中集成？
A: 在 `main.ts` 中导入 `./styles/index.css`，然后逐步将组件样式改为使用 CSS 变量。

### Q: 如何支持多个主题？
A: 可以通过 CSS 类切换不同的变量集，例如 `.theme-blue`、`.theme-green` 等。

### Q: 性能如何？
A: CSS 变量的性能非常好，现代浏览器都已优化。避免在 `transition` 中使用复杂的计算即可。

### Q: IE 浏览器支持？
A: CSS 变量不支持 IE，如需兼容可添加 polyfill 或提供回退方案。

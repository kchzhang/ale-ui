# Ale UI CSS 变量使用指南

## 目录

- [简介](#简介)
- [变量导入](#变量导入)
- [变量分类](#变量分类)
  - [颜色系统](#颜色系统)
  - [字体系统](#字体系统)
  - [间距系统](#间距系统)
  - [尺寸系统](#尺寸系统)
  - [圆角系统](#圆角系统)
  - [阴影系统](#阴影系统)
  - [过渡动画系统](#过渡动画系统)
  - [层级系统](#层级系统)
  - [边框系统](#边框系统)
- [暗黑模式](#暗黑模式)
- [最佳实践](#最佳实践)
- [示例代码](#示例代码)

## 简介

Ale UI 使用 CSS 变量构建完整的设计系统，所有组件都应使用这些变量而非硬编码值。这样可以：

- ✅ 保持设计一致性
- ✅ 支持主题切换和暗黑模式
- ✅ 方便全局样式调整
- ✅ 提高开发效率

## 变量导入

在你的项目中引入 CSS 变量：

```typescript
// main.ts
import './styles/index.css';
```

或者在你的组件中单独导入：

```vue
<style>
@import '@/styles/variables.css';
</style>
```

## 变量分类

### 颜色系统

#### 主色调

```css
/* 主色调（天蓝色） */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;  /* 主色 */
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;
```

#### 功能色

```css
/* 成功色 */
--color-success-50: #f0fdf4;
--color-success-100: #dcfce7;
--color-success-200: #bbf7d0;
--color-success-500: #10b981;  /* 主色 */
--color-success-600: #059669;
--color-success-700: #047857;

/* 警告色 */
--color-warning-50: #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-200: #fde68a;
--color-warning-500: #f59e0b;  /* 主色 */
--color-warning-600: #d97706;
--color-warning-700: #b45309;

/* 危险色 */
--color-danger-50: #fef2f2;
--color-danger-100: #fee2e2;
--color-danger-200: #fecaca;
--color-danger-500: #ef4444;  /* 主色 */
--color-danger-600: #dc2626;
--color-danger-700: #b91c1c;

/* 信息色 */
--color-info-50: #f0f9ff;
--color-info-100: #e0f2fe;
--color-info-500: #06b6d4;
--color-info-600: #0891b2;
```

#### 中性色（灰度）

```css
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

#### 语义化颜色

```css
/* 背景色 */
--color-bg-base: #ffffff;          /* 组件背景 */
--color-bg-page: #f5f7fa;          /* 页面背景 */
--color-bg-overlay: rgba(0, 0, 0, 0.5);  /* 遮罩层 */

/* 文字颜色 */
--color-text-primary: #1f2937;     /* 主要文字 */
--color-text-regular: #4b5563;     /* 常规文字 */
--color-text-secondary: #6b7280;   /* 次要文字 */
--color-text-placeholder: #9ca3af; /* 占位符文字 */
--color-text-disabled: #d1d5db;    /* 禁用文字 */

/* 边框颜色 */
--color-border-base: #d1d5db;      /* 基础边框 */
--color-border-light: #e5e7eb;     /* 浅色边框 */
--color-border-lighter: #f3f4f6;   /* 更浅边框 */
--color-border-dark: #9ca3af;      /* 深色边框 */

/* 语义化快捷变量 */
--color-primary: var(--color-primary-500);
--color-primary-hover: var(--color-primary-600);
--color-primary-active: var(--color-primary-700);
--color-primary-light: var(--color-primary-100);

--color-success: var(--color-success-500);
--color-success-hover: var(--color-success-600);
--color-success-light: var(--color-success-100);

--color-warning: var(--color-warning-500);
--color-warning-hover: var(--color-warning-600);
--color-warning-light: var(--color-warning-100);

--color-danger: var(--color-danger-500);
--color-danger-hover: var(--color-danger-600);
--color-danger-light: var(--color-danger-100);
```

### 字体系统

#### 字体家族

```css
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
--font-family-code: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
```

#### 字号

```css
--font-size-xs: 12px;    /* 辅助文本 */
--font-size-sm: 13px;    /* 小号文本 */
--font-size-base: 14px;  /* 基础文本 */
--font-size-md: 16px;    /* 中号文本 */
--font-size-lg: 18px;    /* 大号文本 */
--font-size-xl: 20px;    /* 特大文本 */
--font-size-2xl: 24px;   /* 标题 */
--font-size-3xl: 30px;   /* 大标题 */
--font-size-4xl: 36px;   /* 超大标题 */
```

#### 字重

```css
--font-weight-light: 300;     /* 细体 */
--font-weight-normal: 400;    /* 常规 */
--font-weight-medium: 500;    /* 中等 */
--font-weight-semibold: 600;  /* 半粗 */
--font-weight-bold: 700;      /* 粗体 */
```

#### 行高

```css
--line-height-xs: 1.2;   /* 紧凑 */
--line-height-sm: 1.4;   /* 小 */
--line-height-base: 1.5; /* 基础 */
--line-height-lg: 1.6;   /* 宽松 */
--line-height-xl: 1.8;   /* 宽松+ */
```

### 间距系统

基于 4px 基础单位的间距系统：

```css
--spacing-unit: 4px;

--spacing-0: 0;
--spacing-1: 4px;    /* 极小间距 */
--spacing-2: 8px;    /* 小间距 */
--spacing-3: 12px;   /* 中小间距 */
--spacing-4: 16px;   /* 中等间距 */
--spacing-5: 20px;
--spacing-6: 24px;   /* 大间距 */
--spacing-7: 28px;
--spacing-8: 32px;   /* 超大间距 */
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
```

### 尺寸系统

#### 组件尺寸

```css
--size-xs: 24px;  /* 超小 */
--size-sm: 32px;  /* 小 */
--size-md: 36px;  /* 中 */
--size-lg: 40px;  /* 大 */
--size-xl: 48px;  /* 超大 */
```

#### 按钮尺寸

```css
--button-height-large: 40px;
--button-height-medium: 32px;
--button-height-small: 24px;

--button-padding-large: 0 24px;
--button-padding-medium: 0 16px;
--button-padding-small: 0 12px;
```

#### 输入框尺寸

```css
--input-height-large: 40px;
--input-height-medium: 32px;
--input-height-small: 24px;
```

#### 图标尺寸

```css
--icon-size-xs: 12px;
--icon-size-sm: 14px;
--icon-size-base: 16px;
--icon-size-md: 20px;
--icon-size-lg: 24px;
--icon-size-xl: 32px;
```

### 圆角系统

```css
--radius-none: 0;       /* 无圆角 */
--radius-sm: 2px;       /* 小圆角 */
--radius-base: 4px;     /* 基础圆角 */
--radius-md: 6px;       /* 中等圆角 */
--radius-lg: 8px;       /* 大圆角 */
--radius-xl: 12px;      /* 超大圆角 */
--radius-2xl: 16px;     /* 超超大圆角 */
--radius-full: 9999px;  /* 完全圆角（圆形） */
```

### 阴影系统

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--shadow-none: none;
```

### 过渡动画系统

```css
--transition-duration-fast: 150ms;
--transition-duration-base: 250ms;
--transition-duration-slow: 350ms;

--transition-timing-ease: ease;
--transition-timing-ease-in: ease-in;
--transition-timing-ease-out: ease-out;
--transition-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

--transition-base: var(--transition-duration-base) var(--transition-timing-ease-in-out);
--transition-fast: var(--transition-duration-fast) var(--transition-timing-ease-in-out);
--transition-slow: var(--transition-duration-slow) var(--transition-timing-ease-in-out);
```

### 层级系统

```css
--z-index-dropdown: 1000;          /* 下拉菜单 */
--z-index-sticky: 1020;             /* 固定定位 */
--z-index-fixed: 1030;              /* 固定元素 */
--z-index-modal-backdrop: 1040;     /* 模态框背景 */
--z-index-modal: 1050;              /* 模态框 */
--z-index-popover: 1060;            /* 气泡框 */
--z-index-tooltip: 1070;            /* 工具提示 */
```

### 边框系统

```css
--border-width-thin: 1px;
--border-width-base: 1px;
--border-width-thick: 2px;

--border-style-solid: solid;
--border-style-dashed: dashed;
--border-style-dotted: dotted;
```

## 暗黑模式

### 自动切换

Ale UI 支持自动跟随系统主题切换暗黑模式：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-base: #1f2937;
    --color-bg-page: #111827;
    --color-text-primary: #f9fafb;
    /* 更多变量... */
  }
}
```

### 手动切换

使用 `useTheme` composable 进行手动切换：

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
    <button @click="toggle">切换主题 (当前: {{ theme }})</button>
    <button @click="setAuto">跟随系统</button>
    <p v-if="isDark()">暗黑模式已启用</p>
  </div>
</template>
```

### 自定义暗黑主题

如果需要自定义暗黑主题，可以在组件中覆盖变量：

```css
/* 覆盖默认暗黑主题 */
.dark {
  --color-bg-base: #0f172a;
  --color-primary: #60a5fa;
  /* 自定义其他变量... */
}
```

## 最佳实践

### 1. 优先使用语义化变量

```css
/* ✅ 推荐 */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-base);
}

/* ❌ 不推荐 */
.button {
  background-color: #3b82f6;
  padding: 16px;
  border-radius: 4px;
}
```

### 2. 使用快捷变量而非直接引用色值

```css
/* ✅ 推荐 */
.button {
  background-color: var(--color-primary);
}

/* ❌ 不推荐 */
.button {
  background-color: var(--color-primary-500);
}
```

### 3. 遵循间距系统

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

### 4. 使用正确的过渡时长

```css
/* ✅ 推荐 */
.button {
  transition: var(--transition-base);
}

.dropdown {
  transition: var(--transition-slow);
}

/* ❌ 不推荐 */
.button {
  transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 示例代码

### 创建一个卡片组件

```vue
<template>
  <div class="card">
    <div class="card__header">
      <h3 class="card__title">{{ title }}</h3>
    </div>
    <div class="card__body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-6);
  transition: var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card__header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: var(--border-width-base) var(--border-style-solid) var(--color-border-lighter);
}

.card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.card__body {
  color: var(--color-text-regular);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}
</style>
```

### 创建一个带状态的按钮

```css
.status-button {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-6);
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-base);
  border-radius: var(--radius-base);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
  cursor: pointer;
}

.status-button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: var(--color-primary-50);
}

.status-button:active {
  background-color: var(--color-primary-100);
}

.status-button:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

/* 成功状态 */
.status-button--success {
  border-color: var(--color-success);
  color: var(--color-success);
}

.status-button--success:hover {
  background-color: var(--color-success-50);
}

/* 危险状态 */
.status-button--danger {
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.status-button--danger:hover {
  background-color: var(--color-danger-50);
}
```

### 响应式间距

```css
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

## 工具类

Ale UI 提供了丰富的工具类，可以直接在模板中使用：

```vue
<template>
  <div class="p-4 mb-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold text-primary mb-4">标题</h2>
    <p class="text-base text-regular">内容文本</p>
  </div>
</template>
```

### 可用工具类

- **文本颜色**: `text-primary`, `text-success`, `text-warning`, `text-danger`, `text-regular`, `text-secondary`, `text-placeholder`
- **背景颜色**: `bg-white`, `bg-primary`, `bg-success`, `bg-warning`, `bg-danger`
- **字体大小**: `text-xs`, `text-sm`, `text-base`, `text-md`, `text-lg`, `text-xl`, `text-2xl`
- **字重**: `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **文本对齐**: `text-left`, `text-center`, `text-right`
- **间距**: `m-{0-6}`, `mt-{0-6}`, `mb-{0-6}`, `ml-{0-6}`, `mr-{0-6}`, `p-{0-6}`, `pt-{0-6}`, `pb-{0-6}`, `pl-{0-6}`, `pr-{0-6}`
- **显示**: `hidden`, `inline`, `inline-block`, `block`, `flex`, `inline-flex`
- **Flex**: `items-center`, `items-start`, `items-end`, `justify-center`, `justify-between`, `justify-start`, `justify-end`, `flex-col`, `flex-row`
- **圆角**: `rounded-none`, `rounded-sm`, `rounded-base`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`
- **阴影**: `shadow-sm`, `shadow-base`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-none`
- **过渡**: `transition`, `transition-fast`, `transition-slow`
- **禁用**: `disabled`

## 总结

使用 Ale UI 的 CSS 变量系统可以：

1. **保持设计一致性**: 所有组件使用统一的变量
2. **支持主题切换**: 轻松实现亮色/暗黑模式
3. **提高开发效率**: 快速构建符合规范的组件
4. **便于维护**: 修改变量即可全局调整样式
5. **最佳实践**: 遵循设计规范，避免硬编码

始终优先使用 CSS 变量而非硬编码值，这样可以充分利用 Ale UI 的设计系统优势。

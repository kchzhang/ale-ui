# CodeBlock 代码展示组件

精美的代码展示组件，支持语法高亮、代码复制、行号显示等功能。

## 功能特点

- ✨ **语法高亮**：支持多种编程语言（TypeScript、JavaScript、Vue、CSS、JSON、Markup、Bash）
- 📋 **一键复制**：内置复制功能，方便用户快速复制代码
- 🔢 **行号显示**：可选的行号显示，提升代码可读性
- 🎨 **主题切换**：支持亮色和暗色两种主题
- 📱 **响应式设计**：适配不同屏幕尺寸，移动端友好
- 🎯 **简洁美观**：符合 Ale UI 设计规范，视觉清爽专业

## 基本用法

```vue
<template>
  <CodeBlock
    code="const message = 'Hello, World!';"
    language="typescript"
    title="示例代码"
  />
</template>

<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| code | 要显示的代码内容 | string | - | - |
| language | 代码语言类型 | string | typescript, javascript, vue, css, json, markup, bash | typescript |
| title | 代码块标题 | string | - | - |
| showCopy | 是否显示复制按钮 | boolean | - | true |
| showLineNumbers | 是否显示行号 | boolean | - | true |
| theme | 主题模式 | 'light' \| 'dark' | light, dark | dark |

## 完整示例

```vue
<template>
  <div class="example">
    <!-- 基本用法 -->
    <CodeBlock
      :code="basicCode"
      language="typescript"
      title="TypeScript 代码"
    />

    <!-- Vue 组件代码 -->
    <CodeBlock
      :code="vueCode"
      language="vue"
      title="Vue 组件"
    />

    <!-- CSS 样式代码 -->
    <CodeBlock
      :code="cssCode"
      language="css"
      title="CSS 样式"
    />

    <!-- 无行号 -->
    <CodeBlock
      :code="code"
      language="typescript"
      title="无行号模式"
      :show-line-numbers="false"
    />

    <!-- 亮色主题 -->
    <CodeBlock
      :code="code"
      language="typescript"
      title="亮色主题"
      theme="light"
    />

    <!-- 无复制按钮 -->
    <CodeBlock
      :code="code"
      language="typescript"
      title="只读代码"
      :show-copy="false"
    />
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';

const basicCode = `import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}`;

const vueCode = `<template>
  <div class="counter">
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>`;

const cssCode = `.button {
  padding: 12px 24px;
  border-radius: 6px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background: var(--color-primary-hover);
}`;
</script>
```

## 支持的语言

- `typescript` - TypeScript
- `javascript` - JavaScript
- `vue` - Vue Single File Component（使用 markup 语法高亮）
- `css` - CSS / SCSS
- `json` - JSON
- `markup` - HTML / XML
- `bash` - Shell / Bash

**注意**：Vue 语言会被自动映射到 markup 语法高亮，以提供最佳的代码展示效果。

## 样式定制

CodeBlock 组件使用 CSS 变量，可以通过覆盖 CSS 变量来定制样式：

```css
/* 修改代码块背景色 */
.code-block__wrapper {
  background-color: var(--your-custom-color);
}

/* 修改复制按钮样式 */
.code-block__copy-btn {
  color: var(--your-custom-color);
}
```

## 注意事项

1. **代码转义**：如果代码中包含特殊字符（如 `<`, `>`, `&`），组件会自动处理，无需手动转义。
2. **性能优化**：对于大量代码块，建议使用 `v-once` 指令或懒加载策略。
3. **主题兼容**：组件会自动适配系统的暗黑模式设置，也可以通过 `theme` prop 手动指定。

## 浏览器支持

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## 相关组件

- 无

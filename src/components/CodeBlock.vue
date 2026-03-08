<template>
  <div class="code-block" :class="`code-block--${theme}`">
    <div class="code-block__header" v-if="title || showCopy">
      <span v-if="title" class="code-block__title">{{ title }}</span>
      <button
        v-if="showCopy"
        class="code-block__copy-btn"
        @click="handleCopy"
        :title="copyTooltip"
      >
        <svg v-if="!copied" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    </div>
    <div class="code-block__wrapper" :class="{ 'code-block__wrapper--with-line-numbers': showLineNumbers }">
      <pre class="code-block__pre"><code ref="codeRef"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from 'vue';

// 导入 Prism 主题
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// 动态导入 Prism 及其组件
let Prism: any = null;

const loadPrism = async () => {
  if (Prism) return Prism;

  // @ts-ignore
  const prismModule = await import('prismjs');
  Prism = prismModule.default || prismModule;

  // 按依赖顺序导入语言
  // @ts-ignore
  await import('prismjs/components/prism-markup');
  // @ts-ignore
  await import('prismjs/components/prism-javascript');
  // @ts-ignore
  await import('prismjs/components/prism-typescript');
  // @ts-ignore
  await import('prismjs/components/prism-css');
  // @ts-ignore
  await import('prismjs/components/prism-json');
  // @ts-ignore
  await import('prismjs/components/prism-bash');

  // 导入行号插件
  // @ts-ignore
  await import('prismjs/plugins/line-numbers/prism-line-numbers');

  return Prism;
};

// 导入组件样式
import './CodeBlock.css';

interface Props {
  code: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript',
  showCopy: true,
  showLineNumbers: true,
  theme: 'dark'
});

const codeRef = ref<HTMLElement | null>(null);
const copied = ref(false);
const copyTooltip = ref('复制代码');

// 语言映射：将不存在的语言映射到支持的语言
const languageMap: Record<string, string> = {
  vue: 'markup',
  vue3: 'markup',
  html: 'markup',
  xml: 'markup'
};

// 计算实际使用的语言
const actualLanguage = computed(() => {
  const lang = props.language.toLowerCase();
  return languageMap[lang] || lang;
});

const highlightCode = async () => {
  if (!codeRef.value) return;

  // 确保 Prism 已加载
  const prism = await loadPrism();
  if (!prism) return;

  // 处理空代码情况
  const codeContent = props.code ?? '';

  // 使用 innerHTML 而不是 textContent，确保 HTML 标签能被正确解析
  // 注意：props.code 应该来自可信来源，避免 XSS 风险
  codeRef.value.innerHTML = escapeHtml(codeContent);

  // 设置语言类 - 使用 classList 而不是直接赋值 className
  const languageClass = `language-${actualLanguage.value}`;

  // 清除旧的 language- 类
  codeRef.value.classList.forEach((className) => {
    if (className.startsWith('language-')) {
      codeRef.value?.classList.remove(className);
    }
  });
  codeRef.value.classList.add(languageClass);

  // 处理行号类
  if (props.showLineNumbers) {
    codeRef.value.classList.add('line-numbers');
  } else {
    codeRef.value.classList.remove('line-numbers');
  }

  // 执行语法高亮
  prism.highlightElement(codeRef.value);
};

/**
 * HTML 转义函数，防止 XSS 攻击
 * @param text 原始文本
 * @returns 转义后的安全文本
 */
const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

const handleCopy = async () => {
  const codeToCopy = props.code ?? '';

  // 检查剪贴板 API 是否可用
  if (!navigator.clipboard) {
    copyTooltip.value = '浏览器不支持复制';
    setTimeout(() => {
      copyTooltip.value = '复制代码';
    }, 2000);
    return;
  }

  try {
    await navigator.clipboard.writeText(codeToCopy);
    copied.value = true;
    copyTooltip.value = '已复制!';
  } catch (err) {
    console.error('复制失败:', err);
    copyTooltip.value = '复制失败';
  } finally {
    // 2秒后重置状态
    setTimeout(() => {
      copied.value = false;
      copyTooltip.value = '复制代码';
    }, 2000);
  }
};

onMounted(async () => {
  await loadPrism();
  nextTick(() => {
    highlightCode();
  });
});

// 监听代码内容变化
watch(() => props.code, () => {
  nextTick(() => {
    highlightCode();
  });
});

// 监听语言变化
watch(() => props.language, () => {
  nextTick(() => {
    highlightCode();
  });
});

// 监听行号显示变化
watch(() => props.showLineNumbers, () => {
  nextTick(() => {
    highlightCode();
  });
});
</script>

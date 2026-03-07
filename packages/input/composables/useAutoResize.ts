/**
 * 文本域高度自适应 Composable
 * 根据输入内容自动调整文本域高度
 */

import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export interface AutoResizeOptions {
  /**
   * 最小高度（像素）
   * @default 32
   */
  minHeight?: number;

  /**
   * 最大高度（像素）
   * @default Infinity
   */
  maxHeight?: number;

  /**
   * 是否在内容变化时自动调整高度
   * @default true
   */
  autoResize?: boolean;

  /**
   * 每次调整时的额外高度（用于补偿边框、padding等）
   * @default 0
   */
  extraHeight?: number;
}

/**
 * 文本域高度自适应 Hook
 *
 * @param options - 配置选项
 * @returns 返回 textarea 的 ref 和相关方法
 *
 * @example
 * ```ts
 * const { textareaRef, updateHeight } = useAutoResize({
 *   minHeight: 32,
 *   maxHeight: 200,
 *   autoResize: true
 * });
 * ```
 */
export function useAutoResize(options: AutoResizeOptions = {}) {
  const {
    minHeight = 32,
    maxHeight = Infinity,
    autoResize = true,
    extraHeight = 0
  } = options;

  const textareaRef = ref<HTMLTextAreaElement | null>(null);
  const currentHeight = ref(minHeight);

  /**
   * 计算文本域内容的高度
   *
   * @param textarea - 文本域元素
   * @returns 内容高度（像素）
   */
  const calculateScrollHeight = (textarea: HTMLTextAreaElement): number => {
    // 保存当前样式
    const previousStyle = textarea.style.overflowY;
    const previousHeight = textarea.style.height;

    // 临时移除滚动条和固定高度，以获取内容的真实高度
    textarea.style.overflowY = 'hidden';
    textarea.style.height = 'auto';

    // 获取内容高度
    const scrollHeight = textarea.scrollHeight;

    // 恢复原有样式
    textarea.style.overflowY = previousStyle;
    textarea.style.height = previousHeight;

    return scrollHeight;
  };

  /**
   * 更新文本域高度
   *
   * 根据当前内容计算合适的高度，并限制在最小和最大高度之间
   */
  const updateHeight = () => {
    const textarea = textareaRef.value;
    if (!textarea) return;

    // 如果设置了 resize 属性为 'none'，则不自动调整高度
    if (textarea.style.resize === 'none') return;

    const scrollHeight = calculateScrollHeight(textarea);

    // 计算目标高度，限制在最小和最大高度之间
    let targetHeight = Math.max(minHeight, scrollHeight + extraHeight);
    targetHeight = Math.min(maxHeight, targetHeight);

    // 如果高度有变化，则更新
    if (currentHeight.value !== targetHeight) {
      currentHeight.value = targetHeight;
      textarea.style.height = `${targetHeight}px`;

      // 如果超过最大高度，显示滚动条
      if (scrollHeight + extraHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  };

  /**
   * 重置文本域高度到最小高度
   */
  const resetHeight = () => {
    const textarea = textareaRef.value;
    if (!textarea) return;

    currentHeight.value = minHeight;
    textarea.style.height = `${minHeight}px`;
  };

  /**
   * 处理输入事件
   */
  const handleInput = () => {
    if (!autoResize) return;
    nextTick(() => {
      updateHeight();
    });
  };

  /**
   * 监听内容变化的观察器
   * 使用 MutationObserver 监听内容变化（包括程序性修改）
   */
  let observer: MutationObserver | null = null;

  const setupObserver = () => {
    const textarea = textareaRef.value;
    if (!textarea) return;

    observer = new MutationObserver(() => {
      if (autoResize) {
        updateHeight();
      }
    });

    // 监听 textarea 的内容变化
    observer.observe(textarea, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false
    });
  };

  const cleanupObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  // 组件挂载后初始化
  onMounted(() => {
    const textarea = textareaRef.value;
    if (textarea) {
      // 初始化高度
      updateHeight();

      // 设置初始高度样式
      textarea.style.height = `${minHeight}px`;
      textarea.style.overflowY = 'hidden';

      // 如果启用了自动调整，设置监听器
      if (autoResize) {
        setupObserver();
      }
    }
  });

  // 组件卸载时清理
  onUnmounted(() => {
    cleanupObserver();
  });

  return {
    textareaRef,
    currentHeight,
    updateHeight,
    resetHeight,
    handleInput
  };
}

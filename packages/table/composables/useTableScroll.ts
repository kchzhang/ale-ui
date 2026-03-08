/**
 * Table 滚动同步模块
 * 处理表头固定、表身滚动、横向滚动同步等逻辑
 * 
 * 注意：此模块仅处理状态管理和计算逻辑
 * 滚动事件由 Scroll 组件处理，滚动控制通过外部传入的滚动控制器实现
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { TableProps } from '../types';

export interface TableScrollState {
  /** 横向滚动位置 */
  scrollLeft: number;
  /** 纵向滚动位置 */
  scrollTop: number;
  /** 是否正在滚动 */
  isScrolling: boolean;
}

/**
 * 滚动控制器接口
 * 用于外部控制滚动行为（由 Scroll 组件提供）
 */
export interface ScrollController {
  scrollTo: (options: { top?: number; left?: number; behavior?: ScrollBehavior }) => void;
  scrollToTop: (behavior?: ScrollBehavior) => void;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  getScrollPosition: () => { scrollTop: number; scrollLeft: number };
  getScrollSize: () => { scrollWidth: number; scrollHeight: number; clientWidth: number; clientHeight: number };
}

export function useTableScroll(
  props: TableProps,
  _tableWrapperRef: Ref<HTMLElement | undefined>,
  headerRef: Ref<HTMLElement | undefined>,
  bodyRef: Ref<HTMLElement | undefined>,
  /** 是否跳过表头同步（当有固定列时） */
  _skipHeaderSync: Ref<boolean> | ComputedRef<boolean> | boolean = false
) {
  void _tableWrapperRef; // 标记为已使用
  void _skipHeaderSync; // 标记为已使用
  // 滚动状态
  const scrollState = ref<TableScrollState>({
    scrollLeft: 0,
    scrollTop: 0,
    isScrolling: false
  });

  // 是否启用固定表头
  const isScrollable = computed(() => {
    return !!(props.height || props.maxHeight);
  });

  // 计算表格高度样式
  const scrollHeightStyle = computed(() => {
    if (!isScrollable.value) return {};

    const style: Record<string, string> = {};
    
    if (props.height) {
      style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
    }
    
    if (props.maxHeight) {
      style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight;
    }

    return style;
  });

  /**
   * 同步表头的横向滚动位置
   */
  const syncHeaderScroll = (scrollLeft: number) => {
    if (headerRef.value) {
      headerRef.value.scrollLeft = scrollLeft;
    }
  };

  /**
   * 设置滚动位置
   * 注意：此方法需要外部滚动控制器配合
   */
  const setScrollPosition = (options: { top?: number; left?: number }, scrollController?: ScrollController) => {
    if (scrollController) {
      scrollController.scrollTo(options);
    } else if (bodyRef.value) {
      // 降级处理：直接操作原生滚动
      if (options.top !== undefined) {
        bodyRef.value.scrollTop = options.top;
      }
      if (options.left !== undefined) {
        bodyRef.value.scrollLeft = options.left;
      }
    }
    
    // 同步表头
    if (options.left !== undefined) {
      syncHeaderScroll(options.left);
    }
  };

  /**
   * 滚动到指定行
   */
  const scrollToRow = (index: number, scrollController?: ScrollController, behavior: ScrollBehavior = 'smooth') => {
    const rowHeight = typeof props.rowHeight === 'number' ? props.rowHeight : 48;
    const targetScrollTop = index * rowHeight;

    if (scrollController) {
      scrollController.scrollTo({ top: targetScrollTop, behavior });
    } else if (bodyRef.value) {
      bodyRef.value.scrollTo({
        top: targetScrollTop,
        behavior
      });
    }
  };

  /**
   * 滚动到顶部
   */
  const scrollToTop = (scrollController?: ScrollController) => {
    if (scrollController) {
      scrollController.scrollToTop();
    } else if (bodyRef.value) {
      bodyRef.value.scrollTop = 0;
    }
  };

  /**
   * 滚动到底部
   */
  const scrollToBottom = (scrollController?: ScrollController) => {
    if (scrollController) {
      scrollController.scrollToBottom();
    } else if (bodyRef.value) {
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight;
    }
  };

  return {
    // 状态
    scrollState,
    isScrollable,
    scrollHeightStyle,
    
    // 方法
    setScrollPosition,
    scrollToRow,
    scrollToTop,
    scrollToBottom,
    syncHeaderScroll
  };
}

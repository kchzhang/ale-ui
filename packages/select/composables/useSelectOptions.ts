import { computed, type Ref } from 'vue';
import type { SelectProps, SelectOption } from '../types';

/**
 * Select 选项管理
 */
export function useSelectOptions(
  props: SelectProps,
  searchQuery: Ref<string>,
  searchError: Ref<Error | null>,
  isSearching: Ref<boolean>,
  selectedValues: Ref<(string | number)[]>
) {
  // 防抖计时器
  let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  // 远程搜索控制器
  let remoteAbortController: AbortController | null = null;

  // 过滤后的选项
  const filteredOptions = computed(() => {
    // 如果有搜索错误，返回空数组
    if (searchError.value) {
      return [];
    }

    // 远程搜索模式下，不过滤本地选项
    if (props.remoteMethod) {
      return props.options || [];
    }

    // 非搜索模式或空搜索词，返回全部选项
    if (!props.filterable || !searchQuery.value.trim()) {
      return props.options || [];
    }

    const query = searchQuery.value.toLowerCase().trim();

    // 使用自定义过滤方法
    if (props.filterMethod) {
      try {
        return (props.options || []).filter(opt =>
          props.filterMethod!(query, opt)
        );
      } catch (error) {
        console.error('过滤方法执行错误:', error);
        return props.options || [];
      }
    }

    // 默认过滤逻辑
    try {
      return (props.options || []).filter(opt => {
        const label = String(opt.label || '').toLowerCase();
        const value = String(opt.value).toLowerCase();
        return label.includes(query) || value.includes(query);
      });
    } catch (error) {
      console.error('过滤选项时出错:', error);
      return props.options || [];
    }
  });

  // 显示的选项（非虚拟滚动）
  const displayOptions = computed(() => filteredOptions.value);

  // 选中的选项
  const selectedOptions = computed(() => {
    return (props.options || []).filter(opt =>
      selectedValues.value.includes(opt.value)
    );
  });

  // 显示的选中标签（多选时考虑折叠）
  const displayedTags = computed(() => {
    if (props.maxCollapseTags && props.maxCollapseTags > 0) {
      return selectedOptions.value.slice(0, props.maxCollapseTags);
    }
    return selectedOptions.value;
  });

  // 折叠的标签数量
  const collapseTagCount = computed(() => {
    if (props.maxCollapseTags && props.maxCollapseTags > 0) {
      return selectedOptions.value.length - props.maxCollapseTags;
    }
    return 0;
  });

  // 远程搜索
  const performRemoteSearch = async (query: string) => {
    if (!props.remoteMethod || !query.trim()) {
      isSearching.value = false;
      return;
    }

    // 取消之前的请求
    if (remoteAbortController) {
      remoteAbortController.abort();
    }
    remoteAbortController = new AbortController();

    isSearching.value = true;
    searchError.value = null;

    try {
      await props.remoteMethod(query);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        searchError.value = error instanceof Error ? error : new Error('搜索失败');
      }
    } finally {
      isSearching.value = false;
    }
  };

  // 防抖搜索
  const debouncedSearch = (query: string, delay: number = 300) => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }
    searchDebounceTimer = setTimeout(() => {
      performRemoteSearch(query);
    }, delay);
  };

  // 清理
  const cleanup = () => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }
    if (remoteAbortController) {
      remoteAbortController.abort();
    }
  };

  return {
    filteredOptions,
    displayOptions,
    selectedOptions,
    displayedTags,
    collapseTagCount,
    debouncedSearch,
    cleanup
  };
}

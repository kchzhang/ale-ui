/**
 * Select 远程搜索逻辑
 */
import { ref } from 'vue';

interface RemoteSearchOptions {
  remoteMethod?: (query: string) => Promise<void>;
}

export function useRemoteSearch(options: RemoteSearchOptions) {
  const { remoteMethod } = options;
  
  const searchError = ref<Error | null>(null);
  const isSearching = ref(false);
  
  // 防抖计时器
  let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  // 远程搜索控制器
  let remoteAbortController: AbortController | null = null;
  
  /**
   * 处理远程搜索
   */
  const handleRemoteSearch = async (
    query: string,
    emit: (event: 'search' | 'search-error', ...args: any[]) => void
  ) => {
    // 清除之前的错误
    searchError.value = null;
    
    // 立即触发 search 事件
    emit('search', query);
    
    // 清除之前的防抖计时器
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }
    
    // 远程搜索 - 300ms 防抖
    if (remoteMethod) {
      isSearching.value = true;
      searchDebounceTimer = setTimeout(async () => {
        try {
          // 取消之前的请求
          if (remoteAbortController) {
            remoteAbortController.abort();
          }
          remoteAbortController = new AbortController();
          
          await remoteMethod(query);
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            return;
          }
          console.error('[Select] 远程搜索失败:', error);
          searchError.value = error instanceof Error ? error : new Error('搜索失败');
          emit('search-error', searchError.value);
        } finally {
          isSearching.value = false;
        }
      }, 300);
    }
  };
  
  /**
   * 清理搜索状态
   */
  const cleanupSearch = () => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = null;
    }
    
    if (remoteAbortController) {
      remoteAbortController.abort();
      remoteAbortController = null;
    }
    
    searchError.value = null;
    isSearching.value = false;
  };
  
  return {
    searchError,
    isSearching,
    handleRemoteSearch,
    cleanupSearch
  };
}

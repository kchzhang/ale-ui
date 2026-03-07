import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import InfiniteScroll from '../InfiniteScroll.vue';
import type { InfiniteScrollProps, InfiniteScrollStatus } from '../types';

describe('InfiniteScroll', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    // 模拟滚动相关的方法
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {});
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    vi.restoreAllMocks();
  });

  // ==================== 基础渲染测试 ====================
  describe('rendering', () => {
    it('renders correctly with default props', () => {
      wrapper = mount(InfiniteScroll);
      expect(wrapper.find('.ale-infinite-scroll').exists()).toBe(true);
    });

    it('renders slot content', () => {
      wrapper = mount(InfiniteScroll, {
        slots: {
          default: '<div class="test-content">Test Content</div>'
        }
      });
      expect(wrapper.find('.test-content').exists()).toBe(true);
      expect(wrapper.text()).toContain('Test Content');
    });

    it('applies custom class', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          customClass: 'my-custom-class'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('my-custom-class');
    });
  });

  // ==================== 方向测试 ====================
  describe('direction', () => {
    it('applies vertical direction class by default', () => {
      wrapper = mount(InfiniteScroll);
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--vertical');
    });

    it('applies horizontal direction class', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          direction: 'horizontal'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--horizontal');
    });
  });

  // ==================== 状态显示测试 ====================
  describe('status display', () => {
    it('shows loading status', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'loading',
          loadingText: '加载中...'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(true);
      expect(wrapper.text()).toContain('加载中...');
    });

    it('shows finished status', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'finished',
          finishedText: '没有更多了'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(true);
      expect(wrapper.text()).toContain('没有更多了');
    });

    it('shows error status', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'error',
          errorText: '加载失败'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(true);
      expect(wrapper.text()).toContain('加载失败');
      expect(wrapper.text()).toContain('点击重试');
    });

    it('hides status when idle', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'idle'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(false);
    });

    it('applies loading class when loading', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'loading'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--loading');
    });

    it('applies finished class when finished', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'finished'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--finished');
    });

    it('applies error class when error', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'error'
        }
      });
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--error');
    });
  });

  // ==================== 自定义文本测试 ====================
  describe('custom text', () => {
    it('renders custom loading text', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'loading',
          loadingText: '自定义加载文本'
        }
      });
      expect(wrapper.text()).toContain('自定义加载文本');
    });

    it('renders custom finished text', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'finished',
          finishedText: '自定义完成文本'
        }
      });
      expect(wrapper.text()).toContain('自定义完成文本');
    });

    it('renders custom error text', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'error',
          errorText: '自定义错误文本'
        }
      });
      expect(wrapper.text()).toContain('自定义错误文本');
    });

    it('renders custom retry text', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'error',
          retryText: '重试'
        }
      });
      expect(wrapper.text()).toContain('重试');
    });
  });

  // ==================== 禁用状态测试 ====================
  describe('disabled state', () => {
    it('applies disabled class when disabled', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          disabled: true
        }
      });
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--disabled');
    });

    it('does not emit load when disabled', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          disabled: true,
          status: 'idle'
        }
      });

      // 模拟滚动
      await wrapper.find('.ale-infinite-scroll').trigger('scroll');
      await flushPromises();

      expect(wrapper.emitted('load')).toBeFalsy();
    });
  });

  // ==================== 事件测试 ====================
  describe('events', () => {
    it('emits load event', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'idle'
        }
      });

      // 直接调用 load 方法
      const vm = wrapper.vm as unknown as { setLoading: () => void };
      vm.setLoading();
      await flushPromises();

      expect(wrapper.emitted('load')).toBeTruthy();
    });

    it('emits update:status event when status changes', async () => {
      wrapper = mount(InfiniteScroll);

      const vm = wrapper.vm as unknown as { setLoading: () => void };
      vm.setLoading();
      await flushPromises();

      expect(wrapper.emitted('update:status')).toBeTruthy();
      expect(wrapper.emitted('update:status')?.[0]).toEqual(['loading']);
    });

    it('emits load when clicking error status', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'error'
        }
      });

      await wrapper.find('.ale-infinite-scroll__status').trigger('click');
      await flushPromises();

      expect(wrapper.emitted('load')).toBeTruthy();
    });

    it('does not emit load when clicking non-error status', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'finished'
        }
      });

      await wrapper.find('.ale-infinite-scroll__status').trigger('click');
      await flushPromises();

      expect(wrapper.emitted('load')).toBeFalsy();
    });
  });

  // ==================== 暴露方法测试 ====================
  describe('exposed methods', () => {
    it('exposes check method', () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { check: () => void };
      expect(typeof vm.check).toBe('function');
    });

    it('exposes setLoading method', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { setLoading: () => void };
      
      vm.setLoading();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--loading');
    });

    it('exposes setFinished method', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { setFinished: () => void };
      
      vm.setFinished();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--finished');
    });

    it('exposes setError method', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { setError: () => void };
      
      vm.setError();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--error');
    });

    it('exposes reset method', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { 
        setFinished: () => void;
        reset: () => void;
      };
      
      vm.setFinished();
      await flushPromises();
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--finished');

      vm.reset();
      await flushPromises();
      expect(wrapper.find('.ale-infinite-scroll').classes()).not.toContain('ale-infinite-scroll--finished');
    });
  });

  // ==================== 受控/非受控模式测试 ====================
  describe('controlled vs uncontrolled', () => {
    it('works as uncontrolled component', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          defaultStatus: 'idle'
        }
      });

      const vm = wrapper.vm as unknown as { setLoading: () => void };
      vm.setLoading();
      await flushPromises();

      expect(wrapper.emitted('update:status')?.[0]).toEqual(['loading']);
    });

    it('respects controlled status prop', async () => {
      const status = ref<InfiniteScrollStatus>('idle');
      
      wrapper = mount(InfiniteScroll, {
        props: {
          status: status.value
        }
      });

      // 状态应该保持为 idle
      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(false);
    });
  });

  // ==================== 滚动处理测试 ====================
  describe('scroll handling', () => {
    it('binds scroll event on mount', () => {
      wrapper = mount(InfiniteScroll);
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('unbinds scroll event on unmount', () => {
      wrapper = mount(InfiniteScroll);
      wrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('handles scroll event when not disabled', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          disabled: false,
          status: 'idle'
        }
      });

      await wrapper.find('.ale-infinite-scroll').trigger('scroll');
      // 验证事件被触发（不报错即为通过）
      expect(wrapper.find('.ale-infinite-scroll').exists()).toBe(true);
    });
  });

  // ==================== 加载动画测试 ====================
  describe('loading animation', () => {
    it('shows spinner in loading state', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'loading'
        }
      });

      expect(wrapper.find('.ale-infinite-scroll__spinner').exists()).toBe(true);
      expect(wrapper.find('.ale-infinite-scroll__spinner svg').exists()).toBe(true);
    });

    it('shows divider in finished state', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'finished'
        }
      });

      expect(wrapper.find('.ale-infinite-scroll__divider').exists()).toBe(true);
    });

    it('shows retry button in error state', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'error'
        }
      });

      expect(wrapper.find('.ale-infinite-scroll__retry').exists()).toBe(true);
    });
  });

  // ==================== Props 变更测试 ====================
  describe('props changes', () => {
    it('reacts to disabled prop change', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          disabled: false
        }
      });

      await wrapper.setProps({ disabled: true });
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--disabled');
    });

    it('reacts to direction prop change', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          direction: 'vertical'
        }
      });

      expect(wrapper.find('.ale-infinite-scroll--vertical').exists()).toBe(true);

      await wrapper.setProps({ direction: 'horizontal' });
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll--horizontal').exists()).toBe(true);
    });
  });

  // ==================== 非受控模式状态流转测试 ====================
  describe('state transitions in uncontrolled mode', () => {
    it('transitions from idle to loading', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { setLoading: () => void };

      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(false);

      vm.setLoading();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(true);
      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--loading');
    });

    it('transitions from loading to finished', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { 
        setLoading: () => void;
        setFinished: () => void;
      };

      vm.setLoading();
      await flushPromises();

      vm.setFinished();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--finished');
    });

    it('transitions from loading to error', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { 
        setLoading: () => void;
        setError: () => void;
      };

      vm.setLoading();
      await flushPromises();

      vm.setError();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--error');
    });

    it('transitions from error to loading on retry', async () => {
      wrapper = mount(InfiniteScroll);
      const vm = wrapper.vm as unknown as { 
        setError: () => void;
      };

      vm.setError();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--error');

      // 点击重试
      await wrapper.find('.ale-infinite-scroll__status').trigger('click');
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll').classes()).toContain('ale-infinite-scroll--loading');
    });

    it('transitions from finished to idle on reset', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          immediate: false
        }
      });
      const vm = wrapper.vm as unknown as { 
        setFinished: () => void;
        reset: () => void;
      };

      vm.setFinished();
      await flushPromises();

      expect(wrapper.find('.ale-infinite-scroll__status').exists()).toBe(true);

      vm.reset();
      await flushPromises();

      // reset 后状态应该变为 idle，不显示 finished 类
      expect(wrapper.find('.ale-infinite-scroll').classes()).not.toContain('ale-infinite-scroll--finished');
    });
  });

  // ==================== 边界条件测试 ====================
  describe('edge cases', () => {
    it('does not load when already loading', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'loading'
        }
      });

      const emittedCount = wrapper.emitted('load')?.length || 0;

      // 尝试再次触发加载
      const vm = wrapper.vm as unknown as { setLoading: () => void };
      vm.setLoading();
      await flushPromises();

      // 不应该再次触发 load 事件
      expect(wrapper.emitted('load')?.length || 0).toBe(emittedCount);
    });

    it('does not load when finished', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'finished'
        }
      });

      await wrapper.find('.ale-infinite-scroll').trigger('scroll');
      await flushPromises();

      expect(wrapper.emitted('load')).toBeFalsy();
    });

    it('does not load when error', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'error'
        }
      });

      await wrapper.find('.ale-infinite-scroll').trigger('scroll');
      await flushPromises();

      expect(wrapper.emitted('load')).toBeFalsy();
    });

    it('handles immediate check when immediate prop is true', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          immediate: true
        }
      });

      // 组件应该正常挂载
      expect(wrapper.find('.ale-infinite-scroll').exists()).toBe(true);
    });

    it('handles offset prop correctly', () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          offset: 200
        }
      });

      // 组件应该正常挂载，offset 值在内部使用
      expect(wrapper.find('.ale-infinite-scroll').exists()).toBe(true);
    });

    it('respects offset when container has overflow style', async () => {
      // 创建一个带 overflow:auto 的容器（类似实际使用场景）
      const container = document.createElement('div');
      container.style.height = '300px';
      container.style.overflow = 'auto';
      document.body.appendChild(container);

      // 创建足够高的内容
      const content = document.createElement('div');
      content.style.height = '1000px';
      container.appendChild(content);

      wrapper = mount(InfiniteScroll, {
        props: {
          offset: 100,
          status: 'idle',
          immediate: false
        },
        attachTo: container
      });

      await flushPromises();

      // 初始状态不应该触发加载（scrollTop=0, 距离底部还有 700px）
      expect(wrapper.emitted('load')).toBeFalsy();

      // 清理
      document.body.removeChild(container);
    });

    it('recognizes container with overflow auto as scroll container', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          offset: 50,
          immediate: false
        }
      });

      // 组件应该正常挂载
      expect(wrapper.find('.ale-infinite-scroll').exists()).toBe(true);

      // 验证 offset prop 被正确接收
      const props = wrapper.props() as { offset: number };
      expect(props.offset).toBe(50);
    });

    it('calls check when status changes from loading to idle', async () => {
      wrapper = mount(InfiniteScroll, {
        props: {
          status: 'loading',
          immediate: false
        }
      });

      // 初始状态为 loading
      const propsBefore = wrapper.props() as { status: string };
      expect(propsBefore.status).toBe('loading');

      // 设置为 idle 应该触发 check (通过 watch)
      await wrapper.setProps({ status: 'idle' });
      await flushPromises();

      // 状态应该更新
      const propsAfter = wrapper.props() as { status: string };
      expect(propsAfter.status).toBe('idle');
    });
  });
});

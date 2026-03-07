import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { useFixedColumnScroll } from '../useFixedColumnScroll';
import type { TableProps, TableColumn } from '../../types';

describe('useFixedColumnScroll', () => {
  const mockColumns: TableColumn[] = [
    { prop: 'id', label: 'ID', fixed: 'left', width: 80 },
    { prop: 'name', label: '姓名', width: 120 },
    { prop: 'age', label: '年龄', fixed: 'right', width: 100 }
  ];

  const mockData = Array(100).fill(null).map((_, i) => ({
    id: i,
    name: `用户${i}`,
    age: 20 + (i % 50)
  }));

  const createMockProps = (overrides = {}): TableProps => ({
    data: mockData,
    columns: mockColumns,
    virtualRowHeight: 48,
    ...overrides
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('基础状态', () => {
    it('应该初始化滚动状态', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      expect(result.isScrolling.value).toBe(false);
      expect(result.isInertialScrolling.value).toBe(false);
      expect(result.scrollVelocity.value).toBe(0);
    });

    it('应该初始化阴影状态', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      expect(result.showLeftShadow.value).toBe(false);
      expect(result.showRightShadow.value).toBe(false);
    });
  });

  describe('阴影状态更新', () => {
    it('应该在滚动时显示左侧阴影', () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      Object.defineProperty(bodyEl, 'scrollLeft', { value: 50, writable: true });
      Object.defineProperty(bodyEl, 'scrollWidth', { value: 1000 });
      Object.defineProperty(bodyEl, 'clientWidth', { value: 500 });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      // 直接调用同步方法
      result.syncShadowStateImmediate();

      expect(result.showLeftShadow.value).toBe(true);
    });

    it('应该在有滚动空间时显示右侧阴影', () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      Object.defineProperty(bodyEl, 'scrollLeft', { value: 0, writable: true });
      Object.defineProperty(bodyEl, 'scrollWidth', { value: 1000 });
      Object.defineProperty(bodyEl, 'clientWidth', { value: 500 });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      result.syncShadowStateImmediate();

      expect(result.showRightShadow.value).toBe(true);
    });

    it('应该在滚动到末尾时隐藏右侧阴影', () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      Object.defineProperty(bodyEl, 'scrollLeft', { value: 498, writable: true });
      Object.defineProperty(bodyEl, 'scrollWidth', { value: 1000 });
      Object.defineProperty(bodyEl, 'clientWidth', { value: 500 });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      result.syncShadowStateImmediate();

      expect(result.showRightShadow.value).toBe(false);
    });
  });

  describe('滚动控制', () => {
    it('应该提供 scrollTo 方法', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      expect(typeof result.scrollTo).toBe('function');
    });

    it('应该提供 doLayout 方法', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      expect(typeof result.doLayout).toBe('function');
    });

    it('应该提供同步方法', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      expect(typeof result.syncShadowStateImmediate).toBe('function');
      expect(typeof result.syncHeaderImmediate).toBe('function');
    });
  });

  describe('滚动状态检测', () => {
    it('应该在滚动开始时设置 isScrolling', () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef, {
        renderDelay: 100
      });

      // 模拟滚动
      result.handleScroll();

      expect(result.isScrolling.value).toBe(true);
    });

    it('应该在滚动结束后清除 isScrolling', async () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      const bodyRef = ref(bodyEl);
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef, {
        renderDelay: 100
      });

      // 模拟滚动
      result.handleScroll();
      expect(result.isScrolling.value).toBe(true);

      // 等待延迟时间
      vi.advanceTimersByTime(150);
      await nextTick();

      expect(result.isScrolling.value).toBe(false);
    });
  });

  describe('配置选项', () => {
    it('应该接受自定义渲染延迟', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef, {
        renderDelay: 300
      });

      expect(result).toBeDefined();
    });

    it('应该接受自定义节流间隔', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef, {
        shadowThrottleMs: 100,
        headerSyncThrottleMs: 32
      });

      expect(result).toBeDefined();
    });

    it('应该支持禁用惯性滚动检测', () => {
      const props = createMockProps();
      const bodyRef = ref(document.createElement('div'));
      const headerRef = ref(document.createElement('div'));

      const result = useFixedColumnScroll(props, bodyRef, headerRef, {
        enableInertialScroll: false
      });

      expect(result).toBeDefined();
    });
  });

  describe('表头同步', () => {
    it('应该同步表头 scrollLeft', () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      const headerEl = document.createElement('div');

      Object.defineProperty(bodyEl, 'scrollLeft', { value: 100, writable: true });
      Object.defineProperty(headerEl, 'scrollLeft', { value: 0, writable: true });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(headerEl);

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      // 调用同步方法
      result.syncHeaderImmediate();

      // 验证表头 scrollLeft 已同步
      expect(headerEl.scrollLeft).toBe(100);
    });

    it('不应该使用 transform 来同步表头', () => {
      const props = createMockProps();
      const bodyEl = document.createElement('div');
      const headerEl = document.createElement('div');

      Object.defineProperty(bodyEl, 'scrollLeft', { value: 100, writable: true });

      const bodyRef = ref(bodyEl);
      const headerRef = ref(headerEl);

      const result = useFixedColumnScroll(props, bodyRef, headerRef);

      // 设置惯性滚动状态
      result.isInertialScrolling.value = true;

      // 调用同步方法
      result.syncHeaderImmediate();

      // 验证没有使用 transform
      expect(headerEl.style.transform).toBe('');
    });
  });
});

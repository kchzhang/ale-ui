/**
 * Split 组件类型定义
 */
import type { Ref } from 'vue';

export type SplitDirection = 'horizontal' | 'vertical';

export interface SplitPanelProps {
  /** 面板初始大小（像素或百分比） */
  size?: string | number;
  /** 最小尺寸（像素） */
  min?: number;
  /** 最大尺寸（像素） */
  max?: number;
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 是否默认折叠 */
  collapsed?: boolean;
  /** 折叠时的尺寸 */
  collapsedSize?: number;
}

export interface SplitPanelEmits {
  (e: 'collapse', collapsed: boolean): void;
  (e: 'resize', size: number): void;
}

export interface SplitProps {
  /** 分割方向 */
  direction?: SplitDirection;
  /** 分割线宽度（像素） */
  splitterSize?: number;
  /** 初始分割比例（第一个面板的百分比，如 30 表示 30%） */
  initialSplit?: number;
  /** 最小分割比例 */
  minSplit?: number;
  /** 最大分割比例 */
  maxSplit?: number;
  /** 是否禁用拖动 */
  disabled?: boolean;
}

export interface SplitEmits {
  (e: 'resize', sizes: number[]): void;
  (e: 'collapse', index: number, collapsed: boolean): void;
}

export interface SplitPanelState {
  id: string;
  size: number;
  min: number;
  max: number;
  collapsible: boolean;
  collapsed: boolean;
  collapsedSize: number;
}

export interface SplitContext {
  direction: SplitDirection;
  registerPanel: (panel: SplitPanelState) => void;
  unregisterPanel: (id: string) => void;
  updatePanelSize: (id: string, size: number) => void;
  togglePanelCollapse: (id: string) => void;
  getPanelIndex: (id: string) => number;
  panels: SplitPanelState[];
  isDragging: Ref<boolean>;
  draggingSplitterIndex: Ref<number>;
  handleSplitterMouseDown: (e: MouseEvent, index: number) => void;
}

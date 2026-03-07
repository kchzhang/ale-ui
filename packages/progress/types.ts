/**
 * Progress 组件类型定义
 */

export type ProgressType = 'line' | 'circle';
export type ProgressStatus = 'success' | 'warning' | 'danger' | '';

export interface ProgressProps {
  /** 当前进度百分比 (0-100) */
  percentage: number;
  /** 进度条类型 */
  type?: ProgressType;
  /** 进度条宽度 (line 类型时为高度，circle 类型时为圆环宽度) */
  strokeWidth?: number;
  /** 是否显示文字 */
  showText?: boolean;
  /** 进度条背景色 */
  color?: string | ProgressColorFunction;
  /** 进度条宽度 (circle 类型时的直径) */
  width?: number;
  /** 进度条状态 */
  status?: ProgressStatus;
  /** 是否显示条纹 */
  striped?: boolean;
  /** 条纹是否流动 */
  stripedFlow?: boolean;
}

export interface ProgressExpose {
  /** 获取当前进度 */
  getPercentage: () => number;
}

export type ProgressColorFunction = (percentage: number) => string;

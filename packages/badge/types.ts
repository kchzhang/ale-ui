export type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'large' | 'medium' | 'small';

export interface BadgeProps {
  /**
   * 显示值
   */
  value?: number | string;
  /**
   * 最大值，超过显示 max+
   */
  max?: number;
  /**
   * 是否显示小圆点
   */
  isDot?: boolean;
  /**
   * 徽标类型
   */
  type?: BadgeType;
  /**
   * 徽标尺寸
   */
  size?: BadgeSize;
  /**
   * 是否隐藏徽标
   */
  hidden?: boolean;
  /**
   * 自定义颜色
   */
  color?: string;
}

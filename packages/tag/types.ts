/**
 * Tag 组件类型定义
 */

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type TagSize = 'large' | 'medium' | 'small';

export interface TagProps {
  /**
   * 标签类型
   */
  type?: TagType;
  /**
   * 标签尺寸
   */
  size?: TagSize;
  /**
   * 是否可关闭
   */
  closable?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否显示边框
   */
  bordered?: boolean;
  /**
   * 是否为圆角标签
   */
  round?: boolean;
  /**
   * 自定义颜色
   */
  color?: string;
  /**
   * 背景色（与 color 不同时使用）
   */
  bgColor?: string;
  /**
   * 图标
   */
  icon?: string;
}

export interface TagEmits {
  /**
   * 关闭标签时触发
   */
  (e: 'close', event: MouseEvent): void;
  /**
   * 点击标签时触发
   */
  (e: 'click', event: MouseEvent): void;
}

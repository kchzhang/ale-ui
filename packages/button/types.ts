export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonType = 'primary' | 'default' | 'danger' | 'success' | 'warning';
export type ButtonTextType = 'confirm' | 'cancel' | 'submit' | 'reset' | 'delete' | 'edit' | 'save' | 'search' | 'filter' | 'export' | 'import';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  nativeType?: 'button' | 'submit' | 'reset';
  /**
   * 使用预设的国际化文本，无需手动传slot
   */
  textType?: ButtonTextType;
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void;
}

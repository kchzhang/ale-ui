export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonType = 'primary' | 'default' | 'danger' | 'success' | 'warning';

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
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void;
}

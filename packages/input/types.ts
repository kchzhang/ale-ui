export type InputSize = 'large' | 'medium' | 'small';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'textarea';

export interface InputProps {
  modelValue?: string | number;
  type?: InputType;
  size?: InputSize;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  clearable?: boolean;
  maxlength?: number;
  minlength?: number;
  showPassword?: boolean;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoResize?: boolean;
  minHeight?: number;
  maxHeight?: number;
  autocomplete?: string;
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'clear'): void;
  (e: 'keyup', event: KeyboardEvent): void;
  (e: 'keydown', event: KeyboardEvent): void;
}

export type CardShadow = 'never' | 'hover' | 'always';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardProps {
  title?: string;
  shadow?: CardShadow;
  bodyStyle?: Record<string, any>;
  headerStyle?: Record<string, any>;
  bordered?: boolean;
  hoverable?: boolean;
  size?: CardSize;
}

export interface CardEmits {
  (e: 'click', event: MouseEvent): void;
}

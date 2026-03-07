// Ale UI 统一入口文件
// 采用 Element UI 风格的导入方式

export { AleButton } from './button';
export type { ButtonProps, ButtonEmits, ButtonSize, ButtonType } from './button';

export { AleBadge } from './badge';
export type { BadgeProps, BadgeSize, BadgeType } from './badge';

export { AleCard } from './card';
export type { CardProps, CardEmits, CardShadow, CardSize } from './card';

// 未来可以添加更多组件的导出
export { AleInput } from './input';
export type { InputProps, InputEmits, InputSize, InputType } from './input';

export { AleSelect, AleOption } from './select';
export type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectSize,
  SelectExpose,
  SelectState,
  OptionProps,
  OptionEmits
} from './select';

export { AleCheckbox, AleCheckboxGroup } from './checkbox';
export type {
  CheckboxProps,
  CheckboxEmits,
  CheckboxSize,
  CheckboxTheme,
  CheckboxValue,
  CheckboxOption,
  CheckboxGroupProps,
  CheckboxGroupEmits
} from './checkbox';

export { Radio as AleRadio, RadioGroup as AleRadioGroup } from './radio';
export type {
  RadioProps,
  RadioEmits,
  RadioSize,
  RadioTheme,
  RadioValue,
  RadioOption,
  RadioGroupProps,
  RadioGroupEmits
} from './radio';

export { Switch as AleSwitch } from './switch';
export type {
  SwitchProps,
  SwitchEmits,
  SwitchSize,
  SwitchTheme
} from './switch';

export { Dialog as AleDialog } from './dialog';
export type {
  DialogProps,
  DialogEmits,
  DialogSize,
  DialogPosition
} from './dialog';

export { Message as AleMessage, MessageComponent } from './message';
export type {
  MessageOptions,
  MessageInstance,
  MessageGlobalMethod,
  MessageType,
  MessagePosition,
  MessageProps
} from './message';

export { Notification, Notification as AleNotification, NotificationComponent } from './notification';
export type {
  NotificationOptions,
  NotificationInstance,
  NotificationGlobalMethod,
  NotificationType,
  NotificationPosition,
  NotificationProps
} from './notification';

export { AleLoading } from './loading';
export type {
  LoadingProps,
  LoadingEmits,
  LoadingSize,
  LoadingType,
  LoadingTheme,
  LoadingInstance,
  LoadingServiceOptions,
  LoadingGlobalMethod
} from './loading';

export { AleTabs, AleTabPane } from './tabs';
export type {
  TabsProps,
  TabsEmits,
  TabsExpose,
  TabsPosition,
  TabsType,
  TabPaneProps,
  TabPaneEmits,
  TabPaneExpose,
  TabPaneState
} from './tabs';

export { Form as AleForm, FormItem as AleFormItem } from './form';
export type {
  FormProps,
  FormEmits,
  FormItemProps,
  FormItemEmits,
  FormLayout,
  LabelPosition,
  FormSize,
  FormRule,
  FormField,
  ValidationResult,
  FormInstance,
  FormItemInstance,
  FormContext
} from './form';

export { AleTag } from './tag';
export type { TagProps, TagEmits, TagSize, TagType } from './tag';

export { AleList } from './list';
export type {
  ListProps,
  ListEmits,
  ListSize,
  ListLayout,
  ListBorderStyle,
  ListItemData,
  ListItemProps,
  ListItemEmits,
  ListExpose
} from './list';

export { AleTable } from './table';
export type {
  TableProps,
  TableEmits,
  TableExpose,
  TableColumn,
  TableData,
  TableSize,
  TableLayout,
  TableAlign,
  SortOrder,
  FilterOption,
  RowState,
  TableSelectionConfig,
  TableScrollConfig,
  SortState,
  FilterState,
  TableContext
} from './table';

export { AlePagination } from './pagination';
export type {
  PaginationProps,
  PaginationEmits,
  PaginationSize,
  PaginationLayout,
  PaginationExpose
} from './pagination';

export { AleInfiniteScroll } from './infinite-scroll';
export type {
  InfiniteScrollProps,
  InfiniteScrollStatus,
  InfiniteScrollDirection,
  InfiniteScrollEvents,
  InfiniteScrollExpose,
  InfiniteScrollState
} from './infinite-scroll';

export { AleTree, AleTreeNode } from './tree';
export type {
  TreeProps,
  TreeEmits,
  TreeExpose,
  TreeData,
  TreeNode,
  TreeOptionProps,
  TreeNodeProps,
  FilterNodeMethodFunction,
  AllowDragFunction,
  AllowDropFunction,
  LoadFunction,
  RenderContentFunction,
  DropType,
} from './tree';

export { AleScroll } from './scroll';
export type {
  ScrollProps,
  ScrollEmits,
  ScrollExpose,
  ScrollTheme,
  ScrollSize,
  ScrollDirection,
  ScrollBehavior,
  ScrollPosition,
  ScrollSizeInfo,
  ScrollState
} from './scroll';

export { Cascader as AleCascader } from './cascader';
export type {
  CascaderOption,
  CascaderSize,
  CascaderProps,
  CascaderEmits,
  CascaderExpose,
  CascaderState,
  CascaderNodeContext
} from './cascader';

export { AleUpload } from './upload';
export type {
  UploadFile,
  UploadProps,
  UploadEmits,
  UploadSize,
  UploadListType,
  UploadStatus,
  UploadRequestOptions,
  UploadExpose
} from './upload';

export { AleProgress } from './progress';
export type {
  ProgressProps,
  ProgressExpose,
  ProgressType,
  ProgressStatus,
  ProgressColorFunction
} from './progress';

export { AleTimePicker } from './time-picker';
export type {
  TimePickerProps,
  TimePickerEmits,
  TimePickerSize,
  TimePickerTheme,
  TimePickerExpose
} from './time-picker';

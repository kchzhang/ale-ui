// Ale UI 统一入口文件
// 采用 Element UI 风格的导入方式

import { AleButton } from './button';
export { AleButton };
export type { ButtonProps, ButtonEmits, ButtonSize, ButtonType, ButtonTextType } from './button';

import { AleBadge } from './badge';
export { AleBadge };
export type { BadgeProps, BadgeSize, BadgeType } from './badge';

import { AleCard } from './card';
export { AleCard };
export type { CardProps, CardEmits, CardShadow, CardSize } from './card';

// 未来可以添加更多组件的导出
import { AleInput } from './input';
export { AleInput };
export type { InputProps, InputEmits, InputSize, InputType } from './input';

import { AleSelect, AleOption } from './select';
export { AleSelect, AleOption };
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

import { AleCheckbox, AleCheckboxGroup } from './checkbox';
export { AleCheckbox, AleCheckboxGroup };
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

import { Radio as AleRadio, RadioGroup as AleRadioGroup } from './radio';
export { AleRadio, AleRadioGroup };
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

import { Switch as AleSwitch } from './switch';
export { AleSwitch };
export type {
  SwitchProps,
  SwitchEmits,
  SwitchSize,
  SwitchTheme
} from './switch';

import { Dialog as AleDialog } from './dialog';
export { AleDialog };
export type {
  DialogProps,
  DialogEmits,
  DialogSize,
  DialogPosition
} from './dialog';

import { Message as AleMessage, MessageComponent } from './message';
export { AleMessage, MessageComponent };
export type {
  MessageOptions,
  MessageInstance,
  MessageGlobalMethod,
  MessageType,
  MessagePosition,
  MessageProps
} from './message';

import { Notification, Notification as AleNotification, NotificationComponent } from './notification';
export { Notification, AleNotification, NotificationComponent };
export type {
  NotificationOptions,
  NotificationInstance,
  NotificationGlobalMethod,
  NotificationType,
  NotificationPosition,
  NotificationProps
} from './notification';

import { AleLoading } from './loading';
export { AleLoading };
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

import { AleTabs, AleTabPane } from './tabs';
export { AleTabs, AleTabPane };
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

import { Form as AleForm, FormItem as AleFormItem } from './form';
export { AleForm, AleFormItem };
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

import { AleTag } from './tag';
export { AleTag };
export type { TagProps, TagEmits, TagSize, TagType } from './tag';

import { AleList } from './list';
export { AleList };
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

import { AleTable } from './table';
export { AleTable };
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

import { AlePagination } from './pagination';
export { AlePagination };
export type {
  PaginationProps,
  PaginationEmits,
  PaginationSize,
  PaginationLayout,
  PaginationExpose
} from './pagination';

import { AleInfiniteScroll } from './infinite-scroll';
export { AleInfiniteScroll };
export type {
  InfiniteScrollProps,
  InfiniteScrollStatus,
  InfiniteScrollDirection,
  InfiniteScrollEvents,
  InfiniteScrollExpose,
  InfiniteScrollState
} from './infinite-scroll';

import { AleTree, AleTreeNode } from './tree';
export { AleTree, AleTreeNode };
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

import { AleScroll } from './scroll';
export { AleScroll };
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

import { Cascader as AleCascader } from './cascader';
export { AleCascader };
export type {
  CascaderOption,
  CascaderSize,
  CascaderProps,
  CascaderEmits,
  CascaderExpose,
  CascaderState,
  CascaderNodeContext
} from './cascader';

import { AleUpload } from './upload';
export { AleUpload };
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

import { AleProgress } from './progress';
export { AleProgress };
export type {
  ProgressProps,
  ProgressExpose,
  ProgressType,
  ProgressStatus,
  ProgressColorFunction
} from './progress';

import { AleTimePicker } from './time-picker';
export { AleTimePicker };
export type {
  TimePickerProps,
  TimePickerEmits,
  TimePickerSize,
  TimePickerTheme,
  TimePickerExpose
} from './time-picker';

import { AleDatePicker } from './date-picker';
export { AleDatePicker };
export type {
  DatePickerProps,
  DatePickerEmits,
  DatePickerSize,
  DatePickerTheme,
  DatePickerView,
  ShortcutItem,
  DatePickerExpose
} from './date-picker';

export { DateTimePicker as AleDateTimePicker } from './datetime-picker';
export type {
  DateTimePickerProps,
  DateTimePickerEmits,
  DateTimePickerSize,
  DateTimePickerTheme,
  DateTimePickerExpose
} from './datetime-picker';

import { AleSplit, AleSplitPanel } from './split';
export { AleSplit, AleSplitPanel } from './split';
export type {
  SplitProps,
  SplitEmits,
  SplitPanelProps,
  SplitPanelEmits,
  SplitDirection,
  SplitPanelState,
  SplitContext
} from './split';

// 国际化导出
export {
  zhCN,
  zhTW,
  zhHK,
  enUS,
  locales,
  useLocale,
  provideLocale
} from './locale';
export type { AleUILocale, LocaleCode } from './locale';

import type { App } from 'vue';
import { ref } from 'vue';
import { provideLocale, zhCN } from './locale';
import type { AleUILocale } from './locale';

// 所有组件列表
const components = [
  AleButton,
  AleBadge,
  AleCard,
  AleInput,
  AleSelect,
  AleOption,
  AleCheckbox,
  AleCheckboxGroup,
  AleRadio,
  AleRadioGroup,
  AleSwitch,
  AleDialog,
  AleMessage,
  AleNotification,
  AleLoading,
  AleTabs,
  AleTabPane,
  AleForm,
  AleFormItem,
  AleTag,
  AleList,
  AleTable,
  AlePagination,
  AleInfiniteScroll,
  AleTree,
  AleTreeNode,
  AleScroll,
  AleCascader,
  AleUpload,
  AleProgress,
  AleTimePicker,
  AleDatePicker,
  AleSplit,
  AleSplitPanel
];

// 组件库安装函数
export default {
  install(app: App, options?: { locale?: AleUILocale }) {
    // 提供语言配置
    const locale = ref(options?.locale || zhCN);
    provideLocale(locale);

    // 注册所有组件
    components.forEach(component => {
      if (component.name) {
        app.component(component.name, component);
      }
    });

    // 全局挂载方法
    app.config.globalProperties.$message = AleMessage;
    app.config.globalProperties.$notify = AleNotification;
    app.config.globalProperties.$loading = AleLoading;
  }
};

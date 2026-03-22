/**
 * Upload 组件类型定义
 */

export type UploadSize = 'small' | 'medium' | 'large';

export type UploadListType = 'text' | 'picture' | 'picture-card';

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  uid: string | number;
  name: string;
  size?: number;
  url?: string;
  status?: UploadStatus;
  percentage?: number;
  raw?: File;
  response?: any;
  error?: Error | string;
}

export interface UploadProps {
  /** 上传的文件列表（受控模式） */
  modelValue?: UploadFile[];
  /** 上传的地址 */
  action?: string;
  /** 设置上传的请求头部 */
  headers?: Record<string, string>;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 上传时附带的额外参数 */
  data?: Record<string, any>;
  /** 上传的文件字段名 */
  name?: string;
  /** 是否启用拖拽上传 */
  drag?: boolean;
  /** 拖拽提示文本 */
  dragTip?: string;
  /** 上传按钮文本 */
  buttonText?: string;
  /** 接受上传的文件类型 */
  accept?: string;
  /** 最大允许上传个数 */
  limit?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: UploadSize;
  /** 文件列表的类型 */
  listType?: UploadListType;
  /** 是否显示文件列表 */
  showFileList?: boolean;
  /** 上传文件之前的钩子，返回 false 则停止上传 */
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  /** 文件超出个数限制时的钩子 */
  onExceed?: (files: File[], fileList: UploadFile[]) => void;
  /** 上传文件时触发的事件钩子 */
  httpRequest?: (options: UploadRequestOptions) => Promise<any>;
  /** 自动上传 */
  autoUpload?: boolean;
}

export interface UploadRequestOptions {
  file: File;
  onProgress: (percent: number) => void;
  onSuccess: (response: any) => void;
  onError: (error: Error) => void;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  action: string;
  filename: string;
}

export interface UploadEmits {
  (e: 'update:modelValue', fileList: UploadFile[]): void;
  (e: 'change', file: UploadFile, fileList: UploadFile[]): void;
  (e: 'success', response: any, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'error', error: Error, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'progress', event: { percent: number }, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'remove', file: UploadFile, fileList: UploadFile[]): void;
  (e: 'exceed', files: File[], fileList: UploadFile[]): void;
  (e: 'preview', file: UploadFile): void;
}

export interface UploadExpose {
  submit: () => void;
  clearFiles: () => void;
  abort: (file?: UploadFile) => void;
}

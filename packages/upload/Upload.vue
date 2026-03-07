<template>
  <div :class="uploadClass">
    <input
      ref="inputRef"
      type="file"
      class="ale-upload__input"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleInputChange"
    />

    <!-- 拖拽上传区域 -->
    <div
      v-if="drag"
      class="ale-upload-dragger"
      :class="{ 'is-dragover': isDragover }"
      @click="handleClick"
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragover"
      @dragleave.prevent="handleDragleave"
    >
      <svg class="ale-upload-dragger__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17,8 12,3 7,8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <div class="ale-upload-dragger__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div v-if="tip" class="ale-upload-dragger__hint">{{ tip }}</div>
    </div>

    <!-- 点击上传触发器 -->
    <div v-else class="ale-upload__trigger" @click="handleClick">
      <slot>
        <!-- 照片墙模式：显示加号图标 -->
        <template v-if="listType === 'picture-card'">
          <svg class="ale-upload__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </template>
        <!-- 默认模式：显示按钮 -->
        <template v-else>
          <AleButton type="primary" :disabled="disabled">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>{{ buttonText }}</span>
          </AleButton>
        </template>
      </slot>
      <div v-if="tip && listType !== 'picture-card'" class="ale-upload__tip">{{ tip }}</div>
    </div>

    <!-- 文件列表 -->
    <ul v-if="showFileList && fileList.length > 0" :class="fileListClass">
      <li
        v-for="file in fileList"
        :key="file.uid"
        :class="fileItemClass(file)"
      >
        <!-- Picture Card 模式 -->
        <template v-if="listType === 'picture-card'">
          <img
            v-if="isImageFile(file) && (file.url || file.raw)"
            :src="file.url || getFileUrl(file.raw!)"
            class="ale-upload-list__item-thumbnail"
            :alt="file.name"
          />
          <div v-else class="ale-upload-list__item-thumbnail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div class="ale-upload-list__item-actions">
            <span v-if="file.status !== 'uploading'" class="ale-upload-list__item-action" @click="handlePreview(file)">
              <svg class="ale-upload-list__item-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <span class="ale-upload-list__item-action" @click="handleRemove(file)">
              <svg class="ale-upload-list__item-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </span>
          </div>
        </template>

        <!-- Picture 模式 -->
        <template v-else-if="listType === 'picture'">
          <div class="ale-upload-list__item-thumbnail">
            <img
              v-if="isImageFile(file) && (file.url || file.raw)"
              :src="file.url || getFileUrl(file.raw!)"
              :alt="file.name"
            />
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div class="ale-upload-list__item-info">
            <span class="ale-upload-list__item-name" @click="handlePreview(file)">{{ file.name }}</span>
          </div>
          <span v-if="file.status === 'success'" class="ale-upload-list__item-status">
            <svg class="ale-upload-list__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <div class="ale-upload-list__item-actions">
            <span class="ale-upload-list__item-action" @click="handleRemove(file)">
              <svg class="ale-upload-list__item-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </div>
        </template>

        <!-- Text 模式（默认） -->
        <template v-else>
          <svg class="ale-upload-list__item-thumbnail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <div class="ale-upload-list__item-info">
            <span class="ale-upload-list__item-name" @click="handlePreview(file)">{{ file.name }}</span>
          </div>
          <span v-if="file.status === 'success'" class="ale-upload-list__item-status">
            <svg class="ale-upload-list__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <div class="ale-upload-list__item-actions">
            <span class="ale-upload-list__item-action" @click="handleRemove(file)">
              <svg class="ale-upload-list__item-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { UploadProps, UploadEmits, UploadFile, UploadExpose } from './types';
import { AleButton } from '../button';
import './Upload.css';

const props = withDefaults(defineProps<UploadProps>(), {
  modelValue: () => [],
  action: '',
  multiple: false,
  name: 'file',
  drag: false,
  accept: '',
  limit: 0,
  disabled: false,
  size: 'medium',
  listType: 'text',
  showFileList: true,
  autoUpload: true
});

const emit = defineEmits<UploadEmits>();

const inputRef = ref<HTMLInputElement>();
const isDragover = ref(false);
const reqs = ref<Map<string | number, XMLHttpRequest>>(new Map());

// 内部文件列表
const fileList = ref<UploadFile[]>([...props.modelValue]);

// 提示文本
const tip = computed(() => {
  if (props.limit > 0) {
    return `最多上传 ${props.limit} 个文件`;
  }
  return '';
});

// 按钮文本
const buttonText = computed(() => {
  return props.multiple ? '点击上传' : '上传文件';
});

// 组件样式类
const uploadClass = computed(() => [
  'ale-upload',
  `ale-upload--${props.size}`,
  `ale-upload--${props.listType}`,
  {
    'ale-upload--disabled': props.disabled,
    'ale-upload--dragging': isDragover.value
  }
]);

// 文件列表样式类
const fileListClass = computed(() => [
  'ale-upload-list',
  `ale-upload-list--${props.listType}`
]);

// 文件项样式类
const fileItemClass = (file: UploadFile) => [
  'ale-upload-list__item',
  {
    'is-success': file.status === 'success',
    'is-error': file.status === 'error',
    'is-uploading': file.status === 'uploading'
  }
];

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    fileList.value = [...newVal];
  },
  { deep: true }
);

// 生成唯一 ID
const generateUid = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// 获取文件 URL
const getFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

// 判断是否为图片文件
const isImageFile = (file: UploadFile): boolean => {
  if (file.raw) {
    return file.raw.type.startsWith('image/');
  }
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext);
};

// 点击触发上传
const handleClick = () => {
  if (props.disabled) return;
  inputRef.value?.click();
};

// 文件选择变化
const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    uploadFiles(Array.from(files));
  }
  target.value = '';
};

// 拖拽进入
const handleDragover = () => {
  if (props.disabled) return;
  isDragover.value = true;
};

// 拖拽离开
const handleDragleave = () => {
  isDragover.value = false;
};

// 拖拽放下
const handleDrop = (event: DragEvent) => {
  if (props.disabled) return;
  isDragover.value = false;

  const files = event.dataTransfer?.files;
  if (files) {
    uploadFiles(Array.from(files));
  }
};

// 上传文件
const uploadFiles = async (files: File[]) => {
  if (props.limit > 0 && fileList.value.length + files.length > props.limit) {
    if (props.onExceed) {
      props.onExceed(files, fileList.value);
    }
    emit('exceed', files, fileList.value);
    return;
  }

  for (const file of files) {
    const uploadFile: UploadFile = {
      uid: generateUid(),
      name: file.name,
      size: file.size,
      raw: file,
      status: 'ready',
      percentage: 0
    };

    fileList.value.push(uploadFile);

    if (props.autoUpload) {
      await upload(uploadFile);
    }
  }
};

// 上传单个文件
const upload = async (uploadFile: UploadFile) => {
  if (!uploadFile.raw) return;

  // 执行 beforeUpload 钩子
  if (props.beforeUpload) {
    try {
      const result = await props.beforeUpload(uploadFile.raw);
      if (result === false) {
        handleRemove(uploadFile);
        return;
      }
    } catch (error) {
      handleRemove(uploadFile);
      return;
    }
  }

  uploadFile.status = 'uploading';

  if (props.httpRequest) {
    // 自定义上传方法
    try {
      const response = await props.httpRequest({
        file: uploadFile.raw,
        onProgress: (percent) => {
          uploadFile.percentage = percent;
          emit('progress', { percent }, uploadFile, fileList.value);
        },
        onSuccess: (res) => {
          uploadFile.status = 'success';
          uploadFile.response = res;
          emit('success', res, uploadFile, fileList.value);
          emit('change', uploadFile, fileList.value);
          emit('update:modelValue', fileList.value);
        },
        onError: (error) => {
          uploadFile.status = 'error';
          uploadFile.error = error.message;
          emit('error', error, uploadFile, fileList.value);
          emit('change', uploadFile, fileList.value);
        },
        action: props.action,
        filename: props.name,
        data: props.data,
        headers: props.headers
      });
      uploadFile.status = 'success';
      uploadFile.response = response;
      emit('success', response, uploadFile, fileList.value);
      emit('change', uploadFile, fileList.value);
      emit('update:modelValue', fileList.value);
    } catch (error: any) {
      uploadFile.status = 'error';
      uploadFile.error = error.message;
      emit('error', error, uploadFile, fileList.value);
      emit('change', uploadFile, fileList.value);
    }
  } else if (props.action) {
    // 默认上传方法
    defaultUpload(uploadFile);
  } else {
    // 没有 action 且没有 httpRequest，直接成功
    setTimeout(() => {
      uploadFile.status = 'success';
      uploadFile.percentage = 100;
      emit('success', null, uploadFile, fileList.value);
      emit('change', uploadFile, fileList.value);
      emit('update:modelValue', fileList.value);
    }, 500);
  }
};

// 默认上传方法
const defaultUpload = (uploadFile: UploadFile) => {
  if (!uploadFile.raw) return;

  const xhr = new XMLHttpRequest();
  const formData = new FormData();

  formData.append(props.name, uploadFile.raw);

  if (props.data) {
    Object.keys(props.data).forEach((key) => {
      formData.append(key, props.data![key]);
    });
  }

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);
      uploadFile.percentage = percent;
      emit('progress', { percent }, uploadFile, fileList.value);
    }
  };

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      uploadFile.status = 'success';
      uploadFile.percentage = 100;
      try {
        uploadFile.response = JSON.parse(xhr.responseText);
      } catch {
        uploadFile.response = xhr.responseText;
      }
      emit('success', uploadFile.response, uploadFile, fileList.value);
      emit('change', uploadFile, fileList.value);
      emit('update:modelValue', fileList.value);
    } else {
      uploadFile.status = 'error';
      uploadFile.error = `上传失败: ${xhr.status}`;
      emit('error', new Error(uploadFile.error), uploadFile, fileList.value);
      emit('change', uploadFile, fileList.value);
    }
    reqs.value.delete(uploadFile.uid);
  };

  xhr.onerror = () => {
    uploadFile.status = 'error';
    uploadFile.error = '网络错误';
    emit('error', new Error(uploadFile.error), uploadFile, fileList.value);
    emit('change', uploadFile, fileList.value);
    reqs.value.delete(uploadFile.uid);
  };

  xhr.open('POST', props.action, true);

  if (props.headers) {
    Object.keys(props.headers).forEach((key) => {
      const headerValue = props.headers![key];
      if (typeof headerValue === 'string') {
        xhr.setRequestHeader(key, headerValue);
      }
    });
  }

  xhr.withCredentials = true;
  xhr.send(formData);
  reqs.value.set(uploadFile.uid, xhr);
};

// 预览文件
const handlePreview = (file: UploadFile) => {
  emit('preview', file);
};

// 移除文件
const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex((item) => item.uid === file.uid);
  if (index > -1) {
    fileList.value.splice(index, 1);
    emit('remove', file, fileList.value);
    emit('update:modelValue', fileList.value);
  }
};

// 手动提交上传
const submit = () => {
  fileList.value
    .filter((file) => file.status === 'ready')
    .forEach((file) => upload(file));
};

// 清空文件列表
const clearFiles = () => {
  fileList.value = [];
  emit('update:modelValue', []);
};

// 取消上传
const abort = (file?: UploadFile) => {
  if (file) {
    const xhr = reqs.value.get(file.uid);
    if (xhr) {
      xhr.abort();
      reqs.value.delete(file.uid);
    }
  } else {
    reqs.value.forEach((xhr) => xhr.abort());
    reqs.value.clear();
  }
};

defineExpose<UploadExpose>({
  submit,
  clearFiles,
  abort
});
</script>

<style scoped>
.ale-upload__tip {
  margin-top: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>

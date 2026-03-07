<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Upload 上传</h1>
      <p class="component-demo-view__description">
        通过点击或者拖拽上传文件
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleUpload
          v-model="basicFiles"
          action="/api/upload"
          @success="handleSuccess"
          @error="handleError"
        >
          <template #default>
            <AleButton type="primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17,8 12,3 7,8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              点击上传
            </AleButton>
          </template>
        </AleUpload>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 拖拽上传 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">拖拽上传</h2>
      <div class="component-demo-view__demo">
        <AleUpload
          v-model="dragFiles"
          drag
          action="/api/upload"
          @success="handleSuccess"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dragCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 照片墙 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">照片墙</h2>
      <div class="component-demo-view__demo">
        <AleUpload
          v-model="pictureCardFiles"
          action="/api/upload"
          list-type="picture-card"
          :on-preview="handlePreview"
          @success="handleSuccess"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="pictureCardCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 图片列表缩略图 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">图片列表缩略图</h2>
      <div class="component-demo-view__demo">
        <AleUpload
          v-model="pictureFiles"
          action="/api/upload"
          list-type="picture"
          @success="handleSuccess"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="pictureCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文件限制 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文件限制</h2>
      <div class="component-demo-view__demo">
        <AleUpload
          v-model="limitFiles"
          action="/api/upload"
          :limit="3"
          @exceed="handleExceed"
          @success="handleSuccess"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="limitCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 手动上传 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">手动上传</h2>
      <div class="component-demo-view__demo">
        <AleUpload
          ref="manualUploadRef"
          v-model="manualFiles"
          :auto-upload="false"
          action="/api/upload"
          @success="handleSuccess"
        />
        <div style="margin-top: 16px;">
          <AleButton type="primary" @click="submitUpload">
            开始上传
          </AleButton>
          <AleButton style="margin-left: 8px;" @click="clearFiles">
            清空文件
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="manualCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义上传 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义上传</h2>
      <div class="component-demo-view__demo">
        <AleUpload
          v-model="customFiles"
          :http-request="customRequest"
          @success="handleSuccess"
        />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleUpload disabled />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <div style="margin-bottom: 16px;">
          <span style="margin-right: 8px; color: var(--color-text-secondary);">Small:</span>
          <AleUpload size="small" drag />
        </div>
        <div style="margin-bottom: 16px;">
          <span style="margin-right: 8px; color: var(--color-text-secondary);">Medium:</span>
          <AleUpload size="medium" drag />
        </div>
        <div>
          <span style="margin-right: 8px; color: var(--color-text-secondary);">Large:</span>
          <AleUpload size="large" drag />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload, AleButton } from 'ale-ui';
import type { UploadFile, UploadExpose, UploadRequestOptions } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础用法
const basicFiles = ref<UploadFile[]>([]);

// 拖拽上传
const dragFiles = ref<UploadFile[]>([]);

// 照片墙
const pictureCardFiles = ref<UploadFile[]>([]);

// 图片列表
const pictureFiles = ref<UploadFile[]>([]);

// 文件限制
const limitFiles = ref<UploadFile[]>([]);

// 手动上传
const manualFiles = ref<UploadFile[]>([]);
const manualUploadRef = ref<UploadExpose>();

// 自定义上传
const customFiles = ref<UploadFile[]>([]);

// 事件处理
const handleSuccess = (response: any, file: UploadFile, fileList: UploadFile[]) => {
  console.log('上传成功:', { response, file, fileList });
};

const handleError = (error: Error, file: UploadFile, fileList: UploadFile[]) => {
  console.error('上传失败:', { error, file, fileList });
};

const handlePreview = (file: UploadFile) => {
  console.log('预览文件:', file);
  if (file.url) {
    window.open(file.url, '_blank');
  }
};

const handleExceed = (files: File[], fileList: UploadFile[]) => {
  console.warn(`超出文件限制，当前限制 3 个文件，已选择 ${files.length} 个文件，共 ${fileList.length + files.length} 个文件`);
};

const submitUpload = () => {
  manualUploadRef.value?.submit();
};

const clearFiles = () => {
  manualUploadRef.value?.clearFiles();
};

// 自定义上传请求
const customRequest = async (options: UploadRequestOptions) => {
  const { onProgress, onSuccess } = options;

  // 模拟上传进度
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    onProgress(progress);
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 200);

  // 模拟上传请求
  return new Promise((resolve) => {
    setTimeout(() => {
      onSuccess({ data: { url: 'https://example.com/uploaded-file.jpg' } });
      resolve({ data: { url: 'https://example.com/uploaded-file.jpg' } });
    }, 2000);
  });
};

// 代码示例
const basicCode = `<template>
  <AleUpload
    v-model="files"
    action="/api/upload"
    @success="handleSuccess"
  >
    <template #default>
      <AleButton type="primary">点击上传</AleButton>
    </template>
  </AleUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload, AleButton } from 'ale-ui';
import type { UploadFile } from 'ale-ui';

const files = ref<UploadFile[]>([]);
<\/script>`;

const dragCode = `<template>
  <AleUpload
    v-model="files"
    drag
    action="/api/upload"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload } from 'ale-ui';
import type { UploadFile } from 'ale-ui';

const files = ref<UploadFile[]>([]);
<\/script>`;

const pictureCardCode = `<template>
  <AleUpload
    v-model="files"
    action="/api/upload"
    list-type="picture-card"
    :on-preview="handlePreview"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload } from 'ale-ui';
import type { UploadFile } from 'ale-ui';

const files = ref<UploadFile[]>([]);

const handlePreview = (file: UploadFile) => {
  if (file.url) {
    window.open(file.url, '_blank');
  }
};
<\/script>`;

const pictureCode = `<template>
  <AleUpload
    v-model="files"
    action="/api/upload"
    list-type="picture"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload } from 'ale-ui';
import type { UploadFile } from 'ale-ui';

const files = ref<UploadFile[]>([]);
<\/script>`;

const limitCode = `<template>
  <AleUpload
    v-model="files"
    action="/api/upload"
    :limit="3"
    @exceed="handleExceed"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload } from 'ale-ui';
import type { UploadFile } from 'ale-ui';

const files = ref<UploadFile[]>([]);

const handleExceed = (files: File[], fileList: UploadFile[]) => {
  console.warn('超出文件数量限制');
};
<\/script>`;

const manualCode = `<template>
  <AleUpload
    ref="uploadRef"
    v-model="files"
    :auto-upload="false"
    action="/api/upload"
    @success="handleSuccess"
  />
  <AleButton type="primary" @click="submitUpload">开始上传</AleButton>
  <AleButton @click="clearFiles">清空文件</AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload, AleButton } from 'ale-ui';
import type { UploadFile, UploadExpose } from 'ale-ui';

const files = ref<UploadFile[]>([]);
const uploadRef = ref<UploadExpose>();

const submitUpload = () => {
  uploadRef.value?.submit();
};

const clearFiles = () => {
  uploadRef.value?.clearFiles();
};
<\/script>`;

const customCode = `<template>
  <AleUpload
    v-model="files"
    :http-request="customRequest"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleUpload } from 'ale-ui';
import type { UploadFile, UploadRequestOptions } from 'ale-ui';

const files = ref<UploadFile[]>([]);

const customRequest = async (options: UploadRequestOptions) => {
  const { file, onProgress, onSuccess, onError } = options;

  // 自定义上传逻辑
  // 例如：上传到 OSS、S3 等
  
  onProgress(50); // 更新进度
  const result = await fetch('/api/upload', {
    method: 'POST',
    body: file
  });
  onSuccess(result); // 上传成功
  
  return result;
};
<\/script>`;

const disabledCode = `<template>
  <AleUpload disabled />
</template>`;

const sizeCode = `<template>
  <AleUpload size="small" drag />
  <AleUpload size="medium" drag />
  <AleUpload size="large" drag />
</template>`;
</script>

<style scoped>
.component-demo-view {
  max-width: 1000px;
  margin: 0 auto;
}

.component-demo-view__header {
  margin-bottom: 48px;
}

.component-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.component-demo-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.component-demo-view__section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.component-demo-view__section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.component-demo-view__code {
  margin-top: 24px;
}
</style>

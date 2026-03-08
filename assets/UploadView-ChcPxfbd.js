import{B as e,C as t,K as n,M as r,S as i,W as a,g as o,i as s,x as c,y as l}from"./index-B3Jx3uix.js";import{t as u}from"./button-GOPf8Q2w.js";import{t as d}from"./upload-CATY-75q.js";import{t as f}from"./CodeBlock-CE4Cu_o1.js";var ee={class:`component-demo-view`},te={class:`component-demo-view__section`},ne={class:`component-demo-view__demo`},p={class:`component-demo-view__code`},m={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},re={class:`component-demo-view__code`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},g={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`},y={class:`component-demo-view__code`},b={class:`component-demo-view__section`},x={class:`component-demo-view__demo`},S={class:`component-demo-view__code`},C={class:`component-demo-view__section`},w={class:`component-demo-view__demo`},T={style:{"margin-top":`16px`}},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},oe={style:{"margin-bottom":`16px`}},F={style:{"margin-bottom":`16px`}},I={class:`component-demo-view__code`},L=`<template>
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
<\/script>`,R=`<template>
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
<\/script>`,z=`<template>
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
<\/script>`,B=`<template>
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
<\/script>`,V=`<template>
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
<\/script>`,H=`<template>
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
<\/script>`,U=`<template>
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
<\/script>`,W=`<template>
  <AleUpload disabled />
</template>`,G=`<template>
  <AleUpload size="small" drag />
  <AleUpload size="medium" drag />
  <AleUpload size="large" drag />
</template>`,K=s(t({__name:`UploadView`,setup(t){let s=a([]),K=a([]),q=a([]),J=a([]),Y=a([]),X=a([]),Z=a(),Q=a([]),$=(e,t,n)=>{console.log(`上传成功:`,{response:e,file:t,fileList:n})},se=(e,t,n)=>{console.error(`上传失败:`,{error:e,file:t,fileList:n})},ce=e=>{console.log(`预览文件:`,e),e.url&&window.open(e.url,`_blank`)},le=(e,t)=>{console.warn(`超出文件限制，当前限制 3 个文件，已选择 ${e.length} 个文件，共 ${t.length+e.length} 个文件`)},ue=()=>{Z.value?.submit()},de=()=>{Z.value?.clearFiles()},fe=async e=>{let{onProgress:t,onSuccess:n}=e,r=0,i=setInterval(()=>{r+=10,t(r),r>=100&&clearInterval(i)},200);return new Promise(e=>{setTimeout(()=>{n({data:{url:`https://example.com/uploaded-file.jpg`}}),e({data:{url:`https://example.com/uploaded-file.jpg`}})},2e3)})};return(t,a)=>(r(),l(`div`,ee,[a[22]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Upload 上传`),o(`p`,{class:`component-demo-view__description`},` 通过点击或者拖拽上传文件 `)],-1),o(`section`,te,[a[8]||=o(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),o(`div`,ne,[i(n(d),{modelValue:s.value,"onUpdate:modelValue":a[0]||=e=>s.value=e,action:`/api/upload`,onSuccess:$,onError:se},{default:e(()=>[i(n(u),{type:`primary`},{default:e(()=>[...a[7]||=[o(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},[o(`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}),o(`polyline`,{points:`17,8 12,3 7,8`}),o(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})],-1),c(` 点击上传 `,-1)]]),_:1})]),_:1},8,[`modelValue`])]),o(`div`,p,[i(f,{code:L,language:`vue`,title:`示例代码`})])]),o(`section`,m,[a[9]||=o(`h2`,{class:`component-demo-view__section-title`},`拖拽上传`,-1),o(`div`,h,[i(n(d),{modelValue:K.value,"onUpdate:modelValue":a[1]||=e=>K.value=e,drag:``,action:`/api/upload`,onSuccess:$},null,8,[`modelValue`])]),o(`div`,re,[i(f,{code:R,language:`vue`,title:`示例代码`})])]),o(`section`,ie,[a[10]||=o(`h2`,{class:`component-demo-view__section-title`},`照片墙`,-1),o(`div`,ae,[i(n(d),{modelValue:q.value,"onUpdate:modelValue":a[2]||=e=>q.value=e,action:`/api/upload`,"list-type":`picture-card`,"on-preview":ce,onSuccess:$},null,8,[`modelValue`])]),o(`div`,g,[i(f,{code:z,language:`vue`,title:`示例代码`})])]),o(`section`,_,[a[11]||=o(`h2`,{class:`component-demo-view__section-title`},`图片列表缩略图`,-1),o(`div`,v,[i(n(d),{modelValue:J.value,"onUpdate:modelValue":a[3]||=e=>J.value=e,action:`/api/upload`,"list-type":`picture`,onSuccess:$},null,8,[`modelValue`])]),o(`div`,y,[i(f,{code:B,language:`vue`,title:`示例代码`})])]),o(`section`,b,[a[12]||=o(`h2`,{class:`component-demo-view__section-title`},`文件限制`,-1),o(`div`,x,[i(n(d),{modelValue:Y.value,"onUpdate:modelValue":a[4]||=e=>Y.value=e,action:`/api/upload`,limit:3,onExceed:le,onSuccess:$},null,8,[`modelValue`])]),o(`div`,S,[i(f,{code:V,language:`vue`,title:`示例代码`})])]),o(`section`,C,[a[15]||=o(`h2`,{class:`component-demo-view__section-title`},`手动上传`,-1),o(`div`,w,[i(n(d),{ref_key:`manualUploadRef`,ref:Z,modelValue:X.value,"onUpdate:modelValue":a[5]||=e=>X.value=e,"auto-upload":!1,action:`/api/upload`,onSuccess:$},null,8,[`modelValue`]),o(`div`,T,[i(n(u),{type:`primary`,onClick:ue},{default:e(()=>[...a[13]||=[c(` 开始上传 `,-1)]]),_:1}),i(n(u),{style:{"margin-left":`8px`},onClick:de},{default:e(()=>[...a[14]||=[c(` 清空文件 `,-1)]]),_:1})])]),o(`div`,E,[i(f,{code:H,language:`vue`,title:`示例代码`})])]),o(`section`,D,[a[16]||=o(`h2`,{class:`component-demo-view__section-title`},`自定义上传`,-1),o(`div`,O,[i(n(d),{modelValue:Q.value,"onUpdate:modelValue":a[6]||=e=>Q.value=e,"http-request":fe,onSuccess:$},null,8,[`modelValue`])]),o(`div`,k,[i(f,{code:U,language:`vue`,title:`示例代码`})])]),o(`section`,A,[a[17]||=o(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),o(`div`,j,[i(n(d),{disabled:``})]),o(`div`,M,[i(f,{code:W,language:`vue`,title:`示例代码`})])]),o(`section`,N,[a[21]||=o(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),o(`div`,P,[o(`div`,oe,[a[18]||=o(`span`,{style:{"margin-right":`8px`,color:`var(--color-text-secondary)`}},`Small:`,-1),i(n(d),{size:`small`,drag:``})]),o(`div`,F,[a[19]||=o(`span`,{style:{"margin-right":`8px`,color:`var(--color-text-secondary)`}},`Medium:`,-1),i(n(d),{size:`medium`,drag:``})]),o(`div`,null,[a[20]||=o(`span`,{style:{"margin-right":`8px`,color:`var(--color-text-secondary)`}},`Large:`,-1),i(n(d),{size:`large`,drag:``})])]),o(`div`,I,[i(f,{code:G,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-269bf4b8`]]);export{K as default};
import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,S as n,U as r,b as i,h as a,j as o,r as s,v as ee,x as c,z as l}from"./index-D6beBo5R.js";import{t as u}from"./button-CbFeg90j.js";import{t as d}from"./upload-ybRLlo2Y.js";var te={class:`component-demo-view`},ne={class:`component-demo-view__section`},f={class:`component-demo-view__demo`},p={class:`component-demo-view__code`},m={class:`component-demo-view__section`},re={class:`component-demo-view__demo`},ie={class:`component-demo-view__code`},ae={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},g={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`},y={class:`component-demo-view__code`},b={class:`component-demo-view__section`},x={class:`component-demo-view__demo`},S={class:`component-demo-view__code`},C={class:`component-demo-view__section`},w={class:`component-demo-view__demo`},T={style:{"margin-top":`16px`}},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},oe={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},P={style:{"margin-bottom":`16px`}},F={style:{"margin-bottom":`16px`}},I={class:`component-demo-view__code`},L=`<template>
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
</template>`,K=s(n({__name:`UploadView`,setup(n){let s=r([]),K=r([]),q=r([]),J=r([]),Y=r([]),X=r([]),Z=r(),Q=r([]),$=(e,t,n)=>{console.log(`上传成功:`,{response:e,file:t,fileList:n})},se=(e,t,n)=>{console.error(`上传失败:`,{error:e,file:t,fileList:n})},ce=e=>{console.log(`预览文件:`,e),e.url&&window.open(e.url,`_blank`)},le=(e,t)=>{console.warn(`超出文件限制，当前限制 3 个文件，已选择 ${e.length} 个文件，共 ${t.length+e.length} 个文件`)},ue=()=>{Z.value?.submit()},de=()=>{Z.value?.clearFiles()},fe=async e=>{let{onProgress:t,onSuccess:n}=e,r=0,i=setInterval(()=>{r+=10,t(r),r>=100&&clearInterval(i)},200);return new Promise(e=>{setTimeout(()=>{n({data:{url:`https://example.com/uploaded-file.jpg`}}),e({data:{url:`https://example.com/uploaded-file.jpg`}})},2e3)})};return(n,r)=>(o(),ee(`div`,te,[r[22]||=a(`div`,{class:`component-demo-view__header`},[a(`h1`,{class:`component-demo-view__title`},`Upload 上传`),a(`p`,{class:`component-demo-view__description`},` 通过点击或者拖拽上传文件 `)],-1),a(`section`,ne,[r[8]||=a(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),a(`div`,f,[c(t(d),{modelValue:s.value,"onUpdate:modelValue":r[0]||=e=>s.value=e,action:`/api/upload`,onSuccess:$,onError:se},{default:l(()=>[c(t(u),{type:`primary`},{default:l(()=>[...r[7]||=[a(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},[a(`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}),a(`polyline`,{points:`17,8 12,3 7,8`}),a(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})],-1),i(` 点击上传 `,-1)]]),_:1})]),_:1},8,[`modelValue`])]),a(`div`,p,[c(e,{code:L,language:`vue`,title:`示例代码`})])]),a(`section`,m,[r[9]||=a(`h2`,{class:`component-demo-view__section-title`},`拖拽上传`,-1),a(`div`,re,[c(t(d),{modelValue:K.value,"onUpdate:modelValue":r[1]||=e=>K.value=e,drag:``,action:`/api/upload`,onSuccess:$},null,8,[`modelValue`])]),a(`div`,ie,[c(e,{code:R,language:`vue`,title:`示例代码`})])]),a(`section`,ae,[r[10]||=a(`h2`,{class:`component-demo-view__section-title`},`照片墙`,-1),a(`div`,h,[c(t(d),{modelValue:q.value,"onUpdate:modelValue":r[2]||=e=>q.value=e,action:`/api/upload`,"list-type":`picture-card`,"on-preview":ce,onSuccess:$},null,8,[`modelValue`])]),a(`div`,g,[c(e,{code:z,language:`vue`,title:`示例代码`})])]),a(`section`,_,[r[11]||=a(`h2`,{class:`component-demo-view__section-title`},`图片列表缩略图`,-1),a(`div`,v,[c(t(d),{modelValue:J.value,"onUpdate:modelValue":r[3]||=e=>J.value=e,action:`/api/upload`,"list-type":`picture`,onSuccess:$},null,8,[`modelValue`])]),a(`div`,y,[c(e,{code:B,language:`vue`,title:`示例代码`})])]),a(`section`,b,[r[12]||=a(`h2`,{class:`component-demo-view__section-title`},`文件限制`,-1),a(`div`,x,[c(t(d),{modelValue:Y.value,"onUpdate:modelValue":r[4]||=e=>Y.value=e,action:`/api/upload`,limit:3,onExceed:le,onSuccess:$},null,8,[`modelValue`])]),a(`div`,S,[c(e,{code:V,language:`vue`,title:`示例代码`})])]),a(`section`,C,[r[15]||=a(`h2`,{class:`component-demo-view__section-title`},`手动上传`,-1),a(`div`,w,[c(t(d),{ref_key:`manualUploadRef`,ref:Z,modelValue:X.value,"onUpdate:modelValue":r[5]||=e=>X.value=e,"auto-upload":!1,action:`/api/upload`,onSuccess:$},null,8,[`modelValue`]),a(`div`,T,[c(t(u),{type:`primary`,onClick:ue},{default:l(()=>[...r[13]||=[i(` 开始上传 `,-1)]]),_:1}),c(t(u),{style:{"margin-left":`8px`},onClick:de},{default:l(()=>[...r[14]||=[i(` 清空文件 `,-1)]]),_:1})])]),a(`div`,E,[c(e,{code:H,language:`vue`,title:`示例代码`})])]),a(`section`,D,[r[16]||=a(`h2`,{class:`component-demo-view__section-title`},`自定义上传`,-1),a(`div`,O,[c(t(d),{modelValue:Q.value,"onUpdate:modelValue":r[6]||=e=>Q.value=e,"http-request":fe,onSuccess:$},null,8,[`modelValue`])]),a(`div`,k,[c(e,{code:U,language:`vue`,title:`示例代码`})])]),a(`section`,A,[r[17]||=a(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),a(`div`,j,[c(t(d),{disabled:``})]),a(`div`,M,[c(e,{code:W,language:`vue`,title:`示例代码`})])]),a(`section`,N,[r[21]||=a(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),a(`div`,oe,[a(`div`,P,[r[18]||=a(`span`,{style:{"margin-right":`8px`,color:`var(--color-text-secondary)`}},`Small:`,-1),c(t(d),{size:`small`,drag:``})]),a(`div`,F,[r[19]||=a(`span`,{style:{"margin-right":`8px`,color:`var(--color-text-secondary)`}},`Medium:`,-1),c(t(d),{size:`medium`,drag:``})]),a(`div`,null,[r[20]||=a(`span`,{style:{"margin-right":`8px`,color:`var(--color-text-secondary)`}},`Large:`,-1),c(t(d),{size:`large`,drag:``})])]),a(`div`,I,[c(e,{code:G,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-269bf4b8`]]);export{K as default};
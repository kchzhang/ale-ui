import{B as e,C as t,D as n,K as r,M as i,P as a,S as o,W as s,Y as c,_ as l,d as ee,g as u,i as d,p as f,x as p,y as m}from"./index-B3Jx3uix.js";import{t as te}from"./button-GOPf8Q2w.js";import{t as ne}from"./input-COusWsIZ.js";import{t as h}from"./tag-le27g6xF.js";import{t as g}from"./CodeBlock-CE4Cu_o1.js";var re={class:`component-demo-view`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},oe={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`},y={class:`demo-item`},b={class:`demo-item`},x={class:`demo-item`},S={class:`component-demo-view__code`},C={class:`component-demo-view__section`},w={class:`component-demo-view__demo`},T={class:`component-demo-view__code`},E={class:`component-demo-view__section`},D={class:`component-demo-view__demo`},O={class:`component-demo-view__code`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`},j={class:`component-demo-view__code`},M={class:`component-demo-view__section`},N={class:`component-demo-view__demo`},P={class:`component-demo-view__code`},F={class:`component-demo-view__section`},I={class:`component-demo-view__demo`},L={class:`component-demo-view__code`},R={class:`component-demo-view__section`},z={class:`component-demo-view__demo`},B={class:`component-demo-view__code`},se={class:`component-demo-view__section`},V={class:`component-demo-view__demo`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo`},G={class:`component-demo-view__code`},K=`<template>
  <AleTag>默认标签</AleTag>
  <AleTag type="primary">主要标签</AleTag>
  <AleTag type="success">成功标签</AleTag>
  <AleTag type="warning">警告标签</AleTag>
  <AleTag type="danger">危险标签</AleTag>
  <AleTag type="info">信息标签</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`,ce=`<template>
  <AleTag size="small" type="primary">小型</AleTag>
  <AleTag size="medium" type="primary">中型</AleTag>
  <AleTag size="large" type="primary">大型</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`,le=`<template>
  <AleTag
    v-for="tag in tags"
    :key="tag.name"
    :type="tag.type"
    closable
    @close="handleClose(tag)"
  >
    {{ tag.name }}
  </AleTag>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTag } from 'ale-ui';

const tags = ref([
  { name: '标签一', type: 'primary' },
  { name: '标签二', type: 'success' }
]);

const handleClose = (tag) => {
  console.log('关闭:', tag.name);
};
<\/script>`,ue=`<template>
  <AleTag disabled>禁用标签</AleTag>
  <AleTag type="primary" disabled>禁用主要</AleTag>
  <AleTag type="success" closable disabled>禁用可关闭</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`,de=`<template>
  <AleTag bordered>默认</AleTag>
  <AleTag type="primary" bordered>主要</AleTag>
  <AleTag type="success" bordered>成功</AleTag>
  <AleTag type="warning" bordered>警告</AleTag>
  <AleTag type="danger" bordered>危险</AleTag>
  <AleTag type="info" bordered>信息</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`,fe=`<template>
  <AleTag round>圆角</AleTag>
  <AleTag type="primary" round>圆角主要</AleTag>
  <AleTag type="success" round closable>圆角可关闭</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`,pe=`<template>
  <AleTag icon="icon-user" type="primary">用户</AleTag>
  <AleTag icon="icon-check" type="success">完成</AleTag>
  <AleTag icon="icon-warning" type="warning">注意</AleTag>
  <AleTag icon="icon-close" type="danger">取消</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`,me=`<template>
  <AleTag color="#ff6b6b" bgColor="#fff5f5">红色</AleTag>
  <AleTag color="#4ecdc4" bgColor="#e0f7f5">青色</AleTag>
  <AleTag color="#45b7d1" bgColor="#e3f2fd">蓝色</AleTag>
</template>

<script setup lang="ts">
import { AleTag } from 'ale-ui';
<\/script>`,he=`<template>
  <AleTag
    v-for="tag in dynamicTags"
    :key="tag"
    closable
    type="primary"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </AleTag>
  <AleButton
    v-if="!inputVisible"
    size="small"
    @click="showInput"
  >
    + 新标签
  </AleButton>
  <AleInput
    v-else
    v-model="inputValue"
    size="small"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { AleTag, AleButton, AleInput } from 'ale-ui';

const dynamicTags = ref(['标签一', '标签二']);
const inputVisible = ref(false);
const inputValue = ref('');

const handleClose = (tag: string) => {
  dynamicTags.value = dynamicTags.value.filter(item => item !== tag);
};

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};
<\/script>`,ge=`<template>
  <AleTag type="primary" @click="handleClick">
    点击次数: {{ count }}
  </AleTag>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTag } from 'ale-ui';

const count = ref(0);

const handleClick = () => {
  count.value++;
};
<\/script>`,q=d(t({__name:`TagView`,setup(t){let d=s([{name:`标签一`,type:`primary`},{name:`标签二`,type:`success`},{name:`标签三`,type:`warning`},{name:`标签四`,type:`danger`}]),q=s([`标签一`,`标签二`,`标签三`]),J=s(!1),Y=s(``),X=s(null),Z=s(0),_e=e=>{console.log(`关闭标签:`,e.name)},Q=e=>{q.value=q.value.filter(t=>t!==e)},ve=()=>{J.value=!0,n(()=>{X.value?.focus?.()})},$=()=>{Y.value&&q.value.push(Y.value),J.value=!1,Y.value=``},ye=()=>{Z.value++};return(t,n)=>(i(),m(`div`,re,[n[45]||=u(`div`,{class:`component-demo-view__header`},[u(`h1`,{class:`component-demo-view__title`},`Tag 标签`),u(`p`,{class:`component-demo-view__description`},` 用于标记和选择的标签组件 `)],-1),u(`section`,ie,[n[7]||=u(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),u(`div`,ae,[o(r(h),null,{default:e(()=>[...n[1]||=[p(`默认标签`,-1)]]),_:1}),o(r(h),{type:`primary`},{default:e(()=>[...n[2]||=[p(`主要标签`,-1)]]),_:1}),o(r(h),{type:`success`},{default:e(()=>[...n[3]||=[p(`成功标签`,-1)]]),_:1}),o(r(h),{type:`warning`},{default:e(()=>[...n[4]||=[p(`警告标签`,-1)]]),_:1}),o(r(h),{type:`danger`},{default:e(()=>[...n[5]||=[p(`危险标签`,-1)]]),_:1}),o(r(h),{type:`info`},{default:e(()=>[...n[6]||=[p(`信息标签`,-1)]]),_:1})]),u(`div`,oe,[o(g,{code:K,language:`vue`,title:`示例代码`})])]),u(`section`,_,[n[14]||=u(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),u(`div`,v,[u(`div`,y,[o(r(h),{size:`small`,type:`primary`},{default:e(()=>[...n[8]||=[p(`小型`,-1)]]),_:1}),n[9]||=u(`span`,{class:`demo-label`},`small`,-1)]),u(`div`,b,[o(r(h),{size:`medium`,type:`primary`},{default:e(()=>[...n[10]||=[p(`中型`,-1)]]),_:1}),n[11]||=u(`span`,{class:`demo-label`},`medium`,-1)]),u(`div`,x,[o(r(h),{size:`large`,type:`primary`},{default:e(()=>[...n[12]||=[p(`大型`,-1)]]),_:1}),n[13]||=u(`span`,{class:`demo-label`},`large`,-1)])]),u(`div`,S,[o(g,{code:ce,language:`vue`,title:`示例代码`})])]),u(`section`,C,[n[15]||=u(`h2`,{class:`component-demo-view__section-title`},`可关闭标签`,-1),u(`div`,w,[(i(!0),m(f,null,a(d.value,t=>(i(),l(r(h),{key:t.name,type:t.type,closable:``,onClose:e=>_e(t)},{default:e(()=>[p(c(t.name),1)]),_:2},1032,[`type`,`onClose`]))),128))]),u(`div`,T,[o(g,{code:le,language:`vue`,title:`示例代码`})])]),u(`section`,E,[n[19]||=u(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),u(`div`,D,[o(r(h),{disabled:``},{default:e(()=>[...n[16]||=[p(`禁用标签`,-1)]]),_:1}),o(r(h),{type:`primary`,disabled:``},{default:e(()=>[...n[17]||=[p(`禁用主要`,-1)]]),_:1}),o(r(h),{type:`success`,closable:``,disabled:``},{default:e(()=>[...n[18]||=[p(`禁用可关闭`,-1)]]),_:1})]),u(`div`,O,[o(g,{code:ue,language:`vue`,title:`示例代码`})])]),u(`section`,k,[n[26]||=u(`h2`,{class:`component-demo-view__section-title`},`边框样式`,-1),u(`div`,A,[o(r(h),{bordered:``},{default:e(()=>[...n[20]||=[p(`默认`,-1)]]),_:1}),o(r(h),{type:`primary`,bordered:``},{default:e(()=>[...n[21]||=[p(`主要`,-1)]]),_:1}),o(r(h),{type:`success`,bordered:``},{default:e(()=>[...n[22]||=[p(`成功`,-1)]]),_:1}),o(r(h),{type:`warning`,bordered:``},{default:e(()=>[...n[23]||=[p(`警告`,-1)]]),_:1}),o(r(h),{type:`danger`,bordered:``},{default:e(()=>[...n[24]||=[p(`危险`,-1)]]),_:1}),o(r(h),{type:`info`,bordered:``},{default:e(()=>[...n[25]||=[p(`信息`,-1)]]),_:1})]),u(`div`,j,[o(g,{code:de,language:`vue`,title:`示例代码`})])]),u(`section`,M,[n[30]||=u(`h2`,{class:`component-demo-view__section-title`},`圆角样式`,-1),u(`div`,N,[o(r(h),{round:``},{default:e(()=>[...n[27]||=[p(`圆角`,-1)]]),_:1}),o(r(h),{type:`primary`,round:``},{default:e(()=>[...n[28]||=[p(`圆角主要`,-1)]]),_:1}),o(r(h),{type:`success`,round:``,closable:``},{default:e(()=>[...n[29]||=[p(`圆角可关闭`,-1)]]),_:1})]),u(`div`,P,[o(g,{code:fe,language:`vue`,title:`示例代码`})])]),u(`section`,F,[n[35]||=u(`h2`,{class:`component-demo-view__section-title`},`带图标`,-1),u(`div`,I,[o(r(h),{icon:`icon-user`,type:`primary`},{default:e(()=>[...n[31]||=[p(`用户`,-1)]]),_:1}),o(r(h),{icon:`icon-check`,type:`success`},{default:e(()=>[...n[32]||=[p(`完成`,-1)]]),_:1}),o(r(h),{icon:`icon-warning`,type:`warning`},{default:e(()=>[...n[33]||=[p(`注意`,-1)]]),_:1}),o(r(h),{icon:`icon-close`,type:`danger`},{default:e(()=>[...n[34]||=[p(`取消`,-1)]]),_:1})]),u(`div`,L,[o(g,{code:pe,language:`vue`,title:`示例代码`})])]),u(`section`,R,[n[41]||=u(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),u(`div`,z,[o(r(h),{color:`#ff6b6b`,bgColor:`#fff5f5`},{default:e(()=>[...n[36]||=[p(`红色`,-1)]]),_:1}),o(r(h),{color:`#4ecdc4`,bgColor:`#e0f7f5`},{default:e(()=>[...n[37]||=[p(`青色`,-1)]]),_:1}),o(r(h),{color:`#45b7d1`,bgColor:`#e3f2fd`},{default:e(()=>[...n[38]||=[p(`蓝色`,-1)]]),_:1}),o(r(h),{color:`#96ceb4`,bgColor:`#f0f9f4`},{default:e(()=>[...n[39]||=[p(`绿色`,-1)]]),_:1}),o(r(h),{color:`#ff9ff3`,bgColor:`#fff0fb`},{default:e(()=>[...n[40]||=[p(`粉色`,-1)]]),_:1})]),u(`div`,B,[o(g,{code:me,language:`vue`,title:`示例代码`})])]),u(`section`,se,[n[43]||=u(`h2`,{class:`component-demo-view__section-title`},`动态编辑标签`,-1),u(`div`,V,[(i(!0),m(f,null,a(q.value,t=>(i(),l(r(h),{key:t,closable:``,type:`primary`,onClose:e=>Q(t)},{default:e(()=>[p(c(t),1)]),_:2},1032,[`onClose`]))),128)),J.value?(i(),l(r(ne),{key:1,ref_key:`inputRef`,ref:X,modelValue:Y.value,"onUpdate:modelValue":n[0]||=e=>Y.value=e,size:`small`,style:{width:`100px`},onBlur:$,onKeyup:ee($,[`enter`])},null,8,[`modelValue`])):(i(),l(r(te),{key:0,size:`small`,onClick:ve},{default:e(()=>[...n[42]||=[p(` + 新标签 `,-1)]]),_:1}))]),u(`div`,H,[o(g,{code:he,language:`vue`,title:`示例代码`})])]),u(`section`,U,[n[44]||=u(`h2`,{class:`component-demo-view__section-title`},`点击事件`,-1),u(`div`,W,[o(r(h),{type:`primary`,onClick:ye},{default:e(()=>[p(` 点击次数: `+c(Z.value),1)]),_:1})]),u(`div`,G,[o(g,{code:ge,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-f2964ec7`]]);export{q as default};
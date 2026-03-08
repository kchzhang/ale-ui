import{t as e}from"./CodeBlock-CmDK_EYq.js";import{E as t,G as n,J as r,N as i,S as a,U as o,b as s,f as c,g as l,h as u,j as d,r as f,u as ee,v as p,x as m,z as h}from"./index-D6beBo5R.js";import{t as te}from"./button-CbFeg90j.js";import{t as ne}from"./input-B7Q9UE5n.js";import{t as g}from"./tag-C_SLcuKD.js";var re={class:`component-demo-view`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},oe={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`},y={class:`demo-item`},b={class:`demo-item`},x={class:`demo-item`},S={class:`component-demo-view__code`},C={class:`component-demo-view__section`},w={class:`component-demo-view__demo`},T={class:`component-demo-view__code`},E={class:`component-demo-view__section`},D={class:`component-demo-view__demo`},O={class:`component-demo-view__code`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`},j={class:`component-demo-view__code`},M={class:`component-demo-view__section`},N={class:`component-demo-view__demo`},P={class:`component-demo-view__code`},F={class:`component-demo-view__section`},I={class:`component-demo-view__demo`},L={class:`component-demo-view__code`},R={class:`component-demo-view__section`},z={class:`component-demo-view__demo`},B={class:`component-demo-view__code`},se={class:`component-demo-view__section`},V={class:`component-demo-view__demo`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo`},G={class:`component-demo-view__code`},K=`<template>
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
<\/script>`,q=f(a({__name:`TagView`,setup(a){let f=o([{name:`标签一`,type:`primary`},{name:`标签二`,type:`success`},{name:`标签三`,type:`warning`},{name:`标签四`,type:`danger`}]),q=o([`标签一`,`标签二`,`标签三`]),J=o(!1),Y=o(``),X=o(null),Z=o(0),_e=e=>{console.log(`关闭标签:`,e.name)},Q=e=>{q.value=q.value.filter(t=>t!==e)},ve=()=>{J.value=!0,t(()=>{X.value?.focus?.()})},$=()=>{Y.value&&q.value.push(Y.value),J.value=!1,Y.value=``},ye=()=>{Z.value++};return(t,a)=>(d(),p(`div`,re,[a[45]||=u(`div`,{class:`component-demo-view__header`},[u(`h1`,{class:`component-demo-view__title`},`Tag 标签`),u(`p`,{class:`component-demo-view__description`},` 用于标记和选择的标签组件 `)],-1),u(`section`,ie,[a[7]||=u(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),u(`div`,ae,[m(n(g),null,{default:h(()=>[...a[1]||=[s(`默认标签`,-1)]]),_:1}),m(n(g),{type:`primary`},{default:h(()=>[...a[2]||=[s(`主要标签`,-1)]]),_:1}),m(n(g),{type:`success`},{default:h(()=>[...a[3]||=[s(`成功标签`,-1)]]),_:1}),m(n(g),{type:`warning`},{default:h(()=>[...a[4]||=[s(`警告标签`,-1)]]),_:1}),m(n(g),{type:`danger`},{default:h(()=>[...a[5]||=[s(`危险标签`,-1)]]),_:1}),m(n(g),{type:`info`},{default:h(()=>[...a[6]||=[s(`信息标签`,-1)]]),_:1})]),u(`div`,oe,[m(e,{code:K,language:`vue`,title:`示例代码`})])]),u(`section`,_,[a[14]||=u(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),u(`div`,v,[u(`div`,y,[m(n(g),{size:`small`,type:`primary`},{default:h(()=>[...a[8]||=[s(`小型`,-1)]]),_:1}),a[9]||=u(`span`,{class:`demo-label`},`small`,-1)]),u(`div`,b,[m(n(g),{size:`medium`,type:`primary`},{default:h(()=>[...a[10]||=[s(`中型`,-1)]]),_:1}),a[11]||=u(`span`,{class:`demo-label`},`medium`,-1)]),u(`div`,x,[m(n(g),{size:`large`,type:`primary`},{default:h(()=>[...a[12]||=[s(`大型`,-1)]]),_:1}),a[13]||=u(`span`,{class:`demo-label`},`large`,-1)])]),u(`div`,S,[m(e,{code:ce,language:`vue`,title:`示例代码`})])]),u(`section`,C,[a[15]||=u(`h2`,{class:`component-demo-view__section-title`},`可关闭标签`,-1),u(`div`,w,[(d(!0),p(c,null,i(f.value,e=>(d(),l(n(g),{key:e.name,type:e.type,closable:``,onClose:t=>_e(e)},{default:h(()=>[s(r(e.name),1)]),_:2},1032,[`type`,`onClose`]))),128))]),u(`div`,T,[m(e,{code:le,language:`vue`,title:`示例代码`})])]),u(`section`,E,[a[19]||=u(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),u(`div`,D,[m(n(g),{disabled:``},{default:h(()=>[...a[16]||=[s(`禁用标签`,-1)]]),_:1}),m(n(g),{type:`primary`,disabled:``},{default:h(()=>[...a[17]||=[s(`禁用主要`,-1)]]),_:1}),m(n(g),{type:`success`,closable:``,disabled:``},{default:h(()=>[...a[18]||=[s(`禁用可关闭`,-1)]]),_:1})]),u(`div`,O,[m(e,{code:ue,language:`vue`,title:`示例代码`})])]),u(`section`,k,[a[26]||=u(`h2`,{class:`component-demo-view__section-title`},`边框样式`,-1),u(`div`,A,[m(n(g),{bordered:``},{default:h(()=>[...a[20]||=[s(`默认`,-1)]]),_:1}),m(n(g),{type:`primary`,bordered:``},{default:h(()=>[...a[21]||=[s(`主要`,-1)]]),_:1}),m(n(g),{type:`success`,bordered:``},{default:h(()=>[...a[22]||=[s(`成功`,-1)]]),_:1}),m(n(g),{type:`warning`,bordered:``},{default:h(()=>[...a[23]||=[s(`警告`,-1)]]),_:1}),m(n(g),{type:`danger`,bordered:``},{default:h(()=>[...a[24]||=[s(`危险`,-1)]]),_:1}),m(n(g),{type:`info`,bordered:``},{default:h(()=>[...a[25]||=[s(`信息`,-1)]]),_:1})]),u(`div`,j,[m(e,{code:de,language:`vue`,title:`示例代码`})])]),u(`section`,M,[a[30]||=u(`h2`,{class:`component-demo-view__section-title`},`圆角样式`,-1),u(`div`,N,[m(n(g),{round:``},{default:h(()=>[...a[27]||=[s(`圆角`,-1)]]),_:1}),m(n(g),{type:`primary`,round:``},{default:h(()=>[...a[28]||=[s(`圆角主要`,-1)]]),_:1}),m(n(g),{type:`success`,round:``,closable:``},{default:h(()=>[...a[29]||=[s(`圆角可关闭`,-1)]]),_:1})]),u(`div`,P,[m(e,{code:fe,language:`vue`,title:`示例代码`})])]),u(`section`,F,[a[35]||=u(`h2`,{class:`component-demo-view__section-title`},`带图标`,-1),u(`div`,I,[m(n(g),{icon:`icon-user`,type:`primary`},{default:h(()=>[...a[31]||=[s(`用户`,-1)]]),_:1}),m(n(g),{icon:`icon-check`,type:`success`},{default:h(()=>[...a[32]||=[s(`完成`,-1)]]),_:1}),m(n(g),{icon:`icon-warning`,type:`warning`},{default:h(()=>[...a[33]||=[s(`注意`,-1)]]),_:1}),m(n(g),{icon:`icon-close`,type:`danger`},{default:h(()=>[...a[34]||=[s(`取消`,-1)]]),_:1})]),u(`div`,L,[m(e,{code:pe,language:`vue`,title:`示例代码`})])]),u(`section`,R,[a[41]||=u(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),u(`div`,z,[m(n(g),{color:`#ff6b6b`,bgColor:`#fff5f5`},{default:h(()=>[...a[36]||=[s(`红色`,-1)]]),_:1}),m(n(g),{color:`#4ecdc4`,bgColor:`#e0f7f5`},{default:h(()=>[...a[37]||=[s(`青色`,-1)]]),_:1}),m(n(g),{color:`#45b7d1`,bgColor:`#e3f2fd`},{default:h(()=>[...a[38]||=[s(`蓝色`,-1)]]),_:1}),m(n(g),{color:`#96ceb4`,bgColor:`#f0f9f4`},{default:h(()=>[...a[39]||=[s(`绿色`,-1)]]),_:1}),m(n(g),{color:`#ff9ff3`,bgColor:`#fff0fb`},{default:h(()=>[...a[40]||=[s(`粉色`,-1)]]),_:1})]),u(`div`,B,[m(e,{code:me,language:`vue`,title:`示例代码`})])]),u(`section`,se,[a[43]||=u(`h2`,{class:`component-demo-view__section-title`},`动态编辑标签`,-1),u(`div`,V,[(d(!0),p(c,null,i(q.value,e=>(d(),l(n(g),{key:e,closable:``,type:`primary`,onClose:t=>Q(e)},{default:h(()=>[s(r(e),1)]),_:2},1032,[`onClose`]))),128)),J.value?(d(),l(n(ne),{key:1,ref_key:`inputRef`,ref:X,modelValue:Y.value,"onUpdate:modelValue":a[0]||=e=>Y.value=e,size:`small`,style:{width:`100px`},onBlur:$,onKeyup:ee($,[`enter`])},null,8,[`modelValue`])):(d(),l(n(te),{key:0,size:`small`,onClick:ve},{default:h(()=>[...a[42]||=[s(` + 新标签 `,-1)]]),_:1}))]),u(`div`,H,[m(e,{code:he,language:`vue`,title:`示例代码`})])]),u(`section`,U,[a[44]||=u(`h2`,{class:`component-demo-view__section-title`},`点击事件`,-1),u(`div`,W,[m(n(g),{type:`primary`,onClick:ye},{default:h(()=>[s(` 点击次数: `+r(Z.value),1)]),_:1})]),u(`div`,G,[m(e,{code:ge,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-f2964ec7`]]);export{q as default};
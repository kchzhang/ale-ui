import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,S as r,U as i,b as a,h as o,j as s,r as c,v as l,x as u,z as d}from"./index-D6beBo5R.js";import{t as f}from"./button-CbFeg90j.js";var p={class:`component-demo-view`},m={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},g={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`},y={class:`component-demo-view__code`},b={class:`component-demo-view__section`},x={class:`component-demo-view__demo`},S={class:`component-demo-view__code`},C={class:`component-demo-view__section`},w={class:`component-demo-view__demo`},T={class:`component-demo-view__demo`},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A=`<template>
  <AleButton>默认按钮</AleButton>
  <AleButton type="primary">主要按钮</AleButton>
  <AleButton type="success">成功按钮</AleButton>
  <AleButton type="warning">警告按钮</AleButton>
  <AleButton type="danger">危险按钮</AleButton>
</template>

<script setup lang="ts">
import { AleButton } from 'ale-ui';
<\/script>`,j=`<template>
  <AleButton size="small">小型按钮</AleButton>
  <AleButton size="medium">中型按钮</AleButton>
  <AleButton size="large">大型按钮</AleButton>
</template>

<script setup lang="ts">
import { AleButton } from 'ale-ui';
<\/script>`,M=`<template>
  <AleButton disabled>禁用按钮</AleButton>
  <AleButton type="primary" :loading="loading" @click="handleLoading">
    加载按钮
  </AleButton>
  <AleButton type="danger" plain>朴素按钮</AleButton>
  <AleButton type="primary" round>圆角按钮</AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton } from 'ale-ui';

const loading = ref(false);

const handleLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
<\/script>`,N=`<template>
  <!-- 块级按钮 -->
  <AleButton type="primary" block>块级按钮</AleButton>

  <!-- 圆形按钮 -->
  <AleButton type="primary" circle>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" stroke-width="2"/>
      <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </AleButton>
</template>

<script setup lang="ts">
import { AleButton } from 'ale-ui';
<\/script>`,P=`<template>
  <AleButton type="primary" @click="handleClick">
    点击次数: {{ clickCount }}
  </AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton } from 'ale-ui';

const clickCount = ref(0);

const handleClick = () => {
  clickCount.value++;
};
<\/script>`,F=c(r({__name:`ButtonView`,setup(r){let c=i(!1),F=i(0),I=()=>{c.value=!0,setTimeout(()=>{c.value=!1},2e3)},L=()=>{F.value++};return(r,i)=>(s(),l(`div`,p,[i[20]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Button 按钮`),o(`p`,{class:`component-demo-view__description`},` 按钮用于开始一个即时操作 `)],-1),o(`section`,m,[i[5]||=o(`h2`,{class:`component-demo-view__section-title`},`基础按钮`,-1),o(`div`,h,[u(t(f),null,{default:d(()=>[...i[0]||=[a(`默认按钮`,-1)]]),_:1}),u(t(f),{type:`primary`},{default:d(()=>[...i[1]||=[a(`主要按钮`,-1)]]),_:1}),u(t(f),{type:`success`},{default:d(()=>[...i[2]||=[a(`成功按钮`,-1)]]),_:1}),u(t(f),{type:`warning`},{default:d(()=>[...i[3]||=[a(`警告按钮`,-1)]]),_:1}),u(t(f),{type:`danger`},{default:d(()=>[...i[4]||=[a(`危险按钮`,-1)]]),_:1})]),o(`div`,g,[u(e,{code:A,language:`vue`,title:`示例代码`})])]),o(`section`,_,[i[9]||=o(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),o(`div`,v,[u(t(f),{size:`small`},{default:d(()=>[...i[6]||=[a(`小型按钮`,-1)]]),_:1}),u(t(f),{size:`medium`},{default:d(()=>[...i[7]||=[a(`中型按钮`,-1)]]),_:1}),u(t(f),{size:`large`},{default:d(()=>[...i[8]||=[a(`大型按钮`,-1)]]),_:1})]),o(`div`,y,[u(e,{code:j,language:`vue`,title:`示例代码`})])]),o(`section`,b,[i[14]||=o(`h2`,{class:`component-demo-view__section-title`},`不同状态`,-1),o(`div`,x,[u(t(f),{disabled:``},{default:d(()=>[...i[10]||=[a(`禁用按钮`,-1)]]),_:1}),u(t(f),{type:`primary`,loading:c.value,onClick:I},{default:d(()=>[...i[11]||=[a(` 加载按钮 `,-1)]]),_:1},8,[`loading`]),u(t(f),{type:`danger`,plain:``},{default:d(()=>[...i[12]||=[a(`朴素按钮`,-1)]]),_:1}),u(t(f),{type:`primary`,round:``},{default:d(()=>[...i[13]||=[a(`圆角按钮`,-1)]]),_:1})]),o(`div`,S,[u(e,{code:M,language:`vue`,title:`示例代码`})])]),o(`section`,C,[i[18]||=o(`h2`,{class:`component-demo-view__section-title`},`不同风格`,-1),o(`div`,w,[u(t(f),{type:`primary`,block:``},{default:d(()=>[...i[15]||=[a(`块级按钮`,-1)]]),_:1})]),o(`div`,T,[u(t(f),{type:`primary`,circle:``},{default:d(()=>[...i[16]||=[o(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`},[o(`circle`,{cx:`12`,cy:`12`,r:`10`,"stroke-width":`2`}),o(`path`,{d:`M12 6v6l4 2`,"stroke-width":`2`,"stroke-linecap":`round`})],-1)]]),_:1}),u(t(f),{type:`success`,circle:``},{default:d(()=>[...i[17]||=[o(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`},[o(`path`,{d:`M5 13l4 4L19 7`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`})],-1)]]),_:1})]),o(`div`,E,[u(e,{code:N,language:`vue`,title:`示例代码`})])]),o(`section`,D,[i[19]||=o(`h2`,{class:`component-demo-view__section-title`},`交互示例`,-1),o(`div`,O,[u(t(f),{type:`primary`,onClick:L},{default:d(()=>[a(` 点击次数: `+n(F.value),1)]),_:1})]),o(`div`,k,[u(e,{code:P,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-12bda69c`]]);export{F as default};
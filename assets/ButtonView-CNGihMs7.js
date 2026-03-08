import{B as e,C as t,K as n,M as r,S as i,W as a,Y as o,g as s,i as c,x as l,y as u}from"./index-B3Jx3uix.js";import{t as d}from"./button-GOPf8Q2w.js";import{t as f}from"./CodeBlock-CE4Cu_o1.js";var p={class:`component-demo-view`},m={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},g={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`},y={class:`component-demo-view__code`},b={class:`component-demo-view__section`},x={class:`component-demo-view__demo`},S={class:`component-demo-view__code`},C={class:`component-demo-view__section`},w={class:`component-demo-view__demo`},T={class:`component-demo-view__demo`},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A=`<template>
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
<\/script>`,F=c(t({__name:`ButtonView`,setup(t){let c=a(!1),F=a(0),I=()=>{c.value=!0,setTimeout(()=>{c.value=!1},2e3)},L=()=>{F.value++};return(t,a)=>(r(),u(`div`,p,[a[20]||=s(`div`,{class:`component-demo-view__header`},[s(`h1`,{class:`component-demo-view__title`},`Button 按钮`),s(`p`,{class:`component-demo-view__description`},` 按钮用于开始一个即时操作 `)],-1),s(`section`,m,[a[5]||=s(`h2`,{class:`component-demo-view__section-title`},`基础按钮`,-1),s(`div`,h,[i(n(d),null,{default:e(()=>[...a[0]||=[l(`默认按钮`,-1)]]),_:1}),i(n(d),{type:`primary`},{default:e(()=>[...a[1]||=[l(`主要按钮`,-1)]]),_:1}),i(n(d),{type:`success`},{default:e(()=>[...a[2]||=[l(`成功按钮`,-1)]]),_:1}),i(n(d),{type:`warning`},{default:e(()=>[...a[3]||=[l(`警告按钮`,-1)]]),_:1}),i(n(d),{type:`danger`},{default:e(()=>[...a[4]||=[l(`危险按钮`,-1)]]),_:1})]),s(`div`,g,[i(f,{code:A,language:`vue`,title:`示例代码`})])]),s(`section`,_,[a[9]||=s(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),s(`div`,v,[i(n(d),{size:`small`},{default:e(()=>[...a[6]||=[l(`小型按钮`,-1)]]),_:1}),i(n(d),{size:`medium`},{default:e(()=>[...a[7]||=[l(`中型按钮`,-1)]]),_:1}),i(n(d),{size:`large`},{default:e(()=>[...a[8]||=[l(`大型按钮`,-1)]]),_:1})]),s(`div`,y,[i(f,{code:j,language:`vue`,title:`示例代码`})])]),s(`section`,b,[a[14]||=s(`h2`,{class:`component-demo-view__section-title`},`不同状态`,-1),s(`div`,x,[i(n(d),{disabled:``},{default:e(()=>[...a[10]||=[l(`禁用按钮`,-1)]]),_:1}),i(n(d),{type:`primary`,loading:c.value,onClick:I},{default:e(()=>[...a[11]||=[l(` 加载按钮 `,-1)]]),_:1},8,[`loading`]),i(n(d),{type:`danger`,plain:``},{default:e(()=>[...a[12]||=[l(`朴素按钮`,-1)]]),_:1}),i(n(d),{type:`primary`,round:``},{default:e(()=>[...a[13]||=[l(`圆角按钮`,-1)]]),_:1})]),s(`div`,S,[i(f,{code:M,language:`vue`,title:`示例代码`})])]),s(`section`,C,[a[18]||=s(`h2`,{class:`component-demo-view__section-title`},`不同风格`,-1),s(`div`,w,[i(n(d),{type:`primary`,block:``},{default:e(()=>[...a[15]||=[l(`块级按钮`,-1)]]),_:1})]),s(`div`,T,[i(n(d),{type:`primary`,circle:``},{default:e(()=>[...a[16]||=[s(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`},[s(`circle`,{cx:`12`,cy:`12`,r:`10`,"stroke-width":`2`}),s(`path`,{d:`M12 6v6l4 2`,"stroke-width":`2`,"stroke-linecap":`round`})],-1)]]),_:1}),i(n(d),{type:`success`,circle:``},{default:e(()=>[...a[17]||=[s(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`},[s(`path`,{d:`M5 13l4 4L19 7`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`})],-1)]]),_:1})]),s(`div`,E,[i(f,{code:N,language:`vue`,title:`示例代码`})])]),s(`section`,D,[a[19]||=s(`h2`,{class:`component-demo-view__section-title`},`交互示例`,-1),s(`div`,O,[i(n(d),{type:`primary`,onClick:L},{default:e(()=>[l(` 点击次数: `+o(F.value),1)]),_:1})]),s(`div`,k,[i(f,{code:P,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-12bda69c`]]);export{F as default};
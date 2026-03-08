import{B as e,C as t,K as n,M as r,S as i,W as a,Y as o,g as s,i as c,x as l,y as u}from"./index-B3Jx3uix.js";import{t as d}from"./button-GOPf8Q2w.js";import{t as f}from"./badge-J6JiNC5t.js";import{t as p}from"./CodeBlock-CE4Cu_o1.js";var m={class:`component-demo-view`},h={class:`component-demo-view__section`},g={class:`component-demo-view__demo`},_={class:`component-demo-view__code`},v={class:`component-demo-view__section`},y={class:`component-demo-view__demo`},b={class:`component-demo-view__code`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo`},F={class:`component-demo-view__controls`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`},z={class:`component-demo-view__controls`},B={class:`component-demo-view__code`},V=`<template>
  <AleBadge :value="12">
    <div class="demo-box">消息</div>
  </AleBadge>
  <AleBadge :value="5">
    <div class="demo-box">通知</div>
  </AleBadge>
  <AleBadge :value="3">
    <div class="demo-box">任务</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`,H=`<template>
  <AleBadge :value="99" :max="99">
    <div class="demo-box">正常</div>
  </AleBadge>
  <AleBadge :value="200" :max="99">
    <div class="demo-box">超出（显示 99+）</div>
  </AleBadge>
  <AleBadge :value="1000" :max="999">
    <div class="demo-box">大数（显示 999+）</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`,U=`<template>
  <AleBadge isDot>
    <div class="demo-box">消息</div>
  </AleBadge>
  <AleBadge isDot>
    <div class="demo-box">通知</div>
  </AleBadge>
  <AleBadge isDot>
    <div class="demo-box">状态</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`,W=`<template>
  <AleBadge :value="12" type="primary">
    <div class="demo-box">主要</div>
  </AleBadge>
  <AleBadge :value="3" type="success">
    <div class="demo-box">成功</div>
  </AleBadge>
  <AleBadge :value="5" type="warning">
    <div class="demo-box">警告</div>
  </AleBadge>
  <AleBadge :value="8" type="danger">
    <div class="demo-box">危险</div>
  </AleBadge>
  <AleBadge :value="1" type="info">
    <div class="demo-box">信息</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`,G=`<template>
  <AleBadge :value="12" color="#67c23a">
    <div class="demo-box">绿色</div>
  </AleBadge>
  <AleBadge :value="5" color="#e6a23c">
    <div class="demo-box">橙色</div>
  </AleBadge>
  <AleBadge :value="8" color="#f56c6c">
    <div class="demo-box">红色</div>
  </AleBadge>
  <AleBadge :value="3" color="#909399">
    <div class="demo-box">灰色</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`,K=`<template>
  <AleBadge :value="12" size="small">
    <div class="demo-box">小</div>
  </AleBadge>
  <AleBadge :value="12" size="medium">
    <div class="demo-box">中</div>
  </AleBadge>
  <AleBadge :value="12" size="large">
    <div class="demo-box">大</div>
  </AleBadge>
</template>

<script setup lang="ts">
import { AleBadge } from 'ale-ui';
<\/script>`,q=`<template>
  <AleBadge :value="count">
    <div class="demo-box">计数器</div>
  </AleBadge>
  <AleButton @click="count--">减少</AleButton>
  <AleButton type="primary" @click="count++">增加</AleButton>
  <AleButton type="danger" @click="count = 0">重置</AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleBadge, AleButton } from 'ale-ui';

const count = ref(12);
<\/script>`,J=`<template>
  <AleBadge :value="12" :hidden="isHidden">
    <div class="demo-box">消息</div>
  </AleBadge>
  <AleButton @click="isHidden = !isHidden">
    {{ isHidden ? '显示徽标' : '隐藏徽标' }}
  </AleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleBadge, AleButton } from 'ale-ui';

const isHidden = ref(false);
<\/script>`,Y=c(t({__name:`BadgeView`,setup(t){let c=a(12),Y=a(!1);return(t,a)=>(r(),u(`div`,m,[a[38]||=s(`div`,{class:`component-demo-view__header`},[s(`h1`,{class:`component-demo-view__title`},`Badge 徽标`),s(`p`,{class:`component-demo-view__description`},` 用于显示数量、状态或标记信息的徽标组件 `)],-1),s(`section`,h,[a[7]||=s(`h2`,{class:`component-demo-view__section-title`},`基本用法`,-1),s(`div`,g,[i(n(f),{value:12},{default:e(()=>[...a[4]||=[s(`div`,{class:`demo-box`},`消息`,-1)]]),_:1}),i(n(f),{value:5},{default:e(()=>[...a[5]||=[s(`div`,{class:`demo-box`},`通知`,-1)]]),_:1}),i(n(f),{value:3},{default:e(()=>[...a[6]||=[s(`div`,{class:`demo-box`},`任务`,-1)]]),_:1})]),s(`div`,_,[i(p,{code:V,language:`vue`,title:`示例代码`})])]),s(`section`,v,[a[11]||=s(`h2`,{class:`component-demo-view__section-title`},`最大值`,-1),s(`div`,y,[i(n(f),{value:99,max:99},{default:e(()=>[...a[8]||=[s(`div`,{class:`demo-box`},`正常`,-1)]]),_:1}),i(n(f),{value:200,max:99},{default:e(()=>[...a[9]||=[s(`div`,{class:`demo-box`},`超出`,-1)]]),_:1}),i(n(f),{value:1e3,max:999},{default:e(()=>[...a[10]||=[s(`div`,{class:`demo-box`},`大数`,-1)]]),_:1})]),s(`div`,b,[i(p,{code:H,language:`vue`,title:`示例代码`})])]),s(`section`,x,[a[15]||=s(`h2`,{class:`component-demo-view__section-title`},`圆点样式`,-1),s(`div`,S,[i(n(f),{isDot:``},{default:e(()=>[...a[12]||=[s(`div`,{class:`demo-box`},`消息`,-1)]]),_:1}),i(n(f),{isDot:``},{default:e(()=>[...a[13]||=[s(`div`,{class:`demo-box`},`通知`,-1)]]),_:1}),i(n(f),{isDot:``},{default:e(()=>[...a[14]||=[s(`div`,{class:`demo-box`},`状态`,-1)]]),_:1})]),s(`div`,C,[i(p,{code:U,language:`vue`,title:`示例代码`})])]),s(`section`,w,[a[21]||=s(`h2`,{class:`component-demo-view__section-title`},`不同类型`,-1),s(`div`,T,[i(n(f),{value:12,type:`primary`},{default:e(()=>[...a[16]||=[s(`div`,{class:`demo-box`},`主要`,-1)]]),_:1}),i(n(f),{value:3,type:`success`},{default:e(()=>[...a[17]||=[s(`div`,{class:`demo-box`},`成功`,-1)]]),_:1}),i(n(f),{value:5,type:`warning`},{default:e(()=>[...a[18]||=[s(`div`,{class:`demo-box`},`警告`,-1)]]),_:1}),i(n(f),{value:8,type:`danger`},{default:e(()=>[...a[19]||=[s(`div`,{class:`demo-box`},`危险`,-1)]]),_:1}),i(n(f),{value:1,type:`info`},{default:e(()=>[...a[20]||=[s(`div`,{class:`demo-box`},`信息`,-1)]]),_:1})]),s(`div`,E,[i(p,{code:W,language:`vue`,title:`示例代码`})])]),s(`section`,D,[a[26]||=s(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),s(`div`,O,[i(n(f),{value:12,color:`#67c23a`},{default:e(()=>[...a[22]||=[s(`div`,{class:`demo-box`},`绿色`,-1)]]),_:1}),i(n(f),{value:5,color:`#e6a23c`},{default:e(()=>[...a[23]||=[s(`div`,{class:`demo-box`},`橙色`,-1)]]),_:1}),i(n(f),{value:8,color:`#f56c6c`},{default:e(()=>[...a[24]||=[s(`div`,{class:`demo-box`},`红色`,-1)]]),_:1}),i(n(f),{value:3,color:`#909399`},{default:e(()=>[...a[25]||=[s(`div`,{class:`demo-box`},`灰色`,-1)]]),_:1})]),s(`div`,k,[i(p,{code:G,language:`vue`,title:`示例代码`})])]),s(`section`,A,[a[30]||=s(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),s(`div`,j,[i(n(f),{value:12,size:`small`},{default:e(()=>[...a[27]||=[s(`div`,{class:`demo-box`},`小`,-1)]]),_:1}),i(n(f),{value:12,size:`medium`},{default:e(()=>[...a[28]||=[s(`div`,{class:`demo-box`},`中`,-1)]]),_:1}),i(n(f),{value:12,size:`large`},{default:e(()=>[...a[29]||=[s(`div`,{class:`demo-box`},`大`,-1)]]),_:1})]),s(`div`,M,[i(p,{code:K,language:`vue`,title:`示例代码`})])]),s(`section`,N,[a[35]||=s(`h2`,{class:`component-demo-view__section-title`},`动态数值`,-1),s(`div`,P,[i(n(f),{value:c.value},{default:e(()=>[...a[31]||=[s(`div`,{class:`demo-box`},`计数器`,-1)]]),_:1},8,[`value`])]),s(`div`,F,[i(n(d),{onClick:a[0]||=e=>c.value--},{default:e(()=>[...a[32]||=[l(`减少`,-1)]]),_:1}),i(n(d),{type:`primary`,onClick:a[1]||=e=>c.value++},{default:e(()=>[...a[33]||=[l(`增加`,-1)]]),_:1}),i(n(d),{type:`danger`,onClick:a[2]||=e=>c.value=0},{default:e(()=>[...a[34]||=[l(`重置`,-1)]]),_:1})]),s(`div`,I,[i(p,{code:q,language:`vue`,title:`示例代码`})])]),s(`section`,L,[a[37]||=s(`h2`,{class:`component-demo-view__section-title`},`隐藏徽标`,-1),s(`div`,R,[i(n(f),{value:12,hidden:Y.value},{default:e(()=>[...a[36]||=[s(`div`,{class:`demo-box`},`消息`,-1)]]),_:1},8,[`hidden`])]),s(`div`,z,[i(n(d),{onClick:a[3]||=e=>Y.value=!Y.value},{default:e(()=>[l(o(Y.value?`显示徽标`:`隐藏徽标`),1)]),_:1})]),s(`div`,B,[i(p,{code:J,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-879c6d15`]]);export{Y as default};
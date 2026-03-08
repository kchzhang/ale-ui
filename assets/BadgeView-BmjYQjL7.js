import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,S as r,U as i,b as a,h as o,j as s,r as c,v as l,x as u,z as d}from"./index-D6beBo5R.js";import{t as f}from"./button-CbFeg90j.js";import{t as p}from"./badge-nE4H8H40.js";var m={class:`component-demo-view`},h={class:`component-demo-view__section`},g={class:`component-demo-view__demo`},_={class:`component-demo-view__code`},v={class:`component-demo-view__section`},y={class:`component-demo-view__demo`},b={class:`component-demo-view__code`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo`},F={class:`component-demo-view__controls`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`},z={class:`component-demo-view__controls`},B={class:`component-demo-view__code`},V=`<template>
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
<\/script>`,Y=c(r({__name:`BadgeView`,setup(r){let c=i(12),Y=i(!1);return(r,i)=>(s(),l(`div`,m,[i[38]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Badge 徽标`),o(`p`,{class:`component-demo-view__description`},` 用于显示数量、状态或标记信息的徽标组件 `)],-1),o(`section`,h,[i[7]||=o(`h2`,{class:`component-demo-view__section-title`},`基本用法`,-1),o(`div`,g,[u(t(p),{value:12},{default:d(()=>[...i[4]||=[o(`div`,{class:`demo-box`},`消息`,-1)]]),_:1}),u(t(p),{value:5},{default:d(()=>[...i[5]||=[o(`div`,{class:`demo-box`},`通知`,-1)]]),_:1}),u(t(p),{value:3},{default:d(()=>[...i[6]||=[o(`div`,{class:`demo-box`},`任务`,-1)]]),_:1})]),o(`div`,_,[u(e,{code:V,language:`vue`,title:`示例代码`})])]),o(`section`,v,[i[11]||=o(`h2`,{class:`component-demo-view__section-title`},`最大值`,-1),o(`div`,y,[u(t(p),{value:99,max:99},{default:d(()=>[...i[8]||=[o(`div`,{class:`demo-box`},`正常`,-1)]]),_:1}),u(t(p),{value:200,max:99},{default:d(()=>[...i[9]||=[o(`div`,{class:`demo-box`},`超出`,-1)]]),_:1}),u(t(p),{value:1e3,max:999},{default:d(()=>[...i[10]||=[o(`div`,{class:`demo-box`},`大数`,-1)]]),_:1})]),o(`div`,b,[u(e,{code:H,language:`vue`,title:`示例代码`})])]),o(`section`,x,[i[15]||=o(`h2`,{class:`component-demo-view__section-title`},`圆点样式`,-1),o(`div`,S,[u(t(p),{isDot:``},{default:d(()=>[...i[12]||=[o(`div`,{class:`demo-box`},`消息`,-1)]]),_:1}),u(t(p),{isDot:``},{default:d(()=>[...i[13]||=[o(`div`,{class:`demo-box`},`通知`,-1)]]),_:1}),u(t(p),{isDot:``},{default:d(()=>[...i[14]||=[o(`div`,{class:`demo-box`},`状态`,-1)]]),_:1})]),o(`div`,C,[u(e,{code:U,language:`vue`,title:`示例代码`})])]),o(`section`,w,[i[21]||=o(`h2`,{class:`component-demo-view__section-title`},`不同类型`,-1),o(`div`,T,[u(t(p),{value:12,type:`primary`},{default:d(()=>[...i[16]||=[o(`div`,{class:`demo-box`},`主要`,-1)]]),_:1}),u(t(p),{value:3,type:`success`},{default:d(()=>[...i[17]||=[o(`div`,{class:`demo-box`},`成功`,-1)]]),_:1}),u(t(p),{value:5,type:`warning`},{default:d(()=>[...i[18]||=[o(`div`,{class:`demo-box`},`警告`,-1)]]),_:1}),u(t(p),{value:8,type:`danger`},{default:d(()=>[...i[19]||=[o(`div`,{class:`demo-box`},`危险`,-1)]]),_:1}),u(t(p),{value:1,type:`info`},{default:d(()=>[...i[20]||=[o(`div`,{class:`demo-box`},`信息`,-1)]]),_:1})]),o(`div`,E,[u(e,{code:W,language:`vue`,title:`示例代码`})])]),o(`section`,D,[i[26]||=o(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),o(`div`,O,[u(t(p),{value:12,color:`#67c23a`},{default:d(()=>[...i[22]||=[o(`div`,{class:`demo-box`},`绿色`,-1)]]),_:1}),u(t(p),{value:5,color:`#e6a23c`},{default:d(()=>[...i[23]||=[o(`div`,{class:`demo-box`},`橙色`,-1)]]),_:1}),u(t(p),{value:8,color:`#f56c6c`},{default:d(()=>[...i[24]||=[o(`div`,{class:`demo-box`},`红色`,-1)]]),_:1}),u(t(p),{value:3,color:`#909399`},{default:d(()=>[...i[25]||=[o(`div`,{class:`demo-box`},`灰色`,-1)]]),_:1})]),o(`div`,k,[u(e,{code:G,language:`vue`,title:`示例代码`})])]),o(`section`,A,[i[30]||=o(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),o(`div`,j,[u(t(p),{value:12,size:`small`},{default:d(()=>[...i[27]||=[o(`div`,{class:`demo-box`},`小`,-1)]]),_:1}),u(t(p),{value:12,size:`medium`},{default:d(()=>[...i[28]||=[o(`div`,{class:`demo-box`},`中`,-1)]]),_:1}),u(t(p),{value:12,size:`large`},{default:d(()=>[...i[29]||=[o(`div`,{class:`demo-box`},`大`,-1)]]),_:1})]),o(`div`,M,[u(e,{code:K,language:`vue`,title:`示例代码`})])]),o(`section`,N,[i[35]||=o(`h2`,{class:`component-demo-view__section-title`},`动态数值`,-1),o(`div`,P,[u(t(p),{value:c.value},{default:d(()=>[...i[31]||=[o(`div`,{class:`demo-box`},`计数器`,-1)]]),_:1},8,[`value`])]),o(`div`,F,[u(t(f),{onClick:i[0]||=e=>c.value--},{default:d(()=>[...i[32]||=[a(`减少`,-1)]]),_:1}),u(t(f),{type:`primary`,onClick:i[1]||=e=>c.value++},{default:d(()=>[...i[33]||=[a(`增加`,-1)]]),_:1}),u(t(f),{type:`danger`,onClick:i[2]||=e=>c.value=0},{default:d(()=>[...i[34]||=[a(`重置`,-1)]]),_:1})]),o(`div`,I,[u(e,{code:q,language:`vue`,title:`示例代码`})])]),o(`section`,L,[i[37]||=o(`h2`,{class:`component-demo-view__section-title`},`隐藏徽标`,-1),o(`div`,R,[u(t(p),{value:12,hidden:Y.value},{default:d(()=>[...i[36]||=[o(`div`,{class:`demo-box`},`消息`,-1)]]),_:1},8,[`hidden`])]),o(`div`,z,[u(t(f),{onClick:i[3]||=e=>Y.value=!Y.value},{default:d(()=>[a(n(Y.value?`显示徽标`:`隐藏徽标`),1)]),_:1})]),o(`div`,B,[u(e,{code:J,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-879c6d15`]]);export{Y as default};
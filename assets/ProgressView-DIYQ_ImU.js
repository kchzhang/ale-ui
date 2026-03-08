import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,K as r,S as i,U as a,_ as o,b as s,f as c,h as l,j as u,m as d,q as f,r as p,v as m,x as h,z as g}from"./index-D6beBo5R.js";import{t as _}from"./button-CbFeg90j.js";var v={class:`ale-progress-bar`},y={key:0,class:`ale-progress__text`},b={key:0},x={key:1,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},S={key:2,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},C={key:3,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},w={viewBox:`0 0 100 100`},T=[`r`,`stroke-width`],ee=[`r`,`stroke-width`,`stroke`,`stroke-linecap`,`stroke-dasharray`,`stroke-dashoffset`],E={key:0,class:`ale-progress-circle__text`},D={key:0},O={key:1,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2.5`,"stroke-linecap":`round`,"stroke-linejoin":`round`},k={key:2,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},A={key:3,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`};const j=i({__name:`Progress`,props:{percentage:{default:0},type:{default:`line`},strokeWidth:{default:6},showText:{type:Boolean,default:!0},color:{},width:{default:126},status:{default:``},striped:{type:Boolean,default:!1},stripedFlow:{type:Boolean,default:!1}},setup(e,{expose:t}){let i=e,a=d(()=>[`ale-progress`,`ale-progress--${i.type}`,{[`is-${i.status}`]:i.status}]),s=d(()=>({"is-striped":i.striped&&!i.stripedFlow,"is-striped-flow":i.stripedFlow})),p=d(()=>({})),h=d(()=>`${Math.round(i.percentage)}%`),g=d(()=>({height:`${i.strokeWidth}px`,borderRadius:`${i.strokeWidth/2}px`})),_=d(()=>({width:`${i.percentage}%`,backgroundColor:M.value,borderRadius:`${i.strokeWidth/2}px`})),j=d(()=>({transition:`stroke-dashoffset 0.3s ease`})),M=d(()=>typeof i.color==`function`?i.color(i.percentage):i.color?i.color:i.status===`success`?`var(--color-success)`:i.status===`warning`?`var(--color-warning)`:i.status===`danger`?`var(--color-danger)`:`var(--color-primary)`),N=d(()=>i.strokeWidth/i.width*100),P=d(()=>50-N.value/2),F=d(()=>2*Math.PI*P.value),I=d(()=>F.value.toString()),L=d(()=>F.value*((100-i.percentage)/100)*-1),R=d(()=>`round`);return t({getPercentage:()=>i.percentage}),(t,i)=>(u(),m(`div`,{class:r(a.value)},[e.type===`line`?(u(),m(c,{key:0},[l(`div`,v,[l(`div`,{class:`ale-progress-bar__outer`,style:f(g.value)},[l(`div`,{class:r([`ale-progress-bar__inner`,s.value]),style:f(_.value)},null,6)],4)]),e.showText?(u(),m(`span`,y,[e.status?e.status===`success`?(u(),m(`svg`,x,[...i[0]||=[l(`polyline`,{points:`4 12 9 17 20 6`},null,-1)]])):e.status===`warning`?(u(),m(`svg`,S,[...i[1]||=[l(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`},null,-1),l(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`},null,-1),l(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`},null,-1)]])):e.status===`danger`?(u(),m(`svg`,C,[...i[2]||=[l(`circle`,{cx:`12`,cy:`12`,r:`10`},null,-1),l(`line`,{x1:`15`,y1:`9`,x2:`9`,y2:`15`},null,-1),l(`line`,{x1:`9`,y1:`9`,x2:`15`,y2:`15`},null,-1)]])):o(``,!0):(u(),m(`span`,b,n(h.value),1))])):o(``,!0)],64)):(u(),m(`div`,{key:1,class:`ale-progress-circle`,style:f({width:`${e.width}px`,height:`${e.width}px`})},[(u(),m(`svg`,w,[l(`circle`,{class:`ale-progress-circle__track`,cx:`50`,cy:`50`,r:P.value,fill:`none`,"stroke-width":N.value},null,8,T),l(`circle`,{class:r([`ale-progress-circle__path`,p.value]),cx:`50`,cy:`50`,r:P.value,fill:`none`,"stroke-width":N.value,stroke:M.value,"stroke-linecap":R.value,"stroke-dasharray":I.value,"stroke-dashoffset":L.value,style:f(j.value)},null,14,ee)])),e.showText?(u(),m(`div`,E,[e.status?e.status===`success`?(u(),m(`svg`,O,[...i[3]||=[l(`polyline`,{points:`4 12 9 17 20 6`},null,-1)]])):e.status===`warning`?(u(),m(`svg`,k,[...i[4]||=[l(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`},null,-1),l(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`},null,-1),l(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`},null,-1)]])):e.status===`danger`?(u(),m(`svg`,A,[...i[5]||=[l(`circle`,{cx:`12`,cy:`12`,r:`10`},null,-1),l(`line`,{x1:`15`,y1:`9`,x2:`9`,y2:`15`},null,-1),l(`line`,{x1:`9`,y1:`9`,x2:`15`,y2:`15`},null,-1)]])):o(``,!0):(u(),m(`span`,D,n(h.value),1))])):o(``,!0)],4))],2))}});var M={class:`component-demo-view`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo progress-demo`},F={class:`component-demo-view__code`},I={class:`component-demo-view__section`},L={class:`component-demo-view__demo progress-demo`},R={class:`component-demo-view__code`},z={class:`component-demo-view__section`},B={class:`component-demo-view__demo progress-demo`},V={class:`component-demo-view__demo`,style:{"margin-top":`16px`}},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo progress-demo`},G={class:`component-demo-view__code`},te={class:`component-demo-view__section`},K={class:`component-demo-view__demo progress-demo`},q={class:`component-demo-view__code`},J={class:`component-demo-view__section`},Y={class:`component-demo-view__demo progress-demo`},X={class:`component-demo-view__code`},Z={class:`component-demo-view__section`},Q={class:`component-demo-view__demo`,style:{gap:`32px`}},ne={class:`component-demo-view__code`},re={class:`component-demo-view__section`},ie={class:`component-demo-view__demo`,style:{gap:`32px`}},$={class:`component-demo-view__code`},ae=`#ff6b6b`,oe=`<template>
  <AleProgress :percentage="50" />
  <AleProgress :percentage="75" />
  <AleProgress :percentage="100" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`,se=`<template>
  <AleProgress :percentage="70" />
  <AleProgress :percentage="100" status="success" />
  <AleProgress :percentage="70" status="warning" />
  <AleProgress :percentage="50" status="danger" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`,ce=`<template>
  <AleProgress :percentage="percentage" :color="customColor" />
  <AleProgress :percentage="percentage" :color="colorFunction" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleProgress } from 'ale-ui';

const percentage = ref(30);

const customColor = '#ff6b6b';

const colorFunction = (percentage: number) => {
  if (percentage < 30) return '#ff6b6b';
  if (percentage < 70) return '#ffd93d';
  return '#6bcb77';
};
<\/script>`,le=`<template>
  <AleProgress :percentage="70" striped />
  <AleProgress :percentage="70" striped-flow />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`,ue=`<template>
  <AleProgress :percentage="50" :stroke-width="8" />
  <AleProgress :percentage="50" :stroke-width="12" />
  <AleProgress :percentage="50" :stroke-width="20" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`,de=`<template>
  <AleProgress :percentage="50" :show-text="false" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`,fe=`<template>
  <AleProgress type="circle" :percentage="25" />
  <AleProgress type="circle" :percentage="50" />
  <AleProgress type="circle" :percentage="75" />
  <AleProgress type="circle" :percentage="100" status="success" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`,pe=`<template>
  <AleProgress type="circle" :percentage="50" :width="80" />
  <AleProgress type="circle" :percentage="50" :width="120" />
  <AleProgress type="circle" :percentage="50" :width="160" />
</template>

<script setup lang="ts">
import { AleProgress } from 'ale-ui';
<\/script>`,me=p(i({__name:`ProgressView`,setup(n){let r=a(30),i=e=>e<30?`#ff6b6b`:e<70?`#ffd93d`:`#6bcb77`,o=()=>{r.value=Math.max(0,r.value-10)},c=()=>{r.value=Math.min(100,r.value+10)};return(n,a)=>(u(),m(`div`,M,[a[10]||=l(`div`,{class:`component-demo-view__header`},[l(`h1`,{class:`component-demo-view__title`},`Progress 进度条`),l(`p`,{class:`component-demo-view__description`},` 用于展示操作进度或数据占比的进度条组件 `)],-1),l(`section`,N,[a[0]||=l(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),l(`div`,P,[h(t(j),{percentage:50}),h(t(j),{percentage:75}),h(t(j),{percentage:100})]),l(`div`,F,[h(e,{code:oe,language:`vue`,title:`示例代码`})])]),l(`section`,I,[a[1]||=l(`h2`,{class:`component-demo-view__section-title`},`不同状态`,-1),l(`div`,L,[h(t(j),{percentage:70}),h(t(j),{percentage:100,status:`success`}),h(t(j),{percentage:70,status:`warning`}),h(t(j),{percentage:50,status:`danger`})]),l(`div`,R,[h(e,{code:se,language:`vue`,title:`示例代码`})])]),l(`section`,z,[a[4]||=l(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),l(`div`,B,[h(t(j),{percentage:r.value,color:ae},null,8,[`percentage`]),h(t(j),{percentage:r.value,color:i},null,8,[`percentage`])]),l(`div`,V,[h(t(_),{size:`small`,onClick:o},{default:g(()=>[...a[2]||=[s(`减少`,-1)]]),_:1}),h(t(_),{size:`small`,onClick:c,style:{"margin-left":`8px`}},{default:g(()=>[...a[3]||=[s(`增加`,-1)]]),_:1})]),l(`div`,H,[h(e,{code:ce,language:`vue`,title:`示例代码`})])]),l(`section`,U,[a[5]||=l(`h2`,{class:`component-demo-view__section-title`},`条纹效果`,-1),l(`div`,W,[h(t(j),{percentage:70,striped:``}),h(t(j),{percentage:70,"striped-flow":``})]),l(`div`,G,[h(e,{code:le,language:`vue`,title:`示例代码`})])]),l(`section`,te,[a[6]||=l(`h2`,{class:`component-demo-view__section-title`},`自定义高度`,-1),l(`div`,K,[h(t(j),{percentage:50,"stroke-width":8}),h(t(j),{percentage:50,"stroke-width":12}),h(t(j),{percentage:50,"stroke-width":20})]),l(`div`,q,[h(e,{code:ue,language:`vue`,title:`示例代码`})])]),l(`section`,J,[a[7]||=l(`h2`,{class:`component-demo-view__section-title`},`隐藏文字`,-1),l(`div`,Y,[h(t(j),{percentage:50,"show-text":!1})]),l(`div`,X,[h(e,{code:de,language:`vue`,title:`示例代码`})])]),l(`section`,Z,[a[8]||=l(`h2`,{class:`component-demo-view__section-title`},`环形进度条`,-1),l(`div`,Q,[h(t(j),{type:`circle`,percentage:25}),h(t(j),{type:`circle`,percentage:50}),h(t(j),{type:`circle`,percentage:75}),h(t(j),{type:`circle`,percentage:100,status:`success`})]),l(`div`,ne,[h(e,{code:fe,language:`vue`,title:`示例代码`})])]),l(`section`,re,[a[9]||=l(`h2`,{class:`component-demo-view__section-title`},`环形进度条尺寸`,-1),l(`div`,ie,[h(t(j),{type:`circle`,percentage:50,width:80}),h(t(j),{type:`circle`,percentage:50,width:120}),h(t(j),{type:`circle`,percentage:50,width:160})]),l(`div`,$,[h(e,{code:pe,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-87dd013b`]]);export{me as default};
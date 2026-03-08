import{B as e,C as t,J as n,K as r,M as i,S as a,W as o,Y as s,g as c,h as l,i as u,p as d,q as f,v as p,x as m,y as h}from"./index-B3Jx3uix.js";import{t as g}from"./button-GOPf8Q2w.js";import{t as _}from"./CodeBlock-CE4Cu_o1.js";var v={class:`ale-progress-bar`},y={key:0,class:`ale-progress__text`},b={key:0},x={key:1,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`},S={key:2,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},C={key:3,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},w={viewBox:`0 0 100 100`},ee=[`r`,`stroke-width`],T=[`r`,`stroke-width`,`stroke`,`stroke-linecap`,`stroke-dasharray`,`stroke-dashoffset`],E={key:0,class:`ale-progress-circle__text`},D={key:0},O={key:1,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2.5`,"stroke-linecap":`round`,"stroke-linejoin":`round`},k={key:2,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},A={key:3,class:`ale-progress__icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`};const j=t({__name:`Progress`,props:{percentage:{default:0},type:{default:`line`},strokeWidth:{default:6},showText:{type:Boolean,default:!0},color:{},width:{default:126},status:{default:``},striped:{type:Boolean,default:!1},stripedFlow:{type:Boolean,default:!1}},setup(e,{expose:t}){let r=e,a=l(()=>[`ale-progress`,`ale-progress--${r.type}`,{[`is-${r.status}`]:r.status}]),o=l(()=>({"is-striped":r.striped&&!r.stripedFlow,"is-striped-flow":r.stripedFlow})),u=l(()=>({})),m=l(()=>`${Math.round(r.percentage)}%`),g=l(()=>({height:`${r.strokeWidth}px`,borderRadius:`${r.strokeWidth/2}px`})),_=l(()=>({width:`${r.percentage}%`,backgroundColor:M.value,borderRadius:`${r.strokeWidth/2}px`})),j=l(()=>({transition:`stroke-dashoffset 0.3s ease`})),M=l(()=>typeof r.color==`function`?r.color(r.percentage):r.color?r.color:r.status===`success`?`var(--color-success)`:r.status===`warning`?`var(--color-warning)`:r.status===`danger`?`var(--color-danger)`:`var(--color-primary)`),N=l(()=>r.strokeWidth/r.width*100),P=l(()=>50-N.value/2),F=l(()=>2*Math.PI*P.value),I=l(()=>F.value.toString()),L=l(()=>F.value*((100-r.percentage)/100)*-1),R=l(()=>`round`);return t({getPercentage:()=>r.percentage}),(t,r)=>(i(),h(`div`,{class:f(a.value)},[e.type===`line`?(i(),h(d,{key:0},[c(`div`,v,[c(`div`,{class:`ale-progress-bar__outer`,style:n(g.value)},[c(`div`,{class:f([`ale-progress-bar__inner`,o.value]),style:n(_.value)},null,6)],4)]),e.showText?(i(),h(`span`,y,[e.status?e.status===`success`?(i(),h(`svg`,x,[...r[0]||=[c(`polyline`,{points:`4 12 9 17 20 6`},null,-1)]])):e.status===`warning`?(i(),h(`svg`,S,[...r[1]||=[c(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`},null,-1),c(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`},null,-1),c(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`},null,-1)]])):e.status===`danger`?(i(),h(`svg`,C,[...r[2]||=[c(`circle`,{cx:`12`,cy:`12`,r:`10`},null,-1),c(`line`,{x1:`15`,y1:`9`,x2:`9`,y2:`15`},null,-1),c(`line`,{x1:`9`,y1:`9`,x2:`15`,y2:`15`},null,-1)]])):p(``,!0):(i(),h(`span`,b,s(m.value),1))])):p(``,!0)],64)):(i(),h(`div`,{key:1,class:`ale-progress-circle`,style:n({width:`${e.width}px`,height:`${e.width}px`})},[(i(),h(`svg`,w,[c(`circle`,{class:`ale-progress-circle__track`,cx:`50`,cy:`50`,r:P.value,fill:`none`,"stroke-width":N.value},null,8,ee),c(`circle`,{class:f([`ale-progress-circle__path`,u.value]),cx:`50`,cy:`50`,r:P.value,fill:`none`,"stroke-width":N.value,stroke:M.value,"stroke-linecap":R.value,"stroke-dasharray":I.value,"stroke-dashoffset":L.value,style:n(j.value)},null,14,T)])),e.showText?(i(),h(`div`,E,[e.status?e.status===`success`?(i(),h(`svg`,O,[...r[3]||=[c(`polyline`,{points:`4 12 9 17 20 6`},null,-1)]])):e.status===`warning`?(i(),h(`svg`,k,[...r[4]||=[c(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`},null,-1),c(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`},null,-1),c(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`},null,-1)]])):e.status===`danger`?(i(),h(`svg`,A,[...r[5]||=[c(`circle`,{cx:`12`,cy:`12`,r:`10`},null,-1),c(`line`,{x1:`15`,y1:`9`,x2:`9`,y2:`15`},null,-1),c(`line`,{x1:`9`,y1:`9`,x2:`15`,y2:`15`},null,-1)]])):p(``,!0):(i(),h(`span`,D,s(m.value),1))])):p(``,!0)],4))],2))}});var M={class:`component-demo-view`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo progress-demo`},F={class:`component-demo-view__code`},I={class:`component-demo-view__section`},L={class:`component-demo-view__demo progress-demo`},R={class:`component-demo-view__code`},z={class:`component-demo-view__section`},B={class:`component-demo-view__demo progress-demo`},V={class:`component-demo-view__demo`,style:{"margin-top":`16px`}},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo progress-demo`},te={class:`component-demo-view__code`},G={class:`component-demo-view__section`},K={class:`component-demo-view__demo progress-demo`},q={class:`component-demo-view__code`},J={class:`component-demo-view__section`},Y={class:`component-demo-view__demo progress-demo`},X={class:`component-demo-view__code`},Z={class:`component-demo-view__section`},Q={class:`component-demo-view__demo`,style:{gap:`32px`}},ne={class:`component-demo-view__code`},re={class:`component-demo-view__section`},ie={class:`component-demo-view__demo`,style:{gap:`32px`}},$={class:`component-demo-view__code`},ae=`#ff6b6b`,oe=`<template>
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
<\/script>`,me=u(t({__name:`ProgressView`,setup(t){let n=o(30),s=e=>e<30?`#ff6b6b`:e<70?`#ffd93d`:`#6bcb77`,l=()=>{n.value=Math.max(0,n.value-10)},u=()=>{n.value=Math.min(100,n.value+10)};return(t,o)=>(i(),h(`div`,M,[o[10]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Progress 进度条`),c(`p`,{class:`component-demo-view__description`},` 用于展示操作进度或数据占比的进度条组件 `)],-1),c(`section`,N,[o[0]||=c(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),c(`div`,P,[a(r(j),{percentage:50}),a(r(j),{percentage:75}),a(r(j),{percentage:100})]),c(`div`,F,[a(_,{code:oe,language:`vue`,title:`示例代码`})])]),c(`section`,I,[o[1]||=c(`h2`,{class:`component-demo-view__section-title`},`不同状态`,-1),c(`div`,L,[a(r(j),{percentage:70}),a(r(j),{percentage:100,status:`success`}),a(r(j),{percentage:70,status:`warning`}),a(r(j),{percentage:50,status:`danger`})]),c(`div`,R,[a(_,{code:se,language:`vue`,title:`示例代码`})])]),c(`section`,z,[o[4]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),c(`div`,B,[a(r(j),{percentage:n.value,color:ae},null,8,[`percentage`]),a(r(j),{percentage:n.value,color:s},null,8,[`percentage`])]),c(`div`,V,[a(r(g),{size:`small`,onClick:l},{default:e(()=>[...o[2]||=[m(`减少`,-1)]]),_:1}),a(r(g),{size:`small`,onClick:u,style:{"margin-left":`8px`}},{default:e(()=>[...o[3]||=[m(`增加`,-1)]]),_:1})]),c(`div`,H,[a(_,{code:ce,language:`vue`,title:`示例代码`})])]),c(`section`,U,[o[5]||=c(`h2`,{class:`component-demo-view__section-title`},`条纹效果`,-1),c(`div`,W,[a(r(j),{percentage:70,striped:``}),a(r(j),{percentage:70,"striped-flow":``})]),c(`div`,te,[a(_,{code:le,language:`vue`,title:`示例代码`})])]),c(`section`,G,[o[6]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义高度`,-1),c(`div`,K,[a(r(j),{percentage:50,"stroke-width":8}),a(r(j),{percentage:50,"stroke-width":12}),a(r(j),{percentage:50,"stroke-width":20})]),c(`div`,q,[a(_,{code:ue,language:`vue`,title:`示例代码`})])]),c(`section`,J,[o[7]||=c(`h2`,{class:`component-demo-view__section-title`},`隐藏文字`,-1),c(`div`,Y,[a(r(j),{percentage:50,"show-text":!1})]),c(`div`,X,[a(_,{code:de,language:`vue`,title:`示例代码`})])]),c(`section`,Z,[o[8]||=c(`h2`,{class:`component-demo-view__section-title`},`环形进度条`,-1),c(`div`,Q,[a(r(j),{type:`circle`,percentage:25}),a(r(j),{type:`circle`,percentage:50}),a(r(j),{type:`circle`,percentage:75}),a(r(j),{type:`circle`,percentage:100,status:`success`})]),c(`div`,ne,[a(_,{code:fe,language:`vue`,title:`示例代码`})])]),c(`section`,re,[o[9]||=c(`h2`,{class:`component-demo-view__section-title`},`环形进度条尺寸`,-1),c(`div`,ie,[a(r(j),{type:`circle`,percentage:50,width:80}),a(r(j),{type:`circle`,percentage:50,width:120}),a(r(j),{type:`circle`,percentage:50,width:160})]),c(`div`,$,[a(_,{code:pe,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-87dd013b`]]);export{me as default};
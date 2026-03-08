import{B as e,C as t,K as n,M as r,P as i,S as a,W as o,Y as s,g as c,i as l,k as ee,p as u,q as te,v as d,x as f,y as p}from"./index-B3Jx3uix.js";import{t as m}from"./button-GOPf8Q2w.js";import"./Loading-D6tGBeoJ.js";import{t as ne}from"./loading-CJUMNUeU.js";import"./Scroll-uf_8gSTA.js";import{t as h}from"./scroll-BRb_6MJw.js";import{t as g}from"./CodeBlock-CE4Cu_o1.js";var re={class:`component-demo-view`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},oe={class:`demo-content`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo demo-themes`},_={class:`theme-item`},v={class:`demo-content`},y={class:`theme-item`},b={class:`demo-content`},x={class:`theme-item theme-dark`},S={class:`demo-content dark-content`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo demo-sizes`},E={class:`size-item`},D={class:`demo-content`},O={class:`size-item`},k={class:`demo-content`},A={class:`size-item`},j={class:`demo-content`},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo demo-directions`},F={class:`direction-item`},I={class:`demo-content`},L={class:`direction-item`},R={class:`demo-content horizontal-content`},z={class:`direction-item`},B={class:`demo-content both-content`},V={class:`component-demo-view__code`},H={class:`component-demo-view__section`},U={class:`component-demo-view__demo`},W={class:`layout-demo`},ue={class:`layout-item`},de={class:`demo-content`},fe={class:`layout-item`},pe={class:`demo-content`},me={class:`component-demo-view__code`},he={class:`component-demo-view__section`},ge={class:`component-demo-view__demo`},_e={class:`demo-content`},ve={class:`component-demo-view__code`},ye={class:`component-demo-view__section`},be={class:`component-demo-view__demo`},G={class:`demo-content`},xe={class:`component-demo-view__code`},Se={class:`component-demo-view__section`},Ce={class:`component-demo-view__demo`},we={class:`control-buttons`},Te={class:`demo-content`},Ee={class:`scroll-info`},De={class:`component-demo-view__code`},Oe={class:`component-demo-view__section`},ke={class:`component-demo-view__demo`},Ae={class:`demo-content`},je={class:`item-index`},Me={class:`item-text`},Ne={key:0,class:`loading-indicator`},Pe={key:1,class:`finished-indicator`},Fe={class:`component-demo-view__code`},Ie={class:`component-demo-view__section`},Le={class:`component-demo-view__demo`},Re={class:`performance-info`},ze={class:`demo-content`},Be={class:`component-demo-view__code`},Ve=`<template>
  <AleScroll height="200px">
    <div class="content">
      <p v-for="i in 20" :key="i">
        这是第 {{ i }} 行内容
      </p>
    </div>
  </AleScroll>
</template>

<script setup lang="ts">
import { AleScroll } from 'ale-ui';
<\/script>`,He=`<template>
  <!-- Default 主题 -->
  <AleScroll height="150px" theme="default">
    <div class="content">...</div>
  </AleScroll>

  <!-- Primary 主题 -->
  <AleScroll height="150px" theme="primary">
    <div class="content">...</div>
  </AleScroll>

  <!-- Dark 主题 -->
  <AleScroll height="150px" theme="dark">
    <div class="content">...</div>
  </AleScroll>
</template>`,Ue=`<template>
  <AleScroll height="120px" size="small">...</AleScroll>
  <AleScroll height="120px" size="medium">...</AleScroll>
  <AleScroll height="120px" size="large">...</AleScroll>
</template>`,We=`<template>
  <!-- 垂直滚动 -->
  <AleScroll height="150px" direction="vertical">...</AleScroll>

  <!-- 水平滚动 -->
  <AleScroll direction="horizontal">...</AleScroll>

  <!-- 双向滚动 -->
  <AleScroll height="150px" direction="both">...</AleScroll>
</template>`,Ge=`<template>
  <AleScroll height="150px" always>
    <div class="content">...</div>
  </AleScroll>
</template>`,Ke=`<template>
  <AleScroll height="150px" native>
    <div class="content">...</div>
  </AleScroll>
</template>`,qe=`<template>
  <AleButton @click="scrollToTop">滚动到顶部</AleButton>
  <AleButton @click="scrollToBottom">滚动到底部</AleButton>
  
  <AleScroll ref="scrollRef" height="200px" @scroll="handleScroll">
    <div class="content">...</div>
  </AleScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ScrollExpose, ScrollPosition } from 'ale-ui';

const scrollRef = ref<ScrollExpose | null>(null);

const scrollToTop = () => scrollRef.value?.scrollToTop();
const scrollToBottom = () => scrollRef.value?.scrollToBottom();
const handleScroll = (position: ScrollPosition) => {
  console.log('滚动位置:', position);
};
<\/script>`,Je=`<template>
  <AleScroll
    height="250px"
    :load-offset="20"
    @load-more="handleLoadMore"
  >
    <div class="content">
      <div v-for="(item, index) in items" :key="index">
        {{ item }}
      </div>
      <div v-if="loading">加载中...</div>
      <div v-if="finished">没有更多数据了</div>
    </div>
  </AleScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([]);
const loading = ref(false);
const finished = ref(false);

const handleLoadMore = () => {
  if (loading.value || finished.value) return;
  loading.value = true;
  // 加载数据...
};
<\/script>`,Ye=`<template>
  <AleScroll height="300px">
    <div class="content">
      <p v-for="i in 10000" :key="i">
        数据行 {{ i }}
      </p>
    </div>
  </AleScroll>
</template>`,Xe=`<template>
  <!-- 悬停显示滚动条 - 不影响布局 -->
  <AleScroll height="150px">
    <div class="content">...</div>
  </AleScroll>

  <!-- 始终显示滚动条 - 不影响布局 -->
  <AleScroll height="150px" always>
    <div class="content">...</div>
  </AleScroll>
</template>`,K=l(t({__name:`ScrollView`,setup(t){let l=o(null),K=o({scrollTop:0,scrollLeft:0}),Ze=()=>{l.value?.scrollToTop()},Qe=()=>{l.value?.scrollToBottom()},$e=()=>{let e=l.value?.getScrollSize();e&&l.value?.scrollTo({top:e.scrollHeight/2-e.clientHeight/2,behavior:`smooth`})},et=e=>{K.value=e},q=o([]),J=o(!1),Y=o(!1),X=0,Z=e=>Array.from({length:e},(e,t)=>`数据项 ${X*20+t+1} - ${$()}`),tt=()=>{J.value||Y.value||(J.value=!0,setTimeout(()=>{X++;let e=Z(20);q.value.push(...e),J.value=!1,X>=5&&(Y.value=!0)},1e3))},nt=()=>{console.log(`滚动到底部`)},Q=o(1e3),rt=()=>{Q.value+=1e3},$=()=>{let e=[`这是一条测试数据`,`Scroll 组件性能优秀`,`支持大量数据渲染`,`滚动流畅无卡顿`,`自定义滚动条样式`,`支持多种主题切换`,`响应式设计适配`,`支持触摸设备`];return e[Math.floor(Math.random()*e.length)]};return ee(()=>{q.value=Z(20)}),(t,o)=>(r(),p(`div`,re,[o[35]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Scroll 滚动条`),c(`p`,{class:`component-demo-view__description`},` 自定义滚动条组件，支持自定义样式、平滑滚动、虚拟滚动等功能 `)],-1),c(`section`,ie,[o[0]||=c(`h2`,{class:`component-demo-view__section-title`},`基础用法 - 悬停显示滚动条`,-1),o[1]||=c(`p`,{class:`component-demo-view__section-desc`},` 默认情况下滚动条不会显示，只有当鼠标悬停在滚动区域时才会平滑出现。 这种设计保持了界面的整洁，同时提供了良好的用户体验。 `,-1),c(`div`,ae,[a(n(h),{height:`200px`,class:`demo-scroll hover-demo`},{default:e(()=>[c(`div`,oe,[(r(),p(u,null,i(20,e=>c(`p`,{key:e,class:`demo-item`},` 这是第 `+s(e)+` 行内容，将鼠标移入此区域查看滚动条效果... `,1)),64))])]),_:1})]),c(`div`,se,[a(g,{code:Ve,language:`vue`,title:`示例代码`})])]),c(`section`,ce,[o[5]||=c(`h2`,{class:`component-demo-view__section-title`},`主题样式`,-1),o[6]||=c(`p`,{class:`component-demo-view__section-desc`},`支持 default、primary、dark 三种主题`,-1),c(`div`,le,[c(`div`,_,[o[2]||=c(`span`,{class:`theme-label`},`Default`,-1),a(n(h),{height:`150px`,theme:`default`,class:`demo-scroll`},{default:e(()=>[c(`div`,v,[(r(),p(u,null,i(10,e=>c(`p`,{key:e,class:`demo-item`},`主题内容 `+s(e),1)),64))])]),_:1})]),c(`div`,y,[o[3]||=c(`span`,{class:`theme-label`},`Primary`,-1),a(n(h),{height:`150px`,theme:`primary`,class:`demo-scroll`},{default:e(()=>[c(`div`,b,[(r(),p(u,null,i(10,e=>c(`p`,{key:e,class:`demo-item`},`主题内容 `+s(e),1)),64))])]),_:1})]),c(`div`,x,[o[4]||=c(`span`,{class:`theme-label`},`Dark`,-1),a(n(h),{height:`150px`,theme:`dark`,class:`demo-scroll`},{default:e(()=>[c(`div`,S,[(r(),p(u,null,i(10,e=>c(`p`,{key:e,class:`demo-item`},`主题内容 `+s(e),1)),64))])]),_:1})])]),c(`div`,C,[a(g,{code:He,language:`vue`,title:`示例代码`})])]),c(`section`,w,[o[10]||=c(`h2`,{class:`component-demo-view__section-title`},`尺寸设置`,-1),o[11]||=c(`p`,{class:`component-demo-view__section-desc`},`支持 small、medium、large 三种尺寸`,-1),c(`div`,T,[c(`div`,E,[o[7]||=c(`span`,{class:`size-label`},`Small`,-1),a(n(h),{height:`120px`,size:`small`,class:`demo-scroll`},{default:e(()=>[c(`div`,D,[(r(),p(u,null,i(8,e=>c(`p`,{key:e,class:`demo-item`},`小尺寸 `+s(e),1)),64))])]),_:1})]),c(`div`,O,[o[8]||=c(`span`,{class:`size-label`},`Medium`,-1),a(n(h),{height:`120px`,size:`medium`,class:`demo-scroll`},{default:e(()=>[c(`div`,k,[(r(),p(u,null,i(8,e=>c(`p`,{key:e,class:`demo-item`},`中尺寸 `+s(e),1)),64))])]),_:1})]),c(`div`,A,[o[9]||=c(`span`,{class:`size-label`},`Large`,-1),a(n(h),{height:`120px`,size:`large`,class:`demo-scroll`},{default:e(()=>[c(`div`,j,[(r(),p(u,null,i(8,e=>c(`p`,{key:e,class:`demo-item`},`大尺寸 `+s(e),1)),64))])]),_:1})])]),c(`div`,M,[a(g,{code:Ue,language:`vue`,title:`示例代码`})])]),c(`section`,N,[o[15]||=c(`h2`,{class:`component-demo-view__section-title`},`滚动方向`,-1),o[16]||=c(`p`,{class:`component-demo-view__section-desc`},`支持垂直、水平和双向滚动`,-1),c(`div`,P,[c(`div`,F,[o[12]||=c(`span`,{class:`direction-label`},`垂直滚动`,-1),a(n(h),{height:`150px`,direction:`vertical`,class:`demo-scroll`},{default:e(()=>[c(`div`,I,[(r(),p(u,null,i(15,e=>c(`p`,{key:e,class:`demo-item`},`垂直内容 `+s(e),1)),64))])]),_:1})]),c(`div`,L,[o[13]||=c(`span`,{class:`direction-label`},`水平滚动`,-1),a(n(h),{width:`150px`,direction:`horizontal`,class:`demo-scroll horizontal-scroll`},{default:e(()=>[c(`div`,R,[(r(),p(u,null,i(15,e=>c(`div`,{key:e,class:`horizontal-item`},` 卡片 `+s(e),1)),64))])]),_:1})]),c(`div`,z,[o[14]||=c(`span`,{class:`direction-label`},`双向滚动`,-1),a(n(h),{height:`150px`,width:`150px`,direction:`both`,class:`demo-scroll`},{default:e(()=>[c(`div`,B,[(r(),p(u,null,i(20,e=>c(`div`,{key:e,class:`both-row`},[(r(),p(u,null,i(10,t=>c(`span`,{key:t,class:`both-cell`},s(e)+`-`+s(t),1)),64))])),64))])]),_:1})])]),c(`div`,V,[a(g,{code:We,language:`vue`,title:`示例代码`})])]),c(`section`,H,[o[19]||=c(`h2`,{class:`component-demo-view__section-title`},`布局稳定性`,-1),o[20]||=c(`p`,{class:`component-demo-view__section-desc`},` 滚动条的出现和消失不会影响内容布局。下方两个区域内容宽度相同， 即使左侧滚动条显示/隐藏，内容区域也不会发生跳动。 `,-1),c(`div`,U,[c(`div`,W,[c(`div`,ue,[o[17]||=c(`span`,{class:`layout-label`},`悬停显示滚动条`,-1),a(n(h),{height:`150px`,class:`demo-scroll`},{default:e(()=>[c(`div`,de,[(r(),p(u,null,i(10,e=>c(`p`,{key:e,class:`demo-item layout-test-item`},` 内容宽度测试 `+s(e),1)),64))])]),_:1})]),c(`div`,fe,[o[18]||=c(`span`,{class:`layout-label`},`始终显示滚动条`,-1),a(n(h),{height:`150px`,always:``,class:`demo-scroll`},{default:e(()=>[c(`div`,pe,[(r(),p(u,null,i(10,e=>c(`p`,{key:e,class:`demo-item layout-test-item`},` 内容宽度测试 `+s(e),1)),64))])]),_:1})])])]),c(`div`,me,[a(g,{code:Xe,language:`vue`,title:`示例代码`})])]),c(`section`,he,[o[21]||=c(`h2`,{class:`component-demo-view__section-title`},`始终显示滚动条`,-1),o[22]||=c(`p`,{class:`component-demo-view__section-desc`},`设置 always 属性让滚动条始终可见`,-1),c(`div`,ge,[a(n(h),{height:`150px`,always:``,class:`demo-scroll`},{default:e(()=>[c(`div`,_e,[(r(),p(u,null,i(10,e=>c(`p`,{key:e,class:`demo-item`},`始终显示滚动条 `+s(e),1)),64))])]),_:1})]),c(`div`,ve,[a(g,{code:Ge,language:`vue`,title:`示例代码`})])]),c(`section`,ye,[o[23]||=c(`h2`,{class:`component-demo-view__section-title`},`原生滚动条`,-1),o[24]||=c(`p`,{class:`component-demo-view__section-desc`},`设置 native 属性使用浏览器原生滚动条`,-1),c(`div`,be,[a(n(h),{height:`150px`,native:``,class:`demo-scroll`},{default:e(()=>[c(`div`,G,[(r(),p(u,null,i(10,e=>c(`p`,{key:e,class:`demo-item`},`原生滚动条样式 `+s(e),1)),64))])]),_:1})]),c(`div`,xe,[a(g,{code:Ke,language:`vue`,title:`示例代码`})])]),c(`section`,Se,[o[28]||=c(`h2`,{class:`component-demo-view__section-title`},`滚动控制`,-1),o[29]||=c(`p`,{class:`component-demo-view__section-desc`},`通过 ref 调用组件方法控制滚动`,-1),c(`div`,Ce,[c(`div`,we,[a(n(m),{size:`small`,onClick:Ze},{default:e(()=>[...o[25]||=[f(`滚动到顶部`,-1)]]),_:1}),a(n(m),{size:`small`,onClick:Qe},{default:e(()=>[...o[26]||=[f(`滚动到底部`,-1)]]),_:1}),a(n(m),{size:`small`,onClick:$e},{default:e(()=>[...o[27]||=[f(`滚动到中间`,-1)]]),_:1})]),a(n(h),{ref_key:`controlScrollRef`,ref:l,height:`200px`,class:`demo-scroll`,onScroll:et},{default:e(()=>[c(`div`,Te,[(r(),p(u,null,i(30,e=>c(`p`,{key:e,class:te([`demo-item`,{highlight:e===15}])},` 第 `+s(e)+` 行 `+s(e===15?`（中间位置）`:``),3)),64))])]),_:1},512),c(`div`,Ee,[c(`span`,null,`当前位置: `+s(K.value.scrollTop.toFixed(0))+`px`,1)])]),c(`div`,De,[a(g,{code:qe,language:`vue`,title:`示例代码`})])]),c(`section`,Oe,[o[30]||=c(`h2`,{class:`component-demo-view__section-title`},`加载更多`,-1),o[31]||=c(`p`,{class:`component-demo-view__section-desc`},`滚动到底部时触发加载更多事件`,-1),c(`div`,ke,[a(n(h),{height:`250px`,"load-offset":20,class:`demo-scroll`,onLoadMore:tt,onScrollToBottom:nt},{default:e(()=>[c(`div`,Ae,[(r(!0),p(u,null,i(q.value,(e,t)=>(r(),p(`div`,{key:t,class:`demo-item load-more-item`},[c(`span`,je,s(t+1),1),c(`span`,Me,s(e),1)]))),128)),J.value?(r(),p(`div`,Ne,[a(n(ne),{size:`small`,text:`加载中...`})])):d(``,!0),Y.value?(r(),p(`div`,Pe,` 没有更多数据了 `)):d(``,!0)])]),_:1})]),c(`div`,Fe,[a(g,{code:Je,language:`vue`,title:`示例代码`})])]),c(`section`,Ie,[o[33]||=c(`h2`,{class:`component-demo-view__section-title`},`大量数据性能测试`,-1),o[34]||=c(`p`,{class:`component-demo-view__section-desc`},`测试组件在大量数据下的性能表现`,-1),c(`div`,Le,[c(`div`,Re,[c(`span`,null,`数据量: `+s(Q.value)+` 条`,1),a(n(m),{size:`small`,onClick:rt},{default:e(()=>[...o[32]||=[f(`增加 1000 条`,-1)]]),_:1})]),a(n(h),{height:`300px`,class:`demo-scroll performance-scroll`},{default:e(()=>[c(`div`,ze,[(r(!0),p(u,null,i(Q.value,e=>(r(),p(`p`,{key:e,class:`demo-item`},` 数据行 `+s(e)+` - `+s($()),1))),128))])]),_:1})]),c(`div`,Be,[a(g,{code:Ye,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-ae04c146`]]);export{K as default};
import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,K as ee,N as r,O as te,S as i,U as a,_ as o,b as s,f as c,h as l,j as u,r as d,v as f,x as p,z as m}from"./index-D6beBo5R.js";import{t as h}from"./button-CbFeg90j.js";import"./Loading-CdknV3_8.js";import{t as ne}from"./loading-fIVqsTFy.js";import"./Scroll-XMJ7tVR9.js";import{t as g}from"./scroll-c5qCqZ4j.js";var re={class:`component-demo-view`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},oe={class:`demo-content`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo demo-themes`},_={class:`theme-item`},v={class:`demo-content`},y={class:`theme-item`},b={class:`demo-content`},x={class:`theme-item theme-dark`},S={class:`demo-content dark-content`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo demo-sizes`},E={class:`size-item`},D={class:`demo-content`},O={class:`size-item`},k={class:`demo-content`},A={class:`size-item`},j={class:`demo-content`},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo demo-directions`},F={class:`direction-item`},I={class:`demo-content`},L={class:`direction-item`},R={class:`demo-content horizontal-content`},z={class:`direction-item`},B={class:`demo-content both-content`},V={class:`component-demo-view__code`},H={class:`component-demo-view__section`},U={class:`component-demo-view__demo`},W={class:`layout-demo`},ue={class:`layout-item`},de={class:`demo-content`},fe={class:`layout-item`},pe={class:`demo-content`},me={class:`component-demo-view__code`},he={class:`component-demo-view__section`},ge={class:`component-demo-view__demo`},_e={class:`demo-content`},ve={class:`component-demo-view__code`},ye={class:`component-demo-view__section`},be={class:`component-demo-view__demo`},G={class:`demo-content`},xe={class:`component-demo-view__code`},Se={class:`component-demo-view__section`},Ce={class:`component-demo-view__demo`},we={class:`control-buttons`},Te={class:`demo-content`},Ee={class:`scroll-info`},De={class:`component-demo-view__code`},Oe={class:`component-demo-view__section`},ke={class:`component-demo-view__demo`},Ae={class:`demo-content`},je={class:`item-index`},Me={class:`item-text`},Ne={key:0,class:`loading-indicator`},Pe={key:1,class:`finished-indicator`},Fe={class:`component-demo-view__code`},Ie={class:`component-demo-view__section`},Le={class:`component-demo-view__demo`},Re={class:`performance-info`},ze={class:`demo-content`},Be={class:`component-demo-view__code`},Ve=`<template>
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
</template>`,K=d(i({__name:`ScrollView`,setup(i){let d=a(null),K=a({scrollTop:0,scrollLeft:0}),Ze=()=>{d.value?.scrollToTop()},Qe=()=>{d.value?.scrollToBottom()},$e=()=>{let e=d.value?.getScrollSize();e&&d.value?.scrollTo({top:e.scrollHeight/2-e.clientHeight/2,behavior:`smooth`})},et=e=>{K.value=e},q=a([]),J=a(!1),Y=a(!1),X=0,Z=e=>Array.from({length:e},(e,t)=>`数据项 ${X*20+t+1} - ${$()}`),tt=()=>{J.value||Y.value||(J.value=!0,setTimeout(()=>{X++;let e=Z(20);q.value.push(...e),J.value=!1,X>=5&&(Y.value=!0)},1e3))},nt=()=>{console.log(`滚动到底部`)},Q=a(1e3),rt=()=>{Q.value+=1e3},$=()=>{let e=[`这是一条测试数据`,`Scroll 组件性能优秀`,`支持大量数据渲染`,`滚动流畅无卡顿`,`自定义滚动条样式`,`支持多种主题切换`,`响应式设计适配`,`支持触摸设备`];return e[Math.floor(Math.random()*e.length)]};return te(()=>{q.value=Z(20)}),(te,i)=>(u(),f(`div`,re,[i[35]||=l(`div`,{class:`component-demo-view__header`},[l(`h1`,{class:`component-demo-view__title`},`Scroll 滚动条`),l(`p`,{class:`component-demo-view__description`},` 自定义滚动条组件，支持自定义样式、平滑滚动、虚拟滚动等功能 `)],-1),l(`section`,ie,[i[0]||=l(`h2`,{class:`component-demo-view__section-title`},`基础用法 - 悬停显示滚动条`,-1),i[1]||=l(`p`,{class:`component-demo-view__section-desc`},` 默认情况下滚动条不会显示，只有当鼠标悬停在滚动区域时才会平滑出现。 这种设计保持了界面的整洁，同时提供了良好的用户体验。 `,-1),l(`div`,ae,[p(t(g),{height:`200px`,class:`demo-scroll hover-demo`},{default:m(()=>[l(`div`,oe,[(u(),f(c,null,r(20,e=>l(`p`,{key:e,class:`demo-item`},` 这是第 `+n(e)+` 行内容，将鼠标移入此区域查看滚动条效果... `,1)),64))])]),_:1})]),l(`div`,se,[p(e,{code:Ve,language:`vue`,title:`示例代码`})])]),l(`section`,ce,[i[5]||=l(`h2`,{class:`component-demo-view__section-title`},`主题样式`,-1),i[6]||=l(`p`,{class:`component-demo-view__section-desc`},`支持 default、primary、dark 三种主题`,-1),l(`div`,le,[l(`div`,_,[i[2]||=l(`span`,{class:`theme-label`},`Default`,-1),p(t(g),{height:`150px`,theme:`default`,class:`demo-scroll`},{default:m(()=>[l(`div`,v,[(u(),f(c,null,r(10,e=>l(`p`,{key:e,class:`demo-item`},`主题内容 `+n(e),1)),64))])]),_:1})]),l(`div`,y,[i[3]||=l(`span`,{class:`theme-label`},`Primary`,-1),p(t(g),{height:`150px`,theme:`primary`,class:`demo-scroll`},{default:m(()=>[l(`div`,b,[(u(),f(c,null,r(10,e=>l(`p`,{key:e,class:`demo-item`},`主题内容 `+n(e),1)),64))])]),_:1})]),l(`div`,x,[i[4]||=l(`span`,{class:`theme-label`},`Dark`,-1),p(t(g),{height:`150px`,theme:`dark`,class:`demo-scroll`},{default:m(()=>[l(`div`,S,[(u(),f(c,null,r(10,e=>l(`p`,{key:e,class:`demo-item`},`主题内容 `+n(e),1)),64))])]),_:1})])]),l(`div`,C,[p(e,{code:He,language:`vue`,title:`示例代码`})])]),l(`section`,w,[i[10]||=l(`h2`,{class:`component-demo-view__section-title`},`尺寸设置`,-1),i[11]||=l(`p`,{class:`component-demo-view__section-desc`},`支持 small、medium、large 三种尺寸`,-1),l(`div`,T,[l(`div`,E,[i[7]||=l(`span`,{class:`size-label`},`Small`,-1),p(t(g),{height:`120px`,size:`small`,class:`demo-scroll`},{default:m(()=>[l(`div`,D,[(u(),f(c,null,r(8,e=>l(`p`,{key:e,class:`demo-item`},`小尺寸 `+n(e),1)),64))])]),_:1})]),l(`div`,O,[i[8]||=l(`span`,{class:`size-label`},`Medium`,-1),p(t(g),{height:`120px`,size:`medium`,class:`demo-scroll`},{default:m(()=>[l(`div`,k,[(u(),f(c,null,r(8,e=>l(`p`,{key:e,class:`demo-item`},`中尺寸 `+n(e),1)),64))])]),_:1})]),l(`div`,A,[i[9]||=l(`span`,{class:`size-label`},`Large`,-1),p(t(g),{height:`120px`,size:`large`,class:`demo-scroll`},{default:m(()=>[l(`div`,j,[(u(),f(c,null,r(8,e=>l(`p`,{key:e,class:`demo-item`},`大尺寸 `+n(e),1)),64))])]),_:1})])]),l(`div`,M,[p(e,{code:Ue,language:`vue`,title:`示例代码`})])]),l(`section`,N,[i[15]||=l(`h2`,{class:`component-demo-view__section-title`},`滚动方向`,-1),i[16]||=l(`p`,{class:`component-demo-view__section-desc`},`支持垂直、水平和双向滚动`,-1),l(`div`,P,[l(`div`,F,[i[12]||=l(`span`,{class:`direction-label`},`垂直滚动`,-1),p(t(g),{height:`150px`,direction:`vertical`,class:`demo-scroll`},{default:m(()=>[l(`div`,I,[(u(),f(c,null,r(15,e=>l(`p`,{key:e,class:`demo-item`},`垂直内容 `+n(e),1)),64))])]),_:1})]),l(`div`,L,[i[13]||=l(`span`,{class:`direction-label`},`水平滚动`,-1),p(t(g),{width:`150px`,direction:`horizontal`,class:`demo-scroll horizontal-scroll`},{default:m(()=>[l(`div`,R,[(u(),f(c,null,r(15,e=>l(`div`,{key:e,class:`horizontal-item`},` 卡片 `+n(e),1)),64))])]),_:1})]),l(`div`,z,[i[14]||=l(`span`,{class:`direction-label`},`双向滚动`,-1),p(t(g),{height:`150px`,width:`150px`,direction:`both`,class:`demo-scroll`},{default:m(()=>[l(`div`,B,[(u(),f(c,null,r(20,e=>l(`div`,{key:e,class:`both-row`},[(u(),f(c,null,r(10,t=>l(`span`,{key:t,class:`both-cell`},n(e)+`-`+n(t),1)),64))])),64))])]),_:1})])]),l(`div`,V,[p(e,{code:We,language:`vue`,title:`示例代码`})])]),l(`section`,H,[i[19]||=l(`h2`,{class:`component-demo-view__section-title`},`布局稳定性`,-1),i[20]||=l(`p`,{class:`component-demo-view__section-desc`},` 滚动条的出现和消失不会影响内容布局。下方两个区域内容宽度相同， 即使左侧滚动条显示/隐藏，内容区域也不会发生跳动。 `,-1),l(`div`,U,[l(`div`,W,[l(`div`,ue,[i[17]||=l(`span`,{class:`layout-label`},`悬停显示滚动条`,-1),p(t(g),{height:`150px`,class:`demo-scroll`},{default:m(()=>[l(`div`,de,[(u(),f(c,null,r(10,e=>l(`p`,{key:e,class:`demo-item layout-test-item`},` 内容宽度测试 `+n(e),1)),64))])]),_:1})]),l(`div`,fe,[i[18]||=l(`span`,{class:`layout-label`},`始终显示滚动条`,-1),p(t(g),{height:`150px`,always:``,class:`demo-scroll`},{default:m(()=>[l(`div`,pe,[(u(),f(c,null,r(10,e=>l(`p`,{key:e,class:`demo-item layout-test-item`},` 内容宽度测试 `+n(e),1)),64))])]),_:1})])])]),l(`div`,me,[p(e,{code:Xe,language:`vue`,title:`示例代码`})])]),l(`section`,he,[i[21]||=l(`h2`,{class:`component-demo-view__section-title`},`始终显示滚动条`,-1),i[22]||=l(`p`,{class:`component-demo-view__section-desc`},`设置 always 属性让滚动条始终可见`,-1),l(`div`,ge,[p(t(g),{height:`150px`,always:``,class:`demo-scroll`},{default:m(()=>[l(`div`,_e,[(u(),f(c,null,r(10,e=>l(`p`,{key:e,class:`demo-item`},`始终显示滚动条 `+n(e),1)),64))])]),_:1})]),l(`div`,ve,[p(e,{code:Ge,language:`vue`,title:`示例代码`})])]),l(`section`,ye,[i[23]||=l(`h2`,{class:`component-demo-view__section-title`},`原生滚动条`,-1),i[24]||=l(`p`,{class:`component-demo-view__section-desc`},`设置 native 属性使用浏览器原生滚动条`,-1),l(`div`,be,[p(t(g),{height:`150px`,native:``,class:`demo-scroll`},{default:m(()=>[l(`div`,G,[(u(),f(c,null,r(10,e=>l(`p`,{key:e,class:`demo-item`},`原生滚动条样式 `+n(e),1)),64))])]),_:1})]),l(`div`,xe,[p(e,{code:Ke,language:`vue`,title:`示例代码`})])]),l(`section`,Se,[i[28]||=l(`h2`,{class:`component-demo-view__section-title`},`滚动控制`,-1),i[29]||=l(`p`,{class:`component-demo-view__section-desc`},`通过 ref 调用组件方法控制滚动`,-1),l(`div`,Ce,[l(`div`,we,[p(t(h),{size:`small`,onClick:Ze},{default:m(()=>[...i[25]||=[s(`滚动到顶部`,-1)]]),_:1}),p(t(h),{size:`small`,onClick:Qe},{default:m(()=>[...i[26]||=[s(`滚动到底部`,-1)]]),_:1}),p(t(h),{size:`small`,onClick:$e},{default:m(()=>[...i[27]||=[s(`滚动到中间`,-1)]]),_:1})]),p(t(g),{ref_key:`controlScrollRef`,ref:d,height:`200px`,class:`demo-scroll`,onScroll:et},{default:m(()=>[l(`div`,Te,[(u(),f(c,null,r(30,e=>l(`p`,{key:e,class:ee([`demo-item`,{highlight:e===15}])},` 第 `+n(e)+` 行 `+n(e===15?`（中间位置）`:``),3)),64))])]),_:1},512),l(`div`,Ee,[l(`span`,null,`当前位置: `+n(K.value.scrollTop.toFixed(0))+`px`,1)])]),l(`div`,De,[p(e,{code:qe,language:`vue`,title:`示例代码`})])]),l(`section`,Oe,[i[30]||=l(`h2`,{class:`component-demo-view__section-title`},`加载更多`,-1),i[31]||=l(`p`,{class:`component-demo-view__section-desc`},`滚动到底部时触发加载更多事件`,-1),l(`div`,ke,[p(t(g),{height:`250px`,"load-offset":20,class:`demo-scroll`,onLoadMore:tt,onScrollToBottom:nt},{default:m(()=>[l(`div`,Ae,[(u(!0),f(c,null,r(q.value,(e,t)=>(u(),f(`div`,{key:t,class:`demo-item load-more-item`},[l(`span`,je,n(t+1),1),l(`span`,Me,n(e),1)]))),128)),J.value?(u(),f(`div`,Ne,[p(t(ne),{size:`small`,text:`加载中...`})])):o(``,!0),Y.value?(u(),f(`div`,Pe,` 没有更多数据了 `)):o(``,!0)])]),_:1})]),l(`div`,Fe,[p(e,{code:Je,language:`vue`,title:`示例代码`})])]),l(`section`,Ie,[i[33]||=l(`h2`,{class:`component-demo-view__section-title`},`大量数据性能测试`,-1),i[34]||=l(`p`,{class:`component-demo-view__section-desc`},`测试组件在大量数据下的性能表现`,-1),l(`div`,Le,[l(`div`,Re,[l(`span`,null,`数据量: `+n(Q.value)+` 条`,1),p(t(h),{size:`small`,onClick:rt},{default:m(()=>[...i[32]||=[s(`增加 1000 条`,-1)]]),_:1})]),p(t(g),{height:`300px`,class:`demo-scroll performance-scroll`},{default:m(()=>[l(`div`,ze,[(u(!0),f(c,null,r(Q.value,e=>(u(),f(`p`,{key:e,class:`demo-item`},` 数据行 `+n(e)+` - `+n($()),1))),128))])]),_:1})]),l(`div`,Be,[p(e,{code:Ye,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-ae04c146`]]);export{K as default};
import{A as e,B as t,C as n,D as r,F as i,J as a,K as o,M as s,P as c,S as l,W as u,Y as d,b as f,g as p,h as m,i as h,k as ee,p as g,q as te,v as _,x as v,y,z as b}from"./index-B3Jx3uix.js";import{t as x}from"./button-GOPf8Q2w.js";import{t as S}from"./tag-le27g6xF.js";import{t as C}from"./CodeBlock-CE4Cu_o1.js";var w={class:`ale-infinite-scroll__content`},T={class:`ale-infinite-scroll__loading-text`},E={key:1,class:`ale-infinite-scroll__divider`},ne={class:`ale-infinite-scroll__retry`};const D=n({__name:`InfiniteScroll`,props:{status:{},defaultStatus:{default:`idle`},disabled:{type:Boolean,default:!1},direction:{default:`vertical`},offset:{default:100},immediate:{type:Boolean,default:!0},loadingText:{default:`加载中...`},finishedText:{default:`没有更多了`},errorText:{default:`加载失败`},retryText:{default:`点击重试`},customClass:{default:``}},emits:[`load`,`update:status`],setup(t,{expose:n,emit:a}){let o=t,c=a,l=u(null),f=u(o.defaultStatus),h=u(0),v=m({get(){return o.status===void 0?f.value:o.status},set(e){o.status===void 0&&(f.value=e),c(`update:status`,e)}}),x=m(()=>[`loading`,`finished`,`error`].includes(v.value)),S=m(()=>[`ale-infinite-scroll`,`ale-infinite-scroll--${o.direction}`,{"ale-infinite-scroll--loading":v.value===`loading`,"ale-infinite-scroll--finished":v.value===`finished`,"ale-infinite-scroll--error":v.value===`error`,"ale-infinite-scroll--disabled":o.disabled},o.customClass]),C=e=>{let t=window.getComputedStyle(e),n=t.overflow+t.overflowX+t.overflowY;return n.includes(`auto`)||n.includes(`scroll`)},D=e=>{let t=e;for(;t&&t!==document.body;){if(C(t))return t;t=t.parentElement}return null},re=()=>{if(!l.value)return window;let{direction:e}=o,t=l.value,n=D(t);if(n)return n;if(e===`vertical`){if(t.scrollHeight>t.clientHeight)return t}else if(t.scrollWidth>t.clientWidth)return t;return window},O=()=>{if(o.disabled||v.value===`loading`||v.value===`finished`||v.value===`error`)return;let e=re(),t=l.value;if(!t)return;let{direction:n,offset:r}=o,i=!1;if(e===window){let e=t.getBoundingClientRect();if(n===`vertical`){let t=window.innerHeight;i=e.bottom<=t+r}else{let t=window.innerWidth;i=e.right<=t+r}}else{let t=e;if(n===`vertical`){let e=t.scrollTop,n=t.clientHeight,a=t.scrollHeight;i=e+n>=a-r}else{let e=t.scrollLeft,n=t.clientWidth,a=t.scrollWidth;i=e+n>=a-r}}i&&k()},k=()=>{v.value=`loading`,c(`load`)},A=()=>{o.disabled||O()},ie=()=>{v.value===`error`&&(h.value++,k())},ae=()=>{v.value=`loading`},oe=()=>{v.value=`finished`},se=()=>{v.value=`error`},ce=()=>{h.value=0,v.value=`idle`,r(()=>{O()})},j=null,M=()=>{N(),j=re(),j===window?window.addEventListener(`scroll`,A):j.addEventListener(`scroll`,A)},N=()=>{j&&j!==window?j.removeEventListener(`scroll`,A):window.removeEventListener(`scroll`,A),j=null};return b(()=>o.disabled,e=>{e||r(()=>O())}),b(()=>o.direction,()=>{r(()=>{M(),O()})}),b(v,(e,t)=>{t===`loading`&&e===`idle`&&r(()=>O())}),ee(()=>{M(),o.immediate&&r(()=>O())}),e(()=>{N()}),n({check:O,setLoading:ae,setFinished:oe,setError:se,reset:ce}),(e,n)=>(s(),y(`div`,{ref_key:`containerRef`,ref:l,class:te(S.value),onScroll:A},[p(`div`,w,[i(e.$slots,`default`)]),x.value?(s(),y(`div`,{key:0,class:`ale-infinite-scroll__status`,onClick:ie},[v.value===`loading`?(s(),y(g,{key:0},[n[0]||=p(`span`,{class:`ale-infinite-scroll__spinner`},[p(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`},[p(`circle`,{cx:`12`,cy:`12`,r:`10`,"stroke-dasharray":`60`,"stroke-dashoffset":`20`})])],-1),p(`span`,T,d(t.loadingText),1)],64)):v.value===`finished`?(s(),y(`div`,E,[p(`span`,null,d(t.finishedText),1)])):v.value===`error`?(s(),y(g,{key:2},[p(`span`,null,d(t.errorText),1),p(`span`,ne,d(t.retryText),1)],64)):_(``,!0)])):_(``,!0)],34))}});var re={class:`component-demo-view`},O={class:`component-demo-view__section`},k={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},A={class:`infinite-scroll-demo`},ie={class:`demo-list`},ae={class:`demo-actions`},oe={class:`component-demo-view__code`},se={class:`component-demo-view__section`},ce={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},j={class:`infinite-scroll-demo`},M={class:`demo-list`},N={class:`component-demo-view__code`},le={class:`component-demo-view__section`},ue={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},de={class:`infinite-scroll-demo`},fe={class:`demo-list`},pe={class:`demo-actions`},me={class:`component-demo-view__code`},he={class:`component-demo-view__section`},ge={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},_e={class:`infinite-scroll-demo`},ve={class:`demo-list`},ye={class:`demo-actions`},be={class:`component-demo-view__code`},xe={class:`component-demo-view__section`},Se={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},Ce={class:`infinite-scroll-demo`},we={class:`demo-list`},Te={class:`demo-actions`},Ee={class:`component-demo-view__code`},De={class:`component-demo-view__section`},Oe={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},ke={class:`infinite-scroll-demo horizontal`},Ae={class:`demo-list horizontal`},je={class:`demo-actions`},Me={class:`component-demo-view__code`},Ne={class:`component-demo-view__section`},Pe={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},Fe={class:`image-gallery-demo`},Ie={class:`image-grid`},Le={class:`image-placeholder`},Re={class:`image-info`},ze={class:`image-title`},Be={class:`image-meta`},Ve={class:`demo-actions`},He={class:`component-demo-view__code`},Ue={class:`component-demo-view__section`},We={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},Ge={class:`user-list-demo`},Ke={class:`list-header`},qe={class:`list-body`},Je={class:`user-list`},Ye={class:`user-avatar`},Xe={class:`user-info`},Ze={class:`user-name`},Qe={class:`user-email`},$e={class:`component-demo-view__code`},et=`<template>
  <AleInfiniteScroll
    :status="status"
    @load="handleLoad"
  >
    <div class="list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInfiniteScroll } from 'ale-ui';
import type { InfiniteScrollStatus } from 'ale-ui';

const status = ref<InfiniteScrollStatus>('idle');
const list = ref([]);

const handleLoad = () => {
  status.value = 'loading';
  // 模拟异步加载
  setTimeout(() => {
    // 加载数据...
    if (list.value.length >= 20) {
      status.value = 'finished';
    } else {
      status.value = 'idle';
    }
  }, 1000);
};
<\/script>`,tt=`<template>
  <AleInfiniteScroll
    :status="'finished'"
    :finished-text="'已经全部加载完毕'"
  >
    <div class="list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>`,nt=`<template>
  <AleInfiniteScroll
    :status="status"
    :error-text="'加载失败，请重试'"
    @load="handleLoad"
  >
    <div class="list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InfiniteScrollStatus } from 'ale-ui';

const status = ref<InfiniteScrollStatus>('idle');

const handleLoad = () => {
  status.value = 'loading';
  fetchData()
    .then(() => {
      status.value = 'idle';
    })
    .catch(() => {
      status.value = 'error';
    });
};
<\/script>`,rt=`<template>
  <AleInfiniteScroll
    :status="status"
    :loading-text="'正在获取数据...'"
    :finished-text="'—— 到底了 ——'"
    @load="handleLoad"
  >
    <!-- 列表内容 -->
  </AleInfiniteScroll>
</template>`,it=`<template>
  <AleInfiniteScroll
    :status="status"
    :disabled="isDisabled"
    @load="handleLoad"
  >
    <!-- 列表内容 -->
  </AleInfiniteScroll>
  <button @click="isDisabled = !isDisabled">
    {{ isDisabled ? '启用' : '禁用' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InfiniteScrollStatus } from 'ale-ui';

const isDisabled = ref(false);
const status = ref<InfiniteScrollStatus>('idle');
<\/script>`,at=`<template>
  <AleInfiniteScroll
    :status="status"
    direction="horizontal"
    @load="handleLoad"
  >
    <div class="horizontal-list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>`,ot=`<template>
  <AleInfiniteScroll
    :status="userStatus"
    :offset="50"
    @load="loadMoreUsers"
  >
    <div class="user-list">
      <div v-for="user in userList" :key="user.id" class="user-item">
        <div class="user-avatar">{{ user.name?.[0] || '?' }}</div>
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-email">{{ user.email }}</div>
        </div>
        <AleTag :type="user.status === 'active' ? 'success' : 'info'">
          {{ user.status === 'active' ? '活跃' : '离线' }}
        </AleTag>
      </div>
    </div>
  </AleInfiniteScroll>
</template>`,st=`<template>
  <AleInfiniteScroll
    ref="imageScrollRef"
    :status="imageStatus"
    :offset="300"
    @load="loadMoreImages"
  >
    <div class="image-grid">
      <div
        v-for="image in imageList"
        :key="image.id"
        class="image-card"
      >
        <div class="image-wrapper" :style="{ backgroundColor: image.color }">
          <span>{{ image.id }}</span>
        </div>
        <div class="image-info">
          <div class="image-title">{{ image.title }}</div>
          <div class="image-meta">
            <span>{{ image.author }}</span>
            <span>{{ image.likes }} ❤️</span>
          </div>
        </div>
      </div>
    </div>
  </AleInfiniteScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InfiniteScrollStatus } from 'ale-ui';

const imageScrollRef = ref();
const imageStatus = ref<InfiniteScrollStatus>('idle');
const imageList = ref([]);
let imageId = 1;

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
const titles = ['风景', '人物', '建筑', '美食', '动物'];
const authors = ['摄影师A', '摄影师B', '摄影师C'];

// 无限加载：每次随机生成10个卡片
const loadMoreImages = () => {
  imageStatus.value = 'loading';
  
  setTimeout(() => {
    const newImages = Array.from({ length: 10 }, () => {
      const id = imageId++;
      return {
        id,
        title: titles[Math.floor(Math.random() * titles.length)] + ' ' + id,
        author: authors[Math.floor(Math.random() * authors.length)]!,
        likes: Math.floor(Math.random() * 500) + 50,
        color: colors[Math.floor(Math.random() * colors.length)]!
      };
    });
    
    imageList.value.push(...newImages);
    imageStatus.value = 'idle'; // 保持 idle，不设置 finished
  }, 600);
};
<\/script>`,ct=h(n({__name:`InfiniteScrollView`,setup(e){let n=u(`idle`),r=u([]),i=1,m=()=>{n.value=`loading`,setTimeout(()=>{let e=Array.from({length:5},()=>({id:i++,text:`列表项 ${i-1}`}));r.value.push(...e),n.value=r.value.length>=20?`finished`:`idle`},1e3)},h=()=>{i=1,r.value=[],n.value=`idle`,setTimeout(()=>m(),100)},ee=u(`finished`),te=u(Array.from({length:10},(e,t)=>({id:t+1,text:`已完成列表项 ${t+1}`}))),_=u(`idle`),b=u([]),w=1,T=!1,E=()=>{_.value=`loading`,setTimeout(()=>{if(T)_.value=`error`,T=!1;else{let e=Array.from({length:3},()=>({id:w++,text:`列表项 ${w-1}`}));b.value.push(...e),_.value=b.value.length>=15?`finished`:`idle`}},800)},ne=()=>{T=!0,_.value=`idle`,E()},ct=()=>{w=1,b.value=[],_.value=`idle`,T=!1,E()},P=u(`idle`),F=u([]),I=1,L=()=>{P.value=`loading`,setTimeout(()=>{let e=Array.from({length:5},()=>({id:I++,text:`自定义列表项 ${I-1}`}));F.value.push(...e),P.value=F.value.length>=15?`finished`:`idle`},1e3)},lt=()=>{I=1,F.value=[],P.value=`idle`,setTimeout(()=>L(),100)},R=u(!1),z=u(`idle`),B=u([]),V=1,H=()=>{z.value=`loading`,setTimeout(()=>{let e=Array.from({length:5},()=>({id:V++,text:`禁用列表项 ${V-1}`}));B.value.push(...e),z.value=B.value.length>=15?`finished`:`idle`},1e3)},ut=()=>{R.value=!R.value},dt=()=>{V=1,B.value=[],z.value=`idle`,setTimeout(()=>H(),100)},U=u(`idle`),W=u([]),G=1,K=()=>{U.value=`loading`,setTimeout(()=>{let e=Array.from({length:3},()=>({id:G++,text:`卡片 ${G-1}`}));W.value.push(...e),U.value=W.value.length>=12?`finished`:`idle`},800)},ft=()=>{G=1,W.value=[],U.value=`idle`,setTimeout(()=>K(),100)},q=u(null),J=u(`idle`),Y=u([]),pt=1,mt=[`#FF6B6B`,`#4ECDC4`,`#45B7D1`,`#96CEB4`,`#FFEAA7`,`#DDA0DD`,`#98D8C8`,`#F7DC6F`,`#BB8FCE`,`#85C1E9`],ht=[`山间晨雾`,`城市夜景`,`海边日落`,`森林小径`,`雪山之巅`,`田园风光`,`星空璀璨`,`古镇风情`],gt=[`摄影师小王`,`光影大师`,`旅行家`,`自然观察者`,`艺术家`],X=()=>{J.value=`loading`,setTimeout(()=>{let e=Array.from({length:10},()=>{let e=pt++,t=ht[Math.floor(Math.random()*ht.length)],n=gt[Math.floor(Math.random()*gt.length)],r=mt[Math.floor(Math.random()*mt.length)];return{id:e,title:`${t} ${e}`,author:n,likes:Math.floor(Math.random()*500)+50,color:r}});Y.value.push(...e),J.value=`idle`},600)},_t=()=>{pt=1,Y.value=[],J.value=`idle`,setTimeout(()=>X(),100)},vt=()=>{q.value&&q.value.check()},Z=u(`idle`),Q=u([]),yt=1,$=[`张三`,`李四`,`王五`,`赵六`,`陈七`,`刘八`,`杨九`,`周十`],bt=()=>{Z.value=`loading`,setTimeout(()=>{let e=Array.from({length:5},()=>{let e=yt++,t=$[(e-1)%$.length];return{id:e,name:`${t}-${Math.ceil(e/$.length)}`,email:`${t?.toLowerCase()}${Math.ceil(e/$.length)}@example.com`,status:Math.random()>.3?`active`:`inactive`}});Q.value.push(...e),Z.value=Q.value.length>=30?`finished`:`idle`},1200)},xt=()=>{yt=1,Q.value=[],Z.value=`idle`,bt()};return m(),E(),L(),H(),K(),X(),bt(),(e,i)=>(s(),y(`div`,re,[i[22]||=p(`div`,{class:`component-demo-view__header`},[p(`h1`,{class:`component-demo-view__title`},`InfiniteScroll 滚动加载`),p(`p`,{class:`component-demo-view__description`},` 滚动到底部自动加载更多数据，支持自定义加载状态、完成状态和错误状态 `)],-1),p(`section`,O,[i[1]||=p(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),p(`div`,k,[p(`div`,A,[l(o(D),{status:n.value,"loading-text":`加载中...`,"finished-text":`没有更多了`,onLoad:m},{default:t(()=>[p(`div`,ie,[(s(!0),y(g,null,c(r.value,e=>(s(),y(`div`,{key:e.id,class:`demo-list-item`},d(e.text),1))),128))])]),_:1},8,[`status`])]),p(`div`,ae,[l(o(x),{size:`small`,onClick:h},{default:t(()=>[...i[0]||=[v(` 重置列表 `,-1)]]),_:1})])]),p(`div`,oe,[l(C,{code:et,language:`vue`,title:`示例代码`})])]),p(`section`,se,[i[2]||=p(`h2`,{class:`component-demo-view__section-title`},`加载完成状态`,-1),p(`div`,ce,[p(`div`,j,[l(o(D),{status:ee.value,"finished-text":`已经全部加载完毕`},{default:t(()=>[p(`div`,M,[(s(!0),y(g,null,c(te.value,e=>(s(),y(`div`,{key:e.id,class:`demo-list-item`},d(e.text),1))),128))])]),_:1},8,[`status`])])]),p(`div`,N,[l(C,{code:tt,language:`vue`,title:`示例代码`})])]),p(`section`,le,[i[6]||=p(`h2`,{class:`component-demo-view__section-title`},`错误状态与重试`,-1),p(`div`,ue,[i[5]||=p(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 点击"模拟错误"查看错误状态，点击错误提示可重试 `,-1),p(`div`,de,[l(o(D),{status:_.value,"error-text":`加载失败，请重试`,"retry-text":`点击重试`,onLoad:E},{default:t(()=>[p(`div`,fe,[(s(!0),y(g,null,c(b.value,e=>(s(),y(`div`,{key:e.id,class:`demo-list-item`},d(e.text),1))),128))])]),_:1},8,[`status`])]),p(`div`,pe,[l(o(x),{size:`small`,onClick:ne},{default:t(()=>[...i[3]||=[v(` 模拟错误 `,-1)]]),_:1}),l(o(x),{size:`small`,onClick:ct},{default:t(()=>[...i[4]||=[v(` 重置 `,-1)]]),_:1})])]),p(`div`,me,[l(C,{code:nt,language:`vue`,title:`示例代码`})])]),p(`section`,he,[i[8]||=p(`h2`,{class:`component-demo-view__section-title`},`自定义加载文本`,-1),p(`div`,ge,[p(`div`,_e,[l(o(D),{status:P.value,"loading-text":`正在获取数据...`,"finished-text":`—— 到底了 ——`,onLoad:L},{default:t(()=>[p(`div`,ve,[(s(!0),y(g,null,c(F.value,e=>(s(),y(`div`,{key:e.id,class:`demo-list-item`},d(e.text),1))),128))])]),_:1},8,[`status`])]),p(`div`,ye,[l(o(x),{size:`small`,onClick:lt},{default:t(()=>[...i[7]||=[v(` 重置列表 `,-1)]]),_:1})])]),p(`div`,be,[l(C,{code:rt,language:`vue`,title:`示例代码`})])]),p(`section`,xe,[i[11]||=p(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),p(`div`,Se,[i[10]||=p(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 禁用后滚动到底部不会触发加载 `,-1),p(`div`,Ce,[l(o(D),{status:z.value,disabled:R.value,onLoad:H},{default:t(()=>[p(`div`,we,[(s(!0),y(g,null,c(B.value,e=>(s(),y(`div`,{key:e.id,class:`demo-list-item`},d(e.text),1))),128))])]),_:1},8,[`status`,`disabled`])]),p(`div`,Te,[l(o(x),{size:`small`,onClick:ut},{default:t(()=>[v(d(R.value?`启用`:`禁用`),1)]),_:1}),l(o(x),{size:`small`,onClick:dt},{default:t(()=>[...i[9]||=[v(` 重置列表 `,-1)]]),_:1})])]),p(`div`,Ee,[l(C,{code:it,language:`vue`,title:`示例代码`})])]),p(`section`,De,[i[14]||=p(`h2`,{class:`component-demo-view__section-title`},`水平方向`,-1),p(`div`,Oe,[i[13]||=p(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 设置 direction="horizontal" 实现水平滚动加载 `,-1),p(`div`,ke,[l(o(D),{status:U.value,direction:`horizontal`,onLoad:K},{default:t(()=>[p(`div`,Ae,[(s(!0),y(g,null,c(W.value,e=>(s(),y(`div`,{key:e.id,class:`demo-list-item horizontal`},d(e.text),1))),128))])]),_:1},8,[`status`])]),p(`div`,je,[l(o(x),{size:`small`,onClick:ft},{default:t(()=>[...i[12]||=[v(` 重置列表 `,-1)]]),_:1})])]),p(`div`,Me,[l(C,{code:at,language:`vue`,title:`示例代码`})])]),p(`section`,Ne,[i[18]||=p(`h2`,{class:`component-demo-view__section-title`},`图片无限加载`,-1),p(`div`,Pe,[i[17]||=p(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 滚动到距离底部 300px 时触发，每次随机生成 10 张卡片，永无止境 `,-1),p(`div`,Fe,[l(o(D),{ref_key:`imageScrollRef`,ref:q,status:J.value,offset:300,immediate:!0,onLoad:X},{default:t(()=>[p(`div`,Ie,[(s(!0),y(g,null,c(Y.value,e=>(s(),y(`div`,{key:e.id,class:`image-card`},[p(`div`,{class:`image-wrapper`,style:a({backgroundColor:e.color})},[p(`span`,Le,d(e.id),1)],4),p(`div`,Re,[p(`div`,ze,d(e.title),1),p(`div`,Be,[p(`span`,null,d(e.author),1),p(`span`,null,d(e.likes)+` ❤️`,1)])])]))),128))])]),_:1},8,[`status`])]),p(`div`,Ve,[l(o(x),{size:`small`,onClick:_t},{default:t(()=>[...i[15]||=[v(` 刷新重置 `,-1)]]),_:1}),l(o(x),{size:`small`,onClick:vt},{default:t(()=>[...i[16]||=[v(` 立即加载 `,-1)]]),_:1}),l(o(S),{type:`primary`,size:`small`},{default:t(()=>[v(` 已加载 `+d(Y.value.length)+` 张图片 `,1)]),_:1})])]),p(`div`,He,[l(C,{code:st,language:`vue`,title:`示例代码`})])]),p(`section`,Ue,[i[21]||=p(`h2`,{class:`component-demo-view__section-title`},`实际应用场景`,-1),p(`div`,We,[p(`div`,Ge,[p(`div`,Ke,[i[20]||=p(`span`,null,`用户列表`,-1),l(o(x),{size:`small`,loading:Z.value===`loading`,onClick:xt},{default:t(()=>[...i[19]||=[v(` 刷新 `,-1)]]),_:1},8,[`loading`])]),p(`div`,qe,[l(o(D),{status:Z.value,offset:50,onLoad:bt},{default:t(()=>[p(`div`,Je,[(s(!0),y(g,null,c(Q.value,e=>(s(),y(`div`,{key:e.id,class:`user-item`},[p(`div`,Ye,d(e.name?.[0]||`?`),1),p(`div`,Xe,[p(`div`,Ze,d(e.name),1),p(`div`,Qe,d(e.email),1)]),l(o(S),{type:e.status===`active`?`success`:`info`,size:`small`},{default:t(()=>[v(d(e.status===`active`?`活跃`:`离线`),1)]),_:2},1032,[`type`])]))),128))])]),_:1},8,[`status`])])])]),p(`div`,$e,[l(C,{code:ot,language:`vue`,title:`示例代码`})])]),i[23]||=f(`<section class="component-demo-view__section" data-v-2cf62835><h2 class="component-demo-view__section-title" data-v-2cf62835>API 说明</h2><div class="api-table-wrapper" data-v-2cf62835><h3 data-v-2cf62835>Props</h3><table class="api-table" data-v-2cf62835><thead data-v-2cf62835><tr data-v-2cf62835><th data-v-2cf62835>参数</th><th data-v-2cf62835>说明</th><th data-v-2cf62835>类型</th><th data-v-2cf62835>默认值</th></tr></thead><tbody data-v-2cf62835><tr data-v-2cf62835><td data-v-2cf62835>status</td><td data-v-2cf62835>当前状态（受控模式）</td><td data-v-2cf62835>&#39;idle&#39; | &#39;loading&#39; | &#39;finished&#39; | &#39;error&#39;</td><td data-v-2cf62835>-</td></tr><tr data-v-2cf62835><td data-v-2cf62835>defaultStatus</td><td data-v-2cf62835>默认状态（非受控模式）</td><td data-v-2cf62835>&#39;idle&#39; | &#39;loading&#39; | &#39;finished&#39; | &#39;error&#39;</td><td data-v-2cf62835>&#39;idle&#39;</td></tr><tr data-v-2cf62835><td data-v-2cf62835>disabled</td><td data-v-2cf62835>是否禁用</td><td data-v-2cf62835>boolean</td><td data-v-2cf62835>false</td></tr><tr data-v-2cf62835><td data-v-2cf62835>direction</td><td data-v-2cf62835>滚动方向</td><td data-v-2cf62835>&#39;vertical&#39; | &#39;horizontal&#39;</td><td data-v-2cf62835>&#39;vertical&#39;</td></tr><tr data-v-2cf62835><td data-v-2cf62835>offset</td><td data-v-2cf62835>触发加载的距离阈值（像素）</td><td data-v-2cf62835>number</td><td data-v-2cf62835>100</td></tr><tr data-v-2cf62835><td data-v-2cf62835>immediate</td><td data-v-2cf62835>是否立即执行一次检查</td><td data-v-2cf62835>boolean</td><td data-v-2cf62835>true</td></tr><tr data-v-2cf62835><td data-v-2cf62835>loadingText</td><td data-v-2cf62835>加载中提示文本</td><td data-v-2cf62835>string</td><td data-v-2cf62835>&#39;加载中...&#39;</td></tr><tr data-v-2cf62835><td data-v-2cf62835>finishedText</td><td data-v-2cf62835>加载完成提示文本</td><td data-v-2cf62835>string</td><td data-v-2cf62835>&#39;没有更多了&#39;</td></tr><tr data-v-2cf62835><td data-v-2cf62835>errorText</td><td data-v-2cf62835>加载失败提示文本</td><td data-v-2cf62835>string</td><td data-v-2cf62835>&#39;加载失败&#39;</td></tr><tr data-v-2cf62835><td data-v-2cf62835>retryText</td><td data-v-2cf62835>重试按钮文本</td><td data-v-2cf62835>string</td><td data-v-2cf62835>&#39;点击重试&#39;</td></tr><tr data-v-2cf62835><td data-v-2cf62835>customClass</td><td data-v-2cf62835>自定义类名</td><td data-v-2cf62835>string</td><td data-v-2cf62835>-</td></tr></tbody></table><h3 data-v-2cf62835>Events</h3><table class="api-table" data-v-2cf62835><thead data-v-2cf62835><tr data-v-2cf62835><th data-v-2cf62835>事件名</th><th data-v-2cf62835>说明</th><th data-v-2cf62835>回调参数</th></tr></thead><tbody data-v-2cf62835><tr data-v-2cf62835><td data-v-2cf62835>load</td><td data-v-2cf62835>触发加载时</td><td data-v-2cf62835>-</td></tr><tr data-v-2cf62835><td data-v-2cf62835>update:status</td><td data-v-2cf62835>状态变化时</td><td data-v-2cf62835>(status: InfiniteScrollStatus)</td></tr></tbody></table><h3 data-v-2cf62835>Methods</h3><table class="api-table" data-v-2cf62835><thead data-v-2cf62835><tr data-v-2cf62835><th data-v-2cf62835>方法名</th><th data-v-2cf62835>说明</th><th data-v-2cf62835>参数</th></tr></thead><tbody data-v-2cf62835><tr data-v-2cf62835><td data-v-2cf62835>check</td><td data-v-2cf62835>检查是否需要加载</td><td data-v-2cf62835>-</td></tr><tr data-v-2cf62835><td data-v-2cf62835>setLoading</td><td data-v-2cf62835>设置状态为加载中</td><td data-v-2cf62835>-</td></tr><tr data-v-2cf62835><td data-v-2cf62835>setFinished</td><td data-v-2cf62835>设置状态为完成</td><td data-v-2cf62835>-</td></tr><tr data-v-2cf62835><td data-v-2cf62835>setError</td><td data-v-2cf62835>设置状态为错误</td><td data-v-2cf62835>-</td></tr><tr data-v-2cf62835><td data-v-2cf62835>reset</td><td data-v-2cf62835>重置状态</td><td data-v-2cf62835>-</td></tr></tbody></table></div></section>`,1)]))}}),[[`__scopeId`,`data-v-2cf62835`]]);export{ct as default};
import{B as e,C as t,F as n,K as r,M as i,P as a,S as o,V as s,W as c,Y as l,_ as u,d,g as f,h as p,i as m,l as h,p as g,q as _,v,x as y,y as b,z as x}from"./index-B3Jx3uix.js";import{t as S}from"./button-GOPf8Q2w.js";import{n as C,t as w}from"./select-DfWCBj6N.js";import{t as T}from"./CodeBlock-CE4Cu_o1.js";var E={key:0,class:`ale-pagination__total`},ee=[`disabled`],te={key:0,class:`ale-pagination__btn-text`},ne={key:2,class:`ale-pagination__pager`},re={class:`ale-pagination__more-icon`},ie=[`onClick`],ae={class:`ale-pagination__more-icon`},oe={key:3,class:`ale-pagination__simple`},se=[`value`,`max`,`disabled`],ce={class:`ale-pagination__simple-total`},le=[`disabled`],ue={key:0,class:`ale-pagination__btn-text`},de={key:4,class:`ale-pagination__jumper`},fe=[`max`,`disabled`],D=t({__name:`Pagination`,props:{current:{default:1},pageSize:{default:10},total:{},pageSizeOptions:{default:()=>[10,20,50,100]},showTotal:{type:Boolean,default:!0},showJumper:{type:Boolean,default:!1},showSizeChanger:{type:Boolean,default:!1},size:{default:`medium`},simple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},layout:{default:`total, prev, pager, next`},totalRender:{},prevText:{default:``},nextText:{default:``},onChange:{},onPageSizeChange:{}},emits:[`update:current`,`update:pageSize`,`change`,`pageSizeChange`],setup(t,{expose:o,emit:m}){let S=t,T=m,D=c(S.current),O=c(S.pageSize),k=c(S.current),A=c(!1),j=c(!1),M=p(()=>[`ale-pagination`,`ale-pagination--${S.size}`,{"ale-pagination--simple":S.simple,"ale-pagination--disabled":S.disabled}]),N=p(()=>({small:`small`,medium:`medium`,large:`large`})[S.size]||`medium`),P=p(()=>S.total<=0?1:Math.ceil(S.total/O.value)),F=p(()=>S.total===0?0:(D.value-1)*O.value+1),I=p(()=>Math.min(D.value*O.value,S.total)),L=p(()=>{let e=[],t=P.value,n=D.value;if(t<=7)for(let n=1;n<=t;n++)e.push(n);else{let r=Math.max(1,n-3),i=Math.min(t,n+3);n-1<3&&(i=6),t-n<3&&(r=t-7+2);for(let t=r;t<=i;t++)e.push(t)}return e}),R=p(()=>P.value>7&&L.value[0]>1),z=p(()=>P.value>7&&L.value[L.value.length-1]<P.value),B=p(()=>P.value>7&&L.value[0]>2),V=p(()=>P.value>7&&L.value[L.value.length-1]<P.value-1),H=p(()=>S.layout.includes(`total`)&&S.showTotal),U=p(()=>S.layout.includes(`sizes`)&&S.showSizeChanger),W=p(()=>S.layout.includes(`jumper`)&&S.showJumper),G=e=>{e<1||e>P.value||e===D.value||(D.value=e,k.value=e,T(`update:current`,e),T(`change`,e,O.value),S.onChange&&S.onChange(e,O.value))},K=()=>{G(D.value-1)},q=()=>{G(D.value+1)},J=()=>{G(Math.max(1,D.value-5))},Y=()=>{G(Math.min(P.value,D.value+5))},X=e=>{let t=Array.isArray(e)?e[0]:e;if(t===void 0){console.warn(`[Pagination] handleSizeChange received undefined value`);return}let n=typeof t==`string`?parseInt(t,10):t,r=Math.ceil(S.total/n),i=D.value||1;i>r&&(i=r),O.value=n,D.value=i,k.value=i,T(`update:pageSize`,n),T(`update:current`,i),T(`pageSizeChange`,i,n),S.onPageSizeChange&&S.onPageSizeChange(i,n)},Z=e=>{let t=e.target,n=parseInt(t.value,10);n>=1&&n<=P.value&&G(n)},Q=()=>{let e=k.value;e<1&&(e=1),e>P.value&&(e=P.value),G(e)};return x(()=>S.current,e=>{e!==D.value&&(D.value=e,k.value=e)}),x(()=>S.pageSize,e=>{e!==O.value&&(O.value=e)}),o({goTo:G,prev:K,next:q,getCurrent:()=>D.value,getTotalPages:()=>P.value}),(o,c)=>(i(),b(`div`,{class:_(M.value)},[H.value?(i(),b(`span`,E,[t.totalRender&&typeof t.totalRender==`function`?(i(),b(g,{key:0},[y(l(t.totalRender(t.total,[F.value,I.value])),1)],64)):(i(),b(g,{key:1},[y(` 共 `+l(t.total)+` 条 `,1)],64))])):v(``,!0),U.value?(i(),u(r(C),{key:1,"model-value":O.value,disabled:t.disabled,class:`ale-pagination__size-changer`,size:N.value,"onUpdate:modelValue":X},{default:e(()=>[(i(!0),b(g,null,a(t.pageSizeOptions,e=>(i(),u(r(w),{key:e,label:`${e} 条/页`,value:e},null,8,[`label`,`value`]))),128))]),_:1},8,[`model-value`,`disabled`,`size`])):v(``,!0),f(`button`,{type:`button`,disabled:D.value<=1||t.disabled,class:_([`ale-pagination__btn`,`ale-pagination__prev`]),onClick:K},[n(o.$slots,`prev`,{},()=>[c[7]||=f(`span`,{class:`ale-pagination__btn-icon`},`‹`,-1),t.prevText?(i(),b(`span`,te,l(t.prevText),1)):v(``,!0)])],8,ee),t.simple?(i(),b(`div`,oe,[f(`input`,{value:D.value,type:`number`,min:`1`,max:P.value,disabled:t.disabled,class:`ale-pagination__simple-input`,onKeyup:d(Z,[`enter`])},null,40,se),c[8]||=f(`span`,{class:`ale-pagination__simple-separator`},`/`,-1),f(`span`,ce,l(P.value),1)])):(i(),b(`ul`,ne,[R.value?(i(),b(`li`,{key:0,class:_([`ale-pagination__item`,{"is-active":D.value===1}]),onClick:c[0]||=e=>G(1)},` 1 `,2)):v(``,!0),B.value?(i(),b(`li`,{key:1,class:_([`ale-pagination__item`,`ale-pagination__more`,{"is-active":A.value}]),onMouseenter:c[1]||=e=>A.value=!0,onMouseleave:c[2]||=e=>A.value=!1,onClick:J},[f(`span`,re,l(A.value?`«`:`...`),1)],34)):v(``,!0),(i(!0),b(g,null,a(L.value,e=>(i(),b(`li`,{key:e,class:_([`ale-pagination__item`,{"is-active":D.value===e}]),onClick:t=>G(e)},l(e),11,ie))),128)),V.value?(i(),b(`li`,{key:2,class:_([`ale-pagination__item`,`ale-pagination__more`,{"is-active":j.value}]),onMouseenter:c[3]||=e=>j.value=!0,onMouseleave:c[4]||=e=>j.value=!1,onClick:Y},[f(`span`,ae,l(j.value?`»`:`...`),1)],34)):v(``,!0),z.value?(i(),b(`li`,{key:3,class:_([`ale-pagination__item`,{"is-active":D.value===P.value}]),onClick:c[5]||=e=>G(P.value)},l(P.value),3)):v(``,!0)])),f(`button`,{type:`button`,disabled:D.value>=P.value||t.disabled,class:_([`ale-pagination__btn`,`ale-pagination__next`]),onClick:q},[n(o.$slots,`next`,{},()=>[t.nextText?(i(),b(`span`,ue,l(t.nextText),1)):v(``,!0),c[9]||=f(`span`,{class:`ale-pagination__btn-icon`},`›`,-1)])],8,le),W.value&&!t.simple?(i(),b(`div`,de,[c[10]||=f(`span`,{class:`ale-pagination__jumper-text`},`跳至`,-1),s(f(`input`,{"onUpdate:modelValue":c[6]||=e=>k.value=e,type:`number`,min:`1`,max:P.value,disabled:t.disabled,class:`ale-pagination__jumper-input`,onKeyup:d(Q,[`enter`])},null,40,fe),[[h,k.value,void 0,{number:!0}]]),c[11]||=f(`span`,{class:`ale-pagination__jumper-text`},`页`,-1)])):v(``,!0)],2))}}),O={class:`component-demo-view`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`},j={class:`component-demo-view__code`},M={class:`component-demo-view__section`},N={class:`component-demo-view__demo`},P={class:`component-demo-view__code`},F={class:`component-demo-view__section`},I={class:`component-demo-view__demo demo-stack`},L={class:`demo-info`},R={class:`demo-info-value`},z={class:`demo-info-value`},B={class:`component-demo-view__code`},V={class:`component-demo-view__section`},H={class:`component-demo-view__demo`},U={class:`component-demo-view__code`},W={class:`component-demo-view__section`},G={class:`component-demo-view__demo`},K={class:`component-demo-view__code`},q={class:`component-demo-view__section`},J={class:`component-demo-view__demo demo-stack`},Y={class:`demo-item`},X={class:`demo-item`},Z={class:`demo-item`},Q={class:`component-demo-view__code`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`},he={class:`component-demo-view__code`},ge={class:`component-demo-view__section`},_e={class:`component-demo-view__demo`},ve={class:`component-demo-view__code`},ye={class:`component-demo-view__section`},be={class:`component-demo-view__demo`},xe={class:`demo-controls`},Se={class:`component-demo-view__code`},Ce=`<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AlePagination } from 'ale-ui';

const current = ref(1);

const handleChange = (page: number) => {
  console.log('当前页码:', page);
};
<\/script>`,we=`<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    layout="total, prev, pager, next"
  />
</template>`,Te=`<template>
  <AlePagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="200"
    :page-size-options="[10, 20, 50, 100]"
    layout="sizes, prev, pager, next"
    :showSizeChanger="true"
    @size-change="handleSizeChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);

const handleSizeChange = (page: number, size: number) => {
  console.log('当前页码:', page, '每页条数:', size);
};
<\/script>`,Ee=`<template>
  <AlePagination
    v-model:current="current"
    :total="500"
    :page-size="10"
    layout="prev, pager, next, jumper"
  />
</template>`,$=`<template>
  <AlePagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="1000"
    :page-size-options="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);
<\/script>`,De=`<template>
  <!-- Small -->
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    size="small"
  />
  
  <!-- Medium (默认) -->
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    size="medium"
  />
  
  <!-- Large -->
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    size="large"
  />
</template>`,Oe=`<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    disabled
  />
</template>`,ke=`<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
    simple
  />
</template>`,Ae=`<template>
  <AlePagination
    v-model:current="current"
    :total="100"
    :page-size="10"
  />
  <div class="controls">
    <AleButton @click="current = 1">首页</AleButton>
    <AleButton @click="current = 5">第 5 页</AleButton>
    <AleButton @click="current = 10">末页</AleButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AlePagination, AleButton } from 'ale-ui';

const current = ref(1);
<\/script>`,je=m(t({__name:`PaginationView`,setup(t){let n=c(1),a=c(1),s=c(1),u=c(1),d=c(1),p=c(1),m=c(1),h=c(1),g=c(1),_=c(1),v=c(1),x=c(10),C=c(10),w=e=>{console.log(`当前页码:`,e)},E=(e,t)=>{console.log(`当前页码:`,e,`每页条数:`,t)};return(t,c)=>(i(),b(`div`,O,[c[43]||=f(`div`,{class:`component-demo-view__header`},[f(`h1`,{class:`component-demo-view__title`},`Pagination 分页`),f(`p`,{class:`component-demo-view__description`},` 用于分隔长列表的分页组件，支持多种布局配置、尺寸选择和快捷跳转。 `)],-1),f(`section`,k,[c[16]||=f(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),c[17]||=f(`p`,{class:`component-demo-view__section-desc`},`基础分页用法，支持页码切换。`,-1),f(`div`,A,[o(r(D),{current:n.value,"onUpdate:current":c[0]||=e=>n.value=e,total:100,"page-size":10,onChange:w},null,8,[`current`])]),f(`div`,j,[o(T,{code:Ce,language:`vue`,title:`示例代码`})])]),f(`section`,M,[c[18]||=f(`h2`,{class:`component-demo-view__section-title`},`显示总数`,-1),c[19]||=f(`p`,{class:`component-demo-view__section-desc`},`通过 layout 配置显示数据总数。`,-1),f(`div`,N,[o(r(D),{current:a.value,"onUpdate:current":c[1]||=e=>a.value=e,total:100,"page-size":10,layout:`total, prev, pager, next`,onChange:w},null,8,[`current`])]),f(`div`,P,[o(T,{code:we,language:`vue`,title:`示例代码`})])]),f(`section`,F,[c[23]||=f(`h2`,{class:`component-demo-view__section-title`},`每页数量选择`,-1),c[24]||=f(`p`,{class:`component-demo-view__section-desc`},`支持切换每页显示的数据条数。`,-1),f(`div`,I,[o(r(D),{current:s.value,"onUpdate:current":c[2]||=e=>s.value=e,"page-size":x.value,"onUpdate:pageSize":c[3]||=e=>x.value=e,total:200,"page-size-options":[10,20,50,100],layout:`sizes, prev, pager, next`,showSizeChanger:!0,onChange:w,onSizeChange:E},null,8,[`current`,`page-size`]),f(`div`,L,[c[20]||=f(`span`,{class:`demo-info-label`},`当前选中：`,-1),f(`span`,R,l(x.value)+` 条/页`,1),c[21]||=f(`span`,{class:`demo-info-divider`},`|`,-1),c[22]||=f(`span`,{class:`demo-info-label`},`当前页码：`,-1),f(`span`,z,`第 `+l(s.value)+` 页`,1)])]),f(`div`,B,[o(T,{code:Te,language:`vue`,title:`示例代码`})])]),f(`section`,V,[c[25]||=f(`h2`,{class:`component-demo-view__section-title`},`快捷跳转`,-1),c[26]||=f(`p`,{class:`component-demo-view__section-desc`},`支持直接跳转到指定页码。`,-1),f(`div`,H,[o(r(D),{current:u.value,"onUpdate:current":c[4]||=e=>u.value=e,total:500,"page-size":10,layout:`prev, pager, next, jumper`,onChange:w},null,8,[`current`])]),f(`div`,U,[o(T,{code:Ee,language:`vue`,title:`示例代码`})])]),f(`section`,W,[c[27]||=f(`h2`,{class:`component-demo-view__section-title`},`完整功能`,-1),c[28]||=f(`p`,{class:`component-demo-view__section-desc`},`包含所有功能的分页组件。`,-1),f(`div`,G,[o(r(D),{current:d.value,"onUpdate:current":c[5]||=e=>d.value=e,"page-size":C.value,"onUpdate:pageSize":c[6]||=e=>C.value=e,total:1e3,"page-size-options":[10,20,50,100],layout:`total, sizes, prev, pager, next, jumper`,showSizeChanger:!0,onChange:w,onSizeChange:E},null,8,[`current`,`page-size`])]),f(`div`,K,[o(T,{code:$,language:`vue`,title:`示例代码`})])]),f(`section`,q,[c[32]||=f(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),c[33]||=f(`p`,{class:`component-demo-view__section-desc`},`提供了三种尺寸：small、medium（默认）、large。`,-1),f(`div`,J,[f(`div`,Y,[c[29]||=f(`span`,{class:`demo-label`},`Small`,-1),o(r(D),{current:p.value,"onUpdate:current":c[7]||=e=>p.value=e,total:100,"page-size":10,size:`small`,onChange:w},null,8,[`current`])]),f(`div`,X,[c[30]||=f(`span`,{class:`demo-label`},`Medium (默认)`,-1),o(r(D),{current:m.value,"onUpdate:current":c[8]||=e=>m.value=e,total:100,"page-size":10,size:`medium`,onChange:w},null,8,[`current`])]),f(`div`,Z,[c[31]||=f(`span`,{class:`demo-label`},`Large`,-1),o(r(D),{current:h.value,"onUpdate:current":c[9]||=e=>h.value=e,total:100,"page-size":10,size:`large`,onChange:w},null,8,[`current`])])]),f(`div`,Q,[o(T,{code:De,language:`vue`,title:`示例代码`})])]),f(`section`,pe,[c[34]||=f(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),c[35]||=f(`p`,{class:`component-demo-view__section-desc`},`分页组件可以被禁用。`,-1),f(`div`,me,[o(r(D),{current:g.value,"onUpdate:current":c[10]||=e=>g.value=e,total:100,"page-size":10,disabled:``,onChange:w},null,8,[`current`])]),f(`div`,he,[o(T,{code:Oe,language:`vue`,title:`示例代码`})])]),f(`section`,ge,[c[36]||=f(`h2`,{class:`component-demo-view__section-title`},`简洁模式`,-1),c[37]||=f(`p`,{class:`component-demo-view__section-desc`},`简洁的分页模式，适合空间有限的场景。`,-1),f(`div`,_e,[o(r(D),{current:_.value,"onUpdate:current":c[11]||=e=>_.value=e,total:100,"page-size":10,simple:``,onChange:w},null,8,[`current`])]),f(`div`,ve,[o(T,{code:ke,language:`vue`,title:`示例代码`})])]),f(`section`,ye,[c[41]||=f(`h2`,{class:`component-demo-view__section-title`},`受控模式`,-1),c[42]||=f(`p`,{class:`component-demo-view__section-desc`},`通过 v-model 控制当前页码。`,-1),f(`div`,be,[o(r(D),{current:v.value,"onUpdate:current":c[12]||=e=>v.value=e,total:100,"page-size":10,onChange:w},null,8,[`current`]),f(`div`,xe,[o(r(S),{onClick:c[13]||=e=>v.value=1},{default:e(()=>[...c[38]||=[y(`首页`,-1)]]),_:1}),o(r(S),{onClick:c[14]||=e=>v.value=5},{default:e(()=>[...c[39]||=[y(`第 5 页`,-1)]]),_:1}),o(r(S),{onClick:c[15]||=e=>v.value=10},{default:e(()=>[...c[40]||=[y(`末页`,-1)]]),_:1})])]),f(`div`,Se,[o(T,{code:Ae,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-cbc58125`]]);export{je as default};
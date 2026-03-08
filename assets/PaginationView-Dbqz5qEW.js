import{t as e}from"./CodeBlock-CmDK_EYq.js";import{B as t,G as n,J as r,K as i,N as a,P as o,R as s,S as c,U as l,_ as u,b as d,c as f,f as p,g as m,h,j as g,m as _,r as v,u as y,v as b,x,z as S}from"./index-D6beBo5R.js";import{t as C}from"./button-CbFeg90j.js";import{n as w,t as T}from"./select-CYUd20oF.js";var E={key:0,class:`ale-pagination__total`},ee=[`disabled`],te={key:0,class:`ale-pagination__btn-text`},ne={key:2,class:`ale-pagination__pager`},re={class:`ale-pagination__more-icon`},ie=[`onClick`],ae={class:`ale-pagination__more-icon`},oe={key:3,class:`ale-pagination__simple`},se=[`value`,`max`,`disabled`],ce={class:`ale-pagination__simple-total`},le=[`disabled`],ue={key:0,class:`ale-pagination__btn-text`},de={key:4,class:`ale-pagination__jumper`},fe=[`max`,`disabled`],D=c({__name:`Pagination`,props:{current:{default:1},pageSize:{default:10},total:{},pageSizeOptions:{default:()=>[10,20,50,100]},showTotal:{type:Boolean,default:!0},showJumper:{type:Boolean,default:!1},showSizeChanger:{type:Boolean,default:!1},size:{default:`medium`},simple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},layout:{default:`total, prev, pager, next`},totalRender:{},prevText:{default:``},nextText:{default:``},onChange:{},onPageSizeChange:{}},emits:[`update:current`,`update:pageSize`,`change`,`pageSizeChange`],setup(e,{expose:c,emit:v}){let x=e,C=v,D=l(x.current),O=l(x.pageSize),k=l(x.current),A=l(!1),j=l(!1),M=_(()=>[`ale-pagination`,`ale-pagination--${x.size}`,{"ale-pagination--simple":x.simple,"ale-pagination--disabled":x.disabled}]),N=_(()=>({small:`small`,medium:`medium`,large:`large`})[x.size]||`medium`),P=_(()=>x.total<=0?1:Math.ceil(x.total/O.value)),F=_(()=>x.total===0?0:(D.value-1)*O.value+1),I=_(()=>Math.min(D.value*O.value,x.total)),L=_(()=>{let e=[],t=P.value,n=D.value;if(t<=7)for(let n=1;n<=t;n++)e.push(n);else{let r=Math.max(1,n-3),i=Math.min(t,n+3);n-1<3&&(i=6),t-n<3&&(r=t-7+2);for(let t=r;t<=i;t++)e.push(t)}return e}),R=_(()=>P.value>7&&L.value[0]>1),z=_(()=>P.value>7&&L.value[L.value.length-1]<P.value),B=_(()=>P.value>7&&L.value[0]>2),V=_(()=>P.value>7&&L.value[L.value.length-1]<P.value-1),H=_(()=>x.layout.includes(`total`)&&x.showTotal),U=_(()=>x.layout.includes(`sizes`)&&x.showSizeChanger),W=_(()=>x.layout.includes(`jumper`)&&x.showJumper),G=e=>{e<1||e>P.value||e===D.value||(D.value=e,k.value=e,C(`update:current`,e),C(`change`,e,O.value),x.onChange&&x.onChange(e,O.value))},K=()=>{G(D.value-1)},q=()=>{G(D.value+1)},J=()=>{G(Math.max(1,D.value-5))},Y=()=>{G(Math.min(P.value,D.value+5))},X=e=>{let t=Array.isArray(e)?e[0]:e;if(t===void 0){console.warn(`[Pagination] handleSizeChange received undefined value`);return}let n=typeof t==`string`?parseInt(t,10):t,r=Math.ceil(x.total/n),i=D.value||1;i>r&&(i=r),O.value=n,D.value=i,k.value=i,C(`update:pageSize`,n),C(`update:current`,i),C(`pageSizeChange`,i,n),x.onPageSizeChange&&x.onPageSizeChange(i,n)},Z=e=>{let t=e.target,n=parseInt(t.value,10);n>=1&&n<=P.value&&G(n)},Q=()=>{let e=k.value;e<1&&(e=1),e>P.value&&(e=P.value),G(e)};return s(()=>x.current,e=>{e!==D.value&&(D.value=e,k.value=e)}),s(()=>x.pageSize,e=>{e!==O.value&&(O.value=e)}),c({goTo:G,prev:K,next:q,getCurrent:()=>D.value,getTotalPages:()=>P.value}),(s,c)=>(g(),b(`div`,{class:i(M.value)},[H.value?(g(),b(`span`,E,[e.totalRender&&typeof e.totalRender==`function`?(g(),b(p,{key:0},[d(r(e.totalRender(e.total,[F.value,I.value])),1)],64)):(g(),b(p,{key:1},[d(` 共 `+r(e.total)+` 条 `,1)],64))])):u(``,!0),U.value?(g(),m(n(w),{key:1,"model-value":O.value,disabled:e.disabled,class:`ale-pagination__size-changer`,size:N.value,"onUpdate:modelValue":X},{default:S(()=>[(g(!0),b(p,null,a(e.pageSizeOptions,e=>(g(),m(n(T),{key:e,label:`${e} 条/页`,value:e},null,8,[`label`,`value`]))),128))]),_:1},8,[`model-value`,`disabled`,`size`])):u(``,!0),h(`button`,{type:`button`,disabled:D.value<=1||e.disabled,class:i([`ale-pagination__btn`,`ale-pagination__prev`]),onClick:K},[o(s.$slots,`prev`,{},()=>[c[7]||=h(`span`,{class:`ale-pagination__btn-icon`},`‹`,-1),e.prevText?(g(),b(`span`,te,r(e.prevText),1)):u(``,!0)])],8,ee),e.simple?(g(),b(`div`,oe,[h(`input`,{value:D.value,type:`number`,min:`1`,max:P.value,disabled:e.disabled,class:`ale-pagination__simple-input`,onKeyup:y(Z,[`enter`])},null,40,se),c[8]||=h(`span`,{class:`ale-pagination__simple-separator`},`/`,-1),h(`span`,ce,r(P.value),1)])):(g(),b(`ul`,ne,[R.value?(g(),b(`li`,{key:0,class:i([`ale-pagination__item`,{"is-active":D.value===1}]),onClick:c[0]||=e=>G(1)},` 1 `,2)):u(``,!0),B.value?(g(),b(`li`,{key:1,class:i([`ale-pagination__item`,`ale-pagination__more`,{"is-active":A.value}]),onMouseenter:c[1]||=e=>A.value=!0,onMouseleave:c[2]||=e=>A.value=!1,onClick:J},[h(`span`,re,r(A.value?`«`:`...`),1)],34)):u(``,!0),(g(!0),b(p,null,a(L.value,e=>(g(),b(`li`,{key:e,class:i([`ale-pagination__item`,{"is-active":D.value===e}]),onClick:t=>G(e)},r(e),11,ie))),128)),V.value?(g(),b(`li`,{key:2,class:i([`ale-pagination__item`,`ale-pagination__more`,{"is-active":j.value}]),onMouseenter:c[3]||=e=>j.value=!0,onMouseleave:c[4]||=e=>j.value=!1,onClick:Y},[h(`span`,ae,r(j.value?`»`:`...`),1)],34)):u(``,!0),z.value?(g(),b(`li`,{key:3,class:i([`ale-pagination__item`,{"is-active":D.value===P.value}]),onClick:c[5]||=e=>G(P.value)},r(P.value),3)):u(``,!0)])),h(`button`,{type:`button`,disabled:D.value>=P.value||e.disabled,class:i([`ale-pagination__btn`,`ale-pagination__next`]),onClick:q},[o(s.$slots,`next`,{},()=>[e.nextText?(g(),b(`span`,ue,r(e.nextText),1)):u(``,!0),c[9]||=h(`span`,{class:`ale-pagination__btn-icon`},`›`,-1)])],8,le),W.value&&!e.simple?(g(),b(`div`,de,[c[10]||=h(`span`,{class:`ale-pagination__jumper-text`},`跳至`,-1),t(h(`input`,{"onUpdate:modelValue":c[6]||=e=>k.value=e,type:`number`,min:`1`,max:P.value,disabled:e.disabled,class:`ale-pagination__jumper-input`,onKeyup:y(Q,[`enter`])},null,40,fe),[[f,k.value,void 0,{number:!0}]]),c[11]||=h(`span`,{class:`ale-pagination__jumper-text`},`页`,-1)])):u(``,!0)],2))}}),O={class:`component-demo-view`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`},j={class:`component-demo-view__code`},M={class:`component-demo-view__section`},N={class:`component-demo-view__demo`},P={class:`component-demo-view__code`},F={class:`component-demo-view__section`},I={class:`component-demo-view__demo demo-stack`},L={class:`demo-info`},R={class:`demo-info-value`},z={class:`demo-info-value`},B={class:`component-demo-view__code`},V={class:`component-demo-view__section`},H={class:`component-demo-view__demo`},U={class:`component-demo-view__code`},W={class:`component-demo-view__section`},G={class:`component-demo-view__demo`},K={class:`component-demo-view__code`},q={class:`component-demo-view__section`},J={class:`component-demo-view__demo demo-stack`},Y={class:`demo-item`},X={class:`demo-item`},Z={class:`demo-item`},Q={class:`component-demo-view__code`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`},he={class:`component-demo-view__code`},ge={class:`component-demo-view__section`},_e={class:`component-demo-view__demo`},ve={class:`component-demo-view__code`},ye={class:`component-demo-view__section`},be={class:`component-demo-view__demo`},xe={class:`demo-controls`},Se={class:`component-demo-view__code`},Ce=`<template>
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
<\/script>`,je=v(c({__name:`PaginationView`,setup(t){let i=l(1),a=l(1),o=l(1),s=l(1),c=l(1),u=l(1),f=l(1),p=l(1),m=l(1),_=l(1),v=l(1),y=l(10),w=l(10),T=e=>{console.log(`当前页码:`,e)},E=(e,t)=>{console.log(`当前页码:`,e,`每页条数:`,t)};return(t,l)=>(g(),b(`div`,O,[l[43]||=h(`div`,{class:`component-demo-view__header`},[h(`h1`,{class:`component-demo-view__title`},`Pagination 分页`),h(`p`,{class:`component-demo-view__description`},` 用于分隔长列表的分页组件，支持多种布局配置、尺寸选择和快捷跳转。 `)],-1),h(`section`,k,[l[16]||=h(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),l[17]||=h(`p`,{class:`component-demo-view__section-desc`},`基础分页用法，支持页码切换。`,-1),h(`div`,A,[x(n(D),{current:i.value,"onUpdate:current":l[0]||=e=>i.value=e,total:100,"page-size":10,onChange:T},null,8,[`current`])]),h(`div`,j,[x(e,{code:Ce,language:`vue`,title:`示例代码`})])]),h(`section`,M,[l[18]||=h(`h2`,{class:`component-demo-view__section-title`},`显示总数`,-1),l[19]||=h(`p`,{class:`component-demo-view__section-desc`},`通过 layout 配置显示数据总数。`,-1),h(`div`,N,[x(n(D),{current:a.value,"onUpdate:current":l[1]||=e=>a.value=e,total:100,"page-size":10,layout:`total, prev, pager, next`,onChange:T},null,8,[`current`])]),h(`div`,P,[x(e,{code:we,language:`vue`,title:`示例代码`})])]),h(`section`,F,[l[23]||=h(`h2`,{class:`component-demo-view__section-title`},`每页数量选择`,-1),l[24]||=h(`p`,{class:`component-demo-view__section-desc`},`支持切换每页显示的数据条数。`,-1),h(`div`,I,[x(n(D),{current:o.value,"onUpdate:current":l[2]||=e=>o.value=e,"page-size":y.value,"onUpdate:pageSize":l[3]||=e=>y.value=e,total:200,"page-size-options":[10,20,50,100],layout:`sizes, prev, pager, next`,showSizeChanger:!0,onChange:T,onSizeChange:E},null,8,[`current`,`page-size`]),h(`div`,L,[l[20]||=h(`span`,{class:`demo-info-label`},`当前选中：`,-1),h(`span`,R,r(y.value)+` 条/页`,1),l[21]||=h(`span`,{class:`demo-info-divider`},`|`,-1),l[22]||=h(`span`,{class:`demo-info-label`},`当前页码：`,-1),h(`span`,z,`第 `+r(o.value)+` 页`,1)])]),h(`div`,B,[x(e,{code:Te,language:`vue`,title:`示例代码`})])]),h(`section`,V,[l[25]||=h(`h2`,{class:`component-demo-view__section-title`},`快捷跳转`,-1),l[26]||=h(`p`,{class:`component-demo-view__section-desc`},`支持直接跳转到指定页码。`,-1),h(`div`,H,[x(n(D),{current:s.value,"onUpdate:current":l[4]||=e=>s.value=e,total:500,"page-size":10,layout:`prev, pager, next, jumper`,onChange:T},null,8,[`current`])]),h(`div`,U,[x(e,{code:Ee,language:`vue`,title:`示例代码`})])]),h(`section`,W,[l[27]||=h(`h2`,{class:`component-demo-view__section-title`},`完整功能`,-1),l[28]||=h(`p`,{class:`component-demo-view__section-desc`},`包含所有功能的分页组件。`,-1),h(`div`,G,[x(n(D),{current:c.value,"onUpdate:current":l[5]||=e=>c.value=e,"page-size":w.value,"onUpdate:pageSize":l[6]||=e=>w.value=e,total:1e3,"page-size-options":[10,20,50,100],layout:`total, sizes, prev, pager, next, jumper`,showSizeChanger:!0,onChange:T,onSizeChange:E},null,8,[`current`,`page-size`])]),h(`div`,K,[x(e,{code:$,language:`vue`,title:`示例代码`})])]),h(`section`,q,[l[32]||=h(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),l[33]||=h(`p`,{class:`component-demo-view__section-desc`},`提供了三种尺寸：small、medium（默认）、large。`,-1),h(`div`,J,[h(`div`,Y,[l[29]||=h(`span`,{class:`demo-label`},`Small`,-1),x(n(D),{current:u.value,"onUpdate:current":l[7]||=e=>u.value=e,total:100,"page-size":10,size:`small`,onChange:T},null,8,[`current`])]),h(`div`,X,[l[30]||=h(`span`,{class:`demo-label`},`Medium (默认)`,-1),x(n(D),{current:f.value,"onUpdate:current":l[8]||=e=>f.value=e,total:100,"page-size":10,size:`medium`,onChange:T},null,8,[`current`])]),h(`div`,Z,[l[31]||=h(`span`,{class:`demo-label`},`Large`,-1),x(n(D),{current:p.value,"onUpdate:current":l[9]||=e=>p.value=e,total:100,"page-size":10,size:`large`,onChange:T},null,8,[`current`])])]),h(`div`,Q,[x(e,{code:De,language:`vue`,title:`示例代码`})])]),h(`section`,pe,[l[34]||=h(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),l[35]||=h(`p`,{class:`component-demo-view__section-desc`},`分页组件可以被禁用。`,-1),h(`div`,me,[x(n(D),{current:m.value,"onUpdate:current":l[10]||=e=>m.value=e,total:100,"page-size":10,disabled:``,onChange:T},null,8,[`current`])]),h(`div`,he,[x(e,{code:Oe,language:`vue`,title:`示例代码`})])]),h(`section`,ge,[l[36]||=h(`h2`,{class:`component-demo-view__section-title`},`简洁模式`,-1),l[37]||=h(`p`,{class:`component-demo-view__section-desc`},`简洁的分页模式，适合空间有限的场景。`,-1),h(`div`,_e,[x(n(D),{current:_.value,"onUpdate:current":l[11]||=e=>_.value=e,total:100,"page-size":10,simple:``,onChange:T},null,8,[`current`])]),h(`div`,ve,[x(e,{code:ke,language:`vue`,title:`示例代码`})])]),h(`section`,ye,[l[41]||=h(`h2`,{class:`component-demo-view__section-title`},`受控模式`,-1),l[42]||=h(`p`,{class:`component-demo-view__section-desc`},`通过 v-model 控制当前页码。`,-1),h(`div`,be,[x(n(D),{current:v.value,"onUpdate:current":l[12]||=e=>v.value=e,total:100,"page-size":10,onChange:T},null,8,[`current`]),h(`div`,xe,[x(n(C),{onClick:l[13]||=e=>v.value=1},{default:S(()=>[...l[38]||=[d(`首页`,-1)]]),_:1}),x(n(C),{onClick:l[14]||=e=>v.value=5},{default:S(()=>[...l[39]||=[d(`第 5 页`,-1)]]),_:1}),x(n(C),{onClick:l[15]||=e=>v.value=10},{default:S(()=>[...l[40]||=[d(`末页`,-1)]]),_:1})])]),h(`div`,Se,[x(e,{code:Ae,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-cbc58125`]]);export{je as default};
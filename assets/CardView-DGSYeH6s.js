import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,K as r,P as i,S as a,_ as o,b as s,h as c,j as l,m as ee,q as u,r as d,v as f,x as p,z as m}from"./index-D6beBo5R.js";import{t as h}from"./button-CbFeg90j.js";import{t as g}from"./badge-nE4H8H40.js";var _={class:`ale-card__title`},v={key:1,class:`ale-card__footer`},y=a({__name:`Card`,props:{title:{default:``},shadow:{default:`hover`},bodyStyle:{},headerStyle:{},bordered:{type:Boolean,default:!0},hoverable:{type:Boolean,default:!1},size:{default:`medium`}},emits:[`click`],setup(e,{emit:t}){let a=e,s=t,d=ee(()=>[`ale-card`,`ale-card--${a.shadow}`,`ale-card--${a.size}`,{"is-bordered":a.bordered,"is-hoverable":a.hoverable}]),p=e=>{s(`click`,e)};return(t,a)=>(l(),f(`div`,{class:r(d.value),onClick:p},[t.$slots.header||e.title?(l(),f(`div`,{key:0,class:`ale-card__header`,style:u(e.headerStyle)},[i(t.$slots,`header`,{},()=>[c(`span`,_,n(e.title),1)])],4)):o(``,!0),c(`div`,{class:`ale-card__body`,style:u(e.bodyStyle)},[i(t.$slots,`default`)],4),t.$slots.footer?(l(),f(`div`,v,[i(t.$slots,`footer`)])):o(``,!0)],2))}}),b={class:`component-demo-view`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`},M={class:`card-footer-actions`},N={class:`component-demo-view__code`},P={class:`component-demo-view__section`},F={class:`component-demo-view__demo`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`},z={class:`component-demo-view__code`},te={class:`component-demo-view__section`},B={class:`component-demo-view__demo`},V={class:`component-demo-view__code`},H={class:`component-demo-view__section`},U={class:`component-demo-view__demo`},W={class:`component-demo-view__code`},G={class:`component-demo-view__section`},K={class:`component-demo-view__demo`},q={class:`component-demo-view__code`},J={class:`component-demo-view__section`},Y={class:`component-demo-view__demo`},X={class:`card-complete-header`},Z={class:`card-footer-actions`},Q={class:`component-demo-view__code`},ne=`<template>
  <AleCard title="卡片标题">
    <p>这是卡片的基本内容区域。可以包含任意内容。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`,re=`<template>
  <AleCard>
    <p>这是一个没有标题的卡片示例。</p>
    <p>只包含内容区域，更加简洁。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`,ie=`<template>
  <AleCard>
    <template #header>
      <div class="card-header-custom">
        <span>自定义头部</span>
        <span class="badge">新</span>
      </div>
    </template>
    <p>使用 header 插槽自定义头部内容。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>

<style scoped>
.card-header-custom {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background-color: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>`,ae=`<template>
  <AleCard title="确认信息">
    <p>您确定要执行此操作吗？此操作不可撤销。</p>
    <template #footer>
      <div class="card-footer-actions">
        <AleButton type="default">取消</AleButton>
        <AleButton type="primary">确定</AleButton>
      </div>
    </template>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard, AleButton } from 'ale-ui';
<\/script>

<style scoped>
.card-footer-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>`,oe=`<template>
  <AleCard title="从不" shadow="never">
    <p>shadow="never"，从不显示阴影</p>
  </AleCard>
  <AleCard title="悬停" shadow="hover">
    <p>shadow="hover"，悬停时显示阴影（默认）</p>
  </AleCard>
  <AleCard title="始终" shadow="always">
    <p>shadow="always"，始终显示阴影</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`,$=`<template>
  <AleCard title="小尺寸" size="small">
    <p>size="small"</p>
  </AleCard>
  <AleCard title="中等尺寸" size="medium">
    <p>size="medium"（默认）</p>
  </AleCard>
  <AleCard title="大尺寸" size="large">
    <p>size="large"</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`,se=`<template>
  <AleCard title="悬停效果" hoverable>
    <p>将鼠标悬停在此卡片上，可以看到上浮效果。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`,ce=`<template>
  <AleCard title="无边框" :bordered="false" shadow="hover">
    <p>这是一个无边框的卡片，配合阴影效果看起来更加清爽。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`,le=`<template>
  <AleCard
    title="自定义样式"
    :bodyStyle="{ backgroundColor: 'var(--color-primary-light)' }"
  >
    <p>这个卡片的内容区域使用了自定义背景色。</p>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard } from 'ale-ui';
<\/script>`,ue=`<template>
  <AleCard
    title="产品信息"
    shadow="hover"
    hoverable
    size="large"
  >
    <template #header>
      <div class="card-header">
        <span>产品信息</span>
        <AleBadge :value="99" type="danger">
          <span>热销</span>
        </AleBadge>
      </div>
    </template>
    <div class="card-content">
      <p><strong>产品名称：</strong>Ale UI 组件库</p>
      <p><strong>版本：</strong>v1.0.0</p>
      <p><strong>描述：</strong>一款简洁、美观、易用的 Vue 3 组件库</p>
      <p><strong>特性：</strong>支持 TypeScript、CSS 变量、暗黑模式</p>
    </div>
    <template #footer>
      <div class="card-footer">
        <AleButton type="default">查看详情</AleButton>
        <AleButton type="primary">立即购买</AleButton>
      </div>
    </template>
  </AleCard>
</template>

<script setup lang="ts">
import { AleCard, AleBadge, AleButton } from 'ale-ui';
<\/script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>`,de=d(a({__name:`CardView`,setup(n){return(n,r)=>(l(),f(`div`,b,[r[31]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Card 卡片`),c(`p`,{class:`component-demo-view__description`},` 将信息聚合在卡片容器中展示，支持多种样式和布局 `)],-1),c(`section`,x,[r[1]||=c(`h2`,{class:`component-demo-view__section-title`},`基本用法`,-1),c(`div`,S,[p(t(y),{title:`卡片标题`},{default:m(()=>[...r[0]||=[c(`p`,null,`这是卡片的基本内容区域。可以包含任意内容。`,-1)]]),_:1})]),c(`div`,C,[p(e,{code:ne,language:`vue`,title:`示例代码`})])]),c(`section`,w,[r[3]||=c(`h2`,{class:`component-demo-view__section-title`},`无标题卡片`,-1),c(`div`,T,[p(t(y),null,{default:m(()=>[...r[2]||=[c(`p`,null,`这是一个没有标题的卡片示例。`,-1),c(`p`,null,`只包含内容区域，更加简洁。`,-1)]]),_:1})]),c(`div`,E,[p(e,{code:re,language:`vue`,title:`示例代码`})])]),c(`section`,D,[r[6]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义头部`,-1),c(`div`,O,[p(t(y),null,{header:m(()=>[...r[4]||=[c(`div`,{class:`card-header-custom`},[c(`span`,null,`自定义头部`),c(`span`,{class:`card-header-custom__badge`},`新`)],-1)]]),default:m(()=>[r[5]||=c(`p`,null,`使用 header 插槽自定义头部内容。`,-1)]),_:1})]),c(`div`,k,[p(e,{code:ie,language:`vue`,title:`示例代码`})])]),c(`section`,A,[r[10]||=c(`h2`,{class:`component-demo-view__section-title`},`带底部`,-1),c(`div`,j,[p(t(y),{title:`确认信息`},{footer:m(()=>[c(`div`,M,[p(t(h),{type:`default`},{default:m(()=>[...r[7]||=[s(`取消`,-1)]]),_:1}),p(t(h),{type:`primary`},{default:m(()=>[...r[8]||=[s(`确定`,-1)]]),_:1})])]),default:m(()=>[r[9]||=c(`p`,null,`您确定要执行此操作吗？此操作不可撤销。`,-1)]),_:1})]),c(`div`,N,[p(e,{code:ae,language:`vue`,title:`示例代码`})])]),c(`section`,P,[r[14]||=c(`h2`,{class:`component-demo-view__section-title`},`阴影样式`,-1),c(`div`,F,[p(t(y),{title:`从不`,shadow:`never`},{default:m(()=>[...r[11]||=[c(`p`,null,`shadow="never"，从不显示阴影`,-1)]]),_:1}),p(t(y),{title:`悬停`,shadow:`hover`},{default:m(()=>[...r[12]||=[c(`p`,null,`shadow="hover"，悬停时显示阴影（默认）`,-1)]]),_:1}),p(t(y),{title:`始终`,shadow:`always`},{default:m(()=>[...r[13]||=[c(`p`,null,`shadow="always"，始终显示阴影`,-1)]]),_:1})]),c(`div`,I,[p(e,{code:oe,language:`vue`,title:`示例代码`})])]),c(`section`,L,[r[18]||=c(`h2`,{class:`component-demo-view__section-title`},`尺寸`,-1),c(`div`,R,[p(t(y),{title:`小尺寸`,size:`small`},{default:m(()=>[...r[15]||=[c(`p`,null,`size="small"`,-1)]]),_:1}),p(t(y),{title:`中等尺寸`,size:`medium`},{default:m(()=>[...r[16]||=[c(`p`,null,`size="medium"（默认）`,-1)]]),_:1}),p(t(y),{title:`大尺寸`,size:`large`},{default:m(()=>[...r[17]||=[c(`p`,null,`size="large"`,-1)]]),_:1})]),c(`div`,z,[p(e,{code:$,language:`vue`,title:`示例代码`})])]),c(`section`,te,[r[20]||=c(`h2`,{class:`component-demo-view__section-title`},`可悬停`,-1),c(`div`,B,[p(t(y),{title:`悬停效果`,hoverable:``},{default:m(()=>[...r[19]||=[c(`p`,null,`将鼠标悬停在此卡片上，可以看到上浮效果。`,-1)]]),_:1})]),c(`div`,V,[p(e,{code:se,language:`vue`,title:`示例代码`})])]),c(`section`,H,[r[22]||=c(`h2`,{class:`component-demo-view__section-title`},`无边框`,-1),c(`div`,U,[p(t(y),{title:`无边框`,bordered:!1,shadow:`hover`},{default:m(()=>[...r[21]||=[c(`p`,null,`这是一个无边框的卡片，配合阴影效果看起来更加清爽。`,-1)]]),_:1})]),c(`div`,W,[p(e,{code:ce,language:`vue`,title:`示例代码`})])]),c(`section`,G,[r[24]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义样式`,-1),c(`div`,K,[p(t(y),{title:`自定义样式`,bodyStyle:{backgroundColor:`var(--color-primary-light)`}},{default:m(()=>[...r[23]||=[c(`p`,null,`这个卡片的内容区域使用了自定义背景色。`,-1)]]),_:1})]),c(`div`,q,[p(e,{code:le,language:`vue`,title:`示例代码`})])]),c(`section`,J,[r[30]||=c(`h2`,{class:`component-demo-view__section-title`},`完整示例`,-1),c(`div`,Y,[p(t(y),{title:`产品信息`,shadow:`hover`,hoverable:``,size:`large`},{header:m(()=>[c(`div`,X,[r[26]||=c(`span`,null,`产品信息`,-1),p(t(g),{value:99,type:`danger`},{default:m(()=>[...r[25]||=[c(`span`,null,`热销`,-1)]]),_:1})])]),footer:m(()=>[c(`div`,Z,[p(t(h),{type:`default`},{default:m(()=>[...r[27]||=[s(`查看详情`,-1)]]),_:1}),p(t(h),{type:`primary`},{default:m(()=>[...r[28]||=[s(`立即购买`,-1)]]),_:1})])]),default:m(()=>[r[29]||=c(`div`,{class:`card-complete-content`},[c(`p`,null,[c(`strong`,null,`产品名称：`),s(`Ale UI 组件库`)]),c(`p`,null,[c(`strong`,null,`版本：`),s(`v1.0.0`)]),c(`p`,null,[c(`strong`,null,`描述：`),s(`一款简洁、美观、易用的 Vue 3 组件库`)]),c(`p`,null,[c(`strong`,null,`特性：`),s(`支持 TypeScript、CSS 变量、暗黑模式`)])],-1)]),_:1})]),c(`div`,Q,[p(e,{code:ue,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-4998bf84`]]);export{de as default};
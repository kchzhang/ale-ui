import{B as e,C as t,F as n,J as r,K as i,M as a,S as o,Y as s,g as c,h as ee,i as l,q as u,v as d,x as f,y as p}from"./index-B3Jx3uix.js";import{t as m}from"./button-GOPf8Q2w.js";import{t as h}from"./badge-J6JiNC5t.js";import{t as g}from"./CodeBlock-CE4Cu_o1.js";var _={class:`ale-card__title`},v={key:1,class:`ale-card__footer`},y=t({__name:`Card`,props:{title:{default:``},shadow:{default:`hover`},bodyStyle:{},headerStyle:{},bordered:{type:Boolean,default:!0},hoverable:{type:Boolean,default:!1},size:{default:`medium`}},emits:[`click`],setup(e,{emit:t}){let i=e,o=t,l=ee(()=>[`ale-card`,`ale-card--${i.shadow}`,`ale-card--${i.size}`,{"is-bordered":i.bordered,"is-hoverable":i.hoverable}]),f=e=>{o(`click`,e)};return(t,i)=>(a(),p(`div`,{class:u(l.value),onClick:f},[t.$slots.header||e.title?(a(),p(`div`,{key:0,class:`ale-card__header`,style:r(e.headerStyle)},[n(t.$slots,`header`,{},()=>[c(`span`,_,s(e.title),1)])],4)):d(``,!0),c(`div`,{class:`ale-card__body`,style:r(e.bodyStyle)},[n(t.$slots,`default`)],4),t.$slots.footer?(a(),p(`div`,v,[n(t.$slots,`footer`)])):d(``,!0)],2))}}),b={class:`component-demo-view`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`},M={class:`card-footer-actions`},N={class:`component-demo-view__code`},P={class:`component-demo-view__section`},F={class:`component-demo-view__demo`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`},te={class:`component-demo-view__code`},z={class:`component-demo-view__section`},B={class:`component-demo-view__demo`},V={class:`component-demo-view__code`},H={class:`component-demo-view__section`},U={class:`component-demo-view__demo`},W={class:`component-demo-view__code`},G={class:`component-demo-view__section`},K={class:`component-demo-view__demo`},q={class:`component-demo-view__code`},J={class:`component-demo-view__section`},Y={class:`component-demo-view__demo`},X={class:`card-complete-header`},Z={class:`card-footer-actions`},Q={class:`component-demo-view__code`},ne=`<template>
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
</style>`,de=l(t({__name:`CardView`,setup(t){return(t,n)=>(a(),p(`div`,b,[n[31]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Card 卡片`),c(`p`,{class:`component-demo-view__description`},` 将信息聚合在卡片容器中展示，支持多种样式和布局 `)],-1),c(`section`,x,[n[1]||=c(`h2`,{class:`component-demo-view__section-title`},`基本用法`,-1),c(`div`,S,[o(i(y),{title:`卡片标题`},{default:e(()=>[...n[0]||=[c(`p`,null,`这是卡片的基本内容区域。可以包含任意内容。`,-1)]]),_:1})]),c(`div`,C,[o(g,{code:ne,language:`vue`,title:`示例代码`})])]),c(`section`,w,[n[3]||=c(`h2`,{class:`component-demo-view__section-title`},`无标题卡片`,-1),c(`div`,T,[o(i(y),null,{default:e(()=>[...n[2]||=[c(`p`,null,`这是一个没有标题的卡片示例。`,-1),c(`p`,null,`只包含内容区域，更加简洁。`,-1)]]),_:1})]),c(`div`,E,[o(g,{code:re,language:`vue`,title:`示例代码`})])]),c(`section`,D,[n[6]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义头部`,-1),c(`div`,O,[o(i(y),null,{header:e(()=>[...n[4]||=[c(`div`,{class:`card-header-custom`},[c(`span`,null,`自定义头部`),c(`span`,{class:`card-header-custom__badge`},`新`)],-1)]]),default:e(()=>[n[5]||=c(`p`,null,`使用 header 插槽自定义头部内容。`,-1)]),_:1})]),c(`div`,k,[o(g,{code:ie,language:`vue`,title:`示例代码`})])]),c(`section`,A,[n[10]||=c(`h2`,{class:`component-demo-view__section-title`},`带底部`,-1),c(`div`,j,[o(i(y),{title:`确认信息`},{footer:e(()=>[c(`div`,M,[o(i(m),{type:`default`},{default:e(()=>[...n[7]||=[f(`取消`,-1)]]),_:1}),o(i(m),{type:`primary`},{default:e(()=>[...n[8]||=[f(`确定`,-1)]]),_:1})])]),default:e(()=>[n[9]||=c(`p`,null,`您确定要执行此操作吗？此操作不可撤销。`,-1)]),_:1})]),c(`div`,N,[o(g,{code:ae,language:`vue`,title:`示例代码`})])]),c(`section`,P,[n[14]||=c(`h2`,{class:`component-demo-view__section-title`},`阴影样式`,-1),c(`div`,F,[o(i(y),{title:`从不`,shadow:`never`},{default:e(()=>[...n[11]||=[c(`p`,null,`shadow="never"，从不显示阴影`,-1)]]),_:1}),o(i(y),{title:`悬停`,shadow:`hover`},{default:e(()=>[...n[12]||=[c(`p`,null,`shadow="hover"，悬停时显示阴影（默认）`,-1)]]),_:1}),o(i(y),{title:`始终`,shadow:`always`},{default:e(()=>[...n[13]||=[c(`p`,null,`shadow="always"，始终显示阴影`,-1)]]),_:1})]),c(`div`,I,[o(g,{code:oe,language:`vue`,title:`示例代码`})])]),c(`section`,L,[n[18]||=c(`h2`,{class:`component-demo-view__section-title`},`尺寸`,-1),c(`div`,R,[o(i(y),{title:`小尺寸`,size:`small`},{default:e(()=>[...n[15]||=[c(`p`,null,`size="small"`,-1)]]),_:1}),o(i(y),{title:`中等尺寸`,size:`medium`},{default:e(()=>[...n[16]||=[c(`p`,null,`size="medium"（默认）`,-1)]]),_:1}),o(i(y),{title:`大尺寸`,size:`large`},{default:e(()=>[...n[17]||=[c(`p`,null,`size="large"`,-1)]]),_:1})]),c(`div`,te,[o(g,{code:$,language:`vue`,title:`示例代码`})])]),c(`section`,z,[n[20]||=c(`h2`,{class:`component-demo-view__section-title`},`可悬停`,-1),c(`div`,B,[o(i(y),{title:`悬停效果`,hoverable:``},{default:e(()=>[...n[19]||=[c(`p`,null,`将鼠标悬停在此卡片上，可以看到上浮效果。`,-1)]]),_:1})]),c(`div`,V,[o(g,{code:se,language:`vue`,title:`示例代码`})])]),c(`section`,H,[n[22]||=c(`h2`,{class:`component-demo-view__section-title`},`无边框`,-1),c(`div`,U,[o(i(y),{title:`无边框`,bordered:!1,shadow:`hover`},{default:e(()=>[...n[21]||=[c(`p`,null,`这是一个无边框的卡片，配合阴影效果看起来更加清爽。`,-1)]]),_:1})]),c(`div`,W,[o(g,{code:ce,language:`vue`,title:`示例代码`})])]),c(`section`,G,[n[24]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义样式`,-1),c(`div`,K,[o(i(y),{title:`自定义样式`,bodyStyle:{backgroundColor:`var(--color-primary-light)`}},{default:e(()=>[...n[23]||=[c(`p`,null,`这个卡片的内容区域使用了自定义背景色。`,-1)]]),_:1})]),c(`div`,q,[o(g,{code:le,language:`vue`,title:`示例代码`})])]),c(`section`,J,[n[30]||=c(`h2`,{class:`component-demo-view__section-title`},`完整示例`,-1),c(`div`,Y,[o(i(y),{title:`产品信息`,shadow:`hover`,hoverable:``,size:`large`},{header:e(()=>[c(`div`,X,[n[26]||=c(`span`,null,`产品信息`,-1),o(i(h),{value:99,type:`danger`},{default:e(()=>[...n[25]||=[c(`span`,null,`热销`,-1)]]),_:1})])]),footer:e(()=>[c(`div`,Z,[o(i(m),{type:`default`},{default:e(()=>[...n[27]||=[f(`查看详情`,-1)]]),_:1}),o(i(m),{type:`primary`},{default:e(()=>[...n[28]||=[f(`立即购买`,-1)]]),_:1})])]),default:e(()=>[n[29]||=c(`div`,{class:`card-complete-content`},[c(`p`,null,[c(`strong`,null,`产品名称：`),f(`Ale UI 组件库`)]),c(`p`,null,[c(`strong`,null,`版本：`),f(`v1.0.0`)]),c(`p`,null,[c(`strong`,null,`描述：`),f(`一款简洁、美观、易用的 Vue 3 组件库`)]),c(`p`,null,[c(`strong`,null,`特性：`),f(`支持 TypeScript、CSS 变量、暗黑模式`)])],-1)]),_:1})]),c(`div`,Q,[o(g,{code:ue,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-4998bf84`]]);export{de as default};
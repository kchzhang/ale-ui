import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,N as ee,R as te,S as r,U as i,_ as a,b as o,f as ne,g as s,h as c,j as l,p as re,r as u,v as d,x as f,z as p}from"./index-D6beBo5R.js";import{t as m}from"./button-CbFeg90j.js";import{t as ie}from"./badge-nE4H8H40.js";import"./Loading-CdknV3_8.js";import{t as h}from"./loading-fIVqsTFy.js";var ae={class:`component-demo-view`},oe={class:`component-demo-view__section`},g={class:`component-demo-view__demo`},_={class:`component-demo-view__code`},v={class:`component-demo-view__section`},y={class:`component-demo-view__demo`,style:{gap:`48px`}},b={class:`demo-item`},x={class:`demo-item`},S={class:`demo-item`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`,style:{gap:`48px`}},E={class:`demo-item`},D={class:`demo-item`},O={class:`demo-item`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`,style:{gap:`48px`}},M={class:`demo-item`},N={class:`demo-item`},P={class:`demo-item`},F={class:`demo-item`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`,style:{gap:`48px`}},z={class:`demo-item`},B={class:`demo-item`},V={class:`demo-item`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo`,style:{gap:`48px`}},G={class:`demo-item`},K={class:`demo-item`},q={class:`demo-item`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},ue={class:`overlay-demo`},de={class:`overlay-demo-content`},fe={class:`component-demo-view__code`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`,gap:`24px`}},he={class:`overlay-custom-demo`},ge={class:`overlay-demo`,style:{background:`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`}},_e={class:`overlay-demo-content`},ve={class:`overlay-custom-demo`},ye={class:`overlay-demo`},be={class:`overlay-demo-content`},xe={class:`component-demo-view__code`},Se={class:`component-demo-view__section`},Ce={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},we={class:`component-demo-view__code`},Te={class:`component-demo-view__section`},Ee={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},De={style:{display:`flex`,gap:`16px`,"align-items":`center`}},Oe={class:`component-demo-view__code`},ke={class:`component-demo-view__section`},Ae={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},je={class:`data-table-demo`},Me={class:`table-header`},Ne={class:`table-body`,style:{position:`relative`,"min-height":`200px`}},Pe={key:0,class:`demo-table`},Fe={class:`component-demo-view__code`},Ie=`<template>
  <!-- 纯图标 -->
  <AleLoading />
  
  <!-- 带文字 -->
  <AleLoading text="加载中..." />
</template>

<script setup lang="ts">
import { AleLoading } from 'ale-ui';
<\/script>`,Le=`<template>
  <AleLoading type="circular" />
  <AleLoading type="spinner" />
  <AleLoading type="dots" />
</template>`,Re=`<template>
  <AleLoading size="small" text="small" />
  <AleLoading size="medium" text="medium" />
  <AleLoading size="large" text="large" />
</template>`,ze=`<template>
  <AleLoading theme="primary" text="primary" />
  <AleLoading theme="success" text="success" />
  <AleLoading theme="warning" text="warning" />
  <AleLoading theme="danger" text="danger" />
</template>`,J=`<template>
  <AleLoading type="circular" vertical text="加载中" />
  <AleLoading type="spinner" vertical text="请稍候" />
  <AleLoading type="dots" vertical text="处理中" />
</template>`,Be=`<template>
  <AleLoading color="#8B5CF6" text="紫色" />
  <AleLoading color="#EC4899" text="粉色" />
  <AleLoading color="#14B8A6" text="青色" />
</template>`,Ve=`<template>
  <div class="overlay-demo">
    <div class="content">
      <p>需要加载的内容</p>
      <AleButton @click="showOverlay = true">
        显示遮罩层加载
      </AleButton>
    </div>
    <AleLoading
      v-if="showOverlay"
      overlay
      text="数据加载中..."
      @click="showOverlay = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const showOverlay = ref(false);
<\/script>`,He=`<template>
  <!-- 使用 overlayOpacity 调整透明度 -->
  <AleLoading
    v-if="showLoading"
    overlay
    :overlay-opacity="0.3"
    text="半透明遮罩..."
  />

  <!-- 使用 overlayBackground 自定义颜色 -->
  <AleLoading
    v-if="showLoading"
    overlay
    overlay-background="rgba(0, 0, 0, 0.7)"
    text="深色遮罩加载..."
    color="#ffffff"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showLoading = ref(false);
<\/script>`,Ue=`<template>
  <AleButton @click="showFullscreen = true">
    显示全屏加载
  </AleButton>
  
  <Teleport to="body">
    <AleLoading
      v-if="showFullscreen"
      fullscreen
      type="spinner"
      text="正在加载页面..."
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const showFullscreen = ref(false);
<\/script>`,We=`<template>
  <AleButton @click="delayedLoading = !delayedLoading">
    {{ delayedLoading ? '停止' : '开始（延迟500ms）' }}
  </AleButton>
  <AleLoading
    v-if="delayedLoading"
    :delay="500"
    text="延迟显示"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const delayedLoading = ref(false);
<\/script>`,Ge=`<template>
  <div class="data-table">
    <div class="table-header">
      <span>用户列表</span>
      <AleButton
        :loading="tableLoading"
        @click="refreshTable"
      >
        刷新
      </AleButton>
    </div>
    <div class="table-body">
      <table v-if="!tableLoading">
        <!-- 表格内容 -->
      </table>
      <AleLoading
        v-else
        overlay
        type="spinner"
        text="加载数据中..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const tableLoading = ref(false);

const refreshTable = async () => {
  tableLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  tableLoading.value = false;
};
<\/script>`,Y=u(r({__name:`LoadingView`,setup(r){let u=i(!1),Y=i(!1),X=i(!1),Z=i(!1),Q=i(!1),Ke=()=>{Q.value?Q.value=!1:Q.value=!0},$=i(!1),qe=i([{id:1,name:`张三`,email:`zhangsan@example.com`,status:`active`},{id:2,name:`李四`,email:`lisi@example.com`,status:`inactive`},{id:3,name:`王五`,email:`wangwu@example.com`,status:`active`},{id:4,name:`赵六`,email:`zhaoliu@example.com`,status:`active`}]),Je=async()=>{$.value=!0,await new Promise(e=>setTimeout(e,1500)),$.value=!1};return te(Z,e=>{e&&setTimeout(()=>{Z.value=!1},2e3)}),(te,r)=>(l(),d(`div`,ae,[r[37]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Loading 加载`),c(`p`,{class:`component-demo-view__description`},` 加载组件用于页面和区块的加载中状态，支持多种类型、尺寸和主题 `)],-1),c(`section`,oe,[r[7]||=c(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),c(`div`,g,[f(t(h)),f(t(h),{text:`加载中...`})]),c(`div`,_,[f(e,{code:Ie,language:`vue`,title:`示例代码`})])]),c(`section`,v,[r[11]||=c(`h2`,{class:`component-demo-view__section-title`},`加载类型`,-1),c(`div`,y,[c(`div`,b,[f(t(h),{type:`circular`}),r[8]||=c(`span`,{class:`demo-label`},`circular`,-1)]),c(`div`,x,[f(t(h),{type:`spinner`}),r[9]||=c(`span`,{class:`demo-label`},`spinner`,-1)]),c(`div`,S,[f(t(h),{type:`dots`}),r[10]||=c(`span`,{class:`demo-label`},`dots`,-1)])]),c(`div`,C,[f(e,{code:Le,language:`vue`,title:`示例代码`})])]),c(`section`,w,[r[12]||=c(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),c(`div`,T,[c(`div`,E,[f(t(h),{size:`small`,text:`small`})]),c(`div`,D,[f(t(h),{size:`medium`,text:`medium`})]),c(`div`,O,[f(t(h),{size:`large`,text:`large`})])]),c(`div`,k,[f(e,{code:Re,language:`vue`,title:`示例代码`})])]),c(`section`,A,[r[13]||=c(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),c(`div`,j,[c(`div`,M,[f(t(h),{theme:`primary`,text:`primary`})]),c(`div`,N,[f(t(h),{theme:`success`,text:`success`})]),c(`div`,P,[f(t(h),{theme:`warning`,text:`warning`})]),c(`div`,F,[f(t(h),{theme:`danger`,text:`danger`})])]),c(`div`,I,[f(e,{code:ze,language:`vue`,title:`示例代码`})])]),c(`section`,L,[r[14]||=c(`h2`,{class:`component-demo-view__section-title`},`垂直排列`,-1),c(`div`,R,[c(`div`,z,[f(t(h),{type:`circular`,vertical:``,text:`加载中`})]),c(`div`,B,[f(t(h),{type:`spinner`,vertical:``,text:`请稍候`})]),c(`div`,V,[f(t(h),{type:`dots`,vertical:``,text:`处理中`})])]),c(`div`,H,[f(e,{code:J,language:`vue`,title:`示例代码`})])]),c(`section`,U,[r[15]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),c(`div`,W,[c(`div`,G,[f(t(h),{color:`#8B5CF6`,text:`紫色`})]),c(`div`,K,[f(t(h),{color:`#EC4899`,text:`粉色`})]),c(`div`,q,[f(t(h),{color:`#14B8A6`,text:`青色`})])]),c(`div`,se,[f(e,{code:Be,language:`vue`,title:`示例代码`})])]),c(`section`,ce,[r[20]||=c(`h2`,{class:`component-demo-view__section-title`},`遮罩层用法`,-1),c(`div`,le,[r[18]||=c(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 点击按钮查看遮罩层效果 `,-1),c(`div`,ue,[c(`div`,de,[r[17]||=c(`p`,null,`这是一个需要加载的内容区域`,-1),f(t(m),{onClick:r[0]||=e=>u.value=!0},{default:p(()=>[...r[16]||=[o(` 显示遮罩层加载 `,-1)]]),_:1})]),u.value?(l(),s(t(h),{key:0,overlay:``,text:`数据加载中...`,onClick:r[1]||=e=>u.value=!1})):a(``,!0)]),r[19]||=c(`p`,{style:{margin:`8px 0 0 0`,"font-size":`12px`,color:`var(--color-text-secondary)`}},` 提示：点击加载遮罩可关闭 `,-1)]),c(`div`,fe,[f(e,{code:Ve,language:`vue`,title:`示例代码`})])]),c(`section`,pe,[r[27]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义遮罩层样式`,-1),c(`div`,me,[c(`div`,he,[r[23]||=c(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},` 使用 overlayOpacity 调整透明度（0.3） `,-1),c(`div`,ge,[c(`div`,_e,[r[22]||=c(`p`,{style:{color:`white`}},`彩色背景区域`,-1),f(t(m),{theme:`default`,onClick:r[2]||=e=>Y.value=!0},{default:p(()=>[...r[21]||=[o(` 半透明遮罩 `,-1)]]),_:1})]),Y.value?(l(),s(t(h),{key:0,overlay:``,"overlay-opacity":.3,text:`半透明遮罩...`,theme:`primary`,onClick:r[3]||=e=>Y.value=!1})):a(``,!0)])]),c(`div`,ve,[r[26]||=c(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},` 使用 overlayBackground 自定义颜色 `,-1),c(`div`,ye,[c(`div`,be,[r[25]||=c(`p`,null,`普通内容区域`,-1),f(t(m),{onClick:r[4]||=e=>X.value=!0},{default:p(()=>[...r[24]||=[o(` 深色遮罩 `,-1)]]),_:1})]),X.value?(l(),s(t(h),{key:0,overlay:``,"overlay-background":`rgba(0, 0, 0, 0.7)`,text:`深色遮罩加载...`,color:`#ffffff`,onClick:r[5]||=e=>X.value=!1})):a(``,!0)])])]),c(`div`,xe,[f(e,{code:He,language:`vue`,title:`示例代码`})])]),c(`section`,Se,[r[30]||=c(`h2`,{class:`component-demo-view__section-title`},`全屏加载`,-1),c(`div`,Ce,[r[29]||=c(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 全屏加载会覆盖整个视口，常用于页面初始化或全局操作 `,-1),f(t(m),{type:`primary`,onClick:r[6]||=e=>Z.value=!0},{default:p(()=>[...r[28]||=[o(` 显示全屏加载（2秒后自动关闭） `,-1)]]),_:1})]),c(`div`,we,[f(e,{code:Ue,language:`vue`,title:`示例代码`})])]),c(`section`,Te,[r[32]||=c(`h2`,{class:`component-demo-view__section-title`},`延迟显示`,-1),c(`div`,Ee,[r[31]||=c(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 设置 delay 属性可以延迟显示加载状态，避免快速操作时的闪烁 `,-1),c(`div`,De,[f(t(m),{onClick:Ke},{default:p(()=>[o(n(Q.value?`停止加载`:`开始加载（延迟500ms）`),1)]),_:1}),Q.value?(l(),s(t(h),{key:0,delay:500,text:`延迟显示`})):a(``,!0)])]),c(`div`,Oe,[f(e,{code:We,language:`vue`,title:`示例代码`})])]),c(`section`,ke,[r[36]||=c(`h2`,{class:`component-demo-view__section-title`},`实际应用场景`,-1),c(`div`,Ae,[c(`div`,je,[c(`div`,Me,[r[34]||=c(`span`,null,`用户列表`,-1),f(t(m),{size:`small`,loading:$.value,onClick:Je},{default:p(()=>[...r[33]||=[o(` 刷新 `,-1)]]),_:1},8,[`loading`])]),c(`div`,Ne,[$.value?(l(),s(t(h),{key:1,overlay:``,type:`spinner`,text:`加载数据中...`})):(l(),d(`table`,Pe,[r[35]||=c(`thead`,null,[c(`tr`,null,[c(`th`,null,`ID`),c(`th`,null,`姓名`),c(`th`,null,`邮箱`),c(`th`,null,`状态`)])],-1),c(`tbody`,null,[(l(!0),d(ne,null,ee(qe.value,e=>(l(),d(`tr`,{key:e.id},[c(`td`,null,n(e.id),1),c(`td`,null,n(e.name),1),c(`td`,null,n(e.email),1),c(`td`,null,[f(t(ie),{type:e.status===`active`?`success`:`info`},{default:p(()=>[o(n(e.status===`active`?`活跃`:`离线`),1)]),_:2},1032,[`type`])])]))),128))])]))])])]),c(`div`,Fe,[f(e,{code:Ge,language:`vue`,title:`示例代码`})])]),(l(),s(re,{to:`body`},[Z.value?(l(),s(t(h),{key:0,fullscreen:``,type:`spinner`,text:`正在加载页面...`})):a(``,!0)]))]))}}),[[`__scopeId`,`data-v-0c07d3de`]]);export{Y as default};
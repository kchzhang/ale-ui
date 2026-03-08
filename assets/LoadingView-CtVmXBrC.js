import{B as e,C as t,K as n,M as r,P as ee,S as i,W as a,Y as o,_ as s,g as c,i as l,m as te,p as ne,v as u,x as d,y as f,z as re}from"./index-B3Jx3uix.js";import{t as p}from"./button-GOPf8Q2w.js";import{t as ie}from"./badge-J6JiNC5t.js";import"./Loading-D6tGBeoJ.js";import{t as m}from"./loading-CJUMNUeU.js";import{t as h}from"./CodeBlock-CE4Cu_o1.js";var ae={class:`component-demo-view`},oe={class:`component-demo-view__section`},g={class:`component-demo-view__demo`},_={class:`component-demo-view__code`},v={class:`component-demo-view__section`},y={class:`component-demo-view__demo`,style:{gap:`48px`}},b={class:`demo-item`},x={class:`demo-item`},S={class:`demo-item`},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`,style:{gap:`48px`}},E={class:`demo-item`},D={class:`demo-item`},O={class:`demo-item`},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`,style:{gap:`48px`}},M={class:`demo-item`},N={class:`demo-item`},P={class:`demo-item`},F={class:`demo-item`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`,style:{gap:`48px`}},z={class:`demo-item`},B={class:`demo-item`},V={class:`demo-item`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo`,style:{gap:`48px`}},G={class:`demo-item`},K={class:`demo-item`},q={class:`demo-item`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},ue={class:`overlay-demo`},de={class:`overlay-demo-content`},fe={class:`component-demo-view__code`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`,gap:`24px`}},he={class:`overlay-custom-demo`},ge={class:`overlay-demo`,style:{background:`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`}},_e={class:`overlay-demo-content`},ve={class:`overlay-custom-demo`},ye={class:`overlay-demo`},be={class:`overlay-demo-content`},xe={class:`component-demo-view__code`},Se={class:`component-demo-view__section`},Ce={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},we={class:`component-demo-view__code`},Te={class:`component-demo-view__section`},Ee={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},De={style:{display:`flex`,gap:`16px`,"align-items":`center`}},Oe={class:`component-demo-view__code`},ke={class:`component-demo-view__section`},Ae={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`stretch`}},je={class:`data-table-demo`},Me={class:`table-header`},Ne={class:`table-body`,style:{position:`relative`,"min-height":`200px`}},Pe={key:0,class:`demo-table`},Fe={class:`component-demo-view__code`},Ie=`<template>
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
<\/script>`,Y=l(t({__name:`LoadingView`,setup(t){let l=a(!1),Y=a(!1),X=a(!1),Z=a(!1),Q=a(!1),Ke=()=>{Q.value?Q.value=!1:Q.value=!0},$=a(!1),qe=a([{id:1,name:`张三`,email:`zhangsan@example.com`,status:`active`},{id:2,name:`李四`,email:`lisi@example.com`,status:`inactive`},{id:3,name:`王五`,email:`wangwu@example.com`,status:`active`},{id:4,name:`赵六`,email:`zhaoliu@example.com`,status:`active`}]),Je=async()=>{$.value=!0,await new Promise(e=>setTimeout(e,1500)),$.value=!1};return re(Z,e=>{e&&setTimeout(()=>{Z.value=!1},2e3)}),(t,a)=>(r(),f(`div`,ae,[a[37]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Loading 加载`),c(`p`,{class:`component-demo-view__description`},` 加载组件用于页面和区块的加载中状态，支持多种类型、尺寸和主题 `)],-1),c(`section`,oe,[a[7]||=c(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),c(`div`,g,[i(n(m)),i(n(m),{text:`加载中...`})]),c(`div`,_,[i(h,{code:Ie,language:`vue`,title:`示例代码`})])]),c(`section`,v,[a[11]||=c(`h2`,{class:`component-demo-view__section-title`},`加载类型`,-1),c(`div`,y,[c(`div`,b,[i(n(m),{type:`circular`}),a[8]||=c(`span`,{class:`demo-label`},`circular`,-1)]),c(`div`,x,[i(n(m),{type:`spinner`}),a[9]||=c(`span`,{class:`demo-label`},`spinner`,-1)]),c(`div`,S,[i(n(m),{type:`dots`}),a[10]||=c(`span`,{class:`demo-label`},`dots`,-1)])]),c(`div`,C,[i(h,{code:Le,language:`vue`,title:`示例代码`})])]),c(`section`,w,[a[12]||=c(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),c(`div`,T,[c(`div`,E,[i(n(m),{size:`small`,text:`small`})]),c(`div`,D,[i(n(m),{size:`medium`,text:`medium`})]),c(`div`,O,[i(n(m),{size:`large`,text:`large`})])]),c(`div`,k,[i(h,{code:Re,language:`vue`,title:`示例代码`})])]),c(`section`,A,[a[13]||=c(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),c(`div`,j,[c(`div`,M,[i(n(m),{theme:`primary`,text:`primary`})]),c(`div`,N,[i(n(m),{theme:`success`,text:`success`})]),c(`div`,P,[i(n(m),{theme:`warning`,text:`warning`})]),c(`div`,F,[i(n(m),{theme:`danger`,text:`danger`})])]),c(`div`,I,[i(h,{code:ze,language:`vue`,title:`示例代码`})])]),c(`section`,L,[a[14]||=c(`h2`,{class:`component-demo-view__section-title`},`垂直排列`,-1),c(`div`,R,[c(`div`,z,[i(n(m),{type:`circular`,vertical:``,text:`加载中`})]),c(`div`,B,[i(n(m),{type:`spinner`,vertical:``,text:`请稍候`})]),c(`div`,V,[i(n(m),{type:`dots`,vertical:``,text:`处理中`})])]),c(`div`,H,[i(h,{code:J,language:`vue`,title:`示例代码`})])]),c(`section`,U,[a[15]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),c(`div`,W,[c(`div`,G,[i(n(m),{color:`#8B5CF6`,text:`紫色`})]),c(`div`,K,[i(n(m),{color:`#EC4899`,text:`粉色`})]),c(`div`,q,[i(n(m),{color:`#14B8A6`,text:`青色`})])]),c(`div`,se,[i(h,{code:Be,language:`vue`,title:`示例代码`})])]),c(`section`,ce,[a[20]||=c(`h2`,{class:`component-demo-view__section-title`},`遮罩层用法`,-1),c(`div`,le,[a[18]||=c(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 点击按钮查看遮罩层效果 `,-1),c(`div`,ue,[c(`div`,de,[a[17]||=c(`p`,null,`这是一个需要加载的内容区域`,-1),i(n(p),{onClick:a[0]||=e=>l.value=!0},{default:e(()=>[...a[16]||=[d(` 显示遮罩层加载 `,-1)]]),_:1})]),l.value?(r(),s(n(m),{key:0,overlay:``,text:`数据加载中...`,onClick:a[1]||=e=>l.value=!1})):u(``,!0)]),a[19]||=c(`p`,{style:{margin:`8px 0 0 0`,"font-size":`12px`,color:`var(--color-text-secondary)`}},` 提示：点击加载遮罩可关闭 `,-1)]),c(`div`,fe,[i(h,{code:Ve,language:`vue`,title:`示例代码`})])]),c(`section`,pe,[a[27]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义遮罩层样式`,-1),c(`div`,me,[c(`div`,he,[a[23]||=c(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},` 使用 overlayOpacity 调整透明度（0.3） `,-1),c(`div`,ge,[c(`div`,_e,[a[22]||=c(`p`,{style:{color:`white`}},`彩色背景区域`,-1),i(n(p),{theme:`default`,onClick:a[2]||=e=>Y.value=!0},{default:e(()=>[...a[21]||=[d(` 半透明遮罩 `,-1)]]),_:1})]),Y.value?(r(),s(n(m),{key:0,overlay:``,"overlay-opacity":.3,text:`半透明遮罩...`,theme:`primary`,onClick:a[3]||=e=>Y.value=!1})):u(``,!0)])]),c(`div`,ve,[a[26]||=c(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},` 使用 overlayBackground 自定义颜色 `,-1),c(`div`,ye,[c(`div`,be,[a[25]||=c(`p`,null,`普通内容区域`,-1),i(n(p),{onClick:a[4]||=e=>X.value=!0},{default:e(()=>[...a[24]||=[d(` 深色遮罩 `,-1)]]),_:1})]),X.value?(r(),s(n(m),{key:0,overlay:``,"overlay-background":`rgba(0, 0, 0, 0.7)`,text:`深色遮罩加载...`,color:`#ffffff`,onClick:a[5]||=e=>X.value=!1})):u(``,!0)])])]),c(`div`,xe,[i(h,{code:He,language:`vue`,title:`示例代码`})])]),c(`section`,Se,[a[30]||=c(`h2`,{class:`component-demo-view__section-title`},`全屏加载`,-1),c(`div`,Ce,[a[29]||=c(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 全屏加载会覆盖整个视口，常用于页面初始化或全局操作 `,-1),i(n(p),{type:`primary`,onClick:a[6]||=e=>Z.value=!0},{default:e(()=>[...a[28]||=[d(` 显示全屏加载（2秒后自动关闭） `,-1)]]),_:1})]),c(`div`,we,[i(h,{code:Ue,language:`vue`,title:`示例代码`})])]),c(`section`,Te,[a[32]||=c(`h2`,{class:`component-demo-view__section-title`},`延迟显示`,-1),c(`div`,Ee,[a[31]||=c(`p`,{style:{margin:`0 0 16px 0`,color:`var(--color-text-secondary)`}},` 设置 delay 属性可以延迟显示加载状态，避免快速操作时的闪烁 `,-1),c(`div`,De,[i(n(p),{onClick:Ke},{default:e(()=>[d(o(Q.value?`停止加载`:`开始加载（延迟500ms）`),1)]),_:1}),Q.value?(r(),s(n(m),{key:0,delay:500,text:`延迟显示`})):u(``,!0)])]),c(`div`,Oe,[i(h,{code:We,language:`vue`,title:`示例代码`})])]),c(`section`,ke,[a[36]||=c(`h2`,{class:`component-demo-view__section-title`},`实际应用场景`,-1),c(`div`,Ae,[c(`div`,je,[c(`div`,Me,[a[34]||=c(`span`,null,`用户列表`,-1),i(n(p),{size:`small`,loading:$.value,onClick:Je},{default:e(()=>[...a[33]||=[d(` 刷新 `,-1)]]),_:1},8,[`loading`])]),c(`div`,Ne,[$.value?(r(),s(n(m),{key:1,overlay:``,type:`spinner`,text:`加载数据中...`})):(r(),f(`table`,Pe,[a[35]||=c(`thead`,null,[c(`tr`,null,[c(`th`,null,`ID`),c(`th`,null,`姓名`),c(`th`,null,`邮箱`),c(`th`,null,`状态`)])],-1),c(`tbody`,null,[(r(!0),f(ne,null,ee(qe.value,t=>(r(),f(`tr`,{key:t.id},[c(`td`,null,o(t.id),1),c(`td`,null,o(t.name),1),c(`td`,null,o(t.email),1),c(`td`,null,[i(n(ie),{type:t.status===`active`?`success`:`info`},{default:e(()=>[d(o(t.status===`active`?`活跃`:`离线`),1)]),_:2},1032,[`type`])])]))),128))])]))])])]),c(`div`,Fe,[i(h,{code:Ge,language:`vue`,title:`示例代码`})])]),(r(),s(te,{to:`body`},[Z.value?(r(),s(n(m),{key:0,fullscreen:``,type:`spinner`,text:`正在加载页面...`})):u(``,!0)]))]))}}),[[`__scopeId`,`data-v-0c07d3de`]]);export{Y as default};
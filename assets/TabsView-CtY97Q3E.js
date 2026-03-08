import{t as e}from"./CodeBlock-CmDK_EYq.js";import{A as t,B as n,C as r,E as i,G as a,H as o,I as s,J as c,K as l,M as u,N as d,O as f,P as p,R as m,S as h,T as g,U as _,_ as v,b as y,d as ee,f as b,g as te,h as x,j as S,k as C,l as w,m as T,q as E,r as D,v as O,x as k,z as A}from"./index-D6beBo5R.js";import{t as j}from"./button-CbFeg90j.js";var ne={class:`ale-tabs__header`},re=[`id`,`aria-selected`,`aria-controls`,`onClick`,`onKeydown`],ie={class:`ale-tabs__item__content`},ae=[`onClick`],oe={class:`ale-tabs__content`},M=D(h({__name:`Tabs`,props:{modelValue:{},type:{default:``},tabPosition:{default:`top`},addable:{type:Boolean,default:!1},closable:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},stretch:{type:Boolean,default:!1},beforeLeave:{}},emits:[`update:modelValue`,`tab-click`,`tab-remove`,`tab-add`,`change`],setup(e,{expose:n,emit:r}){let a=e,o=r,h=_([]),g=T({get(){return a.modelValue??``},set(e){o(`update:modelValue`,e)}}),C=_(),w=_(),D=_(),k=_([]),A=_(!1),j=_(0),M=_(-1),N=T(()=>F.value===`top`||F.value===`bottom`?{transform:`translateX(-${j.value}px)`}:{transform:`translateY(-${j.value}px)`}),P=T(()=>{let e=h.value.findIndex(e=>e.active);if(e===-1)return{};let t=k.value[e];return t?F.value===`top`||F.value===`bottom`?{width:`${t.offsetWidth}px`,transform:`translateX(${t.offsetLeft}px)`}:{height:`${t.offsetHeight}px`,transform:`translateY(${t.offsetTop}px)`}:{}}),F=T(()=>a.tabPosition),I=T(()=>[`ale-tabs`,`ale-tabs--${F.value}`,{[`ale-tabs--${a.type}`]:a.type,"ale-tabs--stretch":a.stretch&&!a.type}]),L=T(()=>(a.addable||a.editable)&&F.value===`bottom`),R=T(()=>(a.addable||a.editable)&&F.value!==`bottom`),z=T(()=>F.value===`top`||F.value===`bottom`?`ale-icon-arrow-left`:`ale-icon-arrow-up`),B=T(()=>F.value===`top`||F.value===`bottom`?`ale-icon-arrow-right`:`ale-icon-arrow-down`),V=T(()=>a.stretch&&!a.type),H=T(()=>a.type===``),U=e=>({"ale-tabs__item":!0,"is-active":e.active,"is-disabled":e.props.disabled,"is-closable":a.closable||e.props.closable||a.editable}),W=e=>(a.closable||e.props.closable||a.editable)&&!e.props.disabled,G=(e,t)=>{e&&(k.value[t]=e)},K=()=>a.stretch&&!a.type?{flex:1}:{},q=e=>{let t=h.value.findIndex(t=>t.uid===e.uid);t===-1?h.value.push(e):h.value[t]=e,se()},J=e=>{let t=h.value.findIndex(t=>t.uid===e);t>-1&&h.value.splice(t,1)},se=()=>{let e=C.value?.querySelector(`.ale-tabs__content`);if(e){let t=Array.from(e.children);h.value.sort((e,n)=>t.findIndex(t=>{let n=h.value.find(t=>t.uid===e.uid);return t===C.value?.querySelector(`[name="${n?.props.name}"]`)})-t.findIndex(e=>{let t=h.value.find(e=>e.uid===n.uid);return e===C.value?.querySelector(`[name="${t?.props.name}"]`)}))}},Y=()=>{i(()=>{if(!w.value||!D.value)return;let e=D.value,t=w.value;F.value===`top`||F.value===`bottom`?A.value=e.offsetWidth>t.offsetWidth:A.value=e.offsetHeight>t.offsetHeight})},ce=()=>{let e=F.value===`top`||F.value===`bottom`?w.value?.offsetWidth||0:w.value?.offsetHeight||0;j.value=Math.max(0,j.value-e)},le=()=>{let e=F.value===`top`||F.value===`bottom`?w.value?.offsetWidth||0:w.value?.offsetHeight||0,t=F.value===`top`||F.value===`bottom`?D.value?.offsetWidth||0:D.value?.offsetHeight||0;j.value=Math.min(j.value+e,t-e)},X=()=>{i(()=>{let e=h.value.findIndex(e=>e.active);if(e===-1||!A.value)return;let t=k.value[e];if(!t||!w.value)return;let n=F.value===`top`||F.value===`bottom`?w.value.offsetWidth:w.value.offsetHeight,r=F.value===`top`||F.value===`bottom`?t.offsetLeft:t.offsetTop,i=F.value===`top`||F.value===`bottom`?t.offsetWidth:t.offsetHeight;r<j.value?j.value=r:r+i>j.value+n&&(j.value=r+i-n)})},Z=async(e,t)=>{if(e.props.disabled)return;o(`tab-click`,{name:e.props.name,label:e.props.label},t);let n=g.value,r=e.props.name;if(n!==r){if(a.beforeLeave)try{if(await a.beforeLeave(r,n)===!1)return}catch{return}g.value=r,o(`change`,r),X()}},ue=(e,t)=>{if(!e.props.disabled&&(o(`tab-remove`,e.props.name),e.active&&h.value.length>1)){let e=t<h.value.length-1?t:t-1,n=h.value[e];n&&!n.props.disabled&&(g.value=n.props.name,o(`change`,n.props.name))}},Q=()=>{o(`tab-add`)},$=(e,t)=>{let n=e.keyCode||e.which,r=F.value===`top`||F.value===`bottom`,i=-1;if(r?n===37?i=t-1:n===39&&(i=t+1):n===38?i=t-1:n===40&&(i=t+1),i>=0&&i<h.value.length){e.preventDefault();let t=h.value[i];t.props.disabled||(M.value=i,Z(t,e))}};return f(()=>{Y(),window.addEventListener(`resize`,Y)}),t(()=>{Y()}),m(()=>a.modelValue,()=>{X()}),m(h,()=>{if(Y(),h.value.length>0&&!h.value.some(e=>e.active)){let e=h.value.find(e=>!e.props.disabled);e&&(g.value=e.props.name)}},{deep:!0}),u(`tabsContext`,{props:a,registerPane:q,unregisterPane:J}),n({currentName:g}),(e,t)=>(S(),O(`div`,{ref_key:`tabsRef`,ref:C,class:l(I.value)},[x(`div`,ne,[L.value?(S(),O(`span`,{key:0,class:`ale-tabs__new-tab`,onClick:Q},[p(e.$slots,`addIcon`,{},()=>[t[0]||=x(`i`,{class:`ale-icon-plus`},null,-1)],!0)])):v(``,!0),x(`div`,{class:l([`ale-tabs__nav-wrap`,{"is-scrollable":A.value}])},[A.value?(S(),O(`span`,{key:0,class:`ale-tabs__nav-prev`,onClick:ce},[x(`i`,{class:l(z.value)},null,2)])):v(``,!0),x(`div`,{ref_key:`navScrollRef`,ref:w,class:`ale-tabs__nav-scroll`},[x(`div`,{ref_key:`navRef`,ref:D,class:l([`ale-tabs__nav`,{"is-stretch":V.value}]),style:E(N.value),role:`tablist`},[(S(!0),O(b,null,d(h.value,(e,n)=>(S(),O(`div`,{key:e.uid,ref_for:!0,ref:e=>G(e,n),class:l(U(e)),style:E(K()),id:`tab-${e.paneName}`,"aria-selected":e.active,"aria-controls":`pane-${e.paneName}`,role:`tab`,tabindex:`-1`,onClick:t=>Z(e,t),onKeydown:e=>$(e,n)},[x(`span`,ie,[e.slots?.label?(S(),te(s(e.slots.label),{key:0})):(S(),O(b,{key:1},[y(c(e.props.label),1)],64))]),W(e)?(S(),O(`span`,{key:0,class:`ale-tabs__item__close`,onClick:ee(t=>ue(e,n),[`stop`])},[...t[1]||=[x(`i`,{class:`ale-icon-close`},null,-1)]],8,ae)):v(``,!0)],46,re))),128)),H.value?(S(),O(`div`,{key:0,class:`ale-tabs__active-bar`,style:E(P.value)},null,4)):v(``,!0)],6)],512),A.value?(S(),O(`span`,{key:1,class:`ale-tabs__nav-next`,onClick:le},[x(`i`,{class:l(B.value)},null,2)])):v(``,!0)],2),R.value?(S(),O(`span`,{key:1,class:`ale-tabs__new-tab`,onClick:Q},[p(e.$slots,`addIcon`,{},()=>[t[2]||=x(`i`,{class:`ale-icon-plus`},null,-1)],!0)])):v(``,!0)]),x(`div`,oe,[p(e.$slots,`default`,{},void 0,!0)])],2))}}),[[`__scopeId`,`data-v-cab3168f`]]),N=[`aria-hidden`],P=h({__name:`TabPane`,props:{label:{default:``},name:{},disabled:{type:Boolean,default:!1},closable:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1}},emits:[`tab-click`],setup(e,{expose:t,emit:i}){let a=e,o=g(`tabsContext`,null),s=r(),c=s?.uid??0,u=_(!1),d=T(()=>o?.props.modelValue===a.name);m(d,e=>{e&&(u.value=!0)},{immediate:!0});let h=T(()=>``),v=T(()=>a.closable||o?.props.closable||!1);return f(()=>{o&&o.registerPane({uid:c,props:a,slots:s?.slots,paneName:T(()=>a.name),active:d,index:_(void 0),isClosable:v})}),C(()=>{o&&o.unregisterPane(c)}),m(()=>a,()=>{o&&o.registerPane({uid:c,props:a,slots:s?.slots,paneName:T(()=>a.name),active:d,index:_(void 0),isClosable:v})},{deep:!0}),t({name:T(()=>a.name),active:d}),(e,t)=>n((S(),O(`div`,{class:l([`ale-tab-pane`,h.value]),role:`tabpanel`,"aria-hidden":!d.value},[p(e.$slots,`default`)],10,N)),[[w,d.value]])}}),F={class:`component-demo-view`},I={class:`component-demo-view__section`},L={class:`component-demo-view__demo`},R={class:`component-demo-view__code`},z={class:`component-demo-view__section`},B={class:`component-demo-view__demo`},V={class:`component-demo-view__code`},H={class:`component-demo-view__section`},U={class:`component-demo-view__demo`},W={class:`component-demo-view__code`},G={class:`component-demo-view__section`},K={class:`component-demo-view__demo position-demo`},q={class:`position-selector`},J={class:`component-demo-view__code`},se={class:`component-demo-view__section`},Y={class:`component-demo-view__demo`},ce={class:`component-demo-view__code`},le={class:`component-demo-view__section`},X={class:`component-demo-view__demo`},Z={class:`component-demo-view__code`},ue={class:`component-demo-view__section`},Q={class:`component-demo-view__demo`},$={class:`component-demo-view__code`},de=`<template>
  <AleTabs v-model="activeName" class="demo-tabs">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`,fe=`<template>
  <AleTabs v-model="activeName" type="card" class="demo-tabs">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`,pe=`<template>
  <AleTabs v-model="activeName" type="border-card" class="demo-tabs">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`,me=`<template>
  <AleTabs v-model="activeName" :tabPosition="tabPosition" style="height: 200px;">
    <AleTabPane label="用户管理" name="first">用户管理内容</AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
    <AleTabPane label="角色管理" name="third">角色管理内容</AleTabPane>
    <AleTabPane label="定时任务补偿" name="fourth">定时任务补偿内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
const tabPosition = ref('left');
<\/script>`,he=`<template>
  <AleTabs v-model="activeName" type="card" class="demo-tabs">
    <!-- 使用 #label 插槽时，label 属性可省略 -->
    <AleTabPane name="first">
      <template #label>
        <span>📅 用户管理</span>
      </template>
      用户管理内容
    </AleTabPane>
    <AleTabPane label="配置管理" name="second">配置管理内容</AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`,ge=`<template>
  <AleTabs
    v-model="editableTabsValue"
    type="card"
    editable
    @tab-add="handleTabsAdd"
    @tab-remove="handleTabsRemove"
  >
    <AleTabPane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const editableTabsValue = ref('1');
const editableTabs = reactive([
  { title: 'Tab 1', name: '1', content: 'Tab 1 content' },
  { title: 'Tab 2', name: '2', content: 'Tab 2 content' }
]);
let tabIndex = 2;

const handleTabsAdd = () => {
  const newName = ++tabIndex + '';
  editableTabs.push({
    title: 'New Tab',
    name: newName,
    content: 'New Tab content'
  });
  editableTabsValue.value = newName;
};

const handleTabsRemove = (targetName: string) => {
  const tabs = editableTabs;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) activeName = nextTab.name;
      }
    });
  }
  editableTabsValue.value = activeName;
  const index = tabs.findIndex(tab => tab.name === targetName);
  if (index > -1) tabs.splice(index, 1);
};
<\/script>`,_e=`<template>
  <AleTabs v-model="activeName" type="border-card">
    <AleTabPane label="标签一" name="first">标签一内容（立即渲染）</AleTabPane>
    <AleTabPane label="标签二" name="second" lazy>
      标签二内容（延迟渲染）
    </AleTabPane>
  </AleTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleTabs, AleTabPane } from 'ale-ui';

const activeName = ref('first');
<\/script>`,ve=D(h({__name:`TabsView`,setup(t){let n=_(`first`),r=_(`first`),i=_(`first`),s=_(`first`),l=_(`first`),u=_(`first`),f=_(`top`),p=_(`1`),m=o([{title:`Tab 1`,name:`1`,content:`Tab 1 content`},{title:`Tab 2`,name:`2`,content:`Tab 2 content`},{title:`Tab 3`,name:`3`,content:`Tab 3 content`}]),h=3,g=()=>{let e=++h+``;m.push({title:`New Tab`,name:e,content:`New Tab content`}),p.value=e},v=e=>{let t=m,n=p.value;n===e&&t.forEach((r,i)=>{if(r.name===e){let e=t[i+1]||t[i-1];e&&(n=e.name)}}),p.value=n;let r=t.findIndex(t=>t.name===e);r>-1&&t.splice(r,1)};return(t,o)=>(S(),O(`div`,F,[o[44]||=x(`div`,{class:`component-demo-view__header`},[x(`h1`,{class:`component-demo-view__title`},`Tabs 标签页`),x(`p`,{class:`component-demo-view__description`},` 分隔内容上有关联但属于不同类别的数据集合 `)],-1),x(`section`,I,[o[11]||=x(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),o[12]||=x(`p`,{class:`section-desc`},`Tabs 组件通过 TabPane 子组件定义标签页内容，使用 label 属性定义标签名，name 属性定义标识符`,-1),x(`div`,L,[k(a(M),{modelValue:n.value,"onUpdate:modelValue":o[0]||=e=>n.value=e,class:`demo-tabs`},{default:A(()=>[k(a(P),{label:`用户管理`,name:`first`},{default:A(()=>[...o[7]||=[y(`用户管理内容`,-1)]]),_:1}),k(a(P),{label:`配置管理`,name:`second`},{default:A(()=>[...o[8]||=[y(`配置管理内容`,-1)]]),_:1}),k(a(P),{label:`角色管理`,name:`third`},{default:A(()=>[...o[9]||=[y(`角色管理内容`,-1)]]),_:1}),k(a(P),{label:`定时任务补偿`,name:`fourth`},{default:A(()=>[...o[10]||=[y(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),x(`div`,R,[k(e,{code:de,language:`vue`,title:`示例代码`})])]),x(`section`,z,[o[17]||=x(`h2`,{class:`component-demo-view__section-title`},`卡片风格`,-1),o[18]||=x(`p`,{class:`section-desc`},`设置 type 属性为 card 即可使用卡片风格的标签页`,-1),x(`div`,B,[k(a(M),{modelValue:r.value,"onUpdate:modelValue":o[1]||=e=>r.value=e,type:`card`,class:`demo-tabs`},{default:A(()=>[k(a(P),{label:`用户管理`,name:`first`},{default:A(()=>[...o[13]||=[y(`用户管理内容`,-1)]]),_:1}),k(a(P),{label:`配置管理`,name:`second`},{default:A(()=>[...o[14]||=[y(`配置管理内容`,-1)]]),_:1}),k(a(P),{label:`角色管理`,name:`third`},{default:A(()=>[...o[15]||=[y(`角色管理内容`,-1)]]),_:1}),k(a(P),{label:`定时任务补偿`,name:`fourth`},{default:A(()=>[...o[16]||=[y(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),x(`div`,V,[k(e,{code:fe,language:`vue`,title:`示例代码`})])]),x(`section`,H,[o[23]||=x(`h2`,{class:`component-demo-view__section-title`},`边框卡片`,-1),o[24]||=x(`p`,{class:`section-desc`},`设置 type 属性为 border-card 即可使用边框卡片风格的标签页`,-1),x(`div`,U,[k(a(M),{modelValue:i.value,"onUpdate:modelValue":o[2]||=e=>i.value=e,type:`border-card`,class:`demo-tabs`},{default:A(()=>[k(a(P),{label:`用户管理`,name:`first`},{default:A(()=>[...o[19]||=[y(`用户管理内容`,-1)]]),_:1}),k(a(P),{label:`配置管理`,name:`second`},{default:A(()=>[...o[20]||=[y(`配置管理内容`,-1)]]),_:1}),k(a(P),{label:`角色管理`,name:`third`},{default:A(()=>[...o[21]||=[y(`角色管理内容`,-1)]]),_:1}),k(a(P),{label:`定时任务补偿`,name:`fourth`},{default:A(()=>[...o[22]||=[y(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),x(`div`,W,[k(e,{code:pe,language:`vue`,title:`示例代码`})])]),x(`section`,G,[o[29]||=x(`h2`,{class:`component-demo-view__section-title`},`位置`,-1),o[30]||=x(`p`,{class:`section-desc`},`设置 tabPosition 属性可改变标签位置，支持 top、right、bottom、left 四个方向`,-1),x(`div`,K,[x(`div`,q,[(S(),O(b,null,d([`top`,`right`,`bottom`,`left`],e=>k(a(j),{key:e,type:f.value===e?`primary`:`default`,size:`small`,onClick:t=>f.value=e},{default:A(()=>[y(c(e),1)]),_:2},1032,[`type`,`onClick`])),64))]),k(a(M),{modelValue:s.value,"onUpdate:modelValue":o[3]||=e=>s.value=e,tabPosition:f.value,style:{height:`200px`},class:`demo-tabs`},{default:A(()=>[k(a(P),{label:`用户管理`,name:`first`},{default:A(()=>[...o[25]||=[y(`用户管理内容`,-1)]]),_:1}),k(a(P),{label:`配置管理`,name:`second`},{default:A(()=>[...o[26]||=[y(`配置管理内容`,-1)]]),_:1}),k(a(P),{label:`角色管理`,name:`third`},{default:A(()=>[...o[27]||=[y(`角色管理内容`,-1)]]),_:1}),k(a(P),{label:`定时任务补偿`,name:`fourth`},{default:A(()=>[...o[28]||=[y(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`,`tabPosition`])]),x(`div`,J,[k(e,{code:me,language:`vue`,title:`示例代码`})])]),x(`section`,se,[o[35]||=x(`h2`,{class:`component-demo-view__section-title`},`自定义标签页`,-1),o[36]||=x(`p`,{class:`section-desc`},`可以通过具名插槽实现自定义标签页内容`,-1),x(`div`,Y,[k(a(M),{modelValue:l.value,"onUpdate:modelValue":o[4]||=e=>l.value=e,type:`card`,class:`demo-tabs`},{default:A(()=>[k(a(P),{name:`first`},{label:A(()=>[...o[31]||=[x(`span`,null,`📅 用户管理`,-1)]]),default:A(()=>[o[32]||=y(` 用户管理内容（使用 #label 插槽，无 label 属性） `,-1)]),_:1}),k(a(P),{label:`配置管理`,name:`second`},{default:A(()=>[...o[33]||=[y(`配置管理内容（使用 label 属性）`,-1)]]),_:1}),k(a(P),{label:`角色管理`,name:`third`},{default:A(()=>[...o[34]||=[y(`角色管理内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),x(`div`,ce,[k(e,{code:he,language:`vue`,title:`示例代码`})])]),x(`section`,le,[o[37]||=x(`h2`,{class:`component-demo-view__section-title`},`动态增减标签页`,-1),o[38]||=x(`p`,{class:`section-desc`},`通过 editable 属性可实现标签的增减，通过 tab-add 和 tab-remove 事件监听标签的添加和移除`,-1),x(`div`,X,[k(a(M),{modelValue:p.value,"onUpdate:modelValue":o[5]||=e=>p.value=e,type:`card`,editable:``,class:`demo-tabs`,onTabAdd:g,onTabRemove:v},{default:A(()=>[(S(!0),O(b,null,d(m,e=>(S(),te(a(P),{key:e.name,label:e.title,name:e.name},{default:A(()=>[y(c(e.content),1)]),_:2},1032,[`label`,`name`]))),128))]),_:1},8,[`modelValue`])]),x(`div`,Z,[k(e,{code:ge,language:`vue`,title:`示例代码`})])]),x(`section`,ue,[o[42]||=x(`h2`,{class:`component-demo-view__section-title`},`延迟加载（懒加载）`,-1),o[43]||=x(`p`,{class:`section-desc`},`通过 lazy 属性可延迟渲染标签内容，仅在标签首次选中时才渲染内容`,-1),x(`div`,Q,[k(a(M),{modelValue:u.value,"onUpdate:modelValue":o[6]||=e=>u.value=e,type:`border-card`,class:`demo-tabs`},{default:A(()=>[k(a(P),{label:`标签一`,name:`first`},{default:A(()=>[...o[39]||=[y(`标签一内容（立即渲染）`,-1)]]),_:1}),k(a(P),{label:`标签二`,name:`second`,lazy:``},{default:A(()=>[o[40]||=x(`p`,null,`标签二内容（延迟渲染）`,-1),x(`p`,null,`渲染时间：`+c(new Date().toLocaleTimeString()),1)]),_:1}),k(a(P),{label:`标签三`,name:`third`,lazy:``},{default:A(()=>[o[41]||=x(`p`,null,`标签三内容（延迟渲染）`,-1),x(`p`,null,`渲染时间：`+c(new Date().toLocaleTimeString()),1)]),_:1})]),_:1},8,[`modelValue`])]),x(`div`,$,[k(e,{code:_e,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-45d77912`]]);export{ve as default};
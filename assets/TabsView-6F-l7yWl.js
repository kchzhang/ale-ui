import{A as e,B as t,C as n,D as r,E as i,F as a,J as o,K as s,L as c,M as l,N as u,P as d,S as f,U as p,V as m,W as h,Y as g,_,f as v,g as y,h as b,i as x,j as ee,k as S,p as C,q as w,u as T,v as E,w as D,x as O,y as k,z as A}from"./index-B3Jx3uix.js";import{t as j}from"./button-GOPf8Q2w.js";import{t as M}from"./CodeBlock-CE4Cu_o1.js";var te={class:`ale-tabs__header`},ne=[`id`,`aria-selected`,`aria-controls`,`onClick`,`onKeydown`],re={class:`ale-tabs__item__content`},ie=[`onClick`],ae={class:`ale-tabs__content`},N=x(n({__name:`Tabs`,props:{modelValue:{},type:{default:``},tabPosition:{default:`top`},addable:{type:Boolean,default:!1},closable:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},stretch:{type:Boolean,default:!1},beforeLeave:{}},emits:[`update:modelValue`,`tab-click`,`tab-remove`,`tab-add`,`change`],setup(e,{expose:t,emit:n}){let i=e,s=n,f=h([]),p=b({get(){return i.modelValue??``},set(e){s(`update:modelValue`,e)}}),m=h(),x=h(),T=h(),D=h([]),j=h(!1),M=h(0),N=h(-1),P=b(()=>I.value===`top`||I.value===`bottom`?{transform:`translateX(-${M.value}px)`}:{transform:`translateY(-${M.value}px)`}),F=b(()=>{let e=f.value.findIndex(e=>e.active);if(e===-1)return{};let t=D.value[e];return t?I.value===`top`||I.value===`bottom`?{width:`${t.offsetWidth}px`,transform:`translateX(${t.offsetLeft}px)`}:{height:`${t.offsetHeight}px`,transform:`translateY(${t.offsetTop}px)`}:{}}),I=b(()=>i.tabPosition),L=b(()=>[`ale-tabs`,`ale-tabs--${I.value}`,{[`ale-tabs--${i.type}`]:i.type,"ale-tabs--stretch":i.stretch&&!i.type}]),R=b(()=>(i.addable||i.editable)&&I.value===`bottom`),z=b(()=>(i.addable||i.editable)&&I.value!==`bottom`),B=b(()=>I.value===`top`||I.value===`bottom`?`ale-icon-arrow-left`:`ale-icon-arrow-up`),V=b(()=>I.value===`top`||I.value===`bottom`?`ale-icon-arrow-right`:`ale-icon-arrow-down`),H=b(()=>i.stretch&&!i.type),U=b(()=>i.type===``),W=e=>({"ale-tabs__item":!0,"is-active":e.active,"is-disabled":e.props.disabled,"is-closable":i.closable||e.props.closable||i.editable}),G=e=>(i.closable||e.props.closable||i.editable)&&!e.props.disabled,K=(e,t)=>{e&&(D.value[t]=e)},q=()=>i.stretch&&!i.type?{flex:1}:{},J=e=>{let t=f.value.findIndex(t=>t.uid===e.uid);t===-1?f.value.push(e):f.value[t]=e,oe()},Y=e=>{let t=f.value.findIndex(t=>t.uid===e);t>-1&&f.value.splice(t,1)},oe=()=>{let e=m.value?.querySelector(`.ale-tabs__content`);if(e){let t=Array.from(e.children);f.value.sort((e,n)=>t.findIndex(t=>{let n=f.value.find(t=>t.uid===e.uid);return t===m.value?.querySelector(`[name="${n?.props.name}"]`)})-t.findIndex(e=>{let t=f.value.find(e=>e.uid===n.uid);return e===m.value?.querySelector(`[name="${t?.props.name}"]`)}))}},X=()=>{r(()=>{if(!x.value||!T.value)return;let e=T.value,t=x.value;I.value===`top`||I.value===`bottom`?j.value=e.offsetWidth>t.offsetWidth:j.value=e.offsetHeight>t.offsetHeight})},se=()=>{let e=I.value===`top`||I.value===`bottom`?x.value?.offsetWidth||0:x.value?.offsetHeight||0;M.value=Math.max(0,M.value-e)},ce=()=>{let e=I.value===`top`||I.value===`bottom`?x.value?.offsetWidth||0:x.value?.offsetHeight||0,t=I.value===`top`||I.value===`bottom`?T.value?.offsetWidth||0:T.value?.offsetHeight||0;M.value=Math.min(M.value+e,t-e)},Z=()=>{r(()=>{let e=f.value.findIndex(e=>e.active);if(e===-1||!j.value)return;let t=D.value[e];if(!t||!x.value)return;let n=I.value===`top`||I.value===`bottom`?x.value.offsetWidth:x.value.offsetHeight,r=I.value===`top`||I.value===`bottom`?t.offsetLeft:t.offsetTop,i=I.value===`top`||I.value===`bottom`?t.offsetWidth:t.offsetHeight;r<M.value?M.value=r:r+i>M.value+n&&(M.value=r+i-n)})},Q=async(e,t)=>{if(e.props.disabled)return;s(`tab-click`,{name:e.props.name,label:e.props.label},t);let n=p.value,r=e.props.name;if(n!==r){if(i.beforeLeave)try{if(await i.beforeLeave(r,n)===!1)return}catch{return}p.value=r,s(`change`,r),Z()}},le=(e,t)=>{if(!e.props.disabled&&(s(`tab-remove`,e.props.name),e.active&&f.value.length>1)){let e=t<f.value.length-1?t:t-1,n=f.value[e];n&&!n.props.disabled&&(p.value=n.props.name,s(`change`,n.props.name))}},$=()=>{s(`tab-add`)},ue=(e,t)=>{let n=e.keyCode||e.which,r=I.value===`top`||I.value===`bottom`,i=-1;if(r?n===37?i=t-1:n===39&&(i=t+1):n===38?i=t-1:n===40&&(i=t+1),i>=0&&i<f.value.length){e.preventDefault();let t=f.value[i];t.props.disabled||(N.value=i,Q(t,e))}};return S(()=>{X(),window.addEventListener(`resize`,X)}),ee(()=>{X()}),A(()=>i.modelValue,()=>{Z()}),A(f,()=>{if(X(),f.value.length>0&&!f.value.some(e=>e.active)){let e=f.value.find(e=>!e.props.disabled);e&&(p.value=e.props.name)}},{deep:!0}),u(`tabsContext`,{props:i,registerPane:J,unregisterPane:Y}),t({currentName:p}),(e,t)=>(l(),k(`div`,{ref_key:`tabsRef`,ref:m,class:w(L.value)},[y(`div`,te,[R.value?(l(),k(`span`,{key:0,class:`ale-tabs__new-tab`,onClick:$},[a(e.$slots,`addIcon`,{},()=>[t[0]||=y(`i`,{class:`ale-icon-plus`},null,-1)],!0)])):E(``,!0),y(`div`,{class:w([`ale-tabs__nav-wrap`,{"is-scrollable":j.value}])},[j.value?(l(),k(`span`,{key:0,class:`ale-tabs__nav-prev`,onClick:se},[y(`i`,{class:w(B.value)},null,2)])):E(``,!0),y(`div`,{ref_key:`navScrollRef`,ref:x,class:`ale-tabs__nav-scroll`},[y(`div`,{ref_key:`navRef`,ref:T,class:w([`ale-tabs__nav`,{"is-stretch":H.value}]),style:o(P.value),role:`tablist`},[(l(!0),k(C,null,d(f.value,(e,n)=>(l(),k(`div`,{key:e.uid,ref_for:!0,ref:e=>K(e,n),class:w(W(e)),style:o(q()),id:`tab-${e.paneName}`,"aria-selected":e.active,"aria-controls":`pane-${e.paneName}`,role:`tab`,tabindex:`-1`,onClick:t=>Q(e,t),onKeydown:e=>ue(e,n)},[y(`span`,re,[e.slots?.label?(l(),_(c(e.slots.label),{key:0})):(l(),k(C,{key:1},[O(g(e.props.label),1)],64))]),G(e)?(l(),k(`span`,{key:0,class:`ale-tabs__item__close`,onClick:v(t=>le(e,n),[`stop`])},[...t[1]||=[y(`i`,{class:`ale-icon-close`},null,-1)]],8,ie)):E(``,!0)],46,ne))),128)),U.value?(l(),k(`div`,{key:0,class:`ale-tabs__active-bar`,style:o(F.value)},null,4)):E(``,!0)],6)],512),j.value?(l(),k(`span`,{key:1,class:`ale-tabs__nav-next`,onClick:ce},[y(`i`,{class:w(V.value)},null,2)])):E(``,!0)],2),z.value?(l(),k(`span`,{key:1,class:`ale-tabs__new-tab`,onClick:$},[a(e.$slots,`addIcon`,{},()=>[t[2]||=y(`i`,{class:`ale-icon-plus`},null,-1)],!0)])):E(``,!0)]),y(`div`,ae,[a(e.$slots,`default`,{},void 0,!0)])],2))}}),[[`__scopeId`,`data-v-cab3168f`]]),P=[`aria-hidden`],F=n({__name:`TabPane`,props:{label:{default:``},name:{},disabled:{type:Boolean,default:!1},closable:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1}},emits:[`tab-click`],setup(t,{expose:n,emit:r}){let o=t,s=i(`tabsContext`,null),c=D(),u=c?.uid??0,d=h(!1),f=b(()=>s?.props.modelValue===o.name);A(f,e=>{e&&(d.value=!0)},{immediate:!0});let p=b(()=>``),g=b(()=>o.closable||s?.props.closable||!1);return S(()=>{s&&s.registerPane({uid:u,props:o,slots:c?.slots,paneName:b(()=>o.name),active:f,index:h(void 0),isClosable:g})}),e(()=>{s&&s.unregisterPane(u)}),A(()=>o,()=>{s&&s.registerPane({uid:u,props:o,slots:c?.slots,paneName:b(()=>o.name),active:f,index:h(void 0),isClosable:g})},{deep:!0}),n({name:b(()=>o.name),active:f}),(e,t)=>m((l(),k(`div`,{class:w([`ale-tab-pane`,p.value]),role:`tabpanel`,"aria-hidden":!f.value},[a(e.$slots,`default`)],10,P)),[[T,f.value]])}}),I={class:`component-demo-view`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`},z={class:`component-demo-view__code`},B={class:`component-demo-view__section`},V={class:`component-demo-view__demo`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo`},G={class:`component-demo-view__code`},K={class:`component-demo-view__section`},q={class:`component-demo-view__demo position-demo`},J={class:`position-selector`},Y={class:`component-demo-view__code`},oe={class:`component-demo-view__section`},X={class:`component-demo-view__demo`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},Z={class:`component-demo-view__demo`},Q={class:`component-demo-view__code`},le={class:`component-demo-view__section`},$={class:`component-demo-view__demo`},ue={class:`component-demo-view__code`},de=`<template>
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
<\/script>`,ve=x(n({__name:`TabsView`,setup(e){let n=h(`first`),r=h(`first`),i=h(`first`),a=h(`first`),o=h(`first`),c=h(`first`),u=h(`top`),m=h(`1`),v=p([{title:`Tab 1`,name:`1`,content:`Tab 1 content`},{title:`Tab 2`,name:`2`,content:`Tab 2 content`},{title:`Tab 3`,name:`3`,content:`Tab 3 content`}]),b=3,x=()=>{let e=++b+``;v.push({title:`New Tab`,name:e,content:`New Tab content`}),m.value=e},ee=e=>{let t=v,n=m.value;n===e&&t.forEach((r,i)=>{if(r.name===e){let e=t[i+1]||t[i-1];e&&(n=e.name)}}),m.value=n;let r=t.findIndex(t=>t.name===e);r>-1&&t.splice(r,1)};return(e,p)=>(l(),k(`div`,I,[p[44]||=y(`div`,{class:`component-demo-view__header`},[y(`h1`,{class:`component-demo-view__title`},`Tabs 标签页`),y(`p`,{class:`component-demo-view__description`},` 分隔内容上有关联但属于不同类别的数据集合 `)],-1),y(`section`,L,[p[11]||=y(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),p[12]||=y(`p`,{class:`section-desc`},`Tabs 组件通过 TabPane 子组件定义标签页内容，使用 label 属性定义标签名，name 属性定义标识符`,-1),y(`div`,R,[f(s(N),{modelValue:n.value,"onUpdate:modelValue":p[0]||=e=>n.value=e,class:`demo-tabs`},{default:t(()=>[f(s(F),{label:`用户管理`,name:`first`},{default:t(()=>[...p[7]||=[O(`用户管理内容`,-1)]]),_:1}),f(s(F),{label:`配置管理`,name:`second`},{default:t(()=>[...p[8]||=[O(`配置管理内容`,-1)]]),_:1}),f(s(F),{label:`角色管理`,name:`third`},{default:t(()=>[...p[9]||=[O(`角色管理内容`,-1)]]),_:1}),f(s(F),{label:`定时任务补偿`,name:`fourth`},{default:t(()=>[...p[10]||=[O(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),y(`div`,z,[f(M,{code:de,language:`vue`,title:`示例代码`})])]),y(`section`,B,[p[17]||=y(`h2`,{class:`component-demo-view__section-title`},`卡片风格`,-1),p[18]||=y(`p`,{class:`section-desc`},`设置 type 属性为 card 即可使用卡片风格的标签页`,-1),y(`div`,V,[f(s(N),{modelValue:r.value,"onUpdate:modelValue":p[1]||=e=>r.value=e,type:`card`,class:`demo-tabs`},{default:t(()=>[f(s(F),{label:`用户管理`,name:`first`},{default:t(()=>[...p[13]||=[O(`用户管理内容`,-1)]]),_:1}),f(s(F),{label:`配置管理`,name:`second`},{default:t(()=>[...p[14]||=[O(`配置管理内容`,-1)]]),_:1}),f(s(F),{label:`角色管理`,name:`third`},{default:t(()=>[...p[15]||=[O(`角色管理内容`,-1)]]),_:1}),f(s(F),{label:`定时任务补偿`,name:`fourth`},{default:t(()=>[...p[16]||=[O(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),y(`div`,H,[f(M,{code:fe,language:`vue`,title:`示例代码`})])]),y(`section`,U,[p[23]||=y(`h2`,{class:`component-demo-view__section-title`},`边框卡片`,-1),p[24]||=y(`p`,{class:`section-desc`},`设置 type 属性为 border-card 即可使用边框卡片风格的标签页`,-1),y(`div`,W,[f(s(N),{modelValue:i.value,"onUpdate:modelValue":p[2]||=e=>i.value=e,type:`border-card`,class:`demo-tabs`},{default:t(()=>[f(s(F),{label:`用户管理`,name:`first`},{default:t(()=>[...p[19]||=[O(`用户管理内容`,-1)]]),_:1}),f(s(F),{label:`配置管理`,name:`second`},{default:t(()=>[...p[20]||=[O(`配置管理内容`,-1)]]),_:1}),f(s(F),{label:`角色管理`,name:`third`},{default:t(()=>[...p[21]||=[O(`角色管理内容`,-1)]]),_:1}),f(s(F),{label:`定时任务补偿`,name:`fourth`},{default:t(()=>[...p[22]||=[O(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),y(`div`,G,[f(M,{code:pe,language:`vue`,title:`示例代码`})])]),y(`section`,K,[p[29]||=y(`h2`,{class:`component-demo-view__section-title`},`位置`,-1),p[30]||=y(`p`,{class:`section-desc`},`设置 tabPosition 属性可改变标签位置，支持 top、right、bottom、left 四个方向`,-1),y(`div`,q,[y(`div`,J,[(l(),k(C,null,d([`top`,`right`,`bottom`,`left`],e=>f(s(j),{key:e,type:u.value===e?`primary`:`default`,size:`small`,onClick:t=>u.value=e},{default:t(()=>[O(g(e),1)]),_:2},1032,[`type`,`onClick`])),64))]),f(s(N),{modelValue:a.value,"onUpdate:modelValue":p[3]||=e=>a.value=e,tabPosition:u.value,style:{height:`200px`},class:`demo-tabs`},{default:t(()=>[f(s(F),{label:`用户管理`,name:`first`},{default:t(()=>[...p[25]||=[O(`用户管理内容`,-1)]]),_:1}),f(s(F),{label:`配置管理`,name:`second`},{default:t(()=>[...p[26]||=[O(`配置管理内容`,-1)]]),_:1}),f(s(F),{label:`角色管理`,name:`third`},{default:t(()=>[...p[27]||=[O(`角色管理内容`,-1)]]),_:1}),f(s(F),{label:`定时任务补偿`,name:`fourth`},{default:t(()=>[...p[28]||=[O(`定时任务补偿内容`,-1)]]),_:1})]),_:1},8,[`modelValue`,`tabPosition`])]),y(`div`,Y,[f(M,{code:me,language:`vue`,title:`示例代码`})])]),y(`section`,oe,[p[35]||=y(`h2`,{class:`component-demo-view__section-title`},`自定义标签页`,-1),p[36]||=y(`p`,{class:`section-desc`},`可以通过具名插槽实现自定义标签页内容`,-1),y(`div`,X,[f(s(N),{modelValue:o.value,"onUpdate:modelValue":p[4]||=e=>o.value=e,type:`card`,class:`demo-tabs`},{default:t(()=>[f(s(F),{name:`first`},{label:t(()=>[...p[31]||=[y(`span`,null,`📅 用户管理`,-1)]]),default:t(()=>[p[32]||=O(` 用户管理内容（使用 #label 插槽，无 label 属性） `,-1)]),_:1}),f(s(F),{label:`配置管理`,name:`second`},{default:t(()=>[...p[33]||=[O(`配置管理内容（使用 label 属性）`,-1)]]),_:1}),f(s(F),{label:`角色管理`,name:`third`},{default:t(()=>[...p[34]||=[O(`角色管理内容`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),y(`div`,se,[f(M,{code:he,language:`vue`,title:`示例代码`})])]),y(`section`,ce,[p[37]||=y(`h2`,{class:`component-demo-view__section-title`},`动态增减标签页`,-1),p[38]||=y(`p`,{class:`section-desc`},`通过 editable 属性可实现标签的增减，通过 tab-add 和 tab-remove 事件监听标签的添加和移除`,-1),y(`div`,Z,[f(s(N),{modelValue:m.value,"onUpdate:modelValue":p[5]||=e=>m.value=e,type:`card`,editable:``,class:`demo-tabs`,onTabAdd:x,onTabRemove:ee},{default:t(()=>[(l(!0),k(C,null,d(v,e=>(l(),_(s(F),{key:e.name,label:e.title,name:e.name},{default:t(()=>[O(g(e.content),1)]),_:2},1032,[`label`,`name`]))),128))]),_:1},8,[`modelValue`])]),y(`div`,Q,[f(M,{code:ge,language:`vue`,title:`示例代码`})])]),y(`section`,le,[p[42]||=y(`h2`,{class:`component-demo-view__section-title`},`延迟加载（懒加载）`,-1),p[43]||=y(`p`,{class:`section-desc`},`通过 lazy 属性可延迟渲染标签内容，仅在标签首次选中时才渲染内容`,-1),y(`div`,$,[f(s(N),{modelValue:c.value,"onUpdate:modelValue":p[6]||=e=>c.value=e,type:`border-card`,class:`demo-tabs`},{default:t(()=>[f(s(F),{label:`标签一`,name:`first`},{default:t(()=>[...p[39]||=[O(`标签一内容（立即渲染）`,-1)]]),_:1}),f(s(F),{label:`标签二`,name:`second`,lazy:``},{default:t(()=>[p[40]||=y(`p`,null,`标签二内容（延迟渲染）`,-1),y(`p`,null,`渲染时间：`+g(new Date().toLocaleTimeString()),1)]),_:1}),f(s(F),{label:`标签三`,name:`third`,lazy:``},{default:t(()=>[p[41]||=y(`p`,null,`标签三内容（延迟渲染）`,-1),y(`p`,null,`渲染时间：`+g(new Date().toLocaleTimeString()),1)]),_:1})]),_:1},8,[`modelValue`])]),y(`div`,ue,[f(M,{code:_e,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-45d77912`]]);export{ve as default};
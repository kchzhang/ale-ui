import{B as e,C as t,K as n,M as r,P as ee,S as i,U as a,W as o,Y as s,_ as te,g as c,i as l,p as ne,q as re,v as u,x as ie,y as d}from"./index-B3Jx3uix.js";import{t as ae}from"./button-GOPf8Q2w.js";import{t as f}from"./Switch-CCw67EqZ.js";import{t as p}from"./CodeBlock-CE4Cu_o1.js";var oe={class:`component-demo-view`},se={class:`component-demo-view__section`},ce={class:`component-demo-view__demo`},le={class:`demo-value`},ue={class:`component-demo-view__code`},de={class:`component-demo-view__section`},fe={class:`component-demo-view__demo`,style:{gap:`24px`}},pe={class:`demo-item`},me={class:`demo-item`},he={class:`demo-item`},ge={class:`component-demo-view__code`},_e={class:`component-demo-view__section`},ve={class:`component-demo-view__demo`,style:{gap:`24px`}},ye={class:`demo-item`},be={class:`demo-item`},xe={class:`demo-item`},Se={class:`demo-item`},Ce={class:`component-demo-view__code`},we={class:`component-demo-view__section`},m={class:`component-demo-view__demo`,style:{gap:`24px`}},h={class:`component-demo-view__code`},g={class:`component-demo-view__section`},_={class:`component-demo-view__demo`,style:{gap:`24px`}},v={class:`demo-item`},y={class:`demo-item`},b={class:`component-demo-view__code`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`,style:{gap:`24px`}},C={class:`demo-item`},w={class:`demo-item`},T={class:`component-demo-view__code`},E={class:`component-demo-view__section`},D={class:`component-demo-view__demo`,style:{gap:`24px`}},O={class:`demo-item`},k={class:`demo-item`},Te={class:`demo-item`},Ee={class:`component-demo-view__code`},De={class:`component-demo-view__section`},Oe={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`,gap:`16px`}},ke={class:`component-demo-view__code`},Ae={class:`component-demo-view__section`},je={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},Me={class:`form-demo`},Ne={class:`form-item`},Pe={class:`form-item`},Fe={class:`form-item`},Ie={class:`form-item`},Le={class:`form-result`},A={class:`component-demo-view__code`},Re={class:`component-demo-view__section`},ze={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`,gap:`16px`}},Be={class:`event-log`},Ve={class:`component-demo-view__code`},He=`<template>
  <AleSwitch v-model="value" />
  <span>当前状态: {{ value ? '开启' : '关闭' }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value = ref(true);
<\/script>`,Ue=`<template>
  <AleSwitch v-model="value1" size="small" />
  <AleSwitch v-model="value2" size="medium" />
  <AleSwitch v-model="value3" size="large" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
<\/script>`,We=`<template>
  <AleSwitch v-model="value1" theme="primary" />
  <AleSwitch v-model="value2" theme="success" />
  <AleSwitch v-model="value3" theme="warning" />
  <AleSwitch v-model="value4" theme="danger" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
const value4 = ref(true);
<\/script>`,Ge=`<template>
  <AleSwitch
    v-model="value1"
    active-text="开启"
    inactive-text="关闭"
  />
  <AleSwitch
    v-model="value2"
    active-text="ON"
    inactive-text="OFF"
    theme="success"
  />
  <AleSwitch
    v-model="value3"
    active-text="已启用"
    inactive-text="已禁用"
    size="large"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
const value3 = ref(true);
<\/script>`,Ke=`<template>
  <AleSwitch v-model="value1" disabled />
  <AleSwitch v-model="value2" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
<\/script>`,qe=`<template>
  <AleSwitch v-model="value1" loading />
  <AleSwitch v-model="value2" loading />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
<\/script>`,Je=`<template>
  <AleSwitch
    v-model="value1"
    active-color="#8B5CF6"
    inactive-color="#E5E7EB"
  />
  <AleSwitch
    v-model="value2"
    active-color="#F59E0B"
    inactive-color="#D1D5DB"
  />
  <AleSwitch
    v-model="value3"
    active-color="#EC4899"
    inactive-color="#E5E7EB"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value1 = ref(true);
const value2 = ref(false);
const value3 = ref(true);
<\/script>`,Ye=`<template>
  <AleSwitch
    v-model="value"
    :loading="isLoading"
    active-text="已连接"
    inactive-text="已断开"
    @change="handleChange"
  />
  <p v-if="message">{{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value = ref(false);
const isLoading = ref(false);
const message = ref('');

const handleChange = async (val: boolean) => {
  isLoading.value = true;
  message.value = val ? '正在连接...' : '正在断开...';
  
  // 模拟异步请求
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  message.value = val ? '连接成功！' : '已断开连接';
  isLoading.value = false;
};
<\/script>`,Xe=`<template>
  <div class="form-demo">
    <div class="form-item">
      <span>消息通知：</span>
      <AleSwitch v-model="form.notifications" />
    </div>
    <div class="form-item">
      <span>自动保存：</span>
      <AleSwitch v-model="form.autoSave" theme="success" />
    </div>
    <div class="form-item">
      <span>夜间模式：</span>
      <AleSwitch v-model="form.darkMode" theme="warning" />
    </div>
    <div class="form-item">
      <span>隐私模式：</span>
      <AleSwitch v-model="form.privacy" theme="danger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { AleSwitch } from 'ale-ui';

const form = reactive({
  notifications: true,
  autoSave: false,
  darkMode: false,
  privacy: true
});
<\/script>`,Ze=`<template>
  <AleSwitch
    v-model="value"
    @change="handleChange"
    @click="handleClick"
  />
  <ul>
    <li v-for="(log, index) in logs" :key="index">
      {{ log }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSwitch } from 'ale-ui';

const value = ref(false);
const logs = ref<string[]>([]);

const handleChange = (val: boolean) => {
  logs.value.unshift(\`change 事件: \${val}\`);
};

const handleClick = () => {
  logs.value.unshift('click 事件');
};
<\/script>`,j=l(t({__name:`SwitchView`,setup(t){let l=o(!0),j=o(!0),M=o(!0),N=o(!0),P=o(!0),F=o(!0),I=o(!0),L=o(!0),R=o(!0),z=o(!1),B=o(!0),V=o(!0),H=o(!1),U=o(!0),W=o(!1),G=o(!0),K=o(!1),q=o(!0),J=o(!1),Y=o(!1),X=o(``),Qe=async e=>{Y.value=!0,X.value=e?`正在连接...`:`正在断开...`,await new Promise(e=>setTimeout(e,1500)),X.value=e?`连接成功！`:`已断开连接`,Y.value=!1,setTimeout(()=>{X.value=``},3e3)},Z=a({notifications:!0,autoSave:!1,darkMode:!1,privacy:!0}),Q=o(!1),$=o([]),$e=e=>{let t=new Date().toLocaleTimeString();$.value.unshift(`[${t}] change 事件: ${e}`)},et=()=>{let e=new Date().toLocaleTimeString();$.value.unshift(`[${e}] click 事件`)},tt=()=>{$.value=[]};return(t,a)=>(r(),d(`div`,oe,[a[56]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Switch 开关`),c(`p`,{class:`component-demo-view__description`},` 开关用于在两种状态间切换，表示开/关、是/否等互斥选项 `)],-1),c(`section`,se,[a[24]||=c(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),c(`div`,ce,[i(n(f),{modelValue:l.value,"onUpdate:modelValue":a[0]||=e=>l.value=e},null,8,[`modelValue`]),c(`span`,le,`当前状态: `+s(l.value?`开启`:`关闭`),1)]),c(`div`,ue,[i(p,{code:He,language:`vue`,title:`示例代码`})])]),c(`section`,de,[a[28]||=c(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),c(`div`,fe,[c(`div`,pe,[i(n(f),{modelValue:j.value,"onUpdate:modelValue":a[1]||=e=>j.value=e,size:`small`},null,8,[`modelValue`]),a[25]||=c(`span`,{class:`demo-label`},`small`,-1)]),c(`div`,me,[i(n(f),{modelValue:M.value,"onUpdate:modelValue":a[2]||=e=>M.value=e,size:`medium`},null,8,[`modelValue`]),a[26]||=c(`span`,{class:`demo-label`},`medium`,-1)]),c(`div`,he,[i(n(f),{modelValue:N.value,"onUpdate:modelValue":a[3]||=e=>N.value=e,size:`large`},null,8,[`modelValue`]),a[27]||=c(`span`,{class:`demo-label`},`large`,-1)])]),c(`div`,ge,[i(p,{code:Ue,language:`vue`,title:`示例代码`})])]),c(`section`,_e,[a[33]||=c(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),c(`div`,ve,[c(`div`,ye,[i(n(f),{modelValue:P.value,"onUpdate:modelValue":a[4]||=e=>P.value=e,theme:`primary`},null,8,[`modelValue`]),a[29]||=c(`span`,{class:`demo-label`},`primary`,-1)]),c(`div`,be,[i(n(f),{modelValue:F.value,"onUpdate:modelValue":a[5]||=e=>F.value=e,theme:`success`},null,8,[`modelValue`]),a[30]||=c(`span`,{class:`demo-label`},`success`,-1)]),c(`div`,xe,[i(n(f),{modelValue:I.value,"onUpdate:modelValue":a[6]||=e=>I.value=e,theme:`warning`},null,8,[`modelValue`]),a[31]||=c(`span`,{class:`demo-label`},`warning`,-1)]),c(`div`,Se,[i(n(f),{modelValue:L.value,"onUpdate:modelValue":a[7]||=e=>L.value=e,theme:`danger`},null,8,[`modelValue`]),a[32]||=c(`span`,{class:`demo-label`},`danger`,-1)])]),c(`div`,Ce,[i(p,{code:We,language:`vue`,title:`示例代码`})])]),c(`section`,we,[a[34]||=c(`h2`,{class:`component-demo-view__section-title`},`带文字描述`,-1),c(`div`,m,[i(n(f),{modelValue:R.value,"onUpdate:modelValue":a[8]||=e=>R.value=e,"active-text":`开启`,"inactive-text":`关闭`},null,8,[`modelValue`]),i(n(f),{modelValue:z.value,"onUpdate:modelValue":a[9]||=e=>z.value=e,"active-text":`ON`,"inactive-text":`OFF`,theme:`success`},null,8,[`modelValue`]),i(n(f),{modelValue:B.value,"onUpdate:modelValue":a[10]||=e=>B.value=e,"active-text":`已启用`,"inactive-text":`已禁用`,size:`large`},null,8,[`modelValue`])]),c(`div`,h,[i(p,{code:Ge,language:`vue`,title:`示例代码`})])]),c(`section`,g,[a[37]||=c(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),c(`div`,_,[c(`div`,v,[i(n(f),{modelValue:V.value,"onUpdate:modelValue":a[11]||=e=>V.value=e,disabled:``},null,8,[`modelValue`]),a[35]||=c(`span`,{class:`demo-label`},`禁用-开启`,-1)]),c(`div`,y,[i(n(f),{modelValue:H.value,"onUpdate:modelValue":a[12]||=e=>H.value=e,disabled:``},null,8,[`modelValue`]),a[36]||=c(`span`,{class:`demo-label`},`禁用-关闭`,-1)])]),c(`div`,b,[i(p,{code:Ke,language:`vue`,title:`示例代码`})])]),c(`section`,x,[a[40]||=c(`h2`,{class:`component-demo-view__section-title`},`加载状态`,-1),c(`div`,S,[c(`div`,C,[i(n(f),{modelValue:U.value,"onUpdate:modelValue":a[13]||=e=>U.value=e,loading:``},null,8,[`modelValue`]),a[38]||=c(`span`,{class:`demo-label`},`加载中-开启`,-1)]),c(`div`,w,[i(n(f),{modelValue:W.value,"onUpdate:modelValue":a[14]||=e=>W.value=e,loading:``},null,8,[`modelValue`]),a[39]||=c(`span`,{class:`demo-label`},`加载中-关闭`,-1)])]),c(`div`,T,[i(p,{code:qe,language:`vue`,title:`示例代码`})])]),c(`section`,E,[a[44]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),c(`div`,D,[c(`div`,O,[i(n(f),{modelValue:G.value,"onUpdate:modelValue":a[15]||=e=>G.value=e,"active-color":`#8B5CF6`,"inactive-color":`#E5E7EB`},null,8,[`modelValue`]),a[41]||=c(`span`,{class:`demo-label`},`紫色主题`,-1)]),c(`div`,k,[i(n(f),{modelValue:K.value,"onUpdate:modelValue":a[16]||=e=>K.value=e,"active-color":`#F59E0B`,"inactive-color":`#D1D5DB`},null,8,[`modelValue`]),a[42]||=c(`span`,{class:`demo-label`},`橙色主题`,-1)]),c(`div`,Te,[i(n(f),{modelValue:q.value,"onUpdate:modelValue":a[17]||=e=>q.value=e,"active-color":`#EC4899`,"inactive-color":`#E5E7EB`},null,8,[`modelValue`]),a[43]||=c(`span`,{class:`demo-label`},`粉色主题`,-1)])]),c(`div`,Ee,[i(p,{code:Je,language:`vue`,title:`示例代码`})])]),c(`section`,De,[a[46]||=c(`h2`,{class:`component-demo-view__section-title`},`异步操作`,-1),c(`div`,Oe,[a[45]||=c(`p`,{style:{margin:`0`,color:`var(--color-text-secondary)`}},` 点击开关会模拟异步请求，请求期间显示 loading 状态 `,-1),i(n(f),{modelValue:J.value,"onUpdate:modelValue":a[18]||=e=>J.value=e,loading:Y.value,"active-text":`已连接`,"inactive-text":`已断开`,onChange:Qe},null,8,[`modelValue`,`loading`]),X.value?(r(),d(`p`,{key:0,class:re([`async-message`,J.value?`success`:`info`])},s(X.value),3)):u(``,!0)]),c(`div`,ke,[i(p,{code:Ye,language:`vue`,title:`示例代码`})])]),c(`section`,Ae,[a[52]||=c(`h2`,{class:`component-demo-view__section-title`},`表单应用`,-1),c(`div`,je,[c(`div`,Me,[c(`div`,Ne,[a[47]||=c(`span`,{class:`form-label`},`消息通知：`,-1),i(n(f),{modelValue:Z.notifications,"onUpdate:modelValue":a[19]||=e=>Z.notifications=e,"active-text":`开启`,"inactive-text":`关闭`},null,8,[`modelValue`])]),c(`div`,Pe,[a[48]||=c(`span`,{class:`form-label`},`自动保存：`,-1),i(n(f),{modelValue:Z.autoSave,"onUpdate:modelValue":a[20]||=e=>Z.autoSave=e,theme:`success`},null,8,[`modelValue`])]),c(`div`,Fe,[a[49]||=c(`span`,{class:`form-label`},`夜间模式：`,-1),i(n(f),{modelValue:Z.darkMode,"onUpdate:modelValue":a[21]||=e=>Z.darkMode=e,theme:`warning`},null,8,[`modelValue`])]),c(`div`,Ie,[a[50]||=c(`span`,{class:`form-label`},`隐私模式：`,-1),i(n(f),{modelValue:Z.privacy,"onUpdate:modelValue":a[22]||=e=>Z.privacy=e,theme:`danger`},null,8,[`modelValue`])]),c(`div`,Le,[a[51]||=c(`p`,null,`表单数据：`,-1),c(`pre`,null,s(JSON.stringify(Z,null,2)),1)])])]),c(`div`,A,[i(p,{code:Xe,language:`vue`,title:`示例代码`})])]),c(`section`,Re,[a[55]||=c(`h2`,{class:`component-demo-view__section-title`},`事件监听`,-1),c(`div`,ze,[i(n(f),{modelValue:Q.value,"onUpdate:modelValue":a[23]||=e=>Q.value=e,"active-text":`开启`,"inactive-text":`关闭`,onChange:$e,onClick:et},null,8,[`modelValue`]),c(`div`,Be,[a[54]||=c(`p`,null,`事件记录：`,-1),c(`ul`,null,[(r(!0),d(ne,null,ee($.value,(e,t)=>(r(),d(`li`,{key:t,class:`event-log-item`},s(e),1))),128))]),$.value.length>0?(r(),te(n(ae),{key:0,size:`small`,onClick:tt},{default:e(()=>[...a[53]||=[ie(` 清空记录 `,-1)]]),_:1})):u(``,!0)])]),c(`div`,Ve,[i(p,{code:Ze,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-4d4d4a0d`]]);export{j as default};
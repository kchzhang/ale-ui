import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,H as ee,J as n,K as te,N as ne,S as r,U as i,_ as a,b as re,f as ie,g as ae,h as o,j as s,r as c,v as l,x as u,z as oe}from"./index-D6beBo5R.js";import{t as se}from"./button-CbFeg90j.js";import{t as d}from"./Switch-JxyvskAR.js";var ce={class:`component-demo-view`},le={class:`component-demo-view__section`},ue={class:`component-demo-view__demo`},de={class:`demo-value`},fe={class:`component-demo-view__code`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`,style:{gap:`24px`}},he={class:`demo-item`},ge={class:`demo-item`},_e={class:`demo-item`},ve={class:`component-demo-view__code`},ye={class:`component-demo-view__section`},be={class:`component-demo-view__demo`,style:{gap:`24px`}},xe={class:`demo-item`},Se={class:`demo-item`},Ce={class:`demo-item`},we={class:`demo-item`},f={class:`component-demo-view__code`},p={class:`component-demo-view__section`},m={class:`component-demo-view__demo`,style:{gap:`24px`}},h={class:`component-demo-view__code`},g={class:`component-demo-view__section`},_={class:`component-demo-view__demo`,style:{gap:`24px`}},v={class:`demo-item`},y={class:`demo-item`},b={class:`component-demo-view__code`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`,style:{gap:`24px`}},C={class:`demo-item`},w={class:`demo-item`},T={class:`component-demo-view__code`},E={class:`component-demo-view__section`},D={class:`component-demo-view__demo`,style:{gap:`24px`}},O={class:`demo-item`},k={class:`demo-item`},Te={class:`demo-item`},Ee={class:`component-demo-view__code`},De={class:`component-demo-view__section`},Oe={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`,gap:`16px`}},ke={class:`component-demo-view__code`},Ae={class:`component-demo-view__section`},je={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},Me={class:`form-demo`},Ne={class:`form-item`},Pe={class:`form-item`},Fe={class:`form-item`},A={class:`form-item`},Ie={class:`form-result`},Le={class:`component-demo-view__code`},Re={class:`component-demo-view__section`},ze={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`,gap:`16px`}},Be={class:`event-log`},Ve={class:`component-demo-view__code`},He=`<template>
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
<\/script>`,j=c(r({__name:`SwitchView`,setup(r){let c=i(!0),j=i(!0),M=i(!0),N=i(!0),P=i(!0),F=i(!0),I=i(!0),L=i(!0),R=i(!0),z=i(!1),B=i(!0),V=i(!0),H=i(!1),U=i(!0),W=i(!1),G=i(!0),K=i(!1),q=i(!0),J=i(!1),Y=i(!1),X=i(``),Qe=async e=>{Y.value=!0,X.value=e?`正在连接...`:`正在断开...`,await new Promise(e=>setTimeout(e,1500)),X.value=e?`连接成功！`:`已断开连接`,Y.value=!1,setTimeout(()=>{X.value=``},3e3)},Z=ee({notifications:!0,autoSave:!1,darkMode:!1,privacy:!0}),Q=i(!1),$=i([]),$e=e=>{let t=new Date().toLocaleTimeString();$.value.unshift(`[${t}] change 事件: ${e}`)},et=()=>{let e=new Date().toLocaleTimeString();$.value.unshift(`[${e}] click 事件`)},tt=()=>{$.value=[]};return(ee,r)=>(s(),l(`div`,ce,[r[56]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Switch 开关`),o(`p`,{class:`component-demo-view__description`},` 开关用于在两种状态间切换，表示开/关、是/否等互斥选项 `)],-1),o(`section`,le,[r[24]||=o(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),o(`div`,ue,[u(t(d),{modelValue:c.value,"onUpdate:modelValue":r[0]||=e=>c.value=e},null,8,[`modelValue`]),o(`span`,de,`当前状态: `+n(c.value?`开启`:`关闭`),1)]),o(`div`,fe,[u(e,{code:He,language:`vue`,title:`示例代码`})])]),o(`section`,pe,[r[28]||=o(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),o(`div`,me,[o(`div`,he,[u(t(d),{modelValue:j.value,"onUpdate:modelValue":r[1]||=e=>j.value=e,size:`small`},null,8,[`modelValue`]),r[25]||=o(`span`,{class:`demo-label`},`small`,-1)]),o(`div`,ge,[u(t(d),{modelValue:M.value,"onUpdate:modelValue":r[2]||=e=>M.value=e,size:`medium`},null,8,[`modelValue`]),r[26]||=o(`span`,{class:`demo-label`},`medium`,-1)]),o(`div`,_e,[u(t(d),{modelValue:N.value,"onUpdate:modelValue":r[3]||=e=>N.value=e,size:`large`},null,8,[`modelValue`]),r[27]||=o(`span`,{class:`demo-label`},`large`,-1)])]),o(`div`,ve,[u(e,{code:Ue,language:`vue`,title:`示例代码`})])]),o(`section`,ye,[r[33]||=o(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),o(`div`,be,[o(`div`,xe,[u(t(d),{modelValue:P.value,"onUpdate:modelValue":r[4]||=e=>P.value=e,theme:`primary`},null,8,[`modelValue`]),r[29]||=o(`span`,{class:`demo-label`},`primary`,-1)]),o(`div`,Se,[u(t(d),{modelValue:F.value,"onUpdate:modelValue":r[5]||=e=>F.value=e,theme:`success`},null,8,[`modelValue`]),r[30]||=o(`span`,{class:`demo-label`},`success`,-1)]),o(`div`,Ce,[u(t(d),{modelValue:I.value,"onUpdate:modelValue":r[6]||=e=>I.value=e,theme:`warning`},null,8,[`modelValue`]),r[31]||=o(`span`,{class:`demo-label`},`warning`,-1)]),o(`div`,we,[u(t(d),{modelValue:L.value,"onUpdate:modelValue":r[7]||=e=>L.value=e,theme:`danger`},null,8,[`modelValue`]),r[32]||=o(`span`,{class:`demo-label`},`danger`,-1)])]),o(`div`,f,[u(e,{code:We,language:`vue`,title:`示例代码`})])]),o(`section`,p,[r[34]||=o(`h2`,{class:`component-demo-view__section-title`},`带文字描述`,-1),o(`div`,m,[u(t(d),{modelValue:R.value,"onUpdate:modelValue":r[8]||=e=>R.value=e,"active-text":`开启`,"inactive-text":`关闭`},null,8,[`modelValue`]),u(t(d),{modelValue:z.value,"onUpdate:modelValue":r[9]||=e=>z.value=e,"active-text":`ON`,"inactive-text":`OFF`,theme:`success`},null,8,[`modelValue`]),u(t(d),{modelValue:B.value,"onUpdate:modelValue":r[10]||=e=>B.value=e,"active-text":`已启用`,"inactive-text":`已禁用`,size:`large`},null,8,[`modelValue`])]),o(`div`,h,[u(e,{code:Ge,language:`vue`,title:`示例代码`})])]),o(`section`,g,[r[37]||=o(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),o(`div`,_,[o(`div`,v,[u(t(d),{modelValue:V.value,"onUpdate:modelValue":r[11]||=e=>V.value=e,disabled:``},null,8,[`modelValue`]),r[35]||=o(`span`,{class:`demo-label`},`禁用-开启`,-1)]),o(`div`,y,[u(t(d),{modelValue:H.value,"onUpdate:modelValue":r[12]||=e=>H.value=e,disabled:``},null,8,[`modelValue`]),r[36]||=o(`span`,{class:`demo-label`},`禁用-关闭`,-1)])]),o(`div`,b,[u(e,{code:Ke,language:`vue`,title:`示例代码`})])]),o(`section`,x,[r[40]||=o(`h2`,{class:`component-demo-view__section-title`},`加载状态`,-1),o(`div`,S,[o(`div`,C,[u(t(d),{modelValue:U.value,"onUpdate:modelValue":r[13]||=e=>U.value=e,loading:``},null,8,[`modelValue`]),r[38]||=o(`span`,{class:`demo-label`},`加载中-开启`,-1)]),o(`div`,w,[u(t(d),{modelValue:W.value,"onUpdate:modelValue":r[14]||=e=>W.value=e,loading:``},null,8,[`modelValue`]),r[39]||=o(`span`,{class:`demo-label`},`加载中-关闭`,-1)])]),o(`div`,T,[u(e,{code:qe,language:`vue`,title:`示例代码`})])]),o(`section`,E,[r[44]||=o(`h2`,{class:`component-demo-view__section-title`},`自定义颜色`,-1),o(`div`,D,[o(`div`,O,[u(t(d),{modelValue:G.value,"onUpdate:modelValue":r[15]||=e=>G.value=e,"active-color":`#8B5CF6`,"inactive-color":`#E5E7EB`},null,8,[`modelValue`]),r[41]||=o(`span`,{class:`demo-label`},`紫色主题`,-1)]),o(`div`,k,[u(t(d),{modelValue:K.value,"onUpdate:modelValue":r[16]||=e=>K.value=e,"active-color":`#F59E0B`,"inactive-color":`#D1D5DB`},null,8,[`modelValue`]),r[42]||=o(`span`,{class:`demo-label`},`橙色主题`,-1)]),o(`div`,Te,[u(t(d),{modelValue:q.value,"onUpdate:modelValue":r[17]||=e=>q.value=e,"active-color":`#EC4899`,"inactive-color":`#E5E7EB`},null,8,[`modelValue`]),r[43]||=o(`span`,{class:`demo-label`},`粉色主题`,-1)])]),o(`div`,Ee,[u(e,{code:Je,language:`vue`,title:`示例代码`})])]),o(`section`,De,[r[46]||=o(`h2`,{class:`component-demo-view__section-title`},`异步操作`,-1),o(`div`,Oe,[r[45]||=o(`p`,{style:{margin:`0`,color:`var(--color-text-secondary)`}},` 点击开关会模拟异步请求，请求期间显示 loading 状态 `,-1),u(t(d),{modelValue:J.value,"onUpdate:modelValue":r[18]||=e=>J.value=e,loading:Y.value,"active-text":`已连接`,"inactive-text":`已断开`,onChange:Qe},null,8,[`modelValue`,`loading`]),X.value?(s(),l(`p`,{key:0,class:te([`async-message`,J.value?`success`:`info`])},n(X.value),3)):a(``,!0)]),o(`div`,ke,[u(e,{code:Ye,language:`vue`,title:`示例代码`})])]),o(`section`,Ae,[r[52]||=o(`h2`,{class:`component-demo-view__section-title`},`表单应用`,-1),o(`div`,je,[o(`div`,Me,[o(`div`,Ne,[r[47]||=o(`span`,{class:`form-label`},`消息通知：`,-1),u(t(d),{modelValue:Z.notifications,"onUpdate:modelValue":r[19]||=e=>Z.notifications=e,"active-text":`开启`,"inactive-text":`关闭`},null,8,[`modelValue`])]),o(`div`,Pe,[r[48]||=o(`span`,{class:`form-label`},`自动保存：`,-1),u(t(d),{modelValue:Z.autoSave,"onUpdate:modelValue":r[20]||=e=>Z.autoSave=e,theme:`success`},null,8,[`modelValue`])]),o(`div`,Fe,[r[49]||=o(`span`,{class:`form-label`},`夜间模式：`,-1),u(t(d),{modelValue:Z.darkMode,"onUpdate:modelValue":r[21]||=e=>Z.darkMode=e,theme:`warning`},null,8,[`modelValue`])]),o(`div`,A,[r[50]||=o(`span`,{class:`form-label`},`隐私模式：`,-1),u(t(d),{modelValue:Z.privacy,"onUpdate:modelValue":r[22]||=e=>Z.privacy=e,theme:`danger`},null,8,[`modelValue`])]),o(`div`,Ie,[r[51]||=o(`p`,null,`表单数据：`,-1),o(`pre`,null,n(JSON.stringify(Z,null,2)),1)])])]),o(`div`,Le,[u(e,{code:Xe,language:`vue`,title:`示例代码`})])]),o(`section`,Re,[r[55]||=o(`h2`,{class:`component-demo-view__section-title`},`事件监听`,-1),o(`div`,ze,[u(t(d),{modelValue:Q.value,"onUpdate:modelValue":r[23]||=e=>Q.value=e,"active-text":`开启`,"inactive-text":`关闭`,onChange:$e,onClick:et},null,8,[`modelValue`]),o(`div`,Be,[r[54]||=o(`p`,null,`事件记录：`,-1),o(`ul`,null,[(s(!0),l(ie,null,ne($.value,(e,t)=>(s(),l(`li`,{key:t,class:`event-log-item`},n(e),1))),128))]),$.value.length>0?(s(),ae(t(se),{key:0,size:`small`,onClick:tt},{default:oe(()=>[...r[53]||=[re(` 清空记录 `,-1)]]),_:1})):a(``,!0)])]),o(`div`,Ve,[u(e,{code:Ze,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-4d4d4a0d`]]);export{j as default};
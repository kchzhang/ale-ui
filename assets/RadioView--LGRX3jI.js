import{B as e,C as ee,K as t,M as n,S as r,W as i,Y as a,g as o,h as te,i as s,v as ne,x as c,y as l}from"./index-B3Jx3uix.js";import{t as u}from"./button-GOPf8Q2w.js";import{n as d,t as f}from"./radio-Co0bdh7C.js";import{t as p}from"./CodeBlock-CE4Cu_o1.js";var re={class:`component-demo-view`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},oe={class:`component-demo-view__result`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo`},ue={class:`component-demo-view__code`},de={class:`component-demo-view__section`},fe={class:`component-demo-view__demo`},pe={class:`component-demo-view__code`},m={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},g={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},y={style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},b={class:`component-demo-view__code`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},E={style:{display:`flex`,gap:`8px`,"margin-bottom":`12px`}},D={style:{margin:`12px 0 0 0`,color:`var(--color-text-secondary)`}},O={class:`component-demo-view__code`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},j={style:{margin:`12px 0 0 0`,color:`var(--color-text-secondary)`}},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},F={key:0,style:{color:`var(--color-success)`,margin:`12px 0 0 0`}},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},z={class:`form-demo`},B={class:`form-item`},me={class:`form-item`},he={class:`form-result`},ge={class:`component-demo-view__code`},_e=`<template>
  <AleRadio v-model="value" value="option1">选项一</AleRadio>
  <AleRadio v-model="value" value="option2">选项二</AleRadio>
  <AleRadio v-model="value" value="option3" label="选项三" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('option1');
<\/script>`,ve=`<template>
  <AleRadio v-model="value" value="small" size="small">小型</AleRadio>
  <AleRadio v-model="value" value="medium" size="medium">中型</AleRadio>
  <AleRadio v-model="value" value="large" size="large">大型</AleRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('medium');
<\/script>`,ye=`<template>
  <AleRadio v-model="value" value="primary" theme="primary">主要</AleRadio>
  <AleRadio v-model="value" value="success" theme="success">成功</AleRadio>
  <AleRadio v-model="value" value="warning" theme="warning">警告</AleRadio>
  <AleRadio v-model="value" value="danger" theme="danger">危险</AleRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('primary');
<\/script>`,be=`<template>
  <AleRadio v-model="value" value="option1" disabled>禁用选中</AleRadio>
  <AleRadio v-model="value" value="option2" disabled>禁用未选中</AleRadio>
  <AleRadio v-model="value" value="option3" readonly>只读选中</AleRadio>
  <AleRadio v-model="value" value="option4" readonly>只读未选中</AleRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('option1');
<\/script>`,xe=`<template>
  <p>选中的值: {{ groupValue }}</p>
  <AleRadioGroup v-model="groupValue" :options="groupOptions" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const groupValue = ref('apple');
const groupOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];
<\/script>`,Se=`<template>
  <AleRadioGroup v-model="value" direction="vertical" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const value = ref('option1');
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
];
<\/script>`,Ce=`<template>
  <div>
    <AleButton type="primary" size="small" @click="handleSelectFirst">
      选择第一个
    </AleButton>
    <AleButton size="small" @click="handleSelectLast">
      选择最后一个
    </AleButton>
    <AleButton size="small" @click="handleClear">
      清空选择
    </AleButton>
  </div>
  <AleRadioGroup ref="groupRef" v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup, AleButton } from 'ale-ui';

const groupRef = ref<InstanceType<typeof AleRadioGroup>>();
const value = ref<string>('');
const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
];

const handleSelectFirst = () => groupRef.value?.selectFirst();
const handleSelectLast = () => groupRef.value?.selectLast();
const handleClear = () => groupRef.value?.clear();
<\/script>`,we=`<template>
  <AleRadioGroup v-model="value" theme="success" size="large">
    <AleRadio value="beijing">北京</AleRadio>
    <AleRadio value="shanghai">上海</AleRadio>
    <AleRadio value="guangzhou" disabled>广州（禁用）</AleRadio>
    <AleRadio value="shenzhen">深圳</AleRadio>
  </AleRadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio, AleRadioGroup } from 'ale-ui';

const value = ref('beijing');
<\/script>`,Te=`<template>
  <p>请选择支付方式：</p>
  <AleRadioGroup v-model="payment" :options="options" @change="handleChange" />
  <p v-if="payment">您选择了: {{ paymentLabel }}</p>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const payment = ref('');
const options = [
  { label: '支付宝', value: 'alipay' },
  { label: '微信支付', value: 'wechat' },
  { label: '银行卡', value: 'card' },
  { label: '货到付款', value: 'cod' }
];

const paymentLabel = computed(() => {
  const option = options.find(opt => opt.value === payment.value);
  return option?.label || '';
});

const handleChange = (value: string) => {
  console.log('支付方式:', value);
};
<\/script>`,Ee=`<template>
  <div class="form-demo">
    <div class="form-item">
      <label>性别：</label>
      <AleRadioGroup v-model="formData.gender" :options="genderOptions" />
    </div>
    <div class="form-item">
      <label>学历：</label>
      <AleRadioGroup v-model="formData.education" :options="educationOptions" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const formData = ref({
  gender: 'male',
  education: 'bachelor'
});

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
];

const educationOptions = [
  { label: '高中及以下', value: 'high-school' },
  { label: '大专', value: 'college' },
  { label: '本科', value: 'bachelor' },
  { label: '硕士及以上', value: 'master' }
];
<\/script>`,V=s(ee({__name:`RadioView`,setup(ee){let s=i(`option1`),V=i(`medium`),H=i(`primary`),U=i(`option1`),W=i(`apple`),G=[{label:`苹果`,value:`apple`},{label:`香蕉`,value:`banana`},{label:`橙子`,value:`orange`},{label:`葡萄`,value:`grape`}],K=i(`option1`),q=i(),J=i(``),De=[{label:`北京`,value:`beijing`},{label:`上海`,value:`shanghai`},{label:`广州`,value:`guangzhou`},{label:`深圳`,value:`shenzhen`},{label:`杭州`,value:`hangzhou`}],Oe=()=>{q.value?.selectFirst()},ke=()=>{q.value?.selectLast()},Ae=()=>{q.value?.clear()},Y=i(`beijing`),X=i(``),Z=[{label:`支付宝`,value:`alipay`},{label:`微信支付`,value:`wechat`},{label:`银行卡`,value:`card`},{label:`货到付款`,value:`cod`}],je=te(()=>Z.find(e=>e.value===X.value)?.label||``),Q=e=>{console.log(`支付方式:`,e)},$=i({gender:`male`,education:`bachelor`}),Me=[{label:`男`,value:`male`},{label:`女`,value:`female`}],Ne=[{label:`高中及以下`,value:`high-school`},{label:`大专`,value:`college`},{label:`本科`,value:`bachelor`},{label:`硕士及以上`,value:`master`}];return(ee,i)=>(n(),l(`div`,re,[i[56]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Radio 单选框`),o(`p`,{class:`component-demo-view__description`},` 单选框用于在一组互斥的选项中选择一项 `)],-1),o(`section`,ie,[i[23]||=o(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),o(`div`,ae,[r(t(d),{modelValue:s.value,"onUpdate:modelValue":i[0]||=e=>s.value=e,value:`option1`},{default:e(()=>[...i[21]||=[c(`选项一`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:s.value,"onUpdate:modelValue":i[1]||=e=>s.value=e,value:`option2`},{default:e(()=>[...i[22]||=[c(`选项二`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:s.value,"onUpdate:modelValue":i[2]||=e=>s.value=e,value:`option3`,label:`选项三`},null,8,[`modelValue`])]),o(`p`,oe,`当前选中: `+a(s.value),1),o(`div`,se,[r(p,{code:_e,language:`vue`,title:`示例代码`})])]),o(`section`,ce,[i[27]||=o(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),o(`div`,le,[r(t(d),{modelValue:V.value,"onUpdate:modelValue":i[3]||=e=>V.value=e,value:`small`,size:`small`},{default:e(()=>[...i[24]||=[c(`小型`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:V.value,"onUpdate:modelValue":i[4]||=e=>V.value=e,value:`medium`,size:`medium`},{default:e(()=>[...i[25]||=[c(`中型`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:V.value,"onUpdate:modelValue":i[5]||=e=>V.value=e,value:`large`,size:`large`},{default:e(()=>[...i[26]||=[c(`大型`,-1)]]),_:1},8,[`modelValue`])]),o(`div`,ue,[r(p,{code:ve,language:`vue`,title:`示例代码`})])]),o(`section`,de,[i[32]||=o(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),o(`div`,fe,[r(t(d),{modelValue:H.value,"onUpdate:modelValue":i[6]||=e=>H.value=e,value:`primary`,theme:`primary`},{default:e(()=>[...i[28]||=[c(`主要`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:H.value,"onUpdate:modelValue":i[7]||=e=>H.value=e,value:`success`,theme:`success`},{default:e(()=>[...i[29]||=[c(`成功`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:H.value,"onUpdate:modelValue":i[8]||=e=>H.value=e,value:`warning`,theme:`warning`},{default:e(()=>[...i[30]||=[c(`警告`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:H.value,"onUpdate:modelValue":i[9]||=e=>H.value=e,value:`danger`,theme:`danger`},{default:e(()=>[...i[31]||=[c(`危险`,-1)]]),_:1},8,[`modelValue`])]),o(`div`,pe,[r(p,{code:ye,language:`vue`,title:`示例代码`})])]),o(`section`,m,[i[37]||=o(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),o(`div`,h,[r(t(d),{modelValue:U.value,"onUpdate:modelValue":i[10]||=e=>U.value=e,value:`option1`,disabled:``},{default:e(()=>[...i[33]||=[c(`禁用选中`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:U.value,"onUpdate:modelValue":i[11]||=e=>U.value=e,value:`option2`,disabled:``},{default:e(()=>[...i[34]||=[c(`禁用未选中`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:U.value,"onUpdate:modelValue":i[12]||=e=>U.value=e,value:`option3`,readonly:``},{default:e(()=>[...i[35]||=[c(`只读选中`,-1)]]),_:1},8,[`modelValue`]),r(t(d),{modelValue:U.value,"onUpdate:modelValue":i[13]||=e=>U.value=e,value:`option4`,readonly:``},{default:e(()=>[...i[36]||=[c(`只读未选中`,-1)]]),_:1},8,[`modelValue`])]),o(`div`,g,[r(p,{code:be,language:`vue`,title:`示例代码`})])]),o(`section`,_,[i[38]||=o(`h2`,{class:`component-demo-view__section-title`},`单选框组`,-1),o(`div`,v,[o(`p`,y,`选中的值: `+a(W.value),1),r(t(f),{modelValue:W.value,"onUpdate:modelValue":i[14]||=e=>W.value=e,options:G},null,8,[`modelValue`])]),o(`div`,b,[r(p,{code:xe,language:`vue`,title:`示例代码`})])]),o(`section`,x,[i[39]||=o(`h2`,{class:`component-demo-view__section-title`},`垂直排列`,-1),o(`div`,S,[r(t(f),{modelValue:K.value,"onUpdate:modelValue":i[15]||=e=>K.value=e,direction:`vertical`,options:G},null,8,[`modelValue`])]),o(`div`,C,[r(p,{code:Se,language:`vue`,title:`示例代码`})])]),o(`section`,w,[i[43]||=o(`h2`,{class:`component-demo-view__section-title`},`按钮控制`,-1),o(`div`,T,[o(`div`,E,[r(t(u),{type:`primary`,size:`small`,onClick:Oe},{default:e(()=>[...i[40]||=[c(`选择第一个`,-1)]]),_:1}),r(t(u),{size:`small`,onClick:ke},{default:e(()=>[...i[41]||=[c(`选择最后一个`,-1)]]),_:1}),r(t(u),{size:`small`,onClick:Ae},{default:e(()=>[...i[42]||=[c(`清空选择`,-1)]]),_:1})]),r(t(f),{ref_key:`groupRef`,ref:q,modelValue:J.value,"onUpdate:modelValue":i[16]||=e=>J.value=e,options:De},null,8,[`modelValue`]),o(`p`,D,`当前选中: `+a(J.value||`无`),1)]),o(`div`,O,[r(p,{code:Ce,language:`vue`,title:`示例代码`})])]),o(`section`,k,[i[49]||=o(`h2`,{class:`component-demo-view__section-title`},`组合使用`,-1),o(`div`,A,[i[48]||=o(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},`使用 slot 自定义单选框组内容`,-1),r(t(f),{modelValue:Y.value,"onUpdate:modelValue":i[17]||=e=>Y.value=e,theme:`success`,size:`large`},{default:e(()=>[r(t(d),{value:`beijing`},{default:e(()=>[...i[44]||=[c(`北京`,-1)]]),_:1}),r(t(d),{value:`shanghai`},{default:e(()=>[...i[45]||=[c(`上海`,-1)]]),_:1}),r(t(d),{value:`guangzhou`,disabled:``},{default:e(()=>[...i[46]||=[c(`广州（禁用）`,-1)]]),_:1}),r(t(d),{value:`shenzhen`},{default:e(()=>[...i[47]||=[c(`深圳`,-1)]]),_:1})]),_:1},8,[`modelValue`]),o(`p`,j,`当前选中: `+a(Y.value),1)]),o(`div`,M,[r(p,{code:we,language:`vue`,title:`示例代码`})])]),o(`section`,N,[i[51]||=o(`h2`,{class:`component-demo-view__section-title`},`交互示例`,-1),o(`div`,P,[i[50]||=o(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},`请选择支付方式：`,-1),r(t(f),{modelValue:X.value,"onUpdate:modelValue":i[18]||=e=>X.value=e,options:Z,onChange:Q},null,8,[`modelValue`]),X.value?(n(),l(`p`,F,` 您选择了: `+a(je.value),1)):ne(``,!0)]),o(`div`,I,[r(p,{code:Te,language:`vue`,title:`示例代码`})])]),o(`section`,L,[i[55]||=o(`h2`,{class:`component-demo-view__section-title`},`表单应用`,-1),o(`div`,R,[o(`div`,z,[o(`div`,B,[i[52]||=o(`label`,{class:`form-label`},`性别：`,-1),r(t(f),{modelValue:$.value.gender,"onUpdate:modelValue":i[19]||=e=>$.value.gender=e,options:Me},null,8,[`modelValue`])]),o(`div`,me,[i[53]||=o(`label`,{class:`form-label`},`学历：`,-1),r(t(f),{modelValue:$.value.education,"onUpdate:modelValue":i[20]||=e=>$.value.education=e,options:Ne,size:`small`},null,8,[`modelValue`])]),o(`div`,he,[i[54]||=o(`p`,null,`表单数据：`,-1),o(`pre`,null,a(JSON.stringify($.value,null,2)),1)])])]),o(`div`,ge,[r(p,{code:Ee,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-42715502`]]);export{V as default};
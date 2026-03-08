import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,S as ee,U as r,_ as te,b as i,h as a,j as o,m as ne,r as s,v as c,x as l,z as u}from"./index-D6beBo5R.js";import{t as d}from"./button-CbFeg90j.js";import{n as f,t as p}from"./radio-Cmz2JtJ6.js";var re={class:`component-demo-view`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},oe={class:`component-demo-view__result`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo`},ue={class:`component-demo-view__code`},de={class:`component-demo-view__section`},fe={class:`component-demo-view__demo`},pe={class:`component-demo-view__code`},m={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},g={class:`component-demo-view__code`},_={class:`component-demo-view__section`},v={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},y={style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},b={class:`component-demo-view__code`},x={class:`component-demo-view__section`},S={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},C={class:`component-demo-view__code`},w={class:`component-demo-view__section`},T={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},E={style:{display:`flex`,gap:`8px`,"margin-bottom":`12px`}},D={style:{margin:`12px 0 0 0`,color:`var(--color-text-secondary)`}},O={class:`component-demo-view__code`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},j={style:{margin:`12px 0 0 0`,color:`var(--color-text-secondary)`}},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},F={key:0,style:{color:`var(--color-success)`,margin:`12px 0 0 0`}},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},z={class:`form-demo`},B={class:`form-item`},me={class:`form-item`},he={class:`form-result`},ge={class:`component-demo-view__code`},_e=`<template>
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
<\/script>`,V=s(ee({__name:`RadioView`,setup(ee){let s=r(`option1`),V=r(`medium`),H=r(`primary`),U=r(`option1`),W=r(`apple`),G=[{label:`苹果`,value:`apple`},{label:`香蕉`,value:`banana`},{label:`橙子`,value:`orange`},{label:`葡萄`,value:`grape`}],K=r(`option1`),q=r(),J=r(``),De=[{label:`北京`,value:`beijing`},{label:`上海`,value:`shanghai`},{label:`广州`,value:`guangzhou`},{label:`深圳`,value:`shenzhen`},{label:`杭州`,value:`hangzhou`}],Oe=()=>{q.value?.selectFirst()},ke=()=>{q.value?.selectLast()},Ae=()=>{q.value?.clear()},Y=r(`beijing`),X=r(``),Z=[{label:`支付宝`,value:`alipay`},{label:`微信支付`,value:`wechat`},{label:`银行卡`,value:`card`},{label:`货到付款`,value:`cod`}],je=ne(()=>Z.find(e=>e.value===X.value)?.label||``),Q=e=>{console.log(`支付方式:`,e)},$=r({gender:`male`,education:`bachelor`}),Me=[{label:`男`,value:`male`},{label:`女`,value:`female`}],Ne=[{label:`高中及以下`,value:`high-school`},{label:`大专`,value:`college`},{label:`本科`,value:`bachelor`},{label:`硕士及以上`,value:`master`}];return(ee,r)=>(o(),c(`div`,re,[r[56]||=a(`div`,{class:`component-demo-view__header`},[a(`h1`,{class:`component-demo-view__title`},`Radio 单选框`),a(`p`,{class:`component-demo-view__description`},` 单选框用于在一组互斥的选项中选择一项 `)],-1),a(`section`,ie,[r[23]||=a(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),a(`div`,ae,[l(t(f),{modelValue:s.value,"onUpdate:modelValue":r[0]||=e=>s.value=e,value:`option1`},{default:u(()=>[...r[21]||=[i(`选项一`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:s.value,"onUpdate:modelValue":r[1]||=e=>s.value=e,value:`option2`},{default:u(()=>[...r[22]||=[i(`选项二`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:s.value,"onUpdate:modelValue":r[2]||=e=>s.value=e,value:`option3`,label:`选项三`},null,8,[`modelValue`])]),a(`p`,oe,`当前选中: `+n(s.value),1),a(`div`,se,[l(e,{code:_e,language:`vue`,title:`示例代码`})])]),a(`section`,ce,[r[27]||=a(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),a(`div`,le,[l(t(f),{modelValue:V.value,"onUpdate:modelValue":r[3]||=e=>V.value=e,value:`small`,size:`small`},{default:u(()=>[...r[24]||=[i(`小型`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:V.value,"onUpdate:modelValue":r[4]||=e=>V.value=e,value:`medium`,size:`medium`},{default:u(()=>[...r[25]||=[i(`中型`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:V.value,"onUpdate:modelValue":r[5]||=e=>V.value=e,value:`large`,size:`large`},{default:u(()=>[...r[26]||=[i(`大型`,-1)]]),_:1},8,[`modelValue`])]),a(`div`,ue,[l(e,{code:ve,language:`vue`,title:`示例代码`})])]),a(`section`,de,[r[32]||=a(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),a(`div`,fe,[l(t(f),{modelValue:H.value,"onUpdate:modelValue":r[6]||=e=>H.value=e,value:`primary`,theme:`primary`},{default:u(()=>[...r[28]||=[i(`主要`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:H.value,"onUpdate:modelValue":r[7]||=e=>H.value=e,value:`success`,theme:`success`},{default:u(()=>[...r[29]||=[i(`成功`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:H.value,"onUpdate:modelValue":r[8]||=e=>H.value=e,value:`warning`,theme:`warning`},{default:u(()=>[...r[30]||=[i(`警告`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:H.value,"onUpdate:modelValue":r[9]||=e=>H.value=e,value:`danger`,theme:`danger`},{default:u(()=>[...r[31]||=[i(`危险`,-1)]]),_:1},8,[`modelValue`])]),a(`div`,pe,[l(e,{code:ye,language:`vue`,title:`示例代码`})])]),a(`section`,m,[r[37]||=a(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),a(`div`,h,[l(t(f),{modelValue:U.value,"onUpdate:modelValue":r[10]||=e=>U.value=e,value:`option1`,disabled:``},{default:u(()=>[...r[33]||=[i(`禁用选中`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:U.value,"onUpdate:modelValue":r[11]||=e=>U.value=e,value:`option2`,disabled:``},{default:u(()=>[...r[34]||=[i(`禁用未选中`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:U.value,"onUpdate:modelValue":r[12]||=e=>U.value=e,value:`option3`,readonly:``},{default:u(()=>[...r[35]||=[i(`只读选中`,-1)]]),_:1},8,[`modelValue`]),l(t(f),{modelValue:U.value,"onUpdate:modelValue":r[13]||=e=>U.value=e,value:`option4`,readonly:``},{default:u(()=>[...r[36]||=[i(`只读未选中`,-1)]]),_:1},8,[`modelValue`])]),a(`div`,g,[l(e,{code:be,language:`vue`,title:`示例代码`})])]),a(`section`,_,[r[38]||=a(`h2`,{class:`component-demo-view__section-title`},`单选框组`,-1),a(`div`,v,[a(`p`,y,`选中的值: `+n(W.value),1),l(t(p),{modelValue:W.value,"onUpdate:modelValue":r[14]||=e=>W.value=e,options:G},null,8,[`modelValue`])]),a(`div`,b,[l(e,{code:xe,language:`vue`,title:`示例代码`})])]),a(`section`,x,[r[39]||=a(`h2`,{class:`component-demo-view__section-title`},`垂直排列`,-1),a(`div`,S,[l(t(p),{modelValue:K.value,"onUpdate:modelValue":r[15]||=e=>K.value=e,direction:`vertical`,options:G},null,8,[`modelValue`])]),a(`div`,C,[l(e,{code:Se,language:`vue`,title:`示例代码`})])]),a(`section`,w,[r[43]||=a(`h2`,{class:`component-demo-view__section-title`},`按钮控制`,-1),a(`div`,T,[a(`div`,E,[l(t(d),{type:`primary`,size:`small`,onClick:Oe},{default:u(()=>[...r[40]||=[i(`选择第一个`,-1)]]),_:1}),l(t(d),{size:`small`,onClick:ke},{default:u(()=>[...r[41]||=[i(`选择最后一个`,-1)]]),_:1}),l(t(d),{size:`small`,onClick:Ae},{default:u(()=>[...r[42]||=[i(`清空选择`,-1)]]),_:1})]),l(t(p),{ref_key:`groupRef`,ref:q,modelValue:J.value,"onUpdate:modelValue":r[16]||=e=>J.value=e,options:De},null,8,[`modelValue`]),a(`p`,D,`当前选中: `+n(J.value||`无`),1)]),a(`div`,O,[l(e,{code:Ce,language:`vue`,title:`示例代码`})])]),a(`section`,k,[r[49]||=a(`h2`,{class:`component-demo-view__section-title`},`组合使用`,-1),a(`div`,A,[r[48]||=a(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},`使用 slot 自定义单选框组内容`,-1),l(t(p),{modelValue:Y.value,"onUpdate:modelValue":r[17]||=e=>Y.value=e,theme:`success`,size:`large`},{default:u(()=>[l(t(f),{value:`beijing`},{default:u(()=>[...r[44]||=[i(`北京`,-1)]]),_:1}),l(t(f),{value:`shanghai`},{default:u(()=>[...r[45]||=[i(`上海`,-1)]]),_:1}),l(t(f),{value:`guangzhou`,disabled:``},{default:u(()=>[...r[46]||=[i(`广州（禁用）`,-1)]]),_:1}),l(t(f),{value:`shenzhen`},{default:u(()=>[...r[47]||=[i(`深圳`,-1)]]),_:1})]),_:1},8,[`modelValue`]),a(`p`,j,`当前选中: `+n(Y.value),1)]),a(`div`,M,[l(e,{code:we,language:`vue`,title:`示例代码`})])]),a(`section`,N,[r[51]||=a(`h2`,{class:`component-demo-view__section-title`},`交互示例`,-1),a(`div`,P,[r[50]||=a(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},`请选择支付方式：`,-1),l(t(p),{modelValue:X.value,"onUpdate:modelValue":r[18]||=e=>X.value=e,options:Z,onChange:Q},null,8,[`modelValue`]),X.value?(o(),c(`p`,F,` 您选择了: `+n(je.value),1)):te(``,!0)]),a(`div`,I,[l(e,{code:Te,language:`vue`,title:`示例代码`})])]),a(`section`,L,[r[55]||=a(`h2`,{class:`component-demo-view__section-title`},`表单应用`,-1),a(`div`,R,[a(`div`,z,[a(`div`,B,[r[52]||=a(`label`,{class:`form-label`},`性别：`,-1),l(t(p),{modelValue:$.value.gender,"onUpdate:modelValue":r[19]||=e=>$.value.gender=e,options:Me},null,8,[`modelValue`])]),a(`div`,me,[r[53]||=a(`label`,{class:`form-label`},`学历：`,-1),l(t(p),{modelValue:$.value.education,"onUpdate:modelValue":r[20]||=e=>$.value.education=e,options:Ne,size:`small`},null,8,[`modelValue`])]),a(`div`,he,[r[54]||=a(`p`,null,`表单数据：`,-1),a(`pre`,null,n(JSON.stringify($.value,null,2)),1)])])]),a(`div`,ge,[l(e,{code:Ee,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-42715502`]]);export{V as default};
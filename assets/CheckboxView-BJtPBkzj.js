import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,N as r,S as ee,U as i,_ as te,b as a,f as ne,g as re,h as o,j as s,r as c,v as l,x as u,z as d}from"./index-D6beBo5R.js";import{t as f}from"./button-CbFeg90j.js";import"./Checkbox-D12jTAwt.js";import{n as p,t as m}from"./checkbox-iwRIBZgQ.js";var ie={class:`component-demo-view`},ae={class:`component-demo-view__section`},oe={class:`component-demo-view__demo`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo`},ue={class:`component-demo-view__code`},de={class:`component-demo-view__section`},fe={class:`component-demo-view__demo`},pe={class:`component-demo-view__code`},me={class:`component-demo-view__section`},he={class:`component-demo-view__demo`},ge={class:`component-demo-view__code`},h={class:`component-demo-view__section`},g={class:`component-demo-view__demo`},_={style:{"margin-left":`24px`,"margin-top":`8px`}},v={class:`component-demo-view__code`},y={class:`component-demo-view__section`},b={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},x={style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},S={class:`component-demo-view__code`},C={class:`component-demo-view__section`},w={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},T={style:{display:`flex`,gap:`8px`,"margin-bottom":`12px`}},E={style:{margin:`12px 0 0 0`,color:`var(--color-text-secondary)`}},D={class:`component-demo-view__code`},O={class:`component-demo-view__section`},k={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},A={class:`component-demo-view__code`},j={class:`component-demo-view__section`},M={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},N={class:`component-demo-view__code`},P={class:`component-demo-view__section`},F={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},I={key:0,style:{color:`var(--color-success)`,margin:`8px 0 0 0`}},L={class:`component-demo-view__code`},_e=`<template>
  <AleCheckbox v-model="checked1">选项一</AleCheckbox>
  <AleCheckbox v-model="checked2">选项二</AleCheckbox>
  <AleCheckbox v-model="checked3" label="选项三" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(true);
<\/script>`,ve=`<template>
  <AleCheckbox v-model="checked" size="small">小型</AleCheckbox>
  <AleCheckbox v-model="checked" size="medium">中型</AleCheckbox>
  <AleCheckbox v-model="checked" size="large">大型</AleCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked = ref(true);
<\/script>`,ye=`<template>
  <AleCheckbox v-model="checked" theme="primary">主要</AleCheckbox>
  <AleCheckbox v-model="checked" theme="success">成功</AleCheckbox>
  <AleCheckbox v-model="checked" theme="warning">警告</AleCheckbox>
  <AleCheckbox v-model="checked" theme="danger">危险</AleCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked = ref(true);
<\/script>`,be=`<template>
  <AleCheckbox v-model="checked" disabled>禁用选中</AleCheckbox>
  <AleCheckbox :model-value="false" disabled>禁用未选中</AleCheckbox>
  <AleCheckbox v-model="checked" readonly>只读选中</AleCheckbox>
  <AleCheckbox :model-value="false" readonly>只读未选中</AleCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked = ref(true);
<\/script>`,xe=`<template>
  <AleCheckbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
    全选
  </AleCheckbox>
  <div style="margin-left: 24px;">
    <AleCheckbox v-for="city in cities" :key="city.value" v-model="city.checked" @change="handleCityChange">
      {{ city.label }}
    </AleCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checkAll = ref(false);
const isIndeterminate = ref(false);
const cities = ref([
  { label: '北京', value: 'beijing', checked: false },
  { label: '上海', value: 'shanghai', checked: false },
  { label: '广州', value: 'guangzhou', checked: false },
  { label: '深圳', value: 'shenzhen', checked: false }
]);

const handleCityChange = () => {
  const checkedCount = cities.value.filter(item => item.checked).length;
  checkAll.value = checkedCount === cities.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length;
};

const handleCheckAllChange = (value: boolean) => {
  cities.value.forEach(item => item.checked = value);
  isIndeterminate.value = false;
};
<\/script>`,Se=`<template>
  <p>选中的值: {{ groupValue }}</p>
  <AleCheckboxGroup v-model="groupValue" :options="groupOptions" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup } from 'ale-ui';

const groupValue = ref(['apple', 'banana']);
const groupOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];
<\/script>`,Ce=`<template>
  <div>
    <AleButton type="primary" size="small" @click="handleSelectAll">
      全选
    </AleButton>
    <AleButton size="small" @click="handleUnselectAll">
      取消全选
    </AleButton>
    <AleButton size="small" @click="handleToggleAll">
      反选
    </AleButton>
  </div>
  <AleCheckboxGroup ref="groupRef" v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup, AleButton } from 'ale-ui';

const groupRef = ref<InstanceType<typeof AleCheckboxGroup>>();
const value = ref<string[]>(['beijing']);
const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
];

const handleSelectAll = () => groupRef.value?.selectAll();
const handleUnselectAll = () => groupRef.value?.unselectAll();
const handleToggleAll = () => groupRef.value?.toggleAll();
<\/script>`,we=`<template>
  <AleCheckboxGroup v-model="value" direction="vertical" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup } from 'ale-ui';

const value = ref(['option1']);
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
];
<\/script>`,Te=`<template>
  <p>最少选1个，最多选3个</p>
  <AleCheckboxGroup v-model="value" :options="options" :min="1" :max="3" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup } from 'ale-ui';

const value = ref(['apple']);
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];
<\/script>`,Ee=`<template>
  <AleCheckbox v-model="agreement" @change="handleChange">
    我已阅读并同意《用户协议》
  </AleCheckbox>
  <p v-if="agreement" style="color: var(--color-success);">
    感谢你的同意！
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const agreement = ref(false);

const handleChange = (value: boolean) => {
  console.log('协议状态:', value);
};
<\/script>`,R=c(ee({__name:`CheckboxView`,setup(ee){let c=i(!0),R=i(!1),z=i(!0),B=i(!0),V=i(!0),H=i(!0),U=i(!1),W=i(!1),G=i([{label:`北京`,value:`beijing`,checked:!1},{label:`上海`,value:`shanghai`,checked:!1},{label:`广州`,value:`guangzhou`,checked:!1},{label:`深圳`,value:`shenzhen`,checked:!1}]),De=()=>{let e=G.value.filter(e=>e.checked).length;W.value=e>0&&e<G.value.length,U.value=W.value||e===0&&W.value},Oe=e=>{G.value.forEach(t=>{t.checked=e}),U.value=!1},K=i([`apple`,`banana`]),q=[{label:`苹果`,value:`apple`},{label:`香蕉`,value:`banana`},{label:`橙子`,value:`orange`},{label:`葡萄`,value:`grape`}],J=i(),Y=i([`beijing`]),X=[{label:`北京`,value:`beijing`},{label:`上海`,value:`shanghai`},{label:`广州`,value:`guangzhou`},{label:`深圳`,value:`shenzhen`},{label:`杭州`,value:`hangzhou`}],ke=()=>{J.value?.selectAll()},Ae=()=>{J.value?.unselectAll()},je=()=>{J.value?.toggleAll()},Z=i([`option1`]),Q=i([`apple`]),$=i(!1),Me=e=>{console.log(`协议状态:`,e)};return(ee,i)=>(s(),l(`div`,ie,[i[47]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Checkbox 复选框`),o(`p`,{class:`component-demo-view__description`},` 复选框用于在一组选项中进行多选 `)],-1),o(`section`,ae,[i[20]||=o(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),o(`div`,oe,[u(t(m),{modelValue:c.value,"onUpdate:modelValue":i[0]||=e=>c.value=e},{default:d(()=>[...i[18]||=[a(`选项一`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{modelValue:R.value,"onUpdate:modelValue":i[1]||=e=>R.value=e},{default:d(()=>[...i[19]||=[a(`选项二`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{modelValue:z.value,"onUpdate:modelValue":i[2]||=e=>z.value=e,label:`选项三`},null,8,[`modelValue`])]),o(`div`,se,[u(e,{code:_e,language:`vue`,title:`示例代码`})])]),o(`section`,ce,[i[24]||=o(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),o(`div`,le,[u(t(m),{modelValue:B.value,"onUpdate:modelValue":i[3]||=e=>B.value=e,size:`small`},{default:d(()=>[...i[21]||=[a(`小型`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{modelValue:B.value,"onUpdate:modelValue":i[4]||=e=>B.value=e,size:`medium`},{default:d(()=>[...i[22]||=[a(`中型`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{modelValue:B.value,"onUpdate:modelValue":i[5]||=e=>B.value=e,size:`large`},{default:d(()=>[...i[23]||=[a(`大型`,-1)]]),_:1},8,[`modelValue`])]),o(`div`,ue,[u(e,{code:ve,language:`vue`,title:`示例代码`})])]),o(`section`,de,[i[29]||=o(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),o(`div`,fe,[u(t(m),{modelValue:V.value,"onUpdate:modelValue":i[6]||=e=>V.value=e,theme:`primary`},{default:d(()=>[...i[25]||=[a(`主要`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{modelValue:V.value,"onUpdate:modelValue":i[7]||=e=>V.value=e,theme:`success`},{default:d(()=>[...i[26]||=[a(`成功`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{modelValue:V.value,"onUpdate:modelValue":i[8]||=e=>V.value=e,theme:`warning`},{default:d(()=>[...i[27]||=[a(`警告`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{modelValue:V.value,"onUpdate:modelValue":i[9]||=e=>V.value=e,theme:`danger`},{default:d(()=>[...i[28]||=[a(`危险`,-1)]]),_:1},8,[`modelValue`])]),o(`div`,pe,[u(e,{code:ye,language:`vue`,title:`示例代码`})])]),o(`section`,me,[i[34]||=o(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),o(`div`,he,[u(t(m),{modelValue:H.value,"onUpdate:modelValue":i[10]||=e=>H.value=e,disabled:``},{default:d(()=>[...i[30]||=[a(`禁用选中`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{"model-value":!1,disabled:``},{default:d(()=>[...i[31]||=[a(`禁用未选中`,-1)]]),_:1}),u(t(m),{modelValue:H.value,"onUpdate:modelValue":i[11]||=e=>H.value=e,readonly:``},{default:d(()=>[...i[32]||=[a(`只读选中`,-1)]]),_:1},8,[`modelValue`]),u(t(m),{"model-value":!1,readonly:``},{default:d(()=>[...i[33]||=[a(`只读未选中`,-1)]]),_:1})]),o(`div`,ge,[u(e,{code:be,language:`vue`,title:`示例代码`})])]),o(`section`,h,[i[36]||=o(`h2`,{class:`component-demo-view__section-title`},`半选状态`,-1),o(`div`,g,[u(t(m),{modelValue:W.value,"onUpdate:modelValue":i[12]||=e=>W.value=e,indeterminate:U.value,onChange:Oe},{default:d(()=>[...i[35]||=[a(` 全选 `,-1)]]),_:1},8,[`modelValue`,`indeterminate`]),o(`div`,_,[(s(!0),l(ne,null,r(G.value,e=>(s(),re(t(m),{key:e.value,modelValue:e.checked,"onUpdate:modelValue":t=>e.checked=t,onChange:De},{default:d(()=>[a(n(e.label),1)]),_:2},1032,[`modelValue`,`onUpdate:modelValue`]))),128))])]),o(`div`,v,[u(e,{code:xe,language:`vue`,title:`示例代码`})])]),o(`section`,y,[i[37]||=o(`h2`,{class:`component-demo-view__section-title`},`复选框组`,-1),o(`div`,b,[o(`p`,x,`选中的值: `+n(K.value),1),u(t(p),{modelValue:K.value,"onUpdate:modelValue":i[13]||=e=>K.value=e,options:q},null,8,[`modelValue`])]),o(`div`,S,[u(e,{code:Se,language:`vue`,title:`示例代码`})])]),o(`section`,C,[i[41]||=o(`h2`,{class:`component-demo-view__section-title`},`全选/反选功能`,-1),o(`div`,w,[o(`div`,T,[u(t(f),{type:`primary`,size:`small`,onClick:ke},{default:d(()=>[...i[38]||=[a(`全选`,-1)]]),_:1}),u(t(f),{size:`small`,onClick:Ae},{default:d(()=>[...i[39]||=[a(`取消全选`,-1)]]),_:1}),u(t(f),{size:`small`,onClick:je},{default:d(()=>[...i[40]||=[a(`反选`,-1)]]),_:1})]),u(t(p),{ref_key:`groupRef`,ref:J,modelValue:Y.value,"onUpdate:modelValue":i[14]||=e=>Y.value=e,options:X},null,8,[`modelValue`]),o(`p`,E,`已选中: `+n(Y.value.length)+` / `+n(X.length),1)]),o(`div`,D,[u(e,{code:Ce,language:`vue`,title:`示例代码`})])]),o(`section`,O,[i[42]||=o(`h2`,{class:`component-demo-view__section-title`},`垂直排列`,-1),o(`div`,k,[u(t(p),{modelValue:Z.value,"onUpdate:modelValue":i[15]||=e=>Z.value=e,direction:`vertical`,options:q},null,8,[`modelValue`])]),o(`div`,A,[u(e,{code:we,language:`vue`,title:`示例代码`})])]),o(`section`,j,[i[44]||=o(`h2`,{class:`component-demo-view__section-title`},`限制选中数量`,-1),o(`div`,M,[i[43]||=o(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},`最少选1个，最多选3个`,-1),u(t(p),{modelValue:Q.value,"onUpdate:modelValue":i[16]||=e=>Q.value=e,options:q,min:1,max:3},null,8,[`modelValue`])]),o(`div`,N,[u(e,{code:Te,language:`vue`,title:`示例代码`})])]),o(`section`,P,[i[46]||=o(`h2`,{class:`component-demo-view__section-title`},`交互示例`,-1),o(`div`,F,[u(t(m),{modelValue:$.value,"onUpdate:modelValue":i[17]||=e=>$.value=e,onChange:Me},{default:d(()=>[...i[45]||=[a(` 我已阅读并同意《用户协议》 `,-1)]]),_:1},8,[`modelValue`]),$.value?(s(),l(`p`,I,` 感谢你的同意！ `)):te(``,!0)]),o(`div`,L,[u(e,{code:Ee,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-22a742c3`]]);export{R as default};
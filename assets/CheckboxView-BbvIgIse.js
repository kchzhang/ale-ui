import{B as e,C as t,K as n,M as r,P as ee,S as i,W as a,Y as o,_ as te,g as s,i as c,p as ne,v as re,x as l,y as u}from"./index-B3Jx3uix.js";import{t as d}from"./button-GOPf8Q2w.js";import"./Checkbox-BLbaJrwb.js";import{n as f,t as p}from"./checkbox-AjOIcsEN.js";import{t as m}from"./CodeBlock-CE4Cu_o1.js";var ie={class:`component-demo-view`},ae={class:`component-demo-view__section`},oe={class:`component-demo-view__demo`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo`},ue={class:`component-demo-view__code`},de={class:`component-demo-view__section`},fe={class:`component-demo-view__demo`},pe={class:`component-demo-view__code`},me={class:`component-demo-view__section`},he={class:`component-demo-view__demo`},ge={class:`component-demo-view__code`},_e={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},g={style:{"margin-left":`24px`,"margin-top":`8px`}},_={class:`component-demo-view__code`},v={class:`component-demo-view__section`},y={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},b={style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},x={class:`component-demo-view__code`},S={class:`component-demo-view__section`},C={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},w={style:{display:`flex`,gap:`8px`,"margin-bottom":`12px`}},T={style:{margin:`12px 0 0 0`,color:`var(--color-text-secondary)`}},E={class:`component-demo-view__code`},D={class:`component-demo-view__section`},O={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},k={class:`component-demo-view__code`},A={class:`component-demo-view__section`},j={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},M={class:`component-demo-view__code`},N={class:`component-demo-view__section`},P={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`}},F={key:0,style:{color:`var(--color-success)`,margin:`8px 0 0 0`}},I={class:`component-demo-view__code`},L=`<template>
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
<\/script>`,R=c(t({__name:`CheckboxView`,setup(t){let c=a(!0),R=a(!1),z=a(!0),B=a(!0),V=a(!0),H=a(!0),U=a(!1),W=a(!1),G=a([{label:`北京`,value:`beijing`,checked:!1},{label:`上海`,value:`shanghai`,checked:!1},{label:`广州`,value:`guangzhou`,checked:!1},{label:`深圳`,value:`shenzhen`,checked:!1}]),De=()=>{let e=G.value.filter(e=>e.checked).length;W.value=e>0&&e<G.value.length,U.value=W.value||e===0&&W.value},Oe=e=>{G.value.forEach(t=>{t.checked=e}),U.value=!1},K=a([`apple`,`banana`]),q=[{label:`苹果`,value:`apple`},{label:`香蕉`,value:`banana`},{label:`橙子`,value:`orange`},{label:`葡萄`,value:`grape`}],J=a(),Y=a([`beijing`]),X=[{label:`北京`,value:`beijing`},{label:`上海`,value:`shanghai`},{label:`广州`,value:`guangzhou`},{label:`深圳`,value:`shenzhen`},{label:`杭州`,value:`hangzhou`}],ke=()=>{J.value?.selectAll()},Ae=()=>{J.value?.unselectAll()},je=()=>{J.value?.toggleAll()},Z=a([`option1`]),Q=a([`apple`]),$=a(!1),Me=e=>{console.log(`协议状态:`,e)};return(t,a)=>(r(),u(`div`,ie,[a[47]||=s(`div`,{class:`component-demo-view__header`},[s(`h1`,{class:`component-demo-view__title`},`Checkbox 复选框`),s(`p`,{class:`component-demo-view__description`},` 复选框用于在一组选项中进行多选 `)],-1),s(`section`,ae,[a[20]||=s(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),s(`div`,oe,[i(n(p),{modelValue:c.value,"onUpdate:modelValue":a[0]||=e=>c.value=e},{default:e(()=>[...a[18]||=[l(`选项一`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{modelValue:R.value,"onUpdate:modelValue":a[1]||=e=>R.value=e},{default:e(()=>[...a[19]||=[l(`选项二`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{modelValue:z.value,"onUpdate:modelValue":a[2]||=e=>z.value=e,label:`选项三`},null,8,[`modelValue`])]),s(`div`,se,[i(m,{code:L,language:`vue`,title:`示例代码`})])]),s(`section`,ce,[a[24]||=s(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),s(`div`,le,[i(n(p),{modelValue:B.value,"onUpdate:modelValue":a[3]||=e=>B.value=e,size:`small`},{default:e(()=>[...a[21]||=[l(`小型`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{modelValue:B.value,"onUpdate:modelValue":a[4]||=e=>B.value=e,size:`medium`},{default:e(()=>[...a[22]||=[l(`中型`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{modelValue:B.value,"onUpdate:modelValue":a[5]||=e=>B.value=e,size:`large`},{default:e(()=>[...a[23]||=[l(`大型`,-1)]]),_:1},8,[`modelValue`])]),s(`div`,ue,[i(m,{code:ve,language:`vue`,title:`示例代码`})])]),s(`section`,de,[a[29]||=s(`h2`,{class:`component-demo-view__section-title`},`不同主题`,-1),s(`div`,fe,[i(n(p),{modelValue:V.value,"onUpdate:modelValue":a[6]||=e=>V.value=e,theme:`primary`},{default:e(()=>[...a[25]||=[l(`主要`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{modelValue:V.value,"onUpdate:modelValue":a[7]||=e=>V.value=e,theme:`success`},{default:e(()=>[...a[26]||=[l(`成功`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{modelValue:V.value,"onUpdate:modelValue":a[8]||=e=>V.value=e,theme:`warning`},{default:e(()=>[...a[27]||=[l(`警告`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{modelValue:V.value,"onUpdate:modelValue":a[9]||=e=>V.value=e,theme:`danger`},{default:e(()=>[...a[28]||=[l(`危险`,-1)]]),_:1},8,[`modelValue`])]),s(`div`,pe,[i(m,{code:ye,language:`vue`,title:`示例代码`})])]),s(`section`,me,[a[34]||=s(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),s(`div`,he,[i(n(p),{modelValue:H.value,"onUpdate:modelValue":a[10]||=e=>H.value=e,disabled:``},{default:e(()=>[...a[30]||=[l(`禁用选中`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{"model-value":!1,disabled:``},{default:e(()=>[...a[31]||=[l(`禁用未选中`,-1)]]),_:1}),i(n(p),{modelValue:H.value,"onUpdate:modelValue":a[11]||=e=>H.value=e,readonly:``},{default:e(()=>[...a[32]||=[l(`只读选中`,-1)]]),_:1},8,[`modelValue`]),i(n(p),{"model-value":!1,readonly:``},{default:e(()=>[...a[33]||=[l(`只读未选中`,-1)]]),_:1})]),s(`div`,ge,[i(m,{code:be,language:`vue`,title:`示例代码`})])]),s(`section`,_e,[a[36]||=s(`h2`,{class:`component-demo-view__section-title`},`半选状态`,-1),s(`div`,h,[i(n(p),{modelValue:W.value,"onUpdate:modelValue":a[12]||=e=>W.value=e,indeterminate:U.value,onChange:Oe},{default:e(()=>[...a[35]||=[l(` 全选 `,-1)]]),_:1},8,[`modelValue`,`indeterminate`]),s(`div`,g,[(r(!0),u(ne,null,ee(G.value,t=>(r(),te(n(p),{key:t.value,modelValue:t.checked,"onUpdate:modelValue":e=>t.checked=e,onChange:De},{default:e(()=>[l(o(t.label),1)]),_:2},1032,[`modelValue`,`onUpdate:modelValue`]))),128))])]),s(`div`,_,[i(m,{code:xe,language:`vue`,title:`示例代码`})])]),s(`section`,v,[a[37]||=s(`h2`,{class:`component-demo-view__section-title`},`复选框组`,-1),s(`div`,y,[s(`p`,b,`选中的值: `+o(K.value),1),i(n(f),{modelValue:K.value,"onUpdate:modelValue":a[13]||=e=>K.value=e,options:q},null,8,[`modelValue`])]),s(`div`,x,[i(m,{code:Se,language:`vue`,title:`示例代码`})])]),s(`section`,S,[a[41]||=s(`h2`,{class:`component-demo-view__section-title`},`全选/反选功能`,-1),s(`div`,C,[s(`div`,w,[i(n(d),{type:`primary`,size:`small`,onClick:ke},{default:e(()=>[...a[38]||=[l(`全选`,-1)]]),_:1}),i(n(d),{size:`small`,onClick:Ae},{default:e(()=>[...a[39]||=[l(`取消全选`,-1)]]),_:1}),i(n(d),{size:`small`,onClick:je},{default:e(()=>[...a[40]||=[l(`反选`,-1)]]),_:1})]),i(n(f),{ref_key:`groupRef`,ref:J,modelValue:Y.value,"onUpdate:modelValue":a[14]||=e=>Y.value=e,options:X},null,8,[`modelValue`]),s(`p`,T,`已选中: `+o(Y.value.length)+` / `+o(X.length),1)]),s(`div`,E,[i(m,{code:Ce,language:`vue`,title:`示例代码`})])]),s(`section`,D,[a[42]||=s(`h2`,{class:`component-demo-view__section-title`},`垂直排列`,-1),s(`div`,O,[i(n(f),{modelValue:Z.value,"onUpdate:modelValue":a[15]||=e=>Z.value=e,direction:`vertical`,options:q},null,8,[`modelValue`])]),s(`div`,k,[i(m,{code:we,language:`vue`,title:`示例代码`})])]),s(`section`,A,[a[44]||=s(`h2`,{class:`component-demo-view__section-title`},`限制选中数量`,-1),s(`div`,j,[a[43]||=s(`p`,{style:{margin:`0 0 12px 0`,color:`var(--color-text-secondary)`}},`最少选1个，最多选3个`,-1),i(n(f),{modelValue:Q.value,"onUpdate:modelValue":a[16]||=e=>Q.value=e,options:q,min:1,max:3},null,8,[`modelValue`])]),s(`div`,M,[i(m,{code:Te,language:`vue`,title:`示例代码`})])]),s(`section`,N,[a[46]||=s(`h2`,{class:`component-demo-view__section-title`},`交互示例`,-1),s(`div`,P,[i(n(p),{modelValue:$.value,"onUpdate:modelValue":a[17]||=e=>$.value=e,onChange:Me},{default:e(()=>[...a[45]||=[l(` 我已阅读并同意《用户协议》 `,-1)]]),_:1},8,[`modelValue`]),$.value?(r(),u(`p`,F,` 感谢你的同意！ `)):re(``,!0)]),s(`div`,I,[i(m,{code:Ee,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-22a742c3`]]);export{R as default};
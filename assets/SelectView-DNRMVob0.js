import{C as e,K as t,M as n,P as ee,S as r,W as i,Y as a,g as o,h as te,i as s,p as ne,y as c}from"./index-B3Jx3uix.js";import{n as l}from"./select-DfWCBj6N.js";import{t as u}from"./CodeBlock-CE4Cu_o1.js";var re={class:`component-demo-view`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`},oe={class:`demo-value`},se={class:`component-demo-view__code`},ce={class:`component-demo-view__section`},le={class:`component-demo-view__demo`},ue={class:`component-demo-view__code`},de={class:`component-demo-view__section`},fe={class:`component-demo-view__demo`},pe={class:`component-demo-view__code`},me={class:`component-demo-view__section`},he={class:`component-demo-view__demo`},ge={class:`component-demo-view__code`},_e={class:`component-demo-view__section`},ve={class:`component-demo-view__demo`},ye={class:`demo-value`},be={class:`component-demo-view__code`},xe={class:`component-demo-view__section`},d={class:`component-demo-view__demo`},f={class:`component-demo-view__code`},p={class:`component-demo-view__section`},m={class:`component-demo-view__demo`},h={class:`component-demo-view__code`},g={class:`component-demo-view__section`},_={class:`component-demo-view__demo`},v={class:`component-demo-view__code`},y={class:`component-demo-view__section`},b={class:`component-demo-view__demo`},x={class:`component-demo-view__code`},S={class:`component-demo-view__section`},C={class:`component-demo-view__demo`},w={class:`demo-value`},T={class:`component-demo-view__code`},E={class:`component-demo-view__section`},D={class:`component-demo-view__demo`},O={class:`component-demo-view__code`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`},j={class:`event-log`},M={class:`component-demo-view__code`},Se={class:`component-demo-view__section`},Ce={class:`component-demo-view__demo`},we={class:`component-demo-view__code`},Te=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    placeholder="请选择"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]);
<\/script>`,Ee=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    size="large"
    placeholder="大尺寸"
  />
  <AleSelect
    v-model="value"
    :options="options"
    size="medium"
    placeholder="中尺寸"
  />
  <AleSelect
    v-model="value"
    :options="options"
    size="small"
    placeholder="小尺寸"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]);
<\/script>`,De=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    disabled
    placeholder="禁用状态"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('1');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);
<\/script>`,Oe=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    clearable
    placeholder="可清空"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('1');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);
<\/script>`,ke=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    multiple
    clearable
    placeholder="请选择"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref(['1', '2']);
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]);
<\/script>`,Ae=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    multiple
    :max-collapse-tags="2"
    placeholder="最多显示2个标签"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref(['apple', 'banana', 'orange', 'grape']);
const options = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
]);
<\/script>`,je=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    filterable
    clearable
    placeholder="请选择或搜索"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' }
]);
<\/script>`,Me=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    filterable
    :loading="loading"
    :remote-method="remoteMethod"
    placeholder="请输入关键词搜索"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([]);
const loading = ref(false);

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      options.value = [
        { label: query + '1', value: query + '1' },
        { label: query + '2', value: query + '2' }
      ];
      loading.value = false;
    }, 500);
  } else {
    options.value = [];
  }
};
<\/script>`,Ne=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    filterable
    allow-create
    @create="handleCreate"
    placeholder="请选择或输入"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'javascript' }
]);

const handleCreate = (value: string) => {
  console.log('创建新条目:', value);
};
<\/script>`,Pe=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    virtual-scroll
    :visible-count="8"
    :item-height="34"
    filterable
    placeholder="从大数据中搜索"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = computed(() => {
  return Array.from({ length: 10000 }, (_, i) => ({
    label: \`选项 \${i + 1}\`,
    value: String(i + 1)
  }));
});
<\/script>`,Fe=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    placeholder="请选择"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '可用选项1', value: '1' },
  { label: '可用选项2', value: '2' },
  { label: '禁用选项', value: '3', disabled: true },
  { label: '可用选项3', value: '4' }
]);
<\/script>`,Ie=`<template>
  <AleSelect
    v-model="value"
    :options="options"
    clearable
    placeholder="请选择"
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';

const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);

const handleChange = (value: unknown) => {
  console.log('change:', value);
};

const handleVisibleChange = (visible: boolean) => {
  console.log('visible-change:', visible);
};

const handleClear = () => {
  console.log('clear');
};

const handleFocus = () => {
  console.log('focus');
};

const handleBlur = () => {
  console.log('blur');
};
<\/script>`,Le=`<template>
  <AleSelect
    ref="selectRef"
    v-model="value"
    :options="options"
    placeholder="请选择"
  />
  <button @click="handleFocus">聚焦</button>
  <button @click="handleBlur">失焦</button>
  <button @click="handleClear">清空</button>
  <button @click="handleOpen">打开下拉</button>
  <button @click="handleClose">关闭下拉</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleSelect } from 'ale-ui';
import type { SelectExpose } from 'ale-ui';

const selectRef = ref<SelectExpose>();
const value = ref('');
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]);

const handleFocus = () => selectRef.value?.focus();
const handleBlur = () => selectRef.value?.blur();
const handleClear = () => selectRef.value?.clear();
const handleOpen = () => selectRef.value?.openDropdown();
const handleClose = () => selectRef.value?.closeDropdown();
<\/script>`,N=s(e({__name:`SelectView`,setup(e){let s=i([{label:`选项1`,value:`1`},{label:`选项2`,value:`2`},{label:`选项3`,value:`3`}]),N=i([{label:`苹果`,value:`apple`},{label:`香蕉`,value:`banana`},{label:`橙子`,value:`orange`},{label:`葡萄`,value:`grape`},{label:`西瓜`,value:`watermelon`},{label:`草莓`,value:`strawberry`},{label:`芒果`,value:`mango`},{label:`梨`,value:`pear`}]),P=i(``),F=i(``),I=i(`1`),L=i(`1`),R=i([`1`,`2`]),z=i([`apple`,`banana`,`orange`,`grape`]),B=i(``),V=i(``),H=i([]),U=i(!1),Re=[`北京`,`上海`,`广州`,`深圳`,`杭州`,`南京`,`成都`,`武汉`,`西安`,`重庆`,`天津`,`苏州`,`郑州`,`长沙`,`青岛`,`大连`,`厦门`,`宁波`,`无锡`,`佛山`,`东莞`,`沈阳`,`昆明`,`合肥`],ze=e=>{e?(U.value=!0,setTimeout(()=>{H.value=Re.filter(t=>t.includes(e)).map(e=>({label:e,value:e})),U.value=!1},500)):H.value=[]},W=i(``),G=i([{label:`HTML`,value:`html`},{label:`CSS`,value:`css`},{label:`JavaScript`,value:`javascript`}]),Be=e=>{let t={label:e,value:e.toLowerCase()};G.value.push(t),W.value=t.value},K=i(``),Ve=te(()=>Array.from({length:1e4},(e,t)=>({label:`选项 ${t+1}`,value:String(t+1)}))),He=i([{label:`可用选项1`,value:`1`},{label:`可用选项2`,value:`2`},{label:`禁用选项`,value:`3`,disabled:!0},{label:`可用选项3`,value:`4`}]),q=i(``),J=i(``),Y=i([]),X=e=>{let t=new Date().toLocaleTimeString();Y.value.unshift(`[${t}] ${e}`),Y.value.length>10&&Y.value.pop()},Ue=e=>{X(`change: ${JSON.stringify(e)}`)},We=e=>{X(`visible-change: ${e}`)},Ge=()=>{X(`clear`)},Ke=()=>{X(`focus`)},Z=()=>{X(`blur`)},Q=i(),$=i(``),qe=()=>{Q.value?.focus()},Je=()=>{Q.value?.blur()},Ye=()=>{Q.value?.clear()},Xe=()=>{Q.value?.openDropdown()},Ze=()=>{Q.value?.closeDropdown()};return(e,i)=>(n(),c(`div`,re,[i[29]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Select 选择器`),o(`p`,{class:`component-demo-view__description`},` 当选项过多时，使用下拉菜单展示并选择内容。支持单选、多选、搜索、虚拟滚动等高级特性。 `)],-1),o(`section`,ie,[i[15]||=o(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),o(`div`,ae,[r(t(l),{modelValue:P.value,"onUpdate:modelValue":i[0]||=e=>P.value=e,options:s.value,placeholder:`请选择`},null,8,[`modelValue`,`options`]),o(`span`,oe,`选中值: `+a(P.value),1)]),o(`div`,se,[r(u,{code:Te,language:`vue`,title:`示例代码`})])]),o(`section`,ce,[i[16]||=o(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),o(`div`,le,[r(t(l),{modelValue:F.value,"onUpdate:modelValue":i[1]||=e=>F.value=e,options:s.value,size:`large`,placeholder:`大尺寸`},null,8,[`modelValue`,`options`]),r(t(l),{modelValue:F.value,"onUpdate:modelValue":i[2]||=e=>F.value=e,options:s.value,size:`medium`,placeholder:`中尺寸`},null,8,[`modelValue`,`options`]),r(t(l),{modelValue:F.value,"onUpdate:modelValue":i[3]||=e=>F.value=e,options:s.value,size:`small`,placeholder:`小尺寸`},null,8,[`modelValue`,`options`])]),o(`div`,ue,[r(u,{code:Ee,language:`vue`,title:`示例代码`})])]),o(`section`,de,[i[17]||=o(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),o(`div`,fe,[r(t(l),{modelValue:I.value,"onUpdate:modelValue":i[4]||=e=>I.value=e,options:s.value,disabled:``,placeholder:`禁用状态`},null,8,[`modelValue`,`options`])]),o(`div`,pe,[r(u,{code:De,language:`vue`,title:`示例代码`})])]),o(`section`,me,[i[18]||=o(`h2`,{class:`component-demo-view__section-title`},`可清空`,-1),o(`div`,he,[r(t(l),{modelValue:L.value,"onUpdate:modelValue":i[5]||=e=>L.value=e,options:s.value,clearable:``,placeholder:`可清空`},null,8,[`modelValue`,`options`])]),o(`div`,ge,[r(u,{code:Oe,language:`vue`,title:`示例代码`})])]),o(`section`,_e,[i[19]||=o(`h2`,{class:`component-demo-view__section-title`},`多选模式`,-1),o(`div`,ve,[r(t(l),{modelValue:R.value,"onUpdate:modelValue":i[6]||=e=>R.value=e,options:s.value,multiple:``,clearable:``,placeholder:`请选择`},null,8,[`modelValue`,`options`]),o(`span`,ye,`选中值: `+a(R.value),1)]),o(`div`,be,[r(u,{code:ke,language:`vue`,title:`示例代码`})])]),o(`section`,xe,[i[20]||=o(`h2`,{class:`component-demo-view__section-title`},`多选折叠`,-1),o(`div`,d,[r(t(l),{modelValue:z.value,"onUpdate:modelValue":i[7]||=e=>z.value=e,options:N.value,multiple:``,"max-collapse-tags":2,placeholder:`最多显示2个标签`},null,8,[`modelValue`,`options`])]),o(`div`,f,[r(u,{code:Ae,language:`vue`,title:`示例代码`})])]),o(`section`,p,[i[21]||=o(`h2`,{class:`component-demo-view__section-title`},`可搜索`,-1),o(`div`,m,[r(t(l),{modelValue:B.value,"onUpdate:modelValue":i[8]||=e=>B.value=e,options:N.value,filterable:``,clearable:``,placeholder:`请选择或搜索`},null,8,[`modelValue`,`options`])]),o(`div`,h,[r(u,{code:je,language:`vue`,title:`示例代码`})])]),o(`section`,g,[i[22]||=o(`h2`,{class:`component-demo-view__section-title`},`远程搜索`,-1),o(`div`,_,[r(t(l),{modelValue:V.value,"onUpdate:modelValue":i[9]||=e=>V.value=e,options:H.value,filterable:``,loading:U.value,onRemoteMethod:ze,placeholder:`请输入关键词搜索`},null,8,[`modelValue`,`options`,`loading`])]),o(`div`,v,[r(u,{code:Me,language:`vue`,title:`示例代码`})])]),o(`section`,y,[i[23]||=o(`h2`,{class:`component-demo-view__section-title`},`创建新条目`,-1),o(`div`,b,[r(t(l),{modelValue:W.value,"onUpdate:modelValue":i[10]||=e=>W.value=e,options:G.value,filterable:``,"allow-create":``,onCreate:Be,placeholder:`请选择或输入`},null,8,[`modelValue`,`options`])]),o(`div`,x,[r(u,{code:Ne,language:`vue`,title:`示例代码`})])]),o(`section`,S,[i[24]||=o(`h2`,{class:`component-demo-view__section-title`},`虚拟滚动`,-1),o(`div`,C,[r(t(l),{modelValue:K.value,"onUpdate:modelValue":i[11]||=e=>K.value=e,options:Ve.value,"virtual-scroll":``,"visible-count":8,"item-height":34,filterable:``,placeholder:`从10000条数据中搜索`},null,8,[`modelValue`,`options`]),o(`span`,w,`选中值: `+a(K.value),1)]),o(`div`,T,[r(u,{code:Pe,language:`vue`,title:`示例代码`})])]),o(`section`,E,[i[25]||=o(`h2`,{class:`component-demo-view__section-title`},`带禁用选项`,-1),o(`div`,D,[r(t(l),{modelValue:q.value,"onUpdate:modelValue":i[12]||=e=>q.value=e,options:He.value,placeholder:`请选择`},null,8,[`modelValue`,`options`])]),o(`div`,O,[r(u,{code:Fe,language:`vue`,title:`示例代码`})])]),o(`section`,k,[i[27]||=o(`h2`,{class:`component-demo-view__section-title`},`事件监听`,-1),o(`div`,A,[r(t(l),{modelValue:J.value,"onUpdate:modelValue":i[13]||=e=>J.value=e,options:s.value,clearable:``,placeholder:`请选择`,onChange:Ue,onVisibleChange:We,onClear:Ge,onFocus:Ke,onBlur:Z},null,8,[`modelValue`,`options`])]),o(`div`,j,[i[26]||=o(`h4`,null,`事件日志:`,-1),o(`ul`,null,[(n(!0),c(ne,null,ee(Y.value,(e,t)=>(n(),c(`li`,{key:t,class:`log-item`},a(e),1))),128))])]),o(`div`,M,[r(u,{code:Ie,language:`vue`,title:`示例代码`})])]),o(`section`,Se,[i[28]||=o(`h2`,{class:`component-demo-view__section-title`},`方法调用`,-1),o(`div`,Ce,[r(t(l),{ref_key:`methodSelectRef`,ref:Q,modelValue:$.value,"onUpdate:modelValue":i[14]||=e=>$.value=e,options:s.value,placeholder:`请选择`},null,8,[`modelValue`,`options`]),o(`div`,{class:`demo-buttons`},[o(`button`,{class:`demo-btn`,onClick:qe},`聚焦`),o(`button`,{class:`demo-btn`,onClick:Je},`失焦`),o(`button`,{class:`demo-btn`,onClick:Ye},`清空`),o(`button`,{class:`demo-btn`,onClick:Xe},`打开下拉`),o(`button`,{class:`demo-btn`,onClick:Ze},`关闭下拉`)])]),o(`div`,we,[r(u,{code:Le,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-9299624e`]]);export{N as default};
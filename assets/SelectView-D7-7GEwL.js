import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,N as ee,S as te,U as r,f as ne,h as i,j as a,m as re,r as o,v as s,x as c}from"./index-D6beBo5R.js";import{n as l}from"./select-CYUd20oF.js";var ie={class:`component-demo-view`},ae={class:`component-demo-view__section`},oe={class:`component-demo-view__demo`},se={class:`demo-value`},ce={class:`component-demo-view__code`},le={class:`component-demo-view__section`},ue={class:`component-demo-view__demo`},de={class:`component-demo-view__code`},fe={class:`component-demo-view__section`},pe={class:`component-demo-view__demo`},me={class:`component-demo-view__code`},he={class:`component-demo-view__section`},ge={class:`component-demo-view__demo`},_e={class:`component-demo-view__code`},ve={class:`component-demo-view__section`},ye={class:`component-demo-view__demo`},be={class:`demo-value`},xe={class:`component-demo-view__code`},u={class:`component-demo-view__section`},d={class:`component-demo-view__demo`},f={class:`component-demo-view__code`},p={class:`component-demo-view__section`},m={class:`component-demo-view__demo`},h={class:`component-demo-view__code`},g={class:`component-demo-view__section`},_={class:`component-demo-view__demo`},v={class:`component-demo-view__code`},y={class:`component-demo-view__section`},b={class:`component-demo-view__demo`},x={class:`component-demo-view__code`},S={class:`component-demo-view__section`},C={class:`component-demo-view__demo`},w={class:`demo-value`},T={class:`component-demo-view__code`},E={class:`component-demo-view__section`},D={class:`component-demo-view__demo`},O={class:`component-demo-view__code`},k={class:`component-demo-view__section`},A={class:`component-demo-view__demo`},j={class:`event-log`},M={class:`component-demo-view__code`},Se={class:`component-demo-view__section`},Ce={class:`component-demo-view__demo`},we={class:`component-demo-view__code`},Te=`<template>
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
<\/script>`,N=o(te({__name:`SelectView`,setup(te){let o=r([{label:`选项1`,value:`1`},{label:`选项2`,value:`2`},{label:`选项3`,value:`3`}]),N=r([{label:`苹果`,value:`apple`},{label:`香蕉`,value:`banana`},{label:`橙子`,value:`orange`},{label:`葡萄`,value:`grape`},{label:`西瓜`,value:`watermelon`},{label:`草莓`,value:`strawberry`},{label:`芒果`,value:`mango`},{label:`梨`,value:`pear`}]),P=r(``),F=r(``),I=r(`1`),L=r(`1`),R=r([`1`,`2`]),z=r([`apple`,`banana`,`orange`,`grape`]),B=r(``),V=r(``),H=r([]),U=r(!1),Re=[`北京`,`上海`,`广州`,`深圳`,`杭州`,`南京`,`成都`,`武汉`,`西安`,`重庆`,`天津`,`苏州`,`郑州`,`长沙`,`青岛`,`大连`,`厦门`,`宁波`,`无锡`,`佛山`,`东莞`,`沈阳`,`昆明`,`合肥`],ze=e=>{e?(U.value=!0,setTimeout(()=>{H.value=Re.filter(t=>t.includes(e)).map(e=>({label:e,value:e})),U.value=!1},500)):H.value=[]},W=r(``),G=r([{label:`HTML`,value:`html`},{label:`CSS`,value:`css`},{label:`JavaScript`,value:`javascript`}]),Be=e=>{let t={label:e,value:e.toLowerCase()};G.value.push(t),W.value=t.value},K=r(``),Ve=re(()=>Array.from({length:1e4},(e,t)=>({label:`选项 ${t+1}`,value:String(t+1)}))),He=r([{label:`可用选项1`,value:`1`},{label:`可用选项2`,value:`2`},{label:`禁用选项`,value:`3`,disabled:!0},{label:`可用选项3`,value:`4`}]),q=r(``),J=r(``),Y=r([]),X=e=>{let t=new Date().toLocaleTimeString();Y.value.unshift(`[${t}] ${e}`),Y.value.length>10&&Y.value.pop()},Ue=e=>{X(`change: ${JSON.stringify(e)}`)},We=e=>{X(`visible-change: ${e}`)},Ge=()=>{X(`clear`)},Ke=()=>{X(`focus`)},Z=()=>{X(`blur`)},Q=r(),$=r(``),qe=()=>{Q.value?.focus()},Je=()=>{Q.value?.blur()},Ye=()=>{Q.value?.clear()},Xe=()=>{Q.value?.openDropdown()},Ze=()=>{Q.value?.closeDropdown()};return(te,r)=>(a(),s(`div`,ie,[r[29]||=i(`div`,{class:`component-demo-view__header`},[i(`h1`,{class:`component-demo-view__title`},`Select 选择器`),i(`p`,{class:`component-demo-view__description`},` 当选项过多时，使用下拉菜单展示并选择内容。支持单选、多选、搜索、虚拟滚动等高级特性。 `)],-1),i(`section`,ae,[r[15]||=i(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),i(`div`,oe,[c(t(l),{modelValue:P.value,"onUpdate:modelValue":r[0]||=e=>P.value=e,options:o.value,placeholder:`请选择`},null,8,[`modelValue`,`options`]),i(`span`,se,`选中值: `+n(P.value),1)]),i(`div`,ce,[c(e,{code:Te,language:`vue`,title:`示例代码`})])]),i(`section`,le,[r[16]||=i(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),i(`div`,ue,[c(t(l),{modelValue:F.value,"onUpdate:modelValue":r[1]||=e=>F.value=e,options:o.value,size:`large`,placeholder:`大尺寸`},null,8,[`modelValue`,`options`]),c(t(l),{modelValue:F.value,"onUpdate:modelValue":r[2]||=e=>F.value=e,options:o.value,size:`medium`,placeholder:`中尺寸`},null,8,[`modelValue`,`options`]),c(t(l),{modelValue:F.value,"onUpdate:modelValue":r[3]||=e=>F.value=e,options:o.value,size:`small`,placeholder:`小尺寸`},null,8,[`modelValue`,`options`])]),i(`div`,de,[c(e,{code:Ee,language:`vue`,title:`示例代码`})])]),i(`section`,fe,[r[17]||=i(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),i(`div`,pe,[c(t(l),{modelValue:I.value,"onUpdate:modelValue":r[4]||=e=>I.value=e,options:o.value,disabled:``,placeholder:`禁用状态`},null,8,[`modelValue`,`options`])]),i(`div`,me,[c(e,{code:De,language:`vue`,title:`示例代码`})])]),i(`section`,he,[r[18]||=i(`h2`,{class:`component-demo-view__section-title`},`可清空`,-1),i(`div`,ge,[c(t(l),{modelValue:L.value,"onUpdate:modelValue":r[5]||=e=>L.value=e,options:o.value,clearable:``,placeholder:`可清空`},null,8,[`modelValue`,`options`])]),i(`div`,_e,[c(e,{code:Oe,language:`vue`,title:`示例代码`})])]),i(`section`,ve,[r[19]||=i(`h2`,{class:`component-demo-view__section-title`},`多选模式`,-1),i(`div`,ye,[c(t(l),{modelValue:R.value,"onUpdate:modelValue":r[6]||=e=>R.value=e,options:o.value,multiple:``,clearable:``,placeholder:`请选择`},null,8,[`modelValue`,`options`]),i(`span`,be,`选中值: `+n(R.value),1)]),i(`div`,xe,[c(e,{code:ke,language:`vue`,title:`示例代码`})])]),i(`section`,u,[r[20]||=i(`h2`,{class:`component-demo-view__section-title`},`多选折叠`,-1),i(`div`,d,[c(t(l),{modelValue:z.value,"onUpdate:modelValue":r[7]||=e=>z.value=e,options:N.value,multiple:``,"max-collapse-tags":2,placeholder:`最多显示2个标签`},null,8,[`modelValue`,`options`])]),i(`div`,f,[c(e,{code:Ae,language:`vue`,title:`示例代码`})])]),i(`section`,p,[r[21]||=i(`h2`,{class:`component-demo-view__section-title`},`可搜索`,-1),i(`div`,m,[c(t(l),{modelValue:B.value,"onUpdate:modelValue":r[8]||=e=>B.value=e,options:N.value,filterable:``,clearable:``,placeholder:`请选择或搜索`},null,8,[`modelValue`,`options`])]),i(`div`,h,[c(e,{code:je,language:`vue`,title:`示例代码`})])]),i(`section`,g,[r[22]||=i(`h2`,{class:`component-demo-view__section-title`},`远程搜索`,-1),i(`div`,_,[c(t(l),{modelValue:V.value,"onUpdate:modelValue":r[9]||=e=>V.value=e,options:H.value,filterable:``,loading:U.value,onRemoteMethod:ze,placeholder:`请输入关键词搜索`},null,8,[`modelValue`,`options`,`loading`])]),i(`div`,v,[c(e,{code:Me,language:`vue`,title:`示例代码`})])]),i(`section`,y,[r[23]||=i(`h2`,{class:`component-demo-view__section-title`},`创建新条目`,-1),i(`div`,b,[c(t(l),{modelValue:W.value,"onUpdate:modelValue":r[10]||=e=>W.value=e,options:G.value,filterable:``,"allow-create":``,onCreate:Be,placeholder:`请选择或输入`},null,8,[`modelValue`,`options`])]),i(`div`,x,[c(e,{code:Ne,language:`vue`,title:`示例代码`})])]),i(`section`,S,[r[24]||=i(`h2`,{class:`component-demo-view__section-title`},`虚拟滚动`,-1),i(`div`,C,[c(t(l),{modelValue:K.value,"onUpdate:modelValue":r[11]||=e=>K.value=e,options:Ve.value,"virtual-scroll":``,"visible-count":8,"item-height":34,filterable:``,placeholder:`从10000条数据中搜索`},null,8,[`modelValue`,`options`]),i(`span`,w,`选中值: `+n(K.value),1)]),i(`div`,T,[c(e,{code:Pe,language:`vue`,title:`示例代码`})])]),i(`section`,E,[r[25]||=i(`h2`,{class:`component-demo-view__section-title`},`带禁用选项`,-1),i(`div`,D,[c(t(l),{modelValue:q.value,"onUpdate:modelValue":r[12]||=e=>q.value=e,options:He.value,placeholder:`请选择`},null,8,[`modelValue`,`options`])]),i(`div`,O,[c(e,{code:Fe,language:`vue`,title:`示例代码`})])]),i(`section`,k,[r[27]||=i(`h2`,{class:`component-demo-view__section-title`},`事件监听`,-1),i(`div`,A,[c(t(l),{modelValue:J.value,"onUpdate:modelValue":r[13]||=e=>J.value=e,options:o.value,clearable:``,placeholder:`请选择`,onChange:Ue,onVisibleChange:We,onClear:Ge,onFocus:Ke,onBlur:Z},null,8,[`modelValue`,`options`])]),i(`div`,j,[r[26]||=i(`h4`,null,`事件日志:`,-1),i(`ul`,null,[(a(!0),s(ne,null,ee(Y.value,(e,t)=>(a(),s(`li`,{key:t,class:`log-item`},n(e),1))),128))])]),i(`div`,M,[c(e,{code:Ie,language:`vue`,title:`示例代码`})])]),i(`section`,Se,[r[28]||=i(`h2`,{class:`component-demo-view__section-title`},`方法调用`,-1),i(`div`,Ce,[c(t(l),{ref_key:`methodSelectRef`,ref:Q,modelValue:$.value,"onUpdate:modelValue":r[14]||=e=>$.value=e,options:o.value,placeholder:`请选择`},null,8,[`modelValue`,`options`]),i(`div`,{class:`demo-buttons`},[i(`button`,{class:`demo-btn`,onClick:qe},`聚焦`),i(`button`,{class:`demo-btn`,onClick:Je},`失焦`),i(`button`,{class:`demo-btn`,onClick:Ye},`清空`),i(`button`,{class:`demo-btn`,onClick:Xe},`打开下拉`),i(`button`,{class:`demo-btn`,onClick:Ze},`关闭下拉`)])]),i(`div`,we,[c(e,{code:Le,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-9299624e`]]);export{N as default};
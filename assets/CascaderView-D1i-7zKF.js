import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,J as n,N as r,S as i,U as a,V as o,f as s,h as c,j as l,r as u,v as d,x as f}from"./index-D6beBo5R.js";import"./Checkbox-D12jTAwt.js";import"./checkbox-iwRIBZgQ.js";import"./radio-Cmz2JtJ6.js";import"./Scroll-XMJ7tVR9.js";import"./scroll-c5qCqZ4j.js";import{t as p}from"./Cascader-DWp1Fd8q.js";const m=[{value:`beijing`,label:`北京市`,children:[{value:`haidian`,label:`海淀区`,children:[{value:`zhongguancun`,label:`中关村`},{value:`wudaokou`,label:`五道口`}]},{value:`chaoyang`,label:`朝阳区`,children:[{value:`sanlitun`,label:`三里屯`},{value:`guomao`,label:`国贸`}]}]},{value:`shanghai`,label:`上海市`,children:[{value:`pudong`,label:`浦东新区`,children:[{value:`lujiazui`,label:`陆家嘴`},{value:`zhangjiang`,label:`张江`}]},{value:`huangpu`,label:`黄浦区`,children:[{value:`nanjinglu`,label:`南京路`},{value:`waitan`,label:`外滩`}]}]},{value:`guangdong`,label:`广东省`,children:[{value:`guangzhou`,label:`广州市`,children:[{value:`tianhe`,label:`天河区`},{value:`yuexiu`,label:`越秀区`}]},{value:`shenzhen`,label:`深圳市`,children:[{value:`nanshan`,label:`南山区`},{value:`futian`,label:`福田区`}]}]},{value:`zhejiang`,label:`浙江省`,children:[{value:`hangzhou`,label:`杭州市`,children:[{value:`xihu`,label:`西湖区`},{value:`binjiang`,label:`滨江区`}]},{value:`ningbo`,label:`宁波市`,children:[{value:`haishu`,label:`海曙区`},{value:`yinzhou`,label:`鄞州区`}]}]},{value:`jiangsu`,label:`江苏省`,children:[{value:`nanjing`,label:`南京市`,children:[{value:`xuanwu`,label:`玄武区`},{value:`qinhuai`,label:`秦淮区`}]},{value:`suzhou`,label:`苏州市`,children:[{value:`gusu`,label:`姑苏区`},{value:`sip`,label:`工业园区`}]}]}],h=a([]),g=a([`beijing`,`haidian`,`zhongguancun`]),_=a([]),v=a([`guangdong`,`guangzhou`,`tianhe`]),y=a([`beijing`,`chaoyang`,`sanlitun`]),b=a([]),x=a([]),S=a([]),C=a([]),w=a([]),T=a([]),E=a([]),D=e=>{E.value.unshift(`change: ${JSON.stringify(e)}`),E.value.length>5&&E.value.pop()},O=e=>{E.value.unshift(`expand-change: ${JSON.stringify(e)}`),E.value.length>5&&E.value.pop()},k=e=>{E.value.unshift(`visible-change: ${e}`),E.value.length>5&&E.value.pop()},A=()=>{E.value.unshift(`clear`),E.value.length>5&&E.value.pop()};var j={class:`component-demo-view`},M={class:`component-demo-view__section`},N={class:`component-demo-view__demo`},P={class:`demo-value`},F={class:`component-demo-view__code`},I={class:`component-demo-view__section`},L={class:`component-demo-view__demo`},R={style:{display:`flex`,gap:`16px`,"align-items":`center`}},z={class:`component-demo-view__code`},B={class:`component-demo-view__section`},V={class:`component-demo-view__demo`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo`},G={class:`component-demo-view__code`},K={class:`component-demo-view__section`},q={class:`component-demo-view__demo`},ee={style:{display:`flex`,gap:`16px`,"align-items":`center`}},J={class:`component-demo-view__code`},Y={class:`component-demo-view__section`},X={class:`component-demo-view__demo`},Z={style:{display:`flex`,gap:`16px`,"align-items":`flex-start`,"flex-direction":`column`}},Q={class:`component-demo-view__code`},$={class:`component-demo-view__section`},te={class:`component-demo-view__demo`},ne={class:`component-demo-view__code`},re={class:`component-demo-view__section`},ie={class:`component-demo-view__demo`},ae={style:{display:`flex`,gap:`16px`,"align-items":`center`}},oe={class:`component-demo-view__code`},se={class:`component-demo-view__section`},ce={class:`component-demo-view__demo`,style:{"flex-direction":`column`,gap:`16px`,"align-items":`flex-start`}},le={style:{display:`flex`,gap:`16px`,"align-items":`center`}},ue={class:`demo-value`},de={style:{display:`flex`,gap:`16px`,"align-items":`flex-start`}},fe={class:`demo-value`},pe={class:`component-demo-view__code`},me={class:`component-demo-view__section`},he={class:`component-demo-view__demo`},ge={class:`event-log`},_e={class:`component-demo-view__code`},ve=u(i({__name:`index`,setup(i){return(i,a)=>(l(),d(`div`,j,[a[38]||=c(`div`,{class:`component-demo-view__header`},[c(`h1`,{class:`component-demo-view__title`},`Cascader 级联选择器`),c(`p`,{class:`component-demo-view__description`},` 级联选择器用于多层级数据的逐级选择，适用于省市区、分类选择等场景。 `)],-1),c(`section`,M,[a[16]||=c(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),a[17]||=c(`p`,{class:`component-demo-view__section-desc`},` 级联选择器通过多级菜单展示数据，点击选项展开下一级。 `,-1),c(`div`,N,[f(t(p),{modelValue:t(h),"onUpdate:modelValue":a[0]||=e=>o(h)?h.value=e:null,options:t(m),placeholder:`请选择地区`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),c(`span`,P,`当前值: `+n(t(h)),1)]),c(`div`,F,[f(e,{code:`<template>
  <AleCascader
    v-model="value"
    :options="options"
    placeholder="请选择地区"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCascader } from 'ale-ui';
import type { CascaderOption } from 'ale-ui';

const value = ref<(string | number)[]>([]);

const options: CascaderOption[] = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'zhongguancun', label: '中关村' },
          { value: 'wudaokou', label: '五道口' }
        ]
      },
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'sanlitun', label: '三里屯' },
          { value: 'guomao', label: '国贸' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      {
        value: 'pudong',
        label: '浦东新区',
        children: [
          { value: 'lujiazui', label: '陆家嘴' },
          { value: 'zhangjiang', label: '张江' }
        ]
      },
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          { value: 'nanjinglu', label: '南京路' },
          { value: 'waitan', label: '外滩' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' }
        ]
      }
    ]
  }
];
<\/script>`,language:`vue`,title:`基础用法`},null,8,[`code`])])]),c(`section`,I,[a[18]||=c(`h2`,{class:`component-demo-view__section-title`},`显示完整路径`,-1),a[19]||=c(`p`,{class:`component-demo-view__section-desc`},` 设置 showAllLevels 控制是否显示完整路径，默认显示。 `,-1),c(`div`,L,[c(`div`,R,[f(t(p),{modelValue:t(g),"onUpdate:modelValue":a[1]||=e=>o(g)?g.value=e:null,options:t(m),"show-all-levels":!0,placeholder:`显示完整路径`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),f(t(p),{modelValue:t(g),"onUpdate:modelValue":a[2]||=e=>o(g)?g.value=e:null,options:t(m),"show-all-levels":!1,placeholder:`只显示最后一级`,style:{width:`300px`}},null,8,[`modelValue`,`options`])])]),c(`div`,z,[f(e,{code:`<template>
  <!-- 显示完整路径 -->
  <AleCascader
    v-model="value"
    :options="options"
    :show-all-levels="true"
    placeholder="显示完整路径"
  />
  
  <!-- 只显示最后一级 -->
  <AleCascader
    v-model="value"
    :options="options"
    :show-all-levels="false"
    placeholder="只显示最后一级"
  />
</template>`,language:`vue`,title:`显示完整路径`},null,8,[`code`])])]),c(`section`,B,[a[20]||=c(`h2`,{class:`component-demo-view__section-title`},`自定义分隔符`,-1),a[21]||=c(`p`,{class:`component-demo-view__section-desc`},` 通过 separator 属性自定义路径分隔符。 `,-1),c(`div`,V,[f(t(p),{modelValue:t(_),"onUpdate:modelValue":a[3]||=e=>o(_)?_.value=e:null,options:t(m),separator:` > `,placeholder:`自定义分隔符`,style:{width:`300px`}},null,8,[`modelValue`,`options`])]),c(`div`,H,[f(e,{code:`<template>
  <AleCascader
    v-model="value"
    :options="options"
    separator=" > "
    placeholder="自定义分隔符"
  />
</template>`,language:`vue`,title:`自定义分隔符`},null,8,[`code`])])]),c(`section`,U,[a[22]||=c(`h2`,{class:`component-demo-view__section-title`},`可清空`,-1),a[23]||=c(`p`,{class:`component-demo-view__section-desc`},` 设置 clearable 属性显示清空按钮，悬停时显示。 `,-1),c(`div`,W,[f(t(p),{modelValue:t(v),"onUpdate:modelValue":a[4]||=e=>o(v)?v.value=e:null,options:t(m),clearable:``,placeholder:`可清空的选择器`,style:{width:`300px`}},null,8,[`modelValue`,`options`])]),c(`div`,G,[f(e,{code:`<template>
  <AleCascader
    v-model="value"
    :options="options"
    clearable
    placeholder="可清空的选择器"
  />
</template>`,language:`vue`,title:`可清空`},null,8,[`code`])])]),c(`section`,K,[a[24]||=c(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),a[25]||=c(`p`,{class:`component-demo-view__section-desc`},` 设置 disabled 属性禁用选择器。 `,-1),c(`div`,q,[c(`div`,ee,[f(t(p),{modelValue:t(y),"onUpdate:modelValue":a[5]||=e=>o(y)?y.value=e:null,options:t(m),disabled:``,placeholder:`禁用状态`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),f(t(p),{modelValue:t(y),"onUpdate:modelValue":a[6]||=e=>o(y)?y.value=e:null,options:t(m),placeholder:`正常状态`,style:{width:`300px`}},null,8,[`modelValue`,`options`])])]),c(`div`,J,[f(e,{code:`<template>
  <!-- 禁用状态 -->
  <AleCascader
    v-model="value"
    :options="options"
    disabled
    placeholder="禁用状态"
  />
  
  <!-- 正常状态 -->
  <AleCascader
    v-model="value"
    :options="options"
    placeholder="正常状态"
  />
</template>`,language:`vue`,title:`禁用状态`},null,8,[`code`])])]),c(`section`,Y,[a[26]||=c(`h2`,{class:`component-demo-view__section-title`},`尺寸`,-1),a[27]||=c(`p`,{class:`component-demo-view__section-desc`},` 提供 large、medium、small 三种尺寸。 `,-1),c(`div`,X,[c(`div`,Z,[f(t(p),{modelValue:t(b),"onUpdate:modelValue":a[7]||=e=>o(b)?b.value=e:null,options:t(m),size:`large`,placeholder:`大尺寸`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),f(t(p),{modelValue:t(b),"onUpdate:modelValue":a[8]||=e=>o(b)?b.value=e:null,options:t(m),size:`medium`,placeholder:`中等尺寸（默认）`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),f(t(p),{modelValue:t(b),"onUpdate:modelValue":a[9]||=e=>o(b)?b.value=e:null,options:t(m),size:`small`,placeholder:`小尺寸`,style:{width:`300px`}},null,8,[`modelValue`,`options`])])]),c(`div`,Q,[f(e,{code:`<template>
  <AleCascader v-model="value" :options="options" size="large" placeholder="大尺寸" />
  <AleCascader v-model="value" :options="options" size="medium" placeholder="中等尺寸" />
  <AleCascader v-model="value" :options="options" size="small" placeholder="小尺寸" />
</template>`,language:`vue`,title:`尺寸`},null,8,[`code`])])]),c(`section`,$,[a[28]||=c(`h2`,{class:`component-demo-view__section-title`},`可搜索`,-1),a[29]||=c(`p`,{class:`component-demo-view__section-desc`},` 设置 filterable 属性启用搜索功能，支持搜索任意级别的选项。 `,-1),c(`div`,te,[f(t(p),{modelValue:t(x),"onUpdate:modelValue":a[10]||=e=>o(x)?x.value=e:null,options:t(m),filterable:``,placeholder:`可搜索的选择器`,style:{width:`300px`}},null,8,[`modelValue`,`options`])]),c(`div`,ne,[f(e,{code:`<template>
  <AleCascader
    v-model="value"
    :options="options"
    filterable
    placeholder="可搜索的选择器"
  />
</template>`,language:`vue`,title:`可搜索`},null,8,[`code`])])]),c(`section`,re,[a[30]||=c(`h2`,{class:`component-demo-view__section-title`},`展开方式`,-1),a[31]||=c(`p`,{class:`component-demo-view__section-desc`},` 支持 click（点击展开）和 hover（悬停展开）两种方式。 `,-1),c(`div`,ie,[c(`div`,ae,[f(t(p),{modelValue:t(S),"onUpdate:modelValue":a[11]||=e=>o(S)?S.value=e:null,options:t(m),"expand-trigger":`click`,placeholder:`点击展开`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),f(t(p),{modelValue:t(S),"onUpdate:modelValue":a[12]||=e=>o(S)?S.value=e:null,options:t(m),"expand-trigger":`hover`,placeholder:`悬停展开`,style:{width:`300px`}},null,8,[`modelValue`,`options`])])]),c(`div`,oe,[f(e,{code:`<template>
  <!-- 点击展开 -->
  <AleCascader
    v-model="value"
    :options="options"
    expand-trigger="click"
    placeholder="点击展开"
  />
  
  <!-- 悬停展开 -->
  <AleCascader
    v-model="value"
    :options="options"
    expand-trigger="hover"
    placeholder="悬停展开"
  />
</template>`,language:`vue`,title:`展开方式`},null,8,[`code`])])]),c(`section`,se,[a[34]||=c(`h2`,{class:`component-demo-view__section-title`},`选择任意节点`,-1),a[35]||=c(`p`,{class:`component-demo-view__section-desc`},` 设置 check-strictly 属性可以选择任意一级节点，支持 single（单选）和 multiple（多选）两种模式。 `,-1),c(`div`,ce,[c(`div`,le,[a[32]||=c(`span`,{style:{width:`80px`,color:`var(--color-text-secondary)`}},`单选模式:`,-1),f(t(p),{modelValue:t(C),"onUpdate:modelValue":a[13]||=e=>o(C)?C.value=e:null,options:t(m),"check-strictly":`single`,placeholder:`单选任意节点`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),c(`span`,ue,`当前值: `+n(t(C)),1)]),c(`div`,de,[a[33]||=c(`span`,{style:{width:`80px`,color:`var(--color-text-secondary)`}},`多选模式:`,-1),f(t(p),{modelValue:t(w),"onUpdate:modelValue":a[14]||=e=>o(w)?w.value=e:null,options:t(m),"check-strictly":`multiple`,placeholder:`多选任意节点`,style:{width:`300px`}},null,8,[`modelValue`,`options`]),c(`span`,fe,`当前值: `+n(JSON.stringify(t(w))),1)])]),c(`div`,pe,[f(e,{code:`<template>
  <!-- 单选任意节点 -->
  <AleCascader
    v-model="singleValue"
    :options="options"
    check-strictly="single"
    placeholder="单选任意节点"
  />
  
  <!-- 多选任意节点 -->
  <AleCascader
    v-model="multipleValue"
    :options="options"
    check-strictly="multiple"
    placeholder="多选任意节点"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCascader } from 'ale-ui';

// 单选模式：值为一维数组
const singleValue = ref<(string | number)[]>([]);

// 多选模式：值为二维数组
const multipleValue = ref<(string | number)[][]>([]);
<\/script>`,language:`vue`,title:`选择任意节点`},null,8,[`code`])])]),c(`section`,me,[a[36]||=c(`h2`,{class:`component-demo-view__section-title`},`事件`,-1),a[37]||=c(`p`,{class:`component-demo-view__section-desc`},` 监听 change、expand-change、visible-change 等事件。 `,-1),c(`div`,he,[f(t(p),{modelValue:t(T),"onUpdate:modelValue":a[15]||=e=>o(T)?T.value=e:null,options:t(m),placeholder:`监听事件`,style:{width:`300px`},onChange:t(D),onExpandChange:t(O),onVisibleChange:t(k),onClear:t(A)},null,8,[`modelValue`,`options`,`onChange`,`onExpandChange`,`onVisibleChange`,`onClear`]),c(`div`,ge,[(l(!0),d(s,null,r(t(E),(e,t)=>(l(),d(`p`,{key:t},n(e),1))),128))])]),c(`div`,_e,[f(e,{code:`<template>
  <AleCascader
    v-model="value"
    :options="options"
    @change="handleChange"
    @expand-change="handleExpandChange"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<(string | number)[]>([]);

const handleChange = (value) => {
  console.log('change:', value);
};

const handleExpandChange = (value) => {
  console.log('expand-change:', value);
};

const handleVisibleChange = (visible) => {
  console.log('visible-change:', visible);
};

const handleClear = () => {
  console.log('clear');
};
<\/script>`,language:`vue`,title:`事件`},null,8,[`code`])])])]))}}),[[`__scopeId`,`data-v-e31f9cfa`]]);export{ve as default};
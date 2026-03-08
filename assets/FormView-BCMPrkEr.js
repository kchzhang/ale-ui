import{t as e}from"./CodeBlock-CmDK_EYq.js";import{B as t,G as n,H as r,J as i,K as a,M as o,N as s,O as c,P as l,R as u,S as d,T as f,U as p,_ as m,b as h,d as g,f as _,g as v,h as y,i as b,j as x,k as ee,l as S,m as C,q as w,r as T,v as E,x as D,z as O}from"./index-D6beBo5R.js";import{t as k}from"./button-CbFeg90j.js";import{n as A,t as j}from"./input-B7Q9UE5n.js";import{n as M,t as N}from"./select-CYUd20oF.js";import"./Checkbox-D12jTAwt.js";import{n as P,t as F}from"./checkbox-iwRIBZgQ.js";import{n as I,t as te}from"./radio-Cmz2JtJ6.js";import{t as ne}from"./Switch-JxyvskAR.js";import{t as L}from"./message-D509qMm3.js";import"./Scroll-XMJ7tVR9.js";import"./scroll-c5qCqZ4j.js";import{t as re}from"./Cascader-DWp1Fd8q.js";import{t as ie}from"./upload-ybRLlo2Y.js";var R=d({__name:`Form`,props:{model:{},layout:{default:`vertical`},labelPosition:{default:`left`},labelWidth:{},size:{default:`medium`},disabled:{type:Boolean,default:!1},showRequiredMark:{type:Boolean,default:!0},labelGap:{default:8}},emits:[`submit`,`validate-fail`,`field-change`],setup(e,{expose:t,emit:n}){let i=e,s=n,c=p(new Map),u=p(new Map),d=r({}),f=C(()=>{let e={"ale-form":!0,[`ale-form--${i.layout}`]:!0,[`ale-form--${i.size}`]:!!i.size};return i.disabled&&(e[`is-disabled`]=!0),e}),m=(e,t,n)=>{u.value.set(e,t),n&&c.value.set(e,n)},h=e=>{u.value.delete(e),c.value.delete(e)},_=(e,t)=>{i.model[e]=t,s(`field-change`,e,t,{...i.model})},v=(e,t,n)=>{t?delete d[e]:d[e]=n},y=e=>{let t=c.value.get(e);t?.rules&&t.rules.some(e=>{let t=e.trigger;return t===`focus`||Array.isArray(t)&&t.includes(`focus`)})&&S(e)},b=e=>{let t=c.value.get(e);t?.rules&&t.rules.some(e=>{let t=e.trigger;return t===`blur`||Array.isArray(t)&&t.includes(`blur`)})&&S(e)},ee=(e,t)=>{let n=c.value.get(e);n?c.value.set(e,{...n,...t}):c.value.set(e,{name:e,...t})},S=async e=>{let t=u.value.get(e);return t&&t.validate?t.validate():{valid:!0,errors:[]}},w=async()=>{let e=Array.from(u.value.keys()),t={},n=!0;for(let r of e){let e=await S(r);e.valid||(n=!1,t[r]=e.errors)}return{valid:n,errors:t}},T=async e=>{if(Array.isArray(e)){let t={},n=!0;for(let r of e){let e=await S(r);e.valid||(n=!1,t[r]=e.errors)}return{valid:n,errors:t}}let t=await S(e);return{valid:t.valid,errors:t.valid?{}:{[e]:t.errors}}},D=async()=>{let e=await w();e.valid?s(`submit`,{...i.model}):s(`validate-fail`,e.errors)},O=e=>{if(e===void 0)Object.keys(d).forEach(e=>{delete d[e]}),u.value.forEach(e=>{e.clearValidate&&e.clearValidate()});else if(Array.isArray(e))e.forEach(e=>{delete d[e];let t=u.value.get(e);t&&t.clearValidate&&t.clearValidate()});else{delete d[e];let t=u.value.get(e);t&&t.clearValidate&&t.clearValidate()}};return o(A,{model:i.model,layout:C(()=>i.layout),labelPosition:C(()=>i.labelPosition),labelWidth:C(()=>i.labelWidth),size:C(()=>i.size),disabled:C(()=>i.disabled),showRequiredMark:C(()=>i.showRequiredMark),labelGap:C(()=>i.labelGap),registerField:m,unregisterField:h,onFieldChange:_,onFieldValidate:v,updateFieldConfig:ee,onFieldFocus:y,onFieldBlur:b}),t({validate:w,validateField:T,resetFields:()=>{Object.keys(i.model).forEach(e=>{let t=c.value.get(e);if(t&&t.defaultValue!==void 0)i.model[e]=t.defaultValue;else{let t=i.model[e];Array.isArray(t)?i.model[e]=[]:typeof t==`object`&&t?i.model[e]={}:i.model[e]=``}let n=u.value.get(e);n&&n.resetField&&n.resetField()}),O()},clearValidate:O,getFormData:()=>({...i.model}),setFormData:e=>{Object.keys(e).forEach(t=>{t in i.model&&(i.model[t]=e[t])})}}),(e,t)=>(x(),E(`form`,{class:a(f.value),onSubmit:g(D,[`prevent`])},[l(e.$slots,`default`)],34))}}),ae={key:0,class:`ale-form-item__required`},oe={class:`ale-form-item__content`},se={class:`ale-form-item__error-wrapper`},ce={key:0,class:`ale-form-item__extra`},z=d({__name:`FormItem`,props:{name:{},label:{},rules:{},labelWidth:{},required:{type:Boolean,default:!1},error:{},showError:{type:Boolean,default:!0},extra:{},labelHeightMode:{default:`adaptive`},multiline:{type:Boolean,default:!1}},emits:[`validate`],setup(e,{expose:n,emit:r}){let o=e,s=r,d=f(A),g=p(``),_=p(!1),v=C(()=>!!(o.required||o.rules&&o.rules.some(e=>e.required))),T=C(()=>{let e=[];return o.rules&&e.push(...o.rules),e}),k=C(()=>o.showError!==!1);function j(e,t){return e===void 0?t:typeof e==`object`&&e&&`value`in e?e.value:e}let M=C(()=>j(d?.layout,`vertical`)),N=C(()=>j(d?.size,`medium`)),P=C(()=>j(d?.labelPosition,`left`)),F=C(()=>o.labelWidth===void 0?j(d?.labelWidth,void 0):o.labelWidth),I=C(()=>j(d?.labelGap,8)),te=C(()=>j(d?.disabled,!1)===!0),ne=C(()=>({"ale-form-item":!0,[`ale-form-item--${M.value}`]:!0,[`ale-form-item--${N.value}`]:N.value,"is-required":v.value,"is-error":_.value,"is-disabled":te.value})),L=C(()=>{let e={};return M.value===`horizontal`&&(e.gap=`${typeof I.value==`number`?I.value:parseInt(I.value)}px`),e}),re=C(()=>({"ale-form-item__label":!0,[`ale-form-item__label--${P.value}`]:P.value,[`ale-form-item__label--${N.value}`]:N.value,"is-fixed-height":o.labelHeightMode===`fixed`,"is-auto-height":o.labelHeightMode===`auto`,"is-multiline":o.multiline})),ie=C(()=>{let e={};return M.value===`horizontal`&&F.value!==void 0&&(e.width=typeof F.value==`number`?`${F.value}px`:F.value,e.flexShrink=`0`),e}),R=(e,t)=>{if(!e||!t)return;let n=t.split(`.`),r=e;for(let e of n){if(r==null)return;r=r[e]}return r},z=C(()=>{if(!(!o.name||!d))return R(d.model,o.name)}),le=async(e,t)=>{if(t.required&&(e==null||e===``||Array.isArray(e)&&e.length===0))return t.requiredMessage||t.message||`此项为必填项`;if(e==null||e===``)return``;if(t.minLength!==void 0&&(Array.isArray(e)?e.length:String(e).length)<t.minLength)return t.message||`长度不能少于 ${t.minLength} 个字符`;if(t.maxLength!==void 0&&(Array.isArray(e)?e.length:String(e).length)>t.maxLength)return t.message||`长度不能超过 ${t.maxLength} 个字符`;if(t.min!==void 0){let n=Number(e);if(!isNaN(n)&&n<t.min)return t.message||`不能小于 ${t.min}`}if(t.max!==void 0){let n=Number(e);if(!isNaN(n)&&n>t.max)return t.message||`不能大于 ${t.max}`}if(t.pattern&&!t.pattern.test(String(e)))return t.message||`格式不正确`;if(t.validator){let n=await t.validator(e,d?.model||{});if(n===!1)return t.message||`验证失败`;if(typeof n==`string`)return n}return``},B=async()=>{if(!o.name||T.value.length===0)return{valid:!0,errors:[]};let e=z.value,t=[];for(let n of T.value){let r=await le(e,n);r&&t.push(r)}let n=t.length===0;return _.value=!n,g.value=n?``:t[0]||``,d&&o.name&&d.onFieldValidate(o.name,n,t),s(`validate`,o.name,n,t),{valid:n,errors:t}},V=()=>{_.value=!1,g.value=``},H=()=>{V(),d&&o.name&&d.onFieldChange(o.name,``)};u(()=>z.value,(e,t)=>{o.name&&e!==t&&T.value.some(e=>{let t=e.trigger;return!t||t===`change`||Array.isArray(t)&&t.includes(`change`)})&&B(),_.value&&o.name&&B()});let ue=()=>{d&&o.name&&d.onFieldFocus?.(o.name)},de=()=>{d&&o.name&&d.onFieldBlur?.(o.name)};return u(()=>o.error,e=>{e?(g.value=e,_.value=!0):V()},{immediate:!0}),c(()=>{if(d&&o.name){let e={validate:B,clearValidate:V,resetField:H};d.registerField(o.name,e)}}),ee(()=>{d&&o.name&&d.unregisterField(o.name)}),n({validate:B,clearValidate:V,resetField:H}),(n,r)=>(x(),E(`div`,{class:a(ne.value),style:w(L.value)},[e.label||n.$slots.label?(x(),E(`label`,{key:0,class:a(re.value),style:w(ie.value)},[v.value?(x(),E(`span`,ae,`*`)):m(``,!0),l(n.$slots,`label`,{},()=>[h(i(e.label),1)])],6)):m(``,!0),y(`div`,oe,[l(n.$slots,`default`,{size:N.value,onFocus:ue,onBlur:de}),y(`div`,se,[D(b,{name:`ale-form-error`},{default:O(()=>[t(y(`div`,{class:`ale-form-item__error`},i(g.value),513),[[S,k.value&&g.value]])]),_:1})]),e.extra&&!g.value?(x(),E(`div`,ce,i(e.extra),1)):m(``,!0)])],6))}});const le=[{param:`model`,desc:`表单数据对象（必填）`,type:`object`,default:`-`},{param:`layout`,desc:`表单布局`,type:`'horizontal' | 'vertical' | 'inline'`,default:`'vertical'`},{param:`labelPosition`,desc:`标签位置`,type:`'left' | 'right' | 'top'`,default:`'right'`},{param:`labelWidth`,desc:`标签宽度`,type:`string | number`,default:`120`},{param:`size`,desc:`表单尺寸`,type:`'large' | 'medium' | 'small'`,default:`'medium'`},{param:`disabled`,desc:`是否禁用整个表单`,type:`boolean`,default:`false`},{param:`showRequiredMark`,desc:`是否显示必填标记`,type:`boolean`,default:`true`}],B=[{method:`validate`,desc:`验证整个表单`,params:`-`},{method:`validateField`,desc:`验证指定字段`,params:`field: string | string[]`},{method:`resetFields`,desc:`重置表单字段`,params:`-`},{method:`clearValidate`,desc:`清除验证状态`,params:`field?: string | string[]`},{method:`getFormData`,desc:`获取表单数据`,params:`-`},{method:`setFormData`,desc:`设置表单数据`,params:`data: object`}],V=[{param:`name`,desc:`字段名称`,type:`string`,default:`-`},{param:`label`,desc:`标签文本`,type:`string`,default:`-`},{param:`rules`,desc:`验证规则`,type:`FormRule[]`,default:`-`},{param:`required`,desc:`是否必填`,type:`boolean`,default:`false`},{param:`extra`,desc:`额外提示信息`,type:`string`,default:`-`}],H=[{rule:`required`,desc:`是否必填`,example:`{ required: true, message: '不能为空' }`},{rule:`minLength`,desc:`最小长度`,example:`{ minLength: 3, message: '至少3个字符' }`},{rule:`maxLength`,desc:`最大长度`,example:`{ maxLength: 20, message: '最多20个字符' }`},{rule:`min`,desc:`最小值`,example:`{ min: 18, message: '不能小于18' }`},{rule:`max`,desc:`最大值`,example:`{ max: 100, message: '不能大于100' }`},{rule:`pattern`,desc:`正则表达式`,example:`{ pattern: /^\\d+$/, message: '只能是数字' }`},{rule:`validator`,desc:`自定义验证函数`,example:`{ validator: (value) => value > 0 }`}];var ue={class:`component-demo-view__section`},de={class:`api-table`},fe={key:0},pe={key:1},me=T(d({__name:`ApiSection`,setup(e){let t=[{title:`Form Props`,columns:[`参数`,`说明`,`类型`,`默认值`],data:le.map(e=>({参数:e.param,说明:e.desc,类型:e.type,默认值:e.default}))},{title:`Form 方法`,columns:[`方法名`,`说明`,`参数`],data:B.map(e=>({方法名:e.method,说明:e.desc,参数:e.params}))},{title:`FormItem Props`,columns:[`参数`,`说明`,`类型`,`默认值`],data:V.map(e=>({参数:e.param,说明:e.desc,类型:e.type,默认值:e.default}))},{title:`验证规则`,columns:[`规则`,`说明`,`示例`],data:H.map(e=>({规则:e.rule,说明:e.desc,示例:e.example}))}],n=e=>[`类型`,`默认值`,`参数`,`示例`].includes(e),r=(e,t)=>e[t]||`-`;return(e,a)=>(x(),E(`section`,ue,[a[0]||=y(`h2`,{class:`component-demo-view__section-title`},`API 说明`,-1),(x(),E(_,null,s(t,(e,t)=>y(`div`,{key:t,class:`api-section`},[y(`h3`,null,i(e.title),1),y(`table`,de,[y(`thead`,null,[y(`tr`,null,[(x(!0),E(_,null,s(e.columns,e=>(x(),E(`th`,{key:e},i(e),1))),128))])]),y(`tbody`,null,[(x(!0),E(_,null,s(e.data,(t,a)=>(x(),E(`tr`,{key:a},[(x(!0),E(_,null,s(e.columns,e=>(x(),E(`td`,{key:e},[n(e)?(x(),E(`code`,fe,i(r(t,e)),1)):(x(),E(`span`,pe,i(r(t,e)),1))]))),128))]))),128))])])])),64))]))}}),[[`__scopeId`,`data-v-55b439c1`]]);const he=[{value:`vertical`,label:`垂直布局`},{value:`horizontal`,label:`水平布局`},{value:`inline`,label:`行内布局`}],ge=[{value:`left`,label:`左对齐`},{value:`right`,label:`右对齐`},{value:`top`,label:`顶部对齐`}],_e=[{value:`large`,label:`大号`},{value:`medium`,label:`中号`},{value:`small`,label:`小号`}],U=r({username:``,email:``,password:``}),ve=[{required:!0,message:`请输入邮箱`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`邮箱格式不正确`}],ye=[{required:!0,message:`请输入密码`},{minLength:6,message:`密码至少6位`}],W=r({name:``,phone:``,address:``}),G=r({nickname:``,bio:``}),K=r({title:``,description:``}),q=r({username:``,email:``,age:``,phone:``}),J=r({username:``,password:``,confirmPassword:``}),be=e=>{let t=/[a-zA-Z]/.test(e),n=/\d/.test(e);return!!(t&&n)},xe=e=>e===J.password?!0:`两次输入的密码不一致`,Y=r({name:`张三`,email:`zhangsan@example.com`}),X=r({username:``,email:``}),Z=r({username:``,description:``,gender:``,hobbies:[],city:``,region:[],skills:[],newsletter:!0,attachments:[],agreement:!1}),Se=[{value:`beijing`,label:`北京市`,children:[{value:`haidian`,label:`海淀区`,children:[{value:`zhongguancun`,label:`中关村`},{value:`wudaokou`,label:`五道口`}]},{value:`chaoyang`,label:`朝阳区`,children:[{value:`sanlitun`,label:`三里屯`},{value:`guomao`,label:`国贸`}]}]},{value:`shanghai`,label:`上海市`,children:[{value:`pudong`,label:`浦东新区`,children:[{value:`lujiazui`,label:`陆家嘴`},{value:`zhangjiang`,label:`张江`}]},{value:`huangpu`,label:`黄浦区`,children:[{value:`nanjinglu`,label:`南京路`},{value:`waitan`,label:`外滩`}]}]},{value:`guangdong`,label:`广东省`,children:[{value:`guangzhou`,label:`广州市`,children:[{value:`tianhe`,label:`天河区`},{value:`yuexiu`,label:`越秀区`}]},{value:`shenzhen`,label:`深圳市`,children:[{value:`nanshan`,label:`南山区`},{value:`futian`,label:`福田区`}]}]}],Ce=e=>e&&e.length>0,we=e=>e&&e.length>0,Te=e=>e&&e.length>0,Ee=e=>e&&e.length>0,De=e=>e===!0;var Oe=1;const Q=r({items:[{id:Oe++,name:``,email:``,role:``,permissions:[]}]}),ke=()=>{Q.items.push({id:Oe++,name:``,email:``,role:``,permissions:[]})},Ae=e=>{Q.items.length>1&&Q.items.splice(e,1)},je=()=>{Q.items=[{id:Oe++,name:``,email:``,role:``,permissions:[]}]},$=r({username:``,email:``,phone:``,password:``}),Me=()=>{$.username=``,$.email=``,$.phone=``,$.password=``};var Ne={class:`component-demo-view`},Pe={class:`component-demo-view__section`},Fe={class:`component-demo-view__demo`},Ie={class:`form-actions`},Le={class:`component-demo-view__code`},Re={class:`component-demo-view__section`},ze={class:`form-layout-tabs`},Be=[`onClick`],Ve={class:`component-demo-view__demo`},He={class:`component-demo-view__code`},Ue={class:`component-demo-view__section`},We={class:`form-layout-tabs`},Ge=[`onClick`],Ke={class:`component-demo-view__demo`},qe={class:`component-demo-view__code`},Je={class:`component-demo-view__section`},Ye={class:`form-layout-tabs`},Xe=[`onClick`],Ze={class:`component-demo-view__demo`},Qe={class:`component-demo-view__code`},$e={class:`component-demo-view__section`},et={class:`component-demo-view__demo`},tt={class:`form-actions`},nt={class:`component-demo-view__code`},rt={class:`component-demo-view__section`},it={class:`component-demo-view__demo`},at={class:`component-demo-view__code`},ot={class:`component-demo-view__section`},st={class:`component-demo-view__demo`},ct={class:`component-demo-view__code`},lt={class:`component-demo-view__section`},ut={class:`component-demo-view__demo`},dt={class:`component-demo-view__code`},ft={class:`component-demo-view__section`},pt={class:`component-demo-view__demo`},mt={class:`form-actions`},ht={class:`component-demo-view__code`},gt={class:`component-demo-view__section`},_t={class:`component-demo-view__demo`},vt={class:`dynamic-form-item__header`},yt={class:`dynamic-form-item__title`},bt={class:`form-actions`},xt={class:`component-demo-view__code`},St={class:`component-demo-view__section`},Ct={class:`component-demo-view__demo`},wt={class:`form-actions`},Tt={class:`component-demo-view__code`},Et=T(d({__name:`index`,setup(t){let r=p(`vertical`),o=p(`right`),c=p(`medium`),l=p(),u=e=>{L.success(`提交成功: ${JSON.stringify(e)}`)},d=()=>{U.username=``,U.email=``,U.password=``},f=()=>{U.username=`zhangsan`,U.email=`zhangsan@example.com`,U.password=`Password123`},g=()=>{if(!U.username){L.warning(`用户名不能为空`);return}if(!U.email){L.warning(`邮箱不能为空`);return}if(!/^[^\s@]+@[^\s@]+$/.test(U.email)){L.warning(`邮箱格式不正确`);return}if(!U.password){L.warning(`密码不能为空`);return}L.success(`校验通过！`)},b=()=>{L.success(`布局表单提交成功！`)},ee=e=>{L.success(`标签位置表单提交: ${JSON.stringify(e)}`)},S=e=>{L.success(`尺寸表单提交: ${JSON.stringify(e)}`)},C=()=>{L.success(`验证通过，提交成功！`)},w=()=>{L.error(`表单验证失败，请检查输入`)},T=()=>{L.success(`自定义验证通过！`)},A=()=>{L.success(`全部字段验证通过！`)},ae=()=>{Z.username=``,Z.description=``,Z.gender=``,Z.hobbies=[],Z.city=``,Z.region=[],Z.skills=[],Z.newsletter=!0,Z.attachments=[],Z.agreement=!1},oe=()=>{let e=Q.items.filter(e=>e.name&&e.email&&e.role);L.success(`提交成功！共 ${e.length} 个成员`)},se=()=>{L.success(`验证通过，提交成功！`)};return(t,p)=>(x(),E(`div`,Ne,[p[101]||=y(`div`,{class:`component-demo-view__header`},[y(`h1`,{class:`component-demo-view__title`},`Form 表单`),y(`p`,{class:`component-demo-view__description`},` 具有数据收集、校验和提交功能的表单组件，包含表单域、表单布局、表单验证等功能。 `)],-1),y(`section`,Pe,[p[42]||=y(`h2`,{class:`component-demo-view__section-title`},`基础表单`,-1),y(`div`,Fe,[D(n(R),{model:n(U),onSubmit:u},{default:O(()=>[D(n(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`请输入用户名`}]},{default:O(()=>[D(n(j),{modelValue:n(U).username,"onUpdate:modelValue":p[0]||=e=>n(U).username=e,placeholder:`请输入用户名`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`email`,label:`邮箱`,rules:n(ve)},{default:O(()=>[D(n(j),{modelValue:n(U).email,"onUpdate:modelValue":p[1]||=e=>n(U).email=e,placeholder:`请输入邮箱`,autocomplete:`email`},null,8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),{name:`password`,label:`密码`,rules:n(ye)},{default:O(()=>[D(n(j),{modelValue:n(U).password,"onUpdate:modelValue":p[2]||=e=>n(U).password=e,type:`password`,placeholder:`请输入密码`,autocomplete:`current-password`},null,8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),null,{default:O(()=>[y(`div`,Ie,[D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[38]||=[h(`提交`,-1)]]),_:1}),D(n(k),{onClick:d},{default:O(()=>[...p[39]||=[h(`重置`,-1)]]),_:1}),D(n(k),{type:`success`,onClick:f},{default:O(()=>[...p[40]||=[h(`填充示例数据`,-1)]]),_:1}),D(n(k),{type:`warning`,onClick:g},{default:O(()=>[...p[41]||=[h(`单独校验`,-1)]]),_:1})])]),_:1})]),_:1},8,[`model`])]),y(`div`,Le,[D(e,{code:`<template>
  <AleForm :model="form" @submit="handleSubmit">
    <AleFormItem name="username" label="用户名" :rules="[{ required: true }]">
      <AleInput v-model="form.username" placeholder="请输入用户名" />
    </AleFormItem>
    <AleFormItem name="email" label="邮箱" :rules="emailRules">
      <AleInput v-model="form.email" placeholder="请输入邮箱" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
      <AleButton @click="resetForm">重置</AleButton>
      <AleButton type="success" @click="fillExample">填充示例</AleButton>
      <AleButton type="warning" @click="validateForm">校验</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  username: '',
  email: ''
});

const emailRules = [
  { required: true, message: '请输入邮箱' },
  { pattern: /^[^s@]+@[^s@]+$/, message: '邮箱格式不正确' }
];

const resetForm = () => {
  form.username = '';
  form.email = '';
};

const fillExample = () => {
  form.username = 'zhangsan';
  form.email = 'zhangsan@example.com';
};

const validateForm = () => {
  // 手动校验逻辑
};

const handleSubmit = (data) => {
  console.log('提交数据:', data);
};
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,Re,[p[44]||=y(`h2`,{class:`component-demo-view__section-title`},`表单布局`,-1),y(`div`,ze,[(x(!0),E(_,null,s(n(he),e=>(x(),E(`button`,{key:e.value,class:a([`layout-tab`,{active:r.value===e.value}]),onClick:t=>r.value=e.value},i(e.label),11,Be))),128))]),y(`div`,Ve,[D(n(R),{model:n(W),layout:r.value,onSubmit:b},{default:O(()=>[D(n(z),{name:`name`,label:`姓名`,rules:[{required:!0}]},{default:O(()=>[D(n(j),{modelValue:n(W).name,"onUpdate:modelValue":p[3]||=e=>n(W).name=e,placeholder:`请输入姓名`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`phone`,label:`手机号`,rules:[{required:!0}]},{default:O(()=>[D(n(j),{modelValue:n(W).phone,"onUpdate:modelValue":p[4]||=e=>n(W).phone=e,placeholder:`请输入手机号`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`address`,label:`地址`},{default:O(()=>[D(n(j),{modelValue:n(W).address,"onUpdate:modelValue":p[5]||=e=>n(W).address=e,placeholder:`请输入地址`},null,8,[`modelValue`])]),_:1}),D(n(z),null,{default:O(()=>[D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[43]||=[h(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`,`layout`])]),y(`div`,He,[D(e,{code:`<template>
  <AleForm :model="form" layout="horizontal" @submit="handleSubmit">
    <AleFormItem name="name" label="姓名" :rules="[{ required: true }]">
      <AleInput v-model="form.name" />
    </AleFormItem>
    <AleFormItem name="phone" label="手机号" :rules="[{ required: true }]">
      <AleInput v-model="form.phone" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,Ue,[p[46]||=y(`h2`,{class:`component-demo-view__section-title`},`标签位置`,-1),y(`div`,We,[(x(!0),E(_,null,s(n(ge),e=>(x(),E(`button`,{key:e.value,class:a([`layout-tab`,{active:o.value===e.value}]),onClick:t=>o.value=e.value},i(e.label),11,Ge))),128))]),y(`div`,Ke,[D(n(R),{model:n(G),layout:`horizontal`,"label-position":o.value,"label-width":`100px`,onSubmit:ee},{default:O(()=>[D(n(z),{name:`nickname`,label:`昵称`,rules:[{required:!0}]},{default:O(()=>[D(n(j),{modelValue:n(G).nickname,"onUpdate:modelValue":p[6]||=e=>n(G).nickname=e,placeholder:`请输入昵称`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`bio`,label:`个人简介`},{default:O(()=>[D(n(j),{modelValue:n(G).bio,"onUpdate:modelValue":p[7]||=e=>n(G).bio=e,type:`textarea`,rows:3,placeholder:`请输入个人简介`},null,8,[`modelValue`])]),_:1}),D(n(z),null,{default:O(()=>[D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[45]||=[h(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`,`label-position`])]),y(`div`,qe,[D(e,{code:`<template>
  <AleForm
    :model="form"
    layout="horizontal"
    label-position="right"
    label-width="100px"
  >
    <AleFormItem name="nickname" label="昵称">
      <AleInput v-model="form.nickname" />
    </AleFormItem>
    <AleFormItem name="bio" label="个人简介">
      <AleInput v-model="form.bio" type="textarea" :rows="3" />
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,Je,[p[48]||=y(`h2`,{class:`component-demo-view__section-title`},`表单尺寸`,-1),y(`div`,Ye,[(x(!0),E(_,null,s(n(_e),e=>(x(),E(`button`,{key:e.value,class:a([`layout-tab`,{active:c.value===e.value}]),onClick:t=>c.value=e.value},i(e.label),11,Xe))),128))]),y(`div`,Ze,[D(n(R),{model:n(K),size:c.value,onSubmit:S},{default:O(()=>[D(n(z),{name:`title`,label:`标题`,rules:[{required:!0}]},{default:O(()=>[D(n(j),{modelValue:n(K).title,"onUpdate:modelValue":p[8]||=e=>n(K).title=e,placeholder:`请输入标题`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`description`,label:`描述`},{default:O(()=>[D(n(j),{modelValue:n(K).description,"onUpdate:modelValue":p[9]||=e=>n(K).description=e,placeholder:`请输入描述`},null,8,[`modelValue`])]),_:1}),D(n(z),null,{default:O(()=>[D(n(k),{type:`primary`,"native-type":`submit`,size:c.value},{default:O(()=>[...p[47]||=[h(`提交`,-1)]]),_:1},8,[`size`])]),_:1})]),_:1},8,[`model`,`size`])]),y(`div`,Qe,[D(e,{code:`<template>
  <AleForm :model="form" size="large">
    <AleFormItem name="title" label="标题">
      <AleInput v-model="form.title" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" size="large">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,$e,[p[53]||=y(`h2`,{class:`component-demo-view__section-title`},`表单验证`,-1),y(`div`,et,[D(n(R),{ref_key:`validateFormRef`,ref:l,model:n(q),onSubmit:C,onValidateFail:w},{default:O(()=>[D(n(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`用户名不能为空`},{minLength:3,message:`用户名至少3个字符`},{maxLength:20,message:`用户名最多20个字符`}]},{default:O(()=>[D(n(j),{modelValue:n(q).username,"onUpdate:modelValue":p[10]||=e=>n(q).username=e,placeholder:`3-20个字符`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`email`,label:`邮箱`,rules:[{required:!0,message:`邮箱不能为空`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`请输入正确的邮箱格式`}]},{default:O(()=>[D(n(j),{modelValue:n(q).email,"onUpdate:modelValue":p[11]||=e=>n(q).email=e,placeholder:`example@email.com`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`age`,label:`年龄`,rules:[{required:!0,message:`年龄不能为空`},{min:18,message:`年龄不能小于18岁`},{max:120,message:`年龄不能大于120岁`}]},{default:O(()=>[D(n(j),{modelValue:n(q).age,"onUpdate:modelValue":p[12]||=e=>n(q).age=e,type:`number`,placeholder:`18-120`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`phone`,label:`手机号`,rules:[{required:!0,message:`手机号不能为空`},{pattern:/^1[3-9]\d{9}$/,message:`请输入正确的手机号格式`}]},{default:O(()=>[D(n(j),{modelValue:n(q).phone,"onUpdate:modelValue":p[13]||=e=>n(q).phone=e,placeholder:`11位手机号`},null,8,[`modelValue`])]),_:1}),D(n(z),null,{default:O(()=>[y(`div`,tt,[D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[49]||=[h(`提交`,-1)]]),_:1}),D(n(k),{onClick:p[14]||=e=>l.value?.validate()},{default:O(()=>[...p[50]||=[h(`单独验证`,-1)]]),_:1}),D(n(k),{onClick:p[15]||=e=>l.value?.resetFields()},{default:O(()=>[...p[51]||=[h(`重置`,-1)]]),_:1}),D(n(k),{onClick:p[16]||=e=>l.value?.clearValidate()},{default:O(()=>[...p[52]||=[h(`清除验证`,-1)]]),_:1})])]),_:1})]),_:1},8,[`model`])]),y(`div`,nt,[D(e,{code:`<template>
  <AleForm ref="formRef" :model="form" @submit="handleSubmit" @validate-fail="handleFail">
    <AleFormItem name="username" label="用户名" :rules="usernameRules">
      <AleInput v-model="form.username" />
    </AleFormItem>
    <AleFormItem name="email" label="邮箱" :rules="emailRules">
      <AleInput v-model="form.email" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
      <AleButton @click="formRef?.resetFields()">重置</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formRef = ref();
const form = reactive({
  username: '',
  email: ''
});

const usernameRules = [
  { required: true, message: '用户名不能为空' },
  { minLength: 3, message: '至少3个字符' },
  { maxLength: 20, message: '最多20个字符' }
];

const emailRules = [
  { required: true, message: '邮箱不能为空' },
  { pattern: /^[^s@]+@[^s@]+$/, message: '邮箱格式不正确' }
];
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,rt,[p[55]||=y(`h2`,{class:`component-demo-view__section-title`},`自定义验证`,-1),y(`div`,it,[D(n(R),{model:n(J),onSubmit:T},{default:O(()=>[D(n(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`请输入用户名`},{minLength:3,message:`用户名至少3位`}]},{default:O(()=>[D(n(j),{modelValue:n(J).username,"onUpdate:modelValue":p[17]||=e=>n(J).username=e,placeholder:`请输入用户名`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`password`,label:`密码`,rules:[{required:!0,message:`请输入密码`},{minLength:6,message:`密码至少6位`},{validator:n(be),message:`密码必须包含字母和数字`}]},{default:O(()=>[D(n(j),{modelValue:n(J).password,"onUpdate:modelValue":p[18]||=e=>n(J).password=e,type:`password`,placeholder:`请输入密码`,autocomplete:`new-password`},null,8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),{name:`confirmPassword`,label:`确认密码`,rules:[{required:!0,message:`请确认密码`},{validator:n(xe),message:`两次输入的密码不一致`}]},{default:O(()=>[D(n(j),{modelValue:n(J).confirmPassword,"onUpdate:modelValue":p[19]||=e=>n(J).confirmPassword=e,type:`password`,placeholder:`请再次输入密码`,autocomplete:`new-password`},null,8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),null,{default:O(()=>[D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[54]||=[h(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`])]),y(`div`,at,[D(e,{code:`<template>
  <AleForm :model="form" @submit="handleSubmit">
    <AleFormItem name="username" label="用户名" :rules="usernameRules">
      <AleInput v-model="form.username" autocomplete="username" />
    </AleFormItem>
    <AleFormItem name="password" label="密码" :rules="passwordRules">
      <AleInput v-model="form.password" type="password" autocomplete="new-password" />
    </AleFormItem>
    <AleFormItem name="confirmPassword" label="确认密码" :rules="confirmRules">
      <AleInput v-model="form.confirmPassword" type="password" autocomplete="new-password" />
    </AleFormItem>
  </AleForm>
</template>

<script setup>
const usernameRules = [
  { required: true, message: '请输入用户名' },
  { minLength: 3, message: '用户名至少3位' }
];

const passwordRules = [
  { required: true, message: '请输入密码' },
  { 
    validator: (value) => /[a-zA-Z]/.test(value) && /\\d/.test(value),
    message: '密码必须包含字母和数字'
  }
];

const confirmRules = [
  { required: true, message: '请确认密码' },
  { 
    validator: (value) => value === form.password,
    message: '两次输入的密码不一致'
  }
];
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,ot,[p[57]||=y(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),y(`div`,st,[D(n(R),{model:n(Y),disabled:``},{default:O(()=>[D(n(z),{name:`name`,label:`姓名`},{default:O(()=>[D(n(j),{modelValue:n(Y).name,"onUpdate:modelValue":p[20]||=e=>n(Y).name=e},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`email`,label:`邮箱`},{default:O(()=>[D(n(j),{modelValue:n(Y).email,"onUpdate:modelValue":p[21]||=e=>n(Y).email=e},null,8,[`modelValue`])]),_:1}),D(n(z),null,{default:O(()=>[D(n(k),{type:`primary`,disabled:``},{default:O(()=>[...p[56]||=[h(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`])]),y(`div`,ct,[D(e,{code:`<template>
  <AleForm :model="form" disabled>
    <AleFormItem name="name" label="姓名">
      <AleInput v-model="form.name" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" disabled>提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,lt,[p[58]||=y(`h2`,{class:`component-demo-view__section-title`},`提示信息`,-1),y(`div`,ut,[D(n(R),{model:n(X)},{default:O(()=>[D(n(z),{name:`username`,label:`用户名`,extra:`用户名用于登录系统，不能修改`},{default:O(()=>[D(n(j),{modelValue:n(X).username,"onUpdate:modelValue":p[22]||=e=>n(X).username=e},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`email`,label:`邮箱`,extra:`我们会向此邮箱发送验证邮件`},{default:O(()=>[D(n(j),{modelValue:n(X).email,"onUpdate:modelValue":p[23]||=e=>n(X).email=e},null,8,[`modelValue`])]),_:1})]),_:1},8,[`model`])]),y(`div`,dt,[D(e,{code:`<template>
  <AleForm :model="form">
    <AleFormItem name="username" label="用户名" extra="用户名用于登录系统">
      <AleInput v-model="form.username" />
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,ft,[p[84]||=y(`h2`,{class:`component-demo-view__section-title`},`全部表单字段校验`,-1),y(`div`,pt,[D(n(R),{model:n(Z),onSubmit:A},{default:O(()=>[D(n(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`请输入用户名`},{minLength:3,message:`至少3个字符`},{maxLength:20,message:`最多20个字符`}]},{default:O(()=>[D(n(j),{modelValue:n(Z).username,"onUpdate:modelValue":p[24]||=e=>n(Z).username=e,placeholder:`3-20个字符`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`description`,label:`个人简介`,rules:[{required:!0,message:`请输入个人简介`},{minLength:10,message:`至少10个字符`},{maxLength:200,message:`最多200个字符`}]},{default:O(()=>[D(n(j),{modelValue:n(Z).description,"onUpdate:modelValue":p[25]||=e=>n(Z).description=e,type:`textarea`,rows:4,placeholder:`请输入10-200字的个人简介`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`gender`,label:`性别`,rules:[{required:!0,message:`请选择性别`}]},{default:O(()=>[D(n(te),{modelValue:n(Z).gender,"onUpdate:modelValue":p[26]||=e=>n(Z).gender=e},{default:O(()=>[D(n(I),{value:`male`},{default:O(()=>[...p[59]||=[h(`男`,-1)]]),_:1}),D(n(I),{value:`female`},{default:O(()=>[...p[60]||=[h(`女`,-1)]]),_:1}),D(n(I),{value:`other`},{default:O(()=>[...p[61]||=[h(`其他`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1}),D(n(z),{name:`hobbies`,label:`兴趣爱好`,rules:[{required:!0,message:`请选择至少一项兴趣爱好`},{validator:n(Ce),message:`至少选择一项`}]},{default:O(()=>[D(n(P),{modelValue:n(Z).hobbies,"onUpdate:modelValue":p[27]||=e=>n(Z).hobbies=e},{default:O(()=>[D(n(F),{value:`reading`},{default:O(()=>[...p[62]||=[h(`阅读`,-1)]]),_:1}),D(n(F),{value:`sports`},{default:O(()=>[...p[63]||=[h(`运动`,-1)]]),_:1}),D(n(F),{value:`music`},{default:O(()=>[...p[64]||=[h(`音乐`,-1)]]),_:1}),D(n(F),{value:`travel`},{default:O(()=>[...p[65]||=[h(`旅行`,-1)]]),_:1}),D(n(F),{value:`gaming`},{default:O(()=>[...p[66]||=[h(`游戏`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),{name:`city`,label:`城市`,rules:[{required:!0,message:`请选择城市`}]},{default:O(()=>[D(n(M),{modelValue:n(Z).city,"onUpdate:modelValue":p[28]||=e=>n(Z).city=e,placeholder:`请选择城市`},{default:O(()=>[D(n(N),{value:`beijing`},{default:O(()=>[...p[67]||=[h(`北京`,-1)]]),_:1}),D(n(N),{value:`shanghai`},{default:O(()=>[...p[68]||=[h(`上海`,-1)]]),_:1}),D(n(N),{value:`guangzhou`},{default:O(()=>[...p[69]||=[h(`广州`,-1)]]),_:1}),D(n(N),{value:`shenzhen`},{default:O(()=>[...p[70]||=[h(`深圳`,-1)]]),_:1}),D(n(N),{value:`hangzhou`},{default:O(()=>[...p[71]||=[h(`杭州`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1}),D(n(z),{name:`skills`,label:`技能标签`,rules:[{required:!0,message:`请选择至少一项技能`},{validator:n(we),message:`至少选择一项技能`}]},{default:O(()=>[D(n(M),{modelValue:n(Z).skills,"onUpdate:modelValue":p[29]||=e=>n(Z).skills=e,multiple:``,placeholder:`请选择技能（可多选）`},{default:O(()=>[D(n(N),{value:`javascript`},{default:O(()=>[...p[72]||=[h(`JavaScript`,-1)]]),_:1}),D(n(N),{value:`typescript`},{default:O(()=>[...p[73]||=[h(`TypeScript`,-1)]]),_:1}),D(n(N),{value:`vue`},{default:O(()=>[...p[74]||=[h(`Vue.js`,-1)]]),_:1}),D(n(N),{value:`react`},{default:O(()=>[...p[75]||=[h(`React`,-1)]]),_:1}),D(n(N),{value:`node`},{default:O(()=>[...p[76]||=[h(`Node.js`,-1)]]),_:1}),D(n(N),{value:`python`},{default:O(()=>[...p[77]||=[h(`Python`,-1)]]),_:1}),D(n(N),{value:`go`},{default:O(()=>[...p[78]||=[h(`Go`,-1)]]),_:1}),D(n(N),{value:`rust`},{default:O(()=>[...p[79]||=[h(`Rust`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),{name:`region`,label:`所在地区`,rules:[{required:!0,message:`请选择所在地区`},{validator:n(Te),message:`请选择完整的地区信息`}]},{default:O(()=>[D(n(re),{modelValue:n(Z).region,"onUpdate:modelValue":p[30]||=e=>n(Z).region=e,options:n(Se),placeholder:`请选择省/市/区`,clearable:``},null,8,[`modelValue`,`options`])]),_:1},8,[`rules`]),D(n(z),{name:`newsletter`,label:`订阅通知`},{default:O(()=>[D(n(ne),{modelValue:n(Z).newsletter,"onUpdate:modelValue":p[31]||=e=>n(Z).newsletter=e,"active-text":`接收邮件通知`,"inactive-text":`不接收`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`attachments`,label:`附件上传`,rules:[{required:!0,message:`请上传附件`},{validator:n(Ee),message:`请至少上传一个文件`}]},{default:O(()=>[D(n(ie),{modelValue:n(Z).attachments,"onUpdate:modelValue":p[32]||=e=>n(Z).attachments=e,"list-type":`text`,limit:3},{default:O(()=>[D(n(k),{type:`primary`,size:`small`},{default:O(()=>[...p[80]||=[h(`点击上传`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),{name:`agreement`,rules:[{required:!0,message:`请同意用户协议`},{validator:n(De),message:`必须同意用户协议`}]},{default:O(()=>[D(n(F),{modelValue:n(Z).agreement,"onUpdate:modelValue":p[33]||=e=>n(Z).agreement=e},{default:O(()=>[...p[81]||=[h(` 我已阅读并同意《用户服务协议》和《隐私政策》 `,-1)]]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),D(n(z),null,{default:O(()=>[y(`div`,mt,[D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[82]||=[h(`提交`,-1)]]),_:1}),D(n(k),{onClick:ae},{default:O(()=>[...p[83]||=[h(`重置`,-1)]]),_:1})])]),_:1})]),_:1},8,[`model`])]),y(`div`,ht,[D(e,{code:`<template>
  <AleForm :model="form" @submit="handleSubmit">
    <!-- 文本输入 -->
    <AleFormItem name="username" label="用户名" :rules="usernameRules">
      <AleInput v-model="form.username" placeholder="3-20个字符" />
    </AleFormItem>

    <!-- 文本域 -->
    <AleFormItem name="description" label="个人简介" :rules="descriptionRules">
      <AleInput v-model="form.description" type="textarea" :rows="4" />
    </AleFormItem>

    <!-- 单选框 -->
    <AleFormItem name="gender" label="性别" :rules="[{ required: true }]">
      <AleRadioGroup v-model="form.gender">
        <AleRadio value="male">男</AleRadio>
        <AleRadio value="female">女</AleRadio>
      </AleRadioGroup>
    </AleFormItem>

    <!-- 多选框 -->
    <AleFormItem name="hobbies" label="兴趣爱好" :rules="[{ validator: validateHobbies }]">
      <AleCheckboxGroup v-model="form.hobbies">
        <AleCheckbox value="reading">阅读</AleCheckbox>
        <AleCheckbox value="sports">运动</AleCheckbox>
        <AleCheckbox value="music">音乐</AleCheckbox>
      </AleCheckboxGroup>
    </AleFormItem>

    <!-- 下拉选择 -->
    <AleFormItem name="city" label="城市" :rules="[{ required: true }]">
      <AleSelect v-model="form.city" placeholder="请选择城市">
        <AleOption value="beijing">北京</AleOption>
        <AleOption value="shanghai">上海</AleOption>
        <AleOption value="guangzhou">广州</AleOption>
        <AleOption value="shenzhen">深圳</AleOption>
      </AleSelect>
    </AleFormItem>

    <!-- 下拉多选 -->
    <AleFormItem name="skills" label="技能标签" :rules="[{ validator: validateSkills }]">
      <AleSelect v-model="form.skills" multiple placeholder="请选择技能（可多选）">
        <AleOption value="javascript">JavaScript</AleOption>
        <AleOption value="typescript">TypeScript</AleOption>
        <AleOption value="vue">Vue.js</AleOption>
        <AleOption value="react">React</AleOption>
        <AleOption value="node">Node.js</AleOption>
        <AleOption value="python">Python</AleOption>
        <AleOption value="go">Go</AleOption>
        <AleOption value="rust">Rust</AleOption>
      </AleSelect>
    </AleFormItem>

    <!-- 级联选择 -->
    <AleFormItem name="region" label="所在地区" :rules="[{ required: true }, { validator: validateRegion }]">
      <AleCascader
        v-model="form.region"
        :options="regionOptions"
        placeholder="请选择省/市/区"
        clearable
      />
    </AleFormItem>

    <!-- Switch 开关 -->
    <AleFormItem name="newsletter" label="订阅通知">
      <AleSwitch v-model="form.newsletter" active-text="接收" inactive-text="不接收" />
    </AleFormItem>

    <!-- 文件上传 -->
    <AleFormItem
      name="attachments"
      label="附件上传"
      :rules="[
        { required: true, message: '请上传附件' },
        { validator: validateAttachments, message: '请至少上传一个文件' }
      ]"
    >
      <AleUpload
        v-model="form.attachments"
        list-type="text"
        :limit="3"
      >
        <AleButton type="primary" size="small">点击上传</AleButton>
      </AleUpload>
    </AleFormItem>

    <!-- 单个 Checkbox -->
    <AleFormItem name="agreement" :rules="[{ validator: validateAgreement }]">
      <AleCheckbox v-model="form.agreement">
        我已阅读并同意《用户服务协议》
      </AleCheckbox>
    </AleFormItem>

    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  username: '',
  description: '',
  gender: '',
  hobbies: [],
  city: '',
  region: [],
  skills: [],
  newsletter: true,
  attachments: [],
  agreement: false
});

// 级联选择器选项
const regionOptions = [
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
      }
    ]
  }
];

const usernameRules = [
  { required: true, message: '请输入用户名' },
  { minLength: 3, message: '至少3个字符' },
  { maxLength: 20, message: '最多20个字符' }
];

const descriptionRules = [
  { required: true, message: '请输入个人简介' },
  { minLength: 10, message: '至少10个字符' },
  { maxLength: 200, message: '最多200个字符' }
];

const validateHobbies = (value) => value && value.length > 0;
const validateSkills = (value) => value && value.length > 0;
const validateRegion = (value) => value && value.length > 0;
const validateAttachments = (value) => value && value.length > 0;
const validateAgreement = (value) => value === true;
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,gt,[p[95]||=y(`h2`,{class:`component-demo-view__section-title`},`动态循环表单`,-1),p[96]||=y(`p`,{class:`tag-view__desc`},`可以动态添加、删除表单项的循环表单`,-1),y(`div`,_t,[D(n(R),{model:n(Q),onSubmit:oe},{default:O(()=>[(x(!0),E(_,null,s(n(Q).items,(e,t)=>(x(),E(`div`,{key:e.id,class:`dynamic-form-item`},[y(`div`,vt,[y(`span`,yt,`成员 `+i(t+1),1),n(Q).items.length>1?(x(),v(n(k),{key:0,type:`danger`,size:`small`,onClick:e=>n(Ae)(t)},{default:O(()=>[...p[85]||=[h(` 删除 `,-1)]]),_:1},8,[`onClick`])):m(``,!0)]),D(n(z),{name:`items.${t}.name`,label:`姓名`,rules:[{required:!0,message:`请输入姓名`}]},{default:O(()=>[D(n(j),{modelValue:e.name,"onUpdate:modelValue":t=>e.name=t,placeholder:`请输入姓名`},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`]),D(n(z),{name:`items.${t}.email`,label:`邮箱`,rules:[{required:!0,message:`请输入邮箱`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`邮箱格式不正确`}]},{default:O(()=>[D(n(j),{modelValue:e.email,"onUpdate:modelValue":t=>e.email=t,placeholder:`请输入邮箱`},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`]),D(n(z),{name:`items.${t}.role`,label:`角色`,rules:[{required:!0,message:`请选择角色`}]},{default:O(()=>[D(n(te),{modelValue:e.role,"onUpdate:modelValue":t=>e.role=t},{default:O(()=>[D(n(I),{value:`admin`},{default:O(()=>[...p[86]||=[h(`管理员`,-1)]]),_:1}),D(n(I),{value:`editor`},{default:O(()=>[...p[87]||=[h(`编辑`,-1)]]),_:1}),D(n(I),{value:`viewer`},{default:O(()=>[...p[88]||=[h(`访客`,-1)]]),_:1})]),_:1},8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`]),D(n(z),{name:`items.${t}.permissions`,label:`权限`},{default:O(()=>[D(n(P),{modelValue:e.permissions,"onUpdate:modelValue":t=>e.permissions=t},{default:O(()=>[D(n(F),{value:`read`},{default:O(()=>[...p[89]||=[h(`读取`,-1)]]),_:1}),D(n(F),{value:`write`},{default:O(()=>[...p[90]||=[h(`写入`,-1)]]),_:1}),D(n(F),{value:`delete`},{default:O(()=>[...p[91]||=[h(`删除`,-1)]]),_:1})]),_:1},8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`])]))),128)),D(n(z),null,{default:O(()=>[y(`div`,bt,[D(n(k),{type:`primary`,onClick:n(ke)},{default:O(()=>[...p[92]||=[h(` + 添加成员 `,-1)]]),_:1},8,[`onClick`]),D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[93]||=[h(`提交`,-1)]]),_:1}),D(n(k),{onClick:n(je)},{default:O(()=>[...p[94]||=[h(`重置`,-1)]]),_:1},8,[`onClick`])])]),_:1})]),_:1},8,[`model`])]),y(`div`,xt,[D(e,{code:`<template>
  <AleForm :model="form" @submit="handleSubmit">
    <!-- 动态表单项循环 -->
    <div v-for="(item, index) in form.items" :key="item.id">
      <h4>成员 {{ index + 1 }}</h4>
      <AleButton
        v-if="form.items.length > 1"
        type="danger"
        size="small"
        @click="removeItem(index)"
      >
        删除
      </AleButton>

      <AleFormItem
        :name="\`items.\${index}.name\`"
        label="姓名"
        :rules="[{ required: true }]"
      >
        <AleInput v-model="item.name" />
      </AleFormItem>

      <AleFormItem
        :name="\`items.\${index}.email\`"
        label="邮箱"
        :rules="emailRules"
      >
        <AleInput v-model="item.email" />
      </AleFormItem>

      <AleFormItem
        :name="\`items.\${index}.role\`"
        label="角色"
        :rules="[{ required: true }]"
      >
        <AleRadioGroup v-model="item.role">
          <AleRadio value="admin">管理员</AleRadio>
          <AleRadio value="editor">编辑</AleRadio>
        </AleRadioGroup>
      </AleFormItem>
    </div>

    <AleButton type="primary" @click="addItem">+ 添加成员</AleButton>
    <AleButton type="primary" native-type="submit">提交</AleButton>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

let idCounter = 1;

const form = reactive({
  items: [{ id: idCounter++, name: '', email: '', role: '' }]
});

const addItem = () => {
  form.items.push({
    id: idCounter++,
    name: '',
    email: '',
    role: ''
  });
};

const removeItem = (index) => {
  if (form.items.length > 1) {
    form.items.splice(index, 1);
  }
};

const emailRules = [
  { required: true, message: '请输入邮箱' },
  { pattern: /^[^s@]+@[^s@]+$/, message: '邮箱格式不正确' }
];
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),y(`section`,St,[p[99]||=y(`h2`,{class:`component-demo-view__section-title`},`验证触发事件`,-1),p[100]||=y(`p`,{class:`tag-view__desc`},`支持 change、blur、focus 和 submit 四种触发时机`,-1),y(`div`,Ct,[D(n(R),{model:n($),onSubmit:se},{default:O(()=>[D(n(z),{name:`username`,label:`用户名(change)`,rules:[{required:!0,message:`请输入用户名`,trigger:`change`},{minLength:3,message:`至少3个字符`,trigger:`change`}]},{default:O(()=>[D(n(j),{modelValue:n($).username,"onUpdate:modelValue":p[34]||=e=>n($).username=e,placeholder:`输入时实时验证`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`email`,label:`邮箱(blur)`,rules:[{required:!0,message:`请输入邮箱`,trigger:`blur`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`邮箱格式不正确`,trigger:`blur`}]},{default:O(()=>[D(n(j),{modelValue:n($).email,"onUpdate:modelValue":p[35]||=e=>n($).email=e,placeholder:`失去焦点时验证`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`phone`,label:`手机号(change+blur)`,rules:[{required:!0,message:`请输入手机号`,trigger:[`change`,`blur`]},{pattern:/^1[3-9]\d{9}$/,message:`手机号格式不正确`,trigger:[`change`,`blur`]}]},{default:O(()=>[D(n(j),{modelValue:n($).phone,"onUpdate:modelValue":p[36]||=e=>n($).phone=e,placeholder:`输入和失去焦点都验证`},null,8,[`modelValue`])]),_:1}),D(n(z),{name:`password`,label:`密码(focus+blur)`,rules:[{required:!0,message:`请输入密码`,trigger:`blur`},{minLength:6,message:`至少6位`,trigger:`blur`}]},{default:O(()=>[D(n(j),{modelValue:n($).password,"onUpdate:modelValue":p[37]||=e=>n($).password=e,type:`password`,placeholder:`获得焦点时验证`,autocomplete:`current-password`},null,8,[`modelValue`])]),_:1}),D(n(z),null,{default:O(()=>[y(`div`,wt,[D(n(k),{type:`primary`,"native-type":`submit`},{default:O(()=>[...p[97]||=[h(`提交`,-1)]]),_:1}),D(n(k),{onClick:n(Me)},{default:O(()=>[...p[98]||=[h(`重置`,-1)]]),_:1},8,[`onClick`])])]),_:1})]),_:1},8,[`model`])]),y(`div`,Tt,[D(e,{code:`<template>
  <AleForm :model="form" @submit="handleSubmit">
    <!-- change 触发 -->
    <AleFormItem
      name="username"
      label="用户名"
      :rules="[
        { required: true, message: '请输入用户名', trigger: 'change' },
        { minLength: 3, message: '至少3个字符', trigger: 'change' }
      ]"
    >
      <AleInput v-model="form.username" placeholder="输入时实时验证" autocomplete="username" />
    </AleFormItem>

    <!-- blur 触发 -->
    <AleFormItem
      name="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^[^s@]+@[^s@]+$/, message: '邮箱格式不正确', trigger: 'blur' }
      ]"
    >
      <AleInput v-model="form.email" placeholder="失去焦点时验证" />
    </AleFormItem>

    <!-- 多种触发方式 -->
    <AleFormItem
      name="phone"
      label="手机号"
      :rules="[
        { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
        { pattern: /^1[3-9]\\d{9}$/, message: '手机号格式不正确', trigger: ['change', 'blur'] }
      ]"
    >
      <AleInput v-model="form.phone" placeholder="输入和失去焦点都验证" />
    </AleFormItem>

    <!-- password -->
    <AleFormItem
      name="password"
      label="密码"
      :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { minLength: 6, message: '至少6位', trigger: 'blur' }
      ]"
    >
      <AleInput v-model="form.password" type="password" placeholder="请输入密码" autocomplete="current-password" />
    </AleFormItem>

    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
      <AleButton @click="resetForm">重置</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  username: '',
  email: '',
  phone: ''
});

const handleSubmit = (data) => {
  console.log('提交数据:', data);
};

const resetForm = () => {
  form.username = '';
  form.email = '';
  form.phone = '';
};
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),D(me)]))}}),[[`__scopeId`,`data-v-a7217746`]]);export{Et as default};
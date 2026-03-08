import{A as e,B as t,C as n,E as r,F as i,J as a,K as o,M as s,N as ee,P as c,S as l,U as u,V as d,W as f,Y as p,_ as m,a as te,f as h,g,h as _,i as v,k as y,p as b,q as x,u as S,v as C,x as w,y as T,z as E}from"./index-B3Jx3uix.js";import{t as D}from"./button-GOPf8Q2w.js";import{n as O,t as k}from"./input-COusWsIZ.js";import{n as A,t as j}from"./select-DfWCBj6N.js";import"./Checkbox-BLbaJrwb.js";import{n as M,t as N}from"./checkbox-AjOIcsEN.js";import{n as P,t as F}from"./radio-Co0bdh7C.js";import{t as ne}from"./Switch-CCw67EqZ.js";import{t as I}from"./message-DSqOka9K.js";import"./Scroll-uf_8gSTA.js";import"./scroll-BRb_6MJw.js";import{t as re}from"./Cascader-dX71GrxV.js";import{t as ie}from"./upload-CATY-75q.js";import{t as L}from"./CodeBlock-CE4Cu_o1.js";var R=n({__name:`Form`,props:{model:{},layout:{default:`vertical`},labelPosition:{default:`left`},labelWidth:{},size:{default:`medium`},disabled:{type:Boolean,default:!1},showRequiredMark:{type:Boolean,default:!0},labelGap:{default:8}},emits:[`submit`,`validate-fail`,`field-change`],setup(e,{expose:t,emit:n}){let r=e,a=n,o=f(new Map),c=f(new Map),l=u({}),d=_(()=>{let e={"ale-form":!0,[`ale-form--${r.layout}`]:!0,[`ale-form--${r.size}`]:!!r.size};return r.disabled&&(e[`is-disabled`]=!0),e}),p=(e,t,n)=>{c.value.set(e,t),n&&o.value.set(e,n)},m=e=>{c.value.delete(e),o.value.delete(e)},te=(e,t)=>{r.model[e]=t,a(`field-change`,e,t,{...r.model})},g=(e,t,n)=>{t?delete l[e]:l[e]=n},v=e=>{let t=o.value.get(e);t?.rules&&t.rules.some(e=>{let t=e.trigger;return t===`focus`||Array.isArray(t)&&t.includes(`focus`)})&&S(e)},y=e=>{let t=o.value.get(e);t?.rules&&t.rules.some(e=>{let t=e.trigger;return t===`blur`||Array.isArray(t)&&t.includes(`blur`)})&&S(e)},b=(e,t)=>{let n=o.value.get(e);n?o.value.set(e,{...n,...t}):o.value.set(e,{name:e,...t})},S=async e=>{let t=c.value.get(e);return t&&t.validate?t.validate():{valid:!0,errors:[]}},C=async()=>{let e=Array.from(c.value.keys()),t={},n=!0;for(let r of e){let e=await S(r);e.valid||(n=!1,t[r]=e.errors)}return{valid:n,errors:t}},w=async e=>{if(Array.isArray(e)){let t={},n=!0;for(let r of e){let e=await S(r);e.valid||(n=!1,t[r]=e.errors)}return{valid:n,errors:t}}let t=await S(e);return{valid:t.valid,errors:t.valid?{}:{[e]:t.errors}}},E=async()=>{let e=await C();e.valid?a(`submit`,{...r.model}):a(`validate-fail`,e.errors)},D=e=>{if(e===void 0)Object.keys(l).forEach(e=>{delete l[e]}),c.value.forEach(e=>{e.clearValidate&&e.clearValidate()});else if(Array.isArray(e))e.forEach(e=>{delete l[e];let t=c.value.get(e);t&&t.clearValidate&&t.clearValidate()});else{delete l[e];let t=c.value.get(e);t&&t.clearValidate&&t.clearValidate()}};return ee(O,{model:r.model,layout:_(()=>r.layout),labelPosition:_(()=>r.labelPosition),labelWidth:_(()=>r.labelWidth),size:_(()=>r.size),disabled:_(()=>r.disabled),showRequiredMark:_(()=>r.showRequiredMark),labelGap:_(()=>r.labelGap),registerField:p,unregisterField:m,onFieldChange:te,onFieldValidate:g,updateFieldConfig:b,onFieldFocus:v,onFieldBlur:y}),t({validate:C,validateField:w,resetFields:()=>{Object.keys(r.model).forEach(e=>{let t=o.value.get(e);if(t&&t.defaultValue!==void 0)r.model[e]=t.defaultValue;else{let t=r.model[e];Array.isArray(t)?r.model[e]=[]:typeof t==`object`&&t?r.model[e]={}:r.model[e]=``}let n=c.value.get(e);n&&n.resetField&&n.resetField()}),D()},clearValidate:D,getFormData:()=>({...r.model}),setFormData:e=>{Object.keys(e).forEach(t=>{t in r.model&&(r.model[t]=e[t])})}}),(e,t)=>(s(),T(`form`,{class:x(d.value),onSubmit:h(E,[`prevent`])},[i(e.$slots,`default`)],34))}}),ae={key:0,class:`ale-form-item__required`},oe={class:`ale-form-item__content`},se={class:`ale-form-item__error-wrapper`},ce={key:0,class:`ale-form-item__extra`},z=n({__name:`FormItem`,props:{name:{},label:{},rules:{},labelWidth:{},required:{type:Boolean,default:!1},error:{},showError:{type:Boolean,default:!0},extra:{},labelHeightMode:{default:`adaptive`},multiline:{type:Boolean,default:!1}},emits:[`validate`],setup(n,{expose:o,emit:ee}){let c=n,u=ee,m=r(O),h=f(``),v=f(!1),b=_(()=>!!(c.required||c.rules&&c.rules.some(e=>e.required))),D=_(()=>{let e=[];return c.rules&&e.push(...c.rules),e}),k=_(()=>c.showError!==!1);function A(e,t){return e===void 0?t:typeof e==`object`&&e&&`value`in e?e.value:e}let j=_(()=>A(m?.layout,`vertical`)),M=_(()=>A(m?.size,`medium`)),N=_(()=>A(m?.labelPosition,`left`)),P=_(()=>c.labelWidth===void 0?A(m?.labelWidth,void 0):c.labelWidth),F=_(()=>A(m?.labelGap,8)),ne=_(()=>A(m?.disabled,!1)===!0),I=_(()=>({"ale-form-item":!0,[`ale-form-item--${j.value}`]:!0,[`ale-form-item--${M.value}`]:M.value,"is-required":b.value,"is-error":v.value,"is-disabled":ne.value})),re=_(()=>{let e={};return j.value===`horizontal`&&(e.gap=`${typeof F.value==`number`?F.value:parseInt(F.value)}px`),e}),ie=_(()=>({"ale-form-item__label":!0,[`ale-form-item__label--${N.value}`]:N.value,[`ale-form-item__label--${M.value}`]:M.value,"is-fixed-height":c.labelHeightMode===`fixed`,"is-auto-height":c.labelHeightMode===`auto`,"is-multiline":c.multiline})),L=_(()=>{let e={};return j.value===`horizontal`&&P.value!==void 0&&(e.width=typeof P.value==`number`?`${P.value}px`:P.value,e.flexShrink=`0`),e}),R=(e,t)=>{if(!e||!t)return;let n=t.split(`.`),r=e;for(let e of n){if(r==null)return;r=r[e]}return r},z=_(()=>{if(!(!c.name||!m))return R(m.model,c.name)}),le=async(e,t)=>{if(t.required&&(e==null||e===``||Array.isArray(e)&&e.length===0))return t.requiredMessage||t.message||`此项为必填项`;if(e==null||e===``)return``;if(t.minLength!==void 0&&(Array.isArray(e)?e.length:String(e).length)<t.minLength)return t.message||`长度不能少于 ${t.minLength} 个字符`;if(t.maxLength!==void 0&&(Array.isArray(e)?e.length:String(e).length)>t.maxLength)return t.message||`长度不能超过 ${t.maxLength} 个字符`;if(t.min!==void 0){let n=Number(e);if(!isNaN(n)&&n<t.min)return t.message||`不能小于 ${t.min}`}if(t.max!==void 0){let n=Number(e);if(!isNaN(n)&&n>t.max)return t.message||`不能大于 ${t.max}`}if(t.pattern&&!t.pattern.test(String(e)))return t.message||`格式不正确`;if(t.validator){let n=await t.validator(e,m?.model||{});if(n===!1)return t.message||`验证失败`;if(typeof n==`string`)return n}return``},B=async()=>{if(!c.name||D.value.length===0)return{valid:!0,errors:[]};let e=z.value,t=[];for(let n of D.value){let r=await le(e,n);r&&t.push(r)}let n=t.length===0;return v.value=!n,h.value=n?``:t[0]||``,m&&c.name&&m.onFieldValidate(c.name,n,t),u(`validate`,c.name,n,t),{valid:n,errors:t}},V=()=>{v.value=!1,h.value=``},H=()=>{V(),m&&c.name&&m.onFieldChange(c.name,``)};E(()=>z.value,(e,t)=>{c.name&&e!==t&&D.value.some(e=>{let t=e.trigger;return!t||t===`change`||Array.isArray(t)&&t.includes(`change`)})&&B(),v.value&&c.name&&B()});let ue=()=>{m&&c.name&&m.onFieldFocus?.(c.name)},de=()=>{m&&c.name&&m.onFieldBlur?.(c.name)};return E(()=>c.error,e=>{e?(h.value=e,v.value=!0):V()},{immediate:!0}),y(()=>{if(m&&c.name){let e={validate:B,clearValidate:V,resetField:H};m.registerField(c.name,e)}}),e(()=>{m&&c.name&&m.unregisterField(c.name)}),o({validate:B,clearValidate:V,resetField:H}),(e,r)=>(s(),T(`div`,{class:x(I.value),style:a(re.value)},[n.label||e.$slots.label?(s(),T(`label`,{key:0,class:x(ie.value),style:a(L.value)},[b.value?(s(),T(`span`,ae,`*`)):C(``,!0),i(e.$slots,`label`,{},()=>[w(p(n.label),1)])],6)):C(``,!0),g(`div`,oe,[i(e.$slots,`default`,{size:M.value,onFocus:ue,onBlur:de}),g(`div`,se,[l(te,{name:`ale-form-error`},{default:t(()=>[d(g(`div`,{class:`ale-form-item__error`},p(h.value),513),[[S,k.value&&h.value]])]),_:1})]),n.extra&&!h.value?(s(),T(`div`,ce,p(n.extra),1)):C(``,!0)])],6))}});const le=[{param:`model`,desc:`表单数据对象（必填）`,type:`object`,default:`-`},{param:`layout`,desc:`表单布局`,type:`'horizontal' | 'vertical' | 'inline'`,default:`'vertical'`},{param:`labelPosition`,desc:`标签位置`,type:`'left' | 'right' | 'top'`,default:`'right'`},{param:`labelWidth`,desc:`标签宽度`,type:`string | number`,default:`120`},{param:`size`,desc:`表单尺寸`,type:`'large' | 'medium' | 'small'`,default:`'medium'`},{param:`disabled`,desc:`是否禁用整个表单`,type:`boolean`,default:`false`},{param:`showRequiredMark`,desc:`是否显示必填标记`,type:`boolean`,default:`true`}],B=[{method:`validate`,desc:`验证整个表单`,params:`-`},{method:`validateField`,desc:`验证指定字段`,params:`field: string | string[]`},{method:`resetFields`,desc:`重置表单字段`,params:`-`},{method:`clearValidate`,desc:`清除验证状态`,params:`field?: string | string[]`},{method:`getFormData`,desc:`获取表单数据`,params:`-`},{method:`setFormData`,desc:`设置表单数据`,params:`data: object`}],V=[{param:`name`,desc:`字段名称`,type:`string`,default:`-`},{param:`label`,desc:`标签文本`,type:`string`,default:`-`},{param:`rules`,desc:`验证规则`,type:`FormRule[]`,default:`-`},{param:`required`,desc:`是否必填`,type:`boolean`,default:`false`},{param:`extra`,desc:`额外提示信息`,type:`string`,default:`-`}],H=[{rule:`required`,desc:`是否必填`,example:`{ required: true, message: '不能为空' }`},{rule:`minLength`,desc:`最小长度`,example:`{ minLength: 3, message: '至少3个字符' }`},{rule:`maxLength`,desc:`最大长度`,example:`{ maxLength: 20, message: '最多20个字符' }`},{rule:`min`,desc:`最小值`,example:`{ min: 18, message: '不能小于18' }`},{rule:`max`,desc:`最大值`,example:`{ max: 100, message: '不能大于100' }`},{rule:`pattern`,desc:`正则表达式`,example:`{ pattern: /^\\d+$/, message: '只能是数字' }`},{rule:`validator`,desc:`自定义验证函数`,example:`{ validator: (value) => value > 0 }`}];var ue={class:`component-demo-view__section`},de={class:`api-table`},fe={key:0},pe={key:1},me=v(n({__name:`ApiSection`,setup(e){let t=[{title:`Form Props`,columns:[`参数`,`说明`,`类型`,`默认值`],data:le.map(e=>({参数:e.param,说明:e.desc,类型:e.type,默认值:e.default}))},{title:`Form 方法`,columns:[`方法名`,`说明`,`参数`],data:B.map(e=>({方法名:e.method,说明:e.desc,参数:e.params}))},{title:`FormItem Props`,columns:[`参数`,`说明`,`类型`,`默认值`],data:V.map(e=>({参数:e.param,说明:e.desc,类型:e.type,默认值:e.default}))},{title:`验证规则`,columns:[`规则`,`说明`,`示例`],data:H.map(e=>({规则:e.rule,说明:e.desc,示例:e.example}))}],n=e=>[`类型`,`默认值`,`参数`,`示例`].includes(e),r=(e,t)=>e[t]||`-`;return(e,i)=>(s(),T(`section`,ue,[i[0]||=g(`h2`,{class:`component-demo-view__section-title`},`API 说明`,-1),(s(),T(b,null,c(t,(e,t)=>g(`div`,{key:t,class:`api-section`},[g(`h3`,null,p(e.title),1),g(`table`,de,[g(`thead`,null,[g(`tr`,null,[(s(!0),T(b,null,c(e.columns,e=>(s(),T(`th`,{key:e},p(e),1))),128))])]),g(`tbody`,null,[(s(!0),T(b,null,c(e.data,(t,i)=>(s(),T(`tr`,{key:i},[(s(!0),T(b,null,c(e.columns,e=>(s(),T(`td`,{key:e},[n(e)?(s(),T(`code`,fe,p(r(t,e)),1)):(s(),T(`span`,pe,p(r(t,e)),1))]))),128))]))),128))])])])),64))]))}}),[[`__scopeId`,`data-v-55b439c1`]]);const he=[{value:`vertical`,label:`垂直布局`},{value:`horizontal`,label:`水平布局`},{value:`inline`,label:`行内布局`}],ge=[{value:`left`,label:`左对齐`},{value:`right`,label:`右对齐`},{value:`top`,label:`顶部对齐`}],_e=[{value:`large`,label:`大号`},{value:`medium`,label:`中号`},{value:`small`,label:`小号`}],U=u({username:``,email:``,password:``}),ve=[{required:!0,message:`请输入邮箱`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`邮箱格式不正确`}],ye=[{required:!0,message:`请输入密码`},{minLength:6,message:`密码至少6位`}],W=u({name:``,phone:``,address:``}),G=u({nickname:``,bio:``}),K=u({title:``,description:``}),q=u({username:``,email:``,age:``,phone:``}),J=u({username:``,password:``,confirmPassword:``}),be=e=>{let t=/[a-zA-Z]/.test(e),n=/\d/.test(e);return!!(t&&n)},xe=e=>e===J.password?!0:`两次输入的密码不一致`,Y=u({name:`张三`,email:`zhangsan@example.com`}),X=u({username:``,email:``}),Z=u({username:``,description:``,gender:``,hobbies:[],city:``,region:[],skills:[],newsletter:!0,attachments:[],agreement:!1}),Se=[{value:`beijing`,label:`北京市`,children:[{value:`haidian`,label:`海淀区`,children:[{value:`zhongguancun`,label:`中关村`},{value:`wudaokou`,label:`五道口`}]},{value:`chaoyang`,label:`朝阳区`,children:[{value:`sanlitun`,label:`三里屯`},{value:`guomao`,label:`国贸`}]}]},{value:`shanghai`,label:`上海市`,children:[{value:`pudong`,label:`浦东新区`,children:[{value:`lujiazui`,label:`陆家嘴`},{value:`zhangjiang`,label:`张江`}]},{value:`huangpu`,label:`黄浦区`,children:[{value:`nanjinglu`,label:`南京路`},{value:`waitan`,label:`外滩`}]}]},{value:`guangdong`,label:`广东省`,children:[{value:`guangzhou`,label:`广州市`,children:[{value:`tianhe`,label:`天河区`},{value:`yuexiu`,label:`越秀区`}]},{value:`shenzhen`,label:`深圳市`,children:[{value:`nanshan`,label:`南山区`},{value:`futian`,label:`福田区`}]}]}],Ce=e=>e&&e.length>0,we=e=>e&&e.length>0,Te=e=>e&&e.length>0,Ee=e=>e&&e.length>0,De=e=>e===!0;var Oe=1;const Q=u({items:[{id:Oe++,name:``,email:``,role:``,permissions:[]}]}),ke=()=>{Q.items.push({id:Oe++,name:``,email:``,role:``,permissions:[]})},Ae=e=>{Q.items.length>1&&Q.items.splice(e,1)},je=()=>{Q.items=[{id:Oe++,name:``,email:``,role:``,permissions:[]}]},$=u({username:``,email:``,phone:``,password:``}),Me=()=>{$.username=``,$.email=``,$.phone=``,$.password=``};var Ne={class:`component-demo-view`},Pe={class:`component-demo-view__section`},Fe={class:`component-demo-view__demo`},Ie={class:`form-actions`},Le={class:`component-demo-view__code`},Re={class:`component-demo-view__section`},ze={class:`form-layout-tabs`},Be=[`onClick`],Ve={class:`component-demo-view__demo`},He={class:`component-demo-view__code`},Ue={class:`component-demo-view__section`},We={class:`form-layout-tabs`},Ge=[`onClick`],Ke={class:`component-demo-view__demo`},qe={class:`component-demo-view__code`},Je={class:`component-demo-view__section`},Ye={class:`form-layout-tabs`},Xe=[`onClick`],Ze={class:`component-demo-view__demo`},Qe={class:`component-demo-view__code`},$e={class:`component-demo-view__section`},et={class:`component-demo-view__demo`},tt={class:`form-actions`},nt={class:`component-demo-view__code`},rt={class:`component-demo-view__section`},it={class:`component-demo-view__demo`},at={class:`component-demo-view__code`},ot={class:`component-demo-view__section`},st={class:`component-demo-view__demo`},ct={class:`component-demo-view__code`},lt={class:`component-demo-view__section`},ut={class:`component-demo-view__demo`},dt={class:`component-demo-view__code`},ft={class:`component-demo-view__section`},pt={class:`component-demo-view__demo`},mt={class:`form-actions`},ht={class:`component-demo-view__code`},gt={class:`component-demo-view__section`},_t={class:`component-demo-view__demo`},vt={class:`dynamic-form-item__header`},yt={class:`dynamic-form-item__title`},bt={class:`form-actions`},xt={class:`component-demo-view__code`},St={class:`component-demo-view__section`},Ct={class:`component-demo-view__demo`},wt={class:`form-actions`},Tt={class:`component-demo-view__code`},Et=v(n({__name:`index`,setup(e){let n=f(`vertical`),r=f(`right`),i=f(`medium`),a=f(),ee=e=>{I.success(`提交成功: ${JSON.stringify(e)}`)},u=()=>{U.username=``,U.email=``,U.password=``},d=()=>{U.username=`zhangsan`,U.email=`zhangsan@example.com`,U.password=`Password123`},te=()=>{if(!U.username){I.warning(`用户名不能为空`);return}if(!U.email){I.warning(`邮箱不能为空`);return}if(!/^[^\s@]+@[^\s@]+$/.test(U.email)){I.warning(`邮箱格式不正确`);return}if(!U.password){I.warning(`密码不能为空`);return}I.success(`校验通过！`)},h=()=>{I.success(`布局表单提交成功！`)},_=e=>{I.success(`标签位置表单提交: ${JSON.stringify(e)}`)},v=e=>{I.success(`尺寸表单提交: ${JSON.stringify(e)}`)},y=()=>{I.success(`验证通过，提交成功！`)},S=()=>{I.error(`表单验证失败，请检查输入`)},E=()=>{I.success(`自定义验证通过！`)},O=()=>{I.success(`全部字段验证通过！`)},ae=()=>{Z.username=``,Z.description=``,Z.gender=``,Z.hobbies=[],Z.city=``,Z.region=[],Z.skills=[],Z.newsletter=!0,Z.attachments=[],Z.agreement=!1},oe=()=>{let e=Q.items.filter(e=>e.name&&e.email&&e.role);I.success(`提交成功！共 ${e.length} 个成员`)},se=()=>{I.success(`验证通过，提交成功！`)};return(e,f)=>(s(),T(`div`,Ne,[f[101]||=g(`div`,{class:`component-demo-view__header`},[g(`h1`,{class:`component-demo-view__title`},`Form 表单`),g(`p`,{class:`component-demo-view__description`},` 具有数据收集、校验和提交功能的表单组件，包含表单域、表单布局、表单验证等功能。 `)],-1),g(`section`,Pe,[f[42]||=g(`h2`,{class:`component-demo-view__section-title`},`基础表单`,-1),g(`div`,Fe,[l(o(R),{model:o(U),onSubmit:ee},{default:t(()=>[l(o(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`请输入用户名`}]},{default:t(()=>[l(o(k),{modelValue:o(U).username,"onUpdate:modelValue":f[0]||=e=>o(U).username=e,placeholder:`请输入用户名`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`email`,label:`邮箱`,rules:o(ve)},{default:t(()=>[l(o(k),{modelValue:o(U).email,"onUpdate:modelValue":f[1]||=e=>o(U).email=e,placeholder:`请输入邮箱`,autocomplete:`email`},null,8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),{name:`password`,label:`密码`,rules:o(ye)},{default:t(()=>[l(o(k),{modelValue:o(U).password,"onUpdate:modelValue":f[2]||=e=>o(U).password=e,type:`password`,placeholder:`请输入密码`,autocomplete:`current-password`},null,8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),null,{default:t(()=>[g(`div`,Ie,[l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[38]||=[w(`提交`,-1)]]),_:1}),l(o(D),{onClick:u},{default:t(()=>[...f[39]||=[w(`重置`,-1)]]),_:1}),l(o(D),{type:`success`,onClick:d},{default:t(()=>[...f[40]||=[w(`填充示例数据`,-1)]]),_:1}),l(o(D),{type:`warning`,onClick:te},{default:t(()=>[...f[41]||=[w(`单独校验`,-1)]]),_:1})])]),_:1})]),_:1},8,[`model`])]),g(`div`,Le,[l(L,{code:`<template>
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
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,Re,[f[44]||=g(`h2`,{class:`component-demo-view__section-title`},`表单布局`,-1),g(`div`,ze,[(s(!0),T(b,null,c(o(he),e=>(s(),T(`button`,{key:e.value,class:x([`layout-tab`,{active:n.value===e.value}]),onClick:t=>n.value=e.value},p(e.label),11,Be))),128))]),g(`div`,Ve,[l(o(R),{model:o(W),layout:n.value,onSubmit:h},{default:t(()=>[l(o(z),{name:`name`,label:`姓名`,rules:[{required:!0}]},{default:t(()=>[l(o(k),{modelValue:o(W).name,"onUpdate:modelValue":f[3]||=e=>o(W).name=e,placeholder:`请输入姓名`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`phone`,label:`手机号`,rules:[{required:!0}]},{default:t(()=>[l(o(k),{modelValue:o(W).phone,"onUpdate:modelValue":f[4]||=e=>o(W).phone=e,placeholder:`请输入手机号`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`address`,label:`地址`},{default:t(()=>[l(o(k),{modelValue:o(W).address,"onUpdate:modelValue":f[5]||=e=>o(W).address=e,placeholder:`请输入地址`},null,8,[`modelValue`])]),_:1}),l(o(z),null,{default:t(()=>[l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[43]||=[w(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`,`layout`])]),g(`div`,He,[l(L,{code:`<template>
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
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,Ue,[f[46]||=g(`h2`,{class:`component-demo-view__section-title`},`标签位置`,-1),g(`div`,We,[(s(!0),T(b,null,c(o(ge),e=>(s(),T(`button`,{key:e.value,class:x([`layout-tab`,{active:r.value===e.value}]),onClick:t=>r.value=e.value},p(e.label),11,Ge))),128))]),g(`div`,Ke,[l(o(R),{model:o(G),layout:`horizontal`,"label-position":r.value,"label-width":`100px`,onSubmit:_},{default:t(()=>[l(o(z),{name:`nickname`,label:`昵称`,rules:[{required:!0}]},{default:t(()=>[l(o(k),{modelValue:o(G).nickname,"onUpdate:modelValue":f[6]||=e=>o(G).nickname=e,placeholder:`请输入昵称`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`bio`,label:`个人简介`},{default:t(()=>[l(o(k),{modelValue:o(G).bio,"onUpdate:modelValue":f[7]||=e=>o(G).bio=e,type:`textarea`,rows:3,placeholder:`请输入个人简介`},null,8,[`modelValue`])]),_:1}),l(o(z),null,{default:t(()=>[l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[45]||=[w(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`,`label-position`])]),g(`div`,qe,[l(L,{code:`<template>
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
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,Je,[f[48]||=g(`h2`,{class:`component-demo-view__section-title`},`表单尺寸`,-1),g(`div`,Ye,[(s(!0),T(b,null,c(o(_e),e=>(s(),T(`button`,{key:e.value,class:x([`layout-tab`,{active:i.value===e.value}]),onClick:t=>i.value=e.value},p(e.label),11,Xe))),128))]),g(`div`,Ze,[l(o(R),{model:o(K),size:i.value,onSubmit:v},{default:t(()=>[l(o(z),{name:`title`,label:`标题`,rules:[{required:!0}]},{default:t(()=>[l(o(k),{modelValue:o(K).title,"onUpdate:modelValue":f[8]||=e=>o(K).title=e,placeholder:`请输入标题`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`description`,label:`描述`},{default:t(()=>[l(o(k),{modelValue:o(K).description,"onUpdate:modelValue":f[9]||=e=>o(K).description=e,placeholder:`请输入描述`},null,8,[`modelValue`])]),_:1}),l(o(z),null,{default:t(()=>[l(o(D),{type:`primary`,"native-type":`submit`,size:i.value},{default:t(()=>[...f[47]||=[w(`提交`,-1)]]),_:1},8,[`size`])]),_:1})]),_:1},8,[`model`,`size`])]),g(`div`,Qe,[l(L,{code:`<template>
  <AleForm :model="form" size="large">
    <AleFormItem name="title" label="标题">
      <AleInput v-model="form.title" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" size="large">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,$e,[f[53]||=g(`h2`,{class:`component-demo-view__section-title`},`表单验证`,-1),g(`div`,et,[l(o(R),{ref_key:`validateFormRef`,ref:a,model:o(q),onSubmit:y,onValidateFail:S},{default:t(()=>[l(o(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`用户名不能为空`},{minLength:3,message:`用户名至少3个字符`},{maxLength:20,message:`用户名最多20个字符`}]},{default:t(()=>[l(o(k),{modelValue:o(q).username,"onUpdate:modelValue":f[10]||=e=>o(q).username=e,placeholder:`3-20个字符`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`email`,label:`邮箱`,rules:[{required:!0,message:`邮箱不能为空`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`请输入正确的邮箱格式`}]},{default:t(()=>[l(o(k),{modelValue:o(q).email,"onUpdate:modelValue":f[11]||=e=>o(q).email=e,placeholder:`example@email.com`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`age`,label:`年龄`,rules:[{required:!0,message:`年龄不能为空`},{min:18,message:`年龄不能小于18岁`},{max:120,message:`年龄不能大于120岁`}]},{default:t(()=>[l(o(k),{modelValue:o(q).age,"onUpdate:modelValue":f[12]||=e=>o(q).age=e,type:`number`,placeholder:`18-120`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`phone`,label:`手机号`,rules:[{required:!0,message:`手机号不能为空`},{pattern:/^1[3-9]\d{9}$/,message:`请输入正确的手机号格式`}]},{default:t(()=>[l(o(k),{modelValue:o(q).phone,"onUpdate:modelValue":f[13]||=e=>o(q).phone=e,placeholder:`11位手机号`},null,8,[`modelValue`])]),_:1}),l(o(z),null,{default:t(()=>[g(`div`,tt,[l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[49]||=[w(`提交`,-1)]]),_:1}),l(o(D),{onClick:f[14]||=e=>a.value?.validate()},{default:t(()=>[...f[50]||=[w(`单独验证`,-1)]]),_:1}),l(o(D),{onClick:f[15]||=e=>a.value?.resetFields()},{default:t(()=>[...f[51]||=[w(`重置`,-1)]]),_:1}),l(o(D),{onClick:f[16]||=e=>a.value?.clearValidate()},{default:t(()=>[...f[52]||=[w(`清除验证`,-1)]]),_:1})])]),_:1})]),_:1},8,[`model`])]),g(`div`,nt,[l(L,{code:`<template>
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
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,rt,[f[55]||=g(`h2`,{class:`component-demo-view__section-title`},`自定义验证`,-1),g(`div`,it,[l(o(R),{model:o(J),onSubmit:E},{default:t(()=>[l(o(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`请输入用户名`},{minLength:3,message:`用户名至少3位`}]},{default:t(()=>[l(o(k),{modelValue:o(J).username,"onUpdate:modelValue":f[17]||=e=>o(J).username=e,placeholder:`请输入用户名`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`password`,label:`密码`,rules:[{required:!0,message:`请输入密码`},{minLength:6,message:`密码至少6位`},{validator:o(be),message:`密码必须包含字母和数字`}]},{default:t(()=>[l(o(k),{modelValue:o(J).password,"onUpdate:modelValue":f[18]||=e=>o(J).password=e,type:`password`,placeholder:`请输入密码`,autocomplete:`new-password`},null,8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),{name:`confirmPassword`,label:`确认密码`,rules:[{required:!0,message:`请确认密码`},{validator:o(xe),message:`两次输入的密码不一致`}]},{default:t(()=>[l(o(k),{modelValue:o(J).confirmPassword,"onUpdate:modelValue":f[19]||=e=>o(J).confirmPassword=e,type:`password`,placeholder:`请再次输入密码`,autocomplete:`new-password`},null,8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),null,{default:t(()=>[l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[54]||=[w(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`])]),g(`div`,at,[l(L,{code:`<template>
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
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,ot,[f[57]||=g(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),g(`div`,st,[l(o(R),{model:o(Y),disabled:``},{default:t(()=>[l(o(z),{name:`name`,label:`姓名`},{default:t(()=>[l(o(k),{modelValue:o(Y).name,"onUpdate:modelValue":f[20]||=e=>o(Y).name=e},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`email`,label:`邮箱`},{default:t(()=>[l(o(k),{modelValue:o(Y).email,"onUpdate:modelValue":f[21]||=e=>o(Y).email=e},null,8,[`modelValue`])]),_:1}),l(o(z),null,{default:t(()=>[l(o(D),{type:`primary`,disabled:``},{default:t(()=>[...f[56]||=[w(`提交`,-1)]]),_:1})]),_:1})]),_:1},8,[`model`])]),g(`div`,ct,[l(L,{code:`<template>
  <AleForm :model="form" disabled>
    <AleFormItem name="name" label="姓名">
      <AleInput v-model="form.name" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" disabled>提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,lt,[f[58]||=g(`h2`,{class:`component-demo-view__section-title`},`提示信息`,-1),g(`div`,ut,[l(o(R),{model:o(X)},{default:t(()=>[l(o(z),{name:`username`,label:`用户名`,extra:`用户名用于登录系统，不能修改`},{default:t(()=>[l(o(k),{modelValue:o(X).username,"onUpdate:modelValue":f[22]||=e=>o(X).username=e},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`email`,label:`邮箱`,extra:`我们会向此邮箱发送验证邮件`},{default:t(()=>[l(o(k),{modelValue:o(X).email,"onUpdate:modelValue":f[23]||=e=>o(X).email=e},null,8,[`modelValue`])]),_:1})]),_:1},8,[`model`])]),g(`div`,dt,[l(L,{code:`<template>
  <AleForm :model="form">
    <AleFormItem name="username" label="用户名" extra="用户名用于登录系统">
      <AleInput v-model="form.username" />
    </AleFormItem>
  </AleForm>
</template>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,ft,[f[84]||=g(`h2`,{class:`component-demo-view__section-title`},`全部表单字段校验`,-1),g(`div`,pt,[l(o(R),{model:o(Z),onSubmit:O},{default:t(()=>[l(o(z),{name:`username`,label:`用户名`,rules:[{required:!0,message:`请输入用户名`},{minLength:3,message:`至少3个字符`},{maxLength:20,message:`最多20个字符`}]},{default:t(()=>[l(o(k),{modelValue:o(Z).username,"onUpdate:modelValue":f[24]||=e=>o(Z).username=e,placeholder:`3-20个字符`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`description`,label:`个人简介`,rules:[{required:!0,message:`请输入个人简介`},{minLength:10,message:`至少10个字符`},{maxLength:200,message:`最多200个字符`}]},{default:t(()=>[l(o(k),{modelValue:o(Z).description,"onUpdate:modelValue":f[25]||=e=>o(Z).description=e,type:`textarea`,rows:4,placeholder:`请输入10-200字的个人简介`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`gender`,label:`性别`,rules:[{required:!0,message:`请选择性别`}]},{default:t(()=>[l(o(F),{modelValue:o(Z).gender,"onUpdate:modelValue":f[26]||=e=>o(Z).gender=e},{default:t(()=>[l(o(P),{value:`male`},{default:t(()=>[...f[59]||=[w(`男`,-1)]]),_:1}),l(o(P),{value:`female`},{default:t(()=>[...f[60]||=[w(`女`,-1)]]),_:1}),l(o(P),{value:`other`},{default:t(()=>[...f[61]||=[w(`其他`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1}),l(o(z),{name:`hobbies`,label:`兴趣爱好`,rules:[{required:!0,message:`请选择至少一项兴趣爱好`},{validator:o(Ce),message:`至少选择一项`}]},{default:t(()=>[l(o(M),{modelValue:o(Z).hobbies,"onUpdate:modelValue":f[27]||=e=>o(Z).hobbies=e},{default:t(()=>[l(o(N),{value:`reading`},{default:t(()=>[...f[62]||=[w(`阅读`,-1)]]),_:1}),l(o(N),{value:`sports`},{default:t(()=>[...f[63]||=[w(`运动`,-1)]]),_:1}),l(o(N),{value:`music`},{default:t(()=>[...f[64]||=[w(`音乐`,-1)]]),_:1}),l(o(N),{value:`travel`},{default:t(()=>[...f[65]||=[w(`旅行`,-1)]]),_:1}),l(o(N),{value:`gaming`},{default:t(()=>[...f[66]||=[w(`游戏`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),{name:`city`,label:`城市`,rules:[{required:!0,message:`请选择城市`}]},{default:t(()=>[l(o(A),{modelValue:o(Z).city,"onUpdate:modelValue":f[28]||=e=>o(Z).city=e,placeholder:`请选择城市`},{default:t(()=>[l(o(j),{value:`beijing`},{default:t(()=>[...f[67]||=[w(`北京`,-1)]]),_:1}),l(o(j),{value:`shanghai`},{default:t(()=>[...f[68]||=[w(`上海`,-1)]]),_:1}),l(o(j),{value:`guangzhou`},{default:t(()=>[...f[69]||=[w(`广州`,-1)]]),_:1}),l(o(j),{value:`shenzhen`},{default:t(()=>[...f[70]||=[w(`深圳`,-1)]]),_:1}),l(o(j),{value:`hangzhou`},{default:t(()=>[...f[71]||=[w(`杭州`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1}),l(o(z),{name:`skills`,label:`技能标签`,rules:[{required:!0,message:`请选择至少一项技能`},{validator:o(we),message:`至少选择一项技能`}]},{default:t(()=>[l(o(A),{modelValue:o(Z).skills,"onUpdate:modelValue":f[29]||=e=>o(Z).skills=e,multiple:``,placeholder:`请选择技能（可多选）`},{default:t(()=>[l(o(j),{value:`javascript`},{default:t(()=>[...f[72]||=[w(`JavaScript`,-1)]]),_:1}),l(o(j),{value:`typescript`},{default:t(()=>[...f[73]||=[w(`TypeScript`,-1)]]),_:1}),l(o(j),{value:`vue`},{default:t(()=>[...f[74]||=[w(`Vue.js`,-1)]]),_:1}),l(o(j),{value:`react`},{default:t(()=>[...f[75]||=[w(`React`,-1)]]),_:1}),l(o(j),{value:`node`},{default:t(()=>[...f[76]||=[w(`Node.js`,-1)]]),_:1}),l(o(j),{value:`python`},{default:t(()=>[...f[77]||=[w(`Python`,-1)]]),_:1}),l(o(j),{value:`go`},{default:t(()=>[...f[78]||=[w(`Go`,-1)]]),_:1}),l(o(j),{value:`rust`},{default:t(()=>[...f[79]||=[w(`Rust`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),{name:`region`,label:`所在地区`,rules:[{required:!0,message:`请选择所在地区`},{validator:o(Te),message:`请选择完整的地区信息`}]},{default:t(()=>[l(o(re),{modelValue:o(Z).region,"onUpdate:modelValue":f[30]||=e=>o(Z).region=e,options:o(Se),placeholder:`请选择省/市/区`,clearable:``},null,8,[`modelValue`,`options`])]),_:1},8,[`rules`]),l(o(z),{name:`newsletter`,label:`订阅通知`},{default:t(()=>[l(o(ne),{modelValue:o(Z).newsletter,"onUpdate:modelValue":f[31]||=e=>o(Z).newsletter=e,"active-text":`接收邮件通知`,"inactive-text":`不接收`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`attachments`,label:`附件上传`,rules:[{required:!0,message:`请上传附件`},{validator:o(Ee),message:`请至少上传一个文件`}]},{default:t(()=>[l(o(ie),{modelValue:o(Z).attachments,"onUpdate:modelValue":f[32]||=e=>o(Z).attachments=e,"list-type":`text`,limit:3},{default:t(()=>[l(o(D),{type:`primary`,size:`small`},{default:t(()=>[...f[80]||=[w(`点击上传`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),{name:`agreement`,rules:[{required:!0,message:`请同意用户协议`},{validator:o(De),message:`必须同意用户协议`}]},{default:t(()=>[l(o(N),{modelValue:o(Z).agreement,"onUpdate:modelValue":f[33]||=e=>o(Z).agreement=e},{default:t(()=>[...f[81]||=[w(` 我已阅读并同意《用户服务协议》和《隐私政策》 `,-1)]]),_:1},8,[`modelValue`])]),_:1},8,[`rules`]),l(o(z),null,{default:t(()=>[g(`div`,mt,[l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[82]||=[w(`提交`,-1)]]),_:1}),l(o(D),{onClick:ae},{default:t(()=>[...f[83]||=[w(`重置`,-1)]]),_:1})])]),_:1})]),_:1},8,[`model`])]),g(`div`,ht,[l(L,{code:`<template>
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
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,gt,[f[95]||=g(`h2`,{class:`component-demo-view__section-title`},`动态循环表单`,-1),f[96]||=g(`p`,{class:`tag-view__desc`},`可以动态添加、删除表单项的循环表单`,-1),g(`div`,_t,[l(o(R),{model:o(Q),onSubmit:oe},{default:t(()=>[(s(!0),T(b,null,c(o(Q).items,(e,n)=>(s(),T(`div`,{key:e.id,class:`dynamic-form-item`},[g(`div`,vt,[g(`span`,yt,`成员 `+p(n+1),1),o(Q).items.length>1?(s(),m(o(D),{key:0,type:`danger`,size:`small`,onClick:e=>o(Ae)(n)},{default:t(()=>[...f[85]||=[w(` 删除 `,-1)]]),_:1},8,[`onClick`])):C(``,!0)]),l(o(z),{name:`items.${n}.name`,label:`姓名`,rules:[{required:!0,message:`请输入姓名`}]},{default:t(()=>[l(o(k),{modelValue:e.name,"onUpdate:modelValue":t=>e.name=t,placeholder:`请输入姓名`},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`]),l(o(z),{name:`items.${n}.email`,label:`邮箱`,rules:[{required:!0,message:`请输入邮箱`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`邮箱格式不正确`}]},{default:t(()=>[l(o(k),{modelValue:e.email,"onUpdate:modelValue":t=>e.email=t,placeholder:`请输入邮箱`},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`]),l(o(z),{name:`items.${n}.role`,label:`角色`,rules:[{required:!0,message:`请选择角色`}]},{default:t(()=>[l(o(F),{modelValue:e.role,"onUpdate:modelValue":t=>e.role=t},{default:t(()=>[l(o(P),{value:`admin`},{default:t(()=>[...f[86]||=[w(`管理员`,-1)]]),_:1}),l(o(P),{value:`editor`},{default:t(()=>[...f[87]||=[w(`编辑`,-1)]]),_:1}),l(o(P),{value:`viewer`},{default:t(()=>[...f[88]||=[w(`访客`,-1)]]),_:1})]),_:1},8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`]),l(o(z),{name:`items.${n}.permissions`,label:`权限`},{default:t(()=>[l(o(M),{modelValue:e.permissions,"onUpdate:modelValue":t=>e.permissions=t},{default:t(()=>[l(o(N),{value:`read`},{default:t(()=>[...f[89]||=[w(`读取`,-1)]]),_:1}),l(o(N),{value:`write`},{default:t(()=>[...f[90]||=[w(`写入`,-1)]]),_:1}),l(o(N),{value:`delete`},{default:t(()=>[...f[91]||=[w(`删除`,-1)]]),_:1})]),_:1},8,[`modelValue`,`onUpdate:modelValue`])]),_:2},1032,[`name`])]))),128)),l(o(z),null,{default:t(()=>[g(`div`,bt,[l(o(D),{type:`primary`,onClick:o(ke)},{default:t(()=>[...f[92]||=[w(` + 添加成员 `,-1)]]),_:1},8,[`onClick`]),l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[93]||=[w(`提交`,-1)]]),_:1}),l(o(D),{onClick:o(je)},{default:t(()=>[...f[94]||=[w(`重置`,-1)]]),_:1},8,[`onClick`])])]),_:1})]),_:1},8,[`model`])]),g(`div`,xt,[l(L,{code:`<template>
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
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),g(`section`,St,[f[99]||=g(`h2`,{class:`component-demo-view__section-title`},`验证触发事件`,-1),f[100]||=g(`p`,{class:`tag-view__desc`},`支持 change、blur、focus 和 submit 四种触发时机`,-1),g(`div`,Ct,[l(o(R),{model:o($),onSubmit:se},{default:t(()=>[l(o(z),{name:`username`,label:`用户名(change)`,rules:[{required:!0,message:`请输入用户名`,trigger:`change`},{minLength:3,message:`至少3个字符`,trigger:`change`}]},{default:t(()=>[l(o(k),{modelValue:o($).username,"onUpdate:modelValue":f[34]||=e=>o($).username=e,placeholder:`输入时实时验证`,autocomplete:`username`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`email`,label:`邮箱(blur)`,rules:[{required:!0,message:`请输入邮箱`,trigger:`blur`},{pattern:/^[^\s@]+@[^\s@]+$/,message:`邮箱格式不正确`,trigger:`blur`}]},{default:t(()=>[l(o(k),{modelValue:o($).email,"onUpdate:modelValue":f[35]||=e=>o($).email=e,placeholder:`失去焦点时验证`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`phone`,label:`手机号(change+blur)`,rules:[{required:!0,message:`请输入手机号`,trigger:[`change`,`blur`]},{pattern:/^1[3-9]\d{9}$/,message:`手机号格式不正确`,trigger:[`change`,`blur`]}]},{default:t(()=>[l(o(k),{modelValue:o($).phone,"onUpdate:modelValue":f[36]||=e=>o($).phone=e,placeholder:`输入和失去焦点都验证`},null,8,[`modelValue`])]),_:1}),l(o(z),{name:`password`,label:`密码(focus+blur)`,rules:[{required:!0,message:`请输入密码`,trigger:`blur`},{minLength:6,message:`至少6位`,trigger:`blur`}]},{default:t(()=>[l(o(k),{modelValue:o($).password,"onUpdate:modelValue":f[37]||=e=>o($).password=e,type:`password`,placeholder:`获得焦点时验证`,autocomplete:`current-password`},null,8,[`modelValue`])]),_:1}),l(o(z),null,{default:t(()=>[g(`div`,wt,[l(o(D),{type:`primary`,"native-type":`submit`},{default:t(()=>[...f[97]||=[w(`提交`,-1)]]),_:1}),l(o(D),{onClick:o(Me)},{default:t(()=>[...f[98]||=[w(`重置`,-1)]]),_:1},8,[`onClick`])])]),_:1})]),_:1},8,[`model`])]),g(`div`,Tt,[l(L,{code:`<template>
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
<\/script>`,language:`vue`,title:`示例代码`},null,8,[`code`])])]),l(me)]))}}),[[`__scopeId`,`data-v-a7217746`]]);export{Et as default};
import{t as e}from"./CodeBlock-CmDK_EYq.js";import{B as t,G as n,H as r,J as i,K as a,N as o,O as s,P as c,R as l,S as u,U as d,_ as f,b as p,c as m,d as h,f as g,g as _,h as v,i as y,j as b,k as x,l as S,m as C,o as ee,p as w,q as T,r as E,s as te,v as D,x as O,z as k}from"./index-D6beBo5R.js";import{t as A}from"./button-CbFeg90j.js";var j={key:0,class:`ale-dialog__header`},M={class:`ale-dialog__title`},N={class:`ale-dialog__body`},P={key:1,class:`ale-dialog__footer`},F=E(u({__name:`Dialog`,props:{modelValue:{type:Boolean,default:!1},title:{default:`提示`},width:{default:``},size:{default:`medium`},position:{default:`center`},showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},showFooter:{type:Boolean,default:!0},confirmText:{default:`确定`},cancelText:{default:`取消`},showConfirm:{type:Boolean,default:!0},showCancel:{type:Boolean,default:!0},confirmLoading:{type:Boolean,default:!1},confirmDisabled:{type:Boolean,default:!1},cancelDisabled:{type:Boolean,default:!1},keyboard:{type:Boolean,default:!0},zIndex:{default:2e3},customClass:{default:``},lockScroll:{type:Boolean,default:!0},destroyOnClose:{type:Boolean,default:!1}},emits:[`update:modelValue`,`confirm`,`cancel`,`close`,`open`,`opened`,`closed`],setup(e,{expose:r,emit:o}){let u=e,m=o,g=d(u.modelValue),ee=d(!1),E=C(()=>u.showClose||u.title||!0),te=C(()=>[`ale-dialog-wrapper`,{"is-mask":u.showMask,[`is-position-${u.position}`]:u.position},u.customClass]),F=C(()=>[`ale-dialog`,`ale-dialog--${u.size}`,{"has-header":E.value,"has-footer":u.showFooter}]),ne=C(()=>({"z-index":u.zIndex})),re=C(()=>{let e={};return u.width&&(e.width=typeof u.width==`number`?`${u.width}px`:u.width),e}),I=e=>{u.lockScroll&&(e?document.body.style.overflow=`hidden`:document.body.style.overflow=``)},L=e=>{!u.keyboard||!g.value||e.key===`Escape`&&z()},ie=()=>{g.value=!0,I(!0),m(`update:modelValue`,!0),m(`open`)},R=()=>{g.value=!1,I(!1),m(`update:modelValue`,!1),m(`close`)},z=()=>{R()},B=()=>{u.maskClosable&&z()},V=()=>{m(`confirm`)},H=()=>{m(`cancel`),R()},U=()=>{m(`opened`)},ae=()=>{m(`closed`)};return l(()=>u.modelValue,e=>{e!==g.value&&(e?(g.value=!0,I(!0),m(`open`)):(g.value=!1,I(!1),m(`close`)))}),s(()=>{ee.value=!0,document.addEventListener(`keydown`,L)}),x(()=>{document.removeEventListener(`keydown`,L),I(!1)}),r({open:ie,close:R}),(r,o)=>(b(),_(w,{to:`body`},[O(y,{name:`ale-dialog-fade`,onAfterEnter:U,onAfterLeave:ae},{default:k(()=>[t(v(`div`,{class:a(te.value),style:T(ne.value),role:`dialog`,"aria-modal":`true`,onClick:h(B,[`self`])},[v(`div`,{class:a(F.value),style:T(re.value)},[E.value?(b(),D(`div`,j,[c(r.$slots,`title`,{},()=>[v(`h3`,M,i(e.title),1)],!0),e.showClose?(b(),D(`button`,{key:0,type:`button`,class:`ale-dialog__close`,"aria-label":`关闭`,onClick:z},[...o[0]||=[v(`span`,{class:`ale-dialog__close-icon`},`×`,-1)]])):f(``,!0)])):f(``,!0),v(`div`,N,[c(r.$slots,`default`,{},void 0,!0)]),e.showFooter?(b(),D(`div`,P,[c(r.$slots,`footer`,{},()=>[e.showCancel?(b(),_(n(A),{key:0,disabled:e.cancelDisabled,onClick:H},{default:k(()=>[p(i(e.cancelText),1)]),_:1},8,[`disabled`])):f(``,!0),e.showConfirm?(b(),_(n(A),{key:1,type:`primary`,loading:e.confirmLoading,disabled:e.confirmDisabled,onClick:V},{default:k(()=>[p(i(e.confirmText),1)]),_:1},8,[`loading`,`disabled`])):f(``,!0)],!0)])):f(``,!0)],6)],6),[[S,g.value]])]),_:3})]))}}),[[`__scopeId`,`data-v-e43e1c8a`]]),ne={class:`component-demo-view`},re={class:`component-demo-view__section`},I={class:`component-demo-view__demo`},L={class:`component-demo-view__code`},ie={class:`component-demo-view__section`},R={class:`component-demo-view__demo`,style:{gap:`16px`}},z={class:`component-demo-view__code`},B={class:`component-demo-view__section`},V={class:`component-demo-view__demo`,style:{gap:`16px`}},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`,style:{gap:`16px`}},oe={class:`component-demo-view__code`},se={class:`component-demo-view__section`},ce={class:`component-demo-view__demo`},le={class:`component-demo-view__code`},ue={class:`component-demo-view__section`},de={class:`component-demo-view__demo`},fe={class:`component-demo-view__code`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`},he={class:`component-demo-view__code`},ge={class:`component-demo-view__section`},_e={class:`component-demo-view__demo`,style:{gap:`16px`}},ve={style:{"text-align":`center`,"margin-top":`20px`}},ye={class:`component-demo-view__code`},be={class:`component-demo-view__section`},xe={class:`component-demo-view__demo`},Se={class:`component-demo-view__code`},Ce={class:`component-demo-view__section`},we={class:`component-demo-view__demo`},Te={key:0,style:{color:`var(--color-success)`,"margin-top":`12px`}},Ee={class:`component-demo-view__code`},De={class:`component-demo-view__section`},Oe={class:`component-demo-view__demo`},ke={class:`form-content`},Ae={class:`form-row`},je={class:`form-row`},Me={class:`form-row`},Ne={class:`form-row`},Pe={class:`form-label`},Fe={class:`component-demo-view__code`},Ie={class:`component-demo-view__section`},Le={class:`component-demo-view__demo`},Re={class:`component-demo-view__code`},ze={class:`component-demo-view__section`},Be={class:`component-demo-view__demo`},Ve={class:`custom-footer`},He={class:`footer-right`},Ue={class:`component-demo-view__code`},We={class:`component-demo-view__section`},Ge={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`,gap:`16px`}},Ke={class:`event-log`},qe={class:`component-demo-view__code`},Je=`<template>
  <AleButton @click="visible = true">打开对话框</AleButton>
  <Dialog
    v-model="visible"
    title="基础对话框"
    @confirm="visible = false"
  >
    <p>这是一个基础的对话框示例</p>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton } from 'ale-ui';

const visible = ref(false);
<\/script>`,Ye=`<template>
  <AleButton @click="smallVisible = true">小尺寸</AleButton>
  <AleButton @click="largeVisible = true">大尺寸</AleButton>

  <Dialog v-model="smallVisible" title="小尺寸" size="small">
    <p>小尺寸对话框，宽度 400px</p>
  </Dialog>

  <Dialog v-model="largeVisible" title="大尺寸" size="large">
    <p>大尺寸对话框，宽度 720px</p>
  </Dialog>
</template>`,Xe=`<template>
  <Dialog v-model="visible" title="顶部位置" position="top">
    <p>对话框显示在屏幕顶部</p>
  </Dialog>
</template>`,Ze=`<template>
  <Dialog v-model="visible" title="自定义宽度" width="600px">
    <p>自定义宽度 600px</p>
  </Dialog>

  <Dialog v-model="visible2" title="数字宽度" :width="800">
    <p>数字宽度 800px</p>
  </Dialog>
</template>`,Qe=`<template>
  <Dialog v-model="visible" title="无遮罩层" :show-mask="false">
    <p>隐藏背景遮罩层</p>
  </Dialog>
</template>`,$e=`<template>
  <Dialog v-model="visible" title="不可点击关闭" :mask-closable="false">
    <p>点击遮罩层不会关闭对话框</p>
  </Dialog>
</template>`,et=`<template>
  <Dialog v-model="visible" title="无关闭按钮" :show-close="false">
    <p>隐藏右上角的关闭按钮</p>
  </Dialog>
</template>`,tt=`<template>
  <!-- 无底部栏 -->
  <Dialog v-model="visible1" title="无底部栏" :show-footer="false">
    <p>完全隐藏底部操作栏</p>
  </Dialog>

  <!-- 无取消按钮 -->
  <Dialog v-model="visible2" title="无取消按钮" :show-cancel="false">
    <p>只显示确认按钮</p>
  </Dialog>

  <!-- 无确认按钮 -->
  <Dialog v-model="visible3" title="无确认按钮" :show-confirm="false">
    <p>只显示取消按钮</p>
  </Dialog>
</template>`,nt=`<template>
  <Dialog
    v-model="visible"
    title="保存更改"
    confirm-text="保存"
    cancel-text="不保存"
  >
    <p>是否要保存更改？</p>
  </Dialog>
</template>`,rt=`<template>
  <Dialog
    v-model="visible"
    title="提交数据"
    confirm-text="提交"
    :confirm-loading="isLoading"
    @confirm="handleSubmit"
  >
    <p>点击提交按钮</p>
  </Dialog>
</template>

<script setup lang="ts">
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  isLoading.value = false;
  visible.value = false;
};
<\/script>`,it=`<template>
  <Dialog v-model="visible" title="编辑信息" confirm-text="保存">
    <div class="form-content">
      <div class="form-row">
        <label>用户名</label>
        <input v-model="form.name" placeholder="请输入用户名">
      </div>
      <div class="form-row">
        <label>邮箱</label>
        <input v-model="form.email" placeholder="请输入邮箱">
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: ''
});
<\/script>`,at=`<template>
  <Dialog v-model="visible">
    <template #title>
      <div class="custom-title">
        <span>⚠️</span>
        <span>警告提示</span>
        <span class="badge">重要</span>
      </div>
    </template>
    <p>自定义标题内容</p>
  </Dialog>
</template>`,ot=`<template>
  <Dialog v-model="visible" title="确认操作">
    <p>自定义底部操作栏</p>
    <template #footer>
      <div class="custom-footer">
        <AleButton @click="visible = false">稍后处理</AleButton>
        <div>
          <AleButton @click="visible = false">拒绝</AleButton>
          <AleButton theme="primary" @click="visible = false">同意</AleButton>
        </div>
      </div>
    </template>
  </Dialog>
</template>`,st=`<template>
  <Dialog
    v-model="visible"
    @open="handleEvent('open')"
    @opened="handleEvent('opened')"
    @close="handleEvent('close')"
    @closed="handleEvent('closed')"
    @confirm="handleEvent('confirm')"
    @cancel="handleEvent('cancel')"
  >
    <p>事件测试</p>
  </Dialog>
</template>

<script setup lang="ts">
const handleEvent = (name: string) => {
  console.log(name + ' 事件触发');
};
<\/script>`,W=E(u({__name:`DialogView`,setup(a){let s=d(!1),c=d(!1),l=d(!1),u=d(!1),h=d(!1),y=d(!1),x=d(!1),S=d(!1),C=d(!1),w=d(!1),T=d(!1),E=d(!1),j=d(!1),M=d(!1),N=d(!1),P=d(!1),W=d(!1),G=d(!1),K=d(``),ct=async()=>{G.value=!0,K.value=``,await new Promise(e=>setTimeout(e,1500)),G.value=!1,K.value=`提交成功！`,setTimeout(()=>{W.value=!1,K.value=``},1500)},q=d(!1),J=r({name:``,email:``,role:`user`,enabled:!0}),lt=()=>{console.log(`保存用户:`,J),q.value=!1},Y=d(!1),X=d(!1),Z=d(!1),Q=d([]),$=e=>{let t=new Date().toLocaleTimeString();Q.value.unshift(`[${t}] ${e} 事件触发`)};return(r,a)=>(b(),D(`div`,ne,[a[143]||=v(`div`,{class:`component-demo-view__header`},[v(`h1`,{class:`component-demo-view__title`},`Dialog 对话框`),v(`p`,{class:`component-demo-view__description`},` 对话框用于在保留当前页面状态的情况下，告知用户并承载相关操作 `)],-1),v(`section`,re,[a[77]||=v(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),v(`div`,I,[O(n(A),{onClick:a[0]||=e=>s.value=!0},{default:k(()=>[...a[75]||=[p(`打开对话框`,-1)]]),_:1}),O(n(F),{modelValue:s.value,"onUpdate:modelValue":a[1]||=e=>s.value=e,title:`基础对话框`,onConfirm:a[2]||=e=>s.value=!1},{default:k(()=>[...a[76]||=[v(`p`,null,`这是一个基础的对话框示例，包含标题、内容和底部操作按钮。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,L,[O(e,{code:Je,language:`vue`,title:`示例代码`})])]),v(`section`,ie,[a[86]||=v(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),v(`div`,R,[O(n(A),{size:`small`,onClick:a[3]||=e=>c.value=!0},{default:k(()=>[...a[78]||=[p(`小尺寸`,-1)]]),_:1}),O(n(A),{onClick:a[4]||=e=>l.value=!0},{default:k(()=>[...a[79]||=[p(`中尺寸`,-1)]]),_:1}),O(n(A),{onClick:a[5]||=e=>u.value=!0},{default:k(()=>[...a[80]||=[p(`大尺寸`,-1)]]),_:1}),O(n(A),{theme:`primary`,onClick:a[6]||=e=>h.value=!0},{default:k(()=>[...a[81]||=[p(`全屏`,-1)]]),_:1}),O(n(F),{modelValue:c.value,"onUpdate:modelValue":a[7]||=e=>c.value=e,title:`小尺寸对话框`,size:`small`,onConfirm:a[8]||=e=>c.value=!1},{default:k(()=>[...a[82]||=[v(`p`,null,`这是一个小尺寸的对话框，宽度为 400px。`,-1)]]),_:1},8,[`modelValue`]),O(n(F),{modelValue:l.value,"onUpdate:modelValue":a[9]||=e=>l.value=e,title:`中尺寸对话框`,size:`medium`,onConfirm:a[10]||=e=>l.value=!1},{default:k(()=>[...a[83]||=[v(`p`,null,`这是一个中尺寸的对话框，宽度为 520px（默认）。`,-1)]]),_:1},8,[`modelValue`]),O(n(F),{modelValue:u.value,"onUpdate:modelValue":a[11]||=e=>u.value=e,title:`大尺寸对话框`,size:`large`,onConfirm:a[12]||=e=>u.value=!1},{default:k(()=>[...a[84]||=[v(`p`,null,`这是一个大尺寸的对话框，宽度为 720px。`,-1)]]),_:1},8,[`modelValue`]),O(n(F),{modelValue:h.value,"onUpdate:modelValue":a[13]||=e=>h.value=e,title:`全屏对话框`,size:`fullscreen`,onConfirm:a[14]||=e=>h.value=!1},{default:k(()=>[...a[85]||=[v(`p`,null,`这是一个全屏对话框，占据大部分屏幕空间。`,-1),v(`p`,null,`适合展示大量内容或复杂的表单。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,z,[O(e,{code:Ye,language:`vue`,title:`示例代码`})])]),v(`section`,B,[a[91]||=v(`h2`,{class:`component-demo-view__section-title`},`自定义位置`,-1),v(`div`,V,[O(n(A),{onClick:a[15]||=e=>y.value=!0},{default:k(()=>[...a[87]||=[p(`居中（默认）`,-1)]]),_:1}),O(n(A),{onClick:a[16]||=e=>x.value=!0},{default:k(()=>[...a[88]||=[p(`顶部`,-1)]]),_:1}),O(n(F),{modelValue:y.value,"onUpdate:modelValue":a[17]||=e=>y.value=e,title:`居中对话框`,position:`center`,onConfirm:a[18]||=e=>y.value=!1},{default:k(()=>[...a[89]||=[v(`p`,null,`对话框在屏幕中央显示（默认位置）。`,-1)]]),_:1},8,[`modelValue`]),O(n(F),{modelValue:x.value,"onUpdate:modelValue":a[19]||=e=>x.value=e,title:`顶部对话框`,position:`top`,onConfirm:a[20]||=e=>x.value=!1},{default:k(()=>[...a[90]||=[v(`p`,null,`对话框在屏幕顶部显示。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,H,[O(e,{code:Xe,language:`vue`,title:`示例代码`})])]),v(`section`,U,[a[96]||=v(`h2`,{class:`component-demo-view__section-title`},`自定义宽度`,-1),v(`div`,ae,[O(n(A),{onClick:a[21]||=e=>S.value=!0},{default:k(()=>[...a[92]||=[p(`600px 宽度`,-1)]]),_:1}),O(n(A),{onClick:a[22]||=e=>C.value=!0},{default:k(()=>[...a[93]||=[p(`800px 宽度`,-1)]]),_:1}),O(n(F),{modelValue:S.value,"onUpdate:modelValue":a[23]||=e=>S.value=e,title:`自定义宽度 600px`,width:`600px`,onConfirm:a[24]||=e=>S.value=!1},{default:k(()=>[...a[94]||=[v(`p`,null,`通过 width 属性可以自定义对话框的宽度。`,-1)]]),_:1},8,[`modelValue`]),O(n(F),{modelValue:C.value,"onUpdate:modelValue":a[25]||=e=>C.value=e,title:`自定义宽度 800px`,width:800,onConfirm:a[26]||=e=>C.value=!1},{default:k(()=>[...a[95]||=[v(`p`,null,`width 属性可以是字符串（带单位）或数字（自动转为像素）。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,oe,[O(e,{code:Ze,language:`vue`,title:`示例代码`})])]),v(`section`,se,[a[99]||=v(`h2`,{class:`component-demo-view__section-title`},`隐藏遮罩层`,-1),v(`div`,ce,[O(n(A),{onClick:a[27]||=e=>w.value=!0},{default:k(()=>[...a[97]||=[p(`无遮罩层`,-1)]]),_:1}),O(n(F),{modelValue:w.value,"onUpdate:modelValue":a[28]||=e=>w.value=e,title:`无遮罩层`,"show-mask":!1,onConfirm:a[29]||=e=>w.value=!1},{default:k(()=>[...a[98]||=[v(`p`,null,`设置 show-mask="false" 可以隐藏背景遮罩层。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,le,[O(e,{code:Qe,language:`vue`,title:`示例代码`})])]),v(`section`,ue,[a[102]||=v(`h2`,{class:`component-demo-view__section-title`},`禁止遮罩层关闭`,-1),v(`div`,de,[O(n(A),{onClick:a[30]||=e=>T.value=!0},{default:k(()=>[...a[100]||=[p(`点击遮罩不关闭`,-1)]]),_:1}),O(n(F),{modelValue:T.value,"onUpdate:modelValue":a[31]||=e=>T.value=e,title:`禁止遮罩层关闭`,"mask-closable":!1,onConfirm:a[32]||=e=>T.value=!1},{default:k(()=>[...a[101]||=[v(`p`,null,`设置 mask-closable="false" 后，点击遮罩层不会关闭对话框。`,-1),v(`p`,null,`只能通过点击关闭按钮或确认/取消按钮来关闭。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,fe,[O(e,{code:$e,language:`vue`,title:`示例代码`})])]),v(`section`,pe,[a[105]||=v(`h2`,{class:`component-demo-view__section-title`},`隐藏关闭按钮`,-1),v(`div`,me,[O(n(A),{onClick:a[33]||=e=>E.value=!0},{default:k(()=>[...a[103]||=[p(`无关闭按钮`,-1)]]),_:1}),O(n(F),{modelValue:E.value,"onUpdate:modelValue":a[34]||=e=>E.value=e,title:`无关闭按钮`,"show-close":!1,onConfirm:a[35]||=e=>E.value=!1},{default:k(()=>[...a[104]||=[v(`p`,null,`设置 show-close="false" 可以隐藏右上角的关闭按钮。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,he,[O(e,{code:et,language:`vue`,title:`示例代码`})])]),v(`section`,ge,[a[113]||=v(`h2`,{class:`component-demo-view__section-title`},`隐藏底部按钮`,-1),v(`div`,_e,[O(n(A),{onClick:a[36]||=e=>j.value=!0},{default:k(()=>[...a[106]||=[p(`无底部栏`,-1)]]),_:1}),O(n(A),{onClick:a[37]||=e=>M.value=!0},{default:k(()=>[...a[107]||=[p(`无取消按钮`,-1)]]),_:1}),O(n(A),{onClick:a[38]||=e=>N.value=!0},{default:k(()=>[...a[108]||=[p(`无确认按钮`,-1)]]),_:1}),O(n(F),{modelValue:j.value,"onUpdate:modelValue":a[40]||=e=>j.value=e,title:`无底部栏`,"show-footer":!1},{default:k(()=>[a[110]||=v(`p`,null,`设置 show-footer="false" 可以完全隐藏底部操作栏。`,-1),v(`p`,ve,[O(n(A),{size:`small`,onClick:a[39]||=e=>j.value=!1},{default:k(()=>[...a[109]||=[p(`关闭`,-1)]]),_:1})])]),_:1},8,[`modelValue`]),O(n(F),{modelValue:M.value,"onUpdate:modelValue":a[41]||=e=>M.value=e,title:`无取消按钮`,"show-cancel":!1,onConfirm:a[42]||=e=>M.value=!1},{default:k(()=>[...a[111]||=[v(`p`,null,`设置 show-cancel="false" 可以隐藏取消按钮。`,-1)]]),_:1},8,[`modelValue`]),O(n(F),{modelValue:N.value,"onUpdate:modelValue":a[43]||=e=>N.value=e,title:`无确认按钮`,"show-confirm":!1,onCancel:a[44]||=e=>N.value=!1},{default:k(()=>[...a[112]||=[v(`p`,null,`设置 show-confirm="false" 可以隐藏确认按钮。`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,ye,[O(e,{code:tt,language:`vue`,title:`示例代码`})])]),v(`section`,be,[a[116]||=v(`h2`,{class:`component-demo-view__section-title`},`自定义按钮文本`,-1),v(`div`,xe,[O(n(A),{onClick:a[45]||=e=>P.value=!0},{default:k(()=>[...a[114]||=[p(`自定义按钮文本`,-1)]]),_:1}),O(n(F),{modelValue:P.value,"onUpdate:modelValue":a[46]||=e=>P.value=e,title:`保存更改`,"confirm-text":`保存`,"cancel-text":`不保存`,onConfirm:a[47]||=e=>P.value=!1,onCancel:a[48]||=e=>P.value=!1},{default:k(()=>[...a[115]||=[v(`p`,null,`是否要保存对当前文档的更改？`,-1)]]),_:1},8,[`modelValue`])]),v(`div`,Se,[O(e,{code:nt,language:`vue`,title:`示例代码`})])]),v(`section`,Ce,[a[119]||=v(`h2`,{class:`component-demo-view__section-title`},`加载状态`,-1),v(`div`,we,[O(n(A),{onClick:a[49]||=e=>W.value=!0},{default:k(()=>[...a[117]||=[p(`显示加载状态`,-1)]]),_:1}),O(n(F),{modelValue:W.value,"onUpdate:modelValue":a[50]||=e=>W.value=e,title:`提交数据`,"confirm-text":`提交`,"confirm-loading":G.value,onConfirm:ct},{default:k(()=>[a[118]||=v(`p`,null,`点击提交按钮会模拟异步请求，确认按钮会显示加载状态。`,-1),K.value?(b(),D(`p`,Te,i(K.value),1)):f(``,!0)]),_:1},8,[`modelValue`,`confirm-loading`])]),v(`div`,Ee,[O(e,{code:rt,language:`vue`,title:`示例代码`})])]),v(`section`,De,[a[126]||=v(`h2`,{class:`component-demo-view__section-title`},`自定义内容`,-1),v(`div`,Oe,[O(n(A),{onClick:a[51]||=e=>q.value=!0},{default:k(()=>[...a[120]||=[p(`表单对话框`,-1)]]),_:1}),O(n(F),{modelValue:q.value,"onUpdate:modelValue":a[56]||=e=>q.value=e,title:`编辑用户信息`,size:`medium`,"confirm-text":`保存`,onConfirm:lt,onCancel:a[57]||=e=>q.value=!1},{default:k(()=>[v(`div`,ke,[v(`div`,Ae,[a[121]||=v(`label`,{class:`form-label`},`用户名`,-1),t(v(`input`,{"onUpdate:modelValue":a[52]||=e=>J.name=e,class:`form-input`,placeholder:`请输入用户名`},null,512),[[m,J.name]])]),v(`div`,je,[a[122]||=v(`label`,{class:`form-label`},`邮箱`,-1),t(v(`input`,{"onUpdate:modelValue":a[53]||=e=>J.email=e,class:`form-input`,placeholder:`请输入邮箱`},null,512),[[m,J.email]])]),v(`div`,Me,[a[124]||=v(`label`,{class:`form-label`},`角色`,-1),t(v(`select`,{"onUpdate:modelValue":a[54]||=e=>J.role=e,class:`form-select`},[...a[123]||=[v(`option`,{value:`admin`},`管理员`,-1),v(`option`,{value:`user`},`普通用户`,-1),v(`option`,{value:`guest`},`访客`,-1)]],512),[[te,J.role]])]),v(`div`,Ne,[v(`label`,Pe,[t(v(`input`,{"onUpdate:modelValue":a[55]||=e=>J.enabled=e,type:`checkbox`},null,512),[[ee,J.enabled]]),a[125]||=p(` 启用账户 `,-1)])])])]),_:1},8,[`modelValue`])]),v(`div`,Fe,[O(e,{code:it,language:`vue`,title:`示例代码`})])]),v(`section`,Ie,[a[131]||=v(`h2`,{class:`component-demo-view__section-title`},`自定义标题`,-1),v(`div`,Le,[O(n(A),{onClick:a[58]||=e=>Y.value=!0},{default:k(()=>[...a[127]||=[p(`自定义标题`,-1)]]),_:1}),O(n(F),{modelValue:Y.value,"onUpdate:modelValue":a[59]||=e=>Y.value=e,onConfirm:a[60]||=e=>Y.value=!1},{title:k(()=>[...a[128]||=[v(`div`,{class:`custom-title`},[v(`span`,{class:`title-icon`},`⚠️`),v(`span`,{class:`title-text`},`警告提示`),v(`span`,{class:`title-badge`},`重要`)],-1)]]),default:k(()=>[a[129]||=v(`p`,null,`使用 title 插槽可以自定义标题区域的内容。`,-1),a[130]||=v(`p`,null,`您可以在标题中添加图标、徽章等元素。`,-1)]),_:1},8,[`modelValue`])]),v(`div`,Re,[O(e,{code:at,language:`vue`,title:`示例代码`})])]),v(`section`,ze,[a[137]||=v(`h2`,{class:`component-demo-view__section-title`},`自定义底部`,-1),v(`div`,Be,[O(n(A),{onClick:a[61]||=e=>X.value=!0},{default:k(()=>[...a[132]||=[p(`自定义底部`,-1)]]),_:1}),O(n(F),{modelValue:X.value,"onUpdate:modelValue":a[65]||=e=>X.value=e,title:`确认操作`},{footer:k(()=>[v(`div`,Ve,[O(n(A),{size:`small`,onClick:a[62]||=e=>X.value=!1},{default:k(()=>[...a[133]||=[p(`稍后处理`,-1)]]),_:1}),v(`div`,He,[O(n(A),{size:`small`,onClick:a[63]||=e=>X.value=!1},{default:k(()=>[...a[134]||=[p(`拒绝`,-1)]]),_:1}),O(n(A),{theme:`primary`,size:`small`,onClick:a[64]||=e=>X.value=!1},{default:k(()=>[...a[135]||=[p(`同意`,-1)]]),_:1})])])]),default:k(()=>[a[136]||=v(`p`,null,`使用 footer 插槽可以完全自定义底部操作栏。`,-1)]),_:1},8,[`modelValue`])]),v(`div`,Ue,[O(e,{code:ot,language:`vue`,title:`示例代码`})])]),v(`section`,We,[a[142]||=v(`h2`,{class:`component-demo-view__section-title`},`事件监听`,-1),v(`div`,Ge,[O(n(A),{onClick:a[66]||=e=>Z.value=!0},{default:k(()=>[...a[138]||=[p(`打开对话框`,-1)]]),_:1}),O(n(F),{modelValue:Z.value,"onUpdate:modelValue":a[67]||=e=>Z.value=e,title:`事件测试`,onOpen:a[68]||=e=>$(`open`),onOpened:a[69]||=e=>$(`opened`),onClose:a[70]||=e=>$(`close`),onClosed:a[71]||=e=>$(`closed`),onConfirm:a[72]||=e=>{$(`confirm`),Z.value=!1},onCancel:a[73]||=e=>{$(`cancel`),Z.value=!1}},{default:k(()=>[...a[139]||=[v(`p`,null,`打开控制台或查看下方事件日志，可以看到对话框触发的各种事件。`,-1)]]),_:1},8,[`modelValue`]),v(`div`,Ke,[a[141]||=v(`p`,null,`事件记录：`,-1),v(`ul`,null,[(b(!0),D(g,null,o(Q.value,(e,t)=>(b(),D(`li`,{key:t,class:`event-log-item`},i(e),1))),128))]),Q.value.length>0?(b(),_(n(A),{key:0,size:`small`,onClick:a[74]||=e=>Q.value=[]},{default:k(()=>[...a[140]||=[p(` 清空记录 `,-1)]]),_:1})):f(``,!0)])]),v(`div`,qe,[O(e,{code:st,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-f30cb96c`]]);export{W as default};
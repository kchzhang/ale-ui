import{A as e,B as t,C as n,F as r,J as i,K as a,M as o,P as s,S as c,U as l,V as u,W as d,Y as f,_ as p,a as m,c as h,f as g,g as _,h as v,i as y,k as b,l as x,m as S,p as ee,q as C,s as w,u as T,v as E,x as D,y as O,z as k}from"./index-B3Jx3uix.js";import{t as A}from"./button-GOPf8Q2w.js";import{t as j}from"./CodeBlock-CE4Cu_o1.js";var M={key:0,class:`ale-dialog__header`},N={class:`ale-dialog__title`},P={class:`ale-dialog__body`},F={key:1,class:`ale-dialog__footer`},I=y(n({__name:`Dialog`,props:{modelValue:{type:Boolean,default:!1},title:{default:`提示`},width:{default:``},size:{default:`medium`},position:{default:`center`},showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},showFooter:{type:Boolean,default:!0},confirmText:{default:`确定`},cancelText:{default:`取消`},showConfirm:{type:Boolean,default:!0},showCancel:{type:Boolean,default:!0},confirmLoading:{type:Boolean,default:!1},confirmDisabled:{type:Boolean,default:!1},cancelDisabled:{type:Boolean,default:!1},keyboard:{type:Boolean,default:!0},zIndex:{default:2e3},customClass:{default:``},lockScroll:{type:Boolean,default:!0},destroyOnClose:{type:Boolean,default:!1}},emits:[`update:modelValue`,`confirm`,`cancel`,`close`,`open`,`opened`,`closed`],setup(n,{expose:s,emit:l}){let h=n,y=l,x=d(h.modelValue),ee=d(!1),w=v(()=>h.showClose||h.title||!0),j=v(()=>[`ale-dialog-wrapper`,{"is-mask":h.showMask,[`is-position-${h.position}`]:h.position},h.customClass]),I=v(()=>[`ale-dialog`,`ale-dialog--${h.size}`,{"has-header":w.value,"has-footer":h.showFooter}]),L=v(()=>({"z-index":h.zIndex})),R=v(()=>{let e={};return h.width&&(e.width=typeof h.width==`number`?`${h.width}px`:h.width),e}),z=e=>{h.lockScroll&&(e?document.body.style.overflow=`hidden`:document.body.style.overflow=``)},B=e=>{!h.keyboard||!x.value||e.key===`Escape`&&U()},V=()=>{x.value=!0,z(!0),y(`update:modelValue`,!0),y(`open`)},H=()=>{x.value=!1,z(!1),y(`update:modelValue`,!1),y(`close`)},U=()=>{H()},te=()=>{h.maskClosable&&U()},ne=()=>{y(`confirm`)},re=()=>{y(`cancel`),H()},ie=()=>{y(`opened`)},ae=()=>{y(`closed`)};return k(()=>h.modelValue,e=>{e!==x.value&&(e?(x.value=!0,z(!0),y(`open`)):(x.value=!1,z(!1),y(`close`)))}),b(()=>{ee.value=!0,document.addEventListener(`keydown`,B)}),e(()=>{document.removeEventListener(`keydown`,B),z(!1)}),s({open:V,close:H}),(e,s)=>(o(),p(S,{to:`body`},[c(m,{name:`ale-dialog-fade`,onAfterEnter:ie,onAfterLeave:ae},{default:t(()=>[u(_(`div`,{class:C(j.value),style:i(L.value),role:`dialog`,"aria-modal":`true`,onClick:g(te,[`self`])},[_(`div`,{class:C(I.value),style:i(R.value)},[w.value?(o(),O(`div`,M,[r(e.$slots,`title`,{},()=>[_(`h3`,N,f(n.title),1)],!0),n.showClose?(o(),O(`button`,{key:0,type:`button`,class:`ale-dialog__close`,"aria-label":`关闭`,onClick:U},[...s[0]||=[_(`span`,{class:`ale-dialog__close-icon`},`×`,-1)]])):E(``,!0)])):E(``,!0),_(`div`,P,[r(e.$slots,`default`,{},void 0,!0)]),n.showFooter?(o(),O(`div`,F,[r(e.$slots,`footer`,{},()=>[n.showCancel?(o(),p(a(A),{key:0,disabled:n.cancelDisabled,onClick:re},{default:t(()=>[D(f(n.cancelText),1)]),_:1},8,[`disabled`])):E(``,!0),n.showConfirm?(o(),p(a(A),{key:1,type:`primary`,loading:n.confirmLoading,disabled:n.confirmDisabled,onClick:ne},{default:t(()=>[D(f(n.confirmText),1)]),_:1},8,[`loading`,`disabled`])):E(``,!0)],!0)])):E(``,!0)],6)],6),[[T,x.value]])]),_:3})]))}}),[[`__scopeId`,`data-v-e43e1c8a`]]),L={class:`component-demo-view`},R={class:`component-demo-view__section`},z={class:`component-demo-view__demo`},B={class:`component-demo-view__code`},V={class:`component-demo-view__section`},H={class:`component-demo-view__demo`,style:{gap:`16px`}},U={class:`component-demo-view__code`},te={class:`component-demo-view__section`},ne={class:`component-demo-view__demo`,style:{gap:`16px`}},re={class:`component-demo-view__code`},ie={class:`component-demo-view__section`},ae={class:`component-demo-view__demo`,style:{gap:`16px`}},oe={class:`component-demo-view__code`},se={class:`component-demo-view__section`},ce={class:`component-demo-view__demo`},le={class:`component-demo-view__code`},ue={class:`component-demo-view__section`},de={class:`component-demo-view__demo`},fe={class:`component-demo-view__code`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`},he={class:`component-demo-view__code`},ge={class:`component-demo-view__section`},_e={class:`component-demo-view__demo`,style:{gap:`16px`}},ve={style:{"text-align":`center`,"margin-top":`20px`}},ye={class:`component-demo-view__code`},be={class:`component-demo-view__section`},xe={class:`component-demo-view__demo`},Se={class:`component-demo-view__code`},Ce={class:`component-demo-view__section`},we={class:`component-demo-view__demo`},Te={key:0,style:{color:`var(--color-success)`,"margin-top":`12px`}},Ee={class:`component-demo-view__code`},De={class:`component-demo-view__section`},Oe={class:`component-demo-view__demo`},ke={class:`form-content`},Ae={class:`form-row`},je={class:`form-row`},Me={class:`form-row`},Ne={class:`form-row`},Pe={class:`form-label`},Fe={class:`component-demo-view__code`},Ie={class:`component-demo-view__section`},Le={class:`component-demo-view__demo`},Re={class:`component-demo-view__code`},ze={class:`component-demo-view__section`},Be={class:`component-demo-view__demo`},Ve={class:`custom-footer`},He={class:`footer-right`},Ue={class:`component-demo-view__code`},We={class:`component-demo-view__section`},Ge={class:`component-demo-view__demo`,style:{"flex-direction":`column`,"align-items":`flex-start`,gap:`16px`}},Ke={class:`event-log`},qe={class:`component-demo-view__code`},Je=`<template>
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
<\/script>`,W=y(n({__name:`DialogView`,setup(e){let n=d(!1),r=d(!1),i=d(!1),m=d(!1),g=d(!1),v=d(!1),y=d(!1),b=d(!1),S=d(!1),C=d(!1),T=d(!1),k=d(!1),M=d(!1),N=d(!1),P=d(!1),F=d(!1),W=d(!1),G=d(!1),K=d(``),ct=async()=>{G.value=!0,K.value=``,await new Promise(e=>setTimeout(e,1500)),G.value=!1,K.value=`提交成功！`,setTimeout(()=>{W.value=!1,K.value=``},1500)},q=d(!1),J=l({name:``,email:``,role:`user`,enabled:!0}),lt=()=>{console.log(`保存用户:`,J),q.value=!1},Y=d(!1),X=d(!1),Z=d(!1),Q=d([]),$=e=>{let t=new Date().toLocaleTimeString();Q.value.unshift(`[${t}] ${e} 事件触发`)};return(e,l)=>(o(),O(`div`,L,[l[143]||=_(`div`,{class:`component-demo-view__header`},[_(`h1`,{class:`component-demo-view__title`},`Dialog 对话框`),_(`p`,{class:`component-demo-view__description`},` 对话框用于在保留当前页面状态的情况下，告知用户并承载相关操作 `)],-1),_(`section`,R,[l[77]||=_(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),_(`div`,z,[c(a(A),{onClick:l[0]||=e=>n.value=!0},{default:t(()=>[...l[75]||=[D(`打开对话框`,-1)]]),_:1}),c(a(I),{modelValue:n.value,"onUpdate:modelValue":l[1]||=e=>n.value=e,title:`基础对话框`,onConfirm:l[2]||=e=>n.value=!1},{default:t(()=>[...l[76]||=[_(`p`,null,`这是一个基础的对话框示例，包含标题、内容和底部操作按钮。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,B,[c(j,{code:Je,language:`vue`,title:`示例代码`})])]),_(`section`,V,[l[86]||=_(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),_(`div`,H,[c(a(A),{size:`small`,onClick:l[3]||=e=>r.value=!0},{default:t(()=>[...l[78]||=[D(`小尺寸`,-1)]]),_:1}),c(a(A),{onClick:l[4]||=e=>i.value=!0},{default:t(()=>[...l[79]||=[D(`中尺寸`,-1)]]),_:1}),c(a(A),{onClick:l[5]||=e=>m.value=!0},{default:t(()=>[...l[80]||=[D(`大尺寸`,-1)]]),_:1}),c(a(A),{theme:`primary`,onClick:l[6]||=e=>g.value=!0},{default:t(()=>[...l[81]||=[D(`全屏`,-1)]]),_:1}),c(a(I),{modelValue:r.value,"onUpdate:modelValue":l[7]||=e=>r.value=e,title:`小尺寸对话框`,size:`small`,onConfirm:l[8]||=e=>r.value=!1},{default:t(()=>[...l[82]||=[_(`p`,null,`这是一个小尺寸的对话框，宽度为 400px。`,-1)]]),_:1},8,[`modelValue`]),c(a(I),{modelValue:i.value,"onUpdate:modelValue":l[9]||=e=>i.value=e,title:`中尺寸对话框`,size:`medium`,onConfirm:l[10]||=e=>i.value=!1},{default:t(()=>[...l[83]||=[_(`p`,null,`这是一个中尺寸的对话框，宽度为 520px（默认）。`,-1)]]),_:1},8,[`modelValue`]),c(a(I),{modelValue:m.value,"onUpdate:modelValue":l[11]||=e=>m.value=e,title:`大尺寸对话框`,size:`large`,onConfirm:l[12]||=e=>m.value=!1},{default:t(()=>[...l[84]||=[_(`p`,null,`这是一个大尺寸的对话框，宽度为 720px。`,-1)]]),_:1},8,[`modelValue`]),c(a(I),{modelValue:g.value,"onUpdate:modelValue":l[13]||=e=>g.value=e,title:`全屏对话框`,size:`fullscreen`,onConfirm:l[14]||=e=>g.value=!1},{default:t(()=>[...l[85]||=[_(`p`,null,`这是一个全屏对话框，占据大部分屏幕空间。`,-1),_(`p`,null,`适合展示大量内容或复杂的表单。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,U,[c(j,{code:Ye,language:`vue`,title:`示例代码`})])]),_(`section`,te,[l[91]||=_(`h2`,{class:`component-demo-view__section-title`},`自定义位置`,-1),_(`div`,ne,[c(a(A),{onClick:l[15]||=e=>v.value=!0},{default:t(()=>[...l[87]||=[D(`居中（默认）`,-1)]]),_:1}),c(a(A),{onClick:l[16]||=e=>y.value=!0},{default:t(()=>[...l[88]||=[D(`顶部`,-1)]]),_:1}),c(a(I),{modelValue:v.value,"onUpdate:modelValue":l[17]||=e=>v.value=e,title:`居中对话框`,position:`center`,onConfirm:l[18]||=e=>v.value=!1},{default:t(()=>[...l[89]||=[_(`p`,null,`对话框在屏幕中央显示（默认位置）。`,-1)]]),_:1},8,[`modelValue`]),c(a(I),{modelValue:y.value,"onUpdate:modelValue":l[19]||=e=>y.value=e,title:`顶部对话框`,position:`top`,onConfirm:l[20]||=e=>y.value=!1},{default:t(()=>[...l[90]||=[_(`p`,null,`对话框在屏幕顶部显示。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,re,[c(j,{code:Xe,language:`vue`,title:`示例代码`})])]),_(`section`,ie,[l[96]||=_(`h2`,{class:`component-demo-view__section-title`},`自定义宽度`,-1),_(`div`,ae,[c(a(A),{onClick:l[21]||=e=>b.value=!0},{default:t(()=>[...l[92]||=[D(`600px 宽度`,-1)]]),_:1}),c(a(A),{onClick:l[22]||=e=>S.value=!0},{default:t(()=>[...l[93]||=[D(`800px 宽度`,-1)]]),_:1}),c(a(I),{modelValue:b.value,"onUpdate:modelValue":l[23]||=e=>b.value=e,title:`自定义宽度 600px`,width:`600px`,onConfirm:l[24]||=e=>b.value=!1},{default:t(()=>[...l[94]||=[_(`p`,null,`通过 width 属性可以自定义对话框的宽度。`,-1)]]),_:1},8,[`modelValue`]),c(a(I),{modelValue:S.value,"onUpdate:modelValue":l[25]||=e=>S.value=e,title:`自定义宽度 800px`,width:800,onConfirm:l[26]||=e=>S.value=!1},{default:t(()=>[...l[95]||=[_(`p`,null,`width 属性可以是字符串（带单位）或数字（自动转为像素）。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,oe,[c(j,{code:Ze,language:`vue`,title:`示例代码`})])]),_(`section`,se,[l[99]||=_(`h2`,{class:`component-demo-view__section-title`},`隐藏遮罩层`,-1),_(`div`,ce,[c(a(A),{onClick:l[27]||=e=>C.value=!0},{default:t(()=>[...l[97]||=[D(`无遮罩层`,-1)]]),_:1}),c(a(I),{modelValue:C.value,"onUpdate:modelValue":l[28]||=e=>C.value=e,title:`无遮罩层`,"show-mask":!1,onConfirm:l[29]||=e=>C.value=!1},{default:t(()=>[...l[98]||=[_(`p`,null,`设置 show-mask="false" 可以隐藏背景遮罩层。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,le,[c(j,{code:Qe,language:`vue`,title:`示例代码`})])]),_(`section`,ue,[l[102]||=_(`h2`,{class:`component-demo-view__section-title`},`禁止遮罩层关闭`,-1),_(`div`,de,[c(a(A),{onClick:l[30]||=e=>T.value=!0},{default:t(()=>[...l[100]||=[D(`点击遮罩不关闭`,-1)]]),_:1}),c(a(I),{modelValue:T.value,"onUpdate:modelValue":l[31]||=e=>T.value=e,title:`禁止遮罩层关闭`,"mask-closable":!1,onConfirm:l[32]||=e=>T.value=!1},{default:t(()=>[...l[101]||=[_(`p`,null,`设置 mask-closable="false" 后，点击遮罩层不会关闭对话框。`,-1),_(`p`,null,`只能通过点击关闭按钮或确认/取消按钮来关闭。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,fe,[c(j,{code:$e,language:`vue`,title:`示例代码`})])]),_(`section`,pe,[l[105]||=_(`h2`,{class:`component-demo-view__section-title`},`隐藏关闭按钮`,-1),_(`div`,me,[c(a(A),{onClick:l[33]||=e=>k.value=!0},{default:t(()=>[...l[103]||=[D(`无关闭按钮`,-1)]]),_:1}),c(a(I),{modelValue:k.value,"onUpdate:modelValue":l[34]||=e=>k.value=e,title:`无关闭按钮`,"show-close":!1,onConfirm:l[35]||=e=>k.value=!1},{default:t(()=>[...l[104]||=[_(`p`,null,`设置 show-close="false" 可以隐藏右上角的关闭按钮。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,he,[c(j,{code:et,language:`vue`,title:`示例代码`})])]),_(`section`,ge,[l[113]||=_(`h2`,{class:`component-demo-view__section-title`},`隐藏底部按钮`,-1),_(`div`,_e,[c(a(A),{onClick:l[36]||=e=>M.value=!0},{default:t(()=>[...l[106]||=[D(`无底部栏`,-1)]]),_:1}),c(a(A),{onClick:l[37]||=e=>N.value=!0},{default:t(()=>[...l[107]||=[D(`无取消按钮`,-1)]]),_:1}),c(a(A),{onClick:l[38]||=e=>P.value=!0},{default:t(()=>[...l[108]||=[D(`无确认按钮`,-1)]]),_:1}),c(a(I),{modelValue:M.value,"onUpdate:modelValue":l[40]||=e=>M.value=e,title:`无底部栏`,"show-footer":!1},{default:t(()=>[l[110]||=_(`p`,null,`设置 show-footer="false" 可以完全隐藏底部操作栏。`,-1),_(`p`,ve,[c(a(A),{size:`small`,onClick:l[39]||=e=>M.value=!1},{default:t(()=>[...l[109]||=[D(`关闭`,-1)]]),_:1})])]),_:1},8,[`modelValue`]),c(a(I),{modelValue:N.value,"onUpdate:modelValue":l[41]||=e=>N.value=e,title:`无取消按钮`,"show-cancel":!1,onConfirm:l[42]||=e=>N.value=!1},{default:t(()=>[...l[111]||=[_(`p`,null,`设置 show-cancel="false" 可以隐藏取消按钮。`,-1)]]),_:1},8,[`modelValue`]),c(a(I),{modelValue:P.value,"onUpdate:modelValue":l[43]||=e=>P.value=e,title:`无确认按钮`,"show-confirm":!1,onCancel:l[44]||=e=>P.value=!1},{default:t(()=>[...l[112]||=[_(`p`,null,`设置 show-confirm="false" 可以隐藏确认按钮。`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,ye,[c(j,{code:tt,language:`vue`,title:`示例代码`})])]),_(`section`,be,[l[116]||=_(`h2`,{class:`component-demo-view__section-title`},`自定义按钮文本`,-1),_(`div`,xe,[c(a(A),{onClick:l[45]||=e=>F.value=!0},{default:t(()=>[...l[114]||=[D(`自定义按钮文本`,-1)]]),_:1}),c(a(I),{modelValue:F.value,"onUpdate:modelValue":l[46]||=e=>F.value=e,title:`保存更改`,"confirm-text":`保存`,"cancel-text":`不保存`,onConfirm:l[47]||=e=>F.value=!1,onCancel:l[48]||=e=>F.value=!1},{default:t(()=>[...l[115]||=[_(`p`,null,`是否要保存对当前文档的更改？`,-1)]]),_:1},8,[`modelValue`])]),_(`div`,Se,[c(j,{code:nt,language:`vue`,title:`示例代码`})])]),_(`section`,Ce,[l[119]||=_(`h2`,{class:`component-demo-view__section-title`},`加载状态`,-1),_(`div`,we,[c(a(A),{onClick:l[49]||=e=>W.value=!0},{default:t(()=>[...l[117]||=[D(`显示加载状态`,-1)]]),_:1}),c(a(I),{modelValue:W.value,"onUpdate:modelValue":l[50]||=e=>W.value=e,title:`提交数据`,"confirm-text":`提交`,"confirm-loading":G.value,onConfirm:ct},{default:t(()=>[l[118]||=_(`p`,null,`点击提交按钮会模拟异步请求，确认按钮会显示加载状态。`,-1),K.value?(o(),O(`p`,Te,f(K.value),1)):E(``,!0)]),_:1},8,[`modelValue`,`confirm-loading`])]),_(`div`,Ee,[c(j,{code:rt,language:`vue`,title:`示例代码`})])]),_(`section`,De,[l[126]||=_(`h2`,{class:`component-demo-view__section-title`},`自定义内容`,-1),_(`div`,Oe,[c(a(A),{onClick:l[51]||=e=>q.value=!0},{default:t(()=>[...l[120]||=[D(`表单对话框`,-1)]]),_:1}),c(a(I),{modelValue:q.value,"onUpdate:modelValue":l[56]||=e=>q.value=e,title:`编辑用户信息`,size:`medium`,"confirm-text":`保存`,onConfirm:lt,onCancel:l[57]||=e=>q.value=!1},{default:t(()=>[_(`div`,ke,[_(`div`,Ae,[l[121]||=_(`label`,{class:`form-label`},`用户名`,-1),u(_(`input`,{"onUpdate:modelValue":l[52]||=e=>J.name=e,class:`form-input`,placeholder:`请输入用户名`},null,512),[[x,J.name]])]),_(`div`,je,[l[122]||=_(`label`,{class:`form-label`},`邮箱`,-1),u(_(`input`,{"onUpdate:modelValue":l[53]||=e=>J.email=e,class:`form-input`,placeholder:`请输入邮箱`},null,512),[[x,J.email]])]),_(`div`,Me,[l[124]||=_(`label`,{class:`form-label`},`角色`,-1),u(_(`select`,{"onUpdate:modelValue":l[54]||=e=>J.role=e,class:`form-select`},[...l[123]||=[_(`option`,{value:`admin`},`管理员`,-1),_(`option`,{value:`user`},`普通用户`,-1),_(`option`,{value:`guest`},`访客`,-1)]],512),[[h,J.role]])]),_(`div`,Ne,[_(`label`,Pe,[u(_(`input`,{"onUpdate:modelValue":l[55]||=e=>J.enabled=e,type:`checkbox`},null,512),[[w,J.enabled]]),l[125]||=D(` 启用账户 `,-1)])])])]),_:1},8,[`modelValue`])]),_(`div`,Fe,[c(j,{code:it,language:`vue`,title:`示例代码`})])]),_(`section`,Ie,[l[131]||=_(`h2`,{class:`component-demo-view__section-title`},`自定义标题`,-1),_(`div`,Le,[c(a(A),{onClick:l[58]||=e=>Y.value=!0},{default:t(()=>[...l[127]||=[D(`自定义标题`,-1)]]),_:1}),c(a(I),{modelValue:Y.value,"onUpdate:modelValue":l[59]||=e=>Y.value=e,onConfirm:l[60]||=e=>Y.value=!1},{title:t(()=>[...l[128]||=[_(`div`,{class:`custom-title`},[_(`span`,{class:`title-icon`},`⚠️`),_(`span`,{class:`title-text`},`警告提示`),_(`span`,{class:`title-badge`},`重要`)],-1)]]),default:t(()=>[l[129]||=_(`p`,null,`使用 title 插槽可以自定义标题区域的内容。`,-1),l[130]||=_(`p`,null,`您可以在标题中添加图标、徽章等元素。`,-1)]),_:1},8,[`modelValue`])]),_(`div`,Re,[c(j,{code:at,language:`vue`,title:`示例代码`})])]),_(`section`,ze,[l[137]||=_(`h2`,{class:`component-demo-view__section-title`},`自定义底部`,-1),_(`div`,Be,[c(a(A),{onClick:l[61]||=e=>X.value=!0},{default:t(()=>[...l[132]||=[D(`自定义底部`,-1)]]),_:1}),c(a(I),{modelValue:X.value,"onUpdate:modelValue":l[65]||=e=>X.value=e,title:`确认操作`},{footer:t(()=>[_(`div`,Ve,[c(a(A),{size:`small`,onClick:l[62]||=e=>X.value=!1},{default:t(()=>[...l[133]||=[D(`稍后处理`,-1)]]),_:1}),_(`div`,He,[c(a(A),{size:`small`,onClick:l[63]||=e=>X.value=!1},{default:t(()=>[...l[134]||=[D(`拒绝`,-1)]]),_:1}),c(a(A),{theme:`primary`,size:`small`,onClick:l[64]||=e=>X.value=!1},{default:t(()=>[...l[135]||=[D(`同意`,-1)]]),_:1})])])]),default:t(()=>[l[136]||=_(`p`,null,`使用 footer 插槽可以完全自定义底部操作栏。`,-1)]),_:1},8,[`modelValue`])]),_(`div`,Ue,[c(j,{code:ot,language:`vue`,title:`示例代码`})])]),_(`section`,We,[l[142]||=_(`h2`,{class:`component-demo-view__section-title`},`事件监听`,-1),_(`div`,Ge,[c(a(A),{onClick:l[66]||=e=>Z.value=!0},{default:t(()=>[...l[138]||=[D(`打开对话框`,-1)]]),_:1}),c(a(I),{modelValue:Z.value,"onUpdate:modelValue":l[67]||=e=>Z.value=e,title:`事件测试`,onOpen:l[68]||=e=>$(`open`),onOpened:l[69]||=e=>$(`opened`),onClose:l[70]||=e=>$(`close`),onClosed:l[71]||=e=>$(`closed`),onConfirm:l[72]||=e=>{$(`confirm`),Z.value=!1},onCancel:l[73]||=e=>{$(`cancel`),Z.value=!1}},{default:t(()=>[...l[139]||=[_(`p`,null,`打开控制台或查看下方事件日志，可以看到对话框触发的各种事件。`,-1)]]),_:1},8,[`modelValue`]),_(`div`,Ke,[l[141]||=_(`p`,null,`事件记录：`,-1),_(`ul`,null,[(o(!0),O(ee,null,s(Q.value,(e,t)=>(o(),O(`li`,{key:t,class:`event-log-item`},f(e),1))),128))]),Q.value.length>0?(o(),p(a(A),{key:0,size:`small`,onClick:l[74]||=e=>Q.value=[]},{default:t(()=>[...l[140]||=[D(` 清空记录 `,-1)]]),_:1})):E(``,!0)])]),_(`div`,qe,[c(j,{code:st,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-f30cb96c`]]);export{W as default};
import{t as e}from"./CodeBlock-CmDK_EYq.js";import{B as t,G as n,J as r,K as i,O as a,R as o,S as s,U as c,_ as l,a as u,b as d,d as f,f as p,g as m,h,i as g,j as _,k as v,l as y,m as b,p as x,q as S,r as C,v as w,w as T,x as E,z as D}from"./index-D6beBo5R.js";import{t as O}from"./button-CbFeg90j.js";var k={key:0,class:`ale-notification__icon`},A={key:0,class:`ale-notification__svg`,viewBox:`0 0 1024 1024`},j={key:1,class:`ale-notification__svg`,viewBox:`0 0 1024 1024`},M={key:2,class:`ale-notification__svg`,viewBox:`0 0 1024 1024`},N={key:3,class:`ale-notification__svg`,viewBox:`0 0 1024 1024`},ee={class:`ale-notification__content`},te={key:0,class:`ale-notification__title`},P={class:`ale-notification__message`},F=[`innerHTML`],I={key:1},L=C(s({__name:`Notification`,props:{type:{default:`info`},title:{default:``},message:{default:``},duration:{default:4500},closable:{type:Boolean,default:!0},icon:{},showIcon:{type:Boolean,default:!0},position:{default:`top-right`},customClass:{default:``},visible:{type:Boolean,default:!0},id:{},offset:{default:20},dangerouslyUseHTMLString:{type:Boolean,default:!1},showProgress:{type:Boolean,default:!1}},emits:[`close`,`click`,`destroy`],setup(e,{expose:n,emit:s}){let u=e,C=s,T=c(u.visible),O=null,L=c(100),R=null,z=b(()=>[`ale-notification`,`ale-notification--${u.type}`,`is-${u.position}`,{"is-closable":u.closable,"has-title":u.title},u.customClass]),B=b(()=>{let e={};return u.position.includes(`top`)?e.top=`${u.offset}px`:e.bottom=`${u.offset}px`,u.position.includes(`right`)?e.right=`20px`:e.left=`20px`,e}),V=b(()=>({width:`${L.value}%`})),H=()=>{if(u.duration>0&&(O=setTimeout(()=>{W()},u.duration),u.showProgress)){let e=100/(u.duration/100);R=setInterval(()=>{L.value-=e,L.value<=0&&(L.value=0,R&&=(clearInterval(R),null))},100)}},U=()=>{O&&=(clearTimeout(O),null),R&&=(clearInterval(R),null)},W=()=>{T.value=!1,C(`close`)},G=()=>{W()},K=()=>{C(`click`)},q=()=>{U()},J=()=>{T.value&&H()},Y=()=>{C(`destroy`)};return o(()=>u.visible,e=>{T.value=e,e?H():U()}),a(()=>{H()}),v(()=>{U()}),n({close:W}),(n,a)=>(_(),m(x,{to:`body`},[E(g,{name:`ale-notification-fade`,onAfterLeave:Y},{default:D(()=>[t(h(`div`,{class:i(z.value),style:S(B.value),role:`alert`,onClick:K,onMouseenter:q,onMouseleave:J},[e.showIcon?(_(),w(`div`,k,[e.icon?(_(),w(p,{key:0},[d(r(e.icon),1)],64)):(_(),w(p,{key:1},[e.type===`success`?(_(),w(`svg`,A,[...a[0]||=[h(`path`,{fill:`currentColor`,d:`M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z`},null,-1)]])):e.type===`warning`?(_(),w(`svg`,j,[...a[1]||=[h(`path`,{fill:`currentColor`,d:`M464 720a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-418.7-726.6c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-418.7 726.6c-12.1 21 3.2 46.7 27.7 46.7h837.4c24.5 0 39.8-25.7 27.7-46.7zM480 80c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32z`},null,-1)]])):e.type===`error`?(_(),w(`svg`,M,[...a[2]||=[h(`path`,{fill:`currentColor`,d:`M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z`},null,-1)]])):(_(),w(`svg`,N,[...a[3]||=[h(`path`,{fill:`currentColor`,d:`M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z`},null,-1)]]))],64))])):l(``,!0),h(`div`,ee,[e.title?(_(),w(`div`,te,r(e.title),1)):l(``,!0),h(`div`,P,[e.dangerouslyUseHTMLString?(_(),w(`span`,{key:0,innerHTML:e.message},null,8,F)):(_(),w(`span`,I,r(e.message),1))])]),e.closable?(_(),w(`button`,{key:1,class:`ale-notification__close`,type:`button`,"aria-label":`关闭`,onClick:f(G,[`stop`])},[...a[4]||=[h(`svg`,{class:`ale-notification__close-icon`,viewBox:`0 0 1024 1024`},[h(`path`,{fill:`currentColor`,d:`M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z`})],-1)]])):l(``,!0),e.showProgress&&e.duration>0?(_(),w(`div`,{key:2,class:`ale-notification__progress`,style:S(V.value)},null,4)):l(``,!0)],38),[[y,T.value]])]),_:1})]))}}),[[`__scopeId`,`data-v-b51b875f`]]),R=0,z=new Map,B=new Map,V=e=>e.position||`top-right`,H=e=>20+(B.get(e)||[]).length*90,U=e=>{let t=`notification-${++R}`,n=V(e),r=H(n),i=document.createElement(`div`);document.body.appendChild(i);let a=T(L,{...e,id:t,offset:r,visible:!0,onClose:()=>{W(t),e.onClose?.()},onClick:()=>{e.onClick?.()},onDestroy:()=>{G(t,i,a)}});return u(a,i),z.set(t,a),B.has(n)||B.set(n,[]),B.get(n).push(t),{close:()=>W(t)}},W=e=>{let t=z.get(e);t&&t.component?.props&&(t.component.props.visible=!1)},G=(e,t,n)=>{z.delete(e);for(let[t,n]of B.entries()){let r=n.indexOf(e);if(r>-1){n.splice(r,1),K(t);break}}u(null,t),t.parentNode&&t.parentNode.removeChild(t)},K=e=>{(B.get(e)||[]).forEach((e,t)=>{let n=z.get(e);if(n&&n.component){let e=20+t*90;n.component.props.offset=e}})},q=()=>{z.forEach((e,t)=>{W(t)})},J=e=>t=>(typeof t==`string`&&(t={message:t}),U({...t,type:e})),Y=Object.assign(e=>(typeof e==`string`&&(e={message:e}),U(e)),{success:J(`success`),warning:J(`warning`),error:J(`error`),info:J(`info`),closeAll:q}),X={class:`component-demo-view`},Z={class:`component-demo-view__section`},Q={class:`component-demo-view__demo`},ne={class:`component-demo-view__code`},re={class:`component-demo-view__section`},ie={class:`component-demo-view__demo`,style:{gap:`16px`}},ae={class:`component-demo-view__code`},oe={class:`component-demo-view__section`},se={class:`component-demo-view__demo`,style:{gap:`16px`,"flex-wrap":`wrap`}},ce={class:`component-demo-view__code`},le={class:`component-demo-view__section`},ue={class:`component-demo-view__demo`},de={class:`component-demo-view__code`},fe={class:`component-demo-view__section`},pe={class:`component-demo-view__demo`,style:{gap:`16px`}},me={class:`component-demo-view__code`},he={class:`component-demo-view__section`},ge={class:`component-demo-view__demo`},_e={class:`component-demo-view__code`},ve={class:`component-demo-view__section`},ye={class:`component-demo-view__demo`},be={class:`component-demo-view__code`},xe={class:`component-demo-view__section`},Se={class:`component-demo-view__demo`},Ce={class:`component-demo-view__code`},we={class:`component-demo-view__section`},Te={class:`component-demo-view__demo`},Ee={class:`component-demo-view__code`},De={class:`component-demo-view__section`},Oe={class:`component-demo-view__demo`},ke={key:0,class:`callback-message`},Ae={class:`component-demo-view__code`},je={class:`component-demo-view__section`},Me={class:`component-demo-view__demo`},Ne={key:0,class:`callback-message`},Pe={class:`component-demo-view__code`},Fe={class:`component-demo-view__section`},Ie={class:`component-demo-view__demo`,style:{gap:`16px`}},Le={class:`component-demo-view__code`},Re={class:`component-demo-view__section`},ze={class:`component-demo-view__code`},Be=`<template>
  <AleButton @click="showNotification">显示通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showNotification = () => {
  // 简单调用
  AleNotification('这是一条通知消息');
  
  // 或使用配置对象
  AleNotification({
    message: '这是一条通知消息',
    type: 'info',
    duration: 4500
  });
};
<\/script>`,Ve=`<template>
  <div class="type-demo">
    <AleButton @click="showInfo">信息</AleButton>
    <AleButton theme="success" @click="showSuccess">成功</AleButton>
    <AleButton theme="warning" @click="showWarning">警告</AleButton>
    <AleButton theme="danger" @click="showError">错误</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showInfo = () => {
  AleNotification.info('这是一条信息通知');
};

const showSuccess = () => {
  AleNotification.success({
    title: '成功',
    message: '您的操作已成功完成！'
  });
};

const showWarning = () => {
  AleNotification.warning({
    title: '警告',
    message: '请注意，这是一条警告信息'
  });
};

const showError = () => {
  AleNotification.error({
    title: '错误',
    message: '发生错误，请稍后重试'
  });
};
<\/script>

<style scoped>
.type-demo {
  display: flex;
  gap: 12px;
}
</style>`,$=`<template>
  <div class="position-demo">
    <AleButton size="small" @click="showAtPosition('top-right')">
      右上角
    </AleButton>
    <AleButton size="small" @click="showAtPosition('top-left')">
      左上角
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-right')">
      右下角
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-left')">
      左下角
    </AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';
import type { NotificationPosition } from 'ale-ui';

const showAtPosition = (position: NotificationPosition) => {
  AleNotification({
    title: '位置示例',
    message: \`通知显示在 \${position}\`,
    position,
    type: 'info'
  });
};
<\/script>`,He=`<template>
  <AleButton @click="showWithTitle">显示带标题通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showWithTitle = () => {
  AleNotification({
    title: '通知标题',
    message: '这是通知的详细内容，可以包含较长的描述性文字。',
    type: 'success'
  });
};
<\/script>`,Ue=`<template>
  <div class="duration-demo">
    <AleButton @click="showShort">2秒关闭</AleButton>
    <AleButton @click="showLong">10秒关闭</AleButton>
    <AleButton @click="showPermanent">不自动关闭</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

// 2秒后自动关闭
const showShort = () => {
  AleNotification({
    message: '2秒后自动关闭',
    duration: 2000
  });
};

// 10秒后自动关闭
const showLong = () => {
  AleNotification({
    message: '10秒后自动关闭',
    duration: 10000
  });
};

// 不自动关闭，需要手动点击
const showPermanent = () => {
  AleNotification({
    title: '不自动关闭',
    message: '这条通知不会自动关闭',
    duration: 0
  });
};
<\/script>`,We=`<template>
  <AleButton @click="showNoIcon">无图标通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showNoIcon = () => {
  AleNotification({
    message: '这是一条没有图标的通知',
    showIcon: false
  });
};
<\/script>`,Ge=`<template>
  <AleButton @click="showCustomIcon">自定义图标</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showCustomIcon = () => {
  AleNotification({
    title: '自定义图标',
    message: '使用 Emoji 作为图标',
    icon: '🎉',
    type: 'success'
  });
};
<\/script>`,Ke=`<template>
  <AleButton @click="showWithProgress">带进度条的通知</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showWithProgress = () => {
  AleNotification({
    title: '进度条示例',
    message: '显示自动关闭的剩余时间',
    showProgress: true,
    duration: 5000
  });
};
<\/script>`,qe=`<template>
  <AleButton @click="showHTML">HTML 内容</AleButton>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showHTML = () => {
  AleNotification({
    title: 'HTML 内容',
    message: '<strong>粗体</strong> 和 <em>斜体</em>',
    dangerouslyUseHTMLString: true
  });
};
<\/script>`,Je=`<template>
  <div class="callback-demo">
    <AleButton @click="showWithCallback">显示通知</AleButton>
    <p v-if="message" class="tip">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, Notification as AleNotification } from 'ale-ui';

const message = ref('');

const showWithCallback = () => {
  message.value = '';
  
  AleNotification({
    title: '回调示例',
    message: '关闭后会有回调提示',
    onClose: () => {
      message.value = '通知已关闭！';
    }
  });
};
<\/script>

<style scoped>
.tip {
  color: var(--color-success);
  font-size: 14px;
}
</style>`,Ye=`<template>
  <div class="click-demo">
    <AleButton @click="showWithClick">显示通知</AleButton>
    <p v-if="message" class="tip">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, Notification as AleNotification } from 'ale-ui';

const message = ref('');

const showWithClick = () => {
  message.value = '';
  
  AleNotification({
    title: '点击示例',
    message: '点击此通知触发回调',
    onClick: () => {
      message.value = '通知被点击了！';
    }
  });
};
<\/script>`,Xe=`<template>
  <div class="multiple-demo">
    <AleButton @click="showMultiple">显示多条通知</AleButton>
    <AleButton theme="danger" @click="closeAll">关闭所有</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, Notification as AleNotification } from 'ale-ui';

const showMultiple = () => {
  AleNotification.success({ title: '第一条', message: '操作成功' });
  
  setTimeout(() => {
    AleNotification.warning({ title: '第二条', message: '警告信息' });
  }, 200);
  
  setTimeout(() => {
    AleNotification.info({ title: '第三条', message: '信息通知' });
  }, 400);
};

const closeAll = () => {
  AleNotification.closeAll();
};
<\/script>

<style scoped>
.multiple-demo {
  display: flex;
  gap: 12px;
}
</style>`,Ze=`// Notification 全局方法完整类型定义
import type { NotificationOptions, NotificationInstance } from 'ale-ui';

// 全局方法类型
interface NotificationGlobalMethod {
  // 基础调用 - 传入字符串或配置对象
  (options: NotificationOptions | string): NotificationInstance;
  
  // 快捷方法 - 显示成功通知
  success: (options: NotificationOptions | string) => NotificationInstance;
  
  // 快捷方法 - 显示警告通知
  warning: (options: NotificationOptions | string) => NotificationInstance;
  
  // 快捷方法 - 显示错误通知
  error: (options: NotificationOptions | string) => NotificationInstance;
  
  // 快捷方法 - 显示信息通知
  info: (options: NotificationOptions | string) => NotificationInstance;
  
  // 关闭所有通知
  closeAll: () => void;
}

// NotificationOptions 配置选项
interface NotificationOptions {
  type?: 'info' | 'success' | 'warning' | 'error';     // 通知类型
  title?: string;                                      // 通知标题
  message?: string;                                    // 通知内容（必填）
  duration?: number;                                   // 显示时长（毫秒），默认 4500，0 表示不自动关闭
  closable?: boolean;                                  // 是否显示关闭按钮，默认 true
  icon?: string;                                       // 自定义图标
  showIcon?: boolean;                                  // 是否显示图标，默认 true
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';  // 位置，默认 top-right
  customClass?: string;                                // 自定义类名
  dangerouslyUseHTMLString?: boolean;                  // 是否支持 HTML，默认 false
  showProgress?: boolean;                              // 是否显示进度条，默认 false
  onClose?: () => void;                                // 关闭时的回调函数
  onClick?: () => void;                                // 点击时的回调函数
}

// NotificationInstance 实例方法
interface NotificationInstance {
  close: () => void;  // 手动关闭当前通知
}

// 使用示例
import { Notification as AleNotification } from 'ale-ui';

// 基础用法
AleNotification('简单通知');

// 完整配置
const instance = AleNotification({
  title: '通知标题',
  message: '通知内容',
  type: 'success',
  duration: 5000,
  position: 'top-right',
  onClose: () => console.log('通知已关闭')
});

// 手动关闭
instance.close();

// 关闭所有通知
AleNotification.closeAll();`,Qe=C(s({__name:`NotificationView`,setup(t){let i=c(``),a=c(``),o=()=>{Y({message:`这是一条基础通知消息`})},s=()=>{Y.info(`这是一条信息通知`)},u=()=>{Y.success({title:`成功`,message:`您的操作已成功完成！`})},f=()=>{Y.warning({title:`警告`,message:`请注意，这是一条警告信息`})},p=()=>{Y.error({title:`错误`,message:`发生错误，请稍后重试`})},m=e=>{let t={"top-right":`右上角`,"top-left":`左上角`,"bottom-right":`右下角`,"bottom-left":`左下角`};Y({title:t[e],message:`通知显示在 ${t[e]}`,position:e,type:`info`})},g=()=>{Y({title:`通知标题`,message:`这是通知的详细内容，可以包含较长的描述性文字。`,type:`success`})},v=()=>{Y({title:`短暂显示`,message:`这条通知将在 2 秒后自动关闭`,duration:2e3})},y=()=>{Y({title:`长时间显示`,message:`这条通知将在 10 秒后自动关闭`,duration:1e4})},b=()=>{Y({title:`不自动关闭`,message:`这条通知不会自动关闭，需要手动点击关闭按钮`,duration:0})},x=()=>{Y({title:`无图标通知`,message:`这是一条没有图标的通知，更加简洁`,showIcon:!1})},S=()=>{Y({title:`自定义图标`,message:`使用自定义图标（Emoji）`,icon:`🎉`,type:`success`})},C=()=>{Y({title:`进度条示例`,message:`这条通知显示进度条，指示自动关闭的剩余时间`,showProgress:!0,duration:5e3})},T=()=>{Y({title:`HTML 内容`,message:`<strong>这是粗体文本</strong><br/><em>这是斜体文本</em>`,dangerouslyUseHTMLString:!0})},k=()=>{i.value=``,Y({title:`回调示例`,message:`关闭后会有回调提示`,onClose:()=>{i.value=`通知已关闭！`}})},A=()=>{a.value=``,Y({title:`点击示例`,message:`点击此通知会触发回调`,onClick:()=>{a.value=`通知被点击了！`}})},j=()=>{Y.success({title:`第一条`,message:`操作成功`}),setTimeout(()=>{Y.warning({title:`第二条`,message:`请注意警告信息`})},200),setTimeout(()=>{Y.info({title:`第三条`,message:`这是一条信息通知`})},400)},M=()=>{Y.closeAll()};return(t,c)=>(_(),w(`div`,X,[c[38]||=h(`div`,{class:`component-demo-view__header`},[h(`h1`,{class:`component-demo-view__title`},`Notification 通知`),h(`p`,{class:`component-demo-view__description`},` 悬浮出现在页面角落，显示全局的通知提醒消息 `)],-1),h(`section`,Z,[c[5]||=h(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),h(`div`,Q,[E(n(O),{onClick:o},{default:D(()=>[...c[4]||=[d(`显示通知`,-1)]]),_:1})]),h(`div`,ne,[E(e,{code:Be,language:`vue`,title:`示例代码`})])]),h(`section`,re,[c[10]||=h(`h2`,{class:`component-demo-view__section-title`},`不同类型`,-1),h(`div`,ie,[E(n(O),{onClick:s},{default:D(()=>[...c[6]||=[d(`信息`,-1)]]),_:1}),E(n(O),{theme:`success`,onClick:u},{default:D(()=>[...c[7]||=[d(`成功`,-1)]]),_:1}),E(n(O),{theme:`warning`,onClick:f},{default:D(()=>[...c[8]||=[d(`警告`,-1)]]),_:1}),E(n(O),{theme:`danger`,onClick:p},{default:D(()=>[...c[9]||=[d(`错误`,-1)]]),_:1})]),h(`div`,ae,[E(e,{code:Ve,language:`vue`,title:`示例代码`})])]),h(`section`,oe,[c[15]||=h(`h2`,{class:`component-demo-view__section-title`},`不同位置`,-1),h(`div`,se,[E(n(O),{size:`small`,onClick:c[0]||=e=>m(`top-right`)},{default:D(()=>[...c[11]||=[d(`右上角`,-1)]]),_:1}),E(n(O),{size:`small`,onClick:c[1]||=e=>m(`top-left`)},{default:D(()=>[...c[12]||=[d(`左上角`,-1)]]),_:1}),E(n(O),{size:`small`,onClick:c[2]||=e=>m(`bottom-right`)},{default:D(()=>[...c[13]||=[d(`右下角`,-1)]]),_:1}),E(n(O),{size:`small`,onClick:c[3]||=e=>m(`bottom-left`)},{default:D(()=>[...c[14]||=[d(`左下角`,-1)]]),_:1})]),h(`div`,ce,[E(e,{code:$,language:`vue`,title:`示例代码`})])]),h(`section`,le,[c[17]||=h(`h2`,{class:`component-demo-view__section-title`},`带标题的通知`,-1),h(`div`,ue,[E(n(O),{onClick:g},{default:D(()=>[...c[16]||=[d(`显示带标题通知`,-1)]]),_:1})]),h(`div`,de,[E(e,{code:He,language:`vue`,title:`示例代码`})])]),h(`section`,fe,[c[21]||=h(`h2`,{class:`component-demo-view__section-title`},`自定义时长`,-1),h(`div`,pe,[E(n(O),{onClick:v},{default:D(()=>[...c[18]||=[d(`2秒关闭`,-1)]]),_:1}),E(n(O),{onClick:y},{default:D(()=>[...c[19]||=[d(`10秒关闭`,-1)]]),_:1}),E(n(O),{onClick:b},{default:D(()=>[...c[20]||=[d(`不自动关闭`,-1)]]),_:1})]),h(`div`,me,[E(e,{code:Ue,language:`vue`,title:`示例代码`})])]),h(`section`,he,[c[23]||=h(`h2`,{class:`component-demo-view__section-title`},`隐藏图标`,-1),h(`div`,ge,[E(n(O),{onClick:x},{default:D(()=>[...c[22]||=[d(`无图标通知`,-1)]]),_:1})]),h(`div`,_e,[E(e,{code:We,language:`vue`,title:`示例代码`})])]),h(`section`,ve,[c[25]||=h(`h2`,{class:`component-demo-view__section-title`},`自定义图标`,-1),h(`div`,ye,[E(n(O),{onClick:S},{default:D(()=>[...c[24]||=[d(`自定义图标`,-1)]]),_:1})]),h(`div`,be,[E(e,{code:Ge,language:`vue`,title:`示例代码`})])]),h(`section`,xe,[c[27]||=h(`h2`,{class:`component-demo-view__section-title`},`显示进度条`,-1),h(`div`,Se,[E(n(O),{onClick:C},{default:D(()=>[...c[26]||=[d(`带进度条的通知`,-1)]]),_:1})]),h(`div`,Ce,[E(e,{code:Ke,language:`vue`,title:`示例代码`})])]),h(`section`,we,[c[29]||=h(`h2`,{class:`component-demo-view__section-title`},`HTML 内容`,-1),h(`div`,Te,[E(n(O),{onClick:T},{default:D(()=>[...c[28]||=[d(`HTML 内容`,-1)]]),_:1})]),h(`div`,Ee,[E(e,{code:qe,language:`vue`,title:`示例代码`})])]),h(`section`,De,[c[31]||=h(`h2`,{class:`component-demo-view__section-title`},`关闭回调`,-1),h(`div`,Oe,[E(n(O),{onClick:k},{default:D(()=>[...c[30]||=[d(`带回调的通知`,-1)]]),_:1}),i.value?(_(),w(`p`,ke,r(i.value),1)):l(``,!0)]),h(`div`,Ae,[E(e,{code:Je,language:`vue`,title:`示例代码`})])]),h(`section`,je,[c[33]||=h(`h2`,{class:`component-demo-view__section-title`},`点击回调`,-1),h(`div`,Me,[E(n(O),{onClick:A},{default:D(()=>[...c[32]||=[d(`点击通知触发回调`,-1)]]),_:1}),a.value?(_(),w(`p`,Ne,r(a.value),1)):l(``,!0)]),h(`div`,Pe,[E(e,{code:Ye,language:`vue`,title:`示例代码`})])]),h(`section`,Fe,[c[36]||=h(`h2`,{class:`component-demo-view__section-title`},`多条通知`,-1),h(`div`,Ie,[E(n(O),{onClick:j},{default:D(()=>[...c[34]||=[d(`显示多条通知`,-1)]]),_:1}),E(n(O),{theme:`danger`,onClick:M},{default:D(()=>[...c[35]||=[d(`关闭所有`,-1)]]),_:1})]),h(`div`,Le,[E(e,{code:Xe,language:`vue`,title:`示例代码`})])]),h(`section`,Re,[c[37]||=h(`h2`,{class:`component-demo-view__section-title`},`API`,-1),h(`div`,ze,[E(e,{code:Ze,language:`typescript`,title:`全局方法类型定义`})])])]))}}),[[`__scopeId`,`data-v-2413440a`]]);export{Qe as default};
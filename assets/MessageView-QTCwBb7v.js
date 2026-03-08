import{B as e,C as t,K as n,M as r,S as i,W as a,Y as ee,g as o,i as s,v as te,x as c,y as l}from"./index-B3Jx3uix.js";import{t as u}from"./button-GOPf8Q2w.js";import{t as d}from"./message-DSqOka9K.js";import{t as f}from"./CodeBlock-CE4Cu_o1.js";var ne={class:`component-demo-view`},p={class:`component-demo-view__section`},m={class:`component-demo-view__demo`},h={class:`component-demo-view__code`},g={class:`component-demo-view__section`},_={class:`component-demo-view__demo`,style:{gap:`16px`}},v={class:`component-demo-view__code`},y={class:`component-demo-view__section`},b={class:`component-demo-view__demo`,style:{gap:`16px`,"flex-wrap":`wrap`}},x={class:`component-demo-view__code`},S={class:`component-demo-view__section`},C={class:`component-demo-view__demo`},w={class:`component-demo-view__code`},T={class:`component-demo-view__section`},E={class:`component-demo-view__demo`,style:{gap:`16px`}},D={class:`component-demo-view__code`},O={class:`component-demo-view__section`},k={class:`component-demo-view__demo`},A={class:`component-demo-view__code`},j={class:`component-demo-view__section`},M={class:`component-demo-view__demo`},N={class:`component-demo-view__code`},P={class:`component-demo-view__section`},F={class:`component-demo-view__demo`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo`},z={key:0,class:`callback-message`},re={class:`component-demo-view__code`},B={class:`component-demo-view__section`},V={class:`component-demo-view__demo`,style:{gap:`16px`}},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__code`},G=`<template>
  <AleButton @click="showBasicMessage">显示消息</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showBasicMessage = () => {
  // 最简单的方式 - 直接传入字符串
  AleMessage('这是一条基础消息提示');
  
  // 或者使用配置对象
  // AleMessage({
  //   message: '这是一条基础消息提示',
  //   type: 'info',
  //   duration: 3000
  // });
};
<\/script>`,K=`<template>
  <div class="type-demo">
    <AleButton @click="showInfo">信息</AleButton>
    <AleButton theme="success" @click="showSuccess">成功</AleButton>
    <AleButton theme="warning" @click="showWarning">警告</AleButton>
    <AleButton theme="danger" @click="showError">错误</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

// 信息提示 - 用于展示一般性信息
const showInfo = () => {
  AleMessage.info('这是一条信息提示');
};

// 成功提示 - 用于操作成功的反馈
const showSuccess = () => {
  AleMessage.success('操作成功！');
};

// 警告提示 - 用于提醒用户注意
const showWarning = () => {
  AleMessage.warning('请注意，这是一条警告信息');
};

// 错误提示 - 用于展示错误信息
const showError = () => {
  AleMessage.error('发生错误，请重试');
};
<\/script>

<style scoped>
.type-demo {
  display: flex;
  gap: 12px;
}
</style>`,q=`<template>
  <div class="position-demo">
    <AleButton size="small" @click="showAtPosition('top')">
      顶部居中
    </AleButton>
    <AleButton size="small" @click="showAtPosition('top-left')">
      顶部左侧
    </AleButton>
    <AleButton size="small" @click="showAtPosition('top-right')">
      顶部右侧
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom')">
      底部居中
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-left')">
      底部左侧
    </AleButton>
    <AleButton size="small" @click="showAtPosition('bottom-right')">
      底部右侧
    </AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';
import type { MessagePosition } from 'ale-ui';

const showAtPosition = (position: MessagePosition) => {
  AleMessage({
    message: \`显示在 \${position}\`,
    position,
    duration: 3000
  });
};
<\/script>`,J=`<template>
  <AleButton @click="showClosable">显示可关闭消息</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showClosable = () => {
  AleMessage({
    message: '点击右侧按钮关闭我',
    type: 'info',
    closable: true,
    duration: 0  // 0 表示不自动关闭
  });
};
<\/script>`,Y=`<template>
  <div class="duration-demo">
    <AleButton @click="showShort">1秒关闭</AleButton>
    <AleButton @click="showLong">10秒关闭</AleButton>
    <AleButton @click="showPermanent">不自动关闭</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

// 1秒后自动关闭
const showShort = () => {
  AleMessage({
    message: '1秒后自动关闭',
    duration: 1000
  });
};

// 10秒后自动关闭
const showLong = () => {
  AleMessage({
    message: '10秒后自动关闭',
    duration: 10000
  });
};

// 不自动关闭，需要手动点击
const showPermanent = () => {
  AleMessage({
    message: '我不会自动关闭，请点击关闭按钮',
    closable: true,
    duration: 0
  });
};
<\/script>`,X=`<template>
  <AleButton @click="showNoIcon">无图标消息</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showNoIcon = () => {
  AleMessage({
    message: '这是一条没有图标的消息，更加简洁',
    showIcon: false
  });
};
<\/script>`,ie=`<template>
  <AleButton @click="showCustomIcon">自定义图标</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showCustomIcon = () => {
  AleMessage({
    message: '使用自定义图标',
    icon: '🎉',
    duration: 3000
  });
};
<\/script>`,ae=`<template>
  <AleButton @click="showHTML">HTML 内容</AleButton>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

const showHTML = () => {
  AleMessage({
    message: '<strong>粗体文本</strong> 和 <em>斜体文本</em>',
    dangerouslyUseHTMLString: true
  });
};
<\/script>

<style>
/* 可以自定义 HTML 内容的样式 */
.ale-message strong {
  color: var(--color-primary);
}
</style>`,oe=`<template>
  <div class="callback-demo">
    <AleButton @click="showWithCallback">显示消息</AleButton>
    <p v-if="message" class="tip">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton, AleMessage } from 'ale-ui';

const message = ref('');

const showWithCallback = () => {
  message.value = '';
  
  AleMessage({
    message: '关闭后会有回调提示',
    closable: true,
    onClose: () => {
      message.value = '消息已关闭！';
      console.log('消息已关闭！');
    }
  });
};
<\/script>

<style scoped>
.tip {
  color: var(--color-success);
  font-size: 14px;
  margin: 0;
}
</style>`,se=`<template>
  <div class="multiple-demo">
    <AleButton @click="showMultiple">显示多条消息</AleButton>
    <AleButton theme="danger" @click="closeAll">关闭所有</AleButton>
  </div>
</template>

<script setup lang="ts">
import { AleButton, AleMessage } from 'ale-ui';

// 显示多条消息，会自动堆叠
const showMultiple = () => {
  AleMessage.success('第一条：操作成功');
  
  setTimeout(() => {
    AleMessage.warning('第二条：请注意警告信息');
  }, 200);
  
  setTimeout(() => {
    AleMessage.error('第三条：发生错误');
  }, 400);
};

// 关闭所有消息
const closeAll = () => {
  AleMessage.closeAll();
};
<\/script>

<style scoped>
.multiple-demo {
  display: flex;
  gap: 12px;
}
</style>`,ce=`// Message 全局方法完整类型定义
import type { MessageOptions, MessageInstance } from 'ale-ui';

// 全局方法类型
interface MessageGlobalMethod {
  // 基础调用 - 传入字符串或配置对象
  (options: MessageOptions | string): MessageInstance;
  
  // 快捷方法 - 显示成功消息
  success: (options: MessageOptions | string) => MessageInstance;
  
  // 快捷方法 - 显示警告消息
  warning: (options: MessageOptions | string) => MessageInstance;
  
  // 快捷方法 - 显示错误消息
  error: (options: MessageOptions | string) => MessageInstance;
  
  // 快捷方法 - 显示信息消息
  info: (options: MessageOptions | string) => MessageInstance;
  
  // 关闭所有消息
  closeAll: () => void;
}

// MessageOptions 配置选项
interface MessageOptions {
  type?: 'info' | 'success' | 'warning' | 'error';  // 消息类型
  message?: string;                                  // 消息内容（必填）
  duration?: number;                                 // 显示时长（毫秒），默认 3000，0 表示不自动关闭
  closable?: boolean;                                // 是否显示关闭按钮，默认 false
  icon?: string;                                     // 自定义图标
  showIcon?: boolean;                                // 是否显示图标，默认 true
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';  // 位置
  customClass?: string;                              // 自定义类名
  dangerouslyUseHTMLString?: boolean;                // 是否支持 HTML，默认 false
  onClose?: () => void;                              // 关闭时的回调函数
}

// MessageInstance 实例方法
interface MessageInstance {
  close: () => void;  // 手动关闭当前消息
}

// 使用示例
import { AleMessage } from 'ale-ui';

// 基础用法
AleMessage('简单消息');

// 完整配置
const instance = AleMessage({
  message: '操作成功',
  type: 'success',
  duration: 5000,
  closable: true,
  position: 'top-right',
  onClose: () => console.log('消息已关闭')
});

// 手动关闭
instance.close();

// 关闭所有消息
AleMessage.closeAll();`,Z=s(t({__name:`MessageView`,setup(t){let s=a(``),Z=()=>{d(`这是一条消息提示`)},le=()=>{d.info(`这是一条信息提示`)},ue=()=>{d.success(`操作成功！`)},de=()=>{d.warning(`请注意，这是一条警告信息`)},fe=()=>{d.error(`发生错误，请重试`)},Q=e=>{d({message:`显示在 ${e}`,position:e,duration:3e3})},pe=()=>{d({message:`点击右侧按钮关闭我`,closable:!0,duration:0})},$=()=>{d({message:`1秒后自动关闭`,duration:1e3})},me=()=>{d({message:`10秒后自动关闭`,duration:1e4})},he=()=>{d({message:`我不会自动关闭，请点击关闭按钮`,closable:!0,duration:0})},ge=()=>{d({message:`这是一条没有图标的消息`,showIcon:!1})},_e=()=>{d({message:`使用自定义图标`,icon:`🎉`})},ve=()=>{d({message:`<strong>粗体文本</strong> 和 <em>斜体文本</em>`,dangerouslyUseHTMLString:!0})},ye=()=>{s.value=``,d({message:`关闭后会有回调提示`,closable:!0,duration:3e3,onClose:()=>{s.value=`消息已关闭！`}})},be=()=>{d.success(`第一条消息`),setTimeout(()=>d.warning(`第二条消息`),200),setTimeout(()=>d.error(`第三条消息`),400)},xe=()=>{d.closeAll()};return(t,a)=>(r(),l(`div`,ne,[a[38]||=o(`div`,{class:`component-demo-view__header`},[o(`h1`,{class:`component-demo-view__title`},`Message 消息提示`),o(`p`,{class:`component-demo-view__description`},` 用于显示重要的全局提示信息，通常用于操作反馈或系统通知 `)],-1),o(`section`,p,[a[7]||=o(`h2`,{class:`component-demo-view__section-title`},`基础用法`,-1),o(`div`,m,[i(n(u),{onClick:Z},{default:e(()=>[...a[6]||=[c(`显示消息`,-1)]]),_:1})]),o(`div`,h,[i(f,{code:G,language:`vue`,title:`示例代码`})])]),o(`section`,g,[a[12]||=o(`h2`,{class:`component-demo-view__section-title`},`不同类型`,-1),o(`div`,_,[i(n(u),{onClick:le},{default:e(()=>[...a[8]||=[c(`信息`,-1)]]),_:1}),i(n(u),{theme:`success`,onClick:ue},{default:e(()=>[...a[9]||=[c(`成功`,-1)]]),_:1}),i(n(u),{theme:`warning`,onClick:de},{default:e(()=>[...a[10]||=[c(`警告`,-1)]]),_:1}),i(n(u),{theme:`danger`,onClick:fe},{default:e(()=>[...a[11]||=[c(`错误`,-1)]]),_:1})]),o(`div`,v,[i(f,{code:K,language:`vue`,title:`示例代码`})])]),o(`section`,y,[a[19]||=o(`h2`,{class:`component-demo-view__section-title`},`不同位置`,-1),o(`div`,b,[i(n(u),{size:`small`,onClick:a[0]||=e=>Q(`top`)},{default:e(()=>[...a[13]||=[c(`顶部居中`,-1)]]),_:1}),i(n(u),{size:`small`,onClick:a[1]||=e=>Q(`top-left`)},{default:e(()=>[...a[14]||=[c(`顶部左侧`,-1)]]),_:1}),i(n(u),{size:`small`,onClick:a[2]||=e=>Q(`top-right`)},{default:e(()=>[...a[15]||=[c(`顶部右侧`,-1)]]),_:1}),i(n(u),{size:`small`,onClick:a[3]||=e=>Q(`bottom`)},{default:e(()=>[...a[16]||=[c(`底部居中`,-1)]]),_:1}),i(n(u),{size:`small`,onClick:a[4]||=e=>Q(`bottom-left`)},{default:e(()=>[...a[17]||=[c(`底部左侧`,-1)]]),_:1}),i(n(u),{size:`small`,onClick:a[5]||=e=>Q(`bottom-right`)},{default:e(()=>[...a[18]||=[c(`底部右侧`,-1)]]),_:1})]),o(`div`,x,[i(f,{code:q,language:`vue`,title:`示例代码`})])]),o(`section`,S,[a[21]||=o(`h2`,{class:`component-demo-view__section-title`},`可关闭`,-1),o(`div`,C,[i(n(u),{onClick:pe},{default:e(()=>[...a[20]||=[c(`显示可关闭消息`,-1)]]),_:1})]),o(`div`,w,[i(f,{code:J,language:`vue`,title:`示例代码`})])]),o(`section`,T,[a[25]||=o(`h2`,{class:`component-demo-view__section-title`},`自定义时长`,-1),o(`div`,E,[i(n(u),{onClick:$},{default:e(()=>[...a[22]||=[c(`1秒关闭`,-1)]]),_:1}),i(n(u),{onClick:me},{default:e(()=>[...a[23]||=[c(`10秒关闭`,-1)]]),_:1}),i(n(u),{onClick:he},{default:e(()=>[...a[24]||=[c(`不自动关闭`,-1)]]),_:1})]),o(`div`,D,[i(f,{code:Y,language:`vue`,title:`示例代码`})])]),o(`section`,O,[a[27]||=o(`h2`,{class:`component-demo-view__section-title`},`隐藏图标`,-1),o(`div`,k,[i(n(u),{onClick:ge},{default:e(()=>[...a[26]||=[c(`无图标消息`,-1)]]),_:1})]),o(`div`,A,[i(f,{code:X,language:`vue`,title:`示例代码`})])]),o(`section`,j,[a[29]||=o(`h2`,{class:`component-demo-view__section-title`},`自定义图标`,-1),o(`div`,M,[i(n(u),{onClick:_e},{default:e(()=>[...a[28]||=[c(`自定义图标`,-1)]]),_:1})]),o(`div`,N,[i(f,{code:ie,language:`vue`,title:`示例代码`})])]),o(`section`,P,[a[31]||=o(`h2`,{class:`component-demo-view__section-title`},`HTML 内容`,-1),o(`div`,F,[i(n(u),{onClick:ve},{default:e(()=>[...a[30]||=[c(`HTML 内容`,-1)]]),_:1})]),o(`div`,I,[i(f,{code:ae,language:`vue`,title:`示例代码`})])]),o(`section`,L,[a[33]||=o(`h2`,{class:`component-demo-view__section-title`},`关闭回调`,-1),o(`div`,R,[i(n(u),{onClick:ye},{default:e(()=>[...a[32]||=[c(`带回调的消息`,-1)]]),_:1}),s.value?(r(),l(`p`,z,ee(s.value),1)):te(``,!0)]),o(`div`,re,[i(f,{code:oe,language:`vue`,title:`示例代码`})])]),o(`section`,B,[a[36]||=o(`h2`,{class:`component-demo-view__section-title`},`多条消息`,-1),o(`div`,V,[i(n(u),{onClick:be},{default:e(()=>[...a[34]||=[c(`显示多条消息`,-1)]]),_:1}),i(n(u),{theme:`danger`,onClick:xe},{default:e(()=>[...a[35]||=[c(`关闭所有`,-1)]]),_:1})]),o(`div`,H,[i(f,{code:se,language:`vue`,title:`示例代码`})])]),o(`section`,U,[a[37]||=o(`h2`,{class:`component-demo-view__section-title`},`全局方法`,-1),o(`div`,W,[i(f,{code:ce,language:`typescript`,title:`全局方法类型定义`})])])]))}}),[[`__scopeId`,`data-v-5792f23e`]]);export{Z as default};
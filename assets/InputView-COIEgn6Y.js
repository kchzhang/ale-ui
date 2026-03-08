import{C as e,K as t,M as ee,S as n,W as r,Y as i,g as a,i as o,y as te}from"./index-B3Jx3uix.js";import{t as s}from"./input-COusWsIZ.js";import{t as c}from"./CodeBlock-CE4Cu_o1.js";var ne={class:`component-demo-view`},re={class:`component-demo-view__section`},ie={class:`component-demo-view__demo`},ae={class:`component-demo-view__code`},oe={class:`component-demo-view__code-block`},se={class:`component-demo-view__section`},ce={class:`component-demo-view__demo`},le={class:`component-demo-view__code-block`},ue={class:`component-demo-view__section`},de={class:`component-demo-view__demo`},fe={class:`component-demo-view__code-block`},pe={class:`component-demo-view__section`},me={class:`component-demo-view__demo`},he={class:`component-demo-view__code`},ge={class:`component-demo-view__code-block`},_e={class:`component-demo-view__section`},ve={class:`component-demo-view__demo`},ye={class:`component-demo-view__code-block`},be={class:`component-demo-view__section`},xe={class:`component-demo-view__demo`},Se={class:`component-demo-view__code`},Ce={class:`component-demo-view__code-block`},we={class:`component-demo-view__section`},Te={class:`component-demo-view__demo`},Ee={class:`component-demo-view__code`},De={class:`component-demo-view__code-block`},Oe={class:`component-demo-view__section`},ke={class:`component-demo-view__demo`},Ae={class:`component-demo-view__code-block`},je={class:`component-demo-view__section`},Me={class:`component-demo-view__demo`},Ne={class:`component-demo-view__code`},l={class:`component-demo-view__code-block`},u={class:`component-demo-view__section`},d={class:`component-demo-view__demo`},f={class:`component-demo-view__code-block`},p={class:`component-demo-view__section`},m={class:`component-demo-view__demo`},h={class:`component-demo-view__code-block`},g={class:`component-demo-view__section`},_={class:`component-demo-view__demo`},v={class:`component-demo-view__code-block`},y={class:`component-demo-view__section`},b={class:`component-demo-view__demo`},Pe={class:`component-demo-view__code`},Fe={class:`component-demo-view__code-block`},Ie={class:`component-demo-view__section`},Le={class:`component-demo-view__demo`},Re={class:`component-demo-view__code-block`},ze={class:`component-demo-view__section`},Be={class:`component-demo-view__demo`},Ve={class:`component-demo-view__code`},He={class:`component-demo-view__code-block`},Ue={class:`component-demo-view__section`},We={class:`component-demo-view__demo`},Ge={class:`component-demo-view__code`},Ke={class:`component-demo-view__code-block`},qe={class:`component-demo-view__section`},Je={class:`component-demo-view__demo`},Ye={class:`component-demo-view__code`},Xe={class:`component-demo-view__code-block`},Ze=`<template>
  <AleInput v-model="input1" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const input1 = ref('');
<\/script>`,x=`<template>
  <AleInput v-model="inputText" type="text" placeholder="文本输入" />
  <AleInput v-model="inputPassword" type="password" placeholder="密码输入" show-password autocomplete="current-password" />
  <AleInput v-model="inputEmail" type="email" placeholder="邮箱输入" />
  <AleInput v-model="inputNumber" type="number" placeholder="数字输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputText = ref('');
const inputPassword = ref('');
const inputEmail = ref('');
const inputNumber = ref('');
<\/script>`,Qe=`<template>
  <AleInput v-model="inputSmall" size="small" placeholder="小型输入框" />
  <AleInput v-model="inputMedium" size="medium" placeholder="中型输入框" />
  <AleInput v-model="inputLarge" size="large" placeholder="大型输入框" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputSmall = ref('');
const inputMedium = ref('');
const inputLarge = ref('');
<\/script>`,$e=`<template>
  <AleInput v-model="inputClearable" clearable placeholder="输入内容后可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputClearable = ref('');
<\/script>`,et=`<template>
  <AleInput v-model="inputDisabled" disabled placeholder="禁用状态" />
  <AleInput v-model="inputReadonly" readonly placeholder="只读状态" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputDisabled = ref('禁用内容');
const inputReadonly = ref('只读内容');
<\/script>`,tt=`<template>
  <AleInput v-model="inputLimit" :maxlength="10" show-word-limit placeholder="最多输入10个字符" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputLimit = ref('');
<\/script>`,nt=`<template>
  <AleInput
    v-model="inputEvent"
    placeholder="输入内容触发事件"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputEvent = ref('');
const lastEvent = ref('');
const eventCount = ref(0);

const handleChange = (value: string) => {
  lastEvent.value = \`change - \${value}\`;
  eventCount.value++;
};

const handleFocus = (_event: FocusEvent) => {
  lastEvent.value = 'focus';
  eventCount.value++;
};

const handleBlur = (_event: FocusEvent) => {
  lastEvent.value = 'blur';
  eventCount.value++;
};
<\/script>`,rt=`<template>
  <AleInput
    v-model="inputPasswordToggle"
    type="password"
    placeholder="点击图标切换显示密码"
    show-password
    autocomplete="current-password"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputPasswordToggle = ref('');
<\/script>`,it=`<template>
  <AleInput v-model="textarea1" type="textarea" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textarea1 = ref('');
<\/script>`,at=`<template>
  <AleInput v-model="textarea2" type="textarea" :rows="3" placeholder="3行文本域" />
  <AleInput v-model="textarea3" type="textarea" :rows="5" placeholder="5行文本域" />
  <AleInput v-model="textarea4" type="textarea" :rows="8" placeholder="8行文本域" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textarea2 = ref('');
const textarea3 = ref('');
const textarea4 = ref('');
<\/script>`,ot=`<template>
  <AleInput v-model="textareaSmall" type="textarea" size="small" placeholder="小型文本域" />
  <AleInput v-model="textareaMedium" type="textarea" size="medium" placeholder="中型文本域" />
  <AleInput v-model="textareaLarge" type="textarea" size="large" placeholder="大型文本域" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaSmall = ref('');
const textareaMedium = ref('');
const textareaLarge = ref('');
<\/script>`,st=`<template>
  <AleInput v-model="textareaResizeNone" type="textarea" :rows="4" resize="none" placeholder="禁止调整大小" />
  <AleInput v-model="textareaResizeVertical" type="textarea" :rows="4" resize="vertical" placeholder="垂直调整" />
  <AleInput v-model="textareaResizeHorizontal" type="textarea" :rows="4" resize="horizontal" placeholder="水平调整" />
  <AleInput v-model="textareaResizeBoth" type="textarea" :rows="4" resize="both" placeholder="双向调整" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaResizeNone = ref('');
const textareaResizeVertical = ref('');
const textareaResizeHorizontal = ref('');
const textareaResizeBoth = ref('');
<\/script>`,ct=`<template>
  <AleInput v-model="textareaClearable" type="textarea" clearable placeholder="输入内容后可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaClearable = ref('');
<\/script>`,lt=`<template>
  <AleInput v-model="textareaDisabled" type="textarea" disabled placeholder="禁用状态" />
  <AleInput v-model="textareaReadonly" type="textarea" readonly placeholder="只读状态" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaDisabled = ref('禁用的文本域内容');
const textareaReadonly = ref('只读的文本域内容');
<\/script>`,ut=`<template>
  <AleInput v-model="textareaLimit" type="textarea" :maxlength="100" placeholder="最多输入100个字符" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaLimit = ref('');
<\/script>`,dt=`<template>
  <AleInput
    v-model="textareaAutoResize"
    type="textarea"
    :autoResize="true"
    placeholder="请输入内容，高度会自动调整"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaAutoResize = ref('');
<\/script>`,ft=`<template>
  <AleInput
    v-model="textareaHeightLimit"
    type="textarea"
    :autoResize="true"
    :minHeight="60"
    :maxHeight="200"
    placeholder="高度在 60px 到 200px 之间自适应"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaHeightLimit = ref('');
<\/script>`,S=o(e({__name:`InputView`,setup(e){let o=r(``),S=r(``),C=r(``),w=r(``),T=r(``),E=r(``),D=r(``),O=r(``),k=r(``),A=r(`禁用内容`),j=r(`只读内容`),M=r(``),N=r(``),P=r(``),F=r(``),I=r(``),L=r(``),R=r(``),z=r(``),B=r(``),V=r(``),H=r(``),U=r(``),W=r(``),G=r(``),K=r(``),q=r(`禁用的文本域内容`),J=r(`只读的文本域内容`),Y=r(``),X=r(``),Z=r(``),Q=r(``),$=r(0),pt=e=>{Q.value=`change - ${e}`,$.value++},mt=e=>{Q.value=`focus`,$.value++},ht=e=>{Q.value=`blur`,$.value++};return(e,r)=>(ee(),te(`div`,ne,[r[48]||=a(`div`,{class:`component-demo-view__header`},[a(`h1`,{class:`component-demo-view__title`},`Input 输入框`),a(`p`,{class:`component-demo-view__description`},` 通过鼠标或键盘输入字符 `)],-1),a(`section`,re,[r[31]||=a(`h2`,{class:`component-demo-view__section-title`},`基础输入框`,-1),a(`div`,ie,[n(t(s),{modelValue:o.value,"onUpdate:modelValue":r[0]||=e=>o.value=e,placeholder:`请输入内容`},null,8,[`modelValue`])]),a(`div`,ae,` 输入内容：`+i(o.value),1),a(`div`,oe,[n(c,{code:Ze,language:`vue`,title:`示例代码`})])]),a(`section`,se,[r[32]||=a(`h2`,{class:`component-demo-view__section-title`},`不同类型`,-1),a(`div`,ce,[n(t(s),{modelValue:S.value,"onUpdate:modelValue":r[1]||=e=>S.value=e,type:`text`,placeholder:`文本输入`},null,8,[`modelValue`]),n(t(s),{modelValue:C.value,"onUpdate:modelValue":r[2]||=e=>C.value=e,type:`password`,placeholder:`密码输入`,"show-password":``,autocomplete:`current-password`},null,8,[`modelValue`]),n(t(s),{modelValue:w.value,"onUpdate:modelValue":r[3]||=e=>w.value=e,type:`email`,placeholder:`邮箱输入`},null,8,[`modelValue`]),n(t(s),{modelValue:T.value,"onUpdate:modelValue":r[4]||=e=>T.value=e,type:`number`,placeholder:`数字输入`},null,8,[`modelValue`])]),a(`div`,le,[n(c,{code:x,language:`vue`,title:`示例代码`})])]),a(`section`,ue,[r[33]||=a(`h2`,{class:`component-demo-view__section-title`},`不同尺寸`,-1),a(`div`,de,[n(t(s),{modelValue:E.value,"onUpdate:modelValue":r[5]||=e=>E.value=e,size:`small`,placeholder:`小型输入框`},null,8,[`modelValue`]),n(t(s),{modelValue:D.value,"onUpdate:modelValue":r[6]||=e=>D.value=e,size:`medium`,placeholder:`中型输入框`},null,8,[`modelValue`]),n(t(s),{modelValue:O.value,"onUpdate:modelValue":r[7]||=e=>O.value=e,size:`large`,placeholder:`大型输入框`},null,8,[`modelValue`])]),a(`div`,fe,[n(c,{code:Qe,language:`vue`,title:`示例代码`})])]),a(`section`,pe,[r[34]||=a(`h2`,{class:`component-demo-view__section-title`},`可清空`,-1),a(`div`,me,[n(t(s),{modelValue:k.value,"onUpdate:modelValue":r[8]||=e=>k.value=e,clearable:``,placeholder:`输入内容后可清空`},null,8,[`modelValue`])]),a(`div`,he,` 输入内容：`+i(k.value),1),a(`div`,ge,[n(c,{code:$e,language:`vue`,title:`示例代码`})])]),a(`section`,_e,[r[35]||=a(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),a(`div`,ve,[n(t(s),{modelValue:A.value,"onUpdate:modelValue":r[9]||=e=>A.value=e,disabled:``,placeholder:`禁用状态`},null,8,[`modelValue`]),n(t(s),{modelValue:j.value,"onUpdate:modelValue":r[10]||=e=>j.value=e,readonly:``,placeholder:`只读状态`},null,8,[`modelValue`])]),a(`div`,ye,[n(c,{code:et,language:`vue`,title:`示例代码`})])]),a(`section`,be,[r[36]||=a(`h2`,{class:`component-demo-view__section-title`},`字数限制`,-1),a(`div`,xe,[n(t(s),{modelValue:M.value,"onUpdate:modelValue":r[11]||=e=>M.value=e,maxlength:10,"show-word-limit":``,placeholder:`最多输入10个字符`},null,8,[`modelValue`])]),a(`div`,Se,` 输入内容：`+i(M.value)+`（`+i(M.value?.length||0)+`/10） `,1),a(`div`,Ce,[n(c,{code:tt,language:`vue`,title:`示例代码`})])]),a(`section`,we,[r[37]||=a(`h2`,{class:`component-demo-view__section-title`},`事件监听`,-1),a(`div`,Te,[n(t(s),{modelValue:N.value,"onUpdate:modelValue":r[12]||=e=>N.value=e,placeholder:`输入内容触发事件`,onChange:pt,onFocus:mt,onBlur:ht},null,8,[`modelValue`])]),a(`div`,Ee,[a(`div`,null,`输入内容：`+i(N.value),1),a(`div`,null,`最后事件：`+i(Q.value),1),a(`div`,null,`事件次数：`+i($.value),1)]),a(`div`,De,[n(c,{code:nt,language:`vue`,title:`示例代码`})])]),a(`section`,Oe,[r[38]||=a(`h2`,{class:`component-demo-view__section-title`},`密码切换`,-1),a(`div`,ke,[n(t(s),{modelValue:P.value,"onUpdate:modelValue":r[13]||=e=>P.value=e,type:`password`,placeholder:`点击图标切换显示密码`,"show-password":``,autocomplete:`current-password`},null,8,[`modelValue`])]),a(`div`,Ae,[n(c,{code:rt,language:`vue`,title:`示例代码`})])]),a(`section`,je,[r[39]||=a(`h2`,{class:`component-demo-view__section-title`},`文本域`,-1),a(`div`,Me,[n(t(s),{modelValue:F.value,"onUpdate:modelValue":r[14]||=e=>F.value=e,type:`textarea`,placeholder:`请输入内容`},null,8,[`modelValue`])]),a(`div`,Ne,` 输入内容：`+i(F.value),1),a(`div`,l,[n(c,{code:it,language:`vue`,title:`示例代码`})])]),a(`section`,u,[r[40]||=a(`h2`,{class:`component-demo-view__section-title`},`自定义行数`,-1),a(`div`,d,[n(t(s),{modelValue:I.value,"onUpdate:modelValue":r[15]||=e=>I.value=e,type:`textarea`,rows:3,placeholder:`3行文本域`},null,8,[`modelValue`]),n(t(s),{modelValue:L.value,"onUpdate:modelValue":r[16]||=e=>L.value=e,type:`textarea`,rows:5,placeholder:`5行文本域`},null,8,[`modelValue`]),n(t(s),{modelValue:R.value,"onUpdate:modelValue":r[17]||=e=>R.value=e,type:`textarea`,rows:8,placeholder:`8行文本域`},null,8,[`modelValue`])]),a(`div`,f,[n(c,{code:at,language:`vue`,title:`示例代码`})])]),a(`section`,p,[r[41]||=a(`h2`,{class:`component-demo-view__section-title`},`文本域尺寸`,-1),a(`div`,m,[n(t(s),{modelValue:z.value,"onUpdate:modelValue":r[18]||=e=>z.value=e,type:`textarea`,size:`small`,placeholder:`小型文本域`},null,8,[`modelValue`]),n(t(s),{modelValue:B.value,"onUpdate:modelValue":r[19]||=e=>B.value=e,type:`textarea`,size:`medium`,placeholder:`中型文本域`},null,8,[`modelValue`]),n(t(s),{modelValue:V.value,"onUpdate:modelValue":r[20]||=e=>V.value=e,type:`textarea`,size:`large`,placeholder:`大型文本域`},null,8,[`modelValue`])]),a(`div`,h,[n(c,{code:ot,language:`vue`,title:`示例代码`})])]),a(`section`,g,[r[42]||=a(`h2`,{class:`component-demo-view__section-title`},`调整大小`,-1),a(`div`,_,[n(t(s),{modelValue:H.value,"onUpdate:modelValue":r[21]||=e=>H.value=e,type:`textarea`,rows:4,resize:`none`,placeholder:`禁止调整大小`},null,8,[`modelValue`]),n(t(s),{modelValue:U.value,"onUpdate:modelValue":r[22]||=e=>U.value=e,type:`textarea`,rows:4,resize:`vertical`,placeholder:`垂直调整`},null,8,[`modelValue`]),n(t(s),{modelValue:W.value,"onUpdate:modelValue":r[23]||=e=>W.value=e,type:`textarea`,rows:4,resize:`horizontal`,placeholder:`水平调整`},null,8,[`modelValue`]),n(t(s),{modelValue:G.value,"onUpdate:modelValue":r[24]||=e=>G.value=e,type:`textarea`,rows:4,resize:`both`,placeholder:`双向调整`},null,8,[`modelValue`])]),a(`div`,v,[n(c,{code:st,language:`vue`,title:`示例代码`})])]),a(`section`,y,[r[43]||=a(`h2`,{class:`component-demo-view__section-title`},`文本域可清空`,-1),a(`div`,b,[n(t(s),{modelValue:K.value,"onUpdate:modelValue":r[25]||=e=>K.value=e,type:`textarea`,clearable:``,placeholder:`输入内容后可清空`},null,8,[`modelValue`])]),a(`div`,Pe,` 输入内容：`+i(K.value),1),a(`div`,Fe,[n(c,{code:ct,language:`vue`,title:`示例代码`})])]),a(`section`,Ie,[r[44]||=a(`h2`,{class:`component-demo-view__section-title`},`文本域禁用状态`,-1),a(`div`,Le,[n(t(s),{modelValue:q.value,"onUpdate:modelValue":r[26]||=e=>q.value=e,type:`textarea`,disabled:``,placeholder:`禁用状态`},null,8,[`modelValue`]),n(t(s),{modelValue:J.value,"onUpdate:modelValue":r[27]||=e=>J.value=e,type:`textarea`,readonly:``,placeholder:`只读状态`},null,8,[`modelValue`])]),a(`div`,Re,[n(c,{code:lt,language:`vue`,title:`示例代码`})])]),a(`section`,ze,[r[45]||=a(`h2`,{class:`component-demo-view__section-title`},`文本域字数限制`,-1),a(`div`,Be,[n(t(s),{modelValue:Y.value,"onUpdate:modelValue":r[28]||=e=>Y.value=e,type:`textarea`,maxlength:100,placeholder:`最多输入100个字符`},null,8,[`modelValue`])]),a(`div`,Ve,` 输入内容：`+i(Y.value)+`（`+i(Y.value?.length||0)+`/100） `,1),a(`div`,He,[n(c,{code:ut,language:`vue`,title:`示例代码`})])]),a(`section`,Ue,[r[46]||=a(`h2`,{class:`component-demo-view__section-title`},`文本域高度自适应`,-1),a(`div`,We,[n(t(s),{modelValue:X.value,"onUpdate:modelValue":r[29]||=e=>X.value=e,type:`textarea`,autoResize:!0,placeholder:`请输入内容，高度会自动调整`},null,8,[`modelValue`])]),a(`div`,Ge,` 输入内容：`+i(X.value),1),a(`div`,Ke,[n(c,{code:dt,language:`vue`,title:`示例代码`})])]),a(`section`,qe,[r[47]||=a(`h2`,{class:`component-demo-view__section-title`},`文本域高度限制`,-1),a(`div`,Je,[n(t(s),{modelValue:Z.value,"onUpdate:modelValue":r[30]||=e=>Z.value=e,type:`textarea`,autoResize:!0,minHeight:60,maxHeight:200,placeholder:`高度在 60px 到 200px 之间自适应`},null,8,[`modelValue`])]),a(`div`,Ye,` 输入内容：`+i(Z.value),1),a(`div`,Xe,[n(c,{code:ft,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-8afe59c3`]]);export{S as default};
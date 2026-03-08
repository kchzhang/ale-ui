import{A as e,B as t,C as n,E as r,F as i,J as a,K as o,M as s,N as c,S as l,U as u,W as d,f,g as p,h as m,i as h,k as g,q as _,v,x as y,y as b,z as x}from"./index-B3Jx3uix.js";import{t as S}from"./CodeBlock-CE4Cu_o1.js";var C=n({__name:`Split`,props:{direction:{default:`horizontal`},splitterSize:{default:8},initialSplit:{default:50},minSplit:{default:10},maxSplit:{default:90},disabled:{type:Boolean,default:!1}},emits:[`resize`,`collapse`],setup(t,{expose:n,emit:r}){let a=t,o=r,l=d(),f=u([]),p=d(!1),h=d(-1),g=d(0),v=d(0),y=d([]),x=0,S=()=>`split-panel-${x++}`,C=m(()=>[`ale-split`,`ale-split--${a.direction}`,{"is-dragging":p.value,"is-disabled":a.disabled}]),w=e=>{let t=f.length;f.push({...e,id:e.id||S(),size:e.size??(t===0?a.initialSplit:100-a.initialSplit)})},T=e=>{let t=f.findIndex(t=>t.id===e);t>-1&&f.splice(t,1)},E=(e,t)=>{let n=f.find(t=>t.id===e);n&&(n.size=t)},D=e=>{let t=f.find(t=>t.id===e);t&&t.collapsible&&(t.collapsed=!t.collapsed,o(`collapse`,f.findIndex(t=>t.id===e),t.collapsed))},O=e=>f.findIndex(t=>t.id===e),k=e=>{if(!p.value||!l.value)return;let t=l.value.getBoundingClientRect(),n=a.direction===`horizontal`?t.width:t.height,r=(a.direction===`horizontal`?e.clientX-g.value:e.clientY-v.value)/n*100,i=f[h.value],s=f[h.value+1];if(!i||!s)return;let c=y.value[h.value]??0,u=y.value[h.value+1]??0,d=c+r,m=u-r,_=i.min?i.min/n*100:a.minSplit,b=i.max?i.max/n*100:a.maxSplit,x=s.min?s.min/n*100:a.minSplit,S=s.max?s.max/n*100:a.maxSplit;d<_&&(d=_,m=c+u-_),d>b&&(d=b,m=c+u-b),m<x&&(m=x,d=c+u-x),m>S&&(m=S,d=c+u-S),i.size=d,s.size=m,o(`resize`,f.map(e=>e.size))},A=()=>{p.value=!1,h.value=-1,document.removeEventListener(`mousemove`,k),document.removeEventListener(`mouseup`,A),document.body.style.cursor=``,document.body.style.userSelect=``},j=(e,t)=>{a.disabled||(e.preventDefault(),p.value=!0,h.value=t,g.value=e.clientX,v.value=e.clientY,y.value=f.map(e=>e.size),document.addEventListener(`mousemove`,k),document.addEventListener(`mouseup`,A),document.body.style.cursor=a.direction===`horizontal`?`col-resize`:`row-resize`,document.body.style.userSelect=`none`)};return c(`splitContext`,{direction:a.direction,registerPanel:w,unregisterPanel:T,updatePanelSize:E,togglePanelCollapse:D,getPanelIndex:O,panels:f,isDragging:p,draggingSplitterIndex:h,handleSplitterMouseDown:j}),n({handleSplitterMouseDown:j,panels:f}),e(()=>{document.removeEventListener(`mousemove`,k),document.removeEventListener(`mouseup`,A)}),(e,t)=>(s(),b(`div`,{class:_(C.value),ref_key:`splitRef`,ref:l},[i(e.$slots,`default`)],2))}}),w={class:`ale-split-panel__content`},T={viewBox:`0 0 16 16`,class:`ale-split-panel__collapse-icon`},E=[`d`],D=n({__name:`SplitPanel`,props:{size:{default:void 0},min:{default:0},max:{default:1/0},collapsible:{type:Boolean,default:!1},collapsed:{type:Boolean,default:!1},collapsedSize:{default:40}},emits:[`collapse`,`resize`],setup(t,{emit:n}){let o=t,c=n,l=r(`splitContext`);if(!l)throw Error(`SplitPanel must be used within a Split component`);let u=d(`split-panel-${Math.random().toString(36).slice(2,9)}`),h=d(o.collapsed),y=m(()=>[`ale-split-panel`,{"is-collapsed":h.value}]),S=m(()=>{let e=l.panels.find(e=>e.id===u.value),t=h.value?o.collapsedSize:e?.size??o.size;return{[l.direction===`horizontal`?`width`:`height`]:h.value?`${o.collapsedSize}px`:`${t}%`,flexShrink:0}}),C=m(()=>{let e=l.getPanelIndex(u.value);return e>-1&&e<l.panels.length-1}),D=m(()=>{let e=l.getPanelIndex(u.value),t=l.isDragging.value&&l.draggingSplitterIndex.value===e;return[`ale-split-panel__splitter`,`ale-split-panel__splitter--${l.direction}`,{"is-collapsed":h.value,"is-dragging":t}]}),O=m(()=>l.direction===`horizontal`?h.value?`M6 4l4 4-4 4V4z`:`M10 4l-4 4 4 4V4z`:h.value?`M4 6l4 4 4-4H4z`:`M4 10l4-4 4 4H4z`),k=e=>{let t=l.getPanelIndex(u.value);t>-1&&l.handleSplitterMouseDown&&l.handleSplitterMouseDown(e,t)},A=()=>{o.collapsible&&j()},j=()=>{h.value=!h.value,l.togglePanelCollapse(u.value),c(`collapse`,h.value)};return g(()=>{let e={id:u.value,size:typeof o.size==`string`?parseFloat(o.size):o.size??50,min:o.min,max:o.max,collapsible:o.collapsible,collapsed:h.value,collapsedSize:o.collapsedSize};l.registerPanel(e)}),e(()=>{l.unregisterPanel(u.value)}),x(()=>o.collapsed,e=>{h.value=e}),(e,n)=>(s(),b(`div`,{class:_(y.value),style:a(S.value)},[p(`div`,w,[i(e.$slots,`default`)]),C.value?(s(),b(`div`,{key:0,class:_(D.value),onMousedown:k,onDblclick:A},[n[0]||=p(`div`,{class:`ale-split-panel__splitter-line`},null,-1),t.collapsible?(s(),b(`button`,{key:0,class:`ale-split-panel__collapse-btn`,onClick:f(j,[`stop`])},[(s(),b(`svg`,T,[p(`path`,{d:O.value,fill:`currentColor`},null,8,E)]))])):v(``,!0)],34)):v(``,!0)],6))}});const O=C,k=D;var A={class:`component-demo-view`},j={class:`component-demo-view__section`},M={class:`component-demo-view__demo split-demo`},N={class:`component-demo-view__code`},P={class:`component-demo-view__section`},F={class:`component-demo-view__demo split-demo`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo split-demo`},z={class:`component-demo-view__code`},B={class:`component-demo-view__section`},V={class:`component-demo-view__demo split-demo`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo split-demo`},G={class:`component-demo-view__code`},K={class:`component-demo-view__section`},q={class:`component-demo-view__demo split-demo`},J={class:`component-demo-view__code`},Y={class:`component-demo-view__section`},X={class:`component-demo-view__demo split-demo`},Z={class:`component-demo-view__code`},Q=`<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="30">
      <div>左侧面板 (30%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="70">
      <div>右侧面板 (70%)</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`,$=`<template>
  <AleSplit direction="vertical" style="height: 400px;">
    <AleSplitPanel :size="40">
      <div>顶部面板 (40%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="60">
      <div>底部面板 (60%)</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`,ee=`<template>
  <AleSplit style="height: 400px;">
    <AleSplitPanel :size="20">
      <div>导航栏 (20%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="80">
      <AleSplit direction="vertical" style="height: 100%;">
        <AleSplitPanel :size="70">
          <div>主内容区 (70%)</div>
        </AleSplitPanel>
        <AleSplitPanel :size="30">
          <div>底部区域 (30%)</div>
        </AleSplitPanel>
      </AleSplit>
    </AleSplitPanel>
  </AleSplit>
<\/script>`,te=`<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="30" :min="100" :max="400">
      <div>左侧面板 - 最小: 100px，最大: 400px</div>
    </AleSplitPanel>
    <AleSplitPanel :size="70">
      <div>右侧面板</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`,ne=`<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="25" collapsible>
      <div>可折叠面板</div>
    </AleSplitPanel>
    <AleSplitPanel :size="75">
      <div>右侧面板</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`,re=`<template>
  <AleSplit style="height: 300px;">
    <AleSplitPanel :size="20" :min="150">
      <div>左侧栏 (20%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="60" :min="300">
      <div>中间内容区 (60%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="20" :min="150" collapsible>
      <div>右侧栏 (20%) - 可折叠</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`,ie=`<template>
  <AleSplit disabled style="height: 300px;">
    <AleSplitPanel :size="40">
      <div>左侧面板 (40%)</div>
    </AleSplitPanel>
    <AleSplitPanel :size="60">
      <div>右侧面板 (60%)</div>
    </AleSplitPanel>
  </AleSplit>
<\/script>`,ae=h(n({__name:`SplitView`,setup(e){return(e,n)=>(s(),b(`div`,A,[n[30]||=p(`div`,{class:`component-demo-view__header`},[p(`h1`,{class:`component-demo-view__title`},`Split 分割面板`),p(`p`,{class:`component-demo-view__description`},` 用于将容器分割为多个可调整大小的面板，支持水平和垂直方向，分割线悬停时显示 `)],-1),p(`section`,j,[n[2]||=p(`h2`,{class:`component-demo-view__section-title`},`水平分割`,-1),n[3]||=p(`p`,{class:`component-demo-view__section-desc`},` 默认方向，将容器分为左右两个面板，悬停分割线可拖动调整比例 `,-1),p(`div`,M,[l(o(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:t(()=>[l(o(k),{size:30},{default:t(()=>[...n[0]||=[p(`div`,{class:`split-panel-content split-panel-content--left`},` 左侧面板 (30%) `,-1)]]),_:1}),l(o(k),{size:70},{default:t(()=>[...n[1]||=[p(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 (70%) `,-1)]]),_:1})]),_:1})]),p(`div`,N,[l(S,{code:Q,language:`vue`,title:`示例代码`})])]),p(`section`,P,[n[6]||=p(`h2`,{class:`component-demo-view__section-title`},`垂直分割`,-1),n[7]||=p(`p`,{class:`component-demo-view__section-desc`},` 通过设置 direction="vertical"，将容器分为上下两个面板 `,-1),p(`div`,F,[l(o(O),{direction:`vertical`,style:{height:`400px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:t(()=>[l(o(k),{size:40},{default:t(()=>[...n[4]||=[p(`div`,{class:`split-panel-content split-panel-content--top`},` 顶部面板 (40%) `,-1)]]),_:1}),l(o(k),{size:60},{default:t(()=>[...n[5]||=[p(`div`,{class:`split-panel-content split-panel-content--bottom`},` 底部面板 (60%) `,-1)]]),_:1})]),_:1})]),p(`div`,I,[l(S,{code:$,language:`vue`,title:`示例代码`})])]),p(`section`,L,[n[11]||=p(`h2`,{class:`component-demo-view__section-title`},`嵌套使用`,-1),n[12]||=p(`p`,{class:`component-demo-view__section-desc`},` 可以嵌套使用 Split 组件，实现复杂的布局结构 `,-1),p(`div`,R,[l(o(O),{style:{height:`400px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:t(()=>[l(o(k),{size:20},{default:t(()=>[...n[8]||=[p(`div`,{class:`split-panel-content split-panel-content--nav`},` 导航栏 (20%) `,-1)]]),_:1}),l(o(k),{size:80},{default:t(()=>[l(o(O),{direction:`vertical`,style:{height:`100%`}},{default:t(()=>[l(o(k),{size:70},{default:t(()=>[...n[9]||=[p(`div`,{class:`split-panel-content split-panel-content--main`},` 主内容区 (70%) `,-1)]]),_:1}),l(o(k),{size:30},{default:t(()=>[...n[10]||=[p(`div`,{class:`split-panel-content split-panel-content--footer`},` 底部区域 (30%) `,-1)]]),_:1})]),_:1})]),_:1})]),_:1})]),p(`div`,z,[l(S,{code:ee,language:`vue`,title:`示例代码`})])]),p(`section`,B,[n[15]||=p(`h2`,{class:`component-demo-view__section-title`},`限制尺寸范围`,-1),n[16]||=p(`p`,{class:`component-demo-view__section-desc`},` 通过 min 和 max 属性限制面板的最小和最大尺寸（像素） `,-1),p(`div`,V,[l(o(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:t(()=>[l(o(k),{size:30,min:100,max:400},{default:t(()=>[...n[13]||=[p(`div`,{class:`split-panel-content split-panel-content--left`},[y(` 左侧面板`),p(`br`),y(` 最小: 100px`),p(`br`),y(` 最大: 400px `)],-1)]]),_:1}),l(o(k),{size:70},{default:t(()=>[...n[14]||=[p(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 `,-1)]]),_:1})]),_:1})]),p(`div`,H,[l(S,{code:te,language:`vue`,title:`示例代码`})])]),p(`section`,U,[n[19]||=p(`h2`,{class:`component-demo-view__section-title`},`可折叠面板`,-1),n[20]||=p(`p`,{class:`component-demo-view__section-desc`},` 设置 collapsible 属性使面板可折叠，双击分割线或点击折叠按钮可切换折叠状态 `,-1),p(`div`,W,[l(o(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:t(()=>[l(o(k),{size:25,collapsible:``},{default:t(()=>[...n[17]||=[p(`div`,{class:`split-panel-content split-panel-content--left`},[y(` 可折叠面板`),p(`br`),y(` 双击分割线或`),p(`br`),y(` 悬停点击按钮折叠 `)],-1)]]),_:1}),l(o(k),{size:75},{default:t(()=>[...n[18]||=[p(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 `,-1)]]),_:1})]),_:1})]),p(`div`,G,[l(S,{code:ne,language:`vue`,title:`示例代码`})])]),p(`section`,K,[n[24]||=p(`h2`,{class:`component-demo-view__section-title`},`三栏布局`,-1),n[25]||=p(`p`,{class:`component-demo-view__section-desc`},` 使用多个面板实现三栏或多栏布局 `,-1),p(`div`,q,[l(o(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:t(()=>[l(o(k),{size:20,min:150},{default:t(()=>[...n[21]||=[p(`div`,{class:`split-panel-content split-panel-content--nav`},` 左侧栏 (20%) `,-1)]]),_:1}),l(o(k),{size:60,min:300},{default:t(()=>[...n[22]||=[p(`div`,{class:`split-panel-content split-panel-content--main`},` 中间内容区 (60%) `,-1)]]),_:1}),l(o(k),{size:20,min:150,collapsible:``},{default:t(()=>[...n[23]||=[p(`div`,{class:`split-panel-content split-panel-content--aside`},[y(` 右侧栏 (20%)`),p(`br`),y(` 可折叠 `)],-1)]]),_:1})]),_:1})]),p(`div`,J,[l(S,{code:re,language:`vue`,title:`示例代码`})])]),p(`section`,Y,[n[28]||=p(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),n[29]||=p(`p`,{class:`component-demo-view__section-desc`},` 设置 disabled 属性禁用拖动功能 `,-1),p(`div`,X,[l(o(O),{disabled:``,style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:t(()=>[l(o(k),{size:40},{default:t(()=>[...n[26]||=[p(`div`,{class:`split-panel-content split-panel-content--left`},[y(` 左侧面板 (40%)`),p(`br`),y(` 拖动已禁用 `)],-1)]]),_:1}),l(o(k),{size:60},{default:t(()=>[...n[27]||=[p(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 (60%) `,-1)]]),_:1})]),_:1})]),p(`div`,Z,[l(S,{code:ie,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-9a4df994`]]);export{ae as default};
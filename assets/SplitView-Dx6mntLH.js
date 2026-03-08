import{t as e}from"./CodeBlock-CmDK_EYq.js";import{G as t,H as n,K as r,M as i,O as a,P as o,R as s,S as c,T as l,U as u,_ as d,b as f,d as p,h as m,j as h,k as g,m as _,q as v,r as y,v as b,x,z as S}from"./index-D6beBo5R.js";var C=c({__name:`Split`,props:{direction:{default:`horizontal`},splitterSize:{default:8},initialSplit:{default:50},minSplit:{default:10},maxSplit:{default:90},disabled:{type:Boolean,default:!1}},emits:[`resize`,`collapse`],setup(e,{expose:t,emit:a}){let s=e,c=a,l=u(),d=n([]),f=u(!1),p=u(-1),m=u(0),v=u(0),y=u([]),x=0,S=()=>`split-panel-${x++}`,C=_(()=>[`ale-split`,`ale-split--${s.direction}`,{"is-dragging":f.value,"is-disabled":s.disabled}]),w=e=>{let t=d.length;d.push({...e,id:e.id||S(),size:e.size??(t===0?s.initialSplit:100-s.initialSplit)})},T=e=>{let t=d.findIndex(t=>t.id===e);t>-1&&d.splice(t,1)},E=(e,t)=>{let n=d.find(t=>t.id===e);n&&(n.size=t)},D=e=>{let t=d.find(t=>t.id===e);t&&t.collapsible&&(t.collapsed=!t.collapsed,c(`collapse`,d.findIndex(t=>t.id===e),t.collapsed))},O=e=>d.findIndex(t=>t.id===e),k=e=>{if(!f.value||!l.value)return;let t=l.value.getBoundingClientRect(),n=s.direction===`horizontal`?t.width:t.height,r=(s.direction===`horizontal`?e.clientX-m.value:e.clientY-v.value)/n*100,i=d[p.value],a=d[p.value+1];if(!i||!a)return;let o=y.value[p.value]??0,u=y.value[p.value+1]??0,h=o+r,g=u-r,_=i.min?i.min/n*100:s.minSplit,b=i.max?i.max/n*100:s.maxSplit,x=a.min?a.min/n*100:s.minSplit,S=a.max?a.max/n*100:s.maxSplit;h<_&&(h=_,g=o+u-_),h>b&&(h=b,g=o+u-b),g<x&&(g=x,h=o+u-x),g>S&&(g=S,h=o+u-S),i.size=h,a.size=g,c(`resize`,d.map(e=>e.size))},A=()=>{f.value=!1,p.value=-1,document.removeEventListener(`mousemove`,k),document.removeEventListener(`mouseup`,A),document.body.style.cursor=``,document.body.style.userSelect=``},j=(e,t)=>{s.disabled||(e.preventDefault(),f.value=!0,p.value=t,m.value=e.clientX,v.value=e.clientY,y.value=d.map(e=>e.size),document.addEventListener(`mousemove`,k),document.addEventListener(`mouseup`,A),document.body.style.cursor=s.direction===`horizontal`?`col-resize`:`row-resize`,document.body.style.userSelect=`none`)};return i(`splitContext`,{direction:s.direction,registerPanel:w,unregisterPanel:T,updatePanelSize:E,togglePanelCollapse:D,getPanelIndex:O,panels:d,isDragging:f,draggingSplitterIndex:p,handleSplitterMouseDown:j}),t({handleSplitterMouseDown:j,panels:d}),g(()=>{document.removeEventListener(`mousemove`,k),document.removeEventListener(`mouseup`,A)}),(e,t)=>(h(),b(`div`,{class:r(C.value),ref_key:`splitRef`,ref:l},[o(e.$slots,`default`)],2))}}),w={class:`ale-split-panel__content`},T={viewBox:`0 0 16 16`,class:`ale-split-panel__collapse-icon`},E=[`d`],D=c({__name:`SplitPanel`,props:{size:{default:void 0},min:{default:0},max:{default:1/0},collapsible:{type:Boolean,default:!1},collapsed:{type:Boolean,default:!1},collapsedSize:{default:40}},emits:[`collapse`,`resize`],setup(e,{emit:t}){let n=e,i=t,c=l(`splitContext`);if(!c)throw Error(`SplitPanel must be used within a Split component`);let f=u(`split-panel-${Math.random().toString(36).slice(2,9)}`),y=u(n.collapsed),x=_(()=>[`ale-split-panel`,{"is-collapsed":y.value}]),S=_(()=>{let e=c.panels.find(e=>e.id===f.value),t=y.value?n.collapsedSize:e?.size??n.size;return{[c.direction===`horizontal`?`width`:`height`]:y.value?`${n.collapsedSize}px`:`${t}%`,flexShrink:0}}),C=_(()=>{let e=c.getPanelIndex(f.value);return e>-1&&e<c.panels.length-1}),D=_(()=>{let e=c.getPanelIndex(f.value),t=c.isDragging.value&&c.draggingSplitterIndex.value===e;return[`ale-split-panel__splitter`,`ale-split-panel__splitter--${c.direction}`,{"is-collapsed":y.value,"is-dragging":t}]}),O=_(()=>c.direction===`horizontal`?y.value?`M6 4l4 4-4 4V4z`:`M10 4l-4 4 4 4V4z`:y.value?`M4 6l4 4 4-4H4z`:`M4 10l4-4 4 4H4z`),k=e=>{let t=c.getPanelIndex(f.value);t>-1&&c.handleSplitterMouseDown&&c.handleSplitterMouseDown(e,t)},A=()=>{n.collapsible&&j()},j=()=>{y.value=!y.value,c.togglePanelCollapse(f.value),i(`collapse`,y.value)};return a(()=>{let e={id:f.value,size:typeof n.size==`string`?parseFloat(n.size):n.size??50,min:n.min,max:n.max,collapsible:n.collapsible,collapsed:y.value,collapsedSize:n.collapsedSize};c.registerPanel(e)}),g(()=>{c.unregisterPanel(f.value)}),s(()=>n.collapsed,e=>{y.value=e}),(t,n)=>(h(),b(`div`,{class:r(x.value),style:v(S.value)},[m(`div`,w,[o(t.$slots,`default`)]),C.value?(h(),b(`div`,{key:0,class:r(D.value),onMousedown:k,onDblclick:A},[n[0]||=m(`div`,{class:`ale-split-panel__splitter-line`},null,-1),e.collapsible?(h(),b(`button`,{key:0,class:`ale-split-panel__collapse-btn`,onClick:p(j,[`stop`])},[(h(),b(`svg`,T,[m(`path`,{d:O.value,fill:`currentColor`},null,8,E)]))])):d(``,!0)],34)):d(``,!0)],6))}});const O=C,k=D;var A={class:`component-demo-view`},j={class:`component-demo-view__section`},M={class:`component-demo-view__demo split-demo`},N={class:`component-demo-view__code`},P={class:`component-demo-view__section`},F={class:`component-demo-view__demo split-demo`},I={class:`component-demo-view__code`},L={class:`component-demo-view__section`},R={class:`component-demo-view__demo split-demo`},z={class:`component-demo-view__code`},B={class:`component-demo-view__section`},V={class:`component-demo-view__demo split-demo`},H={class:`component-demo-view__code`},U={class:`component-demo-view__section`},W={class:`component-demo-view__demo split-demo`},G={class:`component-demo-view__code`},K={class:`component-demo-view__section`},q={class:`component-demo-view__demo split-demo`},J={class:`component-demo-view__code`},Y={class:`component-demo-view__section`},X={class:`component-demo-view__demo split-demo`},Z={class:`component-demo-view__code`},Q=`<template>
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
<\/script>`,ae=y(c({__name:`SplitView`,setup(n){return(n,r)=>(h(),b(`div`,A,[r[30]||=m(`div`,{class:`component-demo-view__header`},[m(`h1`,{class:`component-demo-view__title`},`Split 分割面板`),m(`p`,{class:`component-demo-view__description`},` 用于将容器分割为多个可调整大小的面板，支持水平和垂直方向，分割线悬停时显示 `)],-1),m(`section`,j,[r[2]||=m(`h2`,{class:`component-demo-view__section-title`},`水平分割`,-1),r[3]||=m(`p`,{class:`component-demo-view__section-desc`},` 默认方向，将容器分为左右两个面板，悬停分割线可拖动调整比例 `,-1),m(`div`,M,[x(t(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:S(()=>[x(t(k),{size:30},{default:S(()=>[...r[0]||=[m(`div`,{class:`split-panel-content split-panel-content--left`},` 左侧面板 (30%) `,-1)]]),_:1}),x(t(k),{size:70},{default:S(()=>[...r[1]||=[m(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 (70%) `,-1)]]),_:1})]),_:1})]),m(`div`,N,[x(e,{code:Q,language:`vue`,title:`示例代码`})])]),m(`section`,P,[r[6]||=m(`h2`,{class:`component-demo-view__section-title`},`垂直分割`,-1),r[7]||=m(`p`,{class:`component-demo-view__section-desc`},` 通过设置 direction="vertical"，将容器分为上下两个面板 `,-1),m(`div`,F,[x(t(O),{direction:`vertical`,style:{height:`400px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:S(()=>[x(t(k),{size:40},{default:S(()=>[...r[4]||=[m(`div`,{class:`split-panel-content split-panel-content--top`},` 顶部面板 (40%) `,-1)]]),_:1}),x(t(k),{size:60},{default:S(()=>[...r[5]||=[m(`div`,{class:`split-panel-content split-panel-content--bottom`},` 底部面板 (60%) `,-1)]]),_:1})]),_:1})]),m(`div`,I,[x(e,{code:$,language:`vue`,title:`示例代码`})])]),m(`section`,L,[r[11]||=m(`h2`,{class:`component-demo-view__section-title`},`嵌套使用`,-1),r[12]||=m(`p`,{class:`component-demo-view__section-desc`},` 可以嵌套使用 Split 组件，实现复杂的布局结构 `,-1),m(`div`,R,[x(t(O),{style:{height:`400px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:S(()=>[x(t(k),{size:20},{default:S(()=>[...r[8]||=[m(`div`,{class:`split-panel-content split-panel-content--nav`},` 导航栏 (20%) `,-1)]]),_:1}),x(t(k),{size:80},{default:S(()=>[x(t(O),{direction:`vertical`,style:{height:`100%`}},{default:S(()=>[x(t(k),{size:70},{default:S(()=>[...r[9]||=[m(`div`,{class:`split-panel-content split-panel-content--main`},` 主内容区 (70%) `,-1)]]),_:1}),x(t(k),{size:30},{default:S(()=>[...r[10]||=[m(`div`,{class:`split-panel-content split-panel-content--footer`},` 底部区域 (30%) `,-1)]]),_:1})]),_:1})]),_:1})]),_:1})]),m(`div`,z,[x(e,{code:ee,language:`vue`,title:`示例代码`})])]),m(`section`,B,[r[15]||=m(`h2`,{class:`component-demo-view__section-title`},`限制尺寸范围`,-1),r[16]||=m(`p`,{class:`component-demo-view__section-desc`},` 通过 min 和 max 属性限制面板的最小和最大尺寸（像素） `,-1),m(`div`,V,[x(t(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:S(()=>[x(t(k),{size:30,min:100,max:400},{default:S(()=>[...r[13]||=[m(`div`,{class:`split-panel-content split-panel-content--left`},[f(` 左侧面板`),m(`br`),f(` 最小: 100px`),m(`br`),f(` 最大: 400px `)],-1)]]),_:1}),x(t(k),{size:70},{default:S(()=>[...r[14]||=[m(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 `,-1)]]),_:1})]),_:1})]),m(`div`,H,[x(e,{code:te,language:`vue`,title:`示例代码`})])]),m(`section`,U,[r[19]||=m(`h2`,{class:`component-demo-view__section-title`},`可折叠面板`,-1),r[20]||=m(`p`,{class:`component-demo-view__section-desc`},` 设置 collapsible 属性使面板可折叠，双击分割线或点击折叠按钮可切换折叠状态 `,-1),m(`div`,W,[x(t(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:S(()=>[x(t(k),{size:25,collapsible:``},{default:S(()=>[...r[17]||=[m(`div`,{class:`split-panel-content split-panel-content--left`},[f(` 可折叠面板`),m(`br`),f(` 双击分割线或`),m(`br`),f(` 悬停点击按钮折叠 `)],-1)]]),_:1}),x(t(k),{size:75},{default:S(()=>[...r[18]||=[m(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 `,-1)]]),_:1})]),_:1})]),m(`div`,G,[x(e,{code:ne,language:`vue`,title:`示例代码`})])]),m(`section`,K,[r[24]||=m(`h2`,{class:`component-demo-view__section-title`},`三栏布局`,-1),r[25]||=m(`p`,{class:`component-demo-view__section-desc`},` 使用多个面板实现三栏或多栏布局 `,-1),m(`div`,q,[x(t(O),{style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:S(()=>[x(t(k),{size:20,min:150},{default:S(()=>[...r[21]||=[m(`div`,{class:`split-panel-content split-panel-content--nav`},` 左侧栏 (20%) `,-1)]]),_:1}),x(t(k),{size:60,min:300},{default:S(()=>[...r[22]||=[m(`div`,{class:`split-panel-content split-panel-content--main`},` 中间内容区 (60%) `,-1)]]),_:1}),x(t(k),{size:20,min:150,collapsible:``},{default:S(()=>[...r[23]||=[m(`div`,{class:`split-panel-content split-panel-content--aside`},[f(` 右侧栏 (20%)`),m(`br`),f(` 可折叠 `)],-1)]]),_:1})]),_:1})]),m(`div`,J,[x(e,{code:re,language:`vue`,title:`示例代码`})])]),m(`section`,Y,[r[28]||=m(`h2`,{class:`component-demo-view__section-title`},`禁用状态`,-1),r[29]||=m(`p`,{class:`component-demo-view__section-desc`},` 设置 disabled 属性禁用拖动功能 `,-1),m(`div`,X,[x(t(O),{disabled:``,style:{height:`300px`,border:`1px solid var(--color-border-light)`,"border-radius":`var(--radius-base)`}},{default:S(()=>[x(t(k),{size:40},{default:S(()=>[...r[26]||=[m(`div`,{class:`split-panel-content split-panel-content--left`},[f(` 左侧面板 (40%)`),m(`br`),f(` 拖动已禁用 `)],-1)]]),_:1}),x(t(k),{size:60},{default:S(()=>[...r[27]||=[m(`div`,{class:`split-panel-content split-panel-content--right`},` 右侧面板 (60%) `,-1)]]),_:1})]),_:1})]),m(`div`,Z,[x(e,{code:ie,language:`vue`,title:`示例代码`})])])]))}}),[[`__scopeId`,`data-v-9a4df994`]]);export{ae as default};
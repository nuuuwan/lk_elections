"use strict";(self.webpackChunklk_elections=self.webpackChunklk_elections||[]).push([[31],{1031:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var r=n(5043),a=n(8047),s=n(8037),l=n(6446),o=n(7392),u=n(6723),c=n(579);function i(e){let{headerKeys:t,setSortKey:n}=e;return(0,c.jsx)("tr",{children:t.map((function(e,t){return(0,c.jsx)("th",{children:(0,c.jsxs)(l.A,{alignItems:"center",children:[s.A4.formatCellValue(e,!1),(0,c.jsx)(o.A,{onClick:function(){n(e)},children:(0,c.jsx)(u.A.SortVertical,{sx:u.A.Style.Sort})})]})},"header-"+t)}))})}function d(e){let{headerKeys:t,setSortKeyInner:n}=e;return(0,c.jsx)("thead",{children:(0,c.jsx)(i,{headerKeys:t,setSortKey:n})})}function h(e){let{headerKey:t,value:n}=e;return(0,c.jsx)("td",{children:s.A4.formatCellValue(n)})}function f(e){let{headerKeys:t,data:n,iRow:r}=e;return(0,c.jsx)("tr",{children:t.map((function(e,t){const r=n[e];return(0,c.jsx)(h,{headerKey:e,value:r},"data-cell-"+t)}))})}function x(e){let{sortedDataList:t,headerKeys:n,showExpanded:r}=e;return r||(t=t.slice(0,a.bQ.DEFAULT_DISPLAY_MAX_ROWS)),(0,c.jsx)("tbody",{children:t.map((function(e,t){return(0,c.jsx)(f,{iRow:t,headerKeys:n,data:e},"data-row-"+t)}))})}function j(e){let{headerKeys:t,footerData:n}=e;return(0,c.jsx)("tr",{children:t.map(((e,t)=>(0,c.jsx)("th",{className:"th-footer",children:s.A4.formatCellValue(n[e])},"footer-"+t)))})}function y(e){let{headerKeys:t,footerData:n}=e;return n?(0,c.jsx)("tfoot",{children:(0,c.jsx)(j,{headerKeys:t,footerData:n})}):null}var K=n(5865);function A(e){let{sortedDataList:t,headerKeys:n,footerData:s,setSortKeyInner:i}=e;const[h,f]=r.useState(!1),j=h?u.A.ExpandCollapse:u.A.ExpandExpand,A=t.length,p=h?"Collapse":"Expand ".concat(A," rows"),S=A>a.bQ.DEFAULT_DISPLAY_MAX_ROWS;return(0,c.jsxs)(l.A,{children:[(0,c.jsxs)("table",{children:[(0,c.jsx)(d,{headerKeys:n,setSortKeyInner:i}),(0,c.jsx)(x,{sortedDataList:t,headerKeys:n,showExpanded:h}),(0,c.jsx)(y,{headerKeys:n,footerData:s})]}),S?(0,c.jsxs)(l.A,{children:[(0,c.jsx)(o.A,{onClick:function(){f(!h)},children:(0,c.jsx)(j,{})}),(0,c.jsx)(K.A,{variant:"caption",children:p})]}):null]})}function p(e){let{dataList:t,footerData:n}=e;const[l,o]=(0,r.useState)(null),[u,i]=(0,r.useState)(!0),d=function(e,t,n){const r=e.filter((e=>null!==e));return 0===r.length?null:t?r.sort((function(e,r){return a.fH.cmp(r[t],e[t],n)})):r}(t,l,u);if(!d)return null;const h=function(e){return e.reduce((function(e,t){return Object.keys(t).reduce((function(e,t){return e.includes(t)||e.push(t),e}),e)}),[]).filter((function(t){return e.map((function(e){if(!e)return null;const n=e[t];return s.A4.formatCellValue(n)})).filter((e=>!!e&&"-"!==e&&"~"!==e)).length>0}))}(d);return(0,c.jsx)(A,{sortedDataList:d,headerKeys:h,footerData:n,setSortKeyInner:function(e){l===e?i(!u):(o(e),i(!0))}})}}}]);
//# sourceMappingURL=31.74cfbd2e.chunk.js.map
"use strict";(self.webpackChunklk_elections=self.webpackChunklk_elections||[]).push([[31],{1031:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var r=n(5043),a=n(7885),s=n(1469),o=n(6446),l=n(7392),d=n(6723),u=n(579);function c(e){let{headerKeys:t,setSortKey:n}=e;return(0,u.jsx)("tr",{children:t.map((function(e,t){return(0,u.jsx)("th",{children:(0,u.jsxs)(o.A,{alignItems:"center",children:[(0,u.jsx)(l.A,{onClick:function(){n(e)},children:(0,u.jsx)(d.A.SortVertical,{sx:d.A.Style.Sort})}),s.A4.formatCellValue(e,!1)]})},"header-"+t)}))})}function i(e){let{headerKeys:t,setSortKeyInner:n}=e;return(0,u.jsx)("thead",{children:(0,u.jsx)(c,{headerKeys:t,setSortKey:n})})}function h(e){let{headerKey:t,value:n}=e;return(0,u.jsx)("td",{children:s.A4.formatCellValue(n)})}function f(e){let{headerKeys:t,data:n,iRow:r}=e;return(0,u.jsx)("tr",{children:t.map((function(e,t){const r=n[e];return(0,u.jsx)(h,{headerKey:e,value:r},"data-cell-"+t)}))})}function x(e){let{sortedDataList:t,headerKeys:n,showExpanded:r}=e;return r||(t=t.slice(0,a.bQ.MAX_ROWS)),(0,u.jsx)("tbody",{children:t.map((function(e,t){return(0,u.jsx)(f,{iRow:t,headerKeys:n,data:e},"data-row-"+t)}))})}function y(e){let{headerKeys:t,footerData:n}=e;return(0,u.jsx)("tr",{children:t.map(((e,t)=>(0,u.jsx)("th",{className:"th-footer",children:s.A4.formatCellValue(n[e])},"footer-"+t)))})}function j(e){let{headerKeys:t,footerData:n}=e;return n?(0,u.jsx)("tfoot",{children:(0,u.jsx)(y,{headerKeys:t,footerData:n})}):null}var K=n(5865);function p(e){let{needsExpand:t,onClickExpand:n,Icon:r,label:a}=e;return t?(0,u.jsxs)(o.A,{children:[(0,u.jsx)(l.A,{onClick:n,children:(0,u.jsx)(r,{})}),(0,u.jsx)(K.A,{variant:"caption",children:a})]}):null}function A(e){let{sortedDataList:t,headerKeys:n,footerData:r,setSortKeyInner:a,showExpanded:s}=e;return(0,u.jsxs)("table",{children:[(0,u.jsx)(i,{headerKeys:n,setSortKeyInner:a}),(0,u.jsx)(x,{sortedDataList:t,headerKeys:n,showExpanded:s}),(0,u.jsx)(j,{headerKeys:n,footerData:r})]})}function S(e){let{sortedDataList:t,headerKeys:n,footerData:s,setSortKeyInner:l}=e;const[c,i]=r.useState(!1),h=c?d.A.ExpandCollapse:d.A.ExpandExpand,f=t.length,x=c?"Collapse":"Expand ".concat(f," rows"),y=f>a.bQ.MAX_ROWS;return(0,u.jsxs)(o.A,{children:[A({sortedDataList:t,headerKeys:n,footerData:s,setSortKeyInner:l,showExpanded:c}),p({needsExpand:y,onClickExpand:function(){i(!c)},Icon:h,label:x})]})}function D(e){let{dataList:t,footerData:n}=e;const[o,l]=(0,r.useState)(null),[d,c]=(0,r.useState)(!0),i=function(e,t,n){const r=e.filter((e=>null!==e));return 0===r.length?null:t?r.sort((function(e,r){return a.fH.cmp(r[t],e[t],n)})):r}(t,o,d);if(!i)return null;const h=function(e){return e.reduce((function(e,t){return Object.keys(t).reduce((function(e,t){return e.includes(t)||e.push(t),e}),e)}),[]).filter((function(t){return e.map((function(e){if(!e)return null;const n=e[t];return s.A4.formatCellValue(n)})).filter((e=>!!e&&"-"!==e&&"~"!==e)).length>0}))}(i);return(0,u.jsx)(S,{sortedDataList:i,headerKeys:h,footerData:n,setSortKeyInner:function(e){o===e?c(!d):(l(e),c(!0))}})}}}]);
//# sourceMappingURL=31.3c917f64.chunk.js.map
"use strict";(self.webpackChunklk_elections=self.webpackChunklk_elections||[]).push([[765],{8765:(e,r,n)=>{n.r(r),n.d(r,{default:()=>D});var a=n(5043),t=n(579);function l(e){let{children:r}=e;return(0,t.jsx)("th",{className:"hidden",children:r})}class s{}function c(e){let{idx:r,showExpanded:n}=e,a=Object.keys(Object.values(r)[0]);return!n&&a.length>s.DEFAULT_DISPLAY_MAX_COLS&&(a=a.slice(0,s.DEFAULT_DISPLAY_MAX_COLS)),(0,t.jsxs)("tr",{children:[(0,t.jsx)(l,{}),(0,t.jsx)(l,{}),a.map((function(e,r){return(0,t.jsx)("th",{className:"td-row-num",children:(n=r+1,String.fromCharCode(64+n))},"header-"+r);var n}))]})}s.DEFAULT_DISPLAY_MAX_ROWS=10,s.DEFAULT_DISPLAY_MAX_COLS=5;var o=n(8298),d=n(7392);function i(e){let{handleToggleXY:r}=e;return(0,t.jsx)(d.A,{onClick:r,children:(0,t.jsx)(o.A,{sx:{fontSize:"80%"}})})}var S=n(5084),x=n(6446),h=n(9932);function u(e){let{xScalar:r,iX:n,setSortXScalar:a,scalarToOriginal:l}=e;const s=l[r];return(0,t.jsx)("th",{children:(0,t.jsxs)(x.A,{alignItems:"center",children:[h.A4.formatCellValue(s,!1),(0,t.jsx)(d.A,{onClick:function(){a(r)},children:(0,t.jsx)(S.A,{sx:{fontSize:"80%"}})})]})})}function A(e){let{idx:r,handleToggleXY:n,setSortXScalar:a,scalarToOriginal:c,showExpanded:o}=e,d=Object.keys(Object.values(r)[0]);return!o&&d.length>s.DEFAULT_DISPLAY_MAX_COLS&&(d=d.slice(0,s.DEFAULT_DISPLAY_MAX_COLS)),(0,t.jsxs)("tr",{children:[(0,t.jsx)(l,{}),(0,t.jsx)(l,{children:(0,t.jsx)(i,{handleToggleXY:n})}),d.map((function(e,r){return(0,t.jsx)(u,{xScalar:e,iX:r,setSortXScalar:a,scalarToOriginal:c},"header-"+r)}))]})}function j(e){let{idx:r,handleToggleXY:n,setSortXScalar:a,scalarToOriginal:l,showExpanded:s}=e;return(0,t.jsxs)("thead",{children:[(0,t.jsx)(c,{idx:r,showExpanded:s}),(0,t.jsx)(A,{idx:r,handleToggleXY:n,setSortXScalar:a,scalarToOriginal:l,showExpanded:s})]})}function O(e){let{iY:r}=e;return(0,t.jsx)("td",{className:"td-row-num",children:r+1})}var f=n(6081);function g(e){let{setSortYScalarAndOrderInner:r,y:n}=e;return(0,t.jsx)("th",{children:(0,t.jsxs)(x.A,{alignItems:"center",children:[h.A4.formatCellValue(n),(0,t.jsx)(d.A,{onClick:r,children:(0,t.jsx)(f.A,{sx:{fontSize:"80%"}})})]})})}function Y(e){let{z:r}=e;return(0,t.jsx)("td",{children:h.A4.formatCellValue(r)})}function L(e){let{setSortYScalarAndOrder:r,yScalar:n,scalarToOriginal:a,iY:l,firstYXScalarList:c,xScalarToZ:o,showExpanded:d}=e;return!d&&c.length>=s.DEFAULT_DISPLAY_MAX_COLS&&(c=c.slice(0,s.DEFAULT_DISPLAY_MAX_COLS)),(0,t.jsxs)("tr",{children:[(0,t.jsx)(O,{iY:l}),(0,t.jsx)(g,{setSortYScalarAndOrderInner:function(){r(n)},y:a[n]}),c.map((function(e,r){const n=o[e];return(0,t.jsx)(Y,{z:n},"cell-"+r+"-"+l)}))]})}function X(e){let{idx:r,setSortYScalarAndOrder:n,scalarToOriginal:a,showExpanded:l}=e;const c=Object.keys(Object.values(r)[0]);let o=Object.entries(r);const d=o.length;return!l&&d>s.DEFAULT_DISPLAY_MAX_ROWS&&(o=o.slice(0,s.DEFAULT_DISPLAY_MAX_ROWS)),(0,t.jsxs)("tbody",{children:[o.map((function(e,r){let[s,o]=e;return(0,t.jsx)(L,{setSortYScalarAndOrder:n,yScalar:s,scalarToOriginal:a,iY:r,firstYXScalarList:c,xScalarToZ:o,showExpanded:l},"row-"+r)})),l?null:(0,t.jsx)("tr",{children:(0,t.jsx)("td",{className:"no-expand-info",children:"..."})})]})}var v=n(5865),_=n(995),T=n(2130);function p(e){let{idx:r,handleToggleXY:n,setSortXScalarAndOrder:l,setSortYScalarAndOrder:c,scalarToOriginal:o}=e;const[i,S]=a.useState(!1),h=i?_.A:T.A,u=Object.keys(r).length,A=Object.keys(Object.values(r)[0]).length,O=u>s.DEFAULT_DISPLAY_MAX_ROWS||A>s.DEFAULT_DISPLAY_MAX_COLS,f=i?"Collapse":"Expand all (".concat(u," x ").concat(A,") cells");return(0,t.jsxs)(x.A,{children:[O?(0,t.jsxs)(x.A,{children:[(0,t.jsx)(d.A,{onClick:function(){S(!i)},children:(0,t.jsx)(h,{})}),(0,t.jsx)(v.A,{variant:"caption",children:f})]}):null,(0,t.jsxs)("table",{children:[(0,t.jsx)(j,{idx:r,handleToggleXY:n,setSortXScalar:l,scalarToOriginal:o,showExpanded:i}),(0,t.jsx)(X,{idx:r,setSortYScalarAndOrder:c,scalarToOriginal:o,showExpanded:i})]})]})}function C(e,r){let[n,a]=e,[t,l]=r;return function(e){n===e?l(!t):(a(e),l(!1))}}function D(e){let{sparseMatrix:r,zKey:n,xKey:l,yKey:s}=e;const{xKeyInner:c,yKeyInner:o,handleToggleXY:d}=function(e,r){const[n,t]=(0,a.useState)(e),[l,s]=(0,a.useState)(r);return{xKeyInner:n,yKeyInner:l,handleToggleXY:function(){t(l),s(n)}}}(l,s),{sortXScalar:i,sortXReverse:S,sortYScalar:x,sortYReverse:h,setSortXScalarAndOrder:u,setSortYScalarAndOrder:A}=function(){const[e,r]=(0,a.useState)(null),[n,t]=(0,a.useState)(null),[l,s]=(0,a.useState)(!1),[c,o]=(0,a.useState)(!1);return{sortXScalar:e,sortXReverse:l,sortYScalar:n,sortYReverse:c,setSortXScalarAndOrder:C([e,r],[l,s]),setSortYScalarAndOrder:C([n,t],[c,o])}}(),j=r.getIdxOrdered([c,o,n],[i,S],[x,h]);return(0,t.jsx)(p,{idx:j,handleToggleXY:d,setSortXScalarAndOrder:u,setSortYScalarAndOrder:A,scalarToOriginal:r.scalarToOriginal})}},995:(e,r,n)=>{var a=n(4994);r.A=void 0;var t=a(n(39)),l=n(579);r.A=(0,t.default)((0,l.jsx)("path",{d:"M22 3.41 16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59z"}),"CloseFullscreen")},2130:(e,r,n)=>{var a=n(4994);r.A=void 0;var t=a(n(39)),l=n(579);r.A=(0,t.default)((0,l.jsx)("path",{d:"M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z"}),"OpenInFull")},8298:(e,r,n)=>{var a=n(4994);r.A=void 0;var t=a(n(39)),l=n(579);r.A=(0,t.default)((0,l.jsx)("path",{d:"M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81z"}),"ScreenRotation")},6081:(e,r,n)=>{var a=n(4994);r.A=void 0;var t=a(n(39)),l=n(579);r.A=(0,t.default)((0,l.jsx)("path",{d:"M6.99 11 3 15l3.99 4v-3H14v-2H6.99zM21 9l-3.99-4v3H10v2h7.01v3z"}),"SwapHoriz")},5084:(e,r,n)=>{var a=n(4994);r.A=void 0;var t=a(n(39)),l=n(579);r.A=(0,t.default)((0,l.jsx)("path",{d:"M16 17.01V10h-2v7.01h-3L15 21l4-3.99zM9 3 5 6.99h3V14h2V6.99h3z"}),"SwapVert")}}]);
//# sourceMappingURL=765.03482f2f.chunk.js.map
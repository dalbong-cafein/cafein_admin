"use strict";(self.webpackChunkcafein_admin=self.webpackChunkcafein_admin||[]).push([[755],{8755:function(n,e,t){t.r(e),t.d(e,{default:function(){return D}});var i,r,s=t(168),o=t(885),d=t(2791),c=t(6951),a=t(5579),l=t(373),h=t(6031),u=t(5627),x=t(660),f=t(970),p=t(7834),m=t(184),v=h.ZP.div(i||(i=(0,s.Z)(["\n  display: flex;\n  color: #e3e3e3;\n  font-size: 14px;\n  // flex: 1;\n  height: calc(65vh / 9);\n  cursor: pointer;\n  border-bottom: 1px solid #515151;\n  & > div {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    line-height: 18px;\n    box-sizing: border-box;\n    flex: 1;\n    border-right: 1px solid #515151;\n  }\n  & > div:nth-child(3) {\n    flex: 2;\n  }\n  & > div:last-child {\n    border-right: none;\n    border-bottom: none;\n    & > svg {\n      path {\n        fill: ",";\n      }\n    }\n  }\n"])),(function(n){return n.hasMemoId?"#E3E3E3":"#646464"})),g=function(n){var e=n.data,t=n.setAlert,i=n.setReportId,r=n.setSelectItem,s=n.setMemoModal,o=n.setMemoItem,d=n.page,c=n.alert;return(0,m.jsx)(l.up,{children:e&&e.slice(9*(d-1),9*(d-1)+10).map((function(n,e){return(0,m.jsxs)(v,{children:[(0,m.jsx)("div",{children:String(n.couponId).padStart(6,"0")}),(0,m.jsx)("div",{children:n.brandName}),(0,m.jsx)("div",{children:n.itemName}),(0,m.jsx)("div",{children:String(n.memberId).padStart(6,"0")}),(0,m.jsx)("div",{children:n.phone||"-"}),(0,m.jsx)("div",{children:String(n.regDateTime).split("T")[0]}),(0,m.jsx)("div",{children:n.processingDateTime?String(n.processingDateTime).split("T")[0]:"-"}),(0,m.jsx)("div",{children:(0,m.jsx)(l.un,{content:n.status,onClick:function(){var e;e=n.couponId,n.state||(t(!c),i(e))},children:null!==n.processingDateTime?"\uc644\ub8cc":"\ubbf8\uc644\ub8cc"})}),(0,m.jsx)("div",{children:(0,m.jsx)(p.r,{onClick:function(){r(n),o(n),s(!0)}})})]},e)}))})},j=t(2467),b=t(8573),Z=t(7725),S=h.ZP.div(r||(r=(0,s.Z)(["\n  font-size: 14px;\n  display: flex;\n  width: 100%;\n  color: #8b8b8b;\n  text-align: center;\n  line-height: 42px;\n  border-bottom: 1px solid #515151;\n  & > div {\n    flex: 1;\n    border-right: 1px solid #515151;\n  }\n  & > div:nth-child(3) {\n    flex: 2;\n  }\n\n  & > div:last-child {\n    border-right: none;\n  }\n"]))),D=function(){var n=(0,d.useState)(""),e=(0,o.Z)(n,2),t=e[0],i=e[1],r=(0,d.useState)([]),s=(0,o.Z)(r,2),h=s[0],p=s[1],v=(0,d.useState)(null),D=(0,o.Z)(v,2),T=D[0],I=D[1],k=(0,d.useState)(!1),M=(0,o.Z)(k,2),w=M[0],y=M[1],A=(0,d.useState)(null),C=(0,o.Z)(A,2),R=C[0],E=C[1],L=(0,d.useState)(!1),P=(0,o.Z)(L,2),z=P[0],N=P[1],F=(0,a.Z)(["\ubd84\ub958","\ud68c\uc6d0 \ubc88\ud638","\ud578\ub4dc\ud3f0"]),_=(0,o.Z)(F,4),Y=_[0],q=_[1],B=_[2],G=_[3],H=(0,c.Z)(),J=(0,o.Z)(H,8),K=J[0],O=J[1],Q=J[2],U=J[3],V=J[4],W=J[5],X=J[6],$=J[7],nn=function(){(0,x.Yv)(Y,t,K,O).then((function(n){p(n.data.data.couponResDtoList.dtoList),V(n.data.data.couponCnt)})).catch((function(n){return console.log(n)}))};return(0,d.useEffect)((function(){nn()}),[K,O]),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(Z.Z,{menu:"marketing",menu1:"marketing",menu2:"event",Tmenu1:"\ub9c8\ucf00\ud305 \uc11c\ube44\uc2a4",Tmenu2:"\uc774\ubca4\ud2b8",onAsc:$,onDesc:X,sort:O,btn:!0}),(0,m.jsx)(b.Z,{searchType:Y,setSearchType:q,searchArr:B,setSearchArr:G,sort:O,count:U,page:K,item:Q,setPage:W,searchData:nn,search:t,setSearch:i,onDesc:X,onResetData:function(){(0,x.Pw)(K,O).then((function(n){V(n.data.data.couponCnt),p(n.data.data.couponResDtoList.dtoList)})).catch((function(n){return console.log(n)}))}}),(0,m.jsxs)(l.im,{isNull:0===h.length,children:[(0,m.jsxs)(S,{children:[(0,m.jsx)("div",{children:"\ubd84\ub958"}),(0,m.jsx)("div",{children:"\ube0c\ub79c\ub4dc"}),(0,m.jsx)("div",{children:"\uc0c1\ud488\uba85"}),(0,m.jsx)("div",{children:"\ud68c\uc6d0\ubc88\ud638"}),(0,m.jsx)("div",{children:"\ud578\ub4dc\ud3f0"}),(0,m.jsx)("div",{children:"\uc2e0\uccad\uc77c"}),(0,m.jsx)("div",{children:"\ucc98\ub9ac\uc77c"}),(0,m.jsx)("div",{children:"\uc0c1\ud0dc"}),(0,m.jsx)("div",{children:"\uba54\ubaa8"})]}),(0,m.jsx)(g,{data:h,setModalMemo:N,setMemoItem:E,setAlert:y,alert:w,setReportId:I,page:K})]}),w&&(0,m.jsx)(f.Z,{text:"\ub9c8\ucf00\ud305 \uc11c\ube44\uc2a4 \uc0c1\ud0dc \ubcc0\uacbd",text2:"'\uc644\ub8cc'",text3:"\ub85c \uc0c1\ud0dc\ub97c \ubcc0\uacbd\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",setAlert:y,func:function(n){(0,x.ex)(n).then((function(n){return window.location.reload()})).catch((function(n){return console.log(n)}))},forFunc:T}),z&&(0,m.jsx)(j.Z,{item:R,setModal:N}),0===h.length&&(0,m.jsx)(u.Z,{text:"\ub9c8\ucf00\ud305 \uc11c\ube44\uc2a4"})]})}}}]);
//# sourceMappingURL=755.6f80a69b.chunk.js.map
"use strict";(self.webpackChunkcafein_admin=self.webpackChunkcafein_admin||[]).push([[307],{8831:function(n,t,e){e.r(t);var r,i,o=e(168),c=e(1413),s=e(885),a=e(6031),u=e(2791),d=e(373),l=e(5151),f=e(7725),x=e(7426),h=e(970),p=e(131),g=e(4271),b=e(2014),m=e(1077),v=e(7094),Z=e(4209),j=e(8737),w=e(660),y=e(6951),S=e(2956),k=e(184),C=a.ZP.div(r||(r=(0,o.Z)(["\n  font-size: 14px;\n  display: flex;\n  width: 100%;\n  color: #8b8b8b;\n  text-align: center;\n  line-height: 42px;\n  border-bottom: 1px solid #515151;\n  & > div {\n    flex: 0.5;\n    border-right: 1px solid #515151;\n  }\n  & div:nth-child(2) {\n    flex: 2.5;\n  }\n\n  & > div:last-child {\n    flex: 1;\n    border-right: none;\n  }\n"]))),A=a.ZP.div(i||(i=(0,o.Z)(["\n  display: flex;\n  color: #e3e3e3;\n  height: calc(65vh / 9);\n  cursor: pointer;\n  border-bottom: 1px solid #515151;\n  font-size: 14px;\n  & > div {\n    // padding: 0 0 0 16px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: left;\n    line-height: 18px;\n    box-sizing: border-box;\n    flex: 0.5;\n    border-right: 1px solid #515151;\n  }\n\n  & div:nth-child(2) {\n    flex: 2.5;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: start;\n    & > p {\n      margin: 0 0 0 16px;\n    }\n  }\n\n  & > div:last-child {\n    flex: 1;\n    border-right: none;\n    border-bottom: none;\n  }\n"])));t.default=function(){var n=(0,u.useState)([]),t=(0,s.Z)(n,2),e=t[0],r=t[1],i=(0,u.useState)([]),o=(0,s.Z)(i,2),a=o[0],D=o[1],F=(0,u.useState)(""),P=(0,s.Z)(F,2),T=P[0],B=P[1],I=(0,Z.FV)(j.T),J=(0,s.Z)(I,2),L=J[0],z=J[1],R=(0,u.useState)(!1),M=(0,s.Z)(R,2),W=M[0],_=M[1],q=(0,y.Z)(10),E=(0,s.Z)(q,8),H=E[0],N=E[1],V=E[2],G=E[3],K=E[4],O=E[5],Q=E[6],U=E[7],X=(0,u.useState)(!1),Y=(0,s.Z)(X,2),$=Y[0],nn=Y[1],tn=(0,u.useState)(!1),en=(0,s.Z)(tn,2),rn=en[0],on=en[1],cn=(0,u.useState)(!1),sn=(0,s.Z)(cn,2),an=sn[0],un=sn[1];return(0,u.useEffect)((function(){var n=(0,c.Z)({},L);n.boardCategoryId=1,z(n),(0,v.J5)(H,N,T).then((function(n){K(n.data.data.boardCnt),r(n.data.data.boardResDtoList.dtoList)}))}),[N,H]),(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(f.Z,{menu:"notice",menu1:"notice",menu2:"qna",Tmenu1:"\uacf5\uc9c0\uc0ac\ud56d",Tmenu2:"\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38"}),(0,k.jsxs)(l.W2,{children:[(0,k.jsxs)("div",{children:[(0,k.jsx)(b.Z,{sort:N,count:G,page:H,item:V,onAsc:U,onDesc:Q,setPage:O,search:T,setSearch:B,searchData:function(){(0,v.J5)(T,H,N).then((function(n){K(n.data.data.boardCnt),r(n.data.data.boardResDtoList.dtoList)})).catch((function(n){return console.log(n)}))},nodrop:!0}),(0,k.jsxs)(d.im,{isNull:0===e.length,children:[(0,k.jsxs)(C,{children:[(0,k.jsx)("div",{children:"\ubd84\ub958"}),(0,k.jsx)("div",{children:"\uc81c\ubaa9"}),(0,k.jsx)("div",{children:"\ub4f1\ub85d\uc77c"})]}),(0,k.jsx)(d.up,{children:e&&e.map((function(n,t){return(0,k.jsxs)(A,{onClick:function(){un(!0),D(n)},children:[(0,k.jsx)("div",{children:String(n.boardId).padStart(6,"0")}),(0,k.jsxs)("div",{children:[(0,k.jsx)("p",{style:{fontWeight:"bold",marginBottom:"5px"},children:n.title}),(0,k.jsx)("p",{children:n.content.length>30?"".concat(n.content.slice(0,30),"..."):n.content})]}),(0,k.jsx)("div",{children:String(n.regDateTime).split("T")[0]})]},t)}))})]}),0==e.length&&(0,k.jsx)(m.Z,{text:"\uacf5\uc9c0"})]}),(0,k.jsx)(S.Z,{register:L,setRegister:z,setPreview:_,setAlert:nn})]}),$&&(0,k.jsx)(g.Z,{setAlert:nn,text:"\uacf5\uc9c0\uc0ac\ud56d \ub4f1\ub85d",subtext:"\uac8c\uc2dc\ubb3c\uc744 \ub4f1\ub85d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",func:function(n){(0,w.p7)(n).then((function(n){nn(!1),window.location.reload()})).catch((function(n){return console.log(n)}))},forFunc:L}),W&&(0,k.jsx)(x.Z,{item:L,setModal:_,file:L.imageFiles,menu:"notice"}),an&&(0,k.jsx)(p.Z,{selectItem:a,setModal:un,menu:"notice",setAlert:on}),rn&&(0,k.jsx)(h.Z,{text:"\uacf5\uc9c0\uc0ac\ud56d \uc0ad\uc81c",text1:"\uacf5\uc9c0\uc0ac\ud56d\uc744 ",text2:"\uc0ad\uc81c",text3:"\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",setAlert:on,func:function(){(0,w.oP)(a.boardId).then((function(n){window.location.reload()})).catch((function(n){return console.log(n)}))},forFunc:null})]})}},7094:function(n,t,e){e.d(t,{H1:function(){return a},J3:function(){return u},J5:function(){return s}});var r=e(5861),i=e(7757),o=e.n(i),c=e(7132),s=function(){var n=(0,r.Z)(o().mark((function n(t,e,r){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.B.get("/boards?page=".concat(t,"&sort=").concat(e).concat(r&&"&keyword=".concat(r)));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(t,e,r){return n.apply(this,arguments)}}(),a=function(){var n=(0,r.Z)(o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.B.get("/register-data");case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),u=function(){var n=(0,r.Z)(o().mark((function n(){return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.B.get("/coupons/limit");case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()}}]);
//# sourceMappingURL=307.59ef3376.chunk.js.map
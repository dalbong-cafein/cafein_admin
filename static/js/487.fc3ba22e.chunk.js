"use strict";(self.webpackChunkcafein_admin=self.webpackChunkcafein_admin||[]).push([[487],{487:function(n,e,t){t.r(e);var i,o,r=t(168),l=t(1413),s=t(885),d=t(6031),a=t(2791),c=t(373),x=t(5151),h=t(7725),u=t(8737),f=t(660),p=t(4209),g=t(4271),m=t(5627),b=t(7426),v=t(970),j=t(131),Z=t(6951),w=t(8573),S=t(2956),A=t(184),y=d.ZP.div(i||(i=(0,r.Z)(["\n  font-size: 14px;\n  display: flex;\n  width: 100%;\n  color: #8b8b8b;\n  text-align: center;\n  line-height: 42px;\n  border-bottom: 1px solid #515151;\n  & > div {\n    flex: 0.5;\n    border-right: 1px solid #515151;\n  }\n  & div:nth-child(2) {\n    flex: 2.5;\n  }\n\n  & > div:last-child {\n    flex: 1;\n    border-right: none;\n  }\n"]))),C=d.ZP.div(o||(o=(0,r.Z)(["\n  display: flex;\n  color: #e3e3e3;\n  height: calc(65vh / 9);\n  cursor: pointer;\n  font-size: 14px;\n  border-bottom: 1px solid #515151;\n  & > div {\n    // padding: 0 0 0 16px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: left;\n    line-height: 18px;\n    box-sizing: border-box;\n    flex: 0.5;\n    border-right: 1px solid #515151;\n  }\n\n  & div:nth-child(2) {\n    flex: 2.5;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: start;\n    & > p {\n      margin: 0 0 0 16px;\n    }\n  }\n\n  & > div:last-child {\n    flex: 1;\n    border-right: none;\n    border-bottom: none;\n  }\n"])));e.default=function(){var n=(0,a.useState)([]),e=(0,s.Z)(n,2),t=e[0],i=e[1],o=(0,a.useState)(""),r=(0,s.Z)(o,2),d=r[0],T=r[1],k=(0,Z.Z)(),D=(0,s.Z)(k,8),F=D[0],P=D[1],Q=D[2],I=D[3],L=D[4],z=D[5],R=D[6],q=D[7],M=(0,a.useState)(!1),O=(0,s.Z)(M,2),W=O[0],$=O[1],_=(0,a.useState)(!1),B=(0,s.Z)(_,2),E=B[0],N=B[1],V=(0,a.useState)(!1),G=(0,s.Z)(V,2),H=G[0],J=G[1],K=(0,a.useState)([]),U=(0,s.Z)(K,2),X=U[0],Y=U[1],nn=(0,a.useState)(!1),en=(0,s.Z)(nn,2),tn=en[0],on=en[1],rn=(0,p.FV)(u.T),ln=(0,s.Z)(rn,2),sn=ln[0],dn=ln[1];return(0,a.useEffect)((function(){var n=(0,l.Z)({},sn);n.boardCategoryId=2,dn(n),(0,f.$Q)(d,F,P).then((function(n){L(n.data.data.boardCnt),i(n.data.data.boardResDtoList.dtoList)}))}),[P,F]),(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(h.Z,{menu:"qna",menu1:"notice",menu2:"qna",Tmenu1:"\uacf5\uc9c0\uc0ac\ud56d",Tmenu2:"\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38",menu3:"report",Tmenu3:"\uc2e0\uace0"}),(0,A.jsxs)(x.W2,{children:[(0,A.jsxs)("div",{children:[(0,A.jsx)(w.Z,{sort:P,count:I,page:F,item:Q,onAsc:q,onDesc:R,setPage:z,search:d,setSearch:T,searchData:function(){(0,f.$Q)(d,F,P).then((function(n){L(n.data.data.boardCnt),i(n.data.data.boardResDtoList.dtoList)})).catch((function(n){return console.log(n)}))},nodrop:!0}),(0,A.jsxs)(c.im,{isNull:0===t.length,children:[(0,A.jsxs)(y,{children:[(0,A.jsx)("div",{children:"\ubd84\ub958"}),(0,A.jsx)("div",{children:"\uc81c\ubaa9"}),(0,A.jsx)("div",{children:"\ub4f1\ub85d\uc77c"})]}),t.map((function(n,e){return(0,A.jsxs)(C,{onClick:function(){N(!0),Y(n)},children:[(0,A.jsx)("div",{children:String(n.boardId).padStart(6,"0")}),(0,A.jsxs)("div",{children:[(0,A.jsx)("p",{style:{fontWeight:"bold",marginBottom:"5px",width:"350px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:n.title}),(0,A.jsx)("p",{style:{width:"350px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"left"},children:n.content})]}),(0,A.jsx)("div",{children:String(n.regDateTime).split("T")[0]})]},e)}))]}),0==t.length&&(0,A.jsx)(m.Z,{text:"QnA"})]}),(0,A.jsx)(S.Z,{register:sn,setRegister:dn,setPreview:on,setAlert:$,title:"\uc0c8 \uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38 \ub4f1\ub85d"})]}),W&&(0,A.jsx)(g.Z,{setAlert:$,text:"\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38 \ub4f1\ub85d",subtext:"\uac8c\uc2dc\ubb3c\uc744 \ub4f1\ub85d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",func:function(n){(0,f.p7)(n).then((function(n){$(!1),window.location.reload()})).catch((function(n){return console.log(n)}))},forFunc:sn}),tn&&(0,A.jsx)(b.Z,{item:sn,setModal:on,file:sn.imageFiles,menu:"QnA"}),E&&(0,A.jsx)(j.Z,{selectItem:X,setModal:N,menu:"QnA",setAlert:J}),H&&(0,A.jsx)(v.Z,{text:"\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38 \uc0ad\uc81c",text1:"\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38\uc744 ",text2:"\uc0ad\uc81c",text3:"\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",setAlert:J,func:function(){(0,f.oP)(X.boardId).then((function(n){window.location.reload()})).catch((function(n){return console.log(n)}))},forFunc:null})]})}}}]);
//# sourceMappingURL=487.fc3ba22e.chunk.js.map
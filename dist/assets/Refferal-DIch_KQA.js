import{r as a,j as e,L as d}from"./index-W38XIxqp.js";const f="/ref.png",u="/refpopbg.png",g="/refshare.png",h="/refcopy.png";function m({showReffPopup:i,onClose:n,buttonRef:t}){const s=a.useRef(null),r="https://t.me/atic_test_bot/aticotestbot?startapp=frndId6364191868",c=()=>{navigator.clipboard.writeText(r).then(()=>{console.log("Referral link copied to clipboard!")},o=>{console.error("Failed to copy referral link",o)})},p=()=>{window.Telegram&&window.Telegram.WebApp?window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(r)}&text=Присоединяйтесь к моему боту!`):navigator.share?navigator.share({title:"Присоединяйтесь к моему боту!",url:r}).catch(o=>{console.error("Ошибка при отправке реферальной ссылки",o)}):(navigator.clipboard.writeText(r),alert("Ссылка скопирована. Поделитесь с друзьями!"))};return a.useEffect(()=>{const o=l=>{s.current&&!s.current.contains(l.target)&&t.current&&!t.current.contains(l.target)&&n()};return document.addEventListener("mousedown",o),()=>{document.removeEventListener("mousedown",o)}},[n,t]),i?e.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{ref:s,style:{position:"relative",display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"52%"},children:[e.jsx("img",{src:u,alt:"Add referral window popup",style:{width:"100%",height:"auto",maxWidth:"300px"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",margin:"33% 34% 14%",flexDirection:"column",position:"absolute"},children:[e.jsx("img",{alt:"refshare button",src:g,style:{height:"50px",width:"100px",cursor:"pointer",paddingBottom:"5%"},onClick:p}),e.jsx("img",{alt:"refcopy button",src:h,style:{height:"45px",width:"100px",cursor:"pointer"},onClick:c})]})]})}):null}function b(){const[i,n]=a.useState(!1),t=a.useRef(null),s=()=>{n(!i)};return e.jsxs("div",{className:"container refferal-bg",children:[e.jsxs("div",{className:"top-buttons",children:[e.jsx("div",{className:"button icon-graduation",children:e.jsx("img",{className:"header-im",src:"./kepka.png",alt:"graduation cap"})}),e.jsx("div",{className:"button icon-wallet",children:e.jsx(d,{to:"/wallet-connect",children:e.jsx("img",{className:"header-im",src:"./wallet.png",alt:"wallet"})})})]}),e.jsx(m,{showReffPopup:i,onClose:()=>n(!1),buttonRef:t}),e.jsx("div",{children:e.jsx("img",{src:f,alt:"open referral popup button",style:{cursor:"pointer",position:"absolute",marginLeft:"40%",height:"50px",bottom:"3%"},onClick:r=>{r.stopPropagation(),s()},ref:t})})]})}export{b as default};

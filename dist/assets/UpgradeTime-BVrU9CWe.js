import{r as n,j as t,a as c}from"./index-DaqbJNew.js";const l="/cloc.gif",u="/time.png";function p(){const[e,i]=n.useState(!1),[o,r]=n.useState({accumulationLevel:0,accumulationDuration:0,farmingLevel:0,farmingPerHour:0}),s=async()=>{i(!0);try{const a=await c.post("/api/v1/farming/accumulation/level",{},{headers:{Authorization:window.Telegram.WebApp.initData||"","Content-Type":"application/json"}});console.log("Storage level increase successful:",a.data),r({accumulationLevel:a.data.data.accumulationLevel,accumulationDuration:a.data.data.accumulationDuration,farmingLevel:a.data.data.farmingLevel,farmingPerHour:a.data.data.farmingPerHour})}catch(a){console.error("Error upgrading storage level:",a)}setTimeout(()=>{i(!1)},5e3)};return t.jsxs(t.Fragment,{children:[t.jsx("img",{src:u,alt:"Static preview",onClick:s,className:`ttime ${e?"fade-out":"fade-in"}`,style:{cursor:"pointer",position:"absolute",marginTop:"20%",height:"430px"}}),t.jsxs("p",{children:["Accumulation Level: ",o.accumulationLevel]}),t.jsxs("p",{children:["Accumulation Duration: ",o.accumulationDuration]}),e&&t.jsx("img",{src:l,alt:"GIF animation",style:{cursor:"pointer",position:"absolute",marginTop:"27%",height:"370px"},className:"ttime fade-in"})]})}export{p as default};

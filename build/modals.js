(()=>{"use strict";var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})}};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);const t=window.wp.i18n,s=window.wp.domReady;var n=e.n(s);const a=window.wp.element,r=window.wp.components,o=window.wp.apiFetch;var i=e.n(o);function l(e){if("object"==typeof GatherPress)return e.split(".").reduce(((e,t)=>e&&e[t]),GatherPress)}window.wp.data;const c=window.ReactJSXRuntime,d=()=>{const[s,n]=(0,a.useState)(!1),[o,d]=(0,a.useState)(!1),[h,u]=(0,a.useState)(!1),[p,g]=(0,a.useState)(!1),[x,m]=(0,a.useState)(!1),[w,b]=(0,a.useState)(!1),[j,_]=(0,a.useState)(!1),[f,C]=(0,a.useState)(""),S=()=>n(!1);return(0,a.useEffect)((()=>{o?(b(!0),u(!1),g(!1),m(!1)):b(!1),_(!(o||h||p||x))}),[o,h,p,x]),((e,t="")=>{for(const[s,n]of Object.entries(e)){let e=s;t&&(e+="_"+String(t)),addEventListener(e,(e=>{n(e.detail)}),!1)}})({setOpen:n}),(0,c.jsx)(c.Fragment,{children:s&&(0,c.jsxs)(r.Modal,{title:(0,t.__)("Notify members via email","gatherpress"),onRequestClose:S,shouldCloseOnClickOutside:!1,children:[(0,c.jsx)(r.TextareaControl,{label:(0,t.__)("Optional message","gatherpress"),value:f,onChange:e=>C(e)}),(0,c.jsx)("p",{className:"description",children:(0,t.__)("Select the recipients for your message by checking the relevant boxes.","gatherpress")}),(0,c.jsxs)(r.Flex,{gap:"8",children:[(0,c.jsx)(r.FlexItem,{children:(0,c.jsx)(r.CheckboxControl,{label:(0,t._x)("All Members","List Status","gatherpress"),checked:o,onChange:d})}),(0,c.jsx)(r.FlexItem,{children:(0,c.jsx)(r.CheckboxControl,{label:(0,t._x)("Attending","List Status","gatherpress"),checked:h,onChange:u,disabled:w})}),(0,c.jsx)(r.FlexItem,{children:(0,c.jsx)(r.CheckboxControl,{label:(0,t._x)("Waiting List","List Status","gatherpress"),checked:p,onChange:g,disabled:w})}),(0,c.jsx)(r.FlexItem,{children:(0,c.jsx)(r.CheckboxControl,{label:(0,t._x)("Not Attending","List Status","gatherpress"),checked:x,onChange:m,disabled:w})})]}),(0,c.jsx)("br",{}),(0,c.jsx)(r.Button,{variant:"primary",onClick:()=>{e.g.confirm((0,t.__)("Confirm you are ready to send?","gatherpress"))&&i()({path:l("urls.eventRestApi")+"/email",method:"POST",data:{post_id:l("eventDetails.postId"),message:f,send:{all:o,attending:h,waiting_list:p,not_attending:x},_wpnonce:l("misc.nonce")}}).then((e=>{e.success&&(S(),C(""),d(!1),u(!1),g(!1),m(!1))}))},disabled:j,children:(0,t.__)("Send Email","gatherpress")})]})})};n()((()=>{const e=document.getElementById("gatherpress-event-communication-modal");e&&(0,a.createRoot)(e).render((0,c.jsx)(d,{}))}))})();
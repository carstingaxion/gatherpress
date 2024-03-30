(()=>{"use strict";var e,t={9554:(e,t,n)=>{const r=window.wp.blocks,a=window.React,s=window.moment;var i=n.n(s);const o=window.wp.i18n,l=window.wp.blockEditor,c=window.wp.components,m=window.wp.element,d=(e,t="")=>{for(const[n,r]of Object.entries(e)){let e=n;t&&(e+="_"+String(t));const a=new CustomEvent(e,{detail:r});dispatchEvent(a)}},p=window.wp.data,u=window.wp.apiFetch;var f=n.n(u);function g(){(0,p.dispatch)("core/editor")?.editPost({meta:{_non_existing_meta:!0}})}function v(e){if("object"==typeof GatherPress)return e.split(".").reduce(((e,t)=>e&&e[t]),GatherPress)}function T(e,t){if("object"!=typeof GatherPress)return;const n=e.split("."),r=n.pop();n.reduce(((e,t)=>{var n;return null!==(n=e[t])&&void 0!==n?n:e[t]={}}),GatherPress)[r]=t}function h(){const e=i().tz(v("eventDetails.dateTime.datetime_end"),y());return"gp_event"===(0,p.select)("core/editor")?.getCurrentPostType()&&i().tz(y()).valueOf()>e.valueOf()}function E(){const e="gp_event_past",t=(0,p.dispatch)("core/notices");t.removeNotice(e),h()&&t.createNotice("warning",(0,o.__)("This event has already past.","gatherpress"),{id:e,isDismissible:!1})}const D=window.wp.date,_="YYYY-MM-DDTHH:mm:ss",w="YYYY-MM-DD HH:mm:ss",z=i().tz(y()).add(1,"day").set("hour",18).set("minute",0).set("second",0).format(_),b=i().tz(z,y()).add(2,"hours").format(_);function S(){return C(v("settings.dateFormat"))+" "+C(v("settings.timeFormat"))}function y(e=v("eventDetails.dateTime.timezone")){return i().tz.zone(e)?e:(0,o.__)("GMT","gatherpress")}function O(e=""){const t=/^([+-])(\d{2}):(00|15|30|45)$/,n=e.replace(t,"$1");return n!==e?"UTC"+n+parseInt(e.replace(t,"$2")).toString()+e.replace(t,"$3").replace("00","").replace("15",".25").replace("30",".5").replace("45",".75"):e}function k(e,t=null){!function(e){const t=i().tz(v("eventDetails.dateTime.datetime_end"),y()).valueOf(),n=i().tz(e,y()).valueOf();n>=t&&P(i().tz(n,y()).add(2,"hours").format(_))}(e),T("eventDetails.dateTime.datetime_start",e),"function"==typeof t&&t(e),g()}function P(e,t=null){!function(e){const t=i().tz(v("eventDetails.dateTime.datetime_start"),y()).valueOf(),n=i().tz(e,y()).valueOf();n<=t&&k(i().tz(n,y()).subtract(2,"hours").format(_))}(e),T("eventDetails.dateTime.datetime_end",e),null!==t&&t(e),g()}function x(){const e=(0,p.select)("core/editor").isSavingPost(),t=(0,p.select)("core/editor").isAutosavingPost();"gp_event"===(0,p.select)("core/editor").getCurrentPostType()&&e&&!t&&f()({path:v("urls.eventRestApi")+"/datetime",method:"POST",data:{post_id:v("eventDetails.postId"),datetime_start:i().tz(v("eventDetails.dateTime.datetime_start"),y()).format(w),datetime_end:i().tz(v("eventDetails.dateTime.datetime_end"),y()).format(w),timezone:v("eventDetails.dateTime.timezone"),_wpnonce:v("misc.nonce")}}).then((()=>{!function(){const e="gp_event_communcation",t=(0,p.dispatch)("core/notices");t.removeNotice(e),"publish"!==(0,p.select)("core/editor").getEditedPostAttribute("status")||h()||t.createNotice("success",(0,o.__)("Send an event update to members via email?","gatherpress"),{id:e,isDismissible:!0,actions:[{onClick:()=>{d({setOpen:!0})},label:(0,o.__)("Compose Message","gatherpress")}]})}()}))}function C(e){const t={d:"DD",D:"ddd",j:"D",l:"dddd",N:"E",S:"o",w:"e",z:"DDD",W:"W",F:"MMMM",m:"MM",M:"MMM",n:"M",t:"",L:"",o:"YYYY",Y:"YYYY",y:"YY",a:"a",A:"A",B:"",g:"h",G:"H",h:"hh",H:"HH",i:"mm",s:"ss",u:"SSS",e:"zz",I:"",O:"",P:"",T:"",Z:"",c:"",r:"",U:"X"};return String(e).split("").map((e=>e in t?t[e]:e)).join("")}const M=e=>{const{isSelected:t}=e,n=t?"none":"block";return(0,a.createElement)("div",{style:{position:"relative"}},e.children,(0,a.createElement)("div",{style:{position:"absolute",top:"0",right:"0",bottom:"0",left:"0",display:n}}))},Y=e=>{const{dateTimeStart:t}=e;return i().tz(t,y()).format(S())},F=e=>{const{dateTimeEnd:t}=e;return i().tz(t,y()).format(S())},j=e=>{const{dateTimeStart:t,setDateTimeStart:n}=e,r=(0,D.getSettings)(),s=/a(?!\\)/i.test(r.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,a.createElement)(c.DateTimePicker,{currentDate:t,onChange:e=>k(e,n),is12Hour:s})},I=e=>{const{dateTimeEnd:t,setDateTimeEnd:n}=e,r=(0,D.getSettings)(),s=/a(?!\\)/i.test(r.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,a.createElement)(c.DateTimePicker,{currentDate:t,onChange:e=>P(e,n),is12Hour:s})},$=e=>{const{dateTimeStart:t,setDateTimeStart:n}=e;return(0,m.useEffect)((()=>{n(i().tz(function(){let e=v("eventDetails.dateTime.datetime_start");return e=""!==e?i().tz(e,y()).format(_):z,T("eventDetails.dateTime.datetime_start",e),e}(),y()).format(_)),d({setDateTimeStart:t}),E()})),(0,a.createElement)(c.PanelRow,null,(0,a.createElement)(c.Flex,{direction:"column",gap:"0"},(0,a.createElement)(c.FlexItem,null,(0,a.createElement)("label",{htmlFor:"gp-datetime-start"},(0,o.__)("Start","gatherpress"))),(0,a.createElement)(c.FlexItem,null,(0,a.createElement)(c.Dropdown,{popoverProps:{placement:"bottom-end"},renderToggle:({isOpen:e,onToggle:n})=>(0,a.createElement)(c.Button,{id:"gp-datetime-start",onClick:n,"aria-expanded":e,isLink:!0},(0,a.createElement)(Y,{dateTimeStart:t})),renderContent:()=>(0,a.createElement)(j,{dateTimeStart:t,setDateTimeStart:n})}))))},H=e=>{const{dateTimeEnd:t,setDateTimeEnd:n}=e;return(0,m.useEffect)((()=>{n(i().tz(function(){let e=v("eventDetails.dateTime.datetime_end");return e=""!==e?i().tz(e,y()).format(_):b,T("eventDetails.dateTime.datetime_end",e),e}(),y()).format(_)),d({setDateTimeEnd:t}),E()})),(0,a.createElement)(c.PanelRow,null,(0,a.createElement)(c.Flex,{direction:"column",gap:"0"},(0,a.createElement)(c.FlexItem,null,(0,a.createElement)("label",{htmlFor:"gp-datetime-end"},(0,o.__)("End","gatherpress"))),(0,a.createElement)(c.FlexItem,null,(0,a.createElement)(c.Dropdown,{popoverProps:{placement:"bottom-end"},renderToggle:({isOpen:e,onToggle:n})=>(0,a.createElement)(c.Button,{id:"gp-datetime-end",onClick:n,"aria-expanded":e,isLink:!0},(0,a.createElement)(F,{dateTimeEnd:t})),renderContent:()=>(0,a.createElement)(I,{dateTimeEnd:t,setDateTimeEnd:n})}))))},G=e=>{const{timezone:t,setTimezone:n}=e,r=v("misc.timezoneChoices");return(0,m.useEffect)((()=>{n(v("eventDetails.dateTime.timezone"))}),[n]),(0,m.useEffect)((()=>{d({setTimezone:v("eventDetails.dateTime.timezone")})})),(0,a.createElement)(c.PanelRow,null,(0,a.createElement)(c.SelectControl,{label:(0,o.__)("Time Zone","gatherpress"),value:O(t),onChange:e=>{e=function(e=""){const t=/^UTC([+-])(\d+)(.\d+)?$/,n=e.replace(t,"$1");if(n!==e){const r=e.replace(t,"$2").padStart(2,"0");let a=e.replace(t,"$3");return""===a&&(a=":00"),a=a.replace(".25",":15").replace(".5",":30").replace(".75",":45"),n+r+a}return e}(e),n(e),T("eventDetails.dateTime.timezone",e),g()}},Object.keys(r).map((e=>(0,a.createElement)("optgroup",{key:e,label:e},Object.keys(r[e]).map((t=>(0,a.createElement)("option",{key:t,value:t},r[e][t]))))))))},N=()=>{const[e,t]=(0,m.useState)(),[n,r]=(0,m.useState)(),[s,i]=(0,m.useState)();return(0,p.subscribe)(x),(0,a.createElement)(a.Fragment,null,(0,a.createElement)("h3",null,(0,o.__)("Date & time","gatherpress")),(0,a.createElement)($,{dateTimeStart:e,setDateTimeStart:t}),(0,a.createElement)(H,{dateTimeEnd:n,setDateTimeEnd:r}),(0,a.createElement)(G,{timezone:s,setTimezone:i}))},B=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gatherpress/event-date","version":"1.0.0","title":"Event Date","category":"gatherpress","icon":"clock","example":{},"description":"Displays the date and time for an event.","usesContext":["postType","postId"],"attributes":{"eventEnd":{"type":"string"},"eventStart":{"type":"string"}},"supports":{"html":false},"textdomain":"gatherpress","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}');(0,r.registerBlockType)(B,{edit:({context:{postType:e,postId:t}})=>{const n=(0,l.useBlockProps)(),[r,s]=(0,m.useState)(z),[d,u]=(0,m.useState)(b),[f,g]=(0,m.useState)(y());return((e,t="")=>{for(const[n,r]of Object.entries(e)){let e=n;t&&(e+="_"+String(t)),addEventListener(e,(e=>{r(e.detail)}),!1)}})({setDateTimeEnd:u,setDateTimeStart:s,setTimezone:g}),(0,a.createElement)("div",{...n},(0,a.createElement)(M,null,(0,a.createElement)(c.Flex,{justify:"normal",align:"center",gap:"4"},(0,a.createElement)(c.FlexItem,{display:"flex",className:"gp-event-date__icon"},(0,a.createElement)(c.Icon,{icon:"clock"})),(0,a.createElement)(c.FlexItem,null,((e,t,n)=>{const r=C(v("settings.dateFormat")),a=C(v("settings.timeFormat")),s=v("settings.showTimezone")?"z":"",l=r+" "+a,c=y(n);let m=r+" "+a+" "+s;return i().tz(e,c).format(r)===i().tz(t,c).format(r)&&(m=a+" "+s),(0,o.sprintf)(/* translators: %1$s: datetime start, %2$s: datetime end, %3$s timezone. */ /* translators: %1$s: datetime start, %2$s: datetime end, %3$s timezone. */
(0,o.__)("%1$s to %2$s %3$s","gatherpress"),i().tz(e,c).format(l),i().tz(t,c).format(m),(d=y(d=c),(0,o.__)("GMT","gatherpress")!==d?"":function(e=""){return e.replace(":","")}(v("eventDetails.dateTime.timezone"))));var d})(r,d,f)),"string"==typeof(0,p.select)("core/editor")?.getCurrentPostType()&&(0,a.createElement)(l.InspectorControls,null,(0,a.createElement)(c.PanelBody,null,(0,a.createElement)(N,null))))))},save:()=>null})}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.m=t,e=[],r.O=(t,n,a,s)=>{if(!n){var i=1/0;for(m=0;m<e.length;m++){for(var[n,a,s]=e[m],o=!0,l=0;l<n.length;l++)(!1&s||i>=s)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(o=!1,s<i&&(i=s));if(o){e.splice(m--,1);var c=a();void 0!==c&&(t=c)}}return t}s=s||0;for(var m=e.length;m>0&&e[m-1][2]>s;m--)e[m]=e[m-1];e[m]=[n,a,s]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={532:0,4:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,s,[i,o,l]=n,c=0;if(i.some((t=>0!==e[t]))){for(a in o)r.o(o,a)&&(r.m[a]=o[a]);if(l)var m=l(r)}for(t&&t(n);c<i.length;c++)s=i[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(m)},n=globalThis.webpackChunkgatherpress=globalThis.webpackChunkgatherpress||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=r.O(void 0,[4],(()=>r(9554)));a=r.O(a)})();
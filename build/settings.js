(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.React,n=window.wp.element,r=window.lodash,o=window.wp.components,a=window.wp.i18n,s=window.wp.coreData,l=window.wp.data,i=e=>{var i,d;const{name:c,option:u,value:m,fieldOptions:p}=e.attrs,w=1!==p.limit,[g,h]=(0,n.useState)(null!==(i=JSON.parse(m))&&void 0!==i?i:"[]"),{contentList:v}=(0,l.useSelect)((e=>{const{getEntityRecords:t}=e(s.store);return{contentList:t("user"!==p.type?"postType":"root",p.type||"post",{per_page:-1,context:"view"})}}),[p.type]),y=null!==(d=v?.reduce(((e,t)=>({...e,[t.title?.rendered||t.name]:t})),{}))&&void 0!==d?d:{};return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.FormTokenField,{key:u,label:p.label||(0,a.__)("Select Posts","gatherpress"),name:c,value:g&&g.map((e=>({id:e.id,slug:e.slug,value:e.title?.rendered||e.name||e.value}))),suggestions:Object.keys(y),onChange:e=>{if(e.some((e=>"string"==typeof e&&!y[e])))return;const t=e.map((e=>"string"==typeof e?y[e]:e));if((0,r.includes)(t,null))return!1;h(t)},maxSuggestions:p.max_suggestions||20,maxLength:p.limit||0,__experimentalShowHowTo:w}),!1===w&&(0,t.createElement)("p",{className:"description"},(0,a.__)("Choose only one item.","gatherpress")),(0,t.createElement)("input",{type:"hidden",id:u,name:c,value:g&&JSON.stringify(g.map((e=>({id:e.id,slug:e.slug,value:e.title?.rendered||e.name||e.value}))))}))},d=window.moment;var c=e.n(d);window.wp.apiFetch;const u=window.wp.date,m=e=>{const{name:r,value:o}=e.attrs,[a,s]=(0,n.useState)(o);return document.querySelector(`[name="${r}"]`).addEventListener("input",(e=>{s(e.target.value)}),{once:!0}),(0,t.createElement)(t.Fragment,null,a&&(0,u.format)(a))},p="YYYY-MM-DDTHH:mm:ss",w=c().tz(g()).add(1,"day").set("hour",18).set("minute",0).set("second",0).format(p);function g(e=function(e){if("object"==typeof GatherPress)return"eventDetails.dateTime.timezone".split(".").reduce(((e,t)=>e&&e[t]),GatherPress)}()){return c().tz.zone(e)?e:(0,a.__)("GMT","gatherpress")}c().tz(w,g()).add(2,"hours").format(p);const h=document.querySelectorAll('[data-gatherpress_component_name="autocomplete"]');for(let e=0;e<h.length;e++){const r=JSON.parse(h[e].dataset.gatherpress_component_attrs);(0,n.createRoot)(h[e]).render((0,t.createElement)(i,{attrs:r}))}!function(){const e=document.querySelectorAll('[data-gatherpress_component_name="datetime-preview"]');for(let r=0;r<e.length;r++){const o=JSON.parse(e[r].dataset.gatherpress_component_attrs);(0,n.createRoot)(e[r]).render((0,t.createElement)(m,{attrs:o}))}}()})();
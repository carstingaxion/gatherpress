!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=59)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.React}()},function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t,n){"use strict";var r=n(15),o=Object.prototype.toString;function a(e){return"[object Array]"===o.call(e)}function i(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):a(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t,n){var r=n(31),o=n(32),a=n(33),i=n(35);e.exports=function(e,t){return r(e)||o(e,t)||a(e,t)||i()}},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},function(e,t,n){var r=n(53);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},function(e,t,n){var r=n(4),o=n(23);e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?o(e):t}},function(e,t){!function(){e.exports=this.wp.date}()},,function(e,t){!function(){e.exports=this.regeneratorRuntime}()},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(3);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var a;if(n)a=n(t);else if(r.isURLSearchParams(t))a=t.toString();else{var i=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),a=i.join("&")}if(a){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";(function(t){var r=n(3),o=n(42),a={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(s=n(19)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(a)})),e.exports=c}).call(this,n(41))},function(e,t,n){"use strict";var r=n(3),o=n(43),a=n(45),i=n(16),s=n(46),c=n(49),u=n(50),l=n(20);e.exports=function(e){return new Promise((function(t,n){var f=e.data,p=e.headers;r.isFormData(f)&&delete p["Content-Type"],(r.isBlob(f)||r.isFile(f))&&f.type&&delete p["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",h=unescape(encodeURIComponent(e.auth.password))||"";p.Authorization="Basic "+btoa(m+":"+h)}var v=s(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),i(v,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in d?c(d.getAllResponseHeaders()):null,a={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:r,config:e,request:d};o(t,n,a),d=null}},d.onabort=function(){d&&(n(l("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){n(l("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,"ECONNABORTED",d)),d=null},r.isStandardBrowserEnv()){var b=(e.withCredentials||u(v))&&e.xsrfCookieName?a.read(e.xsrfCookieName):void 0;b&&(p[e.xsrfHeaderName]=b)}if("setRequestHeader"in d&&r.forEach(p,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),n(e),d=null)})),f||(f=null),d.send(f)}))}},function(e,t,n){"use strict";var r=n(44);e.exports=function(e,t,n,o,a){var i=new Error(e);return r(i,t,n,o,a)}},function(e,t,n){"use strict";var r=n(3);e.exports=function(e,t){t=t||{};var n={},o=["url","method","data"],a=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(e[o],t[o])}r.forEach(o,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(a,u),r.forEach(i,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(void 0,t[o])})),r.forEach(s,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var l=o.concat(a).concat(i).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return r.forEach(f,u),n}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t){function n(e,t,n,r,o,a,i){try{var s=e[a](i),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,o)}e.exports=function(e){return function(){var t=this,r=arguments;return new Promise((function(o,a){var i=e.apply(t,r);function s(e){n(i,o,a,s,c,"next",e)}function c(e){n(i,o,a,s,c,"throw",e)}s(void 0)}))}}},function(e,t,n){e.exports=n(36)},function(e,t,n){"use strict";var r=n(7),o=n.n(r),a=n(4),i=n.n(a),s=n(0),c=n(1),u=n(2),l=function(e){var t=e.item,n=e.additionalClasses,r=e.onTitleClick,o=t.title,a=t.value;return Object(s.createElement)("div",{className:"-mb-px mr-2 list-none"},Object(s.createElement)("a",{className:"no-underline hover:no-underline ".concat(n),"data-item":a,"data-toggle":"tab",href:"#nav-".concat(a),role:"tab","aria-controls":"#nav-".concat(a),onClick:function(e){return r(e,a)}},o))},f=function(e){var t=e.items,n=e.activeValue,r=e.onTitleClick,o=t.map((function(e,t){var o=e.value===n?"active":"opacity-50";return Object(s.createElement)(l,{key:t,item:e,additionalClasses:o,onTitleClick:r})}));return Object(s.createElement)("nav",{className:"flex border-b ml-0",role:"tab-list"},o)},p=function(e){var t=e.value,n=[];"object"===("undefined"==typeof GatherPress?"undefined":i()(GatherPress))&&(n=GatherPress.attendees);var r=Object(c.useState)(n),a=o()(r,2),u=a[0],l=a[1];addEventListener("setAttendanceList",(function(e){l(e.detail)}),!1);var f="";return"object"===i()(u)&&void 0!==u[t]&&(f=u[t].attendees.map((function(e,t){var n=e.profile,r=e.name,o=e.photo,a=e.role;return Object(s.createElement)("div",{key:t,className:"p-2"},Object(s.createElement)("a",{href:n},Object(s.createElement)("img",{className:"p-1 border",alt:r,title:r,src:o})),Object(s.createElement)("h5",{className:"mt-2 mb-0",style:{margin:0,padding:0}},Object(s.createElement)("a",{href:n},r)),Object(s.createElement)("h6",{style:{margin:0,padding:0}},a))}))),Object(s.createElement)(c.Fragment,null,f)},d=function(e){var t=e.items,n=e.activeValue,r=t.map((function(e,t){e.title;var r=e.value,o=r===n?"active":"hidden";return Object(s.createElement)("div",{key:t,className:"tab-pain flex flex-row flex-wrap ".concat(o),id:"nav-".concat(r),role:"tabpanel","aria-labelledby":"nav-".concat(r,"-tab")},Object(s.createElement)(p,{value:r}))}));return Object(s.createElement)("div",{className:"tab-content p-3"},r)},m=[{title:Object(u.__)("Attending","gatherpress"),value:"attending"},{title:Object(u.__)("Waitlist","gatherpress"),value:"waitlist"},{title:Object(u.__)("Not Attending","gatherpress"),value:"not_attending"}];t.a=function(){var e=null;"object"===("undefined"==typeof GatherPress?"undefined":i()(GatherPress))&&(e=GatherPress.current_user_status);var t=Object(c.useState)(e),n=o()(t,2),r=n[0],a=n[1];addEventListener("setAttendanceStatus",(function(e){a(e.detail)}),!1);return Object(s.createElement)("div",{className:"mt-4"},Object(s.createElement)(f,{items:m,activeValue:r,onTitleClick:function(e,t){e.preventDefault(),a(t)}}),Object(s.createElement)(d,{items:m,activeValue:r}))}},function(e,t,n){"use strict";var r=n(14),o=n.n(r),a=n(24),i=n.n(a),s=n(7),c=n.n(s),u=n(4),l=n.n(u),f=n(0),p=n(1),d=n(2),m=function(e){var t=e.text,n=e.value,r=e.onAnchorClick;return Object(f.createElement)("li",{className:"list-none m-0",style:{padding:0,margin:0}},Object(f.createElement)("a",{className:"no-underline rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap",href:"#","data-value":n,onClick:function(e){return r(e,n)}},t))},h=n(25),v=n.n(h).a.create({baseURL:GatherPress.event_rest_api,headers:{"Content-Type":"application/json","X-WP-Nonce":GatherPress.nonce},params:{post_id:GatherPress.post_id,_wpnonce:GatherPress.nonce}});t.a=function(){var e="";"object"===("undefined"==typeof GatherPress?"undefined":l()(GatherPress))&&(e=GatherPress.current_user_status);var t=Object(p.useState)(e),n=c()(t,2),r=n[0],a=n[1],s=[{text:Object(d.__)("Yes, I would like to attend this event.","gatherpress"),value:"attending"},{text:Object(d.__)("No, I cannot attend this event.","gatherpress"),value:"not_attending"}],u=function(){var e=i()(o.a.mark((function e(t,n){var r,i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,v.post("/attendance",{status:n});case 3:(r=e.sent).data.success&&(a(r.data.status),i=new CustomEvent("setAttendanceStatus",{detail:r.data.status}),dispatchEvent(i),s=new CustomEvent("setAttendanceList",{detail:r.data.attendees}),dispatchEvent(s));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),h=s.map((function(e,t){var n=e.text,r=e.value;return Object(f.createElement)(m,{key:t,text:n,value:r,onAnchorClick:u})}));return Object(f.createElement)("div",{className:"gp-component group inline-block relative"},Object(f.createElement)("a",{className:"wp-block-button__link",href:"#",onClick:function(e){return e.preventDefault()}},Object(f.createElement)("span",{className:"mr-1"},function(e){switch(e){case"attending":return Object(d.__)("Attending","gatherpress");case"not_attending":return Object(d.__)("Not Attending","gatherpress");case"waitlist":return Object(d.__)("On Waitlist","gatherpress")}return Object(d.__)("Attend","gatherpress")}(r)),Object(f.createElement)("svg",{className:"fill-current h-8 w-8",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},Object(f.createElement)("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}))),Object(f.createElement)("ul",{className:"absolute left-0 z-10 hidden text-gray-700 pt-1 group-hover:block",style:{margin:0,padding:0}},h))}},function(e,t){!function(){e.exports=this.wp.blocks}()},function(e,t){!function(){e.exports=this.wp.apiFetch}()},function(e,t){!function(){e.exports=this.wp.compose}()},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}return n}}},function(e,t,n){var r=n(34);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){"use strict";var r=n(3),o=n(15),a=n(37),i=n(21);function s(e){var t=new a(e),n=o(a.prototype.request,t);return r.extend(n,a.prototype,t),r.extend(n,t),n}var c=s(n(18));c.Axios=a,c.create=function(e){return s(i(c.defaults,e))},c.Cancel=n(22),c.CancelToken=n(51),c.isCancel=n(17),c.all=function(e){return Promise.all(e)},c.spread=n(52),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";var r=n(3),o=n(16),a=n(38),i=n(39),s=n(21);function c(e){this.defaults=e,this.interceptors={request:new a,response:new a}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(s(n||{},{method:e,url:t}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(s(r||{},{method:e,url:t,data:n}))}})),e.exports=c},function(e,t,n){"use strict";var r=n(3);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,n){"use strict";var r=n(3),o=n(40),a=n(17),i=n(18);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return a(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){"use strict";var r=n(3);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},function(e,t){var n,r,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var c,u=[],l=!1,f=-1;function p(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&d())}function d(){if(!l){var e=s(p);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||l||s(d)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(3);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){"use strict";var r=n(20);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(3);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,a,i){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(47),o=n(48);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(3),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,a,i={};return e?(r.forEach(e.split("\n"),(function(e){if(a=e.indexOf(":"),t=r.trim(e.substr(0,a)).toLowerCase(),n=r.trim(e.substr(a+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}})),i):i}},function(e,t,n){"use strict";var r=n(3);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r=n(22);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},function(e,t){},,,,,function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(28),a=n(0),i=n(26),s=function(e){return Object(a.createElement)(i.a,null)};Object(o.registerBlockType)("gatherpress/attendance-list",{title:Object(r.__)("Attendance List","gatherpress"),icon:"groups",category:"gatherpress",attributes:{content:{type:"string"},color:{type:"string"}},edit:s,save:function(){return null}});var c=n(27),u=function(e){return Object(a.createElement)(c.a,null)};Object(o.registerBlockType)("gatherpress/attendance-selector",{title:Object(r.__)("Attendance Selector","gatherpress"),icon:"groups",category:"gatherpress",attributes:{content:{type:"string"},color:{type:"string"}},edit:u,save:function(){return null}});n(54);function l(){wp.data.dispatch("core/editor").editPost({meta:{_non_existing_meta:!0}})}function f(){return moment().valueOf()>moment(GatherPress.event_datetime.datetime_end).valueOf()}var p=n(29),d=n.n(p),m=n(8),h=n.n(m),v=n(9),b=n.n(v),g=n(10),y=n.n(g),O=n(11),w=n.n(O),j=n(5),x=n.n(j),E=n(1),_=n(12);function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=x()(e);if(t){var o=x()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return w()(this,n)}}function S(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;B(e),GatherPress.event_datetime.datetime_start=e,this.setState({dateTime:e}),null!==t&&t({dateTime:e}),l()}function T(){return GatherPress.event_datetime.datetime_start=this.state.dateTime,this.state.dateTime}var C=function(e){y()(n,e);var t=P(n);function n(e){var r;return h()(this,n),(r=t.call(this,e)).state={dateTime:GatherPress.event_datetime.datetime_start},r}return b()(n,[{key:"componentDidMount",value:function(){this.updateDateTimeStart=S,this.getDateTimeStart=T,S=S.bind(this),T=T.bind(this)}},{key:"componentWillUnmount",value:function(){S=this.updateDateTimeStart,T=this.getDateTimeStart}},{key:"render",value:function(){var e=Object(_.__experimentalGetSettings)();return Object(_.dateI18n)("".concat(e.formats.date," ").concat(e.formats.time),this.state.dateTime)}}]),n}(E.Component);function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=x()(e);if(t){var o=x()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return w()(this,n)}}var R=wp.i18n.__;function A(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;U(e),GatherPress.event_datetime.datetime_end=e,this.setState({dateTime:e}),null!==t&&t({dateTime:e}),l()}function N(){return GatherPress.event_datetime.datetime_end=this.state.dateTime,D(),this.state.dateTime}function D(){var e="gp_event_past",t=wp.data.dispatch("core/notices"),n=f();t.removeNotice(e),n&&t.createNotice("warning",R("This event has already past.","gatherpress"),{id:e,isDismissible:!0})}var L=function(e){y()(n,e);var t=k(n);function n(e){var r;return h()(this,n),(r=t.call(this,e)).state={dateTime:GatherPress.event_datetime.datetime_end},r}return b()(n,[{key:"componentDidMount",value:function(){this.updateDateTimeEnd=A,this.getDateTimeEnd=N,A=A.bind(this),N=N.bind(this),D()}},{key:"componentWillUnmount",value:function(){A=this.updateDateTimeEnd,N=this.getDateTimeEnd}},{key:"componentDidUpdate",value:function(){D()}},{key:"render",value:function(){var e=Object(_.__experimentalGetSettings)();return Object(_.dateI18n)("".concat(e.formats.date," ").concat(e.formats.time),this.state.dateTime)}}]),n}(E.Component),G="YYYY-MM-DDTHH:mm:ss";function B(e){var t=moment(GatherPress.event_datetime.datetime_end).valueOf(),n=moment(e).valueOf();n>=t&&A(moment(n).add(2,"hours").format(G));D()}function U(e){var t=moment(GatherPress.event_datetime.datetime_start).valueOf(),n=moment(e).valueOf();n<=t&&S(moment(n).subtract(2,"hours").format(G));D()}var q=n(6),M=n(30),H=Object(M.withState)()((function(e){var t=e.setState,n=Object(_.__experimentalGetSettings)(),r=/a(?!\\)/i.test(n.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return Object(a.createElement)(q.DateTimePicker,{currentDate:T(),onChange:function(e){return S(e,t)},is12Hour:r})})),F=Object(M.withState)()((function(e){var t=e.setState,n=Object(_.__experimentalGetSettings)(),r=/a(?!\\)/i.test(n.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return Object(a.createElement)(q.DateTimePicker,{currentDate:N(),onChange:function(e){return A(e,t)},is12Hour:r})})),I=wp.i18n.__,Y=moment().format(G),z=GatherPress.event_datetime.datetime_start,V=GatherPress.event_datetime.datetime_end;wp.data.subscribe((function(){var e=wp.data.select("core/editor").isSavingPost(),t=wp.data.select("core/editor").isAutosavingPost();e&&!t&&d()({path:"/gatherpress/v1/event/datetime/",method:"POST",data:{post_id:GatherPress.post_id,datetime_start:moment(GatherPress.event_datetime.datetime_start).format("YYYY-MM-DD HH:mm:ss"),datetime_end:moment(GatherPress.event_datetime.datetime_end).format("YYYY-MM-DD HH:mm:ss"),_wpnonce:GatherPress.nonce}}).then((function(e){}))})),z=""!==z?moment(z).format(G):Y,V=""!==V?moment(V).format(G):moment(Y).add(2,"hours").format(G),GatherPress.event_datetime.datetime_start=z,GatherPress.event_datetime.datetime_end=V;var X=function(){return Object(a.createElement)("section",null,Object(a.createElement)("h3",null,I("Date & time","gatherpress")),Object(a.createElement)(q.PanelRow,null,Object(a.createElement)("span",null,I("Start","gatherpress")),Object(a.createElement)(q.Dropdown,{position:"bottom left",renderToggle:function(e){var t=e.isOpen,n=e.onToggle;return Object(a.createElement)(q.Button,{onClick:n,"aria-expanded":t,isLink:!0},Object(a.createElement)(C,null))},renderContent:function(){return Object(a.createElement)(H,null)}})),Object(a.createElement)(q.PanelRow,null,Object(a.createElement)("span",null,I("End","gatherpress")),Object(a.createElement)(q.Dropdown,{position:"bottom left",renderToggle:function(e){var t=e.isOpen,n=e.onToggle;return Object(a.createElement)(q.Button,{onClick:n,"aria-expanded":t,isLink:!0},Object(a.createElement)(L,null))},renderContent:function(){return Object(a.createElement)(F,null)}})))};function W(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=x()(e);if(t){var o=x()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return w()(this,n)}}var $=wp.i18n.__,J=function(e){y()(n,e);var t=W(n);function n(e){var r;return h()(this,n),(r=t.call(this,e)).state={announceEventSent:"0"!==GatherPress.event_announced},r}return b()(n,[{key:"announce",value:function(){var e=this;confirm($("Ready to announce this event to all members?","gatherpress"))&&d()({path:"/gatherpress/v1/event/announce/",method:"POST",data:{post_id:GatherPress.post_id,_wpnonce:GatherPress.nonce}}).then((function(t){GatherPress.event_announced=t.success?"1":"0",e.setState({announceEventSent:t.success})}))}},{key:"shouldDisable",value:function(){return this.state.announceEventSent||"publish"!==wp.data.select("core/editor").getEditedPostAttribute("status")||f()}},{key:"render",value:function(){var e=this;return Object(a.createElement)("section",null,Object(a.createElement)("h3",null,$("Options","gatherpress")),Object(a.createElement)(q.PanelRow,null,Object(a.createElement)("span",null,$("Announce event","gatherpress")),Object(a.createElement)(q.Button,{className:"components-button is-primary","aria-disabled":this.shouldDisable(),onClick:function(){return e.announce()},disabled:this.shouldDisable()},this.state.announceEventSent?$("Sent","gatherpress"):$("Send","gatherpress"))))}}]),n}(E.Component),K=function(){return Object(a.createElement)(J,null)},Q=wp.plugins.registerPlugin,Z=wp.i18n.__,ee=wp.editPost.PluginDocumentSettingPanel;Q("gp-event-settings",{render:function(){return"gp_event"===wp.data.select("core/editor").getCurrentPostType()&&Object(a.createElement)(ee,{name:"gp-event-settings",title:Z("Event settings","gatherpress"),initialOpen:!0,className:"gp-event-settings"},Object(a.createElement)(X,null),Object(a.createElement)("hr",null),Object(a.createElement)(K,null))},icon:""});var te=Object(a.createElement)("svg",{id:"Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 147.1 147.1"},Object(a.createElement)("title",null,"GatherPress"),Object(a.createElement)("circle",{cx:"73.5",cy:"73.5",r:"73.5",fill:"#23c3aa"}),Object(a.createElement)("path",{d:"M791.8,520.2l-23.5,15.1s26.8,20.9,18.5,43.6l-42.8,34.5c-27.4-2.7-60.5-30.4-60.5-71l41.7-35.8c5.8.7,16.5-3.5,23.6-3.4C772.1,503.6,779.1,505,791.8,520.2Z",transform:"translate(-683.3 -467.9)",fill:"#36a08b"}),Object(a.createElement)("path",{d:"M763.6,538.1H797a2.9,2.9,0,0,1,2.9,2.9h0a59.4,59.4,0,0,1-2.3,17.4,36.9,36.9,0,0,1-7.6,13.1Q777.8,585,759.1,585a42.4,42.4,0,0,1-31.3-13.2,45.4,45.4,0,0,1,51.5-73,49.1,49.1,0,0,1,12.3,8.9,6.1,6.1,0,0,1,0,8.7l-.4.4a6,6,0,0,1-8.5-.1q-9.5-9.7-22.2-9.7a31.2,31.2,0,0,0-23.2,9.5Q728,526,728,540T738.4,564q9.7,8.7,21.1,8.7a26.2,26.2,0,0,0,17.4-6.5q7.7-6.6,8.6-15.8H763.6a6.2,6.2,0,0,1-6.2-6.2h0A6.2,6.2,0,0,1,763.6,538.1Z",transform:"translate(-683.3 -467.9)",fill:"#fff",stroke:"#fff","stroke-miterlimit":"10","stroke-width":"6"}));wp.blocks.updateCategory("gatherpress",{icon:te})}]);
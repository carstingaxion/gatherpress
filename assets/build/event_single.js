!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=61)}({0:function(e,t){!function(){e.exports=this.wp.element}()},1:function(e,t){!function(){e.exports=this.React}()},10:function(e,t,n){var r=n(53);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},11:function(e,t,n){var r=n(4),a=n(23);e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?a(e):t}},13:function(e,t){!function(){e.exports=this.ReactDOM}()},2:function(e,t){!function(){e.exports=this.wp.i18n}()},23:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},4:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},5:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},53:function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},61:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(13),c=n.n(o),s=n(8),i=n.n(s),u=n(9),l=n.n(u),f=n(10),p=n.n(f),d=n(11),b=n.n(d),h=n(5),g=n.n(h),m=n(0),v=n(2),y=n(23),O=n.n(y);function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=g()(e);if(t){var a=g()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return b()(this,n)}}function j(e){this.setState({attendanceList:e})}var x=function(e){p()(n,e);var t=_(n);function n(e){var r;i()(this,n),r=t.call(this,e),j=j.bind(O()(r)),r.state={attendanceList:GatherPress.attendees},r.pages=[{name:Object(v.__)("Attending","gatherpress"),slug:"attending"},{name:Object(v.__)("Waitlist","gatherpress"),slug:"waitlist"},{name:Object(v.__)("Not Attending","gatherpress"),slug:"not_attending"}];for(var a=0;a<r.pages.length;a++){var o=r.pages[a];if(GatherPress.current_user_status===o.slug){r.state.activeTab=a;break}}return r}return l()(n,[{key:"tabUpdate",value:function(e){e.preventDefault();for(var t=e.target.dataset.id,n=0;n<this.pages.length;n++){if(t===this.pages[n].slug){this.setState({activeTab:n});break}}}},{key:"displayNavigation",value:function(){for(var e=this,t=[],n=0;n<this.pages.length;n++){var r=this.pages[n],a=n===this.state.activeTab?"wp-block-button__link no-underline hover:no-underline active":"wp-block-button__link no-underline hover:no-underline opacity-50";t.push(Object(m.createElement)("div",{className:"-mb-px mr-2 list-none"},Object(m.createElement)("button",{ref:function(t){return e.navItem=t},key:r.slug,className:a,id:"nav-"+r.slug+"-tab","data-id":r.slug,"data-toggle":"tab",href:"#nav-"+r.slug,role:"tab","aria-controls":"nav-"+r.slug,onClick:function(t){return e.tabUpdate(t)}},r.name)))}return t}},{key:"displayContent",value:function(){for(var e=[],t=0;t<this.pages.length;t++){var n=this.pages[t],r=t===this.state.activeTab?"block":"hidden";e.push(Object(m.createElement)("div",{key:n.slug,className:"tab-pane "+r,id:"nav-"+n.slug,role:"tabpanel","aria-labelledby":"nav-"+n.slug+"-tab"},Object(m.createElement)("div",{key:n.slug,className:"flex flex-row flex-wrap"},this.getAttendees(n.slug))))}return e}},{key:"getAttendees",value:function(e){if(void 0!==this.state.attendanceList[e]){for(var t=this.state.attendanceList[e].attendees,n=[],r=0;r<t.length;r++){var a=t[r];n.push(Object(m.createElement)("div",{key:a.id,className:"p-2"},Object(m.createElement)("a",{href:a.profile},Object(m.createElement)("img",{className:"p-1 border",alt:a.name,title:a.name,src:a.photo})),Object(m.createElement)("h5",{className:"mt-2 mb-0"},Object(m.createElement)("a",{className:"text-blue-500 hover:text-blue-800",href:a.profile},a.name)),Object(m.createElement)("h6",{className:"text-gray-600"},a.role)))}return n}}},{key:"render",value:function(){return Object(m.createElement)("div",{className:"mt-4"},Object(m.createElement)("nav",{className:"flex border-b ml-0",id:"attendance-nav",role:"tablist"},this.displayNavigation()),Object(m.createElement)("div",{className:"tab-content p-3",id:"attendance-content"},this.displayContent()))}}]),n}(r.Component);function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=g()(e);if(t){var a=g()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return b()(this,n)}}var w=function(e){p()(n,e);var t=k(n);function n(e){var r;return i()(this,n),(r=t.call(this,e)).state={inputValue:r.attendanceStatus(GatherPress.current_user_status)},r}return l()(n,[{key:"attendanceStatus",value:function(e){switch(e){case"attending":return Object(v.__)("Attending","gatherpress");case"not_attending":return Object(v.__)("Not Attending","gatherpress");case"waitlist":return Object(v.__)("On Waitlist","gatherpress")}return Object(v.__)("Attend","gatherpress")}},{key:"onAnchorClick",value:function(e){e.preventDefault();var t=e.target.getAttribute("data-value");this.updateStatus(t)}},{key:"updateStatus",value:function(e){var t=this,n={method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":GatherPress.nonce},body:JSON.stringify({status:e,post_id:GatherPress.post_id,_wpnonce:GatherPress.nonce})};fetch(GatherPress.event_rest_api+"attendance",n).then((function(e){return e.json()})).then((function(e){var n;e.success&&(t.setState({inputValue:t.attendanceStatus(e.status)}),j(e.attendees),n=e.status,document.getElementById("nav-"+n+"-tab").click())}))}},{key:"render",value:function(){var e=this,t="1"===GatherPress.has_event_past?"opacity-50 cursor-not-allowed":"";return Object(m.createElement)("div",{className:"group inline-block relative"},Object(m.createElement)("span",{type:"button",className:"wp-block-button__link "+t,"data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},Object(m.createElement)("span",{className:"mr-1"},this.state.inputValue),Object(m.createElement)("svg",{className:"fill-current h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},Object(m.createElement)("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}))),Object(m.createElement)("ul",{className:"absolute left-0 z-10 hidden text-gray-700 pt-1 group-hover:block",style:{margin:0,padding:0}},Object(m.createElement)("li",{className:"list-none m-0",style:{padding:0,margin:0}},Object(m.createElement)("a",{className:"no-underline rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap",href:"#","data-value":"attending",onClick:function(t){return e.onAnchorClick(t)}},Object(v.__)("Yes, I would like to attend this event.","gatherpress"))),Object(m.createElement)("li",{className:"list-none m-0",style:{padding:0,margin:0}},Object(m.createElement)("a",{className:"no-underline rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap",href:"#","data-value":"not_attending",onClick:function(t){return e.onAnchorClick(t)}},Object(v.__)("No, I cannot attend this event.","gatherpress")))))}}]),n}(a.a.Component),E=document.querySelector("#attendance_button_container"),N=document.querySelector("#attendance_container");c.a.render(Object(r.createElement)(w),E),c.a.render(Object(r.createElement)(x),N)},8:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},9:function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}});
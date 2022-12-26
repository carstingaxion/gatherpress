(()=>{var e,t={1817:(e,t,n)=>{"use strict";const o=window.wp.blocks,r=window.wp.element,s=window.wp.blockEditor;var a=n(3253),l=n.n(a);const i=window.wp.i18n,u=window.wp.components,c=window.wp.apiFetch;var d=n.n(c);const p=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];for(const[n,o]of Object.entries(e)){let e=n;t&&(e+=t);const r=new CustomEvent(e,{detail:o});dispatchEvent(r)}},f=e=>{let{type:t="upcoming",status:n="attend"}=e;const o={upcoming:{attend:{icon:"",text:""},attending:{icon:"dashicons dashicons-yes-alt",text:(0,i.__)("Attending","gatherpress")},waiting_list:{icon:"dashicons dashicons-editor-help",text:(0,i.__)("Waiting List","gatherpress")},not_attending:{icon:"dashicons dashicons-dismiss",text:(0,i.__)("Not Attending","gatherpress")}},past:{attending:{icon:"dashicons dashicons-yes-alt",text:(0,i.__)("Went","gatherpress")},attend:{icon:"dashicons dashicons-dismiss",text:(0,i.__)("Didn't Go","gatherpress")},waiting_list:{icon:"dashicons dashicons-dismiss",text:(0,i.__)("Didn't Go","gatherpress")},not_attending:{icon:"dashicons dashicons-dismiss",text:(0,i.__)("Didn't Go","gatherpress")}}};return(0,r.createElement)("div",{className:"gatherpress-status__response"},(0,r.createElement)("span",{className:o[t][n].icon}),(0,r.createElement)("strong",null,o[t][n].text))},h=e=>{let{eventId:t,currentUser:n="",type:o}=e;const[s,a]=(0,r.useState)(n.status),[c,h]=(0,r.useState)(n.guests),[m,v]=(0,r.useState)("hidden"),[y,b]=(0,r.useState)("false"),[g,O]=(0,r.useState)(!1);if("past"===o)return"";"undefined"==typeof adminpage&&l().setAppElement(".gp-enabled");const _=e=>{e.preventDefault(),O(!1)},w=async function(e,n){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];e.preventDefault(),"attending"!==n&&(o=0),d()({path:"/gatherpress/v1/event/attendance",method:"POST",data:{post_id:t,status:n,guests:o,_wpnonce:GatherPress.nonce}}).then((t=>{if(t.success){a(t.status),h(t.guests);const n={all:0,attending:0,not_attending:0,waiting_list:0};for(const[e,o]of Object.entries(t.attendees))n[e]=o.count;const o={setAttendanceStatus:t.status,setAttendanceList:t.attendees,setAttendanceCount:n};p(o,t.event_id),r&&_(e)}}))},C=e=>{switch(e){case"attending":return(0,i.__)("You're Attending","gatherpress");case"waiting_list":return(0,i.__)("You're Wait Listed","gatherpress")}return""};return""===n?(0,r.createElement)("div",{className:"wp-block-gatherpress-attendance-selector__wrapper"},(0,r.createElement)("div",{className:"wp-block-button"},(0,r.createElement)("a",{className:"wp-block-button__link",href:"#",onClick:e=>w(e,"attending")},(0,i.__)("Attend","gatherpress")))):(0,r.createElement)("div",{className:"wp-block-gatherpress-attendance-selector__wrapper"},(0,r.createElement)(u.ButtonGroup,{className:"gatherpress-buttons wp-block-buttons"},(0,r.createElement)("div",{className:"gatherpress-buttons__container  wp-block-button"},(0,r.createElement)("a",{href:"#",className:"gatherpress-buttons__button wp-block-button__link","aria-expanded":y,tabIndex:"0",onKeyDown:e=>{13===e.keyCode&&(v("hidden"===m?"show":"hidden"),b("false"===y?"true":"false"))},onClick:e=>(e=>{e.preventDefault(),"not_attending"!==s&&"attend"!==s||w(e,"attending",0,!1),O(!0)})(e)},(e=>{switch(e){case"attending":case"waiting_list":return(0,i.__)("Edit RSVP","gatherpress")}return(0,i.__)("Attend","gatherpress")})(s))),(0,r.createElement)(l(),{isOpen:g,onRequestClose:_,style:{content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}},contentLabel:(0,i.__)("Edit RSVP","gatherpress")},(0,r.createElement)("div",{className:"gatherpress-modal gatherpress-modal__attendance-selector"},(0,r.createElement)("div",{className:"gatherpress-modal__header has-large-font-size"},C(s)?C(s):(0,r.createElement)(u.Spinner,null)),(0,r.createElement)("div",{className:"gatherpress-modal__content"},(0,r.createElement)("label",{htmlFor:"gp-guests"},(0,i.__)("Number of guests?","gatherpress")),(0,r.createElement)("input",{id:"gp-guests",type:"number",min:"0",max:"5",onChange:e=>w(e,"attending",e.target.value,!1),defaultValue:c})),(0,r.createElement)(u.ButtonGroup,{className:"gatherpress-buttons wp-block-buttons"},(0,r.createElement)("div",{className:"gatherpress-buttons__container wp-block-button is-style-outline has-small-font-size"},(0,r.createElement)("a",{href:"#",onClick:e=>w(e,"not_attending"),className:"gatherpress-buttons__button wp-block-button__link"},(0,i.__)("Not Attending","gatherpress"))),(0,r.createElement)("div",{className:"gatherpress-buttons__container wp-block-button has-small-font-size"},(0,r.createElement)("a",{href:"#",onClick:_,className:"gatherpress-buttons__button wp-block-button__link"},(0,i.__)("Close","gatherpress"))))))),"attend"!==s&&(0,r.createElement)("div",{className:"gatherpress-status"},(0,r.createElement)(f,{type:o,status:s}),0<c&&(0,r.createElement)("div",{className:"gatherpress-status__guests"},(0,r.createElement)("span",null,"+",c," ",(0,i.__)("guest(s)","gatherpress")))))},m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gatherpress/attendance-selector","version":"0.1.1","title":"Attendance Selector","category":"gatherpress","icon":"groups","example":{},"description":"The block with attendance selector.","attributes":{"content":{"type":"string"},"color":{"type":"string"}},"supports":{"html":false},"textdomain":"gatherpress","editorScript":"file:./index.js","style":"file:./style-index.css","viewScript":"file:./attendance-selector.js","render":"file:./render.php"}');(0,o.registerBlockType)(m,{edit:()=>{const e=(0,s.useBlockProps)(),t=GatherPress.post_id,n=GatherPress.current_user;return(0,r.createElement)("div",e,(0,r.createElement)(h,{eventId:t,currentUser:n,type:"upcoming"}))},save:()=>null})},8875:(e,t,n)=>{var o;!function(){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),s={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen};void 0===(o=function(){return s}.call(t,n,t,e))||(e.exports=o)}()},2703:(e,t,n)=>{"use strict";var o=n(414);function r(){}function s(){}s.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,s,a){if(a!==o){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:s,resetWarningCache:r};return n.PropTypes=n,n}},5697:(e,t,n)=>{e.exports=n(2703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},6871:(e,t,n)=>{"use strict";function o(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);null!=e&&this.setState(e)}function r(e){this.setState(function(t){var n=this.constructor.getDerivedStateFromProps(e,t);return null!=n?n:null}.bind(this))}function s(e,t){try{var n=this.props,o=this.state;this.props=e,this.state=t,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(n,o)}finally{this.props=n,this.state=o}}function a(e){var t=e.prototype;if(!t||!t.isReactComponent)throw new Error("Can only polyfill class components");if("function"!=typeof e.getDerivedStateFromProps&&"function"!=typeof t.getSnapshotBeforeUpdate)return e;var n=null,a=null,l=null;if("function"==typeof t.componentWillMount?n="componentWillMount":"function"==typeof t.UNSAFE_componentWillMount&&(n="UNSAFE_componentWillMount"),"function"==typeof t.componentWillReceiveProps?a="componentWillReceiveProps":"function"==typeof t.UNSAFE_componentWillReceiveProps&&(a="UNSAFE_componentWillReceiveProps"),"function"==typeof t.componentWillUpdate?l="componentWillUpdate":"function"==typeof t.UNSAFE_componentWillUpdate&&(l="UNSAFE_componentWillUpdate"),null!==n||null!==a||null!==l){var i=e.displayName||e.name,u="function"==typeof e.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+i+" uses "+u+" but also contains the following legacy lifecycles:"+(null!==n?"\n  "+n:"")+(null!==a?"\n  "+a:"")+(null!==l?"\n  "+l:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"==typeof e.getDerivedStateFromProps&&(t.componentWillMount=o,t.componentWillReceiveProps=r),"function"==typeof t.getSnapshotBeforeUpdate){if("function"!=typeof t.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");t.componentWillUpdate=s;var c=t.componentDidUpdate;t.componentDidUpdate=function(e,t,n){var o=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:n;c.call(this,e,t,o)}}return e}n.r(t),n.d(t,{polyfill:()=>a}),o.__suppressDeprecationWarning=!0,r.__suppressDeprecationWarning=!0,s.__suppressDeprecationWarning=!0},9983:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.bodyOpenClassName=t.portalClassName=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(9196),a=h(s),l=h(n(1850)),i=h(n(5697)),u=h(n(8747)),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(7149)),d=n(1112),p=h(d),f=n(6871);function h(e){return e&&e.__esModule?e:{default:e}}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var y=t.portalClassName="ReactModalPortal",b=t.bodyOpenClassName="ReactModal__Body--open",g=d.canUseDOM&&void 0!==l.default.createPortal,O=function(e){return document.createElement(e)},_=function(){return g?l.default.createPortal:l.default.unstable_renderSubtreeIntoContainer};function w(e){return e()}var C=function(e){function t(){var e,n,r;m(this,t);for(var s=arguments.length,i=Array(s),c=0;c<s;c++)i[c]=arguments[c];return n=r=v(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.removePortal=function(){!g&&l.default.unmountComponentAtNode(r.node);var e=w(r.props.parentSelector);e&&e.contains(r.node)?e.removeChild(r.node):console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.')},r.portalRef=function(e){r.portal=e},r.renderPortal=function(e){var n=_()(r,a.default.createElement(u.default,o({defaultStyles:t.defaultStyles},e)),r.node);r.portalRef(n)},v(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){d.canUseDOM&&(g||(this.node=O("div")),this.node.className=this.props.portalClassName,w(this.props.parentSelector).appendChild(this.node),!g&&this.renderPortal(this.props))}},{key:"getSnapshotBeforeUpdate",value:function(e){return{prevParent:w(e.parentSelector),nextParent:w(this.props.parentSelector)}}},{key:"componentDidUpdate",value:function(e,t,n){if(d.canUseDOM){var o=this.props,r=o.isOpen,s=o.portalClassName;e.portalClassName!==s&&(this.node.className=s);var a=n.prevParent,l=n.nextParent;l!==a&&(a.removeChild(this.node),l.appendChild(this.node)),(e.isOpen||r)&&!g&&this.renderPortal(this.props)}}},{key:"componentWillUnmount",value:function(){if(d.canUseDOM&&this.node&&this.portal){var e=this.portal.state,t=Date.now(),n=e.isOpen&&this.props.closeTimeoutMS&&(e.closesAt||t+this.props.closeTimeoutMS);n?(e.beforeClose||this.portal.closeWithTimeout(),setTimeout(this.removePortal,n-t)):this.removePortal()}}},{key:"render",value:function(){return d.canUseDOM&&g?(!this.node&&g&&(this.node=O("div")),_()(a.default.createElement(u.default,o({ref:this.portalRef,defaultStyles:t.defaultStyles},this.props)),this.node)):null}}],[{key:"setAppElement",value:function(e){c.setElement(e)}}]),t}(s.Component);C.propTypes={isOpen:i.default.bool.isRequired,style:i.default.shape({content:i.default.object,overlay:i.default.object}),portalClassName:i.default.string,bodyOpenClassName:i.default.string,htmlOpenClassName:i.default.string,className:i.default.oneOfType([i.default.string,i.default.shape({base:i.default.string.isRequired,afterOpen:i.default.string.isRequired,beforeClose:i.default.string.isRequired})]),overlayClassName:i.default.oneOfType([i.default.string,i.default.shape({base:i.default.string.isRequired,afterOpen:i.default.string.isRequired,beforeClose:i.default.string.isRequired})]),appElement:i.default.oneOfType([i.default.instanceOf(p.default),i.default.instanceOf(d.SafeHTMLCollection),i.default.instanceOf(d.SafeNodeList),i.default.arrayOf(i.default.instanceOf(p.default))]),onAfterOpen:i.default.func,onRequestClose:i.default.func,closeTimeoutMS:i.default.number,ariaHideApp:i.default.bool,shouldFocusAfterRender:i.default.bool,shouldCloseOnOverlayClick:i.default.bool,shouldReturnFocusAfterClose:i.default.bool,preventScroll:i.default.bool,parentSelector:i.default.func,aria:i.default.object,data:i.default.object,role:i.default.string,contentLabel:i.default.string,shouldCloseOnEsc:i.default.bool,overlayRef:i.default.func,contentRef:i.default.func,id:i.default.string,overlayElement:i.default.func,contentElement:i.default.func},C.defaultProps={isOpen:!1,portalClassName:y,bodyOpenClassName:b,role:"dialog",ariaHideApp:!0,closeTimeoutMS:0,shouldFocusAfterRender:!0,shouldCloseOnEsc:!0,shouldCloseOnOverlayClick:!0,shouldReturnFocusAfterClose:!0,preventScroll:!1,parentSelector:function(){return document.body},overlayElement:function(e,t){return a.default.createElement("div",e,t)},contentElement:function(e,t){return a.default.createElement("div",e,t)}},C.defaultStyles={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},content:{position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid #ccc",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"4px",outline:"none",padding:"20px"}},(0,f.polyfill)(C),t.default=C},8747:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(9196),l=v(n(5697)),i=m(n(3721)),u=v(n(8338)),c=m(n(7149)),d=m(n(2409)),p=n(1112),f=v(p),h=v(n(9623));function m(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function v(e){return e&&e.__esModule?e:{default:e}}n(5063);var y={overlay:"ReactModal__Overlay",content:"ReactModal__Content"},b=0,g=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.setOverlayRef=function(e){n.overlay=e,n.props.overlayRef&&n.props.overlayRef(e)},n.setContentRef=function(e){n.content=e,n.props.contentRef&&n.props.contentRef(e)},n.afterClose=function(){var e=n.props,t=e.appElement,o=e.ariaHideApp,r=e.htmlOpenClassName,s=e.bodyOpenClassName,a=e.parentSelector,l=a&&a().ownerDocument||document;s&&d.remove(l.body,s),r&&d.remove(l.getElementsByTagName("html")[0],r),o&&b>0&&0==(b-=1)&&c.show(t),n.props.shouldFocusAfterRender&&(n.props.shouldReturnFocusAfterClose?(i.returnFocus(n.props.preventScroll),i.teardownScopedFocus()):i.popWithoutFocus()),n.props.onAfterClose&&n.props.onAfterClose(),h.default.deregister(n)},n.open=function(){n.beforeOpen(),n.state.afterOpen&&n.state.beforeClose?(clearTimeout(n.closeTimer),n.setState({beforeClose:!1})):(n.props.shouldFocusAfterRender&&(i.setupScopedFocus(n.node),i.markForFocusLater()),n.setState({isOpen:!0},(function(){n.openAnimationFrame=requestAnimationFrame((function(){n.setState({afterOpen:!0}),n.props.isOpen&&n.props.onAfterOpen&&n.props.onAfterOpen({overlayEl:n.overlay,contentEl:n.content})}))})))},n.close=function(){n.props.closeTimeoutMS>0?n.closeWithTimeout():n.closeWithoutTimeout()},n.focusContent=function(){return n.content&&!n.contentHasFocus()&&n.content.focus({preventScroll:!0})},n.closeWithTimeout=function(){var e=Date.now()+n.props.closeTimeoutMS;n.setState({beforeClose:!0,closesAt:e},(function(){n.closeTimer=setTimeout(n.closeWithoutTimeout,n.state.closesAt-Date.now())}))},n.closeWithoutTimeout=function(){n.setState({beforeClose:!1,isOpen:!1,afterOpen:!1,closesAt:null},n.afterClose)},n.handleKeyDown=function(e){(function(e){return"Tab"===e.code||9===e.keyCode})(e)&&(0,u.default)(n.content,e),n.props.shouldCloseOnEsc&&function(e){return"Escape"===e.code||27===e.keyCode}(e)&&(e.stopPropagation(),n.requestClose(e))},n.handleOverlayOnClick=function(e){null===n.shouldClose&&(n.shouldClose=!0),n.shouldClose&&n.props.shouldCloseOnOverlayClick&&(n.ownerHandlesClose()?n.requestClose(e):n.focusContent()),n.shouldClose=null},n.handleContentOnMouseUp=function(){n.shouldClose=!1},n.handleOverlayOnMouseDown=function(e){n.props.shouldCloseOnOverlayClick||e.target!=n.overlay||e.preventDefault()},n.handleContentOnClick=function(){n.shouldClose=!1},n.handleContentOnMouseDown=function(){n.shouldClose=!1},n.requestClose=function(e){return n.ownerHandlesClose()&&n.props.onRequestClose(e)},n.ownerHandlesClose=function(){return n.props.onRequestClose},n.shouldBeClosed=function(){return!n.state.isOpen&&!n.state.beforeClose},n.contentHasFocus=function(){return document.activeElement===n.content||n.content.contains(document.activeElement)},n.buildClassName=function(e,t){var o="object"===(void 0===t?"undefined":r(t))?t:{base:y[e],afterOpen:y[e]+"--after-open",beforeClose:y[e]+"--before-close"},s=o.base;return n.state.afterOpen&&(s=s+" "+o.afterOpen),n.state.beforeClose&&(s=s+" "+o.beforeClose),"string"==typeof t&&t?s+" "+t:s},n.attributesFromObject=function(e,t){return Object.keys(t).reduce((function(n,o){return n[e+"-"+o]=t[o],n}),{})},n.state={afterOpen:!1,beforeClose:!1},n.shouldClose=null,n.moveFromContentToOverlay=null,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"componentDidMount",value:function(){this.props.isOpen&&this.open()}},{key:"componentDidUpdate",value:function(e,t){this.props.isOpen&&!e.isOpen?this.open():!this.props.isOpen&&e.isOpen&&this.close(),this.props.shouldFocusAfterRender&&this.state.isOpen&&!t.isOpen&&this.focusContent()}},{key:"componentWillUnmount",value:function(){this.state.isOpen&&this.afterClose(),clearTimeout(this.closeTimer),cancelAnimationFrame(this.openAnimationFrame)}},{key:"beforeOpen",value:function(){var e=this.props,t=e.appElement,n=e.ariaHideApp,o=e.htmlOpenClassName,r=e.bodyOpenClassName,s=e.parentSelector,a=s&&s().ownerDocument||document;r&&d.add(a.body,r),o&&d.add(a.getElementsByTagName("html")[0],o),n&&(b+=1,c.hide(t)),h.default.register(this)}},{key:"render",value:function(){var e=this.props,t=e.id,n=e.className,r=e.overlayClassName,s=e.defaultStyles,a=e.children,l=n?{}:s.content,i=r?{}:s.overlay;if(this.shouldBeClosed())return null;var u={ref:this.setOverlayRef,className:this.buildClassName("overlay",r),style:o({},i,this.props.style.overlay),onClick:this.handleOverlayOnClick,onMouseDown:this.handleOverlayOnMouseDown},c=o({id:t,ref:this.setContentRef,style:o({},l,this.props.style.content),className:this.buildClassName("content",n),tabIndex:"-1",onKeyDown:this.handleKeyDown,onMouseDown:this.handleContentOnMouseDown,onMouseUp:this.handleContentOnMouseUp,onClick:this.handleContentOnClick,role:this.props.role,"aria-label":this.props.contentLabel},this.attributesFromObject("aria",o({modal:!0},this.props.aria)),this.attributesFromObject("data",this.props.data||{}),{"data-testid":this.props.testId}),d=this.props.contentElement(c,a);return this.props.overlayElement(u,d)}}]),t}(a.Component);g.defaultProps={style:{overlay:{},content:{}},defaultStyles:{}},g.propTypes={isOpen:l.default.bool.isRequired,defaultStyles:l.default.shape({content:l.default.object,overlay:l.default.object}),style:l.default.shape({content:l.default.object,overlay:l.default.object}),className:l.default.oneOfType([l.default.string,l.default.object]),overlayClassName:l.default.oneOfType([l.default.string,l.default.object]),parentSelector:l.default.func,bodyOpenClassName:l.default.string,htmlOpenClassName:l.default.string,ariaHideApp:l.default.bool,appElement:l.default.oneOfType([l.default.instanceOf(f.default),l.default.instanceOf(p.SafeHTMLCollection),l.default.instanceOf(p.SafeNodeList),l.default.arrayOf(l.default.instanceOf(f.default))]),onAfterOpen:l.default.func,onAfterClose:l.default.func,onRequestClose:l.default.func,closeTimeoutMS:l.default.number,shouldFocusAfterRender:l.default.bool,shouldCloseOnOverlayClick:l.default.bool,shouldReturnFocusAfterClose:l.default.bool,preventScroll:l.default.bool,role:l.default.string,contentLabel:l.default.string,aria:l.default.object,data:l.default.object,children:l.default.node,shouldCloseOnEsc:l.default.bool,overlayRef:l.default.func,contentRef:l.default.func,id:l.default.string,overlayElement:l.default.func,contentElement:l.default.func,testId:l.default.string},t.default=g,e.exports=t.default},7149:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.resetState=function(){a&&(a.removeAttribute?a.removeAttribute("aria-hidden"):null!=a.length?a.forEach((function(e){return e.removeAttribute("aria-hidden")})):document.querySelectorAll(a).forEach((function(e){return e.removeAttribute("aria-hidden")}))),a=null},t.log=function(){},t.assertNodeList=l,t.setElement=function(e){var t=e;if("string"==typeof t&&s.canUseDOM){var n=document.querySelectorAll(t);l(n,t),t=n}return a=t||a},t.validateElement=i,t.hide=function(e){var t=!0,n=!1,o=void 0;try{for(var r,s=i(e)[Symbol.iterator]();!(t=(r=s.next()).done);t=!0)r.value.setAttribute("aria-hidden","true")}catch(e){n=!0,o=e}finally{try{!t&&s.return&&s.return()}finally{if(n)throw o}}},t.show=function(e){var t=!0,n=!1,o=void 0;try{for(var r,s=i(e)[Symbol.iterator]();!(t=(r=s.next()).done);t=!0)r.value.removeAttribute("aria-hidden")}catch(e){n=!0,o=e}finally{try{!t&&s.return&&s.return()}finally{if(n)throw o}}},t.documentNotReadyOrSSRTesting=function(){a=null};var o,r=(o=n(2473))&&o.__esModule?o:{default:o},s=n(1112),a=null;function l(e,t){if(!e||!e.length)throw new Error("react-modal: No elements were found for selector "+t+".")}function i(e){var t=e||a;return t?Array.isArray(t)||t instanceof HTMLCollection||t instanceof NodeList?t:[t]:((0,r.default)(!1,["react-modal: App element is not defined.","Please use `Modal.setAppElement(el)` or set `appElement={el}`.","This is needed so screen readers don't see main content","when modal is opened. It is not recommended, but you can opt-out","by setting `ariaHideApp={false}`."].join(" ")),[])}},5063:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.resetState=function(){for(var e=[s,a],t=0;t<e.length;t++){var n=e[t];n&&n.parentNode&&n.parentNode.removeChild(n)}s=a=null,l=[]},t.log=function(){console.log("bodyTrap ----------"),console.log(l.length);for(var e=[s,a],t=0;t<e.length;t++){var n=e[t]||{};console.log(n.nodeName,n.className,n.id)}console.log("edn bodyTrap ----------")};var o,r=(o=n(9623))&&o.__esModule?o:{default:o},s=void 0,a=void 0,l=[];function i(){0!==l.length&&l[l.length-1].focusContent()}r.default.subscribe((function(e,t){s||a||((s=document.createElement("div")).setAttribute("data-react-modal-body-trap",""),s.style.position="absolute",s.style.opacity="0",s.setAttribute("tabindex","0"),s.addEventListener("focus",i),(a=s.cloneNode()).addEventListener("focus",i)),(l=t).length>0?(document.body.firstChild!==s&&document.body.insertBefore(s,document.body.firstChild),document.body.lastChild!==a&&document.body.appendChild(a)):(s.parentElement&&s.parentElement.removeChild(s),a.parentElement&&a.parentElement.removeChild(a))}))},2409:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.resetState=function(){var e=document.getElementsByTagName("html")[0];for(var t in n)r(e,n[t]);var s=document.body;for(var a in o)r(s,o[a]);n={},o={}},t.log=function(){};var n={},o={};function r(e,t){e.classList.remove(t)}t.add=function(e,t){return r=e.classList,s="html"==e.nodeName.toLowerCase()?n:o,void t.split(" ").forEach((function(e){!function(e,t){e[t]||(e[t]=0),e[t]+=1}(s,e),r.add(e)}));var r,s},t.remove=function(e,t){return r=e.classList,s="html"==e.nodeName.toLowerCase()?n:o,void t.split(" ").forEach((function(e){!function(e,t){e[t]&&(e[t]-=1)}(s,e),0===s[e]&&r.remove(e)}));var r,s}},3721:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.resetState=function(){s=[]},t.log=function(){},t.handleBlur=i,t.handleFocus=u,t.markForFocusLater=function(){s.push(document.activeElement)},t.returnFocus=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=null;try{return void(0!==s.length&&(t=s.pop()).focus({preventScroll:e}))}catch(e){console.warn(["You tried to return focus to",t,"but it is not in the DOM anymore"].join(" "))}},t.popWithoutFocus=function(){s.length>0&&s.pop()},t.setupScopedFocus=function(e){a=e,window.addEventListener?(window.addEventListener("blur",i,!1),document.addEventListener("focus",u,!0)):(window.attachEvent("onBlur",i),document.attachEvent("onFocus",u))},t.teardownScopedFocus=function(){a=null,window.addEventListener?(window.removeEventListener("blur",i),document.removeEventListener("focus",u)):(window.detachEvent("onBlur",i),document.detachEvent("onFocus",u))};var o,r=(o=n(7845))&&o.__esModule?o:{default:o},s=[],a=null,l=!1;function i(){l=!0}function u(){if(l){if(l=!1,!a)return;setTimeout((function(){a.contains(document.activeElement)||((0,r.default)(a)[0]||a).focus()}),0)}}},9623:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.log=function(){console.log("portalOpenInstances ----------"),console.log(o.openInstances.length),o.openInstances.forEach((function(e){return console.log(e)})),console.log("end portalOpenInstances ----------")},t.resetState=function(){o=new n};var n=function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.register=function(e){-1===t.openInstances.indexOf(e)&&(t.openInstances.push(e),t.emit("register"))},this.deregister=function(e){var n=t.openInstances.indexOf(e);-1!==n&&(t.openInstances.splice(n,1),t.emit("deregister"))},this.subscribe=function(e){t.subscribers.push(e)},this.emit=function(e){t.subscribers.forEach((function(n){return n(e,t.openInstances.slice())}))},this.openInstances=[],this.subscribers=[]},o=new n;t.default=o},1112:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.canUseDOM=t.SafeNodeList=t.SafeHTMLCollection=void 0;var o,r=((o=n(8875))&&o.__esModule?o:{default:o}).default,s=r.canUseDOM?window.HTMLElement:{};t.SafeHTMLCollection=r.canUseDOM?window.HTMLCollection:{},t.SafeNodeList=r.canUseDOM?window.NodeList:{},t.canUseDOM=r.canUseDOM,t.default=s},8338:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=(0,r.default)(e);if(n.length){var o=void 0,a=t.shiftKey,l=n[0],i=n[n.length-1],u=s();if(e===u){if(!a)return;o=i}if(i!==u||a||(o=l),l===u&&a&&(o=i),o)return t.preventDefault(),void o.focus();var c=/(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);if(null!=c&&"Chrome"!=c[1]&&null==/\biPod\b|\biPad\b/g.exec(navigator.userAgent)){var d=n.indexOf(u);if(d>-1&&(d+=a?-1:1),void 0===(o=n[d]))return t.preventDefault(),void(o=a?i:l).focus();t.preventDefault(),o.focus()}}else t.preventDefault()};var o,r=(o=n(7845))&&o.__esModule?o:{default:o};function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;return e.activeElement.shadowRoot?s(e.activeElement.shadowRoot):e.activeElement}e.exports=t.default},7845:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function e(t){return[].slice.call(t.querySelectorAll("*"),0).reduce((function(t,n){return t.concat(n.shadowRoot?e(n.shadowRoot):[n])}),[]).filter(r)};var n=/input|select|textarea|button|object|iframe/;function o(e){var t=e.offsetWidth<=0&&e.offsetHeight<=0;if(t&&!e.innerHTML)return!0;try{var n=window.getComputedStyle(e),o=n.getPropertyValue("display");return t?"contents"!==o&&function(e,t){return"visible"!==t.getPropertyValue("overflow")||e.scrollWidth<=0&&e.scrollHeight<=0}(e,n):"none"===o}catch(e){return console.warn("Failed to inspect element style"),!1}}function r(e){var t=e.getAttribute("tabindex");null===t&&(t=void 0);var r=isNaN(t);return(r||t>=0)&&function(e,t){var r=e.nodeName.toLowerCase();return(n.test(r)&&!e.disabled||"a"===r&&e.href||t)&&function(e){for(var t=e,n=e.getRootNode&&e.getRootNode();t&&t!==document.body;){if(n&&t===n&&(t=n.host.parentNode),o(t))return!1;t=t.parentNode}return!0}(e)}(e,!r)}e.exports=t.default},3253:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r=(o=n(9983))&&o.__esModule?o:{default:o};t.default=r.default,e.exports=t.default},2473:e=>{"use strict";e.exports=function(){}},9196:e=>{"use strict";e.exports=window.React},1850:e=>{"use strict";e.exports=window.ReactDOM}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,o),s.exports}o.m=t,e=[],o.O=(t,n,r,s)=>{if(!n){var a=1/0;for(c=0;c<e.length;c++){for(var[n,r,s]=e[c],l=!0,i=0;i<n.length;i++)(!1&s||a>=s)&&Object.keys(o.O).every((e=>o.O[e](n[i])))?n.splice(i--,1):(l=!1,s<a&&(a=s));if(l){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[n,r,s]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={413:0,581:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,s,[a,l,i]=n,u=0;if(a.some((t=>0!==e[t]))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(i)var c=i(o)}for(t&&t(n);u<a.length;u++)s=a[u],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(c)},n=globalThis.webpackChunkgatherpress=globalThis.webpackChunkgatherpress||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[581],(()=>o(1817)));r=o.O(r)})();
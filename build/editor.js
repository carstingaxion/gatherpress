(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.domReady;var n=e.n(t);const o=window.wp.data;n()((()=>{const e=(0,o.select)("core/edit-post");if(!e)return;const t=(0,o.dispatch)("core/edit-post");e.isEditorSidebarOpened()?(t.openGeneralSidebar("edit-post/document"),t.toggleEditorPanelOpened("gp-event-settings/gp-event-settings")):(t.openGeneralSidebar(),t.toggleEditorPanelOpened("gp-event-settings/gp-event-settings"))}))})();
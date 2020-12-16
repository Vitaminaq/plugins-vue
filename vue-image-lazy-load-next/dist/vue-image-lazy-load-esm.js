function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var e=function(){function t(t){this.init(t)}return t.prototype.init=function(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,r=o.width*o.height;this.intersectionRatio=n?r/n:this.isIntersecting?1:0},t}(),n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var o=function(t){function o(e,n){var o=t.call(this)||this;return o.registry=[],o.init(e,n),o.options=n||{},o._callback=e,o._observationTargets=[],o._queuedEntries=[],o._rootMarginValues=o._parseRootMargin(o.options.rootMargin),o.thresholds=o._initThresholds(o.options.threshold),o.root=o.options.root||null,o.rootMargin=o._rootMarginValues.map((function(t){return t.value+t.unit})).join(" "),o._checkForIntersections=o.throttle(o._checkForIntersections.bind(o),o.THROTTLE_TIMEOUT),o}return function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}(o,t),o.prototype.init=function(t,e){if("function"!=typeof t)throw new Error("callback must be a function");if(e.root&&1!=e.root.nodeType)throw new Error("root must be an Element")},o.prototype.observe=function(t){if(this._observationTargets.some((function(e){return e.element==t})))return this;if(!t||1!=t.nodeType)throw new Error("target must be an Element");return this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections(),this},o.prototype._registerInstance=function(){return this.registry.indexOf(this)<0&&this.registry.push(this),this},o.prototype.unobserve=function(t){return this._observationTargets=this._observationTargets.filter((function(e){return e.element!=t})),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance()),this},o.prototype.disconnect=function(){return this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance(),this},o.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},o.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter((function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]}))},o.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map((function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}}));return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},o.prototype._monitorIntersections=function(){return this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(this.addEvent(window,"resize",this._checkForIntersections,!0),this.addEvent(document,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})))),this},o.prototype._unmonitorIntersections=function(){return this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,this.removeEvent(window,"resize",this._checkForIntersections,!0),this.removeEvent(document,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null)),this},o.prototype._checkForIntersections=function(){var t=this,n=this._rootIsInDom(),o=n?this._getRootRect():this.getEmptyRect();this._observationTargets.forEach((function(r){var i=r.element,s=t.getBoundingClientRect(i),c=t._rootContainsTarget(i),h=r.entry,u=n&&c&&t._computeTargetAndRootIntersection(i,o),A=r.entry=new e({time:t.now(),target:i,boundingClientRect:s,rootBounds:o,intersectionRect:u});h?n&&c?t._hasCrossedThreshold(h,A)&&t._queuedEntries.push(A):h&&h.isIntersecting&&t._queuedEntries.push(A):t._queuedEntries.push(A)}),this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},o.prototype._computeTargetAndRootIntersection=function(t,e){if("none"!=window.getComputedStyle(t).display){for(var n=this.getBoundingClientRect(t),o=this.getParentNode(t),r=!1;!r;){var i=null,s=1==o.nodeType?window.getComputedStyle(o):{};if("none"==s.display)return;if(o==this.root||o==document?(r=!0,i=e):o!=document.body&&o!=document.documentElement&&"visible"!=s.overflow&&(i=this.getBoundingClientRect(o)),i&&!(n=this.computeRectIntersection(i,n)))break;o=this.getParentNode(o)}return n}},o.prototype._getRootRect=function(){var t;if(this.root)t=this.getBoundingClientRect(this.root);else{var e=document.documentElement,n=document.body;t={top:0,left:0,right:e.clientWidth||n.clientWidth,width:e.clientWidth||n.clientWidth,bottom:e.clientHeight||n.clientHeight,height:e.clientHeight||n.clientHeight}}return this._expandRectByRootMargin(t)},o.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map((function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100})),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3],width:0,height:0};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},o.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var r=0;r<this.thresholds.length;r++){var i=this.thresholds[r];if(i==n||i==o||i<n!=i<o)return!0}},o.prototype._rootIsInDom=function(){return!this.root||this.containsDeep(document,this.root)},o.prototype._rootContainsTarget=function(t){return this.containsDeep(this.root||document,t)},o.prototype._unregisterInstance=function(){var t=this.registry.indexOf(this);-1!=t&&this.registry.splice(t,1)},o.prototype.now=function(){return window.performance&&performance.now&&performance.now()},o.prototype.throttle=function(t,e){var n=null;return function(){n||(n=setTimeout((function(){t(),n=null}),e))}},o.prototype.addEvent=function(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)},o.prototype.removeEvent=function(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)},o.prototype.computeRectIntersection=function(t,e){var n=Math.max(t.top,e.top),o=Math.min(t.bottom,e.bottom),r=Math.max(t.left,e.left),i=Math.min(t.right,e.right),s=i-r,c=o-n;return s>=0&&c>=0&&{top:n,bottom:o,left:r,right:i,width:s,height:c}},o.prototype.getBoundingClientRect=function(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):this.getEmptyRect()},o.prototype.getEmptyRect=function(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}},o.prototype.containsDeep=function(t,e){for(var n=e;n;){if(n==t)return!0;n=this.getParentNode(n)}return!1},o.prototype.getParentNode=function(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e},o}((function(){this.THROTTLE_TIMEOUT=100,this.POLL_INTERVAL=null,this.USE_MUTATION_OBSERVER=!0})),r=function(){function t(){this.initPolyfill()}return t.prototype.initPolyfill=function(){return window&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&"isIntersecting"in window.IntersectionObserverEntry.prototype?this:window&&"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype?("isIntersecting"in window.IntersectionObserverEntry.prototype||this.polyfillIsIntersecting(),this):(this.polyfillAll(),this)},t.prototype.polyfillIsIntersecting=function(){return console.log("无isIntersecting属性，低级兼容模式开启"),Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}),this},t.prototype.polyfillAll=function(){console.log("当前浏览器不支持IntersectionObserver，高级兼容模式开启"),this.injectWindow()},t.prototype.injectWindow=function(){window.IntersectionObserver=o,window.IntersectionObserverEntry=e},t}(),i=function(){function t(t,e){this.obOptions={root:null,rootMargin:"0px",threshold:0},this.othOptions={},this.intersectionObserver={},this.intersectionOberserPolyfill={},Object.assign(this.obOptions,e.observerOptions),Object.assign(this.obOptions,{lazyImg:e.lazyImg,delayTime:e.delayTime}),this.createObserver(t)}return t.prototype.createObserver=function(t){var e=this;this.intersectionOberserPolyfill=new r,this.intersectionObserver=new IntersectionObserver((function(n){return t(n,e)}),this.obOptions)},t.prototype.subscribe=function(t){this.intersectionObserver.observe(t)},t.prototype.unSubscribe=function(t){this.intersectionObserver.unobserve(t)},t.prototype.remove=function(){this.intersectionObserver.disconnect(),delete this.intersectionObserver,delete this.intersectionOberserPolyfill},t}(),s={},c=function(t,e){t.forEach((function(t,n){if(t.isIntersecting){var o=t.target.getAttribute("data-lazy");if(t.target.src===o)return;var r="key"+(n+1)+t.intersectionRect.top+"\n\t\t\t\t"+t.intersectionRect.bottom+t.time;s[r]=setTimeout((function(){t.target.src=o,t.target.removeAttribute("data-lazy"),e.unSubscribe(t.target),clearTimeout(s[r]),delete s[r]}),e.othOptions.delayTime||500*Math.random())}}))},h=function(){function t(t,e,n){this.root={},this.options={},this.saveDomMessage(t,n.lazyImg),this.el=t,this.root=e,this.subscribeOberser()}return t.prototype.saveDomMessage=function(t,e){return t.setAttribute("data-lazy",t.src),t.src=e,this},t.prototype.subscribeOberser=function(){Object.assign(this.options,{root:this.root.$el}),this.root.$ObserverInview||(this.root.$ObserverInview=new i(c,this.options)),this.root.$ObserverInview.subscribe(this.el)},t.prototype.destroy=function(){this.root.$ObserverInview&&this.root.$ObserverInview.unSubscribe(this.el)},t}(),u={observerOptions:{},delayTime:0,lazyImg:"data:image/png;base64,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"},A={beforeMount:function(t,e,n,o){if(/.(jpg|gif|png|jepg)/g.test(t.src)){if("img"!==t.tagName.toLocaleLowerCase())throw new Error("this dom is not img");!function(t,e,n){var o=n.dirs;if(!o||!o.length)throw new Error("this is not vue dom");var r=o[0].instance;if(!r)throw new Error("this is not vue dom");var i=r.$root;if(!i)throw new Error("no found $root");if(!t.oberserDom){var s=e.value&&e.value.url||"";s&&(u.lazyImg=s),t.oberserDom=new h(t,i,u)}}(t,e,n)}else console.warn("this src is not img address")},beforeUnmount:function(t){t.oberserDom&&(t.oberserDom.destroy(),delete t.oberserDom)}},a={install:function(e,n){if(!["undefined","object"].includes(t(n)))throw new Error("plase use correct options in vue.use");n&&Object.keys(n).forEach((function(t){var e=t;u[e]=n[e]})),e.directive("img-lazy-load",A)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(a);export default a;export{A as directive};

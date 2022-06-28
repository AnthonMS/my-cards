var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},n={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},r={common:n};const i={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:n,default:r})};function o(t,e="",n=""){const r=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let o;try{o=t.split(".").reduce((t,e)=>t[e],i[r])}catch(e){o=t.split(".").reduce((t,e)=>t[e],i.en)}return void 0===o&&(o=t.split(".").reduce((t,e)=>t[e],i.en)),""!==e&&""!==n&&(o=o.replace(e,n)),o}
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
***************************************************************************** */function s(t,e,n,r){var i,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},d=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${d}--\x3e`,u=new RegExp(`${d}|${c}`);class h{constructor(t,e){this.parts=[],this.element=e;const n=[],r=[],i=document.createTreeWalker(e.content,133,null,!1);let o=0,s=-1,a=0;const{strings:l,values:{length:c}}=t;for(;a<c;){const t=i.nextNode();if(null!==t){if(s++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let r=0;for(let t=0;t<n;t++)p(e[t].name,"$lit$")&&r++;for(;r-- >0;){const e=l[a],n=f.exec(e)[2],r=n.toLowerCase()+"$lit$",i=t.getAttribute(r);t.removeAttribute(r);const o=i.split(u);this.parts.push({type:"attribute",index:s,name:n,strings:o}),a+=o.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(d)>=0){const r=t.parentNode,i=e.split(u),o=i.length-1;for(let e=0;e<o;e++){let n,o=i[e];if(""===o)n=g();else{const t=f.exec(o);null!==t&&p(t[2],"$lit$")&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),n=document.createTextNode(o)}r.insertBefore(n,t),this.parts.push({type:"node",index:++s})}""===i[o]?(r.insertBefore(g(),t),n.push(t)):t.data=i[o],a+=o}}else if(8===t.nodeType)if(t.data===d){const e=t.parentNode;null!==t.previousSibling&&s!==o||(s++,e.insertBefore(g(),t)),o=s,this.parts.push({type:"node",index:s}),null===t.nextSibling?t.data="":(n.push(t),s--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(d,e+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=r.pop()}for(const t of n)t.parentNode.removeChild(t)}}const p=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:n},parts:r}=t,i=document.createTreeWalker(n,133,null,!1);let o=_(r),s=r[o],a=-1,l=0;const d=[];let c=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==s&&s.index===a;)s.index=null!==c?-1:s.index-l,o=_(r,o),s=r[o]}d.forEach(t=>t.parentNode.removeChild(t))}const y=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,133,null,!1);for(;n.nextNode();)e++;return e},_=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(m(e))return n}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const b=new WeakMap,w=t=>"function"==typeof t&&b.has(t),S={},x={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class ${constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let i,o=0,s=0,l=r.nextNode();for(;o<n.length;)if(i=n[o],m(i)){for(;s<i.index;)s++,"TEMPLATE"===l.nodeName&&(e.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=e.pop(),l=r.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));o++}else this.__parts.push(void 0),o++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const P=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),C=` ${d} `;class N{constructor(t,e,n,r){this.strings=t,this.values=e,this.type=n,this.processor=r}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let r=0;r<t;r++){const t=this.strings[r],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const o=f.exec(t);e+=null===o?t+(n?C:c):t.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+d}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==P&&(e=P.createHTML(e)),t.innerHTML=e,t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const M=t=>null===t||!("object"==typeof t||"function"==typeof t),T=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class k{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new E(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!T(t))return t}let r="";for(let i=0;i<e;i++){r+=t[i];const e=n[i];if(void 0!==e){const t=e.value;if(M(t)||!T(t))r+="string"==typeof t?t:String(t);else for(const e of t)r+="string"==typeof e?e:String(e)}}return r+=t[e],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===S||M(t)&&t===this.value||(this.value=t,w(t)||(this.committer.dirty=!0))}commit(){for(;w(this.value);){const t=this.value;this.value=S,t(this)}this.value!==S&&this.committer.commit()}}class A{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}const t=this.__pendingValue;t!==S&&(M(t)?t!==this.value&&this.__commitText(t):t instanceof N?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):T(t)?this.__commitIterable(t):t===x?(this.value=x,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof $&&this.value.template===e)this.value.update(t.values);else{const n=new $(e,t.processor,this.options),r=n._clone();n.update(t.values),this.__commitNode(r),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,r=0;for(const i of t)n=e[r],void 0===n&&(n=new A(this.options),e.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(e[r-1])),n.setValue(i),n.commit(),r++;r<e.length&&(e.length=r,this.clear(n&&n.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class O{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=S}}class D extends k{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new V(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class V extends E{}let R=!1;(()=>{try{const t={get capture(){return R=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class Y{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=H(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=S}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const H=t=>t&&(R?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function U(t){let e=B.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},B.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(d);return n=e.keyString.get(r),void 0===n&&(n=new h(t,t.getTemplateElement()),e.keyString.set(r,n)),e.stringsArray.set(t.strings,n),n}const B=new Map,I=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const L=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,n,r){const i=e[0];if("."===i){return new D(t,e.slice(1),n).parts}if("@"===i)return[new Y(t,e.slice(1),r.eventContext)];if("?"===i)return[new O(t,e.slice(1),n)];return new k(t,e,n).parts}handleTextExpression(t){return new A(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const z=(t,...e)=>new N(t,e,"html",L)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,F=(t,e)=>`${t}--${e}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const W=t=>e=>{const n=F(e.type,t);let r=B.get(n);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},B.set(n,r));let i=r.stringsArray.get(e.strings);if(void 0!==i)return i;const o=e.strings.join(d);if(i=r.keyString.get(o),void 0===i){const n=e.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(n,t),i=new h(e,n),r.keyString.set(o,i)}return r.stringsArray.set(e.strings,i),i},q=["html","svg"],J=new Set,Z=(t,e,n)=>{J.add(t);const r=n?n.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:o}=i;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(r,t);const s=document.createElement("style");for(let t=0;t<o;t++){const e=i[t];e.parentNode.removeChild(e),s.textContent+=e.textContent}(t=>{q.forEach(e=>{const n=B.get(F(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),v(t,n)})})})(t);const a=r.content;n?function(t,e,n=null){const{element:{content:r},parts:i}=t;if(null==n)return void r.appendChild(e);const o=document.createTreeWalker(r,133,null,!1);let s=_(i),a=0,l=-1;for(;o.nextNode();){l++;for(o.currentNode===n&&(a=y(e),n.parentNode.insertBefore(e,n));-1!==s&&i[s].index===l;){if(a>0){for(;-1!==s;)i[s].index+=a,s=_(i,s);return}s=_(i,s)}}}(n,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(n){a.insertBefore(s,a.firstChild);const t=new Set;t.add(s),v(n,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const G={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},X=(t,e)=>e!==t&&(e==e||t==t),K={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:X};class Q extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const r=this._attributeNameForProperty(n,e);void 0!==r&&(this._attributeToPropertyMap.set(r,n),t.push(r))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=K){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,n,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(r){const i=this[t];this[e]=r,this.requestUpdateInternal(t,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||K}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=X){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,r=e.converter||G,i="function"==typeof r?r:r.fromAttribute;return i?i(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,r=e.converter;return(r&&r.toAttribute||G.toAttribute)(t,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=K){const r=this.constructor,i=r._attributeNameForProperty(t,n);if(void 0!==i){const t=r._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const n=this.constructor,r=n._attributeToPropertyMap.get(t);if(void 0!==r){const t=n.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=n._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,n){let r=!0;if(void 0!==t){const i=this.constructor;n=n||i.getPropertyOptions(t),i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Q.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const tt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(n){n.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}};function et(t){return(e,n)=>void 0!==n?((t,e,n)=>{e.constructor.createProperty(n,t)})(t,e,n):tt(t,e)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const nt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol();class it{constructor(t,e){if(e!==rt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ot=(t,...e)=>{const n=e.reduce((e,n,r)=>e+(t=>{if(t instanceof it)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[r+1],t[0]);return new it(n,rt)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const st={};class at extends Q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,n)=>t.reduceRight((t,n)=>Array.isArray(n)?e(n,t):(t.add(n),t),n),n=e(t,new Set),r=[];n.forEach(t=>r.unshift(t)),this._styles=r}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!nt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new it(String(e),rt)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==st&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return st}}at.finalized=!0,at.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const r=n.scopeName,i=I.has(e),o=j&&11===e.nodeType&&!!e.host,s=o&&!J.has(r),a=s?document.createDocumentFragment():e;if(((t,e,n)=>{let r=I.get(e);void 0===r&&(l(e,e.firstChild),I.set(e,r=new A(Object.assign({templateFactory:U},n))),r.appendInto(e)),r.setValue(t),r.commit()})(t,a,Object.assign({templateFactory:W(r)},n)),s){const t=I.get(a);I.delete(a);const n=t.value instanceof $?t.value.template:void 0;Z(r,a,n),l(e,e.firstChild),e.appendChild(a),I.set(e,t)}!i&&o&&window.ShadyCSS.styleElement(e.host)},at.shadowRootOptions={mode:"open"};var lt=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,dt="[^\\s]+",ct=/\[([^]*?)\]/gm;function ut(t,e){for(var n=[],r=0,i=t.length;r<i;r++)n.push(t[r].substr(0,e));return n}var ht=function(t){return function(e,n){var r=n[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return r>-1?r:null}};function pt(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var r=0,i=e;r<i.length;r++){var o=i[r];for(var s in o)t[s]=o[s]}return t}var mt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],gt=["January","February","March","April","May","June","July","August","September","October","November","December"],ft=ut(gt,3),vt={dayNamesShort:ut(mt,3),dayNames:mt,monthNamesShort:ft,monthNames:gt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},yt=pt({},vt),_t=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},bt={D:function(t){return String(t.getDate())},DD:function(t){return _t(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return _t(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return _t(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return _t(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return _t(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return _t(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return _t(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return _t(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return _t(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return _t(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return _t(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+_t(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+_t(Math.floor(Math.abs(e)/60),2)+":"+_t(Math.abs(e)%60,2)}},wt=function(t){return+t-1},St=[null,"[1-9]\\d?"],xt=[null,dt],$t=["isPm",dt,function(t,e){var n=t.toLowerCase();return n===e.amPm[0]?0:n===e.amPm[1]?1:null}],Pt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var n=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?n:-n}return 0}],Ct=(ht("monthNamesShort"),ht("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Nt,Mt,Tt=function(t,e,n){if(void 0===e&&(e=Ct.default),void 0===n&&(n={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var r=[];e=(e=Ct[e]||e).replace(ct,(function(t,e){return r.push(e),"@@@"}));var i=pt(pt({},yt),n);return(e=e.replace(lt,(function(e){return bt[e](t,i)}))).replace(/@@@/g,(function(){return r.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();(Mt=Nt||(Nt={})).language="language",Mt.system="system",Mt.comma_decimal="comma_decimal",Mt.decimal_comma="decimal_comma",Mt.space_comma="space_comma",Mt.none="none";var kt=!1;if("undefined"!=typeof window){var Et={get passive(){kt=!0}};window.addEventListener("testPassive",null,Et),window.removeEventListener("testPassive",null,Et)}var At="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),Ot=[],Dt=!1,Vt=-1,Rt=void 0,Yt=void 0,Ht=void 0,Ut=function(t){return Ot.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Bt=function(t){var e=t||window.event;return!!Ut(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},It=function(t,e){if(t){if(!Ot.some((function(e){return e.targetElement===t}))){var n={targetElement:t,options:e||{}};Ot=[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(Ot),[n]),At?window.requestAnimationFrame((function(){if(void 0===Yt){Yt={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,n=t.scrollX,r=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-n,setTimeout((function(){return window.requestAnimationFrame((function(){var t=r-window.innerHeight;t&&e>=r&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===Ht){var e=!!t&&!0===t.reserveScrollBarGap,n=window.innerWidth-document.documentElement.clientWidth;if(e&&n>0){var r=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);Ht=document.body.style.paddingRight,document.body.style.paddingRight=r+n+"px"}}void 0===Rt&&(Rt=document.body.style.overflow,document.body.style.overflow="hidden")}(e),At&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(Vt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var n=t.targetTouches[0].clientY-Vt;!Ut(t.target)&&(e&&0===e.scrollTop&&n>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&n<0?Bt(t):t.stopPropagation())}(e,t)},Dt||(document.addEventListener("touchmove",Bt,kt?{passive:!1}:void 0),Dt=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},Lt=function(t){t?(Ot=Ot.filter((function(e){return e.targetElement!==t})),At&&(t.ontouchstart=null,t.ontouchmove=null,Dt&&0===Ot.length&&(document.removeEventListener("touchmove",Bt,kt?{passive:!1}:void 0),Dt=!1)),At?function(){if(void 0!==Yt){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=Yt.position,document.body.style.top=Yt.top,document.body.style.left=Yt.left,window.scrollTo(e,t),Yt=void 0}}():(void 0!==Ht&&(document.body.style.paddingRight=Ht,Ht=void 0),void 0!==Rt&&(document.body.style.overflow=Rt,Rt=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};console.info(`%c  ---- MY-SLIDER ---- \n%c  ${o("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let zt=class extends at{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!(t.entity.includes("input_number.")||t.entity.includes("light.")||t.entity.includes("media_player.")||t.entity.includes("cover.")||t.entity.includes("fan.")||t.entity.includes("switch.")||t.entity.includes("lock.")))throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&function(t,e,n){if(e.has("config")||n)return!0;if(t.config.entity){var r=e.get("hass");return!r||r.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const n=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",r=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+n]);var i=e.step?e.step:"1";n.includes("input_number.")&&(i=e.step?e.step:r.attributes.step);var o=e.minBar?e.minBar:0,s=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100,d=e.width?e.width:"100%",c=e.height?e.height:"50px",u=e.radius?e.radius:"4px",h=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:c;"0"!=f&&(f+="deg");var y=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",_=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",b=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",S=e.border?e.border:"0",x=e.thumbWidth?e.thumbWidth:"25px",$=e.thumbHeight?e.thumbHeight:"80px",P=e.thumbColor?e.thumbColor:"#FFFFFF",C=e.thumbColorOff?e.thumbColorOff:"#969696",N=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",M=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",T=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",k=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",E=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",A=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",O=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",D=!!e.lockTrack&&e.lockTrack,V=`\n\t\t\t--slider-width: ${d};\n\t\t\t--slider-width-inverse: -${d};\n\t\t\t--slider-height: ${c};\n\t\t\t--slider-main-color: ${"off"===r.state||"locked"===r.state||null==r.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${y};\n\t\t\t--slider-main-color-off: ${b};\n\t\t\t--slider-secondary-color: ${"off"===r.state||"locked"===r.state||null==r.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${_};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${u};\n\t\t\t--border: ${S};\n\n\t\t\t--thumb-width: ${x};\n\t\t\t--thumb-height: ${$};\n\t\t\t--thumb-color: ${"off"===r.state||null==r.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${P};\n\t\t\t--thumb-color-off: ${C};\n\t\t\t--thumb-horizontal-padding: ${N};\n\t\t\t--thumb-vertical-padding: ${M};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${h};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${T};\n\t\t\t--thumb-border-right: ${k};\n\t\t\t--thumb-border-left: ${E};\n\t\t\t--thumb-border-top: ${A};\n\t\t\t--thumb-border-bottom: ${O};\n\t\t\t\n\t\t\t--lock-track-container: ${D?"none":"auto"};\n\t\t`;const R=t=>{n.includes("light.")?"Warmth"==e.function?this._setWarmth(r,t.target,a,l):this._setBrightness(r,t.target,a,l):n.includes("input_number.")?this._setInputNumber(r,t.target,a,l):n.includes("media_player.")?this._setMediaVolume(r,t.target,a,l):n.includes("cover.")?this._setCover(r,t.target,a,l):n.includes("fan.")?this._setFan(r,t.target,a,l):n.includes("switch.")?this._setSwitch(r,t.target,a,l,o,s):n.includes("lock.")&&this._setLock(r,t.target,a,l,o,s)},Y=t=>{e.intermediate&&R(t)},H=t=>{e.intermediate||R(t)},U=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?It(window):Lt(window)};if(n.includes("light."))return"Warmth"==e.function?z`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${r.state}" style="${V}"
								min="${r.attributes.min_mireds}" max="${r.attributes.max_mireds}"
								step="${i}" .value="${"off"===r.state?0:r.attributes.color_temp}"
								@input=${Y} @change=${H}
								@touchstart=${e.toggle_scroll?U:null}
								@touchend=${e.toggle_scroll?U:null} >
						</div>
					</ha-card>
				`:z`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${r.state}" style="${V}"
								step="${i}" .value="${"off"===r.state?0:Math.round(r.attributes.brightness/2.56)}"
								@input=${Y} @change=${H}
								@touchstart=${e.toggle_scroll?U:null}
								@touchend=${e.toggle_scroll?U:null} >
						</div>
					</ha-card>
				`;if(n.includes("input_number."))return z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${r.state}" style="${V}"
							min="${r.attributes.min}" max="${r.attributes.max}"
							step="${i}" .value="${r.state}"
							@input=${Y} @change=${H}
							@touchstart=${e.toggle_scroll?U:null}
							@touchend=${e.toggle_scroll?U:null} >
					</div>
				</ha-card>
			`;if(n.includes("media_player.")){var B=0;if(null!=r.attributes.volume_level)B=Number(100*r.attributes.volume_level);return z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${r.state}" style="${V}"
							min="${o}" max="${s}" step="${i}" .value="${B}"
							@input=${Y} @change=${H}
							@touchstart=${e.toggle_scroll?U:null}
							@touchend=${e.toggle_scroll?U:null} >
					</div>
				</ha-card>
			`}return n.includes("cover.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${r.state}" style="${V}"
							min="${o}" max="${s}" step="${i}"
							.value="${r.attributes.current_position}"
							@input=${Y} @change=${H}
							@touchstart=${e.toggle_scroll?U:null}
							@touchend=${e.toggle_scroll?U:null} >
					</div>
				</ha-card>
			`:n.includes("fan.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${r.state}" style="${V}"
							min="${o}" max="${s}" step="${i}"
							.value="${r.attributes.percentage}"
							@input=${Y} @change=${H}
							@touchstart=${e.toggle_scroll?U:null}
							@touchend=${e.toggle_scroll?U:null} >
					</div>
				</ha-card>
			`:n.includes("switch.")||n.includes("lock.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${r.state}" style="${V}"
							min="${o}" max="${s}" step="${i}" .value="${o}"
							@input=${Y} @change=${H}
							@touchstart=${e.toggle_scroll?U:null}
							@touchend=${e.toggle_scroll?U:null} >
					</div>
				</ha-card>
			`:void 0}_setBrightness(t,e,n,r){var i=e.value;i>r?i=r:i<n&&(i=n),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*i}),e.value=i}_setWarmth(t,e,n,r){var i=e.value;i>r?i=r:i<n&&(i=n),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:i}),e.value=i}_setInputNumber(t,e,n,r){var i=e.value;i>r?i=r:i<n&&(i=n),this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:i}),e.value=i}_setFan(t,e,n,r){var i=e.value;i>r?i=r:i<n&&(i=n),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:i}),e.value=i}_setCover(t,e,n,r){var i=e.value;i>r?i=r:i<n&&(i=n),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:i}),e.value=i}_setMediaVolume(t,e,n,r){var i=e.value;i>r?i=r:i<n&&(i=n),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:i/100}),e.value=i}_setSwitch(t,e,n,r,i,o){var s=e.value,a=Math.min(r,o);Number(a)<=s&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(n,i))}_setLock(t,e,n,r,i,o){var s=e.value,a=Math.min(r,o);if(Number(a)<=s){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(n,i))}static get styles(){return ot`
			.slider-container {
				height: var(--container-height);
				position: relative;
				overflow: hidden;
				border-radius: var(--slider-radius);
			}

			.slider-container input[type="range"] {
				outline: 0;
				border: var(--border);
				width: var(--slider-width);
				height: var(--slider-height);
				border-radius: var(--slider-radius);
				background-color: var(--slider-secondary-color); /*Remaining Slider color*/
				margin: 0;
				transition: box-shadow 0.2s ease-in-out;
				overflow: hidden;
				-webkit-appearance: none;
				position: absolute;
				top: var(--top);
				bottom: var(--bottom);
				right: var(--right);
				left: var(--left);
				-webkit-transform: rotate(var(--rotate));
				-moz-transform: rotate(var(--rotate));
				-o-transform: rotate(var(--rotate));
				-ms-transform: rotate(var(--rotate));
				transform: rotate(var(--rotate));
				pointer-events: var(--lock-track-container);
			}

			.slider-container input[type="range"]::-webkit-slider-runnable-track {
				height: var(--slider-height);
				-webkit-appearance: none;
				color: var(--slider-main-color);
				transition: box-shadow 0.2s ease-in-out;
			}

			.slider-container input[type="range"]::-webkit-slider-thumb {
				width: var(--thumb-width);
				height: var(--thumb-height);
				-webkit-appearance: none;
				cursor: ew-resize;
				border-radius: 0;
				transition: box-shadow 0.2s ease-in-out;
				position: relative;

				box-shadow: -3500px 0 0 3500px var(--slider-main-color), inset 0 0 0 25px var(--thumb-color);

				top: var(--thumb-top);
				border-right: var(--thumb-border-right);
				border-left: var(--thumb-border-left);
				border-top: var(--thumb-border-top);
				border-bottom: var(--thumb-border-bottom);
				pointer-events: auto;
			}

			.slider-container input[type=range]::-moz-range-thumb {
			  width: calc(var(--thumb-width) / 4);
			  height: calc(var(--thumb-height) / 2);
			  box-shadow: -3500px 10px 0 3500px var(--slider-main-color), inset 0 0 0 25px var(--thumb-color);
			  top: var(--thumb-top);
			  cursor: ew-resize;
			  border-radius: 0;
			  transition: box-shadow 0.2s ease-in-out;
			  position: relative;
			  border-radius: 0;
			  border-right: var(--thumb-border-right);
			  border-left: var(--thumb-border-left);
			  border-top: var(--thumb-border-top);
			  border-bottom: var(--thumb-border-bottom);
			  pointer-events: auto;
			}

			.slider-container input[type="range"]::-webkit-slider-thumb:hover {
				cursor: default;
			}

			.slider-container input[type="range"]:hover {
			  cursor: default;
			}
		`}};var Ft,jt;s([et({attribute:!1})],zt.prototype,"hass",void 0),s([et({attribute:!1,hasChanged:null==Ft?void 0:Ft.hasChanged})],zt.prototype,"config",void 0),zt=s([(jt="my-slider",t=>"function"==typeof t?((t,e)=>(window.customElements.define(t,e),e))(jt,t):((t,e)=>{const{kind:n,elements:r}=e;return{kind:n,elements:r,finisher(e){window.customElements.define(t,e)}}})(jt,t))],zt),console.info(`%c  ---- MY-CARDS ---- \n%c  ${o("common.version")} 1.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{zt as MySlider};

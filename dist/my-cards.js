var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},n={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},o={common:n};const i={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:n,default:o})};function r(t,e="",n=""){const o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce((t,e)=>t[e],i[o])}catch(e){r=t.split(".").reduce((t,e)=>t[e],i.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],i.en)),""!==e&&""!==n&&(r=r.replace(e,n)),r}
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
***************************************************************************** */function s(t,e,n,o){var i,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(r<3?i(s):r>3?i(e,n,s):i(e,n))||s);return r>3&&s&&Object.defineProperty(e,n,s),s
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
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},c=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${c}--\x3e`,u=new RegExp(`${c}|${d}`);class h{constructor(t,e){this.parts=[],this.element=e;const n=[],o=[],i=document.createTreeWalker(e.content,133,null,!1);let r=0,s=-1,a=0;const{strings:l,values:{length:d}}=t;for(;a<d;){const t=i.nextNode();if(null!==t){if(s++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let o=0;for(let t=0;t<n;t++)p(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=l[a],n=f.exec(e)[2],o=n.toLowerCase()+"$lit$",i=t.getAttribute(o);t.removeAttribute(o);const r=i.split(u);this.parts.push({type:"attribute",index:s,name:n,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const o=t.parentNode,i=e.split(u),r=i.length-1;for(let e=0;e<r;e++){let n,r=i[e];if(""===r)n=g();else{const t=f.exec(r);null!==t&&p(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),n=document.createTextNode(r)}o.insertBefore(n,t),this.parts.push({type:"node",index:++s})}""===i[r]?(o.insertBefore(g(),t),n.push(t)):t.data=i[r],a+=r}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&s!==r||(s++,e.insertBefore(g(),t)),r=s,this.parts.push({type:"node",index:s}),null===t.nextSibling?t.data="":(n.push(t),s--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=o.pop()}for(const t of n)t.parentNode.removeChild(t)}}const p=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:n},parts:o}=t,i=document.createTreeWalker(n,133,null,!1);let r=b(o),s=o[r],a=-1,l=0;const c=[];let d=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-l,r=b(o,r),s=o[r]}c.forEach(t=>t.parentNode.removeChild(t))}const y=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,133,null,!1);for(;n.nextNode();)e++;return e},b=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(m(e))return n}return-1};
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
const _=new WeakMap,w=t=>(...e)=>{const n=t(...e);return _.set(n,!0),n},S=t=>"function"==typeof t&&_.has(t),x={},$={};
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
class C{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let i,r=0,s=0,l=o.nextNode();for(;r<n.length;)if(i=n[r],m(i)){for(;s<i.index;)s++,"TEMPLATE"===l.nodeName&&(e.push(l),o.currentNode=l.content),null===(l=o.nextNode())&&(o.currentNode=e.pop(),l=o.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));r++}else this.__parts.push(void 0),r++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const P=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),T=` ${c} `;class k{constructor(t,e,n,o){this.strings=t,this.values=e,this.type=n,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let o=0;o<t;o++){const t=this.strings[o],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const r=f.exec(t);e+=null===r?t+(n?T:d):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+c}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==P&&(e=P.createHTML(e)),t.innerHTML=e,t}}
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
 */const N=t=>null===t||!("object"==typeof t||"function"==typeof t),M=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class E{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new A(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!M(t))return t}let o="";for(let i=0;i<e;i++){o+=t[i];const e=n[i];if(void 0!==e){const t=e.value;if(N(t)||!M(t))o+="string"==typeof t?t:String(t);else for(const e of t)o+="string"==typeof e?e:String(e)}}return o+=t[e],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class A{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===x||N(t)&&t===this.value||(this.value=t,S(t)||(this.committer.dirty=!0))}commit(){for(;S(this.value);){const t=this.value;this.value=x,t(this)}this.value!==x&&this.committer.commit()}}class O{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}const t=this.__pendingValue;t!==x&&(N(t)?t!==this.value&&this.__commitText(t):t instanceof k?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):M(t)?this.__commitIterable(t):t===$?(this.value=$,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof C&&this.value.template===e)this.value.update(t.values);else{const n=new C(e,t.processor,this.options),o=n._clone();n.update(t.values),this.__commitNode(o),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,o=0;for(const i of t)n=e[o],void 0===n&&(n=new O(this.options),e.push(n),0===o?n.appendIntoPart(this):n.insertAfterPart(e[o-1])),n.setValue(i),n.commit(),o++;o<e.length&&(e.length=o,this.clear(n&&n.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class D{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=x}}class V extends E{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new H(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class H extends A{}let R=!1;(()=>{try{const t={get capture(){return R=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class Y{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=L(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=x}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const L=t=>t&&(R?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function U(t){let e=I.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},I.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(c);return n=e.keyString.get(o),void 0===n&&(n=new h(t,t.getTemplateElement()),e.keyString.set(o,n)),e.stringsArray.set(t.strings,n),n}const I=new Map,B=new WeakMap;
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
 */const j=new
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
class{handleAttributeExpressions(t,e,n,o){const i=e[0];if("."===i){return new V(t,e.slice(1),n).parts}if("@"===i)return[new Y(t,e.slice(1),o.eventContext)];if("?"===i)return[new D(t,e.slice(1),n)];return new E(t,e,n).parts}handleTextExpression(t){return new O(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const F=(t,...e)=>new k(t,e,"html",j)
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
 */,z=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const W=t=>e=>{const n=z(e.type,t);let o=I.get(n);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},I.set(n,o));let i=o.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(c);if(i=o.keyString.get(r),void 0===i){const n=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(n,t),i=new h(e,n),o.keyString.set(r,i)}return o.stringsArray.set(e.strings,i),i},J=["html","svg"],Z=new Set,X=(t,e,n)=>{Z.add(t);const o=n?n.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:r}=i;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(o,t);const s=document.createElement("style");for(let t=0;t<r;t++){const e=i[t];e.parentNode.removeChild(e),s.textContent+=e.textContent}(t=>{J.forEach(e=>{const n=I.get(z(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),v(t,n)})})})(t);const a=o.content;n?function(t,e,n=null){const{element:{content:o},parts:i}=t;if(null==n)return void o.appendChild(e);const r=document.createTreeWalker(o,133,null,!1);let s=b(i),a=0,l=-1;for(;r.nextNode();){l++;for(r.currentNode===n&&(a=y(e),n.parentNode.insertBefore(e,n));-1!==s&&i[s].index===l;){if(a>0){for(;-1!==s;)i[s].index+=a,s=b(i,s);return}s=b(i,s)}}}(n,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(n){a.insertBefore(s,a.firstChild);const t=new Set;t.add(s),v(n,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const G={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},K=(t,e)=>e!==t&&(e==e||t==t),Q={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:K};class tt extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const o=this._attributeNameForProperty(n,e);void 0!==o&&(this._attributeToPropertyMap.set(o,n),t.push(o))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,n,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(o){const i=this[t];this[e]=o,this.requestUpdateInternal(t,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=K){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,o=e.converter||G,i="function"==typeof o?o:o.fromAttribute;return i?i(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,o=e.converter;return(o&&o.toAttribute||G.toAttribute)(t,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=Q){const o=this.constructor,i=o._attributeNameForProperty(t,n);if(void 0!==i){const t=o._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const n=this.constructor,o=n._attributeToPropertyMap.get(t);if(void 0!==o){const t=n.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=n._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,n){let o=!0;if(void 0!==t){const i=this.constructor;n=n||i.getPropertyOptions(t),i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}tt.finalized=!0;
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
const et=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:o}=e;return{kind:n,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e),nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(n){n.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}};function ot(t){return(e,n)=>void 0!==n?((t,e,n)=>{e.constructor.createProperty(n,t)})(t,e,n):nt(t,e)}function it(t){return ot({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const rt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol();class at{constructor(t,e){if(e!==st)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const n=e.reduce((e,n,o)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[o+1],t[0]);return new at(n,st)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ct={};class dt extends tt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,n)=>t.reduceRight((t,n)=>Array.isArray(n)?e(n,t):(t.add(n),t),n),n=e(t,new Set),o=[];n.forEach(t=>o.unshift(t)),this._styles=o}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!rt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new at(String(e),st)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==ct&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return ct}}dt.finalized=!0,dt.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const o=n.scopeName,i=B.has(e),r=q&&11===e.nodeType&&!!e.host,s=r&&!Z.has(o),a=s?document.createDocumentFragment():e;if(((t,e,n)=>{let o=B.get(e);void 0===o&&(l(e,e.firstChild),B.set(e,o=new O(Object.assign({templateFactory:U},n))),o.appendInto(e)),o.setValue(t),o.commit()})(t,a,Object.assign({templateFactory:W(o)},n)),s){const t=B.get(a);B.delete(a);const n=t.value instanceof C?t.value.template:void 0;X(o,a,n),l(e,e.firstChild),e.appendChild(a),B.set(e,t)}!i&&r&&window.ShadyCSS.styleElement(e.host)},dt.shadowRootOptions={mode:"open"};var ut=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ht="[^\\s]+",pt=/\[([^]*?)\]/gm;function mt(t,e){for(var n=[],o=0,i=t.length;o<i;o++)n.push(t[o].substr(0,e));return n}var gt=function(t){return function(e,n){var o=n[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return o>-1?o:null}};function ft(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var o=0,i=e;o<i.length;o++){var r=i[o];for(var s in r)t[s]=r[s]}return t}var vt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],yt=["January","February","March","April","May","June","July","August","September","October","November","December"],bt=mt(yt,3),_t={dayNamesShort:mt(vt,3),dayNames:vt,monthNamesShort:bt,monthNames:yt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},wt=ft({},_t),St=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},xt={D:function(t){return String(t.getDate())},DD:function(t){return St(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return St(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return St(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return St(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return St(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return St(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return St(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return St(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return St(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return St(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return St(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+St(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+St(Math.floor(Math.abs(e)/60),2)+":"+St(Math.abs(e)%60,2)}},$t=function(t){return+t-1},Ct=[null,"[1-9]\\d?"],Pt=[null,ht],Tt=["isPm",ht,function(t,e){var n=t.toLowerCase();return n===e.amPm[0]?0:n===e.amPm[1]?1:null}],kt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var n=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?n:-n}return 0}],Nt=(gt("monthNamesShort"),gt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Mt,Et,At=function(t,e,n){if(void 0===e&&(e=Nt.default),void 0===n&&(n={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var o=[];e=(e=Nt[e]||e).replace(pt,(function(t,e){return o.push(e),"@@@"}));var i=ft(ft({},wt),n);return(e=e.replace(ut,(function(e){return xt[e](t,i)}))).replace(/@@@/g,(function(){return o.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();(Et=Mt||(Mt={})).language="language",Et.system="system",Et.comma_decimal="comma_decimal",Et.decimal_comma="decimal_comma",Et.space_comma="space_comma",Et.none="none";var Ot=["closed","locked","off"],Dt=function(t,e,n,o){o=o||{},n=null==n?{}:n;var i=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return i.detail=n,t.dispatchEvent(i),i},Vt=function(t){Dt(window,"haptic",t)},Ht=function(t,e,n,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(Vt("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(n.entity||n.camera_image)&&Dt(t,"hass-more-info",{entityId:n.entity?n.entity:n.camera_image});break;case"navigate":o.navigation_path&&function(t,e,n){void 0===n&&(n=!1),n?history.replaceState(null,"",e):history.pushState(null,"",e),Dt(window,"location-changed",{replace:n})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":n.entity&&(function(t,e){(function(t,e,n){void 0===n&&(n=!0);var o,i=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===i?"homeassistant":i;switch(i){case"lock":o=n?"unlock":"lock";break;case"cover":o=n?"open_cover":"close_cover";break;default:o=n?"turn_on":"turn_off"}t.callService(r,o,{entity_id:e})})(t,e,Ot.includes(t.states[e].state))}(e,n.entity),Vt("success"));break;case"call-service":if(!o.service)return void Vt("failure");var i=o.service.split(".",2);e.callService(i[0],i[1],o.service_data),Vt("success");break;case"fire-dom-event":Dt(t,"ll-custom",o)}},Rt=function(t,e,n,o){var i;"double_tap"===o&&n.double_tap_action?i=n.double_tap_action:"hold"===o&&n.hold_action?i=n.hold_action:"tap"===o&&n.tap_action&&(i=n.tap_action),Ht(t,e,n,i)};function Yt(t){return void 0!==t&&"none"!==t.action}function Lt(t,e,n){if(e.has("config")||n)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}var Ut=!1;if("undefined"!=typeof window){var It={get passive(){Ut=!0}};window.addEventListener("testPassive",null,It),window.removeEventListener("testPassive",null,It)}var Bt="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),jt=[],Ft=!1,zt=-1,qt=void 0,Wt=void 0,Jt=void 0,Zt=function(t){return jt.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Xt=function(t){var e=t||window.event;return!!Zt(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},Gt=function(t,e){if(t){if(!jt.some((function(e){return e.targetElement===t}))){var n={targetElement:t,options:e||{}};jt=[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(jt),[n]),Bt?window.requestAnimationFrame((function(){if(void 0===Wt){Wt={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,n=t.scrollX,o=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-n,setTimeout((function(){return window.requestAnimationFrame((function(){var t=o-window.innerHeight;t&&e>=o&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===Jt){var e=!!t&&!0===t.reserveScrollBarGap,n=window.innerWidth-document.documentElement.clientWidth;if(e&&n>0){var o=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);Jt=document.body.style.paddingRight,document.body.style.paddingRight=o+n+"px"}}void 0===qt&&(qt=document.body.style.overflow,document.body.style.overflow="hidden")}(e),Bt&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(zt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var n=t.targetTouches[0].clientY-zt;!Zt(t.target)&&(e&&0===e.scrollTop&&n>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&n<0?Xt(t):t.stopPropagation())}(e,t)},Ft||(document.addEventListener("touchmove",Xt,Ut?{passive:!1}:void 0),Ft=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},Kt=function(t){t?(jt=jt.filter((function(e){return e.targetElement!==t})),Bt&&(t.ontouchstart=null,t.ontouchmove=null,Ft&&0===jt.length&&(document.removeEventListener("touchmove",Xt,Ut?{passive:!1}:void 0),Ft=!1)),Bt?function(){if(void 0!==Wt){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=Wt.position,document.body.style.top=Wt.top,document.body.style.left=Wt.left,window.scrollTo(e,t),Wt=void 0}}():(void 0!==Jt&&(document.body.style.paddingRight=Jt,Jt=void 0),void 0!==qt&&(document.body.style.overflow=qt,qt=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};console.info(`%c  ---- MY-SLIDER ---- \n%c  ${r("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let Qt=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!(t.entity.includes("input_number.")||t.entity.includes("light.")||t.entity.includes("media_player.")||t.entity.includes("cover.")||t.entity.includes("fan.")||t.entity.includes("switch.")||t.entity.includes("lock.")))throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const n=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",o=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+n]);var i=e.step?e.step:"1";n.includes("input_number.")&&(i=e.step?e.step:o.attributes.step);var r=e.minBar?e.minBar:0,s=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100,c=e.width?e.width:"100%",d=e.height?e.height:"50px",u=e.radius?e.radius:"4px",h=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:d;"0"!=f&&(f+="deg");var y=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",b=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",_=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",S=e.border?e.border:"0",x=e.thumbWidth?e.thumbWidth:"25px",$=e.thumbHeight?e.thumbHeight:"80px",C=e.thumbColor?e.thumbColor:"#FFFFFF",P=e.thumbColorOff?e.thumbColorOff:"#969696",T=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",k=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",N=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",M=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",E=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",A=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",O=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",D=!!e.lockTrack&&e.lockTrack,V=`\n\t\t\t--slider-width: ${c};\n\t\t\t--slider-width-inverse: -${c};\n\t\t\t--slider-height: ${d};\n\t\t\t--slider-main-color: ${"off"===o.state||"locked"===o.state||null==o.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${y};\n\t\t\t--slider-main-color-off: ${_};\n\t\t\t--slider-secondary-color: ${"off"===o.state||"locked"===o.state||null==o.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${b};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${u};\n\t\t\t--border: ${S};\n\n\t\t\t--thumb-width: ${x};\n\t\t\t--thumb-height: ${$};\n\t\t\t--thumb-color: ${"off"===o.state||null==o.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${C};\n\t\t\t--thumb-color-off: ${P};\n\t\t\t--thumb-horizontal-padding: ${T};\n\t\t\t--thumb-vertical-padding: ${k};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${h};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${N};\n\t\t\t--thumb-border-right: ${M};\n\t\t\t--thumb-border-left: ${E};\n\t\t\t--thumb-border-top: ${A};\n\t\t\t--thumb-border-bottom: ${O};\n\t\t\t\n\t\t\t--lock-track-container: ${D?"none":"auto"};\n\t\t`;const H=t=>{n.includes("light.")?"Warmth"==e.function?this._setWarmth(o,t.target,a,l):this._setBrightness(o,t.target,a,l):n.includes("input_number.")?this._setInputNumber(o,t.target,a,l):n.includes("media_player.")?this._setMediaVolume(o,t.target,a,l):n.includes("cover.")?this._setCover(o,t.target,a,l):n.includes("fan.")?this._setFan(o,t.target,a,l):n.includes("switch.")?this._setSwitch(o,t.target,a,l,r,s):n.includes("lock.")&&this._setLock(o,t.target,a,l,r,s)},R=t=>{e.intermediate&&H(t)},Y=t=>{e.intermediate||H(t)},L=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Gt(window):Kt(window)};if(n.includes("light."))return"Warmth"==e.function?F`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${o.state}" style="${V}"
								min="${o.attributes.min_mireds}" max="${o.attributes.max_mireds}"
								step="${i}" .value="${"off"===o.state?0:o.attributes.color_temp}"
								@input=${R} @change=${Y}
								@touchstart=${e.toggle_scroll?L:null}
								@touchend=${e.toggle_scroll?L:null} >
						</div>
					</ha-card>
				`:F`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${o.state}" style="${V}"
								step="${i}" .value="${"off"===o.state?0:Math.round(o.attributes.brightness/2.56)}"
								@input=${R} @change=${Y}
								@touchstart=${e.toggle_scroll?L:null}
								@touchend=${e.toggle_scroll?L:null} >
						</div>
					</ha-card>
				`;if(n.includes("input_number."))return F`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${o.attributes.min}" max="${o.attributes.max}"
							step="${i}" .value="${o.state}"
							@input=${R} @change=${Y}
							@touchstart=${e.toggle_scroll?L:null}
							@touchend=${e.toggle_scroll?L:null} >
					</div>
				</ha-card>
			`;if(n.includes("media_player.")){var U=0;if(null!=o.attributes.volume_level)U=Number(100*o.attributes.volume_level);return F`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${i}" .value="${U}"
							@input=${R} @change=${Y}
							@touchstart=${e.toggle_scroll?L:null}
							@touchend=${e.toggle_scroll?L:null} >
					</div>
				</ha-card>
			`}return n.includes("cover.")?F`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${i}"
							.value="${o.attributes.current_position}"
							@input=${R} @change=${Y}
							@touchstart=${e.toggle_scroll?L:null}
							@touchend=${e.toggle_scroll?L:null} >
					</div>
				</ha-card>
			`:n.includes("fan.")?F`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${i}"
							.value="${o.attributes.percentage}"
							@input=${R} @change=${Y}
							@touchstart=${e.toggle_scroll?L:null}
							@touchend=${e.toggle_scroll?L:null} >
					</div>
				</ha-card>
			`:n.includes("switch.")||n.includes("lock.")?F`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${i}" .value="${r}"
							@input=${R} @change=${Y}
							@touchstart=${e.toggle_scroll?L:null}
							@touchend=${e.toggle_scroll?L:null} >
					</div>
				</ha-card>
			`:void 0}_setBrightness(t,e,n,o){var i=e.value;i>o?i=o:i<n&&(i=n),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*i}),e.value=i}_setWarmth(t,e,n,o){var i=e.value;i>o?i=o:i<n&&(i=n),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:i}),e.value=i}_setInputNumber(t,e,n,o){var i=e.value;i>o?i=o:i<n&&(i=n),this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:i}),e.value=i}_setFan(t,e,n,o){var i=e.value;i>o?i=o:i<n&&(i=n),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:i}),e.value=i}_setCover(t,e,n,o){var i=e.value;i>o?i=o:i<n&&(i=n),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:i}),e.value=i}_setMediaVolume(t,e,n,o){var i=e.value;i>o?i=o:i<n&&(i=n),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:i/100}),e.value=i}_setSwitch(t,e,n,o,i,r){var s=e.value,a=Math.min(o,r);Number(a)<=s&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(n,i))}_setLock(t,e,n,o,i,r){var s=e.value,a=Math.min(o,r);if(Number(a)<=s){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(n,i))}static get styles(){return lt`
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
		`}};s([ot({attribute:!1})],Qt.prototype,"hass",void 0),s([it()],Qt.prototype,"config",void 0),Qt=s([et("my-slider")],Qt);
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
const te=new WeakMap,ee=w(t=>e=>{if(!(e instanceof O))throw new Error("unsafeHTML can only be used in text bindings");const n=te.get(e);if(void 0!==n&&N(t)&&t===n.value&&e.value===n.fragment)return;const o=document.createElement("template");o.innerHTML=t;const i=document.importNode(o.content,!0);e.setValue(i),te.set(e,{value:t,fragment:i})});function ne(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}const oe="lovelace-player-device-id";function ie(){if(!localStorage[oe]){const t=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);window.fully&&"function"==typeof fully.getDeviceId?localStorage[oe]=fully.getDeviceId():localStorage[oe]=`${t()}${t()}-${t()}${t()}`}return localStorage[oe]}let re=ie();const se=new URLSearchParams(window.location.search);var ae;se.get("deviceID")&&null!==(ae=se.get("deviceID"))&&("clear"===ae?localStorage.removeItem(oe):localStorage[oe]=ae,re=ie());const le="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class ce extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:le?"100px":"50px",height:le?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const n=t=>{let e,n;this.held=!1,t.touches?(e=t.touches[0].pageX,n=t.touches[0].pageY):(e=t.pageX,n=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,n),this.held=!0},this.holdTime)},o=n=>{n.preventDefault(),["touchend","touchcancel"].includes(n.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?Dt(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===n.type&&n.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,Dt(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Dt(t,"action",{action:"double_tap"})):Dt(t,"action",{action:"tap"}))};t.addEventListener("touchstart",n,{passive:!0}),t.addEventListener("touchend",o),t.addEventListener("touchcancel",o),t.addEventListener("mousedown",n,{passive:!0}),t.addEventListener("click",o),t.addEventListener("keyup",t=>{13===t.keyCode&&o(t)})}startAnimation(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-my-footer",ce);const de=(t,e)=>{const n=(()=>{const t=document.body;if(t.querySelector("action-handler-my-footer"))return t.querySelector("action-handler-my-footer");const e=document.createElement("action-handler-my-footer");return t.appendChild(e),e})();n&&n.bind(t,e)},ue=w((t={})=>e=>{de(e.committer.element,t)});console.info(`%c  ---- MY-FOOTER ---- \n%c  ${r("common.version")} 0.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-footer",name:"Footer Card",description:"Custom Footer Card for Lovelace."});let he=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){this.applyTemplate(t.content?t.content:"").then(e=>{this.config=Object.assign({name:"MyFooter",parsed_content:e,disabled_scroll:!1},t)})}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t=JSON.parse(JSON.stringify(this.config));const e=t.styles?t.styles:{},n=t.buttons?t.buttons:[];let o=e.container?e.container:{};o.height=o.height?o.height:"75px",o.width=o.width?o.width:"100%",o.borderRadius=o.borderRadius?o.borderRadius:"10px",o.backgroundColor=o.backgroundColor?o.backgroundColor:"var(--paper-card-background-color)";let i=e.text?e.text:{};i.padding=i.padding?i.padding:"15px 20px",i.maxWidth=i.maxWidth?i.maxWidth:"50%",i.color=i.color?i.color:"white";const r=t=>Object.keys(t).reduce((e,n)=>e+n.split(/(?=[A-Z])/).join("-").toLowerCase()+":"+t[n]+";",""),s=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Gt(window):Kt(window)};return F`
			<ha-card>
				<div class="footer-container" style="${r(o)}">
					<div class="text-container" style="${r(i)}">
						<p>
							${ee(this.config.parsed_content)}
						</p>
					</div>

					<div class="button-container">
						<div class="button">
							<ha-icon class="icon" icon="mdi:cog-outline" style=""
								@action=${t=>{this._handleDynamicButton(t,{toggle:this.config.scroll_disabled}),s()}}
								.actionHandler=${ue({hasHold:!1,hasDoubleClick:!1})} />
						</div>
						${n.map((t,e)=>F`
									<div class="button">
										<ha-icon class="icon" key="${e}" icon="${t.button.icon}" style=""
											@action=${e=>this._handleDynamicButton(e,t.button)}
											.actionHandler=${ue({hasHold:Yt(t.hold_action),hasDoubleClick:Yt(t.double_tap_action)})} />
									</div>
								`)}
					</div>
				</div>
			</ha-card>
		`}_handleDynamicButton(t,e){this.hass&&e&&t.detail.action&&Rt(this,this.hass,e,t.detail.action)}_handleAction(t){this.hass&&this.config&&t.detail.action&&Rt(this,this.hass,this.config,t.detail.action)}parseTemplate(t,e){return new Promise((n,o)=>{let i=function(t,e,n,o=!0){t||(t=ne().connection);let i={user:ne().user.name,browser:re,hash:location.hash.substr(1)||" ",...n.variables},r=n.template,s=n.entity_ids;return t.subscribeMessage(t=>{if(o){let n=String(t.result);const o=/_\([^)]*\)/g;n=n.replace(o,t=>ne().localize(t.substring(2,t.length-1))||t),e(n)}else e(t.result)},{type:"render_template",template:r,variables:i,entity_ids:s})}(null,async t=>{n(t)},{template:t,variables:e,entity_ids:[]},!1),r=console.log;(async()=>{try{r=await i,await r()}catch(t){o(t.message)}})()})}async applyTemplate(t){try{const e={user:{name:"Anthon",is_admin:!0,is_owner:!0},page:Object.assign(Object.assign({},location),{path:location.pathname}),theme:"Dark - Wooden"};return await this.parseTemplate(t,e)}catch(e){return console.error("Error parsing template.",e),console.log("Template",t),"Error!"}}static get styles(){return lt`
			.footer-container {
				display: flex;
			}

			.text-container {

			}
			.text-container p {
				border: inherit;
				margin: 0;
				padding: 0;
			}

			.button-container {
				flex-grow: 1;
				padding-right: 20px;
			}
			.icon {
				border: 0px solid red;
				border-radius: 5px;
				height: 50px;
				width: 50px;
				font-size: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: 250ms all;
				background: rgba(0,0,0,0.15);
				box-shadow: 10px 10px 28px 4px rgba(0,0,0,0.3);
			}
			.icon:hover {
				cursor: pointer;
				background-color: rgba(0,0,0,0.25);
			}
			.button-container .button {
				height: 100%;
				float: right;
				margin: 0 10px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		`}};s([ot({attribute:!1})],he.prototype,"hass",void 0),s([it()],he.prototype,"config",void 0),he=s([et("my-footer")],he),console.info(`%c  ---- MY-CARDS ---- \n%c  ${r("common.version")} 1.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{he as MyFooter,Qt as MySlider};

var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},i={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},n={common:i};const o={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:i,default:n})};function s(t,e="",i=""){const n=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let s;try{s=t.split(".").reduce((t,e)=>t[e],o[n])}catch(e){s=t.split(".").reduce((t,e)=>t[e],o.en)}return void 0===s&&(s=t.split(".").reduce((t,e)=>t[e],o.en)),""!==e&&""!==i&&(s=s.replace(e,i)),s}
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
***************************************************************************** */function r(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r
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
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},c=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${c}--\x3e`,h=new RegExp(`${c}|${d}`);class u{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],o=document.createTreeWalker(e.content,133,null,!1);let s=0,r=-1,a=0;const{strings:l,values:{length:d}}=t;for(;a<d;){const t=o.nextNode();if(null!==t){if(r++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)p(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=l[a],i=f.exec(e)[2],n=i.toLowerCase()+"$lit$",o=t.getAttribute(n);t.removeAttribute(n);const s=o.split(h);this.parts.push({type:"attribute",index:r,name:i,strings:s}),a+=s.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const n=t.parentNode,o=e.split(h),s=o.length-1;for(let e=0;e<s;e++){let i,s=o[e];if(""===s)i=g();else{const t=f.exec(s);null!==t&&p(t[2],"$lit$")&&(s=s.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(s)}n.insertBefore(i,t),this.parts.push({type:"node",index:++r})}""===o[s]?(n.insertBefore(g(),t),i.push(t)):t.data=o[s],a+=s}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&r!==s||(r++,e.insertBefore(g(),t)),s=r,this.parts.push({type:"node",index:r}),null===t.nextSibling?t.data="":(i.push(t),r--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:i},parts:n}=t,o=document.createTreeWalker(i,133,null,!1);let s=y(n),r=n[s],a=-1,l=0;const c=[];let d=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,s=y(n,s),r=n[s]}c.forEach(t=>t.parentNode.removeChild(t))}const b=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},y=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(m(e))return i}return-1};
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
const _=new WeakMap,w=t=>(...e)=>{const i=t(...e);return _.set(i,!0),i},x=t=>"function"==typeof t&&_.has(t),S={},$={};
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
class k{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let o,s=0,r=0,l=n.nextNode();for(;s<i.length;)if(o=i[s],m(o)){for(;r<o.index;)r++,"TEMPLATE"===l.nodeName&&(e.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=e.pop(),l=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));s++}else this.__parts.push(void 0),s++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const C=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),T=` ${c} `;class O{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let n=0;n<t;n++){const t=this.strings[n],o=t.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===t.indexOf("--\x3e",o+1);const s=f.exec(t);e+=null===s?t+(i?T:d):t.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+c}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==C&&(e=C.createHTML(e)),t.innerHTML=e,t}}
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
 */const M=t=>null===t||!("object"==typeof t||"function"==typeof t),E=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class P{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!E(t))return t}let n="";for(let o=0;o<e;o++){n+=t[o];const e=i[o];if(void 0!==e){const t=e.value;if(M(t)||!E(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===S||M(t)&&t===this.value||(this.value=t,x(t)||(this.committer.dirty=!0))}commit(){for(;x(this.value);){const t=this.value;this.value=S,t(this)}this.value!==S&&this.committer.commit()}}class j{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}const t=this.__pendingValue;t!==S&&(M(t)?t!==this.value&&this.__commitText(t):t instanceof O?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):E(t)?this.__commitIterable(t):t===$?(this.value=$,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof k&&this.value.template===e)this.value.update(t.values);else{const i=new k(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const o of t)i=e[n],void 0===i&&(i=new j(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(o),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class A{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=S}}class V extends P{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new D(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class D extends N{}let H=!1;(()=>{try{const t={get capture(){return H=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class L{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=Y(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=S}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const Y=t=>t&&(H?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function R(t){let e=U.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},U.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(c);return i=e.keyString.get(n),void 0===i&&(i=new u(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const U=new Map,I=new WeakMap;
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
 */const B=new
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
class{handleAttributeExpressions(t,e,i,n){const o=e[0];if("."===o){return new V(t,e.slice(1),i).parts}if("@"===o)return[new L(t,e.slice(1),n.eventContext)];if("?"===o)return[new A(t,e.slice(1),i)];return new P(t,e,i).parts}handleTextExpression(t){return new j(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const z=(t,...e)=>new O(t,e,"html",B)
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
 */,F=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const W=t=>e=>{const i=F(e.type,t);let n=U.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},U.set(i,n));let o=n.stringsArray.get(e.strings);if(void 0!==o)return o;const s=e.strings.join(c);if(o=n.keyString.get(s),void 0===o){const i=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,t),o=new u(e,i),n.keyString.set(s,o)}return n.stringsArray.set(e.strings,o),o},J=["html","svg"],Z=new Set,G=(t,e,i)=>{Z.add(t);const n=i?i.element:document.createElement("template"),o=e.querySelectorAll("style"),{length:s}=o;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(n,t);const r=document.createElement("style");for(let t=0;t<s;t++){const e=o[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{J.forEach(e=>{const i=U.get(F(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),v(t,i)})})})(t);const a=n.content;i?function(t,e,i=null){const{element:{content:n},parts:o}=t;if(null==i)return void n.appendChild(e);const s=document.createTreeWalker(n,133,null,!1);let r=y(o),a=0,l=-1;for(;s.nextNode();){l++;for(s.currentNode===i&&(a=b(e),i.parentNode.insertBefore(e,i));-1!==r&&o[r].index===l;){if(a>0){for(;-1!==r;)o[r].index+=a,r=y(o,r);return}r=y(o,r)}}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),v(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const X={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},K=(t,e)=>e!==t&&(e==e||t==t),Q={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:K};class tt extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const o=this[t];this[e]=n,this.requestUpdateInternal(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=K){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||X,o="function"==typeof n?n:n.fromAttribute;return o?o(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||X.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Q){const n=this.constructor,o=n._attributeNameForProperty(t,i);if(void 0!==o){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let n=!0;if(void 0!==t){const o=this.constructor;i=i||o.getPropertyOptions(t),o._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}tt.finalized=!0;
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
const et=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(t,e),it=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function nt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):it(t,e)}function ot(t){return nt({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const st=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol();class at{constructor(t,e){if(e!==rt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(st?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const i=e.reduce((e,i,n)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1],t[0]);return new at(i,rt)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ct={};class dt extends tt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),n=[];i.forEach(t=>n.unshift(t)),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!st){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new at(String(e),rt)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?st?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==ct&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return ct}}dt.finalized=!0,dt.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,o=I.has(e),s=q&&11===e.nodeType&&!!e.host,r=s&&!Z.has(n),a=r?document.createDocumentFragment():e;if(((t,e,i)=>{let n=I.get(e);void 0===n&&(l(e,e.firstChild),I.set(e,n=new j(Object.assign({templateFactory:R},i))),n.appendInto(e)),n.setValue(t),n.commit()})(t,a,Object.assign({templateFactory:W(n)},i)),r){const t=I.get(a);I.delete(a);const i=t.value instanceof k?t.value.template:void 0;G(n,a,i),l(e,e.firstChild),e.appendChild(a),I.set(e,t)}!o&&s&&window.ShadyCSS.styleElement(e.host)},dt.shadowRootOptions={mode:"open"};var ht=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ut="[^\\s]+",pt=/\[([^]*?)\]/gm;function mt(t,e){for(var i=[],n=0,o=t.length;n<o;n++)i.push(t[n].substr(0,e));return i}var gt=function(t){return function(e,i){var n=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return n>-1?n:null}};function ft(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var n=0,o=e;n<o.length;n++){var s=o[n];for(var r in s)t[r]=s[r]}return t}var vt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],bt=["January","February","March","April","May","June","July","August","September","October","November","December"],yt=mt(bt,3),_t={dayNamesShort:mt(vt,3),dayNames:vt,monthNamesShort:yt,monthNames:bt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},wt=ft({},_t),xt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},St={D:function(t){return String(t.getDate())},DD:function(t){return xt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return xt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return xt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return xt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return xt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return xt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return xt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return xt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return xt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return xt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return xt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+xt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+xt(Math.floor(Math.abs(e)/60),2)+":"+xt(Math.abs(e)%60,2)}},$t=function(t){return+t-1},kt=[null,"[1-9]\\d?"],Ct=[null,ut],Tt=["isPm",ut,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],Ot=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],Mt=(gt("monthNamesShort"),gt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Et,Pt,Nt=function(t,e,i){if(void 0===e&&(e=Mt.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var n=[];e=(e=Mt[e]||e).replace(pt,(function(t,e){return n.push(e),"@@@"}));var o=ft(ft({},wt),i);return(e=e.replace(ht,(function(e){return St[e](t,o)}))).replace(/@@@/g,(function(){return n.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();function jt(){return(jt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}(Pt=Et||(Et={})).language="language",Pt.system="system",Pt.comma_decimal="comma_decimal",Pt.decimal_comma="decimal_comma",Pt.space_comma="space_comma",Pt.none="none";var At=["closed","locked","off"],Vt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return o.detail=i,t.dispatchEvent(o),o},Dt=function(t){Vt(window,"haptic",t)},Ht=function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),Vt(window,"location-changed",{replace:i})},Lt=function(t,e){return function(t,e,i){void 0===i&&(i=!0);var n,o=function(t){return t.substr(0,t.indexOf("."))}(e),s="group"===o?"homeassistant":o;switch(o){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}return t.callService(s,n,{entity_id:e})}(t,e,At.includes(t.states[e].state))},Yt=function(t,e,i,n){var o;"double_tap"===n&&i.double_tap_action?o=i.double_tap_action:"hold"===n&&i.hold_action?o=i.hold_action:"tap"===n&&i.tap_action&&(o=i.tap_action),function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(Dt("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&Vt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&Ht(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(Lt(e,i.entity),Dt("success"));break;case"call-service":if(!n.service)return void Dt("failure");var o=n.service.split(".",2);e.callService(o[0],o[1],n.service_data),Dt("success");break;case"fire-dom-event":Vt(t,"ll-custom",n)}}(t,e,i,o)},Rt=function(t,e,i,n,o){var s;if(o&&i.double_tap_action?s=i.double_tap_action:n&&i.hold_action?s=i.hold_action:!n&&i.tap_action&&(s=i.tap_action),s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||confirm(s.confirmation.text||"Are you sure you want to "+s.action+"?"))switch(s.action){case"more-info":(s.entity||i.entity||i.camera_image)&&(Vt(t,"hass-more-info",{entityId:s.entity?s.entity:i.entity?i.entity:i.camera_image}),s.haptic&&Dt(s.haptic));break;case"navigate":s.navigation_path&&(Ht(0,s.navigation_path),s.haptic&&Dt(s.haptic));break;case"url":s.url_path&&window.open(s.url_path),s.haptic&&Dt(s.haptic);break;case"toggle":i.entity&&(Lt(e,i.entity),s.haptic&&Dt(s.haptic));break;case"call-service":if(!s.service)return;var r=s.service.split(".",2),a=r[0],l=r[1],c=jt({},s.service_data);"entity"===c.entity_id&&(c.entity_id=i.entity),e.callService(a,l,c),s.haptic&&Dt(s.haptic);break;case"fire-dom-event":Vt(t,"ll-custom",s),s.haptic&&Dt(s.haptic)}};function Ut(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var n=e.get("hass");return!n||n.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}var It=!1;if("undefined"!=typeof window){var Bt={get passive(){It=!0}};window.addEventListener("testPassive",null,Bt),window.removeEventListener("testPassive",null,Bt)}var zt="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),Ft=[],qt=!1,Wt=-1,Jt=void 0,Zt=void 0,Gt=void 0,Xt=function(t){return Ft.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Kt=function(t){var e=t||window.event;return!!Xt(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},Qt=function(t,e){if(t){if(!Ft.some((function(e){return e.targetElement===t}))){var i={targetElement:t,options:e||{}};Ft=[].concat(function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(Ft),[i]),zt?window.requestAnimationFrame((function(){if(void 0===Zt){Zt={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,i=t.scrollX,n=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-i,setTimeout((function(){return window.requestAnimationFrame((function(){var t=n-window.innerHeight;t&&e>=n&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===Gt){var e=!!t&&!0===t.reserveScrollBarGap,i=window.innerWidth-document.documentElement.clientWidth;if(e&&i>0){var n=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);Gt=document.body.style.paddingRight,document.body.style.paddingRight=n+i+"px"}}void 0===Jt&&(Jt=document.body.style.overflow,document.body.style.overflow="hidden")}(e),zt&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(Wt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var i=t.targetTouches[0].clientY-Wt;!Xt(t.target)&&(e&&0===e.scrollTop&&i>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&i<0?Kt(t):t.stopPropagation())}(e,t)},qt||(document.addEventListener("touchmove",Kt,It?{passive:!1}:void 0),qt=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},te=function(t){t?(Ft=Ft.filter((function(e){return e.targetElement!==t})),zt&&(t.ontouchstart=null,t.ontouchmove=null,qt&&0===Ft.length&&(document.removeEventListener("touchmove",Kt,It?{passive:!1}:void 0),qt=!1)),zt?function(){if(void 0!==Zt){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=Zt.position,document.body.style.top=Zt.top,document.body.style.left=Zt.left,window.scrollTo(e,t),Zt=void 0}}():(void 0!==Gt&&(document.body.style.paddingRight=Gt,Gt=void 0),void 0!==Jt&&(document.body.style.overflow=Jt,Jt=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};console.info(`%c  ---- MY-SLIDER ---- \n%c  ${s("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let ee=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!(t.entity.includes("input_number.")||t.entity.includes("light.")||t.entity.includes("media_player.")||t.entity.includes("cover.")||t.entity.includes("fan.")||t.entity.includes("switch.")||t.entity.includes("lock.")))throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Ut(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const i=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",n=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+i]);var o=e.step?e.step:"1";i.includes("input_number.")&&(o=e.step?e.step:n.attributes.step);var s=e.minBar?e.minBar:0,r=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100,c=e.width?e.width:"100%",d=e.height?e.height:"50px",h=e.radius?e.radius:"4px",u=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:d;"0"!=f&&(f+="deg");var b=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",y=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",_=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",x=e.border?e.border:"0",S=e.thumbWidth?e.thumbWidth:"25px",$=e.thumbHeight?e.thumbHeight:"80px",k=e.thumbColor?e.thumbColor:"#FFFFFF",C=e.thumbColorOff?e.thumbColorOff:"#969696",T=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",O=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",M=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",E=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",P=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",N=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",j=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",A=!!e.lockTrack&&e.lockTrack,V=`\n\t\t\t--slider-width: ${c};\n\t\t\t--slider-width-inverse: -${c};\n\t\t\t--slider-height: ${d};\n\t\t\t--slider-main-color: ${"off"===n.state||"locked"===n.state||null==n.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${b};\n\t\t\t--slider-main-color-off: ${_};\n\t\t\t--slider-secondary-color: ${"off"===n.state||"locked"===n.state||null==n.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${y};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${h};\n\t\t\t--border: ${x};\n\n\t\t\t--thumb-width: ${S};\n\t\t\t--thumb-height: ${$};\n\t\t\t--thumb-color: ${"off"===n.state||null==n.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${k};\n\t\t\t--thumb-color-off: ${C};\n\t\t\t--thumb-horizontal-padding: ${T};\n\t\t\t--thumb-vertical-padding: ${O};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${u};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${M};\n\t\t\t--thumb-border-right: ${E};\n\t\t\t--thumb-border-left: ${P};\n\t\t\t--thumb-border-top: ${N};\n\t\t\t--thumb-border-bottom: ${j};\n\t\t\t\n\t\t\t--lock-track-container: ${A?"none":"auto"};\n\t\t`;const D=t=>{i.includes("light.")?"Warmth"==e.function?this._setWarmth(n,t.target,a,l):this._setBrightness(n,t.target,a,l):i.includes("input_number.")?this._setInputNumber(n,t.target,a,l):i.includes("media_player.")?this._setMediaVolume(n,t.target,a,l):i.includes("cover.")?this._setCover(n,t.target,a,l):i.includes("fan.")?this._setFan(n,t.target,a,l):i.includes("switch.")?this._setSwitch(n,t.target,a,l,s,r):i.includes("lock.")&&this._setLock(n,t.target,a,l,s,r)},H=t=>{e.intermediate&&D(t)},L=t=>{e.intermediate||D(t)},Y=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Qt(window):te(window)};if(i.includes("light."))return"Warmth"==e.function?z`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${n.state}" style="${V}"
								min="${n.attributes.min_mireds}" max="${n.attributes.max_mireds}"
								step="${o}" .value="${"off"===n.state?0:n.attributes.color_temp}"
								@input=${H} @change=${L}
								@touchstart=${e.toggle_scroll?Y:null}
								@touchend=${e.toggle_scroll?Y:null} >
						</div>
					</ha-card>
				`:z`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${n.state}" style="${V}"
								step="${o}" .value="${"off"===n.state?0:Math.round(n.attributes.brightness/2.56)}"
								@input=${H} @change=${L}
								@touchstart=${e.toggle_scroll?Y:null}
								@touchend=${e.toggle_scroll?Y:null} >
						</div>
					</ha-card>
				`;if(i.includes("input_number."))return z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${n.state}" style="${V}"
							min="${n.attributes.min}" max="${n.attributes.max}"
							step="${o}" .value="${n.state}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`;if(i.includes("media_player.")){var R=0;if(null!=n.attributes.volume_level)R=Number(100*n.attributes.volume_level);return z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${n.state}" style="${V}"
							min="${s}" max="${r}" step="${o}" .value="${R}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`}return i.includes("cover.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${n.state}" style="${V}"
							min="${s}" max="${r}" step="${o}"
							.value="${n.attributes.current_position}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:i.includes("fan.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${n.state}" style="${V}"
							min="${s}" max="${r}" step="${o}"
							.value="${n.attributes.percentage}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:i.includes("switch.")||i.includes("lock.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${n.state}" style="${V}"
							min="${s}" max="${r}" step="${o}" .value="${s}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:void 0}_setBrightness(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*o}),e.value=o}_setWarmth(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:o}),e.value=o}_setInputNumber(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:o}),e.value=o}_setFan(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:o}),e.value=o}_setCover(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:o}),e.value=o}_setMediaVolume(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:o/100}),e.value=o}_setSwitch(t,e,i,n,o,s){var r=e.value,a=Math.min(n,s);Number(a)<=r&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(i,o))}_setLock(t,e,i,n,o,s){var r=e.value,a=Math.min(n,s);if(Number(a)<=r){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(i,o))}static get styles(){return lt`
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
		`}};r([nt({attribute:!1})],ee.prototype,"hass",void 0),r([ot()],ee.prototype,"config",void 0),ee=r([et("my-slider")],ee);
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
const ie=new WeakMap,ne=w(t=>e=>{if(!(e instanceof N)||e instanceof D||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:n}=i.element;let o=ie.get(e);void 0===o&&(n.cssText=i.strings.join(" "),ie.set(e,o=new Set)),o.forEach(e=>{e in t||(o.delete(e),-1===e.indexOf("-")?n[e]=null:n.removeProperty(e))});for(const e in t)o.add(e),-1===e.indexOf("-")?n[e]=t[e]:n.setProperty(e,t[e])}),oe=(t,e={})=>{switch(t){case"card":return se(e);case"container":return re(e);case"track":return ae(e);case"progress":return le(e);case"thumb":return ce(e);default:return void console.log("Getting default styles")}},se=t=>Object.assign({height:"30px"},t),re=t=>Object.assign({width:"100%",height:"100%",position:"relative",overflow:"hidden","border-radius":"5px"},t),ae=t=>Object.assign({width:"100%",height:"100%",position:"relative",background:"var(--card-background-color)"},t),le=t=>Object.assign({height:"100%",background:"var(--paper-item-icon-active-color)",position:"absolute",width:"0.00%"},t),ce=t=>Object.assign({height:"100%",background:"black",position:"absolute",right:"-5px",width:"10px"},t),de=function(t,e,i){var n,o;for(var s in e=void 0===e?[]:e,i=void 0===i?{}:i,t)t.hasOwnProperty(s)&&(n=s,o=t[s],e.push(n),"object"==typeof o&&null!==o?i=de(o,e,i):i[e[e.length-1]]=o,e.pop());return i},he=(t,e=100,i=0)=>t/(e-i)*100,ue=t=>Math.round(100*(t+Number.EPSILON))/100;console.info(`%c  ---- MY-SLIDER-V2 ---- \n%c  ${s("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider-v2",name:"Slider Card V2",description:"Custom Slider Card V2 for Lovelace."});let pe=class extends dt{constructor(){super(...arguments),this.sliderId="",this.touchInput=!1,this.disableScroll=!0,this.allowTapping=!0,this.thumbTapped=!1,this.actionTaken=!1,this.vertical=!1,this.flipped=!1,this.inverse=!1,this.showMin=!1,this.savedMin=1,this.min=0,this.max=100,this.minThreshold=0,this.maxThreshold=100,this.step=1,this.sliderVal=0,this.sliderValPercent=0}setSliderValues(t,e){this.inverse?(this.sliderVal=this.max-t,this.sliderValPercent=100-e):(this.sliderVal=t,this.sliderValPercent=e)}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){const e=["light","input_number","media_player","cover","fan","switch","lock"];if(!t.entity)throw new Error("You need to define entity");if(!e.includes(t.entity.split(".")[0]))throw new Error("Entity has to be one of the following: "+e.map(t=>" "+t));this.config=Object.assign({name:"MySliderV2"},t)}shouldUpdate(t){return!!this.config&&Ut(this,t,!1)}render(){var t,e,i,n,o,s,r,a,l,c;const d=this.initializeConfig();if(null!==d)return d;const h=de(null===(t=this._config.styles)||void 0===t?void 0:t.card)?de(null===(e=this._config.styles)||void 0===e?void 0:e.card):{},u=de(null===(i=this._config.styles)||void 0===i?void 0:i.container)?de(null===(n=this._config.styles)||void 0===n?void 0:n.container):{},p=de(null===(o=this._config.styles)||void 0===o?void 0:o.track)?de(null===(s=this._config.styles)||void 0===s?void 0:s.track):{},m=de(null===(r=this._config.styles)||void 0===r?void 0:r.progress)?de(null===(a=this._config.styles)||void 0===a?void 0:a.progress):{},g=de(null===(l=this._config.styles)||void 0===l?void 0:l.thumb)?de(null===(c=this._config.styles)||void 0===c?void 0:c.thumb):{},f=oe("card",h),v=oe("container",u),b=oe("track",p),y=oe("progress",m),_=oe("thumb",g);this.vertical?(y.height=this.sliderValPercent.toString()+"%",y.width=m.width?m.width:"100%",y.right=m.right?m.right:"auto",_.right=g.right?g:"auto",_.width=g.width?g.width:"100%",_.height=g.height?g.height:"10px",this.flipped?(y.top=m.top?m.top:"0",_.bottom=g.bottom?g.bottom:"-5px"):(y.bottom=m.bottom?m.bottom:"0",_.top=g.top?g.top:"-5px")):(y.width=this.sliderValPercent.toString()+"%",this.flipped&&(y.right=m.right?m.right:"0",_.right=g.right?g.right:"auto",_.left=g.left?g.left:"-5px"));const w=t=>{const e=t.path.find(t=>t.classList.contains("my-slider-custom"));this.sliderEl=e||t.target},x=t=>{switch(t.type){case"mousedown":if(this.touchInput)return;S(t);break;case"touchstart":this.touchInput=!0,S(t);break;case"mousemove":if(this.touchInput)return;k(t);break;case"touchmove":this.disableScroll&&t.preventDefault(),k(t);break;case"mouseup":case"touchend":case"touchcancel":$(t)}},S=t=>{this.actionTaken||(w(t),this.allowTapping?(this.actionTaken=!0,this.calcProgress(t)):t.path[0].classList.contains("my-slider-custom-thumb")&&(this.thumbTapped=!0,this.actionTaken=!0,this.calcProgress(t)))},$=t=>{this.actionTaken&&((this.allowTapping||this.thumbTapped)&&this.calcProgress(t),this.thumbTapped=!1,this.actionTaken=!1)},k=t=>{this.actionTaken&&this.calcProgress(t)};return this.createAndCleanupEventListeners(x),z`
            <ha-card style="${ne(f)}">
                <div class="my-slider-custom" id="${this.sliderId}" style="${ne(v)}" data-value="${this.sliderVal}" data-progress-percent="${this.sliderValPercent}"
                    @mousedown="${x}"
                    @mouseup="${x}"
                    @mousemove="${x}"
                    @touchstart="${x}"
                    @touchend="${x}"
                    @touchcancel="${x}" 
                    @touchmove="${x}"
                >
                    <div class="my-slider-custom-track" style="${ne(b)}">
                        <div class="my-slider-custom-progress" style="${ne(y)}">
                            <div class="my-slider-custom-thumb" style="${ne(_)}"></div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `}initializeConfig(){this.entity=this.hass.states[""+this.config.entity];try{this._config=this._objectEvalTemplate(this.entity,this.config)}catch(t){if(t instanceof Error){t.stack?console.error(t.stack):console.error(t);const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t.toString(),origConfig:this.config}),e}console.log("Unexpected error evaluating config on init:",t)}let t;switch(this.sliderId="slider-"+this._config.entity.replace(".","-"),this.vertical=void 0!==this._config.vertical&&this._config.vertical,this.flipped=void 0!==this._config.flipped&&this._config.flipped,this.inverse=void 0!==this._config.inverse&&this._config.inverse,this.disableScroll=void 0===this._config.disableScroll||this._config.disableScroll,this.allowTapping=void 0===this._config.allowTapping||this._config.allowTapping,this.showMin=void 0!==this._config.showMin&&this._config.showMin,this.savedMin=this._config.min?this._config.min:0,this.max=this._config.max?this._config.max:100,this.minThreshold=this._config.minThreshold?this._config.minThreshold:0,this.maxThreshold=this._config.maxThreshold?this._config.maxThreshold:100,this.step=this._config.step?this._config.step:1,this._config.entity.split(".")[0]){case"light":if(this._config.warmth){if("on"!==this.entity.state)break;this.savedMin=this._config.min?this._config.min:this.entity.attributes.min_mireds,this.max=this._config.max?this._config.max:this.entity.attributes.max_mireds,t=parseFloat(this.entity.attributes.color_temp),this.showMin||(this.max=this.max-this.savedMin,t-=this.savedMin),this.setSliderValues(t,ue(he(t,this.max)))}else"on"===this.entity.state?(t=Math.round(this.entity.attributes.brightness/2.56),this.showMin||(t-=this.savedMin)):t=0,this.setSliderValues(t,ue(he(t,this.max)));break;case"input_number":this.step=this._config.step?this._config.step:this.entity.attributes.step,this.savedMin=this._config.min?this._config.min:this.entity.attributes.min,this.max=this._config.max?this._config.max:this.entity.attributes.max,t=parseFloat(this.entity.state),this.showMin||(this.max=this.max-this.savedMin,t-=this.savedMin),this.setSliderValues(t,ue(he(t,this.max)));break;case"media_player":t=0,null!=this.entity.attributes.volume_level&&(t=Number(100*this.entity.attributes.volume_level)),this.showMin||(this.max=this.max-this.savedMin,t-=this.savedMin),this.setSliderValues(t,ue(he(t,this.max)));break;case"cover":t=0,null!=this.entity.attributes.current_position&&(t=Number(this.entity.attributes.current_position)),this.showMin||(this.max=this.max-this.savedMin,t-=this.savedMin),this.inverse=void 0===this._config.inverse||this._config.inverse,this.vertical=void 0===this._config.vertical||this._config.vertical,this.flipped=void 0===this._config.flipped||this._config.flipped,this.setSliderValues(t,ue(he(t,this.max)));break;case"fan":t=0,null!=this.entity.attributes.percentage&&(t=Number(this.entity.attributes.percentage)),this.showMin||(this.max=this.max-this.savedMin,t-=this.savedMin),this.setSliderValues(t,ue(he(t,this.max)));break;case"switch":case"lock":this.minThreshold=this._config.minThreshold?this._config.minThreshold:15,this.maxThreshold=this._config.maxThreshold?this._config.maxThreshold:75,t=Number(Math.max(this.min,this.minThreshold)),this.setSliderValues(t,t);break;default:console.log("Default")}return null}calcProgress(t){if(null==this.sliderEl||null===this.sliderEl)return;const e=((t,e)=>{let i={x:0,y:0};if("touchstart"==t.type||"touchmove"==t.type||"touchend"==t.type||"touchcancel"==t.type){let e=void 0===t.originalEvent?t:t.originalEvent,n=e.touches[0]||e.changedTouches[0];i.x=n.pageX,i.y=n.pageY}else"mousedown"!=t.type&&"mouseup"!=t.type&&"mousemove"!=t.type&&"mouseover"!=t.type&&"mouseout"!=t.type&&"mouseenter"!=t.type&&"mouseleave"!=t.type||(i.x=t.clientX,i.y=t.clientY);let n=e.getBoundingClientRect(),o=i.x-n.left,s=i.y-n.top;return s=e.offsetHeight-s,{x:o,y:s}})(t,this.sliderEl),i=this.sliderEl.offsetWidth,n=this.sliderEl.offsetHeight,o=(this.vertical?ue(e.y/n*100):ue(e.x/i*100))/100*(this.max-0),s=this.max-o,r=this.flipped?s:o;this.setProgress(this.sliderEl,Math.round(r),t.type)}setProgress(t,e,i){e>this.max?e=this.max:e<this.min&&(e=this.min);const n=t.querySelector(".my-slider-custom-progress"),o=ue(he(e,this.max));this.vertical?n.style.height=o.toString()+"%":n.style.width=o.toString()+"%",this.sliderVal!==e&&((!this._config.intermediate||"mousemove"!==i&&"touchmove"!==i)&&(this._config.intermediate||"mouseup"!==i&&"touchend"!==i&&"touchcancel"!==i)||this.setValue(e,o))}setValue(t,e){if(this.entity&&(this.setSliderValues(t,e),this.showMin||(t+=this.savedMin),this.inverse&&(t=this.max-t,e=100-e),this.actionTaken))switch(this._config.entity.split(".")[0]){case"light":this._config.warmth?this._setWarmth(this.entity,t):this._setBrightness(this.entity,t);break;case"input_number":this._setInputNumber(this.entity,t);break;case"media_player":this._setMediaVolume(this.entity,t);break;case"cover":this._setCover(this.entity,t);break;case"fan":this._setFan(this.entity,t);break;case"lock":this._setLock(this.entity,t);break;case"switch":this._setSwitch(this.entity,t);break;default:console.log("Default")}}_setBrightness(t,e){("off"===t.state||Math.abs(e-Math.round(t.attributes.brightness/2.56))>this.step)&&this.hass.callService("light","turn_on",{entity_id:t.entity_id,brightness:2.56*e})}_setWarmth(t,e){let i=parseFloat(t.attributes.color_temp);("off"===t.state||Math.abs(e-i)>this.step)&&this.hass.callService("light","turn_on",{entity_id:t.entity_id,color_temp:e})}_setInputNumber(t,e){let i=parseFloat(t.state);this.showMin||(i-=this.savedMin),Math.abs(e-i)>this.step&&this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:e})}_setMediaVolume(t,e){let i=Number(100*this.entity.attributes.volume_level);this.showMin||(i-=this.savedMin),Math.abs(e-i)>this.step&&this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100})}_setCover(t,e){this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:e})}_setFan(t,e){this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:e})}_setSwitch(t,e){var i=Math.min(this.max,this.maxThreshold);Number(i)<=e&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id});const n=Number(Math.max(this.min,this.minThreshold)),o=ue(he(n,this.max));this.setSliderValues(n,o);const s=this.sliderEl.querySelector(".my-slider-custom-progress");s.style.transition="width 0.2s ease 0s",s.style.width=o.toString()+"%",setTimeout(()=>{s.style.transition="initial"},200)}_setLock(t,e){var i=Math.min(this.max,this.maxThreshold);if(Number(i)<=e){var n="locked"===t.state?"unlock":"lock";this.hass.callService("lock",n,{entity_id:t.entity_id})}const o=Number(Math.max(this.min,this.minThreshold)),s=ue(he(o,this.max));this.setSliderValues(o,s);const r=this.sliderEl.querySelector(".my-slider-custom-progress");r.style.transition="width 0.2s ease 0s",r.style.width=s.toString()+"%",setTimeout(()=>{r.style.transition="initial"},200)}createAndCleanupEventListeners(t){document.removeEventListener("mouseup",t),document.removeEventListener("touchend",t),document.removeEventListener("touchcancel",t),document.addEventListener("mouseup",t),document.addEventListener("touchend",t),document.addEventListener("touchcancel",t),document.addEventListener("mousemove",t)}_evalActions(t,e){const i=JSON.parse(JSON.stringify(t)),n=t=>t?(Object.keys(t).forEach(e=>{"object"==typeof t[e]?t[e]=n(t[e]):t[e]=this._getTemplateOrValue(this.entity,t[e])}),t):t;return i[e]=n(i[e]),!i[e].confirmation&&i.confirmation&&(i[e].confirmation=n(i.confirmation)),i}_objectEvalTemplate(t,e){const i=JSON.parse(JSON.stringify(e));return this._getTemplateOrValue(t,i)}_getTemplateOrValue(t,e){if(["number","boolean"].includes(typeof e))return e;if(!e)return e;if("object"==typeof e)return Object.keys(e).forEach(i=>{e[i]=this._getTemplateOrValue(t,e[i])}),e;const i=e.trim();if("[[["===i.substring(0,3)&&"]]]"===i.slice(-3)){return this._evalTemplate(t,i.slice(3,-3))}return e}_evalTemplate(t,e){try{return new Function("states","entity","user","hass","html","'use strict'; "+e).call(this,this.hass.states,t,this.hass.user,this.hass,z)}catch(t){if(t instanceof Error){const i=e.length<=100?e.trim():e.trim().substring(0,98)+"...";throw t.message=`${t.name}: ${t.message} in '${i}'`,t.name="MyCardJSTemplateError",t}console.log("Unexpected error (_evalTemplate)",t)}}static get styles(){return lt`
		`}};r([nt()],pe.prototype,"_config",void 0),r([nt({attribute:!1})],pe.prototype,"hass",void 0),r([ot()],pe.prototype,"config",void 0),pe=r([et("my-slider-v2")],pe);const me="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class ge extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:me?"100px":"50px",height:me?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},n=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?Vt(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,Vt(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Vt(t,"action",{action:"double_tap"})):Vt(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",n),t.addEventListener("touchcancel",n),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",n),t.addEventListener("keyup",t=>{13===t.keyCode&&n(t)})}startAnimation(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-my-footer",ge);const fe=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-my-footer"))return t.querySelector("action-handler-my-footer");const e=document.createElement("action-handler-my-footer");return t.appendChild(e),e})();i&&i.bind(t,e)},ve=w((t={})=>e=>{fe(e.committer.element,t)}),be=(t,e={})=>{switch(t){case"card":return ye(e);case"icon":return _e(e);case"label":return we(e);case"container":return xe(e);case"row1":return Se(e);case"row2":return $e(e);case"row3":return ke(e);default:return void console.log("Getting default styles")}},ye=t=>Object.assign({height:"125px",width:"100%","min-width":"fit-content",background:t.background?t.background:"var(--card-background-color)"},t),_e=t=>Object.assign({"--mdc-icon-size":"100%",height:"35px",width:"35px",display:"inline-block",padding:"10px 10px 10px 10px",cursor:"pointer",color:"var(--paper-item-active-icon-color)"},t),we=t=>Object.assign({padding:"0",margin:"0 10px",color:"var(--primary-text-color)","font-weight":"bold"},t),xe=t=>Object.assign({padding:"0",margin:"0",display:"flex","flex-flow":"column",height:"100%"},t),Se=t=>Object.assign({flex:"0 1 auto"},t),$e=t=>Object.assign({flex:"1 1 auto"},t),ke=t=>Object.assign({flex:"0 1 auto",margin:"0 2px 2px 2px"},t);console.info(`%c  ---- MY-BUTTON-LIGHT ---- \n%c  ${s("common.version")} 0.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-button-light",name:"Light Button Card",description:"Custom Light Button Card for Lovelace."});let Ce=class extends dt{constructor(){super(...arguments),this.lastAction=0,this.iconConfig={},this.labelConfig={},this.sliderConfig={},this.cardStl={},this.containerStl={},this.iconStl={},this.labelStl={},this.row1Stl={},this.row2Stl={},this.row3Stl={}}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!t.entity.includes("light."))throw new Error("Entity has to be a light.");this.config=Object.assign({name:"MyButtonLight"},t)}shouldUpdate(t){return!!this.config&&Ut(this,t,!1)}render(){var t,e,i,n,o,s,r,a;const l=this.initializeConfig();if(null!==l)return l;if(!this.entity)return z``;return z`
            <ha-card style="${ne(this.cardStl)}">
                <div style="${ne(this.containerStl)}">
                    <div style="${ne(this.row1Stl)}"
                        @action=${t=>this._handleAction(t,this.config)}
                        .actionHandler=${ve({hasDoubleClick:"none"!==(null===(e=null===(t=this.config)||void 0===t?void 0:t.double_tap_action)||void 0===e?void 0:e.action),hasHold:"none"!==(null===(n=null===(i=this.config)||void 0===i?void 0:i.hold_action)||void 0===n?void 0:n.action)})}>
                        ${(()=>{var t,e;return this.iconConfig.show?this.iconConfig.tap_action||this.iconConfig.double_tap_action||this.iconConfig.hold_action?z`
                    <ha-icon icon="${this.iconConfig.icon}" style="${ne(this.iconStl)}"
                        @action=${t=>this._handleAction(t,this.iconConfig)}
                        .actionHandler=${ve({hasDoubleClick:"none"!==(null===(t=this.iconConfig.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=this.iconConfig.hold_action)||void 0===e?void 0:e.action)})} />
                `:z`
                    <ha-icon icon="${this.iconConfig.icon}" style="${ne(this.iconStl)}" />
                `:z``})()}
                    </div>
                    <div style="${ne(this.row2Stl)}"
                        @action=${t=>this._handleAction(t,this.config)}
                        .actionHandler=${ve({hasDoubleClick:"none"!==(null===(s=null===(o=this.config)||void 0===o?void 0:o.double_tap_action)||void 0===s?void 0:s.action),hasHold:"none"!==(null===(a=null===(r=this.config)||void 0===r?void 0:r.hold_action)||void 0===a?void 0:a.action)})}>
                        ${(()=>{var t,e;return this.labelConfig.show?this.labelConfig.tap_action||this.labelConfig.double_tap_action||this.labelConfig.hold_action?z`
                    <label style="${ne(this.labelStl)}"
                        @action=${t=>this._handleAction(t,this.labelConfig)}
                        .actionHandler=${ve({hasDoubleClick:"none"!==(null===(t=this.labelConfig.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=this.labelConfig.hold_action)||void 0===e?void 0:e.action)})}
                    >${this.labelConfig.text}</label>
                `:z`
                    <label style="${ne(this.labelStl)}">${this.labelConfig.text}</label>
                `:z``})()}
                    </div>
                    <div style="${ne(this.row3Stl)}">
                        ${(()=>this.sliderConfig.show?z`
                <my-slider-v2 .hass="${this.hass}" .config="${this.sliderConfig}"></my-slider-v2>
            `:z``)()}
                    </div>
                </div>
            </ha-card>
        `}initializeConfig(){var t,e,i,n,o,s,r,a,l,c,d,h,u,p;this.entity=this.hass.states[""+this.config.entity],0===this.lastAction&&(this.lastAction=(new Date).getTime());try{this._config=this._objectEvalTemplate(this.entity,this.config)}catch(t){if(t instanceof Error){t.stack?console.error(t.stack):console.error(t);const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t.toString(),origConfig:this.config}),e}console.log("Unexpected error evaluating config on init:",t)}const m={show:!0,icon:"mdi:cog-outline"};this.iconConfig="string"==typeof this._config.icon?Object.assign(Object.assign({},m),{icon:this._config.icon}):"object"==typeof this._config.icon?Object.assign(Object.assign({},m),this._config.icon):m;const g={show:!0,text:this.entity.attributes.friendly_name};this.labelConfig="string"==typeof this._config.label?Object.assign(Object.assign({},g),{text:this._config.label}):"object"==typeof this._config.label?Object.assign(Object.assign({},g),this._config.label):g;const f={show:!0,entity:this.entity.entity_id};this.sliderConfig=this._config.slider?Object.assign(Object.assign({},f),this._config.slider):f;const v=de(null===(t=this._config.styles)||void 0===t?void 0:t.card)?de(null===(e=this._config.styles)||void 0===e?void 0:e.card):{},b=de(null===(i=this._config.styles)||void 0===i?void 0:i.container)?de(null===(n=this._config.styles)||void 0===n?void 0:n.container):{},y=de(null===(o=this._config.styles)||void 0===o?void 0:o.icon)?de(null===(s=this._config.styles)||void 0===s?void 0:s.icon):{},_=de(null===(r=this._config.styles)||void 0===r?void 0:r.label)?de(null===(a=this._config.styles)||void 0===a?void 0:a.label):{},w=de(null===(l=this._config.styles)||void 0===l?void 0:l.row1)?de(null===(c=this._config.styles)||void 0===c?void 0:c.row1):{},x=de(null===(d=this._config.styles)||void 0===d?void 0:d.row2)?de(null===(h=this._config.styles)||void 0===h?void 0:h.row2):{},S=de(null===(u=this._config.styles)||void 0===u?void 0:u.row3)?de(null===(p=this._config.styles)||void 0===p?void 0:p.row3):{};return this.cardStl=be("card",v),this.containerStl=be("container",b),this.iconStl=be("icon",y),this.labelStl=be("label",_),this.row1Stl=be("row1",w),this.row2Stl=be("row2",x),this.row3Stl=be("row3",S),null}_handleAction(t,e){var i;t.stopPropagation(),t.stopImmediatePropagation();if(!((new Date).getTime()-this.lastAction<100)&&(this.lastAction=(new Date).getTime(),e.entity||(e.entity=this._config.entity),null===(i=t.detail)||void 0===i?void 0:i.action))switch(t.detail.action){case"tap":e.tap_action&&this._handleTap(e);break;case"hold":e.hold_action&&this._handleHold(e);break;case"double_tap":e.double_tap_action&&this._handleDblTap(e)}}_handleTap(t){Rt(this,this.hass,this._evalActions(this._config,"tap_action"),!1,!1)}_handleHold(t){Rt(this,this.hass,this._evalActions(this._config,"hold_action"),!0,!1)}_handleDblTap(t){Rt(this,this.hass,this._evalActions(this._config,"double_tap_action"),!1,!0)}_evalActions(t,e){const i=JSON.parse(JSON.stringify(t)),n=t=>t?(Object.keys(t).forEach(e=>{"object"==typeof t[e]?t[e]=n(t[e]):t[e]=this._getTemplateOrValue(this.entity,t[e])}),t):t;return i[e]=n(i[e]),!i[e].confirmation&&i.confirmation&&(i[e].confirmation=n(i.confirmation)),i}_objectEvalTemplate(t,e){const i=JSON.parse(JSON.stringify(e));return this._getTemplateOrValue(t,i)}_getTemplateOrValue(t,e){if(["number","boolean"].includes(typeof e))return e;if(!e)return e;if("object"==typeof e)return Object.keys(e).forEach(i=>{e[i]=this._getTemplateOrValue(t,e[i])}),e;const i=e.trim();if("[[["===i.substring(0,3)&&"]]]"===i.slice(-3)){return this._evalTemplate(t,i.slice(3,-3))}return e}_evalTemplate(t,e){try{return new Function("states","entity","user","hass","html","'use strict'; "+e).call(this,this.hass.states,t,this.hass.user,this.hass,z)}catch(t){if(t instanceof Error){const i=e.length<=100?e.trim():e.trim().substring(0,98)+"...";throw t.message=`${t.name}: ${t.message} in '${i}'`,t.name="MyCardJSTemplateError",t}console.log("Unexpected error (_evalTemplate)",t)}}static get styles(){return lt``}};r([nt()],Ce.prototype,"_config",void 0),r([nt({attribute:!1})],Ce.prototype,"hass",void 0),r([ot()],Ce.prototype,"config",void 0),Ce=r([et("my-button-light")],Ce);const Te=t=>{if(!t)return"";let e="";return Object.keys(t).map(i=>{const n=t[i];e+=Oe(i)+":"+n+";"}),e},Oe=t=>t.split("").map((t,e)=>t.toUpperCase()===t&&"-"!==t?`${0!==e?"-":""}${t.toLowerCase()}`:t).join(""),Me=(t,e)=>{switch(t){case"my-button-card":return Ee(e);case"my-button-icon":return Pe(e);case"my-button-label":return Ne(e);case"my-button-label-vertical":return je(e);case"my-button-label-wrapper":return Ae(e);case"my-button-slider":return Ve(e);case"my-button-slider-vertical":return Ve(e,!0);case"my-button-slider-wrapper":return Le(e);default:return void console.log("Getting default styles")}},Ee=t=>(t||(t={}),Object.assign({height:t.height?t.height:"125px",width:t.width?t.width:"100%","min-width":"fit-content",background:t.background?t.background:"var(--card-background-color)"},t)),Pe=t=>(t||(t={}),Object.assign({height:t.height?t.height:"35px",width:t.width?t.width:"35px",display:t.display?t.display:"inline-block",padding:t.padding?t.padding:"10px 10px 10px 10px",cursor:"pointer",color:t.color?t.color:"var(--paper-item-active-icon-color)"},t)),Ne=t=>(t||(t={}),Object.assign({padding:t.padding?t.padding:"0",margin:t.margin?t.margin:"0 10px",color:t.color?t.color:"var(--primary-text-color)","font-weight":"bold"},t)),je=t=>(t||(t={}),Object.assign({padding:0,margin:"0 10px",color:"var(--primary-text-color)","font-weight":"bold",transform:"rotate(270deg)"},t)),Ae=t=>(t||(t={}),Object.assign({width:"30px",height:"100%",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center","padding-left":"10px"},t)),Ve=(t,e=!1)=>{if(t&&0!==Object.keys(t).length||(t={container:{},input:{},track:{},thumb:{}}),e){return{containerStyle:Ye(t.container?t.container:{}),inputStyle:Re(t.input?t.input:{})}}return{containerStyle:De(t.container?t.container:{}),inputStyle:He(t.input?t.input:{}),trackStyle:Ue(t.track?t.track:{}),thumbStyle:Ie(t.thumb?t.thumb:{})}},De=t=>(t||(t={}),Object.assign({height:"30px",position:"relative",overflow:"hidden","border-radius":"5px","--slider-color":"var(--paper-item-icon-active-color)"},t)),He=t=>(t||(t={}),Object.assign({outline:"0",border:"0",width:"100%",height:"100%","border-radius":"5px","background-color":"#4d4d4d",margin:"0",transition:"box-shadow 0.2s ease-in-out",overflow:"hidden","-webkit-appearance":"none",position:"absolute",top:"0px",bottom:"0px",right:"0px",left:"0px","pointer-events":"auto"},t)),Le=t=>(t||(t={}),Object.assign({width:"30px",height:"100%",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center","margin-right":"3px","pointer-events":"auto"},t)),Ye=t=>(t||(t={}),Object.assign(Object.assign({},t),{height:t.width?t.width:"30px",width:t.height?t.height:"calc(125px - 4px)",overflow:t.overflow?t.overflow:"hidden","border-radius":t["border-radius"]?t["border-radius"]:"5px","--slider-color":t.color?t.color:"#4d4d4d",display:t.flex?t.flex:"flex","flex-direction":t["flex-direction"]?t["flex-direction"]:"column","justify-content":t["justify-content"]?t["justify-content"]:"center","align-items":t["align-items"]?t["align-items"]:"center","-webkit-transform":t["-webkit-transform"]?t["-webkit-transform"]:"rotate(270deg)","-moz-transform":t["-moz-transform"]?t["-moz-transform"]:"rotate(270deg)","-o-transform":t["-o-transform"]?t["-o-transform"]:"rotate(270deg)","-ms-transform":t["-ms-transform"]?t["-ms-transform"]:"rotate(270deg)",transform:t.transform?t.transform:"rotate(270deg)","pointer-events":t["pointer-events"]?t["pointer-events"]:"auto"})),Re=t=>(t||(t={}),Object.assign({outline:"0",border:"0","border-radius":"5px","background-color":"var(--paper-item-icon-active-color)",margin:"0",transition:"box-shadow 0.2s ease-in-out",overflow:"hidden","-webkit-appearance":"none","pointer-events":"auto"},t)),Ue=t=>(t||(t={}),Object.assign({height:"100%","-webkit-appearance":"none",color:"red",transition:"box-shadow 0.2s ease-in-out"},t)),Ie=t=>(t||(t={}),Object.assign({width:"25px",height:"80px","-webkit-appearance":"none",cursor:"ew-resize","border-radius":"0",transition:"box-shadow 0.2s ease-in-out",position:"relative","box-shadow":"-3500px 0 0 3500px var(--accent-color), inset 0 0 0 25px #FFFFFF",top:"calc((100% - 80px) / 2)","border-right":"10px solid var(--accent-color)","border-left":"10px solid var(--accent-color)","border-top":"20px solid var(--accent-color)","border-bottom":"20px solid var(--accent-color)","pointer-events":"auto"},t));console.info(`%c  ---- MY-BUTTON-COVER ---- \n%c  ${s("common.version")} 0.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-button-cover",name:"Cover Button Card",description:"Custom Cover Button Card for Lovelace."});let Be=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!t.entity.includes("cover."))throw new Error("Entity has to be a cover.");this.config=Object.assign({name:"MyButtonCover",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Ut(this,t,!1)}render(){var t,e,i,n,o;const s=this.config.styles?JSON.parse(JSON.stringify(this.config.styles)):{},r=this.config.entity?this.config.entity:"ERROR",a=this.hass.states[""+r],l={show:!0,icon:"",iconOpen:"mdi:blinds-open",iconClose:"mdi:blinds"},c="string"==typeof this.config.icon?Object.assign(Object.assign({},l),{icon:this.config.icon}):"object"==typeof this.config.icon?Object.assign(Object.assign({},l),this.config.icon):l,d={show:!0,text:a.attributes.friendly_name,vertical:!0},h="string"==typeof this.config.label?Object.assign(Object.assign({},d),{text:this.config.label}):"object"==typeof this.config.label?Object.assign(Object.assign({},d),this.config.label):d,u={min:0,max:100,step:"1"},p=this.config.slider?Object.assign(Object.assign({},u),this.config.slider):u,m=Me("my-button-card",s.card),g=Me("my-button-icon",s.icon),f=h.vertical?Me("my-button-label-vertical",s.label):Me("my-button-label",s.label),v=Me("my-button-label-wrapper",s["label-wrapper"]),{containerStyle:b,inputStyle:y}=Me("my-button-slider-vertical",s.slider),_=Me("my-button-slider-wrapper",null===(t=s.slider)||void 0===t?void 0:t.wrapper),w=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Qt(window):te(window)},x=t=>{this._setCover(a,t.target,p.min,p.max)};if("ERROR"===r)return z`<ha-card>Error: No Entity ID</ha-card>`;return z`
            <ha-card class="my-button-card" style="${Te(m)}">
                <div class="my-button-wrapper">
                    <div class="flex-container-columns">
                        <div class="column-1"
                            @action=${t=>this._handleAction(t,this.config)}
                            .actionHandler=${ve({hasDoubleClick:"none"!==(null===(i=null===(e=this.config)||void 0===e?void 0:e.double_tap_action)||void 0===i?void 0:i.action),hasHold:"none"!==(null===(o=null===(n=this.config)||void 0===n?void 0:n.hold_action)||void 0===o?void 0:o.action)})}
                        >
                            <div class="flex-container-rows">
                                <div class="row-1">
                                    ${(()=>{var t,e;if(!c.show)return z``;let i=c.icon?c.icon:"",n=c.iconOpen?c.iconOpen:"mdi:blinds-open",o=c.iconClose?c.iconClose:"mdi:blinds";return""===i&&(i=o,a.attributes.current_position>=50&&(i=n)),z`
                <ha-icon class="my-button-icon" icon="${i}" style="${Te(g)}"
                    @action=${t=>this._handleAction(t,c)}
                    .actionHandler=${ve({hasDoubleClick:"none"!==(null===(t=null==c?void 0:c.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=null==c?void 0:c.hold_action)||void 0===e?void 0:e.action)})}
                />
            `})()}
                                </div>
                                <div class="row-2">
                                    ${(()=>{var t,e;return h.show?z`
                <div style="${h.vertical?Te(v):"display: block;"}"
                    @action=${t=>this._handleAction(t,h)}
                    .actionHandler=${ve({hasDoubleClick:"none"!==(null===(t=null==h?void 0:h.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=null==h?void 0:h.hold_action)||void 0===e?void 0:e.action)})}
                >

                    <label style="${Te(f)}">${h.text}</label>
                </div>
            `:z``})()}
                                </div>
                                <div class="row-3"></div>
                            </div>
                        </div>
                        <div class="column-2">
                            <div style="${Te(_)}">
                                <div class="slider-container" style="${Te(b)}">
                                    <input name="slider" type="range" class="" style="${Te(y)}"
                                        min="${p.min}" max="${p.max}" step="${p.step}" 
                                        value="${a.attributes.current_position}"
                                        @change=${!p.intermediate&&x}
                                        @input=${p.intermediate&&x}
                                        @touchstart="${p.toggle_scroll?w:null}"
                                        @touchend="${p.toggle_scroll?w:null}"
                                        @mousedown="${p.toggle_scroll?w:null}"
                                        @mouseup="${p.toggle_scroll?w:null}"
                                        @touchcancel="${p.toggle_scroll?w:null}"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `}_handleAction(t,e){var i;if(e.entity||(e.entity=this.config.entity),null===(i=t.detail)||void 0===i?void 0:i.action)switch(t.detail.action){case"tap":e.tap_action&&this._handleTap(e);break;case"hold":e.hold_action&&this._handleHold(e);break;case"double_tap":e.double_tap_action&&this._handleDblTap(e)}}_handleTap(t){Yt(this,this.hass,t,"tap")}_handleHold(t){Yt(this,this.hass,t,"hold")}_handleDblTap(t){Yt(this,this.hass,t,"double_tap")}_setCover(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:o}),e.value=o}static get styles(){return lt`
            .my-button-icon {
                --mdc-icon-size: 100%;
            }
            .my-button-wrapper {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                position: relative;
                pointer-events: auto;
            }
            .flex-container-columns {
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: row;
                height: 100%;
                pointer-events: auto;
            }
            .flex-container-columns .column-1 {
                flex: 1;
            }
            .flex-container-columns .column-2 {
                flex: 0;
            }

            .flex-container-rows {
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: column;
                height: 100%;
            }
            
            .flex-container-rows .row-1 {
                flex: 0 1 auto; 
            }
            .flex-container-rows .row-2 {
                flex: 1 1 auto;
                padding-bottom: 5px;
            }
            .flex-container-rows .row-3 {
                flex: 0 1 auto;
            }


            .slider-container input[type="range"]::-webkit-slider-runnable-track {
                height: 100%;
                -webkit-appearance: none;
                color: var(--accent-color);
                transition: box-shadow 0.2s ease-in-out;
            }
            
            .slider-container input[type="range"]::-webkit-slider-thumb {
                width: 8px;
                height: 80px;
                -webkit-appearance: none;
                cursor: ew-resize;
                border-radius: 0;
                transition: box-shadow 0.2s ease-in-out;
                position: relative;
            
                box-shadow: -3500px 0 0 3500px var(--slider-color), inset 0 0 0 25px rgba(0, 0, 0, 0);
            
                top: calc((100% - 80px) / 2);
                border-right: 2px solid var(--slider-color);
                border-left: 4px solid var(--slider-color);
                border-top: 28px solid var(--slider-color);
                border-bottom: 28px solid var(--slider-color);
                pointer-events: auto;
            }
            
            .slider-container input[type=range]::-moz-range-thumb {
                width: calc(25px / 4);
                height: calc(80px / 2);
                box-shadow: -3500px 10px 0 3500px var(--slider-color), inset 0 0 0 25px rgba(0, 0, 0, 0);
                top: calc((100% - 80px) / 2);
                cursor: ew-resize;
                border-radius: 0;
                transition: box-shadow 0.2s ease-in-out;
                position: relative;
                border-radius: 0;
                border-right: 10px solid var(--slider-color);
                border-left: 10px solid var(--slider-color);
                border-top: 20px solid var(--slider-color);
                border-bottom: 20px solid var(--slider-color);
                pointer-events: auto;
            }
            
            .slider-container input[type="range"]::-webkit-slider-thumb:hover {
                cursor: default;
            }
            
            .slider-container input[type="range"]:hover {
                cursor: default;
            }
        `}};r([nt({attribute:!1})],Be.prototype,"hass",void 0),r([ot()],Be.prototype,"config",void 0),Be=r([et("my-button-cover")],Be),console.info(`%c  ---- MY-CARDS ---- \n%c  ${s("common.version")} 1.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{Be as MyButtonCover,Ce as MyButtonLight,ee as MySlider,pe as MySliderV2};

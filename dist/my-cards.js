var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},i={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},o={common:i};const n={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:i,default:o})};function r(t,e="",i=""){const o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce((t,e)=>t[e],n[o])}catch(e){r=t.split(".").reduce((t,e)=>t[e],n.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],n.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}
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
***************************************************************************** */function s(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s
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
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},c=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${c}--\x3e`,h=new RegExp(`${c}|${d}`);class u{constructor(t,e){this.parts=[],this.element=e;const i=[],o=[],n=document.createTreeWalker(e.content,133,null,!1);let r=0,s=-1,a=0;const{strings:l,values:{length:d}}=t;for(;a<d;){const t=n.nextNode();if(null!==t){if(s++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let o=0;for(let t=0;t<i;t++)p(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=l[a],i=f.exec(e)[2],o=i.toLowerCase()+"$lit$",n=t.getAttribute(o);t.removeAttribute(o);const r=n.split(h);this.parts.push({type:"attribute",index:s,name:i,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const o=t.parentNode,n=e.split(h),r=n.length-1;for(let e=0;e<r;e++){let i,r=n[e];if(""===r)i=g();else{const t=f.exec(r);null!==t&&p(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(r)}o.insertBefore(i,t),this.parts.push({type:"node",index:++s})}""===n[r]?(o.insertBefore(g(),t),i.push(t)):t.data=n[r],a+=r}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&s!==r||(s++,e.insertBefore(g(),t)),r=s,this.parts.push({type:"node",index:s}),null===t.nextSibling?t.data="":(i.push(t),s--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1}),a++}}else n.currentNode=o.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:i},parts:o}=t,n=document.createTreeWalker(i,133,null,!1);let r=y(o),s=o[r],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-l,r=y(o,r),s=o[r]}c.forEach(t=>t.parentNode.removeChild(t))}const b=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},y=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(m(e))return i}return-1};
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
class k{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let n,r=0,s=0,l=o.nextNode();for(;r<i.length;)if(n=i[r],m(n)){for(;s<n.index;)s++,"TEMPLATE"===l.nodeName&&(e.push(l),o.currentNode=l.content),null===(l=o.nextNode())&&(o.currentNode=e.pop(),l=o.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const C=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),T=` ${c} `;class E{constructor(t,e,i,o){this.strings=t,this.values=e,this.type=i,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let o=0;o<t;o++){const t=this.strings[o],n=t.lastIndexOf("\x3c!--");i=(n>-1||i)&&-1===t.indexOf("--\x3e",n+1);const r=f.exec(t);e+=null===r?t+(i?T:d):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+c}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==C&&(e=C.createHTML(e)),t.innerHTML=e,t}}
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
 */const M=t=>null===t||!("object"==typeof t||"function"==typeof t),O=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class P{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!O(t))return t}let o="";for(let n=0;n<e;n++){o+=t[n];const e=i[n];if(void 0!==e){const t=e.value;if(M(t)||!O(t))o+="string"==typeof t?t:String(t);else for(const e of t)o+="string"==typeof e?e:String(e)}}return o+=t[e],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===S||M(t)&&t===this.value||(this.value=t,x(t)||(this.committer.dirty=!0))}commit(){for(;x(this.value);){const t=this.value;this.value=S,t(this)}this.value!==S&&this.committer.commit()}}class j{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}const t=this.__pendingValue;t!==S&&(M(t)?t!==this.value&&this.__commitText(t):t instanceof E?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):O(t)?this.__commitIterable(t):t===$?(this.value=$,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof k&&this.value.template===e)this.value.update(t.values);else{const i=new k(e,t.processor,this.options),o=i._clone();i.update(t.values),this.__commitNode(o),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,o=0;for(const n of t)i=e[o],void 0===i&&(i=new j(this.options),e.push(i),0===o?i.appendIntoPart(this):i.insertAfterPart(e[o-1])),i.setValue(n),i.commit(),o++;o<e.length&&(e.length=o,this.clear(i&&i.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class A{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=S}}class V extends P{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new D(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class D extends N{}let H=!1;(()=>{try{const t={get capture(){return H=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class L{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;x(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=S}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(H?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function Y(t){let e=I.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},I.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const o=t.strings.join(c);return i=e.keyString.get(o),void 0===i&&(i=new u(t,t.getTemplateElement()),e.keyString.set(o,i)),e.stringsArray.set(t.strings,i),i}const I=new Map,B=new WeakMap;
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
 */const U=new
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
class{handleAttributeExpressions(t,e,i,o){const n=e[0];if("."===n){return new V(t,e.slice(1),i).parts}if("@"===n)return[new L(t,e.slice(1),o.eventContext)];if("?"===n)return[new A(t,e.slice(1),i)];return new P(t,e,i).parts}handleTextExpression(t){return new j(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const z=(t,...e)=>new E(t,e,"html",U)
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
 */,F=(t,e)=>`${t}--${e}`;let W=!0;void 0===window.ShadyCSS?W=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),W=!1);const q=t=>e=>{const i=F(e.type,t);let o=I.get(i);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},I.set(i,o));let n=o.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(c);if(n=o.keyString.get(r),void 0===n){const i=e.getTemplateElement();W&&window.ShadyCSS.prepareTemplateDom(i,t),n=new u(e,i),o.keyString.set(r,n)}return o.stringsArray.set(e.strings,n),n},J=["html","svg"],Z=new Set,X=(t,e,i)=>{Z.add(t);const o=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(o,t);const s=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),s.textContent+=e.textContent}(t=>{J.forEach(e=>{const i=I.get(F(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),v(t,i)})})})(t);const a=o.content;i?function(t,e,i=null){const{element:{content:o},parts:n}=t;if(null==i)return void o.appendChild(e);const r=document.createTreeWalker(o,133,null,!1);let s=y(n),a=0,l=-1;for(;r.nextNode();){l++;for(r.currentNode===i&&(a=b(e),i.parentNode.insertBefore(e,i));-1!==s&&n[s].index===l;){if(a>0){for(;-1!==s;)n[s].index+=a,s=y(n,s);return}s=y(n,s)}}}(i,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(s,a.firstChild);const t=new Set;t.add(s),v(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const G={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},K=(t,e)=>e!==t&&(e==e||t==t),Q={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:K};class tt extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const o=this._attributeNameForProperty(i,e);void 0!==o&&(this._attributeToPropertyMap.set(o,i),t.push(o))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdateInternal(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=K){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,o=e.converter||G,n="function"==typeof o?o:o.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,o=e.converter;return(o&&o.toAttribute||G.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Q){const o=this.constructor,n=o._attributeNameForProperty(t,i);if(void 0!==n){const t=o._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,o=i._attributeToPropertyMap.get(t);if(void 0!==o){const t=i.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let o=!0;if(void 0!==t){const n=this.constructor;i=i||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}tt.finalized=!0;
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
const et=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e),it=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ot(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):it(t,e)}function nt(t){return ot({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const rt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol();class at{constructor(t,e){if(e!==st)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const i=e.reduce((e,i,o)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[o+1],t[0]);return new at(i,st)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ct={};class dt extends tt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),o=[];i.forEach(t=>o.unshift(t)),this._styles=o}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!rt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new at(String(e),st)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==ct&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return ct}}dt.finalized=!0,dt.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const o=i.scopeName,n=B.has(e),r=W&&11===e.nodeType&&!!e.host,s=r&&!Z.has(o),a=s?document.createDocumentFragment():e;if(((t,e,i)=>{let o=B.get(e);void 0===o&&(l(e,e.firstChild),B.set(e,o=new j(Object.assign({templateFactory:Y},i))),o.appendInto(e)),o.setValue(t),o.commit()})(t,a,Object.assign({templateFactory:q(o)},i)),s){const t=B.get(a);B.delete(a);const i=t.value instanceof k?t.value.template:void 0;X(o,a,i),l(e,e.firstChild),e.appendChild(a),B.set(e,t)}!n&&r&&window.ShadyCSS.styleElement(e.host)},dt.shadowRootOptions={mode:"open"};var ht=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ut="[^\\s]+",pt=/\[([^]*?)\]/gm;function mt(t,e){for(var i=[],o=0,n=t.length;o<n;o++)i.push(t[o].substr(0,e));return i}var gt=function(t){return function(e,i){var o=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return o>-1?o:null}};function ft(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var o=0,n=e;o<n.length;o++){var r=n[o];for(var s in r)t[s]=r[s]}return t}var vt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],bt=["January","February","March","April","May","June","July","August","September","October","November","December"],yt=mt(bt,3),_t={dayNamesShort:mt(vt,3),dayNames:vt,monthNamesShort:yt,monthNames:bt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},wt=ft({},_t),xt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},St={D:function(t){return String(t.getDate())},DD:function(t){return xt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return xt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return xt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return xt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return xt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return xt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return xt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return xt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return xt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return xt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return xt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+xt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+xt(Math.floor(Math.abs(e)/60),2)+":"+xt(Math.abs(e)%60,2)}},$t=function(t){return+t-1},kt=[null,"[1-9]\\d?"],Ct=[null,ut],Tt=["isPm",ut,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],Et=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],Mt=(gt("monthNamesShort"),gt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Ot,Pt,Nt=function(t,e,i){if(void 0===e&&(e=Mt.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var o=[];e=(e=Mt[e]||e).replace(pt,(function(t,e){return o.push(e),"@@@"}));var n=ft(ft({},wt),i);return(e=e.replace(ht,(function(e){return St[e](t,n)}))).replace(/@@@/g,(function(){return o.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();(Pt=Ot||(Ot={})).language="language",Pt.system="system",Pt.comma_decimal="comma_decimal",Pt.decimal_comma="decimal_comma",Pt.space_comma="space_comma",Pt.none="none";var jt=["closed","locked","off"],At=function(t,e,i,o){o=o||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,t.dispatchEvent(n),n},Vt=function(t){At(window,"haptic",t)},Dt=function(t,e,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(Vt("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&At(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),At(window,"location-changed",{replace:i})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var o,n=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===n?"homeassistant":n;switch(n){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}t.callService(r,o,{entity_id:e})})(t,e,jt.includes(t.states[e].state))}(e,i.entity),Vt("success"));break;case"call-service":if(!o.service)return void Vt("failure");var n=o.service.split(".",2);e.callService(n[0],n[1],o.service_data),Vt("success");break;case"fire-dom-event":At(t,"ll-custom",o)}},Ht=function(t,e,i,o){var n;"double_tap"===o&&i.double_tap_action?n=i.double_tap_action:"hold"===o&&i.hold_action?n=i.hold_action:"tap"===o&&i.tap_action&&(n=i.tap_action),Dt(t,e,i,n)};function Lt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}var Rt=!1;if("undefined"!=typeof window){var Yt={get passive(){Rt=!0}};window.addEventListener("testPassive",null,Yt),window.removeEventListener("testPassive",null,Yt)}var It="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),Bt=[],Ut=!1,zt=-1,Ft=void 0,Wt=void 0,qt=void 0,Jt=function(t){return Bt.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Zt=function(t){var e=t||window.event;return!!Jt(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},Xt=function(t,e){if(t){if(!Bt.some((function(e){return e.targetElement===t}))){var i={targetElement:t,options:e||{}};Bt=[].concat(function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(Bt),[i]),It?window.requestAnimationFrame((function(){if(void 0===Wt){Wt={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,i=t.scrollX,o=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-i,setTimeout((function(){return window.requestAnimationFrame((function(){var t=o-window.innerHeight;t&&e>=o&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===qt){var e=!!t&&!0===t.reserveScrollBarGap,i=window.innerWidth-document.documentElement.clientWidth;if(e&&i>0){var o=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);qt=document.body.style.paddingRight,document.body.style.paddingRight=o+i+"px"}}void 0===Ft&&(Ft=document.body.style.overflow,document.body.style.overflow="hidden")}(e),It&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(zt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var i=t.targetTouches[0].clientY-zt;!Jt(t.target)&&(e&&0===e.scrollTop&&i>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&i<0?Zt(t):t.stopPropagation())}(e,t)},Ut||(document.addEventListener("touchmove",Zt,Rt?{passive:!1}:void 0),Ut=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},Gt=function(t){t?(Bt=Bt.filter((function(e){return e.targetElement!==t})),It&&(t.ontouchstart=null,t.ontouchmove=null,Ut&&0===Bt.length&&(document.removeEventListener("touchmove",Zt,Rt?{passive:!1}:void 0),Ut=!1)),It?function(){if(void 0!==Wt){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=Wt.position,document.body.style.top=Wt.top,document.body.style.left=Wt.left,window.scrollTo(e,t),Wt=void 0}}():(void 0!==qt&&(document.body.style.paddingRight=qt,qt=void 0),void 0!==Ft&&(document.body.style.overflow=Ft,Ft=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};console.info(`%c  ---- MY-SLIDER ---- \n%c  ${r("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let Kt=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!(t.entity.includes("input_number.")||t.entity.includes("light.")||t.entity.includes("media_player.")||t.entity.includes("cover.")||t.entity.includes("fan.")||t.entity.includes("switch.")||t.entity.includes("lock.")))throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const i=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",o=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+i]);var n=e.step?e.step:"1";i.includes("input_number.")&&(n=e.step?e.step:o.attributes.step);var r=e.minBar?e.minBar:0,s=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100,c=e.width?e.width:"100%",d=e.height?e.height:"50px",h=e.radius?e.radius:"4px",u=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:d;"0"!=f&&(f+="deg");var b=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",y=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",_=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",x=e.border?e.border:"0",S=e.thumbWidth?e.thumbWidth:"25px",$=e.thumbHeight?e.thumbHeight:"80px",k=e.thumbColor?e.thumbColor:"#FFFFFF",C=e.thumbColorOff?e.thumbColorOff:"#969696",T=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",E=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",M=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",O=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",P=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",N=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",j=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",A=!!e.lockTrack&&e.lockTrack,V=`\n\t\t\t--slider-width: ${c};\n\t\t\t--slider-width-inverse: -${c};\n\t\t\t--slider-height: ${d};\n\t\t\t--slider-main-color: ${"off"===o.state||"locked"===o.state||null==o.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${b};\n\t\t\t--slider-main-color-off: ${_};\n\t\t\t--slider-secondary-color: ${"off"===o.state||"locked"===o.state||null==o.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${y};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${h};\n\t\t\t--border: ${x};\n\n\t\t\t--thumb-width: ${S};\n\t\t\t--thumb-height: ${$};\n\t\t\t--thumb-color: ${"off"===o.state||null==o.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${k};\n\t\t\t--thumb-color-off: ${C};\n\t\t\t--thumb-horizontal-padding: ${T};\n\t\t\t--thumb-vertical-padding: ${E};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${u};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${M};\n\t\t\t--thumb-border-right: ${O};\n\t\t\t--thumb-border-left: ${P};\n\t\t\t--thumb-border-top: ${N};\n\t\t\t--thumb-border-bottom: ${j};\n\t\t\t\n\t\t\t--lock-track-container: ${A?"none":"auto"};\n\t\t`;const D=t=>{i.includes("light.")?"Warmth"==e.function?this._setWarmth(o,t.target,a,l):this._setBrightness(o,t.target,a,l):i.includes("input_number.")?this._setInputNumber(o,t.target,a,l):i.includes("media_player.")?this._setMediaVolume(o,t.target,a,l):i.includes("cover.")?this._setCover(o,t.target,a,l):i.includes("fan.")?this._setFan(o,t.target,a,l):i.includes("switch.")?this._setSwitch(o,t.target,a,l,r,s):i.includes("lock.")&&this._setLock(o,t.target,a,l,r,s)},H=t=>{e.intermediate&&D(t)},L=t=>{e.intermediate||D(t)},R=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Xt(window):Gt(window)};if(i.includes("light."))return"Warmth"==e.function?z`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${o.state}" style="${V}"
								min="${o.attributes.min_mireds}" max="${o.attributes.max_mireds}"
								step="${n}" .value="${"off"===o.state?0:o.attributes.color_temp}"
								@input=${H} @change=${L}
								@touchstart=${e.toggle_scroll?R:null}
								@touchend=${e.toggle_scroll?R:null} >
						</div>
					</ha-card>
				`:z`
					<ha-card>
						<div class="slider-container" style="${V}">
							<input name="foo" type="range" class="${o.state}" style="${V}"
								step="${n}" .value="${"off"===o.state?0:Math.round(o.attributes.brightness/2.56)}"
								@input=${H} @change=${L}
								@touchstart=${e.toggle_scroll?R:null}
								@touchend=${e.toggle_scroll?R:null} >
						</div>
					</ha-card>
				`;if(i.includes("input_number."))return z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${o.attributes.min}" max="${o.attributes.max}"
							step="${n}" .value="${o.state}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?R:null}
							@touchend=${e.toggle_scroll?R:null} >
					</div>
				</ha-card>
			`;if(i.includes("media_player.")){var Y=0;if(null!=o.attributes.volume_level)Y=Number(100*o.attributes.volume_level);return z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${n}" .value="${Y}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?R:null}
							@touchend=${e.toggle_scroll?R:null} >
					</div>
				</ha-card>
			`}return i.includes("cover.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${n}"
							.value="${o.attributes.current_position}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?R:null}
							@touchend=${e.toggle_scroll?R:null} >
					</div>
				</ha-card>
			`:i.includes("fan.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${n}"
							.value="${o.attributes.percentage}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?R:null}
							@touchend=${e.toggle_scroll?R:null} >
					</div>
				</ha-card>
			`:i.includes("switch.")||i.includes("lock.")?z`
				<ha-card>
					<div class="slider-container" style="${V}">
						<input name="foo" type="range" class="${o.state}" style="${V}"
							min="${r}" max="${s}" step="${n}" .value="${r}"
							@input=${H} @change=${L}
							@touchstart=${e.toggle_scroll?R:null}
							@touchend=${e.toggle_scroll?R:null} >
					</div>
				</ha-card>
			`:void 0}_setBrightness(t,e,i,o){var n=e.value;n>o?n=o:n<i&&(n=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*n}),e.value=n}_setWarmth(t,e,i,o){var n=e.value;n>o?n=o:n<i&&(n=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:n}),e.value=n}_setInputNumber(t,e,i,o){var n=e.value;n>o?n=o:n<i&&(n=i),this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:n}),e.value=n}_setFan(t,e,i,o){var n=e.value;n>o?n=o:n<i&&(n=i),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:n}),e.value=n}_setCover(t,e,i,o){var n=e.value;n>o?n=o:n<i&&(n=i),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:n}),e.value=n}_setMediaVolume(t,e,i,o){var n=e.value;n>o?n=o:n<i&&(n=i),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:n/100}),e.value=n}_setSwitch(t,e,i,o,n,r){var s=e.value,a=Math.min(o,r);Number(a)<=s&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(i,n))}_setLock(t,e,i,o,n,r){var s=e.value,a=Math.min(o,r);if(Number(a)<=s){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(i,n))}static get styles(){return lt`
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
		`}};s([ot({attribute:!1})],Kt.prototype,"hass",void 0),s([nt()],Kt.prototype,"config",void 0),Kt=s([et("my-slider")],Kt);
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
const Qt=new WeakMap,te=w(t=>e=>{if(!(e instanceof N)||e instanceof D||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:o}=i.element;let n=Qt.get(e);void 0===n&&(o.cssText=i.strings.join(" "),Qt.set(e,n=new Set)),n.forEach(e=>{e in t||(n.delete(e),-1===e.indexOf("-")?o[e]=null:o.removeProperty(e))});for(const e in t)n.add(e),-1===e.indexOf("-")?o[e]=t[e]:o.setProperty(e,t[e])}),ee=(t,e={})=>{switch(t){case"card":return ie(e);case"container":return oe(e);case"track":return ne(e);case"progress":return re(e);case"thumb":return se(e);default:return void console.log("Getting default styles")}},ie=t=>Object.assign({height:"125px"},t),oe=t=>Object.assign({width:"100%",height:"100%",position:"relative",overflow:"hidden","border-radius":"5px"},t),ne=t=>Object.assign({width:"100%",height:"100%",position:"relative",background:"red","pointer-events":"none"},t),re=t=>Object.assign({height:"100%",background:"blue",position:"relative",width:"0.00%","pointer-events":"none"},t),se=t=>Object.assign({height:"100%",background:"purple",position:"absolute",right:"-5px",width:"10px","pointer-events":"none"},t);Object.prototype.deflate=function(t,e){var i,o;for(var n in t=void 0===t?[]:t,e=void 0===e?{}:e,this)this.hasOwnProperty(n)&&(i=n,o=this[n],t.push(i),"object"==typeof o&&null!==o?e=o.deflate(t,e):e[t[t.length-1]]=o,t.pop());return e};const ae=(t,e=100,i=0)=>t/(e-i)*100,le=t=>Math.round(100*(t+Number.EPSILON))/100;console.info(`%c  ---- MY-SLIDER-V2 ---- \n%c  ${r("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider-v2",name:"Slider Card V2",description:"Custom Slider Card V2 for Lovelace."});let ce=class extends dt{constructor(){super(...arguments),this.sliderId="",this.touchInput=!1,this.showMin=!1,this.savedMin=0,this.min=0,this.max=100,this.minThreshold=0,this.maxThreshold=100,this.step=1,this.sliderVal=0,this.sliderValPercent=0}setSliderValues(t,e){this.sliderVal=t,this.sliderValPercent=e}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){const e=["light","input_number","media_player","cover","fan","switch","lock"];if(!t.entity)throw new Error("You need to define entity");if(!e.includes(t.entity.split(".")[0]))throw new Error("Entity has to be one of the following: "+e.map(t=>" "+t));this.config=Object.assign({name:"MySliderV2"},t)}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t,e,i,o,n,r,s,a,l,c;this.initializeConfig();const d=ee("card",null===(e=null===(t=this.config.styles)||void 0===t?void 0:t.card)||void 0===e?void 0:e.deflate()),h=ee("container",null===(o=null===(i=this.config.styles)||void 0===i?void 0:i.container)||void 0===o?void 0:o.deflate()),u=ee("track",null===(r=null===(n=this.config.styles)||void 0===n?void 0:n.track)||void 0===r?void 0:r.deflate()),p=ee("progress",null===(a=null===(s=this.config.styles)||void 0===s?void 0:s.progress)||void 0===a?void 0:a.deflate()),m=ee("thumb",null===(c=null===(l=this.config.styles)||void 0===l?void 0:l.thumb)||void 0===c?void 0:c.deflate());p.width=this.sliderValPercent.toString()+"%";const g=t=>{switch(t.type){case"mousedown":if(this.touchInput)return;f(t);break;case"touchstart":this.touchInput=!0,f(t);break;case"mousemove":if(this.touchInput)return;b(t);break;case"touchmove":this.config.disable_scroll&&t.preventDefault(),b(t);break;case"mouseup":case"touchend":case"touchcancel":v(t)}},f=t=>{this.sliderEl=t.target,!0!==this.config.dragging&&(this.config.dragging=!0,this.calcProgress(t))},v=t=>{!1!==this.config.dragging&&(this.config.dragging=!1,this.calcProgress(t))},b=t=>{this.config.dragging&&this.calcProgress(t)};return this.createAndCleanupEventListeners(g),z`
            <ha-card style="${te(d)}">
                <div class="my-slider-custom" id="${this.sliderId}" style="${te(h)}"
                    @mousedown="${g}"
                    @mouseup="${g}"
                    @mousemove="${g}"
                    @touchstart="${g}"
                    @touchend="${g}"
                    @touchcancel="${g}" 
                    @touchmove="${g}"
                >
                    <div class="my-slider-custom-track" style="${te(u)}">
                        <div class="my-slider-custom-progress" style="${te(p)}">
                            <div class="my-slider-custom-thumb" style="${te(m)}"></div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `}initializeConfig(){const t=this.config.entity;switch(this.entity=this.hass.states[""+t],this.sliderId="slider-"+this.config.entity.replace(".","-"),this.showMin=!!this.config.showMin&&this.config.showMin,this.savedMin=this.config.min?this.config.min:0,this.max=this.config.max?this.config.max:100,this.minThreshold=this.config.minThreshold?this.config.minThreshold:0,this.maxThreshold=this.config.maxThreshold?this.config.maxThreshold:100,this.step=this.config.step?this.config.step:1,t.split(".")[0]){case"light":if(this.config.warmth){if("on"!==this.entity.state)break;this.savedMin=this.entity.attributes.min_mireds,this.max=this.entity.attributes.max_mireds;let t=parseFloat(this.entity.attributes.color_temp);this.showMin||(this.max=this.max-this.savedMin,t-=this.savedMin);const e=le(ae(t,this.max));this.setSliderValues(t,e)}else{if("on"!==this.entity.state)break;let t=Math.round(this.entity.attributes.brightness/2.56);this.showMin||(t-=this.savedMin);const e=le(ae(t,this.max,this.min));this.setSliderValues(t,e)}break;case"input_number":this.step=this.entity.attributes.step,this.savedMin=this.entity.attributes.min,this.max=this.entity.attributes.max;let t=parseFloat(this.entity.state);this.showMin||(this.max=this.max-this.savedMin,t-=this.savedMin);const e=le(ae(t,this.max));this.setSliderValues(t,e);break;case"switch":this.minThreshold=this.config.minThreshold?this.config.minThreshold:15,this.maxThreshold=this.config.maxThreshold?this.config.maxThreshold:75,this.setSliderValues(Number(Math.max(this.min,this.minThreshold)),Number(Math.max(this.min,this.minThreshold)));break;case"lock":this.minThreshold=this.config.minThreshold?this.config.minThreshold:15,this.maxThreshold=this.config.maxThreshold?this.config.maxThreshold:75;const i=Number(Math.max(this.min,this.minThreshold));this.setSliderValues(i,i);break;default:console.log("Default")}}calcProgress(t){if(null==this.sliderEl||null===this.sliderEl)return;const e=((t,e)=>{let i={x:0,y:0};if("touchstart"==t.type||"touchmove"==t.type||"touchend"==t.type||"touchcancel"==t.type){var o=void 0===t.originalEvent?t:t.originalEvent,n=o.touches[0]||o.changedTouches[0];i.x=n.pageX,i.y=n.pageY}else"mousedown"!=t.type&&"mouseup"!=t.type&&"mousemove"!=t.type&&"mouseover"!=t.type&&"mouseout"!=t.type&&"mouseenter"!=t.type&&"mouseleave"!=t.type||(i.x=t.clientX,i.y=t.clientY);var r=e.getBoundingClientRect();return{x:i.x-r.left,y:i.y-r.top}})(t,this.sliderEl),i=this.sliderEl.offsetWidth,o=le(ae(e.x,i))/100*(this.max-0);this.setProgress(this.sliderEl,Math.round(o),t.type)}setProgress(t,e,i){e>this.max?e=this.max:e<this.min&&(e=this.min);const o=t.querySelector(".my-slider-custom-progress"),n=le(ae(e,this.max,0));o.style.width=n.toString()+"%",this.sliderVal!==e&&((!this.config.intermediate||"mousemove"!==i&&"touchmove"!==i)&&(this.config.intermediate||"mouseup"!==i&&"touchend"!==i&&"touchcancel"!==i)||this.setValue(e,n))}setValue(t,e){if(this.entity)switch(this.setSliderValues(t,e),this.showMin||(t+=this.savedMin),this.config.entity.split(".")[0]){case"light":this.config.warmth?this._setWarmth(this.entity,t):this._setBrightness(this.entity,t);break;case"input_number":this._setInputNumber(this.entity,t);break;case"lock":this._setLock(this.entity,t);break;default:console.log("Default")}}_setBrightness(t,e){this.hass.callService("light","turn_on",{entity_id:t.entity_id,brightness:2.56*e})}_setWarmth(t,e){this.hass.callService("light","turn_on",{entity_id:t.entity_id,color_temp:e})}_setInputNumber(t,e){this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:e})}_setFan(t,e){this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:e})}_setCover(t,e){this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:e})}_setMediaVolume(t,e){this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100})}_setSwitch(t,e){var i=Math.min(this.max,this.maxThreshold);Number(i)<=e&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id});const o=Number(Math.max(this.min,this.minThreshold)),n=le(ae(o,this.max,this.min));this.setSliderValues(o,n);const r=this.sliderEl.querySelector(".my-slider-custom-progress");r.style.transition="width 0.2s ease 0s",r.style.width=n.toString()+"%",setTimeout(()=>{r.style.transition="initial"},200)}_setLock(t,e){var i=Math.min(this.max,this.maxThreshold);if(Number(i)<=e){var o="locked"===t.state?"unlock":"lock";this.hass.callService("lock",o,{entity_id:t.entity_id})}const n=Number(Math.max(this.min,this.minThreshold)),r=le(ae(n,this.max,this.min));this.setSliderValues(n,r);const s=this.sliderEl.querySelector(".my-slider-custom-progress");s.style.transition="width 0.2s ease 0s",s.style.width=r.toString()+"%",setTimeout(()=>{s.style.transition="initial"},200)}createAndCleanupEventListeners(t){document.removeEventListener("mouseup",t),document.removeEventListener("touchend",t),document.removeEventListener("touchcancel",t),document.addEventListener("mouseup",t),document.addEventListener("touchend",t),document.addEventListener("touchcancel",t),document.addEventListener("mousemove",t)}static get styles(){return lt`
		`}};s([ot({attribute:!1})],ce.prototype,"hass",void 0),s([nt()],ce.prototype,"config",void 0),ce=s([et("my-slider-v2")],ce);const de="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class he extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:de?"100px":"50px",height:de?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},o=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?At(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,At(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,At(t,"action",{action:"double_tap"})):At(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",o),t.addEventListener("touchcancel",o),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",o),t.addEventListener("keyup",t=>{13===t.keyCode&&o(t)})}startAnimation(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-my-footer",he);const ue=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-my-footer"))return t.querySelector("action-handler-my-footer");const e=document.createElement("action-handler-my-footer");return t.appendChild(e),e})();i&&i.bind(t,e)},pe=w((t={})=>e=>{ue(e.committer.element,t)}),me=t=>{if(!t)return"";let e="";return Object.keys(t).map(i=>{const o=t[i];e+=ge(i)+":"+o+";"}),e},ge=t=>t.split("").map((t,e)=>t.toUpperCase()===t&&"-"!==t?`${0!==e?"-":""}${t.toLowerCase()}`:t).join(""),fe=(t,e)=>{switch(t){case"my-button-card":return ve(e);case"my-button-icon":return be(e);case"my-button-label":return ye(e);case"my-button-label-vertical":return _e(e);case"my-button-label-wrapper":return we(e);case"my-button-slider":return xe(e);case"my-button-slider-vertical":return xe(e,!0);case"my-button-slider-wrapper":return ke(e);default:return void console.log("Getting default styles")}},ve=t=>(t||(t={}),Object.assign({height:t.height?t.height:"125px",width:t.width?t.width:"100%","min-width":"fit-content",background:t.background?t.background:"var(--card-background-color)"},t)),be=t=>(t||(t={}),Object.assign({height:t.height?t.height:"35px",width:t.width?t.width:"35px",display:t.display?t.display:"inline-block",padding:t.padding?t.padding:"10px 10px 10px 10px",cursor:"pointer",color:t.color?t.color:"var(--paper-item-active-icon-color)"},t)),ye=t=>(t||(t={}),Object.assign({padding:t.padding?t.padding:"0",margin:t.margin?t.margin:"0 10px",color:t.color?t.color:"var(--primary-text-color)","font-weight":"bold"},t)),_e=t=>(t||(t={}),Object.assign({padding:0,margin:"0 10px",color:"var(--primary-text-color)","font-weight":"bold",transform:"rotate(270deg)"},t)),we=t=>(t||(t={}),Object.assign({width:"30px",height:"100%",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center","padding-left":"10px"},t)),xe=(t,e=!1)=>{if(t&&0!==Object.keys(t).length||(t={container:{},input:{},track:{},thumb:{}}),e){return{containerStyle:Ce(t.container?t.container:{}),inputStyle:Te(t.input?t.input:{})}}return{containerStyle:Se(t.container?t.container:{}),inputStyle:$e(t.input?t.input:{}),trackStyle:Ee(t.track?t.track:{}),thumbStyle:Me(t.thumb?t.thumb:{})}},Se=t=>(t||(t={}),Object.assign({height:"30px",position:"relative",overflow:"hidden","border-radius":"5px","--slider-color":"var(--paper-item-icon-active-color)"},t)),$e=t=>(t||(t={}),Object.assign({outline:"0",border:"0",width:"100%",height:"100%","border-radius":"5px","background-color":"#4d4d4d",margin:"0",transition:"box-shadow 0.2s ease-in-out",overflow:"hidden","-webkit-appearance":"none",position:"absolute",top:"0px",bottom:"0px",right:"0px",left:"0px","pointer-events":"auto"},t)),ke=t=>(t||(t={}),Object.assign({width:"30px",height:"100%",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center","margin-right":"3px","pointer-events":"auto"},t)),Ce=t=>(t||(t={}),Object.assign(Object.assign({},t),{height:t.width?t.width:"30px",width:t.height?t.height:"calc(125px - 4px)",overflow:t.overflow?t.overflow:"hidden","border-radius":t["border-radius"]?t["border-radius"]:"5px","--slider-color":t.color?t.color:"#4d4d4d",display:t.flex?t.flex:"flex","flex-direction":t["flex-direction"]?t["flex-direction"]:"column","justify-content":t["justify-content"]?t["justify-content"]:"center","align-items":t["align-items"]?t["align-items"]:"center","-webkit-transform":t["-webkit-transform"]?t["-webkit-transform"]:"rotate(270deg)","-moz-transform":t["-moz-transform"]?t["-moz-transform"]:"rotate(270deg)","-o-transform":t["-o-transform"]?t["-o-transform"]:"rotate(270deg)","-ms-transform":t["-ms-transform"]?t["-ms-transform"]:"rotate(270deg)",transform:t.transform?t.transform:"rotate(270deg)","pointer-events":t["pointer-events"]?t["pointer-events"]:"auto"})),Te=t=>(t||(t={}),Object.assign({outline:"0",border:"0","border-radius":"5px","background-color":"var(--paper-item-icon-active-color)",margin:"0",transition:"box-shadow 0.2s ease-in-out",overflow:"hidden","-webkit-appearance":"none","pointer-events":"auto"},t)),Ee=t=>(t||(t={}),Object.assign({height:"100%","-webkit-appearance":"none",color:"red",transition:"box-shadow 0.2s ease-in-out"},t)),Me=t=>(t||(t={}),Object.assign({width:"25px",height:"80px","-webkit-appearance":"none",cursor:"ew-resize","border-radius":"0",transition:"box-shadow 0.2s ease-in-out",position:"relative","box-shadow":"-3500px 0 0 3500px var(--accent-color), inset 0 0 0 25px #FFFFFF",top:"calc((100% - 80px) / 2)","border-right":"10px solid var(--accent-color)","border-left":"10px solid var(--accent-color)","border-top":"20px solid var(--accent-color)","border-bottom":"20px solid var(--accent-color)","pointer-events":"auto"},t));console.info(`%c  ---- MY-BUTTON-LIGHT ---- \n%c  ${r("common.version")} 0.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-button-light",name:"Light Button Card",description:"Custom Light Button Card for Lovelace."});let Oe=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!t.entity.includes("light."))throw new Error("Entity has to be a light.");this.config=Object.assign({name:"MyButtonLight",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t,e,i,o,n,r,s,a;const l=this.config.styles?this.config.styles:{},c=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",d=this.hass.states[""+c],h={show:!0,icon:"mdi:cog-outline"},u="string"==typeof this.config.icon?Object.assign(Object.assign({},h),{icon:this.config.icon}):"object"==typeof this.config.icon?Object.assign(Object.assign({},h),this.config.icon):h,p={show:!0,text:d.attributes.friendly_name},m="string"==typeof this.config.label?Object.assign(Object.assign({},p),{text:this.config.label}):"object"==typeof this.config.label?Object.assign(Object.assign({},p),this.config.label):p,g={min:0,max:100,step:"1",show:!0},f=this.config.slider?Object.assign(Object.assign({},g),this.config.slider):g,v=fe("my-button-card",l.card),b=fe("my-button-icon",l.icon),y=fe("my-button-label",l.label),{containerStyle:_,inputStyle:w,trackStyle:x,thumbStyle:S}=fe("my-button-slider",l.slider);this._trackStyle=me(x),this._thumbStyle=me(S),"on"===d.state?(v["color-on"]&&(v.background=v["color-on"]),b["color-on"]&&(b.color=b["color-on"]),y["color-on"]&&(y.color=y["color-on"]),_["color-on"]&&(_["--slider-color"]=_["color-on"])):(v["color-off"]&&(v.background=v["color-off"]),b["color-off"]?b.color=b["color-off"]:b.color="var(--paper-item-icon-color)",y["color-off"]&&(y.color=y["color-off"]),_["color-off"]?_["--slider-color"]=_["color-off"]:_["--slider-color"]="var(--paper-slider-secondary-color)");const $=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Xt(window):Gt(window)},k=t=>{this._setBrightness(d,t.target,f.min,f.max)};return z`
            <ha-card class="my-button-card" style="${me(v)}">
                <div class="flex-container">
                    <div class="row-1" 
                    @action=${t=>this._handleAction(t,this.config)}
                    .actionHandler=${pe({hasDoubleClick:"none"!==(null===(e=null===(t=this.config)||void 0===t?void 0:t.double_tap_action)||void 0===e?void 0:e.action),hasHold:"none"!==(null===(o=null===(i=this.config)||void 0===i?void 0:i.hold_action)||void 0===o?void 0:o.action)})}>
                        ${(()=>{var t,e,i,o;return u.show?z`
                <ha-icon class="my-button-icon" icon="${u.icon}" style="${me(b)}"
                    @action=${t=>this._handleAction(t,this.config)}
                    .actionHandler=${pe({hasDoubleClick:"none"!==(null===(e=null===(t=this.config)||void 0===t?void 0:t.double_tap_action)||void 0===e?void 0:e.action),hasHold:"none"!==(null===(o=null===(i=this.config)||void 0===i?void 0:i.hold_action)||void 0===o?void 0:o.action)})} />
            `:z``})()}
                    </div>
                    <div class="row-2" 
                    @action=${t=>this._handleAction(t,this.config)}
                    .actionHandler=${pe({hasDoubleClick:"none"!==(null===(r=null===(n=this.config)||void 0===n?void 0:n.double_tap_action)||void 0===r?void 0:r.action),hasHold:"none"!==(null===(a=null===(s=this.config)||void 0===s?void 0:s.hold_action)||void 0===a?void 0:a.action)})}>
                        ${m.show?z`
                <label class="my-button-label" style="${me(y)}">${m.text}</label>
            `:z``}
                    </div>
                    <div class="row-3">
                        ${f.show?z`
                <div class="slider-container" style="${me(_)}">
                    <input name="slider" type="range" class="" style="${me(w)}"
                        min="${f.min}" max="${f.max}" step="${f.step}" 
                        value="${"off"===d.state?0:Math.round(d.attributes.brightness/2.56)}"
                        @change=${!f.intermediate&&k}
                        @input=${f.intermediate&&k}
                        @touchstart=${f.toggle_scroll?$:null}
                        @touchend=${f.toggle_scroll?$:null}
                    />
                </div>
            `:z``}
                    </div>
                </div>
            </ha-card>
        `}_handleAction(t,e){var i;if(e.entity||(e.entity=this.config.entity),null===(i=t.detail)||void 0===i?void 0:i.action)switch(t.detail.action){case"tap":e.tap_action&&this._handleTap(e);break;case"hold":e.hold_action&&this._handleHold(e);break;case"double_tap":e.double_tap_action&&this._handleDblTap(e)}}_handleTap(t){Ht(this,this.hass,t,"tap")}_handleHold(t){Ht(this,this.hass,t,"hold")}_handleDblTap(t){Ht(this,this.hass,t,"double_tap")}_showWarning(t){return z` <hui-warning>${t}</hui-warning> `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),z` ${e} `}_setBrightness(t,e,i,o){const n=e.value>o?o:e.value<i?i:e.value;this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*n}),e.value=n}static get styles(){return lt`
            .my-button-icon {
                --mdc-icon-size: 100%;
            }
            .flex-container {
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: column;
                height: 100%;
            }
            .flex-container div {
            }
            
            .flex-container .row-1 {
                flex: 0 1 auto; 
            }
            .flex-container .row-2 {
                flex: 1 1 auto;
            }
            .flex-container .row-3 {
                flex: 0 1 auto;
                margin: 0 2px 2px 2px;
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
        `}};s([ot({attribute:!1})],Oe.prototype,"hass",void 0),s([nt()],Oe.prototype,"config",void 0),Oe=s([et("my-button-light")],Oe),console.info(`%c  ---- MY-BUTTON-COVER ---- \n%c  ${r("common.version")} 0.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-button-cover",name:"Cover Button Card",description:"Custom Cover Button Card for Lovelace."});let Pe=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!t.entity.includes("cover."))throw new Error("Entity has to be a cover.");this.config=Object.assign({name:"MyButtonCover",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t,e,i,o,n;const r=this.config.styles?JSON.parse(JSON.stringify(this.config.styles)):{},s=this.config.entity?this.config.entity:"ERROR",a=this.hass.states[""+s],l={show:!0,icon:"",iconOpen:"mdi:blinds-open",iconClose:"mdi:blinds"},c="string"==typeof this.config.icon?Object.assign(Object.assign({},l),{icon:this.config.icon}):"object"==typeof this.config.icon?Object.assign(Object.assign({},l),this.config.icon):l,d={show:!0,text:a.attributes.friendly_name,vertical:!0},h="string"==typeof this.config.label?Object.assign(Object.assign({},d),{text:this.config.label}):"object"==typeof this.config.label?Object.assign(Object.assign({},d),this.config.label):d,u={min:0,max:100,step:"1"},p=this.config.slider?Object.assign(Object.assign({},u),this.config.slider):u,m=fe("my-button-card",r.card),g=fe("my-button-icon",r.icon),f=h.vertical?fe("my-button-label-vertical",r.label):fe("my-button-label",r.label),v=fe("my-button-label-wrapper",r["label-wrapper"]),{containerStyle:b,inputStyle:y}=fe("my-button-slider-vertical",r.slider),_=fe("my-button-slider-wrapper",null===(t=r.slider)||void 0===t?void 0:t.wrapper),w=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Xt(window):Gt(window)},x=t=>{this._setCover(a,t.target,p.min,p.max)};if("ERROR"===s)return z`<ha-card>Error: No Entity ID</ha-card>`;return z`
            <ha-card class="my-button-card" style="${me(m)}">
                <div class="my-button-wrapper">
                    <div class="flex-container-columns">
                        <div class="column-1"
                            @action=${t=>this._handleAction(t,this.config)}
                            .actionHandler=${pe({hasDoubleClick:"none"!==(null===(i=null===(e=this.config)||void 0===e?void 0:e.double_tap_action)||void 0===i?void 0:i.action),hasHold:"none"!==(null===(n=null===(o=this.config)||void 0===o?void 0:o.hold_action)||void 0===n?void 0:n.action)})}
                        >
                            <div class="flex-container-rows">
                                <div class="row-1">
                                    ${(()=>{var t,e;if(!c.show)return z``;let i=c.icon?c.icon:"",o=c.iconOpen?c.iconOpen:"mdi:blinds-open",n=c.iconClose?c.iconClose:"mdi:blinds";return""===i&&(i=n,a.attributes.current_position>=50&&(i=o)),z`
                <ha-icon class="my-button-icon" icon="${i}" style="${me(g)}"
                    @action=${t=>this._handleAction(t,c)}
                    .actionHandler=${pe({hasDoubleClick:"none"!==(null===(t=null==c?void 0:c.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=null==c?void 0:c.hold_action)||void 0===e?void 0:e.action)})}
                />
            `})()}
                                </div>
                                <div class="row-2">
                                    ${(()=>{var t,e;return h.show?z`
                <div style="${h.vertical?me(v):"display: block;"}"
                    @action=${t=>this._handleAction(t,h)}
                    .actionHandler=${pe({hasDoubleClick:"none"!==(null===(t=null==h?void 0:h.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=null==h?void 0:h.hold_action)||void 0===e?void 0:e.action)})}
                >

                    <label style="${me(f)}">${h.text}</label>
                </div>
            `:z``})()}
                                </div>
                                <div class="row-3"></div>
                            </div>
                        </div>
                        <div class="column-2">
                            <div style="${me(_)}">
                                <div class="slider-container" style="${me(b)}">
                                    <input name="slider" type="range" class="" style="${me(y)}"
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
        `}_handleAction(t,e){var i;if(e.entity||(e.entity=this.config.entity),null===(i=t.detail)||void 0===i?void 0:i.action)switch(t.detail.action){case"tap":e.tap_action&&this._handleTap(e);break;case"hold":e.hold_action&&this._handleHold(e);break;case"double_tap":e.double_tap_action&&this._handleDblTap(e)}}_handleTap(t){Ht(this,this.hass,t,"tap")}_handleHold(t){Ht(this,this.hass,t,"hold")}_handleDblTap(t){Ht(this,this.hass,t,"double_tap")}_setCover(t,e,i,o){var n=e.value;n>o?n=o:n<i&&(n=i),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:n}),e.value=n}static get styles(){return lt`
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
        `}};s([ot({attribute:!1})],Pe.prototype,"hass",void 0),s([nt()],Pe.prototype,"config",void 0),Pe=s([et("my-button-cover")],Pe),console.info(`%c  ---- MY-CARDS ---- \n%c  ${r("common.version")} 1.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{Pe as MyButtonCover,Oe as MyButtonLight,Kt as MySlider,ce as MySliderV2};

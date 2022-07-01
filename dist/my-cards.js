var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},i={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},s={common:i};const n={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:i,default:s})};function r(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce((t,e)=>t[e],n[s])}catch(e){r=t.split(".").reduce((t,e)=>t[e],n.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],n.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}
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
***************************************************************************** */function o(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o
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
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},h=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${h}--\x3e`,d=new RegExp(`${h}|${c}`);class u{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],n=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,a=0;const{strings:l,values:{length:c}}=t;for(;a<c;){const t=n.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)p(e[t].name,"$lit$")&&s++;for(;s-- >0;){const e=l[a],i=f.exec(e)[2],s=i.toLowerCase()+"$lit$",n=t.getAttribute(s);t.removeAttribute(s);const r=n.split(d);this.parts.push({type:"attribute",index:o,name:i,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(h)>=0){const s=t.parentNode,n=e.split(d),r=n.length-1;for(let e=0;e<r;e++){let i,r=n[e];if(""===r)i=g();else{const t=f.exec(r);null!==t&&p(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++o})}""===n[r]?(s.insertBefore(g(),t),i.push(t)):t.data=n[r],a+=r}}else if(8===t.nodeType)if(t.data===h){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(g(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(i.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(h,e+1));)this.parts.push({type:"node",index:-1}),a++}}else n.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,133,null,!1);let r=b(s),o=s[r],a=-1,l=0;const h=[];let c=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(h.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,r=b(s,r),o=s[r]}h.forEach(t=>t.parentNode.removeChild(t))}const y=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},b=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(m(e))return i}return-1};
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
const _=new WeakMap,w=t=>"function"==typeof t&&_.has(t),S={},x={};
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
class ${constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let n,r=0,o=0,l=s.nextNode();for(;r<i.length;)if(n=i[r],m(n)){for(;o<n.index;)o++,"TEMPLATE"===l.nodeName&&(e.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=e.pop(),l=s.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const M=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),P=` ${h} `;class C{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],n=t.lastIndexOf("\x3c!--");i=(n>-1||i)&&-1===t.indexOf("--\x3e",n+1);const r=f.exec(t);e+=null===r?t+(i?P:c):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+h}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==M&&(e=M.createHTML(e)),t.innerHTML=e,t}}
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
 */const T=t=>null===t||!("object"==typeof t||"function"==typeof t),k=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class N{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new E(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!k(t))return t}let s="";for(let n=0;n<e;n++){s+=t[n];const e=i[n];if(void 0!==e){const t=e.value;if(T(t)||!k(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===S||T(t)&&t===this.value||(this.value=t,w(t)||(this.committer.dirty=!0))}commit(){for(;w(this.value);){const t=this.value;this.value=S,t(this)}this.value!==S&&this.committer.commit()}}class V{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}const t=this.__pendingValue;t!==S&&(T(t)?t!==this.value&&this.__commitText(t):t instanceof C?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):k(t)?this.__commitIterable(t):t===x?(this.value=x,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof $&&this.value.template===e)this.value.update(t.values);else{const i=new $(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)i=e[s],void 0===i&&(i=new V(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class O{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=S}}class A extends N{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new D(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class D extends E{}let Y=!1;(()=>{try{const t={get capture(){return Y=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class L{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=S,t(this)}if(this.__pendingValue===S)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=S}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(Y?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function H(t){let e=I.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},I.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(h);return i=e.keyString.get(s),void 0===i&&(i=new u(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const I=new Map,U=new WeakMap;
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
class{handleAttributeExpressions(t,e,i,s){const n=e[0];if("."===n){return new A(t,e.slice(1),i).parts}if("@"===n)return[new L(t,e.slice(1),s.eventContext)];if("?"===n)return[new O(t,e.slice(1),i)];return new N(t,e,i).parts}handleTextExpression(t){return new V(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const F=(t,...e)=>new C(t,e,"html",B)
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
 */,j=(t,e)=>`${t}--${e}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),z=!1);const W=t=>e=>{const i=j(e.type,t);let s=I.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},I.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(h);if(n=s.keyString.get(r),void 0===n){const i=e.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(i,t),n=new u(e,i),s.keyString.set(r,n)}return s.stringsArray.set(e.strings,n),n},q=["html","svg"],J=new Set,Z=(t,e,i)=>{J.add(t);const s=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(s,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{q.forEach(e=>{const i=I.get(j(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),v(t,i)})})})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,133,null,!1);let o=b(n),a=0,l=-1;for(;r.nextNode();){l++;for(r.currentNode===i&&(a=y(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=b(n,o);return}o=b(n,o)}}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),v(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const X={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},G=(t,e)=>e!==t&&(e==e||t==t),K={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:G};class Q extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=K){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdateInternal(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||K}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=G){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||X,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||X.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=K){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let s=!0;if(void 0!==t){const n=this.constructor;i=i||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Q.finalized=!0;
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
const tt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),et=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function it(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):et(t,e)}function st(t){return it({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const nt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol();class ot{constructor(t,e){if(e!==rt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const at=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof ot)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new ot(i,rt)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const lt={};class ht extends Q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),s=[];i.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!nt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new ot(String(e),rt)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==lt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return lt}}ht.finalized=!0,ht.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,n=U.has(e),r=z&&11===e.nodeType&&!!e.host,o=r&&!J.has(s),a=o?document.createDocumentFragment():e;if(((t,e,i)=>{let s=U.get(e);void 0===s&&(l(e,e.firstChild),U.set(e,s=new V(Object.assign({templateFactory:H},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,a,Object.assign({templateFactory:W(s)},i)),o){const t=U.get(a);U.delete(a);const i=t.value instanceof $?t.value.template:void 0;Z(s,a,i),l(e,e.firstChild),e.appendChild(a),U.set(e,t)}!n&&r&&window.ShadyCSS.styleElement(e.host)},ht.shadowRootOptions={mode:"open"};var ct=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,dt="[^\\s]+",ut=/\[([^]*?)\]/gm;function pt(t,e){for(var i=[],s=0,n=t.length;s<n;s++)i.push(t[s].substr(0,e));return i}var mt=function(t){return function(e,i){var s=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return s>-1?s:null}};function gt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0,n=e;s<n.length;s++){var r=n[s];for(var o in r)t[o]=r[o]}return t}var ft=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],vt=["January","February","March","April","May","June","July","August","September","October","November","December"],yt=pt(vt,3),bt={dayNamesShort:pt(ft,3),dayNames:ft,monthNamesShort:yt,monthNames:vt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},_t=gt({},bt),wt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},St={D:function(t){return String(t.getDate())},DD:function(t){return wt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return wt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return wt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return wt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return wt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return wt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return wt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return wt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return wt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return wt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return wt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+wt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+wt(Math.floor(Math.abs(e)/60),2)+":"+wt(Math.abs(e)%60,2)}},xt=function(t){return+t-1},$t=[null,"[1-9]\\d?"],Mt=[null,dt],Pt=["isPm",dt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],Ct=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],Tt=(mt("monthNamesShort"),mt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var kt,Nt,Et=function(t,e,i){if(void 0===e&&(e=Tt.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var s=[];e=(e=Tt[e]||e).replace(ut,(function(t,e){return s.push(e),"@@@"}));var n=gt(gt({},_t),i);return(e=e.replace(ct,(function(e){return St[e](t,n)}))).replace(/@@@/g,(function(){return s.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();function Vt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(Nt=kt||(kt={})).language="language",Nt.system="system",Nt.comma_decimal="comma_decimal",Nt.decimal_comma="decimal_comma",Nt.space_comma="space_comma",Nt.none="none";var Ot=!1;if("undefined"!=typeof window){var At={get passive(){Ot=!0}};window.addEventListener("testPassive",null,At),window.removeEventListener("testPassive",null,At)}var Dt="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),Yt=[],Lt=!1,Rt=-1,Ht=void 0,It=void 0,Ut=void 0,Bt=function(t){return Yt.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Ft=function(t){var e=t||window.event;return!!Bt(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},jt=function(t,e){if(t){if(!Yt.some((function(e){return e.targetElement===t}))){var i={targetElement:t,options:e||{}};Yt=[].concat(function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(Yt),[i]),Dt?window.requestAnimationFrame((function(){if(void 0===It){It={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,i=t.scrollX,s=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-i,setTimeout((function(){return window.requestAnimationFrame((function(){var t=s-window.innerHeight;t&&e>=s&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===Ut){var e=!!t&&!0===t.reserveScrollBarGap,i=window.innerWidth-document.documentElement.clientWidth;if(e&&i>0){var s=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);Ut=document.body.style.paddingRight,document.body.style.paddingRight=s+i+"px"}}void 0===Ht&&(Ht=document.body.style.overflow,document.body.style.overflow="hidden")}(e),Dt&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(Rt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var i=t.targetTouches[0].clientY-Rt;!Bt(t.target)&&(e&&0===e.scrollTop&&i>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&i<0?Ft(t):t.stopPropagation())}(e,t)},Lt||(document.addEventListener("touchmove",Ft,Ot?{passive:!1}:void 0),Lt=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},zt=function(t){t?(Yt=Yt.filter((function(e){return e.targetElement!==t})),Dt&&(t.ontouchstart=null,t.ontouchmove=null,Lt&&0===Yt.length&&(document.removeEventListener("touchmove",Ft,Ot?{passive:!1}:void 0),Lt=!1)),Dt?function(){if(void 0!==It){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=It.position,document.body.style.top=It.top,document.body.style.left=It.left,window.scrollTo(e,t),It=void 0}}():(void 0!==Ut&&(document.body.style.paddingRight=Ut,Ut=void 0),void 0!==Ht&&(document.body.style.overflow=Ht,Ht=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};console.info(`%c  ---- MY-SLIDER ---- \n%c  ${r("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let Wt=class extends ht{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!(t.entity.includes("input_number.")||t.entity.includes("light.")||t.entity.includes("media_player.")||t.entity.includes("cover.")||t.entity.includes("fan.")||t.entity.includes("switch.")||t.entity.includes("lock.")))throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Vt(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const i=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",s=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+i]);var n=e.step?e.step:"1";i.includes("input_number.")&&(n=e.step?e.step:s.attributes.step);var r=e.minBar?e.minBar:0,o=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100,h=e.width?e.width:"100%",c=e.height?e.height:"50px",d=e.radius?e.radius:"4px",u=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:c;"0"!=f&&(f+="deg");var y=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",b=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",_=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",S=e.border?e.border:"0",x=e.thumbWidth?e.thumbWidth:"25px",$=e.thumbHeight?e.thumbHeight:"80px",M=e.thumbColor?e.thumbColor:"#FFFFFF",P=e.thumbColorOff?e.thumbColorOff:"#969696",C=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",T=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",k=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",N=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",E=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",V=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",O=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",A=!!e.lockTrack&&e.lockTrack,D=`\n\t\t\t--slider-width: ${h};\n\t\t\t--slider-width-inverse: -${h};\n\t\t\t--slider-height: ${c};\n\t\t\t--slider-main-color: ${"off"===s.state||"locked"===s.state||null==s.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${y};\n\t\t\t--slider-main-color-off: ${_};\n\t\t\t--slider-secondary-color: ${"off"===s.state||"locked"===s.state||null==s.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${b};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${d};\n\t\t\t--border: ${S};\n\n\t\t\t--thumb-width: ${x};\n\t\t\t--thumb-height: ${$};\n\t\t\t--thumb-color: ${"off"===s.state||null==s.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${M};\n\t\t\t--thumb-color-off: ${P};\n\t\t\t--thumb-horizontal-padding: ${C};\n\t\t\t--thumb-vertical-padding: ${T};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${u};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${k};\n\t\t\t--thumb-border-right: ${N};\n\t\t\t--thumb-border-left: ${E};\n\t\t\t--thumb-border-top: ${V};\n\t\t\t--thumb-border-bottom: ${O};\n\t\t\t\n\t\t\t--lock-track-container: ${A?"none":"auto"};\n\t\t`;const Y=t=>{i.includes("light.")?"Warmth"==e.function?this._setWarmth(s,t.target,a,l):this._setBrightness(s,t.target,a,l):i.includes("input_number.")?this._setInputNumber(s,t.target,a,l):i.includes("media_player.")?this._setMediaVolume(s,t.target,a,l):i.includes("cover.")?this._setCover(s,t.target,a,l):i.includes("fan.")?this._setFan(s,t.target,a,l):i.includes("switch.")?this._setSwitch(s,t.target,a,l,r,o):i.includes("lock.")&&this._setLock(s,t.target,a,l,r,o)},L=t=>{e.intermediate&&Y(t)},R=t=>{e.intermediate||Y(t)},H=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?jt(window):zt(window)};if(i.includes("light."))return"Warmth"==e.function?F`
					<ha-card>
						<div class="slider-container" style="${D}">
							<input name="foo" type="range" class="${s.state}" style="${D}"
								min="${s.attributes.min_mireds}" max="${s.attributes.max_mireds}"
								step="${n}" .value="${"off"===s.state?0:s.attributes.color_temp}"
								@input=${L} @change=${R}
								@touchstart=${e.toggle_scroll?H:null}
								@touchend=${e.toggle_scroll?H:null} >
						</div>
					</ha-card>
				`:F`
					<ha-card>
						<div class="slider-container" style="${D}">
							<input name="foo" type="range" class="${s.state}" style="${D}"
								step="${n}" .value="${"off"===s.state?0:Math.round(s.attributes.brightness/2.56)}"
								@input=${L} @change=${R}
								@touchstart=${e.toggle_scroll?H:null}
								@touchend=${e.toggle_scroll?H:null} >
						</div>
					</ha-card>
				`;if(i.includes("input_number."))return F`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${s.state}" style="${D}"
							min="${s.attributes.min}" max="${s.attributes.max}"
							step="${n}" .value="${s.state}"
							@input=${L} @change=${R}
							@touchstart=${e.toggle_scroll?H:null}
							@touchend=${e.toggle_scroll?H:null} >
					</div>
				</ha-card>
			`;if(i.includes("media_player.")){var I=0;if(null!=s.attributes.volume_level)I=Number(100*s.attributes.volume_level);return F`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${s.state}" style="${D}"
							min="${r}" max="${o}" step="${n}" .value="${I}"
							@input=${L} @change=${R}
							@touchstart=${e.toggle_scroll?H:null}
							@touchend=${e.toggle_scroll?H:null} >
					</div>
				</ha-card>
			`}return i.includes("cover.")?F`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${s.state}" style="${D}"
							min="${r}" max="${o}" step="${n}"
							.value="${s.attributes.current_position}"
							@input=${L} @change=${R}
							@touchstart=${e.toggle_scroll?H:null}
							@touchend=${e.toggle_scroll?H:null} >
					</div>
				</ha-card>
			`:i.includes("fan.")?F`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${s.state}" style="${D}"
							min="${r}" max="${o}" step="${n}"
							.value="${s.attributes.percentage}"
							@input=${L} @change=${R}
							@touchstart=${e.toggle_scroll?H:null}
							@touchend=${e.toggle_scroll?H:null} >
					</div>
				</ha-card>
			`:i.includes("switch.")||i.includes("lock.")?F`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${s.state}" style="${D}"
							min="${r}" max="${o}" step="${n}" .value="${r}"
							@input=${L} @change=${R}
							@touchstart=${e.toggle_scroll?H:null}
							@touchend=${e.toggle_scroll?H:null} >
					</div>
				</ha-card>
			`:void 0}_setBrightness(t,e,i,s){var n=e.value;n>s?n=s:n<i&&(n=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*n}),e.value=n}_setWarmth(t,e,i,s){var n=e.value;n>s?n=s:n<i&&(n=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:n}),e.value=n}_setInputNumber(t,e,i,s){var n=e.value;n>s?n=s:n<i&&(n=i),this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:n}),e.value=n}_setFan(t,e,i,s){var n=e.value;n>s?n=s:n<i&&(n=i),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:n}),e.value=n}_setCover(t,e,i,s){var n=e.value;n>s?n=s:n<i&&(n=i),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:n}),e.value=n}_setMediaVolume(t,e,i,s){var n=e.value;n>s?n=s:n<i&&(n=i),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:n/100}),e.value=n}_setSwitch(t,e,i,s,n,r){var o=e.value,a=Math.min(s,r);Number(a)<=o&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(i,n))}_setLock(t,e,i,s,n,r){var o=e.value,a=Math.min(s,r);if(Number(a)<=o){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(i,n))}static get styles(){return at`
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
		`}};o([it({attribute:!1})],Wt.prototype,"hass",void 0),o([st()],Wt.prototype,"config",void 0),Wt=o([tt("my-slider")],Wt);
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
const qt=new WeakMap,Jt=(Zt=t=>e=>{if(!(e instanceof E)||e instanceof D||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:s}=i.element;let n=qt.get(e);void 0===n&&(s.cssText=i.strings.join(" "),qt.set(e,n=new Set)),n.forEach(e=>{e in t||(n.delete(e),-1===e.indexOf("-")?s[e]=null:s.removeProperty(e))});for(const e in t)n.add(e),-1===e.indexOf("-")?s[e]=t[e]:s.setProperty(e,t[e])},(...t)=>{const e=Zt(...t);return _.set(e,!0),e});var Zt;const Xt=(t,e={})=>{switch(t){case"card":return Gt(e);case"container":return Kt(e);case"track":return Qt(e);case"progress":return te(e);case"thumb":return ee(e);default:return void console.log("Getting default styles")}},Gt=t=>Object.assign({height:"125px"},t),Kt=t=>Object.assign({width:"100%",height:"100%",position:"relative",overflow:"hidden","border-radius":"5px"},t),Qt=t=>Object.assign({width:"100%",height:"100%",position:"relative",background:"var(--card-background-color)"},t),te=t=>Object.assign({height:"100%",background:"var(--paper-item-icon-active-color)",position:"absolute",width:"0.00%"},t),ee=t=>Object.assign({height:"100%",background:"black",position:"absolute",right:"-5px",width:"10px"},t),ie=function(t,e,i){var s,n;for(var r in e=void 0===e?[]:e,i=void 0===i?{}:i,t)t.hasOwnProperty(r)&&(s=r,n=t[r],e.push(s),"object"==typeof n&&null!==n?i=ie(n,e,i):i[e[e.length-1]]=n,e.pop());return i},se=(t,e=100,i=0)=>t/(e-i)*100,ne=t=>Math.round(100*(t+Number.EPSILON))/100;console.info(`%c  ---- MY-SLIDER-V2 ---- \n%c  ${r("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider-v2",name:"Slider Card V2",description:"Custom Slider Card V2 for Lovelace."});let re=class extends ht{constructor(){super(...arguments),this.sliderId="",this.touchInput=!1,this.disableScroll=!0,this.allowTapping=!0,this.vertical=!1,this.flipped=!1,this.inverse=!1,this.showMin=!1,this.savedMin=0,this.min=0,this.max=100,this.minThreshold=0,this.maxThreshold=100,this.step=1,this.sliderVal=0,this.sliderValPercent=0}setSliderValues(t,e){this.inverse?(this.sliderVal=this.max-t,this.sliderValPercent=100-e):(this.sliderVal=t,this.sliderValPercent=e)}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){const e=["light","input_number","media_player","cover","fan","switch","lock"];if(!t.entity)throw new Error("You need to define entity");if(!e.includes(t.entity.split(".")[0]))throw new Error("Entity has to be one of the following: "+e.map(t=>" "+t));this.config=Object.assign({name:"MySliderV2"},t)}shouldUpdate(t){return!!this.config&&Vt(this,t,!1)}render(){var t,e,i,s,n,r,o,a,l,h;this.initializeConfig();const c=ie(null===(t=this.config.styles)||void 0===t?void 0:t.card)?ie(null===(e=this.config.styles)||void 0===e?void 0:e.card):{},d=ie(null===(i=this.config.styles)||void 0===i?void 0:i.container)?ie(null===(s=this.config.styles)||void 0===s?void 0:s.container):{},u=ie(null===(n=this.config.styles)||void 0===n?void 0:n.track)?ie(null===(r=this.config.styles)||void 0===r?void 0:r.track):{},p=ie(null===(o=this.config.styles)||void 0===o?void 0:o.progress)?ie(null===(a=this.config.styles)||void 0===a?void 0:a.progress):{},m=ie(null===(l=this.config.styles)||void 0===l?void 0:l.thumb)?ie(null===(h=this.config.styles)||void 0===h?void 0:h.thumb):{},g=Xt("card",c),f=Xt("container",d),v=Xt("track",u),y=Xt("progress",p),b=Xt("thumb",m);this.vertical?(y.height=this.sliderValPercent.toString()+"%",y.width=p.width?p.width:"100%",y.right=p.right?p.right:"auto",b.right=m.right?m:"auto",b.width=m.width?m.width:"100%",b.height=m.height?m.height:"10px",this.flipped?(y.top=p.top?p.top:"0",b.bottom=m.bottom?m.bottom:"-5px"):(y.bottom=p.bottom?p.bottom:"0",b.top=m.top?m.top:"-5px")):(y.width=this.sliderValPercent.toString()+"%",this.flipped&&(y.right=p.right?p.right:"0",b.right=m.right?m.right:"auto",b.left=m.left?m.left:"-5px"));const _=t=>{const e=t.path.find(t=>t.classList.contains("my-slider-custom"));this.sliderEl=e||t.target},w=t=>{switch(t.type){case"mousedown":if(this.touchInput)return;S(t);break;case"touchstart":this.touchInput=!0,S(t);break;case"mousemove":if(this.touchInput)return;$(t);break;case"touchmove":this.disableScroll&&t.preventDefault(),$(t);break;case"mouseup":case"touchend":case"touchcancel":x(t)}},S=t=>{!0!==this.config.dragging&&(_(t),(this.allowTapping||t.path[0].classList.contains("my-slider-custom-thumb"))&&(this.config.dragging=!0,this.calcProgress(t)))},x=t=>{!1!==this.config.dragging&&(this.config.dragging=!1,(this.allowTapping||t.path[0].classList.contains("my-slider-custom-thumb"))&&this.calcProgress(t))},$=t=>{this.config.dragging&&this.calcProgress(t)};return this.createAndCleanupEventListeners(w),F`
            <ha-card style="${Jt(g)}">
                <div class="my-slider-custom" id="${this.sliderId}" style="${Jt(f)}" data-value="${this.sliderVal}" data-progress-percent="${this.sliderValPercent}"
                    @mousedown="${w}"
                    @mouseup="${w}"
                    @mousemove="${w}"
                    @touchstart="${w}"
                    @touchend="${w}"
                    @touchcancel="${w}" 
                    @touchmove="${w}"
                >
                    <div class="my-slider-custom-track" style="${Jt(v)}">
                        <div class="my-slider-custom-progress" style="${Jt(y)}">
                            <div class="my-slider-custom-thumb" style="${Jt(b)}"></div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `}initializeConfig(){const t=this.config.entity;let e;switch(this.entity=this.hass.states[""+t],this.sliderId="slider-"+this.config.entity.replace(".","-"),this.vertical=void 0!==this.config.vertical&&this.config.vertical,this.flipped=void 0!==this.config.flipped&&this.config.flipped,this.inverse=void 0!==this.config.inverse&&this.config.inverse,this.disableScroll=void 0===this.config.disableScroll||this.config.disableScroll,this.allowTapping=void 0===this.config.allowTapping||this.config.allowTapping,this.showMin=void 0!==this.config.showMin&&this.config.showMin,this.savedMin=this.config.min?this.config.min:0,this.max=this.config.max?this.config.max:100,this.minThreshold=this.config.minThreshold?this.config.minThreshold:0,this.maxThreshold=this.config.maxThreshold?this.config.maxThreshold:100,this.step=this.config.step?this.config.step:1,t.split(".")[0]){case"light":if(this.config.warmth){if("on"!==this.entity.state)break;this.savedMin=this.config.min?this.config.min:this.entity.attributes.min_mireds,this.max=this.config.max?this.config.max:this.entity.attributes.max_mireds,e=parseFloat(this.entity.attributes.color_temp),this.showMin||(this.max=this.max-this.savedMin,e-=this.savedMin),this.setSliderValues(e,ne(se(e,this.max)))}else{if("on"!==this.entity.state)break;e=Math.round(this.entity.attributes.brightness/2.56),this.showMin||(e-=this.savedMin),this.setSliderValues(e,ne(se(e,this.max)))}break;case"input_number":this.step=this.config.step?this.config.step:this.entity.attributes.step,this.savedMin=this.config.min?this.config.min:this.entity.attributes.min,this.max=this.config.max?this.config.max:this.entity.attributes.max,e=parseFloat(this.entity.state),this.showMin||(this.max=this.max-this.savedMin,e-=this.savedMin),this.setSliderValues(e,ne(se(e,this.max)));break;case"media_player":e=0,null!=this.entity.attributes.volume_level&&(e=Number(100*this.entity.attributes.volume_level)),this.showMin||(this.max=this.max-this.savedMin,e-=this.savedMin),this.setSliderValues(e,ne(se(e,this.max)));break;case"cover":e=0,null!=this.entity.attributes.current_position&&(e=Number(this.entity.attributes.current_position)),this.showMin||(this.max=this.max-this.savedMin,e-=this.savedMin),this.inverse=void 0===this.config.inverse||this.config.inverse,this.vertical=void 0===this.config.vertical||this.config.vertical,this.flipped=void 0===this.config.flipped||this.config.flipped,this.setSliderValues(e,ne(se(e,this.max)));break;case"fan":e=0,null!=this.entity.attributes.percentage&&(e=Number(this.entity.attributes.percentage)),this.showMin||(this.max=this.max-this.savedMin,e-=this.savedMin),this.setSliderValues(e,ne(se(e,this.max)));break;case"switch":case"lock":this.minThreshold=this.config.minThreshold?this.config.minThreshold:15,this.maxThreshold=this.config.maxThreshold?this.config.maxThreshold:75,e=Number(Math.max(this.min,this.minThreshold)),this.setSliderValues(e,e);break;default:console.log("Default")}}calcProgress(t){if(null==this.sliderEl||null===this.sliderEl)return;const e=((t,e)=>{let i={x:0,y:0};if("touchstart"==t.type||"touchmove"==t.type||"touchend"==t.type||"touchcancel"==t.type){let e=void 0===t.originalEvent?t:t.originalEvent,s=e.touches[0]||e.changedTouches[0];i.x=s.pageX,i.y=s.pageY}else"mousedown"!=t.type&&"mouseup"!=t.type&&"mousemove"!=t.type&&"mouseover"!=t.type&&"mouseout"!=t.type&&"mouseenter"!=t.type&&"mouseleave"!=t.type||(i.x=t.clientX,i.y=t.clientY);let s=e.getBoundingClientRect(),n=i.x-s.left,r=i.y-s.top;return r=e.offsetHeight-r,{x:n,y:r}})(t,this.sliderEl),i=this.sliderEl.offsetWidth,s=this.sliderEl.offsetHeight,n=(this.vertical?ne(e.y/s*100):ne(e.x/i*100))/100*(this.max-0),r=this.max-n,o=this.flipped?r:n;this.setProgress(this.sliderEl,Math.round(o),t.type)}setProgress(t,e,i){e>this.max?e=this.max:e<this.min&&(e=this.min);const s=t.querySelector(".my-slider-custom-progress"),n=ne(se(e,this.max));this.vertical?s.style.height=n.toString()+"%":s.style.width=n.toString()+"%",this.sliderVal!==e&&((!this.config.intermediate||"mousemove"!==i&&"touchmove"!==i)&&(this.config.intermediate||"mouseup"!==i&&"touchend"!==i&&"touchcancel"!==i)||this.setValue(e,n))}setValue(t,e){if(this.entity)switch(this.setSliderValues(t,e),this.showMin||(t+=this.savedMin),this.inverse&&(t=this.max-t,e=100-e),this.config.entity.split(".")[0]){case"light":this.config.warmth?this._setWarmth(this.entity,t):this._setBrightness(this.entity,t);break;case"input_number":this._setInputNumber(this.entity,t);break;case"media_player":this._setMediaVolume(this.entity,t);break;case"cover":this._setCover(this.entity,t);break;case"fan":this._setFan(this.entity,t);break;case"lock":this._setLock(this.entity,t);break;case"switch":this._setSwitch(this.entity,t);break;default:console.log("Default")}}_setBrightness(t,e){("off"===t.state||Math.abs(e-Math.round(t.attributes.brightness/2.56))>this.step)&&this.hass.callService("light","turn_on",{entity_id:t.entity_id,brightness:2.56*e})}_setWarmth(t,e){let i=parseFloat(t.attributes.color_temp);("off"===t.state||Math.abs(e-i)>this.step)&&this.hass.callService("light","turn_on",{entity_id:t.entity_id,color_temp:e})}_setInputNumber(t,e){let i=parseFloat(t.state);this.showMin||(i-=this.savedMin),Math.abs(e-i)>this.step&&this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:e})}_setMediaVolume(t,e){let i=Number(100*this.entity.attributes.volume_level);this.showMin||(i-=this.savedMin),Math.abs(e-i)>this.step&&this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100})}_setCover(t,e){this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:e})}_setFan(t,e){this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:e})}_setSwitch(t,e){var i=Math.min(this.max,this.maxThreshold);Number(i)<=e&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id});const s=Number(Math.max(this.min,this.minThreshold)),n=ne(se(s,this.max));this.setSliderValues(s,n);const r=this.sliderEl.querySelector(".my-slider-custom-progress");r.style.transition="width 0.2s ease 0s",r.style.width=n.toString()+"%",setTimeout(()=>{r.style.transition="initial"},200)}_setLock(t,e){var i=Math.min(this.max,this.maxThreshold);if(Number(i)<=e){var s="locked"===t.state?"unlock":"lock";this.hass.callService("lock",s,{entity_id:t.entity_id})}const n=Number(Math.max(this.min,this.minThreshold)),r=ne(se(n,this.max));this.setSliderValues(n,r);const o=this.sliderEl.querySelector(".my-slider-custom-progress");o.style.transition="width 0.2s ease 0s",o.style.width=r.toString()+"%",setTimeout(()=>{o.style.transition="initial"},200)}createAndCleanupEventListeners(t){document.removeEventListener("mouseup",t),document.removeEventListener("touchend",t),document.removeEventListener("touchcancel",t),document.addEventListener("mouseup",t),document.addEventListener("touchend",t),document.addEventListener("touchcancel",t),document.addEventListener("mousemove",t)}static get styles(){return at`
		`}};o([it({attribute:!1})],re.prototype,"hass",void 0),o([st()],re.prototype,"config",void 0),re=o([tt("my-slider-v2")],re),console.info(`%c  ---- MY-CARDS ---- \n%c  ${r("common.version")} 1.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{Wt as MySlider,re as MySliderV2};

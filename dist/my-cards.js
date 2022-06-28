var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},o={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},i={common:o};const n={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:o,default:i})};function r(t,e="",o=""){const i=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce((t,e)=>t[e],n[i])}catch(e){r=t.split(".").reduce((t,e)=>t[e],n.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],n.en)),""!==e&&""!==o&&(r=r.replace(e,o)),r}
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
***************************************************************************** */function s(t,e,o,i){var n,r=arguments.length,s=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,o,s):n(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s
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
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,o=null)=>{for(;e!==o;){const o=e.nextSibling;t.removeChild(e),e=o}},c=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${c}--\x3e`,u=new RegExp(`${c}|${d}`);class h{constructor(t,e){this.parts=[],this.element=e;const o=[],i=[],n=document.createTreeWalker(e.content,133,null,!1);let r=0,s=-1,a=0;const{strings:l,values:{length:d}}=t;for(;a<d;){const t=n.nextNode();if(null!==t){if(s++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:o}=e;let i=0;for(let t=0;t<o;t++)p(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=l[a],o=f.exec(e)[2],i=o.toLowerCase()+"$lit$",n=t.getAttribute(i);t.removeAttribute(i);const r=n.split(u);this.parts.push({type:"attribute",index:s,name:o,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const i=t.parentNode,n=e.split(u),r=n.length-1;for(let e=0;e<r;e++){let o,r=n[e];if(""===r)o=g();else{const t=f.exec(r);null!==t&&p(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),o=document.createTextNode(r)}i.insertBefore(o,t),this.parts.push({type:"node",index:++s})}""===n[r]?(i.insertBefore(g(),t),o.push(t)):t.data=n[r],a+=r}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&s!==r||(s++,e.insertBefore(g(),t)),r=s,this.parts.push({type:"node",index:s}),null===t.nextSibling?t.data="":(o.push(t),s--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1}),a++}}else n.currentNode=i.pop()}for(const t of o)t.parentNode.removeChild(t)}}const p=(t,e)=>{const o=t.length-e.length;return o>=0&&t.slice(o)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:o},parts:i}=t,n=document.createTreeWalker(o,133,null,!1);let r=y(i),s=i[r],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-l,r=y(i,r),s=i[r]}c.forEach(t=>t.parentNode.removeChild(t))}const b=t=>{let e=11===t.nodeType?0:1;const o=document.createTreeWalker(t,133,null,!1);for(;o.nextNode();)e++;return e},y=(t,e=-1)=>{for(let o=e+1;o<t.length;o++){const e=t[o];if(m(e))return o}return-1};
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
const _=new WeakMap,w=t=>"function"==typeof t&&_.has(t),x={},S={};
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
class ${constructor(t,e,o){this.__parts=[],this.template=t,this.processor=e,this.options=o}update(t){let e=0;for(const o of this.__parts)void 0!==o&&o.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],o=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let n,r=0,s=0,l=i.nextNode();for(;r<o.length;)if(n=o[r],m(n)){for(;s<n.index;)s++,"TEMPLATE"===l.nodeName&&(e.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=e.pop(),l=i.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const C=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),k=` ${c} `;class T{constructor(t,e,o,i){this.strings=t,this.values=e,this.type=o,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",o=!1;for(let i=0;i<t;i++){const t=this.strings[i],n=t.lastIndexOf("\x3c!--");o=(n>-1||o)&&-1===t.indexOf("--\x3e",n+1);const r=f.exec(t);e+=null===r?t+(o?k:d):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+c}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==C&&(e=C.createHTML(e)),t.innerHTML=e,t}}
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
 */const O=t=>null===t||!("object"==typeof t||"function"==typeof t),P=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class N{constructor(t,e,o){this.dirty=!0,this.element=t,this.name=e,this.strings=o,this.parts=[];for(let t=0;t<o.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new E(this)}_getValue(){const t=this.strings,e=t.length-1,o=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=o[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!P(t))return t}let i="";for(let n=0;n<e;n++){i+=t[n];const e=o[n];if(void 0!==e){const t=e.value;if(O(t)||!P(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===x||O(t)&&t===this.value||(this.value=t,w(t)||(this.committer.dirty=!0))}commit(){for(;w(this.value);){const t=this.value;this.value=x,t(this)}this.value!==x&&this.committer.commit()}}class M{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}const t=this.__pendingValue;t!==x&&(O(t)?t!==this.value&&this.__commitText(t):t instanceof T?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):P(t)?this.__commitIterable(t):t===S?(this.value=S,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,o="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=o:this.__commitNode(document.createTextNode(o)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof $&&this.value.template===e)this.value.update(t.values);else{const o=new $(e,t.processor,this.options),i=o._clone();o.update(t.values),this.__commitNode(i),this.value=o}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let o,i=0;for(const n of t)o=e[i],void 0===o&&(o=new M(this.options),e.push(o),0===i?o.appendIntoPart(this):o.insertAfterPart(e[i-1])),o.setValue(n),o.commit(),i++;i<e.length&&(e.length=i,this.clear(o&&o.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class A{constructor(t,e,o){if(this.value=void 0,this.__pendingValue=void 0,2!==o.length||""!==o[0]||""!==o[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=o}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=x}}class j extends N{constructor(t,e,o){super(t,e,o),this.single=2===o.length&&""===o[0]&&""===o[1]}_createPart(){return new D(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class D extends E{}let H=!1;(()=>{try{const t={get capture(){return H=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class R{constructor(t,e,o){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=o,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=this.__pendingValue,e=this.value,o=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||o);o&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=V(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=x}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const V=t=>t&&(H?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function Y(t){let e=L.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},L.set(t.type,e));let o=e.stringsArray.get(t.strings);if(void 0!==o)return o;const i=t.strings.join(c);return o=e.keyString.get(i),void 0===o&&(o=new h(t,t.getTemplateElement()),e.keyString.set(i,o)),e.stringsArray.set(t.strings,o),o}const L=new Map,U=new WeakMap;
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
class{handleAttributeExpressions(t,e,o,i){const n=e[0];if("."===n){return new j(t,e.slice(1),o).parts}if("@"===n)return[new R(t,e.slice(1),i.eventContext)];if("?"===n)return[new A(t,e.slice(1),o)];return new N(t,e,o).parts}handleTextExpression(t){return new M(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const z=(t,...e)=>new T(t,e,"html",B)
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
 */,I=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),F=!1);const q=t=>e=>{const o=I(e.type,t);let i=L.get(o);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},L.set(o,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(c);if(n=i.keyString.get(r),void 0===n){const o=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(o,t),n=new h(e,o),i.keyString.set(r,n)}return i.stringsArray.set(e.strings,n),n},W=["html","svg"],J=new Set,Z=(t,e,o)=>{J.add(t);const i=o?o.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const s=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),s.textContent+=e.textContent}(t=>{W.forEach(e=>{const o=L.get(I(e,t));void 0!==o&&o.keyString.forEach(t=>{const{element:{content:e}}=t,o=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{o.add(t)}),v(t,o)})})})(t);const a=i.content;o?function(t,e,o=null){const{element:{content:i},parts:n}=t;if(null==o)return void i.appendChild(e);const r=document.createTreeWalker(i,133,null,!1);let s=y(n),a=0,l=-1;for(;r.nextNode();){l++;for(r.currentNode===o&&(a=b(e),o.parentNode.insertBefore(e,o));-1!==s&&n[s].index===l;){if(a>0){for(;-1!==s;)n[s].index+=a,s=y(n,s);return}s=y(n,s)}}}(o,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(o){a.insertBefore(s,a.firstChild);const t=new Set;t.add(s),v(o,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const G={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},X=(t,e)=>e!==t&&(e==e||t==t),K={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:X};class Q extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,o)=>{const i=this._attributeNameForProperty(o,e);void 0!==i&&(this._attributeToPropertyMap.set(i,o),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=K){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const o="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,o,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdateInternal(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||K}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const o of e)this.createProperty(o,t[o])}}static _attributeNameForProperty(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,o=X){return o(t,e)}static _propertyValueFromAttribute(t,e){const o=e.type,i=e.converter||G,n="function"==typeof i?i:i.fromAttribute;return n?n(t,o):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const o=e.type,i=e.converter;return(i&&i.toAttribute||G.toAttribute)(t,o)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,o){e!==o&&this._attributeToProperty(t,o)}_propertyToAttribute(t,e,o=K){const i=this.constructor,n=i._attributeNameForProperty(t,o);if(void 0!==n){const t=i._propertyValueToAttribute(e,o);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const o=this.constructor,i=o._attributeToPropertyMap.get(t);if(void 0!==i){const t=o.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=o._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,o){let i=!0;if(void 0!==t){const n=this.constructor;o=o||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,o.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==o.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,o))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Q.finalized=!0;
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
const tt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:o,elements:i}=e;return{kind:o,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),et=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(o){o.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function ot(t){return(e,o)=>void 0!==o?((t,e,o)=>{e.constructor.createProperty(o,t)})(t,e,o):et(t,e)}function it(t){return ot({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const nt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol();class st{constructor(t,e){if(e!==rt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const at=(t,...e)=>{const o=e.reduce((e,o,i)=>e+(t=>{if(t instanceof st)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+t[i+1],t[0]);return new st(o,rt)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const lt={};class ct extends Q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,o)=>t.reduceRight((t,o)=>Array.isArray(o)?e(o,t):(t.add(o),t),o),o=e(t,new Set),i=[];o.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!nt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new st(String(e),rt)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==lt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return lt}}ct.finalized=!0,ct.render=(t,e,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const i=o.scopeName,n=U.has(e),r=F&&11===e.nodeType&&!!e.host,s=r&&!J.has(i),a=s?document.createDocumentFragment():e;if(((t,e,o)=>{let i=U.get(e);void 0===i&&(l(e,e.firstChild),U.set(e,i=new M(Object.assign({templateFactory:Y},o))),i.appendInto(e)),i.setValue(t),i.commit()})(t,a,Object.assign({templateFactory:q(i)},o)),s){const t=U.get(a);U.delete(a);const o=t.value instanceof $?t.value.template:void 0;Z(i,a,o),l(e,e.firstChild),e.appendChild(a),U.set(e,t)}!n&&r&&window.ShadyCSS.styleElement(e.host)},ct.shadowRootOptions={mode:"open"};var dt=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ut="[^\\s]+",ht=/\[([^]*?)\]/gm;function pt(t,e){for(var o=[],i=0,n=t.length;i<n;i++)o.push(t[i].substr(0,e));return o}var mt=function(t){return function(e,o){var i=o[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return i>-1?i:null}};function gt(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];for(var i=0,n=e;i<n.length;i++){var r=n[i];for(var s in r)t[s]=r[s]}return t}var ft=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],vt=["January","February","March","April","May","June","July","August","September","October","November","December"],bt=pt(vt,3),yt={dayNamesShort:pt(ft,3),dayNames:ft,monthNamesShort:bt,monthNames:vt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},_t=gt({},yt),wt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},xt={D:function(t){return String(t.getDate())},DD:function(t){return wt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return wt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return wt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return wt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return wt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return wt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return wt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return wt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return wt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return wt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return wt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+wt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+wt(Math.floor(Math.abs(e)/60),2)+":"+wt(Math.abs(e)%60,2)}},St=function(t){return+t-1},$t=[null,"[1-9]\\d?"],Ct=[null,ut],kt=["isPm",ut,function(t,e){var o=t.toLowerCase();return o===e.amPm[0]?0:o===e.amPm[1]?1:null}],Tt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var o=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?o:-o}return 0}],Ot=(mt("monthNamesShort"),mt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Pt,Nt,Et=function(t,e,o){if(void 0===e&&(e=Ot.default),void 0===o&&(o={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var i=[];e=(e=Ot[e]||e).replace(ht,(function(t,e){return i.push(e),"@@@"}));var n=gt(gt({},_t),o);return(e=e.replace(dt,(function(e){return xt[e](t,n)}))).replace(/@@@/g,(function(){return i.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();(Nt=Pt||(Pt={})).language="language",Nt.system="system",Nt.comma_decimal="comma_decimal",Nt.decimal_comma="decimal_comma",Nt.space_comma="space_comma",Nt.none="none";var Mt=["closed","locked","off"],At=function(t,e,o,i){i=i||{},o=null==o?{}:o;var n=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return n.detail=o,t.dispatchEvent(n),n},jt=function(t){At(window,"haptic",t)},Dt=function(t,e,o,i){if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(jt("warning"),confirm(i.confirmation.text||"Are you sure you want to "+i.action+"?")))switch(i.action){case"more-info":(o.entity||o.camera_image)&&At(t,"hass-more-info",{entityId:o.entity?o.entity:o.camera_image});break;case"navigate":i.navigation_path&&function(t,e,o){void 0===o&&(o=!1),o?history.replaceState(null,"",e):history.pushState(null,"",e),At(window,"location-changed",{replace:o})}(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":o.entity&&(function(t,e){(function(t,e,o){void 0===o&&(o=!0);var i,n=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===n?"homeassistant":n;switch(n){case"lock":i=o?"unlock":"lock";break;case"cover":i=o?"open_cover":"close_cover";break;default:i=o?"turn_on":"turn_off"}t.callService(r,i,{entity_id:e})})(t,e,Mt.includes(t.states[e].state))}(e,o.entity),jt("success"));break;case"call-service":if(!i.service)return void jt("failure");var n=i.service.split(".",2);e.callService(n[0],n[1],i.service_data),jt("success");break;case"fire-dom-event":At(t,"ll-custom",i)}},Ht=function(t,e,o,i){var n;"double_tap"===i&&o.double_tap_action?n=o.double_tap_action:"hold"===i&&o.hold_action?n=o.hold_action:"tap"===i&&o.tap_action&&(n=o.tap_action),Dt(t,e,o,n)};function Rt(t,e,o){if(e.has("config")||o)return!0;if(t.config.entity){var i=e.get("hass");return!i||i.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}var Vt=!1;if("undefined"!=typeof window){var Yt={get passive(){Vt=!0}};window.addEventListener("testPassive",null,Yt),window.removeEventListener("testPassive",null,Yt)}var Lt="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),Ut=[],Bt=!1,zt=-1,It=void 0,Ft=void 0,qt=void 0,Wt=function(t){return Ut.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Jt=function(t){var e=t||window.event;return!!Wt(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},Zt=function(t,e){if(t){if(!Ut.some((function(e){return e.targetElement===t}))){var o={targetElement:t,options:e||{}};Ut=[].concat(function(t){if(Array.isArray(t)){for(var e=0,o=Array(t.length);e<t.length;e++)o[e]=t[e];return o}return Array.from(t)}(Ut),[o]),Lt?window.requestAnimationFrame((function(){if(void 0===Ft){Ft={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,o=t.scrollX,i=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-o,setTimeout((function(){return window.requestAnimationFrame((function(){var t=i-window.innerHeight;t&&e>=i&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===qt){var e=!!t&&!0===t.reserveScrollBarGap,o=window.innerWidth-document.documentElement.clientWidth;if(e&&o>0){var i=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);qt=document.body.style.paddingRight,document.body.style.paddingRight=i+o+"px"}}void 0===It&&(It=document.body.style.overflow,document.body.style.overflow="hidden")}(e),Lt&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(zt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var o=t.targetTouches[0].clientY-zt;!Wt(t.target)&&(e&&0===e.scrollTop&&o>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&o<0?Jt(t):t.stopPropagation())}(e,t)},Bt||(document.addEventListener("touchmove",Jt,Vt?{passive:!1}:void 0),Bt=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},Gt=function(t){t?(Ut=Ut.filter((function(e){return e.targetElement!==t})),Lt&&(t.ontouchstart=null,t.ontouchmove=null,Bt&&0===Ut.length&&(document.removeEventListener("touchmove",Jt,Vt?{passive:!1}:void 0),Bt=!1)),Lt?function(){if(void 0!==Ft){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=Ft.position,document.body.style.top=Ft.top,document.body.style.left=Ft.left,window.scrollTo(e,t),Ft=void 0}}():(void 0!==qt&&(document.body.style.paddingRight=qt,qt=void 0),void 0!==It&&(document.body.style.overflow=It,It=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};console.info(`%c  ---- MY-SLIDER ---- \n%c  ${r("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let Xt=class extends ct{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!(t.entity.includes("input_number.")||t.entity.includes("light.")||t.entity.includes("media_player.")||t.entity.includes("cover.")||t.entity.includes("fan.")||t.entity.includes("switch.")||t.entity.includes("lock.")))throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Rt(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const o=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",i=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+o]);var n=e.step?e.step:"1";o.includes("input_number.")&&(n=e.step?e.step:i.attributes.step);var r=e.minBar?e.minBar:0,s=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100,c=e.width?e.width:"100%",d=e.height?e.height:"50px",u=e.radius?e.radius:"4px",h=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:d;"0"!=f&&(f+="deg");var b=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",y=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",_=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",x=e.border?e.border:"0",S=e.thumbWidth?e.thumbWidth:"25px",$=e.thumbHeight?e.thumbHeight:"80px",C=e.thumbColor?e.thumbColor:"#FFFFFF",k=e.thumbColorOff?e.thumbColorOff:"#969696",T=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",O=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",P=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",N=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",E=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",M=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",A=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",j=!!e.lockTrack&&e.lockTrack,D=`\n\t\t\t--slider-width: ${c};\n\t\t\t--slider-width-inverse: -${c};\n\t\t\t--slider-height: ${d};\n\t\t\t--slider-main-color: ${"off"===i.state||"locked"===i.state||null==i.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${b};\n\t\t\t--slider-main-color-off: ${_};\n\t\t\t--slider-secondary-color: ${"off"===i.state||"locked"===i.state||null==i.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${y};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${u};\n\t\t\t--border: ${x};\n\n\t\t\t--thumb-width: ${S};\n\t\t\t--thumb-height: ${$};\n\t\t\t--thumb-color: ${"off"===i.state||null==i.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${C};\n\t\t\t--thumb-color-off: ${k};\n\t\t\t--thumb-horizontal-padding: ${T};\n\t\t\t--thumb-vertical-padding: ${O};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${h};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${P};\n\t\t\t--thumb-border-right: ${N};\n\t\t\t--thumb-border-left: ${E};\n\t\t\t--thumb-border-top: ${M};\n\t\t\t--thumb-border-bottom: ${A};\n\t\t\t\n\t\t\t--lock-track-container: ${j?"none":"auto"};\n\t\t`;const H=t=>{o.includes("light.")?"Warmth"==e.function?this._setWarmth(i,t.target,a,l):this._setBrightness(i,t.target,a,l):o.includes("input_number.")?this._setInputNumber(i,t.target,a,l):o.includes("media_player.")?this._setMediaVolume(i,t.target,a,l):o.includes("cover.")?this._setCover(i,t.target,a,l):o.includes("fan.")?this._setFan(i,t.target,a,l):o.includes("switch.")?this._setSwitch(i,t.target,a,l,r,s):o.includes("lock.")&&this._setLock(i,t.target,a,l,r,s)},R=t=>{e.intermediate&&H(t)},V=t=>{e.intermediate||H(t)},Y=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Zt(window):Gt(window)};if(o.includes("light."))return"Warmth"==e.function?z`
					<ha-card>
						<div class="slider-container" style="${D}">
							<input name="foo" type="range" class="${i.state}" style="${D}"
								min="${i.attributes.min_mireds}" max="${i.attributes.max_mireds}"
								step="${n}" .value="${"off"===i.state?0:i.attributes.color_temp}"
								@input=${R} @change=${V}
								@touchstart=${e.toggle_scroll?Y:null}
								@touchend=${e.toggle_scroll?Y:null} >
						</div>
					</ha-card>
				`:z`
					<ha-card>
						<div class="slider-container" style="${D}">
							<input name="foo" type="range" class="${i.state}" style="${D}"
								step="${n}" .value="${"off"===i.state?0:Math.round(i.attributes.brightness/2.56)}"
								@input=${R} @change=${V}
								@touchstart=${e.toggle_scroll?Y:null}
								@touchend=${e.toggle_scroll?Y:null} >
						</div>
					</ha-card>
				`;if(o.includes("input_number."))return z`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${i.state}" style="${D}"
							min="${i.attributes.min}" max="${i.attributes.max}"
							step="${n}" .value="${i.state}"
							@input=${R} @change=${V}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`;if(o.includes("media_player.")){var L=0;if(null!=i.attributes.volume_level)L=Number(100*i.attributes.volume_level);return z`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${i.state}" style="${D}"
							min="${r}" max="${s}" step="${n}" .value="${L}"
							@input=${R} @change=${V}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`}return o.includes("cover.")?z`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${i.state}" style="${D}"
							min="${r}" max="${s}" step="${n}"
							.value="${i.attributes.current_position}"
							@input=${R} @change=${V}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:o.includes("fan.")?z`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${i.state}" style="${D}"
							min="${r}" max="${s}" step="${n}"
							.value="${i.attributes.percentage}"
							@input=${R} @change=${V}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:o.includes("switch.")||o.includes("lock.")?z`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${i.state}" style="${D}"
							min="${r}" max="${s}" step="${n}" .value="${r}"
							@input=${R} @change=${V}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:void 0}_setBrightness(t,e,o,i){var n=e.value;n>i?n=i:n<o&&(n=o),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*n}),e.value=n}_setWarmth(t,e,o,i){var n=e.value;n>i?n=i:n<o&&(n=o),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:n}),e.value=n}_setInputNumber(t,e,o,i){var n=e.value;n>i?n=i:n<o&&(n=o),this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:n}),e.value=n}_setFan(t,e,o,i){var n=e.value;n>i?n=i:n<o&&(n=o),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:n}),e.value=n}_setCover(t,e,o,i){var n=e.value;n>i?n=i:n<o&&(n=o),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:n}),e.value=n}_setMediaVolume(t,e,o,i){var n=e.value;n>i?n=i:n<o&&(n=o),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:n/100}),e.value=n}_setSwitch(t,e,o,i,n,r){var s=e.value,a=Math.min(i,r);Number(a)<=s&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(o,n))}_setLock(t,e,o,i,n,r){var s=e.value,a=Math.min(i,r);if(Number(a)<=s){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(o,n))}static get styles(){return at`
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
		`}};s([ot({attribute:!1})],Xt.prototype,"hass",void 0),s([it()],Xt.prototype,"config",void 0),Xt=s([tt("my-slider")],Xt);const Kt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class Qt extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Kt?"100px":"50px",height:Kt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const o=t=>{let e,o;this.held=!1,t.touches?(e=t.touches[0].pageX,o=t.touches[0].pageY):(e=t.pageX,o=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,o),this.held=!0},this.holdTime)},i=o=>{o.preventDefault(),["touchend","touchcancel"].includes(o.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?At(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===o.type&&o.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,At(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,At(t,"action",{action:"double_tap"})):At(t,"action",{action:"tap"}))};t.addEventListener("touchstart",o,{passive:!0}),t.addEventListener("touchend",i),t.addEventListener("touchcancel",i),t.addEventListener("mousedown",o,{passive:!0}),t.addEventListener("click",i),t.addEventListener("keyup",t=>{13===t.keyCode&&i(t)})}startAnimation(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-my-footer",Qt);const te=(t,e)=>{const o=(()=>{const t=document.body;if(t.querySelector("action-handler-my-footer"))return t.querySelector("action-handler-my-footer");const e=document.createElement("action-handler-my-footer");return t.appendChild(e),e})();o&&o.bind(t,e)},ee=(oe=(t={})=>e=>{te(e.committer.element,t)},(...t)=>{const e=oe(...t);return _.set(e,!0),e});var oe;const ie=t=>{if(!t)return"";let e="";return Object.keys(t).map(o=>{const i=t[o];e+=ne(o)+":"+i+";"}),e},ne=t=>t.split("").map((t,e)=>t.toUpperCase()===t&&"-"!==t?`${0!==e?"-":""}${t.toLowerCase()}`:t).join(""),re=(t,e)=>{switch(t){case"my-button-card":return se(e);case"my-button-icon":return ae(e);case"my-button-label":return le(e);case"my-button-label-vertical":return ce(e);case"my-button-label-wrapper":return de(e);case"my-button-slider":return ue(e);case"my-button-slider-vertical":return ue(e,!0);case"my-button-slider-wrapper":return me(e);default:return void console.log("Getting default styles")}},se=t=>(t||(t={}),Object.assign({height:t.height?t.height:"125px",width:t.width?t.width:"100%","min-width":"fit-content",background:t.background?t.background:"var(--card-background-color)"},t)),ae=t=>(t||(t={}),Object.assign({height:t.height?t.height:"35px",width:t.width?t.width:"35px",display:t.display?t.display:"inline-block",padding:t.padding?t.padding:"10px 10px 10px 10px",cursor:"pointer",color:t.color?t.color:"var(--paper-item-active-icon-color)"},t)),le=t=>(t||(t={}),Object.assign({padding:t.padding?t.padding:"0",margin:t.margin?t.margin:"0 10px",color:t.color?t.color:"var(--primary-text-color)","font-weight":"bold"},t)),ce=t=>(t||(t={}),Object.assign({padding:0,margin:"0 10px",color:"var(--primary-text-color)","font-weight":"bold",transform:"rotate(270deg)"},t)),de=t=>(t||(t={}),Object.assign({width:"30px",height:"100%",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center","padding-left":"10px"},t)),ue=(t,e=!1)=>{if(t&&0!==Object.keys(t).length||(t={container:{},input:{},track:{},thumb:{}}),e){return{containerStyle:ge(t.container?t.container:{}),inputStyle:fe(t.input?t.input:{})}}return{containerStyle:he(t.container?t.container:{}),inputStyle:pe(t.input?t.input:{}),trackStyle:ve(t.track?t.track:{}),thumbStyle:be(t.thumb?t.thumb:{})}},he=t=>(t||(t={}),Object.assign({height:"30px",position:"relative",overflow:"hidden","border-radius":"5px","--slider-color":"var(--paper-item-icon-active-color)"},t)),pe=t=>(t||(t={}),Object.assign({outline:"0",border:"0",width:"100%",height:"100%","border-radius":"5px","background-color":"#4d4d4d",margin:"0",transition:"box-shadow 0.2s ease-in-out",overflow:"hidden","-webkit-appearance":"none",position:"absolute",top:"0px",bottom:"0px",right:"0px",left:"0px","pointer-events":"auto"},t)),me=t=>(t||(t={}),Object.assign({width:"30px",height:"100%",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center","margin-right":"3px"},t)),ge=t=>(t||(t={}),Object.assign(Object.assign({},t),{height:t.width?t.width:"30px",width:t.height?t.height:"calc(125px - 4px)",overflow:t.overflow?t.overflow:"hidden","border-radius":t["border-radius"]?t["border-radius"]:"5px","--slider-color":t.color?t.color:"#4d4d4d",display:t.flex?t.flex:"flex","flex-direction":t["flex-direction"]?t["flex-direction"]:"column","justify-content":t["justify-content"]?t["justify-content"]:"center","align-items":t["align-items"]?t["align-items"]:"center","-webkit-transform":t["-webkit-transform"]?t["-webkit-transform"]:"rotate(270deg)","-moz-transform":t["-moz-transform"]?t["-moz-transform"]:"rotate(270deg)","-o-transform":t["-o-transform"]?t["-o-transform"]:"rotate(270deg)","-ms-transform":t["-ms-transform"]?t["-ms-transform"]:"rotate(270deg)",transform:t.transform?t.transform:"rotate(270deg)"})),fe=t=>(t||(t={}),Object.assign({outline:"0",border:"0","border-radius":"5px","background-color":"var(--paper-item-icon-active-color)",margin:"0",transition:"box-shadow 0.2s ease-in-out",overflow:"hidden","-webkit-appearance":"none","pointer-events":"auto"},t)),ve=t=>(t||(t={}),Object.assign({height:"100%","-webkit-appearance":"none",color:"red",transition:"box-shadow 0.2s ease-in-out"},t)),be=t=>(t||(t={}),Object.assign({width:"25px",height:"80px","-webkit-appearance":"none",cursor:"ew-resize","border-radius":"0",transition:"box-shadow 0.2s ease-in-out",position:"relative","box-shadow":"-3500px 0 0 3500px var(--accent-color), inset 0 0 0 25px #FFFFFF",top:"calc((100% - 80px) / 2)","border-right":"10px solid var(--accent-color)","border-left":"10px solid var(--accent-color)","border-top":"20px solid var(--accent-color)","border-bottom":"20px solid var(--accent-color)","pointer-events":"auto"},t));console.info(`%c  ---- MY-BUTTON-LIGHT ---- \n%c  ${r("common.version")} 0.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-button-light",name:"Light Button Card",description:"Custom Light Button Card for Lovelace."});let ye=class extends ct{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!t.entity.includes("light."))throw new Error("Entity has to be a light.");this.config=Object.assign({name:"MyButtonLight",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Rt(this,t,!1)}render(){var t,e,o,i,n,r,s,a;const l=this.config.styles?this.config.styles:{},c=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",d=this.hass.states[""+c],u={show:!0,icon:"mdi:cog-outline"},h="string"==typeof this.config.icon?Object.assign(Object.assign({},u),{icon:this.config.icon}):"object"==typeof this.config.icon?Object.assign(Object.assign({},u),this.config.icon):u,p={show:!0,text:d.attributes.friendly_name},m="string"==typeof this.config.label?Object.assign(Object.assign({},p),{text:this.config.label}):"object"==typeof this.config.label?Object.assign(Object.assign({},p),this.config.label):p,g={min:0,max:100,step:"1",show:!0},f=this.config.slider?Object.assign(Object.assign({},g),this.config.slider):g,v=re("my-button-card",l.card),b=re("my-button-icon",l.icon),y=re("my-button-label",l.label),{containerStyle:_,inputStyle:w,trackStyle:x,thumbStyle:S}=re("my-button-slider",l.slider);this._trackStyle=ie(x),this._thumbStyle=ie(S),"on"===d.state?(v["color-on"]&&(v.background=v["color-on"]),b["color-on"]&&(b.color=b["color-on"]),y["color-on"]&&(y.color=y["color-on"]),_["color-on"]&&(_["--slider-color"]=_["color-on"])):(v["color-off"]&&(v.background=v["color-off"]),b["color-off"]?b.color=b["color-off"]:b.color="var(--paper-item-icon-color)",y["color-off"]&&(y.color=y["color-off"]),_["color-off"]?_["--slider-color"]=_["color-off"]:_["--slider-color"]="var(--paper-slider-secondary-color)");const $=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Zt(window):Gt(window)},C=t=>{this._setBrightness(d,t.target,f.min,f.max)};return z`
            <ha-card class="my-button-card" style="${ie(v)}">
                <div class="flex-container">
                    <div class="row-1" 
                    @action=${t=>this._handleAction(t,this.config)}
                    .actionHandler=${ee({hasDoubleClick:"none"!==(null===(e=null===(t=this.config)||void 0===t?void 0:t.double_tap_action)||void 0===e?void 0:e.action),hasHold:"none"!==(null===(i=null===(o=this.config)||void 0===o?void 0:o.hold_action)||void 0===i?void 0:i.action)})}>
                        ${(()=>{var t,e,o,i;return h.show?z`
                <ha-icon class="my-button-icon" icon="${h.icon}" style="${ie(b)}"
                    @action=${t=>this._handleAction(t,this.config)}
                    .actionHandler=${ee({hasDoubleClick:"none"!==(null===(e=null===(t=this.config)||void 0===t?void 0:t.double_tap_action)||void 0===e?void 0:e.action),hasHold:"none"!==(null===(i=null===(o=this.config)||void 0===o?void 0:o.hold_action)||void 0===i?void 0:i.action)})} />
            `:z``})()}
                    </div>
                    <div class="row-2" 
                    @action=${t=>this._handleAction(t,this.config)}
                    .actionHandler=${ee({hasDoubleClick:"none"!==(null===(r=null===(n=this.config)||void 0===n?void 0:n.double_tap_action)||void 0===r?void 0:r.action),hasHold:"none"!==(null===(a=null===(s=this.config)||void 0===s?void 0:s.hold_action)||void 0===a?void 0:a.action)})}>
                        ${m.show?z`
                <label class="my-button-label" style="${ie(y)}">${m.text}</label>
            `:z``}
                    </div>
                    <div class="row-3">
                        ${f.show?z`
                <div class="slider-container" style="${ie(_)}">
                    <input name="slider" type="range" class="" style="${ie(w)}"
                        min="${f.min}" max="${f.max}" step="${f.step}" 
                        value="${"off"===d.state?0:Math.round(d.attributes.brightness/2.56)}"
                        @change=${!f.intermediate&&C}
                        @input=${f.intermediate&&C}
                        @touchstart=${f.toggle_scroll?$:null}
                        @touchend=${f.toggle_scroll?$:null}
                    />
                </div>
            `:z``}
                    </div>
                </div>
            </ha-card>
        `}_handleAction(t,e){var o;if(e.entity||(e.entity=this.config.entity),null===(o=t.detail)||void 0===o?void 0:o.action)switch(t.detail.action){case"tap":e.tap_action&&this._handleTap(e);break;case"hold":e.hold_action&&this._handleHold(e);break;case"double_tap":e.double_tap_action&&this._handleDblTap(e)}}_handleTap(t){Ht(this,this.hass,t,"tap")}_handleHold(t){Ht(this,this.hass,t,"hold")}_handleDblTap(t){Ht(this,this.hass,t,"double_tap")}_showWarning(t){return z` <hui-warning>${t}</hui-warning> `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),z` ${e} `}_setBrightness(t,e,o,i){const n=e.value>i?i:e.value<o?o:e.value;this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*n}),e.value=n}static get styles(){return at`
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
        `}};s([ot({attribute:!1})],ye.prototype,"hass",void 0),s([it()],ye.prototype,"config",void 0),ye=s([tt("my-button-light")],ye),console.info(`%c  ---- MY-BUTTON-COVER ---- \n%c  ${r("common.version")} 0.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-button-cover",name:"Cover Button Card",description:"Custom Cover Button Card for Lovelace."});let _e=class extends ct{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!t.entity.includes("cover."))throw new Error("Entity has to be a cover.");this.config=Object.assign({name:"MyButtonCover",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Rt(this,t,!1)}render(){var t,e,o,i,n;const r=this.config.styles?JSON.parse(JSON.stringify(this.config.styles)):{},s=this.config.entity?this.config.entity:"ERROR",a=this.hass.states[""+s],l={show:!0,icon:"",iconOpen:"mdi:blinds-open",iconClose:"mdi:blinds"},c="string"==typeof this.config.icon?Object.assign(Object.assign({},l),{icon:this.config.icon}):"object"==typeof this.config.icon?Object.assign(Object.assign({},l),this.config.icon):l,d={show:!0,text:a.attributes.friendly_name,vertical:!0},u="string"==typeof this.config.label?Object.assign(Object.assign({},d),{text:this.config.label}):"object"==typeof this.config.label?Object.assign(Object.assign({},d),this.config.label):d,h={min:0,max:100,step:"1"},p=this.config.slider?Object.assign(Object.assign({},h),this.config.slider):h,m=re("my-button-card",r.card),g=re("my-button-icon",r.icon),f=u.vertical?re("my-button-label-vertical",r.label):re("my-button-label",r.label),v=re("my-button-label-wrapper",r["label-wrapper"]),{containerStyle:b,inputStyle:y}=re("my-button-slider-vertical",r.slider),_=re("my-button-slider-wrapper",null===(t=r.slider)||void 0===t?void 0:t.wrapper),w=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Zt(window):Gt(window)},x=t=>{this._setCover(a,t.target,p.min,p.max)};if("ERROR"===s)return z`<ha-card>Error: No Entity ID</ha-card>`;return z`
            <ha-card class="my-button-card" style="${ie(m)}">
                <div class="my-button-wrapper">
                    <div class="flex-container-columns">
                        <div class="column-1"
                            @action=${t=>this._handleAction(t,this.config)}
                            .actionHandler=${ee({hasDoubleClick:"none"!==(null===(o=null===(e=this.config)||void 0===e?void 0:e.double_tap_action)||void 0===o?void 0:o.action),hasHold:"none"!==(null===(n=null===(i=this.config)||void 0===i?void 0:i.hold_action)||void 0===n?void 0:n.action)})}
                        >
                            <div class="flex-container-rows">
                                <div class="row-1">
                                    ${(()=>{var t,e;if(!c.show)return z``;let o=c.icon?c.icon:"",i=c.iconOpen?c.iconOpen:"mdi:blinds-open",n=c.iconClose?c.iconClose:"mdi:blinds";return""===o&&(o=n,a.attributes.current_position>=50&&(o=i)),z`
                <ha-icon class="my-button-icon" icon="${o}" style="${ie(g)}"
                    @action=${t=>this._handleAction(t,c)}
                    .actionHandler=${ee({hasDoubleClick:"none"!==(null===(t=null==c?void 0:c.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=null==c?void 0:c.hold_action)||void 0===e?void 0:e.action)})}
                />
            `})()}
                                </div>
                                <div class="row-2">
                                    ${(()=>{var t,e;return u.show?z`
                <div style="${u.vertical?ie(v):"display: block;"}"
                    @action=${t=>this._handleAction(t,u)}
                    .actionHandler=${ee({hasDoubleClick:"none"!==(null===(t=null==u?void 0:u.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=null==u?void 0:u.hold_action)||void 0===e?void 0:e.action)})}
                >

                    <label style="${ie(f)}">${u.text}</label>
                </div>
            `:z``})()}
                                </div>
                                <div class="row-3"></div>
                            </div>
                        </div>
                        <div class="column-2">
                            <div style="${ie(_)}">
                                <div class="slider-container" style="${ie(b)}">
                                    <input name="slider" type="range" class="" style="${ie(y)}"
                                        min="${p.min}" max="${p.max}" step="${p.step}" 
                                        value="${a.attributes.current_position}"
                                        @change=${!p.intermediate&&x}
                                        @input=${p.intermediate&&x}
                                        @touchstart=${p.toggle_scroll?w:null}
                                        @touchend=${p.toggle_scroll?w:null}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `}_handleAction(t,e){var o;if(e.entity||(e.entity=this.config.entity),null===(o=t.detail)||void 0===o?void 0:o.action)switch(t.detail.action){case"tap":e.tap_action&&this._handleTap(e);break;case"hold":e.hold_action&&this._handleHold(e);break;case"double_tap":e.double_tap_action&&this._handleDblTap(e)}}_handleTap(t){Ht(this,this.hass,t,"tap")}_handleHold(t){Ht(this,this.hass,t,"hold")}_handleDblTap(t){Ht(this,this.hass,t,"double_tap")}_setCover(t,e,o,i){var n=e.value;n>i?n=i:n<o&&(n=o),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:n}),e.value=n}static get styles(){return at`
            .my-button-icon {
                --mdc-icon-size: 100%;
            }
            .my-button-wrapper {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                position: relative;
            }
            .flex-container-columns {
                padding: 0;
                margin: 0;
                display: flex;
                flex-flow: row;
                height: 100%;
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
        `}};s([ot({attribute:!1})],_e.prototype,"hass",void 0),s([it()],_e.prototype,"config",void 0),_e=s([tt("my-button-cover")],_e),console.info(`%c  ---- MY-CARDS ---- \n%c  ${r("common.version")} 1.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{_e as MyButtonCover,ye as MyButtonLight,Xt as MySlider};

var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},i={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},n={common:i};const o={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:i,default:n})};function r(t,e="",i=""){const n=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce((t,e)=>t[e],o[n])}catch(e){r=t.split(".").reduce((t,e)=>t[e],o.en)}return void 0===r&&(r=t.split(".").reduce((t,e)=>t[e],o.en)),""!==e&&""!==i&&(r=r.replace(e,i)),r}
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
***************************************************************************** */function s(t,e,i,n){var o,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(r<3?o(s):r>3?o(e,i,s):o(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s
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
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},c=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${c}--\x3e`,u=new RegExp(`${c}|${d}`);class h{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],o=document.createTreeWalker(e.content,133,null,!1);let r=0,s=-1,a=0;const{strings:l,values:{length:d}}=t;for(;a<d;){const t=o.nextNode();if(null!==t){if(s++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)p(e[t].name,"$lit$")&&n++;for(;n-- >0;){const e=l[a],i=f.exec(e)[2],n=i.toLowerCase()+"$lit$",o=t.getAttribute(n);t.removeAttribute(n);const r=o.split(u);this.parts.push({type:"attribute",index:s,name:i,strings:r}),a+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const n=t.parentNode,o=e.split(u),r=o.length-1;for(let e=0;e<r;e++){let i,r=o[e];if(""===r)i=g();else{const t=f.exec(r);null!==t&&p(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(r)}n.insertBefore(i,t),this.parts.push({type:"node",index:++s})}""===o[r]?(n.insertBefore(g(),t),i.push(t)):t.data=o[r],a+=r}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&s!==r||(s++,e.insertBefore(g(),t)),r=s,this.parts.push({type:"node",index:s}),null===t.nextSibling?t.data="":(i.push(t),s--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:i},parts:n}=t,o=document.createTreeWalker(i,133,null,!1);let r=b(n),s=n[r],a=-1,l=0;const c=[];let d=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-l,r=b(n,r),s=n[r]}c.forEach(t=>t.parentNode.removeChild(t))}const y=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},b=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(m(e))return i}return-1};
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
const _=new WeakMap,w=t=>(...e)=>{const i=t(...e);return _.set(i,!0),i},S=t=>"function"==typeof t&&_.has(t),x={},$={};
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
class C{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let o,r=0,s=0,l=n.nextNode();for(;r<i.length;)if(o=i[r],m(o)){for(;s<o.index;)s++,"TEMPLATE"===l.nodeName&&(e.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=e.pop(),l=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const k=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),T=` ${c} `;class P{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let n=0;n<t;n++){const t=this.strings[n],o=t.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===t.indexOf("--\x3e",o+1);const r=f.exec(t);e+=null===r?t+(i?T:d):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+c}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==k&&(e=k.createHTML(e)),t.innerHTML=e,t}}
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
 */const N=t=>null===t||!("object"==typeof t||"function"==typeof t),E=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class M{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new A(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!E(t))return t}let n="";for(let o=0;o<e;o++){n+=t[o];const e=i[o];if(void 0!==e){const t=e.value;if(N(t)||!E(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class A{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===x||N(t)&&t===this.value||(this.value=t,S(t)||(this.committer.dirty=!0))}commit(){for(;S(this.value);){const t=this.value;this.value=x,t(this)}this.value!==x&&this.committer.commit()}}class O{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}const t=this.__pendingValue;t!==x&&(N(t)?t!==this.value&&this.__commitText(t):t instanceof P?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):E(t)?this.__commitIterable(t):t===$?(this.value=$,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof C&&this.value.template===e)this.value.update(t.values);else{const i=new C(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const o of t)i=e[n],void 0===i&&(i=new O(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(o),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class D{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=x}}class V extends M{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new H(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class H extends A{}let R=!1;(()=>{try{const t={get capture(){return R=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class Y{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=L(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=x}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const L=t=>t&&(R?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function U(t){let e=I.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},I.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(c);return i=e.keyString.get(n),void 0===i&&(i=new h(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const I=new Map,j=new WeakMap;
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
 */const z=new
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
class{handleAttributeExpressions(t,e,i,n){const o=e[0];if("."===o){return new V(t,e.slice(1),i).parts}if("@"===o)return[new Y(t,e.slice(1),n.eventContext)];if("?"===o)return[new D(t,e.slice(1),i)];return new M(t,e,i).parts}handleTextExpression(t){return new O(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const B=(t,...e)=>new P(t,e,"html",z)
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
 */,q=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),F=!1);const W=t=>e=>{const i=q(e.type,t);let n=I.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},I.set(i,n));let o=n.stringsArray.get(e.strings);if(void 0!==o)return o;const r=e.strings.join(c);if(o=n.keyString.get(r),void 0===o){const i=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(i,t),o=new h(e,i),n.keyString.set(r,o)}return n.stringsArray.set(e.strings,o),o},J=["html","svg"],Z=new Set,X=(t,e,i)=>{Z.add(t);const n=i?i.element:document.createElement("template"),o=e.querySelectorAll("style"),{length:r}=o;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(n,t);const s=document.createElement("style");for(let t=0;t<r;t++){const e=o[t];e.parentNode.removeChild(e),s.textContent+=e.textContent}(t=>{J.forEach(e=>{const i=I.get(q(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),v(t,i)})})})(t);const a=n.content;i?function(t,e,i=null){const{element:{content:n},parts:o}=t;if(null==i)return void n.appendChild(e);const r=document.createTreeWalker(n,133,null,!1);let s=b(o),a=0,l=-1;for(;r.nextNode();){l++;for(r.currentNode===i&&(a=y(e),i.parentNode.insertBefore(e,i));-1!==s&&o[s].index===l;){if(a>0){for(;-1!==s;)o[s].index+=a,s=b(o,s);return}s=b(o,s)}}}(i,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(s,a.firstChild);const t=new Set;t.add(s),v(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const G={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},K=(t,e)=>e!==t&&(e==e||t==t),Q={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:K};class tt extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const o=this[t];this[e]=n,this.requestUpdateInternal(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=K){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||G,o="function"==typeof n?n:n.fromAttribute;return o?o(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||G.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Q){const n=this.constructor,o=n._attributeNameForProperty(t,i);if(void 0!==o){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let n=!0;if(void 0!==t){const o=this.constructor;i=i||o.getPropertyOptions(t),o._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}tt.finalized=!0;
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
*/const rt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol();class at{constructor(t,e){if(e!==st)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const i=e.reduce((e,i,n)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1],t[0]);return new at(i,st)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ct={};class dt extends tt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),n=[];i.forEach(t=>n.unshift(t)),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!rt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new at(String(e),st)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==ct&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return ct}}dt.finalized=!0,dt.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,o=j.has(e),r=F&&11===e.nodeType&&!!e.host,s=r&&!Z.has(n),a=s?document.createDocumentFragment():e;if(((t,e,i)=>{let n=j.get(e);void 0===n&&(l(e,e.firstChild),j.set(e,n=new O(Object.assign({templateFactory:U},i))),n.appendInto(e)),n.setValue(t),n.commit()})(t,a,Object.assign({templateFactory:W(n)},i)),s){const t=j.get(a);j.delete(a);const i=t.value instanceof C?t.value.template:void 0;X(n,a,i),l(e,e.firstChild),e.appendChild(a),j.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)},dt.shadowRootOptions={mode:"open"};var ut=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ht="[^\\s]+",pt=/\[([^]*?)\]/gm;function mt(t,e){for(var i=[],n=0,o=t.length;n<o;n++)i.push(t[n].substr(0,e));return i}var gt=function(t){return function(e,i){var n=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return n>-1?n:null}};function ft(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var n=0,o=e;n<o.length;n++){var r=o[n];for(var s in r)t[s]=r[s]}return t}var vt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],yt=["January","February","March","April","May","June","July","August","September","October","November","December"],bt=mt(yt,3),_t={dayNamesShort:mt(vt,3),dayNames:vt,monthNamesShort:bt,monthNames:yt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},wt=ft({},_t),St=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},xt={D:function(t){return String(t.getDate())},DD:function(t){return St(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return St(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return St(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return St(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return St(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return St(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return St(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return St(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return St(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return St(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return St(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+St(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+St(Math.floor(Math.abs(e)/60),2)+":"+St(Math.abs(e)%60,2)}},$t=function(t){return+t-1},Ct=[null,"[1-9]\\d?"],kt=[null,ht],Tt=["isPm",ht,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],Pt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],Nt=(gt("monthNamesShort"),gt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Et,Mt,At=function(t,e,i){if(void 0===e&&(e=Nt.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var n=[];e=(e=Nt[e]||e).replace(pt,(function(t,e){return n.push(e),"@@@"}));var o=ft(ft({},wt),i);return(e=e.replace(ut,(function(e){return xt[e](t,o)}))).replace(/@@@/g,(function(){return n.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();(Mt=Et||(Et={})).language="language",Mt.system="system",Mt.comma_decimal="comma_decimal",Mt.decimal_comma="decimal_comma",Mt.space_comma="space_comma",Mt.none="none";var Ot=["closed","locked","off"],Dt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return o.detail=i,t.dispatchEvent(o),o},Vt=function(t){Dt(window,"haptic",t)},Ht=function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(Vt("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&Dt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),Dt(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var n,o=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===o?"homeassistant":o;switch(o){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(r,n,{entity_id:e})})(t,e,Ot.includes(t.states[e].state))}(e,i.entity),Vt("success"));break;case"call-service":if(!n.service)return void Vt("failure");var o=n.service.split(".",2);e.callService(o[0],o[1],n.service_data),Vt("success");break;case"fire-dom-event":Dt(t,"ll-custom",n)}},Rt=function(t,e,i,n){var o;"double_tap"===n&&i.double_tap_action?o=i.double_tap_action:"hold"===n&&i.hold_action?o=i.hold_action:"tap"===n&&i.tap_action&&(o=i.tap_action),Ht(t,e,i,o)};function Yt(t){return void 0!==t&&"none"!==t.action}function Lt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var n=e.get("hass");return!n||n.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}var Ut=!1;if("undefined"!=typeof window){var It={get passive(){Ut=!0}};window.addEventListener("testPassive",null,It),window.removeEventListener("testPassive",null,It)}var jt="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),zt=[],Bt=!1,qt=-1,Ft=void 0,Wt=void 0,Jt=void 0,Zt=function(t){return zt.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Xt=function(t){var e=t||window.event;return!!Zt(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},Gt=function(t,e){if(t){if(!zt.some((function(e){return e.targetElement===t}))){var i={targetElement:t,options:e||{}};zt=[].concat(function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(zt),[i]),jt?window.requestAnimationFrame((function(){if(void 0===Wt){Wt={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,i=t.scrollX,n=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-i,setTimeout((function(){return window.requestAnimationFrame((function(){var t=n-window.innerHeight;t&&e>=n&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===Jt){var e=!!t&&!0===t.reserveScrollBarGap,i=window.innerWidth-document.documentElement.clientWidth;if(e&&i>0){var n=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);Jt=document.body.style.paddingRight,document.body.style.paddingRight=n+i+"px"}}void 0===Ft&&(Ft=document.body.style.overflow,document.body.style.overflow="hidden")}(e),jt&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(qt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var i=t.targetTouches[0].clientY-qt;!Zt(t.target)&&(e&&0===e.scrollTop&&i>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&i<0?Xt(t):t.stopPropagation())}(e,t)},Bt||(document.addEventListener("touchmove",Xt,Ut?{passive:!1}:void 0),Bt=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},Kt=function(t){t?(zt=zt.filter((function(e){return e.targetElement!==t})),jt&&(t.ontouchstart=null,t.ontouchmove=null,Bt&&0===zt.length&&(document.removeEventListener("touchmove",Xt,Ut?{passive:!1}:void 0),Bt=!1)),jt?function(){if(void 0!==Wt){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=Wt.position,document.body.style.top=Wt.top,document.body.style.left=Wt.left,window.scrollTo(e,t),Wt=void 0}}():(void 0!==Jt&&(document.body.style.paddingRight=Jt,Jt=void 0),void 0!==Ft&&(document.body.style.overflow=Ft,Ft=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};const Qt={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0},actions:{icon:"gesture-tap-hold",name:"Actions",secondary:"Perform actions based on tapping/clicking",show:!1,options:{tap:{icon:"gesture-tap",name:"Tap",secondary:"Set the action to perform on tap",show:!1},hold:{icon:"gesture-tap-hold",name:"Hold",secondary:"Set the action to perform on hold",show:!1},double_tap:{icon:"gesture-double-tap",name:"Double Tap",secondary:"Set the action to perform on double tap",show:!1}}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the name, icon, etc",show:!1}};let te=class extends dt{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _show_warning(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_warning)||!1}get _show_error(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_error)||!1}get _tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.tap_action)||{action:"more-info"}}get _hold_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.hold_action)||{action:"none"}}get _double_tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.double_tap_action)||{action:"none"}}render(){if(!this.hass||!this._helpers)return B``;this._helpers.importMoreInfoControl("climate");const t=Object.keys(this.hass.states).filter(t=>"sun"===t.substr(0,t.indexOf(".")));return B`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${"mdi:"+Qt.required.icon}></ha-icon>
            <div class="title">${Qt.required.name}</div>
          </div>
          <div class="secondary">${Qt.required.secondary}</div>
        </div>
        ${Qt.required.show?B`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed=${this._valueChanged}
                  .configValue=${"entity"}
                >
                  <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
                    ${t.map(t=>B`
                        <paper-item>${t}</paper-item>
                      `)}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"actions"}>
          <div class="row">
            <ha-icon .icon=${"mdi:"+Qt.actions.icon}></ha-icon>
            <div class="title">${Qt.actions.name}</div>
          </div>
          <div class="secondary">${Qt.actions.secondary}</div>
        </div>
        ${Qt.actions.show?B`
              <div class="values">
                <div class="option" @click=${this._toggleAction} .option=${"tap"}>
                  <div class="row">
                    <ha-icon .icon=${"mdi:"+Qt.actions.options.tap.icon}></ha-icon>
                    <div class="title">${Qt.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">${Qt.actions.options.tap.secondary}</div>
                </div>
                ${Qt.actions.options.tap.show?B`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"hold"}>
                  <div class="row">
                    <ha-icon .icon=${"mdi:"+Qt.actions.options.hold.icon}></ha-icon>
                    <div class="title">${Qt.actions.options.hold.name}</div>
                  </div>
                  <div class="secondary">${Qt.actions.options.hold.secondary}</div>
                </div>
                ${Qt.actions.options.hold.show?B`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
                <div class="option" @click=${this._toggleAction} .option=${"double_tap"}>
                  <div class="row">
                    <ha-icon .icon=${"mdi:"+Qt.actions.options.double_tap.icon}></ha-icon>
                    <div class="title">${Qt.actions.options.double_tap.name}</div>
                  </div>
                  <div class="secondary">${Qt.actions.options.double_tap.secondary}</div>
                </div>
                ${Qt.actions.options.double_tap.show?B`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `:""}
              </div>
            `:""}
        <div class="option" @click=${this._toggleOption} .option=${"appearance"}>
          <div class="row">
            <ha-icon .icon=${"mdi:"+Qt.appearance.icon}></ha-icon>
            <div class="title">${Qt.appearance.name}</div>
          </div>
          <div class="secondary">${Qt.appearance.secondary}</div>
        </div>
        ${Qt.appearance.show?B`
              <div class="values">
                <paper-input
                  label="Name (Optional)"
                  .value=${this._name}
                  .configValue=${"name"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <br />
                <ha-formfield .label=${"Toggle warning "+(this._show_warning?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_warning}
                    .configValue=${"show_warning"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${"Toggle error "+(this._show_error?"off":"on")}>
                  <ha-switch
                    .checked=${!1!==this._show_error}
                    .configValue=${"show_error"}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `:""}
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(t){this._toggleThing(t,Qt.actions.options)}_toggleOption(t){this._toggleThing(t,Qt)}_toggleThing(t,e){const i=!e[t.target.option].show;for(const[t]of Object.entries(e))e[t].show=!1;e[t.target.option].show=i,this._toggle=!this._toggle}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this["_"+e.configValue]!==e.value){if(e.configValue)if(""===e.value){const t=Object.assign({},this._config);delete t[e.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});Dt(this,"config-changed",{config:this._config})}}static get styles(){return lt`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `}};s([nt({attribute:!1})],te.prototype,"hass",void 0),s([ot()],te.prototype,"_config",void 0),s([ot()],te.prototype,"_toggle",void 0),s([ot()],te.prototype,"_helpers",void 0),te=s([et("boilerplate-card-editor")],te),console.info(`%c  ---- MY-SLIDER ---- \n%c  ${r("common.version")} 2.0.2    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let ee=class extends dt{static async getConfigElement(){return document.createElement("boilerplate-card-editor")}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){if(!t.entity)throw new Error("You need to define entity");if(!(t.entity.includes("input_number.")||t.entity.includes("light.")||t.entity.includes("media_player.")||t.entity.includes("cover.")||t.entity.includes("fan.")||t.entity.includes("switch.")||t.entity.includes("lock.")))throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const i=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",n=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+i]);var o=e.step?e.step:"1";i.includes("input_number.")&&(o=e.step?e.step:n.attributes.step);var r=e.minBar?e.minBar:0,s=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100,c=e.width?e.width:"100%",d=e.height?e.height:"50px",u=e.radius?e.radius:"4px",h=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:d;"0"!=f&&(f+="deg");var y=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",b=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",_=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",S=e.border?e.border:"0",x=e.thumbWidth?e.thumbWidth:"25px",$=e.thumbHeight?e.thumbHeight:"80px",C=e.thumbColor?e.thumbColor:"#FFFFFF",k=e.thumbColorOff?e.thumbColorOff:"#969696",T=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",P=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",N=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",E=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",M=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",A=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",O=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",D=`\n\t\t\t--slider-width: ${c};\n\t\t\t--slider-width-inverse: -${c};\n\t\t\t--slider-height: ${d};\n\t\t\t--slider-main-color: ${"off"===n.state||"locked"===n.state||null==n.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${y};\n\t\t\t--slider-main-color-off: ${_};\n\t\t\t--slider-secondary-color: ${"off"===n.state||"locked"===n.state||null==n.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${b};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${u};\n\t\t\t--border: ${S};\n\t\t\t\n\t\t\t--thumb-width: ${x};\n\t\t\t--thumb-height: ${$};\n\t\t\t--thumb-color: ${"off"===n.state||null==n.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${C};\n\t\t\t--thumb-color-off: ${k};\n\t\t\t--thumb-horizontal-padding: ${T};\n\t\t\t--thumb-vertical-padding: ${P};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${h};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${N};\n\t\t\t--thumb-border-right: ${E};\n\t\t\t--thumb-border-left: ${M};\n\t\t\t--thumb-border-top: ${A};\n\t\t\t--thumb-border-bottom: ${O};\n\t\t`;const V=t=>{i.includes("light.")?"Warmth"==e.function?this._setWarmth(n,t.target,a,l):this._setBrightness(n,t.target,a,l):i.includes("input_number.")?this._setInputNumber(n,t.target,a,l):i.includes("media_player.")?this._setMediaVolume(n,t.target,a,l):i.includes("cover.")?this._setCover(n,t.target,a,l):i.includes("fan.")?this._setFan(n,t.target,a,l):i.includes("switch.")?this._setSwitch(n,t.target,a,l,r,s):i.includes("lock.")&&this._setLock(n,t.target,a,l,r,s)},H=t=>{e.intermediate&&V(t)},R=t=>{e.intermediate||V(t)},Y=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Gt(window):Kt(window)};if(i.includes("light."))return"Warmth"==e.function?B`
					<ha-card>
						<div class="slider-container" style="${D}">
							<input name="foo" type="range" class="${n.state}" style="${D}" 
								min="${n.attributes.min_mireds}" max="${n.attributes.max_mireds}" 
								step="${o}" .value="${"off"===n.state?0:n.attributes.color_temp}" 
								@input=${H} @change=${R} >
						</div>
					</ha-card>
				`:B`
					<ha-card>
						<div class="slider-container" style="${D}">
							<input name="foo" type="range" class="${n.state}" style="${D}" 
								step="${o}" .value="${"off"===n.state?0:Math.round(n.attributes.brightness/2.56)}" 
								@input=${H} @change=${R} >
						</div>
					</ha-card>
				`;if(i.includes("input_number."))return B`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${n.state}" style="${D}" min="${n.attributes.min}" max="${n.attributes.max}" step="${o}" .value="${n.state}" @input=${H} @change=${R}>
					</div>
				</ha-card>
			`;if(i.includes("media_player.")){var L=0;if(null!=n.attributes.volume_level)L=Number(100*n.attributes.volume_level);return B`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${n.state}" style="${D}" min="${r}" max="${s}" step="${o}" .value="${L}" @input=${H} @change=${R}>
					</div>
				</ha-card>
			`}return i.includes("cover.")?B`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${n.state}" style="${D}" 
							min="${r}" max="${s}" step="${o}" 
							.value="${n.attributes.current_position}" 
							@input=${H} @change=${R}
							@mousedown=${e.toggle_scroll?Y:null}
							@mouseup=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:i.includes("fan.")?B`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${n.state}" style="${D}" min="${r}" max="${s}" step="${o}" .value="${n.attributes.percentage}" @input=${H} @change=${R}>
					</div>
				</ha-card>
			`:i.includes("switch.")||i.includes("lock.")?B`
				<ha-card>
					<div class="slider-container" style="${D}">
						<input name="foo" type="range" class="${n.state}" style="${D}" min="${r}" max="${s}" step="${o}" .value="${r}" @input=${H} @change=${R}>
					</div>
				</ha-card>
			`:void 0}_handleAction(t){this.hass&&this.config&&t.detail.action&&Rt(this,this.hass,this.config,t.detail.action)}_handleSliderAction(t,e,i,n){let o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("light","turn_on",{entity_id:t.entity_id,brightness:2.56*o}),e.value=o}_setBrightness(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*o}),e.value=o}_setWarmth(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:o}),e.value=o}_setInputNumber(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:o}),e.value=o}_setFan(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:o}),e.value=o}_setCover(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:o}),e.value=o}_setMediaVolume(t,e,i,n){var o=e.value;o>n?o=n:o<i&&(o=i),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:o/100}),e.value=o}_setSwitch(t,e,i,n,o,r){var s=e.value,a=Math.min(n,r);Number(a)<=s&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(i,o))}_setLock(t,e,i,n,o,r){var s=e.value,a=Math.min(n,r);if(Number(a)<=s){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(i,o))}static get styles(){return lt`
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
			}
	  
			.slider-container input[type="range"]::-webkit-slider-thumb:hover {
				cursor: default;
			}
	  
			.slider-container input[type="range"]:hover {
			  cursor: default;
			}
		`}};s([nt({attribute:!1})],ee.prototype,"hass",void 0),s([ot()],ee.prototype,"config",void 0),ee=s([et("my-slider")],ee);
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
const ie=new WeakMap,ne=w(t=>e=>{if(!(e instanceof O))throw new Error("unsafeHTML can only be used in text bindings");const i=ie.get(e);if(void 0!==i&&N(t)&&t===i.value&&e.value===i.fragment)return;const n=document.createElement("template");n.innerHTML=t;const o=document.importNode(n.content,!0);e.setValue(o),ie.set(e,{value:t,fragment:o})});function oe(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}const re="lovelace-player-device-id";function se(){if(!localStorage[re]){const t=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);window.fully&&"function"==typeof fully.getDeviceId?localStorage[re]=fully.getDeviceId():localStorage[re]=`${t()}${t()}-${t()}${t()}`}return localStorage[re]}let ae=se();const le=new URLSearchParams(window.location.search);var ce;le.get("deviceID")&&null!==(ce=le.get("deviceID"))&&("clear"===ce?localStorage.removeItem(re):localStorage[re]=ce,ae=se());const de="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class ue extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:de?"100px":"50px",height:de?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},n=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?Dt(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,Dt(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Dt(t,"action",{action:"double_tap"})):Dt(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",n),t.addEventListener("touchcancel",n),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",n),t.addEventListener("keyup",t=>{13===t.keyCode&&n(t)})}startAnimation(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-boilerplate",ue);const he=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-boilerplate"))return t.querySelector("action-handler-boilerplate");const e=document.createElement("action-handler-boilerplate");return t.appendChild(e),e})();i&&i.bind(t,e)},pe=w((t={})=>e=>{he(e.committer.element,t)});console.info(`%c  ---- MY-FOOTER ---- \n%c  ${r("common.version")} 0.0.2    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-footer",name:"Footer Card",description:"Custom Footer Card for Lovelace."});let me=class extends dt{static async getConfigElement(){return document.createElement("boilerplate-card-editor")}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){this.applyTemplate(t.content?t.content:"").then(e=>{console.log("Parsed:",'"'+Response+'"'),this.config=Object.assign({name:"MyFooter",parsed_content:e,disabled_scroll:!1},t)})}shouldUpdate(t){return!!this.config&&Lt(this,t,!1)}render(){var t=JSON.parse(JSON.stringify(this.config));console.log("CONFIG:::",t);const e=t.styles?t.styles:{},i=t.buttons?t.buttons:[];let n=e.container?e.container:{};n.height=n.height?n.height:"75px",n.width=n.width?n.width:"100%",n.borderRadius=n.borderRadius?n.borderRadius:"10px",n.backgroundColor=n.backgroundColor?n.backgroundColor:"var(--paper-card-background-color)";let o=e.text?e.text:{};o.padding=o.padding?o.padding:"15px 20px",o.maxWidth=o.maxWidth?o.maxWidth:"50%",o.color=o.color?o.color:"white";const r=t=>Object.keys(t).reduce((e,i)=>e+i.split(/(?=[A-Z])/).join("-").toLowerCase()+":"+t[i]+";",""),s=()=>{console.log("tester:",this.config.disabled_scroll),this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?(console.log("Disable Scroll"),Gt(window)):(console.log("Enable Scroll"),Kt(window))};return B`
			<ha-card>
				<div class="footer-container" style="${r(n)}">
					<div class="text-container" style="${r(o)}">
						<p>
							${ne(this.config.parsed_content)}
						</p>
					</div>

					<div class="button-container">
						<div class="button">
							<ha-icon class="icon" icon="mdi:cog-outline" style="" 
								@action=${t=>{this._handleDynamicButton(t,{toggle:this.config.scroll_disabled}),s()}}
								.actionHandler=${pe({hasHold:!1,hasDoubleClick:!1})} />
						</div>
						${i.map((t,e)=>B`
									<div class="button">
										<ha-icon class="icon" key="${e}" icon="${t.button.icon}" style="" 
											@action=${e=>this._handleDynamicButton(e,t.button)}
											.actionHandler=${pe({hasHold:Yt(t.hold_action),hasDoubleClick:Yt(t.double_tap_action)})} />
									</div>
								`)}
					</div>
				</div>
			</ha-card>
		`}_handleDynamicButton(t,e){this.hass&&e&&t.detail.action&&Rt(this,this.hass,e,t.detail.action)}_handleAction(t){this.hass&&this.config&&t.detail.action&&Rt(this,this.hass,this.config,t.detail.action)}parseTemplate(t,e){return new Promise((i,n)=>{let o=function(t,e,i,n=!0){t||(t=oe().connection);let o={user:oe().user.name,browser:ae,hash:location.hash.substr(1)||" ",...i.variables},r=i.template,s=i.entity_ids;return t.subscribeMessage(t=>{if(n){let i=String(t.result);const n=/_\([^)]*\)/g;i=i.replace(n,t=>oe().localize(t.substring(2,t.length-1))||t),e(i)}else e(t.result)},{type:"render_template",template:r,variables:o,entity_ids:s})}(null,async t=>{i(t)},{template:t,variables:e,entity_ids:[]},!1),r=console.log;(async()=>{try{r=await o,await r()}catch(t){n(t.message)}})()})}async applyTemplate(t){try{const e={user:{name:"Anthon",is_admin:!0,is_owner:!0},page:Object.assign(Object.assign({},location),{path:location.pathname}),theme:"Dark - Wooden"};return await this.parseTemplate(t,e)}catch(e){return console.error("Error parsing template.",e),console.log("Template",t),"Error!"}}static get styles(){return lt`
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
		`}};s([nt({attribute:!1})],me.prototype,"hass",void 0),s([ot()],me.prototype,"config",void 0),me=s([et("my-footer")],me),console.info(`%c  ---- MY-CARDS ---- \n%c  ${r("common.version")} 1.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{me as MyFooter,ee as MySlider};

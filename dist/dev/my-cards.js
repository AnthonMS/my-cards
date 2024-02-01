var t={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error"},e={common:t},i={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},s={common:i};const o={en:Object.freeze({__proto__:null,common:t,default:e}),nb:Object.freeze({__proto__:null,common:i,default:s})};function n(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let n;try{n=t.split(".").reduce((t,e)=>t[e],o[s])}catch(e){n=t.split(".").reduce((t,e)=>t[e],o.en)}return void 0===n&&(n=t.split(".").reduce((t,e)=>t[e],o.en)),""!==e&&""!==i&&(n=n.replace(e,i)),n}
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
***************************************************************************** */function r(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r
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
 */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},c=`{{lit-${String(Math.random()).slice(2)}}}`,h=`\x3c!--${c}--\x3e`,d=new RegExp(`${c}|${h}`);class u{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],o=document.createTreeWalker(e.content,133,null,!1);let n=0,r=-1,a=0;const{strings:l,values:{length:h}}=t;for(;a<h;){const t=o.nextNode();if(null!==t){if(r++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)p(e[t].name,"$lit$")&&s++;for(;s-- >0;){const e=l[a],i=f.exec(e)[2],s=i.toLowerCase()+"$lit$",o=t.getAttribute(s);t.removeAttribute(s);const n=o.split(d);this.parts.push({type:"attribute",index:r,name:i,strings:n}),a+=n.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const s=t.parentNode,o=e.split(d),n=o.length-1;for(let e=0;e<n;e++){let i,n=o[e];if(""===n)i=g();else{const t=f.exec(n);null!==t&&p(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(n)}s.insertBefore(i,t),this.parts.push({type:"node",index:++r})}""===o[n]?(s.insertBefore(g(),t),i.push(t)):t.data=o[n],a+=n}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&r!==n||(r++,e.insertBefore(g(),t)),n=r,this.parts.push({type:"node",index:r}),null===t.nextSibling?t.data="":(i.push(t),r--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function v(t,e){const{element:{content:i},parts:s}=t,o=document.createTreeWalker(i,133,null,!1);let n=_(s),r=s[n],a=-1,l=0;const c=[];let h=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-l,n=_(s,n),r=s[n]}c.forEach(t=>t.parentNode.removeChild(t))}const y=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},_=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(m(e))return i}return-1};
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
const b=new WeakMap,w=t=>(...e)=>{const i=t(...e);return b.set(i,!0),i},S=t=>"function"==typeof t&&b.has(t),x={},C={};
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
class ${constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let o,n=0,r=0,l=s.nextNode();for(;n<i.length;)if(o=i[n],m(o)){for(;r<o.index;)r++,"TEMPLATE"===l.nodeName&&(e.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=e.pop(),l=s.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));n++}else this.__parts.push(void 0),n++;return a&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const T=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),k=` ${c} `;class M{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],o=t.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===t.indexOf("--\x3e",o+1);const n=f.exec(t);e+=null===n?t+(i?k:h):t.substr(0,n.index)+n[1]+n[2]+"$lit$"+n[3]+c}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==T&&(e=T.createHTML(e)),t.innerHTML=e,t}}
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
 */const E=t=>null===t||!("object"==typeof t||"function"==typeof t),P=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class O{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!P(t))return t}let s="";for(let o=0;o<e;o++){s+=t[o];const e=i[o];if(void 0!==e){const t=e.value;if(E(t)||!P(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===x||E(t)&&t===this.value||(this.value=t,S(t)||(this.committer.dirty=!0))}commit(){for(;S(this.value);){const t=this.value;this.value=x,t(this)}this.value!==x&&this.committer.commit()}}class V{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=g()),t.__insert(this.endNode=g())}insertAfterPart(t){t.__insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}const t=this.__pendingValue;t!==x&&(E(t)?t!==this.value&&this.__commitText(t):t instanceof M?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):P(t)?this.__commitIterable(t):t===C?(this.value=C,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof $&&this.value.template===e)this.value.update(t.values);else{const i=new $(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const o of t)i=e[s],void 0===i&&(i=new V(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(o),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){l(this.startNode.parentNode,t.nextSibling,this.endNode)}}class A{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=x}}class j extends O{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new L(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class L extends N{}let D=!1;(()=>{try{const t={get capture(){return D=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class H{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;S(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=x,t(this)}if(this.__pendingValue===x)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=Y(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=x}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const Y=t=>t&&(D?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function R(t){let e=z.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},z.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(c);return i=e.keyString.get(s),void 0===i&&(i=new u(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const z=new Map,F=new WeakMap;
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
 */const I=new
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
class{handleAttributeExpressions(t,e,i,s){const o=e[0];if("."===o){return new j(t,e.slice(1),i).parts}if("@"===o)return[new H(t,e.slice(1),s.eventContext)];if("?"===o)return[new A(t,e.slice(1),i)];return new O(t,e,i).parts}handleTextExpression(t){return new V(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const U=(t,...e)=>new M(t,e,"html",I)
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
 */,B=(t,e)=>`${t}--${e}`;let W=!0;void 0===window.ShadyCSS?W=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),W=!1);const q=t=>e=>{const i=B(e.type,t);let s=z.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},z.set(i,s));let o=s.stringsArray.get(e.strings);if(void 0!==o)return o;const n=e.strings.join(c);if(o=s.keyString.get(n),void 0===o){const i=e.getTemplateElement();W&&window.ShadyCSS.prepareTemplateDom(i,t),o=new u(e,i),s.keyString.set(n,o)}return s.stringsArray.set(e.strings,o),o},J=["html","svg"],X=new Set,Z=(t,e,i)=>{X.add(t);const s=i?i.element:document.createElement("template"),o=e.querySelectorAll("style"),{length:n}=o;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(s,t);const r=document.createElement("style");for(let t=0;t<n;t++){const e=o[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{J.forEach(e=>{const i=z.get(B(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),v(t,i)})})})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:o}=t;if(null==i)return void s.appendChild(e);const n=document.createTreeWalker(s,133,null,!1);let r=_(o),a=0,l=-1;for(;n.nextNode();){l++;for(n.currentNode===i&&(a=y(e),i.parentNode.insertBefore(e,i));-1!==r&&o[r].index===l;){if(a>0){for(;-1!==r;)o[r].index+=a,r=_(o,r);return}r=_(o,r)}}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),v(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const G={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},K=(t,e)=>e!==t&&(e==e||t==t),Q={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:K};class tt extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdateInternal(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=K){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||G,o="function"==typeof s?s:s.fromAttribute;return o?o(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||G.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Q){const s=this.constructor,o=s._attributeNameForProperty(t,i);if(void 0!==o){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let s=!0;if(void 0!==t){const o=this.constructor;i=i||o.getPropertyOptions(t),o._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}tt.finalized=!0;
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
const et=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),it=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function st(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):it(t,e)}function ot(t){return st({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}const nt=t=>ot(t)
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/,rt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol();class lt{constructor(t,e){if(e!==at)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ct=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof lt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new lt(i,at)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const ht={};class dt extends tt{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),s=[];i.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!rt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new lt(String(e),at)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==ht&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return ht}}dt.finalized=!0,dt.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,o=F.has(e),n=W&&11===e.nodeType&&!!e.host,r=n&&!X.has(s),a=r?document.createDocumentFragment():e;if(((t,e,i)=>{let s=F.get(e);void 0===s&&(l(e,e.firstChild),F.set(e,s=new V(Object.assign({templateFactory:R},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,a,Object.assign({templateFactory:q(s)},i)),r){const t=F.get(a);F.delete(a);const i=t.value instanceof $?t.value.template:void 0;Z(s,a,i),l(e,e.firstChild),e.appendChild(a),F.set(e,t)}!o&&n&&window.ShadyCSS.styleElement(e.host)},dt.shadowRootOptions={mode:"open"};var ut=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,pt="[^\\s]+",mt=/\[([^]*?)\]/gm;function gt(t,e){for(var i=[],s=0,o=t.length;s<o;s++)i.push(t[s].substr(0,e));return i}var ft=function(t){return function(e,i){var s=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return s>-1?s:null}};function vt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0,o=e;s<o.length;s++){var n=o[s];for(var r in n)t[r]=n[r]}return t}var yt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_t=["January","February","March","April","May","June","July","August","September","October","November","December"],bt=gt(_t,3),wt={dayNamesShort:gt(yt,3),dayNames:yt,monthNamesShort:bt,monthNames:_t,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},St=vt({},wt),xt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},Ct={D:function(t){return String(t.getDate())},DD:function(t){return xt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return xt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return xt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return xt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return xt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return xt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return xt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return xt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return xt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return xt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return xt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+xt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+xt(Math.floor(Math.abs(e)/60),2)+":"+xt(Math.abs(e)%60,2)}},$t=function(t){return+t-1},Tt=[null,"[1-9]\\d?"],kt=[null,pt],Mt=["isPm",pt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],Et=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],Pt=(ft("monthNamesShort"),ft("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Ot,Nt,Vt=function(t,e,i){if(void 0===e&&(e=Pt.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var s=[];e=(e=Pt[e]||e).replace(mt,(function(t,e){return s.push(e),"@@@"}));var o=vt(vt({},St),i);return(e=e.replace(ut,(function(e){return Ct[e](t,o)}))).replace(/@@@/g,(function(){return s.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();function At(){return(At=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}(Nt=Ot||(Ot={})).language="language",Nt.system="system",Nt.comma_decimal="comma_decimal",Nt.decimal_comma="decimal_comma",Nt.space_comma="space_comma",Nt.none="none";var jt=["closed","locked","off"],Lt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o},Dt=function(t){Lt(window,"haptic",t)},Ht=function(t,e,i,s,o){var n;if(o&&i.double_tap_action?n=i.double_tap_action:s&&i.hold_action?n=i.hold_action:!s&&i.tap_action&&(n=i.tap_action),n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?"))switch(n.action){case"more-info":(n.entity||i.entity||i.camera_image)&&(Lt(t,"hass-more-info",{entityId:n.entity?n.entity:i.entity?i.entity:i.camera_image}),n.haptic&&Dt(n.haptic));break;case"navigate":n.navigation_path&&(function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),Lt(window,"location-changed",{replace:i})}(0,n.navigation_path),n.haptic&&Dt(n.haptic));break;case"url":n.url_path&&window.open(n.url_path),n.haptic&&Dt(n.haptic);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var s,o=function(t){return t.substr(0,t.indexOf("."))}(e),n="group"===o?"homeassistant":o;switch(o){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}t.callService(n,s,{entity_id:e})})(t,e,jt.includes(t.states[e].state))}(e,i.entity),n.haptic&&Dt(n.haptic));break;case"call-service":if(!n.service)return;var r=n.service.split(".",2),a=r[0],l=r[1],c=At({},n.service_data);"entity"===c.entity_id&&(c.entity_id=i.entity),e.callService(a,l,c),n.haptic&&Dt(n.haptic);break;case"fire-dom-event":Lt(t,"ll-custom",n),n.haptic&&Dt(n.haptic)}};function Yt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}var Rt=!1;if("undefined"!=typeof window){var zt={get passive(){Rt=!0}};window.addEventListener("testPassive",null,zt),window.removeEventListener("testPassive",null,zt)}var Ft="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),It=[],Ut=!1,Bt=-1,Wt=void 0,qt=void 0,Jt=void 0,Xt=function(t){return It.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},Zt=function(t){var e=t||window.event;return!!Xt(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},Gt=function(t,e){if(t){if(!It.some((function(e){return e.targetElement===t}))){var i={targetElement:t,options:e||{}};It=[].concat(function(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}(It),[i]),Ft?window.requestAnimationFrame((function(){if(void 0===qt){qt={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,i=t.scrollX,s=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-i,setTimeout((function(){return window.requestAnimationFrame((function(){var t=s-window.innerHeight;t&&e>=s&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===Jt){var e=!!t&&!0===t.reserveScrollBarGap,i=window.innerWidth-document.documentElement.clientWidth;if(e&&i>0){var s=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);Jt=document.body.style.paddingRight,document.body.style.paddingRight=s+i+"px"}}void 0===Wt&&(Wt=document.body.style.overflow,document.body.style.overflow="hidden")}(e),Ft&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(Bt=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var i=t.targetTouches[0].clientY-Bt;!Xt(t.target)&&(e&&0===e.scrollTop&&i>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&i<0?Zt(t):t.stopPropagation())}(e,t)},Ut||(document.addEventListener("touchmove",Zt,Rt?{passive:!1}:void 0),Ut=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},Kt=function(t){t?(It=It.filter((function(e){return e.targetElement!==t})),Ft&&(t.ontouchstart=null,t.ontouchmove=null,Ut&&0===It.length&&(document.removeEventListener("touchmove",Zt,Rt?{passive:!1}:void 0),Ut=!1)),Ft?function(){if(void 0!==qt){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=qt.position,document.body.style.top=qt.top,document.body.style.left=qt.left,window.scrollTo(e,t),qt=void 0}}():(void 0!==Jt&&(document.body.style.paddingRight=Jt,Jt=void 0),void 0!==Wt&&(document.body.style.overflow=Wt,Wt=void 0))):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};console.info(`%c  ---- MY-SLIDER ---- \n%c  ${n("common.version")} 3.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider",name:"Slider Card",description:"Custom Slider Card for Lovelace."});let Qt=class extends dt{static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){const e=["input_number","number","light","media_player","cover","fan","switch","lock"];if(!t.entity)throw new Error("You need to define entity");if(!e.includes(t.entity.split(".")[0]))throw new Error("Entity has to be one of the following: "+e.map(t=>" "+t));this.config=Object.assign({name:"MySlider",disabled_scroll:!1},t)}shouldUpdate(t){return!!this.config&&Yt(this,t,!1)}render(){var t,e=JSON.parse(JSON.stringify(this.config));const i=this.config.entity?this.config.entity:"ERROR: NO ENTITY ID",s=(null===(t=this.config.entity)||void 0===t||t.split(".")[1],this.hass.states[""+i]);var o=e.step?e.step:"1",n=e.minBar?e.minBar:0,r=e.maxBar?e.maxBar:100,a=e.minSet?e.minSet:0,l=e.maxSet?e.maxSet:100;(i.includes("input_number.")||i.includes("number."))&&(o=e.step?e.step:s.attributes.step,a=e.minSet?e.minSet:s.attributes.min,l=e.maxSet?e.maxSet:s.attributes.max);var c=e.width?e.width:"100%",h=e.height?e.height:"50px",d=e.radius?e.radius:"4px",u=e.top?e.top:"0px",p=e.bottom?e.bottom:"0px",m=e.right?e.right:"0px",g=e.left?e.left:"0px",f=e.rotate?e.rotate:"0",v=e.containerHeight?e.containerHeight:h;"0"!=f&&(f+="deg");var y=e.mainSliderColor?e.mainSliderColor:"var(--accent-color)",_=e.secondarySliderColor?e.secondarySliderColor:"#4d4d4d",b=e.mainSliderColorOff?e.mainSliderColorOff:"#636363",w=e.secondarySliderColorOff?e.secondarySliderColorOff:"#4d4d4d",S=e.border?e.border:"0",x=e.thumbWidth?e.thumbWidth:"25px",C=e.thumbHeight?e.thumbHeight:"80px",$=e.thumbColor?e.thumbColor:"#FFFFFF",T=e.thumbColorOff?e.thumbColorOff:"#969696",k=e.thumbHorizontalPadding?e.thumbHorizontalPadding:"10px",M=e.thumbVerticalPadding?e.thumbVerticalPadding:"20px",E=e.thumpTop?e.thumpTop:"calc((var(--slider-width) - var(--thumb-height)) / 2)",P=e.thumbBorderRight?e.thumbBorderRight:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",O=e.thumbBorderLeft?e.thumbBorderLeft:"var(--thumb-horizontal-padding) solid var(--slider-main-color)",N=e.thumbBorderTop?e.thumbBorderTop:"var(--thumb-vertical-padding) solid var(--slider-main-color)",V=e.thumbBorderBotton?e.thumbBorderBotton:"var(--thumb-vertical-padding) solid var(--slider-main-color)",A=!!e.lockTrack&&e.lockTrack,j=`\n\t\t\t--slider-width: ${c};\n\t\t\t--slider-width-inverse: -${c};\n\t\t\t--slider-height: ${h};\n\t\t\t--slider-main-color: ${"off"===s.state||"locked"===s.state||null==s.state?"var(--slider-main-color-off)":"var(--slider-main-color-on)"};\n\t\t\t--slider-main-color-on: ${y};\n\t\t\t--slider-main-color-off: ${b};\n\t\t\t--slider-secondary-color: ${"off"===s.state||"locked"===s.state||null==s.state?"var(--slider-secondary-color-off)":"var(--slider-secondary-color-on)"};\n\t\t\t--slider-secondary-color-on: ${_};\n\t\t\t--slider-secondary-color-off: ${w};\n\t\t\t--slider-radius: ${d};\n\t\t\t--border: ${S};\n\n\t\t\t--thumb-width: ${x};\n\t\t\t--thumb-height: ${C};\n\t\t\t--thumb-color: ${"off"===s.state||null==s.state?"var(--thumb-color-off)":"var(--thumb-color-on)"};\n\t\t\t--thumb-color-on: ${$};\n\t\t\t--thumb-color-off: ${T};\n\t\t\t--thumb-horizontal-padding: ${k};\n\t\t\t--thumb-vertical-padding: ${M};\n\n\t\t\t--rotate: ${f};\n\t\t\t--top: ${u};\n\t\t\t--bottom: ${p};\n\t\t\t--right: ${m};\n\t\t\t--left: ${g};\n\t\t\t--container-height: ${v};\n\t\t\t--thumb-top: ${E};\n\t\t\t--thumb-border-right: ${P};\n\t\t\t--thumb-border-left: ${O};\n\t\t\t--thumb-border-top: ${N};\n\t\t\t--thumb-border-bottom: ${V};\n\t\t\t\n\t\t\t--lock-track-container: ${A?"none":"auto"};\n\t\t`;const L=t=>{i.includes("light.")?"Warmth"==e.function?this._setWarmth(s,t.target,a,l):this._setBrightness(s,t.target,a,l):i.includes("input_number.")||i.includes("number.")?this._setInputNumber(s,t.target,a,l):i.includes("media_player.")?this._setMediaVolume(s,t.target,a,l):i.includes("cover.")?this._setCover(s,t.target,a,l):i.includes("fan.")?this._setFan(s,t.target,a,l):i.includes("switch.")?this._setSwitch(s,t.target,a,l,n,r):i.includes("lock.")&&this._setLock(s,t.target,a,l,n,r)},D=t=>{e.intermediate&&L(t)},H=t=>{e.intermediate||L(t)},Y=()=>{this.config.disabled_scroll=!this.config.disabled_scroll,this.config.disabled_scroll?Gt(window):Kt(window)};if(i.includes("light."))return"Warmth"==e.function?U`
					<ha-card>
						<div class="slider-container" style="${j}">
							<input name="foo" type="range" class="${s.state}" style="${j}"
								min="${s.attributes.min_mireds}" max="${s.attributes.max_mireds}"
								step="${o}" .value="${"off"===s.state?0:s.attributes.color_temp}"
								@input=${D} @change=${H}
								@touchstart=${e.toggle_scroll?Y:null}
								@touchend=${e.toggle_scroll?Y:null} >
						</div>
					</ha-card>
				`:U`
					<ha-card>
						<div class="slider-container" style="${j}">
							<input name="foo" type="range" class="${s.state}" style="${j}"
								step="${o}" .value="${"off"===s.state?0:Math.round(s.attributes.brightness/2.56)}"
								@input=${D} @change=${H}
								@touchstart=${e.toggle_scroll?Y:null}
								@touchend=${e.toggle_scroll?Y:null} >
						</div>
					</ha-card>
				`;if(i.includes("input_number.")||i.includes("number."))return U`
				<ha-card>
					<div class="slider-container" style="${j}">
						<input name="foo" type="range" class="${s.state}" style="${j}"
							min="${a}" max="${l}"
							step="${o}" .value="${s.state}"
							@input=${D} @change=${H}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`;if(i.includes("media_player.")){var R=0;if(null!=s.attributes.volume_level)R=Number(100*s.attributes.volume_level);return U`
				<ha-card>
					<div class="slider-container" style="${j}">
						<input name="foo" type="range" class="${s.state}" style="${j}"
							min="${n}" max="${r}" step="${o}" .value="${R}"
							@input=${D} @change=${H}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`}return i.includes("cover.")?U`
				<ha-card>
					<div class="slider-container" style="${j}">
						<input name="foo" type="range" class="${s.state}" style="${j}"
							min="${n}" max="${r}" step="${o}"
							.value="${s.attributes.current_position}"
							@input=${D} @change=${H}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:i.includes("fan.")?U`
				<ha-card>
					<div class="slider-container" style="${j}">
						<input name="foo" type="range" class="${s.state}" style="${j}"
							min="${n}" max="${r}" step="${o}"
							.value="${s.attributes.percentage}"
							@input=${D} @change=${H}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:i.includes("switch.")||i.includes("lock.")?U`
				<ha-card>
					<div class="slider-container" style="${j}">
						<input name="foo" type="range" class="${s.state}" style="${j}"
							min="${n}" max="${r}" step="${o}" .value="${n}"
							@input=${D} @change=${H}
							@touchstart=${e.toggle_scroll?Y:null}
							@touchend=${e.toggle_scroll?Y:null} >
					</div>
				</ha-card>
			`:void 0}_setBrightness(t,e,i,s){var o=e.value;o>s?o=s:o<i&&(o=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,brightness:2.56*o}),e.value=o}_setWarmth(t,e,i,s){var o=e.value;o>s?o=s:o<i&&(o=i),this.hass.callService("homeassistant","turn_on",{entity_id:t.entity_id,color_temp:o}),e.value=o}_setInputNumber(t,e,i,s){var o=e.value;o>s?o=s:o<i&&(o=i),t.entity_id.includes("input_number.")?this.hass.callService("input_number","set_value",{entity_id:t.entity_id,value:o}):t.entity_id.includes("number.")&&this.hass.callService("number","set_value",{entity_id:t.entity_id,value:o}),e.value=o}_setFan(t,e,i,s){var o=e.value;o>s?o=s:o<i&&(o=i),this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:o}),e.value=o}_setCover(t,e,i,s){var o=e.value;o>s?o=s:o<i&&(o=i),this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:o}),e.value=o}_setMediaVolume(t,e,i,s){var o=e.value;o>s?o=s:o<i&&(o=i),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:o/100}),e.value=o}_setSwitch(t,e,i,s,o,n){var r=e.value,a=Math.min(s,n);Number(a)<=r&&this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),e.value=Number(Math.max(i,o))}_setLock(t,e,i,s,o,n){var r=e.value,a=Math.min(s,n);if(Number(a)<=r){var l="locked"===t.state?"unlock":"lock";this.hass.callService("lock",l,{entity_id:t.entity_id})}e.value=Number(Math.max(i,o))}static get styles(){return ct`
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
		`}};r([st({attribute:!1})],Qt.prototype,"hass",void 0),r([ot()],Qt.prototype,"config",void 0),Qt=r([et("my-slider")],Qt);
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
const te=new WeakMap,ee=w(t=>e=>{if(!(e instanceof N)||e instanceof L||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:s}=i.element;let o=te.get(e);void 0===o&&(s.cssText=i.strings.join(" "),te.set(e,o=new Set)),o.forEach(e=>{e in t||(o.delete(e),-1===e.indexOf("-")?s[e]=null:s.removeProperty(e))});for(const e in t)o.add(e),-1===e.indexOf("-")?s[e]=t[e]:s.setProperty(e,t[e])}),ie=(t,e={})=>{const i=se[t];return i?i(e):void console.log(t+": Not found in styles")},se={card:t=>Object.assign({height:"30px"},t),container:t=>Object.assign({width:"100%",height:"100%",position:"relative",overflow:"hidden","border-radius":"5px"},t),track:t=>Object.assign({width:"100%",height:"100%",position:"relative",background:"var(--card-background-color)"},t),progress:t=>Object.assign({height:"100%",background:"var(--paper-item-icon-active-color)",position:"absolute",width:"0.00%"},t),thumb:t=>Object.assign({height:"100%",background:"black",position:"absolute",right:"-5px",width:"10px"},t)},oe=function(t,e,i){var s,o;for(var n in e=void 0===e?[]:e,i=void 0===i?{}:i,t)t.hasOwnProperty(n)&&(s=n,o=t[n],e.push(s),"object"==typeof o&&null!==o?i=oe(o,e,i):i[e[e.length-1]]=o,e.pop());return i},ne=(t,e=100,i=0)=>t/(e-i)*100,re=t=>Math.round(100*(t+Number.EPSILON))/100;function ae(t,e){const i=Object.assign({},t);return le(t)&&le(e)&&Object.keys(e).forEach(s=>{Array.isArray(e[s])?i[s]=e[s].map((e,i)=>t[s]&&le(t[s][i])&&le(e)?ae(t[s][i],e):e):le(e[s])?s in t?i[s]=ae(t[s],e[s]):Object.assign(i,{[s]:e[s]}):Object.assign(i,{[s]:e[s]})}),i}function le(t){return t&&"object"==typeof t&&!Array.isArray(t)}console.info(`%c  ---- MY-SLIDER-V2 ---- \n%c  ${n("common.version")} 3.0.5    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-slider-v2",name:"Slider Card V2",description:"Custom Slider Card V2 for Lovelace."});let ce=class extends dt{constructor(){super(...arguments),this.colorMode="brightness",this.coverMode="position",this.sliderId="",this.touchInput=!1,this.disableScroll=!0,this.allowTapping=!0,this.allowSliding=!1,this.slideDistance=10,this.marginOfError=10,this.thumbTapped=!1,this.isSliding=!1,this.clientXLast=0,this.clientYLast=0,this.actionTaken=!1,this.vertical=!1,this.flipped=!1,this.inverse=!1,this.showMin=!1,this.zero=0,this.savedMin=1,this.min=0,this.max=100,this.minThreshold=0,this.maxThreshold=100,this.step=1,this.oldVal=0,this.sliderVal=0,this.sliderValPercent=0}setSliderValues(t,e){this.inverse?(this.sliderVal=this.max-t,this.sliderValPercent=100-e):(this.sliderVal=t,this.sliderValPercent=e)}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){const e=["light","input_number","number","media_player","cover","fan","switch","lock"];if(!t.entity)throw new Error("You need to define entity");if(!e.includes(t.entity.split(".")[0]))throw new Error("Entity has to be one of the following: "+e.map(t=>" "+t));this.config=Object.assign({name:"MySliderV2"},t)}shouldUpdate(t){return!!this.config&&Yt(this,t,!1)}render(){var t,e,i,s,o,n,r,a,l,c;const h=this.initializeConfig();if(null!==h)return h;const d=oe(null===(t=this._config.styles)||void 0===t?void 0:t.card)?oe(null===(e=this._config.styles)||void 0===e?void 0:e.card):{},u=oe(null===(i=this._config.styles)||void 0===i?void 0:i.container)?oe(null===(s=this._config.styles)||void 0===s?void 0:s.container):{},p=oe(null===(o=this._config.styles)||void 0===o?void 0:o.track)?oe(null===(n=this._config.styles)||void 0===n?void 0:n.track):{},m=oe(null===(r=this._config.styles)||void 0===r?void 0:r.progress)?oe(null===(a=this._config.styles)||void 0===a?void 0:a.progress):{},g=oe(null===(l=this._config.styles)||void 0===l?void 0:l.thumb)?oe(null===(c=this._config.styles)||void 0===c?void 0:c.thumb):{},f=ie("card",d),v=ie("container",u),y=ie("track",p),_=ie("progress",m),b=ie("thumb",g);this.vertical?(_.height=this.sliderValPercent.toString()+"%",f.height=d.height?d.height:"100%",f.width=d.width?d.width:"30px",_.width=m.width?m.width:"100%",_.right=m.right?m.right:"auto",b.right=g.right?g:"auto",b.width=g.width?g.width:"100%",b.height=g.height?g.height:"10px",this.flipped?(_.top=m.top?m.top:"0",b.bottom=g.bottom?g.bottom:"-5px"):(_.bottom=m.bottom?m.bottom:"0",b.top=g.top?g.top:"-5px")):(_.width=this.sliderValPercent.toString()+"%",this.flipped&&(_.right=m.right?m.right:"0",b.right=g.right?g.right:"auto",b.left=g.left?g.left:"-5px"));const w=t=>{const e=t.composedPath().find(t=>t.classList.contains("my-slider-custom-container"));this.sliderEl=e||t.target},S=t=>{switch(t.type){case"mousedown":if(this.touchInput)return;x(t);break;case"touchstart":this.touchInput=!0,x(t);break;case"mousemove":if(this.touchInput)return;$(t);break;case"touchmove":this.disableScroll&&t.preventDefault(),$(t);break;case"mouseup":case"touchend":case"touchcancel":C(t)}},x=t=>{var e;if(this.actionTaken)return;w(t);const i=t.clientX||t.touches[0].clientX,s=t.clientY||t.touches[0].clientY;if(0===this.clientXLast&&(this.clientXLast=i),0===this.clientYLast&&(this.clientYLast=s),this.allowTapping)return this.actionTaken=!0,void this.calcProgress(t);{const o=t.composedPath()[0],n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".my-slider-custom-thumb");if(o.classList.contains("my-slider-custom-thumb"))return this.thumbTapped=!0,this.actionTaken=!0,void this.calcProgress(t);if(n){const e=n.getBoundingClientRect();if(i>=e.left-this.marginOfError&&i<=e.right+this.marginOfError&&s>=e.top-this.marginOfError&&s<=e.bottom+this.marginOfError)return this.thumbTapped=!0,this.actionTaken=!0,void this.calcProgress(t)}}this.allowSliding&&(this.actionTaken=!0),this.clientYLast=s,this.clientXLast=i},C=t=>{this.actionTaken&&((this.allowTapping||this.thumbTapped||this.isSliding)&&this.calcProgress(t),this.thumbTapped=!1,this.actionTaken=!1,this.touchInput=!1,this.isSliding=!1)},$=t=>{if(this.actionTaken){const e=t.clientX||t.touches[0].clientX,i=t.clientY||t.touches[0].clientY;this.allowTapping||this.isSliding||!this.allowTapping&&this.thumbTapped?(this.calcProgress(t),this.clientXLast=e,this.clientYLast=i):this.allowSliding&&(this.vertical?Math.abs(i-this.clientYLast)>=this.slideDistance&&(this.isSliding=!0,this.clientXLast=e,this.clientYLast=i):Math.abs(e-this.clientXLast)>=this.slideDistance&&(this.isSliding=!0,this.clientXLast=e,this.clientYLast=i))}};return this.createAndCleanupEventListeners(S),U`
            <ha-card class="my-slider-custom-card" style="${ee(f)}">
                <div class="my-slider-custom-container" id="${this.sliderId}" style="${ee(v)}" data-value="${this.sliderVal}" data-progress-percent="${this.sliderValPercent}"
                    @mousedown="${S}"
                    @mouseup="${S}"
                    @mousemove="${S}"
                    @touchstart="${S}"
                    @touchend="${S}"
                    @touchcancel="${S}" 
                    @touchmove="${S}"
                >
                    <div class="my-slider-custom-track" style="${ee(y)}">
                        <div class="my-slider-custom-progress" style="${ee(_)}">
                            <div class="my-slider-custom-thumb" style="${ee(b)}"></div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `}initializeConfig(){this.entity=this.hass.states[""+this.config.entity];try{this._config=this._objectEvalTemplate(this.entity,this.config)}catch(t){if(t instanceof Error){t.stack?console.error(t.stack):console.error(t);const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t.toString(),origConfig:this.config}),e}console.log("Unexpected error evaluating config on init:",t)}this.sliderId="slider-"+this._config.entity.replace(".","-"),this.colorMode=void 0!==this._config.colorMode?this._config.colorMode:"brightness",this.coverMode=void 0!==this._config.coverMode?this._config.coverMode:"position",this.vertical=void 0!==this._config.vertical&&this._config.vertical,this.flipped=void 0!==this._config.flipped&&this._config.flipped,this.inverse=void 0!==this._config.inverse&&this._config.inverse,this.disableScroll=void 0===this._config.disableScroll||this._config.disableScroll,this.allowTapping=void 0===this._config.allowTapping||this._config.allowTapping,this.allowSliding=void 0!==this._config.allowSliding&&this._config.allowSliding,this.marginOfError=void 0!==this._config.marginOfError?this._config.marginOfError:10,this.slideDistance=void 0!==this._config.slideDistance?this._config.slideDistance:10,this.showMin=void 0!==this._config.showMin&&this._config.showMin,this.min=this._config.min?this._config.min:0,this.max=this._config.max?this._config.max:100,this.minThreshold=this._config.minThreshold?this._config.minThreshold:0,this.maxThreshold=this._config.maxThreshold?this._config.maxThreshold:100,this.step=this._config.step?this._config.step:1;let t=0;switch(this._config.entity.split(".")[0]){case"light":if("brightness"===this.colorMode)this.oldVal=Math.ceil(ne(this.entity.attributes.brightness,256)),"on"===this.entity.state?(t=Math.round(this.entity.attributes.brightness/2.56),this.showMin||(t-=this.min)):t=0;else if("temperature"===this.colorMode){if("on"!==this.entity.state)break;this.min=this._config.min?this._config.min:this.entity.attributes.min_mireds,this.max=this._config.max?this._config.max:this.entity.attributes.max_mireds,t=parseFloat(this.entity.attributes.color_temp),this.oldVal=parseFloat(this.entity.attributes.color_temp),this.showMin||(this.max=this.max-this.min,t-=this.min)}else if("hue"===this.colorMode&&"hs"===this.entity.attributes.color_mode){if("on"!==this.entity.state)break;this.min=this._config.min?this._config.min:0,this.max=this._config.max?this._config.max:360,this.oldVal=parseFloat(this.entity.attributes.hs_color[0]),t=parseFloat(this.entity.attributes.hs_color[0]),this.showMin||(this.max=this.max-this.min,t-=this.min)}else if("saturation"===this.colorMode&&"hs"===this.entity.attributes.color_mode){if("on"!==this.entity.state)break;this.min=this._config.min?this._config.min:0,this.max=this._config.max?this._config.max:100,this.oldVal=parseFloat(this.entity.attributes.hs_color[1]),t=parseFloat(this.entity.attributes.hs_color[1]),this.showMin||(this.max=this.max-this.min,t-=this.min)}this.setSliderValues(t,re(ne(t,this.max)));break;case"input_number":case"number":this.step=this._config.step?this._config.step:this.entity.attributes.step,this.min=this._config.min?this._config.min:this.entity.attributes.min,this.max=this._config.max?this._config.max:this.entity.attributes.max,this.oldVal=parseFloat(this.entity.state),t=parseFloat(this.entity.state),this.showMin||(this.max=this.max-this.min,t-=this.min),this.setSliderValues(t,re(ne(t,this.max)));break;case"media_player":t=0,null!=this.entity.attributes.volume_level&&(t=Number(100*this.entity.attributes.volume_level)),this.oldVal=t,this.showMin||(this.max=this.max-this.min,t-=this.min),this.setSliderValues(t,re(ne(t,this.max)));break;case"cover":t=0,"position"===this.coverMode?null!=this.entity.attributes.current_position&&(t=Number(this.entity.attributes.current_position)):"tilt"===this.coverMode&&null!=this.entity.attributes.current_tilt_position&&(t=Number(this.entity.attributes.current_tilt_position)),this.oldVal=t,this.showMin||(this.max=this.max-this.min,t-=this.min),this.inverse=void 0===this._config.inverse||this._config.inverse,this.vertical=void 0===this._config.vertical||this._config.vertical,this.flipped=void 0===this._config.flipped||this._config.flipped,this.setSliderValues(t,re(ne(t,this.max)));break;case"fan":t=0,null!=this.entity.attributes.percentage&&(t=Number(this.entity.attributes.percentage)),this.oldVal=t,this.showMin||(this.max=this.max-this.min,t-=this.min),this.setSliderValues(t,re(ne(t,this.max)));break;case"switch":this.minThreshold=this._config.minThreshold?this._config.minThreshold:15,this.maxThreshold=this._config.maxThreshold?this._config.maxThreshold:75,t=Number(Math.max(this.zero,this.minThreshold)),this.setSliderValues(t,t);break;case"lock":this.minThreshold=this._config.minThreshold?this._config.minThreshold:15,this.maxThreshold=this._config.maxThreshold?this._config.maxThreshold:75,t=Number(Math.max(this.zero,this.minThreshold)),this.oldVal=t,this.setSliderValues(t,t);break;default:console.log("No Entity type initiated... ("+this._config.entity.split(".")[0]+")")}return null}calcProgress(t){if(null==this.sliderEl||null===this.sliderEl)return;const e=((t,e)=>{let i={x:0,y:0};if("touchstart"==t.type||"touchmove"==t.type||"touchend"==t.type||"touchcancel"==t.type){let e=void 0===t.originalEvent?t:t.originalEvent,s=e.touches[0]||e.changedTouches[0];i.x=s.clientX,i.y=s.clientY}else"mousedown"!=t.type&&"mouseup"!=t.type&&"mousemove"!=t.type&&"mouseover"!=t.type&&"mouseout"!=t.type&&"mouseenter"!=t.type&&"mouseleave"!=t.type||(i.x=t.clientX,i.y=t.clientY);let s=e.getBoundingClientRect(),o=i.x-s.left,n=i.y-s.top;return n=e.offsetHeight-n,{x:o,y:n}})(t,this.sliderEl),i=this.sliderEl.offsetWidth,s=this.sliderEl.offsetHeight,o=(this.vertical?re(e.y/s*100):re(e.x/i*100))/100*(this.max-0),n=this.max-o;let r=this.flipped?Math.round(n):Math.round(o);r=r<this.min&&this.showMin?this.min:r>this.max?this.max:r<this.zero?this.zero:r,this.setProgress(this.sliderEl,Math.round(r),t.type)}setProgress(t,e,i){const s=t.querySelector(".my-slider-custom-progress");e=Math.round(e/this.step)*this.step;const o=re(ne(e,this.max));this.vertical?s.style.height=o.toString()+"%":s.style.width=o.toString()+"%",this.sliderVal!==e&&((!this._config.intermediate||"mousemove"!==i&&"mousedown"!==i&&"touchmove"!==i&&"touchstart"!==i)&&(this._config.intermediate||"mouseup"!==i&&"touchend"!==i&&"touchcancel"!==i)||this.setValue(e,o))}setValue(t,e){if(this.entity&&(this.setSliderValues(t,e),this.showMin||(t+=this.min),this.inverse&&(t=this.max-t,e=100-e),this.actionTaken))switch(this._config.entity.split(".")[0]){case"light":"brightness"===this.colorMode?this._setBrightness(this.entity,t):"temperature"===this.colorMode?this._setColorTemp(this.entity,t):"hue"===this.colorMode?this._setHue(this.entity,t):"saturation"===this.colorMode&&this._setSaturation(this.entity,t);break;case"input_number":case"number":this._setInputNumber(this.entity,t);break;case"media_player":this._setMediaVolume(this.entity,t);break;case"cover":"position"===this.coverMode?this._setCover(this.entity,t):"tilt"===this.coverMode&&this._setCoverTilt(this.entity,t);break;case"fan":this._setFan(this.entity,t);break;case"lock":this._setLock(this.entity,t);break;case"switch":this._setSwitch(this.entity,t);break;default:console.log("Default")}}_setBrightness(t,e){this.hass.callService("light","turn_on",{entity_id:t.entity_id,brightness:2.56*e}),this.oldVal=e}_setColorTemp(t,e){parseFloat(t.attributes.color_temp);this.hass.callService("light","turn_on",{entity_id:t.entity_id,color_temp:e}),this.oldVal=e}_setHue(t,e){let i=0,s=0;t.attributes.hs_color&&(i=parseFloat(t.attributes.hs_color[0]),s=parseFloat(t.attributes.hs_color[1])),this.hass.callService("light","turn_on",{entity_id:t.entity_id,hs_color:[e,s]}),this.oldVal=e}_setSaturation(t,e){let i=0,s=0;t.attributes.hs_color&&(i=parseFloat(t.attributes.hs_color[1]),s=parseFloat(t.attributes.hs_color[0])),this.hass.callService("light","turn_on",{entity_id:t.entity_id,hs_color:[s,e]}),this.oldVal=e}_setInputNumber(t,e){let i=parseFloat(t.state);this.showMin||(i-=this.min),this.hass.callService(t.entity_id.split(".")[0],"set_value",{entity_id:t.entity_id,value:e}),this.oldVal=e}_setMediaVolume(t,e){let i=Number(100*this.entity.attributes.volume_level);this.showMin||(i-=this.min),this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100}),this.oldVal=e}_setCover(t,e){this.hass.callService("cover","set_cover_position",{entity_id:t.entity_id,position:e}),this.oldVal=e}_setCoverTilt(t,e){this.hass.callService("cover","set_cover_tilt_position",{entity_id:t.entity_id,tilt_position:e}),this.oldVal=e}_setFan(t,e){this.hass.callService("fan","set_percentage",{entity_id:t.entity_id,percentage:e}),this.oldVal=e}_setSwitch(t,e){var i=Math.min(this.max,this.maxThreshold);Number(i)<=e&&(this.hass.callService("homeassistant","toggle",{entity_id:t.entity_id}),this.oldVal=e);const s=Number(Math.max(this.zero,this.minThreshold)),o=re(ne(s,this.max));this.setSliderValues(s,o);const n=this.sliderEl.querySelector(".my-slider-custom-progress"),r=n.style.transition;n.style.transition=this.vertical?"height 0.2s ease 0s":"width 0.2s ease 0s",n.style.width=o.toString()+"%",setTimeout(()=>{n.style.transition=r},200)}_setLock(t,e){var i=Math.min(this.max,this.maxThreshold);if(Number(i)<=e){var s="locked"===t.state?"unlock":"lock";this.hass.callService("lock",s,{entity_id:t.entity_id})}const o=Number(Math.max(this.zero,this.minThreshold)),n=re(ne(o,this.max));this.setSliderValues(o,n);const r=this.sliderEl.querySelector(".my-slider-custom-progress");r.style.transition="width 0.2s ease 0s",r.style.width=n.toString()+"%",setTimeout(()=>{r.style.transition="initial"},200)}createAndCleanupEventListeners(t){document.removeEventListener("mouseup",t),document.removeEventListener("touchend",t),document.removeEventListener("touchcancel",t),document.addEventListener("mouseup",t),document.addEventListener("touchend",t),document.addEventListener("touchcancel",t),document.addEventListener("mousemove",t)}_objectEvalTemplate(t,e){const i=JSON.parse(JSON.stringify(e));return this._getTemplateOrValue(t,i)}_getTemplateOrValue(t,e){if(["number","boolean"].includes(typeof e))return e;if(!e)return e;if("object"==typeof e)return Object.keys(e).forEach(i=>{e[i]=this._getTemplateOrValue(t,e[i])}),e;const i=e.trim();if("[[["===i.substring(0,3)&&"]]]"===i.slice(-3)){return this._evalTemplate(t,i.slice(3,-3))}return e}_evalTemplate(t,e){try{return new Function("states","entity","user","hass","html","'use strict'; "+e).call(this,this.hass.states,t,this.hass.user,this.hass,U)}catch(t){if(t instanceof Error){const i=e.length<=100?e.trim():e.trim().substring(0,98)+"...";throw t.message=`${t.name}: ${t.message} in '${i}'`,t.name="MyCardJSTemplateError",t}console.log("Unexpected error (_evalTemplate)",t)}}static get styles(){return ct`
		`}};r([st()],ce.prototype,"_config",void 0),r([st({attribute:!1})],ce.prototype,"hass",void 0),r([nt()],ce.prototype,"config",void 0),ce=r([et("my-slider-v2")],ce);const he="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class de extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:he?"100px":"50px",height:he?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},s=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?Lt(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,Lt(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Lt(t,"action",{action:"double_tap"})):Lt(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",s),t.addEventListener("touchcancel",s),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",s),t.addEventListener("keyup",t=>{13===t.keyCode&&s(t)})}startAnimation(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-my-footer",de);const ue=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-my-footer"))return t.querySelector("action-handler-my-footer");const e=document.createElement("action-handler-my-footer");return t.appendChild(e),e})();i&&i.bind(t,e)},pe=w((t={})=>e=>{ue(e.committer.element,t)}),me=(t,e={})=>{const i=ge[t];return i?i(e):void console.log(t+": Not found in styles")},ge={card:t=>Object.assign({height:"125px",width:"100%","min-width":"fit-content",background:"var(--card-background-color)",overflow:"hidden",cursor:"pointer"},t),icon:t=>Object.assign({"--mdc-icon-size":"100%",height:"35px",width:"35px",display:"inline-block",padding:"10px 0 0 10px",color:"var(--paper-item-icon-color)"},t),stats:t=>Object.assign({"margin-left":"auto","margin-right":"5px","margin-top":"5px","margin-bottom":"5px",color:"var(--primary-text-color)",display:"grid","place-items":"center","aspect-ratio":"1 / 1","font-family":'"Arial", sans-serif',"font-size":"11px","text-align":"center","text-shadow":"2px 2px 4px rgba(0, 0, 0, 0.5)"},t),"label-wrapper":t=>Object.assign({width:"100%",height:"100%",display:"flex"},t),label:t=>Object.assign({padding:"0",margin:"0 10px",color:"var(--primary-text-color)","font-weight":"bold",cursor:"pointer"},t),container:t=>Object.assign({padding:"0",margin:"0",display:"flex","flex-flow":"column",height:"100%"},t),row1:t=>Object.assign({flex:"0 1 auto",display:"flex","justify-content":"space-between"},t),row2:t=>Object.assign({flex:"1 1 auto"},t),row3:t=>Object.assign({flex:"0 1 auto"},t),"container-column":t=>Object.assign({padding:"0",margin:"0",display:"flex","flex-flow":"row",height:"100%"},t),column1:t=>Object.assign({flex:"1"},t),column2:t=>Object.assign({flex:"0"},t)};console.info(`%c  ---- MY-BUTTON ---- \n%c  ${n("common.version")} 1.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green"),window.customCards=window.customCards||[],window.customCards.push({type:"my-button",name:"My Button Card",description:"Custom Button Card for Lovelace."});let fe=class extends dt{constructor(){super(...arguments),this.lastAction=0,this.layout="vertical",this.iconConfig={},this.labelConfig={},this.sliderConfig={},this.statsConfig={},this.cardStl={},this.containerStl={},this.containerColumnStl={},this.iconStl={},this.statsStl={},this.labelWrapperStl={},this.labelStl={},this.row1Stl={},this.row2Stl={},this.row3Stl={},this.column1Stl={},this.column2Stl={}}static getStubConfig(){return{}}static get properties(){return{hass:{},config:{},active:{}}}setConfig(t){const e=["light","cover","switch"];if(!t.entity)throw new Error("You need to define entity");if(!e.includes(t.entity.split(".")[0]))throw new Error("Entity has to be one of the following: "+e.map(t=>" "+t));this.config=Object.assign({name:"MyButton"},t)}shouldUpdate(t){return!!this.config&&Yt(this,t,!1)}render(){const t=this.initializeConfig();return null!==t?t:this.entity&&this._config?"vertical"===this.layout?this.verticalLayoutCard():this.horizontalLayoutCard():U``}verticalLayoutCard(){var t,e,i,s,o,n,r,a;return U`
            <ha-card style="${ee(this.cardStl)}">
                <div style="${ee(this.containerStl)}">
                    <div style="${ee(this.row1Stl)}"
                        @action=${t=>this._handleAction(t,this.config)}
                        .actionHandler=${pe({hasDoubleClick:"none"!==(null===(e=null===(t=this.config)||void 0===t?void 0:t.double_tap_action)||void 0===e?void 0:e.action),hasHold:"none"!==(null===(s=null===(i=this.config)||void 0===i?void 0:i.hold_action)||void 0===s?void 0:s.action)})}>
                        ${this.iconElement()}

                        ${this.statsElement()}
                    </div>
                    <div style="${ee(this.row2Stl)}"
                        @action=${t=>this._handleAction(t,this.config)}
                        .actionHandler=${pe({hasDoubleClick:"none"!==(null===(n=null===(o=this.config)||void 0===o?void 0:o.double_tap_action)||void 0===n?void 0:n.action),hasHold:"none"!==(null===(a=null===(r=this.config)||void 0===r?void 0:r.hold_action)||void 0===a?void 0:a.action)})}>
                        ${this.labelElement()}
                    </div>
                    <div style="${ee(this.row3Stl)}">
                        ${this.sliderElement()}
                    </div>
                </div>
            </ha-card>
        `}horizontalLayoutCard(){var t,e,i,s,o,n,r,a;return U`
            <ha-card style="${ee(this.cardStl)}">
                <div style="${ee(this.containerColumnStl)}">
                    <div style="${ee(this.column1Stl)}">
                        <div style="${ee(this.containerStl)}">
                            <div style="${ee(this.row1Stl)}"
                                @action=${t=>this._handleAction(t,this.config)}
                                .actionHandler=${pe({hasDoubleClick:"none"!==(null===(e=null===(t=this.config)||void 0===t?void 0:t.double_tap_action)||void 0===e?void 0:e.action),hasHold:"none"!==(null===(s=null===(i=this.config)||void 0===i?void 0:i.hold_action)||void 0===s?void 0:s.action)})}>
                                ${this.iconElement()}
                            </div>
                            <div style="${ee(this.row2Stl)}"
                                @action=${t=>this._handleAction(t,this.config)}
                                .actionHandler=${pe({hasDoubleClick:"none"!==(null===(n=null===(o=this.config)||void 0===o?void 0:o.double_tap_action)||void 0===n?void 0:n.action),hasHold:"none"!==(null===(a=null===(r=this.config)||void 0===r?void 0:r.hold_action)||void 0===a?void 0:a.action)})}>
                                ${this.labelElement()}
                            </div>
                            <div style="${ee(this.row3Stl)}">
                            </div>
                        </div>
                    </div>
                    <div style="${ee(this.column2Stl)}">
                        ${this.sliderElement()}
                    </div>
                </div>
            </ha-card>
        `}iconElement(){var t,e;return this.iconConfig.show?this.iconConfig.tap_action||this.iconConfig.double_tap_action||this.iconConfig.hold_action?U`
                <ha-icon icon="${this.iconConfig.icon}" style="${ee(this.iconStl)}"
                    @action=${t=>this._handleAction(t,this.iconConfig)}
                    .actionHandler=${pe({hasDoubleClick:"none"!==(null===(t=this.iconConfig.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=this.iconConfig.hold_action)||void 0===e?void 0:e.action)})} />
            `:U`
                <ha-icon icon="${this.iconConfig.icon}" style="${ee(this.iconStl)}" />
            `:U``}statsElement(){var t,e;return this.statsConfig.show?this.statsConfig.tap_action||this.statsConfig.double_tap_action||this.statsConfig.hold_action?U`
                <div style="${ee(this.statsStl)}"
                    @action=${t=>this._handleAction(t,this.statsConfig)}
                    .actionHandler=${pe({hasDoubleClick:"none"!==(null===(t=this.statsConfig.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=this.statsConfig.hold_action)||void 0===e?void 0:e.action)})}>

                ${this.statsConfig.text}

                </div>
            `:U`
                <div style="${ee(this.statsStl)}">
                ${this.statsConfig.text}
                </div>
            `:U``}labelElement(){var t,e;return this.labelConfig.show?this.labelConfig.tap_action||this.labelConfig.double_tap_action||this.labelConfig.hold_action?U`
                <div style="${ee(this.labelWrapperStl)}">
                        <label style="${ee(this.labelStl)}"
                            @action=${t=>this._handleAction(t,this.labelConfig)}
                            .actionHandler=${pe({hasDoubleClick:"none"!==(null===(t=this.labelConfig.double_tap_action)||void 0===t?void 0:t.action),hasHold:"none"!==(null===(e=this.labelConfig.hold_action)||void 0===e?void 0:e.action)})}
                        >${this.labelConfig.text}</label>
                </div>
            `:U`
                <div style="${ee(this.labelWrapperStl)}">
                    <label style="${ee(this.labelStl)}">${this.labelConfig.text}</label>
                </div>
            `:U``}sliderElement(){return this.sliderConfig.show?("horizontal"===this.layout&&(this.sliderConfig.vertical=void 0===this.sliderConfig.vertical||this.sliderConfig.vertical,this.sliderConfig.styles=this.sliderConfig.styles?this.sliderConfig.styles:{},this.sliderConfig.styles.card=this.sliderConfig.styles.card?this.sliderConfig.styles.card:{},this.sliderConfig.styles.card.width=this.sliderConfig.styles.card.width?this.sliderConfig.styles.card.width:"35px"),U`
            <my-slider-v2 .hass="${this.hass}" .config="${this.sliderConfig}"></my-slider-v2>
        `):U``}initializeConfig(){var t,e,i,s,o,n,r,a,l,c,h,d,u,p,m,g,f,v,y,_,b,w,S;this.entity=this.hass.states[""+this.config.entity],0===this.lastAction&&(this.lastAction=(new Date).getTime());try{this._config=this._objectEvalTemplate(this.entity,this.config)}catch(t){if(t instanceof Error){t.stack?console.error(t.stack):console.error(t);const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t.toString(),origConfig:this.config}),e}console.log("Unexpected error evaluating config on init:",t)}if(!this._config)return U`Error with this._config...`;const x=this._config.entity.split(".")[0],C={show:!0,icon:"mdi:lightbulb-outline"};"cover"===x?C.icon=(null===(t=this.entity.attributes)||void 0===t?void 0:t.current_position)>=50?"mdi:blinds-open":"mdi:blinds":"switch"===x&&(C.icon="on"===this.entity.state?"mdi:power-plug":"mdi:power-plug-off");const $={show:!0,text:this.entity.attributes.friendly_name};this.layout=this._config.layout?this._config.layout:"vertical","cover"===this._config.entity.split(".")[0]&&(this.layout=this._config.layout?this._config.layout:"horizontal"),this.iconConfig="string"==typeof this._config.icon?Object.assign(Object.assign({},C),{icon:this._config.icon}):"object"==typeof this._config.icon?ae(C,this._config.icon):C,this.labelConfig="string"==typeof this._config.label?Object.assign(Object.assign({},$),{text:this._config.label}):"object"==typeof this._config.label?ae($,this._config.label):$;const T={show:!!this.entity.attributes.brightness,text:this.entity.attributes.brightness&&Math.ceil(ne(this.entity.attributes.brightness,256))};this.statsConfig="string"==typeof this._config.stats?Object.assign(Object.assign({},T),{text:this._config.stats}):"object"==typeof this._config.stats?ae(T,this._config.stats):T;const k={show:!0,entity:this.entity.entity_id,styles:{card:[{"border-radius":"0px",background:"transparent","box-shadow":"none",cursor:"default"}],container:[{"border-radius":"0px"}],thumb:"vertical"===this.layout?[{height:"20px",width:"3px",top:"6px",right:"2px","border-radius":"50px"}]:[{width:"20px",height:"3px",bottom:"2px",left:"7px","border-radius":"50px"}],track:[{background:"transparent"}],progress:"vertical"===this.layout?[{background:"linear-gradient(to top, var(--paper-item-icon-active-color), transparent)"}]:[{background:"linear-gradient(to left, var(--paper-item-icon-active-color), transparent)"}]}};"switch"===x&&(k.show=!1),this.sliderConfig=this._config.slider?ae(k,this._config.slider):k;let M=[];if("light"===x)if(this.entity.attributes.brightness){let t=1+this.entity.attributes.brightness/256;M=[{background:`radial-gradient(circle at top left, rgba(230, 230, 230, 0.7), var(--card-background-color) ${Math.ceil(ne(this.entity.attributes.brightness,256))/t+"%"})`}]}else M=[{background:"radial-gradient(circle at top left, rgba(230, 230, 230, 0.5), var(--card-background-color) 40%)"}];else if("switch"===x){M=[{background:"on"===this.entity.state?"radial-gradient(circle at top left, rgba(230, 230, 230, 0.7), var(--card-background-color) 50%)":"radial-gradient(circle at top left, rgba(230, 230, 230, 0.5), var(--card-background-color) 40%)"}]}const E=(null===(e=this._config.styles)||void 0===e?void 0:e.card)?Object.assign(Object.assign({},M),this._config.styles.card):M,P=[{color:"on"===this.entity.state?"var(--paper-item-icon-active-color)":"var(--paper-item-icon-color)"},{filter:"on"===this.entity.state?"drop-shadow(2px 2px 2px rgba(0,0,0,0.6)":"drop-shadow(3px 3px 2px rgba(0,0,0,0.3)"}],O=(null===(i=this._config.styles)||void 0===i?void 0:i.icon)?Object.assign(Object.assign({},P),this._config.styles.icon):P;return this.cardStl=me("card",oe(E)?oe(E):{}),this.containerStl=me("container",oe(null===(s=this._config.styles)||void 0===s?void 0:s.container)?oe(null===(o=this._config.styles)||void 0===o?void 0:o.container):{}),this.containerColumnStl=me("container-column",oe(null===(n=this._config.styles)||void 0===n?void 0:n.containerColumn)?oe(null===(r=this._config.styles)||void 0===r?void 0:r.containerColumn):{}),this.iconStl=me("icon",oe(O)?oe(O):{}),this.statsStl=me("stats",oe(null===(a=this._config.styles)||void 0===a?void 0:a.stats)?oe(null===(l=this._config.styles)||void 0===l?void 0:l.stats):{}),this.labelWrapperStl=me("label-wrapper",oe(null===(c=this._config.styles)||void 0===c?void 0:c.labelWrapper)?oe(null===(h=this._config.styles)||void 0===h?void 0:h.labelWrapper):{}),this.labelStl=me("label",oe(null===(d=this._config.styles)||void 0===d?void 0:d.label)?oe(null===(u=this._config.styles)||void 0===u?void 0:u.label):{}),this.row1Stl=me("row1",oe(null===(p=this._config.styles)||void 0===p?void 0:p.row1)?oe(null===(m=this._config.styles)||void 0===m?void 0:m.row1):{}),this.row2Stl=me("row2",oe(null===(g=this._config.styles)||void 0===g?void 0:g.row2)?oe(null===(f=this._config.styles)||void 0===f?void 0:f.row2):{}),this.row3Stl=me("row3",oe(null===(v=this._config.styles)||void 0===v?void 0:v.row3)?oe(null===(y=this._config.styles)||void 0===y?void 0:y.row3):{}),this.column1Stl=me("column1",oe(null===(_=this._config.styles)||void 0===_?void 0:_.column1)?oe(null===(b=this._config.styles)||void 0===b?void 0:b.column1):{}),this.column2Stl=me("column2",oe(null===(w=this._config.styles)||void 0===w?void 0:w.column2)?oe(null===(S=this._config.styles)||void 0===S?void 0:S.column2):{}),null}_handleAction(t,e){var i;t.stopPropagation(),t.stopImmediatePropagation();if(!((new Date).getTime()-this.lastAction<100)&&(this.lastAction=(new Date).getTime(),e.entity||(e.entity=this._config.entity),null===(i=t.detail)||void 0===i?void 0:i.action))switch(t.detail.action){case"tap":e.tap_action&&this._handleTap(e);break;case"hold":e.hold_action&&this._handleHold(e);break;case"double_tap":e.double_tap_action&&this._handleDblTap(e)}}_handleTap(t){Ht(this,this.hass,this._evalActions(this._config,"tap_action"),!1,!1)}_handleHold(t){Ht(this,this.hass,this._evalActions(this._config,"hold_action"),!0,!1)}_handleDblTap(t){Ht(this,this.hass,this._evalActions(this._config,"double_tap_action"),!1,!0)}_evalActions(t,e){const i=JSON.parse(JSON.stringify(t)),s=t=>t?(Object.keys(t).forEach(e=>{"object"==typeof t[e]?t[e]=s(t[e]):t[e]=this._getTemplateOrValue(this.entity,t[e])}),t):t;return i[e]=s(i[e]),!i[e].confirmation&&i.confirmation&&(i[e].confirmation=s(i.confirmation)),i}_objectEvalTemplate(t,e){const i=JSON.parse(JSON.stringify(e));return this._getTemplateOrValue(t,i)}_getTemplateOrValue(t,e){if(["number","boolean"].includes(typeof e))return e;if(!e)return e;if("object"==typeof e)return Object.keys(e).forEach(i=>{e[i]=this._getTemplateOrValue(t,e[i])}),e;const i=e.trim();if("[[["===i.substring(0,3)&&"]]]"===i.slice(-3)){return this._evalTemplate(t,i.slice(3,-3))}return e}_evalTemplate(t,e){try{return new Function("states","entity","user","hass","html","'use strict'; "+e).call(this,this.hass.states,t,this.hass.user,this.hass,U)}catch(t){if(t instanceof Error){const i=e.length<=100?e.trim():e.trim().substring(0,98)+"...";throw t.message=`${t.name}: ${t.message} in '${i}'`,t.name="MyCardJSTemplateError",t}console.log("Unexpected error (_evalTemplate)",t)}}static get styles(){return ct``}};r([st()],fe.prototype,"_config",void 0),r([st({attribute:!1})],fe.prototype,"hass",void 0),r([nt()],fe.prototype,"config",void 0),fe=r([et("my-button")],fe),console.info(`%c  ---- MY-CARDS ---- \n%c  ${n("common.version")} 2.0.3    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: green");export{fe as MyButton,Qt as MySlider,ce as MySliderV2};

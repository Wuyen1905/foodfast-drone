var Nk=Object.defineProperty;var _k=(e,t,n)=>t in e?Nk(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var dg=(e,t,n)=>_k(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var zk=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Qp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var kv={exports:{}},Kc={},Sv={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fa=Symbol.for("react.element"),Bk=Symbol.for("react.portal"),Vk=Symbol.for("react.fragment"),Hk=Symbol.for("react.strict_mode"),Uk=Symbol.for("react.profiler"),Wk=Symbol.for("react.provider"),Kk=Symbol.for("react.context"),Yk=Symbol.for("react.forward_ref"),Gk=Symbol.for("react.suspense"),qk=Symbol.for("react.memo"),Qk=Symbol.for("react.lazy"),hg=Symbol.iterator;function Xk(e){return e===null||typeof e!="object"?null:(e=hg&&e[hg]||e["@@iterator"],typeof e=="function"?e:null)}var Cv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Tv=Object.assign,$v={};function _o(e,t,n){this.props=e,this.context=t,this.refs=$v,this.updater=n||Cv}_o.prototype.isReactComponent={};_o.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};_o.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ev(){}Ev.prototype=_o.prototype;function Xp(e,t,n){this.props=e,this.context=t,this.refs=$v,this.updater=n||Cv}var Zp=Xp.prototype=new Ev;Zp.constructor=Xp;Tv(Zp,_o.prototype);Zp.isPureReactComponent=!0;var pg=Array.isArray,Pv=Object.prototype.hasOwnProperty,Jp={current:null},Av={key:!0,ref:!0,__self:!0,__source:!0};function Dv(e,t,n){var r,i={},o=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(o=""+t.key),t)Pv.call(t,r)&&!Av.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:fa,type:e,key:o,ref:a,props:i,_owner:Jp.current}}function Zk(e,t){return{$$typeof:fa,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ef(e){return typeof e=="object"&&e!==null&&e.$$typeof===fa}function Jk(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var fg=/\/+/g;function Ou(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Jk(""+e.key):t.toString(36)}function Sl(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case fa:case Bk:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+Ou(a,0):r,pg(i)?(n="",e!=null&&(n=e.replace(fg,"$&/")+"/"),Sl(i,t,n,"",function(u){return u})):i!=null&&(ef(i)&&(i=Zk(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(fg,"$&/")+"/")+e)),t.push(i)),1;if(a=0,r=r===""?".":r+":",pg(e))for(var l=0;l<e.length;l++){o=e[l];var c=r+Ou(o,l);a+=Sl(o,t,n,c,i)}else if(c=Xk(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=r+Ou(o,l++),a+=Sl(o,t,n,c,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function Ia(e,t,n){if(e==null)return e;var r=[],i=0;return Sl(e,r,"","",function(o){return t.call(n,o,i++)}),r}function eS(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var at={current:null},Cl={transition:null},tS={ReactCurrentDispatcher:at,ReactCurrentBatchConfig:Cl,ReactCurrentOwner:Jp};function Rv(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:Ia,forEach:function(e,t,n){Ia(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ia(e,function(){t++}),t},toArray:function(e){return Ia(e,function(t){return t})||[]},only:function(e){if(!ef(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Q.Component=_o;Q.Fragment=Vk;Q.Profiler=Uk;Q.PureComponent=Xp;Q.StrictMode=Hk;Q.Suspense=Gk;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tS;Q.act=Rv;Q.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Tv({},e.props),i=e.key,o=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,a=Jp.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Pv.call(t,c)&&!Av.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:fa,type:e.type,key:i,ref:o,props:r,_owner:a}};Q.createContext=function(e){return e={$$typeof:Kk,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Wk,_context:e},e.Consumer=e};Q.createElement=Dv;Q.createFactory=function(e){var t=Dv.bind(null,e);return t.type=e,t};Q.createRef=function(){return{current:null}};Q.forwardRef=function(e){return{$$typeof:Yk,render:e}};Q.isValidElement=ef;Q.lazy=function(e){return{$$typeof:Qk,_payload:{_status:-1,_result:e},_init:eS}};Q.memo=function(e,t){return{$$typeof:qk,type:e,compare:t===void 0?null:t}};Q.startTransition=function(e){var t=Cl.transition;Cl.transition={};try{e()}finally{Cl.transition=t}};Q.unstable_act=Rv;Q.useCallback=function(e,t){return at.current.useCallback(e,t)};Q.useContext=function(e){return at.current.useContext(e)};Q.useDebugValue=function(){};Q.useDeferredValue=function(e){return at.current.useDeferredValue(e)};Q.useEffect=function(e,t){return at.current.useEffect(e,t)};Q.useId=function(){return at.current.useId()};Q.useImperativeHandle=function(e,t,n){return at.current.useImperativeHandle(e,t,n)};Q.useInsertionEffect=function(e,t){return at.current.useInsertionEffect(e,t)};Q.useLayoutEffect=function(e,t){return at.current.useLayoutEffect(e,t)};Q.useMemo=function(e,t){return at.current.useMemo(e,t)};Q.useReducer=function(e,t,n){return at.current.useReducer(e,t,n)};Q.useRef=function(e){return at.current.useRef(e)};Q.useState=function(e){return at.current.useState(e)};Q.useSyncExternalStore=function(e,t,n){return at.current.useSyncExternalStore(e,t,n)};Q.useTransition=function(){return at.current.useTransition()};Q.version="18.3.1";Sv.exports=Q;var y=Sv.exports;const pt=Qp(y);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nS=y,rS=Symbol.for("react.element"),iS=Symbol.for("react.fragment"),oS=Object.prototype.hasOwnProperty,sS=nS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,aS={key:!0,ref:!0,__self:!0,__source:!0};function Mv(e,t,n){var r,i={},o=null,a=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)oS.call(t,r)&&!aS.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:rS,type:e,key:o,ref:a,props:i,_owner:sS.current}}Kc.Fragment=iS;Kc.jsx=Mv;Kc.jsxs=Mv;kv.exports=Kc;var s=kv.exports,yh={},Lv={exports:{}},At={},Iv={exports:{}},Ov={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t($,L){var I=$.length;$.push(L);e:for(;0<I;){var B=I-1>>>1,z=$[B];if(0<i(z,L))$[B]=L,$[I]=z,I=B;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var L=$[0],I=$.pop();if(I!==L){$[0]=I;e:for(var B=0,z=$.length,G=z>>>1;B<G;){var ee=2*(B+1)-1,pe=$[ee],ge=ee+1,Re=$[ge];if(0>i(pe,I))ge<z&&0>i(Re,pe)?($[B]=Re,$[ge]=I,B=ge):($[B]=pe,$[ee]=I,B=ee);else if(ge<z&&0>i(Re,I))$[B]=Re,$[ge]=I,B=ge;else break e}}return L}function i($,L){var I=$.sortIndex-L.sortIndex;return I!==0?I:$.id-L.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var c=[],u=[],d=1,h=null,f=3,g=!1,m=!1,b=!1,j=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function w($){for(var L=n(u);L!==null;){if(L.callback===null)r(u);else if(L.startTime<=$)r(u),L.sortIndex=L.expirationTime,t(c,L);else break;L=n(u)}}function S($){if(b=!1,w($),!m)if(n(c)!==null)m=!0,F(k);else{var L=n(u);L!==null&&D(S,L.startTime-$)}}function k($,L){m=!1,b&&(b=!1,x(E),E=-1),g=!0;var I=f;try{for(w(L),h=n(c);h!==null&&(!(h.expirationTime>L)||$&&!M());){var B=h.callback;if(typeof B=="function"){h.callback=null,f=h.priorityLevel;var z=B(h.expirationTime<=L);L=e.unstable_now(),typeof z=="function"?h.callback=z:h===n(c)&&r(c),w(L)}else r(c);h=n(c)}if(h!==null)var G=!0;else{var ee=n(u);ee!==null&&D(S,ee.startTime-L),G=!1}return G}finally{h=null,f=I,g=!1}}var T=!1,C=null,E=-1,P=5,A=-1;function M(){return!(e.unstable_now()-A<P)}function Y(){if(C!==null){var $=e.unstable_now();A=$;var L=!0;try{L=C(!0,$)}finally{L?X():(T=!1,C=null)}}else T=!1}var X;if(typeof v=="function")X=function(){v(Y)};else if(typeof MessageChannel<"u"){var _=new MessageChannel,N=_.port2;_.port1.onmessage=Y,X=function(){N.postMessage(null)}}else X=function(){j(Y,0)};function F($){C=$,T||(T=!0,X())}function D($,L){E=j(function(){$(e.unstable_now())},L)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){m||g||(m=!0,F(k))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function($){switch(f){case 1:case 2:case 3:var L=3;break;default:L=f}var I=f;f=L;try{return $()}finally{f=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,L){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var I=f;f=$;try{return L()}finally{f=I}},e.unstable_scheduleCallback=function($,L,I){var B=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?B+I:B):I=B,$){case 1:var z=-1;break;case 2:z=250;break;case 5:z=1073741823;break;case 4:z=1e4;break;default:z=5e3}return z=I+z,$={id:d++,callback:L,priorityLevel:$,startTime:I,expirationTime:z,sortIndex:-1},I>B?($.sortIndex=I,t(u,$),n(c)===null&&$===n(u)&&(b?(x(E),E=-1):b=!0,D(S,I-B))):($.sortIndex=z,t(c,$),m||g||(m=!0,F(k))),$},e.unstable_shouldYield=M,e.unstable_wrapCallback=function($){var L=f;return function(){var I=f;f=L;try{return $.apply(this,arguments)}finally{f=I}}}})(Ov);Iv.exports=Ov;var lS=Iv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cS=y,$t=lS;function O(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Fv=new Set,Vs={};function Ci(e,t){ko(e,t),ko(e+"Capture",t)}function ko(e,t){for(Vs[e]=t,e=0;e<t.length;e++)Fv.add(t[e])}var Vn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),vh=Object.prototype.hasOwnProperty,uS=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,mg={},gg={};function dS(e){return vh.call(gg,e)?!0:vh.call(mg,e)?!1:uS.test(e)?gg[e]=!0:(mg[e]=!0,!1)}function hS(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function pS(e,t,n,r){if(t===null||typeof t>"u"||hS(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function lt(e,t,n,r,i,o,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var We={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){We[e]=new lt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];We[t]=new lt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){We[e]=new lt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){We[e]=new lt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){We[e]=new lt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){We[e]=new lt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){We[e]=new lt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){We[e]=new lt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){We[e]=new lt(e,5,!1,e.toLowerCase(),null,!1,!1)});var tf=/[\-:]([a-z])/g;function nf(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(tf,nf);We[t]=new lt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(tf,nf);We[t]=new lt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(tf,nf);We[t]=new lt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){We[e]=new lt(e,1,!1,e.toLowerCase(),null,!1,!1)});We.xlinkHref=new lt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){We[e]=new lt(e,1,!1,e.toLowerCase(),null,!0,!0)});function rf(e,t,n,r){var i=We.hasOwnProperty(t)?We[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(pS(t,n,i,r)&&(n=null),r||i===null?dS(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var qn=cS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Oa=Symbol.for("react.element"),qi=Symbol.for("react.portal"),Qi=Symbol.for("react.fragment"),of=Symbol.for("react.strict_mode"),wh=Symbol.for("react.profiler"),Nv=Symbol.for("react.provider"),_v=Symbol.for("react.context"),sf=Symbol.for("react.forward_ref"),bh=Symbol.for("react.suspense"),jh=Symbol.for("react.suspense_list"),af=Symbol.for("react.memo"),ir=Symbol.for("react.lazy"),zv=Symbol.for("react.offscreen"),xg=Symbol.iterator;function es(e){return e===null||typeof e!="object"?null:(e=xg&&e[xg]||e["@@iterator"],typeof e=="function"?e:null)}var we=Object.assign,Fu;function vs(e){if(Fu===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Fu=t&&t[1]||""}return`
`+Fu+e}var Nu=!1;function _u(e,t){if(!e||Nu)return"";Nu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),a=i.length-1,l=o.length-1;1<=a&&0<=l&&i[a]!==o[l];)l--;for(;1<=a&&0<=l;a--,l--)if(i[a]!==o[l]){if(a!==1||l!==1)do if(a--,l--,0>l||i[a]!==o[l]){var c=`
`+i[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=l);break}}}finally{Nu=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?vs(e):""}function fS(e){switch(e.tag){case 5:return vs(e.type);case 16:return vs("Lazy");case 13:return vs("Suspense");case 19:return vs("SuspenseList");case 0:case 2:case 15:return e=_u(e.type,!1),e;case 11:return e=_u(e.type.render,!1),e;case 1:return e=_u(e.type,!0),e;default:return""}}function kh(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qi:return"Fragment";case qi:return"Portal";case wh:return"Profiler";case of:return"StrictMode";case bh:return"Suspense";case jh:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case _v:return(e.displayName||"Context")+".Consumer";case Nv:return(e._context.displayName||"Context")+".Provider";case sf:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case af:return t=e.displayName||null,t!==null?t:kh(e.type)||"Memo";case ir:t=e._payload,e=e._init;try{return kh(e(t))}catch{}}return null}function mS(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return kh(t);case 8:return t===of?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Sr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Bv(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function gS(e){var t=Bv(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,o.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Fa(e){e._valueTracker||(e._valueTracker=gS(e))}function Vv(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Bv(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Xl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Sh(e,t){var n=t.checked;return we({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function yg(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Sr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Hv(e,t){t=t.checked,t!=null&&rf(e,"checked",t,!1)}function Ch(e,t){Hv(e,t);var n=Sr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Th(e,t.type,n):t.hasOwnProperty("defaultValue")&&Th(e,t.type,Sr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function vg(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Th(e,t,n){(t!=="number"||Xl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ws=Array.isArray;function mo(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Sr(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function $h(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(O(91));return we({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function wg(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(O(92));if(ws(n)){if(1<n.length)throw Error(O(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Sr(n)}}function Uv(e,t){var n=Sr(t.value),r=Sr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function bg(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Wv(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Eh(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Wv(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Na,Kv=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Na=Na||document.createElement("div"),Na.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Na.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Hs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Es={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xS=["Webkit","ms","Moz","O"];Object.keys(Es).forEach(function(e){xS.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Es[t]=Es[e]})});function Yv(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Es.hasOwnProperty(e)&&Es[e]?(""+t).trim():t+"px"}function Gv(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Yv(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var yS=we({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ph(e,t){if(t){if(yS[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(O(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(O(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(O(61))}if(t.style!=null&&typeof t.style!="object")throw Error(O(62))}}function Ah(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dh=null;function lf(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Rh=null,go=null,xo=null;function jg(e){if(e=xa(e)){if(typeof Rh!="function")throw Error(O(280));var t=e.stateNode;t&&(t=Xc(t),Rh(e.stateNode,e.type,t))}}function qv(e){go?xo?xo.push(e):xo=[e]:go=e}function Qv(){if(go){var e=go,t=xo;if(xo=go=null,jg(e),t)for(e=0;e<t.length;e++)jg(t[e])}}function Xv(e,t){return e(t)}function Zv(){}var zu=!1;function Jv(e,t,n){if(zu)return e(t,n);zu=!0;try{return Xv(e,t,n)}finally{zu=!1,(go!==null||xo!==null)&&(Zv(),Qv())}}function Us(e,t){var n=e.stateNode;if(n===null)return null;var r=Xc(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(O(231,t,typeof n));return n}var Mh=!1;if(Vn)try{var ts={};Object.defineProperty(ts,"passive",{get:function(){Mh=!0}}),window.addEventListener("test",ts,ts),window.removeEventListener("test",ts,ts)}catch{Mh=!1}function vS(e,t,n,r,i,o,a,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var Ps=!1,Zl=null,Jl=!1,Lh=null,wS={onError:function(e){Ps=!0,Zl=e}};function bS(e,t,n,r,i,o,a,l,c){Ps=!1,Zl=null,vS.apply(wS,arguments)}function jS(e,t,n,r,i,o,a,l,c){if(bS.apply(this,arguments),Ps){if(Ps){var u=Zl;Ps=!1,Zl=null}else throw Error(O(198));Jl||(Jl=!0,Lh=u)}}function Ti(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ew(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function kg(e){if(Ti(e)!==e)throw Error(O(188))}function kS(e){var t=e.alternate;if(!t){if(t=Ti(e),t===null)throw Error(O(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return kg(i),e;if(o===r)return kg(i),t;o=o.sibling}throw Error(O(188))}if(n.return!==r.return)n=i,r=o;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=o;break}if(l===r){a=!0,r=i,n=o;break}l=l.sibling}if(!a){for(l=o.child;l;){if(l===n){a=!0,n=o,r=i;break}if(l===r){a=!0,r=o,n=i;break}l=l.sibling}if(!a)throw Error(O(189))}}if(n.alternate!==r)throw Error(O(190))}if(n.tag!==3)throw Error(O(188));return n.stateNode.current===n?e:t}function tw(e){return e=kS(e),e!==null?nw(e):null}function nw(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=nw(e);if(t!==null)return t;e=e.sibling}return null}var rw=$t.unstable_scheduleCallback,Sg=$t.unstable_cancelCallback,SS=$t.unstable_shouldYield,CS=$t.unstable_requestPaint,Te=$t.unstable_now,TS=$t.unstable_getCurrentPriorityLevel,cf=$t.unstable_ImmediatePriority,iw=$t.unstable_UserBlockingPriority,ec=$t.unstable_NormalPriority,$S=$t.unstable_LowPriority,ow=$t.unstable_IdlePriority,Yc=null,xn=null;function ES(e){if(xn&&typeof xn.onCommitFiberRoot=="function")try{xn.onCommitFiberRoot(Yc,e,void 0,(e.current.flags&128)===128)}catch{}}var tn=Math.clz32?Math.clz32:DS,PS=Math.log,AS=Math.LN2;function DS(e){return e>>>=0,e===0?32:31-(PS(e)/AS|0)|0}var _a=64,za=4194304;function bs(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function tc(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~i;l!==0?r=bs(l):(o&=a,o!==0&&(r=bs(o)))}else a=n&~i,a!==0?r=bs(a):o!==0&&(r=bs(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-tn(t),i=1<<n,r|=e[n],t&=~i;return r}function RS(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function MS(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-tn(o),l=1<<a,c=i[a];c===-1?(!(l&n)||l&r)&&(i[a]=RS(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function Ih(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function sw(){var e=_a;return _a<<=1,!(_a&4194240)&&(_a=64),e}function Bu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ma(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-tn(t),e[t]=n}function LS(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-tn(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function uf(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-tn(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ie=0;function aw(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var lw,df,cw,uw,dw,Oh=!1,Ba=[],fr=null,mr=null,gr=null,Ws=new Map,Ks=new Map,sr=[],IS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cg(e,t){switch(e){case"focusin":case"focusout":fr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":gr=null;break;case"pointerover":case"pointerout":Ws.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ks.delete(t.pointerId)}}function ns(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=xa(t),t!==null&&df(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function OS(e,t,n,r,i){switch(t){case"focusin":return fr=ns(fr,e,t,n,r,i),!0;case"dragenter":return mr=ns(mr,e,t,n,r,i),!0;case"mouseover":return gr=ns(gr,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return Ws.set(o,ns(Ws.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Ks.set(o,ns(Ks.get(o)||null,e,t,n,r,i)),!0}return!1}function hw(e){var t=ri(e.target);if(t!==null){var n=Ti(t);if(n!==null){if(t=n.tag,t===13){if(t=ew(n),t!==null){e.blockedOn=t,dw(e.priority,function(){cw(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Tl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Fh(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Dh=r,n.target.dispatchEvent(r),Dh=null}else return t=xa(n),t!==null&&df(t),e.blockedOn=n,!1;t.shift()}return!0}function Tg(e,t,n){Tl(e)&&n.delete(t)}function FS(){Oh=!1,fr!==null&&Tl(fr)&&(fr=null),mr!==null&&Tl(mr)&&(mr=null),gr!==null&&Tl(gr)&&(gr=null),Ws.forEach(Tg),Ks.forEach(Tg)}function rs(e,t){e.blockedOn===t&&(e.blockedOn=null,Oh||(Oh=!0,$t.unstable_scheduleCallback($t.unstable_NormalPriority,FS)))}function Ys(e){function t(i){return rs(i,e)}if(0<Ba.length){rs(Ba[0],e);for(var n=1;n<Ba.length;n++){var r=Ba[n];r.blockedOn===e&&(r.blockedOn=null)}}for(fr!==null&&rs(fr,e),mr!==null&&rs(mr,e),gr!==null&&rs(gr,e),Ws.forEach(t),Ks.forEach(t),n=0;n<sr.length;n++)r=sr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<sr.length&&(n=sr[0],n.blockedOn===null);)hw(n),n.blockedOn===null&&sr.shift()}var yo=qn.ReactCurrentBatchConfig,nc=!0;function NS(e,t,n,r){var i=ie,o=yo.transition;yo.transition=null;try{ie=1,hf(e,t,n,r)}finally{ie=i,yo.transition=o}}function _S(e,t,n,r){var i=ie,o=yo.transition;yo.transition=null;try{ie=4,hf(e,t,n,r)}finally{ie=i,yo.transition=o}}function hf(e,t,n,r){if(nc){var i=Fh(e,t,n,r);if(i===null)Xu(e,t,r,rc,n),Cg(e,r);else if(OS(i,e,t,n,r))r.stopPropagation();else if(Cg(e,r),t&4&&-1<IS.indexOf(e)){for(;i!==null;){var o=xa(i);if(o!==null&&lw(o),o=Fh(e,t,n,r),o===null&&Xu(e,t,r,rc,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else Xu(e,t,r,null,n)}}var rc=null;function Fh(e,t,n,r){if(rc=null,e=lf(r),e=ri(e),e!==null)if(t=Ti(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ew(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return rc=e,null}function pw(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(TS()){case cf:return 1;case iw:return 4;case ec:case $S:return 16;case ow:return 536870912;default:return 16}default:return 16}}var cr=null,pf=null,$l=null;function fw(){if($l)return $l;var e,t=pf,n=t.length,r,i="value"in cr?cr.value:cr.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===i[o-r];r++);return $l=i.slice(e,1<r?1-r:void 0)}function El(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Va(){return!0}function $g(){return!1}function Dt(e){function t(n,r,i,o,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Va:$g,this.isPropagationStopped=$g,this}return we(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Va)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Va)},persist:function(){},isPersistent:Va}),t}var zo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ff=Dt(zo),ga=we({},zo,{view:0,detail:0}),zS=Dt(ga),Vu,Hu,is,Gc=we({},ga,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mf,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==is&&(is&&e.type==="mousemove"?(Vu=e.screenX-is.screenX,Hu=e.screenY-is.screenY):Hu=Vu=0,is=e),Vu)},movementY:function(e){return"movementY"in e?e.movementY:Hu}}),Eg=Dt(Gc),BS=we({},Gc,{dataTransfer:0}),VS=Dt(BS),HS=we({},ga,{relatedTarget:0}),Uu=Dt(HS),US=we({},zo,{animationName:0,elapsedTime:0,pseudoElement:0}),WS=Dt(US),KS=we({},zo,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),YS=Dt(KS),GS=we({},zo,{data:0}),Pg=Dt(GS),qS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},QS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},XS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ZS(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=XS[e])?!!t[e]:!1}function mf(){return ZS}var JS=we({},ga,{key:function(e){if(e.key){var t=qS[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=El(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?QS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mf,charCode:function(e){return e.type==="keypress"?El(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?El(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),eC=Dt(JS),tC=we({},Gc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ag=Dt(tC),nC=we({},ga,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mf}),rC=Dt(nC),iC=we({},zo,{propertyName:0,elapsedTime:0,pseudoElement:0}),oC=Dt(iC),sC=we({},Gc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),aC=Dt(sC),lC=[9,13,27,32],gf=Vn&&"CompositionEvent"in window,As=null;Vn&&"documentMode"in document&&(As=document.documentMode);var cC=Vn&&"TextEvent"in window&&!As,mw=Vn&&(!gf||As&&8<As&&11>=As),Dg=" ",Rg=!1;function gw(e,t){switch(e){case"keyup":return lC.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xw(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xi=!1;function uC(e,t){switch(e){case"compositionend":return xw(t);case"keypress":return t.which!==32?null:(Rg=!0,Dg);case"textInput":return e=t.data,e===Dg&&Rg?null:e;default:return null}}function dC(e,t){if(Xi)return e==="compositionend"||!gf&&gw(e,t)?(e=fw(),$l=pf=cr=null,Xi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return mw&&t.locale!=="ko"?null:t.data;default:return null}}var hC={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!hC[e.type]:t==="textarea"}function yw(e,t,n,r){qv(r),t=ic(t,"onChange"),0<t.length&&(n=new ff("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ds=null,Gs=null;function pC(e){Pw(e,0)}function qc(e){var t=eo(e);if(Vv(t))return e}function fC(e,t){if(e==="change")return t}var vw=!1;if(Vn){var Wu;if(Vn){var Ku="oninput"in document;if(!Ku){var Lg=document.createElement("div");Lg.setAttribute("oninput","return;"),Ku=typeof Lg.oninput=="function"}Wu=Ku}else Wu=!1;vw=Wu&&(!document.documentMode||9<document.documentMode)}function Ig(){Ds&&(Ds.detachEvent("onpropertychange",ww),Gs=Ds=null)}function ww(e){if(e.propertyName==="value"&&qc(Gs)){var t=[];yw(t,Gs,e,lf(e)),Jv(pC,t)}}function mC(e,t,n){e==="focusin"?(Ig(),Ds=t,Gs=n,Ds.attachEvent("onpropertychange",ww)):e==="focusout"&&Ig()}function gC(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qc(Gs)}function xC(e,t){if(e==="click")return qc(t)}function yC(e,t){if(e==="input"||e==="change")return qc(t)}function vC(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var on=typeof Object.is=="function"?Object.is:vC;function qs(e,t){if(on(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!vh.call(t,i)||!on(e[i],t[i]))return!1}return!0}function Og(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fg(e,t){var n=Og(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Og(n)}}function bw(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?bw(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function jw(){for(var e=window,t=Xl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Xl(e.document)}return t}function xf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function wC(e){var t=jw(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&bw(n.ownerDocument.documentElement,n)){if(r!==null&&xf(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Fg(n,o);var a=Fg(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var bC=Vn&&"documentMode"in document&&11>=document.documentMode,Zi=null,Nh=null,Rs=null,_h=!1;function Ng(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_h||Zi==null||Zi!==Xl(r)||(r=Zi,"selectionStart"in r&&xf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Rs&&qs(Rs,r)||(Rs=r,r=ic(Nh,"onSelect"),0<r.length&&(t=new ff("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Zi)))}function Ha(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ji={animationend:Ha("Animation","AnimationEnd"),animationiteration:Ha("Animation","AnimationIteration"),animationstart:Ha("Animation","AnimationStart"),transitionend:Ha("Transition","TransitionEnd")},Yu={},kw={};Vn&&(kw=document.createElement("div").style,"AnimationEvent"in window||(delete Ji.animationend.animation,delete Ji.animationiteration.animation,delete Ji.animationstart.animation),"TransitionEvent"in window||delete Ji.transitionend.transition);function Qc(e){if(Yu[e])return Yu[e];if(!Ji[e])return e;var t=Ji[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in kw)return Yu[e]=t[n];return e}var Sw=Qc("animationend"),Cw=Qc("animationiteration"),Tw=Qc("animationstart"),$w=Qc("transitionend"),Ew=new Map,_g="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pr(e,t){Ew.set(e,t),Ci(t,[e])}for(var Gu=0;Gu<_g.length;Gu++){var qu=_g[Gu],jC=qu.toLowerCase(),kC=qu[0].toUpperCase()+qu.slice(1);Pr(jC,"on"+kC)}Pr(Sw,"onAnimationEnd");Pr(Cw,"onAnimationIteration");Pr(Tw,"onAnimationStart");Pr("dblclick","onDoubleClick");Pr("focusin","onFocus");Pr("focusout","onBlur");Pr($w,"onTransitionEnd");ko("onMouseEnter",["mouseout","mouseover"]);ko("onMouseLeave",["mouseout","mouseover"]);ko("onPointerEnter",["pointerout","pointerover"]);ko("onPointerLeave",["pointerout","pointerover"]);Ci("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ci("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ci("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ci("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ci("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ci("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var js="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),SC=new Set("cancel close invalid load scroll toggle".split(" ").concat(js));function zg(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,jS(r,t,void 0,e),e.currentTarget=null}function Pw(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==o&&i.isPropagationStopped())break e;zg(i,l,u),o=c}else for(a=0;a<r.length;a++){if(l=r[a],c=l.instance,u=l.currentTarget,l=l.listener,c!==o&&i.isPropagationStopped())break e;zg(i,l,u),o=c}}}if(Jl)throw e=Lh,Jl=!1,Lh=null,e}function ce(e,t){var n=t[Uh];n===void 0&&(n=t[Uh]=new Set);var r=e+"__bubble";n.has(r)||(Aw(t,e,2,!1),n.add(r))}function Qu(e,t,n){var r=0;t&&(r|=4),Aw(n,e,r,t)}var Ua="_reactListening"+Math.random().toString(36).slice(2);function Qs(e){if(!e[Ua]){e[Ua]=!0,Fv.forEach(function(n){n!=="selectionchange"&&(SC.has(n)||Qu(n,!1,e),Qu(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ua]||(t[Ua]=!0,Qu("selectionchange",!1,t))}}function Aw(e,t,n,r){switch(pw(t)){case 1:var i=NS;break;case 4:i=_S;break;default:i=hf}n=i.bind(null,t,n,e),i=void 0,!Mh||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Xu(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;a=a.return}for(;l!==null;){if(a=ri(l),a===null)return;if(c=a.tag,c===5||c===6){r=o=a;continue e}l=l.parentNode}}r=r.return}Jv(function(){var u=o,d=lf(n),h=[];e:{var f=Ew.get(e);if(f!==void 0){var g=ff,m=e;switch(e){case"keypress":if(El(n)===0)break e;case"keydown":case"keyup":g=eC;break;case"focusin":m="focus",g=Uu;break;case"focusout":m="blur",g=Uu;break;case"beforeblur":case"afterblur":g=Uu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Eg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=VS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=rC;break;case Sw:case Cw:case Tw:g=WS;break;case $w:g=oC;break;case"scroll":g=zS;break;case"wheel":g=aC;break;case"copy":case"cut":case"paste":g=YS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=Ag}var b=(t&4)!==0,j=!b&&e==="scroll",x=b?f!==null?f+"Capture":null:f;b=[];for(var v=u,w;v!==null;){w=v;var S=w.stateNode;if(w.tag===5&&S!==null&&(w=S,x!==null&&(S=Us(v,x),S!=null&&b.push(Xs(v,S,w)))),j)break;v=v.return}0<b.length&&(f=new g(f,m,null,n,d),h.push({event:f,listeners:b}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",f&&n!==Dh&&(m=n.relatedTarget||n.fromElement)&&(ri(m)||m[Hn]))break e;if((g||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,g?(m=n.relatedTarget||n.toElement,g=u,m=m?ri(m):null,m!==null&&(j=Ti(m),m!==j||m.tag!==5&&m.tag!==6)&&(m=null)):(g=null,m=u),g!==m)){if(b=Eg,S="onMouseLeave",x="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(b=Ag,S="onPointerLeave",x="onPointerEnter",v="pointer"),j=g==null?f:eo(g),w=m==null?f:eo(m),f=new b(S,v+"leave",g,n,d),f.target=j,f.relatedTarget=w,S=null,ri(d)===u&&(b=new b(x,v+"enter",m,n,d),b.target=w,b.relatedTarget=j,S=b),j=S,g&&m)t:{for(b=g,x=m,v=0,w=b;w;w=Ri(w))v++;for(w=0,S=x;S;S=Ri(S))w++;for(;0<v-w;)b=Ri(b),v--;for(;0<w-v;)x=Ri(x),w--;for(;v--;){if(b===x||x!==null&&b===x.alternate)break t;b=Ri(b),x=Ri(x)}b=null}else b=null;g!==null&&Bg(h,f,g,b,!1),m!==null&&j!==null&&Bg(h,j,m,b,!0)}}e:{if(f=u?eo(u):window,g=f.nodeName&&f.nodeName.toLowerCase(),g==="select"||g==="input"&&f.type==="file")var k=fC;else if(Mg(f))if(vw)k=yC;else{k=gC;var T=mC}else(g=f.nodeName)&&g.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(k=xC);if(k&&(k=k(e,u))){yw(h,k,n,d);break e}T&&T(e,f,u),e==="focusout"&&(T=f._wrapperState)&&T.controlled&&f.type==="number"&&Th(f,"number",f.value)}switch(T=u?eo(u):window,e){case"focusin":(Mg(T)||T.contentEditable==="true")&&(Zi=T,Nh=u,Rs=null);break;case"focusout":Rs=Nh=Zi=null;break;case"mousedown":_h=!0;break;case"contextmenu":case"mouseup":case"dragend":_h=!1,Ng(h,n,d);break;case"selectionchange":if(bC)break;case"keydown":case"keyup":Ng(h,n,d)}var C;if(gf)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else Xi?gw(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(mw&&n.locale!=="ko"&&(Xi||E!=="onCompositionStart"?E==="onCompositionEnd"&&Xi&&(C=fw()):(cr=d,pf="value"in cr?cr.value:cr.textContent,Xi=!0)),T=ic(u,E),0<T.length&&(E=new Pg(E,e,null,n,d),h.push({event:E,listeners:T}),C?E.data=C:(C=xw(n),C!==null&&(E.data=C)))),(C=cC?uC(e,n):dC(e,n))&&(u=ic(u,"onBeforeInput"),0<u.length&&(d=new Pg("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:u}),d.data=C))}Pw(h,t)})}function Xs(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ic(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=Us(e,n),o!=null&&r.unshift(Xs(e,o,i)),o=Us(e,t),o!=null&&r.push(Xs(e,o,i))),e=e.return}return r}function Ri(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Bg(e,t,n,r,i){for(var o=t._reactName,a=[];n!==null&&n!==r;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&u!==null&&(l=u,i?(c=Us(n,o),c!=null&&a.unshift(Xs(n,c,l))):i||(c=Us(n,o),c!=null&&a.push(Xs(n,c,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var CC=/\r\n?/g,TC=/\u0000|\uFFFD/g;function Vg(e){return(typeof e=="string"?e:""+e).replace(CC,`
`).replace(TC,"")}function Wa(e,t,n){if(t=Vg(t),Vg(e)!==t&&n)throw Error(O(425))}function oc(){}var zh=null,Bh=null;function Vh(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Hh=typeof setTimeout=="function"?setTimeout:void 0,$C=typeof clearTimeout=="function"?clearTimeout:void 0,Hg=typeof Promise=="function"?Promise:void 0,EC=typeof queueMicrotask=="function"?queueMicrotask:typeof Hg<"u"?function(e){return Hg.resolve(null).then(e).catch(PC)}:Hh;function PC(e){setTimeout(function(){throw e})}function Zu(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Ys(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Ys(t)}function xr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ug(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Bo=Math.random().toString(36).slice(2),pn="__reactFiber$"+Bo,Zs="__reactProps$"+Bo,Hn="__reactContainer$"+Bo,Uh="__reactEvents$"+Bo,AC="__reactListeners$"+Bo,DC="__reactHandles$"+Bo;function ri(e){var t=e[pn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Hn]||n[pn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ug(e);e!==null;){if(n=e[pn])return n;e=Ug(e)}return t}e=n,n=e.parentNode}return null}function xa(e){return e=e[pn]||e[Hn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function eo(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(O(33))}function Xc(e){return e[Zs]||null}var Wh=[],to=-1;function Ar(e){return{current:e}}function de(e){0>to||(e.current=Wh[to],Wh[to]=null,to--)}function ae(e,t){to++,Wh[to]=e.current,e.current=t}var Cr={},Je=Ar(Cr),gt=Ar(!1),gi=Cr;function So(e,t){var n=e.type.contextTypes;if(!n)return Cr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function xt(e){return e=e.childContextTypes,e!=null}function sc(){de(gt),de(Je)}function Wg(e,t,n){if(Je.current!==Cr)throw Error(O(168));ae(Je,t),ae(gt,n)}function Dw(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(O(108,mS(e)||"Unknown",i));return we({},n,r)}function ac(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Cr,gi=Je.current,ae(Je,e),ae(gt,gt.current),!0}function Kg(e,t,n){var r=e.stateNode;if(!r)throw Error(O(169));n?(e=Dw(e,t,gi),r.__reactInternalMemoizedMergedChildContext=e,de(gt),de(Je),ae(Je,e)):de(gt),ae(gt,n)}var Rn=null,Zc=!1,Ju=!1;function Rw(e){Rn===null?Rn=[e]:Rn.push(e)}function RC(e){Zc=!0,Rw(e)}function Dr(){if(!Ju&&Rn!==null){Ju=!0;var e=0,t=ie;try{var n=Rn;for(ie=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Rn=null,Zc=!1}catch(i){throw Rn!==null&&(Rn=Rn.slice(e+1)),rw(cf,Dr),i}finally{ie=t,Ju=!1}}return null}var no=[],ro=0,lc=null,cc=0,Ft=[],Nt=0,xi=null,Mn=1,Ln="";function Jr(e,t){no[ro++]=cc,no[ro++]=lc,lc=e,cc=t}function Mw(e,t,n){Ft[Nt++]=Mn,Ft[Nt++]=Ln,Ft[Nt++]=xi,xi=e;var r=Mn;e=Ln;var i=32-tn(r)-1;r&=~(1<<i),n+=1;var o=32-tn(t)+i;if(30<o){var a=i-i%5;o=(r&(1<<a)-1).toString(32),r>>=a,i-=a,Mn=1<<32-tn(t)+i|n<<i|r,Ln=o+e}else Mn=1<<o|n<<i|r,Ln=e}function yf(e){e.return!==null&&(Jr(e,1),Mw(e,1,0))}function vf(e){for(;e===lc;)lc=no[--ro],no[ro]=null,cc=no[--ro],no[ro]=null;for(;e===xi;)xi=Ft[--Nt],Ft[Nt]=null,Ln=Ft[--Nt],Ft[Nt]=null,Mn=Ft[--Nt],Ft[Nt]=null}var Ct=null,St=null,fe=!1,Jt=null;function Lw(e,t){var n=_t(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Yg(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ct=e,St=xr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ct=e,St=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=xi!==null?{id:Mn,overflow:Ln}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=_t(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ct=e,St=null,!0):!1;default:return!1}}function Kh(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Yh(e){if(fe){var t=St;if(t){var n=t;if(!Yg(e,t)){if(Kh(e))throw Error(O(418));t=xr(n.nextSibling);var r=Ct;t&&Yg(e,t)?Lw(r,n):(e.flags=e.flags&-4097|2,fe=!1,Ct=e)}}else{if(Kh(e))throw Error(O(418));e.flags=e.flags&-4097|2,fe=!1,Ct=e}}}function Gg(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ct=e}function Ka(e){if(e!==Ct)return!1;if(!fe)return Gg(e),fe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Vh(e.type,e.memoizedProps)),t&&(t=St)){if(Kh(e))throw Iw(),Error(O(418));for(;t;)Lw(e,t),t=xr(t.nextSibling)}if(Gg(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(O(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){St=xr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}St=null}}else St=Ct?xr(e.stateNode.nextSibling):null;return!0}function Iw(){for(var e=St;e;)e=xr(e.nextSibling)}function Co(){St=Ct=null,fe=!1}function wf(e){Jt===null?Jt=[e]:Jt.push(e)}var MC=qn.ReactCurrentBatchConfig;function os(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(O(309));var r=n.stateNode}if(!r)throw Error(O(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(a){var l=i.refs;a===null?delete l[o]:l[o]=a},t._stringRef=o,t)}if(typeof e!="string")throw Error(O(284));if(!n._owner)throw Error(O(290,e))}return e}function Ya(e,t){throw e=Object.prototype.toString.call(t),Error(O(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function qg(e){var t=e._init;return t(e._payload)}function Ow(e){function t(x,v){if(e){var w=x.deletions;w===null?(x.deletions=[v],x.flags|=16):w.push(v)}}function n(x,v){if(!e)return null;for(;v!==null;)t(x,v),v=v.sibling;return null}function r(x,v){for(x=new Map;v!==null;)v.key!==null?x.set(v.key,v):x.set(v.index,v),v=v.sibling;return x}function i(x,v){return x=br(x,v),x.index=0,x.sibling=null,x}function o(x,v,w){return x.index=w,e?(w=x.alternate,w!==null?(w=w.index,w<v?(x.flags|=2,v):w):(x.flags|=2,v)):(x.flags|=1048576,v)}function a(x){return e&&x.alternate===null&&(x.flags|=2),x}function l(x,v,w,S){return v===null||v.tag!==6?(v=sd(w,x.mode,S),v.return=x,v):(v=i(v,w),v.return=x,v)}function c(x,v,w,S){var k=w.type;return k===Qi?d(x,v,w.props.children,S,w.key):v!==null&&(v.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===ir&&qg(k)===v.type)?(S=i(v,w.props),S.ref=os(x,v,w),S.return=x,S):(S=Il(w.type,w.key,w.props,null,x.mode,S),S.ref=os(x,v,w),S.return=x,S)}function u(x,v,w,S){return v===null||v.tag!==4||v.stateNode.containerInfo!==w.containerInfo||v.stateNode.implementation!==w.implementation?(v=ad(w,x.mode,S),v.return=x,v):(v=i(v,w.children||[]),v.return=x,v)}function d(x,v,w,S,k){return v===null||v.tag!==7?(v=di(w,x.mode,S,k),v.return=x,v):(v=i(v,w),v.return=x,v)}function h(x,v,w){if(typeof v=="string"&&v!==""||typeof v=="number")return v=sd(""+v,x.mode,w),v.return=x,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Oa:return w=Il(v.type,v.key,v.props,null,x.mode,w),w.ref=os(x,null,v),w.return=x,w;case qi:return v=ad(v,x.mode,w),v.return=x,v;case ir:var S=v._init;return h(x,S(v._payload),w)}if(ws(v)||es(v))return v=di(v,x.mode,w,null),v.return=x,v;Ya(x,v)}return null}function f(x,v,w,S){var k=v!==null?v.key:null;if(typeof w=="string"&&w!==""||typeof w=="number")return k!==null?null:l(x,v,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Oa:return w.key===k?c(x,v,w,S):null;case qi:return w.key===k?u(x,v,w,S):null;case ir:return k=w._init,f(x,v,k(w._payload),S)}if(ws(w)||es(w))return k!==null?null:d(x,v,w,S,null);Ya(x,w)}return null}function g(x,v,w,S,k){if(typeof S=="string"&&S!==""||typeof S=="number")return x=x.get(w)||null,l(v,x,""+S,k);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Oa:return x=x.get(S.key===null?w:S.key)||null,c(v,x,S,k);case qi:return x=x.get(S.key===null?w:S.key)||null,u(v,x,S,k);case ir:var T=S._init;return g(x,v,w,T(S._payload),k)}if(ws(S)||es(S))return x=x.get(w)||null,d(v,x,S,k,null);Ya(v,S)}return null}function m(x,v,w,S){for(var k=null,T=null,C=v,E=v=0,P=null;C!==null&&E<w.length;E++){C.index>E?(P=C,C=null):P=C.sibling;var A=f(x,C,w[E],S);if(A===null){C===null&&(C=P);break}e&&C&&A.alternate===null&&t(x,C),v=o(A,v,E),T===null?k=A:T.sibling=A,T=A,C=P}if(E===w.length)return n(x,C),fe&&Jr(x,E),k;if(C===null){for(;E<w.length;E++)C=h(x,w[E],S),C!==null&&(v=o(C,v,E),T===null?k=C:T.sibling=C,T=C);return fe&&Jr(x,E),k}for(C=r(x,C);E<w.length;E++)P=g(C,x,E,w[E],S),P!==null&&(e&&P.alternate!==null&&C.delete(P.key===null?E:P.key),v=o(P,v,E),T===null?k=P:T.sibling=P,T=P);return e&&C.forEach(function(M){return t(x,M)}),fe&&Jr(x,E),k}function b(x,v,w,S){var k=es(w);if(typeof k!="function")throw Error(O(150));if(w=k.call(w),w==null)throw Error(O(151));for(var T=k=null,C=v,E=v=0,P=null,A=w.next();C!==null&&!A.done;E++,A=w.next()){C.index>E?(P=C,C=null):P=C.sibling;var M=f(x,C,A.value,S);if(M===null){C===null&&(C=P);break}e&&C&&M.alternate===null&&t(x,C),v=o(M,v,E),T===null?k=M:T.sibling=M,T=M,C=P}if(A.done)return n(x,C),fe&&Jr(x,E),k;if(C===null){for(;!A.done;E++,A=w.next())A=h(x,A.value,S),A!==null&&(v=o(A,v,E),T===null?k=A:T.sibling=A,T=A);return fe&&Jr(x,E),k}for(C=r(x,C);!A.done;E++,A=w.next())A=g(C,x,E,A.value,S),A!==null&&(e&&A.alternate!==null&&C.delete(A.key===null?E:A.key),v=o(A,v,E),T===null?k=A:T.sibling=A,T=A);return e&&C.forEach(function(Y){return t(x,Y)}),fe&&Jr(x,E),k}function j(x,v,w,S){if(typeof w=="object"&&w!==null&&w.type===Qi&&w.key===null&&(w=w.props.children),typeof w=="object"&&w!==null){switch(w.$$typeof){case Oa:e:{for(var k=w.key,T=v;T!==null;){if(T.key===k){if(k=w.type,k===Qi){if(T.tag===7){n(x,T.sibling),v=i(T,w.props.children),v.return=x,x=v;break e}}else if(T.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===ir&&qg(k)===T.type){n(x,T.sibling),v=i(T,w.props),v.ref=os(x,T,w),v.return=x,x=v;break e}n(x,T);break}else t(x,T);T=T.sibling}w.type===Qi?(v=di(w.props.children,x.mode,S,w.key),v.return=x,x=v):(S=Il(w.type,w.key,w.props,null,x.mode,S),S.ref=os(x,v,w),S.return=x,x=S)}return a(x);case qi:e:{for(T=w.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===w.containerInfo&&v.stateNode.implementation===w.implementation){n(x,v.sibling),v=i(v,w.children||[]),v.return=x,x=v;break e}else{n(x,v);break}else t(x,v);v=v.sibling}v=ad(w,x.mode,S),v.return=x,x=v}return a(x);case ir:return T=w._init,j(x,v,T(w._payload),S)}if(ws(w))return m(x,v,w,S);if(es(w))return b(x,v,w,S);Ya(x,w)}return typeof w=="string"&&w!==""||typeof w=="number"?(w=""+w,v!==null&&v.tag===6?(n(x,v.sibling),v=i(v,w),v.return=x,x=v):(n(x,v),v=sd(w,x.mode,S),v.return=x,x=v),a(x)):n(x,v)}return j}var To=Ow(!0),Fw=Ow(!1),uc=Ar(null),dc=null,io=null,bf=null;function jf(){bf=io=dc=null}function kf(e){var t=uc.current;de(uc),e._currentValue=t}function Gh(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function vo(e,t){dc=e,bf=io=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ft=!0),e.firstContext=null)}function Bt(e){var t=e._currentValue;if(bf!==e)if(e={context:e,memoizedValue:t,next:null},io===null){if(dc===null)throw Error(O(308));io=e,dc.dependencies={lanes:0,firstContext:e}}else io=io.next=e;return t}var ii=null;function Sf(e){ii===null?ii=[e]:ii.push(e)}function Nw(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Sf(t)):(n.next=i.next,i.next=n),t.interleaved=n,Un(e,r)}function Un(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var or=!1;function Cf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function _w(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function On(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function yr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Z&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Un(e,n)}return i=r.interleaved,i===null?(t.next=t,Sf(r)):(t.next=i.next,i.next=t),r.interleaved=t,Un(e,n)}function Pl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,uf(e,n)}}function Qg(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=a:o=o.next=a,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function hc(e,t,n,r){var i=e.updateQueue;or=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var c=l,u=c.next;c.next=null,a===null?o=u:a.next=u,a=c;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==a&&(l===null?d.firstBaseUpdate=u:l.next=u,d.lastBaseUpdate=c))}if(o!==null){var h=i.baseState;a=0,d=u=c=null,l=o;do{var f=l.lane,g=l.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:g,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var m=e,b=l;switch(f=t,g=n,b.tag){case 1:if(m=b.payload,typeof m=="function"){h=m.call(g,h,f);break e}h=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=b.payload,f=typeof m=="function"?m.call(g,h,f):m,f==null)break e;h=we({},h,f);break e;case 2:or=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[l]:f.push(l))}else g={eventTime:g,lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(u=d=g,c=h):d=d.next=g,a|=f;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;f=l,l=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(d===null&&(c=h),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);vi|=a,e.lanes=a,e.memoizedState=h}}function Xg(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(O(191,i));i.call(r)}}}var ya={},yn=Ar(ya),Js=Ar(ya),ea=Ar(ya);function oi(e){if(e===ya)throw Error(O(174));return e}function Tf(e,t){switch(ae(ea,t),ae(Js,e),ae(yn,ya),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Eh(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Eh(t,e)}de(yn),ae(yn,t)}function $o(){de(yn),de(Js),de(ea)}function zw(e){oi(ea.current);var t=oi(yn.current),n=Eh(t,e.type);t!==n&&(ae(Js,e),ae(yn,n))}function $f(e){Js.current===e&&(de(yn),de(Js))}var xe=Ar(0);function pc(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ed=[];function Ef(){for(var e=0;e<ed.length;e++)ed[e]._workInProgressVersionPrimary=null;ed.length=0}var Al=qn.ReactCurrentDispatcher,td=qn.ReactCurrentBatchConfig,yi=0,ve=null,Me=null,Fe=null,fc=!1,Ms=!1,ta=0,LC=0;function Ye(){throw Error(O(321))}function Pf(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!on(e[n],t[n]))return!1;return!0}function Af(e,t,n,r,i,o){if(yi=o,ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Al.current=e===null||e.memoizedState===null?NC:_C,e=n(r,i),Ms){o=0;do{if(Ms=!1,ta=0,25<=o)throw Error(O(301));o+=1,Fe=Me=null,t.updateQueue=null,Al.current=zC,e=n(r,i)}while(Ms)}if(Al.current=mc,t=Me!==null&&Me.next!==null,yi=0,Fe=Me=ve=null,fc=!1,t)throw Error(O(300));return e}function Df(){var e=ta!==0;return ta=0,e}function cn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Fe===null?ve.memoizedState=Fe=e:Fe=Fe.next=e,Fe}function Vt(){if(Me===null){var e=ve.alternate;e=e!==null?e.memoizedState:null}else e=Me.next;var t=Fe===null?ve.memoizedState:Fe.next;if(t!==null)Fe=t,Me=e;else{if(e===null)throw Error(O(310));Me=e,e={memoizedState:Me.memoizedState,baseState:Me.baseState,baseQueue:Me.baseQueue,queue:Me.queue,next:null},Fe===null?ve.memoizedState=Fe=e:Fe=Fe.next=e}return Fe}function na(e,t){return typeof t=="function"?t(e):t}function nd(e){var t=Vt(),n=t.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=e;var r=Me,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var a=i.next;i.next=o.next,o.next=a}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var l=a=null,c=null,u=o;do{var d=u.lane;if((yi&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=h,a=r):c=c.next=h,ve.lanes|=d,vi|=d}u=u.next}while(u!==null&&u!==o);c===null?a=r:c.next=l,on(r,t.memoizedState)||(ft=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,ve.lanes|=o,vi|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function rd(e){var t=Vt(),n=t.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do o=e(o,a.action),a=a.next;while(a!==i);on(o,t.memoizedState)||(ft=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Bw(){}function Vw(e,t){var n=ve,r=Vt(),i=t(),o=!on(r.memoizedState,i);if(o&&(r.memoizedState=i,ft=!0),r=r.queue,Rf(Ww.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Fe!==null&&Fe.memoizedState.tag&1){if(n.flags|=2048,ra(9,Uw.bind(null,n,r,i,t),void 0,null),ze===null)throw Error(O(349));yi&30||Hw(n,t,i)}return i}function Hw(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ve.updateQueue,t===null?(t={lastEffect:null,stores:null},ve.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Uw(e,t,n,r){t.value=n,t.getSnapshot=r,Kw(t)&&Yw(e)}function Ww(e,t,n){return n(function(){Kw(t)&&Yw(e)})}function Kw(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!on(e,n)}catch{return!0}}function Yw(e){var t=Un(e,1);t!==null&&nn(t,e,1,-1)}function Zg(e){var t=cn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:e},t.queue=e,e=e.dispatch=FC.bind(null,ve,e),[t.memoizedState,e]}function ra(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ve.updateQueue,t===null?(t={lastEffect:null,stores:null},ve.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Gw(){return Vt().memoizedState}function Dl(e,t,n,r){var i=cn();ve.flags|=e,i.memoizedState=ra(1|t,n,void 0,r===void 0?null:r)}function Jc(e,t,n,r){var i=Vt();r=r===void 0?null:r;var o=void 0;if(Me!==null){var a=Me.memoizedState;if(o=a.destroy,r!==null&&Pf(r,a.deps)){i.memoizedState=ra(t,n,o,r);return}}ve.flags|=e,i.memoizedState=ra(1|t,n,o,r)}function Jg(e,t){return Dl(8390656,8,e,t)}function Rf(e,t){return Jc(2048,8,e,t)}function qw(e,t){return Jc(4,2,e,t)}function Qw(e,t){return Jc(4,4,e,t)}function Xw(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zw(e,t,n){return n=n!=null?n.concat([e]):null,Jc(4,4,Xw.bind(null,t,e),n)}function Mf(){}function Jw(e,t){var n=Vt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Pf(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function e1(e,t){var n=Vt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Pf(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function t1(e,t,n){return yi&21?(on(n,t)||(n=sw(),ve.lanes|=n,vi|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ft=!0),e.memoizedState=n)}function IC(e,t){var n=ie;ie=n!==0&&4>n?n:4,e(!0);var r=td.transition;td.transition={};try{e(!1),t()}finally{ie=n,td.transition=r}}function n1(){return Vt().memoizedState}function OC(e,t,n){var r=wr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},r1(e))i1(t,n);else if(n=Nw(e,t,n,r),n!==null){var i=ot();nn(n,e,r,i),o1(n,t,r)}}function FC(e,t,n){var r=wr(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(r1(e))i1(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var a=t.lastRenderedState,l=o(a,n);if(i.hasEagerState=!0,i.eagerState=l,on(l,a)){var c=t.interleaved;c===null?(i.next=i,Sf(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=Nw(e,t,i,r),n!==null&&(i=ot(),nn(n,e,r,i),o1(n,t,r))}}function r1(e){var t=e.alternate;return e===ve||t!==null&&t===ve}function i1(e,t){Ms=fc=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function o1(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,uf(e,n)}}var mc={readContext:Bt,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useInsertionEffect:Ye,useLayoutEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useMutableSource:Ye,useSyncExternalStore:Ye,useId:Ye,unstable_isNewReconciler:!1},NC={readContext:Bt,useCallback:function(e,t){return cn().memoizedState=[e,t===void 0?null:t],e},useContext:Bt,useEffect:Jg,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Dl(4194308,4,Xw.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Dl(4194308,4,e,t)},useInsertionEffect:function(e,t){return Dl(4,2,e,t)},useMemo:function(e,t){var n=cn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=cn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=OC.bind(null,ve,e),[r.memoizedState,e]},useRef:function(e){var t=cn();return e={current:e},t.memoizedState=e},useState:Zg,useDebugValue:Mf,useDeferredValue:function(e){return cn().memoizedState=e},useTransition:function(){var e=Zg(!1),t=e[0];return e=IC.bind(null,e[1]),cn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ve,i=cn();if(fe){if(n===void 0)throw Error(O(407));n=n()}else{if(n=t(),ze===null)throw Error(O(349));yi&30||Hw(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Jg(Ww.bind(null,r,o,e),[e]),r.flags|=2048,ra(9,Uw.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=cn(),t=ze.identifierPrefix;if(fe){var n=Ln,r=Mn;n=(r&~(1<<32-tn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ta++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=LC++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},_C={readContext:Bt,useCallback:Jw,useContext:Bt,useEffect:Rf,useImperativeHandle:Zw,useInsertionEffect:qw,useLayoutEffect:Qw,useMemo:e1,useReducer:nd,useRef:Gw,useState:function(){return nd(na)},useDebugValue:Mf,useDeferredValue:function(e){var t=Vt();return t1(t,Me.memoizedState,e)},useTransition:function(){var e=nd(na)[0],t=Vt().memoizedState;return[e,t]},useMutableSource:Bw,useSyncExternalStore:Vw,useId:n1,unstable_isNewReconciler:!1},zC={readContext:Bt,useCallback:Jw,useContext:Bt,useEffect:Rf,useImperativeHandle:Zw,useInsertionEffect:qw,useLayoutEffect:Qw,useMemo:e1,useReducer:rd,useRef:Gw,useState:function(){return rd(na)},useDebugValue:Mf,useDeferredValue:function(e){var t=Vt();return Me===null?t.memoizedState=e:t1(t,Me.memoizedState,e)},useTransition:function(){var e=rd(na)[0],t=Vt().memoizedState;return[e,t]},useMutableSource:Bw,useSyncExternalStore:Vw,useId:n1,unstable_isNewReconciler:!1};function Xt(e,t){if(e&&e.defaultProps){t=we({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function qh(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:we({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var eu={isMounted:function(e){return(e=e._reactInternals)?Ti(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ot(),i=wr(e),o=On(r,i);o.payload=t,n!=null&&(o.callback=n),t=yr(e,o,i),t!==null&&(nn(t,e,i,r),Pl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ot(),i=wr(e),o=On(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=yr(e,o,i),t!==null&&(nn(t,e,i,r),Pl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ot(),r=wr(e),i=On(n,r);i.tag=2,t!=null&&(i.callback=t),t=yr(e,i,r),t!==null&&(nn(t,e,r,n),Pl(t,e,r))}};function e0(e,t,n,r,i,o,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,a):t.prototype&&t.prototype.isPureReactComponent?!qs(n,r)||!qs(i,o):!0}function s1(e,t,n){var r=!1,i=Cr,o=t.contextType;return typeof o=="object"&&o!==null?o=Bt(o):(i=xt(t)?gi:Je.current,r=t.contextTypes,o=(r=r!=null)?So(e,i):Cr),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=eu,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function t0(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&eu.enqueueReplaceState(t,t.state,null)}function Qh(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Cf(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=Bt(o):(o=xt(t)?gi:Je.current,i.context=So(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(qh(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&eu.enqueueReplaceState(i,i.state,null),hc(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Eo(e,t){try{var n="",r=t;do n+=fS(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function id(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Xh(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var BC=typeof WeakMap=="function"?WeakMap:Map;function a1(e,t,n){n=On(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){xc||(xc=!0,ap=r),Xh(e,t)},n}function l1(e,t,n){n=On(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Xh(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Xh(e,t),typeof r!="function"&&(vr===null?vr=new Set([this]):vr.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function n0(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new BC;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=tT.bind(null,e,t,n),t.then(e,e))}function r0(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function i0(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=On(-1,1),t.tag=2,yr(n,t,1))),n.lanes|=1),e)}var VC=qn.ReactCurrentOwner,ft=!1;function nt(e,t,n,r){t.child=e===null?Fw(t,null,n,r):To(t,e.child,n,r)}function o0(e,t,n,r,i){n=n.render;var o=t.ref;return vo(t,i),r=Af(e,t,n,r,o,i),n=Df(),e!==null&&!ft?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Wn(e,t,i)):(fe&&n&&yf(t),t.flags|=1,nt(e,t,r,i),t.child)}function s0(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!Bf(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,c1(e,t,o,r,i)):(e=Il(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var a=o.memoizedProps;if(n=n.compare,n=n!==null?n:qs,n(a,r)&&e.ref===t.ref)return Wn(e,t,i)}return t.flags|=1,e=br(o,r),e.ref=t.ref,e.return=t,t.child=e}function c1(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(qs(o,r)&&e.ref===t.ref)if(ft=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(ft=!0);else return t.lanes=e.lanes,Wn(e,t,i)}return Zh(e,t,n,r,i)}function u1(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ae(so,kt),kt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ae(so,kt),kt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,ae(so,kt),kt|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,ae(so,kt),kt|=r;return nt(e,t,i,n),t.child}function d1(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Zh(e,t,n,r,i){var o=xt(n)?gi:Je.current;return o=So(t,o),vo(t,i),n=Af(e,t,n,r,o,i),r=Df(),e!==null&&!ft?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Wn(e,t,i)):(fe&&r&&yf(t),t.flags|=1,nt(e,t,n,i),t.child)}function a0(e,t,n,r,i){if(xt(n)){var o=!0;ac(t)}else o=!1;if(vo(t,i),t.stateNode===null)Rl(e,t),s1(t,n,r),Qh(t,n,r,i),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Bt(u):(u=xt(n)?gi:Je.current,u=So(t,u));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||c!==u)&&t0(t,a,r,u),or=!1;var f=t.memoizedState;a.state=f,hc(t,r,a,i),c=t.memoizedState,l!==r||f!==c||gt.current||or?(typeof d=="function"&&(qh(t,n,d,r),c=t.memoizedState),(l=or||e0(t,n,l,r,f,c,u))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),a.props=r,a.state=c,a.context=u,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,_w(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:Xt(t.type,l),a.props=u,h=t.pendingProps,f=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Bt(c):(c=xt(n)?gi:Je.current,c=So(t,c));var g=n.getDerivedStateFromProps;(d=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==h||f!==c)&&t0(t,a,r,c),or=!1,f=t.memoizedState,a.state=f,hc(t,r,a,i);var m=t.memoizedState;l!==h||f!==m||gt.current||or?(typeof g=="function"&&(qh(t,n,g,r),m=t.memoizedState),(u=or||e0(t,n,u,r,f,m,c)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,m,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,m,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),a.props=r,a.state=m,a.context=c,r=u):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Jh(e,t,n,r,o,i)}function Jh(e,t,n,r,i,o){d1(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return i&&Kg(t,n,!1),Wn(e,t,o);r=t.stateNode,VC.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=To(t,e.child,null,o),t.child=To(t,null,l,o)):nt(e,t,l,o),t.memoizedState=r.state,i&&Kg(t,n,!0),t.child}function h1(e){var t=e.stateNode;t.pendingContext?Wg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Wg(e,t.context,!1),Tf(e,t.containerInfo)}function l0(e,t,n,r,i){return Co(),wf(i),t.flags|=256,nt(e,t,n,r),t.child}var ep={dehydrated:null,treeContext:null,retryLane:0};function tp(e){return{baseLanes:e,cachePool:null,transitions:null}}function p1(e,t,n){var r=t.pendingProps,i=xe.current,o=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ae(xe,i&1),e===null)return Yh(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,o?(r=t.mode,o=t.child,a={mode:"hidden",children:a},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=a):o=ru(a,r,0,null),e=di(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=tp(n),t.memoizedState=ep,e):Lf(t,a));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return HC(e,t,a,r,l,i,n);if(o){o=r.fallback,a=t.mode,i=e.child,l=i.sibling;var c={mode:"hidden",children:r.children};return!(a&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=br(i,c),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=br(l,o):(o=di(o,a,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,a=e.child.memoizedState,a=a===null?tp(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},o.memoizedState=a,o.childLanes=e.childLanes&~n,t.memoizedState=ep,r}return o=e.child,e=o.sibling,r=br(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Lf(e,t){return t=ru({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ga(e,t,n,r){return r!==null&&wf(r),To(t,e.child,null,n),e=Lf(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function HC(e,t,n,r,i,o,a){if(n)return t.flags&256?(t.flags&=-257,r=id(Error(O(422))),Ga(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=ru({mode:"visible",children:r.children},i,0,null),o=di(o,i,a,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&To(t,e.child,null,a),t.child.memoizedState=tp(a),t.memoizedState=ep,o);if(!(t.mode&1))return Ga(e,t,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(O(419)),r=id(o,r,void 0),Ga(e,t,a,r)}if(l=(a&e.childLanes)!==0,ft||l){if(r=ze,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Un(e,i),nn(r,e,i,-1))}return zf(),r=id(Error(O(421))),Ga(e,t,a,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=nT.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,St=xr(i.nextSibling),Ct=t,fe=!0,Jt=null,e!==null&&(Ft[Nt++]=Mn,Ft[Nt++]=Ln,Ft[Nt++]=xi,Mn=e.id,Ln=e.overflow,xi=t),t=Lf(t,r.children),t.flags|=4096,t)}function c0(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Gh(e.return,t,n)}function od(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function f1(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(nt(e,t,r.children,n),r=xe.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&c0(e,n,t);else if(e.tag===19)c0(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ae(xe,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&pc(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),od(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&pc(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}od(t,!0,n,null,o);break;case"together":od(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Rl(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Wn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),vi|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(O(153));if(t.child!==null){for(e=t.child,n=br(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=br(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function UC(e,t,n){switch(t.tag){case 3:h1(t),Co();break;case 5:zw(t);break;case 1:xt(t.type)&&ac(t);break;case 4:Tf(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;ae(uc,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ae(xe,xe.current&1),t.flags|=128,null):n&t.child.childLanes?p1(e,t,n):(ae(xe,xe.current&1),e=Wn(e,t,n),e!==null?e.sibling:null);ae(xe,xe.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return f1(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ae(xe,xe.current),r)break;return null;case 22:case 23:return t.lanes=0,u1(e,t,n)}return Wn(e,t,n)}var m1,np,g1,x1;m1=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};np=function(){};g1=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,oi(yn.current);var o=null;switch(n){case"input":i=Sh(e,i),r=Sh(e,r),o=[];break;case"select":i=we({},i,{value:void 0}),r=we({},r,{value:void 0}),o=[];break;case"textarea":i=$h(e,i),r=$h(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=oc)}Ph(n,r);var a;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Vs.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var c=r[u];if(l=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(o||(o=[]),o.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Vs.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&ce("scroll",e),o||l===c||(o=[])):(o=o||[]).push(u,c))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};x1=function(e,t,n,r){n!==r&&(t.flags|=4)};function ss(e,t){if(!fe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ge(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function WC(e,t,n){var r=t.pendingProps;switch(vf(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ge(t),null;case 1:return xt(t.type)&&sc(),Ge(t),null;case 3:return r=t.stateNode,$o(),de(gt),de(Je),Ef(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ka(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Jt!==null&&(up(Jt),Jt=null))),np(e,t),Ge(t),null;case 5:$f(t);var i=oi(ea.current);if(n=t.type,e!==null&&t.stateNode!=null)g1(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(O(166));return Ge(t),null}if(e=oi(yn.current),Ka(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[pn]=t,r[Zs]=o,e=(t.mode&1)!==0,n){case"dialog":ce("cancel",r),ce("close",r);break;case"iframe":case"object":case"embed":ce("load",r);break;case"video":case"audio":for(i=0;i<js.length;i++)ce(js[i],r);break;case"source":ce("error",r);break;case"img":case"image":case"link":ce("error",r),ce("load",r);break;case"details":ce("toggle",r);break;case"input":yg(r,o),ce("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},ce("invalid",r);break;case"textarea":wg(r,o),ce("invalid",r)}Ph(n,o),i=null;for(var a in o)if(o.hasOwnProperty(a)){var l=o[a];a==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&Wa(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Wa(r.textContent,l,e),i=["children",""+l]):Vs.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&ce("scroll",r)}switch(n){case"input":Fa(r),vg(r,o,!0);break;case"textarea":Fa(r),bg(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=oc)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Wv(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[pn]=t,e[Zs]=r,m1(e,t,!1,!1),t.stateNode=e;e:{switch(a=Ah(n,r),n){case"dialog":ce("cancel",e),ce("close",e),i=r;break;case"iframe":case"object":case"embed":ce("load",e),i=r;break;case"video":case"audio":for(i=0;i<js.length;i++)ce(js[i],e);i=r;break;case"source":ce("error",e),i=r;break;case"img":case"image":case"link":ce("error",e),ce("load",e),i=r;break;case"details":ce("toggle",e),i=r;break;case"input":yg(e,r),i=Sh(e,r),ce("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=we({},r,{value:void 0}),ce("invalid",e);break;case"textarea":wg(e,r),i=$h(e,r),ce("invalid",e);break;default:i=r}Ph(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?Gv(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Kv(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Hs(e,c):typeof c=="number"&&Hs(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Vs.hasOwnProperty(o)?c!=null&&o==="onScroll"&&ce("scroll",e):c!=null&&rf(e,o,c,a))}switch(n){case"input":Fa(e),vg(e,r,!1);break;case"textarea":Fa(e),bg(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Sr(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?mo(e,!!r.multiple,o,!1):r.defaultValue!=null&&mo(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=oc)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ge(t),null;case 6:if(e&&t.stateNode!=null)x1(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(O(166));if(n=oi(ea.current),oi(yn.current),Ka(t)){if(r=t.stateNode,n=t.memoizedProps,r[pn]=t,(o=r.nodeValue!==n)&&(e=Ct,e!==null))switch(e.tag){case 3:Wa(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Wa(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[pn]=t,t.stateNode=r}return Ge(t),null;case 13:if(de(xe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(fe&&St!==null&&t.mode&1&&!(t.flags&128))Iw(),Co(),t.flags|=98560,o=!1;else if(o=Ka(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(O(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(O(317));o[pn]=t}else Co(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ge(t),o=!1}else Jt!==null&&(up(Jt),Jt=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||xe.current&1?Ie===0&&(Ie=3):zf())),t.updateQueue!==null&&(t.flags|=4),Ge(t),null);case 4:return $o(),np(e,t),e===null&&Qs(t.stateNode.containerInfo),Ge(t),null;case 10:return kf(t.type._context),Ge(t),null;case 17:return xt(t.type)&&sc(),Ge(t),null;case 19:if(de(xe),o=t.memoizedState,o===null)return Ge(t),null;if(r=(t.flags&128)!==0,a=o.rendering,a===null)if(r)ss(o,!1);else{if(Ie!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=pc(e),a!==null){for(t.flags|=128,ss(o,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,a=o.alternate,a===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=a.childLanes,o.lanes=a.lanes,o.child=a.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=a.memoizedProps,o.memoizedState=a.memoizedState,o.updateQueue=a.updateQueue,o.type=a.type,e=a.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ae(xe,xe.current&1|2),t.child}e=e.sibling}o.tail!==null&&Te()>Po&&(t.flags|=128,r=!0,ss(o,!1),t.lanes=4194304)}else{if(!r)if(e=pc(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ss(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!fe)return Ge(t),null}else 2*Te()-o.renderingStartTime>Po&&n!==1073741824&&(t.flags|=128,r=!0,ss(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(n=o.last,n!==null?n.sibling=a:t.child=a,o.last=a)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Te(),t.sibling=null,n=xe.current,ae(xe,r?n&1|2:n&1),t):(Ge(t),null);case 22:case 23:return _f(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?kt&1073741824&&(Ge(t),t.subtreeFlags&6&&(t.flags|=8192)):Ge(t),null;case 24:return null;case 25:return null}throw Error(O(156,t.tag))}function KC(e,t){switch(vf(t),t.tag){case 1:return xt(t.type)&&sc(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return $o(),de(gt),de(Je),Ef(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return $f(t),null;case 13:if(de(xe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(O(340));Co()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return de(xe),null;case 4:return $o(),null;case 10:return kf(t.type._context),null;case 22:case 23:return _f(),null;case 24:return null;default:return null}}var qa=!1,Xe=!1,YC=typeof WeakSet=="function"?WeakSet:Set,V=null;function oo(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){je(e,t,r)}else n.current=null}function rp(e,t,n){try{n()}catch(r){je(e,t,r)}}var u0=!1;function GC(e,t){if(zh=nc,e=jw(),xf(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var a=0,l=-1,c=-1,u=0,d=0,h=e,f=null;t:for(;;){for(var g;h!==n||i!==0&&h.nodeType!==3||(l=a+i),h!==o||r!==0&&h.nodeType!==3||(c=a+r),h.nodeType===3&&(a+=h.nodeValue.length),(g=h.firstChild)!==null;)f=h,h=g;for(;;){if(h===e)break t;if(f===n&&++u===i&&(l=a),f===o&&++d===r&&(c=a),(g=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=g}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Bh={focusedElem:e,selectionRange:n},nc=!1,V=t;V!==null;)if(t=V,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,V=e;else for(;V!==null;){t=V;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var b=m.memoizedProps,j=m.memoizedState,x=t.stateNode,v=x.getSnapshotBeforeUpdate(t.elementType===t.type?b:Xt(t.type,b),j);x.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var w=t.stateNode.containerInfo;w.nodeType===1?w.textContent="":w.nodeType===9&&w.documentElement&&w.removeChild(w.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(S){je(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,V=e;break}V=t.return}return m=u0,u0=!1,m}function Ls(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&rp(t,n,o)}i=i.next}while(i!==r)}}function tu(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ip(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function y1(e){var t=e.alternate;t!==null&&(e.alternate=null,y1(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[pn],delete t[Zs],delete t[Uh],delete t[AC],delete t[DC])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function v1(e){return e.tag===5||e.tag===3||e.tag===4}function d0(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||v1(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function op(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=oc));else if(r!==4&&(e=e.child,e!==null))for(op(e,t,n),e=e.sibling;e!==null;)op(e,t,n),e=e.sibling}function sp(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(sp(e,t,n),e=e.sibling;e!==null;)sp(e,t,n),e=e.sibling}var Ve=null,Zt=!1;function Qn(e,t,n){for(n=n.child;n!==null;)w1(e,t,n),n=n.sibling}function w1(e,t,n){if(xn&&typeof xn.onCommitFiberUnmount=="function")try{xn.onCommitFiberUnmount(Yc,n)}catch{}switch(n.tag){case 5:Xe||oo(n,t);case 6:var r=Ve,i=Zt;Ve=null,Qn(e,t,n),Ve=r,Zt=i,Ve!==null&&(Zt?(e=Ve,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ve.removeChild(n.stateNode));break;case 18:Ve!==null&&(Zt?(e=Ve,n=n.stateNode,e.nodeType===8?Zu(e.parentNode,n):e.nodeType===1&&Zu(e,n),Ys(e)):Zu(Ve,n.stateNode));break;case 4:r=Ve,i=Zt,Ve=n.stateNode.containerInfo,Zt=!0,Qn(e,t,n),Ve=r,Zt=i;break;case 0:case 11:case 14:case 15:if(!Xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,a=o.destroy;o=o.tag,a!==void 0&&(o&2||o&4)&&rp(n,t,a),i=i.next}while(i!==r)}Qn(e,t,n);break;case 1:if(!Xe&&(oo(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){je(n,t,l)}Qn(e,t,n);break;case 21:Qn(e,t,n);break;case 22:n.mode&1?(Xe=(r=Xe)||n.memoizedState!==null,Qn(e,t,n),Xe=r):Qn(e,t,n);break;default:Qn(e,t,n)}}function h0(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new YC),t.forEach(function(r){var i=rT.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Gt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:Ve=l.stateNode,Zt=!1;break e;case 3:Ve=l.stateNode.containerInfo,Zt=!0;break e;case 4:Ve=l.stateNode.containerInfo,Zt=!0;break e}l=l.return}if(Ve===null)throw Error(O(160));w1(o,a,i),Ve=null,Zt=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){je(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)b1(t,e),t=t.sibling}function b1(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Gt(t,e),ln(e),r&4){try{Ls(3,e,e.return),tu(3,e)}catch(b){je(e,e.return,b)}try{Ls(5,e,e.return)}catch(b){je(e,e.return,b)}}break;case 1:Gt(t,e),ln(e),r&512&&n!==null&&oo(n,n.return);break;case 5:if(Gt(t,e),ln(e),r&512&&n!==null&&oo(n,n.return),e.flags&32){var i=e.stateNode;try{Hs(i,"")}catch(b){je(e,e.return,b)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,a=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&Hv(i,o),Ah(l,a);var u=Ah(l,o);for(a=0;a<c.length;a+=2){var d=c[a],h=c[a+1];d==="style"?Gv(i,h):d==="dangerouslySetInnerHTML"?Kv(i,h):d==="children"?Hs(i,h):rf(i,d,h,u)}switch(l){case"input":Ch(i,o);break;case"textarea":Uv(i,o);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var g=o.value;g!=null?mo(i,!!o.multiple,g,!1):f!==!!o.multiple&&(o.defaultValue!=null?mo(i,!!o.multiple,o.defaultValue,!0):mo(i,!!o.multiple,o.multiple?[]:"",!1))}i[Zs]=o}catch(b){je(e,e.return,b)}}break;case 6:if(Gt(t,e),ln(e),r&4){if(e.stateNode===null)throw Error(O(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(b){je(e,e.return,b)}}break;case 3:if(Gt(t,e),ln(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ys(t.containerInfo)}catch(b){je(e,e.return,b)}break;case 4:Gt(t,e),ln(e);break;case 13:Gt(t,e),ln(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Ff=Te())),r&4&&h0(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Xe=(u=Xe)||d,Gt(t,e),Xe=u):Gt(t,e),ln(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(V=e,d=e.child;d!==null;){for(h=V=d;V!==null;){switch(f=V,g=f.child,f.tag){case 0:case 11:case 14:case 15:Ls(4,f,f.return);break;case 1:oo(f,f.return);var m=f.stateNode;if(typeof m.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(b){je(r,n,b)}}break;case 5:oo(f,f.return);break;case 22:if(f.memoizedState!==null){f0(h);continue}}g!==null?(g.return=f,V=g):f0(h)}d=d.sibling}e:for(d=null,h=e;;){if(h.tag===5){if(d===null){d=h;try{i=h.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=h.stateNode,c=h.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Yv("display",a))}catch(b){je(e,e.return,b)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(b){je(e,e.return,b)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Gt(t,e),ln(e),r&4&&h0(e);break;case 21:break;default:Gt(t,e),ln(e)}}function ln(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(v1(n)){var r=n;break e}n=n.return}throw Error(O(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Hs(i,""),r.flags&=-33);var o=d0(e);sp(e,o,i);break;case 3:case 4:var a=r.stateNode.containerInfo,l=d0(e);op(e,l,a);break;default:throw Error(O(161))}}catch(c){je(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function qC(e,t,n){V=e,j1(e)}function j1(e,t,n){for(var r=(e.mode&1)!==0;V!==null;){var i=V,o=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||qa;if(!a){var l=i.alternate,c=l!==null&&l.memoizedState!==null||Xe;l=qa;var u=Xe;if(qa=a,(Xe=c)&&!u)for(V=i;V!==null;)a=V,c=a.child,a.tag===22&&a.memoizedState!==null?m0(i):c!==null?(c.return=a,V=c):m0(i);for(;o!==null;)V=o,j1(o),o=o.sibling;V=i,qa=l,Xe=u}p0(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,V=o):p0(e)}}function p0(e){for(;V!==null;){var t=V;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Xe||tu(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Xe)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Xt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Xg(t,o,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Xg(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&Ys(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}Xe||t.flags&512&&ip(t)}catch(f){je(t,t.return,f)}}if(t===e){V=null;break}if(n=t.sibling,n!==null){n.return=t.return,V=n;break}V=t.return}}function f0(e){for(;V!==null;){var t=V;if(t===e){V=null;break}var n=t.sibling;if(n!==null){n.return=t.return,V=n;break}V=t.return}}function m0(e){for(;V!==null;){var t=V;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{tu(4,t)}catch(c){je(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){je(t,i,c)}}var o=t.return;try{ip(t)}catch(c){je(t,o,c)}break;case 5:var a=t.return;try{ip(t)}catch(c){je(t,a,c)}}}catch(c){je(t,t.return,c)}if(t===e){V=null;break}var l=t.sibling;if(l!==null){l.return=t.return,V=l;break}V=t.return}}var QC=Math.ceil,gc=qn.ReactCurrentDispatcher,If=qn.ReactCurrentOwner,zt=qn.ReactCurrentBatchConfig,Z=0,ze=null,De=null,Ue=0,kt=0,so=Ar(0),Ie=0,ia=null,vi=0,nu=0,Of=0,Is=null,ht=null,Ff=0,Po=1/0,An=null,xc=!1,ap=null,vr=null,Qa=!1,ur=null,yc=0,Os=0,lp=null,Ml=-1,Ll=0;function ot(){return Z&6?Te():Ml!==-1?Ml:Ml=Te()}function wr(e){return e.mode&1?Z&2&&Ue!==0?Ue&-Ue:MC.transition!==null?(Ll===0&&(Ll=sw()),Ll):(e=ie,e!==0||(e=window.event,e=e===void 0?16:pw(e.type)),e):1}function nn(e,t,n,r){if(50<Os)throw Os=0,lp=null,Error(O(185));ma(e,n,r),(!(Z&2)||e!==ze)&&(e===ze&&(!(Z&2)&&(nu|=n),Ie===4&&ar(e,Ue)),yt(e,r),n===1&&Z===0&&!(t.mode&1)&&(Po=Te()+500,Zc&&Dr()))}function yt(e,t){var n=e.callbackNode;MS(e,t);var r=tc(e,e===ze?Ue:0);if(r===0)n!==null&&Sg(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Sg(n),t===1)e.tag===0?RC(g0.bind(null,e)):Rw(g0.bind(null,e)),EC(function(){!(Z&6)&&Dr()}),n=null;else{switch(aw(r)){case 1:n=cf;break;case 4:n=iw;break;case 16:n=ec;break;case 536870912:n=ow;break;default:n=ec}n=A1(n,k1.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function k1(e,t){if(Ml=-1,Ll=0,Z&6)throw Error(O(327));var n=e.callbackNode;if(wo()&&e.callbackNode!==n)return null;var r=tc(e,e===ze?Ue:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=vc(e,r);else{t=r;var i=Z;Z|=2;var o=C1();(ze!==e||Ue!==t)&&(An=null,Po=Te()+500,ui(e,t));do try{JC();break}catch(l){S1(e,l)}while(!0);jf(),gc.current=o,Z=i,De!==null?t=0:(ze=null,Ue=0,t=Ie)}if(t!==0){if(t===2&&(i=Ih(e),i!==0&&(r=i,t=cp(e,i))),t===1)throw n=ia,ui(e,0),ar(e,r),yt(e,Te()),n;if(t===6)ar(e,r);else{if(i=e.current.alternate,!(r&30)&&!XC(i)&&(t=vc(e,r),t===2&&(o=Ih(e),o!==0&&(r=o,t=cp(e,o))),t===1))throw n=ia,ui(e,0),ar(e,r),yt(e,Te()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(O(345));case 2:ei(e,ht,An);break;case 3:if(ar(e,r),(r&130023424)===r&&(t=Ff+500-Te(),10<t)){if(tc(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){ot(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Hh(ei.bind(null,e,ht,An),t);break}ei(e,ht,An);break;case 4:if(ar(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-tn(r);o=1<<a,a=t[a],a>i&&(i=a),r&=~o}if(r=i,r=Te()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*QC(r/1960))-r,10<r){e.timeoutHandle=Hh(ei.bind(null,e,ht,An),r);break}ei(e,ht,An);break;case 5:ei(e,ht,An);break;default:throw Error(O(329))}}}return yt(e,Te()),e.callbackNode===n?k1.bind(null,e):null}function cp(e,t){var n=Is;return e.current.memoizedState.isDehydrated&&(ui(e,t).flags|=256),e=vc(e,t),e!==2&&(t=ht,ht=n,t!==null&&up(t)),e}function up(e){ht===null?ht=e:ht.push.apply(ht,e)}function XC(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!on(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ar(e,t){for(t&=~Of,t&=~nu,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-tn(t),r=1<<n;e[n]=-1,t&=~r}}function g0(e){if(Z&6)throw Error(O(327));wo();var t=tc(e,0);if(!(t&1))return yt(e,Te()),null;var n=vc(e,t);if(e.tag!==0&&n===2){var r=Ih(e);r!==0&&(t=r,n=cp(e,r))}if(n===1)throw n=ia,ui(e,0),ar(e,t),yt(e,Te()),n;if(n===6)throw Error(O(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,ei(e,ht,An),yt(e,Te()),null}function Nf(e,t){var n=Z;Z|=1;try{return e(t)}finally{Z=n,Z===0&&(Po=Te()+500,Zc&&Dr())}}function wi(e){ur!==null&&ur.tag===0&&!(Z&6)&&wo();var t=Z;Z|=1;var n=zt.transition,r=ie;try{if(zt.transition=null,ie=1,e)return e()}finally{ie=r,zt.transition=n,Z=t,!(Z&6)&&Dr()}}function _f(){kt=so.current,de(so)}function ui(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,$C(n)),De!==null)for(n=De.return;n!==null;){var r=n;switch(vf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&sc();break;case 3:$o(),de(gt),de(Je),Ef();break;case 5:$f(r);break;case 4:$o();break;case 13:de(xe);break;case 19:de(xe);break;case 10:kf(r.type._context);break;case 22:case 23:_f()}n=n.return}if(ze=e,De=e=br(e.current,null),Ue=kt=t,Ie=0,ia=null,Of=nu=vi=0,ht=Is=null,ii!==null){for(t=0;t<ii.length;t++)if(n=ii[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var a=o.next;o.next=i,r.next=a}n.pending=r}ii=null}return e}function S1(e,t){do{var n=De;try{if(jf(),Al.current=mc,fc){for(var r=ve.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}fc=!1}if(yi=0,Fe=Me=ve=null,Ms=!1,ta=0,If.current=null,n===null||n.return===null){Ie=1,ia=t,De=null;break}e:{var o=e,a=n.return,l=n,c=t;if(t=Ue,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=l,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var g=r0(a);if(g!==null){g.flags&=-257,i0(g,a,l,o,t),g.mode&1&&n0(o,u,t),t=g,c=u;var m=t.updateQueue;if(m===null){var b=new Set;b.add(c),t.updateQueue=b}else m.add(c);break e}else{if(!(t&1)){n0(o,u,t),zf();break e}c=Error(O(426))}}else if(fe&&l.mode&1){var j=r0(a);if(j!==null){!(j.flags&65536)&&(j.flags|=256),i0(j,a,l,o,t),wf(Eo(c,l));break e}}o=c=Eo(c,l),Ie!==4&&(Ie=2),Is===null?Is=[o]:Is.push(o),o=a;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var x=a1(o,c,t);Qg(o,x);break e;case 1:l=c;var v=o.type,w=o.stateNode;if(!(o.flags&128)&&(typeof v.getDerivedStateFromError=="function"||w!==null&&typeof w.componentDidCatch=="function"&&(vr===null||!vr.has(w)))){o.flags|=65536,t&=-t,o.lanes|=t;var S=l1(o,l,t);Qg(o,S);break e}}o=o.return}while(o!==null)}$1(n)}catch(k){t=k,De===n&&n!==null&&(De=n=n.return);continue}break}while(!0)}function C1(){var e=gc.current;return gc.current=mc,e===null?mc:e}function zf(){(Ie===0||Ie===3||Ie===2)&&(Ie=4),ze===null||!(vi&268435455)&&!(nu&268435455)||ar(ze,Ue)}function vc(e,t){var n=Z;Z|=2;var r=C1();(ze!==e||Ue!==t)&&(An=null,ui(e,t));do try{ZC();break}catch(i){S1(e,i)}while(!0);if(jf(),Z=n,gc.current=r,De!==null)throw Error(O(261));return ze=null,Ue=0,Ie}function ZC(){for(;De!==null;)T1(De)}function JC(){for(;De!==null&&!SS();)T1(De)}function T1(e){var t=P1(e.alternate,e,kt);e.memoizedProps=e.pendingProps,t===null?$1(e):De=t,If.current=null}function $1(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=KC(n,t),n!==null){n.flags&=32767,De=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ie=6,De=null;return}}else if(n=WC(n,t,kt),n!==null){De=n;return}if(t=t.sibling,t!==null){De=t;return}De=t=e}while(t!==null);Ie===0&&(Ie=5)}function ei(e,t,n){var r=ie,i=zt.transition;try{zt.transition=null,ie=1,eT(e,t,n,r)}finally{zt.transition=i,ie=r}return null}function eT(e,t,n,r){do wo();while(ur!==null);if(Z&6)throw Error(O(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(O(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(LS(e,o),e===ze&&(De=ze=null,Ue=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Qa||(Qa=!0,A1(ec,function(){return wo(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=zt.transition,zt.transition=null;var a=ie;ie=1;var l=Z;Z|=4,If.current=null,GC(e,n),b1(n,e),wC(Bh),nc=!!zh,Bh=zh=null,e.current=n,qC(n),CS(),Z=l,ie=a,zt.transition=o}else e.current=n;if(Qa&&(Qa=!1,ur=e,yc=i),o=e.pendingLanes,o===0&&(vr=null),ES(n.stateNode),yt(e,Te()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(xc)throw xc=!1,e=ap,ap=null,e;return yc&1&&e.tag!==0&&wo(),o=e.pendingLanes,o&1?e===lp?Os++:(Os=0,lp=e):Os=0,Dr(),null}function wo(){if(ur!==null){var e=aw(yc),t=zt.transition,n=ie;try{if(zt.transition=null,ie=16>e?16:e,ur===null)var r=!1;else{if(e=ur,ur=null,yc=0,Z&6)throw Error(O(331));var i=Z;for(Z|=4,V=e.current;V!==null;){var o=V,a=o.child;if(V.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(V=u;V!==null;){var d=V;switch(d.tag){case 0:case 11:case 15:Ls(8,d,o)}var h=d.child;if(h!==null)h.return=d,V=h;else for(;V!==null;){d=V;var f=d.sibling,g=d.return;if(y1(d),d===u){V=null;break}if(f!==null){f.return=g,V=f;break}V=g}}}var m=o.alternate;if(m!==null){var b=m.child;if(b!==null){m.child=null;do{var j=b.sibling;b.sibling=null,b=j}while(b!==null)}}V=o}}if(o.subtreeFlags&2064&&a!==null)a.return=o,V=a;else e:for(;V!==null;){if(o=V,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Ls(9,o,o.return)}var x=o.sibling;if(x!==null){x.return=o.return,V=x;break e}V=o.return}}var v=e.current;for(V=v;V!==null;){a=V;var w=a.child;if(a.subtreeFlags&2064&&w!==null)w.return=a,V=w;else e:for(a=v;V!==null;){if(l=V,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:tu(9,l)}}catch(k){je(l,l.return,k)}if(l===a){V=null;break e}var S=l.sibling;if(S!==null){S.return=l.return,V=S;break e}V=l.return}}if(Z=i,Dr(),xn&&typeof xn.onPostCommitFiberRoot=="function")try{xn.onPostCommitFiberRoot(Yc,e)}catch{}r=!0}return r}finally{ie=n,zt.transition=t}}return!1}function x0(e,t,n){t=Eo(n,t),t=a1(e,t,1),e=yr(e,t,1),t=ot(),e!==null&&(ma(e,1,t),yt(e,t))}function je(e,t,n){if(e.tag===3)x0(e,e,n);else for(;t!==null;){if(t.tag===3){x0(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(vr===null||!vr.has(r))){e=Eo(n,e),e=l1(t,e,1),t=yr(t,e,1),e=ot(),t!==null&&(ma(t,1,e),yt(t,e));break}}t=t.return}}function tT(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ot(),e.pingedLanes|=e.suspendedLanes&n,ze===e&&(Ue&n)===n&&(Ie===4||Ie===3&&(Ue&130023424)===Ue&&500>Te()-Ff?ui(e,0):Of|=n),yt(e,t)}function E1(e,t){t===0&&(e.mode&1?(t=za,za<<=1,!(za&130023424)&&(za=4194304)):t=1);var n=ot();e=Un(e,t),e!==null&&(ma(e,t,n),yt(e,n))}function nT(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),E1(e,n)}function rT(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(O(314))}r!==null&&r.delete(t),E1(e,n)}var P1;P1=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||gt.current)ft=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ft=!1,UC(e,t,n);ft=!!(e.flags&131072)}else ft=!1,fe&&t.flags&1048576&&Mw(t,cc,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Rl(e,t),e=t.pendingProps;var i=So(t,Je.current);vo(t,n),i=Af(null,t,r,e,i,n);var o=Df();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,xt(r)?(o=!0,ac(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Cf(t),i.updater=eu,t.stateNode=i,i._reactInternals=t,Qh(t,r,e,n),t=Jh(null,t,r,!0,o,n)):(t.tag=0,fe&&o&&yf(t),nt(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Rl(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=oT(r),e=Xt(r,e),i){case 0:t=Zh(null,t,r,e,n);break e;case 1:t=a0(null,t,r,e,n);break e;case 11:t=o0(null,t,r,e,n);break e;case 14:t=s0(null,t,r,Xt(r.type,e),n);break e}throw Error(O(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xt(r,i),Zh(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xt(r,i),a0(e,t,r,i,n);case 3:e:{if(h1(t),e===null)throw Error(O(387));r=t.pendingProps,o=t.memoizedState,i=o.element,_w(e,t),hc(t,r,null,n);var a=t.memoizedState;if(r=a.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=Eo(Error(O(423)),t),t=l0(e,t,r,n,i);break e}else if(r!==i){i=Eo(Error(O(424)),t),t=l0(e,t,r,n,i);break e}else for(St=xr(t.stateNode.containerInfo.firstChild),Ct=t,fe=!0,Jt=null,n=Fw(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Co(),r===i){t=Wn(e,t,n);break e}nt(e,t,r,n)}t=t.child}return t;case 5:return zw(t),e===null&&Yh(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,Vh(r,i)?a=null:o!==null&&Vh(r,o)&&(t.flags|=32),d1(e,t),nt(e,t,a,n),t.child;case 6:return e===null&&Yh(t),null;case 13:return p1(e,t,n);case 4:return Tf(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=To(t,null,r,n):nt(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xt(r,i),o0(e,t,r,i,n);case 7:return nt(e,t,t.pendingProps,n),t.child;case 8:return nt(e,t,t.pendingProps.children,n),t.child;case 12:return nt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,a=i.value,ae(uc,r._currentValue),r._currentValue=a,o!==null)if(on(o.value,a)){if(o.children===i.children&&!gt.current){t=Wn(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){a=o.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(o.tag===1){c=On(-1,n&-n),c.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Gh(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)a=o.type===t.type?null:o.child;else if(o.tag===18){if(a=o.return,a===null)throw Error(O(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Gh(a,n,t),a=o.sibling}else a=o.child;if(a!==null)a.return=o;else for(a=o;a!==null;){if(a===t){a=null;break}if(o=a.sibling,o!==null){o.return=a.return,a=o;break}a=a.return}o=a}nt(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,vo(t,n),i=Bt(i),r=r(i),t.flags|=1,nt(e,t,r,n),t.child;case 14:return r=t.type,i=Xt(r,t.pendingProps),i=Xt(r.type,i),s0(e,t,r,i,n);case 15:return c1(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xt(r,i),Rl(e,t),t.tag=1,xt(r)?(e=!0,ac(t)):e=!1,vo(t,n),s1(t,r,i),Qh(t,r,i,n),Jh(null,t,r,!0,e,n);case 19:return f1(e,t,n);case 22:return u1(e,t,n)}throw Error(O(156,t.tag))};function A1(e,t){return rw(e,t)}function iT(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function _t(e,t,n,r){return new iT(e,t,n,r)}function Bf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function oT(e){if(typeof e=="function")return Bf(e)?1:0;if(e!=null){if(e=e.$$typeof,e===sf)return 11;if(e===af)return 14}return 2}function br(e,t){var n=e.alternate;return n===null?(n=_t(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Il(e,t,n,r,i,o){var a=2;if(r=e,typeof e=="function")Bf(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Qi:return di(n.children,i,o,t);case of:a=8,i|=8;break;case wh:return e=_t(12,n,t,i|2),e.elementType=wh,e.lanes=o,e;case bh:return e=_t(13,n,t,i),e.elementType=bh,e.lanes=o,e;case jh:return e=_t(19,n,t,i),e.elementType=jh,e.lanes=o,e;case zv:return ru(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Nv:a=10;break e;case _v:a=9;break e;case sf:a=11;break e;case af:a=14;break e;case ir:a=16,r=null;break e}throw Error(O(130,e==null?e:typeof e,""))}return t=_t(a,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function di(e,t,n,r){return e=_t(7,e,r,t),e.lanes=n,e}function ru(e,t,n,r){return e=_t(22,e,r,t),e.elementType=zv,e.lanes=n,e.stateNode={isHidden:!1},e}function sd(e,t,n){return e=_t(6,e,null,t),e.lanes=n,e}function ad(e,t,n){return t=_t(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function sT(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bu(0),this.expirationTimes=Bu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bu(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Vf(e,t,n,r,i,o,a,l,c){return e=new sT(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=_t(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Cf(o),e}function aT(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:qi,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function D1(e){if(!e)return Cr;e=e._reactInternals;e:{if(Ti(e)!==e||e.tag!==1)throw Error(O(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(xt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(O(171))}if(e.tag===1){var n=e.type;if(xt(n))return Dw(e,n,t)}return t}function R1(e,t,n,r,i,o,a,l,c){return e=Vf(n,r,!0,e,i,o,a,l,c),e.context=D1(null),n=e.current,r=ot(),i=wr(n),o=On(r,i),o.callback=t??null,yr(n,o,i),e.current.lanes=i,ma(e,i,r),yt(e,r),e}function iu(e,t,n,r){var i=t.current,o=ot(),a=wr(i);return n=D1(n),t.context===null?t.context=n:t.pendingContext=n,t=On(o,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=yr(i,t,a),e!==null&&(nn(e,i,a,o),Pl(e,i,a)),a}function wc(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function y0(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Hf(e,t){y0(e,t),(e=e.alternate)&&y0(e,t)}function lT(){return null}var M1=typeof reportError=="function"?reportError:function(e){console.error(e)};function Uf(e){this._internalRoot=e}ou.prototype.render=Uf.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(O(409));iu(e,t,null,null)};ou.prototype.unmount=Uf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;wi(function(){iu(null,e,null,null)}),t[Hn]=null}};function ou(e){this._internalRoot=e}ou.prototype.unstable_scheduleHydration=function(e){if(e){var t=uw();e={blockedOn:null,target:e,priority:t};for(var n=0;n<sr.length&&t!==0&&t<sr[n].priority;n++);sr.splice(n,0,e),n===0&&hw(e)}};function Wf(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function su(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function v0(){}function cT(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=wc(a);o.call(u)}}var a=R1(t,r,e,0,null,!1,!1,"",v0);return e._reactRootContainer=a,e[Hn]=a.current,Qs(e.nodeType===8?e.parentNode:e),wi(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var u=wc(c);l.call(u)}}var c=Vf(e,0,!1,null,null,!1,!1,"",v0);return e._reactRootContainer=c,e[Hn]=c.current,Qs(e.nodeType===8?e.parentNode:e),wi(function(){iu(t,c,n,r)}),c}function au(e,t,n,r,i){var o=n._reactRootContainer;if(o){var a=o;if(typeof i=="function"){var l=i;i=function(){var c=wc(a);l.call(c)}}iu(t,a,e,i)}else a=cT(n,t,e,i,r);return wc(a)}lw=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=bs(t.pendingLanes);n!==0&&(uf(t,n|1),yt(t,Te()),!(Z&6)&&(Po=Te()+500,Dr()))}break;case 13:wi(function(){var r=Un(e,1);if(r!==null){var i=ot();nn(r,e,1,i)}}),Hf(e,1)}};df=function(e){if(e.tag===13){var t=Un(e,134217728);if(t!==null){var n=ot();nn(t,e,134217728,n)}Hf(e,134217728)}};cw=function(e){if(e.tag===13){var t=wr(e),n=Un(e,t);if(n!==null){var r=ot();nn(n,e,t,r)}Hf(e,t)}};uw=function(){return ie};dw=function(e,t){var n=ie;try{return ie=e,t()}finally{ie=n}};Rh=function(e,t,n){switch(t){case"input":if(Ch(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Xc(r);if(!i)throw Error(O(90));Vv(r),Ch(r,i)}}}break;case"textarea":Uv(e,n);break;case"select":t=n.value,t!=null&&mo(e,!!n.multiple,t,!1)}};Xv=Nf;Zv=wi;var uT={usingClientEntryPoint:!1,Events:[xa,eo,Xc,qv,Qv,Nf]},as={findFiberByHostInstance:ri,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},dT={bundleType:as.bundleType,version:as.version,rendererPackageName:as.rendererPackageName,rendererConfig:as.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:qn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=tw(e),e===null?null:e.stateNode},findFiberByHostInstance:as.findFiberByHostInstance||lT,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xa.isDisabled&&Xa.supportsFiber)try{Yc=Xa.inject(dT),xn=Xa}catch{}}At.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=uT;At.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wf(t))throw Error(O(200));return aT(e,t,null,n)};At.createRoot=function(e,t){if(!Wf(e))throw Error(O(299));var n=!1,r="",i=M1;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Vf(e,1,!1,null,null,n,!1,r,i),e[Hn]=t.current,Qs(e.nodeType===8?e.parentNode:e),new Uf(t)};At.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(O(188)):(e=Object.keys(e).join(","),Error(O(268,e)));return e=tw(t),e=e===null?null:e.stateNode,e};At.flushSync=function(e){return wi(e)};At.hydrate=function(e,t,n){if(!su(t))throw Error(O(200));return au(null,e,t,!0,n)};At.hydrateRoot=function(e,t,n){if(!Wf(e))throw Error(O(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",a=M1;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=R1(t,null,e,1,n??null,i,!1,o,a),e[Hn]=t.current,Qs(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new ou(t)};At.render=function(e,t,n){if(!su(t))throw Error(O(200));return au(null,e,t,!1,n)};At.unmountComponentAtNode=function(e){if(!su(e))throw Error(O(40));return e._reactRootContainer?(wi(function(){au(null,null,e,!1,function(){e._reactRootContainer=null,e[Hn]=null})}),!0):!1};At.unstable_batchedUpdates=Nf;At.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!su(n))throw Error(O(200));if(e==null||e._reactInternals===void 0)throw Error(O(38));return au(e,t,n,!1,r)};At.version="18.3.1-next-f1338f8080-20240426";function L1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(L1)}catch(e){console.error(e)}}L1(),Lv.exports=At;var hT=Lv.exports,w0=hT;yh.createRoot=w0.createRoot,yh.hydrateRoot=w0.hydrateRoot;var _e=function(){return _e=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},_e.apply(this,arguments)};function oa(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,o;r<i;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))}var ue="-ms-",Fs="-moz-",ne="-webkit-",I1="comm",lu="rule",Kf="decl",pT="@import",O1="@keyframes",fT="@layer",F1=Math.abs,Yf=String.fromCharCode,dp=Object.assign;function mT(e,t){return Ne(e,0)^45?(((t<<2^Ne(e,0))<<2^Ne(e,1))<<2^Ne(e,2))<<2^Ne(e,3):0}function N1(e){return e.trim()}function Dn(e,t){return(e=t.exec(e))?e[0]:e}function q(e,t,n){return e.replace(t,n)}function Ol(e,t,n){return e.indexOf(t,n)}function Ne(e,t){return e.charCodeAt(t)|0}function Ao(e,t,n){return e.slice(t,n)}function hn(e){return e.length}function _1(e){return e.length}function ks(e,t){return t.push(e),e}function gT(e,t){return e.map(t).join("")}function b0(e,t){return e.filter(function(n){return!Dn(n,t)})}var cu=1,Do=1,z1=0,Ht=0,Ae=0,Vo="";function uu(e,t,n,r,i,o,a,l){return{value:e,root:t,parent:n,type:r,props:i,children:o,line:cu,column:Do,length:a,return:"",siblings:l}}function nr(e,t){return dp(uu("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Mi(e){for(;e.root;)e=nr(e.root,{children:[e]});ks(e,e.siblings)}function xT(){return Ae}function yT(){return Ae=Ht>0?Ne(Vo,--Ht):0,Do--,Ae===10&&(Do=1,cu--),Ae}function rn(){return Ae=Ht<z1?Ne(Vo,Ht++):0,Do++,Ae===10&&(Do=1,cu++),Ae}function hi(){return Ne(Vo,Ht)}function Fl(){return Ht}function du(e,t){return Ao(Vo,e,t)}function hp(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function vT(e){return cu=Do=1,z1=hn(Vo=e),Ht=0,[]}function wT(e){return Vo="",e}function ld(e){return N1(du(Ht-1,pp(e===91?e+2:e===40?e+1:e)))}function bT(e){for(;(Ae=hi())&&Ae<33;)rn();return hp(e)>2||hp(Ae)>3?"":" "}function jT(e,t){for(;--t&&rn()&&!(Ae<48||Ae>102||Ae>57&&Ae<65||Ae>70&&Ae<97););return du(e,Fl()+(t<6&&hi()==32&&rn()==32))}function pp(e){for(;rn();)switch(Ae){case e:return Ht;case 34:case 39:e!==34&&e!==39&&pp(Ae);break;case 40:e===41&&pp(e);break;case 92:rn();break}return Ht}function kT(e,t){for(;rn()&&e+Ae!==57;)if(e+Ae===84&&hi()===47)break;return"/*"+du(t,Ht-1)+"*"+Yf(e===47?e:rn())}function ST(e){for(;!hp(hi());)rn();return du(e,Ht)}function CT(e){return wT(Nl("",null,null,null,[""],e=vT(e),0,[0],e))}function Nl(e,t,n,r,i,o,a,l,c){for(var u=0,d=0,h=a,f=0,g=0,m=0,b=1,j=1,x=1,v=0,w="",S=i,k=o,T=r,C=w;j;)switch(m=v,v=rn()){case 40:if(m!=108&&Ne(C,h-1)==58){Ol(C+=q(ld(v),"&","&\f"),"&\f",F1(u?l[u-1]:0))!=-1&&(x=-1);break}case 34:case 39:case 91:C+=ld(v);break;case 9:case 10:case 13:case 32:C+=bT(m);break;case 92:C+=jT(Fl()-1,7);continue;case 47:switch(hi()){case 42:case 47:ks(TT(kT(rn(),Fl()),t,n,c),c);break;default:C+="/"}break;case 123*b:l[u++]=hn(C)*x;case 125*b:case 59:case 0:switch(v){case 0:case 125:j=0;case 59+d:x==-1&&(C=q(C,/\f/g,"")),g>0&&hn(C)-h&&ks(g>32?k0(C+";",r,n,h-1,c):k0(q(C," ","")+";",r,n,h-2,c),c);break;case 59:C+=";";default:if(ks(T=j0(C,t,n,u,d,i,l,w,S=[],k=[],h,o),o),v===123)if(d===0)Nl(C,t,T,T,S,o,h,l,k);else switch(f===99&&Ne(C,3)===110?100:f){case 100:case 108:case 109:case 115:Nl(e,T,T,r&&ks(j0(e,T,T,0,0,i,l,w,i,S=[],h,k),k),i,k,h,l,r?S:k);break;default:Nl(C,T,T,T,[""],k,0,l,k)}}u=d=g=0,b=x=1,w=C="",h=a;break;case 58:h=1+hn(C),g=m;default:if(b<1){if(v==123)--b;else if(v==125&&b++==0&&yT()==125)continue}switch(C+=Yf(v),v*b){case 38:x=d>0?1:(C+="\f",-1);break;case 44:l[u++]=(hn(C)-1)*x,x=1;break;case 64:hi()===45&&(C+=ld(rn())),f=hi(),d=h=hn(w=C+=ST(Fl())),v++;break;case 45:m===45&&hn(C)==2&&(b=0)}}return o}function j0(e,t,n,r,i,o,a,l,c,u,d,h){for(var f=i-1,g=i===0?o:[""],m=_1(g),b=0,j=0,x=0;b<r;++b)for(var v=0,w=Ao(e,f+1,f=F1(j=a[b])),S=e;v<m;++v)(S=N1(j>0?g[v]+" "+w:q(w,/&\f/g,g[v])))&&(c[x++]=S);return uu(e,t,n,i===0?lu:l,c,u,d,h)}function TT(e,t,n,r){return uu(e,t,n,I1,Yf(xT()),Ao(e,2,-2),0,r)}function k0(e,t,n,r,i){return uu(e,t,n,Kf,Ao(e,0,r),Ao(e,r+1,-1),r,i)}function B1(e,t,n){switch(mT(e,t)){case 5103:return ne+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return ne+e+e;case 4789:return Fs+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return ne+e+Fs+e+ue+e+e;case 5936:switch(Ne(e,t+11)){case 114:return ne+e+ue+q(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return ne+e+ue+q(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return ne+e+ue+q(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return ne+e+ue+e+e;case 6165:return ne+e+ue+"flex-"+e+e;case 5187:return ne+e+q(e,/(\w+).+(:[^]+)/,ne+"box-$1$2"+ue+"flex-$1$2")+e;case 5443:return ne+e+ue+"flex-item-"+q(e,/flex-|-self/g,"")+(Dn(e,/flex-|baseline/)?"":ue+"grid-row-"+q(e,/flex-|-self/g,""))+e;case 4675:return ne+e+ue+"flex-line-pack"+q(e,/align-content|flex-|-self/g,"")+e;case 5548:return ne+e+ue+q(e,"shrink","negative")+e;case 5292:return ne+e+ue+q(e,"basis","preferred-size")+e;case 6060:return ne+"box-"+q(e,"-grow","")+ne+e+ue+q(e,"grow","positive")+e;case 4554:return ne+q(e,/([^-])(transform)/g,"$1"+ne+"$2")+e;case 6187:return q(q(q(e,/(zoom-|grab)/,ne+"$1"),/(image-set)/,ne+"$1"),e,"")+e;case 5495:case 3959:return q(e,/(image-set\([^]*)/,ne+"$1$`$1");case 4968:return q(q(e,/(.+:)(flex-)?(.*)/,ne+"box-pack:$3"+ue+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+ne+e+e;case 4200:if(!Dn(e,/flex-|baseline/))return ue+"grid-column-align"+Ao(e,t)+e;break;case 2592:case 3360:return ue+q(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,i){return t=i,Dn(r.props,/grid-\w+-end/)})?~Ol(e+(n=n[t].value),"span",0)?e:ue+q(e,"-start","")+e+ue+"grid-row-span:"+(~Ol(n,"span",0)?Dn(n,/\d+/):+Dn(n,/\d+/)-+Dn(e,/\d+/))+";":ue+q(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return Dn(r.props,/grid-\w+-start/)})?e:ue+q(q(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return q(e,/(.+)-inline(.+)/,ne+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(hn(e)-1-t>6)switch(Ne(e,t+1)){case 109:if(Ne(e,t+4)!==45)break;case 102:return q(e,/(.+:)(.+)-([^]+)/,"$1"+ne+"$2-$3$1"+Fs+(Ne(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ol(e,"stretch",0)?B1(q(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return q(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,i,o,a,l,c,u){return ue+i+":"+o+u+(a?ue+i+"-span:"+(l?c:+c-+o)+u:"")+e});case 4949:if(Ne(e,t+6)===121)return q(e,":",":"+ne)+e;break;case 6444:switch(Ne(e,Ne(e,14)===45?18:11)){case 120:return q(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+ne+(Ne(e,14)===45?"inline-":"")+"box$3$1"+ne+"$2$3$1"+ue+"$2box$3")+e;case 100:return q(e,":",":"+ue)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return q(e,"scroll-","scroll-snap-")+e}return e}function bc(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function $T(e,t,n,r){switch(e.type){case fT:if(e.children.length)break;case pT:case Kf:return e.return=e.return||e.value;case I1:return"";case O1:return e.return=e.value+"{"+bc(e.children,r)+"}";case lu:if(!hn(e.value=e.props.join(",")))return""}return hn(n=bc(e.children,r))?e.return=e.value+"{"+n+"}":""}function ET(e){var t=_1(e);return function(n,r,i,o){for(var a="",l=0;l<t;l++)a+=e[l](n,r,i,o)||"";return a}}function PT(e){return function(t){t.root||(t=t.return)&&e(t)}}function AT(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Kf:e.return=B1(e.value,e.length,n);return;case O1:return bc([nr(e,{value:q(e.value,"@","@"+ne)})],r);case lu:if(e.length)return gT(n=e.props,function(i){switch(Dn(i,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Mi(nr(e,{props:[q(i,/:(read-\w+)/,":"+Fs+"$1")]})),Mi(nr(e,{props:[i]})),dp(e,{props:b0(n,r)});break;case"::placeholder":Mi(nr(e,{props:[q(i,/:(plac\w+)/,":"+ne+"input-$1")]})),Mi(nr(e,{props:[q(i,/:(plac\w+)/,":"+Fs+"$1")]})),Mi(nr(e,{props:[q(i,/:(plac\w+)/,ue+"input-$1")]})),Mi(nr(e,{props:[i]})),dp(e,{props:b0(n,r)});break}return""})}}var DT={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},jt={},Ro=typeof process<"u"&&jt!==void 0&&(jt.REACT_APP_SC_ATTR||jt.SC_ATTR)||"data-styled",V1="active",H1="data-styled-version",hu="6.1.19",Gf=`/*!sc*/
`,jc=typeof window<"u"&&typeof document<"u",RT=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&jt!==void 0&&jt.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&jt.REACT_APP_SC_DISABLE_SPEEDY!==""?jt.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&jt.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&jt!==void 0&&jt.SC_DISABLE_SPEEDY!==void 0&&jt.SC_DISABLE_SPEEDY!==""&&jt.SC_DISABLE_SPEEDY!=="false"&&jt.SC_DISABLE_SPEEDY),MT={},pu=Object.freeze([]),Mo=Object.freeze({});function U1(e,t,n){return n===void 0&&(n=Mo),e.theme!==n.theme&&e.theme||t||n.theme}var W1=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),LT=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,IT=/(^-|-$)/g;function S0(e){return e.replace(LT,"-").replace(IT,"")}var OT=/(a)(d)/gi,Za=52,C0=function(e){return String.fromCharCode(e+(e>25?39:97))};function fp(e){var t,n="";for(t=Math.abs(e);t>Za;t=t/Za|0)n=C0(t%Za)+n;return(C0(t%Za)+n).replace(OT,"$1-$2")}var cd,K1=5381,ao=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Y1=function(e){return ao(K1,e)};function G1(e){return fp(Y1(e)>>>0)}function FT(e){return e.displayName||e.name||"Component"}function ud(e){return typeof e=="string"&&!0}var q1=typeof Symbol=="function"&&Symbol.for,Q1=q1?Symbol.for("react.memo"):60115,NT=q1?Symbol.for("react.forward_ref"):60112,_T={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},zT={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},X1={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},BT=((cd={})[NT]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},cd[Q1]=X1,cd);function T0(e){return("type"in(t=e)&&t.type.$$typeof)===Q1?X1:"$$typeof"in e?BT[e.$$typeof]:_T;var t}var VT=Object.defineProperty,HT=Object.getOwnPropertyNames,$0=Object.getOwnPropertySymbols,UT=Object.getOwnPropertyDescriptor,WT=Object.getPrototypeOf,E0=Object.prototype;function Z1(e,t,n){if(typeof t!="string"){if(E0){var r=WT(t);r&&r!==E0&&Z1(e,r,n)}var i=HT(t);$0&&(i=i.concat($0(t)));for(var o=T0(e),a=T0(t),l=0;l<i.length;++l){var c=i[l];if(!(c in zT||n&&n[c]||a&&c in a||o&&c in o)){var u=UT(t,c);try{VT(e,c,u)}catch{}}}}return e}function bi(e){return typeof e=="function"}function qf(e){return typeof e=="object"&&"styledComponentId"in e}function si(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function mp(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function sa(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function gp(e,t,n){if(n===void 0&&(n=!1),!n&&!sa(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=gp(e[r],t[r]);else if(sa(t))for(var r in t)e[r]=gp(e[r],t[r]);return e}function Qf(e,t){Object.defineProperty(e,"toString",{value:t})}function ji(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var KT=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,i=r.length,o=i;t>=o;)if((o<<=1)<0)throw ji(16,"".concat(t));this.groupSizes=new Uint32Array(o),this.groupSizes.set(r),this.length=o;for(var a=i;a<o;a++)this.groupSizes[a]=0}for(var l=this.indexOfGroup(t+1),c=(a=0,n.length);a<c;a++)this.tag.insertRule(l,n[a])&&(this.groupSizes[t]++,l++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),i=r+n;this.groupSizes[t]=0;for(var o=r;o<i;o++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],i=this.indexOfGroup(t),o=i+r,a=i;a<o;a++)n+="".concat(this.tag.getRule(a)).concat(Gf);return n},e}(),_l=new Map,kc=new Map,zl=1,Ja=function(e){if(_l.has(e))return _l.get(e);for(;kc.has(zl);)zl++;var t=zl++;return _l.set(e,t),kc.set(t,e),t},YT=function(e,t){zl=t+1,_l.set(e,t),kc.set(t,e)},GT="style[".concat(Ro,"][").concat(H1,'="').concat(hu,'"]'),qT=new RegExp("^".concat(Ro,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),QT=function(e,t,n){for(var r,i=n.split(","),o=0,a=i.length;o<a;o++)(r=i[o])&&e.registerName(t,r)},XT=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Gf),i=[],o=0,a=r.length;o<a;o++){var l=r[o].trim();if(l){var c=l.match(qT);if(c){var u=0|parseInt(c[1],10),d=c[2];u!==0&&(YT(d,u),QT(e,d,c[3]),e.getTag().insertRules(u,i)),i.length=0}else i.push(l)}}},P0=function(e){for(var t=document.querySelectorAll(GT),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(Ro)!==V1&&(XT(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function ZT(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var J1=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(l){var c=Array.from(l.querySelectorAll("style[".concat(Ro,"]")));return c[c.length-1]}(n),o=i!==void 0?i.nextSibling:null;r.setAttribute(Ro,V1),r.setAttribute(H1,hu);var a=ZT();return a&&r.setAttribute("nonce",a),n.insertBefore(r,o),r},JT=function(){function e(t){this.element=J1(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,i=0,o=r.length;i<o;i++){var a=r[i];if(a.ownerNode===n)return a}throw ji(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),e5=function(){function e(t){this.element=J1(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),t5=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),A0=jc,n5={isServer:!jc,useCSSOMInjection:!RT},Sc=function(){function e(t,n,r){t===void 0&&(t=Mo),n===void 0&&(n={});var i=this;this.options=_e(_e({},n5),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&jc&&A0&&(A0=!1,P0(this)),Qf(this,function(){return function(o){for(var a=o.getTag(),l=a.length,c="",u=function(h){var f=function(x){return kc.get(x)}(h);if(f===void 0)return"continue";var g=o.names.get(f),m=a.getGroup(h);if(g===void 0||!g.size||m.length===0)return"continue";var b="".concat(Ro,".g").concat(h,'[id="').concat(f,'"]'),j="";g!==void 0&&g.forEach(function(x){x.length>0&&(j+="".concat(x,","))}),c+="".concat(m).concat(b,'{content:"').concat(j,'"}').concat(Gf)},d=0;d<l;d++)u(d);return c}(i)})}return e.registerId=function(t){return Ja(t)},e.prototype.rehydrate=function(){!this.server&&jc&&P0(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(_e(_e({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,i=n.target;return n.isServer?new t5(i):r?new JT(i):new e5(i)}(this.options),new KT(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(Ja(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(Ja(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Ja(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),r5=/&/g,i5=/^\s*\/\/.*$/gm;function eb(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=eb(n.children,t)),n})}function o5(e){var t,n,r,i=Mo,o=i.options,a=o===void 0?Mo:o,l=i.plugins,c=l===void 0?pu:l,u=function(f,g,m){return m.startsWith(n)&&m.endsWith(n)&&m.replaceAll(n,"").length>0?".".concat(t):f},d=c.slice();d.push(function(f){f.type===lu&&f.value.includes("&")&&(f.props[0]=f.props[0].replace(r5,n).replace(r,u))}),a.prefix&&d.push(AT),d.push($T);var h=function(f,g,m,b){g===void 0&&(g=""),m===void 0&&(m=""),b===void 0&&(b="&"),t=b,n=g,r=new RegExp("\\".concat(n,"\\b"),"g");var j=f.replace(i5,""),x=CT(m||g?"".concat(m," ").concat(g," { ").concat(j," }"):j);a.namespace&&(x=eb(x,a.namespace));var v=[];return bc(x,ET(d.concat(PT(function(w){return v.push(w)})))),v};return h.hash=c.length?c.reduce(function(f,g){return g.name||ji(15),ao(f,g.name)},K1).toString():"",h}var s5=new Sc,xp=o5(),tb=pt.createContext({shouldForwardProp:void 0,styleSheet:s5,stylis:xp});tb.Consumer;pt.createContext(void 0);function yp(){return y.useContext(tb)}var a5=function(){function e(t,n){var r=this;this.inject=function(i,o){o===void 0&&(o=xp);var a=r.name+o.hash;i.hasNameForId(r.id,a)||i.insertRules(r.id,a,o(r.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Qf(this,function(){throw ji(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=xp),this.name+t.hash},e}(),l5=function(e){return e>="A"&&e<="Z"};function D0(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;l5(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var nb=function(e){return e==null||e===!1||e===""},rb=function(e){var t,n,r=[];for(var i in e){var o=e[i];e.hasOwnProperty(i)&&!nb(o)&&(Array.isArray(o)&&o.isCss||bi(o)?r.push("".concat(D0(i),":"),o,";"):sa(o)?r.push.apply(r,oa(oa(["".concat(i," {")],rb(o),!1),["}"],!1)):r.push("".concat(D0(i),": ").concat((t=i,(n=o)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in DT||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function jr(e,t,n,r){if(nb(e))return[];if(qf(e))return[".".concat(e.styledComponentId)];if(bi(e)){if(!bi(o=e)||o.prototype&&o.prototype.isReactComponent||!t)return[e];var i=e(t);return jr(i,t,n,r)}var o;return e instanceof a5?n?(e.inject(n,r),[e.getName(r)]):[e]:sa(e)?rb(e):Array.isArray(e)?Array.prototype.concat.apply(pu,e.map(function(a){return jr(a,t,n,r)})):[e.toString()]}function ib(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(bi(n)&&!qf(n))return!1}return!0}var c5=Y1(hu),u5=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&ib(t),this.componentId=n,this.baseHash=ao(c5,n),this.baseStyle=r,Sc.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var i=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))i=si(i,this.staticRulesId);else{var o=mp(jr(this.rules,t,n,r)),a=fp(ao(this.baseHash,o)>>>0);if(!n.hasNameForId(this.componentId,a)){var l=r(o,".".concat(a),void 0,this.componentId);n.insertRules(this.componentId,a,l)}i=si(i,a),this.staticRulesId=a}else{for(var c=ao(this.baseHash,r.hash),u="",d=0;d<this.rules.length;d++){var h=this.rules[d];if(typeof h=="string")u+=h;else if(h){var f=mp(jr(h,t,n,r));c=ao(c,f+d),u+=f}}if(u){var g=fp(c>>>0);n.hasNameForId(this.componentId,g)||n.insertRules(this.componentId,g,r(u,".".concat(g),void 0,this.componentId)),i=si(i,g)}}return i},e}(),aa=pt.createContext(void 0);aa.Consumer;function ob(e){var t=pt.useContext(aa),n=y.useMemo(function(){return function(r,i){if(!r)throw ji(14);if(bi(r)){var o=r(i);return o}if(Array.isArray(r)||typeof r!="object")throw ji(8);return i?_e(_e({},i),r):r}(e.theme,t)},[e.theme,t]);return e.children?pt.createElement(aa.Provider,{value:n},e.children):null}var dd={};function d5(e,t,n){var r=qf(e),i=e,o=!ud(e),a=t.attrs,l=a===void 0?pu:a,c=t.componentId,u=c===void 0?function(S,k){var T=typeof S!="string"?"sc":S0(S);dd[T]=(dd[T]||0)+1;var C="".concat(T,"-").concat(G1(hu+T+dd[T]));return k?"".concat(k,"-").concat(C):C}(t.displayName,t.parentComponentId):c,d=t.displayName,h=d===void 0?function(S){return ud(S)?"styled.".concat(S):"Styled(".concat(FT(S),")")}(e):d,f=t.displayName&&t.componentId?"".concat(S0(t.displayName),"-").concat(t.componentId):t.componentId||u,g=r&&i.attrs?i.attrs.concat(l).filter(Boolean):l,m=t.shouldForwardProp;if(r&&i.shouldForwardProp){var b=i.shouldForwardProp;if(t.shouldForwardProp){var j=t.shouldForwardProp;m=function(S,k){return b(S,k)&&j(S,k)}}else m=b}var x=new u5(n,f,r?i.componentStyle:void 0);function v(S,k){return function(T,C,E){var P=T.attrs,A=T.componentStyle,M=T.defaultProps,Y=T.foldedComponentIds,X=T.styledComponentId,_=T.target,N=pt.useContext(aa),F=yp(),D=T.shouldForwardProp||F.shouldForwardProp,$=U1(C,N,M)||Mo,L=function(pe,ge,Re){for(var Yt,tt=_e(_e({},ge),{className:void 0,theme:Re}),Oe=0;Oe<pe.length;Oe+=1){var bt=bi(Yt=pe[Oe])?Yt(tt):Yt;for(var ut in bt)tt[ut]=ut==="className"?si(tt[ut],bt[ut]):ut==="style"?_e(_e({},tt[ut]),bt[ut]):bt[ut]}return ge.className&&(tt.className=si(tt.className,ge.className)),tt}(P,C,$),I=L.as||_,B={};for(var z in L)L[z]===void 0||z[0]==="$"||z==="as"||z==="theme"&&L.theme===$||(z==="forwardedAs"?B.as=L.forwardedAs:D&&!D(z,I)||(B[z]=L[z]));var G=function(pe,ge){var Re=yp(),Yt=pe.generateAndInjectStyles(ge,Re.styleSheet,Re.stylis);return Yt}(A,L),ee=si(Y,X);return G&&(ee+=" "+G),L.className&&(ee+=" "+L.className),B[ud(I)&&!W1.has(I)?"class":"className"]=ee,E&&(B.ref=E),y.createElement(I,B)}(w,S,k)}v.displayName=h;var w=pt.forwardRef(v);return w.attrs=g,w.componentStyle=x,w.displayName=h,w.shouldForwardProp=m,w.foldedComponentIds=r?si(i.foldedComponentIds,i.styledComponentId):"",w.styledComponentId=f,w.target=r?i.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(S){this._foldedDefaultProps=r?function(k){for(var T=[],C=1;C<arguments.length;C++)T[C-1]=arguments[C];for(var E=0,P=T;E<P.length;E++)gp(k,P[E],!0);return k}({},i.defaultProps,S):S}}),Qf(w,function(){return".".concat(w.styledComponentId)}),o&&Z1(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function R0(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var M0=function(e){return Object.assign(e,{isCss:!0})};function sb(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(bi(e)||sa(e))return M0(jr(R0(pu,oa([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?jr(r):M0(jr(R0(r,t)))}function vp(e,t,n){if(n===void 0&&(n=Mo),!t)throw ji(1,t);var r=function(i){for(var o=[],a=1;a<arguments.length;a++)o[a-1]=arguments[a];return e(t,n,sb.apply(void 0,oa([i],o,!1)))};return r.attrs=function(i){return vp(e,t,_e(_e({},n),{attrs:Array.prototype.concat(n.attrs,i).filter(Boolean)}))},r.withConfig=function(i){return vp(e,t,_e(_e({},n),i))},r}var ab=function(e){return vp(d5,e)},p=ab;W1.forEach(function(e){p[e]=ab(e)});var h5=function(){function e(t,n){this.rules=t,this.componentId=n,this.isStatic=ib(t),Sc.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,n,r,i){var o=i(mp(jr(this.rules,n,r,i)),""),a=this.componentId+t;r.insertRules(a,a,o)},e.prototype.removeStyles=function(t,n){n.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,n,r,i){t>2&&Sc.registerId(this.componentId+t),this.removeStyles(t,r),this.createStyles(t,n,r,i)},e}();function p5(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=sb.apply(void 0,oa([e],t,!1)),i="sc-global-".concat(G1(JSON.stringify(r))),o=new h5(r,i),a=function(c){var u=yp(),d=pt.useContext(aa),h=pt.useRef(u.styleSheet.allocateGSInstance(i)).current;return u.styleSheet.server&&l(h,c,u.styleSheet,d,u.stylis),pt.useLayoutEffect(function(){if(!u.styleSheet.server)return l(h,c,u.styleSheet,d,u.stylis),function(){return o.removeStyles(h,u.styleSheet)}},[h,c,u.styleSheet,d,u.stylis]),null};function l(c,u,d,h,f){if(o.isStatic)o.renderStyles(c,MT,d,f);else{var g=_e(_e({},u),{theme:U1(u,h,a.defaultProps)});o.renderStyles(c,g,d,f)}}return pt.memo(a)}const it={NAME:{MIN_LENGTH:2,MAX_LENGTH:50,PATTERN:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơ\s]+$/},EMAIL:{PATTERN:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},PHONE:{PATTERN:/^(0|\+84)[0-9]{9,10}$/,MIN_LENGTH:10,MAX_LENGTH:11},ADDRESS:{MIN_LENGTH:10,MAX_LENGTH:200}},Li={COLORS:{PRIMARY:"#ff6600",SECONDARY:"#ff8c00",SUCCESS:"#28a745",WARNING:"#ffc107",ERROR:"#dc3545",INFO:"#17a2b8"}},L0={VNPAY:"VNPay",CASH:"Cash"},ke={colors:{primary:Li.COLORS.PRIMARY,primaryLight:"#ff8533",primaryDark:"#e55a00",secondary:Li.COLORS.SECONDARY,secondaryLight:"#ffa726",secondaryDark:"#f57c00",success:Li.COLORS.SUCCESS,warning:Li.COLORS.WARNING,error:Li.COLORS.ERROR,info:Li.COLORS.INFO,background:"#FFFFFF",backgroundDark:"#121212",text:"#222222",textDark:"#EAEAEA",secondaryText:"#7C7D7E",textfield:"#F2F2F2",placeholder:"#B6B7B7",white:"#ffffff",card:"#ffffff",cardDark:"#1e1e1e",border:"#e5e5e5",borderDark:"#333333"},radius:{sm:"8px",md:"16px",lg:"22px"},shadow:{sm:"0 2px 10px rgba(0,0,0,0.06)",md:"0 6px 24px rgba(0,0,0,0.08)",dark:"0 6px 24px rgba(0,0,0,0.3)"},fontFamily:"Inter, Metropolis, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"}},lb=p5`
  :root {
    --primary: ${ke.colors.primary};
    --primary-light: ${ke.colors.primaryLight};
    --bg: ${ke.colors.background};
    --bg-dark: ${ke.colors.backgroundDark};
    --text: ${ke.colors.text};
    --text-dark: ${ke.colors.textDark};
    --card: ${ke.colors.card};
    --card-dark: ${ke.colors.cardDark};
    --border: ${ke.colors.border};
    --border-dark: ${ke.colors.borderDark};
    --radius: ${ke.radius.md};
    --shadow: ${ke.shadow.sm};
    --shadow-md: ${ke.shadow.md};
  }

  *, *::before, *::after { 
    box-sizing: border-box; 
  }
  
  html, body, #root { 
    height: 100%; 
  }
  
  body {
    margin: 0;
    font-family: ${ke.fontFamily};
    color: var(--text);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  [data-theme="dark"] {
    --bg: ${ke.colors.backgroundDark};
    --text: ${ke.colors.textDark};
    --card: ${ke.colors.cardDark};
    --border: ${ke.colors.borderDark};
    --shadow: ${ke.shadow.dark};
  }

  a { 
    color: inherit; 
    text-decoration: none; 
  }
  
  img { 
    display: block; 
    max-width: 100%; 
  }

  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius);
  }

  @keyframes shimmer {
    100% { 
      background-position: -200% 0; 
    }
  }

  [data-theme="dark"] .skeleton {
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
  }
`;/**
 * react-router v7.9.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var I0="popstate";function f5(e={}){function t(r,i){let{pathname:o,search:a,hash:l}=r.location;return wp("",{pathname:o,search:a,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:la(i)}return g5(t,n,null,e)}function me(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ut(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function m5(){return Math.random().toString(36).substring(2,10)}function O0(e,t){return{usr:e.state,key:e.key,idx:t}}function wp(e,t,n=null,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Ho(t):t,state:n,key:t&&t.key||r||m5()}}function la({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Ho(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function g5(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:o=!1}=r,a=i.history,l="POP",c=null,u=d();u==null&&(u=0,a.replaceState({...a.state,idx:u},""));function d(){return(a.state||{idx:null}).idx}function h(){l="POP";let j=d(),x=j==null?null:j-u;u=j,c&&c({action:l,location:b.location,delta:x})}function f(j,x){l="PUSH";let v=wp(b.location,j,x);u=d()+1;let w=O0(v,u),S=b.createHref(v);try{a.pushState(w,"",S)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;i.location.assign(S)}o&&c&&c({action:l,location:b.location,delta:1})}function g(j,x){l="REPLACE";let v=wp(b.location,j,x);u=d();let w=O0(v,u),S=b.createHref(v);a.replaceState(w,"",S),o&&c&&c({action:l,location:b.location,delta:0})}function m(j){return x5(j)}let b={get action(){return l},get location(){return e(i,a)},listen(j){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(I0,h),c=j,()=>{i.removeEventListener(I0,h),c=null}},createHref(j){return t(i,j)},createURL:m,encodeLocation(j){let x=m(j);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:f,replace:g,go(j){return a.go(j)}};return b}function x5(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),me(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:la(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function cb(e,t,n="/"){return y5(e,t,n,!1)}function y5(e,t,n,r){let i=typeof t=="string"?Ho(t):t,o=Kn(i.pathname||"/",n);if(o==null)return null;let a=ub(e);v5(a);let l=null;for(let c=0;l==null&&c<a.length;++c){let u=A5(o);l=E5(a[c],u,r)}return l}function ub(e,t=[],n=[],r="",i=!1){let o=(a,l,c=i,u)=>{let d={relativePath:u===void 0?a.path||"":u,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&c)return;me(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let h=Fn([r,d.relativePath]),f=n.concat(d);a.children&&a.children.length>0&&(me(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${h}".`),ub(a.children,t,f,h,c)),!(a.path==null&&!a.index)&&t.push({path:h,score:T5(h,a.index),routesMeta:f})};return e.forEach((a,l)=>{var c;if(a.path===""||!((c=a.path)!=null&&c.includes("?")))o(a,l);else for(let u of db(a.path))o(a,l,!0,u)}),t}function db(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return i?[o,""]:[o];let a=db(r.join("/")),l=[];return l.push(...a.map(c=>c===""?o:[o,c].join("/"))),i&&l.push(...a),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function v5(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:$5(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var w5=/^:[\w-]+$/,b5=3,j5=2,k5=1,S5=10,C5=-2,F0=e=>e==="*";function T5(e,t){let n=e.split("/"),r=n.length;return n.some(F0)&&(r+=C5),t&&(r+=j5),n.filter(i=>!F0(i)).reduce((i,o)=>i+(w5.test(o)?b5:o===""?k5:S5),r)}function $5(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function E5(e,t,n=!1){let{routesMeta:r}=e,i={},o="/",a=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,d=o==="/"?t:t.slice(o.length)||"/",h=Cc({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},d),f=c.route;if(!h&&u&&n&&!r[r.length-1].route.index&&(h=Cc({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},d)),!h)return null;Object.assign(i,h.params),a.push({params:i,pathname:Fn([o,h.pathname]),pathnameBase:L5(Fn([o,h.pathnameBase])),route:f}),h.pathnameBase!=="/"&&(o=Fn([o,h.pathnameBase]))}return a}function Cc(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=P5(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let o=i[0],a=o.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((u,{paramName:d,isOptional:h},f)=>{if(d==="*"){let m=l[f]||"";a=o.slice(0,o.length-m.length).replace(/(.)\/+$/,"$1")}const g=l[f];return h&&!g?u[d]=void 0:u[d]=(g||"").replace(/%2F/g,"/"),u},{}),pathname:o,pathnameBase:a,pattern:e}}function P5(e,t=!1,n=!0){Ut(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function A5(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ut(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Kn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function D5(e,t="/"){let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?Ho(e):e;return{pathname:n?n.startsWith("/")?n:R5(n,t):t,search:I5(r),hash:O5(i)}}function R5(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function hd(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function M5(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Xf(e){let t=M5(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Zf(e,t,n,r=!1){let i;typeof e=="string"?i=Ho(e):(i={...e},me(!i.pathname||!i.pathname.includes("?"),hd("?","pathname","search",i)),me(!i.pathname||!i.pathname.includes("#"),hd("#","pathname","hash",i)),me(!i.search||!i.search.includes("#"),hd("#","search","hash",i)));let o=e===""||i.pathname==="",a=o?"/":i.pathname,l;if(a==null)l=n;else{let h=t.length-1;if(!r&&a.startsWith("..")){let f=a.split("/");for(;f[0]==="..";)f.shift(),h-=1;i.pathname=f.join("/")}l=h>=0?t[h]:"/"}let c=D5(i,l),u=a&&a!=="/"&&a.endsWith("/"),d=(o||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}var Fn=e=>e.join("/").replace(/\/\/+/g,"/"),L5=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),I5=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,O5=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function F5(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var hb=["POST","PUT","PATCH","DELETE"];new Set(hb);var N5=["GET",...hb];new Set(N5);var Uo=y.createContext(null);Uo.displayName="DataRouter";var fu=y.createContext(null);fu.displayName="DataRouterState";y.createContext(!1);var pb=y.createContext({isTransitioning:!1});pb.displayName="ViewTransition";var _5=y.createContext(new Map);_5.displayName="Fetchers";var z5=y.createContext(null);z5.displayName="Await";var sn=y.createContext(null);sn.displayName="Navigation";var va=y.createContext(null);va.displayName="Location";var an=y.createContext({outlet:null,matches:[],isDataRoute:!1});an.displayName="Route";var Jf=y.createContext(null);Jf.displayName="RouteError";function B5(e,{relative:t}={}){me(Wo(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=y.useContext(sn),{hash:i,pathname:o,search:a}=wa(e,{relative:t}),l=o;return n!=="/"&&(l=o==="/"?n:Fn([n,o])),r.createHref({pathname:l,search:a,hash:i})}function Wo(){return y.useContext(va)!=null}function Rt(){return me(Wo(),"useLocation() may be used only in the context of a <Router> component."),y.useContext(va).location}var fb="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function mb(e){y.useContext(sn).static||y.useLayoutEffect(e)}function wt(){let{isDataRoute:e}=y.useContext(an);return e?t$():V5()}function V5(){me(Wo(),"useNavigate() may be used only in the context of a <Router> component.");let e=y.useContext(Uo),{basename:t,navigator:n}=y.useContext(sn),{matches:r}=y.useContext(an),{pathname:i}=Rt(),o=JSON.stringify(Xf(r)),a=y.useRef(!1);return mb(()=>{a.current=!0}),y.useCallback((c,u={})=>{if(Ut(a.current,fb),!a.current)return;if(typeof c=="number"){n.go(c);return}let d=Zf(c,JSON.parse(o),i,u.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:Fn([t,d.pathname])),(u.replace?n.replace:n.push)(d,u.state,u)},[t,n,o,i,e])}y.createContext(null);function H5(){let{matches:e}=y.useContext(an),t=e[e.length-1];return t?t.params:{}}function wa(e,{relative:t}={}){let{matches:n}=y.useContext(an),{pathname:r}=Rt(),i=JSON.stringify(Xf(n));return y.useMemo(()=>Zf(e,JSON.parse(i),r,t==="path"),[e,i,r,t])}function U5(e,t){return gb(e,t)}function gb(e,t,n,r,i){var v;me(Wo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:o}=y.useContext(sn),{matches:a}=y.useContext(an),l=a[a.length-1],c=l?l.params:{},u=l?l.pathname:"/",d=l?l.pathnameBase:"/",h=l&&l.route;{let w=h&&h.path||"";xb(u,!h||w.endsWith("*")||w.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${w}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${w}"> to <Route path="${w==="/"?"*":`${w}/*`}">.`)}let f=Rt(),g;if(t){let w=typeof t=="string"?Ho(t):t;me(d==="/"||((v=w.pathname)==null?void 0:v.startsWith(d)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${w.pathname}" was given in the \`location\` prop.`),g=w}else g=f;let m=g.pathname||"/",b=m;if(d!=="/"){let w=d.replace(/^\//,"").split("/");b="/"+m.replace(/^\//,"").split("/").slice(w.length).join("/")}let j=cb(e,{pathname:b});Ut(h||j!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Ut(j==null||j[j.length-1].route.element!==void 0||j[j.length-1].route.Component!==void 0||j[j.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let x=q5(j&&j.map(w=>Object.assign({},w,{params:Object.assign({},c,w.params),pathname:Fn([d,o.encodeLocation?o.encodeLocation(w.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?d:Fn([d,o.encodeLocation?o.encodeLocation(w.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:w.pathnameBase])})),a,n,r,i);return t&&x?y.createElement(va.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},x):x}function W5(){let e=e$(),t=F5(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:r},o={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=y.createElement(y.Fragment,null,y.createElement("p",null,"💿 Hey developer 👋"),y.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",y.createElement("code",{style:o},"ErrorBoundary")," or"," ",y.createElement("code",{style:o},"errorElement")," prop on your route.")),y.createElement(y.Fragment,null,y.createElement("h2",null,"Unexpected Application Error!"),y.createElement("h3",{style:{fontStyle:"italic"}},t),n?y.createElement("pre",{style:i},n):null,a)}var K5=y.createElement(W5,null),Y5=class extends y.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.unstable_onError?this.props.unstable_onError(e,t):console.error("React Router caught the following error during render",e)}render(){return this.state.error!==void 0?y.createElement(an.Provider,{value:this.props.routeContext},y.createElement(Jf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function G5({routeContext:e,match:t,children:n}){let r=y.useContext(Uo);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),y.createElement(an.Provider,{value:e},n)}function q5(e,t=[],n=null,r=null,i=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,a=n==null?void 0:n.errors;if(a!=null){let u=o.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);me(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),o=o.slice(0,Math.min(o.length,u+1))}let l=!1,c=-1;if(n)for(let u=0;u<o.length;u++){let d=o[u];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=u),d.route.id){let{loaderData:h,errors:f}=n,g=d.route.loader&&!h.hasOwnProperty(d.route.id)&&(!f||f[d.route.id]===void 0);if(d.route.lazy||g){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((u,d,h)=>{let f,g=!1,m=null,b=null;n&&(f=a&&d.route.id?a[d.route.id]:void 0,m=d.route.errorElement||K5,l&&(c<0&&h===0?(xb("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,b=null):c===h&&(g=!0,b=d.route.hydrateFallbackElement||null)));let j=t.concat(o.slice(0,h+1)),x=()=>{let v;return f?v=m:g?v=b:d.route.Component?v=y.createElement(d.route.Component,null):d.route.element?v=d.route.element:v=u,y.createElement(G5,{match:d,routeContext:{outlet:u,matches:j,isDataRoute:n!=null},children:v})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?y.createElement(Y5,{location:n.location,revalidation:n.revalidation,component:m,error:f,children:x(),routeContext:{outlet:null,matches:j,isDataRoute:!0},unstable_onError:r}):x()},null)}function em(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Q5(e){let t=y.useContext(Uo);return me(t,em(e)),t}function X5(e){let t=y.useContext(fu);return me(t,em(e)),t}function Z5(e){let t=y.useContext(an);return me(t,em(e)),t}function tm(e){let t=Z5(e),n=t.matches[t.matches.length-1];return me(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function J5(){return tm("useRouteId")}function e$(){var r;let e=y.useContext(Jf),t=X5("useRouteError"),n=tm("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function t$(){let{router:e}=Q5("useNavigate"),t=tm("useNavigate"),n=y.useRef(!1);return mb(()=>{n.current=!0}),y.useCallback(async(i,o={})=>{Ut(n.current,fb),n.current&&(typeof i=="number"?e.navigate(i):await e.navigate(i,{fromRouteId:t,...o}))},[e,t])}var N0={};function xb(e,t,n){!t&&!N0[e]&&(N0[e]=!0,Ut(!1,n))}y.memo(n$);function n$({routes:e,future:t,state:n,unstable_onError:r}){return gb(e,void 0,n,r,t)}function vn({to:e,replace:t,state:n,relative:r}){me(Wo(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=y.useContext(sn);Ut(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:o}=y.useContext(an),{pathname:a}=Rt(),l=wt(),c=Zf(e,Xf(o),a,r==="path"),u=JSON.stringify(c);return y.useEffect(()=>{l(JSON.parse(u),{replace:t,state:n,relative:r})},[l,u,r,t,n]),null}function re(e){me(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function r$({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:i,static:o=!1}){me(!Wo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),l=y.useMemo(()=>({basename:a,navigator:i,static:o,future:{}}),[a,i,o]);typeof n=="string"&&(n=Ho(n));let{pathname:c="/",search:u="",hash:d="",state:h=null,key:f="default"}=n,g=y.useMemo(()=>{let m=Kn(c,a);return m==null?null:{location:{pathname:m,search:u,hash:d,state:h,key:f},navigationType:r}},[a,c,u,d,h,f,r]);return Ut(g!=null,`<Router basename="${a}"> is not able to match the URL "${c}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:y.createElement(sn.Provider,{value:l},y.createElement(va.Provider,{children:t,value:g}))}function yb({children:e,location:t}){return U5(bp(e),t)}function bp(e,t=[]){let n=[];return y.Children.forEach(e,(r,i)=>{if(!y.isValidElement(r))return;let o=[...t,i];if(r.type===y.Fragment){n.push.apply(n,bp(r.props.children,o));return}me(r.type===re,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),me(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=bp(r.props.children,o)),n.push(a)}),n}var Bl="get",Vl="application/x-www-form-urlencoded";function mu(e){return e!=null&&typeof e.tagName=="string"}function i$(e){return mu(e)&&e.tagName.toLowerCase()==="button"}function o$(e){return mu(e)&&e.tagName.toLowerCase()==="form"}function s$(e){return mu(e)&&e.tagName.toLowerCase()==="input"}function a$(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function l$(e,t){return e.button===0&&(!t||t==="_self")&&!a$(e)}function jp(e=""){return new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(i=>[n,i]):[[n,r]])},[]))}function c$(e,t){let n=jp(e);return t&&t.forEach((r,i)=>{n.has(i)||t.getAll(i).forEach(o=>{n.append(i,o)})}),n}var el=null;function u$(){if(el===null)try{new FormData(document.createElement("form"),0),el=!1}catch{el=!0}return el}var d$=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function pd(e){return e!=null&&!d$.has(e)?(Ut(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Vl}"`),null):e}function h$(e,t){let n,r,i,o,a;if(o$(e)){let l=e.getAttribute("action");r=l?Kn(l,t):null,n=e.getAttribute("method")||Bl,i=pd(e.getAttribute("enctype"))||Vl,o=new FormData(e)}else if(i$(e)||s$(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||l.getAttribute("action");if(r=c?Kn(c,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||Bl,i=pd(e.getAttribute("formenctype"))||pd(l.getAttribute("enctype"))||Vl,o=new FormData(l,e),!u$()){let{name:u,type:d,value:h}=e;if(d==="image"){let f=u?`${u}.`:"";o.append(`${f}x`,"0"),o.append(`${f}y`,"0")}else u&&o.append(u,h)}}else{if(mu(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Bl,r=null,i=Vl,a=e}return o&&i==="text/plain"&&(a=o,o=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:o,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function nm(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function p$(e,t,n){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname=`_root.${n}`:t&&Kn(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.${n}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${n}`,r}async function f$(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function m$(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function g$(e,t,n){let r=await Promise.all(e.map(async i=>{let o=t.routes[i.route.id];if(o){let a=await f$(o,n);return a.links?a.links():[]}return[]}));return w$(r.flat(1).filter(m$).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function _0(e,t,n,r,i,o){let a=(c,u)=>n[u]?c.route.id!==n[u].route.id:!0,l=(c,u)=>{var d;return n[u].pathname!==c.pathname||((d=n[u].route.path)==null?void 0:d.endsWith("*"))&&n[u].params["*"]!==c.params["*"]};return o==="assets"?t.filter((c,u)=>a(c,u)||l(c,u)):o==="data"?t.filter((c,u)=>{var h;let d=r.routes[c.route.id];if(!d||!d.hasLoader)return!1;if(a(c,u)||l(c,u))return!0;if(c.route.shouldRevalidate){let f=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((h=n[0])==null?void 0:h.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof f=="boolean")return f}return!0}):[]}function x$(e,t,{includeHydrateFallback:n}={}){return y$(e.map(r=>{let i=t.routes[r.route.id];if(!i)return[];let o=[i.module];return i.clientActionModule&&(o=o.concat(i.clientActionModule)),i.clientLoaderModule&&(o=o.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(o=o.concat(i.hydrateFallbackModule)),i.imports&&(o=o.concat(i.imports)),o}).flat(1))}function y$(e){return[...new Set(e)]}function v$(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function w$(e,t){let n=new Set;return new Set(t),e.reduce((r,i)=>{let o=JSON.stringify(v$(i));return n.has(o)||(n.add(o),r.push({key:o,link:i})),r},[])}function vb(){let e=y.useContext(Uo);return nm(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function b$(){let e=y.useContext(fu);return nm(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var rm=y.createContext(void 0);rm.displayName="FrameworkContext";function wb(){let e=y.useContext(rm);return nm(e,"You must render this element inside a <HydratedRouter> element"),e}function j$(e,t){let n=y.useContext(rm),[r,i]=y.useState(!1),[o,a]=y.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:u,onMouseLeave:d,onTouchStart:h}=t,f=y.useRef(null);y.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let b=x=>{x.forEach(v=>{a(v.isIntersecting)})},j=new IntersectionObserver(b,{threshold:.5});return f.current&&j.observe(f.current),()=>{j.disconnect()}}},[e]),y.useEffect(()=>{if(r){let b=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(b)}}},[r]);let g=()=>{i(!0)},m=()=>{i(!1),a(!1)};return n?e!=="intent"?[o,f,{}]:[o,f,{onFocus:ls(l,g),onBlur:ls(c,m),onMouseEnter:ls(u,g),onMouseLeave:ls(d,m),onTouchStart:ls(h,g)}]:[!1,f,{}]}function ls(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function k$({page:e,...t}){let{router:n}=vb(),r=y.useMemo(()=>cb(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?y.createElement(C$,{page:e,matches:r,...t}):null}function S$(e){let{manifest:t,routeModules:n}=wb(),[r,i]=y.useState([]);return y.useEffect(()=>{let o=!1;return g$(e,t,n).then(a=>{o||i(a)}),()=>{o=!0}},[e,t,n]),r}function C$({page:e,matches:t,...n}){let r=Rt(),{manifest:i,routeModules:o}=wb(),{basename:a}=vb(),{loaderData:l,matches:c}=b$(),u=y.useMemo(()=>_0(e,t,c,i,r,"data"),[e,t,c,i,r]),d=y.useMemo(()=>_0(e,t,c,i,r,"assets"),[e,t,c,i,r]),h=y.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let m=new Set,b=!1;if(t.forEach(x=>{var w;let v=i.routes[x.route.id];!v||!v.hasLoader||(!u.some(S=>S.route.id===x.route.id)&&x.route.id in l&&((w=o[x.route.id])!=null&&w.shouldRevalidate)||v.hasClientLoader?b=!0:m.add(x.route.id))}),m.size===0)return[];let j=p$(e,a,"data");return b&&m.size>0&&j.searchParams.set("_routes",t.filter(x=>m.has(x.route.id)).map(x=>x.route.id).join(",")),[j.pathname+j.search]},[a,l,r,i,u,t,e,o]),f=y.useMemo(()=>x$(d,i),[d,i]),g=S$(d);return y.createElement(y.Fragment,null,h.map(m=>y.createElement("link",{key:m,rel:"prefetch",as:"fetch",href:m,...n})),f.map(m=>y.createElement("link",{key:m,rel:"modulepreload",href:m,...n})),g.map(({key:m,link:b})=>y.createElement("link",{key:m,nonce:n.nonce,...b})))}function T$(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var bb=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{bb&&(window.__reactRouterVersion="7.9.4")}catch{}function jb({basename:e,children:t,window:n}){let r=y.useRef();r.current==null&&(r.current=f5({window:n,v5Compat:!0}));let i=r.current,[o,a]=y.useState({action:i.action,location:i.location}),l=y.useCallback(c=>{y.startTransition(()=>a(c))},[a]);return y.useLayoutEffect(()=>i.listen(l),[i,l]),y.createElement(r$,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:i})}var kb=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Tr=y.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:i,reloadDocument:o,replace:a,state:l,target:c,to:u,preventScrollReset:d,viewTransition:h,...f},g){let{basename:m}=y.useContext(sn),b=typeof u=="string"&&kb.test(u),j,x=!1;if(typeof u=="string"&&b&&(j=u,bb))try{let P=new URL(window.location.href),A=u.startsWith("//")?new URL(P.protocol+u):new URL(u),M=Kn(A.pathname,m);A.origin===P.origin&&M!=null?u=M+A.search+A.hash:x=!0}catch{Ut(!1,`<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let v=B5(u,{relative:i}),[w,S,k]=j$(r,f),T=P$(u,{replace:a,state:l,target:c,preventScrollReset:d,relative:i,viewTransition:h});function C(P){t&&t(P),P.defaultPrevented||T(P)}let E=y.createElement("a",{...f,...k,href:j||v,onClick:x||o?t:C,ref:T$(g,S),target:c,"data-discover":!b&&n==="render"?"true":void 0});return w&&!b?y.createElement(y.Fragment,null,E,y.createElement(k$,{page:v})):E});Tr.displayName="Link";var gu=y.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:i=!1,style:o,to:a,viewTransition:l,children:c,...u},d){let h=wa(a,{relative:u.relative}),f=Rt(),g=y.useContext(fu),{navigator:m,basename:b}=y.useContext(sn),j=g!=null&&I$(h)&&l===!0,x=m.encodeLocation?m.encodeLocation(h).pathname:h.pathname,v=f.pathname,w=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(v=v.toLowerCase(),w=w?w.toLowerCase():null,x=x.toLowerCase()),w&&b&&(w=Kn(w,b)||w);const S=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let k=v===x||!i&&v.startsWith(x)&&v.charAt(S)==="/",T=w!=null&&(w===x||!i&&w.startsWith(x)&&w.charAt(x.length)==="/"),C={isActive:k,isPending:T,isTransitioning:j},E=k?t:void 0,P;typeof r=="function"?P=r(C):P=[r,k?"active":null,T?"pending":null,j?"transitioning":null].filter(Boolean).join(" ");let A=typeof o=="function"?o(C):o;return y.createElement(Tr,{...u,"aria-current":E,className:P,ref:d,style:A,to:a,viewTransition:l},typeof c=="function"?c(C):c)});gu.displayName="NavLink";var $$=y.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:o,method:a=Bl,action:l,onSubmit:c,relative:u,preventScrollReset:d,viewTransition:h,...f},g)=>{let m=M$(),b=L$(l,{relative:u}),j=a.toLowerCase()==="get"?"get":"post",x=typeof l=="string"&&kb.test(l),v=w=>{if(c&&c(w),w.defaultPrevented)return;w.preventDefault();let S=w.nativeEvent.submitter,k=(S==null?void 0:S.getAttribute("formmethod"))||a;m(S||w.currentTarget,{fetcherKey:t,method:k,navigate:n,replace:i,state:o,relative:u,preventScrollReset:d,viewTransition:h})};return y.createElement("form",{ref:g,method:j,action:b,onSubmit:r?c:v,...f,"data-discover":!x&&e==="render"?"true":void 0})});$$.displayName="Form";function E$(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Sb(e){let t=y.useContext(Uo);return me(t,E$(e)),t}function P$(e,{target:t,replace:n,state:r,preventScrollReset:i,relative:o,viewTransition:a}={}){let l=wt(),c=Rt(),u=wa(e,{relative:o});return y.useCallback(d=>{if(l$(d,t)){d.preventDefault();let h=n!==void 0?n:la(c)===la(u);l(e,{replace:h,state:r,preventScrollReset:i,relative:o,viewTransition:a})}},[c,l,u,n,r,t,e,i,o,a])}function A$(e){Ut(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=y.useRef(jp(e)),n=y.useRef(!1),r=Rt(),i=y.useMemo(()=>c$(r.search,n.current?null:t.current),[r.search]),o=wt(),a=y.useCallback((l,c)=>{const u=jp(typeof l=="function"?l(new URLSearchParams(i)):l);n.current=!0,o("?"+u,c)},[o,i]);return[i,a]}var D$=0,R$=()=>`__${String(++D$)}__`;function M$(){let{router:e}=Sb("useSubmit"),{basename:t}=y.useContext(sn),n=J5();return y.useCallback(async(r,i={})=>{let{action:o,method:a,encType:l,formData:c,body:u}=h$(r,t);if(i.navigate===!1){let d=i.fetcherKey||R$();await e.fetch(d,n,i.action||o,{preventScrollReset:i.preventScrollReset,formData:c,body:u,formMethod:i.method||a,formEncType:i.encType||l,flushSync:i.flushSync})}else await e.navigate(i.action||o,{preventScrollReset:i.preventScrollReset,formData:c,body:u,formMethod:i.method||a,formEncType:i.encType||l,replace:i.replace,state:i.state,fromRouteId:n,flushSync:i.flushSync,viewTransition:i.viewTransition})},[e,t,n])}function L$(e,{relative:t}={}){let{basename:n}=y.useContext(sn),r=y.useContext(an);me(r,"useFormAction must be used inside a RouteContext");let[i]=r.matches.slice(-1),o={...wa(e||".",{relative:t})},a=Rt();if(e==null){o.search=a.search;let l=new URLSearchParams(o.search),c=l.getAll("index");if(c.some(d=>d==="")){l.delete("index"),c.filter(h=>h).forEach(h=>l.append("index",h));let d=l.toString();o.search=d?`?${d}`:""}}return(!e||e===".")&&i.route.index&&(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(o.pathname=o.pathname==="/"?n:Fn([n,o.pathname])),la(o)}function I$(e,{relative:t}={}){let n=y.useContext(pb);me(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Sb("useViewTransitionState"),i=wa(e,{relative:t});if(!n.isTransitioning)return!1;let o=Kn(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=Kn(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Cc(i.pathname,a)!=null||Cc(i.pathname,o)!=null}const z0=[{id:"rest_1",name:"FoodFast Restaurant",description:"Original FoodFast restaurant with drone delivery",category:"Fast Food",location:"Downtown",rating:4.5,theme:{primary:"#FF6600",secondary:"#FF8C00",accent:"#FFA500"},ownerId:"u1",isActive:!0,createdAt:Date.now()-864e5*30},{id:"rest_2",name:"SweetDreams Bakery",description:"Delicious cakes and desserts delivered by drone",category:"Desserts",location:"Mall District",rating:4.8,theme:{primary:"#E91E63",secondary:"#F06292",accent:"#F8BBD9"},ownerId:"u3",isActive:!0,createdAt:Date.now()-864e5*7},{id:"restaurant_2",name:"Aloha Kitchen",description:"Authentic Asian & Hawaiian fusion cuisine for busy professionals.",category:"Asian Fusion / Bento / Dim Sum",location:"Ho Chi Minh City",rating:4.7,theme:{primary:"#ffcc70",secondary:"#ff9671",accent:"#ffc75f"},ownerId:"owner_aloha",isActive:!0,createdAt:Date.now()}],Hl=[{id:"u2",name:"Customer User",username:"user",role:"customer",phone:"0123456789",email:"user@example.com",orderCount:12,createdAt:Date.now()-864e5*60},{id:"u3",name:"SweetDreams Owner",username:"sweetdreams",role:"restaurant",restaurantId:"rest_2",email:"owner@sweetdreams.com",orderCount:0,createdAt:Date.now()-864e5*7},{id:"u4",name:"Test Customer",username:"user1",role:"customer",phone:"0987654321",email:"user1@example.com",orderCount:5,createdAt:Date.now()-864e5*30},{id:"owner_aloha",name:"Aloha Kitchen Owner",username:"aloha_restaurant",role:"restaurant",restaurantId:"restaurant_2",email:"owner@alohakitchen.com",orderCount:0,createdAt:Date.now()}],O$={user:{username:"user",password:"user123"},sweetdreams:{username:"sweetdreams",password:"sweet123"},user1:{username:"user1",password:"user1123"},aloha_restaurant:{username:"aloha_restaurant",password:"aloha123"}},Cb=y.createContext(void 0),F$=({children:e})=>{const[t,n]=y.useState(null),[r,i]=y.useState(!0);y.useEffect(()=>{try{const h=localStorage.getItem("auth_user"),f=localStorage.getItem("token"),g=localStorage.getItem("role");if(h&&f&&g){const m=JSON.parse(h);m.role===g?n(m):(console.warn("Inconsistent auth data, clearing..."),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role"))}else(h||f||g)&&(console.warn("Partial auth data found, clearing..."),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role"))}catch(h){console.error("Error parsing saved user:",h),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role")}finally{i(!1)}},[]),y.useEffect(()=>{if(t){console.log("💾 [AuthContext] Storing user in localStorage:",{username:t.username,role:t.role,restaurantId:t.restaurantId}),localStorage.setItem("auth_user",JSON.stringify(t));const h=`token_${t.username}_${Date.now()}`;localStorage.setItem("token",h),localStorage.setItem("role",t.role),console.log("✅ [AuthContext] User state synchronized to localStorage")}else console.log("🗑️ [AuthContext] Clearing user from localStorage"),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role")},[t]);const o=async(h,f)=>{if(console.log("🔐 [AuthContext] Login attempt:",{username:h}),i(!0),await new Promise(m=>setTimeout(m,400)),Object.values(O$).find(m=>m.username===h&&m.password===f&&m.username!=="admin")){const m=Hl.find(b=>b.username===h&&b.role!=="admin");if(m)return console.log("✅ [AuthContext] User found:",{username:m.username,role:m.role,restaurantId:m.restaurantId,name:m.name}),n(m),i(!1),console.log("✅ [AuthContext] Login successful, user state updated"),{ok:!0}}return console.log("❌ [AuthContext] Login failed - invalid credentials"),i(!1),{ok:!1,message:"Sai tên đăng nhập hoặc mật khẩu"}},a=()=>n(null),l=()=>(t==null?void 0:t.role)==="admin",c=()=>(t==null?void 0:t.role)==="restaurant",u=()=>(t==null?void 0:t.role)==="customer",d=h=>t&&n({...t,phone:h});return s.jsx(Cb.Provider,{value:{user:t,loading:r,login:o,logout:a,isAdmin:l,isRestaurant:c,isCustomer:u,setPhone:d},children:r?s.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px",color:"#666"},children:"Đang tải..."}):e})},Ke=()=>{const e=y.useContext(Cb);return e||(console.error("useAuth must be used inside AuthProvider"),{user:null,loading:!1,login:async()=>({ok:!1,message:"Auth not initialized"}),logout:()=>{},isAdmin:()=>!1,isRestaurant:()=>!1,isCustomer:()=>!1,setPhone:()=>{}})},en=[{id:"sd-001",name:"Bánh Donut",price:25e3,category:"Bánh ngọt",image:"https://images.unsplash.com/photo-1612197527828-6e0efb93cf5d?w=400&h=300&fit=crop",restaurant:"SweetDreams",available:!0,description:"Bánh donut phủ đường giòn rụm, hương vị thơm ngon cho buổi sáng năng động",ingredients:["Bột mì","Đường","Men","Dầu chiên","Socola"],preparationTime:12},{id:"sd-002",name:"Bánh Tiramisu",price:55e3,category:"Tráng miệng",image:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",restaurant:"SweetDreams",available:!0,description:"Bánh tiramisu truyền thống Ý với mascarpone và cà phê, hương vị đậm đà",ingredients:["Mascarpone","Cà phê espresso","Cacao","Biscotti","Trứng"],preparationTime:20},{id:"sd-003",name:"Bánh Phô Mai Dâu",price:45e3,category:"Tráng miệng",image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",restaurant:"SweetDreams",available:!0,description:"Bánh phô mai dâu tươi với lớp kem mềm mịn, vị ngọt thanh",ingredients:["Phô mai cream","Dâu tươi","Bánh quy","Kem tươi","Gelatin"],preparationTime:18},{id:"sd-004",name:"Bánh Croissant",price:35e3,category:"Bánh ngọt",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",restaurant:"SweetDreams",available:!0,description:"Bánh croissant bơ thơm ngon, lớp vỏ giòn tan",ingredients:["Bột mì","Bơ","Men","Muối","Sữa"],preparationTime:25},{id:"sd-005",name:"Bánh Flan",price:3e4,category:"Tráng miệng",image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",restaurant:"SweetDreams",available:!0,description:"Bánh flan caramel mềm mịn, vị ngọt đậm đà",ingredients:["Trứng","Sữa","Đường","Vanilla","Caramel"],preparationTime:15},{id:"ak-001",name:"Hamburger",price:79e3,category:"Món chính",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",restaurant:"Aloha",available:!0,description:"Hamburger thịt bò nướng với rau tươi và phô mai, hương vị đậm đà",ingredients:["Bánh hamburger","Thịt bò","Phô mai","Rau xà lách","Cà chua","Dưa leo"],preparationTime:15},{id:"ak-002",name:"Pizza Hawaii",price:89e3,category:"Món chính",image:"https://images.unsplash.com/photo-1600628422018-90e6f90b14c4?w=400&h=300&fit=crop",restaurant:"Aloha",available:!0,description:"Pizza Hawaii với phô mai tan chảy và dứa ngọt, hương vị hòa quyện hoàn hảo",ingredients:["Bột pizza","Phô mai mozzarella","Dứa","Thịt nguội","Sốt cà chua"],preparationTime:20},{id:"ak-003",name:"Cơm Chiên Hawaii",price:69e3,category:"Món chính",image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",restaurant:"Aloha",available:!0,description:"Cơm chiên Hawaii với thịt nướng và dứa tươi, hương vị nhiệt đới",ingredients:["Cơm","Thịt heo nướng","Dứa","Rau củ","Trứng","Tỏi"],preparationTime:18},{id:"ak-004",name:"Chả Giò Chiên",price:45e3,category:"Món chính",image:"https://images.unsplash.com/photo-1563379091339-03246963d4b0?w=400&h=300&fit=crop",restaurant:"Aloha",available:!0,description:"Chả giò chiên giòn rụm với thịt và rau củ, ăn kèm nước mắm chua ngọt",ingredients:["Bánh tráng","Thịt heo","Tôm","Rau củ","Miến","Gia vị"],preparationTime:25},{id:"ak-005",name:"Bánh Mì",price:39e3,category:"Món chính",image:"https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",restaurant:"Aloha",available:!0,description:"Bánh mì Việt Nam với thịt nướng, rau tươi và pate, hương vị truyền thống",ingredients:["Bánh mì","Thịt heo nướng","Pate","Rau thơm","Dưa leo","Cà rốt"],preparationTime:10}],Ul=e=>e.image||"/images/default-dish.jpg",Sn=(e=300,t=800)=>{const n=Math.random()*(t-e)+e;return new Promise(r=>setTimeout(r,n))},Cn=()=>{const e=localStorage.getItem("foodfast_products");if(e)try{return JSON.parse(e)}catch(t){return console.error("Error parsing stored products:",t),en}return en},ba=e=>{localStorage.setItem("foodfast_products",JSON.stringify(e))},N$=async()=>(await Sn(),Cn()),B0=async e=>(await Sn(),Cn().filter(n=>n.restaurant===e)),V0=async e=>(await Sn(),Cn().filter(n=>n.restaurant===e&&n.available)),_$=async e=>{await Sn();const t=Cn(),n=`${e.restaurant.toLowerCase().replace("sweetdreams","sd").replace("aloha","ak")}-${Date.now()}`,r={...e,id:n};return t.push(r),ba(t),r},z$=async(e,t)=>{await Sn();const n=Cn(),r=n.findIndex(i=>i.id===e);return r===-1?null:(n[r]={...n[r],...t},ba(n),n[r])},B$=async e=>{await Sn();const t=Cn(),n=t.findIndex(r=>r.id===e);return n===-1?!1:(t.splice(n,1),ba(t),!0)},V$=async(e,t,n,r=!1)=>{await Sn();let o=Cn().filter(a=>a.restaurant===e);if(r&&(o=o.filter(a=>a.available)),t){const a=t.toLowerCase();o=o.filter(l=>{var c,u;return l.name.toLowerCase().includes(a)||((c=l.description)==null?void 0:c.toLowerCase().includes(a))||((u=l.ingredients)==null?void 0:u.some(d=>d.toLowerCase().includes(a)))})}return n&&n!=="Tất cả"&&(o=o.filter(a=>a.category===n)),o},H$=async e=>{await Sn();const n=Cn().filter(i=>i.restaurant===e);return["Tất cả",...[...new Set(n.map(i=>i.category))].sort()]},U$=async e=>{await Sn();const n=Cn().filter(r=>r.restaurant===e);return{totalDishes:n.length,availableDishes:n.filter(r=>r.available).length,outOfStockDishes:n.filter(r=>!r.available).length,categories:new Set(n.map(r=>r.category)).size}},W$=async e=>{await Sn();const t=Cn(),n=t.findIndex(r=>r.id===e);return n===-1?null:(t[n].available=!t[n].available,ba(t),t[n])},K$=()=>{localStorage.getItem("foodfast_products")||ba(en)};let Y$={data:""},G$=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Y$},q$=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Q$=/\/\*[^]*?\*\/|  +/g,H0=/\n+/g,lr=(e,t)=>{let n="",r="",i="";for(let o in e){let a=e[o];o[0]=="@"?o[1]=="i"?n=o+" "+a+";":r+=o[1]=="f"?lr(a,o):o+"{"+lr(a,o[1]=="k"?"":t)+"}":typeof a=="object"?r+=lr(a,t?t.replace(/([^,])+/g,l=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,l):l?l+" "+c:c)):o):a!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=lr.p?lr.p(o,a):o+":"+a+";")}return n+(t&&i?t+"{"+i+"}":i)+r},Tn={},Tb=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+Tb(e[n]);return t}return e},X$=(e,t,n,r,i)=>{let o=Tb(e),a=Tn[o]||(Tn[o]=(c=>{let u=0,d=11;for(;u<c.length;)d=101*d+c.charCodeAt(u++)>>>0;return"go"+d})(o));if(!Tn[a]){let c=o!==e?e:(u=>{let d,h,f=[{}];for(;d=q$.exec(u.replace(Q$,""));)d[4]?f.shift():d[3]?(h=d[3].replace(H0," ").trim(),f.unshift(f[0][h]=f[0][h]||{})):f[0][d[1]]=d[2].replace(H0," ").trim();return f[0]})(e);Tn[a]=lr(i?{["@keyframes "+a]:c}:c,n?"":"."+a)}let l=n&&Tn.g?Tn.g:null;return n&&(Tn.g=Tn[a]),((c,u,d,h)=>{h?u.data=u.data.replace(h,c):u.data.indexOf(c)===-1&&(u.data=d?c+u.data:u.data+c)})(Tn[a],t,r,l),a},Z$=(e,t,n)=>e.reduce((r,i,o)=>{let a=t[o];if(a&&a.call){let l=a(n),c=l&&l.props&&l.props.className||/^go/.test(l)&&l;a=c?"."+c:l&&typeof l=="object"?l.props?"":lr(l,""):l===!1?"":l}return r+i+(a??"")},"");function xu(e){let t=this||{},n=e.call?e(t.p):e;return X$(n.unshift?n.raw?Z$(n,[].slice.call(arguments,1),t.p):n.reduce((r,i)=>Object.assign(r,i&&i.call?i(t.p):i),{}):n,G$(t.target),t.g,t.o,t.k)}let $b,kp,Sp;xu.bind({g:1});let Yn=xu.bind({k:1});function J$(e,t,n,r){lr.p=t,$b=e,kp=n,Sp=r}function Rr(e,t){let n=this||{};return function(){let r=arguments;function i(o,a){let l=Object.assign({},o),c=l.className||i.className;n.p=Object.assign({theme:kp&&kp()},l),n.o=/ *go\d+/.test(c),l.className=xu.apply(n,r)+(c?" "+c:"");let u=e;return e[0]&&(u=l.as||e,delete l.as),Sp&&u[0]&&Sp(l),$b(u,l)}return i}}var e3=e=>typeof e=="function",Tc=(e,t)=>e3(e)?e(t):e,t3=(()=>{let e=0;return()=>(++e).toString()})(),Eb=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),n3=20,im="default",Pb=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return Pb(e,{type:e.toasts.find(a=>a.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+o}))}}},Wl=[],Ab={toasts:[],pausedAt:void 0,settings:{toastLimit:n3}},fn={},Db=(e,t=im)=>{fn[t]=Pb(fn[t]||Ab,e),Wl.forEach(([n,r])=>{n===t&&r(fn[t])})},Rb=e=>Object.keys(fn).forEach(t=>Db(e,t)),r3=e=>Object.keys(fn).find(t=>fn[t].toasts.some(n=>n.id===e)),yu=(e=im)=>t=>{Db(t,e)},i3={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},o3=(e={},t=im)=>{let[n,r]=y.useState(fn[t]||Ab),i=y.useRef(fn[t]);y.useEffect(()=>(i.current!==fn[t]&&r(fn[t]),Wl.push([t,r]),()=>{let a=Wl.findIndex(([l])=>l===t);a>-1&&Wl.splice(a,1)}),[t]);let o=n.toasts.map(a=>{var l,c,u;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((l=e[a.type])==null?void 0:l.removeDelay)||(e==null?void 0:e.removeDelay),duration:a.duration||((c=e[a.type])==null?void 0:c.duration)||(e==null?void 0:e.duration)||i3[a.type],style:{...e.style,...(u=e[a.type])==null?void 0:u.style,...a.style}}});return{...n,toasts:o}},s3=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||t3()}),ja=e=>(t,n)=>{let r=s3(t,e,n);return yu(r.toasterId||r3(r.id))({type:2,toast:r}),r.id},Le=(e,t)=>ja("blank")(e,t);Le.error=ja("error");Le.success=ja("success");Le.loading=ja("loading");Le.custom=ja("custom");Le.dismiss=(e,t)=>{let n={type:3,toastId:e};t?yu(t)(n):Rb(n)};Le.dismissAll=e=>Le.dismiss(void 0,e);Le.remove=(e,t)=>{let n={type:4,toastId:e};t?yu(t)(n):Rb(n)};Le.removeAll=e=>Le.remove(void 0,e);Le.promise=(e,t,n)=>{let r=Le.loading(t.loading,{...n,...n==null?void 0:n.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?Tc(t.success,i):void 0;return o?Le.success(o,{id:r,...n,...n==null?void 0:n.success}):Le.dismiss(r),i}).catch(i=>{let o=t.error?Tc(t.error,i):void 0;o?Le.error(o,{id:r,...n,...n==null?void 0:n.error}):Le.dismiss(r)}),e};var a3=1e3,l3=(e,t="default")=>{let{toasts:n,pausedAt:r}=o3(e,t),i=y.useRef(new Map).current,o=y.useCallback((h,f=a3)=>{if(i.has(h))return;let g=setTimeout(()=>{i.delete(h),a({type:4,toastId:h})},f);i.set(h,g)},[]);y.useEffect(()=>{if(r)return;let h=Date.now(),f=n.map(g=>{if(g.duration===1/0)return;let m=(g.duration||0)+g.pauseDuration-(h-g.createdAt);if(m<0){g.visible&&Le.dismiss(g.id);return}return setTimeout(()=>Le.dismiss(g.id,t),m)});return()=>{f.forEach(g=>g&&clearTimeout(g))}},[n,r,t]);let a=y.useCallback(yu(t),[t]),l=y.useCallback(()=>{a({type:5,time:Date.now()})},[a]),c=y.useCallback((h,f)=>{a({type:1,toast:{id:h,height:f}})},[a]),u=y.useCallback(()=>{r&&a({type:6,time:Date.now()})},[r,a]),d=y.useCallback((h,f)=>{let{reverseOrder:g=!1,gutter:m=8,defaultPosition:b}=f||{},j=n.filter(w=>(w.position||b)===(h.position||b)&&w.height),x=j.findIndex(w=>w.id===h.id),v=j.filter((w,S)=>S<x&&w.visible).length;return j.filter(w=>w.visible).slice(...g?[v+1]:[0,v]).reduce((w,S)=>w+(S.height||0)+m,0)},[n]);return y.useEffect(()=>{n.forEach(h=>{if(h.dismissed)o(h.id,h.removeDelay);else{let f=i.get(h.id);f&&(clearTimeout(f),i.delete(h.id))}})},[n,o]),{toasts:n,handlers:{updateHeight:c,startPause:l,endPause:u,calculateOffset:d}}},c3=Yn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,u3=Yn`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,d3=Yn`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,h3=Rr("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${c3} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${u3} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${d3} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,p3=Yn`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,f3=Rr("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${p3} 1s linear infinite;
`,m3=Yn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,g3=Yn`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,x3=Rr("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${m3} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${g3} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,y3=Rr("div")`
  position: absolute;
`,v3=Rr("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,w3=Yn`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,b3=Rr("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${w3} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,j3=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t!==void 0?typeof t=="string"?y.createElement(b3,null,t):t:n==="blank"?null:y.createElement(v3,null,y.createElement(f3,{...r}),n!=="loading"&&y.createElement(y3,null,n==="error"?y.createElement(h3,{...r}):y.createElement(x3,{...r})))},k3=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,S3=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,C3="0%{opacity:0;} 100%{opacity:1;}",T3="0%{opacity:1;} 100%{opacity:0;}",$3=Rr("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,E3=Rr("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,P3=(e,t)=>{let n=e.includes("top")?1:-1,[r,i]=Eb()?[C3,T3]:[k3(n),S3(n)];return{animation:t?`${Yn(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${Yn(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},A3=y.memo(({toast:e,position:t,style:n,children:r})=>{let i=e.height?P3(e.position||t||"top-center",e.visible):{opacity:0},o=y.createElement(j3,{toast:e}),a=y.createElement(E3,{...e.ariaProps},Tc(e.message,e));return y.createElement($3,{className:e.className,style:{...i,...n,...e.style}},typeof r=="function"?r({icon:o,message:a}):y.createElement(y.Fragment,null,o,a))});J$(y.createElement);var D3=({id:e,className:t,style:n,onHeightUpdate:r,children:i})=>{let o=y.useCallback(a=>{if(a){let l=()=>{let c=a.getBoundingClientRect().height;r(e,c)};l(),new MutationObserver(l).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return y.createElement("div",{ref:o,className:t,style:n},i)},R3=(e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Eb()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...i}},M3=xu`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,tl=16,Mb=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:r,children:i,toasterId:o,containerStyle:a,containerClassName:l})=>{let{toasts:c,handlers:u}=l3(n,o);return y.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:tl,left:tl,right:tl,bottom:tl,pointerEvents:"none",...a},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(d=>{let h=d.position||t,f=u.calculateOffset(d,{reverseOrder:e,gutter:r,defaultPosition:t}),g=R3(h,f);return y.createElement(D3,{id:d.id,key:d.id,onHeightUpdate:u.updateHeight,className:d.visible?M3:"",style:g},d.type==="custom"?Tc(d.message,d):i?i(d):y.createElement(A3,{toast:d,position:h}))}))},U=Le;const Lb=y.createContext(void 0),L3=({children:e})=>{const[t,n]=y.useState([]),[r,i]=y.useState([]),[o,a]=y.useState([]),[l,c]=y.useState([]),[u,d]=y.useState([]),[h,f]=y.useState(!0);y.useEffect(()=>{K$()},[]);const g=async()=>{try{f(!0);const[T,C,E,P,A]=await Promise.all([N$(),B0("SweetDreams"),B0("Aloha"),V0("SweetDreams"),V0("Aloha")]);n(T),i(C),a(E),c(P),d(A)}catch(T){console.error("Error loading products:",T),U.error("Không thể tải dữ liệu menu")}finally{f(!1)}},m=async()=>{await g()},b=async T=>{try{const C=await _$(T);return C?(await m(),U.success("Món ăn đã được đồng bộ vào thực đơn!"),C):null}catch(C){return console.error("Error adding product:",C),U.error("Không thể thêm món ăn"),null}},j=async(T,C)=>{try{const E=await z$(T,C);return E?(await m(),U.success("Món ăn đã được cập nhật và đồng bộ!"),E):null}catch(E){return console.error("Error updating product:",E),U.error("Không thể cập nhật món ăn"),null}},x=async T=>{try{return await B$(T)?(await m(),U.success("Món ăn đã được xóa khỏi thực đơn!"),!0):!1}catch(C){return console.error("Error deleting product:",C),U.error("Không thể xóa món ăn"),!1}},v=async T=>{try{const C=await W$(T);if(C){await m();const E=C.available?"có sẵn":"hết hàng";return U.success(`Món ăn đã được cập nhật trạng thái: ${E}`),C}return null}catch(C){return console.error("Error toggling availability:",C),U.error("Không thể cập nhật trạng thái món ăn"),null}},w=T=>T==="SweetDreams"?r:o,S=T=>T==="SweetDreams"?l:u;y.useEffect(()=>{g()},[]);const k={allProducts:t,sweetDreamsProducts:r,alohaProducts:o,sweetDreamsAvailableProducts:l,alohaAvailableProducts:u,loading:h,refreshProducts:m,addProduct:b,updateProduct:j,deleteProduct:x,toggleAvailability:v,getRestaurantProducts:w,getRestaurantAvailableProducts:S};return s.jsx(Lb.Provider,{value:k,children:e})},I3=()=>{const e=y.useContext(Lb);if(e===void 0)throw new Error("useMenu must be used within a MenuProvider");return e},om=y.createContext({});function vu(e){const t=y.useRef(null);return t.current===null&&(t.current=e()),t.current}const wu=y.createContext(null),sm=y.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});class O3 extends y.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=n.offsetHeight||0,r.width=n.offsetWidth||0,r.top=n.offsetTop,r.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function F3({children:e,isPresent:t}){const n=y.useId(),r=y.useRef(null),i=y.useRef({width:0,height:0,top:0,left:0}),{nonce:o}=y.useContext(sm);return y.useInsertionEffect(()=>{const{width:a,height:l,top:c,left:u}=i.current;if(t||!r.current||!a||!l)return;r.current.dataset.motionPopId=n;const d=document.createElement("style");return o&&(d.nonce=o),document.head.appendChild(d),d.sheet&&d.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${a}px !important;
            height: ${l}px !important;
            top: ${c}px !important;
            left: ${u}px !important;
          }
        `),()=>{document.head.removeChild(d)}},[t]),s.jsx(O3,{isPresent:t,childRef:r,sizeRef:i,children:y.cloneElement(e,{ref:r})})}const N3=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:o,mode:a})=>{const l=vu(_3),c=y.useId(),u=y.useCallback(h=>{l.set(h,!0);for(const f of l.values())if(!f)return;r&&r()},[l,r]),d=y.useMemo(()=>({id:c,initial:t,isPresent:n,custom:i,onExitComplete:u,register:h=>(l.set(h,!1),()=>l.delete(h))}),o?[Math.random(),u]:[n,u]);return y.useMemo(()=>{l.forEach((h,f)=>l.set(f,!1))},[n]),y.useEffect(()=>{!n&&!l.size&&r&&r()},[n]),a==="popLayout"&&(e=s.jsx(F3,{isPresent:n,children:e})),s.jsx(wu.Provider,{value:d,children:e})};function _3(){return new Map}function Ib(e=!0){const t=y.useContext(wu);if(t===null)return[!0,null];const{isPresent:n,onExitComplete:r,register:i}=t,o=y.useId();y.useEffect(()=>{e&&i(o)},[e]);const a=y.useCallback(()=>e&&r&&r(o),[o,r,e]);return!n&&r?[!1,a]:[!0]}const nl=e=>e.key||"";function U0(e){const t=[];return y.Children.forEach(e,n=>{y.isValidElement(n)&&t.push(n)}),t}const am=typeof window<"u",lm=am?y.useLayoutEffect:y.useEffect,Qe=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:o="sync",propagate:a=!1})=>{const[l,c]=Ib(a),u=y.useMemo(()=>U0(e),[e]),d=a&&!l?[]:u.map(nl),h=y.useRef(!0),f=y.useRef(u),g=vu(()=>new Map),[m,b]=y.useState(u),[j,x]=y.useState(u);lm(()=>{h.current=!1,f.current=u;for(let S=0;S<j.length;S++){const k=nl(j[S]);d.includes(k)?g.delete(k):g.get(k)!==!0&&g.set(k,!1)}},[j,d.length,d.join("-")]);const v=[];if(u!==m){let S=[...u];for(let k=0;k<j.length;k++){const T=j[k],C=nl(T);d.includes(C)||(S.splice(k,0,T),v.push(T))}o==="wait"&&v.length&&(S=v),x(U0(S)),b(u);return}const{forceRender:w}=y.useContext(om);return s.jsx(s.Fragment,{children:j.map(S=>{const k=nl(S),T=a&&!l?!1:u===j||d.includes(k),C=()=>{if(g.has(k))g.set(k,!0);else return;let E=!0;g.forEach(P=>{P||(E=!1)}),E&&(w==null||w(),x(f.current),a&&(c==null||c()),r&&r())};return s.jsx(N3,{isPresent:T,initial:!h.current||n?void 0:!1,custom:T?void 0:t,presenceAffectsLayout:i,mode:o,onExitComplete:T?void 0:C,children:S},k)})})},Tt=e=>e;let Ob=Tt;function cm(e){let t;return()=>(t===void 0&&(t=e()),t)}const Lo=(e,t,n)=>{const r=t-e;return r===0?1:(n-e)/r},Nn=e=>e*1e3,_n=e=>e/1e3,z3={useManualTiming:!1};function B3(e){let t=new Set,n=new Set,r=!1,i=!1;const o=new WeakSet;let a={delta:0,timestamp:0,isProcessing:!1};function l(u){o.has(u)&&(c.schedule(u),e()),u(a)}const c={schedule:(u,d=!1,h=!1)=>{const g=h&&r?t:n;return d&&o.add(u),g.has(u)||g.add(u),u},cancel:u=>{n.delete(u),o.delete(u)},process:u=>{if(a=u,r){i=!0;return}r=!0,[t,n]=[n,t],t.forEach(l),t.clear(),r=!1,i&&(i=!1,c.process(u))}};return c}const rl=["read","resolveKeyframes","update","preRender","render","postRender"],V3=40;function Fb(e,t){let n=!1,r=!0;const i={delta:0,timestamp:0,isProcessing:!1},o=()=>n=!0,a=rl.reduce((x,v)=>(x[v]=B3(o),x),{}),{read:l,resolveKeyframes:c,update:u,preRender:d,render:h,postRender:f}=a,g=()=>{const x=performance.now();n=!1,i.delta=r?1e3/60:Math.max(Math.min(x-i.timestamp,V3),1),i.timestamp=x,i.isProcessing=!0,l.process(i),c.process(i),u.process(i),d.process(i),h.process(i),f.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(g))},m=()=>{n=!0,r=!0,i.isProcessing||e(g)};return{schedule:rl.reduce((x,v)=>{const w=a[v];return x[v]=(S,k=!1,T=!1)=>(n||m(),w.schedule(S,k,T)),x},{}),cancel:x=>{for(let v=0;v<rl.length;v++)a[rl[v]].cancel(x)},state:i,steps:a}}const{schedule:he,cancel:$r,state:He,steps:fd}=Fb(typeof requestAnimationFrame<"u"?requestAnimationFrame:Tt,!0),Nb=y.createContext({strict:!1}),W0={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Io={};for(const e in W0)Io[e]={isEnabled:t=>W0[e].some(n=>!!t[n])};function H3(e){for(const t in e)Io[t]={...Io[t],...e[t]}}const U3=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function $c(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||U3.has(e)}let _b=e=>!$c(e);function W3(e){e&&(_b=t=>t.startsWith("on")?!$c(t):e(t))}try{W3(require("@emotion/is-prop-valid").default)}catch{}function K3(e,t,n){const r={};for(const i in e)i==="values"&&typeof e.values=="object"||(_b(i)||n===!0&&$c(i)||!t&&!$c(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}function Y3(e){if(typeof Proxy>"u")return e;const t=new Map,n=(...r)=>e(...r);return new Proxy(n,{get:(r,i)=>i==="create"?e:(t.has(i)||t.set(i,e(i)),t.get(i))})}const bu=y.createContext({});function ca(e){return typeof e=="string"||Array.isArray(e)}function ju(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}const um=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],dm=["initial",...um];function ku(e){return ju(e.animate)||dm.some(t=>ca(e[t]))}function zb(e){return!!(ku(e)||e.variants)}function G3(e,t){if(ku(e)){const{initial:n,animate:r}=e;return{initial:n===!1||ca(n)?n:void 0,animate:ca(r)?r:void 0}}return e.inherit!==!1?t:{}}function q3(e){const{initial:t,animate:n}=G3(e,y.useContext(bu));return y.useMemo(()=>({initial:t,animate:n}),[K0(t),K0(n)])}function K0(e){return Array.isArray(e)?e.join(" "):e}const Q3=Symbol.for("motionComponentSymbol");function lo(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function X3(e,t,n){return y.useCallback(r=>{r&&e.onMount&&e.onMount(r),t&&(r?t.mount(r):t.unmount()),n&&(typeof n=="function"?n(r):lo(n)&&(n.current=r))},[t])}const hm=e=>e.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),Z3="framerAppearId",Bb="data-"+hm(Z3),{schedule:pm}=Fb(queueMicrotask,!1),Vb=y.createContext({});function J3(e,t,n,r,i){var o,a;const{visualElement:l}=y.useContext(bu),c=y.useContext(Nb),u=y.useContext(wu),d=y.useContext(sm).reducedMotion,h=y.useRef(null);r=r||c.renderer,!h.current&&r&&(h.current=r(e,{visualState:t,parent:l,props:n,presenceContext:u,blockInitialAnimation:u?u.initial===!1:!1,reducedMotionConfig:d}));const f=h.current,g=y.useContext(Vb);f&&!f.projection&&i&&(f.type==="html"||f.type==="svg")&&eE(h.current,n,i,g);const m=y.useRef(!1);y.useInsertionEffect(()=>{f&&m.current&&f.update(n,u)});const b=n[Bb],j=y.useRef(!!b&&!(!((o=window.MotionHandoffIsComplete)===null||o===void 0)&&o.call(window,b))&&((a=window.MotionHasOptimisedAnimation)===null||a===void 0?void 0:a.call(window,b)));return lm(()=>{f&&(m.current=!0,window.MotionIsMounted=!0,f.updateFeatures(),pm.render(f.render),j.current&&f.animationState&&f.animationState.animateChanges())}),y.useEffect(()=>{f&&(!j.current&&f.animationState&&f.animationState.animateChanges(),j.current&&(queueMicrotask(()=>{var x;(x=window.MotionHandoffMarkAsComplete)===null||x===void 0||x.call(window,b)}),j.current=!1))}),f}function eE(e,t,n,r){const{layoutId:i,layout:o,drag:a,dragConstraints:l,layoutScroll:c,layoutRoot:u}=t;e.projection=new n(e.latestValues,t["data-framer-portal-id"]?void 0:Hb(e.parent)),e.projection.setOptions({layoutId:i,layout:o,alwaysMeasureLayout:!!a||l&&lo(l),visualElement:e,animationType:typeof o=="string"?o:"both",initialPromotionConfig:r,layoutScroll:c,layoutRoot:u})}function Hb(e){if(e)return e.options.allowProjection!==!1?e.projection:Hb(e.parent)}function tE({preloadedFeatures:e,createVisualElement:t,useRender:n,useVisualState:r,Component:i}){var o,a;e&&H3(e);function l(u,d){let h;const f={...y.useContext(sm),...u,layoutId:nE(u)},{isStatic:g}=f,m=q3(u),b=r(u,g);if(!g&&am){rE();const j=iE(f);h=j.MeasureLayout,m.visualElement=J3(i,b,f,t,j.ProjectionNode)}return s.jsxs(bu.Provider,{value:m,children:[h&&m.visualElement?s.jsx(h,{visualElement:m.visualElement,...f}):null,n(i,u,X3(b,m.visualElement,d),b,g,m.visualElement)]})}l.displayName=`motion.${typeof i=="string"?i:`create(${(a=(o=i.displayName)!==null&&o!==void 0?o:i.name)!==null&&a!==void 0?a:""})`}`;const c=y.forwardRef(l);return c[Q3]=i,c}function nE({layoutId:e}){const t=y.useContext(om).id;return t&&e!==void 0?t+"-"+e:e}function rE(e,t){y.useContext(Nb).strict}function iE(e){const{drag:t,layout:n}=Io;if(!t&&!n)return{};const r={...t,...n};return{MeasureLayout:t!=null&&t.isEnabled(e)||n!=null&&n.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}const oE=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function fm(e){return typeof e!="string"||e.includes("-")?!1:!!(oE.indexOf(e)>-1||/[A-Z]/u.test(e))}function Y0(e){const t=[{},{}];return e==null||e.values.forEach((n,r)=>{t[0][r]=n.get(),t[1][r]=n.getVelocity()}),t}function mm(e,t,n,r){if(typeof t=="function"){const[i,o]=Y0(r);t=t(n!==void 0?n:e.custom,i,o)}if(typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"){const[i,o]=Y0(r);t=t(n!==void 0?n:e.custom,i,o)}return t}const Cp=e=>Array.isArray(e),sE=e=>!!(e&&typeof e=="object"&&e.mix&&e.toValue),aE=e=>Cp(e)?e[e.length-1]||0:e,Ze=e=>!!(e&&e.getVelocity);function Kl(e){const t=Ze(e)?e.get():e;return sE(t)?t.toValue():t}function lE({scrapeMotionValuesFromProps:e,createRenderState:t,onUpdate:n},r,i,o){const a={latestValues:cE(r,i,o,e),renderState:t()};return n&&(a.onMount=l=>n({props:r,current:l,...a}),a.onUpdate=l=>n(l)),a}const Ub=e=>(t,n)=>{const r=y.useContext(bu),i=y.useContext(wu),o=()=>lE(e,t,r,i);return n?o():vu(o)};function cE(e,t,n,r){const i={},o=r(e,{});for(const f in o)i[f]=Kl(o[f]);let{initial:a,animate:l}=e;const c=ku(e),u=zb(e);t&&u&&!c&&e.inherit!==!1&&(a===void 0&&(a=t.initial),l===void 0&&(l=t.animate));let d=n?n.initial===!1:!1;d=d||a===!1;const h=d?l:a;if(h&&typeof h!="boolean"&&!ju(h)){const f=Array.isArray(h)?h:[h];for(let g=0;g<f.length;g++){const m=mm(e,f[g]);if(m){const{transitionEnd:b,transition:j,...x}=m;for(const v in x){let w=x[v];if(Array.isArray(w)){const S=d?w.length-1:0;w=w[S]}w!==null&&(i[v]=w)}for(const v in b)i[v]=b[v]}}}return i}const Ko=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],$i=new Set(Ko),Wb=e=>t=>typeof t=="string"&&t.startsWith(e),Kb=Wb("--"),uE=Wb("var(--"),gm=e=>uE(e)?dE.test(e.split("/*")[0].trim()):!1,dE=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,Yb=(e,t)=>t&&typeof e=="number"?t.transform(e):e,Gn=(e,t,n)=>n>t?t:n<e?e:n,Yo={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},ua={...Yo,transform:e=>Gn(0,1,e)},il={...Yo,default:1},ka=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),rr=ka("deg"),wn=ka("%"),K=ka("px"),hE=ka("vh"),pE=ka("vw"),G0={...wn,parse:e=>wn.parse(e)/100,transform:e=>wn.transform(e*100)},fE={borderWidth:K,borderTopWidth:K,borderRightWidth:K,borderBottomWidth:K,borderLeftWidth:K,borderRadius:K,radius:K,borderTopLeftRadius:K,borderTopRightRadius:K,borderBottomRightRadius:K,borderBottomLeftRadius:K,width:K,maxWidth:K,height:K,maxHeight:K,top:K,right:K,bottom:K,left:K,padding:K,paddingTop:K,paddingRight:K,paddingBottom:K,paddingLeft:K,margin:K,marginTop:K,marginRight:K,marginBottom:K,marginLeft:K,backgroundPositionX:K,backgroundPositionY:K},mE={rotate:rr,rotateX:rr,rotateY:rr,rotateZ:rr,scale:il,scaleX:il,scaleY:il,scaleZ:il,skew:rr,skewX:rr,skewY:rr,distance:K,translateX:K,translateY:K,translateZ:K,x:K,y:K,z:K,perspective:K,transformPerspective:K,opacity:ua,originX:G0,originY:G0,originZ:K},q0={...Yo,transform:Math.round},xm={...fE,...mE,zIndex:q0,size:K,fillOpacity:ua,strokeOpacity:ua,numOctaves:q0},gE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},xE=Ko.length;function yE(e,t,n){let r="",i=!0;for(let o=0;o<xE;o++){const a=Ko[o],l=e[a];if(l===void 0)continue;let c=!0;if(typeof l=="number"?c=l===(a.startsWith("scale")?1:0):c=parseFloat(l)===0,!c||n){const u=Yb(l,xm[a]);if(!c){i=!1;const d=gE[a]||a;r+=`${d}(${u}) `}n&&(t[a]=u)}}return r=r.trim(),n?r=n(t,i?"":r):i&&(r="none"),r}function ym(e,t,n){const{style:r,vars:i,transformOrigin:o}=e;let a=!1,l=!1;for(const c in t){const u=t[c];if($i.has(c)){a=!0;continue}else if(Kb(c)){i[c]=u;continue}else{const d=Yb(u,xm[c]);c.startsWith("origin")?(l=!0,o[c]=d):r[c]=d}}if(t.transform||(a||n?r.transform=yE(t,e.transform,n):r.transform&&(r.transform="none")),l){const{originX:c="50%",originY:u="50%",originZ:d=0}=o;r.transformOrigin=`${c} ${u} ${d}`}}const vE={offset:"stroke-dashoffset",array:"stroke-dasharray"},wE={offset:"strokeDashoffset",array:"strokeDasharray"};function bE(e,t,n=1,r=0,i=!0){e.pathLength=1;const o=i?vE:wE;e[o.offset]=K.transform(-r);const a=K.transform(t),l=K.transform(n);e[o.array]=`${a} ${l}`}function Q0(e,t,n){return typeof e=="string"?e:K.transform(t+n*e)}function jE(e,t,n){const r=Q0(t,e.x,e.width),i=Q0(n,e.y,e.height);return`${r} ${i}`}function vm(e,{attrX:t,attrY:n,attrScale:r,originX:i,originY:o,pathLength:a,pathSpacing:l=1,pathOffset:c=0,...u},d,h){if(ym(e,u,h),d){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:f,style:g,dimensions:m}=e;f.transform&&(m&&(g.transform=f.transform),delete f.transform),m&&(i!==void 0||o!==void 0||g.transform)&&(g.transformOrigin=jE(m,i!==void 0?i:.5,o!==void 0?o:.5)),t!==void 0&&(f.x=t),n!==void 0&&(f.y=n),r!==void 0&&(f.scale=r),a!==void 0&&bE(f,a,l,c,!1)}const wm=()=>({style:{},transform:{},transformOrigin:{},vars:{}}),Gb=()=>({...wm(),attrs:{}}),bm=e=>typeof e=="string"&&e.toLowerCase()==="svg";function qb(e,{style:t,vars:n},r,i){Object.assign(e.style,t,i&&i.getProjectionStyles(r));for(const o in n)e.style.setProperty(o,n[o])}const Qb=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function Xb(e,t,n,r){qb(e,t,void 0,r);for(const i in t.attrs)e.setAttribute(Qb.has(i)?i:hm(i),t.attrs[i])}const Ec={};function kE(e){Object.assign(Ec,e)}function Zb(e,{layout:t,layoutId:n}){return $i.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!Ec[e]||e==="opacity")}function jm(e,t,n){var r;const{style:i}=e,o={};for(const a in i)(Ze(i[a])||t.style&&Ze(t.style[a])||Zb(a,e)||((r=n==null?void 0:n.getValue(a))===null||r===void 0?void 0:r.liveStyle)!==void 0)&&(o[a]=i[a]);return o}function Jb(e,t,n){const r=jm(e,t,n);for(const i in e)if(Ze(e[i])||Ze(t[i])){const o=Ko.indexOf(i)!==-1?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i;r[o]=e[i]}return r}function SE(e,t){try{t.dimensions=typeof e.getBBox=="function"?e.getBBox():e.getBoundingClientRect()}catch{t.dimensions={x:0,y:0,width:0,height:0}}}const X0=["x","y","width","height","cx","cy","r"],CE={useVisualState:Ub({scrapeMotionValuesFromProps:Jb,createRenderState:Gb,onUpdate:({props:e,prevProps:t,current:n,renderState:r,latestValues:i})=>{if(!n)return;let o=!!e.drag;if(!o){for(const l in i)if($i.has(l)){o=!0;break}}if(!o)return;let a=!t;if(t)for(let l=0;l<X0.length;l++){const c=X0[l];e[c]!==t[c]&&(a=!0)}a&&he.read(()=>{SE(n,r),he.render(()=>{vm(r,i,bm(n.tagName),e.transformTemplate),Xb(n,r)})})}})},TE={useVisualState:Ub({scrapeMotionValuesFromProps:jm,createRenderState:wm})};function e2(e,t,n){for(const r in t)!Ze(t[r])&&!Zb(r,n)&&(e[r]=t[r])}function $E({transformTemplate:e},t){return y.useMemo(()=>{const n=wm();return ym(n,t,e),Object.assign({},n.vars,n.style)},[t])}function EE(e,t){const n=e.style||{},r={};return e2(r,n,e),Object.assign(r,$E(e,t)),r}function PE(e,t){const n={},r=EE(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}function AE(e,t,n,r){const i=y.useMemo(()=>{const o=Gb();return vm(o,t,bm(r),e.transformTemplate),{...o.attrs,style:{...o.style}}},[t]);if(e.style){const o={};e2(o,e.style,e),i.style={...o,...i.style}}return i}function DE(e=!1){return(n,r,i,{latestValues:o},a)=>{const c=(fm(n)?AE:PE)(r,o,a,n),u=K3(r,typeof n=="string",e),d=n!==y.Fragment?{...u,...c,ref:i}:{},{children:h}=r,f=y.useMemo(()=>Ze(h)?h.get():h,[h]);return y.createElement(n,{...d,children:f})}}function RE(e,t){return function(r,{forwardMotionProps:i}={forwardMotionProps:!1}){const a={...fm(r)?CE:TE,preloadedFeatures:e,useRender:DE(i),createVisualElement:t,Component:r};return tE(a)}}function t2(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}function Su(e,t,n){const r=e.getProps();return mm(r,t,n!==void 0?n:r.custom,e)}const ME=cm(()=>window.ScrollTimeline!==void 0);class LE{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,n){for(let r=0;r<this.animations.length;r++)this.animations[r][t]=n}attachTimeline(t,n){const r=this.animations.map(i=>{if(ME()&&i.attachTimeline)return i.attachTimeline(t);if(typeof n=="function")return n(i)});return()=>{r.forEach((i,o)=>{i&&i(),this.animations[o].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let n=0;n<this.animations.length;n++)t=Math.max(t,this.animations[n].duration);return t}runAll(t){this.animations.forEach(n=>n[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}class IE extends LE{then(t,n){return Promise.all(this.animations).then(t).catch(n)}}function km(e,t){return e?e[t]||e.default||e:void 0}const Tp=2e4;function n2(e){let t=0;const n=50;let r=e.next(t);for(;!r.done&&t<Tp;)t+=n,r=e.next(t);return t>=Tp?1/0:t}function Sm(e){return typeof e=="function"}function Z0(e,t){e.timeline=t,e.onfinish=null}const Cm=e=>Array.isArray(e)&&typeof e[0]=="number",OE={linearEasing:void 0};function FE(e,t){const n=cm(e);return()=>{var r;return(r=OE[t])!==null&&r!==void 0?r:n()}}const Pc=FE(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),r2=(e,t,n=10)=>{let r="";const i=Math.max(Math.round(t/n),2);for(let o=0;o<i;o++)r+=e(Lo(0,i-1,o))+", ";return`linear(${r.substring(0,r.length-2)})`};function i2(e){return!!(typeof e=="function"&&Pc()||!e||typeof e=="string"&&(e in $p||Pc())||Cm(e)||Array.isArray(e)&&e.every(i2))}const Ss=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,$p={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Ss([0,.65,.55,1]),circOut:Ss([.55,0,1,.45]),backIn:Ss([.31,.01,.66,-.59]),backOut:Ss([.33,1.53,.69,.99])};function o2(e,t){if(e)return typeof e=="function"&&Pc()?r2(e,t):Cm(e)?Ss(e):Array.isArray(e)?e.map(n=>o2(n,t)||$p.easeOut):$p[e]}const qt={x:!1,y:!1};function s2(){return qt.x||qt.y}function NE(e,t,n){var r;if(e instanceof Element)return[e];if(typeof e=="string"){let i=document;const o=(r=void 0)!==null&&r!==void 0?r:i.querySelectorAll(e);return o?Array.from(o):[]}return Array.from(e)}function a2(e,t){const n=NE(e),r=new AbortController,i={passive:!0,...t,signal:r.signal};return[n,i,()=>r.abort()]}function J0(e){return t=>{t.pointerType==="touch"||s2()||e(t)}}function _E(e,t,n={}){const[r,i,o]=a2(e,n),a=J0(l=>{const{target:c}=l,u=t(l);if(typeof u!="function"||!c)return;const d=J0(h=>{u(h),c.removeEventListener("pointerleave",d)});c.addEventListener("pointerleave",d,i)});return r.forEach(l=>{l.addEventListener("pointerenter",a,i)}),o}const l2=(e,t)=>t?e===t?!0:l2(e,t.parentElement):!1,Tm=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1,zE=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function BE(e){return zE.has(e.tagName)||e.tabIndex!==-1}const Cs=new WeakSet;function ex(e){return t=>{t.key==="Enter"&&e(t)}}function md(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}const VE=(e,t)=>{const n=e.currentTarget;if(!n)return;const r=ex(()=>{if(Cs.has(n))return;md(n,"down");const i=ex(()=>{md(n,"up")}),o=()=>md(n,"cancel");n.addEventListener("keyup",i,t),n.addEventListener("blur",o,t)});n.addEventListener("keydown",r,t),n.addEventListener("blur",()=>n.removeEventListener("keydown",r),t)};function tx(e){return Tm(e)&&!s2()}function HE(e,t,n={}){const[r,i,o]=a2(e,n),a=l=>{const c=l.currentTarget;if(!tx(l)||Cs.has(c))return;Cs.add(c);const u=t(l),d=(g,m)=>{window.removeEventListener("pointerup",h),window.removeEventListener("pointercancel",f),!(!tx(g)||!Cs.has(c))&&(Cs.delete(c),typeof u=="function"&&u(g,{success:m}))},h=g=>{d(g,n.useGlobalTarget||l2(c,g.target))},f=g=>{d(g,!1)};window.addEventListener("pointerup",h,i),window.addEventListener("pointercancel",f,i)};return r.forEach(l=>{!BE(l)&&l.getAttribute("tabindex")===null&&(l.tabIndex=0),(n.useGlobalTarget?window:l).addEventListener("pointerdown",a,i),l.addEventListener("focus",u=>VE(u,i),i)}),o}function UE(e){return e==="x"||e==="y"?qt[e]?null:(qt[e]=!0,()=>{qt[e]=!1}):qt.x||qt.y?null:(qt.x=qt.y=!0,()=>{qt.x=qt.y=!1})}const c2=new Set(["width","height","top","left","right","bottom",...Ko]);let Yl;function WE(){Yl=void 0}const bn={now:()=>(Yl===void 0&&bn.set(He.isProcessing||z3.useManualTiming?He.timestamp:performance.now()),Yl),set:e=>{Yl=e,queueMicrotask(WE)}};function $m(e,t){e.indexOf(t)===-1&&e.push(t)}function Em(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}class Pm{constructor(){this.subscriptions=[]}add(t){return $m(this.subscriptions,t),()=>Em(this.subscriptions,t)}notify(t,n,r){const i=this.subscriptions.length;if(i)if(i===1)this.subscriptions[0](t,n,r);else for(let o=0;o<i;o++){const a=this.subscriptions[o];a&&a(t,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}function u2(e,t){return t?e*(1e3/t):0}const nx=30,KE=e=>!isNaN(parseFloat(e));class YE{constructor(t,n={}){this.version="11.18.2",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(r,i=!0)=>{const o=bn.now();this.updatedAt!==o&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),i&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=n.owner}setCurrent(t){this.current=t,this.updatedAt=bn.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=KE(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,n){this.events[t]||(this.events[t]=new Pm);const r=this.events[t].add(n);return t==="change"?()=>{r(),he.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t,n=!0){!n||!this.passiveEffect?this.updateAndNotify(t,n):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,n,r){this.set(n),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-r}jump(t,n=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const t=bn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>nx)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,nx);return u2(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(t){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=t(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function da(e,t){return new YE(e,t)}function GE(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,da(n))}function Am(e,t){const n=Su(e,t);let{transitionEnd:r={},transition:i={},...o}=n||{};o={...o,...r};for(const a in o){const l=aE(o[a]);GE(e,a,l)}}function qE(e){return!!(Ze(e)&&e.add)}function Ep(e,t){const n=e.getValue("willChange");if(qE(n))return n.add(t)}function d2(e){return e.props[Bb]}const h2=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,QE=1e-7,XE=12;function ZE(e,t,n,r,i){let o,a,l=0;do a=t+(n-t)/2,o=h2(a,r,i)-e,o>0?n=a:t=a;while(Math.abs(o)>QE&&++l<XE);return a}function Sa(e,t,n,r){if(e===t&&n===r)return Tt;const i=o=>ZE(o,0,1,e,n);return o=>o===0||o===1?o:h2(i(o),t,r)}const p2=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,f2=e=>t=>1-e(1-t),m2=Sa(.33,1.53,.69,.99),Dm=f2(m2),g2=p2(Dm),x2=e=>(e*=2)<1?.5*Dm(e):.5*(2-Math.pow(2,-10*(e-1))),Rm=e=>1-Math.sin(Math.acos(e)),y2=f2(Rm),v2=p2(Rm),w2=e=>/^0[^.\s]+$/u.test(e);function JE(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||w2(e):!0}const Ns=e=>Math.round(e*1e5)/1e5,Mm=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function e6(e){return e==null}const t6=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Lm=(e,t)=>n=>!!(typeof n=="string"&&t6.test(n)&&n.startsWith(e)||t&&!e6(n)&&Object.prototype.hasOwnProperty.call(n,t)),b2=(e,t,n)=>r=>{if(typeof r!="string")return r;const[i,o,a,l]=r.match(Mm);return{[e]:parseFloat(i),[t]:parseFloat(o),[n]:parseFloat(a),alpha:l!==void 0?parseFloat(l):1}},n6=e=>Gn(0,255,e),gd={...Yo,transform:e=>Math.round(n6(e))},ai={test:Lm("rgb","red"),parse:b2("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:r=1})=>"rgba("+gd.transform(e)+", "+gd.transform(t)+", "+gd.transform(n)+", "+Ns(ua.transform(r))+")"};function r6(e){let t="",n="",r="",i="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}const Pp={test:Lm("#"),parse:r6,transform:ai.transform},co={test:Lm("hsl","hue"),parse:b2("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>"hsla("+Math.round(e)+", "+wn.transform(Ns(t))+", "+wn.transform(Ns(n))+", "+Ns(ua.transform(r))+")"},qe={test:e=>ai.test(e)||Pp.test(e)||co.test(e),parse:e=>ai.test(e)?ai.parse(e):co.test(e)?co.parse(e):Pp.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?ai.transform(e):co.transform(e)},i6=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function o6(e){var t,n;return isNaN(e)&&typeof e=="string"&&(((t=e.match(Mm))===null||t===void 0?void 0:t.length)||0)+(((n=e.match(i6))===null||n===void 0?void 0:n.length)||0)>0}const j2="number",k2="color",s6="var",a6="var(",rx="${}",l6=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function ha(e){const t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[];let o=0;const l=t.replace(l6,c=>(qe.test(c)?(r.color.push(o),i.push(k2),n.push(qe.parse(c))):c.startsWith(a6)?(r.var.push(o),i.push(s6),n.push(c)):(r.number.push(o),i.push(j2),n.push(parseFloat(c))),++o,rx)).split(rx);return{values:n,split:l,indexes:r,types:i}}function S2(e){return ha(e).values}function C2(e){const{split:t,types:n}=ha(e),r=t.length;return i=>{let o="";for(let a=0;a<r;a++)if(o+=t[a],i[a]!==void 0){const l=n[a];l===j2?o+=Ns(i[a]):l===k2?o+=qe.transform(i[a]):o+=i[a]}return o}}const c6=e=>typeof e=="number"?0:e;function u6(e){const t=S2(e);return C2(e)(t.map(c6))}const Er={test:o6,parse:S2,createTransformer:C2,getAnimatableNone:u6},d6=new Set(["brightness","contrast","saturate","opacity"]);function h6(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[r]=n.match(Mm)||[];if(!r)return e;const i=n.replace(r,"");let o=d6.has(t)?1:0;return r!==n&&(o*=100),t+"("+o+i+")"}const p6=/\b([a-z-]*)\(.*?\)/gu,Ap={...Er,getAnimatableNone:e=>{const t=e.match(p6);return t?t.map(h6).join(" "):e}},f6={...xm,color:qe,backgroundColor:qe,outlineColor:qe,fill:qe,stroke:qe,borderColor:qe,borderTopColor:qe,borderRightColor:qe,borderBottomColor:qe,borderLeftColor:qe,filter:Ap,WebkitFilter:Ap},Im=e=>f6[e];function T2(e,t){let n=Im(e);return n!==Ap&&(n=Er),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const m6=new Set(["auto","none","0"]);function g6(e,t,n){let r=0,i;for(;r<e.length&&!i;){const o=e[r];typeof o=="string"&&!m6.has(o)&&ha(o).values.length&&(i=e[r]),r++}if(i&&n)for(const o of t)e[o]=T2(n,i)}const ix=e=>e===Yo||e===K,ox=(e,t)=>parseFloat(e.split(", ")[t]),sx=(e,t)=>(n,{transform:r})=>{if(r==="none"||!r)return 0;const i=r.match(/^matrix3d\((.+)\)$/u);if(i)return ox(i[1],t);{const o=r.match(/^matrix\((.+)\)$/u);return o?ox(o[1],e):0}},x6=new Set(["x","y","z"]),y6=Ko.filter(e=>!x6.has(e));function v6(e){const t=[];return y6.forEach(n=>{const r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t}const Oo={width:({x:e},{paddingLeft:t="0",paddingRight:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),height:({y:e},{paddingTop:t="0",paddingBottom:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:sx(4,13),y:sx(5,14)};Oo.translateX=Oo.x;Oo.translateY=Oo.y;const pi=new Set;let Dp=!1,Rp=!1;function $2(){if(Rp){const e=Array.from(pi).filter(r=>r.needsMeasurement),t=new Set(e.map(r=>r.element)),n=new Map;t.forEach(r=>{const i=v6(r);i.length&&(n.set(r,i),r.render())}),e.forEach(r=>r.measureInitialState()),t.forEach(r=>{r.render();const i=n.get(r);i&&i.forEach(([o,a])=>{var l;(l=r.getValue(o))===null||l===void 0||l.set(a)})}),e.forEach(r=>r.measureEndState()),e.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Rp=!1,Dp=!1,pi.forEach(e=>e.complete()),pi.clear()}function E2(){pi.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(Rp=!0)})}function w6(){E2(),$2()}class Om{constructor(t,n,r,i,o,a=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=n,this.name=r,this.motionValue=i,this.element=o,this.isAsync=a}scheduleResolve(){this.isScheduled=!0,this.isAsync?(pi.add(this),Dp||(Dp=!0,he.read(E2),he.resolveKeyframes($2))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:n,element:r,motionValue:i}=this;for(let o=0;o<t.length;o++)if(t[o]===null)if(o===0){const a=i==null?void 0:i.get(),l=t[t.length-1];if(a!==void 0)t[0]=a;else if(r&&n){const c=r.readValue(n,l);c!=null&&(t[0]=c)}t[0]===void 0&&(t[0]=l),i&&a===void 0&&i.set(t[0])}else t[o]=t[o-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),pi.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,pi.delete(this))}resume(){this.isComplete||this.scheduleResolve()}}const P2=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),b6=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function j6(e){const t=b6.exec(e);if(!t)return[,];const[,n,r,i]=t;return[`--${n??r}`,i]}function A2(e,t,n=1){const[r,i]=j6(e);if(!r)return;const o=window.getComputedStyle(t).getPropertyValue(r);if(o){const a=o.trim();return P2(a)?parseFloat(a):a}return gm(i)?A2(i,t,n+1):i}const D2=e=>t=>t.test(e),k6={test:e=>e==="auto",parse:e=>e},R2=[Yo,K,wn,rr,pE,hE,k6],ax=e=>R2.find(D2(e));class M2 extends Om{constructor(t,n,r,i,o){super(t,n,r,i,o,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:n,name:r}=this;if(!n||!n.current)return;super.readKeyframes();for(let c=0;c<t.length;c++){let u=t[c];if(typeof u=="string"&&(u=u.trim(),gm(u))){const d=A2(u,n.current);d!==void 0&&(t[c]=d),c===t.length-1&&(this.finalKeyframe=u)}}if(this.resolveNoneKeyframes(),!c2.has(r)||t.length!==2)return;const[i,o]=t,a=ax(i),l=ax(o);if(a!==l)if(ix(a)&&ix(l))for(let c=0;c<t.length;c++){const u=t[c];typeof u=="string"&&(t[c]=parseFloat(u))}else this.needsMeasurement=!0}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:n}=this,r=[];for(let i=0;i<t.length;i++)JE(t[i])&&r.push(i);r.length&&g6(t,r,n)}measureInitialState(){const{element:t,unresolvedKeyframes:n,name:r}=this;if(!t||!t.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Oo[r](t.measureViewportBox(),window.getComputedStyle(t.current)),n[0]=this.measuredOrigin;const i=n[n.length-1];i!==void 0&&t.getValue(r,i).jump(i,!1)}measureEndState(){var t;const{element:n,name:r,unresolvedKeyframes:i}=this;if(!n||!n.current)return;const o=n.getValue(r);o&&o.jump(this.measuredOrigin,!1);const a=i.length-1,l=i[a];i[a]=Oo[r](n.measureViewportBox(),window.getComputedStyle(n.current)),l!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=l),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([c,u])=>{n.getValue(c).set(u)}),this.resolveNoneKeyframes()}}const lx=(e,t)=>t==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(Er.test(e)||e==="0")&&!e.startsWith("url("));function S6(e){const t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function C6(e,t,n,r){const i=e[0];if(i===null)return!1;if(t==="display"||t==="visibility")return!0;const o=e[e.length-1],a=lx(i,t),l=lx(o,t);return!a||!l?!1:S6(e)||(n==="spring"||Sm(n))&&r}const T6=e=>e!==null;function Cu(e,{repeat:t,repeatType:n="loop"},r){const i=e.filter(T6),o=t&&n!=="loop"&&t%2===1?0:i.length-1;return!o||r===void 0?i[o]:r}const $6=40;class L2{constructor({autoplay:t=!0,delay:n=0,type:r="keyframes",repeat:i=0,repeatDelay:o=0,repeatType:a="loop",...l}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=bn.now(),this.options={autoplay:t,delay:n,type:r,repeat:i,repeatDelay:o,repeatType:a,...l},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>$6?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&w6(),this._resolved}onKeyframesResolved(t,n){this.resolvedAt=bn.now(),this.hasAttemptedResolve=!0;const{name:r,type:i,velocity:o,delay:a,onComplete:l,onUpdate:c,isGenerator:u}=this.options;if(!u&&!C6(t,r,i,o))if(a)this.options.duration=0;else{c&&c(Cu(t,this.options,n)),l&&l(),this.resolveFinishedPromise();return}const d=this.initPlayback(t,n);d!==!1&&(this._resolved={keyframes:t,finalKeyframe:n,...d},this.onPostResolved())}onPostResolved(){}then(t,n){return this.currentFinishedPromise.then(t,n)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}}const ye=(e,t,n)=>e+(t-e)*n;function xd(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function E6({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,o=0,a=0;if(!t)i=o=a=n;else{const l=n<.5?n*(1+t):n+t-n*t,c=2*n-l;i=xd(c,l,e+1/3),o=xd(c,l,e),a=xd(c,l,e-1/3)}return{red:Math.round(i*255),green:Math.round(o*255),blue:Math.round(a*255),alpha:r}}function Ac(e,t){return n=>n>0?t:e}const yd=(e,t,n)=>{const r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},P6=[Pp,ai,co],A6=e=>P6.find(t=>t.test(e));function cx(e){const t=A6(e);if(!t)return!1;let n=t.parse(e);return t===co&&(n=E6(n)),n}const ux=(e,t)=>{const n=cx(e),r=cx(t);if(!n||!r)return Ac(e,t);const i={...n};return o=>(i.red=yd(n.red,r.red,o),i.green=yd(n.green,r.green,o),i.blue=yd(n.blue,r.blue,o),i.alpha=ye(n.alpha,r.alpha,o),ai.transform(i))},D6=(e,t)=>n=>t(e(n)),Ca=(...e)=>e.reduce(D6),Mp=new Set(["none","hidden"]);function R6(e,t){return Mp.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function M6(e,t){return n=>ye(e,t,n)}function Fm(e){return typeof e=="number"?M6:typeof e=="string"?gm(e)?Ac:qe.test(e)?ux:O6:Array.isArray(e)?I2:typeof e=="object"?qe.test(e)?ux:L6:Ac}function I2(e,t){const n=[...e],r=n.length,i=e.map((o,a)=>Fm(o)(o,t[a]));return o=>{for(let a=0;a<r;a++)n[a]=i[a](o);return n}}function L6(e,t){const n={...e,...t},r={};for(const i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=Fm(e[i])(e[i],t[i]));return i=>{for(const o in r)n[o]=r[o](i);return n}}function I6(e,t){var n;const r=[],i={color:0,var:0,number:0};for(let o=0;o<t.values.length;o++){const a=t.types[o],l=e.indexes[a][i[a]],c=(n=e.values[l])!==null&&n!==void 0?n:0;r[o]=c,i[a]++}return r}const O6=(e,t)=>{const n=Er.createTransformer(t),r=ha(e),i=ha(t);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?Mp.has(e)&&!i.values.length||Mp.has(t)&&!r.values.length?R6(e,t):Ca(I2(I6(r,i),i.values),n):Ac(e,t)};function O2(e,t,n){return typeof e=="number"&&typeof t=="number"&&typeof n=="number"?ye(e,t,n):Fm(e)(e,t)}const F6=5;function F2(e,t,n){const r=Math.max(t-F6,0);return u2(n-e(r),t-r)}const be={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},vd=.001;function N6({duration:e=be.duration,bounce:t=be.bounce,velocity:n=be.velocity,mass:r=be.mass}){let i,o,a=1-t;a=Gn(be.minDamping,be.maxDamping,a),e=Gn(be.minDuration,be.maxDuration,_n(e)),a<1?(i=u=>{const d=u*a,h=d*e,f=d-n,g=Lp(u,a),m=Math.exp(-h);return vd-f/g*m},o=u=>{const h=u*a*e,f=h*n+n,g=Math.pow(a,2)*Math.pow(u,2)*e,m=Math.exp(-h),b=Lp(Math.pow(u,2),a);return(-i(u)+vd>0?-1:1)*((f-g)*m)/b}):(i=u=>{const d=Math.exp(-u*e),h=(u-n)*e+1;return-vd+d*h},o=u=>{const d=Math.exp(-u*e),h=(n-u)*(e*e);return d*h});const l=5/e,c=z6(i,o,l);if(e=Nn(e),isNaN(c))return{stiffness:be.stiffness,damping:be.damping,duration:e};{const u=Math.pow(c,2)*r;return{stiffness:u,damping:a*2*Math.sqrt(r*u),duration:e}}}const _6=12;function z6(e,t,n){let r=n;for(let i=1;i<_6;i++)r=r-e(r)/t(r);return r}function Lp(e,t){return e*Math.sqrt(1-t*t)}const B6=["duration","bounce"],V6=["stiffness","damping","mass"];function dx(e,t){return t.some(n=>e[n]!==void 0)}function H6(e){let t={velocity:be.velocity,stiffness:be.stiffness,damping:be.damping,mass:be.mass,isResolvedFromDuration:!1,...e};if(!dx(e,V6)&&dx(e,B6))if(e.visualDuration){const n=e.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,o=2*Gn(.05,1,1-(e.bounce||0))*Math.sqrt(i);t={...t,mass:be.mass,stiffness:i,damping:o}}else{const n=N6(e);t={...t,...n,mass:be.mass},t.isResolvedFromDuration=!0}return t}function N2(e=be.visualDuration,t=be.bounce){const n=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:r,restDelta:i}=n;const o=n.keyframes[0],a=n.keyframes[n.keyframes.length-1],l={done:!1,value:o},{stiffness:c,damping:u,mass:d,duration:h,velocity:f,isResolvedFromDuration:g}=H6({...n,velocity:-_n(n.velocity||0)}),m=f||0,b=u/(2*Math.sqrt(c*d)),j=a-o,x=_n(Math.sqrt(c/d)),v=Math.abs(j)<5;r||(r=v?be.restSpeed.granular:be.restSpeed.default),i||(i=v?be.restDelta.granular:be.restDelta.default);let w;if(b<1){const k=Lp(x,b);w=T=>{const C=Math.exp(-b*x*T);return a-C*((m+b*x*j)/k*Math.sin(k*T)+j*Math.cos(k*T))}}else if(b===1)w=k=>a-Math.exp(-x*k)*(j+(m+x*j)*k);else{const k=x*Math.sqrt(b*b-1);w=T=>{const C=Math.exp(-b*x*T),E=Math.min(k*T,300);return a-C*((m+b*x*j)*Math.sinh(E)+k*j*Math.cosh(E))/k}}const S={calculatedDuration:g&&h||null,next:k=>{const T=w(k);if(g)l.done=k>=h;else{let C=0;b<1&&(C=k===0?Nn(m):F2(w,k,T));const E=Math.abs(C)<=r,P=Math.abs(a-T)<=i;l.done=E&&P}return l.value=l.done?a:T,l},toString:()=>{const k=Math.min(n2(S),Tp),T=r2(C=>S.next(k*C).value,k,30);return k+"ms "+T}};return S}function hx({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:o=500,modifyTarget:a,min:l,max:c,restDelta:u=.5,restSpeed:d}){const h=e[0],f={done:!1,value:h},g=E=>l!==void 0&&E<l||c!==void 0&&E>c,m=E=>l===void 0?c:c===void 0||Math.abs(l-E)<Math.abs(c-E)?l:c;let b=n*t;const j=h+b,x=a===void 0?j:a(j);x!==j&&(b=x-h);const v=E=>-b*Math.exp(-E/r),w=E=>x+v(E),S=E=>{const P=v(E),A=w(E);f.done=Math.abs(P)<=u,f.value=f.done?x:A};let k,T;const C=E=>{g(f.value)&&(k=E,T=N2({keyframes:[f.value,m(f.value)],velocity:F2(w,E,f.value),damping:i,stiffness:o,restDelta:u,restSpeed:d}))};return C(0),{calculatedDuration:null,next:E=>{let P=!1;return!T&&k===void 0&&(P=!0,S(E),C(E)),k!==void 0&&E>=k?T.next(E-k):(!P&&S(E),f)}}}const U6=Sa(.42,0,1,1),W6=Sa(0,0,.58,1),_2=Sa(.42,0,.58,1),K6=e=>Array.isArray(e)&&typeof e[0]!="number",Y6={linear:Tt,easeIn:U6,easeInOut:_2,easeOut:W6,circIn:Rm,circInOut:v2,circOut:y2,backIn:Dm,backInOut:g2,backOut:m2,anticipate:x2},px=e=>{if(Cm(e)){Ob(e.length===4);const[t,n,r,i]=e;return Sa(t,n,r,i)}else if(typeof e=="string")return Y6[e];return e};function G6(e,t,n){const r=[],i=n||O2,o=e.length-1;for(let a=0;a<o;a++){let l=i(e[a],e[a+1]);if(t){const c=Array.isArray(t)?t[a]||Tt:t;l=Ca(c,l)}r.push(l)}return r}function q6(e,t,{clamp:n=!0,ease:r,mixer:i}={}){const o=e.length;if(Ob(o===t.length),o===1)return()=>t[0];if(o===2&&t[0]===t[1])return()=>t[1];const a=e[0]===e[1];e[0]>e[o-1]&&(e=[...e].reverse(),t=[...t].reverse());const l=G6(t,r,i),c=l.length,u=d=>{if(a&&d<e[0])return t[0];let h=0;if(c>1)for(;h<e.length-2&&!(d<e[h+1]);h++);const f=Lo(e[h],e[h+1],d);return l[h](f)};return n?d=>u(Gn(e[0],e[o-1],d)):u}function Q6(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const i=Lo(0,t,r);e.push(ye(n,1,i))}}function X6(e){const t=[0];return Q6(t,e.length-1),t}function Z6(e,t){return e.map(n=>n*t)}function J6(e,t){return e.map(()=>t||_2).splice(0,e.length-1)}function Dc({duration:e=300,keyframes:t,times:n,ease:r="easeInOut"}){const i=K6(r)?r.map(px):px(r),o={done:!1,value:t[0]},a=Z6(n&&n.length===t.length?n:X6(t),e),l=q6(a,t,{ease:Array.isArray(i)?i:J6(t,i)});return{calculatedDuration:e,next:c=>(o.value=l(c),o.done=c>=e,o)}}const eP=e=>{const t=({timestamp:n})=>e(n);return{start:()=>he.update(t,!0),stop:()=>$r(t),now:()=>He.isProcessing?He.timestamp:bn.now()}},tP={decay:hx,inertia:hx,tween:Dc,keyframes:Dc,spring:N2},nP=e=>e/100;class Nm extends L2{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();const{onStop:c}=this.options;c&&c()};const{name:n,motionValue:r,element:i,keyframes:o}=this.options,a=(i==null?void 0:i.KeyframeResolver)||Om,l=(c,u)=>this.onKeyframesResolved(c,u);this.resolver=new a(o,l,n,r,i),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){const{type:n="keyframes",repeat:r=0,repeatDelay:i=0,repeatType:o,velocity:a=0}=this.options,l=Sm(n)?n:tP[n]||Dc;let c,u;l!==Dc&&typeof t[0]!="number"&&(c=Ca(nP,O2(t[0],t[1])),t=[0,100]);const d=l({...this.options,keyframes:t});o==="mirror"&&(u=l({...this.options,keyframes:[...t].reverse(),velocity:-a})),d.calculatedDuration===null&&(d.calculatedDuration=n2(d));const{calculatedDuration:h}=d,f=h+i,g=f*(r+1)-i;return{generator:d,mirroredGenerator:u,mapPercentToKeyframes:c,calculatedDuration:h,resolvedDuration:f,totalDuration:g}}onPostResolved(){const{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,n=!1){const{resolved:r}=this;if(!r){const{keyframes:E}=this.options;return{done:!0,value:E[E.length-1]}}const{finalKeyframe:i,generator:o,mirroredGenerator:a,mapPercentToKeyframes:l,keyframes:c,calculatedDuration:u,totalDuration:d,resolvedDuration:h}=r;if(this.startTime===null)return o.next(0);const{delay:f,repeat:g,repeatType:m,repeatDelay:b,onUpdate:j}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-d/this.speed,this.startTime)),n?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;const x=this.currentTime-f*(this.speed>=0?1:-1),v=this.speed>=0?x<0:x>d;this.currentTime=Math.max(x,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=d);let w=this.currentTime,S=o;if(g){const E=Math.min(this.currentTime,d)/h;let P=Math.floor(E),A=E%1;!A&&E>=1&&(A=1),A===1&&P--,P=Math.min(P,g+1),!!(P%2)&&(m==="reverse"?(A=1-A,b&&(A-=b/h)):m==="mirror"&&(S=a)),w=Gn(0,1,A)*h}const k=v?{done:!1,value:c[0]}:S.next(w);l&&(k.value=l(k.value));let{done:T}=k;!v&&u!==null&&(T=this.speed>=0?this.currentTime>=d:this.currentTime<=0);const C=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&T);return C&&i!==void 0&&(k.value=Cu(c,this.options,i)),j&&j(k.value),C&&this.finish(),k}get duration(){const{resolved:t}=this;return t?_n(t.calculatedDuration):0}get time(){return _n(this.currentTime)}set time(t){t=Nn(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){const n=this.playbackSpeed!==t;this.playbackSpeed=t,n&&(this.time=_n(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;const{driver:t=eP,onPlay:n,startTime:r}=this.options;this.driver||(this.driver=t(o=>this.tick(o))),n&&n();const i=this.driver.now();this.holdTime!==null?this.startTime=i-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=i):this.startTime=r??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";const{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}}const rP=new Set(["opacity","clipPath","filter","transform"]);function iP(e,t,n,{delay:r=0,duration:i=300,repeat:o=0,repeatType:a="loop",ease:l="easeInOut",times:c}={}){const u={[t]:n};c&&(u.offset=c);const d=o2(l,i);return Array.isArray(d)&&(u.easing=d),e.animate(u,{delay:r,duration:i,easing:Array.isArray(d)?"linear":d,fill:"both",iterations:o+1,direction:a==="reverse"?"alternate":"normal"})}const oP=cm(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),Rc=10,sP=2e4;function aP(e){return Sm(e.type)||e.type==="spring"||!i2(e.ease)}function lP(e,t){const n=new Nm({...t,keyframes:e,repeat:0,delay:0,isGenerator:!0});let r={done:!1,value:e[0]};const i=[];let o=0;for(;!r.done&&o<sP;)r=n.sample(o),i.push(r.value),o+=Rc;return{times:void 0,keyframes:i,duration:o-Rc,ease:"linear"}}const z2={anticipate:x2,backInOut:g2,circInOut:v2};function cP(e){return e in z2}class fx extends L2{constructor(t){super(t);const{name:n,motionValue:r,element:i,keyframes:o}=this.options;this.resolver=new M2(o,(a,l)=>this.onKeyframesResolved(a,l),n,r,i),this.resolver.scheduleResolve()}initPlayback(t,n){let{duration:r=300,times:i,ease:o,type:a,motionValue:l,name:c,startTime:u}=this.options;if(!l.owner||!l.owner.current)return!1;if(typeof o=="string"&&Pc()&&cP(o)&&(o=z2[o]),aP(this.options)){const{onComplete:h,onUpdate:f,motionValue:g,element:m,...b}=this.options,j=lP(t,b);t=j.keyframes,t.length===1&&(t[1]=t[0]),r=j.duration,i=j.times,o=j.ease,a="keyframes"}const d=iP(l.owner.current,c,t,{...this.options,duration:r,times:i,ease:o});return d.startTime=u??this.calcStartTime(),this.pendingTimeline?(Z0(d,this.pendingTimeline),this.pendingTimeline=void 0):d.onfinish=()=>{const{onComplete:h}=this.options;l.set(Cu(t,this.options,n)),h&&h(),this.cancel(),this.resolveFinishedPromise()},{animation:d,duration:r,times:i,type:a,ease:o,keyframes:t}}get duration(){const{resolved:t}=this;if(!t)return 0;const{duration:n}=t;return _n(n)}get time(){const{resolved:t}=this;if(!t)return 0;const{animation:n}=t;return _n(n.currentTime||0)}set time(t){const{resolved:n}=this;if(!n)return;const{animation:r}=n;r.currentTime=Nn(t)}get speed(){const{resolved:t}=this;if(!t)return 1;const{animation:n}=t;return n.playbackRate}set speed(t){const{resolved:n}=this;if(!n)return;const{animation:r}=n;r.playbackRate=t}get state(){const{resolved:t}=this;if(!t)return"idle";const{animation:n}=t;return n.playState}get startTime(){const{resolved:t}=this;if(!t)return null;const{animation:n}=t;return n.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{const{resolved:n}=this;if(!n)return Tt;const{animation:r}=n;Z0(r,t)}return Tt}play(){if(this.isStopped)return;const{resolved:t}=this;if(!t)return;const{animation:n}=t;n.playState==="finished"&&this.updateFinishedPromise(),n.play()}pause(){const{resolved:t}=this;if(!t)return;const{animation:n}=t;n.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();const{resolved:t}=this;if(!t)return;const{animation:n,keyframes:r,duration:i,type:o,ease:a,times:l}=t;if(n.playState==="idle"||n.playState==="finished")return;if(this.time){const{motionValue:u,onUpdate:d,onComplete:h,element:f,...g}=this.options,m=new Nm({...g,keyframes:r,duration:i,type:o,ease:a,times:l,isGenerator:!0}),b=Nn(this.time);u.setWithVelocity(m.sample(b-Rc).value,m.sample(b).value,Rc)}const{onStop:c}=this.options;c&&c(),this.cancel()}complete(){const{resolved:t}=this;t&&t.animation.finish()}cancel(){const{resolved:t}=this;t&&t.animation.cancel()}static supports(t){const{motionValue:n,name:r,repeatDelay:i,repeatType:o,damping:a,type:l}=t;if(!n||!n.owner||!(n.owner.current instanceof HTMLElement))return!1;const{onUpdate:c,transformTemplate:u}=n.owner.getProps();return oP()&&r&&rP.has(r)&&!c&&!u&&!i&&o!=="mirror"&&a!==0&&l!=="inertia"}}const uP={type:"spring",stiffness:500,damping:25,restSpeed:10},dP=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),hP={type:"keyframes",duration:.8},pP={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},fP=(e,{keyframes:t})=>t.length>2?hP:$i.has(e)?e.startsWith("scale")?dP(t[1]):uP:pP;function mP({when:e,delay:t,delayChildren:n,staggerChildren:r,staggerDirection:i,repeat:o,repeatType:a,repeatDelay:l,from:c,elapsed:u,...d}){return!!Object.keys(d).length}const _m=(e,t,n,r={},i,o)=>a=>{const l=km(r,e)||{},c=l.delay||r.delay||0;let{elapsed:u=0}=r;u=u-Nn(c);let d={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:t.getVelocity(),...l,delay:-u,onUpdate:f=>{t.set(f),l.onUpdate&&l.onUpdate(f)},onComplete:()=>{a(),l.onComplete&&l.onComplete()},name:e,motionValue:t,element:o?void 0:i};mP(l)||(d={...d,...fP(e,d)}),d.duration&&(d.duration=Nn(d.duration)),d.repeatDelay&&(d.repeatDelay=Nn(d.repeatDelay)),d.from!==void 0&&(d.keyframes[0]=d.from);let h=!1;if((d.type===!1||d.duration===0&&!d.repeatDelay)&&(d.duration=0,d.delay===0&&(h=!0)),h&&!o&&t.get()!==void 0){const f=Cu(d.keyframes,l);if(f!==void 0)return he.update(()=>{d.onUpdate(f),d.onComplete()}),new IE([])}return!o&&fx.supports(d)?new fx(d):new Nm(d)};function gP({protectedKeys:e,needsAnimating:t},n){const r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function B2(e,t,{delay:n=0,transitionOverride:r,type:i}={}){var o;let{transition:a=e.getDefaultTransition(),transitionEnd:l,...c}=t;r&&(a=r);const u=[],d=i&&e.animationState&&e.animationState.getState()[i];for(const h in c){const f=e.getValue(h,(o=e.latestValues[h])!==null&&o!==void 0?o:null),g=c[h];if(g===void 0||d&&gP(d,h))continue;const m={delay:n,...km(a||{},h)};let b=!1;if(window.MotionHandoffAnimation){const x=d2(e);if(x){const v=window.MotionHandoffAnimation(x,h,he);v!==null&&(m.startTime=v,b=!0)}}Ep(e,h),f.start(_m(h,f,g,e.shouldReduceMotion&&c2.has(h)?{type:!1}:m,e,b));const j=f.animation;j&&u.push(j)}return l&&Promise.all(u).then(()=>{he.update(()=>{l&&Am(e,l)})}),u}function Ip(e,t,n={}){var r;const i=Su(e,t,n.type==="exit"?(r=e.presenceContext)===null||r===void 0?void 0:r.custom:void 0);let{transition:o=e.getDefaultTransition()||{}}=i||{};n.transitionOverride&&(o=n.transitionOverride);const a=i?()=>Promise.all(B2(e,i,n)):()=>Promise.resolve(),l=e.variantChildren&&e.variantChildren.size?(u=0)=>{const{delayChildren:d=0,staggerChildren:h,staggerDirection:f}=o;return xP(e,t,d+u,h,f,n)}:()=>Promise.resolve(),{when:c}=o;if(c){const[u,d]=c==="beforeChildren"?[a,l]:[l,a];return u().then(()=>d())}else return Promise.all([a(),l(n.delay)])}function xP(e,t,n=0,r=0,i=1,o){const a=[],l=(e.variantChildren.size-1)*r,c=i===1?(u=0)=>u*r:(u=0)=>l-u*r;return Array.from(e.variantChildren).sort(yP).forEach((u,d)=>{u.notify("AnimationStart",t),a.push(Ip(u,t,{...o,delay:n+c(d)}).then(()=>u.notify("AnimationComplete",t)))}),Promise.all(a)}function yP(e,t){return e.sortNodePosition(t)}function V2(e,t,n={}){e.notify("AnimationStart",t);let r;if(Array.isArray(t)){const i=t.map(o=>Ip(e,o,n));r=Promise.all(i)}else if(typeof t=="string")r=Ip(e,t,n);else{const i=typeof t=="function"?Su(e,t,n.custom):t;r=Promise.all(B2(e,i,n))}return r.then(()=>{e.notify("AnimationComplete",t)})}const vP=dm.length;function H2(e){if(!e)return;if(!e.isControllingVariants){const n=e.parent?H2(e.parent)||{}:{};return e.props.initial!==void 0&&(n.initial=e.props.initial),n}const t={};for(let n=0;n<vP;n++){const r=dm[n],i=e.props[r];(ca(i)||i===!1)&&(t[r]=i)}return t}const wP=[...um].reverse(),bP=um.length;function jP(e){return t=>Promise.all(t.map(({animation:n,options:r})=>V2(e,n,r)))}function kP(e){let t=jP(e),n=mx(),r=!0;const i=c=>(u,d)=>{var h;const f=Su(e,d,c==="exit"?(h=e.presenceContext)===null||h===void 0?void 0:h.custom:void 0);if(f){const{transition:g,transitionEnd:m,...b}=f;u={...u,...b,...m}}return u};function o(c){t=c(e)}function a(c){const{props:u}=e,d=H2(e.parent)||{},h=[],f=new Set;let g={},m=1/0;for(let j=0;j<bP;j++){const x=wP[j],v=n[x],w=u[x]!==void 0?u[x]:d[x],S=ca(w),k=x===c?v.isActive:null;k===!1&&(m=j);let T=w===d[x]&&w!==u[x]&&S;if(T&&r&&e.manuallyAnimateOnMount&&(T=!1),v.protectedKeys={...g},!v.isActive&&k===null||!w&&!v.prevProp||ju(w)||typeof w=="boolean")continue;const C=SP(v.prevProp,w);let E=C||x===c&&v.isActive&&!T&&S||j>m&&S,P=!1;const A=Array.isArray(w)?w:[w];let M=A.reduce(i(x),{});k===!1&&(M={});const{prevResolvedValues:Y={}}=v,X={...Y,...M},_=D=>{E=!0,f.has(D)&&(P=!0,f.delete(D)),v.needsAnimating[D]=!0;const $=e.getValue(D);$&&($.liveStyle=!1)};for(const D in X){const $=M[D],L=Y[D];if(g.hasOwnProperty(D))continue;let I=!1;Cp($)&&Cp(L)?I=!t2($,L):I=$!==L,I?$!=null?_(D):f.add(D):$!==void 0&&f.has(D)?_(D):v.protectedKeys[D]=!0}v.prevProp=w,v.prevResolvedValues=M,v.isActive&&(g={...g,...M}),r&&e.blockInitialAnimation&&(E=!1),E&&(!(T&&C)||P)&&h.push(...A.map(D=>({animation:D,options:{type:x}})))}if(f.size){const j={};f.forEach(x=>{const v=e.getBaseTarget(x),w=e.getValue(x);w&&(w.liveStyle=!0),j[x]=v??null}),h.push({animation:j})}let b=!!h.length;return r&&(u.initial===!1||u.initial===u.animate)&&!e.manuallyAnimateOnMount&&(b=!1),r=!1,b?t(h):Promise.resolve()}function l(c,u){var d;if(n[c].isActive===u)return Promise.resolve();(d=e.variantChildren)===null||d===void 0||d.forEach(f=>{var g;return(g=f.animationState)===null||g===void 0?void 0:g.setActive(c,u)}),n[c].isActive=u;const h=a(c);for(const f in n)n[f].protectedKeys={};return h}return{animateChanges:a,setActive:l,setAnimateFunction:o,getState:()=>n,reset:()=>{n=mx(),r=!0}}}function SP(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!t2(t,e):!1}function Ir(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function mx(){return{animate:Ir(!0),whileInView:Ir(),whileHover:Ir(),whileTap:Ir(),whileDrag:Ir(),whileFocus:Ir(),exit:Ir()}}class Mr{constructor(t){this.isMounted=!1,this.node=t}update(){}}class CP extends Mr{constructor(t){super(t),t.animationState||(t.animationState=kP(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();ju(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),(t=this.unmountControls)===null||t===void 0||t.call(this)}}let TP=0;class $P extends Mr{constructor(){super(...arguments),this.id=TP++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===r)return;const i=this.node.animationState.setActive("exit",!t);n&&!t&&i.then(()=>n(this.id))}mount(){const{register:t}=this.node.presenceContext||{};t&&(this.unmount=t(this.id))}unmount(){}}const EP={animation:{Feature:CP},exit:{Feature:$P}};function pa(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}function Ta(e){return{point:{x:e.pageX,y:e.pageY}}}const PP=e=>t=>Tm(t)&&e(t,Ta(t));function _s(e,t,n,r){return pa(e,t,PP(n),r)}const gx=(e,t)=>Math.abs(e-t);function AP(e,t){const n=gx(e.x,t.x),r=gx(e.y,t.y);return Math.sqrt(n**2+r**2)}class U2{constructor(t,n,{transformPagePoint:r,contextWindow:i,dragSnapToOrigin:o=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const h=bd(this.lastMoveEventInfo,this.history),f=this.startEvent!==null,g=AP(h.offset,{x:0,y:0})>=3;if(!f&&!g)return;const{point:m}=h,{timestamp:b}=He;this.history.push({...m,timestamp:b});const{onStart:j,onMove:x}=this.handlers;f||(j&&j(this.lastMoveEvent,h),this.startEvent=this.lastMoveEvent),x&&x(this.lastMoveEvent,h)},this.handlePointerMove=(h,f)=>{this.lastMoveEvent=h,this.lastMoveEventInfo=wd(f,this.transformPagePoint),he.update(this.updatePoint,!0)},this.handlePointerUp=(h,f)=>{this.end();const{onEnd:g,onSessionEnd:m,resumeAnimation:b}=this.handlers;if(this.dragSnapToOrigin&&b&&b(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const j=bd(h.type==="pointercancel"?this.lastMoveEventInfo:wd(f,this.transformPagePoint),this.history);this.startEvent&&g&&g(h,j),m&&m(h,j)},!Tm(t))return;this.dragSnapToOrigin=o,this.handlers=n,this.transformPagePoint=r,this.contextWindow=i||window;const a=Ta(t),l=wd(a,this.transformPagePoint),{point:c}=l,{timestamp:u}=He;this.history=[{...c,timestamp:u}];const{onSessionStart:d}=n;d&&d(t,bd(l,this.history)),this.removeListeners=Ca(_s(this.contextWindow,"pointermove",this.handlePointerMove),_s(this.contextWindow,"pointerup",this.handlePointerUp),_s(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),$r(this.updatePoint)}}function wd(e,t){return t?{point:t(e.point)}:e}function xx(e,t){return{x:e.x-t.x,y:e.y-t.y}}function bd({point:e},t){return{point:e,delta:xx(e,W2(t)),offset:xx(e,DP(t)),velocity:RP(t,.1)}}function DP(e){return e[0]}function W2(e){return e[e.length-1]}function RP(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const i=W2(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>Nn(t)));)n--;if(!r)return{x:0,y:0};const o=_n(i.timestamp-r.timestamp);if(o===0)return{x:0,y:0};const a={x:(i.x-r.x)/o,y:(i.y-r.y)/o};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}const K2=1e-4,MP=1-K2,LP=1+K2,Y2=.01,IP=0-Y2,OP=0+Y2;function Et(e){return e.max-e.min}function FP(e,t,n){return Math.abs(e-t)<=n}function yx(e,t,n,r=.5){e.origin=r,e.originPoint=ye(t.min,t.max,e.origin),e.scale=Et(n)/Et(t),e.translate=ye(n.min,n.max,e.origin)-e.originPoint,(e.scale>=MP&&e.scale<=LP||isNaN(e.scale))&&(e.scale=1),(e.translate>=IP&&e.translate<=OP||isNaN(e.translate))&&(e.translate=0)}function zs(e,t,n,r){yx(e.x,t.x,n.x,r?r.originX:void 0),yx(e.y,t.y,n.y,r?r.originY:void 0)}function vx(e,t,n){e.min=n.min+t.min,e.max=e.min+Et(t)}function NP(e,t,n){vx(e.x,t.x,n.x),vx(e.y,t.y,n.y)}function wx(e,t,n){e.min=t.min-n.min,e.max=e.min+Et(t)}function Bs(e,t,n){wx(e.x,t.x,n.x),wx(e.y,t.y,n.y)}function _P(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?ye(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?ye(n,e,r.max):Math.min(e,n)),e}function bx(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function zP(e,{top:t,left:n,bottom:r,right:i}){return{x:bx(e.x,n,i),y:bx(e.y,t,r)}}function jx(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function BP(e,t){return{x:jx(e.x,t.x),y:jx(e.y,t.y)}}function VP(e,t){let n=.5;const r=Et(e),i=Et(t);return i>r?n=Lo(t.min,t.max-r,e.min):r>i&&(n=Lo(e.min,e.max-i,t.min)),Gn(0,1,n)}function HP(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const Op=.35;function UP(e=Op){return e===!1?e=0:e===!0&&(e=Op),{x:kx(e,"left","right"),y:kx(e,"top","bottom")}}function kx(e,t,n){return{min:Sx(e,t),max:Sx(e,n)}}function Sx(e,t){return typeof e=="number"?e:e[t]||0}const Cx=()=>({translate:0,scale:1,origin:0,originPoint:0}),uo=()=>({x:Cx(),y:Cx()}),Tx=()=>({min:0,max:0}),Se=()=>({x:Tx(),y:Tx()});function Ot(e){return[e("x"),e("y")]}function G2({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function WP({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function KP(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function jd(e){return e===void 0||e===1}function Fp({scale:e,scaleX:t,scaleY:n}){return!jd(e)||!jd(t)||!jd(n)}function ti(e){return Fp(e)||q2(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function q2(e){return $x(e.x)||$x(e.y)}function $x(e){return e&&e!=="0%"}function Mc(e,t,n){const r=e-n,i=t*r;return n+i}function Ex(e,t,n,r,i){return i!==void 0&&(e=Mc(e,i,r)),Mc(e,n,r)+t}function Np(e,t=0,n=1,r,i){e.min=Ex(e.min,t,n,r,i),e.max=Ex(e.max,t,n,r,i)}function Q2(e,{x:t,y:n}){Np(e.x,t.translate,t.scale,t.originPoint),Np(e.y,n.translate,n.scale,n.originPoint)}const Px=.999999999999,Ax=1.0000000000001;function YP(e,t,n,r=!1){const i=n.length;if(!i)return;t.x=t.y=1;let o,a;for(let l=0;l<i;l++){o=n[l],a=o.projectionDelta;const{visualElement:c}=o.options;c&&c.props.style&&c.props.style.display==="contents"||(r&&o.options.layoutScroll&&o.scroll&&o!==o.root&&po(e,{x:-o.scroll.offset.x,y:-o.scroll.offset.y}),a&&(t.x*=a.x.scale,t.y*=a.y.scale,Q2(e,a)),r&&ti(o.latestValues)&&po(e,o.latestValues))}t.x<Ax&&t.x>Px&&(t.x=1),t.y<Ax&&t.y>Px&&(t.y=1)}function ho(e,t){e.min=e.min+t,e.max=e.max+t}function Dx(e,t,n,r,i=.5){const o=ye(e.min,e.max,i);Np(e,t,n,o,r)}function po(e,t){Dx(e.x,t.x,t.scaleX,t.scale,t.originX),Dx(e.y,t.y,t.scaleY,t.scale,t.originY)}function X2(e,t){return G2(KP(e.getBoundingClientRect(),t))}function GP(e,t,n){const r=X2(e,n),{scroll:i}=t;return i&&(ho(r.x,i.offset.x),ho(r.y,i.offset.y)),r}const Z2=({current:e})=>e?e.ownerDocument.defaultView:null,qP=new WeakMap;class QP{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Se(),this.visualElement=t}start(t,{snapToCursor:n=!1}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const i=d=>{const{dragSnapToOrigin:h}=this.getProps();h?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(Ta(d).point)},o=(d,h)=>{const{drag:f,dragPropagation:g,onDragStart:m}=this.getProps();if(f&&!g&&(this.openDragLock&&this.openDragLock(),this.openDragLock=UE(f),!this.openDragLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Ot(j=>{let x=this.getAxisMotionValue(j).get()||0;if(wn.test(x)){const{projection:v}=this.visualElement;if(v&&v.layout){const w=v.layout.layoutBox[j];w&&(x=Et(w)*(parseFloat(x)/100))}}this.originPoint[j]=x}),m&&he.postRender(()=>m(d,h)),Ep(this.visualElement,"transform");const{animationState:b}=this.visualElement;b&&b.setActive("whileDrag",!0)},a=(d,h)=>{const{dragPropagation:f,dragDirectionLock:g,onDirectionLock:m,onDrag:b}=this.getProps();if(!f&&!this.openDragLock)return;const{offset:j}=h;if(g&&this.currentDirection===null){this.currentDirection=XP(j),this.currentDirection!==null&&m&&m(this.currentDirection);return}this.updateAxis("x",h.point,j),this.updateAxis("y",h.point,j),this.visualElement.render(),b&&b(d,h)},l=(d,h)=>this.stop(d,h),c=()=>Ot(d=>{var h;return this.getAnimationState(d)==="paused"&&((h=this.getAxisMotionValue(d).animation)===null||h===void 0?void 0:h.play())}),{dragSnapToOrigin:u}=this.getProps();this.panSession=new U2(t,{onSessionStart:i,onStart:o,onMove:a,onSessionEnd:l,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:u,contextWindow:Z2(this.visualElement)})}stop(t,n){const r=this.isDragging;if(this.cancel(),!r)return;const{velocity:i}=n;this.startAnimation(i);const{onDragEnd:o}=this.getProps();o&&he.postRender(()=>o(t,n))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,r){const{drag:i}=this.getProps();if(!r||!ol(t,i,this.currentDirection))return;const o=this.getAxisMotionValue(t);let a=this.originPoint[t]+r[t];this.constraints&&this.constraints[t]&&(a=_P(a,this.constraints[t],this.elastic[t])),o.set(a)}resolveConstraints(){var t;const{dragConstraints:n,dragElastic:r}=this.getProps(),i=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(t=this.visualElement.projection)===null||t===void 0?void 0:t.layout,o=this.constraints;n&&lo(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):n&&i?this.constraints=zP(i.layoutBox,n):this.constraints=!1,this.elastic=UP(r),o!==this.constraints&&i&&this.constraints&&!this.hasMutatedConstraints&&Ot(a=>{this.constraints!==!1&&this.getAxisMotionValue(a)&&(this.constraints[a]=HP(i.layoutBox[a],this.constraints[a]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!lo(t))return!1;const r=t.current,{projection:i}=this.visualElement;if(!i||!i.layout)return!1;const o=GP(r,i.root,this.visualElement.getTransformPagePoint());let a=BP(i.layout.layoutBox,o);if(n){const l=n(WP(a));this.hasMutatedConstraints=!!l,l&&(a=G2(l))}return a}startAnimation(t){const{drag:n,dragMomentum:r,dragElastic:i,dragTransition:o,dragSnapToOrigin:a,onDragTransitionEnd:l}=this.getProps(),c=this.constraints||{},u=Ot(d=>{if(!ol(d,n,this.currentDirection))return;let h=c&&c[d]||{};a&&(h={min:0,max:0});const f=i?200:1e6,g=i?40:1e7,m={type:"inertia",velocity:r?t[d]:0,bounceStiffness:f,bounceDamping:g,timeConstant:750,restDelta:1,restSpeed:10,...o,...h};return this.startAxisValueAnimation(d,m)});return Promise.all(u).then(l)}startAxisValueAnimation(t,n){const r=this.getAxisMotionValue(t);return Ep(this.visualElement,t),r.start(_m(t,r,0,n,this.visualElement,!1))}stopAnimation(){Ot(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){Ot(t=>{var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.pause()})}getAnimationState(t){var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.state}getAxisMotionValue(t){const n=`_drag${t.toUpperCase()}`,r=this.visualElement.getProps(),i=r[n];return i||this.visualElement.getValue(t,(r.initial?r.initial[t]:void 0)||0)}snapToCursor(t){Ot(n=>{const{drag:r}=this.getProps();if(!ol(n,r,this.currentDirection))return;const{projection:i}=this.visualElement,o=this.getAxisMotionValue(n);if(i&&i.layout){const{min:a,max:l}=i.layout.layoutBox[n];o.set(t[n]-ye(a,l,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!lo(n)||!r||!this.constraints)return;this.stopAnimation();const i={x:0,y:0};Ot(a=>{const l=this.getAxisMotionValue(a);if(l&&this.constraints!==!1){const c=l.get();i[a]=VP({min:c,max:c},this.constraints[a])}});const{transformTemplate:o}=this.visualElement.getProps();this.visualElement.current.style.transform=o?o({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),Ot(a=>{if(!ol(a,t,null))return;const l=this.getAxisMotionValue(a),{min:c,max:u}=this.constraints[a];l.set(ye(c,u,i[a]))})}addListeners(){if(!this.visualElement.current)return;qP.set(this.visualElement,this);const t=this.visualElement.current,n=_s(t,"pointerdown",c=>{const{drag:u,dragListener:d=!0}=this.getProps();u&&d&&this.start(c)}),r=()=>{const{dragConstraints:c}=this.getProps();lo(c)&&c.current&&(this.constraints=this.resolveRefConstraints())},{projection:i}=this.visualElement,o=i.addEventListener("measure",r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),he.read(r);const a=pa(window,"resize",()=>this.scalePositionWithinConstraints()),l=i.addEventListener("didUpdate",({delta:c,hasLayoutChanged:u})=>{this.isDragging&&u&&(Ot(d=>{const h=this.getAxisMotionValue(d);h&&(this.originPoint[d]+=c[d].translate,h.set(h.get()+c[d].translate))}),this.visualElement.render())});return()=>{a(),n(),o(),l&&l()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:i=!1,dragConstraints:o=!1,dragElastic:a=Op,dragMomentum:l=!0}=t;return{...t,drag:n,dragDirectionLock:r,dragPropagation:i,dragConstraints:o,dragElastic:a,dragMomentum:l}}}function ol(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function XP(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class ZP extends Mr{constructor(t){super(t),this.removeGroupControls=Tt,this.removeListeners=Tt,this.controls=new QP(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Tt}unmount(){this.removeGroupControls(),this.removeListeners()}}const Rx=e=>(t,n)=>{e&&he.postRender(()=>e(t,n))};class JP extends Mr{constructor(){super(...arguments),this.removePointerDownListener=Tt}onPointerDown(t){this.session=new U2(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Z2(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:r,onPanEnd:i}=this.node.getProps();return{onSessionStart:Rx(t),onStart:Rx(n),onMove:r,onEnd:(o,a)=>{delete this.session,i&&he.postRender(()=>i(o,a))}}}mount(){this.removePointerDownListener=_s(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const Gl={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function Mx(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const cs={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(K.test(e))e=parseFloat(e);else return e;const n=Mx(e,t.target.x),r=Mx(e,t.target.y);return`${n}% ${r}%`}},eA={correct:(e,{treeScale:t,projectionDelta:n})=>{const r=e,i=Er.parse(e);if(i.length>5)return r;const o=Er.createTransformer(e),a=typeof i[0]!="number"?1:0,l=n.x.scale*t.x,c=n.y.scale*t.y;i[0+a]/=l,i[1+a]/=c;const u=ye(l,c,.5);return typeof i[2+a]=="number"&&(i[2+a]/=u),typeof i[3+a]=="number"&&(i[3+a]/=u),o(i)}};class tA extends y.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r,layoutId:i}=this.props,{projection:o}=t;kE(nA),o&&(n.group&&n.group.add(o),r&&r.register&&i&&r.register(o),o.root.didUpdate(),o.addEventListener("animationComplete",()=>{this.safeToRemove()}),o.setOptions({...o.options,onExitComplete:()=>this.safeToRemove()})),Gl.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:r,drag:i,isPresent:o}=this.props,a=r.projection;return a&&(a.isPresent=o,i||t.layoutDependency!==n||n===void 0?a.willUpdate():this.safeToRemove(),t.isPresent!==o&&(o?a.promote():a.relegate()||he.postRender(()=>{const l=a.getStack();(!l||!l.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),pm.postRender(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:i}=t;i&&(i.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(i),r&&r.deregister&&r.deregister(i))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function J2(e){const[t,n]=Ib(),r=y.useContext(om);return s.jsx(tA,{...e,layoutGroup:r,switchLayoutGroup:y.useContext(Vb),isPresent:t,safeToRemove:n})}const nA={borderRadius:{...cs,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:cs,borderTopRightRadius:cs,borderBottomLeftRadius:cs,borderBottomRightRadius:cs,boxShadow:eA};function rA(e,t,n){const r=Ze(e)?e:da(e);return r.start(_m("",r,t,n)),r.animation}function iA(e){return e instanceof SVGElement&&e.tagName!=="svg"}const oA=(e,t)=>e.depth-t.depth;class sA{constructor(){this.children=[],this.isDirty=!1}add(t){$m(this.children,t),this.isDirty=!0}remove(t){Em(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(oA),this.isDirty=!1,this.children.forEach(t)}}function aA(e,t){const n=bn.now(),r=({timestamp:i})=>{const o=i-n;o>=t&&($r(r),e(o-t))};return he.read(r,!0),()=>$r(r)}const ej=["TopLeft","TopRight","BottomLeft","BottomRight"],lA=ej.length,Lx=e=>typeof e=="string"?parseFloat(e):e,Ix=e=>typeof e=="number"||K.test(e);function cA(e,t,n,r,i,o){i?(e.opacity=ye(0,n.opacity!==void 0?n.opacity:1,uA(r)),e.opacityExit=ye(t.opacity!==void 0?t.opacity:1,0,dA(r))):o&&(e.opacity=ye(t.opacity!==void 0?t.opacity:1,n.opacity!==void 0?n.opacity:1,r));for(let a=0;a<lA;a++){const l=`border${ej[a]}Radius`;let c=Ox(t,l),u=Ox(n,l);if(c===void 0&&u===void 0)continue;c||(c=0),u||(u=0),c===0||u===0||Ix(c)===Ix(u)?(e[l]=Math.max(ye(Lx(c),Lx(u),r),0),(wn.test(u)||wn.test(c))&&(e[l]+="%")):e[l]=u}(t.rotate||n.rotate)&&(e.rotate=ye(t.rotate||0,n.rotate||0,r))}function Ox(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const uA=tj(0,.5,y2),dA=tj(.5,.95,Tt);function tj(e,t,n){return r=>r<e?0:r>t?1:n(Lo(e,t,r))}function Fx(e,t){e.min=t.min,e.max=t.max}function It(e,t){Fx(e.x,t.x),Fx(e.y,t.y)}function Nx(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}function _x(e,t,n,r,i){return e-=t,e=Mc(e,1/n,r),i!==void 0&&(e=Mc(e,1/i,r)),e}function hA(e,t=0,n=1,r=.5,i,o=e,a=e){if(wn.test(t)&&(t=parseFloat(t),t=ye(a.min,a.max,t/100)-a.min),typeof t!="number")return;let l=ye(o.min,o.max,r);e===o&&(l-=t),e.min=_x(e.min,t,n,l,i),e.max=_x(e.max,t,n,l,i)}function zx(e,t,[n,r,i],o,a){hA(e,t[n],t[r],t[i],t.scale,o,a)}const pA=["x","scaleX","originX"],fA=["y","scaleY","originY"];function Bx(e,t,n,r){zx(e.x,t,pA,n?n.x:void 0,r?r.x:void 0),zx(e.y,t,fA,n?n.y:void 0,r?r.y:void 0)}function Vx(e){return e.translate===0&&e.scale===1}function nj(e){return Vx(e.x)&&Vx(e.y)}function Hx(e,t){return e.min===t.min&&e.max===t.max}function mA(e,t){return Hx(e.x,t.x)&&Hx(e.y,t.y)}function Ux(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function rj(e,t){return Ux(e.x,t.x)&&Ux(e.y,t.y)}function Wx(e){return Et(e.x)/Et(e.y)}function Kx(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}class gA{constructor(){this.members=[]}add(t){$m(this.members,t),t.scheduleRender()}remove(t){if(Em(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){const n=this.members.findIndex(i=>t===i);if(n===0)return!1;let r;for(let i=n;i>=0;i--){const o=this.members[i];if(o.isPresent!==!1){r=o;break}}return r?(this.promote(r),!0):!1}promote(t,n){const r=this.lead;if(t!==r&&(this.prevLead=r,this.lead=t,t.show(),r)){r.instance&&r.scheduleRender(),t.scheduleRender(),t.resumeFrom=r,n&&(t.resumeFrom.preserveOpacity=!0),r.snapshot&&(t.snapshot=r.snapshot,t.snapshot.latestValues=r.animationValues||r.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:i}=t.options;i===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(t=>{const{options:n,resumingFrom:r}=t;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function xA(e,t,n){let r="";const i=e.x.translate/t.x,o=e.y.translate/t.y,a=(n==null?void 0:n.z)||0;if((i||o||a)&&(r=`translate3d(${i}px, ${o}px, ${a}px) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{transformPerspective:u,rotate:d,rotateX:h,rotateY:f,skewX:g,skewY:m}=n;u&&(r=`perspective(${u}px) ${r}`),d&&(r+=`rotate(${d}deg) `),h&&(r+=`rotateX(${h}deg) `),f&&(r+=`rotateY(${f}deg) `),g&&(r+=`skewX(${g}deg) `),m&&(r+=`skewY(${m}deg) `)}const l=e.x.scale*t.x,c=e.y.scale*t.y;return(l!==1||c!==1)&&(r+=`scale(${l}, ${c})`),r||"none"}const ni={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0},Ts=typeof window<"u"&&window.MotionDebug!==void 0,kd=["","X","Y","Z"],yA={visibility:"hidden"},Yx=1e3;let vA=0;function Sd(e,t,n,r){const{latestValues:i}=t;i[e]&&(n[e]=i[e],t.setStaticValue(e,0),r&&(r[e]=0))}function ij(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;const{visualElement:t}=e.options;if(!t)return;const n=d2(t);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:i,layoutId:o}=e.options;window.MotionCancelOptimisedAnimation(n,"transform",he,!(i||o))}const{parent:r}=e;r&&!r.hasCheckedOptimisedAppear&&ij(r)}function oj({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(a={},l=t==null?void 0:t()){this.id=vA++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,Ts&&(ni.totalNodes=ni.resolvedTargetDeltas=ni.recalculatedProjection=0),this.nodes.forEach(jA),this.nodes.forEach($A),this.nodes.forEach(EA),this.nodes.forEach(kA),Ts&&window.MotionDebug.record(ni)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=a,this.root=l?l.root||l:this,this.path=l?[...l.path,l]:[],this.parent=l,this.depth=l?l.depth+1:0;for(let c=0;c<this.path.length;c++)this.path[c].shouldResetTransform=!0;this.root===this&&(this.nodes=new sA)}addEventListener(a,l){return this.eventHandlers.has(a)||this.eventHandlers.set(a,new Pm),this.eventHandlers.get(a).add(l)}notifyListeners(a,...l){const c=this.eventHandlers.get(a);c&&c.notify(...l)}hasListeners(a){return this.eventHandlers.has(a)}mount(a,l=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=iA(a),this.instance=a;const{layoutId:c,layout:u,visualElement:d}=this.options;if(d&&!d.current&&d.mount(a),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),l&&(u||c)&&(this.isLayoutDirty=!0),e){let h;const f=()=>this.root.updateBlockedByResize=!1;e(a,()=>{this.root.updateBlockedByResize=!0,h&&h(),h=aA(f,250),Gl.hasAnimatedSinceResize&&(Gl.hasAnimatedSinceResize=!1,this.nodes.forEach(qx))})}c&&this.root.registerSharedNode(c,this),this.options.animate!==!1&&d&&(c||u)&&this.addEventListener("didUpdate",({delta:h,hasLayoutChanged:f,hasRelativeTargetChanged:g,layout:m})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const b=this.options.transition||d.getDefaultTransition()||MA,{onLayoutAnimationStart:j,onLayoutAnimationComplete:x}=d.getProps(),v=!this.targetLayout||!rj(this.targetLayout,m)||g,w=!f&&g;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||w||f&&(v||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(h,w);const S={...km(b,"layout"),onPlay:j,onComplete:x};(d.shouldReduceMotion||this.options.layoutRoot)&&(S.delay=0,S.type=!1),this.startAnimation(S)}else f||qx(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=m})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const a=this.getStack();a&&a.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,$r(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(PA),this.animationId++)}getTransformTemplate(){const{visualElement:a}=this.options;return a&&a.getProps().transformTemplate}willUpdate(a=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&ij(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let d=0;d<this.path.length;d++){const h=this.path[d];h.shouldResetTransform=!0,h.updateScroll("snapshot"),h.options.layoutRoot&&h.willUpdate(!1)}const{layoutId:l,layout:c}=this.options;if(l===void 0&&!c)return;const u=this.getTransformTemplate();this.prevTransformTemplateValue=u?u(this.latestValues,""):void 0,this.updateSnapshot(),a&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Gx);return}this.isUpdating||this.nodes.forEach(CA),this.isUpdating=!1,this.nodes.forEach(TA),this.nodes.forEach(wA),this.nodes.forEach(bA),this.clearAllSnapshots();const l=bn.now();He.delta=Gn(0,1e3/60,l-He.timestamp),He.timestamp=l,He.isProcessing=!0,fd.update.process(He),fd.preRender.process(He),fd.render.process(He),He.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,pm.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(SA),this.sharedNodes.forEach(AA)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,he.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){he.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let c=0;c<this.path.length;c++)this.path[c].updateScroll();const a=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Se(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:l}=this.options;l&&l.notify("LayoutMeasure",this.layout.layoutBox,a?a.layoutBox:void 0)}updateScroll(a="measure"){let l=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===a&&(l=!1),l){const c=r(this.instance);this.scroll={animationId:this.root.animationId,phase:a,isRoot:c,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:c}}}resetTransform(){if(!i)return;const a=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,l=this.projectionDelta&&!nj(this.projectionDelta),c=this.getTransformTemplate(),u=c?c(this.latestValues,""):void 0,d=u!==this.prevTransformTemplateValue;a&&(l||ti(this.latestValues)||d)&&(i(this.instance,u),this.shouldResetTransform=!1,this.scheduleRender())}measure(a=!0){const l=this.measurePageBox();let c=this.removeElementScroll(l);return a&&(c=this.removeTransform(c)),LA(c),{animationId:this.root.animationId,measuredBox:l,layoutBox:c,latestValues:{},source:this.id}}measurePageBox(){var a;const{visualElement:l}=this.options;if(!l)return Se();const c=l.measureViewportBox();if(!(((a=this.scroll)===null||a===void 0?void 0:a.wasRoot)||this.path.some(IA))){const{scroll:d}=this.root;d&&(ho(c.x,d.offset.x),ho(c.y,d.offset.y))}return c}removeElementScroll(a){var l;const c=Se();if(It(c,a),!((l=this.scroll)===null||l===void 0)&&l.wasRoot)return c;for(let u=0;u<this.path.length;u++){const d=this.path[u],{scroll:h,options:f}=d;d!==this.root&&h&&f.layoutScroll&&(h.wasRoot&&It(c,a),ho(c.x,h.offset.x),ho(c.y,h.offset.y))}return c}applyTransform(a,l=!1){const c=Se();It(c,a);for(let u=0;u<this.path.length;u++){const d=this.path[u];!l&&d.options.layoutScroll&&d.scroll&&d!==d.root&&po(c,{x:-d.scroll.offset.x,y:-d.scroll.offset.y}),ti(d.latestValues)&&po(c,d.latestValues)}return ti(this.latestValues)&&po(c,this.latestValues),c}removeTransform(a){const l=Se();It(l,a);for(let c=0;c<this.path.length;c++){const u=this.path[c];if(!u.instance||!ti(u.latestValues))continue;Fp(u.latestValues)&&u.updateSnapshot();const d=Se(),h=u.measurePageBox();It(d,h),Bx(l,u.latestValues,u.snapshot?u.snapshot.layoutBox:void 0,d)}return ti(this.latestValues)&&Bx(l,this.latestValues),l}setTargetDelta(a){this.targetDelta=a,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(a){this.options={...this.options,...a,crossfade:a.crossfade!==void 0?a.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==He.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(a=!1){var l;const c=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=c.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=c.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=c.isSharedProjectionDirty);const u=!!this.resumingFrom||this!==c;if(!(a||u&&this.isSharedProjectionDirty||this.isProjectionDirty||!((l=this.parent)===null||l===void 0)&&l.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:h,layoutId:f}=this.options;if(!(!this.layout||!(h||f))){if(this.resolvedRelativeTargetAt=He.timestamp,!this.targetDelta&&!this.relativeTarget){const g=this.getClosestProjectingParent();g&&g.layout&&this.animationProgress!==1?(this.relativeParent=g,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Se(),this.relativeTargetOrigin=Se(),Bs(this.relativeTargetOrigin,this.layout.layoutBox,g.layout.layoutBox),It(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=Se(),this.targetWithTransforms=Se()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),NP(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):It(this.target,this.layout.layoutBox),Q2(this.target,this.targetDelta)):It(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const g=this.getClosestProjectingParent();g&&!!g.resumingFrom==!!this.resumingFrom&&!g.options.layoutScroll&&g.target&&this.animationProgress!==1?(this.relativeParent=g,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Se(),this.relativeTargetOrigin=Se(),Bs(this.relativeTargetOrigin,this.target,g.target),It(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}Ts&&ni.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||Fp(this.parent.latestValues)||q2(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var a;const l=this.getLead(),c=!!this.resumingFrom||this!==l;let u=!0;if((this.isProjectionDirty||!((a=this.parent)===null||a===void 0)&&a.isProjectionDirty)&&(u=!1),c&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(u=!1),this.resolvedRelativeTargetAt===He.timestamp&&(u=!1),u)return;const{layout:d,layoutId:h}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(d||h))return;It(this.layoutCorrected,this.layout.layoutBox);const f=this.treeScale.x,g=this.treeScale.y;YP(this.layoutCorrected,this.treeScale,this.path,c),l.layout&&!l.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(l.target=l.layout.layoutBox,l.targetWithTransforms=Se());const{target:m}=l;if(!m){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Nx(this.prevProjectionDelta.x,this.projectionDelta.x),Nx(this.prevProjectionDelta.y,this.projectionDelta.y)),zs(this.projectionDelta,this.layoutCorrected,m,this.latestValues),(this.treeScale.x!==f||this.treeScale.y!==g||!Kx(this.projectionDelta.x,this.prevProjectionDelta.x)||!Kx(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",m)),Ts&&ni.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(a=!0){var l;if((l=this.options.visualElement)===null||l===void 0||l.scheduleRender(),a){const c=this.getStack();c&&c.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=uo(),this.projectionDelta=uo(),this.projectionDeltaWithTransform=uo()}setAnimationOrigin(a,l=!1){const c=this.snapshot,u=c?c.latestValues:{},d={...this.latestValues},h=uo();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!l;const f=Se(),g=c?c.source:void 0,m=this.layout?this.layout.source:void 0,b=g!==m,j=this.getStack(),x=!j||j.members.length<=1,v=!!(b&&!x&&this.options.crossfade===!0&&!this.path.some(RA));this.animationProgress=0;let w;this.mixTargetDelta=S=>{const k=S/1e3;Qx(h.x,a.x,k),Qx(h.y,a.y,k),this.setTargetDelta(h),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Bs(f,this.layout.layoutBox,this.relativeParent.layout.layoutBox),DA(this.relativeTarget,this.relativeTargetOrigin,f,k),w&&mA(this.relativeTarget,w)&&(this.isProjectionDirty=!1),w||(w=Se()),It(w,this.relativeTarget)),b&&(this.animationValues=d,cA(d,u,this.latestValues,k,v,x)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=k},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(a){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&($r(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=he.update(()=>{Gl.hasAnimatedSinceResize=!0,this.currentAnimation=rA(0,Yx,{...a,onUpdate:l=>{this.mixTargetDelta(l),a.onUpdate&&a.onUpdate(l)},onComplete:()=>{a.onComplete&&a.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const a=this.getStack();a&&a.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Yx),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const a=this.getLead();let{targetWithTransforms:l,target:c,layout:u,latestValues:d}=a;if(!(!l||!c||!u)){if(this!==a&&this.layout&&u&&sj(this.options.animationType,this.layout.layoutBox,u.layoutBox)){c=this.target||Se();const h=Et(this.layout.layoutBox.x);c.x.min=a.target.x.min,c.x.max=c.x.min+h;const f=Et(this.layout.layoutBox.y);c.y.min=a.target.y.min,c.y.max=c.y.min+f}It(l,c),po(l,d),zs(this.projectionDeltaWithTransform,this.layoutCorrected,l,d)}}registerSharedNode(a,l){this.sharedNodes.has(a)||this.sharedNodes.set(a,new gA),this.sharedNodes.get(a).add(l);const u=l.options.initialPromotionConfig;l.promote({transition:u?u.transition:void 0,preserveFollowOpacity:u&&u.shouldPreserveFollowOpacity?u.shouldPreserveFollowOpacity(l):void 0})}isLead(){const a=this.getStack();return a?a.lead===this:!0}getLead(){var a;const{layoutId:l}=this.options;return l?((a=this.getStack())===null||a===void 0?void 0:a.lead)||this:this}getPrevLead(){var a;const{layoutId:l}=this.options;return l?(a=this.getStack())===null||a===void 0?void 0:a.prevLead:void 0}getStack(){const{layoutId:a}=this.options;if(a)return this.root.sharedNodes.get(a)}promote({needsReset:a,transition:l,preserveFollowOpacity:c}={}){const u=this.getStack();u&&u.promote(this,c),a&&(this.projectionDelta=void 0,this.needsReset=!0),l&&this.setOptions({transition:l})}relegate(){const a=this.getStack();return a?a.relegate(this):!1}resetSkewAndRotation(){const{visualElement:a}=this.options;if(!a)return;let l=!1;const{latestValues:c}=a;if((c.z||c.rotate||c.rotateX||c.rotateY||c.rotateZ||c.skewX||c.skewY)&&(l=!0),!l)return;const u={};c.z&&Sd("z",a,u,this.animationValues);for(let d=0;d<kd.length;d++)Sd(`rotate${kd[d]}`,a,u,this.animationValues),Sd(`skew${kd[d]}`,a,u,this.animationValues);a.render();for(const d in u)a.setStaticValue(d,u[d]),this.animationValues&&(this.animationValues[d]=u[d]);a.scheduleRender()}getProjectionStyles(a){var l,c;if(!this.instance||this.isSVG)return;if(!this.isVisible)return yA;const u={visibility:""},d=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,u.opacity="",u.pointerEvents=Kl(a==null?void 0:a.pointerEvents)||"",u.transform=d?d(this.latestValues,""):"none",u;const h=this.getLead();if(!this.projectionDelta||!this.layout||!h.target){const b={};return this.options.layoutId&&(b.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,b.pointerEvents=Kl(a==null?void 0:a.pointerEvents)||""),this.hasProjected&&!ti(this.latestValues)&&(b.transform=d?d({},""):"none",this.hasProjected=!1),b}const f=h.animationValues||h.latestValues;this.applyTransformsToTarget(),u.transform=xA(this.projectionDeltaWithTransform,this.treeScale,f),d&&(u.transform=d(f,u.transform));const{x:g,y:m}=this.projectionDelta;u.transformOrigin=`${g.origin*100}% ${m.origin*100}% 0`,h.animationValues?u.opacity=h===this?(c=(l=f.opacity)!==null&&l!==void 0?l:this.latestValues.opacity)!==null&&c!==void 0?c:1:this.preserveOpacity?this.latestValues.opacity:f.opacityExit:u.opacity=h===this?f.opacity!==void 0?f.opacity:"":f.opacityExit!==void 0?f.opacityExit:0;for(const b in Ec){if(f[b]===void 0)continue;const{correct:j,applyTo:x}=Ec[b],v=u.transform==="none"?f[b]:j(f[b],h);if(x){const w=x.length;for(let S=0;S<w;S++)u[x[S]]=v}else u[b]=v}return this.options.layoutId&&(u.pointerEvents=h===this?Kl(a==null?void 0:a.pointerEvents)||"":"none"),u}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(a=>{var l;return(l=a.currentAnimation)===null||l===void 0?void 0:l.stop()}),this.root.nodes.forEach(Gx),this.root.sharedNodes.clear()}}}function wA(e){e.updateLayout()}function bA(e){var t;const n=((t=e.resumeFrom)===null||t===void 0?void 0:t.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&n&&e.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:i}=e.layout,{animationType:o}=e.options,a=n.source!==e.layout.source;o==="size"?Ot(h=>{const f=a?n.measuredBox[h]:n.layoutBox[h],g=Et(f);f.min=r[h].min,f.max=f.min+g}):sj(o,n.layoutBox,r)&&Ot(h=>{const f=a?n.measuredBox[h]:n.layoutBox[h],g=Et(r[h]);f.max=f.min+g,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[h].max=e.relativeTarget[h].min+g)});const l=uo();zs(l,r,n.layoutBox);const c=uo();a?zs(c,e.applyTransform(i,!0),n.measuredBox):zs(c,r,n.layoutBox);const u=!nj(l);let d=!1;if(!e.resumeFrom){const h=e.getClosestProjectingParent();if(h&&!h.resumeFrom){const{snapshot:f,layout:g}=h;if(f&&g){const m=Se();Bs(m,n.layoutBox,f.layoutBox);const b=Se();Bs(b,r,g.layoutBox),rj(m,b)||(d=!0),h.options.layoutRoot&&(e.relativeTarget=b,e.relativeTargetOrigin=m,e.relativeParent=h)}}}e.notifyListeners("didUpdate",{layout:r,snapshot:n,delta:c,layoutDelta:l,hasLayoutChanged:u,hasRelativeTargetChanged:d})}else if(e.isLead()){const{onExitComplete:r}=e.options;r&&r()}e.options.transition=void 0}function jA(e){Ts&&ni.totalNodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function kA(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function SA(e){e.clearSnapshot()}function Gx(e){e.clearMeasurements()}function CA(e){e.isLayoutDirty=!1}function TA(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function qx(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function $A(e){e.resolveTargetDelta()}function EA(e){e.calcProjection()}function PA(e){e.resetSkewAndRotation()}function AA(e){e.removeLeadSnapshot()}function Qx(e,t,n){e.translate=ye(t.translate,0,n),e.scale=ye(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function Xx(e,t,n,r){e.min=ye(t.min,n.min,r),e.max=ye(t.max,n.max,r)}function DA(e,t,n,r){Xx(e.x,t.x,n.x,r),Xx(e.y,t.y,n.y,r)}function RA(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const MA={duration:.45,ease:[.4,0,.1,1]},Zx=e=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),Jx=Zx("applewebkit/")&&!Zx("chrome/")?Math.round:Tt;function ey(e){e.min=Jx(e.min),e.max=Jx(e.max)}function LA(e){ey(e.x),ey(e.y)}function sj(e,t,n){return e==="position"||e==="preserve-aspect"&&!FP(Wx(t),Wx(n),.2)}function IA(e){var t;return e!==e.root&&((t=e.scroll)===null||t===void 0?void 0:t.wasRoot)}const OA=oj({attachResizeListener:(e,t)=>pa(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Cd={current:void 0},aj=oj({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!Cd.current){const e=new OA({});e.mount(window),e.setOptions({layoutScroll:!0}),Cd.current=e}return Cd.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),FA={pan:{Feature:JP},drag:{Feature:ZP,ProjectionNode:aj,MeasureLayout:J2}};function ty(e,t,n){const{props:r}=e;e.animationState&&r.whileHover&&e.animationState.setActive("whileHover",n==="Start");const i="onHover"+n,o=r[i];o&&he.postRender(()=>o(t,Ta(t)))}class NA extends Mr{mount(){const{current:t}=this.node;t&&(this.unmount=_E(t,n=>(ty(this.node,n,"Start"),r=>ty(this.node,r,"End"))))}unmount(){}}class _A extends Mr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Ca(pa(this.node.current,"focus",()=>this.onFocus()),pa(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function ny(e,t,n){const{props:r}=e;e.animationState&&r.whileTap&&e.animationState.setActive("whileTap",n==="Start");const i="onTap"+(n==="End"?"":n),o=r[i];o&&he.postRender(()=>o(t,Ta(t)))}class zA extends Mr{mount(){const{current:t}=this.node;t&&(this.unmount=HE(t,n=>(ny(this.node,n,"Start"),(r,{success:i})=>ny(this.node,r,i?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const _p=new WeakMap,Td=new WeakMap,BA=e=>{const t=_p.get(e.target);t&&t(e)},VA=e=>{e.forEach(BA)};function HA({root:e,...t}){const n=e||document;Td.has(n)||Td.set(n,{});const r=Td.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(VA,{root:e,...t})),r[i]}function UA(e,t,n){const r=HA(t);return _p.set(e,n),r.observe(e),()=>{_p.delete(e),r.unobserve(e)}}const WA={some:0,all:1};class KA extends Mr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:n,margin:r,amount:i="some",once:o}=t,a={root:n?n.current:void 0,rootMargin:r,threshold:typeof i=="number"?i:WA[i]},l=c=>{const{isIntersecting:u}=c;if(this.isInView===u||(this.isInView=u,o&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:d,onViewportLeave:h}=this.node.getProps(),f=u?d:h;f&&f(c)};return UA(this.node.current,a,l)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(YA(t,n))&&this.startObserver()}unmount(){}}function YA({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const GA={inView:{Feature:KA},tap:{Feature:zA},focus:{Feature:_A},hover:{Feature:NA}},qA={layout:{ProjectionNode:aj,MeasureLayout:J2}},zp={current:null},lj={current:!1};function QA(){if(lj.current=!0,!!am)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>zp.current=e.matches;e.addListener(t),t()}else zp.current=!1}const XA=[...R2,qe,Er],ZA=e=>XA.find(D2(e)),ry=new WeakMap;function JA(e,t,n){for(const r in t){const i=t[r],o=n[r];if(Ze(i))e.addValue(r,i);else if(Ze(o))e.addValue(r,da(i,{owner:e}));else if(o!==i)if(e.hasValue(r)){const a=e.getValue(r);a.liveStyle===!0?a.jump(i):a.hasAnimated||a.set(i)}else{const a=e.getStaticValue(r);e.addValue(r,da(a!==void 0?a:i,{owner:e}))}}for(const r in n)t[r]===void 0&&e.removeValue(r);return t}const iy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class eD{scrapeMotionValuesFromProps(t,n,r){return{}}constructor({parent:t,props:n,presenceContext:r,reducedMotionConfig:i,blockInitialAnimation:o,visualState:a},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Om,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const g=bn.now();this.renderScheduledAt<g&&(this.renderScheduledAt=g,he.render(this.render,!1,!0))};const{latestValues:c,renderState:u,onUpdate:d}=a;this.onUpdate=d,this.latestValues=c,this.baseTarget={...c},this.initialValues=n.initial?{...c}:{},this.renderState=u,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=i,this.options=l,this.blockInitialAnimation=!!o,this.isControllingVariants=ku(n),this.isVariantNode=zb(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:h,...f}=this.scrapeMotionValuesFromProps(n,{},this);for(const g in f){const m=f[g];c[g]!==void 0&&Ze(m)&&m.set(c[g],!1)}}mount(t){this.current=t,ry.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((n,r)=>this.bindToMotionValue(r,n)),lj.current||QA(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:zp.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){ry.delete(this.current),this.projection&&this.projection.unmount(),$r(this.notifyUpdate),$r(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const t in this.events)this.events[t].clear();for(const t in this.features){const n=this.features[t];n&&(n.unmount(),n.isMounted=!1)}this.current=null}bindToMotionValue(t,n){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();const r=$i.has(t),i=n.on("change",l=>{this.latestValues[t]=l,this.props.onUpdate&&he.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0)}),o=n.on("renderRequest",this.scheduleRender);let a;window.MotionCheckAppearSync&&(a=window.MotionCheckAppearSync(this,t,n)),this.valueSubscriptions.set(t,()=>{i(),o(),a&&a(),n.owner&&n.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in Io){const n=Io[t];if(!n)continue;const{isEnabled:r,Feature:i}=n;if(!this.features[t]&&i&&r(this.props)&&(this.features[t]=new i(this)),this.features[t]){const o=this.features[t];o.isMounted?o.update():(o.mount(),o.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Se()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<iy.length;r++){const i=iy[r];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);const o="on"+i,a=t[o];a&&(this.propEventSubscriptions[i]=this.on(i,a))}this.prevMotionValues=JA(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){const r=this.values.get(t);n!==r&&(r&&this.removeValue(t),this.bindToMotionValue(t,n),this.values.set(t,n),this.latestValues[t]=n.get())}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let r=this.values.get(t);return r===void 0&&n!==void 0&&(r=da(n===null?void 0:n,{owner:this}),this.addValue(t,r)),r}readValue(t,n){var r;let i=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(r=this.getBaseTargetFromProps(this.props,t))!==null&&r!==void 0?r:this.readValueFromInstance(this.current,t,this.options);return i!=null&&(typeof i=="string"&&(P2(i)||w2(i))?i=parseFloat(i):!ZA(i)&&Er.test(n)&&(i=T2(t,n)),this.setBaseTarget(t,Ze(i)?i.get():i)),Ze(i)?i.get():i}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var n;const{initial:r}=this.props;let i;if(typeof r=="string"||typeof r=="object"){const a=mm(this.props,r,(n=this.presenceContext)===null||n===void 0?void 0:n.custom);a&&(i=a[t])}if(r&&i!==void 0)return i;const o=this.getBaseTargetFromProps(this.props,t);return o!==void 0&&!Ze(o)?o:this.initialValues[t]!==void 0&&i===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new Pm),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}}class cj extends eD{constructor(){super(...arguments),this.KeyframeResolver=M2}sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){return t.style?t.style[n]:void 0}removeValueFromRenderState(t,{vars:n,style:r}){delete n[t],delete r[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;Ze(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}function tD(e){return window.getComputedStyle(e)}class nD extends cj{constructor(){super(...arguments),this.type="html",this.renderInstance=qb}readValueFromInstance(t,n){if($i.has(n)){const r=Im(n);return r&&r.default||0}else{const r=tD(t),i=(Kb(n)?r.getPropertyValue(n):r[n])||0;return typeof i=="string"?i.trim():i}}measureInstanceViewportBox(t,{transformPagePoint:n}){return X2(t,n)}build(t,n,r){ym(t,n,r.transformTemplate)}scrapeMotionValuesFromProps(t,n,r){return jm(t,n,r)}}class rD extends cj{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Se}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if($i.has(n)){const r=Im(n);return r&&r.default||0}return n=Qb.has(n)?n:hm(n),t.getAttribute(n)}scrapeMotionValuesFromProps(t,n,r){return Jb(t,n,r)}build(t,n,r){vm(t,n,this.isSVGTag,r.transformTemplate)}renderInstance(t,n,r,i){Xb(t,n,r,i)}mount(t){this.isSVGTag=bm(t.tagName),super.mount(t)}}const iD=(e,t)=>fm(e)?new rD(t):new nD(t,{allowProjection:e!==y.Fragment}),oD=RE({...EP,...GA,...FA,...qA},iD),H=Y3(oD);function sD(e){e.values.forEach(t=>t.stop())}function Bp(e,t){[...t].reverse().forEach(r=>{const i=e.getVariant(r);i&&Am(e,i),e.variantChildren&&e.variantChildren.forEach(o=>{Bp(o,t)})})}function aD(e,t){if(Array.isArray(t))return Bp(e,t);if(typeof t=="string")return Bp(e,[t]);Am(e,t)}function lD(){const e=new Set,t={subscribe(n){return e.add(n),()=>void e.delete(n)},start(n,r){const i=[];return e.forEach(o=>{i.push(V2(o,n,{transitionOverride:r}))}),Promise.all(i)},set(n){return e.forEach(r=>{aD(r,n)})},stop(){e.forEach(n=>{sD(n)})},mount(){return()=>{t.stop()}}};return t}function cD(){const e=vu(lD);return lm(e.mount,[]),e}const oy=cD,uj=y.createContext(void 0),uD=({children:e,priceMap:t})=>{const[n,r]=y.useState(()=>{try{return JSON.parse(localStorage.getItem("cart")||"[]")}catch{return[]}});y.useEffect(()=>{localStorage.setItem("cart",JSON.stringify(n))},[n]);const i=(u,d=1,h)=>{r(f=>{if(f.find(b=>b.id===u))return f.map(b=>b.id===u?{...b,qty:b.qty+d}:b);const m=(h==null?void 0:h.price)??t[u]??0;return[...f,{id:u,qty:d,name:(h==null?void 0:h.name)??u,image:h==null?void 0:h.image,price:m}]})},o=u=>r(d=>d.filter(h=>h.id!==u)),a=(u,d)=>r(h=>h.map(f=>f.id===u?{...f,qty:d}:f)),l=()=>r([]),c=y.useMemo(()=>n.reduce((u,d)=>{const h=Number(d.price)||0,f=Number(d.qty)||0;return u+h*f},0),[n]);return s.jsx(uj.Provider,{value:{items:n,add:i,remove:o,setQty:a,clear:l,subtotal:c},children:e})},$a=()=>{const e=y.useContext(uj);if(!e)throw new Error("useCart must be used within CartProvider");return e},dj=y.createContext(void 0),dD=({children:e})=>{const[t,n]=y.useState(()=>{try{return JSON.parse(localStorage.getItem("wishlist")||"[]")}catch{return[]}});y.useEffect(()=>{localStorage.setItem("wishlist",JSON.stringify(t))},[t]);const r=o=>n(a=>a.includes(o)?a.filter(l=>l!==o):[...a,o]),i=o=>t.includes(o);return s.jsx(dj.Provider,{value:{ids:t,toggle:r,has:i},children:e})},hD=()=>{const e=y.useContext(dj);if(!e)throw new Error("useWishlist must be used within WishlistProvider");return e},oe=e=>typeof e!="number"||isNaN(e)?"0 ₫":new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",minimumFractionDigits:0,maximumFractionDigits:0}).format(e).replace("VND","₫"),hj=()=>{const{user:e,isAdmin:t,isRestaurant:n,isCustomer:r}=Ke();return{user:e,hasRole:d=>(e==null?void 0:e.role)===d,hasAnyRole:d=>d.some(h=>(e==null?void 0:e.role)===h),canAddToCart:()=>r(),canManageMenu:()=>n()||t(),canAdministrate:()=>t(),getDefaultRedirectPath:()=>{if(!e)return"/login";switch(e.role){case"admin":return"/admin/dashboard";case"restaurant":return"/restaurant";case"customer":return"/menu";default:return"/menu"}},isAdmin:t(),isRestaurant:n(),isCustomer:r()}};/*!
* sweetalert2 v11.26.3
* Released under the MIT License.
*/function pj(e,t,n){if(typeof e=="function"?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}function pD(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function sy(e,t){return e.get(pj(e,t))}function fD(e,t,n){pD(e,t),t.set(e,n)}function mD(e,t,n){return e.set(pj(e,t),n),n}const gD=100,W={},xD=()=>{W.previousActiveElement instanceof HTMLElement?(W.previousActiveElement.focus(),W.previousActiveElement=null):document.body&&document.body.focus()},yD=e=>new Promise(t=>{if(!e)return t();const n=window.scrollX,r=window.scrollY;W.restoreFocusTimeout=setTimeout(()=>{xD(),t()},gD),window.scrollTo(n,r)}),fj="swal2-",vD=["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error","draggable","dragging"],R=vD.reduce((e,t)=>(e[t]=fj+t,e),{}),wD=["success","warning","info","question","error"],Lc=wD.reduce((e,t)=>(e[t]=fj+t,e),{}),mj="SweetAlert2:",zm=e=>e.charAt(0).toUpperCase()+e.slice(1),st=e=>{console.warn(`${mj} ${typeof e=="object"?e.join(" "):e}`)},Ei=e=>{console.error(`${mj} ${e}`)},ay=[],bD=e=>{ay.includes(e)||(ay.push(e),st(e))},gj=(e,t=null)=>{bD(`"${e}" is deprecated and will be removed in the next major release.${t?` Use "${t}" instead.`:""}`)},Tu=e=>typeof e=="function"?e():e,Bm=e=>e&&typeof e.toPromise=="function",Ea=e=>Bm(e)?e.toPromise():Promise.resolve(e),Vm=e=>e&&Promise.resolve(e)===e,ct=()=>document.body.querySelector(`.${R.container}`),Pa=e=>{const t=ct();return t?t.querySelector(e):null},Mt=e=>Pa(`.${e}`),J=()=>Mt(R.popup),Go=()=>Mt(R.icon),jD=()=>Mt(R["icon-content"]),xj=()=>Mt(R.title),Hm=()=>Mt(R["html-container"]),yj=()=>Mt(R.image),Um=()=>Mt(R["progress-steps"]),$u=()=>Mt(R["validation-message"]),jn=()=>Pa(`.${R.actions} .${R.confirm}`),qo=()=>Pa(`.${R.actions} .${R.cancel}`),Pi=()=>Pa(`.${R.actions} .${R.deny}`),kD=()=>Mt(R["input-label"]),Qo=()=>Pa(`.${R.loader}`),Aa=()=>Mt(R.actions),vj=()=>Mt(R.footer),Eu=()=>Mt(R["timer-progress-bar"]),Wm=()=>Mt(R.close),SD=`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`,Km=()=>{const e=J();if(!e)return[];const t=e.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'),n=Array.from(t).sort((o,a)=>{const l=parseInt(o.getAttribute("tabindex")||"0"),c=parseInt(a.getAttribute("tabindex")||"0");return l>c?1:l<c?-1:0}),r=e.querySelectorAll(SD),i=Array.from(r).filter(o=>o.getAttribute("tabindex")!=="-1");return[...new Set(n.concat(i))].filter(o=>vt(o))},Ym=()=>zn(document.body,R.shown)&&!zn(document.body,R["toast-shown"])&&!zn(document.body,R["no-backdrop"]),Pu=()=>{const e=J();return e?zn(e,R.toast):!1},CD=()=>{const e=J();return e?e.hasAttribute("data-loading"):!1},Lt=(e,t)=>{if(e.textContent="",t){const r=new DOMParser().parseFromString(t,"text/html"),i=r.querySelector("head");i&&Array.from(i.childNodes).forEach(a=>{e.appendChild(a)});const o=r.querySelector("body");o&&Array.from(o.childNodes).forEach(a=>{a instanceof HTMLVideoElement||a instanceof HTMLAudioElement?e.appendChild(a.cloneNode(!0)):e.appendChild(a)})}},zn=(e,t)=>{if(!t)return!1;const n=t.split(/\s+/);for(let r=0;r<n.length;r++)if(!e.classList.contains(n[r]))return!1;return!0},TD=(e,t)=>{Array.from(e.classList).forEach(n=>{!Object.values(R).includes(n)&&!Object.values(Lc).includes(n)&&!Object.values(t.showClass||{}).includes(n)&&e.classList.remove(n)})},Pt=(e,t,n)=>{if(TD(e,t),!t.customClass)return;const r=t.customClass[n];if(r){if(typeof r!="string"&&!r.forEach){st(`Invalid type of customClass.${n}! Expected string or iterable object, got "${typeof r}"`);return}te(e,r)}},Au=(e,t)=>{if(!t)return null;switch(t){case"select":case"textarea":case"file":return e.querySelector(`.${R.popup} > .${R[t]}`);case"checkbox":return e.querySelector(`.${R.popup} > .${R.checkbox} input`);case"radio":return e.querySelector(`.${R.popup} > .${R.radio} input:checked`)||e.querySelector(`.${R.popup} > .${R.radio} input:first-child`);case"range":return e.querySelector(`.${R.popup} > .${R.range} input`);default:return e.querySelector(`.${R.popup} > .${R.input}`)}},wj=e=>{if(e.focus(),e.type!=="file"){const t=e.value;e.value="",e.value=t}},bj=(e,t,n)=>{!e||!t||(typeof t=="string"&&(t=t.split(/\s+/).filter(Boolean)),t.forEach(r=>{Array.isArray(e)?e.forEach(i=>{n?i.classList.add(r):i.classList.remove(r)}):n?e.classList.add(r):e.classList.remove(r)}))},te=(e,t)=>{bj(e,t,!0)},Wt=(e,t)=>{bj(e,t,!1)},dr=(e,t)=>{const n=Array.from(e.children);for(let r=0;r<n.length;r++){const i=n[r];if(i instanceof HTMLElement&&zn(i,t))return i}},fi=(e,t,n)=>{n===`${parseInt(`${n}`)}`&&(n=parseInt(n)),n||parseInt(`${n}`)===0?e.style.setProperty(t,typeof n=="number"?`${n}px`:n):e.style.removeProperty(t)},Be=(e,t="flex")=>{e&&(e.style.display=t)},et=e=>{e&&(e.style.display="none")},Gm=(e,t="block")=>{e&&new MutationObserver(()=>{Da(e,e.innerHTML,t)}).observe(e,{childList:!0,subtree:!0})},ly=(e,t,n,r)=>{const i=e.querySelector(t);i&&i.style.setProperty(n,r)},Da=(e,t,n="flex")=>{t?Be(e,n):et(e)},vt=e=>!!(e&&(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),$D=()=>!vt(jn())&&!vt(Pi())&&!vt(qo()),Vp=e=>e.scrollHeight>e.clientHeight,ED=(e,t)=>{let n=e;for(;n&&n!==t;){if(Vp(n))return!0;n=n.parentElement}return!1},jj=e=>{const t=window.getComputedStyle(e),n=parseFloat(t.getPropertyValue("animation-duration")||"0"),r=parseFloat(t.getPropertyValue("transition-duration")||"0");return n>0||r>0},qm=(e,t=!1)=>{const n=Eu();n&&vt(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>{n.style.transition=`width ${e/1e3}s linear`,n.style.width="0%"},10))},PD=()=>{const e=Eu();if(!e)return;const t=parseInt(window.getComputedStyle(e).width);e.style.removeProperty("transition"),e.style.width="100%";const n=parseInt(window.getComputedStyle(e).width),r=t/n*100;e.style.width=`${r}%`},AD=()=>typeof window>"u"||typeof document>"u",DD=`
 <div aria-labelledby="${R.title}" aria-describedby="${R["html-container"]}" class="${R.popup}" tabindex="-1">
   <button type="button" class="${R.close}"></button>
   <ul class="${R["progress-steps"]}"></ul>
   <div class="${R.icon}"></div>
   <img class="${R.image}" />
   <h2 class="${R.title}" id="${R.title}"></h2>
   <div class="${R["html-container"]}" id="${R["html-container"]}"></div>
   <input class="${R.input}" id="${R.input}" />
   <input type="file" class="${R.file}" />
   <div class="${R.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${R.select}" id="${R.select}"></select>
   <div class="${R.radio}"></div>
   <label class="${R.checkbox}">
     <input type="checkbox" id="${R.checkbox}" />
     <span class="${R.label}"></span>
   </label>
   <textarea class="${R.textarea}" id="${R.textarea}"></textarea>
   <div class="${R["validation-message"]}" id="${R["validation-message"]}"></div>
   <div class="${R.actions}">
     <div class="${R.loader}"></div>
     <button type="button" class="${R.confirm}"></button>
     <button type="button" class="${R.deny}"></button>
     <button type="button" class="${R.cancel}"></button>
   </div>
   <div class="${R.footer}"></div>
   <div class="${R["timer-progress-bar-container"]}">
     <div class="${R["timer-progress-bar"]}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g,""),RD=()=>{const e=ct();return e?(e.remove(),Wt([document.documentElement,document.body],[R["no-backdrop"],R["toast-shown"],R["has-column"]]),!0):!1},Or=()=>{W.currentInstance.resetValidationMessage()},MD=()=>{const e=J(),t=dr(e,R.input),n=dr(e,R.file),r=e.querySelector(`.${R.range} input`),i=e.querySelector(`.${R.range} output`),o=dr(e,R.select),a=e.querySelector(`.${R.checkbox} input`),l=dr(e,R.textarea);t.oninput=Or,n.onchange=Or,o.onchange=Or,a.onchange=Or,l.oninput=Or,r.oninput=()=>{Or(),i.value=r.value},r.onchange=()=>{Or(),i.value=r.value}},LD=e=>typeof e=="string"?document.querySelector(e):e,ID=e=>{const t=J();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")},OD=e=>{window.getComputedStyle(e).direction==="rtl"&&te(ct(),R.rtl)},FD=e=>{const t=RD();if(AD()){Ei("SweetAlert2 requires document to initialize");return}const n=document.createElement("div");n.className=R.container,t&&te(n,R["no-transition"]),Lt(n,DD),n.dataset.swal2Theme=e.theme;const r=LD(e.target);r.appendChild(n),e.topLayer&&(n.setAttribute("popover",""),n.showPopover()),ID(e),OD(r),MD()},Qm=(e,t)=>{e instanceof HTMLElement?t.appendChild(e):typeof e=="object"?ND(e,t):e&&Lt(t,e)},ND=(e,t)=>{e.jquery?_D(t,e):Lt(t,e.toString())},_D=(e,t)=>{if(e.textContent="",0 in t)for(let n=0;n in t;n++)e.appendChild(t[n].cloneNode(!0));else e.appendChild(t.cloneNode(!0))},zD=(e,t)=>{const n=Aa(),r=Qo();!n||!r||(!t.showConfirmButton&&!t.showDenyButton&&!t.showCancelButton?et(n):Be(n),Pt(n,t,"actions"),BD(n,r,t),Lt(r,t.loaderHtml||""),Pt(r,t,"loader"))};function BD(e,t,n){const r=jn(),i=Pi(),o=qo();!r||!i||!o||(Ed(r,"confirm",n),Ed(i,"deny",n),Ed(o,"cancel",n),VD(r,i,o,n),n.reverseButtons&&(n.toast?(e.insertBefore(o,r),e.insertBefore(i,r)):(e.insertBefore(o,t),e.insertBefore(i,t),e.insertBefore(r,t))))}function VD(e,t,n,r){if(!r.buttonsStyling){Wt([e,t,n],R.styled);return}te([e,t,n],R.styled),r.confirmButtonColor&&e.style.setProperty("--swal2-confirm-button-background-color",r.confirmButtonColor),r.denyButtonColor&&t.style.setProperty("--swal2-deny-button-background-color",r.denyButtonColor),r.cancelButtonColor&&n.style.setProperty("--swal2-cancel-button-background-color",r.cancelButtonColor),$d(e),$d(t),$d(n)}function $d(e){const t=window.getComputedStyle(e);if(t.getPropertyValue("--swal2-action-button-focus-box-shadow"))return;const n=t.backgroundColor.replace(/rgba?\((\d+), (\d+), (\d+).*/,"rgba($1, $2, $3, 0.5)");e.style.setProperty("--swal2-action-button-focus-box-shadow",t.getPropertyValue("--swal2-outline").replace(/ rgba\(.*/,` ${n}`))}function Ed(e,t,n){const r=zm(t);Da(e,n[`show${r}Button`],"inline-block"),Lt(e,n[`${t}ButtonText`]||""),e.setAttribute("aria-label",n[`${t}ButtonAriaLabel`]||""),e.className=R[t],Pt(e,n,`${t}Button`)}const HD=(e,t)=>{const n=Wm();n&&(Lt(n,t.closeButtonHtml||""),Pt(n,t,"closeButton"),Da(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel||""))},UD=(e,t)=>{const n=ct();n&&(WD(n,t.backdrop),KD(n,t.position),YD(n,t.grow),Pt(n,t,"container"))};function WD(e,t){typeof t=="string"?e.style.background=t:t||te([document.documentElement,document.body],R["no-backdrop"])}function KD(e,t){t&&(t in R?te(e,R[t]):(st('The "position" parameter is not valid, defaulting to "center"'),te(e,R.center)))}function YD(e,t){t&&te(e,R[`grow-${t}`])}var le={innerParams:new WeakMap,domCache:new WeakMap};const GD=["input","file","range","select","radio","checkbox","textarea"],qD=(e,t)=>{const n=J();if(!n)return;const r=le.innerParams.get(e),i=!r||t.input!==r.input;GD.forEach(o=>{const a=dr(n,R[o]);a&&(ZD(o,t.inputAttributes),a.className=R[o],i&&et(a))}),t.input&&(i&&QD(t),JD(t))},QD=e=>{if(!e.input)return;if(!Ce[e.input]){Ei(`Unexpected type of input! Expected ${Object.keys(Ce).join(" | ")}, got "${e.input}"`);return}const t=kj(e.input);if(!t)return;const n=Ce[e.input](t,e);Be(t),e.inputAutoFocus&&setTimeout(()=>{wj(n)})},XD=e=>{for(let t=0;t<e.attributes.length;t++){const n=e.attributes[t].name;["id","type","value","style"].includes(n)||e.removeAttribute(n)}},ZD=(e,t)=>{const n=J();if(!n)return;const r=Au(n,e);if(r){XD(r);for(const i in t)r.setAttribute(i,t[i])}},JD=e=>{if(!e.input)return;const t=kj(e.input);t&&Pt(t,e,"input")},Xm=(e,t)=>{!e.placeholder&&t.inputPlaceholder&&(e.placeholder=t.inputPlaceholder)},Ra=(e,t,n)=>{if(n.inputLabel){const r=document.createElement("label"),i=R["input-label"];r.setAttribute("for",e.id),r.className=i,typeof n.customClass=="object"&&te(r,n.customClass.inputLabel),r.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",r)}},kj=e=>{const t=J();if(t)return dr(t,R[e]||R.input)},Ic=(e,t)=>{["string","number"].includes(typeof t)?e.value=`${t}`:Vm(t)||st(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof t}"`)},Ce={};Ce.text=Ce.email=Ce.password=Ce.number=Ce.tel=Ce.url=Ce.search=Ce.date=Ce["datetime-local"]=Ce.time=Ce.week=Ce.month=(e,t)=>(Ic(e,t.inputValue),Ra(e,e,t),Xm(e,t),e.type=t.input,e);Ce.file=(e,t)=>(Ra(e,e,t),Xm(e,t),e);Ce.range=(e,t)=>{const n=e.querySelector("input"),r=e.querySelector("output");return Ic(n,t.inputValue),n.type=t.input,Ic(r,t.inputValue),Ra(n,e,t),e};Ce.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");Lt(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return Ra(e,e,t),e};Ce.radio=e=>(e.textContent="",e);Ce.checkbox=(e,t)=>{const n=Au(J(),"checkbox");n.value="1",n.checked=!!t.inputValue;const r=e.querySelector("span");return Lt(r,t.inputPlaceholder||t.inputLabel),n};Ce.textarea=(e,t)=>{Ic(e,t.inputValue),Xm(e,t),Ra(e,e,t);const n=r=>parseInt(window.getComputedStyle(r).marginLeft)+parseInt(window.getComputedStyle(r).marginRight);return setTimeout(()=>{if("MutationObserver"in window){const r=parseInt(window.getComputedStyle(J()).width),i=()=>{if(!document.body.contains(e))return;const o=e.offsetWidth+n(e);o>r?J().style.width=`${o}px`:fi(J(),"width",t.width)};new MutationObserver(i).observe(e,{attributes:!0,attributeFilter:["style"]})}}),e};const e4=(e,t)=>{const n=Hm();n&&(Gm(n),Pt(n,t,"htmlContainer"),t.html?(Qm(t.html,n),Be(n,"block")):t.text?(n.textContent=t.text,Be(n,"block")):et(n),qD(e,t))},t4=(e,t)=>{const n=vj();n&&(Gm(n),Da(n,!!t.footer,"block"),t.footer&&Qm(t.footer,n),Pt(n,t,"footer"))},n4=(e,t)=>{const n=le.innerParams.get(e),r=Go();if(!r)return;if(n&&t.icon===n.icon){uy(r,t),cy(r,t);return}if(!t.icon&&!t.iconHtml){et(r);return}if(t.icon&&Object.keys(Lc).indexOf(t.icon)===-1){Ei(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${t.icon}"`),et(r);return}Be(r),uy(r,t),cy(r,t),te(r,t.showClass&&t.showClass.icon),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",Sj)},cy=(e,t)=>{for(const[n,r]of Object.entries(Lc))t.icon!==n&&Wt(e,r);te(e,t.icon&&Lc[t.icon]),o4(e,t),Sj(),Pt(e,t,"icon")},Sj=()=>{const e=J();if(!e)return;const t=window.getComputedStyle(e).getPropertyValue("background-color"),n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let r=0;r<n.length;r++)n[r].style.backgroundColor=t},r4=e=>`
  ${e.animation?'<div class="swal2-success-circular-line-left"></div>':""}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${e.animation?'<div class="swal2-success-fix"></div>':""}
  ${e.animation?'<div class="swal2-success-circular-line-right"></div>':""}
`,i4=`
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`,uy=(e,t)=>{if(!t.icon&&!t.iconHtml)return;let n=e.innerHTML,r="";t.iconHtml?r=dy(t.iconHtml):t.icon==="success"?(r=r4(t),n=n.replace(/ style=".*?"/g,"")):t.icon==="error"?r=i4:t.icon&&(r=dy({question:"?",warning:"!",info:"i"}[t.icon])),n.trim()!==r.trim()&&Lt(e,r)},o4=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])ly(e,n,"background-color",t.iconColor);ly(e,".swal2-success-ring","border-color",t.iconColor)}},dy=e=>`<div class="${R["icon-content"]}">${e}</div>`,s4=(e,t)=>{const n=yj();if(n){if(!t.imageUrl){et(n);return}Be(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt||""),fi(n,"width",t.imageWidth),fi(n,"height",t.imageHeight),n.className=R.image,Pt(n,t,"image")}};let Zm=!1,Cj=0,Tj=0,$j=0,Ej=0;const a4=e=>{e.addEventListener("mousedown",Oc),document.body.addEventListener("mousemove",Fc),e.addEventListener("mouseup",Nc),e.addEventListener("touchstart",Oc),document.body.addEventListener("touchmove",Fc),e.addEventListener("touchend",Nc)},l4=e=>{e.removeEventListener("mousedown",Oc),document.body.removeEventListener("mousemove",Fc),e.removeEventListener("mouseup",Nc),e.removeEventListener("touchstart",Oc),document.body.removeEventListener("touchmove",Fc),e.removeEventListener("touchend",Nc)},Oc=e=>{const t=J();if(e.target===t||Go().contains(e.target)){Zm=!0;const n=Pj(e);Cj=n.clientX,Tj=n.clientY,$j=parseInt(t.style.insetInlineStart)||0,Ej=parseInt(t.style.insetBlockStart)||0,te(t,"swal2-dragging")}},Fc=e=>{const t=J();if(Zm){let{clientX:n,clientY:r}=Pj(e);t.style.insetInlineStart=`${$j+(n-Cj)}px`,t.style.insetBlockStart=`${Ej+(r-Tj)}px`}},Nc=()=>{const e=J();Zm=!1,Wt(e,"swal2-dragging")},Pj=e=>{let t=0,n=0;return e.type.startsWith("mouse")?(t=e.clientX,n=e.clientY):e.type.startsWith("touch")&&(t=e.touches[0].clientX,n=e.touches[0].clientY),{clientX:t,clientY:n}},c4=(e,t)=>{const n=ct(),r=J();if(!(!n||!r)){if(t.toast){fi(n,"width",t.width),r.style.width="100%";const i=Qo();i&&r.insertBefore(i,Go())}else fi(r,"width",t.width);fi(r,"padding",t.padding),t.color&&(r.style.color=t.color),t.background&&(r.style.background=t.background),et($u()),u4(r,t),t.draggable&&!t.toast?(te(r,R.draggable),a4(r)):(Wt(r,R.draggable),l4(r))}},u4=(e,t)=>{const n=t.showClass||{};e.className=`${R.popup} ${vt(e)?n.popup:""}`,t.toast?(te([document.documentElement,document.body],R["toast-shown"]),te(e,R.toast)):te(e,R.modal),Pt(e,t,"popup"),typeof t.customClass=="string"&&te(e,t.customClass),t.icon&&te(e,R[`icon-${t.icon}`])},d4=(e,t)=>{const n=Um();if(!n)return;const{progressSteps:r,currentProgressStep:i}=t;if(!r||r.length===0||i===void 0){et(n);return}Be(n),n.textContent="",i>=r.length&&st("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),r.forEach((o,a)=>{const l=h4(o);if(n.appendChild(l),a===i&&te(l,R["active-progress-step"]),a!==r.length-1){const c=p4(t);n.appendChild(c)}})},h4=e=>{const t=document.createElement("li");return te(t,R["progress-step"]),Lt(t,e),t},p4=e=>{const t=document.createElement("li");return te(t,R["progress-step-line"]),e.progressStepsDistance&&fi(t,"width",e.progressStepsDistance),t},f4=(e,t)=>{const n=xj();n&&(Gm(n),Da(n,!!(t.title||t.titleText),"block"),t.title&&Qm(t.title,n),t.titleText&&(n.innerText=t.titleText),Pt(n,t,"title"))},Aj=(e,t)=>{c4(e,t),UD(e,t),d4(e,t),n4(e,t),s4(e,t),f4(e,t),HD(e,t),e4(e,t),zD(e,t),t4(e,t);const n=J();typeof t.didRender=="function"&&n&&t.didRender(n),W.eventEmitter.emit("didRender",n)},m4=()=>vt(J()),Dj=()=>{var e;return(e=jn())===null||e===void 0?void 0:e.click()},g4=()=>{var e;return(e=Pi())===null||e===void 0?void 0:e.click()},x4=()=>{var e;return(e=qo())===null||e===void 0?void 0:e.click()},Xo=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Rj=e=>{e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1)},y4=(e,t,n)=>{Rj(e),t.toast||(e.keydownHandler=r=>w4(t,r,n),e.keydownTarget=t.keydownListenerCapture?window:J(),e.keydownListenerCapture=t.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0)},Hp=(e,t)=>{var n;const r=Km();if(r.length){e=e+t,e===-2&&(e=r.length-1),e===r.length?e=0:e===-1&&(e=r.length-1),r[e].focus();return}(n=J())===null||n===void 0||n.focus()},Mj=["ArrowRight","ArrowDown"],v4=["ArrowLeft","ArrowUp"],w4=(e,t,n)=>{e&&(t.isComposing||t.keyCode===229||(e.stopKeydownPropagation&&t.stopPropagation(),t.key==="Enter"?b4(t,e):t.key==="Tab"?j4(t):[...Mj,...v4].includes(t.key)?k4(t.key):t.key==="Escape"&&S4(t,e,n)))},b4=(e,t)=>{if(!Tu(t.allowEnterKey))return;const n=Au(J(),t.input);if(e.target&&n&&e.target instanceof HTMLElement&&e.target.outerHTML===n.outerHTML){if(["textarea","file"].includes(t.input))return;Dj(),e.preventDefault()}},j4=e=>{const t=e.target,n=Km();let r=-1;for(let i=0;i<n.length;i++)if(t===n[i]){r=i;break}e.shiftKey?Hp(r,-1):Hp(r,1),e.stopPropagation(),e.preventDefault()},k4=e=>{const t=Aa(),n=jn(),r=Pi(),i=qo();if(!t||!n||!r||!i)return;const o=[n,r,i];if(document.activeElement instanceof HTMLElement&&!o.includes(document.activeElement))return;const a=Mj.includes(e)?"nextElementSibling":"previousElementSibling";let l=document.activeElement;if(l){for(let c=0;c<t.children.length;c++){if(l=l[a],!l)return;if(l instanceof HTMLButtonElement&&vt(l))break}l instanceof HTMLButtonElement&&l.focus()}},S4=(e,t,n)=>{e.preventDefault(),Tu(t.allowEscapeKey)&&n(Xo.esc)};var Fo={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const C4=()=>{const e=ct();Array.from(document.body.children).forEach(n=>{n.contains(e)||(n.hasAttribute("aria-hidden")&&n.setAttribute("data-previous-aria-hidden",n.getAttribute("aria-hidden")||""),n.setAttribute("aria-hidden","true"))})},Lj=()=>{Array.from(document.body.children).forEach(t=>{t.hasAttribute("data-previous-aria-hidden")?(t.setAttribute("aria-hidden",t.getAttribute("data-previous-aria-hidden")||""),t.removeAttribute("data-previous-aria-hidden")):t.removeAttribute("aria-hidden")})},Ij=typeof window<"u"&&!!window.GestureEvent,T4=()=>{if(Ij&&!zn(document.body,R.iosfix)){const e=document.body.scrollTop;document.body.style.top=`${e*-1}px`,te(document.body,R.iosfix),$4()}},$4=()=>{const e=ct();if(!e)return;let t;e.ontouchstart=n=>{t=E4(n)},e.ontouchmove=n=>{t&&(n.preventDefault(),n.stopPropagation())}},E4=e=>{const t=e.target,n=ct(),r=Hm();return!n||!r||P4(e)||A4(e)?!1:t===n||!Vp(n)&&t instanceof HTMLElement&&!ED(t,r)&&t.tagName!=="INPUT"&&t.tagName!=="TEXTAREA"&&!(Vp(r)&&r.contains(t))},P4=e=>e.touches&&e.touches.length&&e.touches[0].touchType==="stylus",A4=e=>e.touches&&e.touches.length>1,D4=()=>{if(zn(document.body,R.iosfix)){const e=parseInt(document.body.style.top,10);Wt(document.body,R.iosfix),document.body.style.top="",document.body.scrollTop=e*-1}},R4=()=>{const e=document.createElement("div");e.className=R["scrollbar-measure"],document.body.appendChild(e);const t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t};let bo=null;const M4=e=>{bo===null&&(document.body.scrollHeight>window.innerHeight||e==="scroll")&&(bo=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight=`${bo+R4()}px`)},L4=()=>{bo!==null&&(document.body.style.paddingRight=`${bo}px`,bo=null)};function Oj(e,t,n,r){Pu()?hy(e,r):(yD(n).then(()=>hy(e,r)),Rj(W)),Ij?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),Ym()&&(L4(),D4(),Lj()),I4()}function I4(){Wt([document.documentElement,document.body],[R.shown,R["height-auto"],R["no-backdrop"],R["toast-shown"]])}function hr(e){e=F4(e);const t=Fo.swalPromiseResolve.get(this),n=O4(this);this.isAwaitingPromise?e.isDismissed||(Ma(this),t(e)):n&&t(e)}const O4=e=>{const t=J();if(!t)return!1;const n=le.innerParams.get(e);if(!n||zn(t,n.hideClass.popup))return!1;Wt(t,n.showClass.popup),te(t,n.hideClass.popup);const r=ct();return Wt(r,n.showClass.backdrop),te(r,n.hideClass.backdrop),N4(e,t,n),!0};function Fj(e){const t=Fo.swalPromiseReject.get(this);Ma(this),t&&t(e)}const Ma=e=>{e.isAwaitingPromise&&(delete e.isAwaitingPromise,le.innerParams.get(e)||e._destroy())},F4=e=>typeof e>"u"?{isConfirmed:!1,isDenied:!1,isDismissed:!0}:Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},e),N4=(e,t,n)=>{var r;const i=ct(),o=jj(t);typeof n.willClose=="function"&&n.willClose(t),(r=W.eventEmitter)===null||r===void 0||r.emit("willClose",t),o?_4(e,t,i,n.returnFocus,n.didClose):Oj(e,i,n.returnFocus,n.didClose)},_4=(e,t,n,r,i)=>{W.swalCloseEventFinishedCallback=Oj.bind(null,e,n,r,i);const o=function(a){if(a.target===t){var l;(l=W.swalCloseEventFinishedCallback)===null||l===void 0||l.call(W),delete W.swalCloseEventFinishedCallback,t.removeEventListener("animationend",o),t.removeEventListener("transitionend",o)}};t.addEventListener("animationend",o),t.addEventListener("transitionend",o)},hy=(e,t)=>{setTimeout(()=>{var n;typeof t=="function"&&t.bind(e.params)(),(n=W.eventEmitter)===null||n===void 0||n.emit("didClose"),e._destroy&&e._destroy()})},No=e=>{let t=J();if(t||new Si,t=J(),!t)return;const n=Qo();Pu()?et(Go()):z4(t,e),Be(n),t.setAttribute("data-loading","true"),t.setAttribute("aria-busy","true"),t.focus()},z4=(e,t)=>{const n=Aa(),r=Qo();!n||!r||(!t&&vt(jn())&&(t=jn()),Be(n),t&&(et(t),r.setAttribute("data-button-to-replace",t.className),n.insertBefore(r,t)),te([e,n],R.loading))},B4=(e,t)=>{t.input==="select"||t.input==="radio"?K4(e,t):["text","email","number","tel","textarea"].some(n=>n===t.input)&&(Bm(t.inputValue)||Vm(t.inputValue))&&(No(jn()),Y4(e,t))},V4=(e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return H4(n);case"radio":return U4(n);case"file":return W4(n);default:return t.inputAutoTrim?n.value.trim():n.value}},H4=e=>e.checked?1:0,U4=e=>e.checked?e.value:null,W4=e=>e.files&&e.files.length?e.getAttribute("multiple")!==null?e.files:e.files[0]:null,K4=(e,t)=>{const n=J();if(!n)return;const r=i=>{t.input==="select"?G4(n,_c(i),t):t.input==="radio"&&q4(n,_c(i),t)};Bm(t.inputOptions)||Vm(t.inputOptions)?(No(jn()),Ea(t.inputOptions).then(i=>{e.hideLoading(),r(i)})):typeof t.inputOptions=="object"?r(t.inputOptions):Ei(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof t.inputOptions}`)},Y4=(e,t)=>{const n=e.getInput();n&&(et(n),Ea(t.inputValue).then(r=>{n.value=t.input==="number"?`${parseFloat(r)||0}`:`${r}`,Be(n),n.focus(),e.hideLoading()}).catch(r=>{Ei(`Error in inputValue promise: ${r}`),n.value="",Be(n),n.focus(),e.hideLoading()}))};function G4(e,t,n){const r=dr(e,R.select);if(!r)return;const i=(o,a,l)=>{const c=document.createElement("option");c.value=l,Lt(c,a),c.selected=Nj(l,n.inputValue),o.appendChild(c)};t.forEach(o=>{const a=o[0],l=o[1];if(Array.isArray(l)){const c=document.createElement("optgroup");c.label=a,c.disabled=!1,r.appendChild(c),l.forEach(u=>i(c,u[1],u[0]))}else i(r,l,a)}),r.focus()}function q4(e,t,n){const r=dr(e,R.radio);if(!r)return;t.forEach(o=>{const a=o[0],l=o[1],c=document.createElement("input"),u=document.createElement("label");c.type="radio",c.name=R.radio,c.value=a,Nj(a,n.inputValue)&&(c.checked=!0);const d=document.createElement("span");Lt(d,l),d.className=R.label,u.appendChild(c),u.appendChild(d),r.appendChild(u)});const i=r.querySelectorAll("input");i.length&&i[0].focus()}const _c=e=>{const t=[];return e instanceof Map?e.forEach((n,r)=>{let i=n;typeof i=="object"&&(i=_c(i)),t.push([r,i])}):Object.keys(e).forEach(n=>{let r=e[n];typeof r=="object"&&(r=_c(r)),t.push([n,r])}),t},Nj=(e,t)=>!!t&&t.toString()===e.toString(),Q4=e=>{const t=le.innerParams.get(e);e.disableButtons(),t.input?_j(e,"confirm"):eg(e,!0)},X4=e=>{const t=le.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?_j(e,"deny"):Jm(e,!1)},Z4=(e,t)=>{e.disableButtons(),t(Xo.cancel)},_j=(e,t)=>{const n=le.innerParams.get(e);if(!n.input){Ei(`The "input" parameter is needed to be set when using returnInputValueOn${zm(t)}`);return}const r=e.getInput(),i=V4(e,n);n.inputValidator?J4(e,i,t):r&&!r.checkValidity()?(e.enableButtons(),e.showValidationMessage(n.validationMessage||r.validationMessage)):t==="deny"?Jm(e,i):eg(e,i)},J4=(e,t,n)=>{const r=le.innerParams.get(e);e.disableInput(),Promise.resolve().then(()=>Ea(r.inputValidator(t,r.validationMessage))).then(o=>{e.enableButtons(),e.enableInput(),o?e.showValidationMessage(o):n==="deny"?Jm(e,t):eg(e,t)})},Jm=(e,t)=>{const n=le.innerParams.get(e||void 0);n.showLoaderOnDeny&&No(Pi()),n.preDeny?(e.isAwaitingPromise=!0,Promise.resolve().then(()=>Ea(n.preDeny(t,n.validationMessage))).then(i=>{i===!1?(e.hideLoading(),Ma(e)):e.close({isDenied:!0,value:typeof i>"u"?t:i})}).catch(i=>zj(e||void 0,i))):e.close({isDenied:!0,value:t})},py=(e,t)=>{e.close({isConfirmed:!0,value:t})},zj=(e,t)=>{e.rejectPromise(t)},eg=(e,t)=>{const n=le.innerParams.get(e||void 0);n.showLoaderOnConfirm&&No(),n.preConfirm?(e.resetValidationMessage(),e.isAwaitingPromise=!0,Promise.resolve().then(()=>Ea(n.preConfirm(t,n.validationMessage))).then(i=>{vt($u())||i===!1?(e.hideLoading(),Ma(e)):py(e,typeof i>"u"?t:i)}).catch(i=>zj(e||void 0,i))):py(e,t)};function zc(){const e=le.innerParams.get(this);if(!e)return;const t=le.domCache.get(this);et(t.loader),Pu()?e.icon&&Be(Go()):e8(t),Wt([t.popup,t.actions],R.loading),t.popup.removeAttribute("aria-busy"),t.popup.removeAttribute("data-loading"),t.confirmButton.disabled=!1,t.denyButton.disabled=!1,t.cancelButton.disabled=!1}const e8=e=>{const t=e.popup.getElementsByClassName(e.loader.getAttribute("data-button-to-replace"));t.length?Be(t[0],"inline-block"):$D()&&et(e.actions)};function Bj(){const e=le.innerParams.get(this),t=le.domCache.get(this);return t?Au(t.popup,e.input):null}function Vj(e,t,n){const r=le.domCache.get(e);t.forEach(i=>{r[i].disabled=n})}function Hj(e,t){const n=J();if(!(!n||!e))if(e.type==="radio"){const r=n.querySelectorAll(`[name="${R.radio}"]`);for(let i=0;i<r.length;i++)r[i].disabled=t}else e.disabled=t}function Uj(){Vj(this,["confirmButton","denyButton","cancelButton"],!1)}function Wj(){Vj(this,["confirmButton","denyButton","cancelButton"],!0)}function Kj(){Hj(this.getInput(),!1)}function Yj(){Hj(this.getInput(),!0)}function Gj(e){const t=le.domCache.get(this),n=le.innerParams.get(this);Lt(t.validationMessage,e),t.validationMessage.className=R["validation-message"],n.customClass&&n.customClass.validationMessage&&te(t.validationMessage,n.customClass.validationMessage),Be(t.validationMessage);const r=this.getInput();r&&(r.setAttribute("aria-invalid","true"),r.setAttribute("aria-describedby",R["validation-message"]),wj(r),te(r,R.inputerror))}function qj(){const e=le.domCache.get(this);e.validationMessage&&et(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),Wt(t,R.inputerror))}const jo={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,draggable:!1,animation:!0,theme:"light",showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoFocus:!0,inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0,topLayer:!1},t8=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","draggable","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","theme","willClose"],n8={allowEnterKey:void 0},r8=["allowOutsideClick","allowEnterKey","backdrop","draggable","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],Qj=e=>Object.prototype.hasOwnProperty.call(jo,e),Xj=e=>t8.indexOf(e)!==-1,Zj=e=>n8[e],i8=e=>{Qj(e)||st(`Unknown parameter "${e}"`)},o8=e=>{r8.includes(e)&&st(`The parameter "${e}" is incompatible with toasts`)},s8=e=>{const t=Zj(e);t&&gj(e,t)},Jj=e=>{e.backdrop===!1&&e.allowOutsideClick&&st('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),e.theme&&!["light","dark","auto","minimal","borderless","bootstrap-4","bootstrap-4-light","bootstrap-4-dark","bootstrap-5","bootstrap-5-light","bootstrap-5-dark","material-ui","material-ui-light","material-ui-dark","embed-iframe","bulma","bulma-light","bulma-dark"].includes(e.theme)&&st(`Invalid theme "${e.theme}"`);for(const t in e)i8(t),e.toast&&o8(t),s8(t)};function ek(e){const t=ct(),n=J(),r=le.innerParams.get(this);if(!n||zn(n,r.hideClass.popup)){st("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");return}const i=a8(e),o=Object.assign({},r,i);Jj(o),t.dataset.swal2Theme=o.theme,Aj(this,o),le.innerParams.set(this,o),Object.defineProperties(this,{params:{value:Object.assign({},this.params,e),writable:!1,enumerable:!0}})}const a8=e=>{const t={};return Object.keys(e).forEach(n=>{Xj(n)?t[n]=e[n]:st(`Invalid parameter to update: ${n}`)}),t};function tk(){const e=le.domCache.get(this),t=le.innerParams.get(this);if(!t){nk(this);return}e.popup&&W.swalCloseEventFinishedCallback&&(W.swalCloseEventFinishedCallback(),delete W.swalCloseEventFinishedCallback),typeof t.didDestroy=="function"&&t.didDestroy(),W.eventEmitter.emit("didDestroy"),l8(this)}const l8=e=>{nk(e),delete e.params,delete W.keydownHandler,delete W.keydownTarget,delete W.currentInstance},nk=e=>{e.isAwaitingPromise?(Pd(le,e),e.isAwaitingPromise=!0):(Pd(Fo,e),Pd(le,e),delete e.isAwaitingPromise,delete e.disableButtons,delete e.enableButtons,delete e.getInput,delete e.disableInput,delete e.enableInput,delete e.hideLoading,delete e.disableLoading,delete e.showValidationMessage,delete e.resetValidationMessage,delete e.close,delete e.closePopup,delete e.closeModal,delete e.closeToast,delete e.rejectPromise,delete e.update,delete e._destroy)},Pd=(e,t)=>{for(const n in e)e[n].delete(t)};var c8=Object.freeze({__proto__:null,_destroy:tk,close:hr,closeModal:hr,closePopup:hr,closeToast:hr,disableButtons:Wj,disableInput:Yj,disableLoading:zc,enableButtons:Uj,enableInput:Kj,getInput:Bj,handleAwaitingPromise:Ma,hideLoading:zc,rejectPromise:Fj,resetValidationMessage:qj,showValidationMessage:Gj,update:ek});const u8=(e,t,n)=>{e.toast?d8(e,t,n):(p8(t),f8(t),m8(e,t,n))},d8=(e,t,n)=>{t.popup.onclick=()=>{e&&(h8(e)||e.timer||e.input)||n(Xo.close)}},h8=e=>!!(e.showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton);let Bc=!1;const p8=e=>{e.popup.onmousedown=()=>{e.container.onmouseup=function(t){e.container.onmouseup=()=>{},t.target===e.container&&(Bc=!0)}}},f8=e=>{e.container.onmousedown=t=>{t.target===e.container&&t.preventDefault(),e.popup.onmouseup=function(n){e.popup.onmouseup=()=>{},(n.target===e.popup||n.target instanceof HTMLElement&&e.popup.contains(n.target))&&(Bc=!0)}}},m8=(e,t,n)=>{t.container.onclick=r=>{if(Bc){Bc=!1;return}r.target===t.container&&Tu(e.allowOutsideClick)&&n(Xo.backdrop)}},g8=e=>typeof e=="object"&&e.jquery,fy=e=>e instanceof Element||g8(e),x8=e=>{const t={};return typeof e[0]=="object"&&!fy(e[0])?Object.assign(t,e[0]):["title","html","icon"].forEach((n,r)=>{const i=e[r];typeof i=="string"||fy(i)?t[n]=i:i!==void 0&&Ei(`Unexpected type of ${n}! Expected "string" or "Element", got ${typeof i}`)}),t};function y8(...e){return new this(...e)}function v8(e){class t extends this{_main(r,i){return super._main(r,Object.assign({},e,i))}}return t}const w8=()=>W.timeout&&W.timeout.getTimerLeft(),rk=()=>{if(W.timeout)return PD(),W.timeout.stop()},ik=()=>{if(W.timeout){const e=W.timeout.start();return qm(e),e}},b8=()=>{const e=W.timeout;return e&&(e.running?rk():ik())},j8=e=>{if(W.timeout){const t=W.timeout.increase(e);return qm(t,!0),t}},k8=()=>!!(W.timeout&&W.timeout.isRunning());let my=!1;const Up={};function S8(e="data-swal-template"){Up[e]=this,my||(document.body.addEventListener("click",C8),my=!0)}const C8=e=>{for(let t=e.target;t&&t!==document;t=t.parentNode)for(const n in Up){const r=t.getAttribute(n);if(r){Up[n].fire({template:r});return}}};class T8{constructor(){this.events={}}_getHandlersByEventName(t){return typeof this.events[t]>"u"&&(this.events[t]=[]),this.events[t]}on(t,n){const r=this._getHandlersByEventName(t);r.includes(n)||r.push(n)}once(t,n){const r=(...i)=>{this.removeListener(t,r),n.apply(this,i)};this.on(t,r)}emit(t,...n){this._getHandlersByEventName(t).forEach(r=>{try{r.apply(this,n)}catch(i){console.error(i)}})}removeListener(t,n){const r=this._getHandlersByEventName(t),i=r.indexOf(n);i>-1&&r.splice(i,1)}removeAllListeners(t){this.events[t]!==void 0&&(this.events[t].length=0)}reset(){this.events={}}}W.eventEmitter=new T8;const $8=(e,t)=>{W.eventEmitter.on(e,t)},E8=(e,t)=>{W.eventEmitter.once(e,t)},P8=(e,t)=>{if(!e){W.eventEmitter.reset();return}t?W.eventEmitter.removeListener(e,t):W.eventEmitter.removeAllListeners(e)};var A8=Object.freeze({__proto__:null,argsToParams:x8,bindClickHandler:S8,clickCancel:x4,clickConfirm:Dj,clickDeny:g4,enableLoading:No,fire:y8,getActions:Aa,getCancelButton:qo,getCloseButton:Wm,getConfirmButton:jn,getContainer:ct,getDenyButton:Pi,getFocusableElements:Km,getFooter:vj,getHtmlContainer:Hm,getIcon:Go,getIconContent:jD,getImage:yj,getInputLabel:kD,getLoader:Qo,getPopup:J,getProgressSteps:Um,getTimerLeft:w8,getTimerProgressBar:Eu,getTitle:xj,getValidationMessage:$u,increaseTimer:j8,isDeprecatedParameter:Zj,isLoading:CD,isTimerRunning:k8,isUpdatableParameter:Xj,isValidParameter:Qj,isVisible:m4,mixin:v8,off:P8,on:$8,once:E8,resumeTimer:ik,showLoading:No,stopTimer:rk,toggleTimer:b8});class D8{constructor(t,n){this.callback=t,this.remaining=n,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.started&&this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date().getTime()-this.started.getTime()),this.remaining}increase(t){const n=this.running;return n&&this.stop(),this.remaining+=t,n&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const ok=["swal-title","swal-html","swal-footer"],R8=e=>{const t=typeof e.template=="string"?document.querySelector(e.template):e.template;if(!t)return{};const n=t.content;return z8(n),Object.assign(M8(n),L8(n),I8(n),O8(n),F8(n),N8(n),_8(n,ok))},M8=e=>{const t={};return Array.from(e.querySelectorAll("swal-param")).forEach(r=>{ki(r,["name","value"]);const i=r.getAttribute("name"),o=r.getAttribute("value");!i||!o||(typeof jo[i]=="boolean"?t[i]=o!=="false":typeof jo[i]=="object"?t[i]=JSON.parse(o):t[i]=o)}),t},L8=e=>{const t={};return Array.from(e.querySelectorAll("swal-function-param")).forEach(r=>{const i=r.getAttribute("name"),o=r.getAttribute("value");!i||!o||(t[i]=new Function(`return ${o}`)())}),t},I8=e=>{const t={};return Array.from(e.querySelectorAll("swal-button")).forEach(r=>{ki(r,["type","color","aria-label"]);const i=r.getAttribute("type");!i||!["confirm","cancel","deny"].includes(i)||(t[`${i}ButtonText`]=r.innerHTML,t[`show${zm(i)}Button`]=!0,r.hasAttribute("color")&&(t[`${i}ButtonColor`]=r.getAttribute("color")),r.hasAttribute("aria-label")&&(t[`${i}ButtonAriaLabel`]=r.getAttribute("aria-label")))}),t},O8=e=>{const t={},n=e.querySelector("swal-image");return n&&(ki(n,["src","width","height","alt"]),n.hasAttribute("src")&&(t.imageUrl=n.getAttribute("src")||void 0),n.hasAttribute("width")&&(t.imageWidth=n.getAttribute("width")||void 0),n.hasAttribute("height")&&(t.imageHeight=n.getAttribute("height")||void 0),n.hasAttribute("alt")&&(t.imageAlt=n.getAttribute("alt")||void 0)),t},F8=e=>{const t={},n=e.querySelector("swal-icon");return n&&(ki(n,["type","color"]),n.hasAttribute("type")&&(t.icon=n.getAttribute("type")),n.hasAttribute("color")&&(t.iconColor=n.getAttribute("color")),t.iconHtml=n.innerHTML),t},N8=e=>{const t={},n=e.querySelector("swal-input");n&&(ki(n,["type","label","placeholder","value"]),t.input=n.getAttribute("type")||"text",n.hasAttribute("label")&&(t.inputLabel=n.getAttribute("label")),n.hasAttribute("placeholder")&&(t.inputPlaceholder=n.getAttribute("placeholder")),n.hasAttribute("value")&&(t.inputValue=n.getAttribute("value")));const r=Array.from(e.querySelectorAll("swal-input-option"));return r.length&&(t.inputOptions={},r.forEach(i=>{ki(i,["value"]);const o=i.getAttribute("value");if(!o)return;const a=i.innerHTML;t.inputOptions[o]=a})),t},_8=(e,t)=>{const n={};for(const r in t){const i=t[r],o=e.querySelector(i);o&&(ki(o,[]),n[i.replace(/^swal-/,"")]=o.innerHTML.trim())}return n},z8=e=>{const t=ok.concat(["swal-param","swal-function-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);Array.from(e.children).forEach(n=>{const r=n.tagName.toLowerCase();t.includes(r)||st(`Unrecognized element <${r}>`)})},ki=(e,t)=>{Array.from(e.attributes).forEach(n=>{t.indexOf(n.name)===-1&&st([`Unrecognized attribute "${n.name}" on <${e.tagName.toLowerCase()}>.`,`${t.length?`Allowed attributes are: ${t.join(", ")}`:"To set the value, use HTML within the element."}`])})},sk=10,B8=e=>{const t=ct(),n=J();typeof e.willOpen=="function"&&e.willOpen(n),W.eventEmitter.emit("willOpen",n);const i=window.getComputedStyle(document.body).overflowY;U8(t,n,e),setTimeout(()=>{V8(t,n)},sk),Ym()&&(H8(t,e.scrollbarPadding,i),C4()),!Pu()&&!W.previousActiveElement&&(W.previousActiveElement=document.activeElement),typeof e.didOpen=="function"&&setTimeout(()=>e.didOpen(n)),W.eventEmitter.emit("didOpen",n)},Vc=e=>{const t=J();if(e.target!==t)return;const n=ct();t.removeEventListener("animationend",Vc),t.removeEventListener("transitionend",Vc),n.style.overflowY="auto",Wt(n,R["no-transition"])},V8=(e,t)=>{jj(t)?(e.style.overflowY="hidden",t.addEventListener("animationend",Vc),t.addEventListener("transitionend",Vc)):e.style.overflowY="auto"},H8=(e,t,n)=>{T4(),t&&n!=="hidden"&&M4(n),setTimeout(()=>{e.scrollTop=0})},U8=(e,t,n)=>{te(e,n.showClass.backdrop),n.animation?(t.style.setProperty("opacity","0","important"),Be(t,"grid"),setTimeout(()=>{te(t,n.showClass.popup),t.style.removeProperty("opacity")},sk)):Be(t,"grid"),te([document.documentElement,document.body],R.shown),n.heightAuto&&n.backdrop&&!n.toast&&te([document.documentElement,document.body],R["height-auto"])};var gy={email:(e,t)=>/^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function W8(e){e.inputValidator||(e.input==="email"&&(e.inputValidator=gy.email),e.input==="url"&&(e.inputValidator=gy.url))}function K8(e){(!e.target||typeof e.target=="string"&&!document.querySelector(e.target)||typeof e.target!="string"&&!e.target.appendChild)&&(st('Target parameter is not valid, defaulting to "body"'),e.target="body")}function Y8(e){W8(e),e.showLoaderOnConfirm&&!e.preConfirm&&st(`showLoaderOnConfirm is set to true, but preConfirm is not defined.
showLoaderOnConfirm should be used together with preConfirm, see usage example:
https://sweetalert2.github.io/#ajax-request`),K8(e),typeof e.title=="string"&&(e.title=e.title.split(`
`).join("<br />")),FD(e)}let un;var sl=new WeakMap;class $e{constructor(...t){if(fD(this,sl,void 0),typeof window>"u")return;un=this;const n=Object.freeze(this.constructor.argsToParams(t));this.params=n,this.isAwaitingPromise=!1,mD(sl,this,this._main(un.params))}_main(t,n={}){if(Jj(Object.assign({},n,t)),W.currentInstance){const o=Fo.swalPromiseResolve.get(W.currentInstance),{isAwaitingPromise:a}=W.currentInstance;W.currentInstance._destroy(),a||o({isDismissed:!0}),Ym()&&Lj()}W.currentInstance=un;const r=q8(t,n);Y8(r),Object.freeze(r),W.timeout&&(W.timeout.stop(),delete W.timeout),clearTimeout(W.restoreFocusTimeout);const i=Q8(un);return Aj(un,r),le.innerParams.set(un,r),G8(un,i,r)}then(t){return sy(sl,this).then(t)}finally(t){return sy(sl,this).finally(t)}}const G8=(e,t,n)=>new Promise((r,i)=>{const o=a=>{e.close({isDismissed:!0,dismiss:a,isConfirmed:!1,isDenied:!1})};Fo.swalPromiseResolve.set(e,r),Fo.swalPromiseReject.set(e,i),t.confirmButton.onclick=()=>{Q4(e)},t.denyButton.onclick=()=>{X4(e)},t.cancelButton.onclick=()=>{Z4(e,o)},t.closeButton.onclick=()=>{o(Xo.close)},u8(n,t,o),y4(W,n,o),B4(e,n),B8(n),X8(W,n,o),Z8(t,n),setTimeout(()=>{t.container.scrollTop=0})}),q8=(e,t)=>{const n=R8(e),r=Object.assign({},jo,t,n,e);return r.showClass=Object.assign({},jo.showClass,r.showClass),r.hideClass=Object.assign({},jo.hideClass,r.hideClass),r.animation===!1&&(r.showClass={backdrop:"swal2-noanimation"},r.hideClass={}),r},Q8=e=>{const t={popup:J(),container:ct(),actions:Aa(),confirmButton:jn(),denyButton:Pi(),cancelButton:qo(),loader:Qo(),closeButton:Wm(),validationMessage:$u(),progressSteps:Um()};return le.domCache.set(e,t),t},X8=(e,t,n)=>{const r=Eu();et(r),t.timer&&(e.timeout=new D8(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(Be(r),Pt(r,t,"timerProgressBar"),setTimeout(()=>{e.timeout&&e.timeout.running&&qm(t.timer)})))},Z8=(e,t)=>{if(!t.toast){if(!Tu(t.allowEnterKey)){gj("allowEnterKey"),tR();return}J8(e)||eR(e,t)||Hp(-1,1)}},J8=e=>{const t=Array.from(e.popup.querySelectorAll("[autofocus]"));for(const n of t)if(n instanceof HTMLElement&&vt(n))return n.focus(),!0;return!1},eR=(e,t)=>t.focusDeny&&vt(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&vt(e.cancelButton)?(e.cancelButton.focus(),!0):t.focusConfirm&&vt(e.confirmButton)?(e.confirmButton.focus(),!0):!1,tR=()=>{document.activeElement instanceof HTMLElement&&typeof document.activeElement.blur=="function"&&document.activeElement.blur()};$e.prototype.disableButtons=Wj;$e.prototype.enableButtons=Uj;$e.prototype.getInput=Bj;$e.prototype.disableInput=Yj;$e.prototype.enableInput=Kj;$e.prototype.hideLoading=zc;$e.prototype.disableLoading=zc;$e.prototype.showValidationMessage=Gj;$e.prototype.resetValidationMessage=qj;$e.prototype.close=hr;$e.prototype.closePopup=hr;$e.prototype.closeModal=hr;$e.prototype.closeToast=hr;$e.prototype.rejectPromise=Fj;$e.prototype.update=ek;$e.prototype._destroy=tk;Object.assign($e,A8);Object.keys(c8).forEach(e=>{$e[e]=function(...t){return un&&un[e]?un[e](...t):null}});$e.DismissReason=Xo;$e.version="11.26.3";const Si=$e;Si.default=Si;typeof document<"u"&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch{n.innerText=t}}(document,':root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-icon-animations: true;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem;container-name:swal2-popup}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}@container swal2-popup style(--swal2-icon-animations:true){div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:all}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}@container swal2-popup style(--swal2-icon-animations:true){.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}');const nR=p(H.div)`
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${e=>e.isAdmin&&`
    border: 2px solid #e74c3c;
    box-shadow: 0 0 0 1px rgba(231, 76, 60, 0.1);
    
    &::after {
      content: 'ADMIN';
      position: absolute;
      top: 8px;
      right: 8px;
      background: #e74c3c;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: bold;
      z-index: 10;
    }
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-light));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`,rR=p(Tr)`
  display: block;
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`,iR=p.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
`,oR=p(Tr)`
  display: block;
  margin-top: 12px;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`,sR=p.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`,aR=p.div`
  color: var(--primary);
  font-weight: 800;
  font-size: 18px;
`,lR=p.span`
  color: var(--secondaryText);
  font-size: 12px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 12px;
`,cR=p.div`
  display: flex; 
  gap: 8px; 
  margin-top: 12px;
`,Ad=p(H.button)`
  flex: 1;
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`,Dd=p(H.button)`
  background: var(--border); 
  color: var(--text);
  border: none;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary);
    color: #fff;
    transform: scale(1.05);
  }
`,uR=p(H.span)`
  position: absolute; 
  top: 8px; 
  left: 8px;
  font-size: 12px; 
  color: #fff; 
  background: var(--primary);
  padding: 6px 12px; 
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
`,dR=({product:e,isAdmin:t,onEdit:n,onDelete:r,onAddToCart:i})=>{const{add:o}=$a(),{toggle:a,has:l}=hD(),{user:c}=Ke(),{canAddToCart:u,isRestaurant:d}=hj(),h=wt(),f=Ul(e),g=()=>{if(!c){Si.fire({title:"Hãy đăng nhập để tiếp tục mua hàng!",text:"Bạn cần đăng nhập để thêm món vào giỏ hàng và theo dõi đơn hàng của mình.",icon:"warning",confirmButtonText:"Đăng nhập ngay",cancelButtonText:"Hủy",showCancelButton:!0,confirmButtonColor:"#007bff",cancelButtonColor:"#6c757d"}).then(b=>{b.isConfirmed&&h("/login")});return}if(!u()){U.error("🚫 Tài khoản nhà hàng không thể thêm món vào giỏ hàng");return}i?i(e):(o(e.id,1,{name:e.name,image:f,price:e.price}),U.success("🛒 Đã thêm vào giỏ hàng!"))},m=()=>{if(!c){Si.fire({title:"Hãy đăng nhập để sử dụng danh sách yêu thích!",text:"Bạn cần đăng nhập để thêm món vào danh sách yêu thích của mình.",icon:"info",confirmButtonText:"Đăng nhập ngay",cancelButtonText:"Hủy",showCancelButton:!0,confirmButtonColor:"#007bff",cancelButtonColor:"#6c757d"}).then(b=>{b.isConfirmed&&h("/login")});return}if(!u()){U.error("🚫 Tài khoản nhà hàng không thể sử dụng danh sách yêu thích");return}a(e.id),U.success(l(e.id)?"Đã xóa khỏi danh sách yêu thích":"Đã thêm vào danh sách yêu thích ❤️")};return s.jsxs(nR,{isAdmin:t,whileHover:{y:-4,scale:1.01},transition:{type:"spring",stiffness:300,damping:20},initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[s.jsxs(rR,{to:`/details/${e.id}`,"aria-label":e.name,children:[e.tag&&s.jsx(uR,{initial:{scale:0},animate:{scale:1},transition:{delay:.2},children:e.tag}),s.jsx(iR,{src:f,alt:e.name,onError:b=>{b.currentTarget.src="https://via.placeholder.com/400x300?text=No+Image"}})]}),s.jsx(oR,{to:`/details/${e.id}`,children:e.name}),s.jsxs(sR,{children:[s.jsx(aR,{children:oe(e.price)}),s.jsx(lR,{children:e.category})]}),s.jsx(cR,{children:t?s.jsxs(s.Fragment,{children:[s.jsx(Ad,{onClick:()=>n==null?void 0:n(e),whileHover:{scale:1.02},whileTap:{scale:.98},style:{background:"#2196f3"},children:"✏️ Chỉnh sửa"}),s.jsx(Dd,{onClick:()=>r==null?void 0:r(e.id),whileHover:{scale:1.1},whileTap:{scale:.9},style:{color:"#e74c3c"},children:"🗑️ Xóa"})]}):d?s.jsxs(s.Fragment,{children:[s.jsx(Ad,{onClick:()=>U("💡 Hãy vào trang Quản lý Menu để chỉnh sửa món ăn",{icon:"💡"}),whileHover:{scale:1.02},whileTap:{scale:.98},style:{background:"#FF6600",opacity:.7,cursor:"not-allowed"},disabled:!0,children:"🏪 Nhà hàng"}),s.jsx(Dd,{style:{opacity:.5,cursor:"not-allowed"},disabled:!0,children:"🚫"})]}):s.jsxs(s.Fragment,{children:[s.jsx(Ad,{onClick:g,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Thêm vào giỏ"}),s.jsx(Dd,{onClick:m,whileHover:{scale:1.1},whileTap:{scale:.9},children:l(e.id)?"♥":"♡"})]})})]})},hR=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,pR=p.div`
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
`,fR=p.div`
  width: 100%;
  height: 200px;
  margin-bottom: 12px;
`,mR=p.div`
  height: 20px;
  width: 70%;
  margin-bottom: 8px;
`,gR=p.div`
  height: 16px;
  width: 40%;
  margin-bottom: 12px;
`,xR=p.div`
  height: 36px;
  width: 100%;
`,yR=()=>s.jsxs(pR,{children:[s.jsx(fR,{className:"skeleton"}),s.jsx(mR,{className:"skeleton"}),s.jsx(gR,{className:"skeleton"}),s.jsx(xR,{className:"skeleton"})]}),vR=({count:e=6})=>s.jsx(hR,{children:Array.from({length:e}).map((t,n)=>s.jsx(H.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:n*.1},children:s.jsx(yR,{})},n))}),ak=y.createContext(void 0),Yi=({children:e})=>{const[t,n]=y.useState(null),[r,i]=y.useState(!0);y.useEffect(()=>{try{const l=localStorage.getItem("admin_auth");l&&n(JSON.parse(l))}catch(l){console.error("Error parsing saved admin:",l)}finally{i(!1)}},[]),y.useEffect(()=>{t?localStorage.setItem("admin_auth",JSON.stringify(t)):localStorage.removeItem("admin_auth")},[t]);const o=async(l,c)=>{if(i(!0),await new Promise(u=>setTimeout(u,400)),l==="admin"&&c==="admin123"){const u={id:"admin_1",name:"System Administrator",username:"admin",role:"admin",email:"admin@foodfast.com",createdAt:Date.now()-31536e6};return n(u),i(!1),{ok:!0}}return i(!1),{ok:!1,message:"Invalid admin credentials"}},a=()=>n(null);return s.jsx(ak.Provider,{value:{admin:t,loading:r,login:o,logout:a},children:r?s.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px",color:"#666"},children:"Loading admin panel..."}):e})},Zo=()=>{const e=y.useContext(ak);return e||(console.error("useAdminAuth must be used inside AdminAuthProvider"),{admin:null,loading:!1,login:async()=>({ok:!1,message:"Admin auth not initialized"}),logout:()=>{}})},lk=y.createContext(void 0),wR=({children:e})=>{const[t,n]=y.useState(()=>{const l=localStorage.getItem("orders");return l?JSON.parse(l):[]});y.useEffect(()=>{localStorage.setItem("orders",JSON.stringify(t))},[t]);const r=l=>{n(c=>[...c,{...l,id:Date.now().toString()}])},i=l=>t.filter(c=>c.phone===l),o=(l,c)=>{n(u=>u.map(d=>d.id===l?{...d,status:c}:d))},a=(l,c,u)=>{n(d=>d.map(h=>h.id===l?{...h,paymentStatus:c,vnpayTransactionId:u||h.vnpayTransactionId}:h))};return s.jsx(lk.Provider,{value:{orders:t,addOrder:r,getOrdersByPhone:i,updateOrderStatus:o,updateOrderPaymentStatus:a},children:e})},Lr=()=>{const e=y.useContext(lk);if(!e)throw new Error("useOrders must be used inside OrderProvider");return e},ck=y.createContext(void 0),bR=({children:e})=>{const[t,n]=y.useState(()=>localStorage.getItem("theme")||"light");y.useEffect(()=>{document.body.dataset.theme=t,localStorage.setItem("theme",t)},[t]);const r=()=>{n(i=>i==="light"?"dark":"light")};return s.jsx(ck.Provider,{value:{theme:t,toggleTheme:r},children:e})},jR=()=>{const e=y.useContext(ck);if(!e)throw new Error("useTheme must be used within ThemeProvider");return e},kR=p.div`
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`,SR=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,CR=p.h4`
  margin: 0;
  color: #495057;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`,TR=p.div`
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`,$R=p.div`
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
`,ER=p.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`,PR=p.path`
  stroke: rgba(0, 123, 255, 0.3);
  stroke-width: 3;
  fill: none;
  stroke-dasharray: 5, 5;
  animation: dash 2s linear infinite;
  
  @keyframes dash {
    to { stroke-dashoffset: -10; }
  }
`,AR=p(H.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  border: 3px solid white;
  z-index: 10;
`,DR=p(H.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
  border: 3px solid white;
  z-index: 10;
`,RR=p(H.div)`
  position: absolute;
  font-size: 24px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  z-index: 15;
  cursor: pointer;
`,MR=p.div`
  margin-bottom: 16px;
`,LR=p.div`
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`,IR=p(H.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff9800 0%, #ffc107 50%, #4caf50 100%);
  border-radius: 6px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`,OR=p.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`,FR=p.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  position: relative;
`,NR=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    right: -50%;
    height: 3px;
    background: ${e=>e.$completed?"#4caf50":"#e9ecef"};
    z-index: 1;
    border-radius: 2px;
  }
  
  &:last-child::after {
    display: none;
  }
`,_R=p.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${e=>e.$completed?"linear-gradient(135deg, #4caf50 0%, #45a049 100%)":e.$active?"linear-gradient(135deg, #007bff 0%, #0056b3 100%)":"#e9ecef"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`,zR=p.span`
  margin-top: 8px;
  font-size: 11px;
  font-weight: ${e=>e.$active?"600":"400"};
  color: ${e=>e.$active?"#007bff":"#6c757d"};
  text-align: center;
`,BR=p.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,VR=p(H.button)`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${e=>e.variant==="pause"?"#ffc107":"#28a745"};
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`,HR=({orderId:e,isActive:t,onComplete:n,deliveryTime:r=15})=>{const[i,o]=y.useState({x:20,y:20}),[a,l]=y.useState(0),[c,u]=y.useState(r*60),[d,h]=y.useState(!1),[f,g]=y.useState(0),m=y.useRef(),b=y.useRef(),j=oy(),x=oy(),v={start:{x:20,y:20},end:{x:320,y:160},waypoints:[{x:80,y:40},{x:140,y:60},{x:200,y:80},{x:260,y:120}]},w=[{icon:"🚀",label:"Rời nhà hàng",key:"departure"},{icon:"🛫",label:"Đang bay",key:"flying"},{icon:"📍",label:"Tiếp cận",key:"approaching"},{icon:"✅",label:"Hoàn tất",key:"delivered"}],S=y.useCallback(P=>{let A=0;const M=[P.start,...P.waypoints,P.end];for(let Y=0;Y<M.length-1;Y++){const X=M[Y+1].x-M[Y].x,_=M[Y+1].y-M[Y].y;A+=Math.sqrt(X*X+_*_)}return A},[]),k=y.useCallback(P=>{const A=[v.start,...v.waypoints,v.end],M=S(v),Y=P/100*M;let X=0;for(let _=0;_<A.length-1;_++){const N=A[_+1].x-A[_].x,F=A[_+1].y-A[_].y,D=Math.sqrt(N*N+F*F);if(X+D>=Y){const $=(Y-X)/D;return{x:A[_].x+N*$,y:A[_].y+F*$}}X+=D}return v.end},[v,S]),T=y.useCallback(P=>{if(b.current||(b.current=P),!d){const A=(P-b.current)/1e3,M=r*60,Y=Math.min(A/M*100,100),X=Math.max(M-A,0);l(Y),u(X);const _=k(Y);o(_);const N=Math.floor(Y/100*w.length);if(g(Math.min(N,w.length-1)),Y>=100&&c>0){u(0),n==null||n();return}}a<100&&(m.current=requestAnimationFrame(T))},[d,r,c,a,w.length,k,n]);y.useEffect(()=>(t&&!d?(b.current=void 0,m.current=requestAnimationFrame(T)):m.current&&cancelAnimationFrame(m.current),()=>{m.current&&cancelAnimationFrame(m.current)}),[t,d,T]),y.useEffect(()=>{j.start({x:i.x,y:i.y,transition:{duration:.1,ease:"linear"}})},[i,j]),y.useEffect(()=>{x.start({width:`${a}%`,transition:{duration:.1,ease:"linear"}})},[a,x]);const C=P=>{const A=Math.floor(P/60),M=Math.floor(P%60);return`${A} phút ${M} giây`},E=()=>[v.start,...v.waypoints,v.end].map((A,M)=>`${M===0?"M":"L"} ${A.x} ${A.y}`).join(" ");return s.jsxs(kR,{children:[s.jsxs(SR,{children:[s.jsx(CR,{children:"🛩️ Hành trình Drone"}),c>0&&s.jsxs(TR,{children:["⏱️ Còn lại: ",C(c)]})]}),s.jsxs($R,{children:[s.jsx(ER,{children:s.jsx(PR,{d:E()})}),s.jsx(AR,{animate:{scale:[1,1.1,1]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},children:"🏪"}),s.jsx(DR,{animate:{scale:[1,1.1,1]},transition:{duration:2,repeat:1/0,ease:"easeInOut",delay:1},children:"🏠"}),s.jsx(RR,{animate:j,initial:{x:v.start.x,y:v.start.y},whileHover:{scale:1.2},children:"🛩️"})]}),s.jsxs(MR,{children:[s.jsx(LR,{children:s.jsx(IR,{initial:{width:0},animate:x})}),s.jsxs(OR,{children:[s.jsx("span",{children:"Tiến độ giao hàng"}),s.jsxs("span",{children:[Math.round(a),"%"]})]})]}),s.jsx(FR,{children:w.map((P,A)=>s.jsxs(NR,{$active:f===A,$completed:f>A||c===0,children:[s.jsx(_R,{$active:f===A,$completed:f>A||c===0,children:P.icon}),s.jsx(zR,{$active:f===A,children:P.label})]},P.key))}),s.jsx(BR,{children:s.jsx(VR,{$variant:d?"resume":"pause",onClick:()=>h(!d),whileHover:{scale:1.05},whileTap:{scale:.95},children:d?"▶️ Tiếp tục":"⏸️ Tạm dừng"})})]})},xy=p.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`,UR=p.div`
  margin-bottom: 32px;
`,WR=p.h1`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`,KR=p.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`,YR=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,al=p(H.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`,ll=p.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${e=>e.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`,cl=p.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`,ul=p.div`
  color: #666;
  font-size: 14px;
  font-weight: 500;
`,yy=p.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  overflow: hidden;
`,vy=p.div`
  padding: 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,wy=p.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`,by=p(H.button)`
  background: #FF6600;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e55a00;
    transform: translateY(-1px);
  }
`,GR=p.div`
  overflow-x: auto;
`,qR=p.table`
  width: 100%;
  border-collapse: collapse;
`,QR=p.thead`
  background: #f8f9fa;
`,Fr=p.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
`,XR=p.tbody``,ZR=p.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  ${e=>e.$status==="Delivering"&&`
    background: rgba(33, 150, 243, 0.05);
  `}
`,Nr=p.td`
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
  color: #333;
`,JR=p.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${e=>{switch(e.$status){case"Processing":return"background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;";case"Delivering":return"background: #cce5ff; color: #004085; border: 1px solid #99d6ff;";case"Completed":return"background: #d4edda; color: #155724; border: 1px solid #a3e4a3;";default:return"background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"}}}
`,Rd=p.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s ease;
  
  ${e=>{switch(e.$variant){case"processing":return"background: #ffc107; color: white;";case"delivering":return"background: #007bff; color: white;";case"completed":return"background: #28a745; color: white;";default:return"background: #6c757d; color: white;"}}}
  
  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`,eM=p.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`,tM=p.div`
  font-size: 48px;
  margin-bottom: 16px;
`,nM=p.h3`
  margin: 0 0 8px 0;
  color: #333;
`,rM=p.p`
  margin: 0;
  color: #666;
`,iM=p.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${e=>e.$isActive?"#007bff":"#6c757d"};
  
  &::before {
    content: '${e=>e.$isActive?"🛫":"⏸️"}';
  }
`,oM=()=>{const e=Ke(),{orders:t,updateOrderStatus:n}=Lr(),[r,i]=y.useState(!1),[o,a]=y.useState(!1);if(!e.user||e.user.role!=="restaurant"&&e.user.role!=="admin")return s.jsx(xy,{children:s.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[s.jsx("h2",{children:"🚫 Truy cập bị từ chối"}),s.jsx("p",{children:"Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản nhà hàng."})]})});const l=new Set(t.map(m=>m.phone)).size,c=t.length,u=t.filter(m=>m.status==="Delivering").length,d=t.filter(m=>m.status==="Completed").length,h=(m,b)=>{n(m,b),U.success(`✅ Đã cập nhật trạng thái đơn hàng thành "${b}"`)},f=async()=>{i(!0),await new Promise(m=>setTimeout(m,1e3)),i(!1),U.success("🔄 Đã làm mới dữ liệu")},g=m=>{switch(m){case"Processing":return"Đang chuẩn bị";case"Delivering":return"Đang giao hàng";case"Completed":return"Hoàn tất";default:return m}};return s.jsxs(xy,{children:[s.jsxs(UR,{children:[s.jsx(WR,{children:"Bảng điều khiển nhà hàng"}),s.jsx(KR,{children:"Quản lý đơn hàng và theo dõi drone giao hàng"})]}),s.jsxs(YR,{children:[s.jsxs(al,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[s.jsx(ll,{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",children:"👥"}),s.jsx(cl,{children:l}),s.jsx(ul,{children:"Tổng số khách hàng"})]}),s.jsxs(al,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[s.jsx(ll,{color:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",children:"📦"}),s.jsx(cl,{children:c}),s.jsx(ul,{children:"Tổng số đơn hàng"})]}),s.jsxs(al,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[s.jsx(ll,{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",children:"🚁"}),s.jsx(cl,{children:u}),s.jsx(ul,{children:"Drone đang hoạt động"})]}),s.jsxs(al,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:[s.jsx(ll,{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",children:"✅"}),s.jsx(cl,{children:d}),s.jsx(ul,{children:"Giao hàng hoàn tất"})]})]}),s.jsxs(yy,{children:[s.jsxs(vy,{children:[s.jsx(wy,{children:"Danh sách đơn hàng"}),s.jsxs("div",{style:{display:"flex",gap:"12px"},children:[s.jsx(by,{onClick:f,disabled:r,whileHover:{scale:1.05},whileTap:{scale:.95},children:r?"🔄 Đang làm mới...":"🔄 Làm mới"}),s.jsx(by,{onClick:()=>a(!o),style:{background:"#6f42c1"},whileHover:{scale:1.05},whileTap:{scale:.95},children:o?"🛩️ Ẩn Demo":"🛩️ Demo Drone"})]})]}),s.jsx(GR,{children:t.length===0?s.jsxs(eM,{children:[s.jsx(tM,{children:"📦"}),s.jsx(nM,{children:"Chưa có đơn hàng nào"}),s.jsx(rM,{children:"Khi có đơn hàng mới, chúng sẽ hiển thị ở đây."})]}):s.jsxs(qR,{children:[s.jsx(QR,{children:s.jsxs("tr",{children:[s.jsx(Fr,{children:"Mã đơn hàng"}),s.jsx(Fr,{children:"Khách hàng"}),s.jsx(Fr,{children:"Số điện thoại"}),s.jsx(Fr,{children:"Tổng tiền"}),s.jsx(Fr,{children:"Trạng thái"}),s.jsx(Fr,{children:"Drone"}),s.jsx(Fr,{children:"Thao tác"})]})}),s.jsx(XR,{children:t.map(m=>s.jsxs(ZR,{$status:m.status,children:[s.jsx(Nr,{children:s.jsxs("strong",{children:["#",m.id.slice(-6)]})}),s.jsx(Nr,{children:m.name}),s.jsx(Nr,{children:m.phone}),s.jsx(Nr,{children:oe(m.total)}),s.jsx(Nr,{children:s.jsx(JR,{$status:m.status,children:g(m.status)})}),s.jsx(Nr,{children:s.jsx(iM,{$isActive:m.status==="Delivering",children:m.status==="Delivering"?"Đang bay":"Không hoạt động"})}),s.jsxs(Nr,{children:[s.jsx(Rd,{$variant:"processing",onClick:()=>h(m.id,"Processing"),children:"Chuẩn bị"}),s.jsx(Rd,{$variant:"delivering",onClick:()=>h(m.id,"Delivering"),children:"Giao hàng"}),s.jsx(Rd,{$variant:"completed",onClick:()=>h(m.id,"Completed"),children:"Hoàn tất"})]})]},m.id))})]})})]}),o&&s.jsxs(yy,{children:[s.jsx(vy,{children:s.jsx(wy,{children:"🛩️ Demo Drone Animation"})}),s.jsx(HR,{orderId:"demo-order",isActive:!0,deliveryTime:10})]})]})},sM=p.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`,aM=p(H.section)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
  padding: 48px 32px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: 28px;
`,lM=p.h1`
  margin: 0;
  font-size: 36px;
  letter-spacing: 0.2px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`,cM=p.p`
  margin: 8px 0 0;
  opacity: 0.95;
`,Md=p(Tr)`
  display: inline-block;
  background: #fff;
  color: var(--primary);
  border: none;
  padding: 12px 18px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  font-weight: 800;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  margin-top: 16px;
  
  &:hover { 
    transform: translateY(-1px); 
    box-shadow: var(--shadow-md); 
    filter: brightness(1.05); 
  }
`,uM=p.div`
  text-align: center;
  padding: 40px 20px;
  background: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  margin-bottom: 28px;
`,dM=p.h2`
  margin: 0 0 16px 0;
  color: var(--text);
`,hM=p.p`
  color: var(--secondaryText);
  margin: 0 0 24px 0;
`,pM=p.h2`
  margin: 0 0 16px 0;
  color: var(--text);
`,fM=p.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 12px; 
  margin-bottom: 16px;
  
  @media (max-width: 768px) { 
    grid-template-columns: 1fr; 
    gap: 8px;
  }
`,mM=p.input`
  padding: 10px 12px; 
  border: 1px solid var(--border); 
  border-radius: var(--radius); 
  outline: none;
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
  }
`,jy=p.select`
  padding: 10px 12px; 
  border: 1px solid var(--border); 
  border-radius: var(--radius); 
  outline: none; 
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
  }
`,gM=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;p.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;p.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
  }
`;p.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.isOpen?"flex":"none"};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;p.div`
  background: var(--card);
  padding: 24px;
  border-radius: var(--radius-lg);
  max-width: 500px;
  width: 90%;
`;p.div`
  margin-bottom: 16px;
`;p.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text);
  font-weight: 600;
`;const xM=()=>{const{user:e,isAdmin:t}=Ke(),{isRestaurant:n}=hj(),[r,i]=y.useState(en),[o,a]=y.useState(en),[l,c]=y.useState(!0),[u,d]=y.useState(""),[h,f]=y.useState("All"),[g,m]=y.useState("All"),[b,j]=y.useState(!1),[x,v]=y.useState(null);y.useEffect(()=>{const k=setTimeout(()=>{i(en),a(en),c(!1)},1e3);return()=>clearTimeout(k)},[]),y.useEffect(()=>{let k=r;u&&(k=k.filter(T=>T.name.toLowerCase().includes(u.toLowerCase())||T.description.toLowerCase().includes(u.toLowerCase()))),h!=="All"&&(k=k.filter(T=>T.category===h)),g!=="All"&&(k=k.filter(T=>T.tag===g)),a(k)},[u,h,g,r]);const w=["All",...Array.from(new Set(en.map(k=>k.category)))],S=["All","Hot","New"];return e&&t()?s.jsx(oM,{}):e&&n?(U("🏪 Chuyển hướng đến bảng điều khiển nhà hàng...",{icon:"🏪"}),s.jsx(vn,{to:"/restaurant",replace:!0})):s.jsxs(sM,{children:[s.jsxs(aM,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[s.jsx(lM,{children:"🚁 Giao hàng bằng drone nhanh chóng"}),s.jsx(cM,{children:"Đặt món ăn yêu thích và nhận giao hàng bằng drone trong vài phút."}),e?s.jsx(Md,{to:"/cart",children:"🛒 Xem giỏ hàng"}):s.jsx(Md,{to:"/login",children:"Đăng nhập để đặt món"})]}),!e&&s.jsxs(uM,{children:[s.jsx(dM,{children:"Chào mừng đến với FoodFast!"}),s.jsx(hM,{children:"Đăng nhập để có thể đặt món ăn, theo dõi đơn hàng và trải nghiệm dịch vụ giao hàng bằng drone."}),s.jsx(Md,{to:"/login",children:"Đăng nhập ngay"})]}),s.jsx(pM,{children:e?"Thực đơn":"Khám phá món ăn"}),e&&s.jsxs(fM,{children:[s.jsx(mM,{type:"search",placeholder:"🔍 Tìm kiếm món ăn...",value:u,onChange:k=>d(k.target.value)}),s.jsx(jy,{value:h,onChange:k=>f(k.target.value),children:w.map(k=>s.jsx("option",{value:k,children:k==="All"?"Tất cả danh mục":k},k))}),s.jsx(jy,{value:g,onChange:k=>m(k.target.value),children:S.map(k=>s.jsx("option",{value:k,children:k==="All"?"Tất cả":k==="Hot"?"🔥 Hot":"✨ New"},k))})]}),l?s.jsx(vR,{count:6}):s.jsx(gM,{children:o.length>0?o.map((k,T)=>s.jsx(H.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:T*.1},children:s.jsx(dR,{product:k})},k.id)):s.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px",color:"var(--secondaryText)"},children:"Không tìm thấy món ăn phù hợp. Hãy thử tìm kiếm khác!"})})]})},Ld=p.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1000px;
  margin: 0 auto;
`,yM=p.nav`
  color: #777; 
  font-size: 14px; 
  margin-bottom: 12px;
`,ky=p.div`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 24px; 
  
  @media (max-width: 900px) { 
    grid-template-columns: 1fr; 
    gap: 16px;
  }
`,vM=p.img`
  width: 100%; 
  aspect-ratio: 16/9; 
  object-fit: cover; 
  border-radius: var(--radius-md); 
  box-shadow: var(--shadow-md);
`,wM=p.h2`
  margin: 0;
`,bM=p.div`
  color: var(--primary); 
  font-weight: 800; 
  font-size: 20px;
`,jM=p.p`
  color: #555;
  line-height: 1.6;
`,Sy=p.div`
  display: flex; 
  align-items: center; 
  gap: 10px; 
  margin-top: 12px;
`,Cy=p.button`
  width: 36px; 
  height: 36px; 
  border-radius: 10px; 
  border: 1px solid var(--border); 
  background: var(--card); 
  cursor: pointer;
  color: var(--text);
`,uk=p.button`
  background: var(--primary); 
  color: #fff; 
  border: none; 
  padding: 10px 14px; 
  border-radius: var(--radius); 
  cursor: pointer; 
  box-shadow: var(--shadow);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`,kM=p(uk)`
  background: var(--border); 
  color: var(--text);
`,Ty=()=>{const{id:e}=H5(),t=wt(),{add:n}=$a(),{user:r}=Ke(),i=en.find(h=>h.id===e),[o,a]=y.useState(1),[l,c]=y.useState(!0);if(y.useEffect(()=>{const h=setTimeout(()=>c(!1),500);return()=>clearTimeout(h)},[]),!i)return s.jsx(Ld,{children:"Sản phẩm không tìm thấy."});const u=()=>{if(!r){Si.fire({title:"Hãy đăng nhập để tiếp tục mua hàng!",text:"Bạn cần đăng nhập để thêm món vào giỏ hàng và theo dõi đơn hàng của mình.",icon:"warning",confirmButtonText:"Đăng nhập ngay",cancelButtonText:"Hủy",showCancelButton:!0,confirmButtonColor:"#007bff",cancelButtonColor:"#6c757d"}).then(h=>{h.isConfirmed&&t("/login")});return}n(i.id,o,{name:i.name,image:Ul(i),price:i.price}),U.success("🛒 Đã thêm vào giỏ hàng thành công!")},d=()=>{if(!r){Si.fire({title:"Hãy đăng nhập để tiếp tục mua hàng!",text:"Bạn cần đăng nhập để mua hàng và theo dõi đơn hàng của mình.",icon:"warning",confirmButtonText:"Đăng nhập ngay",cancelButtonText:"Hủy",showCancelButton:!0,confirmButtonColor:"#007bff",cancelButtonColor:"#6c757d"}).then(h=>{h.isConfirmed&&t("/login")});return}n(i.id,o,{name:i.name,image:Ul(i),price:i.price}),t("/checkout")};return l?s.jsxs(Ld,{children:[s.jsx("div",{className:"skeleton",style:{height:"20px",width:"200px",marginBottom:"12px"}}),s.jsxs(ky,{children:[s.jsx("div",{className:"skeleton",style:{height:"300px"}}),s.jsxs("div",{children:[s.jsx("div",{className:"skeleton",style:{height:"24px",width:"60%",marginBottom:"12px"}}),s.jsx("div",{className:"skeleton",style:{height:"20px",width:"40%",marginBottom:"16px"}}),s.jsx("div",{className:"skeleton",style:{height:"80px",marginBottom:"16px"}}),s.jsx("div",{className:"skeleton",style:{height:"40px",width:"100%"}})]})]})]}):s.jsxs(Ld,{children:[s.jsxs(yM,{children:[s.jsx(Tr,{to:"/",children:"Trang chủ"})," > ",s.jsx(Tr,{to:"/menu",children:"Thực đơn"})," > ",s.jsx("span",{children:i.name})]}),s.jsxs(ky,{children:[s.jsx(vM,{src:Ul(i),alt:i.name}),s.jsxs("div",{children:[s.jsx(wM,{children:i.name}),s.jsx(bM,{children:oe(i.price)}),s.jsx(jM,{children:i.description}),s.jsxs(Sy,{children:[s.jsx(Cy,{onClick:()=>a(h=>Math.max(1,h-1)),children:"-"}),s.jsx("span",{children:o}),s.jsx(Cy,{onClick:()=>a(h=>h+1),children:"+"})]}),s.jsxs(Sy,{children:[s.jsx(uk,{onClick:u,children:"Thêm vào giỏ"}),s.jsx(kM,{onClick:d,children:"Mua ngay"})]})]})]})]})},SM=p.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,CM=p.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
`,TM=p.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`,$M=p.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,EM=p.div`
  height: 16px;
  width: 60%;
`,PM=p.div`
  height: 14px;
  width: 40%;
`,AM=p.div`
  height: 16px;
  width: 80px;
`,DM=p.div`
  width: 80px;
  height: 32px;
  border-radius: 8px;
`,RM=()=>s.jsxs(CM,{children:[s.jsx(TM,{className:"skeleton"}),s.jsxs($M,{children:[s.jsx(EM,{className:"skeleton"}),s.jsx(PM,{className:"skeleton"})]}),s.jsx(AM,{className:"skeleton"}),s.jsx(DM,{className:"skeleton"})]}),MM=({count:e=3})=>s.jsx(SM,{children:Array.from({length:e}).map((t,n)=>s.jsx(H.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:n*.1},children:s.jsx(RM,{})},n))}),Id=p.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
`,Od=p.h2`
  margin: 0 0 16px 0;
`,LM=p.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
`,IM=p.img`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
`,OM=p.div`
  font-weight: 700;
`,FM=p.div`
  color: var(--secondaryText);
`,Wp=p.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  
  &:hover { 
    transform: translateY(-1px); 
    box-shadow: var(--shadow-md); 
    filter: brightness(1.03); 
  }
`,$y=p(Wp)`
  background: var(--border); 
  color: var(--text); 
  padding: 6px 10px;
`,NM=p.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
`,_M=p.div`
  color: var(--primary);
  font-weight: 800;
`,zM=p.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondaryText);
`,BM=()=>{const e=wt(),{user:t}=Ke(),{items:n,remove:r,setQty:i,subtotal:o}=$a(),a=y.useMemo(()=>Object.fromEntries(en.map(b=>[b.id,b])),[]),[l,c]=y.useState(!0),u=25e3,d=o*.08,h=o+d+u,f=(b,j)=>{r(b),U.success(`✅ Đã xóa "${j}" khỏi giỏ hàng`)},g=(b,j,x)=>{i(b,j),U.success(`📦 Cập nhật số lượng "${x}" thành ${j}`)},m=()=>{if(n.length===0){U.error("Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.");return}if(!t){U.success("📝 Vui lòng điền thông tin khách hàng..."),e("/customer-info");return}U.success("🚀 Chuyển đến trang thanh toán..."),e("/checkout")};return pt.useEffect(()=>{const b=setTimeout(()=>c(!1),600);return()=>clearTimeout(b)},[]),l?s.jsxs(Id,{children:[s.jsx(Od,{children:"Giỏ hàng"}),s.jsx(MM,{count:3})]}):n.length===0?s.jsxs(Id,{children:[s.jsx(Od,{children:"Giỏ hàng"}),s.jsxs(zM,{children:[s.jsx("p",{children:"Giỏ hàng của bạn đang trống — hãy thêm một số món ăn ngon 🍱"}),s.jsx(Tr,{to:"/menu",style:{color:"var(--primary)",textDecoration:"underline"},children:"Xem thực đơn"})]})]}):s.jsxs(Id,{children:[s.jsx(Od,{children:"Giỏ hàng"}),n.map((b,j)=>a[b.id]?s.jsx(H.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:j*.1},children:s.jsxs(LM,{children:[s.jsx(IM,{src:b.image||"",alt:b.name,onError:v=>{v.currentTarget.src="https://via.placeholder.com/80x80?text=No+Image"}}),s.jsxs("div",{style:{flex:1},children:[s.jsx(OM,{children:b.name}),s.jsxs(FM,{children:[oe(b.price)," • Số lượng:",s.jsx($y,{onClick:()=>g(b.id,Math.max(1,b.qty-1),b.name),style:{marginLeft:8},children:"-"}),s.jsx("span",{style:{margin:"0 8px"},children:b.qty}),s.jsx($y,{onClick:()=>g(b.id,b.qty+1,b.name),children:"+"})]})]}),s.jsx("div",{style:{fontWeight:700},children:oe(b.price*b.qty)}),s.jsx(Wp,{onClick:()=>f(b.id,b.name),style:{background:"var(--border)",color:"var(--text)"},children:"Xóa"})]})},b.id):null),s.jsxs("div",{style:{marginTop:16,borderTop:"1px solid var(--border)",paddingTop:12},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[s.jsx("span",{children:"Tạm tính"}),s.jsx("span",{children:oe(o)})]}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[s.jsx("span",{children:"Thuế (8%)"}),s.jsx("span",{children:oe(d)})]}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[s.jsx("span",{children:"Phí giao hàng"}),s.jsx("span",{children:oe(u)})]}),s.jsxs(NM,{children:[s.jsx("div",{children:"Tổng cộng"}),s.jsx(_M,{children:oe(h)})]}),s.jsx(Wp,{style:{marginTop:12},onClick:m,children:"Tiến hành thanh toán"})]})]})},VM=()=>new Promise(e=>{setTimeout(()=>{const t=Math.random()>.2;e(t?{success:!0,transactionId:`VNPAY${Date.now()}`,message:"Thanh toán thành công qua VNPay"}:{success:!1,message:"Thanh toán thất bại. Vui lòng thử lại."})},2e3)}),HM=e=>{const t=e.get("vnp_ResponseCode"),n=e.get("vnp_TransactionNo"),r=e.get("vnp_Amount"),i=e.get("vnp_TxnRef");return{isValid:t==="00",transactionId:n||void 0,amount:r?parseInt(r)/100:void 0,orderId:i||void 0}};function Ai(e){this._maxSize=e,this.clear()}Ai.prototype.clear=function(){this._size=0,this._values=Object.create(null)};Ai.prototype.get=function(e){return this._values[e]};Ai.prototype.set=function(e,t){return this._size>=this._maxSize&&this.clear(),e in this._values||this._size++,this._values[e]=t};var UM=/[^.^\]^[]+|(?=\[\]|\.\.)/g,dk=/^\d+$/,WM=/^\d/,KM=/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,YM=/^\s*(['"]?)(.*?)(\1)\s*$/,tg=512,Ey=new Ai(tg),Py=new Ai(tg),Ay=new Ai(tg),mi={Cache:Ai,split:Kp,normalizePath:Fd,setter:function(e){var t=Fd(e);return Py.get(e)||Py.set(e,function(r,i){for(var o=0,a=t.length,l=r;o<a-1;){var c=t[o];if(c==="__proto__"||c==="constructor"||c==="prototype")return r;l=l[t[o++]]}l[t[o]]=i})},getter:function(e,t){var n=Fd(e);return Ay.get(e)||Ay.set(e,function(i){for(var o=0,a=n.length;o<a;)if(i!=null||!t)i=i[n[o++]];else return;return i})},join:function(e){return e.reduce(function(t,n){return t+(ng(n)||dk.test(n)?"["+n+"]":(t?".":"")+n)},"")},forEach:function(e,t,n){GM(Array.isArray(e)?e:Kp(e),t,n)}};function Fd(e){return Ey.get(e)||Ey.set(e,Kp(e).map(function(t){return t.replace(YM,"$2")}))}function Kp(e){return e.match(UM)||[""]}function GM(e,t,n){var r=e.length,i,o,a,l;for(o=0;o<r;o++)i=e[o],i&&(XM(i)&&(i='"'+i+'"'),l=ng(i),a=!l&&/^\d+$/.test(i),t.call(n,i,l,a,o,e))}function ng(e){return typeof e=="string"&&e&&["'",'"'].indexOf(e.charAt(0))!==-1}function qM(e){return e.match(WM)&&!e.match(dk)}function QM(e){return KM.test(e)}function XM(e){return!ng(e)&&(qM(e)||QM(e))}const ZM=/[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,Du=e=>e.match(ZM)||[],Ru=e=>e[0].toUpperCase()+e.slice(1),rg=(e,t)=>Du(e).join(t).toLowerCase(),hk=e=>Du(e).reduce((t,n)=>`${t}${t?n[0].toUpperCase()+n.slice(1).toLowerCase():n.toLowerCase()}`,""),JM=e=>Ru(hk(e)),eL=e=>rg(e,"_"),tL=e=>rg(e,"-"),nL=e=>Ru(rg(e," ")),rL=e=>Du(e).map(Ru).join(" ");var Nd={words:Du,upperFirst:Ru,camelCase:hk,pascalCase:JM,snakeCase:eL,kebabCase:tL,sentenceCase:nL,titleCase:rL},ig={exports:{}};ig.exports=function(e){return pk(iL(e),e)};ig.exports.array=pk;function pk(e,t){var n=e.length,r=new Array(n),i={},o=n,a=oL(t),l=sL(e);for(t.forEach(function(u){if(!l.has(u[0])||!l.has(u[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")});o--;)i[o]||c(e[o],o,new Set);return r;function c(u,d,h){if(h.has(u)){var f;try{f=", node was:"+JSON.stringify(u)}catch{f=""}throw new Error("Cyclic dependency"+f)}if(!l.has(u))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify(u));if(!i[d]){i[d]=!0;var g=a.get(u)||new Set;if(g=Array.from(g),d=g.length){h.add(u);do{var m=g[--d];c(m,l.get(m),h)}while(d);h.delete(u)}r[--n]=u}}}function iL(e){for(var t=new Set,n=0,r=e.length;n<r;n++){var i=e[n];t.add(i[0]),t.add(i[1])}return Array.from(t)}function oL(e){for(var t=new Map,n=0,r=e.length;n<r;n++){var i=e[n];t.has(i[0])||t.set(i[0],new Set),t.has(i[1])||t.set(i[1],new Set),t.get(i[0]).add(i[1])}return t}function sL(e){for(var t=new Map,n=0,r=e.length;n<r;n++)t.set(e[n],n);return t}var aL=ig.exports;const lL=Qp(aL),cL=Object.prototype.toString,uL=Error.prototype.toString,dL=RegExp.prototype.toString,hL=typeof Symbol<"u"?Symbol.prototype.toString:()=>"",pL=/^Symbol\((.*)\)(.*)$/;function fL(e){return e!=+e?"NaN":e===0&&1/e<0?"-0":""+e}function Dy(e,t=!1){if(e==null||e===!0||e===!1)return""+e;const n=typeof e;if(n==="number")return fL(e);if(n==="string")return t?`"${e}"`:e;if(n==="function")return"[Function "+(e.name||"anonymous")+"]";if(n==="symbol")return hL.call(e).replace(pL,"Symbol($1)");const r=cL.call(e).slice(8,-1);return r==="Date"?isNaN(e.getTime())?""+e:e.toISOString(e):r==="Error"||e instanceof Error?"["+uL.call(e)+"]":r==="RegExp"?dL.call(e):null}function kr(e,t){let n=Dy(e,t);return n!==null?n:JSON.stringify(e,function(r,i){let o=Dy(this[r],t);return o!==null?o:i},2)}function fk(e){return e==null?[]:[].concat(e)}let mk,gk,xk,mL=/\$\{\s*(\w+)\s*\}/g;mk=Symbol.toStringTag;class Ry{constructor(t,n,r,i){this.name=void 0,this.message=void 0,this.value=void 0,this.path=void 0,this.type=void 0,this.params=void 0,this.errors=void 0,this.inner=void 0,this[mk]="Error",this.name="ValidationError",this.value=n,this.path=r,this.type=i,this.errors=[],this.inner=[],fk(t).forEach(o=>{if(rt.isError(o)){this.errors.push(...o.errors);const a=o.inner.length?o.inner:[o];this.inner.push(...a)}else this.errors.push(o)}),this.message=this.errors.length>1?`${this.errors.length} errors occurred`:this.errors[0]}}gk=Symbol.hasInstance;xk=Symbol.toStringTag;class rt extends Error{static formatError(t,n){const r=n.label||n.path||"this";return n=Object.assign({},n,{path:r,originalPath:n.path}),typeof t=="string"?t.replace(mL,(i,o)=>kr(n[o])):typeof t=="function"?t(n):t}static isError(t){return t&&t.name==="ValidationError"}constructor(t,n,r,i,o){const a=new Ry(t,n,r,i);if(o)return a;super(),this.value=void 0,this.path=void 0,this.type=void 0,this.params=void 0,this.errors=[],this.inner=[],this[xk]="Error",this.name=a.name,this.message=a.message,this.type=a.type,this.value=a.value,this.path=a.path,this.errors=a.errors,this.inner=a.inner,Error.captureStackTrace&&Error.captureStackTrace(this,rt)}static[gk](t){return Ry[Symbol.hasInstance](t)||super[Symbol.hasInstance](t)}}let dn={default:"${path} is invalid",required:"${path} is a required field",defined:"${path} must be defined",notNull:"${path} cannot be null",oneOf:"${path} must be one of the following values: ${values}",notOneOf:"${path} must not be one of the following values: ${values}",notType:({path:e,type:t,value:n,originalValue:r})=>{const i=r!=null&&r!==n?` (cast from the value \`${kr(r,!0)}\`).`:".";return t!=="mixed"?`${e} must be a \`${t}\` type, but the final value was: \`${kr(n,!0)}\``+i:`${e} must match the configured type. The validated value was: \`${kr(n,!0)}\``+i}},dt={length:"${path} must be exactly ${length} characters",min:"${path} must be at least ${min} characters",max:"${path} must be at most ${max} characters",matches:'${path} must match the following: "${regex}"',email:"${path} must be a valid email",url:"${path} must be a valid URL",uuid:"${path} must be a valid UUID",datetime:"${path} must be a valid ISO date-time",datetime_precision:"${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits",datetime_offset:'${path} must be a valid ISO date-time with UTC "Z" timezone',trim:"${path} must be a trimmed string",lowercase:"${path} must be a lowercase string",uppercase:"${path} must be a upper case string"},gL={min:"${path} must be greater than or equal to ${min}",max:"${path} must be less than or equal to ${max}",lessThan:"${path} must be less than ${less}",moreThan:"${path} must be greater than ${more}",positive:"${path} must be a positive number",negative:"${path} must be a negative number",integer:"${path} must be an integer"},Yp={min:"${path} field must be later than ${min}",max:"${path} field must be at earlier than ${max}"},xL={isValue:"${path} field must be ${value}"},ql={noUnknown:"${path} field has unspecified keys: ${unknown}",exact:"${path} object contains unknown properties: ${properties}"},yL={min:"${path} field must have at least ${min} items",max:"${path} field must have less than or equal to ${max} items",length:"${path} must have ${length} items"},vL={notType:e=>{const{path:t,value:n,spec:r}=e,i=r.types.length;if(Array.isArray(n)){if(n.length<i)return`${t} tuple value has too few items, expected a length of ${i} but got ${n.length} for value: \`${kr(n,!0)}\``;if(n.length>i)return`${t} tuple value has too many items, expected a length of ${i} but got ${n.length} for value: \`${kr(n,!0)}\``}return rt.formatError(dn.notType,e)}};Object.assign(Object.create(null),{mixed:dn,string:dt,number:gL,date:Yp,object:ql,array:yL,boolean:xL,tuple:vL});const og=e=>e&&e.__isYupSchema__;class Hc{static fromOptions(t,n){if(!n.then&&!n.otherwise)throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");let{is:r,then:i,otherwise:o}=n,a=typeof r=="function"?r:(...l)=>l.every(c=>c===r);return new Hc(t,(l,c)=>{var u;let d=a(...l)?i:o;return(u=d==null?void 0:d(c))!=null?u:c})}constructor(t,n){this.fn=void 0,this.refs=t,this.refs=t,this.fn=n}resolve(t,n){let r=this.refs.map(o=>o.getValue(n==null?void 0:n.value,n==null?void 0:n.parent,n==null?void 0:n.context)),i=this.fn(r,t,n);if(i===void 0||i===t)return t;if(!og(i))throw new TypeError("conditions must return a schema object");return i.resolve(n)}}const dl={context:"$",value:"."};class Di{constructor(t,n={}){if(this.key=void 0,this.isContext=void 0,this.isValue=void 0,this.isSibling=void 0,this.path=void 0,this.getter=void 0,this.map=void 0,typeof t!="string")throw new TypeError("ref must be a string, got: "+t);if(this.key=t.trim(),t==="")throw new TypeError("ref must be a non-empty string");this.isContext=this.key[0]===dl.context,this.isValue=this.key[0]===dl.value,this.isSibling=!this.isContext&&!this.isValue;let r=this.isContext?dl.context:this.isValue?dl.value:"";this.path=this.key.slice(r.length),this.getter=this.path&&mi.getter(this.path,!0),this.map=n.map}getValue(t,n,r){let i=this.isContext?r:this.isValue?t:n;return this.getter&&(i=this.getter(i||{})),this.map&&(i=this.map(i)),i}cast(t,n){return this.getValue(t,n==null?void 0:n.parent,n==null?void 0:n.context)}resolve(){return this}describe(){return{type:"ref",key:this.key}}toString(){return`Ref(${this.key})`}static isRef(t){return t&&t.__isYupRef}}Di.prototype.__isYupRef=!0;const li=e=>e==null;function Ii(e){function t({value:n,path:r="",options:i,originalValue:o,schema:a},l,c){const{name:u,test:d,params:h,message:f,skipAbsent:g}=e;let{parent:m,context:b,abortEarly:j=a.spec.abortEarly,disableStackTrace:x=a.spec.disableStackTrace}=i;const v={value:n,parent:m,context:b};function w(M={}){const Y=yk(Object.assign({value:n,originalValue:o,label:a.spec.label,path:M.path||r,spec:a.spec,disableStackTrace:M.disableStackTrace||x},h,M.params),v),X=new rt(rt.formatError(M.message||f,Y),n,Y.path,M.type||u,Y.disableStackTrace);return X.params=Y,X}const S=j?l:c;let k={path:r,parent:m,type:u,from:i.from,createError:w,resolve(M){return vk(M,v)},options:i,originalValue:o,schema:a};const T=M=>{rt.isError(M)?S(M):M?c(null):S(w())},C=M=>{rt.isError(M)?S(M):l(M)};if(g&&li(n))return T(!0);let P;try{var A;if(P=d.call(k,n,k),typeof((A=P)==null?void 0:A.then)=="function"){if(i.sync)throw new Error(`Validation test of type: "${k.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);return Promise.resolve(P).then(T,C)}}catch(M){C(M);return}T(P)}return t.OPTIONS=e,t}function yk(e,t){if(!e)return e;for(const n of Object.keys(e))e[n]=vk(e[n],t);return e}function vk(e,t){return Di.isRef(e)?e.getValue(t.value,t.parent,t.context):e}function wL(e,t,n,r=n){let i,o,a;return t?(mi.forEach(t,(l,c,u)=>{let d=c?l.slice(1,l.length-1):l;e=e.resolve({context:r,parent:i,value:n});let h=e.type==="tuple",f=u?parseInt(d,10):0;if(e.innerType||h){if(h&&!u)throw new Error(`Yup.reach cannot implicitly index into a tuple type. the path part "${a}" must contain an index to the tuple element, e.g. "${a}[0]"`);if(n&&f>=n.length)throw new Error(`Yup.reach cannot resolve an array item at index: ${l}, in the path: ${t}. because there is no value at that index. `);i=n,n=n&&n[f],e=h?e.spec.types[f]:e.innerType}if(!u){if(!e.fields||!e.fields[d])throw new Error(`The schema does not contain the path: ${t}. (failed at: ${a} which is a type: "${e.type}")`);i=n,n=n&&n[d],e=e.fields[d]}o=d,a=c?"["+l+"]":"."+l}),{schema:e,parent:i,parentPath:o}):{parent:i,parentPath:t,schema:e}}class Uc extends Set{describe(){const t=[];for(const n of this.values())t.push(Di.isRef(n)?n.describe():n);return t}resolveAll(t){let n=[];for(const r of this.values())n.push(t(r));return n}clone(){return new Uc(this.values())}merge(t,n){const r=this.clone();return t.forEach(i=>r.add(i)),n.forEach(i=>r.delete(i)),r}}function fo(e,t=new Map){if(og(e)||!e||typeof e!="object")return e;if(t.has(e))return t.get(e);let n;if(e instanceof Date)n=new Date(e.getTime()),t.set(e,n);else if(e instanceof RegExp)n=new RegExp(e),t.set(e,n);else if(Array.isArray(e)){n=new Array(e.length),t.set(e,n);for(let r=0;r<e.length;r++)n[r]=fo(e[r],t)}else if(e instanceof Map){n=new Map,t.set(e,n);for(const[r,i]of e.entries())n.set(r,fo(i,t))}else if(e instanceof Set){n=new Set,t.set(e,n);for(const r of e)n.add(fo(r,t))}else if(e instanceof Object){n={},t.set(e,n);for(const[r,i]of Object.entries(e))n[r]=fo(i,t)}else throw Error(`Unable to clone ${e}`);return n}function bL(e){if(!(e!=null&&e.length))return;const t=[];let n="",r=!1,i=!1;for(let o=0;o<e.length;o++){const a=e[o];if(a==="["&&!i){n&&(t.push(...n.split(".").filter(Boolean)),n=""),r=!0;continue}if(a==="]"&&!i){n&&(/^\d+$/.test(n)?t.push(n):t.push(n.replace(/^"|"$/g,"")),n=""),r=!1;continue}if(a==='"'){i=!i;continue}if(a==="."&&!r&&!i){n&&(t.push(n),n="");continue}n+=a}return n&&t.push(...n.split(".").filter(Boolean)),t}function jL(e,t){const n=t?`${t}.${e.path}`:e.path;return e.errors.map(r=>({message:r,path:bL(n)}))}function wk(e,t){var n;if(!((n=e.inner)!=null&&n.length)&&e.errors.length)return jL(e,t);const r=t?`${t}.${e.path}`:e.path;return e.inner.flatMap(i=>wk(i,r))}class kn{constructor(t){this.type=void 0,this.deps=[],this.tests=void 0,this.transforms=void 0,this.conditions=[],this._mutate=void 0,this.internalTests={},this._whitelist=new Uc,this._blacklist=new Uc,this.exclusiveTests=Object.create(null),this._typeCheck=void 0,this.spec=void 0,this.tests=[],this.transforms=[],this.withMutation(()=>{this.typeError(dn.notType)}),this.type=t.type,this._typeCheck=t.check,this.spec=Object.assign({strip:!1,strict:!1,abortEarly:!0,recursive:!0,disableStackTrace:!1,nullable:!1,optional:!0,coerce:!0},t==null?void 0:t.spec),this.withMutation(n=>{n.nonNullable()})}get _type(){return this.type}clone(t){if(this._mutate)return t&&Object.assign(this.spec,t),this;const n=Object.create(Object.getPrototypeOf(this));return n.type=this.type,n._typeCheck=this._typeCheck,n._whitelist=this._whitelist.clone(),n._blacklist=this._blacklist.clone(),n.internalTests=Object.assign({},this.internalTests),n.exclusiveTests=Object.assign({},this.exclusiveTests),n.deps=[...this.deps],n.conditions=[...this.conditions],n.tests=[...this.tests],n.transforms=[...this.transforms],n.spec=fo(Object.assign({},this.spec,t)),n}label(t){let n=this.clone();return n.spec.label=t,n}meta(...t){if(t.length===0)return this.spec.meta;let n=this.clone();return n.spec.meta=Object.assign(n.spec.meta||{},t[0]),n}withMutation(t){let n=this._mutate;this._mutate=!0;let r=t(this);return this._mutate=n,r}concat(t){if(!t||t===this)return this;if(t.type!==this.type&&this.type!=="mixed")throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${t.type}`);let n=this,r=t.clone();const i=Object.assign({},n.spec,r.spec);return r.spec=i,r.internalTests=Object.assign({},n.internalTests,r.internalTests),r._whitelist=n._whitelist.merge(t._whitelist,t._blacklist),r._blacklist=n._blacklist.merge(t._blacklist,t._whitelist),r.tests=n.tests,r.exclusiveTests=n.exclusiveTests,r.withMutation(o=>{t.tests.forEach(a=>{o.test(a.OPTIONS)})}),r.transforms=[...n.transforms,...r.transforms],r}isType(t){return t==null?!!(this.spec.nullable&&t===null||this.spec.optional&&t===void 0):this._typeCheck(t)}resolve(t){let n=this;if(n.conditions.length){let r=n.conditions;n=n.clone(),n.conditions=[],n=r.reduce((i,o)=>o.resolve(i,t),n),n=n.resolve(t)}return n}resolveOptions(t){var n,r,i,o;return Object.assign({},t,{from:t.from||[],strict:(n=t.strict)!=null?n:this.spec.strict,abortEarly:(r=t.abortEarly)!=null?r:this.spec.abortEarly,recursive:(i=t.recursive)!=null?i:this.spec.recursive,disableStackTrace:(o=t.disableStackTrace)!=null?o:this.spec.disableStackTrace})}cast(t,n={}){let r=this.resolve(Object.assign({},n,{value:t})),i=n.assert==="ignore-optionality",o=r._cast(t,n);if(n.assert!==!1&&!r.isType(o)){if(i&&li(o))return o;let a=kr(t),l=kr(o);throw new TypeError(`The value of ${n.path||"field"} could not be cast to a value that satisfies the schema type: "${r.type}". 

attempted value: ${a} 
`+(l!==a?`result of cast: ${l}`:""))}return o}_cast(t,n){let r=t===void 0?t:this.transforms.reduce((i,o)=>o.call(this,i,t,this,n),t);return r===void 0&&(r=this.getDefault(n)),r}_validate(t,n={},r,i){let{path:o,originalValue:a=t,strict:l=this.spec.strict}=n,c=t;l||(c=this._cast(c,Object.assign({assert:!1},n)));let u=[];for(let d of Object.values(this.internalTests))d&&u.push(d);this.runTests({path:o,value:c,originalValue:a,options:n,tests:u},r,d=>{if(d.length)return i(d,c);this.runTests({path:o,value:c,originalValue:a,options:n,tests:this.tests},r,i)})}runTests(t,n,r){let i=!1,{tests:o,value:a,originalValue:l,path:c,options:u}=t,d=b=>{i||(i=!0,n(b,a))},h=b=>{i||(i=!0,r(b,a))},f=o.length,g=[];if(!f)return h([]);let m={value:a,originalValue:l,path:c,options:u,schema:this};for(let b=0;b<o.length;b++){const j=o[b];j(m,d,function(v){v&&(Array.isArray(v)?g.push(...v):g.push(v)),--f<=0&&h(g)})}}asNestedTest({key:t,index:n,parent:r,parentPath:i,originalParent:o,options:a}){const l=t??n;if(l==null)throw TypeError("Must include `key` or `index` for nested validations");const c=typeof l=="number";let u=r[l];const d=Object.assign({},a,{strict:!0,parent:r,value:u,originalValue:o[l],key:void 0,[c?"index":"key"]:l,path:c||l.includes(".")?`${i||""}[${c?l:`"${l}"`}]`:(i?`${i}.`:"")+t});return(h,f,g)=>this.resolve(d)._validate(u,d,f,g)}validate(t,n){var r;let i=this.resolve(Object.assign({},n,{value:t})),o=(r=n==null?void 0:n.disableStackTrace)!=null?r:i.spec.disableStackTrace;return new Promise((a,l)=>i._validate(t,n,(c,u)=>{rt.isError(c)&&(c.value=u),l(c)},(c,u)=>{c.length?l(new rt(c,u,void 0,void 0,o)):a(u)}))}validateSync(t,n){var r;let i=this.resolve(Object.assign({},n,{value:t})),o,a=(r=n==null?void 0:n.disableStackTrace)!=null?r:i.spec.disableStackTrace;return i._validate(t,Object.assign({},n,{sync:!0}),(l,c)=>{throw rt.isError(l)&&(l.value=c),l},(l,c)=>{if(l.length)throw new rt(l,t,void 0,void 0,a);o=c}),o}isValid(t,n){return this.validate(t,n).then(()=>!0,r=>{if(rt.isError(r))return!1;throw r})}isValidSync(t,n){try{return this.validateSync(t,n),!0}catch(r){if(rt.isError(r))return!1;throw r}}_getDefault(t){let n=this.spec.default;return n==null?n:typeof n=="function"?n.call(this,t):fo(n)}getDefault(t){return this.resolve(t||{})._getDefault(t)}default(t){return arguments.length===0?this._getDefault():this.clone({default:t})}strict(t=!0){return this.clone({strict:t})}nullability(t,n){const r=this.clone({nullable:t});return r.internalTests.nullable=Ii({message:n,name:"nullable",test(i){return i===null?this.schema.spec.nullable:!0}}),r}optionality(t,n){const r=this.clone({optional:t});return r.internalTests.optionality=Ii({message:n,name:"optionality",test(i){return i===void 0?this.schema.spec.optional:!0}}),r}optional(){return this.optionality(!0)}defined(t=dn.defined){return this.optionality(!1,t)}nullable(){return this.nullability(!0)}nonNullable(t=dn.notNull){return this.nullability(!1,t)}required(t=dn.required){return this.clone().withMutation(n=>n.nonNullable(t).defined(t))}notRequired(){return this.clone().withMutation(t=>t.nullable().optional())}transform(t){let n=this.clone();return n.transforms.push(t),n}test(...t){let n;if(t.length===1?typeof t[0]=="function"?n={test:t[0]}:n=t[0]:t.length===2?n={name:t[0],test:t[1]}:n={name:t[0],message:t[1],test:t[2]},n.message===void 0&&(n.message=dn.default),typeof n.test!="function")throw new TypeError("`test` is a required parameters");let r=this.clone(),i=Ii(n),o=n.exclusive||n.name&&r.exclusiveTests[n.name]===!0;if(n.exclusive&&!n.name)throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");return n.name&&(r.exclusiveTests[n.name]=!!n.exclusive),r.tests=r.tests.filter(a=>!(a.OPTIONS.name===n.name&&(o||a.OPTIONS.test===i.OPTIONS.test))),r.tests.push(i),r}when(t,n){!Array.isArray(t)&&typeof t!="string"&&(n=t,t=".");let r=this.clone(),i=fk(t).map(o=>new Di(o));return i.forEach(o=>{o.isSibling&&r.deps.push(o.key)}),r.conditions.push(typeof n=="function"?new Hc(i,n):Hc.fromOptions(i,n)),r}typeError(t){let n=this.clone();return n.internalTests.typeError=Ii({message:t,name:"typeError",skipAbsent:!0,test(r){return this.schema._typeCheck(r)?!0:this.createError({params:{type:this.schema.type}})}}),n}oneOf(t,n=dn.oneOf){let r=this.clone();return t.forEach(i=>{r._whitelist.add(i),r._blacklist.delete(i)}),r.internalTests.whiteList=Ii({message:n,name:"oneOf",skipAbsent:!0,test(i){let o=this.schema._whitelist,a=o.resolveAll(this.resolve);return a.includes(i)?!0:this.createError({params:{values:Array.from(o).join(", "),resolved:a}})}}),r}notOneOf(t,n=dn.notOneOf){let r=this.clone();return t.forEach(i=>{r._blacklist.add(i),r._whitelist.delete(i)}),r.internalTests.blacklist=Ii({message:n,name:"notOneOf",test(i){let o=this.schema._blacklist,a=o.resolveAll(this.resolve);return a.includes(i)?this.createError({params:{values:Array.from(o).join(", "),resolved:a}}):!0}}),r}strip(t=!0){let n=this.clone();return n.spec.strip=t,n}describe(t){const n=(t?this.resolve(t):this).clone(),{label:r,meta:i,optional:o,nullable:a}=n.spec;return{meta:i,label:r,optional:o,nullable:a,default:n.getDefault(t),type:n.type,oneOf:n._whitelist.describe(),notOneOf:n._blacklist.describe(),tests:n.tests.filter((c,u,d)=>d.findIndex(h=>h.OPTIONS.name===c.OPTIONS.name)===u).map(c=>{const u=c.OPTIONS.params&&t?yk(Object.assign({},c.OPTIONS.params),t):c.OPTIONS.params;return{name:c.OPTIONS.name,params:u}})}}get"~standard"(){const t=this;return{version:1,vendor:"yup",async validate(r){try{return{value:await t.validate(r,{abortEarly:!1})}}catch(i){if(i instanceof rt)return{issues:wk(i)};throw i}}}}}kn.prototype.__isYupSchema__=!0;for(const e of["validate","validateSync"])kn.prototype[`${e}At`]=function(t,n,r={}){const{parent:i,parentPath:o,schema:a}=wL(this,t,n,r.context);return a[e](i&&i[o],Object.assign({},r,{parent:i,path:t}))};for(const e of["equals","is"])kn.prototype[e]=kn.prototype.oneOf;for(const e of["not","nope"])kn.prototype[e]=kn.prototype.notOneOf;const kL=/^(\d{4}|[+-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,.](\d{1,}))?)?(?:(Z)|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;function SL(e){const t=Gp(e);if(!t)return Date.parse?Date.parse(e):Number.NaN;if(t.z===void 0&&t.plusMinus===void 0)return new Date(t.year,t.month,t.day,t.hour,t.minute,t.second,t.millisecond).valueOf();let n=0;return t.z!=="Z"&&t.plusMinus!==void 0&&(n=t.hourOffset*60+t.minuteOffset,t.plusMinus==="+"&&(n=0-n)),Date.UTC(t.year,t.month,t.day,t.hour,t.minute+n,t.second,t.millisecond)}function Gp(e){var t,n;const r=kL.exec(e);return r?{year:$n(r[1]),month:$n(r[2],1)-1,day:$n(r[3],1),hour:$n(r[4]),minute:$n(r[5]),second:$n(r[6]),millisecond:r[7]?$n(r[7].substring(0,3)):0,precision:(t=(n=r[7])==null?void 0:n.length)!=null?t:void 0,z:r[8]||void 0,plusMinus:r[9]||void 0,hourOffset:$n(r[10]),minuteOffset:$n(r[11])}:null}function $n(e,t=0){return Number(e)||t}let CL=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,TL=/^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,$L=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,EL="^\\d{4}-\\d{2}-\\d{2}",PL="\\d{2}:\\d{2}:\\d{2}",AL="(([+-]\\d{2}(:?\\d{2})?)|Z)",DL=new RegExp(`${EL}T${PL}(\\.\\d+)?${AL}$`),RL=e=>li(e)||e===e.trim(),ML={}.toString();function Pn(){return new bk}class bk extends kn{constructor(){super({type:"string",check(t){return t instanceof String&&(t=t.valueOf()),typeof t=="string"}}),this.withMutation(()=>{this.transform((t,n)=>{if(!this.spec.coerce||this.isType(t)||Array.isArray(t))return t;const r=t!=null&&t.toString?t.toString():t;return r===ML?t:r})})}required(t){return super.required(t).withMutation(n=>n.test({message:t||dn.required,name:"required",skipAbsent:!0,test:r=>!!r.length}))}notRequired(){return super.notRequired().withMutation(t=>(t.tests=t.tests.filter(n=>n.OPTIONS.name!=="required"),t))}length(t,n=dt.length){return this.test({message:n,name:"length",exclusive:!0,params:{length:t},skipAbsent:!0,test(r){return r.length===this.resolve(t)}})}min(t,n=dt.min){return this.test({message:n,name:"min",exclusive:!0,params:{min:t},skipAbsent:!0,test(r){return r.length>=this.resolve(t)}})}max(t,n=dt.max){return this.test({name:"max",exclusive:!0,message:n,params:{max:t},skipAbsent:!0,test(r){return r.length<=this.resolve(t)}})}matches(t,n){let r=!1,i,o;return n&&(typeof n=="object"?{excludeEmptyString:r=!1,message:i,name:o}=n:i=n),this.test({name:o||"matches",message:i||dt.matches,params:{regex:t},skipAbsent:!0,test:a=>a===""&&r||a.search(t)!==-1})}email(t=dt.email){return this.matches(CL,{name:"email",message:t,excludeEmptyString:!0})}url(t=dt.url){return this.matches(TL,{name:"url",message:t,excludeEmptyString:!0})}uuid(t=dt.uuid){return this.matches($L,{name:"uuid",message:t,excludeEmptyString:!1})}datetime(t){let n="",r,i;return t&&(typeof t=="object"?{message:n="",allowOffset:r=!1,precision:i=void 0}=t:n=t),this.matches(DL,{name:"datetime",message:n||dt.datetime,excludeEmptyString:!0}).test({name:"datetime_offset",message:n||dt.datetime_offset,params:{allowOffset:r},skipAbsent:!0,test:o=>{if(!o||r)return!0;const a=Gp(o);return a?!!a.z:!1}}).test({name:"datetime_precision",message:n||dt.datetime_precision,params:{precision:i},skipAbsent:!0,test:o=>{if(!o||i==null)return!0;const a=Gp(o);return a?a.precision===i:!1}})}ensure(){return this.default("").transform(t=>t===null?"":t)}trim(t=dt.trim){return this.transform(n=>n!=null?n.trim():n).test({message:t,name:"trim",test:RL})}lowercase(t=dt.lowercase){return this.transform(n=>li(n)?n:n.toLowerCase()).test({message:t,name:"string_case",exclusive:!0,skipAbsent:!0,test:n=>li(n)||n===n.toLowerCase()})}uppercase(t=dt.uppercase){return this.transform(n=>li(n)?n:n.toUpperCase()).test({message:t,name:"string_case",exclusive:!0,skipAbsent:!0,test:n=>li(n)||n===n.toUpperCase()})}}Pn.prototype=bk.prototype;let LL=new Date(""),IL=e=>Object.prototype.toString.call(e)==="[object Date]";class sg extends kn{constructor(){super({type:"date",check(t){return IL(t)&&!isNaN(t.getTime())}}),this.withMutation(()=>{this.transform((t,n)=>!this.spec.coerce||this.isType(t)||t===null?t:(t=SL(t),isNaN(t)?sg.INVALID_DATE:new Date(t)))})}prepareParam(t,n){let r;if(Di.isRef(t))r=t;else{let i=this.cast(t);if(!this._typeCheck(i))throw new TypeError(`\`${n}\` must be a Date or a value that can be \`cast()\` to a Date`);r=i}return r}min(t,n=Yp.min){let r=this.prepareParam(t,"min");return this.test({message:n,name:"min",exclusive:!0,params:{min:t},skipAbsent:!0,test(i){return i>=this.resolve(r)}})}max(t,n=Yp.max){let r=this.prepareParam(t,"max");return this.test({message:n,name:"max",exclusive:!0,params:{max:t},skipAbsent:!0,test(i){return i<=this.resolve(r)}})}}sg.INVALID_DATE=LL;function OL(e,t=[]){let n=[],r=new Set,i=new Set(t.map(([a,l])=>`${a}-${l}`));function o(a,l){let c=mi.split(a)[0];r.add(c),i.has(`${l}-${c}`)||n.push([l,c])}for(const a of Object.keys(e)){let l=e[a];r.add(a),Di.isRef(l)&&l.isSibling?o(l.path,a):og(l)&&"deps"in l&&l.deps.forEach(c=>o(c,a))}return lL.array(Array.from(r),n).reverse()}function My(e,t){let n=1/0;return e.some((r,i)=>{var o;if((o=t.path)!=null&&o.includes(r))return n=i,!0}),n}function jk(e){return(t,n)=>My(e,t)-My(e,n)}const FL=(e,t,n)=>{if(typeof e!="string")return e;let r=e;try{r=JSON.parse(e)}catch{}return n.isType(r)?r:e};function Ql(e){if("fields"in e){const t={};for(const[n,r]of Object.entries(e.fields))t[n]=Ql(r);return e.setFields(t)}if(e.type==="array"){const t=e.optional();return t.innerType&&(t.innerType=Ql(t.innerType)),t}return e.type==="tuple"?e.optional().clone({types:e.spec.types.map(Ql)}):"optional"in e?e.optional():e}const NL=(e,t)=>{const n=[...mi.normalizePath(t)];if(n.length===1)return n[0]in e;let r=n.pop(),i=mi.getter(mi.join(n),!0)(e);return!!(i&&r in i)};let Ly=e=>Object.prototype.toString.call(e)==="[object Object]";function Iy(e,t){let n=Object.keys(e.fields);return Object.keys(t).filter(r=>n.indexOf(r)===-1)}const _L=jk([]);function kk(e){return new Sk(e)}class Sk extends kn{constructor(t){super({type:"object",check(n){return Ly(n)||typeof n=="function"}}),this.fields=Object.create(null),this._sortErrors=_L,this._nodes=[],this._excludedEdges=[],this.withMutation(()=>{t&&this.shape(t)})}_cast(t,n={}){var r;let i=super._cast(t,n);if(i===void 0)return this.getDefault(n);if(!this._typeCheck(i))return i;let o=this.fields,a=(r=n.stripUnknown)!=null?r:this.spec.noUnknown,l=[].concat(this._nodes,Object.keys(i).filter(h=>!this._nodes.includes(h))),c={},u=Object.assign({},n,{parent:c,__validating:n.__validating||!1}),d=!1;for(const h of l){let f=o[h],g=h in i,m=i[h];if(f){let b;u.path=(n.path?`${n.path}.`:"")+h,f=f.resolve({value:m,context:n.context,parent:c});let j=f instanceof kn?f.spec:void 0,x=j==null?void 0:j.strict;if(j!=null&&j.strip){d=d||h in i;continue}b=!n.__validating||!x?f.cast(m,u):m,b!==void 0&&(c[h]=b)}else g&&!a&&(c[h]=m);(g!==h in c||c[h]!==m)&&(d=!0)}return d?c:i}_validate(t,n={},r,i){let{from:o=[],originalValue:a=t,recursive:l=this.spec.recursive}=n;n.from=[{schema:this,value:a},...o],n.__validating=!0,n.originalValue=a,super._validate(t,n,r,(c,u)=>{if(!l||!Ly(u)){i(c,u);return}a=a||u;let d=[];for(let h of this._nodes){let f=this.fields[h];!f||Di.isRef(f)||d.push(f.asNestedTest({options:n,key:h,parent:u,parentPath:n.path,originalParent:a}))}this.runTests({tests:d,value:u,originalValue:a,options:n},r,h=>{i(h.sort(this._sortErrors).concat(c),u)})})}clone(t){const n=super.clone(t);return n.fields=Object.assign({},this.fields),n._nodes=this._nodes,n._excludedEdges=this._excludedEdges,n._sortErrors=this._sortErrors,n}concat(t){let n=super.concat(t),r=n.fields;for(let[i,o]of Object.entries(this.fields)){const a=r[i];r[i]=a===void 0?o:a}return n.withMutation(i=>i.setFields(r,[...this._excludedEdges,...t._excludedEdges]))}_getDefault(t){if("default"in this.spec)return super._getDefault(t);if(!this._nodes.length)return;let n={};return this._nodes.forEach(r=>{var i;const o=this.fields[r];let a=t;(i=a)!=null&&i.value&&(a=Object.assign({},a,{parent:a.value,value:a.value[r]})),n[r]=o&&"getDefault"in o?o.getDefault(a):void 0}),n}setFields(t,n){let r=this.clone();return r.fields=t,r._nodes=OL(t,n),r._sortErrors=jk(Object.keys(t)),n&&(r._excludedEdges=n),r}shape(t,n=[]){return this.clone().withMutation(r=>{let i=r._excludedEdges;return n.length&&(Array.isArray(n[0])||(n=[n]),i=[...r._excludedEdges,...n]),r.setFields(Object.assign(r.fields,t),i)})}partial(){const t={};for(const[n,r]of Object.entries(this.fields))t[n]="optional"in r&&r.optional instanceof Function?r.optional():r;return this.setFields(t)}deepPartial(){return Ql(this)}pick(t){const n={};for(const r of t)this.fields[r]&&(n[r]=this.fields[r]);return this.setFields(n,this._excludedEdges.filter(([r,i])=>t.includes(r)&&t.includes(i)))}omit(t){const n=[];for(const r of Object.keys(this.fields))t.includes(r)||n.push(r);return this.pick(n)}from(t,n,r){let i=mi.getter(t,!0);return this.transform(o=>{if(!o)return o;let a=o;return NL(o,t)&&(a=Object.assign({},o),r||delete a[t],a[n]=i(o)),a})}json(){return this.transform(FL)}exact(t){return this.test({name:"exact",exclusive:!0,message:t||ql.exact,test(n){if(n==null)return!0;const r=Iy(this.schema,n);return r.length===0||this.createError({params:{properties:r.join(", ")}})}})}stripUnknown(){return this.clone({noUnknown:!0})}noUnknown(t=!0,n=ql.noUnknown){typeof t!="boolean"&&(n=t,t=!0);let r=this.test({name:"noUnknown",exclusive:!0,message:n,test(i){if(i==null)return!0;const o=Iy(this.schema,i);return!t||o.length===0||this.createError({params:{unknown:o.join(", ")}})}});return r.spec.noUnknown=t,r}unknown(t=!0,n=ql.noUnknown){return this.noUnknown(!t,n)}transformKeys(t){return this.transform(n=>{if(!n)return n;const r={};for(const i of Object.keys(n))r[t(i)]=n[i];return r})}camelCase(){return this.transformKeys(Nd.camelCase)}snakeCase(){return this.transformKeys(Nd.snakeCase)}constantCase(){return this.transformKeys(t=>Nd.snakeCase(t).toUpperCase())}describe(t){const n=(t?this.resolve(t):this).clone(),r=super.describe(t);r.fields={};for(const[o,a]of Object.entries(n.fields)){var i;let l=t;(i=l)!=null&&i.value&&(l=Object.assign({},l,{parent:l.value,value:l.value[o]})),r.fields[o]=a.describe(l)}return r}}kk.prototype=Sk.prototype;const zL=kk({name:Pn().required("Họ tên là bắt buộc").min(2,"Họ tên phải có ít nhất 2 ký tự").max(50,"Họ tên không được quá 50 ký tự").matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐẢẠẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăâđảạầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỢỤỦỨỪễệỉịọỏốồổỗộớờởợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/,"Họ tên chỉ được chứa chữ cái và khoảng trắng"),email:Pn().optional().test("email-format","Email không hợp lệ",function(e){return e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e):!0}),phone:Pn().required("Số điện thoại là bắt buộc").matches(/^(0|\+84)[0-9]{9,10}$/,"Số điện thoại không hợp lệ (VD: 0123456789 hoặc +84123456789)"),street:Pn().required("Địa chỉ đường/phố là bắt buộc").min(5,"Địa chỉ phải có ít nhất 5 ký tự").max(100,"Địa chỉ không được quá 100 ký tự"),district:Pn().required("Quận/huyện là bắt buộc").min(2,"Tên quận/huyện phải có ít nhất 2 ký tự").max(50,"Tên quận/huyện không được quá 50 ký tự"),city:Pn().required("Thành phố/tỉnh là bắt buộc").min(2,"Tên thành phố/tỉnh phải có ít nhất 2 ký tự").max(50,"Tên thành phố/tỉnh không được quá 50 ký tự"),note:Pn().optional().max(200,"Ghi chú không được quá 200 ký tự"),payment:Pn().oneOf(["visa","momo","zalopay","cod","vnpay"],"Phương thức thanh toán không hợp lệ").required("Vui lòng chọn phương thức thanh toán")}),BL=p.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`,VL=p(H.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`,HL=p.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`,_d=p.div`
  margin-bottom: 32px;
`,zd=p.h3`
  margin: 0 0 20px 0;
  color: var(--text);
  font-size: 20px;
  font-weight: 600;
  border-bottom: 2px solid var(--border);
  padding-bottom: 8px;
`,_r=p.div`
  margin-bottom: 20px;
`,zr=p.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
`,Br=p.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${e=>e.hasError?"#f44336":"var(--border)"};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.hasError?"#f44336":"var(--primary)"};
    box-shadow: 0 0 0 3px ${e=>e.hasError?"rgba(244, 67, 54, 0.1)":"rgba(255, 102, 0, 0.1)"};
  }
`,Vr=p(H.div)`
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
`,UL=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,Oy=p(H.div)`
  padding: 16px;
  border: 2px solid ${e=>e.isSelected?"var(--primary)":"var(--border)"};
  border-radius: 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"rgba(255, 102, 0, 0.05)":"var(--card)"};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`,Fy=p.div`
  font-size: 24px;
  margin-bottom: 8px;
`,Ny=p.div`
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
`,_y=p.div`
  font-size: 12px;
  color: var(--secondaryText);
`,WL=p.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`,us=p.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    border-top: 1px solid var(--border);
    padding-top: 12px;
    margin-top: 12px;
    font-weight: 600;
    font-size: 16px;
  }
`,KL=p(H.button)`
  width: 100%;
  padding: 16px;
  background: ${e=>e.disabled?"var(--border)":"linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)"};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`,YL=p(H.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,GL=p(H.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  max-width: 400px;
  margin: 20px;
`,qL=p(H.div)`
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  margin: 0 auto 20px;
`,QL=p.div`
  width: 200px;
  height: 200px;
  background: #f5f5f5;
  border: 2px solid var(--border);
  border-radius: 12px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--secondaryText);
`,XL=()=>{const{user:e}=Ke(),{addOrder:t,getOrdersByPhone:n}=Lr(),{items:r,clear:i,subtotal:o}=$a(),a=wt(),[l,c]=y.useState({name:(e==null?void 0:e.name)||"",phone:(e==null?void 0:e.phone)||"",email:"",street:"",district:"",city:"",note:"",payment:"cod"}),[u,d]=y.useState({}),[h,f]=y.useState(!1),[g,m]=y.useState(!1),b=25e3,j=o*.08,x=o+j+b,v=k=>{const{name:T,value:C}=k.target;c(E=>({...E,[T]:C})),u[T]&&d(E=>({...E,[T]:""}))},w=async()=>{try{return await zL.validate(l,{abortEarly:!1}),d({}),!0}catch(k){const T={};return k.inner.forEach(C=>{T[C.path]=C.message}),d(T),!1}},S=async k=>{if(k.preventDefault(),!await w()){U.error("Vui lòng kiểm tra lại thông tin!");return}if(r.length===0){U.error("Giỏ hàng trống!");return}if(n(l.phone).filter(E=>E.status==="Processing"||E.status==="Delivering").length>=2){U.error("Bạn đã đặt nhiều hơn số đơn hàng quy định! Chờ một xíu nhé!");return}f(!0);try{if(l.payment==="vnpay"){m(!0);const E=await VM();if(E.success){const P=Date.now().toString();t({id:P,name:l.name,phone:l.phone,address:`${l.street}, ${l.district}, ${l.city}`,items:r.map(A=>({name:A.name,qty:A.qty,price:A.price})),total:x,status:"Processing",paymentMethod:"vnpay",paymentStatus:"completed",vnpayTransactionId:E.transactionId,dronePath:["Nhà hàng","Kho Drone","Đang giao","Hoàn tất"]}),i(),U.success("Thanh toán VNPay thành công!"),a("/orders")}else U.error(E.message)}else{const E=Date.now().toString();t({id:E,name:l.name,phone:l.phone,address:`${l.street}, ${l.district}, ${l.city}`,items:r.map(P=>({name:P.name,qty:P.qty,price:P.price})),total:x,status:"Processing",paymentMethod:l.payment,paymentStatus:l.payment==="cod"?"Đang chờ phê duyệt":"completed",dronePath:["Nhà hàng","Kho Drone","Đang giao","Hoàn tất"]}),i(),U.success("Bạn đã đặt hàng thành công!"),a("/orders")}}catch{U.error("Có lỗi xảy ra khi đặt hàng!")}finally{f(!1),m(!1)}};return s.jsxs(BL,{children:[s.jsxs(VL,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[s.jsx(HL,{children:"Thông tin thanh toán"}),s.jsxs("form",{onSubmit:S,children:[s.jsxs(_d,{children:[s.jsx(zd,{children:"Thông tin khách hàng"}),s.jsxs(_r,{children:[s.jsx(zr,{children:"Họ tên *"}),s.jsx(Br,{name:"name",value:l.name,onChange:v,placeholder:"Nhập họ tên của bạn",hasError:!!u.name}),s.jsx(Qe,{children:u.name&&s.jsx(Vr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.name})})]}),s.jsxs(_r,{children:[s.jsx(zr,{children:"Số điện thoại *"}),s.jsx(Br,{name:"phone",value:l.phone,onChange:v,placeholder:"Nhập số điện thoại",type:"tel",hasError:!!u.phone}),s.jsx(Qe,{children:u.phone&&s.jsx(Vr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.phone})})]}),s.jsxs(_r,{children:[s.jsx(zr,{children:"Email"}),s.jsx(Br,{name:"email",value:l.email,onChange:v,placeholder:"Nhập email (tùy chọn)",type:"email",hasError:!!u.email}),s.jsx(Qe,{children:u.email&&s.jsx(Vr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.email})})]}),s.jsxs(_r,{children:[s.jsx(zr,{children:"Địa chỉ đường/phố *"}),s.jsx(Br,{name:"street",value:l.street,onChange:v,placeholder:"Nhập địa chỉ đường/phố",hasError:!!u.street}),s.jsx(Qe,{children:u.street&&s.jsx(Vr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.street})})]}),s.jsxs(_r,{children:[s.jsx(zr,{children:"Quận/huyện *"}),s.jsx(Br,{name:"district",value:l.district,onChange:v,placeholder:"Nhập quận/huyện",hasError:!!u.district}),s.jsx(Qe,{children:u.district&&s.jsx(Vr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.district})})]}),s.jsxs(_r,{children:[s.jsx(zr,{children:"Thành phố/tỉnh *"}),s.jsx(Br,{name:"city",value:l.city,onChange:v,placeholder:"Nhập thành phố/tỉnh",hasError:!!u.city}),s.jsx(Qe,{children:u.city&&s.jsx(Vr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.city})})]}),s.jsxs(_r,{children:[s.jsx(zr,{children:"Ghi chú"}),s.jsx(Br,{name:"note",value:l.note,onChange:v,placeholder:"Nhập ghi chú (tùy chọn)",as:"textarea",rows:3,hasError:!!u.note}),s.jsx(Qe,{children:u.note&&s.jsx(Vr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.note})})]})]}),s.jsxs(_d,{children:[s.jsx(zd,{children:"Phương thức thanh toán"}),s.jsxs(UL,{children:[s.jsxs(Oy,{isSelected:l.payment==="cod",onClick:()=>c(k=>({...k,payment:"cod"})),whileHover:{scale:1.02},whileTap:{scale:.98},children:[s.jsx(Fy,{children:"💵"}),s.jsx(Ny,{children:"Thanh toán khi nhận hàng"}),s.jsx(_y,{children:"Trả tiền mặt khi giao hàng"})]}),s.jsxs(Oy,{isSelected:l.payment==="vnpay",onClick:()=>c(k=>({...k,payment:"vnpay"})),whileHover:{scale:1.02},whileTap:{scale:.98},children:[s.jsx(Fy,{children:"🏦"}),s.jsx(Ny,{children:"VNPay"}),s.jsx(_y,{children:"Thanh toán online qua VNPay"})]})]})]}),s.jsxs(_d,{children:[s.jsx(zd,{children:"Tóm tắt đơn hàng"}),s.jsxs(WL,{children:[r.map(k=>s.jsxs(us,{children:[s.jsxs("span",{children:[k.name," x ",k.qty]}),s.jsx("span",{children:oe(k.price*k.qty)})]},k.id)),s.jsxs(us,{children:[s.jsx("span",{children:"Tạm tính"}),s.jsx("span",{children:oe(o)})]}),s.jsxs(us,{children:[s.jsx("span",{children:"Phí giao hàng"}),s.jsx("span",{children:oe(b)})]}),s.jsxs(us,{children:[s.jsx("span",{children:"Thuế (8%)"}),s.jsx("span",{children:oe(j)})]}),s.jsxs(us,{children:[s.jsx("span",{children:"Tổng cộng"}),s.jsx("span",{children:oe(x)})]})]})]}),s.jsx(KL,{type:"submit",disabled:h||r.length===0,whileHover:{scale:h?1:1.02},whileTap:{scale:h?1:.98},children:h?"Đang xử lý...":"Đặt hàng"})]})]}),s.jsx(Qe,{children:g&&s.jsx(YL,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:s.jsxs(GL,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},children:[s.jsx(qL,{animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),s.jsx("h3",{children:"Đang chuyển hướng đến VNPay..."}),s.jsx("p",{children:"Vui lòng chờ trong giây lát"}),s.jsxs(QL,{children:["VNPay QR Code",s.jsx("br",{}),"(Demo Mode)"]})]})})})]})},zy=p.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`,By=p(H.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  text-align: center;
  width: 100%;
`,Ck=p(H.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`,ZL=p(Ck)`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
`,JL=p(Ck)`
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
`,Bd=p.h2`
  margin: 0 0 16px 0;
  color: var(--text);
  font-size: 24px;
  font-weight: 700;
`,hl=p.p`
  color: var(--secondaryText);
  margin: 0 0 24px 0;
  line-height: 1.6;
`,eI=p(H.button)`
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`,tI=p(H.div)`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  margin: 0 auto 24px;
`,nI=()=>{const[e]=A$(),t=wt(),{updateOrderPaymentStatus:n}=Lr(),[r,i]=y.useState(!0),[o,a]=y.useState(null);y.useEffect(()=>{(async()=>{try{await new Promise(d=>setTimeout(d,2e3));const u=HM(e);u.isValid?(a({success:!0,message:"Thanh toán VNPay thành công! Đơn hàng của bạn đã được xác nhận.",transactionId:u.transactionId}),u.transactionId&&u.orderId&&n(u.orderId,"completed",u.transactionId),U.success("Thanh toán thành công!")):(a({success:!1,message:"Thanh toán thất bại. Vui lòng thử lại hoặc chọn phương thức thanh toán khác."}),U.error("Thanh toán thất bại!"))}catch{a({success:!1,message:"Có lỗi xảy ra khi xử lý thanh toán. Vui lòng liên hệ hỗ trợ."}),U.error("Có lỗi xảy ra!")}finally{i(!1)}})()},[e,n]);const l=()=>{o!=null&&o.success?t("/orders"):t("/checkout")};return r?s.jsx(zy,{children:s.jsxs(By,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},children:[s.jsx(tI,{animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),s.jsx(Bd,{children:"Đang xử lý thanh toán..."}),s.jsx(hl,{children:"Vui lòng chờ trong giây lát"})]})}):s.jsx(zy,{children:s.jsxs(By,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[o!=null&&o.success?s.jsxs(s.Fragment,{children:[s.jsx(ZL,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},children:"✓"}),s.jsx(Bd,{children:"Thanh toán thành công!"}),s.jsx(hl,{children:o.message}),o.transactionId&&s.jsxs(hl,{children:[s.jsx("strong",{children:"Mã giao dịch:"})," ",o.transactionId]})]}):s.jsxs(s.Fragment,{children:[s.jsx(JL,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},children:"✗"}),s.jsx(Bd,{children:"Thanh toán thất bại"}),s.jsx(hl,{children:o==null?void 0:o.message})]}),s.jsx(eI,{onClick:l,whileHover:{scale:1.05},whileTap:{scale:.95},children:o!=null&&o.success?"Xem đơn hàng":"Thử lại"})]})})},rI=p.footer`
  margin-top: 40px;
  padding: 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
  text-align: center;
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`,iI=p.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
`,Vd=p.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.3);
  }
`,oI=()=>s.jsxs(rI,{children:["©2025 Food Fast Drone Delivery | Designed by Your Name 🚀",s.jsxs(iI,{children:[s.jsx(Vd,{href:"#","aria-label":"Facebook",children:"📘"}),s.jsx(Vd,{href:"#","aria-label":"Instagram",children:"📷"}),s.jsx(Vd,{href:"#","aria-label":"Twitter",children:"🐦"})]})]}),sI=p.header`
  position: sticky; 
  top: 0; 
  z-index: 20;
  background: var(--card);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);
`,aI=p.div`
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  padding: 12px 24px; 
  max-width: 1200px; 
  margin: 0 auto;
`,lI=p(gu)`
  font-weight: 800; 
  color: var(--primary);
  font-size: 20px;
`,cI=p.nav`
  display: flex; 
  gap: 12px; 
  align-items: center;
  
  @media (max-width: 768px) {
    position: absolute; 
    top: 100%; 
    left: 0; 
    right: 0; 
    padding: 16px 24px; 
    background: var(--card);
    display: ${({open:e})=>e?"flex":"none"}; 
    flex-direction: column;
    gap: 8px; 
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
  }
`,Gi=p(gu)`
  padding: 8px 12px; 
  border-radius: var(--radius);
  transition: background-color 0.2s ease;
  
  &:hover { 
    background: var(--border); 
  }
  
  &.active { 
    background: var(--primary); 
    color: white;
  }
`,uI=p(Gi)`
  position: relative;
  
  &:after {
    content: attr(data-count);
    position: absolute; 
    top: -6px; 
    right: -6px;
    background: var(--primary); 
    color: #fff;
    border-radius: 999px; 
    padding: 2px 6px; 
    font-size: 12px;
    min-width: 18px;
    text-align: center;
  }
`,dI=p.button`
  display: none; 
  
  @media (max-width: 768px) { 
    display: inline-flex; 
  }
  
  background: var(--card); 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  padding: 8px 12px; 
  cursor: pointer;
  color: var(--text);
`,Vy=p.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,hI=p.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
  }
`,pI=p.button`
  background: var(--border);
  color: var(--text);
  border: none;
  padding: 8px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e74c3c;
    color: #fff;
  }
`,fI=()=>{const{items:e}=$a(),{user:t,logout:n,isAdmin:r,isRestaurant:i,isCustomer:o}=Ke(),a=y.useMemo(()=>e.reduce((d,h)=>d+h.qty,0),[e]),[l,c]=y.useState(!1),u=()=>{n(),U.success("👋 Đã đăng xuất thành công!")};return s.jsx(sI,{children:s.jsxs(aI,{children:[s.jsx(lI,{to:"/menu",children:"FoodFast"}),s.jsx(dI,{"aria-label":"menu",onClick:()=>c(d=>!d),children:l?"✕":"☰"}),s.jsxs(cI,{open:l,children:[!(t&&i())&&s.jsx(Gi,{to:"/menu",title:"Xem thực đơn",children:"Thực đơn"}),t&&o()&&s.jsxs(s.Fragment,{children:[s.jsx(uI,{to:"/cart",title:"Xem giỏ hàng","data-count":a,children:"Giỏ hàng"}),s.jsx(Gi,{to:"/checkout",title:"Thanh toán",children:"Thanh toán"})]}),t&&r()&&s.jsx(Gi,{to:"/admin",title:"Bảng điều khiển quản trị",children:"Quản trị"}),t&&i()&&s.jsxs(s.Fragment,{children:[t.restaurantId==="rest_2"&&s.jsx(Gi,{to:"/sweetdreams",title:"SweetDreams Bakery",children:"SweetDreams"}),(t.restaurantId==="restaurant_2"||t.username==="aloha_restaurant")&&s.jsx(Gi,{to:"/aloha-dashboard",title:"Aloha Kitchen",children:"Aloha"})]}),t?s.jsxs(Vy,{children:[s.jsxs("span",{style:{color:"var(--text)",fontSize:"14px"},children:["Xin chào, ",t==null?void 0:t.name,"! (",r()?"Quản trị viên":i()?"Nhà hàng":"Khách hàng",")"]}),s.jsx(pI,{onClick:u,children:"Đăng xuất"})]}):s.jsx(Vy,{children:s.jsx(hI,{as:gu,to:"/login",children:"Đăng nhập"})})]})]})})},mI=p.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`,gI=p(H.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF6600 0%, #FF8C00 100%);
  }
`,xI=p.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: #333;
  font-size: 28px;
  font-weight: 700;
`,Hy=p.div`
  margin-bottom: 24px;
  position: relative;
`,Uy=p.div`
  position: relative;
  display: flex;
  align-items: center;
`,Wy=p.div`
  position: absolute;
  left: 16px;
  color: #666;
  font-size: 18px;
  z-index: 1;
`,Ky=p.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
  
  &:focus {
    outline: none;
    border-color: #FF6600;
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`,yI=p(H.button)`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #FF6600 0%, #FF8C00 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 102, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`,vI=p(H.div)`
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  font-size: 14px;
`,wI=p.div`
  margin-top: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #FF6600;
`,bI=p.h4`
  margin: 0 0 12px 0;
  color: #495057;
  font-size: 16px;
`,jI=p.div`
  color: #6c757d;
  font-size: 14px;
  line-height: 1.6;
  
  strong {
    color: #495057;
  }
`,kI=p(H.div)`
  text-align: center;
  margin-top: 24px;
  
  a {
    color: #FF6600;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #FF8C00;
    }
  }
`,SI=()=>{var x,v;const{login:e,user:t}=Ke(),n=wt(),i=((v=(x=Rt().state)==null?void 0:x.from)==null?void 0:v.pathname)||"/",[o,a]=y.useState(""),[l,c]=y.useState(""),[u,d]=y.useState(null),[h,f]=y.useState(!1),[g,m]=y.useState(!1),b=y.useCallback(w=>{if(console.log("🧭 [Login] Calculating redirect path for user:",{username:w==null?void 0:w.username,role:w==null?void 0:w.role,restaurantId:w==null?void 0:w.restaurantId}),!w)return console.log("⚠️ [Login] No user provided, returning from:",i),i;if(w.role==="restaurant")return w.restaurantId==="rest_2"||w.username==="sweetdreams"?(console.log("🍰 [Login] Redirecting to SweetDreams dashboard"),"/restaurant/sweetdreams"):w.restaurantId==="restaurant_2"||w.username==="aloha_restaurant"?(console.log("🍜 [Login] Redirecting to Aloha dashboard"),"/aloha-dashboard"):(console.log("🏪 [Login] Redirecting to generic restaurant dashboard"),"/restaurant");const S=i==="/login"?"/":i;return console.log("👤 [Login] Redirecting customer to:",S),S},[i]);y.useEffect(()=>{if(console.log("🔄 [Login useEffect] Triggered with:",{loginSuccess:g,hasUser:!!t,username:t==null?void 0:t.username,role:t==null?void 0:t.role}),g&&t){const w=b(t);console.log("✅ [Login] Auto-redirecting authenticated user to:",w),console.log("👤 [Login] Full user data:",t);const S=setTimeout(()=>{console.log("🚀 [Login] Executing navigate() to:",w),n(w,{replace:!0}),console.log("✅ [Login] navigate() called successfully")},100);return()=>{console.log("🧹 [Login] Cleaning up navigation timer"),clearTimeout(S)}}else g&&!t&&console.warn("⚠️ [Login] loginSuccess is true but user is null!")},[t,g,n,b]);const j=async w=>{w.preventDefault(),console.log("📝 [Login] Form submitted with username:",o),f(!0),d(null),m(!1);try{console.log("📞 [Login] Calling login() function...");const S=await e(o.trim(),l);console.log("📨 [Login] Login response received:",S),S.ok?(console.log("✅ [Login] Login succeeded, showing success toast"),U.success("🎉 Đăng nhập thành công!"),console.log("🎯 [Login] Setting loginSuccess flag to true"),m(!0),console.log("✅ [Login] loginSuccess flag set, useEffect should trigger soon")):(console.log("❌ [Login] Login failed:",S.message),d(S.message||"Đăng nhập thất bại"),U.error(S.message||"Đăng nhập thất bại")),f(!1)}catch(S){console.error("💥 [Login] Exception during login:",S),f(!1),d("Có lỗi xảy ra, vui lòng thử lại"),U.error("Có lỗi xảy ra, vui lòng thử lại")}};return s.jsx(mI,{children:s.jsxs(gI,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[s.jsx(xI,{children:"Đăng nhập"}),s.jsxs("form",{onSubmit:j,children:[s.jsx(Hy,{children:s.jsxs(Uy,{children:[s.jsx(Wy,{children:"👤"}),s.jsx(Ky,{type:"text",placeholder:"Nhập tên đăng nhập",value:o,onChange:w=>a(w.target.value),required:!0,disabled:h})]})}),s.jsx(Hy,{children:s.jsxs(Uy,{children:[s.jsx(Wy,{children:"🔒"}),s.jsx(Ky,{type:"password",placeholder:"Nhập mật khẩu",value:l,onChange:w=>c(w.target.value),required:!0,disabled:h})]})}),s.jsx(yI,{type:"submit",disabled:h,whileHover:{scale:1.02},whileTap:{scale:.98},children:h?"Đang đăng nhập...":"Đăng nhập"}),u&&s.jsx(vI,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:u})]}),s.jsxs(wI,{children:[s.jsx(bI,{children:"📋 Tài khoản mẫu:"}),s.jsxs(jI,{children:[s.jsxs("div",{children:[s.jsx("strong",{children:"Customer:"})," user / user123"]}),s.jsxs("div",{children:[s.jsx("strong",{children:"Customer:"})," user1 / user1123"]}),s.jsxs("div",{children:[s.jsx("strong",{children:"Restaurant (SweetDreams):"})," sweetdreams / sweet123"]}),s.jsxs("div",{children:[s.jsx("strong",{children:"Restaurant (Aloha):"})," aloha_restaurant / aloha123"]})]})]}),s.jsx(kI,{children:s.jsx("a",{href:"/",children:"← Quay về trang chủ"})})]})})},CI=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
`,TI=p(H.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e5e9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
  }
`,$I=p.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${e=>e.$gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,EI=p.div`
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
  line-height: 1;
`,PI=p.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;p.div`
  font-size: 12px;
  margin-top: 8px;
  color: ${e=>e.$positive?"#28a745":"#dc3545"};
  font-weight: 600;
  
  &::before {
    content: '${e=>e.$positive?"↗":"↘"}';
    margin-right: 4px;
  }
`;const ag=({stats:e,theme:t})=>{const n=[{id:"customers",icon:"👥",value:e.totalCustomers,label:"Tổng khách hàng",gradient:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",gradientStart:"#667eea",gradientEnd:"#764ba2"},{id:"orders",icon:"📦",value:e.totalOrders,label:"Tổng đơn hàng",gradient:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",gradientStart:"#f093fb",gradientEnd:"#f5576c"},{id:"drones",icon:"🚁",value:e.activeDrones,label:"Drone đang bay",gradient:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",gradientStart:"#4facfe",gradientEnd:"#00f2fe"},{id:"completed",icon:"✅",value:e.completedDeliveries,label:"Đã hoàn tất",gradient:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",gradientStart:"#43e97b",gradientEnd:"#38f9d7"}];return e.todayRevenue!==void 0&&n.push({id:"revenue",icon:"💰",value:e.todayRevenue,label:"Doanh thu hôm nay",gradient:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",gradientStart:"#fa709a",gradientEnd:"#fee140"}),e.avgDeliveryTime!==void 0&&n.push({id:"avgTime",icon:"⏱️",value:e.avgDeliveryTime,label:"TG giao TB (phút)",gradient:"linear-gradient(135deg, #30cfd0 0%, #330867 100%)",gradientStart:"#30cfd0",gradientEnd:"#330867"}),s.jsx(CI,{children:n.map((r,i)=>s.jsxs(TI,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:i*.1},style:{"--gradient-start":r.gradientStart,"--gradient-end":r.gradientEnd},children:[s.jsx($I,{$gradient:r.gradient,children:r.icon}),s.jsx(EI,{children:r.id==="revenue"&&typeof r.value=="number"?oe(r.value):r.value}),s.jsx(PI,{children:r.label})]},r.id))})};var Tk={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(zk,function(){var n=1e3,r=6e4,i=36e5,o="millisecond",a="second",l="minute",c="hour",u="day",d="week",h="month",f="quarter",g="year",m="date",b="Invalid Date",j=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,x=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(_){var N=["th","st","nd","rd"],F=_%100;return"["+_+(N[(F-20)%10]||N[F]||N[0])+"]"}},w=function(_,N,F){var D=String(_);return!D||D.length>=N?_:""+Array(N+1-D.length).join(F)+_},S={s:w,z:function(_){var N=-_.utcOffset(),F=Math.abs(N),D=Math.floor(F/60),$=F%60;return(N<=0?"+":"-")+w(D,2,"0")+":"+w($,2,"0")},m:function _(N,F){if(N.date()<F.date())return-_(F,N);var D=12*(F.year()-N.year())+(F.month()-N.month()),$=N.clone().add(D,h),L=F-$<0,I=N.clone().add(D+(L?-1:1),h);return+(-(D+(F-$)/(L?$-I:I-$))||0)},a:function(_){return _<0?Math.ceil(_)||0:Math.floor(_)},p:function(_){return{M:h,y:g,w:d,d:u,D:m,h:c,m:l,s:a,ms:o,Q:f}[_]||String(_||"").toLowerCase().replace(/s$/,"")},u:function(_){return _===void 0}},k="en",T={};T[k]=v;var C="$isDayjsObject",E=function(_){return _ instanceof Y||!(!_||!_[C])},P=function _(N,F,D){var $;if(!N)return k;if(typeof N=="string"){var L=N.toLowerCase();T[L]&&($=L),F&&(T[L]=F,$=L);var I=N.split("-");if(!$&&I.length>1)return _(I[0])}else{var B=N.name;T[B]=N,$=B}return!D&&$&&(k=$),$||!D&&k},A=function(_,N){if(E(_))return _.clone();var F=typeof N=="object"?N:{};return F.date=_,F.args=arguments,new Y(F)},M=S;M.l=P,M.i=E,M.w=function(_,N){return A(_,{locale:N.$L,utc:N.$u,x:N.$x,$offset:N.$offset})};var Y=function(){function _(F){this.$L=P(F.locale,null,!0),this.parse(F),this.$x=this.$x||F.x||{},this[C]=!0}var N=_.prototype;return N.parse=function(F){this.$d=function(D){var $=D.date,L=D.utc;if($===null)return new Date(NaN);if(M.u($))return new Date;if($ instanceof Date)return new Date($);if(typeof $=="string"&&!/Z$/i.test($)){var I=$.match(j);if(I){var B=I[2]-1||0,z=(I[7]||"0").substring(0,3);return L?new Date(Date.UTC(I[1],B,I[3]||1,I[4]||0,I[5]||0,I[6]||0,z)):new Date(I[1],B,I[3]||1,I[4]||0,I[5]||0,I[6]||0,z)}}return new Date($)}(F),this.init()},N.init=function(){var F=this.$d;this.$y=F.getFullYear(),this.$M=F.getMonth(),this.$D=F.getDate(),this.$W=F.getDay(),this.$H=F.getHours(),this.$m=F.getMinutes(),this.$s=F.getSeconds(),this.$ms=F.getMilliseconds()},N.$utils=function(){return M},N.isValid=function(){return this.$d.toString()!==b},N.isSame=function(F,D){var $=A(F);return this.startOf(D)<=$&&$<=this.endOf(D)},N.isAfter=function(F,D){return A(F)<this.startOf(D)},N.isBefore=function(F,D){return this.endOf(D)<A(F)},N.$g=function(F,D,$){return M.u(F)?this[D]:this.set($,F)},N.unix=function(){return Math.floor(this.valueOf()/1e3)},N.valueOf=function(){return this.$d.getTime()},N.startOf=function(F,D){var $=this,L=!!M.u(D)||D,I=M.p(F),B=function(tt,Oe){var bt=M.w($.$u?Date.UTC($.$y,Oe,tt):new Date($.$y,Oe,tt),$);return L?bt:bt.endOf(u)},z=function(tt,Oe){return M.w($.toDate()[tt].apply($.toDate("s"),(L?[0,0,0,0]:[23,59,59,999]).slice(Oe)),$)},G=this.$W,ee=this.$M,pe=this.$D,ge="set"+(this.$u?"UTC":"");switch(I){case g:return L?B(1,0):B(31,11);case h:return L?B(1,ee):B(0,ee+1);case d:var Re=this.$locale().weekStart||0,Yt=(G<Re?G+7:G)-Re;return B(L?pe-Yt:pe+(6-Yt),ee);case u:case m:return z(ge+"Hours",0);case c:return z(ge+"Minutes",1);case l:return z(ge+"Seconds",2);case a:return z(ge+"Milliseconds",3);default:return this.clone()}},N.endOf=function(F){return this.startOf(F,!1)},N.$set=function(F,D){var $,L=M.p(F),I="set"+(this.$u?"UTC":""),B=($={},$[u]=I+"Date",$[m]=I+"Date",$[h]=I+"Month",$[g]=I+"FullYear",$[c]=I+"Hours",$[l]=I+"Minutes",$[a]=I+"Seconds",$[o]=I+"Milliseconds",$)[L],z=L===u?this.$D+(D-this.$W):D;if(L===h||L===g){var G=this.clone().set(m,1);G.$d[B](z),G.init(),this.$d=G.set(m,Math.min(this.$D,G.daysInMonth())).$d}else B&&this.$d[B](z);return this.init(),this},N.set=function(F,D){return this.clone().$set(F,D)},N.get=function(F){return this[M.p(F)]()},N.add=function(F,D){var $,L=this;F=Number(F);var I=M.p(D),B=function(ee){var pe=A(L);return M.w(pe.date(pe.date()+Math.round(ee*F)),L)};if(I===h)return this.set(h,this.$M+F);if(I===g)return this.set(g,this.$y+F);if(I===u)return B(1);if(I===d)return B(7);var z=($={},$[l]=r,$[c]=i,$[a]=n,$)[I]||1,G=this.$d.getTime()+F*z;return M.w(G,this)},N.subtract=function(F,D){return this.add(-1*F,D)},N.format=function(F){var D=this,$=this.$locale();if(!this.isValid())return $.invalidDate||b;var L=F||"YYYY-MM-DDTHH:mm:ssZ",I=M.z(this),B=this.$H,z=this.$m,G=this.$M,ee=$.weekdays,pe=$.months,ge=$.meridiem,Re=function(Oe,bt,ut,La){return Oe&&(Oe[bt]||Oe(D,L))||ut[bt].slice(0,La)},Yt=function(Oe){return M.s(B%12||12,Oe,"0")},tt=ge||function(Oe,bt,ut){var La=Oe<12?"AM":"PM";return ut?La.toLowerCase():La};return L.replace(x,function(Oe,bt){return bt||function(ut){switch(ut){case"YY":return String(D.$y).slice(-2);case"YYYY":return M.s(D.$y,4,"0");case"M":return G+1;case"MM":return M.s(G+1,2,"0");case"MMM":return Re($.monthsShort,G,pe,3);case"MMMM":return Re(pe,G);case"D":return D.$D;case"DD":return M.s(D.$D,2,"0");case"d":return String(D.$W);case"dd":return Re($.weekdaysMin,D.$W,ee,2);case"ddd":return Re($.weekdaysShort,D.$W,ee,3);case"dddd":return ee[D.$W];case"H":return String(B);case"HH":return M.s(B,2,"0");case"h":return Yt(1);case"hh":return Yt(2);case"a":return tt(B,z,!0);case"A":return tt(B,z,!1);case"m":return String(z);case"mm":return M.s(z,2,"0");case"s":return String(D.$s);case"ss":return M.s(D.$s,2,"0");case"SSS":return M.s(D.$ms,3,"0");case"Z":return I}return null}(Oe)||I.replace(":","")})},N.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},N.diff=function(F,D,$){var L,I=this,B=M.p(D),z=A(F),G=(z.utcOffset()-this.utcOffset())*r,ee=this-z,pe=function(){return M.m(I,z)};switch(B){case g:L=pe()/12;break;case h:L=pe();break;case f:L=pe()/3;break;case d:L=(ee-G)/6048e5;break;case u:L=(ee-G)/864e5;break;case c:L=ee/i;break;case l:L=ee/r;break;case a:L=ee/n;break;default:L=ee}return $?L:M.a(L)},N.daysInMonth=function(){return this.endOf(h).$D},N.$locale=function(){return T[this.$L]},N.locale=function(F,D){if(!F)return this.$L;var $=this.clone(),L=P(F,D,!0);return L&&($.$L=L),$},N.clone=function(){return M.w(this.$d,this)},N.toDate=function(){return new Date(this.valueOf())},N.toJSON=function(){return this.isValid()?this.toISOString():null},N.toISOString=function(){return this.$d.toISOString()},N.toString=function(){return this.$d.toUTCString()},_}(),X=Y.prototype;return A.prototype=X,[["$ms",o],["$s",a],["$m",l],["$H",c],["$W",u],["$M",h],["$y",g],["$D",m]].forEach(function(_){X[_[1]]=function(N){return this.$g(N,_[0],_[1])}}),A.extend=function(_,N){return _.$i||(_(N,Y,A),_.$i=!0),A},A.locale=P,A.isDayjs=E,A.unix=function(_){return A(1e3*_)},A.en=T[k],A.Ls=T,A.p={},A})})(Tk);var AI=Tk.exports;const qp=Qp(AI),DI=p.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,RI=p.div`
  margin-bottom: 24px;
`,MI=p.h2`
  color: ${e=>e.$primary};
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
`,LI=p.div`
  position: relative;
  margin-bottom: 24px;
`,II=p.input`
  width: 100%;
  padding: 14px 48px 14px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`,OI=p.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 20px;
`,FI=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,pl=p.div`
  background: linear-gradient(135deg, ${e=>e.$primary}, ${e=>e.$primary}dd);
  padding: 20px;
  border-radius: 12px;
  color: white;
`,fl=p.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
`,ml=p.div`
  font-size: 14px;
  opacity: 0.9;
`,NI=p(H.div)`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  border: 2px solid ${e=>e.$accent};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${e=>e.$accent}dd;
  }
`,_I=p.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`,zI=p.div`
  font-weight: 600;
  color: #333;
  font-size: 18px;
`,BI=p.div`
  color: #666;
  font-size: 14px;
`,VI=p.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`,HI=p.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`,UI=p.div`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`,WI=p.div`
  margin-bottom: 12px;
`,KI=p.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #e1e5e9;
  
  &:last-child {
    border-bottom: none;
  }
`,YI=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #dee2e6;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`,GI=p.div`
  font-weight: 700;
  color: ${e=>e.$primary};
  font-size: 20px;
`,qI=p.span`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  ${e=>{switch(e.$status){case"pending":return"background: #FFF9C4; color: #F57F17;";case"confirmed":return"background: #B3E5FC; color: #0277BD;";case"preparing":return"background: #FFE0B2; color: #E65100;";case"delivering":return"background: #C8E6C9; color: #2E7D32;";case"delivered":return"background: #B2DFDB; color: #00695C;";default:return"background: #E0E0E0; color: #616161;"}}}
`,QI=p.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,XI=p.button`
  padding: 8px 16px;
  background: ${e=>e.$primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,ZI=p.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,$k=({restaurantId:e,theme:t})=>{const{orders:n,updateOrderStatus:r}=Lr(),[i,o]=y.useState([]),[a,l]=y.useState([]),[c,u]=y.useState("");y.useEffect(()=>{if(n){const g=n.filter(m=>m.restaurantId===e);o(g),l(g)}},[n,e]),y.useEffect(()=>{if(c.trim()==="")l(i);else{const g=c.toLowerCase(),m=i.filter(b=>{var v;const j=((v=b.name)==null?void 0:v.toLowerCase())||"",x=b.phone||"";return j.includes(g)||x.includes(g)});l(m)}},[c,i]);const d={totalOrders:i.length,pendingOrders:i.filter(g=>g.status==="Processing").length,preparingOrders:i.filter(g=>g.status==="Delivering").length,totalRevenue:i.reduce((g,m)=>g+(m.total||0),0)},h=(g,m)=>{r(g,m),U.success(`Order ${g} updated to ${m}! 🎉`)},f=g=>{const m=["Processing","Delivering","Completed"],b=m.indexOf(g);return b<m.length-1?m[b+1]:null};return s.jsxs(DI,{children:[s.jsx(RI,{children:s.jsx(MI,{$primary:t.primary,children:"📦 Theo dõi đơn hàng"})}),s.jsxs(LI,{children:[s.jsx(II,{type:"text",placeholder:"🔍 Search by customer name or phone number...",value:c,onChange:g=>u(g.target.value)}),s.jsx(OI,{children:"🔍"})]}),s.jsxs(FI,{children:[s.jsxs(pl,{$primary:t.primary,children:[s.jsx(fl,{children:d.totalOrders}),s.jsx(ml,{children:"Tổng số đơn"})]}),s.jsxs(pl,{$primary:t.secondary,children:[s.jsx(fl,{children:d.pendingOrders}),s.jsx(ml,{children:"Đang xử lý"})]}),s.jsxs(pl,{$primary:t.accent,children:[s.jsx(fl,{children:d.preparingOrders}),s.jsx(ml,{children:"Đang giao hàng"})]}),s.jsxs(pl,{$primary:t.primary,children:[s.jsx(fl,{children:oe(d.totalRevenue)}),s.jsx(ml,{children:"Doanh thu"})]})]}),a.length===0?s.jsxs(ZI,{children:[s.jsx("h3",{children:c?"No matching orders found":"Chưa có đơn nào !"}),s.jsx("p",{children:c?"Try a different search term":"Đơn hàng sẽ xuất hiện ở đây sau khi khách hàng đặt hàng"})]}):a.sort((g,m)=>m.createdAt-g.createdAt).map(g=>{var m;return s.jsxs(NI,{$accent:t.accent,initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[s.jsxs(_I,{children:[s.jsxs("div",{children:[s.jsxs(zI,{children:["Order #",g.id]}),s.jsx(BI,{children:qp(g.createdAt).format("DD/MM/YYYY HH:mm")})]}),s.jsx(qI,{$status:g.status,children:g.status.toUpperCase()})]}),s.jsxs(VI,{children:[s.jsx(HI,{children:"Customer Information:"}),s.jsxs(UI,{children:[g.name||"N/A"," - ",g.phone||"N/A"]})]}),s.jsx(WI,{children:(m=g.items)==null?void 0:m.map((b,j)=>s.jsxs(KI,{children:[s.jsxs("span",{children:[b.qty,"x ",b.name]}),s.jsx("span",{children:oe(b.price*b.qty)})]},j))}),s.jsxs(YI,{children:[s.jsxs(GI,{$primary:t.primary,children:["Total: ",oe(g.total)]}),s.jsx(QI,{children:f(g.status)&&s.jsxs(XI,{$primary:t.primary,onClick:()=>h(g.id,f(g.status)),children:["Move to ",f(g.status)]})})]})]},g.id)})]})},JI=p.div`
  /* Wrapper styling if needed */
`,eO=({restaurantId:e="default",theme:t={primary:"#FF6600",secondary:"#e55a00",accent:"#ff8534"}})=>s.jsx(JI,{children:s.jsx($k,{restaurantId:e,theme:t})}),Qt={lat:21.0285,lng:105.8542};function $s(e,t){const r=e.lat*Math.PI/180,i=t.lat*Math.PI/180,o=(t.lat-e.lat)*Math.PI/180,a=(t.lng-e.lng)*Math.PI/180,l=Math.sin(o/2)*Math.sin(o/2)+Math.cos(r)*Math.cos(i)*Math.sin(a/2)*Math.sin(a/2);return 6371e3*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}function tO(){const e=(Math.random()-.5)*.05,t=(Math.random()-.5)*.05;return{lat:Qt.lat+e,lng:Qt.lng+t}}function Yy(e=8){const t=[],n=["active","enroute","enroute","enroute","returning","charging"];for(let r=0;r<e;r++){const i=tO(),o=n[r%n.length];let a,l;o==="charging"||o==="active"?(a={...Qt},l=0):o==="returning"?(l=75+Math.random()*20,a={lat:i.lat+(Qt.lat-i.lat)*(l/100),lng:i.lng+(Qt.lng-i.lng)*(l/100)}):(l=Math.random()*70,a={lat:Qt.lat+(i.lat-Qt.lat)*(l/100),lng:Qt.lng+(i.lng-Qt.lng)*(l/100)});const c=$s(a,o==="returning"?Qt:i),u=30+Math.random()*20,d=Math.round(c/1e3/u*60);t.push({id:`DRONE-${String(r+1).padStart(3,"0")}`,orderId:`ORD-${Math.floor(1e4+Math.random()*9e4)}`,status:o,battery:o==="charging"?30+Math.random()*30:60+Math.random()*40,speed:u,currentPosition:a,destination:i,restaurantPosition:Qt,distanceRemaining:Math.round(c),estimatedArrival:d,progress:l})}return t}function nO(e,t=1){if(e.status==="charging"){const j=Math.min(100,e.battery+2);return j>=100?{...e,battery:100,status:"active",progress:0}:{...e,battery:j}}const n=e.status==="returning"?e.restaurantPosition:e.destination,r=$s(e.currentPosition,n);if(r<50){if(e.status==="returning")return{...e,status:"charging",currentPosition:e.restaurantPosition,progress:0,distanceRemaining:0,estimatedArrival:0};if(e.status==="enroute")return{...e,status:"returning",progress:0,currentPosition:e.destination}}const o=e.speed*1e3/3600*t,a=Math.min(o/r,1),l={lat:e.currentPosition.lat+(n.lat-e.currentPosition.lat)*a,lng:e.currentPosition.lng+(n.lng-e.currentPosition.lng)*a},c=$s(l,n),u=Math.round(c/1e3/e.speed*60),d=$s(e.restaurantPosition,e.destination),h=$s(e.restaurantPosition,l),f=Math.min(h/d*100,100),g=.2*t,m=Math.max(0,e.battery-g);let b=e.status;return m<10&&e.status!=="returning"?b="returning":m<20&&m>=10&&e.status==="active"&&(b=e.status),{...e,currentPosition:l,distanceRemaining:Math.round(c),estimatedArrival:b==="returning"?0:u,battery:m,progress:f,status:b}}function Gy(e){return{active:"Đang giao hàng",enroute:"Đang bay tới",returning:"Đang quay về nhà hàng",charging:"Đang sạc pin"}[e]}function qy(e){return{active:"#28a745",enroute:"#ff9800",returning:"#dc3545",charging:"#6c757d"}[e]}function rO(e){return e<1e3?`${Math.round(e)}m`:`${(e/1e3).toFixed(1)}km`}function iO(e){if(e<1)return"< 1 phút";if(e<60)return`${Math.round(e)} phút`;const t=Math.floor(e/60),n=Math.round(e%60);return`${t}h ${n}p`}const oO=p.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,sO=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,aO=p.h2`
  color: ${e=>e.$color||"#FF6600"};
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`,lO=p.div`
  display: flex;
  gap: 12px;
`,Hd=p.button`
  padding: 10px 20px;
  border: 2px solid ${e=>e.$variant==="success"?"#28a745":e.$variant==="danger"?"#dc3545":"#6c757d"};
  background: ${e=>e.$variant==="success"?"#28a745":e.$variant==="danger"?"#dc3545":"#6c757d"};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,cO=p.div`
  background: linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%);
  border-radius: 12px;
  padding: 40px;
  min-height: 400px;
  position: relative;
  border: 2px solid #e1e5e9;
  margin-bottom: 24px;
`,uO=p(H.div)`
  position: absolute;
  left: ${e=>50+e.$x*30}%;
  top: ${e=>50+e.$y*30}%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  z-index: 10;
  cursor: pointer;
  filter: ${e=>e.$battery<10?"drop-shadow(0 0 8px #dc3545) hue-rotate(-20deg)":e.$battery<20?"drop-shadow(0 0 8px #ffc107) hue-rotate(40deg)":"drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"};
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`,dO=p.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`,hO=p(H.div)`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: ${e=>e.$level<10?"#dc3545":"#ffc107"};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 15;
`,pO=p(H.div)`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: ${e=>e.$color};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 14;
`,fO=p.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 20;
`,mO=p.div`
  font-size: 12px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`,Ud=p.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #666;
`,Wd=p.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${e=>e.$color};
  border: 2px solid white;
  box-shadow: 0 0 4px ${e=>e.$color};
`,gO=p(H.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  z-index: 5;
`,xO=p.table`
  width: 100%;
  border-collapse: collapse;
`,Hr=p.th`
  padding: 12px;
  text-align: left;
  background: #f8f9fa;
  border-bottom: 2px solid #e1e5e9;
  font-weight: 600;
`,Ur=p.td`
  padding: 12px;
  border-bottom: 1px solid #e1e5e9;
`,yO=p.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.$color}20;
  color: ${e=>e.$color};
  border: 1px solid ${e=>e.$color};
`,vO=p.div`
  width: 80px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
  
  &::before {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 12px;
    background: #333;
    border-radius: 0 2px 2px 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${e=>e.$level}%;
    background: ${e=>e.$level>60?"linear-gradient(90deg, #28a745, #43e97b)":e.$level>20?"linear-gradient(90deg, #ffc107, #ffeb3b)":"linear-gradient(90deg, #dc3545, #ff6b6b)"};
    transition: width 0.3s ease, background 0.3s ease;
    animation: ${e=>e.$level<20?"pulse 1s infinite":"none"};
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`,wO=p.span`
  position: relative;
  z-index: 1;
  font-size: 11px;
  font-weight: 700;
  color: #333;
  display: block;
  text-align: center;
  line-height: 20px;
  text-shadow: 0 0 2px white;
`,lg=({theme:e})=>{const[t,n]=y.useState([]),[r,i]=y.useState(!1);return y.useEffect(()=>{n(Yy(8))},[]),y.useEffect(()=>{if(!r)return;const o=setInterval(()=>{n(a=>a.map(l=>nO(l,1)))},1e3);return()=>clearInterval(o)},[r]),s.jsxs(oO,{children:[s.jsxs(sO,{children:[s.jsx(aO,{$color:e==null?void 0:e.primary,children:"🚁 Mô phỏng hoạt động Drone giao hàng"}),s.jsxs(lO,{children:[s.jsx(Hd,{$variant:"success",onClick:()=>i(!0),disabled:r,children:"▶️ Bắt đầu"}),s.jsx(Hd,{$variant:"danger",onClick:()=>i(!1),disabled:!r,children:"⏸️ Tạm dừng"}),s.jsx(Hd,{onClick:()=>{i(!1),n(Yy(8))},children:"🔄 Đặt lại"})]})]}),s.jsxs(cO,{children:[s.jsx(gO,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:200},children:"🏪"}),s.jsxs(fO,{children:[s.jsx(mO,{children:"Trạng thái pin"}),s.jsxs(Ud,{children:[s.jsx(Wd,{$color:"#28a745"}),s.jsx("span",{children:"> 60%: Tốt"})]}),s.jsxs(Ud,{children:[s.jsx(Wd,{$color:"#ffc107"}),s.jsx("span",{children:"20-60%: Cảnh báo"})]}),s.jsxs(Ud,{children:[s.jsx(Wd,{$color:"#dc3545"}),s.jsx("span",{children:"< 20%: Nguy hiểm"})]})]}),s.jsx(Qe,{children:t.map(o=>s.jsxs(dO,{children:[s.jsx(uO,{$x:(o.currentPosition.lng-o.restaurantPosition.lng)*1e3,$y:(o.currentPosition.lat-o.restaurantPosition.lat)*1e3,$battery:o.battery,initial:{scale:0,opacity:0},animate:{scale:1,opacity:1,rotate:r?360:0},exit:{scale:0,opacity:0},transition:{scale:{type:"spring",stiffness:200},rotate:{duration:2,repeat:1/0,ease:"linear"}},children:"🚁"}),o.battery<20&&s.jsx(hO,{$level:o.battery,initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.3},style:{position:"absolute",left:`${50+(o.currentPosition.lng-o.restaurantPosition.lng)*1e3}%`,top:`${50+(o.currentPosition.lat-o.restaurantPosition.lat)*1e3+3}%`},children:o.battery<10?"⚠️ Pin cực thấp!":"⚡ Pin yếu"}),s.jsx(pO,{$color:qy(o.status),initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.3},style:{position:"absolute",left:`${50+(o.currentPosition.lng-o.restaurantPosition.lng)*1e3}%`,top:`${50+(o.currentPosition.lat-o.restaurantPosition.lat)*1e3+5}%`},children:Gy(o.status)})]},o.id))})]}),s.jsxs(xO,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx(Hr,{children:"ID Drone"}),s.jsx(Hr,{children:"Đơn hàng"}),s.jsx(Hr,{children:"Trạng thái"}),s.jsx(Hr,{children:"Pin"}),s.jsx(Hr,{children:"Tốc độ"}),s.jsx(Hr,{children:"Khoảng cách"}),s.jsx(Hr,{children:"Thời gian"})]})}),s.jsx("tbody",{children:t.map(o=>s.jsxs("tr",{children:[s.jsx(Ur,{children:s.jsx("strong",{children:o.id})}),s.jsx(Ur,{children:o.orderId}),s.jsx(Ur,{children:s.jsx(yO,{$color:qy(o.status),children:Gy(o.status)})}),s.jsx(Ur,{children:s.jsx(vO,{$level:o.battery,children:s.jsxs(wO,{children:[Math.round(o.battery),"%"]})})}),s.jsxs(Ur,{children:[Math.round(o.speed)," km/h"]}),s.jsx(Ur,{children:rO(o.distanceRemaining)}),s.jsx(Ur,{children:iO(o.estimatedArrival)})]},o.id))})]})]})},bO=p.div`
  margin-top: 24px;
`,jO=p.h2`
  color: ${e=>e.$color||"#FF6600"};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,kO=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,SO=p(H.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${e=>e.$gradient};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`,CO=p.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,TO=p.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${e=>e.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`,$O=p.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`,EO=p.div`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 8px;
`,PO=p.div`
  font-size: 14px;
  color: ${e=>e.$positive?"#28a745":"#dc3545"};
  font-weight: 600;
  
  &::before {
    content: '${e=>e.$positive?"↗":"↘"}';
    margin-right: 4px;
  }
`,AO=p.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,Qy=p.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`,Kd=p.h3`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
`,DO=p.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 250px;
  gap: 12px;
  padding: 16px 0;
`,RO=p.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`,MO=p(H.div)`
  width: 100%;
  height: ${e=>e.$height}%;
  background: ${e=>e.$color};
  border-radius: 8px 8px 0 0;
  position: relative;
  cursor: pointer;
  transition: filter 0.2s ease;
  
  &:hover {
    filter: brightness(1.1);
  }
`,LO=p.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`,IO=p.div`
  font-size: 12px;
  color: #666;
  text-align: center;
`,OO=p.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,FO=p.svg`
  width: 200px;
  height: 200px;
`,NO=p.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,_O=p.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,zO=p.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${e=>e.$color};
`,BO=p.div`
  flex: 1;
`,VO=p.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`,HO=p.div`
  font-size: 12px;
  color: #666;
`,UO=p.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`,WO=p.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,KO=p.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
    transform: translateX(4px);
  }
`,YO=p.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${e=>e.$color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
`,GO=p.div`
  flex: 1;
`,qO=p.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`,QO=p.div`
  font-size: 14px;
  color: #666;
`,XO=p.div`
  font-size: 16px;
  font-weight: 600;
  color: #FF6600;
`,cg=({theme:e,restaurant:t="SweetDreams"})=>{const n=[{icon:"📦",label:"Tổng đơn hàng hôm nay",value:"156",change:"+12%",positive:!0,gradient:"linear-gradient(90deg, #667eea, #764ba2)",bg:"#667eea20"},{icon:"📦",label:"Tổng đơn hàng tuần này",value:"892",change:"+8%",positive:!0,gradient:"linear-gradient(90deg, #f093fb, #f5576c)",bg:"#f093fb20"},{icon:"💰",label:"Doanh thu hôm nay",value:oe(1245e4),change:"+15%",positive:!0,gradient:"linear-gradient(90deg, #4facfe, #00f2fe)",bg:"#4facfe20"},{icon:"⏱️",label:"Thời gian giao TB",value:"18 phút",change:"-5 phút",positive:!0,gradient:"linear-gradient(90deg, #43e97b, #38f9d7)",bg:"#43e97b20"}],r=[{label:"T2",value:85e5},{label:"T3",value:92e5},{label:"T4",value:11e6},{label:"T5",value:105e5},{label:"T6",value:138e5},{label:"T7",value:152e5},{label:"CN",value:124e5}],i=Math.max(...r.map(d=>d.value)),o=[{label:"Đang chuẩn bị",value:45,color:"#ffc107"},{label:"Đang giao",value:38,color:"#007bff"},{label:"Hoàn tất",value:142,color:"#28a745"},{label:"Đã hủy",value:5,color:"#dc3545"}],a=o.reduce((d,h)=>d+h.value,0);let l=0;const c=t==="SweetDreams"?[{name:"Bánh Tiramisu",sales:89,revenue:4895e3},{name:"Bánh Donut",sales:67,revenue:1675e3},{name:"Bánh Phô Mai Dâu",sales:54,revenue:243e4}]:[{name:"Pizza Hawaii",sales:95,revenue:8455e3},{name:"Hamburger",sales:78,revenue:6162e3},{name:"Cơm Chiên Hawaii",sales:62,revenue:4278e3}],u=["#FFD700","#C0C0C0","#CD7F32"];return s.jsxs(bO,{children:[s.jsx(jO,{$color:e==null?void 0:e.primary,children:"📊 Thống kê và phân tích thông minh"}),s.jsx(kO,{children:n.map((d,h)=>s.jsx(SO,{$gradient:d.gradient,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:h*.1},children:s.jsxs(CO,{children:[s.jsxs("div",{children:[s.jsx($O,{children:d.label}),s.jsx(EO,{children:d.value}),s.jsx(PO,{$positive:d.positive,children:d.change})]}),s.jsx(TO,{$bg:d.bg,children:d.icon})]})},h))}),s.jsxs(AO,{children:[s.jsxs(Qy,{children:[s.jsx(Kd,{children:"📈 Xu hướng doanh thu tuần"}),s.jsx(DO,{children:r.map((d,h)=>s.jsxs(RO,{children:[s.jsx(LO,{children:oe(d.value)}),s.jsx(MO,{$height:d.value/i*100,$color:`linear-gradient(180deg, ${(e==null?void 0:e.primary)||"#FF6600"}, ${(e==null?void 0:e.secondary)||"#e55a00"})`,initial:{height:0},animate:{height:`${d.value/i*100}%`},transition:{delay:h*.1,duration:.5}}),s.jsx(IO,{children:d.label})]},h))})]}),s.jsxs(Qy,{children:[s.jsx(Kd,{children:"🎯 Đơn hàng theo trạng thái"}),s.jsxs(OO,{children:[s.jsxs(FO,{viewBox:"0 0 200 200",children:[s.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"#e1e5e9",strokeWidth:"40"}),o.map((d,h)=>{const g=d.value/a*100/100*360,m=l;l+=g;const b=100+80*Math.cos((m-90)*Math.PI/180),j=100+80*Math.sin((m-90)*Math.PI/180),x=100+80*Math.cos((m+g-90)*Math.PI/180),v=100+80*Math.sin((m+g-90)*Math.PI/180),w=g>180?1:0;return s.jsx(H.path,{d:`M 100,100 L ${b},${j} A 80,80 0 ${w} 1 ${x},${v} Z`,fill:d.color,initial:{opacity:0},animate:{opacity:1},transition:{delay:h*.1}},h)}),s.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"white"}),s.jsx("text",{x:"100",y:"95",textAnchor:"middle",fontSize:"24",fontWeight:"700",fill:"#333",children:a}),s.jsx("text",{x:"100",y:"115",textAnchor:"middle",fontSize:"12",fill:"#666",children:"Đơn hàng"})]}),s.jsx(NO,{children:o.map((d,h)=>s.jsxs(_O,{children:[s.jsx(zO,{$color:d.color}),s.jsxs(BO,{children:[s.jsx(VO,{children:d.label}),s.jsxs(HO,{children:[d.value," đơn (",(d.value/a*100).toFixed(0),"%)"]})]})]},h))})]})]})]}),s.jsxs(UO,{children:[s.jsx(Kd,{children:"🏆 Top 3 món ăn phổ biến"}),s.jsx(WO,{children:c.map((d,h)=>s.jsxs(KO,{children:[s.jsx(YO,{$color:u[h],children:h+1}),s.jsxs(GO,{children:[s.jsx(qO,{children:d.name}),s.jsxs(QO,{children:[d.sales," đơn hàng"]})]}),s.jsx(XO,{children:oe(d.revenue)})]},h))})]})]})},In={primary:"#FF6600",secondary:"#e55a00",accent:"#ff8534"},ZO=p.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fef8f1 0%, #fff 100%);
  padding: 24px;
`,JO=p.div`
  max-width: 1400px;
  margin: 0 auto;
`,eF=p.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 6px solid ${In.primary};
`,tF=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`,nF=p.div``,rF=p.h1`
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`,iF=p.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
`,oF=p.div`
  display: flex;
  gap: 12px;
`,sF=p.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }
`,aF=p.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e1e5e9;
  margin-bottom: 24px;
  background: white;
  padding: 0 24px;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`,lF=p.button`
  padding: 16px 24px;
  border: none;
  background: ${e=>e.$active?In.primary:"transparent"};
  color: ${e=>e.$active?"white":"#6c757d"};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: ${e=>e.$active?In.primary:"#f8f9fa"};
    color: ${e=>e.$active?"white":"#333"};
  }
  
  ${e=>e.$active&&`
    box-shadow: 0 -2px 8px rgba(255, 102, 0, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`,cF=p.span`
  margin-right: 8px;
`,uF=p(H.div)`
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`,dF=p.div`
  background: linear-gradient(135deg, ${In.primary} 0%, ${In.secondary} 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`,hF=p.div`
  font-size: 48px;
`,pF=p.div`
  flex: 1;
  
  h3 {
    margin: 0 0 4px 0;
    font-size: 20px;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }
`,fF=()=>{const e=Ke(),[t,n]=y.useState("overview");if(!e)return console.error("RestaurantDashboard: useAuth() returned null. Make sure the component is wrapped in AuthProvider."),s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["⚠️ Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none",padding:"10px 20px",border:"2px solid #FF6600",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});const{user:r,loading:i,logout:o}=e,{orders:a}=Lr(),l=localStorage.getItem("token"),c=localStorage.getItem("role");if(i)return s.jsx("div",{style:{textAlign:"center",padding:"30px"},children:"Đang tải dữ liệu người dùng..."});if(!r||!l||!c)return s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none",padding:"10px 20px",border:"2px solid #FF6600",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});if(r.role!==c)return console.error("Role mismatch in RestaurantDashboard"),localStorage.clear(),s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px"},children:["Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none"},children:"Đăng nhập lại"})})]});if(r.role!=="restaurant"&&r.role!=="admin")return s.jsx("div",{style:{textAlign:"center",padding:"30px",color:"#d00"},children:"Bạn không có quyền truy cập trang này. Chỉ tài khoản nhà hàng mới có thể truy cập."});const u=new Set(a.map(x=>x.phone)).size,d=a.length,h=a.filter(x=>x.status==="Delivering").length,f=a.filter(x=>x.status==="Completed").length,g={totalCustomers:u,totalOrders:d,activeDrones:h,completedDeliveries:f},m=()=>{o(),U.success("👋 Đã đăng xuất"),window.location.href="/login"},b=[{id:"overview",icon:"📊",label:"Tổng quan"},{id:"drones",icon:"🚁",label:"Mô phỏng Drone"},{id:"orders",icon:"📦",label:"Đơn hàng"}],j=()=>{switch(t){case"overview":return s.jsxs("div",{style:{padding:"24px"},children:[s.jsx(ag,{stats:g,theme:In}),s.jsxs(dF,{children:[s.jsx(hF,{children:"👨‍🍳"}),s.jsxs(pF,{children:[s.jsxs("h3",{children:["Chào mừng ",r==null?void 0:r.name,"!"]}),s.jsx("p",{children:"Quản lý nhà hàng của bạn một cách dễ dàng với FoodFast Drone Delivery"})]})]}),s.jsx(cg,{theme:In})]});case"drones":return s.jsx("div",{style:{padding:"24px"},children:s.jsx(lg,{theme:In})});case"orders":return s.jsx(eO,{restaurantId:r==null?void 0:r.id,theme:In});default:return null}};return s.jsx(ZO,{children:s.jsxs(JO,{children:[s.jsx(eF,{children:s.jsxs(tF,{children:[s.jsxs(nF,{children:[s.jsxs(rF,{children:[s.jsx("span",{children:"🏪"})," Bảng điều khiển nhà hàng"]}),s.jsxs(iF,{children:["Chào mừng trở lại, ",s.jsx("strong",{children:r==null?void 0:r.name}),"! Quản lý nhà hàng của bạn tại đây."]})]}),s.jsx(oF,{children:s.jsx(sF,{onClick:m,children:"🚪 Đăng xuất"})})]})}),s.jsx(aF,{children:b.map(x=>s.jsxs(lF,{$active:t===x.id,onClick:()=>n(x.id),children:[s.jsx(cF,{children:x.icon}),x.label]},x.id))}),s.jsx(Qe,{mode:"wait",children:s.jsx(uF,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:j()},t)})]})})},Ek=({restaurantId:e,theme:t})=>{const{getRestaurantProducts:n,addProduct:r,updateProduct:i,deleteProduct:o,toggleAvailability:a,loading:l}=I3(),[c,u]=y.useState([]),[d,h]=y.useState(!0),[f,g]=y.useState(""),[m,b]=y.useState("Tất cả"),[j,x]=y.useState("Tất cả"),[v,w]=y.useState([]),[S,k]=y.useState({totalDishes:0,availableDishes:0,outOfStockDishes:0,categories:0}),[T,C]=y.useState(!1),[E,P]=y.useState(null),[A,M]=y.useState({name:"",category:"",price:"",available:!0,description:"",ingredients:"",preparationTime:""});y.useEffect(()=>{(async()=>{h(!0);try{const $=e==="sweetdreams"?"SweetDreams":"Aloha",[L,I,B]=await Promise.all([n($),H$($),U$($)]);u(L),w(I),k(B)}catch($){console.error("Error loading menu data:",$),U.error("Không thể tải dữ liệu menu")}finally{h(!1)}})()},[e,n]),y.useEffect(()=>{(async()=>{try{const $=e==="sweetdreams"?"SweetDreams":"Aloha",L=j==="Còn hàng",I=j==="Hết hàng",B=await V$($,f,m==="Tất cả"?void 0:m,L);let z=B;I?z=B.filter(G=>!G.available):j==="Còn hàng"&&(z=B.filter(G=>G.available)),u(z)}catch($){console.error("Error searching dishes:",$)}})()},[f,m,j,e]);const Y=()=>{P(null),M({name:"",category:"",price:"",available:!0,description:"",ingredients:"",preparationTime:""}),C(!0)},X=D=>{var $,L;P(D),M({name:D.name,category:D.category,price:D.price.toString(),available:D.available,description:D.description||"",ingredients:(($=D.ingredients)==null?void 0:$.join(", "))||"",preparationTime:((L=D.preparationTime)==null?void 0:L.toString())||""}),C(!0)},_=async D=>{if(window.confirm("Bạn có chắc chắn muốn xóa món ăn này?"))try{if(await o(D)){const L=c.filter(I=>I.id!==D);u(L)}}catch($){console.error("Error deleting dish:",$),U.error("Không thể xóa món ăn")}},N=async()=>{if(!A.name||!A.category||!A.price){U.error("Vui lòng nhập đầy đủ thông tin!");return}try{const D=e==="sweetdreams"?"SweetDreams":"Aloha",$={name:A.name,category:A.category,price:parseInt(A.price),available:A.available,description:A.description,ingredients:A.ingredients?A.ingredients.split(",").map(L=>L.trim()):[],preparationTime:A.preparationTime?parseInt(A.preparationTime):void 0,image:"/images/default-dish.jpg",restaurant:D};if(E){const L=await i(E.id,$);if(L){const I=c.map(B=>B.id===E.id?L:B);u(I)}}else{const L=await r($);L&&u([...c,L])}C(!1)}catch(D){console.error("Error saving dish:",D),U.error("Không thể lưu món ăn")}},F=D=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(D);return d?s.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"40px",fontSize:"16px",color:"#666"},children:"Đang tải dữ liệu menu..."}):s.jsxs("div",{style:{padding:"24px",background:t.background||"#f8f9fa",minHeight:"100vh"},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexWrap:"wrap",gap:"16px"},children:[s.jsx("h1",{style:{fontSize:"28px",fontWeight:"700",color:t.primary||"#333",margin:0,display:"flex",alignItems:"center",gap:"12px"},children:"🍳 Quản lý món ăn"}),s.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[s.jsx("input",{type:"text",placeholder:"Tìm kiếm món ăn...",value:f,onChange:D=>g(D.target.value),style:{padding:"12px 16px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px",minWidth:"200px",transition:"border-color 0.2s"}}),s.jsx("select",{value:m,onChange:D=>b(D.target.value),style:{padding:"12px 16px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px",background:"white",cursor:"pointer"},children:v.map(D=>s.jsx("option",{value:D,children:D},D))}),s.jsxs("select",{value:j,onChange:D=>x(D.target.value),style:{padding:"12px 16px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px",background:"white",cursor:"pointer"},children:[s.jsx("option",{value:"Tất cả",children:"Tất cả"}),s.jsx("option",{value:"Còn hàng",children:"Còn hàng"}),s.jsx("option",{value:"Hết hàng",children:"Hết hàng"})]}),s.jsx("button",{onClick:Y,style:{padding:"12px 24px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",background:t.primary||"#007bff",color:"white",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.2s"},children:"➕ Thêm món mới"})]})]}),s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px",marginBottom:"24px"},children:[s.jsxs("div",{style:{background:"white",padding:"20px",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",borderLeft:`4px solid ${t.primary||"#007bff"}`},children:[s.jsx("div",{style:{fontSize:"24px",fontWeight:"700",color:t.primary||"#007bff",marginBottom:"4px"},children:S.totalDishes}),s.jsx("div",{style:{fontSize:"14px",color:"#666",fontWeight:"500"},children:"Tổng số món"})]}),s.jsxs("div",{style:{background:"white",padding:"20px",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",borderLeft:`4px solid ${t.primary||"#007bff"}`},children:[s.jsx("div",{style:{fontSize:"24px",fontWeight:"700",color:t.primary||"#007bff",marginBottom:"4px"},children:S.availableDishes}),s.jsx("div",{style:{fontSize:"14px",color:"#666",fontWeight:"500"},children:"Còn hàng"})]}),s.jsxs("div",{style:{background:"white",padding:"20px",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",borderLeft:`4px solid ${t.primary||"#007bff"}`},children:[s.jsx("div",{style:{fontSize:"24px",fontWeight:"700",color:t.primary||"#007bff",marginBottom:"4px"},children:S.outOfStockDishes}),s.jsx("div",{style:{fontSize:"14px",color:"#666",fontWeight:"500"},children:"Hết hàng"})]}),s.jsxs("div",{style:{background:"white",padding:"20px",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",borderLeft:`4px solid ${t.primary||"#007bff"}`},children:[s.jsx("div",{style:{fontSize:"24px",fontWeight:"700",color:t.primary||"#007bff",marginBottom:"4px"},children:S.categories}),s.jsx("div",{style:{fontSize:"14px",color:"#666",fontWeight:"500"},children:"Loại món"})]})]}),s.jsx("div",{style:{background:"white",borderRadius:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",overflow:"hidden"},children:s.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[s.jsx("thead",{style:{background:t.primary||"#007bff",color:"white"},children:s.jsxs("tr",{children:[s.jsx("th",{style:{padding:"16px",textAlign:"left",fontWeight:"600",fontSize:"14px"},children:"Tên món"}),s.jsx("th",{style:{padding:"16px",textAlign:"left",fontWeight:"600",fontSize:"14px"},children:"Loại"}),s.jsx("th",{style:{padding:"16px",textAlign:"left",fontWeight:"600",fontSize:"14px"},children:"Giá (₫)"}),s.jsx("th",{style:{padding:"16px",textAlign:"left",fontWeight:"600",fontSize:"14px"},children:"Trạng thái"}),s.jsx("th",{style:{padding:"16px",textAlign:"left",fontWeight:"600",fontSize:"14px"},children:"Hành động"})]})}),s.jsx("tbody",{children:c.length===0?s.jsx("tr",{children:s.jsx("td",{colSpan:5,style:{textAlign:"center",padding:"40px"},children:s.jsx("div",{style:{color:"#666"},children:"Không có món ăn nào"})})}):c.map((D,$)=>s.jsxs("tr",{style:{backgroundColor:$%2===0?"#f8f9fa":"white"},children:[s.jsx("td",{style:{padding:"16px",borderBottom:"1px solid #e0e0e0"},children:s.jsxs("div",{children:[s.jsx("div",{style:{fontWeight:"600",marginBottom:"4px"},children:D.name}),D.description&&s.jsx("div",{style:{fontSize:"12px",color:"#666"},children:D.description})]})}),s.jsx("td",{style:{padding:"16px",borderBottom:"1px solid #e0e0e0"},children:D.category}),s.jsx("td",{style:{padding:"16px",borderBottom:"1px solid #e0e0e0"},children:F(D.price)}),s.jsx("td",{style:{padding:"16px",borderBottom:"1px solid #e0e0e0"},children:s.jsx("span",{style:{padding:"4px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:"600",background:D.available?"#d4edda":"#f8d7da",color:D.available?"#155724":"#721c24"},children:D.available?"Còn hàng":"Hết hàng"})}),s.jsx("td",{style:{padding:"16px",borderBottom:"1px solid #e0e0e0"},children:s.jsxs("div",{style:{display:"flex",gap:"8px"},children:[s.jsx("button",{onClick:()=>X(D),style:{padding:"8px 12px",fontSize:"12px",border:"none",borderRadius:"8px",background:"#6c757d",color:"white",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:"✏️ Sửa món"}),s.jsx("button",{onClick:()=>_(D.id),style:{padding:"8px 12px",fontSize:"12px",border:"none",borderRadius:"8px",background:"#dc3545",color:"white",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:"🗑️ Xóa món"})]})})]},D.id))})]})}),T&&s.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:s.jsxs("div",{style:{background:"white",borderRadius:"12px",padding:"24px",maxWidth:"500px",width:"90%",maxHeight:"80vh",overflowY:"auto"},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[s.jsx("h3",{style:{margin:0,fontSize:"20px",fontWeight:"600",color:t.primary||"#333"},children:E?"Sửa món ăn":"Thêm món mới"}),s.jsx("button",{onClick:()=>C(!1),style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",color:"#666"},children:"×"})]}),s.jsxs("div",{style:{marginBottom:"16px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#333"},children:"Tên món ăn *"}),s.jsx("input",{type:"text",value:A.name,onChange:D=>M({...A,name:D.target.value}),placeholder:"Nhập tên món ăn",style:{width:"100%",padding:"12px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px"}})]}),s.jsxs("div",{style:{marginBottom:"16px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#333"},children:"Loại món *"}),s.jsx("input",{type:"text",value:A.category,onChange:D=>M({...A,category:D.target.value}),placeholder:"Ví dụ: Món chính, Tráng miệng, Đồ uống",style:{width:"100%",padding:"12px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px"}})]}),s.jsxs("div",{style:{marginBottom:"16px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#333"},children:"Giá (VND) *"}),s.jsx("input",{type:"number",value:A.price,onChange:D=>M({...A,price:D.target.value}),placeholder:"Nhập giá món ăn",style:{width:"100%",padding:"12px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px"}})]}),s.jsxs("div",{style:{marginBottom:"16px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#333"},children:"Trạng thái"}),s.jsxs("select",{value:A.available?"true":"false",onChange:D=>M({...A,available:D.target.value==="true"}),style:{width:"100%",padding:"12px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px",background:"white"},children:[s.jsx("option",{value:"true",children:"Còn hàng"}),s.jsx("option",{value:"false",children:"Hết hàng"})]})]}),s.jsxs("div",{style:{marginBottom:"16px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#333"},children:"Mô tả"}),s.jsx("textarea",{value:A.description,onChange:D=>M({...A,description:D.target.value}),placeholder:"Mô tả món ăn",style:{width:"100%",padding:"12px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px",minHeight:"80px",resize:"vertical"}})]}),s.jsxs("div",{style:{marginBottom:"16px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#333"},children:"Nguyên liệu"}),s.jsx("input",{type:"text",value:A.ingredients,onChange:D=>M({...A,ingredients:D.target.value}),placeholder:"Nguyên liệu (cách nhau bởi dấu phẩy)",style:{width:"100%",padding:"12px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px"}})]}),s.jsxs("div",{style:{marginBottom:"16px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#333"},children:"Thời gian chuẩn bị (phút)"}),s.jsx("input",{type:"number",value:A.preparationTime,onChange:D=>M({...A,preparationTime:D.target.value}),placeholder:"Thời gian chuẩn bị",style:{width:"100%",padding:"12px",border:"2px solid #e0e0e0",borderRadius:"8px",fontSize:"14px"}})]}),s.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[s.jsx("button",{onClick:()=>C(!1),style:{padding:"12px 24px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",background:"#6c757d",color:"white"},children:"Hủy"}),s.jsx("button",{onClick:N,style:{padding:"12px 24px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",background:t.primary||"#007bff",color:"white"},children:E?"Cập nhật":"Thêm món"})]})]})})]})},mF={id:"sweetdreams",name:"SweetDreams Bakery",drones:[{id:"DRONE-SD-001",status:"Đang giao hàng",pin:59,speed:46,battery:78,location:"Quận 1, TP.HCM",currentOrder:"ORD-SD-69628",estimatedArrival:"15 phút"},{id:"DRONE-SD-002",status:"Sẵn sàng",pin:95,speed:0,battery:100,location:"SweetDreams Bakery",estimatedArrival:void 0},{id:"DRONE-SD-003",status:"Đang bay tới",pin:72,speed:38,battery:65,location:"Quận 3, TP.HCM",currentOrder:"ORD-SD-71245",estimatedArrival:"8 phút"}],orders:[{id:"ORD-SD-69628",status:"Đang giao hàng",total:45e4,customerName:"Phạm Thị Mai",customerPhone:"0901234567",items:[{name:"Bánh mì thịt nướng",quantity:2,price:25e4},{name:"Cà phê sữa đá",quantity:2,price:2e5}],orderTime:"14:30",estimatedDelivery:"15:00",droneId:"DRONE-SD-001"},{id:"ORD-SD-71245",status:"Đang chuẩn bị",total:32e4,customerName:"Nguyễn Văn Nam",customerPhone:"0902345678",items:[{name:"Bánh croissant",quantity:3,price:18e4},{name:"Trà sữa trân châu",quantity:1,price:14e4}],orderTime:"14:45",estimatedDelivery:"15:15",droneId:"DRONE-SD-003"},{id:"ORD-SD-68912",status:"Hoàn thành",total:28e4,customerName:"Trần Thị Hoa",customerPhone:"0903456789",items:[{name:"Bánh mì pate",quantity:1,price:15e4},{name:"Nước cam tươi",quantity:1,price:13e4}],orderTime:"13:20",estimatedDelivery:"13:50",droneId:"DRONE-SD-002"}],revenue:1245e4,ordersToday:23,avgDeliveryTime:18,rating:4.8,topItems:[{name:"Bánh mì thịt nướng",orders:45,revenue:5625e3},{name:"Cà phê sữa đá",orders:38,revenue:38e5},{name:"Bánh croissant",orders:32,revenue:192e4},{name:"Trà sữa trân châu",orders:28,revenue:392e4}]},gF={id:"aloha",name:"Aloha Kitchen",drones:[{id:"DRONE-AK-001",status:"Đang bay tới",pin:82,speed:40,battery:85,location:"Quận 3, TP.HCM",currentOrder:"ORD-AK-81302",estimatedArrival:"12 phút"},{id:"DRONE-AK-002",status:"Đang trở về",pin:67,speed:35,battery:45,location:"Quận 7, TP.HCM",currentOrder:"ORD-AK-78945",estimatedArrival:"18 phút"}],orders:[{id:"ORD-AK-81302",status:"Đang chuẩn bị",total:32e4,customerName:"Lê Văn Minh",customerPhone:"0904567890",items:[{name:"Phở bò",quantity:1,price:18e4},{name:"Chả cá Lã Vọng",quantity:1,price:14e4}],orderTime:"14:50",estimatedDelivery:"15:20",droneId:"DRONE-AK-001"},{id:"ORD-AK-78945",status:"Hoàn thành",total:45e4,customerName:"Hoàng Thị Linh",customerPhone:"0905678901",items:[{name:"Bún bò Huế",quantity:1,price:2e5},{name:"Nem nướng",quantity:2,price:25e4}],orderTime:"13:15",estimatedDelivery:"13:45",droneId:"DRONE-AK-002"},{id:"ORD-AK-80123",status:"Đang chuẩn bị",total:28e4,customerName:"Vũ Thị Lan",customerPhone:"0906789012",items:[{name:"Cơm tấm sườn nướng",quantity:1,price:15e4},{name:"Canh chua cá",quantity:1,price:13e4}],orderTime:"15:00",estimatedDelivery:"15:30",droneId:void 0}],revenue:845e4,ordersToday:18,avgDeliveryTime:22,rating:4.6,topItems:[{name:"Phở bò",orders:32,revenue:576e4},{name:"Bún bò Huế",orders:28,revenue:56e5},{name:"Cơm tấm sườn nướng",orders:25,revenue:375e4},{name:"Chả cá Lã Vọng",orders:22,revenue:308e4}]},Mu=(e=800,t=1500)=>{const n=Math.random()*(t-e)+e;return new Promise(r=>setTimeout(r,n))},se=(e,t=5)=>{const n=(Math.random()-.5)*2*(t/100);return Math.round(e*(1+n))},Lu=e=>{switch(e.toLowerCase()){case"sweetdreams":case"rest_2":case"sweetdreams_restaurant":return mF;case"aloha":case"restaurant_2":case"aloha_restaurant":return gF;default:return null}},Pk=async e=>{await Mu();const t=Lu(e);return t?{id:t.id,name:t.name,revenue:se(t.revenue,3),ordersToday:se(t.ordersToday,8),activeDrones:t.drones.filter(n=>n.status!=="Sẵn sàng"&&n.status!=="Bảo trì").length,avgDeliveryTime:se(t.avgDeliveryTime,5),rating:Math.round((t.rating+(Math.random()-.5)*.1)*10)/10,topItems:t.topItems.map(n=>({...n,orders:se(n.orders,10),revenue:se(n.revenue,5)}))}:null},Ak=async e=>{await Mu();const t=Lu(e);return t?t.orders.map(n=>({...n,total:se(n.total,3),items:n.items.map(r=>({...r,price:se(r.price,2)}))})):[]},Dk=async e=>{await Mu();const t=Lu(e);return t?t.drones.map(n=>({...n,pin:Math.max(0,Math.min(100,se(n.pin,8))),speed:Math.max(0,se(n.speed,10)),battery:Math.max(0,Math.min(100,se(n.battery,5)))})):[]},Rk=async(e,t="day")=>{await Mu();const n=Lu(e);if(!n)return null;const r=n.revenue,i=n.ordersToday;switch(t){case"day":return{period:"Hôm nay",revenue:se(r,8),orders:se(i,12),avgOrderValue:se(Math.floor(r/i),5),deliveryTime:se(n.avgDeliveryTime,8)};case"week":return{period:"Tuần này",revenue:se(r*7,5),orders:se(i*7,8),avgOrderValue:se(Math.floor(r/i),3),deliveryTime:se(n.avgDeliveryTime,5)};case"month":return{period:"Tháng này",revenue:se(r*30,3),orders:se(i*30,5),avgOrderValue:se(Math.floor(r/i),2),deliveryTime:se(n.avgDeliveryTime,3)};default:return{period:"Hôm nay",revenue:se(r,8),orders:se(i,12),avgOrderValue:se(Math.floor(r/i),5),deliveryTime:se(n.avgDeliveryTime,8)}}},mn={primary:"#E91E63",secondary:"#F06292",accent:"#F8BBD9",background:"#FCE4EC",light:"#FFF0F3"},xF=p.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FCE4EC 0%, #FFF0F3 100%);
  padding: 24px;
`,yF=p.div`
  max-width: 1400px;
  margin: 0 auto;
`,vF=p.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 6px solid ${mn.primary};
`,wF=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`,bF=p.div``,jF=p.h1`
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`,kF=p.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
`,SF=p.div`
  display: flex;
  gap: 12px;
`,CF=p.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }
`,TF=p.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e1e5e9;
  margin-bottom: 24px;
  background: white;
  padding: 0 24px;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`,$F=p.button`
  padding: 16px 24px;
  border: none;
  background: ${e=>e.$active?mn.primary:"transparent"};
  color: ${e=>e.$active?"white":"#6c757d"};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: ${e=>e.$active?mn.primary:"#f8f9fa"};
    color: ${e=>e.$active?"white":"#333"};
  }
  
  ${e=>e.$active&&`
    box-shadow: 0 -2px 8px rgba(233, 30, 99, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`,EF=p.span`
  margin-right: 8px;
`,PF=p(H.div)`
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`,AF=p.div`
  background: linear-gradient(135deg, ${mn.primary} 0%, ${mn.secondary} 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`,DF=p.div`
  font-size: 48px;
`,RF=p.div`
  flex: 1;
  
  h3 {
    margin: 0 0 4px 0;
    font-size: 20px;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }
`,MF=p.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: ${mn.primary};
`,LF=p.div`
  background: #fee;
  color: #c33;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border-left: 4px solid #c33;
`,IF=()=>{const e=Ke(),[t,n]=y.useState("overview"),[r,i]=y.useState(!0),[o,a]=y.useState(null),[l,c]=y.useState(null),[u,d]=y.useState([]),[h,f]=y.useState([]),[g,m]=y.useState(null);if(!e)return console.error("SweetDreamsDashboard: useAuth() returned null. Make sure the component is wrapped in AuthProvider."),s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["⚠️ Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#E91E63",textDecoration:"none",padding:"10px 20px",border:"2px solid #E91E63",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});const{user:b,loading:j,logout:x}=e,{orders:v}=Lr(),w=localStorage.getItem("token"),S=localStorage.getItem("role");if(j)return s.jsx("div",{style:{textAlign:"center",padding:"30px"},children:"Đang tải dữ liệu người dùng..."});if(!b||!w||!S)return s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#E91E63",textDecoration:"none",padding:"10px 20px",border:"2px solid #E91E63",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});if(b.role!==S)return console.error("Role mismatch in SweetDreamsDashboard"),localStorage.clear(),s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px"},children:["Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#E91E63",textDecoration:"none"},children:"Đăng nhập lại"})})]});if(b.role!=="restaurant"&&b.role!=="admin")return s.jsx("div",{style:{textAlign:"center",padding:"30px",color:"#d00"},children:"Bạn không có quyền truy cập trang này. Chỉ tài khoản nhà hàng mới có thể truy cập."});y.useEffect(()=>{(async()=>{try{i(!0),a(null),console.log("🍰 [SweetDreamsDashboard] Loading restaurant data...");const[A,M,Y,X]=await Promise.all([Pk("sweetdreams"),Ak("sweetdreams"),Dk("sweetdreams"),Rk("sweetdreams","day")]);c(A),d(M),f(Y),m(X),console.log("🍰 [SweetDreamsDashboard] Data loaded successfully:",{overview:A,orders:M.length,drones:Y.length})}catch(A){console.error("🍰 [SweetDreamsDashboard] Error loading data:",A),a("Không thể tải dữ liệu nhà hàng. Vui lòng thử lại."),U.error("Lỗi tải dữ liệu!")}finally{i(!1)}})()},[]);const k=l?{totalCustomers:new Set(v.map(P=>P.phone)).size,totalOrders:l.ordersToday,activeDrones:l.activeDrones,completedDeliveries:u.filter(P=>P.status==="Hoàn thành").length}:{totalCustomers:0,totalOrders:0,activeDrones:0,completedDeliveries:0},T=()=>{x(),U.success("👋 Đã đăng xuất"),window.location.href="/login"},C=[{id:"overview",icon:"📊",label:"Tổng quan"},{id:"menu",icon:"🍽️",label:"Quản lý món ăn"},{id:"drones",icon:"🚁",label:"Mô phỏng Drone"}],E=()=>{if(r)return s.jsx(MF,{children:"🍰 Đang tải dữ liệu SweetDreams Bakery..."});if(o)return s.jsxs(LF,{children:["❌ ",o]});switch(t){case"overview":return s.jsxs("div",{style:{padding:"24px"},children:[l&&s.jsx(ag,{stats:k,theme:mn}),s.jsxs(AF,{children:[s.jsx(DF,{children:"🧁"}),s.jsxs(RF,{children:[s.jsxs("h3",{children:["Chào mừng ",b==null?void 0:b.name,"!"]}),s.jsx("p",{children:"Quản lý SweetDreams Bakery của bạn một cách dễ dàng với FoodFast Drone Delivery"})]})]}),l&&s.jsx(cg,{theme:mn,restaurant:"SweetDreams"})]});case"menu":return s.jsx(Ek,{restaurantId:(b==null?void 0:b.restaurantId)||"sweetdreams",theme:mn});case"drones":return s.jsx("div",{style:{padding:"24px"},children:s.jsx(lg,{theme:mn})});default:return null}};return s.jsx(xF,{children:s.jsxs(yF,{children:[s.jsx(vF,{children:s.jsxs(wF,{children:[s.jsxs(bF,{children:[s.jsxs(jF,{children:[s.jsx("span",{children:"🧁"})," SweetDreams Bakery bảng điều khiển"]}),s.jsxs(kF,{children:["Chào mừng trở lại, ",s.jsx("strong",{children:b==null?void 0:b.name}),"! Quản lý SweetDreams Bakery của bạn tại đây."]})]}),s.jsx(SF,{children:s.jsx(CF,{onClick:T,children:"🚪 Đăng xuất"})})]})}),s.jsx(TF,{children:C.map(P=>s.jsxs($F,{$active:t===P.id,onClick:()=>n(P.id),children:[s.jsx(EF,{children:P.icon}),P.label]},P.id))}),s.jsx(Qe,{mode:"wait",children:s.jsx(PF,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:E()},t)})]})})},OF=p.div`
  min-height: 100vh;
  background: ${e=>e.$light};
  padding: 24px;
`,FF=p.div`
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${e=>e.$accent};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,NF=p.div``,_F=p.h1`
  color: ${e=>e.$primary};
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`,zF=p.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`,BF=p.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,VF=p.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }
`,HF=p.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,UF=p.button`
  padding: 12px 24px;
  background: ${e=>e.$active?e.$primary:"transparent"};
  color: ${e=>e.$active?"white":"#666"};
  border: 2px solid ${e=>e.$active?e.$primary:"#e1e5e9"};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`,WF=({theme:e,restaurantName:t,children:n})=>{const{user:r,logout:i}=Ke(),o=wt(),[a,l]=y.useState("orders"),c=()=>{i(),o("/login")};return s.jsxs(OF,{$light:e.light,children:[s.jsxs(FF,{$accent:e.accent,children:[s.jsxs(NF,{children:[s.jsxs(_F,{$primary:e.primary,children:[t," bảng điều khiển"]}),s.jsxs(zF,{children:["Chào mừng trở lại !  ",r==null?void 0:r.name,"!"]})]}),s.jsx(BF,{children:s.jsx(VF,{onClick:c,children:"🚪 Đăng xuất"})})]}),s.jsx(HF,{children:s.jsx(UF,{$active:a==="orders",$primary:e.primary,onClick:()=>l("orders"),children:"📦 Theo dõi đơn hàng"})}),n(a)]})},Xy={primary:"#ffcc70",secondary:"#ff9671",accent:"#ffc75f",background:"#FFF8F0",light:"#FFFEF8"},KF="restaurant_2",YF="🌺 Aloha Kitchen",GF=()=>{const{user:e}=Ke();return y.useEffect(()=>(console.log("🌺 [AlohaKitchenDashboard] Component mounted!"),console.log("👤 [AlohaKitchenDashboard] Current user:",e),()=>{console.log("🌺 [AlohaKitchenDashboard] Component unmounting")}),[e]),s.jsx(WF,{theme:Xy,restaurantName:YF,children:t=>s.jsx(s.Fragment,{children:t==="orders"&&s.jsx($k,{restaurantId:KF,theme:Xy})})})},gn={primary:"#ffcc70",secondary:"#ff9671",accent:"#ffc75f",background:"#FFF8F0",light:"#FFFEF8"},qF=p.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF8F0 0%, #FFFEF8 100%);
  padding: 24px;
`,QF=p.div`
  max-width: 1400px;
  margin: 0 auto;
`,XF=p.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 6px solid ${gn.primary};
`,ZF=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`,JF=p.div``,eN=p.h1`
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`,tN=p.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
`,nN=p.div`
  display: flex;
  gap: 12px;
`,rN=p.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }
`,iN=p.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e1e5e9;
  margin-bottom: 24px;
  background: white;
  padding: 0 24px;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`,oN=p.button`
  padding: 16px 24px;
  border: none;
  background: ${e=>e.$active?gn.primary:"transparent"};
  color: ${e=>e.$active?"white":"#6c757d"};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: ${e=>e.$active?gn.primary:"#f8f9fa"};
    color: ${e=>e.$active?"white":"#333"};
  }
  
  ${e=>e.$active&&`
    box-shadow: 0 -2px 8px rgba(255, 204, 112, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`,sN=p.span`
  margin-right: 8px;
`,aN=p(H.div)`
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`,lN=p.div`
  background: linear-gradient(135deg, ${gn.primary} 0%, ${gn.secondary} 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`,cN=p.div`
  font-size: 48px;
`,uN=p.div`
  flex: 1;
  
  h3 {
    margin: 0 0 4px 0;
    font-size: 20px;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }
`,dN=p.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: ${gn.primary};
`,hN=p.div`
  background: #fee;
  color: #c33;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border-left: 4px solid #c33;
`,pN=()=>{const e=Ke(),[t,n]=y.useState("overview"),[r,i]=y.useState(!0),[o,a]=y.useState(null),[l,c]=y.useState(null),[u,d]=y.useState([]),[h,f]=y.useState([]),[g,m]=y.useState(null);if(y.useEffect(()=>{(async()=>{try{i(!0),a(null),console.log("🌺 [AlohaDashboard] Loading restaurant data...");const[A,M,Y,X]=await Promise.all([Pk("aloha"),Ak("aloha"),Dk("aloha"),Rk("aloha","day")]);c(A),d(M),f(Y),m(X),console.log("🌺 [AlohaDashboard] Data loaded successfully:",{overview:A,orders:M.length,drones:Y.length})}catch(A){console.error("🌺 [AlohaDashboard] Error loading data:",A),a("Không thể tải dữ liệu nhà hàng. Vui lòng thử lại."),U.error("Lỗi tải dữ liệu!")}finally{i(!1)}})()},[]),!e)return console.error("AlohaDashboard: useAuth() returned null. Make sure the component is wrapped in AuthProvider."),s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["⚠️ Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#ffcc70",textDecoration:"none",padding:"10px 20px",border:"2px solid #ffcc70",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});const{user:b,loading:j,logout:x}=e,{orders:v}=Lr(),w=localStorage.getItem("token"),S=localStorage.getItem("role");if(j)return s.jsx("div",{style:{textAlign:"center",padding:"30px"},children:"Đang tải dữ liệu người dùng..."});if(!b||!w||!S)return s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#ffcc70",textDecoration:"none",padding:"10px 20px",border:"2px solid #ffcc70",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});if(b.role!==S)return console.error("Role mismatch in AlohaDashboard"),localStorage.clear(),s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px"},children:["Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#ffcc70",textDecoration:"none"},children:"Đăng nhập lại"})})]});if(b.role!=="restaurant"&&b.role!=="admin")return s.jsx("div",{style:{textAlign:"center",padding:"30px",color:"#d00"},children:"Bạn không có quyền truy cập trang này. Chỉ tài khoản nhà hàng mới có thể truy cập."});const k=l?{totalCustomers:new Set(v.map(P=>P.phone)).size,totalOrders:l.ordersToday,activeDrones:l.activeDrones,completedDeliveries:u.filter(P=>P.status==="Hoàn thành").length}:{totalCustomers:0,totalOrders:0,activeDrones:0,completedDeliveries:0},T=()=>{x(),U.success("👋 Đã đăng xuất"),window.location.href="/login"},C=[{id:"overview",icon:"📊",label:"Tổng quan"},{id:"menu",icon:"🍽️",label:"Quản lý món ăn"},{id:"drones",icon:"🚁",label:"Mô phỏng Drone"}],E=()=>{if(r)return s.jsx(dN,{children:"🌺 Đang tải dữ liệu Aloha Kitchen..."});if(o)return s.jsxs(hN,{children:["❌ ",o]});switch(t){case"overview":return s.jsxs("div",{style:{padding:"24px"},children:[l&&s.jsx(ag,{stats:k,theme:gn}),s.jsxs(lN,{children:[s.jsx(cN,{children:"🌺"}),s.jsxs(uN,{children:[s.jsxs("h3",{children:["Chào mừng ",b==null?void 0:b.name,"!"]}),s.jsx("p",{children:"Quản lý Aloha Kitchen của bạn một cách dễ dàng với FoodFast Drone Delivery"})]})]}),l&&s.jsx(cg,{theme:gn,restaurant:"Aloha"})]});case"menu":return s.jsx(Ek,{restaurantId:(b==null?void 0:b.restaurantId)||"aloha",theme:gn});case"drones":return s.jsx("div",{style:{padding:"24px"},children:s.jsx(lg,{theme:gn})});default:return null}};return s.jsx(qF,{children:s.jsxs(QF,{children:[s.jsx(XF,{children:s.jsxs(ZF,{children:[s.jsxs(JF,{children:[s.jsxs(eN,{children:[s.jsx("span",{children:"🌺"})," Aloha Kitchen bảng điều khiển"]}),s.jsxs(tN,{children:["Chào mừng trở lại, ",s.jsx("strong",{children:b==null?void 0:b.name}),"! Quản lý nhà hàng Aloha Kitchen của bạn tại đây."]})]}),s.jsx(nN,{children:s.jsx(rN,{onClick:T,children:"🚪 Đăng xuất"})})]})}),s.jsx(iN,{children:C.map(P=>s.jsxs(oN,{$active:t===P.id,onClick:()=>n(P.id),children:[s.jsx(sN,{children:P.icon}),P.label]},P.id))}),s.jsx(Qe,{mode:"wait",children:s.jsx(aN,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:E()},t)})]})})},Zy=p.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background: #f8f9fa;
  min-height: 100vh;
`,fN=p.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`,mN=p.h1`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`,gN=p.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`,xN=p.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`,ds=p.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${e=>e.$active?"#007bff":"transparent"};
  color: ${e=>e.$active?"white":"#666"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${e=>e.$active?"#0056b3":"#f8f9fa"};
  }
`,gl=p.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  overflow: hidden;
`,xl=p.div`
  padding: 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,yl=p.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`,yN=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 24px;
`,vl=p(H.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  text-align: center;
`,wl=p.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
`,bl=p.div`
  font-size: 14px;
  opacity: 0.9;
`,Yd=p.table`
  width: 100%;
  border-collapse: collapse;
`,Gd=p.thead`
  background: #f8f9fa;
`,Ee=p.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
`,qd=p.tbody``,Qd=p.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`,Pe=p.td`
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
  color: #333;
`,Xd=p.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${e=>{switch(e.status){case"active":return"background: #d4edda; color: #155724; border: 1px solid #a3e4a3;";case"suspended":return"background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;";case"admin":return"background: #cce5ff; color: #004085; border: 1px solid #99d6ff;";case"restaurant":return"background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;";case"customer":return"background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;";default:return"background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"}}}
`,jl=p.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s ease;
  
  ${e=>{switch(e.variant){case"suspend":return"background: #dc3545; color: white;";case"activate":return"background: #28a745; color: white;";case"delete":return"background: #6c757d; color: white;";default:return"background: #007bff; color: white;"}}}
  
  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`,vN=p.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`,wN=p.div`
  font-size: 48px;
  margin-bottom: 16px;
`,bN=p.h3`
  margin: 0 0 8px 0;
  color: #333;
`,jN=p.p`
  margin: 0;
  color: #666;
`,kN=()=>{const{user:e}=Ke(),{orders:t}=Lr(),[n,r]=y.useState("overview");if(!e||e.role!=="admin")return s.jsx(Zy,{children:s.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[s.jsx("h2",{children:"🚫 Truy cập bị từ chối"}),s.jsx("p",{children:"Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản admin."})]})});const i=Hl.length,o=z0.length,a=t.length,l=t.reduce((j,x)=>j+x.total,0),c=(j,x)=>{U.success(`✅ Đã ${x} người dùng thành công`)},u=(j,x)=>{U.success(`✅ Đã ${x} nhà hàng thành công`)},d=()=>s.jsx(s.Fragment,{children:s.jsxs(yN,{children:[s.jsxs(vl,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[s.jsx(wl,{children:i}),s.jsx(bl,{children:"Tổng số người dùng"})]}),s.jsxs(vl,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[s.jsx(wl,{children:o}),s.jsx(bl,{children:"Tổng số nhà hàng"})]}),s.jsxs(vl,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[s.jsx(wl,{children:a}),s.jsx(bl,{children:"Tổng số đơn hàng"})]}),s.jsxs(vl,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:[s.jsx(wl,{children:oe(l)}),s.jsx(bl,{children:"Tổng doanh thu"})]})]})}),h=()=>s.jsxs(gl,{children:[s.jsx(xl,{children:s.jsx(yl,{children:"Quản lý người dùng"})}),s.jsx("div",{style:{overflowX:"auto"},children:s.jsxs(Yd,{children:[s.jsx(Gd,{children:s.jsxs("tr",{children:[s.jsx(Ee,{children:"ID"}),s.jsx(Ee,{children:"Tên"}),s.jsx(Ee,{children:"Username"}),s.jsx(Ee,{children:"Vai trò"}),s.jsx(Ee,{children:"Email"}),s.jsx(Ee,{children:"Số điện thoại"}),s.jsx(Ee,{children:"Thao tác"})]})}),s.jsx(qd,{children:Hl.map(j=>s.jsxs(Qd,{children:[s.jsx(Pe,{children:j.id}),s.jsx(Pe,{children:j.name}),s.jsx(Pe,{children:j.username}),s.jsx(Pe,{children:s.jsx(Xd,{status:j.role,children:j.role==="admin"?"Quản trị viên":j.role==="restaurant"?"Nhà hàng":"Khách hàng"})}),s.jsx(Pe,{children:j.email||"-"}),s.jsx(Pe,{children:j.phone||"-"}),s.jsxs(Pe,{children:[s.jsx(jl,{variant:"suspend",onClick:()=>c(j.id,"tạm khóa"),children:"Tạm khóa"}),s.jsx(jl,{variant:"delete",onClick:()=>c(j.id,"xóa"),children:"Xóa"})]})]},j.id))})]})})]}),f=()=>s.jsxs(gl,{children:[s.jsx(xl,{children:s.jsx(yl,{children:"Quản lý nhà hàng"})}),s.jsx("div",{style:{overflowX:"auto"},children:s.jsxs(Yd,{children:[s.jsx(Gd,{children:s.jsxs("tr",{children:[s.jsx(Ee,{children:"ID"}),s.jsx(Ee,{children:"Tên nhà hàng"}),s.jsx(Ee,{children:"Mô tả"}),s.jsx(Ee,{children:"Chủ sở hữu"}),s.jsx(Ee,{children:"Trạng thái"}),s.jsx(Ee,{children:"Ngày tạo"}),s.jsx(Ee,{children:"Thao tác"})]})}),s.jsx(qd,{children:z0.map(j=>{var x;return s.jsxs(Qd,{children:[s.jsx(Pe,{children:j.id}),s.jsx(Pe,{children:j.name}),s.jsx(Pe,{children:j.description}),s.jsx(Pe,{children:(x=Hl.find(v=>v.id===j.ownerId))==null?void 0:x.name}),s.jsx(Pe,{children:s.jsx(Xd,{status:j.isActive?"active":"suspended",children:j.isActive?"Hoạt động":"Tạm khóa"})}),s.jsx(Pe,{children:qp(j.createdAt).format("DD/MM/YYYY")}),s.jsxs(Pe,{children:[s.jsx(jl,{variant:j.isActive?"suspend":"activate",onClick:()=>u(j.id,j.isActive?"tạm khóa":"kích hoạt"),children:j.isActive?"Tạm khóa":"Kích hoạt"}),s.jsx(jl,{variant:"delete",onClick:()=>u(j.id,"xóa"),children:"Xóa"})]})]},j.id)})})]})})]}),g=()=>s.jsxs(gl,{children:[s.jsx(xl,{children:s.jsx(yl,{children:"Quản lý đơn hàng"})}),s.jsx("div",{style:{overflowX:"auto"},children:s.jsxs(Yd,{children:[s.jsx(Gd,{children:s.jsxs("tr",{children:[s.jsx(Ee,{children:"Mã đơn hàng"}),s.jsx(Ee,{children:"Khách hàng"}),s.jsx(Ee,{children:"Số điện thoại"}),s.jsx(Ee,{children:"Tổng tiền"}),s.jsx(Ee,{children:"Trạng thái"}),s.jsx(Ee,{children:"Ngày đặt"})]})}),s.jsx(qd,{children:t.map(j=>s.jsxs(Qd,{children:[s.jsxs(Pe,{children:["#",j.id.slice(-6)]}),s.jsx(Pe,{children:j.name}),s.jsx(Pe,{children:j.phone}),s.jsx(Pe,{children:oe(j.total)}),s.jsx(Pe,{children:s.jsx(Xd,{status:j.status.toLowerCase(),children:j.status==="Processing"?"Đang chuẩn bị":j.status==="Delivering"?"Đang giao hàng":"Hoàn tất"})}),s.jsx(Pe,{children:qp(j.time).format("DD/MM/YYYY HH:mm")})]},j.id))})]})})]}),m=()=>s.jsxs(gl,{children:[s.jsx(xl,{children:s.jsx(yl,{children:"Báo cáo và thống kê"})}),s.jsx("div",{style:{padding:"24px"},children:s.jsxs(vN,{children:[s.jsx(wN,{children:"📊"}),s.jsx(bN,{children:"Báo cáo chi tiết"}),s.jsx(jN,{children:"Tính năng báo cáo chi tiết sẽ được phát triển trong phiên bản tiếp theo."})]})})]}),b=()=>{switch(n){case"overview":return d();case"users":return h();case"restaurants":return f();case"orders":return g();case"reports":return m();default:return d()}};return s.jsxs(Zy,{children:[s.jsxs(fN,{children:[s.jsx(mN,{children:"Bảng điều khiển quản trị"}),s.jsx(gN,{children:"Quản lý hệ thống FoodFast Drone Delivery"})]}),s.jsxs(xN,{children:[s.jsx(ds,{$active:n==="overview",onClick:()=>r("overview"),children:"📊 Tổng quan"}),s.jsx(ds,{$active:n==="users",onClick:()=>r("users"),children:"👥 Người dùng"}),s.jsx(ds,{$active:n==="restaurants",onClick:()=>r("restaurants"),children:"🏪 Nhà hàng"}),s.jsx(ds,{$active:n==="orders",onClick:()=>r("orders"),children:"📦 Đơn hàng"}),s.jsx(ds,{$active:n==="reports",onClick:()=>r("reports"),children:"📈 Báo cáo"})]}),b()]})},SN=p(H.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: var(--card);
  color: var(--text);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`,CN=()=>{const{theme:e,toggleTheme:t}=jR();return s.jsx(SN,{onClick:t,whileHover:{scale:1.1},whileTap:{scale:.95},animate:{rotate:e==="dark"?180:0},transition:{duration:.3},"aria-label":`Switch to ${e==="light"?"dark":"light"} mode`,children:e==="light"?"🌙":"☀️"})},TN=p.div`
  position: relative;
  transition: all 0.3s ease;
  
  ${e=>e.$viewMode==="mobile"&&`
    max-width: 375px;
    margin: 0 auto;
    border: 2px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    background: var(--card);
  `}
  
  ${e=>e.$viewMode==="desktop"&&`
    max-width: 100%;
    margin: 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
  `}
`,$N=p.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  background: var(--card);
  padding: 8px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`,Jy=p(H.button)`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${e=>e.$active?"var(--primary)":"transparent"};
  color: ${e=>e.$active?"#fff":"var(--text)"};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${e=>e.$active?"var(--primary)":"var(--border)"};
  }
`,EN=p.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg);
`,PN=p.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
`,AN=({children:e})=>{const[t,n]=y.useState("desktop");return s.jsxs(s.Fragment,{children:[s.jsxs($N,{children:[s.jsx(Jy,{$active:t==="mobile",onClick:()=>n("mobile"),whileHover:{scale:1.05},whileTap:{scale:.95},children:"📱 Mobile"}),s.jsx(Jy,{$active:t==="desktop",onClick:()=>n("desktop"),whileHover:{scale:1.05},whileTap:{scale:.95},children:"💻 Desktop"})]}),s.jsx(TN,{$viewMode:t,children:t==="mobile"?s.jsx(EN,{children:e}):s.jsx(PN,{children:e})})]})};function Oi({children:e,requireRole:t,fallback:n,redirectTo:r="/login",showErrorMessage:i=!1}){const{user:o,loading:a}=Ke(),l=Rt(),c=localStorage.getItem("token"),u=localStorage.getItem("role");return a?n??s.jsx("div",{style:{padding:24,textAlign:"center"},children:"Đang tải thông tin đăng nhập…"}):!o||!c||!u?i||t&&(t==="restaurant"||Array.isArray(t)&&t.includes("restaurant"))?s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none",padding:"10px 20px",border:"2px solid #FF6600",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]}):s.jsx(vn,{to:r,replace:!0,state:{from:l}}):o.role!==u?(console.error("Role mismatch between user and localStorage"),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role"),s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px"},children:["Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none"},children:"Đăng nhập lại"})})]})):t&&!(Array.isArray(t)?t.includes(o.role):o.role===t)?s.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"#d00",fontSize:"16px"},children:["Bạn không có quyền truy cập trang này.",s.jsx("div",{style:{marginTop:"20px"},children:s.jsx("a",{href:"/",style:{color:"#FF6600",textDecoration:"none"},children:"Quay về trang chủ"})})]}):s.jsx(s.Fragment,{children:e})}const mt={NAME:{REQUIRED:"Vui lòng nhập họ và tên",MIN_LENGTH:`Họ và tên phải có ít nhất ${it.NAME.MIN_LENGTH} ký tự`,MAX_LENGTH:`Họ và tên không được vượt quá ${it.NAME.MAX_LENGTH} ký tự`,INVALID_FORMAT:"Họ và tên chỉ được chứa chữ cái và khoảng trắng"},EMAIL:{REQUIRED:"Vui lòng nhập địa chỉ email",INVALID_FORMAT:"Địa chỉ email không hợp lệ"},PHONE:{REQUIRED:"Vui lòng nhập số điện thoại",INVALID_FORMAT:"Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có 10-11 chữ số",MIN_LENGTH:`Số điện thoại phải có ít nhất ${it.PHONE.MIN_LENGTH} chữ số`,MAX_LENGTH:`Số điện thoại không được vượt quá ${it.PHONE.MAX_LENGTH} chữ số`},ADDRESS:{REQUIRED:"Vui lòng nhập địa chỉ giao hàng",MIN_LENGTH:`Địa chỉ phải có ít nhất ${it.ADDRESS.MIN_LENGTH} ký tự`,MAX_LENGTH:`Địa chỉ không được vượt quá ${it.ADDRESS.MAX_LENGTH} ký tự`},PAYMENT:{REQUIRED:"Vui lòng chọn phương thức thanh toán"}},DN=e=>!e||e.trim().length===0?mt.NAME.REQUIRED:e.length<it.NAME.MIN_LENGTH?mt.NAME.MIN_LENGTH:e.length>it.NAME.MAX_LENGTH?mt.NAME.MAX_LENGTH:it.NAME.PATTERN.test(e)?null:mt.NAME.INVALID_FORMAT,RN=e=>!e||e.trim().length===0?mt.EMAIL.REQUIRED:it.EMAIL.PATTERN.test(e)?null:mt.EMAIL.INVALID_FORMAT,MN=e=>!e||e.trim().length===0?mt.PHONE.REQUIRED:e.length<it.PHONE.MIN_LENGTH?mt.PHONE.MIN_LENGTH:e.length>it.PHONE.MAX_LENGTH?mt.PHONE.MAX_LENGTH:it.PHONE.PATTERN.test(e)?null:mt.PHONE.INVALID_FORMAT,LN=e=>!e||e.trim().length===0?mt.ADDRESS.REQUIRED:e.length<it.ADDRESS.MIN_LENGTH?mt.ADDRESS.MIN_LENGTH:e.length>it.ADDRESS.MAX_LENGTH?mt.ADDRESS.MAX_LENGTH:null,IN=e=>!e||e.trim().length===0?mt.PAYMENT.REQUIRED:null,ON=e=>{const t={};if(e.name!==void 0){const n=DN(e.name);n&&(t.name=n)}if(e.email!==void 0){const n=RN(e.email);n&&(t.email=n)}if(e.phone!==void 0){const n=MN(e.phone);n&&(t.phone=n)}if(e.address!==void 0){const n=LN(e.address);n&&(t.address=n)}if(e.paymentMethod!==void 0){const n=IN(e.paymentMethod);n&&(t.paymentMethod=n)}return{isValid:Object.keys(t).length===0,errors:t}},FN=e=>e.trim().replace(/\s+/g," "),NN=e=>{const t=e.replace(/\D/g,"");return t.startsWith("84")?`+${t}`:t.startsWith("0")?t:`0${t}`},_N=p.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`,zN=p(H.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`,BN=p.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`,VN=p.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`,ev=p.div`
  grid-column: 1 / -1;
`,Fi=p.div`
  display: flex;
  flex-direction: column;
`,Ni=p.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
  font-size: 14px;
`,Zd=p.input`
  padding: 12px 16px;
  border: 2px solid ${e=>e.hasError?"#dc3545":"var(--border)"};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.hasError?"#dc3545":"var(--primary)"};
    box-shadow: 0 0 0 3px ${e=>e.hasError?"rgba(220, 53, 69, 0.1)":"rgba(255, 102, 0, 0.1)"};
  }
`,HN=p.select`
  padding: 12px 16px;
  border: 2px solid ${e=>e.hasError?"#dc3545":"var(--border)"};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.hasError?"#dc3545":"var(--primary)"};
    box-shadow: 0 0 0 3px ${e=>e.hasError?"rgba(220, 53, 69, 0.1)":"rgba(255, 102, 0, 0.1)"};
  }
`,tv=p.textarea`
  padding: 12px 16px;
  border: 2px solid ${e=>e.hasError?"#dc3545":"var(--border)"};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.hasError?"#dc3545":"var(--primary)"};
    box-shadow: 0 0 0 3px ${e=>e.hasError?"rgba(220, 53, 69, 0.1)":"rgba(255, 102, 0, 0.1)"};
  }
`;p.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;p.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text);
  
  input[type="radio"] {
    accent-color: var(--primary);
  }
`;const _i=p(H.div)`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`,UN=p.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,nv=p(H.button)`
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${e=>e.variant==="primary"?`
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: white;
    box-shadow: var(--shadow);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  `:`
    background: var(--border);
    color: var(--text);
    border: 1px solid var(--border);
    
    &:hover {
      background: var(--text);
      color: var(--card);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,hs=p.span`
  color: #dc3545;
  margin-left: 2px;
`,WN=()=>{var d;const e=wt(),[t,n]=y.useState({name:"",email:"",phone:"",address:"",paymentMethod:"",notes:""}),[r,i]=y.useState({}),[o,a]=y.useState(!1),l=(h,f)=>{const g=FN(f);n(m=>({...m,[h]:g})),r[h]&&i(m=>({...m,[h]:""}))},c=async h=>{h.preventDefault();const f=ON(t);if(!f.isValid){i(f.errors),U.error("Vui lòng kiểm tra lại thông tin đã nhập.");return}a(!0);try{const g=NN(t.phone);localStorage.setItem("customer-info",JSON.stringify({...t,phone:g,timestamp:new Date().toISOString()})),await new Promise(m=>setTimeout(m,1e3)),U.success("✅ Thông tin khách hàng đã được lưu!"),e("/checkout")}catch{U.error("Có lỗi xảy ra. Vui lòng thử lại.")}finally{a(!1)}},u=()=>{e("/menu")};return s.jsx(_N,{children:s.jsxs(zN,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[s.jsx(BN,{children:"Thông tin khách hàng"}),s.jsxs("form",{onSubmit:c,children:[s.jsxs(VN,{children:[s.jsxs(Fi,{children:[s.jsxs(Ni,{children:["Họ và tên ",s.jsx(hs,{children:"*"})]}),s.jsx(Zd,{type:"text",value:t.name,onChange:h=>l("name",h.target.value),hasError:!!r.name,placeholder:"Nhập họ và tên đầy đủ"}),r.name&&s.jsx(_i,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.name})]}),s.jsxs(Fi,{children:[s.jsxs(Ni,{children:["Email ",s.jsx(hs,{children:"*"})]}),s.jsx(Zd,{type:"email",value:t.email,onChange:h=>l("email",h.target.value),hasError:!!r.email,placeholder:"example@email.com"}),r.email&&s.jsx(_i,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.email})]}),s.jsxs(Fi,{children:[s.jsxs(Ni,{children:["Số điện thoại ",s.jsx(hs,{children:"*"})]}),s.jsx(Zd,{type:"tel",value:t.phone,onChange:h=>l("phone",h.target.value),hasError:!!r.phone,placeholder:"0xxxxxxxxx hoặc +84xxxxxxxxx"}),r.phone&&s.jsx(_i,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.phone})]}),s.jsxs(Fi,{children:[s.jsxs(Ni,{children:["Phương thức thanh toán ",s.jsx(hs,{children:"*"})]}),s.jsxs(HN,{value:t.paymentMethod,onChange:h=>l("paymentMethod",h.target.value),hasError:!!r.paymentMethod,children:[s.jsx("option",{value:"",children:"Chọn phương thức thanh toán"}),s.jsx("option",{value:L0.VNPAY,children:"💳 VNPay"}),s.jsx("option",{value:L0.CASH,children:"💵 Thanh toán khi nhận hàng"})]}),r.paymentMethod&&s.jsx(_i,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.paymentMethod})]}),s.jsx(ev,{children:s.jsxs(Fi,{children:[s.jsxs(Ni,{children:["Địa chỉ giao hàng ",s.jsx(hs,{children:"*"})]}),s.jsx(tv,{value:t.address,onChange:h=>l("address",h.target.value),hasError:!!r.address,placeholder:"Số nhà, tên đường, phường/xã, quận/huyện, thành phố"}),r.address&&s.jsx(_i,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.address})]})}),s.jsx(ev,{children:s.jsxs(Fi,{children:[s.jsx(Ni,{children:"Ghi chú thêm (tùy chọn)"}),s.jsx(tv,{value:t.notes,onChange:h=>l("notes",h.target.value),hasError:!!r.notes,placeholder:"Ghi chú đặc biệt cho đơn hàng...",maxLength:200}),r.notes&&s.jsx(_i,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.notes}),s.jsxs("div",{style:{fontSize:"12px",color:"#6c757d",marginTop:"4px"},children:[((d=t.notes)==null?void 0:d.length)||0,"/200 ký tự"]})]})})]}),s.jsxs(UN,{children:[s.jsx(nv,{type:"button",variant:"secondary",onClick:u,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Hủy"}),s.jsx(nv,{type:"submit",variant:"primary",disabled:o,whileHover:{scale:1.02},whileTap:{scale:.98},children:o?"Đang xử lý...":"Tiếp tục"})]})]})]})})},KN=p.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,YN=p.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`,GN=p.div`
  margin-bottom: 30px;
  
  h1 {
    color: #007bff;
    font-size: 32px;
    font-weight: 800;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  
  p {
    color: #666;
    margin: 8px 0 0;
    font-size: 14px;
  }
`,qN=p.h2`
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
`,QN=p.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,rv=p.input`
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`,XN=p.button`
  padding: 15px 20px;
  background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 123, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,ZN=p.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
`,JN=p.div`
  margin-top: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
`,e_=p.h4`
  margin: 0 0 8px 0;
  color: #495057;
  font-size: 14px;
`,t_=p.div`
  color: #6c757d;
  font-size: 12px;
  line-height: 1.4;
  
  strong {
    color: #495057;
  }
`,n_=p.div`
  text-align: center;
  margin-top: 20px;
  
  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    
    &:hover {
      color: #0056b3;
    }
  }
`,Mk=()=>{const[e,t]=y.useState(""),[n,r]=y.useState(""),[i,o]=y.useState(""),[a,l]=y.useState(!1),{login:c}=Zo(),u=wt(),d=async h=>{h.preventDefault(),o(""),l(!0);const f=await c(e,n);f.ok?(U.success("🎉 Đăng nhập admin thành công!"),u("/admin/dashboard")):(o(f.message||"Đăng nhập thất bại"),U.error(f.message||"Đăng nhập thất bại")),l(!1)};return s.jsx(KN,{children:s.jsxs(YN,{children:[s.jsxs(GN,{children:[s.jsx("h1",{children:"🍽️ FoodFast"}),s.jsx("p",{children:"Hệ thống quản trị"})]}),s.jsx(qN,{children:"🔐 Đăng nhập quản trị"}),s.jsxs(QN,{onSubmit:d,children:[s.jsx(rv,{type:"text",placeholder:"Tên đăng nhập",value:e,onChange:h=>t(h.target.value),required:!0}),s.jsx(rv,{type:"password",placeholder:"Mật khẩu",value:n,onChange:h=>r(h.target.value),required:!0}),s.jsx(XN,{type:"submit",disabled:a,children:a?"Đang đăng nhập...":"Đăng nhập"}),i&&s.jsx(ZN,{children:i==="Invalid admin credentials"?"Thông tin đăng nhập không hợp lệ":i})]}),s.jsxs(JN,{children:[s.jsx(e_,{children:"🔐 Tài khoản Admin:"}),s.jsx(t_,{children:s.jsxs("div",{children:[s.jsx("strong",{children:"Admin:"})," admin / admin123"]})})]}),s.jsx(n_,{children:s.jsx("a",{href:"/",children:"← Quay về trang chủ"})})]})})},r_=p(H.div)`
  width: 280px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  padding: 30px 0;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 100;
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    position: relative;
    padding: 20px 0;
  }
`,i_=p.div`
  padding: 0 30px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
`,o_=p.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`,s_=p.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`,Jd=p.div`
  margin-bottom: 30px;
`,eh=p.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  opacity: 0.6;
  padding: 0 30px;
  margin-bottom: 15px;
`,ps=p(H.div)`
  padding: 15px 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  position: relative;
  background: ${e=>e.$active?"rgba(255, 255, 255, 0.15)":"transparent"};
  border-left: 3px solid ${e=>e.$active?"#ffffff":"transparent"};
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: white;
    opacity: ${e=>e.$active?1:0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`,fs=p.div`
  font-size: 20px;
  width: 24px;
  text-align: center;
`,ms=p.div`
  font-size: 15px;
  font-weight: 500;
  flex: 1;
`,iv=p.div`
  background: ${e=>e.$color||"rgba(255, 255, 255, 0.2)"};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
`,a_=p.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    position: relative;
    margin-top: 30px;
  }
`,l_=p.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`,c_=p.div`
  font-size: 12px;
  opacity: 0.7;
`,u_=({activeTab:e,onTabChange:t,adminName:n,stats:r})=>s.jsxs(r_,{initial:{x:-300},animate:{x:0},transition:{type:"spring",stiffness:100},children:[s.jsxs(i_,{children:[s.jsxs(o_,{children:[s.jsx("span",{children:"🚁"}),"FoodFast Admin"]}),s.jsx(s_,{children:"Trung tâm Quản trị"})]}),s.jsxs(Jd,{children:[s.jsx(eh,{children:"Bảng điều khiển"}),s.jsxs(ps,{$active:e==="overview",onClick:()=>t("overview"),whileHover:{x:5},whileTap:{scale:.98},children:[s.jsx(fs,{children:"📊"}),s.jsx(ms,{children:"Tổng quan"})]})]}),s.jsxs(Jd,{children:[s.jsx(eh,{children:"Quản lý"}),s.jsxs(ps,{$active:e==="restaurants",onClick:()=>t("restaurants"),whileHover:{x:5},whileTap:{scale:.98},children:[s.jsx(fs,{children:"🏪"}),s.jsx(ms,{children:"Nhà hàng"}),r!=null&&r.pendingRestaurants?s.jsx(iv,{$color:"#FF6B6B",children:r.pendingRestaurants}):null]}),s.jsxs(ps,{$active:e==="customers",onClick:()=>t("customers"),whileHover:{x:5},whileTap:{scale:.98},children:[s.jsx(fs,{children:"👥"}),s.jsx(ms,{children:"Khách hàng"})]}),s.jsxs(ps,{$active:e==="drones",onClick:()=>t("drones"),whileHover:{x:5},whileTap:{scale:.98},children:[s.jsx(fs,{children:"🚁"}),s.jsx(ms,{children:"Đội máy bay"}),r!=null&&r.maintenanceDrones?s.jsx(iv,{$color:"#FFA500",children:r.maintenanceDrones}):null]})]}),s.jsxs(Jd,{children:[s.jsx(eh,{children:"Hệ thống"}),s.jsxs(ps,{$active:e==="logs",onClick:()=>t("logs"),whileHover:{x:5},whileTap:{scale:.98},children:[s.jsx(fs,{children:"📋"}),s.jsx(ms,{children:"Nhật ký hệ thống"})]})]}),s.jsxs(a_,{children:[s.jsx(l_,{children:n}),s.jsx(c_,{children:"Quản trị viên hệ thống"})]})]}),ci=[{id:"sweetdreams",name:"SweetDreams Bakery",location:"Quận 1, TP.HCM",rating:4.8,revenue:1245e4,drones:3,owner:"Nguyễn Thị Lan",status:"active",cuisine:"Bakery & Desserts",ordersToday:23,avgDeliveryTime:18},{id:"aloha",name:"Aloha Kitchen",location:"Quận 3, TP.HCM",rating:4.6,revenue:845e4,drones:2,owner:"Trần Minh Đức",status:"active",cuisine:"Asian Fusion",ordersToday:18,avgDeliveryTime:22},{id:"pizza_palace",name:"Pizza Palace",location:"Quận 7, TP.HCM",rating:4.4,revenue:156e5,drones:4,owner:"Lê Văn Hùng",status:"active",cuisine:"Italian",ordersToday:31,avgDeliveryTime:25},{id:"sushi_master",name:"Sushi Master",location:"Quận 2, TP.HCM",rating:4.9,revenue:189e5,drones:5,owner:"Yamamoto Hiroshi",status:"active",cuisine:"Japanese",ordersToday:28,avgDeliveryTime:20}],d_=[{id:"log_001",timestamp:"2024-01-15 14:30:25",level:"info",message:"Drone DRONE-SD-001 completed delivery to Quận 1",source:"DroneController",details:{orderId:"ORD-SD-69628",deliveryTime:"18 phút"}},{id:"log_002",timestamp:"2024-01-15 14:25:10",level:"warning",message:"Drone DRONE-AK-002 battery low (45%)",source:"BatteryMonitor",details:{droneId:"DRONE-AK-002",battery:45}},{id:"log_003",timestamp:"2024-01-15 14:20:15",level:"success",message:"New order received from SweetDreams Bakery",source:"OrderProcessor",details:{orderId:"ORD-SD-71245",amount:32e4}},{id:"log_004",timestamp:"2024-01-15 14:15:30",level:"error",message:"Connection timeout to drone DRONE-SD-003",source:"DroneController",details:{droneId:"DRONE-SD-003",timeout:30}},{id:"log_005",timestamp:"2024-01-15 14:10:45",level:"info",message:"System maintenance completed successfully",source:"SystemMaintenance",details:{duration:"2 giờ 15 phút",components:["Database","API Gateway"]}}],Jo=[{id:"DRONE-SD-001",status:"active",battery:78,location:"Quận 1, TP.HCM",restaurantId:"sweetdreams",lastUpdate:"2024-01-15 14:30:00"},{id:"DRONE-SD-002",status:"active",battery:95,location:"SweetDreams Bakery",restaurantId:"sweetdreams",lastUpdate:"2024-01-15 14:25:00"},{id:"DRONE-SD-003",status:"maintenance",battery:65,location:"Service Center",restaurantId:"sweetdreams",lastUpdate:"2024-01-15 13:45:00"},{id:"DRONE-AK-001",status:"active",battery:85,location:"Quận 3, TP.HCM",restaurantId:"aloha",lastUpdate:"2024-01-15 14:28:00"},{id:"DRONE-AK-002",status:"active",battery:45,location:"Quận 7, TP.HCM",restaurantId:"aloha",lastUpdate:"2024-01-15 14:20:00"}],Iu=[{id:"customer_001",name:"Phạm Thị Mai",email:"mai.pham@email.com",phone:"0901234567",totalOrders:15,totalSpent:245e4,lastOrderDate:"2024-01-15",status:"active"},{id:"customer_002",name:"Nguyễn Văn Nam",email:"nam.nguyen@email.com",phone:"0902345678",totalOrders:8,totalSpent:12e5,lastOrderDate:"2024-01-14",status:"active"},{id:"customer_003",name:"Trần Thị Hoa",email:"hoa.tran@email.com",phone:"0903456789",totalOrders:22,totalSpent:38e5,lastOrderDate:"2024-01-15",status:"active"},{id:"customer_004",name:"Lê Văn Minh",email:"minh.le@email.com",phone:"0904567890",totalOrders:5,totalSpent:85e4,lastOrderDate:"2024-01-10",status:"inactive"},{id:"customer_005",name:"Hoàng Thị Linh",email:"linh.hoang@email.com",phone:"0905678901",totalOrders:12,totalSpent:21e5,lastOrderDate:"2024-01-13",status:"active"}],Kt=(e=800,t=1500)=>{const n=Math.random()*(t-e)+e;return new Promise(r=>setTimeout(r,n))},Bn=(e,t=5)=>{const n=(Math.random()-.5)*2*(t/100);return Math.round(e*(1+n))},Wc=async()=>(await Kt(),ci.map(e=>({...e,revenue:Bn(e.revenue,3),rating:Math.round((e.rating+(Math.random()-.5)*.2)*10)/10,ordersToday:Bn(e.ordersToday,10),avgDeliveryTime:Bn(e.avgDeliveryTime,8)}))),ov=async()=>(await Kt(),Iu.map(e=>({...e,totalSpent:Bn(e.totalSpent,5),totalOrders:Bn(e.totalOrders,8)}))),h_=async(e,t)=>{await Kt();const n=ci.find(r=>r.id===e);return n?(n.status=t,!0):!1},sv=async()=>(await Kt(),Jo.map(e=>({...e,battery:Math.max(0,Math.min(100,Bn(e.battery,5)))}))),th=async()=>(await Kt(),[...d_].reverse()),av=async()=>{await Kt();const e=ci.reduce((i,o)=>i+o.revenue,0),t=ci.reduce((i,o)=>i+o.ordersToday,0),n=ci.reduce((i,o)=>i+o.avgDeliveryTime,0)/ci.length,r=Jo.filter(i=>i.status==="active").length;return{totalRevenue:Bn(e,3),totalOrders:Bn(t,8),avgDeliveryTime:Math.round(n*10)/10,systemUptime:Bn(99.8,.5),activeDrones:r,totalCustomers:Iu.length}},p_=async e=>{await Kt();const t=Iu.find(n=>n.id===e);return t?(t.status="inactive",!0):!1},f_=async e=>{await Kt();const t=Iu.find(n=>n.id===e);return t?(t.status="active",!0):!1},m_=async(e,t)=>{await Kt();const n=Jo.find(r=>r.id===e);return n?(n.status="maintenance",console.log(`Drone ${e} flagged for maintenance: ${t}`),!0):!1},g_=async e=>{await Kt();const t=Jo.find(n=>n.id===e);return t?(t.status="active",console.log(`Drone ${e} flag cleared`),!0):!1},x_=async(e,t)=>{await Kt();const n=Jo.find(r=>r.id===e);return n?(n.restaurantId=t,console.log(`Drone ${e} reassigned to restaurant ${t}`),!0):!1},y_=async(e,t)=>{switch(await Kt(),console.log(`Emergency override: ${e} on ${t}`),e){case"stop_drone":const n=Jo.find(i=>i.id===t);if(n)return n.status="offline",!0;break;case"pause_restaurant":const r=ci.find(i=>i.id===t);if(r)return r.status="inactive",!0;break;case"system_reboot":return!0;default:return!1}return!1},lv=p.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,cv=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,uv=p.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,v_=p.input`
  padding: 12px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`,w_=p.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,kl=p.button`
  padding: 8px 16px;
  border: 2px solid ${e=>e.$active?"#667eea":"#e1e5e9"};
  background: ${e=>e.$active?"#667eea":"white"};
  color: ${e=>e.$active?"white":"#666"};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${e=>e.$active?"#5568d3":"#f8f9fa"};
  }
`,b_=p.div`
  overflow-x: auto;
`,j_=p.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`,k_=p.thead`
  background: #f8f9fa;
`,Wr=p.th`
  padding: 15px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e1e5e9;
`,S_=p.tbody``,C_=p(H.tr)`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`,Kr=p.td`
  padding: 18px 15px;
  font-size: 14px;
  color: #333;
`,T_=p.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`,$_=p.div`
  font-size: 12px;
  color: #666;
`,E_=p.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.$status){case"Active":return"#d4edda";case"Pending":return"#fff3cd";case"Inactive":return"#f8d7da";default:return"#e1e5e9"}}};
  color: ${e=>{switch(e.$status){case"Active":return"#155724";case"Pending":return"#856404";case"Inactive":return"#721c24";default:return"#666"}}};
`,P_=p.div`
  display: flex;
  align-items: center;
  gap: 5px;
`,nh=p.button`
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 5px;
  background: ${e=>{switch(e.$variant){case"approve":return"#28a745";case"suspend":return"#dc3545";case"edit":return"#007bff";default:return"#6c757d"}}};
  color: white;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,A_=p(H.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,D_=p(H.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`,R_=p.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`,M_=p.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
`,L_=p.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`,dv=p.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${e=>e.$primary?"#667eea":"#e1e5e9"};
  color: ${e=>e.$primary?"white":"#666"};
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`,hv=p.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,pv=({restaurants:e,onUpdate:t})=>{var g;const{admin:n}=Zo(),[r,i]=y.useState(""),[o,a]=y.useState("All"),[l,c]=y.useState(null);console.log("[RestaurantTable] Loaded data:",e);const u=Array.isArray(e)?e:[];if(console.log("[RestaurantTable] Safe restaurants:",u),!Array.isArray(e))return console.warn("Expected restaurants to be an array, got:",typeof e),s.jsxs(lv,{children:[s.jsx(cv,{children:s.jsx(uv,{children:"Quản lý nhà hàng"})}),s.jsxs(hv,{children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"⚠️"}),s.jsx("div",{children:"Không có dữ liệu nhà hàng để hiển thị"})]})]});const d=u.filter(m=>{var x,v;if(!m||typeof m!="object")return!1;const b=(((x=m.name)==null?void 0:x.toLowerCase())||"").includes((r==null?void 0:r.toLowerCase())||"")||(((v=m.category)==null?void 0:v.toLowerCase())||"").includes((r==null?void 0:r.toLowerCase())||""),j=o==="All"||m.status===o;return b&&j}),h=(m,b)=>{c({restaurant:m,action:b})},f=()=>{if(!l||!n||!l.restaurant)return;h_(l.restaurant.id,l.action,n.id,n.name)&&(t(),c(null))};return s.jsxs(lv,{children:[s.jsxs(cv,{children:[s.jsx(uv,{children:"Quản lý nhà hàng"}),s.jsx(v_,{type:"text",placeholder:"Tìm kiếm nhà hàng...",value:r,onChange:m=>i(m.target.value)})]}),s.jsxs(w_,{children:[s.jsxs(kl,{$active:o==="All",onClick:()=>a("All"),children:["Tất cả (",u.length,")"]}),s.jsxs(kl,{$active:o==="Active",onClick:()=>a("Active"),children:["🟢 Hoạt động (",u.filter(m=>(m==null?void 0:m.status)==="Active").length,")"]}),s.jsxs(kl,{$active:o==="Pending",onClick:()=>a("Pending"),children:["🟠 Chờ duyệt (",u.filter(m=>(m==null?void 0:m.status)==="Pending").length,")"]}),s.jsxs(kl,{$active:o==="Inactive",onClick:()=>a("Inactive"),children:["🔴 Không hoạt động (",u.filter(m=>(m==null?void 0:m.status)==="Inactive").length,")"]})]}),s.jsx(b_,{children:s.jsxs(j_,{children:[s.jsx(k_,{children:s.jsxs("tr",{children:[s.jsx(Wr,{children:"Nhà hàng"}),s.jsx(Wr,{children:"Trạng thái"}),s.jsx(Wr,{children:"Đơn hàng"}),s.jsx(Wr,{children:"Doanh thu"}),s.jsx(Wr,{children:"Đánh giá"}),s.jsx(Wr,{children:"Máy bay"}),s.jsx(Wr,{children:"Thao tác"})]})}),s.jsx(S_,{children:d.length===0?s.jsx("tr",{children:s.jsx("td",{colSpan:7,children:s.jsxs(hv,{children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"🏪"}),s.jsx("div",{children:"Không tìm thấy nhà hàng"})]})})}):d.map((m,b)=>{var j,x;return s.jsxs(C_,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:b*.05},children:[s.jsxs(Kr,{children:[s.jsx(T_,{children:(m==null?void 0:m.name)||"N/A"}),s.jsx($_,{children:(m==null?void 0:m.category)||"N/A"})]}),s.jsx(Kr,{children:s.jsx(E_,{$status:(m==null?void 0:m.status)||"Unknown",children:(m==null?void 0:m.status)||"Unknown"})}),s.jsx(Kr,{children:((j=m==null?void 0:m.totalOrders)==null?void 0:j.toLocaleString("vi-VN"))||"0"}),s.jsx(Kr,{children:oe((m==null?void 0:m.totalRevenue)||0)}),s.jsx(Kr,{children:s.jsxs(P_,{children:["⭐ ",((x=m==null?void 0:m.rating)==null?void 0:x.toFixed(1))||"0.0"]})}),s.jsxs(Kr,{children:[(m==null?void 0:m.droneCount)||0," chiếc"]}),s.jsxs(Kr,{children:[(m==null?void 0:m.status)==="Pending"&&s.jsx(nh,{$variant:"approve",onClick:()=>h(m,"Active"),children:"Phê duyệt"}),(m==null?void 0:m.status)==="Active"&&s.jsx(nh,{$variant:"suspend",onClick:()=>h(m,"Inactive"),children:"Tạm ngưng"}),(m==null?void 0:m.status)==="Inactive"&&s.jsx(nh,{$variant:"approve",onClick:()=>h(m,"Active"),children:"Kích hoạt"})]})]},m.id)})})]})}),s.jsx(Qe,{children:l&&s.jsx(A_,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>c(null),children:s.jsxs(D_,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:m=>m.stopPropagation(),children:[s.jsx(R_,{children:"Xác nhận hành động"}),s.jsxs(M_,{children:["Bạn có chắc chắn muốn thay đổi trạng thái của ",s.jsx("strong",{children:((g=l==null?void 0:l.restaurant)==null?void 0:g.name)||"N/A"})," sang"," ",s.jsx("strong",{children:(l==null?void 0:l.action)==="Active"?"Hoạt động":(l==null?void 0:l.action)==="Inactive"?"Không hoạt động":"Chờ duyệt"}),"?",(l==null?void 0:l.action)==="Inactive"&&s.jsx("span",{style:{display:"block",marginTop:"10px",color:"#dc3545"},children:"⚠️ Hành động này sẽ tạm thời vô hiệu hóa tất cả dịch vụ của nhà hàng này."})]}),s.jsxs(L_,{children:[s.jsx(dv,{onClick:()=>c(null),children:"Hủy"}),s.jsx(dv,{$primary:!0,onClick:f,children:"Xác nhận"})]})]})})})]})},I_=p.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,O_=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,F_=p.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,N_=p.input`
  padding: 12px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`,__=p.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`,rh=p.button`
  padding: 8px 16px;
  border: 2px solid ${e=>e.$active?"#667eea":"#e1e5e9"};
  background: ${e=>e.$active?"#667eea":"white"};
  color: ${e=>e.$active?"white":"#666"};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${e=>e.$active?"#5568d3":"#f8f9fa"};
  }
`,z_=p.div`
  overflow-x: auto;
`,B_=p.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`,V_=p.thead`
  background: #f8f9fa;
`,Yr=p.th`
  padding: 15px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e1e5e9;
`,H_=p.tbody``,U_=p(H.tr)`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`,Gr=p.td`
  padding: 18px 15px;
  font-size: 14px;
  color: #333;
`,W_=p.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`,K_=p.div`
  font-size: 12px;
  color: #666;
`,fv=p.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.$status==="Active"?"#d4edda":"#f8d7da"};
  color: ${e=>e.$status==="Active"?"#155724":"#721c24"};
`,ih=p.button`
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 5px;
  background: ${e=>{switch(e.$variant){case"suspend":return"#dc3545";case"activate":return"#28a745";case"view":return"#17a2b8";default:return"#6c757d"}}};
  color: white;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Y_=p(H.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,G_=p(H.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
  overflow-y: auto;
`,oh=p.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`,mv=p.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
`,sh=p.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`,gs=p.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${e=>e.$danger?"#dc3545":e.$primary?"#667eea":"#e1e5e9"};
  color: ${e=>e.$primary||e.$danger?"white":"#666"};
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`,q_=p.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,Xn=p.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`,Zn=p.span`
  color: #666;
  font-weight: 500;
`,Jn=p.span`
  color: #333;
  font-weight: 600;
`,Q_=({customers:e,onUpdate:t})=>{const{admin:n}=Zo(),[r,i]=y.useState(""),[o,a]=y.useState("All"),[l,c]=y.useState(null),[u,d]=y.useState(null),h=e.filter(x=>{const v=x.name.toLowerCase().includes(r.toLowerCase())||x.email.toLowerCase().includes(r.toLowerCase())||x.phone.includes(r),w=o==="All"||x.accountStatus===o;return v&&w}),f=(x,v)=>{d(x),c(v)},g=()=>{c(null),d(null)},m=()=>{if(!u||!n)return;p_(u.id,n.id,n.name)&&(t(),g())},b=()=>{if(!u||!n)return;f_(u.id,n.id,n.name)&&(t(),g())},j=x=>new Date(x).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return s.jsxs(I_,{children:[s.jsxs(O_,{children:[s.jsx(F_,{children:"Quản lý khách hàng"}),s.jsx(N_,{type:"text",placeholder:"Tìm kiếm khách hàng...",value:r,onChange:x=>i(x.target.value)})]}),s.jsxs(__,{children:[s.jsxs(rh,{$active:o==="All",onClick:()=>a("All"),children:["Tất cả (",e.length,")"]}),s.jsxs(rh,{$active:o==="Active",onClick:()=>a("Active"),children:["🟢 Hoạt động (",e.filter(x=>x.accountStatus==="Active").length,")"]}),s.jsxs(rh,{$active:o==="Suspended",onClick:()=>a("Suspended"),children:["🔴 Tạm ngưng (",e.filter(x=>x.accountStatus==="Suspended").length,")"]})]}),s.jsx(z_,{children:s.jsxs(B_,{children:[s.jsx(V_,{children:s.jsxs("tr",{children:[s.jsx(Yr,{children:"Khách hàng"}),s.jsx(Yr,{children:"Số điện thoại"}),s.jsx(Yr,{children:"Đơn hàng"}),s.jsx(Yr,{children:"Tổng chi tiêu"}),s.jsx(Yr,{children:"Trạng thái"}),s.jsx(Yr,{children:"Ngày tham gia"}),s.jsx(Yr,{children:"Thao tác"})]})}),s.jsx(H_,{children:h.length===0?s.jsx("tr",{children:s.jsx("td",{colSpan:7,children:s.jsxs(q_,{children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"👥"}),s.jsx("div",{children:"Không tìm thấy khách hàng"})]})})}):h.map((x,v)=>s.jsxs(U_,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:v*.05},children:[s.jsxs(Gr,{children:[s.jsx(W_,{children:x.name}),s.jsx(K_,{children:x.email})]}),s.jsx(Gr,{children:x.phone}),s.jsx(Gr,{children:x.totalOrders}),s.jsx(Gr,{children:oe(x.totalSpend)}),s.jsx(Gr,{children:s.jsx(fv,{$status:x.accountStatus,children:x.accountStatus})}),s.jsx(Gr,{children:j(x.createdAt)}),s.jsxs(Gr,{children:[s.jsx(ih,{$variant:"view",onClick:()=>f(x,"view"),children:"Xem"}),x.accountStatus==="Active"?s.jsx(ih,{$variant:"suspend",onClick:()=>f(x,"suspend"),children:"Tạm ngưng"}):s.jsx(ih,{$variant:"activate",onClick:()=>f(x,"activate"),children:"Kích hoạt"})]})]},x.id))})]})}),s.jsx(Qe,{children:l&&u&&s.jsx(Y_,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:g,children:s.jsxs(G_,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:x=>x.stopPropagation(),children:[l==="view"&&s.jsxs(s.Fragment,{children:[s.jsx(oh,{children:"Chi tiết khách hàng"}),s.jsxs("div",{style:{marginBottom:"25px"},children:[s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Tên:"}),s.jsx(Jn,{children:u.name})]}),s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Email:"}),s.jsx(Jn,{children:u.email})]}),s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Số điện thoại:"}),s.jsx(Jn,{children:u.phone})]}),s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Tổng đơn hàng:"}),s.jsx(Jn,{children:u.totalOrders})]}),s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Tổng chi tiêu:"}),s.jsx(Jn,{children:oe(u.totalSpend)})]}),s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Trạng thái tài khoản:"}),s.jsx(Jn,{children:s.jsx(fv,{$status:u.accountStatus,children:u.accountStatus==="Active"?"Hoạt động":"Tạm ngưng"})})]}),s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Ngày tham gia:"}),s.jsx(Jn,{children:j(u.createdAt)})]}),u.lastOrderDate&&s.jsxs(Xn,{children:[s.jsx(Zn,{children:"Đơn hàng gần nhất:"}),s.jsx(Jn,{children:j(u.lastOrderDate)})]})]}),s.jsx(sh,{children:s.jsx(gs,{onClick:g,children:"Đóng"})})]}),l==="suspend"&&s.jsxs(s.Fragment,{children:[s.jsx(oh,{children:"Tạm ngưng tài khoản khách hàng"}),s.jsxs(mv,{children:["Bạn có chắc chắn muốn tạm ngưng tài khoản của ",s.jsx("strong",{children:u.name}),"?",s.jsx("span",{style:{display:"block",marginTop:"15px",color:"#dc3545",fontWeight:500},children:"⚠️ Hành động này sẽ:"}),s.jsxs("ul",{style:{marginTop:"10px",paddingLeft:"20px"},children:[s.jsx("li",{children:"Ngăn khách hàng đặt đơn hàng mới"}),s.jsx("li",{children:"Tạm thời vô hiệu hóa quyền truy cập tài khoản"}),s.jsx("li",{children:"Được ghi lại trong hệ thống"})]})]}),s.jsxs(sh,{children:[s.jsx(gs,{onClick:g,children:"Hủy"}),s.jsx(gs,{$danger:!0,onClick:m,children:"Xác nhận tạm ngưng"})]})]}),l==="activate"&&s.jsxs(s.Fragment,{children:[s.jsx(oh,{children:"Kích hoạt lại tài khoản khách hàng"}),s.jsxs(mv,{children:["Bạn có chắc chắn muốn kích hoạt lại tài khoản của ",s.jsx("strong",{children:u.name}),"?",s.jsx("span",{style:{display:"block",marginTop:"10px",color:"#28a745"},children:"✓ Hành động này sẽ khôi phục toàn bộ quyền truy cập tài khoản và khả năng đặt hàng."})]}),s.jsxs(sh,{children:[s.jsx(gs,{onClick:g,children:"Hủy"}),s.jsx(gs,{$primary:!0,onClick:b,children:"Xác nhận kích hoạt"})]})]})]})})})]})},X_=p.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,Z_=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,J_=p.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,ez=p.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,xs=p.button`
  padding: 8px 16px;
  border: 2px solid ${e=>e.$active?"#667eea":"#e1e5e9"};
  background: ${e=>e.$active?"#667eea":"white"};
  color: ${e=>e.$active?"white":"#666"};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${e=>e.$active?"#5568d3":"#f8f9fa"};
  }
`,tz=p.div`
  margin-bottom: 30px;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
`,nz=p.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,rz=p.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`,iz=p.div`
  font-size: 14px;
  opacity: 0.9;
`,oz=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 25px;
  background: #f8f9fa;
`,sz=p(H.div)`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid ${e=>e.$flagged?"#ff6b6b":"transparent"};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`,az=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`,lz=p.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,cz=p.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.$status){case"Idle":return"#d4edda";case"Delivering":return"#cce5ff";case"Charging":return"#fff3cd";case"Maintenance":return"#f8d7da";default:return"#e1e5e9"}}};
  color: ${e=>{switch(e.$status){case"Idle":return"#155724";case"Delivering":return"#004085";case"Charging":return"#856404";case"Maintenance":return"#721c24";default:return"#666"}}};
`,uz=p.div`
  margin-bottom: 12px;
`,ah=p.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
`,lh=p.span`
  color: #666;
`,ch=p.span`
  color: #333;
  font-weight: 500;
`,dz=p.div`
  width: 100%;
  height: 8px;
  background: #e1e5e9;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`,hz=p.div`
  height: 100%;
  width: ${e=>e.$level}%;
  background: ${e=>e.$level<20?"#dc3545":e.$level<50?"#ffc107":"#28a745"};
  transition: all 0.3s ease;
`,pz=p.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
`,uh=p.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${e=>e.$variant==="clear"?"#28a745":"#ff6b6b"};
  color: white;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,fz=p.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
`,mz=p.div`
  background: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 10px;
  border-left: 3px solid #ffc107;
`,gz=p(H.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,xz=p(H.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`,dh=p.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`,hh=p.p`
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
`,yz=p.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`,ph=p.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`,zi=p.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${e=>e.$primary?"#667eea":"#e1e5e9"};
  color: ${e=>e.$primary?"white":"#666"};
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`,vz=p.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
`,wz=({drones:e,onUpdate:t})=>{const{admin:n}=Zo(),[r,i]=y.useState("All"),[o,a]=y.useState(null),[l,c]=y.useState(""),[u,d]=y.useState(""),[h,f]=y.useState(Wc()),g=e.reduce((C,E)=>(C[E.restaurantId]||(C[E.restaurantId]={restaurantName:E.restaurantName,drones:[]}),C[E.restaurantId].drones.push(E),C),{}),m=C=>C.filter(E=>r==="All"||E.status===r),b=(C,E)=>{a({drone:C,action:E}),c(C.issueDescription||""),d(""),f(Wc())},j=()=>{a(null),c(""),d("")},x=()=>{if(!o||!n||!l.trim())return;m_(o.drone.id,l.trim(),n.id,n.name)&&(t(),j())},v=()=>{if(!o||!n)return;g_(o.drone.id,n.id,n.name)&&(t(),j())},w=()=>{if(!o||!n||!u)return;const C=h.find(P=>P.id===u);if(!C)return;x_(o.drone.id,u,C.name,n.id,n.name)&&(t(),j())},S=C=>{const E=Math.floor((Date.now()-C)/864e5);return E===0?"Today":E===1?"Yesterday":`${E} days ago`},k=e.length,T={Idle:e.filter(C=>C.status==="Idle").length,Delivering:e.filter(C=>C.status==="Delivering").length,Charging:e.filter(C=>C.status==="Charging").length,Maintenance:e.filter(C=>C.status==="Maintenance").length};return s.jsxs(X_,{children:[s.jsx(Z_,{children:s.jsx(J_,{children:"Giám sát drone"})}),s.jsxs(ez,{children:[s.jsxs(xs,{$active:r==="All",onClick:()=>i("All"),children:["Tất cả (",k,")"]}),s.jsxs(xs,{$active:r==="Idle",onClick:()=>i("Idle"),children:["🟢 Rảnh rỗi (",T.Idle,")"]}),s.jsxs(xs,{$active:r==="Delivering",onClick:()=>i("Delivering"),children:["🔵 Đang giao hàng (",T.Delivering,")"]}),s.jsxs(xs,{$active:r==="Charging",onClick:()=>i("Charging"),children:["🟡 Đang sạc (",T.Charging,")"]}),s.jsxs(xs,{$active:r==="Maintenance",onClick:()=>i("Maintenance"),children:["🔴 Bảo trì (",T.Maintenance,")"]})]}),s.jsxs("div",{style:{marginTop:"30px"},children:[Object.entries(g).map(([C,{restaurantName:E,drones:P}])=>{const A=m(P);return A.length===0?null:s.jsxs(tz,{children:[s.jsxs(nz,{children:[s.jsxs(rz,{children:["🏪 ",E]}),s.jsxs(iz,{children:[A.length," / ",P.length," máy bay"]})]}),s.jsx(oz,{children:A.map((M,Y)=>s.jsxs(sz,{$flagged:M.flaggedForIssue,initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:Y*.05},children:[M.flaggedForIssue&&s.jsx(fz,{children:"🚩"}),s.jsxs(az,{children:[s.jsx(lz,{children:M.id}),s.jsx(cz,{$status:M.status,children:M.status==="Idle"?"Rảnh rỗi":M.status==="Delivering"?"Đang giao hàng":M.status==="Charging"?"Đang sạc":"Bảo trì"})]}),s.jsxs(uz,{children:[s.jsxs(ah,{children:[s.jsx(lh,{children:"Pin:"}),s.jsxs(ch,{children:[Math.round(M.battery),"%"]})]}),s.jsx(dz,{children:s.jsx(hz,{$level:M.battery})}),M.currentOrderId&&s.jsxs(ah,{style:{marginTop:"12px"},children:[s.jsx(lh,{children:"Đơn hàng hiện tại:"}),s.jsx(ch,{children:M.currentOrderId})]}),s.jsxs(ah,{children:[s.jsx(lh,{children:"Bảo trì gần nhất:"}),s.jsx(ch,{children:S(M.lastMaintenance)})]})]}),M.flaggedForIssue&&M.issueDescription&&s.jsxs(mz,{children:[s.jsx("strong",{children:"⚠️ Issue:"})," ",M.issueDescription]}),s.jsx(pz,{children:M.flaggedForIssue?s.jsx(uh,{$variant:"clear",onClick:()=>b(M,"clear"),children:"✓ Xóa cờ"}):s.jsxs(s.Fragment,{children:[s.jsx(uh,{$variant:"flag",onClick:()=>b(M,"flag"),style:{flex:1},children:"🚩 Báo sự cố"}),M.status==="Idle"&&s.jsx(uh,{onClick:()=>b(M,"reassign"),style:{flex:1,background:"#007bff"},children:"🔄 Phân công lại"})]})})]},M.id))})]},C)}),Object.values(g).every(({drones:C})=>m(C).length===0)&&s.jsxs(vz,{children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"🚁"}),s.jsx("div",{children:"Không có máy bay nào phù hợp với bộ lọc"})]})]}),s.jsx(Qe,{children:o&&s.jsx(gz,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:j,children:s.jsx(xz,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:C=>C.stopPropagation(),children:o.action==="flag"?s.jsxs(s.Fragment,{children:[s.jsx(dh,{children:"Báo cáo sự cố máy bay"}),s.jsxs(hh,{children:["Đánh dấu ",s.jsx("strong",{children:o.drone.id}),' cần bảo trì hoặc theo dõi sự cố. Trạng thái máy bay sẽ được đặt sang "Bảo trì" và hành động sẽ được ghi lại.']}),s.jsx(yz,{placeholder:"Mô tả sự cố (VD: Pin suy giảm, Hỏng hóc cơ khí, v.v.)",value:l,onChange:C=>c(C.target.value)}),s.jsxs(ph,{children:[s.jsx(zi,{onClick:j,children:"Hủy"}),s.jsx(zi,{$primary:!0,onClick:x,disabled:!l.trim(),children:"Báo cáo sự cố"})]})]}):o.action==="reassign"?s.jsxs(s.Fragment,{children:[s.jsx(dh,{children:"Phân công lại máy bay"}),s.jsxs(hh,{children:["Phân công lại ",s.jsx("strong",{children:o.drone.id})," từ"," ",s.jsx("strong",{children:o.drone.restaurantName})," sang nhà hàng đã xác minh khác.",s.jsx("span",{style:{display:"block",marginTop:"10px",color:"#007bff"},children:"ℹ️ Chỉ nhà hàng đang hoạt động mới có thể nhận phân công máy bay."})]}),s.jsxs("div",{style:{marginBottom:"20px"},children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Chọn nhà hàng đích"}),s.jsxs("select",{value:u,onChange:C=>d(C.target.value),style:{width:"100%",padding:"12px",border:"2px solid #e1e5e9",borderRadius:"8px",fontSize:"14px",background:"white"},children:[s.jsx("option",{value:"",children:"-- Chọn nhà hàng --"}),h.filter(C=>C.status==="Active"&&C.id!==o.drone.restaurantId).map(C=>s.jsxs("option",{value:C.id,children:[C.name," (",C.category,") - ",C.droneCount," máy bay"]},C.id))]})]}),s.jsxs(ph,{children:[s.jsx(zi,{onClick:j,children:"Hủy"}),s.jsx(zi,{$primary:!0,onClick:w,disabled:!u,children:"Xác nhận phân công lại"})]})]}):s.jsxs(s.Fragment,{children:[s.jsx(dh,{children:"Xóa cờ máy bay"}),s.jsxs(hh,{children:["Bạn có chắc chắn muốn xóa cờ bảo trì của ",s.jsx("strong",{children:o.drone.id}),"?",s.jsx("span",{style:{display:"block",marginTop:"10px",color:"#28a745"},children:'✓ Trạng thái máy bay sẽ được đặt lại về "Rảnh rỗi" và đánh dấu đang hoạt động.'})]}),s.jsxs(ph,{children:[s.jsx(zi,{onClick:j,children:"Hủy"}),s.jsx(zi,{$primary:!0,onClick:v,children:"Xóa cờ"})]})]})})})})]})},gv=p.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,xv=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,yv=p.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,vv=p.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`,En=p.button`
  padding: 8px 16px;
  border: 2px solid ${e=>e.$active?"#667eea":"#e1e5e9"};
  background: ${e=>e.$active?"#667eea":"white"};
  color: ${e=>e.$active?"white":"#666"};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${e=>e.$active?"#5568d3":"#f8f9fa"};
  }
`,bz=p.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`,jz=p(H.div)`
  background: white;
  border-left: 4px solid ${e=>{switch(e.$severity){case"critical":return"#dc3545";case"warning":return"#ffc107";case"info":return"#17a2b8";default:return"#6c757d"}}};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(5px);
  }
`,kz=p.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 15px;
`,Sz=p.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`,Cz=p.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: ${e=>{switch(e.$severity){case"critical":return"#fee";case"warning":return"#fff9e6";case"info":return"#e7f5ff";default:return"#f8f9fa"}}};
  color: ${e=>{switch(e.$severity){case"critical":return"#dc3545";case"warning":return"#ffc107";case"info":return"#17a2b8";default:return"#6c757d"}}};
`,Tz=p.div`
  flex: 1;
`,$z=p.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`,Ez=p.div`
  font-size: 13px;
  color: #666;
`,Pz=p.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
`,Az=p.div`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
`,Dz=p.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
  flex-wrap: wrap;
`,fh=p.div`
  font-size: 12px;
  color: #999;
  
  strong {
    color: #666;
    font-weight: 500;
  }
`,Rz=p.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.$severity){case"critical":return"#dc3545";case"warning":return"#ffc107";case"info":return"#17a2b8";default:return"#6c757d"}}};
  color: white;
`,Mz=p.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,Lz=e=>({restaurant_approved:"✅",restaurant_suspended:"🔴",restaurant_activated:"🟢",customer_suspended:"⛔",customer_activated:"✅",drone_flagged:"🚩",drone_cleared:"✓",emergency_override:"⚠️",order_status_changed:"📦"})[e]||"📋",Iz=e=>({restaurant_approved:"Phê duyệt nhà hàng",restaurant_suspended:"Tạm ngưng nhà hàng",restaurant_activated:"Kích hoạt nhà hàng",customer_suspended:"Tạm ngưng khách hàng",customer_activated:"Kích hoạt khách hàng",drone_flagged:"Đánh dấu máy bay",drone_cleared:"Xóa cờ máy bay",emergency_override:"Can thiệp khẩn cấp",order_status_changed:"Thay đổi trạng thái đơn hàng",drone_reassigned:"Phân công lại máy bay"})[e]||"Hành động không xác định",Oz=e=>{const t=new Date(e),r=Date.now()-e,i=Math.floor(r/1e3),o=Math.floor(i/60),a=Math.floor(o/60),l=Math.floor(a/24);let c="";return i<60?c="Vừa xong":o<60?c=`${o} phút trước`:a<24?c=`${a} giờ trước`:l<7?c=`${l} ngày trước`:c=t.toLocaleDateString(),{date:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),time:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),relative:c}},Fz=e=>e?typeof e=="string"?e:typeof e=="object"&&e!==null?Object.entries(e).map(([t,n])=>t==="orderId"&&n?`Đơn hàng: ${n}`:t==="droneId"&&n?`Máy bay: ${n}`:t==="battery"&&n?`Pin: ${n}%`:t==="deliveryTime"&&n?`Thời gian giao: ${n}`:t==="amount"&&n?`Số tiền: ${n.toLocaleString("vi-VN")}₫`:t==="timeout"&&n?`Timeout: ${n}s`:t==="duration"&&n?`Thời gian: ${n}`:t==="components"&&Array.isArray(n)?`Thành phần: ${n.join(", ")}`:`${t}: ${n}`).join(" | "):String(e):"",Nz=({logs:e})=>{const[t,n]=y.useState("All"),[r,i]=y.useState("All"),o=Array.isArray(e)?e:[];console.log("[SystemLogs] Safe logs:",o);const a=o.filter(u=>{if(!u||typeof u!="object")return!1;const d=t==="All"||u.severity===t,h=r==="All"||u.targetType===r;return d&&h}),l={info:o.filter(u=>(u==null?void 0:u.severity)==="info").length,warning:o.filter(u=>(u==null?void 0:u.severity)==="warning").length,critical:o.filter(u=>(u==null?void 0:u.severity)==="critical").length},c={restaurant:o.filter(u=>(u==null?void 0:u.targetType)==="restaurant").length,customer:o.filter(u=>(u==null?void 0:u.targetType)==="customer").length,drone:o.filter(u=>(u==null?void 0:u.targetType)==="drone").length,order:o.filter(u=>(u==null?void 0:u.targetType)==="order").length};return Array.isArray(e)?s.jsxs(gv,{children:[s.jsx(xv,{children:s.jsx(yv,{children:"Nhật ký hoạt động hệ thống"})}),s.jsxs("div",{children:[s.jsx("div",{style:{fontSize:"13px",fontWeight:600,color:"#666",marginBottom:"10px"},children:"LỌC THEO MỨC ĐỘ"}),s.jsxs(vv,{children:[s.jsxs(En,{$active:t==="All",onClick:()=>n("All"),children:["Tất cả (",o.length,")"]}),s.jsxs(En,{$active:t==="info",onClick:()=>n("info"),children:["ℹ️ Thông tin (",l.info,")"]}),s.jsxs(En,{$active:t==="warning",onClick:()=>n("warning"),children:["⚠️ Cảnh báo (",l.warning,")"]}),s.jsxs(En,{$active:t==="critical",onClick:()=>n("critical"),children:["🔴 Nghiêm trọng (",l.critical,")"]})]})]}),s.jsxs("div",{style:{marginTop:"20px"},children:[s.jsx("div",{style:{fontSize:"13px",fontWeight:600,color:"#666",marginBottom:"10px"},children:"LỌC THEO LOẠI ĐỐI TƯỢNG"}),s.jsxs(vv,{children:[s.jsx(En,{$active:r==="All",onClick:()=>i("All"),children:"Tất cả"}),s.jsxs(En,{$active:r==="restaurant",onClick:()=>i("restaurant"),children:["🏪 Nhà hàng (",c.restaurant,")"]}),s.jsxs(En,{$active:r==="customer",onClick:()=>i("customer"),children:["👥 Khách hàng (",c.customer,")"]}),s.jsxs(En,{$active:r==="drone",onClick:()=>i("drone"),children:["🚁 Máy bay (",c.drone,")"]}),s.jsxs(En,{$active:r==="order",onClick:()=>i("order"),children:["📦 Đơn hàng (",c.order,")"]})]})]}),s.jsx(bz,{style:{marginTop:"30px"},children:a.length===0?s.jsxs(Mz,{children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"📋"}),s.jsx("div",{children:"Không có nhật ký nào phù hợp với bộ lọc"})]}):a.map((u,d)=>{const h=Oz(u.timestamp);return s.jsxs(jz,{$severity:u.severity,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:d*.05},children:[s.jsxs(kz,{children:[s.jsxs(Sz,{children:[s.jsx(Cz,{$severity:u.severity,children:Lz(u.action)}),s.jsxs(Tz,{children:[s.jsx($z,{children:Iz(u.action)}),s.jsxs(Ez,{children:[s.jsx("strong",{children:u.targetName})," by ",u.adminName]})]})]}),s.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"5px"},children:[s.jsx(Rz,{$severity:u.severity,children:u.severity}),s.jsx(Pz,{title:`${h.date} at ${h.time}`,children:h.relative})]})]}),s.jsx(Az,{children:Fz(u.details)}),s.jsxs(Dz,{children:[s.jsxs(fh,{children:[s.jsx("strong",{children:"Target:"})," ",u.targetType," (",u.targetId,")"]}),s.jsxs(fh,{children:[s.jsx("strong",{children:"Admin:"})," ",u.adminName," (",u.adminId,")"]}),s.jsxs(fh,{children:[s.jsx("strong",{children:"Time:"})," ",h.date," at ",h.time]})]})]},u.id)})})]}):(console.warn("[SystemLogs] Expected logs to be an array, got:",typeof e),s.jsxs(gv,{children:[s.jsx(xv,{children:s.jsx(yv,{children:"Nhật ký hoạt động hệ thống"})}),s.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",color:"#999"},children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"⚠️"}),s.jsx("div",{children:"Không có dữ liệu nhật ký để hiển thị"})]})]}))},_z=p.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
`,zz=p.div`
  flex: 1;
  margin-left: 280px;
  padding: 30px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`,Bz=p.div`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`,Vz=p.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,Hz=p.div`
  display: flex;
  gap: 10px;
`,mh=p.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${e=>e.$variant==="danger"?"#dc3545":e.$variant==="primary"?"#667eea":"#6c757d"};
  color: white;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`,Uz=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`,Bi=p(H.div)`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${e=>e.$color||"#667eea"};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`,Vi=p.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`,Hi=p.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${e=>e.$bgColor||"#f0f0f0"};
`,Ui=p.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`,Wi=p.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`,Ki=p.div`
  font-size: 12px;
  color: ${e=>e.$positive?"#28a745":"#dc3545"};
  margin-top: 8px;
  font-weight: 500;
`,ys=p.div`
  margin-top: 30px;
`,Wz=p.footer`
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 13px;
  margin-top: 40px;
  border-top: 1px solid #e1e5e9;
`,Kz=p(H.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`,Yz=p(H.div)`
  background: white;
  border-radius: 15px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`,Gz=p.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 10px;
`,qz=p.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
  font-size: 15px;
`,wv=p.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`,Qz=p.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`,Xz=p.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 25px;
`,bv=p.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${e=>e.$danger?"#dc3545":e.$primary?"#667eea":"#e1e5e9"};
  color: ${e=>e.$primary||e.$danger?"white":"#666"};
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Zz=p.div`
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 15px;
  margin: 15px 0;
  border-radius: 6px;
  
  strong {
    color: #856404;
    display: block;
    margin-bottom: 8px;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: #856404;
  }
`,Lk=()=>{var B;const{admin:e,logout:t}=Zo(),n=wt(),[r,i]=y.useState("overview"),[o,a]=y.useState(0),[l,c]=y.useState(!1),[u,d]=y.useState("order"),[h,f]=y.useState(""),[g,m]=y.useState(""),[b,j]=y.useState(""),[x,v]=y.useState([]),[w,S]=y.useState([]),[k,T]=y.useState([]),[C,E]=y.useState([]),[P,A]=y.useState({totalRestaurants:0,totalCustomers:0,totalOrders:0,totalRevenue:0,totalDrones:0,activeRestaurants:0,activeDrones:0,pendingRestaurants:0,maintenanceDrones:0}),M=Array.isArray(x)?x:[],Y=Array.isArray(w)?w:[],X=Array.isArray(k)?k:[],_=Array.isArray(C)?C:[];console.log("[AdminDashboard] Safe data:",{restaurants:M.length,customers:Y.length,drones:X.length,logs:_.length}),y.useEffect(()=>{(async()=>{try{console.log("[AdminDashboard] Loading data...");const G=await Wc(),ee=await ov(),pe=await sv(),ge=await th(),Re=await av();v(Array.isArray(G)?G:[]),S(Array.isArray(ee)?ee:[]),T(Array.isArray(pe)?pe:[]),E(Array.isArray(ge)?ge:[]),A(Re||{}),console.log("[AdminDashboard] Data loaded successfully")}catch(G){console.error("[AdminDashboard] Error loading data:",G),v([{id:"1",name:"Aloha Kitchen",status:"Active",category:"Asian Fusion",totalOrders:0,totalRevenue:0,rating:0,droneCount:0},{id:"2",name:"SweetDreams Bakery",status:"Active",category:"Bakery",totalOrders:0,totalRevenue:0,rating:0,droneCount:0}]),S([]),T([]),E([]),A({totalRestaurants:2,totalCustomers:0,totalOrders:0,totalRevenue:0,totalDrones:0,activeRestaurants:2,activeDrones:0,pendingRestaurants:0,maintenanceDrones:0})}})()},[]);const N=()=>{try{v(Wc()),S(ov()),T(sv()),E(th()),A(av()),a(z=>z+1)}catch(z){console.error("[AdminDashboard] Error refreshing data:",z)}};y.useEffect(()=>{const z=setInterval(async()=>{try{const G=await th();E(Array.isArray(G)?G:[])}catch(G){console.error("[AdminDashboard] Error refreshing logs:",G)}},1e4);return()=>clearInterval(z)},[]);const F=()=>{t(),n("/admin/login")},D=()=>{c(!0)},$=()=>{if(!e||!h||!g||!b){U.error("Please fill all fields");return}y_(u,h,g,b,e.id,e.name)&&(c(!1),f(""),m(""),j(""),N())},L=()=>{switch(r){case"overview":return"Tổng quan bảng điều khiển";case"restaurants":return"Quản lý nhà hàng";case"customers":return"Quản lý khách hàng";case"drones":return"Giám sát đội máy bay";case"logs":return"Nhật ký hoạt động hệ thống";default:return"Bảng điều khiển"}},I=()=>{switch(r){case"overview":return"📊";case"restaurants":return"🏪";case"customers":return"👥";case"drones":return"🚁";case"logs":return"📋";default:return"📊"}};return e?s.jsxs(_z,{children:[s.jsx(u_,{activeTab:r,onTabChange:i,adminName:e.name,stats:{pendingRestaurants:(P==null?void 0:P.pendingRestaurants)||0,maintenanceDrones:(P==null?void 0:P.maintenanceDrones)||0}}),s.jsxs(zz,{children:[s.jsxs(Bz,{children:[s.jsxs(Vz,{children:[s.jsx("span",{children:I()}),L()]}),s.jsxs(Hz,{children:[s.jsx(mh,{onClick:N,children:"🔄 Làm mới"}),s.jsx(mh,{$variant:"primary",onClick:D,children:"⚠️ Can thiệp khẩn cấp"}),s.jsx(mh,{$variant:"danger",onClick:F,children:"Đăng xuất"})]})]}),r==="overview"&&s.jsxs(s.Fragment,{children:[s.jsxs(Uz,{children:[s.jsx(Bi,{$color:"#667eea",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:0},children:s.jsxs(Vi,{children:[s.jsxs("div",{children:[s.jsx(Ui,{children:(P==null?void 0:P.totalRestaurants)||0}),s.jsx(Wi,{children:"Tổng số nhà hàng"}),s.jsxs(Ki,{$positive:((P==null?void 0:P.activeRestaurants)||0)>0,children:[(P==null?void 0:P.activeRestaurants)||0," đang hoạt động"]})]}),s.jsx(Hi,{$bgColor:"#eef2ff",children:"🏪"})]})}),s.jsx(Bi,{$color:"#28a745",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:s.jsxs(Vi,{children:[s.jsxs("div",{children:[s.jsx(Ui,{children:(P==null?void 0:P.totalCustomers)||0}),s.jsx(Wi,{children:"Tổng số khách hàng"}),s.jsx(Ki,{$positive:!0,children:"Cơ sở người dùng đang tăng"})]}),s.jsx(Hi,{$bgColor:"#e7f5e9",children:"👥"})]})}),s.jsx(Bi,{$color:"#17a2b8",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:s.jsxs(Vi,{children:[s.jsxs("div",{children:[s.jsx(Ui,{children:((B=P==null?void 0:P.totalOrders)==null?void 0:B.toLocaleString("vi-VN"))||"0"}),s.jsx(Wi,{children:"Tổng số đơn hàng"}),s.jsx(Ki,{$positive:!0,children:"Tất cả giao hàng"})]}),s.jsx(Hi,{$bgColor:"#e7f5fb",children:"📦"})]})}),s.jsx(Bi,{$color:"#ffc107",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:s.jsxs(Vi,{children:[s.jsxs("div",{children:[s.jsx(Ui,{style:{fontSize:"24px"},children:oe((P==null?void 0:P.totalRevenue)||0)}),s.jsx(Wi,{children:"Tổng doanh thu"}),s.jsx(Ki,{$positive:!0,children:"Thu nhập nền tảng"})]}),s.jsx(Hi,{$bgColor:"#fff9e6",children:"💰"})]})}),s.jsx(Bi,{$color:"#6c757d",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:s.jsxs(Vi,{children:[s.jsxs("div",{children:[s.jsx(Ui,{children:(P==null?void 0:P.totalDrones)||0}),s.jsx(Wi,{children:"Tổng số máy bay"}),s.jsxs(Ki,{$positive:((P==null?void 0:P.activeDrones)||0)>0,children:[(P==null?void 0:P.activeDrones)||0," đang giao hàng"]})]}),s.jsx(Hi,{$bgColor:"#f0f0f0",children:"🚁"})]})}),s.jsx(Bi,{$color:"#dc3545",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5},children:s.jsxs(Vi,{children:[s.jsxs("div",{children:[s.jsx(Ui,{children:(P==null?void 0:P.pendingRestaurants)||0}),s.jsx(Wi,{children:"Chờ phê duyệt"}),s.jsx(Ki,{$positive:((P==null?void 0:P.pendingRestaurants)||0)===0,children:((P==null?void 0:P.pendingRestaurants)||0)===0?"Đã xử lý hết":"Cần xem xét"})]}),s.jsx(Hi,{$bgColor:"#ffe7e7",children:"⏳"})]})})]}),s.jsx(ys,{children:s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:"30px"},children:M.length>0?s.jsx(pv,{restaurants:M,onUpdate:N},`restaurants-${o}`):s.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",background:"white",borderRadius:"15px",boxShadow:"0 2px 10px rgba(0, 0, 0, 0.1)"},children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"🏪"}),s.jsx("div",{style:{fontSize:"18px",color:"#666",marginBottom:"10px"},children:"Không có dữ liệu nhà hàng để hiển thị"}),s.jsx("div",{style:{fontSize:"14px",color:"#999"},children:"Vui lòng thử lại sau hoặc liên hệ quản trị viên"})]})})})]}),r==="restaurants"&&s.jsx(ys,{children:M.length>0?s.jsx(pv,{restaurants:M,onUpdate:N},`restaurants-${o}`):s.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",background:"white",borderRadius:"15px",boxShadow:"0 2px 10px rgba(0, 0, 0, 0.1)"},children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"🏪"}),s.jsx("div",{style:{fontSize:"18px",color:"#666",marginBottom:"10px"},children:"Không có dữ liệu nhà hàng để hiển thị"}),s.jsx("div",{style:{fontSize:"14px",color:"#999"},children:"Vui lòng thử lại sau hoặc liên hệ quản trị viên"})]})}),r==="customers"&&s.jsx(ys,{children:s.jsx(Q_,{customers:Y,onUpdate:N},`customers-${o}`)}),r==="drones"&&s.jsx(ys,{children:s.jsx(wz,{drones:X,onUpdate:N},`drones-${o}`)}),r==="logs"&&s.jsx(ys,{children:s.jsx(Nz,{logs:_},`logs-${o}`)}),s.jsx(Wz,{children:"Trung tâm Quản trị © 2025 FoodFast Drone Delivery — Tất cả giá hiển thị bằng Việt Nam Đồng (₫)"})]}),s.jsx(Mb,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#fff",color:"#333"},success:{iconTheme:{primary:"#28a745",secondary:"#fff"}},error:{iconTheme:{primary:"#dc3545",secondary:"#fff"}}}}),s.jsx(Qe,{children:l&&s.jsx(Kz,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>c(!1),children:s.jsxs(Yz,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:z=>z.stopPropagation(),children:[s.jsx(Gz,{children:"⚠️ Can thiệp khẩn cấp"}),s.jsx(qz,{children:"Đây là hành động quản trị quan trọng sẽ được ghi lại trong hệ thống. Chỉ sử dụng trong các tình huống khẩn cấp."}),s.jsxs(Zz,{children:[s.jsx("strong",{children:"⚠️ CẢNH BÁO"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Hành động này sẽ được ghi lại vĩnh viễn"}),s.jsx("li",{children:"Tất cả các bên liên quan sẽ được thông báo"}),s.jsx("li",{children:"Chỉ sử dụng khi thực sự cần thiết"})]})]}),s.jsxs("div",{children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Loại đối tượng"}),s.jsxs("select",{value:u,onChange:z=>d(z.target.value),style:{width:"100%",padding:"12px",border:"2px solid #e1e5e9",borderRadius:"8px",fontSize:"14px",marginBottom:"15px",background:"white"},children:[s.jsx("option",{value:"order",children:"Đơn hàng"}),s.jsx("option",{value:"restaurant",children:"Nhà hàng"}),s.jsx("option",{value:"drone",children:"Máy bay"})]})]}),s.jsxs("div",{children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Mã đối tượng"}),s.jsx(wv,{type:"text",placeholder:"VD: ORD-12345, rest_1, DRONE-001",value:h,onChange:z=>f(z.target.value)})]}),s.jsxs("div",{children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Tên đối tượng"}),s.jsx(wv,{type:"text",placeholder:"VD: Đơn hàng #123, Tên nhà hàng, Đơn vị máy bay",value:g,onChange:z=>m(z.target.value)})]}),s.jsxs("div",{children:[s.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Chi tiết hành động"}),s.jsx(Qz,{placeholder:"Mô tả hành động khẩn cấp đang thực hiện và lý do...",value:b,onChange:z=>j(z.target.value)})]}),s.jsxs(Xz,{children:[s.jsx(bv,{onClick:()=>c(!1),children:"Hủy"}),s.jsx(bv,{$danger:!0,onClick:$,disabled:!h||!g||!b,children:"Thực hiện can thiệp khẩn cấp"})]})]})})})]}):(n("/admin/login"),null)},Jz=p.nav`
  background: white;
  padding: 15px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }
`,e7=p.h2`
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`,t7=p.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`,n7=p.button`
  padding: 10px 20px;
  background: ${e=>e.$active?"#007bff":"transparent"};
  color: ${e=>e.$active?"white":"#666"};
  border: 2px solid ${e=>e.$active?"#007bff":"#e1e5e9"};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: ${e=>e.$active?"#0056b3":"#f8f9fa"};
    border-color: ${e=>e.$active?"#0056b3":"#007bff"};
    color: ${e=>e.$active?"white":"#007bff"};
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`,ug=()=>{const e=wt(),t=Rt(),n=[{path:"/admin/dashboard",label:"Dashboard",icon:"📊"},{path:"/admin/users",label:"Users",icon:"👥"},{path:"/admin/restaurants",label:"Restaurants",icon:"🏪"},{path:"/admin/orders",label:"Orders",icon:"📦"}],r=i=>{e(i)};return s.jsxs(Jz,{children:[s.jsx(e7,{children:"Admin Panel"}),s.jsx(t7,{children:n.map(i=>s.jsxs(n7,{$active:t.pathname===i.path,onClick:()=>r(i.path),children:[i.icon," ",i.label]},i.path))})]})},r7=p.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`,i7=p.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,o7=p.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`,s7=p.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`,a7=p.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`,l7=p.table`
  width: 100%;
  border-collapse: collapse;
`,qr=p.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`,Qr=p.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`,c7=p.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`,jv=p.button`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${e=>e.$variant==="Sửa"?`
    background: #28a745;
    color: white;
    &:hover {
      background: #218838;
    }
  `:`
    background: #dc3545;
    color: white;
    &:hover {
      background: #c82333;
    }
  `}
`,u7=p.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${e=>{switch(e.$status){case"admin":return"background: #dc3545; color: white;";case"restaurant":return"background: #ffc107; color: #333;";case"customer":return"background: #28a745; color: white;";default:return"background: #6c757d; color: white;"}}}
`,Ik=()=>{const[e,t]=y.useState([{id:"u1",name:"Admin User",username:"admin",role:"admin",email:"admin@foodfast.com",orderCount:0,createdAt:Date.now()-31536e6},{id:"u2",name:"John Doe",username:"john_doe",role:"customer",phone:"0123456789",email:"john@example.com",orderCount:15,createdAt:Date.now()-2592e6},{id:"u3",name:"Jane Smith",username:"jane_smith",role:"customer",phone:"0987654321",email:"jane@example.com",orderCount:8,createdAt:Date.now()-1296e6},{id:"u4",name:"Restaurant Owner",username:"restaurant_owner",role:"restaurant",email:"owner@restaurant.com",restaurantId:"rest_1",orderCount:0,createdAt:Date.now()-5184e6}]),n=a=>{console.log("Sửa user:",a)},r=a=>{window.confirm("Are you sure you want to delete this user?")&&t(e.filter(l=>l.id!==a))},i=()=>{console.log("Add new user")},o=a=>new Date(a).toLocaleDateString();return s.jsxs(r7,{children:[s.jsx(ug,{}),s.jsxs(i7,{children:[s.jsx(o7,{children:"👥 Manage Users"}),s.jsx(s7,{onClick:i,children:"+ Add User"})]}),s.jsx(a7,{children:s.jsxs(l7,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx(qr,{children:"Name"}),s.jsx(qr,{children:"Email"}),s.jsx(qr,{children:"Phone"}),s.jsx(qr,{children:"Role"}),s.jsx(qr,{children:"Orders"}),s.jsx(qr,{children:"Created"}),s.jsx(qr,{children:"Actions"})]})}),s.jsx("tbody",{children:e.map(a=>s.jsxs(c7,{children:[s.jsxs(Qr,{children:[s.jsx("strong",{children:a.name}),s.jsx("br",{}),s.jsxs("small",{style:{color:"#999"},children:["@",a.username]})]}),s.jsx(Qr,{children:a.email||"-"}),s.jsx(Qr,{children:a.phone||"-"}),s.jsx(Qr,{children:s.jsx(u7,{$status:a.role,children:a.role.toUpperCase()})}),s.jsx(Qr,{children:a.orderCount||0}),s.jsx(Qr,{children:o(a.createdAt||Date.now())}),s.jsxs(Qr,{children:[s.jsx(jv,{$variant:"Sửa",onClick:()=>n(a.id),children:"Edit"}),s.jsx(jv,{$variant:"delete",onClick:()=>r(a.id),children:"Delete"})]})]},a.id))})]})})]})},d7=p.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`,h7=p.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,p7=p.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`,f7=p.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`,m7=p.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`,g7=p.table`
  width: 100%;
  border-collapse: collapse;
`,Xr=p.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`,Zr=p.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`,x7=p.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`,gh=p.button`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${e=>{switch(e.variant){case"Sửa":return"background: #28a745; color: white; &:hover { background: #218838; }";case"delete":return"background: #dc3545; color: white; &:hover { background: #c82333; }";case"toggle":return"background: #ffc107; color: #333; &:hover { background: #e0a800; }";default:return"background: #6c757d; color: white; &:hover { background: #5a6268; }"}}}
`,y7=p.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${e=>e.active?`
    background: #28a745;
    color: white;
  `:`
    background: #dc3545;
    color: white;
  `}
`,v7=p.div`
  color: #ffc107;
  font-size: 16px;
`,Ok=()=>{const[e,t]=y.useState([{id:"rest_1",name:"FoodFast Restaurant",description:"Original FoodFast restaurant with drone delivery",category:"Fast Food",location:"Downtown",rating:4.5,theme:{primary:"#FF6600",secondary:"#FF8C00",accent:"#FFA500"},ownerId:"u1",isActive:!0,createdAt:Date.now()-2592e6},{id:"rest_2",name:"SweetDreams Bakery",description:"Bản giao hưởng sô cô la lộng lẫy. Những dòng ganache óng ả, đặc quánh buông lơi như dải lụa mềm, bao trọn lấy cốt bánh ẩm mượt. Trên đỉnh, từng đóa hồng kem bơ sô cô la nở rộ, mời gọi một trải nghiệm ngọt ngào đầy đê mê.",category:"Desserts",location:"Mall District",rating:4.8,theme:{primary:"#E91E63",secondary:"#F06292",accent:"#F8BBD9"},ownerId:"u3",isActive:!0,createdAt:Date.now()-6048e5},{id:"rest_3",name:"Pizza Palace",description:"Authentic Italian pizza with drone delivery",category:"Italian",location:"West Side",rating:4.2,theme:{primary:"#8B4513",secondary:"#A0522D",accent:"#D2691E"},ownerId:"u4",isActive:!1,createdAt:Date.now()-12096e5}]),n=c=>{console.log("Sửa restaurant:",c)},r=c=>{window.confirm("Are you sure you want to delete this restaurant?")&&t(e.filter(u=>u.id!==c))},i=c=>{t(e.map(u=>u.id===c?{...u,isActive:!u.isActive}:u))},o=()=>{console.log("Add new restaurant")},a=c=>new Date(c).toLocaleDateString(),l=c=>{const u=[],d=Math.floor(c),h=c%1!==0;for(let f=0;f<d;f++)u.push("★");return h&&u.push("☆"),u.join("")};return s.jsxs(d7,{children:[s.jsx(ug,{}),s.jsxs(h7,{children:[s.jsx(p7,{children:"🏪 Manage Restaurants"}),s.jsx(f7,{onClick:o,children:"+ Add Restaurant"})]}),s.jsx(m7,{children:s.jsxs(g7,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx(Xr,{children:"Name"}),s.jsx(Xr,{children:"Category"}),s.jsx(Xr,{children:"Location"}),s.jsx(Xr,{children:"Rating"}),s.jsx(Xr,{children:"Status"}),s.jsx(Xr,{children:"Created"}),s.jsx(Xr,{children:"Actions"})]})}),s.jsx("tbody",{children:e.map(c=>s.jsxs(x7,{children:[s.jsxs(Zr,{children:[s.jsx("strong",{children:c.name}),s.jsx("br",{}),s.jsx("small",{style:{color:"#999"},children:c.description})]}),s.jsx(Zr,{children:c.category||"-"}),s.jsx(Zr,{children:c.location||"-"}),s.jsx(Zr,{children:s.jsxs(v7,{children:[l(c.rating||0)," ",c.rating]})}),s.jsx(Zr,{children:s.jsx(y7,{active:c.isActive,children:c.isActive?"ACTIVE":"INACTIVE"})}),s.jsx(Zr,{children:a(c.createdAt)}),s.jsxs(Zr,{children:[s.jsx(gh,{variant:"Sửa",onClick:()=>n(c.id),children:"Sửa"}),s.jsx(gh,{variant:"toggle",onClick:()=>i(c.id),children:c.isActive?"Deactivate":"Activate"}),s.jsx(gh,{variant:"delete",onClick:()=>r(c.id),children:"Delete"})]})]},c.id))})]})})]})},w7=p.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`,b7=p.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,j7=p.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`,k7=p.div`
  display: flex;
  gap: 15px;
  align-items: center;
`,S7=p.select`
  padding: 10px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
`,C7=p.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`,T7=p.table`
  width: 100%;
  border-collapse: collapse;
`,er=p.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`,tr=p.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`,$7=p.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`,xh=p.button`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${e=>{switch(e.$variant){case"view":return"background: #17a2b8; color: white; &:hover { background: #138496; }";case"update":return"background: #28a745; color: white; &:hover { background: #218838; }";case"cancel":return"background: #dc3545; color: white; &:hover { background: #c82333; }";default:return"background: #6c757d; color: white; &:hover { background: #5a6268; }"}}}
`,E7=p.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${e=>{switch(e.$status){case"Đang chờ phê duyệt":return"background: #ffc107; color: #333;";case"confirmed":return"background: #17a2b8; color: white;";case"preparing":return"background: #fd7e14; color: white;";case"delivering":return"background: #6f42c1; color: white;";case"delivered":return"background: #28a745; color: white;";case"cancelled":return"background: #dc3545; color: white;";default:return"background: #6c757d; color: white;"}}}
`,Fk=()=>{const[e,t]=y.useState([{id:"ORD-001",userId:"u2",restaurantId:"rest_1",items:[{id:"item1",productId:"prod1",productName:"Burger Deluxe",quantity:2,price:15.99},{id:"item2",productId:"prod2",productName:"French Fries",quantity:1,price:5.99}],total:37.97,status:"delivered",createdAt:Date.now()-1728e5,updatedAt:Date.now()-864e5,deliveryAddress:"123 Main St, City",paymentMethod:"Credit Card"},{id:"ORD-002",userId:"u3",restaurantId:"rest_2",items:[{id:"item3",productId:"prod3",productName:"Chocolate Cake",quantity:1,price:12.99}],total:12.99,status:"delivering",createdAt:Date.now()-72e5,updatedAt:Date.now()-36e5,deliveryAddress:"456 Oak Ave, City",paymentMethod:"Cash"},{id:"ORD-003",userId:"u2",restaurantId:"rest_1",items:[{id:"item4",productId:"prod4",productName:"Pizza Margherita",quantity:1,price:18.99}],total:18.99,status:"preparing",createdAt:Date.now()-18e5,updatedAt:Date.now()-9e5,deliveryAddress:"789 Pine St, City",paymentMethod:"Credit Card"},{id:"ORD-004",userId:"u3",restaurantId:"rest_2",items:[{id:"item5",productId:"prod5",productName:"Tiramisu",quantity:2,price:8.99}],total:17.98,status:"cancelled",createdAt:Date.now()-864e5,updatedAt:Date.now()-864e5,deliveryAddress:"321 Elm St, City",paymentMethod:"Credit Card"}]),[n,r]=y.useState("all"),i=h=>{console.log("View order:",h)},o=h=>{console.log("Update order status:",h)},a=h=>{window.confirm("Are you sure you want to cancel this order?")&&t(e.map(f=>f.id===h?{...f,status:"cancelled",updatedAt:Date.now()}:f))},l=h=>new Date(h).toLocaleString(),c=n==="all"?e:e.filter(h=>h.status===n),u=h=>({u2:"John Doe",u3:"Jane Smith",u4:"Mike Johnson"})[h]||"Unknown User",d=h=>({rest_1:"FoodFast Restaurant",rest_2:"SweetDreams Bakery",rest_3:"Pizza Palace"})[h]||"Unknown Restaurant";return s.jsxs(w7,{children:[s.jsx(ug,{}),s.jsxs(b7,{children:[s.jsx(j7,{children:"📦 Quản lý các đơn hàng"}),s.jsxs(k7,{children:[s.jsx("label",{htmlFor:"status-filter",children:"Lọc theo trạng thái:"}),s.jsxs(S7,{id:"status-filter",value:n,onChange:h=>r(h.target.value),children:[s.jsx("option",{value:"all",children:"Tất cả đơn hàng"}),s.jsx("option",{value:"Đang chờ phê duyệt",children:"Đang chờ xử lý"}),s.jsx("option",{value:"confirmed",children:"Đã xác nhận"}),s.jsx("option",{value:"preparing",children:"Đang chuẩn bị"}),s.jsx("option",{value:"delivering",children:"Đang giao hàng"}),s.jsx("option",{value:"delivered",children:"Đã giao"}),s.jsx("option",{value:"cancelled",children:"Đã huỷ"})]})]})]}),s.jsx(C7,{children:s.jsxs(T7,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx(er,{children:"Mã đơn hàng"}),s.jsx(er,{children:"Khách hàng"}),s.jsx(er,{children:"Nhà hàng"}),s.jsx(er,{children:"Các mục"}),s.jsx(er,{children:"Tổng"}),s.jsx(er,{children:"Trạng thái"}),s.jsx(er,{children:"Đã tạo"}),s.jsx(er,{children:"Các hành động"})]})}),s.jsx("tbody",{children:c.map(h=>s.jsxs($7,{children:[s.jsx(tr,{children:s.jsx("strong",{children:h.id})}),s.jsx(tr,{children:u(h.userId)}),s.jsx(tr,{children:d(h.restaurantId)}),s.jsxs(tr,{children:[h.items.length," item(s)",s.jsx("br",{}),s.jsx("small",{style:{color:"#999"},children:h.items.map(f=>f.productName).join(", ")})]}),s.jsx(tr,{children:s.jsx("strong",{children:oe(h.total)})}),s.jsx(tr,{children:s.jsx(E7,{$status:h.status,children:h.status.toUpperCase()})}),s.jsx(tr,{children:l(h.createdAt)}),s.jsxs(tr,{children:[s.jsx(xh,{$variant:"view",onClick:()=>i(h.id),children:"View"}),s.jsx(xh,{$variant:"update",onClick:()=>o(h.id),children:"Update"}),h.status!=="cancelled"&&h.status!=="delivered"&&s.jsx(xh,{$variant:"cancel",onClick:()=>a(h.id),children:"Cancel"})]})]},h.id))})]})})]})},pr=({children:e})=>{const{admin:t,loading:n}=Zo(),r=Rt();return n?s.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px",color:"#666"},children:"Loading admin panel..."}):t?s.jsx(s.Fragment,{children:e}):s.jsx(vn,{to:"/admin/login",state:{from:r},replace:!0})},P7=({children:e,allowedRoles:t})=>{const{user:n}=Ke();if(!n)return s.jsx(vn,{to:"/login",replace:!0});if(!t.includes(n.role)){const r=n.role==="restaurant"?"/restaurant":n.role==="admin"?"/admin/dashboard":"/menu";return s.jsx(vn,{to:r,replace:!0})}return s.jsx(s.Fragment,{children:e})},A7=()=>s.jsx(L3,{children:s.jsx(jb,{children:s.jsxs(AN,{children:[s.jsx(fI,{}),s.jsx(CN,{}),s.jsxs(yb,{children:[s.jsx(re,{path:"/",element:s.jsx(vn,{to:"/menu",replace:!0})}),s.jsx(re,{path:"/home",element:s.jsx(vn,{to:"/menu",replace:!0})}),s.jsx(re,{path:"/homepage",element:s.jsx(vn,{to:"/menu",replace:!0})}),s.jsx(re,{path:"/menu",element:s.jsx(xM,{})}),s.jsx(re,{path:"/menu/:id",element:s.jsx(Ty,{})}),s.jsx(re,{path:"/details/:id",element:s.jsx(Ty,{})}),s.jsx(re,{path:"/login",element:s.jsx(SI,{})}),s.jsx(re,{path:"/customer-info",element:s.jsx(WN,{})}),s.jsx(re,{path:"/cart",element:s.jsx(Oi,{requireRole:"customer",children:s.jsx(BM,{})})}),s.jsx(re,{path:"/checkout",element:s.jsx(P7,{allowedRoles:["customer"],children:s.jsx(XL,{})})}),s.jsx(re,{path:"/vnpay-return",element:s.jsx(nI,{})}),s.jsx(re,{path:"/restaurant",element:s.jsx(Oi,{requireRole:"restaurant",children:s.jsx(fF,{})})}),s.jsx(re,{path:"/sweetdreams",element:s.jsx(Oi,{requireRole:"restaurant",children:s.jsx(IF,{})})}),s.jsx(re,{path:"/aloha",element:s.jsx(Oi,{requireRole:"restaurant",children:s.jsx(GF,{})})}),s.jsx(re,{path:"/aloha-dashboard",element:s.jsx(Oi,{requireRole:"restaurant",children:s.jsx(pN,{})})}),s.jsx(re,{path:"/admin",element:s.jsx(Oi,{requireRole:"admin",children:s.jsx(kN,{})})}),s.jsx(re,{path:"/admin/login",element:s.jsx(Yi,{children:s.jsx(Mk,{})})}),s.jsx(re,{path:"/admin/dashboard",element:s.jsx(Yi,{children:s.jsx(pr,{children:s.jsx(Lk,{})})})}),s.jsx(re,{path:"/admin/users",element:s.jsx(Yi,{children:s.jsx(pr,{children:s.jsx(Ik,{})})})}),s.jsx(re,{path:"/admin/restaurants",element:s.jsx(Yi,{children:s.jsx(pr,{children:s.jsx(Ok,{})})})}),s.jsx(re,{path:"/admin/orders",element:s.jsx(Yi,{children:s.jsx(pr,{children:s.jsx(Fk,{})})})})]}),s.jsx(oI,{})]})})});function D7(){return s.jsxs(ob,{theme:ke,children:[s.jsx(lb,{}),s.jsx(Yi,{children:s.jsx(jb,{children:s.jsxs(yb,{children:[s.jsx(re,{path:"/admin/login",element:s.jsx(Mk,{})}),s.jsx(re,{path:"/admin/dashboard",element:s.jsx(pr,{children:s.jsx(Lk,{})})}),s.jsx(re,{path:"/admin/users",element:s.jsx(pr,{children:s.jsx(Ik,{})})}),s.jsx(re,{path:"/admin/restaurants",element:s.jsx(pr,{children:s.jsx(Ok,{})})}),s.jsx(re,{path:"/admin/orders",element:s.jsx(pr,{children:s.jsx(Fk,{})})}),s.jsx(re,{path:"/admin",element:s.jsx(vn,{to:"/admin/login",replace:!0})}),s.jsx(re,{path:"/admin/*",element:s.jsx(vn,{to:"/admin/login",replace:!0})})]})})})]})}class R7 extends pt.Component{constructor(){super(...arguments);dg(this,"state",{hasError:!1})}static getDerivedStateFromError(n){return{hasError:!0,message:n instanceof Error?n.message:String(n)}}componentDidCatch(n,r){console.error("ErrorBoundary caught:",n,r)}render(){return this.state.hasError?s.jsxs("div",{style:{padding:24},children:[s.jsx("h3",{children:"Đã có lỗi xảy ra"}),s.jsx("div",{style:{color:"#b00",marginTop:8},children:this.state.message}),s.jsx("p",{children:"Vui lòng tải lại trang hoặc thử lại sau."})]}):this.props.children}}const M7=()=>{const e=y.useMemo(()=>Object.fromEntries(en.map(t=>[t.id,t.price])),[]);return s.jsx(bR,{children:s.jsxs(ob,{theme:ke,children:[s.jsx(lb,{}),s.jsx(F$,{children:s.jsx(wR,{children:s.jsx(uD,{priceMap:e,children:s.jsxs(dD,{children:[s.jsx(Mb,{position:"top-right"}),s.jsx(A7,{})]})})})})]})})},L7=yh.createRoot(document.getElementById("root"));L7.render(s.jsx(pt.StrictMode,{children:s.jsx(R7,{children:window.location.pathname.startsWith("/admin")?s.jsx(D7,{}):s.jsx(M7,{})})}));

var nj=Object.defineProperty;var rj=(e,t,n)=>t in e?nj(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Kp=(e,t,n)=>rj(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var ij=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Yh(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var zx={exports:{}},Zl={},Vx={exports:{}},K={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Io=Symbol.for("react.element"),sj=Symbol.for("react.portal"),oj=Symbol.for("react.fragment"),aj=Symbol.for("react.strict_mode"),lj=Symbol.for("react.profiler"),cj=Symbol.for("react.provider"),uj=Symbol.for("react.context"),dj=Symbol.for("react.forward_ref"),hj=Symbol.for("react.suspense"),fj=Symbol.for("react.memo"),pj=Symbol.for("react.lazy"),Yp=Symbol.iterator;function gj(e){return e===null||typeof e!="object"?null:(e=Yp&&e[Yp]||e["@@iterator"],typeof e=="function"?e:null)}var Bx={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Hx=Object.assign,Ux={};function as(e,t,n){this.props=e,this.context=t,this.refs=Ux,this.updater=n||Bx}as.prototype.isReactComponent={};as.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};as.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Wx(){}Wx.prototype=as.prototype;function qh(e,t,n){this.props=e,this.context=t,this.refs=Ux,this.updater=n||Bx}var Qh=qh.prototype=new Wx;Qh.constructor=qh;Hx(Qh,as.prototype);Qh.isPureReactComponent=!0;var qp=Array.isArray,Gx=Object.prototype.hasOwnProperty,Xh={current:null},Kx={key:!0,ref:!0,__self:!0,__source:!0};function Yx(e,t,n){var r,i={},s=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)Gx.call(t,r)&&!Kx.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Io,type:e,key:s,ref:a,props:i,_owner:Xh.current}}function mj(e,t){return{$$typeof:Io,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zh(e){return typeof e=="object"&&e!==null&&e.$$typeof===Io}function xj(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Qp=/\/+/g;function Fc(e,t){return typeof e=="object"&&e!==null&&e.key!=null?xj(""+e.key):t.toString(36)}function _a(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Io:case sj:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+Fc(a,0):r,qp(i)?(n="",e!=null&&(n=e.replace(Qp,"$&/")+"/"),_a(i,t,n,"",function(u){return u})):i!=null&&(Zh(i)&&(i=mj(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Qp,"$&/")+"/")+e)),t.push(i)),1;if(a=0,r=r===""?".":r+":",qp(e))for(var l=0;l<e.length;l++){s=e[l];var c=r+Fc(s,l);a+=_a(s,t,n,c,i)}else if(c=gj(e),typeof c=="function")for(e=c.call(e),l=0;!(s=e.next()).done;)s=s.value,c=r+Fc(s,l++),a+=_a(s,t,n,c,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function qo(e,t,n){if(e==null)return e;var r=[],i=0;return _a(e,r,"","",function(s){return t.call(n,s,i++)}),r}function yj(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Qe={current:null},La={transition:null},vj={ReactCurrentDispatcher:Qe,ReactCurrentBatchConfig:La,ReactCurrentOwner:Xh};function qx(){throw Error("act(...) is not supported in production builds of React.")}K.Children={map:qo,forEach:function(e,t,n){qo(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return qo(e,function(){t++}),t},toArray:function(e){return qo(e,function(t){return t})||[]},only:function(e){if(!Zh(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};K.Component=as;K.Fragment=oj;K.Profiler=lj;K.PureComponent=qh;K.StrictMode=aj;K.Suspense=hj;K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vj;K.act=qx;K.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Hx({},e.props),i=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=Xh.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Gx.call(t,c)&&!Kx.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:Io,type:e.type,key:i,ref:s,props:r,_owner:a}};K.createContext=function(e){return e={$$typeof:uj,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:cj,_context:e},e.Consumer=e};K.createElement=Yx;K.createFactory=function(e){var t=Yx.bind(null,e);return t.type=e,t};K.createRef=function(){return{current:null}};K.forwardRef=function(e){return{$$typeof:dj,render:e}};K.isValidElement=Zh;K.lazy=function(e){return{$$typeof:pj,_payload:{_status:-1,_result:e},_init:yj}};K.memo=function(e,t){return{$$typeof:fj,type:e,compare:t===void 0?null:t}};K.startTransition=function(e){var t=La.transition;La.transition={};try{e()}finally{La.transition=t}};K.unstable_act=qx;K.useCallback=function(e,t){return Qe.current.useCallback(e,t)};K.useContext=function(e){return Qe.current.useContext(e)};K.useDebugValue=function(){};K.useDeferredValue=function(e){return Qe.current.useDeferredValue(e)};K.useEffect=function(e,t){return Qe.current.useEffect(e,t)};K.useId=function(){return Qe.current.useId()};K.useImperativeHandle=function(e,t,n){return Qe.current.useImperativeHandle(e,t,n)};K.useInsertionEffect=function(e,t){return Qe.current.useInsertionEffect(e,t)};K.useLayoutEffect=function(e,t){return Qe.current.useLayoutEffect(e,t)};K.useMemo=function(e,t){return Qe.current.useMemo(e,t)};K.useReducer=function(e,t,n){return Qe.current.useReducer(e,t,n)};K.useRef=function(e){return Qe.current.useRef(e)};K.useState=function(e){return Qe.current.useState(e)};K.useSyncExternalStore=function(e,t,n){return Qe.current.useSyncExternalStore(e,t,n)};K.useTransition=function(){return Qe.current.useTransition()};K.version="18.3.1";Vx.exports=K;var v=Vx.exports;const rt=Yh(v);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wj=v,bj=Symbol.for("react.element"),jj=Symbol.for("react.fragment"),Sj=Object.prototype.hasOwnProperty,kj=wj.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Cj={key:!0,ref:!0,__self:!0,__source:!0};function Qx(e,t,n){var r,i={},s=null,a=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)Sj.call(t,r)&&!Cj.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:bj,type:e,key:s,ref:a,props:i,_owner:kj.current}}Zl.Fragment=jj;Zl.jsx=Qx;Zl.jsxs=Qx;zx.exports=Zl;var o=zx.exports,wd={},Xx={exports:{}},xt={},Zx={exports:{}},Jx={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,R){var F=E.length;E.push(R);e:for(;0<F;){var B=F-1>>>1,U=E[B];if(0<i(U,R))E[B]=R,E[F]=U,F=B;else break e}}function n(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var R=E[0],F=E.pop();if(F!==R){E[0]=F;e:for(var B=0,U=E.length,te=U>>>1;B<te;){var J=2*(B+1)-1,ge=E[J],ve=J+1,Me=E[ve];if(0>i(ge,F))ve<U&&0>i(Me,ge)?(E[B]=Me,E[ve]=F,B=ve):(E[B]=ge,E[J]=F,B=J);else if(ve<U&&0>i(Me,F))E[B]=Me,E[ve]=F,B=ve;else break e}}return R}function i(E,R){var F=E.sortIndex-R.sortIndex;return F!==0?F:E.id-R.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var c=[],u=[],d=1,h=null,p=3,g=!1,x=!1,b=!1,S=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,y=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function w(E){for(var R=n(u);R!==null;){if(R.callback===null)r(u);else if(R.startTime<=E)r(u),R.sortIndex=R.expirationTime,t(c,R);else break;R=n(u)}}function $(E){if(b=!1,w(E),!x)if(n(c)!==null)x=!0,N(j);else{var R=n(u);R!==null&&M($,R.startTime-E)}}function j(E,R){x=!1,b&&(b=!1,m(T),T=-1),g=!0;var F=p;try{for(w(R),h=n(c);h!==null&&(!(h.expirationTime>R)||E&&!D());){var B=h.callback;if(typeof B=="function"){h.callback=null,p=h.priorityLevel;var U=B(h.expirationTime<=R);R=e.unstable_now(),typeof U=="function"?h.callback=U:h===n(c)&&r(c),w(R)}else r(c);h=n(c)}if(h!==null)var te=!0;else{var J=n(u);J!==null&&M($,J.startTime-R),te=!1}return te}finally{h=null,p=F,g=!1}}var k=!1,C=null,T=-1,P=5,A=-1;function D(){return!(e.unstable_now()-A<P)}function W(){if(C!==null){var E=e.unstable_now();A=E;var R=!0;try{R=C(!0,E)}finally{R?ee():(k=!1,C=null)}}else k=!1}var ee;if(typeof y=="function")ee=function(){y(W)};else if(typeof MessageChannel<"u"){var z=new MessageChannel,_=z.port2;z.port1.onmessage=W,ee=function(){_.postMessage(null)}}else ee=function(){S(W,0)};function N(E){C=E,k||(k=!0,ee())}function M(E,R){T=S(function(){E(e.unstable_now())},R)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){x||g||(x=!0,N(j))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(E){switch(p){case 1:case 2:case 3:var R=3;break;default:R=p}var F=p;p=R;try{return E()}finally{p=F}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,R){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var F=p;p=E;try{return R()}finally{p=F}},e.unstable_scheduleCallback=function(E,R,F){var B=e.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?B+F:B):F=B,E){case 1:var U=-1;break;case 2:U=250;break;case 5:U=1073741823;break;case 4:U=1e4;break;default:U=5e3}return U=F+U,E={id:d++,callback:R,priorityLevel:E,startTime:F,expirationTime:U,sortIndex:-1},F>B?(E.sortIndex=F,t(u,E),n(c)===null&&E===n(u)&&(b?(m(T),T=-1):b=!0,M($,F-B))):(E.sortIndex=U,t(c,E),x||g||(x=!0,N(j))),E},e.unstable_shouldYield=D,e.unstable_wrapCallback=function(E){var R=p;return function(){var F=p;p=R;try{return E.apply(this,arguments)}finally{p=F}}}})(Jx);Zx.exports=Jx;var $j=Zx.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Tj=v,gt=$j;function I(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ey=new Set,oo={};function Zr(e,t){Gi(e,t),Gi(e+"Capture",t)}function Gi(e,t){for(oo[e]=t,e=0;e<t.length;e++)ey.add(t[e])}var vn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bd=Object.prototype.hasOwnProperty,Ej=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Xp={},Zp={};function Pj(e){return bd.call(Zp,e)?!0:bd.call(Xp,e)?!1:Ej.test(e)?Zp[e]=!0:(Xp[e]=!0,!1)}function Aj(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Dj(e,t,n,r){if(t===null||typeof t>"u"||Aj(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Xe(e,t,n,r,i,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var _e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){_e[e]=new Xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];_e[t]=new Xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){_e[e]=new Xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){_e[e]=new Xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){_e[e]=new Xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){_e[e]=new Xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){_e[e]=new Xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){_e[e]=new Xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){_e[e]=new Xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Jh=/[\-:]([a-z])/g;function ef(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Jh,ef);_e[t]=new Xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Jh,ef);_e[t]=new Xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Jh,ef);_e[t]=new Xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){_e[e]=new Xe(e,1,!1,e.toLowerCase(),null,!1,!1)});_e.xlinkHref=new Xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){_e[e]=new Xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function tf(e,t,n,r){var i=_e.hasOwnProperty(t)?_e[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Dj(t,n,i,r)&&(n=null),r||i===null?Pj(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var $n=Tj.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qo=Symbol.for("react.element"),wi=Symbol.for("react.portal"),bi=Symbol.for("react.fragment"),nf=Symbol.for("react.strict_mode"),jd=Symbol.for("react.profiler"),ty=Symbol.for("react.provider"),ny=Symbol.for("react.context"),rf=Symbol.for("react.forward_ref"),Sd=Symbol.for("react.suspense"),kd=Symbol.for("react.suspense_list"),sf=Symbol.for("react.memo"),Fn=Symbol.for("react.lazy"),ry=Symbol.for("react.offscreen"),Jp=Symbol.iterator;function xs(e){return e===null||typeof e!="object"?null:(e=Jp&&e[Jp]||e["@@iterator"],typeof e=="function"?e:null)}var he=Object.assign,Nc;function _s(e){if(Nc===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Nc=t&&t[1]||""}return`
`+Nc+e}var _c=!1;function Lc(e,t){if(!e||_c)return"";_c=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),s=r.stack.split(`
`),a=i.length-1,l=s.length-1;1<=a&&0<=l&&i[a]!==s[l];)l--;for(;1<=a&&0<=l;a--,l--)if(i[a]!==s[l]){if(a!==1||l!==1)do if(a--,l--,0>l||i[a]!==s[l]){var c=`
`+i[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=l);break}}}finally{_c=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?_s(e):""}function Rj(e){switch(e.tag){case 5:return _s(e.type);case 16:return _s("Lazy");case 13:return _s("Suspense");case 19:return _s("SuspenseList");case 0:case 2:case 15:return e=Lc(e.type,!1),e;case 11:return e=Lc(e.type.render,!1),e;case 1:return e=Lc(e.type,!0),e;default:return""}}function Cd(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case bi:return"Fragment";case wi:return"Portal";case jd:return"Profiler";case nf:return"StrictMode";case Sd:return"Suspense";case kd:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ny:return(e.displayName||"Context")+".Consumer";case ty:return(e._context.displayName||"Context")+".Provider";case rf:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case sf:return t=e.displayName||null,t!==null?t:Cd(e.type)||"Memo";case Fn:t=e._payload,e=e._init;try{return Cd(e(t))}catch{}}return null}function Mj(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Cd(t);case 8:return t===nf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Jn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function iy(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ij(e){var t=iy(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xo(e){e._valueTracker||(e._valueTracker=Ij(e))}function sy(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=iy(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ul(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function $d(e,t){var n=t.checked;return he({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function eg(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Jn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function oy(e,t){t=t.checked,t!=null&&tf(e,"checked",t,!1)}function Td(e,t){oy(e,t);var n=Jn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ed(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ed(e,t.type,Jn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function tg(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ed(e,t,n){(t!=="number"||ul(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ls=Array.isArray;function Oi(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Jn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Pd(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(I(91));return he({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ng(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(I(92));if(Ls(n)){if(1<n.length)throw Error(I(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Jn(n)}}function ay(e,t){var n=Jn(t.value),r=Jn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function rg(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ly(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ad(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ly(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Zo,cy=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Zo=Zo||document.createElement("div"),Zo.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Zo.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ao(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Gs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Fj=["Webkit","ms","Moz","O"];Object.keys(Gs).forEach(function(e){Fj.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Gs[t]=Gs[e]})});function uy(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Gs.hasOwnProperty(e)&&Gs[e]?(""+t).trim():t+"px"}function dy(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=uy(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Nj=he({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Dd(e,t){if(t){if(Nj[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(I(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(I(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(I(61))}if(t.style!=null&&typeof t.style!="object")throw Error(I(62))}}function Rd(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Md=null;function of(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Id=null,zi=null,Vi=null;function ig(e){if(e=_o(e)){if(typeof Id!="function")throw Error(I(280));var t=e.stateNode;t&&(t=rc(t),Id(e.stateNode,e.type,t))}}function hy(e){zi?Vi?Vi.push(e):Vi=[e]:zi=e}function fy(){if(zi){var e=zi,t=Vi;if(Vi=zi=null,ig(e),t)for(e=0;e<t.length;e++)ig(t[e])}}function py(e,t){return e(t)}function gy(){}var Oc=!1;function my(e,t,n){if(Oc)return e(t,n);Oc=!0;try{return py(e,t,n)}finally{Oc=!1,(zi!==null||Vi!==null)&&(gy(),fy())}}function lo(e,t){var n=e.stateNode;if(n===null)return null;var r=rc(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(I(231,t,typeof n));return n}var Fd=!1;if(vn)try{var ys={};Object.defineProperty(ys,"passive",{get:function(){Fd=!0}}),window.addEventListener("test",ys,ys),window.removeEventListener("test",ys,ys)}catch{Fd=!1}function _j(e,t,n,r,i,s,a,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var Ks=!1,dl=null,hl=!1,Nd=null,Lj={onError:function(e){Ks=!0,dl=e}};function Oj(e,t,n,r,i,s,a,l,c){Ks=!1,dl=null,_j.apply(Lj,arguments)}function zj(e,t,n,r,i,s,a,l,c){if(Oj.apply(this,arguments),Ks){if(Ks){var u=dl;Ks=!1,dl=null}else throw Error(I(198));hl||(hl=!0,Nd=u)}}function Jr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function xy(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function sg(e){if(Jr(e)!==e)throw Error(I(188))}function Vj(e){var t=e.alternate;if(!t){if(t=Jr(e),t===null)throw Error(I(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return sg(i),e;if(s===r)return sg(i),t;s=s.sibling}throw Error(I(188))}if(n.return!==r.return)n=i,r=s;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a){for(l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a)throw Error(I(189))}}if(n.alternate!==r)throw Error(I(190))}if(n.tag!==3)throw Error(I(188));return n.stateNode.current===n?e:t}function yy(e){return e=Vj(e),e!==null?vy(e):null}function vy(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=vy(e);if(t!==null)return t;e=e.sibling}return null}var wy=gt.unstable_scheduleCallback,og=gt.unstable_cancelCallback,Bj=gt.unstable_shouldYield,Hj=gt.unstable_requestPaint,ye=gt.unstable_now,Uj=gt.unstable_getCurrentPriorityLevel,af=gt.unstable_ImmediatePriority,by=gt.unstable_UserBlockingPriority,fl=gt.unstable_NormalPriority,Wj=gt.unstable_LowPriority,jy=gt.unstable_IdlePriority,Jl=null,Jt=null;function Gj(e){if(Jt&&typeof Jt.onCommitFiberRoot=="function")try{Jt.onCommitFiberRoot(Jl,e,void 0,(e.current.flags&128)===128)}catch{}}var zt=Math.clz32?Math.clz32:qj,Kj=Math.log,Yj=Math.LN2;function qj(e){return e>>>=0,e===0?32:31-(Kj(e)/Yj|0)|0}var Jo=64,ea=4194304;function Os(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function pl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~i;l!==0?r=Os(l):(s&=a,s!==0&&(r=Os(s)))}else a=n&~i,a!==0?r=Os(a):s!==0&&(r=Os(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-zt(t),i=1<<n,r|=e[n],t&=~i;return r}function Qj(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xj(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-zt(s),l=1<<a,c=i[a];c===-1?(!(l&n)||l&r)&&(i[a]=Qj(l,t)):c<=t&&(e.expiredLanes|=l),s&=~l}}function _d(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Sy(){var e=Jo;return Jo<<=1,!(Jo&4194240)&&(Jo=64),e}function zc(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Fo(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-zt(t),e[t]=n}function Zj(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-zt(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function lf(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-zt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var Z=0;function ky(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Cy,cf,$y,Ty,Ey,Ld=!1,ta=[],Hn=null,Un=null,Wn=null,co=new Map,uo=new Map,_n=[],Jj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ag(e,t){switch(e){case"focusin":case"focusout":Hn=null;break;case"dragenter":case"dragleave":Un=null;break;case"mouseover":case"mouseout":Wn=null;break;case"pointerover":case"pointerout":co.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":uo.delete(t.pointerId)}}function vs(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=_o(t),t!==null&&cf(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function e2(e,t,n,r,i){switch(t){case"focusin":return Hn=vs(Hn,e,t,n,r,i),!0;case"dragenter":return Un=vs(Un,e,t,n,r,i),!0;case"mouseover":return Wn=vs(Wn,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return co.set(s,vs(co.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,uo.set(s,vs(uo.get(s)||null,e,t,n,r,i)),!0}return!1}function Py(e){var t=Mr(e.target);if(t!==null){var n=Jr(t);if(n!==null){if(t=n.tag,t===13){if(t=xy(n),t!==null){e.blockedOn=t,Ey(e.priority,function(){$y(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Oa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Od(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Md=r,n.target.dispatchEvent(r),Md=null}else return t=_o(n),t!==null&&cf(t),e.blockedOn=n,!1;t.shift()}return!0}function lg(e,t,n){Oa(e)&&n.delete(t)}function t2(){Ld=!1,Hn!==null&&Oa(Hn)&&(Hn=null),Un!==null&&Oa(Un)&&(Un=null),Wn!==null&&Oa(Wn)&&(Wn=null),co.forEach(lg),uo.forEach(lg)}function ws(e,t){e.blockedOn===t&&(e.blockedOn=null,Ld||(Ld=!0,gt.unstable_scheduleCallback(gt.unstable_NormalPriority,t2)))}function ho(e){function t(i){return ws(i,e)}if(0<ta.length){ws(ta[0],e);for(var n=1;n<ta.length;n++){var r=ta[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Hn!==null&&ws(Hn,e),Un!==null&&ws(Un,e),Wn!==null&&ws(Wn,e),co.forEach(t),uo.forEach(t),n=0;n<_n.length;n++)r=_n[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<_n.length&&(n=_n[0],n.blockedOn===null);)Py(n),n.blockedOn===null&&_n.shift()}var Bi=$n.ReactCurrentBatchConfig,gl=!0;function n2(e,t,n,r){var i=Z,s=Bi.transition;Bi.transition=null;try{Z=1,uf(e,t,n,r)}finally{Z=i,Bi.transition=s}}function r2(e,t,n,r){var i=Z,s=Bi.transition;Bi.transition=null;try{Z=4,uf(e,t,n,r)}finally{Z=i,Bi.transition=s}}function uf(e,t,n,r){if(gl){var i=Od(e,t,n,r);if(i===null)Qc(e,t,r,ml,n),ag(e,r);else if(e2(i,e,t,n,r))r.stopPropagation();else if(ag(e,r),t&4&&-1<Jj.indexOf(e)){for(;i!==null;){var s=_o(i);if(s!==null&&Cy(s),s=Od(e,t,n,r),s===null&&Qc(e,t,r,ml,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Qc(e,t,r,null,n)}}var ml=null;function Od(e,t,n,r){if(ml=null,e=of(r),e=Mr(e),e!==null)if(t=Jr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=xy(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ml=e,null}function Ay(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Uj()){case af:return 1;case by:return 4;case fl:case Wj:return 16;case jy:return 536870912;default:return 16}default:return 16}}var zn=null,df=null,za=null;function Dy(){if(za)return za;var e,t=df,n=t.length,r,i="value"in zn?zn.value:zn.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===i[s-r];r++);return za=i.slice(e,1<r?1-r:void 0)}function Va(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function na(){return!0}function cg(){return!1}function yt(e){function t(n,r,i,s,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?na:cg,this.isPropagationStopped=cg,this}return he(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=na)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=na)},persist:function(){},isPersistent:na}),t}var ls={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hf=yt(ls),No=he({},ls,{view:0,detail:0}),i2=yt(No),Vc,Bc,bs,ec=he({},No,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ff,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==bs&&(bs&&e.type==="mousemove"?(Vc=e.screenX-bs.screenX,Bc=e.screenY-bs.screenY):Bc=Vc=0,bs=e),Vc)},movementY:function(e){return"movementY"in e?e.movementY:Bc}}),ug=yt(ec),s2=he({},ec,{dataTransfer:0}),o2=yt(s2),a2=he({},No,{relatedTarget:0}),Hc=yt(a2),l2=he({},ls,{animationName:0,elapsedTime:0,pseudoElement:0}),c2=yt(l2),u2=he({},ls,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),d2=yt(u2),h2=he({},ls,{data:0}),dg=yt(h2),f2={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},p2={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},g2={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function m2(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=g2[e])?!!t[e]:!1}function ff(){return m2}var x2=he({},No,{key:function(e){if(e.key){var t=f2[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Va(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?p2[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ff,charCode:function(e){return e.type==="keypress"?Va(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Va(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),y2=yt(x2),v2=he({},ec,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hg=yt(v2),w2=he({},No,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ff}),b2=yt(w2),j2=he({},ls,{propertyName:0,elapsedTime:0,pseudoElement:0}),S2=yt(j2),k2=he({},ec,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),C2=yt(k2),$2=[9,13,27,32],pf=vn&&"CompositionEvent"in window,Ys=null;vn&&"documentMode"in document&&(Ys=document.documentMode);var T2=vn&&"TextEvent"in window&&!Ys,Ry=vn&&(!pf||Ys&&8<Ys&&11>=Ys),fg=" ",pg=!1;function My(e,t){switch(e){case"keyup":return $2.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Iy(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ji=!1;function E2(e,t){switch(e){case"compositionend":return Iy(t);case"keypress":return t.which!==32?null:(pg=!0,fg);case"textInput":return e=t.data,e===fg&&pg?null:e;default:return null}}function P2(e,t){if(ji)return e==="compositionend"||!pf&&My(e,t)?(e=Dy(),za=df=zn=null,ji=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ry&&t.locale!=="ko"?null:t.data;default:return null}}var A2={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!A2[e.type]:t==="textarea"}function Fy(e,t,n,r){hy(r),t=xl(t,"onChange"),0<t.length&&(n=new hf("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var qs=null,fo=null;function D2(e){Gy(e,0)}function tc(e){var t=Ci(e);if(sy(t))return e}function R2(e,t){if(e==="change")return t}var Ny=!1;if(vn){var Uc;if(vn){var Wc="oninput"in document;if(!Wc){var mg=document.createElement("div");mg.setAttribute("oninput","return;"),Wc=typeof mg.oninput=="function"}Uc=Wc}else Uc=!1;Ny=Uc&&(!document.documentMode||9<document.documentMode)}function xg(){qs&&(qs.detachEvent("onpropertychange",_y),fo=qs=null)}function _y(e){if(e.propertyName==="value"&&tc(fo)){var t=[];Fy(t,fo,e,of(e)),my(D2,t)}}function M2(e,t,n){e==="focusin"?(xg(),qs=t,fo=n,qs.attachEvent("onpropertychange",_y)):e==="focusout"&&xg()}function I2(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return tc(fo)}function F2(e,t){if(e==="click")return tc(t)}function N2(e,t){if(e==="input"||e==="change")return tc(t)}function _2(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ht=typeof Object.is=="function"?Object.is:_2;function po(e,t){if(Ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!bd.call(t,i)||!Ht(e[i],t[i]))return!1}return!0}function yg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function vg(e,t){var n=yg(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=yg(n)}}function Ly(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ly(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Oy(){for(var e=window,t=ul();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ul(e.document)}return t}function gf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function L2(e){var t=Oy(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ly(n.ownerDocument.documentElement,n)){if(r!==null&&gf(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=vg(n,s);var a=vg(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var O2=vn&&"documentMode"in document&&11>=document.documentMode,Si=null,zd=null,Qs=null,Vd=!1;function wg(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Vd||Si==null||Si!==ul(r)||(r=Si,"selectionStart"in r&&gf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qs&&po(Qs,r)||(Qs=r,r=xl(zd,"onSelect"),0<r.length&&(t=new hf("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Si)))}function ra(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ki={animationend:ra("Animation","AnimationEnd"),animationiteration:ra("Animation","AnimationIteration"),animationstart:ra("Animation","AnimationStart"),transitionend:ra("Transition","TransitionEnd")},Gc={},zy={};vn&&(zy=document.createElement("div").style,"AnimationEvent"in window||(delete ki.animationend.animation,delete ki.animationiteration.animation,delete ki.animationstart.animation),"TransitionEvent"in window||delete ki.transitionend.transition);function nc(e){if(Gc[e])return Gc[e];if(!ki[e])return e;var t=ki[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in zy)return Gc[e]=t[n];return e}var Vy=nc("animationend"),By=nc("animationiteration"),Hy=nc("animationstart"),Uy=nc("transitionend"),Wy=new Map,bg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(e,t){Wy.set(e,t),Zr(t,[e])}for(var Kc=0;Kc<bg.length;Kc++){var Yc=bg[Kc],z2=Yc.toLowerCase(),V2=Yc[0].toUpperCase()+Yc.slice(1);ir(z2,"on"+V2)}ir(Vy,"onAnimationEnd");ir(By,"onAnimationIteration");ir(Hy,"onAnimationStart");ir("dblclick","onDoubleClick");ir("focusin","onFocus");ir("focusout","onBlur");ir(Uy,"onTransitionEnd");Gi("onMouseEnter",["mouseout","mouseover"]);Gi("onMouseLeave",["mouseout","mouseover"]);Gi("onPointerEnter",["pointerout","pointerover"]);Gi("onPointerLeave",["pointerout","pointerover"]);Zr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Zr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Zr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Zr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Zr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Zr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),B2=new Set("cancel close invalid load scroll toggle".split(" ").concat(zs));function jg(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,zj(r,t,void 0,e),e.currentTarget=null}function Gy(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==s&&i.isPropagationStopped())break e;jg(i,l,u),s=c}else for(a=0;a<r.length;a++){if(l=r[a],c=l.instance,u=l.currentTarget,l=l.listener,c!==s&&i.isPropagationStopped())break e;jg(i,l,u),s=c}}}if(hl)throw e=Nd,hl=!1,Nd=null,e}function re(e,t){var n=t[Gd];n===void 0&&(n=t[Gd]=new Set);var r=e+"__bubble";n.has(r)||(Ky(t,e,2,!1),n.add(r))}function qc(e,t,n){var r=0;t&&(r|=4),Ky(n,e,r,t)}var ia="_reactListening"+Math.random().toString(36).slice(2);function go(e){if(!e[ia]){e[ia]=!0,ey.forEach(function(n){n!=="selectionchange"&&(B2.has(n)||qc(n,!1,e),qc(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ia]||(t[ia]=!0,qc("selectionchange",!1,t))}}function Ky(e,t,n,r){switch(Ay(t)){case 1:var i=n2;break;case 4:i=r2;break;default:i=uf}n=i.bind(null,t,n,e),i=void 0,!Fd||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Qc(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;a=a.return}for(;l!==null;){if(a=Mr(l),a===null)return;if(c=a.tag,c===5||c===6){r=s=a;continue e}l=l.parentNode}}r=r.return}my(function(){var u=s,d=of(n),h=[];e:{var p=Wy.get(e);if(p!==void 0){var g=hf,x=e;switch(e){case"keypress":if(Va(n)===0)break e;case"keydown":case"keyup":g=y2;break;case"focusin":x="focus",g=Hc;break;case"focusout":x="blur",g=Hc;break;case"beforeblur":case"afterblur":g=Hc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=ug;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=o2;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=b2;break;case Vy:case By:case Hy:g=c2;break;case Uy:g=S2;break;case"scroll":g=i2;break;case"wheel":g=C2;break;case"copy":case"cut":case"paste":g=d2;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=hg}var b=(t&4)!==0,S=!b&&e==="scroll",m=b?p!==null?p+"Capture":null:p;b=[];for(var y=u,w;y!==null;){w=y;var $=w.stateNode;if(w.tag===5&&$!==null&&(w=$,m!==null&&($=lo(y,m),$!=null&&b.push(mo(y,$,w)))),S)break;y=y.return}0<b.length&&(p=new g(p,x,null,n,d),h.push({event:p,listeners:b}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",p&&n!==Md&&(x=n.relatedTarget||n.fromElement)&&(Mr(x)||x[wn]))break e;if((g||p)&&(p=d.window===d?d:(p=d.ownerDocument)?p.defaultView||p.parentWindow:window,g?(x=n.relatedTarget||n.toElement,g=u,x=x?Mr(x):null,x!==null&&(S=Jr(x),x!==S||x.tag!==5&&x.tag!==6)&&(x=null)):(g=null,x=u),g!==x)){if(b=ug,$="onMouseLeave",m="onMouseEnter",y="mouse",(e==="pointerout"||e==="pointerover")&&(b=hg,$="onPointerLeave",m="onPointerEnter",y="pointer"),S=g==null?p:Ci(g),w=x==null?p:Ci(x),p=new b($,y+"leave",g,n,d),p.target=S,p.relatedTarget=w,$=null,Mr(d)===u&&(b=new b(m,y+"enter",x,n,d),b.target=w,b.relatedTarget=S,$=b),S=$,g&&x)t:{for(b=g,m=x,y=0,w=b;w;w=si(w))y++;for(w=0,$=m;$;$=si($))w++;for(;0<y-w;)b=si(b),y--;for(;0<w-y;)m=si(m),w--;for(;y--;){if(b===m||m!==null&&b===m.alternate)break t;b=si(b),m=si(m)}b=null}else b=null;g!==null&&Sg(h,p,g,b,!1),x!==null&&S!==null&&Sg(h,S,x,b,!0)}}e:{if(p=u?Ci(u):window,g=p.nodeName&&p.nodeName.toLowerCase(),g==="select"||g==="input"&&p.type==="file")var j=R2;else if(gg(p))if(Ny)j=N2;else{j=I2;var k=M2}else(g=p.nodeName)&&g.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(j=F2);if(j&&(j=j(e,u))){Fy(h,j,n,d);break e}k&&k(e,p,u),e==="focusout"&&(k=p._wrapperState)&&k.controlled&&p.type==="number"&&Ed(p,"number",p.value)}switch(k=u?Ci(u):window,e){case"focusin":(gg(k)||k.contentEditable==="true")&&(Si=k,zd=u,Qs=null);break;case"focusout":Qs=zd=Si=null;break;case"mousedown":Vd=!0;break;case"contextmenu":case"mouseup":case"dragend":Vd=!1,wg(h,n,d);break;case"selectionchange":if(O2)break;case"keydown":case"keyup":wg(h,n,d)}var C;if(pf)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else ji?My(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Ry&&n.locale!=="ko"&&(ji||T!=="onCompositionStart"?T==="onCompositionEnd"&&ji&&(C=Dy()):(zn=d,df="value"in zn?zn.value:zn.textContent,ji=!0)),k=xl(u,T),0<k.length&&(T=new dg(T,e,null,n,d),h.push({event:T,listeners:k}),C?T.data=C:(C=Iy(n),C!==null&&(T.data=C)))),(C=T2?E2(e,n):P2(e,n))&&(u=xl(u,"onBeforeInput"),0<u.length&&(d=new dg("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:u}),d.data=C))}Gy(h,t)})}function mo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function xl(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=lo(e,n),s!=null&&r.unshift(mo(e,s,i)),s=lo(e,t),s!=null&&r.push(mo(e,s,i))),e=e.return}return r}function si(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Sg(e,t,n,r,i){for(var s=t._reactName,a=[];n!==null&&n!==r;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&u!==null&&(l=u,i?(c=lo(n,s),c!=null&&a.unshift(mo(n,c,l))):i||(c=lo(n,s),c!=null&&a.push(mo(n,c,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var H2=/\r\n?/g,U2=/\u0000|\uFFFD/g;function kg(e){return(typeof e=="string"?e:""+e).replace(H2,`
`).replace(U2,"")}function sa(e,t,n){if(t=kg(t),kg(e)!==t&&n)throw Error(I(425))}function yl(){}var Bd=null,Hd=null;function Ud(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=typeof setTimeout=="function"?setTimeout:void 0,W2=typeof clearTimeout=="function"?clearTimeout:void 0,Cg=typeof Promise=="function"?Promise:void 0,G2=typeof queueMicrotask=="function"?queueMicrotask:typeof Cg<"u"?function(e){return Cg.resolve(null).then(e).catch(K2)}:Wd;function K2(e){setTimeout(function(){throw e})}function Xc(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),ho(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ho(t)}function Gn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function $g(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var cs=Math.random().toString(36).slice(2),Qt="__reactFiber$"+cs,xo="__reactProps$"+cs,wn="__reactContainer$"+cs,Gd="__reactEvents$"+cs,Y2="__reactListeners$"+cs,q2="__reactHandles$"+cs;function Mr(e){var t=e[Qt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wn]||n[Qt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=$g(e);e!==null;){if(n=e[Qt])return n;e=$g(e)}return t}e=n,n=e.parentNode}return null}function _o(e){return e=e[Qt]||e[wn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ci(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(I(33))}function rc(e){return e[xo]||null}var Kd=[],$i=-1;function sr(e){return{current:e}}function se(e){0>$i||(e.current=Kd[$i],Kd[$i]=null,$i--)}function ne(e,t){$i++,Kd[$i]=e.current,e.current=t}var er={},Ue=sr(er),ot=sr(!1),Ur=er;function Ki(e,t){var n=e.type.contextTypes;if(!n)return er;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function at(e){return e=e.childContextTypes,e!=null}function vl(){se(ot),se(Ue)}function Tg(e,t,n){if(Ue.current!==er)throw Error(I(168));ne(Ue,t),ne(ot,n)}function Yy(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(I(108,Mj(e)||"Unknown",i));return he({},n,r)}function wl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||er,Ur=Ue.current,ne(Ue,e),ne(ot,ot.current),!0}function Eg(e,t,n){var r=e.stateNode;if(!r)throw Error(I(169));n?(e=Yy(e,t,Ur),r.__reactInternalMemoizedMergedChildContext=e,se(ot),se(Ue),ne(Ue,e)):se(ot),ne(ot,n)}var hn=null,ic=!1,Zc=!1;function qy(e){hn===null?hn=[e]:hn.push(e)}function Q2(e){ic=!0,qy(e)}function or(){if(!Zc&&hn!==null){Zc=!0;var e=0,t=Z;try{var n=hn;for(Z=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}hn=null,ic=!1}catch(i){throw hn!==null&&(hn=hn.slice(e+1)),wy(af,or),i}finally{Z=t,Zc=!1}}return null}var Ti=[],Ei=0,bl=null,jl=0,St=[],kt=0,Wr=null,fn=1,pn="";function Er(e,t){Ti[Ei++]=jl,Ti[Ei++]=bl,bl=e,jl=t}function Qy(e,t,n){St[kt++]=fn,St[kt++]=pn,St[kt++]=Wr,Wr=e;var r=fn;e=pn;var i=32-zt(r)-1;r&=~(1<<i),n+=1;var s=32-zt(t)+i;if(30<s){var a=i-i%5;s=(r&(1<<a)-1).toString(32),r>>=a,i-=a,fn=1<<32-zt(t)+i|n<<i|r,pn=s+e}else fn=1<<s|n<<i|r,pn=e}function mf(e){e.return!==null&&(Er(e,1),Qy(e,1,0))}function xf(e){for(;e===bl;)bl=Ti[--Ei],Ti[Ei]=null,jl=Ti[--Ei],Ti[Ei]=null;for(;e===Wr;)Wr=St[--kt],St[kt]=null,pn=St[--kt],St[kt]=null,fn=St[--kt],St[kt]=null}var ft=null,ht=null,ae=!1,Lt=null;function Xy(e,t){var n=$t(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Pg(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ft=e,ht=Gn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ft=e,ht=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Wr!==null?{id:fn,overflow:pn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=$t(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ft=e,ht=null,!0):!1;default:return!1}}function Yd(e){return(e.mode&1)!==0&&(e.flags&128)===0}function qd(e){if(ae){var t=ht;if(t){var n=t;if(!Pg(e,t)){if(Yd(e))throw Error(I(418));t=Gn(n.nextSibling);var r=ft;t&&Pg(e,t)?Xy(r,n):(e.flags=e.flags&-4097|2,ae=!1,ft=e)}}else{if(Yd(e))throw Error(I(418));e.flags=e.flags&-4097|2,ae=!1,ft=e}}}function Ag(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ft=e}function oa(e){if(e!==ft)return!1;if(!ae)return Ag(e),ae=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ud(e.type,e.memoizedProps)),t&&(t=ht)){if(Yd(e))throw Zy(),Error(I(418));for(;t;)Xy(e,t),t=Gn(t.nextSibling)}if(Ag(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(I(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ht=Gn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ht=null}}else ht=ft?Gn(e.stateNode.nextSibling):null;return!0}function Zy(){for(var e=ht;e;)e=Gn(e.nextSibling)}function Yi(){ht=ft=null,ae=!1}function yf(e){Lt===null?Lt=[e]:Lt.push(e)}var X2=$n.ReactCurrentBatchConfig;function js(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(I(309));var r=n.stateNode}if(!r)throw Error(I(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var l=i.refs;a===null?delete l[s]:l[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(I(284));if(!n._owner)throw Error(I(290,e))}return e}function aa(e,t){throw e=Object.prototype.toString.call(t),Error(I(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Dg(e){var t=e._init;return t(e._payload)}function Jy(e){function t(m,y){if(e){var w=m.deletions;w===null?(m.deletions=[y],m.flags|=16):w.push(y)}}function n(m,y){if(!e)return null;for(;y!==null;)t(m,y),y=y.sibling;return null}function r(m,y){for(m=new Map;y!==null;)y.key!==null?m.set(y.key,y):m.set(y.index,y),y=y.sibling;return m}function i(m,y){return m=Qn(m,y),m.index=0,m.sibling=null,m}function s(m,y,w){return m.index=w,e?(w=m.alternate,w!==null?(w=w.index,w<y?(m.flags|=2,y):w):(m.flags|=2,y)):(m.flags|=1048576,y)}function a(m){return e&&m.alternate===null&&(m.flags|=2),m}function l(m,y,w,$){return y===null||y.tag!==6?(y=su(w,m.mode,$),y.return=m,y):(y=i(y,w),y.return=m,y)}function c(m,y,w,$){var j=w.type;return j===bi?d(m,y,w.props.children,$,w.key):y!==null&&(y.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Fn&&Dg(j)===y.type)?($=i(y,w.props),$.ref=js(m,y,w),$.return=m,$):($=Ya(w.type,w.key,w.props,null,m.mode,$),$.ref=js(m,y,w),$.return=m,$)}function u(m,y,w,$){return y===null||y.tag!==4||y.stateNode.containerInfo!==w.containerInfo||y.stateNode.implementation!==w.implementation?(y=ou(w,m.mode,$),y.return=m,y):(y=i(y,w.children||[]),y.return=m,y)}function d(m,y,w,$,j){return y===null||y.tag!==7?(y=zr(w,m.mode,$,j),y.return=m,y):(y=i(y,w),y.return=m,y)}function h(m,y,w){if(typeof y=="string"&&y!==""||typeof y=="number")return y=su(""+y,m.mode,w),y.return=m,y;if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Qo:return w=Ya(y.type,y.key,y.props,null,m.mode,w),w.ref=js(m,null,y),w.return=m,w;case wi:return y=ou(y,m.mode,w),y.return=m,y;case Fn:var $=y._init;return h(m,$(y._payload),w)}if(Ls(y)||xs(y))return y=zr(y,m.mode,w,null),y.return=m,y;aa(m,y)}return null}function p(m,y,w,$){var j=y!==null?y.key:null;if(typeof w=="string"&&w!==""||typeof w=="number")return j!==null?null:l(m,y,""+w,$);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Qo:return w.key===j?c(m,y,w,$):null;case wi:return w.key===j?u(m,y,w,$):null;case Fn:return j=w._init,p(m,y,j(w._payload),$)}if(Ls(w)||xs(w))return j!==null?null:d(m,y,w,$,null);aa(m,w)}return null}function g(m,y,w,$,j){if(typeof $=="string"&&$!==""||typeof $=="number")return m=m.get(w)||null,l(y,m,""+$,j);if(typeof $=="object"&&$!==null){switch($.$$typeof){case Qo:return m=m.get($.key===null?w:$.key)||null,c(y,m,$,j);case wi:return m=m.get($.key===null?w:$.key)||null,u(y,m,$,j);case Fn:var k=$._init;return g(m,y,w,k($._payload),j)}if(Ls($)||xs($))return m=m.get(w)||null,d(y,m,$,j,null);aa(y,$)}return null}function x(m,y,w,$){for(var j=null,k=null,C=y,T=y=0,P=null;C!==null&&T<w.length;T++){C.index>T?(P=C,C=null):P=C.sibling;var A=p(m,C,w[T],$);if(A===null){C===null&&(C=P);break}e&&C&&A.alternate===null&&t(m,C),y=s(A,y,T),k===null?j=A:k.sibling=A,k=A,C=P}if(T===w.length)return n(m,C),ae&&Er(m,T),j;if(C===null){for(;T<w.length;T++)C=h(m,w[T],$),C!==null&&(y=s(C,y,T),k===null?j=C:k.sibling=C,k=C);return ae&&Er(m,T),j}for(C=r(m,C);T<w.length;T++)P=g(C,m,T,w[T],$),P!==null&&(e&&P.alternate!==null&&C.delete(P.key===null?T:P.key),y=s(P,y,T),k===null?j=P:k.sibling=P,k=P);return e&&C.forEach(function(D){return t(m,D)}),ae&&Er(m,T),j}function b(m,y,w,$){var j=xs(w);if(typeof j!="function")throw Error(I(150));if(w=j.call(w),w==null)throw Error(I(151));for(var k=j=null,C=y,T=y=0,P=null,A=w.next();C!==null&&!A.done;T++,A=w.next()){C.index>T?(P=C,C=null):P=C.sibling;var D=p(m,C,A.value,$);if(D===null){C===null&&(C=P);break}e&&C&&D.alternate===null&&t(m,C),y=s(D,y,T),k===null?j=D:k.sibling=D,k=D,C=P}if(A.done)return n(m,C),ae&&Er(m,T),j;if(C===null){for(;!A.done;T++,A=w.next())A=h(m,A.value,$),A!==null&&(y=s(A,y,T),k===null?j=A:k.sibling=A,k=A);return ae&&Er(m,T),j}for(C=r(m,C);!A.done;T++,A=w.next())A=g(C,m,T,A.value,$),A!==null&&(e&&A.alternate!==null&&C.delete(A.key===null?T:A.key),y=s(A,y,T),k===null?j=A:k.sibling=A,k=A);return e&&C.forEach(function(W){return t(m,W)}),ae&&Er(m,T),j}function S(m,y,w,$){if(typeof w=="object"&&w!==null&&w.type===bi&&w.key===null&&(w=w.props.children),typeof w=="object"&&w!==null){switch(w.$$typeof){case Qo:e:{for(var j=w.key,k=y;k!==null;){if(k.key===j){if(j=w.type,j===bi){if(k.tag===7){n(m,k.sibling),y=i(k,w.props.children),y.return=m,m=y;break e}}else if(k.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Fn&&Dg(j)===k.type){n(m,k.sibling),y=i(k,w.props),y.ref=js(m,k,w),y.return=m,m=y;break e}n(m,k);break}else t(m,k);k=k.sibling}w.type===bi?(y=zr(w.props.children,m.mode,$,w.key),y.return=m,m=y):($=Ya(w.type,w.key,w.props,null,m.mode,$),$.ref=js(m,y,w),$.return=m,m=$)}return a(m);case wi:e:{for(k=w.key;y!==null;){if(y.key===k)if(y.tag===4&&y.stateNode.containerInfo===w.containerInfo&&y.stateNode.implementation===w.implementation){n(m,y.sibling),y=i(y,w.children||[]),y.return=m,m=y;break e}else{n(m,y);break}else t(m,y);y=y.sibling}y=ou(w,m.mode,$),y.return=m,m=y}return a(m);case Fn:return k=w._init,S(m,y,k(w._payload),$)}if(Ls(w))return x(m,y,w,$);if(xs(w))return b(m,y,w,$);aa(m,w)}return typeof w=="string"&&w!==""||typeof w=="number"?(w=""+w,y!==null&&y.tag===6?(n(m,y.sibling),y=i(y,w),y.return=m,m=y):(n(m,y),y=su(w,m.mode,$),y.return=m,m=y),a(m)):n(m,y)}return S}var qi=Jy(!0),ev=Jy(!1),Sl=sr(null),kl=null,Pi=null,vf=null;function wf(){vf=Pi=kl=null}function bf(e){var t=Sl.current;se(Sl),e._currentValue=t}function Qd(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Hi(e,t){kl=e,vf=Pi=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(it=!0),e.firstContext=null)}function Et(e){var t=e._currentValue;if(vf!==e)if(e={context:e,memoizedValue:t,next:null},Pi===null){if(kl===null)throw Error(I(308));Pi=e,kl.dependencies={lanes:0,firstContext:e}}else Pi=Pi.next=e;return t}var Ir=null;function jf(e){Ir===null?Ir=[e]:Ir.push(e)}function tv(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,jf(t)):(n.next=i.next,i.next=n),t.interleaved=n,bn(e,r)}function bn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Nn=!1;function Sf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function nv(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Kn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Y&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,bn(e,n)}return i=r.interleaved,i===null?(t.next=t,jf(r)):(t.next=i.next,i.next=t),r.interleaved=t,bn(e,n)}function Ba(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lf(e,n)}}function Rg(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Cl(e,t,n,r){var i=e.updateQueue;Nn=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var c=l,u=c.next;c.next=null,a===null?s=u:a.next=u,a=c;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==a&&(l===null?d.firstBaseUpdate=u:l.next=u,d.lastBaseUpdate=c))}if(s!==null){var h=i.baseState;a=0,d=u=c=null,l=s;do{var p=l.lane,g=l.eventTime;if((r&p)===p){d!==null&&(d=d.next={eventTime:g,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=e,b=l;switch(p=t,g=n,b.tag){case 1:if(x=b.payload,typeof x=="function"){h=x.call(g,h,p);break e}h=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=b.payload,p=typeof x=="function"?x.call(g,h,p):x,p==null)break e;h=he({},h,p);break e;case 2:Nn=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[l]:p.push(l))}else g={eventTime:g,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(u=d=g,c=h):d=d.next=g,a|=p;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;p=l,l=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(d===null&&(c=h),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);Kr|=a,e.lanes=a,e.memoizedState=h}}function Mg(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(I(191,i));i.call(r)}}}var Lo={},en=sr(Lo),yo=sr(Lo),vo=sr(Lo);function Fr(e){if(e===Lo)throw Error(I(174));return e}function kf(e,t){switch(ne(vo,t),ne(yo,e),ne(en,Lo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ad(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ad(t,e)}se(en),ne(en,t)}function Qi(){se(en),se(yo),se(vo)}function rv(e){Fr(vo.current);var t=Fr(en.current),n=Ad(t,e.type);t!==n&&(ne(yo,e),ne(en,n))}function Cf(e){yo.current===e&&(se(en),se(yo))}var ce=sr(0);function $l(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Jc=[];function $f(){for(var e=0;e<Jc.length;e++)Jc[e]._workInProgressVersionPrimary=null;Jc.length=0}var Ha=$n.ReactCurrentDispatcher,eu=$n.ReactCurrentBatchConfig,Gr=0,de=null,ke=null,Pe=null,Tl=!1,Xs=!1,wo=0,Z2=0;function Le(){throw Error(I(321))}function Tf(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ht(e[n],t[n]))return!1;return!0}function Ef(e,t,n,r,i,s){if(Gr=s,de=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ha.current=e===null||e.memoizedState===null?nS:rS,e=n(r,i),Xs){s=0;do{if(Xs=!1,wo=0,25<=s)throw Error(I(301));s+=1,Pe=ke=null,t.updateQueue=null,Ha.current=iS,e=n(r,i)}while(Xs)}if(Ha.current=El,t=ke!==null&&ke.next!==null,Gr=0,Pe=ke=de=null,Tl=!1,t)throw Error(I(300));return e}function Pf(){var e=wo!==0;return wo=0,e}function Kt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?de.memoizedState=Pe=e:Pe=Pe.next=e,Pe}function Pt(){if(ke===null){var e=de.alternate;e=e!==null?e.memoizedState:null}else e=ke.next;var t=Pe===null?de.memoizedState:Pe.next;if(t!==null)Pe=t,ke=e;else{if(e===null)throw Error(I(310));ke=e,e={memoizedState:ke.memoizedState,baseState:ke.baseState,baseQueue:ke.baseQueue,queue:ke.queue,next:null},Pe===null?de.memoizedState=Pe=e:Pe=Pe.next=e}return Pe}function bo(e,t){return typeof t=="function"?t(e):t}function tu(e){var t=Pt(),n=t.queue;if(n===null)throw Error(I(311));n.lastRenderedReducer=e;var r=ke,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=a=null,c=null,u=s;do{var d=u.lane;if((Gr&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=h,a=r):c=c.next=h,de.lanes|=d,Kr|=d}u=u.next}while(u!==null&&u!==s);c===null?a=r:c.next=l,Ht(r,t.memoizedState)||(it=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,de.lanes|=s,Kr|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function nu(e){var t=Pt(),n=t.queue;if(n===null)throw Error(I(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do s=e(s,a.action),a=a.next;while(a!==i);Ht(s,t.memoizedState)||(it=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function iv(){}function sv(e,t){var n=de,r=Pt(),i=t(),s=!Ht(r.memoizedState,i);if(s&&(r.memoizedState=i,it=!0),r=r.queue,Af(lv.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||Pe!==null&&Pe.memoizedState.tag&1){if(n.flags|=2048,jo(9,av.bind(null,n,r,i,t),void 0,null),Re===null)throw Error(I(349));Gr&30||ov(n,t,i)}return i}function ov(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function av(e,t,n,r){t.value=n,t.getSnapshot=r,cv(t)&&uv(e)}function lv(e,t,n){return n(function(){cv(t)&&uv(e)})}function cv(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ht(e,n)}catch{return!0}}function uv(e){var t=bn(e,1);t!==null&&Vt(t,e,1,-1)}function Ig(e){var t=Kt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:bo,lastRenderedState:e},t.queue=e,e=e.dispatch=tS.bind(null,de,e),[t.memoizedState,e]}function jo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function dv(){return Pt().memoizedState}function Ua(e,t,n,r){var i=Kt();de.flags|=e,i.memoizedState=jo(1|t,n,void 0,r===void 0?null:r)}function sc(e,t,n,r){var i=Pt();r=r===void 0?null:r;var s=void 0;if(ke!==null){var a=ke.memoizedState;if(s=a.destroy,r!==null&&Tf(r,a.deps)){i.memoizedState=jo(t,n,s,r);return}}de.flags|=e,i.memoizedState=jo(1|t,n,s,r)}function Fg(e,t){return Ua(8390656,8,e,t)}function Af(e,t){return sc(2048,8,e,t)}function hv(e,t){return sc(4,2,e,t)}function fv(e,t){return sc(4,4,e,t)}function pv(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function gv(e,t,n){return n=n!=null?n.concat([e]):null,sc(4,4,pv.bind(null,t,e),n)}function Df(){}function mv(e,t){var n=Pt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Tf(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function xv(e,t){var n=Pt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Tf(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function yv(e,t,n){return Gr&21?(Ht(n,t)||(n=Sy(),de.lanes|=n,Kr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,it=!0),e.memoizedState=n)}function J2(e,t){var n=Z;Z=n!==0&&4>n?n:4,e(!0);var r=eu.transition;eu.transition={};try{e(!1),t()}finally{Z=n,eu.transition=r}}function vv(){return Pt().memoizedState}function eS(e,t,n){var r=qn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},wv(e))bv(t,n);else if(n=tv(e,t,n,r),n!==null){var i=qe();Vt(n,e,r,i),jv(n,t,r)}}function tS(e,t,n){var r=qn(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(wv(e))bv(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,l=s(a,n);if(i.hasEagerState=!0,i.eagerState=l,Ht(l,a)){var c=t.interleaved;c===null?(i.next=i,jf(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=tv(e,t,i,r),n!==null&&(i=qe(),Vt(n,e,r,i),jv(n,t,r))}}function wv(e){var t=e.alternate;return e===de||t!==null&&t===de}function bv(e,t){Xs=Tl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function jv(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lf(e,n)}}var El={readContext:Et,useCallback:Le,useContext:Le,useEffect:Le,useImperativeHandle:Le,useInsertionEffect:Le,useLayoutEffect:Le,useMemo:Le,useReducer:Le,useRef:Le,useState:Le,useDebugValue:Le,useDeferredValue:Le,useTransition:Le,useMutableSource:Le,useSyncExternalStore:Le,useId:Le,unstable_isNewReconciler:!1},nS={readContext:Et,useCallback:function(e,t){return Kt().memoizedState=[e,t===void 0?null:t],e},useContext:Et,useEffect:Fg,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ua(4194308,4,pv.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ua(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ua(4,2,e,t)},useMemo:function(e,t){var n=Kt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Kt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=eS.bind(null,de,e),[r.memoizedState,e]},useRef:function(e){var t=Kt();return e={current:e},t.memoizedState=e},useState:Ig,useDebugValue:Df,useDeferredValue:function(e){return Kt().memoizedState=e},useTransition:function(){var e=Ig(!1),t=e[0];return e=J2.bind(null,e[1]),Kt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=de,i=Kt();if(ae){if(n===void 0)throw Error(I(407));n=n()}else{if(n=t(),Re===null)throw Error(I(349));Gr&30||ov(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,Fg(lv.bind(null,r,s,e),[e]),r.flags|=2048,jo(9,av.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=Kt(),t=Re.identifierPrefix;if(ae){var n=pn,r=fn;n=(r&~(1<<32-zt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=wo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Z2++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},rS={readContext:Et,useCallback:mv,useContext:Et,useEffect:Af,useImperativeHandle:gv,useInsertionEffect:hv,useLayoutEffect:fv,useMemo:xv,useReducer:tu,useRef:dv,useState:function(){return tu(bo)},useDebugValue:Df,useDeferredValue:function(e){var t=Pt();return yv(t,ke.memoizedState,e)},useTransition:function(){var e=tu(bo)[0],t=Pt().memoizedState;return[e,t]},useMutableSource:iv,useSyncExternalStore:sv,useId:vv,unstable_isNewReconciler:!1},iS={readContext:Et,useCallback:mv,useContext:Et,useEffect:Af,useImperativeHandle:gv,useInsertionEffect:hv,useLayoutEffect:fv,useMemo:xv,useReducer:nu,useRef:dv,useState:function(){return nu(bo)},useDebugValue:Df,useDeferredValue:function(e){var t=Pt();return ke===null?t.memoizedState=e:yv(t,ke.memoizedState,e)},useTransition:function(){var e=nu(bo)[0],t=Pt().memoizedState;return[e,t]},useMutableSource:iv,useSyncExternalStore:sv,useId:vv,unstable_isNewReconciler:!1};function Nt(e,t){if(e&&e.defaultProps){t=he({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Xd(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:he({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var oc={isMounted:function(e){return(e=e._reactInternals)?Jr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=qe(),i=qn(e),s=gn(r,i);s.payload=t,n!=null&&(s.callback=n),t=Kn(e,s,i),t!==null&&(Vt(t,e,i,r),Ba(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=qe(),i=qn(e),s=gn(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Kn(e,s,i),t!==null&&(Vt(t,e,i,r),Ba(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=qe(),r=qn(e),i=gn(n,r);i.tag=2,t!=null&&(i.callback=t),t=Kn(e,i,r),t!==null&&(Vt(t,e,r,n),Ba(t,e,r))}};function Ng(e,t,n,r,i,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,a):t.prototype&&t.prototype.isPureReactComponent?!po(n,r)||!po(i,s):!0}function Sv(e,t,n){var r=!1,i=er,s=t.contextType;return typeof s=="object"&&s!==null?s=Et(s):(i=at(t)?Ur:Ue.current,r=t.contextTypes,s=(r=r!=null)?Ki(e,i):er),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=oc,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function _g(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&oc.enqueueReplaceState(t,t.state,null)}function Zd(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Sf(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=Et(s):(s=at(t)?Ur:Ue.current,i.context=Ki(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Xd(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&oc.enqueueReplaceState(i,i.state,null),Cl(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Xi(e,t){try{var n="",r=t;do n+=Rj(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function ru(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Jd(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var sS=typeof WeakMap=="function"?WeakMap:Map;function kv(e,t,n){n=gn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Al||(Al=!0,ch=r),Jd(e,t)},n}function Cv(e,t,n){n=gn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Jd(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Jd(e,t),typeof r!="function"&&(Yn===null?Yn=new Set([this]):Yn.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Lg(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new sS;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=vS.bind(null,e,t,n),t.then(e,e))}function Og(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function zg(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gn(-1,1),t.tag=2,Kn(n,t,1))),n.lanes|=1),e)}var oS=$n.ReactCurrentOwner,it=!1;function Ge(e,t,n,r){t.child=e===null?ev(t,null,n,r):qi(t,e.child,n,r)}function Vg(e,t,n,r,i){n=n.render;var s=t.ref;return Hi(t,i),r=Ef(e,t,n,r,s,i),n=Pf(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,jn(e,t,i)):(ae&&n&&mf(t),t.flags|=1,Ge(e,t,r,i),t.child)}function Bg(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!Of(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,$v(e,t,s,r,i)):(e=Ya(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:po,n(a,r)&&e.ref===t.ref)return jn(e,t,i)}return t.flags|=1,e=Qn(s,r),e.ref=t.ref,e.return=t,t.child=e}function $v(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(po(s,r)&&e.ref===t.ref)if(it=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(it=!0);else return t.lanes=e.lanes,jn(e,t,i)}return eh(e,t,n,r,i)}function Tv(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ne(Di,dt),dt|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ne(Di,dt),dt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ne(Di,dt),dt|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,ne(Di,dt),dt|=r;return Ge(e,t,i,n),t.child}function Ev(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function eh(e,t,n,r,i){var s=at(n)?Ur:Ue.current;return s=Ki(t,s),Hi(t,i),n=Ef(e,t,n,r,s,i),r=Pf(),e!==null&&!it?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,jn(e,t,i)):(ae&&r&&mf(t),t.flags|=1,Ge(e,t,n,i),t.child)}function Hg(e,t,n,r,i){if(at(n)){var s=!0;wl(t)}else s=!1;if(Hi(t,i),t.stateNode===null)Wa(e,t),Sv(t,n,r),Zd(t,n,r,i),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Et(u):(u=at(n)?Ur:Ue.current,u=Ki(t,u));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||c!==u)&&_g(t,a,r,u),Nn=!1;var p=t.memoizedState;a.state=p,Cl(t,r,a,i),c=t.memoizedState,l!==r||p!==c||ot.current||Nn?(typeof d=="function"&&(Xd(t,n,d,r),c=t.memoizedState),(l=Nn||Ng(t,n,l,r,p,c,u))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),a.props=r,a.state=c,a.context=u,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,nv(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:Nt(t.type,l),a.props=u,h=t.pendingProps,p=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Et(c):(c=at(n)?Ur:Ue.current,c=Ki(t,c));var g=n.getDerivedStateFromProps;(d=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==h||p!==c)&&_g(t,a,r,c),Nn=!1,p=t.memoizedState,a.state=p,Cl(t,r,a,i);var x=t.memoizedState;l!==h||p!==x||ot.current||Nn?(typeof g=="function"&&(Xd(t,n,g,r),x=t.memoizedState),(u=Nn||Ng(t,n,u,r,p,x,c)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,x,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,x,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),a.props=r,a.state=x,a.context=c,r=u):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return th(e,t,n,r,s,i)}function th(e,t,n,r,i,s){Ev(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return i&&Eg(t,n,!1),jn(e,t,s);r=t.stateNode,oS.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=qi(t,e.child,null,s),t.child=qi(t,null,l,s)):Ge(e,t,l,s),t.memoizedState=r.state,i&&Eg(t,n,!0),t.child}function Pv(e){var t=e.stateNode;t.pendingContext?Tg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Tg(e,t.context,!1),kf(e,t.containerInfo)}function Ug(e,t,n,r,i){return Yi(),yf(i),t.flags|=256,Ge(e,t,n,r),t.child}var nh={dehydrated:null,treeContext:null,retryLane:0};function rh(e){return{baseLanes:e,cachePool:null,transitions:null}}function Av(e,t,n){var r=t.pendingProps,i=ce.current,s=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ne(ce,i&1),e===null)return qd(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,s?(r=t.mode,s=t.child,a={mode:"hidden",children:a},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=cc(a,r,0,null),e=zr(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=rh(n),t.memoizedState=nh,e):Rf(t,a));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return aS(e,t,a,r,l,i,n);if(s){s=r.fallback,a=t.mode,i=e.child,l=i.sibling;var c={mode:"hidden",children:r.children};return!(a&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Qn(i,c),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=Qn(l,s):(s=zr(s,a,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,a=e.child.memoizedState,a=a===null?rh(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~n,t.memoizedState=nh,r}return s=e.child,e=s.sibling,r=Qn(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Rf(e,t){return t=cc({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function la(e,t,n,r){return r!==null&&yf(r),qi(t,e.child,null,n),e=Rf(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function aS(e,t,n,r,i,s,a){if(n)return t.flags&256?(t.flags&=-257,r=ru(Error(I(422))),la(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=cc({mode:"visible",children:r.children},i,0,null),s=zr(s,i,a,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&qi(t,e.child,null,a),t.child.memoizedState=rh(a),t.memoizedState=nh,s);if(!(t.mode&1))return la(e,t,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(I(419)),r=ru(s,r,void 0),la(e,t,a,r)}if(l=(a&e.childLanes)!==0,it||l){if(r=Re,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,bn(e,i),Vt(r,e,i,-1))}return Lf(),r=ru(Error(I(421))),la(e,t,a,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=wS.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,ht=Gn(i.nextSibling),ft=t,ae=!0,Lt=null,e!==null&&(St[kt++]=fn,St[kt++]=pn,St[kt++]=Wr,fn=e.id,pn=e.overflow,Wr=t),t=Rf(t,r.children),t.flags|=4096,t)}function Wg(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Qd(e.return,t,n)}function iu(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Dv(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(Ge(e,t,r.children,n),r=ce.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Wg(e,n,t);else if(e.tag===19)Wg(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ne(ce,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&$l(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),iu(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&$l(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}iu(t,!0,n,null,s);break;case"together":iu(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Wa(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(I(153));if(t.child!==null){for(e=t.child,n=Qn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Qn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function lS(e,t,n){switch(t.tag){case 3:Pv(t),Yi();break;case 5:rv(t);break;case 1:at(t.type)&&wl(t);break;case 4:kf(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;ne(Sl,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ne(ce,ce.current&1),t.flags|=128,null):n&t.child.childLanes?Av(e,t,n):(ne(ce,ce.current&1),e=jn(e,t,n),e!==null?e.sibling:null);ne(ce,ce.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Dv(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ne(ce,ce.current),r)break;return null;case 22:case 23:return t.lanes=0,Tv(e,t,n)}return jn(e,t,n)}var Rv,ih,Mv,Iv;Rv=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ih=function(){};Mv=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Fr(en.current);var s=null;switch(n){case"input":i=$d(e,i),r=$d(e,r),s=[];break;case"select":i=he({},i,{value:void 0}),r=he({},r,{value:void 0}),s=[];break;case"textarea":i=Pd(e,i),r=Pd(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=yl)}Dd(n,r);var a;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(oo.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in r){var c=r[u];if(l=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(oo.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&re("scroll",e),s||l===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}};Iv=function(e,t,n,r){n!==r&&(t.flags|=4)};function Ss(e,t){if(!ae)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Oe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function cS(e,t,n){var r=t.pendingProps;switch(xf(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Oe(t),null;case 1:return at(t.type)&&vl(),Oe(t),null;case 3:return r=t.stateNode,Qi(),se(ot),se(Ue),$f(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(oa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Lt!==null&&(hh(Lt),Lt=null))),ih(e,t),Oe(t),null;case 5:Cf(t);var i=Fr(vo.current);if(n=t.type,e!==null&&t.stateNode!=null)Mv(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(I(166));return Oe(t),null}if(e=Fr(en.current),oa(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[Qt]=t,r[xo]=s,e=(t.mode&1)!==0,n){case"dialog":re("cancel",r),re("close",r);break;case"iframe":case"object":case"embed":re("load",r);break;case"video":case"audio":for(i=0;i<zs.length;i++)re(zs[i],r);break;case"source":re("error",r);break;case"img":case"image":case"link":re("error",r),re("load",r);break;case"details":re("toggle",r);break;case"input":eg(r,s),re("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},re("invalid",r);break;case"textarea":ng(r,s),re("invalid",r)}Dd(n,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&sa(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&sa(r.textContent,l,e),i=["children",""+l]):oo.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&re("scroll",r)}switch(n){case"input":Xo(r),tg(r,s,!0);break;case"textarea":Xo(r),rg(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=yl)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ly(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Qt]=t,e[xo]=r,Rv(e,t,!1,!1),t.stateNode=e;e:{switch(a=Rd(n,r),n){case"dialog":re("cancel",e),re("close",e),i=r;break;case"iframe":case"object":case"embed":re("load",e),i=r;break;case"video":case"audio":for(i=0;i<zs.length;i++)re(zs[i],e);i=r;break;case"source":re("error",e),i=r;break;case"img":case"image":case"link":re("error",e),re("load",e),i=r;break;case"details":re("toggle",e),i=r;break;case"input":eg(e,r),i=$d(e,r),re("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=he({},r,{value:void 0}),re("invalid",e);break;case"textarea":ng(e,r),i=Pd(e,r),re("invalid",e);break;default:i=r}Dd(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var c=l[s];s==="style"?dy(e,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&cy(e,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&ao(e,c):typeof c=="number"&&ao(e,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(oo.hasOwnProperty(s)?c!=null&&s==="onScroll"&&re("scroll",e):c!=null&&tf(e,s,c,a))}switch(n){case"input":Xo(e),tg(e,r,!1);break;case"textarea":Xo(e),rg(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Jn(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Oi(e,!!r.multiple,s,!1):r.defaultValue!=null&&Oi(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=yl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Oe(t),null;case 6:if(e&&t.stateNode!=null)Iv(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(I(166));if(n=Fr(vo.current),Fr(en.current),oa(t)){if(r=t.stateNode,n=t.memoizedProps,r[Qt]=t,(s=r.nodeValue!==n)&&(e=ft,e!==null))switch(e.tag){case 3:sa(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&sa(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Qt]=t,t.stateNode=r}return Oe(t),null;case 13:if(se(ce),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ae&&ht!==null&&t.mode&1&&!(t.flags&128))Zy(),Yi(),t.flags|=98560,s=!1;else if(s=oa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(I(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(I(317));s[Qt]=t}else Yi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Oe(t),s=!1}else Lt!==null&&(hh(Lt),Lt=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ce.current&1?Te===0&&(Te=3):Lf())),t.updateQueue!==null&&(t.flags|=4),Oe(t),null);case 4:return Qi(),ih(e,t),e===null&&go(t.stateNode.containerInfo),Oe(t),null;case 10:return bf(t.type._context),Oe(t),null;case 17:return at(t.type)&&vl(),Oe(t),null;case 19:if(se(ce),s=t.memoizedState,s===null)return Oe(t),null;if(r=(t.flags&128)!==0,a=s.rendering,a===null)if(r)Ss(s,!1);else{if(Te!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=$l(e),a!==null){for(t.flags|=128,Ss(s,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ne(ce,ce.current&1|2),t.child}e=e.sibling}s.tail!==null&&ye()>Zi&&(t.flags|=128,r=!0,Ss(s,!1),t.lanes=4194304)}else{if(!r)if(e=$l(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ss(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!ae)return Oe(t),null}else 2*ye()-s.renderingStartTime>Zi&&n!==1073741824&&(t.flags|=128,r=!0,Ss(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(n=s.last,n!==null?n.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=ye(),t.sibling=null,n=ce.current,ne(ce,r?n&1|2:n&1),t):(Oe(t),null);case 22:case 23:return _f(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?dt&1073741824&&(Oe(t),t.subtreeFlags&6&&(t.flags|=8192)):Oe(t),null;case 24:return null;case 25:return null}throw Error(I(156,t.tag))}function uS(e,t){switch(xf(t),t.tag){case 1:return at(t.type)&&vl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Qi(),se(ot),se(Ue),$f(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Cf(t),null;case 13:if(se(ce),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(I(340));Yi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return se(ce),null;case 4:return Qi(),null;case 10:return bf(t.type._context),null;case 22:case 23:return _f(),null;case 24:return null;default:return null}}var ca=!1,Be=!1,dS=typeof WeakSet=="function"?WeakSet:Set,V=null;function Ai(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){pe(e,t,r)}else n.current=null}function sh(e,t,n){try{n()}catch(r){pe(e,t,r)}}var Gg=!1;function hS(e,t){if(Bd=gl,e=Oy(),gf(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,l=-1,c=-1,u=0,d=0,h=e,p=null;t:for(;;){for(var g;h!==n||i!==0&&h.nodeType!==3||(l=a+i),h!==s||r!==0&&h.nodeType!==3||(c=a+r),h.nodeType===3&&(a+=h.nodeValue.length),(g=h.firstChild)!==null;)p=h,h=g;for(;;){if(h===e)break t;if(p===n&&++u===i&&(l=a),p===s&&++d===r&&(c=a),(g=h.nextSibling)!==null)break;h=p,p=h.parentNode}h=g}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Hd={focusedElem:e,selectionRange:n},gl=!1,V=t;V!==null;)if(t=V,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,V=e;else for(;V!==null;){t=V;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var b=x.memoizedProps,S=x.memoizedState,m=t.stateNode,y=m.getSnapshotBeforeUpdate(t.elementType===t.type?b:Nt(t.type,b),S);m.__reactInternalSnapshotBeforeUpdate=y}break;case 3:var w=t.stateNode.containerInfo;w.nodeType===1?w.textContent="":w.nodeType===9&&w.documentElement&&w.removeChild(w.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(I(163))}}catch($){pe(t,t.return,$)}if(e=t.sibling,e!==null){e.return=t.return,V=e;break}V=t.return}return x=Gg,Gg=!1,x}function Zs(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&sh(t,n,s)}i=i.next}while(i!==r)}}function ac(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function oh(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Fv(e){var t=e.alternate;t!==null&&(e.alternate=null,Fv(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Qt],delete t[xo],delete t[Gd],delete t[Y2],delete t[q2])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Nv(e){return e.tag===5||e.tag===3||e.tag===4}function Kg(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Nv(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ah(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=yl));else if(r!==4&&(e=e.child,e!==null))for(ah(e,t,n),e=e.sibling;e!==null;)ah(e,t,n),e=e.sibling}function lh(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(lh(e,t,n),e=e.sibling;e!==null;)lh(e,t,n),e=e.sibling}var Ie=null,_t=!1;function Tn(e,t,n){for(n=n.child;n!==null;)_v(e,t,n),n=n.sibling}function _v(e,t,n){if(Jt&&typeof Jt.onCommitFiberUnmount=="function")try{Jt.onCommitFiberUnmount(Jl,n)}catch{}switch(n.tag){case 5:Be||Ai(n,t);case 6:var r=Ie,i=_t;Ie=null,Tn(e,t,n),Ie=r,_t=i,Ie!==null&&(_t?(e=Ie,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ie.removeChild(n.stateNode));break;case 18:Ie!==null&&(_t?(e=Ie,n=n.stateNode,e.nodeType===8?Xc(e.parentNode,n):e.nodeType===1&&Xc(e,n),ho(e)):Xc(Ie,n.stateNode));break;case 4:r=Ie,i=_t,Ie=n.stateNode.containerInfo,_t=!0,Tn(e,t,n),Ie=r,_t=i;break;case 0:case 11:case 14:case 15:if(!Be&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&sh(n,t,a),i=i.next}while(i!==r)}Tn(e,t,n);break;case 1:if(!Be&&(Ai(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){pe(n,t,l)}Tn(e,t,n);break;case 21:Tn(e,t,n);break;case 22:n.mode&1?(Be=(r=Be)||n.memoizedState!==null,Tn(e,t,n),Be=r):Tn(e,t,n);break;default:Tn(e,t,n)}}function Yg(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new dS),t.forEach(function(r){var i=bS.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Mt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:Ie=l.stateNode,_t=!1;break e;case 3:Ie=l.stateNode.containerInfo,_t=!0;break e;case 4:Ie=l.stateNode.containerInfo,_t=!0;break e}l=l.return}if(Ie===null)throw Error(I(160));_v(s,a,i),Ie=null,_t=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){pe(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Lv(t,e),t=t.sibling}function Lv(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Mt(t,e),Gt(e),r&4){try{Zs(3,e,e.return),ac(3,e)}catch(b){pe(e,e.return,b)}try{Zs(5,e,e.return)}catch(b){pe(e,e.return,b)}}break;case 1:Mt(t,e),Gt(e),r&512&&n!==null&&Ai(n,n.return);break;case 5:if(Mt(t,e),Gt(e),r&512&&n!==null&&Ai(n,n.return),e.flags&32){var i=e.stateNode;try{ao(i,"")}catch(b){pe(e,e.return,b)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,a=n!==null?n.memoizedProps:s,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&oy(i,s),Rd(l,a);var u=Rd(l,s);for(a=0;a<c.length;a+=2){var d=c[a],h=c[a+1];d==="style"?dy(i,h):d==="dangerouslySetInnerHTML"?cy(i,h):d==="children"?ao(i,h):tf(i,d,h,u)}switch(l){case"input":Td(i,s);break;case"textarea":ay(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var g=s.value;g!=null?Oi(i,!!s.multiple,g,!1):p!==!!s.multiple&&(s.defaultValue!=null?Oi(i,!!s.multiple,s.defaultValue,!0):Oi(i,!!s.multiple,s.multiple?[]:"",!1))}i[xo]=s}catch(b){pe(e,e.return,b)}}break;case 6:if(Mt(t,e),Gt(e),r&4){if(e.stateNode===null)throw Error(I(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(b){pe(e,e.return,b)}}break;case 3:if(Mt(t,e),Gt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ho(t.containerInfo)}catch(b){pe(e,e.return,b)}break;case 4:Mt(t,e),Gt(e);break;case 13:Mt(t,e),Gt(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Ff=ye())),r&4&&Yg(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Be=(u=Be)||d,Mt(t,e),Be=u):Mt(t,e),Gt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(V=e,d=e.child;d!==null;){for(h=V=d;V!==null;){switch(p=V,g=p.child,p.tag){case 0:case 11:case 14:case 15:Zs(4,p,p.return);break;case 1:Ai(p,p.return);var x=p.stateNode;if(typeof x.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(b){pe(r,n,b)}}break;case 5:Ai(p,p.return);break;case 22:if(p.memoizedState!==null){Qg(h);continue}}g!==null?(g.return=p,V=g):Qg(h)}d=d.sibling}e:for(d=null,h=e;;){if(h.tag===5){if(d===null){d=h;try{i=h.stateNode,u?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=h.stateNode,c=h.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=uy("display",a))}catch(b){pe(e,e.return,b)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(b){pe(e,e.return,b)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Mt(t,e),Gt(e),r&4&&Yg(e);break;case 21:break;default:Mt(t,e),Gt(e)}}function Gt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Nv(n)){var r=n;break e}n=n.return}throw Error(I(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(ao(i,""),r.flags&=-33);var s=Kg(e);lh(e,s,i);break;case 3:case 4:var a=r.stateNode.containerInfo,l=Kg(e);ah(e,l,a);break;default:throw Error(I(161))}}catch(c){pe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function fS(e,t,n){V=e,Ov(e)}function Ov(e,t,n){for(var r=(e.mode&1)!==0;V!==null;){var i=V,s=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||ca;if(!a){var l=i.alternate,c=l!==null&&l.memoizedState!==null||Be;l=ca;var u=Be;if(ca=a,(Be=c)&&!u)for(V=i;V!==null;)a=V,c=a.child,a.tag===22&&a.memoizedState!==null?Xg(i):c!==null?(c.return=a,V=c):Xg(i);for(;s!==null;)V=s,Ov(s),s=s.sibling;V=i,ca=l,Be=u}qg(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,V=s):qg(e)}}function qg(e){for(;V!==null;){var t=V;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Be||ac(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Be)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Nt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Mg(t,s,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Mg(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&ho(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(I(163))}Be||t.flags&512&&oh(t)}catch(p){pe(t,t.return,p)}}if(t===e){V=null;break}if(n=t.sibling,n!==null){n.return=t.return,V=n;break}V=t.return}}function Qg(e){for(;V!==null;){var t=V;if(t===e){V=null;break}var n=t.sibling;if(n!==null){n.return=t.return,V=n;break}V=t.return}}function Xg(e){for(;V!==null;){var t=V;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ac(4,t)}catch(c){pe(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){pe(t,i,c)}}var s=t.return;try{oh(t)}catch(c){pe(t,s,c)}break;case 5:var a=t.return;try{oh(t)}catch(c){pe(t,a,c)}}}catch(c){pe(t,t.return,c)}if(t===e){V=null;break}var l=t.sibling;if(l!==null){l.return=t.return,V=l;break}V=t.return}}var pS=Math.ceil,Pl=$n.ReactCurrentDispatcher,Mf=$n.ReactCurrentOwner,Tt=$n.ReactCurrentBatchConfig,Y=0,Re=null,Se=null,Ne=0,dt=0,Di=sr(0),Te=0,So=null,Kr=0,lc=0,If=0,Js=null,nt=null,Ff=0,Zi=1/0,un=null,Al=!1,ch=null,Yn=null,ua=!1,Vn=null,Dl=0,eo=0,uh=null,Ga=-1,Ka=0;function qe(){return Y&6?ye():Ga!==-1?Ga:Ga=ye()}function qn(e){return e.mode&1?Y&2&&Ne!==0?Ne&-Ne:X2.transition!==null?(Ka===0&&(Ka=Sy()),Ka):(e=Z,e!==0||(e=window.event,e=e===void 0?16:Ay(e.type)),e):1}function Vt(e,t,n,r){if(50<eo)throw eo=0,uh=null,Error(I(185));Fo(e,n,r),(!(Y&2)||e!==Re)&&(e===Re&&(!(Y&2)&&(lc|=n),Te===4&&Ln(e,Ne)),lt(e,r),n===1&&Y===0&&!(t.mode&1)&&(Zi=ye()+500,ic&&or()))}function lt(e,t){var n=e.callbackNode;Xj(e,t);var r=pl(e,e===Re?Ne:0);if(r===0)n!==null&&og(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&og(n),t===1)e.tag===0?Q2(Zg.bind(null,e)):qy(Zg.bind(null,e)),G2(function(){!(Y&6)&&or()}),n=null;else{switch(ky(r)){case 1:n=af;break;case 4:n=by;break;case 16:n=fl;break;case 536870912:n=jy;break;default:n=fl}n=Kv(n,zv.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function zv(e,t){if(Ga=-1,Ka=0,Y&6)throw Error(I(327));var n=e.callbackNode;if(Ui()&&e.callbackNode!==n)return null;var r=pl(e,e===Re?Ne:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Rl(e,r);else{t=r;var i=Y;Y|=2;var s=Bv();(Re!==e||Ne!==t)&&(un=null,Zi=ye()+500,Or(e,t));do try{xS();break}catch(l){Vv(e,l)}while(!0);wf(),Pl.current=s,Y=i,Se!==null?t=0:(Re=null,Ne=0,t=Te)}if(t!==0){if(t===2&&(i=_d(e),i!==0&&(r=i,t=dh(e,i))),t===1)throw n=So,Or(e,0),Ln(e,r),lt(e,ye()),n;if(t===6)Ln(e,r);else{if(i=e.current.alternate,!(r&30)&&!gS(i)&&(t=Rl(e,r),t===2&&(s=_d(e),s!==0&&(r=s,t=dh(e,s))),t===1))throw n=So,Or(e,0),Ln(e,r),lt(e,ye()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(I(345));case 2:Pr(e,nt,un);break;case 3:if(Ln(e,r),(r&130023424)===r&&(t=Ff+500-ye(),10<t)){if(pl(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){qe(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Wd(Pr.bind(null,e,nt,un),t);break}Pr(e,nt,un);break;case 4:if(Ln(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-zt(r);s=1<<a,a=t[a],a>i&&(i=a),r&=~s}if(r=i,r=ye()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*pS(r/1960))-r,10<r){e.timeoutHandle=Wd(Pr.bind(null,e,nt,un),r);break}Pr(e,nt,un);break;case 5:Pr(e,nt,un);break;default:throw Error(I(329))}}}return lt(e,ye()),e.callbackNode===n?zv.bind(null,e):null}function dh(e,t){var n=Js;return e.current.memoizedState.isDehydrated&&(Or(e,t).flags|=256),e=Rl(e,t),e!==2&&(t=nt,nt=n,t!==null&&hh(t)),e}function hh(e){nt===null?nt=e:nt.push.apply(nt,e)}function gS(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Ht(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ln(e,t){for(t&=~If,t&=~lc,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-zt(t),r=1<<n;e[n]=-1,t&=~r}}function Zg(e){if(Y&6)throw Error(I(327));Ui();var t=pl(e,0);if(!(t&1))return lt(e,ye()),null;var n=Rl(e,t);if(e.tag!==0&&n===2){var r=_d(e);r!==0&&(t=r,n=dh(e,r))}if(n===1)throw n=So,Or(e,0),Ln(e,t),lt(e,ye()),n;if(n===6)throw Error(I(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Pr(e,nt,un),lt(e,ye()),null}function Nf(e,t){var n=Y;Y|=1;try{return e(t)}finally{Y=n,Y===0&&(Zi=ye()+500,ic&&or())}}function Yr(e){Vn!==null&&Vn.tag===0&&!(Y&6)&&Ui();var t=Y;Y|=1;var n=Tt.transition,r=Z;try{if(Tt.transition=null,Z=1,e)return e()}finally{Z=r,Tt.transition=n,Y=t,!(Y&6)&&or()}}function _f(){dt=Di.current,se(Di)}function Or(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,W2(n)),Se!==null)for(n=Se.return;n!==null;){var r=n;switch(xf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&vl();break;case 3:Qi(),se(ot),se(Ue),$f();break;case 5:Cf(r);break;case 4:Qi();break;case 13:se(ce);break;case 19:se(ce);break;case 10:bf(r.type._context);break;case 22:case 23:_f()}n=n.return}if(Re=e,Se=e=Qn(e.current,null),Ne=dt=t,Te=0,So=null,If=lc=Kr=0,nt=Js=null,Ir!==null){for(t=0;t<Ir.length;t++)if(n=Ir[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var a=s.next;s.next=i,r.next=a}n.pending=r}Ir=null}return e}function Vv(e,t){do{var n=Se;try{if(wf(),Ha.current=El,Tl){for(var r=de.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Tl=!1}if(Gr=0,Pe=ke=de=null,Xs=!1,wo=0,Mf.current=null,n===null||n.return===null){Te=1,So=t,Se=null;break}e:{var s=e,a=n.return,l=n,c=t;if(t=Ne,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=l,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var g=Og(a);if(g!==null){g.flags&=-257,zg(g,a,l,s,t),g.mode&1&&Lg(s,u,t),t=g,c=u;var x=t.updateQueue;if(x===null){var b=new Set;b.add(c),t.updateQueue=b}else x.add(c);break e}else{if(!(t&1)){Lg(s,u,t),Lf();break e}c=Error(I(426))}}else if(ae&&l.mode&1){var S=Og(a);if(S!==null){!(S.flags&65536)&&(S.flags|=256),zg(S,a,l,s,t),yf(Xi(c,l));break e}}s=c=Xi(c,l),Te!==4&&(Te=2),Js===null?Js=[s]:Js.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var m=kv(s,c,t);Rg(s,m);break e;case 1:l=c;var y=s.type,w=s.stateNode;if(!(s.flags&128)&&(typeof y.getDerivedStateFromError=="function"||w!==null&&typeof w.componentDidCatch=="function"&&(Yn===null||!Yn.has(w)))){s.flags|=65536,t&=-t,s.lanes|=t;var $=Cv(s,l,t);Rg(s,$);break e}}s=s.return}while(s!==null)}Uv(n)}catch(j){t=j,Se===n&&n!==null&&(Se=n=n.return);continue}break}while(!0)}function Bv(){var e=Pl.current;return Pl.current=El,e===null?El:e}function Lf(){(Te===0||Te===3||Te===2)&&(Te=4),Re===null||!(Kr&268435455)&&!(lc&268435455)||Ln(Re,Ne)}function Rl(e,t){var n=Y;Y|=2;var r=Bv();(Re!==e||Ne!==t)&&(un=null,Or(e,t));do try{mS();break}catch(i){Vv(e,i)}while(!0);if(wf(),Y=n,Pl.current=r,Se!==null)throw Error(I(261));return Re=null,Ne=0,Te}function mS(){for(;Se!==null;)Hv(Se)}function xS(){for(;Se!==null&&!Bj();)Hv(Se)}function Hv(e){var t=Gv(e.alternate,e,dt);e.memoizedProps=e.pendingProps,t===null?Uv(e):Se=t,Mf.current=null}function Uv(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=uS(n,t),n!==null){n.flags&=32767,Se=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Te=6,Se=null;return}}else if(n=cS(n,t,dt),n!==null){Se=n;return}if(t=t.sibling,t!==null){Se=t;return}Se=t=e}while(t!==null);Te===0&&(Te=5)}function Pr(e,t,n){var r=Z,i=Tt.transition;try{Tt.transition=null,Z=1,yS(e,t,n,r)}finally{Tt.transition=i,Z=r}return null}function yS(e,t,n,r){do Ui();while(Vn!==null);if(Y&6)throw Error(I(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(I(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(Zj(e,s),e===Re&&(Se=Re=null,Ne=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ua||(ua=!0,Kv(fl,function(){return Ui(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Tt.transition,Tt.transition=null;var a=Z;Z=1;var l=Y;Y|=4,Mf.current=null,hS(e,n),Lv(n,e),L2(Hd),gl=!!Bd,Hd=Bd=null,e.current=n,fS(n),Hj(),Y=l,Z=a,Tt.transition=s}else e.current=n;if(ua&&(ua=!1,Vn=e,Dl=i),s=e.pendingLanes,s===0&&(Yn=null),Gj(n.stateNode),lt(e,ye()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Al)throw Al=!1,e=ch,ch=null,e;return Dl&1&&e.tag!==0&&Ui(),s=e.pendingLanes,s&1?e===uh?eo++:(eo=0,uh=e):eo=0,or(),null}function Ui(){if(Vn!==null){var e=ky(Dl),t=Tt.transition,n=Z;try{if(Tt.transition=null,Z=16>e?16:e,Vn===null)var r=!1;else{if(e=Vn,Vn=null,Dl=0,Y&6)throw Error(I(331));var i=Y;for(Y|=4,V=e.current;V!==null;){var s=V,a=s.child;if(V.flags&16){var l=s.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(V=u;V!==null;){var d=V;switch(d.tag){case 0:case 11:case 15:Zs(8,d,s)}var h=d.child;if(h!==null)h.return=d,V=h;else for(;V!==null;){d=V;var p=d.sibling,g=d.return;if(Fv(d),d===u){V=null;break}if(p!==null){p.return=g,V=p;break}V=g}}}var x=s.alternate;if(x!==null){var b=x.child;if(b!==null){x.child=null;do{var S=b.sibling;b.sibling=null,b=S}while(b!==null)}}V=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,V=a;else e:for(;V!==null;){if(s=V,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Zs(9,s,s.return)}var m=s.sibling;if(m!==null){m.return=s.return,V=m;break e}V=s.return}}var y=e.current;for(V=y;V!==null;){a=V;var w=a.child;if(a.subtreeFlags&2064&&w!==null)w.return=a,V=w;else e:for(a=y;V!==null;){if(l=V,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ac(9,l)}}catch(j){pe(l,l.return,j)}if(l===a){V=null;break e}var $=l.sibling;if($!==null){$.return=l.return,V=$;break e}V=l.return}}if(Y=i,or(),Jt&&typeof Jt.onPostCommitFiberRoot=="function")try{Jt.onPostCommitFiberRoot(Jl,e)}catch{}r=!0}return r}finally{Z=n,Tt.transition=t}}return!1}function Jg(e,t,n){t=Xi(n,t),t=kv(e,t,1),e=Kn(e,t,1),t=qe(),e!==null&&(Fo(e,1,t),lt(e,t))}function pe(e,t,n){if(e.tag===3)Jg(e,e,n);else for(;t!==null;){if(t.tag===3){Jg(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Yn===null||!Yn.has(r))){e=Xi(n,e),e=Cv(t,e,1),t=Kn(t,e,1),e=qe(),t!==null&&(Fo(t,1,e),lt(t,e));break}}t=t.return}}function vS(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=qe(),e.pingedLanes|=e.suspendedLanes&n,Re===e&&(Ne&n)===n&&(Te===4||Te===3&&(Ne&130023424)===Ne&&500>ye()-Ff?Or(e,0):If|=n),lt(e,t)}function Wv(e,t){t===0&&(e.mode&1?(t=ea,ea<<=1,!(ea&130023424)&&(ea=4194304)):t=1);var n=qe();e=bn(e,t),e!==null&&(Fo(e,t,n),lt(e,n))}function wS(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Wv(e,n)}function bS(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(I(314))}r!==null&&r.delete(t),Wv(e,n)}var Gv;Gv=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ot.current)it=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return it=!1,lS(e,t,n);it=!!(e.flags&131072)}else it=!1,ae&&t.flags&1048576&&Qy(t,jl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Wa(e,t),e=t.pendingProps;var i=Ki(t,Ue.current);Hi(t,n),i=Ef(null,t,r,e,i,n);var s=Pf();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,at(r)?(s=!0,wl(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Sf(t),i.updater=oc,t.stateNode=i,i._reactInternals=t,Zd(t,r,e,n),t=th(null,t,r,!0,s,n)):(t.tag=0,ae&&s&&mf(t),Ge(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Wa(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=SS(r),e=Nt(r,e),i){case 0:t=eh(null,t,r,e,n);break e;case 1:t=Hg(null,t,r,e,n);break e;case 11:t=Vg(null,t,r,e,n);break e;case 14:t=Bg(null,t,r,Nt(r.type,e),n);break e}throw Error(I(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),eh(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),Hg(e,t,r,i,n);case 3:e:{if(Pv(t),e===null)throw Error(I(387));r=t.pendingProps,s=t.memoizedState,i=s.element,nv(e,t),Cl(t,r,null,n);var a=t.memoizedState;if(r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=Xi(Error(I(423)),t),t=Ug(e,t,r,n,i);break e}else if(r!==i){i=Xi(Error(I(424)),t),t=Ug(e,t,r,n,i);break e}else for(ht=Gn(t.stateNode.containerInfo.firstChild),ft=t,ae=!0,Lt=null,n=ev(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Yi(),r===i){t=jn(e,t,n);break e}Ge(e,t,r,n)}t=t.child}return t;case 5:return rv(t),e===null&&qd(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,a=i.children,Ud(r,i)?a=null:s!==null&&Ud(r,s)&&(t.flags|=32),Ev(e,t),Ge(e,t,a,n),t.child;case 6:return e===null&&qd(t),null;case 13:return Av(e,t,n);case 4:return kf(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=qi(t,null,r,n):Ge(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),Vg(e,t,r,i,n);case 7:return Ge(e,t,t.pendingProps,n),t.child;case 8:return Ge(e,t,t.pendingProps.children,n),t.child;case 12:return Ge(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,a=i.value,ne(Sl,r._currentValue),r._currentValue=a,s!==null)if(Ht(s.value,a)){if(s.children===i.children&&!ot.current){t=jn(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var l=s.dependencies;if(l!==null){a=s.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=gn(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Qd(s.return,n,t),l.lanes|=n;break}c=c.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(I(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Qd(a,n,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}Ge(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Hi(t,n),i=Et(i),r=r(i),t.flags|=1,Ge(e,t,r,n),t.child;case 14:return r=t.type,i=Nt(r,t.pendingProps),i=Nt(r.type,i),Bg(e,t,r,i,n);case 15:return $v(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nt(r,i),Wa(e,t),t.tag=1,at(r)?(e=!0,wl(t)):e=!1,Hi(t,n),Sv(t,r,i),Zd(t,r,i,n),th(null,t,r,!0,e,n);case 19:return Dv(e,t,n);case 22:return Tv(e,t,n)}throw Error(I(156,t.tag))};function Kv(e,t){return wy(e,t)}function jS(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $t(e,t,n,r){return new jS(e,t,n,r)}function Of(e){return e=e.prototype,!(!e||!e.isReactComponent)}function SS(e){if(typeof e=="function")return Of(e)?1:0;if(e!=null){if(e=e.$$typeof,e===rf)return 11;if(e===sf)return 14}return 2}function Qn(e,t){var n=e.alternate;return n===null?(n=$t(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ya(e,t,n,r,i,s){var a=2;if(r=e,typeof e=="function")Of(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case bi:return zr(n.children,i,s,t);case nf:a=8,i|=8;break;case jd:return e=$t(12,n,t,i|2),e.elementType=jd,e.lanes=s,e;case Sd:return e=$t(13,n,t,i),e.elementType=Sd,e.lanes=s,e;case kd:return e=$t(19,n,t,i),e.elementType=kd,e.lanes=s,e;case ry:return cc(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ty:a=10;break e;case ny:a=9;break e;case rf:a=11;break e;case sf:a=14;break e;case Fn:a=16,r=null;break e}throw Error(I(130,e==null?e:typeof e,""))}return t=$t(a,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function zr(e,t,n,r){return e=$t(7,e,r,t),e.lanes=n,e}function cc(e,t,n,r){return e=$t(22,e,r,t),e.elementType=ry,e.lanes=n,e.stateNode={isHidden:!1},e}function su(e,t,n){return e=$t(6,e,null,t),e.lanes=n,e}function ou(e,t,n){return t=$t(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function kS(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zc(0),this.expirationTimes=zc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function zf(e,t,n,r,i,s,a,l,c){return e=new kS(e,t,n,l,c),t===1?(t=1,s===!0&&(t|=8)):t=0,s=$t(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Sf(s),e}function CS(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:wi,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Yv(e){if(!e)return er;e=e._reactInternals;e:{if(Jr(e)!==e||e.tag!==1)throw Error(I(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(at(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(I(171))}if(e.tag===1){var n=e.type;if(at(n))return Yy(e,n,t)}return t}function qv(e,t,n,r,i,s,a,l,c){return e=zf(n,r,!0,e,i,s,a,l,c),e.context=Yv(null),n=e.current,r=qe(),i=qn(n),s=gn(r,i),s.callback=t??null,Kn(n,s,i),e.current.lanes=i,Fo(e,i,r),lt(e,r),e}function uc(e,t,n,r){var i=t.current,s=qe(),a=qn(i);return n=Yv(n),t.context===null?t.context=n:t.pendingContext=n,t=gn(s,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Kn(i,t,a),e!==null&&(Vt(e,i,a,s),Ba(e,i,a)),a}function Ml(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function em(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vf(e,t){em(e,t),(e=e.alternate)&&em(e,t)}function $S(){return null}var Qv=typeof reportError=="function"?reportError:function(e){console.error(e)};function Bf(e){this._internalRoot=e}dc.prototype.render=Bf.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(I(409));uc(e,t,null,null)};dc.prototype.unmount=Bf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Yr(function(){uc(null,e,null,null)}),t[wn]=null}};function dc(e){this._internalRoot=e}dc.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ty();e={blockedOn:null,target:e,priority:t};for(var n=0;n<_n.length&&t!==0&&t<_n[n].priority;n++);_n.splice(n,0,e),n===0&&Py(e)}};function Hf(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function tm(){}function TS(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var u=Ml(a);s.call(u)}}var a=qv(t,r,e,0,null,!1,!1,"",tm);return e._reactRootContainer=a,e[wn]=a.current,go(e.nodeType===8?e.parentNode:e),Yr(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var u=Ml(c);l.call(u)}}var c=zf(e,0,!1,null,null,!1,!1,"",tm);return e._reactRootContainer=c,e[wn]=c.current,go(e.nodeType===8?e.parentNode:e),Yr(function(){uc(t,c,n,r)}),c}function fc(e,t,n,r,i){var s=n._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var l=i;i=function(){var c=Ml(a);l.call(c)}}uc(t,a,e,i)}else a=TS(n,t,e,i,r);return Ml(a)}Cy=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Os(t.pendingLanes);n!==0&&(lf(t,n|1),lt(t,ye()),!(Y&6)&&(Zi=ye()+500,or()))}break;case 13:Yr(function(){var r=bn(e,1);if(r!==null){var i=qe();Vt(r,e,1,i)}}),Vf(e,1)}};cf=function(e){if(e.tag===13){var t=bn(e,134217728);if(t!==null){var n=qe();Vt(t,e,134217728,n)}Vf(e,134217728)}};$y=function(e){if(e.tag===13){var t=qn(e),n=bn(e,t);if(n!==null){var r=qe();Vt(n,e,t,r)}Vf(e,t)}};Ty=function(){return Z};Ey=function(e,t){var n=Z;try{return Z=e,t()}finally{Z=n}};Id=function(e,t,n){switch(t){case"input":if(Td(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=rc(r);if(!i)throw Error(I(90));sy(r),Td(r,i)}}}break;case"textarea":ay(e,n);break;case"select":t=n.value,t!=null&&Oi(e,!!n.multiple,t,!1)}};py=Nf;gy=Yr;var ES={usingClientEntryPoint:!1,Events:[_o,Ci,rc,hy,fy,Nf]},ks={findFiberByHostInstance:Mr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},PS={bundleType:ks.bundleType,version:ks.version,rendererPackageName:ks.rendererPackageName,rendererConfig:ks.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:$n.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=yy(e),e===null?null:e.stateNode},findFiberByHostInstance:ks.findFiberByHostInstance||$S,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var da=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!da.isDisabled&&da.supportsFiber)try{Jl=da.inject(PS),Jt=da}catch{}}xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ES;xt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Hf(t))throw Error(I(200));return CS(e,t,null,n)};xt.createRoot=function(e,t){if(!Hf(e))throw Error(I(299));var n=!1,r="",i=Qv;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=zf(e,1,!1,null,null,n,!1,r,i),e[wn]=t.current,go(e.nodeType===8?e.parentNode:e),new Bf(t)};xt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(I(188)):(e=Object.keys(e).join(","),Error(I(268,e)));return e=yy(t),e=e===null?null:e.stateNode,e};xt.flushSync=function(e){return Yr(e)};xt.hydrate=function(e,t,n){if(!hc(t))throw Error(I(200));return fc(null,e,t,!0,n)};xt.hydrateRoot=function(e,t,n){if(!Hf(e))throw Error(I(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",a=Qv;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=qv(t,null,e,1,n??null,i,!1,s,a),e[wn]=t.current,go(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new dc(t)};xt.render=function(e,t,n){if(!hc(t))throw Error(I(200));return fc(null,e,t,!1,n)};xt.unmountComponentAtNode=function(e){if(!hc(e))throw Error(I(40));return e._reactRootContainer?(Yr(function(){fc(null,null,e,!1,function(){e._reactRootContainer=null,e[wn]=null})}),!0):!1};xt.unstable_batchedUpdates=Nf;xt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!hc(n))throw Error(I(200));if(e==null||e._reactInternals===void 0)throw Error(I(38));return fc(e,t,n,!1,r)};xt.version="18.3.1-next-f1338f8080-20240426";function Xv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Xv)}catch(e){console.error(e)}}Xv(),Xx.exports=xt;var AS=Xx.exports,nm=AS;wd.createRoot=nm.createRoot,wd.hydrateRoot=nm.hydrateRoot;var De=function(){return De=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},De.apply(this,arguments)};function ko(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,s;r<i;r++)(s||!(r in t))&&(s||(s=Array.prototype.slice.call(t,0,r)),s[r]=t[r]);return e.concat(s||Array.prototype.slice.call(t))}var ie="-ms-",to="-moz-",Q="-webkit-",Zv="comm",pc="rule",Uf="decl",DS="@import",Jv="@keyframes",RS="@layer",e1=Math.abs,Wf=String.fromCharCode,fh=Object.assign;function MS(e,t){return Ae(e,0)^45?(((t<<2^Ae(e,0))<<2^Ae(e,1))<<2^Ae(e,2))<<2^Ae(e,3):0}function t1(e){return e.trim()}function dn(e,t){return(e=t.exec(e))?e[0]:e}function G(e,t,n){return e.replace(t,n)}function qa(e,t,n){return e.indexOf(t,n)}function Ae(e,t){return e.charCodeAt(t)|0}function Ji(e,t,n){return e.slice(t,n)}function qt(e){return e.length}function n1(e){return e.length}function Vs(e,t){return t.push(e),e}function IS(e,t){return e.map(t).join("")}function rm(e,t){return e.filter(function(n){return!dn(n,t)})}var gc=1,es=1,r1=0,At=0,je=0,us="";function mc(e,t,n,r,i,s,a,l){return{value:e,root:t,parent:n,type:r,props:i,children:s,line:gc,column:es,length:a,return:"",siblings:l}}function Mn(e,t){return fh(mc("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function oi(e){for(;e.root;)e=Mn(e.root,{children:[e]});Vs(e,e.siblings)}function FS(){return je}function NS(){return je=At>0?Ae(us,--At):0,es--,je===10&&(es=1,gc--),je}function Bt(){return je=At<r1?Ae(us,At++):0,es++,je===10&&(es=1,gc++),je}function Vr(){return Ae(us,At)}function Qa(){return At}function xc(e,t){return Ji(us,e,t)}function ph(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function _S(e){return gc=es=1,r1=qt(us=e),At=0,[]}function LS(e){return us="",e}function au(e){return t1(xc(At-1,gh(e===91?e+2:e===40?e+1:e)))}function OS(e){for(;(je=Vr())&&je<33;)Bt();return ph(e)>2||ph(je)>3?"":" "}function zS(e,t){for(;--t&&Bt()&&!(je<48||je>102||je>57&&je<65||je>70&&je<97););return xc(e,Qa()+(t<6&&Vr()==32&&Bt()==32))}function gh(e){for(;Bt();)switch(je){case e:return At;case 34:case 39:e!==34&&e!==39&&gh(je);break;case 40:e===41&&gh(e);break;case 92:Bt();break}return At}function VS(e,t){for(;Bt()&&e+je!==57;)if(e+je===84&&Vr()===47)break;return"/*"+xc(t,At-1)+"*"+Wf(e===47?e:Bt())}function BS(e){for(;!ph(Vr());)Bt();return xc(e,At)}function HS(e){return LS(Xa("",null,null,null,[""],e=_S(e),0,[0],e))}function Xa(e,t,n,r,i,s,a,l,c){for(var u=0,d=0,h=a,p=0,g=0,x=0,b=1,S=1,m=1,y=0,w="",$=i,j=s,k=r,C=w;S;)switch(x=y,y=Bt()){case 40:if(x!=108&&Ae(C,h-1)==58){qa(C+=G(au(y),"&","&\f"),"&\f",e1(u?l[u-1]:0))!=-1&&(m=-1);break}case 34:case 39:case 91:C+=au(y);break;case 9:case 10:case 13:case 32:C+=OS(x);break;case 92:C+=zS(Qa()-1,7);continue;case 47:switch(Vr()){case 42:case 47:Vs(US(VS(Bt(),Qa()),t,n,c),c);break;default:C+="/"}break;case 123*b:l[u++]=qt(C)*m;case 125*b:case 59:case 0:switch(y){case 0:case 125:S=0;case 59+d:m==-1&&(C=G(C,/\f/g,"")),g>0&&qt(C)-h&&Vs(g>32?sm(C+";",r,n,h-1,c):sm(G(C," ","")+";",r,n,h-2,c),c);break;case 59:C+=";";default:if(Vs(k=im(C,t,n,u,d,i,l,w,$=[],j=[],h,s),s),y===123)if(d===0)Xa(C,t,k,k,$,s,h,l,j);else switch(p===99&&Ae(C,3)===110?100:p){case 100:case 108:case 109:case 115:Xa(e,k,k,r&&Vs(im(e,k,k,0,0,i,l,w,i,$=[],h,j),j),i,j,h,l,r?$:j);break;default:Xa(C,k,k,k,[""],j,0,l,j)}}u=d=g=0,b=m=1,w=C="",h=a;break;case 58:h=1+qt(C),g=x;default:if(b<1){if(y==123)--b;else if(y==125&&b++==0&&NS()==125)continue}switch(C+=Wf(y),y*b){case 38:m=d>0?1:(C+="\f",-1);break;case 44:l[u++]=(qt(C)-1)*m,m=1;break;case 64:Vr()===45&&(C+=au(Bt())),p=Vr(),d=h=qt(w=C+=BS(Qa())),y++;break;case 45:x===45&&qt(C)==2&&(b=0)}}return s}function im(e,t,n,r,i,s,a,l,c,u,d,h){for(var p=i-1,g=i===0?s:[""],x=n1(g),b=0,S=0,m=0;b<r;++b)for(var y=0,w=Ji(e,p+1,p=e1(S=a[b])),$=e;y<x;++y)($=t1(S>0?g[y]+" "+w:G(w,/&\f/g,g[y])))&&(c[m++]=$);return mc(e,t,n,i===0?pc:l,c,u,d,h)}function US(e,t,n,r){return mc(e,t,n,Zv,Wf(FS()),Ji(e,2,-2),0,r)}function sm(e,t,n,r,i){return mc(e,t,n,Uf,Ji(e,0,r),Ji(e,r+1,-1),r,i)}function i1(e,t,n){switch(MS(e,t)){case 5103:return Q+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Q+e+e;case 4789:return to+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Q+e+to+e+ie+e+e;case 5936:switch(Ae(e,t+11)){case 114:return Q+e+ie+G(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Q+e+ie+G(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Q+e+ie+G(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Q+e+ie+e+e;case 6165:return Q+e+ie+"flex-"+e+e;case 5187:return Q+e+G(e,/(\w+).+(:[^]+)/,Q+"box-$1$2"+ie+"flex-$1$2")+e;case 5443:return Q+e+ie+"flex-item-"+G(e,/flex-|-self/g,"")+(dn(e,/flex-|baseline/)?"":ie+"grid-row-"+G(e,/flex-|-self/g,""))+e;case 4675:return Q+e+ie+"flex-line-pack"+G(e,/align-content|flex-|-self/g,"")+e;case 5548:return Q+e+ie+G(e,"shrink","negative")+e;case 5292:return Q+e+ie+G(e,"basis","preferred-size")+e;case 6060:return Q+"box-"+G(e,"-grow","")+Q+e+ie+G(e,"grow","positive")+e;case 4554:return Q+G(e,/([^-])(transform)/g,"$1"+Q+"$2")+e;case 6187:return G(G(G(e,/(zoom-|grab)/,Q+"$1"),/(image-set)/,Q+"$1"),e,"")+e;case 5495:case 3959:return G(e,/(image-set\([^]*)/,Q+"$1$`$1");case 4968:return G(G(e,/(.+:)(flex-)?(.*)/,Q+"box-pack:$3"+ie+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Q+e+e;case 4200:if(!dn(e,/flex-|baseline/))return ie+"grid-column-align"+Ji(e,t)+e;break;case 2592:case 3360:return ie+G(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,i){return t=i,dn(r.props,/grid-\w+-end/)})?~qa(e+(n=n[t].value),"span",0)?e:ie+G(e,"-start","")+e+ie+"grid-row-span:"+(~qa(n,"span",0)?dn(n,/\d+/):+dn(n,/\d+/)-+dn(e,/\d+/))+";":ie+G(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return dn(r.props,/grid-\w+-start/)})?e:ie+G(G(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return G(e,/(.+)-inline(.+)/,Q+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(qt(e)-1-t>6)switch(Ae(e,t+1)){case 109:if(Ae(e,t+4)!==45)break;case 102:return G(e,/(.+:)(.+)-([^]+)/,"$1"+Q+"$2-$3$1"+to+(Ae(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~qa(e,"stretch",0)?i1(G(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return G(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,i,s,a,l,c,u){return ie+i+":"+s+u+(a?ie+i+"-span:"+(l?c:+c-+s)+u:"")+e});case 4949:if(Ae(e,t+6)===121)return G(e,":",":"+Q)+e;break;case 6444:switch(Ae(e,Ae(e,14)===45?18:11)){case 120:return G(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Q+(Ae(e,14)===45?"inline-":"")+"box$3$1"+Q+"$2$3$1"+ie+"$2box$3")+e;case 100:return G(e,":",":"+ie)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return G(e,"scroll-","scroll-snap-")+e}return e}function Il(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function WS(e,t,n,r){switch(e.type){case RS:if(e.children.length)break;case DS:case Uf:return e.return=e.return||e.value;case Zv:return"";case Jv:return e.return=e.value+"{"+Il(e.children,r)+"}";case pc:if(!qt(e.value=e.props.join(",")))return""}return qt(n=Il(e.children,r))?e.return=e.value+"{"+n+"}":""}function GS(e){var t=n1(e);return function(n,r,i,s){for(var a="",l=0;l<t;l++)a+=e[l](n,r,i,s)||"";return a}}function KS(e){return function(t){t.root||(t=t.return)&&e(t)}}function YS(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Uf:e.return=i1(e.value,e.length,n);return;case Jv:return Il([Mn(e,{value:G(e.value,"@","@"+Q)})],r);case pc:if(e.length)return IS(n=e.props,function(i){switch(dn(i,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":oi(Mn(e,{props:[G(i,/:(read-\w+)/,":"+to+"$1")]})),oi(Mn(e,{props:[i]})),fh(e,{props:rm(n,r)});break;case"::placeholder":oi(Mn(e,{props:[G(i,/:(plac\w+)/,":"+Q+"input-$1")]})),oi(Mn(e,{props:[G(i,/:(plac\w+)/,":"+to+"$1")]})),oi(Mn(e,{props:[G(i,/:(plac\w+)/,ie+"input-$1")]})),oi(Mn(e,{props:[i]})),fh(e,{props:rm(n,r)});break}return""})}}var qS={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ut={},ts=typeof process<"u"&&ut!==void 0&&(ut.REACT_APP_SC_ATTR||ut.SC_ATTR)||"data-styled",s1="active",o1="data-styled-version",yc="6.1.19",Gf=`/*!sc*/
`,Fl=typeof window<"u"&&typeof document<"u",QS=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&ut!==void 0&&ut.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&ut.REACT_APP_SC_DISABLE_SPEEDY!==""?ut.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&ut.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&ut!==void 0&&ut.SC_DISABLE_SPEEDY!==void 0&&ut.SC_DISABLE_SPEEDY!==""&&ut.SC_DISABLE_SPEEDY!=="false"&&ut.SC_DISABLE_SPEEDY),XS={},vc=Object.freeze([]),ns=Object.freeze({});function a1(e,t,n){return n===void 0&&(n=ns),e.theme!==n.theme&&e.theme||t||n.theme}var l1=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ZS=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,JS=/(^-|-$)/g;function om(e){return e.replace(ZS,"-").replace(JS,"")}var ek=/(a)(d)/gi,ha=52,am=function(e){return String.fromCharCode(e+(e>25?39:97))};function mh(e){var t,n="";for(t=Math.abs(e);t>ha;t=t/ha|0)n=am(t%ha)+n;return(am(t%ha)+n).replace(ek,"$1-$2")}var lu,c1=5381,Ri=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},u1=function(e){return Ri(c1,e)};function d1(e){return mh(u1(e)>>>0)}function tk(e){return e.displayName||e.name||"Component"}function cu(e){return typeof e=="string"&&!0}var h1=typeof Symbol=="function"&&Symbol.for,f1=h1?Symbol.for("react.memo"):60115,nk=h1?Symbol.for("react.forward_ref"):60112,rk={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ik={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},p1={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},sk=((lu={})[nk]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},lu[f1]=p1,lu);function lm(e){return("type"in(t=e)&&t.type.$$typeof)===f1?p1:"$$typeof"in e?sk[e.$$typeof]:rk;var t}var ok=Object.defineProperty,ak=Object.getOwnPropertyNames,cm=Object.getOwnPropertySymbols,lk=Object.getOwnPropertyDescriptor,ck=Object.getPrototypeOf,um=Object.prototype;function g1(e,t,n){if(typeof t!="string"){if(um){var r=ck(t);r&&r!==um&&g1(e,r,n)}var i=ak(t);cm&&(i=i.concat(cm(t)));for(var s=lm(e),a=lm(t),l=0;l<i.length;++l){var c=i[l];if(!(c in ik||n&&n[c]||a&&c in a||s&&c in s)){var u=lk(t,c);try{ok(e,c,u)}catch{}}}}return e}function qr(e){return typeof e=="function"}function Kf(e){return typeof e=="object"&&"styledComponentId"in e}function Nr(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function xh(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Co(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function yh(e,t,n){if(n===void 0&&(n=!1),!n&&!Co(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=yh(e[r],t[r]);else if(Co(t))for(var r in t)e[r]=yh(e[r],t[r]);return e}function Yf(e,t){Object.defineProperty(e,"toString",{value:t})}function Qr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var uk=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,i=r.length,s=i;t>=s;)if((s<<=1)<0)throw Qr(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(r),this.length=s;for(var a=i;a<s;a++)this.groupSizes[a]=0}for(var l=this.indexOfGroup(t+1),c=(a=0,n.length);a<c;a++)this.tag.insertRule(l,n[a])&&(this.groupSizes[t]++,l++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),i=r+n;this.groupSizes[t]=0;for(var s=r;s<i;s++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],i=this.indexOfGroup(t),s=i+r,a=i;a<s;a++)n+="".concat(this.tag.getRule(a)).concat(Gf);return n},e}(),Za=new Map,Nl=new Map,Ja=1,fa=function(e){if(Za.has(e))return Za.get(e);for(;Nl.has(Ja);)Ja++;var t=Ja++;return Za.set(e,t),Nl.set(t,e),t},dk=function(e,t){Ja=t+1,Za.set(e,t),Nl.set(t,e)},hk="style[".concat(ts,"][").concat(o1,'="').concat(yc,'"]'),fk=new RegExp("^".concat(ts,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),pk=function(e,t,n){for(var r,i=n.split(","),s=0,a=i.length;s<a;s++)(r=i[s])&&e.registerName(t,r)},gk=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Gf),i=[],s=0,a=r.length;s<a;s++){var l=r[s].trim();if(l){var c=l.match(fk);if(c){var u=0|parseInt(c[1],10),d=c[2];u!==0&&(dk(d,u),pk(e,d,c[3]),e.getTag().insertRules(u,i)),i.length=0}else i.push(l)}}},dm=function(e){for(var t=document.querySelectorAll(hk),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(ts)!==s1&&(gk(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function mk(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var m1=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(l){var c=Array.from(l.querySelectorAll("style[".concat(ts,"]")));return c[c.length-1]}(n),s=i!==void 0?i.nextSibling:null;r.setAttribute(ts,s1),r.setAttribute(o1,yc);var a=mk();return a&&r.setAttribute("nonce",a),n.insertBefore(r,s),r},xk=function(){function e(t){this.element=m1(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,i=0,s=r.length;i<s;i++){var a=r[i];if(a.ownerNode===n)return a}throw Qr(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),yk=function(){function e(t){this.element=m1(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),vk=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),hm=Fl,wk={isServer:!Fl,useCSSOMInjection:!QS},_l=function(){function e(t,n,r){t===void 0&&(t=ns),n===void 0&&(n={});var i=this;this.options=De(De({},wk),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&Fl&&hm&&(hm=!1,dm(this)),Yf(this,function(){return function(s){for(var a=s.getTag(),l=a.length,c="",u=function(h){var p=function(m){return Nl.get(m)}(h);if(p===void 0)return"continue";var g=s.names.get(p),x=a.getGroup(h);if(g===void 0||!g.size||x.length===0)return"continue";var b="".concat(ts,".g").concat(h,'[id="').concat(p,'"]'),S="";g!==void 0&&g.forEach(function(m){m.length>0&&(S+="".concat(m,","))}),c+="".concat(x).concat(b,'{content:"').concat(S,'"}').concat(Gf)},d=0;d<l;d++)u(d);return c}(i)})}return e.registerId=function(t){return fa(t)},e.prototype.rehydrate=function(){!this.server&&Fl&&dm(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(De(De({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,i=n.target;return n.isServer?new vk(i):r?new xk(i):new yk(i)}(this.options),new uk(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(fa(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(fa(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(fa(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),bk=/&/g,jk=/^\s*\/\/.*$/gm;function x1(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=x1(n.children,t)),n})}function Sk(e){var t,n,r,i=ns,s=i.options,a=s===void 0?ns:s,l=i.plugins,c=l===void 0?vc:l,u=function(p,g,x){return x.startsWith(n)&&x.endsWith(n)&&x.replaceAll(n,"").length>0?".".concat(t):p},d=c.slice();d.push(function(p){p.type===pc&&p.value.includes("&")&&(p.props[0]=p.props[0].replace(bk,n).replace(r,u))}),a.prefix&&d.push(YS),d.push(WS);var h=function(p,g,x,b){g===void 0&&(g=""),x===void 0&&(x=""),b===void 0&&(b="&"),t=b,n=g,r=new RegExp("\\".concat(n,"\\b"),"g");var S=p.replace(jk,""),m=HS(x||g?"".concat(x," ").concat(g," { ").concat(S," }"):S);a.namespace&&(m=x1(m,a.namespace));var y=[];return Il(m,GS(d.concat(KS(function(w){return y.push(w)})))),y};return h.hash=c.length?c.reduce(function(p,g){return g.name||Qr(15),Ri(p,g.name)},c1).toString():"",h}var kk=new _l,vh=Sk(),y1=rt.createContext({shouldForwardProp:void 0,styleSheet:kk,stylis:vh});y1.Consumer;rt.createContext(void 0);function wh(){return v.useContext(y1)}var Ck=function(){function e(t,n){var r=this;this.inject=function(i,s){s===void 0&&(s=vh);var a=r.name+s.hash;i.hasNameForId(r.id,a)||i.insertRules(r.id,a,s(r.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Yf(this,function(){throw Qr(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=vh),this.name+t.hash},e}(),$k=function(e){return e>="A"&&e<="Z"};function fm(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;$k(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var v1=function(e){return e==null||e===!1||e===""},w1=function(e){var t,n,r=[];for(var i in e){var s=e[i];e.hasOwnProperty(i)&&!v1(s)&&(Array.isArray(s)&&s.isCss||qr(s)?r.push("".concat(fm(i),":"),s,";"):Co(s)?r.push.apply(r,ko(ko(["".concat(i," {")],w1(s),!1),["}"],!1)):r.push("".concat(fm(i),": ").concat((t=i,(n=s)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in qS||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Xn(e,t,n,r){if(v1(e))return[];if(Kf(e))return[".".concat(e.styledComponentId)];if(qr(e)){if(!qr(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var i=e(t);return Xn(i,t,n,r)}var s;return e instanceof Ck?n?(e.inject(n,r),[e.getName(r)]):[e]:Co(e)?w1(e):Array.isArray(e)?Array.prototype.concat.apply(vc,e.map(function(a){return Xn(a,t,n,r)})):[e.toString()]}function b1(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(qr(n)&&!Kf(n))return!1}return!0}var Tk=u1(yc),Ek=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&b1(t),this.componentId=n,this.baseHash=Ri(Tk,n),this.baseStyle=r,_l.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var i=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))i=Nr(i,this.staticRulesId);else{var s=xh(Xn(this.rules,t,n,r)),a=mh(Ri(this.baseHash,s)>>>0);if(!n.hasNameForId(this.componentId,a)){var l=r(s,".".concat(a),void 0,this.componentId);n.insertRules(this.componentId,a,l)}i=Nr(i,a),this.staticRulesId=a}else{for(var c=Ri(this.baseHash,r.hash),u="",d=0;d<this.rules.length;d++){var h=this.rules[d];if(typeof h=="string")u+=h;else if(h){var p=xh(Xn(h,t,n,r));c=Ri(c,p+d),u+=p}}if(u){var g=mh(c>>>0);n.hasNameForId(this.componentId,g)||n.insertRules(this.componentId,g,r(u,".".concat(g),void 0,this.componentId)),i=Nr(i,g)}}return i},e}(),$o=rt.createContext(void 0);$o.Consumer;function j1(e){var t=rt.useContext($o),n=v.useMemo(function(){return function(r,i){if(!r)throw Qr(14);if(qr(r)){var s=r(i);return s}if(Array.isArray(r)||typeof r!="object")throw Qr(8);return i?De(De({},i),r):r}(e.theme,t)},[e.theme,t]);return e.children?rt.createElement($o.Provider,{value:n},e.children):null}var uu={};function Pk(e,t,n){var r=Kf(e),i=e,s=!cu(e),a=t.attrs,l=a===void 0?vc:a,c=t.componentId,u=c===void 0?function($,j){var k=typeof $!="string"?"sc":om($);uu[k]=(uu[k]||0)+1;var C="".concat(k,"-").concat(d1(yc+k+uu[k]));return j?"".concat(j,"-").concat(C):C}(t.displayName,t.parentComponentId):c,d=t.displayName,h=d===void 0?function($){return cu($)?"styled.".concat($):"Styled(".concat(tk($),")")}(e):d,p=t.displayName&&t.componentId?"".concat(om(t.displayName),"-").concat(t.componentId):t.componentId||u,g=r&&i.attrs?i.attrs.concat(l).filter(Boolean):l,x=t.shouldForwardProp;if(r&&i.shouldForwardProp){var b=i.shouldForwardProp;if(t.shouldForwardProp){var S=t.shouldForwardProp;x=function($,j){return b($,j)&&S($,j)}}else x=b}var m=new Ek(n,p,r?i.componentStyle:void 0);function y($,j){return function(k,C,T){var P=k.attrs,A=k.componentStyle,D=k.defaultProps,W=k.foldedComponentIds,ee=k.styledComponentId,z=k.target,_=rt.useContext($o),N=wh(),M=k.shouldForwardProp||N.shouldForwardProp,E=a1(C,_,D)||ns,R=function(ge,ve,Me){for(var Rt,We=De(De({},ve),{className:void 0,theme:Me}),Ee=0;Ee<ge.length;Ee+=1){var ct=qr(Rt=ge[Ee])?Rt(We):Rt;for(var Je in ct)We[Je]=Je==="className"?Nr(We[Je],ct[Je]):Je==="style"?De(De({},We[Je]),ct[Je]):ct[Je]}return ve.className&&(We.className=Nr(We.className,ve.className)),We}(P,C,E),F=R.as||z,B={};for(var U in R)R[U]===void 0||U[0]==="$"||U==="as"||U==="theme"&&R.theme===E||(U==="forwardedAs"?B.as=R.forwardedAs:M&&!M(U,F)||(B[U]=R[U]));var te=function(ge,ve){var Me=wh(),Rt=ge.generateAndInjectStyles(ve,Me.styleSheet,Me.stylis);return Rt}(A,R),J=Nr(W,ee);return te&&(J+=" "+te),R.className&&(J+=" "+R.className),B[cu(F)&&!l1.has(F)?"class":"className"]=J,T&&(B.ref=T),v.createElement(F,B)}(w,$,j)}y.displayName=h;var w=rt.forwardRef(y);return w.attrs=g,w.componentStyle=m,w.displayName=h,w.shouldForwardProp=x,w.foldedComponentIds=r?Nr(i.foldedComponentIds,i.styledComponentId):"",w.styledComponentId=p,w.target=r?i.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function($){this._foldedDefaultProps=r?function(j){for(var k=[],C=1;C<arguments.length;C++)k[C-1]=arguments[C];for(var T=0,P=k;T<P.length;T++)yh(j,P[T],!0);return j}({},i.defaultProps,$):$}}),Yf(w,function(){return".".concat(w.styledComponentId)}),s&&g1(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function pm(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var gm=function(e){return Object.assign(e,{isCss:!0})};function S1(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(qr(e)||Co(e))return gm(Xn(pm(vc,ko([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Xn(r):gm(Xn(pm(r,t)))}function bh(e,t,n){if(n===void 0&&(n=ns),!t)throw Qr(1,t);var r=function(i){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,n,S1.apply(void 0,ko([i],s,!1)))};return r.attrs=function(i){return bh(e,t,De(De({},n),{attrs:Array.prototype.concat(n.attrs,i).filter(Boolean)}))},r.withConfig=function(i){return bh(e,t,De(De({},n),i))},r}var k1=function(e){return bh(Pk,e)},f=k1;l1.forEach(function(e){f[e]=k1(e)});var Ak=function(){function e(t,n){this.rules=t,this.componentId=n,this.isStatic=b1(t),_l.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,n,r,i){var s=i(xh(Xn(this.rules,n,r,i)),""),a=this.componentId+t;r.insertRules(a,a,s)},e.prototype.removeStyles=function(t,n){n.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,n,r,i){t>2&&_l.registerId(this.componentId+t),this.removeStyles(t,r),this.createStyles(t,n,r,i)},e}();function Dk(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=S1.apply(void 0,ko([e],t,!1)),i="sc-global-".concat(d1(JSON.stringify(r))),s=new Ak(r,i),a=function(c){var u=wh(),d=rt.useContext($o),h=rt.useRef(u.styleSheet.allocateGSInstance(i)).current;return u.styleSheet.server&&l(h,c,u.styleSheet,d,u.stylis),rt.useLayoutEffect(function(){if(!u.styleSheet.server)return l(h,c,u.styleSheet,d,u.stylis),function(){return s.removeStyles(h,u.styleSheet)}},[h,c,u.styleSheet,d,u.stylis]),null};function l(c,u,d,h,p){if(s.isStatic)s.renderStyles(c,XS,d,p);else{var g=De(De({},u),{theme:a1(u,h,a.defaultProps)});s.renderStyles(c,g,d,p)}}return rt.memo(a)}const Rk={MAX_ORDERS_PER_PHONE:2},Ye={NAME:{MIN_LENGTH:2,MAX_LENGTH:50,PATTERN:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơ\s]+$/},EMAIL:{PATTERN:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},PHONE:{PATTERN:/^(0|\+84)[0-9]{9,10}$/,MIN_LENGTH:10,MAX_LENGTH:11},ADDRESS:{MIN_LENGTH:10,MAX_LENGTH:200}},ai={COLORS:{PRIMARY:"#ff6600",SECONDARY:"#ff8c00",SUCCESS:"#28a745",WARNING:"#ffc107",ERROR:"#dc3545",INFO:"#17a2b8"}},ze={PROCESSING:"Processing",DELIVERING:"Delivering",COMPLETED:"Completed"},mm={VNPAY:"VNPay",CASH:"Cash"},me={colors:{primary:ai.COLORS.PRIMARY,primaryLight:"#ff8533",primaryDark:"#e55a00",secondary:ai.COLORS.SECONDARY,secondaryLight:"#ffa726",secondaryDark:"#f57c00",success:ai.COLORS.SUCCESS,warning:ai.COLORS.WARNING,error:ai.COLORS.ERROR,info:ai.COLORS.INFO,background:"#FFFFFF",backgroundDark:"#121212",text:"#222222",textDark:"#EAEAEA",secondaryText:"#7C7D7E",textfield:"#F2F2F2",placeholder:"#B6B7B7",white:"#ffffff",card:"#ffffff",cardDark:"#1e1e1e",border:"#e5e5e5",borderDark:"#333333"},radius:{sm:"8px",md:"16px",lg:"22px"},shadow:{sm:"0 2px 10px rgba(0,0,0,0.06)",md:"0 6px 24px rgba(0,0,0,0.08)",dark:"0 6px 24px rgba(0,0,0,0.3)"},fontFamily:"Inter, Metropolis, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"}},C1=Dk`
  :root {
    --primary: ${me.colors.primary};
    --primary-light: ${me.colors.primaryLight};
    --bg: ${me.colors.background};
    --bg-dark: ${me.colors.backgroundDark};
    --text: ${me.colors.text};
    --text-dark: ${me.colors.textDark};
    --card: ${me.colors.card};
    --card-dark: ${me.colors.cardDark};
    --border: ${me.colors.border};
    --border-dark: ${me.colors.borderDark};
    --radius: ${me.radius.md};
    --shadow: ${me.shadow.sm};
    --shadow-md: ${me.shadow.md};
  }

  *, *::before, *::after { 
    box-sizing: border-box; 
  }
  
  html, body, #root { 
    height: 100%; 
  }
  
  body {
    margin: 0;
    font-family: ${me.fontFamily};
    color: var(--text);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  [data-theme="dark"] {
    --bg: ${me.colors.backgroundDark};
    --text: ${me.colors.textDark};
    --card: ${me.colors.cardDark};
    --border: ${me.colors.borderDark};
    --shadow: ${me.shadow.dark};
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
 */var xm="popstate";function Mk(e={}){function t(r,i){let{pathname:s,search:a,hash:l}=r.location;return jh("",{pathname:s,search:a,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:To(i)}return Fk(t,n,null,e)}function le(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Dt(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ik(){return Math.random().toString(36).substring(2,10)}function ym(e,t){return{usr:e.state,key:e.key,idx:t}}function jh(e,t,n=null,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?ds(t):t,state:n,key:t&&t.key||r||Ik()}}function To({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function ds(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function Fk(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:s=!1}=r,a=i.history,l="POP",c=null,u=d();u==null&&(u=0,a.replaceState({...a.state,idx:u},""));function d(){return(a.state||{idx:null}).idx}function h(){l="POP";let S=d(),m=S==null?null:S-u;u=S,c&&c({action:l,location:b.location,delta:m})}function p(S,m){l="PUSH";let y=jh(b.location,S,m);u=d()+1;let w=ym(y,u),$=b.createHref(y);try{a.pushState(w,"",$)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;i.location.assign($)}s&&c&&c({action:l,location:b.location,delta:1})}function g(S,m){l="REPLACE";let y=jh(b.location,S,m);u=d();let w=ym(y,u),$=b.createHref(y);a.replaceState(w,"",$),s&&c&&c({action:l,location:b.location,delta:0})}function x(S){return Nk(S)}let b={get action(){return l},get location(){return e(i,a)},listen(S){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(xm,h),c=S,()=>{i.removeEventListener(xm,h),c=null}},createHref(S){return t(i,S)},createURL:x,encodeLocation(S){let m=x(S);return{pathname:m.pathname,search:m.search,hash:m.hash}},push:p,replace:g,go(S){return a.go(S)}};return b}function Nk(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),le(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:To(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function $1(e,t,n="/"){return _k(e,t,n,!1)}function _k(e,t,n,r){let i=typeof t=="string"?ds(t):t,s=Sn(i.pathname||"/",n);if(s==null)return null;let a=T1(e);Lk(a);let l=null;for(let c=0;l==null&&c<a.length;++c){let u=qk(s);l=Kk(a[c],u,r)}return l}function T1(e,t=[],n=[],r="",i=!1){let s=(a,l,c=i,u)=>{let d={relativePath:u===void 0?a.path||"":u,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&c)return;le(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let h=mn([r,d.relativePath]),p=n.concat(d);a.children&&a.children.length>0&&(le(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${h}".`),T1(a.children,t,p,h,c)),!(a.path==null&&!a.index)&&t.push({path:h,score:Wk(h,a.index),routesMeta:p})};return e.forEach((a,l)=>{var c;if(a.path===""||!((c=a.path)!=null&&c.includes("?")))s(a,l);else for(let u of E1(a.path))s(a,l,!0,u)}),t}function E1(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let a=E1(r.join("/")),l=[];return l.push(...a.map(c=>c===""?s:[s,c].join("/"))),i&&l.push(...a),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Lk(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Gk(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Ok=/^:[\w-]+$/,zk=3,Vk=2,Bk=1,Hk=10,Uk=-2,vm=e=>e==="*";function Wk(e,t){let n=e.split("/"),r=n.length;return n.some(vm)&&(r+=Uk),t&&(r+=Vk),n.filter(i=>!vm(i)).reduce((i,s)=>i+(Ok.test(s)?zk:s===""?Bk:Hk),r)}function Gk(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function Kk(e,t,n=!1){let{routesMeta:r}=e,i={},s="/",a=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,d=s==="/"?t:t.slice(s.length)||"/",h=Ll({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},d),p=c.route;if(!h&&u&&n&&!r[r.length-1].route.index&&(h=Ll({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},d)),!h)return null;Object.assign(i,h.params),a.push({params:i,pathname:mn([s,h.pathname]),pathnameBase:Jk(mn([s,h.pathnameBase])),route:p}),h.pathnameBase!=="/"&&(s=mn([s,h.pathnameBase]))}return a}function Ll(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Yk(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let s=i[0],a=s.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((u,{paramName:d,isOptional:h},p)=>{if(d==="*"){let x=l[p]||"";a=s.slice(0,s.length-x.length).replace(/(.)\/+$/,"$1")}const g=l[p];return h&&!g?u[d]=void 0:u[d]=(g||"").replace(/%2F/g,"/"),u},{}),pathname:s,pathnameBase:a,pattern:e}}function Yk(e,t=!1,n=!0){Dt(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function qk(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Dt(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Sn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function Qk(e,t="/"){let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?ds(e):e;return{pathname:n?n.startsWith("/")?n:Xk(n,t):t,search:eC(r),hash:tC(i)}}function Xk(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function du(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Zk(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function qf(e){let t=Zk(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Qf(e,t,n,r=!1){let i;typeof e=="string"?i=ds(e):(i={...e},le(!i.pathname||!i.pathname.includes("?"),du("?","pathname","search",i)),le(!i.pathname||!i.pathname.includes("#"),du("#","pathname","hash",i)),le(!i.search||!i.search.includes("#"),du("#","search","hash",i)));let s=e===""||i.pathname==="",a=s?"/":i.pathname,l;if(a==null)l=n;else{let h=t.length-1;if(!r&&a.startsWith("..")){let p=a.split("/");for(;p[0]==="..";)p.shift(),h-=1;i.pathname=p.join("/")}l=h>=0?t[h]:"/"}let c=Qk(i,l),u=a&&a!=="/"&&a.endsWith("/"),d=(s||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}var mn=e=>e.join("/").replace(/\/\/+/g,"/"),Jk=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),eC=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,tC=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function nC(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var P1=["POST","PUT","PATCH","DELETE"];new Set(P1);var rC=["GET",...P1];new Set(rC);var hs=v.createContext(null);hs.displayName="DataRouter";var wc=v.createContext(null);wc.displayName="DataRouterState";v.createContext(!1);var A1=v.createContext({isTransitioning:!1});A1.displayName="ViewTransition";var iC=v.createContext(new Map);iC.displayName="Fetchers";var sC=v.createContext(null);sC.displayName="Await";var Ut=v.createContext(null);Ut.displayName="Navigation";var Oo=v.createContext(null);Oo.displayName="Location";var Wt=v.createContext({outlet:null,matches:[],isDataRoute:!1});Wt.displayName="Route";var Xf=v.createContext(null);Xf.displayName="RouteError";function oC(e,{relative:t}={}){le(fs(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=v.useContext(Ut),{hash:i,pathname:s,search:a}=zo(e,{relative:t}),l=s;return n!=="/"&&(l=s==="/"?n:mn([n,s])),r.createHref({pathname:l,search:a,hash:i})}function fs(){return v.useContext(Oo)!=null}function vt(){return le(fs(),"useLocation() may be used only in the context of a <Router> component."),v.useContext(Oo).location}var D1="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function R1(e){v.useContext(Ut).static||v.useLayoutEffect(e)}function wt(){let{isDataRoute:e}=v.useContext(Wt);return e?wC():aC()}function aC(){le(fs(),"useNavigate() may be used only in the context of a <Router> component.");let e=v.useContext(hs),{basename:t,navigator:n}=v.useContext(Ut),{matches:r}=v.useContext(Wt),{pathname:i}=vt(),s=JSON.stringify(qf(r)),a=v.useRef(!1);return R1(()=>{a.current=!0}),v.useCallback((c,u={})=>{if(Dt(a.current,D1),!a.current)return;if(typeof c=="number"){n.go(c);return}let d=Qf(c,JSON.parse(s),i,u.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:mn([t,d.pathname])),(u.replace?n.replace:n.push)(d,u.state,u)},[t,n,s,i,e])}v.createContext(null);function lC(){let{matches:e}=v.useContext(Wt),t=e[e.length-1];return t?t.params:{}}function zo(e,{relative:t}={}){let{matches:n}=v.useContext(Wt),{pathname:r}=vt(),i=JSON.stringify(qf(n));return v.useMemo(()=>Qf(e,JSON.parse(i),r,t==="path"),[e,i,r,t])}function cC(e,t){return M1(e,t)}function M1(e,t,n,r,i){var y;le(fs(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=v.useContext(Ut),{matches:a}=v.useContext(Wt),l=a[a.length-1],c=l?l.params:{},u=l?l.pathname:"/",d=l?l.pathnameBase:"/",h=l&&l.route;{let w=h&&h.path||"";I1(u,!h||w.endsWith("*")||w.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${w}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${w}"> to <Route path="${w==="/"?"*":`${w}/*`}">.`)}let p=vt(),g;if(t){let w=typeof t=="string"?ds(t):t;le(d==="/"||((y=w.pathname)==null?void 0:y.startsWith(d)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${w.pathname}" was given in the \`location\` prop.`),g=w}else g=p;let x=g.pathname||"/",b=x;if(d!=="/"){let w=d.replace(/^\//,"").split("/");b="/"+x.replace(/^\//,"").split("/").slice(w.length).join("/")}let S=$1(e,{pathname:b});Dt(h||S!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Dt(S==null||S[S.length-1].route.element!==void 0||S[S.length-1].route.Component!==void 0||S[S.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let m=pC(S&&S.map(w=>Object.assign({},w,{params:Object.assign({},c,w.params),pathname:mn([d,s.encodeLocation?s.encodeLocation(w.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?d:mn([d,s.encodeLocation?s.encodeLocation(w.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:w.pathnameBase])})),a,n,r,i);return t&&m?v.createElement(Oo.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},m):m}function uC(){let e=vC(),t=nC(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:r},s={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=v.createElement(v.Fragment,null,v.createElement("p",null,"💿 Hey developer 👋"),v.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",v.createElement("code",{style:s},"ErrorBoundary")," or"," ",v.createElement("code",{style:s},"errorElement")," prop on your route.")),v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),n?v.createElement("pre",{style:i},n):null,a)}var dC=v.createElement(uC,null),hC=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.unstable_onError?this.props.unstable_onError(e,t):console.error("React Router caught the following error during render",e)}render(){return this.state.error!==void 0?v.createElement(Wt.Provider,{value:this.props.routeContext},v.createElement(Xf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function fC({routeContext:e,match:t,children:n}){let r=v.useContext(hs);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),v.createElement(Wt.Provider,{value:e},n)}function pC(e,t=[],n=null,r=null,i=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let s=e,a=n==null?void 0:n.errors;if(a!=null){let u=s.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);le(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),s=s.slice(0,Math.min(s.length,u+1))}let l=!1,c=-1;if(n)for(let u=0;u<s.length;u++){let d=s[u];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=u),d.route.id){let{loaderData:h,errors:p}=n,g=d.route.loader&&!h.hasOwnProperty(d.route.id)&&(!p||p[d.route.id]===void 0);if(d.route.lazy||g){l=!0,c>=0?s=s.slice(0,c+1):s=[s[0]];break}}}return s.reduceRight((u,d,h)=>{let p,g=!1,x=null,b=null;n&&(p=a&&d.route.id?a[d.route.id]:void 0,x=d.route.errorElement||dC,l&&(c<0&&h===0?(I1("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,b=null):c===h&&(g=!0,b=d.route.hydrateFallbackElement||null)));let S=t.concat(s.slice(0,h+1)),m=()=>{let y;return p?y=x:g?y=b:d.route.Component?y=v.createElement(d.route.Component,null):d.route.element?y=d.route.element:y=u,v.createElement(fC,{match:d,routeContext:{outlet:u,matches:S,isDataRoute:n!=null},children:y})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?v.createElement(hC,{location:n.location,revalidation:n.revalidation,component:x,error:p,children:m(),routeContext:{outlet:null,matches:S,isDataRoute:!0},unstable_onError:r}):m()},null)}function Zf(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function gC(e){let t=v.useContext(hs);return le(t,Zf(e)),t}function mC(e){let t=v.useContext(wc);return le(t,Zf(e)),t}function xC(e){let t=v.useContext(Wt);return le(t,Zf(e)),t}function Jf(e){let t=xC(e),n=t.matches[t.matches.length-1];return le(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function yC(){return Jf("useRouteId")}function vC(){var r;let e=v.useContext(Xf),t=mC("useRouteError"),n=Jf("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function wC(){let{router:e}=gC("useNavigate"),t=Jf("useNavigate"),n=v.useRef(!1);return R1(()=>{n.current=!0}),v.useCallback(async(i,s={})=>{Dt(n.current,D1),n.current&&(typeof i=="number"?e.navigate(i):await e.navigate(i,{fromRouteId:t,...s}))},[e,t])}var wm={};function I1(e,t,n){!t&&!wm[e]&&(wm[e]=!0,Dt(!1,n))}v.memo(bC);function bC({routes:e,future:t,state:n,unstable_onError:r}){return M1(e,void 0,n,r,t)}function tn({to:e,replace:t,state:n,relative:r}){le(fs(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=v.useContext(Ut);Dt(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=v.useContext(Wt),{pathname:a}=vt(),l=wt(),c=Qf(e,qf(s),a,r==="path"),u=JSON.stringify(c);return v.useEffect(()=>{l(JSON.parse(u),{replace:t,state:n,relative:r})},[l,u,r,t,n]),null}function X(e){le(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function jC({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:i,static:s=!1}){le(!fs(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=e.replace(/^\/*/,"/"),l=v.useMemo(()=>({basename:a,navigator:i,static:s,future:{}}),[a,i,s]);typeof n=="string"&&(n=ds(n));let{pathname:c="/",search:u="",hash:d="",state:h=null,key:p="default"}=n,g=v.useMemo(()=>{let x=Sn(c,a);return x==null?null:{location:{pathname:x,search:u,hash:d,state:h,key:p},navigationType:r}},[a,c,u,d,h,p,r]);return Dt(g!=null,`<Router basename="${a}"> is not able to match the URL "${c}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:v.createElement(Ut.Provider,{value:l},v.createElement(Oo.Provider,{children:t,value:g}))}function F1({children:e,location:t}){return cC(Sh(e),t)}function Sh(e,t=[]){let n=[];return v.Children.forEach(e,(r,i)=>{if(!v.isValidElement(r))return;let s=[...t,i];if(r.type===v.Fragment){n.push.apply(n,Sh(r.props.children,s));return}le(r.type===X,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),le(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=Sh(r.props.children,s)),n.push(a)}),n}var el="get",tl="application/x-www-form-urlencoded";function bc(e){return e!=null&&typeof e.tagName=="string"}function SC(e){return bc(e)&&e.tagName.toLowerCase()==="button"}function kC(e){return bc(e)&&e.tagName.toLowerCase()==="form"}function CC(e){return bc(e)&&e.tagName.toLowerCase()==="input"}function $C(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function TC(e,t){return e.button===0&&(!t||t==="_self")&&!$C(e)}function kh(e=""){return new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(i=>[n,i]):[[n,r]])},[]))}function EC(e,t){let n=kh(e);return t&&t.forEach((r,i)=>{n.has(i)||t.getAll(i).forEach(s=>{n.append(i,s)})}),n}var pa=null;function PC(){if(pa===null)try{new FormData(document.createElement("form"),0),pa=!1}catch{pa=!0}return pa}var AC=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function hu(e){return e!=null&&!AC.has(e)?(Dt(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${tl}"`),null):e}function DC(e,t){let n,r,i,s,a;if(kC(e)){let l=e.getAttribute("action");r=l?Sn(l,t):null,n=e.getAttribute("method")||el,i=hu(e.getAttribute("enctype"))||tl,s=new FormData(e)}else if(SC(e)||CC(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||l.getAttribute("action");if(r=c?Sn(c,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||el,i=hu(e.getAttribute("formenctype"))||hu(l.getAttribute("enctype"))||tl,s=new FormData(l,e),!PC()){let{name:u,type:d,value:h}=e;if(d==="image"){let p=u?`${u}.`:"";s.append(`${p}x`,"0"),s.append(`${p}y`,"0")}else u&&s.append(u,h)}}else{if(bc(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=el,r=null,i=tl,a=e}return s&&i==="text/plain"&&(a=s,s=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:s,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function ep(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function RC(e,t,n){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return r.pathname==="/"?r.pathname=`_root.${n}`:t&&Sn(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.${n}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${n}`,r}async function MC(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function IC(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function FC(e,t,n){let r=await Promise.all(e.map(async i=>{let s=t.routes[i.route.id];if(s){let a=await MC(s,n);return a.links?a.links():[]}return[]}));return OC(r.flat(1).filter(IC).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function bm(e,t,n,r,i,s){let a=(c,u)=>n[u]?c.route.id!==n[u].route.id:!0,l=(c,u)=>{var d;return n[u].pathname!==c.pathname||((d=n[u].route.path)==null?void 0:d.endsWith("*"))&&n[u].params["*"]!==c.params["*"]};return s==="assets"?t.filter((c,u)=>a(c,u)||l(c,u)):s==="data"?t.filter((c,u)=>{var h;let d=r.routes[c.route.id];if(!d||!d.hasLoader)return!1;if(a(c,u)||l(c,u))return!0;if(c.route.shouldRevalidate){let p=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((h=n[0])==null?void 0:h.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function NC(e,t,{includeHydrateFallback:n}={}){return _C(e.map(r=>{let i=t.routes[r.route.id];if(!i)return[];let s=[i.module];return i.clientActionModule&&(s=s.concat(i.clientActionModule)),i.clientLoaderModule&&(s=s.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(s=s.concat(i.hydrateFallbackModule)),i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function _C(e){return[...new Set(e)]}function LC(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function OC(e,t){let n=new Set;return new Set(t),e.reduce((r,i)=>{let s=JSON.stringify(LC(i));return n.has(s)||(n.add(s),r.push({key:s,link:i})),r},[])}function N1(){let e=v.useContext(hs);return ep(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function zC(){let e=v.useContext(wc);return ep(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var tp=v.createContext(void 0);tp.displayName="FrameworkContext";function _1(){let e=v.useContext(tp);return ep(e,"You must render this element inside a <HydratedRouter> element"),e}function VC(e,t){let n=v.useContext(tp),[r,i]=v.useState(!1),[s,a]=v.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:u,onMouseLeave:d,onTouchStart:h}=t,p=v.useRef(null);v.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let b=m=>{m.forEach(y=>{a(y.isIntersecting)})},S=new IntersectionObserver(b,{threshold:.5});return p.current&&S.observe(p.current),()=>{S.disconnect()}}},[e]),v.useEffect(()=>{if(r){let b=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(b)}}},[r]);let g=()=>{i(!0)},x=()=>{i(!1),a(!1)};return n?e!=="intent"?[s,p,{}]:[s,p,{onFocus:Cs(l,g),onBlur:Cs(c,x),onMouseEnter:Cs(u,g),onMouseLeave:Cs(d,x),onTouchStart:Cs(h,g)}]:[!1,p,{}]}function Cs(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function BC({page:e,...t}){let{router:n}=N1(),r=v.useMemo(()=>$1(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?v.createElement(UC,{page:e,matches:r,...t}):null}function HC(e){let{manifest:t,routeModules:n}=_1(),[r,i]=v.useState([]);return v.useEffect(()=>{let s=!1;return FC(e,t,n).then(a=>{s||i(a)}),()=>{s=!0}},[e,t,n]),r}function UC({page:e,matches:t,...n}){let r=vt(),{manifest:i,routeModules:s}=_1(),{basename:a}=N1(),{loaderData:l,matches:c}=zC(),u=v.useMemo(()=>bm(e,t,c,i,r,"data"),[e,t,c,i,r]),d=v.useMemo(()=>bm(e,t,c,i,r,"assets"),[e,t,c,i,r]),h=v.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let x=new Set,b=!1;if(t.forEach(m=>{var w;let y=i.routes[m.route.id];!y||!y.hasLoader||(!u.some($=>$.route.id===m.route.id)&&m.route.id in l&&((w=s[m.route.id])!=null&&w.shouldRevalidate)||y.hasClientLoader?b=!0:x.add(m.route.id))}),x.size===0)return[];let S=RC(e,a,"data");return b&&x.size>0&&S.searchParams.set("_routes",t.filter(m=>x.has(m.route.id)).map(m=>m.route.id).join(",")),[S.pathname+S.search]},[a,l,r,i,u,t,e,s]),p=v.useMemo(()=>NC(d,i),[d,i]),g=HC(d);return v.createElement(v.Fragment,null,h.map(x=>v.createElement("link",{key:x,rel:"prefetch",as:"fetch",href:x,...n})),p.map(x=>v.createElement("link",{key:x,rel:"modulepreload",href:x,...n})),g.map(({key:x,link:b})=>v.createElement("link",{key:x,nonce:n.nonce,...b})))}function WC(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var L1=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{L1&&(window.__reactRouterVersion="7.9.4")}catch{}function O1({basename:e,children:t,window:n}){let r=v.useRef();r.current==null&&(r.current=Mk({window:n,v5Compat:!0}));let i=r.current,[s,a]=v.useState({action:i.action,location:i.location}),l=v.useCallback(c=>{v.startTransition(()=>a(c))},[a]);return v.useLayoutEffect(()=>i.listen(l),[i,l]),v.createElement(jC,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:i})}var z1=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tr=v.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:i,reloadDocument:s,replace:a,state:l,target:c,to:u,preventScrollReset:d,viewTransition:h,...p},g){let{basename:x}=v.useContext(Ut),b=typeof u=="string"&&z1.test(u),S,m=!1;if(typeof u=="string"&&b&&(S=u,L1))try{let P=new URL(window.location.href),A=u.startsWith("//")?new URL(P.protocol+u):new URL(u),D=Sn(A.pathname,x);A.origin===P.origin&&D!=null?u=D+A.search+A.hash:m=!0}catch{Dt(!1,`<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let y=oC(u,{relative:i}),[w,$,j]=VC(r,p),k=YC(u,{replace:a,state:l,target:c,preventScrollReset:d,relative:i,viewTransition:h});function C(P){t&&t(P),P.defaultPrevented||k(P)}let T=v.createElement("a",{...p,...j,href:S||y,onClick:m||s?t:C,ref:WC(g,$),target:c,"data-discover":!b&&n==="render"?"true":void 0});return w&&!b?v.createElement(v.Fragment,null,T,v.createElement(BC,{page:y})):T});tr.displayName="Link";var jc=v.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:i=!1,style:s,to:a,viewTransition:l,children:c,...u},d){let h=zo(a,{relative:u.relative}),p=vt(),g=v.useContext(wc),{navigator:x,basename:b}=v.useContext(Ut),S=g!=null&&e$(h)&&l===!0,m=x.encodeLocation?x.encodeLocation(h).pathname:h.pathname,y=p.pathname,w=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(y=y.toLowerCase(),w=w?w.toLowerCase():null,m=m.toLowerCase()),w&&b&&(w=Sn(w,b)||w);const $=m!=="/"&&m.endsWith("/")?m.length-1:m.length;let j=y===m||!i&&y.startsWith(m)&&y.charAt($)==="/",k=w!=null&&(w===m||!i&&w.startsWith(m)&&w.charAt(m.length)==="/"),C={isActive:j,isPending:k,isTransitioning:S},T=j?t:void 0,P;typeof r=="function"?P=r(C):P=[r,j?"active":null,k?"pending":null,S?"transitioning":null].filter(Boolean).join(" ");let A=typeof s=="function"?s(C):s;return v.createElement(tr,{...u,"aria-current":T,className:P,ref:d,style:A,to:a,viewTransition:l},typeof c=="function"?c(C):c)});jc.displayName="NavLink";var GC=v.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:s,method:a=el,action:l,onSubmit:c,relative:u,preventScrollReset:d,viewTransition:h,...p},g)=>{let x=ZC(),b=JC(l,{relative:u}),S=a.toLowerCase()==="get"?"get":"post",m=typeof l=="string"&&z1.test(l),y=w=>{if(c&&c(w),w.defaultPrevented)return;w.preventDefault();let $=w.nativeEvent.submitter,j=($==null?void 0:$.getAttribute("formmethod"))||a;x($||w.currentTarget,{fetcherKey:t,method:j,navigate:n,replace:i,state:s,relative:u,preventScrollReset:d,viewTransition:h})};return v.createElement("form",{ref:g,method:S,action:b,onSubmit:r?c:y,...p,"data-discover":!m&&e==="render"?"true":void 0})});GC.displayName="Form";function KC(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function V1(e){let t=v.useContext(hs);return le(t,KC(e)),t}function YC(e,{target:t,replace:n,state:r,preventScrollReset:i,relative:s,viewTransition:a}={}){let l=wt(),c=vt(),u=zo(e,{relative:s});return v.useCallback(d=>{if(TC(d,t)){d.preventDefault();let h=n!==void 0?n:To(c)===To(u);l(e,{replace:h,state:r,preventScrollReset:i,relative:s,viewTransition:a})}},[c,l,u,n,r,t,e,i,s,a])}function qC(e){Dt(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=v.useRef(kh(e)),n=v.useRef(!1),r=vt(),i=v.useMemo(()=>EC(r.search,n.current?null:t.current),[r.search]),s=wt(),a=v.useCallback((l,c)=>{const u=kh(typeof l=="function"?l(new URLSearchParams(i)):l);n.current=!0,s("?"+u,c)},[s,i]);return[i,a]}var QC=0,XC=()=>`__${String(++QC)}__`;function ZC(){let{router:e}=V1("useSubmit"),{basename:t}=v.useContext(Ut),n=yC();return v.useCallback(async(r,i={})=>{let{action:s,method:a,encType:l,formData:c,body:u}=DC(r,t);if(i.navigate===!1){let d=i.fetcherKey||XC();await e.fetch(d,n,i.action||s,{preventScrollReset:i.preventScrollReset,formData:c,body:u,formMethod:i.method||a,formEncType:i.encType||l,flushSync:i.flushSync})}else await e.navigate(i.action||s,{preventScrollReset:i.preventScrollReset,formData:c,body:u,formMethod:i.method||a,formEncType:i.encType||l,replace:i.replace,state:i.state,fromRouteId:n,flushSync:i.flushSync,viewTransition:i.viewTransition})},[e,t,n])}function JC(e,{relative:t}={}){let{basename:n}=v.useContext(Ut),r=v.useContext(Wt);le(r,"useFormAction must be used inside a RouteContext");let[i]=r.matches.slice(-1),s={...zo(e||".",{relative:t})},a=vt();if(e==null){s.search=a.search;let l=new URLSearchParams(s.search),c=l.getAll("index");if(c.some(d=>d==="")){l.delete("index"),c.filter(h=>h).forEach(h=>l.append("index",h));let d=l.toString();s.search=d?`?${d}`:""}}return(!e||e===".")&&i.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:mn([n,s.pathname])),To(s)}function e$(e,{relative:t}={}){let n=v.useContext(A1);le(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=V1("useViewTransitionState"),i=zo(e,{relative:t});if(!n.isTransitioning)return!1;let s=Sn(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=Sn(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Ll(i.pathname,a)!=null||Ll(i.pathname,s)!=null}const Ol=[{id:"rest_1",name:"FoodFast Restaurant",description:"Original FoodFast restaurant with drone delivery",category:"Fast Food",location:"Downtown",rating:4.5,theme:{primary:"#FF6600",secondary:"#FF8C00",accent:"#FFA500"},ownerId:"u1",isActive:!0,createdAt:Date.now()-864e5*30},{id:"rest_2",name:"SweetDreams Bakery",description:"Delicious cakes and desserts delivered by drone",category:"Desserts",location:"Mall District",rating:4.8,theme:{primary:"#E91E63",secondary:"#F06292",accent:"#F8BBD9"},ownerId:"u3",isActive:!0,createdAt:Date.now()-864e5*7},{id:"restaurant_2",name:"Aloha Kitchen",description:"Authentic Asian & Hawaiian fusion cuisine for busy professionals.",category:"Asian Fusion / Bento / Dim Sum",location:"Ho Chi Minh City",rating:4.7,theme:{primary:"#ffcc70",secondary:"#ff9671",accent:"#ffc75f"},ownerId:"owner_aloha",isActive:!0,createdAt:Date.now()}],Wi=[{id:"u1",name:"Admin User",username:"admin",role:"admin",email:"admin@foodfast.com",createdAt:Date.now()-864e5*365},{id:"u2",name:"Customer User",username:"user",role:"customer",phone:"0123456789",email:"user@example.com",orderCount:12,createdAt:Date.now()-864e5*60},{id:"u3",name:"SweetDreams Owner",username:"sweetdreams",role:"restaurant",restaurantId:"rest_2",email:"owner@sweetdreams.com",orderCount:0,createdAt:Date.now()-864e5*7},{id:"u4",name:"Test Customer",username:"user1",role:"customer",phone:"0987654321",email:"user1@example.com",orderCount:5,createdAt:Date.now()-864e5*30},{id:"owner_aloha",name:"Aloha Kitchen Owner",username:"aloha_restaurant",role:"restaurant",restaurantId:"restaurant_2",email:"owner@alohakitchen.com",orderCount:0,createdAt:Date.now()}],t$={admin:{username:"admin",password:"admin123"},user:{username:"user",password:"user123"},sweetdreams:{username:"sweetdreams",password:"sweet123"},user1:{username:"user1",password:"user1123"},aloha_restaurant:{username:"aloha_restaurant",password:"aloha123"}},B1=v.createContext(void 0),n$=({children:e})=>{const[t,n]=v.useState(null),[r,i]=v.useState(!0);v.useEffect(()=>{try{const h=localStorage.getItem("auth_user"),p=localStorage.getItem("token"),g=localStorage.getItem("role");if(h&&p&&g){const x=JSON.parse(h);x.role===g?n(x):(console.warn("Inconsistent auth data, clearing..."),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role"))}else(h||p||g)&&(console.warn("Partial auth data found, clearing..."),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role"))}catch(h){console.error("Error parsing saved user:",h),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role")}finally{i(!1)}},[]),v.useEffect(()=>{if(t){console.log("💾 [AuthContext] Storing user in localStorage:",{username:t.username,role:t.role,restaurantId:t.restaurantId}),localStorage.setItem("auth_user",JSON.stringify(t));const h=`token_${t.username}_${Date.now()}`;localStorage.setItem("token",h),localStorage.setItem("role",t.role),console.log("✅ [AuthContext] User state synchronized to localStorage")}else console.log("🗑️ [AuthContext] Clearing user from localStorage"),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role")},[t]);const s=async(h,p)=>{if(console.log("🔐 [AuthContext] Login attempt:",{username:h}),i(!0),await new Promise(x=>setTimeout(x,400)),Object.values(t$).find(x=>x.username===h&&x.password===p)){const x=Wi.find(b=>b.username===h);if(x)return console.log("✅ [AuthContext] User found:",{username:x.username,role:x.role,restaurantId:x.restaurantId,name:x.name}),n(x),i(!1),console.log("✅ [AuthContext] Login successful, user state updated"),{ok:!0}}return console.log("❌ [AuthContext] Login failed - invalid credentials"),i(!1),{ok:!1,message:"Tên đăng nhập hoặc mật khẩu không đúng."}},a=()=>n(null),l=()=>(t==null?void 0:t.role)==="admin",c=()=>(t==null?void 0:t.role)==="restaurant",u=()=>(t==null?void 0:t.role)==="customer",d=h=>t&&n({...t,phone:h});return o.jsx(B1.Provider,{value:{user:t,loading:r,login:s,logout:a,isAdmin:l,isRestaurant:c,isCustomer:u,setPhone:d},children:r?o.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px",color:"#666"},children:"Đang tải..."}):e})},Ze=()=>{const e=v.useContext(B1);return e||(console.error("useAuth must be used inside AuthProvider"),{user:null,loading:!1,login:async()=>({ok:!1,message:"Auth not initialized"}),logout:()=>{},isAdmin:()=>!1,isRestaurant:()=>!1,isCustomer:()=>!1,setPhone:()=>{}})},np=v.createContext({});function Sc(e){const t=v.useRef(null);return t.current===null&&(t.current=e()),t.current}const kc=v.createContext(null),rp=v.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});class r$ extends v.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=n.offsetHeight||0,r.width=n.offsetWidth||0,r.top=n.offsetTop,r.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function i$({children:e,isPresent:t}){const n=v.useId(),r=v.useRef(null),i=v.useRef({width:0,height:0,top:0,left:0}),{nonce:s}=v.useContext(rp);return v.useInsertionEffect(()=>{const{width:a,height:l,top:c,left:u}=i.current;if(t||!r.current||!a||!l)return;r.current.dataset.motionPopId=n;const d=document.createElement("style");return s&&(d.nonce=s),document.head.appendChild(d),d.sheet&&d.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${a}px !important;
            height: ${l}px !important;
            top: ${c}px !important;
            left: ${u}px !important;
          }
        `),()=>{document.head.removeChild(d)}},[t]),o.jsx(r$,{isPresent:t,childRef:r,sizeRef:i,children:v.cloneElement(e,{ref:r})})}const s$=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:s,mode:a})=>{const l=Sc(o$),c=v.useId(),u=v.useCallback(h=>{l.set(h,!0);for(const p of l.values())if(!p)return;r&&r()},[l,r]),d=v.useMemo(()=>({id:c,initial:t,isPresent:n,custom:i,onExitComplete:u,register:h=>(l.set(h,!1),()=>l.delete(h))}),s?[Math.random(),u]:[n,u]);return v.useMemo(()=>{l.forEach((h,p)=>l.set(p,!1))},[n]),v.useEffect(()=>{!n&&!l.size&&r&&r()},[n]),a==="popLayout"&&(e=o.jsx(i$,{isPresent:n,children:e})),o.jsx(kc.Provider,{value:d,children:e})};function o$(){return new Map}function H1(e=!0){const t=v.useContext(kc);if(t===null)return[!0,null];const{isPresent:n,onExitComplete:r,register:i}=t,s=v.useId();v.useEffect(()=>{e&&i(s)},[e]);const a=v.useCallback(()=>e&&r&&r(s),[s,r,e]);return!n&&r?[!1,a]:[!0]}const ga=e=>e.key||"";function jm(e){const t=[];return v.Children.forEach(e,n=>{v.isValidElement(n)&&t.push(n)}),t}const ip=typeof window<"u",sp=ip?v.useLayoutEffect:v.useEffect,tt=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:s="sync",propagate:a=!1})=>{const[l,c]=H1(a),u=v.useMemo(()=>jm(e),[e]),d=a&&!l?[]:u.map(ga),h=v.useRef(!0),p=v.useRef(u),g=Sc(()=>new Map),[x,b]=v.useState(u),[S,m]=v.useState(u);sp(()=>{h.current=!1,p.current=u;for(let $=0;$<S.length;$++){const j=ga(S[$]);d.includes(j)?g.delete(j):g.get(j)!==!0&&g.set(j,!1)}},[S,d.length,d.join("-")]);const y=[];if(u!==x){let $=[...u];for(let j=0;j<S.length;j++){const k=S[j],C=ga(k);d.includes(C)||($.splice(j,0,k),y.push(k))}s==="wait"&&y.length&&($=y),m(jm($)),b(u);return}const{forceRender:w}=v.useContext(np);return o.jsx(o.Fragment,{children:S.map($=>{const j=ga($),k=a&&!l?!1:u===S||d.includes(j),C=()=>{if(g.has(j))g.set(j,!0);else return;let T=!0;g.forEach(P=>{P||(T=!1)}),T&&(w==null||w(),m(p.current),a&&(c==null||c()),r&&r())};return o.jsx(s$,{isPresent:k,initial:!h.current||n?void 0:!1,custom:k?void 0:t,presenceAffectsLayout:i,mode:s,onExitComplete:k?void 0:C,children:$},j)})})},pt=e=>e;let U1=pt;function op(e){let t;return()=>(t===void 0&&(t=e()),t)}const rs=(e,t,n)=>{const r=t-e;return r===0?1:(n-e)/r},xn=e=>e*1e3,yn=e=>e/1e3,a$={useManualTiming:!1};function l$(e){let t=new Set,n=new Set,r=!1,i=!1;const s=new WeakSet;let a={delta:0,timestamp:0,isProcessing:!1};function l(u){s.has(u)&&(c.schedule(u),e()),u(a)}const c={schedule:(u,d=!1,h=!1)=>{const g=h&&r?t:n;return d&&s.add(u),g.has(u)||g.add(u),u},cancel:u=>{n.delete(u),s.delete(u)},process:u=>{if(a=u,r){i=!0;return}r=!0,[t,n]=[n,t],t.forEach(l),t.clear(),r=!1,i&&(i=!1,c.process(u))}};return c}const ma=["read","resolveKeyframes","update","preRender","render","postRender"],c$=40;function W1(e,t){let n=!1,r=!0;const i={delta:0,timestamp:0,isProcessing:!1},s=()=>n=!0,a=ma.reduce((m,y)=>(m[y]=l$(s),m),{}),{read:l,resolveKeyframes:c,update:u,preRender:d,render:h,postRender:p}=a,g=()=>{const m=performance.now();n=!1,i.delta=r?1e3/60:Math.max(Math.min(m-i.timestamp,c$),1),i.timestamp=m,i.isProcessing=!0,l.process(i),c.process(i),u.process(i),d.process(i),h.process(i),p.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(g))},x=()=>{n=!0,r=!0,i.isProcessing||e(g)};return{schedule:ma.reduce((m,y)=>{const w=a[y];return m[y]=($,j=!1,k=!1)=>(n||x(),w.schedule($,j,k)),m},{}),cancel:m=>{for(let y=0;y<ma.length;y++)a[ma[y]].cancel(m)},state:i,steps:a}}const{schedule:oe,cancel:nr,state:Fe,steps:fu}=W1(typeof requestAnimationFrame<"u"?requestAnimationFrame:pt,!0),G1=v.createContext({strict:!1}),Sm={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},is={};for(const e in Sm)is[e]={isEnabled:t=>Sm[e].some(n=>!!t[n])};function u$(e){for(const t in e)is[t]={...is[t],...e[t]}}const d$=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function zl(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||d$.has(e)}let K1=e=>!zl(e);function h$(e){e&&(K1=t=>t.startsWith("on")?!zl(t):e(t))}try{h$(require("@emotion/is-prop-valid").default)}catch{}function f$(e,t,n){const r={};for(const i in e)i==="values"&&typeof e.values=="object"||(K1(i)||n===!0&&zl(i)||!t&&!zl(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}function p$(e){if(typeof Proxy>"u")return e;const t=new Map,n=(...r)=>e(...r);return new Proxy(n,{get:(r,i)=>i==="create"?e:(t.has(i)||t.set(i,e(i)),t.get(i))})}const Cc=v.createContext({});function Eo(e){return typeof e=="string"||Array.isArray(e)}function $c(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}const ap=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],lp=["initial",...ap];function Tc(e){return $c(e.animate)||lp.some(t=>Eo(e[t]))}function Y1(e){return!!(Tc(e)||e.variants)}function g$(e,t){if(Tc(e)){const{initial:n,animate:r}=e;return{initial:n===!1||Eo(n)?n:void 0,animate:Eo(r)?r:void 0}}return e.inherit!==!1?t:{}}function m$(e){const{initial:t,animate:n}=g$(e,v.useContext(Cc));return v.useMemo(()=>({initial:t,animate:n}),[km(t),km(n)])}function km(e){return Array.isArray(e)?e.join(" "):e}const x$=Symbol.for("motionComponentSymbol");function Mi(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function y$(e,t,n){return v.useCallback(r=>{r&&e.onMount&&e.onMount(r),t&&(r?t.mount(r):t.unmount()),n&&(typeof n=="function"?n(r):Mi(n)&&(n.current=r))},[t])}const cp=e=>e.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),v$="framerAppearId",q1="data-"+cp(v$),{schedule:up}=W1(queueMicrotask,!1),Q1=v.createContext({});function w$(e,t,n,r,i){var s,a;const{visualElement:l}=v.useContext(Cc),c=v.useContext(G1),u=v.useContext(kc),d=v.useContext(rp).reducedMotion,h=v.useRef(null);r=r||c.renderer,!h.current&&r&&(h.current=r(e,{visualState:t,parent:l,props:n,presenceContext:u,blockInitialAnimation:u?u.initial===!1:!1,reducedMotionConfig:d}));const p=h.current,g=v.useContext(Q1);p&&!p.projection&&i&&(p.type==="html"||p.type==="svg")&&b$(h.current,n,i,g);const x=v.useRef(!1);v.useInsertionEffect(()=>{p&&x.current&&p.update(n,u)});const b=n[q1],S=v.useRef(!!b&&!(!((s=window.MotionHandoffIsComplete)===null||s===void 0)&&s.call(window,b))&&((a=window.MotionHasOptimisedAnimation)===null||a===void 0?void 0:a.call(window,b)));return sp(()=>{p&&(x.current=!0,window.MotionIsMounted=!0,p.updateFeatures(),up.render(p.render),S.current&&p.animationState&&p.animationState.animateChanges())}),v.useEffect(()=>{p&&(!S.current&&p.animationState&&p.animationState.animateChanges(),S.current&&(queueMicrotask(()=>{var m;(m=window.MotionHandoffMarkAsComplete)===null||m===void 0||m.call(window,b)}),S.current=!1))}),p}function b$(e,t,n,r){const{layoutId:i,layout:s,drag:a,dragConstraints:l,layoutScroll:c,layoutRoot:u}=t;e.projection=new n(e.latestValues,t["data-framer-portal-id"]?void 0:X1(e.parent)),e.projection.setOptions({layoutId:i,layout:s,alwaysMeasureLayout:!!a||l&&Mi(l),visualElement:e,animationType:typeof s=="string"?s:"both",initialPromotionConfig:r,layoutScroll:c,layoutRoot:u})}function X1(e){if(e)return e.options.allowProjection!==!1?e.projection:X1(e.parent)}function j$({preloadedFeatures:e,createVisualElement:t,useRender:n,useVisualState:r,Component:i}){var s,a;e&&u$(e);function l(u,d){let h;const p={...v.useContext(rp),...u,layoutId:S$(u)},{isStatic:g}=p,x=m$(u),b=r(u,g);if(!g&&ip){k$();const S=C$(p);h=S.MeasureLayout,x.visualElement=w$(i,b,p,t,S.ProjectionNode)}return o.jsxs(Cc.Provider,{value:x,children:[h&&x.visualElement?o.jsx(h,{visualElement:x.visualElement,...p}):null,n(i,u,y$(b,x.visualElement,d),b,g,x.visualElement)]})}l.displayName=`motion.${typeof i=="string"?i:`create(${(a=(s=i.displayName)!==null&&s!==void 0?s:i.name)!==null&&a!==void 0?a:""})`}`;const c=v.forwardRef(l);return c[x$]=i,c}function S$({layoutId:e}){const t=v.useContext(np).id;return t&&e!==void 0?t+"-"+e:e}function k$(e,t){v.useContext(G1).strict}function C$(e){const{drag:t,layout:n}=is;if(!t&&!n)return{};const r={...t,...n};return{MeasureLayout:t!=null&&t.isEnabled(e)||n!=null&&n.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}const $$=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function dp(e){return typeof e!="string"||e.includes("-")?!1:!!($$.indexOf(e)>-1||/[A-Z]/u.test(e))}function Cm(e){const t=[{},{}];return e==null||e.values.forEach((n,r)=>{t[0][r]=n.get(),t[1][r]=n.getVelocity()}),t}function hp(e,t,n,r){if(typeof t=="function"){const[i,s]=Cm(r);t=t(n!==void 0?n:e.custom,i,s)}if(typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"){const[i,s]=Cm(r);t=t(n!==void 0?n:e.custom,i,s)}return t}const Ch=e=>Array.isArray(e),T$=e=>!!(e&&typeof e=="object"&&e.mix&&e.toValue),E$=e=>Ch(e)?e[e.length-1]||0:e,He=e=>!!(e&&e.getVelocity);function nl(e){const t=He(e)?e.get():e;return T$(t)?t.toValue():t}function P$({scrapeMotionValuesFromProps:e,createRenderState:t,onUpdate:n},r,i,s){const a={latestValues:A$(r,i,s,e),renderState:t()};return n&&(a.onMount=l=>n({props:r,current:l,...a}),a.onUpdate=l=>n(l)),a}const Z1=e=>(t,n)=>{const r=v.useContext(Cc),i=v.useContext(kc),s=()=>P$(e,t,r,i);return n?s():Sc(s)};function A$(e,t,n,r){const i={},s=r(e,{});for(const p in s)i[p]=nl(s[p]);let{initial:a,animate:l}=e;const c=Tc(e),u=Y1(e);t&&u&&!c&&e.inherit!==!1&&(a===void 0&&(a=t.initial),l===void 0&&(l=t.animate));let d=n?n.initial===!1:!1;d=d||a===!1;const h=d?l:a;if(h&&typeof h!="boolean"&&!$c(h)){const p=Array.isArray(h)?h:[h];for(let g=0;g<p.length;g++){const x=hp(e,p[g]);if(x){const{transitionEnd:b,transition:S,...m}=x;for(const y in m){let w=m[y];if(Array.isArray(w)){const $=d?w.length-1:0;w=w[$]}w!==null&&(i[y]=w)}for(const y in b)i[y]=b[y]}}}return i}const ps=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],ei=new Set(ps),J1=e=>t=>typeof t=="string"&&t.startsWith(e),ew=J1("--"),D$=J1("var(--"),fp=e=>D$(e)?R$.test(e.split("/*")[0].trim()):!1,R$=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,tw=(e,t)=>t&&typeof e=="number"?t.transform(e):e,kn=(e,t,n)=>n>t?t:n<e?e:n,gs={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},Po={...gs,transform:e=>kn(0,1,e)},xa={...gs,default:1},Vo=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),In=Vo("deg"),nn=Vo("%"),H=Vo("px"),M$=Vo("vh"),I$=Vo("vw"),$m={...nn,parse:e=>nn.parse(e)/100,transform:e=>nn.transform(e*100)},F$={borderWidth:H,borderTopWidth:H,borderRightWidth:H,borderBottomWidth:H,borderLeftWidth:H,borderRadius:H,radius:H,borderTopLeftRadius:H,borderTopRightRadius:H,borderBottomRightRadius:H,borderBottomLeftRadius:H,width:H,maxWidth:H,height:H,maxHeight:H,top:H,right:H,bottom:H,left:H,padding:H,paddingTop:H,paddingRight:H,paddingBottom:H,paddingLeft:H,margin:H,marginTop:H,marginRight:H,marginBottom:H,marginLeft:H,backgroundPositionX:H,backgroundPositionY:H},N$={rotate:In,rotateX:In,rotateY:In,rotateZ:In,scale:xa,scaleX:xa,scaleY:xa,scaleZ:xa,skew:In,skewX:In,skewY:In,distance:H,translateX:H,translateY:H,translateZ:H,x:H,y:H,z:H,perspective:H,transformPerspective:H,opacity:Po,originX:$m,originY:$m,originZ:H},Tm={...gs,transform:Math.round},pp={...F$,...N$,zIndex:Tm,size:H,fillOpacity:Po,strokeOpacity:Po,numOctaves:Tm},_$={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},L$=ps.length;function O$(e,t,n){let r="",i=!0;for(let s=0;s<L$;s++){const a=ps[s],l=e[a];if(l===void 0)continue;let c=!0;if(typeof l=="number"?c=l===(a.startsWith("scale")?1:0):c=parseFloat(l)===0,!c||n){const u=tw(l,pp[a]);if(!c){i=!1;const d=_$[a]||a;r+=`${d}(${u}) `}n&&(t[a]=u)}}return r=r.trim(),n?r=n(t,i?"":r):i&&(r="none"),r}function gp(e,t,n){const{style:r,vars:i,transformOrigin:s}=e;let a=!1,l=!1;for(const c in t){const u=t[c];if(ei.has(c)){a=!0;continue}else if(ew(c)){i[c]=u;continue}else{const d=tw(u,pp[c]);c.startsWith("origin")?(l=!0,s[c]=d):r[c]=d}}if(t.transform||(a||n?r.transform=O$(t,e.transform,n):r.transform&&(r.transform="none")),l){const{originX:c="50%",originY:u="50%",originZ:d=0}=s;r.transformOrigin=`${c} ${u} ${d}`}}const z$={offset:"stroke-dashoffset",array:"stroke-dasharray"},V$={offset:"strokeDashoffset",array:"strokeDasharray"};function B$(e,t,n=1,r=0,i=!0){e.pathLength=1;const s=i?z$:V$;e[s.offset]=H.transform(-r);const a=H.transform(t),l=H.transform(n);e[s.array]=`${a} ${l}`}function Em(e,t,n){return typeof e=="string"?e:H.transform(t+n*e)}function H$(e,t,n){const r=Em(t,e.x,e.width),i=Em(n,e.y,e.height);return`${r} ${i}`}function mp(e,{attrX:t,attrY:n,attrScale:r,originX:i,originY:s,pathLength:a,pathSpacing:l=1,pathOffset:c=0,...u},d,h){if(gp(e,u,h),d){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:p,style:g,dimensions:x}=e;p.transform&&(x&&(g.transform=p.transform),delete p.transform),x&&(i!==void 0||s!==void 0||g.transform)&&(g.transformOrigin=H$(x,i!==void 0?i:.5,s!==void 0?s:.5)),t!==void 0&&(p.x=t),n!==void 0&&(p.y=n),r!==void 0&&(p.scale=r),a!==void 0&&B$(p,a,l,c,!1)}const xp=()=>({style:{},transform:{},transformOrigin:{},vars:{}}),nw=()=>({...xp(),attrs:{}}),yp=e=>typeof e=="string"&&e.toLowerCase()==="svg";function rw(e,{style:t,vars:n},r,i){Object.assign(e.style,t,i&&i.getProjectionStyles(r));for(const s in n)e.style.setProperty(s,n[s])}const iw=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function sw(e,t,n,r){rw(e,t,void 0,r);for(const i in t.attrs)e.setAttribute(iw.has(i)?i:cp(i),t.attrs[i])}const Vl={};function U$(e){Object.assign(Vl,e)}function ow(e,{layout:t,layoutId:n}){return ei.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!Vl[e]||e==="opacity")}function vp(e,t,n){var r;const{style:i}=e,s={};for(const a in i)(He(i[a])||t.style&&He(t.style[a])||ow(a,e)||((r=n==null?void 0:n.getValue(a))===null||r===void 0?void 0:r.liveStyle)!==void 0)&&(s[a]=i[a]);return s}function aw(e,t,n){const r=vp(e,t,n);for(const i in e)if(He(e[i])||He(t[i])){const s=ps.indexOf(i)!==-1?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i;r[s]=e[i]}return r}function W$(e,t){try{t.dimensions=typeof e.getBBox=="function"?e.getBBox():e.getBoundingClientRect()}catch{t.dimensions={x:0,y:0,width:0,height:0}}}const Pm=["x","y","width","height","cx","cy","r"],G$={useVisualState:Z1({scrapeMotionValuesFromProps:aw,createRenderState:nw,onUpdate:({props:e,prevProps:t,current:n,renderState:r,latestValues:i})=>{if(!n)return;let s=!!e.drag;if(!s){for(const l in i)if(ei.has(l)){s=!0;break}}if(!s)return;let a=!t;if(t)for(let l=0;l<Pm.length;l++){const c=Pm[l];e[c]!==t[c]&&(a=!0)}a&&oe.read(()=>{W$(n,r),oe.render(()=>{mp(r,i,yp(n.tagName),e.transformTemplate),sw(n,r)})})}})},K$={useVisualState:Z1({scrapeMotionValuesFromProps:vp,createRenderState:xp})};function lw(e,t,n){for(const r in t)!He(t[r])&&!ow(r,n)&&(e[r]=t[r])}function Y$({transformTemplate:e},t){return v.useMemo(()=>{const n=xp();return gp(n,t,e),Object.assign({},n.vars,n.style)},[t])}function q$(e,t){const n=e.style||{},r={};return lw(r,n,e),Object.assign(r,Y$(e,t)),r}function Q$(e,t){const n={},r=q$(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}function X$(e,t,n,r){const i=v.useMemo(()=>{const s=nw();return mp(s,t,yp(r),e.transformTemplate),{...s.attrs,style:{...s.style}}},[t]);if(e.style){const s={};lw(s,e.style,e),i.style={...s,...i.style}}return i}function Z$(e=!1){return(n,r,i,{latestValues:s},a)=>{const c=(dp(n)?X$:Q$)(r,s,a,n),u=f$(r,typeof n=="string",e),d=n!==v.Fragment?{...u,...c,ref:i}:{},{children:h}=r,p=v.useMemo(()=>He(h)?h.get():h,[h]);return v.createElement(n,{...d,children:p})}}function J$(e,t){return function(r,{forwardMotionProps:i}={forwardMotionProps:!1}){const a={...dp(r)?G$:K$,preloadedFeatures:e,useRender:Z$(i),createVisualElement:t,Component:r};return j$(a)}}function cw(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}function Ec(e,t,n){const r=e.getProps();return hp(r,t,n!==void 0?n:r.custom,e)}const eT=op(()=>window.ScrollTimeline!==void 0);class tT{constructor(t){this.stop=()=>this.runAll("stop"),this.animations=t.filter(Boolean)}get finished(){return Promise.all(this.animations.map(t=>"finished"in t?t.finished:t))}getAll(t){return this.animations[0][t]}setAll(t,n){for(let r=0;r<this.animations.length;r++)this.animations[r][t]=n}attachTimeline(t,n){const r=this.animations.map(i=>{if(eT()&&i.attachTimeline)return i.attachTimeline(t);if(typeof n=="function")return n(i)});return()=>{r.forEach((i,s)=>{i&&i(),this.animations[s].stop()})}}get time(){return this.getAll("time")}set time(t){this.setAll("time",t)}get speed(){return this.getAll("speed")}set speed(t){this.setAll("speed",t)}get startTime(){return this.getAll("startTime")}get duration(){let t=0;for(let n=0;n<this.animations.length;n++)t=Math.max(t,this.animations[n].duration);return t}runAll(t){this.animations.forEach(n=>n[t]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}class nT extends tT{then(t,n){return Promise.all(this.animations).then(t).catch(n)}}function wp(e,t){return e?e[t]||e.default||e:void 0}const $h=2e4;function uw(e){let t=0;const n=50;let r=e.next(t);for(;!r.done&&t<$h;)t+=n,r=e.next(t);return t>=$h?1/0:t}function bp(e){return typeof e=="function"}function Am(e,t){e.timeline=t,e.onfinish=null}const jp=e=>Array.isArray(e)&&typeof e[0]=="number",rT={linearEasing:void 0};function iT(e,t){const n=op(e);return()=>{var r;return(r=rT[t])!==null&&r!==void 0?r:n()}}const Bl=iT(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),dw=(e,t,n=10)=>{let r="";const i=Math.max(Math.round(t/n),2);for(let s=0;s<i;s++)r+=e(rs(0,i-1,s))+", ";return`linear(${r.substring(0,r.length-2)})`};function hw(e){return!!(typeof e=="function"&&Bl()||!e||typeof e=="string"&&(e in Th||Bl())||jp(e)||Array.isArray(e)&&e.every(hw))}const Bs=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,Th={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Bs([0,.65,.55,1]),circOut:Bs([.55,0,1,.45]),backIn:Bs([.31,.01,.66,-.59]),backOut:Bs([.33,1.53,.69,.99])};function fw(e,t){if(e)return typeof e=="function"&&Bl()?dw(e,t):jp(e)?Bs(e):Array.isArray(e)?e.map(n=>fw(n,t)||Th.easeOut):Th[e]}const It={x:!1,y:!1};function pw(){return It.x||It.y}function sT(e,t,n){var r;if(e instanceof Element)return[e];if(typeof e=="string"){let i=document;const s=(r=void 0)!==null&&r!==void 0?r:i.querySelectorAll(e);return s?Array.from(s):[]}return Array.from(e)}function gw(e,t){const n=sT(e),r=new AbortController,i={passive:!0,...t,signal:r.signal};return[n,i,()=>r.abort()]}function Dm(e){return t=>{t.pointerType==="touch"||pw()||e(t)}}function oT(e,t,n={}){const[r,i,s]=gw(e,n),a=Dm(l=>{const{target:c}=l,u=t(l);if(typeof u!="function"||!c)return;const d=Dm(h=>{u(h),c.removeEventListener("pointerleave",d)});c.addEventListener("pointerleave",d,i)});return r.forEach(l=>{l.addEventListener("pointerenter",a,i)}),s}const mw=(e,t)=>t?e===t?!0:mw(e,t.parentElement):!1,Sp=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1,aT=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function lT(e){return aT.has(e.tagName)||e.tabIndex!==-1}const Hs=new WeakSet;function Rm(e){return t=>{t.key==="Enter"&&e(t)}}function pu(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}const cT=(e,t)=>{const n=e.currentTarget;if(!n)return;const r=Rm(()=>{if(Hs.has(n))return;pu(n,"down");const i=Rm(()=>{pu(n,"up")}),s=()=>pu(n,"cancel");n.addEventListener("keyup",i,t),n.addEventListener("blur",s,t)});n.addEventListener("keydown",r,t),n.addEventListener("blur",()=>n.removeEventListener("keydown",r),t)};function Mm(e){return Sp(e)&&!pw()}function uT(e,t,n={}){const[r,i,s]=gw(e,n),a=l=>{const c=l.currentTarget;if(!Mm(l)||Hs.has(c))return;Hs.add(c);const u=t(l),d=(g,x)=>{window.removeEventListener("pointerup",h),window.removeEventListener("pointercancel",p),!(!Mm(g)||!Hs.has(c))&&(Hs.delete(c),typeof u=="function"&&u(g,{success:x}))},h=g=>{d(g,n.useGlobalTarget||mw(c,g.target))},p=g=>{d(g,!1)};window.addEventListener("pointerup",h,i),window.addEventListener("pointercancel",p,i)};return r.forEach(l=>{!lT(l)&&l.getAttribute("tabindex")===null&&(l.tabIndex=0),(n.useGlobalTarget?window:l).addEventListener("pointerdown",a,i),l.addEventListener("focus",u=>cT(u,i),i)}),s}function dT(e){return e==="x"||e==="y"?It[e]?null:(It[e]=!0,()=>{It[e]=!1}):It.x||It.y?null:(It.x=It.y=!0,()=>{It.x=It.y=!1})}const xw=new Set(["width","height","top","left","right","bottom",...ps]);let rl;function hT(){rl=void 0}const rn={now:()=>(rl===void 0&&rn.set(Fe.isProcessing||a$.useManualTiming?Fe.timestamp:performance.now()),rl),set:e=>{rl=e,queueMicrotask(hT)}};function kp(e,t){e.indexOf(t)===-1&&e.push(t)}function Cp(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}class $p{constructor(){this.subscriptions=[]}add(t){return kp(this.subscriptions,t),()=>Cp(this.subscriptions,t)}notify(t,n,r){const i=this.subscriptions.length;if(i)if(i===1)this.subscriptions[0](t,n,r);else for(let s=0;s<i;s++){const a=this.subscriptions[s];a&&a(t,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}function yw(e,t){return t?e*(1e3/t):0}const Im=30,fT=e=>!isNaN(parseFloat(e));class pT{constructor(t,n={}){this.version="11.18.2",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(r,i=!0)=>{const s=rn.now();this.updatedAt!==s&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),i&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=n.owner}setCurrent(t){this.current=t,this.updatedAt=rn.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=fT(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,n){this.events[t]||(this.events[t]=new $p);const r=this.events[t].add(n);return t==="change"?()=>{r(),oe.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t,n=!0){!n||!this.passiveEffect?this.updateAndNotify(t,n):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,n,r){this.set(n),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-r}jump(t,n=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const t=rn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>Im)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,Im);return yw(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(t){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=t(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ao(e,t){return new pT(e,t)}function gT(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,Ao(n))}function Tp(e,t){const n=Ec(e,t);let{transitionEnd:r={},transition:i={},...s}=n||{};s={...s,...r};for(const a in s){const l=E$(s[a]);gT(e,a,l)}}function mT(e){return!!(He(e)&&e.add)}function Eh(e,t){const n=e.getValue("willChange");if(mT(n))return n.add(t)}function vw(e){return e.props[q1]}const ww=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,xT=1e-7,yT=12;function vT(e,t,n,r,i){let s,a,l=0;do a=t+(n-t)/2,s=ww(a,r,i)-e,s>0?n=a:t=a;while(Math.abs(s)>xT&&++l<yT);return a}function Bo(e,t,n,r){if(e===t&&n===r)return pt;const i=s=>vT(s,0,1,e,n);return s=>s===0||s===1?s:ww(i(s),t,r)}const bw=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,jw=e=>t=>1-e(1-t),Sw=Bo(.33,1.53,.69,.99),Ep=jw(Sw),kw=bw(Ep),Cw=e=>(e*=2)<1?.5*Ep(e):.5*(2-Math.pow(2,-10*(e-1))),Pp=e=>1-Math.sin(Math.acos(e)),$w=jw(Pp),Tw=bw(Pp),Ew=e=>/^0[^.\s]+$/u.test(e);function wT(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||Ew(e):!0}const no=e=>Math.round(e*1e5)/1e5,Ap=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function bT(e){return e==null}const jT=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Dp=(e,t)=>n=>!!(typeof n=="string"&&jT.test(n)&&n.startsWith(e)||t&&!bT(n)&&Object.prototype.hasOwnProperty.call(n,t)),Pw=(e,t,n)=>r=>{if(typeof r!="string")return r;const[i,s,a,l]=r.match(Ap);return{[e]:parseFloat(i),[t]:parseFloat(s),[n]:parseFloat(a),alpha:l!==void 0?parseFloat(l):1}},ST=e=>kn(0,255,e),gu={...gs,transform:e=>Math.round(ST(e))},_r={test:Dp("rgb","red"),parse:Pw("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:r=1})=>"rgba("+gu.transform(e)+", "+gu.transform(t)+", "+gu.transform(n)+", "+no(Po.transform(r))+")"};function kT(e){let t="",n="",r="",i="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}const Ph={test:Dp("#"),parse:kT,transform:_r.transform},Ii={test:Dp("hsl","hue"),parse:Pw("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>"hsla("+Math.round(e)+", "+nn.transform(no(t))+", "+nn.transform(no(n))+", "+no(Po.transform(r))+")"},Ve={test:e=>_r.test(e)||Ph.test(e)||Ii.test(e),parse:e=>_r.test(e)?_r.parse(e):Ii.test(e)?Ii.parse(e):Ph.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?_r.transform(e):Ii.transform(e)},CT=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function $T(e){var t,n;return isNaN(e)&&typeof e=="string"&&(((t=e.match(Ap))===null||t===void 0?void 0:t.length)||0)+(((n=e.match(CT))===null||n===void 0?void 0:n.length)||0)>0}const Aw="number",Dw="color",TT="var",ET="var(",Fm="${}",PT=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Do(e){const t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[];let s=0;const l=t.replace(PT,c=>(Ve.test(c)?(r.color.push(s),i.push(Dw),n.push(Ve.parse(c))):c.startsWith(ET)?(r.var.push(s),i.push(TT),n.push(c)):(r.number.push(s),i.push(Aw),n.push(parseFloat(c))),++s,Fm)).split(Fm);return{values:n,split:l,indexes:r,types:i}}function Rw(e){return Do(e).values}function Mw(e){const{split:t,types:n}=Do(e),r=t.length;return i=>{let s="";for(let a=0;a<r;a++)if(s+=t[a],i[a]!==void 0){const l=n[a];l===Aw?s+=no(i[a]):l===Dw?s+=Ve.transform(i[a]):s+=i[a]}return s}}const AT=e=>typeof e=="number"?0:e;function DT(e){const t=Rw(e);return Mw(e)(t.map(AT))}const rr={test:$T,parse:Rw,createTransformer:Mw,getAnimatableNone:DT},RT=new Set(["brightness","contrast","saturate","opacity"]);function MT(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[r]=n.match(Ap)||[];if(!r)return e;const i=n.replace(r,"");let s=RT.has(t)?1:0;return r!==n&&(s*=100),t+"("+s+i+")"}const IT=/\b([a-z-]*)\(.*?\)/gu,Ah={...rr,getAnimatableNone:e=>{const t=e.match(IT);return t?t.map(MT).join(" "):e}},FT={...pp,color:Ve,backgroundColor:Ve,outlineColor:Ve,fill:Ve,stroke:Ve,borderColor:Ve,borderTopColor:Ve,borderRightColor:Ve,borderBottomColor:Ve,borderLeftColor:Ve,filter:Ah,WebkitFilter:Ah},Rp=e=>FT[e];function Iw(e,t){let n=Rp(e);return n!==Ah&&(n=rr),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const NT=new Set(["auto","none","0"]);function _T(e,t,n){let r=0,i;for(;r<e.length&&!i;){const s=e[r];typeof s=="string"&&!NT.has(s)&&Do(s).values.length&&(i=e[r]),r++}if(i&&n)for(const s of t)e[s]=Iw(n,i)}const Nm=e=>e===gs||e===H,_m=(e,t)=>parseFloat(e.split(", ")[t]),Lm=(e,t)=>(n,{transform:r})=>{if(r==="none"||!r)return 0;const i=r.match(/^matrix3d\((.+)\)$/u);if(i)return _m(i[1],t);{const s=r.match(/^matrix\((.+)\)$/u);return s?_m(s[1],e):0}},LT=new Set(["x","y","z"]),OT=ps.filter(e=>!LT.has(e));function zT(e){const t=[];return OT.forEach(n=>{const r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t}const ss={width:({x:e},{paddingLeft:t="0",paddingRight:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),height:({y:e},{paddingTop:t="0",paddingBottom:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:Lm(4,13),y:Lm(5,14)};ss.translateX=ss.x;ss.translateY=ss.y;const Br=new Set;let Dh=!1,Rh=!1;function Fw(){if(Rh){const e=Array.from(Br).filter(r=>r.needsMeasurement),t=new Set(e.map(r=>r.element)),n=new Map;t.forEach(r=>{const i=zT(r);i.length&&(n.set(r,i),r.render())}),e.forEach(r=>r.measureInitialState()),t.forEach(r=>{r.render();const i=n.get(r);i&&i.forEach(([s,a])=>{var l;(l=r.getValue(s))===null||l===void 0||l.set(a)})}),e.forEach(r=>r.measureEndState()),e.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Rh=!1,Dh=!1,Br.forEach(e=>e.complete()),Br.clear()}function Nw(){Br.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(Rh=!0)})}function VT(){Nw(),Fw()}class Mp{constructor(t,n,r,i,s,a=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...t],this.onComplete=n,this.name=r,this.motionValue=i,this.element=s,this.isAsync=a}scheduleResolve(){this.isScheduled=!0,this.isAsync?(Br.add(this),Dh||(Dh=!0,oe.read(Nw),oe.resolveKeyframes(Fw))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:t,name:n,element:r,motionValue:i}=this;for(let s=0;s<t.length;s++)if(t[s]===null)if(s===0){const a=i==null?void 0:i.get(),l=t[t.length-1];if(a!==void 0)t[0]=a;else if(r&&n){const c=r.readValue(n,l);c!=null&&(t[0]=c)}t[0]===void 0&&(t[0]=l),i&&a===void 0&&i.set(t[0])}else t[s]=t[s-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),Br.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,Br.delete(this))}resume(){this.isComplete||this.scheduleResolve()}}const _w=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),BT=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function HT(e){const t=BT.exec(e);if(!t)return[,];const[,n,r,i]=t;return[`--${n??r}`,i]}function Lw(e,t,n=1){const[r,i]=HT(e);if(!r)return;const s=window.getComputedStyle(t).getPropertyValue(r);if(s){const a=s.trim();return _w(a)?parseFloat(a):a}return fp(i)?Lw(i,t,n+1):i}const Ow=e=>t=>t.test(e),UT={test:e=>e==="auto",parse:e=>e},zw=[gs,H,nn,In,I$,M$,UT],Om=e=>zw.find(Ow(e));class Vw extends Mp{constructor(t,n,r,i,s){super(t,n,r,i,s,!0)}readKeyframes(){const{unresolvedKeyframes:t,element:n,name:r}=this;if(!n||!n.current)return;super.readKeyframes();for(let c=0;c<t.length;c++){let u=t[c];if(typeof u=="string"&&(u=u.trim(),fp(u))){const d=Lw(u,n.current);d!==void 0&&(t[c]=d),c===t.length-1&&(this.finalKeyframe=u)}}if(this.resolveNoneKeyframes(),!xw.has(r)||t.length!==2)return;const[i,s]=t,a=Om(i),l=Om(s);if(a!==l)if(Nm(a)&&Nm(l))for(let c=0;c<t.length;c++){const u=t[c];typeof u=="string"&&(t[c]=parseFloat(u))}else this.needsMeasurement=!0}resolveNoneKeyframes(){const{unresolvedKeyframes:t,name:n}=this,r=[];for(let i=0;i<t.length;i++)wT(t[i])&&r.push(i);r.length&&_T(t,r,n)}measureInitialState(){const{element:t,unresolvedKeyframes:n,name:r}=this;if(!t||!t.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ss[r](t.measureViewportBox(),window.getComputedStyle(t.current)),n[0]=this.measuredOrigin;const i=n[n.length-1];i!==void 0&&t.getValue(r,i).jump(i,!1)}measureEndState(){var t;const{element:n,name:r,unresolvedKeyframes:i}=this;if(!n||!n.current)return;const s=n.getValue(r);s&&s.jump(this.measuredOrigin,!1);const a=i.length-1,l=i[a];i[a]=ss[r](n.measureViewportBox(),window.getComputedStyle(n.current)),l!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=l),!((t=this.removedTransforms)===null||t===void 0)&&t.length&&this.removedTransforms.forEach(([c,u])=>{n.getValue(c).set(u)}),this.resolveNoneKeyframes()}}const zm=(e,t)=>t==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(rr.test(e)||e==="0")&&!e.startsWith("url("));function WT(e){const t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function GT(e,t,n,r){const i=e[0];if(i===null)return!1;if(t==="display"||t==="visibility")return!0;const s=e[e.length-1],a=zm(i,t),l=zm(s,t);return!a||!l?!1:WT(e)||(n==="spring"||bp(n))&&r}const KT=e=>e!==null;function Pc(e,{repeat:t,repeatType:n="loop"},r){const i=e.filter(KT),s=t&&n!=="loop"&&t%2===1?0:i.length-1;return!s||r===void 0?i[s]:r}const YT=40;class Bw{constructor({autoplay:t=!0,delay:n=0,type:r="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:a="loop",...l}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=rn.now(),this.options={autoplay:t,delay:n,type:r,repeat:i,repeatDelay:s,repeatType:a,...l},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>YT?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&VT(),this._resolved}onKeyframesResolved(t,n){this.resolvedAt=rn.now(),this.hasAttemptedResolve=!0;const{name:r,type:i,velocity:s,delay:a,onComplete:l,onUpdate:c,isGenerator:u}=this.options;if(!u&&!GT(t,r,i,s))if(a)this.options.duration=0;else{c&&c(Pc(t,this.options,n)),l&&l(),this.resolveFinishedPromise();return}const d=this.initPlayback(t,n);d!==!1&&(this._resolved={keyframes:t,finalKeyframe:n,...d},this.onPostResolved())}onPostResolved(){}then(t,n){return this.currentFinishedPromise.then(t,n)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(t=>{this.resolveFinishedPromise=t})}}const ue=(e,t,n)=>e+(t-e)*n;function mu(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function qT({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,s=0,a=0;if(!t)i=s=a=n;else{const l=n<.5?n*(1+t):n+t-n*t,c=2*n-l;i=mu(c,l,e+1/3),s=mu(c,l,e),a=mu(c,l,e-1/3)}return{red:Math.round(i*255),green:Math.round(s*255),blue:Math.round(a*255),alpha:r}}function Hl(e,t){return n=>n>0?t:e}const xu=(e,t,n)=>{const r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},QT=[Ph,_r,Ii],XT=e=>QT.find(t=>t.test(e));function Vm(e){const t=XT(e);if(!t)return!1;let n=t.parse(e);return t===Ii&&(n=qT(n)),n}const Bm=(e,t)=>{const n=Vm(e),r=Vm(t);if(!n||!r)return Hl(e,t);const i={...n};return s=>(i.red=xu(n.red,r.red,s),i.green=xu(n.green,r.green,s),i.blue=xu(n.blue,r.blue,s),i.alpha=ue(n.alpha,r.alpha,s),_r.transform(i))},ZT=(e,t)=>n=>t(e(n)),Ho=(...e)=>e.reduce(ZT),Mh=new Set(["none","hidden"]);function JT(e,t){return Mh.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function e5(e,t){return n=>ue(e,t,n)}function Ip(e){return typeof e=="number"?e5:typeof e=="string"?fp(e)?Hl:Ve.test(e)?Bm:r5:Array.isArray(e)?Hw:typeof e=="object"?Ve.test(e)?Bm:t5:Hl}function Hw(e,t){const n=[...e],r=n.length,i=e.map((s,a)=>Ip(s)(s,t[a]));return s=>{for(let a=0;a<r;a++)n[a]=i[a](s);return n}}function t5(e,t){const n={...e,...t},r={};for(const i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=Ip(e[i])(e[i],t[i]));return i=>{for(const s in r)n[s]=r[s](i);return n}}function n5(e,t){var n;const r=[],i={color:0,var:0,number:0};for(let s=0;s<t.values.length;s++){const a=t.types[s],l=e.indexes[a][i[a]],c=(n=e.values[l])!==null&&n!==void 0?n:0;r[s]=c,i[a]++}return r}const r5=(e,t)=>{const n=rr.createTransformer(t),r=Do(e),i=Do(t);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?Mh.has(e)&&!i.values.length||Mh.has(t)&&!r.values.length?JT(e,t):Ho(Hw(n5(r,i),i.values),n):Hl(e,t)};function Uw(e,t,n){return typeof e=="number"&&typeof t=="number"&&typeof n=="number"?ue(e,t,n):Ip(e)(e,t)}const i5=5;function Ww(e,t,n){const r=Math.max(t-i5,0);return yw(n-e(r),t-r)}const fe={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},yu=.001;function s5({duration:e=fe.duration,bounce:t=fe.bounce,velocity:n=fe.velocity,mass:r=fe.mass}){let i,s,a=1-t;a=kn(fe.minDamping,fe.maxDamping,a),e=kn(fe.minDuration,fe.maxDuration,yn(e)),a<1?(i=u=>{const d=u*a,h=d*e,p=d-n,g=Ih(u,a),x=Math.exp(-h);return yu-p/g*x},s=u=>{const h=u*a*e,p=h*n+n,g=Math.pow(a,2)*Math.pow(u,2)*e,x=Math.exp(-h),b=Ih(Math.pow(u,2),a);return(-i(u)+yu>0?-1:1)*((p-g)*x)/b}):(i=u=>{const d=Math.exp(-u*e),h=(u-n)*e+1;return-yu+d*h},s=u=>{const d=Math.exp(-u*e),h=(n-u)*(e*e);return d*h});const l=5/e,c=a5(i,s,l);if(e=xn(e),isNaN(c))return{stiffness:fe.stiffness,damping:fe.damping,duration:e};{const u=Math.pow(c,2)*r;return{stiffness:u,damping:a*2*Math.sqrt(r*u),duration:e}}}const o5=12;function a5(e,t,n){let r=n;for(let i=1;i<o5;i++)r=r-e(r)/t(r);return r}function Ih(e,t){return e*Math.sqrt(1-t*t)}const l5=["duration","bounce"],c5=["stiffness","damping","mass"];function Hm(e,t){return t.some(n=>e[n]!==void 0)}function u5(e){let t={velocity:fe.velocity,stiffness:fe.stiffness,damping:fe.damping,mass:fe.mass,isResolvedFromDuration:!1,...e};if(!Hm(e,c5)&&Hm(e,l5))if(e.visualDuration){const n=e.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,s=2*kn(.05,1,1-(e.bounce||0))*Math.sqrt(i);t={...t,mass:fe.mass,stiffness:i,damping:s}}else{const n=s5(e);t={...t,...n,mass:fe.mass},t.isResolvedFromDuration=!0}return t}function Gw(e=fe.visualDuration,t=fe.bounce){const n=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:r,restDelta:i}=n;const s=n.keyframes[0],a=n.keyframes[n.keyframes.length-1],l={done:!1,value:s},{stiffness:c,damping:u,mass:d,duration:h,velocity:p,isResolvedFromDuration:g}=u5({...n,velocity:-yn(n.velocity||0)}),x=p||0,b=u/(2*Math.sqrt(c*d)),S=a-s,m=yn(Math.sqrt(c/d)),y=Math.abs(S)<5;r||(r=y?fe.restSpeed.granular:fe.restSpeed.default),i||(i=y?fe.restDelta.granular:fe.restDelta.default);let w;if(b<1){const j=Ih(m,b);w=k=>{const C=Math.exp(-b*m*k);return a-C*((x+b*m*S)/j*Math.sin(j*k)+S*Math.cos(j*k))}}else if(b===1)w=j=>a-Math.exp(-m*j)*(S+(x+m*S)*j);else{const j=m*Math.sqrt(b*b-1);w=k=>{const C=Math.exp(-b*m*k),T=Math.min(j*k,300);return a-C*((x+b*m*S)*Math.sinh(T)+j*S*Math.cosh(T))/j}}const $={calculatedDuration:g&&h||null,next:j=>{const k=w(j);if(g)l.done=j>=h;else{let C=0;b<1&&(C=j===0?xn(x):Ww(w,j,k));const T=Math.abs(C)<=r,P=Math.abs(a-k)<=i;l.done=T&&P}return l.value=l.done?a:k,l},toString:()=>{const j=Math.min(uw($),$h),k=dw(C=>$.next(j*C).value,j,30);return j+"ms "+k}};return $}function Um({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:s=500,modifyTarget:a,min:l,max:c,restDelta:u=.5,restSpeed:d}){const h=e[0],p={done:!1,value:h},g=T=>l!==void 0&&T<l||c!==void 0&&T>c,x=T=>l===void 0?c:c===void 0||Math.abs(l-T)<Math.abs(c-T)?l:c;let b=n*t;const S=h+b,m=a===void 0?S:a(S);m!==S&&(b=m-h);const y=T=>-b*Math.exp(-T/r),w=T=>m+y(T),$=T=>{const P=y(T),A=w(T);p.done=Math.abs(P)<=u,p.value=p.done?m:A};let j,k;const C=T=>{g(p.value)&&(j=T,k=Gw({keyframes:[p.value,x(p.value)],velocity:Ww(w,T,p.value),damping:i,stiffness:s,restDelta:u,restSpeed:d}))};return C(0),{calculatedDuration:null,next:T=>{let P=!1;return!k&&j===void 0&&(P=!0,$(T),C(T)),j!==void 0&&T>=j?k.next(T-j):(!P&&$(T),p)}}}const d5=Bo(.42,0,1,1),h5=Bo(0,0,.58,1),Kw=Bo(.42,0,.58,1),f5=e=>Array.isArray(e)&&typeof e[0]!="number",p5={linear:pt,easeIn:d5,easeInOut:Kw,easeOut:h5,circIn:Pp,circInOut:Tw,circOut:$w,backIn:Ep,backInOut:kw,backOut:Sw,anticipate:Cw},Wm=e=>{if(jp(e)){U1(e.length===4);const[t,n,r,i]=e;return Bo(t,n,r,i)}else if(typeof e=="string")return p5[e];return e};function g5(e,t,n){const r=[],i=n||Uw,s=e.length-1;for(let a=0;a<s;a++){let l=i(e[a],e[a+1]);if(t){const c=Array.isArray(t)?t[a]||pt:t;l=Ho(c,l)}r.push(l)}return r}function m5(e,t,{clamp:n=!0,ease:r,mixer:i}={}){const s=e.length;if(U1(s===t.length),s===1)return()=>t[0];if(s===2&&t[0]===t[1])return()=>t[1];const a=e[0]===e[1];e[0]>e[s-1]&&(e=[...e].reverse(),t=[...t].reverse());const l=g5(t,r,i),c=l.length,u=d=>{if(a&&d<e[0])return t[0];let h=0;if(c>1)for(;h<e.length-2&&!(d<e[h+1]);h++);const p=rs(e[h],e[h+1],d);return l[h](p)};return n?d=>u(kn(e[0],e[s-1],d)):u}function x5(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const i=rs(0,t,r);e.push(ue(n,1,i))}}function y5(e){const t=[0];return x5(t,e.length-1),t}function v5(e,t){return e.map(n=>n*t)}function w5(e,t){return e.map(()=>t||Kw).splice(0,e.length-1)}function Ul({duration:e=300,keyframes:t,times:n,ease:r="easeInOut"}){const i=f5(r)?r.map(Wm):Wm(r),s={done:!1,value:t[0]},a=v5(n&&n.length===t.length?n:y5(t),e),l=m5(a,t,{ease:Array.isArray(i)?i:w5(t,i)});return{calculatedDuration:e,next:c=>(s.value=l(c),s.done=c>=e,s)}}const b5=e=>{const t=({timestamp:n})=>e(n);return{start:()=>oe.update(t,!0),stop:()=>nr(t),now:()=>Fe.isProcessing?Fe.timestamp:rn.now()}},j5={decay:Um,inertia:Um,tween:Ul,keyframes:Ul,spring:Gw},S5=e=>e/100;class Fp extends Bw{constructor(t){super(t),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();const{onStop:c}=this.options;c&&c()};const{name:n,motionValue:r,element:i,keyframes:s}=this.options,a=(i==null?void 0:i.KeyframeResolver)||Mp,l=(c,u)=>this.onKeyframesResolved(c,u);this.resolver=new a(s,l,n,r,i),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(t){const{type:n="keyframes",repeat:r=0,repeatDelay:i=0,repeatType:s,velocity:a=0}=this.options,l=bp(n)?n:j5[n]||Ul;let c,u;l!==Ul&&typeof t[0]!="number"&&(c=Ho(S5,Uw(t[0],t[1])),t=[0,100]);const d=l({...this.options,keyframes:t});s==="mirror"&&(u=l({...this.options,keyframes:[...t].reverse(),velocity:-a})),d.calculatedDuration===null&&(d.calculatedDuration=uw(d));const{calculatedDuration:h}=d,p=h+i,g=p*(r+1)-i;return{generator:d,mirroredGenerator:u,mapPercentToKeyframes:c,calculatedDuration:h,resolvedDuration:p,totalDuration:g}}onPostResolved(){const{autoplay:t=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!t?this.pause():this.state=this.pendingPlayState}tick(t,n=!1){const{resolved:r}=this;if(!r){const{keyframes:T}=this.options;return{done:!0,value:T[T.length-1]}}const{finalKeyframe:i,generator:s,mirroredGenerator:a,mapPercentToKeyframes:l,keyframes:c,calculatedDuration:u,totalDuration:d,resolvedDuration:h}=r;if(this.startTime===null)return s.next(0);const{delay:p,repeat:g,repeatType:x,repeatDelay:b,onUpdate:S}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-d/this.speed,this.startTime)),n?this.currentTime=t:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(t-this.startTime)*this.speed;const m=this.currentTime-p*(this.speed>=0?1:-1),y=this.speed>=0?m<0:m>d;this.currentTime=Math.max(m,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=d);let w=this.currentTime,$=s;if(g){const T=Math.min(this.currentTime,d)/h;let P=Math.floor(T),A=T%1;!A&&T>=1&&(A=1),A===1&&P--,P=Math.min(P,g+1),!!(P%2)&&(x==="reverse"?(A=1-A,b&&(A-=b/h)):x==="mirror"&&($=a)),w=kn(0,1,A)*h}const j=y?{done:!1,value:c[0]}:$.next(w);l&&(j.value=l(j.value));let{done:k}=j;!y&&u!==null&&(k=this.speed>=0?this.currentTime>=d:this.currentTime<=0);const C=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&k);return C&&i!==void 0&&(j.value=Pc(c,this.options,i)),S&&S(j.value),C&&this.finish(),j}get duration(){const{resolved:t}=this;return t?yn(t.calculatedDuration):0}get time(){return yn(this.currentTime)}set time(t){t=xn(t),this.currentTime=t,this.holdTime!==null||this.speed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.speed)}get speed(){return this.playbackSpeed}set speed(t){const n=this.playbackSpeed!==t;this.playbackSpeed=t,n&&(this.time=yn(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;const{driver:t=b5,onPlay:n,startTime:r}=this.options;this.driver||(this.driver=t(s=>this.tick(s))),n&&n();const i=this.driver.now();this.holdTime!==null?this.startTime=i-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=i):this.startTime=r??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var t;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(t=this.currentTime)!==null&&t!==void 0?t:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";const{onComplete:t}=this.options;t&&t()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}}const k5=new Set(["opacity","clipPath","filter","transform"]);function C5(e,t,n,{delay:r=0,duration:i=300,repeat:s=0,repeatType:a="loop",ease:l="easeInOut",times:c}={}){const u={[t]:n};c&&(u.offset=c);const d=fw(l,i);return Array.isArray(d)&&(u.easing=d),e.animate(u,{delay:r,duration:i,easing:Array.isArray(d)?"linear":d,fill:"both",iterations:s+1,direction:a==="reverse"?"alternate":"normal"})}const $5=op(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),Wl=10,T5=2e4;function E5(e){return bp(e.type)||e.type==="spring"||!hw(e.ease)}function P5(e,t){const n=new Fp({...t,keyframes:e,repeat:0,delay:0,isGenerator:!0});let r={done:!1,value:e[0]};const i=[];let s=0;for(;!r.done&&s<T5;)r=n.sample(s),i.push(r.value),s+=Wl;return{times:void 0,keyframes:i,duration:s-Wl,ease:"linear"}}const Yw={anticipate:Cw,backInOut:kw,circInOut:Tw};function A5(e){return e in Yw}class Gm extends Bw{constructor(t){super(t);const{name:n,motionValue:r,element:i,keyframes:s}=this.options;this.resolver=new Vw(s,(a,l)=>this.onKeyframesResolved(a,l),n,r,i),this.resolver.scheduleResolve()}initPlayback(t,n){let{duration:r=300,times:i,ease:s,type:a,motionValue:l,name:c,startTime:u}=this.options;if(!l.owner||!l.owner.current)return!1;if(typeof s=="string"&&Bl()&&A5(s)&&(s=Yw[s]),E5(this.options)){const{onComplete:h,onUpdate:p,motionValue:g,element:x,...b}=this.options,S=P5(t,b);t=S.keyframes,t.length===1&&(t[1]=t[0]),r=S.duration,i=S.times,s=S.ease,a="keyframes"}const d=C5(l.owner.current,c,t,{...this.options,duration:r,times:i,ease:s});return d.startTime=u??this.calcStartTime(),this.pendingTimeline?(Am(d,this.pendingTimeline),this.pendingTimeline=void 0):d.onfinish=()=>{const{onComplete:h}=this.options;l.set(Pc(t,this.options,n)),h&&h(),this.cancel(),this.resolveFinishedPromise()},{animation:d,duration:r,times:i,type:a,ease:s,keyframes:t}}get duration(){const{resolved:t}=this;if(!t)return 0;const{duration:n}=t;return yn(n)}get time(){const{resolved:t}=this;if(!t)return 0;const{animation:n}=t;return yn(n.currentTime||0)}set time(t){const{resolved:n}=this;if(!n)return;const{animation:r}=n;r.currentTime=xn(t)}get speed(){const{resolved:t}=this;if(!t)return 1;const{animation:n}=t;return n.playbackRate}set speed(t){const{resolved:n}=this;if(!n)return;const{animation:r}=n;r.playbackRate=t}get state(){const{resolved:t}=this;if(!t)return"idle";const{animation:n}=t;return n.playState}get startTime(){const{resolved:t}=this;if(!t)return null;const{animation:n}=t;return n.startTime}attachTimeline(t){if(!this._resolved)this.pendingTimeline=t;else{const{resolved:n}=this;if(!n)return pt;const{animation:r}=n;Am(r,t)}return pt}play(){if(this.isStopped)return;const{resolved:t}=this;if(!t)return;const{animation:n}=t;n.playState==="finished"&&this.updateFinishedPromise(),n.play()}pause(){const{resolved:t}=this;if(!t)return;const{animation:n}=t;n.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();const{resolved:t}=this;if(!t)return;const{animation:n,keyframes:r,duration:i,type:s,ease:a,times:l}=t;if(n.playState==="idle"||n.playState==="finished")return;if(this.time){const{motionValue:u,onUpdate:d,onComplete:h,element:p,...g}=this.options,x=new Fp({...g,keyframes:r,duration:i,type:s,ease:a,times:l,isGenerator:!0}),b=xn(this.time);u.setWithVelocity(x.sample(b-Wl).value,x.sample(b).value,Wl)}const{onStop:c}=this.options;c&&c(),this.cancel()}complete(){const{resolved:t}=this;t&&t.animation.finish()}cancel(){const{resolved:t}=this;t&&t.animation.cancel()}static supports(t){const{motionValue:n,name:r,repeatDelay:i,repeatType:s,damping:a,type:l}=t;if(!n||!n.owner||!(n.owner.current instanceof HTMLElement))return!1;const{onUpdate:c,transformTemplate:u}=n.owner.getProps();return $5()&&r&&k5.has(r)&&!c&&!u&&!i&&s!=="mirror"&&a!==0&&l!=="inertia"}}const D5={type:"spring",stiffness:500,damping:25,restSpeed:10},R5=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),M5={type:"keyframes",duration:.8},I5={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},F5=(e,{keyframes:t})=>t.length>2?M5:ei.has(e)?e.startsWith("scale")?R5(t[1]):D5:I5;function N5({when:e,delay:t,delayChildren:n,staggerChildren:r,staggerDirection:i,repeat:s,repeatType:a,repeatDelay:l,from:c,elapsed:u,...d}){return!!Object.keys(d).length}const Np=(e,t,n,r={},i,s)=>a=>{const l=wp(r,e)||{},c=l.delay||r.delay||0;let{elapsed:u=0}=r;u=u-xn(c);let d={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:t.getVelocity(),...l,delay:-u,onUpdate:p=>{t.set(p),l.onUpdate&&l.onUpdate(p)},onComplete:()=>{a(),l.onComplete&&l.onComplete()},name:e,motionValue:t,element:s?void 0:i};N5(l)||(d={...d,...F5(e,d)}),d.duration&&(d.duration=xn(d.duration)),d.repeatDelay&&(d.repeatDelay=xn(d.repeatDelay)),d.from!==void 0&&(d.keyframes[0]=d.from);let h=!1;if((d.type===!1||d.duration===0&&!d.repeatDelay)&&(d.duration=0,d.delay===0&&(h=!0)),h&&!s&&t.get()!==void 0){const p=Pc(d.keyframes,l);if(p!==void 0)return oe.update(()=>{d.onUpdate(p),d.onComplete()}),new nT([])}return!s&&Gm.supports(d)?new Gm(d):new Fp(d)};function _5({protectedKeys:e,needsAnimating:t},n){const r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function qw(e,t,{delay:n=0,transitionOverride:r,type:i}={}){var s;let{transition:a=e.getDefaultTransition(),transitionEnd:l,...c}=t;r&&(a=r);const u=[],d=i&&e.animationState&&e.animationState.getState()[i];for(const h in c){const p=e.getValue(h,(s=e.latestValues[h])!==null&&s!==void 0?s:null),g=c[h];if(g===void 0||d&&_5(d,h))continue;const x={delay:n,...wp(a||{},h)};let b=!1;if(window.MotionHandoffAnimation){const m=vw(e);if(m){const y=window.MotionHandoffAnimation(m,h,oe);y!==null&&(x.startTime=y,b=!0)}}Eh(e,h),p.start(Np(h,p,g,e.shouldReduceMotion&&xw.has(h)?{type:!1}:x,e,b));const S=p.animation;S&&u.push(S)}return l&&Promise.all(u).then(()=>{oe.update(()=>{l&&Tp(e,l)})}),u}function Fh(e,t,n={}){var r;const i=Ec(e,t,n.type==="exit"?(r=e.presenceContext)===null||r===void 0?void 0:r.custom:void 0);let{transition:s=e.getDefaultTransition()||{}}=i||{};n.transitionOverride&&(s=n.transitionOverride);const a=i?()=>Promise.all(qw(e,i,n)):()=>Promise.resolve(),l=e.variantChildren&&e.variantChildren.size?(u=0)=>{const{delayChildren:d=0,staggerChildren:h,staggerDirection:p}=s;return L5(e,t,d+u,h,p,n)}:()=>Promise.resolve(),{when:c}=s;if(c){const[u,d]=c==="beforeChildren"?[a,l]:[l,a];return u().then(()=>d())}else return Promise.all([a(),l(n.delay)])}function L5(e,t,n=0,r=0,i=1,s){const a=[],l=(e.variantChildren.size-1)*r,c=i===1?(u=0)=>u*r:(u=0)=>l-u*r;return Array.from(e.variantChildren).sort(O5).forEach((u,d)=>{u.notify("AnimationStart",t),a.push(Fh(u,t,{...s,delay:n+c(d)}).then(()=>u.notify("AnimationComplete",t)))}),Promise.all(a)}function O5(e,t){return e.sortNodePosition(t)}function Qw(e,t,n={}){e.notify("AnimationStart",t);let r;if(Array.isArray(t)){const i=t.map(s=>Fh(e,s,n));r=Promise.all(i)}else if(typeof t=="string")r=Fh(e,t,n);else{const i=typeof t=="function"?Ec(e,t,n.custom):t;r=Promise.all(qw(e,i,n))}return r.then(()=>{e.notify("AnimationComplete",t)})}const z5=lp.length;function Xw(e){if(!e)return;if(!e.isControllingVariants){const n=e.parent?Xw(e.parent)||{}:{};return e.props.initial!==void 0&&(n.initial=e.props.initial),n}const t={};for(let n=0;n<z5;n++){const r=lp[n],i=e.props[r];(Eo(i)||i===!1)&&(t[r]=i)}return t}const V5=[...ap].reverse(),B5=ap.length;function H5(e){return t=>Promise.all(t.map(({animation:n,options:r})=>Qw(e,n,r)))}function U5(e){let t=H5(e),n=Km(),r=!0;const i=c=>(u,d)=>{var h;const p=Ec(e,d,c==="exit"?(h=e.presenceContext)===null||h===void 0?void 0:h.custom:void 0);if(p){const{transition:g,transitionEnd:x,...b}=p;u={...u,...b,...x}}return u};function s(c){t=c(e)}function a(c){const{props:u}=e,d=Xw(e.parent)||{},h=[],p=new Set;let g={},x=1/0;for(let S=0;S<B5;S++){const m=V5[S],y=n[m],w=u[m]!==void 0?u[m]:d[m],$=Eo(w),j=m===c?y.isActive:null;j===!1&&(x=S);let k=w===d[m]&&w!==u[m]&&$;if(k&&r&&e.manuallyAnimateOnMount&&(k=!1),y.protectedKeys={...g},!y.isActive&&j===null||!w&&!y.prevProp||$c(w)||typeof w=="boolean")continue;const C=W5(y.prevProp,w);let T=C||m===c&&y.isActive&&!k&&$||S>x&&$,P=!1;const A=Array.isArray(w)?w:[w];let D=A.reduce(i(m),{});j===!1&&(D={});const{prevResolvedValues:W={}}=y,ee={...W,...D},z=M=>{T=!0,p.has(M)&&(P=!0,p.delete(M)),y.needsAnimating[M]=!0;const E=e.getValue(M);E&&(E.liveStyle=!1)};for(const M in ee){const E=D[M],R=W[M];if(g.hasOwnProperty(M))continue;let F=!1;Ch(E)&&Ch(R)?F=!cw(E,R):F=E!==R,F?E!=null?z(M):p.add(M):E!==void 0&&p.has(M)?z(M):y.protectedKeys[M]=!0}y.prevProp=w,y.prevResolvedValues=D,y.isActive&&(g={...g,...D}),r&&e.blockInitialAnimation&&(T=!1),T&&(!(k&&C)||P)&&h.push(...A.map(M=>({animation:M,options:{type:m}})))}if(p.size){const S={};p.forEach(m=>{const y=e.getBaseTarget(m),w=e.getValue(m);w&&(w.liveStyle=!0),S[m]=y??null}),h.push({animation:S})}let b=!!h.length;return r&&(u.initial===!1||u.initial===u.animate)&&!e.manuallyAnimateOnMount&&(b=!1),r=!1,b?t(h):Promise.resolve()}function l(c,u){var d;if(n[c].isActive===u)return Promise.resolve();(d=e.variantChildren)===null||d===void 0||d.forEach(p=>{var g;return(g=p.animationState)===null||g===void 0?void 0:g.setActive(c,u)}),n[c].isActive=u;const h=a(c);for(const p in n)n[p].protectedKeys={};return h}return{animateChanges:a,setActive:l,setAnimateFunction:s,getState:()=>n,reset:()=>{n=Km(),r=!0}}}function W5(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!cw(t,e):!1}function cr(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Km(){return{animate:cr(!0),whileInView:cr(),whileHover:cr(),whileTap:cr(),whileDrag:cr(),whileFocus:cr(),exit:cr()}}class ar{constructor(t){this.isMounted=!1,this.node=t}update(){}}class G5 extends ar{constructor(t){super(t),t.animationState||(t.animationState=U5(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();$c(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){var t;this.node.animationState.reset(),(t=this.unmountControls)===null||t===void 0||t.call(this)}}let K5=0;class Y5 extends ar{constructor(){super(...arguments),this.id=K5++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===r)return;const i=this.node.animationState.setActive("exit",!t);n&&!t&&i.then(()=>n(this.id))}mount(){const{register:t}=this.node.presenceContext||{};t&&(this.unmount=t(this.id))}unmount(){}}const q5={animation:{Feature:G5},exit:{Feature:Y5}};function Ro(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}function Uo(e){return{point:{x:e.pageX,y:e.pageY}}}const Q5=e=>t=>Sp(t)&&e(t,Uo(t));function ro(e,t,n,r){return Ro(e,t,Q5(n),r)}const Ym=(e,t)=>Math.abs(e-t);function X5(e,t){const n=Ym(e.x,t.x),r=Ym(e.y,t.y);return Math.sqrt(n**2+r**2)}class Zw{constructor(t,n,{transformPagePoint:r,contextWindow:i,dragSnapToOrigin:s=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const h=wu(this.lastMoveEventInfo,this.history),p=this.startEvent!==null,g=X5(h.offset,{x:0,y:0})>=3;if(!p&&!g)return;const{point:x}=h,{timestamp:b}=Fe;this.history.push({...x,timestamp:b});const{onStart:S,onMove:m}=this.handlers;p||(S&&S(this.lastMoveEvent,h),this.startEvent=this.lastMoveEvent),m&&m(this.lastMoveEvent,h)},this.handlePointerMove=(h,p)=>{this.lastMoveEvent=h,this.lastMoveEventInfo=vu(p,this.transformPagePoint),oe.update(this.updatePoint,!0)},this.handlePointerUp=(h,p)=>{this.end();const{onEnd:g,onSessionEnd:x,resumeAnimation:b}=this.handlers;if(this.dragSnapToOrigin&&b&&b(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const S=wu(h.type==="pointercancel"?this.lastMoveEventInfo:vu(p,this.transformPagePoint),this.history);this.startEvent&&g&&g(h,S),x&&x(h,S)},!Sp(t))return;this.dragSnapToOrigin=s,this.handlers=n,this.transformPagePoint=r,this.contextWindow=i||window;const a=Uo(t),l=vu(a,this.transformPagePoint),{point:c}=l,{timestamp:u}=Fe;this.history=[{...c,timestamp:u}];const{onSessionStart:d}=n;d&&d(t,wu(l,this.history)),this.removeListeners=Ho(ro(this.contextWindow,"pointermove",this.handlePointerMove),ro(this.contextWindow,"pointerup",this.handlePointerUp),ro(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),nr(this.updatePoint)}}function vu(e,t){return t?{point:t(e.point)}:e}function qm(e,t){return{x:e.x-t.x,y:e.y-t.y}}function wu({point:e},t){return{point:e,delta:qm(e,Jw(t)),offset:qm(e,Z5(t)),velocity:J5(t,.1)}}function Z5(e){return e[0]}function Jw(e){return e[e.length-1]}function J5(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const i=Jw(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>xn(t)));)n--;if(!r)return{x:0,y:0};const s=yn(i.timestamp-r.timestamp);if(s===0)return{x:0,y:0};const a={x:(i.x-r.x)/s,y:(i.y-r.y)/s};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}const eb=1e-4,eE=1-eb,tE=1+eb,tb=.01,nE=0-tb,rE=0+tb;function mt(e){return e.max-e.min}function iE(e,t,n){return Math.abs(e-t)<=n}function Qm(e,t,n,r=.5){e.origin=r,e.originPoint=ue(t.min,t.max,e.origin),e.scale=mt(n)/mt(t),e.translate=ue(n.min,n.max,e.origin)-e.originPoint,(e.scale>=eE&&e.scale<=tE||isNaN(e.scale))&&(e.scale=1),(e.translate>=nE&&e.translate<=rE||isNaN(e.translate))&&(e.translate=0)}function io(e,t,n,r){Qm(e.x,t.x,n.x,r?r.originX:void 0),Qm(e.y,t.y,n.y,r?r.originY:void 0)}function Xm(e,t,n){e.min=n.min+t.min,e.max=e.min+mt(t)}function sE(e,t,n){Xm(e.x,t.x,n.x),Xm(e.y,t.y,n.y)}function Zm(e,t,n){e.min=t.min-n.min,e.max=e.min+mt(t)}function so(e,t,n){Zm(e.x,t.x,n.x),Zm(e.y,t.y,n.y)}function oE(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?ue(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?ue(n,e,r.max):Math.min(e,n)),e}function Jm(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function aE(e,{top:t,left:n,bottom:r,right:i}){return{x:Jm(e.x,n,i),y:Jm(e.y,t,r)}}function e0(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function lE(e,t){return{x:e0(e.x,t.x),y:e0(e.y,t.y)}}function cE(e,t){let n=.5;const r=mt(e),i=mt(t);return i>r?n=rs(t.min,t.max-r,e.min):r>i&&(n=rs(e.min,e.max-i,t.min)),kn(0,1,n)}function uE(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const Nh=.35;function dE(e=Nh){return e===!1?e=0:e===!0&&(e=Nh),{x:t0(e,"left","right"),y:t0(e,"top","bottom")}}function t0(e,t,n){return{min:n0(e,t),max:n0(e,n)}}function n0(e,t){return typeof e=="number"?e:e[t]||0}const r0=()=>({translate:0,scale:1,origin:0,originPoint:0}),Fi=()=>({x:r0(),y:r0()}),i0=()=>({min:0,max:0}),xe=()=>({x:i0(),y:i0()});function jt(e){return[e("x"),e("y")]}function nb({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function hE({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function fE(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function bu(e){return e===void 0||e===1}function _h({scale:e,scaleX:t,scaleY:n}){return!bu(e)||!bu(t)||!bu(n)}function Ar(e){return _h(e)||rb(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function rb(e){return s0(e.x)||s0(e.y)}function s0(e){return e&&e!=="0%"}function Gl(e,t,n){const r=e-n,i=t*r;return n+i}function o0(e,t,n,r,i){return i!==void 0&&(e=Gl(e,i,r)),Gl(e,n,r)+t}function Lh(e,t=0,n=1,r,i){e.min=o0(e.min,t,n,r,i),e.max=o0(e.max,t,n,r,i)}function ib(e,{x:t,y:n}){Lh(e.x,t.translate,t.scale,t.originPoint),Lh(e.y,n.translate,n.scale,n.originPoint)}const a0=.999999999999,l0=1.0000000000001;function pE(e,t,n,r=!1){const i=n.length;if(!i)return;t.x=t.y=1;let s,a;for(let l=0;l<i;l++){s=n[l],a=s.projectionDelta;const{visualElement:c}=s.options;c&&c.props.style&&c.props.style.display==="contents"||(r&&s.options.layoutScroll&&s.scroll&&s!==s.root&&_i(e,{x:-s.scroll.offset.x,y:-s.scroll.offset.y}),a&&(t.x*=a.x.scale,t.y*=a.y.scale,ib(e,a)),r&&Ar(s.latestValues)&&_i(e,s.latestValues))}t.x<l0&&t.x>a0&&(t.x=1),t.y<l0&&t.y>a0&&(t.y=1)}function Ni(e,t){e.min=e.min+t,e.max=e.max+t}function c0(e,t,n,r,i=.5){const s=ue(e.min,e.max,i);Lh(e,t,n,s,r)}function _i(e,t){c0(e.x,t.x,t.scaleX,t.scale,t.originX),c0(e.y,t.y,t.scaleY,t.scale,t.originY)}function sb(e,t){return nb(fE(e.getBoundingClientRect(),t))}function gE(e,t,n){const r=sb(e,n),{scroll:i}=t;return i&&(Ni(r.x,i.offset.x),Ni(r.y,i.offset.y)),r}const ob=({current:e})=>e?e.ownerDocument.defaultView:null,mE=new WeakMap;class xE{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=xe(),this.visualElement=t}start(t,{snapToCursor:n=!1}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const i=d=>{const{dragSnapToOrigin:h}=this.getProps();h?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(Uo(d).point)},s=(d,h)=>{const{drag:p,dragPropagation:g,onDragStart:x}=this.getProps();if(p&&!g&&(this.openDragLock&&this.openDragLock(),this.openDragLock=dT(p),!this.openDragLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),jt(S=>{let m=this.getAxisMotionValue(S).get()||0;if(nn.test(m)){const{projection:y}=this.visualElement;if(y&&y.layout){const w=y.layout.layoutBox[S];w&&(m=mt(w)*(parseFloat(m)/100))}}this.originPoint[S]=m}),x&&oe.postRender(()=>x(d,h)),Eh(this.visualElement,"transform");const{animationState:b}=this.visualElement;b&&b.setActive("whileDrag",!0)},a=(d,h)=>{const{dragPropagation:p,dragDirectionLock:g,onDirectionLock:x,onDrag:b}=this.getProps();if(!p&&!this.openDragLock)return;const{offset:S}=h;if(g&&this.currentDirection===null){this.currentDirection=yE(S),this.currentDirection!==null&&x&&x(this.currentDirection);return}this.updateAxis("x",h.point,S),this.updateAxis("y",h.point,S),this.visualElement.render(),b&&b(d,h)},l=(d,h)=>this.stop(d,h),c=()=>jt(d=>{var h;return this.getAnimationState(d)==="paused"&&((h=this.getAxisMotionValue(d).animation)===null||h===void 0?void 0:h.play())}),{dragSnapToOrigin:u}=this.getProps();this.panSession=new Zw(t,{onSessionStart:i,onStart:s,onMove:a,onSessionEnd:l,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:u,contextWindow:ob(this.visualElement)})}stop(t,n){const r=this.isDragging;if(this.cancel(),!r)return;const{velocity:i}=n;this.startAnimation(i);const{onDragEnd:s}=this.getProps();s&&oe.postRender(()=>s(t,n))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,r){const{drag:i}=this.getProps();if(!r||!ya(t,i,this.currentDirection))return;const s=this.getAxisMotionValue(t);let a=this.originPoint[t]+r[t];this.constraints&&this.constraints[t]&&(a=oE(a,this.constraints[t],this.elastic[t])),s.set(a)}resolveConstraints(){var t;const{dragConstraints:n,dragElastic:r}=this.getProps(),i=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(t=this.visualElement.projection)===null||t===void 0?void 0:t.layout,s=this.constraints;n&&Mi(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):n&&i?this.constraints=aE(i.layoutBox,n):this.constraints=!1,this.elastic=dE(r),s!==this.constraints&&i&&this.constraints&&!this.hasMutatedConstraints&&jt(a=>{this.constraints!==!1&&this.getAxisMotionValue(a)&&(this.constraints[a]=uE(i.layoutBox[a],this.constraints[a]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!Mi(t))return!1;const r=t.current,{projection:i}=this.visualElement;if(!i||!i.layout)return!1;const s=gE(r,i.root,this.visualElement.getTransformPagePoint());let a=lE(i.layout.layoutBox,s);if(n){const l=n(hE(a));this.hasMutatedConstraints=!!l,l&&(a=nb(l))}return a}startAnimation(t){const{drag:n,dragMomentum:r,dragElastic:i,dragTransition:s,dragSnapToOrigin:a,onDragTransitionEnd:l}=this.getProps(),c=this.constraints||{},u=jt(d=>{if(!ya(d,n,this.currentDirection))return;let h=c&&c[d]||{};a&&(h={min:0,max:0});const p=i?200:1e6,g=i?40:1e7,x={type:"inertia",velocity:r?t[d]:0,bounceStiffness:p,bounceDamping:g,timeConstant:750,restDelta:1,restSpeed:10,...s,...h};return this.startAxisValueAnimation(d,x)});return Promise.all(u).then(l)}startAxisValueAnimation(t,n){const r=this.getAxisMotionValue(t);return Eh(this.visualElement,t),r.start(Np(t,r,0,n,this.visualElement,!1))}stopAnimation(){jt(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){jt(t=>{var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.pause()})}getAnimationState(t){var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.state}getAxisMotionValue(t){const n=`_drag${t.toUpperCase()}`,r=this.visualElement.getProps(),i=r[n];return i||this.visualElement.getValue(t,(r.initial?r.initial[t]:void 0)||0)}snapToCursor(t){jt(n=>{const{drag:r}=this.getProps();if(!ya(n,r,this.currentDirection))return;const{projection:i}=this.visualElement,s=this.getAxisMotionValue(n);if(i&&i.layout){const{min:a,max:l}=i.layout.layoutBox[n];s.set(t[n]-ue(a,l,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!Mi(n)||!r||!this.constraints)return;this.stopAnimation();const i={x:0,y:0};jt(a=>{const l=this.getAxisMotionValue(a);if(l&&this.constraints!==!1){const c=l.get();i[a]=cE({min:c,max:c},this.constraints[a])}});const{transformTemplate:s}=this.visualElement.getProps();this.visualElement.current.style.transform=s?s({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),jt(a=>{if(!ya(a,t,null))return;const l=this.getAxisMotionValue(a),{min:c,max:u}=this.constraints[a];l.set(ue(c,u,i[a]))})}addListeners(){if(!this.visualElement.current)return;mE.set(this.visualElement,this);const t=this.visualElement.current,n=ro(t,"pointerdown",c=>{const{drag:u,dragListener:d=!0}=this.getProps();u&&d&&this.start(c)}),r=()=>{const{dragConstraints:c}=this.getProps();Mi(c)&&c.current&&(this.constraints=this.resolveRefConstraints())},{projection:i}=this.visualElement,s=i.addEventListener("measure",r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),oe.read(r);const a=Ro(window,"resize",()=>this.scalePositionWithinConstraints()),l=i.addEventListener("didUpdate",({delta:c,hasLayoutChanged:u})=>{this.isDragging&&u&&(jt(d=>{const h=this.getAxisMotionValue(d);h&&(this.originPoint[d]+=c[d].translate,h.set(h.get()+c[d].translate))}),this.visualElement.render())});return()=>{a(),n(),s(),l&&l()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:i=!1,dragConstraints:s=!1,dragElastic:a=Nh,dragMomentum:l=!0}=t;return{...t,drag:n,dragDirectionLock:r,dragPropagation:i,dragConstraints:s,dragElastic:a,dragMomentum:l}}}function ya(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function yE(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class vE extends ar{constructor(t){super(t),this.removeGroupControls=pt,this.removeListeners=pt,this.controls=new xE(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||pt}unmount(){this.removeGroupControls(),this.removeListeners()}}const u0=e=>(t,n)=>{e&&oe.postRender(()=>e(t,n))};class wE extends ar{constructor(){super(...arguments),this.removePointerDownListener=pt}onPointerDown(t){this.session=new Zw(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:ob(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:r,onPanEnd:i}=this.node.getProps();return{onSessionStart:u0(t),onStart:u0(n),onMove:r,onEnd:(s,a)=>{delete this.session,i&&oe.postRender(()=>i(s,a))}}}mount(){this.removePointerDownListener=ro(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const il={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function d0(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const $s={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(H.test(e))e=parseFloat(e);else return e;const n=d0(e,t.target.x),r=d0(e,t.target.y);return`${n}% ${r}%`}},bE={correct:(e,{treeScale:t,projectionDelta:n})=>{const r=e,i=rr.parse(e);if(i.length>5)return r;const s=rr.createTransformer(e),a=typeof i[0]!="number"?1:0,l=n.x.scale*t.x,c=n.y.scale*t.y;i[0+a]/=l,i[1+a]/=c;const u=ue(l,c,.5);return typeof i[2+a]=="number"&&(i[2+a]/=u),typeof i[3+a]=="number"&&(i[3+a]/=u),s(i)}};class jE extends v.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r,layoutId:i}=this.props,{projection:s}=t;U$(SE),s&&(n.group&&n.group.add(s),r&&r.register&&i&&r.register(s),s.root.didUpdate(),s.addEventListener("animationComplete",()=>{this.safeToRemove()}),s.setOptions({...s.options,onExitComplete:()=>this.safeToRemove()})),il.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:r,drag:i,isPresent:s}=this.props,a=r.projection;return a&&(a.isPresent=s,i||t.layoutDependency!==n||n===void 0?a.willUpdate():this.safeToRemove(),t.isPresent!==s&&(s?a.promote():a.relegate()||oe.postRender(()=>{const l=a.getStack();(!l||!l.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),up.postRender(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:i}=t;i&&(i.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(i),r&&r.deregister&&r.deregister(i))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function ab(e){const[t,n]=H1(),r=v.useContext(np);return o.jsx(jE,{...e,layoutGroup:r,switchLayoutGroup:v.useContext(Q1),isPresent:t,safeToRemove:n})}const SE={borderRadius:{...$s,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:$s,borderTopRightRadius:$s,borderBottomLeftRadius:$s,borderBottomRightRadius:$s,boxShadow:bE};function kE(e,t,n){const r=He(e)?e:Ao(e);return r.start(Np("",r,t,n)),r.animation}function CE(e){return e instanceof SVGElement&&e.tagName!=="svg"}const $E=(e,t)=>e.depth-t.depth;class TE{constructor(){this.children=[],this.isDirty=!1}add(t){kp(this.children,t),this.isDirty=!0}remove(t){Cp(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort($E),this.isDirty=!1,this.children.forEach(t)}}function EE(e,t){const n=rn.now(),r=({timestamp:i})=>{const s=i-n;s>=t&&(nr(r),e(s-t))};return oe.read(r,!0),()=>nr(r)}const lb=["TopLeft","TopRight","BottomLeft","BottomRight"],PE=lb.length,h0=e=>typeof e=="string"?parseFloat(e):e,f0=e=>typeof e=="number"||H.test(e);function AE(e,t,n,r,i,s){i?(e.opacity=ue(0,n.opacity!==void 0?n.opacity:1,DE(r)),e.opacityExit=ue(t.opacity!==void 0?t.opacity:1,0,RE(r))):s&&(e.opacity=ue(t.opacity!==void 0?t.opacity:1,n.opacity!==void 0?n.opacity:1,r));for(let a=0;a<PE;a++){const l=`border${lb[a]}Radius`;let c=p0(t,l),u=p0(n,l);if(c===void 0&&u===void 0)continue;c||(c=0),u||(u=0),c===0||u===0||f0(c)===f0(u)?(e[l]=Math.max(ue(h0(c),h0(u),r),0),(nn.test(u)||nn.test(c))&&(e[l]+="%")):e[l]=u}(t.rotate||n.rotate)&&(e.rotate=ue(t.rotate||0,n.rotate||0,r))}function p0(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const DE=cb(0,.5,$w),RE=cb(.5,.95,pt);function cb(e,t,n){return r=>r<e?0:r>t?1:n(rs(e,t,r))}function g0(e,t){e.min=t.min,e.max=t.max}function bt(e,t){g0(e.x,t.x),g0(e.y,t.y)}function m0(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}function x0(e,t,n,r,i){return e-=t,e=Gl(e,1/n,r),i!==void 0&&(e=Gl(e,1/i,r)),e}function ME(e,t=0,n=1,r=.5,i,s=e,a=e){if(nn.test(t)&&(t=parseFloat(t),t=ue(a.min,a.max,t/100)-a.min),typeof t!="number")return;let l=ue(s.min,s.max,r);e===s&&(l-=t),e.min=x0(e.min,t,n,l,i),e.max=x0(e.max,t,n,l,i)}function y0(e,t,[n,r,i],s,a){ME(e,t[n],t[r],t[i],t.scale,s,a)}const IE=["x","scaleX","originX"],FE=["y","scaleY","originY"];function v0(e,t,n,r){y0(e.x,t,IE,n?n.x:void 0,r?r.x:void 0),y0(e.y,t,FE,n?n.y:void 0,r?r.y:void 0)}function w0(e){return e.translate===0&&e.scale===1}function ub(e){return w0(e.x)&&w0(e.y)}function b0(e,t){return e.min===t.min&&e.max===t.max}function NE(e,t){return b0(e.x,t.x)&&b0(e.y,t.y)}function j0(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function db(e,t){return j0(e.x,t.x)&&j0(e.y,t.y)}function S0(e){return mt(e.x)/mt(e.y)}function k0(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}class _E{constructor(){this.members=[]}add(t){kp(this.members,t),t.scheduleRender()}remove(t){if(Cp(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){const n=this.members.findIndex(i=>t===i);if(n===0)return!1;let r;for(let i=n;i>=0;i--){const s=this.members[i];if(s.isPresent!==!1){r=s;break}}return r?(this.promote(r),!0):!1}promote(t,n){const r=this.lead;if(t!==r&&(this.prevLead=r,this.lead=t,t.show(),r)){r.instance&&r.scheduleRender(),t.scheduleRender(),t.resumeFrom=r,n&&(t.resumeFrom.preserveOpacity=!0),r.snapshot&&(t.snapshot=r.snapshot,t.snapshot.latestValues=r.animationValues||r.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:i}=t.options;i===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(t=>{const{options:n,resumingFrom:r}=t;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function LE(e,t,n){let r="";const i=e.x.translate/t.x,s=e.y.translate/t.y,a=(n==null?void 0:n.z)||0;if((i||s||a)&&(r=`translate3d(${i}px, ${s}px, ${a}px) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{transformPerspective:u,rotate:d,rotateX:h,rotateY:p,skewX:g,skewY:x}=n;u&&(r=`perspective(${u}px) ${r}`),d&&(r+=`rotate(${d}deg) `),h&&(r+=`rotateX(${h}deg) `),p&&(r+=`rotateY(${p}deg) `),g&&(r+=`skewX(${g}deg) `),x&&(r+=`skewY(${x}deg) `)}const l=e.x.scale*t.x,c=e.y.scale*t.y;return(l!==1||c!==1)&&(r+=`scale(${l}, ${c})`),r||"none"}const Dr={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0},Us=typeof window<"u"&&window.MotionDebug!==void 0,ju=["","X","Y","Z"],OE={visibility:"hidden"},C0=1e3;let zE=0;function Su(e,t,n,r){const{latestValues:i}=t;i[e]&&(n[e]=i[e],t.setStaticValue(e,0),r&&(r[e]=0))}function hb(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;const{visualElement:t}=e.options;if(!t)return;const n=vw(t);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:i,layoutId:s}=e.options;window.MotionCancelOptimisedAnimation(n,"transform",oe,!(i||s))}const{parent:r}=e;r&&!r.hasCheckedOptimisedAppear&&hb(r)}function fb({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(a={},l=t==null?void 0:t()){this.id=zE++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,Us&&(Dr.totalNodes=Dr.resolvedTargetDeltas=Dr.recalculatedProjection=0),this.nodes.forEach(HE),this.nodes.forEach(YE),this.nodes.forEach(qE),this.nodes.forEach(UE),Us&&window.MotionDebug.record(Dr)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=a,this.root=l?l.root||l:this,this.path=l?[...l.path,l]:[],this.parent=l,this.depth=l?l.depth+1:0;for(let c=0;c<this.path.length;c++)this.path[c].shouldResetTransform=!0;this.root===this&&(this.nodes=new TE)}addEventListener(a,l){return this.eventHandlers.has(a)||this.eventHandlers.set(a,new $p),this.eventHandlers.get(a).add(l)}notifyListeners(a,...l){const c=this.eventHandlers.get(a);c&&c.notify(...l)}hasListeners(a){return this.eventHandlers.has(a)}mount(a,l=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=CE(a),this.instance=a;const{layoutId:c,layout:u,visualElement:d}=this.options;if(d&&!d.current&&d.mount(a),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),l&&(u||c)&&(this.isLayoutDirty=!0),e){let h;const p=()=>this.root.updateBlockedByResize=!1;e(a,()=>{this.root.updateBlockedByResize=!0,h&&h(),h=EE(p,250),il.hasAnimatedSinceResize&&(il.hasAnimatedSinceResize=!1,this.nodes.forEach(T0))})}c&&this.root.registerSharedNode(c,this),this.options.animate!==!1&&d&&(c||u)&&this.addEventListener("didUpdate",({delta:h,hasLayoutChanged:p,hasRelativeTargetChanged:g,layout:x})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const b=this.options.transition||d.getDefaultTransition()||e3,{onLayoutAnimationStart:S,onLayoutAnimationComplete:m}=d.getProps(),y=!this.targetLayout||!db(this.targetLayout,x)||g,w=!p&&g;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||w||p&&(y||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(h,w);const $={...wp(b,"layout"),onPlay:S,onComplete:m};(d.shouldReduceMotion||this.options.layoutRoot)&&($.delay=0,$.type=!1),this.startAnimation($)}else p||T0(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=x})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const a=this.getStack();a&&a.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,nr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(QE),this.animationId++)}getTransformTemplate(){const{visualElement:a}=this.options;return a&&a.getProps().transformTemplate}willUpdate(a=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&hb(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let d=0;d<this.path.length;d++){const h=this.path[d];h.shouldResetTransform=!0,h.updateScroll("snapshot"),h.options.layoutRoot&&h.willUpdate(!1)}const{layoutId:l,layout:c}=this.options;if(l===void 0&&!c)return;const u=this.getTransformTemplate();this.prevTransformTemplateValue=u?u(this.latestValues,""):void 0,this.updateSnapshot(),a&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach($0);return}this.isUpdating||this.nodes.forEach(GE),this.isUpdating=!1,this.nodes.forEach(KE),this.nodes.forEach(VE),this.nodes.forEach(BE),this.clearAllSnapshots();const l=rn.now();Fe.delta=kn(0,1e3/60,l-Fe.timestamp),Fe.timestamp=l,Fe.isProcessing=!0,fu.update.process(Fe),fu.preRender.process(Fe),fu.render.process(Fe),Fe.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,up.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(WE),this.sharedNodes.forEach(XE)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,oe.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){oe.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let c=0;c<this.path.length;c++)this.path[c].updateScroll();const a=this.layout;this.layout=this.measure(!1),this.layoutCorrected=xe(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:l}=this.options;l&&l.notify("LayoutMeasure",this.layout.layoutBox,a?a.layoutBox:void 0)}updateScroll(a="measure"){let l=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===a&&(l=!1),l){const c=r(this.instance);this.scroll={animationId:this.root.animationId,phase:a,isRoot:c,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:c}}}resetTransform(){if(!i)return;const a=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,l=this.projectionDelta&&!ub(this.projectionDelta),c=this.getTransformTemplate(),u=c?c(this.latestValues,""):void 0,d=u!==this.prevTransformTemplateValue;a&&(l||Ar(this.latestValues)||d)&&(i(this.instance,u),this.shouldResetTransform=!1,this.scheduleRender())}measure(a=!0){const l=this.measurePageBox();let c=this.removeElementScroll(l);return a&&(c=this.removeTransform(c)),t3(c),{animationId:this.root.animationId,measuredBox:l,layoutBox:c,latestValues:{},source:this.id}}measurePageBox(){var a;const{visualElement:l}=this.options;if(!l)return xe();const c=l.measureViewportBox();if(!(((a=this.scroll)===null||a===void 0?void 0:a.wasRoot)||this.path.some(n3))){const{scroll:d}=this.root;d&&(Ni(c.x,d.offset.x),Ni(c.y,d.offset.y))}return c}removeElementScroll(a){var l;const c=xe();if(bt(c,a),!((l=this.scroll)===null||l===void 0)&&l.wasRoot)return c;for(let u=0;u<this.path.length;u++){const d=this.path[u],{scroll:h,options:p}=d;d!==this.root&&h&&p.layoutScroll&&(h.wasRoot&&bt(c,a),Ni(c.x,h.offset.x),Ni(c.y,h.offset.y))}return c}applyTransform(a,l=!1){const c=xe();bt(c,a);for(let u=0;u<this.path.length;u++){const d=this.path[u];!l&&d.options.layoutScroll&&d.scroll&&d!==d.root&&_i(c,{x:-d.scroll.offset.x,y:-d.scroll.offset.y}),Ar(d.latestValues)&&_i(c,d.latestValues)}return Ar(this.latestValues)&&_i(c,this.latestValues),c}removeTransform(a){const l=xe();bt(l,a);for(let c=0;c<this.path.length;c++){const u=this.path[c];if(!u.instance||!Ar(u.latestValues))continue;_h(u.latestValues)&&u.updateSnapshot();const d=xe(),h=u.measurePageBox();bt(d,h),v0(l,u.latestValues,u.snapshot?u.snapshot.layoutBox:void 0,d)}return Ar(this.latestValues)&&v0(l,this.latestValues),l}setTargetDelta(a){this.targetDelta=a,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(a){this.options={...this.options,...a,crossfade:a.crossfade!==void 0?a.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Fe.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(a=!1){var l;const c=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=c.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=c.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=c.isSharedProjectionDirty);const u=!!this.resumingFrom||this!==c;if(!(a||u&&this.isSharedProjectionDirty||this.isProjectionDirty||!((l=this.parent)===null||l===void 0)&&l.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:h,layoutId:p}=this.options;if(!(!this.layout||!(h||p))){if(this.resolvedRelativeTargetAt=Fe.timestamp,!this.targetDelta&&!this.relativeTarget){const g=this.getClosestProjectingParent();g&&g.layout&&this.animationProgress!==1?(this.relativeParent=g,this.forceRelativeParentToResolveTarget(),this.relativeTarget=xe(),this.relativeTargetOrigin=xe(),so(this.relativeTargetOrigin,this.layout.layoutBox,g.layout.layoutBox),bt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=xe(),this.targetWithTransforms=xe()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),sE(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):bt(this.target,this.layout.layoutBox),ib(this.target,this.targetDelta)):bt(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const g=this.getClosestProjectingParent();g&&!!g.resumingFrom==!!this.resumingFrom&&!g.options.layoutScroll&&g.target&&this.animationProgress!==1?(this.relativeParent=g,this.forceRelativeParentToResolveTarget(),this.relativeTarget=xe(),this.relativeTargetOrigin=xe(),so(this.relativeTargetOrigin,this.target,g.target),bt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}Us&&Dr.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||_h(this.parent.latestValues)||rb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var a;const l=this.getLead(),c=!!this.resumingFrom||this!==l;let u=!0;if((this.isProjectionDirty||!((a=this.parent)===null||a===void 0)&&a.isProjectionDirty)&&(u=!1),c&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(u=!1),this.resolvedRelativeTargetAt===Fe.timestamp&&(u=!1),u)return;const{layout:d,layoutId:h}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(d||h))return;bt(this.layoutCorrected,this.layout.layoutBox);const p=this.treeScale.x,g=this.treeScale.y;pE(this.layoutCorrected,this.treeScale,this.path,c),l.layout&&!l.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(l.target=l.layout.layoutBox,l.targetWithTransforms=xe());const{target:x}=l;if(!x){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(m0(this.prevProjectionDelta.x,this.projectionDelta.x),m0(this.prevProjectionDelta.y,this.projectionDelta.y)),io(this.projectionDelta,this.layoutCorrected,x,this.latestValues),(this.treeScale.x!==p||this.treeScale.y!==g||!k0(this.projectionDelta.x,this.prevProjectionDelta.x)||!k0(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",x)),Us&&Dr.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(a=!0){var l;if((l=this.options.visualElement)===null||l===void 0||l.scheduleRender(),a){const c=this.getStack();c&&c.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Fi(),this.projectionDelta=Fi(),this.projectionDeltaWithTransform=Fi()}setAnimationOrigin(a,l=!1){const c=this.snapshot,u=c?c.latestValues:{},d={...this.latestValues},h=Fi();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!l;const p=xe(),g=c?c.source:void 0,x=this.layout?this.layout.source:void 0,b=g!==x,S=this.getStack(),m=!S||S.members.length<=1,y=!!(b&&!m&&this.options.crossfade===!0&&!this.path.some(JE));this.animationProgress=0;let w;this.mixTargetDelta=$=>{const j=$/1e3;E0(h.x,a.x,j),E0(h.y,a.y,j),this.setTargetDelta(h),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(so(p,this.layout.layoutBox,this.relativeParent.layout.layoutBox),ZE(this.relativeTarget,this.relativeTargetOrigin,p,j),w&&NE(this.relativeTarget,w)&&(this.isProjectionDirty=!1),w||(w=xe()),bt(w,this.relativeTarget)),b&&(this.animationValues=d,AE(d,u,this.latestValues,j,y,m)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=j},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(a){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(nr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=oe.update(()=>{il.hasAnimatedSinceResize=!0,this.currentAnimation=kE(0,C0,{...a,onUpdate:l=>{this.mixTargetDelta(l),a.onUpdate&&a.onUpdate(l)},onComplete:()=>{a.onComplete&&a.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const a=this.getStack();a&&a.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(C0),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const a=this.getLead();let{targetWithTransforms:l,target:c,layout:u,latestValues:d}=a;if(!(!l||!c||!u)){if(this!==a&&this.layout&&u&&pb(this.options.animationType,this.layout.layoutBox,u.layoutBox)){c=this.target||xe();const h=mt(this.layout.layoutBox.x);c.x.min=a.target.x.min,c.x.max=c.x.min+h;const p=mt(this.layout.layoutBox.y);c.y.min=a.target.y.min,c.y.max=c.y.min+p}bt(l,c),_i(l,d),io(this.projectionDeltaWithTransform,this.layoutCorrected,l,d)}}registerSharedNode(a,l){this.sharedNodes.has(a)||this.sharedNodes.set(a,new _E),this.sharedNodes.get(a).add(l);const u=l.options.initialPromotionConfig;l.promote({transition:u?u.transition:void 0,preserveFollowOpacity:u&&u.shouldPreserveFollowOpacity?u.shouldPreserveFollowOpacity(l):void 0})}isLead(){const a=this.getStack();return a?a.lead===this:!0}getLead(){var a;const{layoutId:l}=this.options;return l?((a=this.getStack())===null||a===void 0?void 0:a.lead)||this:this}getPrevLead(){var a;const{layoutId:l}=this.options;return l?(a=this.getStack())===null||a===void 0?void 0:a.prevLead:void 0}getStack(){const{layoutId:a}=this.options;if(a)return this.root.sharedNodes.get(a)}promote({needsReset:a,transition:l,preserveFollowOpacity:c}={}){const u=this.getStack();u&&u.promote(this,c),a&&(this.projectionDelta=void 0,this.needsReset=!0),l&&this.setOptions({transition:l})}relegate(){const a=this.getStack();return a?a.relegate(this):!1}resetSkewAndRotation(){const{visualElement:a}=this.options;if(!a)return;let l=!1;const{latestValues:c}=a;if((c.z||c.rotate||c.rotateX||c.rotateY||c.rotateZ||c.skewX||c.skewY)&&(l=!0),!l)return;const u={};c.z&&Su("z",a,u,this.animationValues);for(let d=0;d<ju.length;d++)Su(`rotate${ju[d]}`,a,u,this.animationValues),Su(`skew${ju[d]}`,a,u,this.animationValues);a.render();for(const d in u)a.setStaticValue(d,u[d]),this.animationValues&&(this.animationValues[d]=u[d]);a.scheduleRender()}getProjectionStyles(a){var l,c;if(!this.instance||this.isSVG)return;if(!this.isVisible)return OE;const u={visibility:""},d=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,u.opacity="",u.pointerEvents=nl(a==null?void 0:a.pointerEvents)||"",u.transform=d?d(this.latestValues,""):"none",u;const h=this.getLead();if(!this.projectionDelta||!this.layout||!h.target){const b={};return this.options.layoutId&&(b.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,b.pointerEvents=nl(a==null?void 0:a.pointerEvents)||""),this.hasProjected&&!Ar(this.latestValues)&&(b.transform=d?d({},""):"none",this.hasProjected=!1),b}const p=h.animationValues||h.latestValues;this.applyTransformsToTarget(),u.transform=LE(this.projectionDeltaWithTransform,this.treeScale,p),d&&(u.transform=d(p,u.transform));const{x:g,y:x}=this.projectionDelta;u.transformOrigin=`${g.origin*100}% ${x.origin*100}% 0`,h.animationValues?u.opacity=h===this?(c=(l=p.opacity)!==null&&l!==void 0?l:this.latestValues.opacity)!==null&&c!==void 0?c:1:this.preserveOpacity?this.latestValues.opacity:p.opacityExit:u.opacity=h===this?p.opacity!==void 0?p.opacity:"":p.opacityExit!==void 0?p.opacityExit:0;for(const b in Vl){if(p[b]===void 0)continue;const{correct:S,applyTo:m}=Vl[b],y=u.transform==="none"?p[b]:S(p[b],h);if(m){const w=m.length;for(let $=0;$<w;$++)u[m[$]]=y}else u[b]=y}return this.options.layoutId&&(u.pointerEvents=h===this?nl(a==null?void 0:a.pointerEvents)||"":"none"),u}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(a=>{var l;return(l=a.currentAnimation)===null||l===void 0?void 0:l.stop()}),this.root.nodes.forEach($0),this.root.sharedNodes.clear()}}}function VE(e){e.updateLayout()}function BE(e){var t;const n=((t=e.resumeFrom)===null||t===void 0?void 0:t.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&n&&e.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:i}=e.layout,{animationType:s}=e.options,a=n.source!==e.layout.source;s==="size"?jt(h=>{const p=a?n.measuredBox[h]:n.layoutBox[h],g=mt(p);p.min=r[h].min,p.max=p.min+g}):pb(s,n.layoutBox,r)&&jt(h=>{const p=a?n.measuredBox[h]:n.layoutBox[h],g=mt(r[h]);p.max=p.min+g,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[h].max=e.relativeTarget[h].min+g)});const l=Fi();io(l,r,n.layoutBox);const c=Fi();a?io(c,e.applyTransform(i,!0),n.measuredBox):io(c,r,n.layoutBox);const u=!ub(l);let d=!1;if(!e.resumeFrom){const h=e.getClosestProjectingParent();if(h&&!h.resumeFrom){const{snapshot:p,layout:g}=h;if(p&&g){const x=xe();so(x,n.layoutBox,p.layoutBox);const b=xe();so(b,r,g.layoutBox),db(x,b)||(d=!0),h.options.layoutRoot&&(e.relativeTarget=b,e.relativeTargetOrigin=x,e.relativeParent=h)}}}e.notifyListeners("didUpdate",{layout:r,snapshot:n,delta:c,layoutDelta:l,hasLayoutChanged:u,hasRelativeTargetChanged:d})}else if(e.isLead()){const{onExitComplete:r}=e.options;r&&r()}e.options.transition=void 0}function HE(e){Us&&Dr.totalNodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function UE(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function WE(e){e.clearSnapshot()}function $0(e){e.clearMeasurements()}function GE(e){e.isLayoutDirty=!1}function KE(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function T0(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function YE(e){e.resolveTargetDelta()}function qE(e){e.calcProjection()}function QE(e){e.resetSkewAndRotation()}function XE(e){e.removeLeadSnapshot()}function E0(e,t,n){e.translate=ue(t.translate,0,n),e.scale=ue(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function P0(e,t,n,r){e.min=ue(t.min,n.min,r),e.max=ue(t.max,n.max,r)}function ZE(e,t,n,r){P0(e.x,t.x,n.x,r),P0(e.y,t.y,n.y,r)}function JE(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const e3={duration:.45,ease:[.4,0,.1,1]},A0=e=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),D0=A0("applewebkit/")&&!A0("chrome/")?Math.round:pt;function R0(e){e.min=D0(e.min),e.max=D0(e.max)}function t3(e){R0(e.x),R0(e.y)}function pb(e,t,n){return e==="position"||e==="preserve-aspect"&&!iE(S0(t),S0(n),.2)}function n3(e){var t;return e!==e.root&&((t=e.scroll)===null||t===void 0?void 0:t.wasRoot)}const r3=fb({attachResizeListener:(e,t)=>Ro(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),ku={current:void 0},gb=fb({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!ku.current){const e=new r3({});e.mount(window),e.setOptions({layoutScroll:!0}),ku.current=e}return ku.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),i3={pan:{Feature:wE},drag:{Feature:vE,ProjectionNode:gb,MeasureLayout:ab}};function M0(e,t,n){const{props:r}=e;e.animationState&&r.whileHover&&e.animationState.setActive("whileHover",n==="Start");const i="onHover"+n,s=r[i];s&&oe.postRender(()=>s(t,Uo(t)))}class s3 extends ar{mount(){const{current:t}=this.node;t&&(this.unmount=oT(t,n=>(M0(this.node,n,"Start"),r=>M0(this.node,r,"End"))))}unmount(){}}class o3 extends ar{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Ho(Ro(this.node.current,"focus",()=>this.onFocus()),Ro(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function I0(e,t,n){const{props:r}=e;e.animationState&&r.whileTap&&e.animationState.setActive("whileTap",n==="Start");const i="onTap"+(n==="End"?"":n),s=r[i];s&&oe.postRender(()=>s(t,Uo(t)))}class a3 extends ar{mount(){const{current:t}=this.node;t&&(this.unmount=uT(t,n=>(I0(this.node,n,"Start"),(r,{success:i})=>I0(this.node,r,i?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const Oh=new WeakMap,Cu=new WeakMap,l3=e=>{const t=Oh.get(e.target);t&&t(e)},c3=e=>{e.forEach(l3)};function u3({root:e,...t}){const n=e||document;Cu.has(n)||Cu.set(n,{});const r=Cu.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(c3,{root:e,...t})),r[i]}function d3(e,t,n){const r=u3(t);return Oh.set(e,n),r.observe(e),()=>{Oh.delete(e),r.unobserve(e)}}const h3={some:0,all:1};class f3 extends ar{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:n,margin:r,amount:i="some",once:s}=t,a={root:n?n.current:void 0,rootMargin:r,threshold:typeof i=="number"?i:h3[i]},l=c=>{const{isIntersecting:u}=c;if(this.isInView===u||(this.isInView=u,s&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:d,onViewportLeave:h}=this.node.getProps(),p=u?d:h;p&&p(c)};return d3(this.node.current,a,l)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(p3(t,n))&&this.startObserver()}unmount(){}}function p3({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const g3={inView:{Feature:f3},tap:{Feature:a3},focus:{Feature:o3},hover:{Feature:s3}},m3={layout:{ProjectionNode:gb,MeasureLayout:ab}},zh={current:null},mb={current:!1};function x3(){if(mb.current=!0,!!ip)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>zh.current=e.matches;e.addListener(t),t()}else zh.current=!1}const y3=[...zw,Ve,rr],v3=e=>y3.find(Ow(e)),F0=new WeakMap;function w3(e,t,n){for(const r in t){const i=t[r],s=n[r];if(He(i))e.addValue(r,i);else if(He(s))e.addValue(r,Ao(i,{owner:e}));else if(s!==i)if(e.hasValue(r)){const a=e.getValue(r);a.liveStyle===!0?a.jump(i):a.hasAnimated||a.set(i)}else{const a=e.getStaticValue(r);e.addValue(r,Ao(a!==void 0?a:i,{owner:e}))}}for(const r in n)t[r]===void 0&&e.removeValue(r);return t}const N0=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class b3{scrapeMotionValuesFromProps(t,n,r){return{}}constructor({parent:t,props:n,presenceContext:r,reducedMotionConfig:i,blockInitialAnimation:s,visualState:a},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Mp,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const g=rn.now();this.renderScheduledAt<g&&(this.renderScheduledAt=g,oe.render(this.render,!1,!0))};const{latestValues:c,renderState:u,onUpdate:d}=a;this.onUpdate=d,this.latestValues=c,this.baseTarget={...c},this.initialValues=n.initial?{...c}:{},this.renderState=u,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=i,this.options=l,this.blockInitialAnimation=!!s,this.isControllingVariants=Tc(n),this.isVariantNode=Y1(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:h,...p}=this.scrapeMotionValuesFromProps(n,{},this);for(const g in p){const x=p[g];c[g]!==void 0&&He(x)&&x.set(c[g],!1)}}mount(t){this.current=t,F0.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((n,r)=>this.bindToMotionValue(r,n)),mb.current||x3(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:zh.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){F0.delete(this.current),this.projection&&this.projection.unmount(),nr(this.notifyUpdate),nr(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const t in this.events)this.events[t].clear();for(const t in this.features){const n=this.features[t];n&&(n.unmount(),n.isMounted=!1)}this.current=null}bindToMotionValue(t,n){this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();const r=ei.has(t),i=n.on("change",l=>{this.latestValues[t]=l,this.props.onUpdate&&oe.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0)}),s=n.on("renderRequest",this.scheduleRender);let a;window.MotionCheckAppearSync&&(a=window.MotionCheckAppearSync(this,t,n)),this.valueSubscriptions.set(t,()=>{i(),s(),a&&a(),n.owner&&n.stop()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}updateFeatures(){let t="animation";for(t in is){const n=is[t];if(!n)continue;const{isEnabled:r,Feature:i}=n;if(!this.features[t]&&i&&r(this.props)&&(this.features[t]=new i(this)),this.features[t]){const s=this.features[t];s.isMounted?s.update():(s.mount(),s.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):xe()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<N0.length;r++){const i=N0[r];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);const s="on"+i,a=t[s];a&&(this.propEventSubscriptions[i]=this.on(i,a))}this.prevMotionValues=w3(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){const r=this.values.get(t);n!==r&&(r&&this.removeValue(t),this.bindToMotionValue(t,n),this.values.set(t,n),this.latestValues[t]=n.get())}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let r=this.values.get(t);return r===void 0&&n!==void 0&&(r=Ao(n===null?void 0:n,{owner:this}),this.addValue(t,r)),r}readValue(t,n){var r;let i=this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(r=this.getBaseTargetFromProps(this.props,t))!==null&&r!==void 0?r:this.readValueFromInstance(this.current,t,this.options);return i!=null&&(typeof i=="string"&&(_w(i)||Ew(i))?i=parseFloat(i):!v3(i)&&rr.test(n)&&(i=Iw(t,n)),this.setBaseTarget(t,He(i)?i.get():i)),He(i)?i.get():i}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var n;const{initial:r}=this.props;let i;if(typeof r=="string"||typeof r=="object"){const a=hp(this.props,r,(n=this.presenceContext)===null||n===void 0?void 0:n.custom);a&&(i=a[t])}if(r&&i!==void 0)return i;const s=this.getBaseTargetFromProps(this.props,t);return s!==void 0&&!He(s)?s:this.initialValues[t]!==void 0&&i===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new $p),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}}class xb extends b3{constructor(){super(...arguments),this.KeyframeResolver=Vw}sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){return t.style?t.style[n]:void 0}removeValueFromRenderState(t,{vars:n,style:r}){delete n[t],delete r[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;He(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}function j3(e){return window.getComputedStyle(e)}class S3 extends xb{constructor(){super(...arguments),this.type="html",this.renderInstance=rw}readValueFromInstance(t,n){if(ei.has(n)){const r=Rp(n);return r&&r.default||0}else{const r=j3(t),i=(ew(n)?r.getPropertyValue(n):r[n])||0;return typeof i=="string"?i.trim():i}}measureInstanceViewportBox(t,{transformPagePoint:n}){return sb(t,n)}build(t,n,r){gp(t,n,r.transformTemplate)}scrapeMotionValuesFromProps(t,n,r){return vp(t,n,r)}}class k3 extends xb{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=xe}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if(ei.has(n)){const r=Rp(n);return r&&r.default||0}return n=iw.has(n)?n:cp(n),t.getAttribute(n)}scrapeMotionValuesFromProps(t,n,r){return aw(t,n,r)}build(t,n,r){mp(t,n,this.isSVGTag,r.transformTemplate)}renderInstance(t,n,r,i){sw(t,n,r,i)}mount(t){this.isSVGTag=yp(t.tagName),super.mount(t)}}const C3=(e,t)=>dp(e)?new k3(t):new S3(t,{allowProjection:e!==v.Fragment}),$3=J$({...q5,...g3,...i3,...m3},C3),O=p$($3);function T3(e){e.values.forEach(t=>t.stop())}function Vh(e,t){[...t].reverse().forEach(r=>{const i=e.getVariant(r);i&&Tp(e,i),e.variantChildren&&e.variantChildren.forEach(s=>{Vh(s,t)})})}function E3(e,t){if(Array.isArray(t))return Vh(e,t);if(typeof t=="string")return Vh(e,[t]);Tp(e,t)}function P3(){const e=new Set,t={subscribe(n){return e.add(n),()=>void e.delete(n)},start(n,r){const i=[];return e.forEach(s=>{i.push(Qw(s,n,{transitionOverride:r}))}),Promise.all(i)},set(n){return e.forEach(r=>{E3(r,n)})},stop(){e.forEach(n=>{T3(n)})},mount(){return()=>{t.stop()}}};return t}function A3(){const e=Sc(P3);return sp(e.mount,[]),e}const Kl=A3,D3={Burger:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",Pizza:"https://images.unsplash.com/photo-1601924582971-1c9d8c1e0d9b?w=1200&q=80",Sushi:"https://images.unsplash.com/photo-1562158070-622a0c5145cf?w=1200&q=80",Dessert:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80",Rice:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80",Noodles:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80",Asian:"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80",Hawaiian:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80"},Ct=[{id:"1",name:"Burger Drone",price:15e4,image:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",description:"Juicy grilled burger with fresh lettuce and sauce.",tag:"Hot",category:"Burger",restaurantId:"rest_1"},{id:"2",name:"Pizza Sky",price:2e5,image:"https://png.pngtree.com/thumb_back/fh260/background/20250205/pngtree-melting-pizza-slice-in-space-with-blue-and-red-background-image_16896342.jpg",description:"Cheesy pepperoni pizza with tomato base.",tag:"New",category:"Pizza",restaurantId:"rest_1"},{id:"3",name:"Sushi Fly",price:28e4,image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",description:"Fresh salmon sushi with soy sauce and wasabi.",category:"Sushi",restaurantId:"rest_1"},{id:"4",name:"Double Burger",price:22e4,image:"https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&q=80",description:"Double beef burger with cheese and pickles.",category:"Burger",restaurantId:"rest_1"},{id:"5",name:"Pepperoni Lift",price:24e4,image:"https://thumbs.dreamstime.com/b/pepperoni-pizza-slice-lift-melted-cheese-box-pepperoni-pizza-slice-lift-melted-cheese-box-349528217.jpg?w=992",description:"Crispy pepperoni pizza baked to perfection.",category:"Pizza",restaurantId:"rest_1"},{id:"6",name:"Rainbow Sushi",price:32e4,image:"https://th.bing.com/th/id/R.8b296e4ac3888bb6e70504928e6f8e24?rik=UvkyqeD4uJbR9g&pid=ImgRaw&r=0",description:"Colorful sushi rolls with tuna, salmon, and avocado.",category:"Sushi",restaurantId:"rest_1"},{id:"7",name:"Strawberry Dream Cake",price:35e4,image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",description:"Bản giao hưởng sô cô la lộng lẫy. Những dòng ganache óng ả, đặc quánh buông lơi như dải lụa mềm, bao trọn lấy cốt bánh ẩm mượt. Trên đỉnh, từng đóa hồng kem bơ sô cô la nở rộ, mời gọi một trải nghiệm ngọt ngào đầy đê mê.",tag:"New",category:"Dessert",restaurantId:"rest_2"},{id:"8",name:"Chocolate Heaven",price:28e4,image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",description:'Từng khối brownie ẩm mượt, đặc quánh xếp chồng, phô diễn kết cấu "fudgy" quyến rũ. Dòng sốt sô cô la nóng hổi đang lười biếng chảy tràn, đánh thức mọi giác quan với sự nồng nàn, nguyên chất.',tag:"Hot",category:"Dessert",restaurantId:"rest_2"},{id:"9",name:"Vanilla Cupcake Delight",price:2e5,image:"https://tse3.mm.bing.net/th/id/OIP.lE-x_V_iDgozmz4Qv09PowHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",description:'Chiếc cupcake xốp mềm tựa như nhung, nâng đỡ "đám mây" kem bơ mịn màng, cuộn xoắn đầy duyên dáng. Một vẻ đẹp tinh tế, cổ điển, hứa hẹn sự ngọt ngào tan chảy nhẹ nhàng.',category:"Dessert",restaurantId:"rest_2"},{id:"10",name:"Red Velvet Magic",price:32e4,image:"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",description:"Dòng caramel vàng óng và sô cô la đậm đặc đang lười biếng tuôn chảy, quyện lấy viên kem vani mát lạnh. Một khoảnh khắc bùng nổ của sự ngọt ngào tương phản, tan chảy ngay trên đầu lưỡi.",category:"Dessert",restaurantId:"rest_2"},{id:"11",name:"Tiramisu Paradise",price:38e4,image:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",description:"Từng tầng kem mascarpone mềm mượt tựa áng mây, ôm ấp lấy những ngón tay thấm đẫm vị cà phê nồng nàn. Lớp bột ca cao đắng nhẹ phủ trên như một tấm màn nhung, đánh thức một trải nghiệm lãng mạn và tinh tế.",category:"Dessert",restaurantId:"rest_2"},{id:"12",name:"Cheesecake Bliss",price:3e5,image:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",description:"Trên nền đế bánh quy vàng giòn, lớp phô mai mịn màng, béo ngậy như lụa. Thắp sáng trên cùng là vầng sốt việt quất tím thẫm, căng mọng, mang đến sự cân bằng chua ngọt đầy vương vấn.",category:"Dessert",restaurantId:"rest_2"},{id:"13",name:"Hawaiian Fried Rice",price:26e4,image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",description:"Tropical fried rice with pineapple, ham, and vegetables.",tag:"Hot",category:"Rice",restaurantId:"restaurant_2"},{id:"14",name:"Bento Box Lunch",price:31e4,image:"https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=800&q=80",description:"Complete bento meal with teriyaki chicken, rice, vegetables, and miso soup.",tag:"New",category:"Rice",restaurantId:"restaurant_2"},{id:"15",name:"Office Rice Meals",price:22e4,image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",description:"Quick and nutritious rice meals perfect for busy professionals.",category:"Rice",restaurantId:"restaurant_2"},{id:"16",name:"Stir-Fried Noodles",price:245e3,image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",description:"Savory stir-fried noodles with vegetables and choice of protein.",tag:"Hot",category:"Noodles",restaurantId:"restaurant_2"},{id:"17",name:"Stir-Fried Vermicelli",price:24e4,image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",description:"Light and flavorful vermicelli noodles with fresh vegetables.",category:"Noodles",restaurantId:"restaurant_2"},{id:"18",name:"Burritos",price:29e4,image:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",description:"Hawaiian-style burrito with grilled chicken, pineapple salsa, and rice.",tag:"New",category:"Hawaiian",restaurantId:"restaurant_2"},{id:"19",name:"Fresh Spring Rolls (Gỏi cuốn)",price:2e5,image:"https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",description:"Light and healthy rice paper rolls with shrimp, herbs, and peanut sauce.",category:"Asian",restaurantId:"restaurant_2"},{id:"20",name:"Fried Spring Rolls (Chả giò)",price:22e4,image:"https://th.bing.com/th/id/OIP.KUGmFTZprLWgPDdf1QxUxAHaHa?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",description:"Golden crispy fried rolls filled with pork, vegetables, and glass noodles.",tag:"Hot",category:"Asian",restaurantId:"restaurant_2"},{id:"21",name:"Dim Sum",price:33e4,image:"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",description:"Assorted traditional dim sum with dumplings, bao buns, and shumai.",category:"Asian",restaurantId:"restaurant_2"}],sl=e=>e.image||D3[e.category];Object.fromEntries(Ct.map(e=>[e.id,e.name]));Object.fromEntries(Ct.map(e=>[e.id,e.price]));const yb=v.createContext(void 0),R3=({children:e,priceMap:t})=>{const[n,r]=v.useState(()=>{try{return JSON.parse(localStorage.getItem("cart")||"[]")}catch{return[]}});v.useEffect(()=>{localStorage.setItem("cart",JSON.stringify(n))},[n]);const i=(u,d=1,h)=>{r(p=>{if(p.find(b=>b.id===u))return p.map(b=>b.id===u?{...b,qty:b.qty+d}:b);const x=(h==null?void 0:h.price)??t[u]??0;return[...p,{id:u,qty:d,name:(h==null?void 0:h.name)??u,image:h==null?void 0:h.image,price:x}]})},s=u=>r(d=>d.filter(h=>h.id!==u)),a=(u,d)=>r(h=>h.map(p=>p.id===u?{...p,qty:d}:p)),l=()=>r([]),c=v.useMemo(()=>n.reduce((u,d)=>{const h=Number(d.price)||0,p=Number(d.qty)||0;return u+h*p},0),[n]);return o.jsx(yb.Provider,{value:{items:n,add:i,remove:s,setQty:a,clear:l,subtotal:c},children:e})},Wo=()=>{const e=v.useContext(yb);if(!e)throw new Error("useCart must be used within CartProvider");return e},vb=v.createContext(void 0),M3=({children:e})=>{const[t,n]=v.useState(()=>{try{return JSON.parse(localStorage.getItem("wishlist")||"[]")}catch{return[]}});v.useEffect(()=>{localStorage.setItem("wishlist",JSON.stringify(t))},[t]);const r=s=>n(a=>a.includes(s)?a.filter(l=>l!==s):[...a,s]),i=s=>t.includes(s);return o.jsx(vb.Provider,{value:{ids:t,toggle:r,has:i},children:e})},I3=()=>{const e=v.useContext(vb);if(!e)throw new Error("useWishlist must be used within WishlistProvider");return e},q=e=>typeof e!="number"||isNaN(e)?"0 ₫":new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",minimumFractionDigits:0,maximumFractionDigits:0}).format(e).replace("VND","₫");let F3={data:""},N3=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||F3},_3=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,L3=/\/\*[^]*?\*\/|  +/g,_0=/\n+/g,On=(e,t)=>{let n="",r="",i="";for(let s in e){let a=e[s];s[0]=="@"?s[1]=="i"?n=s+" "+a+";":r+=s[1]=="f"?On(a,s):s+"{"+On(a,s[1]=="k"?"":t)+"}":typeof a=="object"?r+=On(a,t?t.replace(/([^,])+/g,l=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,l):l?l+" "+c:c)):s):a!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=On.p?On.p(s,a):s+":"+a+";")}return n+(t&&i?t+"{"+i+"}":i)+r},on={},wb=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+wb(e[n]);return t}return e},O3=(e,t,n,r,i)=>{let s=wb(e),a=on[s]||(on[s]=(c=>{let u=0,d=11;for(;u<c.length;)d=101*d+c.charCodeAt(u++)>>>0;return"go"+d})(s));if(!on[a]){let c=s!==e?e:(u=>{let d,h,p=[{}];for(;d=_3.exec(u.replace(L3,""));)d[4]?p.shift():d[3]?(h=d[3].replace(_0," ").trim(),p.unshift(p[0][h]=p[0][h]||{})):p[0][d[1]]=d[2].replace(_0," ").trim();return p[0]})(e);on[a]=On(i?{["@keyframes "+a]:c}:c,n?"":"."+a)}let l=n&&on.g?on.g:null;return n&&(on.g=on[a]),((c,u,d,h)=>{h?u.data=u.data.replace(h,c):u.data.indexOf(c)===-1&&(u.data=d?c+u.data:u.data+c)})(on[a],t,r,l),a},z3=(e,t,n)=>e.reduce((r,i,s)=>{let a=t[s];if(a&&a.call){let l=a(n),c=l&&l.props&&l.props.className||/^go/.test(l)&&l;a=c?"."+c:l&&typeof l=="object"?l.props?"":On(l,""):l===!1?"":l}return r+i+(a??"")},"");function Ac(e){let t=this||{},n=e.call?e(t.p):e;return O3(n.unshift?n.raw?z3(n,[].slice.call(arguments,1),t.p):n.reduce((r,i)=>Object.assign(r,i&&i.call?i(t.p):i),{}):n,N3(t.target),t.g,t.o,t.k)}let bb,Bh,Hh;Ac.bind({g:1});let Cn=Ac.bind({k:1});function V3(e,t,n,r){On.p=t,bb=e,Bh=n,Hh=r}function lr(e,t){let n=this||{};return function(){let r=arguments;function i(s,a){let l=Object.assign({},s),c=l.className||i.className;n.p=Object.assign({theme:Bh&&Bh()},l),n.o=/ *go\d+/.test(c),l.className=Ac.apply(n,r)+(c?" "+c:"");let u=e;return e[0]&&(u=l.as||e,delete l.as),Hh&&u[0]&&Hh(l),bb(u,l)}return i}}var B3=e=>typeof e=="function",Yl=(e,t)=>B3(e)?e(t):e,H3=(()=>{let e=0;return()=>(++e).toString()})(),jb=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),U3=20,_p="default",Sb=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return Sb(e,{type:e.toasts.find(a=>a.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},ol=[],kb={toasts:[],pausedAt:void 0,settings:{toastLimit:U3}},Zt={},Cb=(e,t=_p)=>{Zt[t]=Sb(Zt[t]||kb,e),ol.forEach(([n,r])=>{n===t&&r(Zt[t])})},$b=e=>Object.keys(Zt).forEach(t=>Cb(e,t)),W3=e=>Object.keys(Zt).find(t=>Zt[t].toasts.some(n=>n.id===e)),Dc=(e=_p)=>t=>{Cb(t,e)},G3={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},K3=(e={},t=_p)=>{let[n,r]=v.useState(Zt[t]||kb),i=v.useRef(Zt[t]);v.useEffect(()=>(i.current!==Zt[t]&&r(Zt[t]),ol.push([t,r]),()=>{let a=ol.findIndex(([l])=>l===t);a>-1&&ol.splice(a,1)}),[t]);let s=n.toasts.map(a=>{var l,c,u;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((l=e[a.type])==null?void 0:l.removeDelay)||(e==null?void 0:e.removeDelay),duration:a.duration||((c=e[a.type])==null?void 0:c.duration)||(e==null?void 0:e.duration)||G3[a.type],style:{...e.style,...(u=e[a.type])==null?void 0:u.style,...a.style}}});return{...n,toasts:s}},Y3=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||H3()}),Go=e=>(t,n)=>{let r=Y3(t,e,n);return Dc(r.toasterId||W3(r.id))({type:2,toast:r}),r.id},$e=(e,t)=>Go("blank")(e,t);$e.error=Go("error");$e.success=Go("success");$e.loading=Go("loading");$e.custom=Go("custom");$e.dismiss=(e,t)=>{let n={type:3,toastId:e};t?Dc(t)(n):$b(n)};$e.dismissAll=e=>$e.dismiss(void 0,e);$e.remove=(e,t)=>{let n={type:4,toastId:e};t?Dc(t)(n):$b(n)};$e.removeAll=e=>$e.remove(void 0,e);$e.promise=(e,t,n)=>{let r=$e.loading(t.loading,{...n,...n==null?void 0:n.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let s=t.success?Yl(t.success,i):void 0;return s?$e.success(s,{id:r,...n,...n==null?void 0:n.success}):$e.dismiss(r),i}).catch(i=>{let s=t.error?Yl(t.error,i):void 0;s?$e.error(s,{id:r,...n,...n==null?void 0:n.error}):$e.dismiss(r)}),e};var q3=1e3,Q3=(e,t="default")=>{let{toasts:n,pausedAt:r}=K3(e,t),i=v.useRef(new Map).current,s=v.useCallback((h,p=q3)=>{if(i.has(h))return;let g=setTimeout(()=>{i.delete(h),a({type:4,toastId:h})},p);i.set(h,g)},[]);v.useEffect(()=>{if(r)return;let h=Date.now(),p=n.map(g=>{if(g.duration===1/0)return;let x=(g.duration||0)+g.pauseDuration-(h-g.createdAt);if(x<0){g.visible&&$e.dismiss(g.id);return}return setTimeout(()=>$e.dismiss(g.id,t),x)});return()=>{p.forEach(g=>g&&clearTimeout(g))}},[n,r,t]);let a=v.useCallback(Dc(t),[t]),l=v.useCallback(()=>{a({type:5,time:Date.now()})},[a]),c=v.useCallback((h,p)=>{a({type:1,toast:{id:h,height:p}})},[a]),u=v.useCallback(()=>{r&&a({type:6,time:Date.now()})},[r,a]),d=v.useCallback((h,p)=>{let{reverseOrder:g=!1,gutter:x=8,defaultPosition:b}=p||{},S=n.filter(w=>(w.position||b)===(h.position||b)&&w.height),m=S.findIndex(w=>w.id===h.id),y=S.filter((w,$)=>$<m&&w.visible).length;return S.filter(w=>w.visible).slice(...g?[y+1]:[0,y]).reduce((w,$)=>w+($.height||0)+x,0)},[n]);return v.useEffect(()=>{n.forEach(h=>{if(h.dismissed)s(h.id,h.removeDelay);else{let p=i.get(h.id);p&&(clearTimeout(p),i.delete(h.id))}})},[n,s]),{toasts:n,handlers:{updateHeight:c,startPause:l,endPause:u,calculateOffset:d}}},X3=Cn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Z3=Cn`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J3=Cn`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,e6=lr("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${X3} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Z3} 0.15s ease-out forwards;
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
    animation: ${J3} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,t6=Cn`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,n6=lr("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${t6} 1s linear infinite;
`,r6=Cn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,i6=Cn`
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
}`,s6=lr("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${r6} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${i6} 0.2s ease-out forwards;
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
`,o6=lr("div")`
  position: absolute;
`,a6=lr("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,l6=Cn`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,c6=lr("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${l6} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,u6=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t!==void 0?typeof t=="string"?v.createElement(c6,null,t):t:n==="blank"?null:v.createElement(a6,null,v.createElement(n6,{...r}),n!=="loading"&&v.createElement(o6,null,n==="error"?v.createElement(e6,{...r}):v.createElement(s6,{...r})))},d6=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,h6=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,f6="0%{opacity:0;} 100%{opacity:1;}",p6="0%{opacity:1;} 100%{opacity:0;}",g6=lr("div")`
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
`,m6=lr("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,x6=(e,t)=>{let n=e.includes("top")?1:-1,[r,i]=jb()?[f6,p6]:[d6(n),h6(n)];return{animation:t?`${Cn(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${Cn(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},y6=v.memo(({toast:e,position:t,style:n,children:r})=>{let i=e.height?x6(e.position||t||"top-center",e.visible):{opacity:0},s=v.createElement(u6,{toast:e}),a=v.createElement(m6,{...e.ariaProps},Yl(e.message,e));return v.createElement(g6,{className:e.className,style:{...i,...n,...e.style}},typeof r=="function"?r({icon:s,message:a}):v.createElement(v.Fragment,null,s,a))});V3(v.createElement);var v6=({id:e,className:t,style:n,onHeightUpdate:r,children:i})=>{let s=v.useCallback(a=>{if(a){let l=()=>{let c=a.getBoundingClientRect().height;r(e,c)};l(),new MutationObserver(l).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return v.createElement("div",{ref:s,className:t,style:n},i)},w6=(e,t)=>{let n=e.includes("top"),r=n?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:jb()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...r,...i}},b6=Ac`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,va=16,Tb=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:r,children:i,toasterId:s,containerStyle:a,containerClassName:l})=>{let{toasts:c,handlers:u}=Q3(n,s);return v.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:va,left:va,right:va,bottom:va,pointerEvents:"none",...a},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(d=>{let h=d.position||t,p=u.calculateOffset(d,{reverseOrder:e,gutter:r,defaultPosition:t}),g=w6(h,p);return v.createElement(v6,{id:d.id,key:d.id,onHeightUpdate:u.updateHeight,className:d.visible?b6:"",style:g},d.type==="custom"?Yl(d.message,d):i?i(d):v.createElement(y6,{toast:d,position:h}))}))},L=$e;const Eb=()=>{const{user:e,isAdmin:t,isRestaurant:n,isCustomer:r}=Ze();return{user:e,hasRole:d=>(e==null?void 0:e.role)===d,hasAnyRole:d=>d.some(h=>(e==null?void 0:e.role)===h),canAddToCart:()=>r(),canManageMenu:()=>n()||t(),canAdministrate:()=>t(),getDefaultRedirectPath:()=>{if(!e)return"/login";switch(e.role){case"admin":return"/admin/dashboard";case"restaurant":return"/restaurant";case"customer":return"/menu";default:return"/menu"}},isAdmin:t(),isRestaurant:n(),isCustomer:r()}},j6=f(O.div)`
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
`,S6=f(tr)`
  display: block;
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`,k6=f.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
`,C6=f(tr)`
  display: block;
  margin-top: 12px;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`,$6=f.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`,T6=f.div`
  color: var(--primary);
  font-weight: 800;
  font-size: 18px;
`,E6=f.span`
  color: var(--secondaryText);
  font-size: 12px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 12px;
`,P6=f.div`
  display: flex; 
  gap: 8px; 
  margin-top: 12px;
`,$u=f(O.button)`
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
`,Tu=f(O.button)`
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
`,A6=f(O.span)`
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
`,D6=({product:e,isAdmin:t,onEdit:n,onDelete:r,onAddToCart:i})=>{const{add:s}=Wo(),{toggle:a,has:l}=I3(),{canAddToCart:c,isRestaurant:u}=Eb(),d=sl(e),h=()=>{if(!c()){L.error("🚫 Tài khoản nhà hàng không thể thêm món vào giỏ hàng");return}i?i(e):(s(e.id,1,{name:e.name,image:d,price:e.price}),L.success("🛒 Đã thêm vào giỏ hàng!"))},p=()=>{if(!c()){L.error("🚫 Tài khoản nhà hàng không thể sử dụng danh sách yêu thích");return}a(e.id),L.success(l(e.id)?"Đã xóa khỏi danh sách yêu thích":"Đã thêm vào danh sách yêu thích ❤️")};return o.jsxs(j6,{isAdmin:t,whileHover:{y:-4,scale:1.01},transition:{type:"spring",stiffness:300,damping:20},initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[o.jsxs(S6,{to:`/details/${e.id}`,"aria-label":e.name,children:[e.tag&&o.jsx(A6,{initial:{scale:0},animate:{scale:1},transition:{delay:.2},children:e.tag}),o.jsx(k6,{src:d,alt:e.name,onError:g=>{g.currentTarget.src="https://via.placeholder.com/400x300?text=No+Image"}})]}),o.jsx(C6,{to:`/details/${e.id}`,children:e.name}),o.jsxs($6,{children:[o.jsx(T6,{children:q(e.price)}),o.jsx(E6,{children:e.category})]}),o.jsx(P6,{children:t?o.jsxs(o.Fragment,{children:[o.jsx($u,{onClick:()=>n==null?void 0:n(e),whileHover:{scale:1.02},whileTap:{scale:.98},style:{background:"#2196f3"},children:"✏️ Chỉnh sửa"}),o.jsx(Tu,{onClick:()=>r==null?void 0:r(e.id),whileHover:{scale:1.1},whileTap:{scale:.9},style:{color:"#e74c3c"},children:"🗑️ Xóa"})]}):u?o.jsxs(o.Fragment,{children:[o.jsx($u,{onClick:()=>L("💡 Hãy vào trang Quản lý Menu để chỉnh sửa món ăn",{icon:"💡"}),whileHover:{scale:1.02},whileTap:{scale:.98},style:{background:"#FF6600",opacity:.7,cursor:"not-allowed"},disabled:!0,children:"🏪 Nhà hàng"}),o.jsx(Tu,{style:{opacity:.5,cursor:"not-allowed"},disabled:!0,children:"🚫"})]}):o.jsxs(o.Fragment,{children:[o.jsx($u,{onClick:h,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Thêm vào giỏ"}),o.jsx(Tu,{onClick:p,whileHover:{scale:1.1},whileTap:{scale:.9},children:l(e.id)?"♥":"♡"})]})})]})},R6=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,M6=f.div`
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
`,I6=f.div`
  width: 100%;
  height: 200px;
  margin-bottom: 12px;
`,F6=f.div`
  height: 20px;
  width: 70%;
  margin-bottom: 8px;
`,N6=f.div`
  height: 16px;
  width: 40%;
  margin-bottom: 12px;
`,_6=f.div`
  height: 36px;
  width: 100%;
`,L6=()=>o.jsxs(M6,{children:[o.jsx(I6,{className:"skeleton"}),o.jsx(F6,{className:"skeleton"}),o.jsx(N6,{className:"skeleton"}),o.jsx(_6,{className:"skeleton"})]}),O6=({count:e=6})=>o.jsx(R6,{children:Array.from({length:e}).map((t,n)=>o.jsx(O.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:n*.1},children:o.jsx(L6,{})},n))}),Pb=v.createContext(void 0),vi=({children:e})=>{const[t,n]=v.useState(null),[r,i]=v.useState(!0);v.useEffect(()=>{try{const l=localStorage.getItem("admin_auth");l&&n(JSON.parse(l))}catch(l){console.error("Error parsing saved admin:",l)}finally{i(!1)}},[]),v.useEffect(()=>{t?localStorage.setItem("admin_auth",JSON.stringify(t)):localStorage.removeItem("admin_auth")},[t]);const s=async(l,c)=>{if(i(!0),await new Promise(u=>setTimeout(u,400)),l==="admin"&&c==="admin123"){const u={id:"admin_1",name:"System Administrator",username:"admin",role:"admin",email:"admin@foodfast.com",createdAt:Date.now()-31536e6};return n(u),i(!1),{ok:!0}}return i(!1),{ok:!1,message:"Invalid admin credentials"}},a=()=>n(null);return o.jsx(Pb.Provider,{value:{admin:t,loading:r,login:s,logout:a},children:r?o.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px",color:"#666"},children:"Loading admin panel..."}):e})},ms=()=>{const e=v.useContext(Pb);return e||(console.error("useAdminAuth must be used inside AdminAuthProvider"),{admin:null,loading:!1,login:async()=>({ok:!1,message:"Admin auth not initialized"}),logout:()=>{}})},Ab=v.createContext(void 0),z6=({children:e})=>{const[t,n]=v.useState(()=>{const l=localStorage.getItem("orders");return l?JSON.parse(l):[]});v.useEffect(()=>{localStorage.setItem("orders",JSON.stringify(t))},[t]);const r=l=>{n(c=>[...c,{...l,id:Date.now().toString()}])},i=l=>t.filter(c=>c.phone===l),s=(l,c)=>{n(u=>u.map(d=>d.id===l?{...d,status:c}:d))},a=(l,c,u)=>{n(d=>d.map(h=>h.id===l?{...h,paymentStatus:c,vnpayTransactionId:u||h.vnpayTransactionId}:h))};return o.jsx(Ab.Provider,{value:{orders:t,addOrder:r,getOrdersByPhone:i,updateOrderStatus:s,updateOrderPaymentStatus:a},children:e})},ti=()=>{const e=v.useContext(Ab);if(!e)throw new Error("useOrders must be used inside OrderProvider");return e},Db=v.createContext(void 0),V6=({children:e})=>{const[t,n]=v.useState(()=>localStorage.getItem("theme")||"light");v.useEffect(()=>{document.body.dataset.theme=t,localStorage.setItem("theme",t)},[t]);const r=()=>{n(i=>i==="light"?"dark":"light")};return o.jsx(Db.Provider,{value:{theme:t,toggleTheme:r},children:e})},B6=()=>{const e=v.useContext(Db);if(!e)throw new Error("useTheme must be used within ThemeProvider");return e},H6=f.div`
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`,U6=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,W6=f.h4`
  margin: 0;
  color: #495057;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`,G6=f.div`
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
`,K6=f.div`
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
`,Y6=f.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`,q6=f.path`
  stroke: rgba(0, 123, 255, 0.3);
  stroke-width: 3;
  fill: none;
  stroke-dasharray: 5, 5;
  animation: dash 2s linear infinite;
  
  @keyframes dash {
    to { stroke-dashoffset: -10; }
  }
`,Q6=f(O.div)`
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
`,X6=f(O.div)`
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
`,Z6=f(O.div)`
  position: absolute;
  font-size: 24px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  z-index: 15;
  cursor: pointer;
`,J6=f.div`
  margin-bottom: 16px;
`,eP=f.div`
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`,tP=f(O.div)`
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
`,nP=f.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`,rP=f.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  position: relative;
`,iP=f.div`
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
`,sP=f.div`
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
`,oP=f.span`
  margin-top: 8px;
  font-size: 11px;
  font-weight: ${e=>e.$active?"600":"400"};
  color: ${e=>e.$active?"#007bff":"#6c757d"};
  text-align: center;
`,aP=f.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,lP=f(O.button)`
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
`,cP=({orderId:e,isActive:t,onComplete:n,deliveryTime:r=15})=>{const[i,s]=v.useState({x:20,y:20}),[a,l]=v.useState(0),[c,u]=v.useState(r*60),[d,h]=v.useState(!1),[p,g]=v.useState(0),x=v.useRef(),b=v.useRef(),S=Kl(),m=Kl(),y={start:{x:20,y:20},end:{x:320,y:160},waypoints:[{x:80,y:40},{x:140,y:60},{x:200,y:80},{x:260,y:120}]},w=[{icon:"🚀",label:"Rời nhà hàng",key:"departure"},{icon:"🛫",label:"Đang bay",key:"flying"},{icon:"📍",label:"Tiếp cận",key:"approaching"},{icon:"✅",label:"Hoàn tất",key:"delivered"}],$=v.useCallback(P=>{let A=0;const D=[P.start,...P.waypoints,P.end];for(let W=0;W<D.length-1;W++){const ee=D[W+1].x-D[W].x,z=D[W+1].y-D[W].y;A+=Math.sqrt(ee*ee+z*z)}return A},[]),j=v.useCallback(P=>{const A=[y.start,...y.waypoints,y.end],D=$(y),W=P/100*D;let ee=0;for(let z=0;z<A.length-1;z++){const _=A[z+1].x-A[z].x,N=A[z+1].y-A[z].y,M=Math.sqrt(_*_+N*N);if(ee+M>=W){const E=(W-ee)/M;return{x:A[z].x+_*E,y:A[z].y+N*E}}ee+=M}return y.end},[y,$]),k=v.useCallback(P=>{if(b.current||(b.current=P),!d){const A=(P-b.current)/1e3,D=r*60,W=Math.min(A/D*100,100),ee=Math.max(D-A,0);l(W),u(ee);const z=j(W);s(z);const _=Math.floor(W/100*w.length);if(g(Math.min(_,w.length-1)),W>=100&&c>0){u(0),n==null||n();return}}a<100&&(x.current=requestAnimationFrame(k))},[d,r,c,a,w.length,j,n]);v.useEffect(()=>(t&&!d?(b.current=void 0,x.current=requestAnimationFrame(k)):x.current&&cancelAnimationFrame(x.current),()=>{x.current&&cancelAnimationFrame(x.current)}),[t,d,k]),v.useEffect(()=>{S.start({x:i.x,y:i.y,transition:{duration:.1,ease:"linear"}})},[i,S]),v.useEffect(()=>{m.start({width:`${a}%`,transition:{duration:.1,ease:"linear"}})},[a,m]);const C=P=>{const A=Math.floor(P/60),D=Math.floor(P%60);return`${A} phút ${D} giây`},T=()=>[y.start,...y.waypoints,y.end].map((A,D)=>`${D===0?"M":"L"} ${A.x} ${A.y}`).join(" ");return o.jsxs(H6,{children:[o.jsxs(U6,{children:[o.jsx(W6,{children:"🛩️ Hành trình Drone"}),c>0&&o.jsxs(G6,{children:["⏱️ Còn lại: ",C(c)]})]}),o.jsxs(K6,{children:[o.jsx(Y6,{children:o.jsx(q6,{d:T()})}),o.jsx(Q6,{animate:{scale:[1,1.1,1]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},children:"🏪"}),o.jsx(X6,{animate:{scale:[1,1.1,1]},transition:{duration:2,repeat:1/0,ease:"easeInOut",delay:1},children:"🏠"}),o.jsx(Z6,{animate:S,initial:{x:y.start.x,y:y.start.y},whileHover:{scale:1.2},children:"🛩️"})]}),o.jsxs(J6,{children:[o.jsx(eP,{children:o.jsx(tP,{initial:{width:0},animate:m})}),o.jsxs(nP,{children:[o.jsx("span",{children:"Tiến độ giao hàng"}),o.jsxs("span",{children:[Math.round(a),"%"]})]})]}),o.jsx(rP,{children:w.map((P,A)=>o.jsxs(iP,{$active:p===A,$completed:p>A||c===0,children:[o.jsx(sP,{$active:p===A,$completed:p>A||c===0,children:P.icon}),o.jsx(oP,{$active:p===A,children:P.label})]},P.key))}),o.jsx(aP,{children:o.jsx(lP,{$variant:d?"resume":"pause",onClick:()=>h(!d),whileHover:{scale:1.05},whileTap:{scale:.95},children:d?"▶️ Tiếp tục":"⏸️ Tạm dừng"})})]})},L0=f.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`,uP=f.div`
  margin-bottom: 32px;
`,dP=f.h1`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`,hP=f.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`,fP=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,wa=f(O.div)`
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
`,ba=f.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${e=>e.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`,ja=f.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`,Sa=f.div`
  color: #666;
  font-size: 14px;
  font-weight: 500;
`,O0=f.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  overflow: hidden;
`,z0=f.div`
  padding: 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,V0=f.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`,B0=f(O.button)`
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
`,pP=f.div`
  overflow-x: auto;
`,gP=f.table`
  width: 100%;
  border-collapse: collapse;
`,mP=f.thead`
  background: #f8f9fa;
`,ur=f.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
`,xP=f.tbody``,yP=f.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  ${e=>e.$status==="Delivering"&&`
    background: rgba(33, 150, 243, 0.05);
  `}
`,dr=f.td`
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
  color: #333;
`,vP=f.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${e=>{switch(e.$status){case"Processing":return"background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;";case"Delivering":return"background: #cce5ff; color: #004085; border: 1px solid #99d6ff;";case"Completed":return"background: #d4edda; color: #155724; border: 1px solid #a3e4a3;";default:return"background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"}}}
`,Eu=f.button`
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
`,wP=f.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`,bP=f.div`
  font-size: 48px;
  margin-bottom: 16px;
`,jP=f.h3`
  margin: 0 0 8px 0;
  color: #333;
`,SP=f.p`
  margin: 0;
  color: #666;
`,kP=f.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${e=>e.$isActive?"#007bff":"#6c757d"};
  
  &::before {
    content: '${e=>e.$isActive?"🛫":"⏸️"}';
  }
`,CP=()=>{const e=Ze(),{orders:t,updateOrderStatus:n}=ti(),[r,i]=v.useState(!1),[s,a]=v.useState(!1);if(!e.user||e.user.role!=="restaurant"&&e.user.role!=="admin")return o.jsx(L0,{children:o.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[o.jsx("h2",{children:"🚫 Truy cập bị từ chối"}),o.jsx("p",{children:"Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản nhà hàng."})]})});const l=new Set(t.map(x=>x.phone)).size,c=t.length,u=t.filter(x=>x.status==="Delivering").length,d=t.filter(x=>x.status==="Completed").length,h=(x,b)=>{n(x,b),L.success(`✅ Đã cập nhật trạng thái đơn hàng thành "${b}"`)},p=async()=>{i(!0),await new Promise(x=>setTimeout(x,1e3)),i(!1),L.success("🔄 Đã làm mới dữ liệu")},g=x=>{switch(x){case"Processing":return"Đang chuẩn bị";case"Delivering":return"Đang giao hàng";case"Completed":return"Hoàn tất";default:return x}};return o.jsxs(L0,{children:[o.jsxs(uP,{children:[o.jsx(dP,{children:"Bảng điều khiển nhà hàng"}),o.jsx(hP,{children:"Quản lý đơn hàng và theo dõi drone giao hàng"})]}),o.jsxs(fP,{children:[o.jsxs(wa,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[o.jsx(ba,{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",children:"👥"}),o.jsx(ja,{children:l}),o.jsx(Sa,{children:"Tổng số khách hàng"})]}),o.jsxs(wa,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[o.jsx(ba,{color:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",children:"📦"}),o.jsx(ja,{children:c}),o.jsx(Sa,{children:"Tổng số đơn hàng"})]}),o.jsxs(wa,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[o.jsx(ba,{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",children:"🚁"}),o.jsx(ja,{children:u}),o.jsx(Sa,{children:"Drone đang hoạt động"})]}),o.jsxs(wa,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:[o.jsx(ba,{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",children:"✅"}),o.jsx(ja,{children:d}),o.jsx(Sa,{children:"Giao hàng hoàn tất"})]})]}),o.jsxs(O0,{children:[o.jsxs(z0,{children:[o.jsx(V0,{children:"Danh sách đơn hàng"}),o.jsxs("div",{style:{display:"flex",gap:"12px"},children:[o.jsx(B0,{onClick:p,disabled:r,whileHover:{scale:1.05},whileTap:{scale:.95},children:r?"🔄 Đang làm mới...":"🔄 Làm mới"}),o.jsx(B0,{onClick:()=>a(!s),style:{background:"#6f42c1"},whileHover:{scale:1.05},whileTap:{scale:.95},children:s?"🛩️ Ẩn Demo":"🛩️ Demo Drone"})]})]}),o.jsx(pP,{children:t.length===0?o.jsxs(wP,{children:[o.jsx(bP,{children:"📦"}),o.jsx(jP,{children:"Chưa có đơn hàng nào"}),o.jsx(SP,{children:"Khi có đơn hàng mới, chúng sẽ hiển thị ở đây."})]}):o.jsxs(gP,{children:[o.jsx(mP,{children:o.jsxs("tr",{children:[o.jsx(ur,{children:"Mã đơn hàng"}),o.jsx(ur,{children:"Khách hàng"}),o.jsx(ur,{children:"Số điện thoại"}),o.jsx(ur,{children:"Tổng tiền"}),o.jsx(ur,{children:"Trạng thái"}),o.jsx(ur,{children:"Drone"}),o.jsx(ur,{children:"Thao tác"})]})}),o.jsx(xP,{children:t.map(x=>o.jsxs(yP,{$status:x.status,children:[o.jsx(dr,{children:o.jsxs("strong",{children:["#",x.id.slice(-6)]})}),o.jsx(dr,{children:x.name}),o.jsx(dr,{children:x.phone}),o.jsx(dr,{children:q(x.total)}),o.jsx(dr,{children:o.jsx(vP,{$status:x.status,children:g(x.status)})}),o.jsx(dr,{children:o.jsx(kP,{$isActive:x.status==="Delivering",children:x.status==="Delivering"?"Đang bay":"Không hoạt động"})}),o.jsxs(dr,{children:[o.jsx(Eu,{$variant:"processing",onClick:()=>h(x.id,"Processing"),children:"Chuẩn bị"}),o.jsx(Eu,{$variant:"delivering",onClick:()=>h(x.id,"Delivering"),children:"Giao hàng"}),o.jsx(Eu,{$variant:"completed",onClick:()=>h(x.id,"Completed"),children:"Hoàn tất"})]})]},x.id))})]})})]}),s&&o.jsxs(O0,{children:[o.jsx(z0,{children:o.jsx(V0,{children:"🛩️ Demo Drone Animation"})}),o.jsx(cP,{orderId:"demo-order",isActive:!0,deliveryTime:10})]})]})},$P=f.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`,TP=f(O.section)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
  padding: 48px 32px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: 28px;
`,EP=f.h1`
  margin: 0;
  font-size: 36px;
  letter-spacing: 0.2px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`,PP=f.p`
  margin: 8px 0 0;
  opacity: 0.95;
`,Pu=f(tr)`
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
`,AP=f.div`
  text-align: center;
  padding: 40px 20px;
  background: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  margin-bottom: 28px;
`,DP=f.h2`
  margin: 0 0 16px 0;
  color: var(--text);
`,RP=f.p`
  color: var(--secondaryText);
  margin: 0 0 24px 0;
`,MP=f.h2`
  margin: 0 0 16px 0;
  color: var(--text);
`,IP=f.div`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 12px; 
  margin-bottom: 16px;
  
  @media (max-width: 768px) { 
    grid-template-columns: 1fr; 
    gap: 8px;
  }
`,FP=f.input`
  padding: 10px 12px; 
  border: 1px solid var(--border); 
  border-radius: var(--radius); 
  outline: none;
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
  }
`,H0=f.select`
  padding: 10px 12px; 
  border: 1px solid var(--border); 
  border-radius: var(--radius); 
  outline: none; 
  background: var(--card);
  color: var(--text);
  
  &:focus {
    border-color: var(--primary);
  }
`,NP=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;f.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;f.button`
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
`;f.div`
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
`;f.div`
  background: var(--card);
  padding: 24px;
  border-radius: var(--radius-lg);
  max-width: 500px;
  width: 90%;
`;f.div`
  margin-bottom: 16px;
`;f.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text);
  font-weight: 600;
`;const _P=()=>{const{user:e,isAdmin:t}=Ze(),{isRestaurant:n}=Eb(),[r,i]=v.useState(Ct),[s,a]=v.useState(Ct),[l,c]=v.useState(!0),[u,d]=v.useState(""),[h,p]=v.useState("All"),[g,x]=v.useState("All"),[b,S]=v.useState(!1),[m,y]=v.useState(null);v.useEffect(()=>{const j=setTimeout(()=>{i(Ct),a(Ct),c(!1)},1e3);return()=>clearTimeout(j)},[]),v.useEffect(()=>{let j=r;u&&(j=j.filter(k=>k.name.toLowerCase().includes(u.toLowerCase())||k.description.toLowerCase().includes(u.toLowerCase()))),h!=="All"&&(j=j.filter(k=>k.category===h)),g!=="All"&&(j=j.filter(k=>k.tag===g)),a(j)},[u,h,g,r]);const w=["All",...Array.from(new Set(Ct.map(j=>j.category)))],$=["All","Hot","New"];return e&&t()?o.jsx(CP,{}):e&&n?(L("🏪 Chuyển hướng đến bảng điều khiển nhà hàng...",{icon:"🏪"}),o.jsx(tn,{to:"/restaurant",replace:!0})):o.jsxs($P,{children:[o.jsxs(TP,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[o.jsx(EP,{children:"🚁 Giao hàng bằng drone nhanh chóng"}),o.jsx(PP,{children:"Đặt món ăn yêu thích và nhận giao hàng bằng drone trong vài phút."}),e?o.jsx(Pu,{to:"/cart",children:"🛒 Xem giỏ hàng"}):o.jsx(Pu,{to:"/login",children:"Đăng nhập để đặt món"})]}),!e&&o.jsxs(AP,{children:[o.jsx(DP,{children:"Chào mừng đến với FoodFast!"}),o.jsx(RP,{children:"Đăng nhập để có thể đặt món ăn, theo dõi đơn hàng và trải nghiệm dịch vụ giao hàng bằng drone."}),o.jsx(Pu,{to:"/login",children:"Đăng nhập ngay"})]}),o.jsx(MP,{children:e?"Thực đơn":"Khám phá món ăn"}),e&&o.jsxs(IP,{children:[o.jsx(FP,{type:"search",placeholder:"🔍 Tìm kiếm món ăn...",value:u,onChange:j=>d(j.target.value)}),o.jsx(H0,{value:h,onChange:j=>p(j.target.value),children:w.map(j=>o.jsx("option",{value:j,children:j==="All"?"Tất cả danh mục":j},j))}),o.jsx(H0,{value:g,onChange:j=>x(j.target.value),children:$.map(j=>o.jsx("option",{value:j,children:j==="All"?"Tất cả":j==="Hot"?"🔥 Hot":"✨ New"},j))})]}),l?o.jsx(O6,{count:6}):o.jsx(NP,{children:s.length>0?s.map((j,k)=>o.jsx(O.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:k*.1},children:o.jsx(D6,{product:j})},j.id)):o.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px",color:"var(--secondaryText)"},children:"Không tìm thấy món ăn phù hợp. Hãy thử tìm kiếm khác!"})})]})},Au=f.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1000px;
  margin: 0 auto;
`,LP=f.nav`
  color: #777; 
  font-size: 14px; 
  margin-bottom: 12px;
`,U0=f.div`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 24px; 
  
  @media (max-width: 900px) { 
    grid-template-columns: 1fr; 
    gap: 16px;
  }
`,OP=f.img`
  width: 100%; 
  aspect-ratio: 16/9; 
  object-fit: cover; 
  border-radius: var(--radius-md); 
  box-shadow: var(--shadow-md);
`,zP=f.h2`
  margin: 0;
`,VP=f.div`
  color: var(--primary); 
  font-weight: 800; 
  font-size: 20px;
`,BP=f.p`
  color: #555;
  line-height: 1.6;
`,W0=f.div`
  display: flex; 
  align-items: center; 
  gap: 10px; 
  margin-top: 12px;
`,G0=f.button`
  width: 36px; 
  height: 36px; 
  border-radius: 10px; 
  border: 1px solid var(--border); 
  background: var(--card); 
  cursor: pointer;
  color: var(--text);
`,Rb=f.button`
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
`,HP=f(Rb)`
  background: var(--border); 
  color: var(--text);
`,K0=()=>{const{id:e}=lC(),t=wt(),{add:n}=Wo(),r=Ct.find(d=>d.id===e),[i,s]=v.useState(1),[a,l]=v.useState(!0);if(v.useEffect(()=>{const d=setTimeout(()=>l(!1),500);return()=>clearTimeout(d)},[]),!r)return o.jsx(Au,{children:"Sản phẩm không tìm thấy."});const c=()=>{n(r.id,i,{name:r.name,image:sl(r),price:r.price}),L.success("🛒 Đã thêm vào giỏ hàng thành công!")},u=()=>{n(r.id,i,{name:r.name,image:sl(r),price:r.price}),t("/checkout")};return a?o.jsxs(Au,{children:[o.jsx("div",{className:"skeleton",style:{height:"20px",width:"200px",marginBottom:"12px"}}),o.jsxs(U0,{children:[o.jsx("div",{className:"skeleton",style:{height:"300px"}}),o.jsxs("div",{children:[o.jsx("div",{className:"skeleton",style:{height:"24px",width:"60%",marginBottom:"12px"}}),o.jsx("div",{className:"skeleton",style:{height:"20px",width:"40%",marginBottom:"16px"}}),o.jsx("div",{className:"skeleton",style:{height:"80px",marginBottom:"16px"}}),o.jsx("div",{className:"skeleton",style:{height:"40px",width:"100%"}})]})]})]}):o.jsxs(Au,{children:[o.jsxs(LP,{children:[o.jsx(tr,{to:"/",children:"Trang chủ"})," > ",o.jsx(tr,{to:"/menu",children:"Thực đơn"})," > ",o.jsx("span",{children:r.name})]}),o.jsxs(U0,{children:[o.jsx(OP,{src:sl(r),alt:r.name}),o.jsxs("div",{children:[o.jsx(zP,{children:r.name}),o.jsx(VP,{children:q(r.price)}),o.jsx(BP,{children:r.description}),o.jsxs(W0,{children:[o.jsx(G0,{onClick:()=>s(d=>Math.max(1,d-1)),children:"-"}),o.jsx("span",{children:i}),o.jsx(G0,{onClick:()=>s(d=>d+1),children:"+"})]}),o.jsxs(W0,{children:[o.jsx(Rb,{onClick:c,children:"Thêm vào giỏ"}),o.jsx(HP,{onClick:u,children:"Mua ngay"})]})]})]})]})},UP=f.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,WP=f.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
`,GP=f.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`,KP=f.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,YP=f.div`
  height: 16px;
  width: 60%;
`,qP=f.div`
  height: 14px;
  width: 40%;
`,QP=f.div`
  height: 16px;
  width: 80px;
`,XP=f.div`
  width: 80px;
  height: 32px;
  border-radius: 8px;
`,ZP=()=>o.jsxs(WP,{children:[o.jsx(GP,{className:"skeleton"}),o.jsxs(KP,{children:[o.jsx(YP,{className:"skeleton"}),o.jsx(qP,{className:"skeleton"})]}),o.jsx(QP,{className:"skeleton"}),o.jsx(XP,{className:"skeleton"})]}),JP=({count:e=3})=>o.jsx(UP,{children:Array.from({length:e}).map((t,n)=>o.jsx(O.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:n*.1},children:o.jsx(ZP,{})},n))}),Du=f.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
`,Ru=f.h2`
  margin: 0 0 16px 0;
`,eA=f.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
`,tA=f.img`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
`,nA=f.div`
  font-weight: 700;
`,rA=f.div`
  color: var(--secondaryText);
`,Uh=f.button`
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
`,Y0=f(Uh)`
  background: var(--border); 
  color: var(--text); 
  padding: 6px 10px;
`,iA=f.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
`,sA=f.div`
  color: var(--primary);
  font-weight: 800;
`,oA=f.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondaryText);
`,aA=()=>{const e=wt(),{user:t}=Ze(),{items:n,remove:r,setQty:i,subtotal:s}=Wo(),a=v.useMemo(()=>Object.fromEntries(Ct.map(b=>[b.id,b])),[]),[l,c]=v.useState(!0),u=25e3,d=s*.08,h=s+d+u,p=(b,S)=>{r(b),L.success(`✅ Đã xóa "${S}" khỏi giỏ hàng`)},g=(b,S,m)=>{i(b,S),L.success(`📦 Cập nhật số lượng "${m}" thành ${S}`)},x=()=>{if(n.length===0){L.error("Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.");return}if(!t){L.success("📝 Vui lòng điền thông tin khách hàng..."),e("/customer-info");return}L.success("🚀 Chuyển đến trang thanh toán..."),e("/checkout")};return rt.useEffect(()=>{const b=setTimeout(()=>c(!1),600);return()=>clearTimeout(b)},[]),l?o.jsxs(Du,{children:[o.jsx(Ru,{children:"Giỏ hàng"}),o.jsx(JP,{count:3})]}):n.length===0?o.jsxs(Du,{children:[o.jsx(Ru,{children:"Giỏ hàng"}),o.jsxs(oA,{children:[o.jsx("p",{children:"Giỏ hàng của bạn đang trống — hãy thêm một số món ăn ngon 🍱"}),o.jsx(tr,{to:"/menu",style:{color:"var(--primary)",textDecoration:"underline"},children:"Xem thực đơn"})]})]}):o.jsxs(Du,{children:[o.jsx(Ru,{children:"Giỏ hàng"}),n.map((b,S)=>a[b.id]?o.jsx(O.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:S*.1},children:o.jsxs(eA,{children:[o.jsx(tA,{src:b.image||"",alt:b.name,onError:y=>{y.currentTarget.src="https://via.placeholder.com/80x80?text=No+Image"}}),o.jsxs("div",{style:{flex:1},children:[o.jsx(nA,{children:b.name}),o.jsxs(rA,{children:[q(b.price)," • Số lượng:",o.jsx(Y0,{onClick:()=>g(b.id,Math.max(1,b.qty-1),b.name),style:{marginLeft:8},children:"-"}),o.jsx("span",{style:{margin:"0 8px"},children:b.qty}),o.jsx(Y0,{onClick:()=>g(b.id,b.qty+1,b.name),children:"+"})]})]}),o.jsx("div",{style:{fontWeight:700},children:q(b.price*b.qty)}),o.jsx(Uh,{onClick:()=>p(b.id,b.name),style:{background:"var(--border)",color:"var(--text)"},children:"Xóa"})]})},b.id):null),o.jsxs("div",{style:{marginTop:16,borderTop:"1px solid var(--border)",paddingTop:12},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[o.jsx("span",{children:"Tạm tính"}),o.jsx("span",{children:q(s)})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[o.jsx("span",{children:"Thuế (8%)"}),o.jsx("span",{children:q(d)})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[o.jsx("span",{children:"Phí giao hàng"}),o.jsx("span",{children:q(u)})]}),o.jsxs(iA,{children:[o.jsx("div",{children:"Tổng cộng"}),o.jsx(sA,{children:q(h)})]}),o.jsx(Uh,{style:{marginTop:12},onClick:x,children:"Tiến hành thanh toán"})]})]})},lA=()=>new Promise(e=>{setTimeout(()=>{const t=Math.random()>.2;e(t?{success:!0,transactionId:`VNPAY${Date.now()}`,message:"Thanh toán thành công qua VNPay"}:{success:!1,message:"Thanh toán thất bại. Vui lòng thử lại."})},2e3)}),cA=e=>{const t=e.get("vnp_ResponseCode"),n=e.get("vnp_TransactionNo"),r=e.get("vnp_Amount"),i=e.get("vnp_TxnRef");return{isValid:t==="00",transactionId:n||void 0,amount:r?parseInt(r)/100:void 0,orderId:i||void 0}};function ni(e){this._maxSize=e,this.clear()}ni.prototype.clear=function(){this._size=0,this._values=Object.create(null)};ni.prototype.get=function(e){return this._values[e]};ni.prototype.set=function(e,t){return this._size>=this._maxSize&&this.clear(),e in this._values||this._size++,this._values[e]=t};var uA=/[^.^\]^[]+|(?=\[\]|\.\.)/g,Mb=/^\d+$/,dA=/^\d/,hA=/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,fA=/^\s*(['"]?)(.*?)(\1)\s*$/,Lp=512,q0=new ni(Lp),Q0=new ni(Lp),X0=new ni(Lp),Hr={Cache:ni,split:Wh,normalizePath:Mu,setter:function(e){var t=Mu(e);return Q0.get(e)||Q0.set(e,function(r,i){for(var s=0,a=t.length,l=r;s<a-1;){var c=t[s];if(c==="__proto__"||c==="constructor"||c==="prototype")return r;l=l[t[s++]]}l[t[s]]=i})},getter:function(e,t){var n=Mu(e);return X0.get(e)||X0.set(e,function(i){for(var s=0,a=n.length;s<a;)if(i!=null||!t)i=i[n[s++]];else return;return i})},join:function(e){return e.reduce(function(t,n){return t+(Op(n)||Mb.test(n)?"["+n+"]":(t?".":"")+n)},"")},forEach:function(e,t,n){pA(Array.isArray(e)?e:Wh(e),t,n)}};function Mu(e){return q0.get(e)||q0.set(e,Wh(e).map(function(t){return t.replace(fA,"$2")}))}function Wh(e){return e.match(uA)||[""]}function pA(e,t,n){var r=e.length,i,s,a,l;for(s=0;s<r;s++)i=e[s],i&&(xA(i)&&(i='"'+i+'"'),l=Op(i),a=!l&&/^\d+$/.test(i),t.call(n,i,l,a,s,e))}function Op(e){return typeof e=="string"&&e&&["'",'"'].indexOf(e.charAt(0))!==-1}function gA(e){return e.match(dA)&&!e.match(Mb)}function mA(e){return hA.test(e)}function xA(e){return!Op(e)&&(gA(e)||mA(e))}const yA=/[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,Rc=e=>e.match(yA)||[],Mc=e=>e[0].toUpperCase()+e.slice(1),zp=(e,t)=>Rc(e).join(t).toLowerCase(),Ib=e=>Rc(e).reduce((t,n)=>`${t}${t?n[0].toUpperCase()+n.slice(1).toLowerCase():n.toLowerCase()}`,""),vA=e=>Mc(Ib(e)),wA=e=>zp(e,"_"),bA=e=>zp(e,"-"),jA=e=>Mc(zp(e," ")),SA=e=>Rc(e).map(Mc).join(" ");var Iu={words:Rc,upperFirst:Mc,camelCase:Ib,pascalCase:vA,snakeCase:wA,kebabCase:bA,sentenceCase:jA,titleCase:SA},Vp={exports:{}};Vp.exports=function(e){return Fb(kA(e),e)};Vp.exports.array=Fb;function Fb(e,t){var n=e.length,r=new Array(n),i={},s=n,a=CA(t),l=$A(e);for(t.forEach(function(u){if(!l.has(u[0])||!l.has(u[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")});s--;)i[s]||c(e[s],s,new Set);return r;function c(u,d,h){if(h.has(u)){var p;try{p=", node was:"+JSON.stringify(u)}catch{p=""}throw new Error("Cyclic dependency"+p)}if(!l.has(u))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify(u));if(!i[d]){i[d]=!0;var g=a.get(u)||new Set;if(g=Array.from(g),d=g.length){h.add(u);do{var x=g[--d];c(x,l.get(x),h)}while(d);h.delete(u)}r[--n]=u}}}function kA(e){for(var t=new Set,n=0,r=e.length;n<r;n++){var i=e[n];t.add(i[0]),t.add(i[1])}return Array.from(t)}function CA(e){for(var t=new Map,n=0,r=e.length;n<r;n++){var i=e[n];t.has(i[0])||t.set(i[0],new Set),t.has(i[1])||t.set(i[1],new Set),t.get(i[0]).add(i[1])}return t}function $A(e){for(var t=new Map,n=0,r=e.length;n<r;n++)t.set(e[n],n);return t}var TA=Vp.exports;const EA=Yh(TA),PA=Object.prototype.toString,AA=Error.prototype.toString,DA=RegExp.prototype.toString,RA=typeof Symbol<"u"?Symbol.prototype.toString:()=>"",MA=/^Symbol\((.*)\)(.*)$/;function IA(e){return e!=+e?"NaN":e===0&&1/e<0?"-0":""+e}function Z0(e,t=!1){if(e==null||e===!0||e===!1)return""+e;const n=typeof e;if(n==="number")return IA(e);if(n==="string")return t?`"${e}"`:e;if(n==="function")return"[Function "+(e.name||"anonymous")+"]";if(n==="symbol")return RA.call(e).replace(MA,"Symbol($1)");const r=PA.call(e).slice(8,-1);return r==="Date"?isNaN(e.getTime())?""+e:e.toISOString(e):r==="Error"||e instanceof Error?"["+AA.call(e)+"]":r==="RegExp"?DA.call(e):null}function Zn(e,t){let n=Z0(e,t);return n!==null?n:JSON.stringify(e,function(r,i){let s=Z0(this[r],t);return s!==null?s:i},2)}function Nb(e){return e==null?[]:[].concat(e)}let _b,Lb,Ob,FA=/\$\{\s*(\w+)\s*\}/g;_b=Symbol.toStringTag;class J0{constructor(t,n,r,i){this.name=void 0,this.message=void 0,this.value=void 0,this.path=void 0,this.type=void 0,this.params=void 0,this.errors=void 0,this.inner=void 0,this[_b]="Error",this.name="ValidationError",this.value=n,this.path=r,this.type=i,this.errors=[],this.inner=[],Nb(t).forEach(s=>{if(Ke.isError(s)){this.errors.push(...s.errors);const a=s.inner.length?s.inner:[s];this.inner.push(...a)}else this.errors.push(s)}),this.message=this.errors.length>1?`${this.errors.length} errors occurred`:this.errors[0]}}Lb=Symbol.hasInstance;Ob=Symbol.toStringTag;class Ke extends Error{static formatError(t,n){const r=n.label||n.path||"this";return n=Object.assign({},n,{path:r,originalPath:n.path}),typeof t=="string"?t.replace(FA,(i,s)=>Zn(n[s])):typeof t=="function"?t(n):t}static isError(t){return t&&t.name==="ValidationError"}constructor(t,n,r,i,s){const a=new J0(t,n,r,i);if(s)return a;super(),this.value=void 0,this.path=void 0,this.type=void 0,this.params=void 0,this.errors=[],this.inner=[],this[Ob]="Error",this.name=a.name,this.message=a.message,this.type=a.type,this.value=a.value,this.path=a.path,this.errors=a.errors,this.inner=a.inner,Error.captureStackTrace&&Error.captureStackTrace(this,Ke)}static[Lb](t){return J0[Symbol.hasInstance](t)||super[Symbol.hasInstance](t)}}let Yt={default:"${path} is invalid",required:"${path} is a required field",defined:"${path} must be defined",notNull:"${path} cannot be null",oneOf:"${path} must be one of the following values: ${values}",notOneOf:"${path} must not be one of the following values: ${values}",notType:({path:e,type:t,value:n,originalValue:r})=>{const i=r!=null&&r!==n?` (cast from the value \`${Zn(r,!0)}\`).`:".";return t!=="mixed"?`${e} must be a \`${t}\` type, but the final value was: \`${Zn(n,!0)}\``+i:`${e} must match the configured type. The validated value was: \`${Zn(n,!0)}\``+i}},et={length:"${path} must be exactly ${length} characters",min:"${path} must be at least ${min} characters",max:"${path} must be at most ${max} characters",matches:'${path} must match the following: "${regex}"',email:"${path} must be a valid email",url:"${path} must be a valid URL",uuid:"${path} must be a valid UUID",datetime:"${path} must be a valid ISO date-time",datetime_precision:"${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits",datetime_offset:'${path} must be a valid ISO date-time with UTC "Z" timezone',trim:"${path} must be a trimmed string",lowercase:"${path} must be a lowercase string",uppercase:"${path} must be a upper case string"},NA={min:"${path} must be greater than or equal to ${min}",max:"${path} must be less than or equal to ${max}",lessThan:"${path} must be less than ${less}",moreThan:"${path} must be greater than ${more}",positive:"${path} must be a positive number",negative:"${path} must be a negative number",integer:"${path} must be an integer"},Gh={min:"${path} field must be later than ${min}",max:"${path} field must be at earlier than ${max}"},_A={isValue:"${path} field must be ${value}"},al={noUnknown:"${path} field has unspecified keys: ${unknown}",exact:"${path} object contains unknown properties: ${properties}"},LA={min:"${path} field must have at least ${min} items",max:"${path} field must have less than or equal to ${max} items",length:"${path} must have ${length} items"},OA={notType:e=>{const{path:t,value:n,spec:r}=e,i=r.types.length;if(Array.isArray(n)){if(n.length<i)return`${t} tuple value has too few items, expected a length of ${i} but got ${n.length} for value: \`${Zn(n,!0)}\``;if(n.length>i)return`${t} tuple value has too many items, expected a length of ${i} but got ${n.length} for value: \`${Zn(n,!0)}\``}return Ke.formatError(Yt.notType,e)}};Object.assign(Object.create(null),{mixed:Yt,string:et,number:NA,date:Gh,object:al,array:LA,boolean:_A,tuple:OA});const Bp=e=>e&&e.__isYupSchema__;class ql{static fromOptions(t,n){if(!n.then&&!n.otherwise)throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");let{is:r,then:i,otherwise:s}=n,a=typeof r=="function"?r:(...l)=>l.every(c=>c===r);return new ql(t,(l,c)=>{var u;let d=a(...l)?i:s;return(u=d==null?void 0:d(c))!=null?u:c})}constructor(t,n){this.fn=void 0,this.refs=t,this.refs=t,this.fn=n}resolve(t,n){let r=this.refs.map(s=>s.getValue(n==null?void 0:n.value,n==null?void 0:n.parent,n==null?void 0:n.context)),i=this.fn(r,t,n);if(i===void 0||i===t)return t;if(!Bp(i))throw new TypeError("conditions must return a schema object");return i.resolve(n)}}const ka={context:"$",value:"."};class ri{constructor(t,n={}){if(this.key=void 0,this.isContext=void 0,this.isValue=void 0,this.isSibling=void 0,this.path=void 0,this.getter=void 0,this.map=void 0,typeof t!="string")throw new TypeError("ref must be a string, got: "+t);if(this.key=t.trim(),t==="")throw new TypeError("ref must be a non-empty string");this.isContext=this.key[0]===ka.context,this.isValue=this.key[0]===ka.value,this.isSibling=!this.isContext&&!this.isValue;let r=this.isContext?ka.context:this.isValue?ka.value:"";this.path=this.key.slice(r.length),this.getter=this.path&&Hr.getter(this.path,!0),this.map=n.map}getValue(t,n,r){let i=this.isContext?r:this.isValue?t:n;return this.getter&&(i=this.getter(i||{})),this.map&&(i=this.map(i)),i}cast(t,n){return this.getValue(t,n==null?void 0:n.parent,n==null?void 0:n.context)}resolve(){return this}describe(){return{type:"ref",key:this.key}}toString(){return`Ref(${this.key})`}static isRef(t){return t&&t.__isYupRef}}ri.prototype.__isYupRef=!0;const Lr=e=>e==null;function li(e){function t({value:n,path:r="",options:i,originalValue:s,schema:a},l,c){const{name:u,test:d,params:h,message:p,skipAbsent:g}=e;let{parent:x,context:b,abortEarly:S=a.spec.abortEarly,disableStackTrace:m=a.spec.disableStackTrace}=i;const y={value:n,parent:x,context:b};function w(D={}){const W=zb(Object.assign({value:n,originalValue:s,label:a.spec.label,path:D.path||r,spec:a.spec,disableStackTrace:D.disableStackTrace||m},h,D.params),y),ee=new Ke(Ke.formatError(D.message||p,W),n,W.path,D.type||u,W.disableStackTrace);return ee.params=W,ee}const $=S?l:c;let j={path:r,parent:x,type:u,from:i.from,createError:w,resolve(D){return Vb(D,y)},options:i,originalValue:s,schema:a};const k=D=>{Ke.isError(D)?$(D):D?c(null):$(w())},C=D=>{Ke.isError(D)?$(D):l(D)};if(g&&Lr(n))return k(!0);let P;try{var A;if(P=d.call(j,n,j),typeof((A=P)==null?void 0:A.then)=="function"){if(i.sync)throw new Error(`Validation test of type: "${j.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);return Promise.resolve(P).then(k,C)}}catch(D){C(D);return}k(P)}return t.OPTIONS=e,t}function zb(e,t){if(!e)return e;for(const n of Object.keys(e))e[n]=Vb(e[n],t);return e}function Vb(e,t){return ri.isRef(e)?e.getValue(t.value,t.parent,t.context):e}function zA(e,t,n,r=n){let i,s,a;return t?(Hr.forEach(t,(l,c,u)=>{let d=c?l.slice(1,l.length-1):l;e=e.resolve({context:r,parent:i,value:n});let h=e.type==="tuple",p=u?parseInt(d,10):0;if(e.innerType||h){if(h&&!u)throw new Error(`Yup.reach cannot implicitly index into a tuple type. the path part "${a}" must contain an index to the tuple element, e.g. "${a}[0]"`);if(n&&p>=n.length)throw new Error(`Yup.reach cannot resolve an array item at index: ${l}, in the path: ${t}. because there is no value at that index. `);i=n,n=n&&n[p],e=h?e.spec.types[p]:e.innerType}if(!u){if(!e.fields||!e.fields[d])throw new Error(`The schema does not contain the path: ${t}. (failed at: ${a} which is a type: "${e.type}")`);i=n,n=n&&n[d],e=e.fields[d]}s=d,a=c?"["+l+"]":"."+l}),{schema:e,parent:i,parentPath:s}):{parent:i,parentPath:t,schema:e}}class Ql extends Set{describe(){const t=[];for(const n of this.values())t.push(ri.isRef(n)?n.describe():n);return t}resolveAll(t){let n=[];for(const r of this.values())n.push(t(r));return n}clone(){return new Ql(this.values())}merge(t,n){const r=this.clone();return t.forEach(i=>r.add(i)),n.forEach(i=>r.delete(i)),r}}function Li(e,t=new Map){if(Bp(e)||!e||typeof e!="object")return e;if(t.has(e))return t.get(e);let n;if(e instanceof Date)n=new Date(e.getTime()),t.set(e,n);else if(e instanceof RegExp)n=new RegExp(e),t.set(e,n);else if(Array.isArray(e)){n=new Array(e.length),t.set(e,n);for(let r=0;r<e.length;r++)n[r]=Li(e[r],t)}else if(e instanceof Map){n=new Map,t.set(e,n);for(const[r,i]of e.entries())n.set(r,Li(i,t))}else if(e instanceof Set){n=new Set,t.set(e,n);for(const r of e)n.add(Li(r,t))}else if(e instanceof Object){n={},t.set(e,n);for(const[r,i]of Object.entries(e))n[r]=Li(i,t)}else throw Error(`Unable to clone ${e}`);return n}function VA(e){if(!(e!=null&&e.length))return;const t=[];let n="",r=!1,i=!1;for(let s=0;s<e.length;s++){const a=e[s];if(a==="["&&!i){n&&(t.push(...n.split(".").filter(Boolean)),n=""),r=!0;continue}if(a==="]"&&!i){n&&(/^\d+$/.test(n)?t.push(n):t.push(n.replace(/^"|"$/g,"")),n=""),r=!1;continue}if(a==='"'){i=!i;continue}if(a==="."&&!r&&!i){n&&(t.push(n),n="");continue}n+=a}return n&&t.push(...n.split(".").filter(Boolean)),t}function BA(e,t){const n=t?`${t}.${e.path}`:e.path;return e.errors.map(r=>({message:r,path:VA(n)}))}function Bb(e,t){var n;if(!((n=e.inner)!=null&&n.length)&&e.errors.length)return BA(e,t);const r=t?`${t}.${e.path}`:e.path;return e.inner.flatMap(i=>Bb(i,r))}class sn{constructor(t){this.type=void 0,this.deps=[],this.tests=void 0,this.transforms=void 0,this.conditions=[],this._mutate=void 0,this.internalTests={},this._whitelist=new Ql,this._blacklist=new Ql,this.exclusiveTests=Object.create(null),this._typeCheck=void 0,this.spec=void 0,this.tests=[],this.transforms=[],this.withMutation(()=>{this.typeError(Yt.notType)}),this.type=t.type,this._typeCheck=t.check,this.spec=Object.assign({strip:!1,strict:!1,abortEarly:!0,recursive:!0,disableStackTrace:!1,nullable:!1,optional:!0,coerce:!0},t==null?void 0:t.spec),this.withMutation(n=>{n.nonNullable()})}get _type(){return this.type}clone(t){if(this._mutate)return t&&Object.assign(this.spec,t),this;const n=Object.create(Object.getPrototypeOf(this));return n.type=this.type,n._typeCheck=this._typeCheck,n._whitelist=this._whitelist.clone(),n._blacklist=this._blacklist.clone(),n.internalTests=Object.assign({},this.internalTests),n.exclusiveTests=Object.assign({},this.exclusiveTests),n.deps=[...this.deps],n.conditions=[...this.conditions],n.tests=[...this.tests],n.transforms=[...this.transforms],n.spec=Li(Object.assign({},this.spec,t)),n}label(t){let n=this.clone();return n.spec.label=t,n}meta(...t){if(t.length===0)return this.spec.meta;let n=this.clone();return n.spec.meta=Object.assign(n.spec.meta||{},t[0]),n}withMutation(t){let n=this._mutate;this._mutate=!0;let r=t(this);return this._mutate=n,r}concat(t){if(!t||t===this)return this;if(t.type!==this.type&&this.type!=="mixed")throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${t.type}`);let n=this,r=t.clone();const i=Object.assign({},n.spec,r.spec);return r.spec=i,r.internalTests=Object.assign({},n.internalTests,r.internalTests),r._whitelist=n._whitelist.merge(t._whitelist,t._blacklist),r._blacklist=n._blacklist.merge(t._blacklist,t._whitelist),r.tests=n.tests,r.exclusiveTests=n.exclusiveTests,r.withMutation(s=>{t.tests.forEach(a=>{s.test(a.OPTIONS)})}),r.transforms=[...n.transforms,...r.transforms],r}isType(t){return t==null?!!(this.spec.nullable&&t===null||this.spec.optional&&t===void 0):this._typeCheck(t)}resolve(t){let n=this;if(n.conditions.length){let r=n.conditions;n=n.clone(),n.conditions=[],n=r.reduce((i,s)=>s.resolve(i,t),n),n=n.resolve(t)}return n}resolveOptions(t){var n,r,i,s;return Object.assign({},t,{from:t.from||[],strict:(n=t.strict)!=null?n:this.spec.strict,abortEarly:(r=t.abortEarly)!=null?r:this.spec.abortEarly,recursive:(i=t.recursive)!=null?i:this.spec.recursive,disableStackTrace:(s=t.disableStackTrace)!=null?s:this.spec.disableStackTrace})}cast(t,n={}){let r=this.resolve(Object.assign({},n,{value:t})),i=n.assert==="ignore-optionality",s=r._cast(t,n);if(n.assert!==!1&&!r.isType(s)){if(i&&Lr(s))return s;let a=Zn(t),l=Zn(s);throw new TypeError(`The value of ${n.path||"field"} could not be cast to a value that satisfies the schema type: "${r.type}". 

attempted value: ${a} 
`+(l!==a?`result of cast: ${l}`:""))}return s}_cast(t,n){let r=t===void 0?t:this.transforms.reduce((i,s)=>s.call(this,i,t,this,n),t);return r===void 0&&(r=this.getDefault(n)),r}_validate(t,n={},r,i){let{path:s,originalValue:a=t,strict:l=this.spec.strict}=n,c=t;l||(c=this._cast(c,Object.assign({assert:!1},n)));let u=[];for(let d of Object.values(this.internalTests))d&&u.push(d);this.runTests({path:s,value:c,originalValue:a,options:n,tests:u},r,d=>{if(d.length)return i(d,c);this.runTests({path:s,value:c,originalValue:a,options:n,tests:this.tests},r,i)})}runTests(t,n,r){let i=!1,{tests:s,value:a,originalValue:l,path:c,options:u}=t,d=b=>{i||(i=!0,n(b,a))},h=b=>{i||(i=!0,r(b,a))},p=s.length,g=[];if(!p)return h([]);let x={value:a,originalValue:l,path:c,options:u,schema:this};for(let b=0;b<s.length;b++){const S=s[b];S(x,d,function(y){y&&(Array.isArray(y)?g.push(...y):g.push(y)),--p<=0&&h(g)})}}asNestedTest({key:t,index:n,parent:r,parentPath:i,originalParent:s,options:a}){const l=t??n;if(l==null)throw TypeError("Must include `key` or `index` for nested validations");const c=typeof l=="number";let u=r[l];const d=Object.assign({},a,{strict:!0,parent:r,value:u,originalValue:s[l],key:void 0,[c?"index":"key"]:l,path:c||l.includes(".")?`${i||""}[${c?l:`"${l}"`}]`:(i?`${i}.`:"")+t});return(h,p,g)=>this.resolve(d)._validate(u,d,p,g)}validate(t,n){var r;let i=this.resolve(Object.assign({},n,{value:t})),s=(r=n==null?void 0:n.disableStackTrace)!=null?r:i.spec.disableStackTrace;return new Promise((a,l)=>i._validate(t,n,(c,u)=>{Ke.isError(c)&&(c.value=u),l(c)},(c,u)=>{c.length?l(new Ke(c,u,void 0,void 0,s)):a(u)}))}validateSync(t,n){var r;let i=this.resolve(Object.assign({},n,{value:t})),s,a=(r=n==null?void 0:n.disableStackTrace)!=null?r:i.spec.disableStackTrace;return i._validate(t,Object.assign({},n,{sync:!0}),(l,c)=>{throw Ke.isError(l)&&(l.value=c),l},(l,c)=>{if(l.length)throw new Ke(l,t,void 0,void 0,a);s=c}),s}isValid(t,n){return this.validate(t,n).then(()=>!0,r=>{if(Ke.isError(r))return!1;throw r})}isValidSync(t,n){try{return this.validateSync(t,n),!0}catch(r){if(Ke.isError(r))return!1;throw r}}_getDefault(t){let n=this.spec.default;return n==null?n:typeof n=="function"?n.call(this,t):Li(n)}getDefault(t){return this.resolve(t||{})._getDefault(t)}default(t){return arguments.length===0?this._getDefault():this.clone({default:t})}strict(t=!0){return this.clone({strict:t})}nullability(t,n){const r=this.clone({nullable:t});return r.internalTests.nullable=li({message:n,name:"nullable",test(i){return i===null?this.schema.spec.nullable:!0}}),r}optionality(t,n){const r=this.clone({optional:t});return r.internalTests.optionality=li({message:n,name:"optionality",test(i){return i===void 0?this.schema.spec.optional:!0}}),r}optional(){return this.optionality(!0)}defined(t=Yt.defined){return this.optionality(!1,t)}nullable(){return this.nullability(!0)}nonNullable(t=Yt.notNull){return this.nullability(!1,t)}required(t=Yt.required){return this.clone().withMutation(n=>n.nonNullable(t).defined(t))}notRequired(){return this.clone().withMutation(t=>t.nullable().optional())}transform(t){let n=this.clone();return n.transforms.push(t),n}test(...t){let n;if(t.length===1?typeof t[0]=="function"?n={test:t[0]}:n=t[0]:t.length===2?n={name:t[0],test:t[1]}:n={name:t[0],message:t[1],test:t[2]},n.message===void 0&&(n.message=Yt.default),typeof n.test!="function")throw new TypeError("`test` is a required parameters");let r=this.clone(),i=li(n),s=n.exclusive||n.name&&r.exclusiveTests[n.name]===!0;if(n.exclusive&&!n.name)throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");return n.name&&(r.exclusiveTests[n.name]=!!n.exclusive),r.tests=r.tests.filter(a=>!(a.OPTIONS.name===n.name&&(s||a.OPTIONS.test===i.OPTIONS.test))),r.tests.push(i),r}when(t,n){!Array.isArray(t)&&typeof t!="string"&&(n=t,t=".");let r=this.clone(),i=Nb(t).map(s=>new ri(s));return i.forEach(s=>{s.isSibling&&r.deps.push(s.key)}),r.conditions.push(typeof n=="function"?new ql(i,n):ql.fromOptions(i,n)),r}typeError(t){let n=this.clone();return n.internalTests.typeError=li({message:t,name:"typeError",skipAbsent:!0,test(r){return this.schema._typeCheck(r)?!0:this.createError({params:{type:this.schema.type}})}}),n}oneOf(t,n=Yt.oneOf){let r=this.clone();return t.forEach(i=>{r._whitelist.add(i),r._blacklist.delete(i)}),r.internalTests.whiteList=li({message:n,name:"oneOf",skipAbsent:!0,test(i){let s=this.schema._whitelist,a=s.resolveAll(this.resolve);return a.includes(i)?!0:this.createError({params:{values:Array.from(s).join(", "),resolved:a}})}}),r}notOneOf(t,n=Yt.notOneOf){let r=this.clone();return t.forEach(i=>{r._blacklist.add(i),r._whitelist.delete(i)}),r.internalTests.blacklist=li({message:n,name:"notOneOf",test(i){let s=this.schema._blacklist,a=s.resolveAll(this.resolve);return a.includes(i)?this.createError({params:{values:Array.from(s).join(", "),resolved:a}}):!0}}),r}strip(t=!0){let n=this.clone();return n.spec.strip=t,n}describe(t){const n=(t?this.resolve(t):this).clone(),{label:r,meta:i,optional:s,nullable:a}=n.spec;return{meta:i,label:r,optional:s,nullable:a,default:n.getDefault(t),type:n.type,oneOf:n._whitelist.describe(),notOneOf:n._blacklist.describe(),tests:n.tests.filter((c,u,d)=>d.findIndex(h=>h.OPTIONS.name===c.OPTIONS.name)===u).map(c=>{const u=c.OPTIONS.params&&t?zb(Object.assign({},c.OPTIONS.params),t):c.OPTIONS.params;return{name:c.OPTIONS.name,params:u}})}}get"~standard"(){const t=this;return{version:1,vendor:"yup",async validate(r){try{return{value:await t.validate(r,{abortEarly:!1})}}catch(i){if(i instanceof Ke)return{issues:Bb(i)};throw i}}}}}sn.prototype.__isYupSchema__=!0;for(const e of["validate","validateSync"])sn.prototype[`${e}At`]=function(t,n,r={}){const{parent:i,parentPath:s,schema:a}=zA(this,t,n,r.context);return a[e](i&&i[s],Object.assign({},r,{parent:i,path:t}))};for(const e of["equals","is"])sn.prototype[e]=sn.prototype.oneOf;for(const e of["not","nope"])sn.prototype[e]=sn.prototype.notOneOf;const HA=/^(\d{4}|[+-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,.](\d{1,}))?)?(?:(Z)|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;function UA(e){const t=Kh(e);if(!t)return Date.parse?Date.parse(e):Number.NaN;if(t.z===void 0&&t.plusMinus===void 0)return new Date(t.year,t.month,t.day,t.hour,t.minute,t.second,t.millisecond).valueOf();let n=0;return t.z!=="Z"&&t.plusMinus!==void 0&&(n=t.hourOffset*60+t.minuteOffset,t.plusMinus==="+"&&(n=0-n)),Date.UTC(t.year,t.month,t.day,t.hour,t.minute+n,t.second,t.millisecond)}function Kh(e){var t,n;const r=HA.exec(e);return r?{year:an(r[1]),month:an(r[2],1)-1,day:an(r[3],1),hour:an(r[4]),minute:an(r[5]),second:an(r[6]),millisecond:r[7]?an(r[7].substring(0,3)):0,precision:(t=(n=r[7])==null?void 0:n.length)!=null?t:void 0,z:r[8]||void 0,plusMinus:r[9]||void 0,hourOffset:an(r[10]),minuteOffset:an(r[11])}:null}function an(e,t=0){return Number(e)||t}let WA=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,GA=/^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,KA=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,YA="^\\d{4}-\\d{2}-\\d{2}",qA="\\d{2}:\\d{2}:\\d{2}",QA="(([+-]\\d{2}(:?\\d{2})?)|Z)",XA=new RegExp(`${YA}T${qA}(\\.\\d+)?${QA}$`),ZA=e=>Lr(e)||e===e.trim(),JA={}.toString();function cn(){return new Hb}class Hb extends sn{constructor(){super({type:"string",check(t){return t instanceof String&&(t=t.valueOf()),typeof t=="string"}}),this.withMutation(()=>{this.transform((t,n)=>{if(!this.spec.coerce||this.isType(t)||Array.isArray(t))return t;const r=t!=null&&t.toString?t.toString():t;return r===JA?t:r})})}required(t){return super.required(t).withMutation(n=>n.test({message:t||Yt.required,name:"required",skipAbsent:!0,test:r=>!!r.length}))}notRequired(){return super.notRequired().withMutation(t=>(t.tests=t.tests.filter(n=>n.OPTIONS.name!=="required"),t))}length(t,n=et.length){return this.test({message:n,name:"length",exclusive:!0,params:{length:t},skipAbsent:!0,test(r){return r.length===this.resolve(t)}})}min(t,n=et.min){return this.test({message:n,name:"min",exclusive:!0,params:{min:t},skipAbsent:!0,test(r){return r.length>=this.resolve(t)}})}max(t,n=et.max){return this.test({name:"max",exclusive:!0,message:n,params:{max:t},skipAbsent:!0,test(r){return r.length<=this.resolve(t)}})}matches(t,n){let r=!1,i,s;return n&&(typeof n=="object"?{excludeEmptyString:r=!1,message:i,name:s}=n:i=n),this.test({name:s||"matches",message:i||et.matches,params:{regex:t},skipAbsent:!0,test:a=>a===""&&r||a.search(t)!==-1})}email(t=et.email){return this.matches(WA,{name:"email",message:t,excludeEmptyString:!0})}url(t=et.url){return this.matches(GA,{name:"url",message:t,excludeEmptyString:!0})}uuid(t=et.uuid){return this.matches(KA,{name:"uuid",message:t,excludeEmptyString:!1})}datetime(t){let n="",r,i;return t&&(typeof t=="object"?{message:n="",allowOffset:r=!1,precision:i=void 0}=t:n=t),this.matches(XA,{name:"datetime",message:n||et.datetime,excludeEmptyString:!0}).test({name:"datetime_offset",message:n||et.datetime_offset,params:{allowOffset:r},skipAbsent:!0,test:s=>{if(!s||r)return!0;const a=Kh(s);return a?!!a.z:!1}}).test({name:"datetime_precision",message:n||et.datetime_precision,params:{precision:i},skipAbsent:!0,test:s=>{if(!s||i==null)return!0;const a=Kh(s);return a?a.precision===i:!1}})}ensure(){return this.default("").transform(t=>t===null?"":t)}trim(t=et.trim){return this.transform(n=>n!=null?n.trim():n).test({message:t,name:"trim",test:ZA})}lowercase(t=et.lowercase){return this.transform(n=>Lr(n)?n:n.toLowerCase()).test({message:t,name:"string_case",exclusive:!0,skipAbsent:!0,test:n=>Lr(n)||n===n.toLowerCase()})}uppercase(t=et.uppercase){return this.transform(n=>Lr(n)?n:n.toUpperCase()).test({message:t,name:"string_case",exclusive:!0,skipAbsent:!0,test:n=>Lr(n)||n===n.toUpperCase()})}}cn.prototype=Hb.prototype;let e4=new Date(""),t4=e=>Object.prototype.toString.call(e)==="[object Date]";class Hp extends sn{constructor(){super({type:"date",check(t){return t4(t)&&!isNaN(t.getTime())}}),this.withMutation(()=>{this.transform((t,n)=>!this.spec.coerce||this.isType(t)||t===null?t:(t=UA(t),isNaN(t)?Hp.INVALID_DATE:new Date(t)))})}prepareParam(t,n){let r;if(ri.isRef(t))r=t;else{let i=this.cast(t);if(!this._typeCheck(i))throw new TypeError(`\`${n}\` must be a Date or a value that can be \`cast()\` to a Date`);r=i}return r}min(t,n=Gh.min){let r=this.prepareParam(t,"min");return this.test({message:n,name:"min",exclusive:!0,params:{min:t},skipAbsent:!0,test(i){return i>=this.resolve(r)}})}max(t,n=Gh.max){let r=this.prepareParam(t,"max");return this.test({message:n,name:"max",exclusive:!0,params:{max:t},skipAbsent:!0,test(i){return i<=this.resolve(r)}})}}Hp.INVALID_DATE=e4;function n4(e,t=[]){let n=[],r=new Set,i=new Set(t.map(([a,l])=>`${a}-${l}`));function s(a,l){let c=Hr.split(a)[0];r.add(c),i.has(`${l}-${c}`)||n.push([l,c])}for(const a of Object.keys(e)){let l=e[a];r.add(a),ri.isRef(l)&&l.isSibling?s(l.path,a):Bp(l)&&"deps"in l&&l.deps.forEach(c=>s(c,a))}return EA.array(Array.from(r),n).reverse()}function ex(e,t){let n=1/0;return e.some((r,i)=>{var s;if((s=t.path)!=null&&s.includes(r))return n=i,!0}),n}function Ub(e){return(t,n)=>ex(e,t)-ex(e,n)}const r4=(e,t,n)=>{if(typeof e!="string")return e;let r=e;try{r=JSON.parse(e)}catch{}return n.isType(r)?r:e};function ll(e){if("fields"in e){const t={};for(const[n,r]of Object.entries(e.fields))t[n]=ll(r);return e.setFields(t)}if(e.type==="array"){const t=e.optional();return t.innerType&&(t.innerType=ll(t.innerType)),t}return e.type==="tuple"?e.optional().clone({types:e.spec.types.map(ll)}):"optional"in e?e.optional():e}const i4=(e,t)=>{const n=[...Hr.normalizePath(t)];if(n.length===1)return n[0]in e;let r=n.pop(),i=Hr.getter(Hr.join(n),!0)(e);return!!(i&&r in i)};let tx=e=>Object.prototype.toString.call(e)==="[object Object]";function nx(e,t){let n=Object.keys(e.fields);return Object.keys(t).filter(r=>n.indexOf(r)===-1)}const s4=Ub([]);function Wb(e){return new Gb(e)}class Gb extends sn{constructor(t){super({type:"object",check(n){return tx(n)||typeof n=="function"}}),this.fields=Object.create(null),this._sortErrors=s4,this._nodes=[],this._excludedEdges=[],this.withMutation(()=>{t&&this.shape(t)})}_cast(t,n={}){var r;let i=super._cast(t,n);if(i===void 0)return this.getDefault(n);if(!this._typeCheck(i))return i;let s=this.fields,a=(r=n.stripUnknown)!=null?r:this.spec.noUnknown,l=[].concat(this._nodes,Object.keys(i).filter(h=>!this._nodes.includes(h))),c={},u=Object.assign({},n,{parent:c,__validating:n.__validating||!1}),d=!1;for(const h of l){let p=s[h],g=h in i,x=i[h];if(p){let b;u.path=(n.path?`${n.path}.`:"")+h,p=p.resolve({value:x,context:n.context,parent:c});let S=p instanceof sn?p.spec:void 0,m=S==null?void 0:S.strict;if(S!=null&&S.strip){d=d||h in i;continue}b=!n.__validating||!m?p.cast(x,u):x,b!==void 0&&(c[h]=b)}else g&&!a&&(c[h]=x);(g!==h in c||c[h]!==x)&&(d=!0)}return d?c:i}_validate(t,n={},r,i){let{from:s=[],originalValue:a=t,recursive:l=this.spec.recursive}=n;n.from=[{schema:this,value:a},...s],n.__validating=!0,n.originalValue=a,super._validate(t,n,r,(c,u)=>{if(!l||!tx(u)){i(c,u);return}a=a||u;let d=[];for(let h of this._nodes){let p=this.fields[h];!p||ri.isRef(p)||d.push(p.asNestedTest({options:n,key:h,parent:u,parentPath:n.path,originalParent:a}))}this.runTests({tests:d,value:u,originalValue:a,options:n},r,h=>{i(h.sort(this._sortErrors).concat(c),u)})})}clone(t){const n=super.clone(t);return n.fields=Object.assign({},this.fields),n._nodes=this._nodes,n._excludedEdges=this._excludedEdges,n._sortErrors=this._sortErrors,n}concat(t){let n=super.concat(t),r=n.fields;for(let[i,s]of Object.entries(this.fields)){const a=r[i];r[i]=a===void 0?s:a}return n.withMutation(i=>i.setFields(r,[...this._excludedEdges,...t._excludedEdges]))}_getDefault(t){if("default"in this.spec)return super._getDefault(t);if(!this._nodes.length)return;let n={};return this._nodes.forEach(r=>{var i;const s=this.fields[r];let a=t;(i=a)!=null&&i.value&&(a=Object.assign({},a,{parent:a.value,value:a.value[r]})),n[r]=s&&"getDefault"in s?s.getDefault(a):void 0}),n}setFields(t,n){let r=this.clone();return r.fields=t,r._nodes=n4(t,n),r._sortErrors=Ub(Object.keys(t)),n&&(r._excludedEdges=n),r}shape(t,n=[]){return this.clone().withMutation(r=>{let i=r._excludedEdges;return n.length&&(Array.isArray(n[0])||(n=[n]),i=[...r._excludedEdges,...n]),r.setFields(Object.assign(r.fields,t),i)})}partial(){const t={};for(const[n,r]of Object.entries(this.fields))t[n]="optional"in r&&r.optional instanceof Function?r.optional():r;return this.setFields(t)}deepPartial(){return ll(this)}pick(t){const n={};for(const r of t)this.fields[r]&&(n[r]=this.fields[r]);return this.setFields(n,this._excludedEdges.filter(([r,i])=>t.includes(r)&&t.includes(i)))}omit(t){const n=[];for(const r of Object.keys(this.fields))t.includes(r)||n.push(r);return this.pick(n)}from(t,n,r){let i=Hr.getter(t,!0);return this.transform(s=>{if(!s)return s;let a=s;return i4(s,t)&&(a=Object.assign({},s),r||delete a[t],a[n]=i(s)),a})}json(){return this.transform(r4)}exact(t){return this.test({name:"exact",exclusive:!0,message:t||al.exact,test(n){if(n==null)return!0;const r=nx(this.schema,n);return r.length===0||this.createError({params:{properties:r.join(", ")}})}})}stripUnknown(){return this.clone({noUnknown:!0})}noUnknown(t=!0,n=al.noUnknown){typeof t!="boolean"&&(n=t,t=!0);let r=this.test({name:"noUnknown",exclusive:!0,message:n,test(i){if(i==null)return!0;const s=nx(this.schema,i);return!t||s.length===0||this.createError({params:{unknown:s.join(", ")}})}});return r.spec.noUnknown=t,r}unknown(t=!0,n=al.noUnknown){return this.noUnknown(!t,n)}transformKeys(t){return this.transform(n=>{if(!n)return n;const r={};for(const i of Object.keys(n))r[t(i)]=n[i];return r})}camelCase(){return this.transformKeys(Iu.camelCase)}snakeCase(){return this.transformKeys(Iu.snakeCase)}constantCase(){return this.transformKeys(t=>Iu.snakeCase(t).toUpperCase())}describe(t){const n=(t?this.resolve(t):this).clone(),r=super.describe(t);r.fields={};for(const[s,a]of Object.entries(n.fields)){var i;let l=t;(i=l)!=null&&i.value&&(l=Object.assign({},l,{parent:l.value,value:l.value[s]})),r.fields[s]=a.describe(l)}return r}}Wb.prototype=Gb.prototype;const o4=Wb({name:cn().required("Họ tên là bắt buộc").min(2,"Họ tên phải có ít nhất 2 ký tự").max(50,"Họ tên không được quá 50 ký tự").matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐẢẠẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăâđảạầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỢỤỦỨỪễệỉịọỏốồổỗộớờởợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/,"Họ tên chỉ được chứa chữ cái và khoảng trắng"),email:cn().optional().test("email-format","Email không hợp lệ",function(e){return e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e):!0}),phone:cn().required("Số điện thoại là bắt buộc").matches(/^(0|\+84)[0-9]{9,10}$/,"Số điện thoại không hợp lệ (VD: 0123456789 hoặc +84123456789)"),street:cn().required("Địa chỉ đường/phố là bắt buộc").min(5,"Địa chỉ phải có ít nhất 5 ký tự").max(100,"Địa chỉ không được quá 100 ký tự"),district:cn().required("Quận/huyện là bắt buộc").min(2,"Tên quận/huyện phải có ít nhất 2 ký tự").max(50,"Tên quận/huyện không được quá 50 ký tự"),city:cn().required("Thành phố/tỉnh là bắt buộc").min(2,"Tên thành phố/tỉnh phải có ít nhất 2 ký tự").max(50,"Tên thành phố/tỉnh không được quá 50 ký tự"),note:cn().optional().max(200,"Ghi chú không được quá 200 ký tự"),payment:cn().oneOf(["visa","momo","zalopay","cod","vnpay"],"Phương thức thanh toán không hợp lệ").required("Vui lòng chọn phương thức thanh toán")}),a4=f.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`,l4=f(O.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`,c4=f.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`,Fu=f.div`
  margin-bottom: 32px;
`,Nu=f.h3`
  margin: 0 0 20px 0;
  color: var(--text);
  font-size: 20px;
  font-weight: 600;
  border-bottom: 2px solid var(--border);
  padding-bottom: 8px;
`,hr=f.div`
  margin-bottom: 20px;
`,fr=f.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
`,pr=f.input`
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
`,gr=f(O.div)`
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
`,u4=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,rx=f(O.div)`
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
`,ix=f.div`
  font-size: 24px;
  margin-bottom: 8px;
`,sx=f.div`
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
`,ox=f.div`
  font-size: 12px;
  color: var(--secondaryText);
`,d4=f.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`,Ts=f.div`
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
`,h4=f(O.button)`
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
`,f4=f(O.div)`
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
`,p4=f(O.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  max-width: 400px;
  margin: 20px;
`,g4=f(O.div)`
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  margin: 0 auto 20px;
`,m4=f.div`
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
`,x4=()=>{const{user:e}=Ze(),{addOrder:t,getOrdersByPhone:n}=ti(),{items:r,clear:i,subtotal:s}=Wo(),a=wt(),[l,c]=v.useState({name:(e==null?void 0:e.name)||"",phone:(e==null?void 0:e.phone)||"",email:"",street:"",district:"",city:"",note:"",payment:"cod"}),[u,d]=v.useState({}),[h,p]=v.useState(!1),[g,x]=v.useState(!1),b=25e3,S=s*.08,m=s+S+b,y=j=>{const{name:k,value:C}=j.target;c(T=>({...T,[k]:C})),u[k]&&d(T=>({...T,[k]:""}))},w=async()=>{try{return await o4.validate(l,{abortEarly:!1}),d({}),!0}catch(j){const k={};return j.inner.forEach(C=>{k[C.path]=C.message}),d(k),!1}},$=async j=>{if(j.preventDefault(),!await w()){L.error("Vui lòng kiểm tra lại thông tin!");return}if(r.length===0){L.error("Giỏ hàng trống!");return}if(n(l.phone).filter(T=>T.status==="Processing"||T.status==="Delivering").length>=2){L.error("Bạn đã đặt nhiều hơn số đơn hàng quy định! Chờ một xíu nhé!");return}p(!0);try{if(l.payment==="vnpay"){x(!0);const T=await lA();if(T.success){const P=Date.now().toString();t({id:P,name:l.name,phone:l.phone,address:`${l.street}, ${l.district}, ${l.city}`,items:r.map(A=>({name:A.name,qty:A.qty,price:A.price})),total:m,status:"Processing",paymentMethod:"vnpay",paymentStatus:"completed",vnpayTransactionId:T.transactionId,dronePath:["Nhà hàng","Kho Drone","Đang giao","Hoàn tất"]}),i(),L.success("Thanh toán VNPay thành công!"),a("/orders")}else L.error(T.message)}else{const T=Date.now().toString();t({id:T,name:l.name,phone:l.phone,address:`${l.street}, ${l.district}, ${l.city}`,items:r.map(P=>({name:P.name,qty:P.qty,price:P.price})),total:m,status:"Processing",paymentMethod:l.payment,paymentStatus:l.payment==="cod"?"Đang chờ phê duyệt":"completed",dronePath:["Nhà hàng","Kho Drone","Đang giao","Hoàn tất"]}),i(),L.success("Bạn đã đặt hàng thành công!"),a("/orders")}}catch{L.error("Có lỗi xảy ra khi đặt hàng!")}finally{p(!1),x(!1)}};return o.jsxs(a4,{children:[o.jsxs(l4,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[o.jsx(c4,{children:"Thông tin thanh toán"}),o.jsxs("form",{onSubmit:$,children:[o.jsxs(Fu,{children:[o.jsx(Nu,{children:"Thông tin khách hàng"}),o.jsxs(hr,{children:[o.jsx(fr,{children:"Họ tên *"}),o.jsx(pr,{name:"name",value:l.name,onChange:y,placeholder:"Nhập họ tên của bạn",hasError:!!u.name}),o.jsx(tt,{children:u.name&&o.jsx(gr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.name})})]}),o.jsxs(hr,{children:[o.jsx(fr,{children:"Số điện thoại *"}),o.jsx(pr,{name:"phone",value:l.phone,onChange:y,placeholder:"Nhập số điện thoại",type:"tel",hasError:!!u.phone}),o.jsx(tt,{children:u.phone&&o.jsx(gr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.phone})})]}),o.jsxs(hr,{children:[o.jsx(fr,{children:"Email"}),o.jsx(pr,{name:"email",value:l.email,onChange:y,placeholder:"Nhập email (tùy chọn)",type:"email",hasError:!!u.email}),o.jsx(tt,{children:u.email&&o.jsx(gr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.email})})]}),o.jsxs(hr,{children:[o.jsx(fr,{children:"Địa chỉ đường/phố *"}),o.jsx(pr,{name:"street",value:l.street,onChange:y,placeholder:"Nhập địa chỉ đường/phố",hasError:!!u.street}),o.jsx(tt,{children:u.street&&o.jsx(gr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.street})})]}),o.jsxs(hr,{children:[o.jsx(fr,{children:"Quận/huyện *"}),o.jsx(pr,{name:"district",value:l.district,onChange:y,placeholder:"Nhập quận/huyện",hasError:!!u.district}),o.jsx(tt,{children:u.district&&o.jsx(gr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.district})})]}),o.jsxs(hr,{children:[o.jsx(fr,{children:"Thành phố/tỉnh *"}),o.jsx(pr,{name:"city",value:l.city,onChange:y,placeholder:"Nhập thành phố/tỉnh",hasError:!!u.city}),o.jsx(tt,{children:u.city&&o.jsx(gr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.city})})]}),o.jsxs(hr,{children:[o.jsx(fr,{children:"Ghi chú"}),o.jsx(pr,{name:"note",value:l.note,onChange:y,placeholder:"Nhập ghi chú (tùy chọn)",as:"textarea",rows:3,hasError:!!u.note}),o.jsx(tt,{children:u.note&&o.jsx(gr,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:u.note})})]})]}),o.jsxs(Fu,{children:[o.jsx(Nu,{children:"Phương thức thanh toán"}),o.jsxs(u4,{children:[o.jsxs(rx,{isSelected:l.payment==="cod",onClick:()=>c(j=>({...j,payment:"cod"})),whileHover:{scale:1.02},whileTap:{scale:.98},children:[o.jsx(ix,{children:"💵"}),o.jsx(sx,{children:"Thanh toán khi nhận hàng"}),o.jsx(ox,{children:"Trả tiền mặt khi giao hàng"})]}),o.jsxs(rx,{isSelected:l.payment==="vnpay",onClick:()=>c(j=>({...j,payment:"vnpay"})),whileHover:{scale:1.02},whileTap:{scale:.98},children:[o.jsx(ix,{children:"🏦"}),o.jsx(sx,{children:"VNPay"}),o.jsx(ox,{children:"Thanh toán online qua VNPay"})]})]})]}),o.jsxs(Fu,{children:[o.jsx(Nu,{children:"Tóm tắt đơn hàng"}),o.jsxs(d4,{children:[r.map(j=>o.jsxs(Ts,{children:[o.jsxs("span",{children:[j.name," x ",j.qty]}),o.jsx("span",{children:q(j.price*j.qty)})]},j.id)),o.jsxs(Ts,{children:[o.jsx("span",{children:"Tạm tính"}),o.jsx("span",{children:q(s)})]}),o.jsxs(Ts,{children:[o.jsx("span",{children:"Phí giao hàng"}),o.jsx("span",{children:q(b)})]}),o.jsxs(Ts,{children:[o.jsx("span",{children:"Thuế (8%)"}),o.jsx("span",{children:q(S)})]}),o.jsxs(Ts,{children:[o.jsx("span",{children:"Tổng cộng"}),o.jsx("span",{children:q(m)})]})]})]}),o.jsx(h4,{type:"submit",disabled:h||r.length===0,whileHover:{scale:h?1:1.02},whileTap:{scale:h?1:.98},children:h?"Đang xử lý...":"Đặt hàng"})]})]}),o.jsx(tt,{children:g&&o.jsx(f4,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:o.jsxs(p4,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},children:[o.jsx(g4,{animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),o.jsx("h3",{children:"Đang chuyển hướng đến VNPay..."}),o.jsx("p",{children:"Vui lòng chờ trong giây lát"}),o.jsxs(m4,{children:["VNPay QR Code",o.jsx("br",{}),"(Demo Mode)"]})]})})})]})},ax=f.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`,lx=f(O.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  text-align: center;
  width: 100%;
`,Kb=f(O.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`,y4=f(Kb)`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
`,v4=f(Kb)`
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
`,_u=f.h2`
  margin: 0 0 16px 0;
  color: var(--text);
  font-size: 24px;
  font-weight: 700;
`,Ca=f.p`
  color: var(--secondaryText);
  margin: 0 0 24px 0;
  line-height: 1.6;
`,w4=f(O.button)`
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
`,b4=f(O.div)`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  margin: 0 auto 24px;
`,j4=()=>{const[e]=qC(),t=wt(),{updateOrderPaymentStatus:n}=ti(),[r,i]=v.useState(!0),[s,a]=v.useState(null);v.useEffect(()=>{(async()=>{try{await new Promise(d=>setTimeout(d,2e3));const u=cA(e);u.isValid?(a({success:!0,message:"Thanh toán VNPay thành công! Đơn hàng của bạn đã được xác nhận.",transactionId:u.transactionId}),u.transactionId&&u.orderId&&n(u.orderId,"completed",u.transactionId),L.success("Thanh toán thành công!")):(a({success:!1,message:"Thanh toán thất bại. Vui lòng thử lại hoặc chọn phương thức thanh toán khác."}),L.error("Thanh toán thất bại!"))}catch{a({success:!1,message:"Có lỗi xảy ra khi xử lý thanh toán. Vui lòng liên hệ hỗ trợ."}),L.error("Có lỗi xảy ra!")}finally{i(!1)}})()},[e,n]);const l=()=>{s!=null&&s.success?t("/orders"):t("/checkout")};return r?o.jsx(ax,{children:o.jsxs(lx,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},children:[o.jsx(b4,{animate:{rotate:360},transition:{duration:1,repeat:1/0,ease:"linear"}}),o.jsx(_u,{children:"Đang xử lý thanh toán..."}),o.jsx(Ca,{children:"Vui lòng chờ trong giây lát"})]})}):o.jsx(ax,{children:o.jsxs(lx,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[s!=null&&s.success?o.jsxs(o.Fragment,{children:[o.jsx(y4,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},children:"✓"}),o.jsx(_u,{children:"Thanh toán thành công!"}),o.jsx(Ca,{children:s.message}),s.transactionId&&o.jsxs(Ca,{children:[o.jsx("strong",{children:"Mã giao dịch:"})," ",s.transactionId]})]}):o.jsxs(o.Fragment,{children:[o.jsx(v4,{initial:{scale:0},animate:{scale:1},transition:{delay:.2,type:"spring",stiffness:200},children:"✗"}),o.jsx(_u,{children:"Thanh toán thất bại"}),o.jsx(Ca,{children:s==null?void 0:s.message})]}),o.jsx(w4,{onClick:l,whileHover:{scale:1.05},whileTap:{scale:.95},children:s!=null&&s.success?"Xem đơn hàng":"Thử lại"})]})})},S4=f.footer`
  margin-top: 40px;
  padding: 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
  text-align: center;
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`,k4=f.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
`,Lu=f.a`
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
`,C4=()=>o.jsxs(S4,{children:["©2025 Food Fast Drone Delivery | Designed by Your Name 🚀",o.jsxs(k4,{children:[o.jsx(Lu,{href:"#","aria-label":"Facebook",children:"📘"}),o.jsx(Lu,{href:"#","aria-label":"Instagram",children:"📷"}),o.jsx(Lu,{href:"#","aria-label":"Twitter",children:"🐦"})]})]}),$4=f.header`
  position: sticky; 
  top: 0; 
  z-index: 20;
  background: var(--card);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);
`,T4=f.div`
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  padding: 12px 24px; 
  max-width: 1200px; 
  margin: 0 auto;
`,E4=f(jc)`
  font-weight: 800; 
  color: var(--primary);
  font-size: 20px;
`,P4=f.nav`
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
`,Rr=f(jc)`
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
`,A4=f(Rr)`
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
`,D4=f.button`
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
`,cx=f.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,R4=f.button`
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
`,M4=f.button`
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
`,I4=()=>{const{items:e}=Wo(),{user:t,logout:n,isAdmin:r,isRestaurant:i,isCustomer:s}=Ze(),a=v.useMemo(()=>e.reduce((d,h)=>d+h.qty,0),[e]),[l,c]=v.useState(!1),u=()=>{n(),L.success("👋 Đã đăng xuất thành công!")};return o.jsx($4,{children:o.jsxs(T4,{children:[o.jsx(E4,{to:"/menu",children:"FoodFast"}),o.jsx(D4,{"aria-label":"menu",onClick:()=>c(d=>!d),children:l?"✕":"☰"}),o.jsxs(P4,{open:l,children:[o.jsx(Rr,{to:"/menu",title:"Xem thực đơn",children:"Thực đơn"}),t&&s()&&o.jsxs(o.Fragment,{children:[o.jsx(A4,{to:"/cart",title:"Xem giỏ hàng","data-count":a,children:"Giỏ hàng"}),o.jsx(Rr,{to:"/checkout",title:"Thanh toán",children:"Thanh toán"})]}),t&&o.jsx(Rr,{to:"/orders",title:"Theo dõi đơn hàng & Drone",children:"Theo dõi đơn hàng"}),t&&r()&&o.jsx(Rr,{to:"/admin",title:"Bảng điều khiển quản trị",children:"Quản trị"}),t&&i()&&o.jsxs(o.Fragment,{children:[o.jsx(Rr,{to:"/restaurant",title:"Bảng điều khiển nhà hàng",children:"Nhà hàng"}),t.restaurantId==="rest_2"&&o.jsx(Rr,{to:"/sweetdreams",title:"SweetDreams Bakery",children:"SweetDreams"})]}),t?o.jsxs(cx,{children:[o.jsxs("span",{style:{color:"var(--text)",fontSize:"14px"},children:["Xin chào, ",t==null?void 0:t.name,"! (",r()?"Quản trị viên":i()?"Nhà hàng":"Khách hàng",")"]}),o.jsx(M4,{onClick:u,children:"Đăng xuất"})]}):o.jsx(cx,{children:o.jsx(R4,{as:jc,to:"/login",children:"Đăng nhập"})})]})]})})};var Yb={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(ij,function(){var n=1e3,r=6e4,i=36e5,s="millisecond",a="second",l="minute",c="hour",u="day",d="week",h="month",p="quarter",g="year",x="date",b="Invalid Date",S=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(z){var _=["th","st","nd","rd"],N=z%100;return"["+z+(_[(N-20)%10]||_[N]||_[0])+"]"}},w=function(z,_,N){var M=String(z);return!M||M.length>=_?z:""+Array(_+1-M.length).join(N)+z},$={s:w,z:function(z){var _=-z.utcOffset(),N=Math.abs(_),M=Math.floor(N/60),E=N%60;return(_<=0?"+":"-")+w(M,2,"0")+":"+w(E,2,"0")},m:function z(_,N){if(_.date()<N.date())return-z(N,_);var M=12*(N.year()-_.year())+(N.month()-_.month()),E=_.clone().add(M,h),R=N-E<0,F=_.clone().add(M+(R?-1:1),h);return+(-(M+(N-E)/(R?E-F:F-E))||0)},a:function(z){return z<0?Math.ceil(z)||0:Math.floor(z)},p:function(z){return{M:h,y:g,w:d,d:u,D:x,h:c,m:l,s:a,ms:s,Q:p}[z]||String(z||"").toLowerCase().replace(/s$/,"")},u:function(z){return z===void 0}},j="en",k={};k[j]=y;var C="$isDayjsObject",T=function(z){return z instanceof W||!(!z||!z[C])},P=function z(_,N,M){var E;if(!_)return j;if(typeof _=="string"){var R=_.toLowerCase();k[R]&&(E=R),N&&(k[R]=N,E=R);var F=_.split("-");if(!E&&F.length>1)return z(F[0])}else{var B=_.name;k[B]=_,E=B}return!M&&E&&(j=E),E||!M&&j},A=function(z,_){if(T(z))return z.clone();var N=typeof _=="object"?_:{};return N.date=z,N.args=arguments,new W(N)},D=$;D.l=P,D.i=T,D.w=function(z,_){return A(z,{locale:_.$L,utc:_.$u,x:_.$x,$offset:_.$offset})};var W=function(){function z(N){this.$L=P(N.locale,null,!0),this.parse(N),this.$x=this.$x||N.x||{},this[C]=!0}var _=z.prototype;return _.parse=function(N){this.$d=function(M){var E=M.date,R=M.utc;if(E===null)return new Date(NaN);if(D.u(E))return new Date;if(E instanceof Date)return new Date(E);if(typeof E=="string"&&!/Z$/i.test(E)){var F=E.match(S);if(F){var B=F[2]-1||0,U=(F[7]||"0").substring(0,3);return R?new Date(Date.UTC(F[1],B,F[3]||1,F[4]||0,F[5]||0,F[6]||0,U)):new Date(F[1],B,F[3]||1,F[4]||0,F[5]||0,F[6]||0,U)}}return new Date(E)}(N),this.init()},_.init=function(){var N=this.$d;this.$y=N.getFullYear(),this.$M=N.getMonth(),this.$D=N.getDate(),this.$W=N.getDay(),this.$H=N.getHours(),this.$m=N.getMinutes(),this.$s=N.getSeconds(),this.$ms=N.getMilliseconds()},_.$utils=function(){return D},_.isValid=function(){return this.$d.toString()!==b},_.isSame=function(N,M){var E=A(N);return this.startOf(M)<=E&&E<=this.endOf(M)},_.isAfter=function(N,M){return A(N)<this.startOf(M)},_.isBefore=function(N,M){return this.endOf(M)<A(N)},_.$g=function(N,M,E){return D.u(N)?this[M]:this.set(E,N)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(N,M){var E=this,R=!!D.u(M)||M,F=D.p(N),B=function(We,Ee){var ct=D.w(E.$u?Date.UTC(E.$y,Ee,We):new Date(E.$y,Ee,We),E);return R?ct:ct.endOf(u)},U=function(We,Ee){return D.w(E.toDate()[We].apply(E.toDate("s"),(R?[0,0,0,0]:[23,59,59,999]).slice(Ee)),E)},te=this.$W,J=this.$M,ge=this.$D,ve="set"+(this.$u?"UTC":"");switch(F){case g:return R?B(1,0):B(31,11);case h:return R?B(1,J):B(0,J+1);case d:var Me=this.$locale().weekStart||0,Rt=(te<Me?te+7:te)-Me;return B(R?ge-Rt:ge+(6-Rt),J);case u:case x:return U(ve+"Hours",0);case c:return U(ve+"Minutes",1);case l:return U(ve+"Seconds",2);case a:return U(ve+"Milliseconds",3);default:return this.clone()}},_.endOf=function(N){return this.startOf(N,!1)},_.$set=function(N,M){var E,R=D.p(N),F="set"+(this.$u?"UTC":""),B=(E={},E[u]=F+"Date",E[x]=F+"Date",E[h]=F+"Month",E[g]=F+"FullYear",E[c]=F+"Hours",E[l]=F+"Minutes",E[a]=F+"Seconds",E[s]=F+"Milliseconds",E)[R],U=R===u?this.$D+(M-this.$W):M;if(R===h||R===g){var te=this.clone().set(x,1);te.$d[B](U),te.init(),this.$d=te.set(x,Math.min(this.$D,te.daysInMonth())).$d}else B&&this.$d[B](U);return this.init(),this},_.set=function(N,M){return this.clone().$set(N,M)},_.get=function(N){return this[D.p(N)]()},_.add=function(N,M){var E,R=this;N=Number(N);var F=D.p(M),B=function(J){var ge=A(R);return D.w(ge.date(ge.date()+Math.round(J*N)),R)};if(F===h)return this.set(h,this.$M+N);if(F===g)return this.set(g,this.$y+N);if(F===u)return B(1);if(F===d)return B(7);var U=(E={},E[l]=r,E[c]=i,E[a]=n,E)[F]||1,te=this.$d.getTime()+N*U;return D.w(te,this)},_.subtract=function(N,M){return this.add(-1*N,M)},_.format=function(N){var M=this,E=this.$locale();if(!this.isValid())return E.invalidDate||b;var R=N||"YYYY-MM-DDTHH:mm:ssZ",F=D.z(this),B=this.$H,U=this.$m,te=this.$M,J=E.weekdays,ge=E.months,ve=E.meridiem,Me=function(Ee,ct,Je,Yo){return Ee&&(Ee[ct]||Ee(M,R))||Je[ct].slice(0,Yo)},Rt=function(Ee){return D.s(B%12||12,Ee,"0")},We=ve||function(Ee,ct,Je){var Yo=Ee<12?"AM":"PM";return Je?Yo.toLowerCase():Yo};return R.replace(m,function(Ee,ct){return ct||function(Je){switch(Je){case"YY":return String(M.$y).slice(-2);case"YYYY":return D.s(M.$y,4,"0");case"M":return te+1;case"MM":return D.s(te+1,2,"0");case"MMM":return Me(E.monthsShort,te,ge,3);case"MMMM":return Me(ge,te);case"D":return M.$D;case"DD":return D.s(M.$D,2,"0");case"d":return String(M.$W);case"dd":return Me(E.weekdaysMin,M.$W,J,2);case"ddd":return Me(E.weekdaysShort,M.$W,J,3);case"dddd":return J[M.$W];case"H":return String(B);case"HH":return D.s(B,2,"0");case"h":return Rt(1);case"hh":return Rt(2);case"a":return We(B,U,!0);case"A":return We(B,U,!1);case"m":return String(U);case"mm":return D.s(U,2,"0");case"s":return String(M.$s);case"ss":return D.s(M.$s,2,"0");case"SSS":return D.s(M.$ms,3,"0");case"Z":return F}return null}(Ee)||F.replace(":","")})},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(N,M,E){var R,F=this,B=D.p(M),U=A(N),te=(U.utcOffset()-this.utcOffset())*r,J=this-U,ge=function(){return D.m(F,U)};switch(B){case g:R=ge()/12;break;case h:R=ge();break;case p:R=ge()/3;break;case d:R=(J-te)/6048e5;break;case u:R=(J-te)/864e5;break;case c:R=J/i;break;case l:R=J/r;break;case a:R=J/n;break;default:R=J}return E?R:D.a(R)},_.daysInMonth=function(){return this.endOf(h).$D},_.$locale=function(){return k[this.$L]},_.locale=function(N,M){if(!N)return this.$L;var E=this.clone(),R=P(N,M,!0);return R&&(E.$L=R),E},_.clone=function(){return D.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},z}(),ee=W.prototype;return A.prototype=ee,[["$ms",s],["$s",a],["$m",l],["$H",c],["$W",u],["$M",h],["$y",g],["$D",x]].forEach(function(z){ee[z[1]]=function(_){return this.$g(_,z[0],z[1])}}),A.extend=function(z,_){return z.$i||(z(_,W,A),z.$i=!0),A},A.locale=P,A.isDayjs=T,A.unix=function(z){return A(1e3*z)},A.en=k[j],A.Ls=k,A.p={},A})})(Yb);var F4=Yb.exports;const Xl=Yh(F4);function N4(e){return Math.ceil(e/1.5)}function _4(){return Math.floor(Math.random()*8)+2}const L4=f.div`
  margin-top: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`,O4=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,z4=f.h3`
  margin: 0;
  color: #495057;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`,V4=f(O.div)`
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
`,B4=f.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
  text-align: center;
`,H4=f.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,U4=f(O.div)`
  background: ${e=>e.$completed?"linear-gradient(135deg, #28a745 0%, #20c997 100%)":e.$active?e.$color||"linear-gradient(135deg, #ff9800 0%, #ffc107 100%)":"var(--card)"};
  color: ${e=>e.$active||e.$completed?"white":"var(--text)"};
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid ${e=>e.$completed?"#28a745":e.$active?e.$color?e.$color.split(" ")[0]:"#ff9800":"var(--border)"};
  box-shadow: ${e=>e.$active?"0 4px 12px rgba(255, 152, 0, 0.3)":"var(--shadow)"};
  
  ${e=>e.$active&&`
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
  `}
`,W4=f.div`
  font-size: 24px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`,G4=f.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`,K4=f.div`
  margin-bottom: 24px;
`,Y4=f.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`,q4=f(O.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff8c00 ${e=>e.progress}%, #e0e0e0 ${e=>e.progress}%);
  border-radius: 10px;
  position: relative;
  transition: all 0.8s ease-in-out;
  
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
`,Q4=f.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`,X4=f.div`
  height: 120px;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`,Z4=f(O.div)`
  font-size: 32px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  z-index: 10;
  cursor: pointer;
`,J4=f.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`,eD=f.path`
  stroke: rgba(0, 123, 255, 0.4);
  stroke-width: 4;
  fill: none;
  stroke-dasharray: 8, 8;
  animation: dash 3s linear infinite;
  
  @keyframes dash {
    to { stroke-dashoffset: -16; }
  }
`,tD=f(O.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(0, 123, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
`,nD=({orderId:e,isActive:t=!1,onComplete:n})=>{const[r,i]=v.useState({eta:0,progress:0,currentStep:0,isFlying:!1,delivered:!1,distance:0,initialEta:0}),s=Kl(),a=Kl(),l=v.useRef();v.useRef([]);const c=[{id:"preparing",icon:"📦",label:"Chuẩn bị hàng tại nhà hàng",key:"preparing",color:"#6c757d"},{id:"departing",icon:"🚁",label:"Drone đang rời kho",key:"departing",color:"#ff9800"},{id:"delivering",icon:"🛬",label:"Đang giao hàng",key:"delivering",color:"#2196f3"},{id:"completed",icon:"✅",label:"Đã giao thành công",key:"completed",color:"#28a745"}];v.useEffect(()=>{const h=localStorage.getItem(`drone-state-${e}`);if(h){const p=JSON.parse(h);i(p)}else if(t){const p=_4(),g=N4(p),x={eta:g,progress:0,currentStep:0,isFlying:!0,delivered:!1,distance:p,initialEta:g};i(x),localStorage.setItem(`drone-state-${e}`,JSON.stringify(x))}},[e,t]),v.useEffect(()=>{r.distance>0&&localStorage.setItem(`drone-state-${e}`,JSON.stringify(r))},[r,e]),v.useEffect(()=>{if(r.eta>0&&r.isFlying&&!r.delivered)return l.current=setInterval(()=>{i(h=>{const p=Math.max(0,h.eta-1),g=(h.initialEta-p)/h.initialEta*100,x=Math.floor(g/25);return p===0?(clearInterval(l.current),L.success("🎉 Giao hàng đã hoàn tất!"),n==null||n(),{...h,eta:0,progress:100,currentStep:4,isFlying:!1,delivered:!0}):{...h,eta:p,progress:g,currentStep:x,isFlying:!0,delivered:!1}})},1e3),()=>{l.current&&clearInterval(l.current)}},[r.eta,r.isFlying,r.delivered,r.initialEta,n]),v.useEffect(()=>{if(r.isFlying&&!r.delivered){const h=[{x:20,y:60},{x:120,y:40},{x:220,y:60},{x:320,y:60}],p=h[Math.min(r.currentStep,h.length-1)];s.start({x:p.x,y:p.y,rotate:[0,15,-15,0],scale:[1,1.1,1],transition:{duration:2,ease:"easeInOut",repeat:r.isFlying?1/0:0}})}},[r.currentStep,r.isFlying,r.delivered,s]),v.useEffect(()=>{a.start({width:`${r.progress}%`,transition:{duration:.8,ease:"easeInOut"}})},[r.progress,a]);const u=()=>[{x:20,y:60},{x:120,y:40},{x:220,y:60},{x:320,y:60}].map((p,g)=>`${g===0?"M":"L"} ${p.x} ${p.y}`).join(" "),d=h=>h<=0?"Đã hoàn tất":`${h} phút`;return!t&&!r.isFlying&&!r.delivered?null:o.jsxs(L4,{children:[o.jsxs(O4,{children:[o.jsx(z4,{children:"🛩️ Hành trình Drone Giao Hàng"}),r.eta>0&&o.jsxs(V4,{animate:{scale:[1,1.05,1]},transition:{duration:2,repeat:1/0,ease:"easeInOut"},children:["⏱️ Còn lại: ",d(r.eta)]})]}),r.distance>0&&o.jsxs(B4,{children:["📍 Khoảng cách: ",r.distance,"km"]}),o.jsx(H4,{children:c.map((h,p)=>o.jsxs(U4,{$active:r.currentStep===p,$completed:r.currentStep>p,$color:h.color,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:p*.1},whileHover:{scale:1.02},children:[o.jsx(W4,{children:h.icon}),o.jsx(G4,{children:h.label})]},h.id))}),o.jsxs(K4,{children:[o.jsx(Y4,{children:o.jsx(q4,{progress:r.progress,initial:{width:0},animate:a})}),o.jsxs(Q4,{children:[o.jsx("span",{children:"Tiến độ giao hàng"}),o.jsxs("span",{children:[Math.round(r.progress),"%"]})]})]}),o.jsxs(X4,{children:[o.jsx(J4,{children:o.jsx(eD,{d:u()})}),o.jsx(Z4,{animate:s,initial:{x:20,y:60},whileHover:{scale:1.2},transition:{type:"spring",stiffness:300},children:"🛩️"}),r.isFlying&&!r.delivered&&o.jsx(tD,{animate:{x:[20,120,220,320],y:[60,40,60,60],opacity:[0,1,1,0]},transition:{duration:r.eta*10,ease:"easeInOut",repeat:1/0}})]})]})},rD=f.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`,iD=f.h2`
  margin-bottom: 20px;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`,sD=f.div`
  background: var(--card);
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  margin-bottom: 24px;
`,oD=f.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,aD=f.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid var(--border);
  min-width: 250px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,qb=f.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,lD=f(qb)`
  background: var(--border);
  color: var(--text);
  
  &:hover:not(:disabled) {
    background: var(--textfield);
  }
`,cD=f.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`,Ou=f.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  ${e=>{switch(e.status){case"Processing":return"background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); color: white;";case"Delivering":return"background: linear-gradient(135deg, #2196f3 0%, #64b5f6 100%); color: white;";case"Completed":return"background: linear-gradient(135deg, #4caf50 0%, #81c784 100%); color: white;";default:return"background: var(--border); color: var(--text);"}}}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
`,uD=f(O.div)`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary);
  }
`,dD=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,hD=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
`,ux=f.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondaryText);
  background: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
`,zu=f.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  height: 20px;
  border-radius: 4px;
  margin: 8px 0;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`,fD=f.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
`,pD=f.div`
  background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%);
  color: white;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  box-shadow: var(--shadow-md);
`,gD=()=>{const{orders:e,getOrdersByPhone:t,updateOrderStatus:n}=ti(),{user:r,isAdmin:i}=Ze(),[s,a]=v.useState(""),[l,c]=v.useState([]),[u,d]=v.useState({}),[h,p]=v.useState(!1),[g,x]=v.useState({}),b=j=>r?t(j).filter(T=>T.status===ze.PROCESSING||T.status===ze.DELIVERING).length<Rk.MAX_ORDERS_PER_PHONE:!0,S=()=>{if(!s.trim()){L.error("Vui lòng nhập số điện thoại");return}if(!b(s)){L.error("Bạn đã đặt nhiều hơn số đơn hàng quy định! Chờ một xíu nhé!");return}p(!0),setTimeout(()=>{const j=t(s);c(j),p(!1),j.length===0&&L("Không tìm thấy đơn hàng nào cho số điện thoại này",{icon:"ℹ️"})},1e3)},m=(j,k)=>{if(n(j,k),L.success(`✅ Đã cập nhật trạng thái đơn hàng thành "${k}"`),k===ze.DELIVERING&&y(j),s){const C=t(s);c(C)}},y=j=>{const k={eta:15,progress:0,currentStep:0,isFlying:!0,delivered:!1};x(T=>({...T,[j]:k}));const C=setInterval(()=>{x(T=>{const P=T[j];if(!P)return T;const A=Math.max(0,P.eta-1),D=(15-A)/15*100,W=Math.floor(D/25);return A===0?(clearInterval(C),n(j,ze.COMPLETED),L.success("🛸 Drone successfully delivered your order!"),{...T,[j]:{...P,eta:0,progress:100,currentStep:4,isFlying:!1,delivered:!0}}):{...T,[j]:{...P,eta:A,progress:D,currentStep:W,isFlying:!0,delivered:!1}}})},1e3)};v.useEffect(()=>{i()&&c(e)},[i,e]);const w=i()?e:l,$=({order:j})=>{const k=g[j.id],[C,T]=v.useState(!1);v.useEffect(()=>{j.status===ze.DELIVERING&&!k?(T(!0),y(j.id)):j.status===ze.COMPLETED&&T(!1)},[j.status,k]);const P=()=>{n(j.id,ze.COMPLETED),T(!1),L.success("🛸 Drone successfully delivered your order!")};return j.status!==ze.DELIVERING&&j.status!==ze.COMPLETED?null:o.jsx(fD,{children:o.jsx(nD,{orderId:j.id,isActive:C,onComplete:P})})};return o.jsxs(rD,{children:[o.jsx(iD,{children:i()?"🛸 Quản lý đơn hàng & Drone":"📱 Tra cứu đơn hàng"}),i()&&o.jsx(cD,{children:o.jsxs("div",{style:{color:"#666",fontSize:"14px"},children:["📊 Tổng số đơn hàng: ",o.jsx("strong",{children:e.length})]})}),!i()&&o.jsxs(sD,{children:[o.jsxs(oD,{children:[o.jsx(aD,{placeholder:"Nhập số điện thoại",value:s,onChange:j=>a(j.target.value),onKeyPress:j=>j.key==="Enter"&&S(),disabled:h}),o.jsx(qb,{onClick:S,disabled:h,children:h?"Đang tìm...":"Xem đơn hàng"}),s&&o.jsx(lD,{onClick:()=>{a(""),c([]),L.success("🔄 Đã làm mới")},children:"🔄 Làm mới"})]}),r&&s&&!b(s)&&o.jsx(pD,{children:"⚠️ Bạn đã đặt nhiều hơn số đơn hàng quy định! Chờ một xíu nhé!"})]}),h&&o.jsxs("div",{style:{margin:"20px 0"},children:[o.jsx(zu,{}),o.jsx(zu,{}),o.jsx(zu,{})]}),w.length===0&&!i()&&s&&o.jsxs(ux,{children:[o.jsx("h3",{children:"Bạn chưa đặt đơn hàng nào!"}),o.jsx("p",{children:"Hãy đặt món ăn để trải nghiệm dịch vụ giao hàng bằng drone."})]}),w.length===0&&i()&&o.jsxs(ux,{children:[o.jsx("h3",{children:"Chưa có đơn hàng nào"}),o.jsx("p",{children:"Khi có đơn hàng mới, chúng sẽ hiển thị ở đây."})]}),w.map(j=>o.jsxs(uD,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[o.jsxs(dD,{children:[o.jsxs("div",{children:[o.jsxs("h4",{children:["Đơn hàng #",j.id.slice(-6)]}),o.jsxs("div",{style:{fontSize:"14px",color:"#666"},children:[Xl(j.id).format("HH:mm - DD/MM/YYYY")," - ",j.name]})]}),i()&&o.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[o.jsx(Ou,{status:"Processing",onClick:()=>m(j.id,ze.PROCESSING),children:"Đang chuẩn bị"}),o.jsx(Ou,{status:"Delivering",onClick:()=>m(j.id,ze.DELIVERING),children:"Đang giao"}),o.jsx(Ou,{status:"Completed",onClick:()=>m(j.id,ze.COMPLETED),children:"Đã giao"})]})]}),o.jsxs(hD,{children:[o.jsxs("div",{children:[o.jsx("strong",{children:"Trạng thái:"}),o.jsx("span",{style:{color:j.status===ze.PROCESSING?"#ff9800":j.status===ze.DELIVERING?"#2196f3":"#4caf50",fontWeight:"bold",marginLeft:"8px"},children:j.status===ze.PROCESSING?"Đang chuẩn bị":j.status===ze.DELIVERING?"Đang giao hàng":"Hoàn tất"})]}),o.jsxs("div",{children:[o.jsx("strong",{children:"Tổng tiền:"})," ",q(j.total)]}),o.jsxs("div",{children:[o.jsx("strong",{children:"Số điện thoại:"})," ",j.phone]}),o.jsxs("div",{children:[o.jsx("strong",{children:"Địa chỉ:"})," ",j.address]})]}),o.jsxs("div",{style:{marginBottom:"12px"},children:[o.jsx("strong",{children:"Chi tiết đơn hàng:"}),o.jsx("ul",{style:{margin:"8px 0",paddingLeft:"20px"},children:j.items.map((k,C)=>o.jsxs("li",{children:[k.name," × ",k.qty," — ",q(k.price*k.qty)]},C))})]}),o.jsx($,{order:j})]},j.id))]})},mD=f.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`,xD=f(O.div)`
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
`,yD=f.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: #333;
  font-size: 28px;
  font-weight: 700;
`,dx=f.div`
  margin-bottom: 24px;
  position: relative;
`,hx=f.div`
  position: relative;
  display: flex;
  align-items: center;
`,fx=f.div`
  position: absolute;
  left: 16px;
  color: #666;
  font-size: 18px;
  z-index: 1;
`,px=f.input`
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
`,vD=f(O.button)`
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
`,wD=f(O.div)`
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  font-size: 14px;
`,bD=f.div`
  margin-top: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #FF6600;
`,jD=f.h4`
  margin: 0 0 12px 0;
  color: #495057;
  font-size: 16px;
`,SD=f.div`
  color: #6c757d;
  font-size: 14px;
  line-height: 1.6;
  
  strong {
    color: #495057;
  }
`,kD=f(O.div)`
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
`,CD=()=>{var m,y;const{login:e,user:t}=Ze(),n=wt(),i=((y=(m=vt().state)==null?void 0:m.from)==null?void 0:y.pathname)||"/",[s,a]=v.useState(""),[l,c]=v.useState(""),[u,d]=v.useState(null),[h,p]=v.useState(!1),[g,x]=v.useState(!1),b=v.useCallback(w=>{if(console.log("🧭 [Login] Calculating redirect path for user:",{username:w==null?void 0:w.username,role:w==null?void 0:w.role,restaurantId:w==null?void 0:w.restaurantId}),!w)return console.log("⚠️ [Login] No user provided, returning from:",i),i;if(w.role==="restaurant")return w.restaurantId==="rest_2"||w.username==="sweetdreams"?(console.log("🍰 [Login] Redirecting to SweetDreams dashboard"),"/restaurant/sweetdreams"):w.restaurantId==="restaurant_2"||w.username==="aloha_restaurant"?(console.log("🍜 [Login] Redirecting to Aloha dashboard"),"/restaurant/aloha"):(console.log("🏪 [Login] Redirecting to generic restaurant dashboard"),"/restaurant");if(w.role==="admin")return console.log("👨‍💼 [Login] Redirecting to admin dashboard"),"/admin";const $=i==="/login"?"/":i;return console.log("👤 [Login] Redirecting customer to:",$),$},[i]);v.useEffect(()=>{if(console.log("🔄 [Login useEffect] Triggered with:",{loginSuccess:g,hasUser:!!t,username:t==null?void 0:t.username,role:t==null?void 0:t.role}),g&&t){const w=b(t);console.log("✅ [Login] Auto-redirecting authenticated user to:",w),console.log("👤 [Login] Full user data:",t);const $=setTimeout(()=>{console.log("🚀 [Login] Executing navigate() to:",w),n(w,{replace:!0}),console.log("✅ [Login] navigate() called successfully")},100);return()=>{console.log("🧹 [Login] Cleaning up navigation timer"),clearTimeout($)}}else g&&!t&&console.warn("⚠️ [Login] loginSuccess is true but user is null!")},[t,g,n,b]);const S=async w=>{w.preventDefault(),console.log("📝 [Login] Form submitted with username:",s),p(!0),d(null),x(!1);try{console.log("📞 [Login] Calling login() function...");const $=await e(s.trim(),l);console.log("📨 [Login] Login response received:",$),$.ok?(console.log("✅ [Login] Login succeeded, showing success toast"),L.success("🎉 Đăng nhập thành công!"),console.log("🎯 [Login] Setting loginSuccess flag to true"),x(!0),console.log("✅ [Login] loginSuccess flag set, useEffect should trigger soon")):(console.log("❌ [Login] Login failed:",$.message),d($.message||"Đăng nhập thất bại"),L.error($.message||"Đăng nhập thất bại")),p(!1)}catch($){console.error("💥 [Login] Exception during login:",$),p(!1),d("Có lỗi xảy ra, vui lòng thử lại"),L.error("Có lỗi xảy ra, vui lòng thử lại")}};return o.jsx(mD,{children:o.jsxs(xD,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[o.jsx(yD,{children:"Đăng nhập"}),o.jsxs("form",{onSubmit:S,children:[o.jsx(dx,{children:o.jsxs(hx,{children:[o.jsx(fx,{children:"👤"}),o.jsx(px,{type:"text",placeholder:"Nhập tên đăng nhập",value:s,onChange:w=>a(w.target.value),required:!0,disabled:h})]})}),o.jsx(dx,{children:o.jsxs(hx,{children:[o.jsx(fx,{children:"🔒"}),o.jsx(px,{type:"password",placeholder:"Nhập mật khẩu",value:l,onChange:w=>c(w.target.value),required:!0,disabled:h})]})}),o.jsx(vD,{type:"submit",disabled:h,whileHover:{scale:1.02},whileTap:{scale:.98},children:h?"Đang đăng nhập...":"Đăng nhập"}),u&&o.jsx(wD,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:u})]}),o.jsxs(bD,{children:[o.jsx(jD,{children:"📋 Tài khoản mẫu:"}),o.jsxs(SD,{children:[o.jsxs("div",{children:[o.jsx("strong",{children:"Admin:"})," admin / admin123"]}),o.jsxs("div",{children:[o.jsx("strong",{children:"Customer:"})," user / user123"]}),o.jsxs("div",{children:[o.jsx("strong",{children:"Customer:"})," user1 / user1123"]}),o.jsxs("div",{children:[o.jsx("strong",{children:"Restaurant (SweetDreams):"})," sweetdreams / sweet123"]}),o.jsxs("div",{children:[o.jsx("strong",{children:"Restaurant (Aloha):"})," aloha_restaurant / aloha123"]})]})]}),o.jsx(kD,{children:o.jsx("a",{href:"/",children:"← Quay về trang chủ"})})]})})},$D=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
`,TD=f(O.div)`
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
`,ED=f.div`
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
`,PD=f.div`
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
  line-height: 1;
`,AD=f.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;f.div`
  font-size: 12px;
  margin-top: 8px;
  color: ${e=>e.$positive?"#28a745":"#dc3545"};
  font-weight: 600;
  
  &::before {
    content: '${e=>e.$positive?"↗":"↘"}';
    margin-right: 4px;
  }
`;const DD=({stats:e,theme:t})=>{const n=[{id:"customers",icon:"👥",value:e.totalCustomers,label:"Tổng khách hàng",gradient:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",gradientStart:"#667eea",gradientEnd:"#764ba2"},{id:"orders",icon:"📦",value:e.totalOrders,label:"Tổng đơn hàng",gradient:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",gradientStart:"#f093fb",gradientEnd:"#f5576c"},{id:"drones",icon:"🚁",value:e.activeDrones,label:"Drone đang bay",gradient:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",gradientStart:"#4facfe",gradientEnd:"#00f2fe"},{id:"completed",icon:"✅",value:e.completedDeliveries,label:"Đã hoàn tất",gradient:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",gradientStart:"#43e97b",gradientEnd:"#38f9d7"}];return e.todayRevenue!==void 0&&n.push({id:"revenue",icon:"💰",value:e.todayRevenue,label:"Doanh thu hôm nay",gradient:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",gradientStart:"#fa709a",gradientEnd:"#fee140"}),e.avgDeliveryTime!==void 0&&n.push({id:"avgTime",icon:"⏱️",value:e.avgDeliveryTime,label:"TG giao TB (phút)",gradient:"linear-gradient(135deg, #30cfd0 0%, #330867 100%)",gradientStart:"#30cfd0",gradientEnd:"#330867"}),o.jsx($D,{children:n.map((r,i)=>o.jsxs(TD,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:i*.1},style:{"--gradient-start":r.gradientStart,"--gradient-end":r.gradientEnd},children:[o.jsx(ED,{$gradient:r.gradient,children:r.icon}),o.jsx(PD,{children:r.id==="revenue"&&typeof r.value=="number"?q(r.value):r.value}),o.jsx(AD,{children:r.label})]},r.id))})},RD=f.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,MD=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,ID=f.h2`
  color: ${e=>e.$primary};
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`,FD=f.button`
  padding: 12px 24px;
  background: ${e=>e.$primary};
  color: white;
  border: none;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`,ND=f.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,_D=f.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &::placeholder {
    color: #999;
  }
`,LD=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`,OD=f(O.div)`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid ${e=>e.$accent};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`,zD=f.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  margin-bottom: 16px;
`,VD=f.div``,BD=f.h3`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`,HD=f.p`
  color: #666;
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.5;
`,UD=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,WD=f.div`
  color: ${e=>e.$primary};
  font-size: 20px;
  font-weight: 700;
`,gx=f.span`
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
`,GD=f.div`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
  background: ${e=>e.$available?"#d4edda":"#f8d7da"};
  color: ${e=>e.$available?"#155724":"#721c24"};
`,KD=f.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,Vu=f.button`
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  min-width: 80px;
  
  ${e=>e.$variant==="edit"?`
        background: #28a745;
        color: white;
        &:hover {
          background: #218838;
        }
      `:e.$variant==="toggle"?`
        background: #17a2b8;
        color: white;
        &:hover {
          background: #138496;
        }
      `:`
        background: #dc3545;
        color: white;
        &:hover {
          background: #c82333;
        }
      `}
`,YD=f.div`
  display: ${e=>e.$show?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,qD=f.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`,QD=f.h3`
  color: ${e=>e.$primary};
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 600;
`,XD=f.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,mr=f.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,xr=f.label`
  color: #333;
  font-weight: 600;
  font-size: 14px;
`,Bu=f.input`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,ZD=f.textarea`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,Hu=f.select`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,JD=f.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`,mx=f.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  
  ${e=>e.$variant==="primary"?`
    background: ${e.$primary||"#007bff"};
    color: white;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  `:`
    background: #6c757d;
    color: white;
    &:hover {
      background: #5a6268;
    }
  `}
`,e8=f.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,Up=({restaurantId:e,theme:t})=>{const[n,r]=v.useState([]),[i,s]=v.useState([]),[a,l]=v.useState(!1),[c,u]=v.useState(null),[d,h]=v.useState(""),[p,g]=v.useState("All"),[x,b]=v.useState({name:"",price:"",description:"",image:"",category:"Rice",tag:"",isAvailable:!0});v.useEffect(()=>{const k=Ct.filter(C=>C.restaurantId===e);r(k),s(k)},[e]),v.useEffect(()=>{let k=n;d&&(k=k.filter(C=>C.name.toLowerCase().includes(d.toLowerCase())||C.description.toLowerCase().includes(d.toLowerCase()))),p!=="All"&&(k=k.filter(C=>C.category===p)),s(k)},[d,p,n]);const S=()=>{u(null),b({name:"",price:"",description:"",image:"",category:"Rice",tag:"",isAvailable:!0}),l(!0)},m=k=>{r(n.map(P=>P.id===k?{...P,isAvailable:P.isAvailable===void 0?!1:!P.isAvailable}:P));const C=n.find(P=>P.id===k),T=(C==null?void 0:C.isAvailable)===void 0?!1:!C.isAvailable;L.success(T?"✅ Món ăn đã được kích hoạt!":"⚠️ Món ăn đã được tạm ngưng!")},y=k=>{u(k),b({name:k.name,price:k.price.toString(),description:k.description,image:k.image||"",category:k.category,tag:k.tag||"",isAvailable:k.isAvailable!==void 0?k.isAvailable:!0}),l(!0)},w=k=>{try{window.confirm("Bạn có chắc chắn muốn xóa món ăn này?")&&(r(n.filter(C=>C.id!==k)),L.success("🗑️ Món ăn đã được xóa thành công!"))}catch(C){console.error("Error deleting dish:",C),L.error("❌ Không thể xóa món ăn. Vui lòng thử lại.")}},$=k=>{k.preventDefault();try{const C=parseFloat(x.price);if(isNaN(C)||C<=0){L.error("❌ Please enter a valid price greater than 0.");return}if(c)r(n.map(T=>T.id===c.id?{...T,name:x.name,price:C,description:x.description,image:x.image||void 0,category:x.category,tag:x.tag||void 0,isAvailable:x.isAvailable}:T)),L.success("⚙️ Món ăn đã được cập nhật thành công!");else{const T={id:`${e}_${Date.now()}`,name:x.name,price:C,description:x.description,image:x.image||void 0,category:x.category,tag:x.tag||void 0,restaurantId:e,isAvailable:x.isAvailable};r([...n,T]),L.success("✅ Món ăn mới đã được thêm thành công!")}l(!1)}catch(C){console.error("Error saving dish:",C),L.error("❌ Failed to save dish. Please try again.")}},j=Array.from(new Set(Ct.map(k=>k.category)));return o.jsxs(o.Fragment,{children:[o.jsxs(RD,{children:[o.jsxs(MD,{children:[o.jsx(ID,{$primary:t.primary,children:"🍽️ Quản lí thực đơn"}),o.jsx(FD,{$primary:t.primary,onClick:S,children:"➕ Thêm món mới"})]}),o.jsxs(ND,{children:[o.jsx(_D,{type:"search",placeholder:"🔍 Tìm kiếm món ăn...",value:d,onChange:k=>h(k.target.value)}),o.jsxs(Hu,{value:p,onChange:k=>g(k.target.value),children:[o.jsx("option",{value:"All",children:"Tất cả danh mục"}),j.map(k=>o.jsx("option",{value:k,children:k},k))]})]}),i.length===0?o.jsxs(e8,{children:[o.jsx("h3",{children:"Chưa có món ăn nào"}),o.jsx("p",{children:"Bắt đầu bằng cách thêm món ăn đầu tiên của bạn!"})]}):o.jsx(LD,{children:i.map(k=>o.jsxs(OD,{$accent:t.accent,initial:{opacity:0,y:20},animate:{opacity:1,y:0},whileHover:{scale:1.02},children:[k.image&&o.jsx(zD,{style:{backgroundImage:`url(${k.image})`}}),o.jsxs(VD,{children:[o.jsx(BD,{children:k.name}),o.jsx(HD,{children:k.description}),o.jsxs(UD,{children:[o.jsx(WD,{$primary:t.primary,children:q(k.price)}),o.jsx(gx,{children:k.category})]}),k.tag&&o.jsx(gx,{style:{marginBottom:"12px",display:"inline-block"},children:k.tag==="Hot"?"🔥 Hot":"✨ New"}),o.jsx(GD,{$available:k.isAvailable!==!1,children:k.isAvailable!==!1?"✅ Đang phục vụ":"⛔ Tạm ngưng"}),o.jsxs(KD,{children:[o.jsx(Vu,{$variant:"edit",onClick:()=>y(k),children:"✏️ Sửa"}),o.jsx(Vu,{$variant:"toggle",onClick:()=>m(k.id),children:k.isAvailable!==!1?"⏸️ Tạm ngưng":"▶️ Kích hoạt"}),o.jsx(Vu,{$variant:"delete",onClick:()=>w(k.id),children:"🗑️ Xóa"})]})]})]},k.id))})]}),o.jsx(YD,{$show:a,children:o.jsxs(qD,{children:[o.jsx(QD,{$primary:t.primary,children:c?"✏️ Sửa món ăn":"➕ Thêm món mới"}),o.jsxs(XD,{onSubmit:$,children:[o.jsxs(mr,{children:[o.jsx(xr,{children:"Tên món ăn *"}),o.jsx(Bu,{type:"text",value:x.name,onChange:k=>b({...x,name:k.target.value}),required:!0,placeholder:"Nhập tên món ăn"})]}),o.jsxs(mr,{children:[o.jsx(xr,{children:"Giá (₫) *"}),o.jsx(Bu,{type:"number",step:"1000",value:x.price,onChange:k=>b({...x,price:k.target.value}),required:!0,placeholder:"50000"})]}),o.jsxs(mr,{children:[o.jsx(xr,{children:"Mô tả *"}),o.jsx(ZD,{value:x.description,onChange:k=>b({...x,description:k.target.value}),required:!0,placeholder:"Mô tả món ăn..."})]}),o.jsxs(mr,{children:[o.jsx(xr,{children:"URL hình ảnh"}),o.jsx(Bu,{type:"url",value:x.image,onChange:k=>b({...x,image:k.target.value}),placeholder:"https://example.com/image.jpg"})]}),o.jsxs(mr,{children:[o.jsx(xr,{children:"Danh mục *"}),o.jsxs(Hu,{value:x.category,onChange:k=>b({...x,category:k.target.value}),required:!0,children:[o.jsx("option",{value:"Rice",children:"Rice"}),o.jsx("option",{value:"Noodles",children:"Noodles"}),o.jsx("option",{value:"Asian",children:"Asian"}),o.jsx("option",{value:"Hawaiian",children:"Hawaiian"}),o.jsx("option",{value:"Dessert",children:"Dessert"}),o.jsx("option",{value:"Burger",children:"Burger"}),o.jsx("option",{value:"Pizza",children:"Pizza"}),o.jsx("option",{value:"Sushi",children:"Sushi"})]})]}),o.jsxs(mr,{children:[o.jsx(xr,{children:"Tag (Tùy chọn)"}),o.jsxs(Hu,{value:x.tag,onChange:k=>b({...x,tag:k.target.value}),children:[o.jsx("option",{value:"",children:"Không có"}),o.jsx("option",{value:"Hot",children:"🔥 Hot"}),o.jsx("option",{value:"New",children:"✨ New"})]})]}),o.jsx(mr,{children:o.jsxs(xr,{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[o.jsx("input",{type:"checkbox",checked:x.isAvailable,onChange:k=>b({...x,isAvailable:k.target.checked}),style:{width:"20px",height:"20px",cursor:"pointer"}}),"Món ăn đang được phục vụ (Available)"]})}),o.jsxs(JD,{children:[o.jsx(mx,{type:"submit",$variant:"primary",$primary:t.primary,children:c?"Cập nhật món ăn":"Thêm món ăn"}),o.jsx(mx,{type:"button",$variant:"secondary",onClick:()=>l(!1),children:"Hủy"})]})]})]})})]})},t8=f.div`
  /* Wrapper styling if needed */
`,n8=({restaurantId:e="default",theme:t={primary:"#FF6600",secondary:"#e55a00",accent:"#ff8534"}})=>o.jsx(t8,{children:o.jsx(Up,{restaurantId:e,theme:t})}),r8=f.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,i8=f.div`
  margin-bottom: 24px;
`,s8=f.h2`
  color: ${e=>e.$primary};
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
`,o8=f.div`
  position: relative;
  margin-bottom: 24px;
`,a8=f.input`
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
`,l8=f.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 20px;
`,c8=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,$a=f.div`
  background: linear-gradient(135deg, ${e=>e.$primary}, ${e=>e.$primary}dd);
  padding: 20px;
  border-radius: 12px;
  color: white;
`,Ta=f.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
`,Ea=f.div`
  font-size: 14px;
  opacity: 0.9;
`,u8=f(O.div)`
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
`,d8=f.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`,h8=f.div`
  font-weight: 600;
  color: #333;
  font-size: 18px;
`,f8=f.div`
  color: #666;
  font-size: 14px;
`,p8=f.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`,g8=f.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`,m8=f.div`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`,x8=f.div`
  margin-bottom: 12px;
`,y8=f.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #e1e5e9;
  
  &:last-child {
    border-bottom: none;
  }
`,v8=f.div`
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
`,w8=f.div`
  font-weight: 700;
  color: ${e=>e.$primary};
  font-size: 20px;
`,b8=f.span`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  ${e=>{switch(e.$status){case"pending":return"background: #FFF9C4; color: #F57F17;";case"confirmed":return"background: #B3E5FC; color: #0277BD;";case"preparing":return"background: #FFE0B2; color: #E65100;";case"delivering":return"background: #C8E6C9; color: #2E7D32;";case"delivered":return"background: #B2DFDB; color: #00695C;";default:return"background: #E0E0E0; color: #616161;"}}}
`,j8=f.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,S8=f.button`
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
`,k8=f.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,Wp=({restaurantId:e,theme:t})=>{const{orders:n,updateOrderStatus:r}=ti(),[i,s]=v.useState([]),[a,l]=v.useState([]),[c,u]=v.useState("");v.useEffect(()=>{if(n){const g=n.filter(x=>x.restaurantId===e);s(g),l(g)}},[n,e]),v.useEffect(()=>{if(c.trim()==="")l(i);else{const g=c.toLowerCase(),x=i.filter(b=>{var y;const S=((y=b.name)==null?void 0:y.toLowerCase())||"",m=b.phone||"";return S.includes(g)||m.includes(g)});l(x)}},[c,i]);const d={totalOrders:i.length,pendingOrders:i.filter(g=>g.status==="Processing").length,preparingOrders:i.filter(g=>g.status==="Delivering").length,totalRevenue:i.reduce((g,x)=>g+(x.total||0),0)},h=(g,x)=>{r(g,x),L.success(`Order ${g} updated to ${x}! 🎉`)},p=g=>{const x=["Processing","Delivering","Completed"],b=x.indexOf(g);return b<x.length-1?x[b+1]:null};return o.jsxs(r8,{children:[o.jsx(i8,{children:o.jsx(s8,{$primary:t.primary,children:"📦 Theo dõi đơn hàng"})}),o.jsxs(o8,{children:[o.jsx(a8,{type:"text",placeholder:"🔍 Search by customer name or phone number...",value:c,onChange:g=>u(g.target.value)}),o.jsx(l8,{children:"🔍"})]}),o.jsxs(c8,{children:[o.jsxs($a,{$primary:t.primary,children:[o.jsx(Ta,{children:d.totalOrders}),o.jsx(Ea,{children:"Tổng số đơn"})]}),o.jsxs($a,{$primary:t.secondary,children:[o.jsx(Ta,{children:d.pendingOrders}),o.jsx(Ea,{children:"Đang xử lý"})]}),o.jsxs($a,{$primary:t.accent,children:[o.jsx(Ta,{children:d.preparingOrders}),o.jsx(Ea,{children:"Đang giao hàng"})]}),o.jsxs($a,{$primary:t.primary,children:[o.jsx(Ta,{children:q(d.totalRevenue)}),o.jsx(Ea,{children:"Doanh thu"})]})]}),a.length===0?o.jsxs(k8,{children:[o.jsx("h3",{children:c?"No matching orders found":"Chưa có đơn nào !"}),o.jsx("p",{children:c?"Try a different search term":"Đơn hàng sẽ xuất hiện ở đây sau khi khách hàng đặt hàng"})]}):a.sort((g,x)=>x.createdAt-g.createdAt).map(g=>{var x;return o.jsxs(u8,{$accent:t.accent,initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[o.jsxs(d8,{children:[o.jsxs("div",{children:[o.jsxs(h8,{children:["Order #",g.id]}),o.jsx(f8,{children:Xl(g.createdAt).format("DD/MM/YYYY HH:mm")})]}),o.jsx(b8,{$status:g.status,children:g.status.toUpperCase()})]}),o.jsxs(p8,{children:[o.jsx(g8,{children:"Customer Information:"}),o.jsxs(m8,{children:[g.name||"N/A"," - ",g.phone||"N/A"]})]}),o.jsx(x8,{children:(x=g.items)==null?void 0:x.map((b,S)=>o.jsxs(y8,{children:[o.jsxs("span",{children:[b.qty,"x ",b.name]}),o.jsx("span",{children:q(b.price*b.qty)})]},S))}),o.jsxs(v8,{children:[o.jsxs(w8,{$primary:t.primary,children:["Total: ",q(g.total)]}),o.jsx(j8,{children:p(g.status)&&o.jsxs(S8,{$primary:t.primary,onClick:()=>h(g.id,p(g.status)),children:["Move to ",p(g.status)]})})]})]},g.id)})]})},C8=f.div`
  /* Wrapper styling if needed */
`,$8=({restaurantId:e="default",theme:t={primary:"#FF6600",secondary:"#e55a00",accent:"#ff8534"}})=>o.jsx(C8,{children:o.jsx(Wp,{restaurantId:e,theme:t})}),Ft={lat:21.0285,lng:105.8542};function Ws(e,t){const r=e.lat*Math.PI/180,i=t.lat*Math.PI/180,s=(t.lat-e.lat)*Math.PI/180,a=(t.lng-e.lng)*Math.PI/180,l=Math.sin(s/2)*Math.sin(s/2)+Math.cos(r)*Math.cos(i)*Math.sin(a/2)*Math.sin(a/2);return 6371e3*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}function T8(){const e=(Math.random()-.5)*.05,t=(Math.random()-.5)*.05;return{lat:Ft.lat+e,lng:Ft.lng+t}}function xx(e=8){const t=[],n=["active","enroute","enroute","enroute","returning","charging"];for(let r=0;r<e;r++){const i=T8(),s=n[r%n.length];let a,l;s==="charging"||s==="active"?(a={...Ft},l=0):s==="returning"?(l=75+Math.random()*20,a={lat:i.lat+(Ft.lat-i.lat)*(l/100),lng:i.lng+(Ft.lng-i.lng)*(l/100)}):(l=Math.random()*70,a={lat:Ft.lat+(i.lat-Ft.lat)*(l/100),lng:Ft.lng+(i.lng-Ft.lng)*(l/100)});const c=Ws(a,s==="returning"?Ft:i),u=30+Math.random()*20,d=Math.round(c/1e3/u*60);t.push({id:`DRONE-${String(r+1).padStart(3,"0")}`,orderId:`ORD-${Math.floor(1e4+Math.random()*9e4)}`,status:s,battery:s==="charging"?30+Math.random()*30:60+Math.random()*40,speed:u,currentPosition:a,destination:i,restaurantPosition:Ft,distanceRemaining:Math.round(c),estimatedArrival:d,progress:l})}return t}function E8(e,t=1){if(e.status==="charging"){const S=Math.min(100,e.battery+2);return S>=100?{...e,battery:100,status:"active",progress:0}:{...e,battery:S}}const n=e.status==="returning"?e.restaurantPosition:e.destination,r=Ws(e.currentPosition,n);if(r<50){if(e.status==="returning")return{...e,status:"charging",currentPosition:e.restaurantPosition,progress:0,distanceRemaining:0,estimatedArrival:0};if(e.status==="enroute")return{...e,status:"returning",progress:0,currentPosition:e.destination}}const s=e.speed*1e3/3600*t,a=Math.min(s/r,1),l={lat:e.currentPosition.lat+(n.lat-e.currentPosition.lat)*a,lng:e.currentPosition.lng+(n.lng-e.currentPosition.lng)*a},c=Ws(l,n),u=Math.round(c/1e3/e.speed*60),d=Ws(e.restaurantPosition,e.destination),h=Ws(e.restaurantPosition,l),p=Math.min(h/d*100,100),g=.2*t,x=Math.max(0,e.battery-g);let b=e.status;return x<10&&e.status!=="returning"?b="returning":x<20&&x>=10&&e.status==="active"&&(b=e.status),{...e,currentPosition:l,distanceRemaining:Math.round(c),estimatedArrival:b==="returning"?0:u,battery:x,progress:p,status:b}}function yx(e){return{active:"Đang giao hàng",enroute:"Đang bay tới",returning:"Đang quay về nhà hàng",charging:"Đang sạc pin"}[e]}function vx(e){return{active:"#28a745",enroute:"#ff9800",returning:"#dc3545",charging:"#6c757d"}[e]}function P8(e){return e<1e3?`${Math.round(e)}m`:`${(e/1e3).toFixed(1)}km`}function A8(e){if(e<1)return"< 1 phút";if(e<60)return`${Math.round(e)} phút`;const t=Math.floor(e/60),n=Math.round(e%60);return`${t}h ${n}p`}const D8=f.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,R8=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,M8=f.h2`
  color: ${e=>e.$color||"#FF6600"};
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`,I8=f.div`
  display: flex;
  gap: 12px;
`,Uu=f.button`
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
`,F8=f.div`
  background: linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%);
  border-radius: 12px;
  padding: 40px;
  min-height: 400px;
  position: relative;
  border: 2px solid #e1e5e9;
  margin-bottom: 24px;
`,N8=f(O.div)`
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
`,_8=f.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`,L8=f(O.div)`
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
`,O8=f(O.div)`
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
`,z8=f.div`
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
`,V8=f.div`
  font-size: 12px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`,Wu=f.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #666;
`,Gu=f.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${e=>e.$color};
  border: 2px solid white;
  box-shadow: 0 0 4px ${e=>e.$color};
`,B8=f(O.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  z-index: 5;
`,H8=f.table`
  width: 100%;
  border-collapse: collapse;
`,yr=f.th`
  padding: 12px;
  text-align: left;
  background: #f8f9fa;
  border-bottom: 2px solid #e1e5e9;
  font-weight: 600;
`,vr=f.td`
  padding: 12px;
  border-bottom: 1px solid #e1e5e9;
`,U8=f.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.$color}20;
  color: ${e=>e.$color};
  border: 1px solid ${e=>e.$color};
`,W8=f.div`
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
`,G8=f.span`
  position: relative;
  z-index: 1;
  font-size: 11px;
  font-weight: 700;
  color: #333;
  display: block;
  text-align: center;
  line-height: 20px;
  text-shadow: 0 0 2px white;
`,K8=({theme:e})=>{const[t,n]=v.useState([]),[r,i]=v.useState(!1);return v.useEffect(()=>{n(xx(8))},[]),v.useEffect(()=>{if(!r)return;const s=setInterval(()=>{n(a=>a.map(l=>E8(l,1)))},1e3);return()=>clearInterval(s)},[r]),o.jsxs(D8,{children:[o.jsxs(R8,{children:[o.jsx(M8,{$color:e==null?void 0:e.primary,children:"🚁 Mô phỏng hoạt động Drone giao hàng"}),o.jsxs(I8,{children:[o.jsx(Uu,{$variant:"success",onClick:()=>i(!0),disabled:r,children:"▶️ Bắt đầu"}),o.jsx(Uu,{$variant:"danger",onClick:()=>i(!1),disabled:!r,children:"⏸️ Tạm dừng"}),o.jsx(Uu,{onClick:()=>{i(!1),n(xx(8))},children:"🔄 Đặt lại"})]})]}),o.jsxs(F8,{children:[o.jsx(B8,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:200},children:"🏪"}),o.jsxs(z8,{children:[o.jsx(V8,{children:"Trạng thái pin"}),o.jsxs(Wu,{children:[o.jsx(Gu,{$color:"#28a745"}),o.jsx("span",{children:"> 60%: Tốt"})]}),o.jsxs(Wu,{children:[o.jsx(Gu,{$color:"#ffc107"}),o.jsx("span",{children:"20-60%: Cảnh báo"})]}),o.jsxs(Wu,{children:[o.jsx(Gu,{$color:"#dc3545"}),o.jsx("span",{children:"< 20%: Nguy hiểm"})]})]}),o.jsx(tt,{children:t.map(s=>o.jsxs(_8,{children:[o.jsx(N8,{$x:(s.currentPosition.lng-s.restaurantPosition.lng)*1e3,$y:(s.currentPosition.lat-s.restaurantPosition.lat)*1e3,$battery:s.battery,initial:{scale:0,opacity:0},animate:{scale:1,opacity:1,rotate:r?360:0},exit:{scale:0,opacity:0},transition:{scale:{type:"spring",stiffness:200},rotate:{duration:2,repeat:1/0,ease:"linear"}},children:"🚁"}),s.battery<20&&o.jsx(L8,{$level:s.battery,initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.3},style:{position:"absolute",left:`${50+(s.currentPosition.lng-s.restaurantPosition.lng)*1e3}%`,top:`${50+(s.currentPosition.lat-s.restaurantPosition.lat)*1e3+3}%`},children:s.battery<10?"⚠️ Pin cực thấp!":"⚡ Pin yếu"}),o.jsx(O8,{$color:vx(s.status),initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.3},style:{position:"absolute",left:`${50+(s.currentPosition.lng-s.restaurantPosition.lng)*1e3}%`,top:`${50+(s.currentPosition.lat-s.restaurantPosition.lat)*1e3+5}%`},children:yx(s.status)})]},s.id))})]}),o.jsxs(H8,{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx(yr,{children:"ID Drone"}),o.jsx(yr,{children:"Đơn hàng"}),o.jsx(yr,{children:"Trạng thái"}),o.jsx(yr,{children:"Pin"}),o.jsx(yr,{children:"Tốc độ"}),o.jsx(yr,{children:"Khoảng cách"}),o.jsx(yr,{children:"Thời gian"})]})}),o.jsx("tbody",{children:t.map(s=>o.jsxs("tr",{children:[o.jsx(vr,{children:o.jsx("strong",{children:s.id})}),o.jsx(vr,{children:s.orderId}),o.jsx(vr,{children:o.jsx(U8,{$color:vx(s.status),children:yx(s.status)})}),o.jsx(vr,{children:o.jsx(W8,{$level:s.battery,children:o.jsxs(G8,{children:[Math.round(s.battery),"%"]})})}),o.jsxs(vr,{children:[Math.round(s.speed)," km/h"]}),o.jsx(vr,{children:P8(s.distanceRemaining)}),o.jsx(vr,{children:A8(s.estimatedArrival)})]},s.id))})]})]})},Y8=f.div`
  margin-top: 24px;
`,q8=f.h2`
  color: ${e=>e.$color||"#FF6600"};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,Q8=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,X8=f(O.div)`
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
`,Z8=f.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,J8=f.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${e=>e.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`,eR=f.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`,tR=f.div`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 8px;
`,nR=f.div`
  font-size: 14px;
  color: ${e=>e.$positive?"#28a745":"#dc3545"};
  font-weight: 600;
  
  &::before {
    content: '${e=>e.$positive?"↗":"↘"}';
    margin-right: 4px;
  }
`,rR=f.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,wx=f.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`,Ku=f.h3`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
`,iR=f.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 250px;
  gap: 12px;
  padding: 16px 0;
`,sR=f.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`,oR=f(O.div)`
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
`,aR=f.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`,lR=f.div`
  font-size: 12px;
  color: #666;
  text-align: center;
`,cR=f.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,uR=f.svg`
  width: 200px;
  height: 200px;
`,dR=f.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,hR=f.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,fR=f.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${e=>e.$color};
`,pR=f.div`
  flex: 1;
`,gR=f.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`,mR=f.div`
  font-size: 12px;
  color: #666;
`,xR=f.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`,yR=f.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,vR=f.div`
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
`,wR=f.div`
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
`,bR=f.div`
  flex: 1;
`,jR=f.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`,SR=f.div`
  font-size: 14px;
  color: #666;
`,kR=f.div`
  font-size: 16px;
  font-weight: 600;
  color: #FF6600;
`,CR=({theme:e})=>{const t=[{icon:"📦",label:"Tổng đơn hàng hôm nay",value:"156",change:"+12%",positive:!0,gradient:"linear-gradient(90deg, #667eea, #764ba2)",bg:"#667eea20"},{icon:"📦",label:"Tổng đơn hàng tuần này",value:"892",change:"+8%",positive:!0,gradient:"linear-gradient(90deg, #f093fb, #f5576c)",bg:"#f093fb20"},{icon:"💰",label:"Doanh thu hôm nay",value:q(1245e4),change:"+15%",positive:!0,gradient:"linear-gradient(90deg, #4facfe, #00f2fe)",bg:"#4facfe20"},{icon:"⏱️",label:"Thời gian giao TB",value:"18 phút",change:"-5 phút",positive:!0,gradient:"linear-gradient(90deg, #43e97b, #38f9d7)",bg:"#43e97b20"}],n=[{label:"T2",value:85e5},{label:"T3",value:92e5},{label:"T4",value:11e6},{label:"T5",value:105e5},{label:"T6",value:138e5},{label:"T7",value:152e5},{label:"CN",value:124e5}],r=Math.max(...n.map(u=>u.value)),i=[{label:"Đang chuẩn bị",value:45,color:"#ffc107"},{label:"Đang giao",value:38,color:"#007bff"},{label:"Hoàn tất",value:142,color:"#28a745"},{label:"Đã hủy",value:5,color:"#dc3545"}],s=i.reduce((u,d)=>u+d.value,0);let a=0;const l=[{name:"Cheesecake Bliss",sales:89,revenue:5695e3},{name:"Dim Sum",sales:67,revenue:402e4},{name:"Pizza Sky",sales:54,revenue:351e4}],c=["#FFD700","#C0C0C0","#CD7F32"];return o.jsxs(Y8,{children:[o.jsx(q8,{$color:e==null?void 0:e.primary,children:"📊 Thống kê và phân tích thông minh"}),o.jsx(Q8,{children:t.map((u,d)=>o.jsx(X8,{$gradient:u.gradient,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:d*.1},children:o.jsxs(Z8,{children:[o.jsxs("div",{children:[o.jsx(eR,{children:u.label}),o.jsx(tR,{children:u.value}),o.jsx(nR,{$positive:u.positive,children:u.change})]}),o.jsx(J8,{$bg:u.bg,children:u.icon})]})},d))}),o.jsxs(rR,{children:[o.jsxs(wx,{children:[o.jsx(Ku,{children:"📈 Xu hướng doanh thu tuần"}),o.jsx(iR,{children:n.map((u,d)=>o.jsxs(sR,{children:[o.jsx(aR,{children:q(u.value)}),o.jsx(oR,{$height:u.value/r*100,$color:`linear-gradient(180deg, ${(e==null?void 0:e.primary)||"#FF6600"}, ${(e==null?void 0:e.secondary)||"#e55a00"})`,initial:{height:0},animate:{height:`${u.value/r*100}%`},transition:{delay:d*.1,duration:.5}}),o.jsx(lR,{children:u.label})]},d))})]}),o.jsxs(wx,{children:[o.jsx(Ku,{children:"🎯 Đơn hàng theo trạng thái"}),o.jsxs(cR,{children:[o.jsxs(uR,{viewBox:"0 0 200 200",children:[o.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"#e1e5e9",strokeWidth:"40"}),i.map((u,d)=>{const p=u.value/s*100/100*360,g=a;a+=p;const x=100+80*Math.cos((g-90)*Math.PI/180),b=100+80*Math.sin((g-90)*Math.PI/180),S=100+80*Math.cos((g+p-90)*Math.PI/180),m=100+80*Math.sin((g+p-90)*Math.PI/180),y=p>180?1:0;return o.jsx(O.path,{d:`M 100,100 L ${x},${b} A 80,80 0 ${y} 1 ${S},${m} Z`,fill:u.color,initial:{opacity:0},animate:{opacity:1},transition:{delay:d*.1}},d)}),o.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"white"}),o.jsx("text",{x:"100",y:"95",textAnchor:"middle",fontSize:"24",fontWeight:"700",fill:"#333",children:s}),o.jsx("text",{x:"100",y:"115",textAnchor:"middle",fontSize:"12",fill:"#666",children:"Đơn hàng"})]}),o.jsx(dR,{children:i.map((u,d)=>o.jsxs(hR,{children:[o.jsx(fR,{$color:u.color}),o.jsxs(pR,{children:[o.jsx(gR,{children:u.label}),o.jsxs(mR,{children:[u.value," đơn (",(u.value/s*100).toFixed(0),"%)"]})]})]},d))})]})]})]}),o.jsxs(xR,{children:[o.jsx(Ku,{children:"🏆 Top 3 món ăn phổ biến"}),o.jsx(yR,{children:l.map((u,d)=>o.jsxs(vR,{children:[o.jsx(wR,{$color:c[d],children:d+1}),o.jsxs(bR,{children:[o.jsx(jR,{children:u.name}),o.jsxs(SR,{children:[u.sales," đơn hàng"]})]}),o.jsx(kR,{children:q(u.revenue)})]},d))})]})]})},Xt={primary:"#FF6600",secondary:"#e55a00",accent:"#ff8534"},$R=f.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fef8f1 0%, #fff 100%);
  padding: 24px;
`,TR=f.div`
  max-width: 1400px;
  margin: 0 auto;
`,ER=f.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 6px solid ${Xt.primary};
`,PR=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`,AR=f.div``,DR=f.h1`
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`,RR=f.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
`,MR=f.div`
  display: flex;
  gap: 12px;
`,IR=f.button`
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
`,FR=f.div`
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
`,NR=f.button`
  padding: 16px 24px;
  border: none;
  background: ${e=>e.$active?Xt.primary:"transparent"};
  color: ${e=>e.$active?"white":"#6c757d"};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: ${e=>e.$active?Xt.primary:"#f8f9fa"};
    color: ${e=>e.$active?"white":"#333"};
  }
  
  ${e=>e.$active&&`
    box-shadow: 0 -2px 8px rgba(255, 102, 0, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`,_R=f.span`
  margin-right: 8px;
`,LR=f(O.div)`
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`,OR=f.div`
  background: linear-gradient(135deg, ${Xt.primary} 0%, ${Xt.secondary} 100%);
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
`,zR=f.div`
  font-size: 48px;
`,VR=f.div`
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
`,BR=()=>{const e=Ze(),[t,n]=v.useState("overview");if(!e)return console.error("RestaurantDashboard: useAuth() returned null. Make sure the component is wrapped in AuthProvider."),o.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["⚠️ Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",o.jsx("div",{style:{marginTop:"20px"},children:o.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none",padding:"10px 20px",border:"2px solid #FF6600",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});const{user:r,loading:i,logout:s}=e,{orders:a}=ti(),l=localStorage.getItem("token"),c=localStorage.getItem("role");if(i)return o.jsx("div",{style:{textAlign:"center",padding:"30px"},children:"Đang tải dữ liệu người dùng..."});if(!r||!l||!c)return o.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",o.jsx("div",{style:{marginTop:"20px"},children:o.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none",padding:"10px 20px",border:"2px solid #FF6600",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]});if(r.role!==c)return console.error("Role mismatch in RestaurantDashboard"),localStorage.clear(),o.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px"},children:["Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.",o.jsx("div",{style:{marginTop:"20px"},children:o.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none"},children:"Đăng nhập lại"})})]});if(r.role!=="restaurant"&&r.role!=="admin")return o.jsx("div",{style:{textAlign:"center",padding:"30px",color:"#d00"},children:"Bạn không có quyền truy cập trang này. Chỉ tài khoản nhà hàng mới có thể truy cập."});const u=new Set(a.map(m=>m.phone)).size,d=a.length,h=a.filter(m=>m.status==="Delivering").length,p=a.filter(m=>m.status==="Completed").length,g={totalCustomers:u,totalOrders:d,activeDrones:h,completedDeliveries:p},x=()=>{s(),L.success("👋 Đã đăng xuất"),window.location.href="/login"},b=[{id:"overview",icon:"📊",label:"Tổng quan"},{id:"drones",icon:"🚁",label:"Mô phỏng Drone"},{id:"menu",icon:"🍽️",label:"Quản lý Menu"},{id:"orders",icon:"📦",label:"Đơn hàng"}],S=()=>{switch(t){case"overview":return o.jsxs("div",{style:{padding:"24px"},children:[o.jsx(DD,{stats:g,theme:Xt}),o.jsxs(OR,{children:[o.jsx(zR,{children:"👨‍🍳"}),o.jsxs(VR,{children:[o.jsxs("h3",{children:["Chào mừng ",r==null?void 0:r.name,"!"]}),o.jsx("p",{children:"Quản lý nhà hàng của bạn một cách dễ dàng với FoodFast Drone Delivery"})]})]}),o.jsx(CR,{theme:Xt})]});case"drones":return o.jsx("div",{style:{padding:"24px"},children:o.jsx(K8,{theme:Xt})});case"menu":return o.jsx(n8,{restaurantId:r==null?void 0:r.id,theme:Xt});case"orders":return o.jsx($8,{restaurantId:r==null?void 0:r.id,theme:Xt});default:return null}};return o.jsx($R,{children:o.jsxs(TR,{children:[o.jsx(ER,{children:o.jsxs(PR,{children:[o.jsxs(AR,{children:[o.jsxs(DR,{children:[o.jsx("span",{children:"🏪"})," Bảng điều khiển nhà hàng"]}),o.jsxs(RR,{children:["Chào mừng trở lại, ",o.jsx("strong",{children:r==null?void 0:r.name}),"! Quản lý nhà hàng của bạn tại đây."]})]}),o.jsx(MR,{children:o.jsx(IR,{onClick:x,children:"🚪 Đăng xuất"})})]})}),o.jsx(FR,{children:b.map(m=>o.jsxs(NR,{$active:t===m.id,onClick:()=>n(m.id),children:[o.jsx(_R,{children:m.icon}),m.label]},m.id))}),o.jsx(tt,{mode:"wait",children:o.jsx(LR,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:S()},t)})]})})},HR=f.div`
  min-height: 100vh;
  background: ${e=>e.$light};
  padding: 24px;
`,UR=f.div`
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
`,WR=f.div``,GR=f.h1`
  color: ${e=>e.$primary};
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`,KR=f.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`,YR=f.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,qR=f.button`
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
`,QR=f.div`
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
`,bx=f.button`
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
`,Qb=({theme:e,restaurantName:t,children:n})=>{const{user:r,logout:i}=Ze(),s=wt(),[a,l]=v.useState("menu"),c=()=>{i(),s("/login")};return o.jsxs(HR,{$light:e.light,children:[o.jsxs(UR,{$accent:e.accent,children:[o.jsxs(WR,{children:[o.jsxs(GR,{$primary:e.primary,children:[t," bảng điều khiển"]}),o.jsxs(KR,{children:["Chào mừng trở lại !  ",r==null?void 0:r.name,"!"]})]}),o.jsx(YR,{children:o.jsx(qR,{onClick:c,children:"🚪 Đăng xuất"})})]}),o.jsxs(QR,{children:[o.jsx(bx,{$active:a==="menu",$primary:e.primary,onClick:()=>l("menu"),children:"🍽️ Thực đơn"}),o.jsx(bx,{$active:a==="orders",$primary:e.primary,onClick:()=>l("orders"),children:"📦 Theo dõi đơn hàng"})]}),n(a)]})},Yu={primary:"#E91E63",secondary:"#F06292",accent:"#F8BBD9",background:"#FCE4EC",light:"#FFF0F3"},jx="rest_2",XR="🧁 SweetDreams Bakery",ZR=()=>{const{user:e}=Ze();return v.useEffect(()=>(console.log("🍰 [SweetDreamsDashboard] Component mounted!"),console.log("👤 [SweetDreamsDashboard] Current user:",e),()=>{console.log("🍰 [SweetDreamsDashboard] Component unmounting")}),[e]),o.jsx(Qb,{theme:Yu,restaurantName:XR,children:t=>o.jsxs(o.Fragment,{children:[t==="menu"&&o.jsx(Up,{restaurantId:jx,theme:Yu}),t==="orders"&&o.jsx(Wp,{restaurantId:jx,theme:Yu})]})})},qu={primary:"#ffcc70",secondary:"#ff9671",accent:"#ffc75f",background:"#FFF8F0",light:"#FFFEF8"},Sx="restaurant_2",JR="🌺 Aloha Kitchen",eM=()=>{const{user:e}=Ze();return v.useEffect(()=>(console.log("🌺 [AlohaKitchenDashboard] Component mounted!"),console.log("👤 [AlohaKitchenDashboard] Current user:",e),()=>{console.log("🌺 [AlohaKitchenDashboard] Component unmounting")}),[e]),o.jsx(Qb,{theme:qu,restaurantName:JR,children:t=>o.jsxs(o.Fragment,{children:[t==="menu"&&o.jsx(Up,{restaurantId:Sx,theme:qu}),t==="orders"&&o.jsx(Wp,{restaurantId:Sx,theme:qu})]})})},kx=f.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background: #f8f9fa;
  min-height: 100vh;
`,tM=f.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`,nM=f.h1`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`,rM=f.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`,iM=f.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`,Es=f.button`
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
`,Pa=f.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  overflow: hidden;
`,Aa=f.div`
  padding: 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Da=f.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`,sM=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 24px;
`,Ra=f(O.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  text-align: center;
`,Ma=f.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
`,Ia=f.div`
  font-size: 14px;
  opacity: 0.9;
`,Qu=f.table`
  width: 100%;
  border-collapse: collapse;
`,Xu=f.thead`
  background: #f8f9fa;
`,we=f.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
`,Zu=f.tbody``,Ju=f.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`,be=f.td`
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
  color: #333;
`,ed=f.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${e=>{switch(e.status){case"active":return"background: #d4edda; color: #155724; border: 1px solid #a3e4a3;";case"suspended":return"background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;";case"admin":return"background: #cce5ff; color: #004085; border: 1px solid #99d6ff;";case"restaurant":return"background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;";case"customer":return"background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;";default:return"background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"}}}
`,Fa=f.button`
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
`,oM=f.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`,aM=f.div`
  font-size: 48px;
  margin-bottom: 16px;
`,lM=f.h3`
  margin: 0 0 8px 0;
  color: #333;
`,cM=f.p`
  margin: 0;
  color: #666;
`,uM=()=>{const{user:e}=Ze(),{orders:t}=ti(),[n,r]=v.useState("overview");if(!e||e.role!=="admin")return o.jsx(kx,{children:o.jsxs("div",{style:{textAlign:"center",padding:"60px 20px"},children:[o.jsx("h2",{children:"🚫 Truy cập bị từ chối"}),o.jsx("p",{children:"Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản admin."})]})});const i=Wi.length,s=Ol.length,a=t.length,l=t.reduce((S,m)=>S+m.total,0),c=(S,m)=>{L.success(`✅ Đã ${m} người dùng thành công`)},u=(S,m)=>{L.success(`✅ Đã ${m} nhà hàng thành công`)},d=()=>o.jsx(o.Fragment,{children:o.jsxs(sM,{children:[o.jsxs(Ra,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[o.jsx(Ma,{children:i}),o.jsx(Ia,{children:"Tổng số người dùng"})]}),o.jsxs(Ra,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[o.jsx(Ma,{children:s}),o.jsx(Ia,{children:"Tổng số nhà hàng"})]}),o.jsxs(Ra,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:[o.jsx(Ma,{children:a}),o.jsx(Ia,{children:"Tổng số đơn hàng"})]}),o.jsxs(Ra,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:[o.jsx(Ma,{children:q(l)}),o.jsx(Ia,{children:"Tổng doanh thu"})]})]})}),h=()=>o.jsxs(Pa,{children:[o.jsx(Aa,{children:o.jsx(Da,{children:"Quản lý người dùng"})}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs(Qu,{children:[o.jsx(Xu,{children:o.jsxs("tr",{children:[o.jsx(we,{children:"ID"}),o.jsx(we,{children:"Tên"}),o.jsx(we,{children:"Username"}),o.jsx(we,{children:"Vai trò"}),o.jsx(we,{children:"Email"}),o.jsx(we,{children:"Số điện thoại"}),o.jsx(we,{children:"Thao tác"})]})}),o.jsx(Zu,{children:Wi.map(S=>o.jsxs(Ju,{children:[o.jsx(be,{children:S.id}),o.jsx(be,{children:S.name}),o.jsx(be,{children:S.username}),o.jsx(be,{children:o.jsx(ed,{status:S.role,children:S.role==="admin"?"Quản trị viên":S.role==="restaurant"?"Nhà hàng":"Khách hàng"})}),o.jsx(be,{children:S.email||"-"}),o.jsx(be,{children:S.phone||"-"}),o.jsxs(be,{children:[o.jsx(Fa,{variant:"suspend",onClick:()=>c(S.id,"tạm khóa"),children:"Tạm khóa"}),o.jsx(Fa,{variant:"delete",onClick:()=>c(S.id,"xóa"),children:"Xóa"})]})]},S.id))})]})})]}),p=()=>o.jsxs(Pa,{children:[o.jsx(Aa,{children:o.jsx(Da,{children:"Quản lý nhà hàng"})}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs(Qu,{children:[o.jsx(Xu,{children:o.jsxs("tr",{children:[o.jsx(we,{children:"ID"}),o.jsx(we,{children:"Tên nhà hàng"}),o.jsx(we,{children:"Mô tả"}),o.jsx(we,{children:"Chủ sở hữu"}),o.jsx(we,{children:"Trạng thái"}),o.jsx(we,{children:"Ngày tạo"}),o.jsx(we,{children:"Thao tác"})]})}),o.jsx(Zu,{children:Ol.map(S=>{var m;return o.jsxs(Ju,{children:[o.jsx(be,{children:S.id}),o.jsx(be,{children:S.name}),o.jsx(be,{children:S.description}),o.jsx(be,{children:(m=Wi.find(y=>y.id===S.ownerId))==null?void 0:m.name}),o.jsx(be,{children:o.jsx(ed,{status:S.isActive?"active":"suspended",children:S.isActive?"Hoạt động":"Tạm khóa"})}),o.jsx(be,{children:Xl(S.createdAt).format("DD/MM/YYYY")}),o.jsxs(be,{children:[o.jsx(Fa,{variant:S.isActive?"suspend":"activate",onClick:()=>u(S.id,S.isActive?"tạm khóa":"kích hoạt"),children:S.isActive?"Tạm khóa":"Kích hoạt"}),o.jsx(Fa,{variant:"delete",onClick:()=>u(S.id,"xóa"),children:"Xóa"})]})]},S.id)})})]})})]}),g=()=>o.jsxs(Pa,{children:[o.jsx(Aa,{children:o.jsx(Da,{children:"Quản lý đơn hàng"})}),o.jsx("div",{style:{overflowX:"auto"},children:o.jsxs(Qu,{children:[o.jsx(Xu,{children:o.jsxs("tr",{children:[o.jsx(we,{children:"Mã đơn hàng"}),o.jsx(we,{children:"Khách hàng"}),o.jsx(we,{children:"Số điện thoại"}),o.jsx(we,{children:"Tổng tiền"}),o.jsx(we,{children:"Trạng thái"}),o.jsx(we,{children:"Ngày đặt"})]})}),o.jsx(Zu,{children:t.map(S=>o.jsxs(Ju,{children:[o.jsxs(be,{children:["#",S.id.slice(-6)]}),o.jsx(be,{children:S.name}),o.jsx(be,{children:S.phone}),o.jsx(be,{children:q(S.total)}),o.jsx(be,{children:o.jsx(ed,{status:S.status.toLowerCase(),children:S.status==="Processing"?"Đang chuẩn bị":S.status==="Delivering"?"Đang giao hàng":"Hoàn tất"})}),o.jsx(be,{children:Xl(S.time).format("DD/MM/YYYY HH:mm")})]},S.id))})]})})]}),x=()=>o.jsxs(Pa,{children:[o.jsx(Aa,{children:o.jsx(Da,{children:"Báo cáo và thống kê"})}),o.jsx("div",{style:{padding:"24px"},children:o.jsxs(oM,{children:[o.jsx(aM,{children:"📊"}),o.jsx(lM,{children:"Báo cáo chi tiết"}),o.jsx(cM,{children:"Tính năng báo cáo chi tiết sẽ được phát triển trong phiên bản tiếp theo."})]})})]}),b=()=>{switch(n){case"overview":return d();case"users":return h();case"restaurants":return p();case"orders":return g();case"reports":return x();default:return d()}};return o.jsxs(kx,{children:[o.jsxs(tM,{children:[o.jsx(nM,{children:"Bảng điều khiển quản trị"}),o.jsx(rM,{children:"Quản lý hệ thống FoodFast Drone Delivery"})]}),o.jsxs(iM,{children:[o.jsx(Es,{$active:n==="overview",onClick:()=>r("overview"),children:"📊 Tổng quan"}),o.jsx(Es,{$active:n==="users",onClick:()=>r("users"),children:"👥 Người dùng"}),o.jsx(Es,{$active:n==="restaurants",onClick:()=>r("restaurants"),children:"🏪 Nhà hàng"}),o.jsx(Es,{$active:n==="orders",onClick:()=>r("orders"),children:"📦 Đơn hàng"}),o.jsx(Es,{$active:n==="reports",onClick:()=>r("reports"),children:"📈 Báo cáo"})]}),b()]})},dM=f(O.button)`
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
`,hM=()=>{const{theme:e,toggleTheme:t}=B6();return o.jsx(dM,{onClick:t,whileHover:{scale:1.1},whileTap:{scale:.95},animate:{rotate:e==="dark"?180:0},transition:{duration:.3},"aria-label":`Switch to ${e==="light"?"dark":"light"} mode`,children:e==="light"?"🌙":"☀️"})},fM=f.div`
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
`,pM=f.div`
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
`,Cx=f(O.button)`
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
`,gM=f.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg);
`,mM=f.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
`,xM=({children:e})=>{const[t,n]=v.useState("desktop");return o.jsxs(o.Fragment,{children:[o.jsxs(pM,{children:[o.jsx(Cx,{$active:t==="mobile",onClick:()=>n("mobile"),whileHover:{scale:1.05},whileTap:{scale:.95},children:"📱 Mobile"}),o.jsx(Cx,{$active:t==="desktop",onClick:()=>n("desktop"),whileHover:{scale:1.05},whileTap:{scale:.95},children:"💻 Desktop"})]}),o.jsx(fM,{$viewMode:t,children:t==="mobile"?o.jsx(gM,{children:e}):o.jsx(mM,{children:e})})]})};function Ps({children:e,requireRole:t,fallback:n,redirectTo:r="/login",showErrorMessage:i=!1}){const{user:s,loading:a}=Ze(),l=vt(),c=localStorage.getItem("token"),u=localStorage.getItem("role");return a?n??o.jsx("div",{style:{padding:24,textAlign:"center"},children:"Đang tải thông tin đăng nhập…"}):!s||!c||!u?i||t&&(t==="restaurant"||Array.isArray(t)&&t.includes("restaurant"))?o.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px",fontWeight:"500"},children:["Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.",o.jsx("div",{style:{marginTop:"20px"},children:o.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none",padding:"10px 20px",border:"2px solid #FF6600",borderRadius:"8px",display:"inline-block",fontWeight:"600"},children:"Đăng nhập lại"})})]}):o.jsx(tn,{to:r,replace:!0,state:{from:l}}):s.role!==u?(console.error("Role mismatch between user and localStorage"),localStorage.removeItem("auth_user"),localStorage.removeItem("token"),localStorage.removeItem("role"),o.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"red",fontSize:"16px"},children:["Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.",o.jsx("div",{style:{marginTop:"20px"},children:o.jsx("a",{href:"/login",style:{color:"#FF6600",textDecoration:"none"},children:"Đăng nhập lại"})})]})):t&&!(Array.isArray(t)?t.includes(s.role):s.role===t)?o.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"#d00",fontSize:"16px"},children:["Bạn không có quyền truy cập trang này.",o.jsx("div",{style:{marginTop:"20px"},children:o.jsx("a",{href:"/",style:{color:"#FF6600",textDecoration:"none"},children:"Quay về trang chủ"})})]}):o.jsx(o.Fragment,{children:e})}const st={NAME:{REQUIRED:"Vui lòng nhập họ và tên",MIN_LENGTH:`Họ và tên phải có ít nhất ${Ye.NAME.MIN_LENGTH} ký tự`,MAX_LENGTH:`Họ và tên không được vượt quá ${Ye.NAME.MAX_LENGTH} ký tự`,INVALID_FORMAT:"Họ và tên chỉ được chứa chữ cái và khoảng trắng"},EMAIL:{REQUIRED:"Vui lòng nhập địa chỉ email",INVALID_FORMAT:"Địa chỉ email không hợp lệ"},PHONE:{REQUIRED:"Vui lòng nhập số điện thoại",INVALID_FORMAT:"Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có 10-11 chữ số",MIN_LENGTH:`Số điện thoại phải có ít nhất ${Ye.PHONE.MIN_LENGTH} chữ số`,MAX_LENGTH:`Số điện thoại không được vượt quá ${Ye.PHONE.MAX_LENGTH} chữ số`},ADDRESS:{REQUIRED:"Vui lòng nhập địa chỉ giao hàng",MIN_LENGTH:`Địa chỉ phải có ít nhất ${Ye.ADDRESS.MIN_LENGTH} ký tự`,MAX_LENGTH:`Địa chỉ không được vượt quá ${Ye.ADDRESS.MAX_LENGTH} ký tự`},PAYMENT:{REQUIRED:"Vui lòng chọn phương thức thanh toán"}},yM=e=>!e||e.trim().length===0?st.NAME.REQUIRED:e.length<Ye.NAME.MIN_LENGTH?st.NAME.MIN_LENGTH:e.length>Ye.NAME.MAX_LENGTH?st.NAME.MAX_LENGTH:Ye.NAME.PATTERN.test(e)?null:st.NAME.INVALID_FORMAT,vM=e=>!e||e.trim().length===0?st.EMAIL.REQUIRED:Ye.EMAIL.PATTERN.test(e)?null:st.EMAIL.INVALID_FORMAT,wM=e=>!e||e.trim().length===0?st.PHONE.REQUIRED:e.length<Ye.PHONE.MIN_LENGTH?st.PHONE.MIN_LENGTH:e.length>Ye.PHONE.MAX_LENGTH?st.PHONE.MAX_LENGTH:Ye.PHONE.PATTERN.test(e)?null:st.PHONE.INVALID_FORMAT,bM=e=>!e||e.trim().length===0?st.ADDRESS.REQUIRED:e.length<Ye.ADDRESS.MIN_LENGTH?st.ADDRESS.MIN_LENGTH:e.length>Ye.ADDRESS.MAX_LENGTH?st.ADDRESS.MAX_LENGTH:null,jM=e=>!e||e.trim().length===0?st.PAYMENT.REQUIRED:null,SM=e=>{const t={};if(e.name!==void 0){const n=yM(e.name);n&&(t.name=n)}if(e.email!==void 0){const n=vM(e.email);n&&(t.email=n)}if(e.phone!==void 0){const n=wM(e.phone);n&&(t.phone=n)}if(e.address!==void 0){const n=bM(e.address);n&&(t.address=n)}if(e.paymentMethod!==void 0){const n=jM(e.paymentMethod);n&&(t.paymentMethod=n)}return{isValid:Object.keys(t).length===0,errors:t}},kM=e=>e.trim().replace(/\s+/g," "),CM=e=>{const t=e.replace(/\D/g,"");return t.startsWith("84")?`+${t}`:t.startsWith("0")?t:`0${t}`},$M=f.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`,TM=f(O.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`,EM=f.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`,PM=f.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`,$x=f.div`
  grid-column: 1 / -1;
`,ci=f.div`
  display: flex;
  flex-direction: column;
`,ui=f.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
  font-size: 14px;
`,td=f.input`
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
`,AM=f.select`
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
`,Tx=f.textarea`
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
`;f.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;f.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text);
  
  input[type="radio"] {
    accent-color: var(--primary);
  }
`;const di=f(O.div)`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`,DM=f.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,Ex=f(O.button)`
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
`,As=f.span`
  color: #dc3545;
  margin-left: 2px;
`,RM=()=>{var d;const e=wt(),[t,n]=v.useState({name:"",email:"",phone:"",address:"",paymentMethod:"",notes:""}),[r,i]=v.useState({}),[s,a]=v.useState(!1),l=(h,p)=>{const g=kM(p);n(x=>({...x,[h]:g})),r[h]&&i(x=>({...x,[h]:""}))},c=async h=>{h.preventDefault();const p=SM(t);if(!p.isValid){i(p.errors),L.error("Vui lòng kiểm tra lại thông tin đã nhập.");return}a(!0);try{const g=CM(t.phone);localStorage.setItem("customer-info",JSON.stringify({...t,phone:g,timestamp:new Date().toISOString()})),await new Promise(x=>setTimeout(x,1e3)),L.success("✅ Thông tin khách hàng đã được lưu!"),e("/checkout")}catch{L.error("Có lỗi xảy ra. Vui lòng thử lại.")}finally{a(!1)}},u=()=>{e("/menu")};return o.jsx($M,{children:o.jsxs(TM,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[o.jsx(EM,{children:"Thông tin khách hàng"}),o.jsxs("form",{onSubmit:c,children:[o.jsxs(PM,{children:[o.jsxs(ci,{children:[o.jsxs(ui,{children:["Họ và tên ",o.jsx(As,{children:"*"})]}),o.jsx(td,{type:"text",value:t.name,onChange:h=>l("name",h.target.value),hasError:!!r.name,placeholder:"Nhập họ và tên đầy đủ"}),r.name&&o.jsx(di,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.name})]}),o.jsxs(ci,{children:[o.jsxs(ui,{children:["Email ",o.jsx(As,{children:"*"})]}),o.jsx(td,{type:"email",value:t.email,onChange:h=>l("email",h.target.value),hasError:!!r.email,placeholder:"example@email.com"}),r.email&&o.jsx(di,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.email})]}),o.jsxs(ci,{children:[o.jsxs(ui,{children:["Số điện thoại ",o.jsx(As,{children:"*"})]}),o.jsx(td,{type:"tel",value:t.phone,onChange:h=>l("phone",h.target.value),hasError:!!r.phone,placeholder:"0xxxxxxxxx hoặc +84xxxxxxxxx"}),r.phone&&o.jsx(di,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.phone})]}),o.jsxs(ci,{children:[o.jsxs(ui,{children:["Phương thức thanh toán ",o.jsx(As,{children:"*"})]}),o.jsxs(AM,{value:t.paymentMethod,onChange:h=>l("paymentMethod",h.target.value),hasError:!!r.paymentMethod,children:[o.jsx("option",{value:"",children:"Chọn phương thức thanh toán"}),o.jsx("option",{value:mm.VNPAY,children:"💳 VNPay"}),o.jsx("option",{value:mm.CASH,children:"💵 Thanh toán khi nhận hàng"})]}),r.paymentMethod&&o.jsx(di,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.paymentMethod})]}),o.jsx($x,{children:o.jsxs(ci,{children:[o.jsxs(ui,{children:["Địa chỉ giao hàng ",o.jsx(As,{children:"*"})]}),o.jsx(Tx,{value:t.address,onChange:h=>l("address",h.target.value),hasError:!!r.address,placeholder:"Số nhà, tên đường, phường/xã, quận/huyện, thành phố"}),r.address&&o.jsx(di,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.address})]})}),o.jsx($x,{children:o.jsxs(ci,{children:[o.jsx(ui,{children:"Ghi chú thêm (tùy chọn)"}),o.jsx(Tx,{value:t.notes,onChange:h=>l("notes",h.target.value),hasError:!!r.notes,placeholder:"Ghi chú đặc biệt cho đơn hàng...",maxLength:200}),r.notes&&o.jsx(di,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.3},children:r.notes}),o.jsxs("div",{style:{fontSize:"12px",color:"#6c757d",marginTop:"4px"},children:[((d=t.notes)==null?void 0:d.length)||0,"/200 ký tự"]})]})})]}),o.jsxs(DM,{children:[o.jsx(Ex,{type:"button",variant:"secondary",onClick:u,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Hủy"}),o.jsx(Ex,{type:"submit",variant:"primary",disabled:s,whileHover:{scale:1.02},whileTap:{scale:.98},children:s?"Đang xử lý...":"Tiếp tục"})]})]})]})})},MM=f.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,IM=f.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`,FM=f.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
`,NM=f.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Px=f.input`
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
`,_M=f.button`
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
`,LM=f.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
`,Xb=()=>{const[e,t]=v.useState(""),[n,r]=v.useState(""),[i,s]=v.useState(""),[a,l]=v.useState(!1),{login:c}=ms(),u=wt(),d=async h=>{h.preventDefault(),s(""),l(!0);const p=await c(e,n);p.ok?u("/admin/dashboard"):s(p.message||"Login failed"),l(!1)};return o.jsx(MM,{children:o.jsxs(IM,{children:[o.jsx(FM,{children:"🔐 Đăng nhập quản trị"}),o.jsxs(NM,{onSubmit:d,children:[o.jsx(Px,{type:"text",placeholder:"Tên đăng nhập",value:e,onChange:h=>t(h.target.value),required:!0}),o.jsx(Px,{type:"password",placeholder:"Mật khẩu",value:n,onChange:h=>r(h.target.value),required:!0}),o.jsx(_M,{type:"submit",disabled:a,children:a?"Đang đăng nhập...":"Đăng nhập"}),i&&o.jsx(LM,{children:i==="Invalid admin credentials"?"Thông tin đăng nhập không hợp lệ":i})]})]})})},OM=f(O.div)`
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
`,zM=f.div`
  padding: 0 30px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
`,VM=f.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`,BM=f.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`,nd=f.div`
  margin-bottom: 30px;
`,rd=f.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  opacity: 0.6;
  padding: 0 30px;
  margin-bottom: 15px;
`,Ds=f(O.div)`
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
`,Rs=f.div`
  font-size: 20px;
  width: 24px;
  text-align: center;
`,Ms=f.div`
  font-size: 15px;
  font-weight: 500;
  flex: 1;
`,Ax=f.div`
  background: ${e=>e.$color||"rgba(255, 255, 255, 0.2)"};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
`,HM=f.div`
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
`,UM=f.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`,WM=f.div`
  font-size: 12px;
  opacity: 0.7;
`,GM=({activeTab:e,onTabChange:t,adminName:n,stats:r})=>o.jsxs(OM,{initial:{x:-300},animate:{x:0},transition:{type:"spring",stiffness:100},children:[o.jsxs(zM,{children:[o.jsxs(VM,{children:[o.jsx("span",{children:"🚁"}),"FoodFast Admin"]}),o.jsx(BM,{children:"Trung tâm Quản trị"})]}),o.jsxs(nd,{children:[o.jsx(rd,{children:"Bảng điều khiển"}),o.jsxs(Ds,{$active:e==="overview",onClick:()=>t("overview"),whileHover:{x:5},whileTap:{scale:.98},children:[o.jsx(Rs,{children:"📊"}),o.jsx(Ms,{children:"Tổng quan"})]})]}),o.jsxs(nd,{children:[o.jsx(rd,{children:"Quản lý"}),o.jsxs(Ds,{$active:e==="restaurants",onClick:()=>t("restaurants"),whileHover:{x:5},whileTap:{scale:.98},children:[o.jsx(Rs,{children:"🏪"}),o.jsx(Ms,{children:"Nhà hàng"}),r!=null&&r.pendingRestaurants?o.jsx(Ax,{$color:"#FF6B6B",children:r.pendingRestaurants}):null]}),o.jsxs(Ds,{$active:e==="customers",onClick:()=>t("customers"),whileHover:{x:5},whileTap:{scale:.98},children:[o.jsx(Rs,{children:"👥"}),o.jsx(Ms,{children:"Khách hàng"})]}),o.jsxs(Ds,{$active:e==="drones",onClick:()=>t("drones"),whileHover:{x:5},whileTap:{scale:.98},children:[o.jsx(Rs,{children:"🚁"}),o.jsx(Ms,{children:"Đội máy bay"}),r!=null&&r.maintenanceDrones?o.jsx(Ax,{$color:"#FFA500",children:r.maintenanceDrones}):null]})]}),o.jsxs(nd,{children:[o.jsx(rd,{children:"Hệ thống"}),o.jsxs(Ds,{$active:e==="logs",onClick:()=>t("logs"),whileHover:{x:5},whileTap:{scale:.98},children:[o.jsx(Rs,{children:"📋"}),o.jsx(Ms,{children:"Nhật ký hệ thống"})]})]}),o.jsxs(HM,{children:[o.jsx(UM,{children:n}),o.jsx(WM,{children:"Quản trị viên hệ thống"})]})]}),KM=()=>{const e=[],t=["Idle","Delivering","Charging","Maintenance"];return Ol.forEach((n,r)=>{const i=r===0?5:r===1?4:6;for(let s=0;s<i;s++){const a=t[Math.floor(Math.random()*t.length)];e.push({id:`DRONE-${n.id}-${String(s+1).padStart(3,"0")}`,restaurantId:n.id,restaurantName:n.name,status:a,battery:a==="Charging"?30+Math.random()*40:60+Math.random()*40,currentOrderId:a==="Delivering"?`ORD-${Math.floor(1e4+Math.random()*9e4)}`:void 0,lastMaintenance:Date.now()-Math.floor(Math.random()*30)*864e5,flaggedForIssue:Math.random()>.9,issueDescription:Math.random()>.9?"Battery degradation detected":void 0})}}),e},YM=()=>Ol.map((e,t)=>{var n;return{id:e.id,name:e.name,category:e.category||"General",status:e.isActive?"Active":t%5===0?"Pending":"Inactive",ownerId:e.ownerId,ownerName:((n=Wi.find(r=>r.id===e.ownerId))==null?void 0:n.name)||"Unknown",totalOrders:Math.floor(Math.random()*1e3)+100,totalRevenue:Math.floor(Math.random()*5e7)+1e7,rating:e.rating||4.5,droneCount:t===0?5:t===1?4:6,location:e.location||"Unknown",createdAt:e.createdAt}}),qM=()=>Wi.filter(t=>t.role==="customer").map((t,n)=>({id:t.id,name:t.name,phone:t.phone||`098765${String(n).padStart(4,"0")}`,email:t.email||`${t.username}@example.com`,totalOrders:t.orderCount||Math.floor(Math.random()*50)+1,totalSpend:Math.floor(Math.random()*1e7)+5e5,accountStatus:Math.random()>.95?"Suspended":"Active",createdAt:t.createdAt||Date.now()-Math.floor(Math.random()*180)*864e5,lastOrderDate:Date.now()-Math.floor(Math.random()*30)*864e5})),QM=[{id:"log_001",timestamp:Date.now()-36e5,adminId:"admin_1",adminName:"System Administrator",action:"restaurant_approved",targetType:"restaurant",targetId:"restaurant_2",targetName:"Aloha Kitchen",details:"Approved restaurant application after verification",severity:"info"},{id:"log_002",timestamp:Date.now()-72e5,adminId:"admin_1",adminName:"System Administrator",action:"drone_flagged",targetType:"drone",targetId:"DRONE-rest_1-001",targetName:"DRONE-rest_1-001",details:"Flagged for battery degradation issue",severity:"warning"},{id:"log_003",timestamp:Date.now()-864e5,adminId:"admin_1",adminName:"System Administrator",action:"customer_suspended",targetType:"customer",targetId:"u2",targetName:"Customer User",details:"Temporarily suspended due to payment disputes",severity:"warning"}],Ko=()=>({drones:KM(),restaurants:YM(),customers:qM(),logs:[...QM]}),Ce={RESTAURANTS:"admin_restaurants",CUSTOMERS:"admin_customers",DRONES:"admin_drones",LOGS:"admin_system_logs"},Ic=(e,t)=>{try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.error(`Error reading ${e} from localStorage:`,n),t}},Ot=(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error(`Error saving ${e} to localStorage:`,n)}},XM=()=>{const e=Ko();localStorage.getItem(Ce.RESTAURANTS)||Ot(Ce.RESTAURANTS,e.restaurants),localStorage.getItem(Ce.CUSTOMERS)||Ot(Ce.CUSTOMERS,e.customers),localStorage.getItem(Ce.DRONES)||Ot(Ce.DRONES,e.drones),localStorage.getItem(Ce.LOGS)||Ot(Ce.LOGS,e.logs)};XM();const Xr=()=>{const e=Ko();return Ic(Ce.RESTAURANTS,e.restaurants)},ZM=(e,t,n,r)=>{try{const i=Xr(),s=i.findIndex(u=>u.id===e);if(s===-1)return L.error("Không tìm thấy nhà hàng"),!1;const a=i[s];i[s]={...a,status:t},Ot(Ce.RESTAURANTS,i),ii({adminId:n,adminName:r,action:t==="Active"?"restaurant_activated":t==="Inactive"?"restaurant_suspended":"restaurant_approved",targetType:"restaurant",targetId:e,targetName:a.name,details:`Status changed to ${t}`,severity:t==="Inactive"?"warning":"info"});const c=t==="Active"?"Hoạt động":t==="Inactive"?"Không hoạt động":"Chờ duyệt";return L.success(`Cập nhật trạng thái nhà hàng ${a.name} thành ${c}`),!0}catch(i){return console.error("Error updating restaurant status:",i),L.error("Cập nhật trạng thái nhà hàng thất bại"),!1}},Mo=()=>{const e=Ko();return Ic(Ce.CUSTOMERS,e.customers)},JM=(e,t,n)=>{try{const r=Mo(),i=r.findIndex(a=>a.id===e);if(i===-1)return L.error("Không tìm thấy khách hàng"),!1;const s=r[i];return r[i]={...s,accountStatus:"Suspended"},Ot(Ce.CUSTOMERS,r),ii({adminId:t,adminName:n,action:"customer_suspended",targetType:"customer",targetId:e,targetName:s.name,details:"Customer account suspended",severity:"warning"}),L.success(`Tạm ngưng khách hàng ${s.name} thành công`),!0}catch(r){return console.error("Error suspending customer:",r),L.error("Tạm ngưng khách hàng thất bại"),!1}},eI=(e,t,n)=>{try{const r=Mo(),i=r.findIndex(a=>a.id===e);if(i===-1)return L.error("Không tìm thấy khách hàng"),!1;const s=r[i];return r[i]={...s,accountStatus:"Active"},Ot(Ce.CUSTOMERS,r),ii({adminId:t,adminName:n,action:"customer_activated",targetType:"customer",targetId:e,targetName:s.name,details:"Customer account reactivated",severity:"info"}),L.success(`Kích hoạt lại khách hàng ${s.name} thành công`),!0}catch(r){return console.error("Error reactivating customer:",r),L.error("Kích hoạt lại khách hàng thất bại"),!1}},os=()=>{const e=Ko();return Ic(Ce.DRONES,e.drones)},tI=(e,t,n,r)=>{try{const i=os(),s=i.findIndex(l=>l.id===e);if(s===-1)return L.error("Không tìm thấy máy bay"),!1;const a=i[s];return i[s]={...a,flaggedForIssue:!0,issueDescription:t,status:"Maintenance"},Ot(Ce.DRONES,i),ii({adminId:n,adminName:r,action:"drone_flagged",targetType:"drone",targetId:e,targetName:e,details:`Flagged for issue: ${t}`,severity:"warning"}),L.success(`Đánh dấu máy bay ${e} cần bảo trì`),!0}catch(i){return console.error("Error flagging drone:",i),L.error("Đánh dấu máy bay thất bại"),!1}},nI=(e,t,n)=>{try{const r=os(),i=r.findIndex(a=>a.id===e);if(i===-1)return L.error("Không tìm thấy máy bay"),!1;const s=r[i];return r[i]={...s,flaggedForIssue:!1,issueDescription:void 0,status:"Idle"},Ot(Ce.DRONES,r),ii({adminId:t,adminName:n,action:"drone_cleared",targetType:"drone",targetId:e,targetName:e,details:"Cleared maintenance flag",severity:"info"}),L.success(`Xóa cờ máy bay ${e} và đặt về Rảnh rỗi`),!0}catch(r){return console.error("Error clearing drone flag:",r),L.error("Xóa cờ máy bay thất bại"),!1}},rI=(e,t,n,r,i)=>{try{const s=os(),a=Xr(),l=s.findIndex(h=>h.id===e),c=a.find(h=>h.id===t);if(l===-1)return L.error("Không tìm thấy máy bay"),!1;if(!c)return L.error("Không tìm thấy nhà hàng đích"),!1;if(c.status!=="Active")return L.error("Không thể phân công cho nhà hàng không hoạt động"),!1;const u=s[l],d=u.restaurantName;return s[l]={...u,restaurantId:t,restaurantName:n,status:"Idle",currentOrderId:void 0},Ot(Ce.DRONES,s),ii({adminId:r,adminName:i,action:"drone_cleared",targetType:"drone",targetId:e,targetName:e,details:`Reassigned from ${d} to ${n}`,severity:"info"}),L.success(`Phân công lại máy bay ${e} cho ${n}`),!0}catch(s){return console.error("Error reassigning drone:",s),L.error("Phân công lại máy bay thất bại"),!1}},cl=()=>{const e=Ko();return Ic(Ce.LOGS,e.logs)},ii=e=>{try{const t=cl(),n={...e,id:`log_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,timestamp:Date.now()};t.unshift(n),t.length>100&&t.splice(100),Ot(Ce.LOGS,t)}catch(t){console.error("Error adding system log:",t)}},Dx=()=>{const e=Xr(),t=Mo(),n=os(),r=e.filter(h=>h.status==="Active").length,i=e.filter(h=>h.status==="Pending").length,s=e.reduce((h,p)=>h+p.totalOrders,0),a=e.reduce((h,p)=>h+p.totalRevenue,0),l=n.filter(h=>h.status==="Delivering").length,c=n.filter(h=>h.status==="Idle").length,u=n.filter(h=>h.status==="Charging").length,d=n.filter(h=>h.status==="Maintenance").length;return{totalCustomers:t.length,totalRestaurants:e.length,activeRestaurants:r,pendingRestaurants:i,totalOrders:s,totalRevenue:a,totalDrones:n.length,activeDrones:l,idleDrones:c,chargingDrones:u,maintenanceDrones:d}},iI=(e,t,n,r,i,s)=>{try{return ii({adminId:i,adminName:s,action:"emergency_override",targetType:e,targetId:t,targetName:n,details:`Emergency override: ${r}`,severity:"critical"}),L.warning(`Thực hiện can thiệp khẩn cấp: ${r}`),!0}catch(a){return console.error("Error performing emergency override:",a),L.error("Thực hiện can thiệp khẩn cấp thất bại"),!1}},sI=f.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,oI=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,aI=f.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,lI=f.input`
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
`,cI=f.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,Na=f.button`
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
`,uI=f.div`
  overflow-x: auto;
`,dI=f.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`,hI=f.thead`
  background: #f8f9fa;
`,wr=f.th`
  padding: 15px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e1e5e9;
`,fI=f.tbody``,pI=f(O.tr)`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`,br=f.td`
  padding: 18px 15px;
  font-size: 14px;
  color: #333;
`,gI=f.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`,mI=f.div`
  font-size: 12px;
  color: #666;
`,xI=f.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.$status){case"Active":return"#d4edda";case"Pending":return"#fff3cd";case"Inactive":return"#f8d7da";default:return"#e1e5e9"}}};
  color: ${e=>{switch(e.$status){case"Active":return"#155724";case"Pending":return"#856404";case"Inactive":return"#721c24";default:return"#666"}}};
`,yI=f.div`
  display: flex;
  align-items: center;
  gap: 5px;
`,id=f.button`
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
`,vI=f(O.div)`
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
`,wI=f(O.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`,bI=f.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`,jI=f.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
`,SI=f.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`,Rx=f.button`
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
`,kI=f.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,Mx=({restaurants:e,onUpdate:t})=>{const{admin:n}=ms(),[r,i]=v.useState(""),[s,a]=v.useState("All"),[l,c]=v.useState(null),u=e.filter(p=>{const g=p.name.toLowerCase().includes(r.toLowerCase())||p.category.toLowerCase().includes(r.toLowerCase()),x=s==="All"||p.status===s;return g&&x}),d=(p,g)=>{c({restaurant:p,action:g})},h=()=>{if(!l||!n)return;ZM(l.restaurant.id,l.action,n.id,n.name)&&(t(),c(null))};return o.jsxs(sI,{children:[o.jsxs(oI,{children:[o.jsx(aI,{children:"Quản lý nhà hàng"}),o.jsx(lI,{type:"text",placeholder:"Tìm kiếm nhà hàng...",value:r,onChange:p=>i(p.target.value)})]}),o.jsxs(cI,{children:[o.jsxs(Na,{$active:s==="All",onClick:()=>a("All"),children:["Tất cả (",e.length,")"]}),o.jsxs(Na,{$active:s==="Active",onClick:()=>a("Active"),children:["🟢 Hoạt động (",e.filter(p=>p.status==="Active").length,")"]}),o.jsxs(Na,{$active:s==="Pending",onClick:()=>a("Pending"),children:["🟠 Chờ duyệt (",e.filter(p=>p.status==="Pending").length,")"]}),o.jsxs(Na,{$active:s==="Inactive",onClick:()=>a("Inactive"),children:["🔴 Không hoạt động (",e.filter(p=>p.status==="Inactive").length,")"]})]}),o.jsx(uI,{children:o.jsxs(dI,{children:[o.jsx(hI,{children:o.jsxs("tr",{children:[o.jsx(wr,{children:"Nhà hàng"}),o.jsx(wr,{children:"Trạng thái"}),o.jsx(wr,{children:"Đơn hàng"}),o.jsx(wr,{children:"Doanh thu"}),o.jsx(wr,{children:"Đánh giá"}),o.jsx(wr,{children:"Máy bay"}),o.jsx(wr,{children:"Thao tác"})]})}),o.jsx(fI,{children:u.length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:7,children:o.jsxs(kI,{children:[o.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"🏪"}),o.jsx("div",{children:"Không tìm thấy nhà hàng"})]})})}):u.map((p,g)=>o.jsxs(pI,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:g*.05},children:[o.jsxs(br,{children:[o.jsx(gI,{children:p.name}),o.jsx(mI,{children:p.category})]}),o.jsx(br,{children:o.jsx(xI,{$status:p.status,children:p.status})}),o.jsx(br,{children:p.totalOrders.toLocaleString()}),o.jsx(br,{children:q(p.totalRevenue)}),o.jsx(br,{children:o.jsxs(yI,{children:["⭐ ",p.rating.toFixed(1)]})}),o.jsxs(br,{children:[p.droneCount," chiếc"]}),o.jsxs(br,{children:[p.status==="Pending"&&o.jsx(id,{$variant:"approve",onClick:()=>d(p,"Active"),children:"Phê duyệt"}),p.status==="Active"&&o.jsx(id,{$variant:"suspend",onClick:()=>d(p,"Inactive"),children:"Tạm ngưng"}),p.status==="Inactive"&&o.jsx(id,{$variant:"approve",onClick:()=>d(p,"Active"),children:"Kích hoạt"})]})]},p.id))})]})}),o.jsx(tt,{children:l&&o.jsx(vI,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>c(null),children:o.jsxs(wI,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:p=>p.stopPropagation(),children:[o.jsx(bI,{children:"Xác nhận hành động"}),o.jsxs(jI,{children:["Bạn có chắc chắn muốn thay đổi trạng thái của ",o.jsx("strong",{children:l.restaurant.name})," sang"," ",o.jsx("strong",{children:l.action==="Active"?"Hoạt động":l.action==="Inactive"?"Không hoạt động":"Chờ duyệt"}),"?",l.action==="Inactive"&&o.jsx("span",{style:{display:"block",marginTop:"10px",color:"#dc3545"},children:"⚠️ Hành động này sẽ tạm thời vô hiệu hóa tất cả dịch vụ của nhà hàng này."})]}),o.jsxs(SI,{children:[o.jsx(Rx,{onClick:()=>c(null),children:"Hủy"}),o.jsx(Rx,{$primary:!0,onClick:h,children:"Xác nhận"})]})]})})})]})},CI=f.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,$I=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,TI=f.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,EI=f.input`
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
`,PI=f.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`,sd=f.button`
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
`,AI=f.div`
  overflow-x: auto;
`,DI=f.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`,RI=f.thead`
  background: #f8f9fa;
`,jr=f.th`
  padding: 15px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e1e5e9;
`,MI=f.tbody``,II=f(O.tr)`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`,Sr=f.td`
  padding: 18px 15px;
  font-size: 14px;
  color: #333;
`,FI=f.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`,NI=f.div`
  font-size: 12px;
  color: #666;
`,Ix=f.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.$status==="Active"?"#d4edda":"#f8d7da"};
  color: ${e=>e.$status==="Active"?"#155724":"#721c24"};
`,od=f.button`
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
`,_I=f(O.div)`
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
`,LI=f(O.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
  overflow-y: auto;
`,ad=f.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`,Fx=f.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
`,ld=f.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`,Is=f.button`
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
`,OI=f.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,En=f.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`,Pn=f.span`
  color: #666;
  font-weight: 500;
`,An=f.span`
  color: #333;
  font-weight: 600;
`,zI=({customers:e,onUpdate:t})=>{const{admin:n}=ms(),[r,i]=v.useState(""),[s,a]=v.useState("All"),[l,c]=v.useState(null),[u,d]=v.useState(null),h=e.filter(m=>{const y=m.name.toLowerCase().includes(r.toLowerCase())||m.email.toLowerCase().includes(r.toLowerCase())||m.phone.includes(r),w=s==="All"||m.accountStatus===s;return y&&w}),p=(m,y)=>{d(m),c(y)},g=()=>{c(null),d(null)},x=()=>{if(!u||!n)return;JM(u.id,n.id,n.name)&&(t(),g())},b=()=>{if(!u||!n)return;eI(u.id,n.id,n.name)&&(t(),g())},S=m=>new Date(m).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return o.jsxs(CI,{children:[o.jsxs($I,{children:[o.jsx(TI,{children:"Quản lý khách hàng"}),o.jsx(EI,{type:"text",placeholder:"Tìm kiếm khách hàng...",value:r,onChange:m=>i(m.target.value)})]}),o.jsxs(PI,{children:[o.jsxs(sd,{$active:s==="All",onClick:()=>a("All"),children:["Tất cả (",e.length,")"]}),o.jsxs(sd,{$active:s==="Active",onClick:()=>a("Active"),children:["🟢 Hoạt động (",e.filter(m=>m.accountStatus==="Active").length,")"]}),o.jsxs(sd,{$active:s==="Suspended",onClick:()=>a("Suspended"),children:["🔴 Tạm ngưng (",e.filter(m=>m.accountStatus==="Suspended").length,")"]})]}),o.jsx(AI,{children:o.jsxs(DI,{children:[o.jsx(RI,{children:o.jsxs("tr",{children:[o.jsx(jr,{children:"Khách hàng"}),o.jsx(jr,{children:"Số điện thoại"}),o.jsx(jr,{children:"Đơn hàng"}),o.jsx(jr,{children:"Tổng chi tiêu"}),o.jsx(jr,{children:"Trạng thái"}),o.jsx(jr,{children:"Ngày tham gia"}),o.jsx(jr,{children:"Thao tác"})]})}),o.jsx(MI,{children:h.length===0?o.jsx("tr",{children:o.jsx("td",{colSpan:7,children:o.jsxs(OI,{children:[o.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"👥"}),o.jsx("div",{children:"Không tìm thấy khách hàng"})]})})}):h.map((m,y)=>o.jsxs(II,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:y*.05},children:[o.jsxs(Sr,{children:[o.jsx(FI,{children:m.name}),o.jsx(NI,{children:m.email})]}),o.jsx(Sr,{children:m.phone}),o.jsx(Sr,{children:m.totalOrders}),o.jsx(Sr,{children:q(m.totalSpend)}),o.jsx(Sr,{children:o.jsx(Ix,{$status:m.accountStatus,children:m.accountStatus})}),o.jsx(Sr,{children:S(m.createdAt)}),o.jsxs(Sr,{children:[o.jsx(od,{$variant:"view",onClick:()=>p(m,"view"),children:"Xem"}),m.accountStatus==="Active"?o.jsx(od,{$variant:"suspend",onClick:()=>p(m,"suspend"),children:"Tạm ngưng"}):o.jsx(od,{$variant:"activate",onClick:()=>p(m,"activate"),children:"Kích hoạt"})]})]},m.id))})]})}),o.jsx(tt,{children:l&&u&&o.jsx(_I,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:g,children:o.jsxs(LI,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:m=>m.stopPropagation(),children:[l==="view"&&o.jsxs(o.Fragment,{children:[o.jsx(ad,{children:"Chi tiết khách hàng"}),o.jsxs("div",{style:{marginBottom:"25px"},children:[o.jsxs(En,{children:[o.jsx(Pn,{children:"Tên:"}),o.jsx(An,{children:u.name})]}),o.jsxs(En,{children:[o.jsx(Pn,{children:"Email:"}),o.jsx(An,{children:u.email})]}),o.jsxs(En,{children:[o.jsx(Pn,{children:"Số điện thoại:"}),o.jsx(An,{children:u.phone})]}),o.jsxs(En,{children:[o.jsx(Pn,{children:"Tổng đơn hàng:"}),o.jsx(An,{children:u.totalOrders})]}),o.jsxs(En,{children:[o.jsx(Pn,{children:"Tổng chi tiêu:"}),o.jsx(An,{children:q(u.totalSpend)})]}),o.jsxs(En,{children:[o.jsx(Pn,{children:"Trạng thái tài khoản:"}),o.jsx(An,{children:o.jsx(Ix,{$status:u.accountStatus,children:u.accountStatus==="Active"?"Hoạt động":"Tạm ngưng"})})]}),o.jsxs(En,{children:[o.jsx(Pn,{children:"Ngày tham gia:"}),o.jsx(An,{children:S(u.createdAt)})]}),u.lastOrderDate&&o.jsxs(En,{children:[o.jsx(Pn,{children:"Đơn hàng gần nhất:"}),o.jsx(An,{children:S(u.lastOrderDate)})]})]}),o.jsx(ld,{children:o.jsx(Is,{onClick:g,children:"Đóng"})})]}),l==="suspend"&&o.jsxs(o.Fragment,{children:[o.jsx(ad,{children:"Tạm ngưng tài khoản khách hàng"}),o.jsxs(Fx,{children:["Bạn có chắc chắn muốn tạm ngưng tài khoản của ",o.jsx("strong",{children:u.name}),"?",o.jsx("span",{style:{display:"block",marginTop:"15px",color:"#dc3545",fontWeight:500},children:"⚠️ Hành động này sẽ:"}),o.jsxs("ul",{style:{marginTop:"10px",paddingLeft:"20px"},children:[o.jsx("li",{children:"Ngăn khách hàng đặt đơn hàng mới"}),o.jsx("li",{children:"Tạm thời vô hiệu hóa quyền truy cập tài khoản"}),o.jsx("li",{children:"Được ghi lại trong hệ thống"})]})]}),o.jsxs(ld,{children:[o.jsx(Is,{onClick:g,children:"Hủy"}),o.jsx(Is,{$danger:!0,onClick:x,children:"Xác nhận tạm ngưng"})]})]}),l==="activate"&&o.jsxs(o.Fragment,{children:[o.jsx(ad,{children:"Kích hoạt lại tài khoản khách hàng"}),o.jsxs(Fx,{children:["Bạn có chắc chắn muốn kích hoạt lại tài khoản của ",o.jsx("strong",{children:u.name}),"?",o.jsx("span",{style:{display:"block",marginTop:"10px",color:"#28a745"},children:"✓ Hành động này sẽ khôi phục toàn bộ quyền truy cập tài khoản và khả năng đặt hàng."})]}),o.jsxs(ld,{children:[o.jsx(Is,{onClick:g,children:"Hủy"}),o.jsx(Is,{$primary:!0,onClick:b,children:"Xác nhận kích hoạt"})]})]})]})})})]})},VI=f.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,BI=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,HI=f.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,UI=f.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,Fs=f.button`
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
`,WI=f.div`
  margin-bottom: 30px;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
`,GI=f.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,KI=f.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`,YI=f.div`
  font-size: 14px;
  opacity: 0.9;
`,qI=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 25px;
  background: #f8f9fa;
`,QI=f(O.div)`
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
`,XI=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`,ZI=f.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,JI=f.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.$status){case"Idle":return"#d4edda";case"Delivering":return"#cce5ff";case"Charging":return"#fff3cd";case"Maintenance":return"#f8d7da";default:return"#e1e5e9"}}};
  color: ${e=>{switch(e.$status){case"Idle":return"#155724";case"Delivering":return"#004085";case"Charging":return"#856404";case"Maintenance":return"#721c24";default:return"#666"}}};
`,eF=f.div`
  margin-bottom: 12px;
`,cd=f.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
`,ud=f.span`
  color: #666;
`,dd=f.span`
  color: #333;
  font-weight: 500;
`,tF=f.div`
  width: 100%;
  height: 8px;
  background: #e1e5e9;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`,nF=f.div`
  height: 100%;
  width: ${e=>e.$level}%;
  background: ${e=>e.$level<20?"#dc3545":e.$level<50?"#ffc107":"#28a745"};
  transition: all 0.3s ease;
`,rF=f.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
`,hd=f.button`
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
`,iF=f.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
`,sF=f.div`
  background: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 10px;
  border-left: 3px solid #ffc107;
`,oF=f(O.div)`
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
`,aF=f(O.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`,fd=f.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`,pd=f.p`
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
`,lF=f.textarea`
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
`,gd=f.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`,hi=f.button`
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
`,cF=f.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
`,uF=({drones:e,onUpdate:t})=>{const{admin:n}=ms(),[r,i]=v.useState("All"),[s,a]=v.useState(null),[l,c]=v.useState(""),[u,d]=v.useState(""),[h,p]=v.useState(Xr()),g=e.reduce((C,T)=>(C[T.restaurantId]||(C[T.restaurantId]={restaurantName:T.restaurantName,drones:[]}),C[T.restaurantId].drones.push(T),C),{}),x=C=>C.filter(T=>r==="All"||T.status===r),b=(C,T)=>{a({drone:C,action:T}),c(C.issueDescription||""),d(""),p(Xr())},S=()=>{a(null),c(""),d("")},m=()=>{if(!s||!n||!l.trim())return;tI(s.drone.id,l.trim(),n.id,n.name)&&(t(),S())},y=()=>{if(!s||!n)return;nI(s.drone.id,n.id,n.name)&&(t(),S())},w=()=>{if(!s||!n||!u)return;const C=h.find(P=>P.id===u);if(!C)return;rI(s.drone.id,u,C.name,n.id,n.name)&&(t(),S())},$=C=>{const T=Math.floor((Date.now()-C)/864e5);return T===0?"Today":T===1?"Yesterday":`${T} days ago`},j=e.length,k={Idle:e.filter(C=>C.status==="Idle").length,Delivering:e.filter(C=>C.status==="Delivering").length,Charging:e.filter(C=>C.status==="Charging").length,Maintenance:e.filter(C=>C.status==="Maintenance").length};return o.jsxs(VI,{children:[o.jsx(BI,{children:o.jsx(HI,{children:"Giám sát đội máy bay"})}),o.jsxs(UI,{children:[o.jsxs(Fs,{$active:r==="All",onClick:()=>i("All"),children:["Tất cả (",j,")"]}),o.jsxs(Fs,{$active:r==="Idle",onClick:()=>i("Idle"),children:["🟢 Rảnh rỗi (",k.Idle,")"]}),o.jsxs(Fs,{$active:r==="Delivering",onClick:()=>i("Delivering"),children:["🔵 Đang giao hàng (",k.Delivering,")"]}),o.jsxs(Fs,{$active:r==="Charging",onClick:()=>i("Charging"),children:["🟡 Đang sạc (",k.Charging,")"]}),o.jsxs(Fs,{$active:r==="Maintenance",onClick:()=>i("Maintenance"),children:["🔴 Bảo trì (",k.Maintenance,")"]})]}),o.jsxs("div",{style:{marginTop:"30px"},children:[Object.entries(g).map(([C,{restaurantName:T,drones:P}])=>{const A=x(P);return A.length===0?null:o.jsxs(WI,{children:[o.jsxs(GI,{children:[o.jsxs(KI,{children:["🏪 ",T]}),o.jsxs(YI,{children:[A.length," / ",P.length," máy bay"]})]}),o.jsx(qI,{children:A.map((D,W)=>o.jsxs(QI,{$flagged:D.flaggedForIssue,initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:W*.05},children:[D.flaggedForIssue&&o.jsx(iF,{children:"🚩"}),o.jsxs(XI,{children:[o.jsx(ZI,{children:D.id}),o.jsx(JI,{$status:D.status,children:D.status==="Idle"?"Rảnh rỗi":D.status==="Delivering"?"Đang giao hàng":D.status==="Charging"?"Đang sạc":"Bảo trì"})]}),o.jsxs(eF,{children:[o.jsxs(cd,{children:[o.jsx(ud,{children:"Pin:"}),o.jsxs(dd,{children:[Math.round(D.battery),"%"]})]}),o.jsx(tF,{children:o.jsx(nF,{$level:D.battery})}),D.currentOrderId&&o.jsxs(cd,{style:{marginTop:"12px"},children:[o.jsx(ud,{children:"Đơn hàng hiện tại:"}),o.jsx(dd,{children:D.currentOrderId})]}),o.jsxs(cd,{children:[o.jsx(ud,{children:"Bảo trì gần nhất:"}),o.jsx(dd,{children:$(D.lastMaintenance)})]})]}),D.flaggedForIssue&&D.issueDescription&&o.jsxs(sF,{children:[o.jsx("strong",{children:"⚠️ Issue:"})," ",D.issueDescription]}),o.jsx(rF,{children:D.flaggedForIssue?o.jsx(hd,{$variant:"clear",onClick:()=>b(D,"clear"),children:"✓ Xóa cờ"}):o.jsxs(o.Fragment,{children:[o.jsx(hd,{$variant:"flag",onClick:()=>b(D,"flag"),style:{flex:1},children:"🚩 Báo sự cố"}),D.status==="Idle"&&o.jsx(hd,{onClick:()=>b(D,"reassign"),style:{flex:1,background:"#007bff"},children:"🔄 Phân công lại"})]})})]},D.id))})]},C)}),Object.values(g).every(({drones:C})=>x(C).length===0)&&o.jsxs(cF,{children:[o.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"🚁"}),o.jsx("div",{children:"Không có máy bay nào phù hợp với bộ lọc"})]})]}),o.jsx(tt,{children:s&&o.jsx(oF,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:S,children:o.jsx(aF,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:C=>C.stopPropagation(),children:s.action==="flag"?o.jsxs(o.Fragment,{children:[o.jsx(fd,{children:"Báo cáo sự cố máy bay"}),o.jsxs(pd,{children:["Đánh dấu ",o.jsx("strong",{children:s.drone.id}),' cần bảo trì hoặc theo dõi sự cố. Trạng thái máy bay sẽ được đặt sang "Bảo trì" và hành động sẽ được ghi lại.']}),o.jsx(lF,{placeholder:"Mô tả sự cố (VD: Pin suy giảm, Hỏng hóc cơ khí, v.v.)",value:l,onChange:C=>c(C.target.value)}),o.jsxs(gd,{children:[o.jsx(hi,{onClick:S,children:"Hủy"}),o.jsx(hi,{$primary:!0,onClick:m,disabled:!l.trim(),children:"Báo cáo sự cố"})]})]}):s.action==="reassign"?o.jsxs(o.Fragment,{children:[o.jsx(fd,{children:"Phân công lại máy bay"}),o.jsxs(pd,{children:["Phân công lại ",o.jsx("strong",{children:s.drone.id})," từ"," ",o.jsx("strong",{children:s.drone.restaurantName})," sang nhà hàng đã xác minh khác.",o.jsx("span",{style:{display:"block",marginTop:"10px",color:"#007bff"},children:"ℹ️ Chỉ nhà hàng đang hoạt động mới có thể nhận phân công máy bay."})]}),o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Chọn nhà hàng đích"}),o.jsxs("select",{value:u,onChange:C=>d(C.target.value),style:{width:"100%",padding:"12px",border:"2px solid #e1e5e9",borderRadius:"8px",fontSize:"14px",background:"white"},children:[o.jsx("option",{value:"",children:"-- Chọn nhà hàng --"}),h.filter(C=>C.status==="Active"&&C.id!==s.drone.restaurantId).map(C=>o.jsxs("option",{value:C.id,children:[C.name," (",C.category,") - ",C.droneCount," máy bay"]},C.id))]})]}),o.jsxs(gd,{children:[o.jsx(hi,{onClick:S,children:"Hủy"}),o.jsx(hi,{$primary:!0,onClick:w,disabled:!u,children:"Xác nhận phân công lại"})]})]}):o.jsxs(o.Fragment,{children:[o.jsx(fd,{children:"Xóa cờ máy bay"}),o.jsxs(pd,{children:["Bạn có chắc chắn muốn xóa cờ bảo trì của ",o.jsx("strong",{children:s.drone.id}),"?",o.jsx("span",{style:{display:"block",marginTop:"10px",color:"#28a745"},children:'✓ Trạng thái máy bay sẽ được đặt lại về "Rảnh rỗi" và đánh dấu đang hoạt động.'})]}),o.jsxs(gd,{children:[o.jsx(hi,{onClick:S,children:"Hủy"}),o.jsx(hi,{$primary:!0,onClick:y,children:"Xóa cờ"})]})]})})})})]})},dF=f.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`,hF=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`,fF=f.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`,Nx=f.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`,ln=f.button`
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
`,pF=f.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`,gF=f(O.div)`
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
`,mF=f.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 15px;
`,xF=f.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`,yF=f.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: ${e=>{switch(e.$severity){case"critical":return"#fee";case"warning":return"#fff9e6";case"info":return"#e7f5ff";default:return"#f8f9fa"}}};
  color: ${e=>{switch(e.$severity){case"critical":return"#dc3545";case"warning":return"#ffc107";case"info":return"#17a2b8";default:return"#6c757d"}}};
`,vF=f.div`
  flex: 1;
`,wF=f.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`,bF=f.div`
  font-size: 13px;
  color: #666;
`,jF=f.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
`,SF=f.div`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
`,kF=f.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
  flex-wrap: wrap;
`,md=f.div`
  font-size: 12px;
  color: #999;
  
  strong {
    color: #666;
    font-weight: 500;
  }
`,CF=f.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.$severity){case"critical":return"#dc3545";case"warning":return"#ffc107";case"info":return"#17a2b8";default:return"#6c757d"}}};
  color: white;
`,$F=f.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`,TF=e=>({restaurant_approved:"✅",restaurant_suspended:"🔴",restaurant_activated:"🟢",customer_suspended:"⛔",customer_activated:"✅",drone_flagged:"🚩",drone_cleared:"✓",emergency_override:"⚠️",order_status_changed:"📦"})[e]||"📋",EF=e=>({restaurant_approved:"Phê duyệt nhà hàng",restaurant_suspended:"Tạm ngưng nhà hàng",restaurant_activated:"Kích hoạt nhà hàng",customer_suspended:"Tạm ngưng khách hàng",customer_activated:"Kích hoạt khách hàng",drone_flagged:"Đánh dấu máy bay",drone_cleared:"Xóa cờ máy bay",emergency_override:"Can thiệp khẩn cấp",order_status_changed:"Thay đổi trạng thái đơn hàng",drone_reassigned:"Phân công lại máy bay"})[e]||"Hành động không xác định",PF=e=>{const t=new Date(e),r=Date.now()-e,i=Math.floor(r/1e3),s=Math.floor(i/60),a=Math.floor(s/60),l=Math.floor(a/24);let c="";return i<60?c="Vừa xong":s<60?c=`${s} phút trước`:a<24?c=`${a} giờ trước`:l<7?c=`${l} ngày trước`:c=t.toLocaleDateString(),{date:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),time:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),relative:c}},AF=({logs:e})=>{const[t,n]=v.useState("All"),[r,i]=v.useState("All"),s=e.filter(c=>{const u=t==="All"||c.severity===t,d=r==="All"||c.targetType===r;return u&&d}),a={info:e.filter(c=>c.severity==="info").length,warning:e.filter(c=>c.severity==="warning").length,critical:e.filter(c=>c.severity==="critical").length},l={restaurant:e.filter(c=>c.targetType==="restaurant").length,customer:e.filter(c=>c.targetType==="customer").length,drone:e.filter(c=>c.targetType==="drone").length,order:e.filter(c=>c.targetType==="order").length};return o.jsxs(dF,{children:[o.jsx(hF,{children:o.jsx(fF,{children:"Nhật ký hoạt động hệ thống"})}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:600,color:"#666",marginBottom:"10px"},children:"LỌC THEO MỨC ĐỘ"}),o.jsxs(Nx,{children:[o.jsxs(ln,{$active:t==="All",onClick:()=>n("All"),children:["Tất cả (",e.length,")"]}),o.jsxs(ln,{$active:t==="info",onClick:()=>n("info"),children:["ℹ️ Thông tin (",a.info,")"]}),o.jsxs(ln,{$active:t==="warning",onClick:()=>n("warning"),children:["⚠️ Cảnh báo (",a.warning,")"]}),o.jsxs(ln,{$active:t==="critical",onClick:()=>n("critical"),children:["🔴 Nghiêm trọng (",a.critical,")"]})]})]}),o.jsxs("div",{style:{marginTop:"20px"},children:[o.jsx("div",{style:{fontSize:"13px",fontWeight:600,color:"#666",marginBottom:"10px"},children:"LỌC THEO LOẠI ĐỐI TƯỢNG"}),o.jsxs(Nx,{children:[o.jsx(ln,{$active:r==="All",onClick:()=>i("All"),children:"Tất cả"}),o.jsxs(ln,{$active:r==="restaurant",onClick:()=>i("restaurant"),children:["🏪 Nhà hàng (",l.restaurant,")"]}),o.jsxs(ln,{$active:r==="customer",onClick:()=>i("customer"),children:["👥 Khách hàng (",l.customer,")"]}),o.jsxs(ln,{$active:r==="drone",onClick:()=>i("drone"),children:["🚁 Máy bay (",l.drone,")"]}),o.jsxs(ln,{$active:r==="order",onClick:()=>i("order"),children:["📦 Đơn hàng (",l.order,")"]})]})]}),o.jsx(pF,{style:{marginTop:"30px"},children:s.length===0?o.jsxs($F,{children:[o.jsx("div",{style:{fontSize:"48px",marginBottom:"15px"},children:"📋"}),o.jsx("div",{children:"Không có nhật ký nào phù hợp với bộ lọc"})]}):s.map((c,u)=>{const d=PF(c.timestamp);return o.jsxs(gF,{$severity:c.severity,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:u*.05},children:[o.jsxs(mF,{children:[o.jsxs(xF,{children:[o.jsx(yF,{$severity:c.severity,children:TF(c.action)}),o.jsxs(vF,{children:[o.jsx(wF,{children:EF(c.action)}),o.jsxs(bF,{children:[o.jsx("strong",{children:c.targetName})," by ",c.adminName]})]})]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"5px"},children:[o.jsx(CF,{$severity:c.severity,children:c.severity}),o.jsx(jF,{title:`${d.date} at ${d.time}`,children:d.relative})]})]}),o.jsx(SF,{children:c.details}),o.jsxs(kF,{children:[o.jsxs(md,{children:[o.jsx("strong",{children:"Target:"})," ",c.targetType," (",c.targetId,")"]}),o.jsxs(md,{children:[o.jsx("strong",{children:"Admin:"})," ",c.adminName," (",c.adminId,")"]}),o.jsxs(md,{children:[o.jsx("strong",{children:"Time:"})," ",d.date," at ",d.time]})]})]},c.id)})})]})},DF=f.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
`,RF=f.div`
  flex: 1;
  margin-left: 280px;
  padding: 30px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`,MF=f.div`
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
`,IF=f.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,FF=f.div`
  display: flex;
  gap: 10px;
`,xd=f.button`
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
`,NF=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`,fi=f(O.div)`
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
`,pi=f.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`,gi=f.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${e=>e.$bgColor||"#f0f0f0"};
`,mi=f.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`,xi=f.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`,yi=f.div`
  font-size: 12px;
  color: ${e=>e.$positive?"#28a745":"#dc3545"};
  margin-top: 8px;
  font-weight: 500;
`,Ns=f.div`
  margin-top: 30px;
`,_F=f.footer`
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 13px;
  margin-top: 40px;
  border-top: 1px solid #e1e5e9;
`,LF=f(O.div)`
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
`,OF=f(O.div)`
  background: white;
  border-radius: 15px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`,zF=f.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 10px;
`,VF=f.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
  font-size: 15px;
`,_x=f.input`
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
`,BF=f.textarea`
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
`,HF=f.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 25px;
`,Lx=f.button`
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
`,UF=f.div`
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
`,Zb=()=>{const{admin:e,logout:t}=ms(),n=wt(),[r,i]=v.useState("overview"),[s,a]=v.useState(0),[l,c]=v.useState(!1),[u,d]=v.useState("order"),[h,p]=v.useState(""),[g,x]=v.useState(""),[b,S]=v.useState(""),[m,y]=v.useState(Xr()),[w,$]=v.useState(Mo()),[j,k]=v.useState(os()),[C,T]=v.useState(cl()),[P,A]=v.useState(Dx()),D=()=>{y(Xr()),$(Mo()),k(os()),T(cl()),A(Dx()),a(M=>M+1)};v.useEffect(()=>{const M=setInterval(()=>{T(cl())},1e4);return()=>clearInterval(M)},[]);const W=()=>{t(),n("/admin/login")},ee=()=>{c(!0)},z=()=>{if(!e||!h||!g||!b){L.error("Please fill all fields");return}iI(u,h,g,b,e.id,e.name)&&(c(!1),p(""),x(""),S(""),D())},_=()=>{switch(r){case"overview":return"Tổng quan bảng điều khiển";case"restaurants":return"Quản lý nhà hàng";case"customers":return"Quản lý khách hàng";case"drones":return"Giám sát đội máy bay";case"logs":return"Nhật ký hoạt động hệ thống";default:return"Bảng điều khiển"}},N=()=>{switch(r){case"overview":return"📊";case"restaurants":return"🏪";case"customers":return"👥";case"drones":return"🚁";case"logs":return"📋";default:return"📊"}};return e?o.jsxs(DF,{children:[o.jsx(GM,{activeTab:r,onTabChange:i,adminName:e.name,stats:{pendingRestaurants:P.pendingRestaurants,maintenanceDrones:P.maintenanceDrones}}),o.jsxs(RF,{children:[o.jsxs(MF,{children:[o.jsxs(IF,{children:[o.jsx("span",{children:N()}),_()]}),o.jsxs(FF,{children:[o.jsx(xd,{onClick:D,children:"🔄 Làm mới"}),o.jsx(xd,{$variant:"primary",onClick:ee,children:"⚠️ Can thiệp khẩn cấp"}),o.jsx(xd,{$variant:"danger",onClick:W,children:"Đăng xuất"})]})]}),r==="overview"&&o.jsxs(o.Fragment,{children:[o.jsxs(NF,{children:[o.jsx(fi,{$color:"#667eea",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:0},children:o.jsxs(pi,{children:[o.jsxs("div",{children:[o.jsx(mi,{children:P.totalRestaurants}),o.jsx(xi,{children:"Tổng số nhà hàng"}),o.jsxs(yi,{$positive:P.activeRestaurants>0,children:[P.activeRestaurants," đang hoạt động"]})]}),o.jsx(gi,{$bgColor:"#eef2ff",children:"🏪"})]})}),o.jsx(fi,{$color:"#28a745",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:o.jsxs(pi,{children:[o.jsxs("div",{children:[o.jsx(mi,{children:P.totalCustomers}),o.jsx(xi,{children:"Tổng số khách hàng"}),o.jsx(yi,{$positive:!0,children:"Cơ sở người dùng đang tăng"})]}),o.jsx(gi,{$bgColor:"#e7f5e9",children:"👥"})]})}),o.jsx(fi,{$color:"#17a2b8",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:o.jsxs(pi,{children:[o.jsxs("div",{children:[o.jsx(mi,{children:P.totalOrders.toLocaleString()}),o.jsx(xi,{children:"Tổng số đơn hàng"}),o.jsx(yi,{$positive:!0,children:"Tất cả giao hàng"})]}),o.jsx(gi,{$bgColor:"#e7f5fb",children:"📦"})]})}),o.jsx(fi,{$color:"#ffc107",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3},children:o.jsxs(pi,{children:[o.jsxs("div",{children:[o.jsx(mi,{style:{fontSize:"24px"},children:q(P.totalRevenue)}),o.jsx(xi,{children:"Tổng doanh thu"}),o.jsx(yi,{$positive:!0,children:"Thu nhập nền tảng"})]}),o.jsx(gi,{$bgColor:"#fff9e6",children:"💰"})]})}),o.jsx(fi,{$color:"#6c757d",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},children:o.jsxs(pi,{children:[o.jsxs("div",{children:[o.jsx(mi,{children:P.totalDrones}),o.jsx(xi,{children:"Tổng số máy bay"}),o.jsxs(yi,{$positive:P.activeDrones>0,children:[P.activeDrones," đang giao hàng"]})]}),o.jsx(gi,{$bgColor:"#f0f0f0",children:"🚁"})]})}),o.jsx(fi,{$color:"#dc3545",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5},children:o.jsxs(pi,{children:[o.jsxs("div",{children:[o.jsx(mi,{children:P.pendingRestaurants}),o.jsx(xi,{children:"Chờ phê duyệt"}),o.jsx(yi,{$positive:P.pendingRestaurants===0,children:P.pendingRestaurants===0?"Đã xử lý hết":"Cần xem xét"})]}),o.jsx(gi,{$bgColor:"#ffe7e7",children:"⏳"})]})})]}),o.jsx(Ns,{children:o.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:"30px"},children:o.jsx(Mx,{restaurants:m,onUpdate:D},`restaurants-${s}`)})})]}),r==="restaurants"&&o.jsx(Ns,{children:o.jsx(Mx,{restaurants:m,onUpdate:D},`restaurants-${s}`)}),r==="customers"&&o.jsx(Ns,{children:o.jsx(zI,{customers:w,onUpdate:D},`customers-${s}`)}),r==="drones"&&o.jsx(Ns,{children:o.jsx(uF,{drones:j,onUpdate:D},`drones-${s}`)}),r==="logs"&&o.jsx(Ns,{children:o.jsx(AF,{logs:C},`logs-${s}`)}),o.jsx(_F,{children:"Trung tâm Quản trị © 2025 FoodFast Drone Delivery — Tất cả giá hiển thị bằng Việt Nam Đồng (₫)"})]}),o.jsx(Tb,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#fff",color:"#333"},success:{iconTheme:{primary:"#28a745",secondary:"#fff"}},error:{iconTheme:{primary:"#dc3545",secondary:"#fff"}}}}),o.jsx(tt,{children:l&&o.jsx(LF,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>c(!1),children:o.jsxs(OF,{initial:{scale:.8,y:50},animate:{scale:1,y:0},exit:{scale:.8,y:50},onClick:M=>M.stopPropagation(),children:[o.jsx(zF,{children:"⚠️ Can thiệp khẩn cấp"}),o.jsx(VF,{children:"Đây là hành động quản trị quan trọng sẽ được ghi lại trong hệ thống. Chỉ sử dụng trong các tình huống khẩn cấp."}),o.jsxs(UF,{children:[o.jsx("strong",{children:"⚠️ CẢNH BÁO"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Hành động này sẽ được ghi lại vĩnh viễn"}),o.jsx("li",{children:"Tất cả các bên liên quan sẽ được thông báo"}),o.jsx("li",{children:"Chỉ sử dụng khi thực sự cần thiết"})]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Loại đối tượng"}),o.jsxs("select",{value:u,onChange:M=>d(M.target.value),style:{width:"100%",padding:"12px",border:"2px solid #e1e5e9",borderRadius:"8px",fontSize:"14px",marginBottom:"15px",background:"white"},children:[o.jsx("option",{value:"order",children:"Đơn hàng"}),o.jsx("option",{value:"restaurant",children:"Nhà hàng"}),o.jsx("option",{value:"drone",children:"Máy bay"})]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Mã đối tượng"}),o.jsx(_x,{type:"text",placeholder:"VD: ORD-12345, rest_1, DRONE-001",value:h,onChange:M=>p(M.target.value)})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Tên đối tượng"}),o.jsx(_x,{type:"text",placeholder:"VD: Đơn hàng #123, Tên nhà hàng, Đơn vị máy bay",value:g,onChange:M=>x(M.target.value)})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:500,color:"#333"},children:"Chi tiết hành động"}),o.jsx(BF,{placeholder:"Mô tả hành động khẩn cấp đang thực hiện và lý do...",value:b,onChange:M=>S(M.target.value)})]}),o.jsxs(HF,{children:[o.jsx(Lx,{onClick:()=>c(!1),children:"Hủy"}),o.jsx(Lx,{$danger:!0,onClick:z,disabled:!h||!g||!b,children:"Thực hiện can thiệp khẩn cấp"})]})]})})})]}):(n("/admin/login"),null)},WF=f.nav`
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
`,GF=f.h2`
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`,KF=f.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`,YF=f.button`
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
`,Gp=()=>{const e=wt(),t=vt(),n=[{path:"/admin/dashboard",label:"Dashboard",icon:"📊"},{path:"/admin/users",label:"Users",icon:"👥"},{path:"/admin/restaurants",label:"Restaurants",icon:"🏪"},{path:"/admin/orders",label:"Orders",icon:"📦"}],r=i=>{e(i)};return o.jsxs(WF,{children:[o.jsx(GF,{children:"Admin Panel"}),o.jsx(KF,{children:n.map(i=>o.jsxs(YF,{$active:t.pathname===i.path,onClick:()=>r(i.path),children:[i.icon," ",i.label]},i.path))})]})},qF=f.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`,QF=f.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,XF=f.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`,ZF=f.button`
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
`,JF=f.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`,eN=f.table`
  width: 100%;
  border-collapse: collapse;
`,kr=f.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`,Cr=f.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`,tN=f.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`,Ox=f.button`
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
`,nN=f.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${e=>{switch(e.$status){case"admin":return"background: #dc3545; color: white;";case"restaurant":return"background: #ffc107; color: #333;";case"customer":return"background: #28a745; color: white;";default:return"background: #6c757d; color: white;"}}}
`,Jb=()=>{const[e,t]=v.useState([{id:"u1",name:"Admin User",username:"admin",role:"admin",email:"admin@foodfast.com",orderCount:0,createdAt:Date.now()-31536e6},{id:"u2",name:"John Doe",username:"john_doe",role:"customer",phone:"0123456789",email:"john@example.com",orderCount:15,createdAt:Date.now()-2592e6},{id:"u3",name:"Jane Smith",username:"jane_smith",role:"customer",phone:"0987654321",email:"jane@example.com",orderCount:8,createdAt:Date.now()-1296e6},{id:"u4",name:"Restaurant Owner",username:"restaurant_owner",role:"restaurant",email:"owner@restaurant.com",restaurantId:"rest_1",orderCount:0,createdAt:Date.now()-5184e6}]),n=a=>{console.log("Sửa user:",a)},r=a=>{window.confirm("Are you sure you want to delete this user?")&&t(e.filter(l=>l.id!==a))},i=()=>{console.log("Add new user")},s=a=>new Date(a).toLocaleDateString();return o.jsxs(qF,{children:[o.jsx(Gp,{}),o.jsxs(QF,{children:[o.jsx(XF,{children:"👥 Manage Users"}),o.jsx(ZF,{onClick:i,children:"+ Add User"})]}),o.jsx(JF,{children:o.jsxs(eN,{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx(kr,{children:"Name"}),o.jsx(kr,{children:"Email"}),o.jsx(kr,{children:"Phone"}),o.jsx(kr,{children:"Role"}),o.jsx(kr,{children:"Orders"}),o.jsx(kr,{children:"Created"}),o.jsx(kr,{children:"Actions"})]})}),o.jsx("tbody",{children:e.map(a=>o.jsxs(tN,{children:[o.jsxs(Cr,{children:[o.jsx("strong",{children:a.name}),o.jsx("br",{}),o.jsxs("small",{style:{color:"#999"},children:["@",a.username]})]}),o.jsx(Cr,{children:a.email||"-"}),o.jsx(Cr,{children:a.phone||"-"}),o.jsx(Cr,{children:o.jsx(nN,{$status:a.role,children:a.role.toUpperCase()})}),o.jsx(Cr,{children:a.orderCount||0}),o.jsx(Cr,{children:s(a.createdAt||Date.now())}),o.jsxs(Cr,{children:[o.jsx(Ox,{$variant:"Sửa",onClick:()=>n(a.id),children:"Edit"}),o.jsx(Ox,{$variant:"delete",onClick:()=>r(a.id),children:"Delete"})]})]},a.id))})]})})]})},rN=f.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`,iN=f.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,sN=f.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`,oN=f.button`
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
`,aN=f.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`,lN=f.table`
  width: 100%;
  border-collapse: collapse;
`,$r=f.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`,Tr=f.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`,cN=f.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`,yd=f.button`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${e=>{switch(e.variant){case"Sửa":return"background: #28a745; color: white; &:hover { background: #218838; }";case"delete":return"background: #dc3545; color: white; &:hover { background: #c82333; }";case"toggle":return"background: #ffc107; color: #333; &:hover { background: #e0a800; }";default:return"background: #6c757d; color: white; &:hover { background: #5a6268; }"}}}
`,uN=f.span`
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
`,dN=f.div`
  color: #ffc107;
  font-size: 16px;
`,ej=()=>{const[e,t]=v.useState([{id:"rest_1",name:"FoodFast Restaurant",description:"Original FoodFast restaurant with drone delivery",category:"Fast Food",location:"Downtown",rating:4.5,theme:{primary:"#FF6600",secondary:"#FF8C00",accent:"#FFA500"},ownerId:"u1",isActive:!0,createdAt:Date.now()-2592e6},{id:"rest_2",name:"SweetDreams Bakery",description:"Bản giao hưởng sô cô la lộng lẫy. Những dòng ganache óng ả, đặc quánh buông lơi như dải lụa mềm, bao trọn lấy cốt bánh ẩm mượt. Trên đỉnh, từng đóa hồng kem bơ sô cô la nở rộ, mời gọi một trải nghiệm ngọt ngào đầy đê mê.",category:"Desserts",location:"Mall District",rating:4.8,theme:{primary:"#E91E63",secondary:"#F06292",accent:"#F8BBD9"},ownerId:"u3",isActive:!0,createdAt:Date.now()-6048e5},{id:"rest_3",name:"Pizza Palace",description:"Authentic Italian pizza with drone delivery",category:"Italian",location:"West Side",rating:4.2,theme:{primary:"#8B4513",secondary:"#A0522D",accent:"#D2691E"},ownerId:"u4",isActive:!1,createdAt:Date.now()-12096e5}]),n=c=>{console.log("Sửa restaurant:",c)},r=c=>{window.confirm("Are you sure you want to delete this restaurant?")&&t(e.filter(u=>u.id!==c))},i=c=>{t(e.map(u=>u.id===c?{...u,isActive:!u.isActive}:u))},s=()=>{console.log("Add new restaurant")},a=c=>new Date(c).toLocaleDateString(),l=c=>{const u=[],d=Math.floor(c),h=c%1!==0;for(let p=0;p<d;p++)u.push("★");return h&&u.push("☆"),u.join("")};return o.jsxs(rN,{children:[o.jsx(Gp,{}),o.jsxs(iN,{children:[o.jsx(sN,{children:"🏪 Manage Restaurants"}),o.jsx(oN,{onClick:s,children:"+ Add Restaurant"})]}),o.jsx(aN,{children:o.jsxs(lN,{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx($r,{children:"Name"}),o.jsx($r,{children:"Category"}),o.jsx($r,{children:"Location"}),o.jsx($r,{children:"Rating"}),o.jsx($r,{children:"Status"}),o.jsx($r,{children:"Created"}),o.jsx($r,{children:"Actions"})]})}),o.jsx("tbody",{children:e.map(c=>o.jsxs(cN,{children:[o.jsxs(Tr,{children:[o.jsx("strong",{children:c.name}),o.jsx("br",{}),o.jsx("small",{style:{color:"#999"},children:c.description})]}),o.jsx(Tr,{children:c.category||"-"}),o.jsx(Tr,{children:c.location||"-"}),o.jsx(Tr,{children:o.jsxs(dN,{children:[l(c.rating||0)," ",c.rating]})}),o.jsx(Tr,{children:o.jsx(uN,{active:c.isActive,children:c.isActive?"ACTIVE":"INACTIVE"})}),o.jsx(Tr,{children:a(c.createdAt)}),o.jsxs(Tr,{children:[o.jsx(yd,{variant:"Sửa",onClick:()=>n(c.id),children:"Sửa"}),o.jsx(yd,{variant:"toggle",onClick:()=>i(c.id),children:c.isActive?"Deactivate":"Activate"}),o.jsx(yd,{variant:"delete",onClick:()=>r(c.id),children:"Delete"})]})]},c.id))})]})})]})},hN=f.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`,fN=f.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,pN=f.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`,gN=f.div`
  display: flex;
  gap: 15px;
  align-items: center;
`,mN=f.select`
  padding: 10px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
`,xN=f.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`,yN=f.table`
  width: 100%;
  border-collapse: collapse;
`,Dn=f.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`,Rn=f.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`,vN=f.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`,vd=f.button`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${e=>{switch(e.$variant){case"view":return"background: #17a2b8; color: white; &:hover { background: #138496; }";case"update":return"background: #28a745; color: white; &:hover { background: #218838; }";case"cancel":return"background: #dc3545; color: white; &:hover { background: #c82333; }";default:return"background: #6c757d; color: white; &:hover { background: #5a6268; }"}}}
`,wN=f.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${e=>{switch(e.$status){case"Đang chờ phê duyệt":return"background: #ffc107; color: #333;";case"confirmed":return"background: #17a2b8; color: white;";case"preparing":return"background: #fd7e14; color: white;";case"delivering":return"background: #6f42c1; color: white;";case"delivered":return"background: #28a745; color: white;";case"cancelled":return"background: #dc3545; color: white;";default:return"background: #6c757d; color: white;"}}}
`,tj=()=>{const[e,t]=v.useState([{id:"ORD-001",userId:"u2",restaurantId:"rest_1",items:[{id:"item1",productId:"prod1",productName:"Burger Deluxe",quantity:2,price:15.99},{id:"item2",productId:"prod2",productName:"French Fries",quantity:1,price:5.99}],total:37.97,status:"delivered",createdAt:Date.now()-1728e5,updatedAt:Date.now()-864e5,deliveryAddress:"123 Main St, City",paymentMethod:"Credit Card"},{id:"ORD-002",userId:"u3",restaurantId:"rest_2",items:[{id:"item3",productId:"prod3",productName:"Chocolate Cake",quantity:1,price:12.99}],total:12.99,status:"delivering",createdAt:Date.now()-72e5,updatedAt:Date.now()-36e5,deliveryAddress:"456 Oak Ave, City",paymentMethod:"Cash"},{id:"ORD-003",userId:"u2",restaurantId:"rest_1",items:[{id:"item4",productId:"prod4",productName:"Pizza Margherita",quantity:1,price:18.99}],total:18.99,status:"preparing",createdAt:Date.now()-18e5,updatedAt:Date.now()-9e5,deliveryAddress:"789 Pine St, City",paymentMethod:"Credit Card"},{id:"ORD-004",userId:"u3",restaurantId:"rest_2",items:[{id:"item5",productId:"prod5",productName:"Tiramisu",quantity:2,price:8.99}],total:17.98,status:"cancelled",createdAt:Date.now()-864e5,updatedAt:Date.now()-864e5,deliveryAddress:"321 Elm St, City",paymentMethod:"Credit Card"}]),[n,r]=v.useState("all"),i=h=>{console.log("View order:",h)},s=h=>{console.log("Update order status:",h)},a=h=>{window.confirm("Are you sure you want to cancel this order?")&&t(e.map(p=>p.id===h?{...p,status:"cancelled",updatedAt:Date.now()}:p))},l=h=>new Date(h).toLocaleString(),c=n==="all"?e:e.filter(h=>h.status===n),u=h=>({u2:"John Doe",u3:"Jane Smith",u4:"Mike Johnson"})[h]||"Unknown User",d=h=>({rest_1:"FoodFast Restaurant",rest_2:"SweetDreams Bakery",rest_3:"Pizza Palace"})[h]||"Unknown Restaurant";return o.jsxs(hN,{children:[o.jsx(Gp,{}),o.jsxs(fN,{children:[o.jsx(pN,{children:"📦 Quản lý các đơn hàng"}),o.jsxs(gN,{children:[o.jsx("label",{htmlFor:"status-filter",children:"Lọc theo trạng thái:"}),o.jsxs(mN,{id:"status-filter",value:n,onChange:h=>r(h.target.value),children:[o.jsx("option",{value:"all",children:"Tất cả đơn hàng"}),o.jsx("option",{value:"Đang chờ phê duyệt",children:"Đang chờ xử lý"}),o.jsx("option",{value:"confirmed",children:"Đã xác nhận"}),o.jsx("option",{value:"preparing",children:"Đang chuẩn bị"}),o.jsx("option",{value:"delivering",children:"Đang giao hàng"}),o.jsx("option",{value:"delivered",children:"Đã giao"}),o.jsx("option",{value:"cancelled",children:"Đã huỷ"})]})]})]}),o.jsx(xN,{children:o.jsxs(yN,{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx(Dn,{children:"Mã đơn hàng"}),o.jsx(Dn,{children:"Khách hàng"}),o.jsx(Dn,{children:"Nhà hàng"}),o.jsx(Dn,{children:"Các mục"}),o.jsx(Dn,{children:"Tổng"}),o.jsx(Dn,{children:"Trạng thái"}),o.jsx(Dn,{children:"Đã tạo"}),o.jsx(Dn,{children:"Các hành động"})]})}),o.jsx("tbody",{children:c.map(h=>o.jsxs(vN,{children:[o.jsx(Rn,{children:o.jsx("strong",{children:h.id})}),o.jsx(Rn,{children:u(h.userId)}),o.jsx(Rn,{children:d(h.restaurantId)}),o.jsxs(Rn,{children:[h.items.length," item(s)",o.jsx("br",{}),o.jsx("small",{style:{color:"#999"},children:h.items.map(p=>p.productName).join(", ")})]}),o.jsx(Rn,{children:o.jsx("strong",{children:q(h.total)})}),o.jsx(Rn,{children:o.jsx(wN,{$status:h.status,children:h.status.toUpperCase()})}),o.jsx(Rn,{children:l(h.createdAt)}),o.jsxs(Rn,{children:[o.jsx(vd,{$variant:"view",onClick:()=>i(h.id),children:"View"}),o.jsx(vd,{$variant:"update",onClick:()=>s(h.id),children:"Update"}),h.status!=="cancelled"&&h.status!=="delivered"&&o.jsx(vd,{$variant:"cancel",onClick:()=>a(h.id),children:"Cancel"})]})]},h.id))})]})})]})},Bn=({children:e})=>{const{admin:t,loading:n}=ms(),r=vt();return n?o.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px",color:"#666"},children:"Loading admin panel..."}):t?o.jsx(o.Fragment,{children:e}):o.jsx(tn,{to:"/admin/login",state:{from:r},replace:!0})},bN=({children:e,allowedRoles:t})=>{const{user:n}=Ze();if(!n)return o.jsx(tn,{to:"/login",replace:!0});if(!t.includes(n.role)){const r=n.role==="restaurant"?"/restaurant":n.role==="admin"?"/admin/dashboard":"/menu";return o.jsx(tn,{to:r,replace:!0})}return o.jsx(o.Fragment,{children:e})},jN=()=>o.jsx(O1,{children:o.jsxs(xM,{children:[o.jsx(I4,{}),o.jsx(hM,{}),o.jsxs(F1,{children:[o.jsx(X,{path:"/",element:o.jsx(tn,{to:"/menu",replace:!0})}),o.jsx(X,{path:"/home",element:o.jsx(tn,{to:"/menu",replace:!0})}),o.jsx(X,{path:"/homepage",element:o.jsx(tn,{to:"/menu",replace:!0})}),o.jsx(X,{path:"/menu",element:o.jsx(_P,{})}),o.jsx(X,{path:"/menu/:id",element:o.jsx(K0,{})}),o.jsx(X,{path:"/details/:id",element:o.jsx(K0,{})}),o.jsx(X,{path:"/login",element:o.jsx(CD,{})}),o.jsx(X,{path:"/customer-info",element:o.jsx(RM,{})}),o.jsx(X,{path:"/cart",element:o.jsx(Ps,{requireRole:"customer",children:o.jsx(aA,{})})}),o.jsx(X,{path:"/checkout",element:o.jsx(bN,{allowedRoles:["customer"],children:o.jsx(x4,{})})}),o.jsx(X,{path:"/vnpay-return",element:o.jsx(j4,{})}),o.jsx(X,{path:"/orders",element:o.jsx(gD,{})}),o.jsx(X,{path:"/restaurant",element:o.jsx(Ps,{requireRole:"restaurant",children:o.jsx(BR,{})})}),o.jsx(X,{path:"/sweetdreams",element:o.jsx(Ps,{requireRole:"restaurant",children:o.jsx(ZR,{})})}),o.jsx(X,{path:"/aloha",element:o.jsx(Ps,{requireRole:"restaurant",children:o.jsx(eM,{})})}),o.jsx(X,{path:"/admin",element:o.jsx(Ps,{requireRole:"admin",children:o.jsx(uM,{})})}),o.jsx(X,{path:"/admin/login",element:o.jsx(vi,{children:o.jsx(Xb,{})})}),o.jsx(X,{path:"/admin/dashboard",element:o.jsx(vi,{children:o.jsx(Bn,{children:o.jsx(Zb,{})})})}),o.jsx(X,{path:"/admin/users",element:o.jsx(vi,{children:o.jsx(Bn,{children:o.jsx(Jb,{})})})}),o.jsx(X,{path:"/admin/restaurants",element:o.jsx(vi,{children:o.jsx(Bn,{children:o.jsx(ej,{})})})}),o.jsx(X,{path:"/admin/orders",element:o.jsx(vi,{children:o.jsx(Bn,{children:o.jsx(tj,{})})})})]}),o.jsx(C4,{})]})});function SN(){return o.jsxs(j1,{theme:me,children:[o.jsx(C1,{}),o.jsx(vi,{children:o.jsx(O1,{children:o.jsxs(F1,{children:[o.jsx(X,{path:"/admin/login",element:o.jsx(Xb,{})}),o.jsx(X,{path:"/admin/dashboard",element:o.jsx(Bn,{children:o.jsx(Zb,{})})}),o.jsx(X,{path:"/admin/users",element:o.jsx(Bn,{children:o.jsx(Jb,{})})}),o.jsx(X,{path:"/admin/restaurants",element:o.jsx(Bn,{children:o.jsx(ej,{})})}),o.jsx(X,{path:"/admin/orders",element:o.jsx(Bn,{children:o.jsx(tj,{})})}),o.jsx(X,{path:"/admin",element:o.jsx(tn,{to:"/admin/login",replace:!0})}),o.jsx(X,{path:"/admin/*",element:o.jsx(tn,{to:"/admin/login",replace:!0})})]})})})]})}class kN extends rt.Component{constructor(){super(...arguments);Kp(this,"state",{hasError:!1})}static getDerivedStateFromError(n){return{hasError:!0,message:n instanceof Error?n.message:String(n)}}componentDidCatch(n,r){console.error("ErrorBoundary caught:",n,r)}render(){return this.state.hasError?o.jsxs("div",{style:{padding:24},children:[o.jsx("h3",{children:"Đã có lỗi xảy ra"}),o.jsx("div",{style:{color:"#b00",marginTop:8},children:this.state.message}),o.jsx("p",{children:"Vui lòng tải lại trang hoặc thử lại sau."})]}):this.props.children}}const CN=()=>{const e=v.useMemo(()=>Object.fromEntries(Ct.map(t=>[t.id,t.price])),[]);return o.jsx(V6,{children:o.jsxs(j1,{theme:me,children:[o.jsx(C1,{}),o.jsx(n$,{children:o.jsx(z6,{children:o.jsx(R3,{priceMap:e,children:o.jsxs(M3,{children:[o.jsx(Tb,{position:"top-right"}),o.jsx(jN,{})]})})})})]})})},$N=wd.createRoot(document.getElementById("root"));$N.render(o.jsx(rt.StrictMode,{children:o.jsx(kN,{children:window.location.pathname.startsWith("/admin")?o.jsx(SN,{}):o.jsx(CN,{})})}));

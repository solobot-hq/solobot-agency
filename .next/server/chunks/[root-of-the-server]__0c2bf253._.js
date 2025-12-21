module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},56739,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(60476),n=e.i(59756),s=e.i(61916),i=e.i(14444),o=e.i(37092),l=e.i(69741),d=e.i(16795),u=e.i(87718),p=e.i(95169),c=e.i(47587),h=e.i(66012),m=e.i(70101),x=e.i(26937),g=e.i(10372),R=e.i(93695);e.i(52474);var f=e.i(220),v=e.i(89171);e.i(89228);let E=new(e.i(91601)).default({apiKey:process.env.OPENAI_API_KEY});async function w(e){try{let{recipient:t,subject:r,keyPoints:a,tone:n,mode:s,options:i}=await e.json();if(!a||0===a.trim().length)return v.NextResponse.json({error:"Key points are required."},{status:400});let o=String(t||"The Client").slice(0,120),l=String(r||"General Update").slice(0,240),d=String(a).slice(0,4e3),u=`
You are the Email Output Engine for SoloBotAgency.
Your task is to generate premium, subscription-worthy business emails.

RULES:
- Output ONLY valid JSON with:
  { "email": string, "subjectLines": [string] }
- Do NOT explain. Do NOT preface.
- Treat key points as INTENT only.
- NEVER reuse or rewrite any previous draft.
- Every request must generate a brand-new email.
- Strictly follow MODE and TONE.

ANTI-PATTERNS:
"I hope this finds you well"
"I'm writing to"
"Following up"
Corporate filler or buzzwords

MODES:
- Shorten: BLUF, under 50 words, direct.
- Expand: Consultative, detailed, adds context.
- Formal: Strict professional grammar, no contractions.
- Punchy: High-impact, short sentences, persuasive.
- Original: Balanced professional email.

OPTIONS:
- includeCTA: clear next step
- addUrgency: time-sensitive but not spammy
- humanize: warmth (unless Formal)
- simplify: plain language
`,p=`
Recipient: ${o}
Subject Intent: ${l}

Key Points:
"${d}"

Mode: ${s||"Original"}
Tone: ${n||"Professional"}
Options: ${JSON.stringify(i)}

Generate a NEW email from scratch and ONE optimized subject line.
Return ONLY strict JSON.
`,c=await E.chat.completions.create({model:"gpt-4o",messages:[{role:"system",content:u},{role:"user",content:p}],response_format:{type:"json_object"},temperature:.75,max_tokens:500}),h=c.choices?.[0]?.message?.content;if(!h)throw Error("No content generated");let m=JSON.parse(h);return v.NextResponse.json({email:m.email,subjectLines:m.subjectLines})}catch(e){return console.error("Email Assistant API Error:",e),v.NextResponse.json({error:"Failed to generate email."},{status:500})}}e.s(["POST",()=>w],65194);var y=e.i(65194);let N=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/bots/email-assistant/route",pathname:"/api/bots/email-assistant",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/bots/email-assistant/route.ts",nextConfigOutput:"",userland:y}),{workAsyncStorage:b,workUnitAsyncStorage:O,serverHooks:C}=N;function T(){return(0,a.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:O})}async function A(e,t,a){N.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let v="/api/bots/email-assistant/route";v=v.replace(/\/index$/,"")||"/";let E=await N.prepare(e,t,{srcPage:v,multiZoneDraftMode:!1});if(!E)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:w,params:y,nextConfig:b,parsedUrl:O,isDraftMode:C,prerenderManifest:T,routerServerContext:A,isOnDemandRevalidate:S,revalidateOnlyGenerated:P,resolvedPathname:j,clientReferenceManifest:_,serverActionsManifest:k}=E,I=(0,l.normalizeAppPath)(v),q=!!(T.dynamicRoutes[I]||T.routes[j]),U=async()=>((null==A?void 0:A.render404)?await A.render404(e,t,O,!1):t.end("This page could not be found"),null);if(q&&!C){let e=!!T.routes[j],t=T.dynamicRoutes[I];if(t&&!1===t.fallback&&!e){if(b.experimental.adapterPath)return await U();throw new R.NoFallbackError}}let M=null;!q||N.isDev||C||(M="/index"===(M=j)?"/":M);let H=!0===N.isDev||!q,D=q&&!H;k&&_&&(0,i.setReferenceManifestsSingleton)({page:v,clientReferenceManifest:_,serverActionsManifest:k,serverModuleMap:(0,o.createServerModuleMap)({serverActionsManifest:k})});let $=e.method||"GET",F=(0,s.getTracer)(),K=F.getActiveScopeSpan(),L={params:y,prerenderManifest:T,renderOpts:{experimental:{authInterrupts:!!b.experimental.authInterrupts},cacheComponents:!!b.cacheComponents,supportsDynamicResponse:H,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:b.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>N.onRequestError(e,t,a,A)},sharedContext:{buildId:w}},B=new d.NodeNextRequest(e),z=new d.NodeNextResponse(t),G=u.NextRequestAdapter.fromNodeNextRequest(B,(0,u.signalFromNodeResponse)(t));try{let i=async e=>N.handle(G,L).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=F.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${$} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${$} ${v}`)}),o=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var s,l;let d=async({previousCacheEntry:r})=>{try{if(!o&&S&&P&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await i(n);e.fetchMetrics=L.renderOpts.fetchMetrics;let l=L.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=L.renderOpts.collectedTags;if(!q)return await (0,h.sendResponse)(B,z,s,L.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(s.headers);d&&(t[g.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==L.renderOpts.collectedRevalidate&&!(L.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&L.renderOpts.collectedRevalidate,a=void 0===L.renderOpts.collectedExpire||L.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:L.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await N.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:S})},A),t}},u=await N.handleResponse({req:e,nextConfig:b,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:P,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:o});if(!q)return null;if((null==u||null==(s=u.value)?void 0:s.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==u||null==(l=u.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",S?"REVALIDATED":u.isMiss?"MISS":u.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,m.fromNodeOutgoingHttpHeaders)(u.value.headers);return o&&q||p.delete(g.NEXT_CACHE_TAGS_HEADER),!u.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,x.getCacheControlHeader)(u.cacheControl)),await (0,h.sendResponse)(B,z,new Response(u.value.body,{headers:p,status:u.value.status||200})),null};K?await l(K):await F.withPropagatedContext(e.headers,()=>F.trace(p.BaseServerSpan.handleRequest,{spanName:`${$} ${v}`,kind:s.SpanKind.SERVER,attributes:{"http.method":$,"http.target":e.url}},l))}catch(t){if(t instanceof R.NoFallbackError||await N.onRequestError(e,t,{routerKind:"App Router",routePath:I,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:S})}),q)throw t;return await (0,h.sendResponse)(B,z,new Response(null,{status:500})),null}}e.s(["handler",()=>A,"patchFetch",()=>T,"routeModule",()=>N,"serverHooks",()=>C,"workAsyncStorage",()=>b,"workUnitAsyncStorage",()=>O],56739)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0c2bf253._.js.map
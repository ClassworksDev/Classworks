if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>n(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(a.map((e=>d[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-dd2fb8cb"],(function(e){"use strict";importScripts("/sw-cache-manager.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"favicon.ico",revision:"8e3a55390cf66d227f765a6063bb6c31"},{url:"index.html",revision:"460218cf1d7f0deb763d6e9e240e7848"},{url:"manifest.webmanifest",revision:"f1439ade6b7d8aaac202ed429ac27cd2"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"sw-cache-manager.js",revision:"e1c99eed8d27ad84cb5fc7c56efd223b"},{url:"pwa/image/maskable-icon-512x512.png",revision:"dfa412c4bbe0f716216ac5db7a4c706d"},{url:"pwa/image/pwa-192x192.png",revision:"81802c789e8b735f7f8b181f002932f8"},{url:"pwa/image/pwa-512x512.png",revision:"57cc60501279a6d172b32211b1c67688"},{url:"pwa/image/pwa-64x64.png",revision:"b4ca4c3d8333391f20cddbb3f6cca2df"},{url:"manifest.webmanifest",revision:"f1439ade6b7d8aaac202ed429ac27cd2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>e.pathname.startsWith("/assets/")),new e.CacheFirst({cacheName:"assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:200,maxAgeSeconds:5184e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute((({url:e})=>e.pathname.startsWith("/pwa/")),new e.StaleWhileRevalidate({cacheName:"pwa-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute((({url:e})=>{const s=e.pathname;return!(s.includes("/assets/")||s.includes("/pwa/"))}),new e.NetworkFirst({cacheName:"other-resources",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:86400}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));

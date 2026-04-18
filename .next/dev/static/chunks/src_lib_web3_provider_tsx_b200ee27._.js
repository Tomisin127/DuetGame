(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/web3/provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DATA_SUFFIX",
    ()=>DATA_SUFFIX,
    "Web3Provider",
    ()=>Web3Provider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.19.5_@tanstack+query-core@5.95.0_@tanstack+react-query@5.95.0_react@19.2.4__@ty_8fb2ed849d0e5b1538ce271e07a91655/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$22$2e$1_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4_typesc_0971c131ee99fc26ce7b33b845b1ae9d$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@wagmi+core@2.22.1_@tanstack+query-core@5.95.0_@types+react@19.2.14_react@19.2.4_typesc_0971c131ee99fc26ce7b33b845b1ae9d/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.47.6_bufferutil@4.1.0_typescript@5.7.3_utf-8-validate@6.0.6_zod@3.25.76/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.47.6_bufferutil@4.1.0_typescript@5.7.3_utf-8-validate@6.0.6_zod@3.25.76/node_modules/viem/_esm/chains/definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$22$2e$1_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4_typesc_0971c131ee99fc26ce7b33b845b1ae9d$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@wagmi+core@2.22.1_@tanstack+query-core@5.95.0_@types+react@19.2.14_react@19.2.4_typesc_0971c131ee99fc26ce7b33b845b1ae9d/node_modules/@wagmi/core/dist/esm/connectors/injected.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$connectors$40$6$2e$2$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$types$2b$react$40$19$2e$2$2e$14_eeb949d96ce4bee23b06436459b024e5$2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$coinbaseWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@wagmi+connectors@6.2.0_@tanstack+react-query@5.95.0_react@19.2.4__@types+react@19.2.14_eeb949d96ce4bee23b06436459b024e5/node_modules/@wagmi/connectors/dist/esm/coinbaseWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+query-core@5.95.0/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.95.0_react@19.2.4/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ox$40$0$2e$12$2e$4_typescript$40$5$2e$7$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ox$2f$_esm$2f$erc8021$2f$Attribution$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Attribution$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ox@0.12.4_typescript@5.7.3_zod@3.25.76/node_modules/ox/_esm/erc8021/Attribution.js [app-client] (ecmascript) <export * as Attribution>");
'use client';
;
;
;
;
;
;
const DATA_SUFFIX = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ox$40$0$2e$12$2e$4_typescript$40$5$2e$7$2e$3_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ox$2f$_esm$2f$erc8021$2f$Attribution$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Attribution$3e$__["Attribution"].toDataSuffix({
    codes: [
        'bc_928el9vb'
    ]
});
// This entire module is loaded only on the client via dynamic({ ssr: false }) in layout.tsx.
// serverExternalPackages in next.config.mjs further ensures wagmi and its WalletConnect
// transitive deps are never bundled into the server build.
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$22$2e$1_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4_typesc_0971c131ee99fc26ce7b33b845b1ae9d$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"]
    ],
    connectors: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$22$2e$1_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4_typesc_0971c131ee99fc26ce7b33b845b1ae9d$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injected"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$connectors$40$6$2e$2$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$types$2b$react$40$19$2e$2$2e$14_eeb949d96ce4bee23b06436459b024e5$2f$node_modules$2f40$wagmi$2f$connectors$2f$dist$2f$esm$2f$coinbaseWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coinbaseWallet"])({
            appName: 'Duet Game',
            appLogoUrl: 'https://duet-game.vercel.app/logo.png'
        })
    ],
    transports: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$47$2e$6_bufferutil$40$4$2e$1$2e$0_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$6$2e$0$2e$6_zod$40$3$2e$25$2e$76$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])('https://mainnet.base.org')
    },
    dataSuffix: DATA_SUFFIX
});
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]();
function Web3Provider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$19$2e$5_$40$tanstack$2b$query$2d$core$40$5$2e$95$2e$0_$40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4_$5f40$ty_8fb2ed849d0e5b1538ce271e07a91655$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
        config: config,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$95$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/lib/web3/provider.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/lib/web3/provider.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = Web3Provider;
var _c;
__turbopack_context__.k.register(_c, "Web3Provider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/web3/provider.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/lib/web3/provider.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_lib_web3_provider_tsx_b200ee27._.js.map
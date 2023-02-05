import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Page } from "../coms";
import { useUqAppBase } from "../UqAppBase";
export function Logout({ onLogout, resetAll }) {
    let uqApp = useUqAppBase();
    async function onClickLogout() {
        await uqApp.logined(undefined);
        await onLogout?.();
        document.location.reload();
    }
    let header = '安全退出';
    let footer = _jsx("div", { className: "mt-5 text-center justify-content-center", children: _jsx("button", { className: "btn btn-outline-warning", onClick: resetAll, children: "\u5347\u7EA7\u8F6F\u4EF6" }, void 0) }, void 0);
    return _jsx(Page, { back: "back", header: header, footer: footer, children: _jsxs("div", { className: "my-5 border border-info bg-white rounded-3 p-5 text-center mx-auto w-max-40c ", children: [_jsx("div", { children: "\u9000\u51FA\u5F53\u524D\u8D26\u53F7\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55\u5386\u53F2\u6570\u636E\uFF0C\u4E0B\u6B21\u767B\u5F55\u4F9D\u7136\u53EF\u4EE5\u4F7F\u7528\u672C\u8D26\u53F7" }, void 0), _jsx("div", { className: "mt-5 text-center", children: _jsx("button", { className: "btn btn-danger", onClick: onClickLogout, children: "\u5B89\u5168\u9000\u51FA" }, void 0) }, void 0)] }, void 0) }, void 0);
}
//# sourceMappingURL=Logout.js.map
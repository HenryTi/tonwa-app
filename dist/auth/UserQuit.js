import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { PagePublic } from "../coms";
import { useModal, useUqAppBase } from "../UqAppBase";
const waitingTime = '一小时';
function MessageBox({ note, children }) {
    return _jsxs("div", { className: "border border-danger rounded mx-auto m-3 w-max-30c bg-white ", children: [_jsx("div", { className: "p-4 border-bottom", children: note }, void 0), _jsx("div", { className: "p-3 text-center", children: children }, void 0)] }, void 0);
}
export function UserQuit() {
    const navigate = useNavigate();
    const { openModal } = useModal();
    let note = _jsxs(_Fragment, { children: ["\u6CE8\u610F\uFF1A\u8D26\u53F7\u6CE8\u9500\u540E\uFF0C\u8D26\u53F7\u7ED1\u5B9A\u624B\u673A\u3001\u90AE\u4EF6\u7B49\u76F8\u5173\u4FE1\u606F\u5C06\u88AB\u91CA\u653E\u3002\u8D26\u53F7\u65E0\u6CD5\u5C06\u767B\u5F55\u3002", _jsx("br", {}, void 0), "\u8BF7\u786E\u8BA4\uFF01"] }, void 0);
    const quitCaption = '注销账号';
    function closePage() {
        navigate(-1);
    }
    return _jsx(PagePublic, { header: quitCaption, children: _jsxs(MessageBox, { note: note, children: [_jsx("button", { className: "btn btn-primary", onClick: () => navigate(-1), children: "\u4E0D\u6CE8\u9500" }, void 0), _jsx("button", { className: "btn btn-outline-info ms-3", onClick: () => openModal(_jsx(QuitConfirm, {}, void 0), quitCaption, closePage), children: "\u6211\u5DF2\u4E86\u89E3\uFF0C\u4ECD\u7136\u6CE8\u9500" }, void 0)] }, void 0) }, void 0);
}
function QuitConfirm() {
    let uqApp = useUqAppBase();
    const { openModal, closeModal } = useModal();
    let note = _jsxs(_Fragment, { children: ["\u8D26\u53F7\u6CE8\u9500\u540E\uFF0C\u5982\u679C\u5728", waitingTime, "\u5185\u5BB9\u91CD\u65B0\u767B\u5F55\u8D26\u53F7\uFF0C\u8D26\u53F7\u81EA\u52A8\u6062\u590D\u3002", waitingTime, "\u4E4B\u540E\uFF0C\u8D26\u53F7\u7ED1\u5B9A\u624B\u673A\u3001\u90AE\u4EF6\u7B49\u76F8\u5173\u4FE1\u606F\u5C06\u88AB\u91CA\u653E\u3002\u8D26\u53F7\u65E0\u6CD5\u5C06\u767B\u5F55\u3002", _jsx("br", {}, void 0), "\u8BF7\u518D\u6B21\u786E\u8BA4\uFF01"] }, void 0);
    let onClickButton2 = async () => {
        await uqApp.userApi.userQuit();
        closeModal();
        await openModal(_jsx(QuitDone, {}, void 0), '注销已账号', () => uqApp.restart());
    };
    return _jsxs(MessageBox, { note: note, children: [_jsx("button", { className: "btn btn-primary", onClick: () => closeModal(), children: "\u4E0D\u6CE8\u9500" }, void 0), _jsx("button", { className: "btn btn-outline-info ms-3", onClick: onClickButton2, children: "\u786E\u8BA4\u6CE8\u9500" }, void 0)] }, void 0);
}
function QuitDone() {
    let uqApp = useUqAppBase();
    const { openModal, closeModal } = useModal();
    let note = _jsxs(_Fragment, { children: ["\u8D26\u53F7\u5C06\u5728", waitingTime, "\u540E\u5F7B\u5E95\u6CE8\u9500\u3002", _jsx("br", {}, void 0), "\u5982\u679C\u5728", waitingTime, "\u5185\u5BB9\u91CD\u65B0\u767B\u5F55\u8D26\u53F7\uFF0C\u6CE8\u9500\u64CD\u4F5C\u81EA\u52A8\u53D6\u6D88\u3002", waitingTime, "\u4E4B\u540E\uFF0C\u8D26\u53F7\u7ED1\u5B9A\u624B\u673A\u3001\u90AE\u4EF6\u7B49\u76F8\u5173\u4FE1\u606F\u5C06\u88AB\u91CA\u653E\u3002\u8D26\u53F7\u65E0\u6CD5\u5C06\u767B\u5F55\u3002"] }, void 0);
    let onClickButton1 = () => {
        openModal(_jsx(QuitCancel, {}, void 0), '恢复账号', () => uqApp.restart());
    };
    return _jsx(MessageBox, { note: note, children: _jsx("button", { className: "btn btn-primary", onClick: onClickButton1, children: "\u53CD\u6094\u4E86\uFF0C\u4E0D\u8981\u6CE8\u9500" }, void 0) }, void 0);
}
function QuitCancel() {
    let uqApp = useUqAppBase();
    let note = _jsxs(_Fragment, { children: ["\u91CD\u65B0\u767B\u5F55\u4E4B\u540E\uFF0C\u8D26\u53F7\u5C06\u6062\u590D\u3002", _jsx("br", {}, void 0)] }, void 0);
    async function restore() {
        await uqApp.logined(undefined);
        uqApp.restart();
    }
    return _jsx(MessageBox, { note: note, children: _jsx("button", { className: "btn btn-primary", onClick: restore, children: "\u91CD\u65B0\u767B\u5F55" }, void 0) }, void 0);
}
//# sourceMappingURL=UserQuit.js.map
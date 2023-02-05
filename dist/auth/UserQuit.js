import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, Outlet, Route, useNavigate } from "react-router-dom";
import { Page } from "../coms";
import { useUqAppBase } from "../UqAppBase";
const waitingTime = '一小时';
const pathQuitDone = 'done';
function Quit({ header, back, note, children }) {
    return _jsx(Page, { header: header ?? '注销账号', back: back, children: _jsxs("div", { className: "border border-danger rounded mx-auto m-3 w-max-30c bg-white ", children: [_jsx("div", { className: "p-4 border-bottom", children: note }, void 0), _jsx("div", { className: "p-3 text-center", children: children }, void 0)] }, void 0) }, void 0);
}
/*
abstract class VUserQuitBase extends VPage<CLogin> {
    protected abstract get note(): any;
    protected get button1Caption(): string { return undefined; }
    protected get button2Caption(): string { return undefined; }
    protected renderButton1(): JSX.Element {
        let caption = this.button1Caption;
        if (caption === null) return null;
        return <button className="btn btn-primary" onClick={() => this.onClickButton1()}>
            {caption ?? '不注销'}
        </button>;
    }
    protected renderButton2(): JSX.Element {
        let caption = this.button2Caption;
        if (caption === null) return null;
        return <button className="btn btn-outline-info ms-3" onClick={() => this.onClickButton2()}>
            {caption ?? '确认注销'}
        </button>;
    }
    header() { return '注销账号' }
    content() {
        return <div className="border border-danger rounded mx-auto m-3 w-max-30c bg-white ">
            <div className="p-4 border-bottom">{this.note}</div>
            <div className="p-3 text-center">
                {this.renderButton1()}
                {this.renderButton2()}
            </div>
        </div>
    }

    protected onClickButton1() {
        this.closePage();
    }

    protected onClickButton2() {
    }
}
*/
export function UserQuit() {
    const pathConfirm = 'confirm';
    let note = _jsxs(_Fragment, { children: ["\u6CE8\u610F\uFF1A\u8D26\u53F7\u6CE8\u9500\u540E\uFF0C\u8D26\u53F7\u7ED1\u5B9A\u624B\u673A\u3001\u90AE\u4EF6\u7B49\u76F8\u5173\u4FE1\u606F\u5C06\u88AB\u91CA\u653E\u3002\u8D26\u53F7\u65E0\u6CD5\u5C06\u767B\u5F55\u3002", _jsx("br", {}, void 0), "\u8BF7\u786E\u8BA4\uFF01"] }, void 0);
    const pageIndex = _jsxs(Quit, { note: note, children: [_jsx(Link, { className: "btn btn-primary", to: -1, children: "\u4E0D\u6CE8\u9500" }, void 0), _jsx(Link, { className: "btn btn-outline-info ms-3", to: pathConfirm, children: "\u6211\u5DF2\u4E86\u89E3\uFF0C\u4ECD\u7136\u6CE8\u9500" }, void 0)] }, void 0);
    return _jsxs(Route, { element: _jsx(Outlet, {}, void 0), children: [_jsx(Route, { index: true, element: pageIndex }, void 0), _jsx(Route, { path: pathConfirm, element: _jsx(QuitConfirm, {}, void 0) }, void 0), _jsx(Route, { path: pathQuitDone, element: _jsx(QuitDone, {}, void 0) }, void 0)] }, void 0);
}
function QuitConfirm() {
    const navigate = useNavigate();
    let uqApp = useUqAppBase();
    let note = _jsxs(_Fragment, { children: ["\u8D26\u53F7\u6CE8\u9500\u540E\uFF0C\u5982\u679C\u5728", waitingTime, "\u5185\u5BB9\u91CD\u65B0\u767B\u5F55\u8D26\u53F7\uFF0C\u8D26\u53F7\u81EA\u52A8\u6062\u590D\u3002", waitingTime, "\u4E4B\u540E\uFF0C\u8D26\u53F7\u7ED1\u5B9A\u624B\u673A\u3001\u90AE\u4EF6\u7B49\u76F8\u5173\u4FE1\u606F\u5C06\u88AB\u91CA\u653E\u3002\u8D26\u53F7\u65E0\u6CD5\u5C06\u767B\u5F55\u3002", _jsx("br", {}, void 0), "\u8BF7\u518D\u6B21\u786E\u8BA4\uFF01"] }, void 0);
    let onClickButton2 = async () => {
        await uqApp.userApi.userQuit();
        //let centerAppApi = new CenterAppApi(this.controller.net, 'tv/');
        //await centerAppApi.userQuit();
        navigate(pathQuitDone);
    };
    return _jsxs(Quit, { note: note, children: [_jsx(Link, { className: "btn btn-primary", to: -2, children: "\u4E0D\u6CE8\u9500" }, void 0), _jsx("button", { className: "btn btn-outline-info ms-3", onClick: onClickButton2, children: "\u786E\u8BA4\u6CE8\u9500" }, void 0)] }, void 0);
}
function QuitDone() {
    let uqApp = useUqAppBase();
    let note = _jsxs(_Fragment, { children: ["\u8D26\u53F7\u5C06\u5728", waitingTime, "\u540E\u5F7B\u5E95\u6CE8\u9500\u3002", _jsx("br", {}, void 0), "\u5982\u679C\u5728", waitingTime, "\u5185\u5BB9\u91CD\u65B0\u767B\u5F55\u8D26\u53F7\uFF0C\u6CE8\u9500\u64CD\u4F5C\u81EA\u52A8\u53D6\u6D88\u3002", waitingTime, "\u4E4B\u540E\uFF0C\u8D26\u53F7\u7ED1\u5B9A\u624B\u673A\u3001\u90AE\u4EF6\u7B49\u76F8\u5173\u4FE1\u606F\u5C06\u88AB\u91CA\u653E\u3002\u8D26\u53F7\u65E0\u6CD5\u5C06\u767B\u5F55\u3002"] }, void 0);
    let onClickButton1 = async () => {
        await uqApp.logined(undefined);
    };
    return _jsx(Quit, { header: "\u6CE8\u9500\u5DF2\u8D26\u53F7", note: note, back: "none", children: _jsx("button", { className: "btn btn-primary", onClick: onClickButton1, children: "\u4E0D\u6CE8\u9500" }, void 0) }, void 0);
}
//# sourceMappingURL=UserQuit.js.map
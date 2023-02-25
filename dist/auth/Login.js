import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from 'tonwa-com';
import { BandString, ruleIsRequired } from 'tonwa-com';
import { Submit } from 'tonwa-com';
import { BandPassword } from 'tonwa-com';
import { Band } from 'tonwa-com';
import { FormErrors } from 'tonwa-com';
import { PagePublic } from '../coms';
import { useUqAppBase } from '../UqAppBase';
import { PageForget, PageRegister } from './register/PageRegister';
import { getSender } from './tools';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { pathForget, pathRegister } from './register/ModalPassword';
import { AuthFormBandTemplate } from './AuthFormBandTemplate';
export function Login({ url, withBack, loginTop, privacy, callback }) {
    let uqApp = useUqAppBase();
    let { userApi, guest } = uqApp;
    const navigate = useNavigate();
    let onLogin = async (un, pwd) => {
        let user = await userApi.login({
            user: un,
            pwd: pwd,
            guest,
        });
        if (user === undefined)
            return false;
        console.log("onLoginSubmit: user=%s pwd:%s", user.name, user.token);
        await uqApp.logined(user);
        await callback?.(user);
        navigate(url ?? '/', { replace: true });
        return true;
    };
    let onSubmit = async (values) => {
        let un = values['username'];
        let pwd = values['password'];
        if (pwd === undefined) {
            return 'something wrong, pwd is undefined';
        }
        let ret = await onLogin(un, pwd);
        if (ret === true)
            return;
        let sender = getSender(un);
        let type = sender !== undefined ? sender.caption : '用户名';
        return type + '或密码错！';
    };
    /*
    let onEnter = async (name: string, context: Context): Promise<string> => {
        if (name === 'password') {
            return await onSubmit('login', context);
        }
    }
    */
    let header = withBack === true ? '登录' : false;
    function PageIndex() {
        return _jsx(PagePublic, { header: header, footer: privacy, children: _jsxs("div", { className: "d-flex p-5 flex-column justify-content-center align-items-center", children: [_jsx("div", { className: "flex-fill" }, void 0), _jsxs("div", { className: "w-30c", children: [loginTop ?? _jsx("div", { className: "text-center p-3 fs-5 text-primary", children: "\u767B\u5F55" }, void 0), _jsx("div", { className: "h-2c" }, void 0), _jsxs(Form, { BandTemplate: AuthFormBandTemplate, children: [_jsx(BandString, { label: "\u767B\u5F55\u8D26\u53F7", name: "username", placeholder: "\u624B\u673A/\u90AE\u7BB1/\u7528\u6237\u540D", rule: ruleIsRequired, maxLength: 100 }, void 0), _jsx(BandPassword, { label: "\u5BC6\u7801", name: "password", placeholder: "\u5BC6\u7801", rule: ruleIsRequired, maxLength: 100 }, void 0), _jsx(Band, { children: _jsx(FormErrors, {}, void 0) }, void 0), _jsx(Band, { contentContainerClassName: "my-3", children: _jsx(Submit, { onSubmit: onSubmit, children: _jsx("div", { className: 'mx-5', children: "\u767B\u5F55" }, void 0) }, void 0) }, void 0)] }, void 0), _jsx("div", { className: "row", children: _jsxs("div", { className: "offset-sm-3", children: [_jsx(Link, { className: "btn btn-link", to: pathForget, children: "\u5FD8\u8BB0\u5BC6\u7801" }, void 0), _jsx(Link, { className: "btn btn-link", to: pathRegister, children: "\u6CE8\u518C\u8D26\u53F7" }, void 0)] }, void 0) }, void 0)] }, void 0), _jsx("div", { className: "flex-fill" }, void 0), _jsx("div", { className: "flex-fill" }, void 0)] }, void 0) }, void 0);
    }
    function OutletLogin() {
        return _jsx(Outlet, {}, void 0);
    }
    return _jsx(Routes, { children: _jsxs(Route, { element: _jsx(OutletLogin, {}, void 0), children: [_jsx(Route, { index: true, element: _jsx(PageIndex, {}, void 0) }, void 0), _jsx(Route, { path: pathForget, element: _jsx(PageForget, { loginTop: loginTop, privacy: privacy }, void 0) }, void 0), _jsx(Route, { path: pathRegister, element: _jsx(PageRegister, { loginTop: loginTop, privacy: privacy }, void 0) }, void 0)] }, void 0) }, void 0);
}
//# sourceMappingURL=Login.js.map
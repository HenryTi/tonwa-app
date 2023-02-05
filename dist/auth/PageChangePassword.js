import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, Route, useNavigate } from "react-router-dom";
import { Band } from "tonwa-com";
import { BandPassword } from "tonwa-com";
import { Form, Submit, FormErrors } from "tonwa-com";
import { PagePublic } from "../coms";
import { useUqAppBase } from "../UqAppBase";
import { AuthFormBandTemplate } from "./AuthFormBandTemplate";
const pathChangeSucceed = '/changeSucceed';
export function PageChangePassword() {
    return _jsxs(_Fragment, { children: [_jsx(Outlet, {}, void 0), _jsxs(Route, { element: _jsx(PageChangePassword, {}, void 0), children: [_jsx(Route, { index: true, element: _jsx(PageChangePasswordIndex, {}, void 0) }, void 0), _jsx(Route, { path: pathChangeSucceed, element: _jsx(PageChangeSucceed, {}, void 0) }, void 0)] }, void 0)] }, void 0);
}
function PageChangePasswordIndex() {
    const navigate = useNavigate();
    let uqApp = useUqAppBase();
    let onSubmit = async (data) => {
        let { orgPassword, newPassword, newPassword1 } = data;
        if (newPassword !== newPassword1) {
            return ['newPassword1', '新密码错误，请重新输入'];
        }
        //let centerAppApi = new CenterAppApi('tv/', undefined);
        //let ret = await centerAppApi.changePassword({orgPassword, newPassword});
        let ret = await uqApp.userApi.changePassword({ orgPassword, newPassword });
        if (ret === false) {
            return ['orgPassword', '原密码错误'];
        }
        navigate(pathChangeSucceed, { replace: true });
    };
    return _jsx(PagePublic, { header: "\u4FEE\u6539\u5BC6\u7801", children: _jsxs(Form, { className: "m-3 w-30c mx-auto", BandTemplate: AuthFormBandTemplate, children: [_jsx(BandPassword, { name: "orgPassword", label: "\u539F\u5BC6\u7801", placeholder: "\u8F93\u5165\u539F\u6765\u7684\u5BC6\u7801", maxLength: 60 }, void 0), _jsx(BandPassword, { name: "newPassword", label: "\u65B0\u5BC6\u7801", placeholder: "\u8F93\u5165\u65B0\u8BBE\u7684\u5BC6\u7801", maxLength: 60 }, void 0), _jsx(BandPassword, { name: "newPassword1", label: "\u786E\u8BA4\u5BC6\u7801", placeholder: "\u518D\u6B21\u8F93\u5165\u65B0\u8BBE\u5BC6\u7801", maxLength: 60 }, void 0), _jsx(Band, { children: _jsx(FormErrors, {}, void 0) }, void 0), _jsx(Band, { children: _jsx(Submit, { onSubmit: onSubmit, children: "\u63D0\u4EA4" }, void 0) }, void 0)] }, void 0) }, void 0);
}
function PageChangeSucceed() {
    return _jsx(PagePublic, { header: "\u4FEE\u6539\u5BC6\u7801", back: "close", children: _jsx("div", { className: "m-3  text-success", children: "\u5BC6\u7801\u4FEE\u6539\u6210\u529F\uFF01" }, void 0) }, void 0);
}
//# sourceMappingURL=PageChangePassword.js.map
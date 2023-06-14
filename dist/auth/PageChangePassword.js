import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Band } from "tonwa-com";
import { BandPassword } from "tonwa-com";
import { Form, Submit, FormErrors } from "tonwa-com";
import { Page } from "../coms";
import { useModal, useUqAppBase } from "../UqAppBase";
import { AuthFormBandTemplate } from "./AuthFormBandTemplate";
export function PageChangePassword() {
    const navigate = useNavigate();
    const { openModal } = useModal();
    let uqApp = useUqAppBase();
    let onSubmit = async (data) => {
        let { orgPassword, newPassword, newPassword1 } = data;
        if (newPassword !== newPassword1) {
            return ['newPassword1', '新密码错误，请重新输入'];
        }
        let ret = await uqApp.userApi.changePassword({ orgPassword, newPassword });
        if (ret === false) {
            return ['orgPassword', '原密码错误'];
        }
        openModal(_jsx(ChangeSucceed, {}), () => navigate(-1));
    };
    return _jsx(Page, { auth: false, header: "\u4FEE\u6539\u5BC6\u7801", children: _jsxs(Form, { className: "m-3 w-30c mx-auto", BandTemplate: AuthFormBandTemplate, children: [_jsx(BandPassword, { name: "orgPassword", label: "\u539F\u5BC6\u7801", placeholder: "\u8F93\u5165\u539F\u6765\u7684\u5BC6\u7801", maxLength: 60 }), _jsx(BandPassword, { name: "newPassword", label: "\u65B0\u5BC6\u7801", placeholder: "\u8F93\u5165\u65B0\u8BBE\u7684\u5BC6\u7801", maxLength: 60 }), _jsx(BandPassword, { name: "newPassword1", label: "\u786E\u8BA4\u5BC6\u7801", placeholder: "\u518D\u6B21\u8F93\u5165\u65B0\u8BBE\u5BC6\u7801", maxLength: 60 }), _jsx(Band, { children: _jsx(FormErrors, {}) }), _jsx(Band, { children: _jsx(Submit, { onSubmit: onSubmit, children: "\u63D0\u4EA4" }) })] }) });
}
function ChangeSucceed() {
    return _jsx(Page, { auth: false, header: "\u5BC6\u7801\u4FEE\u6539", children: _jsx("div", { className: "m-3  text-success", children: "\u5BC6\u7801\u4FEE\u6539\u6210\u529F\uFF01" }) });
}
//# sourceMappingURL=PageChangePassword.js.map
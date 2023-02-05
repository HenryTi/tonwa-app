import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FA } from 'tonwa-com';
import { Band } from 'tonwa-com';
import { BandPassword } from 'tonwa-com';
import { Form, Submit } from 'tonwa-com';
import { useModal, useUqAppBase } from '../../UqAppBase';
import { useRef } from 'react';
import { AuthFormBandTemplate } from '../AuthFormBandTemplate';
export const pathForget = 'forget';
export const pathRegister = 'register';
function ModalPasswordBase({ submitCaption, account, onPasswordSubmit }) {
    const { openModal } = useModal();
    const context = useRef({});
    let onButtonSubmit = async (values) => {
        let { pwd, rePwd } = values;
        let error;
        if (!pwd || pwd !== rePwd) {
            error = '密码错误，请重新输入密码！';
            return [['pwd', undefined], ['rePwd', undefined], ['pwd', error]];
        }
        else {
            error = await onPasswordSubmit(pwd);
            context.current.error = error;
            if (error !== undefined) {
                openModal(_jsx("div", { className: "p-5 text-danger", children: context.current.error }, void 0), '注册不成功');
            }
        }
        return error;
    };
    /*
    let onEnter = async (name: string, context: Context): Promise<string> => {
        if (name === 'rePwd') {
            return await onButtonSubmit('submit', context);
        }
    }
    */
    return _jsxs("div", { className: "w-min-30c my-5 py-5 mx-auto", children: [_jsx("div", { className: "h-1c" }, void 0), _jsxs(Form, { BandTemplate: AuthFormBandTemplate, children: [_jsx(Band, { label: "\u8D26\u53F7", contentContainerClassName: 'd-flex align-items-center', children: _jsx("b", { className: 'text-primary', children: account }, void 0) }, void 0), _jsx(BandPassword, { name: "pwd", label: "\u5BC6\u7801", placeholder: "\u5BC6\u7801", maxLength: 100 }, void 0), _jsx(BandPassword, { name: "rePwd", label: "\u91CD\u590D\u5BC6\u7801", placeholder: "\u91CD\u590D\u5BC6\u7801", maxLength: 100 }, void 0), _jsx(Band, { contentContainerClassName: "mt-3", children: _jsx(Submit, { onSubmit: onButtonSubmit, children: submitCaption }, void 0) }, void 0)] }, void 0)] }, void 0);
}
;
export function ModalRegisterPassword({ passwordParams }) {
    const { openModal } = useModal();
    let { userApi } = useUqAppBase();
    let { type, account, verify } = passwordParams;
    let onPasswordSubmit = async (pwd) => {
        passwordParams.password = pwd;
        let params = {
            nick: undefined,
            user: account,
            pwd,
            country: undefined,
            mobile: undefined,
            mobileCountry: undefined,
            email: undefined,
            verify: verify
        };
        switch (type) {
            case 'mobile':
                params.mobile = Number(account);
                params.mobileCountry = 86;
                break;
            case 'email':
                params.email = account;
                break;
        }
        let ret = await userApi.register(params);
        if (ret === 0) {
            openModal(_jsx(RegisterSuccess, {}, void 0));
            return;
        }
        let error = regReturn(ret);
        return error;
    };
    function regReturn(registerReturn) {
        let msg;
        switch (registerReturn) {
            default: return '服务器发生错误';
            case 4: return '验证码错误';
            case 0: return;
            case 1:
                msg = '用户名 ' + account;
                break;
            case 2:
                msg = '手机号 +' + account;
                break;
            case 3:
                msg = '邮箱 ' + account;
                break;
        }
        return msg + ' 已经被注册过了';
    }
    return _jsx(ModalPasswordBase, { submitCaption: "\u6CE8\u518C\u65B0\u8D26\u53F7", account: account, onPasswordSubmit: onPasswordSubmit }, void 0);
    function RegisterSuccess() {
        let { account, toLogin } = passwordParams;
        return _jsx("div", { className: "container w-min-30c mx-auto", children: _jsxs("div", { className: "my-5 text-center", children: [_jsxs("div", { className: "py-5", children: [_jsx(FA, { name: 'check-circle', className: "me-2" }, void 0), "\u8D26\u53F7 ", _jsxs("strong", { className: "text-primary", children: [account, " "] }, void 0), " \u6CE8\u518C\u6210\u529F\uFF01"] }, void 0), _jsx("button", { className: "btn btn-success btn-block", type: "button", onClick: toLogin, children: "\u76F4\u63A5\u767B\u5F55" }, void 0)] }, void 0) }, void 0);
    }
}
export function ModalForgetPassword({ passwordParams }) {
    const { openModal, closeModal } = useModal();
    let { userApi } = useUqAppBase();
    let { account, verify, type, toLogin } = passwordParams;
    let onPasswordSubmit = async (pwd) => {
        passwordParams.password = pwd;
        let ret = await userApi.resetPassword(account, pwd, verify, type);
        if (ret.length === 0) {
            let err = 'something wrong in reseting password';
            console.log(err);
            throw err;
        }
        closeModal();
        openModal(_jsx(ForgetSuccess, {}, void 0));
        return;
    };
    return _jsx(ModalPasswordBase, { submitCaption: "\u6539\u5BC6\u7801", account: account, onPasswordSubmit: onPasswordSubmit }, void 0);
    function ForgetSuccess() {
        return _jsx("div", { className: "container w-min-30c mx-auto", children: _jsxs("div", { className: "my-5 text-center", children: [_jsxs("div", { className: "py-5 text-success", children: [_jsx(FA, { name: 'check-circle', className: "me-2" }, void 0), "\u6210\u529F\u4FEE\u6539\u5BC6\u7801"] }, void 0), _jsx("button", { className: "btn btn-primary btn-block", onClick: toLogin, children: "\u767B\u5F55\u8D26\u53F7" }, void 0)] }, void 0) }, void 0);
    }
}
//# sourceMappingURL=ModalPassword.js.map
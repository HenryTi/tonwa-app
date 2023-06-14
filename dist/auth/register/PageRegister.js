import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BandString } from 'tonwa-com';
import { Band } from 'tonwa-com';
import { Form, Submit } from 'tonwa-com';
import { Page } from '../../coms';
import { getSender } from '../tools';
import { ModalVerify } from './ModalVerify';
import { ModalForgetPassword, ModalRegisterPassword } from './ModalPassword';
import { useModal, useUqAppBase } from '../../UqAppBase';
import { AuthFormBandTemplate } from '../AuthFormBandTemplate';
function PageRegisterBase({ header, accountLable, privacy, loginTop, ModalPassword, accountError, sendVerifyOem }) {
    const { openModal } = useModal();
    const navigate = useNavigate();
    const uqApp = useUqAppBase();
    const { userApi, pathLogin } = uqApp;
    let { current: passwordParams } = useRef({ toLogin });
    function toLogin() {
        uqApp.closeAllModal();
        navigate(pathLogin);
    }
    async function onValuesChanged({ name, value }, context) {
        let field = context.fields['submit'];
        if (field) {
            context.setDisabled('submit', value.length < 6);
        }
    }
    let onSubmit = async (values) => {
        let user = 'user';
        let value = values[user];
        let sender = getSender(value);
        if (sender === undefined) {
            return [undefined, [user, '必须是手机号或邮箱']];
        }
        let type = sender.type;
        if (type === 'mobile') {
            if (value.length !== 11 || value[0] !== '1') {
                return [undefined, [user, '请输入正确的手机号']];
            }
        }
        let account = value;
        let ret = await userApi.isExists(account);
        let error = accountError(ret);
        if (error !== undefined)
            return error;
        ret = await userApi.sendVerify(account, type, sendVerifyOem);
        // ret值  0: 60秒之内发送过，1: 新发送,  2: 超过60秒，已经发送
        passwordParams.account = account;
        passwordParams.type = type;
        /*
        if (ret) {
            return [undefined, [user, ret]];
        }
        */
        async function onVerify(verify) {
            passwordParams.verify = verify;
            let ret = await userApi.checkVerify(account, verify);
            if (ret === 0)
                return ret;
            openModal(_jsx(ModalPassword, { header: header, passwordParams: passwordParams }));
        }
        openModal(_jsx(ModalVerify, { header: header, onVerify: onVerify, passwordParams: passwordParams }));
    };
    /*
        let onEnter = async (name: string, context: Context): Promise<string> => {
            if (name === 'user') {
                return await onSubmit('verify', context);
            }
        }
    */
    return _jsx(Page, { auth: false, header: header, footer: privacy, children: _jsx("div", { className: "d-grid", children: _jsxs("div", { className: "d-grid w-20c my-5 py-5", style: { marginLeft: 'auto', marginRight: 'auto' }, children: [loginTop ?? _jsx("div", { className: "text-center p-3 fs-5 text-primary", children: "\u6CE8\u518C" }), _jsx("div", { className: "h-3c" }), _jsxs(Form, { BandTemplate: AuthFormBandTemplate, onValuesChanged: onValuesChanged, children: [_jsx(BandString, { name: "user", label: accountLable, placeholder: "\u624B\u673A\u53F7\u6216\u90AE\u7BB1" }), _jsx(Band, { contentContainerClassName: 'mt-3', children: _jsx(Submit, { name: "submit", onSubmit: onSubmit, disabled: true, children: "\u53D1\u9001\u9A8C\u8BC1\u7801" }) })] }), _jsx("div", { className: "text-center py-3", children: _jsx(Link, { className: "btn btn-link text-primary", to: '/login', children: "\u5DF2\u6709\u8D26\u53F7\uFF0C\u76F4\u63A5\u767B\u5F55" }) })] }) }) });
}
export function PageRegister(props) {
    let { loginTop, privacy } = props;
    let accountError = (isExists) => {
        if (isExists > 0)
            return '已经被注册使用了';
    };
    return _jsx(PageRegisterBase, { header: "\u6CE8\u518C\u8D26\u53F7", accountLable: "\u8D26\u53F7", ModalPassword: ModalRegisterPassword, accountError: accountError, sendVerifyOem: undefined, loginTop: loginTop, privacy: privacy });
}
export function PageForget(props) {
    let { loginTop, privacy } = props;
    let accountError = (isExists) => {
        if (isExists === 0)
            return '请输入正确的账号';
    };
    return _jsx(PageRegisterBase, { header: "\u5BC6\u7801\u627E\u56DE", accountLable: "\u8D26\u53F7", ModalPassword: ModalForgetPassword, accountError: accountError, sendVerifyOem: undefined, loginTop: loginTop, privacy: privacy });
}
//# sourceMappingURL=PageRegister.js.map
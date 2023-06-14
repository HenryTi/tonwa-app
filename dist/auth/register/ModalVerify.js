import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BandInt, Form } from "tonwa-com";
import { ruleIsRequired } from "tonwa-com";
import { Band } from "tonwa-com";
import { Submit } from "tonwa-com";
import { Page } from "../../coms";
import { AuthFormBandTemplate } from "../AuthFormBandTemplate";
export function ModalVerify({ passwordParams, onVerify, header }) {
    let { type, account } = passwordParams;
    let onSubmit = async (values) => {
        let verify = values['verify'];
        let ret = await onVerify(verify);
        if (ret === 0) {
            return [['verify', '验证码错误']];
        }
    };
    async function onValuesChanged({ name, value }, context) {
        let field = context.fields['submit'];
        if (field) {
            context.setDisabled('submit', value.length > 0);
        }
    }
    let typeText, extra;
    switch (type) {
        case 'mobile':
            typeText = '手机号';
            break;
        case 'email':
            typeText = '邮箱';
            extra = _jsxs("small", { children: [_jsx("span", { className: "text-danger", children: "\u6CE8\u610F" }), ": \u6709\u53EF\u80FD\u8BEF\u4E3A\u5783\u573E\u90AE\u4EF6\uFF0C\u8BF7\u68C0\u67E5", _jsx("br", {})] });
            break;
    }
    return _jsx(Page, { header: header, children: _jsxs("div", { className: "w-min-20c my-5 py-5 mx-auto", children: [_jsxs("div", { className: "text-center mb-4", children: ["\u9A8C\u8BC1\u7801\u5DF2\u7ECF\u53D1\u9001\u5230", typeText, " ", _jsx("b", { children: account }), _jsx("br", {}), extra] }), _jsx("div", {}), _jsx("div", { className: "h-1c" }), _jsxs(Form, { onValuesChanged: onValuesChanged, BandTemplate: AuthFormBandTemplate, children: [_jsx(BandInt, { name: "verify", label: "\u9A8C\u8BC1\u7801", placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801", maxLength: 6, rule: ruleIsRequired }), _jsx(Band, { contentContainerClassName: 'mt-3', children: _jsxs(Submit, { name: "submit", onSubmit: onSubmit, children: ["\u4E0B\u4E00\u6B65 ", '>'] }) })] })] }) });
}
//# sourceMappingURL=ModalVerify.js.map
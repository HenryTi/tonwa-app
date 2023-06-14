import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BandFieldErrors, BandMemos } from "tonwa-com";
export function AuthFormBandTemplate(props) {
    let { label, children, errors, memos, contentContainerClassName } = props;
    let vLabel;
    let cnContent = 'col-sm-9 ' + (contentContainerClassName ?? '');
    if (label) {
        vLabel = _jsx("label", { className: "col-sm-3 col-form-label text-sm-end", children: _jsx("b", { children: label }) });
    }
    else {
        cnContent += ' offset-sm-3';
    }
    return _jsxs("div", { className: "mb-3 row bg-white", children: [vLabel, _jsxs("div", { className: cnContent, children: [children, _jsx(BandFieldErrors, { errors: errors }), _jsx(BandMemos, { memos: memos })] })] });
}
//# sourceMappingURL=AuthFormBandTemplate.js.map
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from "react";
import { FA } from "tonwa-com";
import { Form, Submit } from "tonwa-com";
import { Page } from "../page";
import { Band, BandContainerContext, BandContentType, BandFieldErrors, BandMemos, useBand, useBandContainer, VBandContainerContext } from "tonwa-com";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
class DetailContext extends BandContainerContext {
    get isDetail() {
        return true;
    }
    label;
    content;
}
const pathEditDetail = 'edit';
export function PropEdit(props) {
    let { children, BandTemplate } = props;
    BandTemplate = BandTemplate ?? DefaultBandTemplate;
    let { current: detailContext } = useRef(new DetailContext({ ...props, BandTemplate }));
    function Main() {
        return _jsx(VBandContainerContext.Provider, { value: detailContext, children: children });
    }
    return _jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Main, {}) }), _jsx(Route, { path: pathEditDetail, element: _jsx(ValueEditPage, { detail: detailContext }) })] }) });
}
function DefaultBandTemplate(props) {
    // let detailContext = useOutletContext<DetailContext>();
    let detailContext = useBandContainer();
    let band = useBand();
    let { label, labelSize, children, errors, memos, toEdit, content, sep, contentType, rightIcon } = props;
    labelSize = labelSize ?? 2;
    let labelContent = contentType === BandContentType.check ? null : _jsx("b", { children: label });
    let vLabel = _jsx("label", { className: `col-sm-${labelSize} col-form-label text-sm-end tonwa-bg-gray-1 border-end align-self-center py-3`, children: labelContent });
    let cnContent = `col-sm-${12 - labelSize} d-flex pe-0 align-items-center`;
    function RightIcon({ icon, toEdit }) {
        return _jsx(Link, { to: toEdit, className: "px-3 align-self-stretch d-flex align-items-center cursor-pointer", children: icon ?? _jsx(FA, { name: "pencil", className: "text-info" }) });
    }
    if (band.readOnly === true) {
        rightIcon = null;
    }
    else if (contentType === BandContentType.com) {
        if (toEdit) {
            rightIcon = _jsx(RightIcon, { toEdit: toEdit, icon: rightIcon });
        }
    }
    else {
        detailContext.label = label;
        detailContext.content = content;
        toEdit = pathEditDetail;
        rightIcon = _jsx(RightIcon, { toEdit: toEdit, icon: rightIcon });
    }
    return _jsx(_Fragment, { children: _jsxs("div", { className: "row bg-white mx-0", children: [vLabel, _jsxs("div", { className: cnContent, children: [_jsxs("div", { className: "flex-grow-1", children: [_jsx("div", { children: children }), _jsx(BandFieldErrors, { errors: errors }), _jsx(BandMemos, { memos: memos })] }), rightIcon] })] }) });
}
function ValueEditPage({ detail }) {
    const { content, label, onValuesChanged } = detail; // useOutletContext<DetailContext>();
    const navigate = useNavigate();
    async function onSubmit(data) {
        await onValuesChanged(data);
        navigate(-1);
    }
    let values = detail.getValues();
    return _jsx(Page, { header: label, back: "close", children: _jsxs(Form, { className: "container px-3 py-3", values: values, BandTemplate: ValueEditBandTemplate, children: [_jsx(Band, { children: content }), _jsx(Submit, { onSubmit: onSubmit })] }) });
}
function ValueEditBandTemplate(props) {
    let { children, errors, memos } = props;
    return _jsxs("div", { className: "bg-white mb-3", children: [children, _jsx(BandFieldErrors, { errors: errors }), _jsx(BandMemos, { memos: memos })] });
}
//# sourceMappingURL=PropEdit.js.map
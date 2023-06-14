import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { ButtonAsync, FA, LabelRow } from "tonwa-com";
import { useModal } from "../UqAppBase";
import { Page } from "./page";
export function LabelRowEdit(props) {
    let { label, value: initValue, readonly, pickValue, onValueChanged, ValueTemplate } = props;
    const { openModal, closeModal } = useModal();
    const [value, setValue] = useState(initValue);
    if (pickValue === undefined) {
        pickValue = async (pickProps) => {
            let ret = await openModal(_jsx(OneModal, {})); //, '修改' + label);
            return ret;
        };
    }
    async function onClick() {
        let ret = await pickValue({ label, value: initValue, });
        if (ret !== undefined) {
            setValue(ret);
            await onValueChanged?.(ret);
        }
    }
    let right = _jsx("span", { className: "p-3", children: "\u00A0" });
    if (readonly !== true) {
        right = _jsx("div", { onClick: onClick, className: "cursor-pointer p-3", children: _jsx(FA, { name: "pencil", className: "text-info" }) });
    }
    let viewValue = ValueTemplate === undefined ?
        _jsx(_Fragment, { children: value })
        :
            _jsx(ValueTemplate, { value: value });
    return _jsxs(LabelRow, { ...props, children: [label, _jsx("div", { className: "ms-3", children: viewValue }), right] });
    function OneModal() {
        const { closeModal } = useModal();
        const inp = useRef();
        // const defaultValue = useAtomValue(atomValue);
        // let value = defaultValue;
        /*
        function onChange(e: ChangeEvent) {
            value = (e.target as HTMLInputElement).value;
        }
        onChange={onChange}
        */
        async function onSave() {
            closeModal(inp.current.value);
        }
        return _jsx(Page, { header: label, children: _jsxs("div", { className: "px-5 py-3", children: [_jsx("div", { children: _jsx("input", { ref: inp, className: "form-control", type: "text", defaultValue: initValue }) }), _jsxs("div", { className: "mt-3", children: [_jsx(ButtonAsync, { className: "btn btn-primary me-3", onClick: onSave, children: "\u4FDD\u5B58" }), _jsx("button", { className: "btn btn-outline-primary", onClick: () => closeModal(), children: "\u53D6\u6D88" })] })] }) });
    }
}
//# sourceMappingURL=LabelRowEdit.js.map
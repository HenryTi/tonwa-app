import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import { FA, LabelRow } from "tonwa-com";
import { useModal } from "../UqAppBase";
export function LabelRowEdit(props) {
    const { label, value: initValue, onValueChanged, Edit } = props;
    const { openModal, closeModal } = useModal();
    const atomValue = useMemo(() => atom(Number(initValue)), [initValue]);
    const [value, setValue] = useAtom(atomValue);
    async function onClick() {
        let ret = await openModal(_jsx(OneModal, {}, void 0), 'one modal');
        if (ret !== undefined) {
            setValue(ret);
        }
    }
    return _jsxs(LabelRow, { ...props, children: [label, _jsx("div", { children: value }, void 0), _jsx("div", { onClick: onClick, className: "cursor-pointer p-3", children: _jsx(FA, { name: "pencil", className: "text-info" }, void 0) }, void 0)] }, void 0);
    function OneModal() {
        const { openModal, closeModal } = useModal();
        const [value, setValue] = useAtom(atomValue);
        return _jsxs("div", { className: "p-3", children: ["modal title value: ", value, _jsx("button", { onClick: () => setValue(Number(value) + 1), children: "+" }, void 0), _jsx("button", { onClick: () => openModal(_jsx(ChildModal, {}, void 0)), children: "open" }, void 0), _jsx("button", { onClick: () => closeModal(value), children: "return" }, void 0)] }, void 0);
    }
    function ChildModal() {
        const [value, setValue] = useAtom(atomValue);
        let arr = [];
        for (let i = 0; i < 200; i++) {
            arr.push(_jsx("div", { children: i }, i));
        }
        return _jsxs("div", { className: "p-3", children: [value, _jsx("button", { onClick: () => setValue(Number(value) + 1), children: "+" }, void 0), "child modal", arr] }, void 0);
    }
}
//# sourceMappingURL=LabelRowEdit.js.map
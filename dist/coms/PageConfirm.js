import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from "../UqAppBase";
import { Page } from "./page";
import { ViewMessage } from "./ViewMessage";
;
export function PageConfirm({ auth, header, message, yes, no }) {
    const { closeModal } = useModal();
    return _jsx(Page, { auth: auth, header: header, children: _jsxs(ViewMessage, { message: message, children: [_jsx("button", { className: "btn btn-primary me-3", onClick: () => closeModal(true), children: yes }), no && _jsx("button", { className: "btn btn-outline-primary", onClick: () => closeModal(false), children: no })] }) });
}
//# sourceMappingURL=PageConfirm.js.map
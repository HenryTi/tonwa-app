import React from "react";
import { useModal } from "../UqAppBase";
export function LinkModal({ tag, className, modal, children }) {
    const { openModal } = useModal();
    if (tag === undefined) {
        tag = 'div';
        className = (className ?? '') + ' cursor-pointer';
    }
    function onClick() {
        openModal(modal);
    }
    return React.createElement(tag, { className, onClick }, children);
    /*
    return <div className={(className ?? '') + 'cursor-pointer'} onClick={() => openModal(modal)}>
        {children}
    </div>;
    */
}
//# sourceMappingURL=LinkModal.js.map
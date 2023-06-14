import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ButtonAsync, MutedSmall, SearchBox } from "tonwa-com";
import { FA } from "tonwa-com";
import { useModal, useUqAppBase } from "../UqAppBase";
import { Image } from "./Image";
import { Page } from "./page";
export function SelectUser({ header, top }) {
    let app = useUqAppBase();
    const { closeModal } = useModal();
    let [user, setUser] = useState(null);
    let onSearch = async (key) => {
        let retUser = await app.userApi.userFromName(key);
        setUser(retUser);
    };
    header = header ?? 'Select user';
    let cnBorder = "border rounded-3 bg-white p-5 mx-auto w-min-20c";
    async function onClick() {
        closeModal(user);
    }
    let vContent;
    if (user === null) {
        vContent = null;
    }
    else if (!user) {
        vContent = _jsxs("div", { className: cnBorder, children: [_jsx(FA, { name: "info-o", className: "me-3 text-info" }), " No user"] });
    }
    else {
        vContent = _jsxs("div", { className: cnBorder, children: [_jsx(ViewUser, { user: user }), _jsx("div", { className: "text-center mt-5", children: _jsx(ButtonAsync, { className: "btn btn-primary", onClick: onClick, children: "OK" }) })] });
    }
    return _jsx(Page, { header: header, back: "close", children: _jsxs("div", { className: "p-3 d-flex align-items-center flex-column", children: [_jsx("div", { children: top }), _jsx("div", { className: "mx-auto mb-3", children: _jsx(SearchBox, { className: "w-min-20c", onFocus: () => setUser(null), onSearch: onSearch, placeholder: "user account" }) }), vContent] }) });
}
export function ViewUser({ user }) {
    let { name, nick, icon } = user;
    return _jsxs("div", { className: "d-flex", children: [_jsx(Image, { src: icon, className: "me-4 w-2-5c h-2-5c" }), _jsxs("div", { children: [_jsxs("div", { children: [_jsx(MutedSmall, { children: "Name:" }), " \u00A0 ", name] }), _jsxs("div", { children: [_jsx(MutedSmall, { children: "Nick:" }), " \u00A0 ", nick] })] })] });
}
//# sourceMappingURL=SelectUser.js.map
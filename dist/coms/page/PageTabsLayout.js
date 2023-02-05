import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet } from "react-router-dom";
import { FA } from "tonwa-com";
export function PageTabsLayout({ tabs }) {
    function tabClassName({ isActive }) {
        return 'flex-fill mx-1 text-center py-1 ' +
            (isActive === true ? 'text-primary' : 'text-secondary');
    }
    let vTabs = _jsx("div", { className: "d-flex container", children: tabs.map(v => {
            const { to, caption, icon } = v;
            return _jsxs(NavLink, { to: to, className: tabClassName, replace: true, children: [_jsx(FA, { name: icon }, void 0), " ", _jsx("br", {}, void 0), caption] }, caption);
        }) }, void 0);
    return _jsxs("div", { className: 'd-flex flex-column flex-fill h-100', children: [_jsx("div", { className: 'flex-fill d-flex', children: _jsx(Outlet, {}, void 0) }, void 0), _jsx("div", { className: 'invisible', children: vTabs }, void 0), _jsx("div", { className: 'tonwa-bg-gray-3 position-fixed bottom-0 w-100 bottom-top', children: vTabs }, void 0)] }, void 0);
}
//# sourceMappingURL=PageTabsLayout.js.map
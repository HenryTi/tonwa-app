import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense, useRef } from "react";
import { atom, useAtomValue } from 'jotai';
import { PageSpinner } from "./PageSpinner";
import { setAtomValue } from "tonwa-com";
export function Tab(props) {
    return null;
}
let tabId = 1;
function createTabsFromChildren(children) {
    let tabs = [];
    React.Children.forEach(children, (element) => {
        if (React.isValidElement(element) === false)
            return;
        let elType = element.type;
        if (elType === React.Fragment)
            return;
        if (elType !== Tab)
            return;
        invariant(elType === Tab, `[${typeof elType === "string" ? elType : elType.name}] is not a <Tab> component. All component children of <PageTabs> must be a <Tab>`);
        let { props } = element;
        let tab = {
            id: tabId++,
            name: props.name,
            tag: props.tag,
            content: _jsx(_Fragment, { children: props.children }, void 0),
            mountable: atom(false),
        };
        tabs.push(tab);
    });
    setAtomValue(tabs[0].mountable, true);
    return tabs;
}
export function PageTabs({ children }) {
    let { current: tabs } = useRef(createTabsFromChildren(children));
    function onTabClick(tabCur) {
        for (let tab of tabs) {
            let { element } = tab;
            let cn;
            if (tabCur === tab) {
                cn = 'tonwa-pane active';
                setAtomValue(tab.mountable, true);
                setTimeout(() => {
                    let { element } = tabCur;
                    if (element !== undefined)
                        element.className = cn;
                }, 100);
            }
            else {
                cn = 'tonwa-pane';
            }
            if (element !== undefined) {
                element.className = cn;
            }
        }
    }
    function Tags({ cur }) {
        const cn = 'nav nav-tabs position-sticky tonwa-band-container justify-content-evenly bg-light';
        return _jsx("ul", { className: cn, style: { bottom: '0' }, children: tabs.map((v, index) => _jsx("li", { className: "nav-item flex-fill align-self-stretch", children: _jsx("div", { onClick: () => onTabClick(v), className: 'nav-link h-100 p-0 ' + (index === cur ? 'active' : 'cursor-pointer'), children: v.tag }, void 0) }, v.id)) }, void 0);
    }
    function TabPane({ tab, active, index }) {
        //let divRef = useScroll(false);
        let { mountable: atomMoutable, content } = tab;
        let mountable = useAtomValue(atomMoutable);
        if (mountable === false)
            return null;
        return _jsx(Suspense, { fallback: _jsx(PageSpinner, {}, void 0), children: _jsxs("div", { ref: div => tabs[index].element = div, className: 'tonwa-pane ' + (active === index ? 'active' : ''), children: [content, _jsx(Tags, { cur: index }, void 0)] }, void 0) }, void 0);
    }
    return _jsx(_Fragment, { children: tabs.map((v, index) => _jsx(TabPane, { tab: v, active: 0, index: index }, v.id)) }, void 0);
}
function invariant(condition, message) {
    if (!condition)
        throw new Error(message);
}
//# sourceMappingURL=PageTabs.js.map
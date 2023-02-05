import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scroller } from "./PageProps";
import 'font-awesome/css/font-awesome.min.css';
import '../css/tonwa.css';
import { Suspense, useEffect, useRef } from "react";
import { ButtonPageBack } from "./ButtonPageBack";
import { useUqAppBase } from "../../UqAppBase";
import { PageSpinner } from "./PageSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai/react";
const scrollTimeGap = 100;
const scrollEdgeGap = 30;
// unanthorized page
export function PagePublic(props) {
    let { children, header, back, right, footer, onClosed } = props;
    const div = useRef();
    useEffect(() => {
        function setScroll() {
            let { current: el } = div;
            if (!el)
                return;
            let elScroll = getScrollableParent(el);
            if (!elScroll)
                return;
            elScroll.onscroll = onScroll;
            window.onscroll = onScroll;
            let bottomTimeSave = 0;
            let topTimeSave = 0;
            let scrollTopSave = elScroll.scrollTop;
            function onScroll(e) {
                let { onScroll, onScrollTop, onScrollBottom } = props;
                if (onScroll)
                    onScroll(e);
                let el = e.target.scrollingElement;
                if (el.scrollTop > scrollTopSave)
                    scrollTopSave = el.scrollTop;
                let scroller = new Scroller(el);
                if (el.scrollTop < scrollEdgeGap) {
                    if (onScrollTop !== undefined) {
                        let topTime = new Date().getTime();
                        if (topTime - topTimeSave > scrollTimeGap) {
                            topTimeSave = topTime;
                            onScrollTop(scroller).then(ret => {
                                // has more
                                if (ret === true) {
                                    let sh = el.scrollHeight;
                                    let top = 200;
                                    if (top > sh)
                                        top = sh;
                                    el.scrollTop = top;
                                }
                            });
                        }
                    }
                }
                if (el.scrollTop + el.offsetHeight > el.scrollHeight - scrollEdgeGap) {
                    if (onScrollBottom !== undefined && el.scrollTop >= scrollTopSave) {
                        ++scrollTopSave;
                        let bottomTime = new Date().getTime();
                        if (bottomTime - bottomTimeSave > scrollTimeGap) {
                            bottomTimeSave = bottomTime;
                            onScrollBottom(scroller);
                        }
                    }
                }
            }
        }
        setScroll();
        return () => {
            onClosed?.();
        };
    });
    if (header || back || right) {
        header = _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(ButtonPageBack, { ...props }, void 0), _jsx("div", { className: "flex-fill", children: header }, void 0), right] }, void 0);
    }
    return _jsx("div", { ref: div, className: "tonwa-page", children: _jsxs(Suspense, { fallback: _jsx(PageSpinner, {}, void 0), children: [_jsx("div", { className: 'tonwa-page-header position-sticky top-0', children: _jsx("div", { className: 'container px-0 d-flex', children: header }, void 0) }, void 0), _jsx("div", { className: 'tonwa-page-content flex-fill d-flex', children: _jsx("div", { className: 'container px-0 d-flex flex-column', children: children }, void 0) }, void 0), _jsx("div", { className: 'tonwa-page-footer position-sticky bottom-0', children: _jsx("div", { className: 'container px-0', children: footer }, void 0) }, void 0)] }, void 0) }, void 0);
}
export function Page(props) {
    const uqApp = useUqAppBase();
    const navigate = useNavigate();
    const { user: userAtom, mustLogin, pathLogin } = uqApp;
    const user = useAtomValue(userAtom);
    const { pathname } = useLocation();
    useEffect(() => {
        if (mustLogin && !user && pathLogin) {
            navigate(pathLogin, { state: pathname });
        }
    }, [user, mustLogin, pathLogin]);
    if (mustLogin && !user)
        return null;
    return _jsx(PagePublic, { ...props }, void 0);
}
function isScrollable(ele) {
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight;
    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;
    return hasScrollableContent && !isOverflowHidden;
}
function getScrollableParent(ele) {
    return (!ele || ele === document.body) ?
        document.body
        :
            (isScrollable(ele) ?
                ele
                :
                    getScrollableParent(ele.parentElement));
}
//# sourceMappingURL=Page.js.map
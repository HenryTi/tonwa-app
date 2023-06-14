import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useContext, useEffect, useRef } from "react";
import { NavigationType, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useAtomValue } from "jotai/react";
import 'font-awesome/css/font-awesome.min.css';
import '../../css/tonwa-page.css';
import { ModalContext, useModal, useUqAppBase } from "../../UqAppBase";
import { Scroller } from "./PageProps";
import { ButtonPageBack } from "./ButtonPageBack";
import { PageSpinner } from "./PageSpinner";
import { useEffectOnce } from "tonwa-com";
const scrollTimeGap = 100;
const scrollEdgeGap = 30;
function PageBase(props) {
    const uqApp = useUqAppBase();
    let { children, header, back, right, footer, onClosed } = props;
    const divRef = useRef();
    const { pathname } = document.location;
    useEffectOnce(() => {
        let { current: div } = divRef;
        if (!div)
            return;
        let elScroll = getScrollableParent(div);
        if (!elScroll)
            return;
        //elScroll.addEventListener("scroll", onScroll);
        window.onscroll = onScroll;
        let bottomTimeSave = 0;
        let topTimeSave = 0;
        let scrollTopSave = elScroll.scrollTop;
        function onScroll(e) {
            let { onScroll: propsOnScroll, onScrollTop, onScrollBottom } = props;
            if (propsOnScroll)
                propsOnScroll(e);
            let el = e.target.scrollingElement;
            const { scrollTop, offsetHeight, scrollHeight } = el;
            if (scrollTop > scrollTopSave) {
                scrollTopSave = scrollTop;
            }
            const pageCache = uqApp.pageCache.getCache();
            if (pageCache !== undefined && scrollTop > 0) {
                Object.assign(pageCache, { scrollTop });
            }
            let scroller = new Scroller(el);
            if (onScrollTop !== undefined && scrollTop < scrollEdgeGap) {
                let topTime = new Date().getTime();
                if (topTime - topTimeSave > scrollTimeGap) {
                    topTimeSave = topTime;
                    onScrollTop(scroller).then(ret => {
                        // has more
                        if (ret === true) {
                            let sh = scrollHeight;
                            let top = 200;
                            if (top > sh)
                                top = sh;
                            el.scrollTop = top;
                        }
                    });
                }
            }
            if (onScrollBottom !== undefined
                && scrollTop + offsetHeight > scrollHeight - scrollEdgeGap
                && scrollTop >= scrollTopSave) {
                ++scrollTopSave;
                let bottomTime = new Date().getTime();
                if (bottomTime - bottomTimeSave > scrollTimeGap) {
                    bottomTimeSave = bottomTime;
                    setTimeout(() => onScrollBottom(scroller), 50);
                }
            }
        }
        return () => {
            onClosed?.();
        };
    });
    if (header || back || right) {
        header = _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(ButtonPageBack, { ...props }), _jsx("div", { className: "flex-fill", children: header }), right] });
    }
    return _jsx("div", { ref: divRef, className: "tonwa-page", children: _jsxs(Suspense, { fallback: _jsx(PageSpinner, {}), children: [_jsx("div", { className: 'tonwa-page-header position-sticky top-0', children: _jsx("div", { className: 'container px-0', children: header }) }), _jsx("div", { className: 'tonwa-page-content flex-fill d-flex', children: _jsx("div", { className: 'container px-0 d-flex flex-column', children: children }) }), _jsx("div", { className: 'tonwa-page-footer position-sticky bottom-0', children: _jsx("div", { className: 'container px-0', children: footer }) })] }) });
}
function PageModal(props) {
    const { closeModal } = useModal();
    const modalProps = { ...props, back: 'close', onBack: () => closeModal(undefined) };
    return _jsx(PageBase, { ...modalProps });
}
function PageNav(props) {
    const uqApp = useUqAppBase();
    const navAction = useNavigationType();
    const navigate = useNavigate();
    const { user: userAtom, mustLogin, pathLogin } = uqApp;
    const user = useAtomValue(userAtom);
    const { pathname } = useLocation();
    useEffect(() => {
        if (props.auth === false)
            return;
        if (mustLogin && !user && pathLogin) {
            navigate(pathLogin, { state: pathname });
        }
    }, [user, mustLogin, pathLogin]);
    if (props.auth !== false && mustLogin && !user)
        return null;
    useEffectOnce(() => {
        uqApp.pageCache.onNav(navAction, pathname);
        if (navAction !== NavigationType.Pop)
            return;
        const pageCache = uqApp.pageCache.getCache();
        if (pageCache === undefined)
            return;
        const { scrollTop } = pageCache;
        if (scrollTop) {
            setTimeout(() => {
                const scrollOptions = { top: scrollTop };
                window.scroll(scrollOptions);
            }, 10);
        }
    });
    return _jsx(PageBase, { ...props });
}
export function Page(props) {
    const isModal = useContext(ModalContext);
    if (isModal === true) {
        return _jsx(PageModal, { ...props });
    }
    else {
        return _jsx(PageNav, { ...props });
    }
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
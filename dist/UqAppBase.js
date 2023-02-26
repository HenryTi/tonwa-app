import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { atom, useAtom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { Spinner, getAtomValue, setAtomValue, useEffectOnce } from 'tonwa-com';
import { LocalDb, createUQsMan, Net } from 'tonwa-uq';
import { PageBase } from './coms';
import { uqsProxy } from './uq';
import { AutoRefresh } from './AutoRefresh';
import { LocalData } from './tools';
export class UqAppBase {
    appConfig;
    uqConfigs;
    uqsSchema;
    map = new Map();
    //private readonly stores: Store[];          // 用于在同一个模块中传递
    localData;
    roleNames;
    net;
    userApi;
    version; // version in appConfig;
    mustLogin;
    //readonly responsive: {
    //    user: User;
    //}
    refreshTime = atom(Date.now() / 1000);
    user = atom(undefined);
    modal = {
        stack: atom([]),
    };
    uqsMan;
    store;
    guest;
    uqs;
    uqUnit;
    constructor(appConfig, uqConfigs, uqsSchema, appEnv) {
        window.history.scrollRestoration = 'manual';
        this.appConfig = appConfig;
        this.uqConfigs = uqConfigs;
        this.uqsSchema = uqsSchema;
        this.version = appConfig.version;
        this.mustLogin = appConfig.mustLogin !== false;
        const { unit, testing, isDevelopment } = appEnv;
        let props = {
            center: appConfig.center,
            isDevelopment,
            unit,
            testing,
            localDb: new LocalStorageDb(),
            createObservableMap: () => new Map(), //new ObservableMap(),
        };
        this.net = new Net(props);
        this.localData = new LocalData(testing);
        this.userApi = this.net.userApi;
        let user = this.localData.user.get();
        setAtomValue(this.user, user);
    }
    get defaultUqRoleNames() { return undefined; }
    loginUnit(userUnit) {
        this.uqUnit.loginUnit(userUnit);
    }
    logoutUnit() {
        this.uqUnit.logoutUnit();
    }
    closeAllModal() {
        setAtomValue(this.modal.stack, []);
    }
    get userUnit() { return this.uqUnit.userUnit; }
    // get me() { return this.user.read().user.read() return this.responsive.user?.id; }
    hasRole(role) {
        if (this.uqUnit === undefined)
            return false;
        return this.uqUnit.hasRole(role);
    }
    async logined(user) {
        this.net.logoutApis();
        setAtomValue(this.user, user);
        let autoLoader = undefined;
        let autoRefresh = new AutoRefresh(this, autoLoader);
        if (user) {
            jwtDecode(user.token);
            this.net.setCenterToken(user.id, user.token);
            this.localData.user.set(user);
            await this.loadOnLogined();
        }
        else {
            this.net.clearCenterToken();
            this.uqUnit = undefined;
            this.localData.user.remove();
            setAtomValue(this.user, undefined);
            document.cookie = '';
            localStorage.clear();
            autoRefresh.stop();
        }
    }
    restart() {
        document.location.assign('/');
    }
    createUrlCache(url) {
        let uc = this.map.get(url);
        if (!uc) {
            this.map.set(url, { scrollTop: undefined, data: undefined });
        }
    }
    setUrlCacheScrollTop(url, scrollTop) {
        let uc = this.map.get(url);
        if (uc) {
            uc.scrollTop = scrollTop;
            return;
        }
        this.map.set(url, { scrollTop, data: undefined });
    }
    setUrlCacheData(url, data) {
        let uc = this.map.get(url);
        if (uc) {
            uc.data = data;
            return;
        }
        this.map.set(url, { scrollTop: undefined, data });
    }
    getUrlCache(url) {
        return this.map.get(url);
    }
    /*
    deleteUrlCache(url: string) {
        this.map.delete(url);
    }
    */
    async setUserProp(propName, value) {
        await this.userApi.userSetProp(propName, value);
        let user = getAtomValue(this.user);
        let newUser = { ...user };
        newUser[propName] = value;
        setAtomValue(this.user, newUser);
        //(this.state.user as any)[propName] = value;
        this.localData.user.set(newUser);
    }
    saveLocalData() {
        this.localData.saveToLocalStorage();
    }
    initErrors;
    async init() {
        console.log('UqApp.load()');
        await this.net.init();
        console.log('await this.net.init()');
        try {
            let uqsMan = await createUQsMan(this.net, this.appConfig.version, this.uqConfigs, this.uqsSchema);
            console.log('createUQsMan');
            this.uqsMan = uqsMan;
            this.uqs = uqsProxy(uqsMan);
            if (this.uqs) {
                // this.uq = this.defaultUq;
                // this.buildRoleNames();
            }
            // let user = this.localData.user.get();
            let user = getAtomValue(this.user);
            // console.log('logined');
            if (!user) {
                let guest = this.localData.guest.get();
                if (guest === undefined) {
                    guest = await this.net.userApi.guest();
                }
                if (!guest) {
                    throw Error('guest can not be undefined');
                }
                this.net.setCenterToken(0, guest.token);
                this.localData.guest.set(guest);
                await this.loadWithoutLogin();
            }
            else {
                await this.loadWithoutLogin();
                await this.logined(user);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    loadWithoutLogin() {
        return;
    }
    loadOnLogined() {
        return;
    }
}
class LocalStorageDb extends LocalDb {
    getItem(key) {
        return localStorage.getItem(key);
    }
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
    removeItem(key) {
        localStorage.removeItem(key);
    }
}
export function useModal() {
    const { modal } = useUqAppBase();
    const { stack: modalStackAtom } = modal;
    const [modalStack, setModalStack] = useAtom(modalStackAtom);
    async function openModal(element, caption, onClosed) {
        return new Promise((resolve, reject) => {
            if (React.isValidElement(element) !== true) {
                alert('is not valid element');
                return;
            }
            function Modal() {
                const { closeModal } = useModal();
                return _jsx(PageBase, { header: caption, onBack: () => closeModal(undefined), back: 'close', children: element }, void 0);
            }
            setModalStack([...modalStack, [_jsx(Modal, {}, void 0), resolve, onClosed]]);
        });
    }
    function closeModal(result) {
        let [, resolve, onClosed] = modalStack.pop();
        setModalStack([...modalStack]);
        resolve(result);
        onClosed?.(result);
    }
    return { openModal, closeModal };
}
export function useScrollRestoration() {
    const uqApp = useUqAppBase();
    const { pathname } = document.location;
    uqApp.createUrlCache(pathname);
}
export const UqAppContext = React.createContext(undefined);
export function useUqAppBase() {
    return useContext(UqAppContext);
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
});
export function ViewUqAppBase({ uqApp, children }) {
    const [modalStack] = useAtom(uqApp.modal.stack);
    let [appInited, setAppInited] = useState(false);
    useEffectOnce(() => {
        (async function () {
            await uqApp.init();
            setAppInited(true);
        })();
    });
    if (appInited === false) {
        return _jsx("div", { className: "p-5 text-center", children: _jsx(Spinner, { className: "text-info" }, void 0) }, void 0);
    }
    if (uqApp.initErrors) {
        return _jsxs("div", { children: [_jsx("div", { children: "uq app start failed. init errors: " }, void 0), _jsx("ul", { className: "text-danger", children: uqApp.initErrors.map((v, index) => _jsx("li", { children: v }, index)) }, void 0)] }, void 0);
    }
    let len = modalStack.length;
    let cnMain;
    let viewModalStack;
    if (len === 0) {
        cnMain = '';
        viewModalStack = null;
    }
    else {
        cnMain = 'd-none';
        viewModalStack = modalStack.map((v, index) => {
            let cn = index < len - 1 ? 'd-none' : '';
            let [el] = v;
            return _jsx(React.Fragment, { children: _jsx("div", { className: cn + ' h-100', children: el }, void 0) }, index);
        });
    }
    return _jsx(UqAppContext.Provider, { value: uqApp, children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx("div", { className: cnMain + ' h-100', children: children }, void 0), viewModalStack] }, void 0) }, void 0);
}
//# sourceMappingURL=UqAppBase.js.map
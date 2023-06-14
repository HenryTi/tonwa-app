import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { atom, useAtom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { Spinner, getAtomValue, setAtomValue, useEffectOnce } from 'tonwa-com';
import { LocalDb, createUQsMan, Net } from 'tonwa-uq';
import { uqsProxy } from './uq';
import { AutoRefresh } from './AutoRefresh';
import { LocalData } from './tools';
import { PageCache } from './PageCache';
export class UqAppBase {
    appConfig;
    uqConfigs;
    uqsSchema;
    localData;
    roleNames;
    net;
    userApi;
    version; // version in appConfig;
    mustLogin;
    refreshTime = atom(Date.now() / 1000);
    user = atom(undefined);
    modal = {
        stack: atom([]),
    };
    pageCache = new PageCache();
    uqsMan;
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
        this.pageCache = new PageCache();
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
    onCloseModal;
    get userUnit() { return this.uqUnit.userUnit; }
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
    onLoadUQs() { }
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
                this.onLoadUQs();
            }
            let user = getAtomValue(this.user);
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
    /*
    private buildRoleNames() {
        if (this.uq === undefined) return;
        let defaultUqRoleNames = this.defaultUqRoleNames;
        if (defaultUqRoleNames !== undefined) {
            this.roleNames = defaultUqRoleNames[env.lang];
            if (this.roleNames === undefined) {
                this.roleNames = defaultUqRoleNames['$'];
            }
        }
        if (this.roleNames === undefined) this.roleNames = {};
    }

    roleName(role: string): RoleName {
        return this.roleNames[role];
    }
    */
    objects = new Map();
    objectOf(constructor) {
        let ret = this.objects.get(constructor);
        if (ret === undefined) {
            ret = new constructor(this);
            this.objects.set(constructor, ret);
            this.onObjectBuilt(ret);
        }
        return ret;
    }
    onObjectBuilt(object) {
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
export const ModalContext = React.createContext(undefined);
export function useModal() {
    const uqApp = useUqAppBase();
    return uqAppModal(uqApp);
}
export function uqAppModal(uqApp) {
    const { modal } = uqApp;
    const { stack: modalStackAtom } = modal;
    async function openModal(element, onClosed) {
        return new Promise((resolve, reject) => {
            if (React.isValidElement(element) !== true) {
                alert('is not valid element');
                return;
            }
            let modal = _jsx(ModalContext.Provider, { value: true, children: element });
            let modalStack = getAtomValue(modalStackAtom);
            setAtomValue(modalStackAtom, [...modalStack, [modal, resolve, onClosed]]);
        });
    }
    function closeModal(result) {
        let modalStack = getAtomValue(modalStackAtom);
        let [, resolve, onClosed] = modalStack.pop();
        setAtomValue(modalStackAtom, [...modalStack]);
        resolve(result);
        onClosed?.(result);
        uqApp.onCloseModal?.();
    }
    return { openModal, closeModal };
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
export function ViewUqApp({ uqApp, children }) {
    const [modalStack] = useAtom(uqApp.modal.stack);
    let [appInited, setAppInited] = useState(false);
    useEffectOnce(() => {
        (async function () {
            await uqApp.init();
            setAppInited(true);
        })();
    });
    if (appInited === false) {
        return _jsx("div", { className: "p-5 text-center", children: _jsx(Spinner, { className: "text-info" }) });
    }
    if (uqApp.initErrors) {
        return _jsxs("div", { children: [_jsx("div", { children: "uq app start failed. init errors: " }), _jsx("ul", { className: "text-danger", children: uqApp.initErrors.map((v, index) => _jsx("li", { children: v }, index)) })] });
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
            return _jsx(React.Fragment, { children: _jsx("div", { className: cn + ' h-100', children: el }) }, index);
        });
    }
    return _jsx(UqAppContext.Provider, { value: uqApp, children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx("div", { className: cnMain + ' h-100', children: children }), viewModalStack] }) });
}
//# sourceMappingURL=UqAppBase.js.map
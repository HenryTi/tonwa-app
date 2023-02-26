import React, { ReactNode } from 'react';
import { UqConfig, User, UserApi, Net, UqUnit, UserUnit, UQsMan } from 'tonwa-uq';
export interface AppConfig {
    center: string;
    version: string;
    loginTop?: JSX.Element;
    oem?: string;
    privacy?: string;
    noUnit?: boolean;
    htmlTitle?: string;
    mustLogin?: boolean;
}
export interface AppEnv {
    isDevelopment: boolean;
    testing: boolean;
    unit: number;
}
export interface RoleName {
    role?: string;
    caption: string;
    icon?: string;
    color?: string;
}
interface UrlCache {
    scrollTop: number;
    data: any;
}
export declare abstract class UqAppBase<U = any> {
    private readonly appConfig;
    private readonly uqConfigs;
    private readonly uqsSchema;
    private map;
    private localData;
    private roleNames;
    readonly net: Net;
    readonly userApi: UserApi;
    readonly version: string;
    readonly mustLogin: boolean;
    readonly refreshTime: import("jotai").PrimitiveAtom<number> & {
        init: number;
    };
    readonly user: import("jotai").PrimitiveAtom<User> & {
        init: User;
    };
    readonly modal: {
        stack: import("jotai").PrimitiveAtom<[JSX.Element, (value: any | PromiseLike<any>) => void, (result: any) => void][]> & {
            init: [JSX.Element, (value: any | PromiseLike<any>) => void, (result: any) => void][];
        };
    };
    uqsMan: UQsMan;
    store: any;
    guest: number;
    uqs: U;
    uqUnit: UqUnit;
    constructor(appConfig: AppConfig, uqConfigs: UqConfig[], uqsSchema: {
        [uq: string]: any;
    }, appEnv: AppEnv);
    abstract get pathLogin(): string;
    protected get defaultUqRoleNames(): {
        [lang: string]: any;
    };
    loginUnit(userUnit: UserUnit): void;
    logoutUnit(): void;
    closeAllModal(): void;
    get userUnit(): UserUnit<any>;
    hasRole(role: string[] | string): boolean;
    logined(user: User): Promise<void>;
    restart(): void;
    createUrlCache(url: string): void;
    setUrlCacheScrollTop(url: string, scrollTop: number): void;
    setUrlCacheData(url: string, data: any): void;
    getUrlCache(url: string): UrlCache;
    setUserProp(propName: string, value: any): Promise<void>;
    saveLocalData(): void;
    initErrors: string[];
    init(): Promise<void>;
    protected loadWithoutLogin(): Promise<void>;
    protected loadOnLogined(): Promise<void>;
}
export declare function useModal(): {
    openModal: <T = any>(element: JSX.Element, caption?: string | JSX.Element, onClosed?: (result: any) => void) => Promise<T>;
    closeModal: (result?: any) => void;
};
export declare function useScrollRestoration(): void;
export declare const UqAppContext: React.Context<any>;
export declare function useUqAppBase(): UqAppBase<any>;
export declare function ViewUqAppBase({ uqApp, children }: {
    uqApp: UqAppBase;
    children: ReactNode;
}): JSX.Element;
export {};

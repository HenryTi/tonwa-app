import React, { ReactNode } from 'react';
import { UqConfig, User, UserApi, Net, UqUnit, UserUnit, UQsMan } from 'tonwa-uq';
import { PageCache } from './PageCache';
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
export declare abstract class UqAppBase<UQS = any> {
    private readonly appConfig;
    private readonly uqConfigs;
    private readonly uqsSchema;
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
    readonly pageCache: PageCache;
    uqsMan: UQsMan;
    guest: number;
    uqs: UQS;
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
    onCloseModal: () => void;
    get userUnit(): UserUnit<any>;
    hasRole(role: string[] | string): boolean;
    logined(user: User): Promise<void>;
    restart(): void;
    setUserProp(propName: string, value: any): Promise<void>;
    saveLocalData(): void;
    protected onLoadUQs(): void;
    initErrors: string[];
    init(): Promise<void>;
    protected loadWithoutLogin(): Promise<void>;
    protected loadOnLogined(): Promise<void>;
    private readonly objects;
    objectOf<T, A extends UqAppBase>(constructor: new (uqApp: A) => T): T;
    protected onObjectBuilt(object: any): void;
}
export type OpenModal = <T = any>(element: JSX.Element, onClosed?: (result: any) => void) => Promise<T>;
export declare const ModalContext: React.Context<any>;
export declare function useModal(): {
    openModal: OpenModal;
    closeModal: (result?: any) => void;
};
export declare function uqAppModal(uqApp: UqAppBase): {
    openModal: OpenModal;
    closeModal: (result?: any) => void;
};
export declare const UqAppContext: React.Context<any>;
export declare function useUqAppBase(): UqAppBase<any>;
export declare function ViewUqApp({ uqApp, children }: {
    uqApp: UqAppBase;
    children: ReactNode;
}): JSX.Element;

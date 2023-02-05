import { LocalCache } from "./localMap";
export declare class LocalData {
    private readonly localMap;
    readonly user: LocalCache;
    readonly guest: LocalCache;
    readonly unit: LocalCache;
    constructor(testing: boolean);
    private _user;
    private _guest;
    private _unit;
    readToMemory(): void;
    saveToLocalStorage(): void;
    logoutClear(): void;
}

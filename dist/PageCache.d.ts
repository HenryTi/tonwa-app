import { NavigationType } from "react-router-dom";
interface CacheItem<T = any> {
    prev: CacheItem;
    scrollTop: number;
    data: T;
    pathname: string;
}
export declare class PageCache {
    private p;
    onNav(navAction: NavigationType, pathname: string): void;
    setData<T = any>(data: T): void;
    setScrollTop(top: number): void;
    getCache<T>(): CacheItem<T>;
    getPrev<T>(): CacheItem<T>;
    getData<T>(): T;
    getPrevData<T>(): T;
}
export {};

/// <reference types="react" />
import { ListPropsWithoutItems } from "tonwa-com";
import { WritableAtom } from 'jotai';
interface Props<T> extends ListPropsWithoutItems<T> {
    context: ListEditContext<T>;
}
export declare class ListEditContext<T> {
    private readonly keyCompareFunc;
    readonly atomItems: WritableAtom<T[], any, any>;
    constructor(items: T[], keyCompare: string | ((item1: T, item2: T) => boolean));
    protected keyCompare(item1: T, item2: T): boolean;
    get items(): T[];
    private findIndex;
    onItemChanged(item: T): void;
    onItemDeleted(item: T): void;
    moveItemToFirst(item: T): void;
    moveItemToLast(item: T): void;
}
export declare function ListEdit<T>(props: Props<T>): JSX.Element;
export declare function useListEdit<T>(items: T[], keyCompare: (item1: T, item2: T) => boolean): ListEditContext<T>;
export {};

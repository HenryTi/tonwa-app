import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { getAtomValue, List, setAtomValue } from "tonwa-com";
import { atom, useAtomValue } from 'jotai';
export class ListEditContext {
    keyCompareFunc;
    atomItems;
    constructor(items, keyCompare) {
        //this.response = proxy({ items });
        this.atomItems = atom(items);
        this.keyCompareFunc = (typeof keyCompare === 'string') ?
            (item1, item2) => item1[keyCompare] === item2[keyCompare]
            :
                keyCompare;
    }
    keyCompare(item1, item2) {
        return this.keyCompareFunc(item1, item2);
    }
    get items() {
        return getAtomValue(this.atomItems);
    }
    findIndex(item) {
        let items = this.items;
        let p = items.findIndex(v => this.keyCompare(v, item));
        return p;
    }
    onItemChanged(item) {
        let p = this.findIndex(item);
        let items = this.items;
        if (p >= 0) {
            Object.assign(items[p], item);
        }
        else {
            items.unshift(item);
        }
    }
    onItemDeleted(item) {
        let items = this.items;
        let p = this.findIndex(item);
        if (p >= 0)
            this.items.splice(p, 1);
    }
    moveItemToFirst(item) {
        let items = this.items;
        let p = this.findIndex(item);
        if (p >= 0)
            items.splice(p, 1);
        items.unshift(item);
        setAtomValue(this.atomItems, [...items]);
    }
    moveItemToLast(item) {
        let items = this.items;
        let p = this.findIndex(item);
        if (p >= 0)
            items.splice(p, 1);
        items.push(item);
        setAtomValue(this.atomItems, [...items]);
    }
}
export function ListEdit(props) {
    let { context } = props;
    let items = useAtomValue(context.atomItems);
    return _jsx(List, { ...props, items: items }, void 0);
}
export function useListEdit(items, keyCompare) {
    let { current } = useRef(new ListEditContext(items, keyCompare));
    return current;
}
//# sourceMappingURL=ListEdit.js.map
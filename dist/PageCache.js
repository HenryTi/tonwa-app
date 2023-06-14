import { NavigationType } from "react-router-dom";
export class PageCache {
    p;
    onNav(navAction, pathname) {
        let prev;
        switch (navAction) {
            case NavigationType.Push:
                prev = this.p;
                break;
            case NavigationType.Pop:
                this.p = this.p?.prev;
                if (this.p !== undefined)
                    return;
                break;
            case NavigationType.Replace:
                prev = this.p?.prev;
                break;
        }
        this.p = {
            prev,
            scrollTop: undefined,
            data: undefined,
            pathname,
        };
    }
    setData(data) {
        if (this.p === undefined)
            return;
        this.p.data = data;
    }
    setScrollTop(top) {
        if (this.p === undefined)
            return;
        this.p.scrollTop = top;
    }
    getCache() {
        return this.p;
    }
    getPrev() {
        return this.p?.prev;
    }
    getData() {
        return this.p?.data;
    }
    getPrevData() {
        return this.p?.prev?.data;
    }
}
//# sourceMappingURL=PageCache.js.map
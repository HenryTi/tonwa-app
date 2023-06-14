import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { uqStringify } from 'tonwa-uq';
const TuidContent = (tuidName, values, x) => {
    return _jsxs(_Fragment, { children: [tuidName, ": ", uqStringify(values)] });
};
export class ReactBoxId {
    id;
    tuid;
    ui;
    isUndefined;
    constructor(id, tuid, ui) {
        this.id = Number(id);
        this.tuid = tuid;
        this.ui = ui;
        this.isUndefined = (this.tuid === undefined);
    }
    get obj() {
        return this.tuid.valueFromId(this.id);
    }
    equ(id) {
        if (id === undefined || id === null)
            return false;
        if (typeof id === 'object')
            return this.id === id.id;
        return this.id === id;
    }
    render(ui, x) {
        if (this.id === undefined || this.id === null || isNaN(this.id) === true)
            return;
        let boxName = this.boxName; // this.tuid.name;
        let val = this.obj; // this.tuid.valueFromId(this.id);
        if (this.isUndefined === true) {
            if (ui !== undefined)
                return ui(val, x);
            return TuidContent(boxName, val, x);
        }
        switch (typeof val) {
            case 'undefined':
                return _jsxs("span", { className: "text-black-50", children: [boxName, " undefined"] });
            case 'number':
                return _jsxs("span", { className: "text-light", children: [boxName, " ", this.id] });
        }
        if (ui === undefined) {
            ui = this.ui;
        }
        if (ui !== undefined) {
            if (typeof ui !== 'function') {
                ui = ui.content;
            }
            if (ui !== undefined) {
                let ret = ui(val);
                if (ret !== undefined)
                    return ret;
                return _jsxs("span", { className: "text-danger", children: [boxName, " ", this.id] });
            }
        }
        return TuidContent(boxName, val);
    }
    get boxName() { return this.tuid.name; }
    // ui(): TvTemplet {return this.tuid.ui}
    // res(): any {return this.tuid.res}
    async assure() {
        await this.tuid.assureBox(this.id);
        return this;
    }
}
function boxIdContent(bi, ui, x) {
    let logContent;
    let boxId = bi;
    switch (typeof bi) {
        case 'undefined':
            logContent = _jsx(_Fragment, { children: "boxId undefined" });
            break;
        case 'number':
            logContent = _jsxs(_Fragment, { children: ["id:", bi] });
            break;
        default:
            if (typeof boxId.render !== 'function') {
                if (ui === undefined) {
                    logContent = TuidContent(boxId.boxName, bi, x);
                }
                else {
                    return ui(bi, x);
                }
            }
            break;
    }
    if (logContent !== undefined) {
        return _jsx("del", { className: "text-danger", children: logContent });
    }
    return boxId.render(ui, x);
}
const Tv = ({ tuidValue, ui, x, nullUI }) => {
    if (tuidValue === undefined) {
        if (nullUI === undefined)
            return _jsx("small", { className: "text-muted", children: "[\u65E0]" });
        return nullUI();
    }
    if (tuidValue === null) {
        if (nullUI === undefined)
            return _jsx(_Fragment, { children: "[null]" });
        return nullUI();
    }
    let ttv = typeof tuidValue;
    switch (ttv) {
        default:
            if (ui === undefined)
                return _jsxs(_Fragment, { children: [ttv, "-", tuidValue] });
            else {
                let ret = ui(tuidValue, x);
                if (ret !== undefined)
                    return ret;
                return _jsx(_Fragment, { children: tuidValue });
            }
        case 'object':
            let divObj = boxIdContent(tuidValue, ui, x);
            if (divObj !== undefined)
                return divObj;
            return nullUI === undefined ? _jsx(_Fragment, { children: "id null" }) : nullUI();
        case 'number':
            return _jsxs(_Fragment, { children: ["id...", tuidValue] });
    }
};
export const tv = (tuidValue, ui, x, nullUI) => {
    return _jsx(Tv, { tuidValue: tuidValue, ui: ui, x: x, nullUI: nullUI });
};
//# sourceMappingURL=reactBoxId.js.map
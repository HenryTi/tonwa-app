import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export function IDView({ id, uq, Template }) {
    const [value, setValue] = useState(uq.idCache(id));
    useEffect(() => {
        (async function () {
            if (id === undefined || id === null)
                return;
            let obj = uq.idCache(id);
            if (obj === undefined) {
                obj = await uq.idObj(id);
            }
            setValue(obj);
        })();
    }, [id]);
    if (id === undefined || id === null)
        return null;
    if (value === undefined)
        return null;
    if (value === null) {
        return _jsxs("div", { children: ["id ", id, " is invalid"] });
    }
    if (Template) {
        return _jsx(Template, { value: value });
    }
    return _jsx(_Fragment, { children: JSON.stringify(value) });
}
//# sourceMappingURL=IDView.js.map
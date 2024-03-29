import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useUqAppBase } from "../UqAppBase";
const usersCache = {};
export function UserView({ id, assigned, className, Template }) {
    let app = useUqAppBase();
    let [user, setUser] = useState(undefined);
    useEffect(() => {
        async function loadUser() {
            let ret = usersCache[id];
            if (ret === undefined) {
                ret = await app.userApi.userFromId(id);
                usersCache[id] = ret === undefined ? null : ret;
            }
            setUser(ret);
        }
        loadUser();
    }, [app, id]);
    if (user === null || user === undefined)
        return _jsx("span", { className: className, children: id });
    if (Template) {
        return _jsx(Template, { user: user, assigned: assigned });
    }
    else {
        return _jsx("span", { className: className, children: user.name });
    }
}
//# sourceMappingURL=UserView.js.map
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useUqAppBase } from "../UqAppBase";
export function DivRole({ children, role }) {
    let uqApp = useUqAppBase();
    if (uqApp.hasRole(role) === true)
        return _jsx(_Fragment, { children: children });
    return null;
}
//# sourceMappingURL=DivRole.js.map
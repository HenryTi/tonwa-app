import { jsxs as _jsxs } from "react/jsx-runtime";
import { PropEdit } from "../coms";
import { createBandsFromFields } from "./FieldsBands";
export function FieldsDetail(props) {
    let { className, values, onValuesChanged, children, sep } = props;
    return _jsxs(PropEdit, { className: className, values: values, onValuesChanged: onValuesChanged, children: [createBandsFromFields(props, sep), children] }, void 0);
}
//# sourceMappingURL=FieldsDetail.js.map
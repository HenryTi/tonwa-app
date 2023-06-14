import { jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from "tonwa-com";
import { createBandsFromFields } from "./FieldsBands";
export function FieldsForm(props) {
    let { className, values, children } = props;
    return _jsxs(Form, { className: className, values: values, children: [createBandsFromFields(props), children] });
}
//# sourceMappingURL=FieldsForm.js.map
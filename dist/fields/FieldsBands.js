import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Pick, Int, Decimal, String, Band, TextArea } from "tonwa-com";
export function createBandsFromFields(props, sep) {
    let count = 0;
    let { fields, replacer } = props;
    return fields.map((v, index) => {
        let { name } = v;
        if (name === 'id')
            return null;
        ++count;
        let replace = replacer?.[name];
        if (replace) {
            return (_jsx(React.Fragment, { children: replace }, index));
        }
        if (replace === null)
            return null;
        return (_jsx(Band, { label: name, sep: count > 1 ? sep : null, children: createInputFromField(v) }, index));
    });
}
function createInputFromField(field) {
    let { type, name } = field;
    if (name === 'no') {
        return _jsx(String, { name: name, readOnly: true });
    }
    switch (type) {
        default: return _jsxs("div", { children: ["unknown type: ", type] });
        case 'id': return _jsx(Pick, { name: name, onPick: async () => alert('pick id') });
        case 'bigint':
        case 'int':
        case 'tinyint':
        case 'smallint':
            return _jsx(Int, { name: name });
        case 'dec':
            return _jsx(Decimal, { name: name });
        case 'char':
            return _jsx(String, { name: name, maxLength: field.size });
        case 'text':
            return _jsx(TextArea, { name: name, maxLength: 60000 });
    }
}
//# sourceMappingURL=FieldsBands.js.map
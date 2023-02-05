import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { FA } from "tonwa-com";
export function ButtonPageBack(props) {
    let { back, onBack } = props;
    function Back({ Back }) {
        switch (back) {
            default:
            case 'back': return _jsx(Back, { icon: 'angle-left' }, void 0);
            case 'none': return _jsx("div", { className: "py-2 ms-3", children: "\u00A0" }, void 0);
            case 'close': return _jsx(Back, { icon: 'close' }, void 0);
        }
    }
    function BackContent({ icon, onClick }) {
        return _jsx("div", { className: "px-3 py-2 cursor-pointer", onClick: onClick, children: _jsx(FA, { name: icon }, void 0) }, void 0);
    }
    function BackClick({ icon }) {
        return _jsx(BackContent, { icon: icon, onClick: onBack }, void 0);
    }
    function BackNav({ icon }) {
        const navigate = useNavigate();
        function onClickBack() {
            navigate(-1);
        }
        return _jsx(BackContent, { icon: icon, onClick: onClickBack }, void 0);
    }
    if (onBack) {
        return _jsx(Back, { Back: BackClick }, void 0);
    }
    else {
        return _jsx(Back, { Back: BackNav }, void 0);
    }
}
//# sourceMappingURL=ButtonPageBack.js.map
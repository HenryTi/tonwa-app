import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { FA } from "tonwa-com";
export function ButtonPageBack(props) {
    let { back, onBack } = props;
    function Back({ Back }) {
        switch (back) {
            default:
            case 'back': return _jsx(Back, { icon: 'angle-left' });
            case 'none': return _jsx("div", { className: "py-2 ms-3", children: "\u00A0" });
            case 'close': return _jsx(Back, { icon: 'close' });
        }
    }
    function BackContent({ icon, onClick }) {
        return _jsx("div", { className: "px-3 py-2 cursor-pointer", onClick: onClick, children: _jsx(FA, { name: icon }) });
    }
    function BackClick({ icon }) {
        return _jsx(BackContent, { icon: icon, onClick: onBack });
    }
    function BackNav({ icon }) {
        const navigate = useNavigate();
        function onClickBack() {
            navigate(-1);
        }
        return _jsx(BackContent, { icon: icon, onClick: onClickBack });
    }
    if (onBack) {
        return _jsx(Back, { Back: BackClick });
    }
    else {
        return _jsx(Back, { Back: BackNav });
    }
}
//# sourceMappingURL=ButtonPageBack.js.map
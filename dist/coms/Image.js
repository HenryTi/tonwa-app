import { jsx as _jsx } from "react/jsx-runtime";
import { useUqAppBase } from '../UqAppBase';
// src = .src, 表示fontawesome Icon
export function Image(props) {
    let app = useUqAppBase();
    let { className, style, src, altImage } = props;
    let icon;
    if (src) {
        if (src.indexOf('.') !== 0) {
            if (src.startsWith(':') === true) {
                src = app.net.getResUrl(src.substring(1));
            }
            return _jsx("img", { src: src, className: className, alt: "img", style: style, onError: evt => {
                    if (altImage)
                        evt.currentTarget.src = altImage;
                    else
                        evt.currentTarget.src = 'https://tv.jkchemical.com/imgs/0001.png';
                } }, void 0);
        }
        icon = src.substring(1);
    }
    else {
        icon = 'file-o';
    }
    return _jsx("span", { className: (className ?? '') + ' image-none', style: style, children: _jsx("i", { className: 'fa fa-' + icon }, void 0) }, void 0);
}
//# sourceMappingURL=Image.js.map
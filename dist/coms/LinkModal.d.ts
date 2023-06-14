import React from "react";
interface Props {
    tag?: string;
    className?: string;
    modal: JSX.Element;
    children: React.ReactNode;
}
export declare function LinkModal({ tag, className, modal, children }: Props): React.DOMElement<{
    className: string;
    onClick: () => void;
}, Element>;
export {};

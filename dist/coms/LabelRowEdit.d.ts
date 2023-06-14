/// <reference types="react" />
import { LabelRowPropsBase } from "tonwa-com";
export interface PickProps {
    label: string | JSX.Element;
    value: string | number;
    onValueChanged?: (value: string | number) => Promise<void> | void;
}
export interface EditProps {
    label: string | JSX.Element;
    value: string | number;
    readonly?: boolean;
    onValueChanged?: (value: string | number) => Promise<void> | void;
    pickValue?: (props: PickProps) => Promise<string | number>;
    ValueTemplate?: (props: {
        value: string | number;
    }) => JSX.Element;
}
export declare function LabelRowEdit(props: LabelRowPropsBase & EditProps): JSX.Element;

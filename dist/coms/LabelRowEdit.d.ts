/// <reference types="react" />
import { LabelRowPropsBase } from "tonwa-com";
export interface EditProps {
    label: string | JSX.Element;
    value: string | number;
    onValueChanged?: (value: string | number) => Promise<void> | void;
    Edit?: (props: EditProps) => JSX.Element;
}
export declare function LabelRowEdit(props: LabelRowPropsBase & EditProps): JSX.Element;

/// <reference types="react" />
import { Field } from "tonwa-uq";
export interface FieldsBandsProps {
    fields: Field[];
    replacer?: {
        [fieldName: string]: JSX.Element;
    };
}
export declare function createBandsFromFields(props: FieldsBandsProps, sep?: number | JSX.Element): JSX.Element[];

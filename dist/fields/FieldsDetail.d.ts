/// <reference types="react" />
import { OnValuesChanged } from "tonwa-com";
import { FieldsBandsProps } from "./FieldsBands";
interface Props extends FieldsBandsProps {
    className?: string;
    values?: any;
    onValuesChanged?: OnValuesChanged;
    sep?: number | JSX.Element;
    children?: React.ReactNode;
}
export declare function FieldsDetail(props: Props): JSX.Element;
export {};

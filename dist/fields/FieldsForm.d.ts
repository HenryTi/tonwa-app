/// <reference types="react" />
import { FieldsBandsProps } from "./FieldsBands";
interface Props extends FieldsBandsProps {
    className?: string;
    values?: any;
    children?: React.ReactNode;
}
export declare function FieldsForm(props: Props): JSX.Element;
export {};

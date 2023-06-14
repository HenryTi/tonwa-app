/// <reference types="react" />
import { Uq } from "tonwa-uq";
interface Props<T> {
    id: number;
    uq: Uq;
    Template?: (props: {
        value: T;
    }) => JSX.Element;
}
export declare function IDView<T>({ id, uq, Template }: Props<T>): JSX.Element;
export {};

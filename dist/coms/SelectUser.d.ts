/// <reference types="react" />
import { User } from "tonwa-uq";
interface Props {
    header?: string | JSX.Element;
    top?: string | JSX.Element;
}
export declare function SelectUser({ header, top }: Props): JSX.Element;
export declare function ViewUser({ user }: {
    user: User;
}): JSX.Element;
export {};

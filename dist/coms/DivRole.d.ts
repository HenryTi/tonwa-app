import { ReactNode } from "react";
interface Props {
    children: ReactNode;
    role: string[] | string;
}
export declare function DivRole({ children, role }: Props): JSX.Element;
export {};

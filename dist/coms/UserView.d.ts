/// <reference types="react" />
import { User } from "tonwa-uq";
interface Props {
    id: number;
    assigned?: string;
    className?: string;
    Template?: (props: {
        user: User;
        assigned: string;
    }) => JSX.Element;
}
export declare function UserView({ id, assigned, className, Template }: Props): JSX.Element;
export {};

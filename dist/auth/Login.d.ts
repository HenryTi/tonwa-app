/// <reference types="react" />
import { User } from 'tonwa-uq';
interface Props {
    url?: string;
    withBack?: boolean;
    loginTop?: JSX.Element;
    privacy: JSX.Element;
    callback?: (user: User) => Promise<void>;
}
export declare function Login({ url, withBack, loginTop, privacy, callback }: Props): JSX.Element;
export {};

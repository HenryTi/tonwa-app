/// <reference types="react" />
import { PasswordParams } from './PasswordParams';
type OnVerify = (verify: string) => Promise<number>;
interface Props {
    passwordParams: PasswordParams;
    onVerify: OnVerify;
    header: string;
}
export declare function ModalVerify({ passwordParams, onVerify, header }: Props): JSX.Element;
export {};

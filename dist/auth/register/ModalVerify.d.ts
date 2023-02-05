/// <reference types="react" />
import { PasswordParams } from './PasswordParams';
declare type OnVerify = (verify: string) => Promise<number>;
interface Props {
    passwordParams: PasswordParams;
    onVerify: OnVerify;
}
export declare function ModalVerify({ passwordParams, onVerify }: Props): JSX.Element;
export {};

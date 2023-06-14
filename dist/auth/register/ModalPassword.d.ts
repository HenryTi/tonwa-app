/// <reference types="react" />
import { PasswordParams } from './PasswordParams';
export declare const pathForget = "forget";
export declare const pathRegister = "register";
export declare function ModalRegisterPassword({ passwordParams, header }: {
    passwordParams: PasswordParams;
    header: string;
}): JSX.Element;
export declare function ModalForgetPassword({ header, passwordParams }: {
    passwordParams: PasswordParams;
    header: string;
}): JSX.Element;

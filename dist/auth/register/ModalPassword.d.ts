/// <reference types="react" />
import { PasswordParams } from './PasswordParams';
export declare const pathForget = "forget";
export declare const pathRegister = "register";
export declare function ModalRegisterPassword({ passwordParams }: {
    passwordParams: PasswordParams;
}): JSX.Element;
export declare function ModalForgetPassword({ passwordParams }: {
    passwordParams: PasswordParams;
}): JSX.Element;

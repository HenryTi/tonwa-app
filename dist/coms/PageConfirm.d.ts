/// <reference types="react" />
interface PageConfirmProps {
    auth?: boolean;
    header: string;
    message: string | JSX.Element;
    yes: string;
    no?: string;
}
export declare function PageConfirm({ auth, header, message, yes, no }: PageConfirmProps): JSX.Element;
export {};

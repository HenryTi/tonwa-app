/// <reference types="react" />
interface ViewMessageProps {
    message: string | JSX.Element;
    children: React.ReactNode;
}
export declare function ViewMessage({ message, children }: ViewMessageProps): JSX.Element;
export {};

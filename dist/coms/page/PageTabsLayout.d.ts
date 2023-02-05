/// <reference types="react" />
interface PageTabsLayoutProps {
    tabs: {
        to: string;
        caption: string;
        icon: string;
    }[];
}
export declare function PageTabsLayout({ tabs }: PageTabsLayoutProps): JSX.Element;
export {};

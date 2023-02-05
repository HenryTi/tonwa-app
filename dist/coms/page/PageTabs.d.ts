import React from "react";
interface TabProps {
    tag: string | JSX.Element;
    children: React.ReactNode;
}
export declare function Tab(props: TabProps): JSX.Element;
export declare function PageTabs({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export {};

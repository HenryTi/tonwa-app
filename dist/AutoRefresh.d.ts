import { UqAppBase } from "./UqAppBase";
export declare class AutoRefresh {
    private readonly uqApp;
    private readonly refreshAction;
    private timer;
    constructor(uqApp: UqAppBase, refreshAction: Promise<void>);
    start(): void;
    stop(): void;
    private refreshTime;
    refresh: () => Promise<void>;
    private tick;
    private gapIndex;
    private callTick;
}

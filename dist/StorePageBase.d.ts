import { UqAppBase } from "./UqAppBase";
export declare abstract class StorePageBase<UQApp extends UqAppBase<UQS> = any, UQS = any> {
    readonly uqApp: UQApp;
    protected readonly uqs: UQS;
    constructor(uqApp: UQApp);
    init(): Promise<void>;
}

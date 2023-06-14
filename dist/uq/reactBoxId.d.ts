/// <reference types="react" />
import { Tuid, BoxId } from 'tonwa-uq';
export declare class ReactBoxId implements BoxId {
    readonly id: number;
    protected tuid: Tuid;
    protected ui: (values: any) => JSX.Element;
    readonly isUndefined: boolean;
    constructor(id: number, tuid: Tuid, ui: (values: any) => JSX.Element);
    get obj(): any;
    equ(id: BoxId | number): boolean;
    render(ui: TvTemplet, x: any): JSX.Element;
    get boxName(): string;
    assure(): Promise<BoxId>;
}
export type TvTemplet = (values?: any, x?: any) => JSX.Element;
export declare const tv: (tuidValue: number | BoxId, ui?: TvTemplet, x?: any, nullUI?: () => JSX.Element) => JSX.Element;

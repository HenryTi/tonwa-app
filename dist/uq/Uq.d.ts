import { UqMan } from "tonwa-uq";
export declare class Uq {
    private $_uqMan;
    private $_uqSql;
    constructor(uqMan: UqMan);
    $_createProxy(): {
        [name: string]: import("tonwa-uq").Entity;
    };
    private $_createUqSqlProxy;
    private errUndefinedEntity;
}

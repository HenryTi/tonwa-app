var UqError;
(function (UqError) {
    UqError["unexist_entity"] = "UnexistEntity";
    UqError["unexist_uq"] = "UnexistUq";
})(UqError || (UqError = {}));
;
export class Uq {
    $_uqMan;
    $_uqSql;
    constructor(uqMan) {
        this.$_uqMan = uqMan;
        this.$_uqSql = this.$_createUqSqlProxy();
    }
    $_createProxy() {
        let ret = new Proxy(this.$_uqMan.entities, {
            get: (target, key, receiver) => {
                if (key === 'SQL') {
                    return this.$_uqSql;
                }
                let lk = key.toLowerCase();
                if (lk[0] === '$') {
                    switch (lk) {
                        case '$': return this;
                        // case '$name': return this.$_uqMan.name;
                    }
                }
                let ret = target[lk];
                if (ret !== undefined)
                    return ret;
                let func = this.$_uqMan[key];
                if (func !== undefined)
                    return func;
                func = this[key];
                if (func !== undefined)
                    return func;
                this.errUnexistEntity(String(key));
            },
        });
        return ret;
    }
    $_createUqSqlProxy() {
        let ret = new Proxy(this.$_uqMan, {
            get: (target, key, receiver) => {
                let ret = target['$' + key];
                if (ret !== undefined)
                    return ret;
                this.errUnexistEntity(String(key));
            }
        });
        return ret;
    }
    errUnexistEntity(entity) {
        let message = `entity ${this.$_uqMan.name}.${entity} not defined`;
        let err = new Error(message);
        err.name = UqError.unexist_entity;
        this.$_uqMan.clearLocalEntites();
        throw err;
    }
}
//# sourceMappingURL=Uq.js.map
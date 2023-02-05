import { LocalMap } from "./localMap";
export class LocalData {
    localMap;
    user;
    guest;
    unit;
    constructor(testing) {
        this.localMap = new LocalMap(testing === true ? '$$' : '$');
        this.user = this.localMap.child('user');
        this.guest = this.localMap.child('guest');
        this.unit = this.localMap.child('unit');
    }
    _user;
    _guest;
    _unit;
    readToMemory() {
        this._user = this.user.get();
        this._guest = this.guest.get();
        this._unit = this.unit.get();
    }
    saveToLocalStorage() {
        this.user.set(this._user);
        this.guest.set(this._guest);
        this.unit.set(this._unit);
    }
    logoutClear() {
        [
            this.user,
            this.unit,
        ].forEach(d => d.remove());
    }
}
//# sourceMappingURL=localData.js.map
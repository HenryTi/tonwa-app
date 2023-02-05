import { Uq } from "./Uq";
export function uqsProxy(uqsMan) {
    const uqReacts = {};
    function setUq(uqKey, proxy) {
        if (!uqKey)
            return;
        let lower = uqKey.toLowerCase();
        uqReacts[uqKey] = proxy;
        if (lower !== uqKey)
            uqReacts[lower] = proxy;
    }
    for (let uqMan of uqsMan.uqMans) {
        let uqReact = new Uq(uqMan);
        let proxy = uqReact.$_createProxy();
        setUq(uqMan.getUqKey(), proxy);
        setUq(uqMan.getUqKeyWithConfig(), proxy);
    }
    function onUqProxyError(key) {
        for (let i in uqReacts) {
            let uqReact = uqReacts[i];
            uqReact.localMap.removeAll();
        }
        console.error(`uq proxy ${key} error`);
    }
    return new Proxy(uqReacts, {
        get: (target, key, receiver) => {
            let lk = key.toLowerCase();
            let ret = target[lk];
            if (ret !== undefined)
                return ret;
            debugger;
            console.error(`controller.uqs.${String(key)} undefined`);
            onUqProxyError(String(key));
            return undefined;
        },
    });
}
//# sourceMappingURL=uqsProxy.js.map
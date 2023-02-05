const gaps = [10, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 30, 30, 60];
export class AutoRefresh {
    uqApp;
    refreshAction;
    timer;
    constructor(uqApp, refreshAction) {
        this.uqApp = uqApp;
        this.refreshAction = refreshAction;
    }
    start() {
        if (this.refreshAction === undefined)
            return;
        this.stop();
        this.timer = setInterval(this.callTick, 1000);
    }
    stop() {
        if (this.timer === undefined)
            return;
        clearInterval(this.timer);
        this.timer = undefined;
    }
    refreshTime = Date.now() / 1000;
    // 数据服务器提醒客户端刷新，下面代码重新调入的数据
    refresh = async () => {
        let d = Date.now() / 1000;
        if (d - this.refreshTime < 30)
            return;
        await this.refreshAction;
        this.refreshTime = d;
    };
    tick = 0;
    gapIndex = 0;
    callTick = async () => {
        try {
            ++this.tick;
            if (this.tick < gaps[this.gapIndex])
                return;
            this.tick = 0;
            if (this.gapIndex < gaps.length - 1)
                ++this.gapIndex;
            let { uqUnit } = this.uqApp;
            if (uqUnit) {
                let poked = await uqUnit.Poked();
                if (poked === true)
                    return;
                this.gapIndex = 1;
                await this.refresh();
            }
        }
        catch {
        }
    };
}
//# sourceMappingURL=AutoRefresh.js.map
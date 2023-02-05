const scrollAfter = 20; // 20ms之后，scroll执行
export class Scroller {
    el;
    constructor(el) {
        this.el = el;
    }
    scrollToTop() {
        setTimeout(() => this.el.scrollTo(0, 0), scrollAfter);
    }
    scrollToBottom() {
        setTimeout(() => this.el.scrollTo(0, this.el.scrollTop + this.el.offsetHeight), scrollAfter);
    }
}
//# sourceMappingURL=PageProps.js.map
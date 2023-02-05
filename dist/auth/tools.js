const mobileRegex = /^[0-9]*$/;
const emailRegex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const senders = [
    { type: 'mobile', caption: '手机号', regex: mobileRegex },
    { type: 'email', caption: '邮箱', regex: emailRegex }
];
export function getSender(un) {
    let sender = senders.find(v => v.regex.test(un) === true);
    return sender;
}
//# sourceMappingURL=tools.js.map
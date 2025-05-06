"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectCls = InjectCls;
function InjectCls(cls) {
    return (target, propertyKey) => {
        target[propertyKey] = new cls();
    };
}
//# sourceMappingURL=inject-cls.js.map
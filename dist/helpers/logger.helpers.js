"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = void 0;
const winston_1 = require("winston");
exports.customLogger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.File({
            filename: 'user.log',
            level: `info`,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        }),
        new winston_1.transports.File({
            filename: 'purchase-error.log',
            level: `error`,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        }),
    ]
});

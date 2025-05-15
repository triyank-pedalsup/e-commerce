"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitHelper = void 0;
const index_1 = require("../configs/index");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
class RateLimitHelper {
    constructor() {
        this.limiter = (0, express_rate_limit_1.default)({
            max: index_1.Constants.LIMITER.max,
            windowMs: index_1.Constants.LIMITER.windowMs,
            message: index_1.Constants.LIMITER.message
        });
    }
}
exports.RateLimitHelper = RateLimitHelper;

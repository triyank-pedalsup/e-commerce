"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
class Constants {
}
exports.Constants = Constants;
Constants.PAGER = {
    page: 1,
    limit: 3,
};
Constants.LIMITER = {
    max: 1,
    windowMs: 60 * 100,
    message: "Too many request from this IP, please try again in an hour",
};

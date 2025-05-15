import { Constants } from "../configs/index";
import rateLimit from "express-rate-limit";

export class RateLimitHelper {
    public limiter = rateLimit({
        max: Constants.LIMITER.max,
        windowMs: Constants.LIMITER.windowMs,
        message: Constants.LIMITER.message
    })
}
export class Constants {
    public static readonly PAGER = {
        page: 1,
        limit: 3,
    }

    public static readonly LIMITER = {
        max: 1,
        windowMs: 60*100,
        message: "Too many request from this IP, please try again in an hour",
    }
}
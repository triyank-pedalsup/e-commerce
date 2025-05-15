export class Constants {
    public static readonly PAGER = {
        page: 1,
        limit: 3,
    }

    public static readonly LIMITER = {
        max: 100,
        windowMs: 60*60*100,
        message: "Too many request from this IP, please try again in an hour",
    }
}
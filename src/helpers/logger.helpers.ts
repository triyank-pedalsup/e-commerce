import { createLogger, transports, format } from "winston";

export const customLogger = createLogger({
    transports:[
        new transports.File({
            filename:'user.log',
            level:`info`,
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'purchase-error.log',
            level:`error`,
            format: format.combine(format.timestamp(),format.json())
        }),
    ]
})
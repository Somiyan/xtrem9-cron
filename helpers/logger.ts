import winston from 'winston';

export const logger = winston.createLogger({
    level: 'error',
 format: winston.format.combine(
        winston.format.timestamp({
            format:  'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) =>
            JSON.stringify({
                t: info.timestamp,
                l: info.level,
                message: info.message,
                s: info.splat !== undefined ? `${info.splat}` : '',
            }) + ','
        )
    ),    transports: [new winston.transports.File({ filename: 'logs/error.log'},),
    new winston.transports.File({ filename: 'logs/info.log',level: 'info' }),

],
});
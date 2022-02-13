import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const myFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        myFormat
    ),

    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.DailyRotateFile({
            filename: './logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), myFormat),
        })
    );
}

export default logger;

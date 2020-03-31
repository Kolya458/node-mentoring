import { createLogger, format, transports } from 'winston';

export default (level: string) => {
    const date = new Date(Date.now()).toUTCString();
    const customFormat = format.printf(info => info.durationMs
        ? `${date} | ${info.level.toUpperCase()} | ${info.message} complited in ${info.durationMs}`
        : `${date} | ${info.level.toUpperCase()} | ${info.message}`
    );
    return createLogger({
        level,
        format: format.combine(format.colorize(), customFormat),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'error.log',
                dirname: 'logs',
                level: 'error'
            })
        ]
    });
};

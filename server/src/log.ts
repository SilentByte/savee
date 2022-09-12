//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import winston from "winston";
import expressWinston from "express-winston";

import config from "./config";

export const expressLog = expressWinston.logger({
    level: config.logLevel,
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
    meta: false,
    msg: "HTTP ",
    expressFormat: true,
    ignoreRoute: (req, res) => {
        return false;
    },
});

export const log = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

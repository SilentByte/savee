//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import express, {
    Express,
    Request,
    Response,
} from "express";

import config from "./config";
import {
    log,
    expressLog,
} from "./log";

import * as status from "./status";

const app: Express = express();

app.use(expressLog);
app.use(express.static(config.staticRoot));

app.get("/", (req: Request, res: Response) => {
    res
        .send("SAVEE")
        .status(status.HTTP_200_OK);
});

app.get("/health-check", (req: Request, res: Response) => {
    res
        .json({
            status: "online",
        })
        .status(status.HTTP_200_OK);
});

export const run = () => app.listen(config.port, config.host, () => {
    log.info(`Server is running at http://${config.host}:${config.port}`);
    log.info(`Public static directory is at ${config.staticRoot}`);
});

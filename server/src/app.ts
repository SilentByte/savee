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

const app: Express = express();

app.use(expressLog);

app.get("/", (req: Request, res: Response) => {
    res.send("SAVEE");
});

export const run = () => app.listen(config.port, config.host, () => {
    log.info(`Server is running at http://${config.host}:${config.port}`);
});

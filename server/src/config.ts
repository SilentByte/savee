//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import path from "path";
import url from "url";

import dotenv from "dotenv";

function get(name: string, def?: string) {
    const value = process.env[name];
    if(!value) {
        if(def) {
            return def;
        }

        throw new Error(`Configuration error: ${name} is required`);
    }

    return value;
}

dotenv.config();

const projectRoot = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "../");

const config: {
    host: string;
    port: number;
    database: string;
    staticRoot: string;
    logLevel: string;
} = {
    host: get("HOST", "localhost"),
    port: parseInt(get("PORT", "9000"), 10),
    database: get("DATABASE"),
    staticRoot: get("STATIC_ROOT", path.join(projectRoot, "public")),
    logLevel: get("LOG_LEVEL", "info").toLowerCase(),
};

export default config;

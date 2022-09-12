//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

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

const CONFIG: {
    host: string;
    port: number;
    database: string;
    logLevel: string;
} = {
    host: get("HOST", "localhost"),
    port: parseInt(get("PORT", "9000"), 10),
    database: get("DATABASE"),
    logLevel: get("LOG_LEVEL", "info").toLowerCase(),
};

export default CONFIG;

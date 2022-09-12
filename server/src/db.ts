//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import { DateTime } from "luxon";
import _ from "lodash";

import {
    JSONFile,
    Low,
} from "lowdb";

import { v4 as uuid4 } from "uuid";

import {
    IAccount,
    IConversation,
    Opaque,
    Timestamp,
    Uuid,
} from "./models";

export type Key = Uuid;
export type CompoundKey = Opaque<"CompoundKey", string>;

interface IData {
    accounts: Record<Key, IAccount>;
    conversations: Record<CompoundKey, IConversation>;
}

class LodashAdapter<T> extends Low<T> {
    chain: _.ExpChain<this["data"]> = _.chain(this).get("data") as _.ExpChain<this["data"]>;
}

type DataChain = LodashAdapter<IData>["chain"];

export class DataBase {
    private readonly filename: string;
    private adapter?: LodashAdapter<IData>;

    constructor(filename: string) {
        this.filename = filename;
    }

    id(): Uuid {
        return uuid4() as Uuid;
    }

    key(parts: string[]): CompoundKey {
        return _.sortBy(parts).join(":") as CompoundKey;
    }

    now(): Timestamp {
        return this.timestamp(DateTime.now());
    }

    timestamp(dt: DateTime): Timestamp {
        return dt.toISO() as Timestamp;
    }

    private async lazy(): Promise<NonNullable<typeof this.adapter>> {
        if(!this.adapter) {
            this.adapter = new LodashAdapter<IData>(new JSONFile<IData>(this.filename));

            await this.adapter.read();

            this.adapter.data ||= {
                accounts: {},
                conversations: {},
            };

            await this.adapter.write();
        }

        return this.adapter;
    }

    async data(): Promise<DataChain> {
        return (await this.lazy()).chain;
    }

    async commit(): Promise<void> {
        await (await this.lazy()).write();
    }
}

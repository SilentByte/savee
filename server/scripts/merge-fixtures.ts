//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import fs from "fs";

import _ from "lodash";
import bcrypt from "bcrypt";
import { DateTime } from "luxon";

import config from "../src/config";

import {
    IData,
    Key,
    CompoundKey,
} from "../src/db";

import {
    IAccount,
    IConversation, IMoneyTransferMessage,
    ITextMessage,
    Timestamp,
} from "../src/models";

function hint<T>(o: T): T {
    return o;
}

function av(id: number): string {
    return `https://picsum.photos/id/${id}/400`;
}

function k(id: string): Key {
    return id as Key;
}

function ck(...ids: string[]): CompoundKey {
    return ids.sort().join(":") as CompoundKey;
}

function o<T>(id: string, data: Omit<T, "id">): { [id: string]: T } {
    return {
        [id]: {
            ...data,
            id: id as Key,
        } as T,
    };
}

function pw(password: string): string {
    return bcrypt.hashSync(password, 10);
}

const now = DateTime.now().toISO() as Timestamp;

const fixtures: IData = {
    accounts: {
        ...o<IAccount>("00000000-0000-0000-0000-ad930cca741a", {
            email: "rico@example.com",
            avatarUrl: av(1002),
            walletId: "????",
            hashedPassword: pw("rico"),
            createdOn: now,
        }),

        ...o<IAccount>("00000000-0000-0000-0000-3d4fa146a359", {
            email: "xin@example.com",
            avatarUrl: av(1003),
            walletId: "????",
            hashedPassword: pw("xin"),
            createdOn: now,
        }),

        ...o<IAccount>("00000000-0000-0000-0000-85ae086067e9", {
            email: "john@example.com",
            avatarUrl: av(1004),
            walletId: "????",
            hashedPassword: pw("john"),
            createdOn: now,
        }),

        ...o<IAccount>("00000000-0000-0000-0000-3d4fa146a359", {
            email: "john@example.com",
            avatarUrl: av(1004),
            walletId: "????",
            hashedPassword: pw("john"),
            createdOn: now,
        }),

        ...o<IAccount>("00000000-0000-0000-0000-7ae9d0bfc8d7", {
            email: "maria@example.com",
            avatarUrl: av(1005),
            walletId: "????",
            hashedPassword: pw("maria"),
            createdOn: now,
        }),

        ...o<IAccount>("00000000-0000-0000-0000-33e7b9ba9105", {
            email: "charlie@example.com",
            avatarUrl: av(1006),
            walletId: "????",
            hashedPassword: pw("maria"),
            createdOn: now,
        }),

        ...o<IAccount>("00000000-0000-0000-0000-a080ad23f7ef", {
            email: "erica@example.com",
            avatarUrl: av(1007),
            walletId: "????",
            hashedPassword: pw("maria"),
            createdOn: now,
        }),
    },
    conversations: {
        ...o<IConversation>(ck("00000000-0000-0000-0000-ad930cca741a", "00000000-0000-0000-0000-3d4fa146a359"), {
            messages: [
                hint<ITextMessage>({
                    type: "text",
                    id: k("00000000-0000-0000-0000-ec514dd3dbc5"),
                    senderId: k("00000000-0000-0000-0000-ad930cca741a"),
                    recipientId: k("00000000-0000-0000-0000-3d4fa146a359"),
                    text: "Hey Xin, how's it going? Happy Birthday! 🎂",
                    sentOn: now,
                }),
                hint<IMoneyTransferMessage>({
                    type: "money-transfer",
                    id: k("00000000-0000-0000-0000-6b2ff150eae6"),
                    senderId: k("00000000-0000-0000-0000-ad930cca741a"),
                    recipientId: k("00000000-0000-0000-0000-3d4fa146a359"),
                    text: "A little something for you.",
                    transferId: "????",
                    amount: 100,
                    currency: "AUD",
                    sentOn: now,
                }),
                hint<ITextMessage>({
                    type: "text",
                    id: k("00000000-0000-0000-0000-64ac99719475"),
                    senderId: k("00000000-0000-0000-0000-3d4fa146a359"),
                    recipientId: k("00000000-0000-0000-0000-ad930cca741a"),
                    text: "Omg! Thank you so much! ☺!",
                    sentOn: now,
                }),
            ],
            createdOn: now,
        }),
    },
};

const data = fs.existsSync(config.database) ? JSON.parse(fs.readFileSync(config.database, "utf-8")) : {};
const merged = _.merge(data, fixtures);

fs.writeFileSync(config.database, JSON.stringify(merged, null, 4));

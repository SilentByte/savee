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
    Timestamp,
    Uuid,
} from "../src/models/common";

import {
    IAccountRecord,
    IConversationRecord,
    IMoneyTransferMessageRecord,
    IProductRecord,
    ITextMessageRecord,
} from "../src/models/records";

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
        } as unknown as T,
    };
}

function pw(password: string): string {
    return bcrypt.hashSync(password, 10);
}

const now = DateTime.now().toISO() as Timestamp;

const fixtures: IData = {
    products: {
        ...o<IProductRecord>("303cd996-4e3f-4cee-95e3-b1ba098e9d49", {
            name: "Fancy Shoes",
            providerId: "00000000-0000-0000-0000-85ae086067e9" as Uuid,
            photoUrls: [
                "https://images.unsplash.com/photo-1521001750463-5f3e18f2da2d?auto=format&fit=crop&w=1080&q=80",
                "https://images.unsplash.com/photo-1520902980812-1e65704af11e?auto=format&fit=crop&w=1080&q=80",
            ],
            price: 199,
            currency: "USD",
            description: "These are some fancy shoes! 🥾",
            likeCounter: 283,
            isLiked: false,
            isBookmarked: false,
            createdOn: now,
        }),

        ...o<IProductRecord>("d303ff54-f3d4-49a9-8193-76e0cb7cb60d", {
            name: "Hat Collection",
            providerId: "00000000-0000-0000-0000-85ae086067e9" as Uuid,
            photoUrls: [
                "https://images.unsplash.com/photo-1566333450073-4638cdc76e18?auto=format&fit=crop&w=1080&q=80",
                "https://images.unsplash.com/photo-1617816989547-b129bcde3b3a?auto=format&fit=crop&w=1080&q=80",
                "https://images.unsplash.com/photo-1578421954862-b6ce7dc7a70a?auto=format&fit=crop&w=1080&q=80",
            ],
            price: 54.99,
            currency: "USD",
            description: "Introducing the newest members in our hat collection.",
            likeCounter: 54,
            isLiked: false,
            isBookmarked: false,
            createdOn: now,
        }),
    },
    accounts: {
        ...o<IAccountRecord>("00000000-0000-0000-0000-ad930cca741a", {
            email: "rico@example.com",
            avatarUrl: av(1002),
            walletId: "????",
            hashedPassword: pw("rico"),
            displayName: "Rico Beti",
            payments: [
                {
                    id: "57db135d-7373-4061-9aaa-be983a1d13a2" as Uuid,
                    recipientId: "00000000-0000-0000-0000-3d4fa146a359" as Uuid,
                    currency: "AUD",
                    amount: 12.55,
                    paidOn: now,
                    items: [],
                    totalAmount: 12.55,
                },
            ],
            createdOn: now,
        }),

        ...o<IAccountRecord>("00000000-0000-0000-0000-3d4fa146a359", {
            email: "xin@example.com",
            avatarUrl: av(1003),
            walletId: "????",
            hashedPassword: pw("xin"),
            displayName: "佟欣",
            payments: [],
            createdOn: now,
        }),

        ...o<IAccountRecord>("00000000-0000-0000-0000-85ae086067e9", {
            email: "john@example.com",
            avatarUrl: av(1004),
            walletId: "????",
            hashedPassword: pw("john"),
            displayName: "John Miller",
            payments: [],
            createdOn: now,
        }),

        ...o<IAccountRecord>("c5fda09b-18a8-4e4b-8514-041086f9b566", {
            email: "stephanie@example.com",
            avatarUrl: av(1005),
            walletId: "????",
            hashedPassword: pw("stephanie"),
            displayName: "Stephanie Williams",
            payments: [],
            createdOn: now,
        }),

        ...o<IAccountRecord>("00000000-0000-0000-0000-7ae9d0bfc8d7", {
            email: "maria@example.com",
            avatarUrl: av(1006),
            walletId: "????",
            hashedPassword: pw("maria"),
            displayName: "Maria Brown",
            payments: [],
            createdOn: now,
        }),

        ...o<IAccountRecord>("00000000-0000-0000-0000-33e7b9ba9105", {
            email: "charlie@example.com",
            avatarUrl: av(1008),
            walletId: "????",
            hashedPassword: pw("charlie"),
            displayName: "Charlie B.",
            payments: [],
            createdOn: now,
        }),

        ...o<IAccountRecord>("00000000-0000-0000-0000-a080ad23f7ef", {
            email: "erica@example.com",
            avatarUrl: av(1009),
            walletId: "????",
            hashedPassword: pw("erica"),
            displayName: "Erica Taylor",
            payments: [],
            createdOn: now,
        }),
    },
    conversations: {
        ...o<IConversationRecord>(ck("00000000-0000-0000-0000-ad930cca741a", "00000000-0000-0000-0000-3d4fa146a359"), {
            messages: [
                hint<ITextMessageRecord>({
                    type: "text",
                    id: k("00000000-0000-0000-0000-ec514dd3dbc5"),
                    senderId: k("00000000-0000-0000-0000-ad930cca741a"),
                    recipientId: k("00000000-0000-0000-0000-3d4fa146a359"),
                    text: "Hey Xin, how's it going? Happy Birthday! 🎂",
                    sentOn: now,
                }),
                hint<IMoneyTransferMessageRecord>({
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
                hint<ITextMessageRecord>({
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

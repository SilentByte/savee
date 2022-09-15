//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import {
    Uuid,
    Timestamp,
} from "./common";

export interface IAccountRecord {
    id: Uuid;
    avatarUrl: string;
    walletId: string;
    email: string;
    hashedPassword: string;
    displayName: string;
    createdOn: Timestamp;
}

interface IAuthTokenRecord {
    userId: Uuid;
    token: string;
    createdOn: Timestamp;
}

export interface IMessageRecord {
    type: "text" | "money-transfer";
    id: Uuid;
    senderId: Uuid;
    recipientId: Uuid;
    sentOn: Timestamp;
}

export interface ITextMessageRecord extends IMessageRecord {
    type: "text",
    text: string;
}

export interface IMoneyTransferMessageRecord extends IMessageRecord {
    type: "money-transfer";
    text: string;
    transferId: string;
    amount: number;
    currency: string;
}

export type CombinedMessageRecord = ITextMessageRecord | IMoneyTransferMessageRecord;

export interface IConversationRecord {
    createdOn: Timestamp;
    messages: CombinedMessageRecord[];
}

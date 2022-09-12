//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

export type Opaque<K, T> = T & { __TYPE__: K };
export type Uuid = Opaque<"Uuid", string>;
export type Timestamp = Opaque<"Timestamp", string>;

export interface IAccount {
    id: Uuid;
    walletId: string;
    email: string;
    hashedPassword: string;
    createdOn: Timestamp;
}

interface IAuthToken {
    userId: Uuid;
    token: string;
    createdOn: Timestamp;
}

export interface IMessage {
    type: "text" | "money-transfer";
    senderId: Uuid;
    recipientId: Uuid;
    sentOn: Timestamp;
}

export interface ITextMessage extends IMessage {
    type: "text",
    text: string;
}

export interface IMoneyTransferMessage extends IMessage {
    type: "money-transfer";
    text: string;
    amount: number;
    currency: string;
}

export type CombinedMessage = ITextMessage | IMoneyTransferMessage;

export interface IConversation {
    createdOn: Timestamp;
    messages: CombinedMessage[];
}

//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import {
    Uuid,
    Timestamp,
} from "./common";

export {
    Opaque,
    Uuid,
    Timestamp,
} from "./common";

export interface IContact {
    id: Uuid;
    displayName: string;
    avatarUrl: string;
}

export interface IMessage {
    type: "text" | "money-transfer";
    id: Uuid;
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
    isAccepted: boolean;
}

export type CombinedMessage = ITextMessage | IMoneyTransferMessage;

export interface IConversation {
    id: Uuid;
    recipient: IContact;
    messages: CombinedMessage[];
    createdOn: Timestamp;
}

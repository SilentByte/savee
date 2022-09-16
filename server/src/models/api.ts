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

export interface IFeedItem {
    id: Uuid;
    provider: IContact;
    photoUrls: string[];
    price: number;
    currency: string;
    description: string;
    likeCounter: number;
    isLiked: boolean;
    isBookmarked: boolean;
    comments: IFeedComment[];
    createdOn: Timestamp;
}

export interface IFeedComment {
    id: Uuid;
    displayName: string;
    text: string;
    postedOn: Timestamp;
}

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

export interface IPayment {
    id: Uuid;
    recipient: IContact;
    currency: string;
    amount: number;
    paidOn: Timestamp;
    items: IPaymentItem[];
}

export interface IPaymentItem {
    id: Uuid;
    name: string;
    quantity: number;
    amount: number;
}

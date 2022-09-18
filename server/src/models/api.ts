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
    id: string;
    provider: IContact;
    contentUrls: string[];
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
    id: string;
    displayName: string;
    text: string;
    postedOn: Timestamp;
}

export interface IContact {
    id: string;
    displayName: string;
    avatarUrl: string;
}

export interface IMessage {
    type: "text" | "money-transfer";
    id: string;
    senderId: string;
    recipientId: string;
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

// export interface IConversation {
//     id: string;
//     recipient: IContact;
//     messages: CombinedMessage[];
//     createdOn: Timestamp;
// }

export interface IPayment {
    id: string;
    recipient: IContact;
    currency: string;
    amount: number;
    paidOn: Timestamp;
    items: IPaymentItem[];
}

export interface IPaymentItem {
    id: string;
    name: string;
    quantity: number;
    amount: number;
}

//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import sortBy from "lodash/sortBy";
import mapValues from "lodash/mapValues";

import {
    IContact,
    IConversation,
    IPayment,
    Timestamp,
    Uuid,
} from "@server/models/api";

// TODO: Replace with proper API calls.
import * as fixture from "../../../server/db.json";

const USER_ID = "00000000-0000-0000-0000-ad930cca741a";

function hint<T>(o: T): T {
    return o;
}

function contactFromFixture(o: any): IContact {
    return {
        id: o.id as Uuid,
        displayName: o.displayName,
        avatarUrl: o.avatarUrl,
    };
}

export class Store {
    _profile: IContact = (o => ({
        id: o.id as Uuid,
        displayName: o.displayName,
        avatarUrl: o.avatarUrl,
    }))(fixture.accounts[USER_ID]);

    _contacts: IContact[] = Object
        .values(fixture.accounts)
        .filter(o => o.id !== USER_ID)
        .map(contactFromFixture);

    _conversations: Record<Uuid, IConversation[]> = mapValues(fixture.conversations, o => hint<IConversation>({
        id: o.id as Uuid,
        recipient: contactFromFixture((fixture.accounts as any)[o.id.split(":").find(id => id !== USER_ID)!]),
        messages: o.messages.map(m => ({
            ...m,
            isAccepted: true,
        })) as any,
        createdOn: o.createdOn as Timestamp,
    }));

    _payments: IPayment[] = fixture.accounts[USER_ID].payments.map(p => ({
        id: p.id as Uuid,
        avatarUrl: p.avatarUrl,
        recipient: this._contacts.find(c => c.id === p.recipientId)!,
        currency: p.currency,
        amount: p.amount,
        paidOn: p.paidOn as Timestamp,
        items: [],
    }));

    key(parts: string[]): string {
        return sortBy(parts).join(":");
    }

    contactById(id: Uuid): IContact | null {
        return this._contacts.find(c => c.id === id) || null;
    }
}

//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import { DateTime } from "luxon";

import sortBy from "lodash/sortBy";
import mapValues from "lodash/mapValues";

import Vue from "vue";

import * as firebaseAuth from "firebase/auth";
import * as firebaseStore from "firebase/firestore";

import {
    IContact,
    IFeedItem,
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

export type AppSnackbarNotificationType = "error" | "warning" | "success" | "default"

export interface IAppSnackbarNotification {
    type: AppSnackbarNotificationType;
    message: string;
}

export interface IAppMessageDialogCustomAction {
    action: string;
    text: string;
    prepend?: boolean;
    color?: string;
}

export type AppMessageDialogType = "success" | "info" | "warning" | "error";

export type AppMessageDialogAction =
    "ok"
    | "yes"
    | "no"
    | "cancel"
    | "save"
    | "discard"
    | "delete"
    | "reset"
    | "abort"
    | IAppMessageDialogCustomAction
    | string;

export interface IAppMessageDialogState {
    visible: boolean;
    text?: string;
    type?: AppMessageDialogType;
    color?: string;
    icon?: string;
    actions?: AppMessageDialogAction[];
    defaultAction?: AppMessageDialogAction;
    resolve?: (action: AppMessageDialogAction) => void;
}

export interface IUserProfile {
    id: string;
    displayName: string;
    avatarUrl: string;
}

export interface IConversation {
    id: string;
    recipientId: string;
    messages: CombinedMessage[];
}

export interface IMessage {
    type: "text" | "money-transfer";
    id: string;
    senderId: string;
    recipientId: string;
    sentOn: DateTime;
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

class Store {
    appSnackbarNotification: IAppSnackbarNotification | null = null;

    appMessageDialog: IAppMessageDialogState = {
        visible: false,
        text: "",
    };

    forceAppNotReady = false;

    get isAppReady() {
        return !this.forceAppNotReady && !this.firebaseAuthPending;
    }

    get isUserAuthenticated() {
        return !!this.firebaseUser;
    }

    firebaseAuthPending = true;
    firebaseUser: firebaseAuth.User | null = null;

    _feed: IFeedItem[] = Object.values(fixture.products).map(p => ({
        id: p.id as Uuid,
        provider: contactFromFixture((fixture.accounts as any)[p.providerId]),
        contentUrls: p.contentUrls,
        price: p.price,
        currency: p.currency,
        description: p.description,
        likeCounter: p.likeCounter,
        isLiked: p.isLiked,
        isBookmarked: p.isBookmarked,
        comments: [],
        createdOn: p.createdOn as Timestamp,
    }));

    profile: IUserProfile | null = null;

    users: Record<string, IUserProfile> = {};

    messages: Record<string, CombinedMessage> = {};

    get conversations(): IConversation[] {
        if(Object.values(this.users).length === 0) {
            return [];
        }

        const cache: Record<string, CombinedMessage[]> = {};

        for(const m of Object.values(this.messages)) {
            const key = this.key([m.senderId, m.recipientId]);

            if(!cache[key]) {
                cache[key] = [];
            }

            cache[key].push(m);
        }

        const result: IConversation[] = [];
        for(const c of Object.entries(cache)) {
            if(c[1].length === 0) {
                continue;
            }

            const messages = sortBy(c[1], m => m.sentOn.toMillis());
            result.push({
                id: c[0],
                recipientId: messages[0].senderId === this.profile?.id ? messages[0].recipientId : messages[0].senderId,
                messages,
            });
        }

        return result;
    }

    // _profile: IContact = (o => ({
    //     id: o.id as Uuid,
    //     displayName: o.displayName,
    //     avatarUrl: o.avatarUrl,
    // }))(fixture.accounts[USER_ID]);

    _contacts: IContact[] = Object
        .values(fixture.accounts)
        .filter(o => o.id !== USER_ID)
        .map(contactFromFixture);

    // _conversations: Record<Uuid, IConversation[]> = mapValues(fixture.conversations, o => hint<IConversation>({
    //     id: o.id as Uuid,
    //     recipient: contactFromFixture((fixture.accounts as any)[o.id.split(":").find(id => id !== USER_ID)!]),
    //     messages: o.messages.map(m => ({
    //         ...m,
    //         isAccepted: true,
    //     })) as any,
    // }));

    _payments: IPayment[] = fixture.accounts[USER_ID].payments.map(p => ({
        id: p.id as Uuid,
        recipient: this._contacts.find(c => c.id === p.recipientId)!,
        currency: p.currency,
        amount: p.amount,
        paidOn: p.paidOn as Timestamp,
        items: [],
    }));

    private async setupDatabaseConnection(userId: string) {
        const db = firebaseStore.getFirestore();

        const addMessage = (id: string, data: any) => {
            Vue.set(this.messages, id, {
                id,
                type: data.type || "text",
                senderId: data.senderId,
                recipientId: data.recipientId,
                sentOn: DateTime.fromSeconds(data.sentOn?.seconds || 0),
                text: data.text,
                amount: data.amount,
                currency: data.currency,
                isAccepted: data.isAccepted,
            });
        };

        // TODO: Change workflow; rules need to be adjusted for production.
        firebaseStore.onSnapshot(firebaseStore.collection(db, "users"),
            (snap) => {
                snap.forEach((doc) => {
                    const data = doc.data();
                    Vue.set(this.users, doc.id, {
                        id: doc.id,
                        avatarUrl: data.avatarUrl || "", // TODO: Assign default URL.
                        displayName: data.displayName || "Anonymous",
                    });
                });
            },
        );

        // Messages by sender.
        firebaseStore.onSnapshot(
            firebaseStore.query(firebaseStore.collection(db, "messages"),
                firebaseStore.where("senderId", "==", userId)),
            (snap) => {
                snap.forEach((doc) => {
                    addMessage(doc.id, doc.data());
                });
            },
        );

        // Messages by recipient.
        firebaseStore.onSnapshot(
            firebaseStore.query(firebaseStore.collection(db, "messages"),
                firebaseStore.where("recipientId", "==", userId)),
            (snap) => {
                snap.forEach((doc) => {
                    addMessage(doc.id, doc.data());
                });
            },
        );
    }

    initialize() {
        this.firebaseAuthPending = true;

        firebaseAuth.onAuthStateChanged(firebaseAuth.getAuth(), async (user) => {
            this.profile = null;
            this.messages = {};

            if(user) {
                const db = firebaseStore.getFirestore();
                const profileData = (await firebaseStore.getDoc(firebaseStore.doc(db, "users", user.uid))).data() as IUserProfile | undefined;

                this.profile = {
                    id: user.uid,
                    avatarUrl: profileData?.avatarUrl || user.photoURL || "", // TODO: Assign default URL.
                    displayName: profileData?.displayName || user.displayName || "Anonymous",
                };

                await this.setupDatabaseConnection(user.uid);
            }

            store.firebaseUser = user;
            this.firebaseAuthPending = false;
        });
    }

    key(parts: string[]): string {
        return sortBy(parts).join(":");
    }

    contactById(id: Uuid): IContact | null {
        return this._contacts.find(c => c.id === id) || null;
    }

    showNotificationSnackbar(type: AppSnackbarNotificationType, message: string) {
        this.appSnackbarNotification = {
            type,
            message,
        };
    }

    async showMessageDialog(payload: {
        text: string;
        actions: AppMessageDialogAction[];
        defaultAction: AppMessageDialogAction;
        type?: AppMessageDialogType;
        icon?: string;
        color?: string;
    }): Promise<AppMessageDialogAction> {
        let resolve: any = null;
        const promise = new Promise<AppMessageDialogAction>(r => {
            resolve = r;
        });

        this.appMessageDialog = {
            visible: true,
            text: payload.text,
            actions: payload.actions,
            defaultAction: payload.defaultAction,
            type: payload.type,
            icon: payload.icon,
            color: payload.color,
            resolve,
        };

        const action = await promise;

        this.appMessageDialog = {
            visible: false,
        };

        return action;
    }

    async signIn(email: string, password: string) {
        const auth = firebaseAuth.getAuth();
        const credentials = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
        this.firebaseUser = credentials.user;
    }

    async signOut() {
        this.forceAppNotReady = true;
        await firebaseAuth.getAuth().signOut();
        location.reload();
    }

    async sendChatMessage(recipientId: string, text: string) {
        const db = firebaseStore.getFirestore();
        await firebaseStore.addDoc(firebaseStore.collection(db, "messages"), {
            recipientId,
            senderId: this.profile!.id,
            sentOn: firebaseStore.serverTimestamp(),
            text,
        });
    }
}

export const store = new Store();

function showUnhandledErrorNotification(error: any) {
    const message = {
        "auth/user-not-found": "Looks like the user does not exist.",
        "auth/wrong-password": "Your password is incorrect!",
        "auth/code-expired": "The authentication code has expired.",
        "auth/email-already-in-use": "Looks like this e-mail address is already in use!",
        "auth/weak-password": "Your password is not strong enough.",
    }[(error?.code) as string] || "Oh no! An unhandled error occurred!";

    store.showNotificationSnackbar("error", message);
}

export async function globalVueErrorHandler(error: Error, vm: Vue, info: string): Promise<void> {
    if(process.env.NODE_ENV === "development") {
        console.error("UNHANDLED VUE ERROR", {
            code: (error as any)?.code,
            error,
            vm,
            info,
        });
    }

    showUnhandledErrorNotification(error);
}

window.onerror = async (msg, url, line, col, error?: Error) => {
    if(process.env.NODE_ENV === "development") {
        console.error("UNHANDLED ERROR", {
            code: (error as any)?.code,
            msg,
            url,
            line,
            col,
            error,
        });
    }

    showUnhandledErrorNotification(error);
};

window.onunhandledrejection = async (e: PromiseRejectionEvent) => {
    if(process.env.NODE_ENV === "development") {
        console.error("UNHANDLED PROMISE REJECTION ERROR", e);
    }

    showUnhandledErrorNotification(e.reason?.error);
};

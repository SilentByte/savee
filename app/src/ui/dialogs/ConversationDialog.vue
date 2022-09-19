<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-dialog eager fullscreen hide-overlay scrollable
              transition="dialog-right-transition"
              v-model="visible">
        <v-card v-if="model.conversation"
                class="dialog-body">
            <v-toolbar dark
                       color="primary"
                       style="z-index: 10">
                <v-btn icon
                       @click="onClose">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-toolbar-title>
                    {{ $store.users[model.conversation.recipientId]?.displayName }}
                </v-toolbar-title>

                <v-spacer />

                <v-select dense outlined hide-details autoselect
                          item-value="id"
                          item-text="text"
                          style="max-width: 120px"
                          :value="'USD'"
                          :items="wallets" />

                <v-menu offset-y
                        min-width="200">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon
                               v-bind="attrs"
                               v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="onShowTransactionHistory">
                            <v-list-item-title>Transaction History</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>

            <v-card-text ref="conversationBody"
                         class="px-0 fill-height conversation-body">
                <v-container class="align-start px-2">
                    <v-row dense>
                        <v-col v-for="message in messages" :key="message.id"
                               cols="12">
                            <div v-if="message.type === 'money-transfer'"
                                 :class="{
                                    'chat-message-gift': true,
                                    'self': isMessageFromSelf(message),
                                    'other': !isMessageFromSelf(message),
                                 }">
                                <v-btn icon
                                       class="mb-2 gift-button"
                                       color="info"
                                       width="120"
                                       height="120">
                                    <v-avatar tile
                                              size="100">
                                        <v-img src="@/assets/flying_money.svg" />
                                    </v-avatar>

                                    <div style="position: absolute; bottom: 0">
                                        <v-chip small
                                                color="primary">
                                            {{ $format.money(message.currency, message.amount) }}
                                        </v-chip>
                                    </div>
                                </v-btn>
                            </div>

                            <div class="d-flex">
                                <template v-if="!isMessageFromSelf(message)">
                                    <v-avatar class="me-2"
                                              size="36">
                                        <img :src="messageSenderAvatarUrl(message)" />
                                    </v-avatar>
                                </template>
                                <v-spacer v-else />

                                <v-card outlined class="d-inline-flex"
                                        :class="{
                                            'chat-message': true,
                                            'self': isMessageFromSelf(message),
                                            'other': !isMessageFromSelf(message),
                                        }">
                                    <v-card-text class="px-2 py-1 d-flex align-center">
                                        {{ message.text }}
                                    </v-card-text>
                                </v-card>

                                <template v-if="isMessageFromSelf(message)">
                                    <v-avatar size="36"
                                              class="ms-2">
                                        <img :src="messageSenderAvatarUrl(message)" />
                                    </v-avatar>
                                </template>
                                <v-spacer v-else />
                            </div>

                            <div class="text-caption text-disabled"
                                 :class="{
                                    'chat-message-date': true,
                                    'self': isMessageFromSelf(message),
                                    'other': !isMessageFromSelf(message),
                                 }">
                                <small>{{ formatMessageDate(message) }}</small>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions class="ps-4 pe-2 reply-body">
                <v-textarea ref="replyTextArea"
                            dense outlined hide-details auto-grow autofocus
                            rows="1"
                            class="reply-text-area"
                            placeholder="Say hello… 👋"
                            v-model="model.typedMessage"
                            @keydown.enter.prevent="onSendMessage" />

                <v-scroll-x-reverse-transition leave-absolute hide-on-leave>
                    <v-btn v-if="canSendMessage"
                           icon
                           class="ms-1"
                           color="primary"
                           @click="onSendMessage">
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                </v-scroll-x-reverse-transition>

                <v-scroll-x-reverse-transition leave-absolute hide-on-leave>
                    <v-btn v-if="canPay"
                           icon
                           class="ms-1"
                           color="primary"
                           @click="onShowTransferMoneyDialog">
                        <v-icon>mdi-currency-usd</v-icon>
                    </v-btn>
                </v-scroll-x-reverse-transition>
            </v-card-actions>
        </v-card>

        <v-dialog v-if="model.conversation"
                  fullscreen hide-overlay
                  transition="dialog-bottom-transition"
                  v-model="transactionHistoryDialogVisible">
            <v-card>
                <v-toolbar dark
                           color="primary">
                    <v-btn icon
                           @click="onCloseTransactionHistory">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>

                    <v-toolbar-title>
                        Transaction History
                    </v-toolbar-title>
                </v-toolbar>
                <v-list two-line subheader>
                    <v-subheader>
                        Transactions with
                        {{ $store.users[model.conversation.recipientId]?.displayName }}
                    </v-subheader>
                    <v-list-item v-for="t in transactions" :key="t.id">
                        <v-list-item-avatar v-if="isMessageFromSelf(t)">
                            <v-icon color="error">mdi-minus-thick</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else>
                            <v-icon color="success">mdi-plus-thick</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ $format.money(t.currency, t.amount, {decimals: 2}) }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ t.text }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action-text>
                            {{ t.sentOn.toLocaleString() }}
                        </v-list-item-action-text>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>

        <v-dialog v-if="model.conversation"
                  v-model="transferMoneyDialogVisible">
            <v-card>
                <v-container>
                    <v-form v-model="transferMoneyDialogForm">
                        <v-row dense>
                            <v-col cols="12">
                                <v-subheader class="px-1">
                                    Send money to {{ $store.users[model.conversation.recipientId]?.displayName }}
                                </v-subheader>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field dense outlined hide-details
                                              type="number"
                                              label="Amount"
                                              v-model="transferMoneyDialogAmount"
                                              :rules="transferMoneyDialogAmountRules" />
                            </v-col>
                            <v-col cols="12">
                                <v-select dense outlined hide-details
                                          type="number"
                                          label="Currency"
                                          item-value="currency"
                                          item-text="currency"
                                          v-model="transferMoneyDialogCurrency"
                                          :items="wallets" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field dense outlined hide-details
                                              label="Message"
                                              v-model="transferMoneyDialogMessage"
                                              :rules="transferMoneyDialogMessageRules" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn large depressed block
                                       color="primary"
                                       :disabled="!transferMoneyDialogForm"
                                       :loading="transferMoneyDialogSending"
                                       @click="onTransferMoney">
                                    Send Money
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </v-dialog>
</template>

<script lang="ts">

import { DateTime } from "luxon";

import {
    Component,
    Ref,
    Watch,
    Vue,
} from "vue-property-decorator";

import {
    IConversation,
    IMessage,
} from "@/models/store";

interface IModel {
    conversation: IConversation | null;
    typedMessage: string;
}

function defaultModel(): IModel {
    return {
        conversation: null,
        typedMessage: "",
    };
}

@Component
export default class ConversationDialog extends Vue {
    @Ref("conversationBody") private readonly conversationBodyRef?: Element;
    @Ref("replyTextArea") private readonly replyTextAreaRef!: { focus(): void };

    private visible = false;
    private model = defaultModel();
    private transactionHistoryDialogVisible = false;
    private transferMoneyDialogVisible = false;
    private transferMoneyDialogForm = false;
    private transferMoneyDialogCurrency = this.wallets[0]?.currency || "USD";
    private transferMoneyDialogAmount: number | null = null;
    private transferMoneyDialogMessage = "";
    private transferMoneyDialogSending = false;

    private transferMoneyDialogAmountRules = [
        (v: string) => /\d+(\.\d*)?/.test(v) || "Please enter a valid amount",
    ];

    private transferMoneyDialogMessageRules = [
        (v: string) => !!v || "Please enter a message",
    ];

    private get canSendMessage() {
        return !!this.model.typedMessage.trim();
    }

    private get canPay() {
        return !this.model.typedMessage.trim();
    }

    private get wallets() {
        return Object.entries(this.$store.profile?.walletBalances || {}).map(e => ({
            id: e[0],
            text: this.$format.money(e[0], e[1], {decimals: 2}),
            currency: e[0],
            balance: e[1],
        }));
    }

    private get messages() {
        return this.$store.conversations.find(c => c.id === this.model.conversation?.id)?.messages || [];
    }

    private get transactions() {
        return this.messages.filter(m => m.type === "money-transfer");
    }

    private isMessageFromSelf(message: IMessage) {
        return message.senderId === this.$store.profile?.id;
    }

    private messageSenderAvatarUrl(message: IMessage) {
        if(!this.model.conversation?.recipientId) {
            return;
        }

        return this.isMessageFromSelf(message)
            ? this.$store.profile?.avatarUrl
            : this.$store.users[this.model.conversation?.recipientId]?.avatarUrl;
    }

    private formatMessageDate(message: IMessage) {
        return message.sentOn.toLocaleString(DateTime.DATETIME_SHORT);
    }

    private scrollToBottom() {
        if(this.conversationBodyRef) {
            this.conversationBodyRef.scrollTo(0, this.conversationBodyRef.scrollHeight);
        }
    }

    show(conversation: IConversation): void {
        this.visible = true;
        this.model = {
            ...defaultModel(),
            conversation,
        };

        this.$nextTick(() => this.scrollToBottom());
    }

    private onClose() {
        this.visible = false;
    }

    private onShowTransactionHistory() {
        this.transactionHistoryDialogVisible = true;
    }

    private onCloseTransactionHistory() {
        this.transactionHistoryDialogVisible = false;
    }

    private onSendMessage() {
        this.$store.sendChatMessage(this.model.conversation!.recipientId, this.model.typedMessage);

        this.model.typedMessage = "";

        this.replyTextAreaRef.focus();
        this.scrollToBottom();
    }

    private onShowTransferMoneyDialog() {
        this.transferMoneyDialogVisible = true;
        this.transferMoneyDialogForm = false;
        this.transferMoneyDialogCurrency = this.wallets[0]?.currency || "USD";
        this.transferMoneyDialogAmount = null;
        this.transferMoneyDialogMessage = "";
    }

    private async onTransferMoney() {
        try {
            this.transferMoneyDialogSending = true;
            await this.$store.transferMoney({
                recipientId: this.model.conversation!.recipientId,
                currency: this.transferMoneyDialogCurrency,
                amount: this.transferMoneyDialogAmount!,
                text: this.transferMoneyDialogMessage,
            });
        } finally {
            this.transferMoneyDialogSending = false;
            this.transferMoneyDialogVisible = false;
        }
    }

    @Watch("$store.conversations", {deep: true})
    private async onMessageAdded() {
        await this.$nextTick();
        this.scrollToBottom();
    }
}

</script>

<style lang="scss" scoped>

@import "~@/styles/variables";

$chat-message-offset: 64px;

.dialog-body {
    overflow-x: hidden;
}

.conversation-body {
    background-color: $light-background-color;
}

.chat-message {
    display: inline-flex;
    flex-shrink: 1;
}

.chat-message.self {
    margin-left: $chat-message-offset;
    background-color: lighten($primary-color, 48%);
}

.chat-message.other {
    margin-right: $chat-message-offset;
}

.chat-message-date.self {
    text-align: right;
    margin-right: 48px;
}

.chat-message-date.other {
    text-align: left;
    margin-left: 48px;
}

.chat-message-gift.self {
    text-align: right;
    margin-right: 48px;
}

.chat-message-gift.other {
    text-align: left;
    margin-left: 48px;
}

.reply-body {
    background-color: $lighter-background-color;
}

.reply-text-area {
    background-color: white;

    & ::v-deep textarea {
        overflow: auto;
        max-height: calc(3em + 36px) !important;
    }
}

.gift-button {
    animation: pulse 2s infinite;
    box-shadow: 0 0 0 0 rgba($success-color, 1);
}

</style>

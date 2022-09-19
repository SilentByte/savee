<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12"
                   class="pa-10 text-center">
                <v-btn class="pay-button"
                       color="primary"
                       @click="onPay">
                    <v-row dense>
                        <v-col cols="12">
                            <v-icon size="50">
                                mdi-currency-usd
                            </v-icon>
                        </v-col>
                        <v-col cols="12">
                            PAY NOW
                        </v-col>
                    </v-row>
                </v-btn>
            </v-col>

            <v-col cols="12">
                <v-divider />
            </v-col>

            <v-col cols="12">
                <v-subheader>Prior Transactions</v-subheader>
                <v-list two-line
                        class="py-0">
                    <v-list-item v-for="p in payments" :key="p.id">
                        <v-list-item-avatar>
                            <v-img :src="$store.users[p.recipientId]?.avatarUrl" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>
                                {{ $store.users[p.recipientId]?.displayName }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-caption"
                                                  :title="p.sentOn.toLocaleString()">
                                {{ p.sentOn.toRelative() }}
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action-text>
                            {{ $format.money(p.currency, p.amount, {decimals: 2}) }}
                        </v-list-item-action-text>

                        <v-list-item-action v-if="p.paymentItems.length > 0">
                            <v-btn icon
                                   @click="onShowPaymentItemDialog(p)">
                                <v-icon>mdi-format-list-numbered</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>

        <v-dialog v-if="paymentItemDialogPayment"
                  fullscreen hide-overlay scrollable
                  transition="dialog-bottom-transition"
                  v-model="paymentItemDialogVisible">
            <v-card>
                <v-toolbar dark
                           color="primary">
                    <v-btn icon
                           @click="onClosePaymentItemDialog">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>

                    <v-toolbar-title>
                        Receipt from {{ $store.users[paymentItemDialogPayment.recipientId]?.displayName }}
                    </v-toolbar-title>
                </v-toolbar>
                <v-container class="fill-height align-start">
                    <v-row>
                        <v-col cols="12">
                            <v-list subheader>
                                <v-subheader>
                                    Paid on {{ paymentItemDialogPayment.sentOn.toLocaleString() }}
                                </v-subheader>

                                <v-list-item v-for="(item, index) in paymentItemDialogPayment.paymentItems"
                                             :key="index">
                                    <v-list-item-avatar>
                                        {{ index + 1 }}.
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ item.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-list-item-action-text>
                                            <span class="me-2 text-disabled">
                                                {{ item.quantity }}x
                                            </span>
                                            {{
                                                $format.money(paymentItemDialogPayment.currency, item.amount, {decimals: 2})
                                            }}
                                        </v-list-item-action-text>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <strong class="text-uppercase">Total</strong>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-list-item-action-text class="font-weight-bold">
                                            {{
                                                $format.money(paymentItemDialogPayment.currency, paymentItemDialogPayment.amount)
                                            }}
                                        </v-list-item-action-text>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">

import orderBy from "lodash/orderBy";

import {
    Component,
    Vue,
} from "vue-property-decorator";

import { IMoneyTransferMessage } from "@/models/store";

@Component
export default class PayView extends Vue {
    private paymentItemDialogVisible = false;
    private paymentItemDialogPayment: IMoneyTransferMessage | null = null;

    private get payments() {
        const transactions = Object
            .values(this.$store.messages)
            .filter(m => m.type === "money-transfer" && m.senderId === this.$store.profile?.id);

        return orderBy(transactions, [t => t.sentOn.toMillis()], ["desc"]);
    }

    private onShowPaymentItemDialog(payment: IMoneyTransferMessage) {
        this.paymentItemDialogVisible = true;
        this.paymentItemDialogPayment = payment;
    }

    private onClosePaymentItemDialog() {
        this.paymentItemDialogVisible = false;
        this.paymentItemDialogPayment = null;
    }

    private onPay() {
        this.$store.showMessageDialog({
            text: "This features is a work-in-progress! :-) The idea is that users can simply scan a QR code or swipe their" +
                " phones to pay. With Savee-enabled businesses, users will receive a detailed receipt" +
                " for each transaction",
            actions: ["ok"],
            defaultAction: "ok",
        });
    }
}

</script>

<style lang="scss" scoped>

@import "~@/styles/variables";

.pay-button {
    width: 140px !important;
    height: 140px !important;
    border-radius: 9999px;

    animation: pulse 2s infinite;
    box-shadow: 0 0 0 0 rgba($primary-color, 1);
}

</style>

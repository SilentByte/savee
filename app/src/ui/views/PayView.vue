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
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

import { DateTime } from "luxon";

import orderBy from "lodash/orderBy";

import {
    Component,
    Vue,
} from "vue-property-decorator";

@Component
export default class PayView extends Vue {
    private get payments() {
        const transactions = Object
            .values(this.$store.messages)
            .filter(m => m.type === "money-transfer" && m.senderId === this.$store.profile?.id)

        return orderBy(transactions, [t => t.sentOn.toMillis()],['desc'])
    }

    private onPay() {
        this.$store.showMessageDialog({
            text: "TODO",
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

<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container class="pa-0">
        <v-list class="py-0">
            <template v-for="(c, i) in conversations">
                <v-list-item :key="c.id"
                             two-line inactive
                             @click="onOpenConversation(c)">
                    <v-list-item-avatar>
                        <v-img :src="c.recipient.avatarUrl">
                            <template v-slot:placeholder>
                                <v-skeleton-loader type="card" />
                            </template>
                        </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ c.recipient.displayName }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ formatLastMessagePreview(c) }}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-list-item-action-text>
                            {{ formatLastMessageTime(c) }}
                        </v-list-item-action-text>
                    </v-list-item-action>
                </v-list-item>

                <v-divider v-if="i < conversations.length - 1"
                           :key="`${c.id}-divider`"
                           inset />
            </template>
        </v-list>
    </v-container>
</template>

<script lang="ts">

import { DateTime } from "luxon";

import last from "lodash/last";

import {
    Component,
    Vue,
} from "vue-property-decorator";

import { IConversation } from "@server/models/api";

@Component
export default class ChatView extends Vue {
    private get conversations(): IConversation[] {
        return Object.values(this.$store._conversations);
    }

    // TODO: Implement type definition (shared with server).
    private formatLastMessageTime(conversation: IConversation) {
        const sentOn = last(conversation.messages)?.sentOn;

        if(!sentOn) {
            return "";
        }

        return DateTime.fromISO(sentOn).toRelative();
    }

    // TODO: Implement type definition (shared with server).
    private formatLastMessagePreview(conversation: IConversation) {
        return last(conversation.messages)?.text;
    }

    private onOpenConversation(conversation: IConversation) {
        console.log(conversation)
    }
}

</script>

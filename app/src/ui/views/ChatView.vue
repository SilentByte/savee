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
                        <v-img :src="$store.users[c.recipientId]?.avatarUrl">
                            <template v-slot:placeholder>
                                <v-skeleton-loader type="card" />
                            </template>
                        </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ $store.users[c.recipientId]?.displayName }}
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

        <ConversationDialog ref="conversationDialog" />
    </v-container>
</template>

<script lang="ts">

import last from "lodash/last";

import {
    Vue,
    Component,
    Ref,
} from "vue-property-decorator";

import { IConversation } from "@/models/store";

import ConversationDialog from "@/ui/dialogs/ConversationDialog.vue";

@Component({
    components: {
        ConversationDialog,
    },
})
export default class ChatView extends Vue {
    @Ref("conversationDialog") private readonly conversationDialogRef!: ConversationDialog;

    private get conversations(): IConversation[] {
        return this.$store.conversations;
    }

    private formatLastMessageTime(conversation: IConversation) {
        return last(conversation.messages)?.sentOn?.toRelative();
    }

    private formatLastMessagePreview(conversation: IConversation) {
        return last(conversation.messages)?.text;
    }

    private onOpenConversation(conversation: IConversation) {
        this.conversationDialogRef.show(conversation);
    }
}

</script>

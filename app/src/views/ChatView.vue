<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container class="pa-0">
        <v-list class="py-0">
            <template v-for="(a, i) in $store.accounts">
                <v-list-item :key="a.id"
                             two-line inactive
                             @click="onOpenChat">
                    <v-list-item-avatar>
                        <v-img :src="a.avatarUrl">
                            <template v-slot:placeholder>
                                <v-skeleton-loader type="card" />
                            </template>
                        </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ a.displayName }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ formatLastMessagePreview(a) }}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-list-item-action-text>
                            {{ formatLastMessageTime(a) }} {{ $store.test }}
                        </v-list-item-action-text>
                    </v-list-item-action>
                </v-list-item>

                <v-divider v-if="i < $store.accounts.length - 1"
                           :key="`${a.id}-divider`"
                           inset />
            </template>
        </v-list>
    </v-container>
</template>

<script lang="ts">

import {
    Component,
    Vue,
} from "vue-property-decorator";

@Component
export default class ChatView extends Vue {
    // TODO: Implement type definition (shared with server).
    private formatLastMessageTime(account: any) {
        return "todo";
    }

    // TODO: Implement type definition (shared with server).
    private formatLastMessagePreview(account: any) {
        return "todo";
    }

    private onOpenChat() {
        //
    }
}

</script>

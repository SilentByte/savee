<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container class="pa-0">
        <v-list>
            <template v-for="(a, i) in accounts">
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
                            {{ formatLastMessageTime(a) }}
                        </v-list-item-action-text>
                    </v-list-item-action>
                </v-list-item>

                <v-divider v-if="i < accounts.length - 1"
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
    private accounts = Object.values({
        "00000000-0000-0000-0000-ad930cca741a": {
            "email": "rico@example.com",
            "avatarUrl": "https://picsum.photos/id/1002/400",
            "walletId": "????",
            "hashedPassword": "$2b$10$XQnuu22bVLABK0xyYH2kL.U78Wafg6sId8ZvWpWv6B/7xbW/N2eYK",
            "displayName": "Rico Beti",
            "createdOn": "2022-09-15T22:45:07.719+08:00",
            "id": "00000000-0000-0000-0000-ad930cca741a",
        },
        "00000000-0000-0000-0000-3d4fa146a359": {
            "email": "xin@example.com",
            "avatarUrl": "https://picsum.photos/id/1003/400",
            "walletId": "????",
            "hashedPassword": "$2b$10$KzG0BUGC4sJj0BTwq3LquOt4FKQnmVPKB3MwfMvU2/sf6RaSoS6Z6",
            "displayName": "佟欣",
            "createdOn": "2022-09-15T22:45:07.719+08:00",
            "id": "00000000-0000-0000-0000-3d4fa146a359",
        },
        "00000000-0000-0000-0000-85ae086067e9": {
            "email": "john@example.com",
            "avatarUrl": "https://picsum.photos/id/1004/400",
            "walletId": "????",
            "hashedPassword": "$2b$10$0ahq.xG8jIIj2ByZAStcauMaMTjPDRa.wo1VXzOVHvvklX87acD56",
            "displayName": "John Miller",
            "createdOn": "2022-09-15T22:45:07.719+08:00",
            "id": "00000000-0000-0000-0000-85ae086067e9",
        },
        "c5fda09b-18a8-4e4b-8514-041086f9b566": {
            "email": "stephanie@example.com",
            "avatarUrl": "https://picsum.photos/id/1005/400",
            "walletId": "????",
            "hashedPassword": "$2b$10$jbmrscKADb1PxA0S3yR9G.pxSW6osDI2XW.p52iUDkXYJ2LjOtOd.",
            "displayName": "Stephanie Williams",
            "createdOn": "2022-09-15T22:45:07.719+08:00",
            "id": "c5fda09b-18a8-4e4b-8514-041086f9b566",
        },
        "00000000-0000-0000-0000-7ae9d0bfc8d7": {
            "email": "maria@example.com",
            "avatarUrl": "https://picsum.photos/id/1006/400",
            "walletId": "????",
            "hashedPassword": "$2b$10$W4GQtXjdQKPXTajXegzBKuZ/Fp5AUsBsBLRJ8V2xEZILN0XSX9Npy",
            "displayName": "Maria Brown",
            "createdOn": "2022-09-15T22:45:07.719+08:00",
            "id": "00000000-0000-0000-0000-7ae9d0bfc8d7",
        },
        "00000000-0000-0000-0000-33e7b9ba9105": {
            "email": "charlie@example.com",
            "avatarUrl": "https://picsum.photos/id/1008/400",
            "walletId": "????",
            "hashedPassword": "$2b$10$Ww1/9tQPvYPDyLJsw5zmd.Hb06cz608j7pEWdzM9NZJZeDTbiS89m",
            "displayName": "Charlie B.",
            "createdOn": "2022-09-15T22:45:07.719+08:00",
            "id": "00000000-0000-0000-0000-33e7b9ba9105",
        },
        "00000000-0000-0000-0000-a080ad23f7ef": {
            "email": "erica@example.com",
            "avatarUrl": "https://picsum.photos/id/1009/400",
            "walletId": "????",
            "hashedPassword": "$2b$10$JtlDSsVRykIr.RZfEy2gMuhvTZFNnGdrBMdUoN0QAjyRg/qoZz/Sa",
            "displayName": "Erica Taylor",
            "createdOn": "2022-09-15T22:45:07.719+08:00",
            "id": "00000000-0000-0000-0000-a080ad23f7ef",
        },
    });

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

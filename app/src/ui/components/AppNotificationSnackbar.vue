<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-snackbar app light bottom
                timeout="4000"
                v-model="snackbar"
                @input="onDisappear">
        <v-card flat max-width="420">
            <v-row>
                <v-icon v-if="current.type === 'error'"
                        class="ms-5"
                        color="error">
                    mdi-alert-circle
                </v-icon>
                <v-icon v-else-if="current.type === 'warning'"
                        class="ms-5"
                        color="warning">
                    mdi-alert
                </v-icon>
                <v-icon v-else-if="current.type === 'info'"
                        class="ms-5"
                        color="info">
                    mdi-information-outline
                </v-icon>
                <v-icon v-else-if="current.type === 'success'"
                        class="ms-5"
                        color="success">
                    mdi-check
                </v-icon>
                <v-col>
                    <div class="ml-1">
                        {{ current.message }}
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <template v-slot:action>
            <v-btn text icon
                   @click="onHide">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">

import {
    Component,
    Watch,
    Vue,
} from "vue-property-decorator";

import * as utils from "@/modules/utils";

import {
    IAppSnackbarNotification,
} from "@/models/store";

const ANIMATION_DELAY = 1000;

@Component
export default class AppNotificationSnackbar extends Vue {
    private snackbar = false;

    private get current(): IAppSnackbarNotification {
        return this.$store.appSnackbarNotification || {
            type: "default",
            message: "",
        };
    }

    private onShow() {
        if(this.$store.appSnackbarNotification) {
            this.snackbar = true;
        }
    }

    private async onHide() {
        this.snackbar = false;
        await utils.timeout(ANIMATION_DELAY);
        this.$store.appSnackbarNotification = null;
    }

    private async onDisappear() {
        await utils.timeout(ANIMATION_DELAY);
        this.$store.appSnackbarNotification = null;
    }

    @Watch("$store.appSnackbarNotification")
    private onAppMessageChange() {
        this.onShow();
    }
}

</script>

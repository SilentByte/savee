<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-dialog persistent
              width="600"
              :value="$store.appMessageDialog.visible"
              @input="onAction('cancel')">
        <v-card>
            <v-card-text class="pa-6 pb-2">
                <div class="d-flex">
                    <div v-if="icon"
                         class="mx-2 d-inline-flex flex-row flex-grow-0">
                        <v-icon class="d-inline me-4"
                                size="60"
                                :color="color">
                            {{ icon }}
                        </v-icon>
                    </div>
                    <div class="d-inline-flex flex-row flex-grow-1 align-center">
                        {{ $store.appMessageDialog.text }}
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn v-for="action in prependActions" :key="extractActionValue(action)"
                       text
                       :color="extractActionColor(action)"
                       @click="onAction(action)">
                    {{ extractActionText(action) }}
                </v-btn>

                <v-spacer />

                <v-btn v-for="action in actions" :key="extractActionValue(action)"
                       text
                       :color="extractActionColor(action)"
                       @click="onAction(action)">
                    {{ extractActionText(action) }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<!--suppress JSMethodCanBeStatic -->
<script lang="ts">

import {
    Component,
    Vue,
} from "vue-property-decorator";

import { AppMessageDialogAction } from "@/models/store";

@Component
export default class AppMessageDialog extends Vue {
    private get icon() {
        if(this.$store.appMessageDialog.icon) {
            return this.$store.appMessageDialog.icon;
        }

        return {
            "success": "mdi-check-circle-outline",
            "info": "mdi-information-outline",
            "warning": "mdi-alert-outline",
            "error": "mdi-alert-circle-outline",
        }[this.$store.appMessageDialog.type as string];
    }

    private get color() {
        if(this.$store.appMessageDialog.color) {
            return this.$store.appMessageDialog.color;
        }

        return this.$store.appMessageDialog.type;
    }

    private get prependActions() {
        return this.$store.appMessageDialog.actions?.filter(a => typeof a !== "string" && !!a.prepend) || [];
    }

    private get actions() {
        return this.$store.appMessageDialog.actions?.filter(a => typeof a === "string" || !a.prepend) || [];
    }

    private extractActionValue(action: AppMessageDialogAction) {
        return (typeof action === "string" ? action : action.action) as AppMessageDialogAction;
    }

    private extractActionColor(action: AppMessageDialogAction) {
        const defaultColor = this.color || "primary";

        if(this.extractActionValue(action) === this.$store.appMessageDialog.defaultAction) {
            return defaultColor;
        }

        if(typeof action !== "string") {
            return action?.color || defaultColor;
        }

        return "";
    }

    private extractActionText(action: AppMessageDialogAction) {
        return typeof action === "string" ? {
            "ok": "OK",
            "yes": "Yes",
            "no": "No",
            "cancel": "Cancel",
            "save": "Save",
            "discard": "Discard",
            "delete": "Delete",
            "reset": "Reset",
            "abort": "Abort",
        }[action] : action.text;
    }

    private onAction(action: AppMessageDialogAction) {
        if(this.$store.appMessageDialog.resolve) {
            this.$store.appMessageDialog.resolve(this.extractActionValue(action));
        }
    }
}

</script>

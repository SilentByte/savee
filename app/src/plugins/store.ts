//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import Vue from "vue";

import { store } from "@/models/store";

declare module "vue/types/vue" {
    interface Vue {
        $store: typeof store;
    }
}

// noinspection JSUnusedGlobalSymbols
const VueGlobalStore = {
    install(vue: any): void {
        (vue.prototype as any).$store = Vue.observable(store);
    },
};

Vue.use(VueGlobalStore);

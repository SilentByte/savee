//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import Vue from "vue";

import { Store } from "@/models/store";

declare module "vue/types/vue" {
    interface Vue {
        $store: Store;
    }
}

// noinspection JSUnusedGlobalSymbols
const VueGlobalStore = {
    install(vue: any): void {
        (vue.prototype as any).$store = Vue.observable(new Store());
    },
};

Vue.use(VueGlobalStore);

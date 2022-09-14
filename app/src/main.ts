//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

import vuetify from "@/plugins/vuetify";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fontsource/quicksand";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount("#app");

<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-app v-if="!$store.isAppReady">
        <SplashView />
    </v-app>
    <v-app v-else-if="!$store.isUserAuthenticated">
        <AuthView />
    </v-app>
    <v-app v-else>
        <v-app-bar app dark hide-on-scroll
                   color="primary">
            <div class="d-flex align-center">
                <img height="24"
                     src="@/assets/brand.svg"
                     alt="Savee" />
            </div>

            <v-spacer />

            <v-btn icon disabled>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-menu offset-y
                    min-width="200">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                           v-bind="attrs"
                           v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="onToggleFullscreen">
                        <v-list-item-title>Toggle Fullscreen</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="about">
                        <v-list-item-title>About</v-list-item-title>
                    </v-list-item>

                    <v-divider />

                    <v-list-item @click="onSignOut">
                        <v-list-item-title>Sign Out</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-main>
            <v-fade-transition leave-absolute>
                <keep-alive>
                    <router-view />
                </keep-alive>
            </v-fade-transition>
        </v-main>

        <v-bottom-navigation app fixed grow>
            <v-btn text
                   to="discover"
                   color="primary"
                   height="100%">
                <span>Discover</span>

                <v-icon v-if="$route.name === 'discover'">mdi-compass</v-icon>
                <v-icon v-else>mdi-compass-outline</v-icon>
            </v-btn>

            <v-btn text
                   to="chat"
                   color="primary"
                   height="100%">
                <span>Chat</span>

                <v-icon v-if="$route.name === 'chat'">mdi-chat</v-icon>
                <v-icon v-else>mdi-chat-outline</v-icon>
            </v-btn>

            <v-btn text
                   to="pay"
                   color="primary"
                   height="100%">
                <span>Pay</span>

                <v-icon>mdi-currency-usd</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <AppNotificationSnackbar />
        <AppMessageDialog />
    </v-app>
</template>

<script lang="ts">

import {
    Component,
    Vue,
} from "vue-property-decorator";

import * as fullscreen from "@/modules/fullscreen";

import SplashView from "@/ui/views/SplashView.vue";
import AppMessageDialog from "@/ui/dialogs/AppMessageDialog.vue";
import AuthView from "@/ui/views/AuthView.vue";
import AppNotificationSnackbar from "@/ui/components/AppNotificationSnackbar.vue";

@Component({
    components: {
        AppNotificationSnackbar,
        AuthView,
        AppMessageDialog,
        SplashView,
    },
})
export default class App extends Vue {
    private onToggleFullscreen() {
        if(fullscreen.isFullscreen()) {
            fullscreen.tryExitFullscreen();
        } else {
            fullscreen.tryEnterFullscreen();
        }
    }

    private async onSignOut() {
        await this.$store.signOut();
    }

    mounted(): void {
        this.$store.initialize();
    }
}

</script>

<style lang="scss" scoped>

.route-title {
    margin-left: 30px;
    font-size: 16px;
    text-transform: uppercase;
}

</style>

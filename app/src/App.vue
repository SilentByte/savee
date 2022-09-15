<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-app>
        <v-app-bar app dark hide-on-scroll
                   color="primary">
            <div class="d-flex align-center">
                <img height="24"
                     src="@/assets/brand.svg"
                     alt="savee" />
            </div>

            <v-spacer />

            <v-btn icon>
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
                    <v-list-item to="about">
                        <v-list-item-title>About</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-main>
            <v-fade-transition leave-absolute>
                <router-view />
            </v-fade-transition>
        </v-main>

        <v-bottom-navigation app fixed grow mandatory>
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

    </v-app>
</template>

<script lang="ts">

import {
    Component,
    Vue,
} from "vue-property-decorator";

@Component
export default class App extends Vue {
    //
}

</script>

<style lang="scss">

@import "~@/styles/variables";

.route-title {
    margin-left: 30px;
    font-size: 16px;
    text-transform: uppercase;
}

</style>

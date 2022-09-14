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
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
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

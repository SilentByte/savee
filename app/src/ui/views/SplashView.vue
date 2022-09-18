<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container fluid
                 class="d-flex view align-center justify-center">
        <v-row class="d-flex align-center text-center">
            <v-col cols="12">
                <img src="@/assets/brand.svg"
                     alt="Savee" />
            </v-col>

            <v-col cols="12">
                <v-progress-linear indeterminate
                                   color="white" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">

import {
    Component,
    Vue,
} from "vue-property-decorator";

@Component
export default class SplashView extends Vue {
    //
}

</script>

<style lang="scss" scoped>

@import "~@/styles/variables";

.view {
    height: 100vh;
    padding: 60px;

    background-color: $primary-color;

    img {
        max-width: 200px;
    }
}

</style>

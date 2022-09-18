<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container class="view">
        <v-row dense class="mt-6 mb-12 text-center">
            <v-col cols="12">
                <h1>Hey There! 👋</h1>
            </v-col>

            <v-col cols="12">
                Savee is the new hub for shopping, selling, payments, and money transfers.
                Conveniently packaged in one Super App and powered by <a href="https://www.rapyd.net">Rapyd!</a>
            </v-col>

            <v-col cols="12"
                   class="my-6 px-0">
                <v-parallax src="@/assets/space_background.jpg">
                    <v-row align="center"
                           justify="center">
                        <v-col cols="12">
                            <v-img src="@/assets/hack_the_galaxy.png" />
                        </v-col>
                    </v-row>
                </v-parallax>
            </v-col>

            <v-col cols="12">
                This app has been created and submitted as our entry to the
                <a href="https://htg3.devpost.com">Hack The Galaxy III</a> hackathon by
                <a href="https://www.rapyd.net">Rapyd</a> hosted on <a href="https://htg3.devpost.com">Devpost</a>.
            </v-col>

            <v-col cols="12"
                   class="my-12 open-source">
                We
                <v-icon x-large color="primary">mdi-heart</v-icon>
                Open Source
            </v-col>

            <v-col cols="12">
                The source code of this application is publicly available on Github
                <a href="https://github.com/SilentByte/savee">@SilentByte</a> along with more information.
            </v-col>

            <v-col cols="12"
                   class="my-12 open-source">
                Get in Touch! 😊
            </v-col>

            <v-col cols="6">
                <v-btn dark x-large depressed block
                       class="text-none"
                       height="60"
                       color="#1da1f2"
                       href="https://twitter.com/RicoBeti"
                       target="_blank">
                    <v-icon left
                            size="24">
                        mdi-twitter
                    </v-icon>
                    @RicoBeti
                </v-btn>
            </v-col>

            <v-col cols="6">
                <v-btn dark x-large depressed block
                       class="text-none"
                       height="60"
                       color="#171515"
                       href="https://github.com/SilentByte"
                       target="_blank">
                    <v-icon left
                            size="24">
                        mdi-github
                    </v-icon>
                    @SilentByte
                </v-btn>
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
export default class AboutView extends Vue {
    //
}

</script>

<style lang="scss" scoped>

@import "~@/styles/variables";

.view {
    font-size: 18px;
    font-family: $fancy-font-family;

    a {
        font-weight: bold !important;
    }
}

.open-source {
    font-size: 28px;
}

</style>

<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container fluid
                 class="d-flex view align-center justify-center">
        <v-form v-model="form"
                @submit.prevent="onLogin">
            <v-row dense
                   class="d-flex align-center text-center">
                <v-col cols="12"
                       class="mb-6">
                    <img src="@/assets/brand.svg"
                         alt="Savee" />
                </v-col>

                <v-col cols="12">
                    <v-text-field solo hide-details required
                                  type="email"
                                  label="E-Mail"
                                  v-model="email"
                                  :rules="emailRules" />
                </v-col>
                <v-col cols="12">
                    <v-text-field solo hide-details required
                                  type="password"
                                  label="Password"
                                  v-model="password"
                                  :rules="passwordRules" />
                </v-col>

                <v-col cols="12"
                       class="mt-6">
                    <v-btn large block
                           type="submit"
                           :disabled="!form"
                           :loading="loading">
                        Log In
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script lang="ts">

import {
    Component,
    Vue,
} from "vue-property-decorator";

@Component
export default class AuthView extends Vue {
    private form = false;
    private email = "";
    private password = "";
    private loading = false;

    private emailRules = [
        (v: string) => !!v || "Please enter your email address",
        (v: string) => /.+@.+/.test(v) || "Please enter a valid E-Mail address",
    ];

    private passwordRules = [
        (v: string) => !!v || "Please enter your password",
        (v: string) => v.length <= 10 || "Name must be less than 10 characters",
    ];

    private async onLogin() {
        try {
            this.loading = true;

            // TODO: IMPLEMENT.
        } finally {
            this.loading = false;
        }
    }
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

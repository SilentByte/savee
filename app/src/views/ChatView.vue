<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container>
        <v-row>
            <v-col v-for="i in 20" :key="i" cols="12">
                CHAT {{ i }}
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
export default class ChatView extends Vue {
    //
}

</script>

<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container class="px-0">
        <div style="height: 1000px;">a</div>
        <v-row dense
               class="px-0">

            <v-lazy v-for="(f, feedIndex) in feed" :key="f.id"
                    :options="{
                        threshold: 0,
                        rootMargin: '100px 0px'
                    }"
                    min-height="200"
                    transition="fade-transition">
                <v-col cols="12"
                       class="px-0">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-toolbar flat dense
                                       class="px-1">
                                <v-avatar size="36">
                                    <v-img :src="f.provider.avatarUrl" />
                                </v-avatar>

                                <div class="ms-2 text-fancy">
                                    <strong>{{ f.provider.displayName }}</strong>
                                </div>
                            </v-toolbar>
                        </v-col>

                        <v-col cols="12">
                            <v-carousel show-arrows-on-hover
                                        hide-delimiter-background
                                        delimiter-icon="mdi-circle-medium"
                                        :continuous="false">
                                <v-carousel-item v-for="(photoUrl, photoIndex) in f.photoUrls" :key="photoIndex"
                                                 eager>
                                    <v-row class="fill-height"
                                           align="center"
                                           justify="center">
                                        <v-col cols="12">
                                            <v-img class="text-end"
                                                   :aspect-ratio="9/16"
                                                   :src="photoUrl">
                                                <v-chip small dark
                                                        class="mx-6 my-4 px-2 photo-counter"
                                                        color="#00000099">
                                                    {{ photoIndex + 1 }}/{{ f.photoUrls.length }}
                                                </v-chip>
                                            </v-img>
                                        </v-col>
                                    </v-row>
                                </v-carousel-item>
                            </v-carousel>
                        </v-col>

                        <v-col cols="12">
                            <v-toolbar flat dense
                                       class="px-1">
                                <v-btn large icon
                                       :color="f.isLiked ? 'primary' : ''"
                                       @click="onLike(f)">
                                    <v-icon v-if="f.isLiked">mdi-heart</v-icon>
                                    <v-icon v-else>mdi-heart-outline</v-icon>
                                </v-btn>

                                <div class="text-secondary">
                                    {{ formatLikeCounter(f) }}
                                </div>

                                <v-spacer />

                                <v-btn large icon
                                       :color="f.isBookmarked ? 'success' : ''"
                                       @click="onBookmark(f)">
                                    <v-icon v-if="f.isBookmarked">mdi-bookmark</v-icon>
                                    <v-icon v-else>mdi-bookmark-outline</v-icon>
                                </v-btn>

                                <v-btn depressed
                                       class="ms-2"
                                       color="primary">
                                    Buy
                                </v-btn>
                            </v-toolbar>
                        </v-col>

                        <v-col cols="12"
                               class="px-5 my-2">
                            <strong>{{ f.provider.displayName }}</strong>
                            {{ f.description }}
                        </v-col>

                        <v-col cols="12"
                               class="mt-6 mb-4 px-5">
                            <v-divider v-if="feedIndex < feed.length - 1" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-lazy>
        </v-row>
    </v-container>
</template>

<script lang="ts">

import {
    Component,
    Vue,
} from "vue-property-decorator";

import { IFeedItem } from "@server/models/api";

@Component
export default class DiscoverView extends Vue {
    private get feed() {
        return this.$store._feed;
    }

    private formatLikeCounter(item: IFeedItem) {
        return item.likeCounter === 1
            ? "1 like"
            : `${item.likeCounter} likes`;
    }

    private onLike(item: IFeedItem) {
        // TODO: IMPLEMENT / CONNECT TO DB.
        item.isLiked = !item.isLiked;
    }

    private onBookmark(item: IFeedItem) {
        // TODO: IMPLEMENT / CONNECT TO DB.
        item.isBookmarked = !item.isBookmarked;
    }
}

</script>

<style lang="scss">

.photo-counter {
    letter-spacing: 1px !important;
}

</style>

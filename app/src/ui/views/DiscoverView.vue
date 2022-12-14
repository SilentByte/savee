<!--
    SAVEE SUPER APP
    Copyright (c) 2022 SilentByte <https://silentbyte.com/>
-->

<template>
    <v-container class="px-0">
        <v-row dense
               class="px-0">

            <template v-for="(f, feedIndex) in feed">
                <v-col :key="f.id"
                       cols="12"
                       class="px-0">
                    <v-lazy min-height="100"
                            transition="fade-transition"
                            :options="{
                            threshold: 0,
                            rootMargin: '100px 0px'
                        }">
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

                                    <v-spacer />

                                    <div class="text-caption text-disabled">
                                        {{ formatFeedDate(f) }}
                                    </div>
                                </v-toolbar>
                            </v-col>

                            <v-col cols="12">
                                <v-carousel show-arrows-on-hover
                                            hide-delimiter-background
                                            delimiter-icon="mdi-circle-medium"
                                            :continuous="false">
                                    <v-carousel-item v-for="(contentUrl, photoIndex) in f.contentUrls" :key="photoIndex"
                                                     eager>
                                        <v-row no-gutters
                                               class="fill-height"
                                               align="center"
                                               justify="center">
                                            <v-col cols="12"
                                                   class="fill-height">
                                                <!--suppress HtmlUnknownAttribute -->
                                                <video v-if="isVideoUrl(contentUrl)"
                                                       autoplay muted loop playsinline
                                                       disablepictureinpicture disableremoteplayback
                                                       style="object-fit: fill"
                                                       width="100%"
                                                       height="100%"
                                                       :src="contentUrl" />

                                                <v-img v-else
                                                       class="text-end"
                                                       :aspect-ratio="9/16"
                                                       :src="contentUrl" />
                                            </v-col>

                                            <v-chip dark
                                                    style="position: absolute; top: 0; left: 0; min-width: 60px;"
                                                    class="mx-6 my-4 px-2 content-chip justify-center"
                                                    color="#d81b6099">
                                                {{ $format.money(f.currency, f.price) }}
                                            </v-chip>

                                            <v-chip small dark
                                                    style="position: absolute; top: 0; right: 0"
                                                    class="mx-6 my-4 px-2 content-chip"
                                                    color="#00000099">
                                                {{ photoIndex + 1 }}/{{ f.contentUrls.length }}
                                            </v-chip>
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

                                    <v-btn depressed rounded
                                           class="ms-2"
                                           color="primary"
                                           @click="onBuy">
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
                    </v-lazy>
                </v-col>

                <v-col v-if="feedIndex === 1" :key="`${f.id}-ad`"
                       cols="12"
                       class="px-0">
                    <v-row dense>
                        <v-col cols="12">
                            <v-parallax src="@/assets/space_background.jpg" height="240">
                                <v-row align="center"
                                       justify="center">
                                    <v-col cols="12">
                                        <v-img src="@/assets/hack_the_galaxy.png" />
                                    </v-col>
                                </v-row>

                                <v-chip small dark
                                        style="position: absolute; top: 0; right: 0"
                                        class="mx-6 my-4 px-2 content-chip"
                                        color="#d81b6099">
                                    Ad
                                </v-chip>
                            </v-parallax>
                        </v-col>
                        <v-col cols="12"
                               class="px-5 my-2">
                            <strong>Rapyd</strong>
                            Hack The Galaxy III is on it's way!
                            <a href="https://htg3.devpost.com" target="_blank">Click here to learn more and join!</a>
                        </v-col>
                        <v-col cols="12"
                               class="mt-6 mb-4 px-5">
                            <v-divider v-if="feedIndex < feed.length - 1" />
                        </v-col>
                    </v-row>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script lang="ts">

import { DateTime } from "luxon";

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

    private foo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    private isVideoUrl(url: string) {
        const videoExtensions = [
            ".avi",
            ".flv",
            ".mkv",
            ".mov",
            ".mp4",
            ".mpg",
            ".webm",
            ".wmv",
        ];

        for(const e of videoExtensions) {
            if(url.endsWith(e)) {
                return true;
            }
        }

        return false;
    }

    private formatFeedDate(item: IFeedItem) {
        return DateTime.fromISO(item.createdOn).toRelative();
    }

    private formatLikeCounter(item: IFeedItem) {
        const adjustedCounter = item.likeCounter + (item.isLiked ? 1 : 0);
        return adjustedCounter === 1
            ? "1 like"
            : `${adjustedCounter} likes`;
    }

    private onLike(item: IFeedItem) {
        item.isLiked = !item.isLiked;
    }

    private onBookmark(item: IFeedItem) {
        item.isBookmarked = !item.isBookmarked;
    }

    private onBuy() {
        this.$store.showMessageDialog({
            text: "This features is a work-in-progress! :-) Users will be able to purchase products in the app" +
                " using their Rapyd Wallet.",
            actions: ["ok"],
            defaultAction: "ok",
        });
    }
}

</script>

<style lang="scss" scoped>

.content-chip {
    letter-spacing: 1px !important;
}

</style>

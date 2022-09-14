//
// SAVEE SUPER APP
// Copyright (c) 2022 SilentByte <https://silentbyte.com/>
//

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import ChatView from "@/views/ChatView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        redirect: "/chat",
    },
    {
        path: "/chat",
        name: "chat",
        component: ChatView,
    },
    {
        path: "/feed",
        name: "feed",
        component: () => import(/* webpackChunkName: "feed" */ "@/views/FeedView.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

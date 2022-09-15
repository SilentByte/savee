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
        meta: {
            title: "Chat",
        },
    },
    {
        path: "/discover",
        name: "discover",
        component: () => import(/* webpackChunkName: "discover" */ "@/views/DiscoverView.vue"),
        meta: {
            title: "Discover",
        },
    },
    {
        path: "/pay",
        name: "pay",
        component: () => import(/* webpackChunkName: "pay" */ "@/views/PayView.vue"),
        meta: {
            title: "Pay",
        },
    },
    {
        path: "/about",
        name: "about",
        component: () => import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
        meta: {
            title: "About",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta?.title} | ${process.env.VUE_APP_TITLE}`;
    next();
});

export default router;

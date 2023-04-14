import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePageView.vue";
import UserPage from "@/views/UserPageView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/user/:userId",
        name: "UserPage",
        component: UserPage,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

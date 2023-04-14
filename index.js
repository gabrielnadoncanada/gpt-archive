import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import UserPage from "@/components/UserPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
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

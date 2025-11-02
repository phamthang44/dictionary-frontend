import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: () => import("../views/Dictionary.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import("../views/Statistics.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
    // children: [
    //   {
    //     path: "",
    //     component: () => import("../views/Son.vue")
    //   },
    //   {
    //     path: "son2",
    //     component: () => import("../views/Son2.vue")
    //   }
    // ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

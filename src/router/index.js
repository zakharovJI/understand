import Vue from 'vue'
import VueRouter from 'vue-router'
import Hot from "../views/Hot/Hot.vue";
import Authorization from "../views/Authorization/Authorization.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Hot
  },
  {
    path: '/authorization',
    component: Authorization
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router

import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import FormValidation from "../views/FormValidation.vue";
import ExampleTransition from "../views/ExampleTransition.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
    props: false
  },
  {
    props: true,
    path: "/event/:id",
    name: "event-show",
    component: EventShow
  },
  {
    path: "/form-validation",
    name: "form-validation",
    component: FormValidation
  },
  {
    path: "/example-transition",
    name: "example-transition",
    component: ExampleTransition
  },
  {
    path: "/404",
    name: "not-found",
    component: NotFound,
    props: true
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue
  },
  {
    path: "*",
    redirect: { name: "not-found", params: { resource: "page" } }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

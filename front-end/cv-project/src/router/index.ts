import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MainView from "../views/Main.vue";
import InspectView from "../views/Inspect.vue";
import EditView from "../views/Edit.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: MainView,
  },
  {
    path: "/inspect",
    name: "Inspect",
    component: InspectView,
  },
  {
    path: "/edit",
    name: "Edit",
    component: EditView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

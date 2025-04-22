import { createRouter, createWebHistory } from "vue-router";
import ProductsList from "@/views/ProductsList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Products",
      component: ProductsList,
    },
  ],
});

export default router;

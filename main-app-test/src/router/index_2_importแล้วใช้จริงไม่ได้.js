import { createWebHistory, createRouter } from "vue-router";

const newCustomer = () => import ("@/components/newCustomer.vue");
const showCustomer = () => import("@/components/showCustomer.vue");
const viewContent = () => import("@/components/viewContent.vue");
const productType = () => import("@/components/productType.vue");
const productBrand = () => import("@/components/productBrand.vue");
const productSize = () => import("@/components/productSize.vue");
const productStyle = () => import("@/components/productStyle.vue");
const productGrade = () => import("@/components/productGrade.vue");
const productFixcost = () => import("@/components/productFixcost.vue");
const page_404 = () => import("@/pages/page-404.vue");

//Vue.use(Router);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", components: viewContent},
    { path: "/showCustomer", component: showCustomer },
    { path: "/newCustomer", component: newCustomer },
    { path: "/productType", component: productType },
    { path: "/productBrand", component: productBrand },
    { path: "/productSize", component: productSize },
    { path: "/productStyle", component: productStyle },
    { path: "/productGrade", component: productGrade },
    { path: "/productFixcost", component: productFixcost },
    { path: "/:catchAll(.*)*", component: page_404},
  ],
  //linkActiveClass: "active",
})
export default router;
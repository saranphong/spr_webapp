import { createWebHistory, createRouter } from "vue-router";
import viewContent from "@/components/viewContent"
import showCustomer from "@/components/showCustomer"
import newCustomer from "@/components/newCustomer"
import productBrand from "@/components/productBrand"
import productFixcost from "@/components/productFixcost"
import productGrade from "@/components/productGrade"
import productSize from "@/components/productSize"
import productStyle from "@/components/productStyle"
import productType from "@/components/productType"
import importWork from "@/components/importWork"
// import importWork2 from "@/components/importWork2"
import listWork from "@/components/listWork"
import createProductList from "@/components/createProductList"
import page_404 from "@/pages/page-404"

const routes = [
  { path: "/", name: "viewContent", component: viewContent },
  { path: "/showCustomer", name: "showCustomer", component: showCustomer },
  { path: "/newCustomer", name: "newCustomer", component: newCustomer },
  { path: "/productBrand", name: "productBrand", component: productBrand },
  { path: "/productFixcost", name: "productFixcost", component: productFixcost },
  { path: "/productGrade", name: "productGrade", component: productGrade },
  { path: "/productSize", name: "productSize", component: productSize },
  { path: "/productStyle", name: "productStyle", component: productStyle },
  { path: "/productType", name: "productType", component: productType },
  { path: "/importWork", name: "importWork", component: importWork },
  // { path: "/importWork2", name: "importWork2", component: importWork2 },
  { path: "/listWork", name: "listWork", component: listWork },
  { path: "/createProductList", name: "createproductlist", component: createProductList },
  { path: "/:catchAll(.*)*", component: page_404 },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
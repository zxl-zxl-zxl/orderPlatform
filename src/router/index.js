import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import GoodsList from "@/views/GoodsList";
import Cart from "@/views/Cart";
import Address from "@/views/Address";
import OrderConfirm from "@/views/orderConfirm";
import OrderSuccess from "@/views/OrderSuccess";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: "/cart", 
      name: "Cart",
      component: Cart
    },
    {
      path: "/address", 
      name: "Address",
      component: Address
    },
    {
      path: "/orderConfirm", 
      name: "OrderConfirm",
      component: OrderConfirm
    },
    {
      path: "/orderSuccess", 
      name: "OrderSuccess",
      component: OrderSuccess
    },
    // {
    //   path: "/",
    //   name: "GoodsList",
    //   components: {
    //     default:GoodsList,
    //     title:Title,
    //     img:Image
    //   },
    //   children: [
    //     {
    //       path: "title",
    //       name: "title",
    //       component: Title
    //     },
    //     {
    //       path: "img",
    //       name: "img",
    //       component: Image
    //     }
    //   ]
    // },
    // {
    //   path: "/cart/:cartId", //动态路由
    //   name: "cart",
    //   component: Cart
    // }
  ]
});

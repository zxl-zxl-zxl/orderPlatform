import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import GoodsList from "@/views/GoodsList";
import Cart from "@/views/Cart";

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
    }
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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueLazyload from "vue-lazyload";
import infiniteScroll from "vue-infinite-scroll";
import Vuex from "vuex";

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: "/static/loading-svg/loading-bars.svg"
});
Vue.use(infiniteScroll);
Vue.use(Vuex);

// 建立store对象
const store = new Vuex.Store({
  state: {
    nickName: "", // 用户名
    cartCount: 0 // 购物车数量
  },
  mutations: {
    // 更改状态
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount) {
      state.cartCount += parseFloat(cartCount);
    },
    initCartCount(state, cartCount) {
      state.cartCount = cartCount;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store, // 使用store
  router,
  components: { App },
  template: "<App/>"
});

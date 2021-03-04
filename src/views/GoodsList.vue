<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a
            href="javascript:void(0)"
            class="default cur"
          >Default</a>
          <a
            href="javascript:void(0)"
            class="price"
            @click="sortGoods()"
          >Price <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg></a>
          <a
            href="javascript:void(0)"
            class="filterby stopPop"
            @click="showFilterPop"
          >Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div
            class="filter stopPop"
            id="filter"
            v-bind:class="{'filterby-show':filterBy}"
          >
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':priceChecked=='all'}"
                  @click="priceChecked='all'"
                >
                  All
                </a>
              </dd>
              <dd v-for="
                  (price,index)
                  in
                  priceFilter">
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':priceChecked==index}"
                  @click="setPriceFilter(index)"
                >
                  {{price.startPrice}}-{{price.endPrice}}
                </a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#">
                      <img
                        v-lazy="'/static/'+item.productImage"
                        alt=""
                      >
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(item.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
                <!-- <li>
                  <div class="pic">
                    <a href="#"><img
                        src="static/2.jpg"
                        alt=""
                      ></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">1000</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="pic">
                    <a href="#"><img
                        src="static/3.jpg"
                        alt=""
                      ></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">500</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="pic">
                    <a href="#"><img
                        src="static/4.jpg"
                        alt=""
                      ></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">2499</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                      >加入购物车</a>
                    </div>
                  </div>
                </li> -->
              </ul>
              <!-- 滚动加载插件 -->
              <div
                class="load-more"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="30"
              >
                <!-- 加载中... -->
                <img
                  v-show="loading"
                  src="./../assets/loading-spinning-bubbles.svg"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <!-- 说明：父组件传mdShow数据给子组件，监听子组件触发的close事件，然后调用closeModal方法 -->
    <!-- 未登录状态 -->
    <modal
      v-bind:mdShow="mdShow"
      v-on:close="closeModal"
    >
      <p slot="message">
        请先登录,否则无法加入到购物车中!
      </p>
      <div slot="btnGroup">
        <a
          class="btn btn--m"
          href="javascript:;"
          @click="mdShow = false"
        >关闭</a>
      </div>
    </modal>
    <!-- 登陆了 -->
    <modal
      v-bind:mdShow="mdShowCart"
      v-on:close="closeModal"
    >
      <p slot="message">
        <svg class="icon-status-ok">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#icon-status-ok"
          ></use>
        </svg>
        <span>加入购物车成!</span>
      </p>
      <div slot="btnGroup">
        <a
          class="btn btn--m"
          href="javascript:;"
          @click="mdShowCart = false"
        >继续购物</a>
        <router-link
          class="btn btn--m btn--red"
          href="javascript:;"
          to="/cart"
        >查看购物车</router-link>
      </div>
    </modal>

    <div
      class="md-overlay"
      v-show="overLayFlag"
      @click="closePop"
    ></div>
    <nav-footer></nav-footer>
  </div>
</template>

<style scoped>
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
<script>
import "../assets/css/base.css";
import "../assets/css/product.css";
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBread from "@/components/NavBread.vue";
import axios from "axios";
import Modal from "@/components/Modal.vue"; // 模态框
export default {
  data() {
    return {
      goodsList: [],
      priceFilter: [
        {
          startPrice: "0.00",
          endPrice: "100.00",
        },
        {
          startPrice: "100.00",
          endPrice: "500.00",
        },
        {
          startPrice: "500.00",
          endPrice: "1000.00",
        },
        {
          startPrice: "1000.00",
          endPrice: "5000.00",
        },
      ],
      priceChecked: "all",
      filterBy: false,
      overLayFlag: false,
      sortFlag: true,
      page: 1,
      pageSize: 8,
      busy: true,
      loading: false, // 往下滚动"加载图标"的出现效果:默认不出现
      mdShow: false, // 未登录的模态框是否显示
      mdShowCart: false, // 已登录的模态框是否显示
    };
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal,
  },
  mounted: function () {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked,
      };
      this.loading = true; // 请求前,往下滚动"加载图标"出现
      //{ params: param }传参
      axios.get("/goods/list", { params: param }).then((result) => {
        let res = result.data;
        console.log(res);
        this.loading = false; // 请求到数据,往下滚动"加载图标"消失
        if (res.status == "0") {
          if (flag) {
            this.goodsList = this.goodsList.concat(res.result.list); //请求的数据拼接
            if (res.result.count == 0) {
              this.busy = true; //禁用,不能再滚动请求了
            } else {
              this.busy = false; //启用,要变成可以滚动请求，下次再滚动还要发请求
            }
          } else {
            this.goodsList = res.result.list; //第一次请求的数据
            this.busy = false;
          }
        } else {
          this.goodsList = [];
        }
      });
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.closePop();
      this.page = 1;
      this.getGoodsList();
    },
    closePop() {
      this.filterBy = false;
      this.overLayFlag = false;
    },
    loadMore: function () {
      this.busy = true; // 禁用,滚动就禁用，防止下一个滚动
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true); // 滚动加载是累加数据，并不是只显示一页数据，so需要传参去请求数据的地方判断一下
      }, 500);
    },
    addCart(productId) {
      // 点击加入购物车
      axios
        .post("/goods/addCart", {
          // 接口设置在server/routes/goods.js
          productId: productId,
        })
        .then((res) => {
          var res = res.data;
          if (res.status == 0) {
            // alert("加入成功");
            this.mdShowCart = true; // 加入购物车成功，成功的模态框显示
            this.$store.commit('updateCartCount',1);
          } else {
            // alert("msg:" + res.msg);
            this.mdShow = true; // 未登录模态框显示
          }
        });
    },
    closeModal() {
      // 关闭模态框
      this.mdShow = false; // 未登录模态框消失
      this.mdShowCart = false; // 未登录模态框消失
    },
  },
};
</script>

<style scoped>
</style>

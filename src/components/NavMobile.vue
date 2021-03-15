<template>
  <!-- <div>hello</div> -->
  <div class="g-tabbar-fix">
    <div class="g-tabbar">
      <router-link
        :class="{'g-tabbar-item':true,'tabbar-alive':this.leftFlag}"
        to="/"
      >
        <i class="iconfont icon-home"></i>
        <span>首页</span>
      </router-link>
      <!-- <router-link
        class="g-tabbar-item"
        to="/category"
      >
        <i class="iconfont icon-category"></i>
        <span>分类页</span>
      </router-link>
      <router-link
        class="g-tabbar-item"
        to="/cart"
      >
        <i class="iconfont icon-cart"></i>
        <span>购物车</span>
      </router-link> -->
      <router-link
         :class="{'g-tabbar-item':true,'tabbar-alive':this.rightFlag}"
        to="/orderList"
      >
        <i class="iconfont icon-personal dingdan"></i>
        <span>我的订单</span>
      </router-link>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Tabbar",
  data(){
    return{
      leftFlag:false,
      rightFlag:false
    }
  },
  mounted(){
    //根据路由url定义底部导航栏alive样式
    if(this.$route.path=='/'){
      this.leftFlag=true
    }else if(this.$route.path=='/orderList'){
      this.rightFlag=true
    }
  }
};
</script>
<style scoped>
.g-tabbar-fix {
  position: relative;
}
.g-tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 50px;
  background: #fff;
}
.g-tabbar-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #333;
  font-size: 12px;
}
.iconfont {
  margin-bottom: 4px;
  font-size: 18px;
}
/* .router-link-active {
  color: red;
} */
.tabbar-alive{
  color: red;
}
</style>

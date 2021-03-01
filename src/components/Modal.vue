<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-top">
            <button class="md-close" @click="closeModal">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>
<style>

</style>
<script>
// mdShow是父组件传过来的数据，控制模态框是否显示
// 关闭模态框时，触发close方法，与父组件进行通信，告诉它要关闭模态框
    export default{
        props:["mdShow"],// 接收父组件传过来的mdShow
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods:{
          // 关闭模态框
          closeModal(){
            this.$emit("close");
          }
        }
    }
</script>

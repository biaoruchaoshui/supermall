<!-- 封装土司组件 -->
<template>
  <div class="toast"  v-show="isShow">
     <div> {{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data () {
      return {
        message: '',
        isShow: false
      };
    },
    props: {
        // message: {
        //     type: String,
        //     default: ''
        // },
        // show: {
        //     type: Boolean,
        //     default: false
        // },
    },
    components: {},
 
    computed: {},
 
    mounted() {},
 
    methods: {
      show(message = '默认文字', druation= 2000) {
        this.isShow = true;
        this.message = message;
        
        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        }, druation)
      }
    }
 }
 
</script>
<style scoped>
  .toast {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 8px 10px;
      color: #ffffff;
      background-color: rgba(0, 0, 0, .6);
      z-index: 999;
  }
</style>
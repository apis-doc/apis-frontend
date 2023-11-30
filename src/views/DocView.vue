<template>
    <div>
      <router-view/>
      <div class="top">
        <div class="top-info">
          <el-alert
            title="接口文档页: 暂时没有显示呢"
            type="info">
          </el-alert>
        </div>
      </div>
      <div class="content">
      </div>
    </div>
  </template>
  <script>
  
  export default {
    data () {
      return {}
    }
  }
  </script>
  
  <style scoped>
  .top-action {
    padding: 20px 20px 0px 20px;
    text-align: left;
  }
  
  .content {
    padding: 0px 20px 10px 20px;
    position: relative;
  
    .pager {
      position: absolute;
      buttom: 0;
      right: 20px;
      padding: 10px 0px 10px 0px;
    }
  }
  </style>
  
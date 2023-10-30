<script>
export default {
  data () {
    return {}
  }
}
</script>

<template>
  <div class="header-container">
    <div class="l-content">
      header-left
    </div>
    <div class="r-content">
      <el-row>
        <el-button type="info" plain>我</el-button>
        <el-button type="warning" plain>退出</el-button>
      </el-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background: #333;
  color: #fff;
}
</style>

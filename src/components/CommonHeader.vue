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
    </div>
    <div class="r-content">
      <!--设置为一行-->
      <el-row>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../../src/assets/user.jpg" alt="" class="user-image">
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- todo 具体的操作-->
            <el-dropdown-item>基本信息</el-dropdown-item>
            <el-dropdown-item disabled>配置信息</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--        <el-button type="warning" plain>退出</el-button>-->
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

  .user-image {
    padding: 0 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%; // 圆边
  }
}
</style>

<template>
  <div>

   <el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <nav>
      <router-link to="/vue">Vue</router-link> |
      <router-link to="/main/user">User</router-link> |
      <router-link to="/main">Main</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    </el-footer>
  </el-container>
</el-container>
  </div>
</template>

<script setup>

</script>

<style scoped>
.el-header {
    background-color: #e7ca93;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
.el-footer {
    background-color: #e7ca93;
    color: #333;
    text-align: center;
    line-height: 20px;
}

  .el-aside {
    background-color: #9ac2ee;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #f1f3f5;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

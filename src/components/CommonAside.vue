<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose"
           :collapse="isCollapse"
           background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
  >
    <h3>接口管理系统</h3>
    <!--没有子项的菜单-->
    <el-menu-item index="2">
      <!-- 图标 -->
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <!-- 含子类菜单-->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item-group>
        <span slot="title">个人信息</span>
        <el-menu-item index="2.1.1">
          <i class="el-icon-user"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>
        <el-menu-item index="2.1.2">
          <i class="el-icon-setting"></i>
          <span slot="title">配置信息</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <!--仅展示所有用户的信息,不能包含密码,但可以包含邮箱; 也没有增加/删除;-->
        <span slot="title">更多用户</span>
        <el-menu-item index="2.2.1">
          <i class="el-icon-more-outline"></i>
          <span slot="title">更多用户</span>
        </el-menu-item>
      </el-menu-item-group>
      <!--      <el-submenu index="2-1">-->
      <!--        <span slot="title">个人信息</span>-->
      <!--        <el-menu-item index="2-1-1">-->
      <!--          <i class="el-icon-user"></i>-->
      <!--          <span slot="title">基本信息</span>-->
      <!--        </el-menu-item>-->
      <!--        <el-menu-item index="2-1-2">-->
      <!--          <i class="el-icon-setting"></i>-->
      <!--          <span slot="title">配置信息</span>-->
      <!--        </el-menu-item>-->
      <!--      </el-submenu>-->
      <!--      <el-menu-item index="2-2">-->
      <!--        <i class="el-icon-more-outline"></i>-->
      <!--        <span slot="title">更多用户</span>-->
      <!--      </el-menu-item>-->
    </el-submenu>
    <el-menu-item index="3">
      <!-- 图标 -->
      <i class="el-icon-s-claim"></i>
      <span slot="title">项目管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <!-- 图标 -->
      <i class="el-icon-link"></i>
      <span slot="title">接口管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <!-- 图标 -->
      <i class="el-icon-s-order"></i>
      <span slot="title">日志管理</span>
    </el-menu-item>
  </el-menu>
</template>
<!--当前页面覆盖所有样式-->
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;

  h3 {
    color: rgb(255, 255, 255);
  }
}
</style>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

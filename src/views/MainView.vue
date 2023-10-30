<template>
  <div>

    <el-container>
      <el-aside width="200px">
        <!--  引用组件  -->
        <common-aside/>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>
          <nav>
            <router-link to="/vue">Vue</router-link>
            |
            <router-link to="/main/user">User</router-link>
            |
            <router-link to="/main">Main</router-link>
            |
            <router-link to="/about">About</router-link>
          </nav>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'

export default {
  data () {
    return {}
  },
  components: {
    CommonAside
  }
}

</script>

<style>
</style>

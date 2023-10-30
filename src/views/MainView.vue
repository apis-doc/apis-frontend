<template>
  <div>

    <el-container>
      <el-aside width="200px">
        <!--  引用组件  -->
        <common-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <common-header/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>
          <nav>
            <router-link to="/vue">Vue</router-link>
            |
            <a href="https://element.eleme.cn/#/zh-CN/component/menu"> element-ui</a>
            |
            <a href="https://less.bootcss.com/"> less-css</a>
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
import CommonHeader from '@/components/CommonHeader.vue'

export default {
  data () {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader
  }
}

</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}

a {
  color: #777;
}
</style>

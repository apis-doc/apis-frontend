<script>
import { deleteData, handleResponse, redirectPage, clearCookies } from '@/api/common'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      welcome: Cookie.get('username') + ', 欢迎您!'
    }
  },
  methods: {
    handleCommand (action) {
      console.log(action)
      if (action !== 'logout') {
        return redirectPage(action, this.$router, true)
      }
      deleteData('/auth', {}).then((responseData) => {
        const rsp = handleResponse(responseData, true)
        if (!rsp.result) {
          return console.log('logout fail: ', rsp.errCode, rsp.msg)
        }
        // 获取所有cookie的名字
        clearCookies()
        this.$router.push('/')
      })
    }
  },
  mounted () {
    if (!Cookie.get('username')) {
      redirectPage('/', this.$router, false)
    }
  }
}
</script>

<template>
  <div class="header-container">
    <div class="l-content">
      <h5>{{ welcome }}</h5>
    </div>
    <div class="r-content">
      <!--设置为一行-->
      <el-row>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="../../src/assets/user.jpg" alt="" class="user-image">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="me">基本信息</el-dropdown-item>
            <el-dropdown-item disabled command="user-config">配置信息</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出</el-dropdown-item>
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

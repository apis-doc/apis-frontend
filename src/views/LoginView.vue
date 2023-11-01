<template>
  <div class="login-container">
    <div class="lg-title" style="height: 20%">
    </div>
    <div>
      <template>
        <el-alert
          title="接口管理系统"
          type="success" :closable=false center
        >
        </el-alert>
      </template>
      <el-form ref="form" :model="form" label-width="80px" class="login-form">
        <h3 class="login-title">
          登录
        </h3>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button
            plain
            @click="createInfo">
            新建用户
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postData, handleResponse, getData } from '../api/common'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      form: {
        username: '111111',
        password: '111111'
      }
    }
  },
  methods: {
    onSubmit () {
      postData('/auth', this.form).then((responseData) => {
        const rspLogin = handleResponse(responseData)
        if (!rspLogin.result) {
          return this.$notify.error({
            title: '登录失败',
            message: rspLogin.msg
          })
        }
        // 获取用户信息等
        getData('/auth', {}).then((responseData) => {
          const rspInfo = handleResponse(responseData)
          if (!rspInfo.result) {
            return this.$notify.error({
              title: '获取用户信息失败',
              message: rspInfo.msg
            })
          }
          const userInfo = rspInfo.data.user
          console.log(userInfo)
          Cookie.set('username', userInfo.username)
          Cookie.set('userInfo', JSON.stringify(userInfo))
          // todo 映射关系怎么办
          this.$router.push('/api-manage/home')
        })
      })
    },
    createInfo () {
      const h = this.$createElement
      this.$notify({
        title: '新建用户',
        message: h('i', { style: 'color: teal' }, '该网站属于内部网站, 可联系管理员分配用户')
      })
    }
  }
}
</script>
<style lang="less" scoped>

.el-alert {
  margin: 200px 55% 100px 20%;
  width: auto;
  padding: 20px 16px;
  border-radius: 15px;
}

.login-form {
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  padding: 30px 50px 30px 40px;
  width: 30%;
  //margin: 20% auto;
  margin: 0px auto 20%;

  .login-title {
    padding: 5px 0px 18px 0px;
  }
}
</style>

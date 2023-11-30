<template>
  <div class="login-container">
    <div class="lg-title" style="height: 10%">
      <template>
        <el-alert
          title="接口管理系统"
          type="success" :closable=false center dark
        >
        </el-alert>
      </template>
    </div>
    <div class="lg-content" style="display: flex; margin-top: 100px">
      <div class="block display-img" style="width: 65%; padding: 0px 30px 0px 80px">
        <el-carousel height="800px">
          <el-carousel-item>
            <img src="../../src/assets/查看.png" alt="查看" class="lbt-image"
                 style="width: 100%; height: 100%">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../src/assets/新增.png" alt="新增" class="user-image" style="width: 100%; height: 100%">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../src/assets/基本信息.png" alt="補充基本信息" class="user-image"
                 style="width: 100%; height: 100%">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../src/assets/䑦見請求和返回.png" alt="" class="user-image" style="width: 100%; height: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="lg-form-right" style="width: 35%; margin-top: 150px">
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
          // 设置cookie
          const userInfo = rspInfo.data.user
          console.log(userInfo)
          Cookie.set('username', userInfo.username)
          Cookie.set('userInfo', JSON.stringify(userInfo))
          // 保存映射关系
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
  margin: 0px 0px 30px 0px;
  width: auto;
  padding: 20px 16px;
  border-radius: 15px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.login-form {
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  padding: 30px 50px 30px 0px;
  width: 60%;
  margin: 0px 20px 30px 40px;

  .login-title {
    padding: 5px 0px 18px 0px;
  }
}
</style>

<template>
  <div>
    <router-view/>
    <div class="top">
      <div class="top-info">
        <el-alert
          title="个人信息页"
          type="info">
        </el-alert>
      </div>
    </div>
    <div class="myInfo">
      <el-form ref="form" :model="userData" label-width="80px" class="infoForm">
        <el-form-item label="用户名">
          <el-input disabled v-model="userData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-butten>{{ userData.first_name }} {{ userData.last_name }}</el-butten>
        </el-form-item>
        <el-form-item label="姓">
          <el-input v-model="userData.first_name" placeholder="请输入您的姓氏"></el-input>
        </el-form-item>
        <el-form-item label="名">
          <el-input v-model="userData.last_name" placeholder="请输入您的名字"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userData.email" placeholder="请输入您的邮箱以便进行关于接口讨论"></el-input>
        </el-form-item>
        <el-form-item label="使用状态">
          <el-switch
            v-model="userData.is_active" disabled
            active-color="#13ce66" inactive-color="#ff4949"
            active-text="使用中" inactive-text="未使用">
          </el-switch>
        </el-form-item>
        <el-form-item label="加入时间">
          <el-input disabled v-model="userData.date_joined"></el-input>
        </el-form-item>
        <el-form-item label="上次登录">
          <el-input disabled v-model="userData.last_login"></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <!--  保存按钮: 弹出重要信息确认弹框, 点击确定保存-->
          <el-button type="primary" @click="dialogVisible = true" class="saveBtn">保存</el-button>
          <el-dialog title="确认更新个人信息?" :visible.sync="dialogVisible" width="30%">
            <span>邮箱: {{ userData.email }}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="onSave">确 定</el-button>
            </span>
          </el-dialog>
          <!--修改密码-->
          <el-button type="primary" @click="dialogFormVisible = true" class="changeBtn">修改密码</el-button>
          <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="pwdForm">
              <el-form-item label="原密码" :label-width="formLabelWidth">
                <el-input v-model="pwdForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="pwdForm.new" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="changePwd">确 定</el-button>
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getData, handleResponse, putView } from '@/api/common'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      // formLabelWidth: '80px',
      userData: {},
      pwdForm: {}
    }
  },
  methods: {
    onSave () {
      console.log('===> saved!!!')
      putView('user', this, this.userData)
      this.dialogVisible = false
    },
    changePwd () {
      console.log('===> changed!!!')
      putView('auth', this, this.pwdForm)
      this.dialogFormVisible = false
    },
    getUserInfo () {
      const user = JSON.parse(Cookie.get('userInfo'))
      getData('user', { id: user.id }).then((response) => {
        const rspInfo = handleResponse(response, true)
        if (!rspInfo.result || rspInfo.data.show_info.length < 1) {
          this.$router.push('/')
          return this.$notify.error({
            title: '查询失败',
            message: rspInfo.msg
          })
        }
        this.userData = rspInfo.data.show_info[0]
        console.log(this.userData)
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}

</script>

<style scoped>

.infoForm {
  text-align: left;
  width: 50%;
  margin: 30px 20px 40px 50px;
}

.buttons {

  .saveBtn, .changeBtn {
    margin: auto 0px 0px 20px;
    float: right;
  }
}

</style>

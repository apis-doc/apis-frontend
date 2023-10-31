<template>
  <div>
    <router-view/>
    <div>
      <div class="top-info">
        <el-alert
          title="更多用户: 您可以在此处查询或筛选项目或接口的维护人姓名,联系方式等内容"
          type="info">
        </el-alert>
      </div>
      <div class="top-action">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="formInline.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="是否激活">
            <el-switch v-model="formInline.is_active"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--    todo 传参-->
    <div class="content">
      <div class="common-table">
        <el-table
          :data="tableData"
          border resizable stripe
          style="width: 100%">
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            label="姓名"
            width="180">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="is_active" width="120"
            :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]" :filter-method="filterTag"
            label="是否激活">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.is_active === '是' ? 'primary' : 'danger'"
                disable-transitions>{{ scope.row.is_active }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="date_joined"
            label="加入时间">
          </el-table-column>
          <el-table-column
            prop="last_login"
            label="上次登录时间">
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="40" :pager-count="5" :current-page="2">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        name: '',
        username: '',
        is_active: true
      },
      tableData: [{
        username: '111111',
        email: '33298909090@qq.com',
        is_active: '是',
        date_joined: '2016-05-02',
        last_login: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        username: '111111',
        email: '33298909090@qq.com',
        is_active: '是',
        date_joined: '2016-05-02',
        last_login: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        username: '111111',
        email: '33298909090@qq.com',
        is_active: '否',
        date_joined: '2016-05-02',
        last_login: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        username: '111111',
        email: '33298909090@qq.com',
        is_active: '是',
        date_joined: '2016-05-02',
        last_login: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    // tableRowClassName ({
    //   row
    // }) {
    //   // eslint-disable-next-line camelcase
    //   if (row.is_active === '否') {
    //     return 'warning-row'
    //   }
    //   return ''
    // },
    indexMethod (index) {
      return index + 1
    },
    onSubmit () {
      console.log('submit!')
    },
    filterTag (value, row) {
      return row.is_active === value
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: #fde6e8;
}

.el-table .success-row {
  background: #f0f9eb;
}

.top-action {
  padding: 10px 0px 10px 0px;
  float: left;
}

.content {
  position: relative;

  .pager {
    position: absolute;
    buttom: 0;
    right: 20px;
    padding: 10px 0px 10px 0px;
  }
}
</style>

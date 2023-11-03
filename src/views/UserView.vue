<template>
  <div>
    <router-view/>
    <div class="top">
      <div class="top-info">
        <el-alert
          title="更多用户: 您可以在此处查询或筛选项目或接口的维护人姓名,联系方式等内容"
          type="info">
        </el-alert>
      </div>
      <div class="top-action">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <el-form-item label="用户名">
            <el-input v-model="formInline.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="是否激活">
            <el-switch v-model="formInline.is_active"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
              <el-tag size="medium">{{ scope.row.first_name }}{{ scope.row.last_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="is_active" width="120"
            :filters="[{ text: '是', value: true}, { text: '否', value: false }]" :filter-method="filterTag"
            label="是否激活">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.is_active === '是' ? 'primary' : 'danger'"
                disable-transitions>{{ scope.row.is_active ? '是' : '否' }}
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
          @current-change="handleCurrentChange"
          :total="pageConfig.total" :page-size="pageConfig.size" :current-page="pageConfig.current">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getView } from '@/api/common'
// import { handleResponse, getData, getView } from '@/api/common'

const formInit = {
  name: '',
  username: '',
  is_active: true
}

export default {
  data () {
    return {
      pageConfig: {
        size: 10,
        total: 0,
        current: 1
      },
      formInline: Object.assign({}, formInit),
      tableData: []
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    filterTag (value, row) {
      return row.is_active === value
    },
    resetForm (formName) {
      this.formInline = Object.assign({}, formInit)
    },
    onSubmit () {
      this.search()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageConfig.current = val
      this.search()
    },
    search () {
      getView('user', this, this.formInline, this.pageConfig)
    }
  },
  mounted () {
    this.search()
  }
}
</script>

<style scoped>

.top-action {
  padding: 20px 20px 0px 20px;
  text-align: left;
}

.content {
  padding: 0px 20px 10px 20px;
  position: relative;

  .pager {
    position: absolute;
    buttom: 0;
    right: 20px;
    padding: 10px 0px 10px 0px;
  }
}
</style>

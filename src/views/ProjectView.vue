<template>
  <div>
    <router-view/>
    <div class="top">
      <div class="top-info">
        <el-alert
          title="项目管理: 您于此处查询某项目下接口并生成接口文档"
          type="success">
        </el-alert>
      </div>
      <div class="top-action">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <el-form-item label="编码">
            <el-input v-model="formInline.code" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formInline.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="维护人">
            <el-input v-model="formInline.maintainer" placeholder="请输入维护人用户名"></el-input>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="formInline.host" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
            <!--     修改和新增表单       -->
            <el-button type="danger" @click="onAdd">新增</el-button>
            <el-dialog title="编辑项目" :visible.sync="dialogFormVisible">
              <el-form :model="dialogForm" class="addForm">
                <el-form-item label="编码" :label-width="formLabelWidth">
                  <el-input v-model="dialogForm.code" placeholder="请输入英文名称"></el-input>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="dialogForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="IP" :label-width="formLabelWidth">
                  <el-input v-model="dialogForm.host" placeholder="请输入绑定的IP"></el-input>
                </el-form-item>
                <el-form-item label="端口" :label-width="formLabelWidth">
                  <el-input v-model="dialogForm.port" placeholder="请输入测试服务绑定的端口"></el-input>
                </el-form-item>
                <el-form-item label="维护人" :label-width="formLabelWidth">
                  <el-input v-model="dialogForm.maintainer" placeholder="请输入维护人"></el-input>
                </el-form-item>
              </el-form>
              <!--     新增表单的确认按钮         -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
              </div>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="common-table">
        <el-table
          :data="tableData" ref="tableData"
          border resizable stripe
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="加密方式">
                  <el-tag>{{ props.row.encrypt_mode }}</el-tag>
                </el-form-item>
                <el-form-item label="签名方式">
                  <el-tag type="success">{{ props.row.sign_mode }}</el-tag>
                </el-form-item>
                <el-form-item label="备注">
                  <el-tag>{{ props.row.note }}</el-tag>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="code"
            label="编码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="host" label="IP"
            width="180">
          </el-table-column>
          <el-table-column
            prop="port" label="端口"
            width="180">
          </el-table-column>
          <el-table-column
            prop="create_by" label="创建人"
            width="180">
          </el-table-column>
          <el-table-column
            label="维护人" prop="maintainer"
            width="100">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="onEdit(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleSearchApiById(scope.row.id)" type="text" size="small">查询接口</el-button>
              <el-button @click="handleGetDocs(scope.row)" type="text" size="small">生成接口文档</el-button>
            </template>
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
import { getView, redirectPage, postView, putView } from '@/api/common'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      formInline: {},
      tableData: [],
      pageConfig: {
        size: 10,
        total: 0,
        current: 1
      },
      dialogFormVisible: false,
      dialogForm: {},
      isAddOfBtn: 1,
      formLabelWidth: '120px'
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    filterMethod (value, row) {
      return row.method === value
    },
    resetForm (formName) {
      this.formInline = Object.assign({}, {})
    },
    onSearch () {
      this.search()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageConfig.current = val
      this.search()
    },
    handleSearchApiById (id) {
      console.log('redirect to api from project!!!')
      Cookie.set('idWithProjectToApi', id)
      redirectPage('api', this.$router, true)
    },
    search () {
      getView('project', this, this.formInline, this.pageConfig)
    },
    // 新增按钮事件
    onAdd () {
      console.log('add button!')
      this.isAddOfBtn = 1
      this.dialogFormVisible = true
      this.dialogForm = {}
      this.dialogForm.maintainer = Cookie.get('username')
    },
    // 编辑按钮事件
    onEdit (row) {
      console.log('edit button!')
      this.isAddOfBtn = 0
      this.dialogFormVisible = true
      this.dialogForm = Object.assign({}, row)
      this.dialogForm.maintainer = this.dialogForm.maintainer || Cookie.get('username')
    },
    // 编辑和新增表单内的确定事件
    onSubmit () {
      console.log('submit button!', this.isAddOfBtn, this.dialogForm)
      if (this.isAddOfBtn) {
        postView('project', this, this.dialogForm, this.search)
      } else {
        putView('project', this, this.dialogForm, this.search)
      }
      this.dialogFormVisible = false
    }
  },
  mounted () {
    this.search()
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: #fde6e8;
}

.el-table .success-row {
  background: #f0f9eb;
}

.top-action {
  padding: 20px 20px 0px 20px;
  text-align: left;
}

.content {
  padding: 0px 20px 10px 20px;
  position: relative;

  .el-tag {
    white-space: normal;
    height: auto;
  }

  .pager {
    position: absolute;
    buttom: 0;
    right: 20px;
    padding: 10px 0px 10px 0px;
  }

  .addForm {
    .el-form-item__content {
      margin: 10px 0px 0px 0px;
    }
  }
}
</style>

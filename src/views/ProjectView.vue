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
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
            <el-button type="danger" @click="onSubmit">新增</el-button>
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
              <el-button @click="handleGetDocs(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleSearch(scope.row.id)" type="text" size="small">查询接口</el-button>
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
import { getView } from '@/api/common'

export default {
  data () {
    return {
      formInline: {},
      tableData: [],
      pageConfig: {
        size: 10,
        total: 0,
        current: 1
      }
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
    onSubmit () {
      this.search()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageConfig.current = val
      this.search()
    },
    search () {
      getView('project', this, this.formInline, this.pageConfig)
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
  padding: 10px 0px 10px 0px;
  text-align: left;
}

.content {
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
}
</style>

<template>
  <div>
    <router-view/>
    <div class="top">
      <div class="top-info">
        <el-alert
          title="日志管理: 您可查询端侧接口调用信息, 并于此处选择某条记录为某项目的接口"
          type="success">
        </el-alert>
      </div>
      <div class="top-action">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <el-form-item label="路由(uri)">
            <el-input v-model="formInline.path" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="接口标识(method)">
            <el-input v-model="formInline.interface_id" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="状态码">
            <el-input v-model="formInline.status_code" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="请求类型">
            <el-input v-model="formInline.method" placeholder="请输入内容"></el-input>
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
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="请求示例">
                  <el-tag>{{ props.row.req }}</el-tag>
                </el-form-item>
                <el-form-item label="返回示例">
                  <el-tag type="success">{{ props.row.rsp }}</el-tag>
                </el-form-item>
                <el-form-item label="异常信息">
                  <el-tag type="danger">{{ props.row.err }}</el-tag>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="path"
            label="uri"
            width="180">
          </el-table-column>
          <el-table-column
            prop="interface_id"
            label="method-接口标识"
            width="180">
          </el-table-column>
          <el-table-column
            label="接口类型" prop="api_type"
            width="100">
          </el-table-column>
          <el-table-column
            width="100"
            :filters="[{ text: 'GET', value: 'GET' }, { text: 'POST', value: 'POST' }, { text: 'DELETE', value: 'DELETE' }, { text: 'PUT', value: 'PUT' }]"
            :filter-method="filterMethod"
            label="请求类型">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.method }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="content_type" label="请求体类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status_code" width="80"
            label="状态码">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status_code === 200 ? 'success' : 'warning'"
                disable-transitions>{{ scope.row.status_code }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">新增接口</el-button>
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
      getView('req_log', this, this.formInline, this.pageConfig)
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
}
</style>

<template>
  <div>
    <router-view/>
    <div class="top">
      <div class="top-info">
        <el-alert
          title="接口管理: 您可以查看/修改某接口的详情; 请移至日志管理页新增接口; 接口文档请于项目管理页查看;"
          type="error">
        </el-alert>
      </div>
      <div class="top-action">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
          <el-form-item label="uri">
            <el-input v-model="formInline.path" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="接口名称">
            <el-input v-model="formInline.code" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="所属项目">
            <el-select v-model="formInline.method" placeholder="所属项目">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.state" placeholder="状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口类型">
            <el-select v-model="formInline.api_type" placeholder="接口类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求类型">
            <el-select v-model="formInline.method" placeholder="请求类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="method">
            <el-input v-model="formInline.interface_id" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col :span="11">
              <el-form-item prop="update_time">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.update_time"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="update_time">
                <el-time-picker placeholder="选择时间" v-model="formInline.update_time"
                                style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="11">
              <el-form-item prop="create_time">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.create_time"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="create_time">
                <el-time-picker placeholder="选择时间" v-model="formInline.create_time"
                                style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
            <el-button type="danger" @click="addApi">新增接口</el-button>
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
                <el-form-item label="描述">
                  <el-tag>{{ props.row.describe }}</el-tag>
                </el-form-item>
                <el-form-item label="注意项">
                  <el-tag type="warning">{{ props.row.Attentions }}</el-tag>
                </el-form-item>
                <el-form-item label="请求示例">
                  <el-tag type="success">{{ props.row.req_example }}</el-tag>
                </el-form-item>
                <el-form-item label="返回示例">
                  <el-tag type="error">{{ props.row.rsp_example }}</el-tag>
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
            prop="path"
            label="uri"
            width="180">
          </el-table-column>
          <el-table-column
            prop="interface_id"
            label="接口标识"
            width="180">
          </el-table-column>
          <el-table-column
            prop="api_name" label="接口名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="content_type" label="请求体类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="is_login" width="80"
            label="是否登录">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.is_login ? 'warning' : 'success'"
                disable-transitions>{{ scope.row.is_login ? '是' : '否' }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- todo: api_type, method, state-->
          <el-table-column
            prop="require_auth" label="权限"
            width="180">
          </el-table-column>
          <el-table-column
            prop="version" label="版本"
            width="80">
          </el-table-column>
          <!--          state-->
          <el-table-column
            label="维护人" prop="maintainer"
            width="100">
          </el-table-column>
          <el-table-column
            label="创建人" prop="create_by"
            width="100">
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleSearch(scope.row.id)" type="primary" size="small">修改</el-button>
              <el-button @click="handleGetDocs(scope.row)" type="primary" size="small">查看</el-button>
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
import { getView, redirectPage } from '@/api/common'
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
    addApi () {
      redirectPage('log', this.$router, true)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageConfig.current = val
      this.search()
    },
    search () {
      getView('api', this, this.formInline, this.pageConfig)
    }
  },
  mounted () {
    // To be upgraded: 注意从项目页跳过来需要从cookie获取owner_id
    const cName = 'idWithProjectToApi'
    const pidRedirectFromProject = Cookie.get(cName)
    Cookie.remove(cName)
    console.log('idWithProjectToApi: ', pidRedirectFromProject)
    this.formInline.owner_id = pidRedirectFromProject || this.formInline.owner_id
    this.search()
    this.formInline.owner_id = null
  }
}
</script>

<style scoped>

.top-action {
  padding: 20px 20px 0px 20px;
  text-align: left;
}

.content {
  padding: 10px 20px 10px 20px;
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

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
            <el-select v-model="formInline.owner_id" placeholder="所属项目">
              <el-option v-for="item in this.projects" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.apiState" clearable placeholder="请选择">
              <el-option v-for="item in this.apiState" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口类型">
            <el-select v-model="formInline.api_type" placeholder="接口类型">
              <el-option v-for="item in this.apiType" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求类型">
            <el-select v-model="formInline.method" placeholder="请求类型">
              <el-option v-for="item in this.methodType" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="method">
            <el-input v-model="formInline.api_method" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!--    todo: transfer params    -->
          <el-form-item label="更新时间">
            <div class="block">
              <el-date-picker value-format="yyyy-MM-dd hh:mm:ss"
                              v-model="formInline.update_time"
                              type="datetimerange" formatter=""
                              align="right"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['12:00:00', '08:00:00']">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="formInline.create_time"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
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
            label="id"
            width="40">
            <template slot-scope="rq">
              {{ rq.row.origin_id || rq.row.id }}
            </template>
          </el-table-column>
          <el-table-column
            prop="path"
            label="uri"
            width="180">
          </el-table-column>
          <el-table-column
            prop="api_method"
            label="接口标识"
            width="200">
          </el-table-column>
          <el-table-column
            prop="api_name" label="接口名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="api_type" label="接口类型"
            width="100">
            <template slot-scope="scope">
              <el-tag :type="'primary'">{{ displayHandle(scope.row.api_type, apiType) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="method" width="80"
            label="请求类型">
            <template slot-scope="scope">
              <el-tag :type="'primary'">{{ displayHandle(scope.row.method, methodType) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="state" width="80"
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state === 0 ? 'success': 'warning'">
                {{ displayHandle(scope.row.state, apiState) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="version" label="版本"
            width="60">
          </el-table-column>
          <el-table-column
            prop="owner_id" width="200"
            label="所属项目">
            <template slot-scope="scope">
              <el-tag :type="'primary'">{{ displayHandle(scope.row.owner_id, projects) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="维护人" prop="maintainer"
            width="100">
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="更新时间">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="onEditBtn(scope.row)" type="text" size="small">修改</el-button>
              <!--      修改弹框内容-复制自新增弹框,页面不共存怎么共用?        -->
              <el-dialog
                title="修改接口"
                :visible.sync="dialogVisible" :append-to-body="true" class="addFm" width="60%"
                :before-close="handleCloseOuterDialog">
                <el-collapse v-model="activeName" accordion>
                  <!-- 内层发布逻辑 -->
                  <el-dialog width="30%" title="是否需要发布? 发布会产生有一条文档历史" :visible.sync="innerVisible"
                             append-to-body>
                    <div style="text-align: right;">
                      <el-button @click="innerVisible = false, dialogVisible = false">不发布</el-button>
                      <el-button type="primary" @click="publicApi(scope.row.id)">发 布</el-button>
                    </div>
                  </el-dialog>
                  <!--       Api         -->
                  <el-collapse-item title="确认基本信息" name="1">
                    <el-form ref="form" :model="infoFm" label-width="100px">
                      <el-form-item label="所属项目">
                        <el-select v-model="infoFm.owner_id" placeholder="请选择" disabled>
                          <el-option
                            v-for="item in projects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="uri">
                        <el-input v-model="infoFm.path"></el-input>
                      </el-form-item>
                      <el-row style="display: flex">
                        <el-col :span="14">
                          <el-form-item label="接口名称" required>
                            <el-input v-model="infoFm.api_name"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="接口标识">
                            <el-input v-model="infoFm.api_method"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="描述">
                        <el-input type="textarea" autosize placeholder="请输入内容"
                                  v-model="infoFm.describe"></el-input>
                      </el-form-item>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="接口类型">
                            <el-select v-model="infoFm.api_type" placeholder="请选择">
                              <el-option
                                v-for="item in apiType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="请求类型">
                            <el-select v-model="infoFm.method" placeholder="请选择">
                              <el-option
                                v-for="item in methodType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="状态">
                            <el-select v-model="infoFm.state" placeholder="请选择">
                              <el-option
                                v-for="item in apiState"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item label="请求体类型">
                            <el-input v-model="infoFm.content_type" type="text"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label="是否需要登录">
                            <el-switch v-model="infoFm.is_login" active-color="#13ce66"
                                       inactive-color="#ff4949"></el-switch>
                          </el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-form-item label="权限">
                            <el-input v-model="infoFm.require_auth"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="版本">
                            <el-input v-model="infoFm.version"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="18">
                          <el-form-item label="维护人">
                            <el-input v-model="infoFm.maintainer"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="注意项">
                        <el-input type="textarea" autosize placeholder="请输入内容"
                                  v-model="infoFm.Attentions"></el-input>
                      </el-form-item>
                      <el-form-item label="备注">
                        <el-input type="textarea" autosize placeholder="请输入内容"
                                  v-model="infoFm.note"></el-input>
                      </el-form-item>

                      <!--         基本信息页的确认接口           -->
                      <el-form-item size="large" style="text-align: right">
                        <el-button type="primary" @click="handleSaveApi">保存</el-button>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <!--       Req         -->
                  <el-collapse-item title="修改请求参数" name="2">
                    <el-table
                      :data="reqTable"
                      style="width: 100%;margin-bottom: 20px;"
                      rowKey="id" size="medium"
                      border fit
                      default-expand-all
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                      <el-table-column
                        prop="code"
                        label="代码"
                        sortable
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="param_type"
                        label="类型"
                        sortable
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="名称"
                        sortable
                        width="180">
                        <template slot-scope="rq">
                          <el-input v-model="rq.row.name"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="is_service" sortable
                        label="是否服务" width="105">
                        <template slot-scope="rq">
                          <el-switch v-model="rq.row.is_service" active-color="#13ce66" inactive-color="#ff4949"
                                     active-text="Y" inactive-text="N">
                          </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="is_require" sortable
                        label="必填" width="75">
                        <template slot-scope="rq">
                          <el-switch
                            v-model="rq.row.is_require" active-color="#13ce66" inactive-color="#ff4949"
                          >
                          </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="is_null"
                        label="空值" width="65">
                        <template slot-scope="rq">
                          <el-switch v-model="rq.row.is_null" active-color="#13ce66" inactive-color="#ff4949">
                          </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="example"
                        label="示例"
                        sortable
                        width="180">
                        <template slot-scope="rq">
                          <el-input v-model="rq.row.example"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="note"
                        label="备注"
                        width="180">
                        <template slot-scope="rq">
                          <el-input placeholder="请输入内容"
                                    v-model="rq.row.note"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="90">
                        <template slot-scope="rq">
                          <el-button type="text" @click="handleSaveParams('rsp', rq.row)">保存</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <!--       Rsp         -->
                  <el-collapse-item title="构建返回参数: 请于成功创建基本信息后进行" name="3">
                    <el-table
                      :data="rspTable"
                      style="width: 100%;margin-bottom: 20px;"
                      rowKey="id" size="medium"
                      border fit
                      default-expand-all
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                      <el-table-column
                        prop="code"
                        label="代码"
                        sortable
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="param_type"
                        label="类型"
                        sortable
                        width="80">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="名称"
                        sortable
                        width="180">
                        <template slot-scope="rq">
                          <el-input v-model="rq.row.name"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="is_service" sortable
                        label="是否服务" width="105">
                        <template slot-scope="rq">
                          <el-switch
                            v-model="rq.row.is_service" active-color="#13ce66" inactive-color="#ff4949"
                            active-text="Y" inactive-text="N">
                          </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="is_require" sortable
                        label="必填" width="75">
                        <template slot-scope="rq">
                          <el-switch
                            v-model="rq.row.is_require" active-color="#13ce66" inactive-color="#ff4949">
                          </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="is_null"
                        label="空值" width="65">
                        <template slot-scope="rq">
                          <el-switch
                            v-model="rq.row.is_null" active-color="#13ce66" inactive-color="#ff4949">
                          </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="example"
                        label="示例"
                        sortable
                        width="180">
                        <template slot-scope="rq">
                          <el-input v-model="rq.row.example"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="note"
                        label="备注"
                        width="180">
                        <template slot-scope="rq">
                          <el-input v-model="rq.row.note"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="70">
                        <template slot-scope="rq">
                          <el-button type="text" @click="handleSaveParams('rsp', rq.row)">保存</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                </el-collapse>
              </el-dialog>
              <el-button @click="handleGetDocs(scope.row)" type="text" size="small">查看</el-button>
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
import { getData, getView, handleResponse, putView, redirectPage } from '@/api/common'
import Cookie from 'js-cookie'

export default {
  data () {
    return {
      apiData: {},
      formInline: {},
      tableData: [],
      pageConfig: {
        size: 8,
        total: 0,
        current: 1
      },
      apiState: [],
      apiType: [],
      methodType: [],
      paramType: [],
      projects: [],
      activeName: 1,
      dialogVisible: false,
      innerVisible: false,
      infoFm: {},
      rspTable: [],
      reqTable: []
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    displayHandle (value, values) {
      const valueItem = values.filter(item => item.value === value)
      return valueItem.length > 0 ? valueItem[0].label : value
    },
    resetForm (formName) {
      this.formInline = Object.assign({}, {})
    },
    onSubmit () {
      this.search()
    },
    onEditBtn (row) {
      this.dialogVisible = true
      // 通过匹配日志初始化基本信息页表单
      getData('api', { id: row.id }).then((rsp) => {
        const rspInfo = handleResponse(rsp)
        if (rspInfo.result & rspInfo.data.show_info.length === 1) {
          this.infoFm = rspInfo.data.show_info[0]
        }
      })
      getData('param', {
        owner_id: row.id,
        page_size: 10000
      }).then((rsp) => {
        const rspInfo = handleResponse(rsp)
        if (rspInfo.result) {
          this.rspTable = rspInfo.data.show_info.filter(val =>
            val.own_type === 'response'
          )
          this.reqTable = rspInfo.data.show_info.filter(val =>
            val.own_type === 'request'
          )
        }
      })
    },
    handleSaveParams (bType, row) {
      if (bType === 'req') {
        this.saveParams(row)
      } else if (bType === 'rsp') {
        this.saveParams(row)
      } else {
        console.log('unknown bType in saveParams: ', bType)
      }
    },
    saveParams (formData) {
      if (formData.length <= 0) {
        return this.$notify.success({
          title: '保存成功',
          message: '无接口数据,无需保存'
        })
      }
      putView('param', this, formData).then(value => this.search())
    },
    handleSaveApi () {
      console.log(this.infoFm)
      putView('api', this, this.infoFm)
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
    },
    handleCloseOuterDialog () {
      this.innerVisible = true
    },
    publicApi (id) {
      console.log('public: ', id)
      this.innerVisible = false
      this.dialogVisible = false
    }
  },
  mounted () {
    // 下拉菜单选项信息获取
    getData('/auth', {}).then((responseData) => {
      const rspInfo = handleResponse(responseData)
      if (rspInfo.result) {
        this.apiState = rspInfo.data.api_state
        this.apiType = rspInfo.data.api_type
        this.methodType = rspInfo.data.method_type
        this.paramType = rspInfo.data.param_type
      }
    })
    getData('/project', { page_size: 10000 }).then((responseData) => {
      const rspInfo = handleResponse(responseData)
      if (rspInfo.result) {
        rspInfo.data.show_info.forEach((p) => {
          this.projects.push({
            label: p.name,
            value: p.id
          })
        })
      }
    })
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

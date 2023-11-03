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
            <el-button type="primary" @click="onSearchBtn">查询</el-button>
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
              <el-button @click="onAddBtn(scope.row)" type="text" size="small">新增接口</el-button>
            </template>
            <!--     新增接口       -->
            <el-dialog
              title="新增接口: 您可从刚选定的日志中提取接口信息"
              :visible.sync="dialogVisible" :append-to-body="true" class="addFm">
              <el-collapse v-model="activeName" accordion>
                <!--       Api         -->
                <el-collapse-item title="确认基本信息" name="1">
                  <el-form ref="form" :model="infoFm" label-width="100px">
                    <el-form-item label="所属项目" required>
                      <el-select v-model="infoFm.owner_id" placeholder="请选择">
                        <el-option
                          v-for="item in this.projects"
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
                          <el-input v-model="infoFm.interface_id"></el-input>
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
                              v-for="item in this.apiType"
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
                              v-for="item in this.methodType"
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
                              v-for="item in this.apiState"
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
                      <el-button>取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="构建请求参数" name="2">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="构建返回参数" name="3">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
              </el-collapse>
            </el-dialog>
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
import { getData, getView, handleResponse, postView } from '@/api/common'
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
      infoFm: {},
      dialogVisible: false,
      apiState: [],
      apiType: [],
      methodType: [],
      paramType: [],
      projects: [],
      activeName: 1
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
    onSearchBtn () {
      this.search()
    },
    onAddBtn (row) {
      this.dialogVisible = true
      // 通过匹配日志初始化基本信息页表单
      this.infoFm = {
        path: row.path,
        interface_id: row.interface_id,
        api_type: row.api_type,
        method: row.method,
        content_type: row.content_type,
        req_example: row.req,
        rsp_example: row.rsp,
        is_login: true,
        version: '1.0.0',
        maintainer: Cookie.get('username'),
        state: 4
      }
      // 获取请求参数和返回参数的结构
      getData('parse', row).then(val => {
        console.log(val.data.data)
        // const rspInfo = handleResponse(val)
      })
    },
    handleSaveApi () {
      console.log(this.infoFm)
      postView('api', this, this.infoFm).then(val => {
        this.$notify.success({
          title: '操作成功'
        })
      })
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

  .addFm {
    el-button {
      text-align: right;
    }
  }
}
</style>

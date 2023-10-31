<template>
  <div>
    <router-view/>
    <div>
      <div class="top-info">
        <el-alert
          title="日志管理: 您可查询端侧接口调用信息, 并于此处选择某条记录为某项目的接口"
          type="success">
        </el-alert>
      </div>
      <div class="top-action">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      formInline: {},
      tableData: [
        {
          id: 41,
          create_time: '2023-10-15T14:13:41.681',
          path: '/apis/parse?id=39',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "1000", "data": {"req": [], "rsp": [{"code": "code", "param_type": "str", "example": "1000", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "data", "param_type": "dict", "example": "-", "children": [{"code": "req", "param_type": "array", "example": "-", "children": [{"code": "code", "param_type": "str", "example": "method", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "param_type", "param_type": "str", "example": "str", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "example", "param_type": "str", "example": "111", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "children", "param_type": "list", "example": [], "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "is_require", "param_type": "bool", "example": true, "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "is_null", "param_type": "bool", "example": true, "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "is_service", "param_type": "bool", "example": true, "children": [], "is_require": true, "is_null": true, "is_service": true}], "is_require": true, "is_null": true, "is_service": true}, {"code": "rsp", "param_type": "list", "example": [], "children": [], "is_require": true, "is_null": true, "is_service": true}], "is_require": true, "is_null": true, "is_service": true}, {"code": "msg", "param_type": "str", "example": "", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "timestamp", "param_type": "str", "example": "2023-10-15 14:11:57", "children": [], "is_require": true, "is_null": true, "is_service": true}]}, "msg": "", "timestamp": "2023-10-15 14:13:41"}',
          err: '',
          status_code: 200
        },
        {
          id: 40,
          create_time: '2023-10-15T14:12:44.342',
          path: '/apis/parse?id=39',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "1000", "data": {"req": [], "rsp": [{"code": "code", "param_type": "str", "example": "1000", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "data", "param_type": "dict", "example": "-", "children": [{"code": "req", "param_type": "array", "example": "-", "children": [{"code": "code", "param_type": "str", "example": "method", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "param_type", "param_type": "str", "example": "str", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "example", "param_type": "str", "example": "111", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "children", "param_type": "list", "example": [], "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "is_require", "param_type": "bool", "example": true, "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "is_null", "param_type": "bool", "example": true, "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "is_service", "param_type": "bool", "example": true, "children": [], "is_require": true, "is_null": true, "is_service": true}], "is_require": true, "is_null": true, "is_service": true}, {"code": "rsp", "param_type": "list", "example": [], "children": [], "is_require": true, "is_null": true, "is_service": true}], "is_require": true, "is_null": true, "is_service": true}, {"code": "msg", "param_type": "str", "example": "", "children": [], "is_require": true, "is_null": true, "is_service": true}, {"code": "timestamp", "param_type": "str", "example": "2023-10-15 14:11:57", "children": [], "is_require": true, "is_null": true, "is_service": true}]}, "msg": "", "timestamp": "2023-10-15 14:12:44"}',
          err: '',
          status_code: 200
        },
        {
          id: 39,
          create_time: '2023-10-15T14:11:57.033',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "1000", "data": {"req": [{"code": "method", "param_type": "str", "example": "111", "children": [], "is_require": true, "is_null": true, "is_service": true}], "rsp": []}, "msg": "", "timestamp": "2023-10-15 14:11:57"}',
          err: '',
          status_code: 200
        },
        {
          id: 38,
          create_time: '2023-10-15T14:11:13.396',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "9999", "data": {}, "msg": "服务内部异常，请稍后重新尝试! ", "timestamp": "2023-10-15 14:11:13"}',
          err: '',
          status_code: 200
        },
        {
          id: 37,
          create_time: '2023-10-15T14:10:39.204',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "9999", "data": {}, "msg": "服务内部异常，请稍后重新尝试! ", "timestamp": "2023-10-15 14:10:39"}',
          err: '',
          status_code: 200
        },
        {
          id: 36,
          create_time: '2023-10-15T14:10:03.470',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "9999", "data": {}, "msg": "服务内部异常，请稍后重新尝试! ", "timestamp": "2023-10-15 14:10:03"}',
          err: '',
          status_code: 200
        },
        {
          id: 35,
          create_time: '2023-10-15T14:10:02.444',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "9999", "data": {}, "msg": "服务内部异常，请稍后重新尝试! ", "timestamp": "2023-10-15 14:10:02"}',
          err: '',
          status_code: 200
        },
        {
          id: 34,
          create_time: '2023-10-15T14:10:00.688',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "9999", "data": {}, "msg": "服务内部异常，请稍后重新尝试! ", "timestamp": "2023-10-15 14:10:00"}',
          err: '',
          status_code: 200
        },
        {
          id: 33,
          create_time: '2023-10-15T14:00:02.066',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "9999", "data": {}, "msg": "服务内部异常，请稍后重新尝试! ", "timestamp": "2023-10-15 14:00:02"}',
          err: '',
          status_code: 200
        },
        {
          id: 32,
          create_time: '2023-10-15T13:58:19.252',
          path: '/apis/parse?id=25',
          interface_id: '',
          api_type: 1,
          method: 'GET',
          content_type: 'text/plain',
          req: '{}',
          rsp: '{"code": "9999", "data": {}, "msg": "服务内部异常，请稍后重新尝试! ", "timestamp": "2023-10-15 13:58:19"}',
          err: '',
          status_code: 500
        }
      ]
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
    filterMethod (value, row) {
      return row.method === value
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

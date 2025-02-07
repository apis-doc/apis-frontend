import http from '../utils/request'
import Cookie from 'js-cookie'

export const getData = (uri, data) => {
  return http.get(uri, { params: data })
}

export const postData = (uri, data) => {
  return http.post(uri, data)
}

export const deleteData = (uri, data) => {
  return http.delete(uri, data)
}

export const putData = (uri, data) => {
  return http.put(uri, data)
}

export const handleResponse = (responseData, canPrint) => {
  const code = responseData.data.code
  if (canPrint === true) {
    console.log(responseData.data)
  }
  return {
    result: code === '1000',
    data: responseData.data.data,
    errMsg: responseData.data.msg,
    errCode: responseData.data.code
  }
}

export const redirectPage = (uri, router, isAppend) => {
  // 解决重复点击页面报错
  uri = isAppend ? '/api-manage/' + uri : uri
  if (router.history.current.path !== uri) {
    router.push(uri)
  }
}

export const clearCookies = () => {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    console.log(Cookie.get())
  }
}

export const getView = (uri, vueObj, formData, pageData) => {
  const data = Object.assign({}, formData)
  data.page_number = pageData.current
  data.page_size = pageData.size
  // 移除空元素
  const params = Object.keys(data)
    .filter((key) => data[key] !== null && data[key] !== undefined && data[key] !== '')
    .reduce((acc, key) => ({
      ...acc,
      [key]: data[key]
    }), {})
  console.log('get', uri, params)
  return getData(uri, params).then((response) => {
    const rspInfo = handleResponse(response, true)
    if (!rspInfo.result) {
      return vueObj.$notify.error({
        title: '查询失败',
        message: rspInfo.msg
      })
    }
    vueObj.tableData = rspInfo.data.show_info
    vueObj.pageConfig.total = rspInfo.data.count
    return rspInfo
  })
}

export const putView = (uri, vueObj, formData, callback) => {
  const params = Object.assign({}, formData)
  console.log('put', uri, params)
  return putData(uri, params).then((response) => {
    const rspInfo = handleResponse(response, true)
    if (!rspInfo.result) {
      return vueObj.$notify.error({
        title: '更新失败',
        message: rspInfo.errMsg
      })
    }
    vueObj.$notify.success({
      title: '更新成功'
    })
    if (callback !== undefined) {
      callback()
    }
  })
}

export const postView = (uri, vueObj, formData, callback) => {
  const params = Object.assign({}, formData)
  console.log('post', uri, params)
  return postData(uri, params).then((response) => {
    const rspInfo = handleResponse(response, true)
    if (!rspInfo.result) {
      vueObj.$notify.error({
        title: '新增失败',
        message: rspInfo.errMsg
      })
      return rspInfo
    }
    vueObj.$notify.success({
      title: '新增成功'
    })
    // 同步执行的另一种方式
    if (callback !== undefined) {
      callback()
    }
    return rspInfo
  })
}

export const getChildren = (table) => {
  const res = []
  table.forEach((item) => {
    item.children = []
    if (item.parent_id === undefined || item.parent_id === 0) {
      table.forEach((v) => {
        if (v.parent_id === item.id) {
          v.children = []
          item.children.push(v)
        }
      })
      res.push(item)
    }
  })
  return res
}

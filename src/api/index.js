import http from '../utils/request'
import Cookie from 'js-cookie'

export const getData = (uri, data) => {
  return http.get(uri, data)
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

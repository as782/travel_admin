import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import authHelper from '@utils/auth/authHelper'
import { BASE_URL, CONTENT_TYPE, TIMEOUT } from '@/config/http'

// 统一后端返回数据格式
export interface Result<T = any> {
  code: number
  msg: string
  data: T
}
// 创建Axios实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL, // 设置统一的请求前缀
  timeout: TIMEOUT, // 设置统一的超时时间
  headers: {
    'Content-Type': CONTENT_TYPE.application_json
  }
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = authHelper.getSessionStorage('userInfo').state.token || ''
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 相应拦截
service.interceptors.response.use(
  (response) => {
    // 返回响应数据
    return response.data
  },
  (error) => {
    // 处理 HTTP 网络错误
    let tip = ''
    // HTTP 状态码
    const { code, msg } = error.response?.data || {
      code: error.response.status,
      msg: error.response.statusText
    }

    switch (code) {
      case 401:
        tip = msg
        // token 校验失败
        authHelper.clearSessionStorage()
        //  跳转登录

        break
      case 403:
        tip = msg
        //  跳转登录
        authHelper.clearSessionStorage()
        break
      case 404:
        tip = msg
        break
      case 500:
        tip = msg
        break
      default:
        tip = msg
    }

    // 提示错误信息
    message.error(tip)
    return Promise.reject(new Error(error || 'Error'))
  }
)

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  }
}

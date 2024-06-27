import { http } from '@utils/http/request'
import { PageParams, PageResult, Result } from '@/api/types'
import { Admin, LoginParams, LoginResult, User } from './types'
 

/**
 * 实现登录
 */
export const loginRequest = async (data: LoginParams) => {
  // console.log('login data:', data)

  return http.post<Result<LoginResult>>('/admin/login', data)
}

/**
 * 实现注册
 */
export const registerRequest = async (data: LoginParams) => {
  console.log('register data:', data)
  const res: Result<any> = {
    code: 200,
    msg: 'ok',
    data: null
  }
  return Promise.resolve(res)
  //   return http.post<Result>('/register', data)
}

export const updatePasswordRequest = async (data: any) => {
 
    return http.post<Result>('/admin/updatePassword', data)
}

/** 添加普通用户 */
export const addUserRequest = async (data: User) => {
  console.log(data)
  return http.post<Result<any>>('/admin/addUser', data)
}

/** 添加管理员 */
export const addAdminRequest = async (data: Admin) => {
  console.log(data)
  return http.post<Result<any>>('/admin/addAdmin', data)
}

/** 获取用户列表 */
export const getUserListRequest = async (data: PageParams) => {
  return http.post<Result<PageResult<User>>>('/admin/getUserList', data)
}

/** 获取管理员列表*/
export const getAdminListRequest = async (data: PageParams) => {
  return http.post<Result<PageResult<Admin>>>('/admin/getAdminList', data)
}

/** 修改普通用户信息 */
export const updateUserRequest = async (data: User) => {
  console.log('uapate', data)
  return http.post<Result<any>>('/admin/updateUser', data)
}

/** 修改管理员信息 */
export const updateAdminRequest = async (data: Admin) => {
  return http.post<Result<any>>('/admin/updateAdmin', data)
}

/** 删除普通用户 */
export const deleteUserRequest = async (data: number[]) => {
  return http.post<Result<any>>('/admin/deleteUser', { ids: data })
}

/** 删除管理员 */
export const deleteAdminRequest = async (data: number[]) => {
  return http.post<Result<any>>('/admin/deleteAdmin', { ids: data })
}

/** 请求标签列表 */
export const getTagListRequest = async (data: PageParams) => {
  return http.post<Result<PageResult<any>>>('/admin/getTagList', data)
}
/** 添加标签 */
export const addTagRequest = async (data: any) => {
  return http.post<Result<any>>('/admin/addTag', data)
}

/** 修改标签 */
export const updateTagRequest = async (data: any) => {
  return http.post<Result<any>>('/admin/updateTag', data)
}

/** 删除标签 */
export const deleteTagRequest = async (data: number[]) => {
  return http.post<Result<any>>('/admin/deleteTag', { ids: data })
}

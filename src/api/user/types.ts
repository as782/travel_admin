/* 登录接口参数类型 */
export interface LoginParams {
  username: string
  password: string
}

/* 登录接口返回值类型 */
export interface LoginResult {
  token: string
  role: string[]
  userInfo: UserInfo
}

/**user_info**/
export interface UserInfo {
  user_id: number
  avatar_url: string
  nickname: string
  username: string
  gender: string
  birthday: string
  created_at: string
}

/** userCard */
export interface UserCard {
  user_id: number
  avatar_url: string
  nickname: string
}

// 用户管理

/** 普通用户信息*/
export interface User {
  user_id: number
  avatar_url: string
  nickname: string
  username: string
  password: string
  gender: string
  birthday: string
  contact_email: string
  contact_phone: string
  region_name: string
  region_code: string
  bio: string
  created_at: string
  status: number
}
/** 管理员 */
export interface Admin {
  admin_id: number
  avatar_url: string
  nickname: string
  username: string
  password: string
  gender: string
  birthday: string
  created_at: string
  status: number
  role: string
}

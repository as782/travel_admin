import { loginRequest } from '@/api/user'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Info = {
  // 用户名
  nickname: string
  username: string
  // 用户ID
  userId: number
  // 用户头像
  avatar: string
  gender: string
  birthday: string
  // 用户角色
  role: string[]
  // 用户token
  token: string
} | null

interface LoginState {
  userInfo: Info
  setUserInfo: (info: Info) => void
  login: (data: any) => Promise<any>
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      userInfo: null,
      token: '',
      setUserInfo: (info) => set(() => ({ userInfo: info })),

      // 请求登录
      login: async (data: any) => {
        // 请求登录接口
        const res = await loginRequest(data)
        const {
          userInfo: { user_id, nickname, username, avatar_url, gender, birthday },
          token,
          role
        } = res.data
        //  登录成功后返回用户信息
        const userInfo: Info = {
          nickname,
          userId: user_id,
          avatar: avatar_url,
          username,
          gender,
          birthday,
          role: role,
          token: token
        }
        set(() => ({ userInfo, token }))
      }
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
      
    }
  )
)

export default useLoginStore

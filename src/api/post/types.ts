export interface Post {
  post_id: number
  user_id: number
  theme_id: number
  status: number // 0: 未通过审批, 1: 通过审批,
  title: string
  description: string
  duration_day: number
  estimated_expense: number
  gender_requirement: string
  payment_method: string
  start_location: string
  end_location: string
  team_size: number
  comment_count: number
  like_count: number
  join_count: number
  images: string[] // 图片地址
  itinerary_images: string // 行程图片

  created_at: string
}

export interface Moment {
  dynamic_post_id: number
  user_id: number
  content: string
  status: number // 0: 未通过审批, 1: 通过审批,
  comment_count: number
  like_count: number
  images: string[] // 图片地址
  created_at: string
}

export interface RecomentdPostOrMoment {
  id: number
  post_id: number
  user_id: number
  status: number // 0: 未通过审批, 1: 通过审批,
  type: 'moment' | 'team'
  comment_count: number
  like_count: number
  join_count?: number
  created_at: string
}

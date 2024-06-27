import { UserCard } from '../user/types'

/** 评论 */
export interface Comment {
  comment_id: number
  userInfo: UserCard
  content: string
  created_at: string
}
/** 动态评论类型 */
export interface MomentComment extends Comment {
  dynamic_post_id: number
}
/** 组队评论类型 */
export interface TeamComment extends Comment {
  post_id: number
}

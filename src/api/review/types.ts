export interface IReview {
  id: number
  post_id: number
  admin_id: number
  status: number // 0: 未通过审批, 1: 通过审批,
  type: 'moment' | 'team'
  created_at: string
}

// import { faker } from '@faker-js/faker'
import { PageParams, PageResult, Result } from '../types'
import { IReview } from './types'
import { http } from '@utils/http/request'

/** 获取审批记录列表 */
export const getReviewListRequest = (data: PageParams) => {
  // const { page, limit } = data
  // const fakerdata = new Array(limit).fill(null).map(() => {
  //   return {
  //     id: faker.number.int(),
  //     post_id: faker.number.int(),
  //     admin_id: faker.number.int(),
  //     type: faker.helpers.arrayElement(['moment', 'team']) as 'moment' | 'team',
  //     status: faker.helpers.arrayElement([0, 1]),
  //     created_at: faker.date.past().toISOString()
  //   }
  // })

  // const res: Result<PageResult<IReview>> = {
  //   code: 200,
  //   msg: 'ok',
  //   data: {
  //     list: fakerdata,
  //     currentPage: page,
  //     totalCount: 100,
  //     totalPages: 10,
  //     pageSize: limit
  //   }
  // }
  // return Promise.resolve(res)
  return http.post<Result<PageResult<IReview>>>('/admin/getApprovalRecord', data)
}

/** 删除审批记录 */
export const deleteReviewRequest = (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/deleteApprovalRecord', data)
}

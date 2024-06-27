// import { faker } from '@faker-js/faker'
import { PageParams, PageResult, Result } from '@/api/types'
import { Moment, Post, RecomentdPostOrMoment } from './types'
import { http } from '@utils/http/request'

/** 获取主题列表 */
export function getThemeListRequest(data: PageParams) {
  // const { page, limit } = data
  // const fakerdata = new Array(limit).fill(null).map(() => {
  //   return {
  //     theme_id: faker.number.int(),
  //     theme_name: faker.commerce.productName(),
  //     created_at: faker.date.past().toISOString()
  //   }
  // })
  // const res: Result<PageResult<any>> = {
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
  return http.post<Result<PageResult<any>>>('/admin/getThemeList', data)
}

/** 添加主题 */
export const addThemeRequest = async (data: any) => {
  // console.log(data)
  // const res: Result<any> = {
  //   code: 200,
  //   msg: 'ok',
  //   data: null
  // }
  // return Promise.resolve(res)
  return http.post<Result<any>>('/admin/addTheme', data)
}

/** 修改主题 */
export const updateThemeRequest = async (data: any) => {
  // console.log(data)
  // const res: Result<any> = {
  //   code: 200,
  //   msg: 'ok',
  //   data: null
  // }
  // return Promise.resolve(res)
  return http.post<Result<any>>('/admin/updateTheme', data)
}

/** 删除主题 */
export const deleteThemeRequest = async (data: { ids: number[] }) => {
  // console.log(data)
  // const res: Result<any> = {
  //   code: 200,
  //   msg: 'ok',
  //   data: null
  // }
  // return Promise.resolve(res)
  return http.post<Result<any>>('/admin/deleteTheme', data)
}

/** 获取组队帖子列表 */
export function getPostListRequest(data: PageParams) {
  return http.post<Result<PageResult<Post>>>('/admin/getPostList', data)
}
/** 删除组队帖 */
export const deletePostRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/deletePost', data)
}

/** 获取动态列表 */
export function getMomentListRequest(data: PageParams) {
  // const { page, limit } = data
  // const fakerdata = new Array(limit).fill(null).map(() => {
  //   return {
  //     dynamic_post_id: faker.number.int(),
  //     user_id: faker.number.int(),
  //     status: faker.helpers.arrayElement([0, 1, 2]),
  //     content: faker.lorem.paragraphs(2),
  //     comment_count: faker.number.int(),
  //     like_count: faker.number.int(),

  //     images: new Array(10).fill(null).map(() => faker.image.avatarGitHub()),
  //     created_at: faker.date.past().toISOString()
  //   }
  // })

  // const res: Result<PageResult<Moment>> = {
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
  return http.post<Result<PageResult<Moment>>>('/admin/getDynamicList', data)
}
/** 删除动态帖 */
export const deleteMomentRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/deleteDynamicPost', data)
}

/** 获取推荐列表 */
export function getRecommendListRequest(data: PageParams) {
  // const { page, limit } = data
  // const fakerdata = new Array(limit).fill(null).map(() => {
  //   return {
  //     id: faker.number.int(),
  //     user_id: faker.number.int(),
  //     status: faker.helpers.arrayElement([1]),
  //     type: faker.helpers.arrayElement(['moment', 'team']) as 'moment' | 'team',
  //     comment_count: faker.number.int(),
  //     like_count: faker.number.int(),
  //     join_count: faker.number.int(),
  //     created_at: faker.date.past().toISOString()
  //   }
  // })
  // const res: Result<PageResult<RecomentdPostOrMoment>> = {
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
  return http.post<Result<PageResult<RecomentdPostOrMoment>>>('/admin/getRecommendList', data)
}

// 添加到推荐
export const addRecommendRequest = async (data: { id: number; type: 'moment' | 'team' }) => {
  return http.post<Result<any>>('/admin/addToRecommendTable', data)
}

/** 删除推荐 */
export const deleteRecommendRequest = async (data: { id: number; type: 'moment' | 'team' }[]) => {
  return http.post<Result<any>>('/admin/removeFromRecommendTable', data)
}

// 组队通过审核
export const passPostReviewRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/passPost', data)
}
// 动态通过审核
export const passMomentReviewRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/passDynamicPost', data)
}

// 组队下架
export const offlinePostRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/offlinePost', data)
}

// 动态下架
export const offlineMomentRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/offlineDynamicPost', data)
}
// 组队拒绝审核
export const rejectPostReviewRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/unpassPost', data)
}
// 动态拒绝审核
export const rejectMomentReviewRequest = async (data: { ids: number[] }) => {
  return http.post<Result<any>>('/admin/unpassDynamicPost', data)
}

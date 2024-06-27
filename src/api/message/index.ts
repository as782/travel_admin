// import { faker } from '@faker-js/faker'
import { PageParams, PageResult, Result } from '@/api/types'
import { Message, Notification } from './types'
import { http } from '@utils/http/request'

/** 获取通知列表 */
export function getNoticeListRequest(data: PageParams) {
  // const { page, limit } = data
  // const fakerdata = new Array(limit).fill(null).map(() => {
  //   return {
  //     id: faker.number.int(),
  //     userInfo: {
  //       user_id: faker.number.int(),
  //       avatar_url: faker.image.avatarGitHub(),
  //       nickname: faker.person.fullName()
  //     },
  //     content: faker.lorem.paragraphs(2),
  //     created_at: faker.date.past().toISOString()
  //   }
  // })
  // const res: Result<PageResult<Notification>> = {
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

  return http.post<Result<PageResult<Notification>>>('/admin/getNoticeList', data)
}

/** 添加通知 */
export function addNoticeRequest(data: { admin_id?: number; content?: string }) {
  return http.post<Result<any>>('/admin/addNotice', data)
}

/** 通知删除 */
export function deleteNoticeRequest(data: { ids: number[] }) {
  return http.post<Result<any>>('/admin/deleteNotice', data)
}

/** 获取消息列表 */
export function getMessageListRequest(data: PageParams) {
  // const { page, limit } = data
  // const fakerdata = new Array(limit).fill(null).map(() => ({
  //   id: faker.number.int(),
  //   senderInfo: {
  //     user_id: faker.number.int(),
  //     nickname: faker.person.fullName(),
  //     avatar_url: faker.image.avatarGitHub(),
  //     type: faker.helpers.arrayElement(['admin', 'user']) as 'admin' | 'user'
  //   },
  //   receiverInfo: {
  //     user_id: faker.number.int(),
  //     nickname: faker.person.fullName(),
  //     avatar_url: faker.image.avatarGitHub(),
  //     type: faker.helpers.arrayElement(['admin', 'user']) as 'admin' | 'user'
  //   },
  //   content: faker.lorem.paragraphs(1),
  //   type: faker.helpers.arrayElement(Object.values(MessageType)),
  //   related_id: faker.number.int(),
  //   comment_id: faker.number.int(),
  //   like_id: faker.number.int(),
  //   created_at: faker.date.past().toISOString()
  // }))
  // const res: Result<PageResult<Message>> = {
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
  return http.post<Result<PageResult<Message>>>('/admin/getMessageList', data)
}

/** 删除消息 */
export function deleteMessageRequest(data: { ids: number[] }) {
  return http.post<Result<any>>('/admin/deleteMessage', data)
}

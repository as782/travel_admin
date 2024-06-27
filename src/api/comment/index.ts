import { faker } from '@faker-js/faker'
import { PageParams, PageResult, Result } from '@/api/types'
import { MomentComment, TeamComment } from './types'
import { http } from '@utils/http/request'

/** 获取 评论列表 */
export function getCommentList(data: PageParams & { type: 'moment' | 'team' }) {
  const { page, limit, type } = data
  let fakerdata: any[] = []
  if (type === 'moment') {
    fakerdata = new Array(limit).fill(null).map(() => {
      return {
        id: faker.number.int(),
        userInfo: {
          user_id: faker.number.int(),
          avatar_url: faker.image.avatarGitHub(),
          nickname: faker.person.fullName()
        },
        dynamic_post_id: faker.number.int(),
        content: '动态' + faker.lorem.paragraphs(2),
        created_at: faker.date.past().toISOString()
      }
    })
  } else if (type === 'team') {
    fakerdata = new Array(limit).fill(null).map(() => {
      return {
        id: faker.number.int(),
        userInfo: {
          user_id: faker.number.int(),
          avatar_url: faker.image.avatarGitHub(),
          nickname: faker.person.fullName()
        },
        post_id: faker.number.int(),
        content: '组队' + faker.lorem.paragraphs(2),
        created_at: faker.date.past().toISOString()
      }
    })
  }

  const res: Result<PageResult<MomentComment & TeamComment>> = {
    code: 200,
    msg: 'ok',
    data: {
      list: fakerdata,
      currentPage: page,
      totalCount: 100,
      totalPages: 10,
      pageSize: limit
    }
  }

  return Promise.resolve(res)
}

 

// 获取组队评论列表
export async function getTeamCommentList(data: PageParams) {

  return http.post<Result<PageResult<TeamComment>>>('/admin/getTeamActivityCommentList',  data)
}

// 删除组队评论
export async function deleteTeamComment(data: { ids: number[] }) {
  
  return http.post<Result<PageResult<TeamComment>>>('/admin/deleteTeamActivityComment',  data)
}

// 获取动态评论列表
export async function getMomentCommentList(data: PageParams) {
  
  return http.post<Result<PageResult<MomentComment>>>('/admin/getDynamicCommentList',  data)
}

// 删除动态评论
export async function deleteMomentComment(data: { ids: number[] }) {
  
  return http.post<Result<PageResult<MomentComment>>>('/admin/deleteDynamicComment',  data)
}

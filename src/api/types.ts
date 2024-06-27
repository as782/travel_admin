// 统一后端返回数据格式
export interface Result<T = any> {
  code: number
  msg: string
  data: T
}
/**分页查询返回结果 */
export interface PageResult<T> {
  list: T[]
  pageSize?: number
  totalCount?: number
  totalPages?: number
  currentPage?: number
}

/** 分页参数 */
export interface PageParams {
  [key: string]: any
  page?: number
  limit?: number
}

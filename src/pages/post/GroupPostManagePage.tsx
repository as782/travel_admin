// 组队管理
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch, Table, message } from 'antd'
import React from 'react'

import { Post } from '@/api/post/types'
import {
  addRecommendRequest,
  deletePostRequest,
  getPostListRequest,
  offlinePostRequest,
  passPostReviewRequest,
  rejectPostReviewRequest
} from '@/api/post'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ManOutlined,
  QuestionOutlined,
  WomanOutlined
} from '@ant-design/icons'

export type Item = {
  post_id: number
  user_id: number
  theme_id: number
  status: number
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
  images: string[]
  itinerary: string
  created_at: string
}

const staticColumns: ProColumns<Item>[] = [
  {
    title: '组队帖子ID',
    dataIndex: 'post_id',
    valueType: 'text',
    copyable: true
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    valueType: 'text',
    copyable: true
  },
  {
    title: '主题ID',
    dataIndex: 'theme_id',
    valueType: 'text',
    copyable: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'text',
    valueEnum: {
      0: { text: '未通过审批', status: 'Error' },
      1: { text: '通过审批', status: 'Success' },
      2: { text: '待审核', status: 'Processing' }
    },
    render: (_, record) => (
      <>
        {record.status === 0 ? (
          <span className="text-red-500">
            {/* x 图标 */}
            <CloseCircleOutlined />
            未通过审批
          </span>
        ) : record.status === 1 ? (
          <span className="text-green-500">
            <CheckCircleOutlined />
            通过审批
          </span>
        ) : record.status === 2 ? (
          <span className="text-yellow-500">
            <InfoCircleOutlined />
            待审核
          </span>
        ) : (
          ''
        )}
      </>
    )
  },
  {
    title: '标题',
    dataIndex: 'title',
    valueType: 'text',
    copyable: true,

    ellipsis: true
  },
  {
    title: '描述',
    dataIndex: 'description',
    valueType: 'text',
    ellipsis: true,
    hideInSearch: true,
    width: 200
  },
  {
    title: '持续天数',
    dataIndex: 'duration_day',
    valueType: 'text',
    copyable: true,
    hideInTable: true, // 不在表格中显示
    hideInSearch: true
  },
  {
    title: '预估花费',
    dataIndex: 'estimated_expense',
    valueType: 'text',
    copyable: true,
    hideInTable: true, // 不在表格中显示
    hideInSearch: true
  },
  {
    title: '性别要求',
    dataIndex: 'gender_requirement',
    valueType: 'text',
    valueEnum: {
      male: {
        text: (
          <>
            <ManOutlined />
          </>
        )
      },
      female: {
        text: (
          <>
            <WomanOutlined />
          </>
        )
      },
      other: {
        text: (
          <>
            <QuestionOutlined />
          </>
        )
      }
    },
    copyable: true,
    hideInTable: true // 不在表格中显示
  },
  {
    title: '支付方式',
    dataIndex: 'payment_method',
    valueType: 'text',
    copyable: true,
    hideInTable: true, // 不在表格中显示
    hideInSearch: true
  },
  {
    title: '出发地点',
    dataIndex: 'start_location',
    valueType: 'text'
  },
  {
    title: '目的地点',
    dataIndex: 'end_location',
    valueType: 'text'
  },
  {
    title: '团队大小',
    dataIndex: 'team_size',
    valueType: 'text',
    hideInTable: true, // 不在表格中显示
    hideInSearch: true
  },
  {
    title: '评论数',
    dataIndex: 'comment_count',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: '点赞数',
    dataIndex: 'like_count',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: '参加人数',
    dataIndex: 'join_count',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: '图片地址',
    dataIndex: 'images',
    valueType: 'text',

    hideInSearch: true,
    render: (_, record) => (
      <>
        <img src={record.images[0]} alt="图片" />
      </>
    ),
    width: 200
  },
  {
    title: '行程',
    dataIndex: 'itinerary',
    valueType: 'text',
    copyable: true,
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 150,
    hideInSearch: true
  }
]
const GroupPostManagePage: React.FC = () => {
  const [isRowSelect, setIsRowSelect] = React.useState(false)
  const tableActionFef = React.useRef<any>()
  const navigate = useNavigate()
  const columns: ProColumns<Item>[] = [
    ...staticColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <div className="flex flex-col justify-around p-4">
            <Button
              className="my-2"
              type="primary"
              key="detail"
              onClick={() => {
                // 导航到详情页面
                navigate(`/post/teamDetail/${record.post_id}`, { state: { record: record } })
              }}
            >
              详情
            </Button>
            <Button
              className="my-2"
              key="recommend"
              onClick={() => {
                if(record.status !== 1){
                  message.error('只有通过审批的才能添加到推荐')
                  return
                }
                handelRecommend(record.post_id)
              }}
            >
              添加到推荐
            </Button>
            <Button
              className="my-2"
              key="review"
              onClick={() => {
                handleReview([record])
              }}
            >
              通过审核
            </Button>
            <Button
              className="my-2"
              key="reviewRe"
              onClick={() => {
                handleReviewReject([record])
              }}
            >
              不通过审核
            </Button>

            <Button
              className="my-2"
              key="reviewDown"
              onClick={() => {
                handleReviewDown([record])
              }}
            >
              下架
            </Button>
            <Button
              className="my-2"
              type="primary"
              danger
              key="delete"
              onClick={() => {
                // 处理删除逻辑
                handelDelete([record.post_id])
              }}
            >
              删除
            </Button>
          </div>
        </>
      ),

      align: 'center',
      fixed: 'right'
    }
  ]

  // 添加到推荐
  const handelRecommend = async (postId: number) => {
    // 处理添加到推荐逻辑
    try {
      
      await addRecommendRequest({ id: postId, type: 'team' })
      message.success('添加到推荐成功')
    } catch (error) {
      // 处理错误
      message.error('添加到推荐失败')
    }
  }

  // 处理拒绝审批
  const handleReviewReject = async (selectedRows: Item[]) => {
    // 处理审批逻辑
    // 必须都是是未通过的有一个不行就不行
    const isCanReview = selectedRows.every((item) => item.status === 2)
    if (!isCanReview) {
      message.error('只能审批待审批的帖子 ！')
      return
    }
    // 处理审批逻辑
    const params = { ids: selectedRows.map((item) => item.post_id) }
    try {
      // 处理审批逻辑
      await rejectPostReviewRequest(params)
      setIsRowSelect(false)
      // 刷新表格
      tableActionFef.current?.reload()
      message.success('成功')
    } catch (error) {
      // 处理错误
      message.error('失败')
    }
  }
  const handleReview = async (selectedRows: Item[]) => {
    // 处理审批逻辑
    // 必须都是是未通过的有一个不行就不行
    const isCanReview = selectedRows.every((item) => item.status === 2)
    if (!isCanReview) {
      message.error('只能审批待审批的帖子 ！')
      return
    }
    // 处理审批逻辑
    const params = { ids: selectedRows.map((item) => item.post_id) }
    try {
      // 处理审批逻辑
      await passPostReviewRequest(params)
      setIsRowSelect(false)
      // 刷新表格
      tableActionFef.current?.reload()
      message.success('成功')
    } catch (error) {
      // 处理错误
      message.error('失败')
    }
  }
  // 处理下架
  const handleReviewDown = async (selectedRows: Item[]) => {
    // 处理审批逻辑

    // 必须都是是通过的有一个不行就不行
    const isCanReview = selectedRows.every((item) => item.status === 1)
    if (!isCanReview) {
      message.error('只能下架通过的帖子！')
      return
    }
    const params = { ids: selectedRows.map((item) => item.post_id) }
    try {
      // 处理审批逻辑
      await offlinePostRequest(params)
      setIsRowSelect(false)
      // 刷新表格
      tableActionFef.current?.reload()
      message.success('下架成功')
    } catch (error) {
      // 处理错误
      message.error('下架失败')
    }
  }

  // 处理删除
  const handelDelete = async (selectedRowKeys: React.Key[]) => {
    // 处理删除逻辑

    try {
      const deleteIds = selectedRowKeys.map(Number)
      await deletePostRequest({ ids: deleteIds })

      message.success('删除成功')
      setIsRowSelect(false)
      // 刷新表格
      tableActionFef.current?.reload()
    } catch (error) {
      message.error('删除失败')
    }
  }

  return (
    <>
      <div>主题管理</div>
      <ProTable<Item>
        columns={columns}
        rowKey={'post_id'}
        scroll={{ x: 1300 }}
        bordered
        actionRef={tableActionFef}
        rowSelection={
          isRowSelect
            ? {
                // 设置默认选中项
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                defaultSelectedRowKeys: [1]
              }
            : isRowSelect
        }
        request={async (params) => {
          const res = await getPostListRequest({
            page: params.current,
            limit: params.pageSize,
            ...params
          })
          const data: Item[] = res.data.list.map((item: Post) => {
    
            
            return {
              post_id: item.post_id,
              user_id: item.user_id,
              theme_id: item.theme_id,
              status: item.status,
              title: item.title,
              description: item.description,
              duration_day: item.duration_day,

              estimated_expense: item.estimated_expense,
              gender_requirement: item.gender_requirement,
              payment_method: item.payment_method,
              start_location: item.start_location,
              end_location: item.end_location,
              team_size: item.team_size,
              comment_count: item.comment_count,
              like_count: item.like_count,
              join_count: item.join_count,
              images: item.images,
              itinerary: item.itinerary_images,
              created_at: item.created_at
            }
          })
          return {
            data: data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: res.code === 200,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.data.totalCount
          }
        }}
        toolBarRender={() => [
          // 切换开关
          <Switch
            defaultChecked={isRowSelect}
            checkedChildren="开启批量操作"
            unCheckedChildren="关闭批量操作"
            onChange={() => setIsRowSelect(!isRowSelect)}
          />
        ]}
        tableAlertRender={({ selectedRowKeys }) => {
          return (
            <Space size={24}>
              <span>已选 {selectedRowKeys.length} 项</span>
            </Space>
          )
        }}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
          return (
            <>
              <Space size={16}>
                <Button type="primary" danger onClick={() => handelDelete(selectedRowKeys)}>
                  批量删除
                </Button>
                <Button type="primary" onClick={() => handleReview(selectedRows)}>
                  批量通过审批
                </Button>
                <Button type="primary" onClick={() => handleReviewDown(selectedRows)}>
                  批量下架
                </Button>
                <Button onClick={onCleanSelected}>取消选择</Button>
              </Space>
            </>
          )
        }}
      />
    </>
  )
}

export default GroupPostManagePage

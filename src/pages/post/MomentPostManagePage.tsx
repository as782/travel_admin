// 动态管理
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch, Table, message } from 'antd'
import React from 'react'

import { Moment } from '@/api/post/types'
import {
  addRecommendRequest,
  deleteMomentRequest,
  getMomentListRequest,
  offlineMomentRequest,
  passMomentReviewRequest,
  rejectMomentReviewRequest
} from '@/api/post'
import { useNavigate } from 'react-router-dom'
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

export type Item = {
  dynamic_post_id: number
  user_id: number
  status: number
  content: string
  comment_count: number
  like_count: number
  images: string[]
  created_at: string
}

const staticColumns: ProColumns<Item>[] = [
  {
    title: '动态ID',
    dataIndex: 'dynamic_post_id',
    valueType: 'text',
    copyable: true,
    width: 100
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    valueType: 'text',
    copyable: true,
    width: 100
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
    ),
    width: 100
  },

  {
    title: '内容',
    dataIndex: 'content',
    valueType: 'text',
    ellipsis: true,
    hideInSearch: true
  },

  {
    title: '评论数',
    dataIndex: 'comment_count',
    valueType: 'text',
    hideInSearch: true,
    width: 150
  },
  {
    title: '点赞数',
    dataIndex: 'like_count',
    valueType: 'text',
    hideInSearch: true,
    width: 150
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
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 150,
    copyable: true,
    hideInSearch: true
  }
]
const MomentPostManagePage: React.FC = () => {
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
                navigate(`/post/momentDetail/${record.dynamic_post_id}`, {
                  state: { record: record }
                })
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
                handelRecommend(record.dynamic_post_id)
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
                handelDelete([record.dynamic_post_id])
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
     
      await addRecommendRequest({ id: postId, type: 'moment' })
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
    const params = { ids: selectedRows.map((item) => item.dynamic_post_id) }
    try {
      // 处理审批逻辑
      await rejectMomentReviewRequest(params)
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
    const params = { ids: selectedRows.map((item) => item.dynamic_post_id) }
    try {
      // 处理审批逻辑
      await passMomentReviewRequest(params)
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
    const params = { ids: selectedRows.map((item) => item.dynamic_post_id) }
    try {
      // 处理审批逻辑
      await offlineMomentRequest(params)
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
      await deleteMomentRequest({ ids: deleteIds })

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
        rowKey={'dynamic_post_id'}
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
          const res = await getMomentListRequest({
            page: params.current,
            limit: params.pageSize,
            ...params
          })
          const data: Item[] = res.data.list.map((item: Moment) => {
            return {
              dynamic_post_id: item.dynamic_post_id,
              user_id: item.user_id,
              content: item.content,
              status: item.status,
              comment_count: item.comment_count,
              like_count: item.like_count,
              images: item.images,
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
            <Space size={16}>
              <Button type="primary" danger onClick={() => handelDelete(selectedRowKeys)}>
                批量删除
              </Button>
              <Button type="primary" onClick={() => handleReview(selectedRows)}>
                批量审批
              </Button>
              <Button type="primary" onClick={() => handleReviewDown(selectedRows)}>
                批量下架
              </Button>
              <Button onClick={onCleanSelected}>取消选择</Button>
            </Space>
          )
        }}
      />
    </>
  )
}

export default MomentPostManagePage

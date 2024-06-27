import React from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch, Table, message } from 'antd'
import { RecomentdPostOrMoment } from '@/api/post/types'
import { deleteRecommendRequest, getRecommendListRequest } from '@/api/post'

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

export type Item = {
  id: number
  user_id: number
  status: number
  type: 'team' | 'moment' // 动态/组队
  comment_count: number
  like_count: number
  join_count?: number
  created_at: string
}

const staticColumns: ProColumns<Item>[] = [
  {
    title: '动态/组队ID',
    dataIndex: 'id',
    valueType: 'text',
    copyable: true,
    width: 100
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    valueType: 'text',
    copyable: true,
    width: 100,
    hideInSearch: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'text',
    valueEnum: {
      0: { text: '未通过审批', status: 'Error' },
      1: { text: '通过审批', status: 'Success' }
    },
    hideInSearch: true,
    render: (_, record) => (
      <>
        {record.status === 0 ? (
          <span className="text-red-500">
            <CloseCircleOutlined />
            未通过审批
          </span>
        ) : record.status === 1 ? (
          <span className="text-green-500">
            <CheckCircleOutlined />
            通过审批
          </span>
        ) : (
          ''
        )}
      </>
    ),
    width: 100
  },
  {
    title: '类型',
    dataIndex: 'type',
    valueType: 'text',
    valueEnum: {
      team: { text: '组队帖子', status: 'Error' },
      moment: { text: '动态', status: 'Success' }
    },
    width: 100
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
    title: '加入人数',
    dataIndex: 'join_count',
    valueType: 'text',
    hideInSearch: true,
    width: 150
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

const ReviewManagePage: React.FC = () => {
  const [isRowSelect, setIsRowSelect] = React.useState(false)
  const tableActionRef = React.useRef<any>()

  const columns: ProColumns<Item>[] = [
    ...staticColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="primary"
          danger
          key="delete"
          onClick={() => {
            handleDelete([record])
          }}
        >
          取消推荐
        </Button>
      ],
      align: 'center',
      fixed: 'right'
    }
  ]

  const handleDelete = async (rows: Item[]) => {
    try {
      const params = rows.map((item) => {
        return {
          id: item.id,
          type: item.type
        }
      })
      const res = await deleteRecommendRequest(params)
      if (res.code === 200) {
        message.success('取消推荐成功')
      } else {
        message.error('取消推荐失败')
      }
    } catch (error) {
      message.error('取消推荐失败')
    } finally {
      tableActionRef.current?.reloadAndRest?.()
    }
  }

  return (
    <>
      <div>首页推荐管理</div>
      <ProTable<Item>
        columns={columns}
        rowKey={'id'}
        scroll={{ x: 1300 }}
        bordered
        actionRef={tableActionRef}
        rowSelection={
          isRowSelect
            ? {
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                defaultSelectedRowKeys: [1]
              }
            : isRowSelect
        }
        request={async (params) => {
          const res = await getRecommendListRequest({
            page: params.current,
            limit: params.pageSize,
            ...params
          })
          const data: Item[] = res.data.list.map((item: RecomentdPostOrMoment) => {
            return {
              id: item.id,
              user_id: item.user_id,
              type: item.type,
              status: item.status,
              comment_count: item.comment_count,
              like_count: item.like_count,
              join_count: item.join_count,
              created_at: item.created_at
            }
          })
          return {
            data: data,
            success: res.code === 200,
            total: res.data.totalCount
          }
        }}
        toolBarRender={() => [
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
        tableAlertOptionRender={({ selectedRows, onCleanSelected }) => {
          return (
            <Space size={16}>
              <Button type="primary" danger onClick={() => handleDelete(selectedRows)}>
                批量取消推荐
              </Button>
              <Button onClick={onCleanSelected}>取消选择</Button>
            </Space>
          )
        }}
      />
    </>
  )
}

export default ReviewManagePage

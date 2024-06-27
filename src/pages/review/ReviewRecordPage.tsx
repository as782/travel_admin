import React from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch, Table, message } from 'antd'

import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { deleteReviewRequest, getReviewListRequest } from '@/api/review'
import { IReview } from '@/api/review/types'

export type Item = {
  id: number
  post_id: number
  admin_id: number
  status: number
  type: 'team' | 'moment' // 动态/组队
  created_at: string
}

const staticColumns: ProColumns<Item>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    copyable: true,
    width: 100
  },
  {
    title: '管理员ID',
    dataIndex: 'admin_id',
    valueType: 'text',
    copyable: true,
    width: 100
  },
  {
    title: '帖子ID',
    dataIndex: 'post_id',
    valueType: 'text',
    copyable: true,
    width: 100
  },
  {
    title: '审批后状态',
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
    title: '帖子类型',
    dataIndex: 'type',
    valueType: 'text',
    valueEnum: {
      team: { text: '组队帖子', status: 'Error' },
      moment: { text: '动态', status: 'Success' }
    },
    width: 100
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

const ReviewRecordPage: React.FC = () => {
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
          删除记录
        </Button>
      ],
      width:100,
      align: 'center',
      fixed: 'right'
    }
  ]

  const handleDelete = async (rows: Item[]) => {
    try {
      const params = rows.map((item) => item.id)
      const res = await deleteReviewRequest({ids:params})
      if (res.code === 200) {
        message.success('成功')
      } else {
        message.error('失败')
      }
    } catch (error) {
      message.error('失败')
    } finally {
      tableActionRef.current?.reloadAndRest?.()
    }
  }

  return (
    <>
      <div>审核管理</div>
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
          const res = await getReviewListRequest({
            page: params.current,
            limit: params.pageSize,
            ...params
          })
          const data: Item[] = res.data.list.map((item: IReview) => {
            return {
              id: item.id,
              admin_id: item.admin_id,
              type: item.type,
              status: item.status,
              post_id: item.post_id,
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
                批量删除记录
              </Button>
              <Button onClick={onCleanSelected}>取消选择</Button>
            </Space>
          )
        }}
      />
    </>
  )
}

export default ReviewRecordPage

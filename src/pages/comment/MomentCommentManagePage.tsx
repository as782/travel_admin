import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch, Table, message } from 'antd'
import React from 'react'
import { deleteMomentComment, getMomentCommentList } from '@/api/comment'
import { MomentComment } from '@/api/comment/types'

export type Item = {
  comment_id: number
  user_id: number
  nickname: string
  avatar_url: string
  content: string
  dynamic_post_id: number
  created_at: string
}

const staticColumns: ProColumns<Item>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    align: 'center'
  },
  {
    title: '评论ID',
    dataIndex: 'comment_id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable: true,
    hideInSearch: true
  },
  {
    title: '评论内容',
    dataIndex: 'content',
    valueType: 'text',
    hideInSearch: true,
    width: 250,
    editable: false
  },
  {
    title: '动态ID',
    dataIndex: 'dynamic_post_id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable: true
  },
  {
    title: '发布用户ID',
    dataIndex: 'user_id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable: true
  },
  {
    title: '发布昵称',
    dataIndex: 'nickname',
    valueType: 'text',
    width: 120,
    editable: false,
    hideInSearch: true
  },
  {
    title: '头像',
    dataIndex: 'avatar_url',
    valueType: (item: any) => {
      return {
        type: 'image',
        src: item.avatar_url,
        width: 100,
        height: 100
      }
    },
    width: 120,
    hideInSearch: true
  },
  {
    title: '发布时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 100,
    editable: false,
    hideInSearch: true
  }
]
const MomentCommentManagePage: React.FC = () => {
  const [isRowSelect, setIsRowSelect] = React.useState(false)
  const tableActionFef = React.useRef<any>()
  const columns: ProColumns<Item>[] = [
    ...staticColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Button
          type="primary"
          danger
          key="delete"
          onClick={() => {
            // 处理删除逻辑
            handelDelete([record.comment_id])
          }}
        >
          删除
        </Button>
      ),
      width: 20,
      align: 'center',
      fixed: 'right'
    }
  ]

  const handelDelete = async (selectedRowKeys: React.Key[]) => {
    // 处理删除逻辑

    const deleteIds = selectedRowKeys.map(Number)
    await deleteMomentComment({ ids: deleteIds })
    tableActionFef.current.reload()
    // 删除成功后，清除选中项
    message.success('删除成功')
    tableActionFef.current.clearSelected()
  }
  return (
    <>
      <div>主题管理</div>
      <ProTable<Item>
        columns={columns}
        rowKey={'comment_id'}
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
          const res = await getMomentCommentList({
            page: params.current,
            limit: params.pageSize,

            ...params
          })
          const data: Item[] = res.data.list.map((item: MomentComment) => {
            return {
              comment_id: item.comment_id,
              user_id: item.userInfo.user_id,
              nickname: item.userInfo.nickname,
              avatar_url: item.userInfo.avatar_url,
              dynamic_post_id: item.dynamic_post_id,
              content: item.content,
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
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={16}>
              <Button type="primary" danger onClick={() => handelDelete(selectedRowKeys)}>
                批量删除
              </Button>
              <Button onClick={onCleanSelected}>取消选择</Button>
            </Space>
          )
        }}
      />
    </>
  )
}

export default MomentCommentManagePage

import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch, Table, Tag, message } from 'antd'
import React from 'react'
import { Message, MessageType } from '@/api/message/types'
import { UserCard } from '@/api/user/types'
import { deleteMessageRequest, getMessageListRequest } from '@/api/message'

export type Item = {
  id: number
  senderInfo: UserCard & { type: 'admin' | 'user' }
  receiverInfo: UserCard & { type: 'admin' | 'user' }
  content: string
  type: MessageType
  related_id: number
  comment_id: number
  like_id: number
  created_at: string
}
// 定义消息类型枚举与对应的颜色
const MessageTypeEnum = {
  [MessageType.PRIVATE_MESSAGE]: { text: <Tag color="blue">私信</Tag> },
  [MessageType.DYNAMIC_POST_COMMENT]: { text: <Tag color="green">动态评论</Tag> },
  [MessageType.DYNAMIC_POST_LIKE]: { text: <Tag color="volcano">动态点赞</Tag> },
  [MessageType.TEAM_ACTIVITY_POST_COMMENT]: {
    text: <Tag color="geekblue">组队评论</Tag>
  },
  [MessageType.TEAM_ACTIVITY_POST_LIKE]: { text: <Tag color="orange">组队点赞</Tag> },
  [MessageType.ADMIN_NOTIFICATION]: { text: <Tag color="red">管理员通知</Tag> },
  [MessageType.FOLLOW_NOTIFICATION]: { text: <Tag color="purple">关注通知</Tag> }
}
// 修改列定义
const staticColumns: ProColumns<Item>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    align: 'center'
  },
  {
    title: '消息ID',
    dataIndex: 'id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable: true
  },
  {
    title: '消息类型',
    dataIndex: 'type',
    valueEnum: MessageTypeEnum,
    width: 120,
    editable: false
  },
  {
    title: '消息内容',
    dataIndex: 'content',
    valueType: 'text',
    hideInSearch: true,
    width: 250,
    editable: false
  },
  {
    title: '相关ID(动态ID/组队ID/用户ID)',

    dataIndex: 'related_id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable: true,
   
  },
  {
    title: '发送用户ID',
    dataIndex: ['senderInfo','user_id'],
    valueType: 'text',
    render: (_, record) => record.senderInfo.user_id,
    width: 120,
    editable: false,
    copyable: true
  },
  {
    title: '发送昵称',
    dataIndex: 'senderInfo',
    valueType: 'text',
    render: (_, record) => record.senderInfo.nickname,
    width: 120,
    editable: false,
    hideInSearch: true
  },
  {
    title: '发送用户类型',
    dataIndex: ['senderInfo', 'type'],
    valueType: 'text',
    valueEnum: {
      user: { text: <Tag color="green">用户</Tag> },
      admin: { text: <Tag color="red">管理员</Tag> }
    },
    width: 120,
    editable: false,
    hideInSearch: true
  },
  {
    title: '接收用户ID',
    dataIndex: ['receiverInfo', 'user_id'],
    valueType: 'text',

    width: 120,
    editable: false,
    copyable: true
  },
  {
    title: '接收昵称',
    dataIndex: ['receiverInfo', 'nickname'],
    valueType: 'text',

    width: 120,
    editable: false,
    hideInSearch: true
  },
  {
    title: '接收用户类型',
    dataIndex: ['receiverInfo', 'type'],
    valueType: 'text',
    valueEnum: {
      user: { text: <Tag color="green">用户</Tag> },
      admin: { text: <Tag color="red">管理员</Tag> }
    },
    width: 120,
    editable: false,
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 150,
    editable: false,
    hideInSearch: true
  }
]

const MessageManagePage: React.FC = () => {
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
            handelDelete([record.id])
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
 
    const deleteIds = selectedRowKeys.map(Number)
    await deleteMessageRequest({ids:deleteIds})
    tableActionFef.current.reload()
    message.success('删除成功')
  }
  return (
    <>
      <div>消息管理</div>
      <ProTable<Item>
        columns={columns}
        rowKey={'id'}
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
          const res = await getMessageListRequest({
            page: params.current,
            limit: params.pageSize,
            ...params
          })
          const data: Item[] = res.data.list.map((item: Message) => {
            return {
              id: item.id,
              senderInfo: item.senderInfo,
              receiverInfo: item.receiverInfo,
              content: item.content,
              type: item.type,
              related_id: item.related_id,
              comment_id: item.comment_id,
              like_id: item.like_id,
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

export default MessageManagePage

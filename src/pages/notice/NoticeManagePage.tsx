import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, Modal, Space, Switch, Table, message } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { useCallback, useRef, useState } from 'react'
import ComForm from './components/ComForm'
import { addNoticeRequest, deleteNoticeRequest, getNoticeListRequest } from '@/api/message'
import { Notification } from '@/api/message/types'
import useLoginStore from '@stores/login'

export type Item = {
  id: number
  admin_id: number
  nickname: string
  avatar_url: string
  content: string
  created_at: string
}
type FormRef = {
  form: FormInstance<any>
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
    title: '通知ID',
    dataIndex: 'id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable: true
  },
  {
    title: '通知内容',
    dataIndex: 'content',
    valueType: 'text',
 
  },
  {
    title: '发布用户ID',
    dataIndex: 'admin_id',
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
    copyable: true,
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
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 100,
    editable: false,
    hideInSearch: true
  }
]
const NoticeManagePage: React.FC = () => {
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

  //  控制添加的模态框相关
  const [openAddModel, setopenAddModel] = useState(false)
  const [addConfirmLoading, setaddConfirmLoading] = useState(false)
  const addFormRef = useRef<FormRef | null>(null)
  const { userInfo } = useLoginStore()
  const handleAdd = useCallback(async () => {
    try {
      const values = await addFormRef.current?.form.validateFields()
      setaddConfirmLoading(true)

      await addNoticeRequest({ admin_id: userInfo?.userId, content: values.content })
      tableActionFef.current.reload()
      message.success('添加成功')
    } catch (error) {
      message.error('添加失败')
    } finally {
      setaddConfirmLoading(false)
      setopenAddModel(false)
    }
  }, [addFormRef, userInfo])

  const handelDelete = async (selectedRowKeys: React.Key[]) => {
    // 处理删除逻辑

    const deleteIds = selectedRowKeys.map(Number)
    try {
      await deleteNoticeRequest({ ids: deleteIds })
      tableActionFef.current.reload()
      message.success('删除成功')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div>主题管理</div>
      <ProTable<Item>
        columns={columns}
        rowKey={'id'}
        cardBordered
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
          const res = await getNoticeListRequest({
            page: params.current,
            limit: params.pageSize,
            ...params
          })
          const data: Item[] = res.data.list.map((item: Notification) => {
            return {
              id: item.id,
              admin_id: item.userInfo.admin_id,
              nickname: item.userInfo.nickname,
              avatar_url: item.userInfo.avatar_url,
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
          <Button
            key="button"
            type="primary"
            onClick={() => {
              setopenAddModel(true)
            }}
          >
            添加
          </Button>,
          // <Button key="button" type="primary" onClick={() => setIsRowSelect(!isRowSelect)}>
          //   批量操作
          // </Button>
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
      <Modal
        title="添加公告"
        open={openAddModel}
        onOk={handleAdd}
        destroyOnClose
        confirmLoading={addConfirmLoading}
        onCancel={() => setopenAddModel(false)}
        width={800}
      >
        <ComForm ref={addFormRef} />
      </Modal>
    </>
  )
}

export default NoticeManagePage

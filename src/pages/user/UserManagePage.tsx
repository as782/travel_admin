// 用户管理界面
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { addUserRequest, deleteUserRequest, getUserListRequest } from '@/api/user'
import React, { useCallback, useRef, useState } from 'react'
import { Button, FormInstance, Modal, Space, Table, message } from 'antd'
import UserFrom from './components/UserForm'
import { updateUserRequest } from '@/api/user'
import { ManOutlined, QuestionOutlined, WomanOutlined } from '@ant-design/icons'
export type UserItem = {
  user_id: number
  avatar_url: string
  nickname: string
  username: string
  password: string
  gender: string
  birthday: string
  contact_email: string
  contact_phone: string
  region_name: string
  region_code: string
  bio: string
  created_at: string
  status: number
}

const staticColumns: ProColumns<UserItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    align: 'center'
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    valueType: 'text',
    copyable: true,
    width: 100
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
    title: '昵称',
    dataIndex: 'nickname',
    valueType: 'text',
    width: 150,
    ellipsis: true
  },
  {
    title: '用户名',
    dataIndex: 'username',
    valueType: 'text',
    width: 150,
    ellipsis: true
  },
  {
    title: '密码',
    dataIndex: 'password',
    valueType: 'text',
    width: 150,
    ellipsis: true,
    hideInSearch: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'text',
    valueEnum: {
      0: { text: '禁用', status: 'Error' },
      1: { text: '启用', status: 'Success' }
    },

    width: 100
  },
  {
    title: '性别',
    dataIndex: 'gender',

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
    width: 80
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    valueType: 'date',
    width: 120,
    hideInSearch: true
  },
  {
    title: '联系邮箱',
    dataIndex: 'contact_email',
    valueType: 'text',
    ellipsis: true,
    colSize: 2,
    width: 200,
    copyable: true
  },
  {
    title: '联系电话',
    dataIndex: 'contact_phone',
    valueType: 'text',
    ellipsis: true,
    colSize: 2,
    width: 150,
    copyable: true
  },
  {
    title: '地区名称',
    dataIndex: 'region_name',
    valueType: 'text',
    width: 120,
    ellipsis: true,
    hideInSearch: true
  },
  {
    title: '地区编码',
    dataIndex: 'region_code',
    valueType: 'text',
    width: 120,
    ellipsis: true,
    hideInSearch: true
  },
  {
    title: '个性签名',
    dataIndex: 'bio',
    valueType: 'text',
    width: 150,
    ellipsis: true,
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 180,
    hideInSearch: true
  }
]
// 定义 UserForm 的引用类型
interface AdminFormRef {
  form: FormInstance<any>
}

const UserManagePage: React.FC = () => {
  const tableActionFef = useRef<ActionType>(null)

  const columns: ProColumns<UserItem>[] = [
    ...staticColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="primary"
          key="editable"
          onClick={() => {
            setopenEditModel(true)
            setCurrentEditItem(record)
          }}
        >
          编辑
        </Button>,
        <Button
          type="primary"
          danger
          key="delete"
          onClick={() => {
            // 处理删除逻辑
            handelDelete([record.user_id])
          }}
        >
          删除
        </Button>
      ],
      width: 200,
      align: 'center',
      fixed: 'right'
    }
  ]
  const handelDelete = useCallback(async (selectedRowKeys: React.Key[]) => {
    try {
      const deleteIds = selectedRowKeys.map(Number)
      await deleteUserRequest(deleteIds)
      message.success('成功')
      tableActionFef.current?.reload()
    } catch (error) {
      message.error('失败')
    }
  }, [])
  //   是否批量显示选择
  const [isRowSelect, setIsRowSelect] = useState(false)

  //  控制添加的模态框相关
  const [openAddModel, setopenAddModel] = useState(false)
  const [addConfirmLoading, setaddConfirmLoading] = useState(false)
  const userAddFormRef = useRef<AdminFormRef | null>(null)
  const handleAdd = useCallback(async () => {
    try {
      const values = await userAddFormRef.current?.form.validateFields()
      setaddConfirmLoading(true)
      await addUserRequest(values)
      setopenAddModel(false)
      tableActionFef.current?.reload()
      message.success('添加用户成功')
    } catch (error) {
      message.error('添加失败')
    } finally {
      setaddConfirmLoading(false)
    }
  }, [userAddFormRef])

  // 编辑的模态框相关
  const [openEditModel, setopenEditModel] = useState(false)
  const [editConfirmLoading, seteditConfirmLoading] = useState(false)
  const [currentEditItem, setCurrentEditItem] = useState<UserItem>()

  const userFormRef = useRef<AdminFormRef | null>(null)

  const handleEdit = useCallback(async () => {
    try {
      const values = await userFormRef.current?.form.validateFields()
      seteditConfirmLoading(true)
      await updateUserRequest(values)
      setopenEditModel(false)
      tableActionFef.current?.reload()
      message.success('编辑成功')
    } catch (error) {
      message.error('编辑失败')
    } finally {
      seteditConfirmLoading(false)
    }
  }, [userFormRef])

  return (
    <>
      <h1>用户管理界面</h1>
      <ProTable<UserItem>
        scroll={{ x: 1300 }}
        columns={columns}
        rowKey={'user_id'}
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
          const paramsCopy = { ...params }
          delete paramsCopy.current
          delete paramsCopy.pageSize
          const res = await getUserListRequest({
            page: params.current,
            limit: params.pageSize,
            ...paramsCopy
          })
          return {
            data: res.data.list,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: res.code === 200,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.data.totalCount
          }
        }}
        toolBarRender={() => [
          <Button key="button" type="primary" onClick={() => setopenAddModel(true)}>
            添加用户
          </Button>,
          <Button key="button" type="primary" onClick={() => setIsRowSelect(!isRowSelect)}>
            批量操作
          </Button>
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
        title="添加用户"
        open={openAddModel}
        onOk={handleAdd}
        destroyOnClose
        confirmLoading={addConfirmLoading}
        onCancel={() => setopenAddModel(false)}
        width={800}
      >
        <UserFrom ref={userAddFormRef} />
      </Modal>
      <Modal
        title="编辑用户"
        open={openEditModel}
        onOk={handleEdit}
        destroyOnClose
        confirmLoading={editConfirmLoading}
        onCancel={() => setopenEditModel(false)}
        width={800}
      >
        <UserFrom ref={userFormRef} initialValues={currentEditItem} />
      </Modal>
    </>
  )
}
export default UserManagePage

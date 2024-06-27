// 用户管理界面
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { addAdminRequest, deleteAdminRequest, getAdminListRequest, updateAdminRequest } from '@/api/user'
import React, { useCallback, useRef, useState } from 'react'
import { Button, FormInstance, Modal, Space, Table, message } from 'antd'
import AdminForm from './components/AdminForm'
 
import { ManOutlined, QuestionOutlined, WomanOutlined } from '@ant-design/icons'
export type AdminItem = {
  admin_id: number
  avatar_url: string
  nickname: string
  username: string
  password: string
  gender: string
  birthday: string
  role: string
  created_at: string
  status: number
}

const staticColumns: ProColumns<AdminItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    align: 'center'
  },
  {
    title: '用户ID',
    dataIndex: 'admin_id',
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
    title: '角色',
    dataIndex: 'role',
    valueType: 'text',
    valueEnum: {
      admin: {
        text: '管理员',
        status: 'Success'
      },
      superAdmin: {
        text: '超级管理员',
        status: 'Default'
      }
    },
    width: 100
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
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 180,
    hideInSearch: true
  }
]
// 定义 UserForm 的引用类型
interface UserFormRef {
  form: FormInstance<any>
}

const AdminManagePage: React.FC = () => {
  const tableActionFef = useRef<ActionType>(null)

  const columns: ProColumns<AdminItem>[] = [
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
            handelDelete([record.admin_id])
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
      await deleteAdminRequest(deleteIds)
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
  const userAddFormRef = useRef<UserFormRef | null>(null)
  const handleAdd = useCallback(async () => {
    try {
      const values = await userAddFormRef.current?.form.validateFields()
      setaddConfirmLoading(true)
      await addAdminRequest(values)

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
  const [currentEditItem, setCurrentEditItem] = useState<AdminItem>()

  const userFormRef = useRef<UserFormRef | null>(null)

  const handleEdit = useCallback(async () => {
    try {
      const values = await userFormRef.current?.form.validateFields()
      seteditConfirmLoading(true)
      await updateAdminRequest(values)
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
      <ProTable<AdminItem>
        scroll={{ x: 1300 }}
        columns={columns}
        rowKey={'admin_id'}
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
          const res = await getAdminListRequest({
            page: params.current,
            limit: params.pageSize,
            ...params
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
        <AdminForm ref={userAddFormRef} />
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
        <AdminForm ref={userFormRef} initialValues={currentEditItem} />
      </Modal>
    </>
  )
}
export default AdminManagePage

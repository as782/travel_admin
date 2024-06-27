// 标签管理
import { addThemeRequest, getThemeListRequest, updateThemeRequest } from '@/api/post'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { randomColor } from '@utils/tool'
import { Button, Modal, Space, Table, Tag, message } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { useCallback, useRef, useState } from 'react'
import ThemeForm from './components/ThemeForm'
export type ThemeItem = {
  theme_id: number
  theme_name: string
  created_at: string
}
type FormRef = {
  form: FormInstance<any>
}
const staticColumns: ProColumns<ThemeItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    align: 'center'
  },
  {
    title: '主题id',
    dataIndex: 'theme_id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable:true
  },
  {
    title: '主题名称',
    dataIndex: 'theme_name',
    render: (_, record) => (
      <>
        <Tag color={randomColor()}>{record.theme_name}</Tag>
      </>
    ),
    width: 120,
    copyable:true
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 180,
    editable: false
  }
]
const ThemeManagePage: React.FC = () => {
  const [isRowSelect, setIsRowSelect] = React.useState(false)
  const tableActionFef = React.useRef<any>()
  const columns: ProColumns<ThemeItem>[] = [
    ...staticColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, __, action) => [
        <Button
          type="primary"
          key="editable"
          onClick={() => {
            action?.startEditable(record.theme_id)
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
            handelDelete([record.theme_id])
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

  //  控制添加的模态框相关
  const [openAddModel, setopenAddModel] = useState(false)
  const [addConfirmLoading, setaddConfirmLoading] = useState(false)
  const ThemeAddFormRef = useRef<FormRef | null>(null)
  const handleAdd = useCallback(async () => {
    try {
      const values = await ThemeAddFormRef.current?.form.validateFields()
      setaddConfirmLoading(true)
      await addThemeRequest(values)
      message.success('添加用户成功')
    } catch (error) {
      message.error('添加失败')
    } finally {
      setaddConfirmLoading(false)
    }
  }, [ThemeAddFormRef])

  const handelDelete = (selectedRowKeys: React.Key[]) => {
    // 处理删除逻辑
    console.log(selectedRowKeys)
  }
  return (
    <>
      <div>主题管理</div>
      <ProTable<ThemeItem>
        columns={columns}
        rowKey={'theme_id'}
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
          const res = await getThemeListRequest({
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
          <Button
            key="button"
            type="primary"
            onClick={() => {
              setopenAddModel(true)
            }}
          >
            添加主题
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
        editable={{
          type: 'single',
          actionRender: (_, __, dom) => [dom.save, dom.cancel],
          onSave: async (_, row) => {
            const params = {
              tag_id: row.theme_id,
              tag_name: row.theme_name
            }
            try {
              const res = await updateThemeRequest(params)
              if (res.code === 200) {
                message.success('更新成功')
              }
            } catch (error) {
              message.error('更新失败')
            }
          }
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
        <ThemeForm ref={ThemeAddFormRef} />
      </Modal>
    </>
  )
}
export default ThemeManagePage

// 标签管理
import { addTagRequest, deleteTagRequest, getTagListRequest, updateTagRequest } from '@/api/user'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { randomColor } from '@utils/tool'
import { Button, Modal, Space, Table, Tag, message } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { useCallback, useRef, useState } from 'react'
import TagForm from './components/TagForm'
export type TagItem = {
  tag_id: number
  tag_name: string
  created_at: string
}
type TagFormRef = {
  form: FormInstance<any>
}
const staticColumns: ProColumns<TagItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    align: 'center'
  },
  {
    title: '标签id',
    dataIndex: 'tag_id',
    valueType: 'text',
    width: 120,
    editable: false,
    copyable: true
  },
  {
    title: '标签名称',
    dataIndex: 'tag_name',
    render: (_, record) => (
      <>
        <Tag color={randomColor()}>{record.tag_name}</Tag>
      </>
    ),
    width: 120
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    width: 180,
    editable: false,
    hideInSearch:true
  }
]
const TagsManagePage: React.FC = () => {
  const [isRowSelect, setIsRowSelect] = React.useState(false)
  const tableActionFef = React.useRef<any>()
  const columns: ProColumns<TagItem>[] = [
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
            action?.startEditable(record.tag_id)
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
            handelDelete([record.tag_id])
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
  const TagAddFormRef = useRef<TagFormRef | null>(null)
  const handleAdd = useCallback(async () => {
    try {
      const values = await TagAddFormRef.current?.form.validateFields()
      setaddConfirmLoading(true)
      await addTagRequest(values)
      setopenAddModel(false)
      tableActionFef.current?.reload()
      message.success('添加成功')
    } catch (error) {
      message.error('添加失败')
    } finally {
      setaddConfirmLoading(false)
    }
  }, [TagAddFormRef])

  const handelDelete = async (selectedRowKeys: React.Key[]) => {
    // 处理删除逻辑

    try {
      const deleteIds = selectedRowKeys.map(Number)
      await deleteTagRequest(deleteIds)
      message.success('成功')
      tableActionFef.current?.reload()
    } catch (error) {
      message.error('失败')
    }
  }
  return (
    <>
      <div>标签管理</div>
      <ProTable<TagItem>
        columns={columns}
        rowKey={'tag_id'}
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
          const res = await getTagListRequest({
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
            添加标签
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
              tag_id: row.tag_id,
              tag_name: row.tag_name
            }
            try {
              const res = await updateTagRequest(params)
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
        <TagForm ref={TagAddFormRef} />
      </Modal>
    </>
  )
}
export default TagsManagePage

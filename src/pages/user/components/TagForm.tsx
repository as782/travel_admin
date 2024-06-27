/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Form, Input } from 'antd'
import type { TagItem } from '../TagsManagePage'
import { FormInstance } from 'antd/lib/form'

interface TagFormProps {
  initialValues?: Partial<TagItem>
}

interface TagFormRef {
  form: FormInstance<any>
}

const TagForm: React.ForwardRefRenderFunction<TagFormRef, TagFormProps> = (
  { initialValues },
  ref
) => {
  const [form] = Form.useForm()

  // 向外暴露ref
  React.useImperativeHandle(ref, () => ({
    form
  }))

  return (
    <Form
      form={form}
      initialValues={initialValues}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      {/* <Form.Item label="标签ID" name="username">
        <Input disabled />
      </Form.Item> */}

      <Form.Item label="标签名称" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      {/* <Form.Item label="创建时间" name="created_at">
        <Input disabled />
      </Form.Item> */}
    </Form>
  )
}

export default React.forwardRef(TagForm)

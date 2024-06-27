/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Form, Input } from 'antd'
import type { Item } from '../NoticeManagePage'
import { FormInstance } from 'antd/lib/form'

interface FormProps {
  initialValues?: Partial<Item>
}

interface FormRef {
  form: FormInstance<any>
}

const ComForm: React.ForwardRefRenderFunction<FormRef, FormProps> = ({ initialValues }, ref) => {
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
      <Form.Item label="公告内容" name="content" rules={[{ required: true }]}>
        {/* 文本域 */}
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  )
}

export default React.forwardRef(ComForm)

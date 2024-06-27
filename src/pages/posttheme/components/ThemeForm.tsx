/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Form, Input } from 'antd'
import type { ThemeItem } from '../ThemeManagePage'
import { FormInstance } from 'antd/lib/form'

interface ThemeFormProps {
  initialValues?: Partial<ThemeItem>
}

interface ThemeFormRef {
  form: FormInstance<any>
}

const ThemeForm: React.ForwardRefRenderFunction<ThemeFormRef, ThemeFormProps> = (
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
      <Form.Item label="主题名称" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default React.forwardRef(ThemeForm)

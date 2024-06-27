/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Col, Form, Input, Row, Select } from 'antd'
import type { AdminItem } from '../AdminManagePage'
import { FormInstance } from 'antd/lib/form'

interface AdminFormProps {
  initialValues?: Partial<AdminItem>
}

interface AdminFormRef {
  form: FormInstance<any>
}

const UserForm: React.ForwardRefRenderFunction<AdminFormRef, AdminFormProps> = (
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
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="用户ID" name="admin_id">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="昵称" name="nickname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="密码" name="password" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="性别" name="gender">
            <Select defaultValue={'male'}>
              <Select.Option value="male">男</Select.Option>
              <Select.Option value="female">女</Select.Option>
              <Select.Option value="other">未知</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="生日" name="birthday">
             <Input disabled></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="角色" name="role" rules={[{ required: true }]} >
            <Select>
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="superAdmin">超级管理员</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="创建时间" name="created_at">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="状态" name="status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="1">正常</Select.Option>
              <Select.Option value="0">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default React.forwardRef(UserForm)

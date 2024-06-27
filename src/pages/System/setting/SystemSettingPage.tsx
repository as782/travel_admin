import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'

import useLoginStore from '@stores/login'
import { updatePasswordRequest } from '@/api/user'

const SystemSettingPage: React.FC = () => {
  const userInfo = useLoginStore((state) => state.userInfo)
  const { setUserInfo } = useLoginStore()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      // 发送修改密码请求
      const res = await updatePasswordRequest({
        admin_id: userInfo?.userId,
        old_password: values.oldPassword,
        new_password: values.newPassword
      })
      if (res.code === 200) {
        message.success('密码修改成功')
        // 重新登录
        setUserInfo(null)
      } else {
        message.error(res.msg || '密码修改失败')
      }
    } catch (error) {
      console.error('修改密码失败:', error)
    }
    setLoading(false)
  }

  return (
    <>
      <h1>系统设置</h1>
      <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
        <Form
          name="changePasswordForm"
          onFinish={onFinish}
          initialValues={{ userId: userInfo?.userId }}
          autoComplete="off"
        >
          <Form.Item
            name="oldPassword"
            label="旧密码"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input.Password placeholder="请输入旧密码" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default SystemSettingPage

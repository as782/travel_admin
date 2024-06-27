// 简单的登录页，antd 创建
import React from 'react'
import { Form, Input, Button, message, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import useLoginStore from '@stores/login'
import { useNavigate } from 'react-router-dom'
import style from './loginbg.module.scss'
const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const login = useLoginStore((state) => state.login)

  const onFinish = async (values: any) => {
    await login(values)
    // 处理登录逻辑
    navigate('/notice')
    message.success('登录成功')
  }

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center "
      style={{ background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}
    >
      <div className={style['star1']}></div>
      <div className={style['star2']}></div>
      <div className={style['star3']}></div>

      <div className="text-6xl font-bold text-white  m-10  bg-blend-multiply ">
        一起旅行后台管理系统
      </div>

      <Form
        name="normal_login"
        className="w-4/12 p-20 rounded-md shadow-orange-50 shadow-lg bg-white"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" size='large'/>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            size='large'
          />
        </Form.Item>
        <Form.Item>
          {/* <Row>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" className='text-xl w-20'>
                登录
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button type="primary" className='text-xl w-20'>注册</Button>
            </Col>
          </Row> */}
          <Button type="primary" htmlType="submit" className="text-xl  w-full">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage

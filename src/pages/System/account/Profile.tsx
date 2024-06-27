import React from 'react'
import { Avatar, Card, Typography } from 'antd'
import useLoginStore from '@stores/login'

const { Title } = Typography

const Profile: React.FC = () => {
  const userInfo = useLoginStore((state) => state.userInfo)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card style={{ width: 400, textAlign: 'center' }}>
        {userInfo && (
          <>
            <Avatar size={100} src={userInfo.avatar} style={{ marginBottom: 20 }} />
            <Title level={3}>{userInfo.nickname}</Title>
            <p className="w-full h-16 rounded-md text-center  m-2  font-bold  border-b-2">
              用户ID: {userInfo.userId}
            </p>
            <p className="w-full h-16 rounded-md text-center  m-2   font-bold s border-b-2">
              账号: {userInfo.username}
            </p>
            <p className="w-full h-16 rounded-md text-center  m-2  font-bold  border-b-2 ">
              性别: {userInfo.gender}
            </p>
            <p className="w-full h-16 rounded-md text-center  m-2  font-bold  border-b-2 ">
              生日: {userInfo.birthday.slice(0, 10)}
            </p>
          </>
        )}
      </Card>
    </div>
  )
}

export default Profile

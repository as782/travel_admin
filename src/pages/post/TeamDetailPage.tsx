import { Button } from 'antd'
import GroupDetail from './compoments/GroupDetail'
import { useLocation, useNavigate } from 'react-router-dom'

const TeamDetailPage = () => {
  // 获取路由传递的state数据
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      {/* 返回 */}
      <Button onClick={() => navigate(-1)}>返回</Button>
      <GroupDetail data={location.state.record}></GroupDetail>
    </div>
  )
}

export default TeamDetailPage

import MomentDetail from './compoments/MomentDetail'
import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const MomentDetailPage = () => {
  // 获取路由传递的state数据
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      {/* 返回 */}
      <Button onClick={() => navigate(-1)}>返回</Button>
      <MomentDetail data={location.state.record}></MomentDetail>
    </div>
  )
}

export default MomentDetailPage

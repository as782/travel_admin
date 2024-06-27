import React from 'react'
import { Descriptions, Image } from 'antd'
 

interface DetailProps {
  data: {
    post_id: number
    user_id: number
    theme_id: number
    status: number
    title: string
    description: string
    duration_day: number
    estimated_expense: number
    gender_requirement: string
    payment_method: string
    start_location: string
    end_location: string
    team_size: number
    comment_count: number
    like_count: number
    join_count: number
    images: string[]
    itinerary: string
    created_at: string
  }
}

const GroupDetail: React.FC<DetailProps> = ({ data }) => {
  const {
    post_id,
    user_id,
    theme_id,
    status,
    title,
    description,
    duration_day,
    estimated_expense,
    gender_requirement,
    payment_method,
    start_location,
    end_location,
    team_size,
    comment_count,
    like_count,
    join_count,
    images,
    itinerary,
    created_at
  } = data
 
  
  return (
    <div>
      <Descriptions title="详细信息" bordered column={1}>
        <Descriptions.Item label="基本信息">
          <Descriptions bordered layout="vertical">
            <Descriptions.Item label="ID信息">
              <Descriptions bordered layout="vertical">
                <Descriptions.Item label="帖子ID">{post_id}</Descriptions.Item>
                <Descriptions.Item label="用户ID">{user_id}</Descriptions.Item>
                <Descriptions.Item label="主题ID">{theme_id}</Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {status === 1 ? '通过审批' : '未通过审批'}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions bordered layout="vertical">
            <Descriptions.Item label="标题">{title}</Descriptions.Item>
            <Descriptions.Item label="描述">{description}</Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
        <Descriptions.Item label="其他信息">
          <Descriptions bordered>
            <Descriptions.Item label="持续天数">{duration_day}</Descriptions.Item>
            <Descriptions.Item label="预计费用">{estimated_expense}</Descriptions.Item>
            <Descriptions.Item label="性别要求">{gender_requirement}</Descriptions.Item>
            <Descriptions.Item label="付款方式">{payment_method}</Descriptions.Item>
            <Descriptions.Item label="起始位置">{start_location}</Descriptions.Item>
            <Descriptions.Item label="结束位置">{end_location}</Descriptions.Item>
            <Descriptions.Item label="团队规模">{team_size}</Descriptions.Item>
            <Descriptions.Item label="评论数">{comment_count}</Descriptions.Item>
            <Descriptions.Item label="点赞数">{like_count}</Descriptions.Item>
            <Descriptions.Item label="参与数">{join_count}</Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
        <Descriptions.Item label="图片">
          {images.map((imageUrl, index) => (
            <Image key={index} src={imageUrl} width={200} height={200} />
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="行程">
          <Image src={itinerary} width={200} />
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">{created_at}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default GroupDetail

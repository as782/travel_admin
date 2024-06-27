import React from 'react'
import { Descriptions, Image } from 'antd'

interface DetailProps {
  data: {
    dynamic_post_id: number
    user_id: number
    content: string
    status: number // 0: 未通过审批, 1: 通过审批,
    comment_count: number
    like_count: number
    images: string[] // 图片地址
    created_at: string
  }
}

const MomentDetail: React.FC<DetailProps> = ({ data }) => {
  const {
    dynamic_post_id,
    user_id,
    content,
    status,
    comment_count,
    like_count,
    images,
    created_at
  } = data

  return (
    <div>
      <Descriptions title="动态帖子详细信息" bordered column={1}>
        <Descriptions.Item label="基本信息">
          <Descriptions bordered layout="vertical">
            <Descriptions.Item label="ID信息">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="帖子ID">{dynamic_post_id}</Descriptions.Item>
                <Descriptions.Item label="用户ID">{user_id}</Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {status === 1 ? '通过审批' : '未通过审批'}
            </Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
        <Descriptions.Item label="内容">{content}</Descriptions.Item>
        <Descriptions.Item label="其他信息">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="评论数">{comment_count}</Descriptions.Item>
            <Descriptions.Item label="点赞数">{like_count}</Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
        <Descriptions.Item label="图片">
          {images.map((imageUrl, index) => (
            <Image key={index} src={imageUrl} width={200} height={200} />
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">{created_at}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default MomentDetail

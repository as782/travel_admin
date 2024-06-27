import { UserCard } from '../user/types'
export enum MessageType {
  PRIVATE_MESSAGE = 'private_message',
  DYNAMIC_POST_COMMENT = 'dynamic_post_comment',
  DYNAMIC_POST_LIKE = 'dynamic_post_like',
  TEAM_ACTIVITY_POST_COMMENT = 'team_activity_post_comment',
  TEAM_ACTIVITY_POST_LIKE = 'team_activity_post_like',
  ADMIN_NOTIFICATION = 'admin_notification',
  FOLLOW_NOTIFICATION = 'follow_notification'
}
// 定义通知数据类型
export interface Notification {
  id: number
  userInfo: {
    admin_id:number
    nickname:string
    avatar_url:string
  }
  content: string
  created_at: string
}

// `id` int NOT NULL AUTO_INCREMENT,
// `sender_type` enum('user','admin') NOT NULL COMMENT '发送者类型，用户或管理员',
// `sender_id` int NOT NULL COMMENT '发送者ID',
// `receiver_type` enum('user','admin') NOT NULL COMMENT '接收者类型，用户或管理员',
// `receiver_id` int NOT NULL COMMENT '接收者ID',
// `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
// `type` enum('private_message','dynamic_post_comment','dynamic_post_like','team_activity_post_comment','team_activity_post_like','admin_notification','follow_notification') NOT NULL COMMENT '消息类型',
// `related_id` int DEFAULT NULL COMMENT '相关ID，可以是动态帖子ID或组队活动帖子ID',
// `comment_id` int DEFAULT NULL COMMENT '评论ID，与动态帖子评论表或组队活动帖子评论表相关联',
// `like_id` int DEFAULT NULL COMMENT '点赞ID，与动态帖子点赞表或组队活动帖子点赞表相关联',
// `created_at

// type UserCard{
//   user_id: number
//   nickname:string
//   avatar_url:string
// }

// 定义消息数据
export interface Message {
  id: number
  senderInfo: UserCard & { type: 'admin' | 'user' }
  receiverInfo: UserCard & { type: 'admin' | 'user' }
  content: string
  type: MessageType
  related_id: number
  comment_id: number
  like_id: number
  created_at: string
}

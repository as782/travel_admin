/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import ErrorPage from '@components/ErrorPage'
import LoginPage from '@pages/login/LoginPage'
import App from '../App'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { TableOutlined, BarsOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons'

//  通知管理
const NoticeManagePage = lazy(() => import('../pages/notice/NoticeManagePage'))

// 用户管理
// -- 用户列表
// -- 管理员列表
// -- 用户标签
const UserManagePage = lazy(() => import('../pages/user/UserManagePage'))
const TagsManagePage = lazy(() => import('../pages/user/TagsManagePage'))
const AdminManagePage = lazy(() => import('../pages/user/AdminManagePage'))

// 帖子管理
// -- 组队帖管理
// -- 动态帖管理
// -- 帖子推荐管理
// -- 帖子主题管理
const TeamPostManagePage = lazy(() => import('../pages/post/GroupPostManagePage'))
const DynamicPostManagePage = lazy(() => import('../pages/post/MomentPostManagePage'))
const PostRecommendManagePage = lazy(() => import('../pages/recommend/RecomendManagePage'))
const ThemeManagePage = lazy(() => import('../pages/posttheme/ThemeManagePage'))
//  组队帖详情
// 动态帖详情
const TeamPostDetailPage = lazy(() => import('../pages/post/TeamDetailPage'))
const MomentPostDetailPage = lazy(() => import('../pages/post/MomentDetailPage'))

// 消息管理
// -- 消息列表
const MessageManagePage = lazy(() => import('../pages/message/MessageManagePage'))

// 评论管理
// -- 帖子评论
// -- 动态评论
const PostCommentManagePage = lazy(() => import('../pages/comment/PostCommentManagePage'))
const MomentCommentManagePage = lazy(() => import('../pages/comment/MomentCommentManagePage'))

// 审核记录
// -- 帖子审核
const ReviewRecordPage = lazy(() => import('../pages/review/ReviewRecordPage'))

// 系统管理
// -- 个人中心
// -- 系统设置
const Profile = lazy(() => import('../pages/System/account/Profile'))
const SystemSettingManagePage = lazy(() => import('../pages/System/setting/SystemSettingPage'))
const routes = [
  {
    path: '/',
    redirect: '/notice',
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/notice',
            title: '公告管理',
            icon: <NotificationOutlined />,
            element: <NoticeManagePage />
          },

          {
            path: '/user',
            title: '用户管理',
            icon: <UserOutlined />,
            children: [
              {
                path: '/user/list',
                title: '用户列表',
                element: <UserManagePage />
              },
              {
                path: '/user/adminlist',
                title: '管理员列表',
                element: <AdminManagePage />,
                auth: ['superAdmin']
              },
              {
                path: '/user/tags',
                title: '用户标签',
                element: <TagsManagePage />,
                auth: ['superAdmin']
              }
            ]
          },
          {
            path: '/post',
            title: '帖子管理',
            icon: <TableOutlined />,
            children: [
              {
                path: '/post/recommend',
                title: '帖子推荐管理',
                icon: <BarsOutlined />,
                element: <PostRecommendManagePage />
              },
              {
                path: '/post/theme',
                title: '帖子主题管理',
                icon: <TableOutlined />,
                element: <ThemeManagePage />
              },
              {
                path: '/post/team',
                title: '组队帖管理',
                icon: <BarsOutlined />,
                element: <TeamPostManagePage />
              },
              {
                path: '/post/dynamic',
                title: '动态帖管理',
                icon: <BarsOutlined />,
                element: <DynamicPostManagePage />
              },
              {
                path: '/post/teamDetail/:id',
                title: '组队帖详情',
                element: <TeamPostDetailPage />,
                hideInMenu: true
              },
              {
                path: '/post/momentDetail/:id',
                title: '动态帖详情',
                element: <MomentPostDetailPage />,
                hideInMenu: true
              },
              {
                path: '/post/review',
                title: '审核记录',
                icon: <TableOutlined />,
                element: <ReviewRecordPage />
              }
            ]
          },
          {
            path: '/message',
            title: '消息管理',
            icon: <NotificationOutlined />,
            element: <MessageManagePage />
          },
          {
            path: '/comment',
            title: '评论管理',
            icon: <TableOutlined />,
            children: [
              {
                path: '/comment/post',
                title: '帖子评论',
                element: <PostCommentManagePage />
              },
              {
                path: '/comment/moment',
                title: '动态评论',
                element: <MomentCommentManagePage />
              }
            ]
          },

          {
            path: '/system',
            title: '系统管理',
            icon: <TableOutlined />,

            children: [
              {
                path: '/system/account',
                title: '个人中心',
                element: <Profile />
              },
              {
                path: '/system/setting',
                title: '系统设置',
                element: <SystemSettingManagePage />,
                auth: ['superAdmin']
              }
            ]
          },

          {
            path: '*',
            element: <Navigate to="/" replace={true} />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]

export { routes }
const router = createBrowserRouter(routes)
export default router

import React, { Suspense, useState } from 'react'

import { Outlet, useNavigate, NonIndexRouteObject, useLocation, Navigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Layout, Menu, Spin, theme } from 'antd'
import HeaderComp from './components/Header'
import NoAuthPage from '../components/NoAuthPage'
import { routes } from '@routers/index'
import useLoginStore from '@stores/login'
const { Header, Content, Sider } = Layout

type RouteType = NonIndexRouteObject & {
  title: string
  icon: React.ReactElement
  auth: string[]
  hideInMenu?: boolean
  children?: RouteType[]
}
const matchRoute = (path: string, routes: any[]): RouteType | null => {
  // 遍历路由表中的每个路由对象
  for (const route of routes) {
    // 如果当前路由对象的路径与给定路径完全匹配，则返回该路由对象
    if (route.path === path) {
      return route
    }
    // 如果当前路由对象有子路由，并且给定路径是当前路由对象路径的子路径，则递归查找子路由
    if (route.children) {
      const childMatch = matchRoute(path, route.children)
      if (childMatch) {
        return childMatch
      }
    }
  }
  // 如果没有找到匹配的路由对象，则返回 null
  return null
}

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const userInfo = useLoginStore((state) => state.userInfo)

  if (!userInfo) {
    return <Navigate to="/login" replace />
  }

  const currentRoute = matchRoute(pathname, routes)

  const isAuth =
    !currentRoute?.auth ||
    currentRoute?.auth.length === 0 ||
    userInfo.role.some((item: string) => currentRoute?.auth?.includes(item))

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  const getItems: any = (children: RouteType[]) => {
    return children.map((item) => {
      return {
        key: item.index ? '/' : item.path?.startsWith('/') ? item.path : `/${item.path}`,
        icon: item.icon,
        label: item.title,
        children: item.children ? getItems(item.children) : null
      }
    })
  }

  //  挑出   hideMenu  的 如果 有说明 需要隐藏 菜单

  function filterMenu(menuData: any) {
    return menuData
      .map((item: any) => {
        if (item.children) {
          // Recursively filter children
          item.children = filterMenu(item.children)
        }
        // Filter out items with hideMenu set to true
        return !item.hideInMenu ? item : null
      })
      .filter(Boolean)
  }

  const filteredMenuData = filterMenu(routes[0].children![0].children)

  const items: MenuProps['items'] = getItems(
    filteredMenuData.filter((item: any) => item.path !== '*')
  )
  const renderOpenKeys = () => {
    const arr = pathname.split('/').slice(0, -1)
    const result = arr.map((_, index) => '/' + arr.slice(1, index + 1).join('/'))
    return result
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={renderOpenKeys()}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout style={{ maxHeight: '100vh', overflow: 'scroll' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: '0 10px',
            background: colorBgContainer
          }}
        >
          <HeaderComp />
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'scroll' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            {isAuth ? (
              <Suspense fallback={<Spin size="large" className="content_spin" />}>
                <Outlet />
              </Suspense>
            ) : (
              <NoAuthPage />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout

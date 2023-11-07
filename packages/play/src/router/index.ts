import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import { capitalize } from 'lodash-es'
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import data from './__routes'

const moduleFiles = import.meta.glob('../views/**/*.vue', {
  eager: true
})

const getRoutes = (moduleFiles: Record<string, any>) => {
  const getComponent = (path: string) => {
    const key = Object.keys(moduleFiles).find(i => i.includes(`${path}.vue`)) as string
    return moduleFiles[key]?.default
  }

  const routes = data.map(item => ({
    path: item.path,
    name: capitalize(item.name),
    component: getComponent(item.path),
    meta: {
      icon: DocumentIcon
    }
  }))

  return routes.map(item => ({
    ...item,
    children:
      item.path === '/dialog'
        ? routes.map(item => ({ ...item, path: item.path.replace('/', ''), name: '' }))
        : []
  }))
}

export const routes = [
  {
    path: '/https://www.baidu.com',
    name: 'index',
    meta: {
      title: '外链',
      icon: h('img', {
        src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        style: {
          width: '20px',
          height: '16px',
          padding: '0 2px',
          boxSizing: 'border-box'
        }
      })
    }
  },
  ...getRoutes(moduleFiles)
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as unknown as Readonly<RouteRecordRaw[]>
})

console.log(routes, 'routes')

export default router

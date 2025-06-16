import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

/**
 * @description: 前端静态路由
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/org/dept/edit',
    name: 'OrgDeptEdit',
    component: Layout,
    meta: {
      title: '账号编辑',
      ignoreAuth: false, // 如果这个页面不需要登录就能访问，可以设置为true
    },
    children: [
      {
        path: '',
        name: 'OrgDeptEditPage',
        component: () => import('@/views/org/dept/edit.vue'), // 请替换为您的实际组件路径
        meta: {
          title: '账号编辑',
        },
      },
    ],
  },
  // 您可以在这里添加更多的前端静态路由
];

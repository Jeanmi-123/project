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
      title: '组织管理',
      ignoreAuth: false, // 如果这个页面不需要登录就能访问，可以设置为true
    },
    children: [
      {
        path: '/org/dept',
        redirect: '',
        component: '/org/dept/dept',
        meta: {
          title: '部门管理',
          sort: 20,
          type: 2,
        },
      },
      {
        path: '/org/dept/edit',
        name: 'OrgDeptEditPage',
        component: () => import('@/views/org/dept/edit.vue'), // 请替换为您的实际组件路径
        meta: {
          title: '账号编辑',
        },
      },
    ],
  },
  // 您可以在这里添加更多的前端静态路由
  {
    path: '/apply/asset/recharge',
    name: 'AssetRecharge',
    component: Layout,
    meta: { title: '在线充值' },
    children: [
      {
        path: 'order-detail',
        name: 'RechargeOrderDetail',
        component: () => import('@/views/asset/recharge/order-detail.vue'),
        meta: { title: '充值订单详情' },
      },
    ],
  },
];

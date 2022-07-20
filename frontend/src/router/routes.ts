import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/entities',
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'entities',
        path: 'entities',
        component: () => import('pages/EntitiesPage.vue'),
        children: [
          {
            name: 'create-entity',
            path: 'create',
            component: () => import('pages/EntityUpsertPage.vue'),
            props: true,
          },
          {
            name: 'update-entity',
            path: ':id',
            component: () => import('pages/EntityUpsertPage.vue'),
            props: true,
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

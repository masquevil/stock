import AutoRouter from '@/services/auto-router';
import LayoutBase from '@/pages/_layout/base/index.vue';
import PageIndex from '@/pages/home/index.vue';
import PageNotFound from '@/pages/error/404.vue';

const router = AutoRouter.createRouter({
  // static routes
  routes: [
    {
      path: '',
      component: LayoutBase,
      children: [
        {
          path: '',
          name: 'home',
          component: PageIndex,
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound,
    },
  ],
})

export default router;

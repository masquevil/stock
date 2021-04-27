import VueRouter, { RouterOptions, RouteRecordRaw } from 'vue-router';
import { ComponentOptions } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    layout?: string;
  }
}

type AutoRouterOptions = Omit<RouterOptions, 'history' | 'routes'> & {
  history?: RouterOptions['history'];
  routes?: RouterOptions['routes'];
}

const AutoRouter = {
  createRouter(options: AutoRouterOptions) {
    const router = VueRouter.createRouter({
      history: VueRouter.createWebHashHistory(process.env.BASE_URL),
      routes: [],
      ...options,
    });
    registerAuto(router);
    return router;
  },
};

const SERVICE_CONFIG = {
  path404: '/error/404',
};

// auto router
function registerAuto(router: VueRouter.Router) {
  // const serviceConfig = Object.assign({}, SERVICE_CONFIG, serviceOptions);
  router.beforeEach(function(to, from, next) {
    const originRequest = {
      path: to.fullPath,
    };
    if (!to.matched.length) {
      const filename = to.path.replace(/\/$/, '');
      import(
        // TODO roll up?
        /* webpackChunkName: "[request]" */
        /* webpackInclude: /\/pages\/.+\/.+.vue$/ */
        /* webpackExclude: /(^|\/)_/ */
        `@/pages${filename}`
      )
        .then(async (comp) => {
          let [route, layout] = await completeAutoLayout(comp.default as ComponentOptions, filename);
          if (layout !== null) route = await completeBaseLayout(route, layout || 'base');
          return route;
        })
        .then((route) => {
          router.addRoute(route);
          next(originRequest);
        })
        .catch(() => {
          // 404
          // router.addRoute({
          //   path: serviceConfig.path404,
          //   alias: to.path,
          // });
          next();
        });
    } else {
      next();
    }
  });
}

function completeBaseLayout(route: RouteRecordRaw, rootLayoutName: string): Promise<RouteRecordRaw> {
  return import(
    /* webpackChunkName: "[request]" */
    `@/pages/_layout/${rootLayoutName}`
  ).then(
    layout => {
      return {
        path: '',
        component: layout.default,
        children: [route],
      };
    },
    () => Promise.resolve(route)
  );
}

function completeAutoLayout(component: ComponentOptions, filename: string): Promise<[RouteRecordRaw, string | undefined]> {
  let rootLayoutName = component.layout;
  let route: RouteRecordRaw = {
    path: filename,
    name: component.name || filename,
    component: component,
  };
  // auto get all layout
  let paths = filename.slice(1).split('/');
  let layoutsGetter: Promise<[string, ComponentOptions] | null>[] = [];
  for (let i = paths.length; i > 0; i--) {
    let path = paths.slice(0, i).join('/');
    layoutsGetter.push(
      import(
        /* webpackChunkName: "[request]" */
        `@/pages/${path}/_layout`
      ).then(layout => [path, layout.default], () => Promise.resolve(null))
    );
  }
  return Promise.all(layoutsGetter).then((layouts) => {
    layouts.forEach((layoutData: [string, ComponentOptions] | null) => {
      if (!layoutData) return;
      let [path, layout] = layoutData;
      route.path = route.path.slice(path.length + 1);
      route = {
        path: path,
        component: layout,
        children: [route],
      };
      if (!rootLayoutName && rootLayoutName !== null) rootLayoutName = layout.layout;
    });
    return [route, rootLayoutName];
  });
}

export default AutoRouter;

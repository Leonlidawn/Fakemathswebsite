import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import AdminPage from '@/components/AdminPage'
import NewsPage from "@/components/NewsPage"
import WorkshopPage from "@/components/WorkshopPage"

import Auth from '@okta/okta-vue'

//please replace with your okta issuer and id
//TODO: redirect URi should be the same as Initiate login URI for this website,
//TODO: therefore add trust origin, and change initiate login uri in OTKA application setting.
Vue.use(Auth, {
  issuer: 'https://dev-291986.oktapreview.com/oauth2/default',
  client_id: '0oafnrvpgp3XhtnOa0h7',//for product beta docker http://192.168.99.100:8081
  redirect_uri: window.location.origin + '/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/news',
      meta: { title: ' News' },
      component: NewsPage
    },
    {
      path: '/workshops',
      meta: { title: ' Workshops' },
      component: WorkshopPage,
    },
    {
      path: '/implicit/callback',
      meta: { title: ' Log in' },
      component: Auth.handleCallback()
    },

    {
      path: '/admin',
      component: AdminPage,
      meta: {
        title: 'Admin Page',
        requiresAuth: true
      }
    }
  ]
})


//The SDK comes with the method auth.authRedirectGuard() that checks matched routes’ metadata for the key requiresAuth
// and redirects the user to the authentication flow if they are not authenticated.
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {                                        //如果未匹配到路由
    from.name ? next({ name: from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});
router.afterEach((route) => {
  let documentTitle = 'The Maths Institute';
  route.matched.forEach((path) => {
    if (path.meta.title) {
      documentTitle += ` - ${path.meta.title}`;
    }
  });

  document.title = documentTitle;
});

export default router

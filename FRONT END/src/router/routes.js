
const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginPage.vue') ,name:"Login"},
     
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
     
      { path: '/', component: () => import('pages/IndexPage.vue'),meta:{requireAuth:true} },
      { path: '/users-admin', component: () => import('pages/UsersAdmin.vue'),meta:{requireAuth:true} },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

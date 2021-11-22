import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'customers',
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/modules/customer/_components/list.vue'),
  },
  {
    path: '/customers/create',
    name: 'customers.create',
    component: () => import('@/modules/customer/_components/form.vue'),
  },
  {
    path: '/customers/:id/edit',
    name: 'customers.edit',
    component: () => import('@/modules/customer/_components/form.vue'),
  },

  // numbers
  {
    path: '/numbers',
    name: 'numbers',
    component: () => import('@/modules/number/_components/list.vue'),
  },
  {
    path: '/numbers/create',
    name: 'numbers.create',
    component: () => import('@/modules/number/_components/form.vue'),
  },
  {
    path: '/numbers/:id/edit',
    name: 'numbers.edit',
    component: () => import('@/modules/number/_components/form.vue'),
  },
  {
    path: '/number-preferences',
    name: 'number-preferences',
    component: () => import('@/modules/number_preference/_components/list.vue'),
  },
  {
    path: '/number-preferences/create',
    name: 'number-preferences.create',
    component: () => import('@/modules/number_preference/_components/form.vue'),
  },
  {
    path: '/number-preferences/:id/edit',
    name: 'number-preferences.edit',
    component: () => import('@/modules/number_preference/_components/form.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/_components/login.vue'),
    meta: {
      layout: 'blank',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

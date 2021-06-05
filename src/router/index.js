import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Notes from '../views/Notes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedin = localStorage.getItem('isLoggedin')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedin) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (isLoggedin) return next('/notes')
    next()
  }
})

export default router

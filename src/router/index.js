import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import Forum from '@/pages/PageForum'
import SignIn from '@/pages/PageSignIn'
import Profile from '@/pages/PageProfile'
import Category from '@/pages/PageCategory'
import Register from '@/pages/PageRegister'
import NotFound from '@/pages/PageNotFound'
import ThreadShow from '@/pages/PageThreadShow'
import ThreadEdit from '@/pages/PageThreadEdit'
import ThreadCreate from '@/pages/PageThreadCreate'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },

    {
      props: true,
      name: 'Category',
      component: Category,
      path: '/category/:id',
    },

    {
      props: true,
      name: 'Forum',
      component: Forum,
      path: '/forum/:id',
    },

    {
      props: true,
      name: 'ThreadCreate',
      component: ThreadCreate,
      meta: { requiresAuth: true },
      path: '/thread/create/:forumId',
    },

    {
      props: true,
      name: 'ThreadShow',
      path: '/thread/:id',
      component: ThreadShow,
    },

    {
      props: true,
      name: 'ThreadEdit',
      component: ThreadEdit,
      path: '/thread/:id/edit',
      meta: { requiresAuth: true },
    },

    {
      path: '/me',
      props: true,
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true },
    },

    {
      path: '/me/edit',
      component: Profile,
      name: 'ProfileEdit',
      props: {edit: true},
      meta: { requiresAuth: true },
    },

    {
      name: 'Register',
      path: '/register',
      component: Register,
      meta: { requiresGuest: true },
    },

    {
      name: 'SignIn',
      path: '/signin',
      component: SignIn,
      meta: { requiresGuest: true },
    },

    {
      path: '/logout',
      name: 'SignOut',
      meta: { requiresAuth: true },

      beforeEnter (to, from, next) {
        store.dispatch('signOut')
          .then(() => next({name: 'Home'}))
      },
    },

    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    }
  ],

  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)

  store.dispatch('auth/initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        if (user) {
          next()
        } else {
          next({name: 'SignIn', query: {redirectTo: to.path}})
        }
      } else if (to.matched.some(route => route.meta.requiresGuest)) {
        if (!user) {
          next()
        } else {
          next({name: 'Home'})
        }
      } else {
        next()
      }
    })
})

export default router
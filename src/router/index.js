import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorldPage from '../views/HelloWorldPage.vue'
import CounterPage from '../views/CounterPage.vue'
import UserProfilePage from '../views/UserProfilePage.vue'
import ScrollNavPage from '../views/ScrollNavPage.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      icon: '🏠',
      description: 'Welcome to Vue 3 Demo'
    }
  },
  {
    path: '/scroll-demo',
    name: 'ScrollNavDemo',
    component: ScrollNavPage,
    meta: {
      title: 'Scroll Nav',
      icon: '🧭',
      description: 'Sticky navbar with smooth scroll'
    }
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorldPage,
    meta: {
      title: 'Hello World',
      icon: '👋',
      description: 'Props, Events & Slots'
    }
  },
  {
    path: '/counter',
    name: 'Counter',
    component: CounterPage,
    meta: {
      title: 'Counter',
      icon: '🔢',
      description: 'Reactive State & Computed'
    }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfilePage,
    meta: {
      title: 'User Profile',
      icon: '👤',
      description: 'Watchers & Lifecycle'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      title: 'Login',
      icon: '🔐',
      description: 'User Authentication'
    }
  },
  {
    // Catch-all route for 404 pages
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 - Not Found',
      icon: '❌',
      description: 'Page not found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll behavior for better UX
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards for page titles
router.beforeEach((to, from, next) => {
  // Set page title based on route meta
  if (to.meta.title) {
    document.title = `${to.meta.title} | Vue 3 Demo`
  } else {
    document.title = 'Vue 3 Demo'
  }
  next()
})

export default router

// Export routes for sidebar navigation
export { routes }

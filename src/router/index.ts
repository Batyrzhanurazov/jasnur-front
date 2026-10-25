import { createRouter, createWebHistory, RouterView, type RouteRecordRaw } from 'vue-router'
import i18n, { SUPPORTED_LOCALES, detectInitialLocale, type AppLocale } from '@/locales/i18n'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      const loc = detectInitialLocale()
      return `/${loc}`
    }
  },
  {
    path: '/:locale(ru|kk|en)',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
      },
      {
        path: 'dispatcher',
        name: 'dispatcher',
        component: () => import('@/views/DispatcherView.vue')
      },
      {
        path: 'club',
        name: 'club',
        component: () => import('@/views/ClubView.vue')
      },
      {
        path: 'studio',
        name: 'studio',
        component: () => import('@/views/StudioView.vue')
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/views/ProjectsView.vue')
      },
      {
        path: 'projects/:id',
        name: 'project-detail',
        component: () => import('@/views/ProjectDetailView.vue')
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/NewsView.vue')
      },
      {
        path: 'news/:id',
        name: 'news-detail',
        component: () => import('@/views/NewsDetailView.vue')
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: () => import('@/views/ContactsView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      const loc = detectInitialLocale()
      return `/${loc}${to.path.startsWith('/') ? '' : '/'}${to.path}`
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const paramLocale = to.params.locale as string | undefined
  if (paramLocale && (SUPPORTED_LOCALES as readonly string[]).includes(paramLocale)) {
    const loc = paramLocale as AppLocale
    const globalLocale = i18n.global.locale as unknown as { value: AppLocale }
    if (globalLocale.value !== loc) {
      globalLocale.value = loc
    }
    try {
      localStorage.setItem('zn_locale', loc)
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', loc)
    }
  }
})

export default router

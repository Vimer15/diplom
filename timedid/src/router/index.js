import { createRouter, createWebHistory } from 'vue-router'

// Способ 1: Прямой импорт (если файл точно есть)
import AuthPage from '../Views/authorizationView.vue'
import registration from '../Views/registrationView.vue'
import profile from '../Views/progileView.vue'
import torgiPageView from '../Views/torgiPageView.vue'
import historyView from '../Views/historyView.vue'
import settingView from '../Views/settingView.vue'



const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthPage
  },
  {
    path: '/reg',
    name: 'Reg',
    component: registration
  },
  {
    path: '/prof',
    name: 'Prof',
    component: profile
  },
  {
    path: '/torg',
    name: 'Torg',
    component: torgiPageView
  },
  {
    path: '/hist',
    name: 'Hist',
    component: historyView
  },
  {
    path: '/setting',
    name: 'Setting',
    component: settingView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Глобальный обработчик ошибок
router.onError((error) => {
  console.error('Ошибка роутера:', error)
})

export default router
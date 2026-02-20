import { createRouter, createWebHistory } from 'vue-router'

import AuthPage from '../Views/authorizationView.vue'
import registration from '../Views/registrationView.vue'
import profile from '../Views/progileView.vue'
import torgiPageView from '../Views/torgiPageView.vue'
import Setting from '../Views/SettungView.vue'
import putting_up_for_auction_View from '../Views/putting_up_for_auction_View.vue'
import сonfidentialityView from '../Views/сonfidentialityView.vue'
import usage_rulesView from '../Views/usage_rulesView.vue'


const routes = [
  {
    // Сделан визуал
    path: '/',
    name: 'auth',
    component: AuthPage
  },
  {
    //Сделан визуал
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
    path: '/setting',
    name: 'set',
    component: Setting
  },
  {
    path: '/auction',
    name: 'Auction',
    component: putting_up_for_auction_View
  },
  {
    //Сделан визуал
    path: '/confident',
    name: "Confident",
    component: сonfidentialityView
  },
  {
    //Сделан визуал
    path: '/info',
    name: 'Info',
    component: usage_rulesView
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
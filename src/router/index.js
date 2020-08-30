import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'
import locale from 'element-ui/lib/locale/lang/en'

import Shop from '@/views/shop'
import Item from '@/views/item'
import Cart from '@/views/cart'
import Checkout from '@/views/checkout'
import Payment from '@/views/payment'

Vue.use(Router)
Vue.use(ElementUI, { locale })

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop
    },
    {
      path: '/item',
      name: 'item',
      component: Item
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import seller from '../components/seller/seller.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/goods' },
    { path: '/goods', component: goods, name: 'Goods' },
    { path: '/ratings', component: ratings, name: 'Ratings' },
    { path: '/seller', component: seller, name: 'Seller' }
  ]
})

export default router

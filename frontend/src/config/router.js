import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/index/Index'
import Auth from '@/components/auth/Auth'
import Admin from '@/components/admin/Admin'
import User from '@/components/user/User'
import BeerPage from '@/components/beer/BeerPage'
import BeerByStyle from '@/components/beer/BeerByStyle'
import BeerByBrewer from '@/components/beer/BeerByBrewer'

import {userKey} from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'index',
    path: '/',
    component: Index
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name: 'user',
    path: '/user',
    component: User

}, {
    name: 'Admin',
    path: '/admin',
    component: Admin,
    meta: {requiresAdmin: true}
}, {
    name: 'BeerPage',
    path: '/beers/:id',
    component: BeerPage
}, {
    name: 'BeerByStyle',
    path: '/beers/style/:id',
    component: BeerByStyle
}, {
    name: 'BeerByBrewer',
    path: '/beers/brewer/:id',
    component: BeerByBrewer
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => { //every router req will pass here
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.userType == 3 || user.userType == 2 ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router


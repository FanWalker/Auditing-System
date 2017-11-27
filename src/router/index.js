import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import searchVue from '@/components/search'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path: '/search',
        name: 'searchVue',
        component: searchVue
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin
    }
  ]
})

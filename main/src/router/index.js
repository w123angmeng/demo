import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'welcome',
        component: () => import( /* webpackChunkName: "about" */ '../views/mainView.vue'),
        // children:[
        //     {
        //         path: "/welcome",
        //         name: "welcome",
        //         redirect: "/welcome", 
        //     }
        // ]
    },
    {
        path: '/app1',
        // redirect: '/app1/*',
        name: 'app1',
        component: () => import( /* webpackChunkName: "about" */ '../views/mainView.vue')
    },
    {
        path: '/app1/*',
        name: 'app1',
        component: () => import( /* webpackChunkName: "about" */ '../views/mainView.vue')
    },
    {
        path: '/app2',
        // redirect: '/app2/*',
        name: 'app2',
        component: () => import( /* webpackChunkName: "about" */ '../views/mainView.vue')
    },
    {
        path: '/app2/*',
        // redirect: '/app2/*',
        name: 'app2',
        component: () => import( /* webpackChunkName: "about" */ '../views/mainView.vue')
    },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
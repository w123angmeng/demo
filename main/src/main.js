// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// Vue.config.productionTip = false
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
// import('./bootstrap')

// await import('./bootstrap')
// // console.log("a:", a)
// export {}
// import('./bootstrap')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps, initGlobalState} from 'qiankun';
Vue.use(ElementUI);

Vue.config.productionTip = false


//   Vue.prototype.$store = store
let msg = {
    store: store
}
registerMicroApps([
    {
        name: 'app1',
        entry: '//localhost:3001',
        container: '#container',
        activeRule: '/app1',
        props: msg
    },
    {
        name: 'app2',
        entry: '//localhost:3002',
        container: '#container',
        activeRule: '/app2',
        props: msg
    }
]);

const initialState = {global: true};
const actions = initGlobalState(initialState)
Vue.prototype.actions = actions

// 启动 qiankun
// start();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
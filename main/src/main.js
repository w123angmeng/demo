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
Vue.use(ElementUI);

import { registerMicroApps, initGlobalState} from 'qiankun';
// import { registerMicroApps } from 'qiankun';
// import './shared/actions'
// console.log("actions:", actions)
const initialState = {global: true}
const actions = initGlobalState(initialState)
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('父组件观察到', state, prev);
});
setTimeout(() => {
    actions.setGlobalState({ global: false })
}, 10000);
Vue.prototype.$actions = actions
Vue.config.productionTip = false
Vue.prototype.$testFun = function() {
    console.log("这是mian 全局方法：$testFun")
}
// setTimeout(() => {
//     actions.setGlobalState({global:false})
// }, 3000);

//   Vue.prototype.$store = store
let msg = {
    store: store
    // actions: actions,
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



// 启动 qiankun
// start();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
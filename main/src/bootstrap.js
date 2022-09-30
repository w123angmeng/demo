// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import { registerMicroApps, initGlobalState} from 'qiankun';
// Vue.use(ElementUI);

// Vue.config.productionTip = false

// let globalShow = false
// Vue.prototype.$global = initGlobalState(globalShow)
// Vue.prototype.$global.onGlobalStateChange((state, prev) => {
//     // state: 变更后的状态; prev 变更前的状态
//     console.log('父组件',state, prev);
//   });
// let msg = {
//     store: store,
//     state: globalShow
// }
// registerMicroApps([
//     {
//         name: 'app1',
//         entry: '//localhost:3001',
//         container: '#container',
//         activeRule: '/app1',
//         props: msg
//     },
//     {
//         name: 'app2',
//         entry: '//localhost:3002',
//         container: '#container',
//         activeRule: '/app2',
//         props: msg
//     }
// ]);
// // 启动 qiankun
// // start();
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
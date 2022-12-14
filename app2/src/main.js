// // import('./bootstrap')
// const { bootstrap, mount, unmount } = import('./bootstrap')
// console.log("===bootstrap, mount, unmount:", bootstrap, mount, unmount)
// eslint-disable-next-line
// import { bootstrap, mount, unmount } from './bootstrap'
const { bootstrap, mount, unmount } = await import('./bootstrap')
export { bootstrap, mount, unmount }

// import './public-path';
// import Vue from 'vue'
// import App from './App.vue'
// import VueRouter from 'vue-router';
// import routes from './router'
// import store from './store'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// Vue.config.productionTip = false

// // new Vue({
// //   router,
// //   store,
// //   render: h => h(App)
// // }).$mount('#app')
// let router = null;
// let instance = null;
// function render(props = {}) {
//   const { container } = props;
//   router = new VueRouter({
//     base: window.__POWERED_BY_QIANKUN__ ? '/app2/' : '/',
//     mode: 'history',
//     routes,
//   });

//   instance = new Vue({
//     router,
//     store,
//     render: (h) => h(App),
//   }).$mount(container ? container.querySelector('#app2') : '#app2');
// }

// // 独立运行时
// if (!window.__POWERED_BY_QIANKUN__) {
//     render();
//   }
  
//   export async function bootstrap() {
//     console.log('[vue] vue app bootstraped');
//   }
//   export async function mount(props) {
//     console.log('[vue] props from main framework', props);
//     render(props);
//   }
//   export async function unmount() {
//     instance.$destroy();
//     instance.$el.innerHTML = '';
//     instance = null;
//     router = null;
//   }
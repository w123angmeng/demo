// import('./bootstrap')
// await import('./bootstrap')

// const { bootstrap, mount, unmount } = import('./bootstrap')
// eslint-disable-next-line
// import { bootstrap, mount, unmount } from './bootstrap'
// export { bootstrap, mount, unmount }


import './public-path';
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router'
import microStore from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Vuex from 'vuex'
Vue.use(Vuex);
import actions from '@/shared/actions'

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
Vue.prototype.microStore = microStore;
let router = null;
let instance = null;
function render(props = {}) {
  const { container, store } = props;
//   Vue.prototype.$store = store;
// Vue.prototype.actions = actions;
actions.setActions(props)

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app1/' : '/',
    mode: 'history',
    routes,
  });
  Vue.observable(store)
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app1') : '#app1');
//   store = Vue.observable(store)
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }
  
  export async function bootstrap() {
    console.log('[vue] app1 vue app bootstraped');
  }
  export async function mount(props) {
    console.log('[vue] app1 props from main framework', props);
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log('app1 glonal 子组件：', state, prev);
    });
    render(props);
  }
  export async function unmount() {
    console.log("app1 卸载unmount")
    // actions.offGlobalStateChange();
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
    router = null;
  }

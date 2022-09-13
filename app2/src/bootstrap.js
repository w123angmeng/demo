import './public-path';
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router'
import microStore from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.microStore = microStore;
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
let router = null;
let instance = null;
function render(props = {}) {
//   const { container } = props;

  const { container, store } = props;
  Vue.prototype.$store = store;
  console.log("app2 render:", store)
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app2/' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app2') : '#app2');
  Vue.observable(store)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }
  
  export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
  }
  export async function mount(props) {
    console.log('[vue] props from main framework', props);
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log('子组件：', state, prev);
      });
    render(props);
  }
  export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
    router = null;
  }
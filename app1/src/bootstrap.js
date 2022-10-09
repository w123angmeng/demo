import './public-path';
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app1/' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app1') : '#app1');
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }
  
  export async function bootstrap() {
    console.log(`%c[vue] vue app1 bootstraped`, 'color: green;');
  }
  export async function mount(props) {
    console.log(`%c[vue] vue app1 mount`, 'color: green;');
    // console.log('[vue] props from main framework', props);
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log('子项目监听：', state, prev);
    });
    
    // props.setGlobalState(state);
    render(props);
  }
  export async function unmount() {
    console.log(`%c[vue] vue app1 unmount`, 'color: green;');
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
    router = null;
  }
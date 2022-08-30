import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps} from 'qiankun';
Vue.use(ElementUI);

Vue.config.productionTip = false

registerMicroApps([
    {
        name: 'app1',
        entry: '//localhost:3001',
        container: '#container',
        activeRule: '/app1',
        props: {}
    },
    {
        name: 'app2',
        entry: '//localhost:3002',
        container: '#container',
        activeRule: '/app2',
        props: {}
    }
]);
// 启动 qiankun
// start();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
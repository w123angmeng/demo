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
var globalNum = {count: 0}
const actions = initGlobalState(globalNum)
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('===父项目监听：', state, prev);
}, false);
registerMicroApps([
    {
        name: 'app1',
        entry: '//localhost:3001',
        container: '#container',
        activeRule: '/app1',
        props: {
            actions: actions
        }
    },
    {
        name: 'app2',
        entry: '//localhost:3002',
        container: '#container',
        activeRule: '/app2',
        props: {
            actions: actions
        }
    }
]);
// 启动 qiankun
// start();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

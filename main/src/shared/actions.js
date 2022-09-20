import {initGlobalState} from 'qiankun';
import store from '@/store'

console.log("store:", store)
const initialState = {global: true}
// store.state;
const actions = initGlobalState(initialState)
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('父组件观察到', state, prev);
},true);
export default actions;

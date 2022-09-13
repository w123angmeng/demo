export default {
	namespaced: true,
    state: {
        count: 0,
		patientInfo: sessionStorage.getItem('patientInfo') ? JSON.parse(sessionStorage.getItem('patientInfo')) : {
            name: "张三",
            sex: '女',
            age: '24岁'
        }, // 患者信息
        // patientInfo: {
        //     name: "张三",
        //     sex: '女',
        //     age: '24岁'
        // }, // 患者信息
    },
    mutations: {
		setPatientInfo(state, data) {
			sessionStorage.setItem("patientInfo", JSON.stringify(data));
            // state.patientInfo =  JSON.parse(JSON.stringify(data))
            Object.assign(state.patientInfo, data)
        },
		delPatientInfo(state) {
            sessionStorage.removeItem("patientInfo")
			state.patientInfo = {}
		},
        setCount(state) {
            state.count++
			sessionStorage.setItem("count", state.count);
        },
    },
    actions: {
        // actions一般是处理异步逻辑
        // someAction(context, componentData) {
        //     context.commit('increment', componentData);
        // }
    }
}
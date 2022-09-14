<template>
    <div class="about">
        <h1>This is app2-demo1</h1>
        <el-button type="primary" @click="dialogData.visible = true">弹窗</el-button>

        <!-- <el-button type="primary" @click="btnClickLink">跳转到门诊护士站</el-button>
        <el-button type="primary" @click="btnClickLink1">首页</el-button> -->
        <div>患者：{{patientInfo.name}} - {{patientInfo.sex}} - {{patientInfo.age}}-{{count}}</div>
        <el-button type="primary" @click="changePatInfo">切换患者信息</el-button>
        <!-- 公共组件 -->
        <!-- <CommonDialog :dialogData="dialogData" @handleClose="handleClose"></CommonDialog> -->
    </div>

</template>
<script>
    // import {
    //     mapState,
    //     mapMutations
    // } from "vuex";
    import actions from "@/shared/actions";
    import {
        mapMutations
    } from "vuex";
    export default {
        computed: {
            // ...mapState({
            //     patientInfo: state => state.patient.patientInfo
            // }),
            patientInfo: {
            get (){
                return this.$store.state.patient.patientInfo
            }
        },
        count() {
            return this.$store.state.patient.count
            }
        },
        data: () => {
            return {
                dialogData: {
                    visible: false,
                    content: "这是app2-调用父组件"
                },
                curPatInd: 0,
                patDictList: [{
                        name: "app2-张三",
                        sex: '女',
                        age: '24岁'
                    },
                    {
                        name: "app2-李四",
                        sex: '男',
                        age: '20岁'
                    },
                    {
                        name: "app2-一一",
                        sex: '女',
                        age: '7岁'
                    }
                ]
            }
        },
        components: {
            // CommonDialog: () => import('lib_remote/CommonDialog'),
        },
        mounted() {
            // actions.onGlobalStateChange((state, prev) => {
            //     // state: 变更后的状态; prev 变更前的状态
            //     console.log('app2 glonal 子组件：', state, prev);
            // });
            try {   
      actions.onGlobalStateChange((state, prev) => {
                // state: 变更后的状态; prev 变更前的状态
                console.log('app2 glonal 子组件：', state, prev);
            });
    } catch (error) {
        console.log("app1 global error:", error)
    }
        },
        methods: {
            ...mapMutations({
                setPatientInfo: "patient/setPatientInfo",
                setCount: "patient/setCount",
            }),
            handleClose(data) {
                console.log("app2 子组件监听到弹窗关闭", data)
            },
            changePatInfo() {
                this.curPatInd = this.curPatInd == (this.patDictList.length - 1) ? 0 : (this.curPatInd + 1)
                this.setPatientInfo(this.patDictList[this.curPatInd])
                this.setCount()
                this.$forceUpdate()
                actions.setGlobalState({global: true})
            },
            // btnClickLink() {
            //     window.history.pushState(null, '', '/outpNurse/outpNurseUniversalPrint')
            //     // this.$router.push({
            //     //             path: "/outpNurse/outpNurseUniversalPrint"
            //     //         })
            // },
            // btnClickLink1() {
            //     window.history.pushState(null, '', '/')
            // }
        }
    };
</script>
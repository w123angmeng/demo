<template>
    <div class="about">
        <h1>This is app2-demo1</h1>
        <el-button type="primary" @click="dialogData.visible = true">弹窗</el-button>

        <!-- <el-button type="primary" @click="btnClickLink">跳转到门诊护士站</el-button>
        <el-button type="primary" @click="btnClickLink1">首页</el-button> -->
        <div>患者：{{patientInfo.name}} - {{patientInfo.sex}} - {{patientInfo.age}}</div>
        <el-button type="primary" @click="changePatInfo">切换患者信息</el-button>
        <!-- 公共组件 -->
        <CommonDialog :dialogData="dialogData" @handleClose="handleClose"></CommonDialog>
    </div>

</template>
<script>
    import {
        mapState,
        mapMutations
    } from "vuex";
    export default {
        computed: {
            ...mapState({
                patientInfo: state => state.patient.patientInfo
            }),
        },
        data: () => {
            return {
                dialogData: {
                    visible: false,
                    content: "这是app2-调用父组件"
                },
                curPatInd: 0,
            }
        },
        components: {
            CommonDialog: () => import('lib_remote/CommonDialog'),
        },
        methods: {
            ...mapMutations({
                setPatientInfo: "patient/setPatientInfo",
            }),
            handleClose(data) {
                console.log("app2 子组件监听到弹窗关闭", data)
            },
            changePatInfo() {
                let patDictList = [{
                        name: "app1-张三",
                        sex: '女',
                        age: '24岁'
                    },
                    {
                        name: "app1-李四",
                        sex: '男',
                        age: '20岁'
                    },
                    {
                        name: "app1-一一",
                        sex: '女',
                        age: '7岁'
                    }
                ]
                this.curPatInd = this.curPatInd == (patDictList.length - 1) ? 0 : (this.curPatInd + 1)
                this.setPatientInfo(patDictList[this.curPatInd])

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
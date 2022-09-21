<template>
    <div class="about">
        <h1>This is app1-demo1{{dialogData.content}}</h1>
        <el-button type="primary" @click="dialogData.visible = true">弹窗</el-button>
        <div>患者：{{patientInfo.name}} - {{patientInfo.sex}} - {{patientInfo.age}}-{{count}}</div>
        <el-button type="primary" @click="changePatInfo">切换患者信息</el-button>
        <el-button type="primary" @click="$testFun">调用全局方法</el-button>
        <!-- <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table> -->
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
                console.log("监测到app1变化：", this.$store.state.patient.patientInfo)
                this.$forceUpdate()
                return this.$store.state.patient.patientInfo
            },
            
        },
        count() {
            console.log("app1 检测到count变化:", this.$store.state.patient.count)
            this.$forceUpdate()
            return this.$store.state.patient.count
            }
        },
        data: () => {
            return {
                dialogData: {
                    visible: false,
                    content: "这是父组件-调用公共组件"
                },
                curPatInd: 0,
                patDictList: [{
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
                // input: '123',
                // options: [{
                //   value: '选项1',
                //   label: '黄金糕'
                // }, {
                //   value: '选项2',
                //   label: '双皮奶'
                // }, {
                //   value: '选项3',
                //   label: '蚵仔煎'
                // }, {
                //   value: '选项4',
                //   label: '龙须面'
                // }, {
                //   value: '选项5',
                //   label: '北京烤鸭'
                // }],
                // value: '',
                // tableData: [{
                //     date: '2016-05-02',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1518 弄'
                //   }, {
                //     date: '2016-05-04',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1517 弄'
                //   }, {
                //     date: '2016-05-01',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1519 弄'
                //   }, {
                //     date: '2016-05-03',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1516 弄'
                //   }]
            }
        },
        components: {
            // CommonDialog: () => import('lib_remote/CommonDialog'),
        },
        mounted(){
            // console.log("======> app1 mouted")
    //         try {   
    //   actions.onGlobalStateChange((state, prev) => {
    //             // state: 变更后的状态; prev 变更前的状态
    //             console.log('app1 glonal 子组件：', state, prev);
    //         });
    // } catch (error) {
    //     console.log("app1 global error:", error)
    // }

            
        },
        methods: {
            ...mapMutations({
                setPatientInfo: "patient/setPatientInfo",
                setCount: "patient/setCount"
            }),
            handleClose(data) {
                console.log("app1 子组件监听到弹窗关闭", data)
            },
            changePatInfo() {
                this.curPatInd = this.curPatInd == (this.patDictList.length - 1) ? 0 : (this.curPatInd + 1)
                this.setPatientInfo(this.patDictList[this.curPatInd])
                this.setCount()
                actions.setGlobalState({global: true})
                // this.$store.commit('patient/setPatientInfo', this.patDictList[this.curPatInd])
            },
        }
    };
</script>
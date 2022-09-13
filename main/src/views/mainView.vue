<template>
    <div class="mainViewWrap">
        <!-- <div>患者：{{patientInfo.name}} - {{patientInfo.sex}} - {{patientInfo.age}}</div> -->
        <HeaderComp></HeaderComp>
        <el-button type="primary" @click="changePatInfo">切换患者信息</el-button>
        <el-menu router default-active="/about" class="el-menu-demo" mode="horizontal">
            <!-- <el-menu-item index="/about">主应用页面</el-menu-item> -->
            <el-menu-item index="/app1/demo1">app1</el-menu-item>
            <el-menu-item index="/app2/demo1">app2</el-menu-item>
        </el-menu>
         <div class="rw" id="container">
            <!-- <router-view /> -->
        </div>

        <!-- 公共组件 -->
        <!-- <CommonDialog :dialogData="dialogData" @handleClose="handleClose"></CommonDialog> -->
    </div>
</template>
<script>
import { start } from 'qiankun';
import HeaderComp from "@/views/common/HeaderComp"
// import {mapState, mapMutations} from "vuex";
import {mapMutations} from "vuex";
export default {
  name: "mainView",
  data(){
    return {
        dialogData: {
            visible: false,
            content: "这是父组件-调用公共组件"
        },
        curPatInd: 0,
        patDictList: [{
                        name: "张三",
                        sex: '女',
                        age: '24岁'
                    },
                    {
                        name: "李四",
                        sex: '男',
                        age: '20岁'
                    },
                    {
                        name: "一一",
                        sex: '女',
                        age: '7岁'
                    }
                ]
    }
  },
  created() {
    // sessionStorage.setItem("patientInfo", JSON.stringify({
    //         name: "张三",
    //         sex: '女',
    //         age: '24岁'
    //     },));
  },
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start({
        sandbox: false
      });
    }
  },
  computed: {
        // ...mapState({
        //     patientInfo: state => state.patient.patientInfo
        // }),
        // patientInfo() {
        //     return this.$store.state.patient.patientInfo
        // },
        patientInfo: {
            get (){
                return this.$store.state.patient.patientInfo
            }
        }
    },
  components: {
    HeaderComp,
    // CommonDialog: () => import('lib_remote/CommonDialog'),
  },
  methods: {
    ...mapMutations({
        setPatientInfo: "patient/setPatientInfo",
        setCount: "patient/setCount"
    }),
    changePatInfo() {
        this.curPatInd = this.curPatInd == (this.patDictList.length - 1) ? 0 : (this.curPatInd + 1)
        this.setPatientInfo(this.patDictList[this.curPatInd])
        this.setCount()
        this.$forceUpdate()
    },
    handleClose(data) {
        console.log("父监听到弹窗关闭", data)
    }
  }
};
</script>

<template>
  <div class="headerWrap fw">
    <div class="lw">
        <img alt="Vue logo" src="../../assets/logo.png" />医院名称
        <span>{{patientInfo ? `${patientInfo.name}-${patientInfo.sex}-${patientInfo.age}` : ''}}-{{count}}</span>
        <!-- <span>全局状态{{$global}}</span> -->
        <el-button type="primary" @click="changePatInfo">切换患者信息</el-button>
    </div>
    <!-- <div class="rw">
        当前登录科室：微机室 {{userInfo.name}}
        <el-button type="text" @click="btnClickBack"> | 返回首页</el-button>
        <el-button type="text" @click="btnClickLogout"> | 退出登录</el-button>
    </div> -->
  </div>
</template>

<script>
// import { mapMutations, mapGetters } from "vuex";
// import {mapState} from "vuex";
import {mapMutations} from "vuex";
export default {
  name: "HeaderComp",
  components: {
    // HelloWorld,
  },
  data(){
    return {
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
  computed: {
        // ...mapState({
        //     patientInfo: state => {
        //         console.log("====检测到变化：", state.patient.patientInfo)
        //         return state.patient.patientInfo
        //     }
        // }),
        patientInfo() {
            console.log("====computed检测到变化：", this.$store.state.patient.patientInfo)
            return this.$store.state.patient.patientInfo
        },
        count() {
            console.log("====computed检测到变化count：", this.$store.state.patient.count)
            return this.$store.state.patient.count
        }
        
    },
    created(){
        console.log("main this:", this)
    },
    mounted() {
    this.actions.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log('父组件观察到', state.global, prev.global);
    });
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
        this.actions.setGlobalState({ global: false })
    },
    btnClickBack() {
        this.$router.push({
                    path: "/"
                })
    },
    btnClickLogout() {
        this.$router.push({
                path: "/login"
        })
    }
  }
};
</script>
<style lang="scss">
.headerWrap {
    height: 48px;
    line-height: 48px;
    * {
        color: #FFFFFF;
    }
}
.fw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #005CAB;
    .lw {
        img {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 50px;
            border-radius: 50%;
        }
    }
}
</style>

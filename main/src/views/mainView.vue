<template>
    <div class="mainViewWrap">
        <!-- <el-button type="primary" @click="dialogData.visible = true">弹窗</el-button> -->
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
export default {
  name: "mainView",
  data(){
    return {
        dialogData: {
            visible: false,
            content: "这是父组件-调用公共组件"
        },
    }
  },
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  },
  components: {
    // CommonDialog: () => import('lib_remote/CommonDialog'),
  },
  methods: {
    handleClose(data) {
        console.log("父监听到弹窗关闭", data)
    }
  }
};
</script>

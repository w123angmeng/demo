<template>
  <div class="about">
    <h1>主应用页面</h1>
    <!-- 公共组件 -->
    <CommonDialog :dialogData="dialogData" @handleClose="handleClose"></CommonDialog>
  </div>
</template>
<script>
export default {
  name: "aboutComp",
  data(){
    return {
        dialogData: {
            visible: false,
            content: "这是父组件-调用公共组件"
        },
    }
  },
  components: {
    CommonDialog: () => import('lib_remote/CommonDialog'),
  },
  methods: {
    handleClose(data) {
        console.log("父监听到弹窗关闭", data)
    }
  }
};
</script>
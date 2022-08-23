<template>
    <div class="hello">
        <el-dialog
            title="提示"
            :visible.sync="dialogData.visible"
            width="30%"
            :before-close="handleClose"
            append-to-body
        >
            <span>{{ dialogData.content }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogData.visible = false">取 消</el-button>
                <el-button type="primary" @click="dialogData.visible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "CommonDialog",
    props: {
        dialogData: {
            type: Object,
            default: () => {
            return {
                visible: false,
                content: "这是一段父组件默认的文字",
            };
        },
        },
        
    },
    methods: {
        handleClose() {
            this.dialogData.visible = false;
            this.$emit("handleClose", true);
        },
    },
};
</script>
<style scoped lang="scss">
.hello {
    background: red;
    .el-dialog__header {
        background: red;
    }
}
</style>

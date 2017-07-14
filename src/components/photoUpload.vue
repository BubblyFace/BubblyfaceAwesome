<template>
    <div class="common-container">
        <el-upload class="common-upload" 
        action="/postData/photoUpload" 
        list-type="picture-card" 
        :on-preview="handlePictureCardPreview" 
        :on-remove="handleRemove"
        :on-success="handledSuccess"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
    </div>
</template>

<style scoped>
    
</style>

<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                successUrl: "/",
                uploadData: {
                    id: this.ablumId
                }
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handledSuccess(res,file,fileList){
                console.log(res)
            }
        },
        props: {
            ablumId: String
        }
    }
</script>
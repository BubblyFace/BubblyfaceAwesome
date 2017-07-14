<template>
    <div class="common-container common-form ablumCreate">
        <el-form :model="formData" label-width="80px" name="ablumCreate">
            <el-form-item label="Title">
                <el-input v-model="formData.title">
                </el-input>
            </el-form-item>
            <el-form-item label="Author">
                <el-input v-model="formData.author">
                </el-input>
            </el-form-item>
            <el-form-item label="Describe">
                <el-input v-model="formData.describe" type="textarea">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
    
</style>

<script>
    export default {
        data() {
            return {
                formData: {
                    title: '',
                    author: '',
                    describe: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.dir(this.formData)
                $.post("/postData/createAblum", {
                        data: {
                            title: this.formData.title,
                            author: this.formData.author,
                            describe: this.formData.describe
                        }
                    }, (data) => {
                        console.log(data)
                        this.goAblumDetail(data.id);
                    }
                )
            },
            goAblumDetail(ablumId) {
                var url = '/ablums/ablumDetail/'+ablumId;
                this.$router.push({
                    path:url
                })
            }
        }
    }
</script> 
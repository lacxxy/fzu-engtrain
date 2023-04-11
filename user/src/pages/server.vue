<template>
    <div id="ServerPush">
        <el-form label-width="120px">
            <el-select v-model="type_name" placeholder="请选择服务类别" size="middle" @change="handelType">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>

            <p class="insert-title">服务名称：</p>
            <div class="row">
                <el-input size="middle" v-model="name" placeholder="请输入服务的名称"></el-input>
            </div>

            <p class="insert-title">服务封面：</p>
            <div class="row">
                <el-upload class="avatar-uploader" action="#" :auto-upload="false" :show-file-list="false"
                    :on-change="uploadFile">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <span v-else class="avatar-uploader-icon">
                        +
                    </span>
                </el-upload>
            </div>

            <p class="insert-title">服务流程描述：</p>
            <div class="row">
                <el-input v-model="service_process" type="textarea" placeholder="服务流程描述..."></el-input>
            </div>

            <el-button style="margin-top:16px" @click="submitOrder">提交</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie'
export default {
    name: 'ServerPush',
    data() {
        return {
            serve_type: null,
            type_name: '',
            name: '',
            service_process: '',
            formData: null,
            options: [
                {
                    value: '0',
                    label: '家庭保洁',
                },
                {
                    value: '1',
                    label: '维修服务',
                },
                {
                    value: '2',
                    label: '汽车保洁',
                },
                {
                    value: '3',
                    label: '母婴护理',
                }, {
                    value: '4',
                    label: '幼儿托管',
                }, {
                    value: '5',
                    label: '宠物托管',
                },
                {
                    value: '6',
                    label: '孝心服务',
                },
                {
                    value: '7',
                    label: '园艺服务',
                },
                {
                    value: '8',
                    label: '家宴服务',
                },
                {
                    value: '9',
                    label: '其他服务',
                },
            ]
        }
    },
    methods: {
        handelType(val) {
            this.serve_type = val;
        },
        uploadFile(item) {
            this.formData = item.raw; // 图片文件
            this.imageUrl = URL.createObjectURL(item.raw); // 图片上传浏览器回显地址
            console.log(this.imageUrl, "imageUrl")
            console.log(this.formData, "formData")
        },
        submitOrder() {
            var formData = new FormData();
            formData.append("service_img", this.formData);  // 照片文件
            formData.append("service_name", this.name); // 其他参数
            formData.append("service_process", this.service_process); // 其他参数
            formData.append("service_status", 0); // 其他参数
            formData.append("service_type", this.serve_type); // 其他参数
            formData.append("user_id", Cookies.get('user_id')); // 其他参数
            console.log(formData.get('user_id'))
            if (formData.get('user_id') == 'undefined' || formData.get('service_img') == null) {
                alert("不能为空")
                return;
            }
            axios.post('/company/publishService', formData).then(res => {
                res = res.data;
                alert(res.msg)
            })
        }
    }


}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
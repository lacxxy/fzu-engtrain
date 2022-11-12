<template>
    <div id="insert">
        <el-avatar class="avatarRecv"> 收 </el-avatar>
        <span class="title">收件人</span>
        <el-row :gutter="20" class="demo-autocomplete">
            <el-col :span="5">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    姓名
                </div>
                <el-input v-model="recv.name" placeholder="请输入收件人姓名" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    联系方式
                </div>
                <el-input v-model="recv.phone" placeholder="请输入联系方式" />
            </el-col>
        </el-row>
        <el-row :gutter="20" class="demo-autocomplete text-center">
            <el-col :span="5">
                <div class="sub-title">
                    所在地区
                </div>
                <el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
                </el-cascader>
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    详细地址
                </div>
                <el-input v-model="addr" placeholder="请输入详细地址" />
            </el-col>
        </el-row>
    </div>
    <div id="insert">
        <el-avatar class="avatarSend"> 寄 </el-avatar>
        <span class="title">寄件人</span>
        <el-row :gutter="20" class="demo-autocomplete">
            <el-col :span="5">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    姓名
                </div>
                <el-input v-model="send.name" placeholder="请输入收件人姓名" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    联系方式
                </div>
                <el-input v-model="send.phone" placeholder="请输入联系方式" />
            </el-col>
        </el-row>
        <el-row :gutter="20" class="demo-autocomplete text-center">
            <el-col :span="5">
                <div class="sub-title">
                    所在地区
                </div>
                <el-cascader :options="options" v-model="selectedOptions1" @change="handleChange">
                </el-cascader>
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    详细地址
                </div>
                <el-input v-model="addr1" placeholder="请输入详细地址" />
            </el-col>
        </el-row>
        <el-button @click="sendDil">寄出</el-button>
    </div>
</template>
<script>
import { regionData, CodeToText } from 'element-china-area-data'
export default {
    name: 'InsertNew',
    data() {
        return {
            options: regionData,
            selectedOptions: [],
            selectedOptions1: [],
            addr: '',
            addr1: '',
            send: {
                name: "",
                phone: "",
                area: {
                    "l1": "",
                    "l2": "",
                    "l3": "",
                    "l4": ""
                }
            },
            recv: {
                name: "",
                phone: "",
                area: {
                    "l1": "",
                    "l2": "",
                    "l3": "",
                    "l4": ""
                }
            }
        }
    },
    methods: {
        handleChange(value) {
            console.log(value)
        },
        sendDil() {
            let sendl1 = CodeToText[this.selectedOptions1[0]];
            let sendl2 = CodeToText[this.selectedOptions1[1]];
            let sendl3 = CodeToText[this.selectedOptions1[2]];
            let recvl1 = CodeToText[this.selectedOptions[0]];
            let recvl2 = CodeToText[this.selectedOptions[1]];
            let recvl3 = CodeToText[this.selectedOptions[2]];
            const that = this;
            const data = {
                cookie: localStorage.cookie,
                send: {
                    name: that.send.name,
                    phone: that.send.phone,
                    area: {
                        l1: sendl1,
                        l2: sendl2,
                        l3: sendl3,
                        l4: that.addr1
                    }
                },
                recieve: {
                    name: that.recv.name,
                    phone: that.recv.phone,
                    area: {
                        l1: recvl1,
                        l2: recvl2,
                        l3: recvl3,
                        l4: that.addr
                    }
                },
            }
            console.log(data);
        }
    }
}
</script>
<style scoped>
#insert {
    margin: 0 20px;
    margin-top: 60px;
}

.el-col {
    margin: 8px 0;
}

.avatarRecv {
    background-color: rgb(123 4 152);
    margin-right: 20px;
}

.el-row {
    margin-left: 50px !important;
}

.avatarSend {
    background-color: rgb(3, 172, 101);
    margin-right: 20px;
}

.title {
    font-size: 18px;
}

.sub-title {
    margin: 5px 0;
}

.redstar {
    color: red;
}
</style>
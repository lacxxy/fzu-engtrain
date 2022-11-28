<template>
    <div id="insert">
        <el-form :model="send" label-width="120px">

            <p class="insert-title">寄件人信息：</p>
            <div class="row">
                <el-input size="middle" class="ipt" v-model="send.name" placeholder="请输入寄件人的名字"></el-input>
                <el-input size="middle" class="ipt" v-model="send.phone" placeholder="请输入寄件人的电话号码"></el-input>
            </div>



            <div class="row">
                <el-select @change="handleChangeProvince" v-model="selectedOptions[0]" class="ipt" placeholder="省"
                    size="middle">
                    <el-option v-for="item, i in options" :key="i" :label="item.label" :value="item.value" />
                </el-select>

                <el-select @change="handleChangeCity" v-model="selectedOptions[1]" class="ipt" placeholder="市"
                    size="middle">
                    <el-option v-for="item in options[index1[0]].children" :key="item" :label="item.label"
                        :value="item.value" />
                </el-select>

                <el-select v-model="selectedOptions[2]" class="ipt" placeholder="县" size="middle">
                    <el-option v-for="item in (options[index1[0]].children)[index1[1]].children" :key="item"
                        :label="item.label" :value="item.value" />
                </el-select>
                <el-input size="middle" class="ipt" v-model="addr" placeholder="请输入寄件人的详细地址"></el-input>
            </div>


            <p class="insert-title">收件人信息：</p>

            <div class="row">
                <el-input size="middle" class="ipt" v-model="recv.name" placeholder="请输入收件人的名字"></el-input>
                <el-input size="middle" class="ipt" v-model="recv.phone" placeholder="请输入收件人的电话号码"></el-input>
            </div>



            <div class="row">
                <el-select @change="handleChangeProvince1" v-model="selectedOptions1[0]" class="ipt" placeholder="省"
                    size="middle">
                    <el-option v-for="item, i in options" :key="i" :label="item.label" :value="item.value" />
                </el-select>

                <el-select @change="handleChangeCity1" v-model="selectedOptions1[1]" class="ipt" placeholder="市"
                    size="middle">
                    <el-option v-for="item in options[index2[0]].children" :key="item" :label="item.label"
                        :value="item.value" />
                </el-select>

                <el-select v-model="selectedOptions1[2]" class="ipt" placeholder="县" size="middle">
                    <el-option v-for="item in (options[index2[0]].children)[index2[1]].children" :key="item"
                        :label="item.label" :value="item.value" />
                </el-select>
                <el-input size="middle" class="ipt" v-model="addr1" placeholder="请输入收件人的详细地址"></el-input>

            </div>

            <span>重量：</span>
            <el-input-number v-model="weight" min="0" />
            <p class="insert-title">备注：</p>

            <div class="row">
                <el-input v-model="supplyMes" type="textarea" placeholder="补充..."></el-input>
            </div>

            <el-button style="margin-top:5px" @click="sendDil">提交</el-button>



        </el-form>
    </div>
</template>
<script>
import { regionData, CodeToText } from 'element-china-area-data'
import axios from 'axios'
export default {
    name: 'InsertNew',
    data() {
        return {
            options: regionData,
            test1: '广东省',
            selectedOptions: [],
            selectedOptions1: [],
            addr: '',
            addr1: '',
            supplyMes: '',
            index1: [0, 0, 0],
            index2: [0, 0, 0],
            weight: 0,
            price: 0,
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
        handleChangeProvince(value) {
            let proNum = this.options.findIndex((item) => {
                return item.value == value
            })
            this.selectedOptions[1]="";
            this.index1[0] = proNum;
        },
        handleChangeCity(value) {
            let proNum = this.options[this.index1[0]].children.findIndex((item) => {
                return item.value == value
            })
            this.selectedOptions[2] = "";
            this.index1[1] = proNum;
        },
        handleChangeProvince1(value) {
            let proNum = this.options.findIndex((item) => {
                return item.value == value
            })
            this.selectedOptions1[1]="";
            this.index2[0] = proNum;
        },
        handleChangeCity1(value) {
            let proNum = this.options[this.index2[0]].children.findIndex((item) => {
                return item.value == value
            })
            this.selectedOptions1[2] = "";
            this.index2[1] = proNum;
        },
        getPrice() {
            const that = this;
            return axios.post('/cost/calculate', {
                start_addr: CodeToText[that.selectedOptions[0]] + CodeToText[that.selectedOptions[1]] + CodeToText[that.selectedOptions[2]] + that.addr,
                end_addr: CodeToText[that.selectedOptions1[0]] + CodeToText[that.selectedOptions1[1]] + CodeToText[that.selectedOptions1[2]] + that.addr1,
                weight: that.weight
            })
        },
        async sendDil() {
            let recvl1 = CodeToText[this.selectedOptions1[0]];
            let recvl2 = CodeToText[this.selectedOptions1[1]];
            let recvl3 = CodeToText[this.selectedOptions1[2]];
            let sendl1 = CodeToText[this.selectedOptions[0]];
            let sendl2 = CodeToText[this.selectedOptions[1]];
            let sendl3 = CodeToText[this.selectedOptions[2]];
            if (this.send.name == "" || this.addr == "" || this.addr1 == "" || this.recv.name == "") {
                alert("无法为空");
                return;
            }
            const that = this;
            let price=(await that.getPrice()).data.cost;
            const data = {
                cookie: localStorage.cookie,
                send: {
                    name: that.send.name,
                    phone: that.send.phone,
                    area: {
                        l1: sendl1,
                        l2: sendl2,
                        l3: sendl3,
                        l4: that.addr
                    }
                },
                receive: {
                    name: that.recv.name,
                    phone: that.recv.phone,
                    area: {
                        l1: recvl1,
                        l2: recvl2,
                        l3: recvl3,
                        l4: that.addr1
                    }
                },
                detail: that.supplyMes,
                weight: that.weight,
                price: price
            }
            console.log(data)
            axios.post('/user/sendParcel', data).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert("寄出成功!");
                    window.location.reload()
                } else {
                    alert(res.msg);
                }
            })
        }
    },

}
</script>
<style>
#insert {
    width: 100%;
    height: 100%;
}

.ipt {
    margin: 10px 0;
}

.el-cascader-panel {
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
}

.el-cascader-menu {
    width: 200px !important;
}

.insert-title {
    margin-bottom: 10px;
}
</style>
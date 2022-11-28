<template>
    <div id="ListView">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="我收的" name="0"></el-tab-pane>
            <el-tab-pane label="我寄的" name="1"></el-tab-pane>
        </el-tabs>

        <div class="row">
            <el-input v-model="order_id" class="ipt" placeholder="请输入单号" />
            <el-button type="primary" @click="search">查询</el-button>
        </div>

        <div v-if="activeName == 0">
            <el-card class="box-card" v-for="item, i in tableData" :key="item" @click="showdetail(i)">
                <template #header>
                    <div class="card-header">
                        <span>运单号:{{ item.package_order_id }}</span>
                    </div>
                </template>
                <div class="card-mes">
                    <div class="card-main">
                        <p class="card-area">{{ item.remark.split(',')[0] }}</p>
                        <p class="card-name">{{ item.s_name }}</p>
                    </div>
                    <div class="card-img">
                        <span :style="'color:' + formatClass(item.status)">{{ formatState(0, 0, item.status) }}</span>
                        <img src="../assets/arrow.png">
                    </div>
                    <div class="card-main">
                        <p class="card-area">{{ item.remark.split(',')[1] }}</p>
                        <p class="card-name">{{ item.r_name }}</p>
                    </div>
                </div>
                <p class="dlvState">当前网点：{{ item.now_point_name }}
                </p>
            </el-card>

        </div>
        <div v-if="activeName == 1">
            <el-card class="box-card" v-for="item, i in sendData" :key="item" @click="showdetail(i)">
                <template #header>
                    <div class="card-header">
                        <span>运单号:{{ item.package_order_id }}</span>
                    </div>
                </template>
                <div class="card-mes">
                    <div class="card-main">
                        <p class="card-area">{{ item.remark.split(',')[0] }}</p>
                        <p class="card-name">{{ item.s_name }}</p>
                    </div>
                    <div class="card-img">
                        <span :style="'color:' + formatClass(item.status)">{{ formatState(0, 0, item.status) }}</span>
                        <img src="../assets/arrow.png">
                    </div>
                    <div class="card-main">
                        <p class="card-area">{{ item.remark.split(',')[1] }}</p>
                        <p class="card-name">{{ item.r_name }}</p>
                    </div>
                </div>
                <p class="dlvState">当前网点：{{ item.now_point_name }}
                </p>
            </el-card>

        </div>







        <el-dialog v-model="centerDialogVisible" width="600px" align-center>
            <el-descriptions title="快递详情" direction="vertical" :column="3" :size="size" border>
                <el-descriptions-item label="寄件人">{{ message.s_name }}</el-descriptions-item>
                <el-descriptions-item label="寄件人电话">{{ message.s_tel }}</el-descriptions-item>
                <el-descriptions-item label="寄件地址">{{ message.s_addr }}</el-descriptions-item>
                <el-descriptions-item label="收件人">{{ message.r_name }}</el-descriptions-item>
                <el-descriptions-item label="收件人电话">{{ message.r_tel }}</el-descriptions-item>
                <el-descriptions-item label="收件地址">{{ message.r_addr }}</el-descriptions-item>
                <el-descriptions-item label="单号">{{ message.package_order_id }}</el-descriptions-item>
                <el-descriptions-item label="创建时间">{{ formatTime(0, 0, message.create_time) }}</el-descriptions-item>
                <el-descriptions-item label="当前网点">{{ message.now_point_name }}</el-descriptions-item>
                <el-descriptions-item label="备注">{{ message.detail }}</el-descriptions-item>
                <el-descriptions-item label="重量">{{ message.weight }}</el-descriptions-item>
                <el-descriptions-item label="备注">{{ message.price }}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ListView',
    data() {
        return {
            radio: '',
            poststate: '',
            sendtime: '',
            centerDialogVisible: false,
            message: {},
            activeName: '0',
            order_id: '',
            page1: 1,
            page2: 1,
            tableData: [
            ],
            sendData: [
            ]
        }
    },
    created() {
        this.getRecv();
    },
    methods: {
        handleClick(i) {
            if (i == 0) {
                this.getRecv();
            } else if (i == 1) {
                this.getSend();
            }
        },
        formatState(row, column, cellValue) {
            let res = '';
            if (cellValue == 0) {
                res = '待处理'
            }
            else if (cellValue == 1) {
                res = '运输中'
            }
            else if (cellValue == 2) {
                res = '已送达'
            }
            else if (cellValue == 3) {
                res = '已签收'
            }
            return res;
        },
        formatClass(val) {
            const obj = {
                0: 'green',
                1: 'blue',
                2: 'green',
                3: 'red',
            }
            return obj[val]
        },
        formatTime(row, column, cellValue) {
            let value = cellValue
            if (value == null) {
                return ''
            } else {
                const date = new Date(value * 1)
                const y = date.getFullYear()// 年
                let MM = date.getMonth() + 1 // 月
                MM = MM < 10 ? ('0' + MM) : MM
                let d = date.getDate() // 日
                d = d < 10 ? ('0' + d) : d
                return y + '-' + MM + '-' + d
            }
        },
        getRecv() {
            const that = this;
            axios.post('/user/searchRecvParcel', {
                cookie: localStorage.cookie
            }).then(res => {
                res = res.data;
                that.tableData = res.objs;
            })
        },
        getSend() {
            const that = this;
            axios.post('/user/searchSendParcel', {
                cookie: localStorage.cookie
            }).then(res => {
                res = res.data;
                that.sendData = res.objs;
            })
        },
        showdetail(i) {
            const d = this.activeName == 0 ? this.tableData : this.sendData;
            this.message = d[i];
            this.centerDialogVisible = true
        },
        search() {
            const that = this;
            axios.post('/user/getParcelInfo', { package_order_id: that.order_id }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.message = res.obj;
                    that.centerDialogVisible = true;
                }
                else {
                    alert("无此快递或服务器错误")
                }
            })
        },
        signFor(i) {
            const that = this;
            axios.post('/user/signPackage', {
                package_order_id: that.tableData[i].package_order_id
            }).then(res => {
                res = res.data;
                alert(res.msg);
                that.getRecv()
            })
        }
    },
}
</script>
<style scoped>
.ipt {
    width: 240px;
    margin: 0 20px;
}

#ListView {
    height: 100%;
}

.card-mes {
    display: flex;
    justify-content: space-around;
}

img {
    width: 30px;
}

.dlvState {
    text-align: center;
    font-size: 14px;
}

.row {
    display: flex;
    margin: 5px 0;
}

.box-card {
    margin: 10px 0;
    background-color: rgb(205 230 247 / 20%);
}

.card-main {
    text-align: center;
}

.card-img {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-area {
    font-weight: bolder;
    font-size: 18px;
}

.card-name {
    color: rgb(148, 147, 147);
}
</style>